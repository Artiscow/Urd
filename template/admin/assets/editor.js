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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, w = 1 << 19, ee = 1 << 20, T = 1 << 25, te = 1 << 21, ne = 1 << 22, re = 1 << 23, ie = Symbol("$state"), ae = Symbol("component"), oe = Symbol("legacy props"), E = Symbol(""), se = Symbol("attributes"), ce = Symbol("class"), le = Symbol("style"), ue = Symbol("text"), D = Symbol("form reset"), de = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), fe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), pe = {}, me = Symbol("uninitialized"), he = "http://www.w3.org/1999/xhtml", ge = "http://www.w3.org/2000/svg", _e = "http://www.w3.org/1998/Math/MathML";
function ve() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function ye(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function be() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var xe = !1;
function Se(e) {
	xe = e;
}
var Ce;
function we(e) {
	if (e === null) throw ye(), pe;
	return Ce = e;
}
function Te() {
	return we(/* @__PURE__ */ sn(Ce));
}
function O(e) {
	if (xe) {
		if (/* @__PURE__ */ sn(Ce) !== null) throw ye(), pe;
		Ce = e;
	}
}
function Ee(e = 1) {
	if (xe) {
		for (var t = e, n = Ce; t--;) n = /* @__PURE__ */ sn(n);
		Ce = n;
	}
}
function De(e = !0) {
	for (var t = 0, n = Ce;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ sn(n);
		e && n.remove(), n = i;
	}
}
function Oe(e) {
	if (!e || e.nodeType !== 8) throw ye(), pe;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function ke(e) {
	return e === this.v;
}
function Ae(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function je(e) {
	return !Ae(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function Me() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Ne(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Pe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Fe() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ie(e) {
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
		r: Wn,
		l: null
	};
}
function Ye(e) {
	var t = Ke, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) yn(r);
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
function k() {
	var e = Qe;
	Qe = [], p(e);
}
function $e(e) {
	if (Qe.length === 0 && !Ot) {
		var t = Qe;
		queueMicrotask(() => {
			t === Qe && k();
		});
	}
	Qe.push(e);
}
function et() {
	for (; Qe.length > 0;) k();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var A = ~(_ | v | g);
function tt(e, t) {
	e.f = e.f & A | t;
}
function nt(e) {
	e.f & 512 || e.deps === null ? tt(e, g) : tt(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function rt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), tt(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function it(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, $e(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function at(e) {
	xe && /* @__PURE__ */ on(e) !== null && cn(e);
}
var ot = !1;
function st() {
	ot || (ot = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[D]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ct(e) {
	var t = Vn, n = Wn;
	Un(null), Gn(null);
	try {
		return e();
	} finally {
		Un(t), Gn(n);
	}
}
function lt(e, t, n, r = n) {
	e.addEventListener(t, () => ct(n));
	let i = e[D];
	e[D] = i ? () => {
		i(), r(!0);
	} : () => r(!0), st();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function ut(e, t, n, r) {
	let i = Ze() ? mt : _t;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Wn, c = dt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				fn(e, s);
			}
			ft();
		}
	}
	var d = pt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ gt(e))).then(u).catch((e) => fn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), ft();
	}) : f();
}
function dt() {
	var e = Wn, t = Vn, n = Ke, r = wt;
	return function(i = !0) {
		Gn(e), Un(t), qe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ft(e = !0) {
	Gn(null), Un(null), qe(null), e && wt?.deactivate();
}
function pt() {
	var e = Wn, t = e.b, n = wt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function mt(e) {
	var t = 2 | _;
	return Wn !== null && (Wn.f |= w), {
		ctx: Ke,
		deps: null,
		effects: null,
		equals: ke,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: me,
		wv: 0,
		parent: Wn,
		ac: null
	};
}
var ht = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function gt(e, t, n) {
	let r = Wn;
	r === null && Me();
	var i = void 0, a = Gt(me), o = !Vn, s = /* @__PURE__ */ new Set();
	return Sn(() => {
		var t = Wn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
			}).finally(ft);
		} catch (e) {
			n.reject(e), ft();
		}
		var c = wt;
		if (o) {
			if (t.f & 32768) var l = pt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(ht);
			else for (let e of s.values()) e.reject(ht);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== ht && (c.activate(), t ? (a.f |= re, Yt(a, t)) : (a.f & 8388608 && (a.f ^= re), Yt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), _n(() => {
		for (let e of s) e.reject(ht);
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
function j(e) {
	let t = /* @__PURE__ */ mt(e);
	return qn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	let t = /* @__PURE__ */ mt(e);
	return t.equals = je, t;
}
function vt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) kn(t[n]);
	}
}
function yt(e) {
	var t, n = Wn, r = e.parent;
	if (!zn && r !== null && e.v !== me && r.f & 24576) return ve(), e.v;
	Gn(r);
	try {
		vt(e), t = ar(e);
	} finally {
		Gn(n);
	}
	return t;
}
function bt(e) {
	var t = yt(e);
	if (!e.equals(t) && (e.wv = nr(), (!wt?.is_fork || e.deps === null) && (wt === null ? e.v = t : (wt.capture(e, t, !0), Tt?.capture(e, t, !0)), e.deps === null))) {
		tt(e, g);
		return;
	}
	zn || (Et === null ? nt(e) : (gn() || wt?.is_fork) && Et.set(e, t));
}
function xt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ct(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = f), cr(t, 0), Dn(t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && lr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Ct = null, wt = null, Tt = null, Et = null, Dt = null, Ot = !1, kt = !1, At = null, jt = null, Mt = 0, Nt = 1, Pt = class e {
	id = Nt++;
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
		Ct === null ? Ct = this : (Ct.#n = this, this.#t = Ct), Ct = this;
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
			for (var r of n.d) tt(r, _), t(r);
			for (r of n.m) tt(r, v), t(r);
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
		for (let e of this.#u) this.#d.delete(e), tt(e, _), this.schedule(e);
		for (let e of this.#d) tt(e, v), this.schedule(e);
		this.apply();
		for (var t = At = [], n = [], r = jt = []; this.#c.length > 0;) {
			Mt++ > 1e3 && (this.#S(), It());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Vt(e), this.#h() || this.discard(), t;
			}
		}
		if (wt = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (At = null, jt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Bt(e, t);
			r.length > 0 && wt.#_();
			return;
		}
		let a = this.#y();
		if (a) {
			this.#x(n), this.#x(t), a.#b(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Tt = this, Rt(n), Rt(t), Tt = null, this.#s?.resolve();
		var o = wt;
		if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
			if (o !== null) {
				for (let e of this.#c) o.#c.push(e);
				this.#c = [];
			} else o = this;
		}
		o !== null && (Ut.clear(), o.#_());
	}
	#v(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : rr(r) && (i & 16 && this.#d.add(r), lr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), tt(i, _), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), wt = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) rt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== me && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Et?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		wt = this;
	}
	deactivate() {
		wt = null, Et = null;
	}
	flush() {
		try {
			kt = !0, wt = this, this.#_();
		} finally {
			Mt = 0, Dt = null, At = null, jt = null, kt = !1, wt = null, Et = null, Ut.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(ht);
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
		this.#m || (this.#m = !0, $e(() => {
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
		if (wt === null) {
			let t = wt = new e();
			!kt && !Ot && $e(() => {
				t.#e || t.flush();
			});
		}
		return wt;
	}
	apply() {
		Et = null;
	}
	schedule(e) {
		if (Dt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Ct = e : t.#t = e, this.linked = !1;
		}
	}
};
function Ft(e) {
	var t = Ot;
	Ot = !0;
	try {
		var n;
		for (e && (wt !== null && !wt.is_fork && wt.flush(), n = e());;) {
			if (et(), wt === null) return n;
			wt.flush();
		}
	} finally {
		Ot = t;
	}
}
function It() {
	try {
		Le();
	} catch (e) {
		fn(e, Dt);
	}
}
var Lt = null;
function Rt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && rr(r) && (Lt = /* @__PURE__ */ new Set(), lr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && jn(r), Lt?.size > 0)) {
				Ut.clear();
				for (let e of Lt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Lt.has(n) && (Lt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || lr(n);
					}
				}
				Lt.clear();
			}
		}
		Lt = null;
	}
}
function zt(e) {
	wt.schedule(e);
}
function Bt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), tt(e, g);
		for (var n = e.first; n !== null;) Bt(n, t), n = n.next;
	}
}
function Vt(e) {
	tt(e, g);
	for (var t = e.first; t !== null;) Vt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Ht = /* @__PURE__ */ new Set(), Ut = /* @__PURE__ */ new Map(), Wt = !1;
function Gt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: ke,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function M(e, t) {
	let n = Gt(e, t);
	return qn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Kt(e, t = !1, n = !0) {
	let r = Gt(e);
	return t || (r.equals = je), r;
}
function N(e, t, n = !1) {
	return Vn !== null && (!Hn || Vn.f & 131072) && Ze() && Vn.f & 4325394 && (Kn === null || !Kn.has(e)) && Ve(), Yt(e, n ? Qt(t) : t, jt);
}
var qt = null, Jt = 0;
function Yt(e, t, n = null) {
	if (!e.equals(t)) {
		zn ? Ut.set(e, t) : Ut.has(e) || Ut.set(e, e.v);
		var r = Pt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && yt(t), Et === null && nt(t);
		}
		e.wv = nr(), qt = null, Jt = 0, Zt(e, _, n), qt = null, Ze() && Wn !== null && Wn.f & 1024 && !(Wn.f & 96) && (Xn === null ? Zn([e]) : Xn.push(e)), !r.is_fork && Ht.size > 0 && !Wt && Xt();
	}
	return t;
}
function Xt() {
	Wt = !1;
	for (let e of Ht) {
		e.f & 1024 && tt(e, v);
		let t;
		try {
			t = rr(e);
		} catch {
			t = !0;
		}
		t && lr(e);
	}
	Ht.clear();
}
function P(e) {
	N(e, e.v + 1);
}
function Zt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Ze(), a = r.length;
		if (Jt += a, Jt > 1e5 && qt === null && (qt = /* @__PURE__ */ new Set()), qt !== null) {
			if (qt.has(e)) return;
			qt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== Wn) {
				var l = (c & _) === 0;
				if (l && tt(s, t), c & 131072) Ht.add(s);
				else if (c & 2) {
					var u = s;
					Et?.delete(u), Zt(u, v, n);
				} else if (l) {
					var d = s;
					c & 16 && Lt !== null && Lt.add(d), n === null ? zt(d) : n.push(d);
				}
			}
		}
	}
}
function Qt(t) {
	if (typeof t != "object" || !t || ie in t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ M(0), u = null, d = er, f = (e) => {
		if (er === d) return e();
		var t = Vn, n = er;
		Un(null), tr(d);
		var r = e();
		return Un(t), tr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ M(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ze();
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
					let e = f(() => /* @__PURE__ */ M(me, u));
					r.set(t, e), P(o);
				}
			} else N(n, me), P(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ M(Qt(s ? e[n] : me), u)), r.set(n, o)), o !== void 0) {
				var c = V(o);
				return c === me ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = V(i);
				if (a === me) return;
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
			var n = r.get(t), i = n !== void 0 && n.v !== me || Reflect.has(e, t);
			return (n !== void 0 || Wn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ M(i ? Qt(e[t]) : me, u)), r.set(t, n)), V(n) === me) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ M(me, u)), r.set(d + "", p)) : N(p, me);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ M(void 0, u)), N(c, Qt(n)), r.set(t, c));
			else {
				l = c.v !== me;
				var m = f(() => Qt(n));
				N(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && N(g, _ + 1);
				}
				P(o);
			}
			return !0;
		},
		ownKeys(e) {
			V(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== me;
			});
			for (var [n, i] of r) i.v !== me && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Be();
		}
	});
}
var $t, en, tn, nn;
function rn() {
	if ($t === void 0) {
		$t = window, en = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		tn = a(t, "firstChild").get, nn = a(t, "nextSibling").get, u(e) && (e[ce] = void 0, e[se] = null, e[le] = void 0, e.__e = void 0), u(n) && (n[ue] = void 0);
	}
}
function an(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function on(e) {
	return tn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function sn(e) {
	return nn.call(e);
}
function F(e, t) {
	if (!xe) return /* @__PURE__ */ on(e);
	var n = /* @__PURE__ */ on(Ce);
	if (n === null) n = Ce.appendChild(an());
	else if (t && n.nodeType !== 3) {
		var r = an();
		return n?.before(r), we(r), r;
	}
	return t && un(n), we(n), n;
}
function I(e, t = !1) {
	if (!xe) {
		var n = /* @__PURE__ */ on(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ sn(n) : n;
	}
	if (t) {
		if (Ce?.nodeType !== 3) {
			var r = an();
			return Ce?.before(r), we(r), r;
		}
		un(Ce);
	}
	return Ce;
}
function L(e, t = !1) {
	if (!xe) return /* @__PURE__ */ on(e);
	var n = F(e, t);
	return O(e), n;
}
function R(e, t = 1, n = !1) {
	let r = xe ? Ce : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ sn(r);
	if (!xe) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = an();
			return r === null ? i?.after(a) : r.before(a), we(a), a;
		}
		un(r);
	}
	return we(r), r;
}
function cn(e) {
	e.textContent = "";
}
function z() {
	return !1;
}
function ln(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function un(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function dn(e) {
	var t = Wn;
	if (t === null) return Vn.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	fn(e, t);
}
function fn(e, t) {
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
function pn(e) {
	Wn === null && (Vn === null && Ie(e), Fe()), zn && Pe(e);
}
function mn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function hn(e, t) {
	var n = Wn;
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
	wt?.register_created_effect(r);
	var i = r;
	if (e & 4) At === null ? Pt.ensure().schedule(r) : At.push(r);
	else if (t !== null) {
		try {
			lr(r);
		} catch (e) {
			throw kn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && (i.parent = n, n !== null && mn(i, n), Vn !== null && Vn.f & 2 && !(e & 64))) {
		var a = Vn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function gn() {
	return Vn !== null && !Hn;
}
function _n(e) {
	let t = hn(8, null);
	return tt(t, g), t.teardown = e, t;
}
function vn(e) {
	pn("$effect");
	var t = Wn.f;
	if (!Vn && t & 32 && Ke !== null && !Ke.i) {
		var n = Ke;
		(n.e ??= []).push(e);
	} else return yn(e);
}
function yn(e) {
	return hn(4 | ee, e);
}
function bn(e) {
	Pt.ensure();
	let t = hn(64 | w, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Mn(t, () => {
			kn(t), n(void 0);
		}) : (kn(t), n(void 0));
	});
}
function xn(e) {
	return hn(4, e);
}
function Sn(e) {
	return hn(ne | w, e);
}
function Cn(e, t = 0) {
	return hn(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	ut(r, t, n, (t) => {
		hn(8, () => {
			e(...t.map(V));
		});
	});
}
function wn(e, t = 0) {
	return hn(16 | t, e);
}
function Tn(e) {
	return hn(32 | w, e);
}
function En(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = zn, r = Vn;
		Bn(!0), Un(null);
		try {
			t.call(null);
		} catch (t) {
			fn(t, e.parent);
		} finally {
			Bn(n), Un(r);
		}
	}
}
function Dn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ct(() => {
			e.abort(de);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : kn(n, t), n = r;
	}
}
function On(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || kn(t), t = n;
	}
}
function kn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (An(e.nodes.start, e.nodes.end), n = !0), e.f |= S, Dn(e, t && !n), cr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	En(e), e.f ^= S, e.f |= b;
	var i = e.parent;
	i !== null && i.first !== null && jn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function An(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ sn(e);
		e.remove(), e = n;
	}
}
function jn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Mn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Nn(e, r, !0);
	var i = () => {
		n && kn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Nn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= y;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Nn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Pn(e) {
	e.f &= -257, Fn(e, !0);
}
function Fn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= y, e.f & 1024 || (tt(e, _), Pt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Fn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function In(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ sn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Ln = null, Rn = !1, zn = !1;
function Bn(e) {
	zn = e;
}
var Vn = null, Hn = !1;
function Un(e) {
	Vn = e;
}
var Wn = null;
function Gn(e) {
	Wn = e;
}
var Kn = null;
function qn(e) {
	Vn !== null && (Vn.f & 2097152 || Vn.f & 2) && (Kn ??= /* @__PURE__ */ new Set()).add(e);
}
var Jn = null, Yn = 0, Xn = null;
function Zn(e) {
	Xn = e;
}
var Qn = 1, $n = 0, er = $n;
function tr(e) {
	er = e;
}
function nr() {
	return ++Qn;
}
function rr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (rr(a) && bt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Et === null && tt(e, g);
	}
	return !1;
}
function ir(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Kn !== null && Kn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ir(a, t, !1) : t === a && (n ? tt(a, _) : a.f & 1024 && tt(a, v), zt(a));
	}
}
function ar(e) {
	var t = Jn, n = Yn, r = Xn, i = Vn, a = Kn, o = Ke, s = Hn, c = er, l = e.f;
	Jn = null, Yn = 0, Xn = null, Vn = l & 96 ? null : e, Kn = null, qe(e.ctx), Hn = !1, er = ++$n, e.ac !== null && (ct(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= te;
		var u = e.fn, d = u();
		e.f |= x;
		var f = or(e);
		if (Ze() && Xn !== null && !Hn && f !== null && !(e.f & 6146)) for (var p = 0; p < Xn.length; p++) ir(Xn[p], e);
		if (i !== null && i !== e) {
			if ($n++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = $n;
			if (t !== null) for (let e of t) e.rv = $n;
			Xn !== null && (r === null ? r = Xn : r.push(...Xn));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (t) {
		return or(e), dn(t);
	} finally {
		e.f ^= te, Jn = t, Yn = n, Xn = r, Vn = i, Kn = a, qe(o), Hn = s, er = c;
	}
}
function or(e) {
	var t = e.deps, n = wt?.is_fork;
	if (Jn !== null) {
		var r;
		if (n || cr(e, Yn), t !== null && Yn > 0) for (t.length = Yn + Jn.length, r = 0; r < Jn.length; r++) t[Yn + r] = Jn[r];
		else e.deps = t = Jn;
		if (gn() && e.f & 512) for (r = Yn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Yn < t.length && (cr(e, Yn), t.length = Yn);
	return t;
}
function sr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Jn === null || !n.call(Jn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== me && nt(s), s.ac !== null && ct(() => {
			s.ac.abort(de), s.ac = null, tt(s, _);
		}), xt(s), cr(s, 0);
	}
}
function cr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) sr(e, n[r]);
}
function lr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		tt(e, g);
		var n = Wn, r = Rn;
		Wn = e, Rn = !(t & 96);
		try {
			t & 16777232 ? On(e) : Dn(e), En(e);
			var i = ar(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Qn;
		} finally {
			Rn = r, Wn = n;
		}
	}
}
async function ur() {
	await Promise.resolve(), Ft();
}
function V(e) {
	var t = !!(e.f & 2);
	if (Ln?.add(e), Vn !== null && !Hn && !(Wn !== null && Wn.f & 16384) && (Kn === null || !Kn.has(e))) {
		var r = Vn.deps;
		if (Vn.f & 2097152) e.rv < $n && (e.rv = $n, Jn === null && r !== null && r[Yn] === e ? Yn++ : Jn === null ? Jn = [e] : Jn.push(e));
		else {
			Vn.deps ??= [], n.call(Vn.deps, e) || Vn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Vn] : n.call(i, Vn) || i.push(Vn);
		}
	}
	if (zn && Ut.has(e)) return Ut.get(e);
	if (t) {
		var a = e;
		if (zn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || fr(a)) && (o = yt(a)), Ut.set(a, o), o;
		}
		var s = !(a.f & 512) && !Hn && Vn !== null && (Rn || !!(Vn.f & 512)), c = (a.f & x) === 0;
		rr(a) && (s && (a.f |= 512), bt(a)), s && !c && (St(a), dr(a));
	}
	if (Et?.has(e)) return Et.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function dr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (St(t), dr(t));
}
function fr(e) {
	if (e.v === me) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Ut.has(t) || t.f & 2 && fr(t)) return !0;
	return !1;
}
function pr(e) {
	var t = Hn;
	try {
		return Hn = !0, e();
	} finally {
		Hn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var mr = ["touchstart", "touchmove"];
function hr(e) {
	return mr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var gr = Symbol("events"), _r = /* @__PURE__ */ new Set(), vr = /* @__PURE__ */ new Set();
function yr(e) {
	if (!xe) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function br(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Tr.call(t, e), !e.cancelBubble) return ct(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, $e(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function xr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = br(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && _n(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function H(e, t, n) {
	(t[gr] ??= {})[e] = n;
}
function Sr(e) {
	for (var t = 0; t < e.length; t++) _r.add(e[t]);
	for (var n of vr) n(e);
}
var Cr = null, wr = !1;
function Tr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Cr = e, wr || (wr = !0, setTimeout(() => {
		wr = !1, Cr = null;
	}));
	var s = 0, c = Cr === e && e[gr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[gr] = t;
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
		var d = Vn, f = Wn;
		Un(null), Gn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[gr]?.[r];
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
			e[gr] = t, delete e.currentTarget, Un(d), Gn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Er = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Dr(e) {
	return Er?.createHTML(e) ?? e;
}
function Or(e) {
	var t = ln("template");
	return t.innerHTML = Dr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function kr(e, t) {
	var n = Wn;
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
		if (xe) return kr(Ce, null), Ce;
		i === void 0 && (i = Or(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ on(i)));
		var t = r || en ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ on(t), s = t.lastChild;
			kr(o, s);
		} else kr(t, t);
		return t;
	};
}
function Ar(e = "") {
	if (!xe) {
		var t = an(e + "");
		return kr(t, t), t;
	}
	var n = Ce;
	return n.nodeType === 3 ? un(n) : (n.before(n = an()), we(n)), kr(n, n), n;
}
function jr() {
	if (xe) return kr(Ce, null), Ce;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = an();
	return e.append(t, n), kr(t, n), e;
}
function W(e, t) {
	if (xe) {
		var n = Wn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ce), Te();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Mr(e) {
	let t = 0, n = Gt(0), r;
	return () => {
		gn() && (V(n), Cn(() => (t === 0 && (r = pr(() => e(() => P(n)))), t += 1, () => {
			$e(() => {
				--t, t === 0 && (r?.(), r = void 0, P(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Nr = C | w;
function Pr(e, t, n, r) {
	new Fr(e, t, n, r);
}
var Fr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = xe ? Ce : null;
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
	#h = Mr(() => (this.#m = Gt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Wn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Wn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = wn(() => {
			if (xe) {
				let e = this.#t;
				Te();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, Nr), xe && (this.#e = Ce);
	}
	#g() {
		try {
			this.#a = Tn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		$e(r), t && (this.#s = Tn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				be();
				return;
			}
			t = !0, n && He(), this.#s !== null && Mn(this.#s, () => {
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
					fn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Tn(() => e(this.#e)), $e(() => {
			var e = this.#c = document.createDocumentFragment(), t = an(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return Tn(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						fn(e, this.#i.parent);
					}
					return null;
				}
			}), this.#a === null) {
				this.#c = null, n && this.#x(wt);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Mn(this.#o, () => {
				this.#o = null;
			}), this.#x(wt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Tn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				In(this.#a, e);
				let t = this.#n.pending;
				this.#o = Tn(() => t(this.#e));
			} else this.#x(wt);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		rt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Wn, n = Vn, r = Ke;
		Gn(this.#i), Un(this.#i), qe(this.#i.ctx);
		try {
			return Pt.ensure(), e();
		} finally {
			Gn(t), Un(n), qe(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Mn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, $e(() => {
			this.#d = !1, this.#m && Yt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), V(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		wt?.is_fork ? (this.#a && wt.skip_effect(this.#a), this.#o && wt.skip_effect(this.#o), this.#s && wt.skip_effect(this.#s), wt.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (kn(this.#a), null), this.#o &&= (kn(this.#o), null), this.#s &&= (kn(this.#s), null), xe && (we(this.#t), Ee(), we(De()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return Tn(() => {
						var r = Wn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return fn(e, this.#i.parent), null;
				}
			}));
		};
		$e(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				fn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => fn(e, this.#i && this.#i.parent)) : n(t);
		});
	}
}, Ir = !0;
function G(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ue] ??= e.nodeValue) && (e[ue] = n, e.nodeValue = `${n}`);
}
function Lr(e, t) {
	return zr(e, t);
}
var Rr = /* @__PURE__ */ new Map();
function zr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	rn();
	var l = void 0, u = bn(() => {
		var u = n ?? t.appendChild(an());
		Pr(u, { pending: () => {} }, (t) => {
			Je({});
			var n = Ke;
			if (o && (n.c = o), a && (i.$$events = a), xe && kr(t, null), Ir = s, l = e(t, i) || Xe(), Ir = !0, xe && (Wn.nodes.end = Ce, Ce === null || Ce.nodeType !== 8 || Ce.data !== "]")) throw ye(), pe;
			Ye();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = hr(r);
					for (let e of [t, document]) {
						var a = Rr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Rr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Tr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(_r)), vr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Rr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Tr), r.delete(e), r.size === 0 && Rr.delete(n)) : r.set(e, i);
			}
			vr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Br.set(l, u), l;
}
var Br = /* @__PURE__ */ new WeakMap(), Vr = class {
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
			if (n) Pn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Pn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (kn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						In(r, t), t.append(an()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else kn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Mn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (kn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = wt, r = z();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = an();
				i.append(a), this.#n.set(e, {
					effect: Tn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, Tn(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else xe && (this.anchor = Ce), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function K(e, t, n = !1) {
	var r;
	xe && (r = Ce, Te());
	var i = new Vr(e), a = n ? C : 0;
	function o(e, t) {
		if (xe) {
			var n = Oe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = De();
				we(a), i.anchor = a, Se(!1), i.ensure(e, t), Se(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	wn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Hr(e, t) {
	return t;
}
function Ur(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Mn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Wr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null && e.pending.size === 0;
		if (l) {
			var u = n, d = u.parentNode;
			cn(d), d.append(u), e.items.clear();
		}
		Wr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Wr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, In(a, document.createDocumentFragment())) : kn(t[i], n);
	}
}
var Gr;
function Kr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = xe ? we(/* @__PURE__ */ on(u)) : u.appendChild(an());
	}
	xe && Te();
	var d = null, f = /* @__PURE__ */ _t(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Jr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Xr(d, null, c)) : Pn(d) : Mn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: wn(() => {
			p = V(f);
			var e = p.length;
			let t = !1;
			xe && Oe(c) === "[!" != (e === 0) && (c = De(), we(c), Se(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = wt, v = z(), y = 0; y < e; y += 1) {
				xe && Ce.nodeType === 8 && Ce.data === "]" && (c = Ce, t = !0, Se(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Yt(S.v, b), S.i && Yt(S.i, y), v && u.unskip_effect(S.e)) : (S = Yr(l, h ? c : Gr ??= an(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Tn(() => s(c)) : (d = Tn(() => s(Gr ??= an())), d.f |= T)), e > r.size && Ne("", "", ""), xe && e > 0 && we(De()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Se(!0), V(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, xe && (c = Ce);
}
function qr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Jr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = qr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Pn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= T, _ === l) Xr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Zr(e, d, _), Zr(e, _, y), Xr(_, y, n), d = _, p = [], m = [], l = qr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Xr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Zr(e, S.prev, C.next), Zr(e, d, S), Zr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Xr(_, l, n), Zr(e, _.prev, _.next), Zr(e, _, d === null ? e.effect.first : d.next), Zr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = qr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = qr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Wr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = qr(l.next);
		var ee = w.length;
		if (ee > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.fix();
			}
			Ur(e, w, te);
		}
	}
	o && $e(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Yr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Gt(n) : /* @__PURE__ */ Kt(n, !1, !1) : null, l = o & 2 ? Gt(i) : null;
	return {
		v: c,
		i: l,
		e: Tn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Xr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ sn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Zr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function q(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		xe && (o = we(/* @__PURE__ */ on(c)));
	}
	B(() => {
		var e = Wn;
		if (s === (s = t() ?? "")) {
			xe && Te();
			return;
		}
		if (n && !xe) {
			e.nodes = null, c.innerHTML = s, s !== "" && kr(/* @__PURE__ */ on(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (An(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (xe) {
				for (var a = Ce.data, l = Te(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ sn(l);
				if (l === null) throw ye(), pe;
				kr(Ce, u), o = we(l);
				return;
			}
			var d = ln(r ? "svg" : i ? "math" : "template", r ? ge : i ? _e : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (kr(/* @__PURE__ */ on(f), f.lastChild), r || i) for (; /* @__PURE__ */ on(f);) o.before(/* @__PURE__ */ on(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function Qr(e, t, ...n) {
	var r = new Vr(e);
	wn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, C);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var $r = () => performance.now(), ei = {
	tick: (e) => requestAnimationFrame(e),
	now: () => $r(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function ti() {
	let e = ei.now();
	ei.tasks.forEach((t) => {
		t.c(e) || (ei.tasks.delete(t), t.f());
	}), ei.tasks.size !== 0 && ei.tick(ti);
}
function ni(e) {
	let t;
	return ei.tasks.size === 0 && ei.tick(ti), {
		promise: new Promise((n) => {
			ei.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			ei.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function ri(e, t) {
	ct(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ii(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function ai(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = ii(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var oi = (e) => e;
function si(e, t, n, r) {
	var i = !!(e & 1), a = !!(e & 2), o = i && a, s = !!(e & 4), c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return ct(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			if (t.inert = u, !i) {
				p?.abort(), p?.reset?.();
				return;
			}
			a || f?.abort(), f = ci(t, m(), p, 1, () => {
				ri(t, "introstart");
			}, () => {
				ri(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = ci(t, m(), f, 0, () => {
				ri(t, "outrostart");
			}, () => {
				ri(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = Wn;
	if ((g.nodes.t ??= []).push(h), i && Ir) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && xn(() => {
			pr(() => h.in());
		});
	}
}
function ci(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return $e(() => {
			s || (c = ci(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
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
	let { delay: l = 0, css: u, tick: p, easing: m = oi } = t;
	var h, g = () => 1 - r;
	return $e(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = ai(u(0, 1));
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
						var v = o + s * m(_ / f), y = ai(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && ni(() => {
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
var li = [..." 	\n\r\f\xA0\v﻿"];
function ui(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || li.includes(r[o - 1])) && (s === r.length || li.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function di(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function fi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function pi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(fi)), i && c.push(...Object.keys(i).map(fi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = fi(e.substring(l, u).trim());
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
		return r && (n += di(r)), i && (n += di(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function mi(e, t, n, r, i, a) {
	var o = e[ce];
	if (xe || o !== n || o === void 0) {
		var s = ui(n, r, a);
		(!xe || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ce] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function hi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function gi(e, t, n, r) {
	var i = e[le];
	if (xe || i !== t) {
		var a = pi(t, r);
		(!xe || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[le] = t;
	} else r && (Array.isArray(r) ? (hi(e, n?.[0], r[0]), hi(e, n?.[1], r[1], "important")) : hi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var _i = Symbol("is custom element"), vi = Symbol("is html"), yi = fe ? "link" : "LINK", bi = fe ? "progress" : "PROGRESS";
function J(e) {
	if (xe) {
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
		e[D] = n, $e(n), st();
	}
}
function Y(e, t) {
	var n = Si(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === bi) && (e.value = t ?? "");
}
function xi(e, t) {
	var n = Si(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function X(e, t, n, r) {
	var i = Si(e);
	xe && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === yi) || i[t] !== (i[t] = n) && (t === "loading" && (e[E] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && wi(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Si(e) {
	return e[se] ??= {
		[_i]: e.nodeName.includes("-"),
		[vi]: e.namespaceURI === he
	};
}
var Ci = /* @__PURE__ */ new Map();
function wi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ci.get(t);
	if (n) return n;
	Ci.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Ti(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	lt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ei(e) ? Di(a) : a, n(a), wt !== null && r.add(wt), await ur(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (xe && e.defaultValue !== e.value || pr(t) == null && e.value) && (n(Ei(e) ? Di(e.value) : e.value), wt !== null && r.add(wt)), Cn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = wt;
			if (r.has(i)) return;
		}
		Ei(e) && n === Di(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function Ei(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Di(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Oi(e, t) {
	return e === t || e?.[ie] === t;
}
function ki(e = Xe(), t, n, r) {
	var i = Ke.r, a = Wn;
	return xn(() => {
		var o, s;
		return Cn(() => {
			o = s, s = r?.() || [], pr(() => {
				Oi(n(...s), e) || (t(e, ...s), o && Oi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Oi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Ai = !1;
function ji(e) {
	var t = Ai;
	try {
		return Ai = !1, [e(), Ai];
	} finally {
		Ai = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Mi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ mt(r), V(u)) : (l && (l = !1, c = s ? pr(r) : r), c);
	let f;
	if (o) {
		var p = ie in e || oe in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = ji(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Re(t), f(m)));
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
	var v = !1, y = (n & 1 ? mt : _t)(() => (v = !1, g()));
	o && V(y);
	var b = Wn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? V(y) : i && o ? Qt(e) : e;
			return N(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return zn && v || b.f & 16384 ? y.v : V(y);
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
var Hi = {
	lang: "nb",
	dict: { ...Ni.strings },
	dates: null
}, Ui = {
	lang: "nb",
	dict: {}
};
function Wi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Z(e, t) {
	return Wi(Ui.dict[e] ?? e, t);
}
function Gi(e, t, n) {
	let r = "other";
	try {
		r = new Intl.PluralRules(Hi.lang).select(t);
	} catch {}
	return Wi(Hi.dict[`${e}.${r}`] ?? Hi.dict[`${e}.other`] ?? `${e}.${r}`, {
		...n,
		n: t
	});
}
function Ki(e) {
	let t = `api.${e?.code}`;
	return e?.code && Ui.dict[t] !== void 0 ? Wi(Ui.dict[t], e) : e?.error ?? null;
}
function qi() {
	return Ui.lang;
}
function Ji() {
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
var Yi;
new Promise((e) => {
	Yi = e;
});
async function Xi(e = Ji()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Ui.lang = Bi(e);
	let n = Ri(Ui.lang);
	try {
		Object.assign(Ui.dict, await t("nb")), n && Ui.lang !== "nb" && Object.assign(Ui.dict, await t(Ui.lang));
	} catch {}
	if (!n) {
		let e = await Vi(Ui.lang, "admin");
		e ? Object.assign(Ui.dict, e) : Ui.lang = "nb";
	}
	return Yi(Ui.lang), Ui.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function Zi(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function Qi(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function $i(e, { delay: t = 0, duration: n = 400, easing: r = Zi, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = Qi(i), [p, m] = Qi(a);
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
function ea(e, t, n, r) {
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
function ta(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var na = 0;
function ra(e = "urd-pop") {
	return na += 1, `--${e}-${na}`;
}
function ia(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var aa = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), oa = /* @__PURE__ */ U("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), sa = /* @__PURE__ */ U("<button type=\"button\"></button>"), ca = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), la = /* @__PURE__ */ U("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), ua = /* @__PURE__ */ U("<span class=\"cp-tokens svelte-zxiloo\"></span>"), da = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), fa = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), pa = /* @__PURE__ */ U("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), ma = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), ha = /* @__PURE__ */ U("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), ga = /* @__PURE__ */ U("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), _a = /* @__PURE__ */ U("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function va(e, t) {
	Je(t, !0);
	let n = (e) => {
		var t = pa(), n = I(t), a = L(n), o = R(n, 2);
		J(o);
		var s = R(o, 2);
		J(s);
		var c = R(s, 2), l = F(c), u = R(l, 2);
		J(u);
		var d = R(u, 2), f = (e) => {
			var t = aa();
			B((e) => X(t, "title", e), [() => Z("cp.eyedropper")]), H("click", t, ye), W(e, t);
		};
		K(d, (e) => {
			ve && e(f);
		}), O(c);
		var p = R(c, 2);
		Kr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = oa();
			J(r), B((e) => {
				X(r, "title", t), Y(r, e);
			}, [() => ge(V(n))]), H("change", r, (e) => _e(V(n), e.target.value)), W(e, r);
		}), O(p);
		var v = R(p, 2), y = (e) => {
			var t = ca(), n = I(t), a = F(n, !0), o = R(a), s = (e) => {
				var t = Ar();
				B((e) => G(t, e), [() => Z("cp.linkedSuffix", { token: m() })]), W(e, t);
			}, c = /* @__PURE__ */ j(() => m());
			K(o, (e) => {
				V(c) && e(s);
			}), O(n);
			var l = R(n, 2);
			Kr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = sa();
				let s;
				B((e) => {
					s = mi(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), gi(o, `background: ${a() ?? ""}`), X(o, "title", e);
				}, [() => Z("cp.tokenTitle", { name: i() })]), H("click", o, () => pe(i(), a())), W(e, o);
			}), O(l), B((e) => G(a, e), [() => Z("cp.themeColors")]), W(e, t);
		};
		K(v, (e) => {
			i().length && e(y);
		});
		var b = R(v, 2), x = F(b), S = R(x);
		O(b);
		var ne = R(b, 2), re = (e) => {
			var t = ua();
			Kr(t, 20, () => V(_), (e) => e, (e, t) => {
				var n = la(), r = F(n), i = R(r, 2);
				O(n), B((e) => {
					gi(r, `background: ${t ?? ""}`), X(r, "title", t), X(i, "title", e);
				}, [() => Z("cp.removeSaved")]), H("click", r, () => be(t)), H("click", i, () => Se(t)), W(e, n);
			}), O(t), W(e, t);
		};
		K(ne, (e) => {
			V(_).length && e(re);
		});
		var ie = R(ne, 2), ae = (e) => {
			var t = fa(), n = I(t), r = L(n, !0), i = R(n, 2);
			Kr(i, 20, () => V(g), (e) => e, (e, t) => {
				var n = da();
				B(() => {
					gi(n, `background: ${t ?? ""}`), X(n, "title", t);
				}), H("click", n, () => be(t)), W(e, n);
			}), O(i), B((e) => G(r, e), [() => Z("common.recent")]), W(e, t);
		};
		K(ie, (e) => {
			V(g).length && e(ae);
		}), B((e, t, r, i, c) => {
			gi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${V(C) ?? ""}, 100%, 50%)`), gi(a, `left: ${V(w) * 100}%; top: ${(1 - V(ee)) * 100}%`), Y(o, V(C)), Y(s, e), X(s, "title", t), gi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), gi(l, `background: ${V(te) ?? ""}`), Y(u, V(te)), G(x, `${i ?? ""} `), X(S, "title", c);
		}, [
			() => Math.round(V(T) * 100),
			() => Z("cp.alpha"),
			() => oe(),
			() => Z("cp.saved"),
			() => Z("cp.saveTitle")
		]), H("pointerdown", n, me), H("input", o, (e) => {
			N(C, Number(e.target.value), !0), se();
		}), H("input", s, (e) => {
			N(T, Number(e.target.value) / 100), se();
		}), H("change", u, he), H("click", S, xe), W(e, t);
	}, r = Mi(t, "value", 3, "#000000"), i = Mi(t, "tokens", 19, () => []), a = Mi(t, "label", 19, () => Z("cp.pickColor")), o = Mi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = ta(), u = ra("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ M(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ M(Qt([])), _ = /* @__PURE__ */ M(Qt([])), v = "", y = "", b = /* @__PURE__ */ M(null), x = /* @__PURE__ */ M(!1), S = /* @__PURE__ */ M(Qt({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ M(0), w = /* @__PURE__ */ M(0), ee = /* @__PURE__ */ M(1), T = /* @__PURE__ */ M(1), te = /* @__PURE__ */ M("#000000");
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
		return re(...ae(V(C), V(w), V(ee)));
	}
	function E() {
		let e = oe();
		return V(T) >= .995 ? e : e + Math.round(V(T) * 255).toString(16).padStart(2, "0");
	}
	function se() {
		N(te, E(), !0), y = V(te), t.onchange?.(V(te));
	}
	function ce(e) {
		let t = ne(e);
		return t ? (((e) => {
			var t = h(e, 3);
			N(C, t[0], !0), N(w, t[1], !0), N(ee, t[2], !0);
		})(ie(t[0], t[1], t[2])), N(T, t[3], !0), N(te, E(), !0), !0) : !1;
	}
	function le() {
		ce(p()) || ce("#000000"), v = r(), y = "";
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
		e.newState === "open" ? (le(), ia(V(b), !0), N(x, !0)) : V(x) && (ia(V(b), !1), N(x, !1), de());
	}
	function D() {
		le();
		let e = V(b).getBoundingClientRect(), t = V(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		N(S, {
			top: i,
			left: r
		}, !0), N(x, !0);
	}
	function de() {
		if (y && y !== v) {
			let e = [y, ...V(g).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function fe() {
		if (l) {
			V(f)?.hidePopover();
			return;
		}
		N(x, !1), de();
	}
	function pe(e, n) {
		ce(n), N(te, n, !0), t.onchange?.(e);
	}
	function me(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			N(w, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), N(ee, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), se();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function he(e) {
		ce(e.target.value) ? se() : N(te, oe(), !0);
	}
	function ge(e) {
		return (ne(oe()) ?? [
			0,
			0,
			0
		])[e];
	}
	function _e(e, t) {
		let n = ne(oe()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			N(C, t[0], !0), N(w, t[1], !0), N(ee, t[2], !0);
		})(ie(...n)), se();
	}
	let ve = typeof window < "u" && "EyeDropper" in window;
	async function ye() {
		try {
			ce((await new window.EyeDropper().open()).sRGBHex) && se();
		} catch {}
	}
	function be(e) {
		ce(e) && se();
	}
	function xe() {
		let e = E();
		V(_).includes(e) || (N(_, [e, ...V(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(We(V(_)))));
	}
	function Se(e) {
		N(_, V(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(We(V(_))));
	}
	vn(() => {
		if (!V(x)) return;
		let e = () => fe();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(b) && !V(b).contains(e.target) && fe();
		}, n = (e) => {
			e.key === "Escape" && fe();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var Ce = _a(), we = F(Ce);
	let Te;
	var Ee = R(we, 2), De = (e) => {
		var n = ma();
		B((e, t) => {
			X(n, "title", e), X(n, "aria-label", t);
		}, [() => Z("cp.clearTitle"), () => Z("cp.clear")]), H("click", n, () => t.onchange?.("")), W(e, n);
	};
	K(Ee, (e) => {
		o() && r() && e(De);
	});
	var Oe = R(Ee, 2), ke = (e) => {
		var t = ha(), r = F(t), i = (e) => {
			n(e);
		};
		K(r, (e) => {
			V(x) && e(i);
		}), O(t), ki(t, (e) => N(f, e), () => V(f)), B(() => {
			X(t, "id", d), gi(t, `position-anchor: ${u ?? ""}`);
		}), xr("toggle", t, ue), H("click", t, (e) => e.preventDefault()), W(e, t);
	}, Ae = (e) => {
		var t = ga(), r = F(t);
		n(r), O(t), B(() => gi(t, `top: ${V(S).top ?? ""}px; left: ${V(S).left ?? ""}px`)), H("click", t, (e) => e.preventDefault()), W(e, t);
	};
	K(Oe, (e) => {
		l ? e(ke) : V(x) && e(Ae, 1);
	}), O(Ce), ki(Ce, (e) => N(b, e), () => V(b)), B((e, t, n) => {
		Te = mi(we, 1, "cp-swatch svelte-zxiloo", null, Te, {
			linked: e,
			"cp-empty": o() && !r()
		}), gi(we, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), X(we, "title", n), X(we, "popovertarget", l ? d : void 0), X(we, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? Z("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), H("click", we, function(...e) {
		(l ? void 0 : () => V(x) ? fe() : D())?.apply(this, e);
	}), W(e, Ce), Ye();
}
Sr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var ya = 1600, ba = .82, xa = .6, Sa = 15e6, Ca = 4e6, wa = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, Ta = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function Ea(e) {
	if (!Ta(e, 0, "GIF87a") && !Ta(e, 0, "GIF89a") || e.length < 13) return !1;
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
function Da(e) {
	return !Ta(e, 0, "RIFF") || !Ta(e, 8, "WEBP") ? !1 : Ta(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function Oa(e) {
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
		if (Ta(e, t + 4, "acTL")) return !0;
		if (Ta(e, t + 4, "IDAT") || Ta(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function ka(e) {
	return e instanceof Uint8Array ? Ea(e) ? "gif" : Da(e) ? "webp" : Oa(e) ? "png" : null : null;
}
async function Aa(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	let t = new Uint8Array(await e.arrayBuffer()), n = ka(t);
	if (!n) return null;
	if (t.length > 4e6) throw new wa(t.length);
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
async function ja(e, t = ya) {
	if (Na(e)) return Pa(await e.text());
	let n = await Aa(e);
	if (n) return n;
	let r = await createImageBitmap(e), i = Math.min(1, t / Math.max(r.width, r.height)), a = Math.round(r.width * i), o = Math.round(r.height * i), s = document.createElement("canvas");
	s.width = a, s.height = o, s.getContext("2d").drawImage(r, 0, 0, a, o), r.close();
	let c = (e) => new Promise((t) => s.toBlob(t, "image/webp", e)), l = await c(ba);
	return l.size > 4e5 && (l = await c(xa)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(l);
		}),
		bytes: l.size,
		width: a,
		height: o
	};
}
var Ma = "image/svg+xml";
function Na(e) {
	return e.type === Ma || /\.svg$/i.test(e.name || "");
}
function Pa(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Ma};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Fa(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ia(e) {
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
function La(e) {
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
function Ra(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function za(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var Ba = "urd-recent-glyphs", Va = "urd-recent-icons", Ha = [
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
function Ua(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var Wa = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, Ga = (e, t, n) => {
	let r = Ua(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function Ka() {
	return Wa(Ba);
}
function qa(e) {
	return Ga(Ba, Ka(), e);
}
function Ja() {
	return Wa(Va);
}
function Ya(e) {
	return Ga(Va, Ja(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var Xa = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Za = "fill=\"currentColor\" stroke=\"none\"", Qa = {
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
}, $a = [
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
function eo(e) {
	let t = typeof e == "string" ? Qa[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Za : Xa} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var to = /* @__PURE__ */ U("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), no = /* @__PURE__ */ U("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ro = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), io = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), ao = /* @__PURE__ */ U("<button type=\"button\"> </button>"), oo = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), so = /* @__PURE__ */ U("<!> <!> <!> <!>", 1), co = /* @__PURE__ */ U("<img class=\"gp-own svelte-15ln1c3\"/>"), lo = /* @__PURE__ */ U("<span class=\"gp-svg svelte-15ln1c3\"></span>"), uo = /* @__PURE__ */ U("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), fo = /* @__PURE__ */ U("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), po = /* @__PURE__ */ U("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function mo(e, t) {
	Je(t, !0);
	let n = (e) => {
		var n = so(), a = I(n), o = (e) => {
			var t = ro(), n = I(t), r = L(n, !0), a = R(n, 2), o = F(a);
			Kr(o, 16, () => V(d), (e) => e, (e, t) => {
				var n = to();
				let r;
				var a = F(n);
				q(a, () => eo(t), !0), O(a), O(n), B((e) => {
					r = mi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), X(n, "title", e);
				}, [() => Z(Qa[t].labelKey)]), H("click", n, () => C(t)), W(e, n);
			}), Kr(R(o, 2), 16, () => V(u), (e) => e, (e, t) => {
				var n = no(), r = L(n, !0);
				B(() => G(r, t)), H("click", n, () => S(t)), W(e, n);
			}), O(a), B((e) => G(r, e), [() => Z("common.recent")]), W(e, t);
		};
		K(a, (e) => {
			(V(u).length || V(d).length) && e(o);
		});
		var s = R(a, 2), c = (e) => {
			var t = jr();
			Kr(I(t), 17, () => $a, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(V(t), 2));
				let r = () => V(n)[0], a = () => V(n)[1];
				var o = io(), s = I(o), c = L(s, !0), l = R(s, 2);
				Kr(l, 20, a, (e) => e, (e, t) => {
					var n = to();
					let r;
					var a = F(n);
					q(a, () => eo(t), !0), O(a), O(n), B((e) => {
						r = mi(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), X(n, "title", e);
					}, [() => Z(Qa[t].labelKey)]), H("click", n, () => C(t)), W(e, n);
				}), O(l), B((e) => G(c, e), [() => Z(r())]), W(e, o);
			}), W(e, t);
		};
		K(s, (e) => {
			t.onicon && e(c);
		});
		var l = R(s, 2);
		Kr(l, 17, () => Ha, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ j(() => h(V(t), 2));
			let i = () => V(n)[0], a = () => V(n)[1];
			var o = io(), s = I(o), c = L(s, !0), l = R(s, 2);
			Kr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = ao();
				let i;
				var a = L(n, !0);
				B(() => {
					i = mi(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), G(a, t);
				}), H("click", n, () => S(t)), W(e, n);
			}), O(l), B((e) => G(c, e), [() => Z(i())]), W(e, o);
		});
		var f = R(l, 2), p = (e) => {
			var t = oo(), n = I(t), r = L(n, !0), i = R(n, 2), a = L(i, !0), o = R(i, 2);
			ki(o, (e) => N(m, e), () => V(m));
			var s = L(R(o, 2), !0);
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
	}, r = Mi(t, "value", 3, "★"), i = Mi(t, "icon", 3, null), a = Mi(t, "image", 3, null), o = Mi(t, "label", 19, () => Z("gp.pickGlyph")), s = ta(), c = ra("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ M(Qt([])), d = /* @__PURE__ */ M(Qt([])), f = /* @__PURE__ */ M(null), p = /* @__PURE__ */ M(null), m = /* @__PURE__ */ M(null), g = /* @__PURE__ */ M(!1), _ = /* @__PURE__ */ M(Qt({
		top: 0,
		left: 0
	}));
	function v() {
		N(u, Ka(), !0), N(d, t.onicon ? Ja().filter((e) => Qa[e]) : [], !0);
	}
	function y(e) {
		N(g, e.newState === "open"), ia(V(f), V(g)), V(g) && v();
	}
	function b() {
		s && V(p)?.hidePopover(), N(g, !1);
	}
	function x() {
		v();
		let e = V(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		N(_, {
			top: n,
			left: t
		}, !0), N(g, !0);
	}
	function S(e) {
		qa(e), t.onpick?.(e), b();
	}
	function C(e) {
		Ya(e), t.onicon?.(e), b();
	}
	async function w(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ja(n, 256);
		t.onimage?.(r.dataUrl), b();
	}
	vn(() => {
		if (!V(g)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(f) && !V(f).contains(e.target) && N(g, !1);
		}, n = (e) => {
			e.key === "Escape" && N(g, !1);
		}, r = (e) => {
			V(f) && e.target instanceof Node && !V(f).contains(e.target) && N(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var ee = po(), T = F(ee), te = F(T), ne = (e) => {
		var t = co();
		B((e) => {
			X(t, "src", a()), X(t, "alt", e);
		}, [() => Z("gp.ownIcon")]), W(e, t);
	}, re = (e) => {
		var t = lo();
		q(t, () => eo(i()), !0), O(t), W(e, t);
	}, ie = (e) => {
		var t = Ar();
		B(() => G(t, r() || "★")), W(e, t);
	};
	K(te, (e) => {
		a() ? e(ne) : i() && Qa[i()] ? e(re, 1) : e(ie, -1);
	}), O(T);
	var ae = R(T, 2), oe = (e) => {
		var t = uo(), r = F(t), i = (e) => {
			n(e);
		};
		K(r, (e) => {
			V(g) && e(i);
		}), O(t), ki(t, (e) => N(p, e), () => V(p)), B(() => {
			X(t, "id", l), gi(t, `position-anchor: ${c ?? ""}`);
		}), xr("toggle", t, y), W(e, t);
	}, E = (e) => {
		var t = fo(), r = F(t);
		n(r), O(t), B(() => gi(t, `top: ${V(_).top ?? ""}px; left: ${V(_).left ?? ""}px`)), W(e, t);
	};
	K(ae, (e) => {
		s ? e(oe) : V(g) && e(E, 1);
	}), O(ee), ki(ee, (e) => N(f, e), () => V(f)), B(() => {
		X(T, "title", o()), X(T, "aria-label", o()), X(T, "popovertarget", s ? l : void 0), gi(T, s ? `anchor-name: ${c}` : void 0);
	}), H("click", T, function(...e) {
		(s ? void 0 : () => V(g) ? N(g, !1) : x())?.apply(this, e);
	}), W(e, ee), Ye();
}
Sr(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var ho = /* @__PURE__ */ U("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), go = /* @__PURE__ */ U("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), _o = /* @__PURE__ */ U("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), vo = /* @__PURE__ */ U("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), yo = /* @__PURE__ */ U("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), bo = /* @__PURE__ */ U("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), xo = /* @__PURE__ */ U("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), So = /* @__PURE__ */ U("<!> <!>", 1), Co = /* @__PURE__ */ U("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), wo = /* @__PURE__ */ U("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), To = /* @__PURE__ */ U("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), Eo = /* @__PURE__ */ U("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), Do = /* @__PURE__ */ U("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Oo = /* @__PURE__ */ U("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function ko(e, t) {
	Je(t, !0);
	let n = (e) => {
		var t = So(), n = I(t), a = (e) => {
			var t = go(), n = F(t);
			let r;
			var i = L(n, !0), a = R(n, 2);
			let s;
			var c = F(a, !0), l = R(c), u = (e) => {
				var t = ho(), n = L(t, !0);
				B(() => G(n, V(S).length)), W(e, t);
			};
			K(l, (e) => {
				V(S).length && e(u);
			}), O(a), O(t), B((e, l) => {
				X(t, "aria-label", o()), r = mi(n, 1, "mp-tab svelte-1y5ipgc", null, r, { on: V(_) === "icons" }), X(n, "aria-pressed", V(_) === "icons"), G(i, e), s = mi(a, 1, "mp-tab svelte-1y5ipgc", null, s, { on: V(_) === "images" }), X(a, "aria-pressed", V(_) === "images"), G(c, l);
			}, [() => Z("mp.icons"), () => Z("mp.images")]), H("click", n, () => N(_, "icons")), H("click", a, () => N(_, "images")), W(e, t);
		};
		K(n, (e) => {
			l() || e(a);
		});
		var c = R(n, 2), u = (e) => {
			var t = yo(), n = I(t);
			J(n);
			var a = R(n, 2), o = F(a), c = F(o);
			let l;
			Kr(R(c, 2), 17, () => V(x), ({ id: e }) => e, (e, t) => {
				let n = () => V(t).id;
				var a = _o();
				let o;
				var s = F(a);
				q(s, () => eo(n()), !0), O(s), O(a), B((e, t) => {
					o = mi(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), X(a, "title", e), X(a, "aria-label", t);
				}, [() => Z(Qa[n()].labelKey), () => Z(Qa[n()].labelKey)]), H("click", a, () => te(n())), W(e, a);
			}), O(o);
			var u = R(o, 2), d = (e) => {
				var t = vo(), n = L(t, !0);
				B((e) => G(n, e), [() => Z("mp.noHits")]), W(e, t);
			};
			K(u, (e) => {
				V(x).length || e(d);
			}), O(a), B((e, t) => {
				X(n, "placeholder", e), X(n, "aria-label", t), l = mi(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), X(c, "title", s()), X(c, "aria-label", s());
			}, [() => Z("mp.search"), () => Z("mp.search")]), Ti(n, () => V(v), (e) => N(v, e)), H("click", c, re), W(e, t);
		}, d = (e) => {
			var t = xo(), n = F(t), r = F(n), a = L(R(F(r), 2), !0);
			O(r), Kr(R(r, 2), 16, () => V(S), (e) => e, (e, t) => {
				var n = bo();
				let r;
				var a = L(n);
				B(() => {
					r = mi(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), X(a, "src", t);
				}), H("click", n, () => ne(t)), W(e, n);
			}), O(n);
			var o = L(R(n, 2), !0);
			O(t), B((e, t) => {
				G(a, e), G(o, t);
			}, [() => Z("mp.upload"), () => Z("mp.imagesHint")]), H("click", r, oe), W(e, t);
		};
		K(c, (e) => {
			V(_) === "icons" ? e(u) : e(d, -1);
		}), W(e, t);
	}, r = Mi(t, "icon", 3, ""), i = Mi(t, "image", 3, ""), a = Mi(t, "images", 19, () => []), o = Mi(t, "label", 19, () => Z("mp.pickMark")), s = Mi(t, "noneLabel", 19, () => Z("common.none")), c = Mi(t, "klass", 3, ""), l = Mi(t, "iconsOnly", 3, !1), u = ta(), d = ra("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ M(null), m = /* @__PURE__ */ M(null), h = /* @__PURE__ */ M(null), g = /* @__PURE__ */ M(!1), _ = /* @__PURE__ */ M("icons"), v = /* @__PURE__ */ M(""), y = /* @__PURE__ */ M(Qt({
		top: 0,
		left: 0
	})), b = $a.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ j(() => {
		let e = V(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = Z(Qa[t].labelKey) || Qa[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ j(() => [...new Set(a().filter(Boolean))]);
	function C() {
		N(v, ""), N(ie, !1), N(_, i() && !l() ? "images" : "icons", !0);
	}
	function w(e) {
		N(g, e.newState === "open"), ia(V(p), V(g)), V(g) && C();
	}
	function ee() {
		u && V(m)?.hidePopover(), N(g, !1);
	}
	function T() {
		C();
		let e = V(p).getBoundingClientRect();
		N(y, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), N(g, !0);
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
	let ie = /* @__PURE__ */ M(!1);
	function ae(e) {
		N(ie, !1);
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	function oe() {
		N(ie, !0), V(h).click();
	}
	vn(() => {
		if (!V(g)) return;
		let e = () => {
			V(ie) || ee();
		};
		if (window.addEventListener("blur", e), u) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(p) && !V(p).contains(e.target) && N(g, !1);
		}, n = (e) => {
			e.key === "Escape" && N(g, !1);
		}, r = (e) => {
			V(p) && e.target instanceof Node && !V(p).contains(e.target) && N(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var E = Oo(), se = F(E), ce = F(se), le = (e) => {
		var n = jr();
		Qr(I(n), () => t.children), W(e, n);
	}, ue = (e) => {
		var t = Co();
		B(() => X(t, "src", i())), W(e, t);
	}, D = (e) => {
		var t = wo();
		q(t, () => eo(r()), !0), O(t), W(e, t);
	}, de = (e) => {
		W(e, To());
	};
	K(ce, (e) => {
		t.children ? e(le) : i() ? e(ue, 1) : r() && Qa[r()] ? e(D, 2) : e(de, -1);
	}), O(se);
	var fe = R(se, 2), pe = (e) => {
		var t = Eo(), r = F(t), i = (e) => {
			n(e);
		};
		K(r, (e) => {
			V(g) && e(i);
		}), O(t), ki(t, (e) => N(m, e), () => V(m)), B(() => {
			X(t, "id", f), gi(t, `position-anchor: ${d ?? ""}`);
		}), xr("toggle", t, w), W(e, t);
	}, me = (e) => {
		var t = Do(), r = F(t);
		n(r), O(t), B(() => gi(t, `top: ${V(y).top ?? ""}px; left: ${V(y).left ?? ""}px`)), W(e, t);
	};
	K(fe, (e) => {
		u ? e(pe) : V(g) && e(me, 1);
	});
	var he = R(fe, 2);
	ki(he, (e) => N(h, e), () => V(h)), O(E), ki(E, (e) => N(p, e), () => V(p)), B(() => {
		mi(se, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), X(se, "title", o()), X(se, "aria-label", o()), X(se, "popovertarget", u ? f : void 0), gi(se, u ? `anchor-name: ${d}` : void 0);
	}), H("click", se, function(...e) {
		(u ? void 0 : () => V(g) ? N(g, !1) : T())?.apply(this, e);
	}), H("change", he, ae), xr("cancel", he, () => N(ie, !1)), W(e, E), Ye();
}
Sr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Ao(e, t = {}) {
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
function jo(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Mo(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? jo(r, i) : Infinity;
	return Math.max(.1, Math.min(1, jo(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function No(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function Po(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var Fo = 3840, Io = 2400, Lo = (e, t, n) => Math.min(n, Math.max(t, e));
function Ro({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function zo(e) {
	return !e || typeof e.innerWidth != "number" ? null : Ro({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function Bo(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = Lo(Number.isFinite(i) && i > 0 ? i : t, 640, Fo), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? Lo(o, 480, Io) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function Vo(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var Ho = 1920, Uo = [
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
], Wo = [
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
], Go = [
	1920,
	1536,
	1366
];
function Ko(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Ho, Math.max(960, n));
}
function qo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Jo(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Yo(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Xo(e) {
	return Wo.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var Zo = {
	min: 0,
	max: 64,
	step: 1
}, Qo = {
	min: 12,
	max: 28,
	step: 1
}, $o = {
	min: 0,
	max: 80,
	step: 1
}, es = {
	min: 0,
	max: 64,
	step: 1
}, ts = {
	min: 480,
	max: 1920,
	step: 20
}, ns = {
	min: .3,
	max: .8,
	step: .05
}, rs = {
	min: 0,
	max: 400,
	step: 10
}, is = {
	min: 0,
	max: 1200,
	step: 20
}, as = {
	min: 0,
	max: 64,
	step: 1
}, os = {
	min: 180,
	max: 400,
	step: 1
}, ss = {
	min: 12,
	max: 128,
	step: 1
}, cs = {
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
}, ls = [
	"sm",
	"md",
	"lg",
	"xl"
], us = .67;
function ds(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function fs(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function ps(e, t) {
	if (e?.padY != null && e.padY !== "") return fs(e.padY, Zo, cs.md.padY);
	let n = cs[e?.size] ?? cs.md;
	return Math.round(n.padY * (ds(t) ? us : 1));
}
function ms(e) {
	if (e?.textSize != null && e.textSize !== "") return fs(e.textSize, Qo, cs.md.textSize);
	let t = cs[e?.size] ?? cs.md;
	return Math.round(t.textSize);
}
function hs(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : ls.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var gs = /* @__PURE__ */ U("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), _s = /* @__PURE__ */ U("<button type=\"button\"> </button>"), vs = /* @__PURE__ */ U("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), ys = /* @__PURE__ */ U("<div class=\"dd-pop svelte-vtocc6\"></div>"), bs = /* @__PURE__ */ U("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), xs = /* @__PURE__ */ U("<span class=\"dd svelte-vtocc6\"><!></span>");
function Q(e, t) {
	Je(t, !0);
	let n = (e) => {
		var t = gs();
		let n;
		B(() => n = mi(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": V(f) })), W(e, t);
	}, r = Mi(t, "value", 3, null), i = Mi(t, "options", 19, () => []), a = Mi(t, "title", 3, null), o = Mi(t, "disabled", 3, !1), s = Mi(t, "filled", 3, !1), c = Mi(t, "compact", 3, !1), l = ta(), u = ra("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ M(!1), p = /* @__PURE__ */ M(null), m = /* @__PURE__ */ M(null), g = /* @__PURE__ */ M(Qt({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = V(p).getBoundingClientRect(), t = Math.min(320, i().length * 32 + 12), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		N(g, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		if (!o()) {
			if (V(f)) {
				N(f, !1);
				return;
			}
			v(), N(f, !0);
		}
	}
	function b(e) {
		l && V(m)?.hidePopover(), N(f, !1), t.onchange?.(e);
	}
	vn(() => {
		if (!V(f)) return;
		let e = () => {
			l ? V(m)?.hidePopover() : N(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(p) && !V(p).contains(e.target) && N(f, !1);
		}, n = (e) => {
			e.key === "Escape" && N(f, !1);
		}, r = (e) => {
			V(p) && e.target instanceof Node && !V(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = xs(), S = F(x), C = (e) => {
		var t = vs(), l = I(t);
		let p;
		var g = F(l), v = L(g, !0), y = R(g, 2);
		n(y), O(l);
		var x = R(l, 2), S = F(x), C = (e) => {
			var t = jr();
			Kr(I(t), 17, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = _s();
				let s;
				var c = L(o, !0);
				B(() => {
					s = mi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), G(c, a());
				}), H("click", o, () => b(i())), W(e, o);
			}), W(e, t);
		};
		K(S, (e) => {
			V(f) && e(C);
		}), O(x), ki(x, (e) => N(m, e), () => V(m)), B((e) => {
			p = mi(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), X(l, "title", a()), l.disabled = o(), X(l, "popovertarget", d), gi(l, `anchor-name: ${u ?? ""}`), G(v, e), X(x, "id", d), gi(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), xr("toggle", x, (e) => {
			N(f, e.newState === "open");
		}), W(e, t);
	}, w = (e) => {
		var t = bs(), l = I(t);
		let u;
		var d = F(l), p = L(d, !0), m = R(d, 2);
		n(m), O(l);
		var v = R(l, 2), x = (e) => {
			var t = ys();
			Kr(t, 21, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = _s();
				let s;
				var c = L(o, !0);
				B(() => {
					s = mi(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), G(c, a());
				}), H("click", o, () => b(i())), W(e, o);
			}), O(t), B(() => gi(t, `top: ${V(g).top ?? ""}px; left: ${V(g).left ?? ""}px; min-width: ${V(g).width ?? ""}px`)), W(e, t);
		};
		K(v, (e) => {
			V(f) && e(x);
		}), B((e) => {
			u = mi(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), X(l, "title", a()), l.disabled = o(), G(p, e);
		}, [() => _()]), H("click", l, y), W(e, t);
	};
	K(S, (e) => {
		l ? e(C) : e(w, -1);
	}), O(x), ki(x, (e) => N(p, e), () => V(p)), W(e, x), Ye();
}
Sr(["click"]);
//#endregion
//#region src/lib/Choice.svelte
var Ss = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Cs = /* @__PURE__ */ U("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function ws(e, t) {
	Je(t, !0);
	let n = Mi(t, "title", 3, void 0), r = /* @__PURE__ */ j(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 20), i = (e) => `${e ?? ""}`;
	var a = Cs();
	let o;
	var s = F(a), c = L(s, !0), l = R(s, 2);
	Kr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ j(() => h(V(n), 2));
		let a = () => V(r)[0], o = () => V(r)[1];
		var s = Ss();
		let c;
		var l = L(s, !0);
		B((e, t) => {
			X(s, "aria-pressed", e), c = mi(s, 1, "svelte-1ehof1c", null, c, { on: t }), G(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), H("click", s, () => t.onchange(a())), W(e, s);
	}), O(l), O(a), B(() => {
		o = mi(a, 1, "choice svelte-1ehof1c", null, o, { stacked: V(r) }), X(a, "title", n()), G(c, t.label), X(l, "aria-label", t.label);
	}), W(e, a), Ye();
}
Sr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Ts = /* @__PURE__ */ U("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Es(e, t) {
	Je(t, !0);
	let n = Mi(t, "image", 3, ""), r = /* @__PURE__ */ M(null), i = /* @__PURE__ */ M(null), a = /* @__PURE__ */ M(1), o = /* @__PURE__ */ M(.5), s = /* @__PURE__ */ M(.5), c = /* @__PURE__ */ M(1), l = /* @__PURE__ */ M(1), u = /* @__PURE__ */ M(1);
	vn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			N(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !V(i)) return;
		e.filter = `brightness(${V(c)}) contrast(${V(l)}) saturate(${V(u)})`;
		let n = Math.max(t / V(i).width, t / V(i).height) * V(a), r = V(i).width * n, d = V(i).height * n, f = t / 2 - V(o) * r, p = t / 2 - V(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(V(i), f, p, r, d), e.filter = "none";
	}
	vn(() => {
		V(i), V(a), V(o), V(s), V(c), V(l), V(u), V(r) && d(V(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!V(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / V(i).width, 220 / V(i).height) * V(a), c = V(i).width * r, l = V(i).height * r, u = (e) => {
			N(o, Math.min(1, Math.max(0, V(o) - (e.clientX - t) / c)), !0), N(s, Math.min(1, Math.max(0, V(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = Ts(), g = F(h), _ = F(g), v = L(_, !0), y = R(_, 2), b = F(y);
	X(b, "width", 220), X(b, "height", 220), ki(b, (e) => N(r, e), () => V(r));
	var x = L(R(b, 2), !0);
	O(y);
	var S = R(y, 2), C = F(S), w = L(R(C));
	O(S);
	var ee = R(S, 2);
	J(ee);
	var T = R(ee, 2), te = F(T), ne = L(R(te));
	O(T);
	var re = R(T, 2);
	J(re);
	var ie = R(re, 2), ae = F(ie), oe = L(R(ae));
	O(ie);
	var E = R(ie, 2);
	J(E);
	var se = R(E, 2), ce = F(se), le = L(R(ce));
	O(se);
	var ue = R(se, 2);
	J(ue);
	var D = R(ue, 2), de = F(D), fe = L(de, !0), pe = R(de, 2), me = L(pe, !0);
	O(D);
	var he = R(D, 2), ge = F(he), _e = L(ge, !0), ve = R(ge, 2), ye = L(ve, !0);
	O(he), O(g), O(h), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		G(v, e), X(b, "title", t), G(x, n), G(C, `${r ?? ""} `), G(w, `${i ?? ""}x`), G(te, `${a ?? ""} `), G(ne, `${o ?? ""}%`), G(ae, `${s ?? ""} `), G(oe, `${c ?? ""}%`), G(ce, `${l ?? ""} `), G(le, `${u ?? ""}%`), G(fe, d), G(me, f), G(_e, p), G(ye, m);
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
	]), H("pointerdown", b, f), Ti(ee, () => V(a), (e) => N(a, e)), Ti(re, () => V(c), (e) => N(c, e)), Ti(E, () => V(l), (e) => N(l, e)), Ti(ue, () => V(u), (e) => N(u, e)), H("click", de, () => N(u, 0)), H("click", pe, p), H("click", ge, () => t.oncancel?.()), H("click", ve, m), W(e, h), Ye();
}
Sr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var Ds = () => [
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
], Os = 24, ks = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function As(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - Os) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var js = {
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
}, Ms = { bildegalleri: "slideshow" }, Ns = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Ps = {
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
function Fs(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) js[e.type] && (e.type = js[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) Ms[t.type] && (t.type = Ms[t.type]);
		Ns[e.theme] && (e.theme = Ns[e.theme]), Ps[e.preset] && (e.preset = Ps[e.preset]);
	}
	return e;
}
var Is = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = As(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && ks[n] && (e.attention.reason = ks[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Fs(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Fs(t);
		return e;
	}
}, Ls = {
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
function Rs(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = Ls[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function zs(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = Is[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function Bs(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Vs = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Hs(e, t) {
	let n = Bs(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Bs(t[2]), a = Vs(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Us = /^[a-z0-9][a-z0-9-]*$/;
function Ws(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	Us.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), Bs(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...zi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function Gs(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Ks = () => ({ mobile: {
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
}), qs = (e, t, n = {}) => ({
	id: Gs("blk"),
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
}), Js = (e, t = {}) => ({
	id: Gs("blk"),
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
}), Ys = (e, t, n = {}) => ({
	id: Gs("blk"),
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
}), Xs = (e, t, n = 40) => ({
	id: Gs("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), Zs = (e, t = {}) => ({
	id: Gs("blk"),
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
}), Qs = (e, t = {}) => ({
	id: Gs("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: Z("form.sendDefault"),
		successText: Z("form.thanksDefault"),
		fields: Ds(),
		...t
	},
	animation: null,
	frames: e
}), $s = (e, t = {}) => ({
	id: Gs("blk"),
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
}), ec = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), tc = (e, t, n = {}) => ({
	id: Gs("blk"),
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
}), nc = (e, t = {}) => ({
	id: Gs("blk"),
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
}), rc = (e, t = {}) => ({
	id: Gs("blk"),
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
}), ic = (e, t = {}) => ({
	id: Gs("blk"),
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
}), ac = (e, t = {}) => ({
	id: Gs("blk"),
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
}), oc = (e, t) => ({
	id: Gs("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), sc = (e, t = {}) => ({
	id: Gs("blk"),
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
}), cc = (e, t) => ({
	id: Gs("blk"),
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
}), lc = (e, t = {}) => ({
	id: Gs("blk"),
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
}), uc = (...e) => ({
	version: 1,
	layers: e
}), dc = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), fc = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), pc = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), mc = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), hc = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = mc(e, t, n, r, i, a);
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
		y: pc(e) + 16,
		n: 0
	};
}, gc = (e, t, n) => e + t * .1 + n * .01, _c = (e, t, n, r, i = null) => ({
	id: Gs("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Ks()
});
function vc(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => _c("blank", "40vh", uc(dc("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => _c("hero", "70vh", {
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
				fc(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			qs($(8.33, 40, 50, 38), Z("seed.hero.title")),
			qs($(8.33, 84, 41.67, 26), Z("seed.hero.intro")),
			Ys($(8.33, 118, 20, 32), Z("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => _c("hero-centered", "60vh", uc(dc("bg")), [
			qs($(15, 64, 70, 44), Z("seed.heroCenter.title"), { align: "center" }),
			qs($(25, 116, 50, 26), Z("seed.heroCenter.intro"), { align: "center" }),
			Ys($(31.5, 160, 17, 40), Z("seed.join")),
			Ys($(51.5, 160, 17, 40), Z("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = _c("hero-image", "70vh", {
				version: 1,
				layers: [
					dc("bg"),
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
				qs($(8.33, 40, 50, 38), Z("seed.hero.title")),
				qs($(8.33, 84, 41.67, 26), Z("seed.hero.intro")),
				Ys($(8.33, 118, 20, 32), Z("seed.readMore"))
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
			let e = _c("hero-photos", "70vh", {
				version: 1,
				layers: [
					dc("bg"),
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
				qs($(15, 64, 70, 44), Z("seed.heroCenter.title"), { align: "center" }),
				qs($(25, 116, 50, 26), Z("seed.heroCenter.intro"), { align: "center" }),
				Ys($(41.5, 160, 17, 40), Z("seed.readMore"))
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
		create: () => _c("images", "360px", uc(dc("bg")), [
			qs($(4, 24, 50, 32), Z("seed.images.title")),
			Js($(4, 72, 28, 220)),
			Js($(36, 72, 28, 220)),
			Js($(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = hc(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [Js($(t, n, 28, 220))],
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
		create: () => _c("gallery", "440px", uc(dc("bg")), [qs($(4, 24, 50, 32), Z("seed.gallery.title")), ac($(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => _c("find-us", "480px", uc(dc("bg")), [qs($(6, 40, 60, 70), Z("seed.findUs.title")), Zs($(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => _c("whats-on", "520px", uc(dc("bg")), [qs($(6, 40, 60, 70), Z("seed.whatsOn.title")), $s($(6, 130, 88, 320, 2), { limit: 5 })])
	}), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => _c("contact-form", "520px", uc(dc("bg")), [qs($(6, 40, 60, 120), Z("seed.contactForm.intro")), Qs($(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => _c("contact", "320px", uc(dc("surface"), fc(.2, .8, .2)), [
			qs($(10, 32, 40, 36), Z("seed.contact.title")),
			qs($(10, 84, 36, 130), Z("seed.contact.info"), { box: !0 }),
			Ys($(60, 100, 22, 40), Z("seed.contact.button"), { href: `mailto:${Z("seed.email")}` })
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
				let i = Xs($(e + 10.5, 88, 4, 52), n), a = qs($(e, 152, 25, 200), Z("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = ec(), i.mobileOrder = gc(88, t, 0), a.mobileOrder = gc(88, t, 1), [i, a];
			};
			return _c("feature-cards", "420px", uc(dc("bg")), [
				qs($(6, 28, 60, 38), Z("seed.features.title")),
				...e(6, 0, "✦", Z("seed.features.card1")),
				...e(37.5, 1, "★", Z("seed.features.card2")),
				...e(69, 2, "✓", Z("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = hc(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = Xs($(t + 10.5, n - 64, 4, 52), "✦"), a = qs($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = ec(), i.mobileOrder = gc(88, r, 0), a.mobileOrder = gc(88, r, 1), {
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
				let r = qs($(e, 88, 25, 200), Z("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = ec(), r.mobileOrder = gc(88, t, 0), r;
			};
			return _c("feature-cards-simple", "360px", uc(dc("bg")), [
				qs($(6, 28, 60, 38), Z("seed.features.title")),
				e(6, 0, Z("seed.features.card1")),
				e(37.5, 1, Z("seed.features.card2")),
				e(69, 2, Z("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = hc(e, 3, 6, 31.5, 88, 232, 25, 200), i = qs($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = ec(), i.mobileOrder = gc(88, r, 0), {
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
				let n = Js($(e, 88, 25, 160)), r = qs($(e, 256, 25, 160), Z("seed.news.card"));
				return n.mobileOrder = gc(88, t, 0), r.mobileOrder = gc(88, t, 1), [n, r];
			};
			return _c("news", "460px", uc(dc("bg")), [
				qs($(6, 28, 50, 38), Z("seed.news.title")),
				Ys($(78, 30, 16, 36), Z("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = hc(e, 3, 6, 31.5, 88, 344, 25, 328), i = Js($(t, n, 25, 160)), a = qs($(t, n + 168, 25, 160), Z("seed.news.card"));
			return i.mobileOrder = gc(88, r, 0), a.mobileOrder = gc(88, r, 1), {
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
		create: () => _c("news-collection", "300px", uc(dc("bg")), [qs($(6, 28, 50, 38), Z("seed.news.title")), tc($(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => _c("noticeboard", "300px", uc(dc("surface")), [qs($(6, 28, 50, 38), Z("seed.noticeboard.title")), tc($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => _c("publication-archive", "300px", uc(dc("bg")), [qs($(6, 28, 60, 38), Z("seed.archive.title")), tc($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				qs($(6, e, 8, 88), Z("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				qs($(16, e, 58, 88), Z("seed.events.row", { title: r })),
				Ys($(78, e + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
			];
			return _c("events", "440px", uc(dc("surface")), [
				qs($(6, 28, 50, 38), Z("seed.events.title")),
				...e(88, "11", Z("seed.events.monthAug"), Z("seed.events.row1")),
				...e(196, "25", Z("seed.events.monthAug"), Z("seed.events.row2")),
				...e(304, "8", Z("seed.events.monthSep"), Z("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = pc(e) + 16;
			return {
				blocks: [
					qs($(6, t, 8, 88), Z("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					qs($(16, t, 58, 88), Z("seed.events.row", { title: Z("seed.events.newTitle") })),
					Ys($(78, t + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
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
				let r = Js($(e, 80, 22, 180), { alt: Z("seed.team.alt") }), i = qs($(e, 268, 22, 84), Z("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = gc(80, t, 0), i.mobileOrder = gc(80, t, 1), [r, i];
			};
			return _c("team", "420px", uc(dc("surface")), [
				qs($(6, 24, 50, 32), Z("seed.team.title")),
				...e(7.5, 0, Z("seed.team.role1")),
				...e(39, 1, Z("seed.team.role2")),
				...e(70.5, 2, Z("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = hc(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = Js($(t, n, 22, 180), { alt: Z("seed.team.alt") }), a = qs($(t, n + 188, 22, 84), Z("seed.team.member", { role: Z("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = gc(80, r, 0), a.mobileOrder = gc(80, r, 1), {
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
		create: () => _c("faq", "520px", uc(dc("bg")), [
			qs($(25, 24, 50, 36), Z("seed.faq.title"), { align: "center" }),
			oc($(20, 80, 60, 320), [
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
			qs($(20, 416, 60, 32), Z("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => _c("timeline", "480px", uc(dc("bg")), [qs($(25, 24, 50, 36), Z("seed.timeline.title"), { align: "center" }), cc($(25, 88, 50, 330), [
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
				let r = qs($(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = qs($(e, 168, 25, 160), Z("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = gc(88, t, 0), i.mobileOrder = gc(88, t, 1), [r, i];
			};
			return _c("steps", "400px", uc(dc("bg")), [
				qs($(6, 28, 60, 38), Z("seed.steps.title")),
				...e(6, 0, Z("seed.steps.s1")),
				...e(37.5, 1, Z("seed.steps.s2")),
				...e(69, 2, Z("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = hc(e, 3, 6, 31.5, 88, 272, 25, 240), i = qs($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = qs($(t, n + 80, 25, 160), Z("seed.steps.card", { title: Z("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = gc(88, r, 0), a.mobileOrder = gc(88, r, 1), {
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
				Js($(6, 40, 55, 300)),
				qs($(6, 348, 55, 108), Z("seed.feature.main")),
				Ys($(6, 464, 14, 38), Z("seed.readMore"), { style: "secondary" }),
				Js($(66, 40, 28, 120)),
				qs($(66, 164, 28, 60), Z("seed.feature.small1")),
				Js($(66, 244, 28, 120)),
				qs($(66, 368, 28, 60), Z("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = gc(40, t < 3 ? 0 : 1, t);
			}), _c("lead-story", "540px", uc(dc("bg")), e);
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
					Js($(e, 88, 25, 200)),
					qs($(e, 296, 25, 76), Z("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Ys($(e + 5, 380, 15, 40), Z("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = gc(88, t, n);
				}), i;
			};
			return _c("products", "470px", uc(dc("bg")), [
				qs($(6, 28, 50, 38), Z("seed.products.title")),
				...e(6, 0, Z("seed.products.name"), Z("seed.products.price1")),
				...e(37.5, 1, Z("seed.products.name"), Z("seed.products.price2")),
				...e(69, 2, Z("seed.products.name"), Z("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = hc(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				Js($(t, n, 25, 200)),
				qs($(t, n + 208, 25, 76), Z("seed.products.card", {
					name: Z("seed.products.name"),
					price: Z("seed.products.price1")
				}), { align: "center" }),
				Ys($(t + 5, n + 292, 15, 40), Z("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = gc(88, r, t);
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
		create: () => _c("shop", "544px", uc(dc("bg")), [
			qs($(6, 28, 50, 38), Z("seed.shop.title")),
			rc($(78, 88, 16, 48)),
			nc($(6, 176, 88, 320))
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
				qs($(6, 48, 52, 96), Z("seed.shopHero.title")),
				qs($(6, 152, 40, 48), Z("seed.shopHero.sub")),
				Ys($(6, 216, 17, 42), Z("seed.shopHero.cta")),
				Js($(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = gc(48, t < 3 ? 0 : 1, t);
			}), _c("shop-hero", "400px", {
				version: 1,
				layers: [
					dc("bg"),
					fc(.8, .25, .28, .6),
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
				let r = Js($(e, 88, 21, 170)), i = qs($(e, 266, 21, 34), Z("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = gc(88, t, 0), i.mobileOrder = gc(88, t, 1), [r, i];
			}, t = _c("shop-categories", "360px", uc(dc("bg")), [
				qs($(6, 28, 60, 38), Z("seed.shopCategories.title")),
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
			let { x: t, y: n, n: r } = hc(e, 4, 6, 23.5, 88, 220, 21, 212), i = Js($(t, n, 21, 170)), a = qs($(t, n + 178, 21, 34), Z("seed.shopCategories.tile", { name: Z("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = gc(88, r, 0), a.mobileOrder = gc(88, r, 1), {
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
				let i = Xs($(e + 10.5, 88, 4, 52), r, 44), a = qs($(e, 148, 25, 96), Z(n), { align: "center" });
				return i.mobileOrder = gc(88, t, 0), a.mobileOrder = gc(88, t, 1), [i, a];
			}, t = _c("shop-trust", "300px", uc(dc("bg")), [
				qs($(6, 28, 60, 38), Z("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = hc(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = Xs($(t + 10.5, n - 60, 4, 52), "✓", 44), a = qs($(t, n, 25, 96), Z("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = gc(88, r, 0), a.mobileOrder = gc(88, r, 1), {
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
				qs($(6, 56, 52, 100), Z("seed.shopShowcase.title")),
				qs($(6, 164, 42, 56), Z("seed.shopShowcase.text")),
				Ys($(6, 236, 18, 42), Z("seed.shopShowcase.cta")),
				Js($(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = gc(56, t < 3 ? 0 : 1, t);
			});
			let t = _c("shop-showcase", "340px", uc(dc("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => _c("checkout", "560px", uc(dc("bg")), [qs($(6, 28, 50, 38), Z("seed.checkout.title")), ic($(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => _c("cta", "280px", uc(dc("surface"), fc(.5, .5, .3, .7)), [
			qs($(20, 56, 60, 40), Z("seed.cta.title"), { align: "center" }),
			qs($(25, 104, 50, 26), Z("seed.cta.sub"), { align: "center" }),
			Ys($(42, 148, 16, 42), Z("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => _c("quote", "300px", uc(dc("bg")), [sc($(20, 56, 60, 190), {
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
				let a = lc($(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = gc(76, t, 0), a;
			};
			return _c("stats", "260px", uc(dc("surface")), [
				e(6, 0, "120", "+", Z("seed.stats.l1")),
				e(37.5, 1, "25", "", Z("seed.stats.l2")),
				e(69, 2, "1981", "", Z("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = hc(e, 3, 6, 31.5, 76, 140, 25, 120), i = lc($(t, n, 25, 120), {
				value: "42",
				label: Z("seed.stats.newLabel")
			});
			return i.mobileOrder = gc(76, r, 0), {
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
			let e = (e) => Js($(e, 108, 18.5, 100), {
				alt: Z("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return _c("sponsors", "280px", uc(dc("bg")), [
				qs($(6, 28, 60, 36), Z("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = hc(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [Js($(t, n, 18.5, 100), {
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
		create: () => _c("membership", "500px", uc(dc("surface")), [
			qs($(6, 28, 50, 38), Z("seed.membership.title")),
			qs($(14, 88, 32, 250), Z("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			qs($(54, 88, 32, 250), Z("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Ys($(42, 358, 16, 42), Z("seed.join")),
			qs($(25, 414, 50, 30), Z("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var yc = [
	"section",
	"blocks",
	"page"
];
function bc(e) {
	return Ra(String(e ?? ""), "");
}
function xc(e, t, { id: n, title: r }) {
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
var Sc = [
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
function Cc(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function wc(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Tc(e) {
	let t = [Sc.join(",")];
	for (let n of e ?? []) t.push(Sc.map((e) => Cc(wc(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Ec(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Dc = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Oc(e) {
	let t = Ec(e);
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
		let s = Dc(t.sizes);
		s.length && (o.sizes = s);
		let c = Dc(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function kc(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function Ac(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${kc(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function jc(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var Mc = [
	"news",
	"notices",
	"publications"
];
function Nc(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${kc(n.text)}</description>` : "";
		return `    <item>\n      <title>${kc(n.title)}</title>\n      <link>${kc(r)}</link>\n      <guid isPermaLink="false">${kc(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${kc(e.title)}</title>\n    <link>${kc(t + "/")}</link>\n    <description>${kc(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
function Pc(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var Fc = [
	"floating",
	"fill",
	"band",
	"mosaic"
], Ic = [
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
], Lc = [
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
], Rc = [
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
], zc = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], Bc = {
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
}, Vc = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Hc = {
	min: 1,
	max: 20,
	dflt: 8
}, Uc = {
	min: 60,
	max: 400
}, Wc = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, Gc = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, Kc = 1.35, qc = {
	min: 0,
	max: 1,
	dflt: .85
}, Jc = {
	min: 0,
	max: 15,
	dflt: 5
}, Yc = {
	min: 0,
	max: 48,
	dflt: 5
}, Xc = {
	min: .5,
	max: 90,
	dflt: 30
}, Zc = {
	min: .5,
	max: 90,
	dflt: 12
}, Qc = {
	min: 4,
	max: 20,
	dflt: 12
};
function $c(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function el(e, t) {
	let n = $c(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function tl(e) {
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
function nl(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: tl(t) }));
}
var rl = (e) => Math.round(e * 100) / 100;
function il(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function al(e) {
	return Fc.includes(e) ? e : "floating";
}
function ol(e, t) {
	let n = al(e);
	return Bc[n].includes(t) ? t : Vc[n];
}
function sl(e) {
	return Bc[al(e)];
}
function cl({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : al(e) === "band" || ol(e, t) !== "none";
}
function ll(e, t, n, r = !1) {
	let i = Math.round(il(e, al(t) === "mosaic" ? Qc : Hc)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function ul(e, t) {
	let n = Wc[al(t)] || Wc.floating;
	return Math.round(il(e, {
		...Uc,
		dflt: n
	}));
}
function dl(e) {
	return ml(e) in Gc;
}
function fl(e, t) {
	let n = Gc[ml(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function pl(e) {
	return Ic.includes(e) ? e : "rect";
}
function ml(e) {
	return Lc.includes(e) ? e : "shadow";
}
function hl(e) {
	return Rc.includes(e) ? e : "natural";
}
function gl(e, t) {
	if (ml(t) === "polaroid") return .84;
	let n = pl(e);
	return zc.includes(n) ? 1 : n === "arch" ? .8 : Kc;
}
function _l(e) {
	return ["rect", "square"].includes(pl(e));
}
function vl(e) {
	return il(e, Zc);
}
function yl(e) {
	return il(e, qc);
}
function bl(e) {
	return il(e, Jc);
}
function xl(e) {
	return Math.round(il(e, Yc));
}
function Sl(e) {
	return il(e, Xc);
}
function Cl(e) {
	return Pc(e);
}
function wl(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function Tl(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = ll(t, o, c.length, s), u = ul(r, o), d = yl(i), f = bl(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: el(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + (el(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + (el(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: rl(50 + (n - .5) * 100 * d),
			y: rl(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + el(p, `w${e}`) * .4)),
			rot: El(p, e, f),
			phase: rl(el(p, `p${e}`)),
			heading: rl(el(p, `h${e}`))
		});
	}
	return _;
}
function El(e, t, n) {
	return rl((el(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * bl(n));
}
function Dl(e, t) {
	let n = e == null || e === "" ? 1 : e, r = el(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: rl(el(n, `mp${t}`))
	};
}
function Ol(e, t, n, r = !1) {
	let i = ll(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => Dl(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var kl = /^#[0-9a-fA-F]{3,8}$/, Al = /^[a-z][a-z0-9-]*$/, jl = "#171c26", Ml = "#232a38", Nl = "#98a1b3", Pl = "#7c5cff", Fl = (e, t) => `var(--urd-color-${e}, ${t})`;
function Il(e, t) {
	return typeof e == "string" ? kl.test(e) ? e : Al.test(e) ? Fl(e, t) : t : t;
}
function Ll(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Rl = (e) => Math.round(e * 10) / 10, zl = (e, t, n) => Math.min(n, Math.max(t, e)), Bl = (e, t, n, r, i, a = "") => `<rect x="${Rl(e)}" y="${Rl(t)}" width="${Rl(Math.max(n, 1))}" height="${Rl(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Vl(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? Fl("text", Nl) : e.theme === "accent" ? Fl("accent", Pl) : Fl("surface", Ml);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Il(t.props?.value, jl);
		if (t.type === "gradient") return Il(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, jl);
	}
	return Fl("bg", jl);
}
function Hl(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Fl("text", Nl), c = [];
	i?.box && c.push(Bl(e, t, n, r, Fl("surface", Ml), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = zl(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Bl(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Rl(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Ul(e, t, n, r, i = !1) {
	let a = Fl("text", Nl), o = [];
	i ? (o.push(Bl(e, t, n, r, Fl("surface", Ml), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Rl(e + .4)}" y="${Rl(t + .4)}" width="${Rl(Math.max(n - .8, 1))}" height="${Rl(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Bl(e, t, n, r, Fl("surface", Ml), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Rl(e + n * t), l = (e) => Rl(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Rl(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Rl(s + .1)}"/>`), o.join("");
}
function Wl(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Ul(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Gl(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Bl(s, t, a, r * .55, Fl("surface", Ml), " rx=\"1.5\"")), o.push(Bl(s, t + r * .62, a * .8, 2, Fl("text", Nl), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Kl(e, t, n, r, i) {
	let a = Il(i?.color, Pl), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Rl(e + n / 2)}" cy="${Rl(t + r / 2)}" rx="${Rl(Math.max(n / 2, 1))}" ry="${Rl(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Rl(e)},${Rl(t + r)} ${Rl(e + n / 2)},${Rl(t)} ${Rl(e + n)},${Rl(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Bl(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Bl(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function ql(e, t, n, r, i, a) {
	if (e === "text") return Hl(t, n, r, i, a);
	if (e === "image") return Ul(t, n, r, i, !a?.src);
	if (e === "gallery") return Wl(t, n, r, i, a);
	if (e === "collection") return Gl(t, n, r, i);
	if (e === "faq") {
		let e = zl(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Bl(t, e, r, o, Fl("surface", Ml), " rx=\"1\"")), s.push(Bl(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Fl("text", Nl), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Rl(t + r * .92)}" cy="${Rl(e + o / 2)}" r="0.9" fill="${Fl("text", Nl)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Kl(t, n, r, i, a);
	if (e === "button") return Bl(t, n, r, i, Fl("accent", Pl), ` rx="${Rl(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Rl(t + r / 2)}" cy="${Rl(n + i / 2)}" r="${Rl(e)}" fill="${Fl("accent", Pl)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Bl(t, n, r, i, Fl("surface", Ml), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Rl(a - s / 2)},${Rl(o - s)} ${Rl(a - s / 2)},${Rl(o + s)} ${Rl(a + s)},${Rl(o)}" fill="${Fl("text", Nl)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [Bl(t + 1, n, 1.4, i, Fl("accent", Pl), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Rl(t + 1.7)}" cy="${Rl(o)}" r="1.6" fill="${Fl("accent", Pl)}"/>`), e.push(Bl(t + 5, o - 1, r * .5, 2, Fl("text", Nl), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Rl(t + r / 2)}" y="${Rl(n + i * .34)}" text-anchor="middle" font-size="${Rl(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Fl("accent", Pl)}">“</text>`,
		Bl(t + r * .15, n + i * .48, r * .7, 2, Fl("text", Nl), " opacity=\"0.6\" rx=\"1\""),
		Bl(t + r * .25, n + i * .62, r * .5, 2, Fl("text", Nl), " opacity=\"0.6\" rx=\"1\""),
		Bl(t + r * .35, n + i * .82, r * .3, 1.6, Fl("text", Nl), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		Bl(t, n + i * .3, r, i * .4, Fl("accent", Pl), " opacity=\"0.85\" rx=\"1\""),
		Bl(t + r * .08, n + i * .46, r * .18, 1.8, Fl("bg", jl), " opacity=\"0.9\" rx=\"0.9\""),
		Bl(t + r * .34, n + i * .46, r * .24, 1.8, Fl("bg", jl), " opacity=\"0.9\" rx=\"0.9\""),
		Bl(t + r * .66, n + i * .46, r * .2, 1.8, Fl("bg", jl), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [Bl(t + r * .28, n + i * .15, r * .44, i * .42, Fl("accent", Pl), " opacity=\"0.85\" rx=\"1\""), Bl(t + r * .32, n + i * .72, r * .36, 1.6, Fl("text", Nl), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [Bl(t, n, r, e, Fl("accent", Pl), " opacity=\"0.5\" rx=\"0.8\"")], o = zl(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Bl(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Fl("text", Nl), " opacity=\"0.3\""));
		return a.push(Bl(t + r * .33, n, .6, i, Fl("text", Nl), " opacity=\"0.2\"")), a.push(Bl(t + r * .66, n, .6, i, Fl("text", Nl), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Rl(t + e + r * (e * 2 + 1.5))}" cy="${Rl(n + i / 2)}" r="${Rl(e)}" fill="${Fl("accent", Pl)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Bl(s, n, a, i, Fl("surface", Ml), " rx=\"1\"")), o.push(Bl(s + a * .25, n + i * .2, a * .5, i * .35, Fl("accent", Pl), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Bl(t, n, r, i, Fl("surface", Ml), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Rl(t + r * .06)},${Rl(a - o)} ${Rl(t + r * .06)},${Rl(a + o)} ${Rl(t + r * .06 + o * 1.4)},${Rl(a)}" fill="${Fl("accent", Pl)}" opacity="0.85"/>`), e.push(Bl(t + r * .2, a - .6, r * .7, 1.2, Fl("text", Nl), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(Bl(s, n, a, i, Fl("surface", Ml), " rx=\"1\"")), o.push(Bl(s + a * .08, n + i * .06, a * .84, i * .42, Fl("text", Nl), " opacity=\"0.15\" rx=\"0.8\"")), o.push(Bl(s + a * .08, n + i * .56, a * .6, 1.4, Fl("text", Nl), " opacity=\"0.5\" rx=\"0.7\"")), o.push(Bl(s + a * .08, n + i * .72, a * .35, 1.4, Fl("accent", Pl), " opacity=\"0.85\" rx=\"0.7\"")), o.push(Bl(s + a * .08, n + i * .84, a * .84, i * .1, Fl("accent", Pl), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Rl(a)}" cy="${Rl(o)}" r="${Rl(e)}" fill="${Fl("surface", Ml)}"/>`,
			Bl(a - e * .5, o - e * .25, e, e * .55, Fl("text", Nl), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Rl(a + e * .75)}" cy="${Rl(o - e * .75)}" r="${Rl(Math.max(.9, e * .35))}" fill="${Fl("accent", Pl)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		Bl(t, n, r * .7, 1.2, Fl("text", Nl), " opacity=\"0.5\" rx=\"0.6\""),
		Bl(t, n + i * .12, r * .5, 1.2, Fl("text", Nl), " opacity=\"0.35\" rx=\"0.6\""),
		Bl(t, n + i * .3, r, i * .14, Fl("surface", Ml), " rx=\"1\""),
		Bl(t, n + i * .5, r, i * .14, Fl("surface", Ml), " rx=\"1\""),
		Bl(t, n + i * .78, r * .45, i * .16, Fl("accent", Pl), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : Bl(t, n, r, i, Fl("surface", Ml), " rx=\"1.5\"");
}
function Jl(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Ll(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Bl(0, 0, t, n, Vl(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Rl(zl(e.x ?? .5, 0, 1) * t)}" cy="${Rl(zl(e.y ?? .3, 0, 1) * n)}" r="${Rl(t * zl(e.radius ?? .5, .1, 1) * .5)}" fill="${Il(e.color, Pl)}" opacity="${Rl(zl(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = Fl("surface", Ml);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of Tl(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${Rl(r.rot)} ${Rl(e + s / 2)} ${Rl(i + c / 2)})"`;
				o.push(Bl(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(Bl(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of Ol(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(Bl(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = zl(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = zl((r.y ?? 0) * a, 0, n - 2), u = zl((r.w ?? 10) * (c / 100), 2, t - i), d = zl((r.h ?? 20) * a, 2, n - l);
		o.push(ql(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Yl(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Bl(0, 0, t, n, Fl("bg", jl))}</svg>`;
	let a = i.map((e) => zl(Ll(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Rl(l)})">${Jl(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var Xl = /* @__PURE__ */ new Map();
vc({ sections: { define: (e, t) => Xl.set(e, t) } });
var Zl = [
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
function Ql(e, { pageId: t, title: n }) {
	let r = Zl.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Xl.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function $l(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function eu(e, t) {
	let n = $l(t).trim(), r = $l(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function tu(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: eu(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function nu(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function ru(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var iu = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function au(e) {
	return typeof e == "string" && iu.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function ou(e) {
	let t = e.tokens || {}, n = ru(e, "light"), r = ru(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			au(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && au(u) && au(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && au(u) && au(d) && s.push({
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
	].some((e) => au(e.color?.["accent-text"])) && au(t.color?.accent);
	u && au(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function su(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var cu = {
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
}, lu = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(cu).flatMap(Object.keys))];
function uu(e) {
	return cu[e] ?? {};
}
function du(e) {
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
function fu(e, t) {
	let n = du(e), r = du(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var pu = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = su(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, mu = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function hu(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function gu(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function _u(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function vu(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${su(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function yu(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (mu[t] ?? []).includes(e.animation) ? e.animation : null, r = hu(e.stops), i = r.map((e) => `${su(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: gu(r),
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
var bu = /* @__PURE__ */ new Set(), xu = !1;
function Su(e) {
	bu.add(e), !(xu || typeof window > "u") && (xu = !0, window.addEventListener("resize", () => {
		for (let e of [...bu]) e() || bu.delete(e);
	}));
}
var Cu = !1;
function wu() {
	if (!Cu) {
		Cu = !0;
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
var Tu = {
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
		let n = yu(t);
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
					let e = _u(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = vu(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), Su(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && wu());
	}
}, Eu = {
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
		let n = su(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Du = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Ou = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Du, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, ku = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], Au = {
	min: 8,
	max: 160,
	dflt: 28
}, ju = .12, Mu = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function Nu(e) {
	return ku.includes(e) ? e : "dots";
}
function Pu(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Au.dflt : Math.min(Au.max, Math.max(Au.min, Math.round(t)));
}
function Fu(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Iu(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? ju : Math.min(1, Math.max(0, t));
}
function Lu(e = {}) {
	let t = Pu(e.size), n = Fu(e.rotation), r = Mu[Nu(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Ru = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), zu = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: Au.dflt,
		opacity: ju,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Ru()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(Lu(t))}")`;
		e.style.backgroundColor = su(t.color ?? "text"), e.style.opacity = String(Iu(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, Bu = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], Vu = {
	min: 16,
	max: 240,
	dflt: 64
}, Hu = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function Uu(e) {
	return typeof e == "string" && Hu.test(e);
}
var Wu = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function Gu(e) {
	return typeof e == "string" && Wu.test(e.trim());
}
var Ku = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function qu(e) {
	return Gu(e) || typeof e == "string" && Ku.test(e.trim());
}
var Ju = [
	"launcher",
	"cart",
	"theme"
];
function Yu(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) Ju.includes(e) && !n.includes(e) && n.push(e);
	for (let e of Ju) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var Xu = .4, Zu = [
	"none",
	"kenburns",
	"drift"
], Qu = {
	min: 6,
	max: 60,
	dflt: 20
};
function $u(e) {
	return Zu.includes(e) ? e : "none";
}
function ed(e) {
	let { min: t, max: n, dflt: r } = Qu, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function td(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function nd(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function rd(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function id(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * Xu * t;
	return Math.round(Math.min(i, r * e));
}
function ad(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * Xu, s = i ?? id(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var od = /* @__PURE__ */ new Set(), sd = !1, cd = 0;
function ld() {
	cd = 0;
	for (let e of [...od]) e() || od.delete(e);
}
function ud() {
	cd ||= requestAnimationFrame(ld);
}
function dd(e) {
	od.add(e), e(), !(sd || typeof window > "u") && (sd = !0, window.addEventListener("scroll", ud, { passive: !0 }), window.addEventListener("resize", ud, { passive: !0 }));
}
function fd(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = id(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = ad(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	dd(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function pd() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var md = /* @__PURE__ */ new Set(), hd = !1, gd = 0;
function _d() {
	gd = 0;
	for (let e of [...md]) e() || md.delete(e);
}
function vd() {
	!gd && typeof requestAnimationFrame == "function" && (gd = requestAnimationFrame(_d));
}
function yd(e) {
	md.add(e), e(), !(hd || typeof window > "u") && (hd = !0, window.addEventListener("resize", vd, { passive: !0 }));
}
function bd(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = id(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	yd(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var xd = {
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
		motionSpeed: Qu.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: Qu.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !Uu(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? tl(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = rd(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = $u(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${ed(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = nd(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = td(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && Sd(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function Sd(e, t, n, r) {
	pd() ? bd(e, t, n, r) : fd(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
var Cd = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], wd = [
	"grid",
	"mosaic",
	"polaroid"
], Td = {
	min: 80,
	max: 400,
	dflt: 140
}, Ed = {
	min: 0,
	max: 15,
	dflt: 4
};
function Dd(e) {
	return Cd.includes(e) ? e : "grid";
}
function Od(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function kd({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Ad(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var jd = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], Md = {
	min: 1,
	max: 60,
	dflt: 24
}, Nd = [
	"name",
	"newest",
	"random"
], Pd = [
	480,
	800,
	1200,
	1600,
	2e3
], Fd = /^[A-Za-z0-9_-]{10,128}$/, Id = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function Ld(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Md.dflt : Math.min(Md.max, Math.max(Md.min, Math.round(t)));
}
function Rd(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Fd.test(t) && !t.includes(".")) return {
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
		return Fd.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Fd.test(t) ? { host: t } : {}
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
	return i && Id.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && Id.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function zd(e) {
	return Nd.includes(e) ? e : "name";
}
var Bd = (e) => zd(e) === "newest" ? "newest" : "name";
function Vd(e, t) {
	if (!e || !jd.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: Bd(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Hd(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function Ud(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Wd(e, t) {
	let n = [...e], r = Ud(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function Gd(e, t, n) {
	return zd(t) === "random" ? Wd(e, n) : [...e];
}
var Kd = 0;
function qd() {
	return Kd ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, Kd;
}
function Jd(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Pd.find((e) => e >= n) ?? Pd[Pd.length - 1];
}
function Yd(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var Xd = 6e5, Zd = 3e4, Qd = /* @__PURE__ */ new Map(), $d = /* @__PURE__ */ new Map();
function ef(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function tf(e, t) {
	let n = Vd(Rd(e), t);
	return n ? nf(Qd.get(n)) : null;
}
function nf(e) {
	if (!e) return null;
	let t = e.value.photos.length ? Xd : Zd;
	return Date.now() - e.at < t ? e.value : null;
}
function rf(e, t, { force: n = !1 } = {}) {
	let r = Vd(Rd(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = nf(Qd.get(r));
		if (e) return Promise.resolve(e);
		if ($d.has(r)) return $d.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Hd(n),
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
		return Qd.set(r, {
			at: Date.now(),
			value: e
		}), $d.delete(r), e;
	})();
	return $d.set(r, i), i;
}
function af(e) {
	let t = ef(e), n = t ? tf(t, e.order) : null;
	return n?.photos.length ? Gd(n.photos, e.order, qd()).slice(0, Ld(e.folderMax)) : e.images ?? [];
}
function of(e, t, n) {
	let r = ef(t);
	r && !tf(r, t.order) && rf(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var sf = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: Md.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: Xc.dflt,
	interval: Zc.dflt,
	fade: 1.5,
	count: Hc.dflt,
	seed: 0,
	size: null,
	spread: qc.dflt,
	tilt: Jc.dflt,
	radius: Yc.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, cf = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...sf
	}),
	migrations: { 1: (e) => ({
		...sf,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		of(e, t, uf);
	}
}, lf = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function uf(e, t) {
	let n = al(t.style), r = af(t).filter((e) => Uu(e?.src)), i = pl(t.shape), a = ml(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${hl(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${xl(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = fl(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", su(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = ol(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: gl(i, a),
		moves: cl({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: wl(t.seed, qd()),
		time: Sl(t.motionSpeed),
		dwell: vl(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	xf[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function df(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? Yd(a.src, r) : tl(i)}")`, e.style.backgroundPosition = a ? td(a.x, a.y) : "";
}
function ff({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? nl(3) : n, l = Jd(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = $u(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = lf("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${ed(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : Yd(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : nd(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : td(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : Yd(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !kd({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(Ad(o, { fallback: Zc.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = Od(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : Yd(c[e].src, l);
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
function pf(e, t, n, r, i) {
	let a = lf("div", "urd-gallery-skin"), o = lf("div", "urd-gallery-face");
	return df(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function mf(e, t) {
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
function hf({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = mf(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function gf(e, t, n) {
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
			a >= 0 && (df(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, _f(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function _f(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function vf(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	gf(Tl(i, c).map((n, r) => {
		let a = lf("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = Jd(n.w, s), { skin: l, face: u } = pf(a, i, n.index, c, r);
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
		return _f(d, n), hf(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = Tl(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function yf(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = Cl(n.rows), l = ul(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = Jd(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = lf("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = lf("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = lf("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), pf(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = lf("div", "urd-ribbon-run");
		l(f);
		let p = lf("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function bf(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = Ol(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${ul(n.size, "mosaic")}px`);
	let u = Jd(ul(n.size, "mosaic") * 2.2, a);
	gf(l.map((e, n) => {
		let i = lf("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = pf(i, r, a, u, n);
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
var xf = {
	fill: ff,
	floating: vf,
	band: yf,
	mosaic: bf
}, Sf = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Cf(e) {
	return typeof e == "string" && Sf.test(e);
}
var wf = null;
function Tf(e) {
	wf ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				wf.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), wf.observe(e);
}
var Ef = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = td(n, r);
}, Df = {
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
		if (!Cf(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!Uu(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Ef(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), Uu(t.poster) && (n.poster = t.poster), n.src = t.src, Ef(n, t.fit, t.x, t.y), e.appendChild(n), Tf(n), t.parallax > 0 && Sd(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function Of(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += kf(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += kf(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += kf(n, e.baselineLinks), o + "</svg>";
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
	return o += kf(n, e.baselineLinks), o + "</svg>";
}
function kf(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var Af = () => ({
	duration: 600,
	delay: 0
}), jf = 90, Mf = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Af,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Af,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Af,
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
			step: jf,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Nf = [
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
function Pf(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var Ff = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], If = [
	"all",
	"signup",
	"subscribe",
	"subscribeMulti",
	"addGoogle"
], Lf = (e, t = "colors") => ({
	key: e,
	labelKey: `calendar.slot.${e}`,
	section: t
}), Rf = [
	{
		id: "plain",
		labelKey: "calendar.design.plain",
		view: null,
		stripe: !1,
		slots: [
			Lf("accent"),
			Lf("surface"),
			Lf("line"),
			Lf("chip")
		],
		texts: [
			"next",
			"now",
			"later",
			...If
		]
	},
	{
		id: "timeline",
		labelKey: "calendar.design.timeline",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Lf("accent"),
			Lf("dot"),
			Lf("line"),
			Lf("chip")
		],
		texts: If
	},
	{
		id: "table",
		labelKey: "calendar.design.table",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Lf("accent"),
			Lf("head"),
			Lf("headText"),
			Lf("zebra"),
			Lf("line"),
			Lf("chip")
		],
		texts: [
			"colDate",
			"colTime",
			"colEvent",
			"colPlace",
			...If
		]
	},
	{
		id: "booklet",
		labelKey: "calendar.design.booklet",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Lf("accent"),
			Lf("surface"),
			Lf("rule"),
			Lf("chip")
		],
		texts: ["program", ...If]
	},
	{
		id: "numbered",
		labelKey: "calendar.design.numbered",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Lf("accent"),
			Lf("number"),
			Lf("line"),
			Lf("chip")
		],
		texts: If
	},
	{
		id: "apList",
		labelKey: "calendar.design.apList",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Lf("row"),
			Lf("text"),
			Lf("gold"),
			Lf("line")
		],
		texts: If
	},
	{
		id: "glass",
		labelKey: "calendar.design.glass",
		view: "list",
		module: "list",
		stripe: !1,
		slots: [
			Lf("ground"),
			Lf("text"),
			Lf("glass", "glass"),
			Lf("glassLine", "glass"),
			Lf("chip", "glass"),
			Lf("blobA", "blobs"),
			Lf("blobB", "blobs"),
			Lf("blobC", "blobs")
		],
		texts: If
	}
];
function zf(e) {
	return Rf.find((t) => t.id === e) ?? Rf[0];
}
var Bf = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Vf = /^[a-z][a-z0-9-]*$/;
function Hf(e) {
	return typeof e == "string" ? Bf.test(e) ? e : Vf.test(e) ? `var(--urd-color-${e})` : null : null;
}
function Uf(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? Hf(t?.color) : null
	};
}
var Wf = {
	min: 8,
	max: 120
};
function Gf(e, t) {
	let n = e?.[t];
	return typeof n == "string" && n.trim() ? n : null;
}
function Kf(e, t) {
	return e.texts.some((e) => Gf(t, e) !== null);
}
//#endregion
//#region src/App.svelte
var qf = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Jf = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Yf = /* @__PURE__ */ U("<p> </p>"), Xf = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"60\" class=\"svelte-1n46o8q\"/></label> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!>", 1), Zf = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Qf = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), $f = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ep = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), tp = /* @__PURE__ */ U("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), np = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), rp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), ip = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ap = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), op = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), sp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), cp = /* @__PURE__ */ U("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), lp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), up = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), dp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), fp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), pp = /* @__PURE__ */ U("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>"), mp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" max=\"20\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), hp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), gp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label>"), _p = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), vp = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\" class=\"svelte-1n46o8q\"/> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), yp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/>", 1), bp = /* @__PURE__ */ U("<label><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), xp = /* @__PURE__ */ U("<!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Sp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Cp = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), wp = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), Tp = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Ep = /* @__PURE__ */ U("<input class=\"nav-target svelte-1n46o8q\"/>"), Dp = /* @__PURE__ */ U("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Op = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), kp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Ap = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), jp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), Mp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Np = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/>"), Pp = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Fp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ip = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\" spellcheck=\"false\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <!></span></div>"), Lp = /* @__PURE__ */ U("<button type=\"button\" class=\"linkish cal-source svelte-1n46o8q\"> </button>"), Rp = /* @__PURE__ */ U("<span class=\"gridmenu-value svelte-1n46o8q\"> </span>"), zp = /* @__PURE__ */ U("<!> <!>", 1), Bp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label>"), Vp = /* @__PURE__ */ U("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), Hp = /* @__PURE__ */ U("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"> </button>"), Up = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Wp = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Gp = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Kp = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), qp = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Jp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Yp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Xp = /* @__PURE__ */ U("<button type=\"button\"></button>"), Zp = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input class=\"field-filled svelte-1n46o8q\"/></label>"), Qp = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-6 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), $p = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), em = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), tm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), nm = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button>"), rm = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), im = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), am = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), om = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/>", 1), sm = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), cm = /* @__PURE__ */ U("<!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), lm = /* @__PURE__ */ U("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), um = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), dm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), fm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), pm = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), mm = /* @__PURE__ */ U("<button class=\"ghost action svelte-1n46o8q\"> </button>"), hm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), gm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), _m = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), vm = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), ym = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), bm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), xm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Sm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Cm = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span>"), wm = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!></div>"), Tm = /* @__PURE__ */ U("<!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Em = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Dm = /* @__PURE__ */ U("<!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Om = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), km = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Am = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), jm = /* @__PURE__ */ U("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Mm = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Nm = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Pm = /* @__PURE__ */ U("<button class=\"ghost action svelte-1n46o8q\"> </button> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Fm = /* @__PURE__ */ U("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), Im = /* @__PURE__ */ U("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), Lm = /* @__PURE__ */ U("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div></div> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Rm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), zm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Bm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Vm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Hm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Um = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Wm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Gm = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>", 1), Km = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), qm = /* @__PURE__ */ U("<!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"80\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Jm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Ym = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Xm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), Zm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Qm = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), $m = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), eh = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), th = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), nh = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), rh = /* @__PURE__ */ U("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), ih = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), ah = /* @__PURE__ */ U("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), oh = /* @__PURE__ */ U("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), sh = /* @__PURE__ */ U("<button><!> </button>"), ch = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"></div>"), lh = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), uh = /* @__PURE__ */ U("<button></button>"), dh = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), fh = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), ph = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), mh = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), hh = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), gh = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), _h = /* @__PURE__ */ U("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), vh = /* @__PURE__ */ U("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), yh = /* @__PURE__ */ U("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), bh = /* @__PURE__ */ U("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), xh = /* @__PURE__ */ U("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), Sh = /* @__PURE__ */ U("<span class=\"who svelte-1n46o8q\"><!> </span>"), Ch = /* @__PURE__ */ U("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), wh = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Th = /* @__PURE__ */ U("<button> </button>"), Eh = /* @__PURE__ */ U("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Dh = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), Oh = /* @__PURE__ */ U("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), kh = /* @__PURE__ */ U("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), Ah = /* @__PURE__ */ U("<span class=\"page-path svelte-1n46o8q\">/</span>"), jh = /* @__PURE__ */ U("<input class=\"page-slug svelte-1n46o8q\"/>"), Mh = /* @__PURE__ */ U("<span class=\"seo-warn svelte-1n46o8q\"></span>"), Nh = /* @__PURE__ */ U("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Ph = /* @__PURE__ */ U("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Fh = /* @__PURE__ */ U("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Ih = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Lh = /* @__PURE__ */ U("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), Rh = /* @__PURE__ */ U("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), zh = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), Bh = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), Vh = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Hh = /* @__PURE__ */ U("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), Uh = /* @__PURE__ */ U("<span class=\"logo-file svelte-1n46o8q\"> </span>"), Wh = /* @__PURE__ */ U("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), Gh = /* @__PURE__ */ U("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), Kh = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), qh = /* @__PURE__ */ U("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Jh = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Yh = /* @__PURE__ */ U("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Xh = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Zh = /* @__PURE__ */ U("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), Qh = /* @__PURE__ */ U("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), $h = /* @__PURE__ */ U("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), eg = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), tg = /* @__PURE__ */ U("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), ng = /* @__PURE__ */ U("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), rg = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), ig = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ag = /* @__PURE__ */ U("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), og = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), sg = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), cg = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), lg = /* @__PURE__ */ U("<span class=\"tool-move svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), ug = /* @__PURE__ */ U("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), dg = /* @__PURE__ */ U("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div>"), fg = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label>"), pg = /* @__PURE__ */ U("<img alt=\"\"/>"), mg = /* @__PURE__ */ U("<span class=\"lrow-warn svelte-1n46o8q\"></span>"), hg = /* @__PURE__ */ U("<span class=\"lrow-tile-mark svelte-1n46o8q\"><!></span> <span class=\"lrow-tile-name svelte-1n46o8q\"> </span>", 1), gg = /* @__PURE__ */ U("<span class=\"bad-target-note svelte-1n46o8q\"> </span>"), _g = /* @__PURE__ */ U("<div class=\"lrow-body svelte-1n46o8q\"><!> <div class=\"lrow-fields svelte-1n46o8q\"><input class=\"field-filled svelte-1n46o8q\"/> <input/> <!> <span class=\"lrow-actions svelte-1n46o8q\"><!> <button class=\"linkish danger svelte-1n46o8q\"> </button></span></div></div>"), vg = /* @__PURE__ */ U("<div><div class=\"lrow-head svelte-1n46o8q\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark svelte-1n46o8q\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\" role=\"none\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"lrow-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></div> <!></div>"), yg = /* @__PURE__ */ U("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"lbtn-pick svelte-1n46o8q\"><!> <span class=\"lbtn-name svelte-1n46o8q\"><!></span></span></div> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), bg = /* @__PURE__ */ U("<details class=\"group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"> <!></span></summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details>"), xg = /* @__PURE__ */ U("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), Sg = /* @__PURE__ */ U("<input class=\"nav-item-href svelte-1n46o8q\"/>"), Cg = /* @__PURE__ */ U("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), wg = /* @__PURE__ */ U("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), Tg = /* @__PURE__ */ U("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), Eg = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <!> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!>  <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), Dg = /* @__PURE__ */ U("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), Og = /* @__PURE__ */ U("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), kg = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Ag = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), jg = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), Mg = /* @__PURE__ */ U("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), Ng = /* @__PURE__ */ U("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Pg = /* @__PURE__ */ U("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), Fg = /* @__PURE__ */ U("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Ig = /* @__PURE__ */ U("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Lg = /* @__PURE__ */ U("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Rg = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), zg = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), Bg = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), Vg = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Hg = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), Ug = /* @__PURE__ */ U("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), Wg = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Gg = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Kg = /* @__PURE__ */ U("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), qg = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"4\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Jg = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Yg = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Xg = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Zg = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Qg = /* @__PURE__ */ U("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), $g = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), e_ = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), t_ = /* @__PURE__ */ U("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), n_ = /* @__PURE__ */ U("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), r_ = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), i_ = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), a_ = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), o_ = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), s_ = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), c_ = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), l_ = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), u_ = /* @__PURE__ */ U("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), d_ = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), f_ = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), p_ = /* @__PURE__ */ U("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), m_ = /* @__PURE__ */ U("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), h_ = /* @__PURE__ */ U("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), g_ = /* @__PURE__ */ U("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), __ = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), v_ = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), y_ = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), b_ = /* @__PURE__ */ U("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), x_ = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), S_ = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), C_ = /* @__PURE__ */ U("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), w_ = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), T_ = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), E_ = /* @__PURE__ */ U("<span class=\"chip svelte-1n46o8q\"> </span>"), D_ = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), O_ = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), k_ = /* @__PURE__ */ U("<span class=\"update-warn svelte-1n46o8q\"></span>"), A_ = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), j_ = /* @__PURE__ */ U("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), M_ = /* @__PURE__ */ U("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), N_ = /* @__PURE__ */ U("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), P_ = /* @__PURE__ */ U("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), F_ = /* @__PURE__ */ U("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), I_ = /* @__PURE__ */ U("<p class=\"loading svelte-1n46o8q\"> </p>"), L_ = /* @__PURE__ */ U("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), R_ = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), z_ = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), B_ = /* @__PURE__ */ U("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), V_ = /* @__PURE__ */ U("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), H_ = /* @__PURE__ */ U("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>     <!>", 1);
function U_(e, t) {
	Je(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = jr(), a = I(i), o = (e) => {
			var i = Jf(), a = I(i), o = F(a), s = R(o);
			O(a), Kr(R(a, 2), 17, () => r().props.images ?? [], Hr, (e, i, a) => {
				var o = qf(), s = I(o), c = F(s), l = R(c, 2), u = F(l);
				u.disabled = a === 0, q(u, () => T.up, !0), O(u);
				var d = R(u, 2);
				q(d, () => T.down, !0), O(d);
				var f = R(d, 2);
				q(f, () => T.cross, !0), O(f), O(l), O(s);
				var p = R(s, 2), m = F(p), h = L(R(m));
				O(p);
				var g = R(p, 2);
				J(g);
				var _ = R(g, 2), v = F(_), y = L(R(v));
				O(_);
				var b = R(_, 2);
				J(b), B((e, t, n, o, s) => {
					X(c, "src", V(i).src), d.disabled = a === r().props.images.length - 1, X(f, "title", e), G(m, `${t ?? ""} `), G(h, `${n ?? ""}%`), Y(g, V(i).x ?? .5), G(v, `${o ?? ""} `), G(y, `${s ?? ""}%`), Y(b, V(i).y ?? .5);
				}, [
					() => Z("tip.removeImage"),
					() => Z("lbl.focusX"),
					() => Math.round((V(i).x ?? .5) * 100),
					() => Z("lbl.focusY"),
					() => Math.round((V(i).y ?? .5) * 100)
				]), H("click", u, () => Ci(t(), n(), a, -1)), H("click", d, () => Ci(t(), n(), a, 1)), H("click", f, () => wi(t(), n(), a)), H("input", g, (e) => Ei(t(), n(), a, "x", Number(e.target.value))), H("input", b, (e) => Ei(t(), n(), a, "y", Number(e.target.value))), W(e, o);
			}), B((e, t) => {
				X(a, "title", e), G(o, `${t ?? ""} `);
			}, [() => Z("tip.bg.addImages"), () => Z("ui.addImages")]), H("change", s, (e) => Si(t(), n(), e)), W(e, i);
		};
		K(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), W(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ j(() => Gc(r()));
		var a = Zf(), o = I(a), s = F(o), c = R(s);
		{
			let e = /* @__PURE__ */ j(() => V(i).source ?? "upload"), r = /* @__PURE__ */ j(() => [["upload", Z("opt.photoSource.upload")], ["folder", Z("opt.photoSource.folder")]]);
			Q(c, {
				get value() {
					return V(e);
				},
				get options() {
					return V(r);
				},
				onchange: (e) => Rr(t(), n(), "source", e)
			});
		}
		O(o);
		var l = R(o, 2), u = (e) => {
			let a = /* @__PURE__ */ j(() => Rd(V(i).folder ?? "")), o = /* @__PURE__ */ j(() => !V(a) || V(a).provider === "drive" || V(a).provider === "nextcloud");
			var s = Xf(), c = I(s), l = F(c), u = R(l);
			J(u);
			let d;
			O(c);
			var f = R(c, 2), p = F(f), m = R(p);
			{
				let e = /* @__PURE__ */ j(() => V(o) || V(i).order === "random" ? V(i).order ?? "name" : "name"), r = /* @__PURE__ */ j(() => V(o) ? [
					["name", Z("opt.folderOrder.name")],
					["newest", Z("opt.folderOrder.newest")],
					["random", Z("opt.folderOrder.random")]
				] : [["name", Z("opt.folderOrder.listed")], ["random", Z("opt.folderOrder.random")]]);
				Q(m, {
					get value() {
						return V(e);
					},
					get options() {
						return V(r);
					},
					onchange: (e) => Rr(t(), n(), "order", e)
				});
			}
			O(f);
			var h = R(f, 2), g = F(h), _ = R(g);
			J(_), O(h);
			var v = R(h, 2), y = F(v);
			q(y, () => T.eye);
			var b = R(y);
			O(v);
			var x = R(v, 2), S = (e) => {
				var r = Yf();
				let i;
				var a = L(r, !0);
				B((e, t) => {
					i = mi(r, 1, "folder-status svelte-1n46o8q", null, i, { err: e }), G(a, t);
				}, [() => _i[vi(t(), n())].err, () => _i[vi(t(), n())].text]), W(e, r);
			}, C = /* @__PURE__ */ j(() => _i[vi(t(), n())]);
			K(x, (e) => {
				V(C) && e(S);
			}), B((e, t, n, r, o, s, m, y) => {
				X(c, "title", e), G(l, `${t ?? ""} `), Y(u, V(i).folder ?? ""), d = mi(u, 1, "svelte-1n46o8q", null, d, { "bad-target": n }), X(f, "title", r), G(p, `${o ?? ""} `), X(h, "title", s), G(g, `${m ?? ""} `), Y(_, V(i).folderMax ?? 24), v.disabled = !V(a), G(b, ` ${y ?? ""}`);
			}, [
				() => Z("tip.bg.photoFolder"),
				() => Z("lbl.photoFolder"),
				() => (V(i).folder ?? "").trim() && !V(a),
				() => Z("tip.bg.folderOrder"),
				() => Z("lbl.folderOrder"),
				() => Z("tip.bg.folderMax"),
				() => Z("lbl.folderMax"),
				() => Z("ui.checkFolder")
			]), H("change", u, (e) => Rr(t(), n(), "folder", e.target.value.trim())), H("change", _, (e) => Rr(t(), n(), "folderMax", Number(e.target.value))), H("click", v, () => bi(t(), n(), r())), W(e, s);
		};
		K(l, (e) => {
			(V(i).source ?? "upload") === "folder" && e(u);
		}), B((e, t) => {
			X(o, "title", e), G(s, `${t ?? ""} `);
		}, [() => Z("tip.bg.photoSource"), () => Z("lbl.photoSource")]), W(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = Zf(), a = I(i), o = F(a), s = R(o);
		{
			let e = /* @__PURE__ */ j(() => r().props.motion ?? "none"), i = /* @__PURE__ */ j(() => [
				["none", Z("common.none")],
				["kenburns", Z("opt.bgMotion.kenburns")],
				["drift", Z("opt.bgMotion.drift")]
			]);
			Q(s, {
				get value() {
					return V(e);
				},
				get options() {
					return V(i);
				},
				onchange: (e) => Rr(t(), n(), "motion", e)
			});
		}
		O(a);
		var c = R(a, 2), l = (e) => {
			var i = Qf(), a = I(i), o = F(a), s = L(R(o));
			O(a);
			var c = R(a, 2);
			J(c), B((e) => {
				G(o, `${e ?? ""} `), G(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), Y(c, r().props.motionSpeed ?? 20);
			}, [() => Z("lbl.motionSpeed")]), H("input", c, (e) => Rr(t(), n(), "motionSpeed", Number(e.target.value))), W(e, i);
		};
		K(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), B((e, t) => {
			X(a, "title", e), G(o, `${t ?? ""} `);
		}, [() => Z("tip.bg.imageMotion"), () => Z("lbl.motion")]), W(e, i);
	}, a = (e, t = f, a = f) => {
		var o = Tp(), s = I(o);
		Kr(s, 17, a, Hr, (e, o, s) => {
			var c = wp(), l = F(c), u = F(l);
			{
				let e = /* @__PURE__ */ j(() => Z("tip.bg.changeType")), n = /* @__PURE__ */ j(() => w.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
				Q(u, {
					get value() {
						return V(o).type;
					},
					get title() {
						return V(e);
					},
					get options() {
						return V(n);
					},
					onchange: (e) => ri(t(), s, e)
				});
			}
			var d = R(u, 2), f = F(d);
			f.disabled = s === 0, q(f, () => T.up, !0), O(f);
			var p = R(f, 2);
			q(p, () => T.down, !0), O(p);
			var m = R(p, 2);
			q(m, () => T.cross, !0), O(m), O(d), O(l);
			var h = R(l, 2), g = (e) => {
				var n = $f(), r = I(n), i = F(r), a = R(i);
				{
					let e = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.bg.layerColor"));
					va(a, {
						get value() {
							return V(o).props.value;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => Rr(t(), s, "value", e)
					});
				}
				O(r);
				var c = R(r, 2), l = F(c), u = L(R(l));
				O(c);
				var d = R(c, 2);
				J(d), B((e, t, n) => {
					G(i, `${e ?? ""} `), G(l, `${t ?? ""} `), G(u, `${n ?? ""}%`), Y(d, V(o).props.opacity ?? 1);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.strength"),
					() => Math.round((V(o).props.opacity ?? 1) * 100)
				]), H("input", d, (e) => Rr(t(), s, "opacity", Number(e.target.value))), W(e, n);
			}, _ = (e) => {
				let n = /* @__PURE__ */ j(() => Gr(V(o))), r = /* @__PURE__ */ j(() => V(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var i = ip(), a = I(i), c = F(a), l = R(c);
				{
					let e = /* @__PURE__ */ j(() => V(n).kind ?? "linear"), r = /* @__PURE__ */ j(() => [["linear", Z("opt.grad.linear")], ["radial", Z("opt.grad.radial")]]);
					Q(l, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => Xr(t(), s, e)
					});
				}
				O(a);
				var u = R(a, 2);
				Kr(u, 17, () => V(n).stops, Hr, (e, i, a) => {
					var o = tp();
					let c;
					var l = F(o), u = R(l, 2);
					{
						let e = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.bg.stopColor"));
						va(u, {
							get value() {
								return V(i).color;
							},
							get tokens() {
								return V(e);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => Zr(t(), s, a, { color: e })
						});
					}
					var d = R(u, 2);
					J(d);
					var f = R(d, 2), p = L(f), m = R(f, 2), h = (e) => {
						var n = ep();
						q(n, () => T.cross, !0), O(n), B((e) => X(n, "title", e), [() => Z("tip.bg.removeStop")]), H("click", n, () => $r(t(), s, a)), W(e, n);
					};
					K(m, (e) => {
						V(n).stops.length > 2 && e(h);
					}), O(o), B((e, t, r) => {
						c = mi(o, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: V(ti)?.layer === s && V(ti).from === a,
							"drop-above": V(ti)?.layer === s && V(ti).insert === a,
							"drop-below": V(ti)?.layer === s && V(ti).insert === V(n).stops.length && a === V(n).stops.length - 1
						}), X(l, "title", e), Y(d, V(i).share ?? 50), X(d, "title", t), G(p, `${r ?? ""}%`);
					}, [
						() => Z("tip.bg.dragStop"),
						() => Z("tip.bg.stopShare"),
						() => V(r) > 0 ? Math.round(Math.max(0, Number(V(i).share) || 0) / V(r) * 100) : Math.round(100 / V(n).stops.length)
					]), H("pointerdown", l, (e) => ni(t(), e, s, a)), H("input", d, (e) => Zr(t(), s, a, { share: Number(e.target.value) })), W(e, o);
				});
				var d = R(u, 2), f = L(d, !0), p = R(d, 2), m = (e) => {
					var r = np(), i = I(r), a = F(i), o = L(R(a));
					O(i);
					var c = R(i, 2);
					J(c);
					var l = R(c, 2), u = F(l), d = L(R(u));
					O(l);
					var f = R(l, 2);
					J(f), B((e, t, r, i) => {
						G(a, `${e ?? ""} `), G(o, `${t ?? ""}%`), Y(c, V(n).x ?? .5), G(u, `${r ?? ""} `), G(d, `${i ?? ""}%`), Y(f, V(n).y ?? .5);
					}, [
						() => Z("lbl.centerX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Z("lbl.centerY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("input", c, (e) => Jr(t(), s, "x", Number(e.target.value))), H("input", f, (e) => Jr(t(), s, "y", Number(e.target.value))), W(e, r);
				}, h = (e) => {
					var r = rp(), i = I(r), a = F(i), o = L(R(a));
					O(i);
					var c = R(i, 2);
					J(c), B((e) => {
						G(a, `${e ?? ""} `), G(o, `${V(n).angle ?? ""}°`), Y(c, V(n).angle);
					}, [() => Z("lbl.angle")]), H("input", c, (e) => Jr(t(), s, "angle", Number(e.target.value))), W(e, r);
				};
				K(p, (e) => {
					(V(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = R(p, 2), _ = F(g), v = L(R(_));
				O(g);
				var y = R(g, 2);
				J(y);
				var b = R(y, 2), x = F(b), S = R(x);
				{
					let e = /* @__PURE__ */ j(() => V(n).animation ?? "none");
					Q(S, {
						get value() {
							return V(e);
						},
						get options() {
							return Yr[(V(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Jr(t(), s, "animation", e)
					});
				}
				O(b), B((e, t, r, i, a, o, s) => {
					G(c, `${e ?? ""} `), X(d, "title", t), G(f, r), G(_, `${i ?? ""} `), G(v, `${a ?? ""}%`), Y(y, V(n).opacity ?? 1), X(b, "title", o), G(x, `${s ?? ""} `);
				}, [
					() => Z("blocks.shape"),
					() => Z("tip.bg.addStop"),
					() => Z("ui.addStop"),
					() => Z("lbl.strength"),
					() => Math.round((V(n).opacity ?? 1) * 100),
					() => Z("tip.bg.motion"),
					() => Z("lbl.motion")
				]), H("click", d, () => Qr(t(), s)), H("input", y, (e) => Jr(t(), s, "opacity", Number(e.target.value))), W(e, i);
			}, v = (e) => {
				var n = ap(), r = I(n), i = F(r), a = R(i);
				{
					let e = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.bg.glowColor"));
					va(a, {
						get value() {
							return V(o).props.color;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => Rr(t(), s, "color", e)
					});
				}
				O(r);
				var c = R(r, 2), l = F(c), u = L(R(l));
				O(c);
				var d = R(c, 2);
				J(d);
				var f = R(d, 2), p = F(f), m = L(R(p));
				O(f);
				var h = R(f, 2);
				J(h);
				var g = R(h, 2), _ = F(g), v = L(R(_));
				O(g);
				var y = R(g, 2);
				J(y);
				var b = R(y, 2), x = F(b), S = L(R(x));
				O(b);
				var C = R(b, 2);
				J(C), B((e, t, n, r, a, s, c, f, g) => {
					G(i, `${e ?? ""} `), G(l, `${t ?? ""} `), G(u, `${n ?? ""}%`), Y(d, V(o).props.x), G(p, `${r ?? ""} `), G(m, `${a ?? ""}%`), Y(h, V(o).props.y), G(_, `${s ?? ""} `), G(v, `${c ?? ""}%`), Y(y, V(o).props.radius), G(x, `${f ?? ""} `), G(S, `${g ?? ""}%`), Y(C, V(o).props.opacity);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.posX"),
					() => Math.round(V(o).props.x * 100),
					() => Z("lbl.posY"),
					() => Math.round(V(o).props.y * 100),
					() => Z("lbl.size"),
					() => Math.round(V(o).props.radius * 100),
					() => Z("lbl.strength"),
					() => Math.round(V(o).props.opacity * 100)
				]), H("input", d, (e) => Rr(t(), s, "x", Number(e.target.value))), H("input", h, (e) => Rr(t(), s, "y", Number(e.target.value))), H("input", y, (e) => Rr(t(), s, "radius", Number(e.target.value))), H("input", C, (e) => Rr(t(), s, "opacity", Number(e.target.value))), W(e, n);
			}, y = (e) => {
				var n = op(), r = I(n), i = F(r), a = L(R(i));
				O(r);
				var c = R(r, 2);
				J(c), B((e, t) => {
					G(i, `${e ?? ""} `), G(a, `${t ?? ""}%`), Y(c, V(o).props.opacity);
				}, [() => Z("lbl.strength"), () => Math.round(V(o).props.opacity * 100)]), H("input", c, (e) => Rr(t(), s, "opacity", Number(e.target.value))), W(e, n);
			}, b = (e) => {
				var n = sp(), r = I(n), i = F(r), a = R(i);
				{
					let e = /* @__PURE__ */ j(() => Nu(V(o).props.pattern)), n = /* @__PURE__ */ j(() => ku.map((e) => [e, Z(`opt.bgPattern.${e}`)]));
					Q(a, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => Rr(t(), s, "pattern", e)
					});
				}
				O(r);
				var c = R(r, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ j(() => V(o).props.color ?? "text"), n = /* @__PURE__ */ j(Fi), r = /* @__PURE__ */ j(() => Z("lbl.color"));
					va(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(n);
						},
						get label() {
							return V(r);
						},
						onchange: (e) => Rr(t(), s, "color", e)
					});
				}
				O(c);
				var d = R(c, 2), f = F(d), p = L(R(f));
				O(d);
				var m = R(d, 2);
				J(m);
				var h = R(m, 2), g = F(h), _ = L(R(g));
				O(h);
				var v = R(h, 2);
				J(v);
				var y = R(v, 2), b = F(y), x = L(R(b));
				O(y);
				var S = R(y, 2);
				J(S);
				var C = R(S, 2), w = F(C);
				J(w);
				var ee = R(w);
				O(C), B((e, t, n, r, a, s, c, u) => {
					G(i, `${e ?? ""} `), G(l, `${t ?? ""} `), G(f, `${n ?? ""} `), G(p, `${V(o).props.size ?? Au.dflt ?? ""} px`), X(m, "min", Au.min), X(m, "max", Au.max), Y(m, V(o).props.size ?? Au.dflt), G(g, `${r ?? ""} `), G(_, `${a ?? ""}%`), Y(v, V(o).props.opacity ?? .12), G(b, `${s ?? ""} `), G(x, `${V(o).props.rotation ?? 0 ?? ""}°`), Y(S, V(o).props.rotation ?? 0), X(C, "title", c), xi(w, V(o).props.invert === !0), G(ee, ` ${u ?? ""}`);
				}, [
					() => Z("lbl.bgPattern"),
					() => Z("lbl.color"),
					() => Z("lbl.size"),
					() => Z("lbl.strength"),
					() => Math.round((V(o).props.opacity ?? .12) * 100),
					() => Z("lbl.patternRotation"),
					() => Z("tip.bg.patternInvert"),
					() => Z("lbl.patternInvert")
				]), H("input", m, (e) => Rr(t(), s, "size", Number(e.target.value))), H("input", v, (e) => Rr(t(), s, "opacity", Number(e.target.value))), H("input", S, (e) => Rr(t(), s, "rotation", Number(e.target.value))), H("change", w, (e) => Rr(t(), s, "invert", e.target.checked)), W(e, n);
			}, x = (e) => {
				let n = /* @__PURE__ */ j(() => V(o).props.fit === "tile" || V(o).props.fit === "repeat");
				var r = up(), a = I(r), c = F(a), l = R(c);
				O(a);
				var u = R(a, 2), d = F(u), f = R(d);
				{
					let e = /* @__PURE__ */ j(() => V(n) ? "tile" : "plain"), r = /* @__PURE__ */ j(() => [["plain", Z("opt.img.plain")], ["tile", Z("opt.img.tile")]]);
					Q(f, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => Rr(t(), s, "fit", e)
					});
				}
				O(u);
				var p = R(u, 2), m = L(p, !0), h = R(p, 2), g = F(h), _ = R(g, 2);
				J(_);
				var v = R(_, 4);
				O(h);
				var y = R(h, 2), b = (e) => {
					var n = cp(), r = I(n), i = F(r), a = L(i, !0), c = R(i, 2), l = L(c, !0);
					O(r);
					var u = R(r, 2), d = L(u, !0), f = R(u, 2), p = R(f, 2), m = F(p), h = L(R(m));
					O(p);
					var g = R(p, 2);
					J(g);
					var _ = R(g, 2), v = F(_), y = L(R(v));
					O(_);
					var b = R(_, 2);
					J(b), B((e, t, n, r, s, p, _, x, S, C, w, ee) => {
						X(i, "title", e), G(a, t), X(c, "title", n), G(l, r), X(u, "title", s), G(d, p), gi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), G(m, `${S ?? ""} `), G(h, `${C ?? ""}%`), Y(g, V(o).props.x ?? .5), G(v, `${w ?? ""} `), G(y, `${ee ?? ""}%`), Y(b, V(o).props.y ?? .5);
					}, [
						() => Z("tip.bg.cover"),
						() => Z("ui.cover"),
						() => Z("opt.fitFrame.contain"),
						() => Z("opt.fit.contain"),
						() => Z("tip.bg.position"),
						() => Z("lbl.position"),
						() => Math.max(0, Math.min(1, V(o).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, V(o).props.y ?? .5)) * 100,
						() => Z("lbl.horizontal"),
						() => Math.round((V(o).props.x ?? .5) * 100),
						() => Z("lbl.vertical"),
						() => Math.round((V(o).props.y ?? .5) * 100)
					]), H("click", i, () => Wr(t(), s, V(o), "cover")), H("click", c, () => Wr(t(), s, V(o), "contain")), H("pointerdown", f, (e) => zr(e, t(), s, "xy")), H("input", g, (e) => Rr(t(), s, "x", Number(e.target.value))), H("input", b, (e) => Rr(t(), s, "y", Number(e.target.value))), W(e, n);
				};
				K(y, (e) => {
					V(n) || e(b);
				});
				var x = R(y, 2), S = F(x), C = L(R(S));
				O(x);
				var w = R(x, 2);
				J(w);
				var ee = R(w, 2), T = F(ee), te = L(R(T));
				O(ee);
				var ne = R(ee, 2);
				J(ne);
				var re = R(ne, 2);
				i(re, t, () => s, () => V(o));
				var ie = R(re, 2), ae = F(ie);
				J(ae);
				var oe = R(ae);
				O(ie);
				var E = R(ie, 2), se = (e) => {
					var n = lp(), r = I(n), i = F(r), a = L(R(i));
					O(r);
					var c = R(r, 2);
					J(c);
					var l = R(c, 2), u = F(l), d = R(u);
					{
						let e = /* @__PURE__ */ j(() => V(o).props.bleed ?? "none"), n = /* @__PURE__ */ j(() => [
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
							onchange: (e) => Rr(t(), s, "bleed", e)
						});
					}
					O(l), B((e, t, n, r) => {
						G(i, `${e ?? ""} `), G(a, `${t ?? ""}%`), Y(c, V(o).props.parallax ?? .3), X(l, "title", n), G(u, `${r ?? ""} `);
					}, [
						() => Z("lbl.parallaxStrength"),
						() => Math.round((V(o).props.parallax ?? 0) * 100),
						() => Z("tip.bg.bleed"),
						() => Z("lbl.bleed")
					]), H("input", c, (e) => Rr(t(), s, "parallax", Number(e.target.value))), W(e, n);
				};
				K(E, (e) => {
					(V(o).props.parallax ?? 0) > 0 && e(se);
				}), B((e, t, n, r, i, s, l, f, h, y, b, x, ee, re) => {
					X(a, "title", e), G(c, `${t ?? ""} `), X(u, "title", n), G(d, `${r ?? ""} `), X(p, "title", i), G(m, s), X(g, "title", l), Y(_, f), X(v, "title", h), G(S, `${y ?? ""} `), G(C, `${V(o).props.blur ?? 0 ?? ""} px`), Y(w, V(o).props.blur ?? 0), G(T, `${b ?? ""} `), G(te, `${x ?? ""}%`), Y(ne, V(o).props.opacity ?? 1), X(ie, "title", ee), xi(ae, (V(o).props.parallax ?? 0) > 0), G(oe, ` ${re ?? ""}`);
				}, [
					() => Z("tip.webpAuto"),
					() => V(o).props.src ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("tip.bg.size"),
					() => Z("lbl.size"),
					() => Z("tip.smaller"),
					() => Math.round((V(o).props.size ?? 1) * 100),
					() => Z("tip.larger"),
					() => Z("lbl.blur"),
					() => Z("lbl.strength"),
					() => Math.round((V(o).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), H("change", l, (e) => fi(t(), s, e)), H("click", g, () => Vr(t(), s, V(o).props.size ?? 1, -.05)), H("change", _, (e) => Ur(t(), s, e.target.value)), H("click", v, () => Vr(t(), s, V(o).props.size ?? 1, .05)), H("input", w, (e) => Rr(t(), s, "blur", Number(e.target.value))), H("input", ne, (e) => Rr(t(), s, "opacity", Number(e.target.value))), H("change", ae, (e) => Rr(t(), s, "parallax", e.target.checked ? .3 : 0)), W(e, r);
			}, S = (e) => {
				let i = /* @__PURE__ */ j(() => Gc(V(o))), a = /* @__PURE__ */ j(() => V(i).style ?? "floating"), c = /* @__PURE__ */ j(() => ol(V(a), V(i).motion)), l = /* @__PURE__ */ j(() => (V(i).seed ?? 0) > 0);
				var u = xp(), d = I(u);
				r(d, t, () => s, () => V(o));
				var f = R(d, 2);
				n(f, t, () => s, () => V(o));
				var p = R(f, 2), m = F(p), h = R(m);
				{
					let e = /* @__PURE__ */ j(() => Fc.map((e) => [e, Z(`opt.galleryStyle.${e}`)]));
					Q(h, {
						get value() {
							return V(a);
						},
						get options() {
							return V(e);
						},
						onchange: (e) => Rr(t(), s, "style", e)
					});
				}
				O(p);
				var g = R(p, 2), _ = (e) => {
					var n = dp(), r = I(n), a = F(r), o = R(a);
					{
						let e = /* @__PURE__ */ j(() => V(i).fit ?? "cover"), n = /* @__PURE__ */ j(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
						Q(o, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => Rr(t(), s, "fit", e)
						});
					}
					O(r);
					var c = R(r, 2), l = F(c), u = L(R(l));
					O(c);
					var d = R(c, 2);
					J(d);
					var f = R(d, 2), p = F(f), m = L(R(p));
					O(f);
					var h = R(f, 2);
					J(h);
					var g = R(h, 2), _ = F(g), v = L(R(_));
					O(g);
					var y = R(g, 2);
					J(y), B((e, t, n, r, o) => {
						G(a, `${e ?? ""} `), G(l, `${t ?? ""} `), G(u, `${V(i).interval ?? 12 ?? ""} s`), Y(d, V(i).interval ?? 12), G(p, `${n ?? ""} `), G(m, `${r ?? ""} s`), Y(h, V(i).fade ?? 1.5), G(_, `${o ?? ""} `), G(v, `${V(i).blur ?? 0 ?? ""} px`), Y(y, V(i).blur ?? 0);
					}, [
						() => Z("lbl.fit"),
						() => Z("lbl.secondsPerImage"),
						() => Z("lbl.transition"),
						() => (V(i).fade ?? 1.5).toFixed(1),
						() => Z("lbl.blur")
					]), H("input", d, (e) => Rr(t(), s, "interval", Number(e.target.value))), H("input", h, (e) => Rr(t(), s, "fade", Number(e.target.value))), H("input", y, (e) => Rr(t(), s, "blur", Number(e.target.value))), W(e, n);
				}, v = (e) => {
					var n = vp(), r = I(n), o = (e) => {
						var n = fp(), r = I(n), a = F(r), o = R(a);
						{
							let e = /* @__PURE__ */ j(() => String(V(i).rows ?? 2));
							Q(o, {
								get value() {
									return V(e);
								},
								options: [["1", "1"], ["2", "2"]],
								onchange: (e) => Rr(t(), s, "rows", Number(e))
							});
						}
						O(r);
						var c = R(r, 2), l = F(c), u = R(l);
						{
							let e = /* @__PURE__ */ j(() => V(i).direction ?? "left"), n = /* @__PURE__ */ j(() => [["left", Z("opt.ribbonDir.left")], ["right", Z("opt.ribbonDir.right")]]);
							Q(u, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Rr(t(), s, "direction", e)
							});
						}
						O(c), B((e, t) => {
							G(a, `${e ?? ""} `), G(l, `${t ?? ""} `);
						}, [() => Z("lbl.galleryRows"), () => Z("lbl.photoDirection")]), W(e, n);
					}, c = (e) => {
						var n = mp(), r = I(n), o = F(r), c = R(o);
						J(c), O(r);
						var u = R(r, 2), d = F(u), f = R(d);
						{
							let e = /* @__PURE__ */ j(() => V(i).repeat === !0 ? "repeat" : "once"), n = /* @__PURE__ */ j(() => [["once", Z("opt.galleryRepeat.once")], ["repeat", Z("opt.galleryRepeat.repeat")]]);
							Q(f, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Rr(t(), s, "repeat", e === "repeat")
							});
						}
						O(u);
						var p = R(u, 2), m = F(p), h = R(m);
						{
							let e = /* @__PURE__ */ j(() => V(l) ? "fixed" : "random"), n = /* @__PURE__ */ j(() => [["random", Z("opt.galleryPlace.random")], ["fixed", Z("opt.galleryPlace.fixed")]]);
							Q(h, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Rr(t(), s, "seed", e === "fixed" ? yi() : 0)
							});
						}
						O(p);
						var g = R(p, 2), _ = (e) => {
							var n = pp(), r = F(n);
							q(r, () => T.shuffle);
							var i = R(r);
							O(n), B((e, t) => {
								X(n, "title", e), G(i, ` ${t ?? ""}`);
							}, [() => Z("tip.bg.photoSeed"), () => Z("ui.shufflePhotos")]), H("click", n, () => Rr(t(), s, "seed", yi())), W(e, n);
						};
						K(g, (e) => {
							V(l) && e(_);
						}), B((e, t, n, s, l, f) => {
							X(r, "title", e), G(o, `${t ?? ""} `), X(c, "min", V(a) === "mosaic" ? 4 : 1), Y(c, V(i).count ?? (V(a) === "mosaic" ? 12 : 8)), X(u, "title", n), G(d, `${s ?? ""} `), X(p, "title", l), G(m, `${f ?? ""} `);
						}, [
							() => Z("tip.bg.photoCount"),
							() => Z("lbl.photoCount"),
							() => Z("tip.bg.galleryRepeat"),
							() => Z("lbl.galleryRepeat"),
							() => Z("tip.bg.galleryPlace"),
							() => Z("lbl.galleryPlace")
						]), H("change", c, (e) => Rr(t(), s, "count", Number(e.target.value))), W(e, n);
					};
					K(r, (e) => {
						V(a) === "band" ? e(o) : e(c, -1);
					});
					var u = R(r, 2), d = F(u), f = L(R(d));
					O(u);
					var p = R(u, 2);
					J(p);
					var m = R(p, 2), h = (e) => {
						var n = hp(), r = I(n), a = F(r), o = L(R(a));
						O(r);
						var c = R(r, 2);
						J(c);
						var l = R(c, 2), u = F(l), d = L(R(u));
						O(l);
						var f = R(l, 2);
						J(f), B((e, t, n, s) => {
							X(r, "title", e), G(a, `${t ?? ""} `), G(o, `${n ?? ""}%`), Y(c, V(i).spread ?? .85), G(u, `${s ?? ""} `), G(d, `${V(i).tilt ?? 5 ?? ""}°`), Y(f, V(i).tilt ?? 5);
						}, [
							() => Z("tip.bg.photoSpread"),
							() => Z("lbl.photoSpread"),
							() => Math.round((V(i).spread ?? .85) * 100),
							() => Z("lbl.photoTilt")
						]), H("input", c, (e) => Rr(t(), s, "spread", Number(e.target.value))), H("input", f, (e) => Rr(t(), s, "tilt", Number(e.target.value))), W(e, n);
					};
					K(m, (e) => {
						V(a) === "floating" && e(h);
					});
					var g = R(m, 2), _ = F(g), v = R(_);
					{
						let e = /* @__PURE__ */ j(() => V(i).shape ?? "rect"), n = /* @__PURE__ */ j(() => Ic.map((e) => [e, Z(`opt.galleryShape.${e}`)]));
						Q(v, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => Rr(t(), s, "shape", e)
						});
					}
					O(g);
					var y = R(g, 2), b = F(y), x = R(b);
					{
						let e = /* @__PURE__ */ j(() => V(i).look ?? "shadow"), n = /* @__PURE__ */ j(() => Lc.map((e) => [e, Z(`opt.galleryLook.${e}`)]));
						Q(x, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => Rr(t(), s, "look", e)
						});
					}
					O(y);
					var S = R(y, 2), C = (e) => {
						var n = gp(), r = F(n), a = R(r);
						{
							let e = /* @__PURE__ */ j(() => fl(V(i).look, V(i).frameColor)), n = /* @__PURE__ */ j(Fi), r = /* @__PURE__ */ j(() => Z("tip.bg.frameColor"));
							va(a, {
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
								onchange: (e) => Rr(t(), s, "frameColor", e ?? "")
							});
						}
						O(n), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.frameColor")]), W(e, n);
					}, w = /* @__PURE__ */ j(() => dl(V(i).look));
					K(S, (e) => {
						V(w) && e(C);
					});
					var ee = R(S, 2), te = (e) => {
						var n = _p(), r = I(n), a = F(r), o = L(R(a));
						O(r);
						var c = R(r, 2);
						J(c), B((e) => {
							G(a, `${e ?? ""} `), G(o, `${V(i).radius ?? 5 ?? ""} px`), Y(c, V(i).radius ?? 5);
						}, [() => Z("lbl.rounding")]), H("input", c, (e) => Rr(t(), s, "radius", Number(e.target.value))), W(e, n);
					}, ne = /* @__PURE__ */ j(() => _l(V(i).shape) && (V(i).look ?? "shadow") !== "polaroid");
					K(ee, (e) => {
						V(ne) && e(te);
					}), B((e, t, n, r, i, a, o) => {
						G(d, `${e ?? ""} `), G(f, `${t ?? ""} px`), Y(p, n), X(g, "title", r), G(_, `${i ?? ""} `), X(y, "title", a), G(b, `${o ?? ""} `);
					}, [
						() => Z("lbl.size"),
						() => ul(V(i).size, V(a)),
						() => ul(V(i).size, V(a)),
						() => Z("tip.bg.galleryShape"),
						() => Z("lbl.galleryShape"),
						() => Z("tip.bg.galleryLook"),
						() => Z("lbl.galleryLook")
					]), H("input", p, (e) => Rr(t(), s, "size", Number(e.target.value))), W(e, n);
				};
				K(g, (e) => {
					V(a) === "fill" ? e(_) : e(v, -1);
				});
				var y = R(g, 2), b = F(y), x = R(b);
				{
					let e = /* @__PURE__ */ j(() => V(i).tone ?? "natural"), n = /* @__PURE__ */ j(() => Rc.map((e) => [e, Z(`opt.galleryTone.${e}`)]));
					Q(x, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => Rr(t(), s, "tone", e)
					});
				}
				O(y);
				var S = R(y, 2), C = (e) => {
					var n = gp(), r = F(n), i = R(r);
					{
						let e = /* @__PURE__ */ j(() => sl(V(a)).map((e) => [e, Z(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
						Q(i, {
							get value() {
								return V(c);
							},
							get options() {
								return V(e);
							},
							onchange: (e) => Rr(t(), s, "motion", e)
						});
					}
					O(n), B((e, t) => {
						X(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Z("tip.bg.photoMotion"), () => Z("lbl.motion")]), W(e, n);
				}, w = /* @__PURE__ */ j(() => sl(V(a)).length > 1);
				K(S, (e) => {
					V(w) && e(C);
				});
				var ee = R(S, 2), te = (e) => {
					var n = yp(), r = I(n), a = F(r), o = L(R(a));
					O(r);
					var c = R(r, 2);
					J(c), B((e) => {
						G(a, `${e ?? ""} `), G(o, `${V(i).interval ?? 12 ?? ""} s`), Y(c, V(i).interval ?? 12);
					}, [() => Z("lbl.secondsPerImage")]), H("input", c, (e) => Rr(t(), s, "interval", Number(e.target.value))), W(e, n);
				}, ne = (e) => {
					var n = yp(), r = I(n), a = F(r), o = L(R(a));
					O(r);
					var c = R(r, 2);
					J(c), B((e) => {
						G(a, `${e ?? ""} `), G(o, `${V(i).motionSpeed ?? 30 ?? ""} s`), Y(c, V(i).motionSpeed ?? 30);
					}, [() => Z("lbl.motionSpeed")]), H("input", c, (e) => Rr(t(), s, "motionSpeed", Number(e.target.value))), W(e, n);
				};
				K(ee, (e) => {
					V(c) === "crossfade" && V(a) !== "fill" ? e(te) : (V(c) !== "none" || V(a) === "band") && e(ne, 1);
				});
				var re = R(ee, 2), ie = F(re);
				J(ie);
				var ae = R(ie);
				O(re);
				var oe = R(re, 2), E = (e) => {
					var n = bp();
					let r;
					var a = F(n);
					J(a);
					var o = R(a);
					O(n), B((e, t) => {
						r = mi(n, 1, "gridmenu-snap svelte-1n46o8q", null, r, { muted: V(i).underNav === !1 }), X(n, "title", e), xi(a, V(i).underAnnounce === !0), a.disabled = V(i).underNav === !1, G(o, ` ${t ?? ""}`);
					}, [() => Z("tip.bg.underAnnounce"), () => Z("lbl.underAnnounce")]), H("change", a, (e) => e.target.checked ? Lr(t(), s, {
						underAnnounce: !0,
						underNav: !0
					}) : Rr(t(), s, "underAnnounce", !1)), W(e, n);
				};
				K(oe, (e) => {
					V(A).nav?.announcement?.text && e(E);
				});
				var se = R(oe, 2), ce = F(se), le = L(R(ce));
				O(se);
				var ue = R(se, 2);
				J(ue), B((e, t, n, r, a, o, s, c) => {
					X(p, "title", e), G(m, `${t ?? ""} `), X(y, "title", n), G(b, `${r ?? ""} `), X(re, "title", a), xi(ie, V(i).underNav !== !1), G(ae, ` ${o ?? ""}`), G(ce, `${s ?? ""} `), G(le, `${c ?? ""}%`), Y(ue, V(i).opacity ?? .85);
				}, [
					() => Z("tip.bg.galleryStyle"),
					() => Z("lbl.galleryStyle"),
					() => Z("tip.bg.galleryTone"),
					() => Z("lbl.galleryTone"),
					() => Z("tip.bg.underNav"),
					() => Z("lbl.underNav"),
					() => Z("lbl.strength"),
					() => Math.round((V(i).opacity ?? .85) * 100)
				]), H("change", ie, (e) => e.target.checked ? Rr(t(), s, "underNav", !0) : Lr(t(), s, {
					underNav: !1,
					underAnnounce: !1
				})), H("input", ue, (e) => Rr(t(), s, "opacity", Number(e.target.value))), W(e, u);
			}, C = (e) => {
				var n = Cp(), r = I(n), i = F(r), a = R(i);
				O(r);
				var c = R(r, 2), l = F(c), u = R(l);
				O(c);
				var d = R(c, 2), f = F(d), p = R(f);
				{
					let e = /* @__PURE__ */ j(() => V(o).props.fit ?? "cover"), n = /* @__PURE__ */ j(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
					Q(p, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => Rr(t(), s, "fit", e)
					});
				}
				O(d);
				var m = R(d, 2), h = F(m), g = L(R(h));
				O(m);
				var _ = R(m, 2);
				J(_);
				var v = R(_, 2), y = F(v), b = L(R(y));
				O(v);
				var x = R(v, 2);
				J(x);
				var S = R(x, 2), C = F(S), w = L(R(C));
				O(S);
				var ee = R(S, 2);
				J(ee);
				var T = R(ee, 2), te = F(T);
				J(te);
				var ne = R(te);
				O(T);
				var re = R(T, 2), ie = (e) => {
					var n = Sp(), r = I(n), i = F(r), a = L(R(i));
					O(r);
					var c = R(r, 2);
					J(c), B((e, t) => {
						G(i, `${e ?? ""} `), G(a, `${t ?? ""}%`), Y(c, V(o).props.parallax ?? .3);
					}, [() => Z("lbl.parallaxStrength"), () => Math.round((V(o).props.parallax ?? 0) * 100)]), H("input", c, (e) => Rr(t(), s, "parallax", Number(e.target.value))), W(e, n);
				};
				K(re, (e) => {
					(V(o).props.parallax ?? 0) > 0 && e(ie);
				}), B((e, t, n, a, s, u, p, m, v, S, re, ie, ae, oe) => {
					X(r, "title", e), G(i, `${t ?? ""} `), X(c, "title", n), G(l, `${a ?? ""} `), X(d, "title", s), G(f, `${u ?? ""} `), G(h, `${p ?? ""} `), G(g, `${m ?? ""}%`), Y(_, V(o).props.x ?? .5), G(y, `${v ?? ""} `), G(b, `${S ?? ""}%`), Y(x, V(o).props.y ?? .5), G(C, `${re ?? ""} `), G(w, `${ie ?? ""}%`), Y(ee, V(o).props.opacity ?? 1), X(T, "title", ae), xi(te, (V(o).props.parallax ?? 0) > 0), G(ne, ` ${oe ?? ""}`);
				}, [
					() => Z("tip.bg.videoFile"),
					() => V(o).props.src ? Z("ui.changeVideo") : Z("ui.chooseVideo"),
					() => Z("tip.bg.poster"),
					() => V(o).props.poster ? Z("ui.changeImage") : Z("ui.choosePoster"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("lbl.horizontal"),
					() => Math.round((V(o).props.x ?? .5) * 100),
					() => Z("lbl.vertical"),
					() => Math.round((V(o).props.y ?? .5) * 100),
					() => Z("lbl.strength"),
					() => Math.round((V(o).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), H("change", a, (e) => pi(t(), s, e)), H("change", u, (e) => hi(t(), s, e)), H("input", _, (e) => Rr(t(), s, "x", Number(e.target.value))), H("input", x, (e) => Rr(t(), s, "y", Number(e.target.value))), H("input", ee, (e) => Rr(t(), s, "opacity", Number(e.target.value))), H("change", te, (e) => Rr(t(), s, "parallax", e.target.checked ? .3 : 0)), W(e, n);
			};
			K(h, (e) => {
				V(o).type === "color" ? e(g) : V(o).type === "gradient" ? e(_, 1) : V(o).type === "glow" ? e(v, 2) : V(o).type === "grain" ? e(y, 3) : V(o).type === "pattern" ? e(b, 4) : V(o).type === "image" ? e(x, 5) : V(o).type === "slideshow" ? e(S, 6) : V(o).type === "video" && e(C, 7);
			}), O(c), B((e, t, n) => {
				X(f, "title", e), X(p, "title", t), p.disabled = s === a().length - 1, X(m, "title", n);
			}, [
				() => Z("hint.bg.order"),
				() => Z("hint.bg.order"),
				() => Z("tip.bg.removeLayer")
			]), H("click", f, () => Ir(t(), s, -1)), H("click", p, () => Ir(t(), s, 1)), H("click", m, () => Fr(t(), s)), W(e, c);
		});
		var c = R(s, 2), l = F(c), u = R(l);
		{
			let e = /* @__PURE__ */ j(() => w.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
			Q(u, {
				get value() {
					return V(Nr);
				},
				get options() {
					return V(e);
				},
				onchange: (e) => N(Nr, e, !0)
			});
		}
		O(c);
		var d = R(c, 2), p = L(d, !0);
		B((e, t) => {
			G(l, `${e ?? ""} `), G(p, t);
		}, [() => Z("lbl.newLayer"), () => Z("ui.addLayer")]), H("click", d, () => Pr(t(), V(Nr))), W(e, o);
	}, o = (e, t = f, n = f) => {
		var r = jr();
		Kr(I(r), 17, n, Hr, (e, r, i) => {
			var a = Dp(), o = F(a);
			J(o);
			var s = R(o, 2), c = F(s);
			c.disabled = i === 0, q(c, () => T.up, !0), O(c);
			var l = R(c, 2);
			q(l, () => T.down, !0), O(l);
			var u = R(l, 2);
			q(u, () => T.cross, !0), O(u), O(s);
			var d = R(s, 2), f = F(d);
			{
				let e = /* @__PURE__ */ j(() => V(r).page ?? "__href"), n = /* @__PURE__ */ j(() => Z("tip.linkTarget")), a = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
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
					onchange: (e) => id(t(), i, e)
				});
			}
			O(d);
			var p = R(d, 2), m = (e) => {
				var n = Ep();
				J(n), B((e, t) => {
					Y(n, V(r).href ?? ""), X(n, "placeholder", e), X(n, "title", t);
				}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", n, (e) => ad(t(), i, e.target.value)), W(e, n);
			};
			K(p, (e) => {
				V(r).page || e(m);
			}), O(a), B((e, t) => {
				Y(o, V(r).label), X(o, "title", e), l.disabled = i === n().length - 1, X(u, "title", t);
			}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), H("input", o, (e) => rd(t(), i, e.target.value)), H("click", c, () => nd(t(), i, -1)), H("click", l, () => nd(t(), i, 1)), H("click", u, () => td(t(), i)), W(e, a);
		}), W(e, r);
	}, s = (e) => {
		let t = /* @__PURE__ */ j(() => V(P).props.boxStyle ?? {});
		var n = kp(), r = I(n), i = F(r), a = R(i);
		{
			let e = /* @__PURE__ */ j(() => V(t).bg ?? ""), n = /* @__PURE__ */ j(Fi), r = /* @__PURE__ */ j(() => Z("tip.box.bg"));
			va(a, {
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
				onchange: (e) => On({ bg: e || null })
			});
		}
		O(r);
		var o = R(r, 2), s = F(o), c = R(s);
		{
			let e = /* @__PURE__ */ j(() => V(t).shadow ?? ""), n = /* @__PURE__ */ j(() => [
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
				onchange: (e) => On({ shadow: e || null })
			});
		}
		O(o);
		var l = R(o, 2), u = (e) => {
			var n = gp(), r = F(n), i = R(r);
			{
				let e = /* @__PURE__ */ j(() => V(t).shadowColor ?? ""), n = /* @__PURE__ */ j(Fi), r = /* @__PURE__ */ j(() => Z("tip.box.shadowColor"));
				va(i, {
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
					onchange: (e) => On({ shadowColor: e || null })
				});
			}
			O(n), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.shadowColor")]), W(e, n);
		};
		K(l, (e) => {
			V(t).shadow && e(u);
		});
		var d = R(l, 2), f = F(d), p = R(f);
		{
			let e = /* @__PURE__ */ j(() => V(t).border === "none" ? "none" : V(t).border ? "custom" : ""), n = /* @__PURE__ */ j(() => [
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
				onchange: (e) => On({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		O(d);
		var m = R(d, 2), h = (e) => {
			let n = /* @__PURE__ */ j(() => typeof V(t).border == "object" ? V(t).border : {
				color: "text",
				width: 1
			});
			var r = Op(), i = I(r), a = F(i), o = R(a);
			{
				let e = /* @__PURE__ */ j(Fi), t = /* @__PURE__ */ j(() => Z("tip.box.borderColor"));
				va(o, {
					get value() {
						return V(n).color;
					},
					get tokens() {
						return V(e);
					},
					get label() {
						return V(t);
					},
					onchange: (e) => On({ border: {
						...V(n),
						color: e
					} })
				});
			}
			O(i);
			var s = R(i, 2), c = F(s), l = R(c), u = F(l), d = R(u, 2);
			J(d);
			var f = R(d, 2);
			O(l), O(s), B((e, t, r, i, o, s) => {
				G(a, `${e ?? ""} `), G(c, `${t ?? ""} `), X(u, "title", r), X(u, "aria-label", i), Y(d, V(n).width), X(f, "title", o), X(f, "aria-label", s);
			}, [
				() => Z("lbl.borderColor"),
				() => Z("lbl.thicknessPx"),
				() => Z("tip.thinner"),
				() => Z("tip.thinner"),
				() => Z("tip.thicker"),
				() => Z("tip.thicker")
			]), H("click", u, () => On({ border: {
				...V(n),
				width: Math.max(1, V(n).width - 1)
			} })), H("change", d, (e) => On({ border: {
				...V(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), H("click", f, () => On({ border: {
				...V(n),
				width: Math.min(12, V(n).width + 1)
			} })), W(e, r);
		};
		K(m, (e) => {
			V(t).border !== "none" && e(h);
		});
		var g = R(m, 2), _ = F(g);
		J(_);
		var v = R(_);
		O(g), B((e, t, n, r, a, o) => {
			G(i, `${e ?? ""} `), G(s, `${t ?? ""} `), G(f, `${n ?? ""} `), X(g, "title", r), xi(_, a), G(v, ` ${o ?? ""}`);
		}, [
			() => Z("lbl.blockColor"),
			() => Z("lbl.shadow"),
			() => Z("lbl.border"),
			() => Z("tip.box.glass"),
			() => !!V(t).glass,
			() => Z("lbl.glass")
		]), H("change", _, (e) => On({ glass: e.target.checked || null })), W(e, n);
	}, c = (e) => {
		var t = ah(), n = I(t), r = F(n), i = F(r);
		let a;
		var o = L(i, !0), c = R(i, 2);
		let l;
		var u = L(c, !0);
		O(r), O(n);
		var d = R(n, 2), f = (e) => {
			var t = jr(), n = I(t), r = (e) => {
				var t = Ap(), n = L(t, !0);
				B((e) => G(n, e), [() => Z("hint.textInline")]), W(e, t);
			}, i = (e) => {
				var t = Fp(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.mode ?? "mailto"), t = /* @__PURE__ */ j(() => [["mailto", Z("form.modeMailto")], ["endpoint", Z("form.modeEndpoint")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("mode", e)
					});
				}
				O(n);
				var a = R(n, 2), o = (e) => {
					var t = jp(), n = F(t), r = R(n);
					J(r), O(t), B((e, i, a) => {
						X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(P).props.endpoint ?? ""), X(r, "placeholder", a);
					}, [
						() => Z("form.endpointNote"),
						() => Z("form.endpoint"),
						() => Z("form.endpointPh")
					]), H("change", r, (e) => z("endpoint", e.target.value.trim())), W(e, t);
				}, s = (e) => {
					var t = Mp(), n = I(t), r = F(n), i = R(r);
					J(i), O(n);
					var a = R(n, 2), o = F(a), s = R(o);
					J(s), O(a), B((e, t, n, a) => {
						G(r, `${e ?? ""} `), Y(i, V(P).props.recipient ?? ""), X(i, "placeholder", t), G(o, `${n ?? ""} `), Y(s, V(P).props.subject ?? ""), X(s, "placeholder", a);
					}, [
						() => Z("form.recipient"),
						() => Z("form.recipientPh"),
						() => Z("form.subject"),
						() => Z("form.subjectPh")
					]), H("change", i, (e) => z("recipient", e.target.value.trim())), H("change", s, (e) => z("subject", e.target.value.trim())), W(e, t);
				};
				K(a, (e) => {
					(V(P).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var c = R(a, 2), l = L(c, !0), u = R(c, 2);
				Kr(u, 19, () => V(P).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = Pp(), i = I(r), a = F(i);
					J(a);
					var o = R(a, 2);
					{
						let e = /* @__PURE__ */ j(() => V(t).type ?? "text"), r = /* @__PURE__ */ j(() => kn.map((e) => [e, Z(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						Q(o, {
							get value() {
								return V(e);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => Mn(V(n), { type: e })
						});
					}
					var s = R(o, 2), c = F(s);
					q(c, () => T.up, !0), O(c);
					var l = R(c, 2);
					q(l, () => T.down, !0), O(l);
					var u = R(l, 2);
					q(u, () => T.cross, !0), O(u), O(s), O(i);
					var d = R(i, 2), f = F(d);
					J(f);
					var p = R(f);
					O(d);
					var m = R(d, 2), h = (e) => {
						var r = Np();
						J(r), B((e, t) => {
							Y(r, e), X(r, "placeholder", t);
						}, [() => (V(t).options ?? []).join(", "), () => Z("form.optionsPh")]), H("change", r, (e) => Nn(V(n), e.target.value)), W(e, r);
					}, g = /* @__PURE__ */ j(() => An.has(V(t).type));
					K(m, (e) => {
						V(g) && e(h);
					}), B((e, r, i) => {
						Y(a, V(t).label), X(a, "placeholder", e), c.disabled = V(n) === 0, l.disabled = V(n) === (V(P).props.fields?.length ?? 0) - 1, X(u, "title", r), xi(f, V(t).required === !0), G(p, ` ${i ?? ""}`);
					}, [
						() => Z("form.fieldNamePh"),
						() => Z("form.removeField"),
						() => Z("form.required")
					]), H("change", a, (e) => Mn(V(n), { label: e.target.value.trim() || Z("form.fieldFallback") })), H("click", c, () => In(V(n), -1)), H("click", l, () => In(V(n), 1)), H("click", u, () => Fn(V(n))), H("change", f, (e) => Mn(V(n), { required: e.target.checked })), W(e, r);
				});
				var d = R(u, 2), f = L(d, !0), p = R(d, 2), m = F(p), h = R(m);
				J(h), O(p);
				var g = R(p, 2), _ = F(g), v = R(_);
				J(v), O(g), B((e, t, i, a, o, s, c, u) => {
					X(n, "title", e), G(r, `${t ?? ""} `), G(l, i), G(f, a), G(m, `${o ?? ""} `), Y(h, V(P).props.submitLabel ?? ""), X(h, "placeholder", s), G(_, `${c ?? ""} `), Y(v, V(P).props.successText ?? ""), X(v, "placeholder", u);
				}, [
					() => Z("form.modeTitle"),
					() => Z("form.mode"),
					() => Z("form.fields"),
					() => Z("form.addField"),
					() => Z("lbl.buttonText"),
					() => Z("form.sendDefault"),
					() => Z("form.receipt"),
					() => Z("form.thanksDefault")
				]), H("click", d, Pn), H("change", h, (e) => z("submitLabel", e.target.value.trim() || Z("form.sendDefault"))), H("change", v, (e) => z("successText", e.target.value.trim() || Z("form.thanksDefault"))), W(e, t);
			}, a = (e) => {
				var t = Up(), n = I(t), r = L(n, !0), i = R(n, 2);
				Kr(i, 17, () => V(P).props.sources ?? [], Hr, (e, t, n) => {
					let r = /* @__PURE__ */ j(() => Ln(V(t)));
					var i = Ip(), a = F(i), o = F(a);
					J(o);
					var s = R(o, 2);
					q(s, () => T.cross, !0), O(s), O(a);
					var c = R(a, 2), l = F(c);
					J(l);
					var u = R(l, 2);
					{
						let e = /* @__PURE__ */ j(() => V(r).color || "accent"), t = /* @__PURE__ */ j(Fi), i = /* @__PURE__ */ j(() => Z("tip.calendar.sourceColor"));
						va(u, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							allowClear: !0,
							get label() {
								return V(i);
							},
							onchange: (e) => zn(n, { color: e ?? "" })
						});
					}
					O(c), O(i), B((e, t, n, i, a) => {
						Y(o, V(r).url), X(o, "placeholder", e), X(o, "title", t), X(s, "title", n), Y(l, V(r).name), X(l, "placeholder", i), X(l, "title", a);
					}, [
						() => Z("calendar.sourcesPh"),
						() => Z("calendar.sourceUrl"),
						() => Z("ui.remove"),
						() => Z("calendar.sourceName"),
						() => Z("tip.calendar.sourceName")
					]), H("change", o, (e) => zn(n, { url: e.target.value.trim() })), H("click", s, () => Vn(n)), H("change", l, (e) => zn(n, { name: e.target.value.trim() })), W(e, i);
				});
				var a = R(i, 2), o = F(a);
				q(o, () => T.plus);
				var s = R(o);
				O(a);
				var c = R(a, 2), l = F(c);
				q(l, () => T.plus);
				var u = R(l);
				O(c);
				var d = R(c, 2), f = (e) => {
					let t = /* @__PURE__ */ j(() => V(Hn).filter((e) => !(V(P).props.sources ?? []).some((t) => Ln(t).url === e)));
					var n = zp(), r = I(n);
					Kr(r, 16, () => V(t), (e) => e, (e, t) => {
						var n = Lp(), r = L(n, !0);
						B(() => {
							X(n, "title", t), G(r, t);
						}), H("click", n, () => Wn(t)), W(e, n);
					});
					var i = R(r, 2), a = (e) => {
						var t = Rp(), n = L(t, !0);
						B((e) => G(n, e), [() => Z("calendar.siteSourcesNone")]), W(e, t);
					};
					K(i, (e) => {
						V(t).length || e(a);
					}), W(e, n);
				};
				K(d, (e) => {
					V(Hn) && e(f);
				});
				var p = R(d, 2), m = (e) => {
					var t = gp(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ j(() => V(P).props.view ?? "list"), t = /* @__PURE__ */ j(() => [
							["list", Z("calendar.viewList")],
							["cards", Z("calendar.viewCards")],
							["month", Z("calendar.viewMonth")],
							["agenda", Z("calendar.viewAgenda")],
							["next", Z("calendar.viewNext")]
						]);
						Q(r, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => z("view", e)
						});
					}
					O(t), B((e) => G(n, `${e ?? ""} `), [() => Z("lbl.view")]), W(e, t);
				}, h = /* @__PURE__ */ j(() => !zf(V(P).props.design).view);
				K(p, (e) => {
					V(h) && e(m);
				});
				var g = R(p, 2), _ = (e) => {
					var t = Bp(), n = F(t), r = R(n);
					J(r), O(t), B((e, i) => {
						X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(P).props.limit ?? 6);
					}, [() => Z("tip.collection.limit"), () => Z("lbl.maxCount")]), H("change", r, (e) => z("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), W(e, t);
				}, v = /* @__PURE__ */ j(() => [
					"list",
					"cards",
					"agenda"
				].includes(V(P).props.view ?? "list"));
				K(g, (e) => {
					V(v) && e(_);
				});
				var y = R(g, 2), b = (e) => {
					var t = Vp(), n = I(t);
					{
						let e = /* @__PURE__ */ j(() => Z("calendar.nextCount")), t = /* @__PURE__ */ j(() => Z("tip.calendar.nextCount")), r = /* @__PURE__ */ j(() => String(Math.min(3, Math.max(1, Number(V(P).props.nextCount) || 1))));
						ws(n, {
							get label() {
								return V(e);
							},
							get title() {
								return V(t);
							},
							get value() {
								return V(r);
							},
							options: [
								["1", "1"],
								["2", "2"],
								["3", "3"]
							],
							onchange: (e) => z("nextCount", Number(e))
						});
					}
					var r = R(n, 2), i = F(r), a = L(i, !0), o = R(i, 2);
					J(o);
					var s = L(R(o, 2), !0);
					O(r), B((e, t) => {
						X(r, "title", e), G(a, t), Y(o, V(P).props.laterCount ?? 0), G(s, V(P).props.laterCount ?? 0);
					}, [() => Z("tip.calendar.laterCount"), () => Z("calendar.laterCount")]), H("input", o, (e) => z("laterCount", e.target.valueAsNumber)), W(e, t);
				};
				K(y, (e) => {
					V(P).props.view === "next" && e(b);
				});
				var x = R(y, 2), S = F(x), C = R(S);
				J(C), O(x);
				var w = R(x, 2), ee = F(w), te = R(ee);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.emptyIcon === "none" ? "" : V(P).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ j(() => Z("tip.calendar.emptyIcon"));
					ko(te, {
						iconsOnly: !0,
						get icon() {
							return V(e);
						},
						klass: "lbtn-mark",
						get label() {
							return V(t);
						},
						onpick: (e) => z("emptyIcon", e.icon || "none"),
						children: (e, t) => {
							var n = jr(), r = I(n), i = (e) => {
								var t = jr();
								q(I(t), () => eo(V(P).props.emptyIcon ?? "calendar") || eo("calendar")), W(e, t);
							};
							K(r, (e) => {
								V(P).props.emptyIcon !== "none" && e(i);
							}), W(e, n);
						},
						$$slots: { default: !0 }
					});
				}
				O(w);
				var ne = R(w, 2), re = F(ne);
				J(re);
				var ie = R(re);
				O(ne);
				var ae = R(ne, 2), oe = F(ae);
				J(oe);
				var E = R(oe);
				O(ae);
				var se = R(ae, 2), ce = F(se);
				J(ce);
				var le = R(ce);
				O(se);
				var ue = R(se, 2), D = (e) => {
					var t = Hp(), n = L(t, !0);
					B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("tip.calendar.resetTexts"), () => Z("calendar.resetTexts")]), H("click", t, () => z("texts", void 0)), W(e, t);
				}, de = /* @__PURE__ */ j(() => Kf(zf(V(P).props.design), V(P).props.texts));
				K(ue, (e) => {
					V(de) && e(D);
				}), B((e, t, i, a, o, l, d, f, p, m, h, g, _) => {
					X(n, "title", e), G(r, t), G(s, ` ${i ?? ""}`), X(c, "title", a), G(u, ` ${o ?? ""}`), X(x, "title", l), G(S, `${d ?? ""} `), Y(C, V(P).props.emptyText ?? ""), X(C, "placeholder", f), X(w, "title", p), G(ee, `${m ?? ""} `), xi(re, V(P).props.showCategories !== !1), G(ie, ` ${h ?? ""}`), xi(oe, V(P).props.showSubscribe !== !1), G(E, ` ${g ?? ""}`), xi(ce, V(P).props.showSignup !== !1), G(le, ` ${_ ?? ""}`);
				}, [
					() => Z("calendar.sourcesPh"),
					() => Z("calendar.sources"),
					() => Z("ui.addCalendar"),
					() => Z("tip.calendar.siteSources"),
					() => Z("calendar.siteSources"),
					() => Z("tip.calendar.emptyText"),
					() => Z("calendar.emptyText"),
					() => Z("calendar.emptyPh"),
					() => Z("tip.calendar.emptyIcon"),
					() => Z("calendar.emptyIcon"),
					() => Z("calendar.showCategories"),
					() => Z("calendar.showSubscribe"),
					() => Z("calendar.showSignup")
				]), H("click", a, Bn), H("click", c, Un), H("change", C, (e) => z("emptyText", e.target.value.trim() || void 0)), H("change", re, (e) => z("showCategories", e.target.checked)), H("change", oe, (e) => z("showSubscribe", e.target.checked)), H("change", ce, (e) => z("showSignup", e.target.checked)), W(e, t);
			}, o = (e) => {
				var t = Gp(), n = I(t), r = F(n);
				J(r);
				var i = R(r);
				O(n);
				var a = R(n, 2), o = L(a, !0), s = R(a, 2);
				Kr(s, 17, () => V(P).props.items ?? [], Hr, (e, t, n) => {
					var r = Wp(), i = F(r);
					J(i);
					var a = R(i, 2), o = F(a);
					o.disabled = n === 0, q(o, () => T.up, !0), O(o);
					var s = R(o, 2);
					q(s, () => T.down, !0), O(s);
					var c = R(s, 2);
					q(c, () => T.cross, !0), O(c), O(a), O(r), B((e, r) => {
						Y(i, V(t).q), X(i, "title", e), s.disabled = n === (V(P).props.items?.length ?? 0) - 1, X(c, "title", r);
					}, [() => Z("tip.faq.question"), () => Z("tip.faq.remove")]), H("change", i, (e) => Gn(n, { q: e.target.value })), H("click", o, () => Jn(n, -1)), H("click", s, () => Jn(n, 1)), H("click", c, () => qn(n)), W(e, r);
				});
				var c = R(s, 2), l = L(c, !0);
				B((e, t, a, s, c) => {
					X(n, "title", e), xi(r, t), G(i, ` ${a ?? ""}`), G(o, s), G(l, c);
				}, [
					() => Z("tip.faq.multi"),
					() => !!V(P).props.multi,
					() => Z("lbl.faqMulti"),
					() => Z("lbl.questions"),
					() => Z("ui.addQuestion")
				]), H("change", r, (e) => z("multi", e.target.checked)), H("click", c, Kn), W(e, t);
			}, s = (e) => {
				var t = qp(), n = I(t), r = L(n, !0), i = R(n, 2);
				Kr(i, 17, () => V(P).props.items ?? [], Hr, (e, t, n) => {
					var r = Kp(), i = I(r), a = F(i);
					J(a);
					var o = R(a, 2);
					J(o);
					var s = R(o, 2), c = F(s);
					c.disabled = n === 0, q(c, () => T.up, !0), O(c);
					var l = R(c, 2);
					q(l, () => T.down, !0), O(l);
					var u = R(l, 2);
					q(u, () => T.cross, !0), O(u), O(s), O(i);
					var d = R(i, 2);
					J(d), B((e, r, i, s, c, f) => {
						Y(a, V(t).year), X(a, "placeholder", e), X(a, "title", r), Y(o, V(t).title), X(o, "title", i), l.disabled = n === (V(P).props.items?.length ?? 0) - 1, X(u, "title", s), Y(d, V(t).text), X(d, "placeholder", c), X(d, "title", f);
					}, [
						() => Z("ph.tlYear"),
						() => Z("tip.timeline.year"),
						() => Z("tip.timeline.title"),
						() => Z("tip.timeline.remove"),
						() => Z("ph.tlText"),
						() => Z("tip.timeline.text")
					]), H("change", a, (e) => $n(n, { year: e.target.value })), H("change", o, (e) => $n(n, { title: e.target.value })), H("click", c, () => nr(n, -1)), H("click", l, () => nr(n, 1)), H("click", u, () => tr(n)), H("change", d, (e) => $n(n, { text: e.target.value })), W(e, r);
				});
				var a = R(i, 2), o = L(a, !0);
				B((e, t) => {
					G(r, e), G(o, t);
				}, [() => Z("lbl.timelineItems"), () => Z("ui.addTlItem")]), H("click", a, er), W(e, t);
			}, c = (e) => {
				var t = Jp(), n = I(t), r = F(n), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a);
				var c = R(a, 2), l = F(c), u = R(l);
				J(u), O(c), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(P).props.text ?? ""), G(o, `${t ?? ""} `), Y(s, V(P).props.attribution ?? ""), G(l, `${n ?? ""} `), Y(u, V(P).props.role ?? "");
				}, [
					() => Z("lbl.quoteText"),
					() => Z("lbl.quoteName"),
					() => Z("lbl.quoteRole")
				]), H("change", i, (e) => z("text", e.target.value)), H("change", s, (e) => z("attribution", e.target.value)), H("change", u, (e) => z("role", e.target.value)), W(e, t);
			}, l = (e) => {
				var t = Yp(), n = I(t), r = F(n), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a);
				var c = R(a, 2), l = F(c), u = R(l);
				J(u), O(c);
				var d = R(c, 2), f = F(d), p = R(f);
				J(p), O(d), B((e, t, n, a, c) => {
					G(r, `${e ?? ""} `), Y(i, V(P).props.value ?? ""), X(i, "title", t), G(o, `${n ?? ""} `), Y(s, V(P).props.prefix ?? ""), G(l, `${a ?? ""} `), Y(u, V(P).props.suffix ?? ""), G(f, `${c ?? ""} `), Y(p, V(P).props.label ?? "");
				}, [
					() => Z("lbl.statValue"),
					() => Z("tip.stat.value"),
					() => Z("lbl.statPrefix"),
					() => Z("lbl.statSuffix"),
					() => Z("lbl.statLabel")
				]), H("change", i, (e) => z("value", e.target.value)), H("change", s, (e) => z("prefix", e.target.value)), H("change", u, (e) => z("suffix", e.target.value)), H("change", p, (e) => z("label", e.target.value)), W(e, t);
			}, u = (e) => {
				var t = Qp(), n = I(t), r = L(n, !0), i = R(n, 2);
				Kr(i, 17, () => V(P).props.items ?? [], Hr, (e, t, n) => {
					var r = Wp(), i = F(r);
					J(i);
					var a = R(i, 2), o = F(a);
					o.disabled = n === 0, q(o, () => T.up, !0), O(o);
					var s = R(o, 2);
					q(s, () => T.down, !0), O(s);
					var c = R(s, 2);
					q(c, () => T.cross, !0), O(c), O(a), O(r), B((e, r, a, l) => {
						Y(i, V(t)), X(i, "title", e), X(o, "title", r), X(s, "title", a), s.disabled = n === (V(P).props.items?.length ?? 0) - 1, X(c, "title", l);
					}, [
						() => Z("tip.ribbon.item"),
						() => Z("tip.moveUp"),
						() => Z("tip.moveDown"),
						() => Z("tip.ribbon.remove")
					]), H("change", i, (e) => Yn(n, e.target.value)), H("click", o, () => Qn(n, -1)), H("click", s, () => Qn(n, 1)), H("click", c, () => Zn(n)), W(e, r);
				});
				var a = R(i, 2), o = L(a, !0), s = R(a, 2), c = F(s), l = L(c, !0), u = R(c, 2);
				Kr(u, 21, () => V(x), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = Xp();
					let o;
					q(a, () => v[r()], !0), O(a), B(() => {
						o = mi(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(P).props.sep ?? "dot") === r() }), X(a, "aria-pressed", (V(P).props.sep ?? "dot") === r()), X(a, "title", i());
					}), H("click", a, () => z("sep", r())), W(e, a);
				}), O(u), O(s);
				var d = R(s, 2), f = (e) => {
					var t = Zp(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i), O(t), B((e, n) => {
						X(t, "title", e), G(r, n), Y(i, V(P).props.sepText ?? "");
					}, [() => Z("tip.ribbon.sepText"), () => Z("lbl.ribbonSepText")]), H("change", i, (e) => z("sepText", e.target.value)), W(e, t);
				};
				K(d, (e) => {
					V(P).props.sep === "custom" && e(f);
				}), B((e, t, n, i) => {
					G(r, e), G(o, t), G(l, n), X(u, "aria-label", i);
				}, [
					() => Z("lbl.ribbonItems"),
					() => Z("ui.addRibbonItem"),
					() => Z("lbl.ribbonSep"),
					() => Z("lbl.ribbonSep")
				]), H("click", a, Xn), W(e, t);
			}, d = (e) => {
				var t = $p(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = L(a, !0);
				O(n);
				var s = R(n, 2), c = F(s), l = L(c, !0), u = R(c, 2), d = L(u, !0);
				O(s);
				var f = R(s, 2), p = F(f);
				J(p);
				var m = R(p);
				O(f), B((e, t, n, r, a, s) => {
					G(i, e), G(o, t), G(l, n), G(d, r), X(f, "title", a), xi(p, V(P).props.header !== !1), G(m, ` ${s ?? ""}`);
				}, [
					() => Z("ui.addRow"),
					() => Z("ui.removeRow"),
					() => Z("ui.addColumn"),
					() => Z("ui.removeColumn"),
					() => Z("tip.table.header"),
					() => Z("lbl.tableHeader")
				]), H("click", r, () => ir(1, 0)), H("click", a, () => ir(-1, 0)), H("click", c, () => ir(0, 1)), H("click", u, () => ir(0, -1)), H("change", p, (e) => z("header", e.target.checked)), W(e, t);
			}, f = (e) => {
				var t = jr();
				Kr(I(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Z("opt.share.email")],
					["copy", Z("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = em(), o = F(a);
					J(o);
					var s = R(o);
					O(a), B((e) => {
						xi(o, e), G(s, ` ${i() ?? ""}`);
					}, [() => (V(P).props.services ?? []).includes(r())]), H("change", o, (e) => ar(r(), e.target.checked)), W(e, a);
				}), W(e, t);
			}, p = (e) => {
				var t = tm(), n = I(t), r = F(n), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(P).props.target ?? ""), X(a, "title", t), G(o, `${n ?? ""} `), Y(s, V(P).props.doneText ?? "");
				}, [
					() => Z("lbl.countdownTarget"),
					() => Z("tip.countdown.done"),
					() => Z("lbl.countdownDone")
				]), H("change", i, (e) => z("target", e.target.value)), H("change", s, (e) => z("doneText", e.target.value)), W(e, t);
			}, m = (e) => {
				var t = rm(), n = I(t), r = F(n), i = R(r);
				O(n);
				var a = R(n, 2), o = (e) => {
					var t = nm(), n = L(t, !0);
					B((e) => G(n, e), [() => Z("ui.removeAudio")]), H("click", t, () => z("src", "")), W(e, t);
				};
				K(a, (e) => {
					V(P).props.src && e(o);
				});
				var s = R(a, 2), c = F(s), l = R(c);
				J(l), O(s);
				var u = R(s, 2), d = F(u);
				J(d);
				var f = R(d);
				O(u), B((e, t, i, a, o) => {
					X(n, "title", e), G(r, `${t ?? ""} `), G(c, `${i ?? ""} `), Y(l, V(P).props.title ?? ""), xi(d, a), G(f, ` ${o ?? ""}`);
				}, [
					() => Z("tip.blocks.audioFile"),
					() => Z("ui.chooseAudio"),
					() => Z("lbl.audioTitle"),
					() => !!V(P).props.loop,
					() => Z("lbl.audioLoop")
				]), H("change", i, or), H("change", l, (e) => z("title", e.target.value)), H("change", d, (e) => z("loop", e.target.checked)), W(e, t);
			}, g = (e) => {
				var t = im(), n = I(t), r = F(n), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.page ?? "__href"), t = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.externalLink")]]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							cn(`edit:${V(P).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				O(a);
				var c = R(a, 2), l = (e) => {
					var t = Np();
					J(t), B((e) => {
						X(t, "placeholder", e), Y(t, V(P).props.href === "#" ? "" : V(P).props.href ?? "");
					}, [() => Z("ph.url")]), H("change", t, (e) => z("href", e.target.value || null)), W(e, t);
				};
				K(c, (e) => {
					V(P).props.page || e(l);
				}), B((e, t) => {
					G(r, `${e ?? ""} `), Y(i, V(P).props.label), G(o, `${t ?? ""} `);
				}, [() => Z("blocks.text"), () => Z("lbl.goesTo")]), H("change", i, (e) => z("label", e.target.value)), W(e, t);
			}, _ = (e) => {
				var t = am(), n = I(t), r = F(n), i = R(r);
				O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a);
				var c = R(a, 2), l = F(c), u = R(l);
				J(u), O(c);
				var d = R(c, 2), f = (e) => {
					var t = em(), n = F(t);
					J(n);
					var r = R(n);
					O(t), B((e, i, a) => {
						X(t, "title", e), xi(n, i), G(r, ` ${a ?? ""}`);
					}, [
						() => Z("tip.lightbox"),
						() => !!V(P).props.lightbox,
						() => Z("lbl.lightbox")
					]), H("change", n, (e) => z("lightbox", e.target.checked)), W(e, t);
				};
				K(d, (e) => {
					V(P).props.href || e(f);
				}), B((e, t, n, i, a) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), Y(s, V(P).props.alt ?? ""), X(s, "placeholder", n), G(l, `${i ?? ""} `), Y(u, V(P).props.href ?? ""), X(u, "placeholder", a);
				}, [
					() => Z("ui.changeImage"),
					() => Z("lbl.description"),
					() => Z("ph.altText"),
					() => Z("lbl.link"),
					() => Z("ph.optionalImageLink")
				]), H("change", i, cr), H("change", s, (e) => z("alt", e.target.value)), H("change", u, (e) => z("href", e.target.value || null)), W(e, t);
			}, y = (e) => {
				let t = /* @__PURE__ */ j(() => V(P).props.source === "file" ? "file" : "embed");
				var n = cm(), r = I(n);
				{
					let e = /* @__PURE__ */ j(() => Z("lbl.videoSource")), n = /* @__PURE__ */ j(() => [["embed", Z("opt.videoSource.embed")], ["file", Z("opt.videoSource.file")]]);
					ws(r, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => z("source", e)
					});
				}
				var i = R(r, 2), a = (e) => {
					var t = om(), n = I(t), r = L(n, !0), i = R(n, 2);
					J(i), B((e, t, a) => {
						X(n, "title", e), G(r, t), Y(i, V(P).props.url ?? ""), X(i, "placeholder", a);
					}, [
						() => Z("hint.video"),
						() => Z("lbl.videoUrl"),
						() => Z("ph.videoUrl")
					]), H("change", i, (e) => z("url", e.target.value)), W(e, t);
				}, o = (e) => {
					var t = sm(), n = I(t), r = F(n), i = R(r);
					O(n);
					var a = R(n, 2), o = F(a), s = R(o);
					O(a);
					var c = R(a, 2), l = F(c);
					J(l);
					var u = R(l);
					O(c);
					var d = R(c, 2), f = F(d);
					J(f);
					var p = R(f);
					O(d);
					var m = R(d, 2), h = (e) => {
						var t = em(), n = F(t);
						J(n);
						var r = R(n);
						O(t), B((e, i) => {
							X(t, "title", e), xi(n, V(P).props.autoplay === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.video.autoplay"), () => Z("lbl.videoAutoplay")]), H("change", n, (e) => z("autoplay", e.target.checked)), W(e, t);
					};
					K(m, (e) => {
						V(P).props.muted === !0 && e(h);
					}), B((e, t, i, s, c, d) => {
						X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${s ?? ""} `), xi(l, V(P).props.loop === !0), G(u, ` ${c ?? ""}`), xi(f, V(P).props.muted === !0), G(p, ` ${d ?? ""}`);
					}, [
						() => Z("tip.video.file"),
						() => V(P).props.src ? Z("ui.changeVideo") : Z("ui.chooseVideo"),
						() => Z("tip.bg.poster"),
						() => V(P).props.poster ? Z("ui.changeImage") : Z("ui.choosePoster"),
						() => Z("lbl.videoLoop"),
						() => Z("lbl.videoMuted")
					]), H("change", i, ui), H("change", s, di), H("change", l, (e) => z("loop", e.target.checked)), H("change", f, (e) => ln("muted", e.target.checked ? { muted: !0 } : {
						muted: !1,
						autoplay: !1
					})), W(e, t);
				};
				K(i, (e) => {
					V(t) === "embed" ? e(a) : e(o, -1);
				});
				var s = R(i, 2), c = F(s), l = R(c);
				J(l), O(s), B((e) => {
					G(c, `${e ?? ""} `), Y(l, V(P).props.title ?? "");
				}, [() => Z("lbl.videoTitle")]), H("change", l, (e) => z("title", e.target.value)), W(e, n);
			}, b = (e) => {
				var t = dm(), n = I(t), r = F(n), i = R(r), a = F(i);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.glyph ?? "★"), t = /* @__PURE__ */ j(() => V(P).props.icon ?? null), n = /* @__PURE__ */ j(() => V(P).props.image ?? null);
					mo(a, {
						get value() {
							return V(e);
						},
						get icon() {
							return V(t);
						},
						get image() {
							return V(n);
						},
						onpick: (e) => cn(`edit:${V(P).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => cn(`edit:${V(P).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => z("image", e)
					});
				}
				var o = R(a, 2), s = (e) => {
					var t = lm();
					J(t), B((e) => {
						Y(t, V(P).props.glyph ?? ""), X(t, "title", e);
					}, [() => Z("tip.icon.typeGlyph")]), H("change", t, (e) => z("glyph", e.target.value || "★")), W(e, t);
				}, c = (e) => {
					var t = nm(), n = L(t, !0);
					B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("tip.icon.backToGlyph"), () => Z("ui.removeDrawnIcon")]), H("click", t, () => z("icon", null)), W(e, t);
				};
				K(o, (e) => {
					V(P).props.icon ? e(c, -1) : e(s);
				}), O(i), O(n);
				var l = R(n, 2), u = (e) => {
					var t = um(), n = F(t), r = R(n, 2), i = L(r, !0);
					O(t), B((e, r, a) => {
						X(t, "title", e), X(n, "src", V(P).props.image), X(n, "alt", r), G(i, a);
					}, [
						() => Z("hint.icon.ownImage"),
						() => Z("gp.ownIcon"),
						() => Z("ui.removeOwnIcon")
					]), H("click", r, () => z("image", null)), W(e, t);
				};
				K(l, (e) => {
					V(P).props.image && e(u);
				}), B((e) => G(r, `${e ?? ""} `), [() => Z("blocks.icon")]), W(e, t);
			}, S = (e) => {
				var t = fm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.collection ?? ""), t = /* @__PURE__ */ j(() => [["", Z("common.choose")], ...V(nl).map((e) => [e, V(rl)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("collection", e || null)
					});
				}
				O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a);
				var c = R(a, 2), l = F(c);
				J(l);
				var u = R(l);
				O(c), B((e, t, i, c, d) => {
					X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${c ?? ""} `), Y(s, V(P).props.limit ?? 6), xi(l, V(P).props.newestFirst !== !1), G(u, ` ${d ?? ""}`);
				}, [
					() => Z("tip.collection.source"),
					() => Z("blocks.collection"),
					() => Z("tip.collection.limit"),
					() => Z("lbl.maxCount"),
					() => Z("lbl.newestFirst")
				]), H("change", s, (e) => z("limit", Number(e.target.value))), H("change", l, (e) => z("newestFirst", e.target.checked)), W(e, t);
			}, C = (e) => {
				var t = hm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.collection ?? ""), t = /* @__PURE__ */ j(() => [["", Z("common.choose")], ...V(nl).filter((e) => V(rl)[e]?.kind === "products").map((e) => [e, V(rl)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("collection", e || null)
					});
				}
				O(n);
				var a = R(n, 2), o = (e) => {
					var t = pm(), n = F(t), r = L(n, !0), i = R(n, 2), a = L(i, !0);
					O(t), B((e, t, o, s) => {
						X(n, "title", e), G(r, t), X(i, "title", o), G(a, s);
					}, [
						() => Z("tip.product.addProduct"),
						() => Z("ui.addProduct"),
						() => Z("tip.product.editCatalog"),
						() => Z("ui.editCatalog")
					]), H("click", n, () => Ll(V(P).props.collection)), H("click", i, () => {
						N(il, V(P).props.collection, !0), N(Lt, "collections");
					}), W(e, t);
				}, s = (e) => {
					var t = mm(), n = L(t, !0);
					B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("tip.product.createCatalog"), () => Z("ui.createCatalog")]), H("click", t, Fl), W(e, t);
				}, c = /* @__PURE__ */ j(() => !V(nl).some((e) => V(rl)[e]?.kind === "products"));
				K(a, (e) => {
					V(P).props.collection && V(rl)[V(P).props.collection]?.kind === "products" ? e(o) : V(c) && e(s, 1);
				});
				var l = R(a, 2), u = F(l), d = R(u);
				J(d), O(l);
				var f = R(l, 2), p = F(f), m = R(p);
				J(m), O(f), B((e, t, i, a, o, s) => {
					X(n, "title", e), G(r, `${t ?? ""} `), X(l, "title", i), G(u, `${a ?? ""} `), Y(d, V(P).props.limit ?? 0), X(f, "title", o), G(p, `${s ?? ""} `), Y(m, V(P).props.currency ?? "kr");
				}, [
					() => Z("tip.product.source"),
					() => Z("blocks.collection"),
					() => Z("tip.collection.limit"),
					() => Z("lbl.maxCount"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), H("change", d, (e) => z("limit", Number(e.target.value))), H("change", m, (e) => z("currency", e.target.value)), W(e, t);
			}, w = (e) => {
				var t = gm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.href ?? ""), t = /* @__PURE__ */ j(() => [["", Z("common.none")], ...V(A).pages.map((e) => [e.path, e.title])]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("href", e)
					});
				}
				O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a), B((e, t, i, c) => {
					X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${c ?? ""} `), Y(s, V(P).props.currency ?? "kr");
				}, [
					() => Z("tip.cart.checkout"),
					() => Z("lbl.checkoutPage"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), H("change", s, (e) => z("currency", e.target.value)), W(e, t);
			}, ee = (e) => {
				var t = _m(), n = I(t), r = F(n), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a);
				var c = R(a, 2), l = F(c), u = R(l);
				J(u), O(c);
				var d = R(c, 2), f = F(d);
				J(f);
				var p = R(f);
				O(d);
				var m = R(d, 2), h = F(m), g = R(h);
				J(g), O(m), B((e, t, _, v, y, b, x, S, C, w) => {
					X(n, "title", e), G(r, `${t ?? ""} `), Y(i, V(P).props.recipient ?? ""), X(a, "title", _), G(o, `${v ?? ""} `), Y(s, V(P).props.endpoint ?? ""), X(c, "title", y), G(l, `${b ?? ""} `), Y(u, V(P).props.vipps ?? ""), X(d, "title", x), xi(f, V(P).props.vippsCheckout === !0), G(p, ` ${S ?? ""}`), X(m, "title", C), G(h, `${w ?? ""} `), Y(g, V(P).props.currency ?? "kr");
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
				]), H("change", i, (e) => z("recipient", e.target.value.trim())), H("change", s, (e) => z("endpoint", e.target.value.trim())), H("change", u, (e) => z("vipps", e.target.value.trim())), H("change", f, (e) => z("vippsCheckout", e.target.checked)), H("change", g, (e) => z("currency", e.target.value)), W(e, t);
			}, te = (e) => {
				var t = Jf(), n = I(t), r = F(n), i = R(r);
				O(n), Kr(R(n, 2), 17, () => V(P).props.images ?? [], Hr, (e, t, n) => {
					var r = vm(), i = F(r), a = F(i), o = R(a, 2), s = F(o);
					s.disabled = n === 0, q(s, () => T.up, !0), O(s);
					var c = R(s, 2);
					q(c, () => T.down, !0), O(c);
					var l = R(c, 2);
					q(l, () => T.cross, !0), O(l), O(o), O(i);
					var u = R(i, 2), d = F(u), f = R(d);
					J(f), O(u);
					var p = R(u, 2), m = F(p), h = R(m);
					J(h), O(p), O(r), B((e, r, o, s, u, p) => {
						X(i, "title", e), X(a, "src", V(t).src), c.disabled = n === V(P).props.images.length - 1, X(l, "title", r), G(d, `${o ?? ""} `), Y(f, V(t).alt ?? ""), X(f, "placeholder", s), G(m, `${u ?? ""} `), Y(h, V(t).href ?? ""), X(h, "placeholder", p);
					}, [
						() => Z("hint.gallery"),
						() => Z("tip.removeImage"),
						() => Z("lbl.description"),
						() => Z("ph.altShort"),
						() => Z("lbl.link"),
						() => Z("ph.galleryHref")
					]), H("click", s, () => bv(n, -1)), H("click", c, () => bv(n, 1)), H("click", l, () => xv(n)), H("change", f, (e) => Sv(n, "alt", e.target.value)), H("change", h, (e) => Sv(n, "href", e.target.value || null)), W(e, r);
				}), B((e, t) => {
					X(n, "title", e), G(r, `${t ?? ""} `);
				}, [() => Z("tip.gallery.addImages"), () => Z("ui.addImages")]), H("change", i, vv), W(e, t);
			}, ne = (e) => {
				var t = gp(), n = F(t);
				Q(R(n), {
					get value() {
						return V(P).props.kind;
					},
					get options() {
						return fr;
					},
					onchange: (e) => z("kind", e)
				}), O(t), B((e) => G(n, `${e ?? ""} `), [() => Z("blocks.shape")]), W(e, t);
			}, re = (e) => {
				let t = /* @__PURE__ */ j(() => lv[V(P).type] ?? V(cv).find((e) => e.type === V(P).type)?.fields ?? []);
				var n = jr(), r = I(n), i = (e) => {
					var n = jr();
					Kr(I(n), 17, () => V(t), (e) => e.key, (e, t) => {
						var n = jr(), r = I(n), i = (e) => {
							let n = /* @__PURE__ */ j(() => `${V(P).blockId}:${V(t).key}`);
							var r = ym(), i = I(r), a = F(i), o = R(a);
							J(o), O(i);
							var s = R(i, 2), c = L(s, !0), l = R(s, 2), u = (e) => {
								var t = Yf();
								let r;
								var i = L(t, !0);
								B(() => {
									r = mi(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Sn[V(n)].err }), G(i, Sn[V(n)].text);
								}), W(e, t);
							};
							K(l, (e) => {
								Sn[V(n)] && e(u);
							}), B((e) => {
								G(a, `${V(t).label ?? ""} `), X(o, "placeholder", V(t).placeholder), Y(o, xn[V(n)] ?? V(P).props[V(t).key] ?? ""), s.disabled = V(Cn), G(c, e);
							}, [() => Z("props.place.search")]), H("input", o, (e) => {
								xn[V(n)] = e.target.value;
							}), H("keydown", o, (e) => {
								e.key === "Enter" && En(V(t));
							}), H("click", s, () => En(V(t))), W(e, r);
						}, a = (e) => {
							var n = bm(), r = F(n), i = R(r);
							J(i), O(n), B(() => {
								G(r, `${V(t).label ?? ""} `), X(i, "min", V(t).min), X(i, "max", V(t).max), X(i, "step", V(t).step ?? 1), Y(i, V(P).props[V(t).key]);
							}), H("change", i, (e) => z(V(t).key, Tn(V(t), Number(e.target.value)))), W(e, n);
						}, o = (e) => {
							var n = em(), r = F(n);
							J(r);
							var i = R(r);
							O(n), B((e) => {
								xi(r, e), G(i, ` ${V(t).label ?? ""}`);
							}, [() => !!V(P).props[V(t).key]]), H("change", r, (e) => z(V(t).key, e.target.checked)), W(e, n);
						}, s = (e) => {
							var n = gp(), r = F(n), i = R(r);
							{
								let e = /* @__PURE__ */ j(() => (V(t).options ?? []).map((e) => [e.value, e.label]));
								Q(i, {
									get value() {
										return V(P).props[V(t).key];
									},
									get options() {
										return V(e);
									},
									onchange: (e) => z(V(t).key, e)
								});
							}
							O(n), B(() => G(r, `${V(t).label ?? ""} `)), W(e, n);
						}, c = (e) => {
							var n = xm(), r = F(n), i = R(r);
							J(i), O(n), B(() => {
								G(r, `${V(t).label ?? ""} `), X(i, "placeholder", V(t).placeholder), Y(i, V(P).props[V(t).key] ?? "");
							}), H("change", i, (e) => z(V(t).key, e.target.value)), W(e, n);
						};
						K(r, (e) => {
							V(t).type === "place" ? e(i) : V(t).type === "number" ? e(a, 1) : V(t).type === "toggle" ? e(o, 2) : V(t).type === "select" ? e(s, 3) : e(c, -1);
						}), W(e, n);
					}), W(e, n);
				}, a = (e) => {
					var t = nm(), n = L(t, !0);
					B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("hint.pluginBlock"), () => Z("ui.settings")]), H("click", t, () => et?.sendOpenConfig(V(P).blockId)), W(e, t);
				};
				K(r, (e) => {
					V(t).length ? e(i) : e(a, -1);
				}), W(e, n);
			};
			K(n, (e) => {
				V(P).type === "text" ? e(r) : V(P).type === "form" ? e(i, 1) : V(P).type === "calendar" ? e(a, 2) : V(P).type === "faq" ? e(o, 3) : V(P).type === "timeline" ? e(s, 4) : V(P).type === "quote" ? e(c, 5) : V(P).type === "stats" ? e(l, 6) : V(P).type === "ribbon" ? e(u, 7) : V(P).type === "table" ? e(d, 8) : V(P).type === "share" ? e(f, 9) : V(P).type === "countdown" ? e(p, 10) : V(P).type === "audio" ? e(m, 11) : V(P).type === "button" ? e(g, 12) : V(P).type === "image" ? e(_, 13) : V(P).type === "video" ? e(y, 14) : V(P).type === "icon" ? e(b, 15) : V(P).type === "collection" ? e(S, 16) : V(P).type === "product" ? e(C, 17) : V(P).type === "cart" ? e(w, 18) : V(P).type === "checkout" ? e(ee, 19) : V(P).type === "gallery" ? e(te, 20) : V(P).type === "shape" ? e(ne, 21) : e(re, -1);
			}), W(e, t);
		}, p = (e) => {
			var t = ih(), n = I(t), r = (e) => {
				var t = Sm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.align ?? "left"), t = /* @__PURE__ */ j(() => [
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
						onchange: (e) => z("align", e)
					});
				}
				O(n);
				var a = R(n, 2), o = F(a);
				J(o);
				var c = R(o);
				O(a);
				var l = R(a, 2), u = (e) => {
					s(e);
				};
				K(l, (e) => {
					V(P).props.box && e(u);
				}), Ee(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), xi(o, t), G(c, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.align"),
					() => !!V(P).props.box,
					() => Z("lbl.textBoxToggle")
				]), H("change", o, (e) => z("box", e.target.checked)), W(e, t);
			}, i = (e) => {
				let t = /* @__PURE__ */ j(() => zf(V(P).props.design));
				var n = Tm(), r = I(n), i = (e) => {
					var n = gp(), r = F(n), i = R(r);
					{
						let e = /* @__PURE__ */ j(() => Rf.map((e) => [e.id, Z(e.labelKey)]));
						Q(i, {
							get value() {
								return V(t).id;
							},
							get options() {
								return V(e);
							},
							onchange: pn
						});
					}
					O(n), B((e, t) => {
						X(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Z("tip.calendar.design"), () => Z("calendar.design")]), W(e, n);
				};
				K(r, (e) => {
					Rf.length > 1 && e(i);
				});
				var a = R(r, 2), o = L(a, !0), s = R(a, 2);
				Kr(s, 19, () => dn(V(t)), (e) => e.section, (e, t, n) => {
					var r = zp(), i = I(r), a = (e) => {
						var n = Cm(), r = L(n, !0);
						B((e) => G(r, e), [() => Z(`calendar.section.${V(t).section}`)]), W(e, n);
					};
					K(i, (e) => {
						V(n) > 0 && e(a);
					}), Kr(R(i, 2), 17, () => V(t).slots, (e) => e.key, (e, t) => {
						var n = wm(), r = F(n), i = L(r, !0), a = R(r, 2);
						{
							let e = /* @__PURE__ */ j(() => V(P).props.colors?.[V(t).key] ?? ""), n = /* @__PURE__ */ j(Fi), r = /* @__PURE__ */ j(() => Z(V(t).labelKey));
							va(a, {
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
								onchange: (e) => mn(V(t).key, e || "")
							});
						}
						O(n), B((e, t) => {
							X(n, "title", e), G(i, t);
						}, [() => Z("tip.calendar.slot"), () => Z(V(t).labelKey)]), W(e, n);
					}), W(e, r);
				});
				var c = R(s, 2), l = F(c);
				J(l);
				var u = R(l);
				O(c);
				var d = R(c, 2), f = (e) => {
					var t = wm(), n = F(t), r = L(n, !0), i = R(n, 2);
					{
						let e = /* @__PURE__ */ j(() => V(P).props.stripe?.color ?? ""), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("calendar.stripeColor"));
						va(i, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							allowClear: !0,
							get label() {
								return V(n);
							},
							onchange: (e) => hn({ color: e || void 0 })
						});
					}
					O(t), B((e, n) => {
						X(t, "title", e), G(r, n);
					}, [() => Z("tip.calendar.stripeColor"), () => Z("calendar.stripeColor")]), W(e, t);
				}, p = /* @__PURE__ */ j(() => Uf(V(t), V(P).props.stripe).show);
				K(d, (e) => {
					V(p) && e(f);
				});
				var m = R(d, 2), h = L(m, !0), g = R(m, 2);
				{
					let e = /* @__PURE__ */ j(() => Ff.map((e) => [e, Z(`calendar.field.${e}`)]));
					Q(g, {
						get value() {
							return V(un);
						},
						get options() {
							return V(e);
						},
						onchange: (e) => N(un, e, !0)
					});
				}
				var _ = R(g, 2), v = F(_), y = R(v);
				{
					let e = /* @__PURE__ */ j(() => fn().font ?? ""), t = /* @__PURE__ */ j(() => [["", Z("common.inherit")], ...Nf.map(([e, t]) => [t, Z(e)])]);
					Q(y, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => gn({ font: e || void 0 })
					});
				}
				O(_);
				var b = R(_, 2), x = F(b), S = R(x);
				J(S), O(b);
				var C = R(b, 2);
				{
					let e = /* @__PURE__ */ j(() => Z("calendar.fieldWeight")), t = /* @__PURE__ */ j(() => fn().bold === !0 ? "bold" : fn().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ j(() => [
						["", Z("common.inherit")],
						["bold", Z("format.bold")],
						["normal", Z("calendar.fieldNormal")]
					]);
					ws(C, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => gn({ bold: e === "bold" || e !== "normal" && void 0 })
					});
				}
				var w = R(C, 2), ee = F(w);
				let T;
				var te = L(F(ee), !0);
				O(ee);
				var ne = R(ee, 2);
				let re;
				var ie = L(F(ne), !0);
				O(ne);
				var ae = R(ne, 2);
				{
					let e = /* @__PURE__ */ j(() => fn().color ?? ""), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("calendar.fieldColor"));
					va(ae, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						allowClear: !0,
						get label() {
							return V(n);
						},
						onchange: (e) => gn({ color: e || void 0 })
					});
				}
				O(w), Ee(2), B((e, t, n, r, i, s, d, f, p, g, _, y, C, w, ae, oe, E, se) => {
					X(a, "title", e), G(o, t), X(c, "title", n), xi(l, r), G(u, ` ${i ?? ""}`), X(m, "title", s), G(h, d), G(v, `${f ?? ""} `), X(b, "title", p), G(x, `${g ?? ""} `), X(S, "min", Wf.min), X(S, "max", Wf.max), Y(S, _), X(S, "placeholder", y), T = mi(ee, 1, "tbtn svelte-1n46o8q", null, T, { active: C }), X(ee, "title", w), G(te, ae), re = mi(ne, 1, "tbtn svelte-1n46o8q", null, re, { active: oe }), X(ne, "title", E), G(ie, se);
				}, [
					() => Z("tip.calendar.slot"),
					() => Z("calendar.colors"),
					() => Z("tip.calendar.stripe"),
					() => Uf(V(t), V(P).props.stripe).show,
					() => Z("calendar.stripe"),
					() => Z("tip.calendar.fieldStyle"),
					() => Z("calendar.fieldStyle"),
					() => Z("calendar.fieldFont"),
					() => Z("tip.calendar.fieldSize"),
					() => Z("calendar.fieldSize"),
					() => fn().size ?? "",
					() => Z("common.inherit"),
					() => fn().italic === !0,
					() => Z("format.italic"),
					() => Z("format.italicLetter"),
					() => fn().underline === !0,
					() => Z("calendar.fieldUnderline"),
					() => Z("format.underlineLetter")
				]), H("change", l, (e) => hn({ show: e.target.checked })), H("change", S, (e) => gn({ size: e.target.value === "" ? void 0 : Math.max(Wf.min, Math.min(Wf.max, Number(e.target.value) || Wf.min)) })), H("click", ee, () => gn({ italic: !fn().italic || void 0 })), H("click", ne, () => gn({ underline: !fn().underline || void 0 })), W(e, n);
			}, a = (e) => {
				var t = Dm(), n = I(t);
				{
					let e = /* @__PURE__ */ j(() => Z("lbl.variant")), t = /* @__PURE__ */ j(() => V(P).props.variant === "list" ? "list" : "cards"), r = /* @__PURE__ */ j(() => Wc.map((e) => [e, Z(`opt.faqVariant.${e}`)]));
					ws(n, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => z("variant", e)
					});
				}
				var r = R(n, 2), i = (e) => {
					var t = Em(), n = I(t), r = L(n, !0), i = R(n, 2);
					s(i), B((e) => G(r, e), [() => Z("lbl.cardStyle")]), W(e, t);
				};
				K(r, (e) => {
					V(P).props.variant !== "list" && e(i);
				}), Ee(2), W(e, t);
			}, o = (e) => {
				var t = Om(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.variant ?? "left"), t = /* @__PURE__ */ j(() => [["left", Z("opt.timeline.left")], ["alternating", Z("opt.timeline.alternating")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("variant", e)
					});
				}
				O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.marker ?? "filled"), t = /* @__PURE__ */ j(() => [["filled", Z("opt.timeline.filled")], ["ring", Z("opt.timeline.ring")]]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("marker", e)
					});
				}
				O(a);
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.accent ?? "accent"), t = /* @__PURE__ */ j(Fi);
					va(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => z("accent", e === "accent" ? null : e)
					});
				}
				O(c), Ee(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.timelineMarker"),
					() => Z("lbl.color")
				]), W(e, t);
			}, c = (e) => {
				var t = Am(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.variant ?? "large"), t = /* @__PURE__ */ j(() => [["large", Z("opt.quote.large")], ["short", Z("opt.quote.short")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("variant", e)
					});
				}
				O(n);
				var a = R(n, 2), o = (e) => {
					var t = km(), n = I(t), r = F(n), i = R(r);
					O(n);
					var a = R(n, 2), o = (e) => {
						var t = nm(), n = L(t, !0);
						B((e) => G(n, e), [() => Z("ui.quotePortraitRemove")]), H("click", t, () => z("image", "")), W(e, t);
					};
					K(a, (e) => {
						V(P).props.image && e(o);
					}), B((e) => G(r, `${e ?? ""} `), [() => Z("ui.quotePortrait")]), H("change", i, lr), W(e, t);
				}, s = (e) => {
					var t = em(), n = F(t);
					J(n);
					var r = R(n);
					O(t), B((e, i) => {
						X(t, "title", e), xi(n, V(P).props.card === !0), G(r, ` ${i ?? ""}`);
					}, [() => Z("tip.quote.card"), () => Z("lbl.quoteCard")]), H("change", n, (e) => z("card", e.target.checked)), W(e, t);
				};
				K(a, (e) => {
					V(P).props.variant === "short" ? e(o) : e(s, -1);
				});
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.accent ?? "accent"), t = /* @__PURE__ */ j(Fi);
					va(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => z("accent", e === "accent" ? null : e)
					});
				}
				O(c), Ee(2), B((e, t) => {
					G(r, `${e ?? ""} `), G(l, `${t ?? ""} `);
				}, [() => Z("lbl.variant"), () => Z("lbl.color")]), W(e, t);
			}, l = (e) => {
				var t = jm(), n = I(t);
				{
					let e = /* @__PURE__ */ j(() => Z("lbl.variant")), t = /* @__PURE__ */ j(() => Uc.includes(V(P).props.variant) ? V(P).props.variant : "plain"), r = /* @__PURE__ */ j(() => Uc.map((e) => [e, Z(`opt.statVariant.${e}`)]));
					ws(n, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => z("variant", e)
					});
				}
				var r = R(n, 2), i = F(r);
				J(i);
				var a = R(i);
				O(r), Ee(2), B((e, t) => {
					X(r, "title", e), xi(i, V(P).props.countUp !== !1), G(a, ` ${t ?? ""}`);
				}, [() => Z("tip.stat.countUp"), () => Z("lbl.statCountUp")]), H("change", i, (e) => z("countUp", e.target.checked)), W(e, t);
			}, u = (e) => {
				let t = /* @__PURE__ */ j(() => V(P).props.motion ?? "roll");
				var n = Lm(), r = I(n), i = F(r), a = L(i, !0), o = R(i, 2);
				{
					let e = /* @__PURE__ */ j(() => [
						["roll", Z("opt.ribbonMotion.roll")],
						["sway", Z("opt.ribbonMotion.sway")],
						["step", Z("opt.ribbonMotion.step")],
						["none", Z("opt.ribbonMotion.none")]
					]);
					Q(o, {
						filled: !0,
						get value() {
							return V(t);
						},
						get options() {
							return V(e);
						},
						onchange: (e) => z("motion", e)
					});
				}
				var s = R(o, 2), c = (e) => {
					var n = Pm(), r = I(n), i = L(r, !0), a = R(r, 2);
					{
						let e = /* @__PURE__ */ j(() => Z("lbl.ribbonDirection")), t = /* @__PURE__ */ j(() => V(P).props.direction ?? "left"), n = /* @__PURE__ */ j(() => [["left", Z("opt.ribbonDir.left")], ["right", Z("opt.ribbonDir.right")]]);
						ws(a, {
							get label() {
								return V(e);
							},
							get value() {
								return V(t);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => z("direction", e)
						});
					}
					var o = R(a, 2), s = (e) => {
						var t = Mm(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i);
						var a = L(R(i, 2));
						O(t), B((e, n) => {
							X(t, "title", e), G(r, n), Y(i, V(P).props.dwell ?? 2.5), G(a, `${V(P).props.dwell ?? 2.5 ?? ""} s`);
						}, [() => Z("tip.ribbon.dwell"), () => Z("lbl.ribbonDwell")]), H("input", i, (e) => z("dwell", e.target.valueAsNumber)), W(e, t);
					}, c = (e) => {
						var t = Nm(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i);
						var a = L(R(i, 2), !0);
						O(t), B((e, n) => {
							X(t, "title", e), G(r, n), Y(i, V(P).props.speed ?? 60), G(a, V(P).props.speed ?? 60);
						}, [() => Z("tip.ribbon.speed"), () => Z("lbl.ribbonSpeed")]), H("input", i, (e) => z("speed", e.target.valueAsNumber)), W(e, t);
					};
					K(o, (e) => {
						V(t) === "step" ? e(s) : e(c, -1);
					});
					var l = R(o, 2), u = F(l);
					J(u);
					var d = R(u);
					O(l);
					var f = R(l, 2), p = F(f);
					J(p);
					var m = R(p);
					O(f), B((e, t, n, a, o, s) => {
						X(r, "title", e), G(i, t), X(l, "title", n), xi(u, V(P).props.pauseOnHover !== !1), G(d, ` ${a ?? ""}`), X(f, "title", o), xi(p, V(P).props.fade !== !1), G(m, ` ${s ?? ""}`);
					}, [
						() => Z("tip.ribbon.play"),
						() => Z("ui.ribbonPlay"),
						() => Z("tip.ribbon.pause"),
						() => Z("lbl.ribbonPause"),
						() => Z("tip.ribbon.fade"),
						() => Z("lbl.ribbonFade")
					]), H("click", r, () => et?.sendDemoMotion()), H("change", u, (e) => z("pauseOnHover", e.target.checked)), H("change", p, (e) => z("fade", e.target.checked)), W(e, n);
				};
				K(s, (e) => {
					V(t) !== "none" && e(c);
				}), O(r);
				var l = R(r, 2), u = F(l), d = L(u, !0), f = R(u, 2), p = F(f), m = L(p, !0), h = R(p, 2);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.above ?? "none");
					Q(h, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(b);
						},
						onchange: (e) => z("above", e)
					});
				}
				O(f);
				var g = R(f, 2), _ = (e) => {
					var t = gp(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ j(() => V(P).props.aboveColor ?? Hc(V(P).props)), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.ribbon.stripeColor"));
						va(r, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => z("aboveColor", e)
						});
					}
					O(t), B((e, r) => {
						X(t, "title", e), G(n, `${r ?? ""} `);
					}, [() => Z("tip.ribbon.stripeColor"), () => Z("lbl.colour")]), W(e, t);
				};
				K(g, (e) => {
					(V(P).props.above ?? "none") !== "none" && e(_);
				});
				var v = R(g, 2), x = F(v), S = L(x, !0), C = R(x, 2);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.main ?? "text");
					Q(C, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(y);
						},
						onchange: (e) => z("main", e)
					});
				}
				O(v);
				var w = R(v, 2), ee = F(w), T = L(ee, !0), te = R(ee, 2);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.below ?? "none");
					Q(te, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(b);
						},
						onchange: (e) => z("below", e)
					});
				}
				O(w);
				var ne = R(w, 2), re = (e) => {
					var t = gp(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ j(() => V(P).props.belowColor ?? Hc(V(P).props)), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.ribbon.stripeColor"));
						va(r, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => z("belowColor", e)
						});
					}
					O(t), B((e, r) => {
						X(t, "title", e), G(n, `${r ?? ""} `);
					}, [() => Z("tip.ribbon.stripeColor"), () => Z("lbl.colour")]), W(e, t);
				};
				K(ne, (e) => {
					(V(P).props.below ?? "none") !== "none" && e(re);
				});
				var ie = R(ne, 2), ae = (e) => {
					var t = Fm(), n = I(t);
					{
						let e = /* @__PURE__ */ j(() => Z("lbl.ribbonStripePlace")), t = /* @__PURE__ */ j(() => Z("tip.ribbon.stripePlace")), r = /* @__PURE__ */ j(() => V(P).props.stripePlace ?? "stack"), i = /* @__PURE__ */ j(() => [["stack", Z("opt.ribbonPlace.stack")], ["edge", Z("opt.ribbonPlace.edge")]]);
						ws(n, {
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
							onchange: (e) => z("stripePlace", e)
						});
					}
					var r = R(n, 2), i = F(r), a = L(i, !0), o = R(i, 2);
					J(o);
					var s = L(R(o, 2));
					O(r), B((e, t) => {
						X(r, "title", e), G(a, t), Y(o, V(P).props.thickness ?? 8), G(s, `${V(P).props.thickness ?? 8 ?? ""} px`);
					}, [() => Z("tip.ribbon.thickness"), () => Z("lbl.ribbonThickness")]), H("input", o, (e) => z("thickness", e.target.valueAsNumber)), W(e, t);
				};
				K(ie, (e) => {
					((V(P).props.above ?? "none") !== "none" || (V(P).props.below ?? "none") !== "none") && e(ae);
				}), O(l);
				var oe = R(l, 2), E = F(oe), se = L(E, !0), ce = R(E, 2);
				{
					let e = /* @__PURE__ */ j(() => Z("lbl.ribbonWidth")), t = /* @__PURE__ */ j(() => V(P).props.width ?? "content"), n = /* @__PURE__ */ j(() => [["content", Z("opt.ribbonWidth.content")], ["page", Z("opt.ribbonWidth.page")]]);
					ws(ce, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => z("width", e)
					});
				}
				var le = R(ce, 2);
				{
					let e = /* @__PURE__ */ j(() => Z("lbl.ribbonVariant")), t = /* @__PURE__ */ j(() => V(P).props.variant ?? "band"), n = /* @__PURE__ */ j(() => [["band", Z("opt.ribbonVariant.band")], ["plain", Z("opt.ribbonVariant.plain")]]);
					ws(le, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => z("variant", e)
					});
				}
				var ue = R(le, 2), D = F(ue), de = L(D, !0), fe = R(D, 2);
				J(fe);
				var pe = L(R(fe, 2));
				O(ue), O(oe);
				var me = R(oe, 2), he = F(me), ge = L(he, !0), _e = R(he, 2), ve = F(_e), ye = L(ve, !0), be = R(ve, 2);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.size ?? "md"), t = /* @__PURE__ */ j(() => [
						["sm", Z("opt.size.sm")],
						["md", Z("opt.size.md")],
						["lg", Z("opt.size.lg")],
						["xl", Z("opt.size.xl")]
					]);
					Q(be, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("size", e)
					});
				}
				O(_e);
				var xe = R(_e, 2), Se = F(xe);
				J(Se);
				var Ce = R(Se);
				O(xe);
				var we = R(xe, 2), Te = F(we);
				J(Te);
				var De = R(Te);
				O(we);
				var Oe = R(we, 2), ke = F(Oe);
				J(ke);
				var Ae = R(ke);
				O(Oe);
				var je = R(Oe, 2), Me = F(je), Ne = L(Me, !0), Pe = R(Me, 2);
				J(Pe);
				var Fe = L(R(Pe, 2));
				O(je), O(me);
				var Ie = R(me, 2), Le = F(Ie), Re = L(Le, !0), ze = R(Le, 2), Be = F(ze), Ve = (e) => {
					var t = Im(), n = F(t);
					{
						let e = /* @__PURE__ */ j(() => V(P).props.bg ?? "accent"), t = /* @__PURE__ */ j(Fi), r = /* @__PURE__ */ j(() => Z("tip.ribbon.bg"));
						va(n, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(r);
							},
							onchange: (e) => z("bg", e)
						});
					}
					var r = L(R(n, 2), !0);
					O(t), B((e, n) => {
						X(t, "title", e), G(r, n);
					}, [() => Z("tip.ribbon.bg"), () => Z("lbl.background")]), W(e, t);
				};
				K(Be, (e) => {
					(V(P).props.variant ?? "band") !== "plain" && e(Ve);
				});
				var He = R(Be, 2), Ue = F(He);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.color ?? ((V(P).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.ribbon.color"));
					va(Ue, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => z("color", e)
					});
				}
				var We = L(R(Ue, 2), !0);
				O(He), O(ze), O(Ie), Ee(2), B((e, t, n, r, i, o, s, c, l, u, p, h, g, _, y, b, x, C, ee, te, ne, re, ie, ae) => {
					G(a, e), G(d, t), X(f, "title", n), G(m, r), X(v, "title", i), G(S, o), X(w, "title", s), G(T, c), G(se, l), X(ue, "title", u), G(de, p), Y(fe, V(P).props.tilt ?? 0), G(pe, `${V(P).props.tilt ?? 0 ?? ""}°`), G(ge, h), G(ye, g), X(xe, "title", _), xi(Se, V(P).props.caps === !0), G(Ce, ` ${y ?? ""}`), X(we, "title", b), xi(Te, V(P).props.weight === "bold"), G(De, ` ${x ?? ""}`), X(Oe, "title", C), xi(ke, V(P).props.outline === !0), G(Ae, ` ${ee ?? ""}`), X(je, "title", te), G(Ne, ne), Y(Pe, V(P).props.gap ?? 40), G(Fe, `${V(P).props.gap ?? 40 ?? ""} px`), G(Re, re), X(He, "title", ie), G(We, ae);
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
				]), H("input", fe, (e) => z("tilt", e.target.valueAsNumber)), H("change", Se, (e) => z("caps", e.target.checked)), H("change", Te, (e) => z("weight", e.target.checked ? "bold" : "normal")), H("change", ke, (e) => z("outline", e.target.checked)), H("input", Pe, (e) => z("gap", e.target.valueAsNumber)), W(e, n);
			}, d = (e) => {
				var t = Rm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.lines ?? "rows"), t = /* @__PURE__ */ j(() => [
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
						onchange: (e) => z("lines", e)
					});
				}
				O(n);
				var a = R(n, 2), o = F(a);
				J(o);
				var s = R(o);
				O(a), Ee(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), xi(o, t), G(s, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.tableLines"),
					() => !!V(P).props.striped,
					() => Z("lbl.tableStriped")
				]), H("change", o, (e) => z("striped", e.target.checked)), W(e, t);
			}, f = (e) => {
				var t = zm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.variant ?? "icons"), t = /* @__PURE__ */ j(() => [["icons", Z("opt.share.icons")], ["labels", Z("opt.share.labels")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("variant", e)
					});
				}
				O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a);
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.color || "accent"), t = /* @__PURE__ */ j(Fi);
					va(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => z("color", e === "accent" ? "" : e)
					});
				}
				O(c), Ee(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), Y(s, V(P).props.size ?? 38), G(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.size"),
					() => Z("lbl.color")
				]), H("change", s, (e) => z("size", Number(e.target.value) || 38)), W(e, t);
			}, p = (e) => {
				var t = Rm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.variant ?? "boxes"), t = /* @__PURE__ */ j(() => [["boxes", Z("opt.countdown.boxes")], ["plain", Z("opt.countdown.plain")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("variant", e)
					});
				}
				O(n);
				var a = R(n, 2), o = F(a);
				J(o);
				var s = R(o);
				O(a), Ee(2), B((e, t) => {
					G(r, `${e ?? ""} `), xi(o, V(P).props.showSeconds !== !1), G(s, ` ${t ?? ""}`);
				}, [() => Z("lbl.variant"), () => Z("lbl.countdownSeconds")]), H("change", o, (e) => z("showSeconds", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = Bm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => [["primary", Z("opt.btn.primary")], ["secondary", Z("opt.btn.secondary")]]);
					Q(i, {
						get value() {
							return V(P).props.style;
						},
						get options() {
							return V(e);
						},
						onchange: (e) => z("style", e)
					});
				}
				O(n), Ee(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.style")]), W(e, t);
			}, h = (e) => {
				var t = Vm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.fit ?? "cover"), t = /* @__PURE__ */ j(() => [["cover", Z("opt.fitFrame.cover")], ["contain", Z("opt.fitFrame.contain")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("fit", e)
					});
				}
				O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.radius ?? ""), t = /* @__PURE__ */ j(() => [
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
						onchange: (e) => z("radius", e || null)
					});
				}
				O(a);
				var c = R(a, 2), l = F(c), u = L(R(l));
				O(c);
				var d = R(c, 2);
				J(d);
				var f = R(d, 2), p = F(f), m = L(R(p));
				O(f);
				var h = R(f, 2);
				J(h);
				var g = R(h, 2), _ = F(g), v = L(R(_));
				O(g);
				var y = R(g, 2);
				J(y);
				var b = R(y, 2), x = F(b), S = L(R(x));
				O(b);
				var C = R(b, 2);
				J(C);
				var w = R(C, 2), ee = F(w), T = L(R(ee));
				O(w);
				var te = R(w, 2);
				J(te);
				var ne = R(te, 2), re = F(ne), ie = L(R(re));
				O(ne);
				var ae = R(ne, 2);
				J(ae);
				var oe = R(ae, 2), E = L(oe, !0);
				Ee(2), B((e, t, n, i, a, s, c, f, b, w, ne, se, ce, le, ue, D, de) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `), G(u, `${i ?? ""}%`), Y(d, V(P).props.x ?? .5), G(p, `${a ?? ""} `), G(m, `${s ?? ""}%`), Y(h, V(P).props.y ?? .5), X(g, "title", c), G(_, `${f ?? ""} `), G(v, `${b ?? ""}x`), Y(y, V(P).props.zoom ?? 1), G(x, `${w ?? ""} `), G(S, `${ne ?? ""}%`), Y(C, V(P).props.brightness ?? 1), G(ee, `${se ?? ""} `), G(T, `${ce ?? ""}%`), Y(te, V(P).props.contrast ?? 1), G(re, `${le ?? ""} `), G(ie, `${ue ?? ""}%`), Y(ae, V(P).props.saturate ?? 1), X(oe, "title", D), G(E, de);
				}, [
					() => Z("lbl.fit"),
					() => Z("lbl.radius"),
					() => Z("lbl.focusX"),
					() => Math.round((V(P).props.x ?? .5) * 100),
					() => Z("lbl.focusY"),
					() => Math.round((V(P).props.y ?? .5) * 100),
					() => Z("tip.zoomCrop"),
					() => Z("lbl.zoom"),
					() => (V(P).props.zoom ?? 1).toFixed(2),
					() => Z("lbl.brightness"),
					() => Math.round((V(P).props.brightness ?? 1) * 100),
					() => Z("lbl.contrast"),
					() => Math.round((V(P).props.contrast ?? 1) * 100),
					() => Z("lbl.saturate"),
					() => Math.round((V(P).props.saturate ?? 1) * 100),
					() => Z("tip.resetAdjust"),
					() => Z("ui.resetAdjust")
				]), H("input", d, (e) => z("x", Number(e.target.value))), H("input", h, (e) => z("y", Number(e.target.value))), H("input", y, (e) => z("zoom", Number(e.target.value))), H("input", C, (e) => z("brightness", Number(e.target.value))), H("input", te, (e) => z("contrast", Number(e.target.value))), H("input", ae, (e) => z("saturate", Number(e.target.value))), H("click", oe, () => cn(`edit:${V(P).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), W(e, t);
			}, g = (e) => {
				var t = Hm(), n = I(t), r = F(n), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.color ?? "accent"), t = /* @__PURE__ */ j(Fi);
					va(s, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => z("color", e)
					});
				}
				O(a), Ee(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(P).props.size ?? 48), X(a, "title", t), G(o, `${n ?? ""} `);
				}, [
					() => Z("lbl.sizePx"),
					() => Z("hint.icon.color"),
					() => Z("lbl.color")
				]), H("change", i, (e) => z("size", Number(e.target.value))), W(e, t);
			}, _ = (e) => {
				var t = Bm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.view ?? "cards"), t = /* @__PURE__ */ j(() => [
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
						onchange: (e) => z("view", e)
					});
				}
				O(n), Ee(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.view")]), W(e, t);
			}, v = (e) => {
				var t = Um(), n = I(t), r = F(n), i = R(r);
				J(i), O(n), Ee(2), B((e, t) => {
					X(n, "title", e), G(r, `${t ?? ""} `), Y(i, V(P).props.columns ?? 0);
				}, [() => Z("tip.product.columns"), () => Z("lbl.columns")]), H("change", i, (e) => z("columns", Number(e.target.value))), W(e, t);
			}, x = (e) => {
				var t = Bm(), n = I(t), r = F(n), i = R(r);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.variant ?? "button"), t = /* @__PURE__ */ j(() => [["button", Z("opt.cart.button")], ["icon", Z("opt.cart.icon")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("variant", e)
					});
				}
				O(n), Ee(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.view")]), W(e, t);
			}, S = (e) => {
				let t = /* @__PURE__ */ j(() => Dd(V(P).props.view));
				var n = Ym(), r = I(n), i = F(r), a = R(i);
				{
					let e = /* @__PURE__ */ j(() => Cd.map((e) => [e, Z(`opt.galleryView.${e}`)]));
					Q(a, {
						get value() {
							return V(t);
						},
						get options() {
							return V(e);
						},
						onchange: (e) => z("view", e)
					});
				}
				O(r);
				var o = R(r, 2), s = (e) => {
					var t = Wm(), n = I(t), r = F(n), i = R(r);
					J(i), O(n);
					var a = R(n, 2), o = F(a), s = L(R(o));
					O(a);
					var c = R(a, 2);
					J(c), B((e, t) => {
						G(r, `${e ?? ""} `), Y(i, V(P).props.columns ?? 3), G(o, `${t ?? ""} `), G(s, `${V(P).props.gap ?? 12 ?? ""} px`), Y(c, V(P).props.gap ?? 12);
					}, [() => Z("lbl.columns"), () => Z("lbl.imageGap")]), H("change", i, (e) => z("columns", Number(e.target.value))), H("input", c, (e) => z("gap", Number(e.target.value))), W(e, t);
				}, c = /* @__PURE__ */ j(() => wd.includes(V(t)));
				K(o, (e) => {
					V(c) && e(s);
				});
				var l = R(o, 2), u = (e) => {
					var t = Gm(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
					J(a);
					var o = L(R(a, 2));
					O(n);
					var s = R(n, 2), c = F(s);
					q(c, () => T.shuffle);
					var l = R(c);
					O(s), B((e, t, r, c) => {
						X(n, "title", e), G(i, t), X(a, "min", Td.min), X(a, "max", Td.max), Y(a, V(P).props.rowHeight ?? Td.dflt), G(o, `${V(P).props.rowHeight ?? Td.dflt ?? ""} px`), X(s, "title", r), G(l, ` ${c ?? ""}`);
					}, [
						() => Z("tip.gallery.rowHeight"),
						() => Z("lbl.galleryRowHeight"),
						() => Z("tip.gallery.shuffleMosaic"),
						() => Z("ui.shufflePhotos")
					]), H("input", a, (e) => z("rowHeight", e.target.valueAsNumber)), H("click", s, () => z("seed", yi())), W(e, t);
				};
				K(l, (e) => {
					V(t) === "mosaic" && e(u);
				});
				var d = R(l, 2), f = (e) => {
					var t = Km(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
					J(a);
					var o = L(R(a, 2));
					O(n);
					var s = R(n, 2), c = (e) => {
						var t = pp(), n = F(t);
						q(n, () => T.shuffle);
						var r = R(n);
						O(t), B((e, n) => {
							X(t, "title", e), G(r, ` ${n ?? ""}`);
						}, [() => Z("tip.gallery.shuffleTilt"), () => Z("ui.shufflePhotos")]), H("click", t, () => z("seed", yi())), W(e, t);
					};
					K(s, (e) => {
						(V(P).props.tilt ?? Ed.dflt) > 0 && e(c);
					});
					var l = R(s, 2), u = F(l), d = R(u);
					{
						let e = /* @__PURE__ */ j(() => V(P).props.frameColor || "#ffffff"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.gallery.frameColor"));
						va(d, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							allowClear: !0,
							get label() {
								return V(n);
							},
							onchange: (e) => z("frameColor", e ?? "")
						});
					}
					O(l);
					var f = R(l, 2), p = F(f);
					J(p);
					var m = R(p);
					O(f), B((e, t, r, s, c, d) => {
						X(n, "title", e), G(i, t), X(a, "min", Ed.min), X(a, "max", Ed.max), Y(a, V(P).props.tilt ?? Ed.dflt), G(o, `${V(P).props.tilt ?? Ed.dflt ?? ""}°`), X(l, "title", r), G(u, `${s ?? ""} `), X(f, "title", c), xi(p, V(P).props.captions === !0), G(m, ` ${d ?? ""}`);
					}, [
						() => Z("tip.gallery.tilt"),
						() => Z("lbl.polaroidTilt"),
						() => Z("tip.gallery.frameColor"),
						() => Z("lbl.frameColor"),
						() => Z("tip.gallery.captions"),
						() => Z("lbl.galleryCaptions")
					]), H("input", a, (e) => z("tilt", e.target.valueAsNumber)), H("change", p, (e) => z("captions", e.target.checked)), W(e, t);
				};
				K(d, (e) => {
					V(t) === "polaroid" && e(f);
				});
				var p = R(d, 2), m = (e) => {
					var t = qm(), n = I(t);
					{
						let e = /* @__PURE__ */ j(() => Z("lbl.ribbonRows")), t = /* @__PURE__ */ j(() => String(V(P).props.rows ?? 1)), r = /* @__PURE__ */ j(() => [["1", Z("opt.ribbonRows.one")], ["2", Z("opt.ribbonRows.two")]]);
						ws(n, {
							get label() {
								return V(e);
							},
							get value() {
								return V(t);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => z("rows", Number(e))
						});
					}
					var r = R(n, 2);
					{
						let e = /* @__PURE__ */ j(() => Z("lbl.ribbonDirection")), t = /* @__PURE__ */ j(() => V(P).props.direction ?? "left"), n = /* @__PURE__ */ j(() => [["left", Z("opt.ribbonDir.left")], ["right", Z("opt.ribbonDir.right")]]);
						ws(r, {
							get label() {
								return V(e);
							},
							get value() {
								return V(t);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => z("direction", e)
						});
					}
					var i = R(r, 2), a = F(i), o = L(a, !0), s = R(a, 2);
					J(s);
					var c = L(R(s, 2), !0);
					O(i);
					var l = R(i, 2), u = F(l), d = L(u, !0), f = R(u, 2);
					J(f);
					var p = L(R(f, 2));
					O(l);
					var m = R(l, 2), h = F(m), g = L(R(h));
					O(m);
					var _ = R(m, 2);
					J(_);
					var v = R(_, 2), y = F(v);
					J(y);
					var b = R(y);
					O(v);
					var x = R(v, 2), S = F(x);
					J(S);
					var C = R(S);
					O(x), B((e, t, n, r, a, u, m, w, ee) => {
						X(i, "title", e), G(o, t), Y(s, V(P).props.speed ?? 60), G(c, V(P).props.speed ?? 60), X(l, "title", n), G(d, r), Y(f, V(P).props.bandHeight ?? 160), G(p, `${V(P).props.bandHeight ?? 160 ?? ""} px`), G(h, `${a ?? ""} `), G(g, `${V(P).props.gap ?? 12 ?? ""} px`), Y(_, V(P).props.gap ?? 12), X(v, "title", u), xi(y, V(P).props.pauseOnHover !== !1), G(b, ` ${m ?? ""}`), X(x, "title", w), xi(S, V(P).props.fade !== !1), G(C, ` ${ee ?? ""}`);
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
					]), H("input", s, (e) => z("speed", e.target.valueAsNumber)), H("input", f, (e) => z("bandHeight", e.target.valueAsNumber)), H("input", _, (e) => z("gap", Number(e.target.value))), H("change", y, (e) => z("pauseOnHover", e.target.checked)), H("change", S, (e) => z("fade", e.target.checked)), W(e, t);
				};
				K(p, (e) => {
					V(t) === "ribbon" && e(m);
				});
				var h = R(p, 2), g = (e) => {
					var t = Jm(), n = F(t), r = R(n);
					J(r), O(t), B((e) => {
						G(n, `${e ?? ""} `), Y(r, V(P).props.interval ?? 5);
					}, [() => Z("lbl.secondsPerImage")]), H("change", r, (e) => z("interval", Number(e.target.value))), W(e, t);
				};
				K(h, (e) => {
					V(t) === "slides" && e(g);
				});
				var _ = R(h, 2), v = F(_), y = R(v);
				{
					let e = /* @__PURE__ */ j(() => V(P).props.radius ?? ""), t = /* @__PURE__ */ j(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(y, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => z("radius", e || null)
					});
				}
				O(_);
				var b = R(_, 2), x = F(b);
				J(x);
				var S = R(x);
				O(b), Ee(2), B((e, t, n, r) => {
					G(i, `${e ?? ""} `), G(v, `${t ?? ""} `), X(b, "title", n), xi(x, V(P).props.lightbox !== !1), G(S, ` ${r ?? ""}`);
				}, [
					() => Z("lbl.view"),
					() => Z("lbl.radius"),
					() => Z("tip.lightbox"),
					() => Z("lbl.lightbox")
				]), H("change", x, (e) => z("lightbox", e.target.checked)), W(e, n);
			}, C = (e) => {
				var t = Zm(), n = I(t), r = F(n);
				Q(R(r), {
					get value() {
						return V(P).props.color;
					},
					get options() {
						return pr;
					},
					onchange: (e) => z("color", e)
				}), O(n);
				var i = R(n, 2), a = F(i), o = R(a);
				J(o), O(i);
				var s = R(i, 2), c = (e) => {
					var t = Xm(), n = F(t), r = R(n);
					J(r), O(t), B((e, t) => {
						G(n, `${e ?? ""} `), X(r, "max", t), Y(r, V(P).frame.w);
					}, [() => Z("lbl.length"), () => Math.max(1, Math.round(100 - V(P).frame.x))]), H("change", r, (e) => Dn("w", Math.max(1, Math.min(Number(e.target.value), 100 - V(P).frame.x)))), W(e, t);
				};
				K(s, (e) => {
					(V(P).props.kind === "line" || V(P).props.kind === "arrow") && e(c);
				});
				var l = R(s, 2), u = (e) => {
					var t = jp(), n = F(t), r = R(n);
					J(r), O(t), B((e, i) => {
						X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(P).props.label ?? "");
					}, [() => Z("tip.shape.label"), () => Z("lbl.shapeLabel")]), H("change", r, (e) => z("label", e.target.value.trim() || void 0)), W(e, t);
				};
				K(l, (e) => {
					V(P).props.kind === "line" && e(u);
				});
				var d = R(l, 2), f = F(d);
				J(f);
				var p = R(f);
				O(d), Ee(2), B((e, t, n, i, s) => {
					G(r, `${e ?? ""} `), G(a, `${t ?? ""} `), Y(o, V(P).props.thickness), X(d, "title", n), xi(f, i), G(p, ` ${s ?? ""}`);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.thickness"),
					() => Z("tip.shape.fill"),
					() => !!V(P).props.fill,
					() => Z("lbl.filled")
				]), H("change", o, (e) => z("thickness", Number(e.target.value))), H("change", f, (e) => z("fill", e.target.checked ? V(P).props.color : null)), W(e, t);
			};
			K(n, (e) => {
				V(P).type === "text" ? e(r) : V(P).type === "calendar" ? e(i, 1) : V(P).type === "faq" ? e(a, 2) : V(P).type === "timeline" ? e(o, 3) : V(P).type === "quote" ? e(c, 4) : V(P).type === "stats" ? e(l, 5) : V(P).type === "ribbon" ? e(u, 6) : V(P).type === "table" ? e(d, 7) : V(P).type === "share" ? e(f, 8) : V(P).type === "countdown" ? e(p, 9) : V(P).type === "button" ? e(m, 10) : V(P).type === "image" ? e(h, 11) : V(P).type === "icon" ? e(g, 12) : V(P).type === "collection" ? e(_, 13) : V(P).type === "product" ? e(v, 14) : V(P).type === "cart" ? e(x, 15) : V(P).type === "gallery" ? e(S, 16) : V(P).type === "shape" && e(C, 17);
			});
			var w = R(n, 2), ee = F(w), te = R(ee);
			{
				let e = /* @__PURE__ */ j(() => V(P).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ j(() => _n.has(V(P).type) ? [["wrap", Z("opt.fit.fluid")], ["shrink", Z("opt.fit.floor")]] : [["wrap", Z("opt.fit.wrap")], ["shrink", Z("opt.fit.shrink")]]);
				Q(te, {
					get value() {
						return V(e);
					},
					get options() {
						return V(t);
					},
					onchange: (e) => yn(e)
				});
			}
			O(w);
			var ne = R(w, 2), re = (e) => {
				var t = Qm(), n = F(t), r = L(n, !0), i = R(n, 2);
				J(i);
				var a = L(R(i, 2));
				O(t), B((e, n, o, s) => {
					X(t, "title", e), G(r, n), Y(i, o), G(a, `${s ?? ""} %`);
				}, [
					() => Z("tip.fitMin"),
					() => Z("lbl.fitMin"),
					() => Math.round((V(P).fitMin ?? .6) * 100),
					() => Math.round((V(P).fitMin ?? .6) * 100)
				]), H("input", i, (e) => bn(e.target.valueAsNumber / 100)), W(e, t);
			};
			K(ne, (e) => {
				V(P).fit === "shrink" && e(re);
			});
			var ie = R(ne, 4), ae = F(ie), oe = R(ae);
			{
				let e = /* @__PURE__ */ j(() => Ui(V(P).animation) ? V(P).animation.type : "");
				Q(oe, {
					get value() {
						return V(e);
					},
					get options() {
						return Ji;
					},
					onchange: (e) => Zi(e || null)
				});
			}
			O(ie);
			var E = R(ie, 2), se = (e) => {
				var t = $m(), n = I(t), r = F(n), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a), B((e, t) => {
					G(r, `${e ?? ""} `), Y(i, V(P).animation.props.duration), G(o, `${t ?? ""} `), Y(s, V(P).animation.props.delay);
				}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), H("change", i, (e) => ta("duration", Number(e.target.value))), H("change", s, (e) => ta("delay", Number(e.target.value))), W(e, t);
			}, ce = /* @__PURE__ */ j(() => Ui(V(P).animation));
			K(E, (e) => {
				V(ce) && e(se);
			});
			var le = R(E, 2), ue = F(le), D = R(ue);
			{
				let e = /* @__PURE__ */ j(() => V(P).hover?.type ?? (V(P).animation && !Ui(V(P).animation) ? V(P).animation.type : ""));
				Q(D, {
					get value() {
						return V(e);
					},
					get options() {
						return Yi;
					},
					onchange: (e) => Qi(e || null)
				});
			}
			O(le);
			var de = R(le, 2), fe = (e) => {
				var t = nh(), n = R(I(t), 2), r = F(n);
				J(r);
				var i = R(r);
				O(n);
				var a = R(n, 2), o = (e) => {
					var t = th(), n = I(t), r = F(n), i = R(r);
					{
						let e = /* @__PURE__ */ j(() => V(P).sticky.mode ?? "scroll"), t = /* @__PURE__ */ j(() => [["scroll", Z("opt.sticky.modeScroll")], ["screen", Z("opt.sticky.modeScreen")]]);
						Q(i, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => cn(`edit:${V(P).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					O(n);
					var a = R(n, 2), o = (e) => {
						var t = eh(), n = F(t), r = R(n);
						J(r), O(t), B((e, i) => {
							X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(P).sticky.offset ?? 16);
						}, [() => V(P).sticky.mode === "screen" ? Z("tip.stickyEdge") : Z("tip.stickyOffset"), () => V(P).sticky.mode === "screen" ? Z("lbl.stickyEdge") : Z("lbl.stickyOffset")]), H("change", r, (e) => cn(`edit:${V(P).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), W(e, t);
					};
					K(a, (e) => {
						(V(P).sticky.mode !== "screen" || (V(P).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = R(a, 2), c = (e) => {
						var t = gp(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ j(() => V(P).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ j(() => an.map(([e, t]) => [e, Z(t)]));
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => cn(`edit:${V(P).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						O(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyDock"), () => Z("lbl.stickyDock")]), W(e, t);
					}, l = (e) => {
						var t = gp(), n = F(t), r = R(n);
						{
							let e = /* @__PURE__ */ j(() => V(P).sticky.until ?? ""), t = /* @__PURE__ */ j(on);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => cn(`edit:${V(P).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						O(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyUntil"), () => Z("lbl.stickyUntil")]), W(e, t);
					};
					K(s, (e) => {
						V(P).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), B((e, t) => {
						X(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Z("tip.stickyMode"), () => Z("lbl.stickyMode")]), W(e, t);
				};
				K(a, (e) => {
					V(P).sticky && e(o);
				}), B((e, t, a) => {
					X(n, "title", e), xi(r, t), G(i, ` ${a ?? ""}`);
				}, [
					() => Z("tip.sticky"),
					() => !!V(P).sticky,
					() => Z("lbl.sticky")
				]), H("change", r, (e) => cn(`edit:${V(P).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), W(e, t);
			};
			K(de, (e) => {
				V(ke) === "desktop" && e(fe);
			});
			var pe = R(de, 4), me = F(pe), he = L(me, !0), ge = R(me, 2), _e = F(ge), ve = (e) => {
				var t = rh(), n = F(t), r = F(n, !0), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a, !0), s = R(o);
				J(s), O(a);
				var c = R(a, 2), l = F(c, !0), u = R(l);
				J(u), O(c);
				var d = R(c, 2), f = F(d, !0), p = R(f);
				J(p), O(d);
				var m = R(d, 2), h = F(m, !0), g = R(h);
				J(g), O(m);
				var _ = R(m, 2), v = F(_, !0), y = R(v);
				J(y), O(_), O(t), B((e, t, n, a, c, d, _) => {
					G(r, e), Y(i, V(P).frame.x), G(o, t), Y(s, V(P).frame.y), G(l, n), Y(u, V(P).frame.w), G(f, a), Y(p, V(P).frame.h), X(m, "title", c), G(h, d), Y(g, V(P).frame.z ?? 1), G(v, _), Y(y, V(P).frame.rot ?? 0);
				}, [
					() => Z("frame.x"),
					() => Z("frame.y"),
					() => Z("frame.w"),
					() => Z("frame.h"),
					() => Z("tip.frameZ"),
					() => Z("frame.z"),
					() => Z("frame.rot")
				]), H("change", i, (e) => Dn("x", Number(e.target.value))), H("change", s, (e) => Dn("y", Number(e.target.value))), H("change", u, (e) => Dn("w", Number(e.target.value))), H("change", p, (e) => Dn("h", Number(e.target.value))), H("change", g, (e) => Dn("z", Number(e.target.value))), H("change", y, (e) => Dn("rot", Number(e.target.value))), W(e, t);
			};
			K(_e, (e) => {
				V(ke) === "desktop" && e(ve);
			});
			var ye = R(_e, 2), be = F(ye);
			J(be);
			var xe = R(be);
			O(ye);
			var Se = R(ye, 2), Ce = F(Se);
			J(Ce);
			var we = R(Ce);
			O(Se), O(ge), O(pe), B((e, t, n, r, i, a, o, s, c, l, u, d) => {
				X(w, "title", e), G(ee, `${t ?? ""} `), X(ie, "title", n), G(ae, `${r ?? ""} `), X(le, "title", i), G(ue, `${a ?? ""} `), X(me, "title", o), G(he, s), X(ye, "title", c), xi(be, V(P).hideMobile), G(xe, ` ${l ?? ""}`), X(Se, "title", u), xi(Ce, V(P).decor), G(we, ` ${d ?? ""}`);
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
			]), H("change", be, (e) => sr(e.target.checked)), H("change", Ce, (e) => rr(e.target.checked)), W(e, t);
		};
		K(d, (e) => {
			V(wn) === "content" ? e(f) : e(p, -1);
		}), B((e, t) => {
			a = mi(i, 1, "svelte-1n46o8q", null, a, { on: V(wn) === "content" }), G(o, e), l = mi(c, 1, "svelte-1n46o8q", null, l, { on: V(wn) === "style" }), G(u, t);
		}, [() => Z("props.tabContent"), () => Z("props.tabStyle")]), H("click", i, () => N(wn, "content")), H("click", c, () => N(wn, "style")), W(e, t);
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
	}, y = /* @__PURE__ */ j(() => [
		["text", Z("opt.ribbonStripe.text")],
		["marks", Z("opt.ribbonStripe.marks")],
		["plain", Z("opt.ribbonStripe.plain")]
	]), b = /* @__PURE__ */ j(() => [["none", Z("common.none")], ...V(y)]), x = /* @__PURE__ */ j(() => [
		["dot", Z("opt.ribbonSep.dot")],
		["dash", Z("opt.ribbonSep.dash")],
		["slash", Z("opt.ribbonSep.slash")],
		["star", Z("opt.ribbonSep.star")],
		["none", Z("common.none")],
		["custom", Z("opt.ribbonSep.custom")]
	]), S = /* @__PURE__ */ M("");
	function C() {
		V(S).trim() && (N(po, V(S), !0), N(ho, null), xo() !== !1 && N(S, ""));
	}
	let w = [
		["color", pu],
		["gradient", Tu],
		["glow", Eu],
		["image", xd],
		["slideshow", cf],
		["video", Df],
		["pattern", zu],
		["grain", Ou]
	], ee = Object.fromEntries(w), T = {
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
	}, te = [
		["purple", Z("adminTheme.purple")],
		["well", Z("adminTheme.well")],
		["gold", Z("adminTheme.gold")],
		["grey", Z("adminTheme.grey")],
		["aurora", Z("adminTheme.aurora")],
		["dusk", Z("adminTheme.dusk")],
		["ember", Z("adminTheme.ember")]
	], ne = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, re = /* @__PURE__ */ M(Qt((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return ne[e] ?? e ?? "grey";
	})()));
	vn(() => {
		document.documentElement.dataset.adminTheme = V(re), localStorage.setItem("urd-admin-theme", V(re)), ie();
	});
	function ie() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		et?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": ae(t)
		});
	}
	function ae(e) {
		return du(e) == null || (fu(e, "#ffffff") ?? 0) >= (fu(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let oe = /* @__PURE__ */ M(null), E = /* @__PURE__ */ M(null), se = /* @__PURE__ */ M(!1), ce = /* @__PURE__ */ M(""), le = /* @__PURE__ */ M("info"), ue = 0;
	function D(e, t = "info") {
		N(ce, e, !0), N(le, t, !0);
		let n = ++ue;
		t === "ok" && setTimeout(() => {
			ue === n && (N(ce, ""), N(le, "info"));
		}, 8e3);
	}
	function de() {
		D(Z("status.storageFull"), "error");
	}
	function fe(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			de();
		}
	}
	let pe = /* @__PURE__ */ M(null), me = /* @__PURE__ */ M(null), he = /* @__PURE__ */ M(Qt({
		size: 16,
		snap: !0
	})), ge = /* @__PURE__ */ M(!0), _e = /* @__PURE__ */ M(Qt(zo(typeof window < "u" ? window : null) ?? 1920)), ve = "urd-admin-screen";
	function ye() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(ve) ?? "null");
		} catch {
			e = null;
		}
		return Bo(e, V(_e));
	}
	let be = /* @__PURE__ */ M(Qt(ye()));
	function xe(e) {
		N(be, Bo({
			...We(V(be)),
			...e
		}, V(_e)), !0);
		try {
			localStorage.setItem(ve, JSON.stringify(V(be)));
		} catch {}
	}
	let Se = /* @__PURE__ */ j(() => Vo(V(be), V(_e))), Ce = [
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
	], we = /* @__PURE__ */ j(() => [{
		id: "desktop",
		width: V(Se).width,
		height: V(Se).height || null,
		viewport: "desktop"
	}, ...Ce]);
	function Te(e) {
		let t = Yo(V(ks), V(As), e.width).width;
		return Z(e.id === "desktop" ? V(be).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let De = /* @__PURE__ */ M("desktop"), Oe = /* @__PURE__ */ j(() => V(we).find((e) => e.id === V(De)) ?? V(we)[0]), ke = /* @__PURE__ */ j(() => V(Oe).viewport === "mobile" || V(Oe).width <= (V(A)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), Ae = /* @__PURE__ */ M(null), je = /* @__PURE__ */ M(0), Me = /* @__PURE__ */ M(0), Ne = /* @__PURE__ */ M("fit"), Pe = /* @__PURE__ */ M(1), Fe = /* @__PURE__ */ j(() => Jo(V(ks), V(As))), Ie = /* @__PURE__ */ j(() => V(Oe).width), Le = /* @__PURE__ */ j(() => V(Oe).height ?? 0), Re = /* @__PURE__ */ j(() => V(Ne) === "manual" ? V(Pe) : Mo(V(je), V(Ie), "fit", V(Me), V(Le)));
	function ze(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(V(Re) * 100) / 10) + e) * 10));
		N(Pe, t / 100), N(Ne, "manual");
	}
	let Be = /* @__PURE__ */ j(() => V(Le) > 0 ? V(Le) : V(Re) > 0 ? V(Me) / V(Re) : V(Me)), Ve = /* @__PURE__ */ j(() => V(Ie) * V(Re)), He = /* @__PURE__ */ j(() => V(Le) > 0 ? V(Le) * V(Re) : V(Me)), Ue = /* @__PURE__ */ j(() => V(Ve) > V(je) + 1 || V(He) > V(Me) + 1);
	vn(() => {
		let e = () => et?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), vn(() => {
		let e = V(ke);
		et?.sendViewport(e);
	}), vn(() => {
		let e = V(Re);
		et?.sendZoom(e);
	}), vn(() => {
		let e = () => {
			N(_e, zo(window) ?? V(_e), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), vn(() => {
		let e = V(Ae);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			N(je, e.clientWidth, !0), N(Me, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Ge = /* @__PURE__ */ M(0);
	function Ke() {
		N(Ge, k?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function qe() {
		let e = k?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		N(De, "mobile"), e && setTimeout(() => et?.sendScrollSection(e.id), 0);
	}
	function Xe(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ft("layout");
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
			}, Qe(t, "layout-changed"), e.sectionId === V(mr) && N(gr, e.minHeight, !0), V(P)?.sectionId === e.sectionId && en(), k.save(), st(), et?.sendSection(V(E), t);
		}
	}
	function Ze(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Qe(e, t) {
		e && Ze(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Ke(), et?.sendAttention(e.id, !0)));
	}
	let k = null, $e = null, et = null, A = /* @__PURE__ */ M(null);
	function tt() {
		N(A, $e.data, !0), $e.replace(V(A));
	}
	function nt() {
		et?.sendSite(We(V(A)));
	}
	let rt = /* @__PURE__ */ new Set(), ot = () => V(A).pages.find((e) => e.id === V(E));
	function st() {
		let e = V(A)?.pages?.some((e) => !rt.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Qc?.hasDraft() || Object.values($c).some((e) => e.hasDraft()), n = pl?.hasDraft() || Object.values(ml).some((e) => e.hasDraft());
		N(se, e || k?.hasDraft() && !rt.has(V(E)) || $e?.hasDraft() || Xl?.hasDraft() || t || n || !1, !0);
	}
	let ct = [], lt = [], ut = null;
	function dt() {
		return JSON.stringify({
			pageId: V(E),
			page: k.data,
			site: $e.data,
			collectionsIndex: tl ? Qc.data : null,
			collections: tl ? Object.fromEntries(Object.entries($c).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: gl ? pl.data : null,
			templates: gl ? Object.fromEntries(Object.entries(ml).map(([e, t]) => [e, t.data])) : {},
			plugins: Xl?.data ?? null
		});
	}
	function ft(e) {
		(e !== ut || !e.startsWith("edit:") && !e.startsWith("grid:")) && (ct.push(dt()), ct.length > 50 && ct.shift(), lt.length = 0, ut = e);
	}
	function pt(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if ($e.replace(r), tt(), $e.save(), N(he, {
			snap: !0,
			...V(A).grid
		}, !0), nt(), mt(i, a ?? {}), ht(o, s ?? {}), gt(c), t && t !== V(E) && V(A).pages.some((e) => e.id === t)) {
			fe(`urd-draft-${t}`, JSON.stringify(n)), Ka(t, { keepHistory: !0 }), st();
			return;
		}
		k.replace(n), k.save(), st(), Ke(), en(), wr(k.data.sections.find((e) => e.id === V(mr))), V(A).pages.some((e) => e.id === V(E)) ? et?.sendPage(V(E), k.data) : Ka(V(A).pages[0].id, { keepHistory: !0 });
	}
	function mt(e, t) {
		if (Qc && e && JSON.stringify({
			index: Qc.data,
			collections: Object.fromEntries(Object.entries($c).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			Qc.replace(e), Qc.save();
			for (let e of Object.keys($c)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete $c[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!$c[e]) {
					let t = el[e] ?? null;
					$c[e] = ea(`urd-draft-collection-${e}`, () => t, de, `urd-draft-samling-${e}`);
				}
				$c[e].replace(n), $c[e].save();
			}
			N(nl, [...e.samlinger ?? []], !0), V(il) && !V(nl).includes(V(il)) && N(il, null), Dl();
		}
	}
	function ht(e, t) {
		if (pl && e && JSON.stringify({
			index: pl.data,
			templates: Object.fromEntries(Object.entries(ml).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			pl.replace(e), pl.save();
			for (let e of Object.keys(ml)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete ml[e]);
			for (let [e, n] of Object.entries(t)) ml[e] || (ml[e] = ea(`urd-draft-template-${e}`, () => hl[e] ?? null, de, `urd-draft-mal-${e}`)), ml[e].replace(n), ml[e].save();
			N(vl, [...e.maler ?? []], !0), st(), bl();
		}
	}
	function gt(e) {
		Xl && e && JSON.stringify(Xl.data) !== JSON.stringify(e) && (Xl.replace(e), Xl.save(), bu(), Fu());
	}
	function _t() {
		ct.length && (lt.push(dt()), pt(ct.pop()), ut = null, D(Z("status.undone")));
	}
	function vt() {
		lt.length && (ct.push(dt()), pt(lt.pop()), ut = null, D(Z("status.redone")));
	}
	function yt(e) {
		V(nn) && (e.target instanceof Element && e.target.closest(".block-menu") || N(nn, null));
	}
	function bt(e) {
		if (e.key === "Escape" && V(nn)) {
			N(nn, null);
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
			].includes(t.type)) || !V(P) || V(ke) === "mobile") return;
			e.preventDefault(), et?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? vt() : _t());
	}
	async function xt() {
		N(oe, Rs(await (await fetch("/content/site.json")).json()), !0), $e = ea("urd-draft-site", () => V(oe), de), ($e.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${$e.data.schemaVersion} (the engine has 4) and is discarded`), $e.replace(We(V(oe)))), $e.replace(Rs($e.data)), $e.save(), tt(), N(he, {
			snap: !0,
			...V(A).grid
		}, !0), await Ka(new URLSearchParams(location.search).get("page") ?? V(A).pages[0].id), await wu(), await El(), await yl(), await fa(), V(me) && ma(), Xt(), V(A).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (N(Ot, V(A).site.title, !0), N(kt, V(A).theme.tokens.color.accent, !0), N(At, V(A).theme.tokens.color.bg, !0), N(Dt, !0));
	}
	let St = /* @__PURE__ */ M(null);
	function Ct({ title: e, lines: t = [], okLabel: n = Z("confirm.ok"), cancelLabel: r = Z("confirm.cancel") }) {
		return new Promise((i) => {
			N(St, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function wt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Z("confirm.ok"), cancelLabel: a = Z("confirm.cancel") }) {
		return new Promise((o) => {
			N(St, {
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
	function Tt(e) {
		V(St)?.resolve(V(St).prompt ? e ? V(St).value : null : e), N(St, null);
	}
	let Et = !1;
	vn(() => {
		if (!V(St)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Tt(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let Dt = /* @__PURE__ */ M(!1), Ot = /* @__PURE__ */ M(""), kt = /* @__PURE__ */ M("#7c5cff"), At = /* @__PURE__ */ M("#0b0e14");
	function jt() {
		localStorage.setItem("urd-setup-done", "1"), N(Dt, !1);
	}
	function Mt() {
		let e = V(Ot).trim();
		e && (fo("setup", () => {
			V(A).site.title = e, V(A).nav.logo = {
				type: "text",
				value: e
			}, V(A).theme.tokens.color.accent = V(kt), V(A).theme.tokens.color.bg = V(At), delete V(A).site.setup;
		}), jt(), D(Z("status.setupDone"), "ok"));
	}
	let Nt = "urd-admin-panels", Pt = "urd-admin-panel-open", Ft = /* @__PURE__ */ M(Qt(localStorage.getItem(Nt) === "reset" ? "reset" : "remember"));
	function It(e) {
		N(Ft, e === "reset" ? "reset" : "remember", !0), V(Ft) === "reset" ? localStorage.setItem(Nt, "reset") : localStorage.removeItem(Nt);
	}
	let Lt = /* @__PURE__ */ M(Qt(V(Ft) === "reset" ? null : localStorage.getItem(Pt))), Rt = [
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
	], zt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Bt = Object.fromEntries(Rt.flat().map((e) => [e, Z(`panel.${e}`)]));
	V(Lt) && !Bt[V(Lt)] && N(Lt, null), vn(() => {
		if (V(Ft) === "reset") {
			localStorage.removeItem(Pt);
			return;
		}
		V(Lt) ? localStorage.setItem(Pt, V(Lt)) : localStorage.removeItem(Pt);
	});
	let Vt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Ht = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Ut = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Wt(e, t) {
		let n = [];
		for (let r of e) for (let e of su[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (Ht.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Gt() {
		let e = Ut([...Ht, ...Wt(V(_u), "admin")]);
		return qt === "auto" || e.some(([e]) => e === qt) ? e : [[qt, qt], ...e];
	}
	let Kt = () => Wt(V(iu)?.enabled ?? [], "site"), qt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Jt(e) {
		e !== qt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Yt(e) {
		N(Lt, V(Lt) === e ? null : e, !0), Xt();
	}
	function Xt() {
		V(Lt) === "history" && ba(), V(Lt) === "update" && !V(Ma) && Ba();
	}
	let P = /* @__PURE__ */ M(null);
	function Zt(e, t) {
		let n = k?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function en() {
		if (!V(P)) return;
		let { block: e } = Zt(V(P).sectionId, V(P).blockId);
		if (!e) {
			N(P, null);
			return;
		}
		N(P, {
			sectionId: V(P).sectionId,
			blockId: V(P).blockId,
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
	function tn(e) {
		if (N(nn, null), !e.blockId) {
			N(P, null);
			return;
		}
		N(P, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && N(mr, e.sectionId, !0), en();
	}
	let nn = /* @__PURE__ */ M(null), rn = window.matchMedia("(prefers-reduced-motion: reduce)").matches, an = [
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
	function on() {
		let e = k?.data.sections ?? [], t = e.findIndex((e) => e.id === V(P)?.sectionId);
		return t < 0 ? [["", Z("opt.sticky.ownSection")]] : [["", Z("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Z("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function sn(e) {
		if (tn(e), !V(P)) return;
		let t = V(pe)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + V(Re) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + V(Re) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + V(Re) * e.rect.top), Math.max(8, r));
		N(nn, {
			left: n,
			top: i
		}, !0);
	}
	function cn(e, t) {
		let { section: n, block: r } = Zt(V(P)?.sectionId, V(P)?.blockId);
		r && (e && ft(e), t(r, n), Qe(n, "block-edited"), k.save(), st(), et?.sendSection(V(E), n), en());
	}
	function z(e, t) {
		cn(`edit:${V(P).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function ln(e, t) {
		cn(`edit:${V(P).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let un = /* @__PURE__ */ M("title");
	function dn(e) {
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
	function fn() {
		return V(P)?.props.fieldStyle?.[V(un)] ?? {};
	}
	function pn(e) {
		let t = zf(e);
		ln("design", {
			design: t.id === "plain" ? void 0 : t.id,
			...t.view ? { view: t.view } : {}
		});
	}
	function mn(e, t) {
		let n = { ...V(P).props.colors ?? {} };
		t ? n[e] = t : delete n[e], z("colors", Object.keys(n).length ? n : void 0);
	}
	function hn(e) {
		let t = {
			...V(P).props.stripe ?? {},
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		z("stripe", Object.keys(t).length ? t : void 0);
	}
	function gn(e) {
		let t = { ...V(P).props.fieldStyle ?? {} }, n = {
			...t[V(un)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[V(un)] = n : delete t[V(un)], z("fieldStyle", Object.keys(t).length ? t : void 0);
	}
	let _n = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function yn(e) {
		cn(`edit:${V(P).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function bn(e) {
		cn(`edit:${V(P).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let xn = Qt({}), Sn = Qt({}), Cn = /* @__PURE__ */ M(!1), wn = /* @__PURE__ */ M("content"), Tn = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function En(e) {
		let t = V(P).blockId, n = `${t}:${e.key}`, r = (xn[n] ?? V(P).props[e.key] ?? "").trim();
		Sn[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			ln(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		N(Cn, !0), Sn[n] = {
			text: Z("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (V(P)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (ln(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Sn[n] = null) : Sn[n] = {
				text: Ki(a) ?? Z("props.place.notFound"),
				err: !0
			};
		} catch {
			Sn[n] = {
				text: Z("props.place.failed"),
				err: !0
			};
		} finally {
			N(Cn, !1);
		}
	}
	function Dn(e, t) {
		Number.isFinite(t) && cn(`edit:frame-${V(P).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function On(e) {
		cn(`edit:${V(P).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let kn = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], An = /* @__PURE__ */ new Set(["select", "radio"]), jn = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function Mn(e, t) {
		cn(`edit:${V(P).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			An.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function Nn(e, t) {
		Mn(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function Pn() {
		cn("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: jn(),
				label: Z("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function Fn(e) {
		cn("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function In(e, t) {
		let n = e + t;
		cn("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	let Ln = (e) => e && typeof e == "object" ? {
		url: e.url ?? "",
		name: e.name ?? "",
		color: e.color ?? ""
	} : {
		url: typeof e == "string" ? e : "",
		name: "",
		color: ""
	}, Rn = ({ url: e, name: t, color: n }) => t || n ? {
		url: e,
		...t ? { name: t } : {},
		...n ? { color: n } : {}
	} : e;
	function zn(e, t) {
		cn(`edit:${V(P).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = Rn({
				...Ln(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function Bn() {
		z("sources", [...V(P).props.sources ?? [], ""]);
	}
	function Vn(e) {
		z("sources", (V(P).props.sources ?? []).filter((t, n) => n !== e));
	}
	let Hn = /* @__PURE__ */ M(null);
	async function Un() {
		let e = /* @__PURE__ */ new Set(), t = (t) => {
			for (let n of t?.sections ?? []) for (let t of n.blocks ?? []) if (t.type === "calendar") for (let n of t.props?.sources ?? []) {
				let { url: t } = Ln(n);
				t.trim() && e.add(t.trim());
			}
		};
		t(k?.data), await Promise.all((V(A).pages ?? []).filter((e) => e.id !== V(E)).map(async (e) => {
			try {
				let n = localStorage.getItem(`urd-draft-${e.id}`);
				t(n ? JSON.parse(n) : await (await fetch(`/${e.file}`)).json());
			} catch {}
		})), N(Hn, [...e], !0);
	}
	function Wn(e) {
		let t = V(P).props.sources ?? [];
		t.some((t) => Ln(t).url === e) || z("sources", [...t, e]);
	}
	function Gn(e, t) {
		cn(`edit:${V(P).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Kn() {
		cn("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Z("seed.faq.newQ"),
				a: Z("seed.faq.answer")
			});
		});
	}
	function qn(e) {
		cn("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Jn(e, t) {
		let n = e + t;
		cn("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Yn(e, t) {
		cn(`edit:${V(P).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function Xn() {
		cn("ribbon-item", (e) => {
			(e.props.items ??= []).push(Z("seed.ribbonBlock.new"));
		});
	}
	function Zn(e) {
		cn("ribbon-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Qn(e, t) {
		let n = e + t;
		cn("ribbon-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function $n(e, t) {
		cn(`edit:${V(P).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function er() {
		cn("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Z("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function tr(e) {
		cn("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function nr(e, t) {
		let n = e + t;
		cn("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function rr(e) {
		cn("decor", (t) => {
			t.decor = e;
		});
	}
	function ir(e, t) {
		cn(`edit:${V(P).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function ar(e, t) {
		cn(`edit:${V(P).blockId}:share`, (n) => {
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
	function or(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			z("src", String(n.result ?? "")), t.size > 4e5 && D(Z("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => D(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function sr(e) {
		let { section: t, block: n } = Zt(V(P)?.sectionId, V(P)?.blockId);
		n && (ft("hide-mobile"), n.hideMobile = e, k.save(), st(), et?.sendSection(V(E), t), en());
	}
	async function cr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await oi(t);
			cn(`edit:${V(P).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ra(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			D(ci(e), "error");
		}
	}
	async function lr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await oi(t);
			cn(`edit:${V(P).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			D(ci(e), "error");
		}
	}
	let dr = {
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
	}, fr = [
		["line", Z("shape.line")],
		["arrow", Z("shape.arrow")],
		["circle", Z("shape.circle")],
		["rect", Z("shape.rect")],
		["triangle", Z("shape.triangle")]
	], pr = [
		["accent", Z("color.accent")],
		["text", Z("color.text")],
		["surface", Z("color.surface")],
		["bg", Z("color.bg")]
	], mr = /* @__PURE__ */ M(null), hr = /* @__PURE__ */ M(null), gr = /* @__PURE__ */ M(""), _r = /* @__PURE__ */ M(Qt([])), vr = /* @__PURE__ */ M(null), br = /* @__PURE__ */ M(null), Sr = /* @__PURE__ */ M(""), Cr = /* @__PURE__ */ M(Qt({}));
	function wr(e) {
		N(hr, e?.grid ? { ...e.grid } : null, !0), N(gr, e?.size?.minHeight ?? "", !0), N(_r, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), N(vr, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), N(br, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), N(Sr, e?.theme ?? "", !0), N(Cr, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let Tr = /* @__PURE__ */ M(null), Er = Qt({});
	function Dr() {
		try {
			let e = ((V(pe)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${V(mr)}"]`))?.getBoundingClientRect();
			N(Tr, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			N(Tr, null);
		}
	}
	vn(() => {
		V(mr), V(_r), requestAnimationFrame(() => requestAnimationFrame(Dr));
	}), vn(() => {
		let e = V(pe);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Dr());
		return t.observe(e), () => t.disconnect();
	}), vn(() => {
		for (let e of V(_r)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Er[t]) {
				let e = new Image();
				e.onload = () => {
					Er[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Or(e) {
		Mr("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function kr(e) {
		let t = V(Pi), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? ae(jf(t.accent ?? "#000000", t))), r = uu(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function U(e) {
		N(mr, e.sectionId, !0), wr(k?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Mr(e, t) {
		let n = k.data.sections.find((e) => e.id === V(mr));
		n && (ft(e), t(n), k.save(), st(), et?.sendSection(V(E), n), wr(n));
	}
	let Nr = /* @__PURE__ */ M("color");
	function Pr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: ee[t].version ?? 1,
				props: ee[t].defaults()
			});
		});
	}
	function Fr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function Ir(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Lr(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function Rr(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function zr(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				Rr(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				Rr(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let Br = (e) => Math.min(4, Math.max(.1, e));
	function Vr(e, t, n, r) {
		Rr(e, t, "size", Br(Math.round((n + r) * 100) / 100));
	}
	function Ur(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && Rr(e, t, "size", Br(r / 100));
	}
	function Wr(e, t, n, r) {
		let i = Er[n.props.src];
		if (!i?.w || !i?.h || !V(Tr)?.w || !V(Tr)?.h) return;
		let a = V(Tr).h * i.w / (V(Tr).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && Rr(e, t, "fit", "plain"), Rr(e, t, "size", Br(Math.round(o * 100) / 100));
	}
	function Gr(e) {
		return e.props;
	}
	function qr(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function Jr(e, t, n, r) {
		qr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Yr = {
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
	function Xr(e, t, n) {
		qr(e, t, e.keyPrefix, (e) => {
			e.kind = n, Yr[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function Zr(e, t, n, r) {
		qr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Qr(e, t) {
		qr(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function $r(e, t, n) {
		qr(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function ei(e, t, n, r) {
		qr(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let ti = /* @__PURE__ */ M(null);
	function ni(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		N(ti, {
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
			N(ti, {
				...V(ti),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = V(ti);
			if (N(ti, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && ei(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function ri(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: ee[n].version ?? 1,
				props: ee[n].defaults()
			});
		});
	}
	async function ii(e, t) {
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
	async function ai(e) {
		let t = await e.text(), n = Pa(t), r = Ia(t);
		if (!r) return n;
		let i = await ii(n.dataUrl, r);
		if (!i) return n;
		let a = Fa(t, i);
		if (a === t) return n;
		try {
			return Pa(a);
		} catch {
			return n;
		}
	}
	async function oi(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return ai(e);
		let t = await ja(e);
		return t.animated && t.bytes > 1e6 && D(Z("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function ci(e) {
		return e?.code === "animatedTooLarge" ? Z("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(Ca / 1e6)
		}) : Z("status.imageReadError");
	}
	function li(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			D(Z(t), "error");
			return;
		}
		if (e.size > 15e6) {
			D(Z("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(Sa / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && D(Z("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => D(Z("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function ui(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && li(t, "status.videoFileFormat", (e) => z("src", e));
	}
	async function di(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			z("poster", (await oi(t)).dataUrl);
		} catch (e) {
			D(ci(e), "error");
		}
	}
	async function fi(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Rr(e, t, "src", (await oi(r)).dataUrl);
		} catch (e) {
			D(ci(e), "error");
		}
	}
	function pi(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && li(r, "status.videoFormat", (n) => Rr(e, t, "src", n));
	}
	async function hi(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Rr(e, t, "poster", (await oi(r)).dataUrl);
		} catch (e) {
			D(ci(e), "error");
		}
	}
	let _i = Qt({}), vi = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`, yi = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	async function bi(e, t, n) {
		let r = vi(e, t);
		_i[r] = {
			text: Z("status.folderChecking"),
			err: !1
		};
		let i = await rf(n.props.folder, n.props.order, { force: !0 });
		_i[r] = i.photos.length ? {
			text: Gi("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: Ki(i) ?? Z("status.folderNone"),
			err: !0
		};
	}
	async function Si(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		D(Z("status.compressingImages"));
		let { images: i, failed: a, big: o } = await gv(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), _v(i.length, a, o);
	}
	function Ci(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function wi(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Ei(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Di(e, t) {
		fo(e, () => {
			V(A).nav.style ??= {}, t(V(A).nav.style);
		});
	}
	let Oi = /* @__PURE__ */ j(() => ({
		mutate: Mr,
		keyPrefix: "bg",
		keyId: V(mr)
	})), Ai = {
		mutate: Di,
		keyPrefix: "navbg",
		keyId: "nav"
	}, ji = {
		mutate: Hu,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Mi = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return nu(V(A)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, Ni = /* @__PURE__ */ M("light");
	vn(() => {
		N(Ni, Mi(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || N(Ni, Mi(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let Pi = /* @__PURE__ */ j(() => V(A)?.theme ? ru(V(A).theme, V(Ni)).color ?? {} : {}), Fi = () => Object.entries(V(Pi)), Ii = [
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
	], Li = /* @__PURE__ */ j(() => !!V(A)?.theme.alt), Ri = /* @__PURE__ */ j(() => V(A)?.theme.alt?.auto === !0), zi = /* @__PURE__ */ j(() => V(A)?.theme.scheme === "dark" ? "dark" : "light"), Bi = /* @__PURE__ */ j(() => V(A)?.theme.tokens.color ?? {}), Vi = /* @__PURE__ */ j(() => ({
		...V(A)?.theme.tokens.color ?? {},
		...V(A)?.theme.alt?.tokens?.color ?? {}
	}));
	function Hi(e) {
		return {
			type: e,
			version: Mf[e].version,
			props: Mf[e].defaults()
		};
	}
	let Ui = (e) => !!(e && Mf[e.type]?.entrance), Wi = [["", Z("common.none")], ...Object.entries(Mf).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])], Ji = Wi.filter(([e]) => !Mf[e]?.group), Yi = [["", Z("common.none")], ...Object.entries(Mf).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])];
	function Xi(e) {
		e.animation && !Ui(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Zi(e) {
		cn(`edit:anim-${V(P).blockId}`, (t) => {
			Xi(t), t.animation = e ? Hi(e) : null;
		}), V(P) && et?.sendDemoAnim(V(P).sectionId, V(P).blockId);
	}
	function Qi(e) {
		cn(`edit:hover-${V(P).blockId}`, (t) => {
			Xi(t), t.hover = e ? Hi(e) : null;
		});
	}
	function ta(e, t) {
		Number.isFinite(t) && (cn(`edit:anim-${V(P).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), V(P) && et?.sendDemoAnim(V(P).sectionId, V(P).blockId));
	}
	function na(e) {
		Mr("section-anim", (t) => {
			Xi(t), t.animation = e ? Hi(e) : null;
		}), et?.sendDemoAnim(V(mr));
	}
	function ra(e, t, n) {
		Mr(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function ia(e) {
		Mr("section-hover", (t) => {
			Xi(t), t.hover = e ? Hi(e) : null;
		});
	}
	function aa(e, t) {
		Number.isFinite(t) && (Mr("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), et?.sendDemoAnim(V(mr)));
	}
	function oa(e, t) {
		Mr("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), et?.sendDemoAnim(V(mr));
	}
	function sa(e) {
		let t = k.data.sections.find((e) => e.id === V(mr));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		ft("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, N(gr, r, !0), k.save(), st(), et?.sendSection(V(E), t);
	}
	function ca() {
		return k.data.sections.find((e) => e.id === V(mr)) ?? k.data.sections[0];
	}
	function la(e) {
		let t = k.data.sections.find((e) => e.id === V(mr));
		t && (ft("grid:section"), t.grid = e ? { ...$e.data.grid } : null, N(hr, t.grid ? { ...t.grid } : null, !0), k.save(), st(), et?.sendSection(V(E), t), V(co) && et?.sendShowGrid(!0));
	}
	function ua(e, t) {
		let n = k.data.sections.find((e) => e.id === V(mr));
		n?.grid && (ft("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, N(hr, { ...n.grid }, !0), k.save(), st(), et?.sendSection(V(E), n), V(co) && et?.sendShowGrid(!0));
	}
	function da(e, t) {
		ft("grid:site"), N(he, {
			...V(he),
			[e]: t
		}, !0), $e.data.grid = {
			...$e.data.grid,
			[e]: t
		}, $e.save(), st(), nt(), V(co) && et?.sendShowGrid(!0);
	}
	async function fa() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? N(me, await e.json(), !0) : e.status !== 503 && N(me, null);
		} catch {
			N(me, null);
		}
	}
	let pa = null;
	async function ma() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (pa = (await e.json()).head ?? null);
		} catch {}
	}
	async function ha(e) {
		if (!pa) return await ma(), {
			ok: await Ct({
				title: Z("confirm.conflictUnknown.title"),
				lines: [Z("confirm.conflictUnknown.body"), Z("confirm.conflictUnknown.warning")],
				okLabel: Z("confirm.publishAnyway"),
				cancelLabel: Z("confirm.cancel")
			}),
			head: pa
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${pa}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === pa) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Z("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Ct({
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
	let ga = /* @__PURE__ */ M(null), _a = /* @__PURE__ */ M(""), ya = /* @__PURE__ */ M(!1);
	async function ba() {
		N(_a, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? N(ga, (await e.json()).commits, !0) : e.status === 401 ? (N(ga, [], !0), N(_a, Z("status.historyLoginRequired"), !0)) : (N(ga, [], !0), N(_a, Ki(await e.json().catch(() => null)) ?? Z("status.historyFetchFailed"), !0));
		} catch {
			N(ga, [], !0), N(_a, Z("status.historyUnavailable"), !0);
		}
	}
	let xa = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(qi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), wa = !1;
	async function Ta() {
		let e = V(ga)?.[0];
		if (e && !V(ya) && await Ct({
			title: Z("confirm.revert.title"),
			lines: [`«${e.message}»`, Z("confirm.revert.body")],
			okLabel: Z("confirm.revert.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			N(ya, !0), D(Z("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? pa = e : ma(), wa = !0, D(Z("status.revertDone"), "ok"), Ea();
				} else t.status === 409 ? D(Z("status.revertConflict"), "error") : D(Ki(await t.json().catch(() => null)) ?? Z("status.revertFailed"), "error");
			} catch {
				D(Z("status.publishLayerUnreachable"), "error");
			}
			N(ya, !1), ba();
		}
	}
	async function Ea() {
		let e = ["/content/site.json", ...V(A).pages.map((e) => `/${e.file}`)], t = async () => {
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
				D(Z("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		D(Z("status.revertDeployTimeout"), "error");
	}
	let Da = 0;
	async function Oa(e) {
		let t = ++Da, n = ue, r = await Po(No(e));
		t === Da && n === ue && (r ? D(Z("status.publishLive"), "ok") : D(Z("status.publishDeployTimeout"), "error"));
	}
	let ka = /* @__PURE__ */ M(null), Aa = /* @__PURE__ */ M(null), Ma = /* @__PURE__ */ M(!1), Na = /* @__PURE__ */ M(Qt(/* @__PURE__ */ new Set()));
	async function Ba() {
		N(Ma, !0), N(Aa, null), N(ka, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (N(ka, t, !0), N(Na, /* @__PURE__ */ new Set(), !0)) : N(Aa, Ki(t) ?? Z("update.checkFailed"), !0);
		} catch {
			N(Aa, Z("status.publishLayerUnreachable"), !0);
		}
		N(Ma, !1);
	}
	function Va(e) {
		let t = new Set(V(Na));
		t.has(e) ? t.delete(e) : t.add(e), N(Na, t, !0);
	}
	async function Ha() {
		if (!V(ka) || V(ka).upToDate || V(Ma)) return;
		let e = [...V(Na)], t = V(ka).changes.filter((e) => !V(Na).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Ct({
			title: Z("confirm.update.title"),
			lines: [Z("confirm.update.body", {
				target: V(ka).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Z("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Z("confirm.update.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			N(Ma, !0), D(Z("update.running", { target: V(ka).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: V(ka).target,
						expect: V(ka).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (D(Z("update.committed", { target: V(ka).target }), "ok"), await Ua(V(ka).target.replace(/^v/, ""))) : t.status === 409 ? (D(Ki(n) ?? Z("update.checkFailed"), "error"), await Ba()) : D(Ki(n) ?? Z("update.failed"), "error");
			} catch {
				D(Z("status.publishLayerUnreachable"), "error");
			}
			N(Ma, !1);
		}
	}
	async function Ua(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					D(Z("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		D(Z("update.deployTimeout"), "error");
	}
	let Wa = null;
	function Ga(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Gs("sec"),
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
	async function Ka(e, { keepHistory: t = !1 } = {}) {
		N(E, e, !0), Wa = (async () => {
			let n = ot(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = zs(await e.json(), $e.data));
			} catch {}
			r ? rt.delete(e) : r = Ga(n), k = ea(`urd-draft-${e}`, () => r, de), (k.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${k.data.schemaVersion} (the engine has 4) and is discarded`), k.replace(structuredClone(r))), k.replace(zs(k.data, $e.data)), k.save(), t || (ut = null), N(mr, null), N(hr, null), st(), To(), Ke(), N(ce, "");
		})(), await Wa;
	}
	function qa() {
		et?.destroy(), V(pe)?.contentDocument?.addEventListener("pointerdown", () => {
			V(nn) && N(nn, null);
		}, !0), et = Ao(V(pe), {
			onEdit: U_,
			onMove: W_,
			onGrow: G_,
			onDelete: tv,
			onAddSection: X_,
			onMoveSection: Z_,
			onDeleteSection: Q_,
			onSectionSize: $_,
			onUndo: (e) => e.redo ? vt() : _t(),
			onSelectSection: U,
			onSelectBlock: tn,
			onBlockMenu: sn,
			onReady: Ja,
			onNavigate: uo,
			onAddBlock: (e) => av(e.sectionId, e.block),
			onAddBlocks: (e) => ov(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: mv,
			onMoveBlockSection: ev,
			onMobileReset: K_,
			onMobileOrder: q_,
			onReviewDone: J_,
			onBlockFlag: Y_,
			onCollectionEdit: Ml,
			onCollectionAdd: Al,
			onSaveTemplate: xl,
			onStickyGroup: Cl,
			onStickyDock: Sl,
			onDeleteTemplate: Tl,
			onApplyLayout: Xe,
			onPluginBlocks: (e) => {
				N(cv, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => fo("edit:nav-width", () => {
				V(A).nav.style ??= {}, V(A).nav.style.width = e.width;
			})
		});
	}
	async function Ja() {
		await Wa, await eu, et?.sendPlugins(We(V(iu))?.enabled ?? []), et?.sendViewport(V(ke)), et?.sendZoom(V(Re)), Ol(), bl(), $e.hasDraft() && nt();
		let e = !V(oe).pages.some((e) => e.id === V(E));
		(k.hasDraft() || e) && et?.sendPage(V(E), k.data), V(ge) || et?.sendChrome(!1), V(co) && et?.sendShowGrid(!0), V(Ya) && et?.sendShowGuides(!0), ie();
	}
	let Ya = /* @__PURE__ */ M(localStorage.getItem("urd-guides") === "1"), Xa = /* @__PURE__ */ M(!1), Za = /* @__PURE__ */ M(Qt(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function to(e) {
		N(Za, e === "menu" ? "menu" : "strip", !0), V(Za) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let no = /* @__PURE__ */ M(null);
	vn(() => {
		if (!V(Xa)) return;
		let e = (e) => {
			V(no)?.contains(e.target) || N(Xa, !1);
		}, t = (e) => {
			e.key === "Escape" && N(Xa, !1);
		}, n = () => {
			N(Xa, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let ro = {
		view: 1079,
		device: 999,
		zoom: 919
	}, io = /* @__PURE__ */ M(null), ao = /* @__PURE__ */ M(null), oo = Qt({
		view: !1,
		device: !1,
		zoom: !1
	});
	vn(() => {
		let e = Object.entries(ro).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				oo[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), vn(() => {
		V(io) && !oo[V(io)] && N(io, null);
	}), vn(() => {
		if (!V(io)) return;
		let e = (e) => {
			V(ao)?.contains(e.target) || N(io, null);
		}, t = (e) => {
			e.key === "Escape" && N(io, null);
		}, n = () => {
			N(io, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function so() {
		N(Ya, !V(Ya)), localStorage.setItem("urd-guides", V(Ya) ? "1" : "0"), et?.sendShowGuides(V(Ya));
	}
	let co = /* @__PURE__ */ M(localStorage.getItem("urd-grid-overlay") === "1");
	function lo() {
		N(co, !V(co)), localStorage.setItem("urd-grid-overlay", V(co) ? "1" : "0"), et?.sendShowGrid(V(co));
	}
	function uo(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = V(A).pages.find((e) => e.path === t);
		n && n.id !== V(E) && Ka(n.id);
	}
	function fo(e, t) {
		ft(e), t(), $e.save(), st(), nt();
	}
	let po = /* @__PURE__ */ M(""), ho = /* @__PURE__ */ M(null), go = Object.fromEntries(Zl.map((e) => [e.id, Yl(Ql(e.id, {
		pageId: "preview",
		title: ""
	}))])), _o = /* @__PURE__ */ j(() => {
		let e = V(A)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && au(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), vo = /* @__PURE__ */ M(null);
	vn(() => {
		if (!V(vo)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || N(vo, null);
		}, t = (e) => {
			e.key === "Escape" && N(vo, null);
		}, n = () => {
			N(vo, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let yo = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function bo(e, t = null) {
		return e ? yo.includes(e) ? Z("error.reservedName", { slug: e }) : V(A).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Z("error.pageExists") : null : Z("error.pageNeedsName");
	}
	function xo() {
		let e = V(po).trim(), t = Ra(e), n = bo(t);
		if (n) return D(n, "error"), !1;
		let r = V(ho) && !V(ho).startsWith("preset:") ? ml[V(ho)]?.data?.page : null, i = V(ho)?.startsWith("preset:") ? Ql(V(ho).slice(7), {
			pageId: t,
			title: e
		}) ?? Ga({
			id: t,
			title: e
		}) : r ? xc(zs(JSON.parse(JSON.stringify(r)), $e.data), Gs, {
			id: t,
			title: e
		}) : Ga({
			id: t,
			title: e
		});
		fo("pages", () => {
			V(A).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), V(A).nav.items.push({
				label: e,
				page: t
			});
		}), fe(`urd-draft-${t}`, JSON.stringify(i)), st(), N(po, ""), N(ho, null), Ka(t);
	}
	async function So(e) {
		N(vo, null), await wl("page", e.id === V(E) ? JSON.parse(JSON.stringify(k.data)) : await Ro(e));
	}
	function Co(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		fo("pages", () => {
			e.title = n;
			for (let t of V(A).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === V(E) ? (k.data.meta.title = n, k.save(), st(), et?.sendPage(V(E), k.data)) : cs(e, (e) => {
			e.meta.title = n;
		});
	}
	let wo = /* @__PURE__ */ M(Qt({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function To() {
		let e = k?.data?.meta ?? {};
		N(wo, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function Eo(e, t) {
		let n = String(t ?? "").trim();
		if (e === "description") n ? k.data.meta.description = n : delete k.data.meta.description;
		else {
			let t = {
				ogTitle: "title",
				ogDescription: "description",
				ogImage: "image"
			}[e], r = { ...k.data.meta.og ?? {} };
			n ? r[t] = n : delete r[t], Object.keys(r).length ? k.data.meta.og = r : delete k.data.meta.og;
		}
		k.save(), st(), To();
		let r = V(A).pages.find((e) => e.id === V(E));
		V(Oo)[V(E)] = !r?.noindex && !k.data.meta.description;
	}
	function Do(e) {
		let t = V(A).pages.find((e) => e.id === V(E));
		t && (fo("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), V(Oo)[V(E)] = !e && !k?.data?.meta?.description);
	}
	let Oo = /* @__PURE__ */ M(Qt({}));
	async function jo() {
		let e = {};
		for (let t of V(A).pages) {
			if (t.noindex) continue;
			if (t.id === V(E)) {
				e[t.id] = !k?.data?.meta?.description;
				continue;
			}
			let n = await Ro(t);
			e[t.id] = !n?.meta?.description;
		}
		N(Oo, e, !0);
	}
	vn(() => {
		V(Lt) === "pages" && V(E) && jo();
	});
	async function Lo(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Eo("ogImage", (await oi(t)).dataUrl);
		} catch (e) {
			D(ci(e), "error");
		}
	}
	async function Ro(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return zs(await t.json(), $e.data);
		} catch {}
		return Ga(e);
	}
	async function cs(e, t) {
		let n = await Ro(e);
		t(n), fe(`urd-draft-${e.id}`, JSON.stringify(n)), st();
	}
	function us(e, t) {
		let n = Ra(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = bo(n, e.id);
		if (r) {
			D(r, "error");
			return;
		}
		fo("pages", () => {
			e.path = `/${n}`;
		});
	}
	function ds(e) {
		e.path !== "/" && (fo("pages", () => {
			V(A).pages = V(A).pages.filter((t) => t.id !== e.id), V(A).nav.items = V(A).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of V(A).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			V(A).nav.items = V(A).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === V(E) && Ka(V(A).pages[0].id), D(Z("status.pageRemoved")));
	}
	function gs(e) {
		fo("edit:nav-logo", () => {
			V(A).nav.logo = {
				type: "text",
				value: "",
				...V(A).nav.logo,
				...e
			};
		});
	}
	function _s(e) {
		fo("nav", () => {
			V(A).nav.logo ??= {
				type: "text",
				value: V(A).site.title
			};
			let t = V(A).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = V(A).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = V(A).site.title), delete t.image), t.type = e;
		});
	}
	async function vs(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await oi(t);
			fo("nav", () => {
				let t = V(A).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			D(Z("status.imageReadErrorSvg"), "error");
		}
	}
	let ys = /* @__PURE__ */ M(null);
	async function bs(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await ai(t);
				N(ys, e.dataUrl, !0);
			} catch {
				D(Z("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			N(ys, String(n.result), !0);
		}, n.onerror = () => D(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function xs(e) {
		fo("edit:site-icon", () => {
			V(A).site.icon = e;
		}), N(ys, null);
	}
	function Ss() {
		fo("edit:site-icon", () => {
			delete V(A).site.icon;
		});
	}
	function Cs(e) {
		fo("edit:site-title", () => {
			V(A).site.title = e;
		});
	}
	function Ts(e) {
		fo("edit:site-desc", () => {
			V(A).site.description = e;
		});
	}
	function Os(e) {
		let t = String(e ?? "").trim();
		fo("edit:site-analytics", () => {
			t ? V(A).analytics = { token: t } : delete V(A).analytics;
		});
	}
	let ks = /* @__PURE__ */ j(() => V(A)?.layout?.contentWidth ?? 1440), As = /* @__PURE__ */ j(() => V(A)?.layout?.gutter ?? 6), js = /* @__PURE__ */ j(() => Xo(V(ks))), Ms = /* @__PURE__ */ j(() => Uo.find((e) => e.gutter === V(As))?.id ?? null), Ns = /* @__PURE__ */ M(!1), Ps = /* @__PURE__ */ j(() => V(ks) === "full" ? Ho : Ko(V(ks))), Fs = /* @__PURE__ */ j(() => Go.map((e) => ({
		screen: e,
		...Yo(V(ks), V(As), e)
	})));
	function Is(e, t) {
		fo(t, () => {
			let t = {
				...V(A).layout ?? {},
				contentWidth: V(ks),
				gutter: V(As),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			V(A).layout = t;
		});
	}
	let Ls = (e) => Is({ contentWidth: e === "full" ? "full" : Ko(e) }, "edit:site-width"), Bs = (e) => Is({ gutter: qo(e) }, "edit:site-gutter");
	function Vs() {
		let e = V(A).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Us() {
		let e = Vs(), t = Ut([...Ht, ...Kt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Ks(e) {
		fo("site", () => {
			V(A).site.lang = e;
		});
	}
	let $ = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	vn(() => {
		if (!V(A)?.site) return;
		let e = V(A).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			$.test(e) && (t.href = e);
		}
	});
	function qs(e) {
		fo("nav", () => {
			V(A).nav.layout = e;
		});
	}
	let Js = (e) => e !== "theme" || !!V(A).theme?.alt?.tokens, Ys = /* @__PURE__ */ j(() => Yu(V(A)?.nav?.style ?? {}).filter(Js));
	function Xs(e, t) {
		let n = Yu(V(A).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		for (; i >= 0 && i < n.length && !Js(n[i]);) i += t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], Zs("order", n));
	}
	function Zs(e, t) {
		fo(`edit:nav-tools-${e}`, () => {
			V(A).nav.style ??= {};
			let n = { ...V(A).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(A).nav.style.tools = n : delete V(A).nav.style.tools;
		});
	}
	function Qs(e, t) {
		fo(`edit:nav-style-${e}`, () => {
			V(A).nav.style ??= {}, t === void 0 ? delete V(A).nav.style[e] : V(A).nav.style[e] = t;
		});
	}
	let $s = /* @__PURE__ */ j(() => V(A)?.nav?.variant === "side-left" || V(A)?.nav?.variant === "side-right"), ec = /* @__PURE__ */ j(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(V(A)?.nav?.variant)), tc = /* @__PURE__ */ j(() => hs(V(A)?.nav?.style)), nc = /* @__PURE__ */ j(() => ps(V(A)?.nav?.style, V(A)?.nav?.variant)), rc = /* @__PURE__ */ j(() => ms(V(A)?.nav?.style));
	function ic(e) {
		fo("nav", () => {
			V(A).nav.style ??= {}, e === "md" ? delete V(A).nav.style.size : V(A).nav.style.size = e, delete V(A).nav.style.padY, delete V(A).nav.style.textSize;
		});
	}
	function ac(e, t, n) {
		let r = e.target.value;
		Qs(t, r === "" ? void 0 : fs(r, n, void 0)), e.target.value = V(A).nav.style?.[t] ?? "";
	}
	function oc(e, t) {
		fo(`edit:nav-mobile-${e}`, () => {
			V(A).nav.style ??= {};
			let n = { ...V(A).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(A).nav.style.mobile = n : delete V(A).nav.style.mobile;
		});
	}
	let sc = (e) => {
		let t = V(A)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, cc = (e, t) => oc(e, t === "" ? void 0 : t === "on"), lc = (e) => oc("border", e ? {
		...V(A).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function uc(e, t) {
		fo(`edit:nav-announce-${e}`, () => {
			let n = { ...V(A).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(A).nav.announcement = n : delete V(A).nav.announcement;
		});
	}
	let dc = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", fc = /* @__PURE__ */ M(null);
	function pc() {
		let e = V(A).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function mc(e, t) {
		fo("nav", () => {
			V(A).nav.launcher ??= { links: [] };
			let n = e === null ? V(A).nav.launcher : V(A).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function hc(e, t) {
		fo(`edit:nav-launcher-${e}`, () => {
			V(A).nav.launcher ??= { links: [] }, t === void 0 ? delete V(A).nav.launcher[e] : V(A).nav.launcher[e] = t;
		});
	}
	function gc() {
		fo("nav", () => {
			V(A).nav.launcher ??= { links: [] }, V(A).nav.launcher.links ??= [], V(A).nav.launcher.links.push({
				label: Z("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function _c(e) {
		fo("nav", () => {
			V(A).nav.launcher.links.splice(e, 1);
		});
	}
	function vc(e, t) {
		fo("nav", () => {
			let n = V(A).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function Sc(e, t, n) {
		fo(`edit:nav-launcher-${t}-${e}`, () => {
			V(A).nav.launcher.links[e][t] = n;
		});
	}
	async function Cc(e, t) {
		if (e) try {
			let n = await oi(e);
			fo("nav", () => {
				V(A).nav.launcher ??= { links: [] }, t === null ? V(A).nav.launcher.image = n.dataUrl : V(A).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			D(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function wc(e, t) {
		fo(`edit:nav-sheet-${e}`, () => {
			V(A).nav.style ??= {};
			let n = { ...V(A).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(A).nav.style.sheet = n : delete V(A).nav.style.sheet;
		});
	}
	function Ec(e, t, n) {
		let r = e.target.value;
		Qs(t, r === "" ? void 0 : fs(r, n, void 0)), e.target.value = V(t === "padY" ? nc : rc);
	}
	function Dc(e, t, n) {
		let r = e.target.value;
		oc(t, r === "" ? void 0 : fs(r, n, void 0)), e.target.value = V(A).nav.style?.mobile?.[t] ?? "";
	}
	function kc(e) {
		let t = fs(e / 100, ns, .5);
		Qs("shrinkTo", t === .5 ? void 0 : t);
	}
	function Pc(e) {
		let t = fs(e, rs, 80);
		Qs("shrinkAt", t === 80 ? void 0 : t);
	}
	function zc(e) {
		let t = fs(e, is, 220);
		Qs("shrinkMs", t === 220 ? void 0 : t);
	}
	let Bc = {
		underline: [Z("hoverColor.underline.label"), Z("hoverColor.underline.title")],
		pill: [Z("hoverColor.pill.label"), Z("hoverColor.pill.title")],
		lift: [Z("hoverColor.lift.label"), Z("hoverColor.lift.title")]
	}, Vc = /* @__PURE__ */ j(() => Bc[V(A)?.nav?.style?.hover] ?? null), Hc = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), Uc = [
		"plain",
		"cards",
		"band"
	], Wc = ["cards", "list"], Gc = (e) => (e.version ?? 1) < cf.version ? cf.migrations[1](e.props ?? {}) : e.props ?? {}, Kc = /* @__PURE__ */ j(() => [
		["grid", Z("opt.launcherView.grid")],
		["list", Z("opt.launcherView.list")],
		["cover", Z("opt.launcherView.cover")]
	]), qc = /* @__PURE__ */ j(() => V($s) ? [
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
	function Jc(e) {
		(V(A).nav.variant ?? "bar") !== e && fo("nav", () => {
			e === "bar" ? delete V(A).nav.variant : V(A).nav.variant = e, V(A).nav.style && delete V(A).nav.style.radius;
		});
	}
	function Yc(e) {
		fo("nav", () => {
			V(A).nav.style ??= {}, e ? V(A).nav.style.glow = !0 : delete V(A).nav.style.glow;
		});
	}
	function Xc(e) {
		fo("nav", () => {
			V(A).nav.style ??= {}, e ? delete V(A).nav.style.topGap : V(A).nav.style.topGap = !1;
		});
	}
	function Zc(e) {
		fo("nav", () => {
			V(A).nav.style ??= {}, e === "standard" ? delete V(A).nav.style.hover : V(A).nav.style.hover = e;
		});
	}
	let Qc = null, $c = {}, el = {}, tl = !1, nl = /* @__PURE__ */ M(Qt([])), rl = /* @__PURE__ */ M(Qt({})), il = /* @__PURE__ */ M(null), al = /* @__PURE__ */ M(""), cl = /* @__PURE__ */ M("news"), ll = [
		["news", Z("collectionKind.news")],
		["notices", Z("collectionKind.notices")],
		["publications", Z("collectionKind.publications")],
		["products", Z("collectionKind.products")],
		["custom", Z("collectionKind.custom")]
	], pl = null, ml = {}, hl = {}, gl = !1, vl = /* @__PURE__ */ M(Qt([]));
	async function yl() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		pl = ea("urd-draft-templates", () => e, de, "urd-draft-maler"), N(vl, [...pl.data.maler ?? []], !0);
		for (let e of V(vl)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			hl[e] = t, ml[e] = ea(`urd-draft-template-${e}`, () => t, de, `urd-draft-mal-${e}`), (ml[e].data?.schemaVersion ?? 1) > 1 && ml[e].reset();
		}
		gl = !0, bl();
	}
	function bl() {
		let e = V(vl).map((e) => ml[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(ml[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		et?.sendTemplates(e);
	}
	function xl(e) {
		let t = yc.includes(e.kind) ? e.kind : "section";
		return wl(t, e[t]);
	}
	function Sl(e) {
		let { section: t, block: n } = Zt(e.sectionId, e.blockId);
		t && n?.sticky && an.some(([t]) => t === e.dock) && (ft(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, k.save(), st(), et?.sendSection(V(E), t), en());
	}
	function Cl(e) {
		let t = e.blockIds ?? [], { section: n } = Zt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		ft(`sticky-group:${e.sectionId}`);
		let r = e.on ? Gs("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Qe(n, "block-edited"), k.save(), st(), et?.sendSection(V(E), n), en(), D(Z(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function wl(e, t) {
		if (!t || !pl) return;
		let n = (await wt({
			title: Z("canvas.templateNamePrompt"),
			placeholder: Z("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = bc(n);
		if (!r) {
			D(Z("status.invalidName"), "error");
			return;
		}
		if (V(vl).includes(r)) {
			D(Z("status.templateExists"), "error");
			return;
		}
		ft("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		ml[r] = ea(`urd-draft-template-${r}`, () => null, de, `urd-draft-mal-${r}`), ml[r].replace(i), ml[r].save(), pl.data.maler = [...V(vl), r], pl.save(), N(vl, [...V(vl), r], !0), D(Z("status.templateSaved", { name: n }), "ok"), st(), bl();
	}
	async function Tl(e) {
		let t = ml[e.id]?.data?.mal;
		t && await Ct({ title: Z("confirm.deleteTemplate", { name: t.name }) }) && (ft("templates"), V(ho) === e.id && N(ho, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete ml[e.id], pl.data.maler = V(vl).filter((t) => t !== e.id), pl.save(), N(vl, V(vl).filter((t) => t !== e.id), !0), st(), bl());
	}
	async function El() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		Qc = ea("urd-draft-collections", () => e, de, "urd-draft-samlinger"), N(nl, [...Qc.data.samlinger ?? []], !0);
		for (let e of V(nl)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			el[e] = t, $c[e] = ea(`urd-draft-collection-${e}`, () => t, de, `urd-draft-samling-${e}`), !t && !$c[e].data && ($c[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), $c[e].save());
		}
		tl = !0, Dl();
	}
	function Dl(e = !0) {
		let t = {};
		for (let e of V(nl)) $c[e] && (t[e] = JSON.parse(JSON.stringify($c[e].data)));
		N(rl, t, !0), e && Ol();
	}
	function Ol() {
		et?.sendCollections(We(V(rl)) ?? {});
	}
	function kl(e, t, n, r = !0) {
		let i = $c[e];
		i && (ft(t), n(i.data), i.save(), st(), Dl(r));
	}
	function Al(e) {
		$c[e.collection] && Ll(e.collection);
	}
	function jl(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function Ml(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || jl(i)) && kl(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function Nl(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		$c[e] = ea(`urd-draft-collection-${e}`, () => null, de, `urd-draft-samling-${e}`), $c[e].replace(r), $c[e].save(), Qc.data.samlinger = [...V(nl), e], Qc.save(), N(nl, [...V(nl), e], !0), N(il, e, !0), st(), Dl();
	}
	function Pl() {
		let e = V(al).trim();
		if (!e) return;
		let t = Ra(e);
		if (!t || V(nl).includes(t)) {
			D(Z(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		ft("collections"), Nl(t, e, V(cl)), N(al, "");
	}
	function Fl() {
		let e = Z("seed.productCatalogName"), t = Ra(e) || "collection", n = t;
		for (let e = 2; V(nl).includes(n); e += 1) n = `${t}-${e}`;
		ft("collections"), Nl(n, e, "products"), cn(null, (e) => {
			e.props.collection = n;
		});
	}
	function Il(e) {
		ft("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete $c[e], Qc.data.samlinger = V(nl).filter((t) => t !== e), Qc.save(), N(nl, V(nl).filter((t) => t !== e), !0), V(il) === e && N(il, null), st(), Dl();
	}
	function Ll(e) {
		kl(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: Gs("entry"),
				title: Z("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: Gs("entry"),
				title: Z("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Rl(e, t, n, r) {
		kl(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function zl(e, t, n) {
		kl(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Bl(e, t) {
		kl(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Vl(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Rl(e, t, "image", (await oi(r)).dataUrl);
	}
	function Hl(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		Rl(e, t, "sizes", r.length ? r : "");
	}
	function Ul(e, t) {
		kl(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Z("ph.colorName") }]);
		});
	}
	function Wl(e, t, n, r, i) {
		kl(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Gl(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Wl(e, t, n, "image", (await oi(i)).dataUrl);
	}
	function Kl(e, t, n) {
		kl(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function ql(e) {
		let t = $c[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Tc(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function Jl(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Oc(await n.text());
		if (!r) {
			D(Z("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = Gs("entry")), i.add(e.id);
		kl(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), D(Z("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let Xl = null, $l, eu = new Promise((e) => {
		$l = e;
	}), iu = /* @__PURE__ */ M(null), su = Qt({}), cu = /* @__PURE__ */ M("0.0.0"), mu = /* @__PURE__ */ M(""), hu = /* @__PURE__ */ M(""), gu = /* @__PURE__ */ M(Qt([])), _u = /* @__PURE__ */ M(Qt([])), vu = /* @__PURE__ */ M("pending"), yu = () => [.../* @__PURE__ */ new Set([...V(iu)?.enabled ?? [], ...V(iu)?.disabled ?? []])];
	function bu() {
		N(iu, JSON.parse(JSON.stringify(Xl.data)), !0);
	}
	let xu = /* @__PURE__ */ M(null);
	async function Su() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				N(xu, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			N(xu, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			N(xu, { unknown: !0 }, !0);
		}
	}
	function Cu(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!V(xu) || V(xu).unknown) return [];
		let n = {
			"script-src": V(xu).scriptSrc,
			"connect-src": V(xu).connectSrc,
			"frame-src": V(xu).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function wu() {
		Su();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		N(_u, e.enabled ?? [], !0), Xl = ea("urd-draft-plugins", () => e, de), bu();
		try {
			N(cu, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of yu()) Mu(e);
		Du(), $l(), et?.sendPlugins(We(V(iu))?.enabled ?? []);
	}
	async function Du() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				ju();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), N(gu, (t ?? []).filter((e) => !yu().includes(e)), !0);
			for (let e of V(gu)) Mu(e);
			N(vu, "ok");
		} catch {
			ju();
		}
	}
	function ju() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				N(gu, e.filter((e) => !yu().includes(e)), !0);
				for (let e of V(gu)) Mu(e);
				N(vu, "ok");
				return;
			}
		} catch {}
		N(vu, "unavailable");
	}
	async function Mu(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Ws(t);
			su[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Hs(V(cu), t.requiresEngine)
			};
		} catch {
			su[e] = {
				name: e,
				errors: [Z("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Pu(e, t) {
		ft("plugins");
		let n = Xl.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Xl.save(), st(), bu(), Fu();
	}
	function Fu() {
		V(pe) && (V(pe).src = V(pe).src);
	}
	function Iu(e) {
		ft("plugins");
		let t = Xl.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Xl.save(), st(), bu(), Fu();
	}
	async function Lu() {
		N(hu, "");
		let e = V(mu).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			N(hu, Z("plugin.invalidId"), !0);
			return;
		}
		if (yu().includes(e)) {
			N(hu, Z("plugin.alreadyListed"), !0);
			return;
		}
		if (await Mu(e), su[e].errors.length) {
			N(hu, Z("plugin.invalidManifest", { errors: su[e].errors.join("; ") }), !0);
			return;
		}
		Pu(e, !0), N(mu, "");
	}
	function Ru(e) {
		N(gu, V(gu).filter((t) => t !== e), !0), Pu(e, !0);
	}
	function Hu(e, t) {
		fo(e, () => {
			V(A).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(V(A).footer);
		});
	}
	function Uu(e, t) {
		Hu(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function Wu(e) {
		Hu("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Gu(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await oi(t);
			Hu("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			D(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function Ku() {
		Hu("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Ju(e) {
		Hu("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Xu(e) {
		Hu("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let Zu = [
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
		},
		{
			id: "chapters",
			label: Z("footerTemplate.chapters"),
			thumb: {
				chapters: !0,
				cols: 3,
				baselineLinks: 2
			}
		},
		{
			id: "split",
			label: Z("footerTemplate.split"),
			thumb: {
				split: !0,
				cols: 2,
				baselineLinks: 1
			}
		}
	];
	function Qu(e) {
		let t = Z("seed.orgName"), n = V(A).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
		} : e === "chapters" ? {
			align: "left",
			design: "chapters",
			brand: {
				title: t,
				tagline: Z("seed.footer.tagline2")
			},
			columns: [
				{
					title: Z("seed.footer.colExplore"),
					links: r(4)
				},
				{
					title: Z("seed.footer.colCompany"),
					links: [
						a(Z("seed.footer.about"), "#"),
						a(Z("seed.footer.history"), "#"),
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
				}
			],
			copyright: o,
			baseline: [a(Z("seed.footer.privacy"), "#"), a(Z("seed.footer.terms"), "#")]
		} : e === "split" ? {
			align: "left",
			design: "split",
			brand: {
				title: t,
				tagline: Z("seed.footer.tagline1")
			},
			cta: {
				kind: "button",
				heading: Z("seed.footer.ctaHeading"),
				label: Z("seed.join"),
				href: "#"
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
					version: Eu.version ?? 1,
					props: {
						...Eu.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Ou.version ?? 1,
					props: {
						...Ou.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function $u(e) {
		Hu("footer-template", (t) => {
			let n = Qu(e);
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
	function ed(e) {
		Hu("footer", (t) => {
			t[e] ??= [], t[e].push(V(A).pages[0] ? {
				label: Z("seed.link"),
				page: V(A).pages[0].id
			} : {
				label: Z("seed.link"),
				href: "https://"
			});
		});
	}
	function td(e, t) {
		Hu("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function nd(e, t, n) {
		Hu("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function rd(e, t, n) {
		Hu(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function id(e, t, n) {
		Hu("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function ad(e, t, n) {
		Hu(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function od(e) {
		Hu("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function sd(e) {
		Hu("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Z("seed.join")
			} : delete t.cta;
		});
	}
	function cd(e, t) {
		Hu(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function ld(e) {
		Hu("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function ud(e, t) {
		Hu("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function dd() {
		Hu("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Z("seed.column"),
				links: [{
					label: Z("seed.link"),
					page: V(A).pages[0].id
				}]
			});
		});
	}
	function fd(e) {
		Hu("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function pd(e, t) {
		Hu("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function md(e, t) {
		Hu(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function hd(e) {
		Hu("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Z("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function gd(e, t) {
		Hu("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function _d(e, t, n) {
		Hu("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function vd(e, t, n) {
		Hu(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function yd(e, t, n) {
		Hu("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function bd(e, t, n) {
		Hu(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Sd() {
		Hu("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Od(e) {
		Hu("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function kd(e, t) {
		Hu("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Ad(e, t) {
		Hu("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function jd(e, t) {
		Hu(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Md = $a.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Z(Qa[e].labelKey)]));
	function Nd(e, t) {
		fo(`edit:nav-label-${e}`, () => {
			V(A).nav.items[e].label = t;
		});
	}
	function Pd(e, t) {
		fo("nav", () => {
			let n = V(A).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Fd(e, t) {
		fo(`edit:nav-href-${e}`, () => {
			V(A).nav.items[e].href = t;
		});
	}
	function Id(e, t) {
		let n = e + t, r = V(A).nav.items;
		n < 0 || n >= r.length || fo("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Ld(e) {
		fo("nav", () => {
			V(A).nav.items.splice(e, 1);
		});
	}
	let zd = /* @__PURE__ */ M(""), Bd = /* @__PURE__ */ M(""), Vd = /* @__PURE__ */ M(null);
	function Hd(e) {
		let [t, n] = e.split(".").map(Number), r = V(A).nav.items;
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
	function Ud(e, t, n, r) {
		if (!V(Bd) || V(Bd) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = Hd(V(Bd)), c = Hd(t), l = s.list[s.index], u;
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
		}, Wd(u, l, s);
	}
	function Wd(e, t, n) {
		let r = Hd(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = Hd(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : V(A).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function Gd() {
		if (!V(Bd)) return {
			label: "",
			target: ""
		};
		let e = Hd(V(Bd)), t = e.list[e.index], n = t.page ? V(A).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Z("opt.noLink")
		};
	}
	function Kd(e) {
		V(Vd) && e?.dataTransfer?.dropEffect !== "none" && Yd(V(Vd).key), N(Bd, ""), N(Vd, null);
	}
	vn(() => {
		if (!V(Bd)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let qd = "application/x-urd-nav-row";
	function Jd(e) {
		if (!V(Bd)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = Ud(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = Hd(V(Bd)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === V(Bd) ? null : Wd({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === V(Bd) ? null : Wd({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			N(Vd, null);
			return;
		}
		e.preventDefault(), (V(Vd)?.key !== r.key || V(Vd)?.pos !== r.pos) && N(Vd, r, !0);
	}
	function Yd(e) {
		let t = V(Bd), n = V(Vd);
		if (N(Bd, ""), N(Vd, null), t && n && n.key === e && t !== e) {
			{
				let r = Hd(t), i = Hd(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			fo("nav", () => {
				let r = V(A).nav.items, i = Hd(t), a = Hd(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && (delete i.parent.children, !i.parent.page && !i.parent.href && (i.parent.page = V(A).pages[0].id)), n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = V(A).pages[0].id);
				}
			}), N(zd, "");
		}
	}
	let Xd = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function Zd() {
		fo("nav", () => {
			V(A).nav.items.push({
				label: Z("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function Qd(e) {
		fo("nav", () => {
			let t = V(A).nav.items[e];
			t.children ??= [], t.children.push({
				label: Z("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function $d(e, t, n) {
		fo(`edit:nav-child-label-${e}-${t}`, () => {
			V(A).nav.items[e].children[t].label = n;
		});
	}
	function ef(e, t, n) {
		fo("nav", () => {
			let r = V(A).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function tf(e, t, n) {
		fo(`edit:nav-child-href-${e}-${t}`, () => {
			V(A).nav.items[e].children[t].href = n;
		});
	}
	function nf(e, t, n) {
		let r = t + n, i = V(A).nav.items[e].children;
		r < 0 || r >= i.length || fo("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function af(e, t) {
		fo("nav", () => {
			let n = V(A).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = V(A).pages[0].id));
		});
	}
	function of(e, t) {
		fo(`edit:theme-color-${e}`, () => {
			V(A).theme.tokens.color[e] = t, V(A).theme.alt?.auto && (V(A).theme.alt.tokens.color = xf());
		});
	}
	function sf(e, t) {
		return e === "accent-text" ? ae(jf(t.accent ?? "#000000", t)) : t.bg;
	}
	let lf = /* @__PURE__ */ j(() => !V(A)?.theme?.tokens?.color?.["accent-text"] && !V(A)?.theme?.alt?.tokens?.color?.["accent-text"]), uf = /* @__PURE__ */ M(null), df = /* @__PURE__ */ M(!1), ff = /* @__PURE__ */ M(!1), pf = (e) => e.length > 0 && [...e].every((e) => e.open);
	function mf() {
		let e = V(uf)?.querySelectorAll("details.group") ?? [];
		N(df, e.length > 0), N(ff, pf(e), !0);
	}
	vn(() => {
		V(Lt), ur().then(mf);
	});
	function hf() {
		let e = !V(ff);
		V(uf)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), mf();
	}
	function gf(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = T.foldToggle;
			let i = () => {
				let e = pf(n());
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
	vn(() => {
		let e = V(uf);
		if (!e) return;
		let t = new MutationObserver(() => {
			gf(e), mf();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", mf, !0), gf(e), () => {
			t.disconnect(), e.removeEventListener("toggle", mf, !0);
		};
	});
	function _f(e) {
		fo("edit:theme-color-accent-text", () => {
			e ? (delete V(A).theme.tokens.color["accent-text"], V(A).theme.alt?.tokens?.color && delete V(A).theme.alt.tokens.color["accent-text"]) : (V(A).theme.tokens.color["accent-text"] = sf("accent-text", V(Bi)), V(A).theme.alt?.auto && (V(A).theme.alt.tokens.color = xf()));
		});
	}
	function vf(e, t) {
		fo("theme", () => {
			V(A).theme.tokens.font[e] = t;
		});
	}
	function yf(e, t) {
		fo("theme", () => {
			V(A).theme.tokens.radius[e] = t;
		});
	}
	function bf(e) {
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
	function xf() {
		return Object.fromEntries(Object.entries(V(A).theme.tokens.color).map(([e, t]) => [e, bf(t)]));
	}
	function Sf(e, t) {
		fo(`edit:theme-alt-${e}`, () => {
			V(A).theme.alt.tokens.color[e] = t, V(A).theme.alt.auto = !1;
		});
	}
	function Cf(e) {
		fo("theme", () => {
			e === "light" ? delete V(A).theme.scheme : V(A).theme.scheme = e;
		});
	}
	function wf(e) {
		fo("theme", () => {
			e ? V(A).theme.alt = {
				auto: !0,
				tokens: { color: xf() }
			} : delete V(A).theme.alt;
		});
	}
	function Tf(e) {
		fo("theme", () => {
			V(A).theme.alt ??= { tokens: { color: xf() } }, V(A).theme.alt.auto = e, e && (V(A).theme.alt.tokens.color = xf());
		});
	}
	function Ef(e) {
		let t = V(A).theme.tokens.font[e];
		return [...Nf.some(([, e]) => e === t) ? [] : [[t, Z("opt.customFont")]], ...Nf.map(([e, t]) => [t, Z(e)])];
	}
	let kf = (e) => parseInt(e, 10) || 0;
	function Af(e, t) {
		yf(e, `${t}px`);
	}
	let jf = (e, t) => e && t && t[e] ? t[e] : e, If = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Lf = [
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
	function Bf(e) {
		fo("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of If) V(A).theme.tokens.color[e] = n[e];
			t ? V(A).theme.scheme = "dark" : delete V(A).theme.scheme, V(A).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Vf = /* @__PURE__ */ j(() => {
		if (!V(A)) return null;
		let e = V(A).theme.tokens.color, t = V(A).theme.alt?.tokens?.color ?? {}, n = V(A).theme.scheme === "dark";
		return Lf.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return If.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), Hf = 0;
	async function Gf() {
		V(ge) && (Hf = V(uf)?.scrollTop ?? 0), N(ge, !V(ge)), et?.sendChrome(V(ge)), V(ge) && (await ur(), requestAnimationFrame(() => {
			V(uf) && (V(uf).scrollTop = Hf);
		}));
	}
	function U_(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ft(`edit:${e.blockId}`), n.props = e.props, k.save(), st(), V(P)?.blockId === e.blockId && en(), e.rerender && et?.sendSection(V(E), t), N(ce, ""));
	}
	function W_(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		ft(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && Qe(t, "desktop-changed-after-mobile"), k.save(), st(), V(P)?.blockId === e.blockId && en();
	}
	function G_(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t?.frames?.desktop && t.frames.desktop.h !== e.h && (k.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), k.hasDraft() && ft(`edit:${e.blockId}`), t.frames.desktop.h = e.h, k.save(), st(), V(P)?.blockId === e.blockId && en());
	}
	function K_(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (ft("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Ze(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), k.save(), st(), Ke(), et?.sendSection(V(E), t);
		}
	}
	function q_(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (ft("mobile-order"), n.mobileOrder = e.mobileOrder, k.save(), st(), et?.sendSection(V(E), t));
	}
	function J_(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (ft("review-done"), t.responsive.mobile.attention = null, k.save(), st(), Ke());
	}
	function Y_(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ft("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), k.save(), st(), typeof e.hideMobile == "boolean" && V(ke) === "mobile" && et?.sendSection(V(E), t), V(P)?.blockId === e.blockId && en());
	}
	function X_(e) {
		ft("add-section"), e.section.id || (e.section.id = Gs("sec")), k.data.sections.splice(e.index, 0, e.section), k.save(), st(), et?.sendPage(V(E), k.data), N(mr, e.section.id, !0), wr(e.section), N(Lt, "properties");
	}
	function Z_(e) {
		let t = k.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (ft("move-section"), [t[n], t[r]] = [t[r], t[n]], k.save(), st(), et?.sendPage(V(E), k.data));
	}
	function Q_(e) {
		ft("delete-section"), e.sectionId === V(mr) && (N(mr, null), N(hr, null)), V(P)?.sectionId === e.sectionId && N(P, null), k.data.sections = k.data.sections.filter((t) => t.id !== e.sectionId), k.save(), st(), et?.sendPage(V(E), k.data);
	}
	function $_(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ft("section-size"), t.size = {
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
			e.moves?.length && (Qe(t, "section-height"), V(P)?.sectionId === e.sectionId && en()), e.sectionId === V(mr) && N(gr, e.minHeight, !0), k.save(), st();
		}
	}
	function ev(e) {
		let t = k.data.sections.find((t) => t.id === e.fromSectionId), n = k.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (ft("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Qe(t, "block-moved"), Qe(n, "block-moved"), k.save(), st(), Ke(), et?.sendSection(V(E), t), et?.sendSection(V(E), n), V(P)?.blockId === e.blockId && (N(P, {
			...V(P),
			sectionId: e.toSectionId
		}, !0), en()));
	}
	function tv(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		ft("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(V(P)?.blockId) && N(P, null), Qe(t, "block-deleted"), k.save(), st(), et?.sendSection(V(E), t);
	}
	let nv = {
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
				fields: Ds()
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
	function rv(e) {
		let t = nv[e];
		return t ? {
			id: Gs("blk"),
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
	function iv(e) {
		et ? et.sendPlaceBlock(e) : av(ca()?.id, e);
	}
	function av(e, t) {
		let n = k.data.sections.find((t) => t.id === e) ?? k.data.sections[0];
		if (!n) return;
		ft("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Qe(n, "block-added"), k.save(), st(), et?.sendSection(V(E), n);
	}
	function ov(e, t, n, r) {
		let i = k.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		ft("add-blocks");
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
		}), Qe(i, "block-added"), k.save(), st(), et?.sendSection(V(E), i);
	}
	function sv(e) {
		iv(rv(e));
	}
	let cv = /* @__PURE__ */ M(Qt([])), lv = { map: [
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
	function uv(e, t = {}) {
		let n = We(e);
		iv({
			id: Gs("blk"),
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
	let dv = /* @__PURE__ */ M("");
	function fv() {
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
				label: `${Z("blocks.calendar")}: ${Z("calendar.viewAgenda")}`,
				act: "block",
				kind: "calendar-agenda"
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
		for (let t of V(vl)) {
			let n = ml[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of V(cv)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function pv(e) {
		e.act === "block" ? sv(e.kind) : e.act === "plugin" ? uv(e.entry, e.props ?? {}) : e.act === "template" && et?.sendInsertTemplate(e.id);
	}
	function mv(e) {
		let t = rv(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = k.data.sections.find((t) => t.id === e.sectionId)?.grid ?? V(A).grid, r = Pf({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			av(e.sectionId, t), et?.sendSelect(t.id), e.kind === "image" && D(Z("status.imageBlockAdded")), e.kind === "gallery" && D(Z("status.galleryBlockAdded"));
		}
	}
	async function hv(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		D(Z("status.compressingImage"));
		let n;
		try {
			n = await oi(t);
		} catch (e) {
			D(ci(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (V(pe)?.clientWidth ?? 1280));
		iv({
			id: Gs("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Ra(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? D(Z("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : D("");
	}
	async function gv(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await oi(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Ra(i.name).replaceAll("-", " "),
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
	function _v(e, t, n) {
		t ? D(Z("status.imagesReadFailed", { n: t }), "error") : n ? D(Z("status.imagesLarge", { n }), "error") : D(e ? "" : Z("status.noImagesAdded"));
	}
	async function vv(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		D(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await gv(t);
		n.length && cn("gallery-add", (e) => {
			e.props.images.push(...n);
		}), _v(n.length, r, i);
	}
	async function yv(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		D(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await gv(t);
		if (!n.length) {
			_v(0, r, i);
			return;
		}
		let a = rv("gallery");
		a.props.images = n, iv(a), _v(n.length, r, i);
	}
	function bv(e, t) {
		cn("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function xv(e) {
		cn("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Sv(e, t, n) {
		cn(`edit:${V(P).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Cv(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ra(n || "image")}-${za(a)}.${La(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function wv(e, t) {
		Cv(e, "image", e.title, t);
		for (let n of e.colors ?? []) Cv(n, "image", `${e.title}-${n.name}`, t);
	}
	function Tv(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Cv(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Cv(e, "src", "background", t);
			n.type === "video" && (Cv(n.props, "src", "video", t), Cv(n.props, "poster", "plakat", t));
		}
	}
	function Ev(e, t) {
		if (e.type === "image" && Cv(e.props, "src", e.props.alt, t), e.type === "icon" && Cv(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Cv(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Cv(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (Cv(e.props, "src", e.props.title || "video", t), Cv(e.props, "poster", "poster", t));
	}
	function Dv(e, t) {
		Tv(e.background, t);
		for (let n of e.blocks) Ev(n, t);
	}
	function Ov(e) {
		let t = [];
		e.meta?.og && Cv(e.meta.og, "image", "share", t);
		for (let n of e.sections) Dv(n, t);
		return t;
	}
	function kv(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && Cv(n, "value", "logo", t), n?.type === "both" && Cv(n, "image", "logo", t), e.nav?.style && Cv(e.nav.style, "image", "menu", t), Tv(e.nav?.style?.background, t), Tv(e.footer?.background, t), e.footer?.brand && Cv(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			Cv(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) Cv(n, "image", "snarvei", t);
		}
		return Cv(e.site, "icon", "ikon", t), t;
	}
	let Av = /* @__PURE__ */ M(!1), jv = /* @__PURE__ */ M(null);
	function Mv() {
		N(Av, !V(Av));
	}
	function Nv() {
		N(Av, !1);
		try {
			Pv(), D(Z("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), D(String(e?.message ?? e), "error");
		}
	}
	vn(() => {
		if (!V(Av)) return;
		let e = (e) => {
			if (!V(jv)?.contains(e.target)) {
				N(Av, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Nv());
		}, t = (e) => {
			e.key === "Escape" && N(Av, !1);
		}, n = !1, r = (e) => {
			n = !!V(jv)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || N(Av, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function Pv() {
		ft("discard");
		for (let e of V(A).pages) e.id !== V(E) && !rt.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = k.reset();
		if ($e.reset(), Xl && (Xl.reset(), bu()), Qc) {
			Qc.reset(), N(nl, [...Qc.data.samlinger ?? []], !0);
			for (let e of Object.keys($c)) V(nl).includes(e) ? $c[e].reset() : delete $c[e];
			Dl();
		}
		if (pl) {
			pl.reset(), N(vl, [...pl.data.maler ?? []], !0);
			for (let e of Object.keys(ml)) V(vl).includes(e) ? ml[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete ml[e]);
			bl();
		}
		tt(), N(he, {
			snap: !0,
			...V(A).grid
		}, !0), st(), N(ce, ""), nt(), V(A).pages.some((e) => e.id === V(E)) ? et?.sendPage(V(E), e) : Ka(V(A).pages[0].id);
	}
	async function Fv() {
		if (wa) {
			D(Z("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (V(Ma)) {
			D(Z("update.publishBlocked"), "error");
			return;
		}
		D(Z("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of V(A).pages) {
			let a = `urd-draft-${i.id}`, o = rt.has(i.id) || !V(oe).pages.some((e) => e.id === i.id), s = null;
			if (i.id === V(E) && (k.hasDraft() || o)) s = k.data;
			else if (i.id !== V(E)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = zs(JSON.parse(e), $e.data);
				} catch {}
			}
			if (!s && o && (s = Ga(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Ov(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if ($e.hasDraft()) {
			let r = JSON.parse(JSON.stringify(V(A)));
			e.push(...kv(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: ou(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(V(oe).theme, V(A).theme) || t.push(Z("publish.part.theme")), i(V(oe).nav, V(A).nav) || t.push(Z("publish.part.nav")), i(V(oe).footer, V(A).footer) || t.push(Z("publish.part.footer")), i(V(oe).pages, V(A).pages) || t.push(Z("publish.part.pages")), i(V(oe).grid, V(A).grid) || t.push(Z("publish.part.grid")), (V(oe).site.icon ?? null) !== (V(A).site.icon ?? null) && t.push(Z("publish.part.icon"));
			let { icon: a, ...o } = V(oe).site, { icon: s, ...c } = V(A).site;
			i(o, c) || t.push(Z("publish.part.siteInfo"));
		}
		let i = Object.entries($c).filter(([, e]) => e.hasDraft());
		if (i.length || Qc?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) wv(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), Mc.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: Nc({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: jl(e.title),
							text: jl(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Qc?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(Qc.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!V(nl).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Z("publish.part.collections"));
		}
		let a = Object.entries(ml).filter(([, e]) => e.hasDraft());
		if (a.length || pl?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Dv(i.section, e);
				for (let t of i.blocks ?? []) Ev(t, e);
				for (let t of i.page?.sections ?? []) Dv(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (pl?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(pl.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!V(vl).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Z("publish.part.templates"));
		}
		Xl?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Xl.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(Z("publish.part.plugins")));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of V(A).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		e.push({
			path: "sitemap.xml",
			content: Ac(V(A).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: jc(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of V(oe).pages) {
			let t = V(A).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await ha(e);
		if (!c.ok) {
			D(Z("status.publishAborted"), "error");
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
			t ? pa = t : ma(), Ov(k.data), kv(V(A));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) rt.add(e);
			if (N(oe, JSON.parse(JSON.stringify(V(A))), !0), $e = ea("urd-draft-site", () => V(oe), de), tt(), Xl) {
				let e = JSON.parse(JSON.stringify(Xl.data));
				Xl = ea("urd-draft-plugins", () => e, de), bu();
			}
			if (Qc) {
				for (let e of Object.values($c)) for (let t of e.data.entries) wv(t, []);
				let e = JSON.parse(JSON.stringify(Qc.data));
				Qc = ea("urd-draft-collections", () => e, de, "urd-draft-samlinger"), el = {};
				for (let e of V(nl)) {
					if (!$c[e]) continue;
					let t = JSON.parse(JSON.stringify($c[e].data));
					el[e] = t, $c[e] = ea(`urd-draft-collection-${e}`, () => t, de, `urd-draft-samling-${e}`);
				}
				Dl();
			}
			if (pl) {
				for (let e of Object.values(ml)) {
					e.data?.section && Dv(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Ev(t, []);
					for (let t of e.data?.page?.sections ?? []) Dv(t, []);
				}
				let e = JSON.parse(JSON.stringify(pl.data));
				pl = ea("urd-draft-templates", () => e, de, "urd-draft-maler"), hl = {};
				for (let e of V(vl)) {
					if (!ml[e]) continue;
					let t = JSON.parse(JSON.stringify(ml[e].data));
					hl[e] = t, ml[e] = ea(`urd-draft-template-${e}`, () => t, de, `urd-draft-mal-${e}`);
				}
				bl();
			}
			N(he, {
				snap: !0,
				...V(A).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(k.data));
			k = ea(`urd-draft-${V(E)}`, () => i, de), rt.has(V(E)) && fe(`urd-draft-${V(E)}`, JSON.stringify(i)), st(), D(Z("status.published"), "info"), Oa(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			D(e?.code === "loginExpired" ? Z("status.loginExpired") : Z("status.loginRequired", { reason: Ki(e) ?? Z("status.unknownReason") }), "error"), await fa();
		} else u?.status === 403 ? D(Ki(await u.json().catch(() => null)) ?? Z("status.noPublishAccess"), "error") : u?.status === 409 ? D(Z("status.publishRace"), "error") : D(u ? Ki(await u.json().catch(() => null)) ?? Z("status.publishFailed") : Z("status.publishUnavailable"), "error");
	}
	xt();
	var Iv = H_();
	xr("keydown", $t, bt), xr("pointerdown", $t, yt);
	var Lv = I(Iv), Rv = F(Lv), zv = (e) => {
		var t = oh(), n = F(t);
		q(n, () => T.pencil);
		var r = R(n);
		O(t), B((e, n) => {
			X(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Z("tip.backToEdit"), () => Z("ui.edit")]), H("click", t, Gf), W(e, t);
	};
	K(Rv, (e) => {
		V(ge) || e(zv);
	});
	var Bv = R(Rv, 2);
	let Vv;
	var Hv = F(Bv), Uv = F(Hv), Wv = (e) => {
		var t = _h(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i), o = (e) => {
			var t = lh(), n = F(t);
			let r;
			var i = F(n);
			q(i, () => T[`device_${V(De)}`]), q(R(i), () => T.caret), O(n);
			var a = R(n, 2), o = (e) => {
				var t = ch();
				Kr(t, 21, () => V(we), (e) => e.id, (e, t) => {
					var n = sh();
					let r;
					var i = F(n);
					q(i, () => T[`device_${V(t).id}`]);
					var a = R(i);
					O(n), B((e, i) => {
						r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(De) === V(t).id }), X(n, "title", e), G(a, ` ${i ?? ""}`);
					}, [() => Te(V(t)), () => Z(`lbl.device.${V(t).id}`)]), H("click", n, () => {
						N(De, V(t).id, !0), N(io, null);
					}), W(e, n);
				}), O(t), W(e, t);
			};
			K(a, (e) => {
				V(io) === "device" && e(o);
			}), O(t), B((e) => {
				r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(io) === "device" }), X(n, "title", e);
			}, [() => Z("lbl.group.device")]), H("click", n, () => N(io, V(io) === "device" ? null : "device", !0)), W(e, t);
		}, s = (e) => {
			var t = dh(), n = I(t), r = L(n, !0), i = R(n, 2);
			Kr(i, 21, () => V(we), (e) => e.id, (e, t) => {
				var n = uh();
				let r;
				q(n, () => T[`device_${V(t).id}`], !0), O(n), B((e) => {
					r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(De) === V(t).id }), X(n, "title", e);
				}, [() => Te(V(t))]), H("click", n, () => N(De, V(t).id, !0)), W(e, n);
			}), O(i), B((e) => G(r, e), [() => Z("lbl.group.device")]), W(e, t);
		};
		K(a, (e) => {
			oo.device ? e(o) : e(s, -1);
		});
		var c = R(a, 2), l = (e) => {
			var t = ph(), n = F(t);
			let r;
			var i = F(n), a = L(i);
			q(R(i), () => T.caret), O(n);
			var o = R(n, 2), s = (e) => {
				var t = fh(), n = F(t), r = F(n);
				q(r, () => T.minus, !0), O(r);
				var i = R(r, 2), a = L(i), o = R(i, 2);
				q(o, () => T.plus, !0), O(o), O(n);
				var s = R(n, 2);
				let c;
				var l = F(s);
				q(l, () => T.fit);
				var u = R(l);
				O(s), O(t), B((e, t, n, l, d, f) => {
					X(r, "title", e), X(i, "title", t), G(a, `${n ?? ""}%`), X(o, "title", l), c = mi(s, 1, "ghost svelte-1n46o8q", null, c, { active: V(Ne) === "fit" }), X(s, "title", d), G(u, ` ${f ?? ""}`);
				}, [
					() => Z("tip.zoomOut"),
					() => Z("tip.zoomCurrent"),
					() => Math.round(V(Re) * 100),
					() => Z("tip.zoomIn"),
					() => Z("tip.zoomFit"),
					() => Z("lbl.zoom.fit")
				]), H("click", r, () => ze(-1)), H("click", o, () => ze(1)), H("click", s, () => N(Ne, "fit")), W(e, t);
			};
			K(o, (e) => {
				V(io) === "zoom" && e(s);
			}), O(t), B((e, t) => {
				r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(io) === "zoom" }), X(n, "title", e), G(a, `${t ?? ""}%`);
			}, [() => Z("lbl.group.zoom"), () => Math.round(V(Re) * 100)]), H("click", n, () => N(io, V(io) === "zoom" ? null : "zoom", !0)), W(e, t);
		}, u = (e) => {
			var t = mh(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i);
			q(a, () => T.minus, !0), O(a);
			var o = R(a, 2), s = L(o), c = R(o, 2);
			q(c, () => T.plus, !0), O(c);
			var l = R(c, 2);
			let u;
			q(l, () => T.fit, !0), O(l), O(i), B((e, t, n, i, d, f) => {
				G(r, e), X(a, "title", t), X(o, "title", n), G(s, `${i ?? ""}%`), X(c, "title", d), u = mi(l, 1, "ghost svelte-1n46o8q", null, u, { active: V(Ne) === "fit" }), X(l, "title", f);
			}, [
				() => Z("lbl.group.zoom"),
				() => Z("tip.zoomOut"),
				() => Z("tip.zoomCurrent"),
				() => Math.round(V(Re) * 100),
				() => Z("tip.zoomIn"),
				() => Z("tip.zoomFit")
			]), H("click", a, () => ze(-1)), H("click", c, () => ze(1)), H("click", l, () => N(Ne, "fit")), W(e, t);
		};
		K(c, (e) => {
			oo.zoom ? e(l) : e(u, -1);
		});
		var d = R(c, 2), f = (e) => {
			var t = lh(), n = F(t);
			let r;
			var i = F(n);
			q(i, () => T.gridToggle), q(R(i), () => T.caret), O(n);
			var a = R(n, 2), o = (e) => {
				var t = hh(), n = F(t);
				let r;
				var i = F(n);
				q(i, () => T.gridToggle);
				var a = R(i);
				O(n);
				var o = R(n, 2);
				let s;
				var c = F(o);
				q(c, () => T.guides);
				var l = R(c);
				O(o), O(t), B((e, t, i, c) => {
					r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(co) }), X(n, "title", e), G(a, ` ${t ?? ""}`), s = mi(o, 1, "ghost svelte-1n46o8q", null, s, { active: V(Ya) }), X(o, "title", i), G(l, ` ${c ?? ""}`);
				}, [
					() => Z("tip.gridToggle"),
					() => Z("lbl.view.grid"),
					() => Z("tip.guides"),
					() => Z("lbl.view.guides")
				]), H("click", n, lo), H("click", o, so), W(e, t);
			};
			K(a, (e) => {
				V(io) === "view" && e(o);
			}), O(t), B((e) => {
				r = mi(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(io) === "view" || V(co) || V(Ya) }), X(n, "title", e);
			}, [() => Z("lbl.group.view")]), H("click", n, () => N(io, V(io) === "view" ? null : "view", !0)), W(e, t);
		}, p = (e) => {
			var t = gh(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i);
			let o;
			q(a, () => T.gridToggle, !0), O(a);
			var s = R(a, 2);
			let c;
			q(s, () => T.guides, !0), O(s), O(i), B((e, t, n) => {
				G(r, e), o = mi(a, 1, "ghost svelte-1n46o8q", null, o, { active: V(co) }), X(a, "title", t), c = mi(s, 1, "ghost svelte-1n46o8q", null, c, { active: V(Ya) }), X(s, "title", n);
			}, [
				() => Z("lbl.group.view"),
				() => Z("tip.gridToggle"),
				() => Z("tip.guides")
			]), H("click", a, lo), H("click", s, so), W(e, t);
		};
		K(d, (e) => {
			oo.view ? e(f) : e(p, -1);
		}), O(i), ki(i, (e) => N(ao, e), () => V(ao)), B((e, t) => {
			X(n, "title", e), G(r, t);
		}, [() => Z("tip.switchPage"), () => ot()?.title ?? ""]), H("click", n, () => Yt("pages")), W(e, t);
	};
	K(Uv, (e) => {
		V(oe) && e(Wv);
	});
	var Gv = R(Uv, 2), Kv = (e) => {
		var t = vh(), n = F(t);
		q(n, () => T.phone);
		var r = R(n, 2), i = L(r, !0), a = L(R(r, 2), !0);
		O(t), B((e, n) => {
			X(t, "title", e), G(i, n), G(a, V(Ge));
		}, [() => Z("tip.attention"), () => Z(V(Ge) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: V(Ge) })]), H("click", t, qe), W(e, t);
	};
	K(Gv, (e) => {
		V(Ge) > 0 && e(Kv);
	}), O(Hv);
	var qv = R(Hv, 2), Jv = F(qv), Yv = (e) => {
		var t = bh(), n = F(t), r = L(F(n), !0);
		Ee(2), O(n);
		var i = R(n, 2), a = F(i);
		let o;
		var s = F(a);
		q(s, () => T.restore);
		var c = L(R(s), !0);
		O(a);
		var l = R(a, 2), u = (e) => {
			var t = yh(), n = F(t);
			q(n, () => T.restore);
			var r = R(n);
			O(t), B((e, n) => {
				X(t, "title", e), G(r, ` ${n ?? ""}`);
			}, [() => Z("tip.discardArmed"), () => Z("ui.discardConfirm")]), H("click", t, Nv), W(e, t);
		};
		K(l, (e) => {
			V(Av) && e(u);
		}), O(i), ki(i, (e) => N(jv, e), () => V(jv)), O(t), B((e, t, i, s, l) => {
			X(n, "title", e), X(n, "aria-label", t), G(r, i), o = mi(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: V(Av) }), X(a, "title", s), G(c, l);
		}, [
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => V(Av) ? Z("tip.discardArmed") : Z("tip.discard"),
			() => Z("ui.discard")
		]), H("click", a, Mv), si(2, t, () => $i, () => ({
			x: 24,
			duration: rn ? 0 : 150
		})), W(e, t);
	};
	K(Jv, (e) => {
		V(se) && e(Yv);
	}), O(qv);
	var Xv = R(qv, 2), Zv = F(Xv), Qv = (e) => {
		var t = wh(), n = I(t), r = F(n), i = (e) => {
			var t = xh(), n = I(t);
			q(n, () => T.eye);
			var r = L(R(n, 2), !0);
			B((e) => G(r, e), [() => Z("ui.cleanView")]), W(e, t);
		}, a = (e) => {
			var t = xh(), n = I(t);
			q(n, () => T.pencil);
			var r = L(R(n, 2), !0);
			B((e) => G(r, e), [() => Z("ui.edit")]), W(e, t);
		};
		K(r, (e) => {
			V(ge) ? e(i) : e(a, -1);
		}), O(n);
		var o = R(n, 2), s = (e) => {
			var t = Sh(), n = F(t), r = (e) => {
				var t = jr();
				q(I(t), () => T.warn), W(e, t);
			};
			K(n, (e) => {
				V(me).allowed || e(r);
			});
			var i = R(n, 1, !0);
			O(t), B((e) => {
				X(t, "title", e), G(i, V(me).login);
			}, [() => V(me).allowed ? Z("tip.hasPublishAccess") : Z("tip.noPublishAccess")]), W(e, t);
		}, c = (e) => {
			var t = Ch(), n = L(t, !0);
			B((e) => G(n, e), [() => Z("ui.loginGitHub")]), W(e, t);
		};
		K(o, (e) => {
			V(me)?.loggedIn ? e(s) : V(me) && e(c, 1);
		});
		var l = R(o, 2), u = F(l);
		q(u, () => T.external);
		var d = L(R(u, 2), !0);
		O(l);
		var f = R(l, 2), p = L(f, !0);
		B((e, t, r, i, a) => {
			X(n, "title", e), X(l, "href", t), X(l, "title", r), G(d, i), f.disabled = !V(se), G(p, a);
		}, [
			() => V(ge) ? Z("tip.chromeHide") : Z("tip.chromeShow"),
			() => ot()?.path ?? "/",
			() => Z("ui.viewSite"),
			() => Z("ui.viewSite"),
			() => Z("ui.publish")
		]), H("click", n, Gf), H("click", f, Fv), W(e, t);
	};
	K(Zv, (e) => {
		V(oe) && e(Qv);
	}), O(Xv), O(Bv);
	var $v = R(Bv, 2), ey = (e) => {
		var t = F_(), n = F(t);
		let r;
		var i = F(n);
		Kr(i, 17, () => Rt, Hr, (e, t, n) => {
			var r = Eh(), i = I(r), a = L(i, !0);
			Kr(R(i, 2), 16, () => V(t), (e) => e, (e, t) => {
				var n = Th();
				let r;
				var i = L(n, !0);
				B(() => {
					r = mi(n, 1, "svelte-1n46o8q", null, r, { active: V(Lt) === t }), G(i, Bt[t]);
				}), H("click", n, () => Yt(t)), W(e, n);
			}), B((e) => G(a, e), [() => Z(zt[n])]), W(e, r);
		});
		var s = R(i, 2), l = R(F(s), 2);
		let p;
		q(l, () => T.gear, !0), O(l);
		var _ = R(l, 2), v = (e) => {
			var t = kh(), n = F(t), r = L(n, !0), i = R(n, 2), a = F(i);
			Q(R(a), {
				get value() {
					return V(re);
				},
				get options() {
					return te;
				},
				onchange: (e) => N(re, e, !0)
			}), O(i);
			var o = R(i, 2), s = F(o), c = R(s);
			{
				let e = /* @__PURE__ */ j(() => [["auto", Z("lang.auto")], ...Gt()]);
				Q(c, {
					get value() {
						return qt;
					},
					get options() {
						return V(e);
					},
					onchange: Jt
				});
			}
			O(o);
			var l = R(o, 2), u = F(l), d = R(u);
			{
				let e = /* @__PURE__ */ j(() => [["strip", Z("settings.layoutPickerStrip")], ["menu", Z("settings.layoutPickerMenu")]]);
				Q(d, {
					get value() {
						return V(Za);
					},
					get options() {
						return V(e);
					},
					onchange: to
				});
			}
			O(l);
			var f = R(l, 2), p = F(f), m = R(p);
			{
				let e = /* @__PURE__ */ j(() => [["remember", Z("settings.panelsRemember")], ["reset", Z("settings.panelsReset")]]);
				Q(m, {
					get value() {
						return V(Ft);
					},
					get options() {
						return V(e);
					},
					onchange: It
				});
			}
			O(f);
			var h = R(f, 2), g = L(h, !0), _ = R(h, 2), v = F(_);
			let y;
			var b = L(v, !0), x = R(v, 2);
			let S;
			var C = L(x, !0);
			O(_);
			var w = R(_, 2), ee = (e) => {
				var t = Dh(), n = F(t), r = L(n, !0), i = R(n, 2);
				J(i);
				var a = R(i, 2), o = L(a, !0), s = R(a, 2);
				J(s), O(t), B((e, t, n, a) => {
					G(r, e), X(i, "min", 640), X(i, "max", Fo), X(i, "title", t), Y(i, V(be).width), G(o, n), X(s, "max", Io), X(s, "title", a), Y(s, V(be).height || "");
				}, [
					() => Z("lbl.screen.w"),
					() => Z("tip.screen.width", {
						min: 640,
						max: Fo
					}),
					() => Z("lbl.screen.h"),
					() => Z("tip.screen.height", {
						min: 480,
						max: Io
					})
				]), H("change", i, (e) => {
					xe({ width: Number(e.target.value) }), e.target.value = V(be).width;
				}), H("change", s, (e) => {
					xe({ height: Number(e.target.value) }), e.target.value = V(be).height || "";
				}), W(e, t);
			};
			K(w, (e) => {
				V(be).mode === "custom" && e(ee);
			});
			var T = R(w, 2), ne = (e) => {
				var t = Oh(), n = I(t), r = L(n, !0), i = R(n, 2), a = F(i), o = R(a);
				J(o), O(i), B((e, t, s, c, l) => {
					X(n, "title", e), G(r, t), X(i, "title", s), G(a, `${c ?? ""} `), X(o, "placeholder", l), Y(o, V(A).analytics?.token ?? "");
				}, [
					() => Z("tip.analytics"),
					() => Z("settings.analytics"),
					() => Z("tip.analytics"),
					() => Z("lbl.analyticsToken"),
					() => Z("ph.analyticsToken")
				]), H("change", o, (e) => Os(e.target.value)), W(e, t);
			};
			K(T, (e) => {
				V(A) && e(ne);
			}), O(t), B((e, t, n, c, d, m, w, ee, T, te, ne, re, ie, ae) => {
				G(r, e), X(i, "title", t), G(a, `${n ?? ""} `), X(o, "title", c), G(s, `${d ?? ""} `), X(l, "title", m), G(u, `${w ?? ""} `), X(f, "title", ee), G(p, `${T ?? ""} `), X(h, "title", te), G(g, ne), X(_, "title", re), y = mi(v, 1, "svelte-1n46o8q", null, y, { on: V(be).mode === "own" }), G(b, ie), S = mi(x, 1, "svelte-1n46o8q", null, S, { on: V(be).mode === "custom" }), G(C, ae);
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
			]), H("click", v, () => xe({ mode: "own" })), H("click", x, () => xe({ mode: "custom" })), W(e, t);
		};
		K(_, (e) => {
			V(Xa) && e(v);
		}), O(s), ki(s, (e) => N(no, e), () => V(no)), O(n);
		var y = R(n, 2), b = (e) => {
			var t = P_();
			let n;
			var r = F(t), i = F(r), s = L(i, !0), l = R(i, 2), p = (e) => {
				var t = Xp();
				let n;
				q(t, () => T.foldToggle, !0), O(t), B((e, r) => {
					n = mi(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: V(ff) }), X(t, "title", e), X(t, "aria-label", r);
				}, [() => Z(V(ff) ? "ui.collapseAll" : "ui.expandAll"), () => Z(V(ff) ? "ui.collapseAll" : "ui.expandAll")]), H("click", t, hf), W(e, t);
			};
			K(l, (e) => {
				V(df) && e(p);
			}), O(r);
			var _ = R(r, 2), v = (e) => {
				var t = Bh(), n = F(t);
				Kr(n, 17, () => V(A).pages, (e) => e.id, (e, t) => {
					var n = Fh();
					let r;
					var i = F(n);
					J(i);
					var a = R(i, 2), o = (e) => {
						var t = Ah();
						B((e) => X(t, "title", e), [() => Z("tip.pages.homeLocked")]), W(e, t);
					}, s = (e) => {
						var n = jh();
						J(n), B((e, t) => {
							Y(n, e), X(n, "title", t);
						}, [() => V(t).path.slice(1), () => Z("tip.pages.slug")]), H("change", n, (e) => us(V(t), e.target.value)), W(e, n);
					};
					K(a, (e) => {
						V(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = R(a, 2), l = (e) => {
						var t = Mh();
						q(t, () => T.warn, !0), O(t), B((e) => X(t, "title", e), [() => Z("tip.pages.missingDescription")]), W(e, t);
					};
					K(c, (e) => {
						V(Oo)[V(t).id] && e(l);
					});
					var u = R(c, 2), d = F(u);
					q(d, () => T.right, !0), O(d);
					var f = R(d, 2), p = F(f);
					q(p, () => T.kebab, !0), O(p);
					var m = R(p, 2), h = (e) => {
						var n = Ph(), r = F(n), i = F(r);
						q(i, () => T.bookmark);
						var a = R(i);
						O(r);
						var o = R(r, 2), s = (e) => {
							var n = Nh(), r = F(n);
							q(r, () => T.cross);
							var i = R(r);
							O(n), B((e, t) => {
								X(n, "title", e), G(i, ` ${t ?? ""}`);
							}, [() => Z("tip.pages.delete"), () => Z("ui.deletePage")]), H("click", n, () => {
								N(vo, null), ds(V(t));
							}), W(e, n);
						};
						K(o, (e) => {
							V(t).path !== "/" && e(s);
						}), O(n), B((e) => G(a, ` ${e ?? ""}`), [() => Z("ui.savePageTemplate")]), H("click", r, () => So(V(t))), W(e, n);
					};
					K(m, (e) => {
						V(vo) === V(t).id && e(h);
					}), O(f), O(u), O(n), B((e, a, o) => {
						r = mi(n, 1, "page-row svelte-1n46o8q", null, r, { current: V(t).id === V(E) }), Y(i, V(t).title), X(i, "title", e), X(d, "title", a), d.disabled = V(t).id === V(E), X(p, "title", o);
					}, [
						() => Z("tip.pages.title"),
						() => Z("tip.pages.open"),
						() => Z("tip.pages.menu")
					]), H("change", i, (e) => Co(V(t), e.target.value)), H("click", d, () => Ka(V(t).id)), H("click", p, () => N(vo, V(vo) === V(t).id ? null : V(t).id, !0)), W(e, n);
				});
				var r = R(n, 2), i = F(r), a = L(i, !0), o = R(i, 2), s = F(o), c = F(s), l = R(c);
				at(l), O(s);
				var u = R(s, 2), d = F(u), f = R(d);
				J(f), O(u);
				var p = R(u, 2), m = F(p), h = R(m);
				at(h), O(p);
				var g = R(p, 2), _ = F(g), v = R(_), y = (e) => {
					var t = Ih();
					B((e) => {
						X(t, "src", V(wo).ogImage), X(t, "alt", e);
					}, [() => Z("lbl.ogImage")]), W(e, t);
				};
				K(v, (e) => {
					V(wo).ogImage && e(y);
				}), O(g);
				var b = R(g, 2), x = F(b), S = F(x), C = R(S);
				O(x);
				var w = R(x, 2), ee = (e) => {
					var t = ep();
					q(t, () => T.cross, !0), O(t), B((e) => X(t, "title", e), [() => Z("tip.seo.removeOgImage")]), H("click", t, () => Eo("ogImage", "")), W(e, t);
				};
				K(w, (e) => {
					V(wo).ogImage && e(ee);
				}), O(b);
				var te = R(b, 2), ne = F(te);
				J(ne);
				var re = R(ne);
				O(te), O(o), O(r);
				var ie = R(r, 4);
				J(ie);
				var ae = R(ie, 2), oe = L(ae, !0), se = R(ae, 2), ce = L(se, !0), le = R(se, 2), ue = F(le);
				let D;
				var de = F(ue), fe = F(de);
				q(fe, () => Yl({ sections: [] }), !0), O(fe);
				var pe = L(R(fe, 2), !0);
				O(de), O(ue), Kr(R(ue, 2), 17, () => Zl, (e) => e.id, (e, t) => {
					var n = Lh();
					let r;
					var i = F(n), a = F(i);
					q(a, () => go[V(t).id], !0), O(a);
					var o = L(R(a, 2), !0);
					O(i), O(n), B((e, a) => {
						r = mi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: V(ho) === `preset:${V(t).id}` }), X(i, "title", e), G(o, a);
					}, [() => Z("tip.pages.templatePick", { name: Z(V(t).labelKey) }), () => Z(V(t).labelKey)]), H("click", i, () => N(ho, V(ho) === `preset:${V(t).id}` ? null : `preset:${V(t).id}`, !0)), W(e, n);
				}), O(le);
				var me = R(le, 2), he = (e) => {
					var t = zh(), n = I(t), r = L(n, !0), i = R(n, 2);
					Kr(i, 20, () => V(vl).filter((e) => ml[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = Rh();
						let r;
						var i = F(n), a = F(i);
						q(a, () => Yl(ml[t].data.page), !0), O(a);
						var o = L(R(a, 2), !0);
						O(i);
						var s = R(i, 2);
						q(s, () => T.cross, !0), O(s), O(n), B((e, a) => {
							r = mi(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: V(ho) === t }), X(i, "title", e), G(o, ml[t].data.mal.name), X(s, "title", a);
						}, [() => Z("tip.pages.templatePick", { name: ml[t].data.mal.name }), () => Z("canvas.deleteTemplate")]), H("click", i, () => N(ho, V(ho) === t ? null : t, !0)), H("click", s, () => Tl({ id: t })), W(e, n);
					}), O(i), B((e) => {
						G(r, e), gi(i, V(_o));
					}, [() => Z("canvas.tabMyTemplates")]), W(e, t);
				}, ge = /* @__PURE__ */ j(() => V(vl).some((e) => ml[e]?.data?.mal?.kind === "page"));
				K(me, (e) => {
					V(ge) && e(he);
				}), O(t), B((e, t, n, r, i, o, v, y, b, C, w, ee, T, E, se, fe, me, he, ge, _e, ve, ye) => {
					G(a, e), X(s, "title", t), G(c, `${n ?? ""} `), Y(l, V(wo).description), X(u, "title", r), G(d, `${i ?? ""} `), Y(f, V(wo).ogTitle), X(f, "placeholder", o), X(p, "title", v), G(m, `${y ?? ""} `), Y(h, V(wo).ogDescription), X(h, "placeholder", V(wo).description), X(g, "title", b), G(_, `${C ?? ""} `), X(x, "title", w), G(S, `${ee ?? ""} `), X(te, "title", T), xi(ne, E), G(re, ` ${se ?? ""}`), X(ie, "placeholder", fe), X(ae, "title", me), ae.disabled = he, G(oe, ge), G(ce, _e), gi(le, V(_o)), D = mi(ue, 1, "page-template-card svelte-1n46o8q", null, D, { picked: V(ho) === null }), X(de, "title", ve), G(pe, ye);
				}, [
					() => Z("ui.seoGroup", { page: V(A).pages.find((e) => e.id === V(E))?.title ?? "" }),
					() => Z("tip.seo.description"),
					() => Z("lbl.seoDescription"),
					() => Z("tip.seo.ogTitle"),
					() => Z("lbl.ogTitle"),
					() => V(A).pages.find((e) => e.id === V(E))?.title ?? "",
					() => Z("tip.seo.ogDescription"),
					() => Z("lbl.ogDescription"),
					() => Z("tip.seo.ogImage"),
					() => Z("lbl.ogImage"),
					() => Z("tip.seo.ogImage"),
					() => V(wo).ogImage ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.seo.hideFromSearch"),
					() => V(A).pages.find((e) => e.id === V(E))?.noindex === !0,
					() => Z("lbl.hideFromSearch"),
					() => Z("ph.newPageName"),
					() => Z("hint.pages.autoMenu"),
					() => !V(po).trim(),
					() => Z("ui.createPage"),
					() => Z("canvas.tabPresets"),
					() => Z("tip.pages.blankPick"),
					() => Z("ui.blankPage")
				]), H("change", l, (e) => Eo("description", e.target.value)), H("change", f, (e) => Eo("ogTitle", e.target.value)), H("change", h, (e) => Eo("ogDescription", e.target.value)), H("change", C, Lo), H("change", ne, (e) => Do(e.target.checked)), H("keydown", ie, (e) => e.key === "Enter" && xo()), Ti(ie, () => V(po), (e) => N(po, e)), H("click", ae, xo), H("click", de, () => N(ho, null)), W(e, t);
			}, y = (e) => {
				var t = Eg(), n = F(t), r = F(n), i = L(r, !0), o = R(r, 2), s = F(o);
				{
					let e = /* @__PURE__ */ j(() => Z("common.type")), t = /* @__PURE__ */ j(() => V(A).nav.logo?.type ?? "text"), n = /* @__PURE__ */ j(() => [
						["text", Z("blocks.text")],
						["image", Z("blocks.image")],
						["both", Z("opt.logo.both")]
					]);
					ws(s, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => _s(e)
					});
				}
				var c = R(s, 2), l = (e) => {
					var t = Vh(), n = I(t);
					J(n);
					var r = R(n, 2), i = F(r);
					{
						let e = /* @__PURE__ */ j(() => Z("tip.nav.logoFont")), t = /* @__PURE__ */ j(() => V(A).nav.logo?.font ?? ""), n = /* @__PURE__ */ j(() => [["", Z("common.inherit")], ...Nf.map(([e, t]) => [t, Z(e)])]);
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
							onchange: (e) => gs({ font: e || void 0 })
						});
					}
					var a = R(i, 2);
					J(a);
					var o = R(a, 2);
					let s;
					var c = L(F(o), !0);
					O(o);
					var l = R(o, 2);
					let u;
					var d = L(F(l), !0);
					O(l), O(r), B((e, t, r, i, f, p, m) => {
						Y(n, V(A).nav.logo?.value ?? ""), X(n, "placeholder", e), X(a, "title", t), Y(a, V(A).nav.logo?.textSize ?? ""), s = mi(o, 1, "tbtn svelte-1n46o8q", null, s, { active: V(A).nav.logo?.bold !== !1 }), X(o, "title", r), G(c, i), u = mi(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), X(l, "title", p), G(d, m);
					}, [
						() => Z("ph.nav.logoName"),
						() => Z("tip.nav.textSize"),
						() => Z("format.bold"),
						() => Z("format.boldLetter"),
						() => !!V(A).nav.logo?.italic,
						() => Z("format.italic"),
						() => Z("format.italicLetter")
					]), H("input", n, (e) => gs({ value: e.target.value })), H("change", a, (e) => gs({ textSize: e.target.value ? Number(e.target.value) : void 0 })), H("click", o, () => gs({ bold: V(A).nav.logo?.bold === !1 })), H("click", l, () => gs({ italic: !V(A).nav.logo?.italic })), W(e, t);
				};
				K(c, (e) => {
					(V(A).nav.logo?.type ?? "text") !== "image" && e(l);
				});
				var p = R(c, 2), _ = (e) => {
					let t = /* @__PURE__ */ j(() => V(A).nav.logo?.type === "image" ? V(A).nav.logo?.value : V(A).nav.logo?.image);
					var n = Wh(), r = I(n), i = F(r), a = F(i), o = (e) => {
						var n = Hh();
						B(() => X(n, "src", V(t))), W(e, n);
					};
					K(a, (e) => {
						V(t) && e(o);
					}), O(i);
					var s = R(i, 2), c = F(s), l = F(c), u = R(l);
					O(c);
					var d = R(c, 2), f = (e) => {
						var n = Uh(), r = L(n, !0);
						B((e) => G(r, e), [() => V(t).split("/").pop()]), W(e, n);
					};
					K(d, (e) => {
						V(t) && e(f);
					}), O(s), O(r);
					var p = R(r, 2), m = F(p), h = F(m), g = L(h, !0), _ = R(h, 2);
					J(_), O(m);
					var v = R(m, 2), y = F(v), b = L(y, !0), x = R(y, 2);
					J(x), O(v);
					var S = R(v, 2), C = F(S), w = L(C, !0), ee = R(C, 2);
					J(ee), O(S), O(p), B((e, t, n, r, i, a, o, s, u) => {
						X(c, "title", e), G(l, `${t ?? ""} `), X(m, "title", n), G(g, r), Y(_, V(A).nav.logo?.size ?? 32), X(v, "title", i), G(b, a), X(x, "min", ss.min), X(x, "max", ss.max), X(x, "placeholder", o), Y(x, V(A).nav.logo?.mobileSize ?? ""), X(S, "title", s), G(w, u), Y(ee, V(A).nav.logo?.radius ?? 0);
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
					]), H("change", u, vs), H("change", _, (e) => gs({ size: Number(e.target.value) })), H("change", x, (e) => {
						let t = e.target.value;
						gs({ mobileSize: t === "" ? void 0 : fs(t, ss, void 0) }), e.target.value = V(A).nav.logo?.mobileSize ?? "";
					}), H("change", ee, (e) => gs({ radius: Number(e.target.value) })), W(e, n);
				};
				K(p, (e) => {
					(V(A).nav.logo?.type ?? "text") !== "text" && e(_);
				});
				var v = R(p, 2), y = (e) => {
					{
						let t = /* @__PURE__ */ j(() => Z("lbl.order")), n = /* @__PURE__ */ j(() => V(A).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ j(() => [["image-first", Z("opt.logo.imageFirst")], ["text-first", Z("opt.logo.textFirst")]]);
						ws(e, {
							get label() {
								return V(t);
							},
							get value() {
								return V(n);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => gs({ order: e })
						});
					}
				};
				K(v, (e) => {
					V(A).nav.logo?.type === "both" && e(y);
				}), O(o), O(n);
				var b = R(n, 2), x = F(b), w = L(x, !0), ee = R(x, 2), te = F(ee), ne = F(te), re = L(ne, !0), ie = R(ne, 2), ae = F(ie), oe = F(ae), E = L(oe, !0), se = R(oe, 2);
				Kr(se, 21, () => [
					["bar", Z("opt.navVariant.bar")],
					["floating", Z("opt.navVariant.floating")],
					["floating-square", Z("opt.navVariant.floatingSquare")],
					["floating-tab", Z("opt.navVariant.floatingTab")],
					["side-left", Z("opt.navVariant.sideLeft")],
					["side-right", Z("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = Gh();
					let o;
					var s = F(a);
					q(s, () => u[r()]);
					var c = L(R(s), !0);
					O(a), B(() => {
						o = mi(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(A).nav.variant ?? "bar") === r() }), X(a, "aria-pressed", (V(A).nav.variant ?? "bar") === r()), G(c, i());
					}), H("click", a, () => Jc(r())), W(e, a);
				}), O(se), O(ae);
				var ce = R(ae, 2), le = (e) => {
					var t = qh(), n = I(t);
					{
						let e = /* @__PURE__ */ j(() => Z("lbl.navPillWidth")), t = /* @__PURE__ */ j(() => Z("tip.nav.pillWidth")), r = /* @__PURE__ */ j(() => V(A).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ j(() => [["content", Z("opt.pillWidth.content")], ["custom", Z("opt.pillWidth.custom")]]);
						ws(n, {
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
							onchange: (e) => Qs("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = R(n, 2), i = (e) => {
						var t = Kh(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i), O(t), B((e, n) => {
							X(t, "title", e), G(r, n), X(i, "min", ts.min), X(i, "max", ts.max), X(i, "step", ts.step), Y(i, typeof V(A).nav.style?.pillWidth == "number" ? V(A).nav.style.pillWidth : "");
						}, [() => Z("tip.nav.pillWidthPx"), () => Z("lbl.navPillWidthPx")]), H("change", i, (e) => ac(e, "pillWidth", ts)), W(e, t);
					};
					K(r, (e) => {
						V(A).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = R(r, 2), o = F(a), s = L(o, !0), c = R(o, 2);
					J(c), O(a), B((e, t) => {
						X(a, "title", e), G(s, t), X(c, "min", as.min), X(c, "max", as.max), X(c, "step", as.step), X(c, "placeholder", V(A).nav.variant === "floating-square" ? "0" : ""), Y(c, typeof V(A).nav.style?.radius == "number" ? V(A).nav.style.radius : "");
					}, [() => Z("tip.nav.radius"), () => Z("lbl.navRadius")]), H("change", c, (e) => ac(e, "radius", as)), W(e, t);
				};
				K(ce, (e) => {
					V(ec) && e(le);
				});
				var ue = R(ce, 2), D = (e) => {
					{
						let t = /* @__PURE__ */ j(() => Z("lbl.navPlacement")), n = /* @__PURE__ */ j(() => V(A).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ j(() => [
							["top", Z("opt.place.top")],
							["middle", Z("opt.place.middle")],
							["bottom", Z("opt.place.bottom")]
						]);
						ws(e, {
							get label() {
								return V(t);
							},
							get value() {
								return V(n);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => Qs("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, de = (e) => {
					{
						let t = /* @__PURE__ */ j(() => Z("lbl.navPlacement")), n = /* @__PURE__ */ j(() => Z("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ j(() => V(A).nav.layout ?? "right"), i = /* @__PURE__ */ j(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						ws(e, {
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
							onchange: (e) => qs(e)
						});
					}
				};
				K(ue, (e) => {
					V($s) ? e(D) : e(de, -1);
				});
				var fe = R(ue, 2), pe = (e) => {
					var t = Jh(), n = I(t), r = F(n);
					J(r);
					var i = R(r);
					O(n);
					var a = R(n, 2), o = F(a);
					J(o);
					var s = R(o);
					O(a), B((e, t, c, l) => {
						X(n, "title", e), xi(r, V(A).nav.style?.glow === !0), G(i, ` ${t ?? ""}`), X(a, "title", c), xi(o, V(A).nav.style?.topGap !== !1), G(s, ` ${l ?? ""}`);
					}, [
						() => Z("tip.nav.glow"),
						() => Z("lbl.navGlow"),
						() => Z("tip.nav.topGap"),
						() => Z("lbl.navTopGap")
					]), H("change", r, (e) => Yc(e.target.checked)), H("change", o, (e) => Xc(e.target.checked)), W(e, t);
				};
				K(fe, (e) => {
					V(ec) && e(pe);
				});
				var me = R(fe, 2), he = (e) => {
					var t = Jh(), n = I(t), r = F(n);
					J(r);
					var i = R(r);
					O(n);
					var a = R(n, 2), o = F(a);
					J(o);
					var s = R(o);
					O(a), B((e, t, c, l) => {
						X(n, "title", e), xi(r, V(A).nav.overlay === !0), G(i, ` ${t ?? ""}`), X(a, "title", c), xi(o, V(A).nav.style?.inset !== !1), G(s, ` ${l ?? ""}`);
					}, [
						() => Z("tip.nav.overlay"),
						() => Z("lbl.navOverlay"),
						() => Z("tip.nav.inset"),
						() => Z("lbl.navInset")
					]), H("change", r, (e) => fo("nav", () => {
						e.target.checked ? V(A).nav.overlay = !0 : delete V(A).nav.overlay;
					})), H("change", o, (e) => Qs("inset", e.target.checked ? void 0 : !1)), W(e, t);
				};
				K(me, (e) => {
					!V(ec) && !V($s) && e(he);
				});
				var ge = R(me, 2), _e = (e) => {
					var t = Yh(), n = I(t);
					{
						let e = /* @__PURE__ */ j(() => Z("lbl.textAlign")), t = /* @__PURE__ */ j(() => Z("tip.nav.sideAlign")), r = /* @__PURE__ */ j(() => V(A).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ j(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						ws(n, {
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
							onchange: (e) => Qs("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = R(n, 2), i = F(r), a = L(i, !0), o = R(i, 2);
					J(o), O(r), B((e, t) => {
						X(r, "title", e), G(a, t), X(o, "min", os.min), X(o, "max", os.max), Y(o, V(A).nav.style?.width ?? 250);
					}, [() => Z("tip.nav.colWidth"), () => Z("lbl.navColWidth")]), H("change", o, (e) => {
						let t = fs(e.target.value, os, 250);
						Qs("width", t === 250 ? void 0 : t), e.target.value = V(A).nav.style?.width ?? 250;
					}), W(e, t);
				};
				K(ge, (e) => {
					V($s) && e(_e);
				}), O(ie), O(te);
				var ve = R(te, 4), ye = F(ve), be = L(ye, !0), xe = R(ye, 2), Se = F(xe);
				Kr(Se, 20, () => ls, (e) => e, (e, t) => {
					var n = Th();
					let r;
					var i = L(n, !0);
					B((e) => {
						r = mi(n, 1, "svelte-1n46o8q", null, r, { on: V(tc) === t }), G(i, e);
					}, [() => Z(`opt.size.${t}`)]), H("click", n, () => ic(t)), W(e, n);
				}), O(Se);
				var Ce = R(Se, 2), we = F(Ce), Te = L(we, !0), De = R(we, 2), Oe = F(De), ke = (e) => {
					var t = Xh(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i);
					var a = R(i, 2);
					J(a), O(t), B((e, n) => {
						X(t, "title", e), G(r, n), X(i, "min", Zo.min), X(i, "max", Zo.max), X(i, "step", Zo.step), Y(i, V(nc)), X(a, "min", Zo.min), X(a, "max", Zo.max), Y(a, V(nc));
					}, [() => Z("tip.nav.thickness"), () => Z("lbl.navThickness")]), H("input", i, (e) => Qs("padY", e.target.valueAsNumber)), H("change", a, (e) => Ec(e, "padY", Zo)), W(e, t);
				};
				K(Oe, (e) => {
					V($s) || e(ke);
				});
				var Ae = R(Oe, 2), je = F(Ae), Me = L(je, !0), Ne = R(je, 2);
				J(Ne);
				var Pe = R(Ne, 2);
				J(Pe), O(Ae);
				var Fe = R(Ae, 2), Ie = (e) => {
					var t = Zh(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2);
					J(a), O(n);
					var o = R(n, 2), s = F(o), c = L(s, !0), l = R(s, 2);
					J(l), O(o), O(t), B((e, t, r, s, u, d) => {
						X(n, "title", e), G(i, t), X(a, "min", $o.min), X(a, "max", $o.max), X(a, "placeholder", r), Y(a, V(A).nav.style?.padX ?? ""), X(o, "title", s), G(c, u), X(l, "min", es.min), X(l, "max", es.max), X(l, "placeholder", d), Y(l, V(A).nav.style?.gap ?? "");
					}, [
						() => Z("tip.nav.padX"),
						() => Z("lbl.navPadX"),
						() => Z("common.auto"),
						() => Z("tip.nav.gap"),
						() => Z("lbl.navGap"),
						() => Z("common.auto")
					]), H("change", a, (e) => ac(e, "padX", $o)), H("change", l, (e) => ac(e, "gap", es)), W(e, t);
				};
				K(Fe, (e) => {
					V($s) || e(Ie);
				}), O(De), O(Ce), O(xe), O(ve);
				var Le = R(ve, 4), Re = F(Le), ze = L(Re, !0), Be = R(Re, 2), Ve = F(Be), He = (e) => {
					var t = $h(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
					Kr(a, 21, () => [
						["", Z("common.none")],
						["bottom", Z("opt.navBorder.bottom")],
						["top", Z("opt.navBorder.top")],
						["both", Z("opt.navBorder.both")],
						["all", Z("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ j(() => h(V(t), 2));
						let r = () => V(n)[0], i = () => V(n)[1];
						var a = Gh();
						let o;
						var s = F(a);
						q(s, () => d[r()]);
						var c = L(R(s), !0);
						O(a), B(() => {
							o = mi(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(A).nav.style?.border?.side ?? "") === r() }), X(a, "aria-pressed", (V(A).nav.style?.border?.side ?? "") === r()), G(c, i());
						}), H("click", a, () => Qs("border", r() ? {
							...V(A).nav.style?.border ?? {},
							side: r()
						} : void 0)), W(e, a);
					}), O(a), O(n);
					var o = R(n, 2), s = (e) => {
						var t = Qh(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i);
						var a = R(i, 2), o = L(a, !0), s = R(a, 2);
						{
							let e = /* @__PURE__ */ j(() => V(A).nav.style.border.color ?? "text"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.borderColorPick"));
							va(s, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(n);
								},
								onchange: (e) => Qs("border", {
									...V(A).nav.style.border,
									color: e
								})
							});
						}
						O(t), B((e, t, s, c, l) => {
							X(n, "title", e), G(r, t), X(i, "title", s), Y(i, V(A).nav.style.border.width ?? 1), X(a, "title", c), G(o, l);
						}, [
							() => Z("tip.nav.borderWidth"),
							() => Z("lbl.navBorderWidth"),
							() => Z("tip.nav.borderWidth"),
							() => Z("tip.nav.borderColorPick"),
							() => Z("lbl.navBorderColor")
						]), H("change", i, (e) => {
							let t = fs(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...V(A).nav.style.border };
							t === 1 ? delete n.width : n.width = t, Qs("border", n), e.target.value = V(A).nav.style.border.width ?? 1;
						}), W(e, t);
					};
					K(o, (e) => {
						V(A).nav.style?.border?.side && e(s);
					}), B((e, t, r) => {
						X(n, "title", e), G(i, t), X(a, "aria-label", r);
					}, [
						() => Z("tip.nav.border"),
						() => Z("lbl.navBorder"),
						() => Z("lbl.navBorder")
					]), W(e, t);
				};
				K(Ve, (e) => {
					V($s) || e(He);
				});
				var Ue = R(Ve, 2), We = (e) => {
					{
						let t = /* @__PURE__ */ j(() => Z("lbl.navShadow")), n = /* @__PURE__ */ j(() => Z("tip.nav.shadow")), r = /* @__PURE__ */ j(() => V(A).nav.style?.shadow ?? ""), i = /* @__PURE__ */ j(() => [
							["", Z("common.none")],
							["soft", Z("opt.navShadow.soft")],
							["strong", Z("opt.navShadow.strong")]
						]);
						ws(e, {
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
							onchange: (e) => Qs("shadow", e || void 0)
						});
					}
				};
				K(Ue, (e) => {
					!V(ec) && !V($s) && e(We);
				}), O(Be), O(Le);
				var Ge = R(Le, 4), Ke = F(Ge), qe = L(Ke, !0), Je = R(Ke, 2), Ye = F(Je), Xe = (e) => {
					var t = tg(), n = F(t), r = L(n, !0), i = R(n, 2), a = F(i);
					J(a);
					var o = R(a);
					O(i);
					var s = R(i, 2), c = (e) => {
						var t = zp(), n = I(t);
						{
							let e = /* @__PURE__ */ j(() => Z("lbl.navScroll")), t = /* @__PURE__ */ j(() => Z("tip.nav.scroll")), r = /* @__PURE__ */ j(() => V(A).nav.scroll ?? "none"), i = /* @__PURE__ */ j(() => [
								["none", Z("opt.scroll.none")],
								["shrink", Z("opt.scroll.shrink")],
								["hide", Z("opt.scroll.hide")]
							]);
							ws(n, {
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
								onchange: (e) => fo("nav", () => {
									e === "none" ? delete V(A).nav.scroll : V(A).nav.scroll = e;
								})
							});
						}
						var r = R(n, 2), i = (e) => {
							var t = eg(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
							J(a);
							var o = L(R(a, 2));
							O(n);
							var s = R(n, 2), c = F(s), l = L(c, !0), u = R(c, 2);
							J(u);
							var d = L(R(u, 2));
							O(s);
							var f = R(s, 2), p = F(f), m = L(p, !0), h = R(p, 2);
							J(h);
							var g = L(R(h, 2));
							O(f);
							var _ = R(f, 2), v = (e) => {
								var t = em(), n = F(t);
								J(n);
								var r = R(n);
								O(t), B((e, i) => {
									X(t, "title", e), xi(n, V(A).nav.style?.shrinkLogo === !0), G(r, ` ${i ?? ""}`);
								}, [() => Z("tip.nav.shrinkLogo"), () => Z("lbl.navShrinkLogo")]), H("change", n, (e) => Qs("shrinkLogo", e.target.checked ? !0 : void 0)), W(e, t);
							};
							K(_, (e) => {
								(V(A).nav.logo?.type ?? "text") !== "text" && e(v);
							}), B((e, t, r, c, p, _, v, y) => {
								X(n, "title", e), G(i, t), Y(a, r), G(o, `${c ?? ""}%`), X(s, "title", p), G(l, _), Y(u, V(A).nav.style?.shrinkAt ?? 80), G(d, `${V(A).nav.style?.shrinkAt ?? 80 ?? ""} px`), X(f, "title", v), G(m, y), Y(h, V(A).nav.style?.shrinkMs ?? 220), G(g, `${V(A).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
							}, [
								() => Z("tip.nav.shrinkTo"),
								() => Z("lbl.navShrinkTo"),
								() => Math.round((V(A).nav.style?.shrinkTo ?? .5) * 100),
								() => Math.round((V(A).nav.style?.shrinkTo ?? .5) * 100),
								() => Z("tip.nav.shrinkAt"),
								() => Z("lbl.navShrinkAt"),
								() => Z("tip.nav.shrinkMs"),
								() => Z("lbl.navShrinkMs")
							]), H("input", a, (e) => kc(e.target.valueAsNumber)), H("input", u, (e) => Pc(e.target.valueAsNumber)), H("input", h, (e) => zc(e.target.valueAsNumber)), W(e, t);
						};
						K(r, (e) => {
							V(A).nav.scroll === "shrink" && e(i);
						}), W(e, t);
					};
					K(s, (e) => {
						V(A).nav.sticky !== !1 && e(c);
					});
					var l = R(s, 2), u = F(l);
					J(u);
					var d = R(u);
					O(l), O(t), B((e, t, n, s, c) => {
						G(r, e), X(i, "title", t), xi(a, V(A).nav.sticky !== !1), G(o, ` ${n ?? ""}`), X(l, "title", s), xi(u, V(A).nav.style?.atTop === "clear"), G(d, ` ${c ?? ""}`);
					}, [
						() => Z("group.navScrolling"),
						() => Z("tip.nav.sticky"),
						() => Z("lbl.navSticky"),
						() => Z("tip.nav.atTop"),
						() => Z("lbl.navAtTop")
					]), H("change", a, (e) => fo("nav", () => {
						V(A).nav.sticky = e.target.checked;
					})), H("change", u, (e) => Qs("atTop", e.target.checked ? "clear" : void 0)), W(e, t);
				};
				K(Ye, (e) => {
					V($s) || e(Xe);
				}), O(Je), O(Ge);
				var Ze = R(Ge, 4), Qe = F(Ze), k = L(Qe, !0), $e = R(Qe, 2), tt = F($e), nt = F(tt), rt = (e) => {
					var t = ng(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i), O(t), B((e, n, a) => {
						X(t, "title", e), G(r, n), X(i, "min", Zo.min), X(i, "max", Zo.max), X(i, "placeholder", a), Y(i, V(A).nav.style?.mobile?.padY ?? "");
					}, [
						() => Z("tip.nav.thickness"),
						() => Z("lbl.navThickness"),
						() => Z("lbl.navSameAsDesktop")
					]), H("change", i, (e) => Dc(e, "padY", Zo)), W(e, t);
				};
				K(nt, (e) => {
					V($s) || e(rt);
				});
				var it = R(nt, 2), at = F(it), ot = L(at, !0), st = R(at, 2);
				J(st), O(it), O(tt);
				var ct = R(tt, 2), lt = F(ct), ut = F(lt), dt = L(ut, !0), ft = R(ut, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ j(() => [["", Z("lbl.navSameAsDesktop")], ...ls.map((e) => [e, Z(`opt.size.${e}`)])]);
					Q(ft, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => oc("size", e || void 0)
					});
				}
				O(lt);
				var pt = R(lt, 2), mt = F(pt), ht = L(mt, !0), gt = R(mt, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ j(() => [
						["", Z("lbl.navSameAsDesktop")],
						["left", Z("common.left")],
						["center", Z("common.center")],
						["right", Z("common.right")]
					]);
					Q(gt, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => oc("layout", e || void 0)
					});
				}
				O(pt), O(ct);
				var _t = R(ct, 2), vt = F(_t), yt = F(vt), bt = L(yt, !0), xt = R(yt, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ j(() => [
						["", Z("lbl.navSameAsDesktop")],
						["start", Z("common.left")],
						["end", Z("common.right")]
					]);
					Q(xt, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => oc("tools", e ? { side: e } : void 0)
					});
				}
				O(vt);
				var St = R(vt, 2), Ct = (e) => {
					var t = rg(), n = F(t), r = L(n, !0), i = R(n, 2);
					{
						let e = /* @__PURE__ */ j(() => sc("overlay")), t = /* @__PURE__ */ j(() => [
							["", Z("lbl.navSameAsDesktop")],
							["on", Z("common.on")],
							["off", Z("common.off")]
						]);
						Q(i, {
							filled: !0,
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => cc("overlay", e)
						});
					}
					O(t), B((e, n) => {
						X(t, "title", e), G(r, n);
					}, [() => Z("tip.nav.mobileOverlay"), () => Z("lbl.navOverlay")]), W(e, t);
				};
				K(St, (e) => {
					!V(ec) && !V($s) && e(Ct);
				}), O(_t);
				var wt = R(_t, 2), Tt = F(wt), Et = F(Tt), Dt = L(Et, !0), Ot = R(Et, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ j(() => [
						["", Z("lbl.navSameAsDesktop")],
						["none", Z("common.none")],
						["bottom", Z("opt.navBorder.bottom")],
						["top", Z("opt.navBorder.top")],
						["both", Z("opt.navBorder.both")],
						["all", Z("opt.navBorder.all")]
					]);
					Q(Ot, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => lc(e)
					});
				}
				O(Tt), O(wt);
				var kt = R(wt, 2), At = (e) => {
					var t = Qh(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i);
					var a = R(i, 2), o = L(a, !0), s = R(a, 2);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.borderColorPick"));
						va(s, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => oc("border", {
								...V(A).nav.style.mobile.border,
								color: e
							})
						});
					}
					O(t), B((e, t, s, c, l) => {
						X(n, "title", e), G(r, t), X(i, "title", s), Y(i, V(A).nav.style.mobile.border.width ?? 1), X(a, "title", c), G(o, l);
					}, [
						() => Z("tip.nav.borderWidth"),
						() => Z("lbl.navBorderWidth"),
						() => Z("tip.nav.borderWidth"),
						() => Z("tip.nav.borderColorPick"),
						() => Z("lbl.navBorderColor")
					]), H("change", i, (e) => {
						let t = fs(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...V(A).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, oc("border", n), e.target.value = V(A).nav.style.mobile.border.width ?? 1;
					}), W(e, t);
				};
				K(kt, (e) => {
					V(A).nav.style?.mobile?.border?.side && V(A).nav.style.mobile.border.side !== "none" && e(At);
				});
				var jt = R(kt, 2), Mt = F(jt), Nt = F(Mt), Pt = L(Nt, !0), Ft = R(Nt, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ j(() => [["dropdown", Z("opt.mobileMenu.dropdown")], ["sheet", Z("opt.mobileMenu.sheet")]]);
					Q(Ft, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => Qs("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				O(Mt);
				var It = R(Mt, 2), Lt = (e) => {
					var t = rg(), n = F(t), r = L(n, !0), i = R(n, 2);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ j(() => [
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
							onchange: (e) => Qs("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					O(t), B((e, n) => {
						X(t, "title", e), G(r, n);
					}, [() => Z("tip.nav.sheetMotion"), () => Z("lbl.sheetMotion")]), W(e, t);
				};
				K(It, (e) => {
					V(A).nav.style?.mobileMenu === "sheet" && e(Lt);
				}), O(jt);
				var Rt = R(jt, 2), zt = (e) => {
					var t = ig(), n = I(t), r = F(n);
					J(r);
					var i = R(r);
					O(n);
					var a = R(n, 2), o = (e) => {
						var t = em(), n = F(t);
						J(n);
						var r = R(n);
						O(t), B((e, i) => {
							X(t, "title", e), xi(n, V(A).nav.style?.sheetTheme === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetTheme"), () => Z("lbl.sheetTheme")]), H("change", n, (e) => Qs("sheetTheme", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(a, (e) => {
						V(A).theme?.alt?.tokens && V(A).nav.style?.tools?.theme !== !1 && e(o);
					});
					var s = R(a, 2), c = (e) => {
						var t = em(), n = F(t);
						J(n);
						var r = R(n);
						O(t), B((e, i) => {
							X(t, "title", e), xi(n, V(A).nav.style?.sheetCart === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetCart"), () => Z("lbl.sheetCart")]), H("change", n, (e) => Qs("sheetCart", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(s, (e) => {
						V(A).nav.cart?.show && e(c);
					});
					var l = R(s, 2), u = (e) => {
						var t = em(), n = F(t);
						J(n);
						var r = R(n);
						O(t), B((e, i) => {
							X(t, "title", e), xi(n, V(A).nav.style?.sheetAnnounce === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetAnnounce"), () => Z("lbl.sheetAnnounce")]), H("change", n, (e) => Qs("sheetAnnounce", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(l, (e) => {
						V(A).nav.announcement?.show && e(u);
					});
					var d = R(l, 2), f = (e) => {
						var t = em(), n = F(t);
						J(n);
						var r = R(n);
						O(t), B((e, i) => {
							X(t, "title", e), xi(n, V(A).nav.style?.sheetToolLabels === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetToolLabels"), () => Z("lbl.sheetToolLabels")]), H("change", n, (e) => Qs("sheetToolLabels", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(d, (e) => {
						(V(A).nav.style?.sheetTheme || V(A).nav.style?.sheetCart) && e(f);
					});
					var p = R(d, 2), m = F(p), h = L(m, !0), g = R(m, 2);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.sheetBg"));
						va(g, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => wc("bg", e)
						});
					}
					var _ = R(g, 2);
					J(_);
					var v = L(R(_, 2));
					O(p);
					var y = R(p, 2), b = F(y);
					J(b);
					var x = R(b);
					O(y);
					var S = R(y, 2), C = F(S), w = R(C);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.sheet?.textColor ?? V(A).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.sheetTextColorPick"));
						va(w, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => wc("textColor", e)
						});
					}
					O(S), B((e, t, a, o, s, c, l, u, d, f) => {
						X(n, "title", e), xi(r, V(A).nav.style?.sheetLogo === !0), G(i, ` ${t ?? ""}`), X(p, "title", a), G(h, o), X(_, "title", s), Y(_, c), G(v, `${l ?? ""}%`), X(y, "title", u), xi(b, V(A).nav.style?.sheet?.blur ?? V(A).nav.style?.blur !== !1), G(x, ` ${d ?? ""}`), G(C, `${f ?? ""} `);
					}, [
						() => Z("tip.nav.sheetLogo"),
						() => Z("lbl.sheetLogo"),
						() => Z("tip.nav.sheetBg"),
						() => Z("lbl.background"),
						() => Z("tip.nav.sheetOpacity"),
						() => Math.round((V(A).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Math.round((V(A).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Z("tip.nav.sheetBlur"),
						() => Z("lbl.sheetBlur"),
						() => Z("lbl.textColor")
					]), H("change", r, (e) => Qs("sheetLogo", e.target.checked ? !0 : void 0)), H("input", _, (e) => wc("bgOpacity", e.target.valueAsNumber / 100)), H("change", b, (e) => wc("blur", e.target.checked)), W(e, t);
				};
				K(Rt, (e) => {
					V(A).nav.style?.mobileMenu === "sheet" && e(zt);
				});
				var Bt = R(Rt, 2), Vt = (e) => {
					var t = rg(), n = F(t), r = L(n, !0), i = R(n, 2);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ j(() => [["collapsed", Z("opt.mobileSubs.collapsed")], ["expanded", Z("opt.mobileSubs.expanded")]]);
						Q(i, {
							filled: !0,
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Qs("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					O(t), B((e, n) => {
						X(t, "title", e), G(r, n);
					}, [() => Z("tip.nav.mobileSubs"), () => Z("lbl.mobileSubs")]), W(e, t);
				}, Ht = /* @__PURE__ */ j(() => V(A).nav.items?.some((e) => e.children?.length));
				K(Bt, (e) => {
					V(Ht) && e(Vt);
				}), O($e), O(Ze);
				var Ut = R(Ze, 4), Wt = F(Ut), Gt = L(Wt, !0), M = R(Wt, 2), Kt = F(M), qt = F(Kt), Jt = L(qt, !0), Yt = R(qt, 2);
				Kr(Yt, 21, () => [
					["standard", Z("opt.hover.standard")],
					["underline", Z("opt.hover.underline")],
					["pill", Z("opt.hover.pill")],
					["lift-plain", Z("opt.hover.liftPlain")],
					["lift", Z("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = ag();
					let o;
					var s = F(a), c = L(s, !0), l = L(R(s), !0);
					O(a), B((e) => {
						o = mi(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (V(A).nav.style?.hover ?? "standard") === r() }), X(a, "aria-pressed", (V(A).nav.style?.hover ?? "standard") === r()), mi(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), G(c, e), G(l, i());
					}, [() => Z("seed.home")]), H("click", a, () => Zc(r())), W(e, a);
				}), O(Yt), O(Kt);
				var Xt = R(Kt, 2), P = (e) => {
					var t = og(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i);
					var a = L(R(i, 2));
					O(t), B((e, n, o) => {
						X(t, "title", e), G(r, n), Y(i, V(A).nav.style?.hoverGlow ?? .6), G(a, `${o ?? ""}%`);
					}, [
						() => Z("tip.nav.hoverGlow"),
						() => Z("lbl.glowStrength"),
						() => Math.round((V(A).nav.style?.hoverGlow ?? .6) * 100)
					]), H("input", i, (e) => Qs("hoverGlow", Number(e.target.value))), W(e, t);
				};
				K(Xt, (e) => {
					V(A).nav.style?.hover === "lift" && e(P);
				});
				var Zt = R(Xt, 2), Qt = F(Zt), $t = (e) => {
					var t = Im(), n = F(t);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ j(Fi);
						va(n, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(Vc)[1];
							},
							onchange: (e) => Qs("hoverColor", e)
						});
					}
					var r = L(R(n, 2), !0);
					O(t), B(() => {
						X(t, "title", V(Vc)[1]), G(r, V(Vc)[0]);
					}), W(e, t);
				};
				K(Qt, (e) => {
					V(Vc) && e($t);
				});
				var en = R(Qt, 2), tn = F(en);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.hoverTextColorPick"));
					va(tn, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => Qs("hoverTextColor", e)
					});
				}
				var nn = L(R(tn, 2), !0);
				O(en);
				var rn = R(en, 2), an = F(rn);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.textColorPick"));
					va(an, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => Qs("textColor", e)
					});
				}
				var on = L(R(an, 2), !0);
				O(rn), O(Zt);
				var sn = R(Zt, 2), cn = F(sn);
				J(cn);
				var z = R(cn);
				O(sn), O(M), O(Ut);
				var ln = R(Ut, 4), un = F(ln), dn = L(un, !0), fn = R(un, 2), pn = F(fn);
				a(pn, () => Ai, () => V(A).nav?.style?.background?.layers ?? []), O(fn), O(ln), O(ee), O(b);
				var mn = R(b, 2), hn = F(mn), gn = L(hn, !0), _n = R(hn, 2), vn = F(_n), yn = F(vn);
				J(yn);
				var bn = R(yn);
				O(vn);
				var xn = R(vn, 2), Sn = (e) => {
					var t = cg(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
					J(a), O(n);
					var o = R(n, 2), s = F(o), c = R(s);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.announcement?.page ?? (V(A).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ j(() => [
							["", Z("common.none")],
							...V(A).pages.map((e) => [e.id, e.title]),
							["custom", Z("opt.announceLink.custom")]
						]);
						Q(c, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => fo("edit:nav-announce-link", () => {
								let t = { ...V(A).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), V(A).nav.announcement = t;
							})
						});
					}
					O(o);
					var l = R(o, 2), u = (e) => {
						var t = sg(), n = F(t), r = L(n, !0), i = R(n, 2);
						J(i), O(t), B((e, n) => {
							X(t, "title", e), G(r, n), Y(i, V(A).nav.announcement?.href ?? "");
						}, [() => Z("tip.nav.announceHref"), () => Z("lbl.announceHref")]), H("change", i, (e) => uc("href", e.target.value.trim())), W(e, t);
					};
					K(l, (e) => {
						V(A).nav.announcement?.href !== void 0 && !V(A).nav.announcement?.page && e(u);
					});
					var d = R(l, 2), f = (e) => {
						var t = em(), n = F(t);
						J(n);
						var r = R(n);
						O(t), B((e, i) => {
							X(t, "title", e), xi(n, V(A).nav.announcement?.sticky !== !1), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.announceSticky"), () => Z("lbl.announceSticky")]), H("change", n, (e) => uc("sticky", e.target.checked ? void 0 : !1)), W(e, t);
					};
					K(d, (e) => {
						V(A).nav.sticky !== !1 && !V(ec) && !V($s) && !V(A).nav.overlay && e(f);
					});
					var p = R(d, 2), m = (e) => {
						var t = em(), n = F(t);
						J(n);
						var r = R(n);
						O(t), B((e, i) => {
							X(t, "title", e), xi(n, V(A).nav.announcement?.followNav === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.announceFollowNav"), () => Z("lbl.announceFollowNav")]), H("change", n, (e) => uc("followNav", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(p, (e) => {
						V(A).nav.scroll === "hide" && V(A).nav.sticky !== !1 && !V($s) && V(A).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = R(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ j(() => Z("lbl.announcePlace")), n = /* @__PURE__ */ j(() => Z("tip.nav.announcePlace")), r = /* @__PURE__ */ j(() => V(A).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ j(() => [
								["nav", Z("opt.announcePlace.nav")],
								["page", Z("opt.announcePlace.page")],
								["content", Z("opt.announcePlace.content")]
							]);
							ws(e, {
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
								onchange: (e) => uc("place", e === "nav" ? void 0 : e)
							});
						}
					};
					K(h, (e) => {
						V($s) && e(g);
					});
					var _ = R(h, 2), v = F(_);
					J(v);
					var y = R(v);
					O(_);
					var b = R(_, 2), x = (e) => {
						var t = nm(), n = L(t, !0);
						B((e, r) => {
							X(t, "title", e), G(n, r);
						}, [() => Z("tip.nav.announceShowAgain"), () => Z("lbl.announceShowAgain")]), H("click", t, () => et?.sendAnnounceReset()), W(e, t);
					};
					K(b, (e) => {
						V(A).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = R(b, 2), C = F(S), w = R(C);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.announceColor"));
						va(w, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => uc("color", e)
						});
					}
					O(S);
					var ee = R(S, 2), T = F(ee), te = R(T);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.announceTextColor"));
						va(te, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => uc("textColor", e)
						});
					}
					O(ee), B((e, t, r, c, l, u, d, f, p, m) => {
						X(n, "title", e), G(i, t), Y(a, V(A).nav.announcement?.text ?? ""), X(o, "title", r), G(s, `${c ?? ""} `), X(_, "title", l), xi(v, V(A).nav.announcement?.dismiss !== !1), G(y, ` ${u ?? ""}`), X(S, "title", d), G(C, `${f ?? ""} `), X(ee, "title", p), G(T, `${m ?? ""} `);
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
					]), H("change", a, (e) => uc("text", e.target.value.trim() || void 0)), H("change", v, (e) => uc("dismiss", e.target.checked ? void 0 : !1)), W(e, t);
				};
				K(xn, (e) => {
					V(A).nav.announcement?.show && e(Sn);
				}), O(_n), O(mn);
				var Cn = R(mn, 2), wn = F(Cn), Tn = L(wn, !0), En = R(wn, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = lg(), i = F(r);
						q(i, () => T.up, !0), O(i);
						var a = R(i, 2);
						q(a, () => T.down, !0), O(a), O(r), B((e, t) => {
							X(i, "title", e), i.disabled = n() === 0, X(a, "title", t), a.disabled = n() === V(Ys).length - 1;
						}, [() => Z("tip.moveUp"), () => Z("tip.moveDown")]), H("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), Xs(t(), -1);
						}), H("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), Xs(t(), 1);
						}), W(e, r);
					};
					var Dn = F(En), On = (e) => {
						var t = zp(), n = I(t);
						{
							let e = /* @__PURE__ */ j(() => Z("lbl.toolsSide")), t = /* @__PURE__ */ j(() => Z("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ j(() => V(A).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ j(() => [["start", Z("opt.toolsSide.top")], ["end", Z("opt.toolsSide.bottom")]]);
							ws(n, {
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
								onchange: (e) => Zs("side", e === "start" ? "start" : void 0)
							});
						}
						var r = R(n, 2);
						{
							let e = /* @__PURE__ */ j(() => Z("lbl.toolsAlign")), t = /* @__PURE__ */ j(() => Z("tip.nav.toolsAlign")), n = /* @__PURE__ */ j(() => V(A).nav.style?.tools?.align ?? "center"), i = /* @__PURE__ */ j(() => [
								["start", Z("opt.toolsAlign.start")],
								["center", Z("opt.toolsAlign.center")],
								["end", Z("opt.toolsAlign.end")],
								["spread", Z("opt.toolsAlign.spread")]
							]);
							ws(r, {
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
								onchange: (e) => Zs("align", e === "center" ? void 0 : e)
							});
						}
						W(e, t);
					}, kn = (e) => {
						{
							let t = /* @__PURE__ */ j(() => Z("lbl.toolsSide")), n = /* @__PURE__ */ j(() => Z("tip.nav.toolsSide")), r = /* @__PURE__ */ j(() => V(A).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ j(() => [["start", Z("opt.toolsSide.start")], ["end", Z("opt.toolsSide.end")]]);
							ws(e, {
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
								onchange: (e) => Zs("side", e === "start" ? "start" : void 0)
							});
						}
					};
					K(Dn, (e) => {
						V($s) ? e(On) : e(kn, -1);
					}), Kr(R(Dn, 2), 18, () => V(Ys), (e) => e, (t, n, r) => {
						var i = jr(), a = I(i), o = (t) => {
							var i = jr(), a = I(i), o = (t) => {
								var i = ug(), a = F(i), o = F(a), s = L(o, !0), c = R(o);
								e(c, () => n, () => V(r)), O(a);
								var l = R(a, 2), u = F(l);
								J(u);
								var d = R(u);
								O(l), O(i), B((e, t, n) => {
									G(s, e), X(l, "title", t), xi(u, V(A).nav.style?.tools?.theme !== !1), G(d, ` ${n ?? ""}`);
								}, [
									() => Z("lbl.themeToggle"),
									() => Z("tip.nav.themeToggle"),
									() => Z("lbl.showInMenu")
								]), H("change", u, (e) => Zs("theme", e.target.checked ? void 0 : !1)), W(t, i);
							};
							K(a, (e) => {
								V(A).theme?.alt?.tokens && e(o);
							}), W(t, i);
						}, s = (t) => {
							var i = dg(), a = F(i), o = F(a), s = L(o, !0), c = R(o);
							e(c, () => n, () => V(r)), O(a);
							var l = R(a, 2), u = F(l);
							J(u);
							var d = R(u);
							O(l);
							var f = R(l, 2), p = (e) => {
								var t = rg(), n = F(t), r = L(n, !0), i = R(n, 2);
								{
									let e = /* @__PURE__ */ j(() => V(A).nav.cart?.href ?? ""), t = /* @__PURE__ */ j(() => [["", Z("common.none")], ...V(A).pages.map((e) => [e.path, e.title])]);
									Q(i, {
										filled: !0,
										get value() {
											return V(e);
										},
										get options() {
											return V(t);
										},
										onchange: (e) => fo("nav", () => {
											e ? V(A).nav.cart.href = e : delete V(A).nav.cart.href;
										})
									});
								}
								O(t), B((e, n) => {
									X(t, "title", e), G(r, n);
								}, [() => Z("tip.cart.checkout"), () => Z("lbl.checkoutPage")]), W(e, t);
							};
							K(f, (e) => {
								V(A).nav.cart?.show && e(p);
							}), O(i), B((e, t, n) => {
								G(s, e), X(l, "title", t), xi(u, V(A).nav.cart?.show === !0), G(d, ` ${n ?? ""}`);
							}, [
								() => Z("lbl.cart"),
								() => Z("tip.nav.cart"),
								() => Z("lbl.showInMenu")
							]), H("change", u, (e) => fo("nav", () => {
								e.target.checked ? V(A).nav.cart = {
									...V(A).nav.cart ?? {},
									show: !0
								} : delete V(A).nav.cart;
							})), W(t, i);
						}, c = (t) => {
							var i = bg(), a = F(i), o = F(a), s = F(o, !0), c = R(s);
							e(c, () => n, () => V(r)), O(o), O(a);
							var l = R(a, 2), u = F(l), d = F(u);
							J(d);
							var f = R(d);
							O(u);
							var p = R(u, 2), m = (e) => {
								var t = yg(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
								Kr(a, 21, () => V(Kc), ([e, t]) => e, (e, t) => {
									var n = /* @__PURE__ */ j(() => h(V(t), 2));
									let r = () => V(n)[0], i = () => V(n)[1];
									var a = Gh();
									let o;
									var s = F(a);
									q(s, () => g[r()]);
									var c = L(R(s), !0);
									O(a), B(() => {
										o = mi(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(A).nav.launcher?.view ?? "grid") === r() }), X(a, "aria-pressed", (V(A).nav.launcher?.view ?? "grid") === r()), G(c, i());
									}), H("click", a, () => hc("view", r() === "grid" ? void 0 : r())), W(e, a);
								}), O(a), O(n);
								var o = R(n, 2);
								{
									let e = /* @__PURE__ */ j(() => Z("lbl.launcherMobileView")), t = /* @__PURE__ */ j(() => Z("tip.nav.launcherMobileView")), n = /* @__PURE__ */ j(() => V(A).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ j(() => [["", Z("lbl.navSameAsDesktop")], ...V(Kc)]);
									ws(o, {
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
											return V(r);
										},
										onchange: (e) => hc("mobileView", e || void 0)
									});
								}
								var s = R(o, 2), c = F(s), l = L(c, !0), u = R(c, 2);
								J(u);
								var d = L(R(u, 2), !0);
								O(s);
								var f = R(s, 2), p = F(f);
								J(p);
								var m = R(p);
								O(f);
								var _ = R(f, 2), v = (e) => {
									var t = fg(), n = F(t), r = L(n, !0), i = R(n, 2);
									J(i), O(t), B((e, n, a) => {
										X(t, "title", e), G(r, n), X(i, "placeholder", a), Y(i, V(A).nav.launcher?.title ?? "");
									}, [
										() => Z("tip.nav.launcherTitleText"),
										() => Z("lbl.launcherTitle"),
										() => Z("ph.launcherTitle")
									]), H("change", i, (e) => hc("title", e.target.value.trim() || void 0)), W(e, t);
								};
								K(_, (e) => {
									V(A).nav.launcher?.showTitle !== !1 && e(v);
								});
								var y = R(_, 2), b = F(y), x = L(b, !0), S = R(b, 2), C = F(S);
								{
									let e = /* @__PURE__ */ j(() => V(A).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ j(() => V(A).nav.launcher?.image ?? ""), n = /* @__PURE__ */ j(pc), r = /* @__PURE__ */ j(() => Z("opt.launcherDots")), i = /* @__PURE__ */ j(() => Z("tip.nav.launcherIcon"));
									ko(C, {
										get icon() {
											return V(e);
										},
										get image() {
											return V(t);
										},
										get images() {
											return V(n);
										},
										klass: "lbtn-mark",
										get noneLabel() {
											return V(r);
										},
										get label() {
											return V(i);
										},
										onpick: (e) => mc(null, e),
										onfile: (e) => Cc(e, null),
										children: (e, t) => {
											var n = jr(), r = I(n), i = (e) => {
												var t = pg();
												B(() => X(t, "src", V(A).nav.launcher.image)), W(e, t);
											}, a = (e) => {
												var t = jr();
												q(I(t), () => eo(V(A).nav.launcher.icon) || ""), W(e, t);
											}, o = (e) => {
												var t = jr();
												q(I(t), () => dc), W(e, t);
											};
											K(r, (e) => {
												V(A).nav.launcher?.image ? e(i) : V(A).nav.launcher?.icon ? e(a, 1) : e(o, -1);
											}), W(e, n);
										},
										$$slots: { default: !0 }
									});
								}
								var w = R(C, 2), ee = F(w), te = (e) => {
									var t = Ar();
									B((e) => G(t, e), [() => Z("mp.ownImage")]), W(e, t);
								}, ne = (e) => {
									var t = Ar();
									B((e) => G(t, e), [() => Z(Qa[V(A).nav.launcher.icon]?.labelKey ?? "common.none")]), W(e, t);
								}, re = (e) => {
									var t = Ar();
									B((e) => G(t, e), [() => Z("opt.launcherDots")]), W(e, t);
								};
								K(ee, (e) => {
									V(A).nav.launcher?.image ? e(te) : V(A).nav.launcher?.icon ? e(ne, 1) : e(re, -1);
								}), O(w), O(S), O(y);
								var ie = R(y, 2);
								Kr(ie, 17, () => V(A).nav.launcher?.links ?? [], Hr, (e, t, n) => {
									let r = /* @__PURE__ */ j(() => !qu(V(t).href ?? ""));
									var i = vg();
									let a;
									var o = F(i), s = F(o), c = F(s), l = (e) => {
										var n = Hh();
										B(() => X(n, "src", V(t).image)), W(e, n);
									}, u = (e) => {
										var n = jr();
										q(I(n), () => eo(V(t).icon) || ""), W(e, n);
									};
									K(c, (e) => {
										V(t).image ? e(l) : e(u, -1);
									}), O(s);
									var d = R(s, 2), f = L(d, !0), p = R(d, 2), m = (e) => {
										var t = mg();
										q(t, () => T.warn, !0), O(t), B((e) => X(t, "title", e), [() => Z("tip.badTarget")]), W(e, t);
									};
									K(p, (e) => {
										V(r) && e(m);
									});
									var h = R(p, 2), g = F(h);
									g.disabled = n === 0, q(g, () => T.up, !0), O(g);
									var _ = R(g, 2);
									q(_, () => T.down, !0), O(_), O(h);
									var v = R(h, 2);
									q(v, () => T.caret, !0), O(v), O(o);
									var y = R(o, 2), b = (e) => {
										var i = _g(), a = F(i);
										{
											let e = /* @__PURE__ */ j(() => V(t).icon ?? ""), r = /* @__PURE__ */ j(() => V(t).image ?? ""), i = /* @__PURE__ */ j(pc), o = /* @__PURE__ */ j(() => Z("mp.pickMark"));
											ko(a, {
												get icon() {
													return V(e);
												},
												get image() {
													return V(r);
												},
												get images() {
													return V(i);
												},
												klass: "lrow-tile",
												get label() {
													return V(o);
												},
												onpick: (e) => mc(n, e),
												onfile: (e) => Cc(e, n),
												children: (e, n) => {
													var r = hg(), i = I(r), a = F(i), o = (e) => {
														var n = Hh();
														B(() => X(n, "src", V(t).image)), W(e, n);
													}, s = (e) => {
														var n = jr();
														q(I(n), () => eo(V(t).icon) || ""), W(e, n);
													};
													K(a, (e) => {
														V(t).image ? e(o) : V(t).icon && e(s, 1);
													}), O(i);
													var c = L(R(i, 2), !0);
													B((e) => G(c, e), [() => V(t).label || Z("seed.link")]), W(e, r);
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
											var t = gg(), n = L(t, !0);
											B((e) => G(n, e), [() => Z("ui.badTarget")]), W(e, t);
										};
										K(u, (e) => {
											V(r) && e(d);
										});
										var f = R(u, 2), p = F(f);
										{
											let e = /* @__PURE__ */ j(() => V(t).icon ?? ""), r = /* @__PURE__ */ j(() => V(t).image ?? ""), i = /* @__PURE__ */ j(pc), a = /* @__PURE__ */ j(() => Z("mp.pickMark"));
											ko(p, {
												get icon() {
													return V(e);
												},
												get image() {
													return V(r);
												},
												get images() {
													return V(i);
												},
												klass: "linkish",
												get label() {
													return V(a);
												},
												onpick: (e) => mc(n, e),
												onfile: (e) => Cc(e, n),
												children: (e, t) => {
													Ee();
													var n = Ar();
													B((e) => G(n, e), [() => Z("mp.changeMark")]), W(e, n);
												},
												$$slots: { default: !0 }
											});
										}
										var m = R(p, 2), h = L(m, !0);
										O(f), O(o), O(i), B((e, n, i, a, o, u) => {
											Y(s, V(t).label), X(s, "title", e), X(s, "placeholder", n), l = mi(c, 1, "field-filled svelte-1n46o8q", null, l, { "bad-target": V(r) }), Y(c, V(t).href ?? ""), X(c, "placeholder", i), X(c, "title", a), X(m, "title", o), G(h, u);
										}, [
											() => Z("tip.nav.launcherLabel"),
											() => Z("lbl.text"),
											() => Z("ph.hrefAnchor"),
											() => V(r) ? Z("tip.badTarget") : Z("tip.hrefAnchor"),
											() => Z("tip.removeLink"),
											() => Z("ui.remove")
										]), H("change", s, (e) => Sc(n, "label", e.target.value)), H("change", c, (e) => Sc(n, "href", e.target.value)), H("click", m, () => _c(n)), W(e, i);
									};
									K(y, (e) => {
										V(fc) === n && e(b);
									}), O(i), B((e, t, r) => {
										a = mi(i, 1, "lrow svelte-1n46o8q", null, a, { open: V(fc) === n }), G(f, e), X(g, "title", t), X(_, "title", r), _.disabled = n === V(A).nav.launcher.links.length - 1;
									}, [
										() => V(t).label || Z("seed.link"),
										() => Z("tip.moveUp"),
										() => Z("tip.moveDown")
									]), H("click", o, () => N(fc, V(fc) === n ? null : n, !0)), H("keydown", o, (e) => {
										(e.key === "Enter" || e.key === " ") && (e.preventDefault(), N(fc, V(fc) === n ? null : n, !0));
									}), H("click", h, (e) => e.stopPropagation()), H("keydown", h, (e) => e.stopPropagation()), H("click", g, () => vc(n, -1)), H("click", _, () => vc(n, 1)), W(e, i);
								});
								var ae = R(ie, 2), oe = L(ae, !0);
								B((e, t, n, r, o, c, h, g) => {
									G(i, e), X(a, "aria-label", t), X(s, "title", n), G(l, r), Y(u, V(A).nav.launcher?.mobileMax ?? 6), G(d, V(A).nav.launcher?.mobileMax ?? 6), X(f, "title", o), xi(p, V(A).nav.launcher?.showTitle !== !1), G(m, ` ${c ?? ""}`), G(x, h), G(oe, g);
								}, [
									() => Z("lbl.design"),
									() => Z("lbl.design"),
									() => Z("tip.nav.launcherMobileMax"),
									() => Z("lbl.launcherMobileMax"),
									() => Z("tip.nav.launcherTitle"),
									() => Z("lbl.launcherShowTitle"),
									() => Z("lbl.launcherButton"),
									() => Z("ui.addLauncherLink")
								]), H("input", u, (e) => hc("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), H("change", p, (e) => hc("showTitle", e.target.checked ? void 0 : !1)), H("click", ae, gc), W(e, t);
							};
							K(p, (e) => {
								V(A).nav.launcher?.show === !0 && e(m);
							}), O(l), O(i), B((e, t, n, r) => {
								X(a, "title", e), G(s, t), X(u, "title", n), xi(d, V(A).nav.launcher?.show === !0), G(f, ` ${r ?? ""}`);
							}, [
								() => Z("tip.nav.launcher"),
								() => Z("group.launcher"),
								() => Z("tip.nav.launcher"),
								() => Z("lbl.showInMenu")
							]), H("change", d, (e) => hc("show", e.target.checked ? !0 : void 0)), W(t, i);
						};
						K(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), W(t, i);
					}), O(En);
				}
				O(Cn);
				var An = R(Cn, 2), jn = F(An), Mn = L(jn, !0), Nn = R(jn, 2), Pn = F(Nn), Fn = F(Pn), In = L(Fn, !0), Ln = R(Fn, 2);
				let Rn;
				Kr(Ln, 21, () => V(qc), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = Gh();
					let o;
					var s = F(a);
					q(s, () => m[r()]);
					var c = L(R(s), !0);
					O(a), B(() => {
						o = mi(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(A).nav.style?.subStyle ?? "card") === r() }), X(a, "aria-pressed", (V(A).nav.style?.subStyle ?? "card") === r()), G(c, i());
					}), H("click", a, () => Qs("subStyle", r() === "card" ? void 0 : r())), W(e, a);
				}), O(Ln), O(Pn);
				var zn = R(Pn, 2), Bn = (e) => {
					var t = zp(), n = I(t), r = (e) => {
						var t = zp(), n = I(t);
						{
							let e = /* @__PURE__ */ j(() => Z("lbl.sideSubs")), t = /* @__PURE__ */ j(() => Z("tip.nav.sideSubs")), r = /* @__PURE__ */ j(() => V(A).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ j(() => [["collapsed", Z("opt.mobileSubs.collapsed")], ["expanded", Z("opt.mobileSubs.expanded")]]);
							ws(n, {
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
								onchange: (e) => Qs("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = R(n, 2), i = (e) => {
							var t = em(), n = F(t);
							J(n);
							var r = R(n);
							O(t), B((e, i) => {
								X(t, "title", e), xi(n, V(A).nav.style?.sideSubArrow === !0), G(r, ` ${i ?? ""}`);
							}, [() => Z("tip.nav.sideSubArrow"), () => Z("lbl.sideSubArrow")]), H("change", n, (e) => Qs("sideSubArrow", e.target.checked ? !0 : void 0)), W(e, t);
						};
						K(r, (e) => {
							V(A).nav.style?.sideSubs === "expanded" && e(i);
						}), W(e, t);
					};
					K(n, (e) => {
						V($s) && e(r);
					});
					var i = R(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ j(() => Z("lbl.subOpen")), n = /* @__PURE__ */ j(() => Z("tip.nav.subOpen")), r = /* @__PURE__ */ j(() => V(A).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ j(() => [
								["hover", Z("opt.subOpen.hover")],
								["stay", Z("opt.subOpen.stay")],
								["click", Z("opt.subOpen.click")]
							]);
							ws(e, {
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
								onchange: (e) => Qs("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					K(i, (e) => {
						(!V($s) || V(A).nav.style?.sideSubs !== "expanded") && e(a);
					}), W(e, t);
				}, Vn = /* @__PURE__ */ j(() => V(A).nav.items?.some((e) => e.children?.length));
				K(zn, (e) => {
					V(Vn) && e(Bn);
				});
				var Hn = R(zn, 2), Un = (e) => {
					var t = gp(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.nav.subPillColorPick"));
						va(r, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => Qs("subPillColor", e)
						});
					}
					O(t), B((e, r) => {
						X(t, "title", e), G(n, `${r ?? ""} `);
					}, [() => Z("tip.nav.subPillColor"), () => Z("lbl.subPillColor")]), W(e, t);
				};
				K(Hn, (e) => {
					V(A).nav.style?.subStyle === "pills" && e(Un);
				});
				var Wn = R(Hn, 2), Gn = F(Wn), Kn = R(Gn);
				J(Kn), O(Wn), O(Nn), O(An);
				var qn = R(An, 2), Jn = F(qn), Yn = L(Jn, !0), Xn = R(Jn, 2);
				{
					let e = (e, t = f) => {
						let n = /* @__PURE__ */ j(Gd);
						var r = xg();
						let i;
						var a = F(r);
						q(a, () => Xd, !0), O(a);
						var o = R(a, 2), s = F(o), c = L(s, !0), l = L(R(s, 2), !0);
						O(o), O(r), B(() => {
							i = mi(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), G(c, V(n).label), G(l, V(n).target);
						}), W(e, r);
					};
					var Zn = F(Xn);
					Kr(Zn, 21, () => V(A).nav.items, Hr, (t, n, r) => {
						let i = /* @__PURE__ */ j(() => `${r}`);
						var a = Tg(), o = I(a), s = (t) => {
							e(t, () => !1);
						};
						K(o, (e) => {
							V(Vd)?.key === V(i) && V(Vd).pos === "before" && e(s);
						});
						var c = R(o, 2);
						let l;
						var u = F(c);
						q(u, () => Xd, !0), O(u);
						var d = R(u, 2), f = F(d);
						J(f);
						var p = R(f, 2), m = F(p);
						{
							let e = /* @__PURE__ */ j(() => V(n).page ?? (V(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ j(() => Z("tip.linkTarget")), i = /* @__PURE__ */ j(() => [
								...V(A).pages.map((e) => [e.id, e.title]),
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
								onchange: (e) => Pd(r, e)
							});
						}
						var h = R(m, 2), g = (e) => {
							var t = Sg();
							J(t), B((e, r) => {
								Y(t, V(n).href), X(t, "placeholder", e), X(t, "title", r);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => Fd(r, e.target.value)), W(e, t);
						};
						K(h, (e) => {
							!V(n).page && V(n).href != null && e(g);
						}), O(p), O(d);
						var _ = R(d, 2), v = (e) => {
							var t = Cg();
							q(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), O(t), B((e) => X(t, "title", e), [() => Z("tip.nav.hasSubmenu")]), W(e, t);
						};
						K(_, (e) => {
							V(n).children?.length && e(v);
						});
						var y = R(_, 2), b = F(y);
						q(b, () => T.plus, !0), O(b);
						var x = R(b, 2);
						x.disabled = r === 0, q(x, () => T.up, !0), O(x);
						var S = R(x, 2);
						q(S, () => T.cross, !0), O(S);
						var C = R(S, 2);
						q(C, () => T.down, !0), O(C), O(y);
						var w = R(y, 2);
						q(w, () => T.kebab, !0), O(w), O(c);
						var ee = R(c, 2);
						Kr(ee, 17, () => V(n).children ?? [], Hr, (t, i, a) => {
							let o = /* @__PURE__ */ j(() => `${r}.${a}`);
							var s = wg(), c = I(s), l = (t) => {
								e(t, () => !0);
							};
							K(c, (e) => {
								V(Vd)?.key === V(o) && V(Vd).pos === "before" && e(l);
							});
							var u = R(c, 2);
							let d;
							var f = F(u);
							q(f, () => Xd, !0), O(f);
							var p = R(f, 2), m = F(p);
							J(m);
							var h = R(m, 2), g = F(h);
							{
								let e = /* @__PURE__ */ j(() => V(i).page ?? "__href"), t = /* @__PURE__ */ j(() => Z("tip.linkTarget")), n = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
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
									onchange: (e) => ef(r, a, e)
								});
							}
							var _ = R(g, 2), v = (e) => {
								var t = Sg();
								J(t), B((e, n) => {
									Y(t, V(i).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
								}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => tf(r, a, e.target.value)), W(e, t);
							};
							K(_, (e) => {
								V(i).page || e(v);
							}), O(h), O(p);
							var y = R(p, 2), b = F(y);
							b.disabled = a === 0, q(b, () => T.up, !0), O(b);
							var x = R(b, 2);
							q(x, () => T.cross, !0), O(x);
							var S = R(x, 2);
							q(S, () => T.down, !0), O(S), O(y);
							var C = R(y, 2);
							q(C, () => T.kebab, !0), O(C), O(u);
							var w = R(u, 2), ee = (t) => {
								e(t, () => !0);
							};
							K(w, (e) => {
								V(Vd)?.key === V(o) && V(Vd).pos === "after" && e(ee);
							}), B((e, t, r, s, c, l, p) => {
								d = mi(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: V(zd) === V(o),
									dragging: V(Bd) === V(o)
								}), X(u, "data-key", V(o)), X(f, "title", e), Y(m, V(i).label), X(m, "title", t), X(b, "title", r), X(x, "title", s), X(S, "title", c), S.disabled = a === V(n).children.length - 1, X(C, "title", l), X(C, "aria-label", p);
							}, [
								() => Z("tip.nav.dragItem"),
								() => Z("tip.nav.childLabel"),
								() => Z("tip.moveUp"),
								() => Z("tip.nav.removeChild"),
								() => Z("tip.moveDown"),
								() => Z("tip.nav.itemActions"),
								() => Z("tip.nav.itemActions")
							]), H("click", u, (e) => {
								e.stopPropagation(), N(zd, V(o));
							}), xr("dragstart", f, (e) => {
								e.stopPropagation(), N(Bd, V(o)), e.dataTransfer?.setData(qd, V(o));
							}), xr("dragend", f, Kd), H("input", m, (e) => $d(r, a, e.target.value)), H("click", b, () => nf(r, a, -1)), H("click", x, () => af(r, a)), H("click", S, () => nf(r, a, 1)), H("click", C, (e) => {
								e.stopPropagation(), N(zd, V(o));
							}), W(t, s);
						});
						var te = R(ee, 2), ne = (t) => {
							e(t, () => !0);
						};
						K(te, (e) => {
							V(Vd)?.key === V(i) && V(Vd).pos === "into" && e(ne);
						});
						var re = R(te, 2), ie = (t) => {
							e(t, () => !1);
						};
						K(re, (e) => {
							V(Vd)?.key === V(i) && V(Vd).pos === "after" && e(ie);
						}), B((e, t, a, o, s, d, p, m) => {
							l = mi(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: V(zd) === V(i),
								dragging: V(Bd) === V(i),
								"drop-target": V(Vd)?.key === V(i) && V(Vd).pos === "into"
							}), X(c, "data-key", V(i)), X(u, "title", e), Y(f, V(n).label), X(f, "title", t), X(b, "title", a), X(x, "title", o), X(S, "title", s), X(C, "title", d), C.disabled = r === V(A).nav.items.length - 1, X(w, "title", p), X(w, "aria-label", m);
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
							N(zd, V(i));
						}), xr("dragstart", u, (e) => {
							N(Bd, V(i)), e.dataTransfer?.setData(qd, V(i));
						}), xr("dragend", u, Kd), H("input", f, (e) => Nd(r, e.target.value)), H("click", b, () => Qd(r)), H("click", x, () => Id(r, -1)), H("click", S, () => Ld(r)), H("click", C, () => Id(r, 1)), H("click", w, () => {
							N(zd, V(i));
						}), W(t, a);
					}), O(Zn);
					var Qn = R(Zn, 2), $n = L(Qn, !0), er = R(Qn, 2), tr = F(er);
					J(tr);
					var nr = R(tr, 2), rr = L(nr, !0);
					O(er), O(Xn), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, ee, T, te, ne, re, ie, ae, oe, E, se, ce, le, ue, D, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, O, Ee, De, Oe) => {
						G($n, Te), X(er, "title", O), X(tr, "placeholder", Ee), nr.disabled = De, G(rr, Oe);
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
						() => !V(S).trim(),
						() => Z("ui.newPageAsItem")
					]), xr("dragover", Zn, Jd), xr("drop", Zn, (e) => {
						e.preventDefault(), Yd(V(Vd)?.key ?? "");
					}), H("click", Qn, Zd), H("keydown", tr, (e) => {
						e.key === "Enter" && C();
					}), Ti(tr, () => V(S), (e) => N(S, e)), H("click", nr, C);
				}
				O(qn), O(t), B((e, t, n, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, ee, T, te, ne, ie, oe, ce, le, ue, D, de, fe, pe, me, he, ge, _e, ve, xe, Ce, we, O, Ee, De, Oe, ke, je, Fe, Ie, Le, Re, Be, Ve, He, Ue, We) => {
					X(r, "title", e), G(i, t), G(w, n), G(re, a), X(ae, "title", o), G(E, s), X(se, "aria-label", c), X(ye, "title", l), G(be, u), X(Se, "title", d), G(Te, f), X(Ae, "title", p), G(Me, m), X(Ne, "min", Qo.min), X(Ne, "max", Qo.max), X(Ne, "step", Qo.step), Y(Ne, V(rc)), X(Pe, "min", Qo.min), X(Pe, "max", Qo.max), Y(Pe, V(rc)), G(ze, h), G(qe, g), X(Qe, "title", _), G(k, v), X(it, "title", y), G(ot, b), X(st, "min", Qo.min), X(st, "max", Qo.max), X(st, "placeholder", x), Y(st, V(A).nav.style?.mobile?.textSize ?? ""), X(lt, "title", S), G(dt, C), X(pt, "title", ee), G(ht, T), X(vt, "title", te), G(bt, ne), X(Tt, "title", ie), G(Dt, oe), X(Mt, "title", ce), G(Pt, le), G(Gt, ue), G(Jt, D), X(Yt, "aria-label", de), X(en, "title", fe), G(nn, pe), X(rn, "title", me), G(on, he), X(sn, "title", ge), xi(cn, V(A).nav.style?.blur !== !1), G(z, ` ${_e ?? ""}`), G(dn, ve), X(hn, "title", xe), G(gn, Ce), X(vn, "title", we), xi(yn, V(A).nav.announcement?.show === !0), G(bn, ` ${O ?? ""}`), X(wn, "title", Ee), G(Tn, De), G(Mn, Oe), G(In, ke), Rn = mi(Ln, 1, "tile-grid svelte-1n46o8q", null, Rn, {
						"cols-5": !V($s),
						"cols-3": V($s)
					}), X(Ln, "aria-label", je), X(Wn, "title", Fe), G(Gn, `${Ie ?? ""} `), Y(Kn, V(A).nav.style?.subColumns ?? 1), X(Jn, "title", Le), G(Yn, Re);
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
					() => !V(S).trim(),
					() => Z("ui.newPageAsItem")
				]), H("input", Ne, (e) => Qs("textSize", e.target.valueAsNumber)), H("change", Pe, (e) => Ec(e, "textSize", Qo)), H("change", st, (e) => Dc(e, "textSize", Qo)), H("change", cn, (e) => Qs("blur", e.target.checked)), H("change", yn, (e) => uc("show", e.target.checked ? !0 : void 0)), H("change", Kn, (e) => Qs("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), W(e, t);
			}, b = (e) => {
				var t = jg(), n = F(t), r = F(n), i = R(r);
				J(i), O(n);
				var a = R(n, 2), o = F(a), s = R(o);
				J(s), O(a);
				var c = R(a, 2), l = F(c), u = R(l);
				{
					let e = /* @__PURE__ */ j(Vs), t = /* @__PURE__ */ j(Us);
					Q(u, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => Ks(e)
					});
				}
				O(c);
				var d = R(c, 4), f = L(d, !0), p = R(d, 2), m = F(p);
				Kr(m, 17, () => V(Fs), (e) => e.screen, (e, t) => {
					var n = Dg(), r = F(n), i = L(r, !0), a = R(r, 2);
					let o;
					var s = L(a), c = L(R(a, 2), !0);
					O(n), B(() => {
						G(i, V(t).screen), o = mi(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !V(t).bound }), gi(s, `width:${V(t).pct ?? ""}%`), G(c, V(t).bound ? `${V(t).margin}` : "-");
					}), W(e, n);
				});
				var h = R(m, 2), g = F(h), _ = L(g, !0), v = L(R(g, 2), !0);
				O(h);
				var y = R(h, 2), b = (e) => {
					var t = Og(), n = L(t, !0);
					B((e) => G(n, e), [() => Z("lbl.bindsFrom", { n: V(Fe) })]), W(e, t);
				};
				K(y, (e) => {
					V(ks) !== "full" && e(b);
				}), O(p);
				var x = R(p, 2);
				Kr(x, 21, () => Wo, (e) => e.id, (e, t) => {
					var n = Th();
					let r;
					var i = L(n, !0);
					B((e) => {
						r = mi(n, 1, "svelte-1n46o8q", null, r, { on: V(js) === V(t).id }), G(i, e);
					}, [() => Z(`lbl.width.${V(t).id}`)]), H("click", n, () => Ls(V(t).width)), W(e, n);
				}), O(x);
				var S = R(x, 2), C = (e) => {
					var t = kg(), n = F(t), r = L(n, !0), i = R(n, 2);
					J(i);
					var a = L(R(i, 2));
					O(t), B((e, n) => {
						X(t, "title", e), G(r, n), X(i, "min", 960), X(i, "max", Ho), X(i, "step", 20), Y(i, V(Ps)), G(a, `${V(Ps) ?? ""} px`);
					}, [() => Z("tip.site.contentWidthFree"), () => Z("lbl.widthFree")]), H("input", i, (e) => Ls(e.target.valueAsNumber)), W(e, t);
				};
				K(S, (e) => {
					V(ks) !== "full" && e(C);
				});
				var w = R(S, 2), ee = L(w, !0), te = R(w, 2);
				Kr(te, 21, () => Uo, (e) => e.id, (e, t) => {
					var n = Th();
					let r;
					var i = L(n, !0);
					B((e) => {
						r = mi(n, 1, "svelte-1n46o8q", null, r, { on: V(Ms) === V(t).id }), G(i, e);
					}, [() => Z(`lbl.gutter.${V(t).id}`)]), H("click", n, () => Bs(V(t).gutter)), W(e, n);
				}), O(te);
				var ne = R(te, 2), re = F(ne), ie = L(re, !0), ae = R(re, 2), oe = F(ae), E = F(oe), se = L(E, !0), ce = R(E, 2);
				J(ce);
				var le = L(R(ce, 2));
				O(oe), O(ae), O(ne);
				var ue = R(ne, 4), D = F(ue), de = R(D), fe = (e) => {
					var t = Ih();
					B((e) => {
						X(t, "src", V(A).site.icon), X(t, "alt", e);
					}, [() => Z("lbl.siteIcon")]), W(e, t);
				};
				K(de, (e) => {
					V(A).site.icon && e(fe);
				}), O(ue);
				var pe = R(ue, 2), me = F(pe), he = F(me), ge = R(he);
				O(me);
				var _e = R(me, 2), ve = (e) => {
					var t = Ag(), n = I(t);
					q(n, () => T.pencil ?? "✎", !0), O(n);
					var r = R(n, 2);
					q(r, () => T.cross, !0), O(r), B((e, t) => {
						X(n, "title", e), X(r, "title", t);
					}, [() => Z("tip.site.editIcon"), () => Z("tip.site.removeIcon")]), H("click", n, () => N(ys, V(A).site.icon, !0)), H("click", r, Ss), W(e, t);
				};
				K(_e, (e) => {
					V(A).site.icon && e(ve);
				}), O(pe), O(t), B((e, t, u, p, m, h, g, y, b, x, S, C, T, te, re, ae, E, ue, de, fe) => {
					X(n, "title", e), G(r, `${t ?? ""} `), Y(i, V(A).site.title ?? ""), X(i, "placeholder", u), X(a, "title", p), G(o, `${m ?? ""} `), Y(s, V(A).site.description ?? ""), X(s, "placeholder", h), X(c, "title", g), G(l, `${y ?? ""} `), X(d, "title", b), G(f, x), G(_, S), G(v, C), X(w, "title", T), G(ee, te), ne.open = V(Ms) === null || V(Ns), G(ie, re), X(oe, "title", ae), G(se, E), X(ce, "min", 0), X(ce, "max", 12), X(ce, "step", 1), Y(ce, V(As)), G(le, `${V(As) ?? ""} vw`), G(D, `${ue ?? ""} `), X(me, "title", de), G(he, `${fe ?? ""} `);
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
					() => V(A).site.icon ? Z("ui.changeIcon") : Z("ui.chooseIcon")
				]), H("input", i, (e) => Cs(e.target.value)), H("input", s, (e) => Ts(e.target.value)), xr("toggle", ne, (e) => N(Ns, e.currentTarget.open, !0)), H("input", ce, (e) => Bs(e.target.valueAsNumber)), H("change", ge, bs), W(e, t);
			}, x = (e) => {
				var t = Rg();
				{
					let e = (e, t = f, n = f) => {
						var r = Ng(), i = F(r), a = (e) => {
							var t = Mg(), r = L(t, !0);
							B(() => G(r, n())), W(e, t);
						};
						K(i, (e) => {
							n() && e(a);
						});
						var o = R(i, 2), s = F(o), c = L(s, !0), l = R(s, 2), u = L(l, !0), d = R(l, 2), p = F(d), m = L(p, !0), h = L(R(p), !0);
						O(d), O(o), O(r), B((e, t, n, r, i, a, s, l, d) => {
							gi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), G(c, a), G(u, s), G(m, l), G(h, d);
						}, [
							() => jf(t().bg, t()),
							() => jf(t().surface, t()),
							() => jf(t().text, t()),
							() => jf(t().accent, t()),
							() => jf(t()["accent-text"] ?? ae(jf(t().accent ?? "#000000", t())), t()),
							() => Z("preview.heading"),
							() => Z("preview.cardBody"),
							() => Z("preview.button"),
							() => Z("preview.link")
						]), W(e, r);
					};
					var n = F(t), r = L(n, !0), i = R(n, 2);
					Kr(i, 21, () => Lf, (e) => e.id, (e, t) => {
						var n = Pg();
						let r;
						var i = F(n), a = F(i), o = R(a), s = R(o), c = R(s);
						O(i);
						var l = L(R(i, 2), !0);
						O(n), B(() => {
							r = mi(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: V(Vf) === V(t).id }), X(n, "title", `${V(t).name} - ${V(t).note}`), gi(a, `background:${V(t).light.bg ?? ""}`), gi(o, `background:${V(t).light.surface ?? ""}`), gi(s, `background:${V(t).light.accent ?? ""}`), gi(c, `background:${V(t).light.text ?? ""}`), G(l, V(t).name);
						}), H("click", n, () => Bf(V(t))), W(e, n);
					}), O(i);
					var a = R(i, 2), o = L(a, !0), s = R(a, 2), c = F(s);
					J(c);
					var l = R(c);
					O(s);
					var u = R(s, 2), d = (e) => {
						var t = Fg(), n = F(t), r = L(n, !0), i = R(n, 2), a = F(i);
						let o;
						var s = L(a, !0), c = R(a, 2);
						let l;
						var u = L(c, !0);
						O(i), O(t), B((e, t, n, i) => {
							G(r, e), X(a, "title", t), o = mi(a, 1, "svelte-1n46o8q", null, o, { on: V(Ri) }), G(s, n), l = mi(c, 1, "svelte-1n46o8q", null, l, { on: !V(Ri) }), G(u, i);
						}, [
							() => Z("lbl.darkColors"),
							() => Z("hint.theme.autoDark"),
							() => Z("opt.auto"),
							() => Z("opt.custom")
						]), H("click", a, () => Tf(!0)), H("click", c, () => Tf(!1)), W(e, t);
					};
					K(u, (e) => {
						V(Li) && e(d);
					});
					var p = R(u, 2), m = F(p), g = (e) => {
						var t = Cm(), n = L(t, !0);
						B((e) => G(n, e), [() => Z("lbl.light")]), W(e, t);
					};
					K(m, (e) => {
						V(Li) && e(g);
					});
					var _ = R(m, 2);
					let Fe;
					var v = L(_, !0);
					O(p);
					var y = R(p, 2);
					Kr(y, 21, () => Ii, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ j(() => h(V(t), 3));
						let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
						var o = Ig(), s = F(o);
						{
							let e = /* @__PURE__ */ j(() => V(A).theme.tokens.color[r()] ?? sf(r(), V(Bi))), t = /* @__PURE__ */ j(Fi);
							va(s, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => of(r(), e)
							});
						}
						var c = R(s, 2), l = L(c, !0), u = L(R(c, 2), !0);
						O(o), B((e) => {
							G(l, a()), G(u, e);
						}, [() => jf(V(A).theme.tokens.color[r()] ?? sf(r(), V(Bi)), V(Bi))]), W(e, o);
					}), O(y);
					var b = R(y, 2), x = (e) => {
						var t = Lg(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2);
						let o;
						var s = L(a, !0);
						O(n);
						var c = R(n, 2);
						let l;
						Kr(c, 21, () => Ii, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ j(() => h(V(t), 3));
							let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
							var o = Ig(), s = F(o);
							{
								let e = /* @__PURE__ */ j(() => V(A).theme.alt.tokens.color[r()] ?? V(Vi)[r()] ?? sf(r(), V(Vi))), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("theme.darkColorLabel", { name: i() }));
								va(s, {
									get value() {
										return V(e);
									},
									get tokens() {
										return V(t);
									},
									get label() {
										return V(n);
									},
									onchange: (e) => Sf(r(), e)
								});
							}
							var c = R(s, 2), l = L(c, !0), u = L(R(c, 2), !0);
							O(o), B((e) => {
								G(l, a()), G(u, e);
							}, [() => jf(V(A).theme.alt.tokens.color[r()] ?? V(Vi)[r()] ?? sf(r(), V(Vi)), V(Vi))]), W(e, o);
						}), O(c), B((e, t, n) => {
							G(i, e), o = mi(a, 1, "chip svelte-1n46o8q", null, o, { accent: V(zi) === "dark" }), X(a, "title", t), G(s, n), l = mi(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: V(Ri) });
						}, [
							() => Z("lbl.dark"),
							() => Z("tip.theme.darkDefault"),
							() => Z("common.standard")
						]), H("click", a, () => Cf("dark")), W(e, t);
					};
					K(b, (e) => {
						V(Li) && e(x);
					});
					var S = R(b, 2), C = F(S), w = L(C, !0), ee = R(C, 2);
					let Ie;
					var T = L(ee, !0);
					O(S);
					var te = R(S, 2), ne = F(te);
					{
						let t = /* @__PURE__ */ j(() => V(Li) ? Z("lbl.light") : "");
						e(ne, () => V(Bi), () => V(t));
					}
					var re = R(ne, 2), ie = (t) => {
						{
							let n = /* @__PURE__ */ j(() => Z("lbl.dark"));
							e(t, () => V(Vi), () => V(n));
						}
					};
					K(re, (e) => {
						V(Li) && e(ie);
					}), O(te);
					var oe = R(te, 2), E = F(oe), se = L(E, !0), ce = R(E, 2), le = F(ce), ue = F(le), D = R(ue);
					{
						let e = /* @__PURE__ */ j(() => Ef("heading"));
						Q(D, {
							get value() {
								return V(A).theme.tokens.font.heading;
							},
							get options() {
								return V(e);
							},
							onchange: (e) => vf("heading", e)
						});
					}
					O(le);
					var de = R(le, 2), fe = F(de), pe = R(fe);
					{
						let e = /* @__PURE__ */ j(() => Ef("body"));
						Q(pe, {
							get value() {
								return V(A).theme.tokens.font.body;
							},
							get options() {
								return V(e);
							},
							onchange: (e) => vf("body", e)
						});
					}
					O(de);
					var me = R(de, 2), he = F(me), ge = L(he, !0), _e = R(he, 2), ve = L(_e, !0);
					O(me), O(ce), O(oe);
					var ye = R(oe, 2), be = F(ye), xe = L(be, !0), Se = R(be, 2), Ce = F(Se), we = F(Ce), Te = L(we, !0), Ee = L(R(we, 2), !0);
					O(Ce);
					var De = R(Ce, 2), Oe = F(De, !0), ke = L(R(Oe), !0);
					O(De);
					var Ae = R(De, 2);
					J(Ae);
					var je = R(Ae, 2), Me = F(je, !0), Ne = L(R(Me), !0);
					O(je);
					var Pe = R(je, 2);
					J(Pe), O(Se), O(ye), O(t), B((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, C, te, ne, re, ie, ae) => {
						G(r, e), G(o, t), X(s, "title", n), xi(c, V(Li)), G(l, ` ${i ?? ""}`), Fe = mi(_, 1, "chip svelte-1n46o8q", null, Fe, { accent: V(zi) === "light" }), X(_, "title", a), G(v, u), X(S, "title", d), G(w, f), Ie = mi(ee, 1, "chip palauto svelte-1n46o8q", null, Ie, { accent: V(lf) }), G(T, p), G(se, m), G(ue, `${h ?? ""} `), G(fe, `${g ?? ""} `), gi(he, `font-family:${V(A).theme.tokens.font.heading ?? ""}`), G(ge, y), gi(_e, `font-family:${V(A).theme.tokens.font.body ?? ""}`), G(ve, b), G(xe, x), gi(Ce, `--r-sm:${V(A).theme.tokens.radius.sm ?? ""};--r-md:${V(A).theme.tokens.radius.md ?? ""}`), G(Te, C), G(Ee, te), G(Oe, ne), G(ke, V(A).theme.tokens.radius.sm), Y(Ae, re), G(Me, ie), G(Ne, V(A).theme.tokens.radius.md), Y(Pe, ae);
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
						() => kf(V(A).theme.tokens.radius.sm),
						() => Z("lbl.largeCorners"),
						() => kf(V(A).theme.tokens.radius.md)
					]), H("change", c, (e) => wf(e.target.checked)), H("click", _, () => Cf("light")), H("click", ee, () => _f(!V(lf))), H("input", Ae, (e) => Af("sm", Number(e.target.value))), H("input", Pe, (e) => Af("md", Number(e.target.value)));
				}
				W(e, t);
			}, w = (e) => {
				var t = Ug();
				let n;
				var r = F(t);
				J(r);
				var i = R(r, 2), a = (e) => {
					var t = jr();
					Kr(I(t), 17, () => tu(fv(), V(dv), (e) => e.label), (e) => e.label, (e, t) => {
						var n = jr(), r = I(n), i = (e) => {
							var n = zg(), r = F(n), i = R(r);
							O(n), B((e) => {
								X(n, "title", e), G(r, `${V(t).label ?? ""} `);
							}, [() => Z("tip.webpAuto")]), H("change", i, hv), W(e, n);
						}, a = (e) => {
							var n = Bg(), r = F(n), i = R(r);
							O(n), B((e) => {
								X(n, "title", e), G(r, `${V(t).label ?? ""} `);
							}, [() => Z("tip.blocks.galleryImages")]), H("change", i, yv), W(e, n);
						}, o = (e) => {
							var n = nm(), r = L(n, !0);
							B(() => G(r, V(t).label)), H("click", n, () => pv(V(t))), W(e, n);
						};
						K(r, (e) => {
							V(t).act === "image" ? e(i) : V(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), W(e, n);
					}, (e) => {
						var t = Ap(), n = L(t, !0);
						B((e) => G(n, e), [() => Z("canvas.searchEmpty")]), W(e, t);
					}), W(e, t);
				}, o = /* @__PURE__ */ j(() => V(dv).trim()), s = (e) => {
					var t = Hg(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = F(a), s = L(o, !0), c = R(o, 2), l = L(c, !0);
					O(a), O(n);
					var u = R(n, 2), d = L(u, !0), f = R(u, 2), p = F(f), m = R(p);
					O(f);
					var h = R(f, 2), g = L(h, !0), _ = R(h, 2), v = L(_, !0), y = R(_, 2), b = L(y, !0), x = R(y, 2), S = L(x, !0), C = R(x, 2), w = L(C, !0), ee = R(C, 2), T = L(ee, !0), te = R(ee, 2), ne = L(te, !0), re = R(te, 2), ie = L(re, !0), ae = R(re, 2), oe = L(ae, !0), E = R(ae, 2), se = L(E, !0), ce = R(E, 2), le = L(ce, !0), ue = R(ce, 2), D = L(ue, !0), de = R(ue, 2), fe = L(de, !0), pe = R(de, 2), me = L(pe, !0), he = R(pe, 2), ge = L(he, !0), _e = R(he, 2), ve = L(_e, !0), ye = R(_e, 2), be = L(ye, !0), xe = R(ye, 2), Se = F(xe), Ce = L(Se, !0), we = R(Se, 2), Te = F(we), Ee = L(Te, !0), De = R(Te, 2), Oe = F(De), ke = R(Oe);
					O(De), O(we), O(xe);
					var Ae = R(xe, 2), je = F(Ae), Me = L(je, !0), Ne = R(je, 2), Pe = F(Ne), Fe = L(Pe, !0), Ie = R(Pe, 2), Le = L(Ie, !0), Re = R(Ie, 2), ze = L(Re, !0), Be = R(Re, 2), Ve = L(Be, !0), He = R(Be, 2), Ue = L(He, !0);
					O(Ne), O(Ae);
					var We = R(Ae, 2), Ge = F(We), Ke = L(Ge, !0), qe = R(Ge, 2), Je = F(qe), Ye = L(Je, !0), Xe = R(Je, 2), Ze = L(Xe, !0), Qe = R(Xe, 2), k = L(Qe, !0), $e = R(Qe, 2), A = L($e, !0), tt = R($e, 2), nt = L(tt, !0);
					O(qe), O(We);
					var rt = R(We, 2), it = (e) => {
						let t = /* @__PURE__ */ j(() => V(vl).filter((e) => ml[e]?.data?.mal?.kind === "blocks"));
						var n = Vg(), r = F(n), i = L(r, !0), a = R(r, 2);
						Kr(a, 20, () => V(t), (e) => e, (e, t) => {
							var n = nm(), r = L(n, !0);
							B((e) => {
								X(n, "title", e), G(r, ml[t].data.mal.name);
							}, [() => Z("canvas.insertGroup")]), H("click", n, () => et?.sendInsertTemplate(t)), W(e, n);
						}), O(a), O(n), B((e) => G(i, e), [() => Z("canvas.tabMyTemplates")]), W(e, n);
					}, at = /* @__PURE__ */ j(() => V(vl).some((e) => ml[e]?.data?.mal?.kind === "blocks"));
					K(rt, (e) => {
						V(at) && e(it);
					});
					var ot = R(rt, 2), st = (e) => {
						var t = Vg(), n = F(t), r = L(n, !0), i = R(n, 2);
						Kr(i, 21, () => V(cv), (e) => e.type, (e, t) => {
							var n = jr(), r = I(n), i = (e) => {
								var n = Vg(), r = F(n), i = L(r, !0), a = R(r, 2);
								Kr(a, 21, () => V(t).variants, (e) => e.label, (e, n) => {
									var r = nm(), i = L(r, !0);
									B((e) => {
										X(r, "title", e), G(i, V(n).label);
									}, [() => Z("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", r, () => uv(V(t), V(n).props)), W(e, r);
								}), O(a), O(n), B(() => G(i, V(t).label)), W(e, n);
							}, a = (e) => {
								var n = nm(), r = L(n, !0);
								B((e) => {
									X(n, "title", e), G(r, V(t).label);
								}, [() => Z("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", n, () => uv(V(t))), W(e, n);
							};
							K(r, (e) => {
								V(t).variants?.length ? e(i) : e(a, -1);
							}), W(e, n);
						}), O(i), O(t), B((e) => G(r, e), [() => Z("panel.plugins")]), W(e, t);
					};
					K(ot, (e) => {
						V(cv).length && e(st);
					}), B((e, t, n, r, a, o, u, m, xe, Se, we, O, ke, Ae, je, Ne, We, Ge, qe, Je, Xe, Qe, $e, et, tt, rt, it, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, j, _t, vt, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt) => {
						G(i, e), G(s, t), X(c, "title", n), G(l, r), G(d, a), X(f, "title", o), G(p, `${u ?? ""} `), X(h, "title", m), G(g, xe), X(_, "title", Se), G(v, we), X(y, "title", O), G(b, ke), X(x, "title", Ae), G(S, je), X(C, "title", Ne), G(w, We), X(ee, "title", Ge), G(T, qe), X(te, "title", Je), G(ne, Xe), X(re, "title", Qe), G(ie, $e), X(ae, "title", et), G(oe, tt), X(E, "title", rt), G(se, it), X(ce, "title", at), G(le, ot), X(ue, "title", st), G(D, ct), X(de, "title", lt), G(fe, ut), X(pe, "title", dt), G(me, ft), X(he, "title", pt), G(ge, mt), X(_e, "title", ht), G(ve, gt), X(ye, "title", j), G(be, _t), G(Ce, vt), X(Te, "title", yt), G(Ee, bt), X(De, "title", xt), G(Oe, `${St ?? ""} `), G(Me, Ct), X(Pe, "title", wt), G(Fe, Tt), X(Ie, "title", Et), G(Le, Dt), X(Re, "title", Ot), G(ze, kt), X(Be, "title", At), G(Ve, jt), X(He, "title", Mt), G(Ue, Nt), G(Ke, Pt), G(Ye, Ft), G(Ze, It), G(k, Lt), G(A, Rt), G(nt, zt);
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
						() => Z("tip.blocks.calendar"),
						() => Z("calendar.viewAgenda"),
						() => Z("group.shapes"),
						() => Z("shape.line"),
						() => Z("shape.arrow"),
						() => Z("shape.circle"),
						() => Z("shape.rect"),
						() => Z("shape.triangle")
					]), H("click", o, () => sv("text")), H("click", c, () => sv("text-box")), H("click", u, () => sv("button")), H("change", m, hv), H("click", h, () => sv("video")), H("click", _, () => sv("icon")), H("click", y, () => sv("map")), H("click", x, () => sv("form")), H("click", C, () => sv("collection")), H("click", ee, () => sv("faq")), H("click", te, () => sv("timeline")), H("click", re, () => sv("quote")), H("click", ae, () => sv("stats")), H("click", E, () => sv("ribbon")), H("click", ce, () => sv("table")), H("click", ue, () => sv("share")), H("click", de, () => sv("countdown")), H("click", pe, () => sv("audio")), H("click", he, () => sv("product")), H("click", _e, () => sv("cart")), H("click", ye, () => sv("checkout")), H("click", Te, () => sv("gallery")), H("change", ke, yv), H("click", Pe, () => sv("calendar")), H("click", Ie, () => sv("calendar-cards")), H("click", Re, () => sv("calendar-month")), H("click", Be, () => sv("calendar-next")), H("click", He, () => sv("calendar-agenda")), H("click", Je, () => sv("shape-line")), H("click", Xe, () => sv("shape-arrow")), H("click", Qe, () => sv("shape-circle")), H("click", $e, () => sv("shape-rect")), H("click", tt, () => sv("shape-triangle")), W(e, t);
				};
				K(i, (e) => {
					V(o) ? e(a) : e(s, -1);
				}), O(t), B((e, i, a) => {
					n = mi(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: V(ke) === "mobile" }), X(t, "title", e), X(r, "placeholder", i), X(r, "title", a);
				}, [
					() => V(ke) === "mobile" ? Z("tip.blocks.mobileLocked") : void 0,
					() => Z("canvas.searchBlocks"),
					() => Z("canvas.searchBlocks")
				]), Ti(r, () => V(dv), (e) => N(dv, e)), W(e, t);
			}, ee = (e) => {
				var t = Wg(), n = F(t), r = F(n), i = L(R(r));
				O(n);
				var a = R(n, 2);
				J(a);
				var o = R(a, 2), s = F(o);
				J(s);
				var c = R(s);
				O(o), O(t), B((e, t) => {
					G(r, `${e ?? ""} `), G(i, `${V(he).size ?? ""} px`), Y(a, V(he).size), xi(s, V(he).snap !== !1), G(c, ` ${t ?? ""}`);
				}, [() => Z("lbl.gridSize"), () => Z("lbl.gridSnap")]), H("input", a, (e) => da("size", Number(e.target.value))), H("change", s, (e) => da("snap", e.target.checked)), W(e, t);
			}, te = (e) => {
				var t = Zg(), n = F(t), r = (e) => {
					var t = Em(), n = I(t), r = L(n, !0), i = R(n, 2);
					c(i), B((e) => G(r, e), [() => Z("blocks.suffix", { label: dr[V(P).type] ?? V(P).type })]), W(e, t);
				}, i = (e) => {
					var t = Xg(), n = I(t), r = L(n, !0), i = R(n, 2), o = F(i), s = R(o);
					J(s), O(i);
					var c = R(i, 4), l = F(c);
					J(l);
					var u = R(l);
					O(c);
					var d = R(c, 2), f = (e) => {
						var t = Gg(), n = I(t), r = F(n), i = L(R(r));
						O(n);
						var a = R(n, 2);
						J(a), B((e) => {
							G(r, `${e ?? ""} `), G(i, `${V(hr).size ?? ""} px`), Y(a, V(hr).size);
						}, [() => Z("lbl.gridSize")]), H("input", a, (e) => ua("size", Number(e.target.value))), W(e, t);
					};
					K(d, (e) => {
						V(hr) && e(f);
					});
					var p = R(d, 4), m = L(p, !0), g = R(p, 2);
					Kr(g, 21, () => [["", "common.standard"], ...Object.entries(lu)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ j(() => h(V(t), 2));
						let r = () => V(n)[0], i = () => V(n)[1], a = /* @__PURE__ */ j(() => kr(r()));
						var o = Kg();
						let s;
						var c = F(o), l = F(c), u = R(l, 2), d = R(u, 2);
						O(c);
						var f = L(R(c, 2), !0);
						O(o), B((e, t) => {
							s = mi(o, 1, "rs-card svelte-1n46o8q", null, s, { on: V(Sr) === r() }), X(o, "title", e), gi(c, `background: ${V(a).bg ?? ""}`), gi(l, `background: ${V(a).text ?? ""}`), gi(u, `background: ${V(a).surface ?? ""}`), gi(d, `background: ${V(a).accent ?? ""}`), G(f, t);
						}, [() => Z("tip.props.sectionTheme"), () => Z(i())]), H("click", o, () => Or(r())), W(e, o);
					}), O(g);
					var _ = R(g, 2), v = F(_), y = R(v), b = F(y), x = L(b), S = R(b, 2);
					q(S, () => T.copy, !0), O(S), O(y), O(_);
					var C = R(_, 4), w = L(C, !0), ee = R(C, 2);
					a(ee, () => V(Oi), () => V(_r));
					var te = R(ee, 4), ne = L(te, !0), re = R(te, 2);
					Kr(re, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ j(() => h(t, 2));
						let r = () => V(n)[0], i = () => V(n)[1], a = /* @__PURE__ */ j(() => V(Cr)[r()]);
						var o = Zf(), s = I(o), c = F(s), l = R(c);
						{
							let e = /* @__PURE__ */ j(() => V(a)?.shape ?? ""), t = /* @__PURE__ */ j(() => [["", Z("common.none")], ...Bu.map((e) => [e, Z(`opt.divider.${e}`)])]);
							Q(l, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => ra(r(), "shape", e)
							});
						}
						O(s);
						var u = R(s, 2), d = (e) => {
							var t = qg(), n = I(t), i = F(n), o = L(i, !0), s = R(i, 2);
							J(s);
							var c = L(R(s, 2));
							O(n);
							var l = R(n, 2), u = F(l), d = R(u);
							{
								let e = /* @__PURE__ */ j(() => V(a).color ?? "bg"), t = /* @__PURE__ */ j(Fi), n = /* @__PURE__ */ j(() => Z("tip.divider.color"));
								va(d, {
									get value() {
										return V(e);
									},
									get tokens() {
										return V(t);
									},
									get label() {
										return V(n);
									},
									onchange: (e) => ra(r(), "color", e)
								});
							}
							O(l);
							var f = R(l, 2), p = F(f);
							J(p);
							var m = R(p);
							O(f);
							var h = R(f, 2), g = F(h);
							J(g);
							var _ = R(g);
							O(h), B((e, t, n, r, i, d, v) => {
								G(o, e), X(s, "min", Vu.min), X(s, "max", Vu.max), Y(s, V(a).height ?? Vu.dflt), G(c, `${V(a).height ?? Vu.dflt ?? ""} px`), X(l, "title", t), G(u, `${n ?? ""} `), X(f, "title", r), xi(p, V(a).flip === !0), G(m, ` ${i ?? ""}`), X(h, "title", d), xi(g, V(a).invert === !0), G(_, ` ${v ?? ""}`);
							}, [
								() => Z("lbl.height"),
								() => Z("tip.divider.color"),
								() => Z("lbl.color"),
								() => Z("tip.divider.flip"),
								() => Z("lbl.dividerFlip"),
								() => Z("tip.divider.invert"),
								() => Z("lbl.patternInvert")
							]), H("input", s, (e) => ra(r(), "height", e.target.valueAsNumber)), H("change", p, (e) => ra(r(), "flip", e.target.checked)), H("change", g, (e) => ra(r(), "invert", e.target.checked)), W(e, t);
						};
						K(u, (e) => {
							V(a)?.shape && e(d);
						}), B((e, t) => {
							X(s, "title", e), G(c, `${t ?? ""} `);
						}, [() => Z("tip.props.dividers"), () => Z(i())]), W(e, o);
					});
					var ie = R(re, 4), ae = F(ie), oe = R(ae);
					{
						let e = /* @__PURE__ */ j(() => Ui(V(vr)) ? V(vr).type : "");
						Q(oe, {
							get value() {
								return V(e);
							},
							get options() {
								return Wi;
							},
							onchange: (e) => na(e || null)
						});
					}
					O(ie);
					var E = R(ie, 2), se = (e) => {
						var t = Yg(), n = I(t), r = F(n), i = R(r);
						J(i), O(n);
						var a = R(n, 2), o = F(a), s = R(o);
						J(s), O(a);
						var c = R(a, 2), l = (e) => {
							var t = Jg(), n = I(t), r = F(n), i = R(r);
							{
								let e = /* @__PURE__ */ j(() => V(vr).props.effect ?? "slide-up"), t = /* @__PURE__ */ j(() => [
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
									onchange: (e) => oa("effect", e)
								});
							}
							O(n);
							var a = R(n, 2), o = F(a), s = R(o);
							J(s), O(a);
							var c = R(a, 2), l = F(c), u = R(l);
							{
								let e = /* @__PURE__ */ j(() => V(vr).props.pattern ?? "sequence"), t = /* @__PURE__ */ j(() => [
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
									onchange: (e) => oa("pattern", e)
								});
							}
							O(c), B((e, t, i, u, d, f) => {
								X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${u ?? ""} `), Y(s, V(vr).props.step ?? 90), X(c, "title", d), G(l, `${f ?? ""} `);
							}, [
								() => Z("tip.props.staggerEffect"),
								() => Z("lbl.staggerEffect"),
								() => Z("tip.props.staggerStep"),
								() => Z("lbl.stepMs"),
								() => Z("tip.props.staggerPattern"),
								() => Z("lbl.pattern")
							]), H("change", s, (e) => aa("step", Number(e.target.value))), W(e, t);
						};
						K(c, (e) => {
							V(vr).type === "stagger" && e(l);
						}), B((e, t) => {
							G(r, `${e ?? ""} `), Y(i, V(vr).props.duration), G(o, `${t ?? ""} `), Y(s, V(vr).props.delay ?? 0);
						}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), H("change", i, (e) => aa("duration", Number(e.target.value))), H("change", s, (e) => aa("delay", Number(e.target.value))), W(e, t);
					}, ce = /* @__PURE__ */ j(() => Ui(V(vr)));
					K(E, (e) => {
						V(ce) && e(se);
					});
					var le = R(E, 2), ue = F(le), D = R(ue);
					{
						let e = /* @__PURE__ */ j(() => V(br)?.type ?? (V(vr) && !Ui(V(vr)) ? V(vr).type : ""));
						Q(D, {
							get value() {
								return V(e);
							},
							get options() {
								return Yi;
							},
							onchange: (e) => ia(e || null)
						});
					}
					O(le), B((e, t, n, a, c, d, f, h, g, y, b, C, ee, T, re, oe, E) => {
						G(r, e), X(i, "title", t), G(o, `${n ?? ""} `), Y(s, V(gr)), X(s, "placeholder", a), xi(l, V(hr) !== null), G(u, ` ${c ?? ""}`), X(p, "title", d), G(m, f), X(_, "title", h), G(v, `${g ?? ""} `), G(x, `#${V(mr) ?? ""}`), X(S, "title", y), G(w, b), X(te, "title", C), G(ne, ee), X(ie, "title", T), G(ae, `${re ?? ""} `), X(le, "title", oe), G(ue, `${E ?? ""} `);
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
						() => Z("tip.props.dividers"),
						() => Z("lbl.sectionDividers"),
						() => Z("tip.props.sectionAnim"),
						() => Z("lbl.animIn"),
						() => Z("tip.props.sectionHover"),
						() => Z("lbl.onHover")
					]), H("change", s, (e) => sa(e.target.value)), H("change", l, (e) => la(e.target.checked)), H("click", S, () => navigator.clipboard?.writeText(`#${V(mr)}`)), W(e, t);
				}, o = (e) => {
					var t = Ap(), n = L(t, !0);
					B((e) => G(n, e), [() => Z("hint.props.empty")]), W(e, t);
				};
				K(n, (e) => {
					V(P) ? e(r) : V(mr) ? e(i, 1) : e(o, -1);
				}), O(t), W(e, t);
			}, ne = (e) => {
				var t = i_(), n = F(t), r = F(n);
				J(r);
				var i = R(r);
				O(n);
				var s = R(n, 2), c = (e) => {
					var t = Vg(), n = F(t), r = L(n, !0), i = R(n, 2);
					Kr(i, 21, () => V(A).pages ?? [], (e) => e.id, (e, t) => {
						var n = em(), r = F(n);
						J(r);
						var i = R(r);
						O(n), B((e, a) => {
							X(n, "title", e), xi(r, a), G(i, ` ${(V(t).title || V(t).id) ?? ""}`);
						}, [() => Z("tip.footer.hideOnPage"), () => !(V(A).footer?.hideOn ?? []).includes(V(t).id)]), H("change", r, (e) => ud(V(t).id, e.target.checked)), W(e, n);
					}), O(i), O(t), B((e) => G(r, e), [() => Z("group.showOnPages")]), W(e, t);
				};
				K(s, (e) => {
					V(A).footer?.show && e(c);
				});
				var l = R(s, 2), u = F(l), d = L(u, !0), f = R(u, 2), p = F(f);
				Kr(p, 21, () => Zu, (e) => e.id, (e, t) => {
					var n = Qg(), r = F(n);
					q(r, () => Of(V(t).thumb), !0), O(r);
					var i = L(R(r, 2), !0);
					O(n), B((e) => {
						X(n, "title", e), G(i, V(t).label);
					}, [() => Z("tip.footer.template", { label: V(t).label })]), H("click", n, () => $u(V(t).id)), W(e, n);
				}), O(p), O(f), O(l);
				var m = R(l, 2), h = F(m), g = L(h, !0), _ = R(h, 2), v = F(_), y = F(v), b = R(y);
				J(b), O(v);
				var x = R(v, 2), S = F(x), C = R(S);
				J(C), O(x);
				var w = R(x, 2), ee = F(w), te = R(ee);
				{
					let e = /* @__PURE__ */ j(() => V(A).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ j(() => [
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
						onchange: (e) => Wu(e)
					});
				}
				O(w);
				var ne = R(w, 2), re = (e) => {
					var t = e_(), n = I(t), r = F(n), i = F(r), a = R(i);
					O(r);
					var o = R(r, 2), s = (e) => {
						var t = ep();
						q(t, () => T.cross, !0), O(t), B((e) => X(t, "title", e), [() => Z("tip.footer.removeLogo")]), H("click", t, Ku), W(e, t);
					};
					K(o, (e) => {
						V(A).footer?.brand?.logo && e(s);
					}), O(n);
					var c = R(n, 2), l = (e) => {
						var t = $g(), n = I(t), r = F(n), i = L(R(r));
						O(n);
						var a = R(n, 2);
						J(a), B((e) => {
							G(r, `${e ?? ""} `), G(i, `${V(A).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Y(a, V(A).footer?.brand?.logoHeight ?? 40);
						}, [() => Z("lbl.logoHeight")]), H("input", a, (e) => Ju(e.target.value)), W(e, t);
					};
					K(c, (e) => {
						V(A).footer?.brand?.logo && e(l);
					}), B((e, t) => {
						X(r, "title", e), G(i, `${t ?? ""} `);
					}, [() => Z("tip.webpAutoPublish"), () => V(A).footer?.brand?.logo ? Z("ui.changeLogo") : Z("ui.uploadLogo")]), H("change", a, Gu), W(e, t);
				};
				K(ne, (e) => {
					(V(A).footer?.brand?.mode ?? "text") !== "text" && e(re);
				}), O(_), O(m);
				var ie = R(m, 2), ae = F(ie), oe = L(ae, !0), E = R(ae, 2), se = F(E);
				Kr(se, 17, () => V(A).footer?.columns ?? [], Hr, (e, t, n) => {
					var r = t_(), i = I(r), a = F(i);
					J(a);
					var o = R(a, 2), s = F(o);
					q(s, () => T.plus, !0), O(s);
					var c = R(s, 2);
					c.disabled = n === 0, q(c, () => T.up, !0), O(c);
					var l = R(c, 2);
					q(l, () => T.down, !0), O(l);
					var u = R(l, 2);
					q(u, () => T.cross, !0), O(u), O(o), O(i), Kr(R(i, 2), 17, () => V(t).links ?? [], Hr, (e, r, i) => {
						var a = Dp(), o = F(a);
						J(o);
						var s = R(o, 2), c = F(s);
						c.disabled = i === 0, q(c, () => T.up, !0), O(c);
						var l = R(c, 2);
						q(l, () => T.down, !0), O(l);
						var u = R(l, 2);
						q(u, () => T.cross, !0), O(u), O(s);
						var d = R(s, 2), f = F(d);
						{
							let e = /* @__PURE__ */ j(() => V(r).page ?? "__href"), t = /* @__PURE__ */ j(() => Z("tip.linkTarget")), a = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
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
								onchange: (e) => yd(n, i, e)
							});
						}
						O(d);
						var p = R(d, 2), m = (e) => {
							var t = Ep();
							J(t), B((e, n) => {
								Y(t, V(r).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => bd(n, i, e.target.value)), W(e, t);
						};
						K(p, (e) => {
							V(r).page || e(m);
						}), O(a), B((e, n) => {
							Y(o, V(r).label), X(o, "title", e), l.disabled = i === V(t).links.length - 1, X(u, "title", n);
						}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), H("input", o, (e) => vd(n, i, e.target.value)), H("click", c, () => _d(n, i, -1)), H("click", l, () => _d(n, i, 1)), H("click", u, () => gd(n, i)), W(e, a);
					}), B((e, r, i) => {
						Y(a, V(t).title), X(a, "title", e), X(s, "title", r), l.disabled = n === V(A).footer.columns.length - 1, X(u, "title", i);
					}, [
						() => Z("tip.footer.columnTitle"),
						() => Z("tip.footer.addLink"),
						() => Z("tip.footer.removeColumn")
					]), H("input", a, (e) => md(n, e.target.value)), H("click", s, () => hd(n)), H("click", c, () => pd(n, -1)), H("click", l, () => pd(n, 1)), H("click", u, () => fd(n)), W(e, r);
				});
				var ce = R(se, 2), le = L(ce, !0), ue = R(ce, 2), D = F(ue), de = R(D);
				{
					let e = /* @__PURE__ */ j(() => V(A).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ j(() => [["left", Z("common.left")], ["center", Z("common.center")]]);
					Q(de, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => od(e)
					});
				}
				O(ue), O(E), O(ie);
				var fe = R(ie, 2), pe = F(fe), me = L(pe, !0), he = R(pe, 2), ge = F(he);
				Kr(ge, 17, () => V(A).footer?.social ?? [], Hr, (e, t, n) => {
					var r = n_(), i = F(r), a = F(i);
					q(a, () => eo(V(t).icon) || "", !0), O(a);
					var o = R(a, 2);
					{
						let e = /* @__PURE__ */ j(() => Z("blocks.icon"));
						Q(o, {
							get value() {
								return V(t).icon;
							},
							get title() {
								return V(e);
							},
							get options() {
								return Md;
							},
							onchange: (e) => Ad(n, e)
						});
					}
					O(i);
					var s = R(i, 2), c = F(s);
					c.disabled = n === 0, q(c, () => T.up, !0), O(c);
					var l = R(c, 2);
					q(l, () => T.down, !0), O(l);
					var u = R(l, 2);
					q(u, () => T.cross, !0), O(u), O(s);
					var d = R(s, 2);
					J(d), O(r), B((e, r) => {
						l.disabled = n === V(A).footer.social.length - 1, X(u, "title", e), Y(d, V(t).url), X(d, "placeholder", r);
					}, [() => Z("tip.removeLink"), () => Z("ph.hrefMailto")]), H("click", c, () => kd(n, -1)), H("click", l, () => kd(n, 1)), H("click", u, () => Od(n)), H("change", d, (e) => jd(n, e.target.value)), W(e, r);
				});
				var _e = R(ge, 2), ve = L(_e, !0);
				O(he), O(fe);
				var ye = R(fe, 2), be = F(ye), xe = L(be, !0), Se = R(be, 2), Ce = F(Se), we = F(Ce);
				J(we);
				var Te = R(we);
				O(Ce);
				var De = R(Ce, 2), Oe = (e) => {
					let t = /* @__PURE__ */ j(() => V(A).footer.cta);
					var n = r_(), r = I(n), i = F(r), a = R(i);
					{
						let e = /* @__PURE__ */ j(() => V(t).kind ?? "button"), n = /* @__PURE__ */ j(() => [["button", Z("opt.cta.button")], ["newsletter", Z("opt.cta.newsletter")]]);
						Q(a, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => cd("kind", e)
						});
					}
					O(r);
					var o = R(r, 2), s = F(o);
					J(s);
					var c = R(s);
					O(o);
					var l = R(o, 2), u = F(l), d = R(u);
					J(d), O(l);
					var f = R(l, 2), p = F(f), m = R(p);
					J(m), O(f);
					var h = R(f, 2), g = F(h), _ = R(g);
					J(_), O(h);
					var v = R(h, 2), y = (e) => {
						var n = Zf(), r = I(n), i = F(r), a = R(i);
						{
							let e = /* @__PURE__ */ j(() => V(t).page ?? "__href"), n = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHrefMailto")]]);
							Q(a, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => ld(e)
							});
						}
						O(r);
						var o = R(r, 2), s = (e) => {
							var n = Np();
							J(n), B((e, r) => {
								Y(n, V(t).href ?? ""), X(n, "placeholder", e), X(n, "title", r);
							}, [() => Z("ph.hrefMailtoAnchor"), () => Z("tip.hrefAnchor")]), H("change", n, (e) => cd("href", e.target.value)), W(e, n);
						};
						K(o, (e) => {
							V(t).page || e(s);
						}), B((e, t) => {
							X(r, "title", e), G(i, `${t ?? ""} `);
						}, [() => Z("tip.footer.ctaTarget"), () => Z("lbl.buttonTarget")]), W(e, n);
					}, b = (e) => {
						var n = Jp(), r = I(n), i = F(r), a = R(i);
						J(a), O(r);
						var o = R(r, 2), s = F(o), c = R(s);
						J(c), O(o);
						var l = R(o, 2), u = F(l), d = R(u);
						J(d), O(l), B((e, n, f, p, m, h, g, _, v) => {
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
						]), H("change", a, (e) => cd("endpoint", e.target.value)), H("change", c, (e) => cd("recipient", e.target.value)), H("input", d, (e) => cd("success", e.target.value)), W(e, n);
					};
					K(v, (e) => {
						(V(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), B((e, n, a, v, y, b, x, S, C, w, ee, T) => {
						X(r, "title", e), G(i, `${n ?? ""} `), X(o, "title", a), xi(s, V(t).big === !0), G(c, ` ${v ?? ""}`), X(l, "title", y), G(u, `${b ?? ""} `), Y(d, V(t).heading ?? ""), X(d, "placeholder", x), X(f, "title", S), G(p, `${C ?? ""} `), Y(m, V(t).sub ?? ""), X(h, "title", w), G(g, `${ee ?? ""} `), Y(_, V(t).label ?? ""), X(_, "placeholder", T);
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
					]), H("change", s, (e) => cd("big", e.target.checked)), H("input", d, (e) => cd("heading", e.target.value)), H("input", m, (e) => cd("sub", e.target.value)), H("input", _, (e) => cd("label", e.target.value)), W(e, n);
				};
				K(De, (e) => {
					V(A).footer?.cta && e(Oe);
				}), O(Se), O(ye);
				var ke = R(ye, 2), Ae = F(ke), je = L(Ae, !0), Me = R(Ae, 2), Ne = F(Me);
				o(Ne, () => "linkRow", () => V(A).footer?.linkRow ?? []);
				var Pe = R(Ne, 2), Fe = L(Pe, !0);
				O(Me), O(ke);
				var Ie = R(ke, 2), Le = F(Ie), Re = L(Le, !0), ze = R(Le, 2), Be = F(ze), Ve = (e) => {
					var t = Bm(), n = I(t), r = F(n), i = R(r);
					{
						let e = /* @__PURE__ */ j(() => V(A).footer?.align ?? "left"), t = /* @__PURE__ */ j(() => [
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
							onchange: (e) => Hu("footer", (t) => {
								t.align = e;
							})
						});
					}
					O(n), Ee(2), B((e, t) => {
						X(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Z("tip.footer.align"), () => Z("lbl.align")]), W(e, t);
				};
				K(Be, (e) => {
					V(A).footer?.cta?.big !== !0 && e(Ve);
				});
				var He = R(Be, 2), Ue = L(He, !0), We = R(He, 2);
				a(We, () => ji, () => V(A).footer?.background?.layers ?? []), O(ze), O(Ie);
				var Ge = R(Ie, 2), Ke = F(Ge), qe = L(Ke, !0), Je = R(Ke, 2), Ye = F(Je), Xe = F(Ye), Ze = R(Xe);
				J(Ze), O(Ye);
				var Qe = R(Ye, 2), k = L(Qe, !0), $e = R(Qe, 2);
				o($e, () => "baseline", () => V(A).footer?.baseline ?? []);
				var et = R($e, 2), tt = L(et, !0);
				O(Je), O(Ge), O(t), B((e, t, a, o, s, c, l, u, f, p, m, h, _, T, te, ne, re, ie, ae, E, se, ce, de, fe, pe, he, ge, _e, ye, be, Se, O) => {
					X(n, "title", e), xi(r, t), G(i, ` ${a ?? ""}`), G(d, o), G(g, s), X(v, "title", c), G(y, `${l ?? ""} `), Y(b, V(A).footer?.brand?.title ?? ""), X(b, "placeholder", u), X(x, "title", f), G(S, `${p ?? ""} `), Y(C, V(A).footer?.brand?.tagline ?? ""), X(w, "title", m), G(ee, `${h ?? ""} `), G(oe, _), G(le, T), X(ue, "title", te), G(D, `${ne ?? ""} `), G(me, re), G(ve, ie), G(xe, ae), X(Ce, "title", E), xi(we, se), G(Te, ` ${ce ?? ""}`), G(je, de), G(Fe, fe), G(Re, pe), G(Ue, he), G(qe, ge), X(Ye, "title", _e), G(Xe, `${ye ?? ""} `), Y(Ze, V(A).footer?.copyright ?? ""), X(Ze, "placeholder", be), G(k, Se), G(tt, O);
				}, [
					() => Z("tip.footer.show"),
					() => !!V(A).footer?.show,
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
					() => !!V(A).footer?.cta,
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
				]), H("change", r, (e) => Hu("footer", (t) => {
					t.show = e.target.checked;
				})), H("input", b, (e) => Uu("title", e.target.value)), H("input", C, (e) => Uu("tagline", e.target.value)), H("click", ce, dd), H("click", _e, Sd), H("change", we, (e) => sd(e.target.checked)), H("click", Pe, () => ed("linkRow")), H("input", Ze, (e) => Xu(e.target.value)), H("click", et, () => ed("baseline")), W(e, t);
			}, re = (e) => {
				var t = f_(), n = F(t), r = (e) => {
					var t = gp(), n = F(t), r = R(n);
					{
						let e = /* @__PURE__ */ j(() => V(il) ?? ""), t = /* @__PURE__ */ j(() => [["", Z("common.choose")], ...V(nl).map((e) => [e, V(rl)[e]?.name ?? e])]);
						Q(r, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => N(il, e || null, !0)
						});
					}
					O(t), B((e) => G(n, `${e ?? ""} `), [() => Z("blocks.collection")]), W(e, t);
				};
				K(n, (e) => {
					V(nl).length && e(r);
				});
				var i = R(n, 2), a = (e) => {
					let t = /* @__PURE__ */ j(() => V(rl)[V(il)]);
					var n = d_(), r = I(n), i = F(r), a = L(i, !0), o = R(i, 2), s = L(o, !0), c = R(o, 2), l = F(c), u = R(l);
					O(c);
					var d = R(c, 2);
					q(d, () => T.cross, !0), O(d), O(r);
					var f = R(r, 2);
					Kr(f, 19, () => V(t).entries, (e) => e.id, (e, n, r) => {
						var i = u_(), a = F(i), o = L(a), s = R(a, 2), c = F(s), l = F(c);
						J(l);
						var u = R(l, 2), d = F(u);
						q(d, () => T.up, !0), O(d);
						var f = R(d, 2);
						q(f, () => T.down, !0), O(f);
						var p = R(f, 2);
						q(p, () => T.cross, !0), O(p), O(u), O(c);
						var m = R(c, 2), h = (e) => {
							var t = a_(), r = F(t), i = R(r);
							J(i), O(t), B((e) => {
								G(r, `${e ?? ""} `), Y(i, V(n).date ?? "");
							}, [() => Z("lbl.date")]), H("change", i, (e) => Rl(V(il), V(n).id, "date", e.target.value)), W(e, t);
						};
						K(m, (e) => {
							V(t).kind !== "products" && e(h);
						});
						var g = R(m, 2);
						at(g);
						var _ = R(g, 2), v = (e) => {
							var t = jp(), r = F(t), i = R(r);
							J(i), O(t), B((e, t) => {
								G(r, `${e ?? ""} `), Y(i, V(n).href ?? ""), X(i, "placeholder", t);
							}, [() => Z("lbl.link"), () => Z("ph.collections.href")]), H("change", i, (e) => Rl(V(il), V(n).id, "href", e.target.value)), W(e, t);
						};
						K(_, (e) => {
							V(t).kind !== "products" && e(v);
						});
						var y = R(_, 2), b = F(y), x = F(b), S = R(x);
						O(b);
						var C = R(b, 2), w = (e) => {
							var t = o_(), r = I(t), i = R(r, 2);
							q(i, () => T.cross, !0), O(i), B((e) => {
								X(r, "src", V(n).image), X(i, "title", e);
							}, [() => Z("tip.removeImage")]), H("click", i, () => Rl(V(il), V(n).id, "image", "")), W(e, t);
						};
						K(C, (e) => {
							V(n).image && e(w);
						}), O(y);
						var ee = R(y, 2), te = (e) => {
							var t = l_(), r = I(t), i = F(r), a = R(i);
							J(a), O(r);
							var o = R(r, 2), s = F(o), c = R(s);
							J(c), O(o);
							var l = R(o, 2), u = F(l), d = R(u);
							J(d), O(l);
							var f = R(l, 2), p = F(f), m = R(p);
							J(m), O(f);
							var h = R(f, 2);
							Kr(h, 17, () => V(n).colors ?? [], Hr, (e, t, r) => {
								var i = c_(), a = F(i);
								J(a);
								var o = R(a, 2), s = F(o), c = R(s);
								O(o);
								var l = R(o, 2), u = (e) => {
									var n = s_();
									B(() => X(n, "src", V(t).image)), W(e, n);
								};
								K(l, (e) => {
									V(t).image && e(u);
								});
								var d = R(l, 2);
								q(d, () => T.cross, !0), O(d), O(i), B((e, n) => {
									Y(a, V(t).name), X(a, "placeholder", e), G(s, `${n ?? ""} `);
								}, [() => Z("ph.colorName"), () => V(t).image ? Z("ui.changeImage") : Z("ui.addImage")]), H("change", a, (e) => Wl(V(il), V(n).id, r, "name", e.target.value)), H("change", c, (e) => Gl(V(il), V(n).id, r, e)), H("click", d, () => Kl(V(il), V(n).id, r)), W(e, i);
							});
							var g = R(h, 2), _ = L(g, !0);
							B((e, t, r, h, v, y, b, x, S, C, w) => {
								G(i, `${e ?? ""} `), Y(a, V(n).price ?? ""), X(o, "title", t), G(s, `${r ?? ""} `), Y(c, V(n).memberPrice ?? ""), X(l, "title", h), G(u, `${v ?? ""} `), Y(d, V(n).badge ?? ""), X(f, "title", y), G(p, `${b ?? ""} `), Y(m, x), X(m, "placeholder", S), X(g, "title", C), G(_, w);
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
							]), H("change", a, (e) => Rl(V(il), V(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), H("change", c, (e) => Rl(V(il), V(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), H("change", d, (e) => Rl(V(il), V(n).id, "badge", e.target.value)), H("change", m, (e) => Hl(V(il), V(n).id, e.target.value)), H("click", g, () => Ul(V(il), V(n).id)), W(e, t);
						};
						K(ee, (e) => {
							V(t).kind === "products" && e(te);
						}), O(s), O(i), B((e, i, a, s, c) => {
							G(o, `${e ?? ""}${V(t).kind === "products" ? V(n).price == null ? "" : ` · ${V(n).price}` : V(n).date ? ` · ${V(n).date}` : ""}`), Y(l, V(n).title), X(l, "title", i), d.disabled = V(r) === 0, f.disabled = V(r) === V(t).entries.length - 1, X(p, "title", a), X(g, "placeholder", s), Y(g, V(n).text ?? ""), G(x, `${c ?? ""} `);
						}, [
							() => jl(V(n).title),
							() => Z("lbl.title"),
							() => Z("tip.collections.deleteEntry"),
							() => Z("ph.collections.text"),
							() => V(n).image ? Z("ui.changeImage") : Z("ui.addImage")
						]), H("change", l, (e) => Rl(V(il), V(n).id, "title", e.target.value || Z("ui.untitled"))), H("click", d, () => zl(V(il), V(r), -1)), H("click", f, () => zl(V(il), V(r), 1)), H("click", p, () => Bl(V(il), V(n).id)), H("change", g, (e) => Rl(V(il), V(n).id, "text", e.target.value)), H("change", S, (e) => Vl(V(il), V(n).id, e)), W(e, i);
					});
					var p = R(f, 2), m = (e) => {
						var t = Ap(), n = L(t, !0);
						B((e) => G(n, e), [() => Z("hint.collections.empty")]), W(e, t);
					};
					K(p, (e) => {
						V(t).entries.length || e(m);
					}), Ee(2), B((e, t, n, r, i, u) => {
						G(a, e), X(o, "title", t), G(s, n), X(c, "title", r), G(l, `${i ?? ""} `), X(d, "title", u);
					}, [
						() => Z("ui.addEntry"),
						() => Z("tip.collections.exportCsv"),
						() => Z("ui.exportCsv"),
						() => Z("tip.collections.importCsv"),
						() => Z("ui.importCsv"),
						() => Z("tip.collections.deleteCollection")
					]), H("click", i, () => Ll(V(il))), H("click", o, () => ql(V(il))), H("change", u, (e) => Jl(V(il), e)), H("click", d, () => Il(V(il))), W(e, n);
				};
				K(i, (e) => {
					V(il) && V(rl)[V(il)] && e(a);
				});
				var o = R(i, 2), s = F(o), c = R(s);
				J(c), O(o);
				var l = R(o, 2), u = F(l);
				Q(R(u), {
					get value() {
						return V(cl);
					},
					get options() {
						return ll;
					},
					onchange: (e) => N(cl, e, !0)
				}), O(l);
				var d = R(l, 2), f = L(d, !0);
				O(t), B((e, t, n, r, i) => {
					G(s, `${e ?? ""} `), X(c, "placeholder", t), G(u, `${n ?? ""} `), d.disabled = r, G(f, i);
				}, [
					() => Z("lbl.newCollectionName"),
					() => Z("ph.collections.name"),
					() => Z("common.type"),
					() => !V(al).trim(),
					() => Z("ui.createCollection")
				]), H("keydown", c, (e) => e.key === "Enter" && Pl()), Ti(c, () => V(al), (e) => N(al, e)), H("click", d, Pl), W(e, t);
			}, ie = (e) => {
				var t = y_(), n = F(t), r = (e) => {
					var t = Ap(), n = L(t, !0);
					B((e) => G(n, e), [() => Z("hint.plugins.empty")]), W(e, t);
				}, i = /* @__PURE__ */ j(() => !yu().length);
				K(n, (e) => {
					V(i) && e(r);
				});
				var a = R(n, 2);
				Kr(a, 16, yu, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ j(() => su[t]), r = /* @__PURE__ */ j(() => (V(iu)?.enabled ?? []).includes(t));
					var i = h_();
					let a;
					var o = F(i), s = F(o), c = L(s, !0), l = R(s, 2), u = (e) => {
						var t = p_(), r = L(t);
						B(() => G(r, `v${V(n).version ?? ""}`)), W(e, t);
					};
					K(l, (e) => {
						V(n)?.version && e(u);
					});
					var d = R(l, 2), f = F(d), p = F(f);
					J(p);
					var m = R(p);
					O(f);
					var h = R(f, 2);
					q(h, () => T.cross, !0), O(h), O(d), O(o);
					var g = R(o, 2), _ = (e) => {
						var t = m_(), r = L(t, !0);
						B((e) => G(r, e), [() => V(n).errors.join("; ")]), W(e, t);
					}, v = (e) => {
						var t = m_(), r = L(t, !0);
						B((e) => G(r, e), [() => Z("plugin.engineMismatch", {
							required: V(n).requiresEngine,
							current: V(cu)
						})]), W(e, t);
					}, y = (e) => {
						var t = m_(), r = L(t, !0);
						B((e) => G(r, e), [() => Z("plugin.cspNeeded", { list: Cu(V(n).csp).join(", ") })]), W(e, t);
					}, b = /* @__PURE__ */ j(() => V(n)?.csp && Cu(V(n).csp).length);
					K(g, (e) => {
						V(n)?.errors?.length ? e(_) : V(n) && !V(n).satisfied ? e(v, 1) : V(b) && e(y, 2);
					});
					var x = R(g, 2), S = (e) => {
						var t = Ap(), r = L(t, !0);
						B((e) => G(r, e), [() => Z("plugin.languages", { list: V(n).languages.map((e) => e.name).join(", ") })]), W(e, t);
					};
					K(x, (e) => {
						V(n)?.languages?.length && e(S);
					}), O(i), B((e, t, o, s, l) => {
						a = mi(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": V(n)?.errors?.length }), G(c, e), X(f, "title", t), xi(p, V(r)), p.disabled = o, G(m, ` ${s ?? ""}`), X(h, "title", l);
					}, [
						() => V(n)?.names?.[qi()] ?? V(n)?.name ?? t,
						() => V(r) ? Z("tip.plugins.on") : Z("tip.plugins.off"),
						() => !!V(n)?.errors?.length,
						() => V(r) ? Z("ui.on") : Z("ui.off"),
						() => Z("tip.plugins.remove")
					]), H("change", p, (e) => Pu(t, e.target.checked)), H("click", h, () => Iu(t)), W(e, i);
				});
				var o = R(a, 2), s = (e) => {
					var t = __(), n = R(I(t), 2), r = L(n, !0);
					Kr(R(n, 2), 16, () => V(gu), (e) => e, (e, t) => {
						var n = g_(), r = F(n), i = F(r), a = L(i, !0), o = R(i, 2), s = (e) => {
							var n = p_(), r = L(n);
							B(() => G(r, `v${su[t].version ?? ""}`)), W(e, n);
						};
						K(o, (e) => {
							su[t]?.version && e(s);
						});
						var c = R(o, 2), l = F(c);
						q(l, () => T.right, !0), O(l), O(c), O(r), O(n), B((e, t) => {
							G(a, e), X(l, "title", t);
						}, [() => su[t]?.names?.[qi()] ?? su[t]?.name ?? t, () => Z("tip.plugins.addFound")]), H("click", l, () => Ru(t)), W(e, n);
					}), B((e) => G(r, e), [() => Z("hint.plugins.found")]), W(e, t);
				};
				K(o, (e) => {
					V(gu).length && e(s);
				});
				var c = R(o, 2), l = (e) => {
					var t = jr(), n = I(t), r = (e) => {
						var t = Ap(), n = L(t, !0);
						B((e) => G(n, e), [() => Z("hint.plugins.autoDiscover")]), W(e, t);
					};
					K(n, (e) => {
						V(gu).length || e(r);
					}), W(e, t);
				}, u = (e) => {
					var t = v_(), n = R(I(t), 2);
					J(n);
					var r = R(n, 2), i = L(r, !0), a = R(r, 2), o = (e) => {
						var t = m_(), n = L(t, !0);
						B(() => G(n, V(hu))), W(e, t);
					};
					K(a, (e) => {
						V(hu) && e(o);
					}), B((e, t, a) => {
						X(n, "placeholder", e), r.disabled = t, G(i, a);
					}, [
						() => Z("ph.plugins.folder"),
						() => !V(mu).trim(),
						() => Z("ui.addPlugin")
					]), H("keydown", n, (e) => e.key === "Enter" && Lu()), Ti(n, () => V(mu), (e) => N(mu, e)), H("click", r, Lu), W(e, t);
				};
				K(c, (e) => {
					V(vu) === "ok" ? e(l) : e(u, -1);
				}), O(t), W(e, t);
			}, oe = (e) => {
				var t = Zg(), n = F(t), r = (e) => {
					var t = Ap(), n = L(t, !0);
					B((e) => G(n, e), [() => Z("hint.history.loading")]), W(e, t);
				}, i = (e) => {
					var t = zp(), n = I(t), r = (e) => {
						var t = Ap(), n = L(t, !0);
						B(() => G(n, V(_a))), W(e, t);
					};
					K(n, (e) => {
						V(_a) && e(r);
					});
					var i = R(n, 2), a = (e) => {
						var t = x_(), n = I(t), r = L(n, !0);
						Kr(R(n, 2), 19, () => V(ga), (e) => e.sha, (e, t, n) => {
							var r = b_();
							let i;
							var a = F(r), o = L(a, !0), s = L(R(a, 2));
							O(r), B((e) => {
								i = mi(r, 1, "history-row svelte-1n46o8q", null, i, { head: V(n) === 0 }), X(a, "title", V(t).sha), G(o, V(t).message), G(s, `${V(t).author ?? ""}${e ?? ""}`);
							}, [() => V(t).date ? ` · ${xa.format(new Date(V(t).date))}` : ""]), W(e, r);
						}), B((e, t) => {
							n.disabled = V(ya) || !V(me)?.allowed, X(n, "title", e), G(r, t);
						}, [() => V(me)?.allowed ? Z("tip.history.revert") : Z("tip.history.needsAccess"), () => Z("ui.revertLast")]), H("click", n, Ta), W(e, t);
					};
					K(i, (e) => {
						V(ga).length > 0 && e(a);
					}), W(e, t);
				};
				K(n, (e) => {
					V(ga) === null ? e(r) : e(i, -1);
				}), O(t), W(e, t);
			}, se = (e) => {
				var t = Zg(), n = F(t), r = (e) => {
					var t = Ap(), n = L(t, !0);
					B((e) => G(n, e), [() => Z("update.checking")]), W(e, t);
				}, i = (e) => {
					var t = S_(), n = I(t), r = L(n, !0), i = R(n, 2), a = L(i, !0);
					B((e) => {
						G(r, V(Aa)), G(a, e);
					}, [() => Z("update.retry")]), H("click", i, Ba), W(e, t);
				}, a = (e) => {
					var t = N_(), n = I(t), r = F(n), i = L(r, !0), a = R(r, 2), o = (e) => {
						var t = C_(), n = I(t);
						q(n, () => T.right, !0), O(n);
						var r = L(R(n, 2), !0);
						B(() => G(r, V(ka).target)), W(e, t);
					};
					K(a, (e) => {
						V(ka).upToDate || e(o);
					}), O(n);
					var s = R(n, 2), c = (e) => {
						var t = Ap(), n = L(t, !0);
						B((e) => G(n, e), [() => Z("update.upToDate")]), W(e, t);
					}, l = (e) => {
						var t = M_(), n = I(t), r = L(n, !0), i = R(n, 2), a = (e) => {
							var t = w_(), n = F(t), r = L(n, !0), i = R(n, 2), a = L(F(i), !0);
							O(i), O(t), B((e) => {
								G(r, e), G(a, V(ka).notes);
							}, [() => Z("update.aboutVersion", { target: V(ka).target })]), W(e, t);
						};
						K(i, (e) => {
							V(ka).notes && e(a);
						});
						var o = R(i, 2), s = (e) => {
							var t = T_(), n = F(t), r = F(n);
							q(r, () => T.warn, !0), O(r);
							var i = R(r);
							O(n);
							var a = R(n, 2), o = L(F(a), !0);
							O(a), O(t), B((e, t) => {
								X(n, "title", e), G(i, ` ${t ?? ""}`), G(o, V(ka).headers.upstream);
							}, [() => Z("update.headersManual"), () => Z("update.headersTitle")]), W(e, t);
						};
						K(o, (e) => {
							V(ka).headers?.upstream && e(s);
						});
						var c = R(o, 2);
						Kr(c, 17, () => V(ka).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = D_(), r = F(n), i = L(r, !0), a = R(r, 2), o = F(a), s = (e) => {
								var t = E_(), n = L(t, !0);
								B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
							};
							K(o, (e) => {
								V(t).action === "delete" && e(s);
							});
							var c = R(o, 2);
							q(c, () => T.warn, !0), O(c), O(a), O(n), B((e) => {
								X(r, "title", V(t).path), G(i, V(t).path), X(c, "title", e);
							}, [() => Z(`update.conflict.${V(t).conflict}`)]), W(e, n);
						});
						var l = R(c, 2), u = F(l), d = L(u), f = R(u, 2);
						Kr(f, 21, () => V(ka).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = O_(), r = F(n), i = L(r, !0), a = R(r, 2), o = (e) => {
								var t = E_(), n = L(t, !0);
								B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
							};
							K(a, (e) => {
								V(t).action === "delete" && e(o);
							}), O(n), B(() => {
								X(r, "title", V(t).path), G(i, V(t).path);
							}), W(e, n);
						}), O(f), O(l);
						var p = R(l, 2), m = (e) => {
							var t = j_(), n = I(t), r = F(n), i = L(r, !0), a = L(R(r, 2), !0);
							O(n), Kr(R(n, 2), 17, () => V(ka).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = A_(), r = F(n);
								let i;
								var a = L(r, !0), o = R(r, 2), s = F(o), c = (e) => {
									var t = E_(), n = L(t, !0);
									B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
								};
								K(s, (e) => {
									V(t).action === "delete" && e(c);
								});
								var l = R(s, 2), u = (e) => {
									var n = k_();
									q(n, () => T.warn, !0), O(n), B((e) => X(n, "title", e), [() => Z(`update.conflict.${V(t).conflict}`)]), W(e, n);
								};
								K(l, (e) => {
									V(t).conflict && e(u);
								});
								var d = R(l, 2);
								J(d), O(o), O(n), B((e, n, o, s) => {
									i = mi(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), X(r, "title", V(t).path), G(a, V(t).path), xi(d, n), X(d, "title", o), X(d, "aria-label", s);
								}, [
									() => V(Na).has(V(t).path),
									() => V(Na).has(V(t).path),
									() => Z("update.keepMine.title"),
									() => Z("update.keepMine")
								]), H("change", d, () => Va(V(t).path)), W(e, n);
							}), B((e, t) => {
								G(i, e), G(a, t);
							}, [() => Z("update.optionalTitle"), () => Z("update.keepMine")]), W(e, t);
						}, h = /* @__PURE__ */ j(() => V(ka).changes.some((e) => !e.atom));
						K(p, (e) => {
							V(h) && e(m);
						});
						var g = R(p, 2), _ = L(g, !0);
						B((e, t, n, i, a, o) => {
							G(r, e), X(u, "title", t), G(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = V(Ma) || !V(me)?.allowed, X(g, "title", a), G(_, o);
						}, [
							() => Z("update.summary", {
								writes: V(ka).changes.filter((e) => e.action === "write").length,
								deletes: V(ka).changes.filter((e) => e.action === "delete").length
							}),
							() => Z("update.atomGroup.title"),
							() => Z("update.atomTitle"),
							() => V(ka).changes.filter((e) => e.atom).length,
							() => V(me)?.allowed ? Z("update.run.title") : Z("tip.history.needsAccess"),
							() => Z("update.run", { target: V(ka).target })
						]), H("click", g, Ha), W(e, t);
					};
					K(s, (e) => {
						V(ka).upToDate ? e(c) : e(l, -1);
					}), B((e) => G(i, e), [() => Z("update.current", { version: V(ka).current })]), W(e, t);
				};
				K(n, (e) => {
					V(Ma) && !V(ka) ? e(r) : V(Aa) ? e(i, 1) : V(ka) && e(a, 2);
				}), O(t), W(e, t);
			};
			K(_, (e) => {
				V(Lt) === "pages" ? e(v) : V(Lt) === "nav" ? e(y, 1) : V(Lt) === "site" ? e(b, 2) : V(Lt) === "theme" ? e(x, 3) : V(Lt) === "blocks" ? e(w, 4) : V(Lt) === "grid" ? e(ee, 5) : V(Lt) === "properties" ? e(te, 6) : V(Lt) === "footer" ? e(ne, 7) : V(Lt) === "collections" ? e(re, 8) : V(Lt) === "plugins" ? e(ie, 9) : V(Lt) === "history" ? e(oe, 10) : V(Lt) === "update" && e(se, 11);
			}), O(t), ki(t, (e) => N(uf, e), () => V(uf)), B((e) => {
				n = mi(t, 1, "panel svelte-1n46o8q", null, n, { hidden: !V(ge) }), X(i, "title", e), G(s, Bt[V(Lt)]);
			}, [() => Vt[V(Lt)]?.map((e) => Z(e)).join("\n")]), W(e, t);
		};
		K(y, (e) => {
			V(Lt) && e(b);
		});
		var x = R(y, 2);
		let w;
		var ee = F(x), ne = F(ee);
		ki(ne, (e) => N(pe, e), () => V(pe)), O(ee), O(x), ki(x, (e) => N(Ae, e), () => V(Ae)), O(t), B((e, t) => {
			r = mi(n, 1, "rail svelte-1n46o8q", null, r, { hidden: !V(ge) }), p = mi(l, 1, "rail-gear svelte-1n46o8q", null, p, { active: V(Xa) }), X(l, "title", e), w = mi(x, 1, "frame-wrap svelte-1n46o8q", null, w, {
				mobile: V(ke) === "mobile",
				pan: V(Ue),
				fold: V(Le) > 0
			}), gi(ee, `width:${V(Ve) ?? ""}px; height:${V(He) ?? ""}px`), X(ne, "title", t), X(ne, "src", `/?page=${V(E)}&preview=1`), gi(ne, `width:${V(Ie) ?? ""}px; height:${V(Be) ?? ""}px; transform:scale(${V(Re) ?? ""}); transform-origin:top left`);
		}, [() => Z("settings.title"), () => Z("ui.previewTitle")]), H("click", l, () => N(Xa, !V(Xa))), xr("load", ne, qa), yr(ne), W(e, t);
	}, ty = (e) => {
		var t = I_(), n = L(t, !0);
		B((e) => G(n, e), [() => Z("ui.loading")]), W(e, t);
	};
	K($v, (e) => {
		V(oe) ? e(ey) : e(ty, -1);
	});
	var ny = R($v, 2), ry = (e) => {
		Es(e, {
			get image() {
				return V(ys);
			},
			onapply: xs,
			oncancel: () => N(ys, null)
		});
	};
	K(ny, (e) => {
		V(ys) && e(ry);
	});
	var iy = R(ny, 2), ay = (e) => {
		var t = R_(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2);
		Kr(a, 16, () => V(St).lines, (e) => e, (e, t) => {
			var n = L_(), r = L(n, !0);
			B(() => G(r, t)), W(e, n);
		});
		var o = R(a, 2), s = (e) => {
			var t = Np();
			J(t), it(t, !0), B(() => X(t, "placeholder", V(St).placeholder)), H("keydown", t, (e) => e.key === "Enter" && V(St).value.trim() && Tt(!0)), Ti(t, () => V(St).value, (e) => V(St).value = e), W(e, t);
		};
		K(o, (e) => {
			V(St).prompt && e(s);
		});
		var c = R(o, 2), l = F(c), u = L(l, !0), d = R(l, 2), f = L(d, !0);
		O(c), O(n), O(t), B(() => {
			G(i, V(St).title), G(u, V(St).cancelLabel), G(f, V(St).okLabel);
		}), H("pointerdown", t, (e) => Et = e.target === e.currentTarget), H("click", t, (e) => Et && e.target === e.currentTarget && Tt(!1)), H("click", l, () => Tt(!1)), H("click", d, () => Tt(!0)), W(e, t);
	};
	K(iy, (e) => {
		V(St) && e(ay);
	});
	var oy = R(iy, 2), sy = (e) => {
		var t = z_(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2), o = L(a, !0), s = R(a, 2), c = F(s), l = R(c);
		J(l), O(s);
		var u = R(s, 2), d = F(u), f = R(d);
		{
			let e = /* @__PURE__ */ j(() => Z("setup.accentPick"));
			va(f, {
				get value() {
					return V(kt);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => N(kt, e, !0)
			});
		}
		O(u);
		var p = R(u, 2), m = F(p), h = R(m);
		{
			let e = /* @__PURE__ */ j(() => Z("setup.bgLabel"));
			va(h, {
				get value() {
					return V(At);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => N(At, e, !0)
			});
		}
		O(p);
		var g = R(p, 2), _ = L(g, !0), v = R(g, 2), y = F(v), b = L(y, !0), x = R(y, 2), S = L(x, !0);
		O(v), O(n), O(t), B((e, t, n, r, a, s, u, f, p, h) => {
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
			() => !V(Ot).trim(),
			() => Z("setup.start")
		]), H("keydown", l, (e) => e.key === "Enter" && Mt()), Ti(l, () => V(Ot), (e) => N(Ot, e)), H("click", y, jt), H("click", x, Mt), W(e, t);
	};
	K(oy, (e) => {
		V(Dt) && e(sy);
	});
	var cy = R(oy, 2), ly = (e) => {
		var t = B_();
		let n;
		var r = F(t), i = L(r, !0), a = R(r, 2);
		O(t), B((e) => {
			n = mi(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: V(le) === "ok",
				error: V(le) === "error"
			}), G(i, V(ce)), X(a, "title", e);
		}, [() => Z("ui.close")]), H("click", a, () => D("")), W(e, t);
	};
	K(cy, (e) => {
		V(ce) && e(ly);
	}), O(Lv);
	var uy = R(Lv, 2), dy = (e) => {
		var t = V_(), n = F(t), r = F(n), i = L(r, !0), a = R(r, 2);
		q(a, () => T.cross, !0), O(a), O(n);
		var o = R(n, 2), s = F(o);
		c(s), O(o), O(t), B((e, n) => {
			gi(t, `left: ${V(nn).left ?? ""}px; top: ${V(nn).top ?? ""}px`), G(i, e), X(a, "title", n);
		}, [() => Z("blocks.suffix", { label: dr[V(P).type] ?? V(P).type }), () => Z("tip.closeEsc")]), H("click", a, () => N(nn, null)), W(e, t);
	};
	K(uy, (e) => {
		V(nn) && V(P) && e(dy);
	}), B(() => Vv = mi(Bv, 1, "topbar svelte-1n46o8q", null, Vv, { hidden: !V(ge) })), W(e, Iv), Ye();
}
//#endregion
//#region src/main.js
Sr([
	"change",
	"click",
	"input",
	"pointerdown",
	"keydown"
]), document.documentElement.lang = await Xi();
var W_ = Lr(U_, { target: document.getElementById("urd-admin") });
//#endregion
export { W_ as default };
