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
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, ee = 1 << 19, te = 1 << 20, w = 1 << 25, ne = 1 << 21, re = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol("component"), se = Symbol("legacy props"), T = Symbol(""), ce = Symbol("attributes"), le = Symbol("class"), ue = Symbol("style"), de = Symbol("text"), E = Symbol("form reset"), fe = new class extends Error {
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
function D(e) {
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
function He() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ue() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var We = [];
function Ge(e, t = !1, n = !1) {
	return Ke(e, /* @__PURE__ */ new Map(), "", We, null, n);
}
function Ke(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ke(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ke(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return t.getTime(), structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ke(t.toJSON(), n, r, i, t);
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
var qe = null;
function Je(e) {
	qe = e;
}
function Ye(e, t = !1, n) {
	qe = {
		p: qe,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Gn,
		l: null
	};
}
function Xe(e) {
	var t = qe, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) bn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, qe = t.p, Ze(e);
}
function Ze(e = {}) {
	return i(e, oe, { value: !0 }), e;
}
function Qe() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var $e = [];
function O() {
	var e = $e;
	$e = [], p(e);
}
function et(e) {
	if ($e.length === 0 && !kt) {
		var t = $e;
		queueMicrotask(() => {
			t === $e && O();
		});
	}
	$e.push(e);
}
function tt() {
	for (; $e.length > 0;) O();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var k = ~(_ | v | g);
function nt(e, t) {
	e.f = e.f & k | t;
}
function rt(e) {
	e.f & 512 || e.deps === null ? nt(e, g) : nt(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function it(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), nt(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function at(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, et(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function ot(e) {
	Se && /* @__PURE__ */ sn(e) !== null && ln(e);
}
var st = !1;
function ct() {
	st || (st = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[E]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function lt(e) {
	var t = Hn, n = Gn;
	Wn(null), Kn(null);
	try {
		return e();
	} finally {
		Wn(t), Kn(n);
	}
}
function ut(e, t, n, r = n) {
	e.addEventListener(t, () => lt(n));
	let i = e[E];
	e[E] = i ? () => {
		i(), r(!0);
	} : () => r(!0), ct();
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function dt(e, t, n, r) {
	let i = Qe() ? ht : vt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Gn, c = ft(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				pn(e, s);
			}
			pt();
		}
	}
	var d = mt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ _t(e))).then(u).catch((e) => pn(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), pt();
	}) : f();
}
function ft() {
	var e = Gn, t = Hn, n = qe, r = Tt;
	return function(i = !0) {
		Kn(e), Wn(t), Je(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function pt(e = !0) {
	Kn(null), Wn(null), Je(null), e && Tt?.deactivate();
}
function mt() {
	var e = Gn, t = e.b, n = Tt, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ht(e) {
	var t = 2 | _;
	return Gn !== null && (Gn.f |= ee), {
		ctx: qe,
		deps: null,
		effects: null,
		equals: Ae,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: he,
		wv: 0,
		parent: Gn,
		ac: null
	};
}
var gt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function _t(e, t, n) {
	let r = Gn;
	r === null && Ne();
	var i = void 0, a = Kt(he), o = !Hn, s = /* @__PURE__ */ new Set();
	return Cn(() => {
		var t = Gn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== fe && n.reject(e);
			}).finally(pt);
		} catch (e) {
			n.reject(e), pt();
		}
		var c = Tt;
		if (o) {
			if (t.f & 32768) var l = mt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(gt);
			else for (let e of s.values()) e.reject(gt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== gt && (c.activate(), t ? (a.f |= ie, Xt(a, t)) : (a.f & 8388608 && (a.f ^= ie), Xt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), vn(() => {
		for (let e of s) e.reject(gt);
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
	let t = /* @__PURE__ */ ht(e);
	return Jn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	let t = /* @__PURE__ */ ht(e);
	return t.equals = Me, t;
}
function yt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) An(t[n]);
	}
}
function bt(e) {
	var t, n = Gn, r = e.parent;
	if (!Bn && r !== null && e.v !== he && r.f & 24576) return ye(), e.v;
	Kn(r);
	try {
		yt(e), t = or(e);
	} finally {
		Kn(n);
	}
	return t;
}
function xt(e) {
	var t = bt(e);
	if (!e.equals(t) && (e.wv = rr(), (!Tt?.is_fork || e.deps === null) && (Tt === null ? e.v = t : (Tt.capture(e, t, !0), Et?.capture(e, t, !0)), e.deps === null))) {
		nt(e, g);
		return;
	}
	Bn || (Dt === null ? rt(e) : (_n() || Tt?.is_fork) && Dt.set(e, t));
}
function St(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && lt(() => {
		t.ac.abort(fe), t.ac = null;
	}), t.fn !== null && (t.teardown = f), lr(t, 0), On(t));
}
function Ct(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var wt = null, Tt = null, Et = null, Dt = null, Ot = null, kt = !1, At = !1, jt = null, Mt = null, Nt = 0, Pt = 1, Ft = class e {
	id = Pt++;
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
		wt === null ? wt = this : (wt.#n = this, this.#t = wt), wt = this;
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
		for (let e of this.#u) this.#d.delete(e), nt(e, _), this.schedule(e);
		for (let e of this.#d) nt(e, v), this.schedule(e);
		this.apply();
		for (var t = jt = [], n = [], r = Mt = []; this.#c.length > 0;) {
			Nt++ > 1e3 && (this.#S(), Lt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw Ht(e), this.#h() || this.discard(), t;
			}
		}
		if (Tt = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (jt = null, Mt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Vt(e, t);
			r.length > 0 && Tt.#_();
			return;
		}
		let a = this.#y();
		if (a) {
			this.#x(n), this.#x(t), a.#b(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Et = this, zt(n), zt(t), Et = null, this.#s?.resolve();
		var o = Tt;
		if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
			if (o !== null) {
				for (let e of this.#c) o.#c.push(e);
				this.#c = [];
			} else o = this;
		}
		o !== null && (Wt.clear(), o.#_());
	}
	#v(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : ir(r) && (i & 16 && this.#d.add(r), ur(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), nt(i, _), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), Tt = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) it(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== he && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Dt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		Tt = this;
	}
	deactivate() {
		Tt = null, Dt = null;
	}
	flush() {
		try {
			At = !0, Tt = this, this.#_();
		} finally {
			Nt = 0, Ot = null, jt = null, Mt = null, At = !1, Tt = null, Dt = null, Wt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(gt);
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
		if (Tt === null) {
			let t = Tt = new e();
			!At && !kt && et(() => {
				t.#e || t.flush();
			});
		}
		return Tt;
	}
	apply() {
		Dt = null;
	}
	schedule(e) {
		if (Ot = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? wt = e : t.#t = e, this.linked = !1;
		}
	}
};
function It(e) {
	var t = kt;
	kt = !0;
	try {
		var n;
		for (e && (Tt !== null && !Tt.is_fork && Tt.flush(), n = e());;) {
			if (tt(), Tt === null) return n;
			Tt.flush();
		}
	} finally {
		kt = t;
	}
}
function Lt() {
	try {
		Re();
	} catch (e) {
		pn(e, Ot);
	}
}
var Rt = null;
function zt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ir(r) && (Rt = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Mn(r), Rt?.size > 0)) {
				Wt.clear();
				for (let e of Rt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Rt.has(n) && (Rt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
					}
				}
				Rt.clear();
			}
		}
		Rt = null;
	}
}
function Bt(e) {
	Tt.schedule(e);
}
function Vt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), nt(e, g);
		for (var n = e.first; n !== null;) Vt(n, t), n = n.next;
	}
}
function Ht(e) {
	nt(e, g);
	for (var t = e.first; t !== null;) Ht(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Ut = /* @__PURE__ */ new Set(), Wt = /* @__PURE__ */ new Map(), Gt = !1;
function Kt(e, t) {
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
function j(e, t) {
	let n = Kt(e, t);
	return Jn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function qt(e, t = !1, n = !0) {
	let r = Kt(e);
	return t || (r.equals = Me), r;
}
function M(e, t, n = !1) {
	return Hn !== null && (!Un || Hn.f & 131072) && Qe() && Hn.f & 4325394 && (qn === null || !qn.has(e)) && He(), Xt(e, n ? $t(t) : t, Mt);
}
var Jt = null, Yt = 0;
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Bn ? Wt.set(e, t) : Wt.has(e) || Wt.set(e, e.v);
		var r = Ft.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && bt(t), Dt === null && rt(t);
		}
		e.wv = rr(), Jt = null, Yt = 0, Qt(e, _, n), Jt = null, Qe() && Gn !== null && Gn.f & 1024 && !(Gn.f & 96) && (Zn === null ? Qn([e]) : Zn.push(e)), !r.is_fork && Ut.size > 0 && !Gt && Zt();
	}
	return t;
}
function Zt() {
	Gt = !1;
	for (let e of Ut) {
		e.f & 1024 && nt(e, v);
		let t;
		try {
			t = ir(e);
		} catch {
			t = !0;
		}
		t && ur(e);
	}
	Ut.clear();
}
function N(e) {
	M(e, e.v + 1);
}
function Qt(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = Qe(), a = r.length;
		if (Yt += a, Yt > 1e5 && Jt === null && (Jt = /* @__PURE__ */ new Set()), Jt !== null) {
			if (Jt.has(e)) return;
			Jt.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== Gn) {
				var l = (c & _) === 0;
				if (l && nt(s, t), c & 131072) Ut.add(s);
				else if (c & 2) {
					var u = s;
					Dt?.delete(u), Qt(u, v, n);
				} else if (l) {
					var d = s;
					c & 16 && Rt !== null && Rt.add(d), n === null ? Bt(d) : n.push(d);
				}
			}
		}
	}
}
function $t(t) {
	if (typeof t != "object" || !t || ae in t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ j(0), u = null, d = tr, f = (e) => {
		if (tr === d) return e();
		var t = Hn, n = tr;
		Wn(null), nr(d);
		var r = e();
		return Wn(t), nr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ j(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Be();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ j(n.value, u);
				return r.set(t, e), e;
			}) : M(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ j(he, u));
					r.set(t, e), N(o);
				}
			} else M(n, he), N(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ j($t(s ? e[n] : he), u)), r.set(n, o)), o !== void 0) {
				var c = B(o);
				return c === he ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var n = Reflect.getOwnPropertyDescriptor(e, t), i = r.get(t);
			if (i !== void 0) {
				var a = B(i);
				if (a === he) return;
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
			var n = r.get(t), i = n !== void 0 && n.v !== he || Reflect.has(e, t);
			return (n !== void 0 || Gn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ j(i ? $t(e[t]) : he, u)), r.set(t, n)), B(n) === he) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ j(he, u)), r.set(d + "", p)) : M(p, he);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ j(void 0, u)), M(c, $t(n)), r.set(t, c));
			else {
				l = c.v !== he;
				var m = f(() => $t(n));
				M(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && M(g, _ + 1);
				}
				N(o);
			}
			return !0;
		},
		ownKeys(e) {
			B(o);
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
		nn = a(t, "firstChild").get, rn = a(t, "nextSibling").get, u(e) && (e[le] = void 0, e[ce] = null, e[ue] = void 0, e.__e = void 0), u(n) && (n[de] = void 0);
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
function P(e, t) {
	if (!Se) return /* @__PURE__ */ sn(e);
	var n = /* @__PURE__ */ sn(we);
	if (n === null) n = we.appendChild(on());
	else if (t && n.nodeType !== 3) {
		var r = on();
		return n?.before(r), Te(r), r;
	}
	return t && dn(n), Te(n), n;
}
function F(e, t = !1) {
	if (!Se) {
		var n = /* @__PURE__ */ sn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ cn(n) : n;
	}
	if (t) {
		if (we?.nodeType !== 3) {
			var r = on();
			return we?.before(r), Te(r), r;
		}
		dn(we);
	}
	return we;
}
function I(e, t = !1) {
	if (!Se) return /* @__PURE__ */ sn(e);
	var n = P(e, t);
	return D(e), n;
}
function L(e, t = 1, n = !1) {
	let r = Se ? we : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ cn(r);
	if (!Se) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = on();
			return r === null ? i?.after(a) : r.before(a), Te(a), a;
		}
		dn(r);
	}
	return Te(r), r;
}
function ln(e) {
	e.textContent = "";
}
function R() {
	return !1;
}
function un(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function dn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function fn(e) {
	var t = Gn;
	if (t === null) return Hn.f |= ie, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	pn(e, t);
}
function pn(e, t) {
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
function mn(e) {
	Gn === null && (Hn === null && Le(e), Ie()), Bn && Fe(e);
}
function hn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function gn(e, t) {
	var n = Gn;
	n !== null && n.f & 8192 && (e |= y);
	var r = {
		ctx: qe,
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
	Tt?.register_created_effect(r);
	var i = r;
	if (e & 4) jt === null ? Ft.ensure().schedule(r) : jt.push(r);
	else if (t !== null) {
		try {
			ur(r);
		} catch (e) {
			throw An(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && (i.parent = n, n !== null && hn(i, n), Hn !== null && Hn.f & 2 && !(e & 64))) {
		var a = Hn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function _n() {
	return Hn !== null && !Un;
}
function vn(e) {
	let t = gn(8, null);
	return nt(t, g), t.teardown = e, t;
}
function yn(e) {
	mn("$effect");
	var t = Gn.f;
	if (!Hn && t & 32 && qe !== null && !qe.i) {
		var n = qe;
		(n.e ??= []).push(e);
	} else return bn(e);
}
function bn(e) {
	return gn(4 | te, e);
}
function xn(e) {
	Ft.ensure();
	let t = gn(64 | ee, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Nn(t, () => {
			An(t), n(void 0);
		}) : (An(t), n(void 0));
	});
}
function Sn(e) {
	return gn(4, e);
}
function Cn(e) {
	return gn(re | ee, e);
}
function wn(e, t = 0) {
	return gn(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	dt(r, t, n, (t) => {
		gn(8, () => {
			e(...t.map(B));
		});
	});
}
function Tn(e, t = 0) {
	return gn(16 | t, e);
}
function En(e) {
	return gn(32 | ee, e);
}
function Dn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = Bn, r = Hn;
		Vn(!0), Wn(null);
		try {
			t.call(null);
		} catch (t) {
			pn(t, e.parent);
		} finally {
			Vn(n), Wn(r);
		}
	}
}
function On(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && lt(() => {
			e.abort(fe);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : An(n, t), n = r;
	}
}
function kn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || An(t), t = n;
	}
}
function An(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (jn(e.nodes.start, e.nodes.end), n = !0), e.f |= S, On(e, t && !n), lr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Dn(e), e.f ^= S, e.f |= b;
	var i = e.parent;
	i !== null && i.first !== null && Mn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function jn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ cn(e);
		e.remove(), e = n;
	}
}
function Mn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Nn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Pn(e, r, !0);
	var i = () => {
		n && An(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Pn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= y;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Pn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Fn(e) {
	e.f &= -257, In(e, !0);
}
function In(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= y, e.f & 1024 || (nt(e, _), Ft.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			In(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Ln(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ cn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Rn = null, zn = !1, Bn = !1;
function Vn(e) {
	Bn = e;
}
var Hn = null, Un = !1;
function Wn(e) {
	Hn = e;
}
var Gn = null;
function Kn(e) {
	Gn = e;
}
var qn = null;
function Jn(e) {
	Hn !== null && (Hn.f & 2097152 || Hn.f & 2) && (qn ??= /* @__PURE__ */ new Set()).add(e);
}
var Yn = null, Xn = 0, Zn = null;
function Qn(e) {
	Zn = e;
}
var $n = 1, er = 0, tr = er;
function nr(e) {
	tr = e;
}
function rr() {
	return ++$n;
}
function ir(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ir(a) && xt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Dt === null && nt(e, g);
	}
	return !1;
}
function ar(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(qn !== null && qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ar(a, t, !1) : t === a && (n ? nt(a, _) : a.f & 1024 && nt(a, v), Bt(a));
	}
}
function or(e) {
	var t = Yn, n = Xn, r = Zn, i = Hn, a = qn, o = qe, s = Un, c = tr, l = e.f;
	Yn = null, Xn = 0, Zn = null, Hn = l & 96 ? null : e, qn = null, Je(e.ctx), Un = !1, tr = ++er, e.ac !== null && (lt(() => {
		e.ac.abort(fe);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= x;
		var f = sr(e);
		if (Qe() && Zn !== null && !Un && f !== null && !(e.f & 6146)) for (var p = 0; p < Zn.length; p++) ar(Zn[p], e);
		if (i !== null && i !== e) {
			if (er++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = er;
			if (t !== null) for (let e of t) e.rv = er;
			Zn !== null && (r === null ? r = Zn : r.push(...Zn));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (t) {
		return sr(e), fn(t);
	} finally {
		e.f ^= ne, Yn = t, Xn = n, Zn = r, Hn = i, qn = a, Je(o), Un = s, tr = c;
	}
}
function sr(e) {
	var t = e.deps, n = Tt?.is_fork;
	if (Yn !== null) {
		var r;
		if (n || lr(e, Xn), t !== null && Xn > 0) for (t.length = Xn + Yn.length, r = 0; r < Yn.length; r++) t[Xn + r] = Yn[r];
		else e.deps = t = Yn;
		if (_n() && e.f & 512) for (r = Xn; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && Xn < t.length && (lr(e, Xn), t.length = Xn);
	return t;
}
function cr(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Yn === null || !n.call(Yn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512), s.v !== he && rt(s), s.ac !== null && lt(() => {
			s.ac.abort(fe), s.ac = null, nt(s, _);
		}), St(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		nt(e, g);
		var n = Gn, r = zn;
		Gn = e, zn = !(t & 96);
		try {
			t & 16777232 ? kn(e) : On(e), Dn(e);
			var i = or(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = $n;
		} finally {
			zn = r, Gn = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), It();
}
function B(e) {
	var t = !!(e.f & 2);
	if (Rn?.add(e), Hn !== null && !Un && !(Gn !== null && Gn.f & 16384) && (qn === null || !qn.has(e))) {
		var r = Hn.deps;
		if (Hn.f & 2097152) e.rv < er && (e.rv = er, Yn === null && r !== null && r[Xn] === e ? Xn++ : Yn === null ? Yn = [e] : Yn.push(e));
		else {
			Hn.deps ??= [], n.call(Hn.deps, e) || Hn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Hn] : n.call(i, Hn) || i.push(Hn);
		}
	}
	if (Bn && Wt.has(e)) return Wt.get(e);
	if (t) {
		var a = e;
		if (Bn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = bt(a)), Wt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Un && Hn !== null && (zn || !!(Hn.f & 512)), c = (a.f & x) === 0;
		ir(a) && (s && (a.f |= 512), xt(a)), s && !c && (Ct(a), fr(a));
	}
	if (Dt?.has(e)) return Dt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Ct(t), fr(t));
}
function pr(e) {
	if (e.v === he) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Wt.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Un;
	try {
		return Un = !0, e();
	} finally {
		Un = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var hr = ["touchstart", "touchmove"];
function gr(e) {
	return hr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var _r = Symbol("events"), vr = /* @__PURE__ */ new Set(), yr = /* @__PURE__ */ new Set();
function br(e) {
	if (!Se) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Er.call(t, e), !e.cancelBubble) return lt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? (i.__removed = !1, et(() => {
		i.__removed || t.addEventListener(e, i, r);
	})) : t.addEventListener(e, i, r), i;
}
function Sr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && vn(() => {
		o.__removed = !0, t.removeEventListener(e, o, a);
	});
}
function V(e, t, n) {
	(t[_r] ??= {})[e] = n;
}
function Cr(e) {
	for (var t = 0; t < e.length; t++) vr.add(e[t]);
	for (var n of yr) n(e);
}
var wr = null, Tr = !1;
function Er(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	wr = e, Tr || (Tr = !0, setTimeout(() => {
		Tr = !1, wr = null;
	}));
	var s = 0, c = wr === e && e[_r];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[_r] = t;
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
		var d = Hn, f = Gn;
		Wn(null), Kn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[_r]?.[r];
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
			e[_r] = t, delete e.currentTarget, Wn(d), Kn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Dr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Or(e) {
	return Dr?.createHTML(e) ?? e;
}
function kr(e) {
	var t = un("template");
	return t.innerHTML = Or(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Ar(e, t) {
	var n = Gn;
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
		if (Se) return Ar(we, null), we;
		i === void 0 && (i = kr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ sn(i)));
		var t = r || tn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ sn(t), s = t.lastChild;
			Ar(o, s);
		} else Ar(t, t);
		return t;
	};
}
function jr(e = "") {
	if (!Se) {
		var t = on(e + "");
		return Ar(t, t), t;
	}
	var n = we;
	return n.nodeType === 3 ? dn(n) : (n.before(n = on()), Te(n)), Ar(n, n), n;
}
function Mr() {
	if (Se) return Ar(we, null), we;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = on();
	return e.append(t, n), Ar(t, n), e;
}
function U(e, t) {
	if (Se) {
		var n = Gn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = we), Ee();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Nr(e) {
	let t = 0, n = Kt(0), r;
	return () => {
		_n() && (B(n), wn(() => (t === 0 && (r = mr(() => e(() => N(n)))), t += 1, () => {
			et(() => {
				--t, t === 0 && (r?.(), r = void 0, N(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Pr = C | ee;
function Fr(e, t, n, r) {
	new Ir(e, t, n, r);
}
var Ir = class {
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
	#h = Nr(() => (this.#m = Kt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Gn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Gn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Tn(() => {
			if (Se) {
				let e = this.#t;
				Ee();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, Pr), Se && (this.#e = we);
	}
	#g() {
		try {
			this.#a = En(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		et(r), t && (this.#s = En(() => {
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
			t = !0, n && Ue(), this.#s !== null && Nn(this.#s, () => {
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
					pn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = En(() => e(this.#e)), et(() => {
			var e = this.#c = document.createDocumentFragment(), t = on(), n = !1;
			if (e.append(t), this.#a = this.#S(() => {
				try {
					return En(() => this.#r(t));
				} catch (e) {
					try {
						this.error(e), n = !0;
					} catch (e) {
						pn(e, this.#i.parent);
					}
					return null;
				}
			}), this.#a === null) {
				this.#c = null, n && this.#x(Tt);
				return;
			}
			this.#u === 0 && (this.#e.before(e), this.#c = null, Nn(this.#o, () => {
				this.#o = null;
			}), this.#x(Tt));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = En(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Ln(this.#a, e);
				let t = this.#n.pending;
				this.#o = En(() => t(this.#e));
			} else this.#x(Tt);
		} catch (e) {
			this.error(e);
		}
	}
	#x(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		it(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Gn, n = Hn, r = qe;
		Kn(this.#i), Wn(this.#i), Je(this.#i.ctx);
		try {
			return Ft.ensure(), e();
		} finally {
			Kn(t), Wn(n), Je(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && Nn(this.#o, () => {
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
		Tt?.is_fork ? (this.#a && Tt.skip_effect(this.#a), this.#o && Tt.skip_effect(this.#o), this.#s && Tt.skip_effect(this.#s), Tt.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (An(this.#a), null), this.#o &&= (An(this.#o), null), this.#s &&= (An(this.#s), null), Se && (Te(this.#t), De(), Te(Oe()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return En(() => {
						var r = Gn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return pn(e, this.#i.parent), null;
				}
			}));
		};
		et(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				pn(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => pn(e, this.#i && this.#i.parent)) : n(t);
		});
	}
}, Lr = !0;
function W(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[de] ??= e.nodeValue) && (e[de] = n, e.nodeValue = `${n}`);
}
function Rr(e, t) {
	return Br(e, t);
}
var zr = /* @__PURE__ */ new Map();
function Br(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	an();
	var l = void 0, u = xn(() => {
		var u = n ?? t.appendChild(on());
		Fr(u, { pending: () => {} }, (t) => {
			Ye({});
			var n = qe;
			if (o && (n.c = o), a && (i.$$events = a), Se && Ar(t, null), Lr = s, l = e(t, i) || Ze(), Lr = !0, Se && (Gn.nodes.end = we, we === null || we.nodeType !== 8 || we.data !== "]")) throw be(), me;
			Xe();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = gr(r);
					for (let e of [t, document]) {
						var a = zr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), zr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Er, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(vr)), yr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = zr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Er), r.delete(e), r.size === 0 && zr.delete(n)) : r.set(e, i);
			}
			yr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Vr.set(l, u), l;
}
var Vr = /* @__PURE__ */ new WeakMap(), Hr = class {
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
			if (n) Fn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Fn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (An(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Ln(r, t), t.append(on()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else An(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), Nn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (An(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = Tt, r = R();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = on();
				i.append(a), this.#n.set(e, {
					effect: En(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, En(() => t(this.anchor)));
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
function G(e, t, n = !1) {
	var r;
	Se && (r = we, Ee());
	var i = new Hr(e), a = n ? C : 0;
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
	Tn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Ur(e, t) {
	return t;
}
function Wr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Nn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Gr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
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
		Gr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Gr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= w, Ln(a, document.createDocumentFragment())) : An(t[i], n);
	}
}
var Kr;
function qr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = Se ? Te(/* @__PURE__ */ sn(u)) : u.appendChild(on());
	}
	Se && Ee();
	var d = null, f = /* @__PURE__ */ vt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Yr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= w, Zr(d, null, c)) : Fn(d) : Nn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Tn(() => {
			p = B(f);
			var e = p.length;
			let t = !1;
			Se && ke(c) === "[!" != (e === 0) && (c = Oe(), Te(c), Ce(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Tt, v = R(), y = 0; y < e; y += 1) {
				Se && we.nodeType === 8 && we.data === "]" && (c = we, t = !0, Ce(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && u.unskip_effect(S.e)) : (S = Xr(l, h ? c : Kr ??= on(), b, x, y, o, n, i), h || (S.e.f |= w), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = En(() => s(c)) : (d = En(() => s(Kr ??= on())), d.f |= w)), e > r.size && Pe("", "", ""), Se && e > 0 && Te(Oe()), !h) {
				if (m.set(u, r), v) {
					for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
					u.oncommit(g), u.ondiscard(_);
				} else g(u);
			}
			t && Ce(!0), B(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Se && (c = we);
}
function Jr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Yr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Jr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Fn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) {
			if (_.f ^= w, _ === l) Zr(_, null, n);
			else {
				var y = d ? d.next : l;
				_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Qr(e, d, _), Qr(e, _, y), Zr(_, y, n), d = _, p = [], m = [], l = Jr(d.next);
				continue;
			}
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Zr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Qr(e, S.prev, C.next), Qr(e, d, S), Qr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Zr(_, l, n), Qr(e, _.prev, _.next), Qr(e, _, d === null ? e.effect.first : d.next), Qr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Jr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Jr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Gr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = Jr(l.next);
		var te = ee.length;
		if (te > 0) {
			var ne = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) ee[v].nodes?.a?.fix();
			}
			Wr(e, ee, ne);
		}
	}
	o && et(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Xr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Kt(n) : /* @__PURE__ */ qt(n, !1, !1) : null, l = o & 2 ? Kt(i) : null;
	return {
		v: c,
		i: l,
		e: En(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Zr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ cn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Qr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function K(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Se && (o = Te(/* @__PURE__ */ sn(c)));
	}
	z(() => {
		var e = Gn;
		if (s === (s = t() ?? "")) {
			Se && Ee();
			return;
		}
		if (n && !Se) {
			e.nodes = null, c.innerHTML = s, s !== "" && Ar(/* @__PURE__ */ sn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (jn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Se) {
				for (var a = we.data, l = Ee(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ cn(l);
				if (l === null) throw be(), me;
				Ar(we, u), o = Te(l);
				return;
			}
			var d = un(r ? "svg" : i ? "math" : "template", r ? _e : i ? ve : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Ar(/* @__PURE__ */ sn(f), f.lastChild), r || i) for (; /* @__PURE__ */ sn(f);) o.before(/* @__PURE__ */ sn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
function $r(e, t, ...n) {
	var r = new Hr(e);
	Tn(() => {
		let e = t() ?? null;
		r.ensure(e, e && ((t) => e(t, ...n)));
	}, C);
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var ei = () => performance.now(), ti = {
	tick: (e) => requestAnimationFrame(e),
	now: () => ei(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function ni() {
	let e = ti.now();
	ti.tasks.forEach((t) => {
		t.c(e) || (ti.tasks.delete(t), t.f());
	}), ti.tasks.size !== 0 && ti.tick(ni);
}
function ri(e) {
	let t;
	return ti.tasks.size === 0 && ti.tick(ni), {
		promise: new Promise((n) => {
			ti.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			ti.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function ii(e, t) {
	lt(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ai(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function oi(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = ai(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var si = (e) => e;
function ci(e, t, n, r) {
	var i = !!(e & 1), a = !!(e & 2), o = i && a, s = !!(e & 4), c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return lt(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			if (t.inert = u, !i) {
				p?.abort(), p?.reset?.();
				return;
			}
			a || f?.abort(), f = li(t, m(), p, 1, () => {
				ii(t, "introstart");
			}, () => {
				ii(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = li(t, m(), f, 0, () => {
				ii(t, "outrostart");
			}, () => {
				ii(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = Gn;
	if ((g.nodes.t ??= []).push(h), i && Lr) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && Sn(() => {
			mr(() => h.in());
		});
	}
}
function li(e, t, n, r, i, a) {
	var o = r === 1, s = !1;
	if (d(t)) {
		var c;
		return et(() => {
			s || (c = li(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
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
	let { delay: l = 0, css: u, tick: p, easing: m = si } = t;
	var h, g = () => 1 - r;
	return et(() => {
		if (!s) {
			var c = [];
			if (o && n === void 0 && (p && p(0, 1), u)) {
				var d = oi(u(0, 1));
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
						var v = o + s * m(_ / f), y = oi(u(v, 1 - v));
						l.push(y), d ||= y.overflow === "hidden";
					}
					d && (e.style.overflow = "hidden"), g = () => {
						var e = h.currentTime;
						return o + s * m(e / c);
					}, p && ri(() => {
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
var ui = [..." 	\n\r\f\xA0\v﻿"];
function di(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || ui.includes(r[o - 1])) && (s === r.length || ui.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function fi(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function pi(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function mi(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(pi)), i && c.push(...Object.keys(i).map(pi));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = pi(e.substring(l, u).trim());
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
		return r && (n += fi(r)), i && (n += fi(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function q(e, t, n, r, i, a) {
	var o = e[le];
	if (Se || o !== n || o === void 0) {
		var s = di(n, r, a);
		(!Se || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[le] = n;
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
	var i = e[ue];
	if (Se || i !== t) {
		var a = mi(t, r);
		(!Se || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ue] = t;
	} else r && (Array.isArray(r) ? (hi(e, n?.[0], r[0]), hi(e, n?.[1], r[1], "important")) : hi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var _i = Symbol("is custom element"), vi = Symbol("is html"), yi = pe ? "link" : "LINK", bi = pe ? "progress" : "PROGRESS";
function J(e) {
	if (Se) {
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
		e[E] = n, et(n), ct();
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
	Se && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === yi) || i[t] !== (i[t] = n) && (t === "loading" && (e[T] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && wi(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Si(e) {
	return e[ce] ??= {
		[_i]: e.nodeName.includes("-"),
		[vi]: e.namespaceURI === ge
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
	ut(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ei(e) ? Di(a) : a, n(a), Tt !== null && r.add(Tt), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Se && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(Ei(e) ? Di(e.value) : e.value), Tt !== null && r.add(Tt)), wn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Tt;
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
	return e === t || e?.[ae] === t;
}
function ki(e = Ze(), t, n, r) {
	var i = qe.r, a = Gn;
	return Sn(() => {
		var o, s;
		return wn(() => {
			o = s, s = r?.() || [], mr(() => {
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
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ ht(r), B(u)) : (l && (l = !1, c = s ? mr(r) : r), c);
	let f;
	if (o) {
		var p = ae in e || se in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = ji(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ze(t), f(m)));
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
	var v = !1, y = (n & 1 ? ht : vt)(() => (v = !1, g()));
	o && B(y);
	var b = Gn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? B(y) : i && o ? $t(e) : e;
			return M(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Bn && v || b.f & 16384 ? y.v : B(y);
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
var aa = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), oa = /* @__PURE__ */ H("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), sa = /* @__PURE__ */ H("<button type=\"button\"></button>"), ca = /* @__PURE__ */ H("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), la = /* @__PURE__ */ H("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), ua = /* @__PURE__ */ H("<span class=\"cp-tokens svelte-zxiloo\"></span>"), da = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), fa = /* @__PURE__ */ H("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), pa = /* @__PURE__ */ H("<div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!>", 1), ma = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), ha = /* @__PURE__ */ H("<div class=\"cp-pop cp-anchored svelte-zxiloo\" popover=\"auto\"><!></div>"), ga = /* @__PURE__ */ H("<div class=\"cp-pop svelte-zxiloo\"><!></div>"), _a = /* @__PURE__ */ H("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function va(e, t) {
	Ye(t, !0);
	let n = (e) => {
		var t = pa(), n = F(t), a = I(n), o = L(n, 2);
		J(o);
		var s = L(o, 2);
		J(s);
		var c = L(s, 2), l = P(c), u = L(l, 2);
		J(u);
		var d = L(u, 2), f = (e) => {
			var t = aa();
			z((e) => X(t, "title", e), [() => Z("cp.eyedropper")]), V("click", t, be), U(e, t);
		};
		G(d, (e) => {
			ye && e(f);
		}), D(c);
		var p = L(c, 2);
		qr(p, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = oa();
			J(r), z((e) => {
				X(r, "title", t), Y(r, e);
			}, [() => _e(B(n))]), V("change", r, (e) => ve(B(n), e.target.value)), U(e, r);
		}), D(p);
		var v = L(p, 2), y = (e) => {
			var t = ca(), n = F(t), a = P(n, !0), o = L(a), s = (e) => {
				var t = jr();
				z((e) => W(t, e), [() => Z("cp.linkedSuffix", { token: m() })]), U(e, t);
			}, c = /* @__PURE__ */ A(() => m());
			G(o, (e) => {
				B(c) && e(s);
			}), D(n);
			var l = L(n, 2);
			qr(l, 21, i, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(n)[0], a = () => B(n)[1];
				var o = sa();
				let s;
				z((e) => {
					s = q(o, 1, "cp-token svelte-zxiloo", null, s, { active: r() === i() }), gi(o, `background: ${a() ?? ""}`), X(o, "title", e);
				}, [() => Z("cp.tokenTitle", { name: i() })]), V("click", o, () => me(i(), a())), U(e, o);
			}), D(l), z((e) => W(a, e), [() => Z("cp.themeColors")]), U(e, t);
		};
		G(v, (e) => {
			i().length && e(y);
		});
		var b = L(v, 2), x = P(b), S = L(x);
		D(b);
		var re = L(b, 2), ie = (e) => {
			var t = ua();
			qr(t, 20, () => B(_), (e) => e, (e, t) => {
				var n = la(), r = P(n), i = L(r, 2);
				D(n), z((e) => {
					gi(r, `background: ${t ?? ""}`), X(r, "title", t), X(i, "title", e);
				}, [() => Z("cp.removeSaved")]), V("click", r, () => xe(t)), V("click", i, () => Ce(t)), U(e, n);
			}), D(t), U(e, t);
		};
		G(re, (e) => {
			B(_).length && e(ie);
		});
		var ae = L(re, 2), oe = (e) => {
			var t = fa(), n = F(t), r = I(n, !0), i = L(n, 2);
			qr(i, 20, () => B(g), (e) => e, (e, t) => {
				var n = da();
				z(() => {
					gi(n, `background: ${t ?? ""}`), X(n, "title", t);
				}), V("click", n, () => xe(t)), U(e, n);
			}), D(i), z((e) => W(r, e), [() => Z("common.recent")]), U(e, t);
		};
		G(ae, (e) => {
			B(g).length && e(oe);
		}), z((e, t, r, i, c) => {
			gi(n, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${B(C) ?? ""}, 100%, 50%)`), gi(a, `left: ${B(ee) * 100}%; top: ${(1 - B(te)) * 100}%`), Y(o, B(C)), Y(s, e), X(s, "title", t), gi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), gi(l, `background: ${B(ne) ?? ""}`), Y(u, B(ne)), W(x, `${i ?? ""} `), X(S, "title", c);
		}, [
			() => Math.round(B(w) * 100),
			() => Z("cp.alpha"),
			() => se(),
			() => Z("cp.saved"),
			() => Z("cp.saveTitle")
		]), V("pointerdown", n, he), V("input", o, (e) => {
			M(C, Number(e.target.value), !0), ce();
		}), V("input", s, (e) => {
			M(w, Number(e.target.value) / 100), ce();
		}), V("change", u, ge), V("click", S, Se), U(e, t);
	}, r = Mi(t, "value", 3, "#000000"), i = Mi(t, "tokens", 19, () => []), a = Mi(t, "label", 19, () => Z("cp.pickColor")), o = Mi(t, "allowClear", 3, !1), s = "urd-recent-colors", c = "urd-saved-colors", l = ta(), u = ra("urd-cp"), d = u.slice(2), f = /* @__PURE__ */ j(null), p = () => {
		let e = i().find(([e]) => e === r());
		return e ? e[1] : r();
	}, m = () => i().find(([e]) => e === r())?.[0] ?? null, g = /* @__PURE__ */ j($t([])), _ = /* @__PURE__ */ j($t([])), v = "", y = "", b = /* @__PURE__ */ j(null), x = /* @__PURE__ */ j(!1), S = /* @__PURE__ */ j($t({
		top: 0,
		left: 0
	})), C = /* @__PURE__ */ j(0), ee = /* @__PURE__ */ j(0), te = /* @__PURE__ */ j(1), w = /* @__PURE__ */ j(1), ne = /* @__PURE__ */ j("#000000");
	function re(e) {
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
	let ie = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function ae(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function oe(e, t, n) {
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
	function se() {
		return ie(...oe(B(C), B(ee), B(te)));
	}
	function T() {
		let e = se();
		return B(w) >= .995 ? e : e + Math.round(B(w) * 255).toString(16).padStart(2, "0");
	}
	function ce() {
		M(ne, T(), !0), y = B(ne), t.onchange?.(B(ne));
	}
	function le(e) {
		let t = re(e);
		return t ? (((e) => {
			var t = h(e, 3);
			M(C, t[0], !0), M(ee, t[1], !0), M(te, t[2], !0);
		})(ae(t[0], t[1], t[2])), M(w, t[3], !0), M(ne, T(), !0), !0) : !1;
	}
	function ue() {
		le(p()) || le("#000000"), v = r(), y = "";
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			M(g, Array.isArray(e) ? e : [], !0);
		} catch {
			M(g, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(c) ?? "[]");
			M(_, Array.isArray(e) ? e : [], !0);
		} catch {
			M(_, [], !0);
		}
	}
	function de(e) {
		e.newState === "open" ? (ue(), ia(B(b), !0), M(x, !0)) : B(x) && (ia(B(b), !1), M(x, !1), fe());
	}
	function E() {
		ue();
		let e = B(b).getBoundingClientRect(), t = B(b).closest(".panel-body")?.getBoundingClientRect(), n = t ? t.right : window.innerWidth, r = Math.max(8, Math.min(e.right - 236, n - 236 - 8)), i = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		M(S, {
			top: i,
			left: r
		}, !0), M(x, !0);
	}
	function fe() {
		if (y && y !== v) {
			let e = [y, ...B(g).filter((e) => e !== y)].slice(0, 8);
			localStorage.setItem(s, JSON.stringify(e));
		}
	}
	function pe() {
		if (l) {
			B(f)?.hidePopover();
			return;
		}
		M(x, !1), fe();
	}
	function me(e, n) {
		le(n), M(ne, n, !0), t.onchange?.(e);
	}
	function he(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			M(ee, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), M(te, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ce();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ge(e) {
		le(e.target.value) ? ce() : M(ne, se(), !0);
	}
	function _e(e) {
		return (re(se()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ve(e, t) {
		let n = re(se()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			M(C, t[0], !0), M(ee, t[1], !0), M(te, t[2], !0);
		})(ae(...n)), ce();
	}
	let ye = typeof window < "u" && "EyeDropper" in window;
	async function be() {
		try {
			le((await new window.EyeDropper().open()).sRGBHex) && ce();
		} catch {}
	}
	function xe(e) {
		le(e) && ce();
	}
	function Se() {
		let e = T();
		B(_).includes(e) || (M(_, [e, ...B(_)].slice(0, 12), !0), localStorage.setItem(c, JSON.stringify(Ge(B(_)))));
	}
	function Ce(e) {
		M(_, B(_).filter((t) => t !== e), !0), localStorage.setItem(c, JSON.stringify(Ge(B(_))));
	}
	yn(() => {
		if (!B(x)) return;
		let e = () => pe();
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(b) && !B(b).contains(e.target) && pe();
		}, n = (e) => {
			e.key === "Escape" && pe();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), () => {
			document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), window.removeEventListener("blur", e);
		};
	});
	var we = _a(), Te = P(we);
	let Ee;
	var De = L(Te, 2), Oe = (e) => {
		var n = ma();
		z((e, t) => {
			X(n, "title", e), X(n, "aria-label", t);
		}, [() => Z("cp.clearTitle"), () => Z("cp.clear")]), V("click", n, () => t.onchange?.("")), U(e, n);
	};
	G(De, (e) => {
		o() && r() && e(Oe);
	});
	var ke = L(De, 2), Ae = (e) => {
		var t = ha(), r = P(t), i = (e) => {
			n(e);
		};
		G(r, (e) => {
			B(x) && e(i);
		}), D(t), ki(t, (e) => M(f, e), () => B(f)), z(() => {
			X(t, "id", d), gi(t, `position-anchor: ${u ?? ""}`);
		}), Sr("toggle", t, de), V("click", t, (e) => e.preventDefault()), U(e, t);
	}, je = (e) => {
		var t = ga(), r = P(t);
		n(r), D(t), z(() => gi(t, `top: ${B(S).top ?? ""}px; left: ${B(S).left ?? ""}px`)), V("click", t, (e) => e.preventDefault()), U(e, t);
	};
	G(ke, (e) => {
		l ? e(Ae) : B(x) && e(je, 1);
	}), D(we), ki(we, (e) => M(b, e), () => B(b)), z((e, t, n) => {
		Ee = q(Te, 1, "cp-swatch svelte-zxiloo", null, Ee, {
			linked: e,
			"cp-empty": o() && !r()
		}), gi(Te, `background: ${t ?? ""}${l ? `; anchor-name: ${u}` : ""}`), X(Te, "title", n), X(Te, "popovertarget", l ? d : void 0), X(Te, "aria-label", a());
	}, [
		() => m(),
		() => r() ? p() : "transparent",
		() => m() ? Z("cp.linkedTitle", {
			label: a(),
			token: m()
		}) : a()
	]), V("click", Te, function(...e) {
		(l ? void 0 : () => B(x) ? pe() : E())?.apply(this, e);
	}), U(e, we), Xe();
}
Cr([
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
var to = /* @__PURE__ */ H("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), no = /* @__PURE__ */ H("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ro = /* @__PURE__ */ H("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"><!> <!></div>", 1), io = /* @__PURE__ */ H("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), ao = /* @__PURE__ */ H("<button type=\"button\"> </button>"), oo = /* @__PURE__ */ H("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), so = /* @__PURE__ */ H("<!> <!> <!> <!>", 1), co = /* @__PURE__ */ H("<img class=\"gp-own svelte-15ln1c3\"/>"), lo = /* @__PURE__ */ H("<span class=\"gp-svg svelte-15ln1c3\"></span>"), uo = /* @__PURE__ */ H("<div class=\"gp-pop gp-anchored svelte-15ln1c3\" popover=\"auto\"><!></div>"), fo = /* @__PURE__ */ H("<div class=\"gp-pop svelte-15ln1c3\"><!></div>"), po = /* @__PURE__ */ H("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function mo(e, t) {
	Ye(t, !0);
	let n = (e) => {
		var n = so(), a = F(n), o = (e) => {
			var t = ro(), n = F(t), r = I(n, !0), a = L(n, 2), o = P(a);
			qr(o, 16, () => B(d), (e) => e, (e, t) => {
				var n = to();
				let r;
				var a = P(n);
				K(a, () => eo(t), !0), D(a), D(n), z((e) => {
					r = q(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), X(n, "title", e);
				}, [() => Z(Qa[t].labelKey)]), V("click", n, () => C(t)), U(e, n);
			}), qr(L(o, 2), 16, () => B(u), (e) => e, (e, t) => {
				var n = no(), r = I(n, !0);
				z(() => W(r, t)), V("click", n, () => S(t)), U(e, n);
			}), D(a), z((e) => W(r, e), [() => Z("common.recent")]), U(e, t);
		};
		G(a, (e) => {
			(B(u).length || B(d).length) && e(o);
		});
		var s = L(a, 2), c = (e) => {
			var t = Mr();
			qr(F(t), 17, () => $a, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let r = () => B(n)[0], a = () => B(n)[1];
				var o = io(), s = F(o), c = I(s, !0), l = L(s, 2);
				qr(l, 20, a, (e) => e, (e, t) => {
					var n = to();
					let r;
					var a = P(n);
					K(a, () => eo(t), !0), D(a), D(n), z((e) => {
						r = q(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, r, { active: t === i() }), X(n, "title", e);
					}, [() => Z(Qa[t].labelKey)]), V("click", n, () => C(t)), U(e, n);
				}), D(l), z((e) => W(c, e), [() => Z(r())]), U(e, o);
			}), U(e, t);
		};
		G(s, (e) => {
			t.onicon && e(c);
		});
		var l = L(s, 2);
		qr(l, 17, () => Ha, ([e, t]) => e, (e, t) => {
			var n = /* @__PURE__ */ A(() => h(B(t), 2));
			let i = () => B(n)[0], a = () => B(n)[1];
			var o = io(), s = F(o), c = I(s, !0), l = L(s, 2);
			qr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var n = ao();
				let i;
				var a = I(n, !0);
				z(() => {
					i = q(n, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === r() }), W(a, t);
				}), V("click", n, () => S(t)), U(e, n);
			}), D(l), z((e) => W(c, e), [() => Z(i())]), U(e, o);
		});
		var f = L(l, 2), p = (e) => {
			var t = oo(), n = F(t), r = I(n, !0), i = L(n, 2), a = I(i, !0), o = L(i, 2);
			ki(o, (e) => M(m, e), () => B(m));
			var s = I(L(o, 2), !0);
			z((e, t, n) => {
				W(r, e), W(a, t), W(s, n);
			}, [
				() => Z("gp.ownIcon"),
				() => Z("gp.upload"),
				() => Z("gp.uploadHint")
			]), V("click", i, () => B(m).click()), V("change", o, ee), U(e, t);
		};
		G(f, (e) => {
			t.onimage && e(p);
		}), U(e, n);
	}, r = Mi(t, "value", 3, "★"), i = Mi(t, "icon", 3, null), a = Mi(t, "image", 3, null), o = Mi(t, "label", 19, () => Z("gp.pickGlyph")), s = ta(), c = ra("urd-gp"), l = c.slice(2), u = /* @__PURE__ */ j($t([])), d = /* @__PURE__ */ j($t([])), f = /* @__PURE__ */ j(null), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), g = /* @__PURE__ */ j(!1), _ = /* @__PURE__ */ j($t({
		top: 0,
		left: 0
	}));
	function v() {
		M(u, Ka(), !0), M(d, t.onicon ? Ja().filter((e) => Qa[e]) : [], !0);
	}
	function y(e) {
		M(g, e.newState === "open"), ia(B(f), B(g)), B(g) && v();
	}
	function b() {
		s && B(p)?.hidePopover(), M(g, !1);
	}
	function x() {
		v();
		let e = B(f).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		M(_, {
			top: n,
			left: t
		}, !0), M(g, !0);
	}
	function S(e) {
		qa(e), t.onpick?.(e), b();
	}
	function C(e) {
		Ya(e), t.onicon?.(e), b();
	}
	async function ee(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ja(n, 256);
		t.onimage?.(r.dataUrl), b();
	}
	yn(() => {
		if (!B(g)) return;
		let e = () => b();
		if (window.addEventListener("blur", e), s) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(f) && !B(f).contains(e.target) && M(g, !1);
		}, n = (e) => {
			e.key === "Escape" && M(g, !1);
		}, r = (e) => {
			B(f) && e.target instanceof Node && !B(f).contains(e.target) && M(g, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var te = po(), w = P(te), ne = P(w), re = (e) => {
		var t = co();
		z((e) => {
			X(t, "src", a()), X(t, "alt", e);
		}, [() => Z("gp.ownIcon")]), U(e, t);
	}, ie = (e) => {
		var t = lo();
		K(t, () => eo(i()), !0), D(t), U(e, t);
	}, ae = (e) => {
		var t = jr();
		z(() => W(t, r() || "★")), U(e, t);
	};
	G(ne, (e) => {
		a() ? e(re) : i() && Qa[i()] ? e(ie, 1) : e(ae, -1);
	}), D(w);
	var oe = L(w, 2), se = (e) => {
		var t = uo(), r = P(t), i = (e) => {
			n(e);
		};
		G(r, (e) => {
			B(g) && e(i);
		}), D(t), ki(t, (e) => M(p, e), () => B(p)), z(() => {
			X(t, "id", l), gi(t, `position-anchor: ${c ?? ""}`);
		}), Sr("toggle", t, y), U(e, t);
	}, T = (e) => {
		var t = fo(), r = P(t);
		n(r), D(t), z(() => gi(t, `top: ${B(_).top ?? ""}px; left: ${B(_).left ?? ""}px`)), U(e, t);
	};
	G(oe, (e) => {
		s ? e(se) : B(g) && e(T, 1);
	}), D(te), ki(te, (e) => M(f, e), () => B(f)), z(() => {
		X(w, "title", o()), X(w, "aria-label", o()), X(w, "popovertarget", s ? l : void 0), gi(w, s ? `anchor-name: ${c}` : void 0);
	}), V("click", w, function(...e) {
		(s ? void 0 : () => B(g) ? M(g, !1) : x())?.apply(this, e);
	}), U(e, te), Xe();
}
Cr(["click", "change"]);
//#endregion
//#region src/lib/MarkPicker.svelte
var ho = /* @__PURE__ */ H("<span class=\"mp-count svelte-1y5ipgc\"> </span>"), go = /* @__PURE__ */ H("<button type=\"button\"><span class=\"mp-svg svelte-1y5ipgc\"></span></button>"), _o = /* @__PURE__ */ H("<p class=\"mp-hint svelte-1y5ipgc\"> </p>"), vo = /* @__PURE__ */ H("<input class=\"mp-search svelte-1y5ipgc\" type=\"search\"/> <div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid svelte-1y5ipgc\"><button type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle><path d=\"M6 18L18 6\"></path></svg></button> <!></div> <!></div>", 1), yo = /* @__PURE__ */ H("<button type=\"button\"><img alt=\"\" class=\"svelte-1y5ipgc\"/></button>"), bo = /* @__PURE__ */ H("<div class=\"mp-scroll svelte-1y5ipgc\"><div class=\"mp-grid mp-grid-img svelte-1y5ipgc\"><button type=\"button\" class=\"mp-cell mp-upload svelte-1y5ipgc\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" class=\"svelte-1y5ipgc\"><path d=\"M12 5v14\"></path><path d=\"M5 12h14\"></path></svg> <span> </span></button> <!></div> <p class=\"mp-hint svelte-1y5ipgc\"> </p></div>"), xo = /* @__PURE__ */ H("<div class=\"mp-tabs svelte-1y5ipgc\" role=\"group\"><button type=\"button\"> </button> <button type=\"button\"> <!></button></div> <!>", 1), So = /* @__PURE__ */ H("<img class=\"mp-own svelte-1y5ipgc\" alt=\"\"/>"), Co = /* @__PURE__ */ H("<span class=\"mp-svg svelte-1y5ipgc\"></span>"), wo = /* @__PURE__ */ H("<span class=\"mp-empty svelte-1y5ipgc\" aria-hidden=\"true\">+</span>"), To = /* @__PURE__ */ H("<div class=\"mp-pop mp-anchored svelte-1y5ipgc\" popover=\"auto\"><!></div>"), Eo = /* @__PURE__ */ H("<div class=\"mp-pop svelte-1y5ipgc\"><!></div>"), Do = /* @__PURE__ */ H("<span class=\"mp svelte-1y5ipgc\"><button type=\"button\"><!></button> <!> <input type=\"file\" accept=\"image/*\" hidden=\"\"/></span>");
function Oo(e, t) {
	Ye(t, !0);
	let n = (e) => {
		var t = xo(), n = F(t), a = P(n);
		let c;
		var l = I(a, !0), u = L(a, 2);
		let d;
		var f = P(u, !0), p = L(f), m = (e) => {
			var t = ho(), n = I(t, !0);
			z(() => W(n, B(x).length)), U(e, t);
		};
		G(p, (e) => {
			B(x).length && e(m);
		}), D(u), D(n);
		var h = L(n, 2), v = (e) => {
			var t = vo(), n = F(t);
			J(n);
			var a = L(n, 2), o = P(a), c = P(o);
			let l;
			qr(L(c, 2), 17, () => B(b), ({ id: e }) => e, (e, t) => {
				let n = () => B(t).id;
				var a = go();
				let o;
				var s = P(a);
				K(s, () => eo(n()), !0), D(s), D(a), z((e, t) => {
					o = q(a, 1, "mp-cell svelte-1y5ipgc", null, o, { active: n() === r() && !i() }), X(a, "title", e), X(a, "aria-label", t);
				}, [() => Z(Qa[n()].labelKey), () => Z(Qa[n()].labelKey)]), V("click", a, () => w(n())), U(e, a);
			}), D(o);
			var u = L(o, 2), d = (e) => {
				var t = _o(), n = I(t, !0);
				z((e) => W(n, e), [() => Z("mp.noHits")]), U(e, t);
			};
			G(u, (e) => {
				B(b).length || e(d);
			}), D(a), z((e, t) => {
				X(n, "placeholder", e), X(n, "aria-label", t), l = q(c, 1, "mp-cell mp-none svelte-1y5ipgc", null, l, { active: !r() && !i() }), X(c, "title", s()), X(c, "aria-label", s());
			}, [() => Z("mp.search"), () => Z("mp.search")]), Ti(n, () => B(_), (e) => M(_, e)), V("click", c, re), U(e, t);
		}, y = (e) => {
			var t = bo(), n = P(t), r = P(n), a = I(L(P(r), 2), !0);
			D(r), qr(L(r, 2), 16, () => B(x), (e) => e, (e, t) => {
				var n = yo();
				let r;
				var a = I(n);
				z(() => {
					r = q(n, 1, "mp-cell mp-img svelte-1y5ipgc", null, r, { active: t === i() }), X(a, "src", t);
				}), V("click", n, () => ne(t)), U(e, n);
			}), D(n);
			var o = I(L(n, 2), !0);
			D(t), z((e, t) => {
				W(a, e), W(o, t);
			}, [() => Z("mp.upload"), () => Z("mp.imagesHint")]), V("click", r, oe), U(e, t);
		};
		G(h, (e) => {
			B(g) === "icons" ? e(v) : e(y, -1);
		}), z((e, t) => {
			X(n, "aria-label", o()), c = q(a, 1, "mp-tab svelte-1y5ipgc", null, c, { on: B(g) === "icons" }), X(a, "aria-pressed", B(g) === "icons"), W(l, e), d = q(u, 1, "mp-tab svelte-1y5ipgc", null, d, { on: B(g) === "images" }), X(u, "aria-pressed", B(g) === "images"), W(f, t);
		}, [() => Z("mp.icons"), () => Z("mp.images")]), V("click", a, () => M(g, "icons")), V("click", u, () => M(g, "images")), U(e, t);
	}, r = Mi(t, "icon", 3, ""), i = Mi(t, "image", 3, ""), a = Mi(t, "images", 19, () => []), o = Mi(t, "label", 19, () => Z("mp.pickMark")), s = Mi(t, "noneLabel", 19, () => Z("common.none")), c = Mi(t, "klass", 3, ""), l = ta(), u = ra("urd-mp"), d = u.slice(2), f = /* @__PURE__ */ j(null), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), h = /* @__PURE__ */ j(!1), g = /* @__PURE__ */ j("icons"), _ = /* @__PURE__ */ j(""), v = /* @__PURE__ */ j($t({
		top: 0,
		left: 0
	})), y = $a.flatMap(([e, t]) => t.map((t) => ({
		id: t,
		cat: e
	}))), b = /* @__PURE__ */ A(() => {
		let e = B(_).trim().toLowerCase();
		return e ? y.filter(({ id: t }) => {
			let n = Z(Qa[t].labelKey) || Qa[t].label;
			return t.includes(e) || n.toLowerCase().includes(e);
		}) : y;
	}), x = /* @__PURE__ */ A(() => [...new Set(a().filter(Boolean))]);
	function S() {
		M(_, ""), M(ie, !1), M(g, i() ? "images" : "icons", !0);
	}
	function C(e) {
		M(h, e.newState === "open"), ia(B(f), B(h)), B(h) && S();
	}
	function ee() {
		l && B(p)?.hidePopover(), M(h, !1);
	}
	function te() {
		S();
		let e = B(f).getBoundingClientRect();
		M(v, {
			left: Math.max(8, Math.min(e.left, window.innerWidth - 286 - 8)),
			top: e.bottom + 332 + 8 > window.innerHeight ? Math.max(8, e.top - 332 - 8) : e.bottom + 6
		}, !0), M(h, !0);
	}
	function w(e) {
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
	let ie = /* @__PURE__ */ j(!1);
	function ae(e) {
		M(ie, !1);
		let n = e.target.files?.[0];
		e.target.value = "", n && t.onfile?.(n);
	}
	function oe() {
		M(ie, !0), B(m).click();
	}
	yn(() => {
		if (!B(h)) return;
		let e = () => {
			B(ie) || ee();
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(f) && !B(f).contains(e.target) && M(h, !1);
		}, n = (e) => {
			e.key === "Escape" && M(h, !1);
		}, r = (e) => {
			B(f) && e.target instanceof Node && !B(f).contains(e.target) && M(h, !1);
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var se = Do(), T = P(se), ce = P(T), le = (e) => {
		var n = Mr();
		$r(F(n), () => t.children), U(e, n);
	}, ue = (e) => {
		var t = So();
		z(() => X(t, "src", i())), U(e, t);
	}, de = (e) => {
		var t = Co();
		K(t, () => eo(r()), !0), D(t), U(e, t);
	}, E = (e) => {
		U(e, wo());
	};
	G(ce, (e) => {
		t.children ? e(le) : i() ? e(ue, 1) : r() && Qa[r()] ? e(de, 2) : e(E, -1);
	}), D(T);
	var fe = L(T, 2), pe = (e) => {
		var t = To(), r = P(t), i = (e) => {
			n(e);
		};
		G(r, (e) => {
			B(h) && e(i);
		}), D(t), ki(t, (e) => M(p, e), () => B(p)), z(() => {
			X(t, "id", d), gi(t, `position-anchor: ${u ?? ""}`);
		}), Sr("toggle", t, C), U(e, t);
	}, me = (e) => {
		var t = Eo(), r = P(t);
		n(r), D(t), z(() => gi(t, `top: ${B(v).top ?? ""}px; left: ${B(v).left ?? ""}px`)), U(e, t);
	};
	G(fe, (e) => {
		l ? e(pe) : B(h) && e(me, 1);
	});
	var he = L(fe, 2);
	ki(he, (e) => M(m, e), () => B(m)), D(se), ki(se, (e) => M(f, e), () => B(f)), z(() => {
		q(T, 1, `mp-trigger ${c() ?? ""}`, "svelte-1y5ipgc"), X(T, "title", o()), X(T, "aria-label", o()), X(T, "popovertarget", l ? d : void 0), gi(T, l ? `anchor-name: ${u}` : void 0);
	}), V("click", T, function(...e) {
		(l ? void 0 : () => B(h) ? M(h, !1) : te())?.apply(this, e);
	}), V("change", he, ae), Sr("cancel", he, () => M(ie, !1)), U(e, se), Xe();
}
Cr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function ko(e, t = {}) {
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
function Ao(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function jo(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Ao(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Ao(e, t), a));
}
//#endregion
//#region src/lib/deploy-wait.js
function Mo(e, { max: t = 8 } = {}) {
	let n = (e ?? []).filter((e) => e && typeof e.path == "string" && typeof e.content == "string" && e.encoding === "utf-8" && !e.delete && (e.path.startsWith("content/") || e.path === "plugins/plugins.json"));
	return n.sort((e, t) => (e.path === "content/site.json" ? -1 : 0) - (t.path === "content/site.json" ? -1 : 0)), n.slice(0, t).map(({ path: e, content: t }) => ({
		path: e,
		content: t
	}));
}
async function No(e, { fetchFn: t = fetch, delayMs: n = 1e4, attempts: r = 18, sleep: i = (e) => new Promise((t) => setTimeout(t, e)) } = {}) {
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
var Po = 3840, Fo = 2400, Io = (e, t, n) => Math.min(n, Math.max(t, e));
function Lo({ innerWidth: e = 0, screenWidth: t = 0 } = {}) {
	let n = e > 0 ? e : t;
	return Math.max(1, Math.round(n > 0 ? n : 1));
}
function Ro(e) {
	return !e || typeof e.innerWidth != "number" ? null : Lo({
		innerWidth: e.innerWidth,
		screenWidth: e.screen?.width ?? 0
	});
}
function zo(e, t) {
	let n = e && typeof e == "object" && !Array.isArray(e) ? e : {}, r = n.mode === "custom" ? "custom" : "own", i = Number(n.width), a = Io(Number.isFinite(i) && i > 0 ? i : t, 640, Po), o = Number(n.height), s = Number.isFinite(o) && o > 0 ? Io(o, 480, Fo) : 0;
	return {
		mode: r,
		width: Math.round(a),
		height: Math.round(s)
	};
}
function Bo(e, t) {
	return e?.mode === "custom" ? {
		width: e.width,
		height: e.height || 0
	} : {
		width: t,
		height: 0
	};
}
var Vo = 1920, Ho = [
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
], Uo = [
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
], Wo = [
	1920,
	1536,
	1366
];
function Go(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Vo, Math.max(960, n));
}
function Ko(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function qo(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Jo(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Yo(e) {
	return Uo.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/nav-size.js
var Xo = {
	min: 0,
	max: 64,
	step: 1
}, Zo = {
	min: 12,
	max: 28,
	step: 1
}, Qo = {
	min: 0,
	max: 80,
	step: 1
}, $o = {
	min: 0,
	max: 64,
	step: 1
}, es = {
	min: 480,
	max: 1920,
	step: 20
}, ts = {
	min: .3,
	max: .8,
	step: .05
}, ns = {
	min: 0,
	max: 400,
	step: 10
}, rs = {
	min: 0,
	max: 1200,
	step: 20
}, is = {
	min: 0,
	max: 64,
	step: 1
}, as = {
	min: 180,
	max: 400,
	step: 1
}, os = {
	min: 12,
	max: 128,
	step: 1
}, ss = {
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
}, cs = [
	"sm",
	"md",
	"lg",
	"xl"
], ls = .67;
function us(e) {
	return e === "floating" || e === "floating-square" || e === "floating-tab";
}
function ds(e, { min: t, max: n, step: r = 1 }, i) {
	let a = Number(e);
	if (e == null || e === "" || !Number.isFinite(a)) return i;
	let o = Math.round(a / r) * r, s = Math.min(n, Math.max(t, o));
	return r < 1 ? Math.round(s * 100) / 100 : s;
}
function fs(e, t) {
	if (e?.padY != null && e.padY !== "") return ds(e.padY, Xo, ss.md.padY);
	let n = ss[e?.size] ?? ss.md;
	return Math.round(n.padY * (us(t) ? ls : 1));
}
function ps(e) {
	if (e?.textSize != null && e.textSize !== "") return ds(e.textSize, Zo, ss.md.textSize);
	let t = ss[e?.size] ?? ss.md;
	return Math.round(t.textSize);
}
function ms(e) {
	return e?.padY != null && e.padY !== "" || e?.textSize != null && e.textSize !== "" ? null : cs.includes(e?.size) ? e.size : "md";
}
//#endregion
//#region src/lib/Dropdown.svelte
var hs = /* @__PURE__ */ H("<span aria-hidden=\"true\"><svg viewBox=\"0 0 16 16\" width=\"1em\" height=\"1em\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"svelte-vtocc6\"><path d=\"M3.5 6l4.5 4.5L12.5 6\"></path></svg></span>"), gs = /* @__PURE__ */ H("<button type=\"button\"> </button>"), _s = /* @__PURE__ */ H("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <div class=\"dd-pop dd-anchored svelte-vtocc6\" popover=\"auto\"><!></div>", 1), vs = /* @__PURE__ */ H("<div class=\"dd-pop svelte-vtocc6\"></div>"), ys = /* @__PURE__ */ H("<button type=\"button\"><span class=\"dd-value svelte-vtocc6\"> </span> <!></button> <!>", 1), bs = /* @__PURE__ */ H("<span class=\"dd svelte-vtocc6\"><!></span>");
function Q(e, t) {
	Ye(t, !0);
	let n = (e) => {
		var t = hs();
		let n;
		z(() => n = q(t, 1, "dd-caret svelte-vtocc6", null, n, { "dd-caret-open": B(f) })), U(e, t);
	}, r = Mi(t, "value", 3, null), i = Mi(t, "options", 19, () => []), a = Mi(t, "title", 3, null), o = Mi(t, "disabled", 3, !1), s = Mi(t, "filled", 3, !1), c = Mi(t, "compact", 3, !1), l = ta(), u = ra("urd-dd"), d = u.slice(2), f = /* @__PURE__ */ j(!1), p = /* @__PURE__ */ j(null), m = /* @__PURE__ */ j(null), g = /* @__PURE__ */ j($t({
		top: 0,
		left: 0,
		width: 160
	})), _ = () => i().find(([e]) => `${e ?? ""}` == `${r() ?? ""}`)?.[1] ?? "";
	function v() {
		let e = B(p).getBoundingClientRect(), t = Math.min(320, i().length * 32 + 12), n = Math.max(e.width, 160), r = e.bottom + t + 8 <= window.innerHeight;
		M(g, {
			top: r ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function y() {
		if (!o()) {
			if (B(f)) {
				M(f, !1);
				return;
			}
			v(), M(f, !0);
		}
	}
	function b(e) {
		l && B(m)?.hidePopover(), M(f, !1), t.onchange?.(e);
	}
	yn(() => {
		if (!B(f)) return;
		let e = () => {
			l ? B(m)?.hidePopover() : M(f, !1);
		};
		if (window.addEventListener("blur", e), l) return () => window.removeEventListener("blur", e);
		let t = (e) => {
			B(p) && !B(p).contains(e.target) && M(f, !1);
		}, n = (e) => {
			e.key === "Escape" && M(f, !1);
		}, r = (e) => {
			B(p) && e.target instanceof Node && !B(p).contains(e.target) && v();
		};
		return document.addEventListener("pointerdown", t, !0), document.addEventListener("keydown", n, !0), document.addEventListener("scroll", r, !0), () => {
			window.removeEventListener("blur", e), document.removeEventListener("pointerdown", t, !0), document.removeEventListener("keydown", n, !0), document.removeEventListener("scroll", r, !0);
		};
	});
	var x = bs(), S = P(x), C = (e) => {
		var t = _s(), l = F(t);
		let p;
		var g = P(l), v = I(g, !0), y = L(g, 2);
		n(y), D(l);
		var x = L(l, 2), S = P(x), C = (e) => {
			var t = Mr();
			qr(F(t), 17, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(n)[0], a = () => B(n)[1];
				var o = gs();
				let s;
				var c = I(o, !0);
				z(() => {
					s = q(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), W(c, a());
				}), V("click", o, () => b(i())), U(e, o);
			}), U(e, t);
		};
		G(S, (e) => {
			B(f) && e(C);
		}), D(x), ki(x, (e) => M(m, e), () => B(m)), z((e) => {
			p = q(l, 1, "dd-btn svelte-vtocc6", null, p, {
				"dd-filled": s(),
				"dd-compact": c()
			}), X(l, "title", a()), l.disabled = o(), X(l, "popovertarget", d), gi(l, `anchor-name: ${u ?? ""}`), W(v, e), X(x, "id", d), gi(x, `position-anchor: ${u ?? ""}`);
		}, [() => _()]), Sr("toggle", x, (e) => {
			M(f, e.newState === "open");
		}), U(e, t);
	}, ee = (e) => {
		var t = ys(), l = F(t);
		let u;
		var d = P(l), p = I(d, !0), m = L(d, 2);
		n(m), D(l);
		var v = L(l, 2), x = (e) => {
			var t = vs();
			qr(t, 21, i, ([e, t]) => `${e ?? ""}`, (e, t) => {
				var n = /* @__PURE__ */ A(() => h(B(t), 2));
				let i = () => B(n)[0], a = () => B(n)[1];
				var o = gs();
				let s;
				var c = I(o, !0);
				z(() => {
					s = q(o, 1, "dd-opt svelte-vtocc6", null, s, { selected: `${i() ?? ""}` == `${r() ?? ""}` }), W(c, a());
				}), V("click", o, () => b(i())), U(e, o);
			}), D(t), z(() => gi(t, `top: ${B(g).top ?? ""}px; left: ${B(g).left ?? ""}px; min-width: ${B(g).width ?? ""}px`)), U(e, t);
		};
		G(v, (e) => {
			B(f) && e(x);
		}), z((e) => {
			u = q(l, 1, "dd-btn svelte-vtocc6", null, u, {
				"dd-filled": s(),
				"dd-compact": c()
			}), X(l, "title", a()), l.disabled = o(), W(p, e);
		}, [() => _()]), V("click", l, y), U(e, t);
	};
	G(S, (e) => {
		l ? e(C) : e(ee, -1);
	}), D(x), ki(x, (e) => M(p, e), () => B(p)), U(e, x), Xe();
}
Cr(["click"]);
//#endregion
//#region src/lib/Choice.svelte
var xs = /* @__PURE__ */ H("<button type=\"button\"> </button>"), Ss = /* @__PURE__ */ H("<div><span class=\"choice-label svelte-1ehof1c\"> </span> <div class=\"choice-seg svelte-1ehof1c\" role=\"group\"></div></div>");
function Cs(e, t) {
	Ye(t, !0);
	let n = Mi(t, "title", 3, void 0), r = /* @__PURE__ */ A(() => t.options.length > 3 || t.options.reduce((e, [, t]) => e + `${t}`.length, 0) > 20), i = (e) => `${e ?? ""}`;
	var a = Ss();
	let o;
	var s = P(a), c = I(s, !0), l = L(s, 2);
	qr(l, 21, () => t.options, ([e, t]) => i(e), (e, n) => {
		var r = /* @__PURE__ */ A(() => h(B(n), 2));
		let a = () => B(r)[0], o = () => B(r)[1];
		var s = xs();
		let c;
		var l = I(s, !0);
		z((e, t) => {
			X(s, "aria-pressed", e), c = q(s, 1, "svelte-1ehof1c", null, c, { on: t }), W(l, o());
		}, [() => i(a()) === i(t.value), () => i(a()) === i(t.value)]), V("click", s, () => t.onchange(a())), U(e, s);
	}), D(l), D(a), z(() => {
		o = q(a, 1, "choice svelte-1ehof1c", null, o, { stacked: B(r) }), X(a, "title", n()), W(c, t.label), X(l, "aria-label", t.label);
	}), U(e, a), Xe();
}
Cr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ws = /* @__PURE__ */ H("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Ts(e, t) {
	Ye(t, !0);
	let n = Mi(t, "image", 3, ""), r = /* @__PURE__ */ j(null), i = /* @__PURE__ */ j(null), a = /* @__PURE__ */ j(1), o = /* @__PURE__ */ j(.5), s = /* @__PURE__ */ j(.5), c = /* @__PURE__ */ j(1), l = /* @__PURE__ */ j(1), u = /* @__PURE__ */ j(1);
	yn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			M(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !B(i)) return;
		e.filter = `brightness(${B(c)}) contrast(${B(l)}) saturate(${B(u)})`;
		let n = Math.max(t / B(i).width, t / B(i).height) * B(a), r = B(i).width * n, d = B(i).height * n, f = t / 2 - B(o) * r, p = t / 2 - B(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(B(i), f, p, r, d), e.filter = "none";
	}
	yn(() => {
		B(i), B(a), B(o), B(s), B(c), B(l), B(u), B(r) && d(B(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!B(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / B(i).width, 220 / B(i).height) * B(a), c = B(i).width * r, l = B(i).height * r, u = (e) => {
			M(o, Math.min(1, Math.max(0, B(o) - (e.clientX - t) / c)), !0), M(s, Math.min(1, Math.max(0, B(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		M(a, 1), M(o, .5), M(s, .5), M(c, 1), M(l, 1), M(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ws(), g = P(h), _ = P(g), v = I(_, !0), y = L(_, 2), b = P(y);
	X(b, "width", 220), X(b, "height", 220), ki(b, (e) => M(r, e), () => B(r));
	var x = I(L(b, 2), !0);
	D(y);
	var S = L(y, 2), C = P(S), ee = I(L(C));
	D(S);
	var te = L(S, 2);
	J(te);
	var w = L(te, 2), ne = P(w), re = I(L(ne));
	D(w);
	var ie = L(w, 2);
	J(ie);
	var ae = L(ie, 2), oe = P(ae), se = I(L(oe));
	D(ae);
	var T = L(ae, 2);
	J(T);
	var ce = L(T, 2), le = P(ce), ue = I(L(le));
	D(ce);
	var de = L(ce, 2);
	J(de);
	var E = L(de, 2), fe = P(E), pe = I(fe, !0), me = L(fe, 2), he = I(me, !0);
	D(E);
	var ge = L(E, 2), _e = P(ge), ve = I(_e, !0), ye = L(_e, 2), be = I(ye, !0);
	D(ge), D(g), D(h), z((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		W(v, e), X(b, "title", t), W(x, n), W(C, `${r ?? ""} `), W(ee, `${i ?? ""}x`), W(ne, `${a ?? ""} `), W(re, `${o ?? ""}%`), W(oe, `${s ?? ""} `), W(se, `${c ?? ""}%`), W(le, `${l ?? ""} `), W(ue, `${u ?? ""}%`), W(pe, d), W(he, f), W(ve, p), W(be, m);
	}, [
		() => Z("ie.title"),
		() => Z("ie.dragTip"),
		() => Z("ie.hint"),
		() => Z("lbl.zoom"),
		() => B(a).toFixed(2),
		() => Z("lbl.brightness"),
		() => Math.round(B(c) * 100),
		() => Z("lbl.contrast"),
		() => Math.round(B(l) * 100),
		() => Z("lbl.saturate"),
		() => Math.round(B(u) * 100),
		() => Z("ie.grayscale"),
		() => Z("common.reset"),
		() => Z("confirm.cancel"),
		() => Z("common.apply")
	]), V("pointerdown", b, f), Ti(te, () => B(a), (e) => M(a, e)), Ti(ie, () => B(c), (e) => M(c, e)), Ti(T, () => B(l), (e) => M(l, e)), Ti(de, () => B(u), (e) => M(u, e)), V("click", fe, () => M(u, 0)), V("click", me, p), V("click", _e, () => t.oncancel?.()), V("click", ye, m), U(e, h), Xe();
}
Cr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/0.7.4/blocks/form.js
var Es = () => [
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
], Ds = 24, Os = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function ks(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - Ds) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var As = {
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
}, js = { bildegalleri: "slideshow" }, Ms = {
	flate: "surface",
	aksent: "accent",
	invers: "inverse",
	dus: "soft",
	dempet: "muted",
	dyp: "deep",
	uthevet: "highlighted"
}, Ns = {
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
function Ps(e) {
	let t = Array.isArray(e) ? e : e.blocks ?? [];
	for (let e of t) As[e.type] && (e.type = As[e.type]);
	if (!Array.isArray(e)) {
		for (let t of e.background?.layers ?? []) js[t.type] && (t.type = js[t.type]);
		Ms[e.theme] && (e.theme = Ms[e.theme]), Ns[e.preset] && (e.preset = Ns[e.preset]);
	}
	return e;
}
var Fs = {
	1: (e) => {
		for (let t of e.sections ?? []) {
			let e = t.responsive?.mobile;
			for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = ks(e.frames.mobile, e.frames.desktop));
			e?.mode === "manual" && (e.mode = "auto");
			let n = e?.attention?.reason;
			n && Os[n] && (e.attention.reason = Os[n]);
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) Ps(t);
		return e;
	},
	3: (e) => {
		for (let t of e.sections ?? []) Ps(t);
		return e;
	}
}, Is = {
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
function Ls(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 4;) {
		let r = Is[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Rs(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 4;) {
		let i = Fs[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/plugins.js
function zs(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Bs = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Vs(e, t) {
	let n = zs(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = zs(t[2]), a = Bs(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Hs = /^[a-z0-9][a-z0-9-]*$/;
function Us(e) {
	let t = [];
	if (!e || typeof e != "object") return ["the manifest is not an object"];
	Hs.test(e.id ?? "") || t.push("id is missing or invalid"), (typeof e.name != "string" || !e.name) && t.push("name is missing"), zs(e.version ?? "") || t.push("version is not semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine is missing");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry is missing or is not a .js file"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides is missing"), e.languages !== void 0 && t.push(...zi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales must be a boolean"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names must be an object mapping language code to name"), t;
}
Promise.resolve();
//#endregion
//#region ../template/assets/engine/0.7.4/sections/presets.js
function Ws(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Gs = () => ({ mobile: {
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
}), Ks = (e, t, n = {}) => ({
	id: Ws("blk"),
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
}), qs = (e, t = {}) => ({
	id: Ws("blk"),
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
}), Js = (e, t, n = {}) => ({
	id: Ws("blk"),
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
}), Ys = (e, t, n = 40) => ({
	id: Ws("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), Xs = (e, t = {}) => ({
	id: Ws("blk"),
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
}), Zs = (e, t = {}) => ({
	id: Ws("blk"),
	type: "form",
	version: 1,
	props: {
		recipient: "",
		subject: "",
		mode: "mailto",
		endpoint: "",
		submitLabel: Z("form.sendDefault"),
		successText: Z("form.thanksDefault"),
		fields: Es(),
		...t
	},
	animation: null,
	frames: e
}), Qs = (e, t = {}) => ({
	id: Ws("blk"),
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
}), $s = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), ec = (e, t, n = {}) => ({
	id: Ws("blk"),
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
}), tc = (e, t = {}) => ({
	id: Ws("blk"),
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
}), nc = (e, t = {}) => ({
	id: Ws("blk"),
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
}), rc = (e, t = {}) => ({
	id: Ws("blk"),
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
}), ic = (e, t = {}) => ({
	id: Ws("blk"),
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
}), ac = (e, t) => ({
	id: Ws("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), oc = (e, t = {}) => ({
	id: Ws("blk"),
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
}), sc = (e, t) => ({
	id: Ws("blk"),
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
}), cc = (e, t = {}) => ({
	id: Ws("blk"),
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
}), lc = (...e) => ({
	version: 1,
	layers: e
}), uc = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), dc = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), fc = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), pc = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), mc = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = pc(e, t, n, r, i, a);
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
		y: fc(e) + 16,
		n: 0
	};
}, hc = (e, t, n) => e + t * .1 + n * .01, gc = (e, t, n, r, i = null) => ({
	id: Ws("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Gs()
});
function _c(e) {
	e.sections.define("blank", {
		label: "Empty section",
		labelKey: "preset.blank.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "A blank canvas to build on freely",
		hintKey: "preset.blank.hint",
		create: () => gc("blank", "40vh", lc(uc("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Large opening with gradient and glow, left-aligned",
		hintKey: "preset.hero.hint",
		create: () => gc("hero", "70vh", {
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
				dc(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Ks($(8.33, 40, 50, 38), Z("seed.hero.title")),
			Ks($(8.33, 84, 41.67, 26), Z("seed.hero.intro")),
			Js($(8.33, 118, 20, 32), Z("seed.readMore"))
		])
	}), e.sections.define("hero-centered", {
		label: "Hero, centred",
		labelKey: "preset.hero-centered.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Centred opening with two buttons",
		hintKey: "preset.hero-centered.hint",
		create: () => gc("hero-centered", "60vh", lc(uc("bg")), [
			Ks($(15, 64, 70, 44), Z("seed.heroCenter.title"), { align: "center" }),
			Ks($(25, 116, 50, 26), Z("seed.heroCenter.intro"), { align: "center" }),
			Js($(31.5, 160, 17, 40), Z("seed.join")),
			Js($(51.5, 160, 17, 40), Z("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("hero-image", {
		label: "Hero over a photo",
		labelKey: "preset.hero-image.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Opening over a photo that creeps slowly, with a veil under the text",
		hintKey: "preset.hero-image.hint",
		create: () => {
			let e = gc("hero-image", "70vh", {
				version: 1,
				layers: [
					uc("bg"),
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
				Ks($(8.33, 40, 50, 38), Z("seed.hero.title")),
				Ks($(8.33, 84, 41.67, 26), Z("seed.hero.intro")),
				Js($(8.33, 118, 20, 32), Z("seed.readMore"))
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
			let e = gc("hero-photos", "70vh", {
				version: 1,
				layers: [
					uc("bg"),
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
				Ks($(15, 64, 70, 44), Z("seed.heroCenter.title"), { align: "center" }),
				Ks($(25, 116, 50, 26), Z("seed.heroCenter.intro"), { align: "center" }),
				Js($(41.5, 160, 17, 40), Z("seed.readMore"))
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
		create: () => gc("images", "360px", lc(uc("bg")), [
			Ks($(4, 24, 50, 32), Z("seed.images.title")),
			qs($(4, 72, 28, 220)),
			qs($(36, 72, 28, 220)),
			qs($(68, 72, 28, 220))
		]),
		itemLabel: "image",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = mc(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [qs($(t, n, 28, 220))],
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
		create: () => gc("gallery", "440px", lc(uc("bg")), [Ks($(4, 24, 50, 32), Z("seed.gallery.title")), ic($(4, 72, 92, 320))])
	}), e.sections.define("find-us", {
		label: "Find us",
		labelKey: "preset.find-us.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Map with your address (privacy-friendly OpenStreetMap)",
		hintKey: "preset.find-us.hint",
		create: () => gc("find-us", "480px", lc(uc("bg")), [Ks($(6, 40, 60, 70), Z("seed.findUs.title")), Xs($(6, 120, 88, 360, 2))])
	}), e.sections.define("whats-on", {
		label: "What is on",
		labelKey: "preset.whats-on.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Event list from a subscribable calendar (iCal/Google)",
		hintKey: "preset.whats-on.hint",
		create: () => gc("whats-on", "520px", lc(uc("bg")), [Ks($(6, 40, 60, 70), Z("seed.whatsOn.title")), Qs($(6, 130, 88, 320, 2), { limit: 5 })])
	}), e.sections.define("contact-form", {
		label: "Contact form",
		labelKey: "preset.contact-form.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Contact form that sends via email (or your own endpoint)",
		hintKey: "preset.contact-form.hint",
		create: () => gc("contact-form", "520px", lc(uc("bg")), [Ks($(6, 40, 60, 120), Z("seed.contactForm.intro")), Zs($(6, 180, 60, 380, 2))])
	}), e.sections.define("contact", {
		label: "Contact",
		labelKey: "preset.contact.label",
		group: "Basics",
		groupKey: "presetGroup.basic",
		hint: "Contact details in a card with an email button",
		hintKey: "preset.contact.hint",
		create: () => gc("contact", "320px", lc(uc("surface"), dc(.2, .8, .2)), [
			Ks($(10, 32, 40, 36), Z("seed.contact.title")),
			Ks($(10, 84, 36, 130), Z("seed.contact.info"), { box: !0 }),
			Js($(60, 100, 22, 40), Z("seed.contact.button"), { href: `mailto:${Z("seed.email")}` })
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
				let i = Ys($(e + 10.5, 88, 4, 52), n), a = Ks($(e, 152, 25, 200), Z("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = $s(), i.mobileOrder = hc(88, t, 0), a.mobileOrder = hc(88, t, 1), [i, a];
			};
			return gc("feature-cards", "420px", lc(uc("bg")), [
				Ks($(6, 28, 60, 38), Z("seed.features.title")),
				...e(6, 0, "✦", Z("seed.features.card1")),
				...e(37.5, 1, "★", Z("seed.features.card2")),
				...e(69, 2, "✓", Z("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = mc(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = Ys($(t + 10.5, n - 64, 4, 52), "✦"), a = Ks($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = $s(), i.mobileOrder = hc(88, r, 0), a.mobileOrder = hc(88, r, 1), {
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
				let r = Ks($(e, 88, 25, 200), Z("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = $s(), r.mobileOrder = hc(88, t, 0), r;
			};
			return gc("feature-cards-simple", "360px", lc(uc("bg")), [
				Ks($(6, 28, 60, 38), Z("seed.features.title")),
				e(6, 0, Z("seed.features.card1")),
				e(37.5, 1, Z("seed.features.card2")),
				e(69, 2, Z("seed.features.card3"))
			]);
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = mc(e, 3, 6, 31.5, 88, 232, 25, 200), i = Ks($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = $s(), i.mobileOrder = hc(88, r, 0), {
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
				let n = qs($(e, 88, 25, 160)), r = Ks($(e, 256, 25, 160), Z("seed.news.card"));
				return n.mobileOrder = hc(88, t, 0), r.mobileOrder = hc(88, t, 1), [n, r];
			};
			return gc("news", "460px", lc(uc("bg")), [
				Ks($(6, 28, 50, 38), Z("seed.news.title")),
				Js($(78, 30, 16, 36), Z("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "story",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = mc(e, 3, 6, 31.5, 88, 344, 25, 328), i = qs($(t, n, 25, 160)), a = Ks($(t, n + 168, 25, 160), Z("seed.news.card"));
			return i.mobileOrder = hc(88, r, 0), a.mobileOrder = hc(88, r, 1), {
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
		create: () => gc("news-collection", "300px", lc(uc("bg")), [Ks($(6, 28, 50, 38), Z("seed.news.title")), ec($(6, 88, 88, 180), "cards")])
	}), e.sections.define("noticeboard", {
		label: "Noticeboard",
		labelKey: "preset.noticeboard.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Dated list from a collection (notices/announcements)",
		hintKey: "preset.noticeboard.hint",
		create: () => gc("noticeboard", "300px", lc(uc("surface")), [Ks($(6, 28, 50, 38), Z("seed.noticeboard.title")), ec($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publication-archive", {
		label: "Publication archive",
		labelKey: "preset.publication-archive.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Year-grouped archive from a collection (issues, minutes, reports)",
		hintKey: "preset.publication-archive.hint",
		create: () => gc("publication-archive", "300px", lc(uc("bg")), [Ks($(6, 28, 60, 38), Z("seed.archive.title")), ec($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("events", {
		label: "Events",
		labelKey: "preset.events.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Three rows with date badge and sign-up button",
		hintKey: "preset.events.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Ks($(6, e, 8, 88), Z("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Ks($(16, e, 58, 88), Z("seed.events.row", { title: r })),
				Js($(78, e + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
			];
			return gc("events", "440px", lc(uc("surface")), [
				Ks($(6, 28, 50, 38), Z("seed.events.title")),
				...e(88, "11", Z("seed.events.monthAug"), Z("seed.events.row1")),
				...e(196, "25", Z("seed.events.monthAug"), Z("seed.events.row2")),
				...e(304, "8", Z("seed.events.monthSep"), Z("seed.events.row3"))
			]);
		},
		itemLabel: "row",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = fc(e) + 16;
			return {
				blocks: [
					Ks($(6, t, 8, 88), Z("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Ks($(16, t, 58, 88), Z("seed.events.row", { title: Z("seed.events.newTitle") })),
					Js($(78, t + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
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
				let r = qs($(e, 80, 22, 180), { alt: Z("seed.team.alt") }), i = Ks($(e, 268, 22, 84), Z("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = hc(80, t, 0), i.mobileOrder = hc(80, t, 1), [r, i];
			};
			return gc("team", "420px", lc(uc("surface")), [
				Ks($(6, 24, 50, 32), Z("seed.team.title")),
				...e(7.5, 0, Z("seed.team.role1")),
				...e(39, 1, Z("seed.team.role2")),
				...e(70.5, 2, Z("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = mc(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = qs($(t, n, 22, 180), { alt: Z("seed.team.alt") }), a = Ks($(t, n + 188, 22, 84), Z("seed.team.member", { role: Z("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = hc(80, r, 0), a.mobileOrder = hc(80, r, 1), {
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
		create: () => gc("faq", "520px", lc(uc("bg")), [
			Ks($(25, 24, 50, 36), Z("seed.faq.title"), { align: "center" }),
			ac($(20, 80, 60, 320), [
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
			Ks($(20, 416, 60, 32), Z("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("timeline", {
		label: "Timeline",
		labelKey: "preset.timeline.label",
		group: "Cards and lists",
		groupKey: "presetGroup.cards",
		hint: "Your story as events along a line",
		hintKey: "preset.timeline.hint",
		create: () => gc("timeline", "480px", lc(uc("bg")), [Ks($(25, 24, 50, 36), Z("seed.timeline.title"), { align: "center" }), sc($(25, 88, 50, 330), [
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
				let r = Ks($(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Ks($(e, 168, 25, 160), Z("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = hc(88, t, 0), i.mobileOrder = hc(88, t, 1), [r, i];
			};
			return gc("steps", "400px", lc(uc("bg")), [
				Ks($(6, 28, 60, 38), Z("seed.steps.title")),
				...e(6, 0, Z("seed.steps.s1")),
				...e(37.5, 1, Z("seed.steps.s2")),
				...e(69, 2, Z("seed.steps.s3"))
			]);
		},
		itemLabel: "step",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = mc(e, 3, 6, 31.5, 88, 272, 25, 240), i = Ks($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Ks($(t, n + 80, 25, 160), Z("seed.steps.card", { title: Z("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = hc(88, r, 0), a.mobileOrder = hc(88, r, 1), {
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
				qs($(6, 40, 55, 300)),
				Ks($(6, 348, 55, 108), Z("seed.feature.main")),
				Js($(6, 464, 14, 38), Z("seed.readMore"), { style: "secondary" }),
				qs($(66, 40, 28, 120)),
				Ks($(66, 164, 28, 60), Z("seed.feature.small1")),
				qs($(66, 244, 28, 120)),
				Ks($(66, 368, 28, 60), Z("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = hc(40, t < 3 ? 0 : 1, t);
			}), gc("lead-story", "540px", lc(uc("bg")), e);
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
					qs($(e, 88, 25, 200)),
					Ks($(e, 296, 25, 76), Z("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					Js($(e + 5, 380, 15, 40), Z("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = hc(88, t, n);
				}), i;
			};
			return gc("products", "470px", lc(uc("bg")), [
				Ks($(6, 28, 50, 38), Z("seed.products.title")),
				...e(6, 0, Z("seed.products.name"), Z("seed.products.price1")),
				...e(37.5, 1, Z("seed.products.name"), Z("seed.products.price2")),
				...e(69, 2, Z("seed.products.name"), Z("seed.products.price3"))
			]);
		},
		itemLabel: "product",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = mc(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				qs($(t, n, 25, 200)),
				Ks($(t, n + 208, 25, 76), Z("seed.products.card", {
					name: Z("seed.products.name"),
					price: Z("seed.products.price1")
				}), { align: "center" }),
				Js($(t + 5, n + 292, 15, 40), Z("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = hc(88, r, t);
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
		create: () => gc("shop", "544px", lc(uc("bg")), [
			Ks($(6, 28, 50, 38), Z("seed.shop.title")),
			nc($(78, 88, 16, 48)),
			tc($(6, 176, 88, 320))
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
				Ks($(6, 48, 52, 96), Z("seed.shopHero.title")),
				Ks($(6, 152, 40, 48), Z("seed.shopHero.sub")),
				Js($(6, 216, 17, 42), Z("seed.shopHero.cta")),
				qs($(62, 40, 32, 300))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = hc(48, t < 3 ? 0 : 1, t);
			}), gc("shop-hero", "400px", {
				version: 1,
				layers: [
					uc("bg"),
					dc(.8, .25, .28, .6),
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
				let r = qs($(e, 88, 21, 170)), i = Ks($(e, 266, 21, 34), Z("seed.shopCategories.tile", { name: n }), { align: "center" });
				return r.mobileOrder = hc(88, t, 0), i.mobileOrder = hc(88, t, 1), [r, i];
			}, t = gc("shop-categories", "360px", lc(uc("bg")), [
				Ks($(6, 28, 60, 38), Z("seed.shopCategories.title")),
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
			let { x: t, y: n, n: r } = mc(e, 4, 6, 23.5, 88, 220, 21, 212), i = qs($(t, n, 21, 170)), a = Ks($(t, n + 178, 21, 34), Z("seed.shopCategories.tile", { name: Z("seed.shopCategories.newCat") }), { align: "center" });
			return i.mobileOrder = hc(88, r, 0), a.mobileOrder = hc(88, r, 1), {
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
				let i = Ys($(e + 10.5, 88, 4, 52), r, 44), a = Ks($(e, 148, 25, 96), Z(n), { align: "center" });
				return i.mobileOrder = hc(88, t, 0), a.mobileOrder = hc(88, t, 1), [i, a];
			}, t = gc("shop-trust", "300px", lc(uc("bg")), [
				Ks($(6, 28, 60, 38), Z("seed.shopTrust.title")),
				...e(6, 0, "seed.shopTrust.t1", "✓"),
				...e(37.5, 1, "seed.shopTrust.t2", "↻"),
				...e(69, 2, "seed.shopTrust.t3", "✉")
			]);
			return t.theme = "muted", t;
		},
		itemLabel: "card",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = mc(e, 3, 6, 31.5, 148, 216, 25, 156, -60), i = Ys($(t + 10.5, n - 60, 4, 52), "✓", 44), a = Ks($(t, n, 25, 96), Z("seed.shopTrust.newItem"), { align: "center" });
			return i.mobileOrder = hc(88, r, 0), a.mobileOrder = hc(88, r, 1), {
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
				Ks($(6, 56, 52, 100), Z("seed.shopShowcase.title")),
				Ks($(6, 164, 42, 56), Z("seed.shopShowcase.text")),
				Js($(6, 236, 18, 42), Z("seed.shopShowcase.cta")),
				qs($(62, 48, 32, 240))
			];
			e.forEach((e, t) => {
				e.mobileOrder = hc(56, t < 3 ? 0 : 1, t);
			});
			let t = gc("shop-showcase", "340px", lc(uc("bg")), e);
			return t.theme = "deep", t;
		}
	}), e.sections.define("checkout", {
		label: "Checkout",
		labelKey: "preset.checkout.label",
		group: "Shop",
		groupKey: "presetGroup.shop",
		hint: "Order form that sends the basket as an email or to an endpoint",
		hintKey: "preset.checkout.hint",
		create: () => gc("checkout", "560px", lc(uc("bg")), [Ks($(6, 28, 50, 38), Z("seed.checkout.title")), rc($(25, 96, 50, 430))])
	}), e.sections.define("cta", {
		label: "CTA banner",
		labelKey: "preset.cta.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Full width with one clear action",
		hintKey: "preset.cta.hint",
		create: () => gc("cta", "280px", lc(uc("surface"), dc(.5, .5, .3, .7)), [
			Ks($(20, 56, 60, 40), Z("seed.cta.title"), { align: "center" }),
			Ks($(25, 104, 50, 26), Z("seed.cta.sub"), { align: "center" }),
			Js($(42, 148, 16, 42), Z("seed.join"))
		])
	}), e.sections.define("quote", {
		label: "Quote",
		labelKey: "preset.quote.label",
		group: "Highlight",
		groupKey: "presetGroup.highlight",
		hint: "Large quote with attribution",
		hintKey: "preset.quote.hint",
		create: () => gc("quote", "300px", lc(uc("bg")), [oc($(20, 56, 60, 190), {
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
				let a = cc($(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = hc(76, t, 0), a;
			};
			return gc("stats", "260px", lc(uc("surface")), [
				e(6, 0, "120", "+", Z("seed.stats.l1")),
				e(37.5, 1, "25", "", Z("seed.stats.l2")),
				e(69, 2, "1981", "", Z("seed.stats.l3"))
			]);
		},
		itemLabel: "number",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = mc(e, 3, 6, 31.5, 76, 140, 25, 120), i = cc($(t, n, 25, 120), {
				value: "42",
				label: Z("seed.stats.newLabel")
			});
			return i.mobileOrder = hc(76, r, 0), {
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
			let e = (e) => qs($(e, 108, 18.5, 100), {
				alt: Z("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return gc("sponsors", "280px", lc(uc("bg")), [
				Ks($(6, 28, 60, 36), Z("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = mc(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [qs($(t, n, 18.5, 100), {
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
		create: () => gc("membership", "500px", lc(uc("surface")), [
			Ks($(6, 28, 50, 38), Z("seed.membership.title")),
			Ks($(14, 88, 32, 250), Z("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Ks($(54, 88, 32, 250), Z("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			Js($(42, 358, 16, 42), Z("seed.join")),
			Ks($(25, 414, 50, 30), Z("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.7.4/templates-model.js
var vc = [
	"section",
	"blocks",
	"page"
];
function yc(e) {
	return Ra(String(e ?? ""), "");
}
function bc(e, t, { id: n, title: r }) {
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
var xc = [
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
function Sc(e) {
	let t = String(e ?? "");
	return /[",\n\r]/.test(t) ? `"${t.replaceAll("\"", "\"\"")}"` : t;
}
function Cc(e, t) {
	return t === "sizes" ? (e.sizes ?? []).join("|") : t === "colors" ? (e.colors ?? []).map((e) => e.name).join("|") : e[t] ?? "";
}
function wc(e) {
	let t = [xc.join(",")];
	for (let n of e ?? []) t.push(xc.map((e) => Sc(Cc(n, e))).join(","));
	return t.join("\n") + "\n";
}
function Tc(e) {
	let t = [], n = [], r = "", i = !1, a = String(e ?? "");
	for (let e = 0; e < a.length; e += 1) {
		let o = a[e];
		i ? o === "\"" && a[e + 1] === "\"" ? (r += "\"", e += 1) : o === "\"" ? i = !1 : r += o : o === "\"" ? i = !0 : o === "," ? (n.push(r), r = "") : o === "\n" || o === "\r" ? (o === "\r" && a[e + 1] === "\n" && (e += 1), n.push(r), t.push(n), n = [], r = "") : r += o;
	}
	return (r !== "" || n.length) && (n.push(r), t.push(n)), t.filter((e) => e.some((e) => e.trim() !== ""));
}
var Ec = (e) => String(e ?? "").split("|").map((e) => e.trim()).filter(Boolean);
function Dc(e) {
	let t = Tc(e);
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
		let s = Ec(t.sizes);
		s.length && (o.sizes = s);
		let c = Ec(t.colors);
		c.length && (o.colors = c.map((e) => ({ name: e }))), r.push(o);
	}
	return {
		entries: r,
		skipped: i
	};
}
//#endregion
//#region ../template/assets/engine/0.7.4/feeds.js
function Oc(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function kc(e, t) {
	let n = String(t ?? "").replace(/\/+$/, "");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${(e ?? []).filter((e) => !e.noindex).map((e) => `  <url><loc>${Oc(n + (e.path === "/" ? "/" : e.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
function Ac(e) {
	return `User-agent: *\nDisallow: /admin/\n\nSitemap: ${String(e ?? "").replace(/\/+$/, "")}/sitemap.xml\n`;
}
var jc = [
	"news",
	"notices",
	"publications"
];
function Mc(e) {
	let t = String(e.origin ?? "").replace(/\/+$/, ""), n = (e.items ?? []).map((n) => {
		let r = n.href ? new URL(n.href, t + "/").href : t + "/", i = n.date ? new Date(n.date) : null, a = i && !Number.isNaN(i.getTime()) ? `\n      <pubDate>${i.toUTCString()}</pubDate>` : "", o = n.text ? `\n      <description>${Oc(n.text)}</description>` : "";
		return `    <item>\n      <title>${Oc(n.title)}</title>\n      <link>${Oc(r)}</link>\n      <guid isPermaLink="false">${Oc(`${e.path}#${n.id ?? n.title}`)}</guid>${o}${a}\n    </item>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${Oc(e.title)}</title>\n    <link>${Oc(t + "/")}</link>\n    <description>${Oc(e.description ?? e.title)}</description>\n${n}${n ? "\n" : ""}  </channel>\n</rss>\n`;
}
function Nc(e) {
	return Number(e) === 2 ? 2 : 1;
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-layout.js
var Pc = [
	"floating",
	"fill",
	"band",
	"mosaic"
], Fc = [
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
], Ic = [
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
], Lc = [
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
], Rc = [
	"square",
	"circle",
	"triangle",
	"diamond",
	"hexagon",
	"octagon",
	"star",
	"heart"
], zc = {
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
}, Bc = {
	floating: "drift",
	fill: "none",
	mosaic: "crossfade",
	band: "none"
}, Vc = {
	min: 1,
	max: 20,
	dflt: 8
}, Hc = {
	min: 60,
	max: 400
}, Uc = {
	floating: 140,
	band: 156,
	mosaic: 140,
	fill: 0
}, Wc = {
	polaroid: "#ffffff",
	border: "#ffffff",
	thick: "#ffffff",
	double: "#ffffff",
	dark: "#161616",
	glow: "accent"
}, Gc = 1.35, Kc = {
	min: 0,
	max: 1,
	dflt: .85
}, qc = {
	min: 0,
	max: 15,
	dflt: 5
}, Jc = {
	min: 0,
	max: 48,
	dflt: 5
}, Yc = {
	min: .5,
	max: 90,
	dflt: 30
}, Xc = {
	min: .5,
	max: 90,
	dflt: 12
}, Zc = {
	min: 4,
	max: 20,
	dflt: 12
};
function Qc(e) {
	let t = String(e), n = 5381;
	for (let e = 0; e < t.length; e++) n = (n << 5) + n + t.charCodeAt(e) >>> 0;
	return n;
}
function $c(e, t) {
	let n = Qc(`${e}:${t}`);
	return n ^= n >>> 15, n = Math.imul(n, 739982445) >>> 0, n ^= n >>> 12, n = Math.imul(n, 695872825) >>> 0, n ^= n >>> 15, (n >>> 0) / 4294967296;
}
function el(e) {
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
function tl(e) {
	return Array.from({ length: Math.max(1, Math.round(Number(e) || 0)) }, (e, t) => ({ src: el(t) }));
}
var nl = (e) => Math.round(e * 100) / 100;
function rl(e, { min: t, max: n, dflt: r }) {
	if (e == null || e === "") return r;
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
}
function il(e) {
	return Pc.includes(e) ? e : "floating";
}
function al(e, t) {
	let n = il(e);
	return zc[n].includes(t) ? t : Bc[n];
}
function ol(e) {
	return zc[il(e)];
}
function sl({ style: e = "floating", motion: t, reducedMotion: n = !1 } = {}) {
	return n ? !1 : il(e) === "band" || al(e, t) !== "none";
}
function cl(e, t, n, r = !1) {
	let i = Math.round(rl(e, il(t) === "mosaic" ? Zc : Vc)), a = Number(n);
	return !r && Number.isFinite(a) && a > 0 ? Math.min(i, a) : i;
}
function ll(e, t) {
	let n = Uc[il(t)] || Uc.floating;
	return Math.round(rl(e, {
		...Hc,
		dflt: n
	}));
}
function ul(e) {
	return pl(e) in Wc;
}
function dl(e, t) {
	let n = Wc[pl(e)] ?? "";
	return n && typeof t == "string" && t.trim() ? t.trim() : n;
}
function fl(e) {
	return Fc.includes(e) ? e : "rect";
}
function pl(e) {
	return Ic.includes(e) ? e : "shadow";
}
function ml(e) {
	return Lc.includes(e) ? e : "natural";
}
function hl(e, t) {
	if (pl(t) === "polaroid") return .84;
	let n = fl(e);
	return Rc.includes(n) ? 1 : n === "arch" ? .8 : Gc;
}
function gl(e) {
	return ["rect", "square"].includes(fl(e));
}
function _l(e) {
	return rl(e, Xc);
}
function vl(e) {
	return rl(e, Kc);
}
function yl(e) {
	return rl(e, qc);
}
function bl(e) {
	return Math.round(rl(e, Jc));
}
function xl(e) {
	return rl(e, Yc);
}
function Sl(e) {
	return Nc(e);
}
function Cl(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : Number(t) || 1;
}
function wl(e, { count: t, seed: n, size: r, spread: i, tilt: a, style: o = "floating", repeat: s = !1 } = {}) {
	let c = (Array.isArray(e) ? e : []).filter((e) => e && typeof e.src == "string" && e.src), l = cl(t, o, c.length, s), u = ll(r, o), d = vl(i), f = yl(a), p = n == null || n === "" ? 1 : n, m = Math.ceil(Math.sqrt(l * 1.6)), h = Math.ceil(l / m), g = Array.from({ length: m * h }, (e, t) => t).map((e) => ({
		cell: e,
		at: $c(p, `cell${e}`)
	})).sort((e, t) => e.at - t.at).map((e) => e.cell), _ = [];
	for (let e = 0; e < l; e++) {
		let t = g[e], n = (t % m + .5) / m + ($c(p, `x${e}`) - .5) * (.9 / m), r = (Math.floor(t / m) + .5) / h + ($c(p, `y${e}`) - .5) * (.9 / h);
		_.push({
			src: c.length ? c[e % c.length].src : "",
			index: c.length ? e % c.length : -1,
			x: nl(50 + (n - .5) * 100 * d),
			y: nl(50 + (r - .5) * 100 * d),
			w: Math.round(u * (.8 + $c(p, `w${e}`) * .4)),
			rot: Tl(p, e, f),
			phase: nl($c(p, `p${e}`)),
			heading: nl($c(p, `h${e}`))
		});
	}
	return _;
}
function Tl(e, t, n) {
	return nl(($c(e == null || e === "" ? 1 : e, `r${t}`) - .5) * 2 * yl(n));
}
function El(e, t) {
	let n = e == null || e === "" ? 1 : e, r = $c(n, `m${t}`);
	return {
		cols: r < .3 ? 2 : 1,
		rows: r > .7 || r < .1 ? 2 : 1,
		phase: nl($c(n, `mp${t}`))
	};
}
function Dl(e, t, n, r = !1) {
	let i = cl(e, "mosaic", n, r);
	return Array.from({ length: i }, (e, n) => El(t, n));
}
//#endregion
//#region ../template/assets/engine/0.7.4/preset-thumb.js
var Ol = /^#[0-9a-fA-F]{3,8}$/, kl = /^[a-z][a-z0-9-]*$/, Al = "#171c26", jl = "#232a38", Ml = "#98a1b3", Nl = "#7c5cff", Pl = (e, t) => `var(--urd-color-${e}, ${t})`;
function Fl(e, t) {
	return typeof e == "string" ? Ol.test(e) ? e : kl.test(e) ? Pl(e, t) : t : t;
}
function Il(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Ll = (e) => Math.round(e * 10) / 10, Rl = (e, t, n) => Math.min(n, Math.max(t, e)), zl = (e, t, n, r, i, a = "") => `<rect x="${Ll(e)}" y="${Ll(t)}" width="${Ll(Math.max(n, 1))}" height="${Ll(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Bl(e) {
	if (e?.theme) return e.theme === "inverse" || e.theme === "deep" ? Pl("text", Ml) : e.theme === "accent" ? Pl("accent", Nl) : Pl("surface", jl);
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Fl(t.props?.value, Al);
		if (t.type === "gradient") return Fl(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Al);
	}
	return Pl("bg", Al);
}
function Vl(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Pl("text", Ml), c = [];
	i?.box && c.push(zl(e, t, n, r, Pl("surface", jl), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Rl(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(zl(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${Ll(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Hl(e, t, n, r, i = !1) {
	let a = Pl("text", Ml), o = [];
	i ? (o.push(zl(e, t, n, r, Pl("surface", jl), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${Ll(e + .4)}" y="${Ll(t + .4)}" width="${Ll(Math.max(n - .8, 1))}" height="${Ll(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(zl(e, t, n, r, Pl("surface", jl), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => Ll(e + n * t), l = (e) => Ll(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${Ll(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${Ll(s + .1)}"/>`), o.join("");
}
function Ul(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Hl(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function Wl(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(zl(s, t, a, r * .55, Pl("surface", jl), " rx=\"1.5\"")), o.push(zl(s, t + r * .62, a * .8, 2, Pl("text", Ml), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function Gl(e, t, n, r, i) {
	let a = Fl(i?.color, Nl), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Ll(e + n / 2)}" cy="${Ll(t + r / 2)}" rx="${Ll(Math.max(n / 2, 1))}" ry="${Ll(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Ll(e)},${Ll(t + r)} ${Ll(e + n / 2)},${Ll(t)} ${Ll(e + n)},${Ll(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? zl(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : zl(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function Kl(e, t, n, r, i, a) {
	if (e === "text") return Vl(t, n, r, i, a);
	if (e === "image") return Hl(t, n, r, i, !a?.src);
	if (e === "gallery") return Ul(t, n, r, i, a);
	if (e === "collection") return Wl(t, n, r, i);
	if (e === "faq") {
		let e = Rl(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(zl(t, e, r, o, Pl("surface", jl), " rx=\"1\"")), s.push(zl(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Pl("text", Ml), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${Ll(t + r * .92)}" cy="${Ll(e + o / 2)}" r="0.9" fill="${Pl("text", Ml)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return Gl(t, n, r, i, a);
	if (e === "button") return zl(t, n, r, i, Pl("accent", Nl), ` rx="${Ll(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Ll(t + r / 2)}" cy="${Ll(n + i / 2)}" r="${Ll(e)}" fill="${Pl("accent", Nl)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [zl(t, n, r, i, Pl("surface", jl), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Ll(a - s / 2)},${Ll(o - s)} ${Ll(a - s / 2)},${Ll(o + s)} ${Ll(a + s)},${Ll(o)}" fill="${Pl("text", Ml)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "timeline") {
		let e = [zl(t + 1, n, 1.4, i, Pl("accent", Nl), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Ll(t + 1.7)}" cy="${Ll(o)}" r="1.6" fill="${Pl("accent", Nl)}"/>`), e.push(zl(t + 5, o - 1, r * .5, 2, Pl("text", Ml), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "quote") return [
		`<text x="${Ll(t + r / 2)}" y="${Ll(n + i * .34)}" text-anchor="middle" font-size="${Ll(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Pl("accent", Nl)}">“</text>`,
		zl(t + r * .15, n + i * .48, r * .7, 2, Pl("text", Ml), " opacity=\"0.6\" rx=\"1\""),
		zl(t + r * .25, n + i * .62, r * .5, 2, Pl("text", Ml), " opacity=\"0.6\" rx=\"1\""),
		zl(t + r * .35, n + i * .82, r * .3, 1.6, Pl("text", Ml), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "ribbon") return [
		zl(t, n + i * .3, r, i * .4, Pl("accent", Nl), " opacity=\"0.85\" rx=\"1\""),
		zl(t + r * .08, n + i * .46, r * .18, 1.8, Pl("bg", Al), " opacity=\"0.9\" rx=\"0.9\""),
		zl(t + r * .34, n + i * .46, r * .24, 1.8, Pl("bg", Al), " opacity=\"0.9\" rx=\"0.9\""),
		zl(t + r * .66, n + i * .46, r * .2, 1.8, Pl("bg", Al), " opacity=\"0.9\" rx=\"0.9\"")
	].join("");
	if (e === "stats") return [zl(t + r * .28, n + i * .15, r * .44, i * .42, Pl("accent", Nl), " opacity=\"0.85\" rx=\"1\""), zl(t + r * .32, n + i * .72, r * .36, 1.6, Pl("text", Ml), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "table") {
		let e = Math.max(1.6, i * .22), a = [zl(t, n, r, e, Pl("accent", Nl), " opacity=\"0.5\" rx=\"0.8\"")], o = Rl(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(zl(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Pl("text", Ml), " opacity=\"0.3\""));
		return a.push(zl(t + r * .33, n, .6, i, Pl("text", Ml), " opacity=\"0.2\"")), a.push(zl(t + r * .66, n, .6, i, Pl("text", Ml), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "share") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${Ll(t + e + r * (e * 2 + 1.5))}" cy="${Ll(n + i / 2)}" r="${Ll(e)}" fill="${Pl("accent", Nl)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "countdown") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(zl(s, n, a, i, Pl("surface", jl), " rx=\"1\"")), o.push(zl(s + a * .25, n + i * .2, a * .5, i * .35, Pl("accent", Nl), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [zl(t, n, r, i, Pl("surface", jl), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${Ll(t + r * .06)},${Ll(a - o)} ${Ll(t + r * .06)},${Ll(a + o)} ${Ll(t + r * .06 + o * 1.4)},${Ll(a)}" fill="${Pl("accent", Nl)}" opacity="0.85"/>`), e.push(zl(t + r * .2, a - .6, r * .7, 1.2, Pl("text", Ml), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	if (e === "product") {
		let e = Math.max(.8, r * .03), a = (r - e * 2) / 3, o = [];
		for (let r = 0; r < 3; r += 1) {
			let s = t + r * (a + e);
			o.push(zl(s, n, a, i, Pl("surface", jl), " rx=\"1\"")), o.push(zl(s + a * .08, n + i * .06, a * .84, i * .42, Pl("text", Ml), " opacity=\"0.15\" rx=\"0.8\"")), o.push(zl(s + a * .08, n + i * .56, a * .6, 1.4, Pl("text", Ml), " opacity=\"0.5\" rx=\"0.7\"")), o.push(zl(s + a * .08, n + i * .72, a * .35, 1.4, Pl("accent", Nl), " opacity=\"0.85\" rx=\"0.7\"")), o.push(zl(s + a * .08, n + i * .84, a * .84, i * .1, Pl("accent", Nl), " opacity=\"0.6\" rx=\"1\""));
		}
		return o.join("");
	}
	if (e === "cart") {
		let e = Math.max(1.5, Math.min(r, i) / 2.4), a = t + r / 2, o = n + i / 2;
		return [
			`<circle cx="${Ll(a)}" cy="${Ll(o)}" r="${Ll(e)}" fill="${Pl("surface", jl)}"/>`,
			zl(a - e * .5, o - e * .25, e, e * .55, Pl("text", Ml), " opacity=\"0.5\" rx=\"0.4\""),
			`<circle cx="${Ll(a + e * .75)}" cy="${Ll(o - e * .75)}" r="${Ll(Math.max(.9, e * .35))}" fill="${Pl("accent", Nl)}"/>`
		].join("");
	}
	return e === "checkout" ? [
		zl(t, n, r * .7, 1.2, Pl("text", Ml), " opacity=\"0.5\" rx=\"0.6\""),
		zl(t, n + i * .12, r * .5, 1.2, Pl("text", Ml), " opacity=\"0.35\" rx=\"0.6\""),
		zl(t, n + i * .3, r, i * .14, Pl("surface", jl), " rx=\"1\""),
		zl(t, n + i * .5, r, i * .14, Pl("surface", jl), " rx=\"1\""),
		zl(t, n + i * .78, r * .45, i * .16, Pl("accent", Nl), " opacity=\"0.85\" rx=\"1.2\"")
	].join("") : zl(t, n, r, i, Pl("surface", jl), " rx=\"1.5\"");
}
function ql(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Il(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [zl(0, 0, t, n, Bl(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Ll(Rl(e.x ?? .5, 0, 1) * t)}" cy="${Ll(Rl(e.y ?? .3, 0, 1) * n)}" r="${Ll(t * Rl(e.radius ?? .5, .1, 1) * .5)}" fill="${Fl(e.color, Nl)}" opacity="${Ll(Rl(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "slideshow") continue;
		let e = r.props ?? {}, i = e.style ?? "floating", a = Pl("surface", jl);
		if (i === "floating") {
			let r = e.look === "polaroid", s = t * (r ? .17 : .13), c = s / (r ? .84 : 1.35);
			for (let r of wl(e.images, {
				...e,
				seed: e.seed || 1,
				style: i
			})) {
				let e = r.x / 100 * t - s / 2, i = r.y / 100 * n - c / 2, l = ` rx="1" opacity="0.75" transform="rotate(${Ll(r.rot)} ${Ll(e + s / 2)} ${Ll(i + c / 2)})"`;
				o.push(zl(e, i, s, c, a, l));
			}
		} else if (i === "band") {
			let r = Number(e.rows) === 1 ? 1 : 2, i = n * (r === 1 ? .4 : .3), s = i * 1.33;
			for (let e = 0; e < r; e += 1) {
				let c = r === 1 ? (n - i) / 2 : n * .1 + e * (i + n * .1);
				for (let n = -s * (e * .5); n < t; n += s + 3) o.push(zl(n, c, s, i, a, " rx=\"1\" opacity=\"0.75\""));
			}
		} else if (i === "mosaic") {
			let r = (t - 10) / 4, i = n / 3.4, s = 0, c = 0;
			for (let t of Dl(e.count, e.seed || 1)) {
				s + t.cols > 4 && (s = 0, c += 1);
				let e = 2 + c * (i + 2);
				if (e > n) break;
				o.push(zl(2 + s * (r + 2), e, r * t.cols + 2 * (t.cols - 1), i * t.rows + 2 * (t.rows - 1), a, " rx=\"1\" opacity=\"0.75\"")), s += t.cols, s >= 4 && (s = 0, c += 1);
			}
		}
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Rl(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Rl((r.y ?? 0) * a, 0, n - 2), u = Rl((r.w ?? 10) * (c / 100), 2, t - i), d = Rl((r.h ?? 20) * a, 2, n - l);
		o.push(Kl(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function Jl(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${zl(0, 0, t, n, Pl("bg", Al))}</svg>`;
	let a = i.map((e) => Rl(Il(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Ll(l)})">${ql(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.7.4/page-presets.js
var Yl = /* @__PURE__ */ new Map();
_c({ sections: { define: (e, t) => Yl.set(e, t) } });
var Xl = [
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
function Zl(e, { pageId: t, title: n }) {
	let r = Xl.find((t) => t.id === e);
	return r ? {
		schemaVersion: 4,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Yl.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.7.4/palette-search.js
function Ql(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function $l(e, t) {
	let n = Ql(t).trim(), r = Ql(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function eu(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: $l(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.7.4/theme.js
function tu(e, t, n) {
	return t === "light" || t === "dark" ? t : n ? "dark" : "light";
}
function nu(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var ru = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function iu(e) {
	return typeof e == "string" && ru.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function au(e) {
	let t = e.tokens || {}, n = nu(e, "light"), r = nu(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			iu(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && iu(u) && iu(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && iu(u) && iu(d) && s.push({
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
	].some((e) => iu(e.color?.["accent-text"])) && iu(t.color?.accent);
	u && iu(t.color?.bg) && (a.push(`  --urd-color-accent-text: ${t.color.bg};`), a.push(`  --urd-base-accent-text: ${t.color.bg};`));
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
function ou(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var su = {
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
}, cu = {
	surface: "sectionTheme.surface",
	accent: "sectionTheme.accent",
	inverse: "sectionTheme.inverse",
	soft: "sectionTheme.soft",
	muted: "sectionTheme.muted",
	deep: "sectionTheme.deep",
	highlighted: "sectionTheme.highlighted"
};
[...new Set(Object.values(su).flatMap(Object.keys))];
function lu(e) {
	return su[e] ?? {};
}
function uu(e) {
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
function du(e, t) {
	let n = uu(e), r = uu(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/color.js
var fu = {
	version: 1,
	label: "Colour",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = ou(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, pu = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function mu(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function hu(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function gu(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function _u(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${ou(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function vu(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (pu[t] ?? []).includes(e.animation) ? e.animation : null, r = mu(e.stops), i = r.map((e) => `${ou(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: hu(r),
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
var yu = /* @__PURE__ */ new Set(), bu = !1;
function xu(e) {
	yu.add(e), !(bu || typeof window > "u") && (bu = !0, window.addEventListener("resize", () => {
		for (let e of [...yu]) e() || yu.delete(e);
	}));
}
var Su = !1;
function Cu() {
	if (!Su) {
		Su = !0;
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
var wu = {
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
		let n = vu(t);
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
					let e = gu(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = _u(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), xu(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Cu());
	}
}, Tu = {
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
		let n = ou(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Eu = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Du = {
	version: 1,
	label: "Grain",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Eu, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Ou = [
	"dots",
	"grid",
	"diagonal",
	"checks",
	"waves",
	"zigzag",
	"plus",
	"triangles"
], ku = {
	min: 8,
	max: 160,
	dflt: 28
}, Au = .12, ju = {
	dots: "<circle cx=\"12\" cy=\"12\" r=\"3\"/>",
	grid: "<rect width=\"24\" height=\"1.6\"/><rect width=\"1.6\" height=\"24\"/>",
	diagonal: "<path d=\"M-6 6L6 -6M0 24L24 0M18 30L30 18\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
	checks: "<rect width=\"12\" height=\"12\"/><rect x=\"12\" y=\"12\" width=\"12\" height=\"12\"/>",
	waves: "<path d=\"M0 12Q6 4 12 12T24 12\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	zigzag: "<path d=\"M0 16L6 8L12 16L18 8L24 16\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\"/>",
	plus: "<path d=\"M12 7V17M7 12H17\" fill=\"none\" stroke=\"#000\" stroke-width=\"2.4\" stroke-linecap=\"round\"/>",
	triangles: "<path d=\"M0 24L12 4L24 24Z\"/>"
};
function Mu(e) {
	return Ou.includes(e) ? e : "dots";
}
function Nu(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? ku.dflt : Math.min(ku.max, Math.max(ku.min, Math.round(t)));
}
function Pu(e) {
	let t = Number(e);
	return Number.isFinite(t) ? (Math.round(t) % 360 + 360) % 360 : 0;
}
function Fu(e) {
	let t = Number(e);
	return e == null || e === "" || !Number.isFinite(t) ? Au : Math.min(1, Math.max(0, t));
}
function Iu(e = {}) {
	let t = Nu(e.size), n = Pu(e.rotation), r = ju[Mu(e.pattern)], i = `<pattern id="p" width="${t}" height="${t}" patternUnits="userSpaceOnUse"${n ? ` patternTransform="rotate(${n})"` : ""}><g transform="scale(${t / 24})">${r}</g></pattern>`, a = "<rect width=\"100%\" height=\"100%\" fill=\"url(#p)\"/>";
	return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs>${i}</defs>${e.invert === !0 ? `<mask id="m"><rect width="100%" height="100%" fill="#fff"/>${a}</mask><rect width="100%" height="100%" mask="url(#m)"/>` : a}</svg>`;
}
var Lu = () => typeof CSS < "u" && typeof CSS.supports == "function" && (CSS.supports("mask-image", "none") || CSS.supports("-webkit-mask-image", "none")), Ru = {
	version: 1,
	label: "Pattern",
	labelKey: "bgLayer.pattern",
	defaults: () => ({
		pattern: "dots",
		color: "text",
		size: ku.dflt,
		opacity: Au,
		rotation: 0,
		invert: !1
	}),
	migrations: {},
	render(e, t) {
		if (!Lu()) return;
		let n = `url("data:image/svg+xml,${encodeURIComponent(Iu(t))}")`;
		e.style.backgroundColor = ou(t.color ?? "text"), e.style.opacity = String(Fu(t.opacity));
		for (let t of ["webkitMask", "mask"]) e.style[`${t}Image`] = n, e.style[`${t}Size`] = "100% 100%", e.style[`${t}Repeat`] = "no-repeat";
	}
}, zu = [
	"wave",
	"tilt",
	"curve",
	"triangle",
	"zigzag"
], Bu = {
	min: 16,
	max: 240,
	dflt: 64
}, Vu = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/api\/photo\?[^\s"'<>\\]{1,2048}|\/(?!\/)[\w%./-]*)$/;
function Hu(e) {
	return typeof e == "string" && Vu.test(e);
}
var Uu = /^(?:https?:\/\/|mailto:|tel:)[^\s]+$/i;
function Wu(e) {
	return typeof e == "string" && Uu.test(e.trim());
}
var Gu = /^(?:\/(?![/\\])[^\s\\]*|#[^\s]*)$/;
function Ku(e) {
	return Wu(e) || typeof e == "string" && Gu.test(e.trim());
}
var qu = [
	"launcher",
	"cart",
	"theme"
];
function Ju(e = {}) {
	let t = Array.isArray(e.tools?.order) ? e.tools.order : [], n = [];
	for (let e of t) qu.includes(e) && !n.includes(e) && n.push(e);
	for (let e of qu) n.includes(e) || n.push(e);
	return n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/image.js
var Yu = .4, Xu = [
	"none",
	"kenburns",
	"drift"
], Zu = {
	min: 6,
	max: 60,
	dflt: 20
};
function Qu(e) {
	return Xu.includes(e) ? e : "none";
}
function $u(e) {
	let { min: t, max: n, dflt: r } = Zu, i = Number(e);
	return !Number.isFinite(i) || i <= 0 ? r : Math.min(n, Math.max(t, i));
}
function ed(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function td(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function nd(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function rd(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * Yu * t;
	return Math.round(Math.min(i, r * e));
}
function id(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * Yu, s = i ?? rd(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var ad = /* @__PURE__ */ new Set(), od = !1, sd = 0;
function cd() {
	sd = 0;
	for (let e of [...ad]) e() || ad.delete(e);
}
function ld() {
	sd ||= requestAnimationFrame(cd);
}
function ud(e) {
	ad.add(e), e(), !(od || typeof window > "u") && (od = !0, window.addEventListener("scroll", ld, { passive: !0 }), window.addEventListener("resize", ld, { passive: !0 }));
}
function dd(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = rd(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = id(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	ud(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function fd() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var pd = /* @__PURE__ */ new Set(), md = !1, hd = 0;
function gd() {
	hd = 0;
	for (let e of [...pd]) e() || pd.delete(e);
}
function _d() {
	!hd && typeof requestAnimationFrame == "function" && (hd = requestAnimationFrame(gd));
}
function vd(e) {
	pd.add(e), e(), !(md || typeof window > "u") && (md = !0, window.addEventListener("resize", _d, { passive: !0 }));
}
function yd(e, t, n, r) {
	let i = r === "cover" || r === "tile" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = rd(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	vd(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var bd = {
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
		motionSpeed: Zu.dflt
	}),
	migrations: {
		1: (e) => ({
			...e,
			fit: e.fit === "vanlig" ? "plain" : e.fit === "flislegg" ? "tile" : e.fit === "egen" ? "custom" : e.fit
		}),
		2: (e) => ({
			motion: "none",
			motionSpeed: Zu.dflt,
			...e
		})
	},
	render(e, t) {
		let n = !Hu(t.src);
		n && e.classList.add("urd-bg-demo");
		let r = n ? el(0) : t.src;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = nd(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let i = document.createElement("div");
		i.className = "urd-bg-image", i.style.position = "absolute", i.style.left = "0", i.style.right = "0", i.style.top = "0", i.style.bottom = "0";
		let a = Qu(t.motion), o = a === "none" ? i : document.createElement("div");
		o !== i && (o.className = `urd-bg-motion urd-bg-motion-${a}`, o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.top = "0", o.style.bottom = "0", o.style.animationDuration = `${$u(t.motionSpeed)}s`, i.appendChild(o));
		let s = t.fit === "tile" || t.fit === "repeat";
		o.style.backgroundImage = `url("${r}")`, o.style.backgroundSize = td(t.fit, t.size), o.style.backgroundRepeat = s ? "repeat" : "no-repeat", o.style.backgroundPosition = ed(t.x, t.y);
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
		e.appendChild(i), t.parallax > 0 && xd(i, t.parallax, o === i ? c : 0, t.fit ?? "cover");
	}
};
function xd(e, t, n, r) {
	fd() ? yd(e, t, n, r) : dd(e, t, n, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/gallery-model.js
var Sd = [
	"grid",
	"carousel",
	"slides",
	"ribbon",
	"mosaic",
	"polaroid"
], Cd = [
	"grid",
	"mosaic",
	"polaroid"
], wd = {
	min: 80,
	max: 400,
	dflt: 140
}, Td = {
	min: 0,
	max: 15,
	dflt: 4
};
function Ed(e) {
	return Sd.includes(e) ? e : "grid";
}
function Dd(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Od({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function kd(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.7.4/photo-source.js
var Ad = [
	"drive",
	"gphotos",
	"nextcloud",
	"json"
], jd = {
	min: 1,
	max: 60,
	dflt: 24
}, Md = [
	"name",
	"newest",
	"random"
], Nd = [
	480,
	800,
	1200,
	1600,
	2e3
], Pd = /^[A-Za-z0-9_-]{10,128}$/, Fd = /^(?!\d+(?:\.\d+)*$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
function Id(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? jd.dflt : Math.min(jd.max, Math.max(jd.min, Math.round(t)));
}
function Ld(e) {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t) return null;
	if (Pd.test(t) && !t.includes(".")) return {
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
		return Pd.test(t) ? {
			provider: "drive",
			id: t
		} : null;
	}
	if (r === "photos.google.com") {
		let e = /^\/share\/([A-Za-z0-9_-]{10,256})\/?$/.exec(n.pathname), t = n.searchParams.get("key") ?? "";
		return e ? {
			provider: "gphotos",
			id: e[1],
			...Pd.test(t) ? { host: t } : {}
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
	return i && Fd.test(r) ? {
		provider: "nextcloud",
		id: i[1],
		host: r
	} : /\.json$/i.test(n.pathname) && Fd.test(r) ? {
		provider: "json",
		url: n.href
	} : null;
}
function Rd(e) {
	return Md.includes(e) ? e : "name";
}
var zd = (e) => Rd(e) === "newest" ? "newest" : "name";
function Bd(e, t) {
	if (!e || !Ad.includes(e.provider)) return null;
	let n = new URLSearchParams({
		p: e.provider,
		sort: zd(t),
		max: "200"
	});
	return e.id && n.set("id", e.id), e.host && n.set("host", e.host), e.url && n.set("url", e.url), `/api/photos?${n.toString()}`;
}
function Vd(e, t = 200) {
	return (Array.isArray(e?.photos) ? e.photos : []).filter((e) => typeof e?.src == "string" && e.src.startsWith("/api/photo?")).slice(0, Math.max(1, Math.min(200, Number(t) || 200))).map((e) => ({
		src: e.src,
		name: typeof e.name == "string" ? e.name : ""
	}));
}
function Hd(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Ud(e, t) {
	let n = [...e], r = Hd(Number(t) || 0);
	for (let e = n.length - 1; e > 0; e--) {
		let t = Math.floor(r() * (e + 1));
		[n[e], n[t]] = [n[t], n[e]];
	}
	return n;
}
function Wd(e, t, n) {
	return Rd(t) === "random" ? Ud(e, n) : [...e];
}
var Gd = 0;
function Kd() {
	return Gd ||= typeof crypto < "u" && crypto.getRandomValues ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] || 1 : Date.now() >>> 0 || 1, Gd;
}
function qd(e, t = 1) {
	let n = (Number(e) || 0) * Math.min(3, Math.max(1, Number(t) || 1));
	return Nd.find((e) => e >= n) ?? Nd[Nd.length - 1];
}
function Jd(e, t) {
	if (typeof e != "string" || !e.startsWith("/api/photo?")) return e;
	let n = new URLSearchParams(e.slice(11));
	return n.set("w", String(t)), `/api/photo?${n.toString()}`;
}
var Yd = 6e5, Xd = 3e4, Zd = /* @__PURE__ */ new Map(), Qd = /* @__PURE__ */ new Map();
function $d(e) {
	return e?.source === "folder" && typeof e.folder == "string" ? e.folder.trim() : "";
}
function ef(e, t) {
	let n = Bd(Ld(e), t);
	return n ? tf(Zd.get(n)) : null;
}
function tf(e) {
	if (!e) return null;
	let t = e.value.photos.length ? Yd : Xd;
	return Date.now() - e.at < t ? e.value : null;
}
function nf(e, t, { force: n = !1 } = {}) {
	let r = Bd(Ld(e), t);
	if (!r) return Promise.resolve({
		photos: [],
		error: "badAddress",
		code: "photoFolderUnknown"
	});
	if (!n) {
		let e = tf(Zd.get(r));
		if (e) return Promise.resolve(e);
		if (Qd.has(r)) return Qd.get(r);
	}
	let i = (async () => {
		let e;
		try {
			let t = await fetch(r), n = await t.json().catch(() => null);
			e = t.ok ? {
				photos: Vd(n),
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
		return Zd.set(r, {
			at: Date.now(),
			value: e
		}), Qd.delete(r), e;
	})();
	return Qd.set(r, i), i;
}
function rf(e) {
	let t = $d(e), n = t ? ef(t, e.order) : null;
	return n?.photos.length ? Wd(n.photos, e.order, Kd()).slice(0, Id(e.folderMax)) : e.images ?? [];
}
function af(e, t, n) {
	let r = $d(t);
	r && !ef(r, t.order) && nf(r, t.order).then((r) => {
		e.isConnected && r.photos.length && (e.textContent = "", e.removeAttribute("style"), e.className = "urd-bg-layer", n(e, t));
	}), n(e, t);
}
//#endregion
//#region ../template/assets/engine/0.7.4/backgrounds/slideshow.js
var of = {
	source: "upload",
	folder: "",
	order: "random",
	folderMax: jd.dflt,
	style: "floating",
	motion: "drift",
	motionSpeed: Yc.dflt,
	interval: Xc.dflt,
	fade: 1.5,
	count: Vc.dflt,
	seed: 0,
	size: null,
	spread: Kc.dflt,
	tilt: qc.dflt,
	radius: Jc.dflt,
	rows: 2,
	direction: "left",
	underNav: !0,
	underAnnounce: !1,
	repeat: !1,
	shape: "rect",
	look: "shadow",
	tone: "natural",
	frameColor: ""
}, sf = {
	version: 2,
	label: "Image gallery",
	labelKey: "bgLayer.slideshow",
	defaults: () => ({
		images: [],
		fit: "cover",
		opacity: .85,
		blur: 0,
		...of
	}),
	migrations: { 1: (e) => ({
		...of,
		style: "fill",
		motion: "none",
		interval: 6,
		opacity: 1,
		...e
	}) },
	render(e, t) {
		af(e, t, lf);
	}
}, cf = (e, t) => {
	let n = document.createElement(e);
	return n.className = t, n;
};
function lf(e, t) {
	let n = il(t.style), r = rf(t).filter((e) => Hu(e?.src)), i = fl(t.shape), a = pl(t.look);
	e.classList.add("urd-bg-slideshow", `urd-gallery-${n}`, `urd-gallery-tone-${ml(t.tone)}`), n !== "fill" && e.classList.add(`urd-gallery-shape-${i}`, `urd-gallery-look-${a}`), e.style.setProperty("--urd-frame-radius", `${bl(t.radius)}px`), r.length || e.classList.add("urd-bg-demo"), e.style.opacity = String(t.opacity ?? .85);
	let o = dl(a, t.frameColor);
	o && e.style.setProperty("--urd-frame-color", ou(o));
	let s = t.underNav === !1 ? ["var(--urd-announce-h, 0px)", "var(--urd-nav-own-h, 0px)"] : t.underAnnounce === !0 ? [] : ["var(--urd-announce-h, 0px)"], c = s.length ? `calc(${s.join(" + ")})` : "", l = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, u = al(n, t.motion), d = {
		el: e,
		props: t,
		style: n,
		images: r,
		motion: u,
		shape: i,
		look: a,
		aspect: hl(i, a),
		moves: sl({
			style: n,
			motion: u,
			reducedMotion: l
		}),
		reduced: l,
		seed: Cl(t.seed, Kd()),
		time: xl(t.motionSpeed),
		dwell: _l(t.interval),
		dpr: window.devicePixelRatio || 1
	};
	bf[n](d), c && (e.style.top = n === "fill" && t.blur > 0 ? `calc(${c} - ${t.blur * 2}px)` : c);
}
function uf(e, t, n, r, i) {
	let a = t[n];
	e.style.backgroundImage = `url("${a ? Jd(a.src, r) : el(i)}")`, e.style.backgroundPosition = a ? ed(a.x, a.y) : "";
}
function df({ el: e, props: t, images: n, motion: r, reduced: i, dpr: a, dwell: o }) {
	let s = !n.length, c = s ? tl(3) : n, l = qd(window.innerWidth, a);
	t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	let u = Math.max(0, Number(t.fade) || 0);
	e.style.setProperty("--urd-bgg-fade", `${u}s`);
	let d = Qu(r === "drift" ? "drift" : r === "kenburns" ? "kenburns" : "none"), f = (e) => {
		let n = cf("div", e ? "urd-bg-slide on" : "urd-bg-slide");
		return d !== "none" && (n.classList.add("urd-bg-motion", `urd-bg-motion-${d}`), n.style.animationDuration = `${$u(t.motionSpeed)}s`), n;
	}, p = (e, n) => {
		e.style.backgroundImage = `url("${s ? n.src : Jd(n.src, l)}")`, e.style.backgroundSize = s ? "240px auto" : td(t.fit), e.style.backgroundRepeat = s ? "repeat" : "no-repeat", e.style.backgroundPosition = s ? "" : ed(n.x, n.y);
	}, m = new Image();
	if (m.src = s ? c[0].src : Jd(c[0].src, l), !m.complete) {
		e.style.visibility = "hidden";
		let t = () => {
			e.style.visibility = "";
		};
		m.addEventListener("load", t, { once: !0 }), m.addEventListener("error", t, { once: !0 });
	}
	let h = f(!0);
	if (p(h, c[0]), e.appendChild(h), !Od({
		count: c.length,
		reducedMotion: i
	})) return;
	let g = f(!1);
	e.appendChild(g);
	let _ = 0, v = h, y = Math.max(kd(o, { fallback: Xc.dflt }), u + .5) * 1e3, b = setInterval(() => {
		if (!h.isConnected) {
			clearInterval(b);
			return;
		}
		if (document.hidden) return;
		let e = Dd(_, 1, c.length), t = new Image();
		t.src = s ? c[e].src : Jd(c[e].src, l);
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
function ff(e, t, n, r, i) {
	let a = cf("div", "urd-gallery-skin"), o = cf("div", "urd-gallery-face");
	return uf(o, t, n, r, i), a.appendChild(o), e.appendChild(a), {
		skin: a,
		face: o
	};
}
function pf(e, t) {
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
function mf({ frame: e, skin: t, face: n }, r, i, a) {
	let { motion: o, moves: s, time: c } = a;
	if (!s) return;
	let l = `-${(r.phase * c).toFixed(2)}s`;
	if (o === "drift" || o === "rise") {
		e.classList.add("urd-gallery-travel");
		let t = pf(r, o);
		e.style.setProperty("--tx0", t.tx0), e.style.setProperty("--ty0", t.ty0), e.style.setProperty("--tx1", t.tx1), e.style.setProperty("--ty1", t.ty1), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	} else if (o === "kenburns") e.classList.add("urd-gallery-kenburns"), e.style.animationDuration = `${c}s`, e.style.animationDelay = l;
	else if (o === "bounce") {
		e.style.left = "0", e.style.top = "0", e.style.translate = "0 0", e.classList.add("urd-gallery-bounce-x"), t.classList.add("urd-gallery-bounce-y");
		let n = c * (.8 + r.heading * .4), i = c * (.5 + r.phase * .35);
		e.style.animationDuration = `${n.toFixed(2)}s`, e.style.animationDelay = `-${(r.phase * n).toFixed(2)}s`, t.style.animationDuration = `${i.toFixed(2)}s`, t.style.animationDelay = `-${(r.heading * i).toFixed(2)}s`;
	}
}
function hf(e, t, n) {
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
			a >= 0 && (uf(t.face, r, a, t.width, i), c[i] = a, l[a] = ++u), n && (f += 1, gf(t, n(i, f, e.filter((e) => e !== t))));
		});
	});
}
function gf(e, t) {
	let n = t.w / 2 * 1.15, r = t.w / e.aspect / 2 * 1.15;
	e.frame.style.left = `clamp(${n.toFixed(1)}px, ${t.x}%, calc(100% - ${n.toFixed(1)}px))`, e.frame.style.top = `clamp(${r.toFixed(1)}px, ${t.y}%, calc(100% - ${r.toFixed(1)}px))`, e.frame.style.width = `${t.w}px`, e.frame.style.rotate = `${t.rot}deg`, e.x = t.x, e.y = t.y;
}
function _f(e) {
	let { el: t, props: n, style: r, images: i, seed: a, aspect: o, dpr: s } = e, c = {
		count: n.count,
		seed: a,
		size: n.size,
		spread: n.spread,
		tilt: n.tilt,
		style: r,
		repeat: n.repeat === !0
	};
	hf(wl(i, c).map((n, r) => {
		let a = cf("div", "urd-gallery-box urd-gallery-frame" + (n.index < 0 ? " urd-gallery-frame-empty" : ""));
		a.style.aspectRatio = String(o);
		let c = qd(n.w, s), { skin: l, face: u } = ff(a, i, n.index, c, r);
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
		return gf(d, n), mf(d, n, r, e), d;
	}), e, (e, t, n) => {
		let r = null, o = -1;
		for (let s = 0; s < 6; s += 1) {
			let l = wl(i, {
				...c,
				seed: `${a}:${t * 6 + s}`
			})[e], u = Math.min(999, ...n.map((e) => Math.hypot(e.x - l.x, e.y - l.y)));
			u > o && (o = u, r = l);
		}
		return r;
	});
}
function vf(e) {
	let { el: t, props: n, images: r, moves: i, time: a, aspect: o, dpr: s } = e, c = Sl(n.rows), l = ll(n.size, "band");
	t.style.setProperty("--urd-band-h", `${l}px`);
	let u = r.length || 8, d = qd(l * o, s);
	for (let e = 0; e < c; e += 1) {
		let s = cf("div", "urd-gallery-band-row");
		i || s.classList.add("urd-ribbon-still");
		let c = cf("div", "urd-ribbon-track");
		n.direction === "right" != (e === 1) && c.classList.add("urd-ribbon-right"), c.style.setProperty("--urd-ribbon-ms", `${a * 1e3}ms`), e === 1 && (c.style.animationDelay = `-${(a / 3).toFixed(1)}s`);
		let l = (e) => {
			for (let t = 0; t < u; t += 1) {
				let n = cf("div", "urd-gallery-box urd-gallery-band-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
				n.style.aspectRatio = String(o), ff(n, r, r.length ? t : -1, d, t), e.appendChild(n);
			}
		}, f = cf("div", "urd-ribbon-run");
		l(f);
		let p = cf("div", "urd-ribbon-run");
		p.setAttribute("aria-hidden", "true"), l(p), c.append(f, p), s.appendChild(c), t.appendChild(s);
	}
}
function yf(e) {
	let { el: t, props: n, images: r, seed: i, dpr: a, motion: o, moves: s, time: c } = e, l = Dl(n.count, i, r.length, n.repeat === !0);
	t.style.setProperty("--urd-mosaic-row", `${ll(n.size, "mosaic")}px`);
	let u = qd(ll(n.size, "mosaic") * 2.2, a);
	hf(l.map((e, n) => {
		let i = cf("div", "urd-gallery-box urd-gallery-tile" + (r.length ? "" : " urd-gallery-frame-empty"));
		i.style.gridColumn = `span ${e.cols}`, i.style.gridRow = `span ${e.rows}`;
		let a = r.length ? n % r.length : -1, { face: l } = ff(i, r, a, u, n);
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
var bf = {
	fill: df,
	floating: _f,
	band: vf,
	mosaic: yf
}, xf = /^(?:data:video\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/media\/[\w%./-]+\.(?:mp4|webm))$/i;
function Sf(e) {
	return typeof e == "string" && xf.test(e);
}
var Cf = null;
function wf(e) {
	Cf ??= new IntersectionObserver((e) => {
		for (let t of e) {
			if (!t.target.isConnected) {
				Cf.unobserve(t.target);
				continue;
			}
			t.isIntersecting ? t.target.play().catch(() => {}) : t.target.pause();
		}
	}, { threshold: 0 }), Cf.observe(e);
}
var Tf = (e, t, n, r) => {
	e.style.position = "absolute", e.style.inset = "0", e.style.width = "100%", e.style.height = "100%", e.style.objectFit = t === "contain" ? "contain" : "cover", e.style.objectPosition = ed(n, r);
}, Ef = {
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
		if (!Sf(t.src)) return;
		if (e.style.opacity = String(t.opacity ?? 1), window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			if (!Hu(t.poster)) return;
			let n = document.createElement("img");
			n.className = "urd-bg-video-poster", n.alt = "", n.setAttribute("aria-hidden", "true"), n.src = t.poster, Tf(n, t.fit, t.x, t.y), e.appendChild(n);
			return;
		}
		let n = document.createElement("video");
		n.className = "urd-bg-video", n.muted = !0, n.setAttribute("muted", ""), n.loop = !0, n.playsInline = !0, n.setAttribute("playsinline", ""), n.preload = "metadata", n.disablePictureInPicture = !0, n.setAttribute("aria-hidden", "true"), Hu(t.poster) && (n.poster = t.poster), n.src = t.src, Tf(n, t.fit, t.x, t.y), e.appendChild(n), wf(n), t.parallax > 0 && xd(n, t.parallax, 0, t.fit === "contain" ? "contain" : "cover");
	}
};
//#endregion
//#region ../template/assets/engine/0.7.4/footer-thumb.js
function Df(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Of(n, e.baselineLinks), o + "</svg>";
	if (e.chapters) {
		o += `<rect x="12" y="10" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="12" y="20" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		let r = i || 3, a = (136 - (r - 1) * 8) / r;
		for (let e = 0; e < r; e++) {
			let r = 12 + e * (a + 8);
			o += `<line x1="${r}" y1="30" x2="${r + a}" y2="30" stroke="${n}" stroke-width="0.8" opacity="0.7"/>`, o += `<rect x="${r}" y="34" width="9" height="6" rx="1.5" fill="${t}"/>`;
			for (let e = 0; e < 3; e++) o += `<rect x="${r}" y="${44 + e * 6}" width="${a * .7}" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += Of(n, e.baselineLinks), o + "</svg>";
	}
	if (e.split) {
		o += `<rect x="8" y="8" width="70" height="52" rx="4" fill="${t}" opacity="0.16"/>`, o += `<rect x="16" y="16" width="20" height="6" rx="2" fill="${t}"/>`, o += `<rect x="16" y="26" width="46" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`, o += `<rect x="16" y="36" width="26" height="9" rx="3" fill="${t}"/>`;
		let r = i || 2;
		for (let e = 0; e < r; e++) {
			let r = 90 + e * 32;
			o += `<rect x="${r}" y="14" width="16" height="3" rx="1.5" fill="${t}" opacity="0.8"/>`;
			for (let e = 0; e < 4; e++) o += `<rect x="${r}" y="${22 + e * 7}" width="22" height="3" rx="1.5" fill="${n}" opacity="0.6"/>`;
		}
		return o += Of(n, e.baselineLinks), o + "</svg>";
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
	return o += Of(n, e.baselineLinks), o + "</svg>";
}
function Of(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.7.4/animations/core.js
var kf = () => ({
	duration: 600,
	delay: 0
}), Af = 90, jf = {
	"fade-in": {
		version: 1,
		label: "Fade in",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: kf,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Slide up",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: kf,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom in",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: kf,
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
			step: Af,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, Mf = [
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
function Nf(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Pf = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ff = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), If = /* @__PURE__ */ H("<p> </p>"), Lf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" placeholder=\"https://drive.google.com/drive/folders/...\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"60\" class=\"svelte-1n46o8q\"/></label> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button> <!>", 1), Rf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), zf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"6\" max=\"60\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), Bf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Vf = /* @__PURE__ */ H("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), Hf = /* @__PURE__ */ H("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Uf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Wf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Gf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Kf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), qf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Jf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"180\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Yf = /* @__PURE__ */ H("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Zf = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Qf = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), $f = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), ep = /* @__PURE__ */ H("<button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>"), tp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" max=\"20\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), np = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"15\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), rp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label>"), ip = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"48\" step=\"1\" class=\"svelte-1n46o8q\"/>", 1), ap = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"60\" max=\"400\" step=\"2\" class=\"svelte-1n46o8q\"/> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), op = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.5\" max=\"90\" step=\"0.5\" class=\"svelte-1n46o8q\"/>", 1), sp = /* @__PURE__ */ H("<label><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), cp = /* @__PURE__ */ H("<!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), lp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), up = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), dp = /* @__PURE__ */ H("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), fp = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), pp = /* @__PURE__ */ H("<input class=\"nav-target svelte-1n46o8q\"/>"), mp = /* @__PURE__ */ H("<div class=\"nav-row nav-sub-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target\"><!></span> <!></div>"), hp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), gp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), _p = /* @__PURE__ */ H("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), vp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>"), yp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), bp = /* @__PURE__ */ H("<input class=\"svelte-1n46o8q\"/>"), xp = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Sp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Cp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"50\" class=\"svelte-1n46o8q\"/></label>"), wp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <textarea rows=\"3\" spellcheck=\"false\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Tp = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Ep = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Dp = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Op = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), kp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Ap = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), jp = /* @__PURE__ */ H("<button type=\"button\"></button>"), Mp = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input class=\"field-filled svelte-1n46o8q\"/></label>"), Np = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-6 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), Pp = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Fp = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Ip = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Lp = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"> </button>"), Rp = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), zp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Bp = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Vp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/>", 1), Hp = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"video/mp4,video/webm\" class=\"svelte-1n46o8q\"/></label> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Up = /* @__PURE__ */ H("<!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Wp = /* @__PURE__ */ H("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Gp = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Kp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), qp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Jp = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button></span>"), Yp = /* @__PURE__ */ H("<button class=\"ghost action svelte-1n46o8q\"> </button>"), Xp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Zp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Qp = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"email\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"url\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), $p = /* @__PURE__ */ H("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), em = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), tm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), nm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), rm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), im = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), am = /* @__PURE__ */ H("<!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), om = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), sm = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), cm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), lm = /* @__PURE__ */ H("<!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), um = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.5\" max=\"10\" step=\"0.5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), dm = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), fm = /* @__PURE__ */ H("<button class=\"ghost action svelte-1n46o8q\"> </button> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), pm = /* @__PURE__ */ H("<!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"2\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>", 1), mm = /* @__PURE__ */ H("<div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div>"), hm = /* @__PURE__ */ H("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!> <!></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"-10\" max=\"10\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"8\" max=\"120\" step=\"2\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div></div> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), gm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), _m = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), vm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ym = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), bm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), xm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Sm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Cm = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <button type=\"button\" class=\"ghost action svelte-1n46o8q\"><!> </button>", 1), wm = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Tm = /* @__PURE__ */ H("<!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"10\" max=\"300\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"80\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Em = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Dm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Om = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label>"), km = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Am = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), jm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Mm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), Nm = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), Pm = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Fm = /* @__PURE__ */ H("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Im = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), Lm = /* @__PURE__ */ H("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), Rm = /* @__PURE__ */ H("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), zm = /* @__PURE__ */ H("<button><!> </button>"), Bm = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"></div>"), Vm = /* @__PURE__ */ H("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), Hm = /* @__PURE__ */ H("<button></button>"), Um = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), Wm = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), Gm = /* @__PURE__ */ H("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), Km = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), qm = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), Jm = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), Ym = /* @__PURE__ */ H("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), Xm = /* @__PURE__ */ H("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), Zm = /* @__PURE__ */ H("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), Qm = /* @__PURE__ */ H("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), $m = /* @__PURE__ */ H("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), eh = /* @__PURE__ */ H("<span class=\"who svelte-1n46o8q\"><!> </span>"), th = /* @__PURE__ */ H("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), nh = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), rh = /* @__PURE__ */ H("<button> </button>"), ih = /* @__PURE__ */ H("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), ah = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" step=\"10\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" step=\"10\" placeholder=\"0\"/></div>"), oh = /* @__PURE__ */ H("<p class=\"mini-label svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input type=\"text\" spellcheck=\"false\" class=\"svelte-1n46o8q\"/></label>", 1), sh = /* @__PURE__ */ H("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></div> <!> <!></div>"), ch = /* @__PURE__ */ H("<span class=\"page-path svelte-1n46o8q\">/</span>"), lh = /* @__PURE__ */ H("<input class=\"page-slug svelte-1n46o8q\"/>"), uh = /* @__PURE__ */ H("<span class=\"seo-warn svelte-1n46o8q\"></span>"), dh = /* @__PURE__ */ H("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), fh = /* @__PURE__ */ H("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), ph = /* @__PURE__ */ H("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), mh = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), hh = /* @__PURE__ */ H("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div>"), gh = /* @__PURE__ */ H("<div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button> <button class=\"page-template-del svelte-1n46o8q\"></button></div>"), _h = /* @__PURE__ */ H("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"></div>", 1), vh = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <textarea rows=\"2\" class=\"svelte-1n46o8q\"></textarea></label> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-template-grid svelte-1n46o8q\"><div><button class=\"page-template-pick svelte-1n46o8q\"><span class=\"page-template-thumb svelte-1n46o8q\"></span> <span class=\"page-template-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), yh = /* @__PURE__ */ H("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), bh = /* @__PURE__ */ H("<img alt=\"\" class=\"svelte-1n46o8q\"/>"), xh = /* @__PURE__ */ H("<span class=\"logo-file svelte-1n46o8q\"> </span>"), Sh = /* @__PURE__ */ H("<div class=\"logo-pick svelte-1n46o8q\"><span class=\"logo-thumb svelte-1n46o8q\"><!></span> <span class=\"logo-pick-col svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div> <div class=\"ctl-triple svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></div></div>", 1), Ch = /* @__PURE__ */ H("<button type=\"button\"><!><span class=\"svelte-1n46o8q\"> </span></button>"), wh = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" placeholder=\"1100\"/></span>"), Th = /* @__PURE__ */ H("<!> <!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Eh = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Dh = /* @__PURE__ */ H("<!> <span class=\"toolbar-row svelte-1n46o8q\"><span class=\"mini-label tb-grow svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></span>", 1), Oh = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), kh = /* @__PURE__ */ H("<div class=\"ctl-pair svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div>"), Ah = /* @__PURE__ */ H("<span class=\"toolbar-row ctl-end svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"1\" max=\"8\"/> <span class=\"mini-label svelte-1n46o8q\"> </span> <!></span>"), jh = /* @__PURE__ */ H("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!>", 1), Mh = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"30\" max=\"80\" step=\"5\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"400\" step=\"10\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0\" max=\"1200\" step=\"20\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <!>", 1), Nh = /* @__PURE__ */ H("<!> <!>", 1), Ph = /* @__PURE__ */ H("<div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Fh = /* @__PURE__ */ H("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div>"), Ih = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label>"), Lh = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <!> <!> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <!> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Rh = /* @__PURE__ */ H("<button type=\"button\"><span> </span><span class=\"svelte-1n46o8q\"> </span></button>"), zh = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Bh = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\" placeholder=\"https://\"/></label>"), Vh = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Hh = /* @__PURE__ */ H("<span class=\"tool-move svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), Uh = /* @__PURE__ */ H("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Wh = /* @__PURE__ */ H("<div class=\"mini-card svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span><!></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div>"), Gh = /* @__PURE__ */ H("<label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"text\" class=\"field-filled svelte-1n46o8q\"/></label>"), Kh = /* @__PURE__ */ H("<img alt=\"\"/>"), qh = /* @__PURE__ */ H("<span class=\"lrow-warn svelte-1n46o8q\"></span>"), Jh = /* @__PURE__ */ H("<span class=\"lrow-tile-mark svelte-1n46o8q\"><!></span> <span class=\"lrow-tile-name svelte-1n46o8q\"> </span>", 1), Yh = /* @__PURE__ */ H("<span class=\"bad-target-note svelte-1n46o8q\"> </span>"), Xh = /* @__PURE__ */ H("<div class=\"lrow-body svelte-1n46o8q\"><!> <div class=\"lrow-fields svelte-1n46o8q\"><input class=\"field-filled svelte-1n46o8q\"/> <input/> <!> <span class=\"lrow-actions svelte-1n46o8q\"><!> <button class=\"linkish danger svelte-1n46o8q\"> </button></span></div></div>"), Zh = /* @__PURE__ */ H("<div><div class=\"lrow-head svelte-1n46o8q\" role=\"button\" tabindex=\"0\"><span class=\"lrow-mark svelte-1n46o8q\" aria-hidden=\"true\"><!></span> <span class=\"lrow-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\" role=\"none\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"lrow-chev svelte-1n46o8q\" aria-hidden=\"true\"></span></div> <!></div>"), Qh = /* @__PURE__ */ H("<div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" min=\"1\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"mini-card svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"lbtn-pick svelte-1n46o8q\"><!> <span class=\"lbtn-name svelte-1n46o8q\"><!></span></span></div> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), $h = /* @__PURE__ */ H("<details class=\"group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"tool-head svelte-1n46o8q\"> <!></span></summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details>"), eg = /* @__PURE__ */ H("<div aria-hidden=\"true\"><span class=\"nav-grip svelte-1n46o8q\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><span class=\"nav-item-name ghost-name svelte-1n46o8q\"> </span> <span class=\"ghost-target svelte-1n46o8q\"> </span></div></div>"), tg = /* @__PURE__ */ H("<input class=\"nav-item-href svelte-1n46o8q\"/>"), ng = /* @__PURE__ */ H("<span class=\"nav-item-sub svelte-1n46o8q\"></span>"), rg = /* @__PURE__ */ H("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!>", 1), ig = /* @__PURE__ */ H("<!> <div><span class=\"nav-grip svelte-1n46o8q\" draggable=\"true\"></span> <div class=\"nav-item-main svelte-1n46o8q\"><input class=\"nav-item-name svelte-1n46o8q\"/> <div class=\"nav-item-target svelte-1n46o8q\"><!> <!></div></div> <!> <span class=\"nav-actions svelte-1n46o8q\"><button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button> <button class=\"ghost nav-act svelte-1n46o8q\"></button></span> <button class=\"ghost row-tool nav-more svelte-1n46o8q\"></button></div> <!> <!> <!>", 1), ag = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-3 svelte-1n46o8q\" role=\"group\"></div></div> <!> <!> <!> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"sub-inset svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"sub-inset-body svelte-1n46o8q\"><!> <div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div> <!></div></details></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-pair svelte-1n46o8q\"><!> <div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"number\" class=\"tb-num svelte-1n46o8q\"/></div></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label></div> <!> <div class=\"ctl-pair svelte-1n46o8q\"><label class=\"field-stack svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <!></label> <!></div> <!> <!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"tile-grid cols-5 svelte-1n46o8q\" role=\"group\"></div></div> <!> <div class=\"swatch-row svelte-1n46o8q\"><!> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <div class=\"swatch-cell svelte-1n46o8q\"><!> <span class=\"mini-label svelte-1n46o8q\"> </span></div></div> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group sub-fold svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!>  <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-field svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <div role=\"group\"></div></div> <!> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"nav-list svelte-1n46o8q\" role=\"list\"></div> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"toolbar-row svelte-1n46o8q\"><input class=\"tb-grow svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button></span></div></details></div>"), og = /* @__PURE__ */ H("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), sg = /* @__PURE__ */ H("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), cg = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), lg = /* @__PURE__ */ H("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), ug = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), dg = /* @__PURE__ */ H("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), fg = /* @__PURE__ */ H("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), pg = /* @__PURE__ */ H("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), mg = /* @__PURE__ */ H("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), hg = /* @__PURE__ */ H("<span class=\"mini-label svelte-1n46o8q\"> </span>"), gg = /* @__PURE__ */ H("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), _g = /* @__PURE__ */ H("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), vg = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"ctl-row palauto-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), yg = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), bg = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), xg = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Sg = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), Cg = /* @__PURE__ */ H("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), wg = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Tg = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Eg = /* @__PURE__ */ H("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), Dg = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label ctl-name svelte-1n46o8q\"> </span> <input type=\"range\" step=\"4\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Og = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), kg = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Ag = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), jg = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Mg = /* @__PURE__ */ H("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Ng = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Pg = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Fg = /* @__PURE__ */ H("<div class=\"nav-row\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Ig = /* @__PURE__ */ H("<div class=\"nav-row\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), Lg = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Rg = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), zg = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label>"), Bg = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Vg = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/>"), Hg = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span>"), Ug = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" step=\"0.01\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Wg = /* @__PURE__ */ H("<details class=\"group collection-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <!> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details>"), Gg = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\".csv,text/csv\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Kg = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), qg = /* @__PURE__ */ H("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Jg = /* @__PURE__ */ H("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Yg = /* @__PURE__ */ H("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), Xg = /* @__PURE__ */ H("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Zg = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Qg = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), $g = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), e_ = /* @__PURE__ */ H("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), t_ = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), n_ = /* @__PURE__ */ H("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), r_ = /* @__PURE__ */ H("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), i_ = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), a_ = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), o_ = /* @__PURE__ */ H("<span class=\"chip svelte-1n46o8q\"> </span>"), s_ = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), c_ = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), l_ = /* @__PURE__ */ H("<span class=\"update-warn svelte-1n46o8q\"></span>"), u_ = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), d_ = /* @__PURE__ */ H("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), f_ = /* @__PURE__ */ H("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), p_ = /* @__PURE__ */ H("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), m_ = /* @__PURE__ */ H("<aside><div class=\"panel-head svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></div> <!></aside>"), h_ = /* @__PURE__ */ H("<div class=\"workspace svelte-1n46o8q\"><nav><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), g_ = /* @__PURE__ */ H("<p class=\"loading svelte-1n46o8q\"> </p>"), __ = /* @__PURE__ */ H("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), v_ = /* @__PURE__ */ H("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), y_ = /* @__PURE__ */ H("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), b_ = /* @__PURE__ */ H("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), x_ = /* @__PURE__ */ H("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), S_ = /* @__PURE__ */ H("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>     <!>", 1);
function C_(e, t) {
	Ye(t, !0);
	let n = (e, t = f, n = f, r = f) => {
		var i = Mr(), a = F(i), o = (e) => {
			var i = Ff(), a = F(i), o = P(a), s = L(o);
			D(a), qr(L(a, 2), 17, () => r().props.images ?? [], Ur, (e, i, a) => {
				var o = Pf(), s = F(o), c = P(s), l = L(c, 2), u = P(l);
				u.disabled = a === 0, K(u, () => w.up, !0), D(u);
				var d = L(u, 2);
				K(d, () => w.down, !0), D(d);
				var f = L(d, 2);
				K(f, () => w.cross, !0), D(f), D(l), D(s);
				var p = L(s, 2), m = P(p), h = I(L(m));
				D(p);
				var g = L(p, 2);
				J(g);
				var _ = L(g, 2), v = P(_), y = I(L(v));
				D(_);
				var b = L(_, 2);
				J(b), z((e, t, n, o, s) => {
					X(c, "src", B(i).src), d.disabled = a === r().props.images.length - 1, X(f, "title", e), W(m, `${t ?? ""} `), W(h, `${n ?? ""}%`), Y(g, B(i).x ?? .5), W(v, `${o ?? ""} `), W(y, `${s ?? ""}%`), Y(b, B(i).y ?? .5);
				}, [
					() => Z("tip.removeImage"),
					() => Z("lbl.focusX"),
					() => Math.round((B(i).x ?? .5) * 100),
					() => Z("lbl.focusY"),
					() => Math.round((B(i).y ?? .5) * 100)
				]), V("click", u, () => oi(t(), n(), a, -1)), V("click", d, () => oi(t(), n(), a, 1)), V("click", f, () => si(t(), n(), a)), V("input", g, (e) => li(t(), n(), a, "x", Number(e.target.value))), V("input", b, (e) => li(t(), n(), a, "y", Number(e.target.value))), U(e, o);
			}), z((e, t) => {
				X(a, "title", e), W(o, `${t ?? ""} `);
			}, [() => Z("tip.bg.addImages"), () => Z("ui.addImages")]), V("change", s, (e) => ai(t(), n(), e)), U(e, i);
		};
		G(a, (e) => {
			(r().props.source ?? "upload") !== "folder" && e(o);
		}), U(e, i);
	}, r = (e, t = f, n = f, r = f) => {
		let i = /* @__PURE__ */ A(() => xc(r()));
		var a = Rf(), o = F(a), s = P(o), c = L(s);
		{
			let e = /* @__PURE__ */ A(() => B(i).source ?? "upload"), r = /* @__PURE__ */ A(() => [["upload", Z("opt.photoSource.upload")], ["folder", Z("opt.photoSource.folder")]]);
			Q(c, {
				get value() {
					return B(e);
				},
				get options() {
					return B(r);
				},
				onchange: (e) => wr(t(), n(), "source", e)
			});
		}
		D(o);
		var l = L(o, 2), u = (e) => {
			let a = /* @__PURE__ */ A(() => Ld(B(i).folder ?? "")), o = /* @__PURE__ */ A(() => !B(a) || B(a).provider === "drive" || B(a).provider === "nextcloud");
			var s = Lf(), c = F(s), l = P(c), u = L(l);
			J(u);
			let d;
			D(c);
			var f = L(c, 2), p = P(f), m = L(p);
			{
				let e = /* @__PURE__ */ A(() => B(o) || B(i).order === "random" ? B(i).order ?? "name" : "name"), r = /* @__PURE__ */ A(() => B(o) ? [
					["name", Z("opt.folderOrder.name")],
					["newest", Z("opt.folderOrder.newest")],
					["random", Z("opt.folderOrder.random")]
				] : [["name", Z("opt.folderOrder.listed")], ["random", Z("opt.folderOrder.random")]]);
				Q(m, {
					get value() {
						return B(e);
					},
					get options() {
						return B(r);
					},
					onchange: (e) => wr(t(), n(), "order", e)
				});
			}
			D(f);
			var h = L(f, 2), g = P(h), _ = L(g);
			J(_), D(h);
			var v = L(h, 2), y = P(v);
			K(y, () => w.eye);
			var b = L(y);
			D(v);
			var x = L(v, 2), S = (e) => {
				var r = If();
				let i;
				var a = I(r, !0);
				z((e, t) => {
					i = q(r, 1, "folder-status svelte-1n46o8q", null, i, { err: e }), W(a, t);
				}, [() => ti[ni(t(), n())].err, () => ti[ni(t(), n())].text]), U(e, r);
			}, C = /* @__PURE__ */ A(() => ti[ni(t(), n())]);
			G(x, (e) => {
				B(C) && e(S);
			}), z((e, t, n, r, o, s, m, y) => {
				X(c, "title", e), W(l, `${t ?? ""} `), Y(u, B(i).folder ?? ""), d = q(u, 1, "svelte-1n46o8q", null, d, { "bad-target": n }), X(f, "title", r), W(p, `${o ?? ""} `), X(h, "title", s), W(g, `${m ?? ""} `), Y(_, B(i).folderMax ?? 24), v.disabled = !B(a), W(b, ` ${y ?? ""}`);
			}, [
				() => Z("tip.bg.photoFolder"),
				() => Z("lbl.photoFolder"),
				() => (B(i).folder ?? "").trim() && !B(a),
				() => Z("tip.bg.folderOrder"),
				() => Z("lbl.folderOrder"),
				() => Z("tip.bg.folderMax"),
				() => Z("lbl.folderMax"),
				() => Z("ui.checkFolder")
			]), V("change", u, (e) => wr(t(), n(), "folder", e.target.value.trim())), V("change", _, (e) => wr(t(), n(), "folderMax", Number(e.target.value))), V("click", v, () => ii(t(), n(), r())), U(e, s);
		};
		G(l, (e) => {
			(B(i).source ?? "upload") === "folder" && e(u);
		}), z((e, t) => {
			X(o, "title", e), W(s, `${t ?? ""} `);
		}, [() => Z("tip.bg.photoSource"), () => Z("lbl.photoSource")]), U(e, a);
	}, i = (e, t = f, n = f, r = f) => {
		var i = Rf(), a = F(i), o = P(a), s = L(o);
		{
			let e = /* @__PURE__ */ A(() => r().props.motion ?? "none"), i = /* @__PURE__ */ A(() => [
				["none", Z("common.none")],
				["kenburns", Z("opt.bgMotion.kenburns")],
				["drift", Z("opt.bgMotion.drift")]
			]);
			Q(s, {
				get value() {
					return B(e);
				},
				get options() {
					return B(i);
				},
				onchange: (e) => wr(t(), n(), "motion", e)
			});
		}
		D(a);
		var c = L(a, 2), l = (e) => {
			var i = zf(), a = F(i), o = P(a), s = I(L(o));
			D(a);
			var c = L(a, 2);
			J(c), z((e) => {
				W(o, `${e ?? ""} `), W(s, `${r().props.motionSpeed ?? 20 ?? ""} s`), Y(c, r().props.motionSpeed ?? 20);
			}, [() => Z("lbl.motionSpeed")]), V("input", c, (e) => wr(t(), n(), "motionSpeed", Number(e.target.value))), U(e, i);
		};
		G(c, (e) => {
			(r().props.motion ?? "none") !== "none" && e(l);
		}), z((e, t) => {
			X(a, "title", e), W(o, `${t ?? ""} `);
		}, [() => Z("tip.bg.imageMotion"), () => Z("lbl.motion")]), U(e, i);
	}, a = (e, t = f, a = f) => {
		var o = fp(), s = F(o);
		qr(s, 17, a, Ur, (e, o, s) => {
			var c = dp(), l = P(c), u = P(l);
			{
				let e = /* @__PURE__ */ A(() => Z("tip.bg.changeType")), n = /* @__PURE__ */ A(() => ee.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
				Q(u, {
					get value() {
						return B(o).type;
					},
					get title() {
						return B(e);
					},
					get options() {
						return B(n);
					},
					onchange: (e) => Hr(t(), s, e)
				});
			}
			var d = L(u, 2), f = P(d);
			f.disabled = s === 0, K(f, () => w.up, !0), D(f);
			var p = L(f, 2);
			K(p, () => w.down, !0), D(p);
			var m = L(p, 2);
			K(m, () => w.cross, !0), D(m), D(d), D(l);
			var h = L(l, 2), g = (e) => {
				var n = Bf(), r = F(n), i = P(r), a = L(i);
				{
					let e = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.bg.layerColor"));
					va(a, {
						get value() {
							return B(o).props.value;
						},
						get tokens() {
							return B(e);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => wr(t(), s, "value", e)
					});
				}
				D(r);
				var c = L(r, 2), l = P(c), u = I(L(l));
				D(c);
				var d = L(c, 2);
				J(d), z((e, t, n) => {
					W(i, `${e ?? ""} `), W(l, `${t ?? ""} `), W(u, `${n ?? ""}%`), Y(d, B(o).props.opacity ?? 1);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.strength"),
					() => Math.round((B(o).props.opacity ?? 1) * 100)
				]), V("input", d, (e) => wr(t(), s, "opacity", Number(e.target.value))), U(e, n);
			}, _ = (e) => {
				let n = /* @__PURE__ */ A(() => Ar(B(o))), r = /* @__PURE__ */ A(() => B(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var i = Gf(), a = F(i), c = P(a), l = L(c);
				{
					let e = /* @__PURE__ */ A(() => B(n).kind ?? "linear"), r = /* @__PURE__ */ A(() => [["linear", Z("opt.grad.linear")], ["radial", Z("opt.grad.radial")]]);
					Q(l, {
						get value() {
							return B(e);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => Fr(t(), s, e)
					});
				}
				D(a);
				var u = L(a, 2);
				qr(u, 17, () => B(n).stops, Ur, (e, i, a) => {
					var o = Hf();
					let c;
					var l = P(o), u = L(l, 2);
					{
						let e = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.bg.stopColor"));
						va(u, {
							get value() {
								return B(i).color;
							},
							get tokens() {
								return B(e);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Ir(t(), s, a, { color: e })
						});
					}
					var d = L(u, 2);
					J(d);
					var f = L(d, 2), p = I(f), m = L(f, 2), h = (e) => {
						var n = Vf();
						K(n, () => w.cross, !0), D(n), z((e) => X(n, "title", e), [() => Z("tip.bg.removeStop")]), V("click", n, () => Rr(t(), s, a)), U(e, n);
					};
					G(m, (e) => {
						B(n).stops.length > 2 && e(h);
					}), D(o), z((e, t, r) => {
						c = q(o, 1, "nav-line grad-stop svelte-1n46o8q", null, c, {
							dragging: B(Br)?.layer === s && B(Br).from === a,
							"drop-above": B(Br)?.layer === s && B(Br).insert === a,
							"drop-below": B(Br)?.layer === s && B(Br).insert === B(n).stops.length && a === B(n).stops.length - 1
						}), X(l, "title", e), Y(d, B(i).share ?? 50), X(d, "title", t), W(p, `${r ?? ""}%`);
					}, [
						() => Z("tip.bg.dragStop"),
						() => Z("tip.bg.stopShare"),
						() => B(r) > 0 ? Math.round(Math.max(0, Number(B(i).share) || 0) / B(r) * 100) : Math.round(100 / B(n).stops.length)
					]), V("pointerdown", l, (e) => Vr(t(), e, s, a)), V("input", d, (e) => Ir(t(), s, a, { share: Number(e.target.value) })), U(e, o);
				});
				var d = L(u, 2), f = I(d, !0), p = L(d, 2), m = (e) => {
					var r = Uf(), i = F(r), a = P(i), o = I(L(a));
					D(i);
					var c = L(i, 2);
					J(c);
					var l = L(c, 2), u = P(l), d = I(L(u));
					D(l);
					var f = L(l, 2);
					J(f), z((e, t, r, i) => {
						W(a, `${e ?? ""} `), W(o, `${t ?? ""}%`), Y(c, B(n).x ?? .5), W(u, `${r ?? ""} `), W(d, `${i ?? ""}%`), Y(f, B(n).y ?? .5);
					}, [
						() => Z("lbl.centerX"),
						() => Math.round((B(n).x ?? .5) * 100),
						() => Z("lbl.centerY"),
						() => Math.round((B(n).y ?? .5) * 100)
					]), V("input", c, (e) => Nr(t(), s, "x", Number(e.target.value))), V("input", f, (e) => Nr(t(), s, "y", Number(e.target.value))), U(e, r);
				}, h = (e) => {
					var r = Wf(), i = F(r), a = P(i), o = I(L(a));
					D(i);
					var c = L(i, 2);
					J(c), z((e) => {
						W(a, `${e ?? ""} `), W(o, `${B(n).angle ?? ""}°`), Y(c, B(n).angle);
					}, [() => Z("lbl.angle")]), V("input", c, (e) => Nr(t(), s, "angle", Number(e.target.value))), U(e, r);
				};
				G(p, (e) => {
					(B(n).kind ?? "linear") === "radial" ? e(m) : e(h, -1);
				});
				var g = L(p, 2), _ = P(g), v = I(L(_));
				D(g);
				var y = L(g, 2);
				J(y);
				var b = L(y, 2), x = P(b), S = L(x);
				{
					let e = /* @__PURE__ */ A(() => B(n).animation ?? "none");
					Q(S, {
						get value() {
							return B(e);
						},
						get options() {
							return Pr[(B(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Nr(t(), s, "animation", e)
					});
				}
				D(b), z((e, t, r, i, a, o, s) => {
					W(c, `${e ?? ""} `), X(d, "title", t), W(f, r), W(_, `${i ?? ""} `), W(v, `${a ?? ""}%`), Y(y, B(n).opacity ?? 1), X(b, "title", o), W(x, `${s ?? ""} `);
				}, [
					() => Z("blocks.shape"),
					() => Z("tip.bg.addStop"),
					() => Z("ui.addStop"),
					() => Z("lbl.strength"),
					() => Math.round((B(n).opacity ?? 1) * 100),
					() => Z("tip.bg.motion"),
					() => Z("lbl.motion")
				]), V("click", d, () => Lr(t(), s)), V("input", y, (e) => Nr(t(), s, "opacity", Number(e.target.value))), U(e, i);
			}, v = (e) => {
				var n = Kf(), r = F(n), i = P(r), a = L(i);
				{
					let e = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.bg.glowColor"));
					va(a, {
						get value() {
							return B(o).props.color;
						},
						get tokens() {
							return B(e);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => wr(t(), s, "color", e)
					});
				}
				D(r);
				var c = L(r, 2), l = P(c), u = I(L(l));
				D(c);
				var d = L(c, 2);
				J(d);
				var f = L(d, 2), p = P(f), m = I(L(p));
				D(f);
				var h = L(f, 2);
				J(h);
				var g = L(h, 2), _ = P(g), v = I(L(_));
				D(g);
				var y = L(g, 2);
				J(y);
				var b = L(y, 2), x = P(b), S = I(L(x));
				D(b);
				var C = L(b, 2);
				J(C), z((e, t, n, r, a, s, c, f, g) => {
					W(i, `${e ?? ""} `), W(l, `${t ?? ""} `), W(u, `${n ?? ""}%`), Y(d, B(o).props.x), W(p, `${r ?? ""} `), W(m, `${a ?? ""}%`), Y(h, B(o).props.y), W(_, `${s ?? ""} `), W(v, `${c ?? ""}%`), Y(y, B(o).props.radius), W(x, `${f ?? ""} `), W(S, `${g ?? ""}%`), Y(C, B(o).props.opacity);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.posX"),
					() => Math.round(B(o).props.x * 100),
					() => Z("lbl.posY"),
					() => Math.round(B(o).props.y * 100),
					() => Z("lbl.size"),
					() => Math.round(B(o).props.radius * 100),
					() => Z("lbl.strength"),
					() => Math.round(B(o).props.opacity * 100)
				]), V("input", d, (e) => wr(t(), s, "x", Number(e.target.value))), V("input", h, (e) => wr(t(), s, "y", Number(e.target.value))), V("input", y, (e) => wr(t(), s, "radius", Number(e.target.value))), V("input", C, (e) => wr(t(), s, "opacity", Number(e.target.value))), U(e, n);
			}, y = (e) => {
				var n = qf(), r = F(n), i = P(r), a = I(L(i));
				D(r);
				var c = L(r, 2);
				J(c), z((e, t) => {
					W(i, `${e ?? ""} `), W(a, `${t ?? ""}%`), Y(c, B(o).props.opacity);
				}, [() => Z("lbl.strength"), () => Math.round(B(o).props.opacity * 100)]), V("input", c, (e) => wr(t(), s, "opacity", Number(e.target.value))), U(e, n);
			}, b = (e) => {
				var n = Jf(), r = F(n), i = P(r), a = L(i);
				{
					let e = /* @__PURE__ */ A(() => Mu(B(o).props.pattern)), n = /* @__PURE__ */ A(() => Ou.map((e) => [e, Z(`opt.bgPattern.${e}`)]));
					Q(a, {
						get value() {
							return B(e);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => wr(t(), s, "pattern", e)
					});
				}
				D(r);
				var c = L(r, 2), l = P(c), u = L(l);
				{
					let e = /* @__PURE__ */ A(() => B(o).props.color ?? "text"), n = /* @__PURE__ */ A(vi), r = /* @__PURE__ */ A(() => Z("lbl.color"));
					va(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(n);
						},
						get label() {
							return B(r);
						},
						onchange: (e) => wr(t(), s, "color", e)
					});
				}
				D(c);
				var d = L(c, 2), f = P(d), p = I(L(f));
				D(d);
				var m = L(d, 2);
				J(m);
				var h = L(m, 2), g = P(h), _ = I(L(g));
				D(h);
				var v = L(h, 2);
				J(v);
				var y = L(v, 2), b = P(y), x = I(L(b));
				D(y);
				var S = L(y, 2);
				J(S);
				var C = L(S, 2), ee = P(C);
				J(ee);
				var te = L(ee);
				D(C), z((e, t, n, r, a, s, c, u) => {
					W(i, `${e ?? ""} `), W(l, `${t ?? ""} `), W(f, `${n ?? ""} `), W(p, `${B(o).props.size ?? ku.dflt ?? ""} px`), X(m, "min", ku.min), X(m, "max", ku.max), Y(m, B(o).props.size ?? ku.dflt), W(g, `${r ?? ""} `), W(_, `${a ?? ""}%`), Y(v, B(o).props.opacity ?? .12), W(b, `${s ?? ""} `), W(x, `${B(o).props.rotation ?? 0 ?? ""}°`), Y(S, B(o).props.rotation ?? 0), X(C, "title", c), xi(ee, B(o).props.invert === !0), W(te, ` ${u ?? ""}`);
				}, [
					() => Z("lbl.bgPattern"),
					() => Z("lbl.color"),
					() => Z("lbl.size"),
					() => Z("lbl.strength"),
					() => Math.round((B(o).props.opacity ?? .12) * 100),
					() => Z("lbl.patternRotation"),
					() => Z("tip.bg.patternInvert"),
					() => Z("lbl.patternInvert")
				]), V("input", m, (e) => wr(t(), s, "size", Number(e.target.value))), V("input", v, (e) => wr(t(), s, "opacity", Number(e.target.value))), V("input", S, (e) => wr(t(), s, "rotation", Number(e.target.value))), V("change", ee, (e) => wr(t(), s, "invert", e.target.checked)), U(e, n);
			}, x = (e) => {
				let n = /* @__PURE__ */ A(() => B(o).props.fit === "tile" || B(o).props.fit === "repeat");
				var r = Zf(), a = F(r), c = P(a), l = L(c);
				D(a);
				var u = L(a, 2), d = P(u), f = L(d);
				{
					let e = /* @__PURE__ */ A(() => B(n) ? "tile" : "plain"), r = /* @__PURE__ */ A(() => [["plain", Z("opt.img.plain")], ["tile", Z("opt.img.tile")]]);
					Q(f, {
						get value() {
							return B(e);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => wr(t(), s, "fit", e)
					});
				}
				D(u);
				var p = L(u, 2), m = I(p, !0), h = L(p, 2), g = P(h), _ = L(g, 2);
				J(_);
				var v = L(_, 4);
				D(h);
				var y = L(h, 2), b = (e) => {
					var n = Yf(), r = F(n), i = P(r), a = I(i, !0), c = L(i, 2), l = I(c, !0);
					D(r);
					var u = L(r, 2), d = I(u, !0), f = L(u, 2), p = L(f, 2), m = P(p), h = I(L(m));
					D(p);
					var g = L(p, 2);
					J(g);
					var _ = L(g, 2), v = P(_), y = I(L(v));
					D(_);
					var b = L(_, 2);
					J(b), z((e, t, n, r, s, p, _, x, S, C, ee, te) => {
						X(i, "title", e), W(a, t), X(c, "title", n), W(l, r), X(u, "title", s), W(d, p), gi(f, `--fx:${_ ?? ""}%; --fy:${x ?? ""}%`), W(m, `${S ?? ""} `), W(h, `${C ?? ""}%`), Y(g, B(o).props.x ?? .5), W(v, `${ee ?? ""} `), W(y, `${te ?? ""}%`), Y(b, B(o).props.y ?? .5);
					}, [
						() => Z("tip.bg.cover"),
						() => Z("ui.cover"),
						() => Z("opt.fitFrame.contain"),
						() => Z("opt.fit.contain"),
						() => Z("tip.bg.position"),
						() => Z("lbl.position"),
						() => Math.max(0, Math.min(1, B(o).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, B(o).props.y ?? .5)) * 100,
						() => Z("lbl.horizontal"),
						() => Math.round((B(o).props.x ?? .5) * 100),
						() => Z("lbl.vertical"),
						() => Math.round((B(o).props.y ?? .5) * 100)
					]), V("click", i, () => kr(t(), s, B(o), "cover")), V("click", c, () => kr(t(), s, B(o), "contain")), V("pointerdown", f, (e) => Tr(e, t(), s, "xy")), V("input", g, (e) => wr(t(), s, "x", Number(e.target.value))), V("input", b, (e) => wr(t(), s, "y", Number(e.target.value))), U(e, n);
				};
				G(y, (e) => {
					B(n) || e(b);
				});
				var x = L(y, 2), S = P(x), C = I(L(S));
				D(x);
				var ee = L(x, 2);
				J(ee);
				var te = L(ee, 2), w = P(te), ne = I(L(w));
				D(te);
				var re = L(te, 2);
				J(re);
				var ie = L(re, 2);
				i(ie, t, () => s, () => B(o));
				var ae = L(ie, 2), oe = P(ae);
				J(oe);
				var se = L(oe);
				D(ae);
				var T = L(ae, 2), ce = (e) => {
					var n = Xf(), r = F(n), i = P(r), a = I(L(i));
					D(r);
					var c = L(r, 2);
					J(c);
					var l = L(c, 2), u = P(l), d = L(u);
					{
						let e = /* @__PURE__ */ A(() => B(o).props.bleed ?? "none"), n = /* @__PURE__ */ A(() => [
							["none", Z("common.none")],
							["up", Z("opt.bleed.up")],
							["down", Z("opt.bleed.down")],
							["both", Z("opt.brand.both")]
						]);
						Q(d, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => wr(t(), s, "bleed", e)
						});
					}
					D(l), z((e, t, n, r) => {
						W(i, `${e ?? ""} `), W(a, `${t ?? ""}%`), Y(c, B(o).props.parallax ?? .3), X(l, "title", n), W(u, `${r ?? ""} `);
					}, [
						() => Z("lbl.parallaxStrength"),
						() => Math.round((B(o).props.parallax ?? 0) * 100),
						() => Z("tip.bg.bleed"),
						() => Z("lbl.bleed")
					]), V("input", c, (e) => wr(t(), s, "parallax", Number(e.target.value))), U(e, n);
				};
				G(T, (e) => {
					(B(o).props.parallax ?? 0) > 0 && e(ce);
				}), z((e, t, n, r, i, s, l, f, h, y, b, x, te, ie) => {
					X(a, "title", e), W(c, `${t ?? ""} `), X(u, "title", n), W(d, `${r ?? ""} `), X(p, "title", i), W(m, s), X(g, "title", l), Y(_, f), X(v, "title", h), W(S, `${y ?? ""} `), W(C, `${B(o).props.blur ?? 0 ?? ""} px`), Y(ee, B(o).props.blur ?? 0), W(w, `${b ?? ""} `), W(ne, `${x ?? ""}%`), Y(re, B(o).props.opacity ?? 1), X(ae, "title", te), xi(oe, (B(o).props.parallax ?? 0) > 0), W(se, ` ${ie ?? ""}`);
				}, [
					() => Z("tip.webpAuto"),
					() => B(o).props.src ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("tip.bg.size"),
					() => Z("lbl.size"),
					() => Z("tip.smaller"),
					() => Math.round((B(o).props.size ?? 1) * 100),
					() => Z("tip.larger"),
					() => Z("lbl.blur"),
					() => Z("lbl.strength"),
					() => Math.round((B(o).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), V("change", l, (e) => Qr(t(), s, e)), V("click", g, () => Dr(t(), s, B(o).props.size ?? 1, -.05)), V("change", _, (e) => Or(t(), s, e.target.value)), V("click", v, () => Dr(t(), s, B(o).props.size ?? 1, .05)), V("input", ee, (e) => wr(t(), s, "blur", Number(e.target.value))), V("input", re, (e) => wr(t(), s, "opacity", Number(e.target.value))), V("change", oe, (e) => wr(t(), s, "parallax", e.target.checked ? .3 : 0)), U(e, r);
			}, S = (e) => {
				let i = /* @__PURE__ */ A(() => xc(B(o))), a = /* @__PURE__ */ A(() => B(i).style ?? "floating"), c = /* @__PURE__ */ A(() => al(B(a), B(i).motion)), l = /* @__PURE__ */ A(() => (B(i).seed ?? 0) > 0);
				var u = cp(), d = F(u);
				r(d, t, () => s, () => B(o));
				var f = L(d, 2);
				n(f, t, () => s, () => B(o));
				var p = L(f, 2), m = P(p), h = L(m);
				{
					let e = /* @__PURE__ */ A(() => Pc.map((e) => [e, Z(`opt.galleryStyle.${e}`)]));
					Q(h, {
						get value() {
							return B(a);
						},
						get options() {
							return B(e);
						},
						onchange: (e) => wr(t(), s, "style", e)
					});
				}
				D(p);
				var g = L(p, 2), _ = (e) => {
					var n = Qf(), r = F(n), a = P(r), o = L(a);
					{
						let e = /* @__PURE__ */ A(() => B(i).fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
						Q(o, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => wr(t(), s, "fit", e)
						});
					}
					D(r);
					var c = L(r, 2), l = P(c), u = I(L(l));
					D(c);
					var d = L(c, 2);
					J(d);
					var f = L(d, 2), p = P(f), m = I(L(p));
					D(f);
					var h = L(f, 2);
					J(h);
					var g = L(h, 2), _ = P(g), v = I(L(_));
					D(g);
					var y = L(g, 2);
					J(y), z((e, t, n, r, o) => {
						W(a, `${e ?? ""} `), W(l, `${t ?? ""} `), W(u, `${B(i).interval ?? 12 ?? ""} s`), Y(d, B(i).interval ?? 12), W(p, `${n ?? ""} `), W(m, `${r ?? ""} s`), Y(h, B(i).fade ?? 1.5), W(_, `${o ?? ""} `), W(v, `${B(i).blur ?? 0 ?? ""} px`), Y(y, B(i).blur ?? 0);
					}, [
						() => Z("lbl.fit"),
						() => Z("lbl.secondsPerImage"),
						() => Z("lbl.transition"),
						() => (B(i).fade ?? 1.5).toFixed(1),
						() => Z("lbl.blur")
					]), V("input", d, (e) => wr(t(), s, "interval", Number(e.target.value))), V("input", h, (e) => wr(t(), s, "fade", Number(e.target.value))), V("input", y, (e) => wr(t(), s, "blur", Number(e.target.value))), U(e, n);
				}, v = (e) => {
					var n = ap(), r = F(n), o = (e) => {
						var n = $f(), r = F(n), a = P(r), o = L(a);
						{
							let e = /* @__PURE__ */ A(() => String(B(i).rows ?? 2));
							Q(o, {
								get value() {
									return B(e);
								},
								options: [["1", "1"], ["2", "2"]],
								onchange: (e) => wr(t(), s, "rows", Number(e))
							});
						}
						D(r);
						var c = L(r, 2), l = P(c), u = L(l);
						{
							let e = /* @__PURE__ */ A(() => B(i).direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", Z("opt.ribbonDir.left")], ["right", Z("opt.ribbonDir.right")]]);
							Q(u, {
								get value() {
									return B(e);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => wr(t(), s, "direction", e)
							});
						}
						D(c), z((e, t) => {
							W(a, `${e ?? ""} `), W(l, `${t ?? ""} `);
						}, [() => Z("lbl.galleryRows"), () => Z("lbl.photoDirection")]), U(e, n);
					}, c = (e) => {
						var n = tp(), r = F(n), o = P(r), c = L(o);
						J(c), D(r);
						var u = L(r, 2), d = P(u), f = L(d);
						{
							let e = /* @__PURE__ */ A(() => B(i).repeat === !0 ? "repeat" : "once"), n = /* @__PURE__ */ A(() => [["once", Z("opt.galleryRepeat.once")], ["repeat", Z("opt.galleryRepeat.repeat")]]);
							Q(f, {
								get value() {
									return B(e);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => wr(t(), s, "repeat", e === "repeat")
							});
						}
						D(u);
						var p = L(u, 2), m = P(p), h = L(m);
						{
							let e = /* @__PURE__ */ A(() => B(l) ? "fixed" : "random"), n = /* @__PURE__ */ A(() => [["random", Z("opt.galleryPlace.random")], ["fixed", Z("opt.galleryPlace.fixed")]]);
							Q(h, {
								get value() {
									return B(e);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => wr(t(), s, "seed", e === "fixed" ? ri() : 0)
							});
						}
						D(p);
						var g = L(p, 2), _ = (e) => {
							var n = ep(), r = P(n);
							K(r, () => w.shuffle);
							var i = L(r);
							D(n), z((e, t) => {
								X(n, "title", e), W(i, ` ${t ?? ""}`);
							}, [() => Z("tip.bg.photoSeed"), () => Z("ui.shufflePhotos")]), V("click", n, () => wr(t(), s, "seed", ri())), U(e, n);
						};
						G(g, (e) => {
							B(l) && e(_);
						}), z((e, t, n, s, l, f) => {
							X(r, "title", e), W(o, `${t ?? ""} `), X(c, "min", B(a) === "mosaic" ? 4 : 1), Y(c, B(i).count ?? (B(a) === "mosaic" ? 12 : 8)), X(u, "title", n), W(d, `${s ?? ""} `), X(p, "title", l), W(m, `${f ?? ""} `);
						}, [
							() => Z("tip.bg.photoCount"),
							() => Z("lbl.photoCount"),
							() => Z("tip.bg.galleryRepeat"),
							() => Z("lbl.galleryRepeat"),
							() => Z("tip.bg.galleryPlace"),
							() => Z("lbl.galleryPlace")
						]), V("change", c, (e) => wr(t(), s, "count", Number(e.target.value))), U(e, n);
					};
					G(r, (e) => {
						B(a) === "band" ? e(o) : e(c, -1);
					});
					var u = L(r, 2), d = P(u), f = I(L(d));
					D(u);
					var p = L(u, 2);
					J(p);
					var m = L(p, 2), h = (e) => {
						var n = np(), r = F(n), a = P(r), o = I(L(a));
						D(r);
						var c = L(r, 2);
						J(c);
						var l = L(c, 2), u = P(l), d = I(L(u));
						D(l);
						var f = L(l, 2);
						J(f), z((e, t, n, s) => {
							X(r, "title", e), W(a, `${t ?? ""} `), W(o, `${n ?? ""}%`), Y(c, B(i).spread ?? .85), W(u, `${s ?? ""} `), W(d, `${B(i).tilt ?? 5 ?? ""}°`), Y(f, B(i).tilt ?? 5);
						}, [
							() => Z("tip.bg.photoSpread"),
							() => Z("lbl.photoSpread"),
							() => Math.round((B(i).spread ?? .85) * 100),
							() => Z("lbl.photoTilt")
						]), V("input", c, (e) => wr(t(), s, "spread", Number(e.target.value))), V("input", f, (e) => wr(t(), s, "tilt", Number(e.target.value))), U(e, n);
					};
					G(m, (e) => {
						B(a) === "floating" && e(h);
					});
					var g = L(m, 2), _ = P(g), v = L(_);
					{
						let e = /* @__PURE__ */ A(() => B(i).shape ?? "rect"), n = /* @__PURE__ */ A(() => Fc.map((e) => [e, Z(`opt.galleryShape.${e}`)]));
						Q(v, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => wr(t(), s, "shape", e)
						});
					}
					D(g);
					var y = L(g, 2), b = P(y), x = L(b);
					{
						let e = /* @__PURE__ */ A(() => B(i).look ?? "shadow"), n = /* @__PURE__ */ A(() => Ic.map((e) => [e, Z(`opt.galleryLook.${e}`)]));
						Q(x, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => wr(t(), s, "look", e)
						});
					}
					D(y);
					var S = L(y, 2), C = (e) => {
						var n = rp(), r = P(n), a = L(r);
						{
							let e = /* @__PURE__ */ A(() => dl(B(i).look, B(i).frameColor)), n = /* @__PURE__ */ A(vi), r = /* @__PURE__ */ A(() => Z("tip.bg.frameColor"));
							va(a, {
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
								onchange: (e) => wr(t(), s, "frameColor", e ?? "")
							});
						}
						D(n), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.frameColor")]), U(e, n);
					}, ee = /* @__PURE__ */ A(() => ul(B(i).look));
					G(S, (e) => {
						B(ee) && e(C);
					});
					var te = L(S, 2), ne = (e) => {
						var n = ip(), r = F(n), a = P(r), o = I(L(a));
						D(r);
						var c = L(r, 2);
						J(c), z((e) => {
							W(a, `${e ?? ""} `), W(o, `${B(i).radius ?? 5 ?? ""} px`), Y(c, B(i).radius ?? 5);
						}, [() => Z("lbl.rounding")]), V("input", c, (e) => wr(t(), s, "radius", Number(e.target.value))), U(e, n);
					}, re = /* @__PURE__ */ A(() => gl(B(i).shape) && (B(i).look ?? "shadow") !== "polaroid");
					G(te, (e) => {
						B(re) && e(ne);
					}), z((e, t, n, r, i, a, o) => {
						W(d, `${e ?? ""} `), W(f, `${t ?? ""} px`), Y(p, n), X(g, "title", r), W(_, `${i ?? ""} `), X(y, "title", a), W(b, `${o ?? ""} `);
					}, [
						() => Z("lbl.size"),
						() => ll(B(i).size, B(a)),
						() => ll(B(i).size, B(a)),
						() => Z("tip.bg.galleryShape"),
						() => Z("lbl.galleryShape"),
						() => Z("tip.bg.galleryLook"),
						() => Z("lbl.galleryLook")
					]), V("input", p, (e) => wr(t(), s, "size", Number(e.target.value))), U(e, n);
				};
				G(g, (e) => {
					B(a) === "fill" ? e(_) : e(v, -1);
				});
				var y = L(g, 2), b = P(y), x = L(b);
				{
					let e = /* @__PURE__ */ A(() => B(i).tone ?? "natural"), n = /* @__PURE__ */ A(() => Lc.map((e) => [e, Z(`opt.galleryTone.${e}`)]));
					Q(x, {
						get value() {
							return B(e);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => wr(t(), s, "tone", e)
					});
				}
				D(y);
				var S = L(y, 2), C = (e) => {
					var n = rp(), r = P(n), i = L(r);
					{
						let e = /* @__PURE__ */ A(() => ol(B(a)).map((e) => [e, Z(e === "none" ? "common.none" : `opt.galleryMotion.${e}`)]));
						Q(i, {
							get value() {
								return B(c);
							},
							get options() {
								return B(e);
							},
							onchange: (e) => wr(t(), s, "motion", e)
						});
					}
					D(n), z((e, t) => {
						X(n, "title", e), W(r, `${t ?? ""} `);
					}, [() => Z("tip.bg.photoMotion"), () => Z("lbl.motion")]), U(e, n);
				}, ee = /* @__PURE__ */ A(() => ol(B(a)).length > 1);
				G(S, (e) => {
					B(ee) && e(C);
				});
				var te = L(S, 2), ne = (e) => {
					var n = op(), r = F(n), a = P(r), o = I(L(a));
					D(r);
					var c = L(r, 2);
					J(c), z((e) => {
						W(a, `${e ?? ""} `), W(o, `${B(i).interval ?? 12 ?? ""} s`), Y(c, B(i).interval ?? 12);
					}, [() => Z("lbl.secondsPerImage")]), V("input", c, (e) => wr(t(), s, "interval", Number(e.target.value))), U(e, n);
				}, re = (e) => {
					var n = op(), r = F(n), a = P(r), o = I(L(a));
					D(r);
					var c = L(r, 2);
					J(c), z((e) => {
						W(a, `${e ?? ""} `), W(o, `${B(i).motionSpeed ?? 30 ?? ""} s`), Y(c, B(i).motionSpeed ?? 30);
					}, [() => Z("lbl.motionSpeed")]), V("input", c, (e) => wr(t(), s, "motionSpeed", Number(e.target.value))), U(e, n);
				};
				G(te, (e) => {
					B(c) === "crossfade" && B(a) !== "fill" ? e(ne) : (B(c) !== "none" || B(a) === "band") && e(re, 1);
				});
				var ie = L(te, 2), ae = P(ie);
				J(ae);
				var oe = L(ae);
				D(ie);
				var se = L(ie, 2), T = (e) => {
					var n = sp();
					let r;
					var a = P(n);
					J(a);
					var o = L(a);
					D(n), z((e, t) => {
						r = q(n, 1, "gridmenu-snap svelte-1n46o8q", null, r, { muted: B(i).underNav === !1 }), X(n, "title", e), xi(a, B(i).underAnnounce === !0), a.disabled = B(i).underNav === !1, W(o, ` ${t ?? ""}`);
					}, [() => Z("tip.bg.underAnnounce"), () => Z("lbl.underAnnounce")]), V("change", a, (e) => e.target.checked ? Cr(t(), s, {
						underAnnounce: !0,
						underNav: !0
					}) : wr(t(), s, "underAnnounce", !1)), U(e, n);
				};
				G(se, (e) => {
					B(k).nav?.announcement?.text && e(T);
				});
				var ce = L(se, 2), le = P(ce), ue = I(L(le));
				D(ce);
				var de = L(ce, 2);
				J(de), z((e, t, n, r, a, o, s, c) => {
					X(p, "title", e), W(m, `${t ?? ""} `), X(y, "title", n), W(b, `${r ?? ""} `), X(ie, "title", a), xi(ae, B(i).underNav !== !1), W(oe, ` ${o ?? ""}`), W(le, `${s ?? ""} `), W(ue, `${c ?? ""}%`), Y(de, B(i).opacity ?? .85);
				}, [
					() => Z("tip.bg.galleryStyle"),
					() => Z("lbl.galleryStyle"),
					() => Z("tip.bg.galleryTone"),
					() => Z("lbl.galleryTone"),
					() => Z("tip.bg.underNav"),
					() => Z("lbl.underNav"),
					() => Z("lbl.strength"),
					() => Math.round((B(i).opacity ?? .85) * 100)
				]), V("change", ae, (e) => e.target.checked ? wr(t(), s, "underNav", !0) : Cr(t(), s, {
					underNav: !1,
					underAnnounce: !1
				})), V("input", de, (e) => wr(t(), s, "opacity", Number(e.target.value))), U(e, u);
			}, C = (e) => {
				var n = up(), r = F(n), i = P(r), a = L(i);
				D(r);
				var c = L(r, 2), l = P(c), u = L(l);
				D(c);
				var d = L(c, 2), f = P(d), p = L(f);
				{
					let e = /* @__PURE__ */ A(() => B(o).props.fit ?? "cover"), n = /* @__PURE__ */ A(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
					Q(p, {
						get value() {
							return B(e);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => wr(t(), s, "fit", e)
					});
				}
				D(d);
				var m = L(d, 2), h = P(m), g = I(L(h));
				D(m);
				var _ = L(m, 2);
				J(_);
				var v = L(_, 2), y = P(v), b = I(L(y));
				D(v);
				var x = L(v, 2);
				J(x);
				var S = L(x, 2), C = P(S), ee = I(L(C));
				D(S);
				var te = L(S, 2);
				J(te);
				var w = L(te, 2), ne = P(w);
				J(ne);
				var re = L(ne);
				D(w);
				var ie = L(w, 2), ae = (e) => {
					var n = lp(), r = F(n), i = P(r), a = I(L(i));
					D(r);
					var c = L(r, 2);
					J(c), z((e, t) => {
						W(i, `${e ?? ""} `), W(a, `${t ?? ""}%`), Y(c, B(o).props.parallax ?? .3);
					}, [() => Z("lbl.parallaxStrength"), () => Math.round((B(o).props.parallax ?? 0) * 100)]), V("input", c, (e) => wr(t(), s, "parallax", Number(e.target.value))), U(e, n);
				};
				G(ie, (e) => {
					(B(o).props.parallax ?? 0) > 0 && e(ae);
				}), z((e, t, n, a, s, u, p, m, v, S, ie, ae, oe, se) => {
					X(r, "title", e), W(i, `${t ?? ""} `), X(c, "title", n), W(l, `${a ?? ""} `), X(d, "title", s), W(f, `${u ?? ""} `), W(h, `${p ?? ""} `), W(g, `${m ?? ""}%`), Y(_, B(o).props.x ?? .5), W(y, `${v ?? ""} `), W(b, `${S ?? ""}%`), Y(x, B(o).props.y ?? .5), W(C, `${ie ?? ""} `), W(ee, `${ae ?? ""}%`), Y(te, B(o).props.opacity ?? 1), X(w, "title", oe), xi(ne, (B(o).props.parallax ?? 0) > 0), W(re, ` ${se ?? ""}`);
				}, [
					() => Z("tip.bg.videoFile"),
					() => B(o).props.src ? Z("ui.changeVideo") : Z("ui.chooseVideo"),
					() => Z("tip.bg.poster"),
					() => B(o).props.poster ? Z("ui.changeImage") : Z("ui.choosePoster"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("lbl.horizontal"),
					() => Math.round((B(o).props.x ?? .5) * 100),
					() => Z("lbl.vertical"),
					() => Math.round((B(o).props.y ?? .5) * 100),
					() => Z("lbl.strength"),
					() => Math.round((B(o).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), V("change", a, (e) => $r(t(), s, e)), V("change", u, (e) => ei(t(), s, e)), V("input", _, (e) => wr(t(), s, "x", Number(e.target.value))), V("input", x, (e) => wr(t(), s, "y", Number(e.target.value))), V("input", te, (e) => wr(t(), s, "opacity", Number(e.target.value))), V("change", ne, (e) => wr(t(), s, "parallax", e.target.checked ? .3 : 0)), U(e, n);
			};
			G(h, (e) => {
				B(o).type === "color" ? e(g) : B(o).type === "gradient" ? e(_, 1) : B(o).type === "glow" ? e(v, 2) : B(o).type === "grain" ? e(y, 3) : B(o).type === "pattern" ? e(b, 4) : B(o).type === "image" ? e(x, 5) : B(o).type === "slideshow" ? e(S, 6) : B(o).type === "video" && e(C, 7);
			}), D(c), z((e, t, n) => {
				X(f, "title", e), X(p, "title", t), p.disabled = s === a().length - 1, X(m, "title", n);
			}, [
				() => Z("hint.bg.order"),
				() => Z("hint.bg.order"),
				() => Z("tip.bg.removeLayer")
			]), V("click", f, () => xr(t(), s, -1)), V("click", p, () => xr(t(), s, 1)), V("click", m, () => yr(t(), s)), U(e, c);
		});
		var c = L(s, 2), l = P(c), u = L(l);
		{
			let e = /* @__PURE__ */ A(() => ee.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
			Q(u, {
				get value() {
					return B(_r);
				},
				get options() {
					return B(e);
				},
				onchange: (e) => M(_r, e, !0)
			});
		}
		D(c);
		var d = L(c, 2), p = I(d, !0);
		z((e, t) => {
			W(l, `${e ?? ""} `), W(p, t);
		}, [() => Z("lbl.newLayer"), () => Z("ui.addLayer")]), V("click", d, () => vr(t(), B(_r))), U(e, o);
	}, o = (e, t = f, n = f) => {
		var r = Mr();
		qr(F(r), 17, n, Ur, (e, r, i) => {
			var a = mp(), o = P(a);
			J(o);
			var s = L(o, 2), c = P(s);
			c.disabled = i === 0, K(c, () => w.up, !0), D(c);
			var l = L(c, 2);
			K(l, () => w.down, !0), D(l);
			var u = L(l, 2);
			K(u, () => w.cross, !0), D(u), D(s);
			var d = L(s, 2), f = P(d);
			{
				let e = /* @__PURE__ */ A(() => B(r).page ?? "__href"), n = /* @__PURE__ */ A(() => Z("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
				Q(f, {
					get value() {
						return B(e);
					},
					get title() {
						return B(n);
					},
					get options() {
						return B(a);
					},
					onchange: (e) => Hu(t(), i, e)
				});
			}
			D(d);
			var p = L(d, 2), m = (e) => {
				var n = pp();
				J(n), z((e, t) => {
					Y(n, B(r).href ?? ""), X(n, "placeholder", e), X(n, "title", t);
				}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), V("change", n, (e) => Uu(t(), i, e.target.value)), U(e, n);
			};
			G(p, (e) => {
				B(r).page || e(m);
			}), D(a), z((e, t) => {
				Y(o, B(r).label), X(o, "title", e), l.disabled = i === n().length - 1, X(u, "title", t);
			}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), V("input", o, (e) => Vu(t(), i, e.target.value)), V("click", c, () => Lu(t(), i, -1)), V("click", l, () => Lu(t(), i, 1)), V("click", u, () => Iu(t(), i)), U(e, a);
		}), U(e, r);
	}, s = (e) => {
		let t = /* @__PURE__ */ A(() => B(N).props.boxStyle ?? {});
		var n = gp(), r = F(n), i = P(r), a = L(i);
		{
			let e = /* @__PURE__ */ A(() => B(t).bg ?? ""), n = /* @__PURE__ */ A(vi), r = /* @__PURE__ */ A(() => Z("tip.box.bg"));
			va(a, {
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
				onchange: (e) => Sn({ bg: e || null })
			});
		}
		D(r);
		var o = L(r, 2), s = P(o), c = L(s);
		{
			let e = /* @__PURE__ */ A(() => B(t).shadow ?? ""), n = /* @__PURE__ */ A(() => [
				["", Z("common.none")],
				["soft", Z("opt.shadow.soft")],
				["strong", Z("opt.shadow.strong")]
			]);
			Q(c, {
				get value() {
					return B(e);
				},
				get options() {
					return B(n);
				},
				onchange: (e) => Sn({ shadow: e || null })
			});
		}
		D(o);
		var l = L(o, 2), u = (e) => {
			var n = rp(), r = P(n), i = L(r);
			{
				let e = /* @__PURE__ */ A(() => B(t).shadowColor ?? ""), n = /* @__PURE__ */ A(vi), r = /* @__PURE__ */ A(() => Z("tip.box.shadowColor"));
				va(i, {
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
					onchange: (e) => Sn({ shadowColor: e || null })
				});
			}
			D(n), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.shadowColor")]), U(e, n);
		};
		G(l, (e) => {
			B(t).shadow && e(u);
		});
		var d = L(l, 2), f = P(d), p = L(f);
		{
			let e = /* @__PURE__ */ A(() => B(t).border === "none" ? "none" : B(t).border ? "custom" : ""), n = /* @__PURE__ */ A(() => [
				["", Z("opt.border.theme")],
				["none", Z("common.none")],
				["custom", Z("opt.border.custom")]
			]);
			Q(p, {
				get value() {
					return B(e);
				},
				get options() {
					return B(n);
				},
				onchange: (e) => Sn({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		D(d);
		var m = L(d, 2), h = (e) => {
			let n = /* @__PURE__ */ A(() => typeof B(t).border == "object" ? B(t).border : {
				color: "text",
				width: 1
			});
			var r = hp(), i = F(r), a = P(i), o = L(a);
			{
				let e = /* @__PURE__ */ A(vi), t = /* @__PURE__ */ A(() => Z("tip.box.borderColor"));
				va(o, {
					get value() {
						return B(n).color;
					},
					get tokens() {
						return B(e);
					},
					get label() {
						return B(t);
					},
					onchange: (e) => Sn({ border: {
						...B(n),
						color: e
					} })
				});
			}
			D(i);
			var s = L(i, 2), c = P(s), l = L(c), u = P(l), d = L(u, 2);
			J(d);
			var f = L(d, 2);
			D(l), D(s), z((e, t, r, i, o, s) => {
				W(a, `${e ?? ""} `), W(c, `${t ?? ""} `), X(u, "title", r), X(u, "aria-label", i), Y(d, B(n).width), X(f, "title", o), X(f, "aria-label", s);
			}, [
				() => Z("lbl.borderColor"),
				() => Z("lbl.thicknessPx"),
				() => Z("tip.thinner"),
				() => Z("tip.thinner"),
				() => Z("tip.thicker"),
				() => Z("tip.thicker")
			]), V("click", u, () => Sn({ border: {
				...B(n),
				width: Math.max(1, B(n).width - 1)
			} })), V("change", d, (e) => Sn({ border: {
				...B(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), V("click", f, () => Sn({ border: {
				...B(n),
				width: Math.min(12, B(n).width + 1)
			} })), U(e, r);
		};
		G(m, (e) => {
			B(t).border !== "none" && e(h);
		});
		var g = L(m, 2), _ = P(g);
		J(_);
		var v = L(_);
		D(g), z((e, t, n, r, a, o) => {
			W(i, `${e ?? ""} `), W(s, `${t ?? ""} `), W(f, `${n ?? ""} `), X(g, "title", r), xi(_, a), W(v, ` ${o ?? ""}`);
		}, [
			() => Z("lbl.blockColor"),
			() => Z("lbl.shadow"),
			() => Z("lbl.border"),
			() => Z("tip.box.glass"),
			() => !!B(t).glass,
			() => Z("lbl.glass")
		]), V("change", _, (e) => Sn({ glass: e.target.checked || null })), U(e, n);
	}, c = (e) => {
		var t = Lm(), n = F(t), r = P(n), i = P(r);
		let a;
		var o = I(i, !0), c = L(i, 2);
		let l;
		var u = I(c, !0);
		D(r), D(n);
		var d = L(n, 2), f = (e) => {
			var t = Mr(), n = F(t), r = (e) => {
				var t = _p(), n = I(t, !0);
				z((e) => W(n, e), [() => Z("hint.textInline")]), U(e, t);
			}, i = (e) => {
				var t = Sp(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.mode ?? "mailto"), t = /* @__PURE__ */ A(() => [["mailto", Z("form.modeMailto")], ["endpoint", Z("form.modeEndpoint")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("mode", e)
					});
				}
				D(n);
				var a = L(n, 2), o = (e) => {
					var t = vp(), n = P(t), r = L(n);
					J(r), D(t), z((e, i, a) => {
						X(t, "title", e), W(n, `${i ?? ""} `), Y(r, B(N).props.endpoint ?? ""), X(r, "placeholder", a);
					}, [
						() => Z("form.endpointNote"),
						() => Z("form.endpoint"),
						() => Z("form.endpointPh")
					]), V("change", r, (e) => R("endpoint", e.target.value.trim())), U(e, t);
				}, s = (e) => {
					var t = yp(), n = F(t), r = P(n), i = L(r);
					J(i), D(n);
					var a = L(n, 2), o = P(a), s = L(o);
					J(s), D(a), z((e, t, n, a) => {
						W(r, `${e ?? ""} `), Y(i, B(N).props.recipient ?? ""), X(i, "placeholder", t), W(o, `${n ?? ""} `), Y(s, B(N).props.subject ?? ""), X(s, "placeholder", a);
					}, [
						() => Z("form.recipient"),
						() => Z("form.recipientPh"),
						() => Z("form.subject"),
						() => Z("form.subjectPh")
					]), V("change", i, (e) => R("recipient", e.target.value.trim())), V("change", s, (e) => R("subject", e.target.value.trim())), U(e, t);
				};
				G(a, (e) => {
					(B(N).props.mode ?? "mailto") === "endpoint" ? e(o) : e(s, -1);
				});
				var c = L(a, 2), l = I(c, !0), u = L(c, 2);
				qr(u, 19, () => B(N).props.fields ?? [], (e, t) => e.id ?? t, (e, t, n) => {
					var r = xp(), i = F(r), a = P(i);
					J(a);
					var o = L(a, 2);
					{
						let e = /* @__PURE__ */ A(() => B(t).type ?? "text"), r = /* @__PURE__ */ A(() => Cn.map((e) => [e, Z(`form.type${e[0].toUpperCase()}${e.slice(1)}`)]));
						Q(o, {
							get value() {
								return B(e);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => En(B(n), { type: e })
						});
					}
					var s = L(o, 2), c = P(s);
					K(c, () => w.up, !0), D(c);
					var l = L(c, 2);
					K(l, () => w.down, !0), D(l);
					var u = L(l, 2);
					K(u, () => w.cross, !0), D(u), D(s), D(i);
					var d = L(i, 2), f = P(d);
					J(f);
					var p = L(f);
					D(d);
					var m = L(d, 2), h = (e) => {
						var r = bp();
						J(r), z((e, t) => {
							Y(r, e), X(r, "placeholder", t);
						}, [() => (B(t).options ?? []).join(", "), () => Z("form.optionsPh")]), V("change", r, (e) => Dn(B(n), e.target.value)), U(e, r);
					}, g = /* @__PURE__ */ A(() => wn.has(B(t).type));
					G(m, (e) => {
						B(g) && e(h);
					}), z((e, r, i) => {
						Y(a, B(t).label), X(a, "placeholder", e), c.disabled = B(n) === 0, l.disabled = B(n) === (B(N).props.fields?.length ?? 0) - 1, X(u, "title", r), xi(f, B(t).required === !0), W(p, ` ${i ?? ""}`);
					}, [
						() => Z("form.fieldNamePh"),
						() => Z("form.removeField"),
						() => Z("form.required")
					]), V("change", a, (e) => En(B(n), { label: e.target.value.trim() || Z("form.fieldFallback") })), V("click", c, () => An(B(n), -1)), V("click", l, () => An(B(n), 1)), V("click", u, () => kn(B(n))), V("change", f, (e) => En(B(n), { required: e.target.checked })), U(e, r);
				});
				var d = L(u, 2), f = I(d, !0), p = L(d, 2), m = P(p), h = L(m);
				J(h), D(p);
				var g = L(p, 2), _ = P(g), v = L(_);
				J(v), D(g), z((e, t, i, a, o, s, c, u) => {
					X(n, "title", e), W(r, `${t ?? ""} `), W(l, i), W(f, a), W(m, `${o ?? ""} `), Y(h, B(N).props.submitLabel ?? ""), X(h, "placeholder", s), W(_, `${c ?? ""} `), Y(v, B(N).props.successText ?? ""), X(v, "placeholder", u);
				}, [
					() => Z("form.modeTitle"),
					() => Z("form.mode"),
					() => Z("form.fields"),
					() => Z("form.addField"),
					() => Z("lbl.buttonText"),
					() => Z("form.sendDefault"),
					() => Z("form.receipt"),
					() => Z("form.thanksDefault")
				]), V("click", d, On), V("change", h, (e) => R("submitLabel", e.target.value.trim() || Z("form.sendDefault"))), V("change", v, (e) => R("successText", e.target.value.trim() || Z("form.thanksDefault"))), U(e, t);
			}, a = (e) => {
				var t = wp(), n = F(t), r = P(n), i = L(r);
				ot(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.view ?? "list"), t = /* @__PURE__ */ A(() => [
						["list", Z("calendar.viewList")],
						["cards", Z("calendar.viewCards")],
						["month", Z("calendar.viewMonth")],
						["next", Z("calendar.viewNext")]
					]);
					Q(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("view", e)
					});
				}
				D(a);
				var c = L(a, 2), l = (e) => {
					var t = Cp(), n = P(t), r = L(n);
					J(r), D(t), z((e, i) => {
						X(t, "title", e), W(n, `${i ?? ""} `), Y(r, B(N).props.limit ?? 6);
					}, [() => Z("tip.collection.limit"), () => Z("lbl.maxCount")]), V("change", r, (e) => R("limit", Math.max(1, Math.min(50, Number(e.target.value) || 6)))), U(e, t);
				};
				G(c, (e) => {
					((B(N).props.view ?? "list") === "list" || B(N).props.view === "cards") && e(l);
				});
				var u = L(c, 2), d = P(u);
				J(d);
				var f = L(d);
				D(u);
				var p = L(u, 2), m = P(p);
				J(m);
				var h = L(m);
				D(p), z((e, t, n, a, s, c) => {
					W(r, `${e ?? ""} `), X(i, "placeholder", t), Y(i, n), W(o, `${a ?? ""} `), xi(d, B(N).props.showCategories !== !1), W(f, ` ${s ?? ""}`), xi(m, B(N).props.showSubscribe !== !1), W(h, ` ${c ?? ""}`);
				}, [
					() => Z("calendar.sources"),
					() => Z("calendar.sourcesPh"),
					() => (B(N).props.sources ?? []).join("\n"),
					() => Z("lbl.view"),
					() => Z("calendar.showCategories"),
					() => Z("calendar.showSubscribe")
				]), V("change", i, (e) => jn(e.target.value)), V("change", d, (e) => R("showCategories", e.target.checked)), V("change", m, (e) => R("showSubscribe", e.target.checked)), U(e, t);
			}, o = (e) => {
				var t = Ep(), n = F(t), r = P(n);
				J(r);
				var i = L(r);
				D(n);
				var a = L(n, 2), o = I(a, !0), s = L(a, 2);
				qr(s, 17, () => B(N).props.items ?? [], Ur, (e, t, n) => {
					var r = Tp(), i = P(r);
					J(i);
					var a = L(i, 2), o = P(a);
					o.disabled = n === 0, K(o, () => w.up, !0), D(o);
					var s = L(o, 2);
					K(s, () => w.down, !0), D(s);
					var c = L(s, 2);
					K(c, () => w.cross, !0), D(c), D(a), D(r), z((e, r) => {
						Y(i, B(t).q), X(i, "title", e), s.disabled = n === (B(N).props.items?.length ?? 0) - 1, X(c, "title", r);
					}, [() => Z("tip.faq.question"), () => Z("tip.faq.remove")]), V("change", i, (e) => Mn(n, { q: e.target.value })), V("click", o, () => Fn(n, -1)), V("click", s, () => Fn(n, 1)), V("click", c, () => Pn(n)), U(e, r);
				});
				var c = L(s, 2), l = I(c, !0);
				z((e, t, a, s, c) => {
					X(n, "title", e), xi(r, t), W(i, ` ${a ?? ""}`), W(o, s), W(l, c);
				}, [
					() => Z("tip.faq.multi"),
					() => !!B(N).props.multi,
					() => Z("lbl.faqMulti"),
					() => Z("lbl.questions"),
					() => Z("ui.addQuestion")
				]), V("change", r, (e) => R("multi", e.target.checked)), V("click", c, Nn), U(e, t);
			}, s = (e) => {
				var t = Op(), n = F(t), r = I(n, !0), i = L(n, 2);
				qr(i, 17, () => B(N).props.items ?? [], Ur, (e, t, n) => {
					var r = Dp(), i = F(r), a = P(i);
					J(a);
					var o = L(a, 2);
					J(o);
					var s = L(o, 2), c = P(s);
					c.disabled = n === 0, K(c, () => w.up, !0), D(c);
					var l = L(c, 2);
					K(l, () => w.down, !0), D(l);
					var u = L(l, 2);
					K(u, () => w.cross, !0), D(u), D(s), D(i);
					var d = L(i, 2);
					J(d), z((e, r, i, s, c, f) => {
						Y(a, B(t).year), X(a, "placeholder", e), X(a, "title", r), Y(o, B(t).title), X(o, "title", i), l.disabled = n === (B(N).props.items?.length ?? 0) - 1, X(u, "title", s), Y(d, B(t).text), X(d, "placeholder", c), X(d, "title", f);
					}, [
						() => Z("ph.tlYear"),
						() => Z("tip.timeline.year"),
						() => Z("tip.timeline.title"),
						() => Z("tip.timeline.remove"),
						() => Z("ph.tlText"),
						() => Z("tip.timeline.text")
					]), V("change", a, (e) => Bn(n, { year: e.target.value })), V("change", o, (e) => Bn(n, { title: e.target.value })), V("click", c, () => Un(n, -1)), V("click", l, () => Un(n, 1)), V("click", u, () => Hn(n)), V("change", d, (e) => Bn(n, { text: e.target.value })), U(e, r);
				});
				var a = L(i, 2), o = I(a, !0);
				z((e, t) => {
					W(r, e), W(o, t);
				}, [() => Z("lbl.timelineItems"), () => Z("ui.addTlItem")]), V("click", a, Vn), U(e, t);
			}, c = (e) => {
				var t = kp(), n = F(t), r = P(n), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a);
				var c = L(a, 2), l = P(c), u = L(l);
				J(u), D(c), z((e, t, n) => {
					W(r, `${e ?? ""} `), Y(i, B(N).props.text ?? ""), W(o, `${t ?? ""} `), Y(s, B(N).props.attribution ?? ""), W(l, `${n ?? ""} `), Y(u, B(N).props.role ?? "");
				}, [
					() => Z("lbl.quoteText"),
					() => Z("lbl.quoteName"),
					() => Z("lbl.quoteRole")
				]), V("change", i, (e) => R("text", e.target.value)), V("change", s, (e) => R("attribution", e.target.value)), V("change", u, (e) => R("role", e.target.value)), U(e, t);
			}, l = (e) => {
				var t = Ap(), n = F(t), r = P(n), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a);
				var c = L(a, 2), l = P(c), u = L(l);
				J(u), D(c);
				var d = L(c, 2), f = P(d), p = L(f);
				J(p), D(d), z((e, t, n, a, c) => {
					W(r, `${e ?? ""} `), Y(i, B(N).props.value ?? ""), X(i, "title", t), W(o, `${n ?? ""} `), Y(s, B(N).props.prefix ?? ""), W(l, `${a ?? ""} `), Y(u, B(N).props.suffix ?? ""), W(f, `${c ?? ""} `), Y(p, B(N).props.label ?? "");
				}, [
					() => Z("lbl.statValue"),
					() => Z("tip.stat.value"),
					() => Z("lbl.statPrefix"),
					() => Z("lbl.statSuffix"),
					() => Z("lbl.statLabel")
				]), V("change", i, (e) => R("value", e.target.value)), V("change", s, (e) => R("prefix", e.target.value)), V("change", u, (e) => R("suffix", e.target.value)), V("change", p, (e) => R("label", e.target.value)), U(e, t);
			}, u = (e) => {
				var t = Np(), n = F(t), r = I(n, !0), i = L(n, 2);
				qr(i, 17, () => B(N).props.items ?? [], Ur, (e, t, n) => {
					var r = Tp(), i = P(r);
					J(i);
					var a = L(i, 2), o = P(a);
					o.disabled = n === 0, K(o, () => w.up, !0), D(o);
					var s = L(o, 2);
					K(s, () => w.down, !0), D(s);
					var c = L(s, 2);
					K(c, () => w.cross, !0), D(c), D(a), D(r), z((e, r, a, l) => {
						Y(i, B(t)), X(i, "title", e), X(o, "title", r), X(s, "title", a), s.disabled = n === (B(N).props.items?.length ?? 0) - 1, X(c, "title", l);
					}, [
						() => Z("tip.ribbon.item"),
						() => Z("tip.moveUp"),
						() => Z("tip.moveDown"),
						() => Z("tip.ribbon.remove")
					]), V("change", i, (e) => In(n, e.target.value)), V("click", o, () => zn(n, -1)), V("click", s, () => zn(n, 1)), V("click", c, () => Rn(n)), U(e, r);
				});
				var a = L(i, 2), o = I(a, !0), s = L(a, 2), c = P(s), l = I(c, !0), u = L(c, 2);
				qr(u, 21, () => B(x), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = jp();
					let o;
					K(a, () => v[r()], !0), D(a), z(() => {
						o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(N).props.sep ?? "dot") === r() }), X(a, "aria-pressed", (B(N).props.sep ?? "dot") === r()), X(a, "title", i());
					}), V("click", a, () => R("sep", r())), U(e, a);
				}), D(u), D(s);
				var d = L(s, 2), f = (e) => {
					var t = Mp(), n = P(t), r = I(n, !0), i = L(n, 2);
					J(i), D(t), z((e, n) => {
						X(t, "title", e), W(r, n), Y(i, B(N).props.sepText ?? "");
					}, [() => Z("tip.ribbon.sepText"), () => Z("lbl.ribbonSepText")]), V("change", i, (e) => R("sepText", e.target.value)), U(e, t);
				};
				G(d, (e) => {
					B(N).props.sep === "custom" && e(f);
				}), z((e, t, n, i) => {
					W(r, e), W(o, t), W(l, n), X(u, "aria-label", i);
				}, [
					() => Z("lbl.ribbonItems"),
					() => Z("ui.addRibbonItem"),
					() => Z("lbl.ribbonSep"),
					() => Z("lbl.ribbonSep")
				]), V("click", a, Ln), U(e, t);
			}, d = (e) => {
				var t = Pp(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2), o = I(a, !0);
				D(n);
				var s = L(n, 2), c = P(s), l = I(c, !0), u = L(c, 2), d = I(u, !0);
				D(s);
				var f = L(s, 2), p = P(f);
				J(p);
				var m = L(p);
				D(f), z((e, t, n, r, a, s) => {
					W(i, e), W(o, t), W(l, n), W(d, r), X(f, "title", a), xi(p, B(N).props.header !== !1), W(m, ` ${s ?? ""}`);
				}, [
					() => Z("ui.addRow"),
					() => Z("ui.removeRow"),
					() => Z("ui.addColumn"),
					() => Z("ui.removeColumn"),
					() => Z("tip.table.header"),
					() => Z("lbl.tableHeader")
				]), V("click", r, () => Gn(1, 0)), V("click", a, () => Gn(-1, 0)), V("click", c, () => Gn(0, 1)), V("click", u, () => Gn(0, -1)), V("change", p, (e) => R("header", e.target.checked)), U(e, t);
			}, f = (e) => {
				var t = Mr();
				qr(F(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", Z("opt.share.email")],
					["copy", Z("opt.share.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = Fp(), o = P(a);
					J(o);
					var s = L(o);
					D(a), z((e) => {
						xi(o, e), W(s, ` ${i() ?? ""}`);
					}, [() => (B(N).props.services ?? []).includes(r())]), V("change", o, (e) => Kn(r(), e.target.checked)), U(e, a);
				}), U(e, t);
			}, p = (e) => {
				var t = Ip(), n = F(t), r = P(n), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a), z((e, t, n) => {
					W(r, `${e ?? ""} `), Y(i, B(N).props.target ?? ""), X(a, "title", t), W(o, `${n ?? ""} `), Y(s, B(N).props.doneText ?? "");
				}, [
					() => Z("lbl.countdownTarget"),
					() => Z("tip.countdown.done"),
					() => Z("lbl.countdownDone")
				]), V("change", i, (e) => R("target", e.target.value)), V("change", s, (e) => R("doneText", e.target.value)), U(e, t);
			}, m = (e) => {
				var t = Rp(), n = F(t), r = P(n), i = L(r);
				D(n);
				var a = L(n, 2), o = (e) => {
					var t = Lp(), n = I(t, !0);
					z((e) => W(n, e), [() => Z("ui.removeAudio")]), V("click", t, () => R("src", "")), U(e, t);
				};
				G(a, (e) => {
					B(N).props.src && e(o);
				});
				var s = L(a, 2), c = P(s), l = L(c);
				J(l), D(s);
				var u = L(s, 2), d = P(u);
				J(d);
				var f = L(d);
				D(u), z((e, t, i, a, o) => {
					X(n, "title", e), W(r, `${t ?? ""} `), W(c, `${i ?? ""} `), Y(l, B(N).props.title ?? ""), xi(d, a), W(f, ` ${o ?? ""}`);
				}, [
					() => Z("tip.blocks.audioFile"),
					() => Z("ui.chooseAudio"),
					() => Z("lbl.audioTitle"),
					() => !!B(N).props.loop,
					() => Z("lbl.audioLoop")
				]), V("change", i, qn), V("change", l, (e) => R("title", e.target.value)), V("change", d, (e) => R("loop", e.target.checked)), U(e, t);
			}, g = (e) => {
				var t = zp(), n = F(t), r = P(n), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.page ?? "__href"), t = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.externalLink")]]);
					Q(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							ln(`edit:${B(N).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				D(a);
				var c = L(a, 2), l = (e) => {
					var t = bp();
					J(t), z((e) => {
						X(t, "placeholder", e), Y(t, B(N).props.href === "#" ? "" : B(N).props.href ?? "");
					}, [() => Z("ph.url")]), V("change", t, (e) => R("href", e.target.value || null)), U(e, t);
				};
				G(c, (e) => {
					B(N).props.page || e(l);
				}), z((e, t) => {
					W(r, `${e ?? ""} `), Y(i, B(N).props.label), W(o, `${t ?? ""} `);
				}, [() => Z("blocks.text"), () => Z("lbl.goesTo")]), V("change", i, (e) => R("label", e.target.value)), U(e, t);
			}, _ = (e) => {
				var t = Bp(), n = F(t), r = P(n), i = L(r);
				D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a);
				var c = L(a, 2), l = P(c), u = L(l);
				J(u), D(c);
				var d = L(c, 2), f = (e) => {
					var t = Fp(), n = P(t);
					J(n);
					var r = L(n);
					D(t), z((e, i, a) => {
						X(t, "title", e), xi(n, i), W(r, ` ${a ?? ""}`);
					}, [
						() => Z("tip.lightbox"),
						() => !!B(N).props.lightbox,
						() => Z("lbl.lightbox")
					]), V("change", n, (e) => R("lightbox", e.target.checked)), U(e, t);
				};
				G(d, (e) => {
					B(N).props.href || e(f);
				}), z((e, t, n, i, a) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), Y(s, B(N).props.alt ?? ""), X(s, "placeholder", n), W(l, `${i ?? ""} `), Y(u, B(N).props.href ?? ""), X(u, "placeholder", a);
				}, [
					() => Z("ui.changeImage"),
					() => Z("lbl.description"),
					() => Z("ph.altText"),
					() => Z("lbl.link"),
					() => Z("ph.optionalImageLink")
				]), V("change", i, Yn), V("change", s, (e) => R("alt", e.target.value)), V("change", u, (e) => R("href", e.target.value || null)), U(e, t);
			}, y = (e) => {
				let t = /* @__PURE__ */ A(() => B(N).props.source === "file" ? "file" : "embed");
				var n = Up(), r = F(n);
				{
					let e = /* @__PURE__ */ A(() => Z("lbl.videoSource")), n = /* @__PURE__ */ A(() => [["embed", Z("opt.videoSource.embed")], ["file", Z("opt.videoSource.file")]]);
					Cs(r, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => R("source", e)
					});
				}
				var i = L(r, 2), a = (e) => {
					var t = Vp(), n = F(t), r = I(n, !0), i = L(n, 2);
					J(i), z((e, t, a) => {
						X(n, "title", e), W(r, t), Y(i, B(N).props.url ?? ""), X(i, "placeholder", a);
					}, [
						() => Z("hint.video"),
						() => Z("lbl.videoUrl"),
						() => Z("ph.videoUrl")
					]), V("change", i, (e) => R("url", e.target.value)), U(e, t);
				}, o = (e) => {
					var t = Hp(), n = F(t), r = P(n), i = L(r);
					D(n);
					var a = L(n, 2), o = P(a), s = L(o);
					D(a);
					var c = L(a, 2), l = P(c);
					J(l);
					var u = L(l);
					D(c);
					var d = L(c, 2), f = P(d);
					J(f);
					var p = L(f);
					D(d);
					var m = L(d, 2), h = (e) => {
						var t = Fp(), n = P(t);
						J(n);
						var r = L(n);
						D(t), z((e, i) => {
							X(t, "title", e), xi(n, B(N).props.autoplay === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.video.autoplay"), () => Z("lbl.videoAutoplay")]), V("change", n, (e) => R("autoplay", e.target.checked)), U(e, t);
					};
					G(m, (e) => {
						B(N).props.muted === !0 && e(h);
					}), z((e, t, i, s, c, d) => {
						X(n, "title", e), W(r, `${t ?? ""} `), X(a, "title", i), W(o, `${s ?? ""} `), xi(l, B(N).props.loop === !0), W(u, ` ${c ?? ""}`), xi(f, B(N).props.muted === !0), W(p, ` ${d ?? ""}`);
					}, [
						() => Z("tip.video.file"),
						() => B(N).props.src ? Z("ui.changeVideo") : Z("ui.chooseVideo"),
						() => Z("tip.bg.poster"),
						() => B(N).props.poster ? Z("ui.changeImage") : Z("ui.choosePoster"),
						() => Z("lbl.videoLoop"),
						() => Z("lbl.videoMuted")
					]), V("change", i, Xr), V("change", s, Zr), V("change", l, (e) => R("loop", e.target.checked)), V("change", f, (e) => un("muted", e.target.checked ? { muted: !0 } : {
						muted: !1,
						autoplay: !1
					})), U(e, t);
				};
				G(i, (e) => {
					B(t) === "embed" ? e(a) : e(o, -1);
				});
				var s = L(i, 2), c = P(s), l = L(c);
				J(l), D(s), z((e) => {
					W(c, `${e ?? ""} `), Y(l, B(N).props.title ?? "");
				}, [() => Z("lbl.videoTitle")]), V("change", l, (e) => R("title", e.target.value)), U(e, n);
			}, b = (e) => {
				var t = Kp(), n = F(t), r = P(n), i = L(r), a = P(i);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.glyph ?? "★"), t = /* @__PURE__ */ A(() => B(N).props.icon ?? null), n = /* @__PURE__ */ A(() => B(N).props.image ?? null);
					mo(a, {
						get value() {
							return B(e);
						},
						get icon() {
							return B(t);
						},
						get image() {
							return B(n);
						},
						onpick: (e) => ln(`edit:${B(N).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => ln(`edit:${B(N).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => R("image", e)
					});
				}
				var o = L(a, 2), s = (e) => {
					var t = Wp();
					J(t), z((e) => {
						Y(t, B(N).props.glyph ?? ""), X(t, "title", e);
					}, [() => Z("tip.icon.typeGlyph")]), V("change", t, (e) => R("glyph", e.target.value || "★")), U(e, t);
				}, c = (e) => {
					var t = Lp(), n = I(t, !0);
					z((e, r) => {
						X(t, "title", e), W(n, r);
					}, [() => Z("tip.icon.backToGlyph"), () => Z("ui.removeDrawnIcon")]), V("click", t, () => R("icon", null)), U(e, t);
				};
				G(o, (e) => {
					B(N).props.icon ? e(c, -1) : e(s);
				}), D(i), D(n);
				var l = L(n, 2), u = (e) => {
					var t = Gp(), n = P(t), r = L(n, 2), i = I(r, !0);
					D(t), z((e, r, a) => {
						X(t, "title", e), X(n, "src", B(N).props.image), X(n, "alt", r), W(i, a);
					}, [
						() => Z("hint.icon.ownImage"),
						() => Z("gp.ownIcon"),
						() => Z("ui.removeOwnIcon")
					]), V("click", r, () => R("image", null)), U(e, t);
				};
				G(l, (e) => {
					B(N).props.image && e(u);
				}), z((e) => W(r, `${e ?? ""} `), [() => Z("blocks.icon")]), U(e, t);
			}, S = (e) => {
				var t = qp(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...B(Hc).map((e) => [e, B(Uc)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("collection", e || null)
					});
				}
				D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a);
				var c = L(a, 2), l = P(c);
				J(l);
				var u = L(l);
				D(c), z((e, t, i, c, d) => {
					X(n, "title", e), W(r, `${t ?? ""} `), X(a, "title", i), W(o, `${c ?? ""} `), Y(s, B(N).props.limit ?? 6), xi(l, B(N).props.newestFirst !== !1), W(u, ` ${d ?? ""}`);
				}, [
					() => Z("tip.collection.source"),
					() => Z("blocks.collection"),
					() => Z("tip.collection.limit"),
					() => Z("lbl.maxCount"),
					() => Z("lbl.newestFirst")
				]), V("change", s, (e) => R("limit", Number(e.target.value))), V("change", l, (e) => R("newestFirst", e.target.checked)), U(e, t);
			}, C = (e) => {
				var t = Xp(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.collection ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...B(Hc).filter((e) => B(Uc)[e]?.kind === "products").map((e) => [e, B(Uc)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("collection", e || null)
					});
				}
				D(n);
				var a = L(n, 2), o = (e) => {
					var t = Jp(), n = P(t), r = I(n, !0), i = L(n, 2), a = I(i, !0);
					D(t), z((e, t, o, s) => {
						X(n, "title", e), W(r, t), X(i, "title", o), W(a, s);
					}, [
						() => Z("tip.product.addProduct"),
						() => Z("ui.addProduct"),
						() => Z("tip.product.editCatalog"),
						() => Z("ui.editCatalog")
					]), V("click", n, () => Cl(B(N).props.collection)), V("click", i, () => {
						M(Wc, B(N).props.collection, !0), M(Rt, "collections");
					}), U(e, t);
				}, s = (e) => {
					var t = Yp(), n = I(t, !0);
					z((e, r) => {
						X(t, "title", e), W(n, r);
					}, [() => Z("tip.product.createCatalog"), () => Z("ui.createCatalog")]), V("click", t, xl), U(e, t);
				}, c = /* @__PURE__ */ A(() => !B(Hc).some((e) => B(Uc)[e]?.kind === "products"));
				G(a, (e) => {
					B(N).props.collection && B(Uc)[B(N).props.collection]?.kind === "products" ? e(o) : B(c) && e(s, 1);
				});
				var l = L(a, 2), u = P(l), d = L(u);
				J(d), D(l);
				var f = L(l, 2), p = P(f), m = L(p);
				J(m), D(f), z((e, t, i, a, o, s) => {
					X(n, "title", e), W(r, `${t ?? ""} `), X(l, "title", i), W(u, `${a ?? ""} `), Y(d, B(N).props.limit ?? 0), X(f, "title", o), W(p, `${s ?? ""} `), Y(m, B(N).props.currency ?? "kr");
				}, [
					() => Z("tip.product.source"),
					() => Z("blocks.collection"),
					() => Z("tip.collection.limit"),
					() => Z("lbl.maxCount"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), V("change", d, (e) => R("limit", Number(e.target.value))), V("change", m, (e) => R("currency", e.target.value)), U(e, t);
			}, ee = (e) => {
				var t = Zp(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.href ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.none")], ...B(k).pages.map((e) => [e.path, e.title])]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("href", e)
					});
				}
				D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a), z((e, t, i, c) => {
					X(n, "title", e), W(r, `${t ?? ""} `), X(a, "title", i), W(o, `${c ?? ""} `), Y(s, B(N).props.currency ?? "kr");
				}, [
					() => Z("tip.cart.checkout"),
					() => Z("lbl.checkoutPage"),
					() => Z("tip.product.currency"),
					() => Z("lbl.currency")
				]), V("change", s, (e) => R("currency", e.target.value)), U(e, t);
			}, te = (e) => {
				var t = Qp(), n = F(t), r = P(n), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a);
				var c = L(a, 2), l = P(c), u = L(l);
				J(u), D(c);
				var d = L(c, 2), f = P(d);
				J(f);
				var p = L(f);
				D(d);
				var m = L(d, 2), h = P(m), g = L(h);
				J(g), D(m), z((e, t, _, v, y, b, x, S, C, ee) => {
					X(n, "title", e), W(r, `${t ?? ""} `), Y(i, B(N).props.recipient ?? ""), X(a, "title", _), W(o, `${v ?? ""} `), Y(s, B(N).props.endpoint ?? ""), X(c, "title", y), W(l, `${b ?? ""} `), Y(u, B(N).props.vipps ?? ""), X(d, "title", x), xi(f, B(N).props.vippsCheckout === !0), W(p, ` ${S ?? ""}`), X(m, "title", C), W(h, `${ee ?? ""} `), Y(g, B(N).props.currency ?? "kr");
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
				]), V("change", i, (e) => R("recipient", e.target.value.trim())), V("change", s, (e) => R("endpoint", e.target.value.trim())), V("change", u, (e) => R("vipps", e.target.value.trim())), V("change", f, (e) => R("vippsCheckout", e.target.checked)), V("change", g, (e) => R("currency", e.target.value)), U(e, t);
			}, ne = (e) => {
				var t = Ff(), n = F(t), r = P(n), i = L(r);
				D(n), qr(L(n, 2), 17, () => B(N).props.images ?? [], Ur, (e, t, n) => {
					var r = $p(), i = P(r), a = P(i), o = L(a, 2), s = P(o);
					s.disabled = n === 0, K(s, () => w.up, !0), D(s);
					var c = L(s, 2);
					K(c, () => w.down, !0), D(c);
					var l = L(c, 2);
					K(l, () => w.cross, !0), D(l), D(o), D(i);
					var u = L(i, 2), d = P(u), f = L(d);
					J(f), D(u);
					var p = L(u, 2), m = P(p), h = L(m);
					J(h), D(p), D(r), z((e, r, o, s, u, p) => {
						X(i, "title", e), X(a, "src", B(t).src), c.disabled = n === B(N).props.images.length - 1, X(l, "title", r), W(d, `${o ?? ""} `), Y(f, B(t).alt ?? ""), X(f, "placeholder", s), W(m, `${u ?? ""} `), Y(h, B(t).href ?? ""), X(h, "placeholder", p);
					}, [
						() => Z("hint.gallery"),
						() => Z("tip.removeImage"),
						() => Z("lbl.description"),
						() => Z("ph.altShort"),
						() => Z("lbl.link"),
						() => Z("ph.galleryHref")
					]), V("click", s, () => q_(n, -1)), V("click", c, () => q_(n, 1)), V("click", l, () => J_(n)), V("change", f, (e) => Y_(n, "alt", e.target.value)), V("change", h, (e) => Y_(n, "href", e.target.value || null)), U(e, r);
				}), z((e, t) => {
					X(n, "title", e), W(r, `${t ?? ""} `);
				}, [() => Z("tip.gallery.addImages"), () => Z("ui.addImages")]), V("change", i, G_), U(e, t);
			}, re = (e) => {
				var t = rp(), n = P(t);
				Q(L(n), {
					get value() {
						return B(N).props.kind;
					},
					get options() {
						return Qn;
					},
					onchange: (e) => R("kind", e)
				}), D(t), z((e) => W(n, `${e ?? ""} `), [() => Z("blocks.shape")]), U(e, t);
			}, ie = (e) => {
				let t = /* @__PURE__ */ A(() => I_[B(N).type] ?? B(F_).find((e) => e.type === B(N).type)?.fields ?? []);
				var n = Mr(), r = F(n), i = (e) => {
					var n = Mr();
					qr(F(n), 17, () => B(t), (e) => e.key, (e, t) => {
						var n = Mr(), r = F(n), i = (e) => {
							let n = /* @__PURE__ */ A(() => `${B(N).blockId}:${B(t).key}`);
							var r = em(), i = F(r), a = P(i), o = L(a);
							J(o), D(i);
							var s = L(i, 2), c = I(s, !0), l = L(s, 2), u = (e) => {
								var t = If();
								let r;
								var i = I(t, !0);
								z(() => {
									r = q(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": hn[B(n)].err }), W(i, hn[B(n)].text);
								}), U(e, t);
							};
							G(l, (e) => {
								hn[B(n)] && e(u);
							}), z((e) => {
								W(a, `${B(t).label ?? ""} `), X(o, "placeholder", B(t).placeholder), Y(o, mn[B(n)] ?? B(N).props[B(t).key] ?? ""), s.disabled = B(gn), W(c, e);
							}, [() => Z("props.place.search")]), V("input", o, (e) => {
								mn[B(n)] = e.target.value;
							}), V("keydown", o, (e) => {
								e.key === "Enter" && bn(B(t));
							}), V("click", s, () => bn(B(t))), U(e, r);
						}, a = (e) => {
							var n = tm(), r = P(n), i = L(r);
							J(i), D(n), z(() => {
								W(r, `${B(t).label ?? ""} `), X(i, "min", B(t).min), X(i, "max", B(t).max), X(i, "step", B(t).step ?? 1), Y(i, B(N).props[B(t).key]);
							}), V("change", i, (e) => R(B(t).key, vn(B(t), Number(e.target.value)))), U(e, n);
						}, o = (e) => {
							var n = Fp(), r = P(n);
							J(r);
							var i = L(r);
							D(n), z((e) => {
								xi(r, e), W(i, ` ${B(t).label ?? ""}`);
							}, [() => !!B(N).props[B(t).key]]), V("change", r, (e) => R(B(t).key, e.target.checked)), U(e, n);
						}, s = (e) => {
							var n = rp(), r = P(n), i = L(r);
							{
								let e = /* @__PURE__ */ A(() => (B(t).options ?? []).map((e) => [e.value, e.label]));
								Q(i, {
									get value() {
										return B(N).props[B(t).key];
									},
									get options() {
										return B(e);
									},
									onchange: (e) => R(B(t).key, e)
								});
							}
							D(n), z(() => W(r, `${B(t).label ?? ""} `)), U(e, n);
						}, c = (e) => {
							var n = nm(), r = P(n), i = L(r);
							J(i), D(n), z(() => {
								W(r, `${B(t).label ?? ""} `), X(i, "placeholder", B(t).placeholder), Y(i, B(N).props[B(t).key] ?? "");
							}), V("change", i, (e) => R(B(t).key, e.target.value)), U(e, n);
						};
						G(r, (e) => {
							B(t).type === "place" ? e(i) : B(t).type === "number" ? e(a, 1) : B(t).type === "toggle" ? e(o, 2) : B(t).type === "select" ? e(s, 3) : e(c, -1);
						}), U(e, n);
					}), U(e, n);
				}, a = (e) => {
					var t = Lp(), n = I(t, !0);
					z((e, r) => {
						X(t, "title", e), W(n, r);
					}, [() => Z("hint.pluginBlock"), () => Z("ui.settings")]), V("click", t, () => tt?.sendOpenConfig(B(N).blockId)), U(e, t);
				};
				G(r, (e) => {
					B(t).length ? e(i) : e(a, -1);
				}), U(e, n);
			};
			G(n, (e) => {
				B(N).type === "text" ? e(r) : B(N).type === "form" ? e(i, 1) : B(N).type === "calendar" ? e(a, 2) : B(N).type === "faq" ? e(o, 3) : B(N).type === "timeline" ? e(s, 4) : B(N).type === "quote" ? e(c, 5) : B(N).type === "stats" ? e(l, 6) : B(N).type === "ribbon" ? e(u, 7) : B(N).type === "table" ? e(d, 8) : B(N).type === "share" ? e(f, 9) : B(N).type === "countdown" ? e(p, 10) : B(N).type === "audio" ? e(m, 11) : B(N).type === "button" ? e(g, 12) : B(N).type === "image" ? e(_, 13) : B(N).type === "video" ? e(y, 14) : B(N).type === "icon" ? e(b, 15) : B(N).type === "collection" ? e(S, 16) : B(N).type === "product" ? e(C, 17) : B(N).type === "cart" ? e(ee, 18) : B(N).type === "checkout" ? e(te, 19) : B(N).type === "gallery" ? e(ne, 20) : B(N).type === "shape" ? e(re, 21) : e(ie, -1);
			}), U(e, t);
		}, p = (e) => {
			var t = Im(), n = F(t), r = (e) => {
				var t = rm(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.align ?? "left"), t = /* @__PURE__ */ A(() => [
						["left", Z("common.left")],
						["center", Z("common.center")],
						["right", Z("common.right")]
					]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("align", e)
					});
				}
				D(n);
				var a = L(n, 2), o = P(a);
				J(o);
				var c = L(o);
				D(a);
				var l = L(a, 2), u = (e) => {
					s(e);
				};
				G(l, (e) => {
					B(N).props.box && e(u);
				}), De(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), xi(o, t), W(c, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.align"),
					() => !!B(N).props.box,
					() => Z("lbl.textBoxToggle")
				]), V("change", o, (e) => R("box", e.target.checked)), U(e, t);
			}, i = (e) => {
				var t = am(), n = F(t);
				{
					let e = /* @__PURE__ */ A(() => Z("lbl.variant")), t = /* @__PURE__ */ A(() => B(N).props.variant === "list" ? "list" : "cards"), r = /* @__PURE__ */ A(() => _c.map((e) => [e, Z(`opt.faqVariant.${e}`)]));
					Cs(n, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => R("variant", e)
					});
				}
				var r = L(n, 2), i = (e) => {
					var t = im(), n = F(t), r = I(n, !0), i = L(n, 2);
					s(i), z((e) => W(r, e), [() => Z("lbl.cardStyle")]), U(e, t);
				};
				G(r, (e) => {
					B(N).props.variant !== "list" && e(i);
				}), De(2), U(e, t);
			}, a = (e) => {
				var t = om(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.variant ?? "left"), t = /* @__PURE__ */ A(() => [["left", Z("opt.timeline.left")], ["alternating", Z("opt.timeline.alternating")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.marker ?? "filled"), t = /* @__PURE__ */ A(() => [["filled", Z("opt.timeline.filled")], ["ring", Z("opt.timeline.ring")]]);
					Q(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("marker", e)
					});
				}
				D(a);
				var c = L(a, 2), l = P(c), u = L(l);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.accent ?? "accent"), t = /* @__PURE__ */ A(vi);
					va(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => R("accent", e === "accent" ? null : e)
					});
				}
				D(c), De(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), W(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.timelineMarker"),
					() => Z("lbl.color")
				]), U(e, t);
			}, o = (e) => {
				var t = cm(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.variant ?? "large"), t = /* @__PURE__ */ A(() => [["large", Z("opt.quote.large")], ["short", Z("opt.quote.short")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				D(n);
				var a = L(n, 2), o = (e) => {
					var t = sm(), n = F(t), r = P(n), i = L(r);
					D(n);
					var a = L(n, 2), o = (e) => {
						var t = Lp(), n = I(t, !0);
						z((e) => W(n, e), [() => Z("ui.quotePortraitRemove")]), V("click", t, () => R("image", "")), U(e, t);
					};
					G(a, (e) => {
						B(N).props.image && e(o);
					}), z((e) => W(r, `${e ?? ""} `), [() => Z("ui.quotePortrait")]), V("change", i, Xn), U(e, t);
				}, s = (e) => {
					var t = Fp(), n = P(t);
					J(n);
					var r = L(n);
					D(t), z((e, i) => {
						X(t, "title", e), xi(n, B(N).props.card === !0), W(r, ` ${i ?? ""}`);
					}, [() => Z("tip.quote.card"), () => Z("lbl.quoteCard")]), V("change", n, (e) => R("card", e.target.checked)), U(e, t);
				};
				G(a, (e) => {
					B(N).props.variant === "short" ? e(o) : e(s, -1);
				});
				var c = L(a, 2), l = P(c), u = L(l);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.accent ?? "accent"), t = /* @__PURE__ */ A(vi);
					va(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => R("accent", e === "accent" ? null : e)
					});
				}
				D(c), De(2), z((e, t) => {
					W(r, `${e ?? ""} `), W(l, `${t ?? ""} `);
				}, [() => Z("lbl.variant"), () => Z("lbl.color")]), U(e, t);
			}, c = (e) => {
				var t = lm(), n = F(t);
				{
					let e = /* @__PURE__ */ A(() => Z("lbl.variant")), t = /* @__PURE__ */ A(() => gc.includes(B(N).props.variant) ? B(N).props.variant : "plain"), r = /* @__PURE__ */ A(() => gc.map((e) => [e, Z(`opt.statVariant.${e}`)]));
					Cs(n, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => R("variant", e)
					});
				}
				var r = L(n, 2), i = P(r);
				J(i);
				var a = L(i);
				D(r), De(2), z((e, t) => {
					X(r, "title", e), xi(i, B(N).props.countUp !== !1), W(a, ` ${t ?? ""}`);
				}, [() => Z("tip.stat.countUp"), () => Z("lbl.statCountUp")]), V("change", i, (e) => R("countUp", e.target.checked)), U(e, t);
			}, l = (e) => {
				let t = /* @__PURE__ */ A(() => B(N).props.motion ?? "roll");
				var n = hm(), r = F(n), i = P(r), a = I(i, !0), o = L(i, 2);
				{
					let e = /* @__PURE__ */ A(() => [
						["roll", Z("opt.ribbonMotion.roll")],
						["sway", Z("opt.ribbonMotion.sway")],
						["step", Z("opt.ribbonMotion.step")],
						["none", Z("opt.ribbonMotion.none")]
					]);
					Q(o, {
						filled: !0,
						get value() {
							return B(t);
						},
						get options() {
							return B(e);
						},
						onchange: (e) => R("motion", e)
					});
				}
				var s = L(o, 2), c = (e) => {
					var n = fm(), r = F(n), i = I(r, !0), a = L(r, 2);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.ribbonDirection")), t = /* @__PURE__ */ A(() => B(N).props.direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", Z("opt.ribbonDir.left")], ["right", Z("opt.ribbonDir.right")]]);
						Cs(a, {
							get label() {
								return B(e);
							},
							get value() {
								return B(t);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => R("direction", e)
						});
					}
					var o = L(a, 2), s = (e) => {
						var t = um(), n = P(t), r = I(n, !0), i = L(n, 2);
						J(i);
						var a = I(L(i, 2));
						D(t), z((e, n) => {
							X(t, "title", e), W(r, n), Y(i, B(N).props.dwell ?? 2.5), W(a, `${B(N).props.dwell ?? 2.5 ?? ""} s`);
						}, [() => Z("tip.ribbon.dwell"), () => Z("lbl.ribbonDwell")]), V("input", i, (e) => R("dwell", e.target.valueAsNumber)), U(e, t);
					}, c = (e) => {
						var t = dm(), n = P(t), r = I(n, !0), i = L(n, 2);
						J(i);
						var a = I(L(i, 2), !0);
						D(t), z((e, n) => {
							X(t, "title", e), W(r, n), Y(i, B(N).props.speed ?? 60), W(a, B(N).props.speed ?? 60);
						}, [() => Z("tip.ribbon.speed"), () => Z("lbl.ribbonSpeed")]), V("input", i, (e) => R("speed", e.target.valueAsNumber)), U(e, t);
					};
					G(o, (e) => {
						B(t) === "step" ? e(s) : e(c, -1);
					});
					var l = L(o, 2), u = P(l);
					J(u);
					var d = L(u);
					D(l);
					var f = L(l, 2), p = P(f);
					J(p);
					var m = L(p);
					D(f), z((e, t, n, a, o, s) => {
						X(r, "title", e), W(i, t), X(l, "title", n), xi(u, B(N).props.pauseOnHover !== !1), W(d, ` ${a ?? ""}`), X(f, "title", o), xi(p, B(N).props.fade !== !1), W(m, ` ${s ?? ""}`);
					}, [
						() => Z("tip.ribbon.play"),
						() => Z("ui.ribbonPlay"),
						() => Z("tip.ribbon.pause"),
						() => Z("lbl.ribbonPause"),
						() => Z("tip.ribbon.fade"),
						() => Z("lbl.ribbonFade")
					]), V("click", r, () => tt?.sendDemoMotion()), V("change", u, (e) => R("pauseOnHover", e.target.checked)), V("change", p, (e) => R("fade", e.target.checked)), U(e, n);
				};
				G(s, (e) => {
					B(t) !== "none" && e(c);
				}), D(r);
				var l = L(r, 2), u = P(l), d = I(u, !0), f = L(u, 2), p = P(f), m = I(p, !0), h = L(p, 2);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.above ?? "none");
					Q(h, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(b);
						},
						onchange: (e) => R("above", e)
					});
				}
				D(f);
				var g = L(f, 2), _ = (e) => {
					var t = rp(), n = P(t), r = L(n);
					{
						let e = /* @__PURE__ */ A(() => B(N).props.aboveColor ?? hc(B(N).props)), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.ribbon.stripeColor"));
						va(r, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => R("aboveColor", e)
						});
					}
					D(t), z((e, r) => {
						X(t, "title", e), W(n, `${r ?? ""} `);
					}, [() => Z("tip.ribbon.stripeColor"), () => Z("lbl.colour")]), U(e, t);
				};
				G(g, (e) => {
					(B(N).props.above ?? "none") !== "none" && e(_);
				});
				var v = L(g, 2), x = P(v), S = I(x, !0), C = L(x, 2);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.main ?? "text");
					Q(C, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(y);
						},
						onchange: (e) => R("main", e)
					});
				}
				D(v);
				var ee = L(v, 2), te = P(ee), w = I(te, !0), ne = L(te, 2);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.below ?? "none");
					Q(ne, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(b);
						},
						onchange: (e) => R("below", e)
					});
				}
				D(ee);
				var re = L(ee, 2), ie = (e) => {
					var t = rp(), n = P(t), r = L(n);
					{
						let e = /* @__PURE__ */ A(() => B(N).props.belowColor ?? hc(B(N).props)), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.ribbon.stripeColor"));
						va(r, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => R("belowColor", e)
						});
					}
					D(t), z((e, r) => {
						X(t, "title", e), W(n, `${r ?? ""} `);
					}, [() => Z("tip.ribbon.stripeColor"), () => Z("lbl.colour")]), U(e, t);
				};
				G(re, (e) => {
					(B(N).props.below ?? "none") !== "none" && e(ie);
				});
				var ae = L(re, 2), oe = (e) => {
					var t = pm(), n = F(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.ribbonStripePlace")), t = /* @__PURE__ */ A(() => Z("tip.ribbon.stripePlace")), r = /* @__PURE__ */ A(() => B(N).props.stripePlace ?? "stack"), i = /* @__PURE__ */ A(() => [["stack", Z("opt.ribbonPlace.stack")], ["edge", Z("opt.ribbonPlace.edge")]]);
						Cs(n, {
							get label() {
								return B(e);
							},
							get title() {
								return B(t);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => R("stripePlace", e)
						});
					}
					var r = L(n, 2), i = P(r), a = I(i, !0), o = L(i, 2);
					J(o);
					var s = I(L(o, 2));
					D(r), z((e, t) => {
						X(r, "title", e), W(a, t), Y(o, B(N).props.thickness ?? 8), W(s, `${B(N).props.thickness ?? 8 ?? ""} px`);
					}, [() => Z("tip.ribbon.thickness"), () => Z("lbl.ribbonThickness")]), V("input", o, (e) => R("thickness", e.target.valueAsNumber)), U(e, t);
				};
				G(ae, (e) => {
					((B(N).props.above ?? "none") !== "none" || (B(N).props.below ?? "none") !== "none") && e(oe);
				}), D(l);
				var se = L(l, 2), T = P(se), ce = I(T, !0), le = L(T, 2);
				{
					let e = /* @__PURE__ */ A(() => Z("lbl.ribbonWidth")), t = /* @__PURE__ */ A(() => B(N).props.width ?? "content"), n = /* @__PURE__ */ A(() => [["content", Z("opt.ribbonWidth.content")], ["page", Z("opt.ribbonWidth.page")]]);
					Cs(le, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => R("width", e)
					});
				}
				var ue = L(le, 2);
				{
					let e = /* @__PURE__ */ A(() => Z("lbl.ribbonVariant")), t = /* @__PURE__ */ A(() => B(N).props.variant ?? "band"), n = /* @__PURE__ */ A(() => [["band", Z("opt.ribbonVariant.band")], ["plain", Z("opt.ribbonVariant.plain")]]);
					Cs(ue, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => R("variant", e)
					});
				}
				var de = L(ue, 2), E = P(de), fe = I(E, !0), pe = L(E, 2);
				J(pe);
				var me = I(L(pe, 2));
				D(de), D(se);
				var he = L(se, 2), ge = P(he), _e = I(ge, !0), ve = L(ge, 2), ye = P(ve), be = I(ye, !0), xe = L(ye, 2);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.size ?? "md"), t = /* @__PURE__ */ A(() => [
						["sm", Z("opt.size.sm")],
						["md", Z("opt.size.md")],
						["lg", Z("opt.size.lg")],
						["xl", Z("opt.size.xl")]
					]);
					Q(xe, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("size", e)
					});
				}
				D(ve);
				var Se = L(ve, 2), Ce = P(Se);
				J(Ce);
				var we = L(Ce);
				D(Se);
				var Te = L(Se, 2), Ee = P(Te);
				J(Ee);
				var Oe = L(Ee);
				D(Te);
				var ke = L(Te, 2), Ae = P(ke);
				J(Ae);
				var je = L(Ae);
				D(ke);
				var Me = L(ke, 2), Ne = P(Me), Pe = I(Ne, !0), Fe = L(Ne, 2);
				J(Fe);
				var Ie = I(L(Fe, 2));
				D(Me), D(he);
				var Le = L(he, 2), Re = P(Le), ze = I(Re, !0), Be = L(Re, 2), Ve = P(Be), He = (e) => {
					var t = mm(), n = P(t);
					{
						let e = /* @__PURE__ */ A(() => B(N).props.bg ?? "accent"), t = /* @__PURE__ */ A(vi), r = /* @__PURE__ */ A(() => Z("tip.ribbon.bg"));
						va(n, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(r);
							},
							onchange: (e) => R("bg", e)
						});
					}
					var r = I(L(n, 2), !0);
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n);
					}, [() => Z("tip.ribbon.bg"), () => Z("lbl.background")]), U(e, t);
				};
				G(Ve, (e) => {
					(B(N).props.variant ?? "band") !== "plain" && e(He);
				});
				var Ue = L(Ve, 2), We = P(Ue);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.color ?? ((B(N).props.variant ?? "band") === "plain" ? "text" : "accent-text")), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.ribbon.color"));
					va(We, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => R("color", e)
					});
				}
				var Ge = I(L(We, 2), !0);
				D(Ue), D(Be), D(Le), De(2), z((e, t, n, r, i, o, s, c, l, u, p, h, g, _, y, b, x, C, te, ne, re, ie, ae, oe) => {
					W(a, e), W(d, t), X(f, "title", n), W(m, r), X(v, "title", i), W(S, o), X(ee, "title", s), W(w, c), W(ce, l), X(de, "title", u), W(fe, p), Y(pe, B(N).props.tilt ?? 0), W(me, `${B(N).props.tilt ?? 0 ?? ""}°`), W(_e, h), W(be, g), X(Se, "title", _), xi(Ce, B(N).props.caps === !0), W(we, ` ${y ?? ""}`), X(Te, "title", b), xi(Ee, B(N).props.weight === "bold"), W(Oe, ` ${x ?? ""}`), X(ke, "title", C), xi(Ae, B(N).props.outline === !0), W(je, ` ${te ?? ""}`), X(Me, "title", ne), W(Pe, re), Y(Fe, B(N).props.gap ?? 40), W(Ie, `${B(N).props.gap ?? 40 ?? ""} px`), W(ze, ie), X(Ue, "title", ae), W(Ge, oe);
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
				]), V("input", pe, (e) => R("tilt", e.target.valueAsNumber)), V("change", Ce, (e) => R("caps", e.target.checked)), V("change", Ee, (e) => R("weight", e.target.checked ? "bold" : "normal")), V("change", Ae, (e) => R("outline", e.target.checked)), V("input", Fe, (e) => R("gap", e.target.valueAsNumber)), U(e, n);
			}, u = (e) => {
				var t = gm(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.lines ?? "rows"), t = /* @__PURE__ */ A(() => [
						["rows", Z("opt.table.rows")],
						["grid", Z("opt.table.grid")],
						["none", Z("common.none")]
					]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("lines", e)
					});
				}
				D(n);
				var a = L(n, 2), o = P(a);
				J(o);
				var s = L(o);
				D(a), De(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), xi(o, t), W(s, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.tableLines"),
					() => !!B(N).props.striped,
					() => Z("lbl.tableStriped")
				]), V("change", o, (e) => R("striped", e.target.checked)), U(e, t);
			}, d = (e) => {
				var t = _m(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.variant ?? "icons"), t = /* @__PURE__ */ A(() => [["icons", Z("opt.share.icons")], ["labels", Z("opt.share.labels")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a);
				var c = L(a, 2), l = P(c), u = L(l);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.color || "accent"), t = /* @__PURE__ */ A(vi);
					va(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => R("color", e === "accent" ? "" : e)
					});
				}
				D(c), De(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), Y(s, B(N).props.size ?? 38), W(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.size"),
					() => Z("lbl.color")
				]), V("change", s, (e) => R("size", Number(e.target.value) || 38)), U(e, t);
			}, f = (e) => {
				var t = gm(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.variant ?? "boxes"), t = /* @__PURE__ */ A(() => [["boxes", Z("opt.countdown.boxes")], ["plain", Z("opt.countdown.plain")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				D(n);
				var a = L(n, 2), o = P(a);
				J(o);
				var s = L(o);
				D(a), De(2), z((e, t) => {
					W(r, `${e ?? ""} `), xi(o, B(N).props.showSeconds !== !1), W(s, ` ${t ?? ""}`);
				}, [() => Z("lbl.variant"), () => Z("lbl.countdownSeconds")]), V("change", o, (e) => R("showSeconds", e.target.checked)), U(e, t);
			}, p = (e) => {
				var t = vm(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => [["primary", Z("opt.btn.primary")], ["secondary", Z("opt.btn.secondary")]]);
					Q(i, {
						get value() {
							return B(N).props.style;
						},
						get options() {
							return B(e);
						},
						onchange: (e) => R("style", e)
					});
				}
				D(n), De(2), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.style")]), U(e, t);
			}, m = (e) => {
				var t = ym(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.fit ?? "cover"), t = /* @__PURE__ */ A(() => [["cover", Z("opt.fitFrame.cover")], ["contain", Z("opt.fitFrame.contain")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("fit", e)
					});
				}
				D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("radius", e || null)
					});
				}
				D(a);
				var c = L(a, 2), l = P(c), u = I(L(l));
				D(c);
				var d = L(c, 2);
				J(d);
				var f = L(d, 2), p = P(f), m = I(L(p));
				D(f);
				var h = L(f, 2);
				J(h);
				var g = L(h, 2), _ = P(g), v = I(L(_));
				D(g);
				var y = L(g, 2);
				J(y);
				var b = L(y, 2), x = P(b), S = I(L(x));
				D(b);
				var C = L(b, 2);
				J(C);
				var ee = L(C, 2), te = P(ee), w = I(L(te));
				D(ee);
				var ne = L(ee, 2);
				J(ne);
				var re = L(ne, 2), ie = P(re), ae = I(L(ie));
				D(re);
				var oe = L(re, 2);
				J(oe);
				var se = L(oe, 2), T = I(se, !0);
				De(2), z((e, t, n, i, a, s, c, f, b, ee, re, ce, le, ue, de, E, fe) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), W(l, `${n ?? ""} `), W(u, `${i ?? ""}%`), Y(d, B(N).props.x ?? .5), W(p, `${a ?? ""} `), W(m, `${s ?? ""}%`), Y(h, B(N).props.y ?? .5), X(g, "title", c), W(_, `${f ?? ""} `), W(v, `${b ?? ""}x`), Y(y, B(N).props.zoom ?? 1), W(x, `${ee ?? ""} `), W(S, `${re ?? ""}%`), Y(C, B(N).props.brightness ?? 1), W(te, `${ce ?? ""} `), W(w, `${le ?? ""}%`), Y(ne, B(N).props.contrast ?? 1), W(ie, `${ue ?? ""} `), W(ae, `${de ?? ""}%`), Y(oe, B(N).props.saturate ?? 1), X(se, "title", E), W(T, fe);
				}, [
					() => Z("lbl.fit"),
					() => Z("lbl.radius"),
					() => Z("lbl.focusX"),
					() => Math.round((B(N).props.x ?? .5) * 100),
					() => Z("lbl.focusY"),
					() => Math.round((B(N).props.y ?? .5) * 100),
					() => Z("tip.zoomCrop"),
					() => Z("lbl.zoom"),
					() => (B(N).props.zoom ?? 1).toFixed(2),
					() => Z("lbl.brightness"),
					() => Math.round((B(N).props.brightness ?? 1) * 100),
					() => Z("lbl.contrast"),
					() => Math.round((B(N).props.contrast ?? 1) * 100),
					() => Z("lbl.saturate"),
					() => Math.round((B(N).props.saturate ?? 1) * 100),
					() => Z("tip.resetAdjust"),
					() => Z("ui.resetAdjust")
				]), V("input", d, (e) => R("x", Number(e.target.value))), V("input", h, (e) => R("y", Number(e.target.value))), V("input", y, (e) => R("zoom", Number(e.target.value))), V("input", C, (e) => R("brightness", Number(e.target.value))), V("input", ne, (e) => R("contrast", Number(e.target.value))), V("input", oe, (e) => R("saturate", Number(e.target.value))), V("click", se, () => ln(`edit:${B(N).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), U(e, t);
			}, h = (e) => {
				var t = bm(), n = F(t), r = P(n), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.color ?? "accent"), t = /* @__PURE__ */ A(vi);
					va(s, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => R("color", e)
					});
				}
				D(a), De(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), Y(i, B(N).props.size ?? 48), X(a, "title", t), W(o, `${n ?? ""} `);
				}, [
					() => Z("lbl.sizePx"),
					() => Z("hint.icon.color"),
					() => Z("lbl.color")
				]), V("change", i, (e) => R("size", Number(e.target.value))), U(e, t);
			}, g = (e) => {
				var t = vm(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.view ?? "cards"), t = /* @__PURE__ */ A(() => [
						["cards", Z("opt.collectionView.cards")],
						["list", Z("opt.collectionView.list")],
						["archive", Z("opt.collectionView.archive")]
					]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("view", e)
					});
				}
				D(n), De(2), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.view")]), U(e, t);
			}, _ = (e) => {
				var t = xm(), n = F(t), r = P(n), i = L(r);
				J(i), D(n), De(2), z((e, t) => {
					X(n, "title", e), W(r, `${t ?? ""} `), Y(i, B(N).props.columns ?? 0);
				}, [() => Z("tip.product.columns"), () => Z("lbl.columns")]), V("change", i, (e) => R("columns", Number(e.target.value))), U(e, t);
			}, v = (e) => {
				var t = vm(), n = F(t), r = P(n), i = L(r);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.variant ?? "button"), t = /* @__PURE__ */ A(() => [["button", Z("opt.cart.button")], ["icon", Z("opt.cart.icon")]]);
					Q(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("variant", e)
					});
				}
				D(n), De(2), z((e) => W(r, `${e ?? ""} `), [() => Z("lbl.view")]), U(e, t);
			}, x = (e) => {
				let t = /* @__PURE__ */ A(() => Ed(B(N).props.view));
				var n = Dm(), r = F(n), i = P(r), a = L(i);
				{
					let e = /* @__PURE__ */ A(() => Sd.map((e) => [e, Z(`opt.galleryView.${e}`)]));
					Q(a, {
						get value() {
							return B(t);
						},
						get options() {
							return B(e);
						},
						onchange: (e) => R("view", e)
					});
				}
				D(r);
				var o = L(r, 2), s = (e) => {
					var t = Sm(), n = F(t), r = P(n), i = L(r);
					J(i), D(n);
					var a = L(n, 2), o = P(a), s = I(L(o));
					D(a);
					var c = L(a, 2);
					J(c), z((e, t) => {
						W(r, `${e ?? ""} `), Y(i, B(N).props.columns ?? 3), W(o, `${t ?? ""} `), W(s, `${B(N).props.gap ?? 12 ?? ""} px`), Y(c, B(N).props.gap ?? 12);
					}, [() => Z("lbl.columns"), () => Z("lbl.imageGap")]), V("change", i, (e) => R("columns", Number(e.target.value))), V("input", c, (e) => R("gap", Number(e.target.value))), U(e, t);
				}, c = /* @__PURE__ */ A(() => Cd.includes(B(t)));
				G(o, (e) => {
					B(c) && e(s);
				});
				var l = L(o, 2), u = (e) => {
					var t = Cm(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2);
					J(a);
					var o = I(L(a, 2));
					D(n);
					var s = L(n, 2), c = P(s);
					K(c, () => w.shuffle);
					var l = L(c);
					D(s), z((e, t, r, c) => {
						X(n, "title", e), W(i, t), X(a, "min", wd.min), X(a, "max", wd.max), Y(a, B(N).props.rowHeight ?? wd.dflt), W(o, `${B(N).props.rowHeight ?? wd.dflt ?? ""} px`), X(s, "title", r), W(l, ` ${c ?? ""}`);
					}, [
						() => Z("tip.gallery.rowHeight"),
						() => Z("lbl.galleryRowHeight"),
						() => Z("tip.gallery.shuffleMosaic"),
						() => Z("ui.shufflePhotos")
					]), V("input", a, (e) => R("rowHeight", e.target.valueAsNumber)), V("click", s, () => R("seed", ri())), U(e, t);
				};
				G(l, (e) => {
					B(t) === "mosaic" && e(u);
				});
				var d = L(l, 2), f = (e) => {
					var t = wm(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2);
					J(a);
					var o = I(L(a, 2));
					D(n);
					var s = L(n, 2), c = (e) => {
						var t = ep(), n = P(t);
						K(n, () => w.shuffle);
						var r = L(n);
						D(t), z((e, n) => {
							X(t, "title", e), W(r, ` ${n ?? ""}`);
						}, [() => Z("tip.gallery.shuffleTilt"), () => Z("ui.shufflePhotos")]), V("click", t, () => R("seed", ri())), U(e, t);
					};
					G(s, (e) => {
						(B(N).props.tilt ?? Td.dflt) > 0 && e(c);
					});
					var l = L(s, 2), u = P(l), d = L(u);
					{
						let e = /* @__PURE__ */ A(() => B(N).props.frameColor || "#ffffff"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.gallery.frameColor"));
						va(d, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							allowClear: !0,
							get label() {
								return B(n);
							},
							onchange: (e) => R("frameColor", e ?? "")
						});
					}
					D(l);
					var f = L(l, 2), p = P(f);
					J(p);
					var m = L(p);
					D(f), z((e, t, r, s, c, d) => {
						X(n, "title", e), W(i, t), X(a, "min", Td.min), X(a, "max", Td.max), Y(a, B(N).props.tilt ?? Td.dflt), W(o, `${B(N).props.tilt ?? Td.dflt ?? ""}°`), X(l, "title", r), W(u, `${s ?? ""} `), X(f, "title", c), xi(p, B(N).props.captions === !0), W(m, ` ${d ?? ""}`);
					}, [
						() => Z("tip.gallery.tilt"),
						() => Z("lbl.polaroidTilt"),
						() => Z("tip.gallery.frameColor"),
						() => Z("lbl.frameColor"),
						() => Z("tip.gallery.captions"),
						() => Z("lbl.galleryCaptions")
					]), V("input", a, (e) => R("tilt", e.target.valueAsNumber)), V("change", p, (e) => R("captions", e.target.checked)), U(e, t);
				};
				G(d, (e) => {
					B(t) === "polaroid" && e(f);
				});
				var p = L(d, 2), m = (e) => {
					var t = Tm(), n = F(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.ribbonRows")), t = /* @__PURE__ */ A(() => String(B(N).props.rows ?? 1)), r = /* @__PURE__ */ A(() => [["1", Z("opt.ribbonRows.one")], ["2", Z("opt.ribbonRows.two")]]);
						Cs(n, {
							get label() {
								return B(e);
							},
							get value() {
								return B(t);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => R("rows", Number(e))
						});
					}
					var r = L(n, 2);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.ribbonDirection")), t = /* @__PURE__ */ A(() => B(N).props.direction ?? "left"), n = /* @__PURE__ */ A(() => [["left", Z("opt.ribbonDir.left")], ["right", Z("opt.ribbonDir.right")]]);
						Cs(r, {
							get label() {
								return B(e);
							},
							get value() {
								return B(t);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => R("direction", e)
						});
					}
					var i = L(r, 2), a = P(i), o = I(a, !0), s = L(a, 2);
					J(s);
					var c = I(L(s, 2), !0);
					D(i);
					var l = L(i, 2), u = P(l), d = I(u, !0), f = L(u, 2);
					J(f);
					var p = I(L(f, 2));
					D(l);
					var m = L(l, 2), h = P(m), g = I(L(h));
					D(m);
					var _ = L(m, 2);
					J(_);
					var v = L(_, 2), y = P(v);
					J(y);
					var b = L(y);
					D(v);
					var x = L(v, 2), S = P(x);
					J(S);
					var C = L(S);
					D(x), z((e, t, n, r, a, u, m, ee, te) => {
						X(i, "title", e), W(o, t), Y(s, B(N).props.speed ?? 60), W(c, B(N).props.speed ?? 60), X(l, "title", n), W(d, r), Y(f, B(N).props.bandHeight ?? 160), W(p, `${B(N).props.bandHeight ?? 160 ?? ""} px`), W(h, `${a ?? ""} `), W(g, `${B(N).props.gap ?? 12 ?? ""} px`), Y(_, B(N).props.gap ?? 12), X(v, "title", u), xi(y, B(N).props.pauseOnHover !== !1), W(b, ` ${m ?? ""}`), X(x, "title", ee), xi(S, B(N).props.fade !== !1), W(C, ` ${te ?? ""}`);
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
					]), V("input", s, (e) => R("speed", e.target.valueAsNumber)), V("input", f, (e) => R("bandHeight", e.target.valueAsNumber)), V("input", _, (e) => R("gap", Number(e.target.value))), V("change", y, (e) => R("pauseOnHover", e.target.checked)), V("change", S, (e) => R("fade", e.target.checked)), U(e, t);
				};
				G(p, (e) => {
					B(t) === "ribbon" && e(m);
				});
				var h = L(p, 2), g = (e) => {
					var t = Em(), n = P(t), r = L(n);
					J(r), D(t), z((e) => {
						W(n, `${e ?? ""} `), Y(r, B(N).props.interval ?? 5);
					}, [() => Z("lbl.secondsPerImage")]), V("change", r, (e) => R("interval", Number(e.target.value))), U(e, t);
				};
				G(h, (e) => {
					B(t) === "slides" && e(g);
				});
				var _ = L(h, 2), v = P(_), y = L(v);
				{
					let e = /* @__PURE__ */ A(() => B(N).props.radius ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(y, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => R("radius", e || null)
					});
				}
				D(_);
				var b = L(_, 2), x = P(b);
				J(x);
				var S = L(x);
				D(b), De(2), z((e, t, n, r) => {
					W(i, `${e ?? ""} `), W(v, `${t ?? ""} `), X(b, "title", n), xi(x, B(N).props.lightbox !== !1), W(S, ` ${r ?? ""}`);
				}, [
					() => Z("lbl.view"),
					() => Z("lbl.radius"),
					() => Z("tip.lightbox"),
					() => Z("lbl.lightbox")
				]), V("change", x, (e) => R("lightbox", e.target.checked)), U(e, n);
			}, S = (e) => {
				var t = km(), n = F(t), r = P(n);
				Q(L(r), {
					get value() {
						return B(N).props.color;
					},
					get options() {
						return $n;
					},
					onchange: (e) => R("color", e)
				}), D(n);
				var i = L(n, 2), a = P(i), o = L(a);
				J(o), D(i);
				var s = L(i, 2), c = (e) => {
					var t = Om(), n = P(t), r = L(n);
					J(r), D(t), z((e, t) => {
						W(n, `${e ?? ""} `), X(r, "max", t), Y(r, B(N).frame.w);
					}, [() => Z("lbl.length"), () => Math.max(1, Math.round(100 - B(N).frame.x))]), V("change", r, (e) => xn("w", Math.max(1, Math.min(Number(e.target.value), 100 - B(N).frame.x)))), U(e, t);
				};
				G(s, (e) => {
					(B(N).props.kind === "line" || B(N).props.kind === "arrow") && e(c);
				});
				var l = L(s, 2), u = (e) => {
					var t = vp(), n = P(t), r = L(n);
					J(r), D(t), z((e, i) => {
						X(t, "title", e), W(n, `${i ?? ""} `), Y(r, B(N).props.label ?? "");
					}, [() => Z("tip.shape.label"), () => Z("lbl.shapeLabel")]), V("change", r, (e) => R("label", e.target.value.trim() || void 0)), U(e, t);
				};
				G(l, (e) => {
					B(N).props.kind === "line" && e(u);
				});
				var d = L(l, 2), f = P(d);
				J(f);
				var p = L(f);
				D(d), De(2), z((e, t, n, i, s) => {
					W(r, `${e ?? ""} `), W(a, `${t ?? ""} `), Y(o, B(N).props.thickness), X(d, "title", n), xi(f, i), W(p, ` ${s ?? ""}`);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.thickness"),
					() => Z("tip.shape.fill"),
					() => !!B(N).props.fill,
					() => Z("lbl.filled")
				]), V("change", o, (e) => R("thickness", Number(e.target.value))), V("change", f, (e) => R("fill", e.target.checked ? B(N).props.color : null)), U(e, t);
			};
			G(n, (e) => {
				B(N).type === "text" ? e(r) : B(N).type === "faq" ? e(i, 1) : B(N).type === "timeline" ? e(a, 2) : B(N).type === "quote" ? e(o, 3) : B(N).type === "stats" ? e(c, 4) : B(N).type === "ribbon" ? e(l, 5) : B(N).type === "table" ? e(u, 6) : B(N).type === "share" ? e(d, 7) : B(N).type === "countdown" ? e(f, 8) : B(N).type === "button" ? e(p, 9) : B(N).type === "image" ? e(m, 10) : B(N).type === "icon" ? e(h, 11) : B(N).type === "collection" ? e(g, 12) : B(N).type === "product" ? e(_, 13) : B(N).type === "cart" ? e(v, 14) : B(N).type === "gallery" ? e(x, 15) : B(N).type === "shape" && e(S, 16);
			});
			var C = L(n, 2), ee = P(C), te = L(ee);
			{
				let e = /* @__PURE__ */ A(() => B(N).fit === "shrink" ? "shrink" : "wrap"), t = /* @__PURE__ */ A(() => dn.has(B(N).type) ? [["wrap", Z("opt.fit.fluid")], ["shrink", Z("opt.fit.floor")]] : [["wrap", Z("opt.fit.wrap")], ["shrink", Z("opt.fit.shrink")]]);
				Q(te, {
					get value() {
						return B(e);
					},
					get options() {
						return B(t);
					},
					onchange: (e) => fn(e)
				});
			}
			D(C);
			var ne = L(C, 2), re = (e) => {
				var t = Am(), n = P(t), r = I(n, !0), i = L(n, 2);
				J(i);
				var a = I(L(i, 2));
				D(t), z((e, n, o, s) => {
					X(t, "title", e), W(r, n), Y(i, o), W(a, `${s ?? ""} %`);
				}, [
					() => Z("tip.fitMin"),
					() => Z("lbl.fitMin"),
					() => Math.round((B(N).fitMin ?? .6) * 100),
					() => Math.round((B(N).fitMin ?? .6) * 100)
				]), V("input", i, (e) => pn(e.target.valueAsNumber / 100)), U(e, t);
			};
			G(ne, (e) => {
				B(N).fit === "shrink" && e(re);
			});
			var ie = L(ne, 4), ae = P(ie), oe = L(ae);
			{
				let e = /* @__PURE__ */ A(() => Oi(B(N).animation) ? B(N).animation.type : "");
				Q(oe, {
					get value() {
						return B(e);
					},
					get options() {
						return ji;
					},
					onchange: (e) => Pi(e || null)
				});
			}
			D(ie);
			var se = L(ie, 2), T = (e) => {
				var t = jm(), n = F(t), r = P(n), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a), z((e, t) => {
					W(r, `${e ?? ""} `), Y(i, B(N).animation.props.duration), W(o, `${t ?? ""} `), Y(s, B(N).animation.props.delay);
				}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), V("change", i, (e) => Ii("duration", Number(e.target.value))), V("change", s, (e) => Ii("delay", Number(e.target.value))), U(e, t);
			}, ce = /* @__PURE__ */ A(() => Oi(B(N).animation));
			G(se, (e) => {
				B(ce) && e(T);
			});
			var le = L(se, 2), ue = P(le), de = L(ue);
			{
				let e = /* @__PURE__ */ A(() => B(N).hover?.type ?? (B(N).animation && !Oi(B(N).animation) ? B(N).animation.type : ""));
				Q(de, {
					get value() {
						return B(e);
					},
					get options() {
						return Mi;
					},
					onchange: (e) => Fi(e || null)
				});
			}
			D(le);
			var E = L(le, 2), fe = (e) => {
				var t = Pm(), n = L(F(t), 2), r = P(n);
				J(r);
				var i = L(r);
				D(n);
				var a = L(n, 2), o = (e) => {
					var t = Nm(), n = F(t), r = P(n), i = L(r);
					{
						let e = /* @__PURE__ */ A(() => B(N).sticky.mode ?? "scroll"), t = /* @__PURE__ */ A(() => [["scroll", Z("opt.sticky.modeScroll")], ["screen", Z("opt.sticky.modeScreen")]]);
						Q(i, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => ln(`edit:${B(N).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					D(n);
					var a = L(n, 2), o = (e) => {
						var t = Mm(), n = P(t), r = L(n);
						J(r), D(t), z((e, i) => {
							X(t, "title", e), W(n, `${i ?? ""} `), Y(r, B(N).sticky.offset ?? 16);
						}, [() => B(N).sticky.mode === "screen" ? Z("tip.stickyEdge") : Z("tip.stickyOffset"), () => B(N).sticky.mode === "screen" ? Z("lbl.stickyEdge") : Z("lbl.stickyOffset")]), V("change", r, (e) => ln(`edit:${B(N).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), U(e, t);
					};
					G(a, (e) => {
						(B(N).sticky.mode !== "screen" || (B(N).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = L(a, 2), c = (e) => {
						var t = rp(), n = P(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => B(N).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ A(() => on.map(([e, t]) => [e, Z(t)]));
							Q(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => ln(`edit:${B(N).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						D(t), z((e, r) => {
							X(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyDock"), () => Z("lbl.stickyDock")]), U(e, t);
					}, l = (e) => {
						var t = rp(), n = P(t), r = L(n);
						{
							let e = /* @__PURE__ */ A(() => B(N).sticky.until ?? ""), t = /* @__PURE__ */ A(sn);
							Q(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => ln(`edit:${B(N).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						D(t), z((e, r) => {
							X(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyUntil"), () => Z("lbl.stickyUntil")]), U(e, t);
					};
					G(s, (e) => {
						B(N).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), z((e, t) => {
						X(n, "title", e), W(r, `${t ?? ""} `);
					}, [() => Z("tip.stickyMode"), () => Z("lbl.stickyMode")]), U(e, t);
				};
				G(a, (e) => {
					B(N).sticky && e(o);
				}), z((e, t, a) => {
					X(n, "title", e), xi(r, t), W(i, ` ${a ?? ""}`);
				}, [
					() => Z("tip.sticky"),
					() => !!B(N).sticky,
					() => Z("lbl.sticky")
				]), V("change", r, (e) => ln(`edit:${B(N).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), U(e, t);
			};
			G(E, (e) => {
				B(Ae) === "desktop" && e(fe);
			});
			var pe = L(E, 4), me = P(pe), he = I(me, !0), ge = L(me, 2), _e = P(ge), ve = (e) => {
				var t = Fm(), n = P(t), r = P(n, !0), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a, !0), s = L(o);
				J(s), D(a);
				var c = L(a, 2), l = P(c, !0), u = L(l);
				J(u), D(c);
				var d = L(c, 2), f = P(d, !0), p = L(f);
				J(p), D(d);
				var m = L(d, 2), h = P(m, !0), g = L(h);
				J(g), D(m);
				var _ = L(m, 2), v = P(_, !0), y = L(v);
				J(y), D(_), D(t), z((e, t, n, a, c, d, _) => {
					W(r, e), Y(i, B(N).frame.x), W(o, t), Y(s, B(N).frame.y), W(l, n), Y(u, B(N).frame.w), W(f, a), Y(p, B(N).frame.h), X(m, "title", c), W(h, d), Y(g, B(N).frame.z ?? 1), W(v, _), Y(y, B(N).frame.rot ?? 0);
				}, [
					() => Z("frame.x"),
					() => Z("frame.y"),
					() => Z("frame.w"),
					() => Z("frame.h"),
					() => Z("tip.frameZ"),
					() => Z("frame.z"),
					() => Z("frame.rot")
				]), V("change", i, (e) => xn("x", Number(e.target.value))), V("change", s, (e) => xn("y", Number(e.target.value))), V("change", u, (e) => xn("w", Number(e.target.value))), V("change", p, (e) => xn("h", Number(e.target.value))), V("change", g, (e) => xn("z", Number(e.target.value))), V("change", y, (e) => xn("rot", Number(e.target.value))), U(e, t);
			};
			G(_e, (e) => {
				B(Ae) === "desktop" && e(ve);
			});
			var ye = L(_e, 2), be = P(ye);
			J(be);
			var xe = L(be);
			D(ye);
			var Se = L(ye, 2), Ce = P(Se);
			J(Ce);
			var we = L(Ce);
			D(Se), D(ge), D(pe), z((e, t, n, r, i, a, o, s, c, l, u, d) => {
				X(C, "title", e), W(ee, `${t ?? ""} `), X(ie, "title", n), W(ae, `${r ?? ""} `), X(le, "title", i), W(ue, `${a ?? ""} `), X(me, "title", o), W(he, s), X(ye, "title", c), xi(be, B(N).hideMobile), W(xe, ` ${l ?? ""}`), X(Se, "title", u), xi(Ce, B(N).decor), W(we, ` ${d ?? ""}`);
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
			]), V("change", be, (e) => Jn(e.target.checked)), V("change", Ce, (e) => Wn(e.target.checked)), U(e, t);
		};
		G(d, (e) => {
			B(_n) === "content" ? e(f) : e(p, -1);
		}), z((e, t) => {
			a = q(i, 1, "svelte-1n46o8q", null, a, { on: B(_n) === "content" }), W(o, e), l = q(c, 1, "svelte-1n46o8q", null, l, { on: B(_n) === "style" }), W(u, t);
		}, [() => Z("props.tabContent"), () => Z("props.tabStyle")]), V("click", i, () => M(_n, "content")), V("click", c, () => M(_n, "style")), U(e, t);
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
	}, y = /* @__PURE__ */ A(() => [
		["text", Z("opt.ribbonStripe.text")],
		["marks", Z("opt.ribbonStripe.marks")],
		["plain", Z("opt.ribbonStripe.plain")]
	]), b = /* @__PURE__ */ A(() => [["none", Z("common.none")], ...B(y)]), x = /* @__PURE__ */ A(() => [
		["dot", Z("opt.ribbonSep.dot")],
		["dash", Z("opt.ribbonSep.dash")],
		["slash", Z("opt.ribbonSep.slash")],
		["star", Z("opt.ribbonSep.star")],
		["none", Z("common.none")],
		["custom", Z("opt.ribbonSep.custom")]
	]), S = /* @__PURE__ */ j("");
	function C() {
		B(S).trim() && (M(Ya, B(S), !0), M(Xa, null), ao() !== !1 && M(S, ""));
	}
	let ee = [
		["color", fu],
		["gradient", wu],
		["glow", Tu],
		["image", bd],
		["slideshow", sf],
		["video", Ef],
		["pattern", Ru],
		["grain", Du]
	], te = Object.fromEntries(ee), w = {
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
	}, ne = [
		["purple", Z("adminTheme.purple")],
		["well", Z("adminTheme.well")],
		["gold", Z("adminTheme.gold")],
		["grey", Z("adminTheme.grey")],
		["aurora", Z("adminTheme.aurora")],
		["dusk", Z("adminTheme.dusk")],
		["ember", Z("adminTheme.ember")]
	], re = {
		lilla: "purple",
		bronn: "well",
		gull: "gold",
		graa: "grey",
		nordlys: "aurora",
		skumring: "dusk",
		glo: "ember"
	}, ie = /* @__PURE__ */ j($t((() => {
		let e = localStorage.getItem("urd-admin-theme");
		return re[e] ?? e ?? "grey";
	})()));
	yn(() => {
		document.documentElement.dataset.adminTheme = B(ie), localStorage.setItem("urd-admin-theme", B(ie)), ae();
	});
	function ae() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		tt?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": oe(t)
		});
	}
	function oe(e) {
		return uu(e) == null || (du(e, "#ffffff") ?? 0) >= (du(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let se = /* @__PURE__ */ j(null), T = /* @__PURE__ */ j(null), ce = /* @__PURE__ */ j(!1), le = /* @__PURE__ */ j(""), ue = /* @__PURE__ */ j("info"), de = 0;
	function E(e, t = "info") {
		M(le, e, !0), M(ue, t, !0);
		let n = ++de;
		t === "ok" && setTimeout(() => {
			de === n && (M(le, ""), M(ue, "info"));
		}, 8e3);
	}
	function fe() {
		E(Z("status.storageFull"), "error");
	}
	function pe(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			fe();
		}
	}
	let me = /* @__PURE__ */ j(null), he = /* @__PURE__ */ j(null), ge = /* @__PURE__ */ j($t({
		size: 16,
		snap: !0
	})), _e = /* @__PURE__ */ j(!0), ve = /* @__PURE__ */ j($t(Ro(typeof window < "u" ? window : null) ?? 1920)), ye = "urd-admin-screen";
	function be() {
		let e = null;
		try {
			e = JSON.parse(localStorage.getItem(ye) ?? "null");
		} catch {
			e = null;
		}
		return zo(e, B(ve));
	}
	let xe = /* @__PURE__ */ j($t(be()));
	function Se(e) {
		M(xe, zo({
			...Ge(B(xe)),
			...e
		}, B(ve)), !0);
		try {
			localStorage.setItem(ye, JSON.stringify(B(xe)));
		} catch {}
	}
	let Ce = /* @__PURE__ */ A(() => Bo(B(xe), B(ve))), we = [
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
	], Te = /* @__PURE__ */ A(() => [{
		id: "desktop",
		width: B(Ce).width,
		height: B(Ce).height || null,
		viewport: "desktop"
	}, ...we]);
	function Ee(e) {
		let t = Jo(B(ss), B(ls), e.width).width;
		return Z(e.id === "desktop" ? B(xe).mode === "own" ? "tip.view.desktop" : e.height ? "tip.view.desktopSizeH" : "tip.view.desktopSize" : `tip.view.${e.id}`, {
			w: e.width,
			h: e.height ?? 0,
			c: t
		});
	}
	let Oe = /* @__PURE__ */ j("desktop"), ke = /* @__PURE__ */ A(() => B(Te).find((e) => e.id === B(Oe)) ?? B(Te)[0]), Ae = /* @__PURE__ */ A(() => B(ke).viewport === "mobile" || B(ke).width <= (B(k)?.breakpoints?.mobile ?? 640) ? "mobile" : "desktop"), je = /* @__PURE__ */ j(null), Me = /* @__PURE__ */ j(0), Ne = /* @__PURE__ */ j(0), Pe = /* @__PURE__ */ j("fit"), Fe = /* @__PURE__ */ j(1), Ie = /* @__PURE__ */ A(() => qo(B(ss), B(ls))), Le = /* @__PURE__ */ A(() => B(ke).width), Re = /* @__PURE__ */ A(() => B(ke).height ?? 0), ze = /* @__PURE__ */ A(() => B(Pe) === "manual" ? B(Fe) : jo(B(Me), B(Le), "fit", B(Ne), B(Re)));
	function Be(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(B(ze) * 100) / 10) + e) * 10));
		M(Fe, t / 100), M(Pe, "manual");
	}
	let Ve = /* @__PURE__ */ A(() => B(Re) > 0 ? B(Re) : B(ze) > 0 ? B(Ne) / B(ze) : B(Ne)), He = /* @__PURE__ */ A(() => B(Le) * B(ze)), Ue = /* @__PURE__ */ A(() => B(Re) > 0 ? B(Re) * B(ze) : B(Ne)), We = /* @__PURE__ */ A(() => B(He) > B(Me) + 1 || B(Ue) > B(Ne) + 1);
	yn(() => {
		let e = () => tt?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), yn(() => {
		let e = B(Ae);
		tt?.sendViewport(e);
	}), yn(() => {
		let e = B(ze);
		tt?.sendZoom(e);
	}), yn(() => {
		let e = () => {
			M(ve, Ro(window) ?? B(ve), !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), yn(() => {
		let e = B(je);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			M(Me, e.clientWidth, !0), M(Ne, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let Ke = /* @__PURE__ */ j(0);
	function qe() {
		M(Ke, O?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Je() {
		let e = O?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		M(Oe, "mobile"), e && setTimeout(() => tt?.sendScrollSection(e.id), 0);
	}
	function Ze(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			pt("layout");
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
			}, $e(t, "layout-changed"), e.sectionId === B(er) && M(nr, e.minHeight, !0), B(N)?.sectionId === e.sectionId && tn(), O.save(), ct(), tt?.sendSection(B(T), t);
		}
	}
	function Qe(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function $e(e, t) {
		e && Qe(e) && (e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, qe(), tt?.sendAttention(e.id, !0)));
	}
	let O = null, et = null, tt = null, k = /* @__PURE__ */ j(null);
	function nt() {
		M(k, et.data, !0), et.replace(B(k));
	}
	function rt() {
		tt?.sendSite(Ge(B(k)));
	}
	let it = /* @__PURE__ */ new Set(), st = () => B(k).pages.find((e) => e.id === B(T));
	function ct() {
		let e = B(k)?.pages?.some((e) => !it.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Rc?.hasDraft() || Object.values(zc).some((e) => e.hasDraft()), n = Jc?.hasDraft() || Object.values(Yc).some((e) => e.hasDraft());
		M(ce, e || O?.hasDraft() && !it.has(B(T)) || et?.hasDraft() || Fl?.hasDraft() || t || n || !1, !0);
	}
	let lt = [], ut = [], dt = null;
	function ft() {
		return JSON.stringify({
			pageId: B(T),
			page: O.data,
			site: et.data,
			collectionsIndex: Vc ? Rc.data : null,
			collections: Vc ? Object.fromEntries(Object.entries(zc).map(([e, t]) => [e, t.data])) : {},
			templatesIndex: Zc ? Jc.data : null,
			templates: Zc ? Object.fromEntries(Object.entries(Yc).map(([e, t]) => [e, t.data])) : {},
			plugins: Fl?.data ?? null
		});
	}
	function pt(e) {
		(e !== dt || !e.startsWith("edit:") && !e.startsWith("grid:")) && (lt.push(ft()), lt.length > 50 && lt.shift(), ut.length = 0, dt = e);
	}
	function mt(e) {
		let { pageId: t, page: n, site: r, collectionsIndex: i, collections: a, templatesIndex: o, templates: s, plugins: c } = JSON.parse(e);
		if (et.replace(r), nt(), et.save(), M(ge, {
			snap: !0,
			...B(k).grid
		}, !0), rt(), ht(i, a ?? {}), gt(o, s ?? {}), _t(c), t && t !== B(T) && B(k).pages.some((e) => e.id === t)) {
			pe(`urd-draft-${t}`, JSON.stringify(n)), Ta(t, { keepHistory: !0 }), ct();
			return;
		}
		O.replace(n), O.save(), ct(), qe(), tn(), cr(O.data.sections.find((e) => e.id === B(er))), B(k).pages.some((e) => e.id === B(T)) ? tt?.sendPage(B(T), O.data) : Ta(B(k).pages[0].id, { keepHistory: !0 });
	}
	function ht(e, t) {
		if (Rc && e && JSON.stringify({
			index: Rc.data,
			collections: Object.fromEntries(Object.entries(zc).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			collections: t
		})) {
			Rc.replace(e), Rc.save();
			for (let e of Object.keys(zc)) e in t || (localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete zc[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!zc[e]) {
					let t = Bc[e] ?? null;
					zc[e] = ea(`urd-draft-collection-${e}`, () => t, fe, `urd-draft-samling-${e}`);
				}
				zc[e].replace(n), zc[e].save();
			}
			M(Hc, [...e.samlinger ?? []], !0), B(Wc) && !B(Hc).includes(B(Wc)) && M(Wc, null), fl();
		}
	}
	function gt(e, t) {
		if (Jc && e && JSON.stringify({
			index: Jc.data,
			templates: Object.fromEntries(Object.entries(Yc).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			templates: t
		})) {
			Jc.replace(e), Jc.save();
			for (let e of Object.keys(Yc)) e in t || (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Yc[e]);
			for (let [e, n] of Object.entries(t)) Yc[e] || (Yc[e] = ea(`urd-draft-template-${e}`, () => Xc[e] ?? null, fe, `urd-draft-mal-${e}`)), Yc[e].replace(n), Yc[e].save();
			M(Qc, [...e.maler ?? []], !0), ct(), el();
		}
	}
	function _t(e) {
		Fl && e && JSON.stringify(Fl.data) !== JSON.stringify(e) && (Fl.replace(e), Fl.save(), ql(), hu());
	}
	function vt() {
		lt.length && (ut.push(ft()), mt(lt.pop()), dt = null, E(Z("status.undone")));
	}
	function yt() {
		ut.length && (lt.push(ft()), mt(ut.pop()), dt = null, E(Z("status.redone")));
	}
	function bt(e) {
		B(rn) && (e.target instanceof Element && e.target.closest(".block-menu") || M(rn, null));
	}
	function xt(e) {
		if (e.key === "Escape" && B(rn)) {
			M(rn, null);
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
			].includes(t.type)) || !B(N) || B(Ae) === "mobile") return;
			e.preventDefault(), tt?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? yt() : vt());
	}
	async function St() {
		M(se, Ls(await (await fetch("/content/site.json")).json()), !0), et = ea("urd-draft-site", () => B(se), fe), (et.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the site draft has schemaVersion ${et.data.schemaVersion} (the engine has 4) and is discarded`), et.replace(Ge(B(se)))), et.replace(Ls(et.data)), et.save(), nt(), M(ge, {
			snap: !0,
			...B(k).grid
		}, !0), await Ta(new URLSearchParams(location.search).get("page") ?? B(k).pages[0].id), await ru(), await cl(), await $c(), await Xi(), B(he) && Qi(), Zt(), B(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (M(kt, B(k).site.title, !0), M(At, B(k).theme.tokens.color.accent, !0), M(jt, B(k).theme.tokens.color.bg, !0), M(Ot, !0));
	}
	let Ct = /* @__PURE__ */ j(null);
	function wt({ title: e, lines: t = [], okLabel: n = Z("confirm.ok"), cancelLabel: r = Z("confirm.cancel") }) {
		return new Promise((i) => {
			M(Ct, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Tt({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Z("confirm.ok"), cancelLabel: a = Z("confirm.cancel") }) {
		return new Promise((o) => {
			M(Ct, {
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
	function Et(e) {
		B(Ct)?.resolve(B(Ct).prompt ? e ? B(Ct).value : null : e), M(Ct, null);
	}
	let Dt = !1;
	yn(() => {
		if (!B(Ct)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Et(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let Ot = /* @__PURE__ */ j(!1), kt = /* @__PURE__ */ j(""), At = /* @__PURE__ */ j("#7c5cff"), jt = /* @__PURE__ */ j("#0b0e14");
	function Mt() {
		localStorage.setItem("urd-setup-done", "1"), M(Ot, !1);
	}
	function Nt() {
		let e = B(kt).trim();
		e && (Ja("setup", () => {
			B(k).site.title = e, B(k).nav.logo = {
				type: "text",
				value: e
			}, B(k).theme.tokens.color.accent = B(At), B(k).theme.tokens.color.bg = B(jt), delete B(k).site.setup;
		}), Mt(), E(Z("status.setupDone"), "ok"));
	}
	let Pt = "urd-admin-panels", Ft = "urd-admin-panel-open", It = /* @__PURE__ */ j($t(localStorage.getItem(Pt) === "reset" ? "reset" : "remember"));
	function Lt(e) {
		M(It, e === "reset" ? "reset" : "remember", !0), B(It) === "reset" ? localStorage.setItem(Pt, "reset") : localStorage.removeItem(Pt);
	}
	let Rt = /* @__PURE__ */ j($t(B(It) === "reset" ? null : localStorage.getItem(Ft))), zt = [
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
	], Bt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], Vt = Object.fromEntries(zt.flat().map((e) => [e, Z(`panel.${e}`)]));
	B(Rt) && !Vt[B(Rt)] && M(Rt, null), yn(() => {
		if (B(It) === "reset") {
			localStorage.removeItem(Ft);
			return;
		}
		B(Rt) ? localStorage.setItem(Ft, B(Rt)) : localStorage.removeItem(Ft);
	});
	let Ht = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, Ut = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], Wt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function Gt(e, t) {
		let n = [];
		for (let r of e) for (let e of zl[r]?.languages ?? []) e?.[t] === !0 && typeof e.code == "string" && typeof e.name == "string" && e.name && (Ut.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function Kt() {
		let e = Wt([...Ut, ...Gt(B(Wl), "admin")]);
		return Jt === "auto" || e.some(([e]) => e === Jt) ? e : [[Jt, Jt], ...e];
	}
	let qt = () => Gt(B(Rl)?.enabled ?? [], "site"), Jt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Yt(e) {
		e !== Jt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function Xt(e) {
		M(Rt, B(Rt) === e ? null : e, !0), Zt();
	}
	function Zt() {
		B(Rt) === "history" && aa(), B(Rt) === "update" && !B(ma) && ga();
	}
	let N = /* @__PURE__ */ j(null);
	function Qt(e, t) {
		let n = O?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function tn() {
		if (!B(N)) return;
		let { block: e } = Qt(B(N).sectionId, B(N).blockId);
		if (!e) {
			M(N, null);
			return;
		}
		M(N, {
			sectionId: B(N).sectionId,
			blockId: B(N).blockId,
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
	function nn(e) {
		if (M(rn, null), !e.blockId) {
			M(N, null);
			return;
		}
		M(N, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && M(er, e.sectionId, !0), tn();
	}
	let rn = /* @__PURE__ */ j(null), an = window.matchMedia("(prefers-reduced-motion: reduce)").matches, on = [
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
	function sn() {
		let e = O?.data.sections ?? [], t = e.findIndex((e) => e.id === B(N)?.sectionId);
		return t < 0 ? [["", Z("opt.sticky.ownSection")]] : [["", Z("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Z("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function cn(e) {
		if (nn(e), !B(N)) return;
		let t = B(me)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + B(ze) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + B(ze) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + B(ze) * e.rect.top), Math.max(8, r));
		M(rn, {
			left: n,
			top: i
		}, !0);
	}
	function ln(e, t) {
		let { section: n, block: r } = Qt(B(N)?.sectionId, B(N)?.blockId);
		r && (e && pt(e), t(r, n), $e(n, "block-edited"), O.save(), ct(), tt?.sendSection(B(T), n), tn());
	}
	function R(e, t) {
		ln(`edit:${B(N).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function un(e, t) {
		ln(`edit:${B(N).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let dn = /* @__PURE__ */ new Set([
		"image",
		"video",
		"shape",
		"icon"
	]);
	function fn(e) {
		ln(`edit:${B(N).blockId}:fit`, (t) => {
			e === "shrink" ? (t.fit = "shrink", t.fitMin ??= .6) : (delete t.fit, delete t.fitMin);
		});
	}
	function pn(e) {
		ln(`edit:${B(N).blockId}:fitMin`, (t) => {
			t.fitMin = e;
		});
	}
	let mn = $t({}), hn = $t({}), gn = /* @__PURE__ */ j(!1), _n = /* @__PURE__ */ j("content"), vn = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function bn(e) {
		let t = B(N).blockId, n = `${t}:${e.key}`, r = (mn[n] ?? B(N).props[e.key] ?? "").trim();
		hn[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			un(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		M(gn, !0), hn[n] = {
			text: Z("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (B(N)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (un(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), hn[n] = null) : hn[n] = {
				text: Ki(a) ?? Z("props.place.notFound"),
				err: !0
			};
		} catch {
			hn[n] = {
				text: Z("props.place.failed"),
				err: !0
			};
		} finally {
			M(gn, !1);
		}
	}
	function xn(e, t) {
		Number.isFinite(t) && ln(`edit:frame-${B(N).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Sn(e) {
		ln(`edit:${B(N).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	let Cn = [
		"text",
		"email",
		"tel",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"date"
	], wn = /* @__PURE__ */ new Set(["select", "radio"]), Tn = () => "f" + [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(3))].map((e) => e.toString(16).padStart(2, "0")).join("");
	function En(e, t) {
		ln(`edit:${B(N).blockId}:field${e}`, (n) => {
			let r = {
				...n.props.fields[e],
				...t
			};
			wn.has(r.type) ? r.options ??= [] : delete r.options, n.props.fields[e] = r;
		});
	}
	function Dn(e, t) {
		En(e, { options: String(t).split(",").map((e) => e.trim()).filter(Boolean) });
	}
	function On() {
		ln("form-field", (e) => {
			(e.props.fields ??= []).push({
				id: Tn(),
				label: Z("form.newField"),
				type: "text",
				required: !1
			});
		});
	}
	function kn(e) {
		ln("form-field", (t) => {
			t.props.fields.splice(e, 1);
		});
	}
	function An(e, t) {
		let n = e + t;
		ln("form-field", (t) => {
			n < 0 || n >= t.props.fields.length || ([t.props.fields[e], t.props.fields[n]] = [t.props.fields[n], t.props.fields[e]]);
		});
	}
	function jn(e) {
		R("sources", String(e).split("\n").map((e) => e.trim()).filter(Boolean));
	}
	function Mn(e, t) {
		ln(`edit:${B(N).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Nn() {
		ln("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Z("seed.faq.newQ"),
				a: Z("seed.faq.answer")
			});
		});
	}
	function Pn(e) {
		ln("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Fn(e, t) {
		let n = e + t;
		ln("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function In(e, t) {
		ln(`edit:${B(N).blockId}:ribbon${e}`, (n) => {
			n.props.items[e] = t;
		});
	}
	function Ln() {
		ln("ribbon-item", (e) => {
			(e.props.items ??= []).push(Z("seed.ribbonBlock.new"));
		});
	}
	function Rn(e) {
		ln("ribbon-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function zn(e, t) {
		let n = e + t;
		ln("ribbon-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Bn(e, t) {
		ln(`edit:${B(N).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Vn() {
		ln("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Z("seed.timeline.newTitle"),
				text: ""
			});
		});
	}
	function Hn(e) {
		ln("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Un(e, t) {
		let n = e + t;
		ln("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Wn(e) {
		ln("decor", (t) => {
			t.decor = e;
		});
	}
	function Gn(e, t) {
		ln(`edit:${B(N).blockId}:table-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function Kn(e, t) {
		ln(`edit:${B(N).blockId}:share`, (n) => {
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
	function qn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			R("src", String(n.result ?? "")), t.size > 4e5 && E(Z("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => E(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Jn(e) {
		let { section: t, block: n } = Qt(B(N)?.sectionId, B(N)?.blockId);
		n && (pt("hide-mobile"), n.hideMobile = e, O.save(), ct(), tt?.sendSection(B(T), t), tn());
	}
	async function Yn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Kr(t);
			ln(`edit:${B(N).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ra(t.name).replaceAll("-", " ");
			});
		} catch (e) {
			E(Jr(e), "error");
		}
	}
	async function Xn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Kr(t);
			ln(`edit:${B(N).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch (e) {
			E(Jr(e), "error");
		}
	}
	let Zn = {
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
	}, Qn = [
		["line", Z("shape.line")],
		["arrow", Z("shape.arrow")],
		["circle", Z("shape.circle")],
		["rect", Z("shape.rect")],
		["triangle", Z("shape.triangle")]
	], $n = [
		["accent", Z("color.accent")],
		["text", Z("color.text")],
		["surface", Z("color.surface")],
		["bg", Z("color.bg")]
	], er = /* @__PURE__ */ j(null), tr = /* @__PURE__ */ j(null), nr = /* @__PURE__ */ j(""), rr = /* @__PURE__ */ j($t([])), ir = /* @__PURE__ */ j(null), ar = /* @__PURE__ */ j(null), or = /* @__PURE__ */ j(""), sr = /* @__PURE__ */ j($t({}));
	function cr(e) {
		M(tr, e?.grid ? { ...e.grid } : null, !0), M(nr, e?.size?.minHeight ?? "", !0), M(rr, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), M(ir, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), M(ar, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), M(or, e?.theme ?? "", !0), M(sr, e?.divider ? JSON.parse(JSON.stringify(e.divider)) : {}, !0);
	}
	let lr = /* @__PURE__ */ j(null), ur = $t({});
	function fr() {
		try {
			let e = ((B(me)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${B(er)}"]`))?.getBoundingClientRect();
			M(lr, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			M(lr, null);
		}
	}
	yn(() => {
		B(er), B(rr), requestAnimationFrame(() => requestAnimationFrame(fr));
	}), yn(() => {
		let e = B(me);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => fr());
		return t.observe(e), () => t.disconnect();
	}), yn(() => {
		for (let e of B(rr)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !ur[t]) {
				let e = new Image();
				e.onload = () => {
					ur[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function pr(e) {
		gr("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function mr(e) {
		let t = B(_i), n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"] ?? oe(hf(t.accent ?? "#000000", t))), r = lu(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function hr(e) {
		M(er, e.sectionId, !0), cr(O?.data.sections.find((t) => t.id === e.sectionId));
	}
	function gr(e, t) {
		let n = O.data.sections.find((e) => e.id === B(er));
		n && (pt(e), t(n), O.save(), ct(), tt?.sendSection(B(T), n), cr(n));
	}
	let _r = /* @__PURE__ */ j("color");
	function vr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: te[t].version ?? 1,
				props: te[t].defaults()
			});
		});
	}
	function yr(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function xr(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Cr(e, t, n) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${Object.keys(n).join("+")}`, (e) => {
			Object.assign(e.background.layers[t].props, n);
		});
	}
	function wr(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function Tr(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				wr(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				wr(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let Er = (e) => Math.min(4, Math.max(.1, e));
	function Dr(e, t, n, r) {
		wr(e, t, "size", Er(Math.round((n + r) * 100) / 100));
	}
	function Or(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && wr(e, t, "size", Er(r / 100));
	}
	function kr(e, t, n, r) {
		let i = ur[n.props.src];
		if (!i?.w || !i?.h || !B(lr)?.w || !B(lr)?.h) return;
		let a = B(lr).h * i.w / (B(lr).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "tile" || n.props.fit === "repeat") && wr(e, t, "fit", "plain"), wr(e, t, "size", Er(Math.round(o * 100) / 100));
	}
	function Ar(e) {
		return e.props;
	}
	function H(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function Nr(e, t, n, r) {
		H(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Pr = {
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
	function Fr(e, t, n) {
		H(e, t, e.keyPrefix, (e) => {
			e.kind = n, Pr[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function Ir(e, t, n, r) {
		H(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Lr(e, t) {
		H(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Rr(e, t, n) {
		H(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function zr(e, t, n, r) {
		H(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Br = /* @__PURE__ */ j(null);
	function Vr(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		M(Br, {
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
			M(Br, {
				...B(Br),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = B(Br);
			if (M(Br, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && zr(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Hr(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: te[n].version ?? 1,
				props: te[n].defaults()
			});
		});
	}
	async function Wr(e, t) {
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
	async function Gr(e) {
		let t = await e.text(), n = Pa(t), r = Ia(t);
		if (!r) return n;
		let i = await Wr(n.dataUrl, r);
		if (!i) return n;
		let a = Fa(t, i);
		if (a === t) return n;
		try {
			return Pa(a);
		} catch {
			return n;
		}
	}
	async function Kr(e) {
		if (e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "")) return Gr(e);
		let t = await ja(e);
		return t.animated && t.bytes > 1e6 && E(Z("status.animatedLarge", { mb: (t.bytes / 1e6).toFixed(1) }), "error"), t;
	}
	function Jr(e) {
		return e?.code === "animatedTooLarge" ? Z("status.animatedTooLarge", {
			mb: (e.bytes / 1e6).toFixed(1),
			max: Math.round(Ca / 1e6)
		}) : Z("status.imageReadError");
	}
	function Yr(e, t, n) {
		if (!["video/mp4", "video/webm"].includes(e.type)) {
			E(Z(t), "error");
			return;
		}
		if (e.size > 15e6) {
			E(Z("status.videoTooLarge", {
				mb: (e.size / 1e6).toFixed(1),
				max: Math.round(Sa / 1e6)
			}), "error");
			return;
		}
		let r = new FileReader();
		r.onload = () => {
			n(String(r.result ?? "")), e.size > 4e6 && E(Z("status.videoLarge", { mb: (e.size / 1e6).toFixed(1) }), "error");
		}, r.onerror = () => E(Z("status.imageReadError"), "error"), r.readAsDataURL(e);
	}
	function Xr(e) {
		let t = e.target.files?.[0];
		e.target.value = "", t && Yr(t, "status.videoFileFormat", (e) => R("src", e));
	}
	async function Zr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			R("poster", (await Kr(t)).dataUrl);
		} catch (e) {
			E(Jr(e), "error");
		}
	}
	async function Qr(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			wr(e, t, "src", (await Kr(r)).dataUrl);
		} catch (e) {
			E(Jr(e), "error");
		}
	}
	function $r(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && Yr(r, "status.videoFormat", (n) => wr(e, t, "src", n));
	}
	async function ei(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			wr(e, t, "poster", (await Kr(r)).dataUrl);
		} catch (e) {
			E(Jr(e), "error");
		}
	}
	let ti = $t({}), ni = (e, t) => `${e.keyPrefix}-${e.keyId}-${t}`, ri = () => 1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] % 1e6;
	async function ii(e, t, n) {
		let r = ni(e, t);
		ti[r] = {
			text: Z("status.folderChecking"),
			err: !1
		};
		let i = await nf(n.props.folder, n.props.order, { force: !0 });
		ti[r] = i.photos.length ? {
			text: Gi("status.folderFound", i.photos.length, { count: i.photos.length }),
			err: !1
		} : {
			text: Ki(i) ?? Z("status.folderNone"),
			err: !0
		};
	}
	async function ai(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		E(Z("status.compressingImages"));
		let { images: i, failed: a, big: o } = await U_(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), W_(i.length, a, o);
	}
	function oi(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function si(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function li(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function ui(e, t) {
		Ja(e, () => {
			B(k).nav.style ??= {}, t(B(k).nav.style);
		});
	}
	let di = /* @__PURE__ */ A(() => ({
		mutate: gr,
		keyPrefix: "bg",
		keyId: B(er)
	})), fi = {
		mutate: ui,
		keyPrefix: "navbg",
		keyId: "nav"
	}, pi = {
		mutate: yu,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, mi = () => {
		let e = null;
		try {
			e = localStorage.getItem("urd-theme-mode");
		} catch {}
		return tu(B(k)?.theme?.scheme, e, window.matchMedia("(prefers-color-scheme: dark)").matches);
	}, hi = /* @__PURE__ */ j("light");
	yn(() => {
		M(hi, mi(), !0);
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = (e) => {
			e instanceof StorageEvent && e.key && e.key !== "urd-theme-mode" || M(hi, mi(), !0);
		};
		return e.addEventListener("change", t), window.addEventListener("storage", t), () => {
			e.removeEventListener("change", t), window.removeEventListener("storage", t);
		};
	});
	let _i = /* @__PURE__ */ A(() => B(k)?.theme ? nu(B(k).theme, B(hi)).color ?? {} : {}), vi = () => Object.entries(B(_i)), yi = [
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
	], bi = /* @__PURE__ */ A(() => !!B(k)?.theme.alt), Si = /* @__PURE__ */ A(() => B(k)?.theme.alt?.auto === !0), Ci = /* @__PURE__ */ A(() => B(k)?.theme.scheme === "dark" ? "dark" : "light"), wi = /* @__PURE__ */ A(() => B(k)?.theme.tokens.color ?? {}), Ei = /* @__PURE__ */ A(() => ({
		...B(k)?.theme.tokens.color ?? {},
		...B(k)?.theme.alt?.tokens?.color ?? {}
	}));
	function Di(e) {
		return {
			type: e,
			version: jf[e].version,
			props: jf[e].defaults()
		};
	}
	let Oi = (e) => !!(e && jf[e.type]?.entrance), Ai = [["", Z("common.none")], ...Object.entries(jf).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])], ji = Ai.filter(([e]) => !jf[e]?.group), Mi = [["", Z("common.none")], ...Object.entries(jf).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])];
	function Ni(e) {
		e.animation && !Oi(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Pi(e) {
		ln(`edit:anim-${B(N).blockId}`, (t) => {
			Ni(t), t.animation = e ? Di(e) : null;
		}), B(N) && tt?.sendDemoAnim(B(N).sectionId, B(N).blockId);
	}
	function Fi(e) {
		ln(`edit:hover-${B(N).blockId}`, (t) => {
			Ni(t), t.hover = e ? Di(e) : null;
		});
	}
	function Ii(e, t) {
		Number.isFinite(t) && (ln(`edit:anim-${B(N).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), B(N) && tt?.sendDemoAnim(B(N).sectionId, B(N).blockId));
	}
	function Li(e) {
		gr("section-anim", (t) => {
			Ni(t), t.animation = e ? Di(e) : null;
		}), tt?.sendDemoAnim(B(er));
	}
	function Ri(e, t, n) {
		gr(`section-divider-${e}-${t}`, (r) => {
			let i = { ...r.divider ?? {} };
			if (t === "shape" && !n) delete i[e];
			else {
				let r = { ...i[e] ?? { shape: "wave" } };
				n === void 0 || n === !1 || n === "" ? delete r[t] : r[t] = n, i[e] = r;
			}
			Object.keys(i).length ? r.divider = i : delete r.divider;
		});
	}
	function zi(e) {
		gr("section-hover", (t) => {
			Ni(t), t.hover = e ? Di(e) : null;
		});
	}
	function Bi(e, t) {
		Number.isFinite(t) && (gr("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), tt?.sendDemoAnim(B(er)));
	}
	function Vi(e, t) {
		gr("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), tt?.sendDemoAnim(B(er));
	}
	function Hi(e) {
		let t = O.data.sections.find((e) => e.id === B(er));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		pt("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, M(nr, r, !0), O.save(), ct(), tt?.sendSection(B(T), t);
	}
	function Ui() {
		return O.data.sections.find((e) => e.id === B(er)) ?? O.data.sections[0];
	}
	function Wi(e) {
		let t = O.data.sections.find((e) => e.id === B(er));
		t && (pt("grid:section"), t.grid = e ? { ...et.data.grid } : null, M(tr, t.grid ? { ...t.grid } : null, !0), O.save(), ct(), tt?.sendSection(B(T), t), B(Ga) && tt?.sendShowGrid(!0));
	}
	function Ji(e, t) {
		let n = O.data.sections.find((e) => e.id === B(er));
		n?.grid && (pt("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, M(tr, { ...n.grid }, !0), O.save(), ct(), tt?.sendSection(B(T), n), B(Ga) && tt?.sendShowGrid(!0));
	}
	function Yi(e, t) {
		pt("grid:site"), M(ge, {
			...B(ge),
			[e]: t
		}, !0), et.data.grid = {
			...et.data.grid,
			[e]: t
		}, et.save(), ct(), rt(), B(Ga) && tt?.sendShowGrid(!0);
	}
	async function Xi() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? M(he, await e.json(), !0) : e.status !== 503 && M(he, null);
		} catch {
			M(he, null);
		}
	}
	let Zi = null;
	async function Qi() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Zi = (await e.json()).head ?? null);
		} catch {}
	}
	async function ta(e) {
		if (!Zi) return await Qi(), {
			ok: await wt({
				title: Z("confirm.conflictUnknown.title"),
				lines: [Z("confirm.conflictUnknown.body"), Z("confirm.conflictUnknown.warning")],
				okLabel: Z("confirm.publishAnyway"),
				cancelLabel: Z("confirm.cancel")
			}),
			head: Zi
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Zi}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Zi) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Z("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await wt({
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
	let na = /* @__PURE__ */ j(null), ra = /* @__PURE__ */ j(""), ia = /* @__PURE__ */ j(!1);
	async function aa() {
		M(ra, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? M(na, (await e.json()).commits, !0) : e.status === 401 ? (M(na, [], !0), M(ra, Z("status.historyLoginRequired"), !0)) : (M(na, [], !0), M(ra, Ki(await e.json().catch(() => null)) ?? Z("status.historyFetchFailed"), !0));
		} catch {
			M(na, [], !0), M(ra, Z("status.historyUnavailable"), !0);
		}
	}
	let oa = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(qi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), sa = !1;
	async function ca() {
		let e = B(na)?.[0];
		if (e && !B(ia) && await wt({
			title: Z("confirm.revert.title"),
			lines: [`«${e.message}»`, Z("confirm.revert.body")],
			okLabel: Z("confirm.revert.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			M(ia, !0), E(Z("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Zi = e : Qi(), sa = !0, E(Z("status.revertDone"), "ok"), la();
				} else t.status === 409 ? E(Z("status.revertConflict"), "error") : E(Ki(await t.json().catch(() => null)) ?? Z("status.revertFailed"), "error");
			} catch {
				E(Z("status.publishLayerUnreachable"), "error");
			}
			M(ia, !1), aa();
		}
	}
	async function la() {
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
				E(Z("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		E(Z("status.revertDeployTimeout"), "error");
	}
	let ua = 0;
	async function da(e) {
		let t = ++ua, n = de, r = await No(Mo(e));
		t === ua && n === de && (r ? E(Z("status.publishLive"), "ok") : E(Z("status.publishDeployTimeout"), "error"));
	}
	let fa = /* @__PURE__ */ j(null), pa = /* @__PURE__ */ j(null), ma = /* @__PURE__ */ j(!1), ha = /* @__PURE__ */ j($t(/* @__PURE__ */ new Set()));
	async function ga() {
		M(ma, !0), M(pa, null), M(fa, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (M(fa, t, !0), M(ha, /* @__PURE__ */ new Set(), !0)) : M(pa, Ki(t) ?? Z("update.checkFailed"), !0);
		} catch {
			M(pa, Z("status.publishLayerUnreachable"), !0);
		}
		M(ma, !1);
	}
	function _a(e) {
		let t = new Set(B(ha));
		t.has(e) ? t.delete(e) : t.add(e), M(ha, t, !0);
	}
	async function ya() {
		if (!B(fa) || B(fa).upToDate || B(ma)) return;
		let e = [...B(ha)], t = B(fa).changes.filter((e) => !B(ha).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await wt({
			title: Z("confirm.update.title"),
			lines: [Z("confirm.update.body", {
				target: B(fa).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Z("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Z("confirm.update.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			M(ma, !0), E(Z("update.running", { target: B(fa).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: B(fa).target,
						expect: B(fa).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (E(Z("update.committed", { target: B(fa).target }), "ok"), await ba(B(fa).target.replace(/^v/, ""))) : t.status === 409 ? (E(Ki(n) ?? Z("update.checkFailed"), "error"), await ga()) : E(Ki(n) ?? Z("update.failed"), "error");
			} catch {
				E(Z("status.publishLayerUnreachable"), "error");
			}
			M(ma, !1);
		}
	}
	async function ba(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					E(Z("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		E(Z("update.deployTimeout"), "error");
	}
	let xa = null;
	function wa(e) {
		return {
			schemaVersion: 4,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Ws("sec"),
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
	async function Ta(e, { keepHistory: t = !1 } = {}) {
		M(T, e, !0), xa = (async () => {
			let n = st(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Rs(await e.json(), et.data));
			} catch {}
			r ? it.delete(e) : r = wa(n), O = ea(`urd-draft-${e}`, () => r, fe), (O.data.schemaVersion ?? 1) > 4 && (console.warn(`Urd: the draft for '${e}' has schemaVersion ${O.data.schemaVersion} (the engine has 4) and is discarded`), O.replace(structuredClone(r))), O.replace(Rs(O.data, et.data)), O.save(), t || (dt = null), M(er, null), M(tr, null), ct(), lo(), qe(), M(le, "");
		})(), await xa;
	}
	function Ea() {
		tt?.destroy(), B(me)?.contentDocument?.addEventListener("pointerdown", () => {
			B(rn) && M(rn, null);
		}, !0), tt = ko(B(me), {
			onEdit: Sf,
			onMove: Cf,
			onGrow: wf,
			onDelete: O_,
			onAddSection: C_,
			onMoveSection: w_,
			onDeleteSection: T_,
			onSectionSize: E_,
			onUndo: (e) => e.redo ? yt() : vt(),
			onSelectSection: hr,
			onSelectBlock: nn,
			onBlockMenu: cn,
			onReady: Da,
			onNavigate: qa,
			onAddBlock: (e) => M_(e.sectionId, e.block),
			onAddBlocks: (e) => N_(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: V_,
			onMoveBlockSection: D_,
			onMobileReset: Tf,
			onMobileOrder: Of,
			onReviewDone: kf,
			onBlockFlag: Af,
			onCollectionEdit: vl,
			onCollectionAdd: hl,
			onSaveTemplate: tl,
			onStickyGroup: rl,
			onStickyDock: nl,
			onDeleteTemplate: sl,
			onApplyLayout: Ze,
			onPluginBlocks: (e) => {
				M(F_, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => Ja("edit:nav-width", () => {
				B(k).nav.style ??= {}, B(k).nav.style.width = e.width;
			})
		});
	}
	async function Da() {
		await xa, await Ll, tt?.sendPlugins(Ge(B(Rl))?.enabled ?? []), tt?.sendViewport(B(Ae)), tt?.sendZoom(B(ze)), pl(), el(), et.hasDraft() && rt();
		let e = !B(se).pages.some((e) => e.id === B(T));
		(O.hasDraft() || e) && tt?.sendPage(B(T), O.data), B(_e) || tt?.sendChrome(!1), B(Ga) && tt?.sendShowGrid(!0), B(Oa) && tt?.sendShowGuides(!0), ae();
	}
	let Oa = /* @__PURE__ */ j(localStorage.getItem("urd-guides") === "1"), ka = /* @__PURE__ */ j(!1), Aa = /* @__PURE__ */ j($t(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function Ma(e) {
		M(Aa, e === "menu" ? "menu" : "strip", !0), B(Aa) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let Na = /* @__PURE__ */ j(null);
	yn(() => {
		if (!B(ka)) return;
		let e = (e) => {
			B(Na)?.contains(e.target) || M(ka, !1);
		}, t = (e) => {
			e.key === "Escape" && M(ka, !1);
		}, n = () => {
			M(ka, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Ba = {
		view: 1079,
		device: 999,
		zoom: 919
	}, Va = /* @__PURE__ */ j(null), Ha = /* @__PURE__ */ j(null), Ua = $t({
		view: !1,
		device: !1,
		zoom: !1
	});
	yn(() => {
		let e = Object.entries(Ba).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				Ua[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), yn(() => {
		B(Va) && !Ua[B(Va)] && M(Va, null);
	}), yn(() => {
		if (!B(Va)) return;
		let e = (e) => {
			B(Ha)?.contains(e.target) || M(Va, null);
		}, t = (e) => {
			e.key === "Escape" && M(Va, null);
		}, n = () => {
			M(Va, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Wa() {
		M(Oa, !B(Oa)), localStorage.setItem("urd-guides", B(Oa) ? "1" : "0"), tt?.sendShowGuides(B(Oa));
	}
	let Ga = /* @__PURE__ */ j(localStorage.getItem("urd-grid-overlay") === "1");
	function Ka() {
		M(Ga, !B(Ga)), localStorage.setItem("urd-grid-overlay", B(Ga) ? "1" : "0"), tt?.sendShowGrid(B(Ga));
	}
	function qa(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = B(k).pages.find((e) => e.path === t);
		n && n.id !== B(T) && Ta(n.id);
	}
	function Ja(e, t) {
		pt(e), t(), et.save(), ct(), rt();
	}
	let Ya = /* @__PURE__ */ j(""), Xa = /* @__PURE__ */ j(null), Za = Object.fromEntries(Xl.map((e) => [e.id, Jl(Zl(e.id, {
		pageId: "preview",
		title: ""
	}))])), to = /* @__PURE__ */ A(() => {
		let e = B(k)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && iu(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), no = /* @__PURE__ */ j(null);
	yn(() => {
		if (!B(no)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || M(no, null);
		}, t = (e) => {
			e.key === "Escape" && M(no, null);
		}, n = () => {
			M(no, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let ro = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function io(e, t = null) {
		return e ? ro.includes(e) ? Z("error.reservedName", { slug: e }) : B(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Z("error.pageExists") : null : Z("error.pageNeedsName");
	}
	function ao() {
		let e = B(Ya).trim(), t = Ra(e), n = io(t);
		if (n) return E(n, "error"), !1;
		let r = B(Xa) && !B(Xa).startsWith("preset:") ? Yc[B(Xa)]?.data?.page : null, i = B(Xa)?.startsWith("preset:") ? Zl(B(Xa).slice(7), {
			pageId: t,
			title: e
		}) ?? wa({
			id: t,
			title: e
		}) : r ? bc(Rs(JSON.parse(JSON.stringify(r)), et.data), Ws, {
			id: t,
			title: e
		}) : wa({
			id: t,
			title: e
		});
		Ja("pages", () => {
			B(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), B(k).nav.items.push({
				label: e,
				page: t
			});
		}), pe(`urd-draft-${t}`, JSON.stringify(i)), ct(), M(Ya, ""), M(Xa, null), Ta(t);
	}
	async function oo(e) {
		M(no, null), await il("page", e.id === B(T) ? JSON.parse(JSON.stringify(O.data)) : await _o(e));
	}
	function so(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		Ja("pages", () => {
			e.title = n;
			for (let t of B(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === B(T) ? (O.data.meta.title = n, O.save(), ct(), tt?.sendPage(B(T), O.data)) : vo(e, (e) => {
			e.meta.title = n;
		});
	}
	let co = /* @__PURE__ */ j($t({
		description: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: ""
	}));
	function lo() {
		let e = O?.data?.meta ?? {};
		M(co, {
			description: e.description ?? "",
			ogTitle: e.og?.title ?? "",
			ogDescription: e.og?.description ?? "",
			ogImage: e.og?.image ?? ""
		}, !0);
	}
	function uo(e, t) {
		let n = String(t ?? "").trim();
		if (e === "description") n ? O.data.meta.description = n : delete O.data.meta.description;
		else {
			let t = {
				ogTitle: "title",
				ogDescription: "description",
				ogImage: "image"
			}[e], r = { ...O.data.meta.og ?? {} };
			n ? r[t] = n : delete r[t], Object.keys(r).length ? O.data.meta.og = r : delete O.data.meta.og;
		}
		O.save(), ct(), lo();
		let r = B(k).pages.find((e) => e.id === B(T));
		B(po)[B(T)] = !r?.noindex && !O.data.meta.description;
	}
	function fo(e) {
		let t = B(k).pages.find((e) => e.id === B(T));
		t && (Ja("edit:page-noindex", () => {
			e ? t.noindex = !0 : delete t.noindex;
		}), B(po)[B(T)] = !e && !O?.data?.meta?.description);
	}
	let po = /* @__PURE__ */ j($t({}));
	async function ho() {
		let e = {};
		for (let t of B(k).pages) {
			if (t.noindex) continue;
			if (t.id === B(T)) {
				e[t.id] = !O?.data?.meta?.description;
				continue;
			}
			let n = await _o(t);
			e[t.id] = !n?.meta?.description;
		}
		M(po, e, !0);
	}
	yn(() => {
		B(Rt) === "pages" && B(T) && ho();
	});
	async function go(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			uo("ogImage", (await Kr(t)).dataUrl);
		} catch (e) {
			E(Jr(e), "error");
		}
	}
	async function _o(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Rs(await t.json(), et.data);
		} catch {}
		return wa(e);
	}
	async function vo(e, t) {
		let n = await _o(e);
		t(n), pe(`urd-draft-${e.id}`, JSON.stringify(n)), ct();
	}
	function yo(e, t) {
		let n = Ra(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = io(n, e.id);
		if (r) {
			E(r, "error");
			return;
		}
		Ja("pages", () => {
			e.path = `/${n}`;
		});
	}
	function bo(e) {
		e.path !== "/" && (Ja("pages", () => {
			B(k).pages = B(k).pages.filter((t) => t.id !== e.id), B(k).nav.items = B(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of B(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			B(k).nav.items = B(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === B(T) && Ta(B(k).pages[0].id), E(Z("status.pageRemoved")));
	}
	function xo(e) {
		Ja("edit:nav-logo", () => {
			B(k).nav.logo = {
				type: "text",
				value: "",
				...B(k).nav.logo,
				...e
			};
		});
	}
	function So(e) {
		Ja("nav", () => {
			B(k).nav.logo ??= {
				type: "text",
				value: B(k).site.title
			};
			let t = B(k).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = B(k).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = B(k).site.title), delete t.image), t.type = e;
		});
	}
	async function Co(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Kr(t);
			Ja("nav", () => {
				let t = B(k).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			E(Z("status.imageReadErrorSvg"), "error");
		}
	}
	let wo = /* @__PURE__ */ j(null);
	async function To(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Gr(t);
				M(wo, e.dataUrl, !0);
			} catch {
				E(Z("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			M(wo, String(n.result), !0);
		}, n.onerror = () => E(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Eo(e) {
		Ja("edit:site-icon", () => {
			B(k).site.icon = e;
		}), M(wo, null);
	}
	function Do() {
		Ja("edit:site-icon", () => {
			delete B(k).site.icon;
		});
	}
	function Ao(e) {
		Ja("edit:site-title", () => {
			B(k).site.title = e;
		});
	}
	function Io(e) {
		Ja("edit:site-desc", () => {
			B(k).site.description = e;
		});
	}
	function Lo(e) {
		let t = String(e ?? "").trim();
		Ja("edit:site-analytics", () => {
			t ? B(k).analytics = { token: t } : delete B(k).analytics;
		});
	}
	let ss = /* @__PURE__ */ A(() => B(k)?.layout?.contentWidth ?? 1440), ls = /* @__PURE__ */ A(() => B(k)?.layout?.gutter ?? 6), us = /* @__PURE__ */ A(() => Yo(B(ss))), hs = /* @__PURE__ */ A(() => Ho.find((e) => e.gutter === B(ls))?.id ?? null), gs = /* @__PURE__ */ j(!1), _s = /* @__PURE__ */ A(() => B(ss) === "full" ? Vo : Go(B(ss))), vs = /* @__PURE__ */ A(() => Wo.map((e) => ({
		screen: e,
		...Jo(B(ss), B(ls), e)
	})));
	function ys(e, t) {
		Ja(t, () => {
			let t = {
				...B(k).layout ?? {},
				contentWidth: B(ss),
				gutter: B(ls),
				...e
			};
			for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
			B(k).layout = t;
		});
	}
	let bs = (e) => ys({ contentWidth: e === "full" ? "full" : Go(e) }, "edit:site-width"), xs = (e) => ys({ gutter: Ko(e) }, "edit:site-gutter");
	function Ss() {
		let e = B(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function ws() {
		let e = Ss(), t = Wt([...Ut, ...qt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function Ds(e) {
		Ja("site", () => {
			B(k).site.lang = e;
		});
	}
	let Os = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	yn(() => {
		if (!B(k)?.site) return;
		let e = B(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Os.test(e) && (t.href = e);
		}
	});
	function ks(e) {
		Ja("nav", () => {
			B(k).nav.layout = e;
		});
	}
	let As = (e) => e !== "theme" || !!B(k).theme?.alt?.tokens, js = /* @__PURE__ */ A(() => Ju(B(k)?.nav?.style ?? {}).filter(As));
	function Ms(e, t) {
		let n = Ju(B(k).nav.style ?? {}), r = n.indexOf(e), i = r + t;
		for (; i >= 0 && i < n.length && !As(n[i]);) i += t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], Ns("order", n));
	}
	function Ns(e, t) {
		Ja(`edit:nav-tools-${e}`, () => {
			B(k).nav.style ??= {};
			let n = { ...B(k).nav.style.tools ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.style.tools = n : delete B(k).nav.style.tools;
		});
	}
	function Ps(e, t) {
		Ja(`edit:nav-style-${e}`, () => {
			B(k).nav.style ??= {}, t === void 0 ? delete B(k).nav.style[e] : B(k).nav.style[e] = t;
		});
	}
	let Fs = /* @__PURE__ */ A(() => B(k)?.nav?.variant === "side-left" || B(k)?.nav?.variant === "side-right"), Is = /* @__PURE__ */ A(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(B(k)?.nav?.variant)), zs = /* @__PURE__ */ A(() => ms(B(k)?.nav?.style)), Bs = /* @__PURE__ */ A(() => fs(B(k)?.nav?.style, B(k)?.nav?.variant)), Hs = /* @__PURE__ */ A(() => ps(B(k)?.nav?.style));
	function Gs(e) {
		Ja("nav", () => {
			B(k).nav.style ??= {}, e === "md" ? delete B(k).nav.style.size : B(k).nav.style.size = e, delete B(k).nav.style.padY, delete B(k).nav.style.textSize;
		});
	}
	function $(e, t, n) {
		let r = e.target.value;
		Ps(t, r === "" ? void 0 : ds(r, n, void 0)), e.target.value = B(k).nav.style?.[t] ?? "";
	}
	function Ks(e, t) {
		Ja(`edit:nav-mobile-${e}`, () => {
			B(k).nav.style ??= {};
			let n = { ...B(k).nav.style.mobile ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.style.mobile = n : delete B(k).nav.style.mobile;
		});
	}
	let qs = (e) => {
		let t = B(k)?.nav?.style?.mobile?.[e];
		return t === void 0 ? "" : t ? "on" : "off";
	}, Js = (e, t) => Ks(e, t === "" ? void 0 : t === "on"), Ys = (e) => Ks("border", e ? {
		...B(k).nav.style?.mobile?.border ?? {},
		side: e
	} : void 0);
	function Xs(e, t) {
		Ja(`edit:nav-announce-${e}`, () => {
			let n = { ...B(k).nav.announcement ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.announcement = n : delete B(k).nav.announcement;
		});
	}
	let Zs = "<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"currentColor\" aria-hidden=\"true\">" + [
		6,
		12,
		18
	].flatMap((e) => [
		6,
		12,
		18
	].map((t) => `<circle cx="${t}" cy="${e}" r="1.6"/>`)).join("") + "</svg>", Qs = /* @__PURE__ */ j(null);
	function $s() {
		let e = B(k).nav?.launcher;
		return [e?.image, ...(e?.links ?? []).map((e) => e.image)].filter(Boolean);
	}
	function ec(e, t) {
		Ja("nav", () => {
			B(k).nav.launcher ??= { links: [] };
			let n = e === null ? B(k).nav.launcher : B(k).nav.launcher.links[e];
			t.image ? n.image = t.image : delete n.image, t.icon ? n.icon = t.icon : delete n.icon;
		});
	}
	function tc(e, t) {
		Ja(`edit:nav-launcher-${e}`, () => {
			B(k).nav.launcher ??= { links: [] }, t === void 0 ? delete B(k).nav.launcher[e] : B(k).nav.launcher[e] = t;
		});
	}
	function nc() {
		Ja("nav", () => {
			B(k).nav.launcher ??= { links: [] }, B(k).nav.launcher.links ??= [], B(k).nav.launcher.links.push({
				label: Z("seed.link"),
				href: "",
				icon: "globe"
			});
		});
	}
	function rc(e) {
		Ja("nav", () => {
			B(k).nav.launcher.links.splice(e, 1);
		});
	}
	function ic(e, t) {
		Ja("nav", () => {
			let n = B(k).nav.launcher.links, r = e + t;
			r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]]);
		});
	}
	function ac(e, t, n) {
		Ja(`edit:nav-launcher-${t}-${e}`, () => {
			B(k).nav.launcher.links[e][t] = n;
		});
	}
	async function oc(e, t) {
		if (e) try {
			let n = await Kr(e);
			Ja("nav", () => {
				B(k).nav.launcher ??= { links: [] }, t === null ? B(k).nav.launcher.image = n.dataUrl : B(k).nav.launcher.links[t].image = n.dataUrl;
			});
		} catch {
			E(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function sc(e, t) {
		Ja(`edit:nav-sheet-${e}`, () => {
			B(k).nav.style ??= {};
			let n = { ...B(k).nav.style.sheet ?? {} };
			t === void 0 ? delete n[e] : n[e] = t, Object.keys(n).length ? B(k).nav.style.sheet = n : delete B(k).nav.style.sheet;
		});
	}
	function cc(e, t, n) {
		let r = e.target.value;
		Ps(t, r === "" ? void 0 : ds(r, n, void 0)), e.target.value = B(t === "padY" ? Bs : Hs);
	}
	function lc(e, t, n) {
		let r = e.target.value;
		Ks(t, r === "" ? void 0 : ds(r, n, void 0)), e.target.value = B(k).nav.style?.mobile?.[t] ?? "";
	}
	function uc(e) {
		let t = ds(e / 100, ts, .5);
		Ps("shrinkTo", t === .5 ? void 0 : t);
	}
	function dc(e) {
		let t = ds(e, ns, 80);
		Ps("shrinkAt", t === 80 ? void 0 : t);
	}
	function fc(e) {
		let t = ds(e, rs, 220);
		Ps("shrinkMs", t === 220 ? void 0 : t);
	}
	let pc = {
		underline: [Z("hoverColor.underline.label"), Z("hoverColor.underline.title")],
		pill: [Z("hoverColor.pill.label"), Z("hoverColor.pill.title")],
		lift: [Z("hoverColor.lift.label"), Z("hoverColor.lift.title")]
	}, mc = /* @__PURE__ */ A(() => pc[B(k)?.nav?.style?.hover] ?? null), hc = (e) => e.color || (e.variant === "plain" ? "text" : "accent-text"), gc = [
		"plain",
		"cards",
		"band"
	], _c = ["cards", "list"], xc = (e) => (e.version ?? 1) < sf.version ? sf.migrations[1](e.props ?? {}) : e.props ?? {}, Sc = /* @__PURE__ */ A(() => [
		["grid", Z("opt.launcherView.grid")],
		["list", Z("opt.launcherView.list")],
		["cover", Z("opt.launcherView.cover")]
	]), Cc = /* @__PURE__ */ A(() => B(Fs) ? [
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
	function Tc(e) {
		(B(k).nav.variant ?? "bar") !== e && Ja("nav", () => {
			e === "bar" ? delete B(k).nav.variant : B(k).nav.variant = e, B(k).nav.style && delete B(k).nav.style.radius;
		});
	}
	function Ec(e) {
		Ja("nav", () => {
			B(k).nav.style ??= {}, e ? B(k).nav.style.glow = !0 : delete B(k).nav.style.glow;
		});
	}
	function Oc(e) {
		Ja("nav", () => {
			B(k).nav.style ??= {}, e ? delete B(k).nav.style.topGap : B(k).nav.style.topGap = !1;
		});
	}
	function Nc(e) {
		Ja("nav", () => {
			B(k).nav.style ??= {}, e === "standard" ? delete B(k).nav.style.hover : B(k).nav.style.hover = e;
		});
	}
	let Rc = null, zc = {}, Bc = {}, Vc = !1, Hc = /* @__PURE__ */ j($t([])), Uc = /* @__PURE__ */ j($t({})), Wc = /* @__PURE__ */ j(null), Gc = /* @__PURE__ */ j(""), Kc = /* @__PURE__ */ j("news"), qc = [
		["news", Z("collectionKind.news")],
		["notices", Z("collectionKind.notices")],
		["publications", Z("collectionKind.publications")],
		["products", Z("collectionKind.products")],
		["custom", Z("collectionKind.custom")]
	], Jc = null, Yc = {}, Xc = {}, Zc = !1, Qc = /* @__PURE__ */ j($t([]));
	async function $c() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Jc = ea("urd-draft-templates", () => e, fe, "urd-draft-maler"), M(Qc, [...Jc.data.maler ?? []], !0);
		for (let e of B(Qc)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Xc[e] = t, Yc[e] = ea(`urd-draft-template-${e}`, () => t, fe, `urd-draft-mal-${e}`), (Yc[e].data?.schemaVersion ?? 1) > 1 && Yc[e].reset();
		}
		Zc = !0, el();
	}
	function el() {
		let e = B(Qc).map((e) => Yc[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(Yc[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		tt?.sendTemplates(e);
	}
	function tl(e) {
		let t = vc.includes(e.kind) ? e.kind : "section";
		return il(t, e[t]);
	}
	function nl(e) {
		let { section: t, block: n } = Qt(e.sectionId, e.blockId);
		t && n?.sticky && on.some(([t]) => t === e.dock) && (pt(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, O.save(), ct(), tt?.sendSection(B(T), t), tn());
	}
	function rl(e) {
		let t = e.blockIds ?? [], { section: n } = Qt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		pt(`sticky-group:${e.sectionId}`);
		let r = e.on ? Ws("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		$e(n, "block-edited"), O.save(), ct(), tt?.sendSection(B(T), n), tn(), E(Z(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function il(e, t) {
		if (!t || !Jc) return;
		let n = (await Tt({
			title: Z("canvas.templateNamePrompt"),
			placeholder: Z("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = yc(n);
		if (!r) {
			E(Z("status.invalidName"), "error");
			return;
		}
		if (B(Qc).includes(r)) {
			E(Z("status.templateExists"), "error");
			return;
		}
		pt("templates");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		Yc[r] = ea(`urd-draft-template-${r}`, () => null, fe, `urd-draft-mal-${r}`), Yc[r].replace(i), Yc[r].save(), Jc.data.maler = [...B(Qc), r], Jc.save(), M(Qc, [...B(Qc), r], !0), E(Z("status.templateSaved", { name: n }), "ok"), ct(), el();
	}
	async function sl(e) {
		let t = Yc[e.id]?.data?.mal;
		t && await wt({ title: Z("confirm.deleteTemplate", { name: t.name }) }) && (pt("templates"), B(Xa) === e.id && M(Xa, null), localStorage.removeItem(`urd-draft-template-${e.id}`), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete Yc[e.id], Jc.data.maler = B(Qc).filter((t) => t !== e.id), Jc.save(), M(Qc, B(Qc).filter((t) => t !== e.id), !0), ct(), el());
	}
	async function cl() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/collections.json")).json();
		} catch {}
		Rc = ea("urd-draft-collections", () => e, fe, "urd-draft-samlinger"), M(Hc, [...Rc.data.samlinger ?? []], !0);
		for (let e of B(Hc)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Bc[e] = t, zc[e] = ea(`urd-draft-collection-${e}`, () => t, fe, `urd-draft-samling-${e}`), !t && !zc[e].data && (zc[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), zc[e].save());
		}
		Vc = !0, fl();
	}
	function fl(e = !0) {
		let t = {};
		for (let e of B(Hc)) zc[e] && (t[e] = JSON.parse(JSON.stringify(zc[e].data)));
		M(Uc, t, !0), e && pl();
	}
	function pl() {
		tt?.sendCollections(Ge(B(Uc)) ?? {});
	}
	function ml(e, t, n, r = !0) {
		let i = zc[e];
		i && (pt(t), n(i.data), i.save(), ct(), fl(r));
	}
	function hl(e) {
		zc[e.collection] && Cl(e.collection);
	}
	function _l(e) {
		return (new DOMParser().parseFromString(String(e ?? ""), "text/html").body.textContent ?? "").trim();
	}
	function vl(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r !== "title" || _l(i)) && ml(t, `edit:collection:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image");
	}
	function yl(e, t, n) {
		let r = {
			schemaVersion: 1,
			id: e,
			name: t,
			kind: n,
			entries: []
		};
		zc[e] = ea(`urd-draft-collection-${e}`, () => null, fe, `urd-draft-samling-${e}`), zc[e].replace(r), zc[e].save(), Rc.data.samlinger = [...B(Hc), e], Rc.save(), M(Hc, [...B(Hc), e], !0), M(Wc, e, !0), ct(), fl();
	}
	function bl() {
		let e = B(Gc).trim();
		if (!e) return;
		let t = Ra(e);
		if (!t || B(Hc).includes(t)) {
			E(Z(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		pt("collections"), yl(t, e, B(Kc)), M(Gc, "");
	}
	function xl() {
		let e = Z("seed.productCatalogName"), t = Ra(e) || "collection", n = t;
		for (let e = 2; B(Hc).includes(n); e += 1) n = `${t}-${e}`;
		pt("collections"), yl(n, e, "products"), ln(null, (e) => {
			e.props.collection = n;
		});
	}
	function Sl(e) {
		pt("collections"), localStorage.removeItem(`urd-draft-collection-${e}`), localStorage.removeItem(`urd-draft-samling-${e}`), delete zc[e], Rc.data.samlinger = B(Hc).filter((t) => t !== e), Rc.save(), M(Hc, B(Hc).filter((t) => t !== e), !0), B(Wc) === e && M(Wc, null), ct(), fl();
	}
	function Cl(e) {
		ml(e, `collection:${e}:add-entry`, (e) => {
			e.kind === "products" ? e.entries.push({
				id: Ws("entry"),
				title: Z("seed.newProduct"),
				text: ""
			}) : e.entries.unshift({
				id: Ws("entry"),
				title: Z("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function wl(e, t, n, r) {
		ml(e, `edit:collection:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Tl(e, t, n) {
		ml(e, `collection:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function El(e, t) {
		ml(e, `collection:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Dl(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && wl(e, t, "image", (await Kr(r)).dataUrl);
	}
	function Ol(e, t, n) {
		let r = n.split(",").map((e) => e.trim()).filter(Boolean);
		wl(e, t, "sizes", r.length ? r : "");
	}
	function kl(e, t) {
		ml(e, `collection:${e}:${t}:colors`, (e) => {
			let n = e.entries.find((e) => e.id === t);
			n && (n.colors = [...n.colors ?? [], { name: Z("ph.colorName") }]);
		});
	}
	function Al(e, t, n, r, i) {
		ml(e, `edit:collection:${e}:${t}:color:${n}:${r}`, (e) => {
			let a = e.entries.find((e) => e.id === t)?.colors?.[n];
			a && (r === "image" && !i ? delete a.image : i && (a[r] = i));
		});
	}
	async function jl(e, t, n, r) {
		let i = r.target.files?.[0];
		r.target.value = "", i && Al(e, t, n, "image", (await Kr(i)).dataUrl);
	}
	function Ml(e, t, n) {
		ml(e, `collection:${e}:${t}:colors`, (e) => {
			let r = e.entries.find((e) => e.id === t);
			r?.colors && (r.colors = r.colors.filter((e, t) => t !== n), r.colors.length || delete r.colors);
		});
	}
	function Nl(e) {
		let t = zc[e]?.data;
		if (!t) return;
		let n = URL.createObjectURL(new Blob([wc(t.entries)], { type: "text/csv" })), r = document.createElement("a");
		r.href = n, r.download = `${e}.csv`, r.click(), URL.revokeObjectURL(n);
	}
	async function Pl(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", !n) return;
		let r = Dc(await n.text());
		if (!r) {
			E(Z("status.csvInvalid"), "error");
			return;
		}
		let i = /* @__PURE__ */ new Set();
		for (let e of r.entries) (!/^[a-z0-9][a-z0-9-]*$/.test(e.id) || i.has(e.id)) && (e.id = Ws("entry")), i.add(e.id);
		ml(e, `collection:${e}:import`, (e) => {
			e.entries = r.entries;
		}), E(Z("status.csvImported", { count: String(r.entries.length) }), "ok");
	}
	let Fl = null, Il, Ll = new Promise((e) => {
		Il = e;
	}), Rl = /* @__PURE__ */ j(null), zl = $t({}), Bl = /* @__PURE__ */ j("0.0.0"), Vl = /* @__PURE__ */ j(""), Hl = /* @__PURE__ */ j(""), Ul = /* @__PURE__ */ j($t([])), Wl = /* @__PURE__ */ j($t([])), Gl = /* @__PURE__ */ j("pending"), Kl = () => [.../* @__PURE__ */ new Set([...B(Rl)?.enabled ?? [], ...B(Rl)?.disabled ?? []])];
	function ql() {
		M(Rl, JSON.parse(JSON.stringify(Fl.data)), !0);
	}
	let Yl = /* @__PURE__ */ j(null);
	async function Ql() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				M(Yl, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			M(Yl, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src"),
				scriptSrc: t("script-src")
			}, !0);
		} catch {
			M(Yl, { unknown: !0 }, !0);
		}
	}
	function $l(e) {
		let t = [
			...(e.scriptSrc ?? []).map((e) => ["script-src", e]),
			...(e.connectSrc ?? []).map((e) => ["connect-src", e]),
			...(e.frameSrc ?? []).map((e) => ["frame-src", e])
		];
		if (!B(Yl) || B(Yl).unknown) return [];
		let n = {
			"script-src": B(Yl).scriptSrc,
			"connect-src": B(Yl).connectSrc,
			"frame-src": B(Yl).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function ru() {
		Ql();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		M(Wl, e.enabled ?? [], !0), Fl = ea("urd-draft-plugins", () => e, fe), ql();
		try {
			M(Bl, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Kl()) pu(e);
		ou(), Il(), tt?.sendPlugins(Ge(B(Rl))?.enabled ?? []);
	}
	async function ou() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				su();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), M(Ul, (t ?? []).filter((e) => !Kl().includes(e)), !0);
			for (let e of B(Ul)) pu(e);
			M(Gl, "ok");
		} catch {
			su();
		}
	}
	function su() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				M(Ul, e.filter((e) => !Kl().includes(e)), !0);
				for (let e of B(Ul)) pu(e);
				M(Gl, "ok");
				return;
			}
		} catch {}
		M(Gl, "unavailable");
	}
	async function pu(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Us(t);
			zl[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Vs(B(Bl), t.requiresEngine)
			};
		} catch {
			zl[e] = {
				name: e,
				errors: [Z("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function mu(e, t) {
		pt("plugins");
		let n = Fl.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Fl.save(), ct(), ql(), hu();
	}
	function hu() {
		B(me) && (B(me).src = B(me).src);
	}
	function gu(e) {
		pt("plugins");
		let t = Fl.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Fl.save(), ct(), ql(), hu();
	}
	async function _u() {
		M(Hl, "");
		let e = B(Vl).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			M(Hl, Z("plugin.invalidId"), !0);
			return;
		}
		if (Kl().includes(e)) {
			M(Hl, Z("plugin.alreadyListed"), !0);
			return;
		}
		if (await pu(e), zl[e].errors.length) {
			M(Hl, Z("plugin.invalidManifest", { errors: zl[e].errors.join("; ") }), !0);
			return;
		}
		mu(e, !0), M(Vl, "");
	}
	function vu(e) {
		M(Ul, B(Ul).filter((t) => t !== e), !0), mu(e, !0);
	}
	function yu(e, t) {
		Ja(e, () => {
			B(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(B(k).footer);
		});
	}
	function bu(e, t) {
		yu(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function xu(e) {
		yu("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Su(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Kr(t);
			yu("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			E(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function Cu() {
		yu("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Eu(e) {
		yu("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Au(e) {
		yu("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let ju = [
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
	function Nu(e) {
		let t = Z("seed.orgName"), n = B(k).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
					version: Tu.version ?? 1,
					props: {
						...Tu.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Du.version ?? 1,
					props: {
						...Du.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function Pu(e) {
		yu("footer-template", (t) => {
			let n = Nu(e);
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
	function Fu(e) {
		yu("footer", (t) => {
			t[e] ??= [], t[e].push(B(k).pages[0] ? {
				label: Z("seed.link"),
				page: B(k).pages[0].id
			} : {
				label: Z("seed.link"),
				href: "https://"
			});
		});
	}
	function Iu(e, t) {
		yu("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function Lu(e, t, n) {
		yu("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Vu(e, t, n) {
		yu(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Hu(e, t, n) {
		yu("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Uu(e, t, n) {
		yu(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function Wu(e) {
		yu("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function Gu(e) {
		yu("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Z("seed.join")
			} : delete t.cta;
		});
	}
	function qu(e, t) {
		yu(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Yu(e) {
		yu("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function Xu(e, t) {
		yu("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Zu() {
		yu("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Z("seed.column"),
				links: [{
					label: Z("seed.link"),
					page: B(k).pages[0].id
				}]
			});
		});
	}
	function Qu(e) {
		yu("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function $u(e, t) {
		yu("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function ed(e, t) {
		yu(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function td(e) {
		yu("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Z("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function nd(e, t) {
		yu("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function rd(e, t, n) {
		yu("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function id(e, t, n) {
		yu(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function ad(e, t, n) {
		yu("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function od(e, t, n) {
		yu(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function sd() {
		yu("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function cd(e) {
		yu("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function ld(e, t) {
		yu("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function ud(e, t) {
		yu("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function dd(e, t) {
		yu(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let fd = $a.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Z(Qa[e].labelKey)]));
	function pd(e, t) {
		Ja(`edit:nav-label-${e}`, () => {
			B(k).nav.items[e].label = t;
		});
	}
	function md(e, t) {
		Ja("nav", () => {
			let n = B(k).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function hd(e, t) {
		Ja(`edit:nav-href-${e}`, () => {
			B(k).nav.items[e].href = t;
		});
	}
	function gd(e, t) {
		let n = e + t, r = B(k).nav.items;
		n < 0 || n >= r.length || Ja("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function _d(e) {
		Ja("nav", () => {
			B(k).nav.items.splice(e, 1);
		});
	}
	let vd = /* @__PURE__ */ j(""), yd = /* @__PURE__ */ j(""), xd = /* @__PURE__ */ j(null);
	function Dd(e) {
		let [t, n] = e.split(".").map(Number), r = B(k).nav.items;
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
	function Od(e, t, n, r) {
		if (!B(yd) || B(yd) === t) return null;
		let i = e.getBoundingClientRect(), a = (r - i.top) / i.height, o = n - i.left, s = Dd(B(yd)), c = Dd(t), l = s.list[s.index], u;
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
		}, kd(u, l, s);
	}
	function kd(e, t, n) {
		let r = Dd(e.key);
		if (r.parent) {
			if (r.parent === t) return null;
			t.children?.length && (e = {
				key: e.key.split(".")[0],
				pos: "after"
			}, r = Dd(e.key));
		}
		let i = r.list[r.index];
		if (e.pos === "into") {
			let n = i.children ?? [];
			return n.length && n[n.length - 1] === t ? null : e;
		}
		let a = r.parent ? r.parent.children : B(k).nav.items, o = a.filter((e) => e !== t).indexOf(i) + +(e.pos === "after");
		return a === n.list && o === n.index ? null : e;
	}
	function Ad() {
		if (!B(yd)) return {
			label: "",
			target: ""
		};
		let e = Dd(B(yd)), t = e.list[e.index], n = t.page ? B(k).pages.find((e) => e.id === t.page) : null;
		return {
			label: t.label,
			target: n ? n.title : t.href ?? Z("opt.noLink")
		};
	}
	function jd(e) {
		B(xd) && e?.dataTransfer?.dropEffect !== "none" && Pd(B(xd).key), M(yd, ""), M(xd, null);
	}
	yn(() => {
		if (!B(yd)) return;
		let e = (e) => e.preventDefault();
		return window.addEventListener("dragover", e), window.addEventListener("drop", e), () => {
			window.removeEventListener("dragover", e), window.removeEventListener("drop", e);
		};
	});
	let Md = "application/x-urd-nav-row";
	function Nd(e) {
		if (!B(yd)) return;
		let t = [...e.currentTarget.querySelectorAll(".nav-item:not(.ghost)")];
		if (!t.length) return;
		let n = t.find((t) => {
			let n = t.getBoundingClientRect();
			return e.clientY >= n.top && e.clientY <= n.bottom;
		}), r = null;
		if (n) r = Od(n, n.dataset.key, e.clientX, e.clientY);
		else {
			let n = Dd(B(yd)), i = n.list[n.index], a = t.find((t) => {
				let n = t.getBoundingClientRect();
				return n.top + n.height / 2 > e.clientY;
			});
			if (a) r = a.dataset.key === B(yd) ? null : kd({
				key: a.dataset.key,
				pos: "before"
			}, i, n);
			else {
				let e = [...t].reverse().find((e) => !e.classList.contains("child"));
				r = e.dataset.key === B(yd) ? null : kd({
					key: e.dataset.key,
					pos: "after"
				}, i, n);
			}
		}
		if (!r) {
			M(xd, null);
			return;
		}
		e.preventDefault(), (B(xd)?.key !== r.key || B(xd)?.pos !== r.pos) && M(xd, r, !0);
	}
	function Pd(e) {
		let t = B(yd), n = B(xd);
		if (M(yd, ""), M(xd, null), t && n && n.key === e && t !== e) {
			{
				let r = Dd(t), i = Dd(e), a = r.list[r.index];
				if (i.parent && (i.parent === a || a.children?.length) || n.pos === "into" && a.children?.length) return;
			}
			Ja("nav", () => {
				let r = B(k).nav.items, i = Dd(t), a = Dd(e), o = i.list[i.index], s = a.list[a.index];
				if (o !== s) {
					if (i.list.splice(i.index, 1), i.parent && i.parent.children.length === 0 && (delete i.parent.children, !i.parent.page && !i.parent.href && (i.parent.page = B(k).pages[0].id)), n.pos === "into") s.children ??= [], s.children.push(o);
					else {
						let e = a.parent ? a.parent.children : r, t = e.indexOf(s) + +(n.pos === "after");
						e.splice(t, 0, o);
					}
					!o.page && o.href == null && !o.children?.length && (o.page = B(k).pages[0].id);
				}
			}), M(vd, "");
		}
	}
	let Fd = "<svg width=\"10\" height=\"16\" viewBox=\"0 0 10 16\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"3\" cy=\"3\" r=\"1.3\"/><circle cx=\"7\" cy=\"3\" r=\"1.3\"/><circle cx=\"3\" cy=\"8\" r=\"1.3\"/><circle cx=\"7\" cy=\"8\" r=\"1.3\"/><circle cx=\"3\" cy=\"13\" r=\"1.3\"/><circle cx=\"7\" cy=\"13\" r=\"1.3\"/></svg>";
	function Id() {
		Ja("nav", () => {
			B(k).nav.items.push({
				label: Z("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function Rd(e) {
		Ja("nav", () => {
			let t = B(k).nav.items[e];
			t.children ??= [], t.children.push({
				label: Z("seed.link"),
				page: B(k).pages[0].id
			});
		});
	}
	function zd(e, t, n) {
		Ja(`edit:nav-child-label-${e}-${t}`, () => {
			B(k).nav.items[e].children[t].label = n;
		});
	}
	function Bd(e, t, n) {
		Ja("nav", () => {
			let r = B(k).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function Vd(e, t, n) {
		Ja(`edit:nav-child-href-${e}-${t}`, () => {
			B(k).nav.items[e].children[t].href = n;
		});
	}
	function Hd(e, t, n) {
		let r = t + n, i = B(k).nav.items[e].children;
		r < 0 || r >= i.length || Ja("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function Ud(e, t) {
		Ja("nav", () => {
			let n = B(k).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = B(k).pages[0].id));
		});
	}
	function Wd(e, t) {
		Ja(`edit:theme-color-${e}`, () => {
			B(k).theme.tokens.color[e] = t, B(k).theme.alt?.auto && (B(k).theme.alt.tokens.color = of());
		});
	}
	function Gd(e, t) {
		return e === "accent-text" ? oe(hf(t.accent ?? "#000000", t)) : t.bg;
	}
	let Kd = /* @__PURE__ */ A(() => !B(k)?.theme?.tokens?.color?.["accent-text"] && !B(k)?.theme?.alt?.tokens?.color?.["accent-text"]), qd = /* @__PURE__ */ j(null), Jd = /* @__PURE__ */ j(!1), Yd = /* @__PURE__ */ j(!1), Xd = (e) => e.length > 0 && [...e].every((e) => e.open);
	function Zd() {
		let e = B(qd)?.querySelectorAll("details.group") ?? [];
		M(Jd, e.length > 0), M(Yd, Xd(e), !0);
	}
	yn(() => {
		B(Rt), dr().then(Zd);
	});
	function Qd() {
		let e = !B(Yd);
		B(qd)?.querySelectorAll("details.group").forEach((t) => {
			t.open = e;
		}), Zd();
	}
	function $d(e) {
		for (let t of e.querySelectorAll("details.group")) {
			let e = t.querySelector(":scope > summary");
			if (!e || e.querySelector(".fold-sub")) continue;
			let n = () => t.querySelectorAll(":scope > .group-items details.group");
			if (!n().length) continue;
			let r = document.createElement("button");
			r.type = "button", r.className = "fold-sub fold-toggle", r.innerHTML = w.foldToggle;
			let i = () => {
				let e = Xd(n());
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
	yn(() => {
		let e = B(qd);
		if (!e) return;
		let t = new MutationObserver(() => {
			$d(e), Zd();
		});
		return t.observe(e, {
			childList: !0,
			subtree: !0
		}), e.addEventListener("toggle", Zd, !0), $d(e), () => {
			t.disconnect(), e.removeEventListener("toggle", Zd, !0);
		};
	});
	function ef(e) {
		Ja("edit:theme-color-accent-text", () => {
			e ? (delete B(k).theme.tokens.color["accent-text"], B(k).theme.alt?.tokens?.color && delete B(k).theme.alt.tokens.color["accent-text"]) : (B(k).theme.tokens.color["accent-text"] = Gd("accent-text", B(wi)), B(k).theme.alt?.auto && (B(k).theme.alt.tokens.color = of()));
		});
	}
	function tf(e, t) {
		Ja("theme", () => {
			B(k).theme.tokens.font[e] = t;
		});
	}
	function rf(e, t) {
		Ja("theme", () => {
			B(k).theme.tokens.radius[e] = t;
		});
	}
	function af(e) {
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
	function of() {
		return Object.fromEntries(Object.entries(B(k).theme.tokens.color).map(([e, t]) => [e, af(t)]));
	}
	function cf(e, t) {
		Ja(`edit:theme-alt-${e}`, () => {
			B(k).theme.alt.tokens.color[e] = t, B(k).theme.alt.auto = !1;
		});
	}
	function lf(e) {
		Ja("theme", () => {
			e === "light" ? delete B(k).theme.scheme : B(k).theme.scheme = e;
		});
	}
	function uf(e) {
		Ja("theme", () => {
			e ? B(k).theme.alt = {
				auto: !0,
				tokens: { color: of() }
			} : delete B(k).theme.alt;
		});
	}
	function df(e) {
		Ja("theme", () => {
			B(k).theme.alt ??= { tokens: { color: of() } }, B(k).theme.alt.auto = e, e && (B(k).theme.alt.tokens.color = of());
		});
	}
	function ff(e) {
		let t = B(k).theme.tokens.font[e];
		return [...Mf.some(([, e]) => e === t) ? [] : [[t, Z("opt.customFont")]], ...Mf.map(([e, t]) => [t, Z(e)])];
	}
	let pf = (e) => parseInt(e, 10) || 0;
	function mf(e, t) {
		rf(e, `${t}px`);
	}
	let hf = (e, t) => e && t && t[e] ? t[e] : e, gf = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], _f = [
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
	function vf(e) {
		Ja("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of gf) B(k).theme.tokens.color[e] = n[e];
			t ? B(k).theme.scheme = "dark" : delete B(k).theme.scheme, B(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let yf = /* @__PURE__ */ A(() => {
		if (!B(k)) return null;
		let e = B(k).theme.tokens.color, t = B(k).theme.alt?.tokens?.color ?? {}, n = B(k).theme.scheme === "dark";
		return _f.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return gf.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	}), bf = 0;
	async function xf() {
		B(_e) && (bf = B(qd)?.scrollTop ?? 0), M(_e, !B(_e)), tt?.sendChrome(B(_e)), B(_e) && (await dr(), requestAnimationFrame(() => {
			B(qd) && (B(qd).scrollTop = bf);
		}));
	}
	function Sf(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (pt(`edit:${e.blockId}`), n.props = e.props, O.save(), ct(), B(N)?.blockId === e.blockId && tn(), e.rerender && tt?.sendSection(B(T), t), M(le, ""));
	}
	function Cf(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		pt(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && $e(t, "desktop-changed-after-mobile"), O.save(), ct(), B(N)?.blockId === e.blockId && tn();
	}
	function wf(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t?.frames?.desktop && t.frames.desktop.h !== e.h && (O.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), O.hasDraft() && pt(`edit:${e.blockId}`), t.frames.desktop.h = e.h, O.save(), ct(), B(N)?.blockId === e.blockId && tn());
	}
	function Tf(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (pt("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Qe(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), O.save(), ct(), qe(), tt?.sendSection(B(T), t);
		}
	}
	function Of(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && typeof e.mobileOrder == "number" && (pt("mobile-order"), n.mobileOrder = e.mobileOrder, O.save(), ct(), tt?.sendSection(B(T), t));
	}
	function kf(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (pt("review-done"), t.responsive.mobile.attention = null, O.save(), ct(), qe());
	}
	function Af(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (pt("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), O.save(), ct(), typeof e.hideMobile == "boolean" && B(Ae) === "mobile" && tt?.sendSection(B(T), t), B(N)?.blockId === e.blockId && tn());
	}
	function C_(e) {
		pt("add-section"), e.section.id || (e.section.id = Ws("sec")), O.data.sections.splice(e.index, 0, e.section), O.save(), ct(), tt?.sendPage(B(T), O.data), M(er, e.section.id, !0), cr(e.section), M(Rt, "properties");
	}
	function w_(e) {
		let t = O.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (pt("move-section"), [t[n], t[r]] = [t[r], t[n]], O.save(), ct(), tt?.sendPage(B(T), O.data));
	}
	function T_(e) {
		pt("delete-section"), e.sectionId === B(er) && (M(er, null), M(tr, null)), B(N)?.sectionId === e.sectionId && M(N, null), O.data.sections = O.data.sections.filter((t) => t.id !== e.sectionId), O.save(), ct(), tt?.sendPage(B(T), O.data);
	}
	function E_(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			pt("section-size"), t.size = {
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
			e.moves?.length && ($e(t, "section-height"), B(N)?.sectionId === e.sectionId && tn()), e.sectionId === B(er) && M(nr, e.minHeight, !0), O.save(), ct();
		}
	}
	function D_(e) {
		let t = O.data.sections.find((t) => t.id === e.fromSectionId), n = O.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		t && n && r && (pt("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), $e(t, "block-moved"), $e(n, "block-moved"), O.save(), ct(), qe(), tt?.sendSection(B(T), t), tt?.sendSection(B(T), n), B(N)?.blockId === e.blockId && (M(N, {
			...B(N),
			sectionId: e.toSectionId
		}, !0), tn()));
	}
	function O_(e) {
		let t = O.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		pt("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(B(N)?.blockId) && M(N, null), $e(t, "block-deleted"), O.save(), ct(), tt?.sendSection(B(T), t);
	}
	let k_ = {
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
				fields: Es()
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
	function A_(e) {
		let t = k_[e];
		return t ? {
			id: Ws("blk"),
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
	function j_(e) {
		tt ? tt.sendPlaceBlock(e) : M_(Ui()?.id, e);
	}
	function M_(e, t) {
		let n = O.data.sections.find((t) => t.id === e) ?? O.data.sections[0];
		if (!n) return;
		pt("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), $e(n, "block-added"), O.save(), ct(), tt?.sendSection(B(T), n);
	}
	function N_(e, t, n, r) {
		let i = O.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		pt("add-blocks");
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
		}), $e(i, "block-added"), O.save(), ct(), tt?.sendSection(B(T), i);
	}
	function P_(e) {
		j_(A_(e));
	}
	let F_ = /* @__PURE__ */ j($t([])), I_ = { map: [
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
	function L_(e, t = {}) {
		let n = Ge(e);
		j_({
			id: Ws("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...Ge(t)
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
	let R_ = /* @__PURE__ */ j("");
	function z_() {
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
		for (let t of B(Qc)) {
			let n = Yc[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "template",
				id: t
			});
		}
		for (let t of B(F_)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function B_(e) {
		e.act === "block" ? P_(e.kind) : e.act === "plugin" ? L_(e.entry, e.props ?? {}) : e.act === "template" && tt?.sendInsertTemplate(e.id);
	}
	function V_(e) {
		let t = A_(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = O.data.sections.find((t) => t.id === e.sectionId)?.grid ?? B(k).grid, r = Nf({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			M_(e.sectionId, t), tt?.sendSelect(t.id), e.kind === "image" && E(Z("status.imageBlockAdded")), e.kind === "gallery" && E(Z("status.galleryBlockAdded"));
		}
	}
	async function H_(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		E(Z("status.compressingImage"));
		let n;
		try {
			n = await Kr(t);
		} catch (e) {
			E(Jr(e), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (B(me)?.clientWidth ?? 1280));
		j_({
			id: Ws("blk"),
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
		}), n.bytes > 4e5 ? E(Z("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : E("");
	}
	async function U_(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Kr(i);
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
	function W_(e, t, n) {
		t ? E(Z("status.imagesReadFailed", { n: t }), "error") : n ? E(Z("status.imagesLarge", { n }), "error") : E(e ? "" : Z("status.noImagesAdded"));
	}
	async function G_(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await U_(t);
		n.length && ln("gallery-add", (e) => {
			e.props.images.push(...n);
		}), W_(n.length, r, i);
	}
	async function K_(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		E(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await U_(t);
		if (!n.length) {
			W_(0, r, i);
			return;
		}
		let a = A_("gallery");
		a.props.images = n, j_(a), W_(n.length, r, i);
	}
	function q_(e, t) {
		ln("gallery-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function J_(e) {
		ln("gallery-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Y_(e, t, n) {
		ln(`edit:${B(N).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function X_(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/") && !i?.startsWith("data:video/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ra(n || "image")}-${za(a)}.${La(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Z_(e, t) {
		X_(e, "image", e.title, t);
		for (let n of e.colors ?? []) X_(n, "image", `${e.title}-${n.name}`, t);
	}
	function Q_(e, t) {
		for (let n of e?.layers ?? []) {
			if (n.type === "image" && X_(n.props, "src", "background", t), n.type === "slideshow") for (let e of n.props.images ?? []) X_(e, "src", "background", t);
			n.type === "video" && (X_(n.props, "src", "video", t), X_(n.props, "poster", "plakat", t));
		}
	}
	function $_(e, t) {
		if (e.type === "image" && X_(e.props, "src", e.props.alt, t), e.type === "icon" && X_(e.props, "image", "ikon", t), e.type === "gallery") for (let n of e.props.images ?? []) X_(n, "src", n.alt || "gallery", t);
		e.type === "audio" && X_(e.props, "src", e.props.title || "lyd", t), e.type === "video" && (X_(e.props, "src", e.props.title || "video", t), X_(e.props, "poster", "poster", t));
	}
	function ev(e, t) {
		Q_(e.background, t);
		for (let n of e.blocks) $_(n, t);
	}
	function tv(e) {
		let t = [];
		e.meta?.og && X_(e.meta.og, "image", "share", t);
		for (let n of e.sections) ev(n, t);
		return t;
	}
	function nv(e) {
		let t = [], n = e.nav?.logo;
		if (n?.type === "image" && X_(n, "value", "logo", t), n?.type === "both" && X_(n, "image", "logo", t), e.nav?.style && X_(e.nav.style, "image", "menu", t), Q_(e.nav?.style?.background, t), Q_(e.footer?.background, t), e.footer?.brand && X_(e.footer.brand, "logo", "footer-logo", t), e.nav?.launcher) {
			X_(e.nav.launcher, "image", "snarvei", t);
			for (let n of e.nav.launcher.links ?? []) X_(n, "image", "snarvei", t);
		}
		return X_(e.site, "icon", "ikon", t), t;
	}
	let rv = /* @__PURE__ */ j(!1), iv = /* @__PURE__ */ j(null);
	function av() {
		M(rv, !B(rv));
	}
	function ov() {
		M(rv, !1);
		try {
			sv(), E(Z("ui.discarded"), "info");
		} catch (e) {
			console.error("Urd: discard failed", e), E(String(e?.message ?? e), "error");
		}
	}
	yn(() => {
		if (!B(rv)) return;
		let e = (e) => {
			if (!B(iv)?.contains(e.target)) {
				M(rv, !1);
				return;
			}
			e.target instanceof Element && e.target.closest(".discard-confirm") && (e.preventDefault(), e.stopPropagation(), ov());
		}, t = (e) => {
			e.key === "Escape" && M(rv, !1);
		}, n = !1, r = (e) => {
			n = !!B(iv)?.contains(e.target);
		}, i = () => {
			n = !1;
		}, a = () => {
			n || M(rv, !1);
		};
		return window.addEventListener("pointerdown", r, !0), window.addEventListener("pointerup", i, !0), window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", a), () => {
			window.removeEventListener("pointerdown", r, !0), window.removeEventListener("pointerup", i, !0), window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", a);
		};
	});
	function sv() {
		pt("discard");
		for (let e of B(k).pages) e.id !== B(T) && !it.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = O.reset();
		if (et.reset(), Fl && (Fl.reset(), ql()), Rc) {
			Rc.reset(), M(Hc, [...Rc.data.samlinger ?? []], !0);
			for (let e of Object.keys(zc)) B(Hc).includes(e) ? zc[e].reset() : delete zc[e];
			fl();
		}
		if (Jc) {
			Jc.reset(), M(Qc, [...Jc.data.maler ?? []], !0);
			for (let e of Object.keys(Yc)) B(Qc).includes(e) ? Yc[e].reset() : (localStorage.removeItem(`urd-draft-template-${e}`), localStorage.removeItem(`urd-draft-mal-${e}`), delete Yc[e]);
			el();
		}
		nt(), M(ge, {
			snap: !0,
			...B(k).grid
		}, !0), ct(), M(le, ""), rt(), B(k).pages.some((e) => e.id === B(T)) ? tt?.sendPage(B(T), e) : Ta(B(k).pages[0].id);
	}
	async function cv() {
		if (sa) {
			E(Z("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (B(ma)) {
			E(Z("update.publishBlocked"), "error");
			return;
		}
		E(Z("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of B(k).pages) {
			let a = `urd-draft-${i.id}`, o = it.has(i.id) || !B(se).pages.some((e) => e.id === i.id), s = null;
			if (i.id === B(T) && (O.hasDraft() || o)) s = O.data;
			else if (i.id !== B(T)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Rs(JSON.parse(e), et.data);
				} catch {}
			}
			if (!s && o && (s = wa(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...tv(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (et.hasDraft()) {
			let r = JSON.parse(JSON.stringify(B(k)));
			e.push(...nv(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: au(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(B(se).theme, B(k).theme) || t.push(Z("publish.part.theme")), i(B(se).nav, B(k).nav) || t.push(Z("publish.part.nav")), i(B(se).footer, B(k).footer) || t.push(Z("publish.part.footer")), i(B(se).pages, B(k).pages) || t.push(Z("publish.part.pages")), i(B(se).grid, B(k).grid) || t.push(Z("publish.part.grid")), (B(se).site.icon ?? null) !== (B(k).site.icon ?? null) && t.push(Z("publish.part.icon"));
			let { icon: a, ...o } = B(se).site, { icon: s, ...c } = B(k).site;
			i(o, c) || t.push(Z("publish.part.siteInfo"));
		}
		let i = Object.entries(zc).filter(([, e]) => e.hasDraft());
		if (i.length || Rc?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Z_(t, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), jc.includes(i.kind) && e.push({
					path: `content/samlinger/${t}.xml`,
					content: Mc({
						title: i.name ?? t,
						origin: location.origin,
						path: `/content/samlinger/${t}.xml`,
						items: i.entries.map((e) => ({
							id: e.id,
							title: _l(e.title),
							text: _l(e.text),
							date: e.date,
							href: e.href
						}))
					}),
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Rc?.hasDraft()) {
				e.push({
					path: "content/collections.json",
					content: JSON.stringify(Rc.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-collections", "urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/collections.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!B(Hc).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Z("publish.part.collections"));
		}
		let a = Object.entries(Yc).filter(([, e]) => e.hasDraft());
		if (a.length || Jc?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && ev(i.section, e);
				for (let t of i.blocks ?? []) $_(t, e);
				for (let t of i.page?.sections ?? []) ev(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Jc?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Jc.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-templates", "urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!B(Qc).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push(Z("publish.part.templates"));
		}
		Fl?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Fl.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push(Z("publish.part.plugins")));
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
			content: kc(B(k).pages, location.origin),
			encoding: "utf-8"
		}), e.push({
			path: "robots.txt",
			content: Ac(location.origin),
			encoding: "utf-8"
		});
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of B(se).pages) {
			let t = B(k).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await ta(e);
		if (!c.ok) {
			E(Z("status.publishAborted"), "error");
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
			t ? Zi = t : Qi(), tv(O.data), nv(B(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) it.add(e);
			if (M(se, JSON.parse(JSON.stringify(B(k))), !0), et = ea("urd-draft-site", () => B(se), fe), nt(), Fl) {
				let e = JSON.parse(JSON.stringify(Fl.data));
				Fl = ea("urd-draft-plugins", () => e, fe), ql();
			}
			if (Rc) {
				for (let e of Object.values(zc)) for (let t of e.data.entries) Z_(t, []);
				let e = JSON.parse(JSON.stringify(Rc.data));
				Rc = ea("urd-draft-collections", () => e, fe, "urd-draft-samlinger"), Bc = {};
				for (let e of B(Hc)) {
					if (!zc[e]) continue;
					let t = JSON.parse(JSON.stringify(zc[e].data));
					Bc[e] = t, zc[e] = ea(`urd-draft-collection-${e}`, () => t, fe, `urd-draft-samling-${e}`);
				}
				fl();
			}
			if (Jc) {
				for (let e of Object.values(Yc)) {
					e.data?.section && ev(e.data.section, []);
					for (let t of e.data?.blocks ?? []) $_(t, []);
					for (let t of e.data?.page?.sections ?? []) ev(t, []);
				}
				let e = JSON.parse(JSON.stringify(Jc.data));
				Jc = ea("urd-draft-templates", () => e, fe, "urd-draft-maler"), Xc = {};
				for (let e of B(Qc)) {
					if (!Yc[e]) continue;
					let t = JSON.parse(JSON.stringify(Yc[e].data));
					Xc[e] = t, Yc[e] = ea(`urd-draft-template-${e}`, () => t, fe, `urd-draft-mal-${e}`);
				}
				el();
			}
			M(ge, {
				snap: !0,
				...B(k).grid
			}, !0);
			let i = JSON.parse(JSON.stringify(O.data));
			O = ea(`urd-draft-${B(T)}`, () => i, fe), it.has(B(T)) && pe(`urd-draft-${B(T)}`, JSON.stringify(i)), ct(), E(Z("status.published"), "info"), da(e);
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			E(e?.code === "loginExpired" ? Z("status.loginExpired") : Z("status.loginRequired", { reason: Ki(e) ?? Z("status.unknownReason") }), "error"), await Xi();
		} else u?.status === 403 ? E(Ki(await u.json().catch(() => null)) ?? Z("status.noPublishAccess"), "error") : u?.status === 409 ? E(Z("status.publishRace"), "error") : E(u ? Ki(await u.json().catch(() => null)) ?? Z("status.publishFailed") : Z("status.publishUnavailable"), "error");
	}
	St();
	var lv = S_();
	Sr("keydown", en, xt), Sr("pointerdown", en, bt);
	var uv = F(lv), dv = P(uv), fv = (e) => {
		var t = Rm(), n = P(t);
		K(n, () => w.pencil);
		var r = L(n);
		D(t), z((e, n) => {
			X(t, "title", e), W(r, ` ${n ?? ""}`);
		}, [() => Z("tip.backToEdit"), () => Z("ui.edit")]), V("click", t, xf), U(e, t);
	};
	G(dv, (e) => {
		B(_e) || e(fv);
	});
	var pv = L(dv, 2);
	let mv;
	var hv = P(pv), gv = P(hv), _v = (e) => {
		var t = Ym(), n = F(t), r = I(n, !0), i = L(n, 2), a = P(i), o = (e) => {
			var t = Vm(), n = P(t);
			let r;
			var i = P(n);
			K(i, () => w[`device_${B(Oe)}`]), K(L(i), () => w.caret), D(n);
			var a = L(n, 2), o = (e) => {
				var t = Bm();
				qr(t, 21, () => B(Te), (e) => e.id, (e, t) => {
					var n = zm();
					let r;
					var i = P(n);
					K(i, () => w[`device_${B(t).id}`]);
					var a = L(i);
					D(n), z((e, i) => {
						r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Oe) === B(t).id }), X(n, "title", e), W(a, ` ${i ?? ""}`);
					}, [() => Ee(B(t)), () => Z(`lbl.device.${B(t).id}`)]), V("click", n, () => {
						M(Oe, B(t).id, !0), M(Va, null);
					}), U(e, n);
				}), D(t), U(e, t);
			};
			G(a, (e) => {
				B(Va) === "device" && e(o);
			}), D(t), z((e) => {
				r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Va) === "device" }), X(n, "title", e);
			}, [() => Z("lbl.group.device")]), V("click", n, () => M(Va, B(Va) === "device" ? null : "device", !0)), U(e, t);
		}, s = (e) => {
			var t = Um(), n = F(t), r = I(n, !0), i = L(n, 2);
			qr(i, 21, () => B(Te), (e) => e.id, (e, t) => {
				var n = Hm();
				let r;
				K(n, () => w[`device_${B(t).id}`], !0), D(n), z((e) => {
					r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Oe) === B(t).id }), X(n, "title", e);
				}, [() => Ee(B(t))]), V("click", n, () => M(Oe, B(t).id, !0)), U(e, n);
			}), D(i), z((e) => W(r, e), [() => Z("lbl.group.device")]), U(e, t);
		};
		G(a, (e) => {
			Ua.device ? e(o) : e(s, -1);
		});
		var c = L(a, 2), l = (e) => {
			var t = Gm(), n = P(t);
			let r;
			var i = P(n), a = I(i);
			K(L(i), () => w.caret), D(n);
			var o = L(n, 2), s = (e) => {
				var t = Wm(), n = P(t), r = P(n);
				K(r, () => w.minus, !0), D(r);
				var i = L(r, 2), a = I(i), o = L(i, 2);
				K(o, () => w.plus, !0), D(o), D(n);
				var s = L(n, 2);
				let c;
				var l = P(s);
				K(l, () => w.fit);
				var u = L(l);
				D(s), D(t), z((e, t, n, l, d, f) => {
					X(r, "title", e), X(i, "title", t), W(a, `${n ?? ""}%`), X(o, "title", l), c = q(s, 1, "ghost svelte-1n46o8q", null, c, { active: B(Pe) === "fit" }), X(s, "title", d), W(u, ` ${f ?? ""}`);
				}, [
					() => Z("tip.zoomOut"),
					() => Z("tip.zoomCurrent"),
					() => Math.round(B(ze) * 100),
					() => Z("tip.zoomIn"),
					() => Z("tip.zoomFit"),
					() => Z("lbl.zoom.fit")
				]), V("click", r, () => Be(-1)), V("click", o, () => Be(1)), V("click", s, () => M(Pe, "fit")), U(e, t);
			};
			G(o, (e) => {
				B(Va) === "zoom" && e(s);
			}), D(t), z((e, t) => {
				r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Va) === "zoom" }), X(n, "title", e), W(a, `${t ?? ""}%`);
			}, [() => Z("lbl.group.zoom"), () => Math.round(B(ze) * 100)]), V("click", n, () => M(Va, B(Va) === "zoom" ? null : "zoom", !0)), U(e, t);
		}, u = (e) => {
			var t = Km(), n = F(t), r = I(n, !0), i = L(n, 2), a = P(i);
			K(a, () => w.minus, !0), D(a);
			var o = L(a, 2), s = I(o), c = L(o, 2);
			K(c, () => w.plus, !0), D(c);
			var l = L(c, 2);
			let u;
			K(l, () => w.fit, !0), D(l), D(i), z((e, t, n, i, d, f) => {
				W(r, e), X(a, "title", t), X(o, "title", n), W(s, `${i ?? ""}%`), X(c, "title", d), u = q(l, 1, "ghost svelte-1n46o8q", null, u, { active: B(Pe) === "fit" }), X(l, "title", f);
			}, [
				() => Z("lbl.group.zoom"),
				() => Z("tip.zoomOut"),
				() => Z("tip.zoomCurrent"),
				() => Math.round(B(ze) * 100),
				() => Z("tip.zoomIn"),
				() => Z("tip.zoomFit")
			]), V("click", a, () => Be(-1)), V("click", c, () => Be(1)), V("click", l, () => M(Pe, "fit")), U(e, t);
		};
		G(c, (e) => {
			Ua.zoom ? e(l) : e(u, -1);
		});
		var d = L(c, 2), f = (e) => {
			var t = Vm(), n = P(t);
			let r;
			var i = P(n);
			K(i, () => w.gridToggle), K(L(i), () => w.caret), D(n);
			var a = L(n, 2), o = (e) => {
				var t = qm(), n = P(t);
				let r;
				var i = P(n);
				K(i, () => w.gridToggle);
				var a = L(i);
				D(n);
				var o = L(n, 2);
				let s;
				var c = P(o);
				K(c, () => w.guides);
				var l = L(c);
				D(o), D(t), z((e, t, i, c) => {
					r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Ga) }), X(n, "title", e), W(a, ` ${t ?? ""}`), s = q(o, 1, "ghost svelte-1n46o8q", null, s, { active: B(Oa) }), X(o, "title", i), W(l, ` ${c ?? ""}`);
				}, [
					() => Z("tip.gridToggle"),
					() => Z("lbl.view.grid"),
					() => Z("tip.guides"),
					() => Z("lbl.view.guides")
				]), V("click", n, Ka), V("click", o, Wa), U(e, t);
			};
			G(a, (e) => {
				B(Va) === "view" && e(o);
			}), D(t), z((e) => {
				r = q(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(Va) === "view" || B(Ga) || B(Oa) }), X(n, "title", e);
			}, [() => Z("lbl.group.view")]), V("click", n, () => M(Va, B(Va) === "view" ? null : "view", !0)), U(e, t);
		}, p = (e) => {
			var t = Jm(), n = F(t), r = I(n, !0), i = L(n, 2), a = P(i);
			let o;
			K(a, () => w.gridToggle, !0), D(a);
			var s = L(a, 2);
			let c;
			K(s, () => w.guides, !0), D(s), D(i), z((e, t, n) => {
				W(r, e), o = q(a, 1, "ghost svelte-1n46o8q", null, o, { active: B(Ga) }), X(a, "title", t), c = q(s, 1, "ghost svelte-1n46o8q", null, c, { active: B(Oa) }), X(s, "title", n);
			}, [
				() => Z("lbl.group.view"),
				() => Z("tip.gridToggle"),
				() => Z("tip.guides")
			]), V("click", a, Ka), V("click", s, Wa), U(e, t);
		};
		G(d, (e) => {
			Ua.view ? e(f) : e(p, -1);
		}), D(i), ki(i, (e) => M(Ha, e), () => B(Ha)), z((e, t) => {
			X(n, "title", e), W(r, t);
		}, [() => Z("tip.switchPage"), () => st()?.title ?? ""]), V("click", n, () => Xt("pages")), U(e, t);
	};
	G(gv, (e) => {
		B(se) && e(_v);
	});
	var vv = L(gv, 2), yv = (e) => {
		var t = Xm(), n = P(t);
		K(n, () => w.phone);
		var r = L(n, 2), i = I(r, !0), a = I(L(r, 2), !0);
		D(t), z((e, n) => {
			X(t, "title", e), W(i, n), W(a, B(Ke));
		}, [() => Z("tip.attention"), () => Z(B(Ke) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: B(Ke) })]), V("click", t, Je), U(e, t);
	};
	G(vv, (e) => {
		B(Ke) > 0 && e(yv);
	}), D(hv);
	var bv = L(hv, 2), xv = P(bv), Sv = (e) => {
		var t = Qm(), n = P(t), r = I(P(n), !0);
		De(2), D(n);
		var i = L(n, 2), a = P(i);
		let o;
		var s = P(a);
		K(s, () => w.restore);
		var c = I(L(s), !0);
		D(a);
		var l = L(a, 2), u = (e) => {
			var t = Zm(), n = P(t);
			K(n, () => w.restore);
			var r = L(n);
			D(t), z((e, n) => {
				X(t, "title", e), W(r, ` ${n ?? ""}`);
			}, [() => Z("tip.discardArmed"), () => Z("ui.discardConfirm")]), V("click", t, ov), U(e, t);
		};
		G(l, (e) => {
			B(rv) && e(u);
		}), D(i), ki(i, (e) => M(iv, e), () => B(iv)), D(t), z((e, t, i, s, l) => {
			X(n, "title", e), X(n, "aria-label", t), W(r, i), o = q(a, 1, "discard-dot svelte-1n46o8q", null, o, { armed: B(rv) }), X(a, "title", s), W(c, l);
		}, [
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => B(rv) ? Z("tip.discardArmed") : Z("tip.discard"),
			() => Z("ui.discard")
		]), V("click", a, av), ci(2, t, () => $i, () => ({
			x: 24,
			duration: an ? 0 : 150
		})), U(e, t);
	};
	G(xv, (e) => {
		B(ce) && e(Sv);
	}), D(bv);
	var Cv = L(bv, 2), wv = P(Cv), Tv = (e) => {
		var t = nh(), n = F(t), r = P(n), i = (e) => {
			var t = $m(), n = F(t);
			K(n, () => w.eye);
			var r = I(L(n, 2), !0);
			z((e) => W(r, e), [() => Z("ui.cleanView")]), U(e, t);
		}, a = (e) => {
			var t = $m(), n = F(t);
			K(n, () => w.pencil);
			var r = I(L(n, 2), !0);
			z((e) => W(r, e), [() => Z("ui.edit")]), U(e, t);
		};
		G(r, (e) => {
			B(_e) ? e(i) : e(a, -1);
		}), D(n);
		var o = L(n, 2), s = (e) => {
			var t = eh(), n = P(t), r = (e) => {
				var t = Mr();
				K(F(t), () => w.warn), U(e, t);
			};
			G(n, (e) => {
				B(he).allowed || e(r);
			});
			var i = L(n, 1, !0);
			D(t), z((e) => {
				X(t, "title", e), W(i, B(he).login);
			}, [() => B(he).allowed ? Z("tip.hasPublishAccess") : Z("tip.noPublishAccess")]), U(e, t);
		}, c = (e) => {
			var t = th(), n = I(t, !0);
			z((e) => W(n, e), [() => Z("ui.loginGitHub")]), U(e, t);
		};
		G(o, (e) => {
			B(he)?.loggedIn ? e(s) : B(he) && e(c, 1);
		});
		var l = L(o, 2), u = P(l);
		K(u, () => w.external);
		var d = I(L(u, 2), !0);
		D(l);
		var f = L(l, 2), p = I(f, !0);
		z((e, t, r, i, a) => {
			X(n, "title", e), X(l, "href", t), X(l, "title", r), W(d, i), f.disabled = !B(ce), W(p, a);
		}, [
			() => B(_e) ? Z("tip.chromeHide") : Z("tip.chromeShow"),
			() => st()?.path ?? "/",
			() => Z("ui.viewSite"),
			() => Z("ui.viewSite"),
			() => Z("ui.publish")
		]), V("click", n, xf), V("click", f, cv), U(e, t);
	};
	G(wv, (e) => {
		B(se) && e(Tv);
	}), D(Cv), D(pv);
	var Ev = L(pv, 2), Dv = (e) => {
		var t = h_(), n = P(t);
		let r;
		var i = P(n);
		qr(i, 17, () => zt, Ur, (e, t, n) => {
			var r = ih(), i = F(r), a = I(i, !0);
			qr(L(i, 2), 16, () => B(t), (e) => e, (e, t) => {
				var n = rh();
				let r;
				var i = I(n, !0);
				z(() => {
					r = q(n, 1, "svelte-1n46o8q", null, r, { active: B(Rt) === t }), W(i, Vt[t]);
				}), V("click", n, () => Xt(t)), U(e, n);
			}), z((e) => W(a, e), [() => Z(Bt[n])]), U(e, r);
		});
		var s = L(i, 2), l = L(P(s), 2);
		let p;
		K(l, () => w.gear, !0), D(l);
		var _ = L(l, 2), v = (e) => {
			var t = sh(), n = P(t), r = I(n, !0), i = L(n, 2), a = P(i);
			Q(L(a), {
				get value() {
					return B(ie);
				},
				get options() {
					return ne;
				},
				onchange: (e) => M(ie, e, !0)
			}), D(i);
			var o = L(i, 2), s = P(o), c = L(s);
			{
				let e = /* @__PURE__ */ A(() => [["auto", Z("lang.auto")], ...Kt()]);
				Q(c, {
					get value() {
						return Jt;
					},
					get options() {
						return B(e);
					},
					onchange: Yt
				});
			}
			D(o);
			var l = L(o, 2), u = P(l), d = L(u);
			{
				let e = /* @__PURE__ */ A(() => [["strip", Z("settings.layoutPickerStrip")], ["menu", Z("settings.layoutPickerMenu")]]);
				Q(d, {
					get value() {
						return B(Aa);
					},
					get options() {
						return B(e);
					},
					onchange: Ma
				});
			}
			D(l);
			var f = L(l, 2), p = P(f), m = L(p);
			{
				let e = /* @__PURE__ */ A(() => [["remember", Z("settings.panelsRemember")], ["reset", Z("settings.panelsReset")]]);
				Q(m, {
					get value() {
						return B(It);
					},
					get options() {
						return B(e);
					},
					onchange: Lt
				});
			}
			D(f);
			var h = L(f, 2), g = I(h, !0), _ = L(h, 2), v = P(_);
			let y;
			var b = I(v, !0), x = L(v, 2);
			let S;
			var C = I(x, !0);
			D(_);
			var ee = L(_, 2), te = (e) => {
				var t = ah(), n = P(t), r = I(n, !0), i = L(n, 2);
				J(i);
				var a = L(i, 2), o = I(a, !0), s = L(a, 2);
				J(s), D(t), z((e, t, n, a) => {
					W(r, e), X(i, "min", 640), X(i, "max", Po), X(i, "title", t), Y(i, B(xe).width), W(o, n), X(s, "max", Fo), X(s, "title", a), Y(s, B(xe).height || "");
				}, [
					() => Z("lbl.screen.w"),
					() => Z("tip.screen.width", {
						min: 640,
						max: Po
					}),
					() => Z("lbl.screen.h"),
					() => Z("tip.screen.height", {
						min: 480,
						max: Fo
					})
				]), V("change", i, (e) => {
					Se({ width: Number(e.target.value) }), e.target.value = B(xe).width;
				}), V("change", s, (e) => {
					Se({ height: Number(e.target.value) }), e.target.value = B(xe).height || "";
				}), U(e, t);
			};
			G(ee, (e) => {
				B(xe).mode === "custom" && e(te);
			});
			var w = L(ee, 2), re = (e) => {
				var t = oh(), n = F(t), r = I(n, !0), i = L(n, 2), a = P(i), o = L(a);
				J(o), D(i), z((e, t, s, c, l) => {
					X(n, "title", e), W(r, t), X(i, "title", s), W(a, `${c ?? ""} `), X(o, "placeholder", l), Y(o, B(k).analytics?.token ?? "");
				}, [
					() => Z("tip.analytics"),
					() => Z("settings.analytics"),
					() => Z("tip.analytics"),
					() => Z("lbl.analyticsToken"),
					() => Z("ph.analyticsToken")
				]), V("change", o, (e) => Lo(e.target.value)), U(e, t);
			};
			G(w, (e) => {
				B(k) && e(re);
			}), D(t), z((e, t, n, c, d, m, ee, te, w, ne, re, ie, ae, oe) => {
				W(r, e), X(i, "title", t), W(a, `${n ?? ""} `), X(o, "title", c), W(s, `${d ?? ""} `), X(l, "title", m), W(u, `${ee ?? ""} `), X(f, "title", te), W(p, `${w ?? ""} `), X(h, "title", ne), W(g, re), X(_, "title", ie), y = q(v, 1, "svelte-1n46o8q", null, y, { on: B(xe).mode === "own" }), W(b, ae), S = q(x, 1, "svelte-1n46o8q", null, S, { on: B(xe).mode === "custom" }), W(C, oe);
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
			]), V("click", v, () => Se({ mode: "own" })), V("click", x, () => Se({ mode: "custom" })), U(e, t);
		};
		G(_, (e) => {
			B(ka) && e(v);
		}), D(s), ki(s, (e) => M(Na, e), () => B(Na)), D(n);
		var y = L(n, 2), b = (e) => {
			var t = m_();
			let n;
			var r = P(t), i = P(r), s = I(i, !0), l = L(i, 2), p = (e) => {
				var t = jp();
				let n;
				K(t, () => w.foldToggle, !0), D(t), z((e, r) => {
					n = q(t, 1, "fold-all fold-toggle svelte-1n46o8q", null, n, { collapse: B(Yd) }), X(t, "title", e), X(t, "aria-label", r);
				}, [() => Z(B(Yd) ? "ui.collapseAll" : "ui.expandAll"), () => Z(B(Yd) ? "ui.collapseAll" : "ui.expandAll")]), V("click", t, Qd), U(e, t);
			};
			G(l, (e) => {
				B(Jd) && e(p);
			}), D(r);
			var _ = L(r, 2), v = (e) => {
				var t = vh(), n = P(t);
				qr(n, 17, () => B(k).pages, (e) => e.id, (e, t) => {
					var n = ph();
					let r;
					var i = P(n);
					J(i);
					var a = L(i, 2), o = (e) => {
						var t = ch();
						z((e) => X(t, "title", e), [() => Z("tip.pages.homeLocked")]), U(e, t);
					}, s = (e) => {
						var n = lh();
						J(n), z((e, t) => {
							Y(n, e), X(n, "title", t);
						}, [() => B(t).path.slice(1), () => Z("tip.pages.slug")]), V("change", n, (e) => yo(B(t), e.target.value)), U(e, n);
					};
					G(a, (e) => {
						B(t).path === "/" ? e(o) : e(s, -1);
					});
					var c = L(a, 2), l = (e) => {
						var t = uh();
						K(t, () => w.warn, !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.pages.missingDescription")]), U(e, t);
					};
					G(c, (e) => {
						B(po)[B(t).id] && e(l);
					});
					var u = L(c, 2), d = P(u);
					K(d, () => w.right, !0), D(d);
					var f = L(d, 2), p = P(f);
					K(p, () => w.kebab, !0), D(p);
					var m = L(p, 2), h = (e) => {
						var n = fh(), r = P(n), i = P(r);
						K(i, () => w.bookmark);
						var a = L(i);
						D(r);
						var o = L(r, 2), s = (e) => {
							var n = dh(), r = P(n);
							K(r, () => w.cross);
							var i = L(r);
							D(n), z((e, t) => {
								X(n, "title", e), W(i, ` ${t ?? ""}`);
							}, [() => Z("tip.pages.delete"), () => Z("ui.deletePage")]), V("click", n, () => {
								M(no, null), bo(B(t));
							}), U(e, n);
						};
						G(o, (e) => {
							B(t).path !== "/" && e(s);
						}), D(n), z((e) => W(a, ` ${e ?? ""}`), [() => Z("ui.savePageTemplate")]), V("click", r, () => oo(B(t))), U(e, n);
					};
					G(m, (e) => {
						B(no) === B(t).id && e(h);
					}), D(f), D(u), D(n), z((e, a, o) => {
						r = q(n, 1, "page-row svelte-1n46o8q", null, r, { current: B(t).id === B(T) }), Y(i, B(t).title), X(i, "title", e), X(d, "title", a), d.disabled = B(t).id === B(T), X(p, "title", o);
					}, [
						() => Z("tip.pages.title"),
						() => Z("tip.pages.open"),
						() => Z("tip.pages.menu")
					]), V("change", i, (e) => so(B(t), e.target.value)), V("click", d, () => Ta(B(t).id)), V("click", p, () => M(no, B(no) === B(t).id ? null : B(t).id, !0)), U(e, n);
				});
				var r = L(n, 2), i = P(r), a = I(i, !0), o = L(i, 2), s = P(o), c = P(s), l = L(c);
				ot(l), D(s);
				var u = L(s, 2), d = P(u), f = L(d);
				J(f), D(u);
				var p = L(u, 2), m = P(p), h = L(m);
				ot(h), D(p);
				var g = L(p, 2), _ = P(g), v = L(_), y = (e) => {
					var t = mh();
					z((e) => {
						X(t, "src", B(co).ogImage), X(t, "alt", e);
					}, [() => Z("lbl.ogImage")]), U(e, t);
				};
				G(v, (e) => {
					B(co).ogImage && e(y);
				}), D(g);
				var b = L(g, 2), x = P(b), S = P(x), C = L(S);
				D(x);
				var ee = L(x, 2), te = (e) => {
					var t = Vf();
					K(t, () => w.cross, !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.seo.removeOgImage")]), V("click", t, () => uo("ogImage", "")), U(e, t);
				};
				G(ee, (e) => {
					B(co).ogImage && e(te);
				}), D(b);
				var ne = L(b, 2), re = P(ne);
				J(re);
				var ie = L(re);
				D(ne), D(o), D(r);
				var ae = L(r, 4);
				J(ae);
				var oe = L(ae, 2), se = I(oe, !0), ce = L(oe, 2), le = I(ce, !0), ue = L(ce, 2), de = P(ue);
				let E;
				var fe = P(de), pe = P(fe);
				K(pe, () => Jl({ sections: [] }), !0), D(pe);
				var me = I(L(pe, 2), !0);
				D(fe), D(de), qr(L(de, 2), 17, () => Xl, (e) => e.id, (e, t) => {
					var n = hh();
					let r;
					var i = P(n), a = P(i);
					K(a, () => Za[B(t).id], !0), D(a);
					var o = I(L(a, 2), !0);
					D(i), D(n), z((e, a) => {
						r = q(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: B(Xa) === `preset:${B(t).id}` }), X(i, "title", e), W(o, a);
					}, [() => Z("tip.pages.templatePick", { name: Z(B(t).labelKey) }), () => Z(B(t).labelKey)]), V("click", i, () => M(Xa, B(Xa) === `preset:${B(t).id}` ? null : `preset:${B(t).id}`, !0)), U(e, n);
				}), D(ue);
				var he = L(ue, 2), ge = (e) => {
					var t = _h(), n = F(t), r = I(n, !0), i = L(n, 2);
					qr(i, 20, () => B(Qc).filter((e) => Yc[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
						var n = gh();
						let r;
						var i = P(n), a = P(i);
						K(a, () => Jl(Yc[t].data.page), !0), D(a);
						var o = I(L(a, 2), !0);
						D(i);
						var s = L(i, 2);
						K(s, () => w.cross, !0), D(s), D(n), z((e, a) => {
							r = q(n, 1, "page-template-card svelte-1n46o8q", null, r, { picked: B(Xa) === t }), X(i, "title", e), W(o, Yc[t].data.mal.name), X(s, "title", a);
						}, [() => Z("tip.pages.templatePick", { name: Yc[t].data.mal.name }), () => Z("canvas.deleteTemplate")]), V("click", i, () => M(Xa, B(Xa) === t ? null : t, !0)), V("click", s, () => sl({ id: t })), U(e, n);
					}), D(i), z((e) => {
						W(r, e), gi(i, B(to));
					}, [() => Z("canvas.tabMyTemplates")]), U(e, t);
				}, _e = /* @__PURE__ */ A(() => B(Qc).some((e) => Yc[e]?.data?.mal?.kind === "page"));
				G(he, (e) => {
					B(_e) && e(ge);
				}), D(t), z((e, t, n, r, i, o, v, y, b, C, ee, te, w, T, ce, pe, he, ge, _e, ve, ye, be) => {
					W(a, e), X(s, "title", t), W(c, `${n ?? ""} `), Y(l, B(co).description), X(u, "title", r), W(d, `${i ?? ""} `), Y(f, B(co).ogTitle), X(f, "placeholder", o), X(p, "title", v), W(m, `${y ?? ""} `), Y(h, B(co).ogDescription), X(h, "placeholder", B(co).description), X(g, "title", b), W(_, `${C ?? ""} `), X(x, "title", ee), W(S, `${te ?? ""} `), X(ne, "title", w), xi(re, T), W(ie, ` ${ce ?? ""}`), X(ae, "placeholder", pe), X(oe, "title", he), oe.disabled = ge, W(se, _e), W(le, ve), gi(ue, B(to)), E = q(de, 1, "page-template-card svelte-1n46o8q", null, E, { picked: B(Xa) === null }), X(fe, "title", ye), W(me, be);
				}, [
					() => Z("ui.seoGroup", { page: B(k).pages.find((e) => e.id === B(T))?.title ?? "" }),
					() => Z("tip.seo.description"),
					() => Z("lbl.seoDescription"),
					() => Z("tip.seo.ogTitle"),
					() => Z("lbl.ogTitle"),
					() => B(k).pages.find((e) => e.id === B(T))?.title ?? "",
					() => Z("tip.seo.ogDescription"),
					() => Z("lbl.ogDescription"),
					() => Z("tip.seo.ogImage"),
					() => Z("lbl.ogImage"),
					() => Z("tip.seo.ogImage"),
					() => B(co).ogImage ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.seo.hideFromSearch"),
					() => B(k).pages.find((e) => e.id === B(T))?.noindex === !0,
					() => Z("lbl.hideFromSearch"),
					() => Z("ph.newPageName"),
					() => Z("hint.pages.autoMenu"),
					() => !B(Ya).trim(),
					() => Z("ui.createPage"),
					() => Z("canvas.tabPresets"),
					() => Z("tip.pages.blankPick"),
					() => Z("ui.blankPage")
				]), V("change", l, (e) => uo("description", e.target.value)), V("change", f, (e) => uo("ogTitle", e.target.value)), V("change", h, (e) => uo("ogDescription", e.target.value)), V("change", C, go), V("change", re, (e) => fo(e.target.checked)), V("keydown", ae, (e) => e.key === "Enter" && ao()), Ti(ae, () => B(Ya), (e) => M(Ya, e)), V("click", oe, ao), V("click", fe, () => M(Xa, null)), U(e, t);
			}, y = (e) => {
				var t = ag(), n = P(t), r = P(n), i = I(r, !0), o = L(r, 2), s = P(o);
				{
					let e = /* @__PURE__ */ A(() => Z("common.type")), t = /* @__PURE__ */ A(() => B(k).nav.logo?.type ?? "text"), n = /* @__PURE__ */ A(() => [
						["text", Z("blocks.text")],
						["image", Z("blocks.image")],
						["both", Z("opt.logo.both")]
					]);
					Cs(s, {
						get label() {
							return B(e);
						},
						get value() {
							return B(t);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => So(e)
					});
				}
				var c = L(s, 2), l = (e) => {
					var t = yh(), n = F(t);
					J(n);
					var r = L(n, 2), i = P(r);
					{
						let e = /* @__PURE__ */ A(() => Z("tip.nav.logoFont")), t = /* @__PURE__ */ A(() => B(k).nav.logo?.font ?? ""), n = /* @__PURE__ */ A(() => [["", Z("common.inherit")], ...Mf.map(([e, t]) => [t, Z(e)])]);
						Q(i, {
							get title() {
								return B(e);
							},
							get value() {
								return B(t);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => xo({ font: e || void 0 })
						});
					}
					var a = L(i, 2);
					J(a);
					var o = L(a, 2);
					let s;
					var c = I(P(o), !0);
					D(o);
					var l = L(o, 2);
					let u;
					var d = I(P(l), !0);
					D(l), D(r), z((e, t, r, i, f, p, m) => {
						Y(n, B(k).nav.logo?.value ?? ""), X(n, "placeholder", e), X(a, "title", t), Y(a, B(k).nav.logo?.textSize ?? ""), s = q(o, 1, "tbtn svelte-1n46o8q", null, s, { active: B(k).nav.logo?.bold !== !1 }), X(o, "title", r), W(c, i), u = q(l, 1, "tbtn svelte-1n46o8q", null, u, { active: f }), X(l, "title", p), W(d, m);
					}, [
						() => Z("ph.nav.logoName"),
						() => Z("tip.nav.textSize"),
						() => Z("format.bold"),
						() => Z("format.boldLetter"),
						() => !!B(k).nav.logo?.italic,
						() => Z("format.italic"),
						() => Z("format.italicLetter")
					]), V("input", n, (e) => xo({ value: e.target.value })), V("change", a, (e) => xo({ textSize: e.target.value ? Number(e.target.value) : void 0 })), V("click", o, () => xo({ bold: B(k).nav.logo?.bold === !1 })), V("click", l, () => xo({ italic: !B(k).nav.logo?.italic })), U(e, t);
				};
				G(c, (e) => {
					(B(k).nav.logo?.type ?? "text") !== "image" && e(l);
				});
				var p = L(c, 2), _ = (e) => {
					let t = /* @__PURE__ */ A(() => B(k).nav.logo?.type === "image" ? B(k).nav.logo?.value : B(k).nav.logo?.image);
					var n = Sh(), r = F(n), i = P(r), a = P(i), o = (e) => {
						var n = bh();
						z(() => X(n, "src", B(t))), U(e, n);
					};
					G(a, (e) => {
						B(t) && e(o);
					}), D(i);
					var s = L(i, 2), c = P(s), l = P(c), u = L(l);
					D(c);
					var d = L(c, 2), f = (e) => {
						var n = xh(), r = I(n, !0);
						z((e) => W(r, e), [() => B(t).split("/").pop()]), U(e, n);
					};
					G(d, (e) => {
						B(t) && e(f);
					}), D(s), D(r);
					var p = L(r, 2), m = P(p), h = P(m), g = I(h, !0), _ = L(h, 2);
					J(_), D(m);
					var v = L(m, 2), y = P(v), b = I(y, !0), x = L(y, 2);
					J(x), D(v);
					var S = L(v, 2), C = P(S), ee = I(C, !0), te = L(C, 2);
					J(te), D(S), D(p), z((e, t, n, r, i, a, o, s, u) => {
						X(c, "title", e), W(l, `${t ?? ""} `), X(m, "title", n), W(g, r), Y(_, B(k).nav.logo?.size ?? 32), X(v, "title", i), W(b, a), X(x, "min", os.min), X(x, "max", os.max), X(x, "placeholder", o), Y(x, B(k).nav.logo?.mobileSize ?? ""), X(S, "title", s), W(ee, u), Y(te, B(k).nav.logo?.radius ?? 0);
					}, [
						() => Z("tip.webpAuto"),
						() => B(t) ? Z("ui.changeImage") : Z("ui.chooseImage"),
						() => Z("tip.nav.logoHeight"),
						() => Z("lbl.height"),
						() => Z("tip.nav.logoHeightMobile"),
						() => Z("lbl.onMobile"),
						() => Z("lbl.navSameAsDesktop"),
						() => Z("tip.nav.logoRadius"),
						() => Z("lbl.rounding")
					]), V("change", u, Co), V("change", _, (e) => xo({ size: Number(e.target.value) })), V("change", x, (e) => {
						let t = e.target.value;
						xo({ mobileSize: t === "" ? void 0 : ds(t, os, void 0) }), e.target.value = B(k).nav.logo?.mobileSize ?? "";
					}), V("change", te, (e) => xo({ radius: Number(e.target.value) })), U(e, n);
				};
				G(p, (e) => {
					(B(k).nav.logo?.type ?? "text") !== "text" && e(_);
				});
				var v = L(p, 2), y = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.order")), n = /* @__PURE__ */ A(() => B(k).nav.logo?.order ?? "image-first"), r = /* @__PURE__ */ A(() => [["image-first", Z("opt.logo.imageFirst")], ["text-first", Z("opt.logo.textFirst")]]);
						Cs(e, {
							get label() {
								return B(t);
							},
							get value() {
								return B(n);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => xo({ order: e })
						});
					}
				};
				G(v, (e) => {
					B(k).nav.logo?.type === "both" && e(y);
				}), D(o), D(n);
				var b = L(n, 2), x = P(b), ee = I(x, !0), te = L(x, 2), ne = P(te), re = P(ne), ie = I(re, !0), ae = L(re, 2), oe = P(ae), se = P(oe), T = I(se, !0), ce = L(se, 2);
				qr(ce, 21, () => [
					["bar", Z("opt.navVariant.bar")],
					["floating", Z("opt.navVariant.floating")],
					["floating-square", Z("opt.navVariant.floatingSquare")],
					["floating-tab", Z("opt.navVariant.floatingTab")],
					["side-left", Z("opt.navVariant.sideLeft")],
					["side-right", Z("opt.navVariant.sideRight")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = Ch();
					let o;
					var s = P(a);
					K(s, () => u[r()]);
					var c = I(L(s), !0);
					D(a), z(() => {
						o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(k).nav.variant ?? "bar") === r() }), X(a, "aria-pressed", (B(k).nav.variant ?? "bar") === r()), W(c, i());
					}), V("click", a, () => Tc(r())), U(e, a);
				}), D(ce), D(oe);
				var le = L(oe, 2), ue = (e) => {
					var t = Th(), n = F(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.navPillWidth")), t = /* @__PURE__ */ A(() => Z("tip.nav.pillWidth")), r = /* @__PURE__ */ A(() => B(k).nav.style?.pillWidth === "content" ? "content" : "custom"), i = /* @__PURE__ */ A(() => [["content", Z("opt.pillWidth.content")], ["custom", Z("opt.pillWidth.custom")]]);
						Cs(n, {
							get label() {
								return B(e);
							},
							get title() {
								return B(t);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => Ps("pillWidth", e === "content" ? "content" : void 0)
						});
					}
					var r = L(n, 2), i = (e) => {
						var t = wh(), n = P(t), r = I(n, !0), i = L(n, 2);
						J(i), D(t), z((e, n) => {
							X(t, "title", e), W(r, n), X(i, "min", es.min), X(i, "max", es.max), X(i, "step", es.step), Y(i, typeof B(k).nav.style?.pillWidth == "number" ? B(k).nav.style.pillWidth : "");
						}, [() => Z("tip.nav.pillWidthPx"), () => Z("lbl.navPillWidthPx")]), V("change", i, (e) => $(e, "pillWidth", es)), U(e, t);
					};
					G(r, (e) => {
						B(k).nav.style?.pillWidth !== "content" && e(i);
					});
					var a = L(r, 2), o = P(a), s = I(o, !0), c = L(o, 2);
					J(c), D(a), z((e, t) => {
						X(a, "title", e), W(s, t), X(c, "min", is.min), X(c, "max", is.max), X(c, "step", is.step), X(c, "placeholder", B(k).nav.variant === "floating-square" ? "0" : ""), Y(c, typeof B(k).nav.style?.radius == "number" ? B(k).nav.style.radius : "");
					}, [() => Z("tip.nav.radius"), () => Z("lbl.navRadius")]), V("change", c, (e) => $(e, "radius", is)), U(e, t);
				};
				G(le, (e) => {
					B(Is) && e(ue);
				});
				var de = L(le, 2), E = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navPlacement")), n = /* @__PURE__ */ A(() => B(k).nav.style?.sidePlacement ?? "top"), r = /* @__PURE__ */ A(() => [
							["top", Z("opt.place.top")],
							["middle", Z("opt.place.middle")],
							["bottom", Z("opt.place.bottom")]
						]);
						Cs(e, {
							get label() {
								return B(t);
							},
							get value() {
								return B(n);
							},
							get options() {
								return B(r);
							},
							onchange: (e) => Ps("sidePlacement", e === "top" ? void 0 : e)
						});
					}
				}, fe = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navPlacement")), n = /* @__PURE__ */ A(() => Z("opt.layout.leftAfterLogo")), r = /* @__PURE__ */ A(() => B(k).nav.layout ?? "right"), i = /* @__PURE__ */ A(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						Cs(e, {
							get label() {
								return B(t);
							},
							get title() {
								return B(n);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => ks(e)
						});
					}
				};
				G(de, (e) => {
					B(Fs) ? e(E) : e(fe, -1);
				});
				var pe = L(de, 2), me = (e) => {
					var t = Eh(), n = F(t), r = P(n);
					J(r);
					var i = L(r);
					D(n);
					var a = L(n, 2), o = P(a);
					J(o);
					var s = L(o);
					D(a), z((e, t, c, l) => {
						X(n, "title", e), xi(r, B(k).nav.style?.glow === !0), W(i, ` ${t ?? ""}`), X(a, "title", c), xi(o, B(k).nav.style?.topGap !== !1), W(s, ` ${l ?? ""}`);
					}, [
						() => Z("tip.nav.glow"),
						() => Z("lbl.navGlow"),
						() => Z("tip.nav.topGap"),
						() => Z("lbl.navTopGap")
					]), V("change", r, (e) => Ec(e.target.checked)), V("change", o, (e) => Oc(e.target.checked)), U(e, t);
				};
				G(pe, (e) => {
					B(Is) && e(me);
				});
				var he = L(pe, 2), ge = (e) => {
					var t = Eh(), n = F(t), r = P(n);
					J(r);
					var i = L(r);
					D(n);
					var a = L(n, 2), o = P(a);
					J(o);
					var s = L(o);
					D(a), z((e, t, c, l) => {
						X(n, "title", e), xi(r, B(k).nav.overlay === !0), W(i, ` ${t ?? ""}`), X(a, "title", c), xi(o, B(k).nav.style?.inset !== !1), W(s, ` ${l ?? ""}`);
					}, [
						() => Z("tip.nav.overlay"),
						() => Z("lbl.navOverlay"),
						() => Z("tip.nav.inset"),
						() => Z("lbl.navInset")
					]), V("change", r, (e) => Ja("nav", () => {
						e.target.checked ? B(k).nav.overlay = !0 : delete B(k).nav.overlay;
					})), V("change", o, (e) => Ps("inset", e.target.checked ? void 0 : !1)), U(e, t);
				};
				G(he, (e) => {
					!B(Is) && !B(Fs) && e(ge);
				});
				var _e = L(he, 2), ve = (e) => {
					var t = Dh(), n = F(t);
					{
						let e = /* @__PURE__ */ A(() => Z("lbl.textAlign")), t = /* @__PURE__ */ A(() => Z("tip.nav.sideAlign")), r = /* @__PURE__ */ A(() => B(k).nav.style?.sideAlign ?? "left"), i = /* @__PURE__ */ A(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						Cs(n, {
							get label() {
								return B(e);
							},
							get title() {
								return B(t);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => Ps("sideAlign", e === "left" ? void 0 : e)
						});
					}
					var r = L(n, 2), i = P(r), a = I(i, !0), o = L(i, 2);
					J(o), D(r), z((e, t) => {
						X(r, "title", e), W(a, t), X(o, "min", as.min), X(o, "max", as.max), Y(o, B(k).nav.style?.width ?? 250);
					}, [() => Z("tip.nav.colWidth"), () => Z("lbl.navColWidth")]), V("change", o, (e) => {
						let t = ds(e.target.value, as, 250);
						Ps("width", t === 250 ? void 0 : t), e.target.value = B(k).nav.style?.width ?? 250;
					}), U(e, t);
				};
				G(_e, (e) => {
					B(Fs) && e(ve);
				}), D(ae), D(ne);
				var ye = L(ne, 4), be = P(ye), xe = I(be, !0), Se = L(be, 2), Ce = P(Se);
				qr(Ce, 20, () => cs, (e) => e, (e, t) => {
					var n = rh();
					let r;
					var i = I(n, !0);
					z((e) => {
						r = q(n, 1, "svelte-1n46o8q", null, r, { on: B(zs) === t }), W(i, e);
					}, [() => Z(`opt.size.${t}`)]), V("click", n, () => Gs(t)), U(e, n);
				}), D(Ce);
				var we = L(Ce, 2), Te = P(we), Ee = I(Te, !0), Oe = L(Te, 2), ke = P(Oe), Ae = (e) => {
					var t = Oh(), n = P(t), r = I(n, !0), i = L(n, 2);
					J(i);
					var a = L(i, 2);
					J(a), D(t), z((e, n) => {
						X(t, "title", e), W(r, n), X(i, "min", Xo.min), X(i, "max", Xo.max), X(i, "step", Xo.step), Y(i, B(Bs)), X(a, "min", Xo.min), X(a, "max", Xo.max), Y(a, B(Bs));
					}, [() => Z("tip.nav.thickness"), () => Z("lbl.navThickness")]), V("input", i, (e) => Ps("padY", e.target.valueAsNumber)), V("change", a, (e) => cc(e, "padY", Xo)), U(e, t);
				};
				G(ke, (e) => {
					B(Fs) || e(Ae);
				});
				var je = L(ke, 2), Me = P(je), Ne = I(Me, !0), Pe = L(Me, 2);
				J(Pe);
				var Fe = L(Pe, 2);
				J(Fe), D(je);
				var Ie = L(je, 2), Le = (e) => {
					var t = kh(), n = P(t), r = P(n), i = I(r, !0), a = L(r, 2);
					J(a), D(n);
					var o = L(n, 2), s = P(o), c = I(s, !0), l = L(s, 2);
					J(l), D(o), D(t), z((e, t, r, s, u, d) => {
						X(n, "title", e), W(i, t), X(a, "min", Qo.min), X(a, "max", Qo.max), X(a, "placeholder", r), Y(a, B(k).nav.style?.padX ?? ""), X(o, "title", s), W(c, u), X(l, "min", $o.min), X(l, "max", $o.max), X(l, "placeholder", d), Y(l, B(k).nav.style?.gap ?? "");
					}, [
						() => Z("tip.nav.padX"),
						() => Z("lbl.navPadX"),
						() => Z("common.auto"),
						() => Z("tip.nav.gap"),
						() => Z("lbl.navGap"),
						() => Z("common.auto")
					]), V("change", a, (e) => $(e, "padX", Qo)), V("change", l, (e) => $(e, "gap", $o)), U(e, t);
				};
				G(Ie, (e) => {
					B(Fs) || e(Le);
				}), D(Oe), D(we), D(Se), D(ye);
				var Re = L(ye, 4), ze = P(Re), Be = I(ze, !0), Ve = L(ze, 2), He = P(Ve), Ue = (e) => {
					var t = jh(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2);
					qr(a, 21, () => [
						["", Z("common.none")],
						["bottom", Z("opt.navBorder.bottom")],
						["top", Z("opt.navBorder.top")],
						["both", Z("opt.navBorder.both")],
						["all", Z("opt.navBorder.all")]
					], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(B(t), 2));
						let r = () => B(n)[0], i = () => B(n)[1];
						var a = Ch();
						let o;
						var s = P(a);
						K(s, () => d[r()]);
						var c = I(L(s), !0);
						D(a), z(() => {
							o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(k).nav.style?.border?.side ?? "") === r() }), X(a, "aria-pressed", (B(k).nav.style?.border?.side ?? "") === r()), W(c, i());
						}), V("click", a, () => Ps("border", r() ? {
							...B(k).nav.style?.border ?? {},
							side: r()
						} : void 0)), U(e, a);
					}), D(a), D(n);
					var o = L(n, 2), s = (e) => {
						var t = Ah(), n = P(t), r = I(n, !0), i = L(n, 2);
						J(i);
						var a = L(i, 2), o = I(a, !0), s = L(a, 2);
						{
							let e = /* @__PURE__ */ A(() => B(k).nav.style.border.color ?? "text"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.borderColorPick"));
							va(s, {
								get value() {
									return B(e);
								},
								get tokens() {
									return B(t);
								},
								get label() {
									return B(n);
								},
								onchange: (e) => Ps("border", {
									...B(k).nav.style.border,
									color: e
								})
							});
						}
						D(t), z((e, t, s, c, l) => {
							X(n, "title", e), W(r, t), X(i, "title", s), Y(i, B(k).nav.style.border.width ?? 1), X(a, "title", c), W(o, l);
						}, [
							() => Z("tip.nav.borderWidth"),
							() => Z("lbl.navBorderWidth"),
							() => Z("tip.nav.borderWidth"),
							() => Z("tip.nav.borderColorPick"),
							() => Z("lbl.navBorderColor")
						]), V("change", i, (e) => {
							let t = ds(e.target.value, {
								min: 1,
								max: 8
							}, 1), n = { ...B(k).nav.style.border };
							t === 1 ? delete n.width : n.width = t, Ps("border", n), e.target.value = B(k).nav.style.border.width ?? 1;
						}), U(e, t);
					};
					G(o, (e) => {
						B(k).nav.style?.border?.side && e(s);
					}), z((e, t, r) => {
						X(n, "title", e), W(i, t), X(a, "aria-label", r);
					}, [
						() => Z("tip.nav.border"),
						() => Z("lbl.navBorder"),
						() => Z("lbl.navBorder")
					]), U(e, t);
				};
				G(He, (e) => {
					B(Fs) || e(Ue);
				});
				var We = L(He, 2), Ge = (e) => {
					{
						let t = /* @__PURE__ */ A(() => Z("lbl.navShadow")), n = /* @__PURE__ */ A(() => Z("tip.nav.shadow")), r = /* @__PURE__ */ A(() => B(k).nav.style?.shadow ?? ""), i = /* @__PURE__ */ A(() => [
							["", Z("common.none")],
							["soft", Z("opt.navShadow.soft")],
							["strong", Z("opt.navShadow.strong")]
						]);
						Cs(e, {
							get label() {
								return B(t);
							},
							get title() {
								return B(n);
							},
							get value() {
								return B(r);
							},
							get options() {
								return B(i);
							},
							onchange: (e) => Ps("shadow", e || void 0)
						});
					}
				};
				G(We, (e) => {
					!B(Is) && !B(Fs) && e(Ge);
				}), D(Ve), D(Re);
				var Ke = L(Re, 4), qe = P(Ke), Je = I(qe, !0), Ye = L(qe, 2), Xe = P(Ye), Ze = (e) => {
					var t = Ph(), n = P(t), r = I(n, !0), i = L(n, 2), a = P(i);
					J(a);
					var o = L(a);
					D(i);
					var s = L(i, 2), c = (e) => {
						var t = Nh(), n = F(t);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.navScroll")), t = /* @__PURE__ */ A(() => Z("tip.nav.scroll")), r = /* @__PURE__ */ A(() => B(k).nav.scroll ?? "none"), i = /* @__PURE__ */ A(() => [
								["none", Z("opt.scroll.none")],
								["shrink", Z("opt.scroll.shrink")],
								["hide", Z("opt.scroll.hide")]
							]);
							Cs(n, {
								get label() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => Ja("nav", () => {
									e === "none" ? delete B(k).nav.scroll : B(k).nav.scroll = e;
								})
							});
						}
						var r = L(n, 2), i = (e) => {
							var t = Mh(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2);
							J(a);
							var o = I(L(a, 2));
							D(n);
							var s = L(n, 2), c = P(s), l = I(c, !0), u = L(c, 2);
							J(u);
							var d = I(L(u, 2));
							D(s);
							var f = L(s, 2), p = P(f), m = I(p, !0), h = L(p, 2);
							J(h);
							var g = I(L(h, 2));
							D(f);
							var _ = L(f, 2), v = (e) => {
								var t = Fp(), n = P(t);
								J(n);
								var r = L(n);
								D(t), z((e, i) => {
									X(t, "title", e), xi(n, B(k).nav.style?.shrinkLogo === !0), W(r, ` ${i ?? ""}`);
								}, [() => Z("tip.nav.shrinkLogo"), () => Z("lbl.navShrinkLogo")]), V("change", n, (e) => Ps("shrinkLogo", e.target.checked ? !0 : void 0)), U(e, t);
							};
							G(_, (e) => {
								(B(k).nav.logo?.type ?? "text") !== "text" && e(v);
							}), z((e, t, r, c, p, _, v, y) => {
								X(n, "title", e), W(i, t), Y(a, r), W(o, `${c ?? ""}%`), X(s, "title", p), W(l, _), Y(u, B(k).nav.style?.shrinkAt ?? 80), W(d, `${B(k).nav.style?.shrinkAt ?? 80 ?? ""} px`), X(f, "title", v), W(m, y), Y(h, B(k).nav.style?.shrinkMs ?? 220), W(g, `${B(k).nav.style?.shrinkMs ?? 220 ?? ""} ms`);
							}, [
								() => Z("tip.nav.shrinkTo"),
								() => Z("lbl.navShrinkTo"),
								() => Math.round((B(k).nav.style?.shrinkTo ?? .5) * 100),
								() => Math.round((B(k).nav.style?.shrinkTo ?? .5) * 100),
								() => Z("tip.nav.shrinkAt"),
								() => Z("lbl.navShrinkAt"),
								() => Z("tip.nav.shrinkMs"),
								() => Z("lbl.navShrinkMs")
							]), V("input", a, (e) => uc(e.target.valueAsNumber)), V("input", u, (e) => dc(e.target.valueAsNumber)), V("input", h, (e) => fc(e.target.valueAsNumber)), U(e, t);
						};
						G(r, (e) => {
							B(k).nav.scroll === "shrink" && e(i);
						}), U(e, t);
					};
					G(s, (e) => {
						B(k).nav.sticky !== !1 && e(c);
					});
					var l = L(s, 2), u = P(l);
					J(u);
					var d = L(u);
					D(l), D(t), z((e, t, n, s, c) => {
						W(r, e), X(i, "title", t), xi(a, B(k).nav.sticky !== !1), W(o, ` ${n ?? ""}`), X(l, "title", s), xi(u, B(k).nav.style?.atTop === "clear"), W(d, ` ${c ?? ""}`);
					}, [
						() => Z("group.navScrolling"),
						() => Z("tip.nav.sticky"),
						() => Z("lbl.navSticky"),
						() => Z("tip.nav.atTop"),
						() => Z("lbl.navAtTop")
					]), V("change", a, (e) => Ja("nav", () => {
						B(k).nav.sticky = e.target.checked;
					})), V("change", u, (e) => Ps("atTop", e.target.checked ? "clear" : void 0)), U(e, t);
				};
				G(Xe, (e) => {
					B(Fs) || e(Ze);
				}), D(Ye), D(Ke);
				var Qe = L(Ke, 4), $e = P(Qe), O = I($e, !0), et = L($e, 2), nt = P(et), rt = P(nt), it = (e) => {
					var t = Fh(), n = P(t), r = I(n, !0), i = L(n, 2);
					J(i), D(t), z((e, n, a) => {
						X(t, "title", e), W(r, n), X(i, "min", Xo.min), X(i, "max", Xo.max), X(i, "placeholder", a), Y(i, B(k).nav.style?.mobile?.padY ?? "");
					}, [
						() => Z("tip.nav.thickness"),
						() => Z("lbl.navThickness"),
						() => Z("lbl.navSameAsDesktop")
					]), V("change", i, (e) => lc(e, "padY", Xo)), U(e, t);
				};
				G(rt, (e) => {
					B(Fs) || e(it);
				});
				var at = L(rt, 2), ot = P(at), st = I(ot, !0), ct = L(ot, 2);
				J(ct), D(at), D(nt);
				var lt = L(nt, 2), ut = P(lt), dt = P(ut), ft = I(dt, !0), pt = L(dt, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobile?.size ?? ""), t = /* @__PURE__ */ A(() => [["", Z("lbl.navSameAsDesktop")], ...cs.map((e) => [e, Z(`opt.size.${e}`)])]);
					Q(pt, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Ks("size", e || void 0)
					});
				}
				D(ut);
				var mt = L(ut, 2), ht = P(mt), gt = I(ht, !0), _t = L(ht, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobile?.layout ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("lbl.navSameAsDesktop")],
						["left", Z("common.left")],
						["center", Z("common.center")],
						["right", Z("common.right")]
					]);
					Q(_t, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Ks("layout", e || void 0)
					});
				}
				D(mt), D(lt);
				var vt = L(lt, 2), yt = P(vt), bt = P(yt), xt = I(bt, !0), St = L(bt, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobile?.tools?.side ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("lbl.navSameAsDesktop")],
						["start", Z("common.left")],
						["end", Z("common.right")]
					]);
					Q(St, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Ks("tools", e ? { side: e } : void 0)
					});
				}
				D(yt);
				var Ct = L(yt, 2), wt = (e) => {
					var t = Ih(), n = P(t), r = I(n, !0), i = L(n, 2);
					{
						let e = /* @__PURE__ */ A(() => qs("overlay")), t = /* @__PURE__ */ A(() => [
							["", Z("lbl.navSameAsDesktop")],
							["on", Z("common.on")],
							["off", Z("common.off")]
						]);
						Q(i, {
							filled: !0,
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Js("overlay", e)
						});
					}
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n);
					}, [() => Z("tip.nav.mobileOverlay"), () => Z("lbl.navOverlay")]), U(e, t);
				};
				G(Ct, (e) => {
					!B(Is) && !B(Fs) && e(wt);
				}), D(vt);
				var Tt = L(vt, 2), Et = P(Tt), Dt = P(Et), Ot = I(Dt, !0), kt = L(Dt, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobile?.border?.side ?? ""), t = /* @__PURE__ */ A(() => [
						["", Z("lbl.navSameAsDesktop")],
						["none", Z("common.none")],
						["bottom", Z("opt.navBorder.bottom")],
						["top", Z("opt.navBorder.top")],
						["both", Z("opt.navBorder.both")],
						["all", Z("opt.navBorder.all")]
					]);
					Q(kt, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Ys(e)
					});
				}
				D(Et), D(Tt);
				var At = L(Tt, 2), jt = (e) => {
					var t = Ah(), n = P(t), r = I(n, !0), i = L(n, 2);
					J(i);
					var a = L(i, 2), o = I(a, !0), s = L(a, 2);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style.mobile.border.color ?? "text"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.borderColorPick"));
						va(s, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Ks("border", {
								...B(k).nav.style.mobile.border,
								color: e
							})
						});
					}
					D(t), z((e, t, s, c, l) => {
						X(n, "title", e), W(r, t), X(i, "title", s), Y(i, B(k).nav.style.mobile.border.width ?? 1), X(a, "title", c), W(o, l);
					}, [
						() => Z("tip.nav.borderWidth"),
						() => Z("lbl.navBorderWidth"),
						() => Z("tip.nav.borderWidth"),
						() => Z("tip.nav.borderColorPick"),
						() => Z("lbl.navBorderColor")
					]), V("change", i, (e) => {
						let t = ds(e.target.value, {
							min: 1,
							max: 8
						}, 1), n = { ...B(k).nav.style.mobile.border };
						t === 1 ? delete n.width : n.width = t, Ks("border", n), e.target.value = B(k).nav.style.mobile.border.width ?? 1;
					}), U(e, t);
				};
				G(At, (e) => {
					B(k).nav.style?.mobile?.border?.side && B(k).nav.style.mobile.border.side !== "none" && e(jt);
				});
				var Mt = L(At, 2), Nt = P(Mt), Pt = P(Nt), Ft = I(Pt, !0), It = L(Pt, 2);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobileMenu ?? "dropdown"), t = /* @__PURE__ */ A(() => [["dropdown", Z("opt.mobileMenu.dropdown")], ["sheet", Z("opt.mobileMenu.sheet")]]);
					Q(It, {
						filled: !0,
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Ps("mobileMenu", e === "dropdown" ? void 0 : e)
					});
				}
				D(Nt);
				var Lt = L(Nt, 2), Rt = (e) => {
					var t = Ih(), n = P(t), r = I(n, !0), i = L(n, 2);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.sheetMotion ?? "top"), t = /* @__PURE__ */ A(() => [
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
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Ps("sheetMotion", e === "top" ? void 0 : e)
						});
					}
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n);
					}, [() => Z("tip.nav.sheetMotion"), () => Z("lbl.sheetMotion")]), U(e, t);
				};
				G(Lt, (e) => {
					B(k).nav.style?.mobileMenu === "sheet" && e(Rt);
				}), D(Mt);
				var zt = L(Mt, 2), Bt = (e) => {
					var t = Lh(), n = F(t), r = P(n);
					J(r);
					var i = L(r);
					D(n);
					var a = L(n, 2), o = (e) => {
						var t = Fp(), n = P(t);
						J(n);
						var r = L(n);
						D(t), z((e, i) => {
							X(t, "title", e), xi(n, B(k).nav.style?.sheetTheme === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetTheme"), () => Z("lbl.sheetTheme")]), V("change", n, (e) => Ps("sheetTheme", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(a, (e) => {
						B(k).theme?.alt?.tokens && B(k).nav.style?.tools?.theme !== !1 && e(o);
					});
					var s = L(a, 2), c = (e) => {
						var t = Fp(), n = P(t);
						J(n);
						var r = L(n);
						D(t), z((e, i) => {
							X(t, "title", e), xi(n, B(k).nav.style?.sheetCart === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetCart"), () => Z("lbl.sheetCart")]), V("change", n, (e) => Ps("sheetCart", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(s, (e) => {
						B(k).nav.cart?.show && e(c);
					});
					var l = L(s, 2), u = (e) => {
						var t = Fp(), n = P(t);
						J(n);
						var r = L(n);
						D(t), z((e, i) => {
							X(t, "title", e), xi(n, B(k).nav.style?.sheetAnnounce === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetAnnounce"), () => Z("lbl.sheetAnnounce")]), V("change", n, (e) => Ps("sheetAnnounce", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(l, (e) => {
						B(k).nav.announcement?.show && e(u);
					});
					var d = L(l, 2), f = (e) => {
						var t = Fp(), n = P(t);
						J(n);
						var r = L(n);
						D(t), z((e, i) => {
							X(t, "title", e), xi(n, B(k).nav.style?.sheetToolLabels === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.sheetToolLabels"), () => Z("lbl.sheetToolLabels")]), V("change", n, (e) => Ps("sheetToolLabels", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(d, (e) => {
						(B(k).nav.style?.sheetTheme || B(k).nav.style?.sheetCart) && e(f);
					});
					var p = L(d, 2), m = P(p), h = I(m, !0), g = L(m, 2);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.sheet?.bg ?? "surface"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.sheetBg"));
						va(g, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => sc("bg", e)
						});
					}
					var _ = L(g, 2);
					J(_);
					var v = I(L(_, 2));
					D(p);
					var y = L(p, 2), b = P(y);
					J(b);
					var x = L(b);
					D(y);
					var S = L(y, 2), C = P(S), ee = L(C);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.sheet?.textColor ?? B(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.sheetTextColorPick"));
						va(ee, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => sc("textColor", e)
						});
					}
					D(S), z((e, t, a, o, s, c, l, u, d, f) => {
						X(n, "title", e), xi(r, B(k).nav.style?.sheetLogo === !0), W(i, ` ${t ?? ""}`), X(p, "title", a), W(h, o), X(_, "title", s), Y(_, c), W(v, `${l ?? ""}%`), X(y, "title", u), xi(b, B(k).nav.style?.sheet?.blur ?? B(k).nav.style?.blur !== !1), W(x, ` ${d ?? ""}`), W(C, `${f ?? ""} `);
					}, [
						() => Z("tip.nav.sheetLogo"),
						() => Z("lbl.sheetLogo"),
						() => Z("tip.nav.sheetBg"),
						() => Z("lbl.background"),
						() => Z("tip.nav.sheetOpacity"),
						() => Math.round((B(k).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Math.round((B(k).nav.style?.sheet?.bgOpacity ?? .85) * 100),
						() => Z("tip.nav.sheetBlur"),
						() => Z("lbl.sheetBlur"),
						() => Z("lbl.textColor")
					]), V("change", r, (e) => Ps("sheetLogo", e.target.checked ? !0 : void 0)), V("input", _, (e) => sc("bgOpacity", e.target.valueAsNumber / 100)), V("change", b, (e) => sc("blur", e.target.checked)), U(e, t);
				};
				G(zt, (e) => {
					B(k).nav.style?.mobileMenu === "sheet" && e(Bt);
				});
				var Vt = L(zt, 2), Ht = (e) => {
					var t = Ih(), n = P(t), r = I(n, !0), i = L(n, 2);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.mobileSubs ?? "collapsed"), t = /* @__PURE__ */ A(() => [["collapsed", Z("opt.mobileSubs.collapsed")], ["expanded", Z("opt.mobileSubs.expanded")]]);
						Q(i, {
							filled: !0,
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Ps("mobileSubs", e === "collapsed" ? void 0 : e)
						});
					}
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n);
					}, [() => Z("tip.nav.mobileSubs"), () => Z("lbl.mobileSubs")]), U(e, t);
				}, Ut = /* @__PURE__ */ A(() => B(k).nav.items?.some((e) => e.children?.length));
				G(Vt, (e) => {
					B(Ut) && e(Ht);
				}), D(et), D(Qe);
				var Wt = L(Qe, 4), Gt = P(Wt), Kt = I(Gt, !0), j = L(Gt, 2), qt = P(j), Jt = P(qt), Yt = I(Jt, !0), Xt = L(Jt, 2);
				qr(Xt, 21, () => [
					["standard", Z("opt.hover.standard")],
					["underline", Z("opt.hover.underline")],
					["pill", Z("opt.hover.pill")],
					["lift-plain", Z("opt.hover.liftPlain")],
					["lift", Z("opt.hover.lift")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = Rh();
					let o;
					var s = P(a), c = I(s, !0), l = I(L(s), !0);
					D(a), z((e) => {
						o = q(a, 1, "tile hover-tile svelte-1n46o8q", null, o, { on: (B(k).nav.style?.hover ?? "standard") === r() }), X(a, "aria-pressed", (B(k).nav.style?.hover ?? "standard") === r()), q(s, 1, `hover-sample hover-${r() ?? ""}`, "svelte-1n46o8q"), W(c, e), W(l, i());
					}, [() => Z("seed.home")]), V("click", a, () => Nc(r())), U(e, a);
				}), D(Xt), D(qt);
				var Zt = L(qt, 2), N = (e) => {
					var t = zh(), n = P(t), r = I(n, !0), i = L(n, 2);
					J(i);
					var a = I(L(i, 2));
					D(t), z((e, n, o) => {
						X(t, "title", e), W(r, n), Y(i, B(k).nav.style?.hoverGlow ?? .6), W(a, `${o ?? ""}%`);
					}, [
						() => Z("tip.nav.hoverGlow"),
						() => Z("lbl.glowStrength"),
						() => Math.round((B(k).nav.style?.hoverGlow ?? .6) * 100)
					]), V("input", i, (e) => Ps("hoverGlow", Number(e.target.value))), U(e, t);
				};
				G(Zt, (e) => {
					B(k).nav.style?.hover === "lift" && e(N);
				});
				var Qt = L(Zt, 2), $t = P(Qt), en = (e) => {
					var t = mm(), n = P(t);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ A(vi);
						va(n, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(mc)[1];
							},
							onchange: (e) => Ps("hoverColor", e)
						});
					}
					var r = I(L(n, 2), !0);
					D(t), z(() => {
						X(t, "title", B(mc)[1]), W(r, B(mc)[0]);
					}), U(e, t);
				};
				G($t, (e) => {
					B(mc) && e(en);
				});
				var tn = L($t, 2), nn = P(tn);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.hoverTextColorPick"));
					va(nn, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => Ps("hoverTextColor", e)
					});
				}
				var rn = I(L(nn, 2), !0);
				D(tn);
				var an = L(tn, 2), on = P(an);
				{
					let e = /* @__PURE__ */ A(() => B(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.textColorPick"));
					va(on, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => Ps("textColor", e)
					});
				}
				var sn = I(L(on, 2), !0);
				D(an), D(Qt);
				var cn = L(Qt, 2), ln = P(cn);
				J(ln);
				var R = L(ln);
				D(cn), D(j), D(Wt);
				var un = L(Wt, 4), dn = P(un), fn = I(dn, !0), pn = L(dn, 2), mn = P(pn);
				a(mn, () => fi, () => B(k).nav?.style?.background?.layers ?? []), D(pn), D(un), D(te), D(b);
				var hn = L(b, 2), gn = P(hn), _n = I(gn, !0), vn = L(gn, 2), yn = P(vn), bn = P(yn);
				J(bn);
				var xn = L(bn);
				D(yn);
				var Sn = L(yn, 2), Cn = (e) => {
					var t = Vh(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2);
					J(a), D(n);
					var o = L(n, 2), s = P(o), c = L(s);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.announcement?.page ?? (B(k).nav.announcement?.href === void 0 ? "" : "custom")), t = /* @__PURE__ */ A(() => [
							["", Z("common.none")],
							...B(k).pages.map((e) => [e.id, e.title]),
							["custom", Z("opt.announceLink.custom")]
						]);
						Q(c, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Ja("edit:nav-announce-link", () => {
								let t = { ...B(k).nav.announcement ?? {} };
								delete t.page, delete t.href, e === "custom" ? t.href = "" : e && (t.page = e), B(k).nav.announcement = t;
							})
						});
					}
					D(o);
					var l = L(o, 2), u = (e) => {
						var t = Bh(), n = P(t), r = I(n, !0), i = L(n, 2);
						J(i), D(t), z((e, n) => {
							X(t, "title", e), W(r, n), Y(i, B(k).nav.announcement?.href ?? "");
						}, [() => Z("tip.nav.announceHref"), () => Z("lbl.announceHref")]), V("change", i, (e) => Xs("href", e.target.value.trim())), U(e, t);
					};
					G(l, (e) => {
						B(k).nav.announcement?.href !== void 0 && !B(k).nav.announcement?.page && e(u);
					});
					var d = L(l, 2), f = (e) => {
						var t = Fp(), n = P(t);
						J(n);
						var r = L(n);
						D(t), z((e, i) => {
							X(t, "title", e), xi(n, B(k).nav.announcement?.sticky !== !1), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.announceSticky"), () => Z("lbl.announceSticky")]), V("change", n, (e) => Xs("sticky", e.target.checked ? void 0 : !1)), U(e, t);
					};
					G(d, (e) => {
						B(k).nav.sticky !== !1 && !B(Is) && !B(Fs) && !B(k).nav.overlay && e(f);
					});
					var p = L(d, 2), m = (e) => {
						var t = Fp(), n = P(t);
						J(n);
						var r = L(n);
						D(t), z((e, i) => {
							X(t, "title", e), xi(n, B(k).nav.announcement?.followNav === !0), W(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.announceFollowNav"), () => Z("lbl.announceFollowNav")]), V("change", n, (e) => Xs("followNav", e.target.checked ? !0 : void 0)), U(e, t);
					};
					G(p, (e) => {
						B(k).nav.scroll === "hide" && B(k).nav.sticky !== !1 && !B(Fs) && B(k).nav.announcement?.sticky !== !1 && e(m);
					});
					var h = L(p, 2), g = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Z("lbl.announcePlace")), n = /* @__PURE__ */ A(() => Z("tip.nav.announcePlace")), r = /* @__PURE__ */ A(() => B(k).nav.announcement?.place ?? "nav"), i = /* @__PURE__ */ A(() => [
								["nav", Z("opt.announcePlace.nav")],
								["page", Z("opt.announcePlace.page")],
								["content", Z("opt.announcePlace.content")]
							]);
							Cs(e, {
								get label() {
									return B(t);
								},
								get title() {
									return B(n);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => Xs("place", e === "nav" ? void 0 : e)
							});
						}
					};
					G(h, (e) => {
						B(Fs) && e(g);
					});
					var _ = L(h, 2), v = P(_);
					J(v);
					var y = L(v);
					D(_);
					var b = L(_, 2), x = (e) => {
						var t = Lp(), n = I(t, !0);
						z((e, r) => {
							X(t, "title", e), W(n, r);
						}, [() => Z("tip.nav.announceShowAgain"), () => Z("lbl.announceShowAgain")]), V("click", t, () => tt?.sendAnnounceReset()), U(e, t);
					};
					G(b, (e) => {
						B(k).nav.announcement?.dismiss !== !1 && e(x);
					});
					var S = L(b, 2), C = P(S), ee = L(C);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.announcement?.color ?? "accent"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.announceColor"));
						va(ee, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Xs("color", e)
						});
					}
					D(S);
					var te = L(S, 2), w = P(te), ne = L(w);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.announcement?.textColor ?? "accent-text"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.announceTextColor"));
						va(ne, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Xs("textColor", e)
						});
					}
					D(te), z((e, t, r, c, l, u, d, f, p, m) => {
						X(n, "title", e), W(i, t), Y(a, B(k).nav.announcement?.text ?? ""), X(o, "title", r), W(s, `${c ?? ""} `), X(_, "title", l), xi(v, B(k).nav.announcement?.dismiss !== !1), W(y, ` ${u ?? ""}`), X(S, "title", d), W(C, `${f ?? ""} `), X(te, "title", p), W(w, `${m ?? ""} `);
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
					]), V("change", a, (e) => Xs("text", e.target.value.trim() || void 0)), V("change", v, (e) => Xs("dismiss", e.target.checked ? void 0 : !1)), U(e, t);
				};
				G(Sn, (e) => {
					B(k).nav.announcement?.show && e(Cn);
				}), D(vn), D(hn);
				var wn = L(hn, 2), Tn = P(wn), En = I(Tn, !0), Dn = L(Tn, 2);
				{
					let e = (e, t = f, n = f) => {
						var r = Hh(), i = P(r);
						K(i, () => w.up, !0), D(i);
						var a = L(i, 2);
						K(a, () => w.down, !0), D(a), D(r), z((e, t) => {
							X(i, "title", e), i.disabled = n() === 0, X(a, "title", t), a.disabled = n() === B(js).length - 1;
						}, [() => Z("tip.moveUp"), () => Z("tip.moveDown")]), V("click", i, (e) => {
							e.preventDefault(), e.stopPropagation(), Ms(t(), -1);
						}), V("click", a, (e) => {
							e.preventDefault(), e.stopPropagation(), Ms(t(), 1);
						}), U(e, r);
					};
					var On = P(Dn), kn = (e) => {
						var t = Nh(), n = F(t);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.toolsSide")), t = /* @__PURE__ */ A(() => Z("tip.nav.toolsSideColumn")), r = /* @__PURE__ */ A(() => B(k).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ A(() => [["start", Z("opt.toolsSide.top")], ["end", Z("opt.toolsSide.bottom")]]);
							Cs(n, {
								get label() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => Ns("side", e === "start" ? "start" : void 0)
							});
						}
						var r = L(n, 2);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.toolsAlign")), t = /* @__PURE__ */ A(() => Z("tip.nav.toolsAlign")), n = /* @__PURE__ */ A(() => B(k).nav.style?.tools?.align ?? "center"), i = /* @__PURE__ */ A(() => [
								["start", Z("opt.toolsAlign.start")],
								["center", Z("opt.toolsAlign.center")],
								["end", Z("opt.toolsAlign.end")],
								["spread", Z("opt.toolsAlign.spread")]
							]);
							Cs(r, {
								get label() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get value() {
									return B(n);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => Ns("align", e === "center" ? void 0 : e)
							});
						}
						U(e, t);
					}, An = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Z("lbl.toolsSide")), n = /* @__PURE__ */ A(() => Z("tip.nav.toolsSide")), r = /* @__PURE__ */ A(() => B(k).nav.style?.tools?.side ?? "end"), i = /* @__PURE__ */ A(() => [["start", Z("opt.toolsSide.start")], ["end", Z("opt.toolsSide.end")]]);
							Cs(e, {
								get label() {
									return B(t);
								},
								get title() {
									return B(n);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => Ns("side", e === "start" ? "start" : void 0)
							});
						}
					};
					G(On, (e) => {
						B(Fs) ? e(kn) : e(An, -1);
					}), qr(L(On, 2), 18, () => B(js), (e) => e, (t, n, r) => {
						var i = Mr(), a = F(i), o = (t) => {
							var i = Mr(), a = F(i), o = (t) => {
								var i = Uh(), a = P(i), o = P(a), s = I(o, !0), c = L(o);
								e(c, () => n, () => B(r)), D(a);
								var l = L(a, 2), u = P(l);
								J(u);
								var d = L(u);
								D(l), D(i), z((e, t, n) => {
									W(s, e), X(l, "title", t), xi(u, B(k).nav.style?.tools?.theme !== !1), W(d, ` ${n ?? ""}`);
								}, [
									() => Z("lbl.themeToggle"),
									() => Z("tip.nav.themeToggle"),
									() => Z("lbl.showInMenu")
								]), V("change", u, (e) => Ns("theme", e.target.checked ? void 0 : !1)), U(t, i);
							};
							G(a, (e) => {
								B(k).theme?.alt?.tokens && e(o);
							}), U(t, i);
						}, s = (t) => {
							var i = Wh(), a = P(i), o = P(a), s = I(o, !0), c = L(o);
							e(c, () => n, () => B(r)), D(a);
							var l = L(a, 2), u = P(l);
							J(u);
							var d = L(u);
							D(l);
							var f = L(l, 2), p = (e) => {
								var t = Ih(), n = P(t), r = I(n, !0), i = L(n, 2);
								{
									let e = /* @__PURE__ */ A(() => B(k).nav.cart?.href ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.none")], ...B(k).pages.map((e) => [e.path, e.title])]);
									Q(i, {
										filled: !0,
										get value() {
											return B(e);
										},
										get options() {
											return B(t);
										},
										onchange: (e) => Ja("nav", () => {
											e ? B(k).nav.cart.href = e : delete B(k).nav.cart.href;
										})
									});
								}
								D(t), z((e, n) => {
									X(t, "title", e), W(r, n);
								}, [() => Z("tip.cart.checkout"), () => Z("lbl.checkoutPage")]), U(e, t);
							};
							G(f, (e) => {
								B(k).nav.cart?.show && e(p);
							}), D(i), z((e, t, n) => {
								W(s, e), X(l, "title", t), xi(u, B(k).nav.cart?.show === !0), W(d, ` ${n ?? ""}`);
							}, [
								() => Z("lbl.cart"),
								() => Z("tip.nav.cart"),
								() => Z("lbl.showInMenu")
							]), V("change", u, (e) => Ja("nav", () => {
								e.target.checked ? B(k).nav.cart = {
									...B(k).nav.cart ?? {},
									show: !0
								} : delete B(k).nav.cart;
							})), U(t, i);
						}, c = (t) => {
							var i = $h(), a = P(i), o = P(a), s = P(o, !0), c = L(s);
							e(c, () => n, () => B(r)), D(o), D(a);
							var l = L(a, 2), u = P(l), d = P(u);
							J(d);
							var f = L(d);
							D(u);
							var p = L(u, 2), m = (e) => {
								var t = Qh(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2);
								qr(a, 21, () => B(Sc), ([e, t]) => e, (e, t) => {
									var n = /* @__PURE__ */ A(() => h(B(t), 2));
									let r = () => B(n)[0], i = () => B(n)[1];
									var a = Ch();
									let o;
									var s = P(a);
									K(s, () => g[r()]);
									var c = I(L(s), !0);
									D(a), z(() => {
										o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(k).nav.launcher?.view ?? "grid") === r() }), X(a, "aria-pressed", (B(k).nav.launcher?.view ?? "grid") === r()), W(c, i());
									}), V("click", a, () => tc("view", r() === "grid" ? void 0 : r())), U(e, a);
								}), D(a), D(n);
								var o = L(n, 2);
								{
									let e = /* @__PURE__ */ A(() => Z("lbl.launcherMobileView")), t = /* @__PURE__ */ A(() => Z("tip.nav.launcherMobileView")), n = /* @__PURE__ */ A(() => B(k).nav.launcher?.mobileView ?? ""), r = /* @__PURE__ */ A(() => [["", Z("lbl.navSameAsDesktop")], ...B(Sc)]);
									Cs(o, {
										get label() {
											return B(e);
										},
										get title() {
											return B(t);
										},
										get value() {
											return B(n);
										},
										get options() {
											return B(r);
										},
										onchange: (e) => tc("mobileView", e || void 0)
									});
								}
								var s = L(o, 2), c = P(s), l = I(c, !0), u = L(c, 2);
								J(u);
								var d = I(L(u, 2), !0);
								D(s);
								var f = L(s, 2), p = P(f);
								J(p);
								var m = L(p);
								D(f);
								var _ = L(f, 2), v = (e) => {
									var t = Gh(), n = P(t), r = I(n, !0), i = L(n, 2);
									J(i), D(t), z((e, n, a) => {
										X(t, "title", e), W(r, n), X(i, "placeholder", a), Y(i, B(k).nav.launcher?.title ?? "");
									}, [
										() => Z("tip.nav.launcherTitleText"),
										() => Z("lbl.launcherTitle"),
										() => Z("ph.launcherTitle")
									]), V("change", i, (e) => tc("title", e.target.value.trim() || void 0)), U(e, t);
								};
								G(_, (e) => {
									B(k).nav.launcher?.showTitle !== !1 && e(v);
								});
								var y = L(_, 2), b = P(y), x = I(b, !0), S = L(b, 2), C = P(S);
								{
									let e = /* @__PURE__ */ A(() => B(k).nav.launcher?.icon ?? ""), t = /* @__PURE__ */ A(() => B(k).nav.launcher?.image ?? ""), n = /* @__PURE__ */ A($s), r = /* @__PURE__ */ A(() => Z("opt.launcherDots")), i = /* @__PURE__ */ A(() => Z("tip.nav.launcherIcon"));
									Oo(C, {
										get icon() {
											return B(e);
										},
										get image() {
											return B(t);
										},
										get images() {
											return B(n);
										},
										klass: "lbtn-mark",
										get noneLabel() {
											return B(r);
										},
										get label() {
											return B(i);
										},
										onpick: (e) => ec(null, e),
										onfile: (e) => oc(e, null),
										children: (e, t) => {
											var n = Mr(), r = F(n), i = (e) => {
												var t = Kh();
												z(() => X(t, "src", B(k).nav.launcher.image)), U(e, t);
											}, a = (e) => {
												var t = Mr();
												K(F(t), () => eo(B(k).nav.launcher.icon) || ""), U(e, t);
											}, o = (e) => {
												var t = Mr();
												K(F(t), () => Zs), U(e, t);
											};
											G(r, (e) => {
												B(k).nav.launcher?.image ? e(i) : B(k).nav.launcher?.icon ? e(a, 1) : e(o, -1);
											}), U(e, n);
										},
										$$slots: { default: !0 }
									});
								}
								var ee = L(C, 2), te = P(ee), ne = (e) => {
									var t = jr();
									z((e) => W(t, e), [() => Z("mp.ownImage")]), U(e, t);
								}, re = (e) => {
									var t = jr();
									z((e) => W(t, e), [() => Z(Qa[B(k).nav.launcher.icon]?.labelKey ?? "common.none")]), U(e, t);
								}, ie = (e) => {
									var t = jr();
									z((e) => W(t, e), [() => Z("opt.launcherDots")]), U(e, t);
								};
								G(te, (e) => {
									B(k).nav.launcher?.image ? e(ne) : B(k).nav.launcher?.icon ? e(re, 1) : e(ie, -1);
								}), D(ee), D(S), D(y);
								var ae = L(y, 2);
								qr(ae, 17, () => B(k).nav.launcher?.links ?? [], Ur, (e, t, n) => {
									let r = /* @__PURE__ */ A(() => !Ku(B(t).href ?? ""));
									var i = Zh();
									let a;
									var o = P(i), s = P(o), c = P(s), l = (e) => {
										var n = bh();
										z(() => X(n, "src", B(t).image)), U(e, n);
									}, u = (e) => {
										var n = Mr();
										K(F(n), () => eo(B(t).icon) || ""), U(e, n);
									};
									G(c, (e) => {
										B(t).image ? e(l) : e(u, -1);
									}), D(s);
									var d = L(s, 2), f = I(d, !0), p = L(d, 2), m = (e) => {
										var t = qh();
										K(t, () => w.warn, !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.badTarget")]), U(e, t);
									};
									G(p, (e) => {
										B(r) && e(m);
									});
									var h = L(p, 2), g = P(h);
									g.disabled = n === 0, K(g, () => w.up, !0), D(g);
									var _ = L(g, 2);
									K(_, () => w.down, !0), D(_), D(h);
									var v = L(h, 2);
									K(v, () => w.caret, !0), D(v), D(o);
									var y = L(o, 2), b = (e) => {
										var i = Xh(), a = P(i);
										{
											let e = /* @__PURE__ */ A(() => B(t).icon ?? ""), r = /* @__PURE__ */ A(() => B(t).image ?? ""), i = /* @__PURE__ */ A($s), o = /* @__PURE__ */ A(() => Z("mp.pickMark"));
											Oo(a, {
												get icon() {
													return B(e);
												},
												get image() {
													return B(r);
												},
												get images() {
													return B(i);
												},
												klass: "lrow-tile",
												get label() {
													return B(o);
												},
												onpick: (e) => ec(n, e),
												onfile: (e) => oc(e, n),
												children: (e, n) => {
													var r = Jh(), i = F(r), a = P(i), o = (e) => {
														var n = bh();
														z(() => X(n, "src", B(t).image)), U(e, n);
													}, s = (e) => {
														var n = Mr();
														K(F(n), () => eo(B(t).icon) || ""), U(e, n);
													};
													G(a, (e) => {
														B(t).image ? e(o) : B(t).icon && e(s, 1);
													}), D(i);
													var c = I(L(i, 2), !0);
													z((e) => W(c, e), [() => B(t).label || Z("seed.link")]), U(e, r);
												},
												$$slots: { default: !0 }
											});
										}
										var o = L(a, 2), s = P(o);
										J(s);
										var c = L(s, 2);
										J(c);
										let l;
										var u = L(c, 2), d = (e) => {
											var t = Yh(), n = I(t, !0);
											z((e) => W(n, e), [() => Z("ui.badTarget")]), U(e, t);
										};
										G(u, (e) => {
											B(r) && e(d);
										});
										var f = L(u, 2), p = P(f);
										{
											let e = /* @__PURE__ */ A(() => B(t).icon ?? ""), r = /* @__PURE__ */ A(() => B(t).image ?? ""), i = /* @__PURE__ */ A($s), a = /* @__PURE__ */ A(() => Z("mp.pickMark"));
											Oo(p, {
												get icon() {
													return B(e);
												},
												get image() {
													return B(r);
												},
												get images() {
													return B(i);
												},
												klass: "linkish",
												get label() {
													return B(a);
												},
												onpick: (e) => ec(n, e),
												onfile: (e) => oc(e, n),
												children: (e, t) => {
													De();
													var n = jr();
													z((e) => W(n, e), [() => Z("mp.changeMark")]), U(e, n);
												},
												$$slots: { default: !0 }
											});
										}
										var m = L(p, 2), h = I(m, !0);
										D(f), D(o), D(i), z((e, n, i, a, o, u) => {
											Y(s, B(t).label), X(s, "title", e), X(s, "placeholder", n), l = q(c, 1, "field-filled svelte-1n46o8q", null, l, { "bad-target": B(r) }), Y(c, B(t).href ?? ""), X(c, "placeholder", i), X(c, "title", a), X(m, "title", o), W(h, u);
										}, [
											() => Z("tip.nav.launcherLabel"),
											() => Z("lbl.text"),
											() => Z("ph.hrefAnchor"),
											() => B(r) ? Z("tip.badTarget") : Z("tip.hrefAnchor"),
											() => Z("tip.removeLink"),
											() => Z("ui.remove")
										]), V("change", s, (e) => ac(n, "label", e.target.value)), V("change", c, (e) => ac(n, "href", e.target.value)), V("click", m, () => rc(n)), U(e, i);
									};
									G(y, (e) => {
										B(Qs) === n && e(b);
									}), D(i), z((e, t, r) => {
										a = q(i, 1, "lrow svelte-1n46o8q", null, a, { open: B(Qs) === n }), W(f, e), X(g, "title", t), X(_, "title", r), _.disabled = n === B(k).nav.launcher.links.length - 1;
									}, [
										() => B(t).label || Z("seed.link"),
										() => Z("tip.moveUp"),
										() => Z("tip.moveDown")
									]), V("click", o, () => M(Qs, B(Qs) === n ? null : n, !0)), V("keydown", o, (e) => {
										(e.key === "Enter" || e.key === " ") && (e.preventDefault(), M(Qs, B(Qs) === n ? null : n, !0));
									}), V("click", h, (e) => e.stopPropagation()), V("keydown", h, (e) => e.stopPropagation()), V("click", g, () => ic(n, -1)), V("click", _, () => ic(n, 1)), U(e, i);
								});
								var oe = L(ae, 2), se = I(oe, !0);
								z((e, t, n, r, o, c, h, g) => {
									W(i, e), X(a, "aria-label", t), X(s, "title", n), W(l, r), Y(u, B(k).nav.launcher?.mobileMax ?? 6), W(d, B(k).nav.launcher?.mobileMax ?? 6), X(f, "title", o), xi(p, B(k).nav.launcher?.showTitle !== !1), W(m, ` ${c ?? ""}`), W(x, h), W(se, g);
								}, [
									() => Z("lbl.design"),
									() => Z("lbl.design"),
									() => Z("tip.nav.launcherMobileMax"),
									() => Z("lbl.launcherMobileMax"),
									() => Z("tip.nav.launcherTitle"),
									() => Z("lbl.launcherShowTitle"),
									() => Z("lbl.launcherButton"),
									() => Z("ui.addLauncherLink")
								]), V("input", u, (e) => tc("mobileMax", e.target.valueAsNumber === 6 ? void 0 : e.target.valueAsNumber)), V("change", p, (e) => tc("showTitle", e.target.checked ? void 0 : !1)), V("click", oe, nc), U(e, t);
							};
							G(p, (e) => {
								B(k).nav.launcher?.show === !0 && e(m);
							}), D(l), D(i), z((e, t, n, r) => {
								X(a, "title", e), W(s, t), X(u, "title", n), xi(d, B(k).nav.launcher?.show === !0), W(f, ` ${r ?? ""}`);
							}, [
								() => Z("tip.nav.launcher"),
								() => Z("group.launcher"),
								() => Z("tip.nav.launcher"),
								() => Z("lbl.showInMenu")
							]), V("change", d, (e) => tc("show", e.target.checked ? !0 : void 0)), U(t, i);
						};
						G(a, (e) => {
							n === "theme" ? e(o) : n === "cart" ? e(s, 1) : e(c, -1);
						}), U(t, i);
					}), D(Dn);
				}
				D(wn);
				var jn = L(wn, 2), Mn = P(jn), Nn = I(Mn, !0), Pn = L(Mn, 2), Fn = P(Pn), In = P(Fn), Ln = I(In, !0), Rn = L(In, 2);
				let zn;
				qr(Rn, 21, () => B(Cc), ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ A(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = Ch();
					let o;
					var s = P(a);
					K(s, () => m[r()]);
					var c = I(L(s), !0);
					D(a), z(() => {
						o = q(a, 1, "tile svelte-1n46o8q", null, o, { on: (B(k).nav.style?.subStyle ?? "card") === r() }), X(a, "aria-pressed", (B(k).nav.style?.subStyle ?? "card") === r()), W(c, i());
					}), V("click", a, () => Ps("subStyle", r() === "card" ? void 0 : r())), U(e, a);
				}), D(Rn), D(Fn);
				var Bn = L(Fn, 2), Vn = (e) => {
					var t = Nh(), n = F(t), r = (e) => {
						var t = Nh(), n = F(t);
						{
							let e = /* @__PURE__ */ A(() => Z("lbl.sideSubs")), t = /* @__PURE__ */ A(() => Z("tip.nav.sideSubs")), r = /* @__PURE__ */ A(() => B(k).nav.style?.sideSubs ?? "collapsed"), i = /* @__PURE__ */ A(() => [["collapsed", Z("opt.mobileSubs.collapsed")], ["expanded", Z("opt.mobileSubs.expanded")]]);
							Cs(n, {
								get label() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => Ps("sideSubs", e === "collapsed" ? void 0 : e)
							});
						}
						var r = L(n, 2), i = (e) => {
							var t = Fp(), n = P(t);
							J(n);
							var r = L(n);
							D(t), z((e, i) => {
								X(t, "title", e), xi(n, B(k).nav.style?.sideSubArrow === !0), W(r, ` ${i ?? ""}`);
							}, [() => Z("tip.nav.sideSubArrow"), () => Z("lbl.sideSubArrow")]), V("change", n, (e) => Ps("sideSubArrow", e.target.checked ? !0 : void 0)), U(e, t);
						};
						G(r, (e) => {
							B(k).nav.style?.sideSubs === "expanded" && e(i);
						}), U(e, t);
					};
					G(n, (e) => {
						B(Fs) && e(r);
					});
					var i = L(n, 2), a = (e) => {
						{
							let t = /* @__PURE__ */ A(() => Z("lbl.subOpen")), n = /* @__PURE__ */ A(() => Z("tip.nav.subOpen")), r = /* @__PURE__ */ A(() => B(k).nav.style?.subOpen ?? "hover"), i = /* @__PURE__ */ A(() => [
								["hover", Z("opt.subOpen.hover")],
								["stay", Z("opt.subOpen.stay")],
								["click", Z("opt.subOpen.click")]
							]);
							Cs(e, {
								get label() {
									return B(t);
								},
								get title() {
									return B(n);
								},
								get value() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => Ps("subOpen", e === "hover" ? void 0 : e)
							});
						}
					};
					G(i, (e) => {
						(!B(Fs) || B(k).nav.style?.sideSubs !== "expanded") && e(a);
					}), U(e, t);
				}, Hn = /* @__PURE__ */ A(() => B(k).nav.items?.some((e) => e.children?.length));
				G(Bn, (e) => {
					B(Hn) && e(Vn);
				});
				var Un = L(Bn, 2), Wn = (e) => {
					var t = rp(), n = P(t), r = L(n);
					{
						let e = /* @__PURE__ */ A(() => B(k).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.nav.subPillColorPick"));
						va(r, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Ps("subPillColor", e)
						});
					}
					D(t), z((e, r) => {
						X(t, "title", e), W(n, `${r ?? ""} `);
					}, [() => Z("tip.nav.subPillColor"), () => Z("lbl.subPillColor")]), U(e, t);
				};
				G(Un, (e) => {
					B(k).nav.style?.subStyle === "pills" && e(Wn);
				});
				var Gn = L(Un, 2), Kn = P(Gn), qn = L(Kn);
				J(qn), D(Gn), D(Pn), D(jn);
				var Jn = L(jn, 2), Yn = P(Jn), Xn = I(Yn, !0), Zn = L(Yn, 2);
				{
					let e = (e, t = f) => {
						let n = /* @__PURE__ */ A(Ad);
						var r = eg();
						let i;
						var a = P(r);
						K(a, () => Fd, !0), D(a);
						var o = L(a, 2), s = P(o), c = I(s, !0), l = I(L(s, 2), !0);
						D(o), D(r), z(() => {
							i = q(r, 1, "nav-item ghost svelte-1n46o8q", null, i, { child: t() }), W(c, B(n).label), W(l, B(n).target);
						}), U(e, r);
					};
					var Qn = P(Zn);
					qr(Qn, 21, () => B(k).nav.items, Ur, (t, n, r) => {
						let i = /* @__PURE__ */ A(() => `${r}`);
						var a = ig(), o = F(a), s = (t) => {
							e(t, () => !1);
						};
						G(o, (e) => {
							B(xd)?.key === B(i) && B(xd).pos === "before" && e(s);
						});
						var c = L(o, 2);
						let l;
						var u = P(c);
						K(u, () => Fd, !0), D(u);
						var d = L(u, 2), f = P(d);
						J(f);
						var p = L(f, 2), m = P(p);
						{
							let e = /* @__PURE__ */ A(() => B(n).page ?? (B(n).href == null ? "__none" : "__href")), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), i = /* @__PURE__ */ A(() => [
								...B(k).pages.map((e) => [e.id, e.title]),
								["__href", Z("opt.linkHref")],
								...B(n).children ? [["__none", Z("opt.noLink")]] : []
							]);
							Q(m, {
								compact: !0,
								get value() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => md(r, e)
							});
						}
						var h = L(m, 2), g = (e) => {
							var t = tg();
							J(t), z((e, r) => {
								Y(t, B(n).href), X(t, "placeholder", e), X(t, "title", r);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), V("change", t, (e) => hd(r, e.target.value)), U(e, t);
						};
						G(h, (e) => {
							!B(n).page && B(n).href != null && e(g);
						}), D(p), D(d);
						var _ = L(d, 2), v = (e) => {
							var t = ng();
							K(t, () => "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 9l6 6 6-6\"/></svg>", !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.nav.hasSubmenu")]), U(e, t);
						};
						G(_, (e) => {
							B(n).children?.length && e(v);
						});
						var y = L(_, 2), b = P(y);
						K(b, () => w.plus, !0), D(b);
						var x = L(b, 2);
						x.disabled = r === 0, K(x, () => w.up, !0), D(x);
						var S = L(x, 2);
						K(S, () => w.cross, !0), D(S);
						var C = L(S, 2);
						K(C, () => w.down, !0), D(C), D(y);
						var ee = L(y, 2);
						K(ee, () => w.kebab, !0), D(ee), D(c);
						var te = L(c, 2);
						qr(te, 17, () => B(n).children ?? [], Ur, (t, i, a) => {
							let o = /* @__PURE__ */ A(() => `${r}.${a}`);
							var s = rg(), c = F(s), l = (t) => {
								e(t, () => !0);
							};
							G(c, (e) => {
								B(xd)?.key === B(o) && B(xd).pos === "before" && e(l);
							});
							var u = L(c, 2);
							let d;
							var f = P(u);
							K(f, () => Fd, !0), D(f);
							var p = L(f, 2), m = P(p);
							J(m);
							var h = L(m, 2), g = P(h);
							{
								let e = /* @__PURE__ */ A(() => B(i).page ?? "__href"), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), n = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
								Q(g, {
									compact: !0,
									get value() {
										return B(e);
									},
									get title() {
										return B(t);
									},
									get options() {
										return B(n);
									},
									onchange: (e) => Bd(r, a, e)
								});
							}
							var _ = L(g, 2), v = (e) => {
								var t = tg();
								J(t), z((e, n) => {
									Y(t, B(i).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
								}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), V("change", t, (e) => Vd(r, a, e.target.value)), U(e, t);
							};
							G(_, (e) => {
								B(i).page || e(v);
							}), D(h), D(p);
							var y = L(p, 2), b = P(y);
							b.disabled = a === 0, K(b, () => w.up, !0), D(b);
							var x = L(b, 2);
							K(x, () => w.cross, !0), D(x);
							var S = L(x, 2);
							K(S, () => w.down, !0), D(S), D(y);
							var C = L(y, 2);
							K(C, () => w.kebab, !0), D(C), D(u);
							var ee = L(u, 2), te = (t) => {
								e(t, () => !0);
							};
							G(ee, (e) => {
								B(xd)?.key === B(o) && B(xd).pos === "after" && e(te);
							}), z((e, t, r, s, c, l, p) => {
								d = q(u, 1, "nav-item child svelte-1n46o8q", null, d, {
									selected: B(vd) === B(o),
									dragging: B(yd) === B(o)
								}), X(u, "data-key", B(o)), X(f, "title", e), Y(m, B(i).label), X(m, "title", t), X(b, "title", r), X(x, "title", s), X(S, "title", c), S.disabled = a === B(n).children.length - 1, X(C, "title", l), X(C, "aria-label", p);
							}, [
								() => Z("tip.nav.dragItem"),
								() => Z("tip.nav.childLabel"),
								() => Z("tip.moveUp"),
								() => Z("tip.nav.removeChild"),
								() => Z("tip.moveDown"),
								() => Z("tip.nav.itemActions"),
								() => Z("tip.nav.itemActions")
							]), V("click", u, (e) => {
								e.stopPropagation(), M(vd, B(o));
							}), Sr("dragstart", f, (e) => {
								e.stopPropagation(), M(yd, B(o)), e.dataTransfer?.setData(Md, B(o));
							}), Sr("dragend", f, jd), V("input", m, (e) => zd(r, a, e.target.value)), V("click", b, () => Hd(r, a, -1)), V("click", x, () => Ud(r, a)), V("click", S, () => Hd(r, a, 1)), V("click", C, (e) => {
								e.stopPropagation(), M(vd, B(o));
							}), U(t, s);
						});
						var ne = L(te, 2), re = (t) => {
							e(t, () => !0);
						};
						G(ne, (e) => {
							B(xd)?.key === B(i) && B(xd).pos === "into" && e(re);
						});
						var ie = L(ne, 2), ae = (t) => {
							e(t, () => !1);
						};
						G(ie, (e) => {
							B(xd)?.key === B(i) && B(xd).pos === "after" && e(ae);
						}), z((e, t, a, o, s, d, p, m) => {
							l = q(c, 1, "nav-item svelte-1n46o8q", null, l, {
								selected: B(vd) === B(i),
								dragging: B(yd) === B(i),
								"drop-target": B(xd)?.key === B(i) && B(xd).pos === "into"
							}), X(c, "data-key", B(i)), X(u, "title", e), Y(f, B(n).label), X(f, "title", t), X(b, "title", a), X(x, "title", o), X(S, "title", s), X(C, "title", d), C.disabled = r === B(k).nav.items.length - 1, X(ee, "title", p), X(ee, "aria-label", m);
						}, [
							() => Z("tip.nav.dragItem"),
							() => Z("tip.nav.itemLabel"),
							() => Z("tip.nav.addChild"),
							() => Z("tip.moveUp"),
							() => Z("tip.nav.removeItem"),
							() => Z("tip.moveDown"),
							() => Z("tip.nav.itemActions"),
							() => Z("tip.nav.itemActions")
						]), V("click", c, () => {
							M(vd, B(i));
						}), Sr("dragstart", u, (e) => {
							M(yd, B(i)), e.dataTransfer?.setData(Md, B(i));
						}), Sr("dragend", u, jd), V("input", f, (e) => pd(r, e.target.value)), V("click", b, () => Rd(r)), V("click", x, () => gd(r, -1)), V("click", S, () => _d(r)), V("click", C, () => gd(r, 1)), V("click", ee, () => {
							M(vd, B(i));
						}), U(t, a);
					}), D(Qn);
					var $n = L(Qn, 2), er = I($n, !0), tr = L($n, 2), nr = P(tr);
					J(nr);
					var rr = L(nr, 2), ir = I(rr, !0);
					D(tr), D(Zn), z((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, ee, te, w, ne, re, ie, ae, oe, se, T, ce, le, ue, de, E, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, D, De, Oe, ke) => {
						W(er, Ee), X(tr, "title", D), X(nr, "placeholder", De), rr.disabled = Oe, W(ir, ke);
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
						() => !B(S).trim(),
						() => Z("ui.newPageAsItem")
					]), Sr("dragover", Qn, Nd), Sr("drop", Qn, (e) => {
						e.preventDefault(), Pd(B(xd)?.key ?? "");
					}), V("click", $n, Id), V("keydown", nr, (e) => {
						e.key === "Enter" && C();
					}), Ti(nr, () => B(S), (e) => M(S, e)), V("click", rr, C);
				}
				D(Jn), D(t), z((e, t, n, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, te, w, ne, re, ae, se, le, ue, de, E, fe, pe, me, he, ge, _e, ve, ye, Se, we, Te, D, De, Oe, ke, Ae, Me, Ie, Le, Re, ze, Ve, He, Ue, We, Ge) => {
					X(r, "title", e), W(i, t), W(ee, n), W(ie, a), X(oe, "title", o), W(T, s), X(ce, "aria-label", c), X(be, "title", l), W(xe, u), X(Ce, "title", d), W(Ee, f), X(je, "title", p), W(Ne, m), X(Pe, "min", Zo.min), X(Pe, "max", Zo.max), X(Pe, "step", Zo.step), Y(Pe, B(Hs)), X(Fe, "min", Zo.min), X(Fe, "max", Zo.max), Y(Fe, B(Hs)), W(Be, h), W(Je, g), X($e, "title", _), W(O, v), X(at, "title", y), W(st, b), X(ct, "min", Zo.min), X(ct, "max", Zo.max), X(ct, "placeholder", x), Y(ct, B(k).nav.style?.mobile?.textSize ?? ""), X(ut, "title", S), W(ft, C), X(mt, "title", te), W(gt, w), X(yt, "title", ne), W(xt, re), X(Et, "title", ae), W(Ot, se), X(Nt, "title", le), W(Ft, ue), W(Kt, de), W(Yt, E), X(Xt, "aria-label", fe), X(tn, "title", pe), W(rn, me), X(an, "title", he), W(sn, ge), X(cn, "title", _e), xi(ln, B(k).nav.style?.blur !== !1), W(R, ` ${ve ?? ""}`), W(fn, ye), X(gn, "title", Se), W(_n, we), X(yn, "title", Te), xi(bn, B(k).nav.announcement?.show === !0), W(xn, ` ${D ?? ""}`), X(Tn, "title", De), W(En, Oe), W(Nn, ke), W(Ln, Ae), zn = q(Rn, 1, "tile-grid svelte-1n46o8q", null, zn, {
						"cols-5": !B(Fs),
						"cols-3": B(Fs)
					}), X(Rn, "aria-label", Me), X(Gn, "title", Ie), W(Kn, `${Le ?? ""} `), Y(qn, B(k).nav.style?.subColumns ?? 1), X(Yn, "title", Re), W(Xn, ze);
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
					() => !B(S).trim(),
					() => Z("ui.newPageAsItem")
				]), V("input", Pe, (e) => Ps("textSize", e.target.valueAsNumber)), V("change", Fe, (e) => cc(e, "textSize", Zo)), V("change", ct, (e) => lc(e, "textSize", Zo)), V("change", ln, (e) => Ps("blur", e.target.checked)), V("change", bn, (e) => Xs("show", e.target.checked ? !0 : void 0)), V("change", qn, (e) => Ps("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), U(e, t);
			}, b = (e) => {
				var t = ug(), n = P(t), r = P(n), i = L(r);
				J(i), D(n);
				var a = L(n, 2), o = P(a), s = L(o);
				J(s), D(a);
				var c = L(a, 2), l = P(c), u = L(l);
				{
					let e = /* @__PURE__ */ A(Ss), t = /* @__PURE__ */ A(ws);
					Q(u, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Ds(e)
					});
				}
				D(c);
				var d = L(c, 4), f = I(d, !0), p = L(d, 2), m = P(p);
				qr(m, 17, () => B(vs), (e) => e.screen, (e, t) => {
					var n = og(), r = P(n), i = I(r, !0), a = L(r, 2);
					let o;
					var s = I(a), c = I(L(a, 2), !0);
					D(n), z(() => {
						W(i, B(t).screen), o = q(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !B(t).bound }), gi(s, `width:${B(t).pct ?? ""}%`), W(c, B(t).bound ? `${B(t).margin}` : "-");
					}), U(e, n);
				});
				var h = L(m, 2), g = P(h), _ = I(g, !0), v = I(L(g, 2), !0);
				D(h);
				var y = L(h, 2), b = (e) => {
					var t = sg(), n = I(t, !0);
					z((e) => W(n, e), [() => Z("lbl.bindsFrom", { n: B(Ie) })]), U(e, t);
				};
				G(y, (e) => {
					B(ss) !== "full" && e(b);
				}), D(p);
				var x = L(p, 2);
				qr(x, 21, () => Uo, (e) => e.id, (e, t) => {
					var n = rh();
					let r;
					var i = I(n, !0);
					z((e) => {
						r = q(n, 1, "svelte-1n46o8q", null, r, { on: B(us) === B(t).id }), W(i, e);
					}, [() => Z(`lbl.width.${B(t).id}`)]), V("click", n, () => bs(B(t).width)), U(e, n);
				}), D(x);
				var S = L(x, 2), C = (e) => {
					var t = cg(), n = P(t), r = I(n, !0), i = L(n, 2);
					J(i);
					var a = I(L(i, 2));
					D(t), z((e, n) => {
						X(t, "title", e), W(r, n), X(i, "min", 960), X(i, "max", Vo), X(i, "step", 20), Y(i, B(_s)), W(a, `${B(_s) ?? ""} px`);
					}, [() => Z("tip.site.contentWidthFree"), () => Z("lbl.widthFree")]), V("input", i, (e) => bs(e.target.valueAsNumber)), U(e, t);
				};
				G(S, (e) => {
					B(ss) !== "full" && e(C);
				});
				var ee = L(S, 2), te = I(ee, !0), ne = L(ee, 2);
				qr(ne, 21, () => Ho, (e) => e.id, (e, t) => {
					var n = rh();
					let r;
					var i = I(n, !0);
					z((e) => {
						r = q(n, 1, "svelte-1n46o8q", null, r, { on: B(hs) === B(t).id }), W(i, e);
					}, [() => Z(`lbl.gutter.${B(t).id}`)]), V("click", n, () => xs(B(t).gutter)), U(e, n);
				}), D(ne);
				var re = L(ne, 2), ie = P(re), ae = I(ie, !0), oe = L(ie, 2), se = P(oe), T = P(se), ce = I(T, !0), le = L(T, 2);
				J(le);
				var ue = I(L(le, 2));
				D(se), D(oe), D(re);
				var de = L(re, 4), E = P(de), fe = L(E), pe = (e) => {
					var t = mh();
					z((e) => {
						X(t, "src", B(k).site.icon), X(t, "alt", e);
					}, [() => Z("lbl.siteIcon")]), U(e, t);
				};
				G(fe, (e) => {
					B(k).site.icon && e(pe);
				}), D(de);
				var me = L(de, 2), he = P(me), ge = P(he), _e = L(ge);
				D(he);
				var ve = L(he, 2), ye = (e) => {
					var t = lg(), n = F(t);
					K(n, () => w.pencil ?? "✎", !0), D(n);
					var r = L(n, 2);
					K(r, () => w.cross, !0), D(r), z((e, t) => {
						X(n, "title", e), X(r, "title", t);
					}, [() => Z("tip.site.editIcon"), () => Z("tip.site.removeIcon")]), V("click", n, () => M(wo, B(k).site.icon, !0)), V("click", r, Do), U(e, t);
				};
				G(ve, (e) => {
					B(k).site.icon && e(ye);
				}), D(me), D(t), z((e, t, u, p, m, h, g, y, b, x, S, C, w, ne, ie, oe, T, de, fe, pe) => {
					X(n, "title", e), W(r, `${t ?? ""} `), Y(i, B(k).site.title ?? ""), X(i, "placeholder", u), X(a, "title", p), W(o, `${m ?? ""} `), Y(s, B(k).site.description ?? ""), X(s, "placeholder", h), X(c, "title", g), W(l, `${y ?? ""} `), X(d, "title", b), W(f, x), W(_, S), W(v, C), X(ee, "title", w), W(te, ne), re.open = B(hs) === null || B(gs), W(ae, ie), X(se, "title", oe), W(ce, T), X(le, "min", 0), X(le, "max", 12), X(le, "step", 1), Y(le, B(ls)), W(ue, `${B(ls) ?? ""} vw`), W(E, `${de ?? ""} `), X(he, "title", fe), W(ge, `${pe ?? ""} `);
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
					() => B(k).site.icon ? Z("ui.changeIcon") : Z("ui.chooseIcon")
				]), V("input", i, (e) => Ao(e.target.value)), V("input", s, (e) => Io(e.target.value)), Sr("toggle", re, (e) => M(gs, e.currentTarget.open, !0)), V("input", le, (e) => xs(e.target.valueAsNumber)), V("change", _e, To), U(e, t);
			}, x = (e) => {
				var t = vg();
				{
					let e = (e, t = f, n = f) => {
						var r = fg(), i = P(r), a = (e) => {
							var t = dg(), r = I(t, !0);
							z(() => W(r, n())), U(e, t);
						};
						G(i, (e) => {
							n() && e(a);
						});
						var o = L(i, 2), s = P(o), c = I(s, !0), l = L(s, 2), u = I(l, !0), d = L(l, 2), p = P(d), m = I(p, !0), h = I(L(p), !0);
						D(d), D(o), D(r), z((e, t, n, r, i, a, s, l, d) => {
							gi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), W(c, a), W(u, s), W(m, l), W(h, d);
						}, [
							() => hf(t().bg, t()),
							() => hf(t().surface, t()),
							() => hf(t().text, t()),
							() => hf(t().accent, t()),
							() => hf(t()["accent-text"] ?? oe(hf(t().accent ?? "#000000", t())), t()),
							() => Z("preview.heading"),
							() => Z("preview.cardBody"),
							() => Z("preview.button"),
							() => Z("preview.link")
						]), U(e, r);
					};
					var n = P(t), r = I(n, !0), i = L(n, 2);
					qr(i, 21, () => _f, (e) => e.id, (e, t) => {
						var n = pg();
						let r;
						var i = P(n), a = P(i), o = L(a), s = L(o), c = L(s);
						D(i);
						var l = I(L(i, 2), !0);
						D(n), z(() => {
							r = q(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: B(yf) === B(t).id }), X(n, "title", `${B(t).name} - ${B(t).note}`), gi(a, `background:${B(t).light.bg ?? ""}`), gi(o, `background:${B(t).light.surface ?? ""}`), gi(s, `background:${B(t).light.accent ?? ""}`), gi(c, `background:${B(t).light.text ?? ""}`), W(l, B(t).name);
						}), V("click", n, () => vf(B(t))), U(e, n);
					}), D(i);
					var a = L(i, 2), o = I(a, !0), s = L(a, 2), c = P(s);
					J(c);
					var l = L(c);
					D(s);
					var u = L(s, 2), d = (e) => {
						var t = mg(), n = P(t), r = I(n, !0), i = L(n, 2), a = P(i);
						let o;
						var s = I(a, !0), c = L(a, 2);
						let l;
						var u = I(c, !0);
						D(i), D(t), z((e, t, n, i) => {
							W(r, e), X(a, "title", t), o = q(a, 1, "svelte-1n46o8q", null, o, { on: B(Si) }), W(s, n), l = q(c, 1, "svelte-1n46o8q", null, l, { on: !B(Si) }), W(u, i);
						}, [
							() => Z("lbl.darkColors"),
							() => Z("hint.theme.autoDark"),
							() => Z("opt.auto"),
							() => Z("opt.custom")
						]), V("click", a, () => df(!0)), V("click", c, () => df(!1)), U(e, t);
					};
					G(u, (e) => {
						B(bi) && e(d);
					});
					var p = L(u, 2), m = P(p), g = (e) => {
						var t = hg(), n = I(t, !0);
						z((e) => W(n, e), [() => Z("lbl.light")]), U(e, t);
					};
					G(m, (e) => {
						B(bi) && e(g);
					});
					var _ = L(m, 2);
					let Ie;
					var v = I(_, !0);
					D(p);
					var y = L(p, 2);
					qr(y, 21, () => yi, ([e, t, n]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(B(t), 3));
						let r = () => B(n)[0], i = () => B(n)[1], a = () => B(n)[2];
						var o = gg(), s = P(o);
						{
							let e = /* @__PURE__ */ A(() => B(k).theme.tokens.color[r()] ?? Gd(r(), B(wi))), t = /* @__PURE__ */ A(vi);
							va(s, {
								get value() {
									return B(e);
								},
								get tokens() {
									return B(t);
								},
								get label() {
									return i();
								},
								onchange: (e) => Wd(r(), e)
							});
						}
						var c = L(s, 2), l = I(c, !0), u = I(L(c, 2), !0);
						D(o), z((e) => {
							W(l, a()), W(u, e);
						}, [() => hf(B(k).theme.tokens.color[r()] ?? Gd(r(), B(wi)), B(wi))]), U(e, o);
					}), D(y);
					var b = L(y, 2), x = (e) => {
						var t = _g(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2);
						let o;
						var s = I(a, !0);
						D(n);
						var c = L(n, 2);
						let l;
						qr(c, 21, () => yi, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ A(() => h(B(t), 3));
							let r = () => B(n)[0], i = () => B(n)[1], a = () => B(n)[2];
							var o = gg(), s = P(o);
							{
								let e = /* @__PURE__ */ A(() => B(k).theme.alt.tokens.color[r()] ?? B(Ei)[r()] ?? Gd(r(), B(Ei))), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("theme.darkColorLabel", { name: i() }));
								va(s, {
									get value() {
										return B(e);
									},
									get tokens() {
										return B(t);
									},
									get label() {
										return B(n);
									},
									onchange: (e) => cf(r(), e)
								});
							}
							var c = L(s, 2), l = I(c, !0), u = I(L(c, 2), !0);
							D(o), z((e) => {
								W(l, a()), W(u, e);
							}, [() => hf(B(k).theme.alt.tokens.color[r()] ?? B(Ei)[r()] ?? Gd(r(), B(Ei)), B(Ei))]), U(e, o);
						}), D(c), z((e, t, n) => {
							W(i, e), o = q(a, 1, "chip svelte-1n46o8q", null, o, { accent: B(Ci) === "dark" }), X(a, "title", t), W(s, n), l = q(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: B(Si) });
						}, [
							() => Z("lbl.dark"),
							() => Z("tip.theme.darkDefault"),
							() => Z("common.standard")
						]), V("click", a, () => lf("dark")), U(e, t);
					};
					G(b, (e) => {
						B(bi) && e(x);
					});
					var S = L(b, 2), C = P(S), ee = I(C, !0), te = L(C, 2);
					let Le;
					var w = I(te, !0);
					D(S);
					var ne = L(S, 2), re = P(ne);
					{
						let t = /* @__PURE__ */ A(() => B(bi) ? Z("lbl.light") : "");
						e(re, () => B(wi), () => B(t));
					}
					var ie = L(re, 2), ae = (t) => {
						{
							let n = /* @__PURE__ */ A(() => Z("lbl.dark"));
							e(t, () => B(Ei), () => B(n));
						}
					};
					G(ie, (e) => {
						B(bi) && e(ae);
					}), D(ne);
					var se = L(ne, 2), T = P(se), ce = I(T, !0), le = L(T, 2), ue = P(le), de = P(ue), E = L(de);
					{
						let e = /* @__PURE__ */ A(() => ff("heading"));
						Q(E, {
							get value() {
								return B(k).theme.tokens.font.heading;
							},
							get options() {
								return B(e);
							},
							onchange: (e) => tf("heading", e)
						});
					}
					D(ue);
					var fe = L(ue, 2), pe = P(fe), me = L(pe);
					{
						let e = /* @__PURE__ */ A(() => ff("body"));
						Q(me, {
							get value() {
								return B(k).theme.tokens.font.body;
							},
							get options() {
								return B(e);
							},
							onchange: (e) => tf("body", e)
						});
					}
					D(fe);
					var he = L(fe, 2), ge = P(he), _e = I(ge, !0), ve = L(ge, 2), ye = I(ve, !0);
					D(he), D(le), D(se);
					var be = L(se, 2), xe = P(be), Se = I(xe, !0), Ce = L(xe, 2), we = P(Ce), Te = P(we), Ee = I(Te, !0), De = I(L(Te, 2), !0);
					D(we);
					var Oe = L(we, 2), ke = P(Oe, !0), Ae = I(L(ke), !0);
					D(Oe);
					var je = L(Oe, 2);
					J(je);
					var Me = L(je, 2), Ne = P(Me, !0), Pe = I(L(Ne), !0);
					D(Me);
					var Fe = L(Me, 2);
					J(Fe), D(Ce), D(be), D(t), z((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, C, ne, re, ie, ae, oe) => {
						W(r, e), W(o, t), X(s, "title", n), xi(c, B(bi)), W(l, ` ${i ?? ""}`), Ie = q(_, 1, "chip svelte-1n46o8q", null, Ie, { accent: B(Ci) === "light" }), X(_, "title", a), W(v, u), X(S, "title", d), W(ee, f), Le = q(te, 1, "chip palauto svelte-1n46o8q", null, Le, { accent: B(Kd) }), W(w, p), W(ce, m), W(de, `${h ?? ""} `), W(pe, `${g ?? ""} `), gi(ge, `font-family:${B(k).theme.tokens.font.heading ?? ""}`), W(_e, y), gi(ve, `font-family:${B(k).theme.tokens.font.body ?? ""}`), W(ye, b), W(Se, x), gi(we, `--r-sm:${B(k).theme.tokens.radius.sm ?? ""};--r-md:${B(k).theme.tokens.radius.md ?? ""}`), W(Ee, C), W(De, ne), W(ke, re), W(Ae, B(k).theme.tokens.radius.sm), Y(je, ie), W(Ne, ae), W(Pe, B(k).theme.tokens.radius.md), Y(Fe, oe);
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
						() => pf(B(k).theme.tokens.radius.sm),
						() => Z("lbl.largeCorners"),
						() => pf(B(k).theme.tokens.radius.md)
					]), V("change", c, (e) => uf(e.target.checked)), V("click", _, () => lf("light")), V("click", te, () => ef(!B(Kd))), V("input", je, (e) => mf("sm", Number(e.target.value))), V("input", Fe, (e) => mf("md", Number(e.target.value)));
				}
				U(e, t);
			}, ee = (e) => {
				var t = Cg();
				let n;
				var r = P(t);
				J(r);
				var i = L(r, 2), a = (e) => {
					var t = Mr();
					qr(F(t), 17, () => eu(z_(), B(R_), (e) => e.label), (e) => e.label, (e, t) => {
						var n = Mr(), r = F(n), i = (e) => {
							var n = yg(), r = P(n), i = L(r);
							D(n), z((e) => {
								X(n, "title", e), W(r, `${B(t).label ?? ""} `);
							}, [() => Z("tip.webpAuto")]), V("change", i, H_), U(e, n);
						}, a = (e) => {
							var n = bg(), r = P(n), i = L(r);
							D(n), z((e) => {
								X(n, "title", e), W(r, `${B(t).label ?? ""} `);
							}, [() => Z("tip.blocks.galleryImages")]), V("change", i, K_), U(e, n);
						}, o = (e) => {
							var n = Lp(), r = I(n, !0);
							z(() => W(r, B(t).label)), V("click", n, () => B_(B(t))), U(e, n);
						};
						G(r, (e) => {
							B(t).act === "image" ? e(i) : B(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
						}), U(e, n);
					}, (e) => {
						var t = _p(), n = I(t, !0);
						z((e) => W(n, e), [() => Z("canvas.searchEmpty")]), U(e, t);
					}), U(e, t);
				}, o = /* @__PURE__ */ A(() => B(R_).trim()), s = (e) => {
					var t = Sg(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2), o = P(a), s = I(o, !0), c = L(o, 2), l = I(c, !0);
					D(a), D(n);
					var u = L(n, 2), d = I(u, !0), f = L(u, 2), p = P(f), m = L(p);
					D(f);
					var h = L(f, 2), g = I(h, !0), _ = L(h, 2), v = I(_, !0), y = L(_, 2), b = I(y, !0), x = L(y, 2), S = I(x, !0), C = L(x, 2), ee = I(C, !0), te = L(C, 2), w = I(te, !0), ne = L(te, 2), re = I(ne, !0), ie = L(ne, 2), ae = I(ie, !0), oe = L(ie, 2), se = I(oe, !0), T = L(oe, 2), ce = I(T, !0), le = L(T, 2), ue = I(le, !0), de = L(le, 2), E = I(de, !0), fe = L(de, 2), pe = I(fe, !0), me = L(fe, 2), he = I(me, !0), ge = L(me, 2), _e = I(ge, !0), ve = L(ge, 2), ye = I(ve, !0), be = L(ve, 2), xe = I(be, !0), Se = L(be, 2), Ce = P(Se), we = I(Ce, !0), Te = L(Ce, 2), Ee = P(Te), De = I(Ee, !0), Oe = L(Ee, 2), ke = P(Oe), Ae = L(ke);
					D(Oe), D(Te), D(Se);
					var je = L(Se, 2), Me = P(je), Ne = I(Me, !0), Pe = L(Me, 2), Fe = P(Pe), Ie = I(Fe, !0), Le = L(Fe, 2), Re = I(Le, !0), ze = L(Le, 2), Be = I(ze, !0), Ve = L(ze, 2), He = I(Ve, !0);
					D(Pe), D(je);
					var Ue = L(je, 2), We = P(Ue), Ge = I(We, !0), Ke = L(We, 2), qe = P(Ke), Je = I(qe, !0), Ye = L(qe, 2), Xe = I(Ye, !0), Ze = L(Ye, 2), Qe = I(Ze, !0), $e = L(Ze, 2), O = I($e, !0), et = L($e, 2), k = I(et, !0);
					D(Ke), D(Ue);
					var nt = L(Ue, 2), rt = (e) => {
						let t = /* @__PURE__ */ A(() => B(Qc).filter((e) => Yc[e]?.data?.mal?.kind === "blocks"));
						var n = xg(), r = P(n), i = I(r, !0), a = L(r, 2);
						qr(a, 20, () => B(t), (e) => e, (e, t) => {
							var n = Lp(), r = I(n, !0);
							z((e) => {
								X(n, "title", e), W(r, Yc[t].data.mal.name);
							}, [() => Z("canvas.insertGroup")]), V("click", n, () => tt?.sendInsertTemplate(t)), U(e, n);
						}), D(a), D(n), z((e) => W(i, e), [() => Z("canvas.tabMyTemplates")]), U(e, n);
					}, it = /* @__PURE__ */ A(() => B(Qc).some((e) => Yc[e]?.data?.mal?.kind === "blocks"));
					G(nt, (e) => {
						B(it) && e(rt);
					});
					var at = L(nt, 2), ot = (e) => {
						var t = xg(), n = P(t), r = I(n, !0), i = L(n, 2);
						qr(i, 21, () => B(F_), (e) => e.type, (e, t) => {
							var n = Mr(), r = F(n), i = (e) => {
								var n = xg(), r = P(n), i = I(r, !0), a = L(r, 2);
								qr(a, 21, () => B(t).variants, (e) => e.label, (e, n) => {
									var r = Lp(), i = I(r, !0);
									z((e) => {
										X(r, "title", e), W(i, B(n).label);
									}, [() => Z("tip.blocks.fromPlugin", { plugin: B(t).plugin })]), V("click", r, () => L_(B(t), B(n).props)), U(e, r);
								}), D(a), D(n), z(() => W(i, B(t).label)), U(e, n);
							}, a = (e) => {
								var n = Lp(), r = I(n, !0);
								z((e) => {
									X(n, "title", e), W(r, B(t).label);
								}, [() => Z("tip.blocks.fromPlugin", { plugin: B(t).plugin })]), V("click", n, () => L_(B(t))), U(e, n);
							};
							G(r, (e) => {
								B(t).variants?.length ? e(i) : e(a, -1);
							}), U(e, n);
						}), D(i), D(t), z((e) => W(r, e), [() => Z("panel.plugins")]), U(e, t);
					};
					G(at, (e) => {
						B(F_).length && e(ot);
					}), z((e, t, n, r, a, o, u, m, Se, Ce, Te, D, Ae, je, Me, Pe, Ue, We, Ke, qe, Ye, Ze, $e, et, tt, nt, rt, it, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, A, vt, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It) => {
						W(i, e), W(s, t), X(c, "title", n), W(l, r), W(d, a), X(f, "title", o), W(p, `${u ?? ""} `), X(h, "title", m), W(g, Se), X(_, "title", Ce), W(v, Te), X(y, "title", D), W(b, Ae), X(x, "title", je), W(S, Me), X(C, "title", Pe), W(ee, Ue), X(te, "title", We), W(w, Ke), X(ne, "title", qe), W(re, Ye), X(ie, "title", Ze), W(ae, $e), X(oe, "title", et), W(se, tt), X(T, "title", nt), W(ce, rt), X(le, "title", it), W(ue, at), X(de, "title", ot), W(E, st), X(fe, "title", ct), W(pe, lt), X(me, "title", ut), W(he, dt), X(ge, "title", ft), W(_e, pt), X(ve, "title", mt), W(ye, ht), X(be, "title", gt), W(xe, _t), W(we, A), X(Ee, "title", vt), W(De, yt), X(Oe, "title", bt), W(ke, `${xt ?? ""} `), W(Ne, St), X(Fe, "title", Ct), W(Ie, wt), X(Le, "title", Tt), W(Re, Et), X(ze, "title", Dt), W(Be, Ot), X(Ve, "title", kt), W(He, At), W(Ge, jt), W(Je, Mt), W(Xe, Nt), W(Qe, Pt), W(O, Ft), W(k, It);
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
						() => Z("group.shapes"),
						() => Z("shape.line"),
						() => Z("shape.arrow"),
						() => Z("shape.circle"),
						() => Z("shape.rect"),
						() => Z("shape.triangle")
					]), V("click", o, () => P_("text")), V("click", c, () => P_("text-box")), V("click", u, () => P_("button")), V("change", m, H_), V("click", h, () => P_("video")), V("click", _, () => P_("icon")), V("click", y, () => P_("map")), V("click", x, () => P_("form")), V("click", C, () => P_("collection")), V("click", te, () => P_("faq")), V("click", ne, () => P_("timeline")), V("click", ie, () => P_("quote")), V("click", oe, () => P_("stats")), V("click", T, () => P_("ribbon")), V("click", le, () => P_("table")), V("click", de, () => P_("share")), V("click", fe, () => P_("countdown")), V("click", me, () => P_("audio")), V("click", ge, () => P_("product")), V("click", ve, () => P_("cart")), V("click", be, () => P_("checkout")), V("click", Ee, () => P_("gallery")), V("change", Ae, K_), V("click", Fe, () => P_("calendar")), V("click", Le, () => P_("calendar-cards")), V("click", ze, () => P_("calendar-month")), V("click", Ve, () => P_("calendar-next")), V("click", qe, () => P_("shape-line")), V("click", Ye, () => P_("shape-arrow")), V("click", Ze, () => P_("shape-circle")), V("click", $e, () => P_("shape-rect")), V("click", et, () => P_("shape-triangle")), U(e, t);
				};
				G(i, (e) => {
					B(o) ? e(a) : e(s, -1);
				}), D(t), z((e, i, a) => {
					n = q(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: B(Ae) === "mobile" }), X(t, "title", e), X(r, "placeholder", i), X(r, "title", a);
				}, [
					() => B(Ae) === "mobile" ? Z("tip.blocks.mobileLocked") : void 0,
					() => Z("canvas.searchBlocks"),
					() => Z("canvas.searchBlocks")
				]), Ti(r, () => B(R_), (e) => M(R_, e)), U(e, t);
			}, te = (e) => {
				var t = wg(), n = P(t), r = P(n), i = I(L(r));
				D(n);
				var a = L(n, 2);
				J(a);
				var o = L(a, 2), s = P(o);
				J(s);
				var c = L(s);
				D(o), D(t), z((e, t) => {
					W(r, `${e ?? ""} `), W(i, `${B(ge).size ?? ""} px`), Y(a, B(ge).size), xi(s, B(ge).snap !== !1), W(c, ` ${t ?? ""}`);
				}, [() => Z("lbl.gridSize"), () => Z("lbl.gridSnap")]), V("input", a, (e) => Yi("size", Number(e.target.value))), V("change", s, (e) => Yi("snap", e.target.checked)), U(e, t);
			}, ne = (e) => {
				var t = jg(), n = P(t), r = (e) => {
					var t = im(), n = F(t), r = I(n, !0), i = L(n, 2);
					c(i), z((e) => W(r, e), [() => Z("blocks.suffix", { label: Zn[B(N).type] ?? B(N).type })]), U(e, t);
				}, i = (e) => {
					var t = Ag(), n = F(t), r = I(n, !0), i = L(n, 2), o = P(i), s = L(o);
					J(s), D(i);
					var c = L(i, 4), l = P(c);
					J(l);
					var u = L(l);
					D(c);
					var d = L(c, 2), f = (e) => {
						var t = Tg(), n = F(t), r = P(n), i = I(L(r));
						D(n);
						var a = L(n, 2);
						J(a), z((e) => {
							W(r, `${e ?? ""} `), W(i, `${B(tr).size ?? ""} px`), Y(a, B(tr).size);
						}, [() => Z("lbl.gridSize")]), V("input", a, (e) => Ji("size", Number(e.target.value))), U(e, t);
					};
					G(d, (e) => {
						B(tr) && e(f);
					});
					var p = L(d, 4), m = I(p, !0), g = L(p, 2);
					qr(g, 21, () => [["", "common.standard"], ...Object.entries(cu)], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(B(t), 2));
						let r = () => B(n)[0], i = () => B(n)[1], a = /* @__PURE__ */ A(() => mr(r()));
						var o = Eg();
						let s;
						var c = P(o), l = P(c), u = L(l, 2), d = L(u, 2);
						D(c);
						var f = I(L(c, 2), !0);
						D(o), z((e, t) => {
							s = q(o, 1, "rs-card svelte-1n46o8q", null, s, { on: B(or) === r() }), X(o, "title", e), gi(c, `background: ${B(a).bg ?? ""}`), gi(l, `background: ${B(a).text ?? ""}`), gi(u, `background: ${B(a).surface ?? ""}`), gi(d, `background: ${B(a).accent ?? ""}`), W(f, t);
						}, [() => Z("tip.props.sectionTheme"), () => Z(i())]), V("click", o, () => pr(r())), U(e, o);
					}), D(g);
					var _ = L(g, 2), v = P(_), y = L(v), b = P(y), x = I(b), S = L(b, 2);
					K(S, () => w.copy, !0), D(S), D(y), D(_);
					var C = L(_, 4), ee = I(C, !0), te = L(C, 2);
					a(te, () => B(di), () => B(rr));
					var ne = L(te, 4), re = I(ne, !0), ie = L(ne, 2);
					qr(ie, 16, () => [["top", "lbl.dividerTop"], ["bottom", "lbl.dividerBottom"]], ([e, t]) => e, (e, t) => {
						var n = /* @__PURE__ */ A(() => h(t, 2));
						let r = () => B(n)[0], i = () => B(n)[1], a = /* @__PURE__ */ A(() => B(sr)[r()]);
						var o = Rf(), s = F(o), c = P(s), l = L(c);
						{
							let e = /* @__PURE__ */ A(() => B(a)?.shape ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.none")], ...zu.map((e) => [e, Z(`opt.divider.${e}`)])]);
							Q(l, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Ri(r(), "shape", e)
							});
						}
						D(s);
						var u = L(s, 2), d = (e) => {
							var t = Dg(), n = F(t), i = P(n), o = I(i, !0), s = L(i, 2);
							J(s);
							var c = I(L(s, 2));
							D(n);
							var l = L(n, 2), u = P(l), d = L(u);
							{
								let e = /* @__PURE__ */ A(() => B(a).color ?? "bg"), t = /* @__PURE__ */ A(vi), n = /* @__PURE__ */ A(() => Z("tip.divider.color"));
								va(d, {
									get value() {
										return B(e);
									},
									get tokens() {
										return B(t);
									},
									get label() {
										return B(n);
									},
									onchange: (e) => Ri(r(), "color", e)
								});
							}
							D(l);
							var f = L(l, 2), p = P(f);
							J(p);
							var m = L(p);
							D(f);
							var h = L(f, 2), g = P(h);
							J(g);
							var _ = L(g);
							D(h), z((e, t, n, r, i, d, v) => {
								W(o, e), X(s, "min", Bu.min), X(s, "max", Bu.max), Y(s, B(a).height ?? Bu.dflt), W(c, `${B(a).height ?? Bu.dflt ?? ""} px`), X(l, "title", t), W(u, `${n ?? ""} `), X(f, "title", r), xi(p, B(a).flip === !0), W(m, ` ${i ?? ""}`), X(h, "title", d), xi(g, B(a).invert === !0), W(_, ` ${v ?? ""}`);
							}, [
								() => Z("lbl.height"),
								() => Z("tip.divider.color"),
								() => Z("lbl.color"),
								() => Z("tip.divider.flip"),
								() => Z("lbl.dividerFlip"),
								() => Z("tip.divider.invert"),
								() => Z("lbl.patternInvert")
							]), V("input", s, (e) => Ri(r(), "height", e.target.valueAsNumber)), V("change", p, (e) => Ri(r(), "flip", e.target.checked)), V("change", g, (e) => Ri(r(), "invert", e.target.checked)), U(e, t);
						};
						G(u, (e) => {
							B(a)?.shape && e(d);
						}), z((e, t) => {
							X(s, "title", e), W(c, `${t ?? ""} `);
						}, [() => Z("tip.props.dividers"), () => Z(i())]), U(e, o);
					});
					var ae = L(ie, 4), oe = P(ae), se = L(oe);
					{
						let e = /* @__PURE__ */ A(() => Oi(B(ir)) ? B(ir).type : "");
						Q(se, {
							get value() {
								return B(e);
							},
							get options() {
								return Ai;
							},
							onchange: (e) => Li(e || null)
						});
					}
					D(ae);
					var T = L(ae, 2), ce = (e) => {
						var t = kg(), n = F(t), r = P(n), i = L(r);
						J(i), D(n);
						var a = L(n, 2), o = P(a), s = L(o);
						J(s), D(a);
						var c = L(a, 2), l = (e) => {
							var t = Og(), n = F(t), r = P(n), i = L(r);
							{
								let e = /* @__PURE__ */ A(() => B(ir).props.effect ?? "slide-up"), t = /* @__PURE__ */ A(() => [
									["fade-in", Z("anim.fadeIn")],
									["slide-up", Z("anim.slideUp")],
									["zoom-in", Z("anim.zoomIn")]
								]);
								Q(i, {
									get value() {
										return B(e);
									},
									get options() {
										return B(t);
									},
									onchange: (e) => Vi("effect", e)
								});
							}
							D(n);
							var a = L(n, 2), o = P(a), s = L(o);
							J(s), D(a);
							var c = L(a, 2), l = P(c), u = L(l);
							{
								let e = /* @__PURE__ */ A(() => B(ir).props.pattern ?? "sequence"), t = /* @__PURE__ */ A(() => [
									["sequence", Z("opt.stagger.sequence")],
									["columns", Z("opt.stagger.columns")],
									["rows", Z("opt.stagger.rows")],
									["center", Z("opt.stagger.center")]
								]);
								Q(u, {
									get value() {
										return B(e);
									},
									get options() {
										return B(t);
									},
									onchange: (e) => Vi("pattern", e)
								});
							}
							D(c), z((e, t, i, u, d, f) => {
								X(n, "title", e), W(r, `${t ?? ""} `), X(a, "title", i), W(o, `${u ?? ""} `), Y(s, B(ir).props.step ?? 90), X(c, "title", d), W(l, `${f ?? ""} `);
							}, [
								() => Z("tip.props.staggerEffect"),
								() => Z("lbl.staggerEffect"),
								() => Z("tip.props.staggerStep"),
								() => Z("lbl.stepMs"),
								() => Z("tip.props.staggerPattern"),
								() => Z("lbl.pattern")
							]), V("change", s, (e) => Bi("step", Number(e.target.value))), U(e, t);
						};
						G(c, (e) => {
							B(ir).type === "stagger" && e(l);
						}), z((e, t) => {
							W(r, `${e ?? ""} `), Y(i, B(ir).props.duration), W(o, `${t ?? ""} `), Y(s, B(ir).props.delay ?? 0);
						}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), V("change", i, (e) => Bi("duration", Number(e.target.value))), V("change", s, (e) => Bi("delay", Number(e.target.value))), U(e, t);
					}, le = /* @__PURE__ */ A(() => Oi(B(ir)));
					G(T, (e) => {
						B(le) && e(ce);
					});
					var ue = L(T, 2), de = P(ue), E = L(de);
					{
						let e = /* @__PURE__ */ A(() => B(ar)?.type ?? (B(ir) && !Oi(B(ir)) ? B(ir).type : ""));
						Q(E, {
							get value() {
								return B(e);
							},
							get options() {
								return Mi;
							},
							onchange: (e) => zi(e || null)
						});
					}
					D(ue), z((e, t, n, a, c, d, f, h, g, y, b, C, te, w, ie, se, T) => {
						W(r, e), X(i, "title", t), W(o, `${n ?? ""} `), Y(s, B(nr)), X(s, "placeholder", a), xi(l, B(tr) !== null), W(u, ` ${c ?? ""}`), X(p, "title", d), W(m, f), X(_, "title", h), W(v, `${g ?? ""} `), W(x, `#${B(er) ?? ""}`), X(S, "title", y), W(ee, b), X(ne, "title", C), W(re, te), X(ae, "title", w), W(oe, `${ie ?? ""} `), X(ue, "title", se), W(de, `${T ?? ""} `);
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
					]), V("change", s, (e) => Hi(e.target.value)), V("change", l, (e) => Wi(e.target.checked)), V("click", S, () => navigator.clipboard?.writeText(`#${B(er)}`)), U(e, t);
				}, o = (e) => {
					var t = _p(), n = I(t, !0);
					z((e) => W(n, e), [() => Z("hint.props.empty")]), U(e, t);
				};
				G(n, (e) => {
					B(N) ? e(r) : B(er) ? e(i, 1) : e(o, -1);
				}), D(t), U(e, t);
			}, re = (e) => {
				var t = Rg(), n = P(t), r = P(n);
				J(r);
				var i = L(r);
				D(n);
				var s = L(n, 2), c = (e) => {
					var t = xg(), n = P(t), r = I(n, !0), i = L(n, 2);
					qr(i, 21, () => B(k).pages ?? [], (e) => e.id, (e, t) => {
						var n = Fp(), r = P(n);
						J(r);
						var i = L(r);
						D(n), z((e, a) => {
							X(n, "title", e), xi(r, a), W(i, ` ${(B(t).title || B(t).id) ?? ""}`);
						}, [() => Z("tip.footer.hideOnPage"), () => !(B(k).footer?.hideOn ?? []).includes(B(t).id)]), V("change", r, (e) => Xu(B(t).id, e.target.checked)), U(e, n);
					}), D(i), D(t), z((e) => W(r, e), [() => Z("group.showOnPages")]), U(e, t);
				};
				G(s, (e) => {
					B(k).footer?.show && e(c);
				});
				var l = L(s, 2), u = P(l), d = I(u, !0), f = L(u, 2), p = P(f);
				qr(p, 21, () => ju, (e) => e.id, (e, t) => {
					var n = Mg(), r = P(n);
					K(r, () => Df(B(t).thumb), !0), D(r);
					var i = I(L(r, 2), !0);
					D(n), z((e) => {
						X(n, "title", e), W(i, B(t).label);
					}, [() => Z("tip.footer.template", { label: B(t).label })]), V("click", n, () => Pu(B(t).id)), U(e, n);
				}), D(p), D(f), D(l);
				var m = L(l, 2), h = P(m), g = I(h, !0), _ = L(h, 2), v = P(_), y = P(v), b = L(y);
				J(b), D(v);
				var x = L(v, 2), S = P(x), C = L(S);
				J(C), D(x);
				var ee = L(x, 2), te = P(ee), ne = L(te);
				{
					let e = /* @__PURE__ */ A(() => B(k).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ A(() => [
						["text", Z("blocks.text")],
						["image", Z("opt.brand.image")],
						["both", Z("opt.brand.both")]
					]);
					Q(ne, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => xu(e)
					});
				}
				D(ee);
				var re = L(ee, 2), ie = (e) => {
					var t = Pg(), n = F(t), r = P(n), i = P(r), a = L(i);
					D(r);
					var o = L(r, 2), s = (e) => {
						var t = Vf();
						K(t, () => w.cross, !0), D(t), z((e) => X(t, "title", e), [() => Z("tip.footer.removeLogo")]), V("click", t, Cu), U(e, t);
					};
					G(o, (e) => {
						B(k).footer?.brand?.logo && e(s);
					}), D(n);
					var c = L(n, 2), l = (e) => {
						var t = Ng(), n = F(t), r = P(n), i = I(L(r));
						D(n);
						var a = L(n, 2);
						J(a), z((e) => {
							W(r, `${e ?? ""} `), W(i, `${B(k).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Y(a, B(k).footer?.brand?.logoHeight ?? 40);
						}, [() => Z("lbl.logoHeight")]), V("input", a, (e) => Eu(e.target.value)), U(e, t);
					};
					G(c, (e) => {
						B(k).footer?.brand?.logo && e(l);
					}), z((e, t) => {
						X(r, "title", e), W(i, `${t ?? ""} `);
					}, [() => Z("tip.webpAutoPublish"), () => B(k).footer?.brand?.logo ? Z("ui.changeLogo") : Z("ui.uploadLogo")]), V("change", a, Su), U(e, t);
				};
				G(re, (e) => {
					(B(k).footer?.brand?.mode ?? "text") !== "text" && e(ie);
				}), D(_), D(m);
				var ae = L(m, 2), oe = P(ae), se = I(oe, !0), T = L(oe, 2), ce = P(T);
				qr(ce, 17, () => B(k).footer?.columns ?? [], Ur, (e, t, n) => {
					var r = Fg(), i = F(r), a = P(i);
					J(a);
					var o = L(a, 2), s = P(o);
					K(s, () => w.plus, !0), D(s);
					var c = L(s, 2);
					c.disabled = n === 0, K(c, () => w.up, !0), D(c);
					var l = L(c, 2);
					K(l, () => w.down, !0), D(l);
					var u = L(l, 2);
					K(u, () => w.cross, !0), D(u), D(o), D(i), qr(L(i, 2), 17, () => B(t).links ?? [], Ur, (e, r, i) => {
						var a = mp(), o = P(a);
						J(o);
						var s = L(o, 2), c = P(s);
						c.disabled = i === 0, K(c, () => w.up, !0), D(c);
						var l = L(c, 2);
						K(l, () => w.down, !0), D(l);
						var u = L(l, 2);
						K(u, () => w.cross, !0), D(u), D(s);
						var d = L(s, 2), f = P(d);
						{
							let e = /* @__PURE__ */ A(() => B(r).page ?? "__href"), t = /* @__PURE__ */ A(() => Z("tip.linkTarget")), a = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
							Q(f, {
								get value() {
									return B(e);
								},
								get title() {
									return B(t);
								},
								get options() {
									return B(a);
								},
								onchange: (e) => ad(n, i, e)
							});
						}
						D(d);
						var p = L(d, 2), m = (e) => {
							var t = pp();
							J(t), z((e, n) => {
								Y(t, B(r).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), V("change", t, (e) => od(n, i, e.target.value)), U(e, t);
						};
						G(p, (e) => {
							B(r).page || e(m);
						}), D(a), z((e, n) => {
							Y(o, B(r).label), X(o, "title", e), l.disabled = i === B(t).links.length - 1, X(u, "title", n);
						}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), V("input", o, (e) => id(n, i, e.target.value)), V("click", c, () => rd(n, i, -1)), V("click", l, () => rd(n, i, 1)), V("click", u, () => nd(n, i)), U(e, a);
					}), z((e, r, i) => {
						Y(a, B(t).title), X(a, "title", e), X(s, "title", r), l.disabled = n === B(k).footer.columns.length - 1, X(u, "title", i);
					}, [
						() => Z("tip.footer.columnTitle"),
						() => Z("tip.footer.addLink"),
						() => Z("tip.footer.removeColumn")
					]), V("input", a, (e) => ed(n, e.target.value)), V("click", s, () => td(n)), V("click", c, () => $u(n, -1)), V("click", l, () => $u(n, 1)), V("click", u, () => Qu(n)), U(e, r);
				});
				var le = L(ce, 2), ue = I(le, !0), de = L(le, 2), E = P(de), fe = L(E);
				{
					let e = /* @__PURE__ */ A(() => B(k).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ A(() => [["left", Z("common.left")], ["center", Z("common.center")]]);
					Q(fe, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => Wu(e)
					});
				}
				D(de), D(T), D(ae);
				var pe = L(ae, 2), me = P(pe), he = I(me, !0), ge = L(me, 2), _e = P(ge);
				qr(_e, 17, () => B(k).footer?.social ?? [], Ur, (e, t, n) => {
					var r = Ig(), i = P(r), a = P(i);
					K(a, () => eo(B(t).icon) || "", !0), D(a);
					var o = L(a, 2);
					{
						let e = /* @__PURE__ */ A(() => Z("blocks.icon"));
						Q(o, {
							get value() {
								return B(t).icon;
							},
							get title() {
								return B(e);
							},
							get options() {
								return fd;
							},
							onchange: (e) => ud(n, e)
						});
					}
					D(i);
					var s = L(i, 2), c = P(s);
					c.disabled = n === 0, K(c, () => w.up, !0), D(c);
					var l = L(c, 2);
					K(l, () => w.down, !0), D(l);
					var u = L(l, 2);
					K(u, () => w.cross, !0), D(u), D(s);
					var d = L(s, 2);
					J(d), D(r), z((e, r) => {
						l.disabled = n === B(k).footer.social.length - 1, X(u, "title", e), Y(d, B(t).url), X(d, "placeholder", r);
					}, [() => Z("tip.removeLink"), () => Z("ph.hrefMailto")]), V("click", c, () => ld(n, -1)), V("click", l, () => ld(n, 1)), V("click", u, () => cd(n)), V("change", d, (e) => dd(n, e.target.value)), U(e, r);
				});
				var ve = L(_e, 2), ye = I(ve, !0);
				D(ge), D(pe);
				var be = L(pe, 2), xe = P(be), Se = I(xe, !0), Ce = L(xe, 2), we = P(Ce), Te = P(we);
				J(Te);
				var Ee = L(Te);
				D(we);
				var Oe = L(we, 2), ke = (e) => {
					let t = /* @__PURE__ */ A(() => B(k).footer.cta);
					var n = Lg(), r = F(n), i = P(r), a = L(i);
					{
						let e = /* @__PURE__ */ A(() => B(t).kind ?? "button"), n = /* @__PURE__ */ A(() => [["button", Z("opt.cta.button")], ["newsletter", Z("opt.cta.newsletter")]]);
						Q(a, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => qu("kind", e)
						});
					}
					D(r);
					var o = L(r, 2), s = P(o);
					J(s);
					var c = L(s);
					D(o);
					var l = L(o, 2), u = P(l), d = L(u);
					J(d), D(l);
					var f = L(l, 2), p = P(f), m = L(p);
					J(m), D(f);
					var h = L(f, 2), g = P(h), _ = L(g);
					J(_), D(h);
					var v = L(h, 2), y = (e) => {
						var n = Rf(), r = F(n), i = P(r), a = L(i);
						{
							let e = /* @__PURE__ */ A(() => B(t).page ?? "__href"), n = /* @__PURE__ */ A(() => [...B(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHrefMailto")]]);
							Q(a, {
								get value() {
									return B(e);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => Yu(e)
							});
						}
						D(r);
						var o = L(r, 2), s = (e) => {
							var n = bp();
							J(n), z((e, r) => {
								Y(n, B(t).href ?? ""), X(n, "placeholder", e), X(n, "title", r);
							}, [() => Z("ph.hrefMailtoAnchor"), () => Z("tip.hrefAnchor")]), V("change", n, (e) => qu("href", e.target.value)), U(e, n);
						};
						G(o, (e) => {
							B(t).page || e(s);
						}), z((e, t) => {
							X(r, "title", e), W(i, `${t ?? ""} `);
						}, [() => Z("tip.footer.ctaTarget"), () => Z("lbl.buttonTarget")]), U(e, n);
					}, b = (e) => {
						var n = kp(), r = F(n), i = P(r), a = L(i);
						J(a), D(r);
						var o = L(r, 2), s = P(o), c = L(s);
						J(c), D(o);
						var l = L(o, 2), u = P(l), d = L(u);
						J(d), D(l), z((e, n, f, p, m, h, g, _, v) => {
							X(r, "title", e), W(i, `${n ?? ""} `), Y(a, B(t).endpoint ?? ""), X(a, "placeholder", f), X(o, "title", p), W(s, `${m ?? ""} `), Y(c, B(t).recipient ?? ""), X(c, "placeholder", h), X(l, "title", g), W(u, `${_ ?? ""} `), Y(d, B(t).success ?? ""), X(d, "placeholder", v);
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
						]), V("change", a, (e) => qu("endpoint", e.target.value)), V("change", c, (e) => qu("recipient", e.target.value)), V("input", d, (e) => qu("success", e.target.value)), U(e, n);
					};
					G(v, (e) => {
						(B(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
					}), z((e, n, a, v, y, b, x, S, C, ee, te, w) => {
						X(r, "title", e), W(i, `${n ?? ""} `), X(o, "title", a), xi(s, B(t).big === !0), W(c, ` ${v ?? ""}`), X(l, "title", y), W(u, `${b ?? ""} `), Y(d, B(t).heading ?? ""), X(d, "placeholder", x), X(f, "title", S), W(p, `${C ?? ""} `), Y(m, B(t).sub ?? ""), X(h, "title", ee), W(g, `${te ?? ""} `), Y(_, B(t).label ?? ""), X(_, "placeholder", w);
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
					]), V("change", s, (e) => qu("big", e.target.checked)), V("input", d, (e) => qu("heading", e.target.value)), V("input", m, (e) => qu("sub", e.target.value)), V("input", _, (e) => qu("label", e.target.value)), U(e, n);
				};
				G(Oe, (e) => {
					B(k).footer?.cta && e(ke);
				}), D(Ce), D(be);
				var Ae = L(be, 2), je = P(Ae), Me = I(je, !0), Ne = L(je, 2), Pe = P(Ne);
				o(Pe, () => "linkRow", () => B(k).footer?.linkRow ?? []);
				var Fe = L(Pe, 2), Ie = I(Fe, !0);
				D(Ne), D(Ae);
				var Le = L(Ae, 2), Re = P(Le), ze = I(Re, !0), Be = L(Re, 2), Ve = P(Be), He = (e) => {
					var t = vm(), n = F(t), r = P(n), i = L(r);
					{
						let e = /* @__PURE__ */ A(() => B(k).footer?.align ?? "left"), t = /* @__PURE__ */ A(() => [
							["left", Z("common.left")],
							["center", Z("common.center")],
							["right", Z("common.right")]
						]);
						Q(i, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => yu("footer", (t) => {
								t.align = e;
							})
						});
					}
					D(n), De(2), z((e, t) => {
						X(n, "title", e), W(r, `${t ?? ""} `);
					}, [() => Z("tip.footer.align"), () => Z("lbl.align")]), U(e, t);
				};
				G(Ve, (e) => {
					B(k).footer?.cta?.big !== !0 && e(He);
				});
				var Ue = L(Ve, 2), We = I(Ue, !0), Ge = L(Ue, 2);
				a(Ge, () => pi, () => B(k).footer?.background?.layers ?? []), D(Be), D(Le);
				var Ke = L(Le, 2), qe = P(Ke), Je = I(qe, !0), Ye = L(qe, 2), Xe = P(Ye), Ze = P(Xe), Qe = L(Ze);
				J(Qe), D(Xe);
				var $e = L(Xe, 2), O = I($e, !0), et = L($e, 2);
				o(et, () => "baseline", () => B(k).footer?.baseline ?? []);
				var tt = L(et, 2), nt = I(tt, !0);
				D(Ye), D(Ke), D(t), z((e, t, a, o, s, c, l, u, f, p, m, h, _, w, ne, re, ie, ae, oe, T, ce, le, fe, pe, me, ge, _e, ve, be, xe, Ce, D) => {
					X(n, "title", e), xi(r, t), W(i, ` ${a ?? ""}`), W(d, o), W(g, s), X(v, "title", c), W(y, `${l ?? ""} `), Y(b, B(k).footer?.brand?.title ?? ""), X(b, "placeholder", u), X(x, "title", f), W(S, `${p ?? ""} `), Y(C, B(k).footer?.brand?.tagline ?? ""), X(ee, "title", m), W(te, `${h ?? ""} `), W(se, _), W(ue, w), X(de, "title", ne), W(E, `${re ?? ""} `), W(he, ie), W(ye, ae), W(Se, oe), X(we, "title", T), xi(Te, ce), W(Ee, ` ${le ?? ""}`), W(Me, fe), W(Ie, pe), W(ze, me), W(We, ge), W(Je, _e), X(Xe, "title", ve), W(Ze, `${be ?? ""} `), Y(Qe, B(k).footer?.copyright ?? ""), X(Qe, "placeholder", xe), W(O, Ce), W(nt, D);
				}, [
					() => Z("tip.footer.show"),
					() => !!B(k).footer?.show,
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
					() => !!B(k).footer?.cta,
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
				]), V("change", r, (e) => yu("footer", (t) => {
					t.show = e.target.checked;
				})), V("input", b, (e) => bu("title", e.target.value)), V("input", C, (e) => bu("tagline", e.target.value)), V("click", le, Zu), V("click", ve, sd), V("change", Te, (e) => Gu(e.target.checked)), V("click", Fe, () => Fu("linkRow")), V("input", Qe, (e) => Au(e.target.value)), V("click", tt, () => Fu("baseline")), U(e, t);
			}, ie = (e) => {
				var t = Kg(), n = P(t), r = (e) => {
					var t = rp(), n = P(t), r = L(n);
					{
						let e = /* @__PURE__ */ A(() => B(Wc) ?? ""), t = /* @__PURE__ */ A(() => [["", Z("common.choose")], ...B(Hc).map((e) => [e, B(Uc)[e]?.name ?? e])]);
						Q(r, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => M(Wc, e || null, !0)
						});
					}
					D(t), z((e) => W(n, `${e ?? ""} `), [() => Z("blocks.collection")]), U(e, t);
				};
				G(n, (e) => {
					B(Hc).length && e(r);
				});
				var i = L(n, 2), a = (e) => {
					let t = /* @__PURE__ */ A(() => B(Uc)[B(Wc)]);
					var n = Gg(), r = F(n), i = P(r), a = I(i, !0), o = L(i, 2), s = I(o, !0), c = L(o, 2), l = P(c), u = L(l);
					D(c);
					var d = L(c, 2);
					K(d, () => w.cross, !0), D(d), D(r);
					var f = L(r, 2);
					qr(f, 19, () => B(t).entries, (e) => e.id, (e, n, r) => {
						var i = Wg(), a = P(i), o = I(a), s = L(a, 2), c = P(s), l = P(c);
						J(l);
						var u = L(l, 2), d = P(u);
						K(d, () => w.up, !0), D(d);
						var f = L(d, 2);
						K(f, () => w.down, !0), D(f);
						var p = L(f, 2);
						K(p, () => w.cross, !0), D(p), D(u), D(c);
						var m = L(c, 2), h = (e) => {
							var t = zg(), r = P(t), i = L(r);
							J(i), D(t), z((e) => {
								W(r, `${e ?? ""} `), Y(i, B(n).date ?? "");
							}, [() => Z("lbl.date")]), V("change", i, (e) => wl(B(Wc), B(n).id, "date", e.target.value)), U(e, t);
						};
						G(m, (e) => {
							B(t).kind !== "products" && e(h);
						});
						var g = L(m, 2);
						ot(g);
						var _ = L(g, 2), v = (e) => {
							var t = vp(), r = P(t), i = L(r);
							J(i), D(t), z((e, t) => {
								W(r, `${e ?? ""} `), Y(i, B(n).href ?? ""), X(i, "placeholder", t);
							}, [() => Z("lbl.link"), () => Z("ph.collections.href")]), V("change", i, (e) => wl(B(Wc), B(n).id, "href", e.target.value)), U(e, t);
						};
						G(_, (e) => {
							B(t).kind !== "products" && e(v);
						});
						var y = L(_, 2), b = P(y), x = P(b), S = L(x);
						D(b);
						var C = L(b, 2), ee = (e) => {
							var t = Bg(), r = F(t), i = L(r, 2);
							K(i, () => w.cross, !0), D(i), z((e) => {
								X(r, "src", B(n).image), X(i, "title", e);
							}, [() => Z("tip.removeImage")]), V("click", i, () => wl(B(Wc), B(n).id, "image", "")), U(e, t);
						};
						G(C, (e) => {
							B(n).image && e(ee);
						}), D(y);
						var te = L(y, 2), ne = (e) => {
							var t = Ug(), r = F(t), i = P(r), a = L(i);
							J(a), D(r);
							var o = L(r, 2), s = P(o), c = L(s);
							J(c), D(o);
							var l = L(o, 2), u = P(l), d = L(u);
							J(d), D(l);
							var f = L(l, 2), p = P(f), m = L(p);
							J(m), D(f);
							var h = L(f, 2);
							qr(h, 17, () => B(n).colors ?? [], Ur, (e, t, r) => {
								var i = Hg(), a = P(i);
								J(a);
								var o = L(a, 2), s = P(o), c = L(s);
								D(o);
								var l = L(o, 2), u = (e) => {
									var n = Vg();
									z(() => X(n, "src", B(t).image)), U(e, n);
								};
								G(l, (e) => {
									B(t).image && e(u);
								});
								var d = L(l, 2);
								K(d, () => w.cross, !0), D(d), D(i), z((e, n) => {
									Y(a, B(t).name), X(a, "placeholder", e), W(s, `${n ?? ""} `);
								}, [() => Z("ph.colorName"), () => B(t).image ? Z("ui.changeImage") : Z("ui.addImage")]), V("change", a, (e) => Al(B(Wc), B(n).id, r, "name", e.target.value)), V("change", c, (e) => jl(B(Wc), B(n).id, r, e)), V("click", d, () => Ml(B(Wc), B(n).id, r)), U(e, i);
							});
							var g = L(h, 2), _ = I(g, !0);
							z((e, t, r, h, v, y, b, x, S, C, ee) => {
								W(i, `${e ?? ""} `), Y(a, B(n).price ?? ""), X(o, "title", t), W(s, `${r ?? ""} `), Y(c, B(n).memberPrice ?? ""), X(l, "title", h), W(u, `${v ?? ""} `), Y(d, B(n).badge ?? ""), X(f, "title", y), W(p, `${b ?? ""} `), Y(m, x), X(m, "placeholder", S), X(g, "title", C), W(_, ee);
							}, [
								() => Z("lbl.price"),
								() => Z("tip.entry.memberPrice"),
								() => Z("lbl.memberPrice"),
								() => Z("tip.entry.badge"),
								() => Z("lbl.productBadge"),
								() => Z("tip.entry.sizes"),
								() => Z("lbl.sizes"),
								() => (B(n).sizes ?? []).join(", "),
								() => Z("ph.sizes"),
								() => Z("tip.entry.colors"),
								() => Z("ui.addColor")
							]), V("change", a, (e) => wl(B(Wc), B(n).id, "price", e.target.value === "" ? "" : Number(e.target.value))), V("change", c, (e) => wl(B(Wc), B(n).id, "memberPrice", e.target.value === "" ? "" : Number(e.target.value))), V("change", d, (e) => wl(B(Wc), B(n).id, "badge", e.target.value)), V("change", m, (e) => Ol(B(Wc), B(n).id, e.target.value)), V("click", g, () => kl(B(Wc), B(n).id)), U(e, t);
						};
						G(te, (e) => {
							B(t).kind === "products" && e(ne);
						}), D(s), D(i), z((e, i, a, s, c) => {
							W(o, `${e ?? ""}${B(t).kind === "products" ? B(n).price == null ? "" : ` · ${B(n).price}` : B(n).date ? ` · ${B(n).date}` : ""}`), Y(l, B(n).title), X(l, "title", i), d.disabled = B(r) === 0, f.disabled = B(r) === B(t).entries.length - 1, X(p, "title", a), X(g, "placeholder", s), Y(g, B(n).text ?? ""), W(x, `${c ?? ""} `);
						}, [
							() => _l(B(n).title),
							() => Z("lbl.title"),
							() => Z("tip.collections.deleteEntry"),
							() => Z("ph.collections.text"),
							() => B(n).image ? Z("ui.changeImage") : Z("ui.addImage")
						]), V("change", l, (e) => wl(B(Wc), B(n).id, "title", e.target.value || Z("ui.untitled"))), V("click", d, () => Tl(B(Wc), B(r), -1)), V("click", f, () => Tl(B(Wc), B(r), 1)), V("click", p, () => El(B(Wc), B(n).id)), V("change", g, (e) => wl(B(Wc), B(n).id, "text", e.target.value)), V("change", S, (e) => Dl(B(Wc), B(n).id, e)), U(e, i);
					});
					var p = L(f, 2), m = (e) => {
						var t = _p(), n = I(t, !0);
						z((e) => W(n, e), [() => Z("hint.collections.empty")]), U(e, t);
					};
					G(p, (e) => {
						B(t).entries.length || e(m);
					}), De(2), z((e, t, n, r, i, u) => {
						W(a, e), X(o, "title", t), W(s, n), X(c, "title", r), W(l, `${i ?? ""} `), X(d, "title", u);
					}, [
						() => Z("ui.addEntry"),
						() => Z("tip.collections.exportCsv"),
						() => Z("ui.exportCsv"),
						() => Z("tip.collections.importCsv"),
						() => Z("ui.importCsv"),
						() => Z("tip.collections.deleteCollection")
					]), V("click", i, () => Cl(B(Wc))), V("click", o, () => Nl(B(Wc))), V("change", u, (e) => Pl(B(Wc), e)), V("click", d, () => Sl(B(Wc))), U(e, n);
				};
				G(i, (e) => {
					B(Wc) && B(Uc)[B(Wc)] && e(a);
				});
				var o = L(i, 2), s = P(o), c = L(s);
				J(c), D(o);
				var l = L(o, 2), u = P(l);
				Q(L(u), {
					get value() {
						return B(Kc);
					},
					get options() {
						return qc;
					},
					onchange: (e) => M(Kc, e, !0)
				}), D(l);
				var d = L(l, 2), f = I(d, !0);
				D(t), z((e, t, n, r, i) => {
					W(s, `${e ?? ""} `), X(c, "placeholder", t), W(u, `${n ?? ""} `), d.disabled = r, W(f, i);
				}, [
					() => Z("lbl.newCollectionName"),
					() => Z("ph.collections.name"),
					() => Z("common.type"),
					() => !B(Gc).trim(),
					() => Z("ui.createCollection")
				]), V("keydown", c, (e) => e.key === "Enter" && bl()), Ti(c, () => B(Gc), (e) => M(Gc, e)), V("click", d, bl), U(e, t);
			}, ae = (e) => {
				var t = $g(), n = P(t), r = (e) => {
					var t = _p(), n = I(t, !0);
					z((e) => W(n, e), [() => Z("hint.plugins.empty")]), U(e, t);
				}, i = /* @__PURE__ */ A(() => !Kl().length);
				G(n, (e) => {
					B(i) && e(r);
				});
				var a = L(n, 2);
				qr(a, 16, Kl, (e) => e, (e, t) => {
					let n = /* @__PURE__ */ A(() => zl[t]), r = /* @__PURE__ */ A(() => (B(Rl)?.enabled ?? []).includes(t));
					var i = Yg();
					let a;
					var o = P(i), s = P(o), c = I(s, !0), l = L(s, 2), u = (e) => {
						var t = qg(), r = I(t);
						z(() => W(r, `v${B(n).version ?? ""}`)), U(e, t);
					};
					G(l, (e) => {
						B(n)?.version && e(u);
					});
					var d = L(l, 2), f = P(d), p = P(f);
					J(p);
					var m = L(p);
					D(f);
					var h = L(f, 2);
					K(h, () => w.cross, !0), D(h), D(d), D(o);
					var g = L(o, 2), _ = (e) => {
						var t = Jg(), r = I(t, !0);
						z((e) => W(r, e), [() => B(n).errors.join("; ")]), U(e, t);
					}, v = (e) => {
						var t = Jg(), r = I(t, !0);
						z((e) => W(r, e), [() => Z("plugin.engineMismatch", {
							required: B(n).requiresEngine,
							current: B(Bl)
						})]), U(e, t);
					}, y = (e) => {
						var t = Jg(), r = I(t, !0);
						z((e) => W(r, e), [() => Z("plugin.cspNeeded", { list: $l(B(n).csp).join(", ") })]), U(e, t);
					}, b = /* @__PURE__ */ A(() => B(n)?.csp && $l(B(n).csp).length);
					G(g, (e) => {
						B(n)?.errors?.length ? e(_) : B(n) && !B(n).satisfied ? e(v, 1) : B(b) && e(y, 2);
					});
					var x = L(g, 2), S = (e) => {
						var t = _p(), r = I(t, !0);
						z((e) => W(r, e), [() => Z("plugin.languages", { list: B(n).languages.map((e) => e.name).join(", ") })]), U(e, t);
					};
					G(x, (e) => {
						B(n)?.languages?.length && e(S);
					}), D(i), z((e, t, o, s, l) => {
						a = q(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": B(n)?.errors?.length }), W(c, e), X(f, "title", t), xi(p, B(r)), p.disabled = o, W(m, ` ${s ?? ""}`), X(h, "title", l);
					}, [
						() => B(n)?.names?.[qi()] ?? B(n)?.name ?? t,
						() => B(r) ? Z("tip.plugins.on") : Z("tip.plugins.off"),
						() => !!B(n)?.errors?.length,
						() => B(r) ? Z("ui.on") : Z("ui.off"),
						() => Z("tip.plugins.remove")
					]), V("change", p, (e) => mu(t, e.target.checked)), V("click", h, () => gu(t)), U(e, i);
				});
				var o = L(a, 2), s = (e) => {
					var t = Zg(), n = L(F(t), 2), r = I(n, !0);
					qr(L(n, 2), 16, () => B(Ul), (e) => e, (e, t) => {
						var n = Xg(), r = P(n), i = P(r), a = I(i, !0), o = L(i, 2), s = (e) => {
							var n = qg(), r = I(n);
							z(() => W(r, `v${zl[t].version ?? ""}`)), U(e, n);
						};
						G(o, (e) => {
							zl[t]?.version && e(s);
						});
						var c = L(o, 2), l = P(c);
						K(l, () => w.right, !0), D(l), D(c), D(r), D(n), z((e, t) => {
							W(a, e), X(l, "title", t);
						}, [() => zl[t]?.names?.[qi()] ?? zl[t]?.name ?? t, () => Z("tip.plugins.addFound")]), V("click", l, () => vu(t)), U(e, n);
					}), z((e) => W(r, e), [() => Z("hint.plugins.found")]), U(e, t);
				};
				G(o, (e) => {
					B(Ul).length && e(s);
				});
				var c = L(o, 2), l = (e) => {
					var t = Mr(), n = F(t), r = (e) => {
						var t = _p(), n = I(t, !0);
						z((e) => W(n, e), [() => Z("hint.plugins.autoDiscover")]), U(e, t);
					};
					G(n, (e) => {
						B(Ul).length || e(r);
					}), U(e, t);
				}, u = (e) => {
					var t = Qg(), n = L(F(t), 2);
					J(n);
					var r = L(n, 2), i = I(r, !0), a = L(r, 2), o = (e) => {
						var t = Jg(), n = I(t, !0);
						z(() => W(n, B(Hl))), U(e, t);
					};
					G(a, (e) => {
						B(Hl) && e(o);
					}), z((e, t, a) => {
						X(n, "placeholder", e), r.disabled = t, W(i, a);
					}, [
						() => Z("ph.plugins.folder"),
						() => !B(Vl).trim(),
						() => Z("ui.addPlugin")
					]), V("keydown", n, (e) => e.key === "Enter" && _u()), Ti(n, () => B(Vl), (e) => M(Vl, e)), V("click", r, _u), U(e, t);
				};
				G(c, (e) => {
					B(Gl) === "ok" ? e(l) : e(u, -1);
				}), D(t), U(e, t);
			}, se = (e) => {
				var t = jg(), n = P(t), r = (e) => {
					var t = _p(), n = I(t, !0);
					z((e) => W(n, e), [() => Z("hint.history.loading")]), U(e, t);
				}, i = (e) => {
					var t = Nh(), n = F(t), r = (e) => {
						var t = _p(), n = I(t, !0);
						z(() => W(n, B(ra))), U(e, t);
					};
					G(n, (e) => {
						B(ra) && e(r);
					});
					var i = L(n, 2), a = (e) => {
						var t = t_(), n = F(t), r = I(n, !0);
						qr(L(n, 2), 19, () => B(na), (e) => e.sha, (e, t, n) => {
							var r = e_();
							let i;
							var a = P(r), o = I(a, !0), s = I(L(a, 2));
							D(r), z((e) => {
								i = q(r, 1, "history-row svelte-1n46o8q", null, i, { head: B(n) === 0 }), X(a, "title", B(t).sha), W(o, B(t).message), W(s, `${B(t).author ?? ""}${e ?? ""}`);
							}, [() => B(t).date ? ` · ${oa.format(new Date(B(t).date))}` : ""]), U(e, r);
						}), z((e, t) => {
							n.disabled = B(ia) || !B(he)?.allowed, X(n, "title", e), W(r, t);
						}, [() => B(he)?.allowed ? Z("tip.history.revert") : Z("tip.history.needsAccess"), () => Z("ui.revertLast")]), V("click", n, ca), U(e, t);
					};
					G(i, (e) => {
						B(na).length > 0 && e(a);
					}), U(e, t);
				};
				G(n, (e) => {
					B(na) === null ? e(r) : e(i, -1);
				}), D(t), U(e, t);
			}, ce = (e) => {
				var t = jg(), n = P(t), r = (e) => {
					var t = _p(), n = I(t, !0);
					z((e) => W(n, e), [() => Z("update.checking")]), U(e, t);
				}, i = (e) => {
					var t = n_(), n = F(t), r = I(n, !0), i = L(n, 2), a = I(i, !0);
					z((e) => {
						W(r, B(pa)), W(a, e);
					}, [() => Z("update.retry")]), V("click", i, ga), U(e, t);
				}, a = (e) => {
					var t = p_(), n = F(t), r = P(n), i = I(r, !0), a = L(r, 2), o = (e) => {
						var t = r_(), n = F(t);
						K(n, () => w.right, !0), D(n);
						var r = I(L(n, 2), !0);
						z(() => W(r, B(fa).target)), U(e, t);
					};
					G(a, (e) => {
						B(fa).upToDate || e(o);
					}), D(n);
					var s = L(n, 2), c = (e) => {
						var t = _p(), n = I(t, !0);
						z((e) => W(n, e), [() => Z("update.upToDate")]), U(e, t);
					}, l = (e) => {
						var t = f_(), n = F(t), r = I(n, !0), i = L(n, 2), a = (e) => {
							var t = i_(), n = P(t), r = I(n, !0), i = L(n, 2), a = I(P(i), !0);
							D(i), D(t), z((e) => {
								W(r, e), W(a, B(fa).notes);
							}, [() => Z("update.aboutVersion", { target: B(fa).target })]), U(e, t);
						};
						G(i, (e) => {
							B(fa).notes && e(a);
						});
						var o = L(i, 2), s = (e) => {
							var t = a_(), n = P(t), r = P(n);
							K(r, () => w.warn, !0), D(r);
							var i = L(r);
							D(n);
							var a = L(n, 2), o = I(P(a), !0);
							D(a), D(t), z((e, t) => {
								X(n, "title", e), W(i, ` ${t ?? ""}`), W(o, B(fa).headers.upstream);
							}, [() => Z("update.headersManual"), () => Z("update.headersTitle")]), U(e, t);
						};
						G(o, (e) => {
							B(fa).headers?.upstream && e(s);
						});
						var c = L(o, 2);
						qr(c, 17, () => B(fa).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
							var n = s_(), r = P(n), i = I(r, !0), a = L(r, 2), o = P(a), s = (e) => {
								var t = o_(), n = I(t, !0);
								z((e) => W(n, e), [() => Z("update.actionDelete")]), U(e, t);
							};
							G(o, (e) => {
								B(t).action === "delete" && e(s);
							});
							var c = L(o, 2);
							K(c, () => w.warn, !0), D(c), D(a), D(n), z((e) => {
								X(r, "title", B(t).path), W(i, B(t).path), X(c, "title", e);
							}, [() => Z(`update.conflict.${B(t).conflict}`)]), U(e, n);
						});
						var l = L(c, 2), u = P(l), d = I(u), f = L(u, 2);
						qr(f, 21, () => B(fa).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
							var n = c_(), r = P(n), i = I(r, !0), a = L(r, 2), o = (e) => {
								var t = o_(), n = I(t, !0);
								z((e) => W(n, e), [() => Z("update.actionDelete")]), U(e, t);
							};
							G(a, (e) => {
								B(t).action === "delete" && e(o);
							}), D(n), z(() => {
								X(r, "title", B(t).path), W(i, B(t).path);
							}), U(e, n);
						}), D(f), D(l);
						var p = L(l, 2), m = (e) => {
							var t = d_(), n = F(t), r = P(n), i = I(r, !0), a = I(L(r, 2), !0);
							D(n), qr(L(n, 2), 17, () => B(fa).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
								var n = u_(), r = P(n);
								let i;
								var a = I(r, !0), o = L(r, 2), s = P(o), c = (e) => {
									var t = o_(), n = I(t, !0);
									z((e) => W(n, e), [() => Z("update.actionDelete")]), U(e, t);
								};
								G(s, (e) => {
									B(t).action === "delete" && e(c);
								});
								var l = L(s, 2), u = (e) => {
									var n = l_();
									K(n, () => w.warn, !0), D(n), z((e) => X(n, "title", e), [() => Z(`update.conflict.${B(t).conflict}`)]), U(e, n);
								};
								G(l, (e) => {
									B(t).conflict && e(u);
								});
								var d = L(l, 2);
								J(d), D(o), D(n), z((e, n, o, s) => {
									i = q(r, 1, "update-path svelte-1n46o8q", null, i, { skipped: e }), X(r, "title", B(t).path), W(a, B(t).path), xi(d, n), X(d, "title", o), X(d, "aria-label", s);
								}, [
									() => B(ha).has(B(t).path),
									() => B(ha).has(B(t).path),
									() => Z("update.keepMine.title"),
									() => Z("update.keepMine")
								]), V("change", d, () => _a(B(t).path)), U(e, n);
							}), z((e, t) => {
								W(i, e), W(a, t);
							}, [() => Z("update.optionalTitle"), () => Z("update.keepMine")]), U(e, t);
						}, h = /* @__PURE__ */ A(() => B(fa).changes.some((e) => !e.atom));
						G(p, (e) => {
							B(h) && e(m);
						});
						var g = L(p, 2), _ = I(g, !0);
						z((e, t, n, i, a, o) => {
							W(r, e), X(u, "title", t), W(d, `${n ?? ""} · ${i ?? ""}`), g.disabled = B(ma) || !B(he)?.allowed, X(g, "title", a), W(_, o);
						}, [
							() => Z("update.summary", {
								writes: B(fa).changes.filter((e) => e.action === "write").length,
								deletes: B(fa).changes.filter((e) => e.action === "delete").length
							}),
							() => Z("update.atomGroup.title"),
							() => Z("update.atomTitle"),
							() => B(fa).changes.filter((e) => e.atom).length,
							() => B(he)?.allowed ? Z("update.run.title") : Z("tip.history.needsAccess"),
							() => Z("update.run", { target: B(fa).target })
						]), V("click", g, ya), U(e, t);
					};
					G(s, (e) => {
						B(fa).upToDate ? e(c) : e(l, -1);
					}), z((e) => W(i, e), [() => Z("update.current", { version: B(fa).current })]), U(e, t);
				};
				G(n, (e) => {
					B(ma) && !B(fa) ? e(r) : B(pa) ? e(i, 1) : B(fa) && e(a, 2);
				}), D(t), U(e, t);
			};
			G(_, (e) => {
				B(Rt) === "pages" ? e(v) : B(Rt) === "nav" ? e(y, 1) : B(Rt) === "site" ? e(b, 2) : B(Rt) === "theme" ? e(x, 3) : B(Rt) === "blocks" ? e(ee, 4) : B(Rt) === "grid" ? e(te, 5) : B(Rt) === "properties" ? e(ne, 6) : B(Rt) === "footer" ? e(re, 7) : B(Rt) === "collections" ? e(ie, 8) : B(Rt) === "plugins" ? e(ae, 9) : B(Rt) === "history" ? e(se, 10) : B(Rt) === "update" && e(ce, 11);
			}), D(t), ki(t, (e) => M(qd, e), () => B(qd)), z((e) => {
				n = q(t, 1, "panel svelte-1n46o8q", null, n, { hidden: !B(_e) }), X(i, "title", e), W(s, Vt[B(Rt)]);
			}, [() => Ht[B(Rt)]?.map((e) => Z(e)).join("\n")]), U(e, t);
		};
		G(y, (e) => {
			B(Rt) && e(b);
		});
		var x = L(y, 2);
		let ee;
		var te = P(x), re = P(te);
		ki(re, (e) => M(me, e), () => B(me)), D(te), D(x), ki(x, (e) => M(je, e), () => B(je)), D(t), z((e, t) => {
			r = q(n, 1, "rail svelte-1n46o8q", null, r, { hidden: !B(_e) }), p = q(l, 1, "rail-gear svelte-1n46o8q", null, p, { active: B(ka) }), X(l, "title", e), ee = q(x, 1, "frame-wrap svelte-1n46o8q", null, ee, {
				mobile: B(Ae) === "mobile",
				pan: B(We),
				fold: B(Re) > 0
			}), gi(te, `width:${B(He) ?? ""}px; height:${B(Ue) ?? ""}px`), X(re, "title", t), X(re, "src", `/?page=${B(T)}&preview=1`), gi(re, `width:${B(Le) ?? ""}px; height:${B(Ve) ?? ""}px; transform:scale(${B(ze) ?? ""}); transform-origin:top left`);
		}, [() => Z("settings.title"), () => Z("ui.previewTitle")]), V("click", l, () => M(ka, !B(ka))), Sr("load", re, Ea), br(re), U(e, t);
	}, Ov = (e) => {
		var t = g_(), n = I(t, !0);
		z((e) => W(n, e), [() => Z("ui.loading")]), U(e, t);
	};
	G(Ev, (e) => {
		B(se) ? e(Dv) : e(Ov, -1);
	});
	var kv = L(Ev, 2), Av = (e) => {
		Ts(e, {
			get image() {
				return B(wo);
			},
			onapply: Eo,
			oncancel: () => M(wo, null)
		});
	};
	G(kv, (e) => {
		B(wo) && e(Av);
	});
	var jv = L(kv, 2), Mv = (e) => {
		var t = v_(), n = P(t), r = P(n), i = I(r, !0), a = L(r, 2);
		qr(a, 16, () => B(Ct).lines, (e) => e, (e, t) => {
			var n = __(), r = I(n, !0);
			z(() => W(r, t)), U(e, n);
		});
		var o = L(a, 2), s = (e) => {
			var t = bp();
			J(t), at(t, !0), z(() => X(t, "placeholder", B(Ct).placeholder)), V("keydown", t, (e) => e.key === "Enter" && B(Ct).value.trim() && Et(!0)), Ti(t, () => B(Ct).value, (e) => B(Ct).value = e), U(e, t);
		};
		G(o, (e) => {
			B(Ct).prompt && e(s);
		});
		var c = L(o, 2), l = P(c), u = I(l, !0), d = L(l, 2), f = I(d, !0);
		D(c), D(n), D(t), z(() => {
			W(i, B(Ct).title), W(u, B(Ct).cancelLabel), W(f, B(Ct).okLabel);
		}), V("pointerdown", t, (e) => Dt = e.target === e.currentTarget), V("click", t, (e) => Dt && e.target === e.currentTarget && Et(!1)), V("click", l, () => Et(!1)), V("click", d, () => Et(!0)), U(e, t);
	};
	G(jv, (e) => {
		B(Ct) && e(Mv);
	});
	var Nv = L(jv, 2), Pv = (e) => {
		var t = y_(), n = P(t), r = P(n), i = I(r, !0), a = L(r, 2), o = I(a, !0), s = L(a, 2), c = P(s), l = L(c);
		J(l), D(s);
		var u = L(s, 2), d = P(u), f = L(d);
		{
			let e = /* @__PURE__ */ A(() => Z("setup.accentPick"));
			va(f, {
				get value() {
					return B(At);
				},
				get label() {
					return B(e);
				},
				onchange: (e) => M(At, e, !0)
			});
		}
		D(u);
		var p = L(u, 2), m = P(p), h = L(m);
		{
			let e = /* @__PURE__ */ A(() => Z("setup.bgLabel"));
			va(h, {
				get value() {
					return B(jt);
				},
				get label() {
					return B(e);
				},
				onchange: (e) => M(jt, e, !0)
			});
		}
		D(p);
		var g = L(p, 2), _ = I(g, !0), v = L(g, 2), y = P(v), b = I(y, !0), x = L(y, 2), S = I(x, !0);
		D(v), D(n), D(t), z((e, t, n, r, a, s, u, f, p, h) => {
			W(i, e), W(o, t), W(c, `${n ?? ""} `), X(l, "placeholder", r), W(d, `${a ?? ""} `), W(m, `${s ?? ""} `), W(_, u), W(b, f), x.disabled = p, W(S, h);
		}, [
			() => Z("setup.title"),
			() => Z("setup.intro"),
			() => Z("setup.nameLabel"),
			() => Z("ph.setup.name"),
			() => Z("setup.accentLabel"),
			() => Z("setup.bgLabel"),
			() => Z("setup.outro"),
			() => Z("setup.skip"),
			() => !B(kt).trim(),
			() => Z("setup.start")
		]), V("keydown", l, (e) => e.key === "Enter" && Nt()), Ti(l, () => B(kt), (e) => M(kt, e)), V("click", y, Mt), V("click", x, Nt), U(e, t);
	};
	G(Nv, (e) => {
		B(Ot) && e(Pv);
	});
	var Fv = L(Nv, 2), Iv = (e) => {
		var t = b_();
		let n;
		var r = P(t), i = I(r, !0), a = L(r, 2);
		D(t), z((e) => {
			n = q(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: B(ue) === "ok",
				error: B(ue) === "error"
			}), W(i, B(le)), X(a, "title", e);
		}, [() => Z("ui.close")]), V("click", a, () => E("")), U(e, t);
	};
	G(Fv, (e) => {
		B(le) && e(Iv);
	}), D(uv);
	var Lv = L(uv, 2), Rv = (e) => {
		var t = x_(), n = P(t), r = P(n), i = I(r, !0), a = L(r, 2);
		K(a, () => w.cross, !0), D(a), D(n);
		var o = L(n, 2), s = P(o);
		c(s), D(o), D(t), z((e, n) => {
			gi(t, `left: ${B(rn).left ?? ""}px; top: ${B(rn).top ?? ""}px`), W(i, e), X(a, "title", n);
		}, [() => Z("blocks.suffix", { label: Zn[B(N).type] ?? B(N).type }), () => Z("tip.closeEsc")]), V("click", a, () => M(rn, null)), U(e, t);
	};
	G(Lv, (e) => {
		B(rn) && B(N) && e(Rv);
	}), z(() => mv = q(pv, 1, "topbar svelte-1n46o8q", null, mv, { hidden: !B(_e) })), U(e, lv), Xe();
}
//#endregion
//#region src/main.js
Cr([
	"change",
	"click",
	"input",
	"pointerdown",
	"keydown"
]), document.documentElement.lang = await Xi();
var w_ = Rr(C_, { target: document.getElementById("urd-admin") });
//#endregion
export { w_ as default };
