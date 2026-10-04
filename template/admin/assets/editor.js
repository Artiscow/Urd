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
var _ = 1024, v = 2048, y = 4096, b = 8192, x = 16384, S = 32768, ee = 1 << 25, te = 65536, ne = 1 << 19, re = 1 << 20, ie = 1 << 25, C = 1 << 21, ae = 1 << 22, oe = 1 << 23, se = Symbol("$state"), ce = Symbol("component"), le = Symbol("legacy props"), ue = Symbol(""), w = Symbol("attributes"), de = Symbol("class"), fe = Symbol("style"), pe = Symbol("text"), me = Symbol("form reset"), T = new class extends Error {
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
	return De(/* @__PURE__ */ un(Ee));
}
function E(e) {
	if (we) {
		if (/* @__PURE__ */ un(Ee) !== null) throw Se(), ge;
		Ee = e;
	}
}
function ke(e = 1) {
	if (we) {
		for (var t = e, n = Ee; t--;) n = /* @__PURE__ */ un(n);
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
		var i = /* @__PURE__ */ un(n);
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
function Ie(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Le(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Re() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ze(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Be() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ve(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function He() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ue() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function We() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ge() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ke = [];
function qe(e, t = !1, n = !1) {
	return Je(e, /* @__PURE__ */ new Map(), "", Ke, null, n);
}
function Je(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Je(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Je(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return t.getTime(), structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Je(t.toJSON(), n, r, i, t);
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
var Ye = null;
function Xe(e) {
	Ye = e;
}
function Ze(e, t = !1, n) {
	Ye = {
		p: Ye,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: qn,
		l: null
	};
}
function Qe(e) {
	var t = Ye, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Cn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ye = t.p, $e(e);
}
function $e(e = {}) {
	return i(e, ce, { value: !0 }), e;
}
function et() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var tt = [];
function nt() {
	var e = tt;
	tt = [], p(e);
}
function D(e) {
	if (tt.length === 0 && !jt) {
		var t = tt;
		queueMicrotask(() => {
			t === tt && nt();
		});
	}
	tt.push(e);
}
function rt() {
	for (; tt.length > 0;) nt();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var it = ~(v | y | _);
function O(e, t) {
	e.f = e.f & it | t;
}
function at(e) {
	e.f & 512 || e.deps === null ? O(e, _) : O(e, y);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function ot(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), O(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function st(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, D(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ct(e) {
	we && /* @__PURE__ */ ln(e) !== null && dn(e);
}
var lt = !1;
function ut() {
	lt || (lt = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[me]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function dt(e) {
	var t = Wn, n = qn;
	Kn(null), Jn(null);
	try {
		return e();
	} finally {
		Kn(t), Jn(n);
	}
}
function ft(e, t, n, r = n) {
	e.addEventListener(t, () => dt(n));
	let i = e[me];
	e[me] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ut();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function pt(e, t, n, r) {
	let i = et() ? _t : bt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = qn, c = mt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				gn(e, s);
			}
			ht();
		}
	}
	var d = gt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ yt(e))).then(u).catch((e) => gn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), ht();
	}) : f();
}
function mt() {
	var e = qn, t = Wn, n = Ye, r = Dt;
	return function(i = !0) {
		Jn(e), Kn(t), Xe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function ht(e = !0) {
	Jn(null), Kn(null), Xe(null), e && Dt?.deactivate();
}
function gt() {
	var e = qn, t = e.b, n = Dt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function _t(e) {
	var t = 2 | v;
	return qn !== null && (qn.f |= ne), {
		ctx: Ye,
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
var vt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function yt(e, t, n) {
	let r = qn;
	r === null && Fe();
	var i = void 0, a = Jt(_e), o = !Wn, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = qn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== T && n.reject(e);
			}).finally(ht);
		} catch (e) {
			n.reject(e), ht();
		}
		var c = Dt;
		if (o) {
			if (t.f & 32768) var l = gt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(vt);
			else for (let e of s.values()) e.reject(vt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== vt && (c.activate(), t ? (a.f |= oe, Qt(a, t)) : (a.f & 8388608 && (a.f ^= oe), Qt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), xn(() => {
		for (let e of s) e.reject(vt);
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
	let t = /* @__PURE__ */ _t(e);
	return Xn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function bt(e) {
	let t = /* @__PURE__ */ _t(e);
	return t.equals = Pe, t;
}
function xt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Mn(t[n]);
	}
}
function St(e) {
	var t, n = qn, r = e.parent;
	if (!Hn && r !== null && e.v !== _e && r.f & 24576) return xe(), e.v;
	Jn(r);
	try {
		xt(e), t = cr(e);
	} finally {
		Jn(n);
	}
	return t;
}
function Ct(e) {
	var t = St(e);
	if (!e.equals(t) && (e.wv = ar(), (!Dt?.is_fork || e.deps === null) && (Dt === null ? e.v = t : (Dt.capture(e, t, !0), Ot?.capture(e, t, !0)), e.deps === null))) {
		O(e, _);
		return;
	}
	Hn || (kt === null ? at(e) : (bn() || Dt?.is_fork) && kt.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && dt(() => {
		t.ac.abort(T), t.ac = null;
	}), t.fn !== null && (t.teardown = f), dr(t, 0), An(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && fr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Et = null, Dt = null, Ot = null, kt = null, At = null, jt = !1, Mt = !1, Nt = null, Pt = null, Ft = 0, It = 1, Lt = class e {
	id = It++;
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
		Et === null ? Et = this : (Et.#n = this, this.#t = Et), Et = this;
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
			for (var r of n.d) O(r, v), t(r);
			for (r of n.m) O(r, y), t(r);
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
		for (let e of this.#u) this.#d.delete(e), O(e, v), this.schedule(e);
		for (let e of this.#d) O(e, y), this.schedule(e);
		this.apply();
		for (var t = Nt = [], n = [], r = Pt = []; this.#c.length > 0;) {
			Ft++ > 1e3 && (this.#S(), zt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Wt(e), this.#h() || this.discard(), t;
			}
		}
		if (Dt = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Nt = null, Pt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Ut(e, t);
			r.length > 0 && Dt.#_();
			return;
		}
		let a = this.#y();
		if (a) {
			this.#x(n), this.#x(t), a.#b(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Ot = this, Vt(n), Vt(t), Ot = null, this.#s?.resolve();
		var o = Dt;
		if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
			if (o !== null) {
				for (let e of this.#c) o.#c.push(e);
				this.#c = [];
			} else o = this;
		}
		o !== null && (Kt.clear(), o.#_());
	}
	#v(e, t, n) {
		e.f ^= _;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= _ : i & 4 ? t.push(r) : or(r) && (i & 16 && this.#d.add(r), fr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), O(i, v), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), Dt = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) ot(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== _e && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), kt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		Dt = this;
	}
	deactivate() {
		Dt = null, kt = null;
	}
	flush() {
		try {
			Mt = !0, Dt = this, this.#_();
		} finally {
			Ft = 0, At = null, Nt = null, Pt = null, Mt = !1, Dt = null, kt = null, Kt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(vt);
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
		if (Dt === null) {
			let t = Dt = new e();
			!Mt && !jt && D(() => {
				t.#e || t.flush();
			});
		}
		return Dt;
	}
	apply() {
		kt = null;
	}
	schedule(e) {
		if (At = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Et = e : t.#t = e, this.linked = !1;
		}
	}
};
function Rt(e) {
	var t = jt;
	jt = !0;
	try {
		var n;
		for (e && (Dt !== null && !Dt.is_fork && Dt.flush(), n = e());;) {
			if (rt(), Dt === null) return n;
			Dt.flush();
		}
	} finally {
		jt = t;
	}
}
function zt() {
	try {
		Be();
	} catch (e) {
		gn(e, At);
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
	Dt.schedule(e);
}
function Ut(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), O(e, _);
		for (var n = e.first; n !== null;) Ut(n, t), n = n.next;
	}
}
function Wt(e) {
	O(e, _);
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
function A(e, t) {
	let n = Jt(e, t);
	return Xn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = Jt(e);
	return t || (r.equals = Pe), r;
}
function j(e, t, n = !1) {
	return Wn !== null && (!Gn || Wn.f & 131072) && et() && Wn.f & 4325394 && (Yn === null || !Yn.has(e)) && We(), Qt(e, n ? nn(t) : t, Pt);
}
var Xt = null, Zt = 0;
function Qt(e, t, n = null) {
	if (!e.equals(t)) {
		Hn ? Kt.set(e, t) : Kt.has(e) || Kt.set(e, e.v);
		var r = Lt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && St(t), kt === null && at(t);
		}
		e.wv = ar(), Xt = null, Zt = 0, tn(e, v, n), Xt = null, et() && qn !== null && qn.f & 1024 && !(qn.f & 96) && ($n === null ? er([e]) : $n.push(e)), !r.is_fork && Gt.size > 0 && !qt && $t();
	}
	return t;
}
function $t() {
	qt = !1;
	for (let e of Gt) {
		e.f & 1024 && O(e, y);
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
function en(e) {
	j(e, e.v + 1);
}
function tn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = et(), a = r.length;
		if (Zt += a, Zt > 1e5 && Xt === null && (Xt = /* @__PURE__ */ new Set()), Xt !== null) {
			if (Xt.has(e)) return;
			Xt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== qn) {
				var l = (c & v) === 0;
				if (l && O(s, t), c & 131072) Gt.add(s);
				else if (c & 2) {
					var u = s;
					kt?.delete(u), tn(u, y, n);
				} else if (l) {
					var d = s;
					c & 16 && Bt !== null && Bt.add(d), n === null ? Ht(d) : n.push(d);
				}
			}
		}
	}
}
function nn(t) {
	if (typeof t != "object" || !t || se in t || ce in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ A(0), u = null, d = rr, f = (e) => {
		if (rr === d) return e();
		var t = Wn, n = rr;
		Kn(null), ir(d);
		var r = e();
		return Kn(t), ir(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ A(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && He();
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
					r.set(t, e), en(o);
				}
			} else j(n, _e), en(o);
			return !0;
		},
		get(e, n, i) {
			if (n === se) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ A(nn(s ? e[n] : _e), u)), r.set(n, o)), o !== void 0) {
				var c = z(o);
				return c === _e ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = z(i);
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
			if (t === se) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== _e || Reflect.has(e, t);
			return (n !== void 0 || qn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ A(i ? nn(e[t]) : _e, u)), r.set(t, n)), z(n) === _e) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ A(_e, u)), r.set(d + "", p)) : j(p, _e);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ A(void 0, u)), j(c, nn(n)), r.set(t, c));
			else {
				l = c.v !== _e;
				var m = f(() => nn(n));
				j(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && j(g, _ + 1);
				}
				en(o);
			}
			return !0;
		},
		ownKeys(e) {
			z(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== _e;
			});
			for (var [n, i] of r) i.v !== _e && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Ue();
		}
	});
}
var rn, M, an, on;
function sn() {
	if (rn === void 0) {
		rn = window, M = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = a(t, "firstChild").get, on = a(t, "nextSibling").get, u(e) && (e[de] = void 0, e[w] = null, e[fe] = void 0, e.__e = void 0), u(n) && (n[pe] = void 0);
	}
}
function cn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function ln(e) {
	return an.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
function N(e, t) {
	if (!we) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(Ee);
	if (n === null) n = Ee.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), De(r), r;
	}
	return t && mn(n), De(n), n;
}
function P(e, t = !1) {
	if (!we) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (Ee?.nodeType !== 3) {
			var r = cn();
			return Ee?.before(r), De(r), r;
		}
		mn(Ee);
	}
	return Ee;
}
function F(e, t = !1) {
	if (!we) return /* @__PURE__ */ ln(e);
	var n = N(e, t);
	return E(e), n;
}
function I(e, t = 1, n = !1) {
	let r = we ? Ee : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!we) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = cn();
			return r === null ? i?.after(a) : r.before(a), De(a), a;
		}
		mn(r);
	}
	return De(r), r;
}
function dn(e) {
	e.textContent = "";
}
function fn() {
	return !1;
}
function pn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function mn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function hn(e) {
	var t = qn;
	if (t === null) return Wn.f |= oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	gn(e, t);
}
function gn(e, t) {
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
function _n(e) {
	qn === null && (Wn === null && ze(e), Re()), Hn && Le(e);
}
function vn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function yn(e, t) {
	var n = qn;
	n !== null && n.f & 8192 && (e |= b);
	var r = {
		ctx: Ye,
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
	Dt?.register_created_effect(r);
	var i = r;
	if (e & 4) Nt === null ? Lt.ensure().schedule(r) : Nt.push(r);
	else if (t !== null) {
		try {
			fr(r);
		} catch (e) {
			throw Mn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= te));
	}
	if (i !== null && (i.parent = n, n !== null && vn(i, n), Wn !== null && Wn.f & 2 && !(e & 64))) {
		var a = Wn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function bn() {
	return Wn !== null && !Gn;
}
function xn(e) {
	let t = yn(8, null);
	return O(t, _), t.teardown = e, t;
}
function Sn(e) {
	_n("$effect");
	var t = qn.f;
	if (!Wn && t & 32 && Ye !== null && !Ye.i) {
		var n = Ye;
		(n.e ??= []).push(e);
	} else return Cn(e);
}
function Cn(e) {
	return yn(4 | re, e);
}
function wn(e) {
	Lt.ensure();
	let t = yn(64 | ne, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Fn(t, () => {
			Mn(t), n(void 0);
		}) : (Mn(t), n(void 0));
	});
}
function Tn(e) {
	return yn(4, e);
}
function En(e) {
	return yn(ae | ne, e);
}
function Dn(e, t = 0) {
	return yn(8 | t, e);
}
function L(e, t = [], n = [], r = []) {
	pt(r, t, n, (t) => {
		yn(8, () => {
			e(...t.map(z));
		});
	});
}
function On(e, t = 0) {
	return yn(16 | t, e);
}
function kn(e) {
	return yn(32 | ne, e);
}
function R(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Hn, r = Wn;
		Un(!0), Kn(null);
		try {
			t.call(null);
		} catch (t) {
			gn(t, e.parent);
		} finally {
			Un(n), Kn(r);
		}
	}
}
function An(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && dt(() => {
			e.abort(T);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Nn(e.nodes.start, e.nodes.end), n = !0), e.f |= ee, An(e, t && !n), dr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	R(e), e.f ^= ee, e.f |= x;
	var i = e.parent;
	i !== null && i.first !== null && Pn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Nn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ un(e);
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
		e.f ^= b;
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
		e.f ^= b, e.f & 1024 || (O(e, v), Lt.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ un(n);
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
	Wn !== null && (Wn.f & 2097152 || Wn.f & 2) && (Yn ??= /* @__PURE__ */ new Set()).add(e);
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
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (or(a) && Ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && kt === null && O(e, _);
	}
	return !1;
}
function sr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Yn !== null && Yn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? sr(a, t, !1) : t === a && (n ? O(a, v) : a.f & 1024 && O(a, y), Ht(a));
	}
}
function cr(e) {
	var t = Zn, n = Qn, r = $n, i = Wn, a = Yn, o = Ye, s = Gn, c = rr, l = e.f;
	Zn = null, Qn = 0, $n = null, Wn = l & 96 ? null : e, Yn = null, Xe(e.ctx), Gn = !1, rr = ++nr, e.ac !== null && (dt(() => {
		e.ac.abort(T);
	}), e.ac = null);
	try {
		e.f |= C;
		var u = e.fn, d = u();
		e.f |= S;
		var f = lr(e);
		if (et() && $n !== null && !Gn && f !== null && !(e.f & 6146)) for (var p = 0; p < $n.length; p++) sr($n[p], e);
		if (i !== null && i !== e) {
			if (nr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = nr;
			if (t !== null) for (let e of t) e.rv = nr;
			$n !== null && (r === null ? r = $n : r.push(...$n));
		}
		return e.f & 8388608 && (e.f ^= oe), d;
	} catch (t) {
		return lr(e), hn(t);
	} finally {
		e.f ^= C, Zn = t, Qn = n, $n = r, Wn = i, Yn = a, Xe(o), Gn = s, rr = c;
	}
}
function lr(e) {
	var t = e.deps, n = Dt?.is_fork;
	if (Zn !== null) {
		var r;
		if (n || dr(e, Qn), t !== null && Qn > 0) for (t.length = Qn + Zn.length, r = 0; r < Zn.length; r++) t[Qn + r] = Zn[r];
		else e.deps = t = Zn;
		if (bn() && e.f & 512) for (r = Qn; r < t.length; r++) (t[r].reactions ??= []).push(e);
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
		s.f & 512 && (s.f ^= 512), s.v !== _e && at(s), s.ac !== null && dt(() => {
			s.ac.abort(T), s.ac = null, O(s, v);
		}), wt(s), dr(s, 0);
	}
}
function dr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ur(e, n[r]);
}
function fr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		O(e, _);
		var n = qn, r = Vn;
		qn = e, Vn = !(t & 96);
		try {
			t & 16777232 ? jn(e) : An(e), R(e);
			var i = cr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = tr;
		} finally {
			Vn = r, qn = n;
		}
	}
}
async function pr() {
	await Promise.resolve(), Rt();
}
function z(e) {
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
			return (!(a.f & 1024) && a.reactions !== null || hr(a)) && (o = St(a)), Kt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Gn && Wn !== null && (Vn || !!(Wn.f & 512)), c = (a.f & S) === 0;
		or(a) && (s && (a.f |= 512), Ct(a)), s && !c && (Tt(a), mr(a));
	}
	if (kt?.has(e)) return kt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function mr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Tt(t), mr(t));
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
		if (r.capture || Or.call(t, e), !e.cancelBubble) return dt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, D(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function wr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && xn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function B(e, t, n) {
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
	var t = pn("template");
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
function V(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (we) return Mr(Ee, null), Ee;
		i === void 0 && (i = jr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ ln(i)));
		var t = r || M ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ ln(t), s = t.lastChild;
			Mr(o, s);
		} else Mr(t, t);
		return t;
	};
}
function Nr(e = "") {
	if (!we) {
		var t = cn(e + "");
		return Mr(t, t), t;
	}
	var n = Ee;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), De(n)), Mr(n, n), n;
}
function Pr() {
	if (we) return Mr(Ee, null), Ee;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), Mr(t, n), e;
}
function H(e, t) {
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
		bn() && (z(n), Dn(() => (t === 0 && (r = gr(() => e(() => en(n)))), t += 1, () => {
			D(() => {
				--t, t === 0 && (r?.(), r = void 0, en(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ir = te | ne;
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
		}, this.parent = qn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
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
			this.#a = kn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		D(r), t && (this.#s = kn(() => {
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
			t = !0, n && Ge(), this.#s !== null && Fn(this.#s, () => {
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
					gn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = kn(() => e(this.#e)), D(() => {
			var e = this.#c = document.createDocumentFragment(), t = cn(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return kn(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						gn(e, this.#i.parent);
					}
					return null;
				}
			}), this.#a === null) {
				this.#c = null, n && this.#x(Dt);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Fn(this.#o, () => {
				this.#o = null;
			}), this.#x(Dt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = kn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				zn(this.#a, e);
				let t = this.#n.pending;
				this.#o = kn(() => t(this.#e));
			} else this.#x(Dt);
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
		var t = qn, n = Wn, r = Ye;
		Jn(this.#i), Kn(this.#i), Xe(this.#i.ctx);
		try {
			return Lt.ensure(), e();
		} finally {
			Jn(t), Kn(n), Xe(r);
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
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, D(() => {
			this.#d = !1, this.#m && Qt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), z(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		Dt?.is_fork ? (this.#a && Dt.skip_effect(this.#a), this.#o && Dt.skip_effect(this.#o), this.#s && Dt.skip_effect(this.#s), Dt.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Mn(this.#a), null), this.#o &&= (Mn(this.#o), null), this.#s &&= (Mn(this.#s), null), we && (De(this.#t), ke(), De(Ae()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return kn(() => {
						var r = qn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return gn(e, this.#i.parent), null;
				}
			}));
		};
		D(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				gn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => gn(e, this.#i && this.#i.parent)) : n(t);
		});
	}
}, zr = !0;
function U(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[pe] ??= e.nodeValue) && (e[pe] = n, e.nodeValue = `${n}`);
}
function Br(e, t) {
	return Hr(e, t);
}
var Vr = /* @__PURE__ */ new Map();
function Hr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	sn();
	var l = void 0, u = wn(() => {
		var u = n ?? t.appendChild(cn());
		Lr(u, { pending: () => {} }, (t) => {
			Ze({});
			var n = Ye;
			if (o && (n.c = o), a && (i.$$events = a), we && Mr(t, null), zr = s, l = e(t, i) || $e(), zr = !0, we && (qn.nodes.end = Ee, Ee === null || Ee.nodeType !== 8 || Ee.data !== "]")) throw Se(), ge;
			Qe();
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
						zn(r, t), t.append(cn()), this.#n.set(e, {
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
		var n = Dt, r = fn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = cn();
				i.append(a), this.#n.set(e, {
					effect: kn(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, kn(() => t(this.anchor)));
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
function W(e, t, n = !1) {
	var r;
	we && (r = Ee, Oe());
	var i = new Wr(e), a = n ? te : 0;
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
	On(() => {
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
			dn(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= ie, zn(a, document.createDocumentFragment())) : Mn(t[i], n);
	}
}
var Jr;
function Yr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = we ? De(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	we && Oe();
	var d = null, f = /* @__PURE__ */ bt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Zr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ie, $r(d, null, c)) : Ln(d) : Fn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: On(() => {
			p = z(f);
			var e = p.length;
			let t = !1;
			we && je(c) === "[!" != (e === 0) && (c = Ae(), De(c), Te(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Dt, v = fn(), y = 0; y < e; y += 1) {
				we && Ee.nodeType === 8 && Ee.data === "]" && (c = Ee, t = !0, Te(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Qt(S.v, b), S.i && Qt(S.i, y), v && u.unskip_effect(S.e)) : (S = Qr(l, h ? c : Jr ??= cn(), b, x, y, o, n, i), h || (S.e.f |= ie), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = kn(() => s(c)) : (d = kn(() => s(Jr ??= cn())), d.f |= ie)), e > r.size && Ie("", "", ""), we && e > 0 && De(Ae()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Te(!0), z(f);
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
			if (_.f ^= ie, _ === l) $r(_, null, n);
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
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) $r(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					ei(e, S.prev, ee.next), ei(e, d, S), ei(e, ee, b), l = b, d = ee, --v, p = [], m = [];
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
		var te = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || te.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && te.push(l), l = Xr(l.next);
		var ne = te.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) te[v].nodes?.a?.fix();
			}
			Kr(e, te, re);
		}
	}
	o && D(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Qr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Jt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? Jt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function $r(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ei(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function G(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		we && (o = De(/* @__PURE__ */ ln(c)));
	}
	L(() => {
		var e = qn;
		if (s === (s = t() ?? "")) {
			we && Oe();
			return;
		}
		if (n && !we) {
			e.nodes = null, c.innerHTML = s, s !== "" && Mr(/* @__PURE__ */ ln(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Nn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (we) {
				for (var a = Ee.data, l = Oe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw Se(), ge;
				Mr(Ee, u), o = De(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? ye : i ? be : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Mr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function ti(e, t, ...n) {
	var r = new Wr(e);
	On(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, te);
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
	dt(() => {
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
		return dt(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
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
		_ && Tn(() => {
			gr(() => h.in());
		});
	}
}
function di(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return D(() => {
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
	return D(() => {
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
function _i(e, t, n, r, i, a) {
	var o = e[de];
	if (we || o !== n || o === void 0) {
		var s = pi(n, r, a);
		(!we || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[de] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function vi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function yi(e, t, n, r) {
	var i = e[fe];
	if (we || i !== t) {
		var a = gi(t, r);
		(!we || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[fe] = t;
	} else r && (Array.isArray(r) ? (vi(e, n?.[0], r[0]), vi(e, n?.[1], r[1], "important")) : vi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var bi = Symbol("is custom element"), xi = Symbol("is html"), Si = he ? "link" : "LINK", Ci = he ? "progress" : "PROGRESS";
function K(e) {
	if (we) {
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
		e[me] = n, D(n), ut();
	}
}
function q(e, t) {
	var n = Ti(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === Ci) && (e.value = t ?? "");
}
function wi(e, t) {
	var n = Ti(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function J(e, t, n, r) {
	var i = Ti(e);
	we && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Si) || i[t] !== (i[t] = n) && (t === "loading" && (e[ue] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Di(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ti(e) {
	return e[w] ??= {
		[bi]: e.nodeName.includes("-"),
		[xi]: e.namespaceURI === ve
	};
}
var Ei = /* @__PURE__ */ new Map();
function Di(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ei.get(t);
	if (n) return n;
	Ei.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Oi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	ft(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ki(e) ? Ai(a) : a, n(a), Dt !== null && r.add(Dt), await pr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (we && e.defaultValue !== e.value || gr(t) == null && e.value) && (n(ki(e) ? Ai(e.value) : e.value), Dt !== null && r.add(Dt)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Dt;
			if (r.has(i)) return;
		}
		ki(e) && n === Ai(e.value) || (e.type !== "date" || n || e.value) && n !== e.value && (e.value = n ?? "");
	});
}
function ki(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Ai(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ji(e, t) {
	return e === t || e?.[se] === t;
}
function Mi(e = $e(), t, n, r) {
	var i = Ye.r, a = qn;
	return Tn(() => {
		var o, s;
		return Dn(() => {
			o = s, s = r?.() || [], gr(() => {
				ji(n(...s), e) || (t(e, ...s), o && ji(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ji(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Ni = !1;
function Pi(e) {
	var t = Ni;
	try {
		return Ni = !1, [e(), Ni];
	} finally {
		Ni = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Fi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ _t(r), z(u)) : (l && (l = !1, c = s ? gr(r) : r), c);
	let f;
	if (o) {
		var p = se in e || le in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = Pi(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && Ve(t), f(m)));
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
	var v = !1, y = (n & 1 ? _t : bt)(() => (v = !1, g()));
	o && z(y);
	var b = qn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? z(y) : i && o ? nn(e) : e;
			return j(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Hn && v || b.f & 16384 ? y.v : z(y);
	});
}
var Ii = {
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
		"calendar.swWeek": "Uke",
		"calendar.swMonth": "Måned",
		"calendar.recurring": "Gjentas",
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
		"calendar.places": "Steder",
		"calendar.allPlaces": "Alle steder",
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
}, Li = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Ri = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, zi = {
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
function Bi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(zi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Vi(e) {
	return Li.includes(String(e ?? ""));
}
function Hi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Ri.test(e) ? Vi(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function Ui(e) {
	let t = Bi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Ri.test(n) ? n : "nb";
}
async function Wi(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
var Gi = {
	lang: "nb",
	dict: { ...Ii.strings },
	dates: null
}, Ki = {
	lang: "nb",
	dict: {}
};
function qi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Y(e, t) {
	return qi(Ki.dict[e] ?? e, t);
}
function Ji(e, t, n) {
	let r = "other";
	try {
		r = new Intl.PluralRules(Gi.lang).select(t);
	} catch {}
	return qi(Gi.dict[`${e}.${r}`] ?? Gi.dict[`${e}.other`] ?? `${e}.${r}`, {
		...n,
		n: t
	});
}
function Yi(e) {
	let t = `api.${e?.code}`;
	return e?.code && Ki.dict[t] !== void 0 ? qi(Ki.dict[t], e) : e?.error ?? null;
}
function Xi() {
	return Ki.lang;
}
function Zi() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Ui(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Bi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Qi;
new Promise((e) => {
	Qi = e;
});
async function $i(e = Zi()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Ki.lang = Ui(e);
	let n = Vi(Ki.lang);
	try {
		Object.assign(Ki.dict, await t("nb")), n && Ki.lang !== "nb" && Object.assign(Ki.dict, await t(Ki.lang));
	} catch {}
	if (!n) {
		let e = await Wi(Ki.lang, "admin");
		e ? Object.assign(Ki.dict, e) : Ki.lang = "nb";
	}
	return Qi(Ki.lang), Ki.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/reactivity/set.js
var ea = [
	"forEach",
	"isDisjointFrom",
	"isSubsetOf",
	"isSupersetOf"
], ta = [
	"difference",
	"intersection",
	"symmetricDifference",
	"union"
], na = !1, ra = class e extends Set {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ A(0);
	#n = /* @__PURE__ */ A(0);
	#r = rr || -1;
	constructor(e) {
		if (super(), e) {
			for (var t of e) super.add(t);
			this.#n.v = super.size;
		}
		na || this.#a();
	}
	#i(e) {
		return rr === this.#r ? /* @__PURE__ */ A(e) : Jt(e);
	}
	#a() {
		na = !0;
		var t = e.prototype, n = Set.prototype;
		for (let e of ea) t[e] = function(...t) {
			return z(this.#t), n[e].apply(this, t);
		};
		for (let r of ta) t[r] = function(...t) {
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
		return super.has(e) || (super.add(e), j(this.#n, super.size), en(this.#t)), this;
	}
	delete(e) {
		var t = super.delete(e), n = this.#e, r = n.get(e);
		return r !== void 0 && (n.delete(e), j(r, !1)), t && (j(this.#n, super.size), en(this.#t)), t;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			for (var t of e.values()) j(t, !1);
			e.clear(), j(this.#n, 0), en(this.#t);
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
function ia(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function aa(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function oa(e, { delay: t = 0, duration: n = 400, easing: r = ia, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = aa(i), [p, m] = aa(a);
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
function sa(e, t, n, r) {
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
function ca(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var la = 0;
function ua(e = "urd-pop") {
	return la += 1, `--${e}-${la}`;
}
function da(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var fa = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), pa = /* @__PURE__ */ V("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), ma = /* @__PURE__ */ V("<button type=\"button\"></button>"), ha = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ga = /* @__PURE__ */ V("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), _a = /* @__PURE__ */ V("<span class=\"cp-tokens svelte-zxiloo\"></span>"), va = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), ya = /* @__PURE__ */ V("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ba = /* @__PURE__ */ V("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), xa = /* @__PURE__ */ V("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Sa = /* @__PURE__ */ V("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), Ca = /* @__PURE__ */ V("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), wa = /* @__PURE__ */ V("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Ta(e, t) {
	Ze(t, !0);
	let n = (e) => {
		var t = ba(), n = P(t), a = F(n), o = I(n, 2);
		K(o);
		var s = I(o, 2);
		K(s);
		var c = I(s, 2), l = N(c), u = I(l, 2);
		K(u);
		var d = I(u, 2), f = (e) => {
			var t = fa();
			L((e) => J(t, "title", e), [() => Y("cp.eyedropper")]), B("click", t, xe), H(e, t);
		};
		W(d, (e) => {
			be && e(f);
		}), E(c);
		var p = I(c, 2);
		Yr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = pa();
			K(r), L((e) => {
				J(r, "title", t), q(r, e);
			}, [() => ve(z(n))]), B("change", r, (e) => ye(z(n), e.target.value)), H(e, r);
		}), E(p);
		var v = I(p, 2), y = (e) => {
			var t = ha(), n = P(t), a = N(n, !0), o = I(a), s = (e) => {
				var t = Nr();
				L((e) => U(t, e), [() => Y("cp.linkedSuffix", { token: m() })]), H(e, t);
			}, c = /* @__PURE__ */ k(() => m());
			W(o, (e) => {
				z(c) && e(s);
			}), E(n);
			var l = I(n, 2);
			Yr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => g(z(t), 2));
				let i = () => z(n)[0], a = () => z(n)[1];
				var o = ma();
				let s;
				L((e) => {
					s = _i(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), yi(o, `background: ${a() ?? ""}`), J(o, "title", e);
				}, [() => Y("cp.tokenTitle", { name: i() })]), B("click", o, () => he(i(), a())), H(e, o);
			}), E(l), L((e) => U(a, e), [() => Y("cp.themeColors")]), H(e, t);
		};
		W(v, (e) => {
			i().length && e(y);
		});
		var b = I(v, 2), x = N(b), S = I(x);
		E(b);
		var C = I(b, 2), ae = (e) => {
			var t = _a();
			Yr(t, 20, () => z(_), (e) => e, (e, t) => {
				var n = ga(), r = N(n), i = I(r, 2);
				E(n), L((e) => {
					yi(r, `background: ${t ?? ""}`), J(r, "title", t), J(i, "title", e);
				}, [() => Y("cp.removeSaved")]), B("click", r, () => Se(t)), B("click", i, () => we(t)), H(e, n);
			}), E(t), H(e, t);
		};
		W(C, (e) => {
			z(_).length && e(ae);
		});
		var oe = I(C, 2), se = (e) => {
			var t = ya(), n = P(t), r = F(n, !0), i = I(n, 2);
			Yr(i, 20, () => z(h), (e) => e, (e, t) => {
				var n = va();
				L(() => {
					yi(n, `background: ${t ?? ""}`), J(n, "title", t);
				}), B("click", n, () => Se(t)), H(e, n);
			}), E(i), L((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(oe, (e) => {
			z(h).length && e(se);
		}), L((e, t, r, i, c) => {
			yi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${z(ee) ?? ""}, 100%, 50%)`), yi(a, `left: ${z(te) * 100}%; top: ${(1 - z(ne)) * 100}%`), q(o, z(ee)), q(s, e), J(s, "title", t), yi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), yi(l, `background: ${z(ie) ?? ""}`), q(u, z(ie)), U(x, `${i ?? ""} `), J(S, "title", c);
		}, [
			() => Math.round(z(re) * 100),
			() => Y("cp.alpha"),
			() => ce(),
			() => Y("cp.saved"),
			() => Y("cp.saveTitle")
		]), B("pointerdown", n, ge), B("input", o, (e) => {
			j(ee, Number(e.target.value), !0), ue();
		}), B("input", s, (e) => {
			j(re, Number(e.target.value) / 100), ue();
		}), B("change", u, _e), B("click", S, Ce), H(e, t);
	}, r = Fi(t, "value", 3, "#000000"), i = Fi(t, "tokens", 19, () => []), a = Fi(t, "label", 19, () => Y("cp.pickColor")), o = Fi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = ca(), u = ua("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ A(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, h = /* @__PURE__ */ A(nn([])), _ = /* @__PURE__ */ A(nn([])), v = "", y = "", b = /* @__PURE__ */ A(null), x = /* @__PURE__ */ A(!1), S = /* @__PURE__ */ A(nn({
		top: 0,
		left: 0
	})), ee = /* @__PURE__ */ A(0), te = /* @__PURE__ */ A(0), ne = /* @__PURE__ */ A(1), re = /* @__PURE__ */ A(1), ie = /* @__PURE__ */ A("#000000");
	function C(e) {
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
	function ue() {
		j(ie, le(), !0), y = z(ie), t.onchange?.(z(ie));
	}
	function w(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = g(e, 3);
			j(ee, t[0], !0), j(te, t[1], !0), j(ne, t[2], !0);
		})(oe(t[0], t[1], t[2])), j(re, t[3], !0), j(ie, le(), !0), !0) : !1;
	}
	function de() {
		w(p()) || w("#000000"), v = r(), y = "";
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			j(h, Array.isArray(e) ? e : [], !0);
		} catch {
			j(h, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(c) ?? "[]");
			j(_, Array.isArray(e) ? e : [], !0);
		} catch {
			j(_, [], !0);
		}
	}
	function fe(e) {
		e.newState === "open" ? (de(), da(z(b), !0), j(x, !0)) : z(x) && (da(z(b), !1), j(x, !1), me());
	}
	function pe() {
		de();
		let e = z(b).getBoundingClientRect(), t = z(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		j(S, {
			top: i,
			left: r
		}, !0), j(x, !0);
	}
	function me() {
		if (y && y !== v) {
			let e = [y, ...z(h).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function T() {
		if (l) {
			z(f)?.hidePopover();
			return;
		}
		j(x, !1), me();
	}
	function he(e, n) {
		w(n), j(ie, n, !0), t.onchange?.(e);
	}
	function ge(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			j(te, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), j(ne, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ue();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function _e(e) {
		w(e.target.value) ? ue() : j(ie, ce(), !0);
	}
	function ve(e) {
		return (C(ce()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ye(e, t) {
		let n = C(ce()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = g(e, 3);
			j(ee, t[0], !0), j(te, t[1], !0), j(ne, t[2], !0);
		})(oe(...n)), ue();
	}
	let be = typeof window < "u" && "EyeDropper" in window;
	async function xe() {
		try {
			w((await new window.EyeDropper().open()).sRGBHex) && ue();
		} catch {}
	}
	function Se(e) {
		w(e) && ue();
	}
	function Ce() {
		let e = le();
		z(_).includes(e) || (j(_, [e, ...z(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(qe(z(_)))));
	}
	function we(e) {
		j(_, z(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(qe(z(_))));
	}
	Sn(() => {
		if (!z(x)) return;
		let e = () => T();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			z(b) && !z(b).contains(e.target) && T();
		}, n = (e) => {
			e.key === "Escape" && T();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var Te = wa(), Ee = N(Te);
	let De;
	var Oe = I(Ee, 2), ke = (e) => {
		var n = xa();
		L((e, t) => {
			J(n, "title", e), J(n, "aria-label", t);
		}, [() => Y("cp.clearTitle"), () => Y("cp.clear")]), B("click", n, () => t.onchange?.("")), H(e, n);
	};
	W(Oe, (e) => {
		o() && r() && e(ke);
	});
	var Ae = I(Oe, 2), je = (e) => {
		var t = Sa(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(x) && e(i);
		}), E(t), Mi(t, (e) => j(f, e), () => z(f)), L(() => {
			J(t, "id", d), yi(t, `position-anchor: ${u ?? ""}`);
		}), wr("toggle", t, fe), B("click", t, (e) => e.preventDefault()), H(e, t);
	}, Me = (e) => {
		var t = Ca(), r = N(t);
		n(r), E(t), L(() => yi(t, `top: ${z(S).top ?? ""}px; left: ${z(S).left ?? ""}px`)), B("click", t, (e) => e.preventDefault()), H(e, t);
	};
	W(Ae, (e) => {
		l ? e(je) : z(x) && e(Me, 1);
	}), E(Te), Mi(Te, (e) => j(b, e), () => z(b)), L((e, t, n) => {
		De = _i(Ee, 1, "cp-swatch svelte-zxiloo", null, De, {
			linked: e,
			"cp-empty": o() && !r()
		}), yi(Ee, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), J(Ee, "title", n), J(Ee, "popovertarget", l ? d : void 0), J(Ee, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? Y("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), B("click", Ee, function(...e) {
		(l ? void 0 : () => z(x) ? T() : pe())?.apply(this, e);
	}), H(e, Te), Qe();
}
Tr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var Ea = 1600, Da = .82, Oa = .6, ka = 15e6, Aa = 4e6, ja = 256e3;
function Ma(e) {
	if (!Pa(e, 0, "GIF8")) return !1;
	for (let t = 13; t < e.length - 11; t++) if (e[t] === 33 && e[t + 1] === 255 && e[t + 2] === 11 && (Pa(e, t + 3, "NETSCAPE2.0") || Pa(e, t + 3, "ANIMEXTS1.0"))) return !0;
	return !1;
}
var Na = class extends Error {
	constructor(e) {
		super("The animated image is too large"), this.code = "animatedTooLarge", this.bytes = e;
	}
}, Pa = (e, t, n) => {
	if (t + n.length > e.length) return !1;
	for (let r = 0; r < n.length; r += 1) if (e[t + r] !== n.charCodeAt(r)) return !1;
	return !0;
};
function Fa(e) {
	if (!Pa(e, 0, "GIF87a") && !Pa(e, 0, "GIF89a") || e.length < 13) return !1;
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
function Ia(e) {
	return !Pa(e, 0, "RIFF") || !Pa(e, 8, "WEBP") ? !1 : Pa(e, 12, "VP8X") && e.length > 20 && !!(e[20] & 2);
}
function La(e) {
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
		if (Pa(e, t + 4, "acTL")) return !0;
		if (Pa(e, t + 4, "IDAT") || Pa(e, t + 4, "IEND")) return !1;
		t += 12 + n;
	}
	return !1;
}
function Ra(e) {
	return e instanceof Uint8Array ? Fa(e) ? "gif" : Ia(e) ? "webp" : La(e) ? "png" : null : null;
}
async function za(e) {
	if (!/^image\/(?:gif|webp|png|apng)$/i.test(e.type || "") && !/\.(?:gif|webp|a?png)$/i.test(e.name || "")) return null;
	if (e.size > 4e6) {
		let t = new Uint8Array(await e.slice(0, ja).arrayBuffer());
		if (Ra(t) || Ma(t)) throw new Na(e.size);
		return null;
	}
	let t = new Uint8Array(await e.arrayBuffer()), n = Ra(t);
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
async function Ba(e, t = Ea, { still: n = !1 } = {}) {
	if (Ha(e)) return Ua(await e.text());
	let r = n ? null : await za(e);
	if (r) return r;
	let i = await createImageBitmap(e), a = Math.min(1, t / Math.max(i.width, i.height)), o = Math.round(i.width * a), s = Math.round(i.height * a), c = document.createElement("canvas");
	c.width = o, c.height = s, c.getContext("2d").drawImage(i, 0, 0, o, s), i.close();
	let l = (e) => new Promise((t) => c.toBlob(t, "image/webp", e)), u = await l(Da);
	return u.size > 4e5 && (u = await l(Oa)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(u);
		}),
		bytes: u.size,
		width: o,
		height: s
	};
}
var Va = "image/svg+xml";
function Ha(e) {
	return e.type === Va || /\.svg$/i.test(e.name || "");
}
function Ua(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${Va};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Wa(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ga(e) {
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
function Ka(e) {
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
function qa(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function Ja(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var Ya = "urd-recent-glyphs", Xa = "urd-recent-icons", Za = [
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
function Qa(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var $a = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, eo = (e, t, n) => {
	let r = Qa(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function to() {
	return $a(Ya);
}
function no(e) {
	return eo(Ya, to(), e);
}
function ro() {
	return $a(Xa);
}
function io(e) {
	return eo(Xa, ro(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var ao = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", oo = "fill=\"currentColor\" stroke=\"none\"", so = {
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
}, co = [
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
function lo(e) {
	let t = typeof e == "string" ? so[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? oo : ao} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var uo = /* @__PURE__ */ V("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), fo = /* @__PURE__ */ V("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), po = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), mo = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), ho = /* @__PURE__ */ V("<button type=\"button\"> </button>"), go = /* @__PURE__ */ V("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), _o = /* @__PURE__ */ V("<!> <!> <!> <!>", 1), vo = /* @__PURE__ */ V("<img class=\"gp-own svelte-15ln1c3\"/>"), yo = /* @__PURE__ */ V("<span class=\"gp-svg svelte-15ln1c3\"></span>"), bo = /* @__PURE__ */ V("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), xo = /* @__PURE__ */ V("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), So = /* @__PURE__ */ V("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Co(e, t) {
	Ze(t, !0);
	let n = (e) => {
		var n = _o(), a = P(n), o = (e) => {
			var t = po(), n = P(t), r = F(n, !0), a = I(n, 2), o = N(a);
			Yr(o, 16, () => z(d), (e) => e, (e, t) => {
				var n = uo();
				let r;
				var a = N(n);
				G(a, () => lo(t), !0), E(a), E(n), L((e) => {
					r = _i(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), J(n, "title", e);
				}, [() => Y(so[t].labelKey)]), B("click", n, () => ee(t)), H(e, n);
			}), Yr(I(o, 2), 16, () => z(u), (e) => e, (e, t) => {
				var n = fo(), r = F(n, !0);
				L(() => U(r, t)), B("click", n, () => S(t)), H(e, n);
			}), E(a), L((e) => U(r, e), [() => Y("common.recent")]), H(e, t);
		};
		W(a, (e) => {
			(z(u).length || z(d).length) && e(o);
		});
		var s = I(a, 2), c = (e) => {
			var t = Pr();
			Yr(P(t), 17, () => co, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ k(() => g(z(t), 2));
				let r = () => z(n)[0], a = () => z(n)[1];
				var o = mo(), s = P(o), c = F(s, !0), l = I(s, 2);
				Yr(l, 20, a, (e) => e, (e, t) => {
					var n = uo();
					let r;
					var a = N(n);
					G(a, () => lo(t), !0), E(a), E(n), L((e) => {
						r = _i(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), J(n, "title", e);
					}, [() => Y(so[t].labelKey)]), B("click", n, () => ee(t)), H(e, n);
				}), E(l), L((e) => U(c, e), [() => Y(r())]), H(e, o);
			}), H(e, t);
		};
		W(s, (e) => {
			t.onicon && e(c);
		});
		var l = I(s, 2);
		Yr(l, 17, () => Za, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ k(() => g(z(t), 2));
			let i = () => z(n)[0], a = () => z(n)[1];
			var o = mo(), s = P(o), c = F(s, !0), l = I(s, 2);
			Yr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = ho();
				let i;
				var a = F(n, !0);
				L(() => {
					i = _i(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), U(a, t);
				}), B("click", n, () => S(t)), H(e, n);
			}), E(l), L((e) => U(c, e), [() => Y(i())]), H(e, o);
		});
		var f = I(l, 2), p = (e) => {
			var t = go(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0), o = I(i, 2);
			Mi(o, (e) => j(m, e), () => z(m));
			var s = F(I(o, 2), !0);
			L((e, t, n) => {
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
	}, r = Fi(t, "value", 3, "★"), i = Fi(t, "icon", 3, null), a = Fi(t, "image", 3, null), o = Fi(t, "label", 19, () => Y("gp.pickGlyph")), s = ca(), c = ua("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ A(nn([])), d = /* @__PURE__ */ A(nn([])), f = /* @__PURE__ */ A(null), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), h = /* @__PURE__ */ A(!1), _ = /* @__PURE__ */ A(nn({
		top: 0,
		left: 0
	}));
	function v() {
		j(u, to(), !0), j(d, t.onicon ? ro().filter((e) => so[e]) : [], !0);
	}
	function y(e) {
		j(h, e.newState === "open"), da(z(f), z(h)), z(h) && v();
	}
	function b() {
		s && z(p)?.hidePopover(), j(h, !1);
	}
	function x() {
		v();
		let e = z(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		j(_, {
			top: n,
			left: t
		}, !0), j(h, !0);
	}
	function S(e) {
		no(e), t.onpick?.(e), b();
	}
	function ee(e) {
		io(e), t.onicon?.(e), b();
	}
	async function te(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", n) {
			try {
				let e = await Ba(n, 256, { still: !0 });
				t.onimage?.(e.dataUrl);
			} catch (e) {
				console.warn("Urd: the icon could not be read", e);
			}
			b();
		}
	}
	Sn(() => {
		if (!z(h)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			z(f) && !z(f).contains(e.target) && j(h, !1);
		}, n = (e) => {
			e.key === "Escape" && j(h, !1);
		}, r = (e) => {
			z(f) && e.target instanceof Node && !z(f).contains(e.target) && j(h, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var ne = So(), re = N(ne), ie = N(re), C = (e) => {
		var t = vo();
		L((e) => {
			J(t, "src", a()), J(t, "alt", e);
		}, [() => Y("gp.ownIcon")]), H(e, t);
	}, ae = (e) => {
		var t = yo();
		G(t, () => lo(i()), !0), E(t), H(e, t);
	}, oe = (e) => {
		var t = Nr();
		L(() => U(t, r() || "★")), H(e, t);
	};
	W(ie, (e) => {
		a() ? e(C) : i() && so[i()] ? e(ae, 1) : e(oe, -1);
	}), E(re);
	var se = I(re, 2), ce = (e) => {
		var t = bo(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(h) && e(i);
		}), E(t), Mi(t, (e) => j(p, e), () => z(p)), L(() => {
			J(t, "id", l), yi(t, `position-anchor: ${c ?? ""}`);
		}), wr("toggle", t, y), H(e, t);
	}, le = (e) => {
		var t = xo(), r = N(t);
		n(r), E(t), L(() => yi(t, `top: ${z(_).top ?? ""}px; left: ${z(_).left ?? ""}px`)), H(e, t);
	};
	W(se, (e) => {
		s ? e(ce) : z(h) && e(le, 1);
	}), E(ne), Mi(ne, (e) => j(f, e), () => z(f)), L(() => {
		J(re, "title", o()), J(re, "aria-label", o()), J(re, "popovertarget", s ? l : void 0), yi(re, s ? `anchor-name: ${c}` : void 0);
	}), B("click", re, function(...e) {
		(s ? void 0 : () => z(h) ? j(h, !1) : x())?.apply(this, e);
	}), H(e, ne), Qe();
}
Tr(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var wo = /* @__PURE__ */ V("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), To = /* @__PURE__ */ V("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div>"), Eo = /* @__PURE__ */ V("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), Do = /* @__PURE__ */ V("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), Oo = /* @__PURE__ */ V("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), ko = /* @__PURE__ */ V("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), Ao = /* @__PURE__ */ V("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), jo = /* @__PURE__ */ V("<!> <!>", 1), Mo = /* @__PURE__ */ V("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), No = /* @__PURE__ */ V("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), Po = /* @__PURE__ */ V("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), Fo = /* @__PURE__ */ V("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), Io = /* @__PURE__ */ V("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Lo = /* @__PURE__ */ V("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function Ro(e, t) {
	Ze(t, !0);
	let n = (e) => {
		var t = jo(), n = P(t), a = (e) => {
			var t = To(), n = N(t);
			let r;
			var i = F(n, !0), a = I(n, 2);
			let s;
			var c = N(a, !0), l = I(c), u = (e) => {
				var t = wo(), n = F(t, !0);
				L(() => U(n, z(S).length)), H(e, t);
			};
			W(l, (e) => {
				z(S).length && e(u);
			}), E(a), E(t), L((e, l) => {
				J(t, "aria-label", o()), r = _i(n, 1, "mp-tab svelte-1y5ipgc", null, r, { on: z(_) === "icons" }), J(n, "aria-pressed", z(_) === "icons"), U(i, e), s = _i(a, 1, "mp-tab svelte-1y5ipgc", null, s, { on: z(_) === "images" }), J(a, "aria-pressed", z(_) === "images"), U(c, l);
			}, [() => Y("mp.icons"), () => Y("mp.images")]), B("click", n, () => j(_, "icons")), B("click", a, () => j(_, "images")), H(e, t);
		};
		W(n, (e) => {
			l() || e(a);
		});
		var c = I(n, 2), u = (e) => {
			var t = Oo(), n = P(t);
			K(n);
			var a = I(n, 2), o = N(a), c = N(o);
			let l;
			Yr(I(c, 2), 17, () => z(x), ({ id: e }) => e, (e, t) => {
				let n = () => z(t).id;
				var a = Eo();
				let o;
				var s = N(a);
				G(s, () => lo(n()), !0), E(s), E(a), L((e, t) => {
					o = _i(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), J(a, "title", e), J(a, "aria-label", t);
				}, [() => Y(so[n()].labelKey), () => Y(so[n()].labelKey)]), B("click", a, () => ie(n())), H(e, a);
			}), E(o);
			var u = I(o, 2), d = (e) => {
				var t = Do(), n = F(t, !0);
				L((e) => U(n, e), [() => Y("mp.noHits")]), H(e, t);
			};
			W(u, (e) => {
				z(x).length || e(d);
			}), E(a), L((e, t) => {
				J(n, "placeholder", e), J(n, "aria-label", t), l = _i(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), J(c, "title", s()), J(c, "aria-label", s());
			}, [() => Y("mp.search"), () => Y("mp.search")]), Oi(n, () => z(v), (e) => j(v, e)), B("click", c, ae), H(e, t);
		}, d = (e) => {
			var t = Ao(), n = N(t), r = N(n), a = F(I(N(r), 2), !0);
			E(r), Yr(I(r, 2), 16, () => z(S), (e) => e, (e, t) => {
				var n = ko();
				let r;
				var a = F(n);
				L(() => {
					r = _i(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), J(a, "src", t);
				}), B("click", n, () => C(t)), H(e, n);
			}), E(n);
			var o = F(I(n, 2), !0);
			E(t), L((e, t) => {
				U(a, e), U(o, t);
			}, [() => Y("mp.upload"), () => Y("mp.imagesHint")]), B("click", r, ce), H(e, t);
		};
		W(c, (e) => {
			z(_) === "icons" ? e(u) : e(d, -1);
		}), H(e, t);
	}, r = Fi(t, "icon", 3, ""), i = Fi(t, "image", 3, ""), a = Fi(t, "images", 19, () => []), o = Fi(t, "label", 19, () => Y("mp.pickMark")), s = Fi(t, "noneLabel", 19, () => Y("common.none")), c = Fi(t, "klass", 3, ""), l = Fi(t, "iconsOnly", 3, !1), u = ca(), d = ua("urd-mp"), f = d.slice(2), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), h = /* @__PURE__ */ A(null), g = /* @__PURE__ */ A(!1), _ = /* @__PURE__ */ A("icons"), v = /* @__PURE__ */ A(""), y = /* @__PURE__ */ A(nn({
		top: 0,
		left: 0
	})), b = co.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), x = /* @__PURE__ */ k(() => {
		let e = z(v).trim().toLowerCase();
		return e ? b.filter(({ id: t }) => {
			let n = Y(so[t].labelKey) || so[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : b;
	}), S = /* @__PURE__ */ k(() => [...new Set(a().filter(Boolean))]);
	function ee() {
		j(v, ""), j(oe, !1), j(_, i() && !l() ? "images" : "icons", !0);
	}
	function te(e) {
		j(g, e.newState === "open"), da(z(p), z(g)), z(g) && ee();
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
	function ie(e) {
		t.onpick?.({
			icon: e,
			image: ""
		});
	}
	function C(e) {
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
	Sn(() => {
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
	var le = Lo(), ue = N(le), w = N(ue), de = (e) => {
		var n = Pr();
		ti(P(n), () => t.children), H(e, n);
	}, fe = (e) => {
		var t = Mo();
		L(() => J(t, "src", i())), H(e, t);
	}, pe = (e) => {
		var t = No();
		G(t, () => lo(r()), !0), E(t), H(e, t);
	}, me = (e) => {
		H(e, Po());
	};
	W(w, (e) => {
		t.children ? e(de) : i() ? e(fe, 1) : r() && so[r()] ? e(pe, 2) : e(me, -1);
	}), E(ue);
	var T = I(ue, 2), he = (e) => {
		var t = Fo(), r = N(t), i = (e) => {
			n(e);
		};
		W(r, (e) => {
			z(g) && e(i);
		}), E(t), Mi(t, (e) => j(m, e), () => z(m)), L(() => {
			J(t, "id", f), yi(t, `position-anchor: ${d ?? ""}`);
		}), wr("toggle", t, te), H(e, t);
	}, ge = (e) => {
		var t = Io(), r = N(t);
		n(r), E(t), L(() => yi(t, `top: ${z(y).top ?? ""}px; left: ${z(y).left ?? ""}px`)), H(e, t);
	};
	W(T, (e) => {
		u ? e(he) : z(g) && e(ge, 1);
	});
	var _e = I(T, 2);
	Mi(_e, (e) => j(h, e), () => z(h)), E(le), Mi(le, (e) => j(p, e), () => z(p)), L(() => {
		_i(ue, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), J(ue, "title", o()), J(ue, "aria-label", o()), J(ue, "popovertarget", u ? f : void 0), yi(ue, u ? `anchor-name: ${d}` : void 0);
	}), B("click", ue, function(...e) {
		(u ? void 0 : () => z(g) ? j(g, !1) : re())?.apply(this, e);
	}), B("change", _e, se), wr("cancel", _e, () => j(oe, !1)), H(e, le), Qe();
}
Tr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function zo(e, t = {}) {
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
		sendFitBlock(e, t, n = 0) {
			r({
				type: "urd-fit-block",
				sectionId: e,
				blockId: t,
				seq: n
			});
		},
		sendFrames(e, t, n) {
			r({
				type: "urd-frames",
				sectionId: e,
				frames: t,
				minHeight: n
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
function Bo(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Vo(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Bo(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Bo(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function Ho(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function Uo(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var Wo = 3840, Go = 2400, Ko = (e, t, n) => Math.min(n, Math.max(t, e));
function qo({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Jo(e) {
	return !e || typeof e.innerWidth != "number" ? null : qo({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function Yo(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = Ko(Number.isFinite(i) && i > 0 ? i : t, 640, Wo), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? Ko(o, 480, Go) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function Xo(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var Zo = 1920, Qo = [
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
], $o = [
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
], es = [
	1920,
	1536,
	1366
];
function ts(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Zo, Math.max(960, n));
}
function ns(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function rs(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function is(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function as(e) {
	return $o.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var os = {
	min: 0,
	max: 64,
	step: 1
}, ss = {
	min: 12,
	max: 28,
	step: 1
}, cs = {
	min: 0,
	max: 80,
	step: 1
}, ls = {
	min: 0,
	max: 64,
	step: 1
}, us = {
	min: 480,
	max: 1920,
	step: 20
}, ds = {
	min: .3,
	max: .8,
	step: .05
}, fs = {
	min: 0,
	max: 400,
	step: 10
}, ps = {
	min: 0,
	max: 1200,
	step: 20
}, ms = {
	min: 0,
	max: 64,
	step: 1
}, hs = {
	min: 180,
	max: 400,
	step: 1
}, gs = {
	min: 12,
	max: 128,
	step: 1
}, _s = {
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
}, vs = [
	"sm",
	"md",
	"lg",
	"xl"
], ys = .67;
function bs(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function xs(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function Ss(e, t) {
	if (e?.padY != null && e.padY !== "") return xs(e.padY, os, _s.md.padY);
	let n = _s[e?.size] ?? _s.md;
	return Math.round(n.padY * (bs(t) ? ys : 1));
}
function Cs(e) {
	if (e?.textSize != null && e.textSize !== "") return xs(e.textSize, ss, _s.md.textSize);
	let t = _s[e?.size] ?? _s.md;
	return Math.round(t.textSize);
}
function ws(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : vs.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var Ts = /* @__PURE__ */ V("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), Es = /* @__PURE__ */ V("<span class=\"dd-note svelte-vtocc6\"> </span>"), Ds = /* @__PURE__ */ V("<button type=\"button\"> <!></button>"), Os = /* @__PURE__ */ V("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), ks = /* @__PURE__ */ V("<div class=\"dd-pop svelte-vtocc6\"></div>"), As = /* @__PURE__ */ V("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), js = /* @__PURE__ */ V("<span class=\"dd svelte-vtocc6\"><!></span>");
function X(e, t) {
	Ze(t, !0);
	let n = (e) => {
		var t = Ts();
		let n;
		L(() => n = _i(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": z(f) })), H(e, t);
	}, r = Fi(t, "value", 3, null), i = Fi(t, "options", 19, () => []), a = Fi(t, "title", 3, null), o = Fi(t, "disabled", 3, !1), s = Fi(t, "filled", 3, !1), c = Fi(t, "compact", 3, !1), l = ca(), u = ua("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ A(!1), p = /* @__PURE__ */ A(null), m = /* @__PURE__ */ A(null), h = /* @__PURE__ */ A(nn({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = z(p).getBoundingClientRect(), t = Math.min(320, i().reduce((e, t) => e + (t[2] ? 76 : 32), 12)), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		j(h, {
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
	Sn(() => {
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
	var x = js(), S = N(x), ee = (e) => {
		var t = Os(), l = P(t);
		let p;
		var h = N(l), v = F(h, !0), y = I(h, 2);
		n(y), E(l);
		var x = I(l, 2), S = N(x), ee = (e) => {
			var t = Pr();
			Yr(P(t), 17, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ k(() => g(z(t), 3));
				let i = () => z(n)[0], a = () => z(n)[1], o = () => z(n)[2];
				var s = Ds();
				let c;
				var l = N(s, !0), u = I(l), d = (e) => {
					var t = Es(), n = F(t, !0);
					L(() => U(n, o())), H(e, t);
				};
				W(u, (e) => {
					o() && e(d);
				}), E(s), L(() => {
					c = _i(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), U(l, a());
				}), B("click", s, () => b(i())), H(e, s);
			}), H(e, t);
		};
		W(S, (e) => {
			z(f) && e(ee);
		}), E(x), Mi(x, (e) => j(m, e), () => z(m)), L((e) => {
			p = _i(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), J(l, "title", a()), l.disabled = o(), J(l, "popovertarget", d), yi(l, `anchor-name: ${u ?? ""}`), U(v, e), J(x, "id", d), yi(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), wr("toggle", x, (e) => {
			j(f, e.newState === "open");
		}), H(e, t);
	}, te = (e) => {
		var t = As(), l = P(t);
		let u;
		var d = N(l), p = F(d, !0), m = I(d, 2);
		n(m), E(l);
		var v = I(l, 2), x = (e) => {
			var t = ks();
			Yr(t, 21, i, ([e, t, n]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ k(() => g(z(t), 3));
				let i = () => z(n)[0], a = () => z(n)[1], o = () => z(n)[2];
				var s = Ds();
				let c;
				var l = N(s, !0), u = I(l), d = (e) => {
					var t = Es(), n = F(t, !0);
					L(() => U(n, o())), H(e, t);
				};
				W(u, (e) => {
					o() && e(d);
				}), E(s), L(() => {
					c = _i(s, 1, "dd-opt svelte-vtocc6", null, c, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), U(l, a());
				}), B("click", s, () => b(i())), H(e, s);
			}), E(t), L(() => yi(t, `top: ${z(h).top ?? ""}px; left: ${z(h).left ?? ""}px; min-width: ${z(h).width ?? ""}px`)), H(e, t);
		};
		W(v, (e) => {
			z(f) && e(x);
		}), L((e) => {
			u = _i(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), J(l, "title", a()), l.disabled = o(), U(p, e);
		}, [() => _()]), B("click", l, y), H(e, t);
	};
	W(S, (e) => {
		l ? e(ee) : e(te, -1);
	}), E(x), Mi(x, (e) => j(p, e), () => z(p)), H(e, x), Qe();
}
Tr(["click"]);
//#endregion
//#region src/lib/Choice.svelte
var Ms = /* @__PURE__ */ V("<button type=\"button\"> </button>"), Ns = /* @__PURE__ */ V("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function Ps(e, t) {
	Ze(t, !0);
	let n = Fi(t, "title", 3, void 0), r = /* @__PURE__ */ k(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 20), i = (e) => `${e ?? ""}`;
	var a = Ns();
	let o;
	var s = N(a), c = F(s, !0), l = I(s, 2);
	Yr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ k(() => g(z(n), 2));
		let a = () => z(r)[0], o = () => z(r)[1];
		var s = Ms();
		let c;
		var l = F(s, !0);
		L((e, t) => {
			J(s, "aria-pressed", e), c = _i(s, 1, "svelte-1ehof1c", null, c, { on: t }), U(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), B("click", s, () => t.onchange(a())), H(e, s);
	}), E(l), E(a), L(() => {
		o = _i(a, 1, "choice svelte-1ehof1c", null, o, { stacked: z(r) }), J(a, "title", n()), U(c, t.label), J(l, "aria-label", t.label);
	}), H(e, a), Qe();
}
Tr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Fs = /* @__PURE__ */ V("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Is(e, t) {
	Ze(t, !0);
	let n = Fi(t, "image", 3, ""), r = /* @__PURE__ */ A(null), i = /* @__PURE__ */ A(null), a = /* @__PURE__ */ A(1), o = /* @__PURE__ */ A(.5), s = /* @__PURE__ */ A(.5), c = /* @__PURE__ */ A(1), l = /* @__PURE__ */ A(1), u = /* @__PURE__ */ A(1);
	Sn(() => {
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
	Sn(() => {
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
	var h = Fs(), g = N(h), _ = N(g), v = F(_, !0), y = I(_, 2), b = N(y);
	J(b, "width", 220), J(b, "height", 220), Mi(b, (e) => j(r, e), () => z(r));
	var x = F(I(b, 2), !0);
	E(y);
	var S = I(y, 2), ee = N(S), te = F(I(ee));
	E(S);
	var ne = I(S, 2);
	K(ne);
	var re = I(ne, 2), ie = N(re), C = F(I(ie));
	E(re);
	var ae = I(re, 2);
	K(ae);
	var oe = I(ae, 2), se = N(oe), ce = F(I(se));
	E(oe);
	var le = I(oe, 2);
	K(le);
	var ue = I(le, 2), w = N(ue), de = F(I(w));
	E(ue);
	var fe = I(ue, 2);
	K(fe);
	var pe = I(fe, 2), me = N(pe), T = F(me, !0), he = I(me, 2), ge = F(he, !0);
	E(pe);
	var _e = I(pe, 2), ve = N(_e), ye = F(ve, !0), be = I(ve, 2), xe = F(be, !0);
	E(_e), E(g), E(h), L((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		U(v, e), J(b, "title", t), U(x, n), U(ee, `${r ?? ""} `), U(te, `${i ?? ""}x`), U(ie, `${a ?? ""} `), U(C, `${o ?? ""}%`), U(se, `${s ?? ""} `), U(ce, `${c ?? ""}%`), U(w, `${l ?? ""} `), U(de, `${u ?? ""}%`), U(T, d), U(ge, f), U(ye, p), U(xe, m);
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
	]), B("pointerdown", b, f), Oi(ne, () => z(a), (e) => j(a, e)), Oi(ae, () => z(c), (e) => j(c, e)), Oi(le, () => z(l), (e) => j(l, e)), Oi(fe, () => z(u), (e) => j(u, e)), B("click", me, () => j(u, 0)), B("click", he, p), B("click", ve, () => t.oncancel?.()), B("click", be, m), H(e, h), Qe();
}
Tr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var Ls = () => [
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
], Rs = 24, zs = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function Bs(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - Rs) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var Vs = {
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
}, Hs = { bildegalleri: "slideshow" }, Us = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Ws = {
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
function Gs(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) Vs[e.type] && (e.type = Vs[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) Hs[t.type] && (t.type = Hs[t.type]);
		Us[e.theme] && (e.theme = Us[e.theme]), Ws[e.preset] && (e.preset = Ws[e.preset]);
	}
	return e;
}
var Ks = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = Bs(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && zs[n] && (e.attention.reason = zs[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Gs(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Gs(t);
		return e;
	}
}, qs = {
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
function Js(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = qs[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Ys(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = Ks[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function Xs(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Zs = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Qs(e, t) {
	let n = Xs(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Xs(t[2]), a = Zs(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var $s = /^[a-z0-9][a-z0-9-]*$/;
function ec(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	$s.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), Xs(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...Hi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function tc(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var nc = () => ({ mobile: {
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
}), rc = (e, t, n = {}) => ({
	id: tc("blk"),
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
}), ic = (e, t = {}) => ({
	id: tc("blk"),
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
}), ac = (e, t, n = {}) => ({
	id: tc("blk"),
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
}), oc = (e, t, n = 40) => ({
	id: tc("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), sc = (e, t = {}) => ({
	id: tc("blk"),
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
}), cc = (e, t = {}) => ({
	id: tc("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: Y("form.sendDefault"),
		successText: Y("form.thanksDefault"),
		fields: Ls(),
		...t
	},
	animation: null,
	frames: e
}), lc = (e, t = {}) => ({
	id: tc("blk"),
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
}), uc = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), dc = (e, t, n = {}) => ({
	id: tc("blk"),
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
}), fc = (e, t = {}) => ({
	id: tc("blk"),
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
}), pc = (e, t = {}) => ({
	id: tc("blk"),
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
}), mc = (e, t = {}) => ({
	id: tc("blk"),
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
}), hc = (e, t = {}) => ({
	id: tc("blk"),
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
}), gc = (e, t) => ({
	id: tc("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), _c = (e, t = {}) => ({
	id: tc("blk"),
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
}), vc = (e, t) => ({
	id: tc("blk"),
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
}), yc = (e, t = {}) => ({
	id: tc("blk"),
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
}), bc = (...e) => ({
	version: 1,
	layers: e
}), xc = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), Sc = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Cc = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), wc = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), Tc = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = wc(e, t, n, r, i, a);
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
		y: Cc(e) + 16,
		n: 0
	};
}, Ec = (e, t, n) => e + t * .1 + n * .01, Dc = (e, t, n, r, i = null) => ({
	id: tc("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: nc()
});
function Oc(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => Dc("blank", "40vh", bc(xc("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => Dc("hero", "70vh", {
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
				Sc(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			rc(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
			rc(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
			ac(Z(8.33, 118, 20, 32), Y("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => Dc("hero-centered", "60vh", bc(xc("bg")), [
			rc(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
			rc(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
			ac(Z(31.5, 160, 17, 40), Y("seed.join")),
			ac(Z(51.5, 160, 17, 40), Y("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = Dc("hero-image", "70vh", {
				version: 1,
				layers: [
					xc("bg"),
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
				rc(Z(8.33, 40, 50, 38), Y("seed.hero.title")),
				rc(Z(8.33, 84, 41.67, 26), Y("seed.hero.intro")),
				ac(Z(8.33, 118, 20, 32), Y("seed.readMore"))
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
			let e = Dc("hero-photos", "70vh", {
				version: 1,
				layers: [
					xc("bg"),
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
				rc(Z(15, 64, 70, 44), Y("seed.heroCenter.title"), { align: "center" }),
				rc(Z(25, 116, 50, 26), Y("seed.heroCenter.intro"), { align: "center" }),
				ac(Z(41.5, 160, 17, 40), Y("seed.readMore"))
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
		create: () => Dc("images", "360px", bc(xc("bg")), [
			rc(Z(4, 24, 50, 32), Y("seed.images.title")),
			ic(Z(4, 72, 28, 220)),
			ic(Z(36, 72, 28, 220)),
			ic(Z(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = Tc(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [ic(Z(t, n, 28, 220))],
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
		create: () => Dc("gallery", "440px", bc(xc("bg")), [rc(Z(4, 24, 50, 32), Y("seed.gallery.title")), hc(Z(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => Dc("find-us", "480px", bc(xc("bg")), [rc(Z(6, 40, 60, 70), Y("seed.findUs.title")), sc(Z(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => Dc("whats-on", "520px", bc(xc("bg")), [rc(Z(6, 40, 60, 70), Y("seed.whatsOn.title")), lc(Z(6, 130, 88, 320, 2), { limit: 5 })])
	});
	let t = (t, n, r) => e.sections.define(t, {
		label: `What is on: ${t.slice(9)}`,
		labelKey: `preset.${t}.label`,
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Events from a subscribable calendar (iCal/Google)",
		hintKey: `preset.${t}.hint`,
		create: () => Dc(t, n, bc(xc("bg")), [rc(Z(6, 40, 60, 70), Y("seed.whatsOn.title")), r()])
	});
	t("whats-on-cards", "560px", () => lc(Z(6, 130, 88, 360, 2), {
		view: "cards",
		limit: 6
	})), t("whats-on-month", "720px", () => lc(Z(6, 130, 88, 520, 2), { view: "month" })), t("whats-on-week", "560px", () => lc(Z(6, 130, 88, 360, 2), {
		view: "week",
		design: "weekStrip"
	})), t("whats-on-next", "460px", () => lc(Z(6, 130, 48, 260, 2), {
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
		create: () => Dc("contact-form", "520px", bc(xc("bg")), [rc(Z(6, 40, 60, 120), Y("seed.contactForm.intro")), cc(Z(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => Dc("contact", "320px", bc(xc("surface"), Sc(.2, .8, .2)), [
			rc(Z(10, 32, 40, 36), Y("seed.contact.title")),
			rc(Z(10, 84, 36, 130), Y("seed.contact.info"), { box: !0 }),
			ac(Z(60, 100, 22, 40), Y("seed.contact.button"), { href: `mailto:${Y("seed.email")}` })
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
				let i = oc(Z(e + 10.5, 88, 4, 52), n), a = rc(Z(e, 152, 25, 200), Y("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = uc(), i.mobileOrder = Ec(88, t, 0), a.mobileOrder = Ec(88, t, 1), [i, a];
			};
			return Dc("feature-cards", "420px", bc(xc("bg")), [
				rc(Z(6, 28, 60, 38), Y("seed.features.title")),
				...e(6, 0, "✦", Y("seed.features.card1")),
				...e(37.5, 1, "★", Y("seed.features.card2")),
				...e(69, 2, "✓", Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Tc(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = oc(Z(t + 10.5, n - 64, 4, 52), "✦"), a = rc(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = uc(), i.mobileOrder = Ec(88, r, 0), a.mobileOrder = Ec(88, r, 1), {
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
				let r = rc(Z(e, 88, 25, 200), Y("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = uc(), r.mobileOrder = Ec(88, t, 0), r;
			};
			return Dc("feature-cards-simple", "360px", bc(xc("bg")), [
				rc(Z(6, 28, 60, 38), Y("seed.features.title")),
				e(6, 0, Y("seed.features.card1")),
				e(37.5, 1, Y("seed.features.card2")),
				e(69, 2, Y("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Tc(e, 3, 6, 31.5, 88, 232, 25, 200), i = rc(Z(t, n, 25, 200), Y("seed.features.card", { title: Y("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = uc(), i.mobileOrder = Ec(88, r, 0), {
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
				let n = ic(Z(e, 88, 25, 160)), r = rc(Z(e, 256, 25, 160), Y("seed.news.card"));
				return n.mobileOrder = Ec(88, t, 0), r.mobileOrder = Ec(88, t, 1), [n, r];
			};
			return Dc("news", "460px", bc(xc("bg")), [
				rc(Z(6, 28, 50, 38), Y("seed.news.title")),
				ac(Z(78, 30, 16, 36), Y("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = Tc(e, 3, 6, 31.5, 88, 344, 25, 328), i = ic(Z(t, n, 25, 160)), a = rc(Z(t, n + 168, 25, 160), Y("seed.news.card"));
			return i.mobileOrder = Ec(88, r, 0), a.mobileOrder = Ec(88, r, 1), {
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
		create: () => Dc("news-collection", "300px", bc(xc("bg")), [rc(Z(6, 28, 50, 38), Y("seed.news.title")), dc(Z(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => Dc("noticeboard", "300px", bc(xc("surface")), [rc(Z(6, 28, 50, 38), Y("seed.noticeboard.title")), dc(Z(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => Dc("publication-archive", "300px", bc(xc("bg")), [rc(Z(6, 28, 60, 38), Y("seed.archive.title")), dc(Z(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				rc(Z(6, e, 8, 88), Y("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				rc(Z(16, e, 58, 88), Y("seed.events.row", { title: r })),
				ac(Z(78, e + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
			];
			return Dc("events", "440px", bc(xc("surface")), [
				rc(Z(6, 28, 50, 38), Y("seed.events.title")),
				...e(88, "11", Y("seed.events.monthAug"), Y("seed.events.row1")),
				...e(196, "25", Y("seed.events.monthAug"), Y("seed.events.row2")),
				...e(304, "8", Y("seed.events.monthSep"), Y("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Cc(e) + 16;
			return {
				blocks: [
					rc(Z(6, t, 8, 88), Y("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					rc(Z(16, t, 58, 88), Y("seed.events.row", { title: Y("seed.events.newTitle") })),
					ac(Z(78, t + 24, 16, 40), Y("seed.events.signup"), { style: "secondary" })
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
				let r = ic(Z(e, 80, 22, 180), { alt: Y("seed.team.alt") }), i = rc(Z(e, 268, 22, 84), Y("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = Ec(80, t, 0), i.mobileOrder = Ec(80, t, 1), [r, i];
			};
			return Dc("team", "420px", bc(xc("surface")), [
				rc(Z(6, 24, 50, 32), Y("seed.team.title")),
				...e(7.5, 0, Y("seed.team.role1")),
				...e(39, 1, Y("seed.team.role2")),
				...e(70.5, 2, Y("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = Tc(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = ic(Z(t, n, 22, 180), { alt: Y("seed.team.alt") }), a = rc(Z(t, n + 188, 22, 84), Y("seed.team.member", { role: Y("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = Ec(80, r, 0), a.mobileOrder = Ec(80, r, 1), {
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
		create: () => Dc("faq", "520px", bc(xc("bg")), [
			rc(Z(25, 24, 50, 36), Y("seed.faq.title"), { align: "center" }),
			gc(Z(20, 80, 60, 320), [
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
			rc(Z(20, 416, 60, 32), Y("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => Dc("timeline", "480px", bc(xc("bg")), [rc(Z(25, 24, 50, 36), Y("seed.timeline.title"), { align: "center" }), vc(Z(25, 88, 50, 330), [
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
				let r = rc(Z(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = rc(Z(e, 168, 25, 160), Y("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = Ec(88, t, 0), i.mobileOrder = Ec(88, t, 1), [r, i];
			};
			return Dc("steps", "400px", bc(xc("bg")), [
				rc(Z(6, 28, 60, 38), Y("seed.steps.title")),
				...e(6, 0, Y("seed.steps.s1")),
				...e(37.5, 1, Y("seed.steps.s2")),
				...e(69, 2, Y("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = Tc(e, 3, 6, 31.5, 88, 272, 25, 240), i = rc(Z(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = rc(Z(t, n + 80, 25, 160), Y("seed.steps.card", { title: Y("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = Ec(88, r, 0), a.mobileOrder = Ec(88, r, 1), {
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
				ic(Z(6, 40, 55, 300)),
				rc(Z(6, 348, 55, 108), Y("seed.feature.main")),
				ac(Z(6, 464, 14, 38), Y("seed.readMore"), { style: "secondary" }),
				ic(Z(66, 40, 28, 120)),
				rc(Z(66, 164, 28, 60), Y("seed.feature.small1")),
				ic(Z(66, 244, 28, 120)),
				rc(Z(66, 368, 28, 60), Y("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Ec(40, t < 3 ? 0 : 1, t);
			}), Dc("lead-story", "540px", bc(xc("bg")), e);
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
					ic(Z(e, 88, 25, 200)),
					rc(Z(e, 296, 25, 76), Y("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					ac(Z(e + 5, 380, 15, 40), Y("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = Ec(88, t, n);
				}), i;
			};
			return Dc("products", "470px", bc(xc("bg")), [
				rc(Z(6, 28, 50, 38), Y("seed.products.title")),
				...e(6, 0, Y("seed.products.name"), Y("seed.products.price1")),
				...e(37.5, 1, Y("seed.products.name"), Y("seed.products.price2")),
				...e(69, 2, Y("seed.products.name"), Y("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = Tc(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				ic(Z(t, n, 25, 200)),
				rc(Z(t, n + 208, 25, 76), Y("seed.products.card", {
					name: Y("seed.products.name"),
					price: Y("seed.products.price1")
				}), { align: "center" }),
				ac(Z(t + 5, n + 292, 15, 40), Y("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = Ec(88, r, t);
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
		create: () => Dc("shop", "544px", bc(xc("bg")), [
			rc(Z(6, 28, 50, 38), Y("seed.shop.title")),
			pc(Z(78, 88, 16, 48)),
			fc(Z(6, 176, 88, 320))
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
				rc(Z(6, 48, 52, 96), Y("seed.shopHero.title")),
				rc(Z(6, 152, 40, 48), Y("seed.shopHero.sub")),
				ac(Z(6, 216, 17, 42), Y("seed.shopHero.cta")),
				ic(Z(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = Ec(48, t < 3 ? 0 : 1, t);
			}), Dc("shop-hero", "400px", {
				version: 1,
				layers: [
					xc("bg"),
					Sc(.8, .25, .28, .6),
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
				let r = ic(Z(e, 88, 21, 170)), i = rc(Z(e, 266, 21, 34), Y("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = Ec(88, t, 0), i.mobileOrder = Ec(88, t, 1), [r, i];
			}, t = Dc("shop-categories", "360px", bc(xc("bg")), [
				rc(Z(6, 28, 60, 38), Y("seed.shopCategories.title")),
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
			let { x: t, y: n, n: r } = Tc(e, 4, 6, 23.5, 88, 220, 21, 212), i = ic(Z(t, n, 21, 170)), a = rc(Z(t, n + 178, 21, 34), Y("seed.shopCategories.tile", { name: Y("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = Ec(88, r, 0), a.mobileOrder = Ec(88, r, 1), {
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
				let i = oc(Z(e + 10.5, 88, 4, 52), r, 44), a = rc(Z(e, 148, 25, 96), Y(n), { align: "center" });
				return i.mobileOrder = Ec(88, t, 0), a.mobileOrder = Ec(88, t, 1), [i, a];
			}, t = Dc("shop-trust", "300px", bc(xc("bg")), [
				rc(Z(6, 28, 60, 38), Y("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Tc(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = oc(Z(t + 10.5, n - 60, 4, 52), "✓", 44), a = rc(Z(t, n, 25, 96), Y("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = Ec(88, r, 0), a.mobileOrder = Ec(88, r, 1), {
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
				rc(Z(6, 56, 52, 100), Y("seed.shopShowcase.title")),
				rc(Z(6, 164, 42, 56), Y("seed.shopShowcase.text")),
				ac(Z(6, 236, 18, 42), Y("seed.shopShowcase.cta")),
				ic(Z(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = Ec(56, t < 3 ? 0 : 1, t);
			});
			let t = Dc("shop-showcase", "340px", bc(xc("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => Dc("checkout", "560px", bc(xc("bg")), [rc(Z(6, 28, 50, 38), Y("seed.checkout.title")), mc(Z(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => Dc("cta", "280px", bc(xc("surface"), Sc(.5, .5, .3, .7)), [
			rc(Z(20, 56, 60, 40), Y("seed.cta.title"), { align: "center" }),
			rc(Z(25, 104, 50, 26), Y("seed.cta.sub"), { align: "center" }),
			ac(Z(42, 148, 16, 42), Y("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => Dc("quote", "300px", bc(xc("bg")), [_c(Z(20, 56, 60, 190), {
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
				let a = yc(Z(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = Ec(76, t, 0), a;
			};
			return Dc("stats", "260px", bc(xc("surface")), [
				e(6, 0, "120", "+", Y("seed.stats.l1")),
				e(37.5, 1, "25", "", Y("seed.stats.l2")),
				e(69, 2, "1981", "", Y("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = Tc(e, 3, 6, 31.5, 76, 140, 25, 120), i = yc(Z(t, n, 25, 120), {
				value: "42",
				label: Y("seed.stats.newLabel")
			});
			return i.mobileOrder = Ec(76, r, 0), {
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
			let e = (e) => ic(Z(e, 108, 18.5, 100), {
				alt: Y("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Dc("sponsors", "280px", bc(xc("bg")), [
				rc(Z(6, 28, 60, 36), Y("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = Tc(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [ic(Z(t, n, 18.5, 100), {
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
		create: () => Dc("membership", "500px", bc(xc("surface")), [
			rc(Z(6, 28, 50, 38), Y("seed.membership.title")),
			rc(Z(14, 88, 32, 250), Y("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			rc(Z(54, 88, 32, 250), Y("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			ac(Z(42, 358, 16, 42), Y("seed.join")),
			rc(Z(25, 414, 50, 30), Y("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var kc = [
	"section",
	"blocks",
	"page"
];
function Ac(e) {
	return qa(String(e ?? ""), "");
}
function jc(e, t, { id: n, title: r }) {
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
var Mc = [
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
function Nc(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Pc(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function Fc(e) {
	let t = [Mc.join(",")];
	for (let n of e ?? []) t.push(Mc.map((e) => Nc(Pc(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Ic(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Lc = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Rc(e) {
	let t = Ic(e);
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
		let s = Lc(t.sizes);
		s.length && (o.sizes = s);
		let c = Lc(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function zc(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function Bc(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${zc(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function Vc(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var Hc = [
	"news",
	"notices",
	"publications"
];
function Uc(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${zc(n.text)}</description>` : "";
		return `    <item>\n      <title>${zc(n.title)}</title>\n      <link>${zc(r)}</link>\n      <guid isPermaLink="false">${zc(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${zc(e.title)}</title>\n    <link>${zc(t + "/")}</link>\n    <description>${zc(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
function Wc(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var Gc = [
	"floating",
	"fill",
	"band",
	"mosaic"
], Kc = [
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
], qc = [
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
], Jc = [
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
], Yc = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], Xc = {
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
}, Zc = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Qc = {
	min: 1,
	max: 20,
	dflt: 8
}, $c = {
	min: 60,
	max: 400
}, el = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, tl = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, nl = 1.35, rl = {
	min: 0,
	max: 1,
	dflt: .85
}, il = {
	min: 0,
	max: 15,
	dflt: 5
}, al = {
	min: 0,
	max: 48,
	dflt: 5
}, ol = {
	min: .5,
	max: 90,
	dflt: 30
}, sl = {
	min: .5,
	max: 90,
	dflt: 12
}, cl = {
	min: 4,
	max: 20,
	dflt: 12
};
function ll(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function ul(e, t) {
	let n = ll(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function dl(e) {
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
function fl(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: dl(t) }));
}
var pl = (e) => Math.round(e * 100) / 100;
function ml(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function hl(e) {
	return Gc.includes(e) ? e : "floating";
}
function gl(e, t) {
	let n = hl(e);
	return Xc[n].includes(t) ? t : Zc[n];
}
function _l(e) {
	return Xc[hl(e)];
}
function vl({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : hl(e) === "band" || gl(e, t) !== "none";
}
function yl(e, t, n, r = !1) {
	let i = Math.round(ml(e, hl(t) === "mosaic" ? cl : Qc)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function bl(e, t) {
	let n = el[hl(t)] || el.floating;
	return Math.round(ml(e, {
		...$c,
		dflt: n
	}));
}
function xl(e) {
	return wl(e) in tl;
}
function Sl(e, t) {
	let n = tl[wl(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function Cl(e) {
	return Kc.includes(e) ? e : "rect";
}
function wl(e) {
	return qc.includes(e) ? e : "shadow";
}
function Tl(e) {
	return Jc.includes(e) ? e : "natural";
}
function El(e, t) {
	if (wl(t) === "polaroid") return .84;
	let n = Cl(e);
	return Yc.includes(n) ? 1 : n === "arch" ? .8 : nl;
}
function Dl(e) {
	return ["rect", "square"].includes(Cl(e));
}
function Ol(e) {
	return ml(e, sl);
}
function kl(e) {
	return ml(e, rl);
}
function Al(e) {
	return ml(e, il);
}
function jl(e) {
	return Math.round(ml(e, al));
}
function Ml(e) {
	return ml(e, ol);
}
function Nl(e) {
	return Wc(e);
}
function Pl(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function Fl(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = yl(t, o, c.length, s), u = bl(r, o), d = kl(i), f = Al(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: ul(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + (ul(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + (ul(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: pl(50 + (n - .5) * 100 * d),
			y: pl(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + ul(p, `w${e}`) * .4)),
			rot: Il(p, e, f),
			phase: pl(ul(p, `p${e}`)),
			heading: pl(ul(p, `h${e}`))
		});
	}
	return _;
}
function Il(e, t, n) {
	return pl((ul(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * Al(n));
}
function Ll(e, t) {
	let n = e == null || e === "" ? 1 : e, r = ul(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: pl(ul(n, `mp${t}`))
	};
}
function Rl(e, t, n, r = !1) {
	let i = yl(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => Ll(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var zl = /^#[0-9a-fA-F]{3,8}$/, Bl = /^[a-z][a-z0-9-]*$/, Vl = "#171c26", Hl = "#232a38", Ul = "#98a1b3", Wl = "#7c5cff", Gl = (e, t) => `var(--urd-color-${e}, ${t})`;
function Kl(e, t) {
	return typeof e == "string" ? zl.test(e) ? e : Bl.test(e) ? Gl(e, t) : t : t;
}
function ql(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Jl = (e) => Math.round(e * 10) / 10, Yl = (e, t, n) => Math.min(n, Math.max(t, e)), Xl = (e, t, n, r, i, a = "") => `<rect x="${Jl(e)}" y="${Jl(t)}" width="${Jl(Math.max(n, 1))}" height="${Jl(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Zl(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? Gl("text", Ul) : e.theme === "accent" ? Gl("accent", Wl) : Gl("surface", Hl);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Kl(t.props?.value, Vl);
		if (t.type === "gradient") return Kl(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Vl);
	}
	return Gl("bg", Vl);
}
function Ql(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Gl("text", Ul), c = [];
	i?.box && c.push(Xl(e, t, n, r, Gl("surface", Hl), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Yl(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Xl(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Jl(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function $l(e, t, n, r, i = !1) {
	let a = Gl("text", Ul), o = [];
	i ? (o.push(Xl(e, t, n, r, Gl("surface", Hl), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Jl(e + .4)}" y="${Jl(t + .4)}" width="${Jl(Math.max(n - .8, 1))}" height="${Jl(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Xl(e, t, n, r, Gl("surface", Hl), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Jl(e + n * t), l = (e) => Jl(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Jl(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Jl(s + .1)}"/>`), o.join("");
}
function eu(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push($l(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function tu(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Xl(s, t, a, r * .55, Gl("surface", Hl), " rx=\"1.5\"")), o.push(Xl(s, t + r * .62, a * .8, 2, Gl("text", Ul), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function nu(e, t, n, r, i) {
	let a = Kl(i?.color, Wl), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Jl(e + n / 2)}" cy="${Jl(t + r / 2)}" rx="${Jl(Math.max(n / 2, 1))}" ry="${Jl(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Jl(e)},${Jl(t + r)} ${Jl(e + n / 2)},${Jl(t)} ${Jl(e + n)},${Jl(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Xl(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Xl(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function ru(e, t, n, r, i, a) {
	if (e === "text") return Ql(t, n, r, i, a);
	if (e === "image") return $l(t, n, r, i, !a?.src);
	if (e === "gallery") return eu(t, n, r, i, a);
	if (e === "collection") return tu(t, n, r, i);
	if (e === "faq") {
		let e = Yl(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Xl(t, e, r, o, Gl("surface", Hl), " rx=\"1\"")), s.push(Xl(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Gl("text", Ul), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Jl(t + r * .92)}" cy="${Jl(e + o / 2)}" r="0.9" fill="${Gl("text", Ul)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return nu(t, n, r, i, a);
	if (e === "button") return Xl(t, n, r, i, Gl("accent", Wl), ` rx="${Jl(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Jl(t + r / 2)}" cy="${Jl(n + i / 2)}" r="${Jl(e)}" fill="${Gl("accent", Wl)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Xl(t, n, r, i, Gl("surface", Hl), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Jl(a - s / 2)},${Jl(o - s)} ${Jl(a - s / 2)},${Jl(o + s)} ${Jl(a + s)},${Jl(o)}" fill="${Gl("text", Ul)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [Xl(t + 1, n, 1.4, i, Gl("accent", Wl), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Jl(t + 1.7)}" cy="${Jl(o)}" r="1.6" fill="${Gl("accent", Wl)}"/>`), e.push(Xl(t + 5, o - 1, r * .5, 2, Gl("text", Ul), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Jl(t + r / 2)}" y="${Jl(n + i * .34)}" text-anchor="middle" font-size="${Jl(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Gl("accent", Wl)}">“</text>`,
		Xl(t + r * .15, n + i * .48, r * .7, 2, Gl("text", Ul), " opacity=\"0.6\" rx=\"1\""),
		Xl(t + r * .25, n + i * .62, r * .5, 2, Gl("text", Ul), " opacity=\"0.6\" rx=\"1\""),
		Xl(t + r * .35, n + i * .82, r * .3, 1.6, Gl("text", Ul), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		Xl(t, n + i * .3, r, i * .4, Gl("accent", Wl), " opacity=\"0.85\" rx=\"1\""),
		Xl(t + r * .08, n + i * .46, r * .18, 1.8, Gl("bg", Vl), " opacity=\"0.9\" rx=\"0.9\""),
		Xl(t + r * .34, n + i * .46, r * .24, 1.8, Gl("bg", Vl), " opacity=\"0.9\" rx=\"0.9\""),
		Xl(t + r * .66, n + i * .46, r * .2, 1.8, Gl("bg", Vl), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [Xl(t + r * .28, n + i * .15, r * .44, i * .42, Gl("accent", Wl), " opacity=\"0.85\" rx=\"1\""), Xl(t + r * .32, n + i * .72, r * .36, 1.6, Gl("text", Ul), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [Xl(t, n, r, e, Gl("accent", Wl), " opacity=\"0.5\" rx=\"0.8\"")], o = Yl(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Xl(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Gl("text", Ul), " opacity=\"0.3\""));
		return a.push(Xl(t + r * .33, n, .6, i, Gl("text", Ul), " opacity=\"0.2\"")), a.push(Xl(t + r * .66, n, .6, i, Gl("text", Ul), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Jl(t + e + r * (e * 2 + 1.5))}" cy="${Jl(n + i / 2)}" r="${Jl(e)}" fill="${Gl("accent", Wl)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Xl(s, n, a, i, Gl("surface", Hl), " rx=\"1\"")), o.push(Xl(s + a * .25, n + i * .2, a * .5, i * .35, Gl("accent", Wl), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Xl(t, n, r, i, Gl("surface", Hl), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Jl(t + r * .06)},${Jl(a - o)} ${Jl(t + r * .06)},${Jl(a + o)} ${Jl(t + r * .06 + o * 1.4)},${Jl(a)}" fill="${Gl("accent", Wl)}" opacity="0.85"/>`), e.push(Xl(t + r * .2, a - .6, r * .7, 1.2, Gl("text", Ul), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(Xl(s, n, a, i, Gl("surface", Hl), " rx=\"1\"")), o.push(Xl(s + a * .08, n + i * .06, a * .84, i * .42, Gl("text", Ul), " opacity=\"0.15\" rx=\"0.8\"")), o.push(Xl(s + a * .08, n + i * .56, a * .6, 1.4, Gl("text", Ul), " opacity=\"0.5\" rx=\"0.7\"")), o.push(Xl(s + a * .08, n + i * .72, a * .35, 1.4, Gl("accent", Wl), " opacity=\"0.85\" rx=\"0.7\"")), o.push(Xl(s + a * .08, n + i * .84, a * .84, i * .1, Gl("accent", Wl), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Jl(a)}" cy="${Jl(o)}" r="${Jl(e)}" fill="${Gl("surface", Hl)}"/>`,
			Xl(a - e * .5, o - e * .25, e, e * .55, Gl("text", Ul), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Jl(a + e * .75)}" cy="${Jl(o - e * .75)}" r="${Jl(Math.max(.9, e * .35))}" fill="${Gl("accent", Wl)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		Xl(t, n, r * .7, 1.2, Gl("text", Ul), " opacity=\"0.5\" rx=\"0.6\""),
		Xl(t, n + i * .12, r * .5, 1.2, Gl("text", Ul), " opacity=\"0.35\" rx=\"0.6\""),
		Xl(t, n + i * .3, r, i * .14, Gl("surface", Hl), " rx=\"1\""),
		Xl(t, n + i * .5, r, i * .14, Gl("surface", Hl), " rx=\"1\""),
		Xl(t, n + i * .78, r * .45, i * .16, Gl("accent", Wl), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : Xl(t, n, r, i, Gl("surface", Hl), " rx=\"1.5\"");
}
function iu(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(ql(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Xl(0, 0, t, n, Zl(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Jl(Yl(e.x ?? .5, 0, 1) * t)}" cy="${Jl(Yl(e.y ?? .3, 0, 1) * n)}" r="${Jl(t * Yl(e.radius ?? .5, .1, 1) * .5)}" fill="${Kl(e.color, Wl)}" opacity="${Jl(Yl(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = Gl("surface", Hl);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of Fl(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${Jl(r.rot)} ${Jl(e + s / 2)} ${Jl(i + c / 2)})"`;
				o.push(Xl(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(Xl(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of Rl(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(Xl(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Yl(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Yl((r.y ?? 0) * a, 0, n - 2), u = Yl((r.w ?? 10) * (c / 100), 2, t - i), d = Yl((r.h ?? 20) * a, 2, n - l);
		o.push(ru(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function au(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Xl(0, 0, t, n, Gl("bg", Vl))}</svg>`;
	let a = i.map((e) => Yl(ql(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Jl(l)})">${iu(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var ou = /* @__PURE__ */ new Map();
Oc({ sections: { define: (e, t) => ou.set(e, t) } });
var su = [
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
function cu(e, { pageId: t, title: n }) {
	let r = su.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => ou.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function lu(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function uu(e, t) {
	let n = lu(t).trim(), r = lu(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function du(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: uu(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function fu(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function pu(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var mu = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function hu(e) {
	return typeof e == "string" && mu.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function gu(e) {
	let t = e.tokens || {}, n = pu(e, "light"), r = pu(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			hu(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && hu(u) && hu(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && hu(u) && hu(d) && s.push({
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
	].some((e) => hu(e.color?.["accent-text"])) && hu(t.color?.accent);
	u && hu(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function _u(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var vu = {
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
}, yu = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(vu).flatMap(Object.keys))];
function bu(e) {
	return vu[e] ?? {};
}
function xu(e) {
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
function Su(e, t) {
	let n = xu(e), r = xu(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var Cu = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = _u(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, wu = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Tu(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function Eu(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Du(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Ou(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${_u(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function ku(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (wu[t] ?? []).includes(e.animation) ? e.animation : null, r = Tu(e.stops), i = r.map((e) => `${_u(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: Eu(r),
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
var Au = /* @__PURE__ */ new Set(), ju = !1;
function Mu(e) {
	Au.add(e), !(ju || typeof window > "u") && (ju = !0, window.addEventListener("resize", () => {
		for (let e of [...Au]) e() || Au.delete(e);
	}));
}
var Nu = !1;
function Pu() {
	if (!Nu) {
		Nu = !0;
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
var Fu = {
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
		let n = ku(t);
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
					let e = Du(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Ou(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), Mu(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Pu());
	}
}, Iu = {
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
		let n = _u(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Lu = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Ru = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Lu, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, zu = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], Bu = {
	min: 8,
	max: 160,
	dflt: 28
}, Vu = .12, Hu = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function Uu(e) {
	return zu.includes(e) ? e : "dots";
}
function Wu(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Bu.dflt : Math.min(Bu.max, Math.max(Bu.min, Math.round(t)));
}
function Gu(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Ku(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? Vu : Math.min(1, Math.max(0, t));
}
function qu(e = {}) {
	let t = Wu(e.size), n = Gu(e.rotation), r = Hu[Uu(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Ju = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), Yu = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: Bu.dflt,
		opacity: Vu,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Ju()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(qu(t))}")`;
		e.style.backgroundColor = _u(t.color ?? "text"), e.style.opacity = String(Ku(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, Xu = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], Zu = {
	min: 16,
	max: 240,
	dflt: 64
}, Qu = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function $u(e) {
	return typeof e == "string" && Qu.test(e);
}
var ed = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function td(e) {
	return typeof e == "string" && ed.test(e.trim());
}
var nd = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function rd(e) {
	return td(e) || typeof e == "string" && nd.test(e.trim());
}
var id = [
	"launcher",
	"cart",
	"theme"
];
function ad(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) id.includes(e) && !n.includes(e) && n.push(e);
	for (let e of id) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var od = .4, sd = [
	"none",
	"kenburns",
	"drift"
], cd = {
	min: 6,
	max: 60,
	dflt: 20
};
function ld(e) {
	return sd.includes(e) ? e : "none";
}
function ud(e) {
	let { min: t, max: n, dflt: r } = cd, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function dd(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function fd(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function pd(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function md(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * od * t;
	return Math.round(Math.min(i, r * e));
}
function hd(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * od, s = i ?? md(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var gd = /* @__PURE__ */ new Set(), _d = !1, vd = 0;
function yd() {
	vd = 0;
	for (let e of [...gd]) e() || gd.delete(e);
}
function bd() {
	vd ||= requestAnimationFrame(yd);
}
function xd(e) {
	gd.add(e), e(), !(_d || typeof window > "u") && (_d = !0, window.addEventListener("scroll", bd, { passive: !0 }), window.addEventListener("resize", bd, { passive: !0 }));
}
function Sd(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = md(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = hd(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	xd(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Cd() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var wd = /* @__PURE__ */ new Set(), Td = !1, Ed = 0;
function Dd() {
	Ed = 0;
	for (let e of [...wd]) e() || wd.delete(e);
}
function Od() {
	!Ed && typeof requestAnimationFrame == "function" && (Ed = requestAnimationFrame(Dd));
}
function kd(e) {
	wd.add(e), e(), !(Td || typeof window > "u") && (Td = !0, window.addEventListener("resize", Od, { passive: !0 }));
}
function Ad(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = md(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	kd(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var jd = {
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
		motionSpeed: cd.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: cd.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !$u(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? dl(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = pd(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = ld(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${ud(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = fd(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = dd(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && Md(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function Md(e, t, n, r) {
	Cd() ? Ad(e, t, n, r) : Sd(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
var Nd = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], Pd = [
	"grid",
	"mosaic",
	"polaroid"
], Fd = {
	min: 80,
	max: 400,
	dflt: 140
}, Id = {
	min: 0,
	max: 15,
	dflt: 4
};
function Ld(e) {
	return Nd.includes(e) ? e : "grid";
}
function Rd(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function zd({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Bd(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var Vd = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], Hd = {
	min: 1,
	max: 60,
	dflt: 24
}, Ud = [
	"name",
	"newest",
	"random"
], Wd = [
	480,
	800,
	1200,
	1600,
	2e3
], Gd = /^[A-Za-z0-9_-]{10,128}$/, Kd = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function qd(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? Hd.dflt : Math.min(Hd.max, Math.max(Hd.min, Math.round(t)));
}
function Jd(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Gd.test(t) && !t.includes(".")) return {
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
		return Gd.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Gd.test(t) ? { host: t } : {}
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
	return i && Kd.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && Kd.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function Yd(e) {
	return Ud.includes(e) ? e : "name";
}
var Xd = (e) => Yd(e) === "newest" ? "newest" : "name";
function Zd(e, t) {
	if (!e || !Vd.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: Xd(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Qd(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function $d(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function ef(e, t) {
	let n = [...e], r = $d(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function tf(e, t, n) {
	return Yd(t) === "random" ? ef(e, n) : [...e];
}
var nf = 0;
function rf() {
	return nf ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, nf;
}
function af(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Wd.find((e) => e >= n) ?? Wd[Wd.length - 1];
}
function of(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var sf = 6e5, cf = 3e4, lf = /* @__PURE__ */ new Map(), uf = /* @__PURE__ */ new Map();
function df(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function ff(e, t) {
	let n = Zd(Jd(e), t);
	return n ? pf(lf.get(n)) : null;
}
function pf(e) {
	if (!e) return null;
	let t = e.value.photos.length ? sf : cf;
	return Date.now() - e.at < t ? e.value : null;
}
function mf(e, t, { force: n = !1 } = {}) {
	let r = Zd(Jd(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = pf(lf.get(r));
		if (e) return Promise.resolve(e);
		if (uf.has(r)) return uf.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Qd(n),
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
		return lf.set(r, {
			at: Date.now(),
			value: e
		}), uf.delete(r), e;
	})();
	return uf.set(r, i), i;
}
function hf(e) {
	let t = df(e), n = t ? ff(t, e.order) : null;
	return n?.photos.length ? tf(n.photos, e.order, rf()).slice(0, qd(e.folderMax)) : e.images ?? [];
}
function gf(e, t, n) {
	let r = df(t);
	r && !ff(r, t.order) && mf(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var _f = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: Hd.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: ol.dflt,
	interval: sl.dflt,
	fade: 1.5,
	count: Qc.dflt,
	seed: 0,
	size: null,
	spread: rl.dflt,
	tilt: il.dflt,
	radius: al.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, vf = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		..._f
	}),
	migrations: { 1: (e) => ({
		..._f,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		gf(e, t, bf);
	}
}, yf = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function bf(e, t) {
	let n = hl(t.style), r = hf(t).filter((e) => $u(e?.src)), i = Cl(t.shape), a = wl(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${Tl(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${jl(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = Sl(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", _u(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = gl(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: El(i, a),
		moves: vl({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: Pl(t.seed, rf()),
		time: Ml(t.motionSpeed),
		dwell: Ol(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	jf[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function xf(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? of(a.src, r) : dl(i)}")`, e.style.backgroundPosition = a ? dd(a.x, a.y) : "";
}
function Sf({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? fl(3) : n, l = af(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = ld(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = yf("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${ud(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : of(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : fd(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : dd(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : of(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !zd({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(Bd(o, { fallback: sl.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = Rd(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : of(c[e].src, l);
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
function Cf(e, t, n, r, i) {
	let a = yf("div", "urd-gallery-skin"), o = yf("div", "urd-gallery-face");
	return xf(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function wf(e, t) {
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
function Tf({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = wf(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function Ef(e, t, n) {
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
			a >= 0 && (xf(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, Df(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function Df(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function Of(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	Ef(Fl(i, c).map((n, r) => {
		let a = yf("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = af(n.w, s), { skin: l, face: u } = Cf(a, i, n.index, c, r);
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
		return Df(d, n), Tf(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = Fl(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function kf(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = Nl(n.rows), l = bl(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = af(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = yf("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = yf("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = yf("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), Cf(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = yf("div", "urd-ribbon-run");
		l(f);
		let p = yf("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function Af(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = Rl(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${bl(n.size, "mosaic")}px`);
	let u = af(bl(n.size, "mosaic") * 2.2, a);
	Ef(l.map((e, n) => {
		let i = yf("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = Cf(i, r, a, u, n);
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
var jf = {
	fill: Sf,
	floating: Of,
	band: kf,
	mosaic: Af
}, Mf = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Nf(e) {
	return typeof e == "string" && Mf.test(e);
}
var Pf = null;
function Ff(e) {
	Pf ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Pf.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Pf.observe(e);
}
var If = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = dd(n, r);
}, Lf = {
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
		if (!Nf(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!$u(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, If(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), $u(t.poster) && (n.poster = t.poster), n.src = t.src, If(n, t.fit, t.x, t.y), e.appendChild(n), Ff(n), t.parallax > 0 && Md(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function Rf(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += zf(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += zf(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += zf(n, e.baselineLinks), o + "</svg>";
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
	return o += zf(n, e.baselineLinks), o + "</svg>";
}
function zf(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var Bf = () => ({
	duration: 600,
	delay: 0
}), Vf = 90, Hf = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Bf,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Bf,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Bf,
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
			step: Vf,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Uf = [
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
function Wf(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
var Gf = /* @__PURE__ */ new Set([
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
function Kf(e, t = {}) {
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
function qf(e, t, n, r = 0) {
	return Jf(e, /* @__PURE__ */ new Map([[t, n]]), r);
}
function Jf(e, t, n = 0) {
	let r = [];
	for (let n of e ?? []) {
		let e = n?.frames?.desktop;
		if (!e || !Number.isFinite(e.y) || !Number.isFinite(e.h)) continue;
		let i = t?.get(n.id), a = Number.isFinite(i) ? Math.max(0, i - e.h) : 0;
		r.push({
			id: n.id,
			x: e.x ?? 0,
			y: e.y,
			h: e.h,
			grow: a
		});
	}
	let i = /* @__PURE__ */ new Map();
	if (!r.some((e) => e.grow > 0)) return {
		moves: i,
		minHeight: 0
	};
	let { shifts: a } = Kf(r), o = (e) => n <= 0 || e.y + e.h <= n, s = !1, c = 0;
	for (let e of r) {
		let t = a.get(e.id) ?? 0;
		t && i.set(e.id, e.y + t), o(e) && (s ||= e.grow > 0, c = Math.max(c, e.y + t + e.h + e.grow));
	}
	return {
		moves: i,
		minHeight: s && n > 0 && c + 24 > n ? Math.round(c + 24) : 0
	};
}
function Yf(e) {
	let t = String(e?.size?.minHeight ?? "").trim();
	return /^\d+(?:\.\d+)?px$/.test(t) ? Number.parseFloat(t) : 0;
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-format.js
function Xf(e) {
	if (typeof e != "string" || !e.trim()) return !1;
	try {
		return new Intl.DateTimeFormat("en", { timeZone: e.trim() }), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region ../template/assets/engine/0.7.4/map-links.js
var Zf = {
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
}, Qf = Object.keys(Zf);
function $f(e) {
	let t = e?.site?.mapService;
	return Object.hasOwn(Zf, t) ? t : "osm";
}
//#endregion
//#region ../template/assets/engine/0.7.4/meeting-links.js
var ep = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function tp(e) {
	let t = Array.isArray(e) ? e : String(e ?? "").split(/[\s,;]+/), n = [];
	for (let e of t) {
		let t = String(e ?? "").trim().toLowerCase();
		if (!t) continue;
		let r = "";
		try {
			r = new URL(/^[a-z][a-z0-9+.-]*:\/\//.test(t) ? t : `https://${t}`).hostname;
		} catch {}
		ep.test(r) && !n.includes(r) && n.push(r);
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-designs.js
var np = [
	"list",
	"cards",
	"month",
	"agenda",
	"next",
	"week",
	"day",
	"year"
], rp = [
	"title",
	"date",
	"time",
	"place",
	"description",
	"category",
	"number"
], ip = ["emptyKicker", "emptyTitle"], ap = [
	"noticeLabel",
	"noticeTitle",
	"noticeText",
	"moreInfo"
], op = [
	"when",
	"where",
	"join",
	"addEvent",
	"addOne",
	"addFile",
	"addWhole",
	"icalAddress"
], sp = [
	"all",
	"signup",
	"subscribe",
	"subscribeMulti",
	"addGoogle",
	"swUpcoming",
	"swWeek",
	"swMonth",
	...op
], Q = (e, t = "colors") => ({
	key: e,
	labelKey: `calendar.slot.${e}`,
	section: t
}), cp = [
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
			...sp
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
		texts: sp
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
			...sp
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
		texts: ["program", ...sp]
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
		texts: sp
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
			...ip,
			...sp
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
		texts: sp
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
		texts: ["wholeProgram", ...sp]
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
			...sp
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
		texts: sp
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
		texts: sp
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
			...ip,
			...sp
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
			...sp
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
		texts: sp
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
		texts: ["todayBtn", ...sp]
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
			"signup",
			...op
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
		texts: sp
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
		texts: [...ip, ...sp]
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
		texts: ["todayBtn", ...sp]
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
			...sp
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
			...sp
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
			...sp
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
			...sp
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
			...ap,
			...sp
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
			...sp
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
		texts: ["now", ...sp]
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
			...sp
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
			...sp
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
			...sp
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
			...sp
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
			...ap,
			...ip,
			...sp
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
			...ip,
			...sp
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
			"forWhom",
			"openAll",
			"allDates",
			...ap,
			...ip,
			...sp
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
		texts: ["todayBtn", ...sp]
	}
], lp = (e, t, n) => ({
	key: e,
	kind: "choice",
	values: t,
	def: n,
	labelKey: `calendar.opt.${e}`
}), up = (e, t) => ({
	key: e,
	kind: "switch",
	def: t,
	labelKey: `calendar.opt.${e}`
}), dp = (e) => ({
	key: e,
	kind: "hour",
	def: null,
	labelKey: `calendar.opt.${e}`
}), fp = {
	sidepanel: [lp("panelSide", [
		"right",
		"left",
		"under"
	], "right")],
	weekPlan: [
		dp("hourFrom"),
		dp("hourTo"),
		up("weekend", !1)
	],
	dayPlan: [
		dp("hourFrom"),
		dp("hourTo"),
		up("weekend", !1)
	],
	table: [
		up("colTime", !0),
		up("colPlace", !0),
		up("zebra", !0)
	],
	posters: [lp("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	photo: [lp("columns", [
		"auto",
		"2",
		"3",
		"4"
	], "auto")],
	yearWheel: [lp("firstMonth", [
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
	numbered: [up("pad", !0)],
	booklet: [up("description", !0)],
	split: [up("description", !0)],
	band: [up("roll", !0)]
};
function pp(e) {
	return fp[_p(e).id] ?? [];
}
function mp(e) {
	let t = e?.options ?? {}, n = {};
	for (let r of pp(e?.design)) {
		let e = t[r.key];
		r.kind === "choice" ? n[r.key] = r.values.includes(e) ? e : r.def : r.kind === "switch" ? n[r.key] = typeof e == "boolean" ? e : r.def : n[r.key] = Number.isInteger(e) && e >= 0 && e <= 24 ? e : null;
	}
	return n;
}
var hp = {
	min: .4,
	max: 2
};
function gp(e) {
	let t = Number(e?.scale);
	return !Number.isFinite(t) || t <= 0 ? 1 : Math.round(Math.min(hp.max, Math.max(hp.min, t)) * 100) / 100;
}
function _p(e) {
	return cp.find((t) => t.id === e) ?? cp[0];
}
function vp(e) {
	return _p(e?.design).view || (np.includes(e?.view) ? e.view : "list");
}
var yp = [
	"list",
	"cards",
	"agenda",
	"next"
];
function bp() {
	let e = [{
		view: null,
		designs: cp.filter((e) => e.view === null)
	}];
	for (let t of np) {
		let n = cp.filter((e) => e.view === t);
		n.length && e.push({
			view: t,
			designs: n
		});
	}
	return e;
}
var xp = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Sp = /^[a-z][a-z0-9-]*$/;
function Cp(e) {
	return typeof e == "string" ? xp.test(e) ? e : Sp.test(e) ? `var(--urd-color-${e})` : null : null;
}
function wp(e, t) {
	let n = typeof t?.show == "boolean" ? t.show : e.stripe;
	return {
		show: n,
		color: n ? Cp(t?.color) : null
	};
}
var Tp = {
	min: 8,
	max: 120
};
function Ep(e, t) {
	let n = e?.[t];
	return typeof n == "string" && n.trim() ? n : null;
}
function Dp(e, t) {
	return e.texts.some((e) => Ep(t, e) !== null);
}
//#endregion
//#region ../template/assets/engine/0.7.4/calendar-thumb.js
var Op = "#0e1512", kp = "#2fd6b6", Ap = "#5c6b64", jp = "#22302a", Mp = "#e8efe9", Np = "#16221d", Pp = "#1c2340", Fp = "#f3ecd8", Ip = "#d0a74a", Lp = (e) => e < 1 ? ` opacity="${e}"` : "", $ = (e, t, n, r, i, a = 1, o = 2) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${o}" fill="${i}"${Lp(a)}/>`, Rp = (e, t, n, r, i = 1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="${r}"${Lp(i)}/>`, zp = (e, t, n, r, i, a = 1, o = 1) => `<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${i}" stroke-width="${a}"${Lp(o)}/>`, Bp = (e, t, n, r) => Array.from({ length: e }, (e, i) => r(t + i * n, i)).join(""), Vp = (e, t = Op) => `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${t}"/>${e}</svg>`;
function Hp(e, t, n, r, i, a = Ap) {
	let o = "", s = n / 7, c = r / 4;
	for (let n = 0; n < 28; n++) {
		let r = e + n % 7 * s + s / 2, l = t + Math.floor(n / 7) * c + c / 2;
		o += Rp(r, l, 1.6, i.includes(n) ? kp : a, i.includes(n) ? 1 : .55);
	}
	return o;
}
var Up = {
	plain: () => Bp(3, 12, 20, (e) => $(14, e, 14, 14, jp, 1, 3) + $(34, e + 2, 70, 4, Ap, .9) + $(34, e + 9, 46, 3, Ap, .5)),
	timeline: () => zp(50, 10, 50, 70, Ap, 1.2, .7) + Bp(3, 16, 22, (e, t) => $(18, e - 3, 24, 5, Ap, .9) + Rp(50, e, 3.4, t ? Ap : kp) + $(60, e - 3, 62, 4, Ap, .9) + $(60, e + 4, 40, 3, Ap, .5)),
	table: () => $(12, 10, 136, 10, kp, 1, 3) + Bp(4, 26, 12, (e, t) => (t % 2 ? $(12, e - 3, 136, 12, jp, .8, 0) : "") + $(16, e, 20, 3, Ap, .9) + $(44, e, 14, 3, Ap, .5) + $(66, e, 44, 3, Ap, .9) + $(118, e, 24, 3, Ap, .5)),
	booklet: () => $(12, 8, 136, 64, Mp, 1, 2) + $(20, 14, 40, 7, Np) + zp(20, 26, 140, 26, Np, 1.4) + [20, 84].map((e) => Bp(3, 32, 12, (t) => $(e, t, 8, 8, kp, 1, 1) + $(e + 12, t, 36, 3, Np, .85) + $(e + 12, t + 5, 26, 2.5, Np, .4))).join(""),
	numbered: () => Bp(3, 12, 20, (e) => zp(14, e - 3, 146, e - 3, Ap, .8, .6) + $(14, e, 14, 12, kp, 1, 2) + $(36, e + 1, 64, 4, Ap, .9) + $(36, e + 8, 44, 3, Ap, .5) + $(120, e + 3, 24, 4, kp, .7)),
	apList: () => Bp(3, 10, 21, (e) => $(12, e, 136, 17, Pp, 1, 2) + $(18, e + 4, 10, 9, Ip, 1, 1) + zp(34, e + 3, 34, e + 14, Ip, .8, .5) + $(40, e + 4, 26, 3, Ip, .8) + $(40, e + 10, 56, 3.5, Fp, .9)),
	glass: () => Rp(30, 14, 34, "#ff8a65", .55) + Rp(132, 70, 36, "#7fd1c4", .55) + Rp(100, 10, 20, "#ffd36b", .4) + Bp(3, 12, 20, (e) => $(14, e, 132, 15, "#ffffff", .32, 6) + $(20, e + 4, 9, 7, Mp, .9, 1) + $(36, e + 4, 50, 3, Mp, .9) + $(36, e + 9, 34, 2.5, Mp, .5)),
	posters: () => $(12, 10, 62, 60, kp, 1, 4) + $(20, 30, 18, 20, Np, .9, 2) + $(20, 56, 40, 4, Np, .8) + $(80, 10, 32, 28, Mp, 1, 4) + $(86, 16, 10, 10, Np, .8, 1) + $(116, 10, 32, 28, "#bfe9df", 1, 4) + $(122, 16, 10, 10, Np, .8, 1) + $(80, 42, 32, 28, jp, 1, 4) + $(86, 48, 10, 10, kp, 1, 1) + $(116, 42, 32, 28, jp, .5, 4),
	tickets: () => Bp(3, 10, 21, (e) => $(12, e, 136, 17, jp, 1, 4) + $(12, e, 30, 17, kp, 1, 4) + $(20, e + 4, 12, 9, Np, .85, 1) + zp(42, e + 1, 42, e + 16, Op, 1.6) + $(50, e + 4, 50, 3.5, Ap, .95) + $(50, e + 10, 34, 2.5, Ap, .55) + $(120, e + 5, 22, 7, kp, .85)),
	carousel: () => [
		12,
		50,
		88,
		126
	].map((e, t) => $(e, 14, 34, 54, t ? jp : kp, 1, 4) + $(e + 6, 22, 12, 14, t ? kp : Np, .9, 1) + $(e + 6, 50, 22, 3, t ? Ap : Np, .9) + $(e + 6, 56, 14, 2.5, t ? Ap : Np, .5)).join(""),
	photo: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, jp, 1, 4) + $(e, 12, 40, 26, kp, .45, 4) + $(e + 4, 16, 12, 6, Mp, .95, 1) + $(e + 5, 44, 28, 3.5, Ap, .95) + $(e + 5, 51, 20, 2.5, Ap, .5) + $(e + 5, 58, 14, 5, kp, .9)).join(""),
	apGrid: () => [
		12,
		60,
		108
	].map((e) => $(e, 12, 40, 56, Fp, 1, 2) + $(e, 12, 40, 16, Pp, 1, 2) + zp(e, 28, e + 40, 28, Ip, 1.4) + $(e + 4, 16, 8, 8, Ip, 1, 1) + $(e + 22, 18, 14, 4, Ip, .9) + $(e + 5, 36, 28, 4, Pp, .9) + $(e + 5, 44, 18, 2.5, Pp, .55) + $(e + 5, 52, 24, 2.5, Pp, .4)).join(""),
	bento: () => $(12, 10, 66, 40, Mp, 1, 6) + $(18, 14, 16, 5, kp, 1, 2) + $(18, 28, 14, 14, Np, .9, 1) + $(36, 38, 34, 4, Np, .8) + $(82, 10, 31, 18, jp, 1, 5) + $(117, 10, 31, 18, jp, 1, 5) + $(82, 32, 66, 18, jp, 1, 5) + Hp(86, 34, 58, 14, [
		9,
		12,
		19
	]) + $(12, 54, 31, 18, Mp, 1, 5) + $(47, 54, 31, 18, kp, .4, 5) + $(82, 54, 66, 18, jp, 1, 5) + $(88, 60, 30, 4, Ap, .9),
	weekStrip: () => $(60, 8, 40, 5, Ap, .9) + Array.from({ length: 7 }, (e, t) => $(12 + t * 19.6, 20, 17, 50, t === 3 ? kp : jp, t === 3 ? .25 : 1, 3) + $(15 + t * 19.6, 24, 6, 5, Ap, .9, 1) + ([
		1,
		3,
		5
	].includes(t) ? $(14 + t * 19.6, 36, 13, 7, kp, 1, 2) : "")).join(""),
	weekPlan: () => $(12, 8, 136, 64, jp, .6, 3) + Bp(4, 22, 12, (e) => zp(12, e, 148, e, Ap, .6, .6)) + Array.from({ length: 7 }, (e, t) => zp(30 + t * 17, 14, 30 + t * 17, 72, Ap, .6, .6)).join("") + $(82, 14, 16, 58, kp, .14, 0) + $(49, 36, 13, 10, kp, .9, 2) + $(83, 48, 13, 14, kp, .9, 2) + $(117, 24, 13, 9, Mp, .7, 2),
	layers: () => $(12, 8, 136, 64, jp, .6, 3) + $(70, 12, 22, 6, kp, .9, 3) + $(96, 12, 22, 6, Mp, .7, 3) + $(122, 12, 22, 6, Ap, .6, 3) + Bp(3, 26, 15, (e, t) => zp(12, e - 2, 148, e - 2, Ap, .6, .6) + $(16, e + 3, 16, 3, Ap, .9) + $([
		44,
		62,
		100
	][t], e + 1, [
		46,
		22,
		40
	][t], 8, [
		kp,
		Mp,
		"#7fd1c4"
	][t], .9, 3)),
	sidepanel: () => $(12, 8, 136, 64, jp, .6, 3) + Hp(18, 18, 76, 48, [
		5,
		10,
		17,
		24
	]) + $(100, 8, 48, 64, jp, 1, 3) + $(106, 14, 26, 5, Mp, .9) + Bp(2, 26, 16, (e) => $(106, e, 36, 12, Op, 1, 2) + zp(106, e, 106, e + 12, kp, 2) + $(111, e + 3, 24, 3, Ap, .9)),
	apMonth: () => $(12, 8, 136, 64, Fp, 1, 2) + zp(12, 8, 148, 8, Ip, 2.4) + $(58, 13, 44, 5, Pp, .9) + Bp(4, 26, 12, (e) => zp(12, e, 148, e, Ip, .6, .5)) + Array.from({ length: 6 }, (e, t) => zp(31.4 + t * 19.4, 26, 31.4 + t * 19.4, 72, Ip, .6, .5)).join("") + $(54, 40, 14, 5, Ip, .6, 0) + zp(54, 40, 54, 45, Ip, 2) + $(112, 52, 14, 5, Ip, .6, 0) + zp(112, 52, 112, 57, Ip, 2) + Rp(98, 32, 3.4, Ip),
	dayPlan: () => $(34, 6, 92, 68, jp, .6, 5) + $(42, 12, 40, 5, Mp, .9) + Array.from({ length: 7 }, (e, t) => $(42 + t * 11, 22, 8, 9, t === 2 ? kp : jp, 1, 2)).join("") + Bp(4, 38, 9, (e) => zp(34, e, 126, e, Ap, .6, .6)) + $(56, 39, 62, 7, Mp, .5, 2) + $(56, 57, 62, 7, kp, .5, 2) + zp(48, 51, 126, 51, kp, 1.4) + Rp(48, 51, 2.2, kp),
	yearWheel: () => `<circle cx="46" cy="40" r="24" fill="none" stroke="${jp}" stroke-width="9"/><circle cx="46" cy="40" r="24" fill="none" stroke="${Ap}" stroke-width="9" stroke-dasharray="100 151" transform="rotate(-90 46 40)"${Lp(.8)}/><circle cx="46" cy="40" r="24" fill="none" stroke="${kp}" stroke-width="9" stroke-dasharray="13 151" stroke-dashoffset="-100" transform="rotate(-90 46 40)"/>` + Rp(24, 32, 2, Mp) + Rp(26, 50, 2, Mp) + Rp(60, 60, 2, Mp, .5) + $(38, 37, 16, 6, Mp, .9) + $(88, 20, 20, 4, kp) + Bp(3, 30, 13, (e) => $(88, e, 56, 9, jp, 1, 2) + $(92, e + 3, 34, 3, Ap, .9)),
	heatmap: () => $(12, 8, 136, 64, jp, .6, 3) + Array.from({ length: 3 }, (e, t) => Array.from({ length: 28 }, (e, n) => $(18 + t * 44 + n % 7 * 5.4, 16 + Math.floor(n / 7) * 5.4, 4.2, 4.2, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? kp : Ap, [
		3,
		11,
		16,
		24
	].includes((n + t * 5) % 28) ? 1 : (n * 7 + t) % 5 == 0 ? .6 : .28, 1)).join("")).join("") + $(18, 46, 124, 9, Op, .8, 2) + $(22, 49, 30, 3, Mp, .8),
	billboard: () => $(34, 6, 92, 68, Np, 1, 6) + Rp(42, 14, 2, kp) + $(48, 12, 24, 4, kp, .9) + $(42, 22, 60, 7, Mp, .95) + [
		42,
		70,
		98
	].map((e) => $(e, 36, 22, 16, jp, 1, 3) + $(e + 6, 40, 10, 7, Mp, .9, 1)).join("") + $(42, 58, 78, 9, kp, 1, 3),
	stacked: () => $(54, 10, 70, 44, jp, .7, 5) + $(46, 16, 70, 44, jp, 1, 5) + $(38, 22, 70, 44, Mp, 1, 5) + $(44, 28, 22, 6, kp, 1, 3) + $(44, 40, 44, 5, Np, .9) + $(44, 49, 30, 3, Np, .5) + $(44, 56, 20, 6, kp, 1, 2),
	noticeboard: () => $(34, 6, 92, 68, "#8a5a3c", 1, 5) + $(42, 14, 64, 28, "#fff7cc", 1, 0) + Rp(74, 14, 3, "#d33a2c") + $(48, 22, 40, 5, Np, .9) + $(48, 31, 28, 3, Np, .5) + $(48, 46, 58, 20, "#d9ecff", 1, 0) + Rp(54, 46, 2.6, "#2f6fd6") + $(54, 53, 36, 4, Np, .85) + $(54, 60, 44, 2.5, Np, .45),
	split: () => $(16, 10, 128, 60, jp, 1, 6) + $(16, 10, 44, 42, kp, 1, 6) + $(24, 22, 20, 22, Np, .9, 2) + $(68, 16, 20, 5, Ap, .7, 2) + $(68, 26, 58, 6, Mp, .95) + $(68, 36, 40, 3, Ap, .7) + zp(16, 52, 144, 52, Ap, .6, .6) + $(24, 58, 60, 3, Ap, .8) + $(24, 64, 44, 2.5, Ap, .5),
	band: () => $(8, 30, 144, 20, kp, 1, 0) + $(8, 30, 40, 20, Np, 1, 0) + Rp(16, 40, 2, kp) + $(22, 38, 20, 4, Mp, .9) + $(56, 38, 34, 4, Np, .85) + Rp(96, 40, 1.8, Np) + $(102, 38, 34, 4, Np, .85) + Rp(142, 40, 1.8, Np),
	oneLine: () => Bp(3, 12, 20, (e, t) => $(12, e, 136, 15, jp, t ? .7 : 1, 4) + zp(12, e + 1, 12, e + 14, t ? Ap : kp, 3) + Rp(22, e + 7.5, 2.4, t ? Ap : kp) + $(30, e + 5.5, 20, 4, t ? Ap : kp, .9) + $(56, e + 5.5, 54, 4, Ap, .9) + (t ? "" : $(124, e + 4, 18, 7, kp, 1, 2))),
	ring: () => $(30, 6, 100, 68, jp, 1, 8) + `<circle cx="58" cy="34" r="15" fill="none" stroke="${Ap}" stroke-width="5"${Lp(.5)}/><circle cx="58" cy="34" r="15" fill="none" stroke="${kp}" stroke-width="5" stroke-linecap="round" stroke-dasharray="70 94" transform="rotate(-90 58 34)"/>` + $(53, 31, 10, 6, Mp, .9, 1) + $(82, 24, 38, 6, Mp, .95) + $(82, 35, 28, 3, Ap, .8) + zp(38, 56, 122, 56, Ap, .6, .6) + $(38, 61, 50, 3, Ap, .7) + $(38, 67, 40, 3, Ap, .5),
	darkGlass: () => $(34, 6, 92, 68, "#121216", 1, 7) + Rp(112, 16, 22, kp, .45) + Rp(46, 68, 20, "#3fb8a4", .35) + Rp(42, 14, 2, kp) + $(48, 12, 22, 4, kp, .9) + $(42, 22, 56, 6, Mp, .95) + $(42, 34, 76, 3, Ap, .6, 1.5) + $(42, 34, 60, 3, kp, 1, 1.5) + $(42, 42, 36, 9, Mp, 1, 3) + $(82, 42, 36, 9, Mp, .18, 3) + $(42, 56, 76, 14, Mp, .1, 3) + $(47, 61, 40, 3, Mp, .7),
	nextBento: () => $(40, 8, 80, 26, kp, 1, 6) + $(46, 13, 22, 4, Np, .8) + $(46, 23, 44, 5, Np, .9) + $(40, 38, 38, 16, jp, 1, 5) + $(82, 38, 38, 16, jp, 1, 5) + $(40, 58, 38, 16, Mp, 1, 5) + $(82, 58, 38, 16, kp, .4, 5) + $(46, 42, 8, 7, Mp, .9, 1) + $(88, 42, 8, 7, Mp, .9, 1) + $(46, 62, 8, 7, Np, .9, 1),
	apNow: () => $(40, 6, 80, 68, Fp, 1, 5) + $(40, 6, 80, 12, Pp, 1, 5) + Rp(47, 12, 1.8, Ip) + $(52, 10, 22, 4, Ip, .9) + $(46, 24, 14, 14, Pp, 1, 2) + $(50, 28, 6, 6, Ip, 1, 1) + $(66, 25, 44, 5, Pp, .9) + $(66, 34, 32, 3, Pp, .5) + $(40, 46, 80, 28, "#eae1c7", 1, 0) + zp(48, 54, 48, 66, Ip, 1) + Rp(48, 54, 1.8, Ip) + Rp(48, 66, 1.8, Ip) + $(54, 52, 40, 3.5, Pp, .8) + $(54, 64, 34, 3.5, Pp, .8),
	apNavy: () => $(40, 6, 80, 68, Pp, 1, 5) + Rp(47, 13, 1.8, Ip) + $(52, 11, 22, 4, Ip, .9) + $(46, 20, 68, 22, Fp, 1, 3) + $(51, 25, 8, 10, Ip, 1, 1) + $(64, 25, 40, 5, Pp, .9) + $(64, 34, 26, 3, Pp, .5) + `<rect x="46" y="46" width="68" height="14" rx="3" fill="#262e4f" stroke="${Ip}" stroke-width="0.8"/>` + $(51, 50, 7, 6, Ip, 1, 1) + $(64, 51, 36, 4, Fp, .85) + $(46, 66, 50, 3, Fp, .6),
	apSeries: () => $(12, 8, 136, 64, "#f5efdd", 1, 2) + zp(20, 17, 34, 17, Ip, 1) + $(38, 15, 26, 3.5, Ip, .9) + $(20, 24, 58, 8, "#7a1a1a") + $(20, 38, 64, 3, Pp, .6) + $(20, 44, 52, 3, Pp, .6) + [
		20,
		46,
		72
	].map((e) => $(e, 54, 12, 2.5, Ip, .9) + $(e, 60, 20, 3.5, Pp, .8)).join("") + zp(100, 14, 100, 66, Ip, .8, .6) + $(108, 18, 30, 8, "#7a1a1a", .85) + $(108, 32, 32, 2.5, Pp, .5) + $(108, 38, 26, 2.5, Pp, .5),
	mobileAgenda: () => $(50, 4, 60, 72, "#121216", 1, 8) + $(56, 10, 22, 4, Mp, .9) + Array.from({ length: 7 }, (e, t) => $(56 + t * 7.1, 18, 5.6, 9, t === 2 ? kp : jp, 1, 2)).join("") + Bp(3, 32, 14, (e) => $(56, e, 48, 11, "#1c1c22", 1, 3) + zp(67, e + 2, 67, e + 9, kp, 1.4) + $(58, e + 4, 6, 3, Ap, .8) + $(70, e + 3, 26, 3, Mp, .85))
};
Object.keys(Up);
function Wp(e) {
	let t = Up[e] ?? Up.plain, n = ["booklet"].includes(e);
	return Vp(t(), n ? "#1a2620" : Op);
}
//#endregion
//#region src/App.svelte
var Gp = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Kp = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), qp = /* @__PURE__ */ V("<p> </p>"), Jp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"60\" class=\"svelte-1n46o8q\"/></label> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!>", 1), Yp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Xp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Zp = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Qp = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), $p = /* @__PURE__ */ V("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), em = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), tm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), nm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), rm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), im = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), am = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), om = /* @__PURE__ */ V("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), sm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), cm = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), lm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), um = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), dm = /* @__PURE__ */ V("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>"), fm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" max=\"20\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), pm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), mm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label>"), hm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), gm = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\" class=\"svelte-1n46o8q\"/> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), _m = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/>", 1), vm = /* @__PURE__ */ V("<label><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), ym = /* @__PURE__ */ V("<!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), bm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), xm = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Sm = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), Cm = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), wm = /* @__PURE__ */ V("<input class=\"nav-target svelte-1n46o8q\"/>"), Tm = /* @__PURE__ */ V("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Em = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), Dm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Om = /* @__PURE__ */ V("<i class=\"menu-group-dot svelte-1n46o8q\" aria-hidden=\"true\"></i>"), km = /* @__PURE__ */ V("<button type=\"button\" class=\"linkish menu-group-reset svelte-1n46o8q\"> </button>"), Am = /* @__PURE__ */ V("<details class=\"group menu-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><!><span class=\"menu-group-title svelte-1n46o8q\"> </span><span class=\"menu-group-value svelte-1n46o8q\"> </span></summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details>"), jm = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Mm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), Nm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Pm = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/>"), Fm = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Im = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Lm = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\" spellcheck=\"false\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <!></span></div>"), Rm = /* @__PURE__ */ V("<button type=\"button\" class=\"linkish cal-source svelte-1n46o8q\"> </button>"), zm = /* @__PURE__ */ V("<span class=\"gridmenu-value svelte-1n46o8q\"> </span>"), Bm = /* @__PURE__ */ V("<!> <!>", 1), Vm = /* @__PURE__ */ V("<!> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!>", 1), Hm = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Um = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Wm = /* @__PURE__ */ V("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), Gm = /* @__PURE__ */ V("<!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!>", 1), Km = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input placeholder=\"/program\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>"), qm = /* @__PURE__ */ V("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!>", 1), Jm = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Ym = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <input placeholder=\"https://\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), Xm = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Zm = /* @__PURE__ */ V("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"> </button>"), Qm = /* @__PURE__ */ V("<!> <!> <!> <!> <!> <!>", 1), $m = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), eh = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), th = /* @__PURE__ */ V("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), nh = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), rh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), ih = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), ah = /* @__PURE__ */ V("<button type=\"button\"></button>"), oh = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input class=\"field-filled svelte-1n46o8q\"/></label>"), sh = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-6 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), ch = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), lh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), uh = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button>"), dh = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), fh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), ph = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), mh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/>", 1), hh = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), gh = /* @__PURE__ */ V("<!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), _h = /* @__PURE__ */ V("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), vh = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), yh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), bh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), xh = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), Sh = /* @__PURE__ */ V("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Ch = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), wh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Th = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Eh = /* @__PURE__ */ V("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), Dh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Oh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), kh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Ah = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), jh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"24\" class=\"svelte-1n46o8q\"/></label>"), Mh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!></div>"), Nh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), Ph = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Fh = /* @__PURE__ */ V("<div class=\"cal-slot svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), Ih = /* @__PURE__ */ V("<!> <div class=\"cal-slots svelte-1n46o8q\"></div>", 1), Lh = /* @__PURE__ */ V("<!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button type=\"button\"><i> </i></button> <button type=\"button\"><u> </u></button> <!></span>", 1), Rh = /* @__PURE__ */ V("<button type=\"button\" class=\"menu-row cal-design-row svelte-1n46o8q\"><span class=\"menu-group-title svelte-1n46o8q\"> </span><span class=\"menu-group-value svelte-1n46o8q\"> </span></button>   <!> <!> <!> <!>", 1), zh = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Bh = /* @__PURE__ */ V("<!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Vh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Hh = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Uh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Wh = /* @__PURE__ */ V("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Gh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Kh = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), qh = /* @__PURE__ */ V("<button class=\"ghost action svelte-1n46o8q\"> </button> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Jh = /* @__PURE__ */ V("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), Yh = /* @__PURE__ */ V("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), Xh = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div></div> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Zh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Qh = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), $h = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), eg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), tg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ng = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), rg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ig = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>", 1), ag = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), og = /* @__PURE__ */ V("<!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"80\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), sg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), cg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), lg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), ug = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), dg = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), fg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), pg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), mg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), hg = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), gg = /* @__PURE__ */ V("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), _g = /* @__PURE__ */ V("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), vg = /* @__PURE__ */ V("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!>", 1), yg = /* @__PURE__ */ V("<button type=\"button\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), bg = /* @__PURE__ */ V("<!> <div class=\"footer-tpick svelte-1n46o8q\"></div>", 1), xg = /* @__PURE__ */ V("<div class=\"menu-picker cal-designs svelte-1n46o8q\"><div class=\"menu-picker-head svelte-1n46o8q\"><button type=\"button\" class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"panel-strong svelte-1n46o8q\"> </span></div> <!></div>"), Sg = /* @__PURE__ */ V("<button type=\"button\" class=\"menu-quick-open svelte-1n46o8q\"> </button>"), Cg = /* @__PURE__ */ V("<input type=\"number\" class=\"svelte-1n46o8q\"/>"), wg = /* @__PURE__ */ V("<button type=\"button\"> </button>"), Tg = /* @__PURE__ */ V("<span class=\"seg svelte-1n46o8q\" role=\"group\"></span>"), Eg = /* @__PURE__ */ V("<div class=\"menu-quick-item svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></div>"), Dg = /* @__PURE__ */ V("<div class=\"menu-quick svelte-1n46o8q\"></div>"), Og = /* @__PURE__ */ V("<div class=\"emenu-cols svelte-1n46o8q\"><section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section> <section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section> <section class=\"emenu-col svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p><!></section></div>"), kg = /* @__PURE__ */ V("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Ag = /* @__PURE__ */ V("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), jg = /* @__PURE__ */ V("<button><!> </button>"), Mg = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"></div>"), Ng = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), Pg = /* @__PURE__ */ V("<button></button>"), Fg = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), Ig = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), Lg = /* @__PURE__ */ V("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), Rg = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), zg = /* @__PURE__ */ V("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), Bg = /* @__PURE__ */ V("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), Vg = /* @__PURE__ */ V("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), Hg = /* @__PURE__ */ V("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), Ug = /* @__PURE__ */ V("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), Wg = /* @__PURE__ */ V("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), Gg = /* @__PURE__ */ V("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), Kg = /* @__PURE__ */ V("<span class=\"who svelte-1n46o8q\"><!> </span>"), qg = /* @__PURE__ */ V("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Jg = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Yg = /* @__PURE__ */ V("<button> </button>"), Xg = /* @__PURE__ */ V("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Zg = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), Qg = /* @__PURE__ */ V("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), $g = /* @__PURE__ */ V("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), e_ = /* @__PURE__ */ V("<span class=\"page-path svelte-1n46o8q\">/</span>"), t_ = /* @__PURE__ */ V("<input class=\"page-slug svelte-1n46o8q\"/>"), n_ = /* @__PURE__ */ V("<span class=\"seo-warn svelte-1n46o8q\"></span>"), r_ = /* @__PURE__ */ V("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), i_ = /* @__PURE__ */ V("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), a_ = /* @__PURE__ */ V("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), o_ = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), s_ = /* @__PURE__ */ V("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), c_ = /* @__PURE__ */ V("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), l_ = /* @__PURE__ */ V("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), u_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), d_ = /* @__PURE__ */ V("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), f_ = /* @__PURE__ */ V("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), p_ = /* @__PURE__ */ V("<span class=\"logo-file svelte-1n46o8q\"> </span>"), m_ = /* @__PURE__ */ V("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), h_ = /* @__PURE__ */ V("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), g_ = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), __ = /* @__PURE__ */ V("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), v_ = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), y_ = /* @__PURE__ */ V("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), b_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), x_ = /* @__PURE__ */ V("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), S_ = /* @__PURE__ */ V("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), C_ = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), w_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), T_ = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), E_ = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), D_ = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), O_ = /* @__PURE__ */ V("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), k_ = /* @__PURE__ */ V("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), A_ = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), j_ = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), M_ = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), N_ = /* @__PURE__ */ V("<span class=\"tool-move svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), P_ = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), F_ = /* @__PURE__ */ V("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div>"), I_ = /* @__PURE__ */ V("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label>"), L_ = /* @__PURE__ */ V("<img alt=\"\"/>"), R_ = /* @__PURE__ */ V("<span class=\"lrow-warn svelte-1n46o8q\"></span>"), z_ = /* @__PURE__ */ V("<span class=\"lrow-tile-mark svelte-1n46o8q\"><!></span> <span class=\"lrow-tile-name svelte-1n46o8q\"> </span>", 1), B_ = /* @__PURE__ */ V("<span class=\"bad-target-note svelte-1n46o8q\"> </span>"), V_ = /* @__PURE__ */ V("<div class=\"lrow-body svelte-1n46o8q\"><!> <div class=\"lrow-fields svelte-1n46o8q\"><input class=\"field-filled svelte-1n46o8q\"/> <input/> <!> <span class=\"lrow-actions svelte-1n46o8q\"><!> <button class=\"linkish danger svelte-1n46o8q\"> </button></span></div></div>"), H_ = /* @__PURE__ */ V("<div><div class=\"lrow-head svelte-1n46o8q\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark svelte-1n46o8q\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\" role=\"none\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"lrow-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></div> <!></div>"), U_ = /* @__PURE__ */ V("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"lbtn-pick svelte-1n46o8q\"><!> <span class=\"lbtn-name svelte-1n46o8q\"><!></span></span></div> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), W_ = /* @__PURE__ */ V("<details class=\"group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"> <!></span></summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details>"), G_ = /* @__PURE__ */ V("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), K_ = /* @__PURE__ */ V("<input class=\"nav-item-href svelte-1n46o8q\"/>"), q_ = /* @__PURE__ */ V("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), J_ = /* @__PURE__ */ V("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), Y_ = /* @__PURE__ */ V("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), X_ = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <!> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!>  <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), Z_ = /* @__PURE__ */ V("<p class=\"panel-hint place-error svelte-1n46o8q\"> </p>"), Q_ = /* @__PURE__ */ V("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), $_ = /* @__PURE__ */ V("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), ev = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), tv = /* @__PURE__ */ V("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), nv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input placeholder=\"Europe/Oslo\" spellcheck=\"false\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input placeholder=\"meet.example.org\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), rv = /* @__PURE__ */ V("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), iv = /* @__PURE__ */ V("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), av = /* @__PURE__ */ V("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), ov = /* @__PURE__ */ V("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), sv = /* @__PURE__ */ V("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), cv = /* @__PURE__ */ V("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), lv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), uv = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), dv = /* @__PURE__ */ V("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), fv = /* @__PURE__ */ V("<button type=\"button\" class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), pv = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), mv = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div> <details class=\"group cal-palette svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <!></details></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), hv = /* @__PURE__ */ V("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), gv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), _v = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), vv = /* @__PURE__ */ V("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), yv = /* @__PURE__ */ V("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"4\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), bv = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), xv = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Sv = /* @__PURE__ */ V("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Cv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), wv = /* @__PURE__ */ V("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Tv = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Ev = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Dv = /* @__PURE__ */ V("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Ov = /* @__PURE__ */ V("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), kv = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Av = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), jv = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), Mv = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Nv = /* @__PURE__ */ V("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), Pv = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), Fv = /* @__PURE__ */ V("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Iv = /* @__PURE__ */ V("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), Lv = /* @__PURE__ */ V("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Rv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), zv = /* @__PURE__ */ V("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Bv = /* @__PURE__ */ V("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Vv = /* @__PURE__ */ V("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), Hv = /* @__PURE__ */ V("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Uv = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Wv = /* @__PURE__ */ V("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), Gv = /* @__PURE__ */ V("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Kv = /* @__PURE__ */ V("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), qv = /* @__PURE__ */ V("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Jv = /* @__PURE__ */ V("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Yv = /* @__PURE__ */ V("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), Xv = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Zv = /* @__PURE__ */ V("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), Qv = /* @__PURE__ */ V("<span class=\"chip svelte-1n46o8q\"> </span>"), $v = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), ey = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), ty = /* @__PURE__ */ V("<span class=\"update-warn svelte-1n46o8q\"></span>"), ny = /* @__PURE__ */ V("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), ry = /* @__PURE__ */ V("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), iy = /* @__PURE__ */ V("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), ay = /* @__PURE__ */ V("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), oy = /* @__PURE__ */ V("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), sy = /* @__PURE__ */ V("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), cy = /* @__PURE__ */ V("<p class=\"loading svelte-1n46o8q\"> </p>"), ly = /* @__PURE__ */ V("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), uy = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), dy = /* @__PURE__ */ V("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), fy = /* @__PURE__ */ V("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), py = /* @__PURE__ */ V("<div><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool menu-width svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), my = /* @__PURE__ */ V("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>     <!>", 1);
function hy(e, t) {
	Ze(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Pr(), a = P(i), o = (e) => {
			var i = Kp(), a = P(i), o = N(a), s = I(o);
			E(a), Yr(I(a, 2), 17, () => r().props.images ?? [], Gr, (e, i, a) => {
				var o = Gp(), s = P(o), c = N(s), l = I(c, 2), u = N(l);
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
				K(b), L((e, t, n, o, s) => {
					J(c, "src", z(i).src), d.disabled = a === r().props.images.length - 1, J(f, "title", e), U(m, `${t ?? ""} `), U(h, `${n ?? ""}%`), q(g, z(i).x ?? .5), U(v, `${o ?? ""} `), U(y, `${s ?? ""}%`), q(b, z(i).y ?? .5);
				}, [
					() => Y("tip.removeImage"),
					() => Y("lbl.focusX"),
					() => Math.round((z(i).x ?? .5) * 100),
					() => Y("lbl.focusY"),
					() => Math.round((z(i).y ?? .5) * 100)
				]), B("click", u, () => ia(t(), n(), a, -1)), B("click", d, () => ia(t(), n(), a, 1)), B("click", f, () => aa(t(), n(), a)), B("input", g, (e) => ca(t(), n(), a, "x", Number(e.target.value))), B("input", b, (e) => ca(t(), n(), a, "y", Number(e.target.value))), H(e, o);
			}), L((e, t) => {
				J(a, "title", e), U(o, `${t ?? ""} `);
			}, [() => Y("tip.bg.addImages"), () => Y("ui.addImages")]), B("change", s, (e) => na(t(), n(), e)), H(e, i);
		};
		W(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), H(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ k(() => jl(r()));
		var a = Yp(), o = P(a), s = N(o), c = I(s);
		{
			let e = /* @__PURE__ */ k(() => z(i).source ?? "upload"), r = /* @__PURE__ */ k(() => [["upload", Y("opt.photoSource.upload")], ["folder", Y("opt.photoSource.folder")]]);
			X(c, {
				get value() {
					return z(e);
				},
				get options() {
					return z(r);
				},
				onchange: (e) => gi(t(), n(), "source", e)
			});
		}
		E(o);
		var l = I(o, 2), u = (e) => {
			let a = /* @__PURE__ */ k(() => Jd(z(i).folder ?? "")), o = /* @__PURE__ */ k(() => !z(a) || z(a).provider === "drive" || z(a).provider === "nextcloud");
			var s = Jp(), c = P(s), l = N(c), u = I(l);
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
					onchange: (e) => gi(t(), n(), "order", e)
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
				var r = qp();
				let i;
				var a = F(r, !0);
				L((e, t) => {
					i = _i(r, 1, "folder-status svelte-1n46o8q", null, i, { err: e }), U(a, t);
				}, [() => Qi[$i(t(), n())].err, () => Qi[$i(t(), n())].text]), H(e, r);
			}, ee = /* @__PURE__ */ k(() => Qi[$i(t(), n())]);
			W(x, (e) => {
				z(ee) && e(S);
			}), L((e, t, n, r, o, s, m, y) => {
				J(c, "title", e), U(l, `${t ?? ""} `), q(u, z(i).folder ?? ""), d = _i(u, 1, "svelte-1n46o8q", null, d, { "bad-target": n }), J(f, "title", r), U(p, `${o ?? ""} `), J(h, "title", s), U(g, `${m ?? ""} `), q(_, z(i).folderMax ?? 24), v.disabled = !z(a), U(b, ` ${y ?? ""}`);
			}, [
				() => Y("tip.bg.photoFolder"),
				() => Y("lbl.photoFolder"),
				() => (z(i).folder ?? "").trim() && !z(a),
				() => Y("tip.bg.folderOrder"),
				() => Y("lbl.folderOrder"),
				() => Y("tip.bg.folderMax"),
				() => Y("lbl.folderMax"),
				() => Y("ui.checkFolder")
			]), B("change", u, (e) => gi(t(), n(), "folder", e.target.value.trim())), B("change", _, (e) => gi(t(), n(), "folderMax", Number(e.target.value))), B("click", v, () => ta(t(), n(), r())), H(e, s);
		};
		W(l, (e) => {
			(z(i).source ?? "upload") === "folder" && e(u);
		}), L((e, t) => {
			J(o, "title", e), U(s, `${t ?? ""} `);
		}, [() => Y("tip.bg.photoSource"), () => Y("lbl.photoSource")]), H(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = Yp(), a = P(i), o = N(a), s = I(o);
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
				onchange: (e) => gi(t(), n(), "motion", e)
			});
		}
		E(a);
		var c = I(a, 2), l = (e) => {
			var i = Xp(), a = P(i), o = N(a), s = F(I(o));
			E(a);
			var c = I(a, 2);
			K(c), L((e) => {
				U(o, `${e ?? ""} `), U(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), q(c, r().props.motionSpeed ?? 20);
			}, [() => Y("lbl.motionSpeed")]), B("input", c, (e) => gi(t(), n(), "motionSpeed", Number(e.target.value))), H(e, i);
		};
		W(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), L((e, t) => {
			J(a, "title", e), U(o, `${t ?? ""} `);
		}, [() => Y("tip.bg.imageMotion"), () => Y("lbl.motion")]), H(e, i);
	}, a = (e, t = f, a = f) => {
		var o = Cm(), s = P(o);
		Yr(s, 17, a, Gr, (e, o, s) => {
			var c = Sm(), l = N(c), u = N(l);
			{
				let e = /* @__PURE__ */ k(() => Y("tip.bg.changeType")), n = /* @__PURE__ */ k(() => re.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
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
					onchange: (e) => Ri(t(), s, e)
				});
			}
			var d = I(u, 2), f = N(d);
			f.disabled = s === 0, G(f, () => C.up, !0), E(f);
			var p = I(f, 2);
			G(p, () => C.down, !0), E(p);
			var m = I(p, 2);
			G(m, () => C.cross, !0), E(m), E(d), E(l);
			var h = I(l, 2), g = (e) => {
				var n = Zp(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.bg.layerColor"));
					Ta(a, {
						get value() {
							return z(o).props.value;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => gi(t(), s, "value", e)
					});
				}
				E(r);
				var c = I(r, 2), l = N(c), u = F(I(l));
				E(c);
				var d = I(c, 2);
				K(d), L((e, t, n) => {
					U(i, `${e ?? ""} `), U(l, `${t ?? ""} `), U(u, `${n ?? ""}%`), q(d, z(o).props.opacity ?? 1);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.strength"),
					() => Math.round((z(o).props.opacity ?? 1) * 100)
				]), B("input", d, (e) => gi(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, _ = (e) => {
				let n = /* @__PURE__ */ k(() => Ti(z(o))), r = /* @__PURE__ */ k(() => z(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var i = nm(), a = P(i), c = N(a), l = I(c);
				{
					let e = /* @__PURE__ */ k(() => z(n).kind ?? "linear"), r = /* @__PURE__ */ k(() => [["linear", Y("opt.grad.linear")], ["radial", Y("opt.grad.radial")]]);
					X(l, {
						get value() {
							return z(e);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => Ai(t(), s, e)
					});
				}
				E(a);
				var u = I(a, 2);
				Yr(u, 17, () => z(n).stops, Gr, (e, i, a) => {
					var o = $p();
					let c;
					var l = N(o), u = I(l, 2);
					{
						let e = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.bg.stopColor"));
						Ta(u, {
							get value() {
								return z(i).color;
							},
							get tokens() {
								return z(e);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => ji(t(), s, a, { color: e })
						});
					}
					var d = I(u, 2);
					K(d);
					var f = I(d, 2), p = F(f), m = I(f, 2), h = (e) => {
						var n = Qp();
						G(n, () => C.cross, !0), E(n), L((e) => J(n, "title", e), [() => Y("tip.bg.removeStop")]), B("click", n, () => Pi(t(), s, a)), H(e, n);
					};
					W(m, (e) => {
						z(n).stops.length > 2 && e(h);
					}), E(o), L((e, t, r) => {
						c = _i(o, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: z(Ii)?.layer === s && z(Ii).from === a,
							"drop-above": z(Ii)?.layer === s && z(Ii).insert === a,
							"drop-below": z(Ii)?.layer === s && z(Ii).insert === z(n).stops.length && a === z(n).stops.length - 1
						}), J(l, "title", e), q(d, z(i).share ?? 50), J(d, "title", t), U(p, `${r ?? ""}%`);
					}, [
						() => Y("tip.bg.dragStop"),
						() => Y("tip.bg.stopShare"),
						() => z(r) > 0 ? Math.round(Math.max(0, Number(z(i).share) || 0) / z(r) * 100) : Math.round(100 / z(n).stops.length)
					]), B("pointerdown", l, (e) => Li(t(), e, s, a)), B("input", d, (e) => ji(t(), s, a, { share: Number(e.target.value) })), H(e, o);
				});
				var d = I(u, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
					var r = em(), i = P(r), a = N(i), o = F(I(a));
					E(i);
					var c = I(i, 2);
					K(c);
					var l = I(c, 2), u = N(l), d = F(I(u));
					E(l);
					var f = I(l, 2);
					K(f), L((e, t, r, i) => {
						U(a, `${e ?? ""} `), U(o, `${t ?? ""}%`), q(c, z(n).x ?? .5), U(u, `${r ?? ""} `), U(d, `${i ?? ""}%`), q(f, z(n).y ?? .5);
					}, [
						() => Y("lbl.centerX"),
						() => Math.round((z(n).x ?? .5) * 100),
						() => Y("lbl.centerY"),
						() => Math.round((z(n).y ?? .5) * 100)
					]), B("input", c, (e) => Di(t(), s, "x", Number(e.target.value))), B("input", f, (e) => Di(t(), s, "y", Number(e.target.value))), H(e, r);
				}, h = (e) => {
					var r = tm(), i = P(r), a = N(i), o = F(I(a));
					E(i);
					var c = I(i, 2);
					K(c), L((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(n).angle ?? ""}°`), q(c, z(n).angle);
					}, [() => Y("lbl.angle")]), B("input", c, (e) => Di(t(), s, "angle", Number(e.target.value))), H(e, r);
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
							return ki[(z(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Di(t(), s, "animation", e)
					});
				}
				E(b), L((e, t, r, i, a, o, s) => {
					U(c, `${e ?? ""} `), J(d, "title", t), U(f, r), U(_, `${i ?? ""} `), U(v, `${a ?? ""}%`), q(y, z(n).opacity ?? 1), J(b, "title", o), U(x, `${s ?? ""} `);
				}, [
					() => Y("blocks.shape"),
					() => Y("tip.bg.addStop"),
					() => Y("ui.addStop"),
					() => Y("lbl.strength"),
					() => Math.round((z(n).opacity ?? 1) * 100),
					() => Y("tip.bg.motion"),
					() => Y("lbl.motion")
				]), B("click", d, () => Ni(t(), s)), B("input", y, (e) => Di(t(), s, "opacity", Number(e.target.value))), H(e, i);
			}, v = (e) => {
				var n = rm(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.bg.glowColor"));
					Ta(a, {
						get value() {
							return z(o).props.color;
						},
						get tokens() {
							return z(e);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => gi(t(), s, "color", e)
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
				K(ee), L((e, t, n, r, a, s, c, f, g) => {
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
				]), B("input", d, (e) => gi(t(), s, "x", Number(e.target.value))), B("input", h, (e) => gi(t(), s, "y", Number(e.target.value))), B("input", y, (e) => gi(t(), s, "radius", Number(e.target.value))), B("input", ee, (e) => gi(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, y = (e) => {
				var n = im(), r = P(n), i = N(r), a = F(I(i));
				E(r);
				var c = I(r, 2);
				K(c), L((e, t) => {
					U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.opacity);
				}, [() => Y("lbl.strength"), () => Math.round(z(o).props.opacity * 100)]), B("input", c, (e) => gi(t(), s, "opacity", Number(e.target.value))), H(e, n);
			}, b = (e) => {
				var n = am(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(() => Uu(z(o).props.pattern)), n = /* @__PURE__ */ k(() => zu.map((e) => [e, Y(`opt.bgPattern.${e}`)]));
					X(a, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => gi(t(), s, "pattern", e)
					});
				}
				E(r);
				var c = I(r, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(o).props.color ?? "text"), n = /* @__PURE__ */ k(ga), r = /* @__PURE__ */ k(() => Y("lbl.color"));
					Ta(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(n);
						},
						get label() {
							return z(r);
						},
						onchange: (e) => gi(t(), s, "color", e)
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
				E(ee), L((e, t, n, r, a, s, c, u) => {
					U(i, `${e ?? ""} `), U(l, `${t ?? ""} `), U(f, `${n ?? ""} `), U(p, `${z(o).props.size ?? Bu.dflt ?? ""} px`), J(m, "min", Bu.min), J(m, "max", Bu.max), q(m, z(o).props.size ?? Bu.dflt), U(g, `${r ?? ""} `), U(_, `${a ?? ""}%`), q(v, z(o).props.opacity ?? .12), U(b, `${s ?? ""} `), U(x, `${z(o).props.rotation ?? 0 ?? ""}°`), q(S, z(o).props.rotation ?? 0), J(ee, "title", c), wi(te, z(o).props.invert === !0), U(ne, ` ${u ?? ""}`);
				}, [
					() => Y("lbl.bgPattern"),
					() => Y("lbl.color"),
					() => Y("lbl.size"),
					() => Y("lbl.strength"),
					() => Math.round((z(o).props.opacity ?? .12) * 100),
					() => Y("lbl.patternRotation"),
					() => Y("tip.bg.patternInvert"),
					() => Y("lbl.patternInvert")
				]), B("input", m, (e) => gi(t(), s, "size", Number(e.target.value))), B("input", v, (e) => gi(t(), s, "opacity", Number(e.target.value))), B("input", S, (e) => gi(t(), s, "rotation", Number(e.target.value))), B("change", te, (e) => gi(t(), s, "invert", e.target.checked)), H(e, n);
			}, x = (e) => {
				let n = /* @__PURE__ */ k(() => z(o).props.fit === "tile" || z(o).props.fit === "repeat");
				var r = cm(), a = P(r), c = N(a), l = I(c);
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
						onchange: (e) => gi(t(), s, "fit", e)
					});
				}
				E(u);
				var p = I(u, 2), m = F(p, !0), h = I(p, 2), g = N(h), _ = I(g, 2);
				K(_);
				var v = I(_, 4);
				E(h);
				var y = I(h, 2), b = (e) => {
					var n = om(), r = P(n), i = N(r), a = F(i, !0), c = I(i, 2), l = F(c, !0);
					E(r);
					var u = I(r, 2), d = F(u, !0), f = I(u, 2), p = I(f, 2), m = N(p), h = F(I(m));
					E(p);
					var g = I(p, 2);
					K(g);
					var _ = I(g, 2), v = N(_), y = F(I(v));
					E(_);
					var b = I(_, 2);
					K(b), L((e, t, n, r, s, p, _, x, S, ee, te, ne) => {
						J(i, "title", e), U(a, t), J(c, "title", n), U(l, r), J(u, "title", s), U(d, p), yi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), U(m, `${S ?? ""} `), U(h, `${ee ?? ""}%`), q(g, z(o).props.x ?? .5), U(v, `${te ?? ""} `), U(y, `${ne ?? ""}%`), q(b, z(o).props.y ?? .5);
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
					]), B("click", i, () => Ci(t(), s, z(o), "cover")), B("click", c, () => Ci(t(), s, z(o), "contain")), B("pointerdown", f, (e) => vi(e, t(), s, "xy")), B("input", g, (e) => gi(t(), s, "x", Number(e.target.value))), B("input", b, (e) => gi(t(), s, "y", Number(e.target.value))), H(e, n);
				};
				W(y, (e) => {
					z(n) || e(b);
				});
				var x = I(y, 2), S = N(x), ee = F(I(S));
				E(x);
				var te = I(x, 2);
				K(te);
				var ne = I(te, 2), re = N(ne), ie = F(I(re));
				E(ne);
				var C = I(ne, 2);
				K(C);
				var ae = I(C, 2);
				i(ae, t, () => s, () => z(o));
				var oe = I(ae, 2), se = N(oe);
				K(se);
				var ce = I(se);
				E(oe);
				var le = I(oe, 2), ue = (e) => {
					var n = sm(), r = P(n), i = N(r), a = F(I(i));
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
							onchange: (e) => gi(t(), s, "bleed", e)
						});
					}
					E(l), L((e, t, n, r) => {
						U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.parallax ?? .3), J(l, "title", n), U(u, `${r ?? ""} `);
					}, [
						() => Y("lbl.parallaxStrength"),
						() => Math.round((z(o).props.parallax ?? 0) * 100),
						() => Y("tip.bg.bleed"),
						() => Y("lbl.bleed")
					]), B("input", c, (e) => gi(t(), s, "parallax", Number(e.target.value))), H(e, n);
				};
				W(le, (e) => {
					(z(o).props.parallax ?? 0) > 0 && e(ue);
				}), L((e, t, n, r, i, s, l, f, h, y, b, x, ne, ae) => {
					J(a, "title", e), U(c, `${t ?? ""} `), J(u, "title", n), U(d, `${r ?? ""} `), J(p, "title", i), U(m, s), J(g, "title", l), q(_, f), J(v, "title", h), U(S, `${y ?? ""} `), U(ee, `${z(o).props.blur ?? 0 ?? ""} px`), q(te, z(o).props.blur ?? 0), U(re, `${b ?? ""} `), U(ie, `${x ?? ""}%`), q(C, z(o).props.opacity ?? 1), J(oe, "title", ne), wi(se, (z(o).props.parallax ?? 0) > 0), U(ce, ` ${ae ?? ""}`);
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
				]), B("change", l, (e) => Ki(t(), s, e)), B("click", g, () => xi(t(), s, z(o).props.size ?? 1, -.05)), B("change", _, (e) => Si(t(), s, e.target.value)), B("click", v, () => xi(t(), s, z(o).props.size ?? 1, .05)), B("input", te, (e) => gi(t(), s, "blur", Number(e.target.value))), B("input", C, (e) => gi(t(), s, "opacity", Number(e.target.value))), B("change", se, (e) => gi(t(), s, "parallax", e.target.checked ? .3 : 0)), H(e, r);
			}, S = (e) => {
				let i = /* @__PURE__ */ k(() => jl(z(o))), a = /* @__PURE__ */ k(() => z(i).style ?? "floating"), c = /* @__PURE__ */ k(() => gl(z(a), z(i).motion)), l = /* @__PURE__ */ k(() => (z(i).seed ?? 0) > 0);
				var u = ym(), d = P(u);
				r(d, t, () => s, () => z(o));
				var f = I(d, 2);
				n(f, t, () => s, () => z(o));
				var p = I(f, 2), m = N(p), h = I(m);
				{
					let e = /* @__PURE__ */ k(() => Gc.map((e) => [e, Y(`opt.galleryStyle.${e}`)]));
					X(h, {
						get value() {
							return z(a);
						},
						get options() {
							return z(e);
						},
						onchange: (e) => gi(t(), s, "style", e)
					});
				}
				E(p);
				var g = I(p, 2), _ = (e) => {
					var n = lm(), r = P(n), a = N(r), o = I(a);
					{
						let e = /* @__PURE__ */ k(() => z(i).fit ?? "cover"), n = /* @__PURE__ */ k(() => [["cover", Y("opt.fit.cover")], ["contain", Y("opt.fit.contain")]]);
						X(o, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => gi(t(), s, "fit", e)
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
					K(y), L((e, t, n, r, o) => {
						U(a, `${e ?? ""} `), U(l, `${t ?? ""} `), U(u, `${z(i).interval ?? 12 ?? ""} s`), q(d, z(i).interval ?? 12), U(p, `${n ?? ""} `), U(m, `${r ?? ""} s`), q(h, z(i).fade ?? 1.5), U(_, `${o ?? ""} `), U(v, `${z(i).blur ?? 0 ?? ""} px`), q(y, z(i).blur ?? 0);
					}, [
						() => Y("lbl.fit"),
						() => Y("lbl.secondsPerImage"),
						() => Y("lbl.transition"),
						() => (z(i).fade ?? 1.5).toFixed(1),
						() => Y("lbl.blur")
					]), B("input", d, (e) => gi(t(), s, "interval", Number(e.target.value))), B("input", h, (e) => gi(t(), s, "fade", Number(e.target.value))), B("input", y, (e) => gi(t(), s, "blur", Number(e.target.value))), H(e, n);
				}, v = (e) => {
					var n = gm(), r = P(n), o = (e) => {
						var n = um(), r = P(n), a = N(r), o = I(a);
						{
							let e = /* @__PURE__ */ k(() => String(z(i).rows ?? 2));
							X(o, {
								get value() {
									return z(e);
								},
								options: [["1", "1"], ["2", "2"]],
								onchange: (e) => gi(t(), s, "rows", Number(e))
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
								onchange: (e) => gi(t(), s, "direction", e)
							});
						}
						E(c), L((e, t) => {
							U(a, `${e ?? ""} `), U(l, `${t ?? ""} `);
						}, [() => Y("lbl.galleryRows"), () => Y("lbl.photoDirection")]), H(e, n);
					}, c = (e) => {
						var n = fm(), r = P(n), o = N(r), c = I(o);
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
								onchange: (e) => gi(t(), s, "repeat", e === "repeat")
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
								onchange: (e) => gi(t(), s, "seed", e === "fixed" ? ea() : 0)
							});
						}
						E(p);
						var g = I(p, 2), _ = (e) => {
							var n = dm(), r = N(n);
							G(r, () => C.shuffle);
							var i = I(r);
							E(n), L((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`);
							}, [() => Y("tip.bg.photoSeed"), () => Y("ui.shufflePhotos")]), B("click", n, () => gi(t(), s, "seed", ea())), H(e, n);
						};
						W(g, (e) => {
							z(l) && e(_);
						}), L((e, t, n, s, l, f) => {
							J(r, "title", e), U(o, `${t ?? ""} `), J(c, "min", z(a) === "mosaic" ? 4 : 1), q(c, z(i).count ?? (z(a) === "mosaic" ? 12 : 8)), J(u, "title", n), U(d, `${s ?? ""} `), J(p, "title", l), U(m, `${f ?? ""} `);
						}, [
							() => Y("tip.bg.photoCount"),
							() => Y("lbl.photoCount"),
							() => Y("tip.bg.galleryRepeat"),
							() => Y("lbl.galleryRepeat"),
							() => Y("tip.bg.galleryPlace"),
							() => Y("lbl.galleryPlace")
						]), B("change", c, (e) => gi(t(), s, "count", Number(e.target.value))), H(e, n);
					};
					W(r, (e) => {
						z(a) === "band" ? e(o) : e(c, -1);
					});
					var u = I(r, 2), d = N(u), f = F(I(d));
					E(u);
					var p = I(u, 2);
					K(p);
					var m = I(p, 2), h = (e) => {
						var n = pm(), r = P(n), a = N(r), o = F(I(a));
						E(r);
						var c = I(r, 2);
						K(c);
						var l = I(c, 2), u = N(l), d = F(I(u));
						E(l);
						var f = I(l, 2);
						K(f), L((e, t, n, s) => {
							J(r, "title", e), U(a, `${t ?? ""} `), U(o, `${n ?? ""}%`), q(c, z(i).spread ?? .85), U(u, `${s ?? ""} `), U(d, `${z(i).tilt ?? 5 ?? ""}°`), q(f, z(i).tilt ?? 5);
						}, [
							() => Y("tip.bg.photoSpread"),
							() => Y("lbl.photoSpread"),
							() => Math.round((z(i).spread ?? .85) * 100),
							() => Y("lbl.photoTilt")
						]), B("input", c, (e) => gi(t(), s, "spread", Number(e.target.value))), B("input", f, (e) => gi(t(), s, "tilt", Number(e.target.value))), H(e, n);
					};
					W(m, (e) => {
						z(a) === "floating" && e(h);
					});
					var g = I(m, 2), _ = N(g), v = I(_);
					{
						let e = /* @__PURE__ */ k(() => z(i).shape ?? "rect"), n = /* @__PURE__ */ k(() => Kc.map((e) => [e, Y(`opt.galleryShape.${e}`)]));
						X(v, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => gi(t(), s, "shape", e)
						});
					}
					E(g);
					var y = I(g, 2), b = N(y), x = I(b);
					{
						let e = /* @__PURE__ */ k(() => z(i).look ?? "shadow"), n = /* @__PURE__ */ k(() => qc.map((e) => [e, Y(`opt.galleryLook.${e}`)]));
						X(x, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => gi(t(), s, "look", e)
						});
					}
					E(y);
					var S = I(y, 2), ee = (e) => {
						var n = mm(), r = N(n), a = I(r);
						{
							let e = /* @__PURE__ */ k(() => Sl(z(i).look, z(i).frameColor)), n = /* @__PURE__ */ k(ga), r = /* @__PURE__ */ k(() => Y("tip.bg.frameColor"));
							Ta(a, {
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
								onchange: (e) => gi(t(), s, "frameColor", e ?? "")
							});
						}
						E(n), L((e) => U(r, `${e ?? ""} `), [() => Y("lbl.frameColor")]), H(e, n);
					}, te = /* @__PURE__ */ k(() => xl(z(i).look));
					W(S, (e) => {
						z(te) && e(ee);
					});
					var ne = I(S, 2), re = (e) => {
						var n = hm(), r = P(n), a = N(r), o = F(I(a));
						E(r);
						var c = I(r, 2);
						K(c), L((e) => {
							U(a, `${e ?? ""} `), U(o, `${z(i).radius ?? 5 ?? ""} px`), q(c, z(i).radius ?? 5);
						}, [() => Y("lbl.rounding")]), B("input", c, (e) => gi(t(), s, "radius", Number(e.target.value))), H(e, n);
					}, ie = /* @__PURE__ */ k(() => Dl(z(i).shape) && (z(i).look ?? "shadow") !== "polaroid");
					W(ne, (e) => {
						z(ie) && e(re);
					}), L((e, t, n, r, i, a, o) => {
						U(d, `${e ?? ""} `), U(f, `${t ?? ""} px`), q(p, n), J(g, "title", r), U(_, `${i ?? ""} `), J(y, "title", a), U(b, `${o ?? ""} `);
					}, [
						() => Y("lbl.size"),
						() => bl(z(i).size, z(a)),
						() => bl(z(i).size, z(a)),
						() => Y("tip.bg.galleryShape"),
						() => Y("lbl.galleryShape"),
						() => Y("tip.bg.galleryLook"),
						() => Y("lbl.galleryLook")
					]), B("input", p, (e) => gi(t(), s, "size", Number(e.target.value))), H(e, n);
				};
				W(g, (e) => {
					z(a) === "fill" ? e(_) : e(v, -1);
				});
				var y = I(g, 2), b = N(y), x = I(b);
				{
					let e = /* @__PURE__ */ k(() => z(i).tone ?? "natural"), n = /* @__PURE__ */ k(() => Jc.map((e) => [e, Y(`opt.galleryTone.${e}`)]));
					X(x, {
						get value() {
							return z(e);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => gi(t(), s, "tone", e)
					});
				}
				E(y);
				var S = I(y, 2), ee = (e) => {
					var n = mm(), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ k(() => _l(z(a)).map((e) => [e, Y(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
						X(i, {
							get value() {
								return z(c);
							},
							get options() {
								return z(e);
							},
							onchange: (e) => gi(t(), s, "motion", e)
						});
					}
					E(n), L((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.bg.photoMotion"), () => Y("lbl.motion")]), H(e, n);
				}, te = /* @__PURE__ */ k(() => _l(z(a)).length > 1);
				W(S, (e) => {
					z(te) && e(ee);
				});
				var ne = I(S, 2), re = (e) => {
					var n = _m(), r = P(n), a = N(r), o = F(I(a));
					E(r);
					var c = I(r, 2);
					K(c), L((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(i).interval ?? 12 ?? ""} s`), q(c, z(i).interval ?? 12);
					}, [() => Y("lbl.secondsPerImage")]), B("input", c, (e) => gi(t(), s, "interval", Number(e.target.value))), H(e, n);
				}, ie = (e) => {
					var n = _m(), r = P(n), a = N(r), o = F(I(a));
					E(r);
					var c = I(r, 2);
					K(c), L((e) => {
						U(a, `${e ?? ""} `), U(o, `${z(i).motionSpeed ?? 30 ?? ""} s`), q(c, z(i).motionSpeed ?? 30);
					}, [() => Y("lbl.motionSpeed")]), B("input", c, (e) => gi(t(), s, "motionSpeed", Number(e.target.value))), H(e, n);
				};
				W(ne, (e) => {
					z(c) === "crossfade" && z(a) !== "fill" ? e(re) : (z(c) !== "none" || z(a) === "band") && e(ie, 1);
				});
				var ae = I(ne, 2), oe = N(ae);
				K(oe);
				var se = I(oe);
				E(ae);
				var ce = I(ae, 2), le = (e) => {
					var n = vm();
					let r;
					var a = N(n);
					K(a);
					var o = I(a);
					E(n), L((e, t) => {
						r = _i(n, 1, "gridmenu-snap svelte-1n46o8q", null, r, { muted: z(i).underNav === !1 }), J(n, "title", e), wi(a, z(i).underAnnounce === !0), a.disabled = z(i).underNav === !1, U(o, ` ${t ?? ""}`);
					}, [() => Y("tip.bg.underAnnounce"), () => Y("lbl.underAnnounce")]), B("change", a, (e) => e.target.checked ? hi(t(), s, {
						underAnnounce: !0,
						underNav: !0
					}) : gi(t(), s, "underAnnounce", !1)), H(e, n);
				};
				W(ce, (e) => {
					z(O).nav?.announcement?.text && e(le);
				});
				var ue = I(ce, 2), w = N(ue), de = F(I(w));
				E(ue);
				var fe = I(ue, 2);
				K(fe), L((e, t, n, r, a, o, s, c) => {
					J(p, "title", e), U(m, `${t ?? ""} `), J(y, "title", n), U(b, `${r ?? ""} `), J(ae, "title", a), wi(oe, z(i).underNav !== !1), U(se, ` ${o ?? ""}`), U(w, `${s ?? ""} `), U(de, `${c ?? ""}%`), q(fe, z(i).opacity ?? .85);
				}, [
					() => Y("tip.bg.galleryStyle"),
					() => Y("lbl.galleryStyle"),
					() => Y("tip.bg.galleryTone"),
					() => Y("lbl.galleryTone"),
					() => Y("tip.bg.underNav"),
					() => Y("lbl.underNav"),
					() => Y("lbl.strength"),
					() => Math.round((z(i).opacity ?? .85) * 100)
				]), B("change", oe, (e) => e.target.checked ? gi(t(), s, "underNav", !0) : hi(t(), s, {
					underNav: !1,
					underAnnounce: !1
				})), B("input", fe, (e) => gi(t(), s, "opacity", Number(e.target.value))), H(e, u);
			}, ee = (e) => {
				var n = xm(), r = P(n), i = N(r), a = I(i);
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
						onchange: (e) => gi(t(), s, "fit", e)
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
				var re = I(ne, 2), ie = N(re);
				K(ie);
				var C = I(ie);
				E(re);
				var ae = I(re, 2), oe = (e) => {
					var n = bm(), r = P(n), i = N(r), a = F(I(i));
					E(r);
					var c = I(r, 2);
					K(c), L((e, t) => {
						U(i, `${e ?? ""} `), U(a, `${t ?? ""}%`), q(c, z(o).props.parallax ?? .3);
					}, [() => Y("lbl.parallaxStrength"), () => Math.round((z(o).props.parallax ?? 0) * 100)]), B("input", c, (e) => gi(t(), s, "parallax", Number(e.target.value))), H(e, n);
				};
				W(ae, (e) => {
					(z(o).props.parallax ?? 0) > 0 && e(oe);
				}), L((e, t, n, a, s, u, p, m, v, S, ae, oe, se, ce) => {
					J(r, "title", e), U(i, `${t ?? ""} `), J(c, "title", n), U(l, `${a ?? ""} `), J(d, "title", s), U(f, `${u ?? ""} `), U(h, `${p ?? ""} `), U(g, `${m ?? ""}%`), q(_, z(o).props.x ?? .5), U(y, `${v ?? ""} `), U(b, `${S ?? ""}%`), q(x, z(o).props.y ?? .5), U(ee, `${ae ?? ""} `), U(te, `${oe ?? ""}%`), q(ne, z(o).props.opacity ?? 1), J(re, "title", se), wi(ie, (z(o).props.parallax ?? 0) > 0), U(C, ` ${ce ?? ""}`);
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
				]), B("change", a, (e) => qi(t(), s, e)), B("change", u, (e) => Zi(t(), s, e)), B("input", _, (e) => gi(t(), s, "x", Number(e.target.value))), B("input", x, (e) => gi(t(), s, "y", Number(e.target.value))), B("input", ne, (e) => gi(t(), s, "opacity", Number(e.target.value))), B("change", ie, (e) => gi(t(), s, "parallax", e.target.checked ? .3 : 0)), H(e, n);
			};
			W(h, (e) => {
				z(o).type === "color" ? e(g) : z(o).type === "gradient" ? e(_, 1) : z(o).type === "glow" ? e(v, 2) : z(o).type === "grain" ? e(y, 3) : z(o).type === "pattern" ? e(b, 4) : z(o).type === "image" ? e(x, 5) : z(o).type === "slideshow" ? e(S, 6) : z(o).type === "video" && e(ee, 7);
			}), E(c), L((e, t, n) => {
				J(f, "title", e), J(p, "title", t), p.disabled = s === a().length - 1, J(m, "title", n);
			}, [
				() => Y("hint.bg.order"),
				() => Y("hint.bg.order"),
				() => Y("tip.bg.removeLayer")
			]), B("click", f, () => mi(t(), s, -1)), B("click", p, () => mi(t(), s, 1)), B("click", m, () => pi(t(), s)), H(e, c);
		});
		var c = I(s, 2), l = N(c), u = I(l);
		{
			let e = /* @__PURE__ */ k(() => re.map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label]));
			X(u, {
				get value() {
					return z(di);
				},
				get options() {
					return z(e);
				},
				onchange: (e) => j(di, e, !0)
			});
		}
		E(c);
		var d = I(c, 2), p = F(d, !0);
		L((e, t) => {
			U(l, `${e ?? ""} `), U(p, t);
		}, [() => Y("lbl.newLayer"), () => Y("ui.addLayer")]), B("click", d, () => fi(t(), z(di))), H(e, o);
	}, o = (e, t = f, n = f) => {
		var r = Pr();
		Yr(P(r), 17, n, Gr, (e, r, i) => {
			var a = Tm(), o = N(a);
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
					onchange: (e) => Wd(t(), i, e)
				});
			}
			E(d);
			var p = I(d, 2), m = (e) => {
				var n = wm();
				K(n), L((e, t) => {
					q(n, z(r).href ?? ""), J(n, "placeholder", e), J(n, "title", t);
				}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => Gd(t(), i, e.target.value)), H(e, n);
			};
			W(p, (e) => {
				z(r).page || e(m);
			}), E(a), L((e, t) => {
				q(o, z(r).label), J(o, "title", e), l.disabled = i === n().length - 1, J(u, "title", t);
			}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => Ud(t(), i, e.target.value)), B("click", c, () => Hd(t(), i, -1)), B("click", l, () => Hd(t(), i, 1)), B("click", u, () => Vd(t(), i)), H(e, a);
		}), H(e, r);
	}, s = (e) => {
		let t = /* @__PURE__ */ k(() => z(M).props.boxStyle ?? {});
		var n = Dm(), r = P(n), i = N(r), a = I(i);
		{
			let e = /* @__PURE__ */ k(() => z(t).bg ?? ""), n = /* @__PURE__ */ k(ga), r = /* @__PURE__ */ k(() => Y("tip.box.bg"));
			Ta(a, {
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
				onchange: (e) => nr({ bg: e || null })
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
				onchange: (e) => nr({ shadow: e || null })
			});
		}
		E(o);
		var l = I(o, 2), u = (e) => {
			var n = mm(), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ k(() => z(t).shadowColor ?? ""), n = /* @__PURE__ */ k(ga), r = /* @__PURE__ */ k(() => Y("tip.box.shadowColor"));
				Ta(i, {
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
					onchange: (e) => nr({ shadowColor: e || null })
				});
			}
			E(n), L((e) => U(r, `${e ?? ""} `), [() => Y("lbl.shadowColor")]), H(e, n);
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
				onchange: (e) => nr({ border: e === "custom" ? {
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
			var r = Em(), i = P(r), a = N(i), o = I(a);
			{
				let e = /* @__PURE__ */ k(ga), t = /* @__PURE__ */ k(() => Y("tip.box.borderColor"));
				Ta(o, {
					get value() {
						return z(n).color;
					},
					get tokens() {
						return z(e);
					},
					get label() {
						return z(t);
					},
					onchange: (e) => nr({ border: {
						...z(n),
						color: e
					} })
				});
			}
			E(i);
			var s = I(i, 2), c = N(s), l = I(c), u = N(l), d = I(u, 2);
			K(d);
			var f = I(d, 2);
			E(l), E(s), L((e, t, r, i, o, s) => {
				U(a, `${e ?? ""} `), U(c, `${t ?? ""} `), J(u, "title", r), J(u, "aria-label", i), q(d, z(n).width), J(f, "title", o), J(f, "aria-label", s);
			}, [
				() => Y("lbl.borderColor"),
				() => Y("lbl.thicknessPx"),
				() => Y("tip.thinner"),
				() => Y("tip.thinner"),
				() => Y("tip.thicker"),
				() => Y("tip.thicker")
			]), B("click", u, () => nr({ border: {
				...z(n),
				width: Math.max(1, z(n).width - 1)
			} })), B("change", d, (e) => nr({ border: {
				...z(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), B("click", f, () => nr({ border: {
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
		E(g), L((e, t, n, r, a, o) => {
			U(i, `${e ?? ""} `), U(s, `${t ?? ""} `), U(f, `${n ?? ""} `), J(g, "title", r), wi(_, a), U(v, ` ${o ?? ""}`);
		}, [
			() => Y("lbl.blockColor"),
			() => Y("lbl.shadow"),
			() => Y("lbl.border"),
			() => Y("tip.box.glass"),
			() => !!z(t).glass,
			() => Y("lbl.glass")
		]), B("change", _, (e) => nr({ glass: e.target.checked || null })), H(e, n);
	}, c = (e, t = f, n = f, r = f, i = f, a) => {
		let o = /* @__PURE__ */ bt(() => h(a?.(), null));
		var s = Am(), c = N(s), l = N(c), u = (e) => {
			H(e, Om());
		};
		W(l, (e) => {
			z(o) && e(u);
		});
		var d = I(l), p = F(d, !0), m = F(I(d), !0);
		E(c);
		var g = I(c, 2), _ = N(g);
		ti(_, i);
		var v = I(_, 2), y = (e) => {
			var t = km(), n = F(t, !0);
			L((e) => U(n, e), [() => Y("menu.reset")]), B("click", t, function(...e) {
				z(o)?.apply(this, e);
			}), H(e, t);
		};
		W(v, (e) => {
			z(o) && e(y);
		}), E(g), E(s), L((e) => {
			s.open = e, U(p, n()), U(m, r());
		}, [() => pn.has(t())]), wr("toggle", s, (e) => {
			e.currentTarget.open ? pn.add(t()) : pn.delete(t());
		}), H(e, s);
	}, l = (e, t = f) => {
		let n = (e) => {
			var t = Pr(), n = P(t), r = (e) => {
				var t = jm(), n = F(t, !0);
				L((e) => U(n, e), [() => Y("hint.textInline")]), H(e, t);
			}, i = (e) => {
				var t = Im(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.mode ?? "mailto"), t = /* @__PURE__ */ k(() => [["mailto", Y("form.modeMailto")], ["endpoint", Y("form.modeEndpoint")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("mode", e)
					});
				}
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = Mm(), n = N(t), r = I(n);
					K(r), E(t), L((e, i, a) => {
						J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).props.endpoint ?? ""), J(r, "placeholder", a);
					}, [
						() => Y("form.endpointNote"),
						() => Y("form.endpoint"),
						() => Y("form.endpointPh")
					]), B("change", r, (e) => R("endpoint", e.target.value.trim())), H(e, t);
				}, s = (e) => {
					var t = Nm(), n = P(t), r = N(n), i = I(r);
					K(i), E(n);
					var a = I(n, 2), o = N(a), s = I(o);
					K(s), E(a), L((e, t, n, a) => {
						U(r, `${e ?? ""} `), q(i, z(M).props.recipient ?? ""), J(i, "placeholder", t), U(o, `${n ?? ""} `), q(s, z(M).props.subject ?? ""), J(s, "placeholder", a);
					}, [
						() => Y("form.recipient"),
						() => Y("form.recipientPh"),
						() => Y("form.subject"),
						() => Y("form.subjectPh")
					]), B("change", i, (e) => R("recipient", e.target.value.trim())), B("change", s, (e) => R("subject", e.target.value.trim())), H(e, t);
				};
				W(a, (e) => {
					(z(M).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var c = I(a, 2), l = F(c, !0), u = I(c, 2);
				Yr(u, 19, () => z(M).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = Fm(), i = P(r), a = N(i);
					K(a);
					var o = I(a, 2);
					{
						let e = /* @__PURE__ */ k(() => z(t).type ?? "text"), r = /* @__PURE__ */ k(() => rr.map((e) => [e, Y(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						X(o, {
							get value() {
								return z(e);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => or(z(n), { type: e })
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
						var r = Pm();
						K(r), L((e, t) => {
							q(r, e), J(r, "placeholder", t);
						}, [() => (z(t).options ?? []).join(", "), () => Y("form.optionsPh")]), B("change", r, (e) => sr(z(n), e.target.value)), H(e, r);
					}, g = /* @__PURE__ */ k(() => ir.has(z(t).type));
					W(m, (e) => {
						z(g) && e(h);
					}), L((e, r, i) => {
						q(a, z(t).label), J(a, "placeholder", e), c.disabled = z(n) === 0, l.disabled = z(n) === (z(M).props.fields?.length ?? 0) - 1, J(u, "title", r), wi(f, z(t).required === !0), U(p, ` ${i ?? ""}`);
					}, [
						() => Y("form.fieldNamePh"),
						() => Y("form.removeField"),
						() => Y("form.required")
					]), B("change", a, (e) => or(z(n), { label: e.target.value.trim() || Y("form.fieldFallback") })), B("click", c, () => ur(z(n), -1)), B("click", l, () => ur(z(n), 1)), B("click", u, () => lr(z(n))), B("change", f, (e) => or(z(n), { required: e.target.checked })), H(e, r);
				});
				var d = I(u, 2), f = F(d, !0), p = I(d, 2), m = N(p), h = I(m);
				K(h), E(p);
				var g = I(p, 2), _ = N(g), v = I(_);
				K(v), E(g), L((e, t, i, a, o, s, c, u) => {
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
				]), B("click", d, cr), B("change", h, (e) => R("submitLabel", e.target.value.trim() || Y("form.sendDefault"))), B("change", v, (e) => R("successText", e.target.value.trim() || Y("form.thanksDefault"))), H(e, t);
			}, a = (e) => {
				let t = (e) => {
					var t = Vm(), n = P(t);
					Yr(n, 17, () => z(M).props.sources ?? [], Gr, (e, t, n) => {
						let r = /* @__PURE__ */ k(() => dr(z(t)));
						var i = Lm(), a = N(i), o = N(a);
						K(o);
						var s = I(o, 2);
						G(s, () => C.cross, !0), E(s), E(a);
						var c = I(a, 2), l = N(c);
						K(l);
						var u = I(l, 2);
						{
							let e = /* @__PURE__ */ k(() => z(r).color || "accent"), t = /* @__PURE__ */ k(ga), i = /* @__PURE__ */ k(() => Y("tip.calendar.sourceColor"));
							Ta(u, {
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
								onchange: (e) => mr(n, { color: e ?? "" })
							});
						}
						E(c), E(i), L((e, t, n, i, a) => {
							q(o, z(r).url), J(o, "placeholder", e), J(o, "title", t), J(s, "title", n), q(l, z(r).name), J(l, "placeholder", i), J(l, "title", a);
						}, [
							() => Y("calendar.sourcesPh"),
							() => Y("calendar.sourceUrl"),
							() => Y("ui.remove"),
							() => Y("calendar.sourceName"),
							() => Y("tip.calendar.sourceName")
						]), B("change", o, (e) => mr(n, { url: e.target.value.trim() })), B("click", s, () => gr(n)), B("change", l, (e) => mr(n, { name: e.target.value.trim() })), H(e, i);
					});
					var r = I(n, 2), i = N(r);
					G(i, () => C.plus);
					var a = I(i);
					E(r);
					var o = I(r, 2), s = N(o);
					G(s, () => C.plus);
					var c = I(s);
					E(o);
					var l = I(o, 2), u = (e) => {
						let t = /* @__PURE__ */ k(() => z(_r).filter((e) => !(z(M).props.sources ?? []).some((t) => dr(t).url === e)));
						var n = Bm(), r = P(n);
						Yr(r, 16, () => z(t), (e) => e, (e, t) => {
							var n = Rm(), r = F(n, !0);
							L(() => {
								J(n, "title", t), U(r, t);
							}), B("click", n, () => yr(t)), H(e, n);
						});
						var i = I(r, 2), a = (e) => {
							var t = zm(), n = F(t, !0);
							L((e) => U(n, e), [() => Y("calendar.siteSourcesNone")]), H(e, t);
						};
						W(i, (e) => {
							z(t).length || e(a);
						}), H(e, n);
					};
					W(l, (e) => {
						z(_r) && e(u);
					}), L((e, t, n) => {
						U(a, ` ${e ?? ""}`), J(o, "title", t), U(c, ` ${n ?? ""}`);
					}, [
						() => Y("ui.addCalendar"),
						() => Y("tip.calendar.siteSources"),
						() => Y("calendar.siteSources")
					]), B("click", r, hr), B("click", o, vr), H(e, t);
				}, n = (e) => {
					var t = Gm(), n = P(t), r = (e) => {
						var t = mm(), n = N(t), r = I(n);
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
								onchange: (e) => R("view", e)
							});
						}
						E(t), L((e) => U(n, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
					}, i = /* @__PURE__ */ k(() => !_p(z(M).props.design).view);
					W(n, (e) => {
						z(i) && e(r);
					});
					var a = I(n, 2), o = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(M).props.switcher === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.calendar.switcher"), () => Y("calendar.switcher")]), B("change", n, (e) => R("switcher", e.target.checked || void 0)), H(e, t);
					}, s = /* @__PURE__ */ k(() => yp.includes(vp(z(M).props)));
					W(a, (e) => {
						z(s) && e(o);
					});
					var c = I(a, 2), l = (e) => {
						var t = Um(), n = P(t), r = N(n), i = I(r);
						K(i), E(n);
						var a = I(n, 2), o = (e) => {
							var t = Hm(), n = N(t);
							K(n);
							var r = I(n);
							E(t), L((e, i) => {
								J(t, "title", e), wi(n, z(M).props.showMore !== !1), U(r, ` ${i ?? ""}`);
							}, [() => Y("tip.calendar.showMore"), () => Y("calendar.showMore")]), B("change", n, (e) => R("showMore", e.target.checked ? void 0 : !1)), H(e, t);
						}, s = /* @__PURE__ */ k(() => vp(z(M).props) === "list" && _p(z(M).props.design).module !== "more");
						W(a, (e) => {
							z(s) && e(o);
						}), L((e, t) => {
							J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(M).props.limit ?? 6);
						}, [() => Y("tip.collection.limit"), () => Y("lbl.maxCount")]), B("change", i, (e) => R("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), H(e, t);
					}, u = /* @__PURE__ */ k(() => [
						"list",
						"cards",
						"agenda"
					].includes(z(M).props.view ?? "list"));
					W(c, (e) => {
						z(u) && e(l);
					});
					var d = I(c, 2), f = N(d);
					K(f);
					var p = I(f);
					E(d);
					var m = I(d, 2), h = N(m);
					K(h);
					var g = I(h);
					E(m);
					var _ = I(m, 2);
					{
						let e = /* @__PURE__ */ k(() => Y("calendar.clock")), t = /* @__PURE__ */ k(() => Y("tip.calendar.clock")), n = /* @__PURE__ */ k(() => z(M).props.clock === "12" ? "12" : "24"), r = /* @__PURE__ */ k(() => [["24", Y("calendar.clock.24")], ["12", Y("calendar.clock.12")]]);
						Ps(_, {
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
							onchange: (e) => R("clock", e === "12" ? "12" : void 0)
						});
					}
					var v = I(_, 2), y = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("calendar.weekStart")), n = /* @__PURE__ */ k(() => Y("tip.calendar.weekStart")), r = /* @__PURE__ */ k(() => ["mon", "sun"].includes(z(M).props.weekStart) ? z(M).props.weekStart : "auto"), i = /* @__PURE__ */ k(() => [
								["auto", Y("calendar.weekStart.auto")],
								["mon", Y("calendar.weekStart.mon")],
								["sun", Y("calendar.weekStart.sun")]
							]);
							Ps(e, {
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
								onchange: (e) => R("weekStart", e === "auto" ? void 0 : e)
							});
						}
					}, b = /* @__PURE__ */ k(() => [
						"month",
						"week",
						"year",
						"agenda"
					].includes(vp(z(M).props)) || z(M).props.design === "bento" || z(M).props.switcher === !0);
					W(v, (e) => {
						z(b) && e(y);
					});
					var x = I(v, 2), S = (e) => {
						var t = Wm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("calendar.nextCount")), t = /* @__PURE__ */ k(() => Y("tip.calendar.nextCount")), r = /* @__PURE__ */ k(() => String(Math.min(3, Math.max(1, Number(z(M).props.nextCount) || 1))));
							Ps(n, {
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
								onchange: (e) => R("nextCount", Number(e))
							});
						}
						var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2);
						K(o);
						var s = F(I(o, 2), !0);
						E(r), L((e, t) => {
							J(r, "title", e), U(a, t), q(o, z(M).props.laterCount ?? 0), U(s, z(M).props.laterCount ?? 0);
						}, [() => Y("tip.calendar.laterCount"), () => Y("calendar.laterCount")]), B("input", o, (e) => R("laterCount", e.target.valueAsNumber)), H(e, t);
					};
					W(x, (e) => {
						z(M).props.view === "next" && e(S);
					}), L((e, t, n, r) => {
						J(d, "title", e), wi(f, z(M).props.showCancelled !== !1), U(p, ` ${t ?? ""}`), J(m, "title", n), wi(h, z(M).props.structuredData !== !1), U(g, ` ${r ?? ""}`);
					}, [
						() => Y("tip.calendar.showCancelled"),
						() => Y("calendar.showCancelled"),
						() => Y("tip.calendar.structuredData"),
						() => Y("calendar.structuredData")
					]), B("change", f, (e) => R("showCancelled", e.target.checked ? void 0 : !1)), B("change", h, (e) => R("structuredData", e.target.checked ? void 0 : !1)), H(e, t);
				}, r = (e) => {
					var t = qm(), n = P(t), r = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e) => {
							wi(n, z(M).props.showCategories !== !1), U(r, ` ${e ?? ""}`);
						}, [() => Y("calendar.showCategories")]), B("change", n, (e) => R("showCategories", e.target.checked)), H(e, t);
					}, i = /* @__PURE__ */ k(() => !_p(z(M).props.design).ownFilter);
					W(n, (e) => {
						z(i) && e(r);
					});
					var a = I(n, 2), o = N(a);
					K(o);
					var s = I(o);
					E(a);
					var c = I(a, 2), l = N(c);
					K(l);
					var u = I(l);
					E(c);
					var d = I(c, 2), f = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(M).props.showEarlier === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.calendar.showEarlier"), () => Y("calendar.showEarlier")]), B("change", n, (e) => R("showEarlier", e.target.checked ? !0 : void 0)), H(e, t);
					}, p = /* @__PURE__ */ k(() => ![
						"month",
						"week",
						"day",
						"year"
					].includes(vp(z(M).props)));
					W(d, (e) => {
						z(p) && e(f);
					});
					var m = I(d, 2), h = N(m);
					K(h);
					var g = I(h);
					E(m);
					var _ = I(m, 2), v = N(_);
					K(v);
					var y = I(v);
					E(_);
					var b = I(_, 2), x = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(M).props.showOpen !== !1), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.calendar.showOpen"), () => Y("calendar.showOpen")]), B("change", n, (e) => R("showOpen", e.target.checked ? void 0 : !1)), H(e, t);
					}, S = /* @__PURE__ */ k(() => _p(z(M).props.design).open);
					W(b, (e) => {
						z(S) && e(x);
					});
					var ee = I(b, 2), te = (e) => {
						var t = Km(), n = N(t), r = I(n);
						K(r), E(t), L((e, i) => {
							J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).props.programHref ?? "");
						}, [() => Y("tip.calendar.programHref"), () => Y("calendar.programHref")]), B("change", r, (e) => R("programHref", e.target.value.trim() || void 0)), H(e, t);
					}, ne = /* @__PURE__ */ k(() => _p(z(M).props.design).program);
					W(ee, (e) => {
						z(ne) && e(te);
					}), L((e, t, n, r, i, d) => {
						J(a, "title", e), wi(o, z(M).props.showPlaces === !0), U(s, ` ${t ?? ""}`), J(c, "title", n), wi(l, z(M).props.showSearch === !0), U(u, ` ${r ?? ""}`), wi(h, z(M).props.showSubscribe !== !1), U(g, ` ${i ?? ""}`), wi(v, z(M).props.showSignup === !0), U(y, ` ${d ?? ""}`);
					}, [
						() => Y("tip.calendar.showPlaces"),
						() => Y("calendar.showPlaces"),
						() => Y("tip.calendar.showSearch"),
						() => Y("calendar.showSearch"),
						() => Y("calendar.showSubscribe"),
						() => Y("calendar.showSignup")
					]), B("change", o, (e) => R("showPlaces", e.target.checked ? !0 : void 0)), B("change", l, (e) => R("showSearch", e.target.checked ? !0 : void 0)), B("change", h, (e) => R("showSubscribe", e.target.checked)), B("change", v, (e) => R("showSignup", e.target.checked)), H(e, t);
				}, i = (e) => {
					var t = Jm(), n = P(t), r = N(n), i = I(r);
					K(i), E(n);
					var a = I(n, 2), o = N(a), s = I(o);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.emptyIcon === "none" ? "" : z(M).props.emptyIcon ?? "calendar"), t = /* @__PURE__ */ k(() => Y("tip.calendar.emptyIcon"));
						Ro(s, {
							iconsOnly: !0,
							get icon() {
								return z(e);
							},
							klass: "lbtn-mark",
							get label() {
								return z(t);
							},
							onpick: (e) => R("emptyIcon", e.icon || "none"),
							children: (e, t) => {
								var n = Pr(), r = P(n), i = (e) => {
									var t = Pr();
									G(P(t), () => lo(z(M).props.emptyIcon ?? "calendar") || lo("calendar")), H(e, t);
								};
								W(r, (e) => {
									z(M).props.emptyIcon !== "none" && e(i);
								}), H(e, n);
							},
							$$slots: { default: !0 }
						});
					}
					E(a), L((e, t, s, c, l) => {
						J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(M).props.emptyText ?? ""), J(i, "placeholder", s), J(a, "title", c), U(o, `${l ?? ""} `);
					}, [
						() => Y("tip.calendar.emptyText"),
						() => Y("calendar.emptyText"),
						() => Y("calendar.emptyPh"),
						() => Y("tip.calendar.emptyIcon"),
						() => Y("calendar.emptyIcon")
					]), B("change", i, (e) => R("emptyText", e.target.value.trim() || void 0)), H(e, t);
				}, a = (e) => {
					var t = Pr(), n = P(t), r = (e) => {
						var t = Xm(), n = P(t), r = N(n);
						K(r);
						var i = I(r);
						E(n);
						var a = I(n, 2), o = (e) => {
							var t = Ym(), n = P(t), r = (e) => {
								{
									let t = /* @__PURE__ */ k(() => Y("calendar.noticeAs")), n = /* @__PURE__ */ k(() => Y("tip.calendar.noticeAs")), r = /* @__PURE__ */ k(() => z(M).props.notice?.as === "band" ? "band" : "note"), i = /* @__PURE__ */ k(() => [["note", Y("calendar.noticeAsNote")], ["band", Y("calendar.noticeAsBand")]]);
									Ps(e, {
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
										onchange: (e) => R("notice", {
											...z(M).props.notice ?? {},
											as: e === "band" ? "band" : void 0
										})
									});
								}
							}, i = /* @__PURE__ */ k(() => _p(z(M).props.design).noticeBand);
							W(n, (e) => {
								z(i) && e(r);
							});
							var a = I(n, 2), o = N(a), s = I(o);
							K(s), E(a), L((e, t) => {
								J(a, "title", e), U(o, `${t ?? ""} `), q(s, z(M).props.notice?.href ?? "");
							}, [() => Y("tip.calendar.noticeHref"), () => Y("calendar.noticeHref")]), B("change", s, (e) => R("notice", {
								...z(M).props.notice ?? {},
								href: e.target.value.trim() || void 0
							})), H(e, t);
						};
						W(a, (e) => {
							z(M).props.notice?.show === !0 && e(o);
						}), L((e, t) => {
							J(n, "title", e), wi(r, z(M).props.notice?.show === !0), U(i, ` ${t ?? ""}`);
						}, [() => Y("tip.calendar.showNotice"), () => Y("calendar.showNotice")]), B("change", r, (e) => R("notice", {
							...z(M).props.notice ?? {},
							show: e.target.checked
						})), H(e, t);
					}, i = /* @__PURE__ */ k(() => _p(z(M).props.design).notice);
					W(n, (e) => {
						z(i) && e(r);
					}), H(e, t);
				}, o = /* @__PURE__ */ k(yn);
				var s = Qm(), l = P(s);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.sources"));
					c(l, () => "cal-sources", () => z(e), () => z(o).sources, () => t);
				}
				var u = I(l, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.group.view"));
					c(u, () => "cal-view", () => z(e), () => z(o).view, () => n, () => z(o).viewReset);
				}
				var d = I(u, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.group.buttons"));
					c(d, () => "cal-buttons", () => z(e), () => z(o).buttons, () => r, () => z(o).buttonsReset);
				}
				var f = I(d, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.group.empty"));
					c(f, () => "cal-empty", () => z(e), () => z(o).empty, () => i, () => z(o).emptyReset);
				}
				var p = I(f, 2), m = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("calendar.group.notice"));
						c(e, () => "cal-notice", () => z(t), () => z(o).notice, () => a, () => z(o).noticeReset);
					}
				}, h = /* @__PURE__ */ k(() => _p(z(M).props.design).notice);
				W(p, (e) => {
					z(h) && e(m);
				});
				var g = I(p, 2), _ = (e) => {
					var t = Zm(), n = F(t, !0);
					L((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.calendar.resetTexts"), () => Y("calendar.resetTexts")]), B("click", t, () => R("texts", void 0)), H(e, t);
				}, v = /* @__PURE__ */ k(() => Dp(_p(z(M).props.design), z(M).props.texts));
				W(g, (e) => {
					z(v) && e(_);
				}), H(e, s);
			}, o = (e) => {
				var t = eh(), n = P(t), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var a = I(n, 2), o = F(a, !0), s = I(a, 2);
				Yr(s, 17, () => z(M).props.items ?? [], Gr, (e, t, n) => {
					var r = $m(), i = N(r);
					K(i);
					var a = I(i, 2), o = N(a);
					o.disabled = n === 0, G(o, () => C.up, !0), E(o);
					var s = I(o, 2);
					G(s, () => C.down, !0), E(s);
					var c = I(s, 2);
					G(c, () => C.cross, !0), E(c), E(a), E(r), L((e, r) => {
						q(i, z(t).q), J(i, "title", e), s.disabled = n === (z(M).props.items?.length ?? 0) - 1, J(c, "title", r);
					}, [() => Y("tip.faq.question"), () => Y("tip.faq.remove")]), B("change", i, (e) => br(n, { q: e.target.value })), B("click", o, () => Tr(n, -1)), B("click", s, () => Tr(n, 1)), B("click", c, () => Cr(n)), H(e, r);
				});
				var c = I(s, 2), l = F(c, !0);
				L((e, t, a, s, c) => {
					J(n, "title", e), wi(r, t), U(i, ` ${a ?? ""}`), U(o, s), U(l, c);
				}, [
					() => Y("tip.faq.multi"),
					() => !!z(M).props.multi,
					() => Y("lbl.faqMulti"),
					() => Y("lbl.questions"),
					() => Y("ui.addQuestion")
				]), B("change", r, (e) => R("multi", e.target.checked)), B("click", c, xr), H(e, t);
			}, s = (e) => {
				var t = nh(), n = P(t), r = F(n, !0), i = I(n, 2);
				Yr(i, 17, () => z(M).props.items ?? [], Gr, (e, t, n) => {
					var r = th(), i = P(r), a = N(i);
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
					K(d), L((e, r, i, s, c, f) => {
						q(a, z(t).year), J(a, "placeholder", e), J(a, "title", r), q(o, z(t).title), J(o, "title", i), l.disabled = n === (z(M).props.items?.length ?? 0) - 1, J(u, "title", s), q(d, z(t).text), J(d, "placeholder", c), J(d, "title", f);
					}, [
						() => Y("ph.tlYear"),
						() => Y("tip.timeline.year"),
						() => Y("tip.timeline.title"),
						() => Y("tip.timeline.remove"),
						() => Y("ph.tlText"),
						() => Y("tip.timeline.text")
					]), B("change", a, (e) => Ar(n, { year: e.target.value })), B("change", o, (e) => Ar(n, { title: e.target.value })), B("click", c, () => V(n, -1)), B("click", l, () => V(n, 1)), B("click", u, () => Mr(n)), B("change", d, (e) => Ar(n, { text: e.target.value })), H(e, r);
				});
				var a = I(i, 2), o = F(a, !0);
				L((e, t) => {
					U(r, e), U(o, t);
				}, [() => Y("lbl.timelineItems"), () => Y("ui.addTlItem")]), B("click", a, jr), H(e, t);
			}, l = (e) => {
				var t = rh(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				K(u), E(c), L((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.text ?? ""), U(o, `${t ?? ""} `), q(s, z(M).props.attribution ?? ""), U(l, `${n ?? ""} `), q(u, z(M).props.role ?? "");
				}, [
					() => Y("lbl.quoteText"),
					() => Y("lbl.quoteName"),
					() => Y("lbl.quoteRole")
				]), B("change", i, (e) => R("text", e.target.value)), B("change", s, (e) => R("attribution", e.target.value)), B("change", u, (e) => R("role", e.target.value)), H(e, t);
			}, u = (e) => {
				var t = ih(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				K(u), E(c);
				var d = I(c, 2), f = N(d), p = I(f);
				K(p), E(d), L((e, t, n, a, c) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.value ?? ""), J(i, "title", t), U(o, `${n ?? ""} `), q(s, z(M).props.prefix ?? ""), U(l, `${a ?? ""} `), q(u, z(M).props.suffix ?? ""), U(f, `${c ?? ""} `), q(p, z(M).props.label ?? "");
				}, [
					() => Y("lbl.statValue"),
					() => Y("tip.stat.value"),
					() => Y("lbl.statPrefix"),
					() => Y("lbl.statSuffix"),
					() => Y("lbl.statLabel")
				]), B("change", i, (e) => R("value", e.target.value)), B("change", s, (e) => R("prefix", e.target.value)), B("change", u, (e) => R("suffix", e.target.value)), B("change", p, (e) => R("label", e.target.value)), H(e, t);
			}, d = (e) => {
				var t = sh(), n = P(t), r = F(n, !0), i = I(n, 2);
				Yr(i, 17, () => z(M).props.items ?? [], Gr, (e, t, n) => {
					var r = $m(), i = N(r);
					K(i);
					var a = I(i, 2), o = N(a);
					o.disabled = n === 0, G(o, () => C.up, !0), E(o);
					var s = I(o, 2);
					G(s, () => C.down, !0), E(s);
					var c = I(s, 2);
					G(c, () => C.cross, !0), E(c), E(a), E(r), L((e, r, a, l) => {
						q(i, z(t)), J(i, "title", e), J(o, "title", r), J(s, "title", a), s.disabled = n === (z(M).props.items?.length ?? 0) - 1, J(c, "title", l);
					}, [
						() => Y("tip.ribbon.item"),
						() => Y("tip.moveUp"),
						() => Y("tip.moveDown"),
						() => Y("tip.ribbon.remove")
					]), B("change", i, (e) => Er(n, e.target.value)), B("click", o, () => kr(n, -1)), B("click", s, () => kr(n, 1)), B("click", c, () => Or(n)), H(e, r);
				});
				var a = I(i, 2), o = F(a, !0), s = I(a, 2), c = N(s), l = F(c, !0), u = I(c, 2);
				Yr(u, 21, () => z(ee), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => g(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = ah();
					let o;
					G(a, () => b[r()], !0), E(a), L(() => {
						o = _i(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(M).props.sep ?? "dot") === r() }), J(a, "aria-pressed", (z(M).props.sep ?? "dot") === r()), J(a, "title", i());
					}), B("click", a, () => R("sep", r())), H(e, a);
				}), E(u), E(s);
				var d = I(s, 2), f = (e) => {
					var t = oh(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i), E(t), L((e, n) => {
						J(t, "title", e), U(r, n), q(i, z(M).props.sepText ?? "");
					}, [() => Y("tip.ribbon.sepText"), () => Y("lbl.ribbonSepText")]), B("change", i, (e) => R("sepText", e.target.value)), H(e, t);
				};
				W(d, (e) => {
					z(M).props.sep === "custom" && e(f);
				}), L((e, t, n, i) => {
					U(r, e), U(o, t), U(l, n), J(u, "aria-label", i);
				}, [
					() => Y("lbl.ribbonItems"),
					() => Y("ui.addRibbonItem"),
					() => Y("lbl.ribbonSep"),
					() => Y("lbl.ribbonSep")
				]), B("click", a, Dr), H(e, t);
			}, f = (e) => {
				var t = ch(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = F(a, !0);
				E(n);
				var s = I(n, 2), c = N(s), l = F(c, !0), u = I(c, 2), d = F(u, !0);
				E(s);
				var f = I(s, 2), p = N(f);
				K(p);
				var m = I(p);
				E(f), L((e, t, n, r, a, s) => {
					U(i, e), U(o, t), U(l, n), U(d, r), J(f, "title", a), wi(p, z(M).props.header !== !1), U(m, ` ${s ?? ""}`);
				}, [
					() => Y("ui.addRow"),
					() => Y("ui.removeRow"),
					() => Y("ui.addColumn"),
					() => Y("ui.removeColumn"),
					() => Y("tip.table.header"),
					() => Y("lbl.tableHeader")
				]), B("click", r, () => Ir(1, 0)), B("click", a, () => Ir(-1, 0)), B("click", c, () => Ir(0, 1)), B("click", u, () => Ir(0, -1)), B("change", p, (e) => R("header", e.target.checked)), H(e, t);
			}, p = (e) => {
				var t = Pr();
				Yr(P(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Y("opt.share.email")],
					["copy", Y("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => g(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = Hm(), o = N(a);
					K(o);
					var s = I(o);
					E(a), L((e) => {
						wi(o, e), U(s, ` ${i() ?? ""}`);
					}, [() => (z(M).props.services ?? []).includes(r())]), B("change", o, (e) => Lr(r(), e.target.checked)), H(e, a);
				}), H(e, t);
			}, m = (e) => {
				var t = lh(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a), L((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.target ?? ""), J(a, "title", t), U(o, `${n ?? ""} `), q(s, z(M).props.doneText ?? "");
				}, [
					() => Y("lbl.countdownTarget"),
					() => Y("tip.countdown.done"),
					() => Y("lbl.countdownDone")
				]), B("change", i, (e) => R("target", e.target.value)), B("change", s, (e) => R("doneText", e.target.value)), H(e, t);
			}, h = (e) => {
				var t = dh(), n = P(t), r = N(n), i = I(r);
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = uh(), n = F(t, !0);
					L((e) => U(n, e), [() => Y("ui.removeAudio")]), B("click", t, () => R("src", "")), H(e, t);
				};
				W(a, (e) => {
					z(M).props.src && e(o);
				});
				var s = I(a, 2), c = N(s), l = I(c);
				K(l), E(s);
				var u = I(s, 2), d = N(u);
				K(d);
				var f = I(d);
				E(u), L((e, t, i, a, o) => {
					J(n, "title", e), U(r, `${t ?? ""} `), U(c, `${i ?? ""} `), q(l, z(M).props.title ?? ""), wi(d, a), U(f, ` ${o ?? ""}`);
				}, [
					() => Y("tip.blocks.audioFile"),
					() => Y("ui.chooseAudio"),
					() => Y("lbl.audioTitle"),
					() => !!z(M).props.loop,
					() => Y("lbl.audioLoop")
				]), B("change", i, Rr), B("change", l, (e) => R("title", e.target.value)), B("change", d, (e) => R("loop", e.target.checked)), H(e, t);
			}, _ = (e) => {
				var t = fh(), n = P(t), r = N(n), i = I(r);
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
							kn(`edit:${z(M).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				E(a);
				var c = I(a, 2), l = (e) => {
					var t = Pm();
					K(t), L((e) => {
						J(t, "placeholder", e), q(t, z(M).props.href === "#" ? "" : z(M).props.href ?? "");
					}, [() => Y("ph.url")]), B("change", t, (e) => R("href", e.target.value || null)), H(e, t);
				};
				W(c, (e) => {
					z(M).props.page || e(l);
				}), L((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.label), U(o, `${t ?? ""} `);
				}, [() => Y("blocks.text"), () => Y("lbl.goesTo")]), B("change", i, (e) => R("label", e.target.value)), H(e, t);
			}, v = (e) => {
				var t = ph(), n = P(t), r = N(n), i = I(r);
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				K(u), E(c);
				var d = I(c, 2), f = (e) => {
					var t = Hm(), n = N(t);
					K(n);
					var r = I(n);
					E(t), L((e, i, a) => {
						J(t, "title", e), wi(n, i), U(r, ` ${a ?? ""}`);
					}, [
						() => Y("tip.lightbox"),
						() => !!z(M).props.lightbox,
						() => Y("lbl.lightbox")
					]), B("change", n, (e) => R("lightbox", e.target.checked)), H(e, t);
				};
				W(d, (e) => {
					z(M).props.href || e(f);
				}), L((e, t, n, i, a) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(M).props.alt ?? ""), J(s, "placeholder", n), U(l, `${i ?? ""} `), q(u, z(M).props.href ?? ""), J(u, "placeholder", a);
				}, [
					() => Y("ui.changeImage"),
					() => Y("lbl.description"),
					() => Y("ph.altText"),
					() => Y("lbl.link"),
					() => Y("ph.optionalImageLink")
				]), B("change", i, Br), B("change", s, (e) => R("alt", e.target.value)), B("change", u, (e) => R("href", e.target.value || null)), H(e, t);
			}, y = (e) => {
				let t = /* @__PURE__ */ k(() => z(M).props.source === "file" ? "file" : "embed");
				var n = gh(), r = P(n);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.videoSource")), n = /* @__PURE__ */ k(() => [["embed", Y("opt.videoSource.embed")], ["file", Y("opt.videoSource.file")]]);
					Ps(r, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => R("source", e)
					});
				}
				var i = I(r, 2), a = (e) => {
					var t = mh(), n = P(t), r = F(n, !0), i = I(n, 2);
					K(i), L((e, t, a) => {
						J(n, "title", e), U(r, t), q(i, z(M).props.url ?? ""), J(i, "placeholder", a);
					}, [
						() => Y("hint.video"),
						() => Y("lbl.videoUrl"),
						() => Y("ph.videoUrl")
					]), B("change", i, (e) => R("url", e.target.value)), H(e, t);
				}, o = (e) => {
					var t = hh(), n = P(t), r = N(n), i = I(r);
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
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(M).props.autoplay === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.video.autoplay"), () => Y("lbl.videoAutoplay")]), B("change", n, (e) => R("autoplay", e.target.checked)), H(e, t);
					};
					W(m, (e) => {
						z(M).props.muted === !0 && e(h);
					}), L((e, t, i, s, c, d) => {
						J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${s ?? ""} `), wi(l, z(M).props.loop === !0), U(u, ` ${c ?? ""}`), wi(f, z(M).props.muted === !0), U(p, ` ${d ?? ""}`);
					}, [
						() => Y("tip.video.file"),
						() => z(M).props.src ? Y("ui.changeVideo") : Y("ui.chooseVideo"),
						() => Y("tip.bg.poster"),
						() => z(M).props.poster ? Y("ui.changeImage") : Y("ui.choosePoster"),
						() => Y("lbl.videoLoop"),
						() => Y("lbl.videoMuted")
					]), B("change", i, Wi), B("change", s, Gi), B("change", l, (e) => R("loop", e.target.checked)), B("change", f, (e) => An("muted", e.target.checked ? { muted: !0 } : {
						muted: !1,
						autoplay: !1
					})), H(e, t);
				};
				W(i, (e) => {
					z(t) === "embed" ? e(a) : e(o, -1);
				});
				var s = I(i, 2), c = N(s), l = I(c);
				K(l), E(s), L((e) => {
					U(c, `${e ?? ""} `), q(l, z(M).props.title ?? "");
				}, [() => Y("lbl.videoTitle")]), B("change", l, (e) => R("title", e.target.value)), H(e, n);
			}, x = (e) => {
				var t = yh(), n = P(t), r = N(n), i = I(r), a = N(i);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.glyph ?? "★"), t = /* @__PURE__ */ k(() => z(M).props.icon ?? null), n = /* @__PURE__ */ k(() => z(M).props.image ?? null);
					Co(a, {
						get value() {
							return z(e);
						},
						get icon() {
							return z(t);
						},
						get image() {
							return z(n);
						},
						onpick: (e) => kn(`edit:${z(M).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => kn(`edit:${z(M).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => R("image", e)
					});
				}
				var o = I(a, 2), s = (e) => {
					var t = _h();
					K(t), L((e) => {
						q(t, z(M).props.glyph ?? ""), J(t, "title", e);
					}, [() => Y("tip.icon.typeGlyph")]), B("change", t, (e) => R("glyph", e.target.value || "★")), H(e, t);
				}, c = (e) => {
					var t = uh(), n = F(t, !0);
					L((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.icon.backToGlyph"), () => Y("ui.removeDrawnIcon")]), B("click", t, () => R("icon", null)), H(e, t);
				};
				W(o, (e) => {
					z(M).props.icon ? e(c, -1) : e(s);
				}), E(i), E(n);
				var l = I(n, 2), u = (e) => {
					var t = vh(), n = N(t), r = I(n, 2), i = F(r, !0);
					E(t), L((e, r, a) => {
						J(t, "title", e), J(n, "src", z(M).props.image), J(n, "alt", r), U(i, a);
					}, [
						() => Y("hint.icon.ownImage"),
						() => Y("gp.ownIcon"),
						() => Y("ui.removeOwnIcon")
					]), B("click", r, () => R("image", null)), H(e, t);
				};
				W(l, (e) => {
					z(M).props.image && e(u);
				}), L((e) => U(r, `${e ?? ""} `), [() => Y("blocks.icon")]), H(e, t);
			}, S = (e) => {
				var t = bh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.collection ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(Hl).map((e) => [e, z(Ul)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("collection", e || null)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c);
				K(l);
				var u = I(l);
				E(c), L((e, t, i, c, d) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(M).props.limit ?? 6), wi(l, z(M).props.newestFirst !== !1), U(u, ` ${d ?? ""}`);
				}, [
					() => Y("tip.collection.source"),
					() => Y("blocks.collection"),
					() => Y("tip.collection.limit"),
					() => Y("lbl.maxCount"),
					() => Y("lbl.newestFirst")
				]), B("change", s, (e) => R("limit", Number(e.target.value))), B("change", l, (e) => R("newestFirst", e.target.checked)), H(e, t);
			}, te = (e) => {
				var t = Ch(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.collection ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(Hl).filter((e) => z(Ul)[e]?.kind === "products").map((e) => [e, z(Ul)[e]?.name ?? e])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("collection", e || null)
					});
				}
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = xh(), n = N(t), r = F(n, !0), i = I(n, 2), a = F(i, !0);
					E(t), L((e, t, o, s) => {
						J(n, "title", e), U(r, t), J(i, "title", o), U(a, s);
					}, [
						() => Y("tip.product.addProduct"),
						() => Y("ui.addProduct"),
						() => Y("tip.product.editCatalog"),
						() => Y("ui.editCatalog")
					]), B("click", n, () => Au(z(M).props.collection)), B("click", i, () => {
						j(Wl, z(M).props.collection, !0), j(Ht, "collections");
					}), H(e, t);
				}, s = (e) => {
					var t = Sh(), n = F(t, !0);
					L((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("tip.product.createCatalog"), () => Y("ui.createCatalog")]), B("click", t, Ou), H(e, t);
				}, c = /* @__PURE__ */ k(() => !z(Hl).some((e) => z(Ul)[e]?.kind === "products"));
				W(a, (e) => {
					z(M).props.collection && z(Ul)[z(M).props.collection]?.kind === "products" ? e(o) : z(c) && e(s, 1);
				});
				var l = I(a, 2), u = N(l), d = I(u);
				K(d), E(l);
				var f = I(l, 2), p = N(f), m = I(p);
				K(m), E(f), L((e, t, i, a, o, s) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(l, "title", i), U(u, `${a ?? ""} `), q(d, z(M).props.limit ?? 0), J(f, "title", o), U(p, `${s ?? ""} `), q(m, z(M).props.currency ?? "kr");
				}, [
					() => Y("tip.product.source"),
					() => Y("blocks.collection"),
					() => Y("tip.collection.limit"),
					() => Y("lbl.maxCount"),
					() => Y("tip.product.currency"),
					() => Y("lbl.currency")
				]), B("change", d, (e) => R("limit", Number(e.target.value))), B("change", m, (e) => R("currency", e.target.value)), H(e, t);
			}, ne = (e) => {
				var t = wh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.href ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.none")], ...z(O).pages.map((e) => [e.path, e.title])]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("href", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a), L((e, t, i, c) => {
					J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${c ?? ""} `), q(s, z(M).props.currency ?? "kr");
				}, [
					() => Y("tip.cart.checkout"),
					() => Y("lbl.checkoutPage"),
					() => Y("tip.product.currency"),
					() => Y("lbl.currency")
				]), B("change", s, (e) => R("currency", e.target.value)), H(e, t);
			}, re = (e) => {
				var t = Th(), n = P(t), r = N(n), i = I(r);
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
				K(g), E(m), L((e, t, _, v, y, b, x, S, ee, te) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(M).props.recipient ?? ""), J(a, "title", _), U(o, `${v ?? ""} `), q(s, z(M).props.endpoint ?? ""), J(c, "title", y), U(l, `${b ?? ""} `), q(u, z(M).props.vipps ?? ""), J(d, "title", x), wi(f, z(M).props.vippsCheckout === !0), U(p, ` ${S ?? ""}`), J(m, "title", ee), U(h, `${te ?? ""} `), q(g, z(M).props.currency ?? "kr");
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
				]), B("change", i, (e) => R("recipient", e.target.value.trim())), B("change", s, (e) => R("endpoint", e.target.value.trim())), B("change", u, (e) => R("vipps", e.target.value.trim())), B("change", f, (e) => R("vippsCheckout", e.target.checked)), B("change", g, (e) => R("currency", e.target.value)), H(e, t);
			}, ie = (e) => {
				var t = Kp(), n = P(t), r = N(n), i = I(r);
				E(n), Yr(I(n, 2), 17, () => z(M).props.images ?? [], Gr, (e, t, n) => {
					var r = Eh(), i = N(r), a = N(i), o = I(a, 2), s = N(o);
					s.disabled = n === 0, G(s, () => C.up, !0), E(s);
					var c = I(s, 2);
					G(c, () => C.down, !0), E(c);
					var l = I(c, 2);
					G(l, () => C.cross, !0), E(l), E(o), E(i);
					var u = I(i, 2), d = N(u), f = I(d);
					K(f), E(u);
					var p = I(u, 2), m = N(p), h = I(m);
					K(h), E(p), E(r), L((e, r, o, s, u, p) => {
						J(i, "title", e), J(a, "src", z(t).src), c.disabled = n === z(M).props.images.length - 1, J(l, "title", r), U(d, `${o ?? ""} `), q(f, z(t).alt ?? ""), J(f, "placeholder", s), U(m, `${u ?? ""} `), q(h, z(t).href ?? ""), J(h, "placeholder", p);
					}, [
						() => Y("hint.gallery"),
						() => Y("tip.removeImage"),
						() => Y("lbl.description"),
						() => Y("ph.altShort"),
						() => Y("lbl.link"),
						() => Y("ph.galleryHref")
					]), B("click", s, () => Uy(n, -1)), B("click", c, () => Uy(n, 1)), B("click", l, () => Wy(n)), B("change", f, (e) => Gy(n, "alt", e.target.value)), B("change", h, (e) => Gy(n, "href", e.target.value || null)), H(e, r);
				}), L((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `);
				}, [() => Y("tip.gallery.addImages"), () => Y("ui.addImages")]), B("change", i, Vy), H(e, t);
			}, ae = (e) => {
				var t = mm(), n = N(t);
				X(I(n), {
					get value() {
						return z(M).props.kind;
					},
					get options() {
						return Ur;
					},
					onchange: (e) => R("kind", e)
				}), E(t), L((e) => U(n, `${e ?? ""} `), [() => Y("blocks.shape")]), H(e, t);
			}, oe = (e) => {
				let t = /* @__PURE__ */ k(() => My[z(M).type] ?? z(jy).find((e) => e.type === z(M).type)?.fields ?? []);
				var n = Pr(), r = P(n), i = (e) => {
					var n = Pr();
					Yr(P(n), 17, () => z(t), (e) => e.key, (e, t) => {
						var n = Pr(), r = P(n), i = (e) => {
							let n = /* @__PURE__ */ k(() => `${z(M).blockId}:${z(t).key}`);
							var r = Dh(), i = P(r), a = N(i), o = I(a);
							K(o), E(i);
							var s = I(i, 2), c = F(s, !0), l = I(s, 2), u = (e) => {
								var t = qp();
								let r;
								var i = F(t, !0);
								L(() => {
									r = _i(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Xn[z(n)].err }), U(i, Xn[z(n)].text);
								}), H(e, t);
							};
							W(l, (e) => {
								Xn[z(n)] && e(u);
							}), L((e) => {
								U(a, `${z(t).label ?? ""} `), J(o, "placeholder", z(t).placeholder), q(o, Yn[z(n)] ?? z(M).props[z(t).key] ?? ""), s.disabled = z(Zn), U(c, e);
							}, [() => Y("props.place.search")]), B("input", o, (e) => {
								Yn[z(n)] = e.target.value;
							}), B("keydown", o, (e) => {
								e.key === "Enter" && er(z(t));
							}), B("click", s, () => er(z(t))), H(e, r);
						}, a = (e) => {
							var n = Oh(), r = N(n), i = I(r);
							K(i), E(n), L(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "min", z(t).min), J(i, "max", z(t).max), J(i, "step", z(t).step ?? 1), q(i, z(M).props[z(t).key]);
							}), B("change", i, (e) => R(z(t).key, $n(z(t), Number(e.target.value)))), H(e, n);
						}, o = (e) => {
							var n = Hm(), r = N(n);
							K(r);
							var i = I(r);
							E(n), L((e) => {
								wi(r, e), U(i, ` ${z(t).label ?? ""}`);
							}, [() => !!z(M).props[z(t).key]]), B("change", r, (e) => R(z(t).key, e.target.checked)), H(e, n);
						}, s = (e) => {
							var n = mm(), r = N(n), i = I(r);
							{
								let e = /* @__PURE__ */ k(() => (z(t).options ?? []).map((e) => [e.value, e.label]));
								X(i, {
									get value() {
										return z(M).props[z(t).key];
									},
									get options() {
										return z(e);
									},
									onchange: (e) => R(z(t).key, e)
								});
							}
							E(n), L(() => U(r, `${z(t).label ?? ""} `)), H(e, n);
						}, c = (e) => {
							var n = kh(), r = N(n), i = I(r);
							K(i), E(n), L(() => {
								U(r, `${z(t).label ?? ""} `), J(i, "placeholder", z(t).placeholder), q(i, z(M).props[z(t).key] ?? "");
							}), B("change", i, (e) => R(z(t).key, e.target.value)), H(e, n);
						};
						W(r, (e) => {
							z(t).type === "place" ? e(i) : z(t).type === "number" ? e(a, 1) : z(t).type === "toggle" ? e(o, 2) : z(t).type === "select" ? e(s, 3) : e(c, -1);
						}), H(e, n);
					}), H(e, n);
				}, a = (e) => {
					var t = uh(), n = F(t, !0);
					L((e, r) => {
						J(t, "title", e), U(n, r);
					}, [() => Y("hint.pluginBlock"), () => Y("ui.settings")]), B("click", t, () => it?.sendOpenConfig(z(M).blockId)), H(e, t);
				};
				W(r, (e) => {
					z(t).length ? e(i) : e(a, -1);
				}), H(e, n);
			};
			W(n, (e) => {
				z(M).type === "text" ? e(r) : z(M).type === "form" ? e(i, 1) : z(M).type === "calendar" ? e(a, 2) : z(M).type === "faq" ? e(o, 3) : z(M).type === "timeline" ? e(s, 4) : z(M).type === "quote" ? e(l, 5) : z(M).type === "stats" ? e(u, 6) : z(M).type === "ribbon" ? e(d, 7) : z(M).type === "table" ? e(f, 8) : z(M).type === "share" ? e(p, 9) : z(M).type === "countdown" ? e(m, 10) : z(M).type === "audio" ? e(h, 11) : z(M).type === "button" ? e(_, 12) : z(M).type === "image" ? e(v, 13) : z(M).type === "video" ? e(y, 14) : z(M).type === "icon" ? e(x, 15) : z(M).type === "collection" ? e(S, 16) : z(M).type === "product" ? e(te, 17) : z(M).type === "cart" ? e(ne, 18) : z(M).type === "checkout" ? e(re, 19) : z(M).type === "gallery" ? e(ie, 20) : z(M).type === "shape" ? e(ae, 21) : e(oe, -1);
			}), H(e, t);
		}, r = (e) => {
			var t = Pr(), n = P(t), r = (e) => {
				var t = Ah(), n = P(t), r = N(n), i = I(r);
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
						onchange: (e) => R("align", e)
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
				}), ke(2), L((e, t, n) => {
					U(r, `${e ?? ""} `), wi(o, t), U(c, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.align"),
					() => !!z(M).props.box,
					() => Y("lbl.textBoxToggle")
				]), B("change", o, (e) => R("box", e.target.checked)), H(e, t);
			}, i = (e) => {
				let t = (e) => {
					var t = Nh(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a);
					var o = F(I(a, 2));
					E(n);
					var s = I(n, 2), c = (e) => {
						let t = /* @__PURE__ */ k(() => mp(z(M).props));
						var n = Pr();
						Yr(P(n), 17, () => pp(z(M).props.design), (e) => e.key, (e, n) => {
							var r = Pr(), i = P(r), a = (e) => {
								var r = Hm(), i = N(r);
								K(i);
								var a = I(i);
								E(r), L((e) => {
									wi(i, z(t)[z(n).key]), U(a, ` ${e ?? ""}`);
								}, [() => Y(z(n).labelKey)]), B("change", i, (e) => Rn(z(n), e.target.checked)), H(e, r);
							}, o = (e) => {
								var r = jh(), i = N(r), a = I(i);
								K(a), E(r), L((e, o, s) => {
									J(r, "title", e), U(i, `${o ?? ""} `), q(a, z(t)[z(n).key] ?? ""), J(a, "placeholder", s);
								}, [
									() => Y("tip.calendar.opt.hours"),
									() => Y(z(n).labelKey),
									() => Y("calendar.opt.columns.auto")
								]), B("change", a, (e) => Rn(z(n), e.target.value === "" ? null : Math.max(0, Math.min(24, Math.round(Number(e.target.value)) || 0)))), H(e, r);
							}, s = (e) => {
								var r = Mh(), i = N(r), a = F(i, !0), o = I(i, 2);
								{
									let e = /* @__PURE__ */ k(() => z(n).values.map((e) => [e, zn(z(n), e)]));
									X(o, {
										get value() {
											return z(t)[z(n).key];
										},
										get options() {
											return z(e);
										},
										onchange: (e) => Rn(z(n), e)
									});
								}
								E(r), L((e) => U(a, e), [() => Y(z(n).labelKey)]), H(e, r);
							}, c = (e) => {
								{
									let r = /* @__PURE__ */ k(() => Y(z(n).labelKey)), i = /* @__PURE__ */ k(() => z(n).values.map((e) => [e, zn(z(n), e)]));
									Ps(e, {
										get label() {
											return z(r);
										},
										get value() {
											return z(t)[z(n).key];
										},
										get options() {
											return z(i);
										},
										onchange: (e) => Rn(z(n), e)
									});
								}
							};
							W(i, (e) => {
								z(n).kind === "switch" ? e(a) : z(n).kind === "hour" ? e(o, 1) : z(n).values.length > 4 ? e(s, 2) : e(c, -1);
							}), H(e, r);
						}), H(e, n);
					}, l = /* @__PURE__ */ k(() => pp(z(M).props.design).length);
					W(s, (e) => {
						z(l) && e(c);
					}), L((e, t, r, s, c) => {
						J(n, "title", e), U(i, t), J(a, "min", hp.min * 100), J(a, "max", hp.max * 100), q(a, r), J(a, "aria-label", s), U(o, `${c ?? ""} %`);
					}, [
						() => Y("tip.calendar.scale"),
						() => Y("calendar.scale"),
						() => Math.round(gp(z(M).props) * 100),
						() => Y("calendar.scale"),
						() => Math.round(gp(z(M).props) * 100)
					]), B("change", a, (e) => R("scale", e.target.valueAsNumber === 100 ? void 0 : e.target.valueAsNumber / 100)), H(e, t);
				}, n = (e) => {
					var t = Pr();
					Yr(P(t), 19, () => Bn(z(a)), (e) => e.section, (e, t, n) => {
						var r = Ih(), i = P(r), a = (e) => {
							var n = Ph(), r = F(n, !0);
							L((e) => U(r, e), [() => Y(`calendar.section.${z(t).section}`)]), H(e, n);
						};
						W(i, (e) => {
							z(n) > 0 && e(a);
						});
						var o = I(i, 2);
						Yr(o, 21, () => z(t).slots, (e) => e.key, (e, t) => {
							var n = Fh(), r = N(n);
							{
								let e = /* @__PURE__ */ k(() => z(M).props.colors?.[z(t).key] ?? ""), n = /* @__PURE__ */ k(ga), i = /* @__PURE__ */ k(() => Y(z(t).labelKey));
								Ta(r, {
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
									onchange: (e) => Un(z(t).key, e || "")
								});
							}
							var i = F(I(r, 2), !0);
							E(n), L((e, t) => {
								J(n, "title", e), U(i, t);
							}, [() => Y("tip.calendar.slot"), () => Y(z(t).labelKey)]), H(e, n);
						}), E(o), H(e, r);
					}), H(e, t);
				}, r = (e) => {
					var t = Xm(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var o = I(n, 2), s = (e) => {
						var t = Mh(), n = N(t), r = F(n, !0), i = I(n, 2);
						{
							let e = /* @__PURE__ */ k(() => z(M).props.stripe?.color ?? ""), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("calendar.stripeColor"));
							Ta(i, {
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
								onchange: (e) => Wn({ color: e || void 0 })
							});
						}
						E(t), L((e, n) => {
							J(t, "title", e), U(r, n);
						}, [() => Y("tip.calendar.stripeColor"), () => Y("calendar.stripeColor")]), H(e, t);
					}, c = /* @__PURE__ */ k(() => wp(z(a), z(M).props.stripe).show);
					W(o, (e) => {
						z(c) && e(s);
					}), L((e, t, a) => {
						J(n, "title", e), wi(r, t), U(i, ` ${a ?? ""}`);
					}, [
						() => Y("tip.calendar.stripe"),
						() => wp(z(a), z(M).props.stripe).show,
						() => Y("calendar.stripe")
					]), B("change", r, (e) => Wn({ show: e.target.checked })), H(e, t);
				}, i = (e) => {
					var t = Lh(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => rp.map((e) => [e, Y(`calendar.field.${e}`)]));
						X(n, {
							get value() {
								return z(In);
							},
							get options() {
								return z(e);
							},
							onchange: (e) => j(In, e, !0)
						});
					}
					var r = I(n, 2), i = N(r), a = I(i);
					{
						let e = /* @__PURE__ */ k(() => Vn().font ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.inherit")], ...Uf.map(([e, t]) => [t, Y(e)])]);
						X(a, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => Gn({ font: e || void 0 })
						});
					}
					E(r);
					var o = I(r, 2), s = N(o), c = I(s);
					K(c), E(o);
					var l = I(o, 2);
					{
						let e = /* @__PURE__ */ k(() => Y("calendar.fieldWeight")), t = /* @__PURE__ */ k(() => Vn().bold === !0 ? "bold" : Vn().bold === !1 ? "normal" : ""), n = /* @__PURE__ */ k(() => [
							["", Y("common.inherit")],
							["bold", Y("format.bold")],
							["normal", Y("calendar.fieldNormal")]
						]);
						Ps(l, {
							get label() {
								return z(e);
							},
							get value() {
								return z(t);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => Gn({ bold: e === "bold" || e !== "normal" && void 0 })
						});
					}
					var u = I(l, 2), d = N(u);
					let f;
					var p = F(N(d), !0);
					E(d);
					var m = I(d, 2);
					let h;
					var g = F(N(m), !0);
					E(m);
					var _ = I(m, 2);
					{
						let e = /* @__PURE__ */ k(() => Vn().color ?? ""), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("calendar.fieldColor"));
						Ta(_, {
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
							onchange: (e) => Gn({ color: e || void 0 })
						});
					}
					E(u), L((e, t, n, r, a, l, u, _, v, y, b) => {
						U(i, `${e ?? ""} `), J(o, "title", t), U(s, `${n ?? ""} `), J(c, "min", Tp.min), J(c, "max", Tp.max), q(c, r), J(c, "placeholder", a), f = _i(d, 1, "tbtn svelte-1n46o8q", null, f, { active: l }), J(d, "title", u), U(p, _), h = _i(m, 1, "tbtn svelte-1n46o8q", null, h, { active: v }), J(m, "title", y), U(g, b);
					}, [
						() => Y("calendar.fieldFont"),
						() => Y("tip.calendar.fieldSize"),
						() => Y("calendar.fieldSize"),
						() => Vn().size ?? "",
						() => Y("common.inherit"),
						() => Vn().italic === !0,
						() => Y("format.italic"),
						() => Y("format.italicLetter"),
						() => Vn().underline === !0,
						() => Y("calendar.fieldUnderline"),
						() => Y("format.underlineLetter")
					]), B("change", c, (e) => Gn({ size: e.target.value === "" ? void 0 : Math.max(Tp.min, Math.min(Tp.max, Number(e.target.value) || Tp.min)) })), B("click", d, () => Gn({ italic: !Vn().italic || void 0 })), B("click", m, () => Gn({ underline: !Vn().underline || void 0 })), H(e, t);
				}, a = /* @__PURE__ */ k(() => _p(z(M).props.design)), o = /* @__PURE__ */ k(yn);
				var s = Rh(), l = P(s), u = N(l), d = F(u, !0), f = F(I(u), !0);
				E(l);
				var p = I(l, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.section.options"));
					c(p, () => "cal-opts", () => z(e), () => z(o).opts, () => t, () => z(o).optsReset);
				}
				var m = I(p, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.colors"));
					c(m, () => "cal-colors", () => z(e), () => z(o).colors, () => n, () => z(o).colorsReset);
				}
				var h = I(m, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.stripe"));
					c(h, () => "cal-stripe", () => z(e), () => z(o).stripe, () => r, () => z(o).stripeReset);
				}
				var g = I(h, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("calendar.fieldStyle"));
					c(g, () => "cal-fields", () => z(e), () => z(o).fields, () => i, () => z(o).fieldsReset);
				}
				L((e, t, n) => {
					J(l, "title", e), U(d, t), U(f, n);
				}, [
					() => Y("tip.calendar.design"),
					() => Y("calendar.design"),
					() => Y(z(a).labelKey)
				]), B("click", l, () => j(bn, z(M).blockId, !0)), H(e, s);
			}, a = (e) => {
				var t = Bh(), n = P(t);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.variant")), t = /* @__PURE__ */ k(() => z(M).props.variant === "list" ? "list" : "cards"), r = /* @__PURE__ */ k(() => Al.map((e) => [e, Y(`opt.faqVariant.${e}`)]));
					Ps(n, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => R("variant", e)
					});
				}
				var r = I(n, 2), i = (e) => {
					var t = zh(), n = P(t), r = F(n, !0), i = I(n, 2);
					s(i), L((e) => U(r, e), [() => Y("lbl.cardStyle")]), H(e, t);
				};
				W(r, (e) => {
					z(M).props.variant !== "list" && e(i);
				}), ke(2), H(e, t);
			}, o = (e) => {
				var t = Vh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "left"), t = /* @__PURE__ */ k(() => [["left", Y("opt.timeline.left")], ["alternating", Y("opt.timeline.alternating")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("variant", e)
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
						onchange: (e) => R("marker", e)
					});
				}
				E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.accent ?? "accent"), t = /* @__PURE__ */ k(ga);
					Ta(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => R("accent", e === "accent" ? null : e)
					});
				}
				E(c), ke(2), L((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.timelineMarker"),
					() => Y("lbl.color")
				]), H(e, t);
			}, l = (e) => {
				var t = Uh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "large"), t = /* @__PURE__ */ k(() => [["large", Y("opt.quote.large")], ["short", Y("opt.quote.short")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = Hh(), n = P(t), r = N(n), i = I(r);
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = uh(), n = F(t, !0);
						L((e) => U(n, e), [() => Y("ui.quotePortraitRemove")]), B("click", t, () => R("image", "")), H(e, t);
					};
					W(a, (e) => {
						z(M).props.image && e(o);
					}), L((e) => U(r, `${e ?? ""} `), [() => Y("ui.quotePortrait")]), B("change", i, Vr), H(e, t);
				}, s = (e) => {
					var t = Hm(), n = N(t);
					K(n);
					var r = I(n);
					E(t), L((e, i) => {
						J(t, "title", e), wi(n, z(M).props.card === !0), U(r, ` ${i ?? ""}`);
					}, [() => Y("tip.quote.card"), () => Y("lbl.quoteCard")]), B("change", n, (e) => R("card", e.target.checked)), H(e, t);
				};
				W(a, (e) => {
					z(M).props.variant === "short" ? e(o) : e(s, -1);
				});
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.accent ?? "accent"), t = /* @__PURE__ */ k(ga);
					Ta(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => R("accent", e === "accent" ? null : e)
					});
				}
				E(c), ke(2), L((e, t) => {
					U(r, `${e ?? ""} `), U(l, `${t ?? ""} `);
				}, [() => Y("lbl.variant"), () => Y("lbl.color")]), H(e, t);
			}, u = (e) => {
				var t = Wh(), n = P(t);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.variant")), t = /* @__PURE__ */ k(() => kl.includes(z(M).props.variant) ? z(M).props.variant : "plain"), r = /* @__PURE__ */ k(() => kl.map((e) => [e, Y(`opt.statVariant.${e}`)]));
					Ps(n, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(r);
						},
						onchange: (e) => R("variant", e)
					});
				}
				var r = I(n, 2), i = N(r);
				K(i);
				var a = I(i);
				E(r), ke(2), L((e, t) => {
					J(r, "title", e), wi(i, z(M).props.countUp !== !1), U(a, ` ${t ?? ""}`);
				}, [() => Y("tip.stat.countUp"), () => Y("lbl.statCountUp")]), B("change", i, (e) => R("countUp", e.target.checked)), H(e, t);
			}, d = (e) => {
				let t = /* @__PURE__ */ k(() => z(M).props.motion ?? "roll");
				var n = Xh(), r = P(n), i = N(r), a = F(i, !0), o = I(i, 2);
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
						onchange: (e) => R("motion", e)
					});
				}
				var s = I(o, 2), c = (e) => {
					var n = qh(), r = P(n), i = F(r, !0), a = I(r, 2);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonDirection")), t = /* @__PURE__ */ k(() => z(M).props.direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
						Ps(a, {
							get label() {
								return z(e);
							},
							get value() {
								return z(t);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => R("direction", e)
						});
					}
					var o = I(a, 2), s = (e) => {
						var t = Gh(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i);
						var a = F(I(i, 2));
						E(t), L((e, n) => {
							J(t, "title", e), U(r, n), q(i, z(M).props.dwell ?? 2.5), U(a, `${z(M).props.dwell ?? 2.5 ?? ""} s`);
						}, [() => Y("tip.ribbon.dwell"), () => Y("lbl.ribbonDwell")]), B("input", i, (e) => R("dwell", e.target.valueAsNumber)), H(e, t);
					}, c = (e) => {
						var t = Kh(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i);
						var a = F(I(i, 2), !0);
						E(t), L((e, n) => {
							J(t, "title", e), U(r, n), q(i, z(M).props.speed ?? 60), U(a, z(M).props.speed ?? 60);
						}, [() => Y("tip.ribbon.speed"), () => Y("lbl.ribbonSpeed")]), B("input", i, (e) => R("speed", e.target.valueAsNumber)), H(e, t);
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
					E(f), L((e, t, n, a, o, s) => {
						J(r, "title", e), U(i, t), J(l, "title", n), wi(u, z(M).props.pauseOnHover !== !1), U(d, ` ${a ?? ""}`), J(f, "title", o), wi(p, z(M).props.fade !== !1), U(m, ` ${s ?? ""}`);
					}, [
						() => Y("tip.ribbon.play"),
						() => Y("ui.ribbonPlay"),
						() => Y("tip.ribbon.pause"),
						() => Y("lbl.ribbonPause"),
						() => Y("tip.ribbon.fade"),
						() => Y("lbl.ribbonFade")
					]), B("click", r, () => it?.sendDemoMotion()), B("change", u, (e) => R("pauseOnHover", e.target.checked)), B("change", p, (e) => R("fade", e.target.checked)), H(e, n);
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
							return z(S);
						},
						onchange: (e) => R("above", e)
					});
				}
				E(f);
				var g = I(f, 2), _ = (e) => {
					var t = mm(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.aboveColor ?? Ol(z(M).props)), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.ribbon.stripeColor"));
						Ta(r, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => R("aboveColor", e)
						});
					}
					E(t), L((e, r) => {
						J(t, "title", e), U(n, `${r ?? ""} `);
					}, [() => Y("tip.ribbon.stripeColor"), () => Y("lbl.colour")]), H(e, t);
				};
				W(g, (e) => {
					(z(M).props.above ?? "none") !== "none" && e(_);
				});
				var v = I(g, 2), y = N(v), b = F(y, !0), ee = I(y, 2);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.main ?? "text");
					X(ee, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(x);
						},
						onchange: (e) => R("main", e)
					});
				}
				E(v);
				var te = I(v, 2), ne = N(te), re = F(ne, !0), ie = I(ne, 2);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.below ?? "none");
					X(ie, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(S);
						},
						onchange: (e) => R("below", e)
					});
				}
				E(te);
				var C = I(te, 2), ae = (e) => {
					var t = mm(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.belowColor ?? Ol(z(M).props)), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.ribbon.stripeColor"));
						Ta(r, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => R("belowColor", e)
						});
					}
					E(t), L((e, r) => {
						J(t, "title", e), U(n, `${r ?? ""} `);
					}, [() => Y("tip.ribbon.stripeColor"), () => Y("lbl.colour")]), H(e, t);
				};
				W(C, (e) => {
					(z(M).props.below ?? "none") !== "none" && e(ae);
				});
				var oe = I(C, 2), se = (e) => {
					var t = Jh(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonStripePlace")), t = /* @__PURE__ */ k(() => Y("tip.ribbon.stripePlace")), r = /* @__PURE__ */ k(() => z(M).props.stripePlace ?? "stack"), i = /* @__PURE__ */ k(() => [["stack", Y("opt.ribbonPlace.stack")], ["edge", Y("opt.ribbonPlace.edge")]]);
						Ps(n, {
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
							onchange: (e) => R("stripePlace", e)
						});
					}
					var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2);
					K(o);
					var s = F(I(o, 2));
					E(r), L((e, t) => {
						J(r, "title", e), U(a, t), q(o, z(M).props.thickness ?? 8), U(s, `${z(M).props.thickness ?? 8 ?? ""} px`);
					}, [() => Y("tip.ribbon.thickness"), () => Y("lbl.ribbonThickness")]), B("input", o, (e) => R("thickness", e.target.valueAsNumber)), H(e, t);
				};
				W(oe, (e) => {
					((z(M).props.above ?? "none") !== "none" || (z(M).props.below ?? "none") !== "none") && e(se);
				}), E(l);
				var ce = I(l, 2), le = N(ce), ue = F(le, !0), w = I(le, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.ribbonWidth")), t = /* @__PURE__ */ k(() => z(M).props.width ?? "content"), n = /* @__PURE__ */ k(() => [["content", Y("opt.ribbonWidth.content")], ["page", Y("opt.ribbonWidth.page")]]);
					Ps(w, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => R("width", e)
					});
				}
				var de = I(w, 2);
				{
					let e = /* @__PURE__ */ k(() => Y("lbl.ribbonVariant")), t = /* @__PURE__ */ k(() => z(M).props.variant ?? "band"), n = /* @__PURE__ */ k(() => [["band", Y("opt.ribbonVariant.band")], ["plain", Y("opt.ribbonVariant.plain")]]);
					Ps(de, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => R("variant", e)
					});
				}
				var fe = I(de, 2), pe = N(fe), me = F(pe, !0), T = I(pe, 2);
				K(T);
				var he = F(I(T, 2));
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
						onchange: (e) => R("size", e)
					});
				}
				E(ye);
				var Ce = I(ye, 2), we = N(Ce);
				K(we);
				var Te = I(we);
				E(Ce);
				var Ee = I(Ce, 2), De = N(Ee);
				K(De);
				var Oe = I(De);
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
					var t = Yh(), n = N(t);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.bg ?? "accent"), t = /* @__PURE__ */ k(ga), r = /* @__PURE__ */ k(() => Y("tip.ribbon.bg"));
						Ta(n, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(r);
							},
							onchange: (e) => R("bg", e)
						});
					}
					var r = F(I(n, 2), !0);
					E(t), L((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.ribbon.bg"), () => Y("lbl.background")]), H(e, t);
				};
				W(He, (e) => {
					(z(M).props.variant ?? "band") !== "plain" && e(Ue);
				});
				var We = I(He, 2), Ge = N(We);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.color ?? ((z(M).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.ribbon.color"));
					Ta(Ge, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => R("color", e)
					});
				}
				var Ke = F(I(Ge, 2), !0);
				E(We), E(Ve), E(Re), ke(2), L((e, t, n, r, i, o, s, c, l, u, p, h, g, _, y, x, S, ee, ne, ie, C, ae, oe, se) => {
					U(a, e), U(d, t), J(f, "title", n), U(m, r), J(v, "title", i), U(b, o), J(te, "title", s), U(re, c), U(ue, l), J(fe, "title", u), U(me, p), q(T, z(M).props.tilt ?? 0), U(he, `${z(M).props.tilt ?? 0 ?? ""}°`), U(ve, h), U(xe, g), J(Ce, "title", _), wi(we, z(M).props.caps === !0), U(Te, ` ${y ?? ""}`), J(Ee, "title", x), wi(De, z(M).props.weight === "bold"), U(Oe, ` ${S ?? ""}`), J(Ae, "title", ee), wi(je, z(M).props.outline === !0), U(Me, ` ${ne ?? ""}`), J(Ne, "title", ie), U(Fe, C), q(Ie, z(M).props.gap ?? 40), U(Le, `${z(M).props.gap ?? 40 ?? ""} px`), U(Be, ae), J(We, "title", oe), U(Ke, se);
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
				]), B("input", T, (e) => R("tilt", e.target.valueAsNumber)), B("change", we, (e) => R("caps", e.target.checked)), B("change", De, (e) => R("weight", e.target.checked ? "bold" : "normal")), B("change", je, (e) => R("outline", e.target.checked)), B("input", Ie, (e) => R("gap", e.target.valueAsNumber)), H(e, n);
			}, f = (e) => {
				var t = Zh(), n = P(t), r = N(n), i = I(r);
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
						onchange: (e) => R("lines", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a);
				K(o);
				var s = I(o);
				E(a), ke(2), L((e, t, n) => {
					U(r, `${e ?? ""} `), wi(o, t), U(s, ` ${n ?? ""}`);
				}, [
					() => Y("lbl.tableLines"),
					() => !!z(M).props.striped,
					() => Y("lbl.tableStriped")
				]), B("change", o, (e) => R("striped", e.target.checked)), H(e, t);
			}, p = (e) => {
				var t = Qh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "icons"), t = /* @__PURE__ */ k(() => [["icons", Y("opt.share.icons")], ["labels", Y("opt.share.labels")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.color || "accent"), t = /* @__PURE__ */ k(ga);
					Ta(u, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => R("color", e === "accent" ? "" : e)
					});
				}
				E(c), ke(2), L((e, t, n) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), q(s, z(M).props.size ?? 38), U(l, `${n ?? ""} `);
				}, [
					() => Y("lbl.variant"),
					() => Y("lbl.size"),
					() => Y("lbl.color")
				]), B("change", s, (e) => R("size", Number(e.target.value) || 38)), H(e, t);
			}, m = (e) => {
				var t = Zh(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "boxes"), t = /* @__PURE__ */ k(() => [["boxes", Y("opt.countdown.boxes")], ["plain", Y("opt.countdown.plain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				E(n);
				var a = I(n, 2), o = N(a);
				K(o);
				var s = I(o);
				E(a), ke(2), L((e, t) => {
					U(r, `${e ?? ""} `), wi(o, z(M).props.showSeconds !== !1), U(s, ` ${t ?? ""}`);
				}, [() => Y("lbl.variant"), () => Y("lbl.countdownSeconds")]), B("change", o, (e) => R("showSeconds", e.target.checked)), H(e, t);
			}, h = (e) => {
				var t = $h(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => [["primary", Y("opt.btn.primary")], ["secondary", Y("opt.btn.secondary")]]);
					X(i, {
						get value() {
							return z(M).props.style;
						},
						get options() {
							return z(e);
						},
						onchange: (e) => R("style", e)
					});
				}
				E(n), ke(2), L((e) => U(r, `${e ?? ""} `), [() => Y("lbl.style")]), H(e, t);
			}, g = (e) => {
				var t = eg(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.fit ?? "cover"), t = /* @__PURE__ */ k(() => [["cover", Y("opt.fitFrame.cover")], ["contain", Y("opt.fitFrame.contain")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("fit", e)
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
						onchange: (e) => R("radius", e || null)
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
				var ie = I(te, 2);
				K(ie);
				var C = I(ie, 2), ae = N(C), oe = F(I(ae));
				E(C);
				var se = I(C, 2);
				K(se);
				var ce = I(se, 2), le = F(ce, !0);
				ke(2), L((e, t, n, i, a, s, c, f, b, te, C, ue, w, de, fe, pe, me) => {
					U(r, `${e ?? ""} `), U(o, `${t ?? ""} `), U(l, `${n ?? ""} `), U(u, `${i ?? ""}%`), q(d, z(M).props.x ?? .5), U(p, `${a ?? ""} `), U(m, `${s ?? ""}%`), q(h, z(M).props.y ?? .5), J(g, "title", c), U(_, `${f ?? ""} `), U(v, `${b ?? ""}x`), q(y, z(M).props.zoom ?? 1), U(x, `${te ?? ""} `), U(S, `${C ?? ""}%`), q(ee, z(M).props.brightness ?? 1), U(ne, `${ue ?? ""} `), U(re, `${w ?? ""}%`), q(ie, z(M).props.contrast ?? 1), U(ae, `${de ?? ""} `), U(oe, `${fe ?? ""}%`), q(se, z(M).props.saturate ?? 1), J(ce, "title", pe), U(le, me);
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
				]), B("input", d, (e) => R("x", Number(e.target.value))), B("input", h, (e) => R("y", Number(e.target.value))), B("input", y, (e) => R("zoom", Number(e.target.value))), B("input", ee, (e) => R("brightness", Number(e.target.value))), B("input", ie, (e) => R("contrast", Number(e.target.value))), B("input", se, (e) => R("saturate", Number(e.target.value))), B("click", ce, () => kn(`edit:${z(M).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), H(e, t);
			}, _ = (e) => {
				var t = tg(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.color ?? "accent"), t = /* @__PURE__ */ k(ga);
					Ta(s, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						onchange: (e) => R("color", e)
					});
				}
				E(a), ke(2), L((e, t, n) => {
					U(r, `${e ?? ""} `), q(i, z(M).props.size ?? 48), J(a, "title", t), U(o, `${n ?? ""} `);
				}, [
					() => Y("lbl.sizePx"),
					() => Y("hint.icon.color"),
					() => Y("lbl.color")
				]), B("change", i, (e) => R("size", Number(e.target.value))), H(e, t);
			}, v = (e) => {
				var t = $h(), n = P(t), r = N(n), i = I(r);
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
						onchange: (e) => R("view", e)
					});
				}
				E(n), ke(2), L((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, y = (e) => {
				var t = ng(), n = P(t), r = N(n), i = I(r);
				K(i), E(n), ke(2), L((e, t) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(M).props.columns ?? 0);
				}, [() => Y("tip.product.columns"), () => Y("lbl.columns")]), B("change", i, (e) => R("columns", Number(e.target.value))), H(e, t);
			}, b = (e) => {
				var t = $h(), n = P(t), r = N(n), i = I(r);
				{
					let e = /* @__PURE__ */ k(() => z(M).props.variant ?? "button"), t = /* @__PURE__ */ k(() => [["button", Y("opt.cart.button")], ["icon", Y("opt.cart.icon")]]);
					X(i, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				E(n), ke(2), L((e) => U(r, `${e ?? ""} `), [() => Y("lbl.view")]), H(e, t);
			}, ee = (e) => {
				let t = /* @__PURE__ */ k(() => Ld(z(M).props.view));
				var n = cg(), r = P(n), i = N(r), a = I(i);
				{
					let e = /* @__PURE__ */ k(() => Nd.map((e) => [e, Y(`opt.galleryView.${e}`)]));
					X(a, {
						get value() {
							return z(t);
						},
						get options() {
							return z(e);
						},
						onchange: (e) => R("view", e)
					});
				}
				E(r);
				var o = I(r, 2), s = (e) => {
					var t = rg(), n = P(t), r = N(n), i = I(r);
					K(i), E(n);
					var a = I(n, 2), o = N(a), s = F(I(o));
					E(a);
					var c = I(a, 2);
					K(c), L((e, t) => {
						U(r, `${e ?? ""} `), q(i, z(M).props.columns ?? 3), U(o, `${t ?? ""} `), U(s, `${z(M).props.gap ?? 12 ?? ""} px`), q(c, z(M).props.gap ?? 12);
					}, [() => Y("lbl.columns"), () => Y("lbl.imageGap")]), B("change", i, (e) => R("columns", Number(e.target.value))), B("input", c, (e) => R("gap", Number(e.target.value))), H(e, t);
				}, c = /* @__PURE__ */ k(() => Pd.includes(z(t)));
				W(o, (e) => {
					z(c) && e(s);
				});
				var l = I(o, 2), u = (e) => {
					var t = ig(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a);
					var o = F(I(a, 2));
					E(n);
					var s = I(n, 2), c = N(s);
					G(c, () => C.shuffle);
					var l = I(c);
					E(s), L((e, t, r, c) => {
						J(n, "title", e), U(i, t), J(a, "min", Fd.min), J(a, "max", Fd.max), q(a, z(M).props.rowHeight ?? Fd.dflt), U(o, `${z(M).props.rowHeight ?? Fd.dflt ?? ""} px`), J(s, "title", r), U(l, ` ${c ?? ""}`);
					}, [
						() => Y("tip.gallery.rowHeight"),
						() => Y("lbl.galleryRowHeight"),
						() => Y("tip.gallery.shuffleMosaic"),
						() => Y("ui.shufflePhotos")
					]), B("input", a, (e) => R("rowHeight", e.target.valueAsNumber)), B("click", s, () => R("seed", ea())), H(e, t);
				};
				W(l, (e) => {
					z(t) === "mosaic" && e(u);
				});
				var d = I(l, 2), f = (e) => {
					var t = ag(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a);
					var o = F(I(a, 2));
					E(n);
					var s = I(n, 2), c = (e) => {
						var t = dm(), n = N(t);
						G(n, () => C.shuffle);
						var r = I(n);
						E(t), L((e, n) => {
							J(t, "title", e), U(r, ` ${n ?? ""}`);
						}, [() => Y("tip.gallery.shuffleTilt"), () => Y("ui.shufflePhotos")]), B("click", t, () => R("seed", ea())), H(e, t);
					};
					W(s, (e) => {
						(z(M).props.tilt ?? Id.dflt) > 0 && e(c);
					});
					var l = I(s, 2), u = N(l), d = I(u);
					{
						let e = /* @__PURE__ */ k(() => z(M).props.frameColor || "#ffffff"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.gallery.frameColor"));
						Ta(d, {
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
							onchange: (e) => R("frameColor", e ?? "")
						});
					}
					E(l);
					var f = I(l, 2), p = N(f);
					K(p);
					var m = I(p);
					E(f), L((e, t, r, s, c, d) => {
						J(n, "title", e), U(i, t), J(a, "min", Id.min), J(a, "max", Id.max), q(a, z(M).props.tilt ?? Id.dflt), U(o, `${z(M).props.tilt ?? Id.dflt ?? ""}°`), J(l, "title", r), U(u, `${s ?? ""} `), J(f, "title", c), wi(p, z(M).props.captions === !0), U(m, ` ${d ?? ""}`);
					}, [
						() => Y("tip.gallery.tilt"),
						() => Y("lbl.polaroidTilt"),
						() => Y("tip.gallery.frameColor"),
						() => Y("lbl.frameColor"),
						() => Y("tip.gallery.captions"),
						() => Y("lbl.galleryCaptions")
					]), B("input", a, (e) => R("tilt", e.target.valueAsNumber)), B("change", p, (e) => R("captions", e.target.checked)), H(e, t);
				};
				W(d, (e) => {
					z(t) === "polaroid" && e(f);
				});
				var p = I(d, 2), m = (e) => {
					var t = og(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonRows")), t = /* @__PURE__ */ k(() => String(z(M).props.rows ?? 1)), r = /* @__PURE__ */ k(() => [["1", Y("opt.ribbonRows.one")], ["2", Y("opt.ribbonRows.two")]]);
						Ps(n, {
							get label() {
								return z(e);
							},
							get value() {
								return z(t);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => R("rows", Number(e))
						});
					}
					var r = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.ribbonDirection")), t = /* @__PURE__ */ k(() => z(M).props.direction ?? "left"), n = /* @__PURE__ */ k(() => [["left", Y("opt.ribbonDir.left")], ["right", Y("opt.ribbonDir.right")]]);
						Ps(r, {
							get label() {
								return z(e);
							},
							get value() {
								return z(t);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => R("direction", e)
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
					E(x), L((e, t, n, r, a, u, m, te, ne) => {
						J(i, "title", e), U(o, t), q(s, z(M).props.speed ?? 60), U(c, z(M).props.speed ?? 60), J(l, "title", n), U(d, r), q(f, z(M).props.bandHeight ?? 160), U(p, `${z(M).props.bandHeight ?? 160 ?? ""} px`), U(h, `${a ?? ""} `), U(g, `${z(M).props.gap ?? 12 ?? ""} px`), q(_, z(M).props.gap ?? 12), J(v, "title", u), wi(y, z(M).props.pauseOnHover !== !1), U(b, ` ${m ?? ""}`), J(x, "title", te), wi(S, z(M).props.fade !== !1), U(ee, ` ${ne ?? ""}`);
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
					]), B("input", s, (e) => R("speed", e.target.valueAsNumber)), B("input", f, (e) => R("bandHeight", e.target.valueAsNumber)), B("input", _, (e) => R("gap", Number(e.target.value))), B("change", y, (e) => R("pauseOnHover", e.target.checked)), B("change", S, (e) => R("fade", e.target.checked)), H(e, t);
				};
				W(p, (e) => {
					z(t) === "ribbon" && e(m);
				});
				var h = I(p, 2), g = (e) => {
					var t = sg(), n = N(t), r = I(n);
					K(r), E(t), L((e) => {
						U(n, `${e ?? ""} `), q(r, z(M).props.interval ?? 5);
					}, [() => Y("lbl.secondsPerImage")]), B("change", r, (e) => R("interval", Number(e.target.value))), H(e, t);
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
						onchange: (e) => R("radius", e || null)
					});
				}
				E(_);
				var b = I(_, 2), x = N(b);
				K(x);
				var S = I(x);
				E(b), ke(2), L((e, t, n, r) => {
					U(i, `${e ?? ""} `), U(v, `${t ?? ""} `), J(b, "title", n), wi(x, z(M).props.lightbox !== !1), U(S, ` ${r ?? ""}`);
				}, [
					() => Y("lbl.view"),
					() => Y("lbl.radius"),
					() => Y("tip.lightbox"),
					() => Y("lbl.lightbox")
				]), B("change", x, (e) => R("lightbox", e.target.checked)), H(e, n);
			}, te = (e) => {
				var t = ug(), n = P(t), r = N(n);
				X(I(r), {
					get value() {
						return z(M).props.color;
					},
					get options() {
						return Wr;
					},
					onchange: (e) => R("color", e)
				}), E(n);
				var i = I(n, 2), a = N(i), o = I(a);
				K(o), E(i);
				var s = I(i, 2), c = (e) => {
					var t = lg(), n = N(t), r = I(n);
					K(r), E(t), L((e, t) => {
						U(n, `${e ?? ""} `), J(r, "max", t), q(r, z(M).frame.w);
					}, [() => Y("lbl.length"), () => Math.max(1, Math.round(100 - z(M).frame.x))]), B("change", r, (e) => tr("w", Math.max(1, Math.min(Number(e.target.value), 100 - z(M).frame.x)))), H(e, t);
				};
				W(s, (e) => {
					(z(M).props.kind === "line" || z(M).props.kind === "arrow") && e(c);
				});
				var l = I(s, 2), u = (e) => {
					var t = Mm(), n = N(t), r = I(n);
					K(r), E(t), L((e, i) => {
						J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).props.label ?? "");
					}, [() => Y("tip.shape.label"), () => Y("lbl.shapeLabel")]), B("change", r, (e) => R("label", e.target.value.trim() || void 0)), H(e, t);
				};
				W(l, (e) => {
					z(M).props.kind === "line" && e(u);
				});
				var d = I(l, 2), f = N(d);
				K(f);
				var p = I(f);
				E(d), ke(2), L((e, t, n, i, s) => {
					U(r, `${e ?? ""} `), U(a, `${t ?? ""} `), q(o, z(M).props.thickness), J(d, "title", n), wi(f, i), U(p, ` ${s ?? ""}`);
				}, [
					() => Y("lbl.color"),
					() => Y("lbl.thickness"),
					() => Y("tip.shape.fill"),
					() => !!z(M).props.fill,
					() => Y("lbl.filled")
				]), B("change", o, (e) => R("thickness", Number(e.target.value))), B("change", f, (e) => R("fill", e.target.checked ? z(M).props.color : null)), H(e, t);
			};
			W(n, (e) => {
				z(M).type === "text" ? e(r) : z(M).type === "calendar" ? e(i, 1) : z(M).type === "faq" ? e(a, 2) : z(M).type === "timeline" ? e(o, 3) : z(M).type === "quote" ? e(l, 4) : z(M).type === "stats" ? e(u, 5) : z(M).type === "ribbon" ? e(d, 6) : z(M).type === "table" ? e(f, 7) : z(M).type === "share" ? e(p, 8) : z(M).type === "countdown" ? e(m, 9) : z(M).type === "button" ? e(h, 10) : z(M).type === "image" ? e(g, 11) : z(M).type === "icon" ? e(_, 12) : z(M).type === "collection" ? e(v, 13) : z(M).type === "product" ? e(y, 14) : z(M).type === "cart" ? e(b, 15) : z(M).type === "gallery" ? e(ee, 16) : z(M).type === "shape" && e(te, 17);
			}), H(e, t);
		}, i = (e) => {
			var t = Yp(), n = P(t), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ k(() => z(M).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ k(() => Kn.has(z(M).type) ? [["wrap", Y("opt.fit.fluid")], ["shrink", Y("opt.fit.floor")]] : [["wrap", Y("opt.fit.wrap")], ["shrink", Y("opt.fit.shrink")]]);
				X(i, {
					get value() {
						return z(e);
					},
					get options() {
						return z(t);
					},
					onchange: (e) => qn(e)
				});
			}
			E(n);
			var a = I(n, 2), o = (e) => {
				var t = dg(), n = N(t), r = F(n, !0), i = I(n, 2);
				K(i);
				var a = F(I(i, 2));
				E(t), L((e, n, o, s) => {
					J(t, "title", e), U(r, n), q(i, o), U(a, `${s ?? ""} %`);
				}, [
					() => Y("tip.fitMin"),
					() => Y("lbl.fitMin"),
					() => Math.round((z(M).fitMin ?? .6) * 100),
					() => Math.round((z(M).fitMin ?? .6) * 100)
				]), B("input", i, (e) => Jn(e.target.valueAsNumber / 100)), H(e, t);
			};
			W(a, (e) => {
				z(M).fit === "shrink" && e(o);
			}), L((e, t) => {
				J(n, "title", e), U(r, `${t ?? ""} `);
			}, [() => Y("tip.fit"), () => Y("lbl.fit")]), H(e, t);
		}, a = (e) => {
			var t = pg(), n = P(t), r = N(n), i = I(r);
			{
				let e = /* @__PURE__ */ k(() => wa(z(M).animation) ? z(M).animation.type : "");
				X(i, {
					get value() {
						return z(e);
					},
					get options() {
						return Da;
					},
					onchange: (e) => Ma(e || null)
				});
			}
			E(n);
			var a = I(n, 2), o = (e) => {
				var t = fg(), n = P(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a), L((e, t) => {
					U(r, `${e ?? ""} `), q(i, z(M).animation.props.duration), U(o, `${t ?? ""} `), q(s, z(M).animation.props.delay);
				}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => Pa("duration", Number(e.target.value))), B("change", s, (e) => Pa("delay", Number(e.target.value))), H(e, t);
			}, s = /* @__PURE__ */ k(() => wa(z(M).animation));
			W(a, (e) => {
				z(s) && e(o);
			});
			var c = I(a, 2), l = N(c), u = I(l);
			{
				let e = /* @__PURE__ */ k(() => z(M).hover?.type ?? (z(M).animation && !wa(z(M).animation) ? z(M).animation.type : ""));
				X(u, {
					get value() {
						return z(e);
					},
					get options() {
						return Oa;
					},
					onchange: (e) => Na(e || null)
				});
			}
			E(c), L((e, t, i, a) => {
				J(n, "title", e), U(r, `${t ?? ""} `), J(c, "title", i), U(l, `${a ?? ""} `);
			}, [
				() => Y("tip.props.blockAnim"),
				() => Y("lbl.animIn"),
				() => Y("tip.props.blockHover"),
				() => Y("lbl.onHover")
			]), H(e, t);
		}, o = (e) => {
			var t = Pr(), n = P(t), r = (e) => {
				var t = Xm(), n = P(t), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var a = I(n, 2), o = (e) => {
					var t = hg(), n = P(t), r = N(n), i = I(r);
					{
						let e = /* @__PURE__ */ k(() => z(M).sticky.mode ?? "scroll"), t = /* @__PURE__ */ k(() => [["scroll", Y("opt.sticky.modeScroll")], ["screen", Y("opt.sticky.modeScreen")]]);
						X(i, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => kn(`edit:${z(M).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = mg(), n = N(t), r = I(n);
						K(r), E(t), L((e, i) => {
							J(t, "title", e), U(n, `${i ?? ""} `), q(r, z(M).sticky.offset ?? 16);
						}, [() => z(M).sticky.mode === "screen" ? Y("tip.stickyEdge") : Y("tip.stickyOffset"), () => z(M).sticky.mode === "screen" ? Y("lbl.stickyEdge") : Y("lbl.stickyOffset")]), B("change", r, (e) => kn(`edit:${z(M).blockId}`, (t) => {
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
						var t = mm(), n = N(t), r = I(n);
						{
							let e = /* @__PURE__ */ k(() => z(M).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ k(() => En.map(([e, t]) => [e, Y(t)]));
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => kn(`edit:${z(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						E(t), L((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.stickyDock"), () => Y("lbl.stickyDock")]), H(e, t);
					}, l = (e) => {
						var t = mm(), n = N(t), r = I(n);
						{
							let e = /* @__PURE__ */ k(() => z(M).sticky.until ?? ""), t = /* @__PURE__ */ k(Dn);
							X(r, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => kn(`edit:${z(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						E(t), L((e, r) => {
							J(t, "title", e), U(n, `${r ?? ""} `);
						}, [() => Y("tip.stickyUntil"), () => Y("lbl.stickyUntil")]), H(e, t);
					};
					W(s, (e) => {
						z(M).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), L((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.stickyMode"), () => Y("lbl.stickyMode")]), H(e, t);
				};
				W(a, (e) => {
					z(M).sticky && e(o);
				}), L((e, t, a) => {
					J(n, "title", e), wi(r, t), U(i, ` ${a ?? ""}`);
				}, [
					() => Y("tip.sticky"),
					() => !!z(M).sticky,
					() => Y("lbl.sticky")
				]), B("change", r, (e) => kn(`edit:${z(M).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), H(e, t);
			};
			W(n, (e) => {
				z(Ne) === "desktop" && e(r);
			}), H(e, t);
		}, l = (e) => {
			var t = _g(), n = P(t), r = (e) => {
				var t = gg(), n = N(t), r = N(n, !0), i = I(r);
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
				K(y), E(_), E(t), L((e, t, n, a, c, d, _) => {
					U(r, e), q(i, z(M).frame.x), U(o, t), q(s, z(M).frame.y), U(l, n), q(u, z(M).frame.w), U(f, a), q(p, z(M).frame.h), J(m, "title", c), U(h, d), q(g, z(M).frame.z ?? 1), U(v, _), q(y, z(M).frame.rot ?? 0);
				}, [
					() => Y("frame.x"),
					() => Y("frame.y"),
					() => Y("frame.w"),
					() => Y("frame.h"),
					() => Y("tip.frameZ"),
					() => Y("frame.z"),
					() => Y("frame.rot")
				]), B("change", i, (e) => tr("x", Number(e.target.value))), B("change", s, (e) => tr("y", Number(e.target.value))), B("change", u, (e) => tr("w", Number(e.target.value))), B("change", p, (e) => tr("h", Number(e.target.value))), B("change", g, (e) => tr("z", Number(e.target.value))), B("change", y, (e) => tr("rot", Number(e.target.value))), H(e, t);
			};
			W(n, (e) => {
				z(Ne) === "desktop" && e(r);
			});
			var i = I(n, 2), a = N(i);
			K(a);
			var o = I(a);
			E(i), L((e, t) => {
				J(i, "title", e), wi(a, z(M).decor), U(o, ` ${t ?? ""}`);
			}, [() => Y("tip.decor"), () => Y("lbl.decor")]), B("change", a, (e) => Fr(e.target.checked)), H(e, t);
		}, u = (e) => {
			var t = vg(), n = P(t);
			i(n);
			var r = I(n, 2), s = N(r);
			K(s);
			var u = I(s);
			E(r);
			var d = I(r, 2);
			o(d);
			var f = I(d, 2);
			{
				let e = /* @__PURE__ */ k(() => Y("group.motion")), t = /* @__PURE__ */ k(wn);
				c(f, () => "motion", () => z(e), () => z(t), () => a);
			}
			var p = I(f, 2);
			{
				let e = /* @__PURE__ */ k(() => Y("group.placement"));
				c(p, () => "frame", () => z(e), () => z(Ne) === "desktop" ? `${z(M).frame.w} % × ${z(M).frame.h}` : "", () => l);
			}
			L((e, t) => {
				J(r, "title", e), wi(s, z(M).hideMobile), U(u, ` ${t ?? ""}`);
			}, [() => Y("tip.hideMobile"), () => Y("lbl.hideMobile")]), B("change", s, (e) => zr(e.target.checked)), H(e, t);
		}, d = (e) => {
			let t = /* @__PURE__ */ k(() => _p(z(M).props.design));
			var n = xg(), r = N(n), i = N(r), a = F(i, !0), o = F(I(i, 2));
			E(r), Yr(I(r, 2), 17, bp, (e) => e.view ?? "plain", (e, n) => {
				var r = bg(), i = P(r), a = (e) => {
					var t = Ph(), r = F(t, !0);
					L((e) => U(r, e), [() => Y(Ln[z(n).view])]), H(e, t);
				};
				W(i, (e) => {
					z(n).view && e(a);
				});
				var o = I(i, 2);
				Yr(o, 21, () => z(n).designs, (e) => e.id, (e, n) => {
					var r = yg();
					let i;
					var a = N(r);
					G(a, () => Wp(z(n).id), !0), E(a);
					var o = F(I(a, 2), !0);
					E(r), L((e, a) => {
						i = _i(r, 1, "footer-tp svelte-1n46o8q", null, i, { on: z(n).id === z(t).id }), J(r, "aria-pressed", z(n).id === z(t).id), J(r, "title", e), U(o, a);
					}, [() => Y(z(n).labelKey), () => Y(z(n).labelKey)]), B("click", r, () => Hn(z(n).id)), H(e, r);
				}), E(o), H(e, r);
			}), E(n), L((e, t, n) => {
				U(a, e), U(o, `${t ?? ""}: ${n ?? ""}`);
			}, [
				() => Y("menu.back"),
				() => Y("calendar.design"),
				() => Y(z(t).labelKey)
			]), B("click", i, () => j(bn, null)), H(e, n);
		};
		var p = Bm(), m = P(p), h = (e) => {
			d(e);
		}, _ = /* @__PURE__ */ k(() => Cn()), v = (e) => {
			var t = Dg();
			Yr(t, 21, vn, (e) => e.id, (e, t) => {
				var n = Eg(), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
					var n = Sg(), r = F(n, !0);
					L(() => U(r, z(t).value)), B("click", n, function(...e) {
						z(t).run?.apply(this, e);
					}), H(e, n);
				}, s = (e) => {
					var n = Cg();
					K(n), L(() => {
						J(n, "min", z(t).min), J(n, "max", z(t).max), q(n, z(t).value), J(n, "aria-label", z(t).label);
					}), B("change", n, (e) => z(t).set(e.target.value)), H(e, n);
				}, c = (e) => {
					var n = Tg();
					Yr(n, 21, () => z(t).options, ([e, t]) => e, (e, n) => {
						var r = /* @__PURE__ */ k(() => g(z(n), 2));
						let i = () => z(r)[0], a = () => z(r)[1];
						var o = wg();
						let s;
						var c = F(o, !0);
						L(() => {
							J(o, "aria-pressed", z(t).value === i()), s = _i(o, 1, "svelte-1n46o8q", null, s, { on: z(t).value === i() }), U(c, a());
						}), B("click", o, () => z(t).set(i())), H(e, o);
					}), E(n), L(() => J(n, "aria-label", z(t).label)), H(e, n);
				};
				W(a, (e) => {
					z(t).kind === "open" ? e(o) : z(t).kind === "number" ? e(s, 1) : e(c, -1);
				}), E(n), L(() => U(i, z(t).label)), H(e, n);
			}), E(t), H(e, t);
		};
		W(m, (e) => {
			z(_) ? e(h) : e(v, -1);
		});
		var y = I(m, 2), te = (e) => {
			var t = Og(), i = N(t), a = N(i), o = F(a, !0), s = I(a);
			n(s), E(i);
			var c = I(i, 2), l = N(c), d = F(l, !0), f = I(l);
			r(f), E(c);
			var p = I(c, 2), m = N(p), h = F(m, !0), g = I(m);
			u(g), E(p), E(t), L((e, t, n) => {
				U(o, e), U(d, t), U(h, n);
			}, [
				() => Y("props.tabContent"),
				() => Y("props.tabStyle"),
				() => Y("props.tabPlacement")
			]), H(e, t);
		}, ne = /* @__PURE__ */ k(() => !Cn() && t()), re = (e) => {
			var t = kg(), i = P(t), a = N(i), o = N(a);
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
				z(Qn) === "content" ? e(_) : z(Qn) === "style" ? e(v, 1) : e(y, -1);
			}), L((e, t, n) => {
				s = _i(o, 1, "svelte-1n46o8q", null, s, { on: z(Qn) === "content" }), U(c, e), d = _i(l, 1, "svelte-1n46o8q", null, d, { on: z(Qn) === "style" }), U(f, t), m = _i(p, 1, "svelte-1n46o8q", null, m, { on: z(Qn) === "placement" }), U(h, n);
			}, [
				() => Y("props.tabContent"),
				() => Y("props.tabStyle"),
				() => Y("props.tabPlacement")
			]), B("click", o, () => j(Qn, "content")), B("click", l, () => j(Qn, "style")), B("click", p, () => j(Qn, "placement")), H(e, t);
		}, ie = /* @__PURE__ */ k(() => !Cn());
		W(y, (e) => {
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
	}, m = (e) => `<svg width="48" height="34" viewBox="0 0 48 34" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${e}</svg>`, _ = {
		card: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"24\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.18\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		flat: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M15 13h18M15 19h14M15 25h16\" stroke-opacity=\"0.8\"/>"),
		pills: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"10\" y=\"7\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.35\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><rect x=\"10\" y=\"25\" width=\"28\" height=\"6\" rx=\"3\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/>"),
		lines: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><path d=\"M12 12h24M12 21h24M12 30h24\" stroke-opacity=\"0.8\"/>"),
		flyout: m("<path d=\"M14 1h20\" stroke-opacity=\"0.5\"/><rect x=\"1\" y=\"6\" width=\"46\" height=\"24\" fill=\"currentColor\" fill-opacity=\"0.12\" stroke=\"none\"/><path d=\"M6 13h10M6 19h8M22 13h10M22 19h8M38 13h6M38 19h4\" stroke-opacity=\"0.8\"/>")
	}, v = {
		grid: m("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"19\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"32\" y=\"6\" width=\"10\" height=\"10\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M7 20h8M20 20h8M33 20h8\" stroke-opacity=\"0.7\"/><path d=\"M6 26h10M19 26h10M32 26h10\" stroke-opacity=\"0.35\"/>"),
		list: m("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"6\" y=\"17\" width=\"7\" height=\"7\" rx=\"2\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M17 9.5h24M17 20.5h18\" stroke-opacity=\"0.7\"/>"),
		cover: m("<rect x=\"1\" y=\"1\" width=\"46\" height=\"32\" rx=\"3\" stroke-opacity=\"0.35\"/><rect x=\"6\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"12\" rx=\"2.5\" fill=\"currentColor\" fill-opacity=\"0.3\" stroke=\"none\"/><path d=\"M6 14h16M26 14h16\" stroke-opacity=\"0.55\" stroke-width=\"3\"/><path d=\"M6 23h12M26 23h12\" stroke-opacity=\"0.35\"/>")
	}, y = (e) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">${e}</svg>`, b = {
		dot: y("<circle cx=\"12\" cy=\"12\" r=\"3\"/>"),
		dash: y("<rect x=\"3\" y=\"10.6\" width=\"18\" height=\"2.8\" rx=\"1.4\"/>"),
		slash: y("<path d=\"M15.5 3.5L8.5 20.5\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" fill=\"none\"/>"),
		star: y("<path d=\"M12 2.8l2.3 6.1 6.5.4-5 4.1 1.6 6.3-5.4-3.5-5.4 3.5 1.6-6.3-5-4.1 6.5-.4z\"/>"),
		none: y("<path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\" opacity=\"0.35\"/><path d=\"M6 6l12 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"),
		custom: y("<path d=\"M5 8h14M5 12h9M5 16h12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>")
	}, x = /* @__PURE__ */ k(() => [
		["text", Y("opt.ribbonStripe.text")],
		["marks", Y("opt.ribbonStripe.marks")],
		["plain", Y("opt.ribbonStripe.plain")]
	]), S = /* @__PURE__ */ k(() => [["none", Y("common.none")], ...z(x)]), ee = /* @__PURE__ */ k(() => [
		["dot", Y("opt.ribbonSep.dot")],
		["dash", Y("opt.ribbonSep.dash")],
		["slash", Y("opt.ribbonSep.slash")],
		["star", Y("opt.ribbonSep.star")],
		["none", Y("common.none")],
		["custom", Y("opt.ribbonSep.custom")]
	]), te = /* @__PURE__ */ A("");
	function ne() {
		z(te).trim() && (j(Ts, z(te), !0), j(Es, null), Ms() !== !1 && j(te, ""));
	}
	let re = [
		["color", Cu],
		["gradient", Fu],
		["glow", Iu],
		["image", jd],
		["slideshow", vf],
		["video", Lf],
		["pattern", Yu],
		["grain", Ru]
	], ie = Object.fromEntries(re), C = {
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
	}, ae = [
		["purple", Y("adminTheme.purple")],
		["well", Y("adminTheme.well")],
		["gold", Y("adminTheme.gold")],
		["grey", Y("adminTheme.grey")],
		["aurora", Y("adminTheme.aurora")],
		["dusk", Y("adminTheme.dusk")],
		["ember", Y("adminTheme.ember")]
	], oe = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, se = /* @__PURE__ */ A(nn((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return oe[e] ?? e ?? "grey";
	})()));
	Sn(() => {
		document.documentElement.dataset.adminTheme = z(se), localStorage.setItem("urd-admin-theme", z(se)), ce();
	});
	function ce() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		it?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": le(t)
		});
	}
	function le(e) {
		return xu(e) == null || (Su(e, "#ffffff") ?? 0) >= (Su(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let ue = /* @__PURE__ */ A(null), w = /* @__PURE__ */ A(null), de = /* @__PURE__ */ A(!1), fe = /* @__PURE__ */ A(""), pe = /* @__PURE__ */ A("info"), me = 0;
	function T(e, t = "info") {
		j(fe, e, !0), j(pe, t, !0);
		let n = ++me;
		t === "ok" && setTimeout(() => {
			me === n && (j(fe, ""), j(pe, "info"));
		}, 8e3);
	}
	function he() {
		T(Y("status.storageFull"), "error");
	}
	function ge(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			he();
		}
	}
	let _e = /* @__PURE__ */ A(null), ve = /* @__PURE__ */ A(null), ye = /* @__PURE__ */ A(nn({
		size: 16,
		snap: !0
	})), be = /* @__PURE__ */ A(!0), xe = /* @__PURE__ */ A(nn(Jo(typeof window < "u" ? window : null) ?? 1920)), Se = "urd-admin-screen";
	function Ce() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(Se) ?? "null");
		} catch {
			e = null;
		}
		return Yo(e, z(xe));
	}
	let we = /* @__PURE__ */ A(nn(Ce()));
	function Te(e) {
		j(we, Yo({
			...qe(z(we)),
			...e
		}, z(xe)), !0);
		try {
			localStorage.setItem(Se, JSON.stringify(z(we)));
		} catch {}
	}
	let Ee = /* @__PURE__ */ k(() => Xo(z(we), z(xe))), De = [
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
	], Oe = /* @__PURE__ */ k(() => [{
		id: "desktop",
		width: z(Ee).width,
		height: z(Ee).height || null,
		viewport: "desktop"
	}, ...De]);
	function Ae(e) {
		let t = is(z(lc), z(uc), e.width).width;
		return Y(e.id === "desktop" ? z(we).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let je = /* @__PURE__ */ A("desktop"), Me = /* @__PURE__ */ k(() => z(Oe).find((e) => e.id === z(je)) ?? z(Oe)[0]), Ne = /* @__PURE__ */ k(() => z(Me).viewport === "mobile" || z(Me).width <= (z(O)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), Pe = /* @__PURE__ */ A(null), Fe = /* @__PURE__ */ A(0), Ie = /* @__PURE__ */ A(0), Le = /* @__PURE__ */ A("fit"), Re = /* @__PURE__ */ A(1), ze = /* @__PURE__ */ k(() => rs(z(lc), z(uc))), Be = /* @__PURE__ */ k(() => z(Me).width), Ve = /* @__PURE__ */ k(() => z(Me).height ?? 0), He = /* @__PURE__ */ k(() => z(Le) === "manual" ? z(Re) : Vo(z(Fe), z(Be), "fit", z(Ie), z(Ve)));
	function Ue(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(z(He) * 100) / 10) + e) * 10));
		j(Re, t / 100), j(Le, "manual");
	}
	let We = /* @__PURE__ */ k(() => z(Ve) > 0 ? z(Ve) : z(He) > 0 ? z(Ie) / z(He) : z(Ie)), Ge = /* @__PURE__ */ k(() => z(Be) * z(He)), Ke = /* @__PURE__ */ k(() => z(Ve) > 0 ? z(Ve) * z(He) : z(Ie)), Je = /* @__PURE__ */ k(() => z(Ge) > z(Fe) + 1 || z(Ke) > z(Ie) + 1);
	Sn(() => {
		let e = () => it?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Sn(() => {
		let e = z(Ne);
		it?.sendViewport(e);
	}), Sn(() => {
		let e = z(He);
		it?.sendZoom(e);
	}), Sn(() => {
		let e = () => {
			j(xe, Jo(window) ?? z(xe), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Sn(() => {
		let e = z(Pe);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			j(Fe, e.clientWidth, !0), j(Ie, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Ye = /* @__PURE__ */ A(0);
	function Xe() {
		j(Ye, D?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function $e() {
		let e = D?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		j(je, "mobile"), e && setTimeout(() => it?.sendScrollSection(e.id), 0);
	}
	function et(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			gt("layout");
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
			}, nt(t, "layout-changed"), e.sectionId === z(Kr) && j(Jr, e.minHeight, !0), z(M)?.sectionId === e.sectionId && on(), D.save(), dt(), it?.sendSection(z(w), t);
		}
	}
	function tt(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function nt(e, t) {
		e && tt(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Xe(), it?.sendAttention(e.id, !0)));
	}
	let D = null, rt = null, it = null, O = /* @__PURE__ */ A(null);
	function at() {
		j(O, rt.data, !0), rt.replace(z(O));
	}
	function ot() {
		it?.sendSite(qe(z(O)));
	}
	let lt = /* @__PURE__ */ new Set(), ut = () => z(O).pages.find((e) => e.id === z(w));
	function dt() {
		let e = z(O)?.pages?.some((e) => !lt.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Rl?.hasDraft() || Object.values(zl).some((e) => e.hasDraft()), n = Jl?.hasDraft() || Object.values(Yl).some((e) => e.hasDraft());
		j(de, e || D?.hasDraft() && !lt.has(z(w)) || rt?.hasDraft() || Ju?.hasDraft() || t || n || !1, !0);
	}
	let ft = [], pt = [], mt = null;
	function ht() {
		return JSON.stringify({
			pageId: z(w),
			page: D.data,
			site: rt.data,
			collectionsIndex: Vl ? Rl.data : null,
			collections: Vl ? Object.fromEntries(Object.entries(zl).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: Zl ? Jl.data : null,
			templates: Zl ? Object.fromEntries(Object.entries(Yl).map(([e, t]) => [e, t.data])) : {},
			plugins: Ju?.data ?? null
		});
	}
	function gt(e) {
		(e !== mt || !e.startsWith("edit:") && !e.startsWith("grid:")) && (ft.push(ht()), ft.length > 50 && ft.shift(), pt.length = 0, mt = e);
	}
	function _t(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (rt.replace(r), at(), rt.save(), j(ye, {
			snap: !0,
			...z(O).grid
		}, !0), ot(), vt(i, a ?? {}), yt(o, s ?? {}), xt(c), t && t !== z(w) && z(O).pages.some((e) => e.id === t)) {
			ge(`urd-draft-${t}`, JSON.stringify(n)), Do(t, { keepHistory: !0 }), dt();
			return;
		}
		D.replace(n), D.save(), dt(), Xe(), on(), ni(D.data.sections.find((e) => e.id === z(Kr))), z(O).pages.some((e) => e.id === z(w)) ? it?.sendPage(z(w), D.data) : Do(z(O).pages[0].id, { keepHistory: !0 });
	}
	function vt(e, t) {
		if (Rl && e && JSON.stringify({
			index: Rl.data,
			collections: Object.fromEntries(Object.entries(zl).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			Rl.replace(e), Rl.save();
			for (let e of Object.keys(zl)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete zl[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!zl[e]) {
					let t = Bl[e] ?? null;
					zl[e] = sa(`urd-draft-collection-${e}`, () => t, he, `urd-draft-samling-${e}`);
				}
				zl[e].replace(n), zl[e].save();
			}
			j(Hl, [...e.samlinger ?? []], !0), z(Wl) && !z(Hl).includes(z(Wl)) && j(Wl, null), uu();
		}
	}
	function yt(e, t) {
		if (Jl && e && JSON.stringify({
			index: Jl.data,
			templates: Object.fromEntries(Object.entries(Yl).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			Jl.replace(e), Jl.save();
			for (let e of Object.keys(Yl)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Yl[e]);
			for (let [e, n] of Object.entries(t)) Yl[e] || (Yl[e] = sa(`urd-draft-template-${e}`, () => Xl[e] ?? null, he, `urd-draft-mal-${e}`)), Yl[e].replace(n), Yl[e].save();
			j(Ql, [...e.maler ?? []], !0), dt(), eu();
		}
	}
	function xt(e) {
		Ju && e && JSON.stringify(Ju.data) !== JSON.stringify(e) && (Ju.replace(e), Ju.save(), dd(), bd());
	}
	function St() {
		ft.length && (Fn(), pt.push(ht()), _t(ft.pop()), mt = null, T(Y("status.undone")));
	}
	function Ct() {
		pt.length && (Fn(), ft.push(ht()), _t(pt.pop()), mt = null, T(Y("status.redone")));
	}
	function wt(e) {
		z(cn) && (e.target instanceof Element && e.target.closest(".block-menu") || j(cn, null));
	}
	function Tt(e) {
		if (e.key === "Escape" && z(cn)) {
			j(cn, null);
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
			].includes(t.type)) || !z(M) || z(Ne) === "mobile") return;
			e.preventDefault(), it?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Ct() : St());
	}
	async function Et() {
		j(ue, Js(await (await fetch("/content/site.json")).json()), !0), rt = sa("urd-draft-site", () => z(ue), he), (rt.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${rt.data.schemaVersion} (the engine has 4) and is discarded`), rt.replace(qe(z(ue)))), rt.replace(Js(rt.data)), rt.save(), at(), j(ye, {
			snap: !0,
			...z(O).grid
		}, !0), await Do(new URLSearchParams(location.search).get("page") ?? z(O).pages[0].id), await hd(), await lu(), await $l(), await Qa(), z(ve) && eo(), tn(), z(O).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (j(Nt, z(O).site.title, !0), j(Pt, z(O).theme.tokens.color.accent, !0), j(Ft, z(O).theme.tokens.color.bg, !0), j(Mt, !0));
	}
	let Dt = /* @__PURE__ */ A(null);
	function Ot({ title: e, lines: t = [], okLabel: n = Y("confirm.ok"), cancelLabel: r = Y("confirm.cancel") }) {
		return new Promise((i) => {
			j(Dt, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function kt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Y("confirm.ok"), cancelLabel: a = Y("confirm.cancel") }) {
		return new Promise((o) => {
			j(Dt, {
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
	function At(e) {
		z(Dt)?.resolve(z(Dt).prompt ? e ? z(Dt).value : null : e), j(Dt, null);
	}
	let jt = !1;
	Sn(() => {
		if (!z(Dt)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), At(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let Mt = /* @__PURE__ */ A(!1), Nt = /* @__PURE__ */ A(""), Pt = /* @__PURE__ */ A("#7c5cff"), Ft = /* @__PURE__ */ A("#0b0e14");
	function It() {
		localStorage.setItem("urd-setup-done", "1"), j(Mt, !1);
	}
	function Lt() {
		let e = z(Nt).trim();
		e && (bs("setup", () => {
			z(O).site.title = e, z(O).nav.logo = {
				type: "text",
				value: e
			}, z(O).theme.tokens.color.accent = z(Pt), z(O).theme.tokens.color.bg = z(Ft), delete z(O).site.setup;
		}), It(), T(Y("status.setupDone"), "ok"));
	}
	let Rt = "urd-admin-panels", zt = "urd-admin-panel-open", Bt = /* @__PURE__ */ A(nn(localStorage.getItem(Rt) === "reset" ? "reset" : "remember"));
	function Vt(e) {
		j(Bt, e === "reset" ? "reset" : "remember", !0), z(Bt) === "reset" ? localStorage.setItem(Rt, "reset") : localStorage.removeItem(Rt);
	}
	let Ht = /* @__PURE__ */ A(nn(z(Bt) === "reset" ? null : localStorage.getItem(zt))), Ut = [
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
	], Wt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Gt = Object.fromEntries(Ut.flat().map((e) => [e, Y(`panel.${e}`)]));
	z(Ht) && !Gt[z(Ht)] && j(Ht, null), Sn(() => {
		if (z(Bt) === "reset") {
			localStorage.removeItem(zt);
			return;
		}
		z(Ht) ? localStorage.setItem(zt, z(Ht)) : localStorage.removeItem(zt);
	});
	let Kt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, qt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Jt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Yt(e, t) {
		let n = [];
		for (let r of e) for (let e of td[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (qt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Xt() {
		let e = Jt([...qt, ...Yt(z(cd), "admin")]);
		return Qt === "auto" || e.some(([e]) => e === Qt) ? e : [[Qt, Qt], ...e];
	}
	let Zt = () => Yt(z(ed)?.enabled ?? [], "site"), Qt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function $t(e) {
		e !== Qt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function en(e) {
		j(Ht, z(Ht) === e ? null : e, !0), tn();
	}
	function tn() {
		z(Ht) === "history" && ao(), z(Ht) === "update" && !z(vo) && bo();
	}
	let M = /* @__PURE__ */ A(null);
	function an(e, t) {
		let n = D?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function on() {
		if (!z(M)) return;
		let { block: e } = an(z(M).sectionId, z(M).blockId);
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
	function sn(e) {
		if (j(cn, null), !e.blockId) {
			j(M, null);
			return;
		}
		j(M, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && j(Kr, e.sectionId, !0), on();
	}
	let cn = /* @__PURE__ */ A(null), ln = "urd-admin-menu-width", un = /* @__PURE__ */ A(nn(localStorage.getItem(ln) === "narrow" ? "narrow" : "wide")), dn = /* @__PURE__ */ A(localStorage.getItem(ln) !== "narrow");
	function fn(e) {
		j(un, e === "narrow" ? "narrow" : "wide", !0), j(dn, z(un) === "wide"), z(un) === "narrow" ? localStorage.setItem(ln, "narrow") : localStorage.removeItem(ln);
	}
	let pn = new ra(), mn = /* @__PURE__ */ A(8), hn = /* @__PURE__ */ A(nn(Infinity));
	function gn() {
		let e = z(Pe)?.getBoundingClientRect().left ?? 0;
		j(mn, Math.round(e) + 8), j(hn, window.innerWidth - z(mn) - 8);
	}
	let _n = /* @__PURE__ */ k(() => z(dn) && z(hn) >= 740);
	Sn(() => {
		if (z(cn)) return gn(), window.addEventListener("resize", gn), () => window.removeEventListener("resize", gn);
	});
	function vn() {
		let e = z(M), t = [];
		e.type === "calendar" && (t.push({
			id: "design",
			label: Y("calendar.design"),
			kind: "open",
			value: Y(_p(e.props.design).labelKey),
			run: () => j(bn, e.blockId, !0)
		}), [
			"list",
			"cards",
			"agenda"
		].includes(vp(e.props)) && t.push({
			id: "limit",
			label: Y("lbl.maxCount"),
			kind: "number",
			min: 1,
			max: 50,
			value: e.props.limit ?? 6,
			set: (e) => R("limit", Math.max(1, Math.min(50, Number(e) || 6)))
		}), t.push({
			id: "subscribe",
			label: Y("quick.subscribe"),
			kind: "choice",
			value: e.props.showSubscribe === !1 ? "off" : "on",
			options: [["on", Y("common.on")], ["off", Y("common.off")]],
			set: (e) => R("showSubscribe", e === "on")
		}));
		let n = Kn.has(e.type);
		return t.push({
			id: "fit",
			label: Y("quick.fit"),
			kind: "choice",
			value: e.fit === "shrink" ? "shrink" : "wrap",
			options: n ? [["wrap", Y("quick.fit.fluid")], ["shrink", Y("quick.fit.floor")]] : [["wrap", Y("quick.fit.wrap")], ["shrink", Y("quick.fit.shrink")]],
			set: (e) => qn(e)
		}), t.push({
			id: "phone",
			label: Y("quick.phone"),
			kind: "choice",
			value: e.hideMobile ? "off" : "on",
			options: [["on", Y("quick.phone.show")], ["off", Y("quick.phone.hide")]],
			set: (e) => zr(e === "off")
		}), t;
	}
	function yn() {
		let e = z(M).props, t = _p(e.design), n = (e, t) => () => An(e, t), r = vp(e), i = r === "agenda" ? 8 : 6, a = r === "next" ? 3 : void 0, o = e.switcher === !0 || e.showMore === !1 || (e.limit ?? 6) !== i || e.nextCount !== a || e.laterCount !== a || e.showCancelled === !1 || e.structuredData === !1 || e.clock != null || e.weekStart != null, s = [
			!t.ownFilter && e.showCategories !== !1,
			e.showSubscribe !== !1,
			e.showSignup === !0,
			e.showPlaces === !0,
			e.showSearch === !0,
			e.showEarlier === !0
		].filter(Boolean).length, c = s > 0 || e.showOpen === !1 || !!e.programHref, l = !!e.emptyText || e.emptyIcon != null && e.emptyIcon !== "calendar", u = pp(e.design).filter((t) => e.options?.[t.key] != null).length + (gp(e) === 1 ? 0 : 1), d = t.slots.filter((t) => e.colors?.[t.key]).length, f = Object.keys(e.fieldStyle ?? {}).length;
		return {
			sources: String((e.sources ?? []).length),
			view: Y(Ln[vp(e)]),
			viewReset: o ? n("cal-view", {
				switcher: void 0,
				showMore: void 0,
				limit: i,
				nextCount: a,
				laterCount: a,
				showCancelled: void 0,
				structuredData: void 0,
				clock: void 0,
				weekStart: void 0
			}) : null,
			buttons: s ? Y("menu.onCount", { n: s }) : Y("common.off"),
			buttonsReset: c ? n("cal-buttons", {
				showCategories: !1,
				showSubscribe: !1,
				showSignup: !1,
				showPlaces: void 0,
				showSearch: void 0,
				showEarlier: void 0,
				showOpen: void 0,
				programHref: void 0
			}) : null,
			empty: e.emptyText || Y("menu.standard"),
			emptyReset: l ? n("cal-empty", {
				emptyText: void 0,
				emptyIcon: void 0
			}) : null,
			notice: e.notice?.show === !0 ? Y("common.on") : Y("common.off"),
			noticeReset: e.notice ? n("cal-notice", { notice: void 0 }) : null,
			opts: u ? Y("menu.changed", { n: u }) : Y("menu.standard"),
			optsReset: u ? n("cal-opts", {
				options: void 0,
				scale: void 0
			}) : null,
			colors: d ? Y("menu.changedOf", {
				n: d,
				m: t.slots.length
			}) : Y("menu.standard"),
			colorsReset: d ? n("cal-colors", { colors: void 0 }) : null,
			stripe: wp(t, e.stripe).show ? Y("common.on") : Y("common.off"),
			stripeReset: e.stripe ? n("cal-stripe", { stripe: void 0 }) : null,
			fields: f ? Y("menu.changed", { n: f }) : Y("menu.standard"),
			fieldsReset: f ? n("cal-fields", { fieldStyle: void 0 }) : null
		};
	}
	let bn = /* @__PURE__ */ A(null), xn = !1;
	Sn(() => {
		z(bn) && z(M)?.blockId !== z(bn) && j(bn, null);
		let e = !!z(cn);
		xn && !e && j(bn, null), xn = e;
	});
	let Cn = () => z(M)?.type === "calendar" && z(bn) === z(M).blockId;
	function wn() {
		let e = wa(z(M).animation) ? z(M).animation.type : z(M).hover?.type, t = e ? [...Da, ...Oa].find(([t]) => t === e) : null;
		return t ? t[1] : Y("common.none");
	}
	let Tn = window.matchMedia("(prefers-reduced-motion: reduce)").matches, En = [
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
	function Dn() {
		let e = D?.data.sections ?? [], t = e.findIndex((e) => e.id === z(M)?.sectionId);
		return t < 0 ? [["", Y("opt.sticky.ownSection")]] : [["", Y("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Y("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function On(e) {
		if (sn(e), !z(M)) return;
		gn();
		let t = Math.min(z(dn) && z(hn) >= 740 ? 740 : 400, window.innerWidth - 16), n = z(_e)?.getBoundingClientRect();
		if (!n) return;
		let r = n.left + z(He) * e.rect.right + 12;
		r + t > window.innerWidth - 8 && (r = Math.max(8, n.left + z(He) * e.rect.left - t - 12));
		let i = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, a = Math.min(Math.max(8, n.top + z(He) * e.rect.top), Math.max(8, i));
		j(cn, {
			left: r,
			top: a
		}, !0);
	}
	function kn(e, t) {
		let { section: n, block: r } = an(z(M)?.sectionId, z(M)?.blockId);
		r && (e && gt(e), t(r, n), nt(n, "block-edited"), D.save(), dt(), it?.sendSection(z(w), n), on(), Pn(n.id, r));
	}
	function R(e, t) {
		kn(`edit:${z(M).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function An(e, t) {
		kn(`edit:${z(M).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let jn = /* @__PURE__ */ new Map(), Mn = /* @__PURE__ */ new Map(), Nn = 0;
	function Pn(e, t) {
		if (z(Ne) !== "desktop" || !Gf.has(t?.type)) return;
		clearTimeout(jn.get(t.id));
		let n = ++Nn;
		Mn.set(t.id, n), jn.set(t.id, setTimeout(() => it?.sendFitBlock(e, t.id, n), 60));
	}
	function Fn() {
		for (let e of jn.values()) clearTimeout(e);
		jn.clear(), Mn.clear();
	}
	let In = /* @__PURE__ */ A("title"), Ln = {
		list: "calendar.viewList",
		cards: "calendar.viewCards",
		month: "calendar.viewMonth",
		agenda: "calendar.viewAgenda",
		next: "calendar.viewNext",
		week: "calendar.viewWeek",
		day: "calendar.viewDay",
		year: "calendar.viewYear"
	};
	function Rn(e, t) {
		let n = { ...z(M).props.options ?? {} };
		t === e.def || t == null ? delete n[e.key] : n[e.key] = t, R("options", Object.keys(n).length ? n : void 0);
	}
	function zn(e, t) {
		return e.key === "firstMonth" && t === "now" ? Y("calendar.opt.firstMonth.now") : e.key === "firstMonth" ? new Intl.DateTimeFormat(Xi(), { month: "long" }).format(new Date(2024, Number(t), 1)) : Y(`${e.labelKey}.${t}`);
	}
	function Bn(e) {
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
	function Vn() {
		return z(M)?.props.fieldStyle?.[z(In)] ?? {};
	}
	function Hn(e) {
		let t = _p(e), n = t.view === "next" ? {
			nextCount: z(M).props.nextCount ?? 3,
			laterCount: z(M).props.laterCount ?? 3
		} : {}, r = t.id === "plain" && ![
			"list",
			"cards",
			"month",
			"agenda",
			"next"
		].includes(vp(z(M).props)) ? { view: "list" } : {};
		An("design", {
			design: t.id === "plain" ? void 0 : t.id,
			...t.view ? { view: t.view } : {},
			...r,
			...n
		}), j(bn, null);
	}
	function Un(e, t) {
		let n = { ...z(M).props.colors ?? {} };
		t ? n[e] = t : delete n[e], R("colors", Object.keys(n).length ? n : void 0);
	}
	function Wn(e) {
		let t = {
			...z(M).props.stripe ?? {},
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		R("stripe", Object.keys(t).length ? t : void 0);
	}
	function Gn(e) {
		let t = { ...z(M).props.fieldStyle ?? {} }, n = {
			...t[z(In)] ?? {},
			...e
		};
		for (let e of Object.keys(n)) n[e] === void 0 && delete n[e];
		Object.keys(n).length ? t[z(In)] = n : delete t[z(In)], R("fieldStyle", Object.keys(t).length ? t : void 0);
	}
	let Kn = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function qn(e) {
		kn(`edit:${z(M).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function Jn(e) {
		kn(`edit:${z(M).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let Yn = nn({}), Xn = nn({}), Zn = /* @__PURE__ */ A(!1), Qn = /* @__PURE__ */ A("content"), $n = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function er(e) {
		let t = z(M).blockId, n = `${t}:${e.key}`, r = (Yn[n] ?? z(M).props[e.key] ?? "").trim();
		Xn[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			An(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		j(Zn, !0), Xn[n] = {
			text: Y("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (z(M)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (An(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Xn[n] = null) : Xn[n] = {
				text: Yi(a) ?? Y("props.place.notFound"),
				err: !0
			};
		} catch {
			Xn[n] = {
				text: Y("props.place.failed"),
				err: !0
			};
		} finally {
			j(Zn, !1);
		}
	}
	function tr(e, t) {
		Number.isFinite(t) && kn(`edit:frame-${z(M).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function nr(e) {
		kn(`edit:${z(M).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let rr = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], ir = /* @__PURE__ */ new Set(["select", "radio"]), ar = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function or(e, t) {
		kn(`edit:${z(M).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			ir.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function sr(e, t) {
		or(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function cr() {
		kn("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: ar(),
				label: Y("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function lr(e) {
		kn("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function ur(e, t) {
		let n = e + t;
		kn("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	let dr = (e) => e && typeof e == "object" ? {
		url: e.url ?? "",
		name: e.name ?? "",
		color: e.color ?? ""
	} : {
		url: typeof e == "string" ? e : "",
		name: "",
		color: ""
	}, fr = ({ url: e, name: t, color: n }) => t || n ? {
		url: e,
		...t ? { name: t } : {},
		...n ? { color: n } : {}
	} : e;
	function mr(e, t) {
		kn(`edit:${z(M).blockId}:source${e}`, (n) => {
			let r = [...n.props.sources ?? []];
			r[e] = fr({
				...dr(r[e]),
				...t
			}), n.props.sources = r;
		});
	}
	function hr() {
		R("sources", [...z(M).props.sources ?? [], ""]);
	}
	function gr(e) {
		R("sources", (z(M).props.sources ?? []).filter((t, n) => n !== e));
	}
	let _r = /* @__PURE__ */ A(null);
	async function vr() {
		let e = /* @__PURE__ */ new Set(), t = (t) => {
			for (let n of t?.sections ?? []) for (let t of n.blocks ?? []) if (t.type === "calendar") for (let n of t.props?.sources ?? []) {
				let { url: t } = dr(n);
				t.trim() && e.add(t.trim());
			}
		};
		t(D?.data), await Promise.all((z(O).pages ?? []).filter((e) => e.id !== z(w)).map(async (e) => {
			try {
				let n = localStorage.getItem(`urd-draft-${e.id}`);
				t(n ? JSON.parse(n) : await (await fetch(`/${e.file}`)).json());
			} catch {}
		})), j(_r, [...e], !0);
	}
	function yr(e) {
		let t = z(M).props.sources ?? [];
		t.some((t) => dr(t).url === e) || R("sources", [...t, e]);
	}
	function br(e, t) {
		kn(`edit:${z(M).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function xr() {
		kn("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Y("seed.faq.newQ"),
				a: Y("seed.faq.answer")
			});
		});
	}
	function Cr(e) {
		kn("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Tr(e, t) {
		let n = e + t;
		kn("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Er(e, t) {
		kn(`edit:${z(M).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function Dr() {
		kn("ribbon-item", (e) => {
			(e.props.items ??= []).push(Y("seed.ribbonBlock.new"));
		});
	}
	function Or(e) {
		kn("ribbon-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function kr(e, t) {
		let n = e + t;
		kn("ribbon-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Ar(e, t) {
		kn(`edit:${z(M).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function jr() {
		kn("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Y("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function Mr(e) {
		kn("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function V(e, t) {
		let n = e + t;
		kn("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Fr(e) {
		kn("decor", (t) => {
			t.decor = e;
		});
	}
	function Ir(e, t) {
		kn(`edit:${z(M).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function Lr(e, t) {
		kn(`edit:${z(M).blockId}:share`, (n) => {
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
	function Rr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			R("src", String(n.result ?? "")), t.size > 4e5 && T(Y("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => T(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function zr(e) {
		let { section: t, block: n } = an(z(M)?.sectionId, z(M)?.blockId);
		n && (gt("hide-mobile"), n.hideMobile = e, D.save(), dt(), it?.sendSection(z(w), t), on());
	}
	async function Br(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Vi(t);
			kn(`edit:${z(M).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || qa(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			T(Hi(e), "error");
		}
	}
	async function Vr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Vi(t);
			kn(`edit:${z(M).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			T(Hi(e), "error");
		}
	}
	let Hr = {
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
	}, Ur = [
		["line", Y("shape.line")],
		["arrow", Y("shape.arrow")],
		["circle", Y("shape.circle")],
		["rect", Y("shape.rect")],
		["triangle", Y("shape.triangle")]
	], Wr = [
		["accent", Y("color.accent")],
		["text", Y("color.text")],
		["surface", Y("color.surface")],
		["bg", Y("color.bg")]
	], Kr = /* @__PURE__ */ A(null), qr = /* @__PURE__ */ A(null), Jr = /* @__PURE__ */ A(""), Xr = /* @__PURE__ */ A(nn([])), Zr = /* @__PURE__ */ A(null), Qr = /* @__PURE__ */ A(null), $r = /* @__PURE__ */ A(""), ei = /* @__PURE__ */ A(nn({}));
	function ni(e) {
		j(qr, e?.grid ? { ...e.grid } : null, !0), j(Jr, e?.size?.minHeight ?? "", !0), j(Xr, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), j(Zr, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), j(Qr, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), j($r, e?.theme ?? "", !0), j(ei, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let ri = /* @__PURE__ */ A(null), ii = nn({});
	function ai() {
		try {
			let e = ((z(_e)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${z(Kr)}"]`))?.getBoundingClientRect();
			j(ri, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			j(ri, null);
		}
	}
	Sn(() => {
		z(Kr), z(Xr), requestAnimationFrame(() => requestAnimationFrame(ai));
	}), Sn(() => {
		let e = z(_e);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => ai());
		return t.observe(e), () => t.disconnect();
	}), Sn(() => {
		for (let e of z(Xr)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !ii[t]) {
				let e = new Image();
				e.onload = () => {
					ii[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function oi(e) {
		li("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function si(e) {
		let t = z(ha), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? le(Mp(t.accent ?? "#000000", t))), r = bu(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function ci(e) {
		j(Kr, e.sectionId, !0), ni(D?.data.sections.find((t) => t.id === e.sectionId));
	}
	function li(e, t) {
		let n = D.data.sections.find((e) => e.id === z(Kr));
		n && (gt(e), t(n), D.save(), dt(), it?.sendSection(z(w), n), ni(n));
	}
	let di = /* @__PURE__ */ A("color");
	function fi(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: ie[t].version ?? 1,
				props: ie[t].defaults()
			});
		});
	}
	function pi(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function mi(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function hi(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function gi(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function vi(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				gi(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				gi(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let bi = (e) => Math.min(4, Math.max(.1, e));
	function xi(e, t, n, r) {
		gi(e, t, "size", bi(Math.round((n + r) * 100) / 100));
	}
	function Si(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && gi(e, t, "size", bi(r / 100));
	}
	function Ci(e, t, n, r) {
		let i = ii[n.props.src];
		if (!i?.w || !i?.h || !z(ri)?.w || !z(ri)?.h) return;
		let a = z(ri).h * i.w / (z(ri).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && gi(e, t, "fit", "plain"), gi(e, t, "size", bi(Math.round(o * 100) / 100));
	}
	function Ti(e) {
		return e.props;
	}
	function Ei(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function Di(e, t, n, r) {
		Ei(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let ki = {
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
	function Ai(e, t, n) {
		Ei(e, t, e.keyPrefix, (e) => {
			e.kind = n, ki[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function ji(e, t, n, r) {
		Ei(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Ni(e, t) {
		Ei(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Pi(e, t, n) {
		Ei(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Fi(e, t, n, r) {
		Ei(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Ii = /* @__PURE__ */ A(null);
	function Li(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		j(Ii, {
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
			j(Ii, {
				...z(Ii),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = z(Ii);
			if (j(Ii, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Fi(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Ri(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: ie[n].version ?? 1,
				props: ie[n].defaults()
			});
		});
	}
	async function zi(e, t) {
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
	async function Bi(e) {
		let t = await e.text(), n = Ua(t), r = Ga(t);
		if (!r) return n;
		let i = await zi(n.dataUrl, r);
		if (!i) return n;
		let a = Wa(t, i);
		if (a === t) return n;
		try {
			return Ua(a);
		} catch {
			return n;
		}
	}
	async function Vi(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return Bi(e);
		let t = await Ba(e);
		return t.animated && t.bytes > 1e6 && T(Y("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function Hi(e) {
		return e?.code === "animatedTooLarge" ? Y("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(Aa / 1e6)
		}) : Y("status.imageReadError");
	}
	function Ui(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			T(Y(t), "error");
			return;
		}
		if (e.size > 15e6) {
			T(Y("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(ka / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && T(Y("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => T(Y("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function Wi(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && Ui(t, "status.videoFileFormat", (e) => R("src", e));
	}
	async function Gi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			R("poster", (await Vi(t)).dataUrl);
		} catch (e) {
			T(Hi(e), "error");
		}
	}
	async function Ki(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			gi(e, t, "src", (await Vi(r)).dataUrl);
		} catch (e) {
			T(Hi(e), "error");
		}
	}
	function qi(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Ui(r, "status.videoFormat", (n) => gi(e, t, "src", n));
	}
	async function Zi(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			gi(e, t, "poster", (await Vi(r)).dataUrl);
		} catch (e) {
			T(Hi(e), "error");
		}
	}
	let Qi = nn({}), $i = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`, ea = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	async function ta(e, t, n) {
		let r = $i(e, t);
		Qi[r] = {
			text: Y("status.folderChecking"),
			err: !1
		};
		let i = await mf(n.props.folder, n.props.order, { force: !0 });
		Qi[r] = i.photos.length ? {
			text: Ji("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: Yi(i) ?? Y("status.folderNone"),
			err: !0
		};
	}
	async function na(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		T(Y("status.compressingImages"));
		let { images: i, failed: a, big: o } = await zy(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), By(i.length, a, o);
	}
	function ia(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function aa(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function ca(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function la(e, t) {
		bs(e, () => {
			z(O).nav.style ??= {}, t(z(O).nav.style);
		});
	}
	let ua = /* @__PURE__ */ k(() => ({
		mutate: li,
		keyPrefix: "bg",
		keyId: z(Kr)
	})), da = {
		mutate: la,
		keyPrefix: "navbg",
		keyId: "nav"
	}, fa = {
		mutate: wd,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, pa = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return fu(z(O)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, ma = /* @__PURE__ */ A("light");
	Sn(() => {
		j(ma, pa(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || j(ma, pa(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let ha = /* @__PURE__ */ k(() => z(O)?.theme ? pu(z(O).theme, z(ma)).color ?? {} : {}), ga = () => Object.entries(z(ha)), _a = [
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
	], va = /* @__PURE__ */ k(() => !!z(O)?.theme.alt), ya = /* @__PURE__ */ k(() => z(O)?.theme.alt?.auto === !0), ba = /* @__PURE__ */ k(() => z(O)?.theme.scheme === "dark" ? "dark" : "light"), xa = /* @__PURE__ */ k(() => z(O)?.theme.tokens.color ?? {}), Sa = /* @__PURE__ */ k(() => ({
		...z(O)?.theme.tokens.color ?? {},
		...z(O)?.theme.alt?.tokens?.color ?? {}
	}));
	function Ca(e) {
		return {
			type: e,
			version: Hf[e].version,
			props: Hf[e].defaults()
		};
	}
	let wa = (e) => !!(e && Hf[e.type]?.entrance), Ea = [["", Y("common.none")], ...Object.entries(Hf).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])], Da = Ea.filter(([e]) => !Hf[e]?.group), Oa = [["", Y("common.none")], ...Object.entries(Hf).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Y(t.labelKey) : t.label])];
	function ja(e) {
		e.animation && !wa(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Ma(e) {
		kn(`edit:anim-${z(M).blockId}`, (t) => {
			ja(t), t.animation = e ? Ca(e) : null;
		}), z(M) && it?.sendDemoAnim(z(M).sectionId, z(M).blockId);
	}
	function Na(e) {
		kn(`edit:hover-${z(M).blockId}`, (t) => {
			ja(t), t.hover = e ? Ca(e) : null;
		});
	}
	function Pa(e, t) {
		Number.isFinite(t) && (kn(`edit:anim-${z(M).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), z(M) && it?.sendDemoAnim(z(M).sectionId, z(M).blockId));
	}
	function Fa(e) {
		li("section-anim", (t) => {
			ja(t), t.animation = e ? Ca(e) : null;
		}), it?.sendDemoAnim(z(Kr));
	}
	function Ia(e, t, n) {
		li(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function La(e) {
		li("section-hover", (t) => {
			ja(t), t.hover = e ? Ca(e) : null;
		});
	}
	function Ra(e, t) {
		Number.isFinite(t) && (li("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), it?.sendDemoAnim(z(Kr)));
	}
	function za(e, t) {
		li("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), it?.sendDemoAnim(z(Kr));
	}
	function Va(e) {
		let t = D.data.sections.find((e) => e.id === z(Kr));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		gt("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, j(Jr, r, !0), D.save(), dt(), it?.sendSection(z(w), t);
	}
	function Ha() {
		return D.data.sections.find((e) => e.id === z(Kr)) ?? D.data.sections[0];
	}
	function Ya(e) {
		let t = D.data.sections.find((e) => e.id === z(Kr));
		t && (gt("grid:section"), t.grid = e ? { ...rt.data.grid } : null, j(qr, t.grid ? { ...t.grid } : null, !0), D.save(), dt(), it?.sendSection(z(w), t), z(qo) && it?.sendShowGrid(!0));
	}
	function Xa(e, t) {
		let n = D.data.sections.find((e) => e.id === z(Kr));
		n?.grid && (gt("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, j(qr, { ...n.grid }, !0), D.save(), dt(), it?.sendSection(z(w), n), z(qo) && it?.sendShowGrid(!0));
	}
	function Za(e, t) {
		gt("grid:site"), j(ye, {
			...z(ye),
			[e]: t
		}, !0), rt.data.grid = {
			...rt.data.grid,
			[e]: t
		}, rt.save(), dt(), ot(), z(qo) && it?.sendShowGrid(!0);
	}
	async function Qa() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? j(ve, await e.json(), !0) : e.status !== 503 && j(ve, null);
		} catch {
			j(ve, null);
		}
	}
	let $a = null;
	async function eo() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && ($a = (await e.json()).head ?? null);
		} catch {}
	}
	async function to(e) {
		if (!$a) return await eo(), {
			ok: await Ot({
				title: Y("confirm.conflictUnknown.title"),
				lines: [Y("confirm.conflictUnknown.body"), Y("confirm.conflictUnknown.warning")],
				okLabel: Y("confirm.publishAnyway"),
				cancelLabel: Y("confirm.cancel")
			}),
			head: $a
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${$a}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === $a) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Y("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Ot({
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
	let no = /* @__PURE__ */ A(null), ro = /* @__PURE__ */ A(""), io = /* @__PURE__ */ A(!1);
	async function ao() {
		j(ro, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? j(no, (await e.json()).commits, !0) : e.status === 401 ? (j(no, [], !0), j(ro, Y("status.historyLoginRequired"), !0)) : (j(no, [], !0), j(ro, Yi(await e.json().catch(() => null)) ?? Y("status.historyFetchFailed"), !0));
		} catch {
			j(no, [], !0), j(ro, Y("status.historyUnavailable"), !0);
		}
	}
	let oo = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Xi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), uo = !1;
	async function fo() {
		let e = z(no)?.[0];
		if (e && !z(io) && await Ot({
			title: Y("confirm.revert.title"),
			lines: [`«${e.message}»`, Y("confirm.revert.body")],
			okLabel: Y("confirm.revert.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			j(io, !0), T(Y("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? $a = e : eo(), uo = !0, T(Y("status.revertDone"), "ok"), po();
				} else t.status === 409 ? T(Y("status.revertConflict"), "error") : T(Yi(await t.json().catch(() => null)) ?? Y("status.revertFailed"), "error");
			} catch {
				T(Y("status.publishLayerUnreachable"), "error");
			}
			j(io, !1), ao();
		}
	}
	async function po() {
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
	let mo = 0;
	async function ho(e) {
		let t = ++mo, n = me, r = await Uo(Ho(e));
		t === mo && n === me && (r ? T(Y("status.publishLive"), "ok") : T(Y("status.publishDeployTimeout"), "error"));
	}
	let go = /* @__PURE__ */ A(null), _o = /* @__PURE__ */ A(null), vo = /* @__PURE__ */ A(!1), yo = /* @__PURE__ */ A(nn(/* @__PURE__ */ new Set()));
	async function bo() {
		j(vo, !0), j(_o, null), j(go, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (j(go, t, !0), j(yo, /* @__PURE__ */ new Set(), !0)) : j(_o, Yi(t) ?? Y("update.checkFailed"), !0);
		} catch {
			j(_o, Y("status.publishLayerUnreachable"), !0);
		}
		j(vo, !1);
	}
	function xo(e) {
		let t = new Set(z(yo));
		t.has(e) ? t.delete(e) : t.add(e), j(yo, t, !0);
	}
	async function So() {
		if (!z(go) || z(go).upToDate || z(vo)) return;
		let e = [...z(yo)], t = z(go).changes.filter((e) => !z(yo).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Ot({
			title: Y("confirm.update.title"),
			lines: [Y("confirm.update.body", {
				target: z(go).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Y("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Y("confirm.update.ok"),
			cancelLabel: Y("confirm.cancel")
		})) {
			j(vo, !0), T(Y("update.running", { target: z(go).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: z(go).target,
						expect: z(go).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (T(Y("update.committed", { target: z(go).target }), "ok"), await wo(z(go).target.replace(/^v/, ""))) : t.status === 409 ? (T(Yi(n) ?? Y("update.checkFailed"), "error"), await bo()) : T(Yi(n) ?? Y("update.failed"), "error");
			} catch {
				T(Y("status.publishLayerUnreachable"), "error");
			}
			j(vo, !1);
		}
	}
	async function wo(e) {
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
	let To = null;
	function Eo(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: tc("sec"),
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
	async function Do(e, { keepHistory: t = !1 } = {}) {
		j(w, e, !0), To = (async () => {
			let n = ut(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Ys(await e.json(), rt.data));
			} catch {}
			r ? lt.delete(e) : r = Eo(n), D = sa(`urd-draft-${e}`, () => r, he), (D.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${D.data.schemaVersion} (the engine has 4) and is discarded`), D.replace(structuredClone(r))), D.replace(Ys(D.data, rt.data)), D.save(), t || (mt = null), j(Kr, null), j(qr, null), dt(), zs(), Xe(), j(fe, "");
		})(), await To;
	}
	function Oo() {
		it?.destroy(), z(_e)?.contentDocument?.addEventListener("pointerdown", () => {
			z(cn) && j(cn, null);
		}, !0), it = zo(z(_e), {
			onEdit: Rp,
			onMove: zp,
			onGrow: Bp,
			onDelete: Sy,
			onAddSection: _y,
			onMoveSection: vy,
			onDeleteSection: yy,
			onSectionSize: by,
			onUndo: (e) => e.redo ? Ct() : St(),
			onSelectSection: ci,
			onSelectBlock: sn,
			onBlockMenu: On,
			onReady: ko,
			onNavigate: ys,
			onAddBlock: (e) => Ey(e.sectionId, e.block),
			onAddBlocks: (e) => Dy(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Ly,
			onMoveBlockSection: xy,
			onMobileReset: Hp,
			onMobileOrder: Up,
			onReviewDone: hy,
			onBlockFlag: gy,
			onCollectionEdit: Tu,
			onCollectionAdd: vu,
			onSaveTemplate: tu,
			onStickyGroup: ru,
			onStickyDock: nu,
			onDeleteTemplate: ou,
			onApplyLayout: et,
			onPluginBlocks: (e) => {
				j(jy, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => bs("edit:nav-width", () => {
				z(O).nav.style ??= {}, z(O).nav.style.width = e.width;
			})
		});
	}
	async function ko() {
		await To, await $u, it?.sendPlugins(qe(z(ed))?.enabled ?? []), it?.sendViewport(z(Ne)), it?.sendZoom(z(He)), mu(), eu(), rt.hasDraft() && ot();
		let e = !z(ue).pages.some((e) => e.id === z(w));
		(D.hasDraft() || e) && it?.sendPage(z(w), D.data), z(be) || it?.sendChrome(!1), z(qo) && it?.sendShowGrid(!0), z(Ao) && it?.sendShowGuides(!0), ce();
	}
	let Ao = /* @__PURE__ */ A(localStorage.getItem("urd-guides") === "1"), jo = /* @__PURE__ */ A(!1), Mo = /* @__PURE__ */ A(nn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function No(e) {
		j(Mo, e === "menu" ? "menu" : "strip", !0), z(Mo) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let Po = /* @__PURE__ */ A(null);
	Sn(() => {
		if (!z(jo)) return;
		let e = (e) => {
			z(Po)?.contains(e.target) || j(jo, !1);
		}, t = (e) => {
			e.key === "Escape" && j(jo, !1);
		}, n = () => {
			j(jo, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Fo = {
		view: 1079,
		device: 999,
		zoom: 919
	}, Io = /* @__PURE__ */ A(null), Lo = /* @__PURE__ */ A(null), Bo = nn({
		view: !1,
		device: !1,
		zoom: !1
	});
	Sn(() => {
		let e = Object.entries(Fo).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				Bo[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), Sn(() => {
		z(Io) && !Bo[z(Io)] && j(Io, null);
	}), Sn(() => {
		if (!z(Io)) return;
		let e = (e) => {
			z(Lo)?.contains(e.target) || j(Io, null);
		}, t = (e) => {
			e.key === "Escape" && j(Io, null);
		}, n = () => {
			j(Io, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Ko() {
		j(Ao, !z(Ao)), localStorage.setItem("urd-guides", z(Ao) ? "1" : "0"), it?.sendShowGuides(z(Ao));
	}
	let qo = /* @__PURE__ */ A(localStorage.getItem("urd-grid-overlay") === "1");
	function _s() {
		j(qo, !z(qo)), localStorage.setItem("urd-grid-overlay", z(qo) ? "1" : "0"), it?.sendShowGrid(z(qo));
	}
	function ys(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = z(O).pages.find((e) => e.path === t);
		n && n.id !== z(w) && Do(n.id);
	}
	function bs(e, t) {
		gt(e), t(), rt.save(), dt(), ot();
	}
	let Ts = /* @__PURE__ */ A(""), Es = /* @__PURE__ */ A(null), Ds = Object.fromEntries(su.map((e) => [e.id, au(cu(e.id, {
		pageId: "preview",
		title: ""
	}))])), Os = /* @__PURE__ */ k(() => {
		let e = z(O)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && hu(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), ks = /* @__PURE__ */ A(null);
	Sn(() => {
		if (!z(ks)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || j(ks, null);
		}, t = (e) => {
			e.key === "Escape" && j(ks, null);
		}, n = () => {
			j(ks, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let As = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function js(e, t = null) {
		return e ? As.includes(e) ? Y("error.reservedName", { slug: e }) : z(O).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Y("error.pageExists") : null : Y("error.pageNeedsName");
	}
	function Ms() {
		let e = z(Ts).trim(), t = qa(e), n = js(t);
		if (n) return T(n, "error"), !1;
		let r = z(Es) && !z(Es).startsWith("preset:") ? Yl[z(Es)]?.data?.page : null, i = z(Es)?.startsWith("preset:") ? cu(z(Es).slice(7), {
			pageId: t,
			title: e
		}) ?? Eo({
			id: t,
			title: e
		}) : r ? jc(Ys(JSON.parse(JSON.stringify(r)), rt.data), tc, {
			id: t,
			title: e
		}) : Eo({
			id: t,
			title: e
		});
		bs("pages", () => {
			z(O).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), z(O).nav.items.push({
				label: e,
				page: t
			});
		}), ge(`urd-draft-${t}`, JSON.stringify(i)), dt(), j(Ts, ""), j(Es, null), Do(t);
	}
	async function Ns(e) {
		j(ks, null), await iu("page", e.id === z(w) ? JSON.parse(JSON.stringify(D.data)) : await Gs(e));
	}
	function Fs(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		bs("pages", () => {
			e.title = n;
			for (let t of z(O).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === z(w) ? (D.data.meta.title = n, D.save(), dt(), it?.sendPage(z(w), D.data)) : Ks(e, (e) => {
			e.meta.title = n;
		});
	}
	let Rs = /* @__PURE__ */ A(nn({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function zs() {
		let e = D?.data?.meta ?? {};
		j(Rs, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function Bs(e, t) {
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
		D.save(), dt(), zs();
		let r = z(O).pages.find((e) => e.id === z(w));
		z(Hs)[z(w)] = !r?.noindex && !D.data.meta.description;
	}
	function Vs(e) {
		let t = z(O).pages.find((e) => e.id === z(w));
		t && (bs("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), z(Hs)[z(w)] = !e && !D?.data?.meta?.description);
	}
	let Hs = /* @__PURE__ */ A(nn({}));
	async function Us() {
		let e = {};
		for (let t of z(O).pages) {
			if (t.noindex) continue;
			if (t.id === z(w)) {
				e[t.id] = !D?.data?.meta?.description;
				continue;
			}
			let n = await Gs(t);
			e[t.id] = !n?.meta?.description;
		}
		j(Hs, e, !0);
	}
	Sn(() => {
		z(Ht) === "pages" && z(w) && Us();
	});
	async function Ws(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Bs("ogImage", (await Vi(t)).dataUrl);
		} catch (e) {
			T(Hi(e), "error");
		}
	}
	async function Gs(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Ys(await t.json(), rt.data);
		} catch {}
		return Eo(e);
	}
	async function Ks(e, t) {
		let n = await Gs(e);
		t(n), ge(`urd-draft-${e.id}`, JSON.stringify(n)), dt();
	}
	function qs(e, t) {
		let n = qa(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = js(n, e.id);
		if (r) {
			T(r, "error");
			return;
		}
		bs("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Xs(e) {
		e.path !== "/" && (bs("pages", () => {
			z(O).pages = z(O).pages.filter((t) => t.id !== e.id), z(O).nav.items = z(O).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of z(O).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			z(O).nav.items = z(O).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === z(w) && Do(z(O).pages[0].id), T(Y("status.pageRemoved")));
	}
	function Zs(e) {
		bs("edit:nav-logo", () => {
			z(O).nav.logo = {
				type: "text",
				value: "",
				...z(O).nav.logo,
				...e
			};
		});
	}
	function $s(e) {
		bs("nav", () => {
			z(O).nav.logo ??= {
				type: "text",
				value: z(O).site.title
			};
			let t = z(O).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = z(O).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = z(O).site.title), delete t.image), t.type = e;
		});
	}
	async function nc(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Vi(t);
			bs("nav", () => {
				let t = z(O).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	let Z = /* @__PURE__ */ A(null);
	async function rc(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Bi(t);
				j(Z, e.dataUrl, !0);
			} catch {
				T(Y("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			j(Z, String(n.result), !0);
		}, n.onerror = () => T(Y("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function ic(e) {
		bs("edit:site-icon", () => {
			z(O).site.icon = e;
		}), j(Z, null);
	}
	function ac() {
		bs("edit:site-icon", () => {
			delete z(O).site.icon;
		});
	}
	function oc(e) {
		bs("edit:site-title", () => {
			z(O).site.title = e;
		});
	}
	function sc(e) {
		bs("edit:site-desc", () => {
			z(O).site.description = e;
		});
	}
	function cc(e) {
		let t = String(e ?? "").trim();
		bs("edit:site-analytics", () => {
			t ? z(O).analytics = { token: t } : delete z(O).analytics;
		});
	}
	let lc = /* @__PURE__ */ k(() => z(O)?.layout?.contentWidth ?? 1440), uc = /* @__PURE__ */ k(() => z(O)?.layout?.gutter ?? 6), dc = /* @__PURE__ */ k(() => as(z(lc))), fc = /* @__PURE__ */ k(() => Qo.find((e) => e.gutter === z(uc))?.id ?? null), pc = /* @__PURE__ */ A(!1), mc = /* @__PURE__ */ k(() => z(lc) === "full" ? Zo : ts(z(lc))), hc = /* @__PURE__ */ k(() => es.map((e) => ({
		screen: e,
		...is(z(lc), z(uc), e)
	})));
	function gc(e, t) {
		bs(t, () => {
			let t = {
				...z(O).layout ?? {},
				contentWidth: z(lc),
				gutter: z(uc),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			z(O).layout = t;
		});
	}
	let _c = (e) => gc({ contentWidth: e === "full" ? "full" : ts(e) }, "edit:site-width"), vc = (e) => gc({ gutter: ns(e) }, "edit:site-gutter");
	function yc() {
		let e = z(O).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function bc() {
		let e = yc(), t = Jt([...qt, ...Zt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function xc(e) {
		bs("site", () => {
			z(O).site.lang = e;
		});
	}
	function Sc(e) {
		let t = tp(e);
		bs("site", () => {
			t.length ? z(O).site.meetingHosts = t : delete z(O).site.meetingHosts;
		});
	}
	function Cc(e) {
		bs("site", () => {
			e && e !== "osm" ? z(O).site.mapService = e : delete z(O).site.mapService;
		});
	}
	let wc = /* @__PURE__ */ A(!1);
	function Tc(e) {
		let t = e.trim();
		j(wc, t !== "" && !Xf(t), !0), !z(wc) && bs("site", () => {
			t ? z(O).site.timeZone = t : delete z(O).site.timeZone;
		});
	}
	let Ec = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Sn(() => {
		if (!z(O)?.site) return;
		let e = z(O).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Ec.test(e) && (t.href = e);
		}
	});
	function Dc(e) {
		bs("nav", () => {
			z(O).nav.layout = e;
		});
	}
	let Oc = (e) => e !== "theme" || !!z(O).theme?.alt?.tokens, Mc = /* @__PURE__ */ k(() => ad(z(O)?.nav?.style ?? {}).filter(Oc));
	function Nc(e, t) {
		let n = ad(z(O).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		for (; i >= 0 && i < n.length && !Oc(n[i]);) i += t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], Pc("order", n));
	}
	function Pc(e, t) {
		bs(`edit:nav-tools-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.tools = n : delete z(O).nav.style.tools;
		});
	}
	function Ic(e, t) {
		bs(`edit:nav-style-${e}`, () => {
			z(O).nav.style ??= {}, t === void 0 ? delete z(O).nav.style[e] : z(O).nav.style[e] = t;
		});
	}
	let Lc = /* @__PURE__ */ k(() => z(O)?.nav?.variant === "side-left" || z(O)?.nav?.variant === "side-right"), zc = /* @__PURE__ */ k(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(z(O)?.nav?.variant)), Wc = /* @__PURE__ */ k(() => ws(z(O)?.nav?.style)), Yc = /* @__PURE__ */ k(() => Ss(z(O)?.nav?.style, z(O)?.nav?.variant)), Xc = /* @__PURE__ */ k(() => Cs(z(O)?.nav?.style));
	function Zc(e) {
		bs("nav", () => {
			z(O).nav.style ??= {}, e === "md" ? delete z(O).nav.style.size : z(O).nav.style.size = e, delete z(O).nav.style.padY, delete z(O).nav.style.textSize;
		});
	}
	function Qc(e, t, n) {
		let r = e.target.value;
		Ic(t, r === "" ? void 0 : xs(r, n, void 0)), e.target.value = z(O).nav.style?.[t] ?? "";
	}
	function $c(e, t) {
		bs(`edit:nav-mobile-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.mobile = n : delete z(O).nav.style.mobile;
		});
	}
	let el = (e) => {
		let t = z(O)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, tl = (e, t) => $c(e, t === "" ? void 0 : t === "on"), nl = (e) => $c("border", e ? {
		...z(O).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function rl(e, t) {
		bs(`edit:nav-announce-${e}`, () => {
			let n = { ...z(O).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.announcement = n : delete z(O).nav.announcement;
		});
	}
	let il = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", al = /* @__PURE__ */ A(null);
	function ol() {
		let e = z(O).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function sl(e, t) {
		bs("nav", () => {
			z(O).nav.launcher ??= { links: [] };
			let n = e === null ? z(O).nav.launcher : z(O).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function cl(e, t) {
		bs(`edit:nav-launcher-${e}`, () => {
			z(O).nav.launcher ??= { links: [] }, t === void 0 ? delete z(O).nav.launcher[e] : z(O).nav.launcher[e] = t;
		});
	}
	function ll() {
		bs("nav", () => {
			z(O).nav.launcher ??= { links: [] }, z(O).nav.launcher.links ??= [], z(O).nav.launcher.links.push({
				label: Y("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function ul(e) {
		bs("nav", () => {
			z(O).nav.launcher.links.splice(e, 1);
		});
	}
	function dl(e, t) {
		bs("nav", () => {
			let n = z(O).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function fl(e, t, n) {
		bs(`edit:nav-launcher-${t}-${e}`, () => {
			z(O).nav.launcher.links[e][t] = n;
		});
	}
	async function pl(e, t) {
		if (e) try {
			let n = await Vi(e);
			bs("nav", () => {
				z(O).nav.launcher ??= { links: [] }, t === null ? z(O).nav.launcher.image = n.dataUrl : z(O).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function ml(e, t) {
		bs(`edit:nav-sheet-${e}`, () => {
			z(O).nav.style ??= {};
			let n = { ...z(O).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? z(O).nav.style.sheet = n : delete z(O).nav.style.sheet;
		});
	}
	function hl(e, t, n) {
		let r = e.target.value;
		Ic(t, r === "" ? void 0 : xs(r, n, void 0)), e.target.value = z(t === "padY" ? Yc : Xc);
	}
	function vl(e, t, n) {
		let r = e.target.value;
		$c(t, r === "" ? void 0 : xs(r, n, void 0)), e.target.value = z(O).nav.style?.mobile?.[t] ?? "";
	}
	function yl(e) {
		let t = xs(e / 100, ds, .5);
		Ic("shrinkTo", t === .5 ? void 0 : t);
	}
	function Cl(e) {
		let t = xs(e, fs, 80);
		Ic("shrinkAt", t === 80 ? void 0 : t);
	}
	function wl(e) {
		let t = xs(e, ps, 220);
		Ic("shrinkMs", t === 220 ? void 0 : t);
	}
	let Tl = {
		underline: [Y("hoverColor.underline.label"), Y("hoverColor.underline.title")],
		pill: [Y("hoverColor.pill.label"), Y("hoverColor.pill.title")],
		lift: [Y("hoverColor.lift.label"), Y("hoverColor.lift.title")]
	}, El = /* @__PURE__ */ k(() => Tl[z(O)?.nav?.style?.hover] ?? null), Ol = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), kl = [
		"plain",
		"cards",
		"band"
	], Al = ["cards", "list"], jl = (e) => (e.version ?? 1) < vf.version ? vf.migrations[1](e.props ?? {}) : e.props ?? {}, Ml = /* @__PURE__ */ k(() => [
		["grid", Y("opt.launcherView.grid")],
		["list", Y("opt.launcherView.list")],
		["cover", Y("opt.launcherView.cover")]
	]), Nl = /* @__PURE__ */ k(() => z(Lc) ? [
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
	function Pl(e) {
		(z(O).nav.variant ?? "bar") !== e && bs("nav", () => {
			e === "bar" ? delete z(O).nav.variant : z(O).nav.variant = e, z(O).nav.style && delete z(O).nav.style.radius;
		});
	}
	function Fl(e) {
		bs("nav", () => {
			z(O).nav.style ??= {}, e ? z(O).nav.style.glow = !0 : delete z(O).nav.style.glow;
		});
	}
	function Il(e) {
		bs("nav", () => {
			z(O).nav.style ??= {}, e ? delete z(O).nav.style.topGap : z(O).nav.style.topGap = !1;
		});
	}
	function Ll(e) {
		bs("nav", () => {
			z(O).nav.style ??= {}, e === "standard" ? delete z(O).nav.style.hover : z(O).nav.style.hover = e;
		});
	}
	let Rl = null, zl = {}, Bl = {}, Vl = !1, Hl = /* @__PURE__ */ A(nn([])), Ul = /* @__PURE__ */ A(nn({})), Wl = /* @__PURE__ */ A(null), Gl = /* @__PURE__ */ A(""), Kl = /* @__PURE__ */ A("news"), ql = [
		["news", Y("collectionKind.news")],
		["notices", Y("collectionKind.notices")],
		["publications", Y("collectionKind.publications")],
		["products", Y("collectionKind.products")],
		["custom", Y("collectionKind.custom")]
	], Jl = null, Yl = {}, Xl = {}, Zl = !1, Ql = /* @__PURE__ */ A(nn([]));
	async function $l() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Jl = sa("urd-draft-templates", () => e, he, "urd-draft-maler"), j(Ql, [...Jl.data.maler ?? []], !0);
		for (let e of z(Ql)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Xl[e] = t, Yl[e] = sa(`urd-draft-template-${e}`, () => t, he, `urd-draft-mal-${e}`), (Yl[e].data?.schemaVersion ?? 1) > 1 && Yl[e].reset();
		}
		Zl = !0, eu();
	}
	function eu() {
		let e = z(Ql).map((e) => Yl[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Yl[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		it?.sendTemplates(e);
	}
	function tu(e) {
		let t = kc.includes(e.kind) ? e.kind : "section";
		return iu(t, e[t]);
	}
	function nu(e) {
		let { section: t, block: n } = an(e.sectionId, e.blockId);
		t && n?.sticky && En.some(([t]) => t === e.dock) && (gt(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, D.save(), dt(), it?.sendSection(z(w), t), on());
	}
	function ru(e) {
		let t = e.blockIds ?? [], { section: n } = an(e.sectionId, t[0]);
		if (!n || !t.length) return;
		gt(`sticky-group:${e.sectionId}`);
		let r = e.on ? tc("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		nt(n, "block-edited"), D.save(), dt(), it?.sendSection(z(w), n), on(), T(Y(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function iu(e, t) {
		if (!t || !Jl) return;
		let n = (await kt({
			title: Y("canvas.templateNamePrompt"),
			placeholder: Y("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Ac(n);
		if (!r) {
			T(Y("status.invalidName"), "error");
			return;
		}
		if (z(Ql).includes(r)) {
			T(Y("status.templateExists"), "error");
			return;
		}
		gt("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Yl[r] = sa(`urd-draft-template-${r}`, () => null, he, `urd-draft-mal-${r}`), Yl[r].replace(i), Yl[r].save(), Jl.data.maler = [...z(Ql), r], Jl.save(), j(Ql, [...z(Ql), r], !0), T(Y("status.templateSaved", { name: n }), "ok"), dt(), eu();
	}
	async function ou(e) {
		let t = Yl[e.id]?.data?.mal;
		t && await Ot({ title: Y("confirm.deleteTemplate", { name: t.name }) }) && (gt("templates"), z(Es) === e.id && j(Es, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Yl[e.id], Jl.data.maler = z(Ql).filter((t) => t !== e.id), Jl.save(), j(Ql, z(Ql).filter((t) => t !== e.id), !0), dt(), eu());
	}
	async function lu() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		Rl = sa("urd-draft-collections", () => e, he, "urd-draft-samlinger"), j(Hl, [...Rl.data.samlinger ?? []], !0);
		for (let e of z(Hl)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Bl[e] = t, zl[e] = sa(`urd-draft-collection-${e}`, () => t, he, `urd-draft-samling-${e}`), !t && !zl[e].data && (zl[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), zl[e].save());
		}
		Vl = !0, uu();
	}
	function uu(e = !0) {
		let t = {};
		for (let e of z(Hl)) zl[e] && (t[e] = JSON.parse(JSON.stringify(zl[e].data)));
		j(Ul, t, !0), e && mu();
	}
	function mu() {
		it?.sendCollections(qe(z(Ul)) ?? {});
	}
	function _u(e, t, n, r = !0) {
		let i = zl[e];
		i && (gt(t), n(i.data), i.save(), dt(), uu(r));
	}
	function vu(e) {
		zl[e.collection] && Au(e.collection);
	}
	function wu(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function Tu(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || wu(i)) && _u(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function Eu(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		zl[e] = sa(`urd-draft-collection-${e}`, () => null, he, `urd-draft-samling-${e}`), zl[e].replace(r), zl[e].save(), Rl.data.samlinger = [...z(Hl), e], Rl.save(), j(Hl, [...z(Hl), e], !0), j(Wl, e, !0), dt(), uu();
	}
	function Du() {
		let e = z(Gl).trim();
		if (!e) return;
		let t = qa(e);
		if (!t || z(Hl).includes(t)) {
			T(Y(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		gt("collections"), Eu(t, e, z(Kl)), j(Gl, "");
	}
	function Ou() {
		let e = Y("seed.productCatalogName"), t = qa(e) || "collection", n = t;
		for (let e = 2; z(Hl).includes(n); e += 1) n = `${t}-${e}`;
		gt("collections"), Eu(n, e, "products"), kn(null, (e) => {
			e.props.collection = n;
		});
	}
	function ku(e) {
		gt("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete zl[e], Rl.data.samlinger = z(Hl).filter((t) => t !== e), Rl.save(), j(Hl, z(Hl).filter((t) => t !== e), !0), z(Wl) === e && j(Wl, null), dt(), uu();
	}
	function Au(e) {
		_u(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: tc("entry"),
				title: Y("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: tc("entry"),
				title: Y("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function ju(e, t, n, r) {
		_u(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Mu(e, t, n) {
		_u(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Nu(e, t) {
		_u(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Pu(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && ju(e, t, "image", (await Vi(r)).dataUrl);
	}
	function Lu(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		ju(e, t, "sizes", r.length ? r : "");
	}
	function Vu(e, t) {
		_u(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Y("ph.colorName") }]);
		});
	}
	function Hu(e, t, n, r, i) {
		_u(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Wu(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Hu(e, t, n, "image", (await Vi(i)).dataUrl);
	}
	function Gu(e, t, n) {
		_u(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function Ku(e) {
		let t = zl[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([Fc(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function qu(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Rc(await n.text());
		if (!r) {
			T(Y("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = tc("entry")), i.add(e.id);
		_u(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), T(Y("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let Ju = null, Qu, $u = new Promise((e) => {
		Qu = e;
	}), ed = /* @__PURE__ */ A(null), td = nn({}), nd = /* @__PURE__ */ A("0.0.0"), id = /* @__PURE__ */ A(""), od = /* @__PURE__ */ A(""), sd = /* @__PURE__ */ A(nn([])), cd = /* @__PURE__ */ A(nn([])), ld = /* @__PURE__ */ A("pending"), ud = () => [.../* @__PURE__ */ new Set([...z(ed)?.enabled ?? [], ...z(ed)?.disabled ?? []])];
	function dd() {
		j(ed, JSON.parse(JSON.stringify(Ju.data)), !0);
	}
	let fd = /* @__PURE__ */ A(null);
	async function pd() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				j(fd, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			j(fd, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			j(fd, { unknown: !0 }, !0);
		}
	}
	function md(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!z(fd) || z(fd).unknown) return [];
		let n = {
			"script-src": z(fd).scriptSrc,
			"connect-src": z(fd).connectSrc,
			"frame-src": z(fd).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function hd() {
		pd();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		j(cd, e.enabled ?? [], !0), Ju = sa("urd-draft-plugins", () => e, he), dd();
		try {
			j(nd, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of ud()) vd(e);
		gd(), Qu(), it?.sendPlugins(qe(z(ed))?.enabled ?? []);
	}
	async function gd() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				_d();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), j(sd, (t ?? []).filter((e) => !ud().includes(e)), !0);
			for (let e of z(sd)) vd(e);
			j(ld, "ok");
		} catch {
			_d();
		}
	}
	function _d() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				j(sd, e.filter((e) => !ud().includes(e)), !0);
				for (let e of z(sd)) vd(e);
				j(ld, "ok");
				return;
			}
		} catch {}
		j(ld, "unavailable");
	}
	async function vd(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ec(t);
			td[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Qs(z(nd), t.requiresEngine)
			};
		} catch {
			td[e] = {
				name: e,
				errors: [Y("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function yd(e, t) {
		gt("plugins");
		let n = Ju.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Ju.save(), dt(), dd(), bd();
	}
	function bd() {
		z(_e) && (z(_e).src = z(_e).src);
	}
	function xd(e) {
		gt("plugins");
		let t = Ju.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Ju.save(), dt(), dd(), bd();
	}
	async function Sd() {
		j(od, "");
		let e = z(id).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			j(od, Y("plugin.invalidId"), !0);
			return;
		}
		if (ud().includes(e)) {
			j(od, Y("plugin.alreadyListed"), !0);
			return;
		}
		if (await vd(e), td[e].errors.length) {
			j(od, Y("plugin.invalidManifest", { errors: td[e].errors.join("; ") }), !0);
			return;
		}
		yd(e, !0), j(id, "");
	}
	function Cd(e) {
		j(sd, z(sd).filter((t) => t !== e), !0), yd(e, !0);
	}
	function wd(e, t) {
		bs(e, () => {
			z(O).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(z(O).footer);
		});
	}
	function Td(e, t) {
		wd(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function Ed(e) {
		wd("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Dd(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Vi(t);
			wd("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			T(Y("status.imageReadErrorSvg"), "error");
		}
	}
	function Od() {
		wd("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function kd(e) {
		wd("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Ad(e) {
		wd("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let Md = [
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
	function Rd(e) {
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
					version: Iu.version ?? 1,
					props: {
						...Iu.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Ru.version ?? 1,
					props: {
						...Ru.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function zd(e) {
		wd("footer-template", (t) => {
			let n = Rd(e);
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
	function Bd(e) {
		wd("footer", (t) => {
			t[e] ??= [], t[e].push(z(O).pages[0] ? {
				label: Y("seed.link"),
				page: z(O).pages[0].id
			} : {
				label: Y("seed.link"),
				href: "https://"
			});
		});
	}
	function Vd(e, t) {
		wd("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function Hd(e, t, n) {
		wd("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Ud(e, t, n) {
		wd(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Wd(e, t, n) {
		wd("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Gd(e, t, n) {
		wd(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function Kd(e) {
		wd("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function qd(e) {
		wd("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Y("seed.join")
			} : delete t.cta;
		});
	}
	function Yd(e, t) {
		wd(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Xd(e) {
		wd("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function Zd(e, t) {
		wd("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Qd() {
		wd("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Y("seed.column"),
				links: [{
					label: Y("seed.link"),
					page: z(O).pages[0].id
				}]
			});
		});
	}
	function $d(e) {
		wd("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function ef(e, t) {
		wd("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function tf(e, t) {
		wd(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function nf(e) {
		wd("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function rf(e, t) {
		wd("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function af(e, t, n) {
		wd("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function of(e, t, n) {
		wd(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function sf(e, t, n) {
		wd("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function cf(e, t, n) {
		wd(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function lf() {
		wd("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function uf(e) {
		wd("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function df(e, t) {
		wd("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function ff(e, t) {
		wd("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function pf(e, t) {
		wd(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let hf = co.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Y(so[e].labelKey)]));
	function gf(e, t) {
		bs(`edit:nav-label-${e}`, () => {
			z(O).nav.items[e].label = t;
		});
	}
	function _f(e, t) {
		bs("nav", () => {
			let n = z(O).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function yf(e, t) {
		bs(`edit:nav-href-${e}`, () => {
			z(O).nav.items[e].href = t;
		});
	}
	function bf(e, t) {
		let n = e + t, r = z(O).nav.items;
		n < 0 || n >= r.length || bs("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function xf(e) {
		bs("nav", () => {
			z(O).nav.items.splice(e, 1);
		});
	}
	let Sf = /* @__PURE__ */ A(""), Cf = /* @__PURE__ */ A(""), wf = /* @__PURE__ */ A(null);
	function Tf(e) {
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
	function Ef(e, t, n, r) {
		if (!z(Cf) || z(Cf) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = Tf(z(Cf)), c = Tf(t), l = s.list[s.index], u;
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
		}, Df(u, l, s);
	}
	function Df(e, t, n) {
		let r = Tf(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = Tf(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : z(O).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function Of() {
		if (!z(Cf)) return {
			label: "",
			target: ""
		};
		let e = Tf(z(Cf)), t = e.list[e.index], n = t.page ? z(O).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Y("opt.noLink")
		};
	}
	function kf(e) {
		z(wf) && e?.dataTransfer?.dropEffect !== "none" && Mf(z(wf).key), j(Cf, ""), j(wf, null);
	}
	Sn(() => {
		if (!z(Cf)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let Af = "application/x-urd-nav-row";
	function jf(e) {
		if (!z(Cf)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = Ef(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = Tf(z(Cf)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === z(Cf) ? null : Df({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === z(Cf) ? null : Df({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			j(wf, null);
			return;
		}
		e.preventDefault(), (z(wf)?.key !== r.key || z(wf)?.pos !== r.pos) && j(wf, r, !0);
	}
	function Mf(e) {
		let t = z(Cf), n = z(wf);
		if (j(Cf, ""), j(wf, null), t && n && n.key === e && t !== e) {
			{
				let r = Tf(t), i = Tf(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			bs("nav", () => {
				let r = z(O).nav.items, i = Tf(t), a = Tf(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && (delete i.parent.children, !i.parent.page && !i.parent.href && (i.parent.page = z(O).pages[0].id)), n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = z(O).pages[0].id);
				}
			}), j(Sf, "");
		}
	}
	let Nf = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function Pf() {
		bs("nav", () => {
			z(O).nav.items.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function Ff(e) {
		bs("nav", () => {
			let t = z(O).nav.items[e];
			t.children ??= [], t.children.push({
				label: Y("seed.link"),
				page: z(O).pages[0].id
			});
		});
	}
	function If(e, t, n) {
		bs(`edit:nav-child-label-${e}-${t}`, () => {
			z(O).nav.items[e].children[t].label = n;
		});
	}
	function zf(e, t, n) {
		bs("nav", () => {
			let r = z(O).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Bf(e, t, n) {
		bs(`edit:nav-child-href-${e}-${t}`, () => {
			z(O).nav.items[e].children[t].href = n;
		});
	}
	function Vf(e, t, n) {
		let r = t + n, i = z(O).nav.items[e].children;
		r < 0 || r >= i.length || bs("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Kf(e, t) {
		bs("nav", () => {
			let n = z(O).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = z(O).pages[0].id));
		});
	}
	function Jf(e, t) {
		bs(`edit:theme-color-${e}`, () => {
			z(O).theme.tokens.color[e] = t, z(O).theme.alt?.auto && (z(O).theme.alt.tokens.color = xp());
		});
	}
	function Zf(e, t) {
		return e === "accent-text" ? le(Mp(t.accent ?? "#000000", t)) : t.bg;
	}
	let ep = /* @__PURE__ */ k(() => !z(O)?.theme?.tokens?.color?.["accent-text"] && !z(O)?.theme?.alt?.tokens?.color?.["accent-text"]), np = /* @__PURE__ */ A(null), ip = /* @__PURE__ */ A(!1), ap = /* @__PURE__ */ A(!1), op = (e) => e.length > 0 && [...e].every((e) => e.open);
	function sp() {
		let e = z(np)?.querySelectorAll("details.group") ?? [];
		j(ip, e.length > 0), j(ap, op(e), !0);
	}
	Sn(() => {
		z(Ht), pr().then(sp);
	});
	function Q() {
		let e = !z(ap);
		z(np)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), sp();
	}
	function cp(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = C.foldToggle;
			let i = () => {
				let e = op(n());
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
	Sn(() => {
		let e = z(np);
		if (!e) return;
		let t = new MutationObserver(() => {
			cp(e), sp();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", sp, !0), cp(e), () => {
			t.disconnect(), e.removeEventListener("toggle", sp, !0);
		};
	});
	function lp(e) {
		bs("edit:theme-color-accent-text", () => {
			e ? (delete z(O).theme.tokens.color["accent-text"], z(O).theme.alt?.tokens?.color && delete z(O).theme.alt.tokens.color["accent-text"]) : (z(O).theme.tokens.color["accent-text"] = Zf("accent-text", z(xa)), z(O).theme.alt?.auto && (z(O).theme.alt.tokens.color = xp()));
		});
	}
	function up(e, t) {
		bs("theme", () => {
			z(O).theme.tokens.font[e] = t;
		});
	}
	function dp(e, t) {
		bs("theme", () => {
			z(O).theme.tokens.radius[e] = t;
		});
	}
	function fp(e) {
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
	function xp() {
		return Object.fromEntries(Object.entries(z(O).theme.tokens.color).map(([e, t]) => [e, fp(t)]));
	}
	function Sp(e, t) {
		bs(`edit:theme-alt-${e}`, () => {
			z(O).theme.alt.tokens.color[e] = t, z(O).theme.alt.auto = !1;
		});
	}
	function Cp(e) {
		bs("theme", () => {
			e === "light" ? delete z(O).theme.scheme : z(O).theme.scheme = e;
		});
	}
	function Ep(e) {
		bs("theme", () => {
			e ? z(O).theme.alt = {
				auto: !0,
				tokens: { color: xp() }
			} : delete z(O).theme.alt;
		});
	}
	function Op(e) {
		bs("theme", () => {
			z(O).theme.alt ??= { tokens: { color: xp() } }, z(O).theme.alt.auto = e, e && (z(O).theme.alt.tokens.color = xp());
		});
	}
	function kp(e) {
		let t = z(O).theme.tokens.font[e];
		return [...Uf.some(([, e]) => e === t) ? [] : [[t, Y("opt.customFont")]], ...Uf.map(([e, t]) => [t, Y(e)])];
	}
	let Ap = (e) => parseInt(e, 10) || 0;
	function jp(e, t) {
		dp(e, `${t}px`);
	}
	let Mp = (e, t) => e && t && t[e] ? t[e] : e, Np = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Pp = [
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
	function Fp(e) {
		bs("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Np) z(O).theme.tokens.color[e] = n[e];
			t ? z(O).theme.scheme = "dark" : delete z(O).theme.scheme, z(O).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Ip = /* @__PURE__ */ k(() => {
		if (!z(O)) return null;
		let e = z(O).theme.tokens.color, t = z(O).theme.alt?.tokens?.color ?? {}, n = z(O).theme.scheme === "dark";
		return Pp.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Np.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), Lp = 0;
	async function $() {
		z(be) && (Lp = z(np)?.scrollTop ?? 0), j(be, !z(be)), it?.sendChrome(z(be)), z(be) || j(cn, null), z(be) && (await pr(), requestAnimationFrame(() => {
			z(np) && (z(np).scrollTop = Lp);
		}));
	}
	function Rp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (gt(`edit:${e.blockId}`), n.props = e.props, D.save(), dt(), z(M)?.blockId === e.blockId && on(), e.rerender && it?.sendSection(z(w), t), j(fe, ""), Pn(t.id, n));
	}
	function zp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		gt(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop", i = n.frames.desktop?.w;
		n.frames[r] = e.frame, r === "desktop" && typeof e.minHeight == "string" && e.minHeight && (t.size = {
			...t.size,
			minHeight: e.minHeight
		}), r === "desktop" && nt(t, "desktop-changed-after-mobile"), D.save(), dt(), z(M)?.blockId === e.blockId && on(), r === "desktop" && e.frame?.w !== i && Pn(t.id, n);
	}
	function Bp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (n?.frames?.desktop && n.frames.desktop.h !== e.h) {
			if (e.fit) {
				z(Ne) === "desktop" && e.seq === Mn.get(e.blockId) && Vp(t, n, e.h);
				return;
			}
			D.amendBaseline((t) => {
				let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
				n?.frames?.desktop && (n.frames.desktop.h = e.h);
			}), D.hasDraft() && gt(`edit:${e.blockId}`), n.frames.desktop.h = e.h, D.save(), dt(), z(M)?.blockId === e.blockId && on();
		}
	}
	function Vp(e, t, n) {
		let { moves: r, minHeight: i } = qf(e.blocks, t.id, n, Yf(e)), a = {};
		t.frames.desktop = {
			...t.frames.desktop,
			h: n
		}, a[t.id] = t.frames.desktop;
		for (let [t, n] of r) {
			let r = e.blocks.find((e) => e.id === t);
			r?.frames?.desktop && (r.frames.desktop = {
				...r.frames.desktop,
				y: n
			}, a[t] = r.frames.desktop);
		}
		i && (e.size = {
			...e.size,
			minHeight: `${i}px`
		}), nt(e, "block-edited"), D.save(), dt(), z(M)?.blockId === t.id && on(), it?.sendFrames(e.id, qe(a), i ? `${i}px` : void 0);
	}
	function Hp(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (gt("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!tt(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), D.save(), dt(), Xe(), it?.sendSection(z(w), t);
		}
	}
	function Up(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (gt("mobile-order"), n.mobileOrder = e.mobileOrder, D.save(), dt(), it?.sendSection(z(w), t));
	}
	function hy(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (gt("review-done"), t.responsive.mobile.attention = null, D.save(), dt(), Xe());
	}
	function gy(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (gt("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), D.save(), dt(), typeof e.hideMobile == "boolean" && z(Ne) === "mobile" && it?.sendSection(z(w), t), z(M)?.blockId === e.blockId && on());
	}
	function _y(e) {
		gt("add-section"), e.section.id || (e.section.id = tc("sec")), D.data.sections.splice(e.index, 0, e.section), D.save(), dt(), it?.sendPage(z(w), D.data), j(Kr, e.section.id, !0), ni(e.section), j(Ht, "properties");
	}
	function vy(e) {
		let t = D.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (gt("move-section"), [t[n], t[r]] = [t[r], t[n]], D.save(), dt(), it?.sendPage(z(w), D.data));
	}
	function yy(e) {
		gt("delete-section"), e.sectionId === z(Kr) && (j(Kr, null), j(qr, null)), z(M)?.sectionId === e.sectionId && j(M, null), D.data.sections = D.data.sections.filter((t) => t.id !== e.sectionId), D.save(), dt(), it?.sendPage(z(w), D.data);
	}
	function by(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			gt("section-size"), t.size = {
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
			e.moves?.length && (nt(t, "section-height"), z(M)?.sectionId === e.sectionId && on()), e.sectionId === z(Kr) && j(Jr, e.minHeight, !0), D.save(), dt();
		}
	}
	function xy(e) {
		let t = D.data.sections.find((t) => t.id === e.fromSectionId), n = D.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (gt(e.groupKey ? `edit:${e.groupKey}` : "move-block"), typeof e.fromMinHeight == "string" && e.fromMinHeight && (t.size = {
			...t.size,
			minHeight: e.fromMinHeight
		}), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), nt(t, "block-moved"), nt(n, "block-moved"), D.save(), dt(), Xe(), it?.sendSection(z(w), t), it?.sendSection(z(w), n), z(M)?.blockId === e.blockId && (j(M, {
			...z(M),
			sectionId: e.toSectionId
		}, !0), on()));
	}
	function Sy(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		gt("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(z(M)?.blockId) && j(M, null), nt(t, "block-deleted"), D.save(), dt(), it?.sendSection(z(w), t);
	}
	let Cy = {
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
				fields: Ls()
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
	function wy(e) {
		let t = Cy[e];
		return t ? {
			id: tc("blk"),
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
	function Ty(e) {
		it ? it.sendPlaceBlock(e) : Ey(Ha()?.id, e);
	}
	function Ey(e, t) {
		let n = D.data.sections.find((t) => t.id === e) ?? D.data.sections[0];
		if (!n) return;
		gt("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), nt(n, "block-added"), D.save(), dt(), it?.sendSection(z(w), n), Pn(n.id, t);
	}
	function Dy(e, t, n, r) {
		let i = D.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		gt("add-blocks");
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
		}), nt(i, "block-added"), D.save(), dt(), it?.sendSection(z(w), i);
	}
	function Oy(e) {
		Ty(wy(e));
	}
	let ky = {
		list: "calendar",
		cards: "calendar-cards",
		month: "calendar-month",
		next: "calendar-next",
		agenda: "calendar-agenda",
		week: "calendar-month",
		day: "calendar",
		year: "calendar-month"
	};
	function Ay(e) {
		let t = _p(e), n = wy(ky[t.view] ?? "calendar");
		n && (n.props = {
			...n.props,
			...t.view ? { view: t.view } : {},
			...t.id === "plain" ? {} : { design: t.id },
			...t.view === "next" ? {
				nextCount: 3,
				laterCount: 3
			} : {}
		}, Ty(n));
	}
	let jy = /* @__PURE__ */ A(nn([])), My = { map: [
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
	function Ny(e, t = {}) {
		let n = qe(e);
		Ty({
			id: tc("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...qe(t)
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
	let Py = /* @__PURE__ */ A("");
	function Fy() {
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
			...bp().flatMap((e) => e.designs).filter((e) => e.id !== "plain").map((e) => ({
				label: `${Y("blocks.calendar")}: ${Y(e.labelKey)}`,
				act: "calendarDesign",
				design: e.id
			})),
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
		for (let t of z(Ql)) {
			let n = Yl[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of z(jy)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function Iy(e) {
		e.act === "block" ? Oy(e.kind) : e.act === "calendarDesign" ? Ay(e.design) : e.act === "plugin" ? Ny(e.entry, e.props ?? {}) : e.act === "template" && it?.sendInsertTemplate(e.id);
	}
	function Ly(e) {
		let t = wy(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = D.data.sections.find((t) => t.id === e.sectionId)?.grid ?? z(O).grid, r = Wf({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Ey(e.sectionId, t), it?.sendSelect(t.id), e.kind === "image" && T(Y("status.imageBlockAdded")), e.kind === "gallery" && T(Y("status.galleryBlockAdded"));
		}
	}
	async function Ry(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		T(Y("status.compressingImage"));
		let n;
		try {
			n = await Vi(t);
		} catch (e) {
			T(Hi(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (z(_e)?.clientWidth ?? 1280));
		Ty({
			id: tc("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: qa(t.name).replaceAll("-", " "),
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
	async function zy(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Vi(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: qa(i.name).replaceAll("-", " "),
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
	function By(e, t, n) {
		t ? T(Y("status.imagesReadFailed", { n: t }), "error") : n ? T(Y("status.imagesLarge", { n }), "error") : T(e ? "" : Y("status.noImagesAdded"));
	}
	async function Vy(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		T(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await zy(t);
		n.length && kn("gallery-add", (e) => {
			e.props.images.push(...n);
		}), By(n.length, r, i);
	}
	async function Hy(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		T(Y("status.compressingImages"));
		let { images: n, failed: r, big: i } = await zy(t);
		if (!n.length) {
			By(0, r, i);
			return;
		}
		let a = wy("gallery");
		a.props.images = n, Ty(a), By(n.length, r, i);
	}
	function Uy(e, t) {
		kn("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Wy(e) {
		kn("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Gy(e, t, n) {
		kn(`edit:${z(M).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Ky(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${qa(n || "image")}-${Ja(a)}.${Ka(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function qy(e, t) {
		Ky(e, "image", e.title, t);
		for (let n of e.colors ?? []) Ky(n, "image", `${e.title}-${n.name}`, t);
	}
	function Jy(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Ky(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Ky(e, "src", "background", t);
			n.type === "video" && (Ky(n.props, "src", "video", t), Ky(n.props, "poster", "plakat", t));
		}
	}
	function Yy(e, t) {
		if (e.type === "image" && Ky(e.props, "src", e.props.alt, t), e.type === "icon" && Ky(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Ky(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Ky(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (Ky(e.props, "src", e.props.title || "video", t), Ky(e.props, "poster", "poster", t));
	}
	function Xy(e, t) {
		Jy(e.background, t);
		for (let n of e.blocks) Yy(n, t);
	}
	function Zy(e) {
		let t = [];
		e.meta?.og && Ky(e.meta.og, "image", "share", t);
		for (let n of e.sections) Xy(n, t);
		return t;
	}
	function Qy(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && Ky(n, "value", "logo", t), n?.type === "both" && Ky(n, "image", "logo", t), e.nav?.style && Ky(e.nav.style, "image", "menu", t), Jy(e.nav?.style?.background, t), Jy(e.footer?.background, t), e.footer?.brand && Ky(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			Ky(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) Ky(n, "image", "snarvei", t);
		}
		return Ky(e.site, "icon", "ikon", t), t;
	}
	let $y = /* @__PURE__ */ A(!1), eb = /* @__PURE__ */ A(null);
	function tb() {
		j($y, !z($y));
	}
	function nb() {
		j($y, !1);
		try {
			rb(), T(Y("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), T(String(e?.message ?? e), "error");
		}
	}
	Sn(() => {
		if (!z($y)) return;
		let e = (e) => {
			if (!z(eb)?.contains(e.target)) {
				j($y, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), nb());
		}, t = (e) => {
			e.key === "Escape" && j($y, !1);
		}, n = !1, r = (e) => {
			n = !!z(eb)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || j($y, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function rb() {
		gt("discard");
		for (let e of z(O).pages) e.id !== z(w) && !lt.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = D.reset();
		if (rt.reset(), Ju && (Ju.reset(), dd()), Rl) {
			Rl.reset(), j(Hl, [...Rl.data.samlinger ?? []], !0);
			for (let e of Object.keys(zl)) z(Hl).includes(e) ? zl[e].reset() : delete zl[e];
			uu();
		}
		if (Jl) {
			Jl.reset(), j(Ql, [...Jl.data.maler ?? []], !0);
			for (let e of Object.keys(Yl)) z(Ql).includes(e) ? Yl[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Yl[e]);
			eu();
		}
		at(), j(ye, {
			snap: !0,
			...z(O).grid
		}, !0), dt(), j(fe, ""), ot(), z(O).pages.some((e) => e.id === z(w)) ? it?.sendPage(z(w), e) : Do(z(O).pages[0].id);
	}
	async function ib() {
		if (uo) {
			T(Y("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (z(vo)) {
			T(Y("update.publishBlocked"), "error");
			return;
		}
		T(Y("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of z(O).pages) {
			let a = `urd-draft-${i.id}`, o = lt.has(i.id) || !z(ue).pages.some((e) => e.id === i.id), s = null;
			if (i.id === z(w) && (D.hasDraft() || o)) s = D.data;
			else if (i.id !== z(w)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Ys(JSON.parse(e), rt.data);
				} catch {}
			}
			if (!s && o && (s = Eo(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Zy(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (rt.hasDraft()) {
			let r = JSON.parse(JSON.stringify(z(O)));
			e.push(...Qy(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: gu(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(z(ue).theme, z(O).theme) || t.push(Y("publish.part.theme")), i(z(ue).nav, z(O).nav) || t.push(Y("publish.part.nav")), i(z(ue).footer, z(O).footer) || t.push(Y("publish.part.footer")), i(z(ue).pages, z(O).pages) || t.push(Y("publish.part.pages")), i(z(ue).grid, z(O).grid) || t.push(Y("publish.part.grid")), (z(ue).site.icon ?? null) !== (z(O).site.icon ?? null) && t.push(Y("publish.part.icon"));
			let { icon: a, ...o } = z(ue).site, { icon: s, ...c } = z(O).site;
			i(o, c) || t.push(Y("publish.part.siteInfo"));
		}
		let i = Object.entries(zl).filter(([, e]) => e.hasDraft());
		if (i.length || Rl?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) qy(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), Hc.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: Uc({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: wu(e.title),
							text: wu(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Rl?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(Rl.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!z(Hl).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.collections"));
		}
		let a = Object.entries(Yl).filter(([, e]) => e.hasDraft());
		if (a.length || Jl?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Xy(i.section, e);
				for (let t of i.blocks ?? []) Yy(t, e);
				for (let t of i.page?.sections ?? []) Xy(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Jl?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Jl.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!z(Ql).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Y("publish.part.templates"));
		}
		Ju?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Ju.data, null, 2) + "\n",
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
			content: Bc(z(O).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: Vc(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of z(ue).pages) {
			let t = z(O).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await to(e);
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
			t ? $a = t : eo(), Zy(D.data), Qy(z(O));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) lt.add(e);
			if (j(ue, JSON.parse(JSON.stringify(z(O))), !0), rt = sa("urd-draft-site", () => z(ue), he), at(), Ju) {
				let e = JSON.parse(JSON.stringify(Ju.data));
				Ju = sa("urd-draft-plugins", () => e, he), dd();
			}
			if (Rl) {
				for (let e of Object.values(zl)) for (let t of e.data.entries) qy(t, []);
				let e = JSON.parse(JSON.stringify(Rl.data));
				Rl = sa("urd-draft-collections", () => e, he, "urd-draft-samlinger"), Bl = {};
				for (let e of z(Hl)) {
					if (!zl[e]) continue;
					let t = JSON.parse(JSON.stringify(zl[e].data));
					Bl[e] = t, zl[e] = sa(`urd-draft-collection-${e}`, () => t, he, `urd-draft-samling-${e}`);
				}
				uu();
			}
			if (Jl) {
				for (let e of Object.values(Yl)) {
					e.data?.section && Xy(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Yy(t, []);
					for (let t of e.data?.page?.sections ?? []) Xy(t, []);
				}
				let e = JSON.parse(JSON.stringify(Jl.data));
				Jl = sa("urd-draft-templates", () => e, he, "urd-draft-maler"), Xl = {};
				for (let e of z(Ql)) {
					if (!Yl[e]) continue;
					let t = JSON.parse(JSON.stringify(Yl[e].data));
					Xl[e] = t, Yl[e] = sa(`urd-draft-template-${e}`, () => t, he, `urd-draft-mal-${e}`);
				}
				eu();
			}
			j(ye, {
				snap: !0,
				...z(O).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(D.data));
			D = sa(`urd-draft-${z(w)}`, () => i, he), lt.has(z(w)) && ge(`urd-draft-${z(w)}`, JSON.stringify(i)), dt(), T(Y("status.published"), "info"), ho(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			T(e?.code === "loginExpired" ? Y("status.loginExpired") : Y("status.loginRequired", { reason: Yi(e) ?? Y("status.unknownReason") }), "error"), await Qa();
		} else u?.status === 403 ? T(Yi(await u.json().catch(() => null)) ?? Y("status.noPublishAccess"), "error") : u?.status === 409 ? T(Y("status.publishRace"), "error") : T(u ? Yi(await u.json().catch(() => null)) ?? Y("status.publishFailed") : Y("status.publishUnavailable"), "error");
	}
	Et();
	var ab = my();
	wr("keydown", rn, Tt), wr("pointerdown", rn, wt);
	var ob = P(ab), sb = N(ob), cb = (e) => {
		var t = Ag(), n = N(t);
		G(n, () => C.pencil);
		var r = I(n);
		E(t), L((e, n) => {
			J(t, "title", e), U(r, ` ${n ?? ""}`);
		}, [() => Y("tip.backToEdit"), () => Y("ui.edit")]), B("click", t, $), H(e, t);
	};
	W(sb, (e) => {
		z(be) || e(cb);
	});
	var lb = I(sb, 2);
	let ub;
	var db = N(lb), fb = N(db), pb = (e) => {
		var t = Vg(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = (e) => {
			var t = Ng(), n = N(t);
			let r;
			var i = N(n);
			G(i, () => C[`device_${z(je)}`]), G(I(i), () => C.caret), E(n);
			var a = I(n, 2), o = (e) => {
				var t = Mg();
				Yr(t, 21, () => z(Oe), (e) => e.id, (e, t) => {
					var n = jg();
					let r;
					var i = N(n);
					G(i, () => C[`device_${z(t).id}`]);
					var a = I(i);
					E(n), L((e, i) => {
						r = _i(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(je) === z(t).id }), J(n, "title", e), U(a, ` ${i ?? ""}`);
					}, [() => Ae(z(t)), () => Y(`lbl.device.${z(t).id}`)]), B("click", n, () => {
						j(je, z(t).id, !0), j(Io, null);
					}), H(e, n);
				}), E(t), H(e, t);
			};
			W(a, (e) => {
				z(Io) === "device" && e(o);
			}), E(t), L((e) => {
				r = _i(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(Io) === "device" }), J(n, "title", e);
			}, [() => Y("lbl.group.device")]), B("click", n, () => j(Io, z(Io) === "device" ? null : "device", !0)), H(e, t);
		}, s = (e) => {
			var t = Fg(), n = P(t), r = F(n, !0), i = I(n, 2);
			Yr(i, 21, () => z(Oe), (e) => e.id, (e, t) => {
				var n = Pg();
				let r;
				G(n, () => C[`device_${z(t).id}`], !0), E(n), L((e) => {
					r = _i(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(je) === z(t).id }), J(n, "title", e);
				}, [() => Ae(z(t))]), B("click", n, () => j(je, z(t).id, !0)), H(e, n);
			}), E(i), L((e) => U(r, e), [() => Y("lbl.group.device")]), H(e, t);
		};
		W(a, (e) => {
			Bo.device ? e(o) : e(s, -1);
		});
		var c = I(a, 2), l = (e) => {
			var t = Lg(), n = N(t);
			let r;
			var i = N(n), a = F(i);
			G(I(i), () => C.caret), E(n);
			var o = I(n, 2), s = (e) => {
				var t = Ig(), n = N(t), r = N(n);
				G(r, () => C.minus, !0), E(r);
				var i = I(r, 2), a = F(i), o = I(i, 2);
				G(o, () => C.plus, !0), E(o), E(n);
				var s = I(n, 2);
				let c;
				var l = N(s);
				G(l, () => C.fit);
				var u = I(l);
				E(s), E(t), L((e, t, n, l, d, f) => {
					J(r, "title", e), J(i, "title", t), U(a, `${n ?? ""}%`), J(o, "title", l), c = _i(s, 1, "ghost svelte-1n46o8q", null, c, { active: z(Le) === "fit" }), J(s, "title", d), U(u, ` ${f ?? ""}`);
				}, [
					() => Y("tip.zoomOut"),
					() => Y("tip.zoomCurrent"),
					() => Math.round(z(He) * 100),
					() => Y("tip.zoomIn"),
					() => Y("tip.zoomFit"),
					() => Y("lbl.zoom.fit")
				]), B("click", r, () => Ue(-1)), B("click", o, () => Ue(1)), B("click", s, () => j(Le, "fit")), H(e, t);
			};
			W(o, (e) => {
				z(Io) === "zoom" && e(s);
			}), E(t), L((e, t) => {
				r = _i(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(Io) === "zoom" }), J(n, "title", e), U(a, `${t ?? ""}%`);
			}, [() => Y("lbl.group.zoom"), () => Math.round(z(He) * 100)]), B("click", n, () => j(Io, z(Io) === "zoom" ? null : "zoom", !0)), H(e, t);
		}, u = (e) => {
			var t = Rg(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			G(a, () => C.minus, !0), E(a);
			var o = I(a, 2), s = F(o), c = I(o, 2);
			G(c, () => C.plus, !0), E(c);
			var l = I(c, 2);
			let u;
			G(l, () => C.fit, !0), E(l), E(i), L((e, t, n, i, d, f) => {
				U(r, e), J(a, "title", t), J(o, "title", n), U(s, `${i ?? ""}%`), J(c, "title", d), u = _i(l, 1, "ghost svelte-1n46o8q", null, u, { active: z(Le) === "fit" }), J(l, "title", f);
			}, [
				() => Y("lbl.group.zoom"),
				() => Y("tip.zoomOut"),
				() => Y("tip.zoomCurrent"),
				() => Math.round(z(He) * 100),
				() => Y("tip.zoomIn"),
				() => Y("tip.zoomFit")
			]), B("click", a, () => Ue(-1)), B("click", c, () => Ue(1)), B("click", l, () => j(Le, "fit")), H(e, t);
		};
		W(c, (e) => {
			Bo.zoom ? e(l) : e(u, -1);
		});
		var d = I(c, 2), f = (e) => {
			var t = Ng(), n = N(t);
			let r;
			var i = N(n);
			G(i, () => C.gridToggle), G(I(i), () => C.caret), E(n);
			var a = I(n, 2), o = (e) => {
				var t = zg(), n = N(t);
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
				E(o), E(t), L((e, t, i, c) => {
					r = _i(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(qo) }), J(n, "title", e), U(a, ` ${t ?? ""}`), s = _i(o, 1, "ghost svelte-1n46o8q", null, s, { active: z(Ao) }), J(o, "title", i), U(l, ` ${c ?? ""}`);
				}, [
					() => Y("tip.gridToggle"),
					() => Y("lbl.view.grid"),
					() => Y("tip.guides"),
					() => Y("lbl.view.guides")
				]), B("click", n, _s), B("click", o, Ko), H(e, t);
			};
			W(a, (e) => {
				z(Io) === "view" && e(o);
			}), E(t), L((e) => {
				r = _i(n, 1, "ghost svelte-1n46o8q", null, r, { active: z(Io) === "view" || z(qo) || z(Ao) }), J(n, "title", e);
			}, [() => Y("lbl.group.view")]), B("click", n, () => j(Io, z(Io) === "view" ? null : "view", !0)), H(e, t);
		}, p = (e) => {
			var t = Bg(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i);
			let o;
			G(a, () => C.gridToggle, !0), E(a);
			var s = I(a, 2);
			let c;
			G(s, () => C.guides, !0), E(s), E(i), L((e, t, n) => {
				U(r, e), o = _i(a, 1, "ghost svelte-1n46o8q", null, o, { active: z(qo) }), J(a, "title", t), c = _i(s, 1, "ghost svelte-1n46o8q", null, c, { active: z(Ao) }), J(s, "title", n);
			}, [
				() => Y("lbl.group.view"),
				() => Y("tip.gridToggle"),
				() => Y("tip.guides")
			]), B("click", a, _s), B("click", s, Ko), H(e, t);
		};
		W(d, (e) => {
			Bo.view ? e(f) : e(p, -1);
		}), E(i), Mi(i, (e) => j(Lo, e), () => z(Lo)), L((e, t) => {
			J(n, "title", e), U(r, t);
		}, [() => Y("tip.switchPage"), () => ut()?.title ?? ""]), B("click", n, () => en("pages")), H(e, t);
	};
	W(fb, (e) => {
		z(ue) && e(pb);
	});
	var mb = I(fb, 2), hb = (e) => {
		var t = Hg(), n = N(t);
		G(n, () => C.phone);
		var r = I(n, 2), i = F(r, !0), a = F(I(r, 2), !0);
		E(t), L((e, n) => {
			J(t, "title", e), U(i, n), U(a, z(Ye));
		}, [() => Y("tip.attention"), () => Y(z(Ye) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: z(Ye) })]), B("click", t, $e), H(e, t);
	};
	W(mb, (e) => {
		z(Ye) > 0 && e(hb);
	}), E(db);
	var gb = I(db, 2), _b = N(gb), vb = (e) => {
		var t = Wg(), n = N(t), r = F(N(n), !0);
		ke(2), E(n);
		var i = I(n, 2), a = N(i);
		let o;
		var s = N(a);
		G(s, () => C.restore);
		var c = F(I(s), !0);
		E(a);
		var l = I(a, 2), u = (e) => {
			var t = Ug(), n = N(t);
			G(n, () => C.restore);
			var r = I(n);
			E(t), L((e, n) => {
				J(t, "title", e), U(r, ` ${n ?? ""}`);
			}, [() => Y("tip.discardArmed"), () => Y("ui.discardConfirm")]), B("click", t, nb), H(e, t);
		};
		W(l, (e) => {
			z($y) && e(u);
		}), E(i), Mi(i, (e) => j(eb, e), () => z(eb)), E(t), L((e, t, i, s, l) => {
			J(n, "title", e), J(n, "aria-label", t), U(r, i), o = _i(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: z($y) }), J(a, "title", s), U(c, l);
		}, [
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => Y("ui.unpublished"),
			() => z($y) ? Y("tip.discardArmed") : Y("tip.discard"),
			() => Y("ui.discard")
		]), B("click", a, tb), ui(2, t, () => oa, () => ({
			x: 24,
			duration: Tn ? 0 : 150
		})), H(e, t);
	};
	W(_b, (e) => {
		z(de) && e(vb);
	}), E(gb);
	var yb = I(gb, 2), bb = N(yb), xb = (e) => {
		var t = Jg(), n = P(t), r = N(n), i = (e) => {
			var t = Gg(), n = P(t);
			G(n, () => C.eye);
			var r = F(I(n, 2), !0);
			L((e) => U(r, e), [() => Y("ui.cleanView")]), H(e, t);
		}, a = (e) => {
			var t = Gg(), n = P(t);
			G(n, () => C.pencil);
			var r = F(I(n, 2), !0);
			L((e) => U(r, e), [() => Y("ui.edit")]), H(e, t);
		};
		W(r, (e) => {
			z(be) ? e(i) : e(a, -1);
		}), E(n);
		var o = I(n, 2), s = (e) => {
			var t = Kg(), n = N(t), r = (e) => {
				var t = Pr();
				G(P(t), () => C.warn), H(e, t);
			};
			W(n, (e) => {
				z(ve).allowed || e(r);
			});
			var i = I(n, 1, !0);
			E(t), L((e) => {
				J(t, "title", e), U(i, z(ve).login);
			}, [() => z(ve).allowed ? Y("tip.hasPublishAccess") : Y("tip.noPublishAccess")]), H(e, t);
		}, c = (e) => {
			var t = qg(), n = F(t, !0);
			L((e) => U(n, e), [() => Y("ui.loginGitHub")]), H(e, t);
		};
		W(o, (e) => {
			z(ve)?.loggedIn ? e(s) : z(ve) && e(c, 1);
		});
		var l = I(o, 2), u = N(l);
		G(u, () => C.external);
		var d = F(I(u, 2), !0);
		E(l);
		var f = I(l, 2), p = F(f, !0);
		L((e, t, r, i, a) => {
			J(n, "title", e), J(l, "href", t), J(l, "title", r), U(d, i), f.disabled = !z(de), U(p, a);
		}, [
			() => z(be) ? Y("tip.chromeHide") : Y("tip.chromeShow"),
			() => ut()?.path ?? "/",
			() => Y("ui.viewSite"),
			() => Y("ui.viewSite"),
			() => Y("ui.publish")
		]), B("click", n, $), B("click", f, ib), H(e, t);
	};
	W(bb, (e) => {
		z(ue) && e(xb);
	}), E(yb), E(lb);
	var Sb = I(lb, 2), Cb = (e) => {
		var t = sy(), n = N(t);
		let r;
		var i = N(n);
		Yr(i, 17, () => Ut, Gr, (e, t, n) => {
			var r = Xg(), i = P(r), a = F(i, !0);
			Yr(I(i, 2), 16, () => z(t), (e) => e, (e, t) => {
				var n = Yg();
				let r;
				var i = F(n, !0);
				L(() => {
					r = _i(n, 1, "svelte-1n46o8q", null, r, { active: z(Ht) === t }), U(i, Gt[t]);
				}), B("click", n, () => en(t)), H(e, n);
			}), L((e) => U(a, e), [() => Y(Wt[n])]), H(e, r);
		});
		var s = I(i, 2), c = I(N(s), 2);
		let u;
		G(c, () => C.gear, !0), E(c);
		var m = I(c, 2), h = (e) => {
			var t = $g(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
			X(I(a), {
				get value() {
					return z(se);
				},
				get options() {
					return ae;
				},
				onchange: (e) => j(se, e, !0)
			}), E(i);
			var o = I(i, 2), s = N(o), c = I(s);
			{
				let e = /* @__PURE__ */ k(() => [["auto", Y("lang.auto")], ...Xt()]);
				X(c, {
					get value() {
						return Qt;
					},
					get options() {
						return z(e);
					},
					onchange: $t
				});
			}
			E(o);
			var l = I(o, 2), u = N(l), d = I(u);
			{
				let e = /* @__PURE__ */ k(() => [["strip", Y("settings.layoutPickerStrip")], ["menu", Y("settings.layoutPickerMenu")]]);
				X(d, {
					get value() {
						return z(Mo);
					},
					get options() {
						return z(e);
					},
					onchange: No
				});
			}
			E(l);
			var f = I(l, 2), p = N(f), m = I(p);
			{
				let e = /* @__PURE__ */ k(() => [["wide", Y("settings.menuWide")], ["narrow", Y("settings.menuNarrow")]]);
				X(m, {
					get value() {
						return z(un);
					},
					get options() {
						return z(e);
					},
					onchange: fn
				});
			}
			E(f);
			var h = I(f, 2), g = N(h), _ = I(g);
			{
				let e = /* @__PURE__ */ k(() => [["remember", Y("settings.panelsRemember")], ["reset", Y("settings.panelsReset")]]);
				X(_, {
					get value() {
						return z(Bt);
					},
					get options() {
						return z(e);
					},
					onchange: Vt
				});
			}
			E(h);
			var v = I(h, 2), y = F(v, !0), b = I(v, 2), x = N(b);
			let S;
			var ee = F(x, !0), te = I(x, 2);
			let ne;
			var re = F(te, !0);
			E(b);
			var ie = I(b, 2), C = (e) => {
				var t = Zg(), n = N(t), r = F(n, !0), i = I(n, 2);
				K(i);
				var a = I(i, 2), o = F(a, !0), s = I(a, 2);
				K(s), E(t), L((e, t, n, a) => {
					U(r, e), J(i, "min", 640), J(i, "max", Wo), J(i, "title", t), q(i, z(we).width), U(o, n), J(s, "max", Go), J(s, "title", a), q(s, z(we).height || "");
				}, [
					() => Y("lbl.screen.w"),
					() => Y("tip.screen.width", {
						min: 640,
						max: Wo
					}),
					() => Y("lbl.screen.h"),
					() => Y("tip.screen.height", {
						min: 480,
						max: Go
					})
				]), B("change", i, (e) => {
					Te({ width: Number(e.target.value) }), e.target.value = z(we).width;
				}), B("change", s, (e) => {
					Te({ height: Number(e.target.value) }), e.target.value = z(we).height || "";
				}), H(e, t);
			};
			W(ie, (e) => {
				z(we).mode === "custom" && e(C);
			});
			var oe = I(ie, 2), ce = (e) => {
				var t = Qg(), n = P(t), r = F(n, !0), i = I(n, 2), a = N(i), o = I(a);
				K(o), E(i), L((e, t, s, c, l) => {
					J(n, "title", e), U(r, t), J(i, "title", s), U(a, `${c ?? ""} `), J(o, "placeholder", l), q(o, z(O).analytics?.token ?? "");
				}, [
					() => Y("tip.analytics"),
					() => Y("settings.analytics"),
					() => Y("tip.analytics"),
					() => Y("lbl.analyticsToken"),
					() => Y("ph.analyticsToken")
				]), B("change", o, (e) => cc(e.target.value)), H(e, t);
			};
			W(oe, (e) => {
				z(O) && e(ce);
			}), E(t), L((e, t, n, c, d, m, _, ie, C, ae, oe, se, ce, le, ue, w) => {
				U(r, e), J(i, "title", t), U(a, `${n ?? ""} `), J(o, "title", c), U(s, `${d ?? ""} `), J(l, "title", m), U(u, `${_ ?? ""} `), J(f, "title", ie), U(p, `${C ?? ""} `), J(h, "title", ae), U(g, `${oe ?? ""} `), J(v, "title", se), U(y, ce), J(b, "title", le), S = _i(x, 1, "svelte-1n46o8q", null, S, { on: z(we).mode === "own" }), U(ee, ue), ne = _i(te, 1, "svelte-1n46o8q", null, ne, { on: z(we).mode === "custom" }), U(re, w);
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
			]), B("click", x, () => Te({ mode: "own" })), B("click", te, () => Te({ mode: "custom" })), H(e, t);
		};
		W(m, (e) => {
			z(jo) && e(h);
		}), E(s), Mi(s, (e) => j(Po, e), () => z(Po)), E(n);
		var y = I(n, 2), b = (e) => {
			var t = oy();
			let n;
			var r = N(t), i = N(r), s = F(i, !0), c = I(i, 2), u = (e) => {
				var t = ah();
				let n;
				G(t, () => C.foldToggle, !0), E(t), L((e, r) => {
					n = _i(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: z(ap) }), J(t, "title", e), J(t, "aria-label", r);
				}, [() => Y(z(ap) ? "ui.collapseAll" : "ui.expandAll"), () => Y(z(ap) ? "ui.collapseAll" : "ui.expandAll")]), B("click", t, Q), H(e, t);
			};
			W(c, (e) => {
				z(ip) && e(u);
			}), E(r);
			var m = I(r, 2), h = (e) => {
				var t = u_(), n = N(t);
				Yr(n, 17, () => z(O).pages, (e) => e.id, (e, t) => {
					var n = a_();
					let r;
					var i = N(n);
					K(i);
					var a = I(i, 2), o = (e) => {
						var t = e_();
						L((e) => J(t, "title", e), [() => Y("tip.pages.homeLocked")]), H(e, t);
					}, s = (e) => {
						var n = t_();
						K(n), L((e, t) => {
							q(n, e), J(n, "title", t);
						}, [() => z(t).path.slice(1), () => Y("tip.pages.slug")]), B("change", n, (e) => qs(z(t), e.target.value)), H(e, n);
					};
					W(a, (e) => {
						z(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = I(a, 2), l = (e) => {
						var t = n_();
						G(t, () => C.warn, !0), E(t), L((e) => J(t, "title", e), [() => Y("tip.pages.missingDescription")]), H(e, t);
					};
					W(c, (e) => {
						z(Hs)[z(t).id] && e(l);
					});
					var u = I(c, 2), d = N(u);
					G(d, () => C.right, !0), E(d);
					var f = I(d, 2), p = N(f);
					G(p, () => C.kebab, !0), E(p);
					var m = I(p, 2), h = (e) => {
						var n = i_(), r = N(n), i = N(r);
						G(i, () => C.bookmark);
						var a = I(i);
						E(r);
						var o = I(r, 2), s = (e) => {
							var n = r_(), r = N(n);
							G(r, () => C.cross);
							var i = I(r);
							E(n), L((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`);
							}, [() => Y("tip.pages.delete"), () => Y("ui.deletePage")]), B("click", n, () => {
								j(ks, null), Xs(z(t));
							}), H(e, n);
						};
						W(o, (e) => {
							z(t).path !== "/" && e(s);
						}), E(n), L((e) => U(a, ` ${e ?? ""}`), [() => Y("ui.savePageTemplate")]), B("click", r, () => Ns(z(t))), H(e, n);
					};
					W(m, (e) => {
						z(ks) === z(t).id && e(h);
					}), E(f), E(u), E(n), L((e, a, o) => {
						r = _i(n, 1, "page-row svelte-1n46o8q", null, r, { current: z(t).id === z(w) }), q(i, z(t).title), J(i, "title", e), J(d, "title", a), d.disabled = z(t).id === z(w), J(p, "title", o);
					}, [
						() => Y("tip.pages.title"),
						() => Y("tip.pages.open"),
						() => Y("tip.pages.menu")
					]), B("change", i, (e) => Fs(z(t), e.target.value)), B("click", d, () => Do(z(t).id)), B("click", p, () => j(ks, z(ks) === z(t).id ? null : z(t).id, !0)), H(e, n);
				});
				var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2), s = N(o), c = N(s), l = I(c);
				ct(l), E(s);
				var u = I(s, 2), d = N(u), f = I(d);
				K(f), E(u);
				var p = I(u, 2), m = N(p), h = I(m);
				ct(h), E(p);
				var g = I(p, 2), _ = N(g), v = I(_), y = (e) => {
					var t = o_();
					L((e) => {
						J(t, "src", z(Rs).ogImage), J(t, "alt", e);
					}, [() => Y("lbl.ogImage")]), H(e, t);
				};
				W(v, (e) => {
					z(Rs).ogImage && e(y);
				}), E(g);
				var b = I(g, 2), x = N(b), S = N(x), ee = I(S);
				E(x);
				var te = I(x, 2), ne = (e) => {
					var t = Qp();
					G(t, () => C.cross, !0), E(t), L((e) => J(t, "title", e), [() => Y("tip.seo.removeOgImage")]), B("click", t, () => Bs("ogImage", "")), H(e, t);
				};
				W(te, (e) => {
					z(Rs).ogImage && e(ne);
				}), E(b);
				var re = I(b, 2), ie = N(re);
				K(ie);
				var ae = I(ie);
				E(re), E(o), E(r);
				var oe = I(r, 4);
				K(oe);
				var se = I(oe, 2), ce = F(se, !0), le = I(se, 2), ue = F(le, !0), de = I(le, 2), fe = N(de);
				let pe;
				var me = N(fe), T = N(me);
				G(T, () => au({ sections: [] }), !0), E(T);
				var he = F(I(T, 2), !0);
				E(me), E(fe), Yr(I(fe, 2), 17, () => su, (e) => e.id, (e, t) => {
					var n = s_();
					let r;
					var i = N(n), a = N(i);
					G(a, () => Ds[z(t).id], !0), E(a);
					var o = F(I(a, 2), !0);
					E(i), E(n), L((e, a) => {
						r = _i(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: z(Es) === `preset:${z(t).id}` }), J(i, "title", e), U(o, a);
					}, [() => Y("tip.pages.templatePick", { name: Y(z(t).labelKey) }), () => Y(z(t).labelKey)]), B("click", i, () => j(Es, z(Es) === `preset:${z(t).id}` ? null : `preset:${z(t).id}`, !0)), H(e, n);
				}), E(de);
				var ge = I(de, 2), _e = (e) => {
					var t = l_(), n = P(t), r = F(n, !0), i = I(n, 2);
					Yr(i, 20, () => z(Ql).filter((e) => Yl[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = c_();
						let r;
						var i = N(n), a = N(i);
						G(a, () => au(Yl[t].data.page), !0), E(a);
						var o = F(I(a, 2), !0);
						E(i);
						var s = I(i, 2);
						G(s, () => C.cross, !0), E(s), E(n), L((e, a) => {
							r = _i(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: z(Es) === t }), J(i, "title", e), U(o, Yl[t].data.mal.name), J(s, "title", a);
						}, [() => Y("tip.pages.templatePick", { name: Yl[t].data.mal.name }), () => Y("canvas.deleteTemplate")]), B("click", i, () => j(Es, z(Es) === t ? null : t, !0)), B("click", s, () => ou({ id: t })), H(e, n);
					}), E(i), L((e) => {
						U(r, e), yi(i, z(Os));
					}, [() => Y("canvas.tabMyTemplates")]), H(e, t);
				}, ve = /* @__PURE__ */ k(() => z(Ql).some((e) => Yl[e]?.data?.mal?.kind === "page"));
				W(ge, (e) => {
					z(ve) && e(_e);
				}), E(t), L((e, t, n, r, i, o, v, y, b, ee, te, ne, C, le, w, T, ge, _e, ve, ye, be, xe) => {
					U(a, e), J(s, "title", t), U(c, `${n ?? ""} `), q(l, z(Rs).description), J(u, "title", r), U(d, `${i ?? ""} `), q(f, z(Rs).ogTitle), J(f, "placeholder", o), J(p, "title", v), U(m, `${y ?? ""} `), q(h, z(Rs).ogDescription), J(h, "placeholder", z(Rs).description), J(g, "title", b), U(_, `${ee ?? ""} `), J(x, "title", te), U(S, `${ne ?? ""} `), J(re, "title", C), wi(ie, le), U(ae, ` ${w ?? ""}`), J(oe, "placeholder", T), J(se, "title", ge), se.disabled = _e, U(ce, ve), U(ue, ye), yi(de, z(Os)), pe = _i(fe, 1, "page-template-card svelte-1n46o8q", null, pe, { picked: z(Es) === null }), J(me, "title", be), U(he, xe);
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
					() => z(Rs).ogImage ? Y("ui.changeImage") : Y("ui.chooseImage"),
					() => Y("tip.seo.hideFromSearch"),
					() => z(O).pages.find((e) => e.id === z(w))?.noindex === !0,
					() => Y("lbl.hideFromSearch"),
					() => Y("ph.newPageName"),
					() => Y("hint.pages.autoMenu"),
					() => !z(Ts).trim(),
					() => Y("ui.createPage"),
					() => Y("canvas.tabPresets"),
					() => Y("tip.pages.blankPick"),
					() => Y("ui.blankPage")
				]), B("change", l, (e) => Bs("description", e.target.value)), B("change", f, (e) => Bs("ogTitle", e.target.value)), B("change", h, (e) => Bs("ogDescription", e.target.value)), B("change", ee, Ws), B("change", ie, (e) => Vs(e.target.checked)), B("keydown", oe, (e) => e.key === "Enter" && Ms()), Oi(oe, () => z(Ts), (e) => j(Ts, e)), B("click", se, Ms), B("click", me, () => j(Es, null)), H(e, t);
			}, y = (e) => {
				var t = X_(), n = N(t), r = N(n), i = F(r, !0), o = I(r, 2), s = N(o);
				{
					let e = /* @__PURE__ */ k(() => Y("common.type")), t = /* @__PURE__ */ k(() => z(O).nav.logo?.type ?? "text"), n = /* @__PURE__ */ k(() => [
						["text", Y("blocks.text")],
						["image", Y("blocks.image")],
						["both", Y("opt.logo.both")]
					]);
					Ps(s, {
						get label() {
							return z(e);
						},
						get value() {
							return z(t);
						},
						get options() {
							return z(n);
						},
						onchange: (e) => $s(e)
					});
				}
				var c = I(s, 2), l = (e) => {
					var t = d_(), n = P(t);
					K(n);
					var r = I(n, 2), i = N(r);
					{
						let e = /* @__PURE__ */ k(() => Y("tip.nav.logoFont")), t = /* @__PURE__ */ k(() => z(O).nav.logo?.font ?? ""), n = /* @__PURE__ */ k(() => [["", Y("common.inherit")], ...Uf.map(([e, t]) => [t, Y(e)])]);
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
							onchange: (e) => Zs({ font: e || void 0 })
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
					E(l), E(r), L((e, t, r, i, f, p, m) => {
						q(n, z(O).nav.logo?.value ?? ""), J(n, "placeholder", e), J(a, "title", t), q(a, z(O).nav.logo?.textSize ?? ""), s = _i(o, 1, "tbtn svelte-1n46o8q", null, s, { active: z(O).nav.logo?.bold !== !1 }), J(o, "title", r), U(c, i), u = _i(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), J(l, "title", p), U(d, m);
					}, [
						() => Y("ph.nav.logoName"),
						() => Y("tip.nav.textSize"),
						() => Y("format.bold"),
						() => Y("format.boldLetter"),
						() => !!z(O).nav.logo?.italic,
						() => Y("format.italic"),
						() => Y("format.italicLetter")
					]), B("input", n, (e) => Zs({ value: e.target.value })), B("change", a, (e) => Zs({ textSize: e.target.value ? Number(e.target.value) : void 0 })), B("click", o, () => Zs({ bold: z(O).nav.logo?.bold === !1 })), B("click", l, () => Zs({ italic: !z(O).nav.logo?.italic })), H(e, t);
				};
				W(c, (e) => {
					(z(O).nav.logo?.type ?? "text") !== "image" && e(l);
				});
				var u = I(c, 2), m = (e) => {
					let t = /* @__PURE__ */ k(() => z(O).nav.logo?.type === "image" ? z(O).nav.logo?.value : z(O).nav.logo?.image);
					var n = m_(), r = P(n), i = N(r), a = N(i), o = (e) => {
						var n = f_();
						L(() => J(n, "src", z(t))), H(e, n);
					};
					W(a, (e) => {
						z(t) && e(o);
					}), E(i);
					var s = I(i, 2), c = N(s), l = N(c), u = I(l);
					E(c);
					var d = I(c, 2), f = (e) => {
						var n = p_(), r = F(n, !0);
						L((e) => U(r, e), [() => z(t).split("/").pop()]), H(e, n);
					};
					W(d, (e) => {
						z(t) && e(f);
					}), E(s), E(r);
					var p = I(r, 2), m = N(p), h = N(m), g = F(h, !0), _ = I(h, 2);
					K(_), E(m);
					var v = I(m, 2), y = N(v), b = F(y, !0), x = I(y, 2);
					K(x), E(v);
					var S = I(v, 2), ee = N(S), te = F(ee, !0), ne = I(ee, 2);
					K(ne), E(S), E(p), L((e, t, n, r, i, a, o, s, u) => {
						J(c, "title", e), U(l, `${t ?? ""} `), J(m, "title", n), U(g, r), q(_, z(O).nav.logo?.size ?? 32), J(v, "title", i), U(b, a), J(x, "min", gs.min), J(x, "max", gs.max), J(x, "placeholder", o), q(x, z(O).nav.logo?.mobileSize ?? ""), J(S, "title", s), U(te, u), q(ne, z(O).nav.logo?.radius ?? 0);
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
					]), B("change", u, nc), B("change", _, (e) => Zs({ size: Number(e.target.value) })), B("change", x, (e) => {
						let t = e.target.value;
						Zs({ mobileSize: t === "" ? void 0 : xs(t, gs, void 0) }), e.target.value = z(O).nav.logo?.mobileSize ?? "";
					}), B("change", ne, (e) => Zs({ radius: Number(e.target.value) })), H(e, n);
				};
				W(u, (e) => {
					(z(O).nav.logo?.type ?? "text") !== "text" && e(m);
				});
				var h = I(u, 2), y = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.order")), n = /* @__PURE__ */ k(() => z(O).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ k(() => [["image-first", Y("opt.logo.imageFirst")], ["text-first", Y("opt.logo.textFirst")]]);
						Ps(e, {
							get label() {
								return z(t);
							},
							get value() {
								return z(n);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => Zs({ order: e })
						});
					}
				};
				W(h, (e) => {
					z(O).nav.logo?.type === "both" && e(y);
				}), E(o), E(n);
				var b = I(n, 2), x = N(b), S = F(x, !0), ee = I(x, 2), re = N(ee), ie = N(re), ae = F(ie, !0), oe = I(ie, 2), se = N(oe), ce = N(se), le = F(ce, !0), ue = I(ce, 2);
				Yr(ue, 21, () => [
					["bar", Y("opt.navVariant.bar")],
					["floating", Y("opt.navVariant.floating")],
					["floating-square", Y("opt.navVariant.floatingSquare")],
					["floating-tab", Y("opt.navVariant.floatingTab")],
					["side-left", Y("opt.navVariant.sideLeft")],
					["side-right", Y("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => g(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = h_();
					let o;
					var s = N(a);
					G(s, () => d[r()]);
					var c = F(I(s), !0);
					E(a), L(() => {
						o = _i(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.variant ?? "bar") === r() }), J(a, "aria-pressed", (z(O).nav.variant ?? "bar") === r()), U(c, i());
					}), B("click", a, () => Pl(r())), H(e, a);
				}), E(ue), E(se);
				var w = I(se, 2), de = (e) => {
					var t = __(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.navPillWidth")), t = /* @__PURE__ */ k(() => Y("tip.nav.pillWidth")), r = /* @__PURE__ */ k(() => z(O).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ k(() => [["content", Y("opt.pillWidth.content")], ["custom", Y("opt.pillWidth.custom")]]);
						Ps(n, {
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
							onchange: (e) => Ic("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = I(n, 2), i = (e) => {
						var t = g_(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i), E(t), L((e, n) => {
							J(t, "title", e), U(r, n), J(i, "min", us.min), J(i, "max", us.max), J(i, "step", us.step), q(i, typeof z(O).nav.style?.pillWidth == "number" ? z(O).nav.style.pillWidth : "");
						}, [() => Y("tip.nav.pillWidthPx"), () => Y("lbl.navPillWidthPx")]), B("change", i, (e) => Qc(e, "pillWidth", us)), H(e, t);
					};
					W(r, (e) => {
						z(O).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = I(r, 2), o = N(a), s = F(o, !0), c = I(o, 2);
					K(c), E(a), L((e, t) => {
						J(a, "title", e), U(s, t), J(c, "min", ms.min), J(c, "max", ms.max), J(c, "step", ms.step), J(c, "placeholder", z(O).nav.variant === "floating-square" ? "0" : ""), q(c, typeof z(O).nav.style?.radius == "number" ? z(O).nav.style.radius : "");
					}, [() => Y("tip.nav.radius"), () => Y("lbl.navRadius")]), B("change", c, (e) => Qc(e, "radius", ms)), H(e, t);
				};
				W(w, (e) => {
					z(zc) && e(de);
				});
				var fe = I(w, 2), pe = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navPlacement")), n = /* @__PURE__ */ k(() => z(O).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ k(() => [
							["top", Y("opt.place.top")],
							["middle", Y("opt.place.middle")],
							["bottom", Y("opt.place.bottom")]
						]);
						Ps(e, {
							get label() {
								return z(t);
							},
							get value() {
								return z(n);
							},
							get options() {
								return z(r);
							},
							onchange: (e) => Ic("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, me = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navPlacement")), n = /* @__PURE__ */ k(() => Y("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ k(() => z(O).nav.layout ?? "right"), i = /* @__PURE__ */ k(() => [
							["left", Y("common.left")],
							["center", Y("common.center")],
							["right", Y("common.right")]
						]);
						Ps(e, {
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
							onchange: (e) => Dc(e)
						});
					}
				};
				W(fe, (e) => {
					z(Lc) ? e(pe) : e(me, -1);
				});
				var T = I(fe, 2), he = (e) => {
					var t = v_(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = N(a);
					K(o);
					var s = I(o);
					E(a), L((e, t, c, l) => {
						J(n, "title", e), wi(r, z(O).nav.style?.glow === !0), U(i, ` ${t ?? ""}`), J(a, "title", c), wi(o, z(O).nav.style?.topGap !== !1), U(s, ` ${l ?? ""}`);
					}, [
						() => Y("tip.nav.glow"),
						() => Y("lbl.navGlow"),
						() => Y("tip.nav.topGap"),
						() => Y("lbl.navTopGap")
					]), B("change", r, (e) => Fl(e.target.checked)), B("change", o, (e) => Il(e.target.checked)), H(e, t);
				};
				W(T, (e) => {
					z(zc) && e(he);
				});
				var ge = I(T, 2), _e = (e) => {
					var t = v_(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = N(a);
					K(o);
					var s = I(o);
					E(a), L((e, t, c, l) => {
						J(n, "title", e), wi(r, z(O).nav.overlay === !0), U(i, ` ${t ?? ""}`), J(a, "title", c), wi(o, z(O).nav.style?.inset !== !1), U(s, ` ${l ?? ""}`);
					}, [
						() => Y("tip.nav.overlay"),
						() => Y("lbl.navOverlay"),
						() => Y("tip.nav.inset"),
						() => Y("lbl.navInset")
					]), B("change", r, (e) => bs("nav", () => {
						e.target.checked ? z(O).nav.overlay = !0 : delete z(O).nav.overlay;
					})), B("change", o, (e) => Ic("inset", e.target.checked ? void 0 : !1)), H(e, t);
				};
				W(ge, (e) => {
					!z(zc) && !z(Lc) && e(_e);
				});
				var ve = I(ge, 2), ye = (e) => {
					var t = y_(), n = P(t);
					{
						let e = /* @__PURE__ */ k(() => Y("lbl.textAlign")), t = /* @__PURE__ */ k(() => Y("tip.nav.sideAlign")), r = /* @__PURE__ */ k(() => z(O).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ k(() => [
							["left", Y("common.left")],
							["center", Y("common.center")],
							["right", Y("common.right")]
						]);
						Ps(n, {
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
							onchange: (e) => Ic("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = I(n, 2), i = N(r), a = F(i, !0), o = I(i, 2);
					K(o), E(r), L((e, t) => {
						J(r, "title", e), U(a, t), J(o, "min", hs.min), J(o, "max", hs.max), q(o, z(O).nav.style?.width ?? 250);
					}, [() => Y("tip.nav.colWidth"), () => Y("lbl.navColWidth")]), B("change", o, (e) => {
						let t = xs(e.target.value, hs, 250);
						Ic("width", t === 250 ? void 0 : t), e.target.value = z(O).nav.style?.width ?? 250;
					}), H(e, t);
				};
				W(ve, (e) => {
					z(Lc) && e(ye);
				}), E(oe), E(re);
				var be = I(re, 4), xe = N(be), Se = F(xe, !0), Ce = I(xe, 2), we = N(Ce);
				Yr(we, 20, () => vs, (e) => e, (e, t) => {
					var n = Yg();
					let r;
					var i = F(n, !0);
					L((e) => {
						r = _i(n, 1, "svelte-1n46o8q", null, r, { on: z(Wc) === t }), U(i, e);
					}, [() => Y(`opt.size.${t}`)]), B("click", n, () => Zc(t)), H(e, n);
				}), E(we);
				var Te = I(we, 2), Ee = N(Te), De = F(Ee, !0), Oe = I(Ee, 2), Ae = N(Oe), je = (e) => {
					var t = b_(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = I(i, 2);
					K(a), E(t), L((e, n) => {
						J(t, "title", e), U(r, n), J(i, "min", os.min), J(i, "max", os.max), J(i, "step", os.step), q(i, z(Yc)), J(a, "min", os.min), J(a, "max", os.max), q(a, z(Yc));
					}, [() => Y("tip.nav.thickness"), () => Y("lbl.navThickness")]), B("input", i, (e) => Ic("padY", e.target.valueAsNumber)), B("change", a, (e) => hl(e, "padY", os)), H(e, t);
				};
				W(Ae, (e) => {
					z(Lc) || e(je);
				});
				var Me = I(Ae, 2), Ne = N(Me), Pe = F(Ne, !0), Fe = I(Ne, 2);
				K(Fe);
				var Ie = I(Fe, 2);
				K(Ie), E(Me);
				var Le = I(Me, 2), Re = (e) => {
					var t = x_(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
					K(a), E(n);
					var o = I(n, 2), s = N(o), c = F(s, !0), l = I(s, 2);
					K(l), E(o), E(t), L((e, t, r, s, u, d) => {
						J(n, "title", e), U(i, t), J(a, "min", cs.min), J(a, "max", cs.max), J(a, "placeholder", r), q(a, z(O).nav.style?.padX ?? ""), J(o, "title", s), U(c, u), J(l, "min", ls.min), J(l, "max", ls.max), J(l, "placeholder", d), q(l, z(O).nav.style?.gap ?? "");
					}, [
						() => Y("tip.nav.padX"),
						() => Y("lbl.navPadX"),
						() => Y("common.auto"),
						() => Y("tip.nav.gap"),
						() => Y("lbl.navGap"),
						() => Y("common.auto")
					]), B("change", a, (e) => Qc(e, "padX", cs)), B("change", l, (e) => Qc(e, "gap", ls)), H(e, t);
				};
				W(Le, (e) => {
					z(Lc) || e(Re);
				}), E(Oe), E(Te), E(Ce), E(be);
				var ze = I(be, 4), Be = N(ze), Ve = F(Be, !0), He = I(Be, 2), Ue = N(He), We = (e) => {
					var t = C_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
					Yr(a, 21, () => [
						["", Y("common.none")],
						["bottom", Y("opt.navBorder.bottom")],
						["top", Y("opt.navBorder.top")],
						["both", Y("opt.navBorder.both")],
						["all", Y("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => g(z(t), 2));
						let r = () => z(n)[0], i = () => z(n)[1];
						var a = h_();
						let o;
						var s = N(a);
						G(s, () => p[r()]);
						var c = F(I(s), !0);
						E(a), L(() => {
							o = _i(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.border?.side ?? "") === r() }), J(a, "aria-pressed", (z(O).nav.style?.border?.side ?? "") === r()), U(c, i());
						}), B("click", a, () => Ic("border", r() ? {
							...z(O).nav.style?.border ?? {},
							side: r()
						} : void 0)), H(e, a);
					}), E(a), E(n);
					var o = I(n, 2), s = (e) => {
						var t = S_(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i);
						var a = I(i, 2), o = F(a, !0), s = I(a, 2);
						{
							let e = /* @__PURE__ */ k(() => z(O).nav.style.border.color ?? "text"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.borderColorPick"));
							Ta(s, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return z(n);
								},
								onchange: (e) => Ic("border", {
									...z(O).nav.style.border,
									color: e
								})
							});
						}
						E(t), L((e, t, s, c, l) => {
							J(n, "title", e), U(r, t), J(i, "title", s), q(i, z(O).nav.style.border.width ?? 1), J(a, "title", c), U(o, l);
						}, [
							() => Y("tip.nav.borderWidth"),
							() => Y("lbl.navBorderWidth"),
							() => Y("tip.nav.borderWidth"),
							() => Y("tip.nav.borderColorPick"),
							() => Y("lbl.navBorderColor")
						]), B("change", i, (e) => {
							let t = xs(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...z(O).nav.style.border };
							t === 1 ? delete n.width : n.width = t, Ic("border", n), e.target.value = z(O).nav.style.border.width ?? 1;
						}), H(e, t);
					};
					W(o, (e) => {
						z(O).nav.style?.border?.side && e(s);
					}), L((e, t, r) => {
						J(n, "title", e), U(i, t), J(a, "aria-label", r);
					}, [
						() => Y("tip.nav.border"),
						() => Y("lbl.navBorder"),
						() => Y("lbl.navBorder")
					]), H(e, t);
				};
				W(Ue, (e) => {
					z(Lc) || e(We);
				});
				var Ge = I(Ue, 2), Ke = (e) => {
					{
						let t = /* @__PURE__ */ k(() => Y("lbl.navShadow")), n = /* @__PURE__ */ k(() => Y("tip.nav.shadow")), r = /* @__PURE__ */ k(() => z(O).nav.style?.shadow ?? ""), i = /* @__PURE__ */ k(() => [
							["", Y("common.none")],
							["soft", Y("opt.navShadow.soft")],
							["strong", Y("opt.navShadow.strong")]
						]);
						Ps(e, {
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
							onchange: (e) => Ic("shadow", e || void 0)
						});
					}
				};
				W(Ge, (e) => {
					!z(zc) && !z(Lc) && e(Ke);
				}), E(He), E(ze);
				var qe = I(ze, 4), Je = N(qe), Ye = F(Je, !0), Xe = I(Je, 2), Ze = N(Xe), Qe = (e) => {
					var t = T_(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
					K(a);
					var o = I(a);
					E(i);
					var s = I(i, 2), c = (e) => {
						var t = Bm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.navScroll")), t = /* @__PURE__ */ k(() => Y("tip.nav.scroll")), r = /* @__PURE__ */ k(() => z(O).nav.scroll ?? "none"), i = /* @__PURE__ */ k(() => [
								["none", Y("opt.scroll.none")],
								["shrink", Y("opt.scroll.shrink")],
								["hide", Y("opt.scroll.hide")]
							]);
							Ps(n, {
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
								onchange: (e) => bs("nav", () => {
									e === "none" ? delete z(O).nav.scroll : z(O).nav.scroll = e;
								})
							});
						}
						var r = I(n, 2), i = (e) => {
							var t = w_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
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
								var t = Hm(), n = N(t);
								K(n);
								var r = I(n);
								E(t), L((e, i) => {
									J(t, "title", e), wi(n, z(O).nav.style?.shrinkLogo === !0), U(r, ` ${i ?? ""}`);
								}, [() => Y("tip.nav.shrinkLogo"), () => Y("lbl.navShrinkLogo")]), B("change", n, (e) => Ic("shrinkLogo", e.target.checked ? !0 : void 0)), H(e, t);
							};
							W(_, (e) => {
								(z(O).nav.logo?.type ?? "text") !== "text" && e(v);
							}), L((e, t, r, c, p, _, v, y) => {
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
							]), B("input", a, (e) => yl(e.target.valueAsNumber)), B("input", u, (e) => Cl(e.target.valueAsNumber)), B("input", h, (e) => wl(e.target.valueAsNumber)), H(e, t);
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
					E(l), E(t), L((e, t, n, s, c) => {
						U(r, e), J(i, "title", t), wi(a, z(O).nav.sticky !== !1), U(o, ` ${n ?? ""}`), J(l, "title", s), wi(u, z(O).nav.style?.atTop === "clear"), U(d, ` ${c ?? ""}`);
					}, [
						() => Y("group.navScrolling"),
						() => Y("tip.nav.sticky"),
						() => Y("lbl.navSticky"),
						() => Y("tip.nav.atTop"),
						() => Y("lbl.navAtTop")
					]), B("change", a, (e) => bs("nav", () => {
						z(O).nav.sticky = e.target.checked;
					})), B("change", u, (e) => Ic("atTop", e.target.checked ? "clear" : void 0)), H(e, t);
				};
				W(Ze, (e) => {
					z(Lc) || e(Qe);
				}), E(Xe), E(qe);
				var $e = I(qe, 4), et = N($e), tt = F(et, !0), nt = I(et, 2), D = N(nt), rt = N(D), at = (e) => {
					var t = E_(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i), E(t), L((e, n, a) => {
						J(t, "title", e), U(r, n), J(i, "min", os.min), J(i, "max", os.max), J(i, "placeholder", a), q(i, z(O).nav.style?.mobile?.padY ?? "");
					}, [
						() => Y("tip.nav.thickness"),
						() => Y("lbl.navThickness"),
						() => Y("lbl.navSameAsDesktop")
					]), B("change", i, (e) => vl(e, "padY", os)), H(e, t);
				};
				W(rt, (e) => {
					z(Lc) || e(at);
				});
				var ot = I(rt, 2), st = N(ot), ct = F(st, !0), lt = I(st, 2);
				K(lt), E(ot), E(D);
				var ut = I(D, 2), dt = N(ut), ft = N(dt), pt = F(ft, !0), mt = I(ft, 2);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ k(() => [["", Y("lbl.navSameAsDesktop")], ...vs.map((e) => [e, Y(`opt.size.${e}`)])]);
					X(mt, {
						filled: !0,
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => $c("size", e || void 0)
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
						onchange: (e) => $c("layout", e || void 0)
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
						onchange: (e) => $c("tools", e ? { side: e } : void 0)
					});
				}
				E(bt);
				var wt = I(bt, 2), Tt = (e) => {
					var t = D_(), n = N(t), r = F(n, !0), i = I(n, 2);
					{
						let e = /* @__PURE__ */ k(() => el("overlay")), t = /* @__PURE__ */ k(() => [
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
							onchange: (e) => tl("overlay", e)
						});
					}
					E(t), L((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.nav.mobileOverlay"), () => Y("lbl.navOverlay")]), H(e, t);
				};
				W(wt, (e) => {
					!z(zc) && !z(Lc) && e(Tt);
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
						onchange: (e) => nl(e)
					});
				}
				E(Dt), E(Et);
				var jt = I(Et, 2), Mt = (e) => {
					var t = S_(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = I(i, 2), o = F(a, !0), s = I(a, 2);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.borderColorPick"));
						Ta(s, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => $c("border", {
								...z(O).nav.style.mobile.border,
								color: e
							})
						});
					}
					E(t), L((e, t, s, c, l) => {
						J(n, "title", e), U(r, t), J(i, "title", s), q(i, z(O).nav.style.mobile.border.width ?? 1), J(a, "title", c), U(o, l);
					}, [
						() => Y("tip.nav.borderWidth"),
						() => Y("lbl.navBorderWidth"),
						() => Y("tip.nav.borderWidth"),
						() => Y("tip.nav.borderColorPick"),
						() => Y("lbl.navBorderColor")
					]), B("change", i, (e) => {
						let t = xs(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...z(O).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, $c("border", n), e.target.value = z(O).nav.style.mobile.border.width ?? 1;
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
						onchange: (e) => Ic("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				E(Pt);
				var Rt = I(Pt, 2), zt = (e) => {
					var t = D_(), n = N(t), r = F(n, !0), i = I(n, 2);
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
							onchange: (e) => Ic("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					E(t), L((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.nav.sheetMotion"), () => Y("lbl.sheetMotion")]), H(e, t);
				};
				W(Rt, (e) => {
					z(O).nav.style?.mobileMenu === "sheet" && e(zt);
				}), E(Nt);
				var Bt = I(Nt, 2), Vt = (e) => {
					var t = O_(), n = P(t), r = N(n);
					K(r);
					var i = I(r);
					E(n);
					var a = I(n, 2), o = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(O).nav.style?.sheetTheme === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetTheme"), () => Y("lbl.sheetTheme")]), B("change", n, (e) => Ic("sheetTheme", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(a, (e) => {
						z(O).theme?.alt?.tokens && z(O).nav.style?.tools?.theme !== !1 && e(o);
					});
					var s = I(a, 2), c = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(O).nav.style?.sheetCart === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetCart"), () => Y("lbl.sheetCart")]), B("change", n, (e) => Ic("sheetCart", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(s, (e) => {
						z(O).nav.cart?.show && e(c);
					});
					var l = I(s, 2), u = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(O).nav.style?.sheetAnnounce === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetAnnounce"), () => Y("lbl.sheetAnnounce")]), B("change", n, (e) => Ic("sheetAnnounce", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(l, (e) => {
						z(O).nav.announcement?.show && e(u);
					});
					var d = I(l, 2), f = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(O).nav.style?.sheetToolLabels === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.sheetToolLabels"), () => Y("lbl.sheetToolLabels")]), B("change", n, (e) => Ic("sheetToolLabels", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(d, (e) => {
						(z(O).nav.style?.sheetTheme || z(O).nav.style?.sheetCart) && e(f);
					});
					var p = I(d, 2), m = N(p), h = F(m, !0), g = I(m, 2);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.sheetBg"));
						Ta(g, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => ml("bg", e)
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
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.sheet?.textColor ?? z(O).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.sheetTextColorPick"));
						Ta(te, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => ml("textColor", e)
						});
					}
					E(S), L((e, t, a, o, s, c, l, u, d, f) => {
						J(n, "title", e), wi(r, z(O).nav.style?.sheetLogo === !0), U(i, ` ${t ?? ""}`), J(p, "title", a), U(h, o), J(_, "title", s), q(_, c), U(v, `${l ?? ""}%`), J(y, "title", u), wi(b, z(O).nav.style?.sheet?.blur ?? z(O).nav.style?.blur !== !1), U(x, ` ${d ?? ""}`), U(ee, `${f ?? ""} `);
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
					]), B("change", r, (e) => Ic("sheetLogo", e.target.checked ? !0 : void 0)), B("input", _, (e) => ml("bgOpacity", e.target.valueAsNumber / 100)), B("change", b, (e) => ml("blur", e.target.checked)), H(e, t);
				};
				W(Bt, (e) => {
					z(O).nav.style?.mobileMenu === "sheet" && e(Vt);
				});
				var Ht = I(Bt, 2), Ut = (e) => {
					var t = D_(), n = N(t), r = F(n, !0), i = I(n, 2);
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
							onchange: (e) => Ic("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					E(t), L((e, n) => {
						J(t, "title", e), U(r, n);
					}, [() => Y("tip.nav.mobileSubs"), () => Y("lbl.mobileSubs")]), H(e, t);
				}, Wt = /* @__PURE__ */ k(() => z(O).nav.items?.some((e) => e.children?.length));
				W(Ht, (e) => {
					z(Wt) && e(Ut);
				}), E(nt), E($e);
				var Gt = I($e, 4), Kt = N(Gt), qt = F(Kt, !0), Jt = I(Kt, 2), A = N(Jt), Yt = N(A), Xt = F(Yt, !0), Zt = I(Yt, 2);
				Yr(Zt, 21, () => [
					["standard", Y("opt.hover.standard")],
					["underline", Y("opt.hover.underline")],
					["pill", Y("opt.hover.pill")],
					["lift-plain", Y("opt.hover.liftPlain")],
					["lift", Y("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => g(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = k_();
					let o;
					var s = N(a), c = F(s, !0), l = F(I(s), !0);
					E(a), L((e) => {
						o = _i(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.hover ?? "standard") === r() }), J(a, "aria-pressed", (z(O).nav.style?.hover ?? "standard") === r()), _i(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), U(c, e), U(l, i());
					}, [() => Y("seed.home")]), B("click", a, () => Ll(r())), H(e, a);
				}), E(Zt), E(A);
				var Qt = I(A, 2), $t = (e) => {
					var t = A_(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = F(I(i, 2));
					E(t), L((e, n, o) => {
						J(t, "title", e), U(r, n), q(i, z(O).nav.style?.hoverGlow ?? .6), U(a, `${o ?? ""}%`);
					}, [
						() => Y("tip.nav.hoverGlow"),
						() => Y("lbl.glowStrength"),
						() => Math.round((z(O).nav.style?.hoverGlow ?? .6) * 100)
					]), B("input", i, (e) => Ic("hoverGlow", Number(e.target.value))), H(e, t);
				};
				W(Qt, (e) => {
					z(O).nav.style?.hover === "lift" && e($t);
				});
				var en = I(Qt, 2), tn = N(en), nn = (e) => {
					var t = Yh(), n = N(t);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ k(ga);
						Ta(n, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(El)[1];
							},
							onchange: (e) => Ic("hoverColor", e)
						});
					}
					var r = F(I(n, 2), !0);
					E(t), L(() => {
						J(t, "title", z(El)[1]), U(r, z(El)[0]);
					}), H(e, t);
				};
				W(tn, (e) => {
					z(El) && e(nn);
				});
				var rn = I(tn, 2), M = N(rn);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.hoverTextColorPick"));
					Ta(M, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => Ic("hoverTextColor", e)
					});
				}
				var an = F(I(M, 2), !0);
				E(rn);
				var on = I(rn, 2), sn = N(on);
				{
					let e = /* @__PURE__ */ k(() => z(O).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.textColorPick"));
					Ta(sn, {
						get value() {
							return z(e);
						},
						get tokens() {
							return z(t);
						},
						get label() {
							return z(n);
						},
						onchange: (e) => Ic("textColor", e)
					});
				}
				var cn = F(I(sn, 2), !0);
				E(on), E(en);
				var ln = I(en, 2), un = N(ln);
				K(un);
				var dn = I(un);
				E(ln), E(Jt), E(Gt);
				var fn = I(Gt, 4), pn = N(fn), mn = F(pn, !0), hn = I(pn, 2), gn = N(hn);
				a(gn, () => da, () => z(O).nav?.style?.background?.layers ?? []), E(hn), E(fn), E(ee), E(b);
				var _n = I(b, 2), vn = N(_n), yn = F(vn, !0), bn = I(vn, 2), xn = N(bn), Sn = N(xn);
				K(Sn);
				var Cn = I(Sn);
				E(xn);
				var wn = I(xn, 2), Tn = (e) => {
					var t = M_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
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
							onchange: (e) => bs("edit:nav-announce-link", () => {
								let t = { ...z(O).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), z(O).nav.announcement = t;
							})
						});
					}
					E(o);
					var l = I(o, 2), u = (e) => {
						var t = j_(), n = N(t), r = F(n, !0), i = I(n, 2);
						K(i), E(t), L((e, n) => {
							J(t, "title", e), U(r, n), q(i, z(O).nav.announcement?.href ?? "");
						}, [() => Y("tip.nav.announceHref"), () => Y("lbl.announceHref")]), B("change", i, (e) => rl("href", e.target.value.trim())), H(e, t);
					};
					W(l, (e) => {
						z(O).nav.announcement?.href !== void 0 && !z(O).nav.announcement?.page && e(u);
					});
					var d = I(l, 2), f = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(O).nav.announcement?.sticky !== !1), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.announceSticky"), () => Y("lbl.announceSticky")]), B("change", n, (e) => rl("sticky", e.target.checked ? void 0 : !1)), H(e, t);
					};
					W(d, (e) => {
						z(O).nav.sticky !== !1 && !z(zc) && !z(Lc) && !z(O).nav.overlay && e(f);
					});
					var p = I(d, 2), m = (e) => {
						var t = Hm(), n = N(t);
						K(n);
						var r = I(n);
						E(t), L((e, i) => {
							J(t, "title", e), wi(n, z(O).nav.announcement?.followNav === !0), U(r, ` ${i ?? ""}`);
						}, [() => Y("tip.nav.announceFollowNav"), () => Y("lbl.announceFollowNav")]), B("change", n, (e) => rl("followNav", e.target.checked ? !0 : void 0)), H(e, t);
					};
					W(p, (e) => {
						z(O).nav.scroll === "hide" && z(O).nav.sticky !== !1 && !z(Lc) && z(O).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = I(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.announcePlace")), n = /* @__PURE__ */ k(() => Y("tip.nav.announcePlace")), r = /* @__PURE__ */ k(() => z(O).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ k(() => [
								["nav", Y("opt.announcePlace.nav")],
								["page", Y("opt.announcePlace.page")],
								["content", Y("opt.announcePlace.content")]
							]);
							Ps(e, {
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
								onchange: (e) => rl("place", e === "nav" ? void 0 : e)
							});
						}
					};
					W(h, (e) => {
						z(Lc) && e(g);
					});
					var _ = I(h, 2), v = N(_);
					K(v);
					var y = I(v);
					E(_);
					var b = I(_, 2), x = (e) => {
						var t = uh(), n = F(t, !0);
						L((e, r) => {
							J(t, "title", e), U(n, r);
						}, [() => Y("tip.nav.announceShowAgain"), () => Y("lbl.announceShowAgain")]), B("click", t, () => it?.sendAnnounceReset()), H(e, t);
					};
					W(b, (e) => {
						z(O).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = I(b, 2), ee = N(S), te = I(ee);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.announceColor"));
						Ta(te, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => rl("color", e)
						});
					}
					E(S);
					var ne = I(S, 2), re = N(ne), ie = I(re);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.announceTextColor"));
						Ta(ie, {
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
					E(ne), L((e, t, r, c, l, u, d, f, p, m) => {
						J(n, "title", e), U(i, t), q(a, z(O).nav.announcement?.text ?? ""), J(o, "title", r), U(s, `${c ?? ""} `), J(_, "title", l), wi(v, z(O).nav.announcement?.dismiss !== !1), U(y, ` ${u ?? ""}`), J(S, "title", d), U(ee, `${f ?? ""} `), J(ne, "title", p), U(re, `${m ?? ""} `);
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
					]), B("change", a, (e) => rl("text", e.target.value.trim() || void 0)), B("change", v, (e) => rl("dismiss", e.target.checked ? void 0 : !1)), H(e, t);
				};
				W(wn, (e) => {
					z(O).nav.announcement?.show && e(Tn);
				}), E(bn), E(_n);
				var En = I(_n, 2), Dn = N(En), On = F(Dn, !0), kn = I(Dn, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = N_(), i = N(r);
						G(i, () => C.up, !0), E(i);
						var a = I(i, 2);
						G(a, () => C.down, !0), E(a), E(r), L((e, t) => {
							J(i, "title", e), i.disabled = n() === 0, J(a, "title", t), a.disabled = n() === z(Mc).length - 1;
						}, [() => Y("tip.moveUp"), () => Y("tip.moveDown")]), B("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), Nc(t(), -1);
						}), B("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), Nc(t(), 1);
						}), H(e, r);
					};
					var R = N(kn), An = (e) => {
						var t = Bm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.toolsSide")), t = /* @__PURE__ */ k(() => Y("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ k(() => z(O).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ k(() => [["start", Y("opt.toolsSide.top")], ["end", Y("opt.toolsSide.bottom")]]);
							Ps(n, {
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
								onchange: (e) => Pc("side", e === "start" ? "start" : void 0)
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
							Ps(r, {
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
								onchange: (e) => Pc("align", e === "center" ? void 0 : e)
							});
						}
						H(e, t);
					}, jn = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.toolsSide")), n = /* @__PURE__ */ k(() => Y("tip.nav.toolsSide")), r = /* @__PURE__ */ k(() => z(O).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ k(() => [["start", Y("opt.toolsSide.start")], ["end", Y("opt.toolsSide.end")]]);
							Ps(e, {
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
								onchange: (e) => Pc("side", e === "start" ? "start" : void 0)
							});
						}
					};
					W(R, (e) => {
						z(Lc) ? e(An) : e(jn, -1);
					}), Yr(I(R, 2), 18, () => z(Mc), (e) => e, (t, n, r) => {
						var i = Pr(), a = P(i), o = (t) => {
							var i = Pr(), a = P(i), o = (t) => {
								var i = P_(), a = N(i), o = N(a), s = F(o, !0), c = I(o);
								e(c, () => n, () => z(r)), E(a);
								var l = I(a, 2), u = N(l);
								K(u);
								var d = I(u);
								E(l), E(i), L((e, t, n) => {
									U(s, e), J(l, "title", t), wi(u, z(O).nav.style?.tools?.theme !== !1), U(d, ` ${n ?? ""}`);
								}, [
									() => Y("lbl.themeToggle"),
									() => Y("tip.nav.themeToggle"),
									() => Y("lbl.showInMenu")
								]), B("change", u, (e) => Pc("theme", e.target.checked ? void 0 : !1)), H(t, i);
							};
							W(a, (e) => {
								z(O).theme?.alt?.tokens && e(o);
							}), H(t, i);
						}, s = (t) => {
							var i = F_(), a = N(i), o = N(a), s = F(o, !0), c = I(o);
							e(c, () => n, () => z(r)), E(a);
							var l = I(a, 2), u = N(l);
							K(u);
							var d = I(u);
							E(l);
							var f = I(l, 2), p = (e) => {
								var t = D_(), n = N(t), r = F(n, !0), i = I(n, 2);
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
										onchange: (e) => bs("nav", () => {
											e ? z(O).nav.cart.href = e : delete z(O).nav.cart.href;
										})
									});
								}
								E(t), L((e, n) => {
									J(t, "title", e), U(r, n);
								}, [() => Y("tip.cart.checkout"), () => Y("lbl.checkoutPage")]), H(e, t);
							};
							W(f, (e) => {
								z(O).nav.cart?.show && e(p);
							}), E(i), L((e, t, n) => {
								U(s, e), J(l, "title", t), wi(u, z(O).nav.cart?.show === !0), U(d, ` ${n ?? ""}`);
							}, [
								() => Y("lbl.cart"),
								() => Y("tip.nav.cart"),
								() => Y("lbl.showInMenu")
							]), B("change", u, (e) => bs("nav", () => {
								e.target.checked ? z(O).nav.cart = {
									...z(O).nav.cart ?? {},
									show: !0
								} : delete z(O).nav.cart;
							})), H(t, i);
						}, c = (t) => {
							var i = W_(), a = N(i), o = N(a), s = N(o, !0), c = I(s);
							e(c, () => n, () => z(r)), E(o), E(a);
							var l = I(a, 2), u = N(l), d = N(u);
							K(d);
							var f = I(d);
							E(u);
							var p = I(u, 2), m = (e) => {
								var t = U_(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
								Yr(a, 21, () => z(Ml), ([e, t]) => e, (e, t) => {
									var n = /* @__PURE__ */ k(() => g(z(t), 2));
									let r = () => z(n)[0], i = () => z(n)[1];
									var a = h_();
									let o;
									var s = N(a);
									G(s, () => v[r()]);
									var c = F(I(s), !0);
									E(a), L(() => {
										o = _i(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.launcher?.view ?? "grid") === r() }), J(a, "aria-pressed", (z(O).nav.launcher?.view ?? "grid") === r()), U(c, i());
									}), B("click", a, () => cl("view", r() === "grid" ? void 0 : r())), H(e, a);
								}), E(a), E(n);
								var o = I(n, 2);
								{
									let e = /* @__PURE__ */ k(() => Y("lbl.launcherMobileView")), t = /* @__PURE__ */ k(() => Y("tip.nav.launcherMobileView")), n = /* @__PURE__ */ k(() => z(O).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ k(() => [["", Y("lbl.navSameAsDesktop")], ...z(Ml)]);
									Ps(o, {
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
										onchange: (e) => cl("mobileView", e || void 0)
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
								var h = I(f, 2), _ = (e) => {
									var t = I_(), n = N(t), r = F(n, !0), i = I(n, 2);
									K(i), E(t), L((e, n, a) => {
										J(t, "title", e), U(r, n), J(i, "placeholder", a), q(i, z(O).nav.launcher?.title ?? "");
									}, [
										() => Y("tip.nav.launcherTitleText"),
										() => Y("lbl.launcherTitle"),
										() => Y("ph.launcherTitle")
									]), B("change", i, (e) => cl("title", e.target.value.trim() || void 0)), H(e, t);
								};
								W(h, (e) => {
									z(O).nav.launcher?.showTitle !== !1 && e(_);
								});
								var y = I(h, 2), b = N(y), x = F(b, !0), S = I(b, 2), ee = N(S);
								{
									let e = /* @__PURE__ */ k(() => z(O).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ k(() => z(O).nav.launcher?.image ?? ""), n = /* @__PURE__ */ k(ol), r = /* @__PURE__ */ k(() => Y("opt.launcherDots")), i = /* @__PURE__ */ k(() => Y("tip.nav.launcherIcon"));
									Ro(ee, {
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
										onpick: (e) => sl(null, e),
										onfile: (e) => pl(e, null),
										children: (e, t) => {
											var n = Pr(), r = P(n), i = (e) => {
												var t = L_();
												L(() => J(t, "src", z(O).nav.launcher.image)), H(e, t);
											}, a = (e) => {
												var t = Pr();
												G(P(t), () => lo(z(O).nav.launcher.icon) || ""), H(e, t);
											}, o = (e) => {
												var t = Pr();
												G(P(t), () => il), H(e, t);
											};
											W(r, (e) => {
												z(O).nav.launcher?.image ? e(i) : z(O).nav.launcher?.icon ? e(a, 1) : e(o, -1);
											}), H(e, n);
										},
										$$slots: { default: !0 }
									});
								}
								var te = I(ee, 2), ne = N(te), re = (e) => {
									var t = Nr();
									L((e) => U(t, e), [() => Y("mp.ownImage")]), H(e, t);
								}, ie = (e) => {
									var t = Nr();
									L((e) => U(t, e), [() => Y(so[z(O).nav.launcher.icon]?.labelKey ?? "common.none")]), H(e, t);
								}, ae = (e) => {
									var t = Nr();
									L((e) => U(t, e), [() => Y("opt.launcherDots")]), H(e, t);
								};
								W(ne, (e) => {
									z(O).nav.launcher?.image ? e(re) : z(O).nav.launcher?.icon ? e(ie, 1) : e(ae, -1);
								}), E(te), E(S), E(y);
								var oe = I(y, 2);
								Yr(oe, 17, () => z(O).nav.launcher?.links ?? [], Gr, (e, t, n) => {
									let r = /* @__PURE__ */ k(() => !rd(z(t).href ?? ""));
									var i = H_();
									let a;
									var o = N(i), s = N(o), c = N(s), l = (e) => {
										var n = f_();
										L(() => J(n, "src", z(t).image)), H(e, n);
									}, u = (e) => {
										var n = Pr();
										G(P(n), () => lo(z(t).icon) || ""), H(e, n);
									};
									W(c, (e) => {
										z(t).image ? e(l) : e(u, -1);
									}), E(s);
									var d = I(s, 2), f = F(d, !0), p = I(d, 2), m = (e) => {
										var t = R_();
										G(t, () => C.warn, !0), E(t), L((e) => J(t, "title", e), [() => Y("tip.badTarget")]), H(e, t);
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
										var i = V_(), a = N(i);
										{
											let e = /* @__PURE__ */ k(() => z(t).icon ?? ""), r = /* @__PURE__ */ k(() => z(t).image ?? ""), i = /* @__PURE__ */ k(ol), o = /* @__PURE__ */ k(() => Y("mp.pickMark"));
											Ro(a, {
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
												onpick: (e) => sl(n, e),
												onfile: (e) => pl(e, n),
												children: (e, n) => {
													var r = z_(), i = P(r), a = N(i), o = (e) => {
														var n = f_();
														L(() => J(n, "src", z(t).image)), H(e, n);
													}, s = (e) => {
														var n = Pr();
														G(P(n), () => lo(z(t).icon) || ""), H(e, n);
													};
													W(a, (e) => {
														z(t).image ? e(o) : z(t).icon && e(s, 1);
													}), E(i);
													var c = F(I(i, 2), !0);
													L((e) => U(c, e), [() => z(t).label || Y("seed.link")]), H(e, r);
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
											var t = B_(), n = F(t, !0);
											L((e) => U(n, e), [() => Y("ui.badTarget")]), H(e, t);
										};
										W(u, (e) => {
											z(r) && e(d);
										});
										var f = I(u, 2), p = N(f);
										{
											let e = /* @__PURE__ */ k(() => z(t).icon ?? ""), r = /* @__PURE__ */ k(() => z(t).image ?? ""), i = /* @__PURE__ */ k(ol), a = /* @__PURE__ */ k(() => Y("mp.pickMark"));
											Ro(p, {
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
												onpick: (e) => sl(n, e),
												onfile: (e) => pl(e, n),
												children: (e, t) => {
													ke();
													var n = Nr();
													L((e) => U(n, e), [() => Y("mp.changeMark")]), H(e, n);
												},
												$$slots: { default: !0 }
											});
										}
										var m = I(p, 2), h = F(m, !0);
										E(f), E(o), E(i), L((e, n, i, a, o, u) => {
											q(s, z(t).label), J(s, "title", e), J(s, "placeholder", n), l = _i(c, 1, "field-filled svelte-1n46o8q", null, l, { "bad-target": z(r) }), q(c, z(t).href ?? ""), J(c, "placeholder", i), J(c, "title", a), J(m, "title", o), U(h, u);
										}, [
											() => Y("tip.nav.launcherLabel"),
											() => Y("lbl.text"),
											() => Y("ph.hrefAnchor"),
											() => z(r) ? Y("tip.badTarget") : Y("tip.hrefAnchor"),
											() => Y("tip.removeLink"),
											() => Y("ui.remove")
										]), B("change", s, (e) => fl(n, "label", e.target.value)), B("change", c, (e) => fl(n, "href", e.target.value)), B("click", m, () => ul(n)), H(e, i);
									};
									W(y, (e) => {
										z(al) === n && e(b);
									}), E(i), L((e, t, r) => {
										a = _i(i, 1, "lrow svelte-1n46o8q", null, a, { open: z(al) === n }), U(f, e), J(g, "title", t), J(_, "title", r), _.disabled = n === z(O).nav.launcher.links.length - 1;
									}, [
										() => z(t).label || Y("seed.link"),
										() => Y("tip.moveUp"),
										() => Y("tip.moveDown")
									]), B("click", o, () => j(al, z(al) === n ? null : n, !0)), B("keydown", o, (e) => {
										(e.key === "Enter" || e.key === " ") && (e.preventDefault(), j(al, z(al) === n ? null : n, !0));
									}), B("click", h, (e) => e.stopPropagation()), B("keydown", h, (e) => e.stopPropagation()), B("click", g, () => dl(n, -1)), B("click", _, () => dl(n, 1)), H(e, i);
								});
								var se = I(oe, 2), ce = F(se, !0);
								L((e, t, n, r, o, c, h, g) => {
									U(i, e), J(a, "aria-label", t), J(s, "title", n), U(l, r), q(u, z(O).nav.launcher?.mobileMax ?? 6), U(d, z(O).nav.launcher?.mobileMax ?? 6), J(f, "title", o), wi(p, z(O).nav.launcher?.showTitle !== !1), U(m, ` ${c ?? ""}`), U(x, h), U(ce, g);
								}, [
									() => Y("lbl.design"),
									() => Y("lbl.design"),
									() => Y("tip.nav.launcherMobileMax"),
									() => Y("lbl.launcherMobileMax"),
									() => Y("tip.nav.launcherTitle"),
									() => Y("lbl.launcherShowTitle"),
									() => Y("lbl.launcherButton"),
									() => Y("ui.addLauncherLink")
								]), B("input", u, (e) => cl("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), B("change", p, (e) => cl("showTitle", e.target.checked ? void 0 : !1)), B("click", se, ll), H(e, t);
							};
							W(p, (e) => {
								z(O).nav.launcher?.show === !0 && e(m);
							}), E(l), E(i), L((e, t, n, r) => {
								J(a, "title", e), U(s, t), J(u, "title", n), wi(d, z(O).nav.launcher?.show === !0), U(f, ` ${r ?? ""}`);
							}, [
								() => Y("tip.nav.launcher"),
								() => Y("group.launcher"),
								() => Y("tip.nav.launcher"),
								() => Y("lbl.showInMenu")
							]), B("change", d, (e) => cl("show", e.target.checked ? !0 : void 0)), H(t, i);
						};
						W(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), H(t, i);
					}), E(kn);
				}
				E(En);
				var Mn = I(En, 2), Nn = N(Mn), Pn = F(Nn, !0), Fn = I(Nn, 2), In = N(Fn), Ln = N(In), Rn = F(Ln, !0), zn = I(Ln, 2);
				let Bn;
				Yr(zn, 21, () => z(Nl), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ k(() => g(z(t), 2));
					let r = () => z(n)[0], i = () => z(n)[1];
					var a = h_();
					let o;
					var s = N(a);
					G(s, () => _[r()]);
					var c = F(I(s), !0);
					E(a), L(() => {
						o = _i(a, 1, "tile svelte-1n46o8q", null, o, { on: (z(O).nav.style?.subStyle ?? "card") === r() }), J(a, "aria-pressed", (z(O).nav.style?.subStyle ?? "card") === r()), U(c, i());
					}), B("click", a, () => Ic("subStyle", r() === "card" ? void 0 : r())), H(e, a);
				}), E(zn), E(In);
				var Vn = I(In, 2), Hn = (e) => {
					var t = Bm(), n = P(t), r = (e) => {
						var t = Bm(), n = P(t);
						{
							let e = /* @__PURE__ */ k(() => Y("lbl.sideSubs")), t = /* @__PURE__ */ k(() => Y("tip.nav.sideSubs")), r = /* @__PURE__ */ k(() => z(O).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ k(() => [["collapsed", Y("opt.mobileSubs.collapsed")], ["expanded", Y("opt.mobileSubs.expanded")]]);
							Ps(n, {
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
								onchange: (e) => Ic("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = I(n, 2), i = (e) => {
							var t = Hm(), n = N(t);
							K(n);
							var r = I(n);
							E(t), L((e, i) => {
								J(t, "title", e), wi(n, z(O).nav.style?.sideSubArrow === !0), U(r, ` ${i ?? ""}`);
							}, [() => Y("tip.nav.sideSubArrow"), () => Y("lbl.sideSubArrow")]), B("change", n, (e) => Ic("sideSubArrow", e.target.checked ? !0 : void 0)), H(e, t);
						};
						W(r, (e) => {
							z(O).nav.style?.sideSubs === "expanded" && e(i);
						}), H(e, t);
					};
					W(n, (e) => {
						z(Lc) && e(r);
					});
					var i = I(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ k(() => Y("lbl.subOpen")), n = /* @__PURE__ */ k(() => Y("tip.nav.subOpen")), r = /* @__PURE__ */ k(() => z(O).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ k(() => [
								["hover", Y("opt.subOpen.hover")],
								["stay", Y("opt.subOpen.stay")],
								["click", Y("opt.subOpen.click")]
							]);
							Ps(e, {
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
								onchange: (e) => Ic("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					W(i, (e) => {
						(!z(Lc) || z(O).nav.style?.sideSubs !== "expanded") && e(a);
					}), H(e, t);
				}, Un = /* @__PURE__ */ k(() => z(O).nav.items?.some((e) => e.children?.length));
				W(Vn, (e) => {
					z(Un) && e(Hn);
				});
				var Wn = I(Vn, 2), Gn = (e) => {
					var t = mm(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(O).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.nav.subPillColorPick"));
						Ta(r, {
							get value() {
								return z(e);
							},
							get tokens() {
								return z(t);
							},
							get label() {
								return z(n);
							},
							onchange: (e) => Ic("subPillColor", e)
						});
					}
					E(t), L((e, r) => {
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
						let n = /* @__PURE__ */ k(Of);
						var r = G_();
						let i;
						var a = N(r);
						G(a, () => Nf, !0), E(a);
						var o = I(a, 2), s = N(o), c = F(s, !0), l = F(I(s, 2), !0);
						E(o), E(r), L(() => {
							i = _i(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), U(c, z(n).label), U(l, z(n).target);
						}), H(e, r);
					};
					var $n = N(Qn);
					Yr($n, 21, () => z(O).nav.items, Gr, (t, n, r) => {
						let i = /* @__PURE__ */ k(() => `${r}`);
						var a = Y_(), o = P(a), s = (t) => {
							e(t, () => !1);
						};
						W(o, (e) => {
							z(wf)?.key === z(i) && z(wf).pos === "before" && e(s);
						});
						var c = I(o, 2);
						let l;
						var u = N(c);
						G(u, () => Nf, !0), E(u);
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
								onchange: (e) => _f(r, e)
							});
						}
						var h = I(m, 2), g = (e) => {
							var t = K_();
							K(t), L((e, r) => {
								q(t, z(n).href), J(t, "placeholder", e), J(t, "title", r);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => yf(r, e.target.value)), H(e, t);
						};
						W(h, (e) => {
							!z(n).page && z(n).href != null && e(g);
						}), E(p), E(d);
						var _ = I(d, 2), v = (e) => {
							var t = q_();
							G(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), E(t), L((e) => J(t, "title", e), [() => Y("tip.nav.hasSubmenu")]), H(e, t);
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
						Yr(ne, 17, () => z(n).children ?? [], Gr, (t, i, a) => {
							let o = /* @__PURE__ */ k(() => `${r}.${a}`);
							var s = J_(), c = P(s), l = (t) => {
								e(t, () => !0);
							};
							W(c, (e) => {
								z(wf)?.key === z(o) && z(wf).pos === "before" && e(l);
							});
							var u = I(c, 2);
							let d;
							var f = N(u);
							G(f, () => Nf, !0), E(f);
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
									onchange: (e) => zf(r, a, e)
								});
							}
							var _ = I(g, 2), v = (e) => {
								var t = K_();
								K(t), L((e, n) => {
									q(t, z(i).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
								}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => Bf(r, a, e.target.value)), H(e, t);
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
								z(wf)?.key === z(o) && z(wf).pos === "after" && e(ne);
							}), L((e, t, r, s, c, l, p) => {
								d = _i(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: z(Sf) === z(o),
									dragging: z(Cf) === z(o)
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
								e.stopPropagation(), j(Sf, z(o));
							}), wr("dragstart", f, (e) => {
								e.stopPropagation(), j(Cf, z(o)), e.dataTransfer?.setData(Af, z(o));
							}), wr("dragend", f, kf), B("input", m, (e) => If(r, a, e.target.value)), B("click", b, () => Vf(r, a, -1)), B("click", x, () => Kf(r, a)), B("click", S, () => Vf(r, a, 1)), B("click", ee, (e) => {
								e.stopPropagation(), j(Sf, z(o));
							}), H(t, s);
						});
						var re = I(ne, 2), ie = (t) => {
							e(t, () => !0);
						};
						W(re, (e) => {
							z(wf)?.key === z(i) && z(wf).pos === "into" && e(ie);
						});
						var ae = I(re, 2), oe = (t) => {
							e(t, () => !1);
						};
						W(ae, (e) => {
							z(wf)?.key === z(i) && z(wf).pos === "after" && e(oe);
						}), L((e, t, a, o, s, d, p, m) => {
							l = _i(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: z(Sf) === z(i),
								dragging: z(Cf) === z(i),
								"drop-target": z(wf)?.key === z(i) && z(wf).pos === "into"
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
							j(Sf, z(i));
						}), wr("dragstart", u, (e) => {
							j(Cf, z(i)), e.dataTransfer?.setData(Af, z(i));
						}), wr("dragend", u, kf), B("input", f, (e) => gf(r, e.target.value)), B("click", b, () => Ff(r)), B("click", x, () => bf(r, -1)), B("click", S, () => xf(r)), B("click", ee, () => bf(r, 1)), B("click", te, () => {
							j(Sf, z(i));
						}), H(t, a);
					}), E($n);
					var er = I($n, 2), tr = F(er, !0), nr = I(er, 2), rr = N(nr);
					K(rr);
					var ir = I(rr, 2), ar = F(ir, !0);
					E(nr), E(Qn), L((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, ee, te, ne, re, ie, C, ae, oe, se, ce, le, ue, w, de, fe, pe, me, T, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, E, ke, Ae) => {
						U(tr, De), J(nr, "title", Oe), J(rr, "placeholder", E), ir.disabled = ke, U(ar, Ae);
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
						() => !z(te).trim(),
						() => Y("ui.newPageAsItem")
					]), wr("dragover", $n, jf), wr("drop", $n, (e) => {
						e.preventDefault(), Mf(z(wf)?.key ?? "");
					}), B("click", er, Pf), B("keydown", rr, (e) => {
						e.key === "Enter" && ne();
					}), Oi(rr, () => z(te), (e) => j(te, e)), B("click", ir, ne);
				}
				E(Yn), E(t), L((e, t, n, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, ee, te, ne, re, ie, C, oe, ce, w, de, fe, pe, me, T, he, ge, _e, ve, ye, be, Ce, Te, Ee, Oe, E, ke, Ae, je, Ne, Le, Re, ze, Be, He, Ue, We, Ge, Ke) => {
					J(r, "title", e), U(i, t), U(S, n), U(ae, a), J(se, "title", o), U(le, s), J(ue, "aria-label", c), J(xe, "title", l), U(Se, u), J(we, "title", d), U(De, f), J(Me, "title", p), U(Pe, m), J(Fe, "min", ss.min), J(Fe, "max", ss.max), J(Fe, "step", ss.step), q(Fe, z(Xc)), J(Ie, "min", ss.min), J(Ie, "max", ss.max), q(Ie, z(Xc)), U(Ve, h), U(Ye, g), J(et, "title", _), U(tt, v), J(ot, "title", y), U(ct, b), J(lt, "min", ss.min), J(lt, "max", ss.max), J(lt, "placeholder", x), q(lt, z(O).nav.style?.mobile?.textSize ?? ""), J(dt, "title", ee), U(pt, te), J(ht, "title", ne), U(_t, re), J(bt, "title", ie), U(St, C), J(Dt, "title", oe), U(kt, ce), J(Pt, "title", w), U(It, de), U(qt, fe), U(Xt, pe), J(Zt, "aria-label", me), J(rn, "title", T), U(an, he), J(on, "title", ge), U(cn, _e), J(ln, "title", ve), wi(un, z(O).nav.style?.blur !== !1), U(dn, ` ${ye ?? ""}`), U(mn, be), J(vn, "title", Ce), U(yn, Te), J(xn, "title", Ee), wi(Sn, z(O).nav.announcement?.show === !0), U(Cn, ` ${Oe ?? ""}`), J(Dn, "title", E), U(On, ke), U(Pn, Ae), U(Rn, je), Bn = _i(zn, 1, "tile-grid svelte-1n46o8q", null, Bn, {
						"cols-5": !z(Lc),
						"cols-3": z(Lc)
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
					() => !z(te).trim(),
					() => Y("ui.newPageAsItem")
				]), B("input", Fe, (e) => Ic("textSize", e.target.valueAsNumber)), B("change", Ie, (e) => hl(e, "textSize", ss)), B("change", lt, (e) => vl(e, "textSize", ss)), B("change", un, (e) => Ic("blur", e.target.checked)), B("change", Sn, (e) => rl("show", e.target.checked ? !0 : void 0)), B("change", Jn, (e) => Ic("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), H(e, t);
			}, b = (e) => {
				var t = nv(), n = N(t), r = N(n), i = I(r);
				K(i), E(n);
				var a = I(n, 2), o = N(a), s = I(o);
				K(s), E(a);
				var c = I(a, 2), l = N(c), u = I(l);
				{
					let e = /* @__PURE__ */ k(yc), t = /* @__PURE__ */ k(bc);
					X(u, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => xc(e)
					});
				}
				E(c);
				var d = I(c, 2), f = N(d), p = I(f);
				K(p);
				let m;
				E(d);
				var h = I(d, 2), g = (e) => {
					var t = Z_(), n = F(t, !0);
					L((e) => U(n, e), [() => Y("settings.timeZoneBad")]), H(e, t);
				};
				W(h, (e) => {
					z(wc) && e(g);
				});
				var _ = I(h, 2), v = N(_), y = I(v);
				{
					let e = /* @__PURE__ */ k(() => $f(z(O))), t = /* @__PURE__ */ k(() => Qf.map((e) => [
						e,
						Y(`mapService.${e}`),
						Y(`mapService.${e}.note`)
					]));
					X(y, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => Cc(e)
					});
				}
				E(_);
				var b = I(_, 2), x = N(b), S = I(x);
				K(S), E(b);
				var ee = I(b, 4), te = F(ee, !0), ne = I(ee, 2), re = N(ne);
				Yr(re, 17, () => z(hc), (e) => e.screen, (e, t) => {
					var n = Q_(), r = N(n), i = F(r, !0), a = I(r, 2);
					let o;
					var s = F(a), c = F(I(a, 2), !0);
					E(n), L(() => {
						U(i, z(t).screen), o = _i(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !z(t).bound }), yi(s, `width:${z(t).pct ?? ""}%`), U(c, z(t).bound ? `${z(t).margin}` : "-");
					}), H(e, n);
				});
				var ie = I(re, 2), ae = N(ie), oe = F(ae, !0), se = F(I(ae, 2), !0);
				E(ie);
				var ce = I(ie, 2), le = (e) => {
					var t = $_(), n = F(t, !0);
					L((e) => U(n, e), [() => Y("lbl.bindsFrom", { n: z(ze) })]), H(e, t);
				};
				W(ce, (e) => {
					z(lc) !== "full" && e(le);
				}), E(ne);
				var ue = I(ne, 2);
				Yr(ue, 21, () => $o, (e) => e.id, (e, t) => {
					var n = Yg();
					let r;
					var i = F(n, !0);
					L((e) => {
						r = _i(n, 1, "svelte-1n46o8q", null, r, { on: z(dc) === z(t).id }), U(i, e);
					}, [() => Y(`lbl.width.${z(t).id}`)]), B("click", n, () => _c(z(t).width)), H(e, n);
				}), E(ue);
				var w = I(ue, 2), de = (e) => {
					var t = ev(), n = N(t), r = F(n, !0), i = I(n, 2);
					K(i);
					var a = F(I(i, 2));
					E(t), L((e, n) => {
						J(t, "title", e), U(r, n), J(i, "min", 960), J(i, "max", Zo), J(i, "step", 20), q(i, z(mc)), U(a, `${z(mc) ?? ""} px`);
					}, [() => Y("tip.site.contentWidthFree"), () => Y("lbl.widthFree")]), B("input", i, (e) => _c(e.target.valueAsNumber)), H(e, t);
				};
				W(w, (e) => {
					z(lc) !== "full" && e(de);
				});
				var fe = I(w, 2), pe = F(fe, !0), me = I(fe, 2);
				Yr(me, 21, () => Qo, (e) => e.id, (e, t) => {
					var n = Yg();
					let r;
					var i = F(n, !0);
					L((e) => {
						r = _i(n, 1, "svelte-1n46o8q", null, r, { on: z(fc) === z(t).id }), U(i, e);
					}, [() => Y(`lbl.gutter.${z(t).id}`)]), B("click", n, () => vc(z(t).gutter)), H(e, n);
				}), E(me);
				var T = I(me, 2), he = N(T), ge = F(he, !0), _e = I(he, 2), ve = N(_e), ye = N(ve), be = F(ye, !0), xe = I(ye, 2);
				K(xe);
				var Se = F(I(xe, 2));
				E(ve), E(_e), E(T);
				var Ce = I(T, 4), we = N(Ce), Te = I(we), Ee = (e) => {
					var t = o_();
					L((e) => {
						J(t, "src", z(O).site.icon), J(t, "alt", e);
					}, [() => Y("lbl.siteIcon")]), H(e, t);
				};
				W(Te, (e) => {
					z(O).site.icon && e(Ee);
				}), E(Ce);
				var De = I(Ce, 2), Oe = N(De), ke = N(Oe), Ae = I(ke);
				E(Oe);
				var je = I(Oe, 2), Me = (e) => {
					var t = tv(), n = P(t);
					G(n, () => C.pencil ?? "✎", !0), E(n);
					var r = I(n, 2);
					G(r, () => C.cross, !0), E(r), L((e, t) => {
						J(n, "title", e), J(r, "title", t);
					}, [() => Y("tip.site.editIcon"), () => Y("tip.site.removeIcon")]), B("click", n, () => j(Z, z(O).site.icon, !0)), B("click", r, ac), H(e, t);
				};
				W(je, (e) => {
					z(O).site.icon && e(Me);
				}), E(De), E(t), L((e, t, u, h, g, y, ne, re, ie, C, ae, ce, le, ue, w, de, me, he, _e, ye, Ce, Te, Ee, De, E, Ae, je) => {
					J(n, "title", e), U(r, `${t ?? ""} `), q(i, z(O).site.title ?? ""), J(i, "placeholder", u), J(a, "title", h), U(o, `${g ?? ""} `), q(s, z(O).site.description ?? ""), J(s, "placeholder", y), J(c, "title", ne), U(l, `${re ?? ""} `), J(d, "title", ie), U(f, `${C ?? ""} `), q(p, z(O).site.timeZone ?? ""), m = _i(p, 1, "svelte-1n46o8q", null, m, { "place-error": z(wc) }), J(_, "title", ae), U(v, `${ce ?? ""} `), J(b, "title", le), U(x, `${ue ?? ""} `), q(S, w), J(ee, "title", de), U(te, me), U(oe, he), U(se, _e), J(fe, "title", ye), U(pe, Ce), T.open = z(fc) === null || z(pc), U(ge, Te), J(ve, "title", Ee), U(be, De), J(xe, "min", 0), J(xe, "max", 12), J(xe, "step", 1), q(xe, z(uc)), U(Se, `${z(uc) ?? ""} vw`), U(we, `${E ?? ""} `), J(Oe, "title", Ae), U(ke, `${je ?? ""} `);
				}, [
					() => Y("tip.site.name"),
					() => Y("lbl.name"),
					() => Y("ph.site.name"),
					() => Y("tip.site.description"),
					() => Y("lbl.description"),
					() => Y("ph.site.description"),
					() => Y("site.langTitle"),
					() => Y("site.langLabel"),
					() => Y("tip.settings.timeZone"),
					() => Y("settings.timeZone"),
					() => Y("tip.settings.mapService"),
					() => Y("settings.mapService"),
					() => Y("tip.settings.meetingHosts"),
					() => Y("settings.meetingHosts"),
					() => (z(O).site.meetingHosts ?? []).join(", "),
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
				]), B("input", i, (e) => oc(e.target.value)), B("input", s, (e) => sc(e.target.value)), B("change", p, (e) => Tc(e.target.value)), B("change", S, (e) => Sc(e.target.value)), wr("toggle", T, (e) => j(pc, e.currentTarget.open, !0)), B("input", xe, (e) => vc(e.target.valueAsNumber)), B("change", Ae, rc), H(e, t);
			}, x = (e) => {
				var t = lv();
				{
					let e = (e, t = f, n = f) => {
						var r = iv(), i = N(r), a = (e) => {
							var t = rv(), r = F(t, !0);
							L(() => U(r, n())), H(e, t);
						};
						W(i, (e) => {
							n() && e(a);
						});
						var o = I(i, 2), s = N(o), c = F(s, !0), l = I(s, 2), u = F(l, !0), d = I(l, 2), p = N(d), m = F(p, !0), h = F(I(p), !0);
						E(d), E(o), E(r), L((e, t, n, r, i, a, s, l, d) => {
							yi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), U(c, a), U(u, s), U(m, l), U(h, d);
						}, [
							() => Mp(t().bg, t()),
							() => Mp(t().surface, t()),
							() => Mp(t().text, t()),
							() => Mp(t().accent, t()),
							() => Mp(t()["accent-text"] ?? le(Mp(t().accent ?? "#000000", t())), t()),
							() => Y("preview.heading"),
							() => Y("preview.cardBody"),
							() => Y("preview.button"),
							() => Y("preview.link")
						]), H(e, r);
					};
					var n = N(t), r = F(n, !0), i = I(n, 2);
					Yr(i, 21, () => Pp, (e) => e.id, (e, t) => {
						var n = av();
						let r;
						var i = N(n), a = N(i), o = I(a), s = I(o), c = I(s);
						E(i);
						var l = F(I(i, 2), !0);
						E(n), L(() => {
							r = _i(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: z(Ip) === z(t).id }), J(n, "title", `${z(t).name} - ${z(t).note}`), yi(a, `background:${z(t).light.bg ?? ""}`), yi(o, `background:${z(t).light.surface ?? ""}`), yi(s, `background:${z(t).light.accent ?? ""}`), yi(c, `background:${z(t).light.text ?? ""}`), U(l, z(t).name);
						}), B("click", n, () => Fp(z(t))), H(e, n);
					}), E(i);
					var a = I(i, 2), o = F(a, !0), s = I(a, 2), c = N(s);
					K(c);
					var l = I(c);
					E(s);
					var u = I(s, 2), d = (e) => {
						var t = ov(), n = N(t), r = F(n, !0), i = I(n, 2), a = N(i);
						let o;
						var s = F(a, !0), c = I(a, 2);
						let l;
						var u = F(c, !0);
						E(i), E(t), L((e, t, n, i) => {
							U(r, e), J(a, "title", t), o = _i(a, 1, "svelte-1n46o8q", null, o, { on: z(ya) }), U(s, n), l = _i(c, 1, "svelte-1n46o8q", null, l, { on: !z(ya) }), U(u, i);
						}, [
							() => Y("lbl.darkColors"),
							() => Y("hint.theme.autoDark"),
							() => Y("opt.auto"),
							() => Y("opt.custom")
						]), B("click", a, () => Op(!0)), B("click", c, () => Op(!1)), H(e, t);
					};
					W(u, (e) => {
						z(va) && e(d);
					});
					var p = I(u, 2), m = N(p), h = (e) => {
						var t = Ph(), n = F(t, !0);
						L((e) => U(n, e), [() => Y("lbl.light")]), H(e, t);
					};
					W(m, (e) => {
						z(va) && e(h);
					});
					var _ = I(m, 2);
					let Le;
					var v = F(_, !0);
					E(p);
					var y = I(p, 2);
					Yr(y, 21, () => _a, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => g(z(t), 3));
						let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
						var o = sv(), s = N(o);
						{
							let e = /* @__PURE__ */ k(() => z(O).theme.tokens.color[r()] ?? Zf(r(), z(xa))), t = /* @__PURE__ */ k(ga);
							Ta(s, {
								get value() {
									return z(e);
								},
								get tokens() {
									return z(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => Jf(r(), e)
							});
						}
						var c = I(s, 2), l = F(c, !0), u = F(I(c, 2), !0);
						E(o), L((e) => {
							U(l, a()), U(u, e);
						}, [() => Mp(z(O).theme.tokens.color[r()] ?? Zf(r(), z(xa)), z(xa))]), H(e, o);
					}), E(y);
					var b = I(y, 2), x = (e) => {
						var t = cv(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2);
						let o;
						var s = F(a, !0);
						E(n);
						var c = I(n, 2);
						let l;
						Yr(c, 21, () => _a, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ k(() => g(z(t), 3));
							let r = () => z(n)[0], i = () => z(n)[1], a = () => z(n)[2];
							var o = sv(), s = N(o);
							{
								let e = /* @__PURE__ */ k(() => z(O).theme.alt.tokens.color[r()] ?? z(Sa)[r()] ?? Zf(r(), z(Sa))), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("theme.darkColorLabel", { name: i() }));
								Ta(s, {
									get value() {
										return z(e);
									},
									get tokens() {
										return z(t);
									},
									get label() {
										return z(n);
									},
									onchange: (e) => Sp(r(), e)
								});
							}
							var c = I(s, 2), l = F(c, !0), u = F(I(c, 2), !0);
							E(o), L((e) => {
								U(l, a()), U(u, e);
							}, [() => Mp(z(O).theme.alt.tokens.color[r()] ?? z(Sa)[r()] ?? Zf(r(), z(Sa)), z(Sa))]), H(e, o);
						}), E(c), L((e, t, n) => {
							U(i, e), o = _i(a, 1, "chip svelte-1n46o8q", null, o, { accent: z(ba) === "dark" }), J(a, "title", t), U(s, n), l = _i(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: z(ya) });
						}, [
							() => Y("lbl.dark"),
							() => Y("tip.theme.darkDefault"),
							() => Y("common.standard")
						]), B("click", a, () => Cp("dark")), H(e, t);
					};
					W(b, (e) => {
						z(va) && e(x);
					});
					var S = I(b, 2), ee = N(S), te = F(ee, !0), ne = I(ee, 2);
					let Re;
					var re = F(ne, !0);
					E(S);
					var ie = I(S, 2), C = N(ie);
					{
						let t = /* @__PURE__ */ k(() => z(va) ? Y("lbl.light") : "");
						e(C, () => z(xa), () => z(t));
					}
					var ae = I(C, 2), oe = (t) => {
						{
							let n = /* @__PURE__ */ k(() => Y("lbl.dark"));
							e(t, () => z(Sa), () => z(n));
						}
					};
					W(ae, (e) => {
						z(va) && e(oe);
					}), E(ie);
					var se = I(ie, 2), ce = N(se), ue = F(ce, !0), w = I(ce, 2), de = N(w), fe = N(de), pe = I(fe);
					{
						let e = /* @__PURE__ */ k(() => kp("heading"));
						X(pe, {
							get value() {
								return z(O).theme.tokens.font.heading;
							},
							get options() {
								return z(e);
							},
							onchange: (e) => up("heading", e)
						});
					}
					E(de);
					var me = I(de, 2), T = N(me), he = I(T);
					{
						let e = /* @__PURE__ */ k(() => kp("body"));
						X(he, {
							get value() {
								return z(O).theme.tokens.font.body;
							},
							get options() {
								return z(e);
							},
							onchange: (e) => up("body", e)
						});
					}
					E(me);
					var ge = I(me, 2), _e = N(ge), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0);
					E(ge), E(w), E(se);
					var xe = I(se, 2), Se = N(xe), Ce = F(Se, !0), we = I(Se, 2), Te = N(we), Ee = N(Te), De = F(Ee, !0), Oe = F(I(Ee, 2), !0);
					E(Te);
					var ke = I(Te, 2), Ae = N(ke, !0), je = F(I(Ae), !0);
					E(ke);
					var Me = I(ke, 2);
					K(Me);
					var Ne = I(Me, 2), Pe = N(Ne, !0), Fe = F(I(Pe), !0);
					E(Ne);
					var Ie = I(Ne, 2);
					K(Ie), E(we), E(xe), E(t), L((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, ee, ie, C, ae, oe, se) => {
						U(r, e), U(o, t), J(s, "title", n), wi(c, z(va)), U(l, ` ${i ?? ""}`), Le = _i(_, 1, "chip svelte-1n46o8q", null, Le, { accent: z(ba) === "light" }), J(_, "title", a), U(v, u), J(S, "title", d), U(te, f), Re = _i(ne, 1, "chip palauto svelte-1n46o8q", null, Re, { accent: z(ep) }), U(re, p), U(ue, m), U(fe, `${h ?? ""} `), U(T, `${g ?? ""} `), yi(_e, `font-family:${z(O).theme.tokens.font.heading ?? ""}`), U(ve, y), yi(ye, `font-family:${z(O).theme.tokens.font.body ?? ""}`), U(be, b), U(Ce, x), yi(Te, `--r-sm:${z(O).theme.tokens.radius.sm ?? ""};--r-md:${z(O).theme.tokens.radius.md ?? ""}`), U(De, ee), U(Oe, ie), U(Ae, C), U(je, z(O).theme.tokens.radius.sm), q(Me, ae), U(Pe, oe), U(Fe, z(O).theme.tokens.radius.md), q(Ie, se);
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
						() => Ap(z(O).theme.tokens.radius.sm),
						() => Y("lbl.largeCorners"),
						() => Ap(z(O).theme.tokens.radius.md)
					]), B("change", c, (e) => Ep(e.target.checked)), B("click", _, () => Cp("light")), B("click", ne, () => lp(!z(ep))), B("input", Me, (e) => jp("sm", Number(e.target.value))), B("input", Ie, (e) => jp("md", Number(e.target.value)));
				}
				H(e, t);
			}, S = (e) => {
				var t = hv();
				let n;
				var r = N(t);
				K(r);
				var i = I(r, 2), a = (e) => {
					var t = Pr();
					Yr(P(t), 17, () => du(Fy(), z(Py), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Pr(), r = P(n), i = (e) => {
							var n = uv(), r = N(n), i = I(r);
							E(n), L((e) => {
								J(n, "title", e), U(r, `${z(t).label ?? ""} `);
							}, [() => Y("tip.webpAuto")]), B("change", i, Ry), H(e, n);
						}, a = (e) => {
							var n = dv(), r = N(n), i = I(r);
							E(n), L((e) => {
								J(n, "title", e), U(r, `${z(t).label ?? ""} `);
							}, [() => Y("tip.blocks.galleryImages")]), B("change", i, Hy), H(e, n);
						}, o = (e) => {
							var n = uh(), r = F(n, !0);
							L(() => U(r, z(t).label)), B("click", n, () => Iy(z(t))), H(e, n);
						};
						W(r, (e) => {
							z(t).act === "image" ? e(i) : z(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), H(e, n);
					}, (e) => {
						var t = jm(), n = F(t, !0);
						L((e) => U(n, e), [() => Y("canvas.searchEmpty")]), H(e, t);
					}), H(e, t);
				}, o = /* @__PURE__ */ k(() => z(Py).trim()), s = (e) => {
					var t = mv(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = F(o, !0), c = I(o, 2), l = F(c, !0);
					E(a), E(n);
					var u = I(n, 2), d = F(u, !0), f = I(u, 2), p = N(f), m = I(p);
					E(f);
					var h = I(f, 2), g = F(h, !0), _ = I(h, 2), v = F(_, !0), y = I(_, 2), b = F(y, !0), x = I(y, 2), S = F(x, !0), ee = I(x, 2), te = F(ee, !0), ne = I(ee, 2), re = F(ne, !0), ie = I(ne, 2), C = F(ie, !0), ae = I(ie, 2), oe = F(ae, !0), se = I(ae, 2), ce = F(se, !0), le = I(se, 2), ue = F(le, !0), w = I(le, 2), de = F(w, !0), fe = I(w, 2), pe = F(fe, !0), me = I(fe, 2), T = F(me, !0), he = I(me, 2), ge = F(he, !0), _e = I(he, 2), ve = F(_e, !0), ye = I(_e, 2), be = F(ye, !0), xe = I(ye, 2), Se = F(xe, !0), Ce = I(xe, 2), we = N(Ce), Te = F(we, !0), Ee = I(we, 2), De = N(Ee), Oe = F(De, !0), ke = I(De, 2), Ae = N(ke), je = I(Ae);
					E(ke), E(Ee), E(Ce);
					var Me = I(Ce, 2), Ne = N(Me), Pe = F(Ne, !0), Fe = I(Ne, 2), Ie = N(Fe), Le = F(Ie, !0), Re = I(Ie, 2), ze = F(Re, !0), Be = I(Re, 2), Ve = F(Be, !0), He = I(Be, 2), Ue = F(He, !0), We = I(He, 2), Ge = F(We, !0);
					E(Fe);
					var Ke = I(Fe, 2), qe = N(Ke), Je = F(qe, !0);
					Yr(I(qe, 2), 17, bp, (e) => e.view ?? "plain", (e, t) => {
						var n = bg(), r = P(n), i = (e) => {
							var n = Ph(), r = F(n, !0);
							L((e) => U(r, e), [() => Y(Ln[z(t).view])]), H(e, n);
						};
						W(r, (e) => {
							z(t).view && e(i);
						});
						var a = I(r, 2);
						Yr(a, 21, () => z(t).designs, (e) => e.id, (e, t) => {
							var n = fv(), r = N(n);
							G(r, () => Wp(z(t).id), !0), E(r);
							var i = F(I(r, 2), !0);
							E(n), L((e, t) => {
								J(n, "title", e), U(i, t);
							}, [() => Y(z(t).labelKey), () => Y(z(t).labelKey)]), B("click", n, () => Ay(z(t).id)), H(e, n);
						}), E(a), H(e, n);
					}), E(Ke), E(Me);
					var Ye = I(Me, 2), Xe = N(Ye), Ze = F(Xe, !0), Qe = I(Xe, 2), $e = N(Qe), et = F($e, !0), tt = I($e, 2), nt = F(tt, !0), D = I(tt, 2), rt = F(D, !0), O = I(D, 2), at = F(O, !0), ot = I(O, 2), st = F(ot, !0);
					E(Qe), E(Ye);
					var ct = I(Ye, 2), lt = (e) => {
						let t = /* @__PURE__ */ k(() => z(Ql).filter((e) => Yl[e]?.data?.mal?.kind === "blocks"));
						var n = pv(), r = N(n), i = F(r, !0), a = I(r, 2);
						Yr(a, 20, () => z(t), (e) => e, (e, t) => {
							var n = uh(), r = F(n, !0);
							L((e) => {
								J(n, "title", e), U(r, Yl[t].data.mal.name);
							}, [() => Y("canvas.insertGroup")]), B("click", n, () => it?.sendInsertTemplate(t)), H(e, n);
						}), E(a), E(n), L((e) => U(i, e), [() => Y("canvas.tabMyTemplates")]), H(e, n);
					}, ut = /* @__PURE__ */ k(() => z(Ql).some((e) => Yl[e]?.data?.mal?.kind === "blocks"));
					W(ct, (e) => {
						z(ut) && e(lt);
					});
					var dt = I(ct, 2), ft = (e) => {
						var t = pv(), n = N(t), r = F(n, !0), i = I(n, 2);
						Yr(i, 21, () => z(jy), (e) => e.type, (e, t) => {
							var n = Pr(), r = P(n), i = (e) => {
								var n = pv(), r = N(n), i = F(r, !0), a = I(r, 2);
								Yr(a, 21, () => z(t).variants, (e) => e.label, (e, n) => {
									var r = uh(), i = F(r, !0);
									L((e) => {
										J(r, "title", e), U(i, z(n).label);
									}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", r, () => Ny(z(t), z(n).props)), H(e, r);
								}), E(a), E(n), L(() => U(i, z(t).label)), H(e, n);
							}, a = (e) => {
								var n = uh(), r = F(n, !0);
								L((e) => {
									J(n, "title", e), U(r, z(t).label);
								}, [() => Y("tip.blocks.fromPlugin", { plugin: z(t).plugin })]), B("click", n, () => Ny(z(t))), H(e, n);
							};
							W(r, (e) => {
								z(t).variants?.length ? e(i) : e(a, -1);
							}), H(e, n);
						}), E(i), E(t), L((e) => U(r, e), [() => Y("panel.plugins")]), H(e, t);
					};
					W(dt, (e) => {
						z(jy).length && e(ft);
					}), L((e, t, n, r, a, o, u, m, Ce, we, Ee, E, je, Me, Ne, Fe, Ke, qe, Ye, Xe, Qe, $e, tt, D, it, O, ot, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, k, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut) => {
						U(i, e), U(s, t), J(c, "title", n), U(l, r), U(d, a), J(f, "title", o), U(p, `${u ?? ""} `), J(h, "title", m), U(g, Ce), J(_, "title", we), U(v, Ee), J(y, "title", E), U(b, je), J(x, "title", Me), U(S, Ne), J(ee, "title", Fe), U(te, Ke), J(ne, "title", qe), U(re, Ye), J(ie, "title", Xe), U(C, Qe), J(ae, "title", $e), U(oe, tt), J(se, "title", D), U(ce, it), J(le, "title", O), U(ue, ot), J(w, "title", ct), U(de, lt), J(fe, "title", ut), U(pe, dt), J(me, "title", ft), U(T, pt), J(he, "title", mt), U(ge, ht), J(_e, "title", gt), U(ve, _t), J(ye, "title", vt), U(be, yt), J(xe, "title", k), U(Se, bt), U(Te, xt), J(De, "title", St), U(Oe, Ct), J(ke, "title", wt), U(Ae, `${Tt ?? ""} `), U(Pe, Et), J(Ie, "title", Dt), U(Le, Ot), J(Re, "title", kt), U(ze, At), J(Be, "title", jt), U(Ve, Mt), J(He, "title", Nt), U(Ue, Pt), J(We, "title", Ft), U(Ge, It), U(Je, Lt), U(Ze, Rt), U(et, zt), U(nt, Bt), U(rt, Vt), U(at, Ht), U(st, Ut);
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
						() => Y("calendar.designs"),
						() => Y("group.shapes"),
						() => Y("shape.line"),
						() => Y("shape.arrow"),
						() => Y("shape.circle"),
						() => Y("shape.rect"),
						() => Y("shape.triangle")
					]), B("click", o, () => Oy("text")), B("click", c, () => Oy("text-box")), B("click", u, () => Oy("button")), B("change", m, Ry), B("click", h, () => Oy("video")), B("click", _, () => Oy("icon")), B("click", y, () => Oy("map")), B("click", x, () => Oy("form")), B("click", ee, () => Oy("collection")), B("click", ne, () => Oy("faq")), B("click", ie, () => Oy("timeline")), B("click", ae, () => Oy("quote")), B("click", se, () => Oy("stats")), B("click", le, () => Oy("ribbon")), B("click", w, () => Oy("table")), B("click", fe, () => Oy("share")), B("click", me, () => Oy("countdown")), B("click", he, () => Oy("audio")), B("click", _e, () => Oy("product")), B("click", ye, () => Oy("cart")), B("click", xe, () => Oy("checkout")), B("click", De, () => Oy("gallery")), B("change", je, Hy), B("click", Ie, () => Oy("calendar")), B("click", Re, () => Oy("calendar-cards")), B("click", Be, () => Oy("calendar-month")), B("click", He, () => Oy("calendar-next")), B("click", We, () => Oy("calendar-agenda")), B("click", $e, () => Oy("shape-line")), B("click", tt, () => Oy("shape-arrow")), B("click", D, () => Oy("shape-circle")), B("click", O, () => Oy("shape-rect")), B("click", ot, () => Oy("shape-triangle")), H(e, t);
				};
				W(i, (e) => {
					z(o) ? e(a) : e(s, -1);
				}), E(t), L((e, i, a) => {
					n = _i(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: z(Ne) === "mobile" }), J(t, "title", e), J(r, "placeholder", i), J(r, "title", a);
				}, [
					() => z(Ne) === "mobile" ? Y("tip.blocks.mobileLocked") : void 0,
					() => Y("canvas.searchBlocks"),
					() => Y("canvas.searchBlocks")
				]), Oi(r, () => z(Py), (e) => j(Py, e)), H(e, t);
			}, ee = (e) => {
				var t = gv(), n = N(t), r = N(n), i = F(I(r));
				E(n);
				var a = I(n, 2);
				K(a);
				var o = I(a, 2), s = N(o);
				K(s);
				var c = I(s);
				E(o), E(t), L((e, t) => {
					U(r, `${e ?? ""} `), U(i, `${z(ye).size ?? ""} px`), q(a, z(ye).size), wi(s, z(ye).snap !== !1), U(c, ` ${t ?? ""}`);
				}, [() => Y("lbl.gridSize"), () => Y("lbl.gridSnap")]), B("input", a, (e) => Za("size", Number(e.target.value))), B("change", s, (e) => Za("snap", e.target.checked)), H(e, t);
			}, re = (e) => {
				var t = Cv(), n = N(t), r = (e) => {
					var t = zh(), n = P(t), r = F(n, !0), i = I(n, 2);
					l(i, () => !1), L((e) => U(r, e), [() => Y("blocks.suffix", { label: Hr[z(M).type] ?? z(M).type })]), H(e, t);
				}, i = (e) => {
					var t = Sv(), n = P(t), r = F(n, !0), i = I(n, 2), o = N(i), s = I(o);
					K(s), E(i);
					var c = I(i, 4), l = N(c);
					K(l);
					var u = I(l);
					E(c);
					var d = I(c, 2), f = (e) => {
						var t = _v(), n = P(t), r = N(n), i = F(I(r));
						E(n);
						var a = I(n, 2);
						K(a), L((e) => {
							U(r, `${e ?? ""} `), U(i, `${z(qr).size ?? ""} px`), q(a, z(qr).size);
						}, [() => Y("lbl.gridSize")]), B("input", a, (e) => Xa("size", Number(e.target.value))), H(e, t);
					};
					W(d, (e) => {
						z(qr) && e(f);
					});
					var p = I(d, 4), m = F(p, !0), h = I(p, 2);
					Yr(h, 21, () => [["", "common.standard"], ...Object.entries(yu)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => g(z(t), 2));
						let r = () => z(n)[0], i = () => z(n)[1], a = /* @__PURE__ */ k(() => si(r()));
						var o = vv();
						let s;
						var c = N(o), l = N(c), u = I(l, 2), d = I(u, 2);
						E(c);
						var f = F(I(c, 2), !0);
						E(o), L((e, t) => {
							s = _i(o, 1, "rs-card svelte-1n46o8q", null, s, { on: z($r) === r() }), J(o, "title", e), yi(c, `background: ${z(a).bg ?? ""}`), yi(l, `background: ${z(a).text ?? ""}`), yi(u, `background: ${z(a).surface ?? ""}`), yi(d, `background: ${z(a).accent ?? ""}`), U(f, t);
						}, [() => Y("tip.props.sectionTheme"), () => Y(i())]), B("click", o, () => oi(r())), H(e, o);
					}), E(h);
					var _ = I(h, 2), v = N(_), y = I(v), b = N(y), x = F(b), S = I(b, 2);
					G(S, () => C.copy, !0), E(S), E(y), E(_);
					var ee = I(_, 4), te = F(ee, !0), ne = I(ee, 2);
					a(ne, () => z(ua), () => z(Xr));
					var re = I(ne, 4), ie = F(re, !0), ae = I(re, 2);
					Yr(ae, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ k(() => g(t, 2));
						let r = () => z(n)[0], i = () => z(n)[1], a = /* @__PURE__ */ k(() => z(ei)[r()]);
						var o = Yp(), s = P(o), c = N(s), l = I(c);
						{
							let e = /* @__PURE__ */ k(() => z(a)?.shape ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.none")], ...Xu.map((e) => [e, Y(`opt.divider.${e}`)])]);
							X(l, {
								get value() {
									return z(e);
								},
								get options() {
									return z(t);
								},
								onchange: (e) => Ia(r(), "shape", e)
							});
						}
						E(s);
						var u = I(s, 2), d = (e) => {
							var t = yv(), n = P(t), i = N(n), o = F(i, !0), s = I(i, 2);
							K(s);
							var c = F(I(s, 2));
							E(n);
							var l = I(n, 2), u = N(l), d = I(u);
							{
								let e = /* @__PURE__ */ k(() => z(a).color ?? "bg"), t = /* @__PURE__ */ k(ga), n = /* @__PURE__ */ k(() => Y("tip.divider.color"));
								Ta(d, {
									get value() {
										return z(e);
									},
									get tokens() {
										return z(t);
									},
									get label() {
										return z(n);
									},
									onchange: (e) => Ia(r(), "color", e)
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
							E(h), L((e, t, n, r, i, d, v) => {
								U(o, e), J(s, "min", Zu.min), J(s, "max", Zu.max), q(s, z(a).height ?? Zu.dflt), U(c, `${z(a).height ?? Zu.dflt ?? ""} px`), J(l, "title", t), U(u, `${n ?? ""} `), J(f, "title", r), wi(p, z(a).flip === !0), U(m, ` ${i ?? ""}`), J(h, "title", d), wi(g, z(a).invert === !0), U(_, ` ${v ?? ""}`);
							}, [
								() => Y("lbl.height"),
								() => Y("tip.divider.color"),
								() => Y("lbl.color"),
								() => Y("tip.divider.flip"),
								() => Y("lbl.dividerFlip"),
								() => Y("tip.divider.invert"),
								() => Y("lbl.patternInvert")
							]), B("input", s, (e) => Ia(r(), "height", e.target.valueAsNumber)), B("change", p, (e) => Ia(r(), "flip", e.target.checked)), B("change", g, (e) => Ia(r(), "invert", e.target.checked)), H(e, t);
						};
						W(u, (e) => {
							z(a)?.shape && e(d);
						}), L((e, t) => {
							J(s, "title", e), U(c, `${t ?? ""} `);
						}, [() => Y("tip.props.dividers"), () => Y(i())]), H(e, o);
					});
					var oe = I(ae, 4), se = N(oe), ce = I(se);
					{
						let e = /* @__PURE__ */ k(() => wa(z(Zr)) ? z(Zr).type : "");
						X(ce, {
							get value() {
								return z(e);
							},
							get options() {
								return Ea;
							},
							onchange: (e) => Fa(e || null)
						});
					}
					E(oe);
					var le = I(oe, 2), ue = (e) => {
						var t = xv(), n = P(t), r = N(n), i = I(r);
						K(i), E(n);
						var a = I(n, 2), o = N(a), s = I(o);
						K(s), E(a);
						var c = I(a, 2), l = (e) => {
							var t = bv(), n = P(t), r = N(n), i = I(r);
							{
								let e = /* @__PURE__ */ k(() => z(Zr).props.effect ?? "slide-up"), t = /* @__PURE__ */ k(() => [
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
									onchange: (e) => za("effect", e)
								});
							}
							E(n);
							var a = I(n, 2), o = N(a), s = I(o);
							K(s), E(a);
							var c = I(a, 2), l = N(c), u = I(l);
							{
								let e = /* @__PURE__ */ k(() => z(Zr).props.pattern ?? "sequence"), t = /* @__PURE__ */ k(() => [
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
									onchange: (e) => za("pattern", e)
								});
							}
							E(c), L((e, t, i, u, d, f) => {
								J(n, "title", e), U(r, `${t ?? ""} `), J(a, "title", i), U(o, `${u ?? ""} `), q(s, z(Zr).props.step ?? 90), J(c, "title", d), U(l, `${f ?? ""} `);
							}, [
								() => Y("tip.props.staggerEffect"),
								() => Y("lbl.staggerEffect"),
								() => Y("tip.props.staggerStep"),
								() => Y("lbl.stepMs"),
								() => Y("tip.props.staggerPattern"),
								() => Y("lbl.pattern")
							]), B("change", s, (e) => Ra("step", Number(e.target.value))), H(e, t);
						};
						W(c, (e) => {
							z(Zr).type === "stagger" && e(l);
						}), L((e, t) => {
							U(r, `${e ?? ""} `), q(i, z(Zr).props.duration), U(o, `${t ?? ""} `), q(s, z(Zr).props.delay ?? 0);
						}, [() => Y("lbl.durationMs"), () => Y("lbl.delayMs")]), B("change", i, (e) => Ra("duration", Number(e.target.value))), B("change", s, (e) => Ra("delay", Number(e.target.value))), H(e, t);
					}, w = /* @__PURE__ */ k(() => wa(z(Zr)));
					W(le, (e) => {
						z(w) && e(ue);
					});
					var de = I(le, 2), fe = N(de), pe = I(fe);
					{
						let e = /* @__PURE__ */ k(() => z(Qr)?.type ?? (z(Zr) && !wa(z(Zr)) ? z(Zr).type : ""));
						X(pe, {
							get value() {
								return z(e);
							},
							get options() {
								return Oa;
							},
							onchange: (e) => La(e || null)
						});
					}
					E(de), L((e, t, n, a, c, d, f, h, g, y, b, ee, ne, C, ae, ce, le) => {
						U(r, e), J(i, "title", t), U(o, `${n ?? ""} `), q(s, z(Jr)), J(s, "placeholder", a), wi(l, z(qr) !== null), U(u, ` ${c ?? ""}`), J(p, "title", d), U(m, f), J(_, "title", h), U(v, `${g ?? ""} `), U(x, `#${z(Kr) ?? ""}`), J(S, "title", y), U(te, b), J(re, "title", ee), U(ie, ne), J(oe, "title", C), U(se, `${ae ?? ""} `), J(de, "title", ce), U(fe, `${le ?? ""} `);
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
					]), B("change", s, (e) => Va(e.target.value)), B("change", l, (e) => Ya(e.target.checked)), B("click", S, () => navigator.clipboard?.writeText(`#${z(Kr)}`)), H(e, t);
				}, o = (e) => {
					var t = jm(), n = F(t, !0);
					L((e) => U(n, e), [() => Y("hint.props.empty")]), H(e, t);
				};
				W(n, (e) => {
					z(M) ? e(r) : z(Kr) ? e(i, 1) : e(o, -1);
				}), E(t), H(e, t);
			}, ie = (e) => {
				var t = Av(), n = N(t), r = N(n);
				K(r);
				var i = I(r);
				E(n);
				var s = I(n, 2), c = (e) => {
					var t = pv(), n = N(t), r = F(n, !0), i = I(n, 2);
					Yr(i, 21, () => z(O).pages ?? [], (e) => e.id, (e, t) => {
						var n = Hm(), r = N(n);
						K(r);
						var i = I(r);
						E(n), L((e, a) => {
							J(n, "title", e), wi(r, a), U(i, ` ${(z(t).title || z(t).id) ?? ""}`);
						}, [() => Y("tip.footer.hideOnPage"), () => !(z(O).footer?.hideOn ?? []).includes(z(t).id)]), B("change", r, (e) => Zd(z(t).id, e.target.checked)), H(e, n);
					}), E(i), E(t), L((e) => U(r, e), [() => Y("group.showOnPages")]), H(e, t);
				};
				W(s, (e) => {
					z(O).footer?.show && e(c);
				});
				var l = I(s, 2), u = N(l), d = F(u, !0), f = I(u, 2), p = N(f);
				Yr(p, 21, () => Md, (e) => e.id, (e, t) => {
					var n = wv(), r = N(n);
					G(r, () => Rf(z(t).thumb), !0), E(r);
					var i = F(I(r, 2), !0);
					E(n), L((e) => {
						J(n, "title", e), U(i, z(t).label);
					}, [() => Y("tip.footer.template", { label: z(t).label })]), B("click", n, () => zd(z(t).id)), H(e, n);
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
						onchange: (e) => Ed(e)
					});
				}
				E(te);
				var ie = I(te, 2), ae = (e) => {
					var t = Ev(), n = P(t), r = N(n), i = N(r), a = I(i);
					E(r);
					var o = I(r, 2), s = (e) => {
						var t = Qp();
						G(t, () => C.cross, !0), E(t), L((e) => J(t, "title", e), [() => Y("tip.footer.removeLogo")]), B("click", t, Od), H(e, t);
					};
					W(o, (e) => {
						z(O).footer?.brand?.logo && e(s);
					}), E(n);
					var c = I(n, 2), l = (e) => {
						var t = Tv(), n = P(t), r = N(n), i = F(I(r));
						E(n);
						var a = I(n, 2);
						K(a), L((e) => {
							U(r, `${e ?? ""} `), U(i, `${z(O).footer?.brand?.logoHeight ?? 40 ?? ""} px`), q(a, z(O).footer?.brand?.logoHeight ?? 40);
						}, [() => Y("lbl.logoHeight")]), B("input", a, (e) => kd(e.target.value)), H(e, t);
					};
					W(c, (e) => {
						z(O).footer?.brand?.logo && e(l);
					}), L((e, t) => {
						J(r, "title", e), U(i, `${t ?? ""} `);
					}, [() => Y("tip.webpAutoPublish"), () => z(O).footer?.brand?.logo ? Y("ui.changeLogo") : Y("ui.uploadLogo")]), B("change", a, Dd), H(e, t);
				};
				W(ie, (e) => {
					(z(O).footer?.brand?.mode ?? "text") !== "text" && e(ae);
				}), E(_), E(m);
				var oe = I(m, 2), se = N(oe), ce = F(se, !0), le = I(se, 2), ue = N(le);
				Yr(ue, 17, () => z(O).footer?.columns ?? [], Gr, (e, t, n) => {
					var r = Dv(), i = P(r), a = N(i);
					K(a);
					var o = I(a, 2), s = N(o);
					G(s, () => C.plus, !0), E(s);
					var c = I(s, 2);
					c.disabled = n === 0, G(c, () => C.up, !0), E(c);
					var l = I(c, 2);
					G(l, () => C.down, !0), E(l);
					var u = I(l, 2);
					G(u, () => C.cross, !0), E(u), E(o), E(i), Yr(I(i, 2), 17, () => z(t).links ?? [], Gr, (e, r, i) => {
						var a = Tm(), o = N(a);
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
								onchange: (e) => sf(n, i, e)
							});
						}
						E(d);
						var p = I(d, 2), m = (e) => {
							var t = wm();
							K(t), L((e, n) => {
								q(t, z(r).href ?? ""), J(t, "placeholder", e), J(t, "title", n);
							}, [() => Y("ph.hrefAnchor"), () => Y("tip.hrefAnchor")]), B("change", t, (e) => cf(n, i, e.target.value)), H(e, t);
						};
						W(p, (e) => {
							z(r).page || e(m);
						}), E(a), L((e, n) => {
							q(o, z(r).label), J(o, "title", e), l.disabled = i === z(t).links.length - 1, J(u, "title", n);
						}, [() => Y("tip.linkLabel"), () => Y("tip.removeLink")]), B("input", o, (e) => of(n, i, e.target.value)), B("click", c, () => af(n, i, -1)), B("click", l, () => af(n, i, 1)), B("click", u, () => rf(n, i)), H(e, a);
					}), L((e, r, i) => {
						q(a, z(t).title), J(a, "title", e), J(s, "title", r), l.disabled = n === z(O).footer.columns.length - 1, J(u, "title", i);
					}, [
						() => Y("tip.footer.columnTitle"),
						() => Y("tip.footer.addLink"),
						() => Y("tip.footer.removeColumn")
					]), B("input", a, (e) => tf(n, e.target.value)), B("click", s, () => nf(n)), B("click", c, () => ef(n, -1)), B("click", l, () => ef(n, 1)), B("click", u, () => $d(n)), H(e, r);
				});
				var w = I(ue, 2), de = F(w, !0), fe = I(w, 2), pe = N(fe), me = I(pe);
				{
					let e = /* @__PURE__ */ k(() => z(O).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ k(() => [["left", Y("common.left")], ["center", Y("common.center")]]);
					X(me, {
						get value() {
							return z(e);
						},
						get options() {
							return z(t);
						},
						onchange: (e) => Kd(e)
					});
				}
				E(fe), E(le), E(oe);
				var T = I(oe, 2), he = N(T), ge = F(he, !0), _e = I(he, 2), ve = N(_e);
				Yr(ve, 17, () => z(O).footer?.social ?? [], Gr, (e, t, n) => {
					var r = Ov(), i = N(r), a = N(i);
					G(a, () => lo(z(t).icon) || "", !0), E(a);
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
								return hf;
							},
							onchange: (e) => ff(n, e)
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
					K(d), E(r), L((e, r) => {
						l.disabled = n === z(O).footer.social.length - 1, J(u, "title", e), q(d, z(t).url), J(d, "placeholder", r);
					}, [() => Y("tip.removeLink"), () => Y("ph.hrefMailto")]), B("click", c, () => df(n, -1)), B("click", l, () => df(n, 1)), B("click", u, () => uf(n)), B("change", d, (e) => pf(n, e.target.value)), H(e, r);
				});
				var ye = I(ve, 2), be = F(ye, !0);
				E(_e), E(T);
				var xe = I(T, 2), Se = N(xe), Ce = F(Se, !0), we = I(Se, 2), Te = N(we), Ee = N(Te);
				K(Ee);
				var De = I(Ee);
				E(Te);
				var Oe = I(Te, 2), Ae = (e) => {
					let t = /* @__PURE__ */ k(() => z(O).footer.cta);
					var n = kv(), r = P(n), i = N(r), a = I(i);
					{
						let e = /* @__PURE__ */ k(() => z(t).kind ?? "button"), n = /* @__PURE__ */ k(() => [["button", Y("opt.cta.button")], ["newsletter", Y("opt.cta.newsletter")]]);
						X(a, {
							get value() {
								return z(e);
							},
							get options() {
								return z(n);
							},
							onchange: (e) => Yd("kind", e)
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
						var n = Yp(), r = P(n), i = N(r), a = I(i);
						{
							let e = /* @__PURE__ */ k(() => z(t).page ?? "__href"), n = /* @__PURE__ */ k(() => [...z(O).pages.map((e) => [e.id, e.title]), ["__href", Y("opt.linkHrefMailto")]]);
							X(a, {
								get value() {
									return z(e);
								},
								get options() {
									return z(n);
								},
								onchange: (e) => Xd(e)
							});
						}
						E(r);
						var o = I(r, 2), s = (e) => {
							var n = Pm();
							K(n), L((e, r) => {
								q(n, z(t).href ?? ""), J(n, "placeholder", e), J(n, "title", r);
							}, [() => Y("ph.hrefMailtoAnchor"), () => Y("tip.hrefAnchor")]), B("change", n, (e) => Yd("href", e.target.value)), H(e, n);
						};
						W(o, (e) => {
							z(t).page || e(s);
						}), L((e, t) => {
							J(r, "title", e), U(i, `${t ?? ""} `);
						}, [() => Y("tip.footer.ctaTarget"), () => Y("lbl.buttonTarget")]), H(e, n);
					}, b = (e) => {
						var n = rh(), r = P(n), i = N(r), a = I(i);
						K(a), E(r);
						var o = I(r, 2), s = N(o), c = I(s);
						K(c), E(o);
						var l = I(o, 2), u = N(l), d = I(u);
						K(d), E(l), L((e, n, f, p, m, h, g, _, v) => {
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
						]), B("change", a, (e) => Yd("endpoint", e.target.value)), B("change", c, (e) => Yd("recipient", e.target.value)), B("input", d, (e) => Yd("success", e.target.value)), H(e, n);
					};
					W(v, (e) => {
						(z(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), L((e, n, a, v, y, b, x, S, ee, te, ne, re) => {
						J(r, "title", e), U(i, `${n ?? ""} `), J(o, "title", a), wi(s, z(t).big === !0), U(c, ` ${v ?? ""}`), J(l, "title", y), U(u, `${b ?? ""} `), q(d, z(t).heading ?? ""), J(d, "placeholder", x), J(f, "title", S), U(p, `${ee ?? ""} `), q(m, z(t).sub ?? ""), J(h, "title", te), U(g, `${ne ?? ""} `), q(_, z(t).label ?? ""), J(_, "placeholder", re);
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
					]), B("change", s, (e) => Yd("big", e.target.checked)), B("input", d, (e) => Yd("heading", e.target.value)), B("input", m, (e) => Yd("sub", e.target.value)), B("input", _, (e) => Yd("label", e.target.value)), H(e, n);
				};
				W(Oe, (e) => {
					z(O).footer?.cta && e(Ae);
				}), E(we), E(xe);
				var je = I(xe, 2), Me = N(je), Ne = F(Me, !0), Pe = I(Me, 2), Fe = N(Pe);
				o(Fe, () => "linkRow", () => z(O).footer?.linkRow ?? []);
				var Ie = I(Fe, 2), Le = F(Ie, !0);
				E(Pe), E(je);
				var Re = I(je, 2), ze = N(Re), Be = F(ze, !0), Ve = I(ze, 2), He = N(Ve), Ue = (e) => {
					var t = $h(), n = P(t), r = N(n), i = I(r);
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
							onchange: (e) => wd("footer", (t) => {
								t.align = e;
							})
						});
					}
					E(n), ke(2), L((e, t) => {
						J(n, "title", e), U(r, `${t ?? ""} `);
					}, [() => Y("tip.footer.align"), () => Y("lbl.align")]), H(e, t);
				};
				W(He, (e) => {
					z(O).footer?.cta?.big !== !0 && e(Ue);
				});
				var We = I(He, 2), Ge = F(We, !0), Ke = I(We, 2);
				a(Ke, () => fa, () => z(O).footer?.background?.layers ?? []), E(Ve), E(Re);
				var qe = I(Re, 2), Je = N(qe), Ye = F(Je, !0), Xe = I(Je, 2), Ze = N(Xe), Qe = N(Ze), $e = I(Qe);
				K($e), E(Ze);
				var et = I(Ze, 2), tt = F(et, !0), nt = I(et, 2);
				o(nt, () => "baseline", () => z(O).footer?.baseline ?? []);
				var D = I(nt, 2), rt = F(D, !0);
				E(Xe), E(qe), E(t), L((e, t, a, o, s, c, l, u, f, p, m, h, _, re, ie, C, ae, oe, se, le, ue, w, me, T, he, _e, ve, ye, xe, Se, we, Oe) => {
					J(n, "title", e), wi(r, t), U(i, ` ${a ?? ""}`), U(d, o), U(g, s), J(v, "title", c), U(y, `${l ?? ""} `), q(b, z(O).footer?.brand?.title ?? ""), J(b, "placeholder", u), J(x, "title", f), U(S, `${p ?? ""} `), q(ee, z(O).footer?.brand?.tagline ?? ""), J(te, "title", m), U(ne, `${h ?? ""} `), U(ce, _), U(de, re), J(fe, "title", ie), U(pe, `${C ?? ""} `), U(ge, ae), U(be, oe), U(Ce, se), J(Te, "title", le), wi(Ee, ue), U(De, ` ${w ?? ""}`), U(Ne, me), U(Le, T), U(Be, he), U(Ge, _e), U(Ye, ve), J(Ze, "title", ye), U(Qe, `${xe ?? ""} `), q($e, z(O).footer?.copyright ?? ""), J($e, "placeholder", Se), U(tt, we), U(rt, Oe);
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
				]), B("change", r, (e) => wd("footer", (t) => {
					t.show = e.target.checked;
				})), B("input", b, (e) => Td("title", e.target.value)), B("input", ee, (e) => Td("tagline", e.target.value)), B("click", w, Qd), B("click", ye, lf), B("change", Ee, (e) => qd(e.target.checked)), B("click", Ie, () => Bd("linkRow")), B("input", $e, (e) => Ad(e.target.value)), B("click", D, () => Bd("baseline")), H(e, t);
			}, ae = (e) => {
				var t = Rv(), n = N(t), r = (e) => {
					var t = mm(), n = N(t), r = I(n);
					{
						let e = /* @__PURE__ */ k(() => z(Wl) ?? ""), t = /* @__PURE__ */ k(() => [["", Y("common.choose")], ...z(Hl).map((e) => [e, z(Ul)[e]?.name ?? e])]);
						X(r, {
							get value() {
								return z(e);
							},
							get options() {
								return z(t);
							},
							onchange: (e) => j(Wl, e || null, !0)
						});
					}
					E(t), L((e) => U(n, `${e ?? ""} `), [() => Y("blocks.collection")]), H(e, t);
				};
				W(n, (e) => {
					z(Hl).length && e(r);
				});
				var i = I(n, 2), a = (e) => {
					let t = /* @__PURE__ */ k(() => z(Ul)[z(Wl)]);
					var n = Lv(), r = P(n), i = N(r), a = F(i, !0), o = I(i, 2), s = F(o, !0), c = I(o, 2), l = N(c), u = I(l);
					E(c);
					var d = I(c, 2);
					G(d, () => C.cross, !0), E(d), E(r);
					var f = I(r, 2);
					Yr(f, 19, () => z(t).entries, (e) => e.id, (e, n, r) => {
						var i = Iv(), a = N(i), o = F(a), s = I(a, 2), c = N(s), l = N(c);
						K(l);
						var u = I(l, 2), d = N(u);
						G(d, () => C.up, !0), E(d);
						var f = I(d, 2);
						G(f, () => C.down, !0), E(f);
						var p = I(f, 2);
						G(p, () => C.cross, !0), E(p), E(u), E(c);
						var m = I(c, 2), h = (e) => {
							var t = jv(), r = N(t), i = I(r);
							K(i), E(t), L((e) => {
								U(r, `${e ?? ""} `), q(i, z(n).date ?? "");
							}, [() => Y("lbl.date")]), B("change", i, (e) => ju(z(Wl), z(n).id, "date", e.target.value)), H(e, t);
						};
						W(m, (e) => {
							z(t).kind !== "products" && e(h);
						});
						var g = I(m, 2);
						ct(g);
						var _ = I(g, 2), v = (e) => {
							var t = Mm(), r = N(t), i = I(r);
							K(i), E(t), L((e, t) => {
								U(r, `${e ?? ""} `), q(i, z(n).href ?? ""), J(i, "placeholder", t);
							}, [() => Y("lbl.link"), () => Y("ph.collections.href")]), B("change", i, (e) => ju(z(Wl), z(n).id, "href", e.target.value)), H(e, t);
						};
						W(_, (e) => {
							z(t).kind !== "products" && e(v);
						});
						var y = I(_, 2), b = N(y), x = N(b), S = I(x);
						E(b);
						var ee = I(b, 2), te = (e) => {
							var t = Mv(), r = P(t), i = I(r, 2);
							G(i, () => C.cross, !0), E(i), L((e) => {
								J(r, "src", z(n).image), J(i, "title", e);
							}, [() => Y("tip.removeImage")]), B("click", i, () => ju(z(Wl), z(n).id, "image", "")), H(e, t);
						};
						W(ee, (e) => {
							z(n).image && e(te);
						}), E(y);
						var ne = I(y, 2), re = (e) => {
							var t = Fv(), r = P(t), i = N(r), a = I(i);
							K(a), E(r);
							var o = I(r, 2), s = N(o), c = I(s);
							K(c), E(o);
							var l = I(o, 2), u = N(l), d = I(u);
							K(d), E(l);
							var f = I(l, 2), p = N(f), m = I(p);
							K(m), E(f);
							var h = I(f, 2);
							Yr(h, 17, () => z(n).colors ?? [], Gr, (e, t, r) => {
								var i = Pv(), a = N(i);
								K(a);
								var o = I(a, 2), s = N(o), c = I(s);
								E(o);
								var l = I(o, 2), u = (e) => {
									var n = Nv();
									L(() => J(n, "src", z(t).image)), H(e, n);
								};
								W(l, (e) => {
									z(t).image && e(u);
								});
								var d = I(l, 2);
								G(d, () => C.cross, !0), E(d), E(i), L((e, n) => {
									q(a, z(t).name), J(a, "placeholder", e), U(s, `${n ?? ""} `);
								}, [() => Y("ph.colorName"), () => z(t).image ? Y("ui.changeImage") : Y("ui.addImage")]), B("change", a, (e) => Hu(z(Wl), z(n).id, r, "name", e.target.value)), B("change", c, (e) => Wu(z(Wl), z(n).id, r, e)), B("click", d, () => Gu(z(Wl), z(n).id, r)), H(e, i);
							});
							var g = I(h, 2), _ = F(g, !0);
							L((e, t, r, h, v, y, b, x, S, ee, te) => {
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
							]), B("change", a, (e) => ju(z(Wl), z(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), B("change", c, (e) => ju(z(Wl), z(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), B("change", d, (e) => ju(z(Wl), z(n).id, "badge", e.target.value)), B("change", m, (e) => Lu(z(Wl), z(n).id, e.target.value)), B("click", g, () => Vu(z(Wl), z(n).id)), H(e, t);
						};
						W(ne, (e) => {
							z(t).kind === "products" && e(re);
						}), E(s), E(i), L((e, i, a, s, c) => {
							U(o, `${e ?? ""}${z(t).kind === "products" ? z(n).price == null ? "" : ` · ${z(n).price}` : z(n).date ? ` · ${z(n).date}` : ""}`), q(l, z(n).title), J(l, "title", i), d.disabled = z(r) === 0, f.disabled = z(r) === z(t).entries.length - 1, J(p, "title", a), J(g, "placeholder", s), q(g, z(n).text ?? ""), U(x, `${c ?? ""} `);
						}, [
							() => wu(z(n).title),
							() => Y("lbl.title"),
							() => Y("tip.collections.deleteEntry"),
							() => Y("ph.collections.text"),
							() => z(n).image ? Y("ui.changeImage") : Y("ui.addImage")
						]), B("change", l, (e) => ju(z(Wl), z(n).id, "title", e.target.value || Y("ui.untitled"))), B("click", d, () => Mu(z(Wl), z(r), -1)), B("click", f, () => Mu(z(Wl), z(r), 1)), B("click", p, () => Nu(z(Wl), z(n).id)), B("change", g, (e) => ju(z(Wl), z(n).id, "text", e.target.value)), B("change", S, (e) => Pu(z(Wl), z(n).id, e)), H(e, i);
					});
					var p = I(f, 2), m = (e) => {
						var t = jm(), n = F(t, !0);
						L((e) => U(n, e), [() => Y("hint.collections.empty")]), H(e, t);
					};
					W(p, (e) => {
						z(t).entries.length || e(m);
					}), ke(2), L((e, t, n, r, i, u) => {
						U(a, e), J(o, "title", t), U(s, n), J(c, "title", r), U(l, `${i ?? ""} `), J(d, "title", u);
					}, [
						() => Y("ui.addEntry"),
						() => Y("tip.collections.exportCsv"),
						() => Y("ui.exportCsv"),
						() => Y("tip.collections.importCsv"),
						() => Y("ui.importCsv"),
						() => Y("tip.collections.deleteCollection")
					]), B("click", i, () => Au(z(Wl))), B("click", o, () => Ku(z(Wl))), B("change", u, (e) => qu(z(Wl), e)), B("click", d, () => ku(z(Wl))), H(e, n);
				};
				W(i, (e) => {
					z(Wl) && z(Ul)[z(Wl)] && e(a);
				});
				var o = I(i, 2), s = N(o), c = I(s);
				K(c), E(o);
				var l = I(o, 2), u = N(l);
				X(I(u), {
					get value() {
						return z(Kl);
					},
					get options() {
						return ql;
					},
					onchange: (e) => j(Kl, e, !0)
				}), E(l);
				var d = I(l, 2), f = F(d, !0);
				E(t), L((e, t, n, r, i) => {
					U(s, `${e ?? ""} `), J(c, "placeholder", t), U(u, `${n ?? ""} `), d.disabled = r, U(f, i);
				}, [
					() => Y("lbl.newCollectionName"),
					() => Y("ph.collections.name"),
					() => Y("common.type"),
					() => !z(Gl).trim(),
					() => Y("ui.createCollection")
				]), B("keydown", c, (e) => e.key === "Enter" && Du()), Oi(c, () => z(Gl), (e) => j(Gl, e)), B("click", d, Du), H(e, t);
			}, oe = (e) => {
				var t = Gv(), n = N(t), r = (e) => {
					var t = jm(), n = F(t, !0);
					L((e) => U(n, e), [() => Y("hint.plugins.empty")]), H(e, t);
				}, i = /* @__PURE__ */ k(() => !ud().length);
				W(n, (e) => {
					z(i) && e(r);
				});
				var a = I(n, 2);
				Yr(a, 16, ud, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ k(() => td[t]), r = /* @__PURE__ */ k(() => (z(ed)?.enabled ?? []).includes(t));
					var i = Vv();
					let a;
					var o = N(i), s = N(o), c = F(s, !0), l = I(s, 2), u = (e) => {
						var t = zv(), r = F(t);
						L(() => U(r, `v${z(n).version ?? ""}`)), H(e, t);
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
						var t = Bv(), r = F(t, !0);
						L((e) => U(r, e), [() => z(n).errors.join("; ")]), H(e, t);
					}, v = (e) => {
						var t = Bv(), r = F(t, !0);
						L((e) => U(r, e), [() => Y("plugin.engineMismatch", {
							required: z(n).requiresEngine,
							current: z(nd)
						})]), H(e, t);
					}, y = (e) => {
						var t = Bv(), r = F(t, !0);
						L((e) => U(r, e), [() => Y("plugin.cspNeeded", { list: md(z(n).csp).join(", ") })]), H(e, t);
					}, b = /* @__PURE__ */ k(() => z(n)?.csp && md(z(n).csp).length);
					W(g, (e) => {
						z(n)?.errors?.length ? e(_) : z(n) && !z(n).satisfied ? e(v, 1) : z(b) && e(y, 2);
					});
					var x = I(g, 2), S = (e) => {
						var t = jm(), r = F(t, !0);
						L((e) => U(r, e), [() => Y("plugin.languages", { list: z(n).languages.map((e) => e.name).join(", ") })]), H(e, t);
					};
					W(x, (e) => {
						z(n)?.languages?.length && e(S);
					}), E(i), L((e, t, o, s, l) => {
						a = _i(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": z(n)?.errors?.length }), U(c, e), J(f, "title", t), wi(p, z(r)), p.disabled = o, U(m, ` ${s ?? ""}`), J(h, "title", l);
					}, [
						() => z(n)?.names?.[Xi()] ?? z(n)?.name ?? t,
						() => z(r) ? Y("tip.plugins.on") : Y("tip.plugins.off"),
						() => !!z(n)?.errors?.length,
						() => z(r) ? Y("ui.on") : Y("ui.off"),
						() => Y("tip.plugins.remove")
					]), B("change", p, (e) => yd(t, e.target.checked)), B("click", h, () => xd(t)), H(e, i);
				});
				var o = I(a, 2), s = (e) => {
					var t = Uv(), n = I(P(t), 2), r = F(n, !0);
					Yr(I(n, 2), 16, () => z(sd), (e) => e, (e, t) => {
						var n = Hv(), r = N(n), i = N(r), a = F(i, !0), o = I(i, 2), s = (e) => {
							var n = zv(), r = F(n);
							L(() => U(r, `v${td[t].version ?? ""}`)), H(e, n);
						};
						W(o, (e) => {
							td[t]?.version && e(s);
						});
						var c = I(o, 2), l = N(c);
						G(l, () => C.right, !0), E(l), E(c), E(r), E(n), L((e, t) => {
							U(a, e), J(l, "title", t);
						}, [() => td[t]?.names?.[Xi()] ?? td[t]?.name ?? t, () => Y("tip.plugins.addFound")]), B("click", l, () => Cd(t)), H(e, n);
					}), L((e) => U(r, e), [() => Y("hint.plugins.found")]), H(e, t);
				};
				W(o, (e) => {
					z(sd).length && e(s);
				});
				var c = I(o, 2), l = (e) => {
					var t = Pr(), n = P(t), r = (e) => {
						var t = jm(), n = F(t, !0);
						L((e) => U(n, e), [() => Y("hint.plugins.autoDiscover")]), H(e, t);
					};
					W(n, (e) => {
						z(sd).length || e(r);
					}), H(e, t);
				}, u = (e) => {
					var t = Wv(), n = I(P(t), 2);
					K(n);
					var r = I(n, 2), i = F(r, !0), a = I(r, 2), o = (e) => {
						var t = Bv(), n = F(t, !0);
						L(() => U(n, z(od))), H(e, t);
					};
					W(a, (e) => {
						z(od) && e(o);
					}), L((e, t, a) => {
						J(n, "placeholder", e), r.disabled = t, U(i, a);
					}, [
						() => Y("ph.plugins.folder"),
						() => !z(id).trim(),
						() => Y("ui.addPlugin")
					]), B("keydown", n, (e) => e.key === "Enter" && Sd()), Oi(n, () => z(id), (e) => j(id, e)), B("click", r, Sd), H(e, t);
				};
				W(c, (e) => {
					z(ld) === "ok" ? e(l) : e(u, -1);
				}), E(t), H(e, t);
			}, se = (e) => {
				var t = Cv(), n = N(t), r = (e) => {
					var t = jm(), n = F(t, !0);
					L((e) => U(n, e), [() => Y("hint.history.loading")]), H(e, t);
				}, i = (e) => {
					var t = Bm(), n = P(t), r = (e) => {
						var t = jm(), n = F(t, !0);
						L(() => U(n, z(ro))), H(e, t);
					};
					W(n, (e) => {
						z(ro) && e(r);
					});
					var i = I(n, 2), a = (e) => {
						var t = qv(), n = P(t), r = F(n, !0);
						Yr(I(n, 2), 19, () => z(no), (e) => e.sha, (e, t, n) => {
							var r = Kv();
							let i;
							var a = N(r), o = F(a, !0), s = F(I(a, 2));
							E(r), L((e) => {
								i = _i(r, 1, "history-row svelte-1n46o8q", null, i, { head: z(n) === 0 }), J(a, "title", z(t).sha), U(o, z(t).message), U(s, `${z(t).author ?? ""}${e ?? ""}`);
							}, [() => z(t).date ? ` · ${oo.format(new Date(z(t).date))}` : ""]), H(e, r);
						}), L((e, t) => {
							n.disabled = z(io) || !z(ve)?.allowed, J(n, "title", e), U(r, t);
						}, [() => z(ve)?.allowed ? Y("tip.history.revert") : Y("tip.history.needsAccess"), () => Y("ui.revertLast")]), B("click", n, fo), H(e, t);
					};
					W(i, (e) => {
						z(no).length > 0 && e(a);
					}), H(e, t);
				};
				W(n, (e) => {
					z(no) === null ? e(r) : e(i, -1);
				}), E(t), H(e, t);
			}, ce = (e) => {
				var t = Cv(), n = N(t), r = (e) => {
					var t = jm(), n = F(t, !0);
					L((e) => U(n, e), [() => Y("update.checking")]), H(e, t);
				}, i = (e) => {
					var t = Jv(), n = P(t), r = F(n, !0), i = I(n, 2), a = F(i, !0);
					L((e) => {
						U(r, z(_o)), U(a, e);
					}, [() => Y("update.retry")]), B("click", i, bo), H(e, t);
				}, a = (e) => {
					var t = ay(), n = P(t), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
						var t = Yv(), n = P(t);
						G(n, () => C.right, !0), E(n);
						var r = F(I(n, 2), !0);
						L(() => U(r, z(go).target)), H(e, t);
					};
					W(a, (e) => {
						z(go).upToDate || e(o);
					}), E(n);
					var s = I(n, 2), c = (e) => {
						var t = jm(), n = F(t, !0);
						L((e) => U(n, e), [() => Y("update.upToDate")]), H(e, t);
					}, l = (e) => {
						var t = iy(), n = P(t), r = F(n, !0), i = I(n, 2), a = (e) => {
							var t = Xv(), n = N(t), r = F(n, !0), i = I(n, 2), a = F(N(i), !0);
							E(i), E(t), L((e) => {
								U(r, e), U(a, z(go).notes);
							}, [() => Y("update.aboutVersion", { target: z(go).target })]), H(e, t);
						};
						W(i, (e) => {
							z(go).notes && e(a);
						});
						var o = I(i, 2), s = (e) => {
							var t = Zv(), n = N(t), r = N(n);
							G(r, () => C.warn, !0), E(r);
							var i = I(r);
							E(n);
							var a = I(n, 2), o = F(N(a), !0);
							E(a), E(t), L((e, t) => {
								J(n, "title", e), U(i, ` ${t ?? ""}`), U(o, z(go).headers.upstream);
							}, [() => Y("update.headersManual"), () => Y("update.headersTitle")]), H(e, t);
						};
						W(o, (e) => {
							z(go).headers?.upstream && e(s);
						});
						var c = I(o, 2);
						Yr(c, 17, () => z(go).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = $v(), r = N(n), i = F(r, !0), a = I(r, 2), o = N(a), s = (e) => {
								var t = Qv(), n = F(t, !0);
								L((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
							};
							W(o, (e) => {
								z(t).action === "delete" && e(s);
							});
							var c = I(o, 2);
							G(c, () => C.warn, !0), E(c), E(a), E(n), L((e) => {
								J(r, "title", z(t).path), U(i, z(t).path), J(c, "title", e);
							}, [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
						});
						var l = I(c, 2), u = N(l), d = F(u), f = I(u, 2);
						Yr(f, 21, () => z(go).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = ey(), r = N(n), i = F(r, !0), a = I(r, 2), o = (e) => {
								var t = Qv(), n = F(t, !0);
								L((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
							};
							W(a, (e) => {
								z(t).action === "delete" && e(o);
							}), E(n), L(() => {
								J(r, "title", z(t).path), U(i, z(t).path);
							}), H(e, n);
						}), E(f), E(l);
						var p = I(l, 2), m = (e) => {
							var t = ry(), n = P(t), r = N(n), i = F(r, !0), a = F(I(r, 2), !0);
							E(n), Yr(I(n, 2), 17, () => z(go).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = ny(), r = N(n);
								let i;
								var a = F(r, !0), o = I(r, 2), s = N(o), c = (e) => {
									var t = Qv(), n = F(t, !0);
									L((e) => U(n, e), [() => Y("update.actionDelete")]), H(e, t);
								};
								W(s, (e) => {
									z(t).action === "delete" && e(c);
								});
								var l = I(s, 2), u = (e) => {
									var n = ty();
									G(n, () => C.warn, !0), E(n), L((e) => J(n, "title", e), [() => Y(`update.conflict.${z(t).conflict}`)]), H(e, n);
								};
								W(l, (e) => {
									z(t).conflict && e(u);
								});
								var d = I(l, 2);
								K(d), E(o), E(n), L((e, n, o, s) => {
									i = _i(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), J(r, "title", z(t).path), U(a, z(t).path), wi(d, n), J(d, "title", o), J(d, "aria-label", s);
								}, [
									() => z(yo).has(z(t).path),
									() => z(yo).has(z(t).path),
									() => Y("update.keepMine.title"),
									() => Y("update.keepMine")
								]), B("change", d, () => xo(z(t).path)), H(e, n);
							}), L((e, t) => {
								U(i, e), U(a, t);
							}, [() => Y("update.optionalTitle"), () => Y("update.keepMine")]), H(e, t);
						}, h = /* @__PURE__ */ k(() => z(go).changes.some((e) => !e.atom));
						W(p, (e) => {
							z(h) && e(m);
						});
						var g = I(p, 2), _ = F(g, !0);
						L((e, t, n, i, a, o) => {
							U(r, e), J(u, "title", t), U(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = z(vo) || !z(ve)?.allowed, J(g, "title", a), U(_, o);
						}, [
							() => Y("update.summary", {
								writes: z(go).changes.filter((e) => e.action === "write").length,
								deletes: z(go).changes.filter((e) => e.action === "delete").length
							}),
							() => Y("update.atomGroup.title"),
							() => Y("update.atomTitle"),
							() => z(go).changes.filter((e) => e.atom).length,
							() => z(ve)?.allowed ? Y("update.run.title") : Y("tip.history.needsAccess"),
							() => Y("update.run", { target: z(go).target })
						]), B("click", g, So), H(e, t);
					};
					W(s, (e) => {
						z(go).upToDate ? e(c) : e(l, -1);
					}), L((e) => U(i, e), [() => Y("update.current", { version: z(go).current })]), H(e, t);
				};
				W(n, (e) => {
					z(vo) && !z(go) ? e(r) : z(_o) ? e(i, 1) : z(go) && e(a, 2);
				}), E(t), H(e, t);
			};
			W(m, (e) => {
				z(Ht) === "pages" ? e(h) : z(Ht) === "nav" ? e(y, 1) : z(Ht) === "site" ? e(b, 2) : z(Ht) === "theme" ? e(x, 3) : z(Ht) === "blocks" ? e(S, 4) : z(Ht) === "grid" ? e(ee, 5) : z(Ht) === "properties" ? e(re, 6) : z(Ht) === "footer" ? e(ie, 7) : z(Ht) === "collections" ? e(ae, 8) : z(Ht) === "plugins" ? e(oe, 9) : z(Ht) === "history" ? e(se, 10) : z(Ht) === "update" && e(ce, 11);
			}), E(t), Mi(t, (e) => j(np, e), () => z(np)), L((e) => {
				n = _i(t, 1, "panel svelte-1n46o8q", null, n, { hidden: !z(be) }), J(i, "title", e), U(s, Gt[z(Ht)]);
			}, [() => Kt[z(Ht)]?.map((e) => Y(e)).join("\n")]), H(e, t);
		};
		W(y, (e) => {
			z(Ht) && e(b);
		});
		var x = I(y, 2);
		let S;
		var ee = N(x), re = N(ee);
		Mi(re, (e) => j(_e, e), () => z(_e)), E(ee), E(x), Mi(x, (e) => j(Pe, e), () => z(Pe)), E(t), L((e, t) => {
			r = _i(n, 1, "rail svelte-1n46o8q", null, r, { hidden: !z(be) }), u = _i(c, 1, "rail-gear svelte-1n46o8q", null, u, { active: z(jo) }), J(c, "title", e), S = _i(x, 1, "frame-wrap svelte-1n46o8q", null, S, {
				mobile: z(Ne) === "mobile",
				pan: z(Je),
				fold: z(Ve) > 0
			}), yi(ee, `width:${z(Ge) ?? ""}px; height:${z(Ke) ?? ""}px`), J(re, "title", t), J(re, "src", `/?page=${z(w)}&preview=1`), yi(re, `width:${z(Be) ?? ""}px; height:${z(We) ?? ""}px; transform:scale(${z(He) ?? ""}); transform-origin:top left`);
		}, [() => Y("settings.title"), () => Y("ui.previewTitle")]), B("click", c, () => j(jo, !z(jo))), wr("load", re, Oo), Sr(re), H(e, t);
	}, wb = (e) => {
		var t = cy(), n = F(t, !0);
		L((e) => U(n, e), [() => Y("ui.loading")]), H(e, t);
	};
	W(Sb, (e) => {
		z(ue) ? e(Cb) : e(wb, -1);
	});
	var Tb = I(Sb, 2), Eb = (e) => {
		Is(e, {
			get image() {
				return z(Z);
			},
			onapply: ic,
			oncancel: () => j(Z, null)
		});
	};
	W(Tb, (e) => {
		z(Z) && e(Eb);
	});
	var Db = I(Tb, 2), Ob = (e) => {
		var t = uy(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2);
		Yr(a, 16, () => z(Dt).lines, (e) => e, (e, t) => {
			var n = ly(), r = F(n, !0);
			L(() => U(r, t)), H(e, n);
		});
		var o = I(a, 2), s = (e) => {
			var t = Pm();
			K(t), st(t, !0), L(() => J(t, "placeholder", z(Dt).placeholder)), B("keydown", t, (e) => e.key === "Enter" && z(Dt).value.trim() && At(!0)), Oi(t, () => z(Dt).value, (e) => z(Dt).value = e), H(e, t);
		};
		W(o, (e) => {
			z(Dt).prompt && e(s);
		});
		var c = I(o, 2), l = N(c), u = F(l, !0), d = I(l, 2), f = F(d, !0);
		E(c), E(n), E(t), L(() => {
			U(i, z(Dt).title), U(u, z(Dt).cancelLabel), U(f, z(Dt).okLabel);
		}), B("pointerdown", t, (e) => jt = e.target === e.currentTarget), B("click", t, (e) => jt && e.target === e.currentTarget && At(!1)), B("click", l, () => At(!1)), B("click", d, () => At(!0)), H(e, t);
	};
	W(Db, (e) => {
		z(Dt) && e(Ob);
	});
	var kb = I(Db, 2), Ab = (e) => {
		var t = dy(), n = N(t), r = N(n), i = F(r, !0), a = I(r, 2), o = F(a, !0), s = I(a, 2), c = N(s), l = I(c);
		K(l), E(s);
		var u = I(s, 2), d = N(u), f = I(d);
		{
			let e = /* @__PURE__ */ k(() => Y("setup.accentPick"));
			Ta(f, {
				get value() {
					return z(Pt);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => j(Pt, e, !0)
			});
		}
		E(u);
		var p = I(u, 2), m = N(p), h = I(m);
		{
			let e = /* @__PURE__ */ k(() => Y("setup.bgLabel"));
			Ta(h, {
				get value() {
					return z(Ft);
				},
				get label() {
					return z(e);
				},
				onchange: (e) => j(Ft, e, !0)
			});
		}
		E(p);
		var g = I(p, 2), _ = F(g, !0), v = I(g, 2), y = N(v), b = F(y, !0), x = I(y, 2), S = F(x, !0);
		E(v), E(n), E(t), L((e, t, n, r, a, s, u, f, p, h) => {
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
			() => !z(Nt).trim(),
			() => Y("setup.start")
		]), B("keydown", l, (e) => e.key === "Enter" && Lt()), Oi(l, () => z(Nt), (e) => j(Nt, e)), B("click", y, It), B("click", x, Lt), H(e, t);
	};
	W(kb, (e) => {
		z(Mt) && e(Ab);
	});
	var jb = I(kb, 2), Mb = (e) => {
		var t = fy();
		let n;
		var r = N(t), i = F(r, !0), a = I(r, 2);
		E(t), L((e) => {
			n = _i(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: z(pe) === "ok",
				error: z(pe) === "error"
			}), U(i, z(fe)), J(a, "title", e);
		}, [() => Y("ui.close")]), B("click", a, () => T("")), H(e, t);
	};
	W(jb, (e) => {
		z(fe) && e(Mb);
	}), E(ob);
	var Nb = I(ob, 2), Pb = (e) => {
		var t = py();
		let n;
		var r = N(t), i = N(r), a = F(i, !0), o = I(i, 2);
		G(o, () => z(dn) ? "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 4l4 5-4 5M16 4l-4 5 4 5\"/></svg>" : "<svg viewBox=\"0 0 18 18\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 4L2 9l4 5M12 4l4 5-4 5\"/></svg>", !0), E(o);
		var s = I(o, 2);
		G(s, () => C.cross, !0), E(s), E(r);
		var c = I(r, 2), u = N(c);
		l(u, () => z(_n)), E(c), E(t), L((e, r, i, c) => {
			n = _i(t, 1, "block-menu svelte-1n46o8q", null, n, { wide: z(_n) }), yi(t, `--menu-left: ${z(cn).left ?? ""}px; --menu-top: ${z(cn).top ?? ""}px; --menu-min: ${z(mn) ?? ""}px`), U(a, e), J(o, "title", r), J(o, "aria-label", i), J(s, "title", c);
		}, [
			() => Y("blocks.suffix", { label: Hr[z(M).type] ?? z(M).type }),
			() => z(dn) ? Y("menu.toNarrow") : Y("menu.toWide"),
			() => z(dn) ? Y("menu.toNarrow") : Y("menu.toWide"),
			() => Y("tip.closeEsc")
		]), B("click", o, () => j(dn, !z(dn))), B("click", s, () => j(cn, null)), H(e, t);
	};
	W(Nb, (e) => {
		z(cn) && z(M) && e(Pb);
	}), L(() => ub = _i(lb, 1, "topbar svelte-1n46o8q", null, ub, { hidden: !z(be) })), H(e, ab), Qe();
}
//#endregion
//#region src/main.js
Tr([
	"change",
	"click",
	"input",
	"pointerdown",
	"keydown"
]), document.documentElement.lang = await $i();
var gy = Br(hy, { target: document.getElementById("urd-admin") });
//#endregion
export { gy as default };
