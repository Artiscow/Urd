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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, w = 1 << 19, T = 1 << 20, ee = 1 << 25, te = 65536, ne = 1 << 21, re = 1 << 22, E = 1 << 23, D = Symbol("$state"), ie = Symbol("component"), ae = Symbol("legacy props"), oe = Symbol(""), se = Symbol("attributes"), ce = Symbol("class"), le = Symbol("style"), ue = Symbol("text"), de = Symbol("form reset"), fe = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), pe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml"), me = {}, he = Symbol("uninitialized"), ge = "http://www.w3.org/1999/xhtml", _e = "http://www.w3.org/2000/svg", ve = "http://www.w3.org/1998/Math/MathML";
function ye() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function be(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function xe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var Se = !1;
function Ce(e) {
	Se = e;
}
var we;
function Te(e) {
	if (e === null) throw be(), me;
	return we = e;
}
function Ee() {
	return Te(/* @__PURE__ */ cn(we));
}
function O(e) {
	if (Se) {
		if (/* @__PURE__ */ cn(we) !== null) throw be(), me;
		we = e;
	}
}
function De(e = 1) {
	if (Se) {
		for (var t = e, n = we; t--;) n = /* @__PURE__ */ cn(n);
		we = n;
	}
}
function Oe(e = !0) {
	for (var t = 0, n = we;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ cn(n);
		e && n.remove(), n = i;
	}
}
function ke(e) {
	if (!e || e.nodeType !== 8) throw be(), me;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ae(e) {
	return e === this.v;
}
function je(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Me(e) {
	return !je(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function Ne() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function Pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function Fe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function Ie() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Le(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function Re() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ze(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Be() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ve() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function k() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function He() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ue = [];
function We(e, t = !1, n = !1) {
	return A(e, /* @__PURE__ */ new Map(), "", Ue, null, n);
}
function A(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = A(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = A(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return t.getTime(), structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return A(t.toJSON(), n, r, i, t);
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
var Ge = null;
function Ke(e) {
	Ge = e;
}
function qe(e, t = !1, n) {
	Ge = {
		p: Ge,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Kn,
		l: null
	};
}
function Je(e) {
	var t = Ge, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ge = t.p, Ye(e);
}
function Ye(e = {}) {
	return i(e, ie, { value: !0 }), e;
}
function Xe() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ze = [];
function Qe() {
	var e = Ze;
	Ze = [], p(e);
}
function $e(e) {
	if (Ze.length === 0 && !Mt) {
		var t = Ze;
		queueMicrotask(() => {
			t === Ze && Qe();
		});
	}
	Ze.push(e);
}
function et() {
	for (; Ze.length > 0;) Qe();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var tt = ~(_ | v | g);
function nt(e, t) {
	e.f = e.f & tt | t;
}
function rt(e) {
	e.f & 512 || e.deps === null ? nt(e, g) : nt(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function it(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= te, it(t.deps));
}
function at(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), it(e.deps), nt(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var ot = !1;
function st(e) {
	var t = ot;
	try {
		return ot = !1, [e(), ot];
	} finally {
		ot = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ct(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, $e(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function lt(e) {
	Se && /* @__PURE__ */ sn(e) !== null && ln(e);
}
var ut = !1;
function dt() {
	ut || (ut = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[de]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ft(e) {
	var t = Un, n = Kn;
	Gn(null), qn(null);
	try {
		return e();
	} finally {
		Gn(t), qn(n);
	}
}
function pt(e, t, n, r = n) {
	e.addEventListener(t, () => ft(n));
	let i = e[de];
	e[de] = i ? () => {
		i(), r(!0);
	} : () => r(!0), dt();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function mt(e, t, n, r) {
	let i = Xe() ? vt : xt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Kn, c = ht(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				mn(e, s);
			}
			gt();
		}
	}
	var d = _t();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ bt(e))).then(u).catch((e) => mn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), gt();
	}) : f();
}
function ht() {
	var e = Kn, t = Un, n = Ge, r = Ot;
	return function(i = !0) {
		qn(e), Gn(t), Ke(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function gt(e = !0) {
	qn(null), Gn(null), Ke(null), e && Ot?.deactivate();
}
function _t() {
	var e = Kn, t = e.b, n = Ot, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	var t = 2 | _;
	return Kn !== null && (Kn.f |= w), {
		ctx: Ge,
		deps: null,
		effects: null,
		equals: Ae,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: he,
		wv: 0,
		parent: Kn,
		ac: null
	};
}
var yt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function bt(e, t, n) {
	let r = Kn;
	r === null && Ne();
	var i = void 0, a = Jt(he), o = !Un, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = Kn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== fe && n.reject(e);
			}).finally(gt);
		} catch (e) {
			n.reject(e), gt();
		}
		var c = Ot;
		if (o) {
			if (t.f & 32768) var l = _t();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(yt);
			else for (let e of s.values()) e.reject(yt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== yt && (c.activate(), t ? (a.f |= E, Xt(a, t)) : (a.f & 8388608 && (a.f ^= E), Xt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), yn(() => {
		for (let e of s) e.reject(yt);
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
	let t = /* @__PURE__ */ vt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function xt(e) {
	let t = /* @__PURE__ */ vt(e);
	return t.equals = Me, t;
}
function St(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) jn(t[n]);
	}
}
function Ct(e) {
	var t, n = Kn, r = e.parent;
	if (!Vn && r !== null && e.v !== he && r.f & 24576) return ye(), e.v;
	qn(r);
	try {
		e.f &= ~te, St(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function wt(e) {
	var t = Ct(e);
	if (!e.equals(t) && (e.wv = ir(), (!Ot?.is_fork || e.deps === null) && (Ot === null ? e.v = t : (Ot.capture(e, t, !0), kt?.capture(e, t, !0)), e.deps === null))) {
		nt(e, g);
		return;
	}
	Vn || (At === null ? rt(e) : (vn() || Ot?.is_fork) && At.set(e, t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ft(() => {
		t.ac.abort(fe), t.ac = null;
	}), t.fn !== null && (t.teardown = f), ur(t, 0), kn(t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && dr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Dt = null, Ot = null, kt = null, At = null, jt = null, Mt = !1, Nt = !1, Pt = null, Ft = null, It = 0, Lt = 1, Rt = class e {
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
		Dt === null ? Dt = this : (Dt.#n = this, this.#t = Dt), Dt = this;
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
			for (var r of n.d) nt(r, _), t(r);
			for (r of n.m) nt(r, v), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, It++ > 1e3 && (this.#x(), Bt());
		for (let e of this.#u) this.#d.delete(e), nt(e, _), this.schedule(e);
		for (let e of this.#d) nt(e, v), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Pt = [], r = [], i = Ft = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Wt(e), this.#h() || this.discard(), t;
		}
		if (Ot = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ut(e, t);
			i.length > 0 && Ot.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), kt = this, M(r), M(n), kt = null, this.#s?.resolve();
		var s = Ot;
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), nt(i, _), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), Ot = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) at(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== he && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), At?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		Ot = this;
	}
	deactivate() {
		Ot = null, At = null;
	}
	flush() {
		try {
			Nt = !0, Ot = this, this.#g();
		} finally {
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, Ot = null, At = null, Kt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(yt);
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
		if (Ot === null) {
			let t = Ot = new e();
			!Nt && !Mt && $e(() => {
				t.#e || t.flush();
			});
		}
		return Ot;
	}
	apply() {
		At = null;
	}
	schedule(e) {
		if (jt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Pt !== null && t === Kn && (Un === null || !(Un.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? Dt = e : t.#t = e, this.linked = !1;
		}
	}
};
function zt(e) {
	var t = Mt;
	Mt = !0;
	try {
		var n;
		for (e && (Ot !== null && !Ot.is_fork && Ot.flush(), n = e());;) {
			if (et(), Ot === null) return n;
			Ot.flush();
		}
	} finally {
		Mt = t;
	}
}
function Bt() {
	try {
		Re();
	} catch (e) {
		mn(e, jt);
	}
}
var Vt = null;
function M(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (Vt = /* @__PURE__ */ new Set(), dr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), Vt?.size > 0)) {
				Kt.clear();
				for (let e of Vt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Vt.has(n) && (Vt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || dr(n);
					}
				}
				Vt.clear();
			}
		}
		Vt = null;
	}
}
function Ht(e) {
	Ot.schedule(e);
}
function Ut(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), nt(e, g);
		for (var n = e.first; n !== null;) Ut(n, t), n = n.next;
	}
}
function Wt(e) {
	nt(e, g);
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
		equals: Ae,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = Jt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = Jt(e);
	return t || (r.equals = Me), r;
}
function P(e, t, n = !1) {
	return Un !== null && (!Wn || Un.f & 131072) && Xe() && Un.f & 4325394 && (Jn === null || !Jn.has(e)) && k(), Xt(e, n ? $t(t) : t, Ft);
}
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Vn ? Kt.set(e, t) : Kt.has(e) || Kt.set(e, e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ct(t), At === null && rt(t);
		}
		e.wv = ir(), Qt(e, _, n), Xe() && Kn !== null && Kn.f & 1024 && !(Kn.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Gt.size > 0 && !qt && F();
	}
	return t;
}
function F() {
	qt = !1;
	for (let e of Gt) {
		e.f & 1024 && nt(e, v);
		let t;
		try {
			t = ar(e);
		} catch {
			t = !0;
		}
		t && dr(e);
	}
	Gt.clear();
}
function Zt(e) {
	P(e, e.v + 1);
}
function Qt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Xe(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Kn)) {
			var l = (c & _) === 0;
			if (l && nt(s, t), c & 131072) Gt.add(s);
			else if (c & 2) {
				var u = s;
				At?.delete(u), c & 65536 || (c & 512 && (Kn === null || !(Kn.f & 2097152)) && (s.f |= te), Qt(u, v, n));
			} else if (l) {
				var d = s;
				c & 16 && Vt !== null && Vt.add(d), n === null ? Ht(d) : n.push(d);
			}
		}
	}
}
function $t(t) {
	if (typeof t != "object" || !t || D in t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ N(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = Un, n = nr;
		Gn(null), rr(d);
		var r = e();
		return Gn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ N(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Be();
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
					let e = f(() => /* @__PURE__ */ N(he, u));
					r.set(t, e), Zt(o);
				}
			} else P(n, he), Zt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === D) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ N($t(s ? e[n] : he), u)), r.set(n, o)), o !== void 0) {
				var c = V(o);
				return c === he ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = V(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== he) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === D) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== he || Reflect.has(e, t);
			return (n !== void 0 || Kn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ N(i ? $t(e[t]) : he, u)), r.set(t, n)), V(n) === he) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ N(he, u)), r.set(d + "", p)) : P(p, he);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ N(void 0, u)), P(c, $t(n)), r.set(t, c));
			else {
				l = c.v !== he;
				var m = f(() => $t(n));
				P(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && P(g, _ + 1);
				}
				Zt(o);
			}
			return !0;
		},
		ownKeys(e) {
			V(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== he;
			});
			for (var [n, i] of r) i.v !== he && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Ve();
		}
	});
}
var en, tn, nn, rn;
function an() {
	if (en === void 0) {
		en = window, tn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		nn = a(t, "firstChild").get, rn = a(t, "nextSibling").get, u(e) && (e[ce] = void 0, e[se] = null, e[le] = void 0, e.__e = void 0), u(n) && (n[ue] = void 0);
	}
}
function on(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function sn(e) {
	return nn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function cn(e) {
	return rn.call(e);
}
function I(e, t) {
	if (!Se) return /* @__PURE__ */ sn(e);
	var n = /* @__PURE__ */ sn(we);
	if (n === null) n = we.appendChild(on());
	else if (t && n.nodeType !== 3) {
		var r = on();
		return n?.before(r), Te(r), r;
	}
	return t && fn(n), Te(n), n;
}
function L(e, t = !1) {
	if (!Se) {
		var n = /* @__PURE__ */ sn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ cn(n) : n;
	}
	if (t) {
		if (we?.nodeType !== 3) {
			var r = on();
			return we?.before(r), Te(r), r;
		}
		fn(we);
	}
	return we;
}
function R(e, t = !1) {
	if (!Se) return /* @__PURE__ */ sn(e);
	var n = I(e, t);
	return O(e), n;
}
function z(e, t = 1, n = !1) {
	let r = Se ? we : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ cn(r);
	if (!Se) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = on();
			return r === null ? i?.after(a) : r.before(a), Te(a), a;
		}
		fn(r);
	}
	return Te(r), r;
}
function ln(e) {
	e.textContent = "";
}
function un() {
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
	if (t === null) return Un.f |= E, e;
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
	Kn === null && (Un === null && Le(e), Ie()), Vn && Fe(e);
}
function gn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _n(e, t) {
	var n = Kn;
	n !== null && n.f & 8192 && (e |= y);
	var r = {
		ctx: Ge,
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
	Ot?.register_created_effect(r);
	var i = r;
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
	else if (t !== null) {
		try {
			dr(r);
		} catch (e) {
			throw jn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
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
	return nt(t, g), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = Kn.f;
	if (!Un && t & 32 && Ge !== null && !Ge.i) {
		var n = Ge;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | T, e);
}
function Sn(e) {
	Rt.ensure();
	let t = _n(64 | w, e);
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
	return _n(re | w, e);
}
function Tn(e, t = 0) {
	return _n(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	mt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(V));
		});
	});
}
function En(e, t = 0) {
	return _n(16 | t, e);
}
function Dn(e) {
	return _n(32 | w, e);
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
		e !== null && ft(() => {
			e.abort(fe);
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
		var n = e === t ? null : /* @__PURE__ */ cn(e);
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
		e.f ^= y, e.f & 1024 || (nt(e, _), Rt.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ cn(n);
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
	Un !== null && (Jn ??= /* @__PURE__ */ new Set()).add(e);
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
	if (t & 2 && (e.f &= ~te), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && wt(a), a.wv > e.wv) return !0;
		}
		t & 512 && At === null && nt(e, g);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? nt(a, _) : a.f & 1024 && nt(a, v), Ht(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = Un, a = Jn, o = Ge, s = Wn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, Un = l & 96 ? null : e, Jn = null, Ke(e.ctx), Wn = !1, nr = ++tr, e.ac !== null && (ft(() => {
		e.ac.abort(fe);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= x;
		var f = cr(e);
		if (Xe() && Qn !== null && !Wn && f !== null && !(e.f & 6146)) for (var p = 0; p < Qn.length; p++) or(Qn[p], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= E), d;
	} catch (t) {
		return cr(e), pn(t);
	} finally {
		e.f ^= ne, Xn = t, Zn = n, Qn = r, Un = i, Jn = a, Ke(o), Wn = s, nr = c;
	}
}
function cr(e) {
	var t = e.deps, n = Ot?.is_fork;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~te), s.v !== he && rt(s), s.ac !== null && ft(() => {
			s.ac.abort(fe), s.ac = null, nt(s, _);
		}), Tt(s), ur(s, 0);
	}
}
function ur(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) lr(e, n[r]);
}
function dr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		nt(e, g);
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
	await Promise.resolve(), zt();
}
function V(e) {
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
	if (Vn && Kt.has(e)) return Kt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || mr(a)) && (o = Ct(a)), Kt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Wn && Un !== null && (Bn || !!(Un.f & 512)), c = (a.f & x) === 0;
		ar(a) && (s && (a.f |= 512), wt(a)), s && !c && (Et(a), pr(a));
	}
	if (At?.has(e)) return At.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function pr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Et(t), pr(t));
}
function mr(e) {
	if (e.v === he) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Kt.has(t) || t.f & 2 && mr(t)) return !0;
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
	if (!Se) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Sr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Dr.call(t, e), !e.cancelBubble) return ft(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? $e(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Cr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Sr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		t.removeEventListener(e, o, a);
	});
}
function H(e, t, n) {
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
function U(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (Se) return jr(we, null), we;
		i === void 0 && (i = Ar(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ sn(i)));
		var t = r || tn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ sn(t), s = t.lastChild;
			jr(o, s);
		} else jr(t, t);
		return t;
	};
}
function Mr(e = "") {
	if (!Se) {
		var t = on(e + "");
		return jr(t, t), t;
	}
	var n = we;
	return n.nodeType === 3 ? fn(n) : (n.before(n = on()), Te(n)), jr(n, n), n;
}
function Nr() {
	if (Se) return jr(we, null), we;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = on();
	return e.append(t, n), jr(t, n), e;
}
function W(e, t) {
	if (Se) {
		var n = Kn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = we), Ee();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Pr(e) {
	let t = 0, n = Jt(0), r;
	return () => {
		vn() && (V(n), Tn(() => (t === 0 && (r = hr(() => e(() => Zt(n)))), t += 1, () => {
			$e(() => {
				--t, t === 0 && (r?.(), r = void 0, Zt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Fr = C | w;
function Ir(e, t, n, r) {
	new Lr(e, t, n, r);
}
var Lr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = Se ? we : null;
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
	#h = Pr(() => (this.#m = Jt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Kn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Kn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
			if (Se) {
				let e = this.#t;
				Ee();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, Fr), Se && (this.#e = we);
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
		$e(r), t && (this.#s = Dn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				xe();
				return;
			}
			t = !0, n && He(), this.#s !== null && Pn(this.#s, () => {
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
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), $e(() => {
			var e = this.#c = document.createDocumentFragment(), t = on(), n = !1;
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
				this.#c = null, n && this.#x(Ot);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#x(Ot));
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
			} else this.#x(Ot);
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
		var t = Kn, n = Un, r = Ge;
		qn(this.#i), Gn(this.#i), Ke(this.#i.ctx);
		try {
			return Rt.ensure(), e();
		} finally {
			qn(t), Gn(n), Ke(r);
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
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, $e(() => {
			this.#d = !1, this.#m && Xt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), V(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		Ot?.is_fork ? (this.#a && Ot.skip_effect(this.#a), this.#o && Ot.skip_effect(this.#o), this.#s && Ot.skip_effect(this.#s), Ot.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), Se && (Te(this.#t), De(), Te(Oe()));
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
		$e(() => {
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
function G(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ue] ??= e.nodeValue) && (e[ue] = n, e.nodeValue = `${n}`);
}
function zr(e, t) {
	return Vr(e, t);
}
var Br = /* @__PURE__ */ new Map();
function Vr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	an();
	var l = void 0, u = Sn(() => {
		var u = n ?? t.appendChild(on());
		Ir(u, { pending: () => {} }, (t) => {
			qe({});
			var n = Ge;
			if (o && (n.c = o), a && (i.$$events = a), Se && jr(t, null), Rr = s, l = e(t, i) || Ye(), Rr = !0, Se && (Kn.nodes.end = we, we === null || we.nodeType !== 8 || we.data !== "]")) throw be(), me;
			Je();
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
						Rn(r, t), t.append(on()), this.#n.set(e, {
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
		var n = Ot, r = un();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = on();
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
		} else Se && (this.anchor = we), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function K(e, t, n = !1) {
	var r;
	Se && (r = we, Ee());
	var i = new Ur(e), a = n ? C : 0;
	function o(e, t) {
		if (Se) {
			var n = ke(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Oe();
				Te(a), i.anchor = a, Ce(!1), i.ensure(e, t), Ce(!0);
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
			ln(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= ee, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var qr;
function Jr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Se ? Te(/* @__PURE__ */ sn(u)) : u.appendChild(on());
	}
	Se && Ee();
	var d = null, f = /* @__PURE__ */ xt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Xr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, Qr(d, null, c)) : In(d) : Pn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: En(() => {
			p = V(f);
			var e = p.length;
			let t = !1;
			Se && ke(c) === "[!" != (e === 0) && (c = Oe(), Te(c), Ce(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Ot, v = un(), y = 0; y < e; y += 1) {
				Se && we.nodeType === 8 && we.data === "]" && (c = we, t = !0, Ce(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && u.unskip_effect(S.e)) : (S = Zr(l, h ? c : qr ??= on(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(qr ??= on())), d.f |= ee)), e > r.size && Pe("", "", ""), Se && e > 0 && Te(Oe()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Ce(!0), V(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Se && (c = we);
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
			if (_.f ^= ee, _ === l) Qr(_, null, n);
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
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Qr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					$r(e, S.prev, C.next), $r(e, d, S), $r(e, C, b), l = b, d = C, --v, p = [], m = [];
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
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Yr(l.next);
		var T = w.length;
		if (T > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Gr(e, w, te);
		}
	}
	o && $e(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Zr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Jt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? Jt(i) : null;
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
		var o = /* @__PURE__ */ cn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function $r(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function q(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Se && (o = Te(/* @__PURE__ */ sn(c)));
	}
	B(() => {
		var e = Kn;
		if (s === (s = t() ?? "")) {
			Se && Ee();
			return;
		}
		if (n && !Se) {
			e.nodes = null, c.innerHTML = s, s !== "" && jr(/* @__PURE__ */ sn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Se) {
				for (var a = we.data, l = Ee(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ cn(l);
				if (l === null) throw be(), me;
				jr(we, u), o = Te(l);
				return;
			}
			var d = dn(r ? "svg" : i ? "math" : "template", r ? _e : i ? ve : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (jr(/* @__PURE__ */ sn(f), f.lastChild), r || i) for (; /* @__PURE__ */ sn(f);) o.before(/* @__PURE__ */ sn(f));
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
	}, C);
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
	ft(() => {
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
		return ft(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
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
		return $e(() => {
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
	return $e(() => {
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
function J(e, t, n, r, i, a) {
	var o = e[ce];
	if (Se || o !== n || o === void 0) {
		var s = fi(n, r, a);
		(!Se || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ce] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function gi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function _i(e, t, n, r) {
	var i = e[le];
	if (Se || i !== t) {
		var a = hi(t, r);
		(!Se || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[le] = t;
	} else r && (Array.isArray(r) ? (gi(e, n?.[0], r[0]), gi(e, n?.[1], r[1], "important")) : gi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var vi = Symbol("is custom element"), yi = Symbol("is html"), bi = pe ? "link" : "LINK", xi = pe ? "progress" : "PROGRESS";
function Y(e) {
	if (Se) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Z(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Z(e, "checked", null), e.checked = r;
				}
			}
		};
		e[de] = n, $e(n), dt();
	}
}
function X(e, t) {
	var n = Ci(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === xi) && (e.value = t ?? "");
}
function Si(e, t) {
	var n = Ci(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Z(e, t, n, r) {
	var i = Ci(e);
	Se && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === bi) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ti(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ci(e) {
	return e[se] ??= {
		[vi]: e.nodeName.includes("-"),
		[yi]: e.namespaceURI === ge
	};
}
var wi = /* @__PURE__ */ new Map();
function Ti(e) {
	var t = e.getAttribute("is") || e.nodeName, n = wi.get(t);
	if (n) return n;
	wi.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.add(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Ei(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	pt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Di(e) ? Oi(a) : a, n(a), Ot !== null && r.add(Ot), await fr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Se && e.defaultValue !== e.value || hr(t) == null && e.value) && (n(Di(e) ? Oi(e.value) : e.value), Ot !== null && r.add(Ot)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Ot;
			if (r.has(i)) return;
		}
		Di(e) && n === Oi(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Di(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Oi(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ki(e, t) {
	return e === t || e?.[D] === t;
}
function Ai(e = Ye(), t, n, r) {
	var i = Ge.r, a = Kn;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], hr(() => {
				ki(n(...s), e) || (t(e, ...s), o && ki(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ki(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function ji(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ vt(r), V(u)) : (l && (l = !1, c = s ? hr(r) : r), c);
	let f;
	if (o) {
		var p = D in e || ae in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = st(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ze(t), f(m)));
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
	var v = !1, y = (n & 1 ? vt : xt)(() => (v = !1, g()));
	o && V(y);
	var b = Kn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? V(y) : i && o ? $t(e) : e;
			return P(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : V(y);
	});
}
var Mi = {
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
}, Ni = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Pi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, Fi = {
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
function Ii(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(Fi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Li(e) {
	return Ni.includes(String(e ?? ""));
}
function Ri(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages must be a list"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: every entry must be an object");
			continue;
		}
		let e = String(n.code ?? "");
		Pi.test(e) ? Li(e) && t.push(`languages: '${e}' is built into Urd and cannot be overridden`) : t.push(`languages: '${e}' is not a valid language code`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name is missing (the language's own name)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} must be a boolean`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: must cover site, admin or both`);
	}
	return t;
}
function zi(e) {
	let t = Ii(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Pi.test(n) ? n : "nb";
}
async function Bi(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...Mi.strings });
var Vi = {
	lang: "nb",
	dict: {}
};
function Hi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Q(e, t) {
	return Hi(Vi.dict[e] ?? e, t);
}
function Ui(e) {
	let t = `api.${e?.code}`;
	return e?.code && Vi.dict[t] !== void 0 ? Hi(Vi.dict[t], e) : e?.error ?? null;
}
function Wi() {
	return Vi.lang;
}
function Gi() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return zi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Ii(e);
		if (t) return t;
	}
	return "en-GB";
}
var Ki;
new Promise((e) => {
	Ki = e;
});
async function qi(e = Gi()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Vi.lang = zi(e);
	let n = Li(Vi.lang);
	try {
		Object.assign(Vi.dict, await t("nb")), n && Vi.lang !== "nb" && Object.assign(Vi.dict, await t(Vi.lang));
	} catch {}
	if (!n) {
		let e = await Bi(Vi.lang, "admin");
		e ? Object.assign(Vi.dict, e) : Vi.lang = "nb";
	}
	return Ki(Vi.lang), Vi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function Ji(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function Yi(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function Xi(e, { delay: t = 0, duration: n = 400, easing: r = Ji, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = Yi(i), [p, m] = Yi(a);
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
function Zi(e, t, n, r) {
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
function Qi(e = globalThis) {
	let t = e?.HTMLElement?.prototype, n = e?.CSS;
	return !!(t && "popover" in t && typeof t.showPopover == "function" && typeof n?.supports == "function" && n.supports("anchor-name: --urd") && n.supports("position-try-fallbacks: flip-block"));
}
var $i = 0;
function ea(e = "urd-pop") {
	return $i += 1, `--${e}-${$i}`;
}
function ta(e, t) {
	let n = e?.closest?.(".panel-body, .block-menu-body");
	n && (t ? n.style.setProperty("anchor-name", "--urd-pane") : n.style.removeProperty("anchor-name"));
}
//#endregion
//#region src/lib/ColorPicker.svelte
var na = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), ra = /* @__PURE__ */ U("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), ia = /* @__PURE__ */ U("<button type=\"button\"></button>"), aa = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), oa = /* @__PURE__ */ U("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), sa = /* @__PURE__ */ U("<span class=\"cp-tokens svelte-zxiloo\"></span>"), ca = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), la = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ua = /* @__PURE__ */ U("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), da = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), fa = /* @__PURE__ */ U("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), pa = /* @__PURE__ */ U("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), ma = /* @__PURE__ */ U("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function ha(e, t) {
	qe(t, !0);
	let n = (e) => {
		var t = ua(), n = L(t), a = R(n), o = z(n, 2);
		Y(o);
		var s = z(o, 2);
		Y(s);
		var c = z(s, 2), l = I(c), u = z(l, 2);
		Y(u);
		var d = z(u, 2), f = (e) => {
			var t = na();
			B((e) => Z(t, "title", e), [() => Q("cp.eyedropper")]), H("click", t, ye), W(e, t);
		};
		K(d, (e) => {
			ve && e(f);
		}), O(c);
		var p = z(c, 2);
		Jr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = ra();
			Y(r), B((e) => {
				Z(r, "title", t), X(r, e);
			}, [() => ge(V(n))]), H("change", r, (e) => _e(V(n), e.target.value)), W(e, r);
		}), O(p);
		var v = z(p, 2), y = (e) => {
			var t = aa(), n = L(t), a = I(n, !0), o = z(a), s = (e) => {
				var t = Mr();
				B((e) => G(t, e), [() => Q("cp.linkedSuffix", { token: m() })]), W(e, t);
			}, c = /* @__PURE__ */ j(() => m());
			K(o, (e) => {
				V(c) && e(s);
			}), O(n);
			var l = z(n, 2);
			Jr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = ia();
				let s;
				B((e) => {
					s = J(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), _i(o, `background: ${a() ?? ""}`), Z(o, "title", e);
				}, [() => Q("cp.tokenTitle", { name: i() })]), H("click", o, () => pe(i(), a())), W(e, o);
			}), O(l), B((e) => G(a, e), [() => Q("cp.themeColors")]), W(e, t);
		};
		K(v, (e) => {
			i().length && e(y);
		});
		var b = z(v, 2), x = I(b), S = z(x);
		O(b);
		var ne = z(b, 2), re = (e) => {
			var t = sa();
			Jr(t, 20, () => V(_), (e) => e, (e, t) => {
				var n = oa(), r = I(n), i = z(r, 2);
				O(n), B((e) => {
					_i(r, `background: ${t ?? ""}`), Z(r, "title", t), Z(i, "title", e);
				}, [() => Q("cp.removeSaved")]), H("click", r, () => be(t)), H("click", i, () => Se(t)), W(e, n);
			}), O(t), W(e, t);
		};
		K(ne, (e) => {
			V(_).length && e(re);
		});
		var E = z(ne, 2), D = (e) => {
			var t = la(), n = L(t), r = R(n, !0), i = z(n, 2);
			Jr(i, 20, () => V(g), (e) => e, (e, t) => {
				var n = ca();
				B(() => {
					_i(n, `background: ${t ?? ""}`), Z(n, "title", t);
				}), H("click", n, () => be(t)), W(e, n);
			}), O(i), B((e) => G(r, e), [() => Q("common.recent")]), W(e, t);
		};
		K(E, (e) => {
			V(g).length && e(D);
		}), B((e, t, r, i, c) => {
			_i(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${V(C) ?? ""}, 100%, 50%)`), _i(a, `left: ${V(w) * 100}%; top: ${(1 - V(T)) * 100}%`), X(o, V(C)), X(s, e), Z(s, "title", t), _i(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), _i(l, `background: ${V(te) ?? ""}`), X(u, V(te)), G(x, `${i ?? ""} `), Z(S, "title", c);
		}, [
			() => Math.round(V(ee) * 100),
			() => Q("cp.alpha"),
			() => ie(),
			() => Q("cp.saved"),
			() => Q("cp.saveTitle")
		]), H("pointerdown", n, me), H("input", o, (e) => {
			P(C, Number(e.target.value), !0), oe();
		}), H("input", s, (e) => {
			P(ee, Number(e.target.value) / 100), oe();
		}), H("change", u, he), H("click", S, xe), W(e, t);
	}, r = ji(t, "value", 3, "#000000"), i = ji(t, "tokens", 19, () => []), a = ji(t, "label", 19, () => Q("cp.pickColor")), o = ji(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = Qi(), u = ea("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ N(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ N($t([])), _ = /* @__PURE__ */ N($t([])), v = "", y = "", b = /* @__PURE__ */ N(null), x = /* @__PURE__ */ N(!1), S = /* @__PURE__ */ N($t({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ N(0), w = /* @__PURE__ */ N(0), T = /* @__PURE__ */ N(1), ee = /* @__PURE__ */ N(1), te = /* @__PURE__ */ N("#000000");
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
	function E(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function D(e, t, n) {
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
	function ie() {
		return re(...D(V(C), V(w), V(T)));
	}
	function ae() {
		let e = ie();
		return V(ee) >= .995 ? e : e + Math.round(V(ee) * 255).toString(16).padStart(2, "0");
	}
	function oe() {
		P(te, ae(), !0), y = V(te), t.onchange?.(V(te));
	}
	function se(e) {
		let t = ne(e);
		return t ? (((e) => {
			var t = h(e, 3);
			P(C, t[0], !0), P(w, t[1], !0), P(T, t[2], !0);
		})(E(t[0], t[1], t[2])), P(ee, t[3], !0), P(te, ae(), !0), !0) : !1;
	}
	function ce() {
		se(p()) || se("#000000"), v = r(), y = "";
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
	function le(e) {
		e.newState === "open" ? (ce(), ta(V(b), !0), P(x, !0)) : V(x) && (ta(V(b), !1), P(x, !1), de());
	}
	function ue() {
		ce();
		let e = V(b).getBoundingClientRect(), t = V(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(S, {
			top: i,
			left: r
		}, !0), P(x, !0);
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
		P(x, !1), de();
	}
	function pe(e, n) {
		se(n), P(te, n, !0), t.onchange?.(e);
	}
	function me(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			P(w, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), P(T, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), oe();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function he(e) {
		se(e.target.value) ? oe() : P(te, ie(), !0);
	}
	function ge(e) {
		return (ne(ie()) ?? [
			0,
			0,
			0
		])[e];
	}
	function _e(e, t) {
		let n = ne(ie()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			P(C, t[0], !0), P(w, t[1], !0), P(T, t[2], !0);
		})(E(...n)), oe();
	}
	let ve = typeof window < "u" && "EyeDropper" in window;
	async function ye() {
		try {
			se((await new window.EyeDropper().open()).sRGBHex) && oe();
		} catch {}
	}
	function be(e) {
		se(e) && oe();
	}
	function xe() {
		let e = ae();
		V(_).includes(e) || (P(_, [e, ...V(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(We(V(_)))));
	}
	function Se(e) {
		P(_, V(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(We(V(_))));
	}
	bn(() => {
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
	var Ce = ma(), we = I(Ce);
	let Te;
	var Ee = z(we, 2), De = (e) => {
		var n = da();
		B((e, t) => {
			Z(n, "title", e), Z(n, "aria-label", t);
		}, [() => Q("cp.clearTitle"), () => Q("cp.clear")]), H("click", n, () => t.onchange?.("")), W(e, n);
	};
	K(Ee, (e) => {
		o() && r() && e(De);
	});
	var Oe = z(Ee, 2), ke = (e) => {
		var t = fa(), r = I(t), i = (e) => {
			n(e);
		};
		K(r, (e) => {
			V(x) && e(i);
		}), O(t), Ai(t, (e) => P(f, e), () => V(f)), B(() => {
			Z(t, "id", d), _i(t, `position-anchor: ${u ?? ""}`);
		}), Cr("toggle", t, le), H("click", t, (e) => e.preventDefault()), W(e, t);
	}, Ae = (e) => {
		var t = pa(), r = I(t);
		n(r), O(t), B(() => _i(t, `top: ${V(S).top ?? ""}px; left: ${V(S).left ?? ""}px`)), H("click", t, (e) => e.preventDefault()), W(e, t);
	};
	K(Oe, (e) => {
		l ? e(ke) : V(x) && e(Ae, 1);
	}), O(Ce), Ai(Ce, (e) => P(b, e), () => V(b)), B((e, t, n) => {
		Te = J(we, 1, "cp-swatch svelte-zxiloo", null, Te, {
			linked: e,
			"cp-empty": o() && !r()
		}), _i(we, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), Z(we, "title", n), Z(we, "popovertarget", l ? d : void 0), Z(we, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? Q("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), H("click", we, function(...e) {
		(l ? void 0 : () => V(x) ? fe() : ue())?.apply(this, e);
	}), W(e, Ce), Je();
}
wr([
	"pointerdown",
	"input",
	"change",
	"click"
]);
//#endregion
//#region ../template/assets/engine/0.7.4/imageTools.js
var ga = 1600, _a = .82, va = .6, ya = 15e6;
async function ba(e, t = ga) {
	if (Sa(e)) return Ca(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(_a);
	return c.size > 4e5 && (c = await s(va)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var xa = "image/svg+xml";
function Sa(e) {
	return e.type === xa || /\.svg$/i.test(e.name || "");
}
function Ca(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Invalid SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("The SVG contains scripts or event handlers and cannot be used");
	let n = new Blob([t]).size, r = `data:${xa};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function wa(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ta(e) {
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
function Ea(e) {
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
function Da(e, t = "image") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function Oa(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.7.4/glyphs.js
var ka = "urd-recent-glyphs", Aa = "urd-recent-icons", ja = [
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
function Ma(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
var Na = (e) => {
	try {
		let t = JSON.parse(localStorage.getItem(e) ?? "[]");
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}, Pa = (e, t, n) => {
	let r = Ma(t, n);
	try {
		localStorage.setItem(e, JSON.stringify(r));
	} catch {}
	return r;
};
function Fa() {
	return Na(ka);
}
function Ia(e) {
	return Pa(ka, Fa(), e);
}
function La() {
	return Na(Aa);
}
function Ra(e) {
	return Pa(Aa, La(), e);
}
//#endregion
//#region ../template/assets/engine/0.7.4/icons.js
var za = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Ba = "fill=\"currentColor\" stroke=\"none\"", Va = {
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
}, Ha = [
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
function Ua(e) {
	let t = typeof e == "string" ? Va[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Ba : za} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Wa = /* @__PURE__ */ U("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Ga = /* @__PURE__ */ U("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Ka = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), qa = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ja = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Ya = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), Xa = /* @__PURE__ */ U("<!> <!> <!> <!>", 1), Za = /* @__PURE__ */ U("<img class=\"gp-own svelte-15ln1c3\"/>"), Qa = /* @__PURE__ */ U("<span class=\"gp-svg svelte-15ln1c3\"></span>"), $a = /* @__PURE__ */ U("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), eo = /* @__PURE__ */ U("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), to = /* @__PURE__ */ U("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function no(e, t) {
	qe(t, !0);
	let n = (e) => {
		var n = Xa(), a = L(n), o = (e) => {
			var t = Ka(), n = L(t), r = R(n, !0), a = z(n, 2), o = I(a);
			Jr(o, 16, () => V(d), (e) => e, (e, t) => {
				var n = Wa();
				let r;
				var a = I(n);
				q(a, () => Ua(t), !0), O(a), O(n), B((e) => {
					r = J(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), Z(n, "title", e);
				}, [() => Q(Va[t].labelKey)]), H("click", n, () => C(t)), W(e, n);
			}), Jr(z(o, 2), 16, () => V(u), (e) => e, (e, t) => {
				var n = Ga(), r = R(n, !0);
				B(() => G(r, t)), H("click", n, () => S(t)), W(e, n);
			}), O(a), B((e) => G(r, e), [() => Q("common.recent")]), W(e, t);
		};
		K(a, (e) => {
			(V(u).length || V(d).length) && e(o);
		});
		var s = z(a, 2), c = (e) => {
			var t = Nr();
			Jr(L(t), 17, () => Ha, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(V(t), 2));
				let r = () => V(n)[0], a = () => V(n)[1];
				var o = qa(), s = L(o), c = R(s, !0), l = z(s, 2);
				Jr(l, 20, a, (e) => e, (e, t) => {
					var n = Wa();
					let r;
					var a = I(n);
					q(a, () => Ua(t), !0), O(a), O(n), B((e) => {
						r = J(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), Z(n, "title", e);
					}, [() => Q(Va[t].labelKey)]), H("click", n, () => C(t)), W(e, n);
				}), O(l), B((e) => G(c, e), [() => Q(r())]), W(e, o);
			}), W(e, t);
		};
		K(s, (e) => {
			t.onicon && e(c);
		});
		var l = z(s, 2);
		Jr(l, 17, () => ja, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ j(() => h(V(t), 2));
			let i = () => V(n)[0], a = () => V(n)[1];
			var o = qa(), s = L(o), c = R(s, !0), l = z(s, 2);
			Jr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = Ja();
				let i;
				var a = R(n, !0);
				B(() => {
					i = J(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), G(a, t);
				}), H("click", n, () => S(t)), W(e, n);
			}), O(l), B((e) => G(c, e), [() => Q(i())]), W(e, o);
		});
		var f = z(l, 2), p = (e) => {
			var t = Ya(), n = L(t), r = R(n, !0), i = z(n, 2), a = R(i, !0), o = z(i, 2);
			Ai(o, (e) => P(m, e), () => V(m));
			var s = R(z(o, 2), !0);
			B((e, t, n) => {
				G(r, e), G(a, t), G(s, n);
			}, [
				() => Q("gp.ownIcon"),
				() => Q("gp.upload"),
				() => Q("gp.uploadHint")
			]), H("click", i, () => V(m).click()), H("change", o, w), W(e, t);
		};
		K(f, (e) => {
			t.onimage && e(p);
		}), W(e, n);
	}, r = ji(t, "value", 3, "★"), i = ji(t, "icon", 3, null), a = ji(t, "image", 3, null), o = ji(t, "label", 19, () => Q("gp.pickGlyph")), s = Qi(), c = ea("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ N($t([])), d = /* @__PURE__ */ N($t([])), f = /* @__PURE__ */ N(null), p = /* @__PURE__ */ N(null), m = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(!1), _ = /* @__PURE__ */ N($t({
		top: 0,
		left: 0
	}));
	function v() {
		P(u, Fa(), !0), P(d, t.onicon ? La().filter((e) => Va[e]) : [], !0);
	}
	function y(e) {
		P(g, e.newState === "open"), ta(V(f), V(g)), V(g) && v();
	}
	function b() {
		s && V(p)?.hidePopover(), P(g, !1);
	}
	function x() {
		v();
		let e = V(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		P(_, {
			top: n,
			left: t
		}, !0), P(g, !0);
	}
	function S(e) {
		Ia(e), t.onpick?.(e), b();
	}
	function C(e) {
		Ra(e), t.onicon?.(e), b();
	}
	async function w(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ba(n, 256);
		t.onimage?.(r.dataUrl), b();
	}
	bn(() => {
		if (!V(g)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(f) && !V(f).contains(e.target) && P(g, !1);
		}, n = (e) => {
			e.key === "Escape" && P(g, !1);
		}, r = (e) => {
			V(f) && e.target instanceof Node && !V(f).contains(e.target) && P(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var T = to(), ee = I(T), te = I(ee), ne = (e) => {
		var t = Za();
		B((e) => {
			Z(t, "src", a()), Z(t, "alt", e);
		}, [() => Q("gp.ownIcon")]), W(e, t);
	}, re = (e) => {
		var t = Qa();
		q(t, () => Ua(i()), !0), O(t), W(e, t);
	}, E = (e) => {
		var t = Mr();
		B(() => G(t, r() || "★")), W(e, t);
	};
	K(te, (e) => {
		a() ? e(ne) : i() && Va[i()] ? e(re, 1) : e(E, -1);
	}), O(ee);
	var D = z(ee, 2), ie = (e) => {
		var t = $a(), r = I(t), i = (e) => {
			n(e);
		};
		K(r, (e) => {
			V(g) && e(i);
		}), O(t), Ai(t, (e) => P(p, e), () => V(p)), B(() => {
			Z(t, "id", l), _i(t, `position-anchor: ${c ?? ""}`);
		}), Cr("toggle", t, y), W(e, t);
	}, ae = (e) => {
		var t = eo(), r = I(t);
		n(r), O(t), B(() => _i(t, `top: ${V(_).top ?? ""}px; left: ${V(_).left ?? ""}px`)), W(e, t);
	};
	K(D, (e) => {
		s ? e(ie) : V(g) && e(ae, 1);
	}), O(T), Ai(T, (e) => P(f, e), () => V(f)), B(() => {
		Z(ee, "title", o()), Z(ee, "aria-label", o()), Z(ee, "popovertarget", s ? l : void 0), _i(ee, s ? `anchor-name: ${c}` : void 0);
	}), H("click", ee, function(...e) {
		(s ? void 0 : () => V(g) ? P(g, !1) : x())?.apply(this, e);
	}), W(e, T), Je();
}
wr(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var ro = /* @__PURE__ */ U("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), io = /* @__PURE__ */ U("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), ao = /* @__PURE__ */ U("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), oo = /* @__PURE__ */ U("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), so = /* @__PURE__ */ U("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), co = /* @__PURE__ */ U("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div> <input type=\"file\" accept=\"image/*\" hidden=\"\"/>", 1), lo = /* @__PURE__ */ U("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div> <!>", 1), uo = /* @__PURE__ */ U("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), fo = /* @__PURE__ */ U("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), po = /* @__PURE__ */ U("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), mo = /* @__PURE__ */ U("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), ho = /* @__PURE__ */ U("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), go = /* @__PURE__ */ U("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!></span>");
function _o(e, t) {
	qe(t, !0);
	let n = (e) => {
		var t = lo(), n = L(t), a = I(n);
		let c;
		var l = R(a, !0), u = z(a, 2);
		let d;
		var f = I(u, !0), p = z(f), h = (e) => {
			var t = ro(), n = R(t, !0);
			B(() => G(n, V(x).length)), W(e, t);
		};
		K(p, (e) => {
			V(x).length && e(h);
		}), O(u), O(n);
		var v = z(n, 2), y = (e) => {
			var t = oo(), n = L(t);
			Y(n);
			var a = z(n, 2), o = I(a), c = I(o);
			let l;
			Jr(z(c, 2), 17, () => V(b), ({ id: e }) => e, (e, t) => {
				let n = () => V(t).id;
				var a = io();
				let o;
				var s = I(a);
				q(s, () => Ua(n()), !0), O(s), O(a), B((e, t) => {
					o = J(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), Z(a, "title", e), Z(a, "aria-label", t);
				}, [() => Q(Va[n()].labelKey), () => Q(Va[n()].labelKey)]), H("click", a, () => ee(n())), W(e, a);
			}), O(o);
			var u = z(o, 2), d = (e) => {
				var t = ao(), n = R(t, !0);
				B((e) => G(n, e), [() => Q("mp.noHits")]), W(e, t);
			};
			K(u, (e) => {
				V(b).length || e(d);
			}), O(a), B((e, t) => {
				Z(n, "placeholder", e), Z(n, "aria-label", t), l = J(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), Z(c, "title", s()), Z(c, "aria-label", s());
			}, [() => Q("mp.search"), () => Q("mp.search")]), Ei(n, () => V(_), (e) => P(_, e)), H("click", c, ne), W(e, t);
		}, S = (e) => {
			var t = co(), n = L(t), r = I(n), a = I(r), o = R(z(I(a), 2), !0);
			O(a), Jr(z(a, 2), 16, () => V(x), (e) => e, (e, t) => {
				var n = so();
				let r;
				var a = R(n);
				B(() => {
					r = J(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), Z(a, "src", t);
				}), H("click", n, () => te(t)), W(e, n);
			}), O(r);
			var s = R(z(r, 2), !0);
			O(n);
			var c = z(n, 2);
			Ai(c, (e) => P(m, e), () => V(m)), B((e, t) => {
				G(o, e), G(s, t);
			}, [() => Q("mp.upload"), () => Q("mp.imagesHint")]), H("click", a, () => V(m).click()), H("change", c, re), W(e, t);
		};
		K(v, (e) => {
			V(g) === "icons" ? e(y) : e(S, -1);
		}), B((e, t) => {
			Z(n, "aria-label", o()), c = J(a, 1, "mp-tab svelte-1y5ipgc", null, c, { on: V(g) === "icons" }), Z(a, "aria-pressed", V(g) === "icons"), G(l, e), d = J(u, 1, "mp-tab svelte-1y5ipgc", null, d, { on: V(g) === "images" }), Z(u, "aria-pressed", V(g) === "images"), G(f, t);
		}, [() => Q("mp.icons"), () => Q("mp.images")]), H("click", a, () => P(g, "icons")), H("click", u, () => P(g, "images")), W(e, t);
	}, r = ji(t, "icon", 3, ""), i = ji(t, "image", 3, ""), a = ji(t, "images", 19, () => []), o = ji(t, "label", 19, () => Q("mp.pickMark")), s = ji(t, "noneLabel", 19, () => Q("common.none")), c = ji(t, "klass", 3, ""), l = Qi(), u = ea("urd-mp"), d = u.slice(2), f = /* @__PURE__ */ N(null), p = /* @__PURE__ */ N(null), m = /* @__PURE__ */ N(null), h = /* @__PURE__ */ N(!1), g = /* @__PURE__ */ N("icons"), _ = /* @__PURE__ */ N(""), v = /* @__PURE__ */ N($t({
		top: 0,
		left: 0
	})), y = Ha.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), b = /* @__PURE__ */ j(() => {
		let e = V(_).trim().toLowerCase();
		return e ? y.filter(({ id: t }) => {
			let n = Q(Va[t].labelKey) || Va[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : y;
	}), x = /* @__PURE__ */ j(() => [...new Set(a().filter(Boolean))]);
	function S() {
		P(_, ""), P(g, i() ? "images" : "icons", !0);
	}
	function C(e) {
		P(h, e.newState === "open"), ta(V(f), V(h)), V(h) && S();
	}
	function w() {
		l && V(p)?.hidePopover(), P(h, !1);
	}
	function T() {
		S();
		let e = V(f).getBoundingClientRect();
		P(v, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), P(h, !0);
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
	function re(e) {
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	bn(() => {
		if (!V(h)) return;
		let e = () => w();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(f) && !V(f).contains(e.target) && P(h, !1);
		}, n = (e) => {
			e.key === "Escape" && P(h, !1);
		}, r = (e) => {
			V(f) && e.target instanceof Node && !V(f).contains(e.target) && P(h, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var E = go(), D = I(E), ie = I(D), ae = (e) => {
		var n = Nr();
		ei(L(n), () => t.children), W(e, n);
	}, oe = (e) => {
		var t = uo();
		B(() => Z(t, "src", i())), W(e, t);
	}, se = (e) => {
		var t = fo();
		q(t, () => Ua(r()), !0), O(t), W(e, t);
	}, ce = (e) => {
		W(e, po());
	};
	K(ie, (e) => {
		t.children ? e(ae) : i() ? e(oe, 1) : r() && Va[r()] ? e(se, 2) : e(ce, -1);
	}), O(D);
	var le = z(D, 2), ue = (e) => {
		var t = mo(), r = I(t), i = (e) => {
			n(e);
		};
		K(r, (e) => {
			V(h) && e(i);
		}), O(t), Ai(t, (e) => P(p, e), () => V(p)), B(() => {
			Z(t, "id", d), _i(t, `position-anchor: ${u ?? ""}`);
		}), Cr("toggle", t, C), W(e, t);
	}, de = (e) => {
		var t = ho(), r = I(t);
		n(r), O(t), B(() => _i(t, `top: ${V(v).top ?? ""}px; left: ${V(v).left ?? ""}px`)), W(e, t);
	};
	K(le, (e) => {
		l ? e(ue) : V(h) && e(de, 1);
	}), O(E), Ai(E, (e) => P(f, e), () => V(f)), B(() => {
		J(D, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), Z(D, "title", o()), Z(D, "aria-label", o()), Z(D, "popovertarget", l ? d : void 0), _i(D, l ? `anchor-name: ${u}` : void 0);
	}), H("click", D, function(...e) {
		(l ? void 0 : () => V(h) ? P(h, !1) : T())?.apply(this, e);
	}), W(e, E), Je();
}
wr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function vo(e, t = {}) {
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
function yo(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function bo(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? yo(r, i) : Infinity;
	return Math.max(.1, Math.min(1, yo(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function xo(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function So(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var Co = 3840, wo = 2400, To = (e, t, n) => Math.min(n, Math.max(t, e));
function Eo({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Do(e) {
	return !e || typeof e.innerWidth != "number" ? null : Eo({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function Oo(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = To(Number.isFinite(i) && i > 0 ? i : t, 640, Co), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? To(o, 480, wo) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function ko(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var Ao = 1920, jo = [
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
], Mo = [
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
], No = [
	1920,
	1536,
	1366
];
function Po(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Ao, Math.max(960, n));
}
function Fo(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function Io(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Lo(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Ro(e) {
	return Mo.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var zo = {
	min: 0,
	max: 64,
	step: 1
}, Bo = {
	min: 12,
	max: 28,
	step: 1
}, Vo = {
	min: 0,
	max: 80,
	step: 1
}, Ho = {
	min: 0,
	max: 64,
	step: 1
}, Uo = {
	min: 480,
	max: 1920,
	step: 20
}, Wo = {
	min: .3,
	max: .8,
	step: .05
}, Go = {
	min: 0,
	max: 400,
	step: 10
}, Ko = {
	min: 0,
	max: 1200,
	step: 20
}, qo = {
	min: 0,
	max: 64,
	step: 1
}, Jo = {
	min: 180,
	max: 400,
	step: 1
}, Yo = {
	min: 12,
	max: 128,
	step: 1
}, Xo = {
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
}, Zo = [
	"sm",
	"md",
	"lg",
	"xl"
], Qo = .67;
function $o(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function es(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function ts(e, t) {
	if (e?.padY != null && e.padY !== "") return es(e.padY, zo, Xo.md.padY);
	let n = Xo[e?.size] ?? Xo.md;
	return Math.round(n.padY * ($o(t) ? Qo : 1));
}
function ns(e) {
	if (e?.textSize != null && e.textSize !== "") return es(e.textSize, Bo, Xo.md.textSize);
	let t = Xo[e?.size] ?? Xo.md;
	return Math.round(t.textSize);
}
function rs(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : Zo.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var is = /* @__PURE__ */ U("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), as = /* @__PURE__ */ U("<button type=\"button\"> </button>"), os = /* @__PURE__ */ U("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), ss = /* @__PURE__ */ U("<div class=\"dd-pop svelte-vtocc6\"></div>"), cs = /* @__PURE__ */ U("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), ls = /* @__PURE__ */ U("<span class=\"dd svelte-vtocc6\"><!></span>");
function us(e, t) {
	qe(t, !0);
	let n = (e) => {
		var t = is();
		let n;
		B(() => n = J(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": V(f) })), W(e, t);
	}, r = ji(t, "value", 3, null), i = ji(t, "options", 19, () => []), a = ji(t, "title", 3, null), o = ji(t, "disabled", 3, !1), s = ji(t, "filled", 3, !1), c = ji(t, "compact", 3, !1), l = Qi(), u = ea("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ N(!1), p = /* @__PURE__ */ N(null), m = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N($t({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = V(p).getBoundingClientRect(), t = Math.min(320, i().length * 32 + 12), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		P(g, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		if (!o()) {
			if (V(f)) {
				P(f, !1);
				return;
			}
			v(), P(f, !0);
		}
	}
	function b(e) {
		l && V(m)?.hidePopover(), P(f, !1), t.onchange?.(e);
	}
	bn(() => {
		if (!V(f)) return;
		let e = () => {
			l ? V(m)?.hidePopover() : P(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			V(p) && !V(p).contains(e.target) && P(f, !1);
		}, n = (e) => {
			e.key === "Escape" && P(f, !1);
		}, r = (e) => {
			V(p) && e.target instanceof Node && !V(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = ls(), S = I(x), C = (e) => {
		var t = os(), l = L(t);
		let p;
		var g = I(l), v = R(g, !0), y = z(g, 2);
		n(y), O(l);
		var x = z(l, 2), S = I(x), C = (e) => {
			var t = Nr();
			Jr(L(t), 17, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = as();
				let s;
				var c = R(o, !0);
				B(() => {
					s = J(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), G(c, a());
				}), H("click", o, () => b(i())), W(e, o);
			}), W(e, t);
		};
		K(S, (e) => {
			V(f) && e(C);
		}), O(x), Ai(x, (e) => P(m, e), () => V(m)), B((e) => {
			p = J(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), Z(l, "title", a()), l.disabled = o(), Z(l, "popovertarget", d), _i(l, `anchor-name: ${u ?? ""}`), G(v, e), Z(x, "id", d), _i(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), Cr("toggle", x, (e) => {
			P(f, e.newState === "open");
		}), W(e, t);
	}, w = (e) => {
		var t = cs(), l = L(t);
		let u;
		var d = I(l), p = R(d, !0), m = z(d, 2);
		n(m), O(l);
		var v = z(l, 2), x = (e) => {
			var t = ss();
			Jr(t, 21, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ j(() => h(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = as();
				let s;
				var c = R(o, !0);
				B(() => {
					s = J(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), G(c, a());
				}), H("click", o, () => b(i())), W(e, o);
			}), O(t), B(() => _i(t, `top: ${V(g).top ?? ""}px; left: ${V(g).left ?? ""}px; min-width: ${V(g).width ?? ""}px`)), W(e, t);
		};
		K(v, (e) => {
			V(f) && e(x);
		}), B((e) => {
			u = J(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), Z(l, "title", a()), l.disabled = o(), G(p, e);
		}, [() => _()]), H("click", l, y), W(e, t);
	};
	K(S, (e) => {
		l ? e(C) : e(w, -1);
	}), O(x), Ai(x, (e) => P(p, e), () => V(p)), W(e, x), Je();
}
wr(["click"]);
//#endregion
//#region src/lib/Choice.svelte
var ds = /* @__PURE__ */ U("<button type=\"button\"> </button>"), fs = /* @__PURE__ */ U("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function ps(e, t) {
	qe(t, !0);
	let n = ji(t, "title", 3, void 0), r = /* @__PURE__ */ j(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 20), i = (e) => `${e ?? ""}`;
	var a = fs();
	let o;
	var s = I(a), c = R(s, !0), l = z(s, 2);
	Jr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ j(() => h(V(n), 2));
		let a = () => V(r)[0], o = () => V(r)[1];
		var s = ds();
		let c;
		var l = R(s, !0);
		B((e, t) => {
			Z(s, "aria-pressed", e), c = J(s, 1, "svelte-1ehof1c", null, c, { on: t }), G(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), H("click", s, () => t.onchange(a())), W(e, s);
	}), O(l), O(a), B(() => {
		o = J(a, 1, "choice svelte-1ehof1c", null, o, { stacked: V(r) }), Z(a, "title", n()), G(c, t.label), Z(l, "aria-label", t.label);
	}), W(e, a), Je();
}
wr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ms = /* @__PURE__ */ U("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function hs(e, t) {
	qe(t, !0);
	let n = ji(t, "image", 3, ""), r = /* @__PURE__ */ N(null), i = /* @__PURE__ */ N(null), a = /* @__PURE__ */ N(1), o = /* @__PURE__ */ N(.5), s = /* @__PURE__ */ N(.5), c = /* @__PURE__ */ N(1), l = /* @__PURE__ */ N(1), u = /* @__PURE__ */ N(1);
	bn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			P(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !V(i)) return;
		e.filter = `brightness(${V(c)}) contrast(${V(l)}) saturate(${V(u)})`;
		let n = Math.max(t / V(i).width, t / V(i).height) * V(a), r = V(i).width * n, d = V(i).height * n, f = t / 2 - V(o) * r, p = t / 2 - V(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(V(i), f, p, r, d), e.filter = "none";
	}
	bn(() => {
		V(i), V(a), V(o), V(s), V(c), V(l), V(u), V(r) && d(V(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!V(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / V(i).width, 220 / V(i).height) * V(a), c = V(i).width * r, l = V(i).height * r, u = (e) => {
			P(o, Math.min(1, Math.max(0, V(o) - (e.clientX - t) / c)), !0), P(s, Math.min(1, Math.max(0, V(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = ms(), g = I(h), _ = I(g), v = R(_, !0), y = z(_, 2), b = I(y);
	Z(b, "width", 220), Z(b, "height", 220), Ai(b, (e) => P(r, e), () => V(r));
	var x = R(z(b, 2), !0);
	O(y);
	var S = z(y, 2), C = I(S), w = R(z(C));
	O(S);
	var T = z(S, 2);
	Y(T);
	var ee = z(T, 2), te = I(ee), ne = R(z(te));
	O(ee);
	var re = z(ee, 2);
	Y(re);
	var E = z(re, 2), D = I(E), ie = R(z(D));
	O(E);
	var ae = z(E, 2);
	Y(ae);
	var oe = z(ae, 2), se = I(oe), ce = R(z(se));
	O(oe);
	var le = z(oe, 2);
	Y(le);
	var ue = z(le, 2), de = I(ue), fe = R(de, !0), pe = z(de, 2), me = R(pe, !0);
	O(ue);
	var he = z(ue, 2), ge = I(he), _e = R(ge, !0), ve = z(ge, 2), ye = R(ve, !0);
	O(he), O(g), O(h), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		G(v, e), Z(b, "title", t), G(x, n), G(C, `${r ?? ""} `), G(w, `${i ?? ""}x`), G(te, `${a ?? ""} `), G(ne, `${o ?? ""}%`), G(D, `${s ?? ""} `), G(ie, `${c ?? ""}%`), G(se, `${l ?? ""} `), G(ce, `${u ?? ""}%`), G(fe, d), G(me, f), G(_e, p), G(ye, m);
	}, [
		() => Q("ie.title"),
		() => Q("ie.dragTip"),
		() => Q("ie.hint"),
		() => Q("lbl.zoom"),
		() => V(a).toFixed(2),
		() => Q("lbl.brightness"),
		() => Math.round(V(c) * 100),
		() => Q("lbl.contrast"),
		() => Math.round(V(l) * 100),
		() => Q("lbl.saturate"),
		() => Math.round(V(u) * 100),
		() => Q("ie.grayscale"),
		() => Q("common.reset"),
		() => Q("confirm.cancel"),
		() => Q("common.apply")
	]), H("pointerdown", b, f), Ei(T, () => V(a), (e) => P(a, e)), Ei(re, () => V(c), (e) => P(c, e)), Ei(ae, () => V(l), (e) => P(l, e)), Ei(le, () => V(u), (e) => P(u, e)), H("click", de, () => P(u, 0)), H("click", pe, p), H("click", ge, () => t.oncancel?.()), H("click", ve, m), W(e, h), Je();
}
wr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var gs = () => [
	{
		id: "navn",
		label: Q("form.fieldName"),
		type: "text",
		required: !0
	},
	{
		id: "epost",
		label: Q("form.fieldEmail"),
		type: "email",
		required: !0
	},
	{
		id: "melding",
		label: Q("form.fieldMessage"),
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
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...Ri(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
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
		alt: Q("seed.imageAlt"),
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
		submitLabel: Q("form.sendDefault"),
		successText: Q("form.thanksDefault"),
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
			Is($(8.33, 40, 50, 38), Q("seed.hero.title")),
			Is($(8.33, 84, 41.67, 26), Q("seed.hero.intro")),
			Rs($(8.33, 118, 20, 32), Q("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => oc("hero-centered", "60vh", $s(ec("bg")), [
			Is($(15, 64, 70, 44), Q("seed.heroCenter.title"), { align: "center" }),
			Is($(25, 116, 50, 26), Q("seed.heroCenter.intro"), { align: "center" }),
			Rs($(31.5, 160, 17, 40), Q("seed.join")),
			Rs($(51.5, 160, 17, 40), Q("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("images", {
		label: "Images",
		labelKey: "preset.images.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Title and three image frames",
		hintKey: "preset.images.hint",
		create: () => oc("images", "360px", $s(ec("bg")), [
			Is($(4, 24, 50, 32), Q("seed.images.title")),
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
		create: () => oc("gallery", "440px", $s(ec("bg")), [Is($(4, 24, 50, 32), Q("seed.gallery.title")), Js($(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => oc("find-us", "480px", $s(ec("bg")), [Is($(6, 40, 60, 70), Q("seed.findUs.title")), Bs($(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => oc("whats-on", "520px", $s(ec("bg")), [Is($(6, 40, 60, 70), Q("seed.whatsOn.title")), Hs($(6, 130, 88, 320, 2), { limit: 5 })])
	}), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => oc("contact-form", "520px", $s(ec("bg")), [Is($(6, 40, 60, 120), Q("seed.contactForm.intro")), Vs($(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => oc("contact", "320px", $s(ec("surface"), tc(.2, .8, .2)), [
			Is($(10, 32, 40, 36), Q("seed.contact.title")),
			Is($(10, 84, 36, 130), Q("seed.contact.info"), { box: !0 }),
			Rs($(60, 100, 22, 40), Q("seed.contact.button"), { href: `mailto:${Q("seed.email")}` })
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
				let i = zs($(e + 10.5, 88, 4, 52), n), a = Is($(e, 152, 25, 200), Q("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = Us(), i.mobileOrder = ac(88, t, 0), a.mobileOrder = ac(88, t, 1), [i, a];
			};
			return oc("feature-cards", "420px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Q("seed.features.title")),
				...e(6, 0, "✦", Q("seed.features.card1")),
				...e(37.5, 1, "★", Q("seed.features.card2")),
				...e(69, 2, "✓", Q("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = zs($(t + 10.5, n - 64, 4, 52), "✦"), a = Is($(t, n, 25, 200), Q("seed.features.card", { title: Q("seed.features.newTitle") }), {
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
				let r = Is($(e, 88, 25, 200), Q("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = Us(), r.mobileOrder = ac(88, t, 0), r;
			};
			return oc("feature-cards-simple", "360px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Q("seed.features.title")),
				e(6, 0, Q("seed.features.card1")),
				e(37.5, 1, Q("seed.features.card2")),
				e(69, 2, Q("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 88, 232, 25, 200), i = Is($(t, n, 25, 200), Q("seed.features.card", { title: Q("seed.features.newTitle") }), {
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
				let n = Ls($(e, 88, 25, 160)), r = Is($(e, 256, 25, 160), Q("seed.news.card"));
				return n.mobileOrder = ac(88, t, 0), r.mobileOrder = ac(88, t, 1), [n, r];
			};
			return oc("news", "460px", $s(ec("bg")), [
				Is($(6, 28, 50, 38), Q("seed.news.title")),
				Rs($(78, 30, 16, 36), Q("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 88, 344, 25, 328), i = Ls($(t, n, 25, 160)), a = Is($(t, n + 168, 25, 160), Q("seed.news.card"));
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
		create: () => oc("news-collection", "300px", $s(ec("bg")), [Is($(6, 28, 50, 38), Q("seed.news.title")), Ws($(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => oc("noticeboard", "300px", $s(ec("surface")), [Is($(6, 28, 50, 38), Q("seed.noticeboard.title")), Ws($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => oc("publication-archive", "300px", $s(ec("bg")), [Is($(6, 28, 60, 38), Q("seed.archive.title")), Ws($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Is($(6, e, 8, 88), Q("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Is($(16, e, 58, 88), Q("seed.events.row", { title: r })),
				Rs($(78, e + 24, 16, 40), Q("seed.events.signup"), { style: "secondary" })
			];
			return oc("events", "440px", $s(ec("surface")), [
				Is($(6, 28, 50, 38), Q("seed.events.title")),
				...e(88, "11", Q("seed.events.monthAug"), Q("seed.events.row1")),
				...e(196, "25", Q("seed.events.monthAug"), Q("seed.events.row2")),
				...e(304, "8", Q("seed.events.monthSep"), Q("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = nc(e) + 16;
			return {
				blocks: [
					Is($(6, t, 8, 88), Q("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Is($(16, t, 58, 88), Q("seed.events.row", { title: Q("seed.events.newTitle") })),
					Rs($(78, t + 24, 16, 40), Q("seed.events.signup"), { style: "secondary" })
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
				let r = Ls($(e, 80, 22, 180), { alt: Q("seed.team.alt") }), i = Is($(e, 268, 22, 84), Q("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = ac(80, t, 0), i.mobileOrder = ac(80, t, 1), [r, i];
			};
			return oc("team", "420px", $s(ec("surface")), [
				Is($(6, 24, 50, 32), Q("seed.team.title")),
				...e(7.5, 0, Q("seed.team.role1")),
				...e(39, 1, Q("seed.team.role2")),
				...e(70.5, 2, Q("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = Ls($(t, n, 22, 180), { alt: Q("seed.team.alt") }), a = Is($(t, n + 188, 22, 84), Q("seed.team.member", { role: Q("seed.team.roleNew") }), { align: "center" });
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
			Is($(25, 24, 50, 36), Q("seed.faq.title"), { align: "center" }),
			Ys($(20, 80, 60, 320), [
				{
					q: Q("seed.faq.q1"),
					a: Q("seed.faq.answer")
				},
				{
					q: Q("seed.faq.q2"),
					a: Q("seed.faq.answer")
				},
				{
					q: Q("seed.faq.q3"),
					a: Q("seed.faq.answer")
				}
			]),
			Is($(20, 416, 60, 32), Q("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => oc("timeline", "480px", $s(ec("bg")), [Is($(25, 24, 50, 36), Q("seed.timeline.title"), { align: "center" }), Zs($(25, 88, 50, 330), [
			{
				year: "2019",
				title: Q("seed.timeline.t1"),
				text: Q("seed.timeline.text")
			},
			{
				year: "2022",
				title: Q("seed.timeline.t2"),
				text: Q("seed.timeline.text")
			},
			{
				year: "2026",
				title: Q("seed.timeline.t3"),
				text: Q("seed.timeline.text")
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
				}), i = Is($(e, 168, 25, 160), Q("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = ac(88, t, 0), i.mobileOrder = ac(88, t, 1), [r, i];
			};
			return oc("steps", "400px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Q("seed.steps.title")),
				...e(6, 0, Q("seed.steps.s1")),
				...e(37.5, 1, Q("seed.steps.s2")),
				...e(69, 2, Q("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 88, 272, 25, 240), i = Is($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Is($(t, n + 80, 25, 160), Q("seed.steps.card", { title: Q("seed.steps.newTitle") }), {
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
				Is($(6, 348, 55, 108), Q("seed.feature.main")),
				Rs($(6, 464, 14, 38), Q("seed.readMore"), { style: "secondary" }),
				Ls($(66, 40, 28, 120)),
				Is($(66, 164, 28, 60), Q("seed.feature.small1")),
				Ls($(66, 244, 28, 120)),
				Is($(66, 368, 28, 60), Q("seed.feature.small2"))
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
					Is($(e, 296, 25, 76), Q("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Rs($(e + 5, 380, 15, 40), Q("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = ac(88, t, n);
				}), i;
			};
			return oc("products", "470px", $s(ec("bg")), [
				Is($(6, 28, 50, 38), Q("seed.products.title")),
				...e(6, 0, Q("seed.products.name"), Q("seed.products.price1")),
				...e(37.5, 1, Q("seed.products.name"), Q("seed.products.price2")),
				...e(69, 2, Q("seed.products.name"), Q("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				Ls($(t, n, 25, 200)),
				Is($(t, n + 208, 25, 76), Q("seed.products.card", {
					name: Q("seed.products.name"),
					price: Q("seed.products.price1")
				}), { align: "center" }),
				Rs($(t + 5, n + 292, 15, 40), Q("seed.products.buy"))
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
			Is($(6, 28, 50, 38), Q("seed.shop.title")),
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
				Is($(6, 48, 52, 96), Q("seed.shopHero.title")),
				Is($(6, 152, 40, 48), Q("seed.shopHero.sub")),
				Rs($(6, 216, 17, 42), Q("seed.shopHero.cta")),
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
				let r = Ls($(e, 88, 21, 170)), i = Is($(e, 266, 21, 34), Q("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = ac(88, t, 0), i.mobileOrder = ac(88, t, 1), [r, i];
			}, t = oc("shop-categories", "360px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Q("seed.shopCategories.title")),
				...e(6, 0, Q("seed.shopCategories.cat1")),
				...e(29.5, 1, Q("seed.shopCategories.cat2")),
				...e(53, 2, Q("seed.shopCategories.cat3")),
				...e(76.5, 3, Q("seed.shopCategories.cat4"))
			]);
			return t.theme = "soft", t;
		},
		itemLabel: "category",
		itemLabelKey: "item.category",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 4, 6, 23.5, 88, 220, 21, 212), i = Ls($(t, n, 21, 170)), a = Is($(t, n + 178, 21, 34), Q("seed.shopCategories.tile", { name: Q("seed.shopCategories.newCat") }), { align: "center" });
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
				let i = zs($(e + 10.5, 88, 4, 52), r, 44), a = Is($(e, 148, 25, 96), Q(n), { align: "center" });
				return i.mobileOrder = ac(88, t, 0), a.mobileOrder = ac(88, t, 1), [i, a];
			}, t = oc("shop-trust", "300px", $s(ec("bg")), [
				Is($(6, 28, 60, 38), Q("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = zs($(t + 10.5, n - 60, 4, 52), "✓", 44), a = Is($(t, n, 25, 96), Q("seed.shopTrust.newItem"), { align: "center" });
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
				Is($(6, 56, 52, 100), Q("seed.shopShowcase.title")),
				Is($(6, 164, 42, 56), Q("seed.shopShowcase.text")),
				Rs($(6, 236, 18, 42), Q("seed.shopShowcase.cta")),
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
		create: () => oc("checkout", "560px", $s(ec("bg")), [Is($(6, 28, 50, 38), Q("seed.checkout.title")), qs($(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => oc("cta", "280px", $s(ec("surface"), tc(.5, .5, .3, .7)), [
			Is($(20, 56, 60, 40), Q("seed.cta.title"), { align: "center" }),
			Is($(25, 104, 50, 26), Q("seed.cta.sub"), { align: "center" }),
			Rs($(42, 148, 16, 42), Q("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => oc("quote", "300px", $s(ec("bg")), [Xs($(20, 56, 60, 190), {
			text: Q("seed.quoteBlock.text"),
			attribution: Q("seed.quoteBlock.name"),
			role: Q("seed.quoteBlock.role")
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
				e(6, 0, "120", "+", Q("seed.stats.l1")),
				e(37.5, 1, "25", "", Q("seed.stats.l2")),
				e(69, 2, "1981", "", Q("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = ic(e, 3, 6, 31.5, 76, 140, 25, 120), i = Qs($(t, n, 25, 120), {
				value: "42",
				label: Q("seed.stats.newLabel")
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
				alt: Q("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return oc("sponsors", "280px", $s(ec("bg")), [
				Is($(6, 28, 60, 36), Q("seed.sponsors.title")),
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
					alt: Q("seed.sponsors.alt"),
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
			Is($(6, 28, 50, 38), Q("seed.membership.title")),
			Is($(14, 88, 32, 250), Q("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Is($(54, 88, 32, 250), Q("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Rs($(42, 358, 16, 42), Q("seed.join")),
			Is($(25, 414, 50, 30), Q("seed.membership.vipps"), { align: "center" })
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
	return Da(String(e ?? ""), "");
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
var _u = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), vu = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), yu = /* @__PURE__ */ U("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), bu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), xu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Su = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Cu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), wu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Tu = /* @__PURE__ */ U("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Eu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Du = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ou = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ku = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), Au = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ju = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Mu = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), Nu = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Pu = /* @__PURE__ */ U("<input class=\"nav-target svelte-1n46o8q\"/>"), Fu = /* @__PURE__ */ U("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), Iu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label>"), Lu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), Ru = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), zu = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Bu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), Vu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Hu = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/>"), Uu = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Wu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Gu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label>"), Ku = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <textarea rows=\"3\" spellcheck=\"false\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), qu = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Ju = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Yu = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Xu = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Zu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Qu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), $u = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), ed = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), td = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), nd = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button>"), rd = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), id = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), ad = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), od = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), sd = /* @__PURE__ */ U("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), cd = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), ld = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), ud = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), dd = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), fd = /* @__PURE__ */ U("<button class=\"ghost action svelte-1n46o8q\"> </button>"), pd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), md = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), hd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), gd = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), _d = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), vd = /* @__PURE__ */ U("<p> </p>"), yd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), bd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), xd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Sd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Cd = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), wd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Td = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Ed = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Dd = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Od = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), kd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ad = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), jd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Md = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Nd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Pd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Fd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Id = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ld = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), Rd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), zd = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Bd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Vd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), Hd = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), Ud = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Wd = /* @__PURE__ */ U("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Gd = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), Kd = /* @__PURE__ */ U("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), qd = /* @__PURE__ */ U("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), Jd = /* @__PURE__ */ U("<button><!> </button>"), Yd = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"></div>"), Xd = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), Zd = /* @__PURE__ */ U("<button></button>"), Qd = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), $d = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), ef = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), tf = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), nf = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), rf = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), af = /* @__PURE__ */ U("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), of = /* @__PURE__ */ U("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), sf = /* @__PURE__ */ U("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), cf = /* @__PURE__ */ U("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), lf = /* @__PURE__ */ U("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), uf = /* @__PURE__ */ U("<span class=\"who svelte-1n46o8q\"><!> </span>"), df = /* @__PURE__ */ U("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), ff = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), pf = /* @__PURE__ */ U("<button> </button>"), mf = /* @__PURE__ */ U("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), hf = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), gf = /* @__PURE__ */ U("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), _f = /* @__PURE__ */ U("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), vf = /* @__PURE__ */ U("<button type=\"button\"></button>"), yf = /* @__PURE__ */ U("<span class=\"page-path svelte-1n46o8q\">/</span>"), bf = /* @__PURE__ */ U("<input class=\"page-slug svelte-1n46o8q\"/>"), xf = /* @__PURE__ */ U("<span class=\"seo-warn svelte-1n46o8q\"></span>"), Sf = /* @__PURE__ */ U("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Cf = /* @__PURE__ */ U("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), wf = /* @__PURE__ */ U("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Tf = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Ef = /* @__PURE__ */ U("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), Df = /* @__PURE__ */ U("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), Of = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), kf = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), Af = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), jf = /* @__PURE__ */ U("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), Mf = /* @__PURE__ */ U("<span class=\"logo-file svelte-1n46o8q\"> </span>"), Nf = /* @__PURE__ */ U("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), Pf = /* @__PURE__ */ U("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), Ff = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), If = /* @__PURE__ */ U("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Lf = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Rf = /* @__PURE__ */ U("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), zf = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Bf = /* @__PURE__ */ U("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), Vf = /* @__PURE__ */ U("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), Hf = /* @__PURE__ */ U("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), Uf = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), Wf = /* @__PURE__ */ U("<!> <!>", 1), Gf = /* @__PURE__ */ U("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Kf = /* @__PURE__ */ U("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), qf = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), Jf = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Yf = /* @__PURE__ */ U("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), Xf = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Zf = /* @__PURE__ */ U("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), Qf = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), $f = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ep = /* @__PURE__ */ U("<span class=\"tool-move svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), tp = /* @__PURE__ */ U("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), np = /* @__PURE__ */ U("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div>"), rp = /* @__PURE__ */ U("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label>"), ip = /* @__PURE__ */ U("<img alt=\"\"/>"), ap = /* @__PURE__ */ U("<span class=\"lrow-warn svelte-1n46o8q\"></span>"), op = /* @__PURE__ */ U("<span class=\"lrow-tile-mark svelte-1n46o8q\"><!></span> <span class=\"lrow-tile-name svelte-1n46o8q\"> </span>", 1), sp = /* @__PURE__ */ U("<span class=\"bad-target-note svelte-1n46o8q\"> </span>"), cp = /* @__PURE__ */ U("<div class=\"lrow-body svelte-1n46o8q\"><!> <div class=\"lrow-fields svelte-1n46o8q\"><input class=\"field-filled svelte-1n46o8q\"/> <input/> <!> <span class=\"lrow-actions svelte-1n46o8q\"><!> <button class=\"linkish danger svelte-1n46o8q\"> </button></span></div></div>"), lp = /* @__PURE__ */ U("<div><div class=\"lrow-head svelte-1n46o8q\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark svelte-1n46o8q\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\" role=\"none\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"lrow-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></div> <!></div>"), up = /* @__PURE__ */ U("<details class=\"group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"> <!></span></summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"lbtn-pick svelte-1n46o8q\"><!> <span class=\"lbtn-name svelte-1n46o8q\"><!></span></span></div> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details>"), dp = /* @__PURE__ */ U("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), fp = /* @__PURE__ */ U("<input class=\"nav-item-href svelte-1n46o8q\"/>"), pp = /* @__PURE__ */ U("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), mp = /* @__PURE__ */ U("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), hp = /* @__PURE__ */ U("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), gp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <!> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!>  <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), _p = /* @__PURE__ */ U("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), vp = /* @__PURE__ */ U("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), yp = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), bp = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), xp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), Sp = /* @__PURE__ */ U("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), Cp = /* @__PURE__ */ U("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), wp = /* @__PURE__ */ U("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), Tp = /* @__PURE__ */ U("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Ep = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Dp = /* @__PURE__ */ U("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Op = /* @__PURE__ */ U("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), kp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), Ap = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), jp = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), Mp = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Np = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), Pp = /* @__PURE__ */ U("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), Fp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Ip = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Lp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Rp = /* @__PURE__ */ U("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), zp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Bp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Vp = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Hp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Up = /* @__PURE__ */ U("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Wp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Gp = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Kp = /* @__PURE__ */ U("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), qp = /* @__PURE__ */ U("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), Jp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Yp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Xp = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Zp = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), Qp = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), $p = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), em = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), tm = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), nm = /* @__PURE__ */ U("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), rm = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), im = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), am = /* @__PURE__ */ U("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), om = /* @__PURE__ */ U("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), sm = /* @__PURE__ */ U("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), cm = /* @__PURE__ */ U("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), lm = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), um = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), dm = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), fm = /* @__PURE__ */ U("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), pm = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), mm = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), hm = /* @__PURE__ */ U("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), gm = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), _m = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), vm = /* @__PURE__ */ U("<span class=\"chip svelte-1n46o8q\"> </span>"), ym = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), bm = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), xm = /* @__PURE__ */ U("<span class=\"update-warn svelte-1n46o8q\"></span>"), Sm = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Cm = /* @__PURE__ */ U("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), wm = /* @__PURE__ */ U("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), Tm = /* @__PURE__ */ U("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), Em = /* @__PURE__ */ U("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), Dm = /* @__PURE__ */ U("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), Om = /* @__PURE__ */ U("<p class=\"loading svelte-1n46o8q\"> </p>"), km = /* @__PURE__ */ U("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Am = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), jm = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Mm = /* @__PURE__ */ U("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Nm = /* @__PURE__ */ U("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Pm = /* @__PURE__ */ U("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function Fm(e, t) {
	qe(t, !0);
	let n = (e, t = f, n = f) => {
		var r = Nu(), i = L(r);
		Jr(i, 17, n, Wr, (e, r, i) => {
			var a = Mu(), o = I(a), s = I(o);
			{
				let e = /* @__PURE__ */ j(() => Q("tip.bg.changeType")), n = /* @__PURE__ */ j(() => g.map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label]));
				us(s, {
					get value() {
						return V(r).type;
					},
					get title() {
						return V(e);
					},
					get options() {
						return V(n);
					},
					onchange: (e) => Tr(t(), i, e)
				});
			}
			var c = z(s, 2), l = I(c);
			l.disabled = i === 0, q(l, () => v.up, !0), O(l);
			var u = z(l, 2);
			q(u, () => v.down, !0), O(u);
			var d = z(u, 2);
			q(d, () => v.cross, !0), O(d), O(c), O(o);
			var f = z(o, 2), p = (e) => {
				var n = _u(), a = L(n), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.bg.layerColor"));
					ha(s, {
						get value() {
							return V(r).props.value;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => ar(t(), i, "value", e)
					});
				}
				O(a);
				var c = z(a, 2), l = I(c), u = R(z(l));
				O(c);
				var d = z(c, 2);
				Y(d), B((e, t, n) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(u, `${n ?? ""}%`), X(d, V(r).props.opacity ?? 1);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100)
				]), H("input", d, (e) => ar(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, m = (e) => {
				let n = /* @__PURE__ */ j(() => dr(V(r))), a = /* @__PURE__ */ j(() => V(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Su(), s = L(o), c = I(s), l = z(c);
				{
					let e = /* @__PURE__ */ j(() => V(n).kind ?? "linear"), r = /* @__PURE__ */ j(() => [["linear", Q("opt.grad.linear")], ["radial", Q("opt.grad.radial")]]);
					us(l, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => gr(t(), i, e)
					});
				}
				O(s);
				var u = z(s, 2);
				Jr(u, 17, () => V(n).stops, Wr, (e, r, o) => {
					var s = yu();
					let c;
					var l = I(s), u = z(l, 2);
					{
						let e = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.bg.stopColor"));
						ha(u, {
							get value() {
								return V(r).color;
							},
							get tokens() {
								return V(e);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => _r(t(), i, o, { color: e })
						});
					}
					var d = z(u, 2);
					Y(d);
					var f = z(d, 2), p = R(f), m = z(f, 2), h = (e) => {
						var n = vu();
						q(n, () => v.cross, !0), O(n), B((e) => Z(n, "title", e), [() => Q("tip.bg.removeStop")]), H("click", n, () => yr(t(), i, o)), W(e, n);
					};
					K(m, (e) => {
						V(n).stops.length > 2 && e(h);
					}), O(s), B((e, t, a) => {
						c = J(s, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: V(Sr)?.layer === i && V(Sr).from === o,
							"drop-above": V(Sr)?.layer === i && V(Sr).insert === o,
							"drop-below": V(Sr)?.layer === i && V(Sr).insert === V(n).stops.length && o === V(n).stops.length - 1
						}), Z(l, "title", e), X(d, V(r).share ?? 50), Z(d, "title", t), G(p, `${a ?? ""}%`);
					}, [
						() => Q("tip.bg.dragStop"),
						() => Q("tip.bg.stopShare"),
						() => V(a) > 0 ? Math.round(Math.max(0, Number(V(r).share) || 0) / V(a) * 100) : Math.round(100 / V(n).stops.length)
					]), H("pointerdown", l, (e) => wr(t(), e, i, o)), H("input", d, (e) => _r(t(), i, o, { share: Number(e.target.value) })), W(e, s);
				});
				var d = z(u, 2), f = R(d, !0), p = z(d, 2), m = (e) => {
					var r = bu(), a = L(r), o = I(a), s = R(z(o));
					O(a);
					var c = z(a, 2);
					Y(c);
					var l = z(c, 2), u = I(l), d = R(z(u));
					O(l);
					var f = z(l, 2);
					Y(f), B((e, t, r, i) => {
						G(o, `${e ?? ""} `), G(s, `${t ?? ""}%`), X(c, V(n).x ?? .5), G(u, `${r ?? ""} `), G(d, `${i ?? ""}%`), X(f, V(n).y ?? .5);
					}, [
						() => Q("lbl.centerX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Q("lbl.centerY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("input", c, (e) => mr(t(), i, "x", Number(e.target.value))), H("input", f, (e) => mr(t(), i, "y", Number(e.target.value))), W(e, r);
				}, h = (e) => {
					var r = xu(), a = L(r), o = I(a), s = R(z(o));
					O(a);
					var c = z(a, 2);
					Y(c), B((e) => {
						G(o, `${e ?? ""} `), G(s, `${V(n).angle ?? ""}°`), X(c, V(n).angle);
					}, [() => Q("lbl.angle")]), H("input", c, (e) => mr(t(), i, "angle", Number(e.target.value))), W(e, r);
				};
				K(p, (e) => {
					(V(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = z(p, 2), _ = I(g), y = R(z(_));
				O(g);
				var b = z(g, 2);
				Y(b);
				var x = z(b, 2), S = I(x), C = z(S);
				{
					let e = /* @__PURE__ */ j(() => V(n).animation ?? "none");
					us(C, {
						get value() {
							return V(e);
						},
						get options() {
							return hr[(V(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => mr(t(), i, "animation", e)
					});
				}
				O(x), B((e, t, r, i, a, o, s) => {
					G(c, `${e ?? ""} `), Z(d, "title", t), G(f, r), G(_, `${i ?? ""} `), G(y, `${a ?? ""}%`), X(b, V(n).opacity ?? 1), Z(x, "title", o), G(S, `${s ?? ""} `);
				}, [
					() => Q("blocks.shape"),
					() => Q("tip.bg.addStop"),
					() => Q("ui.addStop"),
					() => Q("lbl.strength"),
					() => Math.round((V(n).opacity ?? 1) * 100),
					() => Q("tip.bg.motion"),
					() => Q("lbl.motion")
				]), H("click", d, () => vr(t(), i)), H("input", b, (e) => mr(t(), i, "opacity", Number(e.target.value))), W(e, o);
			}, h = (e) => {
				var n = Cu(), a = L(n), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.bg.glowColor"));
					ha(s, {
						get value() {
							return V(r).props.color;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => ar(t(), i, "color", e)
					});
				}
				O(a);
				var c = z(a, 2), l = I(c), u = R(z(l));
				O(c);
				var d = z(c, 2);
				Y(d);
				var f = z(d, 2), p = I(f), m = R(z(p));
				O(f);
				var h = z(f, 2);
				Y(h);
				var g = z(h, 2), _ = I(g), v = R(z(_));
				O(g);
				var y = z(g, 2);
				Y(y);
				var b = z(y, 2), x = I(b), S = R(z(x));
				O(b);
				var C = z(b, 2);
				Y(C), B((e, t, n, i, a, s, c, f, g) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(u, `${n ?? ""}%`), X(d, V(r).props.x), G(p, `${i ?? ""} `), G(m, `${a ?? ""}%`), X(h, V(r).props.y), G(_, `${s ?? ""} `), G(v, `${c ?? ""}%`), X(y, V(r).props.radius), G(x, `${f ?? ""} `), G(S, `${g ?? ""}%`), X(C, V(r).props.opacity);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.posX"),
					() => Math.round(V(r).props.x * 100),
					() => Q("lbl.posY"),
					() => Math.round(V(r).props.y * 100),
					() => Q("lbl.size"),
					() => Math.round(V(r).props.radius * 100),
					() => Q("lbl.strength"),
					() => Math.round(V(r).props.opacity * 100)
				]), H("input", d, (e) => ar(t(), i, "x", Number(e.target.value))), H("input", h, (e) => ar(t(), i, "y", Number(e.target.value))), H("input", y, (e) => ar(t(), i, "radius", Number(e.target.value))), H("input", C, (e) => ar(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, _ = (e) => {
				var n = wu(), a = L(n), o = I(a), s = R(z(o));
				O(a);
				var c = z(a, 2);
				Y(c), B((e, t) => {
					G(o, `${e ?? ""} `), G(s, `${t ?? ""}%`), X(c, V(r).props.opacity);
				}, [() => Q("lbl.strength"), () => Math.round(V(r).props.opacity * 100)]), H("input", c, (e) => ar(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ j(() => V(r).props.fit === "tile" || V(r).props.fit === "repeat");
				var a = Du(), o = L(a), s = I(o), c = z(s);
				O(o);
				var l = z(o, 2), u = I(l), d = z(u);
				{
					let e = /* @__PURE__ */ j(() => V(n) ? "tile" : "plain"), r = /* @__PURE__ */ j(() => [["plain", Q("opt.img.plain")], ["tile", Q("opt.img.tile")]]);
					us(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => ar(t(), i, "fit", e)
					});
				}
				O(l);
				var f = z(l, 2), p = R(f, !0), m = z(f, 2), h = I(m), g = z(h, 2);
				Y(g);
				var _ = z(g, 4);
				O(m);
				var v = z(m, 2), y = (e) => {
					var n = Tu(), a = L(n), o = I(a), s = R(o, !0), c = z(o, 2), l = R(c, !0);
					O(a);
					var u = z(a, 2), d = R(u, !0), f = z(u, 2), p = z(f, 2), m = I(p), h = R(z(m));
					O(p);
					var g = z(p, 2);
					Y(g);
					var _ = z(g, 2), v = I(_), y = R(z(v));
					O(_);
					var b = z(_, 2);
					Y(b), B((e, t, n, i, a, p, _, x, S, C, w, T) => {
						Z(o, "title", e), G(s, t), Z(c, "title", n), G(l, i), Z(u, "title", a), G(d, p), _i(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), G(m, `${S ?? ""} `), G(h, `${C ?? ""}%`), X(g, V(r).props.x ?? .5), G(v, `${w ?? ""} `), G(y, `${T ?? ""}%`), X(b, V(r).props.y ?? .5);
					}, [
						() => Q("tip.bg.cover"),
						() => Q("ui.cover"),
						() => Q("opt.fitFrame.contain"),
						() => Q("opt.fit.contain"),
						() => Q("tip.bg.position"),
						() => Q("lbl.position"),
						() => Math.max(0, Math.min(1, V(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, V(r).props.y ?? .5)) * 100,
						() => Q("lbl.horizontal"),
						() => Math.round((V(r).props.x ?? .5) * 100),
						() => Q("lbl.vertical"),
						() => Math.round((V(r).props.y ?? .5) * 100)
					]), H("click", o, () => ur(t(), i, V(r), "cover")), H("click", c, () => ur(t(), i, V(r), "contain")), H("pointerdown", f, (e) => or(e, t(), i, "xy")), H("input", g, (e) => ar(t(), i, "x", Number(e.target.value))), H("input", b, (e) => ar(t(), i, "y", Number(e.target.value))), W(e, n);
				};
				K(v, (e) => {
					V(n) || e(y);
				});
				var b = z(v, 2), x = I(b), S = R(z(x));
				O(b);
				var C = z(b, 2);
				Y(C);
				var w = z(C, 2), T = I(w), ee = R(z(T));
				O(w);
				var te = z(w, 2);
				Y(te);
				var ne = z(te, 2), re = I(ne);
				Y(re);
				var E = z(re);
				O(ne);
				var D = z(ne, 2), ie = (e) => {
					var n = Eu(), a = L(n), o = I(a), s = R(z(o));
					O(a);
					var c = z(a, 2);
					Y(c);
					var l = z(c, 2), u = I(l), d = z(u);
					{
						let e = /* @__PURE__ */ j(() => V(r).props.bleed ?? "none"), n = /* @__PURE__ */ j(() => [
							["none", Q("common.none")],
							["up", Q("opt.bleed.up")],
							["down", Q("opt.bleed.down")],
							["both", Q("opt.brand.both")]
						]);
						us(d, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => ar(t(), i, "bleed", e)
						});
					}
					O(l), B((e, t, n, i) => {
						G(o, `${e ?? ""} `), G(s, `${t ?? ""}%`), X(c, V(r).props.parallax ?? .3), Z(l, "title", n), G(u, `${i ?? ""} `);
					}, [
						() => Q("lbl.parallaxStrength"),
						() => Math.round((V(r).props.parallax ?? 0) * 100),
						() => Q("tip.bg.bleed"),
						() => Q("lbl.bleed")
					]), H("input", c, (e) => ar(t(), i, "parallax", Number(e.target.value))), W(e, n);
				};
				K(D, (e) => {
					(V(r).props.parallax ?? 0) > 0 && e(ie);
				}), B((e, t, n, i, a, c, d, m, v, y, b, w, D, ie) => {
					Z(o, "title", e), G(s, `${t ?? ""} `), Z(l, "title", n), G(u, `${i ?? ""} `), Z(f, "title", a), G(p, c), Z(h, "title", d), X(g, m), Z(_, "title", v), G(x, `${y ?? ""} `), G(S, `${V(r).props.blur ?? 0 ?? ""} px`), X(C, V(r).props.blur ?? 0), G(T, `${b ?? ""} `), G(ee, `${w ?? ""}%`), X(te, V(r).props.opacity ?? 1), Z(ne, "title", D), Si(re, (V(r).props.parallax ?? 0) > 0), G(E, ` ${ie ?? ""}`);
				}, [
					() => Q("tip.webpAuto"),
					() => V(r).props.src ? Q("ui.changeImage") : Q("ui.chooseImage"),
					() => Q("tip.bg.fit"),
					() => Q("lbl.fit"),
					() => Q("tip.bg.size"),
					() => Q("lbl.size"),
					() => Q("tip.smaller"),
					() => Math.round((V(r).props.size ?? 1) * 100),
					() => Q("tip.larger"),
					() => Q("lbl.blur"),
					() => Q("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Q("tip.bg.parallax"),
					() => Q("lbl.parallax")
				]), H("change", c, (e) => kr(t(), i, e)), H("click", h, () => cr(t(), i, V(r).props.size ?? 1, -.05)), H("change", g, (e) => lr(t(), i, e.target.value)), H("click", _, () => cr(t(), i, V(r).props.size ?? 1, .05)), H("input", C, (e) => ar(t(), i, "blur", Number(e.target.value))), H("input", te, (e) => ar(t(), i, "opacity", Number(e.target.value))), H("change", re, (e) => ar(t(), i, "parallax", e.target.checked ? .3 : 0)), W(e, a);
			}, b = (e) => {
				var n = ku(), a = L(n), o = I(a), s = z(o);
				O(a);
				var c = z(a, 2);
				Jr(c, 17, () => V(r).props.images ?? [], Wr, (e, n, a) => {
					var o = Ou(), s = L(o), c = I(s), l = z(c, 2), u = I(l);
					u.disabled = a === 0, q(u, () => v.up, !0), O(u);
					var d = z(u, 2);
					q(d, () => v.down, !0), O(d);
					var f = z(d, 2);
					q(f, () => v.cross, !0), O(f), O(l), O(s);
					var p = z(s, 2), m = I(p), h = R(z(m));
					O(p);
					var g = z(p, 2);
					Y(g);
					var _ = z(g, 2), y = I(_), b = R(z(y));
					O(_);
					var x = z(_, 2);
					Y(x), B((e, t, i, o, s) => {
						Z(c, "src", V(n).src), d.disabled = a === V(r).props.images.length - 1, Z(f, "title", e), G(m, `${t ?? ""} `), G(h, `${i ?? ""}%`), X(g, V(n).x ?? .5), G(y, `${o ?? ""} `), G(b, `${s ?? ""}%`), X(x, V(n).y ?? .5);
					}, [
						() => Q("tip.removeImage"),
						() => Q("lbl.focusX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Q("lbl.focusY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("click", u, () => Pr(t(), i, a, -1)), H("click", d, () => Pr(t(), i, a, 1)), H("click", f, () => Fr(t(), i, a)), H("input", g, (e) => Ir(t(), i, a, "x", Number(e.target.value))), H("input", x, (e) => Ir(t(), i, a, "y", Number(e.target.value))), W(e, o);
				});
				var l = z(c, 2), u = I(l), d = z(u);
				{
					let e = /* @__PURE__ */ j(() => V(r).props.fit ?? "cover"), n = /* @__PURE__ */ j(() => [["cover", Q("opt.fit.cover")], ["contain", Q("opt.fit.contain")]]);
					us(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => ar(t(), i, "fit", e)
					});
				}
				O(l);
				var f = z(l, 2), p = I(f), m = z(p);
				Y(m), O(f);
				var h = z(f, 2), g = I(h), _ = R(z(g));
				O(h);
				var y = z(h, 2);
				Y(y);
				var b = z(y, 2), x = I(b), S = R(z(x));
				O(b);
				var C = z(b, 2);
				Y(C);
				var w = z(C, 2), T = I(w), ee = R(z(T));
				O(w);
				var te = z(w, 2);
				Y(te);
				var ne = R(z(te, 2), !0);
				B((e, t, n, i, s, c, l, d, h, v, b) => {
					Z(a, "title", e), G(o, `${t ?? ""} `), G(u, `${n ?? ""} `), Z(f, "title", i), G(p, `${s ?? ""} `), X(m, V(r).props.interval ?? 6), G(g, `${c ?? ""} `), G(_, `${l ?? ""} s`), X(y, V(r).props.fade ?? 1.5), G(x, `${d ?? ""} `), G(S, `${V(r).props.blur ?? 0 ?? ""} px`), X(C, V(r).props.blur ?? 0), G(T, `${h ?? ""} `), G(ee, `${v ?? ""}%`), X(te, V(r).props.opacity ?? 1), G(ne, b);
				}, [
					() => Q("tip.bg.addImages"),
					() => Q("ui.addImages"),
					() => Q("lbl.fit"),
					() => Q("hint.bg.gallery"),
					() => Q("lbl.secondsPerImage"),
					() => Q("lbl.transition"),
					() => (V(r).props.fade ?? 1.5).toFixed(1),
					() => Q("lbl.blur"),
					() => Q("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Q("hint.bg.gallery")
				]), H("change", s, (e) => U(t(), i, e)), H("change", m, (e) => ar(t(), i, "interval", Number(e.target.value))), H("input", y, (e) => ar(t(), i, "fade", Number(e.target.value))), H("input", C, (e) => ar(t(), i, "blur", Number(e.target.value))), H("input", te, (e) => ar(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, x = (e) => {
				var n = ju(), a = L(n), o = I(a), s = z(o);
				O(a);
				var c = z(a, 2), l = I(c), u = z(l);
				O(c);
				var d = z(c, 2), f = I(d), p = z(f);
				{
					let e = /* @__PURE__ */ j(() => V(r).props.fit ?? "cover"), n = /* @__PURE__ */ j(() => [["cover", Q("opt.fit.cover")], ["contain", Q("opt.fit.contain")]]);
					us(p, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => ar(t(), i, "fit", e)
					});
				}
				O(d);
				var m = z(d, 2), h = I(m), g = R(z(h));
				O(m);
				var _ = z(m, 2);
				Y(_);
				var v = z(_, 2), y = I(v), b = R(z(y));
				O(v);
				var x = z(v, 2);
				Y(x);
				var S = z(x, 2), C = I(S), w = R(z(C));
				O(S);
				var T = z(S, 2);
				Y(T);
				var ee = z(T, 2), te = I(ee);
				Y(te);
				var ne = z(te);
				O(ee);
				var re = z(ee, 2), E = (e) => {
					var n = Au(), a = L(n), o = I(a), s = R(z(o));
					O(a);
					var c = z(a, 2);
					Y(c), B((e, t) => {
						G(o, `${e ?? ""} `), G(s, `${t ?? ""}%`), X(c, V(r).props.parallax ?? .3);
					}, [() => Q("lbl.parallaxStrength"), () => Math.round((V(r).props.parallax ?? 0) * 100)]), H("input", c, (e) => ar(t(), i, "parallax", Number(e.target.value))), W(e, n);
				};
				K(re, (e) => {
					(V(r).props.parallax ?? 0) > 0 && e(E);
				}), B((e, t, n, i, s, u, p, m, v, S, re, E, D, ie) => {
					Z(a, "title", e), G(o, `${t ?? ""} `), Z(c, "title", n), G(l, `${i ?? ""} `), Z(d, "title", s), G(f, `${u ?? ""} `), G(h, `${p ?? ""} `), G(g, `${m ?? ""}%`), X(_, V(r).props.x ?? .5), G(y, `${v ?? ""} `), G(b, `${S ?? ""}%`), X(x, V(r).props.y ?? .5), G(C, `${re ?? ""} `), G(w, `${E ?? ""}%`), X(T, V(r).props.opacity ?? 1), Z(ee, "title", D), Si(te, (V(r).props.parallax ?? 0) > 0), G(ne, ` ${ie ?? ""}`);
				}, [
					() => Q("tip.bg.videoFile"),
					() => V(r).props.src ? Q("ui.changeVideo") : Q("ui.chooseVideo"),
					() => Q("tip.bg.poster"),
					() => V(r).props.poster ? Q("ui.changeImage") : Q("ui.choosePoster"),
					() => Q("tip.bg.fit"),
					() => Q("lbl.fit"),
					() => Q("lbl.horizontal"),
					() => Math.round((V(r).props.x ?? .5) * 100),
					() => Q("lbl.vertical"),
					() => Math.round((V(r).props.y ?? .5) * 100),
					() => Q("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Q("tip.bg.parallax"),
					() => Q("lbl.parallax")
				]), H("change", s, (e) => Ar(t(), i, e)), H("change", u, (e) => jr(t(), i, e)), H("input", _, (e) => ar(t(), i, "x", Number(e.target.value))), H("input", x, (e) => ar(t(), i, "y", Number(e.target.value))), H("input", T, (e) => ar(t(), i, "opacity", Number(e.target.value))), H("change", te, (e) => ar(t(), i, "parallax", e.target.checked ? .3 : 0)), W(e, n);
			};
			K(f, (e) => {
				V(r).type === "color" ? e(p) : V(r).type === "gradient" ? e(m, 1) : V(r).type === "glow" ? e(h, 2) : V(r).type === "grain" ? e(_, 3) : V(r).type === "image" ? e(y, 4) : V(r).type === "slideshow" ? e(b, 5) : V(r).type === "video" && e(x, 6);
			}), O(a), B((e, t, r) => {
				Z(l, "title", e), Z(u, "title", t), u.disabled = i === n().length - 1, Z(d, "title", r);
			}, [
				() => Q("hint.bg.order"),
				() => Q("hint.bg.order"),
				() => Q("tip.bg.removeLayer")
			]), H("click", l, () => ir(t(), i, -1)), H("click", u, () => ir(t(), i, 1)), H("click", d, () => rr(t(), i)), W(e, a);
		});
		var a = z(i, 2), o = I(a), s = z(o);
		{
			let e = /* @__PURE__ */ j(() => g.map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label]));
			us(s, {
				get value() {
					return V(tr);
				},
				get options() {
					return V(e);
				},
				onchange: (e) => P(tr, e, !0)
			});
		}
		O(a);
		var c = z(a, 2), l = R(c, !0);
		B((e, t) => {
			G(o, `${e ?? ""} `), G(l, t);
		}, [() => Q("lbl.newLayer"), () => Q("ui.addLayer")]), H("click", c, () => nr(t(), V(tr))), W(e, r);
	}, r = (e, t = f, n = f) => {
		var r = Nr();
		Jr(L(r), 17, n, Wr, (e, r, i) => {
			var a = Fu(), o = I(a);
			Y(o);
			var s = z(o, 2), c = I(s);
			c.disabled = i === 0, q(c, () => v.up, !0), O(c);
			var l = z(c, 2);
			q(l, () => v.down, !0), O(l);
			var u = z(l, 2);
			q(u, () => v.cross, !0), O(u), O(s);
			var d = z(s, 2), f = I(d);
			{
				let e = /* @__PURE__ */ j(() => V(r).page ?? "__href"), n = /* @__PURE__ */ j(() => Q("tip.linkTarget")), a = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
				us(f, {
					get value() {
						return V(e);
					},
					get title() {
						return V(n);
					},
					get options() {
						return V(a);
					},
					onchange: (e) => Xl(t(), i, e)
				});
			}
			O(d);
			var p = z(d, 2), m = (e) => {
				var n = Pu();
				Y(n), B((e, t) => {
					X(n, V(r).href ?? ""), Z(n, "placeholder", e), Z(n, "title", t);
				}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", n, (e) => Zl(t(), i, e.target.value)), W(e, n);
			};
			K(p, (e) => {
				V(r).page || e(m);
			}), O(a), B((e, t) => {
				X(o, V(r).label), Z(o, "title", e), l.disabled = i === n().length - 1, Z(u, "title", t);
			}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), H("input", o, (e) => Yl(t(), i, e.target.value)), H("click", c, () => Jl(t(), i, -1)), H("click", l, () => Jl(t(), i, 1)), H("click", u, () => ql(t(), i)), W(e, a);
		}), W(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ j(() => V(M).props.boxStyle ?? {});
		var n = Ru(), r = L(n), i = I(r), a = z(i);
		{
			let e = /* @__PURE__ */ j(() => V(t).bg ?? ""), n = /* @__PURE__ */ j(Gr), r = /* @__PURE__ */ j(() => Q("tip.box.bg"));
			ha(a, {
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
				onchange: (e) => dn({ bg: e || null })
			});
		}
		O(r);
		var o = z(r, 2), s = I(o), c = z(s);
		{
			let e = /* @__PURE__ */ j(() => V(t).shadow ?? ""), n = /* @__PURE__ */ j(() => [
				["", Q("common.none")],
				["soft", Q("opt.shadow.soft")],
				["strong", Q("opt.shadow.strong")]
			]);
			us(c, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => dn({ shadow: e || null })
			});
		}
		O(o);
		var l = z(o, 2), u = (e) => {
			var n = Iu(), r = I(n), i = z(r);
			{
				let e = /* @__PURE__ */ j(() => V(t).shadowColor ?? ""), n = /* @__PURE__ */ j(Gr), r = /* @__PURE__ */ j(() => Q("tip.box.shadowColor"));
				ha(i, {
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
					onchange: (e) => dn({ shadowColor: e || null })
				});
			}
			O(n), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.shadowColor")]), W(e, n);
		};
		K(l, (e) => {
			V(t).shadow && e(u);
		});
		var d = z(l, 2), f = I(d), p = z(f);
		{
			let e = /* @__PURE__ */ j(() => V(t).border === "none" ? "none" : V(t).border ? "custom" : ""), n = /* @__PURE__ */ j(() => [
				["", Q("opt.border.theme")],
				["none", Q("common.none")],
				["custom", Q("opt.border.custom")]
			]);
			us(p, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => dn({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		O(d);
		var m = z(d, 2), h = (e) => {
			let n = /* @__PURE__ */ j(() => typeof V(t).border == "object" ? V(t).border : {
				color: "text",
				width: 1
			});
			var r = Lu(), i = L(r), a = I(i), o = z(a);
			{
				let e = /* @__PURE__ */ j(Gr), t = /* @__PURE__ */ j(() => Q("tip.box.borderColor"));
				ha(o, {
					get value() {
						return V(n).color;
					},
					get tokens() {
						return V(e);
					},
					get label() {
						return V(t);
					},
					onchange: (e) => dn({ border: {
						...V(n),
						color: e
					} })
				});
			}
			O(i);
			var s = z(i, 2), c = I(s), l = z(c), u = I(l), d = z(u, 2);
			Y(d);
			var f = z(d, 2);
			O(l), O(s), B((e, t, r, i, o, s) => {
				G(a, `${e ?? ""} `), G(c, `${t ?? ""} `), Z(u, "title", r), Z(u, "aria-label", i), X(d, V(n).width), Z(f, "title", o), Z(f, "aria-label", s);
			}, [
				() => Q("lbl.borderColor"),
				() => Q("lbl.thicknessPx"),
				() => Q("tip.thinner"),
				() => Q("tip.thinner"),
				() => Q("tip.thicker"),
				() => Q("tip.thicker")
			]), H("click", u, () => dn({ border: {
				...V(n),
				width: Math.max(1, V(n).width - 1)
			} })), H("change", d, (e) => dn({ border: {
				...V(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), H("click", f, () => dn({ border: {
				...V(n),
				width: Math.min(12, V(n).width + 1)
			} })), W(e, r);
		};
		K(m, (e) => {
			V(t).border !== "none" && e(h);
		});
		var g = z(m, 2), _ = I(g);
		Y(_);
		var v = z(_);
		O(g), B((e, t, n, r, a, o) => {
			G(i, `${e ?? ""} `), G(s, `${t ?? ""} `), G(f, `${n ?? ""} `), Z(g, "title", r), Si(_, a), G(v, ` ${o ?? ""}`);
		}, [
			() => Q("lbl.blockColor"),
			() => Q("lbl.shadow"),
			() => Q("lbl.border"),
			() => Q("tip.box.glass"),
			() => !!V(t).glass,
			() => Q("lbl.glass")
		]), H("change", _, (e) => dn({ glass: e.target.checked || null })), W(e, n);
	}, a = (e) => {
		var t = Kd(), n = L(t), r = I(n), a = I(r);
		let o;
		var s = R(a, !0), c = z(a, 2);
		let l;
		var u = R(c, !0);
		O(r), O(n);
		var d = z(n, 2), f = (e) => {
			var t = Nr(), n = L(t), r = (e) => {
				var t = zu(), n = R(t, !0);
				B((e) => G(n, e), [() => Q("hint.textInline")]), W(e, t);
			}, i = (e) => {
				var t = Wu(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.mode ?? "mailto"), t = /* @__PURE__ */ j(() => [["mailto", Q("form.modeMailto")], ["endpoint", Q("form.modeEndpoint")]]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("mode", e)
					});
				}
				O(n);
				var a = z(n, 2), o = (e) => {
					var t = Bu(), n = I(t), r = z(n);
					Y(r), O(t), B((e, i, a) => {
						Z(t, "title", e), G(n, `${i ?? ""} `), X(r, V(M).props.endpoint ?? ""), Z(r, "placeholder", a);
					}, [
						() => Q("form.endpointNote"),
						() => Q("form.endpoint"),
						() => Q("form.endpointPh")
					]), H("change", r, (e) => F("endpoint", e.target.value.trim())), W(e, t);
				}, s = (e) => {
					var t = Vu(), n = L(t), r = I(n), i = z(r);
					Y(i), O(n);
					var a = z(n, 2), o = I(a), s = z(o);
					Y(s), O(a), B((e, t, n, a) => {
						G(r, `${e ?? ""} `), X(i, V(M).props.recipient ?? ""), Z(i, "placeholder", t), G(o, `${n ?? ""} `), X(s, V(M).props.subject ?? ""), Z(s, "placeholder", a);
					}, [
						() => Q("form.recipient"),
						() => Q("form.recipientPh"),
						() => Q("form.subject"),
						() => Q("form.subjectPh")
					]), H("change", i, (e) => F("recipient", e.target.value.trim())), H("change", s, (e) => F("subject", e.target.value.trim())), W(e, t);
				};
				K(a, (e) => {
					(V(M).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var c = z(a, 2), l = R(c, !0), u = z(c, 2);
				Jr(u, 19, () => V(M).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = Uu(), i = L(r), a = I(i);
					Y(a);
					var o = z(a, 2);
					{
						let e = /* @__PURE__ */ j(() => V(t).type ?? "text"), r = /* @__PURE__ */ j(() => fn.map((e) => [e, Q(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						us(o, {
							get value() {
								return V(e);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => hn(V(n), { type: e })
						});
					}
					var s = z(o, 2), c = I(s);
					q(c, () => v.up, !0), O(c);
					var l = z(c, 2);
					q(l, () => v.down, !0), O(l);
					var u = z(l, 2);
					q(u, () => v.cross, !0), O(u), O(s), O(i);
					var d = z(i, 2), f = I(d);
					Y(f);
					var p = z(f);
					O(d);
					var m = z(d, 2), h = (e) => {
						var r = Hu();
						Y(r), B((e, t) => {
							X(r, e), Z(r, "placeholder", t);
						}, [() => (V(t).options ?? []).join(", "), () => Q("form.optionsPh")]), H("change", r, (e) => gn(V(n), e.target.value)), W(e, r);
					}, g = /* @__PURE__ */ j(() => pn.has(V(t).type));
					K(m, (e) => {
						V(g) && e(h);
					}), B((e, r, i) => {
						X(a, V(t).label), Z(a, "placeholder", e), c.disabled = V(n) === 0, l.disabled = V(n) === (V(M).props.fields?.length ?? 0) - 1, Z(u, "title", r), Si(f, V(t).required === !0), G(p, ` ${i ?? ""}`);
					}, [
						() => Q("form.fieldNamePh"),
						() => Q("form.removeField"),
						() => Q("form.required")
					]), H("change", a, (e) => hn(V(n), { label: e.target.value.trim() || Q("form.fieldFallback") })), H("click", c, () => yn(V(n), -1)), H("click", l, () => yn(V(n), 1)), H("click", u, () => vn(V(n))), H("change", f, (e) => hn(V(n), { required: e.target.checked })), W(e, r);
				});
				var d = z(u, 2), f = R(d, !0), p = z(d, 2), m = I(p), h = z(m);
				Y(h), O(p);
				var g = z(p, 2), _ = I(g), y = z(_);
				Y(y), O(g), B((e, t, i, a, o, s, c, u) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), G(l, i), G(f, a), G(m, `${o ?? ""} `), X(h, V(M).props.submitLabel ?? ""), Z(h, "placeholder", s), G(_, `${c ?? ""} `), X(y, V(M).props.successText ?? ""), Z(y, "placeholder", u);
				}, [
					() => Q("form.modeTitle"),
					() => Q("form.mode"),
					() => Q("form.fields"),
					() => Q("form.addField"),
					() => Q("lbl.buttonText"),
					() => Q("form.sendDefault"),
					() => Q("form.receipt"),
					() => Q("form.thanksDefault")
				]), H("click", d, _n), H("change", h, (e) => F("submitLabel", e.target.value.trim() || Q("form.sendDefault"))), H("change", y, (e) => F("successText", e.target.value.trim() || Q("form.thanksDefault"))), W(e, t);
			}, a = (e) => {
				var t = Ku(), n = L(t), r = I(n), i = z(r);
				lt(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.view ?? "list"), t = /* @__PURE__ */ j(() => [
						["list", Q("calendar.viewList")],
						["cards", Q("calendar.viewCards")],
						["month", Q("calendar.viewMonth")],
						["next", Q("calendar.viewNext")]
					]);
					us(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("view", e)
					});
				}
				O(a);
				var c = z(a, 2), l = (e) => {
					var t = Gu(), n = I(t), r = z(n);
					Y(r), O(t), B((e, i) => {
						Z(t, "title", e), G(n, `${i ?? ""} `), X(r, V(M).props.limit ?? 6);
					}, [() => Q("tip.collection.limit"), () => Q("lbl.maxCount")]), H("change", r, (e) => F("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), W(e, t);
				};
				K(c, (e) => {
					((V(M).props.view ?? "list") === "list" || V(M).props.view === "cards") && e(l);
				});
				var u = z(c, 2), d = I(u);
				Y(d);
				var f = z(d);
				O(u);
				var p = z(u, 2), m = I(p);
				Y(m);
				var h = z(m);
				O(p), B((e, t, n, a, s, c) => {
					G(r, `${e ?? ""} `), Z(i, "placeholder", t), X(i, n), G(o, `${a ?? ""} `), Si(d, V(M).props.showCategories !== !1), G(f, ` ${s ?? ""}`), Si(m, V(M).props.showSubscribe !== !1), G(h, ` ${c ?? ""}`);
				}, [
					() => Q("calendar.sources"),
					() => Q("calendar.sourcesPh"),
					() => (V(M).props.sources ?? []).join("\n"),
					() => Q("lbl.view"),
					() => Q("calendar.showCategories"),
					() => Q("calendar.showSubscribe")
				]), H("change", i, (e) => xn(e.target.value)), H("change", d, (e) => F("showCategories", e.target.checked)), H("change", m, (e) => F("showSubscribe", e.target.checked)), W(e, t);
			}, o = (e) => {
				var t = Ju(), n = L(t), r = I(n);
				Y(r);
				var i = z(r);
				O(n);
				var a = z(n, 2), o = R(a, !0), s = z(a, 2);
				Jr(s, 17, () => V(M).props.items ?? [], Wr, (e, t, n) => {
					var r = qu(), i = I(r);
					Y(i);
					var a = z(i, 2), o = I(a);
					o.disabled = n === 0, q(o, () => v.up, !0), O(o);
					var s = z(o, 2);
					q(s, () => v.down, !0), O(s);
					var c = z(s, 2);
					q(c, () => v.cross, !0), O(c), O(a), O(r), B((e, r) => {
						X(i, V(t).q), Z(i, "title", e), s.disabled = n === (V(M).props.items?.length ?? 0) - 1, Z(c, "title", r);
					}, [() => Q("tip.faq.question"), () => Q("tip.faq.remove")]), H("change", i, (e) => Sn(n, { q: e.target.value })), H("click", o, () => Tn(n, -1)), H("click", s, () => Tn(n, 1)), H("click", c, () => wn(n)), W(e, r);
				});
				var c = z(s, 2), l = R(c, !0);
				B((e, t, a, s, c) => {
					Z(n, "title", e), Si(r, t), G(i, ` ${a ?? ""}`), G(o, s), G(l, c);
				}, [
					() => Q("tip.faq.multi"),
					() => !!V(M).props.multi,
					() => Q("lbl.faqMulti"),
					() => Q("lbl.questions"),
					() => Q("ui.addQuestion")
				]), H("change", r, (e) => F("multi", e.target.checked)), H("click", c, Cn), W(e, t);
			}, s = (e) => {
				var t = Xu(), n = L(t), r = R(n, !0), i = z(n, 2);
				Jr(i, 17, () => V(M).props.items ?? [], Wr, (e, t, n) => {
					var r = Yu(), i = L(r), a = I(i);
					Y(a);
					var o = z(a, 2);
					Y(o);
					var s = z(o, 2), c = I(s);
					c.disabled = n === 0, q(c, () => v.up, !0), O(c);
					var l = z(c, 2);
					q(l, () => v.down, !0), O(l);
					var u = z(l, 2);
					q(u, () => v.cross, !0), O(u), O(s), O(i);
					var d = z(i, 2);
					Y(d), B((e, r, i, s, c, f) => {
						X(a, V(t).year), Z(a, "placeholder", e), Z(a, "title", r), X(o, V(t).title), Z(o, "title", i), l.disabled = n === (V(M).props.items?.length ?? 0) - 1, Z(u, "title", s), X(d, V(t).text), Z(d, "placeholder", c), Z(d, "title", f);
					}, [
						() => Q("ph.tlYear"),
						() => Q("tip.timeline.year"),
						() => Q("tip.timeline.title"),
						() => Q("tip.timeline.remove"),
						() => Q("ph.tlText"),
						() => Q("tip.timeline.text")
					]), H("change", a, (e) => En(n, { year: e.target.value })), H("change", o, (e) => En(n, { title: e.target.value })), H("click", c, () => kn(n, -1)), H("click", l, () => kn(n, 1)), H("click", u, () => On(n)), H("change", d, (e) => En(n, { text: e.target.value })), W(e, r);
				});
				var a = z(i, 2), o = R(a, !0);
				B((e, t) => {
					G(r, e), G(o, t);
				}, [() => Q("lbl.timelineItems"), () => Q("ui.addTlItem")]), H("click", a, Dn), W(e, t);
			}, c = (e) => {
				var t = Zu(), n = L(t), r = I(n), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a);
				var c = z(a, 2), l = I(c), u = z(l);
				Y(u), O(c), B((e, t, n) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.text ?? ""), G(o, `${t ?? ""} `), X(s, V(M).props.attribution ?? ""), G(l, `${n ?? ""} `), X(u, V(M).props.role ?? "");
				}, [
					() => Q("lbl.quoteText"),
					() => Q("lbl.quoteName"),
					() => Q("lbl.quoteRole")
				]), H("change", i, (e) => F("text", e.target.value)), H("change", s, (e) => F("attribution", e.target.value)), H("change", u, (e) => F("role", e.target.value)), W(e, t);
			}, l = (e) => {
				var t = Qu(), n = L(t), r = I(n), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a);
				var c = z(a, 2), l = I(c), u = z(l);
				Y(u), O(c);
				var d = z(c, 2), f = I(d), p = z(f);
				Y(p), O(d), B((e, t, n, a, c) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.value ?? ""), Z(i, "title", t), G(o, `${n ?? ""} `), X(s, V(M).props.prefix ?? ""), G(l, `${a ?? ""} `), X(u, V(M).props.suffix ?? ""), G(f, `${c ?? ""} `), X(p, V(M).props.label ?? "");
				}, [
					() => Q("lbl.statValue"),
					() => Q("tip.stat.value"),
					() => Q("lbl.statPrefix"),
					() => Q("lbl.statSuffix"),
					() => Q("lbl.statLabel")
				]), H("change", i, (e) => F("value", e.target.value)), H("change", s, (e) => F("prefix", e.target.value)), H("change", u, (e) => F("suffix", e.target.value)), H("change", p, (e) => F("label", e.target.value)), W(e, t);
			}, u = (e) => {
				var t = $u(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2), o = R(a, !0);
				O(n);
				var s = z(n, 2), c = I(s), l = R(c, !0), u = z(c, 2), d = R(u, !0);
				O(s);
				var f = z(s, 2), p = I(f);
				Y(p);
				var m = z(p);
				O(f), B((e, t, n, r, a, s) => {
					G(i, e), G(o, t), G(l, n), G(d, r), Z(f, "title", a), Si(p, V(M).props.header !== !1), G(m, ` ${s ?? ""}`);
				}, [
					() => Q("ui.addRow"),
					() => Q("ui.removeRow"),
					() => Q("ui.addColumn"),
					() => Q("ui.removeColumn"),
					() => Q("tip.table.header"),
					() => Q("lbl.tableHeader")
				]), H("click", r, () => jn(1, 0)), H("click", a, () => jn(-1, 0)), H("click", c, () => jn(0, 1)), H("click", u, () => jn(0, -1)), H("change", p, (e) => F("header", e.target.checked)), W(e, t);
			}, d = (e) => {
				var t = Nr();
				Jr(L(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Q("opt.share.email")],
					["copy", Q("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = ed(), o = I(a);
					Y(o);
					var s = z(o);
					O(a), B((e) => {
						Si(o, e), G(s, ` ${i() ?? ""}`);
					}, [() => (V(M).props.services ?? []).includes(r())]), H("change", o, (e) => Mn(r(), e.target.checked)), W(e, a);
				}), W(e, t);
			}, f = (e) => {
				var t = td(), n = L(t), r = I(n), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a), B((e, t, n) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.target ?? ""), Z(a, "title", t), G(o, `${n ?? ""} `), X(s, V(M).props.doneText ?? "");
				}, [
					() => Q("lbl.countdownTarget"),
					() => Q("tip.countdown.done"),
					() => Q("lbl.countdownDone")
				]), H("change", i, (e) => F("target", e.target.value)), H("change", s, (e) => F("doneText", e.target.value)), W(e, t);
			}, p = (e) => {
				var t = rd(), n = L(t), r = I(n), i = z(r);
				O(n);
				var a = z(n, 2), o = (e) => {
					var t = nd(), n = R(t, !0);
					B((e) => G(n, e), [() => Q("ui.removeAudio")]), H("click", t, () => F("src", "")), W(e, t);
				};
				K(a, (e) => {
					V(M).props.src && e(o);
				});
				var s = z(a, 2), c = I(s), l = z(c);
				Y(l), O(s);
				var u = z(s, 2), d = I(u);
				Y(d);
				var f = z(d);
				O(u), B((e, t, i, a, o) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), G(c, `${i ?? ""} `), X(l, V(M).props.title ?? ""), Si(d, a), G(f, ` ${o ?? ""}`);
				}, [
					() => Q("tip.blocks.audioFile"),
					() => Q("ui.chooseAudio"),
					() => Q("lbl.audioTitle"),
					() => !!V(M).props.loop,
					() => Q("lbl.audioLoop")
				]), H("change", i, Nn), H("change", l, (e) => F("title", e.target.value)), H("change", d, (e) => F("loop", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = id(), n = L(t), r = I(n), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.page ?? "__href"), t = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.externalLink")]]);
					us(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							Xt(`edit:${V(M).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				O(a);
				var c = z(a, 2), l = (e) => {
					var t = Hu();
					Y(t), B((e) => {
						Z(t, "placeholder", e), X(t, V(M).props.href === "#" ? "" : V(M).props.href ?? "");
					}, [() => Q("ph.url")]), H("change", t, (e) => F("href", e.target.value || null)), W(e, t);
				};
				K(c, (e) => {
					V(M).props.page || e(l);
				}), B((e, t) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.label), G(o, `${t ?? ""} `);
				}, [() => Q("blocks.text"), () => Q("lbl.goesTo")]), H("change", i, (e) => F("label", e.target.value)), W(e, t);
			}, g = (e) => {
				var t = ad(), n = L(t), r = I(n), i = z(r);
				O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a);
				var c = z(a, 2), l = I(c), u = z(l);
				Y(u), O(c);
				var d = z(c, 2), f = (e) => {
					var t = ed(), n = I(t);
					Y(n);
					var r = z(n);
					O(t), B((e, i, a) => {
						Z(t, "title", e), Si(n, i), G(r, ` ${a ?? ""}`);
					}, [
						() => Q("tip.lightbox"),
						() => !!V(M).props.lightbox,
						() => Q("lbl.lightbox")
					]), H("change", n, (e) => F("lightbox", e.target.checked)), W(e, t);
				};
				K(d, (e) => {
					V(M).props.href || e(f);
				}), B((e, t, n, i, a) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), X(s, V(M).props.alt ?? ""), Z(s, "placeholder", n), G(l, `${i ?? ""} `), X(u, V(M).props.href ?? ""), Z(u, "placeholder", a);
				}, [
					() => Q("ui.changeImage"),
					() => Q("lbl.description"),
					() => Q("ph.altText"),
					() => Q("lbl.link"),
					() => Q("ph.optionalImageLink")
				]), H("change", i, Fn), H("change", s, (e) => F("alt", e.target.value)), H("change", u, (e) => F("href", e.target.value || null)), W(e, t);
			}, _ = (e) => {
				var t = od(), n = L(t), r = R(n, !0), i = z(n, 2);
				Y(i);
				var a = z(i, 2), o = I(a), s = z(o);
				Y(s), O(a), B((e, t, a, c) => {
					Z(n, "title", e), G(r, t), X(i, V(M).props.url ?? ""), Z(i, "placeholder", a), G(o, `${c ?? ""} `), X(s, V(M).props.title ?? "");
				}, [
					() => Q("hint.video"),
					() => Q("lbl.videoUrl"),
					() => Q("ph.videoUrl"),
					() => Q("lbl.videoTitle")
				]), H("change", i, (e) => F("url", e.target.value)), H("change", s, (e) => F("title", e.target.value)), W(e, t);
			}, y = (e) => {
				var t = ld(), n = L(t), r = I(n), i = z(r), a = I(i);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.glyph ?? "★"), t = /* @__PURE__ */ j(() => V(M).props.icon ?? null), n = /* @__PURE__ */ j(() => V(M).props.image ?? null);
					no(a, {
						get value() {
							return V(e);
						},
						get icon() {
							return V(t);
						},
						get image() {
							return V(n);
						},
						onpick: (e) => Xt(`edit:${V(M).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => Xt(`edit:${V(M).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => F("image", e)
					});
				}
				var o = z(a, 2), s = (e) => {
					var t = sd();
					Y(t), B((e) => {
						X(t, V(M).props.glyph ?? ""), Z(t, "title", e);
					}, [() => Q("tip.icon.typeGlyph")]), H("change", t, (e) => F("glyph", e.target.value || "★")), W(e, t);
				}, c = (e) => {
					var t = nd(), n = R(t, !0);
					B((e, r) => {
						Z(t, "title", e), G(n, r);
					}, [() => Q("tip.icon.backToGlyph"), () => Q("ui.removeDrawnIcon")]), H("click", t, () => F("icon", null)), W(e, t);
				};
				K(o, (e) => {
					V(M).props.icon ? e(c, -1) : e(s);
				}), O(i), O(n);
				var l = z(n, 2), u = (e) => {
					var t = cd(), n = I(t), r = z(n, 2), i = R(r, !0);
					O(t), B((e, r, a) => {
						Z(t, "title", e), Z(n, "src", V(M).props.image), Z(n, "alt", r), G(i, a);
					}, [
						() => Q("hint.icon.ownImage"),
						() => Q("gp.ownIcon"),
						() => Q("ui.removeOwnIcon")
					]), H("click", r, () => F("image", null)), W(e, t);
				};
				K(l, (e) => {
					V(M).props.image && e(u);
				}), B((e) => G(r, `${e ?? ""} `), [() => Q("blocks.icon")]), W(e, t);
			}, b = (e) => {
				var t = ud(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.collection ?? ""), t = /* @__PURE__ */ j(() => [["", Q("common.choose")], ...V(Zs).map((e) => [e, V(Qs)[e]?.name ?? e])]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("collection", e || null)
					});
				}
				O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a);
				var c = z(a, 2), l = I(c);
				Y(l);
				var u = z(l);
				O(c), B((e, t, i, c, d) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), Z(a, "title", i), G(o, `${c ?? ""} `), X(s, V(M).props.limit ?? 6), Si(l, V(M).props.newestFirst !== !1), G(u, ` ${d ?? ""}`);
				}, [
					() => Q("tip.collection.source"),
					() => Q("blocks.collection"),
					() => Q("tip.collection.limit"),
					() => Q("lbl.maxCount"),
					() => Q("lbl.newestFirst")
				]), H("change", s, (e) => F("limit", Number(e.target.value))), H("change", l, (e) => F("newestFirst", e.target.checked)), W(e, t);
			}, x = (e) => {
				var t = pd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.collection ?? ""), t = /* @__PURE__ */ j(() => [["", Q("common.choose")], ...V(Zs).filter((e) => V(Qs)[e]?.kind === "products").map((e) => [e, V(Qs)[e]?.name ?? e])]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("collection", e || null)
					});
				}
				O(n);
				var a = z(n, 2), o = (e) => {
					var t = dd(), n = I(t), r = R(n, !0), i = z(n, 2), a = R(i, !0);
					O(t), B((e, t, o, s) => {
						Z(n, "title", e), G(r, t), Z(i, "title", o), G(a, s);
					}, [
						() => Q("tip.product.addProduct"),
						() => Q("ui.addProduct"),
						() => Q("tip.product.editCatalog"),
						() => Q("ui.editCatalog")
					]), H("click", n, () => Fc(V(M).props.collection)), H("click", i, () => {
						P($s, V(M).props.collection, !0), P(kt, "collections");
					}), W(e, t);
				}, s = (e) => {
					var t = fd(), n = R(t, !0);
					B((e, r) => {
						Z(t, "title", e), G(n, r);
					}, [() => Q("tip.product.createCatalog"), () => Q("ui.createCatalog")]), H("click", t, Nc), W(e, t);
				}, c = /* @__PURE__ */ j(() => !V(Zs).some((e) => V(Qs)[e]?.kind === "products"));
				K(a, (e) => {
					V(M).props.collection && V(Qs)[V(M).props.collection]?.kind === "products" ? e(o) : V(c) && e(s, 1);
				});
				var l = z(a, 2), u = I(l), d = z(u);
				Y(d), O(l);
				var f = z(l, 2), p = I(f), m = z(p);
				Y(m), O(f), B((e, t, i, a, o, s) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), Z(l, "title", i), G(u, `${a ?? ""} `), X(d, V(M).props.limit ?? 0), Z(f, "title", o), G(p, `${s ?? ""} `), X(m, V(M).props.currency ?? "kr");
				}, [
					() => Q("tip.product.source"),
					() => Q("blocks.collection"),
					() => Q("tip.collection.limit"),
					() => Q("lbl.maxCount"),
					() => Q("tip.product.currency"),
					() => Q("lbl.currency")
				]), H("change", d, (e) => F("limit", Number(e.target.value))), H("change", m, (e) => F("currency", e.target.value)), W(e, t);
			}, S = (e) => {
				var t = md(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.href ?? ""), t = /* @__PURE__ */ j(() => [["", Q("common.none")], ...V(A).pages.map((e) => [e.path, e.title])]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("href", e)
					});
				}
				O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a), B((e, t, i, c) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), Z(a, "title", i), G(o, `${c ?? ""} `), X(s, V(M).props.currency ?? "kr");
				}, [
					() => Q("tip.cart.checkout"),
					() => Q("lbl.checkoutPage"),
					() => Q("tip.product.currency"),
					() => Q("lbl.currency")
				]), H("change", s, (e) => F("currency", e.target.value)), W(e, t);
			}, C = (e) => {
				var t = hd(), n = L(t), r = I(n), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a);
				var c = z(a, 2), l = I(c), u = z(l);
				Y(u), O(c);
				var d = z(c, 2), f = I(d);
				Y(f);
				var p = z(f);
				O(d);
				var m = z(d, 2), h = I(m), g = z(h);
				Y(g), O(m), B((e, t, _, v, y, b, x, S, C, w) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(M).props.recipient ?? ""), Z(a, "title", _), G(o, `${v ?? ""} `), X(s, V(M).props.endpoint ?? ""), Z(c, "title", y), G(l, `${b ?? ""} `), X(u, V(M).props.vipps ?? ""), Z(d, "title", x), Si(f, V(M).props.vippsCheckout === !0), G(p, ` ${S ?? ""}`), Z(m, "title", C), G(h, `${w ?? ""} `), X(g, V(M).props.currency ?? "kr");
				}, [
					() => Q("tip.checkout.recipient"),
					() => Q("lbl.recipientEmail"),
					() => Q("tip.checkout.endpoint"),
					() => Q("lbl.endpointUrl"),
					() => Q("tip.checkout.vipps"),
					() => Q("lbl.vippsNumber"),
					() => Q("tip.checkout.vippsCheckout"),
					() => Q("lbl.vippsCheckout"),
					() => Q("tip.product.currency"),
					() => Q("lbl.currency")
				]), H("change", i, (e) => F("recipient", e.target.value.trim())), H("change", s, (e) => F("endpoint", e.target.value.trim())), H("change", u, (e) => F("vipps", e.target.value.trim())), H("change", f, (e) => F("vippsCheckout", e.target.checked)), H("change", g, (e) => F("currency", e.target.value)), W(e, t);
			}, w = (e) => {
				var t = _d(), n = L(t), r = I(n), i = z(r);
				O(n), Jr(z(n, 2), 17, () => V(M).props.images ?? [], Wr, (e, t, n) => {
					var r = gd(), i = I(r), a = I(i), o = z(a, 2), s = I(o);
					s.disabled = n === 0, q(s, () => v.up, !0), O(s);
					var c = z(s, 2);
					q(c, () => v.down, !0), O(c);
					var l = z(c, 2);
					q(l, () => v.cross, !0), O(l), O(o), O(i);
					var u = z(i, 2), d = I(u), f = z(d);
					Y(f), O(u);
					var p = z(u, 2), m = I(p), h = z(m);
					Y(h), O(p), O(r), B((e, r, o, s, u, p) => {
						Z(i, "title", e), Z(a, "src", V(t).src), c.disabled = n === V(M).props.images.length - 1, Z(l, "title", r), G(d, `${o ?? ""} `), X(f, V(t).alt ?? ""), Z(f, "placeholder", s), G(m, `${u ?? ""} `), X(h, V(t).href ?? ""), Z(h, "placeholder", p);
					}, [
						() => Q("hint.gallery"),
						() => Q("tip.removeImage"),
						() => Q("lbl.description"),
						() => Q("ph.altShort"),
						() => Q("lbl.link"),
						() => Q("ph.galleryHref")
					]), H("click", s, () => yg(n, -1)), H("click", c, () => yg(n, 1)), H("click", l, () => bg(n)), H("change", f, (e) => xg(n, "alt", e.target.value)), H("change", h, (e) => xg(n, "href", e.target.value || null)), W(e, r);
				}), B((e, t) => {
					Z(n, "title", e), G(r, `${t ?? ""} `);
				}, [() => Q("tip.gallery.addImages"), () => Q("ui.addImages")]), H("change", i, _g), W(e, t);
			}, T = (e) => {
				var t = Iu(), n = I(t);
				us(z(n), {
					get value() {
						return V(M).props.kind;
					},
					get options() {
						return Rn;
					},
					onchange: (e) => F("kind", e)
				}), O(t), B((e) => G(n, `${e ?? ""} `), [() => Q("blocks.shape")]), W(e, t);
			}, ee = (e) => {
				let t = /* @__PURE__ */ j(() => cg[V(M).type] ?? V(sg).find((e) => e.type === V(M).type)?.fields ?? []);
				var n = Nr(), r = L(n), i = (e) => {
					var n = Nr();
					Jr(L(n), 17, () => V(t), (e) => e.key, (e, t) => {
						var n = Nr(), r = L(n), i = (e) => {
							let n = /* @__PURE__ */ j(() => `${V(M).blockId}:${V(t).key}`);
							var r = yd(), i = L(r), a = I(i), o = z(a);
							Y(o), O(i);
							var s = z(i, 2), c = R(s, !0), l = z(s, 2), u = (e) => {
								var t = vd();
								let r;
								var i = R(t, !0);
								B(() => {
									r = J(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": an[V(n)].err }), G(i, an[V(n)].text);
								}), W(e, t);
							};
							K(l, (e) => {
								an[V(n)] && e(u);
							}), B((e) => {
								G(a, `${V(t).label ?? ""} `), Z(o, "placeholder", V(t).placeholder), X(o, rn[V(n)] ?? V(M).props[V(t).key] ?? ""), s.disabled = V(on), G(c, e);
							}, [() => Q("props.place.search")]), H("input", o, (e) => {
								rn[V(n)] = e.target.value;
							}), H("keydown", o, (e) => {
								e.key === "Enter" && ln(V(t));
							}), H("click", s, () => ln(V(t))), W(e, r);
						}, a = (e) => {
							var n = bd(), r = I(n), i = z(r);
							Y(i), O(n), B(() => {
								G(r, `${V(t).label ?? ""} `), Z(i, "min", V(t).min), Z(i, "max", V(t).max), Z(i, "step", V(t).step ?? 1), X(i, V(M).props[V(t).key]);
							}), H("change", i, (e) => F(V(t).key, cn(V(t), Number(e.target.value)))), W(e, n);
						}, o = (e) => {
							var n = ed(), r = I(n);
							Y(r);
							var i = z(r);
							O(n), B((e) => {
								Si(r, e), G(i, ` ${V(t).label ?? ""}`);
							}, [() => !!V(M).props[V(t).key]]), H("change", r, (e) => F(V(t).key, e.target.checked)), W(e, n);
						}, s = (e) => {
							var n = Iu(), r = I(n), i = z(r);
							{
								let e = /* @__PURE__ */ j(() => (V(t).options ?? []).map((e) => [e.value, e.label]));
								us(i, {
									get value() {
										return V(M).props[V(t).key];
									},
									get options() {
										return V(e);
									},
									onchange: (e) => F(V(t).key, e)
								});
							}
							O(n), B(() => G(r, `${V(t).label ?? ""} `)), W(e, n);
						}, c = (e) => {
							var n = xd(), r = I(n), i = z(r);
							Y(i), O(n), B(() => {
								G(r, `${V(t).label ?? ""} `), Z(i, "placeholder", V(t).placeholder), X(i, V(M).props[V(t).key] ?? "");
							}), H("change", i, (e) => F(V(t).key, e.target.value)), W(e, n);
						};
						K(r, (e) => {
							V(t).type === "place" ? e(i) : V(t).type === "number" ? e(a, 1) : V(t).type === "toggle" ? e(o, 2) : V(t).type === "select" ? e(s, 3) : e(c, -1);
						}), W(e, n);
					}), W(e, n);
				}, a = (e) => {
					var t = nd(), n = R(t, !0);
					B((e, r) => {
						Z(t, "title", e), G(n, r);
					}, [() => Q("hint.pluginBlock"), () => Q("ui.settings")]), H("click", t, () => Ue?.sendOpenConfig(V(M).blockId)), W(e, t);
				};
				K(r, (e) => {
					V(t).length ? e(i) : e(a, -1);
				}), W(e, n);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "form" ? e(i, 1) : V(M).type === "calendar" ? e(a, 2) : V(M).type === "faq" ? e(o, 3) : V(M).type === "timeline" ? e(s, 4) : V(M).type === "quote" ? e(c, 5) : V(M).type === "stats" ? e(l, 6) : V(M).type === "table" ? e(u, 7) : V(M).type === "share" ? e(d, 8) : V(M).type === "countdown" ? e(f, 9) : V(M).type === "audio" ? e(p, 10) : V(M).type === "button" ? e(m, 11) : V(M).type === "image" ? e(g, 12) : V(M).type === "video" ? e(_, 13) : V(M).type === "icon" ? e(y, 14) : V(M).type === "collection" ? e(b, 15) : V(M).type === "product" ? e(x, 16) : V(M).type === "cart" ? e(S, 17) : V(M).type === "checkout" ? e(C, 18) : V(M).type === "gallery" ? e(w, 19) : V(M).type === "shape" ? e(T, 20) : e(ee, -1);
			}), W(e, t);
		}, p = (e) => {
			var t = Gd(), n = L(t), r = (e) => {
				var t = Sd(), n = L(t), r = I(n), a = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.align ?? "left"), t = /* @__PURE__ */ j(() => [
						["left", Q("common.left")],
						["center", Q("common.center")],
						["right", Q("common.right")]
					]);
					us(a, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("align", e)
					});
				}
				O(n);
				var o = z(n, 2), s = I(o);
				Y(s);
				var c = z(s);
				O(o);
				var l = z(o, 2), u = (e) => {
					i(e);
				};
				K(l, (e) => {
					V(M).props.box && e(u);
				}), De(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), Si(s, t), G(c, ` ${n ?? ""}`);
				}, [
					() => Q("lbl.align"),
					() => !!V(M).props.box,
					() => Q("lbl.textBoxToggle")
				]), H("change", s, (e) => F("box", e.target.checked)), W(e, t);
			}, a = (e) => {
				var t = Cd(), n = L(t), r = R(n, !0), a = z(n, 2);
				i(a), De(2), B((e) => G(r, e), [() => Q("lbl.cardStyle")]), W(e, t);
			}, o = (e) => {
				var t = wd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.variant ?? "left"), t = /* @__PURE__ */ j(() => [["left", Q("opt.timeline.left")], ["alternating", Q("opt.timeline.alternating")]]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.marker ?? "filled"), t = /* @__PURE__ */ j(() => [["filled", Q("opt.timeline.filled")], ["ring", Q("opt.timeline.ring")]]);
					us(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("marker", e)
					});
				}
				O(a);
				var c = z(a, 2), l = I(c), u = z(l);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ j(Gr);
					ha(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => F("accent", e === "accent" ? null : e)
					});
				}
				O(c), De(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `);
				}, [
					() => Q("lbl.variant"),
					() => Q("lbl.timelineMarker"),
					() => Q("lbl.color")
				]), W(e, t);
			}, s = (e) => {
				var t = Ed(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.variant ?? "large"), t = /* @__PURE__ */ j(() => [["large", Q("opt.quote.large")], ["short", Q("opt.quote.short")]]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				O(n);
				var a = z(n, 2), o = (e) => {
					var t = Td(), n = L(t), r = I(n), i = z(r);
					O(n);
					var a = z(n, 2), o = (e) => {
						var t = nd(), n = R(t, !0);
						B((e) => G(n, e), [() => Q("ui.quotePortraitRemove")]), H("click", t, () => F("image", "")), W(e, t);
					};
					K(a, (e) => {
						V(M).props.image && e(o);
					}), B((e) => G(r, `${e ?? ""} `), [() => Q("ui.quotePortrait")]), H("change", i, In), W(e, t);
				};
				K(a, (e) => {
					V(M).props.variant === "short" && e(o);
				});
				var s = z(a, 2), c = I(s), l = z(c);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ j(Gr);
					ha(l, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => F("accent", e === "accent" ? null : e)
					});
				}
				O(s), De(2), B((e, t) => {
					G(r, `${e ?? ""} `), G(c, `${t ?? ""} `);
				}, [() => Q("lbl.variant"), () => Q("lbl.color")]), W(e, t);
			}, c = (e) => {
				var t = Dd(), n = L(t), r = I(n);
				Y(r);
				var i = z(r);
				O(n), De(2), B((e, t) => {
					Z(n, "title", e), Si(r, V(M).props.countUp !== !1), G(i, ` ${t ?? ""}`);
				}, [() => Q("tip.stat.countUp"), () => Q("lbl.statCountUp")]), H("change", r, (e) => F("countUp", e.target.checked)), W(e, t);
			}, l = (e) => {
				var t = Od(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.lines ?? "rows"), t = /* @__PURE__ */ j(() => [
						["rows", Q("opt.table.rows")],
						["grid", Q("opt.table.grid")],
						["none", Q("common.none")]
					]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("lines", e)
					});
				}
				O(n);
				var a = z(n, 2), o = I(a);
				Y(o);
				var s = z(o);
				O(a), De(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), Si(o, t), G(s, ` ${n ?? ""}`);
				}, [
					() => Q("lbl.tableLines"),
					() => !!V(M).props.striped,
					() => Q("lbl.tableStriped")
				]), H("change", o, (e) => F("striped", e.target.checked)), W(e, t);
			}, u = (e) => {
				var t = kd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.variant ?? "icons"), t = /* @__PURE__ */ j(() => [["icons", Q("opt.share.icons")], ["labels", Q("opt.share.labels")]]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a);
				var c = z(a, 2), l = I(c), u = z(l);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.color || "accent"), t = /* @__PURE__ */ j(Gr);
					ha(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => F("color", e === "accent" ? "" : e)
					});
				}
				O(c), De(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), X(s, V(M).props.size ?? 38), G(l, `${n ?? ""} `);
				}, [
					() => Q("lbl.variant"),
					() => Q("lbl.size"),
					() => Q("lbl.color")
				]), H("change", s, (e) => F("size", Number(e.target.value) || 38)), W(e, t);
			}, d = (e) => {
				var t = Od(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.variant ?? "boxes"), t = /* @__PURE__ */ j(() => [["boxes", Q("opt.countdown.boxes")], ["plain", Q("opt.countdown.plain")]]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				O(n);
				var a = z(n, 2), o = I(a);
				Y(o);
				var s = z(o);
				O(a), De(2), B((e, t) => {
					G(r, `${e ?? ""} `), Si(o, V(M).props.showSeconds !== !1), G(s, ` ${t ?? ""}`);
				}, [() => Q("lbl.variant"), () => Q("lbl.countdownSeconds")]), H("change", o, (e) => F("showSeconds", e.target.checked)), W(e, t);
			}, f = (e) => {
				var t = Ad(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => [["primary", Q("opt.btn.primary")], ["secondary", Q("opt.btn.secondary")]]);
					us(i, {
						get value() {
							return V(M).props.style;
						},
						get options() {
							return V(e);
						},
						onchange: (e) => F("style", e)
					});
				}
				O(n), De(2), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.style")]), W(e, t);
			}, p = (e) => {
				var t = jd(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.fit ?? "cover"), t = /* @__PURE__ */ j(() => [["cover", Q("opt.fitFrame.cover")], ["contain", Q("opt.fitFrame.contain")]]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("fit", e)
					});
				}
				O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ j(() => [
						["", Q("common.none")],
						["sm", Q("opt.size.sm")],
						["md", Q("opt.radius.md")]
					]);
					us(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("radius", e || null)
					});
				}
				O(a);
				var c = z(a, 2), l = I(c), u = R(z(l));
				O(c);
				var d = z(c, 2);
				Y(d);
				var f = z(d, 2), p = I(f), m = R(z(p));
				O(f);
				var h = z(f, 2);
				Y(h);
				var g = z(h, 2), _ = I(g), v = R(z(_));
				O(g);
				var y = z(g, 2);
				Y(y);
				var b = z(y, 2), x = I(b), S = R(z(x));
				O(b);
				var C = z(b, 2);
				Y(C);
				var w = z(C, 2), T = I(w), ee = R(z(T));
				O(w);
				var te = z(w, 2);
				Y(te);
				var ne = z(te, 2), re = I(ne), E = R(z(re));
				O(ne);
				var D = z(ne, 2);
				Y(D);
				var ie = z(D, 2), ae = R(ie, !0);
				De(2), B((e, t, n, i, a, s, c, f, b, w, ne, oe, se, ce, le, ue, de) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `), G(u, `${i ?? ""}%`), X(d, V(M).props.x ?? .5), G(p, `${a ?? ""} `), G(m, `${s ?? ""}%`), X(h, V(M).props.y ?? .5), Z(g, "title", c), G(_, `${f ?? ""} `), G(v, `${b ?? ""}x`), X(y, V(M).props.zoom ?? 1), G(x, `${w ?? ""} `), G(S, `${ne ?? ""}%`), X(C, V(M).props.brightness ?? 1), G(T, `${oe ?? ""} `), G(ee, `${se ?? ""}%`), X(te, V(M).props.contrast ?? 1), G(re, `${ce ?? ""} `), G(E, `${le ?? ""}%`), X(D, V(M).props.saturate ?? 1), Z(ie, "title", ue), G(ae, de);
				}, [
					() => Q("lbl.fit"),
					() => Q("lbl.radius"),
					() => Q("lbl.focusX"),
					() => Math.round((V(M).props.x ?? .5) * 100),
					() => Q("lbl.focusY"),
					() => Math.round((V(M).props.y ?? .5) * 100),
					() => Q("tip.zoomCrop"),
					() => Q("lbl.zoom"),
					() => (V(M).props.zoom ?? 1).toFixed(2),
					() => Q("lbl.brightness"),
					() => Math.round((V(M).props.brightness ?? 1) * 100),
					() => Q("lbl.contrast"),
					() => Math.round((V(M).props.contrast ?? 1) * 100),
					() => Q("lbl.saturate"),
					() => Math.round((V(M).props.saturate ?? 1) * 100),
					() => Q("tip.resetAdjust"),
					() => Q("ui.resetAdjust")
				]), H("input", d, (e) => F("x", Number(e.target.value))), H("input", h, (e) => F("y", Number(e.target.value))), H("input", y, (e) => F("zoom", Number(e.target.value))), H("input", C, (e) => F("brightness", Number(e.target.value))), H("input", te, (e) => F("contrast", Number(e.target.value))), H("input", D, (e) => F("saturate", Number(e.target.value))), H("click", ie, () => Xt(`edit:${V(M).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), W(e, t);
			}, m = (e) => {
				var t = Md(), n = L(t), r = I(n), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.color ?? "accent"), t = /* @__PURE__ */ j(Gr);
					ha(s, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => F("color", e)
					});
				}
				O(a), De(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.size ?? 48), Z(a, "title", t), G(o, `${n ?? ""} `);
				}, [
					() => Q("lbl.sizePx"),
					() => Q("hint.icon.color"),
					() => Q("lbl.color")
				]), H("change", i, (e) => F("size", Number(e.target.value))), W(e, t);
			}, h = (e) => {
				var t = Ad(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.view ?? "cards"), t = /* @__PURE__ */ j(() => [
						["cards", Q("opt.collectionView.cards")],
						["list", Q("opt.collectionView.list")],
						["archive", Q("opt.collectionView.archive")]
					]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("view", e)
					});
				}
				O(n), De(2), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.view")]), W(e, t);
			}, g = (e) => {
				var t = Nd(), n = L(t), r = I(n), i = z(r);
				Y(i), O(n), De(2), B((e, t) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(M).props.columns ?? 0);
				}, [() => Q("tip.product.columns"), () => Q("lbl.columns")]), H("change", i, (e) => F("columns", Number(e.target.value))), W(e, t);
			}, _ = (e) => {
				var t = Ad(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.variant ?? "button"), t = /* @__PURE__ */ j(() => [["button", Q("opt.cart.button")], ["icon", Q("opt.cart.icon")]]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("variant", e)
					});
				}
				O(n), De(2), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.view")]), W(e, t);
			}, v = (e) => {
				var t = Id(), n = L(t), r = I(n), i = z(r);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.view ?? "grid"), t = /* @__PURE__ */ j(() => [
						["grid", Q("opt.galleryView.grid")],
						["carousel", Q("opt.galleryView.carousel")],
						["slides", Q("opt.galleryView.slides")]
					]);
					us(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("view", e)
					});
				}
				O(n);
				var a = z(n, 2), o = (e) => {
					var t = Pd(), n = L(t), r = I(n), i = z(r);
					Y(i), O(n);
					var a = z(n, 2), o = I(a), s = R(z(o));
					O(a);
					var c = z(a, 2);
					Y(c), B((e, t) => {
						G(r, `${e ?? ""} `), X(i, V(M).props.columns ?? 3), G(o, `${t ?? ""} `), G(s, `${V(M).props.gap ?? 12 ?? ""} px`), X(c, V(M).props.gap ?? 12);
					}, [() => Q("lbl.columns"), () => Q("lbl.imageGap")]), H("change", i, (e) => F("columns", Number(e.target.value))), H("input", c, (e) => F("gap", Number(e.target.value))), W(e, t);
				};
				K(a, (e) => {
					(V(M).props.view ?? "grid") === "grid" && e(o);
				});
				var s = z(a, 2), c = (e) => {
					var t = Fd(), n = I(t), r = z(n);
					Y(r), O(t), B((e) => {
						G(n, `${e ?? ""} `), X(r, V(M).props.interval ?? 5);
					}, [() => Q("lbl.secondsPerImage")]), H("change", r, (e) => F("interval", Number(e.target.value))), W(e, t);
				};
				K(s, (e) => {
					V(M).props.view === "slides" && e(c);
				});
				var l = z(s, 2), u = I(l), d = z(u);
				{
					let e = /* @__PURE__ */ j(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ j(() => [
						["", Q("common.none")],
						["sm", Q("opt.size.sm")],
						["md", Q("opt.radius.md")]
					]);
					us(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => F("radius", e || null)
					});
				}
				O(l);
				var f = z(l, 2), p = I(f);
				Y(p);
				var m = z(p);
				O(f), De(2), B((e, t, n, i) => {
					G(r, `${e ?? ""} `), G(u, `${t ?? ""} `), Z(f, "title", n), Si(p, V(M).props.lightbox !== !1), G(m, ` ${i ?? ""}`);
				}, [
					() => Q("lbl.view"),
					() => Q("lbl.radius"),
					() => Q("tip.lightbox"),
					() => Q("lbl.lightbox")
				]), H("change", p, (e) => F("lightbox", e.target.checked)), W(e, t);
			}, y = (e) => {
				var t = Rd(), n = L(t), r = I(n);
				us(z(r), {
					get value() {
						return V(M).props.color;
					},
					get options() {
						return zn;
					},
					onchange: (e) => F("color", e)
				}), O(n);
				var i = z(n, 2), a = I(i), o = z(a);
				Y(o), O(i);
				var s = z(i, 2), c = (e) => {
					var t = Ld(), n = I(t), r = z(n);
					Y(r), O(t), B((e, t) => {
						G(n, `${e ?? ""} `), Z(r, "max", t), X(r, V(M).frame.w);
					}, [() => Q("lbl.length"), () => Math.max(1, Math.round(100 - V(M).frame.x))]), H("change", r, (e) => un("w", Math.max(1, Math.min(Number(e.target.value), 100 - V(M).frame.x)))), W(e, t);
				};
				K(s, (e) => {
					(V(M).props.kind === "line" || V(M).props.kind === "arrow") && e(c);
				});
				var l = z(s, 2), u = I(l);
				Y(u);
				var d = z(u);
				O(l), De(2), B((e, t, n, i, s) => {
					G(r, `${e ?? ""} `), G(a, `${t ?? ""} `), X(o, V(M).props.thickness), Z(l, "title", n), Si(u, i), G(d, ` ${s ?? ""}`);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.thickness"),
					() => Q("tip.shape.fill"),
					() => !!V(M).props.fill,
					() => Q("lbl.filled")
				]), H("change", o, (e) => F("thickness", Number(e.target.value))), H("change", u, (e) => F("fill", e.target.checked ? V(M).props.color : null)), W(e, t);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "faq" ? e(a, 1) : V(M).type === "timeline" ? e(o, 2) : V(M).type === "quote" ? e(s, 3) : V(M).type === "stats" ? e(c, 4) : V(M).type === "table" ? e(l, 5) : V(M).type === "share" ? e(u, 6) : V(M).type === "countdown" ? e(d, 7) : V(M).type === "button" ? e(f, 8) : V(M).type === "image" ? e(p, 9) : V(M).type === "icon" ? e(m, 10) : V(M).type === "collection" ? e(h, 11) : V(M).type === "product" ? e(g, 12) : V(M).type === "cart" ? e(_, 13) : V(M).type === "gallery" ? e(v, 14) : V(M).type === "shape" && e(y, 15);
			});
			var b = z(n, 2), x = I(b), S = z(x);
			{
				let e = /* @__PURE__ */ j(() => V(M).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ j(() => Qt.has(V(M).type) ? [["wrap", Q("opt.fit.fluid")], ["shrink", Q("opt.fit.floor")]] : [["wrap", Q("opt.fit.wrap")], ["shrink", Q("opt.fit.shrink")]]);
				us(S, {
					get value() {
						return V(e);
					},
					get options() {
						return V(t);
					},
					onchange: (e) => tn(e)
				});
			}
			O(b);
			var C = z(b, 2), w = (e) => {
				var t = zd(), n = I(t), r = R(n, !0), i = z(n, 2);
				Y(i);
				var a = R(z(i, 2));
				O(t), B((e, n, o, s) => {
					Z(t, "title", e), G(r, n), X(i, o), G(a, `${s ?? ""} %`);
				}, [
					() => Q("tip.fitMin"),
					() => Q("lbl.fitMin"),
					() => Math.round((V(M).fitMin ?? .6) * 100),
					() => Math.round((V(M).fitMin ?? .6) * 100)
				]), H("input", i, (e) => nn(e.target.valueAsNumber / 100)), W(e, t);
			};
			K(C, (e) => {
				V(M).fit === "shrink" && e(w);
			});
			var T = z(C, 4), ee = I(T), te = z(ee);
			{
				let e = /* @__PURE__ */ j(() => ei(V(M).animation) ? V(M).animation.type : "");
				us(te, {
					get value() {
						return V(e);
					},
					get options() {
						return ni;
					},
					onchange: (e) => ai(e || null)
				});
			}
			O(T);
			var ne = z(T, 2), re = (e) => {
				var t = Bd(), n = L(t), r = I(n), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a), B((e, t) => {
					G(r, `${e ?? ""} `), X(i, V(M).animation.props.duration), G(o, `${t ?? ""} `), X(s, V(M).animation.props.delay);
				}, [() => Q("lbl.durationMs"), () => Q("lbl.delayMs")]), H("change", i, (e) => si("duration", Number(e.target.value))), H("change", s, (e) => si("delay", Number(e.target.value))), W(e, t);
			}, E = /* @__PURE__ */ j(() => ei(V(M).animation));
			K(ne, (e) => {
				V(E) && e(re);
			});
			var D = z(ne, 2), ie = I(D), ae = z(ie);
			{
				let e = /* @__PURE__ */ j(() => V(M).hover?.type ?? (V(M).animation && !ei(V(M).animation) ? V(M).animation.type : ""));
				us(ae, {
					get value() {
						return V(e);
					},
					get options() {
						return ri;
					},
					onchange: (e) => oi(e || null)
				});
			}
			O(D);
			var oe = z(D, 2), se = (e) => {
				var t = Ud(), n = z(L(t), 2), r = I(n);
				Y(r);
				var i = z(r);
				O(n);
				var a = z(n, 2), o = (e) => {
					var t = Hd(), n = L(t), r = I(n), i = z(r);
					{
						let e = /* @__PURE__ */ j(() => V(M).sticky.mode ?? "scroll"), t = /* @__PURE__ */ j(() => [["scroll", Q("opt.sticky.modeScroll")], ["screen", Q("opt.sticky.modeScreen")]]);
						us(i, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Xt(`edit:${V(M).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					O(n);
					var a = z(n, 2), o = (e) => {
						var t = Vd(), n = I(t), r = z(n);
						Y(r), O(t), B((e, i) => {
							Z(t, "title", e), G(n, `${i ?? ""} `), X(r, V(M).sticky.offset ?? 16);
						}, [() => V(M).sticky.mode === "screen" ? Q("tip.stickyEdge") : Q("tip.stickyOffset"), () => V(M).sticky.mode === "screen" ? Q("lbl.stickyEdge") : Q("lbl.stickyOffset")]), H("change", r, (e) => Xt(`edit:${V(M).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), W(e, t);
					};
					K(a, (e) => {
						(V(M).sticky.mode !== "screen" || (V(M).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = z(a, 2), c = (e) => {
						var t = Iu(), n = I(t), r = z(n);
						{
							let e = /* @__PURE__ */ j(() => V(M).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ j(() => qt.map(([e, t]) => [e, Q(t)]));
							us(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Xt(`edit:${V(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						O(t), B((e, r) => {
							Z(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Q("tip.stickyDock"), () => Q("lbl.stickyDock")]), W(e, t);
					}, l = (e) => {
						var t = Iu(), n = I(t), r = z(n);
						{
							let e = /* @__PURE__ */ j(() => V(M).sticky.until ?? ""), t = /* @__PURE__ */ j(Jt);
							us(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Xt(`edit:${V(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						O(t), B((e, r) => {
							Z(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Q("tip.stickyUntil"), () => Q("lbl.stickyUntil")]), W(e, t);
					};
					K(s, (e) => {
						V(M).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), B((e, t) => {
						Z(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Q("tip.stickyMode"), () => Q("lbl.stickyMode")]), W(e, t);
				};
				K(a, (e) => {
					V(M).sticky && e(o);
				}), B((e, t, a) => {
					Z(n, "title", e), Si(r, t), G(i, ` ${a ?? ""}`);
				}, [
					() => Q("tip.sticky"),
					() => !!V(M).sticky,
					() => Q("lbl.sticky")
				]), H("change", r, (e) => Xt(`edit:${V(M).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), W(e, t);
			};
			K(oe, (e) => {
				V(be) === "desktop" && e(se);
			});
			var ce = z(oe, 4), le = I(ce), ue = R(le, !0), de = z(le, 2), fe = I(de), pe = (e) => {
				var t = Wd(), n = I(t), r = I(n, !0), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a, !0), s = z(o);
				Y(s), O(a);
				var c = z(a, 2), l = I(c, !0), u = z(l);
				Y(u), O(c);
				var d = z(c, 2), f = I(d, !0), p = z(f);
				Y(p), O(d);
				var m = z(d, 2), h = I(m, !0), g = z(h);
				Y(g), O(m);
				var _ = z(m, 2), v = I(_, !0), y = z(v);
				Y(y), O(_), O(t), B((e, t, n, a, c, d, _) => {
					G(r, e), X(i, V(M).frame.x), G(o, t), X(s, V(M).frame.y), G(l, n), X(u, V(M).frame.w), G(f, a), X(p, V(M).frame.h), Z(m, "title", c), G(h, d), X(g, V(M).frame.z ?? 1), G(v, _), X(y, V(M).frame.rot ?? 0);
				}, [
					() => Q("frame.x"),
					() => Q("frame.y"),
					() => Q("frame.w"),
					() => Q("frame.h"),
					() => Q("tip.frameZ"),
					() => Q("frame.z"),
					() => Q("frame.rot")
				]), H("change", i, (e) => un("x", Number(e.target.value))), H("change", s, (e) => un("y", Number(e.target.value))), H("change", u, (e) => un("w", Number(e.target.value))), H("change", p, (e) => un("h", Number(e.target.value))), H("change", g, (e) => un("z", Number(e.target.value))), H("change", y, (e) => un("rot", Number(e.target.value))), W(e, t);
			};
			K(fe, (e) => {
				V(be) === "desktop" && e(pe);
			});
			var me = z(fe, 2), he = I(me);
			Y(he);
			var ge = z(he);
			O(me);
			var _e = z(me, 2), ve = I(_e);
			Y(ve);
			var ye = z(ve);
			O(_e), O(de), O(ce), B((e, t, n, r, i, a, o, s, c, l, u, d) => {
				Z(b, "title", e), G(x, `${t ?? ""} `), Z(T, "title", n), G(ee, `${r ?? ""} `), Z(D, "title", i), G(ie, `${a ?? ""} `), Z(le, "title", o), G(ue, s), Z(me, "title", c), Si(he, V(M).hideMobile), G(ge, ` ${l ?? ""}`), Z(_e, "title", u), Si(ve, V(M).decor), G(ye, ` ${d ?? ""}`);
			}, [
				() => Q("tip.fit"),
				() => Q("lbl.fit"),
				() => Q("tip.props.blockAnim"),
				() => Q("lbl.animIn"),
				() => Q("tip.props.blockHover"),
				() => Q("lbl.onHover"),
				() => Q("hint.placement"),
				() => Q("group.placement"),
				() => Q("tip.hideMobile"),
				() => Q("lbl.hideMobile"),
				() => Q("tip.decor"),
				() => Q("lbl.decor")
			]), H("change", he, (e) => Pn(e.target.checked)), H("change", ve, (e) => An(e.target.checked)), W(e, t);
		};
		K(d, (e) => {
			V(sn) === "content" ? e(f) : e(p, -1);
		}), B((e, t) => {
			o = J(a, 1, "svelte-1n46o8q", null, o, { on: V(sn) === "content" }), G(s, e), l = J(c, 1, "svelte-1n46o8q", null, l, { on: V(sn) === "style" }), G(u, t);
		}, [() => Q("props.tabContent"), () => Q("props.tabStyle")]), H("click", a, () => P(sn, "content")), H("click", c, () => P(sn, "style")), W(e, t);
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
	}, p = /* @__PURE__ */ N("");
	function m() {
		V(p).trim() && (P(pa, V(p), !0), P(ma, null), ka(), P(p, ""));
	}
	let g = [
		["color", sl],
		["gradient", yl],
		["glow", bl],
		["image", Ql],
		["slideshow", ru],
		["video", lu],
		["grain", Sl]
	], _ = Object.fromEntries(g), v = {
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
	}, y = [
		["purple", Q("adminTheme.purple")],
		["well", Q("adminTheme.well")],
		["gold", Q("adminTheme.gold")],
		["grey", Q("adminTheme.grey")],
		["aurora", Q("adminTheme.aurora")],
		["dusk", Q("adminTheme.dusk")],
		["ember", Q("adminTheme.ember")]
	], b = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, x = /* @__PURE__ */ N($t((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return b[e] ?? e ?? "grey";
	})()));
	bn(() => {
		document.documentElement.dataset.adminTheme = V(x), localStorage.setItem("urd-admin-theme", V(x)), S();
	});
	function S() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		Ue?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": C(t)
		});
	}
	function C(e) {
		return al(e) == null || (ol(e, "#ffffff") ?? 0) >= (ol(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let w = /* @__PURE__ */ N(null), T = /* @__PURE__ */ N(null), ee = /* @__PURE__ */ N(!1), te = /* @__PURE__ */ N(""), ne = /* @__PURE__ */ N("info"), re = 0;
	function E(e, t = "info") {
		P(te, e, !0), P(ne, t, !0);
		let n = ++re;
		t === "ok" && setTimeout(() => {
			re === n && (P(te, ""), P(ne, "info"));
		}, 8e3);
	}
	function D() {
		E(Q("status.storageFull"), "error");
	}
	function ie(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			D();
		}
	}
	let ae = /* @__PURE__ */ N(null), oe = /* @__PURE__ */ N(null), se = /* @__PURE__ */ N($t({
		size: 16,
		snap: !0
	})), ce = /* @__PURE__ */ N(!0), le = /* @__PURE__ */ N($t(Do(typeof window < "u" ? window : null) ?? 1920)), ue = "urd-admin-screen";
	function de() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(ue) ?? "null");
		} catch {
			e = null;
		}
		return Oo(e, V(le));
	}
	let fe = /* @__PURE__ */ N($t(de()));
	function pe(e) {
		P(fe, Oo({
			...We(V(fe)),
			...e
		}, V(le)), !0);
		try {
			localStorage.setItem(ue, JSON.stringify(V(fe)));
		} catch {}
	}
	let me = /* @__PURE__ */ j(() => ko(V(fe), V(le))), he = [
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
	], ge = /* @__PURE__ */ j(() => [{
		id: "desktop",
		width: V(me).width,
		height: V(me).height || null,
		viewport: "desktop"
	}, ...he]);
	function _e(e) {
		let t = Lo(V(ro), V(io), e.width).width;
		return Q(e.id === "desktop" ? V(fe).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let ve = /* @__PURE__ */ N("desktop"), ye = /* @__PURE__ */ j(() => V(ge).find((e) => e.id === V(ve)) ?? V(ge)[0]), be = /* @__PURE__ */ j(() => V(ye).viewport === "mobile" || V(ye).width <= (V(A)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), xe = /* @__PURE__ */ N(null), Se = /* @__PURE__ */ N(0), Ce = /* @__PURE__ */ N(0), we = /* @__PURE__ */ N("fit"), Te = /* @__PURE__ */ N(1), Ee = /* @__PURE__ */ j(() => Io(V(ro), V(io))), Oe = /* @__PURE__ */ j(() => V(ye).width), ke = /* @__PURE__ */ j(() => V(ye).height ?? 0), Ae = /* @__PURE__ */ j(() => V(we) === "manual" ? V(Te) : bo(V(Se), V(Oe), "fit", V(Ce), V(ke)));
	function je(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(V(Ae) * 100) / 10) + e) * 10));
		P(Te, t / 100), P(we, "manual");
	}
	let Me = /* @__PURE__ */ j(() => V(ke) > 0 ? V(ke) : V(Ae) > 0 ? V(Ce) / V(Ae) : V(Ce)), Ne = /* @__PURE__ */ j(() => V(Oe) * V(Ae)), Pe = /* @__PURE__ */ j(() => V(ke) > 0 ? V(ke) * V(Ae) : V(Ce)), Fe = /* @__PURE__ */ j(() => V(Ne) > V(Se) + 1 || V(Pe) > V(Ce) + 1);
	bn(() => {
		let e = () => Ue?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = V(be);
		Ue?.sendViewport(e);
	}), bn(() => {
		let e = V(Ae);
		Ue?.sendZoom(e);
	}), bn(() => {
		let e = () => {
			P(le, Do(window) ?? V(le), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), bn(() => {
		let e = V(xe);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			P(Se, e.clientWidth, !0), P(Ce, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Ie = /* @__PURE__ */ N(0);
	function Le() {
		P(Ie, k?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Re() {
		let e = k?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		P(ve, "mobile"), e && setTimeout(() => Ue?.sendScrollSection(e.id), 0);
	}
	function ze(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			nt("layout");
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
			}, Ve(t, "layout-changed"), e.sectionId === V(Bn) && P(Hn, e.minHeight, !0), V(M)?.sectionId === e.sectionId && Ut(), k.save(), Ze(), Ue?.sendSection(V(T), t);
		}
	}
	function Be(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Ve(e, t) {
		!e || !Be(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Le(), Ue?.sendAttention(e.id, !0));
	}
	let k = null, He = null, Ue = null, A = /* @__PURE__ */ N(null);
	function Ge() {
		P(A, He.data, !0), He.replace(V(A));
	}
	function Ke() {
		Ue?.sendSite(We(V(A)));
	}
	let Ye = /* @__PURE__ */ new Set(), Xe = () => V(A).pages.find((e) => e.id === V(T));
	function Ze() {
		let e = V(A)?.pages?.some((e) => !Ye.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = qs?.hasDraft() || Object.values(Js).some((e) => e.hasDraft()), n = rc?.hasDraft() || Object.values(ic).some((e) => e.hasDraft());
		P(ee, e || k?.hasDraft() && !Ye.has(V(T)) || He?.hasDraft() || tl?.hasDraft() || t || n || !1, !0);
	}
	let Qe = [], $e = [], et = null;
	function tt() {
		return JSON.stringify({
			pageId: V(T),
			page: k.data,
			site: He.data,
			collectionsIndex: Xs ? qs.data : null,
			collections: Xs ? Object.fromEntries(Object.entries(Js).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: oc ? rc.data : null,
			templates: oc ? Object.fromEntries(Object.entries(ic).map(([e, t]) => [e, t.data])) : {},
			plugins: tl?.data ?? null
		});
	}
	function nt(e) {
		e === et && (e.startsWith("edit:") || e.startsWith("grid:")) || (Qe.push(tt()), Qe.length > 50 && Qe.shift(), $e.length = 0, et = e);
	}
	function rt(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (He.replace(r), Ge(), He.save(), P(se, {
			snap: !0,
			...V(A).grid
		}, !0), Ke(), it(i, a ?? {}), at(o, s ?? {}), ot(c), t && t !== V(T) && V(A).pages.some((e) => e.id === t)) {
			ie(`urd-draft-${t}`, JSON.stringify(n)), Ji(t, { keepHistory: !0 }), Ze();
			return;
		}
		k.replace(n), k.save(), Ze(), Le(), Ut(), qn(k.data.sections.find((e) => e.id === V(Bn))), V(A).pages.some((e) => e.id === V(T)) ? Ue?.sendPage(V(T), k.data) : Ji(V(A).pages[0].id, { keepHistory: !0 });
	}
	function it(e, t) {
		if (!(!qs || !e) && JSON.stringify({
			index: qs.data,
			collections: Object.fromEntries(Object.entries(Js).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			qs.replace(e), qs.save();
			for (let e of Object.keys(Js)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Js[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Js[e]) {
					let t = Ys[e] ?? null;
					Js[e] = Zi(`urd-draft-collection-${e}`, () => t, D, `urd-draft-samling-${e}`);
				}
				Js[e].replace(n), Js[e].save();
			}
			P(Zs, [...e.samlinger ?? []], !0), V($s) && !V(Zs).includes(V($s)) && P($s, null), Tc();
		}
	}
	function at(e, t) {
		if (!(!rc || !e) && JSON.stringify({
			index: rc.data,
			templates: Object.fromEntries(Object.entries(ic).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			rc.replace(e), rc.save();
			for (let e of Object.keys(ic)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete ic[e]);
			for (let [e, n] of Object.entries(t)) ic[e] || (ic[e] = Zi(`urd-draft-template-${e}`, () => ac[e] ?? null, D, `urd-draft-mal-${e}`)), ic[e].replace(n), ic[e].save();
			P(sc, [...e.maler ?? []], !0), Ze(), fc();
		}
	}
	function ot(e) {
		!tl || !e || JSON.stringify(tl.data) !== JSON.stringify(e) && (tl.replace(e), tl.save(), vl(), Ml());
	}
	function st() {
		Qe.length && ($e.push(tt()), rt(Qe.pop()), et = null, E(Q("status.undone")));
	}
	function ut() {
		$e.length && (Qe.push(tt()), rt($e.pop()), et = null, E(Q("status.redone")));
	}
	function dt(e) {
		V(Gt) && (e.target instanceof Element && e.target.closest(".block-menu") || P(Gt, null));
	}
	function ft(e) {
		if (e.key === "Escape" && V(Gt)) {
			P(Gt, null);
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
			].includes(t.type)) || !V(M) || V(be) === "mobile") return;
			e.preventDefault(), Ue?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? ut() : st());
	}
	async function pt() {
		P(w, Ds(await (await fetch("/content/site.json")).json()), !0), He = Zi("urd-draft-site", () => V(w), D), (He.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${He.data.schemaVersion} (the engine has 4) and is discarded`), He.replace(We(V(w)))), He.replace(Ds(He.data)), He.save(), Ge(), P(se, {
			snap: !0,
			...V(A).grid
		}, !0), await Ji(new URLSearchParams(location.search).get("page") ?? V(A).pages[0].id), await Tl(), await wc(), await dc(), await yi(), V(oe) && xi(), V(A).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (P(bt, V(A).site.title, !0), P(xt, V(A).theme.tokens.color.accent, !0), P(St, V(A).theme.tokens.color.bg, !0), P(yt, !0));
	}
	let mt = /* @__PURE__ */ N(null);
	function ht({ title: e, lines: t = [], okLabel: n = Q("confirm.ok"), cancelLabel: r = Q("confirm.cancel") }) {
		return new Promise((i) => {
			P(mt, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function gt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Q("confirm.ok"), cancelLabel: a = Q("confirm.cancel") }) {
		return new Promise((o) => {
			P(mt, {
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
	function _t(e) {
		V(mt)?.resolve(V(mt).prompt ? e ? V(mt).value : null : e), P(mt, null);
	}
	let vt = !1;
	bn(() => {
		if (!V(mt)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), _t(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let yt = /* @__PURE__ */ N(!1), bt = /* @__PURE__ */ N(""), xt = /* @__PURE__ */ N("#7c5cff"), St = /* @__PURE__ */ N("#0b0e14");
	function Ct() {
		localStorage.setItem("urd-setup-done", "1"), P(yt, !1);
	}
	function wt() {
		let e = V(bt).trim();
		e && (fa("setup", () => {
			V(A).site.title = e, V(A).nav.logo = {
				type: "text",
				value: e
			}, V(A).theme.tokens.color.accent = V(xt), V(A).theme.tokens.color.bg = V(St), delete V(A).site.setup;
		}), Ct(), E(Q("status.setupDone"), "ok"));
	}
	let Tt = "urd-admin-panels", Et = "urd-admin-panel-open", Dt = /* @__PURE__ */ N($t(localStorage.getItem(Tt) === "reset" ? "reset" : "remember"));
	function Ot(e) {
		P(Dt, e === "reset" ? "reset" : "remember", !0), V(Dt) === "reset" ? localStorage.setItem(Tt, "reset") : localStorage.removeItem(Tt);
	}
	let kt = /* @__PURE__ */ N($t(V(Dt) === "reset" ? null : localStorage.getItem(Et))), At = [
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
	], jt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Mt = Object.fromEntries(At.flat().map((e) => [e, Q(`panel.${e}`)]));
	V(kt) && !Mt[V(kt)] && P(kt, null), bn(() => {
		if (V(Dt) === "reset") {
			localStorage.removeItem(Et);
			return;
		}
		V(kt) ? localStorage.setItem(Et, V(kt)) : localStorage.removeItem(Et);
	});
	let Nt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Pt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Ft = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function It(e, t) {
		let n = [];
		for (let r of e) for (let e of ul[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || Pt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Lt() {
		let e = Ft([...Pt, ...It(V(hl), "admin")]);
		return zt === "auto" || e.some(([e]) => e === zt) ? e : [[zt, zt], ...e];
	}
	let Rt = () => It(V(ll)?.enabled ?? [], "site"), zt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Bt(e) {
		e !== zt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Vt(e) {
		P(kt, V(kt) === e ? null : e, !0), V(kt) === "history" && Oi(), V(kt) === "update" && !V(Ri) && Bi();
	}
	let M = /* @__PURE__ */ N(null);
	function Ht(e, t) {
		let n = k?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Ut() {
		if (!V(M)) return;
		let { block: e } = Ht(V(M).sectionId, V(M).blockId);
		if (!e) {
			P(M, null);
			return;
		}
		P(M, {
			sectionId: V(M).sectionId,
			blockId: V(M).blockId,
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
	function Wt(e) {
		if (P(Gt, null), !e.blockId) {
			P(M, null);
			return;
		}
		P(M, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && P(Bn, e.sectionId, !0), Ut();
	}
	let Gt = /* @__PURE__ */ N(null), Kt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, qt = [
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
	function Jt() {
		let e = k?.data.sections ?? [], t = e.findIndex((e) => e.id === V(M)?.sectionId);
		return t < 0 ? [["", Q("opt.sticky.ownSection")]] : [["", Q("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Q("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function Yt(e) {
		if (Wt(e), !V(M)) return;
		let t = V(ae)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + V(Ae) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + V(Ae) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + V(Ae) * e.rect.top), Math.max(8, r));
		P(Gt, {
			left: n,
			top: i
		}, !0);
	}
	function Xt(e, t) {
		let { section: n, block: r } = Ht(V(M)?.sectionId, V(M)?.blockId);
		r && (e && nt(e), t(r, n), Ve(n, "block-edited"), k.save(), Ze(), Ue?.sendSection(V(T), n), Ut());
	}
	function F(e, t) {
		Xt(`edit:${V(M).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Zt(e, t) {
		Xt(`edit:${V(M).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let Qt = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function tn(e) {
		Xt(`edit:${V(M).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function nn(e) {
		Xt(`edit:${V(M).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let rn = $t({}), an = $t({}), on = /* @__PURE__ */ N(!1), sn = /* @__PURE__ */ N("content"), cn = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function ln(e) {
		let t = V(M).blockId, n = `${t}:${e.key}`, r = (rn[n] ?? V(M).props[e.key] ?? "").trim();
		an[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			Zt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		P(on, !0), an[n] = {
			text: Q("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (V(M)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (Zt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), an[n] = null) : an[n] = {
				text: Ui(a) ?? Q("props.place.notFound"),
				err: !0
			};
		} catch {
			an[n] = {
				text: Q("props.place.failed"),
				err: !0
			};
		} finally {
			P(on, !1);
		}
	}
	function un(e, t) {
		Number.isFinite(t) && Xt(`edit:frame-${V(M).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function dn(e) {
		Xt(`edit:${V(M).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let fn = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], pn = /* @__PURE__ */ new Set(["select", "radio"]), mn = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function hn(e, t) {
		Xt(`edit:${V(M).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			pn.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function gn(e, t) {
		hn(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function _n() {
		Xt("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: mn(),
				label: Q("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function vn(e) {
		Xt("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function yn(e, t) {
		let n = e + t;
		Xt("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	function xn(e) {
		F("sources", String(e).split("\n").map((e) => e.trim()).filter(Boolean));
	}
	function Sn(e, t) {
		Xt(`edit:${V(M).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Cn() {
		Xt("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Q("seed.faq.newQ"),
				a: Q("seed.faq.answer")
			});
		});
	}
	function wn(e) {
		Xt("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Tn(e, t) {
		let n = e + t;
		Xt("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function En(e, t) {
		Xt(`edit:${V(M).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Dn() {
		Xt("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Q("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function On(e) {
		Xt("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function kn(e, t) {
		let n = e + t;
		Xt("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function An(e) {
		Xt("decor", (t) => {
			t.decor = e;
		});
	}
	function jn(e, t) {
		Xt(`edit:${V(M).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function Mn(e, t) {
		Xt(`edit:${V(M).blockId}:share`, (n) => {
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
	function Nn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			F("src", String(n.result ?? "")), t.size > 4e5 && E(Q("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => E(Q("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Pn(e) {
		let { section: t, block: n } = Ht(V(M)?.sectionId, V(M)?.blockId);
		n && (nt("hide-mobile"), n.hideMobile = e, k.save(), Ze(), Ue?.sendSection(V(T), t), Ut());
	}
	async function Fn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Or(t);
			Xt(`edit:${V(M).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Da(t.name).replaceAll("-", " ");
			});
		} catch {
			E(Q("status.imageReadError"), "error");
		}
	}
	async function In(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Or(t);
			Xt(`edit:${V(M).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			E(Q("status.imageReadError"), "error");
		}
	}
	let Ln = {
		text: Q("blocks.text"),
		button: Q("blocks.button"),
		image: Q("blocks.image"),
		shape: Q("blocks.shape"),
		video: Q("blocks.video"),
		icon: Q("blocks.icon"),
		gallery: Q("blocks.gallery"),
		faq: Q("blocks.faq"),
		collection: Q("blocks.collection"),
		timeline: Q("blocks.timeline"),
		quote: Q("blocks.quote"),
		stats: Q("blocks.stats"),
		table: Q("blocks.table"),
		share: Q("blocks.share"),
		countdown: Q("blocks.countdown"),
		audio: Q("blocks.audio"),
		product: Q("blocks.product"),
		cart: Q("blocks.cart"),
		checkout: Q("blocks.checkout"),
		map: Q("blocks.map"),
		form: Q("blocks.form"),
		calendar: Q("blocks.calendar")
	}, Rn = [
		["line", Q("shape.line")],
		["arrow", Q("shape.arrow")],
		["circle", Q("shape.circle")],
		["rect", Q("shape.rect")],
		["triangle", Q("shape.triangle")]
	], zn = [
		["accent", Q("color.accent")],
		["text", Q("color.text")],
		["surface", Q("color.surface")],
		["bg", Q("color.bg")]
	], Bn = /* @__PURE__ */ N(null), Vn = /* @__PURE__ */ N(null), Hn = /* @__PURE__ */ N(""), Un = /* @__PURE__ */ N($t([])), Wn = /* @__PURE__ */ N(null), Gn = /* @__PURE__ */ N(null), Kn = /* @__PURE__ */ N("");
	function qn(e) {
		P(Vn, e?.grid ? { ...e.grid } : null, !0), P(Hn, e?.size?.minHeight ?? "", !0), P(Un, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), P(Wn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), P(Gn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), P(Kn, e?.theme ?? "", !0);
	}
	let Jn = /* @__PURE__ */ N(null), Yn = $t({});
	function Xn() {
		try {
			let e = ((V(ae)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${V(Bn)}"]`))?.getBoundingClientRect();
			P(Jn, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			P(Jn, null);
		}
	}
	bn(() => {
		V(Bn), V(Un), requestAnimationFrame(() => requestAnimationFrame(Xn));
	}), bn(() => {
		let e = V(ae);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Xn());
		return t.observe(e), () => t.disconnect();
	}), bn(() => {
		for (let e of V(Un)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Yn[t]) {
				let e = new Image();
				e.onload = () => {
					Yn[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Zn(e) {
		er("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function Qn(e) {
		let t = V(Ur), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? C(Fh(t.accent ?? "#000000", t))), r = il(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function $n(e) {
		P(Bn, e.sectionId, !0), qn(k?.data.sections.find((t) => t.id === e.sectionId));
	}
	function er(e, t) {
		let n = k.data.sections.find((e) => e.id === V(Bn));
		n && (nt(e), t(n), k.save(), Ze(), Ue?.sendSection(V(T), n), qn(n));
	}
	let tr = /* @__PURE__ */ N("color");
	function nr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: _[t].version ?? 1,
				props: _[t].defaults()
			});
		});
	}
	function rr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function ir(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function ar(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function or(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				ar(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				ar(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let sr = (e) => Math.min(4, Math.max(.1, e));
	function cr(e, t, n, r) {
		ar(e, t, "size", sr(Math.round((n + r) * 100) / 100));
	}
	function lr(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && ar(e, t, "size", sr(r / 100));
	}
	function ur(e, t, n, r) {
		let i = Yn[n.props.src];
		if (!i?.w || !i?.h || !V(Jn)?.w || !V(Jn)?.h) return;
		let a = V(Jn).h * i.w / (V(Jn).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && ar(e, t, "fit", "plain"), ar(e, t, "size", sr(Math.round(o * 100) / 100));
	}
	function dr(e) {
		return e.props;
	}
	function pr(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function mr(e, t, n, r) {
		pr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let hr = {
		linear: [
			["none", Q("common.none")],
			["pan", Q("opt.gradAnim.pan")],
			["pan-loop", Q("opt.gradAnim.panLoop")],
			["rotate", Q("opt.gradAnim.rotate")]
		],
		radial: [
			["none", Q("common.none")],
			["pulse", Q("opt.gradAnim.pulse")],
			["orbit", Q("opt.gradAnim.orbit")]
		]
	};
	function gr(e, t, n) {
		pr(e, t, e.keyPrefix, (e) => {
			e.kind = n, hr[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function _r(e, t, n, r) {
		pr(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function vr(e, t) {
		pr(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function yr(e, t, n) {
		pr(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function br(e, t, n, r) {
		pr(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Sr = /* @__PURE__ */ N(null);
	function wr(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		P(Sr, {
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
			P(Sr, {
				...V(Sr),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = V(Sr);
			if (P(Sr, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && br(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Tr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: _[n].version ?? 1,
				props: _[n].defaults()
			});
		});
	}
	async function Er(e, t) {
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
	async function Dr(e) {
		let t = await e.text(), n = Ca(t), r = Ta(t);
		if (!r) return n;
		let i = await Er(n.dataUrl, r);
		if (!i) return n;
		let a = wa(t, i);
		if (a === t) return n;
		try {
			return Ca(a);
		} catch {
			return n;
		}
	}
	async function Or(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Dr(e) : ba(e);
	}
	async function kr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ar(e, t, "src", (await Or(r)).dataUrl);
		} catch {
			E(Q("status.imageReadError"), "error");
		}
	}
	function Ar(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", !r) return;
		if (!["video/mp4", "video/webm"].includes(r.type)) {
			E(Q("status.videoFormat"), "error");
			return;
		}
		if (r.size > 15e6) {
			E(Q("status.videoTooLarge", {
				mb: (r.size / 1e6).toFixed(1),
				max: Math.round(ya / 1e6)
			}), "error");
			return;
		}
		let i = new FileReader();
		i.onload = () => {
			ar(e, t, "src", String(i.result ?? "")), r.size > 4e6 && E(Q("status.videoLarge", { mb: (r.size / 1e6).toFixed(1) }), "error");
		}, i.onerror = () => E(Q("status.imageReadError"), "error"), i.readAsDataURL(r);
	}
	async function jr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			ar(e, t, "poster", (await Or(r)).dataUrl);
		} catch {
			E(Q("status.imageReadError"), "error");
		}
	}
	async function U(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		E(Q("status.compressingImages"));
		let { images: i, failed: a, big: o } = await hg(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), gg(i.length, a, o);
	}
	function Pr(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Fr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Ir(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Lr(e, t) {
		fa(e, () => {
			V(A).nav.style ??= {}, t(V(A).nav.style);
		});
	}
	let Rr = /* @__PURE__ */ j(() => ({
		mutate: er,
		keyPrefix: "bg",
		keyId: V(Bn)
	})), zr = {
		mutate: Lr,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Br = {
		mutate: Il,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Vr = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return Xc(V(A)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, Hr = /* @__PURE__ */ N("light");
	bn(() => {
		P(Hr, Vr(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || P(Hr, Vr(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let Ur = /* @__PURE__ */ j(() => V(A)?.theme ? Zc(V(A).theme, V(Hr)).color ?? {} : {}), Gr = () => Object.entries(V(Ur)), Kr = [
		[
			"bg",
			Q("palette.bg"),
			Q("palette.bgShort")
		],
		[
			"surface",
			Q("palette.surface"),
			Q("palette.surfaceShort")
		],
		[
			"text",
			Q("palette.text"),
			Q("palette.textShort")
		],
		[
			"accent",
			Q("palette.accent"),
			Q("palette.accentShort")
		],
		[
			"accent-text",
			Q("palette.accentText"),
			Q("palette.accentTextShort")
		]
	], qr = /* @__PURE__ */ j(() => !!V(A)?.theme.alt), Yr = /* @__PURE__ */ j(() => V(A)?.theme.alt?.auto === !0), Xr = /* @__PURE__ */ j(() => V(A)?.theme.scheme === "dark" ? "dark" : "light"), Zr = /* @__PURE__ */ j(() => V(A)?.theme.tokens.color ?? {}), Qr = /* @__PURE__ */ j(() => ({
		...V(A)?.theme.tokens.color ?? {},
		...V(A)?.theme.alt?.tokens?.color ?? {}
	}));
	function $r(e) {
		return {
			type: e,
			version: mu[e].version,
			props: mu[e].defaults()
		};
	}
	let ei = (e) => !!(e && mu[e.type]?.entrance), ti = [["", Q("common.none")], ...Object.entries(mu).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label])], ni = ti.filter(([e]) => !mu[e]?.group), ri = [["", Q("common.none")], ...Object.entries(mu).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label])];
	function ii(e) {
		e.animation && !ei(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function ai(e) {
		Xt(`edit:anim-${V(M).blockId}`, (t) => {
			ii(t), t.animation = e ? $r(e) : null;
		}), V(M) && Ue?.sendDemoAnim(V(M).sectionId, V(M).blockId);
	}
	function oi(e) {
		Xt(`edit:hover-${V(M).blockId}`, (t) => {
			ii(t), t.hover = e ? $r(e) : null;
		});
	}
	function si(e, t) {
		Number.isFinite(t) && (Xt(`edit:anim-${V(M).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), V(M) && Ue?.sendDemoAnim(V(M).sectionId, V(M).blockId));
	}
	function ci(e) {
		er("section-anim", (t) => {
			ii(t), t.animation = e ? $r(e) : null;
		}), Ue?.sendDemoAnim(V(Bn));
	}
	function ui(e) {
		er("section-hover", (t) => {
			ii(t), t.hover = e ? $r(e) : null;
		});
	}
	function di(e, t) {
		Number.isFinite(t) && (er("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), Ue?.sendDemoAnim(V(Bn)));
	}
	function fi(e, t) {
		er("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), Ue?.sendDemoAnim(V(Bn));
	}
	function pi(e) {
		let t = k.data.sections.find((e) => e.id === V(Bn));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		nt("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, P(Hn, r, !0), k.save(), Ze(), Ue?.sendSection(V(T), t);
	}
	function mi() {
		return k.data.sections.find((e) => e.id === V(Bn)) ?? k.data.sections[0];
	}
	function hi(e) {
		let t = k.data.sections.find((e) => e.id === V(Bn));
		t && (nt("grid:section"), t.grid = e ? { ...He.data.grid } : null, P(Vn, t.grid ? { ...t.grid } : null, !0), k.save(), Ze(), Ue?.sendSection(V(T), t), V(la) && Ue?.sendShowGrid(!0));
	}
	function gi(e, t) {
		let n = k.data.sections.find((e) => e.id === V(Bn));
		n?.grid && (nt("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, P(Vn, { ...n.grid }, !0), k.save(), Ze(), Ue?.sendSection(V(T), n), V(la) && Ue?.sendShowGrid(!0));
	}
	function vi(e, t) {
		nt("grid:site"), P(se, {
			...V(se),
			[e]: t
		}, !0), He.data.grid = {
			...He.data.grid,
			[e]: t
		}, He.save(), Ze(), Ke(), V(la) && Ue?.sendShowGrid(!0);
	}
	async function yi() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? P(oe, await e.json(), !0) : e.status !== 503 && P(oe, null);
		} catch {
			P(oe, null);
		}
	}
	let bi = null;
	async function xi() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (bi = (await e.json()).head ?? null);
		} catch {}
	}
	async function Ci(e) {
		if (!bi) return await xi(), {
			ok: await ht({
				title: Q("confirm.conflictUnknown.title"),
				lines: [Q("confirm.conflictUnknown.body"), Q("confirm.conflictUnknown.warning")],
				okLabel: Q("confirm.publishAnyway"),
				cancelLabel: Q("confirm.cancel")
			}),
			head: bi
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${bi}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === bi) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Q("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await ht({
				title: Q("confirm.conflict.title"),
				lines: [
					Q("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					Q("confirm.conflict.warning")
				],
				okLabel: Q("confirm.publishAnyway"),
				cancelLabel: Q("confirm.cancel")
			}),
			head: n
		};
	}
	let wi = /* @__PURE__ */ N(null), Ti = /* @__PURE__ */ N(""), Di = /* @__PURE__ */ N(!1);
	async function Oi() {
		P(Ti, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? P(wi, (await e.json()).commits, !0) : e.status === 401 ? (P(wi, [], !0), P(Ti, Q("status.historyLoginRequired"), !0)) : (P(wi, [], !0), P(Ti, Ui(await e.json().catch(() => null)) ?? Q("status.historyFetchFailed"), !0));
		} catch {
			P(wi, [], !0), P(Ti, Q("status.historyUnavailable"), !0);
		}
	}
	let ki = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Wi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), ji = !1;
	async function Mi() {
		let e = V(wi)?.[0];
		if (!(!e || V(Di)) && await ht({
			title: Q("confirm.revert.title"),
			lines: [`«${e.message}»`, Q("confirm.revert.body")],
			okLabel: Q("confirm.revert.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			P(Di, !0), E(Q("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? bi = e : xi(), ji = !0, E(Q("status.revertDone"), "ok"), Ni();
				} else t.status === 409 ? E(Q("status.revertConflict"), "error") : E(Ui(await t.json().catch(() => null)) ?? Q("status.revertFailed"), "error");
			} catch {
				E(Q("status.publishLayerUnreachable"), "error");
			}
			P(Di, !1), Oi();
		}
	}
	async function Ni() {
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
				E(Q("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		E(Q("status.revertDeployTimeout"), "error");
	}
	let Pi = 0;
	async function Fi(e) {
		let t = ++Pi, n = re, r = await So(xo(e));
		t === Pi && n === re && (r ? E(Q("status.publishLive"), "ok") : E(Q("status.publishDeployTimeout"), "error"));
	}
	let Ii = /* @__PURE__ */ N(null), Li = /* @__PURE__ */ N(null), Ri = /* @__PURE__ */ N(!1), zi = /* @__PURE__ */ N($t(/* @__PURE__ */ new Set()));
	async function Bi() {
		P(Ri, !0), P(Li, null), P(Ii, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (P(Ii, t, !0), P(zi, /* @__PURE__ */ new Set(), !0)) : P(Li, Ui(t) ?? Q("update.checkFailed"), !0);
		} catch {
			P(Li, Q("status.publishLayerUnreachable"), !0);
		}
		P(Ri, !1);
	}
	function Vi(e) {
		let t = new Set(V(zi));
		t.has(e) ? t.delete(e) : t.add(e), P(zi, t, !0);
	}
	async function Hi() {
		if (!V(Ii) || V(Ii).upToDate || V(Ri)) return;
		let e = [...V(zi)], t = V(Ii).changes.filter((e) => !V(zi).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await ht({
			title: Q("confirm.update.title"),
			lines: [Q("confirm.update.body", {
				target: V(Ii).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Q("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Q("confirm.update.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			P(Ri, !0), E(Q("update.running", { target: V(Ii).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: V(Ii).target,
						expect: V(Ii).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (E(Q("update.committed", { target: V(Ii).target }), "ok"), await Gi(V(Ii).target.replace(/^v/, ""))) : t.status === 409 ? (E(Ui(n) ?? Q("update.checkFailed"), "error"), await Bi()) : E(Ui(n) ?? Q("update.failed"), "error");
			} catch {
				E(Q("status.publishLayerUnreachable"), "error");
			}
			P(Ri, !1);
		}
	}
	async function Gi(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					E(Q("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		E(Q("update.deployTimeout"), "error");
	}
	let Ki = null;
	function qi(e) {
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
	async function Ji(e, { keepHistory: t = !1 } = {}) {
		P(T, e, !0), Ki = (async () => {
			let n = Xe(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Os(await e.json(), He.data));
			} catch {}
			r ? Ye.delete(e) : r = qi(n), k = Zi(`urd-draft-${e}`, () => r, D), (k.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${k.data.schemaVersion} (the engine has 4) and is discarded`), k.replace(structuredClone(r))), k.replace(Os(k.data, He.data)), k.save(), t || (et = null), P(Bn, null), P(Vn, null), Ze(), Na(), Le(), P(te, "");
		})(), await Ki;
	}
	function Yi() {
		Ue?.destroy(), V(ae)?.contentDocument?.addEventListener("pointerdown", () => {
			V(Gt) && P(Gt, null);
		}, !0), Ue = vo(V(ae), {
			onEdit: Hh,
			onMove: Uh,
			onGrow: Wh,
			onDelete: eg,
			onAddSection: Yh,
			onMoveSection: Xh,
			onDeleteSection: Zh,
			onSectionSize: Qh,
			onUndo: (e) => e.redo ? ut() : st(),
			onSelectSection: $n,
			onSelectBlock: Wt,
			onBlockMenu: Yt,
			onReady: Qi,
			onNavigate: da,
			onAddBlock: (e) => ig(e.sectionId, e.block),
			onAddBlocks: (e) => ag(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: pg,
			onMoveBlockSection: $h,
			onMobileReset: Gh,
			onMobileOrder: Kh,
			onReviewDone: qh,
			onBlockFlag: Jh,
			onCollectionEdit: Ac,
			onCollectionAdd: Oc,
			onSaveTemplate: pc,
			onStickyGroup: gc,
			onStickyDock: hc,
			onDeleteTemplate: Cc,
			onApplyLayout: ze,
			onPluginBlocks: (e) => {
				P(sg, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => fa("edit:nav-width", () => {
				V(A).nav.style ??= {}, V(A).nav.style.width = e.width;
			})
		});
	}
	async function Qi() {
		await Ki, await cl, Ue?.sendPlugins(We(V(ll))?.enabled ?? []), Ue?.sendViewport(V(be)), Ue?.sendZoom(V(Ae)), Ec(), fc(), He.hasDraft() && Ke();
		let e = !V(w).pages.some((e) => e.id === V(T));
		(k.hasDraft() || e) && Ue?.sendPage(V(T), k.data), V(ce) || Ue?.sendChrome(!1), V(la) && Ue?.sendShowGrid(!0), V($i) && Ue?.sendShowGuides(!0), S();
	}
	let $i = /* @__PURE__ */ N(localStorage.getItem("urd-guides") === "1"), ea = /* @__PURE__ */ N(!1), ta = /* @__PURE__ */ N($t(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function na(e) {
		P(ta, e === "menu" ? "menu" : "strip", !0), V(ta) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let ra = /* @__PURE__ */ N(null);
	bn(() => {
		if (!V(ea)) return;
		let e = (e) => {
			V(ra)?.contains(e.target) || P(ea, !1);
		}, t = (e) => {
			e.key === "Escape" && P(ea, !1);
		}, n = () => {
			P(ea, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let ia = {
		view: 1079,
		device: 999,
		zoom: 919
	}, aa = /* @__PURE__ */ N(null), oa = /* @__PURE__ */ N(null), sa = $t({
		view: !1,
		device: !1,
		zoom: !1
	});
	bn(() => {
		let e = Object.entries(ia).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				sa[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), bn(() => {
		V(aa) && !sa[V(aa)] && P(aa, null);
	}), bn(() => {
		if (!V(aa)) return;
		let e = (e) => {
			V(oa)?.contains(e.target) || P(aa, null);
		}, t = (e) => {
			e.key === "Escape" && P(aa, null);
		}, n = () => {
			P(aa, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function ca() {
		P($i, !V($i)), localStorage.setItem("urd-guides", V($i) ? "1" : "0"), Ue?.sendShowGuides(V($i));
	}
	let la = /* @__PURE__ */ N(localStorage.getItem("urd-grid-overlay") === "1");
	function ua() {
		P(la, !V(la)), localStorage.setItem("urd-grid-overlay", V(la) ? "1" : "0"), Ue?.sendShowGrid(V(la));
	}
	function da(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = V(A).pages.find((e) => e.path === t);
		n && n.id !== V(T) && Ji(n.id);
	}
	function fa(e, t) {
		nt(e), t(), He.save(), Ze(), Ke();
	}
	let pa = /* @__PURE__ */ N(""), ma = /* @__PURE__ */ N(null), ga = Object.fromEntries(Gc.map((e) => [e.id, Uc(Kc(e.id, {
		pageId: "preview",
		title: ""
	}))])), _a = /* @__PURE__ */ j(() => {
		let e = V(A)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && $c(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), va = /* @__PURE__ */ N(null);
	bn(() => {
		if (!V(va)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || P(va, null);
		}, t = (e) => {
			e.key === "Escape" && P(va, null);
		}, n = () => {
			P(va, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let xa = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Sa(e, t = null) {
		return e ? xa.includes(e) ? Q("error.reservedName", { slug: e }) : V(A).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Q("error.pageExists") : null : Q("error.pageNeedsName");
	}
	function ka() {
		let e = V(pa).trim(), t = Da(e), n = Sa(t);
		if (n) {
			E(n, "error");
			return;
		}
		let r = V(ma) && !V(ma).startsWith("preset:") ? ic[V(ma)]?.data?.page : null, i = V(ma)?.startsWith("preset:") ? Kc(V(ma).slice(7), {
			pageId: t,
			title: e
		}) ?? qi({
			id: t,
			title: e
		}) : r ? uc(Os(JSON.parse(JSON.stringify(r)), He.data), Ps, {
			id: t,
			title: e
		}) : qi({
			id: t,
			title: e
		});
		fa("pages", () => {
			V(A).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), V(A).nav.items.push({
				label: e,
				page: t
			});
		}), ie(`urd-draft-${t}`, JSON.stringify(i)), Ze(), P(pa, ""), P(ma, null), Ji(t);
	}
	async function Aa(e) {
		P(va, null), await vc("page", e.id === V(T) ? JSON.parse(JSON.stringify(k.data)) : await za(e));
	}
	function ja(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		fa("pages", () => {
			e.title = n;
			for (let t of V(A).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === V(T) ? (k.data.meta.title = n, k.save(), Ze(), Ue?.sendPage(V(T), k.data)) : Ba(e, (e) => {
			e.meta.title = n;
		});
	}
	let Ma = /* @__PURE__ */ N($t({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function Na() {
		let e = k?.data?.meta ?? {};
		P(Ma, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function Pa(e, t) {
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
		k.save(), Ze(), Na();
		let r = V(A).pages.find((e) => e.id === V(T));
		V(Ia)[V(T)] = !r?.noindex && !k.data.meta.description;
	}
	function Fa(e) {
		let t = V(A).pages.find((e) => e.id === V(T));
		t && (fa("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), V(Ia)[V(T)] = !e && !k?.data?.meta?.description);
	}
	let Ia = /* @__PURE__ */ N($t({}));
	async function La() {
		let e = {};
		for (let t of V(A).pages) {
			if (t.noindex) continue;
			if (t.id === V(T)) {
				e[t.id] = !k?.data?.meta?.description;
				continue;
			}
			let n = await za(t);
			e[t.id] = !n?.meta?.description;
		}
		P(Ia, e, !0);
	}
	bn(() => {
		V(kt) === "pages" && V(T) && La();
	});
	async function Ra(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			Pa("ogImage", (await Or(t)).dataUrl);
		} catch {
			E(Q("status.imageReadError"), "error");
		}
	}
	async function za(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Os(await t.json(), He.data);
		} catch {}
		return qi(e);
	}
	async function Ba(e, t) {
		let n = await za(e);
		t(n), ie(`urd-draft-${e.id}`, JSON.stringify(n)), Ze();
	}
	function Wa(e, t) {
		let n = Da(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Sa(n, e.id);
		if (r) {
			E(r, "error");
			return;
		}
		fa("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Ga(e) {
		e.path !== "/" && (fa("pages", () => {
			V(A).pages = V(A).pages.filter((t) => t.id !== e.id), V(A).nav.items = V(A).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of V(A).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			V(A).nav.items = V(A).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === V(T) && Ji(V(A).pages[0].id), E(Q("status.pageRemoved")));
	}
	function Ka(e) {
		fa("edit:nav-logo", () => {
			V(A).nav.logo = {
				type: "text",
				value: "",
				...V(A).nav.logo,
				...e
			};
		});
	}
	function qa(e) {
		fa("nav", () => {
			V(A).nav.logo ??= {
				type: "text",
				value: V(A).site.title
			};
			let t = V(A).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = V(A).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = V(A).site.title), delete t.image), t.type = e;
		});
	}
	async function Ja(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Or(t);
			fa("nav", () => {
				let t = V(A).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			E(Q("status.imageReadErrorSvg"), "error");
		}
	}
	let Ya = /* @__PURE__ */ N(null);
	async function Xa(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Dr(t);
				P(Ya, e.dataUrl, !0);
			} catch {
				E(Q("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			P(Ya, String(n.result), !0);
		}, n.onerror = () => E(Q("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Za(e) {
		fa("edit:site-icon", () => {
			V(A).site.icon = e;
		}), P(Ya, null);
	}
	function Qa() {
		fa("edit:site-icon", () => {
			delete V(A).site.icon;
		});
	}
	function $a(e) {
		fa("edit:site-title", () => {
			V(A).site.title = e;
		});
	}
	function eo(e) {
		fa("edit:site-desc", () => {
			V(A).site.description = e;
		});
	}
	function to(e) {
		let t = String(e ?? "").trim();
		fa("edit:site-analytics", () => {
			t ? V(A).analytics = { token: t } : delete V(A).analytics;
		});
	}
	let ro = /* @__PURE__ */ j(() => V(A)?.layout?.contentWidth ?? 1440), io = /* @__PURE__ */ j(() => V(A)?.layout?.gutter ?? 6), ao = /* @__PURE__ */ j(() => Ro(V(ro))), oo = /* @__PURE__ */ j(() => jo.find((e) => e.gutter === V(io))?.id ?? null), so = /* @__PURE__ */ N(!1), co = /* @__PURE__ */ j(() => V(ro) === "full" ? Ao : Po(V(ro))), lo = /* @__PURE__ */ j(() => No.map((e) => ({
		screen: e,
		...Lo(V(ro), V(io), e)
	})));
	function uo(e, t) {
		fa(t, () => {
			let t = {
				...V(A).layout ?? {},
				contentWidth: V(ro),
				gutter: V(io),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			V(A).layout = t;
		});
	}
	let fo = (e) => uo({ contentWidth: e === "full" ? "full" : Po(e) }, "edit:site-width"), po = (e) => uo({ gutter: Fo(e) }, "edit:site-gutter");
	function mo() {
		let e = V(A).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function ho() {
		let e = mo(), t = Ft([...Pt, ...Rt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function go(e) {
		fa("site", () => {
			V(A).site.lang = e;
		});
	}
	let yo = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!V(A)?.site) return;
		let e = V(A).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			yo.test(e) && (t.href = e);
		}
	});
	function To(e) {
		fa("nav", () => {
			V(A).nav.layout = e;
		});
	}
	function Eo(e, t) {
		let n = Al(V(A).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], Xo("order", n));
	}
	function Xo(e, t) {
		fa(`edit:nav-tools-${e}`, () => {
			V(A).nav.style ??= {};
			let n = { ...V(A).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(A).nav.style.tools = n : delete V(A).nav.style.tools;
		});
	}
	function Qo(e, t) {
		fa(`edit:nav-style-${e}`, () => {
			V(A).nav.style ??= {}, t === void 0 ? delete V(A).nav.style[e] : V(A).nav.style[e] = t;
		});
	}
	let $o = /* @__PURE__ */ j(() => V(A)?.nav?.variant === "side-left" || V(A)?.nav?.variant === "side-right"), is = /* @__PURE__ */ j(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(V(A)?.nav?.variant)), as = /* @__PURE__ */ j(() => rs(V(A)?.nav?.style)), os = /* @__PURE__ */ j(() => ts(V(A)?.nav?.style, V(A)?.nav?.variant)), ss = /* @__PURE__ */ j(() => ns(V(A)?.nav?.style));
	function cs(e) {
		fa("nav", () => {
			V(A).nav.style ??= {}, e === "md" ? delete V(A).nav.style.size : V(A).nav.style.size = e, delete V(A).nav.style.padY, delete V(A).nav.style.textSize;
		});
	}
	function ls(e, t, n) {
		let r = e.target.value;
		Qo(t, r === "" ? void 0 : es(r, n, void 0)), e.target.value = V(A).nav.style?.[t] ?? "";
	}
	function ds(e, t) {
		fa(`edit:nav-mobile-${e}`, () => {
			V(A).nav.style ??= {};
			let n = { ...V(A).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(A).nav.style.mobile = n : delete V(A).nav.style.mobile;
		});
	}
	let fs = (e) => {
		let t = V(A)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, ms = (e, t) => ds(e, t === "" ? void 0 : t === "on"), _s = (e) => ds("border", e ? {
		...V(A).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function vs(e, t) {
		fa(`edit:nav-announce-${e}`, () => {
			let n = { ...V(A).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(A).nav.announcement = n : delete V(A).nav.announcement;
		});
	}
	let ys = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", bs = /* @__PURE__ */ N(null);
	function xs() {
		let e = V(A).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function Ss(e, t) {
		fa("nav", () => {
			let n = e === null ? V(A).nav.launcher : V(A).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function Cs(e, t) {
		fa(`edit:nav-launcher-${e}`, () => {
			V(A).nav.launcher ??= {
				show: !0,
				links: []
			}, t === void 0 ? delete V(A).nav.launcher[e] : V(A).nav.launcher[e] = t;
		});
	}
	function ws() {
		fa("nav", () => {
			V(A).nav.launcher ??= {
				show: !0,
				links: []
			}, V(A).nav.launcher.links ??= [], V(A).nav.launcher.links.push({
				label: Q("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function Ts(e) {
		fa("nav", () => {
			V(A).nav.launcher.links.splice(e, 1), V(A).nav.launcher.links.length || delete V(A).nav.launcher;
		});
	}
	function Es(e, t) {
		fa("nav", () => {
			let n = V(A).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function ks(e, t, n) {
		fa(`edit:nav-launcher-${t}-${e}`, () => {
			V(A).nav.launcher.links[e][t] = n;
		});
	}
	async function As(e, t) {
		if (e) try {
			let n = await Or(e);
			fa("nav", () => {
				t === null ? V(A).nav.launcher.image = n.dataUrl : V(A).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			E(Q("status.imageReadErrorSvg"), "error");
		}
	}
	function Ms(e, t) {
		fa(`edit:nav-sheet-${e}`, () => {
			V(A).nav.style ??= {};
			let n = { ...V(A).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? V(A).nav.style.sheet = n : delete V(A).nav.style.sheet;
		});
	}
	function Fs(e, t, n) {
		let r = e.target.value;
		Qo(t, r === "" ? void 0 : es(r, n, void 0)), e.target.value = V(t === "padY" ? os : ss);
	}
	function $(e, t, n) {
		let r = e.target.value;
		ds(t, r === "" ? void 0 : es(r, n, void 0)), e.target.value = V(A).nav.style?.mobile?.[t] ?? "";
	}
	function Is(e) {
		let t = es(e / 100, Wo, .5);
		Qo("shrinkTo", t === .5 ? void 0 : t);
	}
	function Ls(e) {
		let t = es(e, Go, 80);
		Qo("shrinkAt", t === 80 ? void 0 : t);
	}
	function Rs(e) {
		let t = es(e, Ko, 220);
		Qo("shrinkMs", t === 220 ? void 0 : t);
	}
	let zs = {
		underline: [Q("hoverColor.underline.label"), Q("hoverColor.underline.title")],
		pill: [Q("hoverColor.pill.label"), Q("hoverColor.pill.title")],
		lift: [Q("hoverColor.lift.label"), Q("hoverColor.lift.title")]
	}, Bs = /* @__PURE__ */ j(() => zs[V(A)?.nav?.style?.hover] ?? null), Vs = /* @__PURE__ */ j(() => [
		["grid", Q("opt.launcherView.grid")],
		["list", Q("opt.launcherView.list")],
		["cover", Q("opt.launcherView.cover")]
	]), Hs = /* @__PURE__ */ j(() => V($o) ? [
		["card", Q("common.standard")],
		["pills", Q("opt.sub.pills")],
		["lines", Q("opt.sub.lines")]
	] : [
		["card", Q("opt.sub.card")],
		["flat", Q("opt.sub.flat")],
		["pills", Q("opt.sub.pills")],
		["lines", Q("opt.sub.lines")],
		["flyout", Q("opt.sub.flyout")]
	]);
	function Us(e) {
		fa("nav", () => {
			e === "bar" ? delete V(A).nav.variant : V(A).nav.variant = e, V(A).nav.style && delete V(A).nav.style.radius;
		});
	}
	function Ws(e) {
		fa("nav", () => {
			V(A).nav.style ??= {}, e ? V(A).nav.style.glow = !0 : delete V(A).nav.style.glow;
		});
	}
	function Gs(e) {
		fa("nav", () => {
			V(A).nav.style ??= {}, e ? delete V(A).nav.style.topGap : V(A).nav.style.topGap = !1;
		});
	}
	function Ks(e) {
		fa("nav", () => {
			V(A).nav.style ??= {}, e === "standard" ? delete V(A).nav.style.hover : V(A).nav.style.hover = e;
		});
	}
	let qs = null, Js = {}, Ys = {}, Xs = !1, Zs = /* @__PURE__ */ N($t([])), Qs = /* @__PURE__ */ N($t({})), $s = /* @__PURE__ */ N(null), ec = /* @__PURE__ */ N(""), tc = /* @__PURE__ */ N("news"), nc = [
		["news", Q("collectionKind.news")],
		["notices", Q("collectionKind.notices")],
		["publications", Q("collectionKind.publications")],
		["products", Q("collectionKind.products")],
		["custom", Q("collectionKind.custom")]
	], rc = null, ic = {}, ac = {}, oc = !1, sc = /* @__PURE__ */ N($t([]));
	async function dc() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		rc = Zi("urd-draft-templates", () => e, D, "urd-draft-maler"), P(sc, [...rc.data.maler ?? []], !0);
		for (let e of V(sc)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			ac[e] = t, ic[e] = Zi(`urd-draft-template-${e}`, () => t, D, `urd-draft-mal-${e}`), (ic[e].data?.schemaVersion ?? 1) > 1 && ic[e].reset();
		}
		oc = !0, fc();
	}
	function fc() {
		let e = V(sc).map((e) => ic[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(ic[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		Ue?.sendTemplates(e);
	}
	function pc(e) {
		let t = cc.includes(e.kind) ? e.kind : "section";
		return vc(t, e[t]);
	}
	function hc(e) {
		let { section: t, block: n } = Ht(e.sectionId, e.blockId);
		!t || !n?.sticky || qt.some(([t]) => t === e.dock) && (nt(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, k.save(), Ze(), Ue?.sendSection(V(T), t), Ut());
	}
	function gc(e) {
		let t = e.blockIds ?? [], { section: n } = Ht(e.sectionId, t[0]);
		if (!n || !t.length) return;
		nt(`sticky-group:${e.sectionId}`);
		let r = e.on ? Ps("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Ve(n, "block-edited"), k.save(), Ze(), Ue?.sendSection(V(T), n), Ut(), E(Q(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function vc(e, t) {
		if (!t || !rc) return;
		let n = (await gt({
			title: Q("canvas.templateNamePrompt"),
			placeholder: Q("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = lc(n);
		if (!r) {
			E(Q("status.invalidName"), "error");
			return;
		}
		if (V(sc).includes(r)) {
			E(Q("status.templateExists"), "error");
			return;
		}
		nt("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		ic[r] = Zi(`urd-draft-template-${r}`, () => null, D, `urd-draft-mal-${r}`), ic[r].replace(i), ic[r].save(), rc.data.maler = [...V(sc), r], rc.save(), P(sc, [...V(sc), r], !0), E(Q("status.templateSaved", { name: n }), "ok"), Ze(), fc();
	}
	async function Cc(e) {
		let t = ic[e.id]?.data?.mal;
		t && await ht({ title: Q("confirm.deleteTemplate", { name: t.name }) }) && (nt("templates"), V(ma) === e.id && P(ma, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete ic[e.id], rc.data.maler = V(sc).filter((t) => t !== e.id), rc.save(), P(sc, V(sc).filter((t) => t !== e.id), !0), Ze(), fc());
	}
	async function wc() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		qs = Zi("urd-draft-collections", () => e, D, "urd-draft-samlinger"), P(Zs, [...qs.data.samlinger ?? []], !0);
		for (let e of V(Zs)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Ys[e] = t, Js[e] = Zi(`urd-draft-collection-${e}`, () => t, D, `urd-draft-samling-${e}`), !t && !Js[e].data && (Js[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Js[e].save());
		}
		Xs = !0, Tc();
	}
	function Tc(e = !0) {
		let t = {};
		for (let e of V(Zs)) Js[e] && (t[e] = JSON.parse(JSON.stringify(Js[e].data)));
		P(Qs, t, !0), e && Ec();
	}
	function Ec() {
		Ue?.sendCollections(We(V(Qs)) ?? {});
	}
	function Dc(e, t, n, r = !0) {
		let i = Js[e];
		i && (nt(t), n(i.data), i.save(), Ze(), Tc(r));
	}
	function Oc(e) {
		Js[e.collection] && Fc(e.collection);
	}
	function kc(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function Ac(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !kc(i) || Dc(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function jc(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		Js[e] = Zi(`urd-draft-collection-${e}`, () => null, D, `urd-draft-samling-${e}`), Js[e].replace(r), Js[e].save(), qs.data.samlinger = [...V(Zs), e], qs.save(), P(Zs, [...V(Zs), e], !0), P($s, e, !0), Ze(), Tc();
	}
	function Mc() {
		let e = V(ec).trim();
		if (!e) return;
		let t = Da(e);
		if (!t || V(Zs).includes(t)) {
			E(Q(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		nt("collections"), jc(t, e, V(tc)), P(ec, "");
	}
	function Nc() {
		let e = Q("seed.productCatalogName"), t = Da(e) || "collection", n = t;
		for (let e = 2; V(Zs).includes(n); e += 1) n = `${t}-${e}`;
		nt("collections"), jc(n, e, "products"), Xt(null, (e) => {
			e.props.collection = n;
		});
	}
	function Pc(e) {
		nt("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete Js[e], qs.data.samlinger = V(Zs).filter((t) => t !== e), qs.save(), P(Zs, V(Zs).filter((t) => t !== e), !0), V($s) === e && P($s, null), Ze(), Tc();
	}
	function Fc(e) {
		Dc(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: Ps("entry"),
				title: Q("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: Ps("entry"),
				title: Q("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function Ic(e, t, n, r) {
		Dc(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Lc(e, t, n) {
		Dc(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Rc(e, t) {
		Dc(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function zc(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Ic(e, t, "image", (await Or(r)).dataUrl);
	}
	function Bc(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		Ic(e, t, "sizes", r.length ? r : "");
	}
	function Vc(e, t) {
		Dc(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Q("ph.colorName") }]);
		});
	}
	function Hc(e, t, n, r, i) {
		Dc(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function Wc(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Hc(e, t, n, "image", (await Or(i)).dataUrl);
	}
	function qc(e, t, n) {
		Dc(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function Jc(e) {
		let t = Js[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([mc(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function Qc(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = _c(await n.text());
		if (!r) {
			E(Q("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = Ps("entry")), i.add(e.id);
		Dc(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), E(Q("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let tl = null, nl, cl = new Promise((e) => {
		nl = e;
	}), ll = /* @__PURE__ */ N(null), ul = $t({}), dl = /* @__PURE__ */ N("0.0.0"), fl = /* @__PURE__ */ N(""), pl = /* @__PURE__ */ N(""), ml = /* @__PURE__ */ N($t([])), hl = /* @__PURE__ */ N($t([])), gl = /* @__PURE__ */ N("pending"), _l = () => [.../* @__PURE__ */ new Set([...V(ll)?.enabled ?? [], ...V(ll)?.disabled ?? []])];
	function vl() {
		P(ll, JSON.parse(JSON.stringify(tl.data)), !0);
	}
	let xl = /* @__PURE__ */ N(null);
	async function Cl() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				P(xl, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			P(xl, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			P(xl, { unknown: !0 }, !0);
		}
	}
	function wl(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!V(xl) || V(xl).unknown) return [];
		let n = {
			"script-src": V(xl).scriptSrc,
			"connect-src": V(xl).connectSrc,
			"frame-src": V(xl).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Tl() {
		Cl();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		P(hl, e.enabled ?? [], !0), tl = Zi("urd-draft-plugins", () => e, D), vl();
		try {
			P(dl, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of _l()) kl(e);
		El(), nl(), Ue?.sendPlugins(We(V(ll))?.enabled ?? []);
	}
	async function El() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Dl();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), P(ml, (t ?? []).filter((e) => !_l().includes(e)), !0);
			for (let e of V(ml)) kl(e);
			P(gl, "ok");
		} catch {
			Dl();
		}
	}
	function Dl() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				P(ml, e.filter((e) => !_l().includes(e)), !0);
				for (let e of V(ml)) kl(e);
				P(gl, "ok");
				return;
			}
		} catch {}
		P(gl, "unavailable");
	}
	async function kl(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Ns(t);
			ul[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && js(V(dl), t.requiresEngine)
			};
		} catch {
			ul[e] = {
				name: e,
				errors: [Q("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function jl(e, t) {
		nt("plugins");
		let n = tl.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), tl.save(), Ze(), vl(), Ml();
	}
	function Ml() {
		V(ae) && (V(ae).src = V(ae).src);
	}
	function Nl(e) {
		nt("plugins");
		let t = tl.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), tl.save(), Ze(), vl(), Ml();
	}
	async function Pl() {
		P(pl, "");
		let e = V(fl).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			P(pl, Q("plugin.invalidId"), !0);
			return;
		}
		if (_l().includes(e)) {
			P(pl, Q("plugin.alreadyListed"), !0);
			return;
		}
		if (await kl(e), ul[e].errors.length) {
			P(pl, Q("plugin.invalidManifest", { errors: ul[e].errors.join("; ") }), !0);
			return;
		}
		jl(e, !0), P(fl, "");
	}
	function Fl(e) {
		P(ml, V(ml).filter((t) => t !== e), !0), jl(e, !0);
	}
	function Il(e, t) {
		fa(e, () => {
			V(A).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(V(A).footer);
		});
	}
	function Ll(e, t) {
		Il(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function Rl(e) {
		Il("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function zl(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Or(t);
			Il("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			E(Q("status.imageReadErrorSvg"), "error");
		}
	}
	function Bl() {
		Il("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Vl(e) {
		Il("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Hl(e) {
		Il("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let Ul = [
		{
			id: "minimal",
			label: Q("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "centered",
			label: Q("footerTemplate.centered"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "columns",
			label: Q("footerTemplate.columns"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: Q("footerTemplate.sitemap"),
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
			label: Q("footerTemplate.newsletter"),
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
			label: Q("footerTemplate.bigcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "contact",
			label: Q("footerTemplate.contact"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: Q("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function Wl(e) {
		let t = Q("seed.orgName"), n = V(A).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a(Q("seed.footer.privacy"), "#")]
		} : e === "centered" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Q("seed.footer.madeWith")}`
		} : e === "columns" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline1")
			},
			columns: [
				{
					title: Q("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: Q("seed.footer.colCompany"),
					links: [
						a(Q("seed.footer.about"), "#"),
						a(Q("seed.join"), "#"),
						a(Q("seed.footer.press"), "#")
					]
				},
				{
					title: Q("seed.footer.colResources"),
					links: [
						a(Q("seed.footer.bylaws"), "#"),
						a(Q("seed.footer.privacy"), "#"),
						a(Q("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#"), a(Q("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline2")
			},
			columns: [
				{
					title: Q("seed.footer.colExplore"),
					links: [
						a(Q("seed.footer.home"), "#"),
						a(Q("seed.footer.events"), "#"),
						a(Q("seed.footer.gallery"), "#"),
						a(Q("seed.footer.blog"), "#")
					]
				},
				{
					title: Q("seed.footer.colCompany"),
					links: [
						a(Q("seed.footer.about"), "#"),
						a(Q("seed.footer.history"), "#"),
						a(Q("seed.footer.press"), "#"),
						a(Q("seed.footer.contact"), "#")
					]
				},
				{
					title: Q("seed.footer.colSupport"),
					links: [
						a(Q("seed.join"), "#"),
						a(Q("seed.footer.faq"), "#"),
						a(Q("seed.footer.help"), "#")
					]
				},
				{
					title: Q("seed.footer.colLegal"),
					links: [
						a(Q("seed.footer.privacy"), "#"),
						a(Q("seed.footer.terms"), "#"),
						a(Q("seed.footer.bylaws"), "#")
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
				a(Q("seed.footer.privacy"), "#"),
				a(Q("seed.footer.terms"), "#"),
				a(Q("seed.footer.cookies"), "#")
			]
		} : e === "newsletter" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: Q("seed.footer.newsletterHeading"),
				label: Q("seed.footer.newsletterButton"),
				recipient: Q("seed.email"),
				success: Q("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: Q("seed.footer.colPages"),
				links: r(4)
			}, {
				title: Q("seed.footer.colMore"),
				links: [
					a(Q("seed.footer.about"), "#"),
					a(Q("seed.footer.contact"), "#"),
					a(Q("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#")]
		} : e === "bigcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: Q("seed.footer.ctaHeading"),
				sub: Q("seed.footer.ctaSub"),
				label: Q("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#"), a(Q("seed.footer.terms"), "#")]
		} : e === "contact" ? {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline4")
			},
			columns: [
				{
					title: Q("seed.footer.colVisit"),
					links: [
						a(Q("seed.footer.address"), "#"),
						a(Q("seed.email"), `mailto:${Q("seed.email")}`),
						a(Q("seed.phone"), `tel:${Q("seed.phone").replace(/\s+/g, "")}`)
					]
				},
				{
					title: Q("seed.footer.colHours"),
					links: [a(Q("seed.footer.hours1"), "#"), a(Q("seed.footer.hours2"), "#")]
				},
				{
					title: Q("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: Q("seed.footer.tagline5")
			},
			columns: [{
				title: Q("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: Q("seed.footer.colFollow"),
				links: [a(Q("seed.footer.newsletter"), "#"), a(Q("seed.email"), `mailto:${Q("seed.email")}`)]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(Q("seed.footer.privacy"), "#"), a(Q("seed.footer.madeWith"), "#")],
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
	function Gl(e) {
		Il("footer-template", (t) => {
			let n = Wl(e);
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
	function Kl(e) {
		Il("footer", (t) => {
			t[e] ??= [], t[e].push(V(A).pages[0] ? {
				label: Q("seed.link"),
				page: V(A).pages[0].id
			} : {
				label: Q("seed.link"),
				href: "https://"
			});
		});
	}
	function ql(e, t) {
		Il("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function Jl(e, t, n) {
		Il("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Yl(e, t, n) {
		Il(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Xl(e, t, n) {
		Il("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Zl(e, t, n) {
		Il(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function $l(e) {
		Il("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function eu(e) {
		Il("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Q("seed.join")
			} : delete t.cta;
		});
	}
	function tu(e, t) {
		Il(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function nu(e) {
		Il("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function iu(e, t) {
		Il("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function au() {
		Il("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Q("seed.column"),
				links: [{
					label: Q("seed.link"),
					page: V(A).pages[0].id
				}]
			});
		});
	}
	function ou(e) {
		Il("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function su(e, t) {
		Il("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function cu(e, t) {
		Il(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function du(e) {
		Il("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Q("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function fu(e, t) {
		Il("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function pu(e, t, n) {
		Il("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Fm(e, t, n) {
		Il(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Im(e, t, n) {
		Il("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Lm(e, t, n) {
		Il(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Rm() {
		Il("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function zm(e) {
		Il("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Bm(e, t) {
		Il("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Vm(e, t) {
		Il("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Hm(e, t) {
		Il(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Um = Ha.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Q(Va[e].labelKey)]));
	function Wm(e, t) {
		fa(`edit:nav-label-${e}`, () => {
			V(A).nav.items[e].label = t;
		});
	}
	function Gm(e, t) {
		fa("nav", () => {
			let n = V(A).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Km(e, t) {
		fa(`edit:nav-href-${e}`, () => {
			V(A).nav.items[e].href = t;
		});
	}
	function qm(e, t) {
		let n = e + t, r = V(A).nav.items;
		n < 0 || n >= r.length || fa("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Jm(e) {
		fa("nav", () => {
			V(A).nav.items.splice(e, 1);
		});
	}
	let Ym = /* @__PURE__ */ N(""), Xm = /* @__PURE__ */ N(""), Zm = /* @__PURE__ */ N(null);
	function Qm(e) {
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
	function $m(e, t, n, r) {
		if (!V(Xm) || V(Xm) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = Qm(V(Xm)), c = Qm(t), l = s.list[s.index], u;
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
		}, eh(u, l, s);
	}
	function eh(e, t, n) {
		let r = Qm(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = Qm(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : V(A).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function th() {
		if (!V(Xm)) return {
			label: "",
			target: ""
		};
		let e = Qm(V(Xm)), t = e.list[e.index], n = t.page ? V(A).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Q("opt.noLink")
		};
	}
	function nh() {
		V(Zm) && ih(V(Zm).key), P(Xm, ""), P(Zm, null);
	}
	function rh(e) {
		if (!V(Xm)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = $m(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = Qm(V(Xm)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === V(Xm) ? null : eh({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === V(Xm) ? null : eh({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			P(Zm, null);
			return;
		}
		e.preventDefault(), (V(Zm)?.key !== r.key || V(Zm)?.pos !== r.pos) && P(Zm, r, !0);
	}
	function ih(e) {
		let t = V(Xm), n = V(Zm);
		if (P(Xm, ""), P(Zm, null), !(!t || !n || n.key !== e || t === e)) {
			{
				let r = Qm(t), i = Qm(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			fa("nav", () => {
				let r = V(A).nav.items, i = Qm(t), a = Qm(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && delete i.parent.children, n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = V(A).pages[0].id);
				}
			}), P(Ym, "");
		}
	}
	let ah = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function oh() {
		fa("nav", () => {
			V(A).nav.items.push({
				label: Q("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function sh(e) {
		fa("nav", () => {
			let t = V(A).nav.items[e];
			t.children ??= [], t.children.push({
				label: Q("seed.link"),
				page: V(A).pages[0].id
			});
		});
	}
	function ch(e, t, n) {
		fa(`edit:nav-child-label-${e}-${t}`, () => {
			V(A).nav.items[e].children[t].label = n;
		});
	}
	function lh(e, t, n) {
		fa("nav", () => {
			let r = V(A).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function uh(e, t, n) {
		fa(`edit:nav-child-href-${e}-${t}`, () => {
			V(A).nav.items[e].children[t].href = n;
		});
	}
	function dh(e, t, n) {
		let r = t + n, i = V(A).nav.items[e].children;
		r < 0 || r >= i.length || fa("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function fh(e, t) {
		fa("nav", () => {
			let n = V(A).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = V(A).pages[0].id));
		});
	}
	function ph(e, t) {
		fa(`edit:theme-color-${e}`, () => {
			V(A).theme.tokens.color[e] = t, V(A).theme.alt?.auto && (V(A).theme.alt.tokens.color = Dh());
		});
	}
	function mh(e, t) {
		return e === "accent-text" ? C(Fh(t.accent ?? "#000000", t)) : t.bg;
	}
	let hh = /* @__PURE__ */ j(() => !V(A)?.theme?.tokens?.color?.["accent-text"] && !V(A)?.theme?.alt?.tokens?.color?.["accent-text"]), gh = /* @__PURE__ */ N(null), _h = /* @__PURE__ */ N(!1), vh = /* @__PURE__ */ N(!1), yh = (e) => e.length > 0 && [...e].every((e) => e.open);
	function bh() {
		let e = V(gh)?.querySelectorAll("details.group") ?? [];
		P(_h, e.length > 0), P(vh, yh(e), !0);
	}
	bn(() => {
		V(kt), fr().then(bh);
	});
	function xh() {
		let e = !V(vh);
		V(gh)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), bh();
	}
	function Sh(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = v.foldToggle;
			let i = () => {
				let e = yh(n());
				r.classList.toggle("collapse", e), r.title = Q(e ? "ui.collapseSub" : "ui.expandSub"), r.setAttribute("aria-label", r.title);
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
		let e = V(gh);
		if (!e) return;
		let t = new MutationObserver(() => {
			Sh(e), bh();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", bh, !0), Sh(e), () => {
			t.disconnect(), e.removeEventListener("toggle", bh, !0);
		};
	});
	function Ch(e) {
		fa("edit:theme-color-accent-text", () => {
			e ? (delete V(A).theme.tokens.color["accent-text"], V(A).theme.alt?.tokens?.color && delete V(A).theme.alt.tokens.color["accent-text"]) : (V(A).theme.tokens.color["accent-text"] = mh("accent-text", V(Zr)), V(A).theme.alt?.auto && (V(A).theme.alt.tokens.color = Dh()));
		});
	}
	function wh(e, t) {
		fa("theme", () => {
			V(A).theme.tokens.font[e] = t;
		});
	}
	function Th(e, t) {
		fa("theme", () => {
			V(A).theme.tokens.radius[e] = t;
		});
	}
	function Eh(e) {
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
	function Dh() {
		return Object.fromEntries(Object.entries(V(A).theme.tokens.color).map(([e, t]) => [e, Eh(t)]));
	}
	function Oh(e, t) {
		fa(`edit:theme-alt-${e}`, () => {
			V(A).theme.alt.tokens.color[e] = t, V(A).theme.alt.auto = !1;
		});
	}
	function kh(e) {
		fa("theme", () => {
			e === "light" ? delete V(A).theme.scheme : V(A).theme.scheme = e;
		});
	}
	function Ah(e) {
		fa("theme", () => {
			e ? V(A).theme.alt = {
				auto: !0,
				tokens: { color: Dh() }
			} : delete V(A).theme.alt;
		});
	}
	function jh(e) {
		fa("theme", () => {
			V(A).theme.alt ??= { tokens: { color: Dh() } }, V(A).theme.alt.auto = e, e && (V(A).theme.alt.tokens.color = Dh());
		});
	}
	function Mh(e) {
		let t = V(A).theme.tokens.font[e];
		return [...hu.some(([, e]) => e === t) ? [] : [[t, Q("opt.customFont")]], ...hu.map(([e, t]) => [t, Q(e)])];
	}
	let Nh = (e) => parseInt(e, 10) || 0;
	function Ph(e, t) {
		Th(e, `${t}px`);
	}
	let Fh = (e, t) => e && t && t[e] ? t[e] : e, Ih = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Lh = [
		{
			id: "well",
			name: Q("themePreset.well.name"),
			note: Q("themePreset.well.note"),
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
			name: Q("themePreset.stone.name"),
			note: Q("themePreset.stone.note"),
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
			name: Q("themePreset.plum.name"),
			note: Q("themePreset.plum.note"),
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
			name: Q("themePreset.rose.name"),
			note: Q("themePreset.rose.note"),
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
			name: Q("themePreset.ocean.name"),
			note: Q("themePreset.ocean.note"),
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
			name: Q("themePreset.night.name"),
			note: Q("themePreset.night.note"),
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
	function Rh(e) {
		fa("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Ih) V(A).theme.tokens.color[e] = n[e];
			t ? V(A).theme.scheme = "dark" : delete V(A).theme.scheme, V(A).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let zh = /* @__PURE__ */ j(() => {
		if (!V(A)) return null;
		let e = V(A).theme.tokens.color, t = V(A).theme.alt?.tokens?.color ?? {}, n = V(A).theme.scheme === "dark";
		return Lh.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Ih.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), Bh = 0;
	async function Vh() {
		V(ce) && (Bh = V(gh)?.scrollTop ?? 0), P(ce, !V(ce)), Ue?.sendChrome(V(ce)), V(ce) && (await fr(), requestAnimationFrame(() => {
			V(gh) && (V(gh).scrollTop = Bh);
		}));
	}
	function Hh(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (nt(`edit:${e.blockId}`), n.props = e.props, k.save(), Ze(), V(M)?.blockId === e.blockId && Ut(), e.rerender && Ue?.sendSection(V(T), t), P(te, ""));
	}
	function Uh(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		nt(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && Ve(t, "desktop-changed-after-mobile"), k.save(), Ze(), V(M)?.blockId === e.blockId && Ut();
	}
	function Wh(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (k.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), k.hasDraft() && nt(`edit:${e.blockId}`), t.frames.desktop.h = e.h, k.save(), Ze(), V(M)?.blockId === e.blockId && Ut());
	}
	function Gh(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (nt("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Be(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), k.save(), Ze(), Le(), Ue?.sendSection(V(T), t);
		}
	}
	function Kh(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (nt("mobile-order"), n.mobileOrder = e.mobileOrder, k.save(), Ze(), Ue?.sendSection(V(T), t));
	}
	function qh(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (nt("review-done"), t.responsive.mobile.attention = null, k.save(), Ze(), Le());
	}
	function Jh(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (nt("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), k.save(), Ze(), typeof e.hideMobile == "boolean" && V(be) === "mobile" && Ue?.sendSection(V(T), t), V(M)?.blockId === e.blockId && Ut());
	}
	function Yh(e) {
		nt("add-section"), e.section.id || (e.section.id = Ps("sec")), k.data.sections.splice(e.index, 0, e.section), k.save(), Ze(), Ue?.sendPage(V(T), k.data), P(Bn, e.section.id, !0), qn(e.section), P(kt, "properties");
	}
	function Xh(e) {
		let t = k.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (nt("move-section"), [t[n], t[r]] = [t[r], t[n]], k.save(), Ze(), Ue?.sendPage(V(T), k.data));
	}
	function Zh(e) {
		nt("delete-section"), e.sectionId === V(Bn) && (P(Bn, null), P(Vn, null)), V(M)?.sectionId === e.sectionId && P(M, null), k.data.sections = k.data.sections.filter((t) => t.id !== e.sectionId), k.save(), Ze(), Ue?.sendPage(V(T), k.data);
	}
	function Qh(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			nt("section-size"), t.size = {
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
			e.moves?.length && (Ve(t, "section-height"), V(M)?.sectionId === e.sectionId && Ut()), e.sectionId === V(Bn) && P(Hn, e.minHeight, !0), k.save(), Ze();
		}
	}
	function $h(e) {
		let t = k.data.sections.find((t) => t.id === e.fromSectionId), n = k.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (nt("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Ve(t, "block-moved"), Ve(n, "block-moved"), k.save(), Ze(), Le(), Ue?.sendSection(V(T), t), Ue?.sendSection(V(T), n), V(M)?.blockId === e.blockId && (P(M, {
			...V(M),
			sectionId: e.toSectionId
		}, !0), Ut()));
	}
	function eg(e) {
		let t = k.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		nt("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(V(M)?.blockId) && P(M, null), Ve(t, "block-deleted"), k.save(), Ze(), Ue?.sendSection(V(T), t);
	}
	let tg = {
		text: {
			type: "text",
			props: {
				html: Q("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: Q("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: Q("seed.newButton"),
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
				submitLabel: Q("form.sendDefault"),
				successText: Q("form.thanksDefault"),
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
						q: Q("seed.faq.q1"),
						a: Q("seed.faq.answer")
					},
					{
						q: Q("seed.faq.q2"),
						a: Q("seed.faq.answer")
					},
					{
						q: Q("seed.faq.q3"),
						a: Q("seed.faq.answer")
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
						title: Q("seed.timeline.t1"),
						text: Q("seed.timeline.text")
					},
					{
						year: "2022",
						title: Q("seed.timeline.t2"),
						text: Q("seed.timeline.text")
					},
					{
						year: "2026",
						title: Q("seed.timeline.t3"),
						text: Q("seed.timeline.text")
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
				text: Q("seed.quoteBlock.text"),
				attribution: Q("seed.quoteBlock.name"),
				role: Q("seed.quoteBlock.role"),
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
				label: Q("seed.statsBlock.label"),
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
						Q("seed.table.h1"),
						Q("seed.table.h2"),
						Q("seed.table.h3")
					],
					[
						Q("seed.table.r1c1"),
						Q("seed.table.r1c2"),
						""
					],
					[
						Q("seed.table.r2c1"),
						Q("seed.table.r2c2"),
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
				doneText: Q("seed.countdown.done"),
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
	function ng(e) {
		let t = tg[e];
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
	function rg(e) {
		Ue ? Ue.sendPlaceBlock(e) : ig(mi()?.id, e);
	}
	function ig(e, t) {
		let n = k.data.sections.find((t) => t.id === e) ?? k.data.sections[0];
		if (!n) return;
		nt("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Ve(n, "block-added"), k.save(), Ze(), Ue?.sendSection(V(T), n);
	}
	function ag(e, t, n, r) {
		let i = k.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		nt("add-blocks");
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
		}), Ve(i, "block-added"), k.save(), Ze(), Ue?.sendSection(V(T), i);
	}
	function og(e) {
		rg(ng(e));
	}
	let sg = /* @__PURE__ */ N($t([])), cg = { map: [
		{
			key: "location",
			type: "place",
			label: Q("lbl.mapLocation"),
			placeholder: Q("ph.mapLocation")
		},
		{
			key: "zoom",
			type: "number",
			label: Q("lbl.mapZoom"),
			min: 1,
			max: 19
		},
		{
			key: "height",
			type: "number",
			label: Q("lbl.mapHeight"),
			min: 120,
			max: 900,
			step: 10
		}
	] };
	function lg(e, t = {}) {
		let n = We(e);
		rg({
			id: Ps("blk"),
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
	let ug = /* @__PURE__ */ N("");
	function dg() {
		let e = [
			{
				label: Q("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: Q("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: Q("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: Q("blocks.image"),
				act: "image"
			},
			{
				label: Q("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: Q("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: Q("blocks.map"),
				act: "block",
				kind: "map"
			},
			{
				label: Q("blocks.form"),
				act: "block",
				kind: "form"
			},
			{
				label: `${Q("blocks.calendar")}: ${Q("calendar.viewList")}`,
				act: "block",
				kind: "calendar"
			},
			{
				label: `${Q("blocks.calendar")}: ${Q("calendar.viewCards")}`,
				act: "block",
				kind: "calendar-cards"
			},
			{
				label: `${Q("blocks.calendar")}: ${Q("calendar.viewMonth")}`,
				act: "block",
				kind: "calendar-month"
			},
			{
				label: `${Q("blocks.calendar")}: ${Q("calendar.viewNext")}`,
				act: "block",
				kind: "calendar-next"
			},
			{
				label: Q("blocks.collection"),
				act: "block",
				kind: "collection"
			},
			{
				label: Q("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Q("blocks.timeline"),
				act: "block",
				kind: "timeline"
			},
			{
				label: Q("blocks.quote"),
				act: "block",
				kind: "quote"
			},
			{
				label: Q("blocks.stats"),
				act: "block",
				kind: "stats"
			},
			{
				label: Q("blocks.table"),
				act: "block",
				kind: "table"
			},
			{
				label: Q("blocks.share"),
				act: "block",
				kind: "share"
			},
			{
				label: Q("blocks.countdown"),
				act: "block",
				kind: "countdown"
			},
			{
				label: Q("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: Q("blocks.product"),
				act: "block",
				kind: "product"
			},
			{
				label: Q("blocks.cart"),
				act: "block",
				kind: "cart"
			},
			{
				label: Q("blocks.checkout"),
				act: "block",
				kind: "checkout"
			},
			{
				label: Q("ui.emptyGallery"),
				act: "block",
				kind: "gallery"
			},
			{
				label: Q("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: Q("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: Q("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: Q("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: Q("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: Q("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of V(sc)) {
			let n = ic[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of V(sg)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function fg(e) {
		e.act === "block" ? og(e.kind) : e.act === "plugin" ? lg(e.entry, e.props ?? {}) : e.act === "template" && Ue?.sendInsertTemplate(e.id);
	}
	function pg(e) {
		let t = ng(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = k.data.sections.find((t) => t.id === e.sectionId)?.grid ?? V(A).grid, r = gu({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			ig(e.sectionId, t), Ue?.sendSelect(t.id), e.kind === "image" && E(Q("status.imageBlockAdded")), e.kind === "gallery" && E(Q("status.galleryBlockAdded"));
		}
	}
	async function mg(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		E(Q("status.compressingImage"));
		let n;
		try {
			n = await Or(t);
		} catch {
			E(Q("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (V(ae)?.clientWidth ?? 1280));
		rg({
			id: Ps("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Da(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? E(Q("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : E("");
	}
	async function hg(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Or(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Da(i.name).replaceAll("-", " "),
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
	function gg(e, t, n) {
		t ? E(Q("status.imagesReadFailed", { n: t }), "error") : n ? E(Q("status.imagesLarge", { n }), "error") : E(e ? "" : Q("status.noImagesAdded"));
	}
	async function _g(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await hg(t);
		n.length && Xt("gallery-add", (e) => {
			e.props.images.push(...n);
		}), gg(n.length, r, i);
	}
	async function vg(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await hg(t);
		if (!n.length) {
			gg(0, r, i);
			return;
		}
		let a = ng("gallery");
		a.props.images = n, rg(a), gg(n.length, r, i);
	}
	function yg(e, t) {
		Xt("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function bg(e) {
		Xt("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function xg(e, t, n) {
		Xt(`edit:${V(M).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Sg(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Da(n || "image")}-${Oa(a)}.${Ea(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Cg(e, t) {
		Sg(e, "image", e.title, t);
		for (let n of e.colors ?? []) Sg(n, "image", `${e.title}-${n.name}`, t);
	}
	function wg(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && Sg(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) Sg(e, "src", "background", t);
			n.type === "video" && (Sg(n.props, "src", "video", t), Sg(n.props, "poster", "plakat", t));
		}
	}
	function Tg(e, t) {
		if (e.type === "image" && Sg(e.props, "src", e.props.alt, t), e.type === "icon" && Sg(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) Sg(n, "src", n.alt || "gallery", t);
		e.type === "audio" && Sg(e.props, "src", e.props.title || "lyd", t);
	}
	function Eg(e, t) {
		wg(e.background, t);
		for (let n of e.blocks) Tg(n, t);
	}
	function Dg(e) {
		let t = [];
		e.meta?.og && Sg(e.meta.og, "image", "share", t);
		for (let n of e.sections) Eg(n, t);
		return t;
	}
	function Og(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && Sg(n, "value", "logo", t), n?.type === "both" && Sg(n, "image", "logo", t), e.nav?.style && Sg(e.nav.style, "image", "menu", t), wg(e.nav?.style?.background, t), wg(e.footer?.background, t), e.footer?.brand && Sg(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			Sg(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) Sg(n, "image", "snarvei", t);
		}
		return Sg(e.site, "icon", "ikon", t), t;
	}
	let kg = /* @__PURE__ */ N(!1), Ag = /* @__PURE__ */ N(null);
	function jg() {
		P(kg, !V(kg));
	}
	function Mg() {
		P(kg, !1);
		try {
			Ng(), E(Q("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), E(String(e?.message ?? e), "error");
		}
	}
	bn(() => {
		if (!V(kg)) return;
		let e = (e) => {
			if (!V(Ag)?.contains(e.target)) {
				P(kg, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), Mg());
		}, t = (e) => {
			e.key === "Escape" && P(kg, !1);
		}, n = !1, r = (e) => {
			n = !!V(Ag)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || P(kg, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function Ng() {
		nt("discard");
		for (let e of V(A).pages) e.id !== V(T) && !Ye.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = k.reset();
		if (He.reset(), tl && (tl.reset(), vl()), qs) {
			qs.reset(), P(Zs, [...qs.data.samlinger ?? []], !0);
			for (let e of Object.keys(Js)) V(Zs).includes(e) ? Js[e].reset() : delete Js[e];
			Tc();
		}
		if (rc) {
			rc.reset(), P(sc, [...rc.data.maler ?? []], !0);
			for (let e of Object.keys(ic)) V(sc).includes(e) ? ic[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete ic[e]);
			fc();
		}
		Ge(), P(se, {
			snap: !0,
			...V(A).grid
		}, !0), Ze(), P(te, ""), Ke(), V(A).pages.some((e) => e.id === V(T)) ? Ue?.sendPage(V(T), e) : Ji(V(A).pages[0].id);
	}
	async function Pg() {
		if (ji) {
			E(Q("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (V(Ri)) {
			E(Q("update.publishBlocked"), "error");
			return;
		}
		E(Q("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of V(A).pages) {
			let a = `urd-draft-${i.id}`, o = Ye.has(i.id) || !V(w).pages.some((e) => e.id === i.id), s = null;
			if (i.id === V(T) && (k.hasDraft() || o)) s = k.data;
			else if (i.id !== V(T)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Os(JSON.parse(e), He.data);
				} catch {}
			}
			if (!s && o && (s = qi(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Dg(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (He.hasDraft()) {
			let r = JSON.parse(JSON.stringify(V(A)));
			e.push(...Og(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: el(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(V(w).theme, V(A).theme) || t.push(Q("publish.part.theme")), i(V(w).nav, V(A).nav) || t.push(Q("publish.part.nav")), i(V(w).footer, V(A).footer) || t.push(Q("publish.part.footer")), i(V(w).pages, V(A).pages) || t.push(Q("publish.part.pages")), i(V(w).grid, V(A).grid) || t.push(Q("publish.part.grid")), (V(w).site.icon ?? null) !== (V(A).site.icon ?? null) && t.push(Q("publish.part.icon"));
			let { icon: a, ...o } = V(w).site, { icon: s, ...c } = V(A).site;
			i(o, c) || t.push(Q("publish.part.siteInfo"));
		}
		let i = Object.entries(Js).filter(([, e]) => e.hasDraft());
		if (i.length || qs?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Cg(t, e);
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
							title: kc(e.title),
							text: kc(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (qs?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(qs.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!V(Zs).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Q("publish.part.collections"));
		}
		let a = Object.entries(ic).filter(([, e]) => e.hasDraft());
		if (a.length || rc?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Eg(i.section, e);
				for (let t of i.blocks ?? []) Tg(t, e);
				for (let t of i.page?.sections ?? []) Eg(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (rc?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(rc.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!V(sc).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Q("publish.part.templates"));
		}
		tl?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(tl.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(Q("publish.part.plugins")));
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
			content: yc(V(A).pages, location.origin),
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
		for (let e of V(w).pages) {
			let t = V(A).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Ci(e);
		if (!c.ok) {
			E(Q("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: Q("publish.commitMessage", { titles: t.join(", ") || Q("publish.theSite") }),
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
			t ? bi = t : xi(), Dg(k.data), Og(V(A));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) Ye.add(e);
			if (P(w, JSON.parse(JSON.stringify(V(A))), !0), He = Zi("urd-draft-site", () => V(w), D), Ge(), tl) {
				let e = JSON.parse(JSON.stringify(tl.data));
				tl = Zi("urd-draft-plugins", () => e, D), vl();
			}
			if (qs) {
				for (let e of Object.values(Js)) for (let t of e.data.entries) Cg(t, []);
				let e = JSON.parse(JSON.stringify(qs.data));
				qs = Zi("urd-draft-collections", () => e, D, "urd-draft-samlinger"), Ys = {};
				for (let e of V(Zs)) {
					if (!Js[e]) continue;
					let t = JSON.parse(JSON.stringify(Js[e].data));
					Ys[e] = t, Js[e] = Zi(`urd-draft-collection-${e}`, () => t, D, `urd-draft-samling-${e}`);
				}
				Tc();
			}
			if (rc) {
				for (let e of Object.values(ic)) {
					e.data?.section && Eg(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Tg(t, []);
					for (let t of e.data?.page?.sections ?? []) Eg(t, []);
				}
				let e = JSON.parse(JSON.stringify(rc.data));
				rc = Zi("urd-draft-templates", () => e, D, "urd-draft-maler"), ac = {};
				for (let e of V(sc)) {
					if (!ic[e]) continue;
					let t = JSON.parse(JSON.stringify(ic[e].data));
					ac[e] = t, ic[e] = Zi(`urd-draft-template-${e}`, () => t, D, `urd-draft-mal-${e}`);
				}
				fc();
			}
			P(se, {
				snap: !0,
				...V(A).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(k.data));
			k = Zi(`urd-draft-${V(T)}`, () => i, D), Ye.has(V(T)) && ie(`urd-draft-${V(T)}`, JSON.stringify(i)), Ze(), E(Q("status.published"), "info"), Fi(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			E(e?.code === "loginExpired" ? Q("status.loginExpired") : Q("status.loginRequired", { reason: Ui(e) ?? Q("status.unknownReason") }), "error"), await yi();
		} else u?.status === 403 ? E(Ui(await u.json().catch(() => null)) ?? Q("status.noPublishAccess"), "error") : u?.status === 409 ? E(Q("status.publishRace"), "error") : E(u ? Ui(await u.json().catch(() => null)) ?? Q("status.publishFailed") : Q("status.publishUnavailable"), "error");
	}
	pt();
	var Fg = Pm();
	Cr("keydown", en, ft), Cr("pointerdown", en, dt);
	var Ig = L(Fg), Lg = I(Ig), Rg = (e) => {
		var t = qd(), n = I(t);
		q(n, () => v.pencil);
		var r = z(n);
		O(t), B((e, n) => {
			Z(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Q("tip.backToEdit"), () => Q("ui.edit")]), H("click", t, Vh), W(e, t);
	};
	K(Lg, (e) => {
		V(ce) || e(Rg);
	});
	var zg = z(Lg, 2);
	let Bg;
	var Vg = I(zg), Hg = I(Vg), Ug = (e) => {
		var t = af(), n = L(t), r = R(n, !0), i = z(n, 2), a = I(i), o = (e) => {
			var t = Xd(), n = I(t);
			let r;
			var i = I(n);
			q(i, () => v[`device_${V(ve)}`]), q(z(i), () => v.caret), O(n);
			var a = z(n, 2), o = (e) => {
				var t = Yd();
				Jr(t, 21, () => V(ge), (e) => e.id, (e, t) => {
					var n = Jd();
					let r;
					var i = I(n);
					q(i, () => v[`device_${V(t).id}`]);
					var a = z(i);
					O(n), B((e, i) => {
						r = J(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ve) === V(t).id }), Z(n, "title", e), G(a, ` ${i ?? ""}`);
					}, [() => _e(V(t)), () => Q(`lbl.device.${V(t).id}`)]), H("click", n, () => {
						P(ve, V(t).id, !0), P(aa, null);
					}), W(e, n);
				}), O(t), W(e, t);
			};
			K(a, (e) => {
				V(aa) === "device" && e(o);
			}), O(t), B((e) => {
				r = J(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(aa) === "device" }), Z(n, "title", e);
			}, [() => Q("lbl.group.device")]), H("click", n, () => P(aa, V(aa) === "device" ? null : "device", !0)), W(e, t);
		}, s = (e) => {
			var t = Qd(), n = L(t), r = R(n, !0), i = z(n, 2);
			Jr(i, 21, () => V(ge), (e) => e.id, (e, t) => {
				var n = Zd();
				let r;
				q(n, () => v[`device_${V(t).id}`], !0), O(n), B((e) => {
					r = J(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ve) === V(t).id }), Z(n, "title", e);
				}, [() => _e(V(t))]), H("click", n, () => P(ve, V(t).id, !0)), W(e, n);
			}), O(i), B((e) => G(r, e), [() => Q("lbl.group.device")]), W(e, t);
		};
		K(a, (e) => {
			sa.device ? e(o) : e(s, -1);
		});
		var c = z(a, 2), l = (e) => {
			var t = ef(), n = I(t);
			let r;
			var i = I(n), a = R(i);
			q(z(i), () => v.caret), O(n);
			var o = z(n, 2), s = (e) => {
				var t = $d(), n = I(t), r = I(n);
				q(r, () => v.minus, !0), O(r);
				var i = z(r, 2), a = R(i), o = z(i, 2);
				q(o, () => v.plus, !0), O(o), O(n);
				var s = z(n, 2);
				let c;
				var l = I(s);
				q(l, () => v.fit);
				var u = z(l);
				O(s), O(t), B((e, t, n, l, d, f) => {
					Z(r, "title", e), Z(i, "title", t), G(a, `${n ?? ""}%`), Z(o, "title", l), c = J(s, 1, "ghost svelte-1n46o8q", null, c, { active: V(we) === "fit" }), Z(s, "title", d), G(u, ` ${f ?? ""}`);
				}, [
					() => Q("tip.zoomOut"),
					() => Q("tip.zoomCurrent"),
					() => Math.round(V(Ae) * 100),
					() => Q("tip.zoomIn"),
					() => Q("tip.zoomFit"),
					() => Q("lbl.zoom.fit")
				]), H("click", r, () => je(-1)), H("click", o, () => je(1)), H("click", s, () => P(we, "fit")), W(e, t);
			};
			K(o, (e) => {
				V(aa) === "zoom" && e(s);
			}), O(t), B((e, t) => {
				r = J(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(aa) === "zoom" }), Z(n, "title", e), G(a, `${t ?? ""}%`);
			}, [() => Q("lbl.group.zoom"), () => Math.round(V(Ae) * 100)]), H("click", n, () => P(aa, V(aa) === "zoom" ? null : "zoom", !0)), W(e, t);
		}, u = (e) => {
			var t = tf(), n = L(t), r = R(n, !0), i = z(n, 2), a = I(i);
			q(a, () => v.minus, !0), O(a);
			var o = z(a, 2), s = R(o), c = z(o, 2);
			q(c, () => v.plus, !0), O(c);
			var l = z(c, 2);
			let u;
			q(l, () => v.fit, !0), O(l), O(i), B((e, t, n, i, d, f) => {
				G(r, e), Z(a, "title", t), Z(o, "title", n), G(s, `${i ?? ""}%`), Z(c, "title", d), u = J(l, 1, "ghost svelte-1n46o8q", null, u, { active: V(we) === "fit" }), Z(l, "title", f);
			}, [
				() => Q("lbl.group.zoom"),
				() => Q("tip.zoomOut"),
				() => Q("tip.zoomCurrent"),
				() => Math.round(V(Ae) * 100),
				() => Q("tip.zoomIn"),
				() => Q("tip.zoomFit")
			]), H("click", a, () => je(-1)), H("click", c, () => je(1)), H("click", l, () => P(we, "fit")), W(e, t);
		};
		K(c, (e) => {
			sa.zoom ? e(l) : e(u, -1);
		});
		var d = z(c, 2), f = (e) => {
			var t = Xd(), n = I(t);
			let r;
			var i = I(n);
			q(i, () => v.gridToggle), q(z(i), () => v.caret), O(n);
			var a = z(n, 2), o = (e) => {
				var t = nf(), n = I(t);
				let r;
				var i = I(n);
				q(i, () => v.gridToggle);
				var a = z(i);
				O(n);
				var o = z(n, 2);
				let s;
				var c = I(o);
				q(c, () => v.guides);
				var l = z(c);
				O(o), O(t), B((e, t, i, c) => {
					r = J(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(la) }), Z(n, "title", e), G(a, ` ${t ?? ""}`), s = J(o, 1, "ghost svelte-1n46o8q", null, s, { active: V($i) }), Z(o, "title", i), G(l, ` ${c ?? ""}`);
				}, [
					() => Q("tip.gridToggle"),
					() => Q("lbl.view.grid"),
					() => Q("tip.guides"),
					() => Q("lbl.view.guides")
				]), H("click", n, ua), H("click", o, ca), W(e, t);
			};
			K(a, (e) => {
				V(aa) === "view" && e(o);
			}), O(t), B((e) => {
				r = J(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(aa) === "view" || V(la) || V($i) }), Z(n, "title", e);
			}, [() => Q("lbl.group.view")]), H("click", n, () => P(aa, V(aa) === "view" ? null : "view", !0)), W(e, t);
		}, p = (e) => {
			var t = rf(), n = L(t), r = R(n, !0), i = z(n, 2), a = I(i);
			let o;
			q(a, () => v.gridToggle, !0), O(a);
			var s = z(a, 2);
			let c;
			q(s, () => v.guides, !0), O(s), O(i), B((e, t, n) => {
				G(r, e), o = J(a, 1, "ghost svelte-1n46o8q", null, o, { active: V(la) }), Z(a, "title", t), c = J(s, 1, "ghost svelte-1n46o8q", null, c, { active: V($i) }), Z(s, "title", n);
			}, [
				() => Q("lbl.group.view"),
				() => Q("tip.gridToggle"),
				() => Q("tip.guides")
			]), H("click", a, ua), H("click", s, ca), W(e, t);
		};
		K(d, (e) => {
			sa.view ? e(f) : e(p, -1);
		}), O(i), Ai(i, (e) => P(oa, e), () => V(oa)), B((e, t) => {
			Z(n, "title", e), G(r, t);
		}, [() => Q("tip.switchPage"), () => Xe()?.title ?? ""]), H("click", n, () => Vt("pages")), W(e, t);
	};
	K(Hg, (e) => {
		V(w) && e(Ug);
	});
	var Wg = z(Hg, 2), Gg = (e) => {
		var t = of(), n = I(t);
		q(n, () => v.phone);
		var r = z(n, 2), i = R(r, !0), a = R(z(r, 2), !0);
		O(t), B((e, n) => {
			Z(t, "title", e), G(i, n), G(a, V(Ie));
		}, [() => Q("tip.attention"), () => Q(V(Ie) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: V(Ie) })]), H("click", t, Re), W(e, t);
	};
	K(Wg, (e) => {
		V(Ie) > 0 && e(Gg);
	}), O(Vg);
	var Kg = z(Vg, 2), qg = I(Kg), Jg = (e) => {
		var t = cf(), n = I(t), r = R(I(n), !0);
		De(2), O(n);
		var i = z(n, 2), a = I(i);
		let o;
		var s = I(a);
		q(s, () => v.restore);
		var c = R(z(s), !0);
		O(a);
		var l = z(a, 2), u = (e) => {
			var t = sf(), n = I(t);
			q(n, () => v.restore);
			var r = z(n);
			O(t), B((e, n) => {
				Z(t, "title", e), G(r, ` ${n ?? ""}`);
			}, [() => Q("tip.discardArmed"), () => Q("ui.discardConfirm")]), H("click", t, Mg), W(e, t);
		};
		K(l, (e) => {
			V(kg) && e(u);
		}), O(i), Ai(i, (e) => P(Ag, e), () => V(Ag)), O(t), B((e, t, i, s, l) => {
			Z(n, "title", e), Z(n, "aria-label", t), G(r, i), o = J(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: V(kg) }), Z(a, "title", s), G(c, l);
		}, [
			() => Q("ui.unpublished"),
			() => Q("ui.unpublished"),
			() => Q("ui.unpublished"),
			() => V(kg) ? Q("tip.discardArmed") : Q("tip.discard"),
			() => Q("ui.discard")
		]), H("click", a, jg), li(2, t, () => Xi, () => ({
			x: 24,
			duration: Kt ? 0 : 150
		})), W(e, t);
	};
	K(qg, (e) => {
		V(ee) && e(Jg);
	}), O(Kg);
	var Yg = z(Kg, 2), Xg = I(Yg), Zg = (e) => {
		var t = ff(), n = L(t), r = I(n), i = (e) => {
			var t = lf(), n = L(t);
			q(n, () => v.eye);
			var r = R(z(n, 2), !0);
			B((e) => G(r, e), [() => Q("ui.cleanView")]), W(e, t);
		}, a = (e) => {
			var t = lf(), n = L(t);
			q(n, () => v.pencil);
			var r = R(z(n, 2), !0);
			B((e) => G(r, e), [() => Q("ui.edit")]), W(e, t);
		};
		K(r, (e) => {
			V(ce) ? e(i) : e(a, -1);
		}), O(n);
		var o = z(n, 2), s = (e) => {
			var t = uf(), n = I(t), r = (e) => {
				var t = Nr();
				q(L(t), () => v.warn), W(e, t);
			};
			K(n, (e) => {
				V(oe).allowed || e(r);
			});
			var i = z(n, 1, !0);
			O(t), B((e) => {
				Z(t, "title", e), G(i, V(oe).login);
			}, [() => V(oe).allowed ? Q("tip.hasPublishAccess") : Q("tip.noPublishAccess")]), W(e, t);
		}, c = (e) => {
			var t = df(), n = R(t, !0);
			B((e) => G(n, e), [() => Q("ui.loginGitHub")]), W(e, t);
		};
		K(o, (e) => {
			V(oe)?.loggedIn ? e(s) : V(oe) && e(c, 1);
		});
		var l = z(o, 2), u = I(l);
		q(u, () => v.external);
		var d = R(z(u, 2), !0);
		O(l);
		var f = z(l, 2), p = R(f, !0);
		B((e, t, r, i, a) => {
			Z(n, "title", e), Z(l, "href", t), Z(l, "title", r), G(d, i), f.disabled = !V(ee), G(p, a);
		}, [
			() => V(ce) ? Q("tip.chromeHide") : Q("tip.chromeShow"),
			() => Xe()?.path ?? "/",
			() => Q("ui.viewSite"),
			() => Q("ui.viewSite"),
			() => Q("ui.publish")
		]), H("click", n, Vh), H("click", f, Pg), W(e, t);
	};
	K(Xg, (e) => {
		V(w) && e(Zg);
	}), O(Yg), O(zg);
	var Qg = z(zg, 2), $g = (e) => {
		var t = Dm(), i = I(t);
		let o;
		var l = I(i);
		Jr(l, 17, () => At, Wr, (e, t, n) => {
			var r = mf(), i = L(r), a = R(i, !0);
			Jr(z(i, 2), 16, () => V(t), (e) => e, (e, t) => {
				var n = pf();
				let r;
				var i = R(n, !0);
				B(() => {
					r = J(n, 1, "svelte-1n46o8q", null, r, { active: V(kt) === t }), G(i, Mt[t]);
				}), H("click", n, () => Vt(t)), W(e, n);
			}), B((e) => G(a, e), [() => Q(jt[n])]), W(e, r);
		});
		var g = z(l, 2), _ = z(I(g), 2);
		let b;
		q(_, () => v.gear, !0), O(_);
		var S = z(_, 2), w = (e) => {
			var t = _f(), n = I(t), r = R(n, !0), i = z(n, 2), a = I(i);
			us(z(a), {
				get value() {
					return V(x);
				},
				get options() {
					return y;
				},
				onchange: (e) => P(x, e, !0)
			}), O(i);
			var o = z(i, 2), s = I(o), c = z(s);
			{
				let e = /* @__PURE__ */ j(() => [["auto", Q("lang.auto")], ...Lt()]);
				us(c, {
					get value() {
						return zt;
					},
					get options() {
						return V(e);
					},
					onchange: Bt
				});
			}
			O(o);
			var l = z(o, 2), u = I(l), d = z(u);
			{
				let e = /* @__PURE__ */ j(() => [["strip", Q("settings.layoutPickerStrip")], ["menu", Q("settings.layoutPickerMenu")]]);
				us(d, {
					get value() {
						return V(ta);
					},
					get options() {
						return V(e);
					},
					onchange: na
				});
			}
			O(l);
			var f = z(l, 2), p = I(f), m = z(p);
			{
				let e = /* @__PURE__ */ j(() => [["remember", Q("settings.panelsRemember")], ["reset", Q("settings.panelsReset")]]);
				us(m, {
					get value() {
						return V(Dt);
					},
					get options() {
						return V(e);
					},
					onchange: Ot
				});
			}
			O(f);
			var h = z(f, 2), g = R(h, !0), _ = z(h, 2), v = I(_);
			let b;
			var S = R(v, !0), C = z(v, 2);
			let w;
			var T = R(C, !0);
			O(_);
			var ee = z(_, 2), te = (e) => {
				var t = hf(), n = I(t), r = R(n, !0), i = z(n, 2);
				Y(i);
				var a = z(i, 2), o = R(a, !0), s = z(a, 2);
				Y(s), O(t), B((e, t, n, a) => {
					G(r, e), Z(i, "min", 640), Z(i, "max", Co), Z(i, "title", t), X(i, V(fe).width), G(o, n), Z(s, "max", wo), Z(s, "title", a), X(s, V(fe).height || "");
				}, [
					() => Q("lbl.screen.w"),
					() => Q("tip.screen.width", {
						min: 640,
						max: Co
					}),
					() => Q("lbl.screen.h"),
					() => Q("tip.screen.height", {
						min: 480,
						max: wo
					})
				]), H("change", i, (e) => {
					pe({ width: Number(e.target.value) }), e.target.value = V(fe).width;
				}), H("change", s, (e) => {
					pe({ height: Number(e.target.value) }), e.target.value = V(fe).height || "";
				}), W(e, t);
			};
			K(ee, (e) => {
				V(fe).mode === "custom" && e(te);
			});
			var ne = z(ee, 2), re = (e) => {
				var t = gf(), n = L(t), r = R(n, !0), i = z(n, 2), a = I(i), o = z(a);
				Y(o), O(i), B((e, t, s, c, l) => {
					Z(n, "title", e), G(r, t), Z(i, "title", s), G(a, `${c ?? ""} `), Z(o, "placeholder", l), X(o, V(A).analytics?.token ?? "");
				}, [
					() => Q("tip.analytics"),
					() => Q("settings.analytics"),
					() => Q("tip.analytics"),
					() => Q("lbl.analyticsToken"),
					() => Q("ph.analyticsToken")
				]), H("change", o, (e) => to(e.target.value)), W(e, t);
			};
			K(ne, (e) => {
				V(A) && e(re);
			}), O(t), B((e, t, n, c, d, m, y, x, ee, te, ne, re, E, D) => {
				G(r, e), Z(i, "title", t), G(a, `${n ?? ""} `), Z(o, "title", c), G(s, `${d ?? ""} `), Z(l, "title", m), G(u, `${y ?? ""} `), Z(f, "title", x), G(p, `${ee ?? ""} `), Z(h, "title", te), G(g, ne), Z(_, "title", re), b = J(v, 1, "svelte-1n46o8q", null, b, { on: V(fe).mode === "own" }), G(S, E), w = J(C, 1, "svelte-1n46o8q", null, w, { on: V(fe).mode === "custom" }), G(T, D);
			}, [
				() => Q("settings.title"),
				() => Q("topbar.adminTheme.title"),
				() => Q("settings.theme"),
				() => Q("topbar.language.title"),
				() => Q("settings.language"),
				() => Q("tip.settings.layoutPicker"),
				() => Q("settings.layoutPicker"),
				() => Q("tip.settings.panels"),
				() => Q("settings.panels"),
				() => Q("tip.screen.mode"),
				() => Q("settings.screen"),
				() => Q("tip.screen.mode"),
				() => Q("lbl.screen.own"),
				() => Q("lbl.screen.size")
			]), H("click", v, () => pe({ mode: "own" })), H("click", C, () => pe({ mode: "custom" })), W(e, t);
		};
		K(S, (e) => {
			V(ea) && e(w);
		}), O(g), Ai(g, (e) => P(ra, e), () => V(ra)), O(i);
		var ee = z(i, 2), te = (e) => {
			var t = Em();
			let i;
			var o = I(t), l = I(o), g = R(l, !0), _ = z(l, 2), y = (e) => {
				var t = vf();
				let n;
				q(t, () => v.foldToggle, !0), O(t), B((e, r) => {
					n = J(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: V(vh) }), Z(t, "title", e), Z(t, "aria-label", r);
				}, [() => Q(V(vh) ? "ui.collapseAll" : "ui.expandAll"), () => Q(V(vh) ? "ui.collapseAll" : "ui.expandAll")]), H("click", t, xh), W(e, t);
			};
			K(_, (e) => {
				V(_h) && e(y);
			}), O(o);
			var b = z(o, 2), x = (e) => {
				var t = kf(), n = I(t);
				Jr(n, 17, () => V(A).pages, (e) => e.id, (e, t) => {
					var n = wf();
					let r;
					var i = I(n);
					Y(i);
					var a = z(i, 2), o = (e) => {
						var t = yf();
						B((e) => Z(t, "title", e), [() => Q("tip.pages.homeLocked")]), W(e, t);
					}, s = (e) => {
						var n = bf();
						Y(n), B((e, t) => {
							X(n, e), Z(n, "title", t);
						}, [() => V(t).path.slice(1), () => Q("tip.pages.slug")]), H("change", n, (e) => Wa(V(t), e.target.value)), W(e, n);
					};
					K(a, (e) => {
						V(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = z(a, 2), l = (e) => {
						var t = xf();
						q(t, () => v.warn, !0), O(t), B((e) => Z(t, "title", e), [() => Q("tip.pages.missingDescription")]), W(e, t);
					};
					K(c, (e) => {
						V(Ia)[V(t).id] && e(l);
					});
					var u = z(c, 2), d = I(u);
					q(d, () => v.right, !0), O(d);
					var f = z(d, 2), p = I(f);
					q(p, () => v.kebab, !0), O(p);
					var m = z(p, 2), h = (e) => {
						var n = Cf(), r = I(n), i = I(r);
						q(i, () => v.bookmark);
						var a = z(i);
						O(r);
						var o = z(r, 2), s = (e) => {
							var n = Sf(), r = I(n);
							q(r, () => v.cross);
							var i = z(r);
							O(n), B((e, t) => {
								Z(n, "title", e), G(i, ` ${t ?? ""}`);
							}, [() => Q("tip.pages.delete"), () => Q("ui.deletePage")]), H("click", n, () => {
								P(va, null), Ga(V(t));
							}), W(e, n);
						};
						K(o, (e) => {
							V(t).path !== "/" && e(s);
						}), O(n), B((e) => G(a, ` ${e ?? ""}`), [() => Q("ui.savePageTemplate")]), H("click", r, () => Aa(V(t))), W(e, n);
					};
					K(m, (e) => {
						V(va) === V(t).id && e(h);
					}), O(f), O(u), O(n), B((e, a, o) => {
						r = J(n, 1, "page-row svelte-1n46o8q", null, r, { current: V(t).id === V(T) }), X(i, V(t).title), Z(i, "title", e), Z(d, "title", a), d.disabled = V(t).id === V(T), Z(p, "title", o);
					}, [
						() => Q("tip.pages.title"),
						() => Q("tip.pages.open"),
						() => Q("tip.pages.menu")
					]), H("change", i, (e) => ja(V(t), e.target.value)), H("click", d, () => Ji(V(t).id)), H("click", p, () => P(va, V(va) === V(t).id ? null : V(t).id, !0)), W(e, n);
				});
				var r = z(n, 2), i = I(r), a = R(i, !0), o = z(i, 2), s = I(o), c = I(s), l = z(c);
				lt(l), O(s);
				var u = z(s, 2), d = I(u), f = z(d);
				Y(f), O(u);
				var p = z(u, 2), m = I(p), h = z(m);
				lt(h), O(p);
				var g = z(p, 2), _ = I(g), y = z(_), b = (e) => {
					var t = Tf();
					B((e) => {
						Z(t, "src", V(Ma).ogImage), Z(t, "alt", e);
					}, [() => Q("lbl.ogImage")]), W(e, t);
				};
				K(y, (e) => {
					V(Ma).ogImage && e(b);
				}), O(g);
				var x = z(g, 2), S = I(x), C = I(S), w = z(C);
				O(S);
				var ee = z(S, 2), te = (e) => {
					var t = vu();
					q(t, () => v.cross, !0), O(t), B((e) => Z(t, "title", e), [() => Q("tip.seo.removeOgImage")]), H("click", t, () => Pa("ogImage", "")), W(e, t);
				};
				K(ee, (e) => {
					V(Ma).ogImage && e(te);
				}), O(x);
				var ne = z(x, 2), re = I(ne);
				Y(re);
				var E = z(re);
				O(ne), O(o), O(r);
				var D = z(r, 4);
				Y(D);
				var ie = z(D, 2), ae = R(ie, !0), oe = z(ie, 2), se = R(oe, !0), ce = z(oe, 2), le = I(ce);
				let ue;
				var de = I(le), fe = I(de);
				q(fe, () => Uc({ sections: [] }), !0), O(fe);
				var pe = R(z(fe, 2), !0);
				O(de), O(le), Jr(z(le, 2), 17, () => Gc, (e) => e.id, (e, t) => {
					var n = Ef();
					let r;
					var i = I(n), a = I(i);
					q(a, () => ga[V(t).id], !0), O(a);
					var o = R(z(a, 2), !0);
					O(i), O(n), B((e, a) => {
						r = J(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: V(ma) === `preset:${V(t).id}` }), Z(i, "title", e), G(o, a);
					}, [() => Q("tip.pages.templatePick", { name: Q(V(t).labelKey) }), () => Q(V(t).labelKey)]), H("click", i, () => P(ma, V(ma) === `preset:${V(t).id}` ? null : `preset:${V(t).id}`, !0)), W(e, n);
				}), O(ce);
				var me = z(ce, 2), he = (e) => {
					var t = Of(), n = L(t), r = R(n, !0), i = z(n, 2);
					Jr(i, 20, () => V(sc).filter((e) => ic[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = Df();
						let r;
						var i = I(n), a = I(i);
						q(a, () => Uc(ic[t].data.page), !0), O(a);
						var o = R(z(a, 2), !0);
						O(i);
						var s = z(i, 2);
						q(s, () => v.cross, !0), O(s), O(n), B((e, a) => {
							r = J(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: V(ma) === t }), Z(i, "title", e), G(o, ic[t].data.mal.name), Z(s, "title", a);
						}, [() => Q("tip.pages.templatePick", { name: ic[t].data.mal.name }), () => Q("canvas.deleteTemplate")]), H("click", i, () => P(ma, V(ma) === t ? null : t, !0)), H("click", s, () => Cc({ id: t })), W(e, n);
					}), O(i), B((e) => {
						G(r, e), _i(i, V(_a));
					}, [() => Q("canvas.tabMyTemplates")]), W(e, t);
				}, ge = /* @__PURE__ */ j(() => V(sc).some((e) => ic[e]?.data?.mal?.kind === "page"));
				K(me, (e) => {
					V(ge) && e(he);
				}), O(t), B((e, t, n, r, i, o, v, y, b, x, w, T, ee, te, oe, fe, me, he, ge, _e, ve, ye) => {
					G(a, e), Z(s, "title", t), G(c, `${n ?? ""} `), X(l, V(Ma).description), Z(u, "title", r), G(d, `${i ?? ""} `), X(f, V(Ma).ogTitle), Z(f, "placeholder", o), Z(p, "title", v), G(m, `${y ?? ""} `), X(h, V(Ma).ogDescription), Z(h, "placeholder", V(Ma).description), Z(g, "title", b), G(_, `${x ?? ""} `), Z(S, "title", w), G(C, `${T ?? ""} `), Z(ne, "title", ee), Si(re, te), G(E, ` ${oe ?? ""}`), Z(D, "placeholder", fe), Z(ie, "title", me), ie.disabled = he, G(ae, ge), G(se, _e), _i(ce, V(_a)), ue = J(le, 1, "page-template-card svelte-1n46o8q", null, ue, { picked: V(ma) === null }), Z(de, "title", ve), G(pe, ye);
				}, [
					() => Q("ui.seoGroup", { page: V(A).pages.find((e) => e.id === V(T))?.title ?? "" }),
					() => Q("tip.seo.description"),
					() => Q("lbl.seoDescription"),
					() => Q("tip.seo.ogTitle"),
					() => Q("lbl.ogTitle"),
					() => V(A).pages.find((e) => e.id === V(T))?.title ?? "",
					() => Q("tip.seo.ogDescription"),
					() => Q("lbl.ogDescription"),
					() => Q("tip.seo.ogImage"),
					() => Q("lbl.ogImage"),
					() => Q("tip.seo.ogImage"),
					() => V(Ma).ogImage ? Q("ui.changeImage") : Q("ui.chooseImage"),
					() => Q("tip.seo.hideFromSearch"),
					() => V(A).pages.find((e) => e.id === V(T))?.noindex === !0,
					() => Q("lbl.hideFromSearch"),
					() => Q("ph.newPageName"),
					() => Q("hint.pages.autoMenu"),
					() => !V(pa).trim(),
					() => Q("ui.createPage"),
					() => Q("canvas.tabPresets"),
					() => Q("tip.pages.blankPick"),
					() => Q("ui.blankPage")
				]), H("change", l, (e) => Pa("description", e.target.value)), H("change", f, (e) => Pa("ogTitle", e.target.value)), H("change", h, (e) => Pa("ogDescription", e.target.value)), H("change", w, Ra), H("change", re, (e) => Fa(e.target.checked)), H("keydown", D, (e) => e.key === "Enter" && ka()), Ei(D, () => V(pa), (e) => P(pa, e)), H("click", ie, ka), H("click", de, () => P(ma, null)), W(e, t);
			}, S = (e) => {
				var t = gp(), r = I(t), i = I(r), a = R(i, !0), o = z(i, 2), l = I(o);
				{
					let e = /* @__PURE__ */ j(() => Q("common.type")), t = /* @__PURE__ */ j(() => V(A).nav.logo?.type ?? "text"), n = /* @__PURE__ */ j(() => [
						["text", Q("blocks.text")],
						["image", Q("blocks.image")],
						["both", Q("opt.logo.both")]
					]);
					ps(l, {
						get label() {
							return V(e);
						},
						get value() {
							return V(t);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => qa(e)
					});
				}
				var g = z(l, 2), _ = (e) => {
					var t = Af(), n = L(t);
					Y(n);
					var r = z(n, 2), i = I(r);
					{
						let e = /* @__PURE__ */ j(() => Q("tip.nav.logoFont")), t = /* @__PURE__ */ j(() => V(A).nav.logo?.font ?? ""), n = /* @__PURE__ */ j(() => [["", Q("common.inherit")], ...hu.map(([e, t]) => [t, Q(e)])]);
						us(i, {
							get title() {
								return V(e);
							},
							get value() {
								return V(t);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => Ka({ font: e || void 0 })
						});
					}
					var a = z(i, 2);
					Y(a);
					var o = z(a, 2);
					let s;
					var c = R(I(o), !0);
					O(o);
					var l = z(o, 2);
					let u;
					var d = R(I(l), !0);
					O(l), O(r), B((e, t, r, i, f, p, m) => {
						X(n, V(A).nav.logo?.value ?? ""), Z(n, "placeholder", e), Z(a, "title", t), X(a, V(A).nav.logo?.textSize ?? ""), s = J(o, 1, "tbtn svelte-1n46o8q", null, s, { active: V(A).nav.logo?.bold !== !1 }), Z(o, "title", r), G(c, i), u = J(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), Z(l, "title", p), G(d, m);
					}, [
						() => Q("ph.nav.logoName"),
						() => Q("tip.nav.textSize"),
						() => Q("format.bold"),
						() => Q("format.boldLetter"),
						() => !!V(A).nav.logo?.italic,
						() => Q("format.italic"),
						() => Q("format.italicLetter")
					]), H("input", n, (e) => Ka({ value: e.target.value })), H("change", a, (e) => Ka({ textSize: e.target.value ? Number(e.target.value) : void 0 })), H("click", o, () => Ka({ bold: V(A).nav.logo?.bold === !1 })), H("click", l, () => Ka({ italic: !V(A).nav.logo?.italic })), W(e, t);
				};
				K(g, (e) => {
					(V(A).nav.logo?.type ?? "text") !== "image" && e(_);
				});
				var y = z(g, 2), b = (e) => {
					let t = /* @__PURE__ */ j(() => V(A).nav.logo?.type === "image" ? V(A).nav.logo?.value : V(A).nav.logo?.image);
					var n = Nf(), r = L(n), i = I(r), a = I(i), o = (e) => {
						var n = jf();
						B(() => Z(n, "src", V(t))), W(e, n);
					};
					K(a, (e) => {
						V(t) && e(o);
					}), O(i);
					var s = z(i, 2), c = I(s), l = I(c), u = z(l);
					O(c);
					var d = z(c, 2), f = (e) => {
						var n = Mf(), r = R(n, !0);
						B((e) => G(r, e), [() => V(t).split("/").pop()]), W(e, n);
					};
					K(d, (e) => {
						V(t) && e(f);
					}), O(s), O(r);
					var p = z(r, 2), m = I(p), h = I(m), g = R(h, !0), _ = z(h, 2);
					Y(_), O(m);
					var v = z(m, 2), y = I(v), b = R(y, !0), x = z(y, 2);
					Y(x), O(v);
					var S = z(v, 2), C = I(S), w = R(C, !0), T = z(C, 2);
					Y(T), O(S), O(p), B((e, t, n, r, i, a, o, s, u) => {
						Z(c, "title", e), G(l, `${t ?? ""} `), Z(m, "title", n), G(g, r), X(_, V(A).nav.logo?.size ?? 32), Z(v, "title", i), G(b, a), Z(x, "min", Yo.min), Z(x, "max", Yo.max), Z(x, "placeholder", o), X(x, V(A).nav.logo?.mobileSize ?? ""), Z(S, "title", s), G(w, u), X(T, V(A).nav.logo?.radius ?? 0);
					}, [
						() => Q("tip.webpAuto"),
						() => V(t) ? Q("ui.changeImage") : Q("ui.chooseImage"),
						() => Q("tip.nav.logoHeight"),
						() => Q("lbl.height"),
						() => Q("tip.nav.logoHeightMobile"),
						() => Q("lbl.onMobile"),
						() => Q("lbl.navSameAsDesktop"),
						() => Q("tip.nav.logoRadius"),
						() => Q("lbl.rounding")
					]), H("change", u, Ja), H("change", _, (e) => Ka({ size: Number(e.target.value) })), H("change", x, (e) => {
						let t = e.target.value;
						Ka({ mobileSize: t === "" ? void 0 : es(t, Yo, void 0) }), e.target.value = V(A).nav.logo?.mobileSize ?? "";
					}), H("change", T, (e) => Ka({ radius: Number(e.target.value) })), W(e, n);
				};
				K(y, (e) => {
					(V(A).nav.logo?.type ?? "text") !== "text" && e(b);
				});
				var x = z(y, 2), S = (e) => {
					{
						let t = /* @__PURE__ */ j(() => Q("lbl.order")), n = /* @__PURE__ */ j(() => V(A).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ j(() => [["image-first", Q("opt.logo.imageFirst")], ["text-first", Q("opt.logo.textFirst")]]);
						ps(e, {
							get label() {
								return V(t);
							},
							get value() {
								return V(n);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => Ka({ order: e })
						});
					}
				};
				K(x, (e) => {
					V(A).nav.logo?.type === "both" && e(S);
				}), O(o), O(r);
				var C = z(r, 2), w = I(C), T = R(w, !0), ee = z(w, 2), te = I(ee), ne = I(te), re = R(ne, !0), E = z(ne, 2), D = I(E), ie = I(D), ae = R(ie, !0), oe = z(ie, 2);
				Jr(oe, 21, () => [
					["bar", Q("opt.navVariant.bar")],
					["floating", Q("opt.navVariant.floating")],
					["floating-square", Q("opt.navVariant.floatingSquare")],
					["floating-tab", Q("opt.navVariant.floatingTab")],
					["side-left", Q("opt.navVariant.sideLeft")],
					["side-right", Q("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = Pf();
					let o;
					var c = I(a);
					q(c, () => s[r()]);
					var l = R(z(c), !0);
					O(a), B(() => {
						o = J(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(A).nav.variant ?? "bar") === r() }), Z(a, "aria-pressed", (V(A).nav.variant ?? "bar") === r()), G(l, i());
					}), H("click", a, () => Us(r())), W(e, a);
				}), O(oe), O(D);
				var se = z(D, 2), ce = (e) => {
					var t = If(), n = L(t);
					{
						let e = /* @__PURE__ */ j(() => Q("lbl.navPillWidth")), t = /* @__PURE__ */ j(() => Q("tip.nav.pillWidth")), r = /* @__PURE__ */ j(() => V(A).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ j(() => [["content", Q("opt.pillWidth.content")], ["custom", Q("opt.pillWidth.custom")]]);
						ps(n, {
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
							onchange: (e) => Qo("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = z(n, 2), i = (e) => {
						var t = Ff(), n = I(t), r = R(n, !0), i = z(n, 2);
						Y(i), O(t), B((e, n) => {
							Z(t, "title", e), G(r, n), Z(i, "min", Uo.min), Z(i, "max", Uo.max), Z(i, "step", Uo.step), X(i, typeof V(A).nav.style?.pillWidth == "number" ? V(A).nav.style.pillWidth : "");
						}, [() => Q("tip.nav.pillWidthPx"), () => Q("lbl.navPillWidthPx")]), H("change", i, (e) => ls(e, "pillWidth", Uo)), W(e, t);
					};
					K(r, (e) => {
						V(A).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = z(r, 2), o = I(a), s = R(o, !0), c = z(o, 2);
					Y(c), O(a), B((e, t) => {
						Z(a, "title", e), G(s, t), Z(c, "min", qo.min), Z(c, "max", qo.max), Z(c, "step", qo.step), Z(c, "placeholder", V(A).nav.variant === "floating-square" ? "0" : V(A).nav.variant === "floating-tab" ? "12" : "999"), X(c, typeof V(A).nav.style?.radius == "number" ? V(A).nav.style.radius : "");
					}, [() => Q("tip.nav.radius"), () => Q("lbl.navRadius")]), H("change", c, (e) => ls(e, "radius", qo)), W(e, t);
				};
				K(se, (e) => {
					V(is) && e(ce);
				});
				var le = z(se, 2), ue = (e) => {
					{
						let t = /* @__PURE__ */ j(() => Q("lbl.navPlacement")), n = /* @__PURE__ */ j(() => V(A).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ j(() => [
							["top", Q("opt.place.top")],
							["middle", Q("opt.place.middle")],
							["bottom", Q("opt.place.bottom")]
						]);
						ps(e, {
							get label() {
								return V(t);
							},
							get value() {
								return V(n);
							},
							get options() {
								return V(r);
							},
							onchange: (e) => Qo("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, de = (e) => {
					{
						let t = /* @__PURE__ */ j(() => Q("lbl.navPlacement")), n = /* @__PURE__ */ j(() => Q("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ j(() => V(A).nav.layout ?? "right"), i = /* @__PURE__ */ j(() => [
							["left", Q("common.left")],
							["center", Q("common.center")],
							["right", Q("common.right")]
						]);
						ps(e, {
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
							onchange: (e) => To(e)
						});
					}
				};
				K(le, (e) => {
					V($o) ? e(ue) : e(de, -1);
				});
				var fe = z(le, 2), pe = (e) => {
					var t = Lf(), n = L(t), r = I(n);
					Y(r);
					var i = z(r);
					O(n);
					var a = z(n, 2), o = I(a);
					Y(o);
					var s = z(o);
					O(a), B((e, t, c, l) => {
						Z(n, "title", e), Si(r, V(A).nav.style?.glow === !0), G(i, ` ${t ?? ""}`), Z(a, "title", c), Si(o, V(A).nav.style?.topGap !== !1), G(s, ` ${l ?? ""}`);
					}, [
						() => Q("tip.nav.glow"),
						() => Q("lbl.navGlow"),
						() => Q("tip.nav.topGap"),
						() => Q("lbl.navTopGap")
					]), H("change", r, (e) => Ws(e.target.checked)), H("change", o, (e) => Gs(e.target.checked)), W(e, t);
				};
				K(fe, (e) => {
					V(is) && e(pe);
				});
				var me = z(fe, 2), he = (e) => {
					var t = Lf(), n = L(t), r = I(n);
					Y(r);
					var i = z(r);
					O(n);
					var a = z(n, 2), o = I(a);
					Y(o);
					var s = z(o);
					O(a), B((e, t, c, l) => {
						Z(n, "title", e), Si(r, V(A).nav.overlay === !0), G(i, ` ${t ?? ""}`), Z(a, "title", c), Si(o, V(A).nav.style?.inset !== !1), G(s, ` ${l ?? ""}`);
					}, [
						() => Q("tip.nav.overlay"),
						() => Q("lbl.navOverlay"),
						() => Q("tip.nav.inset"),
						() => Q("lbl.navInset")
					]), H("change", r, (e) => fa("nav", () => {
						e.target.checked ? V(A).nav.overlay = !0 : delete V(A).nav.overlay;
					})), H("change", o, (e) => Qo("inset", e.target.checked ? void 0 : !1)), W(e, t);
				};
				K(me, (e) => {
					!V(is) && !V($o) && e(he);
				});
				var ge = z(me, 2), _e = (e) => {
					var t = Rf(), n = L(t);
					{
						let e = /* @__PURE__ */ j(() => Q("lbl.textAlign")), t = /* @__PURE__ */ j(() => Q("tip.nav.sideAlign")), r = /* @__PURE__ */ j(() => V(A).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ j(() => [
							["left", Q("common.left")],
							["center", Q("common.center")],
							["right", Q("common.right")]
						]);
						ps(n, {
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
							onchange: (e) => Qo("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = z(n, 2), i = I(r), a = R(i, !0), o = z(i, 2);
					Y(o), O(r), B((e, t) => {
						Z(r, "title", e), G(a, t), Z(o, "min", Jo.min), Z(o, "max", Jo.max), X(o, V(A).nav.style?.width ?? 250);
					}, [() => Q("tip.nav.colWidth"), () => Q("lbl.navColWidth")]), H("change", o, (e) => {
						let t = es(e.target.value, Jo, 250);
						Qo("width", t === 250 ? void 0 : t), e.target.value = V(A).nav.style?.width ?? 250;
					}), W(e, t);
				};
				K(ge, (e) => {
					V($o) && e(_e);
				}), O(E), O(te);
				var ve = z(te, 4), ye = I(ve), be = R(ye, !0), xe = z(ye, 2), Se = I(xe);
				Jr(Se, 20, () => Zo, (e) => e, (e, t) => {
					var n = pf();
					let r;
					var i = R(n, !0);
					B((e) => {
						r = J(n, 1, "svelte-1n46o8q", null, r, { on: V(as) === t }), G(i, e);
					}, [() => Q(`opt.size.${t}`)]), H("click", n, () => cs(t)), W(e, n);
				}), O(Se);
				var Ce = z(Se, 2), we = I(Ce), Te = R(we, !0), Ee = z(we, 2), Oe = I(Ee), ke = (e) => {
					var t = zf(), n = I(t), r = R(n, !0), i = z(n, 2);
					Y(i);
					var a = z(i, 2);
					Y(a), O(t), B((e, n) => {
						Z(t, "title", e), G(r, n), Z(i, "min", zo.min), Z(i, "max", zo.max), Z(i, "step", zo.step), X(i, V(os)), Z(a, "min", zo.min), Z(a, "max", zo.max), X(a, V(os));
					}, [() => Q("tip.nav.thickness"), () => Q("lbl.navThickness")]), H("input", i, (e) => Qo("padY", e.target.valueAsNumber)), H("change", a, (e) => Fs(e, "padY", zo)), W(e, t);
				};
				K(Oe, (e) => {
					V($o) || e(ke);
				});
				var Ae = z(Oe, 2), je = I(Ae), Me = R(je, !0), Ne = z(je, 2);
				Y(Ne);
				var Pe = z(Ne, 2);
				Y(Pe), O(Ae);
				var Fe = z(Ae, 2), Ie = (e) => {
					var t = Bf(), n = I(t), r = I(n), i = R(r, !0), a = z(r, 2);
					Y(a), O(n);
					var o = z(n, 2), s = I(o), c = R(s, !0), l = z(s, 2);
					Y(l), O(o), O(t), B((e, t, r, s, u, d) => {
						Z(n, "title", e), G(i, t), Z(a, "min", Vo.min), Z(a, "max", Vo.max), Z(a, "placeholder", r), X(a, V(A).nav.style?.padX ?? ""), Z(o, "title", s), G(c, u), Z(l, "min", Ho.min), Z(l, "max", Ho.max), Z(l, "placeholder", d), X(l, V(A).nav.style?.gap ?? "");
					}, [
						() => Q("tip.nav.padX"),
						() => Q("lbl.navPadX"),
						() => Q("common.auto"),
						() => Q("tip.nav.gap"),
						() => Q("lbl.navGap"),
						() => Q("common.auto")
					]), H("change", a, (e) => ls(e, "padX", Vo)), H("change", l, (e) => ls(e, "gap", Ho)), W(e, t);
				};
				K(Fe, (e) => {
					V($o) || e(Ie);
				}), O(Ee), O(Ce), O(xe), O(ve);
				var Le = z(ve, 4), Re = I(Le), ze = R(Re, !0), Be = z(Re, 2), Ve = I(Be), k = (e) => {
					var t = Hf(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2);
					Jr(a, 21, () => [
						["", Q("common.none")],
						["bottom", Q("opt.navBorder.bottom")],
						["top", Q("opt.navBorder.top")],
						["both", Q("opt.navBorder.both")],
						["all", Q("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ j(() => h(V(t), 2));
						let r = () => V(n)[0], i = () => V(n)[1];
						var a = Pf();
						let o;
						var s = I(a);
						q(s, () => c[r()]);
						var l = R(z(s), !0);
						O(a), B(() => {
							o = J(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(A).nav.style?.border?.side ?? "") === r() }), Z(a, "aria-pressed", (V(A).nav.style?.border?.side ?? "") === r()), G(l, i());
						}), H("click", a, () => Qo("border", r() ? {
							...V(A).nav.style?.border ?? {},
							side: r()
						} : void 0)), W(e, a);
					}), O(a), O(n);
					var o = z(n, 2), s = (e) => {
						var t = Vf(), n = I(t), r = R(n, !0), i = z(n, 2);
						Y(i);
						var a = z(i, 2), o = R(a, !0), s = z(a, 2);
						{
							let e = /* @__PURE__ */ j(() => V(A).nav.style.border.color ?? "text"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.borderColorPick"));
							ha(s, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(n);
								},
								onchange: (e) => Qo("border", {
									...V(A).nav.style.border,
									color: e
								})
							});
						}
						O(t), B((e, t, s, c, l) => {
							Z(n, "title", e), G(r, t), Z(i, "title", s), X(i, V(A).nav.style.border.width ?? 1), Z(a, "title", c), G(o, l);
						}, [
							() => Q("tip.nav.borderWidth"),
							() => Q("lbl.navBorderWidth"),
							() => Q("tip.nav.borderWidth"),
							() => Q("tip.nav.borderColorPick"),
							() => Q("lbl.navBorderColor")
						]), H("change", i, (e) => {
							let t = es(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...V(A).nav.style.border };
							t === 1 ? delete n.width : n.width = t, Qo("border", n), e.target.value = V(A).nav.style.border.width ?? 1;
						}), W(e, t);
					};
					K(o, (e) => {
						V(A).nav.style?.border?.side && e(s);
					}), B((e, t, r) => {
						Z(n, "title", e), G(i, t), Z(a, "aria-label", r);
					}, [
						() => Q("tip.nav.border"),
						() => Q("lbl.navBorder"),
						() => Q("lbl.navBorder")
					]), W(e, t);
				};
				K(Ve, (e) => {
					V($o) || e(k);
				});
				var He = z(Ve, 2), We = (e) => {
					{
						let t = /* @__PURE__ */ j(() => Q("lbl.navShadow")), n = /* @__PURE__ */ j(() => Q("tip.nav.shadow")), r = /* @__PURE__ */ j(() => V(A).nav.style?.shadow ?? ""), i = /* @__PURE__ */ j(() => [
							["", Q("common.none")],
							["soft", Q("opt.navShadow.soft")],
							["strong", Q("opt.navShadow.strong")]
						]);
						ps(e, {
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
							onchange: (e) => Qo("shadow", e || void 0)
						});
					}
				};
				K(He, (e) => {
					!V(is) && !V($o) && e(We);
				}), O(Be), O(Le);
				var Ge = z(Le, 4), Ke = I(Ge), qe = R(Ke, !0), Je = z(Ke, 2), Ye = I(Je), Xe = (e) => {
					var t = Gf(), n = I(t), r = R(n, !0), i = z(n, 2), a = I(i);
					Y(a);
					var o = z(a);
					O(i);
					var s = z(i, 2), c = (e) => {
						var t = Wf(), n = L(t);
						{
							let e = /* @__PURE__ */ j(() => Q("lbl.navScroll")), t = /* @__PURE__ */ j(() => Q("tip.nav.scroll")), r = /* @__PURE__ */ j(() => V(A).nav.scroll ?? "none"), i = /* @__PURE__ */ j(() => [
								["none", Q("opt.scroll.none")],
								["shrink", Q("opt.scroll.shrink")],
								["hide", Q("opt.scroll.hide")]
							]);
							ps(n, {
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
								onchange: (e) => fa("nav", () => {
									e === "none" ? delete V(A).nav.scroll : V(A).nav.scroll = e;
								})
							});
						}
						var r = z(n, 2), i = (e) => {
							var t = Uf(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2);
							Y(a);
							var o = R(z(a, 2));
							O(n);
							var s = z(n, 2), c = I(s), l = R(c, !0), u = z(c, 2);
							Y(u);
							var d = R(z(u, 2));
							O(s);
							var f = z(s, 2), p = I(f), m = R(p, !0), h = z(p, 2);
							Y(h);
							var g = R(z(h, 2));
							O(f);
							var _ = z(f, 2), v = (e) => {
								var t = ed(), n = I(t);
								Y(n);
								var r = z(n);
								O(t), B((e, i) => {
									Z(t, "title", e), Si(n, V(A).nav.style?.shrinkLogo === !0), G(r, ` ${i ?? ""}`);
								}, [() => Q("tip.nav.shrinkLogo"), () => Q("lbl.navShrinkLogo")]), H("change", n, (e) => Qo("shrinkLogo", e.target.checked ? !0 : void 0)), W(e, t);
							};
							K(_, (e) => {
								(V(A).nav.logo?.type ?? "text") !== "text" && e(v);
							}), B((e, t, r, c, p, _, v, y) => {
								Z(n, "title", e), G(i, t), X(a, r), G(o, `${c ?? ""}%`), Z(s, "title", p), G(l, _), X(u, V(A).nav.style?.shrinkAt ?? 80), G(d, `${V(A).nav.style?.shrinkAt ?? 80 ?? ""} px`), Z(f, "title", v), G(m, y), X(h, V(A).nav.style?.shrinkMs ?? 220), G(g, `${V(A).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
							}, [
								() => Q("tip.nav.shrinkTo"),
								() => Q("lbl.navShrinkTo"),
								() => Math.round((V(A).nav.style?.shrinkTo ?? .5) * 100),
								() => Math.round((V(A).nav.style?.shrinkTo ?? .5) * 100),
								() => Q("tip.nav.shrinkAt"),
								() => Q("lbl.navShrinkAt"),
								() => Q("tip.nav.shrinkMs"),
								() => Q("lbl.navShrinkMs")
							]), H("input", a, (e) => Is(e.target.valueAsNumber)), H("input", u, (e) => Ls(e.target.valueAsNumber)), H("input", h, (e) => Rs(e.target.valueAsNumber)), W(e, t);
						};
						K(r, (e) => {
							V(A).nav.scroll === "shrink" && e(i);
						}), W(e, t);
					};
					K(s, (e) => {
						V(A).nav.sticky !== !1 && e(c);
					});
					var l = z(s, 2), u = I(l);
					Y(u);
					var d = z(u);
					O(l), O(t), B((e, t, n, s, c) => {
						G(r, e), Z(i, "title", t), Si(a, V(A).nav.sticky !== !1), G(o, ` ${n ?? ""}`), Z(l, "title", s), Si(u, V(A).nav.style?.atTop === "clear"), G(d, ` ${c ?? ""}`);
					}, [
						() => Q("group.navScrolling"),
						() => Q("tip.nav.sticky"),
						() => Q("lbl.navSticky"),
						() => Q("tip.nav.atTop"),
						() => Q("lbl.navAtTop")
					]), H("change", a, (e) => fa("nav", () => {
						V(A).nav.sticky = e.target.checked;
					})), H("change", u, (e) => Qo("atTop", e.target.checked ? "clear" : void 0)), W(e, t);
				};
				K(Ye, (e) => {
					V($o) || e(Xe);
				}), O(Je), O(Ge);
				var Ze = z(Ge, 4), Qe = I(Ze), $e = R(Qe, !0), et = z(Qe, 2), tt = I(et), nt = I(tt), rt = (e) => {
					var t = Kf(), n = I(t), r = R(n, !0), i = z(n, 2);
					Y(i), O(t), B((e, n, a) => {
						Z(t, "title", e), G(r, n), Z(i, "min", zo.min), Z(i, "max", zo.max), Z(i, "placeholder", a), X(i, V(A).nav.style?.mobile?.padY ?? "");
					}, [
						() => Q("tip.nav.thickness"),
						() => Q("lbl.navThickness"),
						() => Q("lbl.navSameAsDesktop")
					]), H("change", i, (e) => $(e, "padY", zo)), W(e, t);
				};
				K(nt, (e) => {
					V($o) || e(rt);
				});
				var it = z(nt, 2), at = I(it), ot = R(at, !0), st = z(at, 2);
				Y(st), O(it), O(tt);
				var ct = z(tt, 2), lt = I(ct), ut = I(lt), dt = R(ut, !0), ft = z(ut, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ j(() => [["", Q("lbl.navSameAsDesktop")], ...Zo.map((e) => [e, Q(`opt.size.${e}`)])]);
					us(ft, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => ds("size", e || void 0)
					});
				}
				O(lt);
				var pt = z(lt, 2), mt = I(pt), ht = R(mt, !0), gt = z(mt, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ j(() => [
						["", Q("lbl.navSameAsDesktop")],
						["left", Q("common.left")],
						["center", Q("common.center")],
						["right", Q("common.right")]
					]);
					us(gt, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => ds("layout", e || void 0)
					});
				}
				O(pt), O(ct);
				var _t = z(ct, 2), vt = I(_t), yt = I(vt), bt = R(yt, !0), xt = z(yt, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ j(() => [
						["", Q("lbl.navSameAsDesktop")],
						["start", Q("common.left")],
						["end", Q("common.right")]
					]);
					us(xt, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => ds("tools", e ? { side: e } : void 0)
					});
				}
				O(vt);
				var St = z(vt, 2), Ct = I(St), wt = R(Ct, !0), Tt = z(Ct, 2);
				{
					let e = /* @__PURE__ */ j(() => fs("inset")), t = /* @__PURE__ */ j(() => [
						["", Q("lbl.navSameAsDesktop")],
						["on", Q("common.on")],
						["off", Q("common.off")]
					]);
					us(Tt, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => ms("inset", e)
					});
				}
				O(St), O(_t);
				var Et = z(_t, 2), Dt = I(Et), Ot = I(Dt), kt = R(Ot, !0), At = z(Ot, 2);
				{
					let e = /* @__PURE__ */ j(() => fs("overlay")), t = /* @__PURE__ */ j(() => [
						["", Q("lbl.navSameAsDesktop")],
						["on", Q("common.on")],
						["off", Q("common.off")]
					]);
					us(At, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => ms("overlay", e)
					});
				}
				O(Dt);
				var jt = z(Dt, 2), Mt = I(jt), Nt = R(Mt, !0), Pt = z(Mt, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ j(() => [
						["", Q("lbl.navSameAsDesktop")],
						["none", Q("common.none")],
						["bottom", Q("opt.navBorder.bottom")],
						["top", Q("opt.navBorder.top")],
						["both", Q("opt.navBorder.both")],
						["all", Q("opt.navBorder.all")]
					]);
					us(Pt, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => _s(e)
					});
				}
				O(jt), O(Et);
				var Ft = z(Et, 2), It = (e) => {
					var t = Vf(), n = I(t), r = R(n, !0), i = z(n, 2);
					Y(i);
					var a = z(i, 2), o = R(a, !0), s = z(a, 2);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.borderColorPick"));
						ha(s, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ds("border", {
								...V(A).nav.style.mobile.border,
								color: e
							})
						});
					}
					O(t), B((e, t, s, c, l) => {
						Z(n, "title", e), G(r, t), Z(i, "title", s), X(i, V(A).nav.style.mobile.border.width ?? 1), Z(a, "title", c), G(o, l);
					}, [
						() => Q("tip.nav.borderWidth"),
						() => Q("lbl.navBorderWidth"),
						() => Q("tip.nav.borderWidth"),
						() => Q("tip.nav.borderColorPick"),
						() => Q("lbl.navBorderColor")
					]), H("change", i, (e) => {
						let t = es(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...V(A).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, ds("border", n), e.target.value = V(A).nav.style.mobile.border.width ?? 1;
					}), W(e, t);
				};
				K(Ft, (e) => {
					V(A).nav.style?.mobile?.border?.side && V(A).nav.style.mobile.border.side !== "none" && e(It);
				});
				var Lt = z(Ft, 2), Rt = I(Lt), zt = I(Rt), Bt = R(zt, !0), Vt = z(zt, 2);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ j(() => [["dropdown", Q("opt.mobileMenu.dropdown")], ["sheet", Q("opt.mobileMenu.sheet")]]);
					us(Vt, {
						filled: !0,
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => Qo("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				O(Rt);
				var M = z(Rt, 2), Ht = (e) => {
					var t = qf(), n = I(t), r = R(n, !0), i = z(n, 2);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ j(() => [
							"top",
							"bottom",
							"left",
							"right",
							"fade",
							"none"
						].map((e) => [e, Q(`opt.sheetMotion.${e}`)]));
						us(i, {
							filled: !0,
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Qo("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					O(t), B((e, n) => {
						Z(t, "title", e), G(r, n);
					}, [() => Q("tip.nav.sheetMotion"), () => Q("lbl.sheetMotion")]), W(e, t);
				};
				K(M, (e) => {
					V(A).nav.style?.mobileMenu === "sheet" && e(Ht);
				}), O(Lt);
				var Ut = z(Lt, 2), Wt = (e) => {
					var t = Jf(), n = L(t), r = I(n);
					Y(r);
					var i = z(r);
					O(n);
					var a = z(n, 2), o = (e) => {
						var t = ed(), n = I(t);
						Y(n);
						var r = z(n);
						O(t), B((e, i) => {
							Z(t, "title", e), Si(n, V(A).nav.style?.sheetTheme === !0), G(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.sheetTheme"), () => Q("lbl.sheetTheme")]), H("change", n, (e) => Qo("sheetTheme", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(a, (e) => {
						V(A).theme?.alt?.tokens && e(o);
					});
					var s = z(a, 2), c = (e) => {
						var t = ed(), n = I(t);
						Y(n);
						var r = z(n);
						O(t), B((e, i) => {
							Z(t, "title", e), Si(n, V(A).nav.style?.sheetCart === !0), G(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.sheetCart"), () => Q("lbl.sheetCart")]), H("change", n, (e) => Qo("sheetCart", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(s, (e) => {
						V(A).nav.cart?.show && e(c);
					});
					var l = z(s, 2), u = (e) => {
						var t = ed(), n = I(t);
						Y(n);
						var r = z(n);
						O(t), B((e, i) => {
							Z(t, "title", e), Si(n, V(A).nav.style?.sheetAnnounce === !0), G(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.sheetAnnounce"), () => Q("lbl.sheetAnnounce")]), H("change", n, (e) => Qo("sheetAnnounce", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(l, (e) => {
						V(A).nav.announcement?.show && e(u);
					});
					var d = z(l, 2), f = (e) => {
						var t = ed(), n = I(t);
						Y(n);
						var r = z(n);
						O(t), B((e, i) => {
							Z(t, "title", e), Si(n, V(A).nav.style?.sheetToolLabels === !0), G(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.sheetToolLabels"), () => Q("lbl.sheetToolLabels")]), H("change", n, (e) => Qo("sheetToolLabels", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(d, (e) => {
						(V(A).nav.style?.sheetTheme || V(A).nav.style?.sheetCart) && e(f);
					});
					var p = z(d, 2), m = I(p), h = R(m, !0), g = z(m, 2);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.sheetBg"));
						ha(g, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => Ms("bg", e)
						});
					}
					var _ = z(g, 2);
					Y(_);
					var v = R(z(_, 2));
					O(p);
					var y = z(p, 2), b = I(y);
					Y(b);
					var x = z(b);
					O(y);
					var S = z(y, 2), C = I(S), w = z(C);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.sheet?.textColor ?? V(A).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.sheetTextColorPick"));
						ha(w, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => Ms("textColor", e)
						});
					}
					O(S), B((e, t, a, o, s, c, l, u, d, f) => {
						Z(n, "title", e), Si(r, V(A).nav.style?.sheetLogo === !0), G(i, ` ${t ?? ""}`), Z(p, "title", a), G(h, o), Z(_, "title", s), X(_, c), G(v, `${l ?? ""}%`), Z(y, "title", u), Si(b, V(A).nav.style?.sheet?.blur ?? V(A).nav.style?.blur !== !1), G(x, ` ${d ?? ""}`), G(C, `${f ?? ""} `);
					}, [
						() => Q("tip.nav.sheetLogo"),
						() => Q("lbl.sheetLogo"),
						() => Q("tip.nav.sheetBg"),
						() => Q("lbl.background"),
						() => Q("tip.nav.sheetOpacity"),
						() => Math.round((V(A).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Math.round((V(A).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Q("tip.nav.sheetBlur"),
						() => Q("lbl.sheetBlur"),
						() => Q("lbl.textColor")
					]), H("change", r, (e) => Qo("sheetLogo", e.target.checked ? !0 : void 0)), H("input", _, (e) => Ms("bgOpacity", e.target.valueAsNumber / 100)), H("change", b, (e) => Ms("blur", e.target.checked)), W(e, t);
				};
				K(Ut, (e) => {
					V(A).nav.style?.mobileMenu === "sheet" && e(Wt);
				});
				var Gt = z(Ut, 2), Kt = (e) => {
					var t = qf(), n = I(t), r = R(n, !0), i = z(n, 2);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ j(() => [["collapsed", Q("opt.mobileSubs.collapsed")], ["expanded", Q("opt.mobileSubs.expanded")]]);
						us(i, {
							filled: !0,
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Qo("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					O(t), B((e, n) => {
						Z(t, "title", e), G(r, n);
					}, [() => Q("tip.nav.mobileSubs"), () => Q("lbl.mobileSubs")]), W(e, t);
				}, qt = /* @__PURE__ */ j(() => V(A).nav.items?.some((e) => e.children?.length));
				K(Gt, (e) => {
					V(qt) && e(Kt);
				}), O(et), O(Ze);
				var Jt = z(Ze, 4), N = I(Jt), Yt = R(N, !0), Xt = z(N, 2), F = I(Xt), Zt = I(F), Qt = R(Zt, !0), $t = z(Zt, 2);
				Jr($t, 21, () => [
					["standard", Q("opt.hover.standard")],
					["underline", Q("opt.hover.underline")],
					["pill", Q("opt.hover.pill")],
					["lift-plain", Q("opt.hover.liftPlain")],
					["lift", Q("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = Yf();
					let o;
					var s = I(a), c = R(s, !0), l = R(z(s), !0);
					O(a), B((e) => {
						o = J(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (V(A).nav.style?.hover ?? "standard") === r() }), Z(a, "aria-pressed", (V(A).nav.style?.hover ?? "standard") === r()), J(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), G(c, e), G(l, i());
					}, [() => Q("seed.home")]), H("click", a, () => Ks(r())), W(e, a);
				}), O($t), O(F);
				var en = z(F, 2), tn = (e) => {
					var t = Xf(), n = I(t), r = R(n, !0), i = z(n, 2);
					Y(i);
					var a = R(z(i, 2));
					O(t), B((e, n, o) => {
						Z(t, "title", e), G(r, n), X(i, V(A).nav.style?.hoverGlow ?? .6), G(a, `${o ?? ""}%`);
					}, [
						() => Q("tip.nav.hoverGlow"),
						() => Q("lbl.glowStrength"),
						() => Math.round((V(A).nav.style?.hoverGlow ?? .6) * 100)
					]), H("input", i, (e) => Qo("hoverGlow", Number(e.target.value))), W(e, t);
				};
				K(en, (e) => {
					V(A).nav.style?.hover === "lift" && e(tn);
				});
				var nn = z(en, 2), rn = I(nn), an = (e) => {
					var t = Zf(), n = I(t);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ j(Gr);
						ha(n, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(Bs)[1];
							},
							onchange: (e) => Qo("hoverColor", e)
						});
					}
					var r = R(z(n, 2), !0);
					O(t), B(() => {
						Z(t, "title", V(Bs)[1]), G(r, V(Bs)[0]);
					}), W(e, t);
				};
				K(rn, (e) => {
					V(Bs) && e(an);
				});
				var on = z(rn, 2), sn = I(on);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.hoverTextColorPick"));
					ha(sn, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => Qo("hoverTextColor", e)
					});
				}
				var cn = R(z(sn, 2), !0);
				O(on);
				var ln = z(on, 2), un = I(ln);
				{
					let e = /* @__PURE__ */ j(() => V(A).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.textColorPick"));
					ha(un, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => Qo("textColor", e)
					});
				}
				var dn = R(z(un, 2), !0);
				O(ln), O(nn);
				var fn = z(nn, 2), pn = I(fn);
				Y(pn);
				var mn = z(pn);
				O(fn), O(Xt), O(Jt);
				var hn = z(Jt, 4), gn = I(hn), _n = R(gn, !0), vn = z(gn, 2), yn = I(vn);
				n(yn, () => zr, () => V(A).nav?.style?.background?.layers ?? []), O(vn), O(hn), O(ee), O(C);
				var bn = z(C, 2), xn = I(bn), Sn = R(xn, !0), Cn = z(xn, 2), wn = I(Cn), Tn = I(wn);
				Y(Tn);
				var En = z(Tn);
				O(wn);
				var Dn = z(wn, 2), On = (e) => {
					var t = $f(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2);
					Y(a), O(n);
					var o = z(n, 2), s = I(o), c = z(s);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.announcement?.page ?? (V(A).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ j(() => [
							["", Q("common.none")],
							...V(A).pages.map((e) => [e.id, e.title]),
							["custom", Q("opt.announceLink.custom")]
						]);
						us(c, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => fa("edit:nav-announce-link", () => {
								let t = { ...V(A).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), V(A).nav.announcement = t;
							})
						});
					}
					O(o);
					var l = z(o, 2), u = (e) => {
						var t = Qf(), n = I(t), r = R(n, !0), i = z(n, 2);
						Y(i), O(t), B((e, n) => {
							Z(t, "title", e), G(r, n), X(i, V(A).nav.announcement?.href ?? "");
						}, [() => Q("tip.nav.announceHref"), () => Q("lbl.announceHref")]), H("change", i, (e) => vs("href", e.target.value.trim())), W(e, t);
					};
					K(l, (e) => {
						V(A).nav.announcement?.href !== void 0 && !V(A).nav.announcement?.page && e(u);
					});
					var d = z(l, 2), f = (e) => {
						var t = ed(), n = I(t);
						Y(n);
						var r = z(n);
						O(t), B((e, i) => {
							Z(t, "title", e), Si(n, V(A).nav.announcement?.sticky !== !1), G(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.announceSticky"), () => Q("lbl.announceSticky")]), H("change", n, (e) => vs("sticky", e.target.checked ? void 0 : !1)), W(e, t);
					};
					K(d, (e) => {
						V(A).nav.sticky !== !1 && !V(is) && !V($o) && !V(A).nav.overlay && e(f);
					});
					var p = z(d, 2), m = (e) => {
						var t = ed(), n = I(t);
						Y(n);
						var r = z(n);
						O(t), B((e, i) => {
							Z(t, "title", e), Si(n, V(A).nav.announcement?.followNav === !0), G(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.announceFollowNav"), () => Q("lbl.announceFollowNav")]), H("change", n, (e) => vs("followNav", e.target.checked ? !0 : void 0)), W(e, t);
					};
					K(p, (e) => {
						V(A).nav.scroll === "hide" && V(A).nav.sticky !== !1 && !V($o) && V(A).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = z(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ j(() => Q("lbl.announcePlace")), n = /* @__PURE__ */ j(() => Q("tip.nav.announcePlace")), r = /* @__PURE__ */ j(() => V(A).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ j(() => [
								["nav", Q("opt.announcePlace.nav")],
								["page", Q("opt.announcePlace.page")],
								["content", Q("opt.announcePlace.content")]
							]);
							ps(e, {
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
								onchange: (e) => vs("place", e === "nav" ? void 0 : e)
							});
						}
					};
					K(h, (e) => {
						V($o) && e(g);
					});
					var _ = z(h, 2), v = I(_);
					Y(v);
					var y = z(v);
					O(_);
					var b = z(_, 2), x = (e) => {
						var t = nd(), n = R(t, !0);
						B((e, r) => {
							Z(t, "title", e), G(n, r);
						}, [() => Q("tip.nav.announceShowAgain"), () => Q("lbl.announceShowAgain")]), H("click", t, () => Ue?.sendAnnounceReset()), W(e, t);
					};
					K(b, (e) => {
						V(A).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = z(b, 2), C = I(S), w = z(C);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.announceColor"));
						ha(w, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => vs("color", e)
						});
					}
					O(S);
					var T = z(S, 2), ee = I(T), te = z(ee);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.announceTextColor"));
						ha(te, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => vs("textColor", e)
						});
					}
					O(T), B((e, t, r, c, l, u, d, f, p, m) => {
						Z(n, "title", e), G(i, t), X(a, V(A).nav.announcement?.text ?? ""), Z(o, "title", r), G(s, `${c ?? ""} `), Z(_, "title", l), Si(v, V(A).nav.announcement?.dismiss !== !1), G(y, ` ${u ?? ""}`), Z(S, "title", d), G(C, `${f ?? ""} `), Z(T, "title", p), G(ee, `${m ?? ""} `);
					}, [
						() => Q("tip.nav.announce"),
						() => Q("lbl.text"),
						() => Q("tip.nav.announceLink"),
						() => Q("lbl.link"),
						() => Q("tip.nav.announceDismiss"),
						() => Q("lbl.announceDismiss"),
						() => Q("tip.nav.announceColor"),
						() => Q("lbl.background"),
						() => Q("tip.nav.announceTextColor"),
						() => Q("lbl.textColor")
					]), H("change", a, (e) => vs("text", e.target.value.trim() || void 0)), H("change", v, (e) => vs("dismiss", e.target.checked ? void 0 : !1)), W(e, t);
				};
				K(Dn, (e) => {
					V(A).nav.announcement?.show && e(On);
				}), O(Cn), O(bn);
				var kn = z(bn, 2), An = I(kn), jn = R(An, !0), Mn = z(An, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = ep(), i = I(r);
						q(i, () => v.up, !0), O(i);
						var a = z(i, 2);
						q(a, () => v.down, !0), O(a), O(r), B((e, t) => {
							Z(i, "title", e), i.disabled = n() === 0, Z(a, "title", t), a.disabled = n() === 2;
						}, [() => Q("tip.moveUp"), () => Q("tip.moveDown")]), H("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), Eo(t(), -1);
						}), H("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), Eo(t(), 1);
						}), W(e, r);
					};
					var Nn = I(Mn), Pn = (e) => {
						var t = Wf(), n = L(t);
						{
							let e = /* @__PURE__ */ j(() => Q("lbl.toolsSide")), t = /* @__PURE__ */ j(() => Q("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ j(() => V(A).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ j(() => [["start", Q("opt.toolsSide.top")], ["end", Q("opt.toolsSide.bottom")]]);
							ps(n, {
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
								onchange: (e) => Xo("side", e === "start" ? "start" : void 0)
							});
						}
						var r = z(n, 2);
						{
							let e = /* @__PURE__ */ j(() => Q("lbl.toolsAlign")), t = /* @__PURE__ */ j(() => Q("tip.nav.toolsAlign")), n = /* @__PURE__ */ j(() => V(A).nav.style?.tools?.align ?? "center"), i = /* @__PURE__ */ j(() => [
								["start", Q("opt.toolsAlign.start")],
								["center", Q("opt.toolsAlign.center")],
								["end", Q("opt.toolsAlign.end")],
								["spread", Q("opt.toolsAlign.spread")]
							]);
							ps(r, {
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
								onchange: (e) => Xo("align", e === "center" ? void 0 : e)
							});
						}
						W(e, t);
					}, Fn = (e) => {
						{
							let t = /* @__PURE__ */ j(() => Q("lbl.toolsSide")), n = /* @__PURE__ */ j(() => Q("tip.nav.toolsSide")), r = /* @__PURE__ */ j(() => V(A).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ j(() => [["start", Q("opt.toolsSide.start")], ["end", Q("opt.toolsSide.end")]]);
							ps(e, {
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
								onchange: (e) => Xo("side", e === "start" ? "start" : void 0)
							});
						}
					};
					K(Nn, (e) => {
						V($o) ? e(Pn) : e(Fn, -1);
					}), Jr(z(Nn, 2), 18, () => Al(V(A).nav.style ?? {}), (e) => e, (t, n, r) => {
						var i = Nr(), a = L(i), o = (t) => {
							var i = Nr(), a = L(i), o = (t) => {
								var i = tp(), a = I(i), o = I(a), s = R(o, !0), c = z(o);
								e(c, () => n, () => V(r)), O(a);
								var l = z(a, 2), u = I(l);
								Y(u);
								var d = z(u);
								O(l), O(i), B((e, t, n) => {
									G(s, e), Z(l, "title", t), Si(u, V(A).nav.style?.tools?.theme !== !1), G(d, ` ${n ?? ""}`);
								}, [
									() => Q("lbl.themeToggle"),
									() => Q("tip.nav.themeToggle"),
									() => Q("lbl.showInMenu")
								]), H("change", u, (e) => Xo("theme", e.target.checked ? void 0 : !1)), W(t, i);
							};
							K(a, (e) => {
								V(A).theme?.alt?.tokens && e(o);
							}), W(t, i);
						}, s = (t) => {
							var i = np(), a = I(i), o = I(a), s = R(o, !0), c = z(o);
							e(c, () => n, () => V(r)), O(a);
							var l = z(a, 2), u = I(l);
							Y(u);
							var d = z(u);
							O(l);
							var f = z(l, 2), p = (e) => {
								var t = qf(), n = I(t), r = R(n, !0), i = z(n, 2);
								{
									let e = /* @__PURE__ */ j(() => V(A).nav.cart?.href ?? ""), t = /* @__PURE__ */ j(() => [["", Q("common.none")], ...V(A).pages.map((e) => [e.path, e.title])]);
									us(i, {
										filled: !0,
										get value() {
											return V(e);
										},
										get options() {
											return V(t);
										},
										onchange: (e) => fa("nav", () => {
											e ? V(A).nav.cart.href = e : delete V(A).nav.cart.href;
										})
									});
								}
								O(t), B((e, n) => {
									Z(t, "title", e), G(r, n);
								}, [() => Q("tip.cart.checkout"), () => Q("lbl.checkoutPage")]), W(e, t);
							};
							K(f, (e) => {
								V(A).nav.cart?.show && e(p);
							}), O(i), B((e, t, n) => {
								G(s, e), Z(l, "title", t), Si(u, V(A).nav.cart?.show === !0), G(d, ` ${n ?? ""}`);
							}, [
								() => Q("lbl.cart"),
								() => Q("tip.nav.cart"),
								() => Q("lbl.showInMenu")
							]), H("change", u, (e) => fa("nav", () => {
								e.target.checked ? V(A).nav.cart = {
									...V(A).nav.cart ?? {},
									show: !0
								} : delete V(A).nav.cart;
							})), W(t, i);
						}, c = (t) => {
							var i = up(), a = I(i), o = I(a), s = I(o, !0), c = z(s);
							e(c, () => n, () => V(r)), O(o), O(a);
							var l = z(a, 2), u = I(l), f = I(u);
							Y(f);
							var p = z(f);
							O(u);
							var m = z(u, 2), g = I(m), _ = R(g, !0), y = z(g, 2);
							Jr(y, 21, () => V(Vs), ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ j(() => h(V(t), 2));
								let r = () => V(n)[0], i = () => V(n)[1];
								var a = Pf();
								let o;
								var s = I(a);
								q(s, () => d[r()]);
								var c = R(z(s), !0);
								O(a), B(() => {
									o = J(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(A).nav.launcher?.view ?? "grid") === r() }), Z(a, "aria-pressed", (V(A).nav.launcher?.view ?? "grid") === r()), G(c, i());
								}), H("click", a, () => Cs("view", r() === "grid" ? void 0 : r())), W(e, a);
							}), O(y), O(m);
							var b = z(m, 2);
							{
								let e = /* @__PURE__ */ j(() => Q("lbl.launcherMobileView")), t = /* @__PURE__ */ j(() => Q("tip.nav.launcherMobileView")), n = /* @__PURE__ */ j(() => V(A).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ j(() => [["", Q("lbl.navSameAsDesktop")], ...V(Vs)]);
								ps(b, {
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
									onchange: (e) => Cs("mobileView", e || void 0)
								});
							}
							var x = z(b, 2), S = I(x), C = R(S, !0), w = z(S, 2);
							Y(w);
							var T = R(z(w, 2), !0);
							O(x);
							var ee = z(x, 2), te = I(ee);
							Y(te);
							var ne = z(te);
							O(ee);
							var re = z(ee, 2), E = (e) => {
								var t = rp(), n = I(t), r = R(n, !0), i = z(n, 2);
								Y(i), O(t), B((e, n, a) => {
									Z(t, "title", e), G(r, n), Z(i, "placeholder", a), X(i, V(A).nav.launcher?.title ?? "");
								}, [
									() => Q("tip.nav.launcherTitleText"),
									() => Q("lbl.launcherTitle"),
									() => Q("ph.launcherTitle")
								]), H("change", i, (e) => Cs("title", e.target.value.trim() || void 0)), W(e, t);
							};
							K(re, (e) => {
								V(A).nav.launcher?.showTitle !== !1 && e(E);
							});
							var D = z(re, 2), ie = I(D), ae = R(ie, !0), oe = z(ie, 2), se = I(oe);
							{
								let e = /* @__PURE__ */ j(() => V(A).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ j(() => V(A).nav.launcher?.image ?? ""), n = /* @__PURE__ */ j(xs), r = /* @__PURE__ */ j(() => Q("opt.launcherDots")), i = /* @__PURE__ */ j(() => Q("tip.nav.launcherIcon"));
								_o(se, {
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
									onpick: (e) => Ss(null, e),
									onfile: (e) => As(e, null),
									children: (e, t) => {
										var n = Nr(), r = L(n), i = (e) => {
											var t = ip();
											B(() => Z(t, "src", V(A).nav.launcher.image)), W(e, t);
										}, a = (e) => {
											var t = Nr();
											q(L(t), () => Ua(V(A).nav.launcher.icon) || ""), W(e, t);
										}, o = (e) => {
											var t = Nr();
											q(L(t), () => ys), W(e, t);
										};
										K(r, (e) => {
											V(A).nav.launcher?.image ? e(i) : V(A).nav.launcher?.icon ? e(a, 1) : e(o, -1);
										}), W(e, n);
									},
									$$slots: { default: !0 }
								});
							}
							var ce = z(se, 2), le = I(ce), ue = (e) => {
								var t = Mr();
								B((e) => G(t, e), [() => Q("mp.ownImage")]), W(e, t);
							}, de = (e) => {
								var t = Mr();
								B((e) => G(t, e), [() => Q(Va[V(A).nav.launcher.icon]?.labelKey ?? "common.none")]), W(e, t);
							}, fe = (e) => {
								var t = Mr();
								B((e) => G(t, e), [() => Q("opt.launcherDots")]), W(e, t);
							};
							K(le, (e) => {
								V(A).nav.launcher?.image ? e(ue) : V(A).nav.launcher?.icon ? e(de, 1) : e(fe, -1);
							}), O(ce), O(oe), O(D);
							var pe = z(D, 2);
							Jr(pe, 17, () => V(A).nav.launcher?.links ?? [], Wr, (e, t, n) => {
								let r = /* @__PURE__ */ j(() => V(t).href && !Ol(V(t).href));
								var i = lp();
								let a;
								var o = I(i), s = I(o), c = I(s), l = (e) => {
									var n = jf();
									B(() => Z(n, "src", V(t).image)), W(e, n);
								}, u = (e) => {
									var n = Nr();
									q(L(n), () => Ua(V(t).icon) || ""), W(e, n);
								};
								K(c, (e) => {
									V(t).image ? e(l) : e(u, -1);
								}), O(s);
								var d = z(s, 2), f = R(d, !0), p = z(d, 2), m = (e) => {
									var t = ap();
									q(t, () => v.warn, !0), O(t), B((e) => Z(t, "title", e), [() => Q("tip.badTarget")]), W(e, t);
								};
								K(p, (e) => {
									V(r) && e(m);
								});
								var h = z(p, 2), g = I(h);
								g.disabled = n === 0, q(g, () => v.up, !0), O(g);
								var _ = z(g, 2);
								q(_, () => v.down, !0), O(_), O(h);
								var y = z(h, 2);
								q(y, () => v.caret, !0), O(y), O(o);
								var b = z(o, 2), x = (e) => {
									var i = cp(), a = I(i);
									{
										let e = /* @__PURE__ */ j(() => V(t).icon ?? ""), r = /* @__PURE__ */ j(() => V(t).image ?? ""), i = /* @__PURE__ */ j(xs), o = /* @__PURE__ */ j(() => Q("mp.pickMark"));
										_o(a, {
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
											onpick: (e) => Ss(n, e),
											onfile: (e) => As(e, n),
											children: (e, n) => {
												var r = op(), i = L(r), a = I(i), o = (e) => {
													var n = jf();
													B(() => Z(n, "src", V(t).image)), W(e, n);
												}, s = (e) => {
													var n = Nr();
													q(L(n), () => Ua(V(t).icon) || ""), W(e, n);
												};
												K(a, (e) => {
													V(t).image ? e(o) : V(t).icon && e(s, 1);
												}), O(i);
												var c = R(z(i, 2), !0);
												B((e) => G(c, e), [() => V(t).label || Q("seed.link")]), W(e, r);
											},
											$$slots: { default: !0 }
										});
									}
									var o = z(a, 2), s = I(o);
									Y(s);
									var c = z(s, 2);
									Y(c);
									let l;
									var u = z(c, 2), d = (e) => {
										var t = sp(), n = R(t, !0);
										B((e) => G(n, e), [() => Q("ui.badTarget")]), W(e, t);
									};
									K(u, (e) => {
										V(r) && e(d);
									});
									var f = z(u, 2), p = I(f);
									{
										let e = /* @__PURE__ */ j(() => V(t).icon ?? ""), r = /* @__PURE__ */ j(() => V(t).image ?? ""), i = /* @__PURE__ */ j(xs), a = /* @__PURE__ */ j(() => Q("mp.pickMark"));
										_o(p, {
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
											onpick: (e) => Ss(n, e),
											onfile: (e) => As(e, n),
											children: (e, t) => {
												De();
												var n = Mr();
												B((e) => G(n, e), [() => Q("mp.changeMark")]), W(e, n);
											},
											$$slots: { default: !0 }
										});
									}
									var m = z(p, 2), h = R(m, !0);
									O(f), O(o), O(i), B((e, n, i, a, o, u) => {
										X(s, V(t).label), Z(s, "title", e), Z(s, "placeholder", n), l = J(c, 1, "field-filled svelte-1n46o8q", null, l, { "bad-target": V(r) }), X(c, V(t).href ?? ""), Z(c, "placeholder", i), Z(c, "title", a), Z(m, "title", o), G(h, u);
									}, [
										() => Q("tip.nav.launcherLabel"),
										() => Q("lbl.text"),
										() => Q("ph.hrefAnchor"),
										() => V(r) ? Q("tip.badTarget") : Q("tip.hrefAnchor"),
										() => Q("tip.removeLink"),
										() => Q("ui.remove")
									]), H("change", s, (e) => ks(n, "label", e.target.value)), H("change", c, (e) => ks(n, "href", e.target.value)), H("click", m, () => Ts(n)), W(e, i);
								};
								K(b, (e) => {
									V(bs) === n && e(x);
								}), O(i), B((e, t, r) => {
									a = J(i, 1, "lrow svelte-1n46o8q", null, a, { open: V(bs) === n }), G(f, e), Z(g, "title", t), Z(_, "title", r), _.disabled = n === V(A).nav.launcher.links.length - 1;
								}, [
									() => V(t).label || Q("seed.link"),
									() => Q("tip.moveUp"),
									() => Q("tip.moveDown")
								]), H("click", o, () => P(bs, V(bs) === n ? null : n, !0)), H("keydown", o, (e) => {
									(e.key === "Enter" || e.key === " ") && (e.preventDefault(), P(bs, V(bs) === n ? null : n, !0));
								}), H("click", h, (e) => e.stopPropagation()), H("keydown", h, (e) => e.stopPropagation()), H("click", g, () => Es(n, -1)), H("click", _, () => Es(n, 1)), W(e, i);
							});
							var me = z(pe, 2), he = R(me, !0);
							O(l), O(i), B((e, t, n, r, i, o, c, l, d, m, h, g) => {
								Z(a, "title", e), G(s, t), Z(u, "title", n), Si(f, V(A).nav.launcher?.show === !0), G(p, ` ${r ?? ""}`), G(_, i), Z(y, "aria-label", o), Z(x, "title", c), G(C, l), X(w, V(A).nav.launcher?.mobileMax ?? 6), G(T, V(A).nav.launcher?.mobileMax ?? 6), Z(ee, "title", d), Si(te, V(A).nav.launcher?.showTitle !== !1), G(ne, ` ${m ?? ""}`), G(ae, h), G(he, g);
							}, [
								() => Q("tip.nav.launcher"),
								() => Q("group.launcher"),
								() => Q("tip.nav.launcher"),
								() => Q("lbl.showInMenu"),
								() => Q("lbl.design"),
								() => Q("lbl.design"),
								() => Q("tip.nav.launcherMobileMax"),
								() => Q("lbl.launcherMobileMax"),
								() => Q("tip.nav.launcherTitle"),
								() => Q("lbl.launcherShowTitle"),
								() => Q("lbl.launcherButton"),
								() => Q("ui.addLauncherLink")
							]), H("change", f, (e) => Cs("show", e.target.checked ? !0 : void 0)), H("input", w, (e) => Cs("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), H("change", te, (e) => Cs("showTitle", e.target.checked ? void 0 : !1)), H("click", me, ws), W(t, i);
						};
						K(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), W(t, i);
					}), O(Mn);
				}
				O(kn);
				var In = z(kn, 2), Ln = I(In), Rn = R(Ln, !0), zn = z(Ln, 2), Bn = I(zn), Vn = I(Bn), Hn = R(Vn, !0), Un = z(Vn, 2);
				let Wn;
				Jr(Un, 21, () => V(Hs), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ j(() => h(V(t), 2));
					let r = () => V(n)[0], i = () => V(n)[1];
					var a = Pf();
					let o;
					var s = I(a);
					q(s, () => u[r()]);
					var c = R(z(s), !0);
					O(a), B(() => {
						o = J(a, 1, "tile svelte-1n46o8q", null, o, { on: (V(A).nav.style?.subStyle ?? "card") === r() }), Z(a, "aria-pressed", (V(A).nav.style?.subStyle ?? "card") === r()), G(c, i());
					}), H("click", a, () => Qo("subStyle", r() === "card" ? void 0 : r())), W(e, a);
				}), O(Un), O(Bn);
				var Gn = z(Bn, 2), Kn = (e) => {
					var t = Wf(), n = L(t), r = (e) => {
						var t = Wf(), n = L(t);
						{
							let e = /* @__PURE__ */ j(() => Q("lbl.sideSubs")), t = /* @__PURE__ */ j(() => Q("tip.nav.sideSubs")), r = /* @__PURE__ */ j(() => V(A).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ j(() => [["collapsed", Q("opt.mobileSubs.collapsed")], ["expanded", Q("opt.mobileSubs.expanded")]]);
							ps(n, {
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
								onchange: (e) => Qo("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = z(n, 2), i = (e) => {
							var t = ed(), n = I(t);
							Y(n);
							var r = z(n);
							O(t), B((e, i) => {
								Z(t, "title", e), Si(n, V(A).nav.style?.sideSubArrow === !0), G(r, ` ${i ?? ""}`);
							}, [() => Q("tip.nav.sideSubArrow"), () => Q("lbl.sideSubArrow")]), H("change", n, (e) => Qo("sideSubArrow", e.target.checked ? !0 : void 0)), W(e, t);
						};
						K(r, (e) => {
							V(A).nav.style?.sideSubs === "expanded" && e(i);
						}), W(e, t);
					};
					K(n, (e) => {
						V($o) && e(r);
					});
					var i = z(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ j(() => Q("lbl.subOpen")), n = /* @__PURE__ */ j(() => Q("tip.nav.subOpen")), r = /* @__PURE__ */ j(() => V(A).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ j(() => [
								["hover", Q("opt.subOpen.hover")],
								["stay", Q("opt.subOpen.stay")],
								["click", Q("opt.subOpen.click")]
							]);
							ps(e, {
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
								onchange: (e) => Qo("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					K(i, (e) => {
						(!V($o) || V(A).nav.style?.sideSubs !== "expanded") && e(a);
					}), W(e, t);
				}, qn = /* @__PURE__ */ j(() => V(A).nav.items?.some((e) => e.children?.length));
				K(Gn, (e) => {
					V(qn) && e(Kn);
				});
				var Jn = z(Gn, 2), Yn = (e) => {
					var t = Iu(), n = I(t), r = z(n);
					{
						let e = /* @__PURE__ */ j(() => V(A).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("tip.nav.subPillColorPick"));
						ha(r, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => Qo("subPillColor", e)
						});
					}
					O(t), B((e, r) => {
						Z(t, "title", e), G(n, `${r ?? ""} `);
					}, [() => Q("tip.nav.subPillColor"), () => Q("lbl.subPillColor")]), W(e, t);
				};
				K(Jn, (e) => {
					V(A).nav.style?.subStyle === "pills" && e(Yn);
				});
				var Xn = z(Jn, 2), Zn = I(Xn), Qn = z(Zn);
				Y(Qn), O(Xn), O(zn), O(In);
				var $n = z(In, 2), er = I($n), tr = R(er, !0), nr = z(er, 2);
				{
					let e = (e, t = f) => {
						let n = /* @__PURE__ */ j(th);
						var r = dp();
						let i;
						var a = I(r);
						q(a, () => ah, !0), O(a);
						var o = z(a, 2), s = I(o), c = R(s, !0), l = R(z(s, 2), !0);
						O(o), O(r), B(() => {
							i = J(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), G(c, V(n).label), G(l, V(n).target);
						}), W(e, r);
					};
					var rr = I(nr);
					Jr(rr, 21, () => V(A).nav.items, Wr, (t, n, r) => {
						let i = /* @__PURE__ */ j(() => `${r}`);
						var a = hp(), o = L(a), s = (t) => {
							e(t, () => !1);
						};
						K(o, (e) => {
							V(Zm)?.key === V(i) && V(Zm).pos === "before" && e(s);
						});
						var c = z(o, 2);
						let l;
						var u = I(c);
						q(u, () => ah, !0), O(u);
						var d = z(u, 2), f = I(d);
						Y(f);
						var p = z(f, 2), m = I(p);
						{
							let e = /* @__PURE__ */ j(() => V(n).page ?? (V(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ j(() => Q("tip.linkTarget")), i = /* @__PURE__ */ j(() => [
								...V(A).pages.map((e) => [e.id, e.title]),
								["__href", Q("opt.linkHref")],
								...V(n).children ? [["__none", Q("opt.noLink")]] : []
							]);
							us(m, {
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
								onchange: (e) => Gm(r, e)
							});
						}
						var h = z(m, 2), g = (e) => {
							var t = fp();
							Y(t), B((e, r) => {
								X(t, V(n).href), Z(t, "placeholder", e), Z(t, "title", r);
							}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", t, (e) => Km(r, e.target.value)), W(e, t);
						};
						K(h, (e) => {
							!V(n).page && V(n).href != null && e(g);
						}), O(p), O(d);
						var _ = z(d, 2), y = (e) => {
							var t = pp();
							q(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), O(t), B((e) => Z(t, "title", e), [() => Q("tip.nav.hasSubmenu")]), W(e, t);
						};
						K(_, (e) => {
							V(n).children?.length && e(y);
						});
						var b = z(_, 2), x = I(b);
						q(x, () => v.plus, !0), O(x);
						var S = z(x, 2);
						S.disabled = r === 0, q(S, () => v.up, !0), O(S);
						var C = z(S, 2);
						q(C, () => v.cross, !0), O(C);
						var w = z(C, 2);
						q(w, () => v.down, !0), O(w), O(b);
						var T = z(b, 2);
						q(T, () => v.kebab, !0), O(T), O(c);
						var ee = z(c, 2);
						Jr(ee, 17, () => V(n).children ?? [], Wr, (t, i, a) => {
							let o = /* @__PURE__ */ j(() => `${r}.${a}`);
							var s = mp(), c = L(s), l = (t) => {
								e(t, () => !0);
							};
							K(c, (e) => {
								V(Zm)?.key === V(o) && V(Zm).pos === "before" && e(l);
							});
							var u = z(c, 2);
							let d;
							var f = I(u);
							q(f, () => ah, !0), O(f);
							var p = z(f, 2), m = I(p);
							Y(m);
							var h = z(m, 2), g = I(h);
							{
								let e = /* @__PURE__ */ j(() => V(i).page ?? "__href"), t = /* @__PURE__ */ j(() => Q("tip.linkTarget")), n = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								us(g, {
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
									onchange: (e) => lh(r, a, e)
								});
							}
							var _ = z(g, 2), y = (e) => {
								var t = fp();
								Y(t), B((e, n) => {
									X(t, V(i).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", t, (e) => uh(r, a, e.target.value)), W(e, t);
							};
							K(_, (e) => {
								V(i).page || e(y);
							}), O(h), O(p);
							var b = z(p, 2), x = I(b);
							x.disabled = a === 0, q(x, () => v.up, !0), O(x);
							var S = z(x, 2);
							q(S, () => v.cross, !0), O(S);
							var C = z(S, 2);
							q(C, () => v.down, !0), O(C), O(b);
							var w = z(b, 2);
							q(w, () => v.kebab, !0), O(w), O(u);
							var T = z(u, 2), ee = (t) => {
								e(t, () => !0);
							};
							K(T, (e) => {
								V(Zm)?.key === V(o) && V(Zm).pos === "after" && e(ee);
							}), B((e, t, r, s, c, l, p) => {
								d = J(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: V(Ym) === V(o),
									dragging: V(Xm) === V(o)
								}), Z(u, "data-key", V(o)), Z(f, "title", e), X(m, V(i).label), Z(m, "title", t), Z(x, "title", r), Z(S, "title", s), Z(C, "title", c), C.disabled = a === V(n).children.length - 1, Z(w, "title", l), Z(w, "aria-label", p);
							}, [
								() => Q("tip.nav.dragItem"),
								() => Q("tip.nav.childLabel"),
								() => Q("tip.moveUp"),
								() => Q("tip.nav.removeChild"),
								() => Q("tip.moveDown"),
								() => Q("tip.nav.itemActions"),
								() => Q("tip.nav.itemActions")
							]), H("click", u, (e) => {
								e.stopPropagation(), P(Ym, V(o));
							}), Cr("dragstart", f, (e) => {
								e.stopPropagation(), P(Xm, V(o)), e.dataTransfer?.setData("text/plain", V(o));
							}), Cr("dragend", f, nh), H("input", m, (e) => ch(r, a, e.target.value)), H("click", x, () => dh(r, a, -1)), H("click", S, () => fh(r, a)), H("click", C, () => dh(r, a, 1)), H("click", w, (e) => {
								e.stopPropagation(), P(Ym, V(o));
							}), W(t, s);
						});
						var te = z(ee, 2), ne = (t) => {
							e(t, () => !0);
						};
						K(te, (e) => {
							V(Zm)?.key === V(i) && V(Zm).pos === "into" && e(ne);
						});
						var re = z(te, 2), E = (t) => {
							e(t, () => !1);
						};
						K(re, (e) => {
							V(Zm)?.key === V(i) && V(Zm).pos === "after" && e(E);
						}), B((e, t, a, o, s, d, p, m) => {
							l = J(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: V(Ym) === V(i),
								dragging: V(Xm) === V(i),
								"drop-target": V(Zm)?.key === V(i) && V(Zm).pos === "into"
							}), Z(c, "data-key", V(i)), Z(u, "title", e), X(f, V(n).label), Z(f, "title", t), Z(x, "title", a), Z(S, "title", o), Z(C, "title", s), Z(w, "title", d), w.disabled = r === V(A).nav.items.length - 1, Z(T, "title", p), Z(T, "aria-label", m);
						}, [
							() => Q("tip.nav.dragItem"),
							() => Q("tip.nav.itemLabel"),
							() => Q("tip.nav.addChild"),
							() => Q("tip.moveUp"),
							() => Q("tip.nav.removeItem"),
							() => Q("tip.moveDown"),
							() => Q("tip.nav.itemActions"),
							() => Q("tip.nav.itemActions")
						]), H("click", c, () => {
							P(Ym, V(i));
						}), Cr("dragstart", u, (e) => {
							P(Xm, V(i)), e.dataTransfer?.setData("text/plain", V(i));
						}), Cr("dragend", u, nh), H("input", f, (e) => Wm(r, e.target.value)), H("click", x, () => sh(r)), H("click", S, () => qm(r, -1)), H("click", C, () => Jm(r)), H("click", w, () => qm(r, 1)), H("click", T, () => {
							P(Ym, V(i));
						}), W(t, a);
					}), O(rr);
					var ir = z(rr, 2), ar = R(ir, !0), or = z(ir, 2), sr = I(or);
					Y(sr);
					var cr = z(sr, 2), lr = R(cr, !0);
					O(or), O(nr), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, ee, te, ne, re, E, D, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, O, De, Oe, ke, Ae, je, Me) => {
						G(ar, Oe), Z(or, "title", ke), Z(sr, "placeholder", Ae), cr.disabled = je, G(lr, Me);
					}, [
						() => Q("hint.nav.logoHome"),
						() => Q("group.logo"),
						() => Q("group.appearance"),
						() => Q("group.navLayout"),
						() => Q("tip.nav.variant"),
						() => Q("lbl.navVariant"),
						() => Q("lbl.navVariant"),
						() => Q("tip.nav.sizePreset"),
						() => Q("lbl.size"),
						() => Q("tip.nav.sizePreset"),
						() => Q("lbl.adjust"),
						() => Q("tip.nav.menuTextSize"),
						() => Q("lbl.navTextSize"),
						() => Q("group.navFrame"),
						() => Q("group.navBehaviour"),
						() => Q("tip.nav.mobileSame"),
						() => Q("group.mobile"),
						() => Q("tip.nav.menuTextSize"),
						() => Q("lbl.navTextSize"),
						() => Q("lbl.navSameAsDesktop"),
						() => Q("tip.nav.mobileSize"),
						() => Q("lbl.size"),
						() => Q("tip.nav.mobileLayout"),
						() => Q("lbl.navPlacement"),
						() => Q("tip.nav.mobileTools"),
						() => Q("lbl.toolsSide"),
						() => Q("tip.nav.mobileInset"),
						() => Q("lbl.navInset"),
						() => Q("tip.nav.mobileOverlay"),
						() => Q("lbl.navOverlay"),
						() => Q("tip.nav.mobileBorder"),
						() => Q("lbl.navBorder"),
						() => Q("tip.nav.mobileMenu"),
						() => Q("lbl.mobileMenu"),
						() => Q("group.navColours"),
						() => Q("lbl.navHover"),
						() => Q("lbl.navHover"),
						() => Q("tip.nav.hoverTextColor"),
						() => Q("lbl.hoverTextColor"),
						() => Q("tip.nav.textColorPick"),
						() => Q("lbl.textColor"),
						() => Q("tip.nav.blur"),
						() => Q("lbl.navBlur"),
						() => Q("lbl.background"),
						() => Q("tip.nav.announce"),
						() => Q("group.announcement"),
						() => Q("tip.nav.announce"),
						() => Q("lbl.announceShow"),
						() => Q("tip.nav.tools"),
						() => Q("group.tools"),
						() => Q("group.submenu"),
						() => Q("lbl.design"),
						() => Q("lbl.design"),
						() => Q("tip.nav.subColumns"),
						() => Q("lbl.columns"),
						() => Q("hint.nav.submenu"),
						() => Q("group.menuItems"),
						() => Q("ui.addMenuItem"),
						() => Q("tip.nav.newPageAsItem"),
						() => Q("ph.nav.newPageTitle"),
						() => !V(p).trim(),
						() => Q("ui.newPageAsItem")
					]), Cr("dragover", rr, rh), Cr("drop", rr, (e) => {
						e.preventDefault(), ih(V(Zm)?.key ?? "");
					}), H("click", ir, oh), H("keydown", sr, (e) => {
						e.key === "Enter" && m();
					}), Ei(sr, () => V(p), (e) => P(p, e)), H("click", cr, m);
				}
				O($n), O(t), B((e, t, n, r, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, ee, te, ne, E, ie, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, xe, Ce, we, Ee, O, De, Oe, ke, je, Fe, Ie, Le, Re, Be, Ve, k, He, Ue, We, Ge, Ke, Je) => {
					Z(i, "title", e), G(a, t), G(T, n), G(re, r), Z(D, "title", o), G(ae, s), Z(oe, "aria-label", c), Z(ye, "title", l), G(be, u), Z(Se, "title", d), G(Te, f), Z(Ae, "title", p), G(Me, m), Z(Ne, "min", Bo.min), Z(Ne, "max", Bo.max), Z(Ne, "step", Bo.step), X(Ne, V(ss)), Z(Pe, "min", Bo.min), Z(Pe, "max", Bo.max), X(Pe, V(ss)), G(ze, h), G(qe, g), Z(Qe, "title", _), G($e, v), Z(it, "title", y), G(ot, b), Z(st, "min", Bo.min), Z(st, "max", Bo.max), Z(st, "placeholder", x), X(st, V(A).nav.style?.mobile?.textSize ?? ""), Z(lt, "title", S), G(dt, C), Z(pt, "title", w), G(ht, ee), Z(vt, "title", te), G(bt, ne), Z(St, "title", E), G(wt, ie), Z(Dt, "title", se), G(kt, ce), Z(jt, "title", le), G(Nt, ue), Z(Rt, "title", de), G(Bt, fe), G(Yt, pe), G(Qt, me), Z($t, "aria-label", he), Z(on, "title", ge), G(cn, _e), Z(ln, "title", ve), G(dn, xe), Z(fn, "title", Ce), Si(pn, V(A).nav.style?.blur !== !1), G(mn, ` ${we ?? ""}`), G(_n, Ee), Z(xn, "title", O), G(Sn, De), Z(wn, "title", Oe), Si(Tn, V(A).nav.announcement?.show === !0), G(En, ` ${ke ?? ""}`), Z(An, "title", je), G(jn, Fe), G(Rn, Ie), G(Hn, Le), Wn = J(Un, 1, "tile-grid svelte-1n46o8q", null, Wn, {
						"cols-5": !V($o),
						"cols-3": V($o)
					}), Z(Un, "aria-label", Re), Z(Xn, "title", Be), G(Zn, `${Ve ?? ""} `), X(Qn, V(A).nav.style?.subColumns ?? 1), Z(er, "title", k), G(tr, He);
				}, [
					() => Q("hint.nav.logoHome"),
					() => Q("group.logo"),
					() => Q("group.appearance"),
					() => Q("group.navLayout"),
					() => Q("tip.nav.variant"),
					() => Q("lbl.navVariant"),
					() => Q("lbl.navVariant"),
					() => Q("tip.nav.sizePreset"),
					() => Q("lbl.size"),
					() => Q("tip.nav.sizePreset"),
					() => Q("lbl.adjust"),
					() => Q("tip.nav.menuTextSize"),
					() => Q("lbl.navTextSize"),
					() => Q("group.navFrame"),
					() => Q("group.navBehaviour"),
					() => Q("tip.nav.mobileSame"),
					() => Q("group.mobile"),
					() => Q("tip.nav.menuTextSize"),
					() => Q("lbl.navTextSize"),
					() => Q("lbl.navSameAsDesktop"),
					() => Q("tip.nav.mobileSize"),
					() => Q("lbl.size"),
					() => Q("tip.nav.mobileLayout"),
					() => Q("lbl.navPlacement"),
					() => Q("tip.nav.mobileTools"),
					() => Q("lbl.toolsSide"),
					() => Q("tip.nav.mobileInset"),
					() => Q("lbl.navInset"),
					() => Q("tip.nav.mobileOverlay"),
					() => Q("lbl.navOverlay"),
					() => Q("tip.nav.mobileBorder"),
					() => Q("lbl.navBorder"),
					() => Q("tip.nav.mobileMenu"),
					() => Q("lbl.mobileMenu"),
					() => Q("group.navColours"),
					() => Q("lbl.navHover"),
					() => Q("lbl.navHover"),
					() => Q("tip.nav.hoverTextColor"),
					() => Q("lbl.hoverTextColor"),
					() => Q("tip.nav.textColorPick"),
					() => Q("lbl.textColor"),
					() => Q("tip.nav.blur"),
					() => Q("lbl.navBlur"),
					() => Q("lbl.background"),
					() => Q("tip.nav.announce"),
					() => Q("group.announcement"),
					() => Q("tip.nav.announce"),
					() => Q("lbl.announceShow"),
					() => Q("tip.nav.tools"),
					() => Q("group.tools"),
					() => Q("group.submenu"),
					() => Q("lbl.design"),
					() => Q("lbl.design"),
					() => Q("tip.nav.subColumns"),
					() => Q("lbl.columns"),
					() => Q("hint.nav.submenu"),
					() => Q("group.menuItems"),
					() => Q("ui.addMenuItem"),
					() => Q("tip.nav.newPageAsItem"),
					() => Q("ph.nav.newPageTitle"),
					() => !V(p).trim(),
					() => Q("ui.newPageAsItem")
				]), H("input", Ne, (e) => Qo("textSize", e.target.valueAsNumber)), H("change", Pe, (e) => Fs(e, "textSize", Bo)), H("change", st, (e) => $(e, "textSize", Bo)), H("change", pn, (e) => Qo("blur", e.target.checked)), H("change", Tn, (e) => vs("show", e.target.checked ? !0 : void 0)), H("change", Qn, (e) => Qo("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), W(e, t);
			}, w = (e) => {
				var t = xp(), n = I(t), r = I(n), i = z(r);
				Y(i), O(n);
				var a = z(n, 2), o = I(a), s = z(o);
				Y(s), O(a);
				var c = z(a, 2), l = I(c), u = z(l);
				{
					let e = /* @__PURE__ */ j(mo), t = /* @__PURE__ */ j(ho);
					us(u, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => go(e)
					});
				}
				O(c);
				var d = z(c, 4), f = R(d, !0), p = z(d, 2), m = I(p);
				Jr(m, 17, () => V(lo), (e) => e.screen, (e, t) => {
					var n = _p(), r = I(n), i = R(r, !0), a = z(r, 2);
					let o;
					var s = R(a), c = R(z(a, 2), !0);
					O(n), B(() => {
						G(i, V(t).screen), o = J(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !V(t).bound }), _i(s, `width:${V(t).pct ?? ""}%`), G(c, V(t).bound ? `${V(t).margin}` : "-");
					}), W(e, n);
				});
				var h = z(m, 2), g = I(h), _ = R(g, !0), y = R(z(g, 2), !0);
				O(h);
				var b = z(h, 2), x = (e) => {
					var t = vp(), n = R(t, !0);
					B((e) => G(n, e), [() => Q("lbl.bindsFrom", { n: V(Ee) })]), W(e, t);
				};
				K(b, (e) => {
					V(ro) !== "full" && e(x);
				}), O(p);
				var S = z(p, 2);
				Jr(S, 21, () => Mo, (e) => e.id, (e, t) => {
					var n = pf();
					let r;
					var i = R(n, !0);
					B((e) => {
						r = J(n, 1, "svelte-1n46o8q", null, r, { on: V(ao) === V(t).id }), G(i, e);
					}, [() => Q(`lbl.width.${V(t).id}`)]), H("click", n, () => fo(V(t).width)), W(e, n);
				}), O(S);
				var C = z(S, 2), w = (e) => {
					var t = yp(), n = I(t), r = R(n, !0), i = z(n, 2);
					Y(i);
					var a = R(z(i, 2));
					O(t), B((e, n) => {
						Z(t, "title", e), G(r, n), Z(i, "min", 960), Z(i, "max", Ao), Z(i, "step", 20), X(i, V(co)), G(a, `${V(co) ?? ""} px`);
					}, [() => Q("tip.site.contentWidthFree"), () => Q("lbl.widthFree")]), H("input", i, (e) => fo(e.target.valueAsNumber)), W(e, t);
				};
				K(C, (e) => {
					V(ro) !== "full" && e(w);
				});
				var T = z(C, 2), ee = R(T, !0), te = z(T, 2);
				Jr(te, 21, () => jo, (e) => e.id, (e, t) => {
					var n = pf();
					let r;
					var i = R(n, !0);
					B((e) => {
						r = J(n, 1, "svelte-1n46o8q", null, r, { on: V(oo) === V(t).id }), G(i, e);
					}, [() => Q(`lbl.gutter.${V(t).id}`)]), H("click", n, () => po(V(t).gutter)), W(e, n);
				}), O(te);
				var ne = z(te, 2), re = I(ne), E = R(re, !0), D = z(re, 2), ie = I(D), ae = I(ie), oe = R(ae, !0), se = z(ae, 2);
				Y(se);
				var ce = R(z(se, 2));
				O(ie), O(D), O(ne);
				var le = z(ne, 4), ue = I(le), de = z(ue), fe = (e) => {
					var t = Tf();
					B((e) => {
						Z(t, "src", V(A).site.icon), Z(t, "alt", e);
					}, [() => Q("lbl.siteIcon")]), W(e, t);
				};
				K(de, (e) => {
					V(A).site.icon && e(fe);
				}), O(le);
				var pe = z(le, 2), me = I(pe), he = I(me), ge = z(he);
				O(me);
				var _e = z(me, 2), ve = (e) => {
					var t = bp(), n = L(t);
					q(n, () => v.pencil ?? "✎", !0), O(n);
					var r = z(n, 2);
					q(r, () => v.cross, !0), O(r), B((e, t) => {
						Z(n, "title", e), Z(r, "title", t);
					}, [() => Q("tip.site.editIcon"), () => Q("tip.site.removeIcon")]), H("click", n, () => P(Ya, V(A).site.icon, !0)), H("click", r, Qa), W(e, t);
				};
				K(_e, (e) => {
					V(A).site.icon && e(ve);
				}), O(pe), O(t), B((e, t, u, p, m, h, g, v, b, x, S, C, w, te, re, D, ae, le, de, fe) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(A).site.title ?? ""), Z(i, "placeholder", u), Z(a, "title", p), G(o, `${m ?? ""} `), X(s, V(A).site.description ?? ""), Z(s, "placeholder", h), Z(c, "title", g), G(l, `${v ?? ""} `), Z(d, "title", b), G(f, x), G(_, S), G(y, C), Z(T, "title", w), G(ee, te), ne.open = V(oo) === null || V(so), G(E, re), Z(ie, "title", D), G(oe, ae), Z(se, "min", 0), Z(se, "max", 12), Z(se, "step", 1), X(se, V(io)), G(ce, `${V(io) ?? ""} vw`), G(ue, `${le ?? ""} `), Z(me, "title", de), G(he, `${fe ?? ""} `);
				}, [
					() => Q("tip.site.name"),
					() => Q("lbl.name"),
					() => Q("ph.site.name"),
					() => Q("tip.site.description"),
					() => Q("lbl.description"),
					() => Q("ph.site.description"),
					() => Q("site.langTitle"),
					() => Q("site.langLabel"),
					() => Q("tip.site.contentWidth"),
					() => Q("lbl.contentWidth"),
					() => Q("lbl.screenPx"),
					() => Q("lbl.marginPx"),
					() => Q("tip.site.gutter"),
					() => Q("lbl.gutter"),
					() => Q("group.advanced"),
					() => Q("tip.site.gutterVw"),
					() => Q("lbl.gutterVw"),
					() => Q("lbl.siteIcon"),
					() => Q("tip.site.icon"),
					() => V(A).site.icon ? Q("ui.changeIcon") : Q("ui.chooseIcon")
				]), H("input", i, (e) => $a(e.target.value)), H("input", s, (e) => eo(e.target.value)), Cr("toggle", ne, (e) => P(so, e.currentTarget.open, !0)), H("input", se, (e) => po(e.target.valueAsNumber)), H("change", ge, Xa), W(e, t);
			}, ee = (e) => {
				var t = kp();
				{
					let e = (e, t = f, n = f) => {
						var r = Cp(), i = I(r), a = (e) => {
							var t = Sp(), r = R(t, !0);
							B(() => G(r, n())), W(e, t);
						};
						K(i, (e) => {
							n() && e(a);
						});
						var o = z(i, 2), s = I(o), c = R(s, !0), l = z(s, 2), u = R(l, !0), d = z(l, 2), p = I(d), m = R(p, !0), h = R(z(p), !0);
						O(d), O(o), O(r), B((e, t, n, r, i, a, s, l, d) => {
							_i(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), G(c, a), G(u, s), G(m, l), G(h, d);
						}, [
							() => Fh(t().bg, t()),
							() => Fh(t().surface, t()),
							() => Fh(t().text, t()),
							() => Fh(t().accent, t()),
							() => Fh(t()["accent-text"] ?? C(Fh(t().accent ?? "#000000", t())), t()),
							() => Q("preview.heading"),
							() => Q("preview.cardBody"),
							() => Q("preview.button"),
							() => Q("preview.link")
						]), W(e, r);
					};
					var n = I(t), r = R(n, !0), i = z(n, 2);
					Jr(i, 21, () => Lh, (e) => e.id, (e, t) => {
						var n = wp();
						let r;
						var i = I(n), a = I(i), o = z(a), s = z(o), c = z(s);
						O(i);
						var l = R(z(i, 2), !0);
						O(n), B(() => {
							r = J(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: V(zh) === V(t).id }), Z(n, "title", `${V(t).name} - ${V(t).note}`), _i(a, `background:${V(t).light.bg ?? ""}`), _i(o, `background:${V(t).light.surface ?? ""}`), _i(s, `background:${V(t).light.accent ?? ""}`), _i(c, `background:${V(t).light.text ?? ""}`), G(l, V(t).name);
						}), H("click", n, () => Rh(V(t))), W(e, n);
					}), O(i);
					var a = z(i, 2), o = R(a, !0), s = z(a, 2), c = I(s);
					Y(c);
					var l = z(c);
					O(s);
					var u = z(s, 2), d = (e) => {
						var t = Tp(), n = I(t), r = R(n, !0), i = z(n, 2), a = I(i);
						let o;
						var s = R(a, !0), c = z(a, 2);
						let l;
						var u = R(c, !0);
						O(i), O(t), B((e, t, n, i) => {
							G(r, e), Z(a, "title", t), o = J(a, 1, "svelte-1n46o8q", null, o, { on: V(Yr) }), G(s, n), l = J(c, 1, "svelte-1n46o8q", null, l, { on: !V(Yr) }), G(u, i);
						}, [
							() => Q("lbl.darkColors"),
							() => Q("hint.theme.autoDark"),
							() => Q("opt.auto"),
							() => Q("opt.custom")
						]), H("click", a, () => jh(!0)), H("click", c, () => jh(!1)), W(e, t);
					};
					K(u, (e) => {
						V(qr) && e(d);
					});
					var p = z(u, 2), m = I(p), g = (e) => {
						var t = Ep(), n = R(t, !0);
						B((e) => G(n, e), [() => Q("lbl.light")]), W(e, t);
					};
					K(m, (e) => {
						V(qr) && e(g);
					});
					var _ = z(m, 2);
					let Fe;
					var v = R(_, !0);
					O(p);
					var y = z(p, 2);
					Jr(y, 21, () => Kr, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ j(() => h(V(t), 3));
						let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
						var o = Dp(), s = I(o);
						{
							let e = /* @__PURE__ */ j(() => V(A).theme.tokens.color[r()] ?? mh(r(), V(Zr))), t = /* @__PURE__ */ j(Gr);
							ha(s, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => ph(r(), e)
							});
						}
						var c = z(s, 2), l = R(c, !0), u = R(z(c, 2), !0);
						O(o), B((e) => {
							G(l, a()), G(u, e);
						}, [() => Fh(V(A).theme.tokens.color[r()] ?? mh(r(), V(Zr)), V(Zr))]), W(e, o);
					}), O(y);
					var b = z(y, 2), x = (e) => {
						var t = Op(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2);
						let o;
						var s = R(a, !0);
						O(n);
						var c = z(n, 2);
						let l;
						Jr(c, 21, () => Kr, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ j(() => h(V(t), 3));
							let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
							var o = Dp(), s = I(o);
							{
								let e = /* @__PURE__ */ j(() => V(A).theme.alt.tokens.color[r()] ?? V(Qr)[r()] ?? mh(r(), V(Qr))), t = /* @__PURE__ */ j(Gr), n = /* @__PURE__ */ j(() => Q("theme.darkColorLabel", { name: i() }));
								ha(s, {
									get value() {
										return V(e);
									},
									get tokens() {
										return V(t);
									},
									get label() {
										return V(n);
									},
									onchange: (e) => Oh(r(), e)
								});
							}
							var c = z(s, 2), l = R(c, !0), u = R(z(c, 2), !0);
							O(o), B((e) => {
								G(l, a()), G(u, e);
							}, [() => Fh(V(A).theme.alt.tokens.color[r()] ?? V(Qr)[r()] ?? mh(r(), V(Qr)), V(Qr))]), W(e, o);
						}), O(c), B((e, t, n) => {
							G(i, e), o = J(a, 1, "chip svelte-1n46o8q", null, o, { accent: V(Xr) === "dark" }), Z(a, "title", t), G(s, n), l = J(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: V(Yr) });
						}, [
							() => Q("lbl.dark"),
							() => Q("tip.theme.darkDefault"),
							() => Q("common.standard")
						]), H("click", a, () => kh("dark")), W(e, t);
					};
					K(b, (e) => {
						V(qr) && e(x);
					});
					var S = z(b, 2), w = I(S), T = R(w, !0), ee = z(w, 2);
					let Ie;
					var te = R(ee, !0);
					O(S);
					var ne = z(S, 2), re = I(ne);
					{
						let t = /* @__PURE__ */ j(() => V(qr) ? Q("lbl.light") : "");
						e(re, () => V(Zr), () => V(t));
					}
					var E = z(re, 2), D = (t) => {
						{
							let n = /* @__PURE__ */ j(() => Q("lbl.dark"));
							e(t, () => V(Qr), () => V(n));
						}
					};
					K(E, (e) => {
						V(qr) && e(D);
					}), O(ne);
					var ie = z(ne, 2), ae = I(ie), oe = R(ae, !0), se = z(ae, 2), ce = I(se), le = I(ce), ue = z(le);
					{
						let e = /* @__PURE__ */ j(() => Mh("heading"));
						us(ue, {
							get value() {
								return V(A).theme.tokens.font.heading;
							},
							get options() {
								return V(e);
							},
							onchange: (e) => wh("heading", e)
						});
					}
					O(ce);
					var de = z(ce, 2), fe = I(de), pe = z(fe);
					{
						let e = /* @__PURE__ */ j(() => Mh("body"));
						us(pe, {
							get value() {
								return V(A).theme.tokens.font.body;
							},
							get options() {
								return V(e);
							},
							onchange: (e) => wh("body", e)
						});
					}
					O(de);
					var me = z(de, 2), he = I(me), ge = R(he, !0), _e = z(he, 2), ve = R(_e, !0);
					O(me), O(se), O(ie);
					var ye = z(ie, 2), be = I(ye), xe = R(be, !0), Se = z(be, 2), Ce = I(Se), we = I(Ce), Te = R(we, !0), Ee = R(z(we, 2), !0);
					O(Ce);
					var De = z(Ce, 2), Oe = I(De, !0), ke = R(z(Oe), !0);
					O(De);
					var Ae = z(De, 2);
					Y(Ae);
					var je = z(Ae, 2), Me = I(je, !0), Ne = R(z(Me), !0);
					O(je);
					var Pe = z(je, 2);
					Y(Pe), O(Se), O(ye), O(t), B((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, C, w, ne, re, E, D) => {
						G(r, e), G(o, t), Z(s, "title", n), Si(c, V(qr)), G(l, ` ${i ?? ""}`), Fe = J(_, 1, "chip svelte-1n46o8q", null, Fe, { accent: V(Xr) === "light" }), Z(_, "title", a), G(v, u), Z(S, "title", d), G(T, f), Ie = J(ee, 1, "chip palauto svelte-1n46o8q", null, Ie, { accent: V(hh) }), G(te, p), G(oe, m), G(le, `${h ?? ""} `), G(fe, `${g ?? ""} `), _i(he, `font-family:${V(A).theme.tokens.font.heading ?? ""}`), G(ge, y), _i(_e, `font-family:${V(A).theme.tokens.font.body ?? ""}`), G(ve, b), G(xe, x), _i(Ce, `--r-sm:${V(A).theme.tokens.radius.sm ?? ""};--r-md:${V(A).theme.tokens.radius.md ?? ""}`), G(Te, C), G(Ee, w), G(Oe, ne), G(ke, V(A).theme.tokens.radius.sm), X(Ae, re), G(Me, E), G(Ne, V(A).theme.tokens.radius.md), X(Pe, D);
					}, [
						() => Q("lbl.themePresets"),
						() => Q("lbl.colors"),
						() => Q("tip.theme.dualMode"),
						() => Q("lbl.dualMode"),
						() => Q("tip.theme.defaultScheme"),
						() => Q("common.standard"),
						() => Q("tip.theme.accentTextAuto"),
						() => Q("palette.accentText"),
						() => Q("opt.auto"),
						() => Q("group.typography"),
						() => Q("lbl.headings"),
						() => Q("lbl.bodyText"),
						() => Q("preview.heading"),
						() => Q("preview.bodySample"),
						() => Q("group.shape"),
						() => Q("preview.button"),
						() => Q("preview.card"),
						() => Q("lbl.smallCorners"),
						() => Nh(V(A).theme.tokens.radius.sm),
						() => Q("lbl.largeCorners"),
						() => Nh(V(A).theme.tokens.radius.md)
					]), H("change", c, (e) => Ah(e.target.checked)), H("click", _, () => kh("light")), H("click", ee, () => Ch(!V(hh))), H("input", Ae, (e) => Ph("sm", Number(e.target.value))), H("input", Pe, (e) => Ph("md", Number(e.target.value)));
				}
				W(e, t);
			}, te = (e) => {
				var t = Pp();
				let n;
				var r = I(t);
				Y(r);
				var i = z(r, 2), a = (e) => {
					var t = Nr();
					Jr(L(t), 17, () => Yc(dg(), V(ug), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Nr(), r = L(n), i = (e) => {
							var n = Ap(), r = I(n), i = z(r);
							O(n), B((e) => {
								Z(n, "title", e), G(r, `${V(t).label ?? ""} `);
							}, [() => Q("tip.webpAuto")]), H("change", i, mg), W(e, n);
						}, a = (e) => {
							var n = jp(), r = I(n), i = z(r);
							O(n), B((e) => {
								Z(n, "title", e), G(r, `${V(t).label ?? ""} `);
							}, [() => Q("tip.blocks.galleryImages")]), H("change", i, vg), W(e, n);
						}, o = (e) => {
							var n = nd(), r = R(n, !0);
							B(() => G(r, V(t).label)), H("click", n, () => fg(V(t))), W(e, n);
						};
						K(r, (e) => {
							V(t).act === "image" ? e(i) : V(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), W(e, n);
					}, (e) => {
						var t = zu(), n = R(t, !0);
						B((e) => G(n, e), [() => Q("canvas.searchEmpty")]), W(e, t);
					}), W(e, t);
				}, o = /* @__PURE__ */ j(() => V(ug).trim()), s = (e) => {
					var t = Np(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2), o = I(a), s = R(o, !0), c = z(o, 2), l = R(c, !0);
					O(a), O(n);
					var u = z(n, 2), d = R(u, !0), f = z(u, 2), p = I(f), m = z(p);
					O(f);
					var h = z(f, 2), g = R(h, !0), _ = z(h, 2), v = R(_, !0), y = z(_, 2), b = R(y, !0), x = z(y, 2), S = R(x, !0), C = z(x, 2), w = R(C, !0), T = z(C, 2), ee = R(T, !0), te = z(T, 2), ne = R(te, !0), re = z(te, 2), E = R(re, !0), D = z(re, 2), ie = R(D, !0), ae = z(D, 2), oe = R(ae, !0), se = z(ae, 2), ce = R(se, !0), le = z(se, 2), ue = R(le, !0), de = z(le, 2), fe = R(de, !0), pe = z(de, 2), me = R(pe, !0), he = z(pe, 2), ge = R(he, !0), _e = z(he, 2), ve = R(_e, !0), ye = z(_e, 2), be = I(ye), xe = R(be, !0), Se = z(be, 2), Ce = I(Se), we = R(Ce, !0), Te = z(Ce, 2), Ee = I(Te), De = z(Ee);
					O(Te), O(Se), O(ye);
					var Oe = z(ye, 2), ke = I(Oe), Ae = R(ke, !0), je = z(ke, 2), Me = I(je), Ne = R(Me, !0), Pe = z(Me, 2), Fe = R(Pe, !0), Ie = z(Pe, 2), Le = R(Ie, !0), Re = z(Ie, 2), ze = R(Re, !0);
					O(je), O(Oe);
					var Be = z(Oe, 2), Ve = I(Be), k = R(Ve, !0), He = z(Ve, 2), We = I(He), A = R(We, !0), Ge = z(We, 2), Ke = R(Ge, !0), qe = z(Ge, 2), Je = R(qe, !0), Ye = z(qe, 2), Xe = R(Ye, !0), Ze = z(Ye, 2), Qe = R(Ze, !0);
					O(He), O(Be);
					var $e = z(Be, 2), et = (e) => {
						let t = /* @__PURE__ */ j(() => V(sc).filter((e) => ic[e]?.data?.mal?.kind === "blocks"));
						var n = Mp(), r = I(n), i = R(r, !0), a = z(r, 2);
						Jr(a, 20, () => V(t), (e) => e, (e, t) => {
							var n = nd(), r = R(n, !0);
							B((e) => {
								Z(n, "title", e), G(r, ic[t].data.mal.name);
							}, [() => Q("canvas.insertGroup")]), H("click", n, () => Ue?.sendInsertTemplate(t)), W(e, n);
						}), O(a), O(n), B((e) => G(i, e), [() => Q("canvas.tabMyTemplates")]), W(e, n);
					}, tt = /* @__PURE__ */ j(() => V(sc).some((e) => ic[e]?.data?.mal?.kind === "blocks"));
					K($e, (e) => {
						V(tt) && e(et);
					});
					var nt = z($e, 2), rt = (e) => {
						var t = Mp(), n = I(t), r = R(n, !0), i = z(n, 2);
						Jr(i, 21, () => V(sg), (e) => e.type, (e, t) => {
							var n = Nr(), r = L(n), i = (e) => {
								var n = Mp(), r = I(n), i = R(r, !0), a = z(r, 2);
								Jr(a, 21, () => V(t).variants, (e) => e.label, (e, n) => {
									var r = nd(), i = R(r, !0);
									B((e) => {
										Z(r, "title", e), G(i, V(n).label);
									}, [() => Q("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", r, () => lg(V(t), V(n).props)), W(e, r);
								}), O(a), O(n), B(() => G(i, V(t).label)), W(e, n);
							}, a = (e) => {
								var n = nd(), r = R(n, !0);
								B((e) => {
									Z(n, "title", e), G(r, V(t).label);
								}, [() => Q("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", n, () => lg(V(t))), W(e, n);
							};
							K(r, (e) => {
								V(t).variants?.length ? e(i) : e(a, -1);
							}), W(e, n);
						}), O(i), O(t), B((e) => G(r, e), [() => Q("panel.plugins")]), W(e, t);
					};
					K(nt, (e) => {
						V(sg).length && e(rt);
					}), B((e, t, n, r, a, o, u, m, ye, be, Se, O, De, Oe, ke, je, Be, Ve, He, Ue, We, Ge, qe, Ye, Ze, $e, et, tt, nt, rt, it, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, j, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt) => {
						G(i, e), G(s, t), Z(c, "title", n), G(l, r), G(d, a), Z(f, "title", o), G(p, `${u ?? ""} `), Z(h, "title", m), G(g, ye), Z(_, "title", be), G(v, Se), Z(y, "title", O), G(b, De), Z(x, "title", Oe), G(S, ke), Z(C, "title", je), G(w, Be), Z(T, "title", Ve), G(ee, He), Z(te, "title", Ue), G(ne, We), Z(re, "title", Ge), G(E, qe), Z(D, "title", Ye), G(ie, Ze), Z(ae, "title", $e), G(oe, et), Z(se, "title", tt), G(ce, nt), Z(le, "title", rt), G(ue, it), Z(de, "title", at), G(fe, ot), Z(pe, "title", st), G(me, ct), Z(he, "title", lt), G(ge, ut), Z(_e, "title", dt), G(ve, ft), G(xe, pt), Z(Ce, "title", mt), G(we, ht), Z(Te, "title", gt), G(Ee, `${_t ?? ""} `), G(Ae, vt), Z(Me, "title", yt), G(Ne, bt), Z(Pe, "title", j), G(Fe, xt), Z(Ie, "title", St), G(Le, Ct), Z(Re, "title", wt), G(ze, Tt), G(k, Et), G(A, Dt), G(Ke, Ot), G(Je, kt), G(Xe, At), G(Qe, jt);
					}, [
						() => Q("blocks.text"),
						() => Q("blocks.text"),
						() => Q("tip.blocks.textBox"),
						() => Q("ui.textBox"),
						() => Q("blocks.button"),
						() => Q("tip.webpAuto"),
						() => Q("blocks.image"),
						() => Q("tip.blocks.video"),
						() => Q("blocks.video"),
						() => Q("tip.blocks.icon"),
						() => Q("blocks.icon"),
						() => Q("tip.blocks.map"),
						() => Q("blocks.map"),
						() => Q("tip.blocks.form"),
						() => Q("blocks.form"),
						() => Q("tip.blocks.collection"),
						() => Q("blocks.collection"),
						() => Q("tip.blocks.faq"),
						() => Q("blocks.faq"),
						() => Q("tip.blocks.timeline"),
						() => Q("blocks.timeline"),
						() => Q("tip.blocks.quote"),
						() => Q("blocks.quote"),
						() => Q("tip.blocks.stats"),
						() => Q("blocks.stats"),
						() => Q("tip.blocks.table"),
						() => Q("blocks.table"),
						() => Q("tip.blocks.share"),
						() => Q("blocks.share"),
						() => Q("tip.blocks.countdown"),
						() => Q("blocks.countdown"),
						() => Q("tip.blocks.audio"),
						() => Q("blocks.audio"),
						() => Q("tip.blocks.product"),
						() => Q("blocks.product"),
						() => Q("tip.blocks.cart"),
						() => Q("blocks.cart"),
						() => Q("tip.blocks.checkout"),
						() => Q("blocks.checkout"),
						() => Q("blocks.gallery"),
						() => Q("tip.blocks.gallery"),
						() => Q("ui.emptyGallery"),
						() => Q("tip.blocks.galleryImages"),
						() => Q("ui.galleryWithImages"),
						() => Q("blocks.calendar"),
						() => Q("tip.blocks.calendar"),
						() => Q("calendar.viewList"),
						() => Q("tip.blocks.calendar"),
						() => Q("calendar.viewCards"),
						() => Q("tip.blocks.calendar"),
						() => Q("calendar.viewMonth"),
						() => Q("tip.blocks.calendar"),
						() => Q("calendar.viewNext"),
						() => Q("group.shapes"),
						() => Q("shape.line"),
						() => Q("shape.arrow"),
						() => Q("shape.circle"),
						() => Q("shape.rect"),
						() => Q("shape.triangle")
					]), H("click", o, () => og("text")), H("click", c, () => og("text-box")), H("click", u, () => og("button")), H("change", m, mg), H("click", h, () => og("video")), H("click", _, () => og("icon")), H("click", y, () => og("map")), H("click", x, () => og("form")), H("click", C, () => og("collection")), H("click", T, () => og("faq")), H("click", te, () => og("timeline")), H("click", re, () => og("quote")), H("click", D, () => og("stats")), H("click", ae, () => og("table")), H("click", se, () => og("share")), H("click", le, () => og("countdown")), H("click", de, () => og("audio")), H("click", pe, () => og("product")), H("click", he, () => og("cart")), H("click", _e, () => og("checkout")), H("click", Ce, () => og("gallery")), H("change", De, vg), H("click", Me, () => og("calendar")), H("click", Pe, () => og("calendar-cards")), H("click", Ie, () => og("calendar-month")), H("click", Re, () => og("calendar-next")), H("click", We, () => og("shape-line")), H("click", Ge, () => og("shape-arrow")), H("click", qe, () => og("shape-circle")), H("click", Ye, () => og("shape-rect")), H("click", Ze, () => og("shape-triangle")), W(e, t);
				};
				K(i, (e) => {
					V(o) ? e(a) : e(s, -1);
				}), O(t), B((e, i, a) => {
					n = J(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: V(be) === "mobile" }), Z(t, "title", e), Z(r, "placeholder", i), Z(r, "title", a);
				}, [
					() => V(be) === "mobile" ? Q("tip.blocks.mobileLocked") : void 0,
					() => Q("canvas.searchBlocks"),
					() => Q("canvas.searchBlocks")
				]), Ei(r, () => V(ug), (e) => P(ug, e)), W(e, t);
			}, ne = (e) => {
				var t = Fp(), n = I(t), r = I(n), i = R(z(r));
				O(n);
				var a = z(n, 2);
				Y(a);
				var o = z(a, 2), s = I(o);
				Y(s);
				var c = z(s);
				O(o), O(t), B((e, t) => {
					G(r, `${e ?? ""} `), G(i, `${V(se).size ?? ""} px`), X(a, V(se).size), Si(s, V(se).snap !== !1), G(c, ` ${t ?? ""}`);
				}, [() => Q("lbl.gridSize"), () => Q("lbl.gridSnap")]), H("input", a, (e) => vi("size", Number(e.target.value))), H("change", s, (e) => vi("snap", e.target.checked)), W(e, t);
			}, re = (e) => {
				var t = Hp(), r = I(t), i = (e) => {
					var t = Ip(), n = L(t), r = R(n, !0), i = z(n, 2);
					a(i), B((e) => G(r, e), [() => Q("blocks.suffix", { label: Ln[V(M).type] ?? V(M).type })]), W(e, t);
				}, o = (e) => {
					var t = Vp(), r = L(t), i = R(r, !0), a = z(r, 2), o = I(a), s = z(o);
					Y(s), O(a);
					var c = z(a, 4), l = I(c);
					Y(l);
					var u = z(l);
					O(c);
					var d = z(c, 2), f = (e) => {
						var t = Lp(), n = L(t), r = I(n), i = R(z(r));
						O(n);
						var a = z(n, 2);
						Y(a), B((e) => {
							G(r, `${e ?? ""} `), G(i, `${V(Vn).size ?? ""} px`), X(a, V(Vn).size);
						}, [() => Q("lbl.gridSize")]), H("input", a, (e) => gi("size", Number(e.target.value))), W(e, t);
					};
					K(d, (e) => {
						V(Vn) && e(f);
					});
					var p = z(d, 4), m = R(p, !0), g = z(p, 2);
					Jr(g, 21, () => [["", "common.standard"], ...Object.entries(rl)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ j(() => h(V(t), 2));
						let r = () => V(n)[0], i = () => V(n)[1], a = /* @__PURE__ */ j(() => Qn(r()));
						var o = Rp();
						let s;
						var c = I(o), l = I(c), u = z(l, 2), d = z(u, 2);
						O(c);
						var f = R(z(c, 2), !0);
						O(o), B((e, t) => {
							s = J(o, 1, "rs-card svelte-1n46o8q", null, s, { on: V(Kn) === r() }), Z(o, "title", e), _i(c, `background: ${V(a).bg ?? ""}`), _i(l, `background: ${V(a).text ?? ""}`), _i(u, `background: ${V(a).surface ?? ""}`), _i(d, `background: ${V(a).accent ?? ""}`), G(f, t);
						}, [() => Q("tip.props.sectionTheme"), () => Q(i())]), H("click", o, () => Zn(r())), W(e, o);
					}), O(g);
					var _ = z(g, 2), y = I(_), b = z(y), x = I(b), S = R(x), C = z(x, 2);
					q(C, () => v.copy, !0), O(C), O(b), O(_);
					var w = z(_, 4), T = R(w, !0), ee = z(w, 2);
					n(ee, () => V(Rr), () => V(Un));
					var te = z(ee, 4), ne = I(te), re = z(ne);
					{
						let e = /* @__PURE__ */ j(() => ei(V(Wn)) ? V(Wn).type : "");
						us(re, {
							get value() {
								return V(e);
							},
							get options() {
								return ti;
							},
							onchange: (e) => ci(e || null)
						});
					}
					O(te);
					var E = z(te, 2), D = (e) => {
						var t = Bp(), n = L(t), r = I(n), i = z(r);
						Y(i), O(n);
						var a = z(n, 2), o = I(a), s = z(o);
						Y(s), O(a);
						var c = z(a, 2), l = (e) => {
							var t = zp(), n = L(t), r = I(n), i = z(r);
							{
								let e = /* @__PURE__ */ j(() => V(Wn).props.effect ?? "slide-up"), t = /* @__PURE__ */ j(() => [
									["fade-in", Q("anim.fadeIn")],
									["slide-up", Q("anim.slideUp")],
									["zoom-in", Q("anim.zoomIn")]
								]);
								us(i, {
									get value() {
										return V(e);
									},
									get options() {
										return V(t);
									},
									onchange: (e) => fi("effect", e)
								});
							}
							O(n);
							var a = z(n, 2), o = I(a), s = z(o);
							Y(s), O(a);
							var c = z(a, 2), l = I(c), u = z(l);
							{
								let e = /* @__PURE__ */ j(() => V(Wn).props.pattern ?? "sequence"), t = /* @__PURE__ */ j(() => [
									["sequence", Q("opt.stagger.sequence")],
									["columns", Q("opt.stagger.columns")],
									["rows", Q("opt.stagger.rows")],
									["center", Q("opt.stagger.center")]
								]);
								us(u, {
									get value() {
										return V(e);
									},
									get options() {
										return V(t);
									},
									onchange: (e) => fi("pattern", e)
								});
							}
							O(c), B((e, t, i, u, d, f) => {
								Z(n, "title", e), G(r, `${t ?? ""} `), Z(a, "title", i), G(o, `${u ?? ""} `), X(s, V(Wn).props.step ?? 90), Z(c, "title", d), G(l, `${f ?? ""} `);
							}, [
								() => Q("tip.props.staggerEffect"),
								() => Q("lbl.staggerEffect"),
								() => Q("tip.props.staggerStep"),
								() => Q("lbl.stepMs"),
								() => Q("tip.props.staggerPattern"),
								() => Q("lbl.pattern")
							]), H("change", s, (e) => di("step", Number(e.target.value))), W(e, t);
						};
						K(c, (e) => {
							V(Wn).type === "stagger" && e(l);
						}), B((e, t) => {
							G(r, `${e ?? ""} `), X(i, V(Wn).props.duration), G(o, `${t ?? ""} `), X(s, V(Wn).props.delay ?? 0);
						}, [() => Q("lbl.durationMs"), () => Q("lbl.delayMs")]), H("change", i, (e) => di("duration", Number(e.target.value))), H("change", s, (e) => di("delay", Number(e.target.value))), W(e, t);
					}, ie = /* @__PURE__ */ j(() => ei(V(Wn)));
					K(E, (e) => {
						V(ie) && e(D);
					});
					var ae = z(E, 2), oe = I(ae), se = z(oe);
					{
						let e = /* @__PURE__ */ j(() => V(Gn)?.type ?? (V(Wn) && !ei(V(Wn)) ? V(Wn).type : ""));
						us(se, {
							get value() {
								return V(e);
							},
							get options() {
								return ri;
							},
							onchange: (e) => ui(e || null)
						});
					}
					O(ae), B((e, t, n, r, c, d, f, h, g, v, b, x, w, ee, re) => {
						G(i, e), Z(a, "title", t), G(o, `${n ?? ""} `), X(s, V(Hn)), Z(s, "placeholder", r), Si(l, V(Vn) !== null), G(u, ` ${c ?? ""}`), Z(p, "title", d), G(m, f), Z(_, "title", h), G(y, `${g ?? ""} `), G(S, `#${V(Bn) ?? ""}`), Z(C, "title", v), G(T, b), Z(te, "title", x), G(ne, `${w ?? ""} `), Z(ae, "title", ee), G(oe, `${re ?? ""} `);
					}, [
						() => Q("lbl.section"),
						() => Q("hint.props.minHeight"),
						() => Q("lbl.minHeight"),
						() => Q("ph.minHeight"),
						() => Q("lbl.sectionGrid"),
						() => Q("tip.props.sectionTheme"),
						() => Q("lbl.sectionTheme"),
						() => Q("tip.props.anchor"),
						() => Q("lbl.anchor"),
						() => Q("tip.props.copyAnchor"),
						() => Q("lbl.background"),
						() => Q("tip.props.sectionAnim"),
						() => Q("lbl.animIn"),
						() => Q("tip.props.sectionHover"),
						() => Q("lbl.onHover")
					]), H("change", s, (e) => pi(e.target.value)), H("change", l, (e) => hi(e.target.checked)), H("click", C, () => navigator.clipboard?.writeText(`#${V(Bn)}`)), W(e, t);
				}, s = (e) => {
					var t = zu(), n = R(t, !0);
					B((e) => G(n, e), [() => Q("hint.props.empty")]), W(e, t);
				};
				K(r, (e) => {
					V(M) ? e(i) : V(Bn) ? e(o, 1) : e(s, -1);
				}), O(t), W(e, t);
			}, E = (e) => {
				var t = Xp(), i = I(t), a = I(i);
				Y(a);
				var o = z(a);
				O(i);
				var s = z(i, 2), c = (e) => {
					var t = Mp(), n = I(t), r = R(n, !0), i = z(n, 2);
					Jr(i, 21, () => V(A).pages ?? [], (e) => e.id, (e, t) => {
						var n = ed(), r = I(n);
						Y(r);
						var i = z(r);
						O(n), B((e, a) => {
							Z(n, "title", e), Si(r, a), G(i, ` ${(V(t).title || V(t).id) ?? ""}`);
						}, [() => Q("tip.footer.hideOnPage"), () => !(V(A).footer?.hideOn ?? []).includes(V(t).id)]), H("change", r, (e) => iu(V(t).id, e.target.checked)), W(e, n);
					}), O(i), O(t), B((e) => G(r, e), [() => Q("group.showOnPages")]), W(e, t);
				};
				K(s, (e) => {
					V(A).footer?.show && e(c);
				});
				var l = z(s, 2), u = I(l), d = R(u, !0), f = z(u, 2), p = I(f);
				Jr(p, 21, () => Ul, (e) => e.id, (e, t) => {
					var n = Up(), r = I(n);
					q(r, () => uu(V(t).thumb), !0), O(r);
					var i = R(z(r, 2), !0);
					O(n), B((e) => {
						Z(n, "title", e), G(i, V(t).label);
					}, [() => Q("tip.footer.template", { label: V(t).label })]), H("click", n, () => Gl(V(t).id)), W(e, n);
				}), O(p), O(f), O(l);
				var m = z(l, 2), h = I(m), g = R(h, !0), _ = z(h, 2), y = I(_), b = I(y), x = z(b);
				Y(x), O(y);
				var S = z(y, 2), C = I(S), w = z(C);
				Y(w), O(S);
				var T = z(S, 2), ee = I(T), te = z(ee);
				{
					let e = /* @__PURE__ */ j(() => V(A).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ j(() => [
						["text", Q("blocks.text")],
						["image", Q("opt.brand.image")],
						["both", Q("opt.brand.both")]
					]);
					us(te, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => Rl(e)
					});
				}
				O(T);
				var ne = z(T, 2), re = (e) => {
					var t = Gp(), n = L(t), r = I(n), i = I(r), a = z(i);
					O(r);
					var o = z(r, 2), s = (e) => {
						var t = vu();
						q(t, () => v.cross, !0), O(t), B((e) => Z(t, "title", e), [() => Q("tip.footer.removeLogo")]), H("click", t, Bl), W(e, t);
					};
					K(o, (e) => {
						V(A).footer?.brand?.logo && e(s);
					}), O(n);
					var c = z(n, 2), l = (e) => {
						var t = Wp(), n = L(t), r = I(n), i = R(z(r));
						O(n);
						var a = z(n, 2);
						Y(a), B((e) => {
							G(r, `${e ?? ""} `), G(i, `${V(A).footer?.brand?.logoHeight ?? 40 ?? ""} px`), X(a, V(A).footer?.brand?.logoHeight ?? 40);
						}, [() => Q("lbl.logoHeight")]), H("input", a, (e) => Vl(e.target.value)), W(e, t);
					};
					K(c, (e) => {
						V(A).footer?.brand?.logo && e(l);
					}), B((e, t) => {
						Z(r, "title", e), G(i, `${t ?? ""} `);
					}, [() => Q("tip.webpAutoPublish"), () => V(A).footer?.brand?.logo ? Q("ui.changeLogo") : Q("ui.uploadLogo")]), H("change", a, zl), W(e, t);
				};
				K(ne, (e) => {
					(V(A).footer?.brand?.mode ?? "text") !== "text" && e(re);
				}), O(_), O(m);
				var E = z(m, 2), D = I(E), ie = R(D, !0), ae = z(D, 2), oe = I(ae);
				Jr(oe, 17, () => V(A).footer?.columns ?? [], Wr, (e, t, n) => {
					var r = Kp(), i = L(r), a = I(i);
					Y(a);
					var o = z(a, 2), s = I(o);
					q(s, () => v.plus, !0), O(s);
					var c = z(s, 2);
					c.disabled = n === 0, q(c, () => v.up, !0), O(c);
					var l = z(c, 2);
					q(l, () => v.down, !0), O(l);
					var u = z(l, 2);
					q(u, () => v.cross, !0), O(u), O(o), O(i), Jr(z(i, 2), 17, () => V(t).links ?? [], Wr, (e, r, i) => {
						var a = Fu(), o = I(a);
						Y(o);
						var s = z(o, 2), c = I(s);
						c.disabled = i === 0, q(c, () => v.up, !0), O(c);
						var l = z(c, 2);
						q(l, () => v.down, !0), O(l);
						var u = z(l, 2);
						q(u, () => v.cross, !0), O(u), O(s);
						var d = z(s, 2), f = I(d);
						{
							let e = /* @__PURE__ */ j(() => V(r).page ?? "__href"), t = /* @__PURE__ */ j(() => Q("tip.linkTarget")), a = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
							us(f, {
								get value() {
									return V(e);
								},
								get title() {
									return V(t);
								},
								get options() {
									return V(a);
								},
								onchange: (e) => Im(n, i, e)
							});
						}
						O(d);
						var p = z(d, 2), m = (e) => {
							var t = Pu();
							Y(t), B((e, n) => {
								X(t, V(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
							}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", t, (e) => Lm(n, i, e.target.value)), W(e, t);
						};
						K(p, (e) => {
							V(r).page || e(m);
						}), O(a), B((e, n) => {
							X(o, V(r).label), Z(o, "title", e), l.disabled = i === V(t).links.length - 1, Z(u, "title", n);
						}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), H("input", o, (e) => Fm(n, i, e.target.value)), H("click", c, () => pu(n, i, -1)), H("click", l, () => pu(n, i, 1)), H("click", u, () => fu(n, i)), W(e, a);
					}), B((e, r, i) => {
						X(a, V(t).title), Z(a, "title", e), Z(s, "title", r), l.disabled = n === V(A).footer.columns.length - 1, Z(u, "title", i);
					}, [
						() => Q("tip.footer.columnTitle"),
						() => Q("tip.footer.addLink"),
						() => Q("tip.footer.removeColumn")
					]), H("input", a, (e) => cu(n, e.target.value)), H("click", s, () => du(n)), H("click", c, () => su(n, -1)), H("click", l, () => su(n, 1)), H("click", u, () => ou(n)), W(e, r);
				});
				var se = z(oe, 2), ce = R(se, !0), le = z(se, 2), ue = I(le), de = z(ue);
				{
					let e = /* @__PURE__ */ j(() => V(A).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ j(() => [["left", Q("common.left")], ["center", Q("common.center")]]);
					us(de, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => $l(e)
					});
				}
				O(le), O(ae), O(E);
				var fe = z(E, 2), pe = I(fe), me = R(pe, !0), he = z(pe, 2), ge = I(he);
				Jr(ge, 17, () => V(A).footer?.social ?? [], Wr, (e, t, n) => {
					var r = qp(), i = I(r), a = I(i);
					q(a, () => Ua(V(t).icon) || "", !0), O(a);
					var o = z(a, 2);
					{
						let e = /* @__PURE__ */ j(() => Q("blocks.icon"));
						us(o, {
							get value() {
								return V(t).icon;
							},
							get title() {
								return V(e);
							},
							get options() {
								return Um;
							},
							onchange: (e) => Vm(n, e)
						});
					}
					O(i);
					var s = z(i, 2), c = I(s);
					c.disabled = n === 0, q(c, () => v.up, !0), O(c);
					var l = z(c, 2);
					q(l, () => v.down, !0), O(l);
					var u = z(l, 2);
					q(u, () => v.cross, !0), O(u), O(s);
					var d = z(s, 2);
					Y(d), O(r), B((e, r) => {
						l.disabled = n === V(A).footer.social.length - 1, Z(u, "title", e), X(d, V(t).url), Z(d, "placeholder", r);
					}, [() => Q("tip.removeLink"), () => Q("ph.hrefMailto")]), H("click", c, () => Bm(n, -1)), H("click", l, () => Bm(n, 1)), H("click", u, () => zm(n)), H("change", d, (e) => Hm(n, e.target.value)), W(e, r);
				});
				var _e = z(ge, 2), ve = R(_e, !0);
				O(he), O(fe);
				var ye = z(fe, 2), be = I(ye), xe = R(be, !0), Se = z(be, 2), Ce = I(Se), we = I(Ce);
				Y(we);
				var Te = z(we);
				O(Ce);
				var Ee = z(Ce, 2), Oe = (e) => {
					let t = /* @__PURE__ */ j(() => V(A).footer.cta);
					var n = Yp(), r = L(n), i = I(r), a = z(i);
					{
						let e = /* @__PURE__ */ j(() => V(t).kind ?? "button"), n = /* @__PURE__ */ j(() => [["button", Q("opt.cta.button")], ["newsletter", Q("opt.cta.newsletter")]]);
						us(a, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => tu("kind", e)
						});
					}
					O(r);
					var o = z(r, 2), s = I(o);
					Y(s);
					var c = z(s);
					O(o);
					var l = z(o, 2), u = I(l), d = z(u);
					Y(d), O(l);
					var f = z(l, 2), p = I(f), m = z(p);
					Y(m), O(f);
					var h = z(f, 2), g = I(h), _ = z(g);
					Y(_), O(h);
					var v = z(h, 2), y = (e) => {
						var n = Jp(), r = L(n), i = I(r), a = z(i);
						{
							let e = /* @__PURE__ */ j(() => V(t).page ?? "__href"), n = /* @__PURE__ */ j(() => [...V(A).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHrefMailto")]]);
							us(a, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => nu(e)
							});
						}
						O(r);
						var o = z(r, 2), s = (e) => {
							var n = Hu();
							Y(n), B((e, r) => {
								X(n, V(t).href ?? ""), Z(n, "placeholder", e), Z(n, "title", r);
							}, [() => Q("ph.hrefMailtoAnchor"), () => Q("tip.hrefAnchor")]), H("change", n, (e) => tu("href", e.target.value)), W(e, n);
						};
						K(o, (e) => {
							V(t).page || e(s);
						}), B((e, t) => {
							Z(r, "title", e), G(i, `${t ?? ""} `);
						}, [() => Q("tip.footer.ctaTarget"), () => Q("lbl.buttonTarget")]), W(e, n);
					}, b = (e) => {
						var n = Zu(), r = L(n), i = I(r), a = z(i);
						Y(a), O(r);
						var o = z(r, 2), s = I(o), c = z(s);
						Y(c), O(o);
						var l = z(o, 2), u = I(l), d = z(u);
						Y(d), O(l), B((e, n, f, p, m, h, g, _, v) => {
							Z(r, "title", e), G(i, `${n ?? ""} `), X(a, V(t).endpoint ?? ""), Z(a, "placeholder", f), Z(o, "title", p), G(s, `${m ?? ""} `), X(c, V(t).recipient ?? ""), Z(c, "placeholder", h), Z(l, "title", g), G(u, `${_ ?? ""} `), X(d, V(t).success ?? ""), Z(d, "placeholder", v);
						}, [
							() => Q("tip.footer.ctaEndpoint"),
							() => Q("lbl.newsletterEndpoint"),
							() => Q("ph.endpoint"),
							() => Q("tip.footer.ctaRecipient"),
							() => Q("lbl.recipientFallback"),
							() => Q("ph.email"),
							() => Q("tip.footer.ctaSuccess"),
							() => Q("lbl.confirmation"),
							() => Q("ph.footer.ctaSuccess")
						]), H("change", a, (e) => tu("endpoint", e.target.value)), H("change", c, (e) => tu("recipient", e.target.value)), H("input", d, (e) => tu("success", e.target.value)), W(e, n);
					};
					K(v, (e) => {
						(V(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), B((e, n, a, v, y, b, x, S, C, w, T, ee) => {
						Z(r, "title", e), G(i, `${n ?? ""} `), Z(o, "title", a), Si(s, V(t).big === !0), G(c, ` ${v ?? ""}`), Z(l, "title", y), G(u, `${b ?? ""} `), X(d, V(t).heading ?? ""), Z(d, "placeholder", x), Z(f, "title", S), G(p, `${C ?? ""} `), X(m, V(t).sub ?? ""), Z(h, "title", w), G(g, `${T ?? ""} `), X(_, V(t).label ?? ""), Z(_, "placeholder", ee);
					}, [
						() => Q("tip.footer.ctaKind"),
						() => Q("common.type"),
						() => Q("tip.footer.ctaBig"),
						() => Q("lbl.bigCentered"),
						() => Q("tip.footer.ctaHeading"),
						() => Q("lbl.heading"),
						() => Q("ph.footer.ctaHeading"),
						() => Q("tip.footer.ctaSub"),
						() => Q("lbl.subText"),
						() => Q("tip.footer.ctaLabel"),
						() => Q("lbl.buttonText"),
						() => Q("ph.footer.ctaLabel")
					]), H("change", s, (e) => tu("big", e.target.checked)), H("input", d, (e) => tu("heading", e.target.value)), H("input", m, (e) => tu("sub", e.target.value)), H("input", _, (e) => tu("label", e.target.value)), W(e, n);
				};
				K(Ee, (e) => {
					V(A).footer?.cta && e(Oe);
				}), O(Se), O(ye);
				var ke = z(ye, 2), Ae = I(ke), je = R(Ae, !0), Me = z(Ae, 2), Ne = I(Me);
				r(Ne, () => "linkRow", () => V(A).footer?.linkRow ?? []);
				var Pe = z(Ne, 2), Fe = R(Pe, !0);
				O(Me), O(ke);
				var Ie = z(ke, 2), Le = I(Ie), Re = R(Le, !0), ze = z(Le, 2), Be = I(ze), Ve = (e) => {
					var t = Ad(), n = L(t), r = I(n), i = z(r);
					{
						let e = /* @__PURE__ */ j(() => V(A).footer?.align ?? "left"), t = /* @__PURE__ */ j(() => [
							["left", Q("common.left")],
							["center", Q("common.center")],
							["right", Q("common.right")]
						]);
						us(i, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Il("footer", (t) => {
								t.align = e;
							})
						});
					}
					O(n), De(2), B((e, t) => {
						Z(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Q("tip.footer.align"), () => Q("lbl.align")]), W(e, t);
				};
				K(Be, (e) => {
					V(A).footer?.cta?.big !== !0 && e(Ve);
				});
				var k = z(Be, 2), He = R(k, !0), Ue = z(k, 2);
				n(Ue, () => Br, () => V(A).footer?.background?.layers ?? []), O(ze), O(Ie);
				var We = z(Ie, 2), Ge = I(We), Ke = R(Ge, !0), qe = z(Ge, 2), Je = I(qe), Ye = I(Je), Xe = z(Ye);
				Y(Xe), O(Je);
				var Ze = z(Je, 2), Qe = R(Ze, !0), $e = z(Ze, 2);
				r($e, () => "baseline", () => V(A).footer?.baseline ?? []);
				var et = z($e, 2), tt = R(et, !0);
				O(qe), O(We), O(t), B((e, t, n, r, s, c, l, u, f, p, m, h, _, v, te, ne, re, E, D, ae, oe, se, de, fe, pe, he, ge, _e, ye, be, Se, Ee) => {
					Z(i, "title", e), Si(a, t), G(o, ` ${n ?? ""}`), G(d, r), G(g, s), Z(y, "title", c), G(b, `${l ?? ""} `), X(x, V(A).footer?.brand?.title ?? ""), Z(x, "placeholder", u), Z(S, "title", f), G(C, `${p ?? ""} `), X(w, V(A).footer?.brand?.tagline ?? ""), Z(T, "title", m), G(ee, `${h ?? ""} `), G(ie, _), G(ce, v), Z(le, "title", te), G(ue, `${ne ?? ""} `), G(me, re), G(ve, E), G(xe, D), Z(Ce, "title", ae), Si(we, oe), G(Te, ` ${se ?? ""}`), G(je, de), G(Fe, fe), G(Re, pe), G(He, he), G(Ke, ge), Z(Je, "title", _e), G(Ye, `${ye ?? ""} `), X(Xe, V(A).footer?.copyright ?? ""), Z(Xe, "placeholder", be), G(Qe, Se), G(tt, Ee);
				}, [
					() => Q("tip.footer.show"),
					() => !!V(A).footer?.show,
					() => Q("lbl.showFooter"),
					() => Q("group.startpoint"),
					() => Q("group.brand"),
					() => Q("tip.footer.brandTitle"),
					() => Q("lbl.title"),
					() => Q("ph.footer.brandTitle"),
					() => Q("tip.footer.tagline"),
					() => Q("lbl.tagline"),
					() => Q("tip.footer.brandMode"),
					() => Q("lbl.brandMode"),
					() => Q("group.columns"),
					() => Q("ui.addColumn"),
					() => Q("tip.footer.columnsAlign"),
					() => Q("lbl.splitColumnAlign"),
					() => Q("group.social"),
					() => Q("ui.addSocial"),
					() => Q("group.cta"),
					() => Q("tip.footer.cta"),
					() => !!V(A).footer?.cta,
					() => Q("lbl.showCta"),
					() => Q("group.linkRow"),
					() => Q("ui.addRowLink"),
					() => Q("group.appearance"),
					() => Q("lbl.background"),
					() => Q("group.baseline"),
					() => Q("tip.footer.copyright"),
					() => Q("lbl.copyright"),
					() => Q("ph.footer.copyright"),
					() => Q("lbl.baselineLinks"),
					() => Q("ui.addBaselineLink")
				]), H("change", a, (e) => Il("footer", (t) => {
					t.show = e.target.checked;
				})), H("input", x, (e) => Ll("title", e.target.value)), H("input", w, (e) => Ll("tagline", e.target.value)), H("click", se, au), H("click", _e, Rm), H("change", we, (e) => eu(e.target.checked)), H("click", Pe, () => Kl("linkRow")), H("input", Xe, (e) => Hl(e.target.value)), H("click", et, () => Kl("baseline")), W(e, t);
			}, D = (e) => {
				var t = im(), n = I(t), r = (e) => {
					var t = Iu(), n = I(t), r = z(n);
					{
						let e = /* @__PURE__ */ j(() => V($s) ?? ""), t = /* @__PURE__ */ j(() => [["", Q("common.choose")], ...V(Zs).map((e) => [e, V(Qs)[e]?.name ?? e])]);
						us(r, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => P($s, e || null, !0)
						});
					}
					O(t), B((e) => G(n, `${e ?? ""} `), [() => Q("blocks.collection")]), W(e, t);
				};
				K(n, (e) => {
					V(Zs).length && e(r);
				});
				var i = z(n, 2), a = (e) => {
					let t = /* @__PURE__ */ j(() => V(Qs)[V($s)]);
					var n = rm(), r = L(n), i = I(r), a = R(i, !0), o = z(i, 2), s = R(o, !0), c = z(o, 2), l = I(c), u = z(l);
					O(c);
					var d = z(c, 2);
					q(d, () => v.cross, !0), O(d), O(r);
					var f = z(r, 2);
					Jr(f, 19, () => V(t).entries, (e) => e.id, (e, n, r) => {
						var i = nm(), a = I(i), o = R(a), s = z(a, 2), c = I(s), l = I(c);
						Y(l);
						var u = z(l, 2), d = I(u);
						q(d, () => v.up, !0), O(d);
						var f = z(d, 2);
						q(f, () => v.down, !0), O(f);
						var p = z(f, 2);
						q(p, () => v.cross, !0), O(p), O(u), O(c);
						var m = z(c, 2), h = (e) => {
							var t = Zp(), r = I(t), i = z(r);
							Y(i), O(t), B((e) => {
								G(r, `${e ?? ""} `), X(i, V(n).date ?? "");
							}, [() => Q("lbl.date")]), H("change", i, (e) => Ic(V($s), V(n).id, "date", e.target.value)), W(e, t);
						};
						K(m, (e) => {
							V(t).kind !== "products" && e(h);
						});
						var g = z(m, 2);
						lt(g);
						var _ = z(g, 2), y = (e) => {
							var t = Bu(), r = I(t), i = z(r);
							Y(i), O(t), B((e, t) => {
								G(r, `${e ?? ""} `), X(i, V(n).href ?? ""), Z(i, "placeholder", t);
							}, [() => Q("lbl.link"), () => Q("ph.collections.href")]), H("change", i, (e) => Ic(V($s), V(n).id, "href", e.target.value)), W(e, t);
						};
						K(_, (e) => {
							V(t).kind !== "products" && e(y);
						});
						var b = z(_, 2), x = I(b), S = I(x), C = z(S);
						O(x);
						var w = z(x, 2), T = (e) => {
							var t = Qp(), r = L(t), i = z(r, 2);
							q(i, () => v.cross, !0), O(i), B((e) => {
								Z(r, "src", V(n).image), Z(i, "title", e);
							}, [() => Q("tip.removeImage")]), H("click", i, () => Ic(V($s), V(n).id, "image", "")), W(e, t);
						};
						K(w, (e) => {
							V(n).image && e(T);
						}), O(b);
						var ee = z(b, 2), te = (e) => {
							var t = tm(), r = L(t), i = I(r), a = z(i);
							Y(a), O(r);
							var o = z(r, 2), s = I(o), c = z(s);
							Y(c), O(o);
							var l = z(o, 2), u = I(l), d = z(u);
							Y(d), O(l);
							var f = z(l, 2), p = I(f), m = z(p);
							Y(m), O(f);
							var h = z(f, 2);
							Jr(h, 17, () => V(n).colors ?? [], Wr, (e, t, r) => {
								var i = em(), a = I(i);
								Y(a);
								var o = z(a, 2), s = I(o), c = z(s);
								O(o);
								var l = z(o, 2), u = (e) => {
									var n = $p();
									B(() => Z(n, "src", V(t).image)), W(e, n);
								};
								K(l, (e) => {
									V(t).image && e(u);
								});
								var d = z(l, 2);
								q(d, () => v.cross, !0), O(d), O(i), B((e, n) => {
									X(a, V(t).name), Z(a, "placeholder", e), G(s, `${n ?? ""} `);
								}, [() => Q("ph.colorName"), () => V(t).image ? Q("ui.changeImage") : Q("ui.addImage")]), H("change", a, (e) => Hc(V($s), V(n).id, r, "name", e.target.value)), H("change", c, (e) => Wc(V($s), V(n).id, r, e)), H("click", d, () => qc(V($s), V(n).id, r)), W(e, i);
							});
							var g = z(h, 2), _ = R(g, !0);
							B((e, t, r, h, v, y, b, x, S, C, w) => {
								G(i, `${e ?? ""} `), X(a, V(n).price ?? ""), Z(o, "title", t), G(s, `${r ?? ""} `), X(c, V(n).memberPrice ?? ""), Z(l, "title", h), G(u, `${v ?? ""} `), X(d, V(n).badge ?? ""), Z(f, "title", y), G(p, `${b ?? ""} `), X(m, x), Z(m, "placeholder", S), Z(g, "title", C), G(_, w);
							}, [
								() => Q("lbl.price"),
								() => Q("tip.entry.memberPrice"),
								() => Q("lbl.memberPrice"),
								() => Q("tip.entry.badge"),
								() => Q("lbl.productBadge"),
								() => Q("tip.entry.sizes"),
								() => Q("lbl.sizes"),
								() => (V(n).sizes ?? []).join(", "),
								() => Q("ph.sizes"),
								() => Q("tip.entry.colors"),
								() => Q("ui.addColor")
							]), H("change", a, (e) => Ic(V($s), V(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), H("change", c, (e) => Ic(V($s), V(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), H("change", d, (e) => Ic(V($s), V(n).id, "badge", e.target.value)), H("change", m, (e) => Bc(V($s), V(n).id, e.target.value)), H("click", g, () => Vc(V($s), V(n).id)), W(e, t);
						};
						K(ee, (e) => {
							V(t).kind === "products" && e(te);
						}), O(s), O(i), B((e, i, a, s, c) => {
							G(o, `${e ?? ""}${V(t).kind === "products" ? V(n).price == null ? "" : ` · ${V(n).price}` : V(n).date ? ` · ${V(n).date}` : ""}`), X(l, V(n).title), Z(l, "title", i), d.disabled = V(r) === 0, f.disabled = V(r) === V(t).entries.length - 1, Z(p, "title", a), Z(g, "placeholder", s), X(g, V(n).text ?? ""), G(S, `${c ?? ""} `);
						}, [
							() => kc(V(n).title),
							() => Q("lbl.title"),
							() => Q("tip.collections.deleteEntry"),
							() => Q("ph.collections.text"),
							() => V(n).image ? Q("ui.changeImage") : Q("ui.addImage")
						]), H("change", l, (e) => Ic(V($s), V(n).id, "title", e.target.value || Q("ui.untitled"))), H("click", d, () => Lc(V($s), V(r), -1)), H("click", f, () => Lc(V($s), V(r), 1)), H("click", p, () => Rc(V($s), V(n).id)), H("change", g, (e) => Ic(V($s), V(n).id, "text", e.target.value)), H("change", C, (e) => zc(V($s), V(n).id, e)), W(e, i);
					});
					var p = z(f, 2), m = (e) => {
						var t = zu(), n = R(t, !0);
						B((e) => G(n, e), [() => Q("hint.collections.empty")]), W(e, t);
					};
					K(p, (e) => {
						V(t).entries.length || e(m);
					}), De(2), B((e, t, n, r, i, u) => {
						G(a, e), Z(o, "title", t), G(s, n), Z(c, "title", r), G(l, `${i ?? ""} `), Z(d, "title", u);
					}, [
						() => Q("ui.addEntry"),
						() => Q("tip.collections.exportCsv"),
						() => Q("ui.exportCsv"),
						() => Q("tip.collections.importCsv"),
						() => Q("ui.importCsv"),
						() => Q("tip.collections.deleteCollection")
					]), H("click", i, () => Fc(V($s))), H("click", o, () => Jc(V($s))), H("change", u, (e) => Qc(V($s), e)), H("click", d, () => Pc(V($s))), W(e, n);
				};
				K(i, (e) => {
					V($s) && V(Qs)[V($s)] && e(a);
				});
				var o = z(i, 2), s = I(o), c = z(s);
				Y(c), O(o);
				var l = z(o, 2), u = I(l);
				us(z(u), {
					get value() {
						return V(tc);
					},
					get options() {
						return nc;
					},
					onchange: (e) => P(tc, e, !0)
				}), O(l);
				var d = z(l, 2), f = R(d, !0);
				O(t), B((e, t, n, r, i) => {
					G(s, `${e ?? ""} `), Z(c, "placeholder", t), G(u, `${n ?? ""} `), d.disabled = r, G(f, i);
				}, [
					() => Q("lbl.newCollectionName"),
					() => Q("ph.collections.name"),
					() => Q("common.type"),
					() => !V(ec).trim(),
					() => Q("ui.createCollection")
				]), H("keydown", c, (e) => e.key === "Enter" && Mc()), Ei(c, () => V(ec), (e) => P(ec, e)), H("click", d, Mc), W(e, t);
			}, ie = (e) => {
				var t = dm(), n = I(t), r = (e) => {
					var t = zu(), n = R(t, !0);
					B((e) => G(n, e), [() => Q("hint.plugins.empty")]), W(e, t);
				}, i = /* @__PURE__ */ j(() => !_l().length);
				K(n, (e) => {
					V(i) && e(r);
				});
				var a = z(n, 2);
				Jr(a, 16, _l, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ j(() => ul[t]), r = /* @__PURE__ */ j(() => (V(ll)?.enabled ?? []).includes(t));
					var i = sm();
					let a;
					var o = I(i), s = I(o), c = R(s, !0), l = z(s, 2), u = (e) => {
						var t = am(), r = R(t);
						B(() => G(r, `v${V(n).version ?? ""}`)), W(e, t);
					};
					K(l, (e) => {
						V(n)?.version && e(u);
					});
					var d = z(l, 2), f = I(d), p = I(f);
					Y(p);
					var m = z(p);
					O(f);
					var h = z(f, 2);
					q(h, () => v.cross, !0), O(h), O(d), O(o);
					var g = z(o, 2), _ = (e) => {
						var t = om(), r = R(t, !0);
						B((e) => G(r, e), [() => V(n).errors.join("; ")]), W(e, t);
					}, y = (e) => {
						var t = om(), r = R(t, !0);
						B((e) => G(r, e), [() => Q("plugin.engineMismatch", {
							required: V(n).requiresEngine,
							current: V(dl)
						})]), W(e, t);
					}, b = (e) => {
						var t = om(), r = R(t, !0);
						B((e) => G(r, e), [() => Q("plugin.cspNeeded", { list: wl(V(n).csp).join(", ") })]), W(e, t);
					}, x = /* @__PURE__ */ j(() => V(n)?.csp && wl(V(n).csp).length);
					K(g, (e) => {
						V(n)?.errors?.length ? e(_) : V(n) && !V(n).satisfied ? e(y, 1) : V(x) && e(b, 2);
					});
					var S = z(g, 2), C = (e) => {
						var t = zu(), r = R(t, !0);
						B((e) => G(r, e), [() => Q("plugin.languages", { list: V(n).languages.map((e) => e.name).join(", ") })]), W(e, t);
					};
					K(S, (e) => {
						V(n)?.languages?.length && e(C);
					}), O(i), B((e, t, o, s, l) => {
						a = J(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": V(n)?.errors?.length }), G(c, e), Z(f, "title", t), Si(p, V(r)), p.disabled = o, G(m, ` ${s ?? ""}`), Z(h, "title", l);
					}, [
						() => V(n)?.names?.[Wi()] ?? V(n)?.name ?? t,
						() => V(r) ? Q("tip.plugins.on") : Q("tip.plugins.off"),
						() => !!V(n)?.errors?.length,
						() => V(r) ? Q("ui.on") : Q("ui.off"),
						() => Q("tip.plugins.remove")
					]), H("change", p, (e) => jl(t, e.target.checked)), H("click", h, () => Nl(t)), W(e, i);
				});
				var o = z(a, 2), s = (e) => {
					var t = lm(), n = z(L(t), 2), r = R(n, !0);
					Jr(z(n, 2), 16, () => V(ml), (e) => e, (e, t) => {
						var n = cm(), r = I(n), i = I(r), a = R(i, !0), o = z(i, 2), s = (e) => {
							var n = am(), r = R(n);
							B(() => G(r, `v${ul[t].version ?? ""}`)), W(e, n);
						};
						K(o, (e) => {
							ul[t]?.version && e(s);
						});
						var c = z(o, 2), l = I(c);
						q(l, () => v.right, !0), O(l), O(c), O(r), O(n), B((e, t) => {
							G(a, e), Z(l, "title", t);
						}, [() => ul[t]?.names?.[Wi()] ?? ul[t]?.name ?? t, () => Q("tip.plugins.addFound")]), H("click", l, () => Fl(t)), W(e, n);
					}), B((e) => G(r, e), [() => Q("hint.plugins.found")]), W(e, t);
				};
				K(o, (e) => {
					V(ml).length && e(s);
				});
				var c = z(o, 2), l = (e) => {
					var t = Nr(), n = L(t), r = (e) => {
						var t = zu(), n = R(t, !0);
						B((e) => G(n, e), [() => Q("hint.plugins.autoDiscover")]), W(e, t);
					};
					K(n, (e) => {
						V(ml).length || e(r);
					}), W(e, t);
				}, u = (e) => {
					var t = um(), n = z(L(t), 2);
					Y(n);
					var r = z(n, 2), i = R(r, !0), a = z(r, 2), o = (e) => {
						var t = om(), n = R(t, !0);
						B(() => G(n, V(pl))), W(e, t);
					};
					K(a, (e) => {
						V(pl) && e(o);
					}), B((e, t, a) => {
						Z(n, "placeholder", e), r.disabled = t, G(i, a);
					}, [
						() => Q("ph.plugins.folder"),
						() => !V(fl).trim(),
						() => Q("ui.addPlugin")
					]), H("keydown", n, (e) => e.key === "Enter" && Pl()), Ei(n, () => V(fl), (e) => P(fl, e)), H("click", r, Pl), W(e, t);
				};
				K(c, (e) => {
					V(gl) === "ok" ? e(l) : e(u, -1);
				}), O(t), W(e, t);
			}, ae = (e) => {
				var t = Hp(), n = I(t), r = (e) => {
					var t = zu(), n = R(t, !0);
					B((e) => G(n, e), [() => Q("hint.history.loading")]), W(e, t);
				}, i = (e) => {
					var t = Wf(), n = L(t), r = (e) => {
						var t = zu(), n = R(t, !0);
						B(() => G(n, V(Ti))), W(e, t);
					};
					K(n, (e) => {
						V(Ti) && e(r);
					});
					var i = z(n, 2), a = (e) => {
						var t = pm(), n = L(t), r = R(n, !0);
						Jr(z(n, 2), 19, () => V(wi), (e) => e.sha, (e, t, n) => {
							var r = fm();
							let i;
							var a = I(r), o = R(a, !0), s = R(z(a, 2));
							O(r), B((e) => {
								i = J(r, 1, "history-row svelte-1n46o8q", null, i, { head: V(n) === 0 }), Z(a, "title", V(t).sha), G(o, V(t).message), G(s, `${V(t).author ?? ""}${e ?? ""}`);
							}, [() => V(t).date ? ` · ${ki.format(new Date(V(t).date))}` : ""]), W(e, r);
						}), B((e, t) => {
							n.disabled = V(Di) || !V(oe)?.allowed, Z(n, "title", e), G(r, t);
						}, [() => V(oe)?.allowed ? Q("tip.history.revert") : Q("tip.history.needsAccess"), () => Q("ui.revertLast")]), H("click", n, Mi), W(e, t);
					};
					K(i, (e) => {
						V(wi).length > 0 && e(a);
					}), W(e, t);
				};
				K(n, (e) => {
					V(wi) === null ? e(r) : e(i, -1);
				}), O(t), W(e, t);
			}, le = (e) => {
				var t = Hp(), n = I(t), r = (e) => {
					var t = zu(), n = R(t, !0);
					B((e) => G(n, e), [() => Q("update.checking")]), W(e, t);
				}, i = (e) => {
					var t = mm(), n = L(t), r = R(n, !0), i = z(n, 2), a = R(i, !0);
					B((e) => {
						G(r, V(Li)), G(a, e);
					}, [() => Q("update.retry")]), H("click", i, Bi), W(e, t);
				}, a = (e) => {
					var t = Tm(), n = L(t), r = I(n), i = R(r, !0), a = z(r, 2), o = (e) => {
						var t = hm(), n = L(t);
						q(n, () => v.right, !0), O(n);
						var r = R(z(n, 2), !0);
						B(() => G(r, V(Ii).target)), W(e, t);
					};
					K(a, (e) => {
						V(Ii).upToDate || e(o);
					}), O(n);
					var s = z(n, 2), c = (e) => {
						var t = zu(), n = R(t, !0);
						B((e) => G(n, e), [() => Q("update.upToDate")]), W(e, t);
					}, l = (e) => {
						var t = wm(), n = L(t), r = R(n, !0), i = z(n, 2), a = (e) => {
							var t = gm(), n = I(t), r = R(n, !0), i = z(n, 2), a = R(I(i), !0);
							O(i), O(t), B((e) => {
								G(r, e), G(a, V(Ii).notes);
							}, [() => Q("update.aboutVersion", { target: V(Ii).target })]), W(e, t);
						};
						K(i, (e) => {
							V(Ii).notes && e(a);
						});
						var o = z(i, 2), s = (e) => {
							var t = _m(), n = I(t), r = I(n);
							q(r, () => v.warn, !0), O(r);
							var i = z(r);
							O(n);
							var a = z(n, 2), o = R(I(a), !0);
							O(a), O(t), B((e, t) => {
								Z(n, "title", e), G(i, ` ${t ?? ""}`), G(o, V(Ii).headers.upstream);
							}, [() => Q("update.headersManual"), () => Q("update.headersTitle")]), W(e, t);
						};
						K(o, (e) => {
							V(Ii).headers?.upstream && e(s);
						});
						var c = z(o, 2);
						Jr(c, 17, () => V(Ii).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = ym(), r = I(n), i = R(r, !0), a = z(r, 2), o = I(a), s = (e) => {
								var t = vm(), n = R(t, !0);
								B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
							};
							K(o, (e) => {
								V(t).action === "delete" && e(s);
							});
							var c = z(o, 2);
							q(c, () => v.warn, !0), O(c), O(a), O(n), B((e) => {
								Z(r, "title", V(t).path), G(i, V(t).path), Z(c, "title", e);
							}, [() => Q(`update.conflict.${V(t).conflict}`)]), W(e, n);
						});
						var l = z(c, 2), u = I(l), d = R(u), f = z(u, 2);
						Jr(f, 21, () => V(Ii).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = bm(), r = I(n), i = R(r, !0), a = z(r, 2), o = (e) => {
								var t = vm(), n = R(t, !0);
								B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
							};
							K(a, (e) => {
								V(t).action === "delete" && e(o);
							}), O(n), B(() => {
								Z(r, "title", V(t).path), G(i, V(t).path);
							}), W(e, n);
						}), O(f), O(l);
						var p = z(l, 2), m = (e) => {
							var t = Cm(), n = L(t), r = I(n), i = R(r, !0), a = R(z(r, 2), !0);
							O(n), Jr(z(n, 2), 17, () => V(Ii).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = Sm(), r = I(n);
								let i;
								var a = R(r, !0), o = z(r, 2), s = I(o), c = (e) => {
									var t = vm(), n = R(t, !0);
									B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
								};
								K(s, (e) => {
									V(t).action === "delete" && e(c);
								});
								var l = z(s, 2), u = (e) => {
									var n = xm();
									q(n, () => v.warn, !0), O(n), B((e) => Z(n, "title", e), [() => Q(`update.conflict.${V(t).conflict}`)]), W(e, n);
								};
								K(l, (e) => {
									V(t).conflict && e(u);
								});
								var d = z(l, 2);
								Y(d), O(o), O(n), B((e, n, o, s) => {
									i = J(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), Z(r, "title", V(t).path), G(a, V(t).path), Si(d, n), Z(d, "title", o), Z(d, "aria-label", s);
								}, [
									() => V(zi).has(V(t).path),
									() => V(zi).has(V(t).path),
									() => Q("update.keepMine.title"),
									() => Q("update.keepMine")
								]), H("change", d, () => Vi(V(t).path)), W(e, n);
							}), B((e, t) => {
								G(i, e), G(a, t);
							}, [() => Q("update.optionalTitle"), () => Q("update.keepMine")]), W(e, t);
						}, h = /* @__PURE__ */ j(() => V(Ii).changes.some((e) => !e.atom));
						K(p, (e) => {
							V(h) && e(m);
						});
						var g = z(p, 2), _ = R(g, !0);
						B((e, t, n, i, a, o) => {
							G(r, e), Z(u, "title", t), G(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = V(Ri) || !V(oe)?.allowed, Z(g, "title", a), G(_, o);
						}, [
							() => Q("update.summary", {
								writes: V(Ii).changes.filter((e) => e.action === "write").length,
								deletes: V(Ii).changes.filter((e) => e.action === "delete").length
							}),
							() => Q("update.atomGroup.title"),
							() => Q("update.atomTitle"),
							() => V(Ii).changes.filter((e) => e.atom).length,
							() => V(oe)?.allowed ? Q("update.run.title") : Q("tip.history.needsAccess"),
							() => Q("update.run", { target: V(Ii).target })
						]), H("click", g, Hi), W(e, t);
					};
					K(s, (e) => {
						V(Ii).upToDate ? e(c) : e(l, -1);
					}), B((e) => G(i, e), [() => Q("update.current", { version: V(Ii).current })]), W(e, t);
				};
				K(n, (e) => {
					V(Ri) && !V(Ii) ? e(r) : V(Li) ? e(i, 1) : V(Ii) && e(a, 2);
				}), O(t), W(e, t);
			};
			K(b, (e) => {
				V(kt) === "pages" ? e(x) : V(kt) === "nav" ? e(S, 1) : V(kt) === "site" ? e(w, 2) : V(kt) === "theme" ? e(ee, 3) : V(kt) === "blocks" ? e(te, 4) : V(kt) === "grid" ? e(ne, 5) : V(kt) === "properties" ? e(re, 6) : V(kt) === "footer" ? e(E, 7) : V(kt) === "collections" ? e(D, 8) : V(kt) === "plugins" ? e(ie, 9) : V(kt) === "history" ? e(ae, 10) : V(kt) === "update" && e(le, 11);
			}), O(t), Ai(t, (e) => P(gh, e), () => V(gh)), B((e) => {
				i = J(t, 1, "panel svelte-1n46o8q", null, i, { hidden: !V(ce) }), Z(l, "title", e), G(g, Mt[V(kt)]);
			}, [() => Nt[V(kt)]?.map((e) => Q(e)).join("\n")]), W(e, t);
		};
		K(ee, (e) => {
			V(kt) && e(te);
		});
		var ne = z(ee, 2);
		let re;
		var E = I(ne), D = I(E);
		Ai(D, (e) => P(ae, e), () => V(ae)), O(E), O(ne), Ai(ne, (e) => P(xe, e), () => V(xe)), O(t), B((e, t) => {
			o = J(i, 1, "rail svelte-1n46o8q", null, o, { hidden: !V(ce) }), b = J(_, 1, "rail-gear svelte-1n46o8q", null, b, { active: V(ea) }), Z(_, "title", e), re = J(ne, 1, "frame-wrap svelte-1n46o8q", null, re, {
				mobile: V(be) === "mobile",
				pan: V(Fe),
				fold: V(ke) > 0
			}), _i(E, `width:${V(Ne) ?? ""}px; height:${V(Pe) ?? ""}px`), Z(D, "title", t), Z(D, "src", `/?page=${V(T)}&preview=1`), _i(D, `width:${V(Oe) ?? ""}px; height:${V(Me) ?? ""}px; transform:scale(${V(Ae) ?? ""}); transform-origin:top left`);
		}, [() => Q("settings.title"), () => Q("ui.previewTitle")]), H("click", _, () => P(ea, !V(ea))), Cr("load", D, Yi), xr(D), W(e, t);
	}, e_ = (e) => {
		var t = Om(), n = R(t, !0);
		B((e) => G(n, e), [() => Q("ui.loading")]), W(e, t);
	};
	K(Qg, (e) => {
		V(w) ? e($g) : e(e_, -1);
	});
	var t_ = z(Qg, 2), n_ = (e) => {
		hs(e, {
			get image() {
				return V(Ya);
			},
			onapply: Za,
			oncancel: () => P(Ya, null)
		});
	};
	K(t_, (e) => {
		V(Ya) && e(n_);
	});
	var r_ = z(t_, 2), i_ = (e) => {
		var t = Am(), n = I(t), r = I(n), i = R(r, !0), a = z(r, 2);
		Jr(a, 16, () => V(mt).lines, (e) => e, (e, t) => {
			var n = km(), r = R(n, !0);
			B(() => G(r, t)), W(e, n);
		});
		var o = z(a, 2), s = (e) => {
			var t = Hu();
			Y(t), ct(t, !0), B(() => Z(t, "placeholder", V(mt).placeholder)), H("keydown", t, (e) => e.key === "Enter" && V(mt).value.trim() && _t(!0)), Ei(t, () => V(mt).value, (e) => V(mt).value = e), W(e, t);
		};
		K(o, (e) => {
			V(mt).prompt && e(s);
		});
		var c = z(o, 2), l = I(c), u = R(l, !0), d = z(l, 2), f = R(d, !0);
		O(c), O(n), O(t), B(() => {
			G(i, V(mt).title), G(u, V(mt).cancelLabel), G(f, V(mt).okLabel);
		}), H("pointerdown", t, (e) => vt = e.target === e.currentTarget), H("click", t, (e) => vt && e.target === e.currentTarget && _t(!1)), H("click", l, () => _t(!1)), H("click", d, () => _t(!0)), W(e, t);
	};
	K(r_, (e) => {
		V(mt) && e(i_);
	});
	var a_ = z(r_, 2), o_ = (e) => {
		var t = jm(), n = I(t), r = I(n), i = R(r, !0), a = z(r, 2), o = R(a, !0), s = z(a, 2), c = I(s), l = z(c);
		Y(l), O(s);
		var u = z(s, 2), d = I(u), f = z(d);
		{
			let e = /* @__PURE__ */ j(() => Q("setup.accentPick"));
			ha(f, {
				get value() {
					return V(xt);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => P(xt, e, !0)
			});
		}
		O(u);
		var p = z(u, 2), m = I(p), h = z(m);
		{
			let e = /* @__PURE__ */ j(() => Q("setup.bgLabel"));
			ha(h, {
				get value() {
					return V(St);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => P(St, e, !0)
			});
		}
		O(p);
		var g = z(p, 2), _ = R(g, !0), v = z(g, 2), y = I(v), b = R(y, !0), x = z(y, 2), S = R(x, !0);
		O(v), O(n), O(t), B((e, t, n, r, a, s, u, f, p, h) => {
			G(i, e), G(o, t), G(c, `${n ?? ""} `), Z(l, "placeholder", r), G(d, `${a ?? ""} `), G(m, `${s ?? ""} `), G(_, u), G(b, f), x.disabled = p, G(S, h);
		}, [
			() => Q("setup.title"),
			() => Q("setup.intro"),
			() => Q("setup.nameLabel"),
			() => Q("ph.setup.name"),
			() => Q("setup.accentLabel"),
			() => Q("setup.bgLabel"),
			() => Q("setup.outro"),
			() => Q("setup.skip"),
			() => !V(bt).trim(),
			() => Q("setup.start")
		]), H("keydown", l, (e) => e.key === "Enter" && wt()), Ei(l, () => V(bt), (e) => P(bt, e)), H("click", y, Ct), H("click", x, wt), W(e, t);
	};
	K(a_, (e) => {
		V(yt) && e(o_);
	});
	var s_ = z(a_, 2), c_ = (e) => {
		var t = Mm();
		let n;
		var r = I(t), i = R(r, !0), a = z(r, 2);
		O(t), B((e) => {
			n = J(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: V(ne) === "ok",
				error: V(ne) === "error"
			}), G(i, V(te)), Z(a, "title", e);
		}, [() => Q("ui.close")]), H("click", a, () => E("")), W(e, t);
	};
	K(s_, (e) => {
		V(te) && e(c_);
	}), O(Ig);
	var l_ = z(Ig, 2), u_ = (e) => {
		var t = Nm(), n = I(t), r = I(n), i = R(r, !0), o = z(r, 2);
		q(o, () => v.cross, !0), O(o), O(n);
		var s = z(n, 2), c = I(s);
		a(c), O(s), O(t), B((e, n) => {
			_i(t, `left: ${V(Gt).left ?? ""}px; top: ${V(Gt).top ?? ""}px`), G(i, e), Z(o, "title", n);
		}, [() => Q("blocks.suffix", { label: Ln[V(M).type] ?? V(M).type }), () => Q("tip.closeEsc")]), H("click", o, () => P(Gt, null)), W(e, t);
	};
	K(l_, (e) => {
		V(Gt) && V(M) && e(u_);
	}), B(() => Bg = J(zg, 1, "topbar svelte-1n46o8q", null, Bg, { hidden: !V(ce) })), W(e, Fg), Je();
}
//#endregion
//#region src/main.js
wr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await qi();
var Im = zr(Fm, { target: document.getElementById("urd-admin") });
//#endregion
export { Im as default };
