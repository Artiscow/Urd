//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible, d = () => {};
function f(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function p() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function m(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, ee = 1 << 20, w = 1 << 25, T = 65536, te = 1 << 21, ne = 1 << 22, re = 1 << 23, E = Symbol("$state"), ie = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), D = Symbol("form reset"), le = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ue = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function de() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function fe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function pe() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function me() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function he() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function ge() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function _e() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var ve = {}, O = Symbol("uninitialized"), ye = "http://www.w3.org/1999/xhtml";
function be() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function xe(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Se() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ce() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function we(e) {
	k = e;
}
var A;
function j(e) {
	if (e === null) throw xe(), ve;
	return A = e;
}
function Te() {
	return j(/* @__PURE__ */ Qt(A));
}
function M(e) {
	if (k) {
		if (/* @__PURE__ */ Qt(A) !== null) throw xe(), ve;
		A = e;
	}
}
function Ee(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ Qt(n);
		A = n;
	}
}
function De(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Qt(n);
		e && n.remove(), n = i;
	}
}
function Oe(e) {
	if (!e || e.nodeType !== 8) throw xe(), ve;
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
//#region node_modules/svelte/src/internal/client/context.js
var N = null;
function Me(e) {
	N = e;
}
function Ne(e, t = !1, n) {
	N = {
		p: N,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: W,
		l: null
	};
}
function Pe(e) {
	var t = N, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) ln(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, N = t.p, e ?? {};
}
function Fe() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ie = [];
function Le() {
	var e = Ie;
	Ie = [], f(e);
}
function Re(e) {
	if (Ie.length === 0 && !_t) {
		var t = Ie;
		queueMicrotask(() => {
			t === Ie && Le();
		});
	}
	Ie.push(e);
}
function ze() {
	for (; Ie.length > 0;) Le();
}
function Be(e) {
	var t = W;
	if (t === null) return U.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ve(e, t);
}
function Ve(e, t) {
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128) {
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
//#region node_modules/svelte/src/internal/client/reactivity/status.js
var He = ~(g | _ | h);
function P(e, t) {
	e.f = e.f & He | t;
}
function Ue(e) {
	e.f & 512 || e.deps === null ? P(e, h) : P(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function We(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= T, We(t.deps));
}
function Ge(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), We(e.deps), P(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Ke = !1;
function qe() {
	Ke || (Ke = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[D]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Je(e) {
	var t = U, n = W;
	jn(null), Mn(null);
	try {
		return e();
	} finally {
		jn(t), Mn(n);
	}
}
function Ye(e, t, n, r = n) {
	e.addEventListener(t, () => Je(n));
	let i = e[D];
	i ? e[D] = () => {
		i(), r(!0);
	} : e[D] = () => r(!0), qe();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Xe(e) {
	let t = 0, n = It(0), r;
	return () => {
		sn() && (K(n), pn(() => (t === 0 && (r = Qn(() => e(() => Bt(n)))), t += 1, () => {
			Re(() => {
				--t, t === 0 && (r?.(), r = void 0, Bt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ze = S | C;
function Qe(e, t, n, r) {
	new $e(e, t, n, r);
}
var $e = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = k ? A : null;
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
	#h = Xe(() => (this.#m = It(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = mn(() => {
			if (k) {
				let e = this.#t;
				Te();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, Ze), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = hn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = hn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = hn(() => e(this.#e)), Re(() => {
			var e = this.#c = document.createDocumentFragment(), t = Xt();
			e.append(t), this.#a = this.#x(() => hn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, xn(this.#o, () => {
				this.#o = null;
			}), this.#b(F));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = hn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Tn(this.#a, e);
				let t = this.#n.pending;
				this.#o = hn(() => t(this.#e));
			} else this.#b(F);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Ge(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = W, n = U, r = N;
		Mn(this.#i), jn(this.#i), Me(this.#i.ctx);
		try {
			return Ct.ensure(), e();
		} catch (e) {
			return Be(e), null;
		} finally {
			Mn(t), jn(n), Me(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && xn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Re(() => {
			this.#d = !1, this.#m && Rt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), K(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		F?.is_fork ? (this.#a && F.skip_effect(this.#a), this.#o && F.skip_effect(this.#o), this.#s && F.skip_effect(this.#s), F.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (H(this.#a), null), this.#o &&= (H(this.#o), null), this.#s &&= (H(this.#s), null), k && (j(this.#t), Ee(), j(De()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Ce();
				return;
			}
			r = !0, i && _e(), this.#s !== null && xn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Ve(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return hn(() => {
						var t = W;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ve(e, this.#i.parent), null;
				}
			}));
		};
		Re(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ve(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Ve(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function et(e, t, n, r) {
	let i = Fe() ? it : ct;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = W, c = tt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ve(e, s);
			}
			nt();
		}
	}
	var d = rt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ ot(e))).then(u).catch((e) => Ve(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), nt();
	}) : f();
}
function tt() {
	var e = W, t = U, n = N, r = F;
	return function(i = !0) {
		Mn(e), jn(t), Me(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function nt(e = !0) {
	Mn(null), jn(null), Me(null), e && F?.deactivate();
}
function rt() {
	var e = W, t = e.b, n = F, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function it(e) {
	var t = 2 | g;
	return W !== null && (W.f |= C), {
		ctx: N,
		deps: null,
		effects: null,
		equals: ke,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: O,
		wv: 0,
		parent: W,
		ac: null
	};
}
var at = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ot(e, t, n) {
	let r = W;
	r === null && de();
	var i = void 0, a = It(O), o = !U, s = /* @__PURE__ */ new Set();
	return fn(() => {
		var t = W, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== le && n.reject(e);
			}).finally(nt);
		} catch (e) {
			n.reject(e), nt();
		}
		var c = F;
		if (o) {
			if (t.f & 32768) var l = rt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(at);
			else for (let e of s.values()) e.reject(at);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== at && (c.activate(), t ? (a.f |= re, Rt(a, t)) : (a.f & 8388608 && (a.f ^= re), Rt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), cn(() => {
		for (let e of s) e.reject(at);
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
function st(e) {
	let t = /* @__PURE__ */ it(e);
	return Pn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function ct(e) {
	let t = /* @__PURE__ */ it(e);
	return t.equals = je, t;
}
function lt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function ut(e) {
	var t, n = W, r = e.parent;
	if (!On && r !== null && e.v !== O && r.f & 24576) return be(), e.v;
	Mn(r);
	try {
		e.f &= ~T, lt(e), t = Gn(e);
	} finally {
		Mn(n);
	}
	return t;
}
function dt(e) {
	var t = ut(e);
	if (!e.equals(t) && (e.wv = Hn(), (!F?.is_fork || e.deps === null) && (F === null ? e.v = t : (F.capture(e, t, !0), ht?.capture(e, t, !0)), e.deps === null))) {
		P(e, h);
		return;
	}
	On || (I === null ? Ue(e) : (sn() || F?.is_fork) && I.set(e, t));
}
function ft(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Je(() => {
		t.ac.abort(le), t.ac = null;
	}), t.fn !== null && (t.teardown = d), qn(t, 0), _n(t));
}
function pt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Jn(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var mt = null, F = null, ht = null, I = null, gt = null, _t = !1, vt = !1, yt = null, bt = null, xt = 0, St = 1, Ct = class e {
	id = St++;
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
		mt === null ? mt = this : (mt.#n = this, this.#t = mt), mt = this;
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
			for (var r of n.d) P(r, g), t(r);
			for (r of n.m) P(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, xt++ > 1e3 && (this.#x(), Tt());
		for (let e of this.#u) this.#d.delete(e), P(e, g), this.schedule(e);
		for (let e of this.#d) P(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = yt = [], r = [], i = bt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Mt(e), this.#h() || this.discard(), t;
		}
		if (F = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (yt = null, bt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) jt(e, t);
			i.length > 0 && F.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), ht = this, Dt(r), Dt(n), ht = null, this.#s?.resolve();
		var s = F;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= h;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= h : i & 4 ? t.push(r) : Un(r) && (i & 16 && this.#d.add(r), Jn(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), P(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), F = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) Ge(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), I?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		F = this;
	}
	deactivate() {
		F = null, I = null;
	}
	flush() {
		try {
			vt = !0, F = this, this.#g();
		} finally {
			xt = 0, gt = null, yt = null, bt = null, vt = !1, F = null, I = null, Pt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(at);
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
		this.#m || (this.#m = !0, Re(() => {
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
		return (this.#s ??= p()).promise;
	}
	static ensure() {
		if (F === null) {
			let t = F = new e();
			!vt && !_t && Re(() => {
				t.#e || t.flush();
			});
		}
		return F;
	}
	apply() {
		I = null;
	}
	schedule(e) {
		if (gt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (yt !== null && t === W && (U === null || !(U.f & 2))) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= h;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? mt = e : t.#t = e, this.linked = !1;
		}
	}
};
function wt(e) {
	var t = _t;
	_t = !0;
	try {
		var n;
		for (e && (F !== null && !F.is_fork && F.flush(), n = e());;) {
			if (ze(), F === null) return n;
			F.flush();
		}
	} finally {
		_t = t;
	}
}
function Tt() {
	try {
		pe();
	} catch (e) {
		Ve(e, gt);
	}
}
var Et = null;
function Dt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Un(r) && (Et = /* @__PURE__ */ new Set(), Jn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && bn(r), Et?.size > 0)) {
				Pt.clear();
				for (let e of Et) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Et.has(n) && (Et.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Jn(n);
					}
				}
				Et.clear();
			}
		}
		Et = null;
	}
}
function Ot(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Ot(i, t, n, r) : e & 4194320 && !(e & 2048) && kt(i, t, r) && (P(i, g), At(i));
	}
}
function kt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && kt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function At(e) {
	F.schedule(e);
}
function jt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), P(e, h);
		for (var n = e.first; n !== null;) jt(n, t), n = n.next;
	}
}
function Mt(e) {
	P(e, h);
	for (var t = e.first; t !== null;) Mt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Nt = /* @__PURE__ */ new Set(), Pt = /* @__PURE__ */ new Map(), Ft = !1;
function It(e, t) {
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
function L(e, t) {
	let n = It(e, t);
	return Pn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Lt(e, t = !1, n = !0) {
	let r = It(e);
	return t || (r.equals = je), r;
}
function R(e, t, n = !1) {
	return U !== null && (!An || U.f & 131072) && Fe() && U.f & 4325394 && (Nn === null || !Nn.has(e)) && ge(), Rt(e, n ? Ht(t) : t, bt);
}
function Rt(e, t, n = null) {
	if (!e.equals(t)) {
		Pt.set(e, On ? t : e.v);
		var r = Ct.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && ut(t), I === null && Ue(t);
		}
		e.wv = Hn(), Vt(e, g, n), Fe() && W !== null && W.f & 1024 && !(W.f & 96) && (In === null ? Ln([e]) : In.push(e)), !r.is_fork && Nt.size > 0 && !Ft && zt();
	}
	return t;
}
function zt() {
	Ft = !1;
	for (let e of Nt) {
		e.f & 1024 && P(e, _);
		let t;
		try {
			t = Un(e);
		} catch {
			t = !0;
		}
		t && Jn(e);
	}
	Nt.clear();
}
function Bt(e) {
	R(e, e.v + 1);
}
function Vt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Fe(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & g) === 0;
			if (l && P(s, t), c & 131072) Nt.add(s);
			else if (c & 2) {
				var u = s;
				I?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= T), Vt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Et !== null && Et.add(d), n === null ? At(d) : n.push(d);
			}
		}
	}
}
function Ht(t) {
	if (typeof t != "object" || !t || E in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = Bn, f = (e) => {
		if (Bn === d) return e();
		var t = U, n = Bn;
		jn(null), Vn(d);
		var r = e();
		return jn(t), Vn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && me();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ L(n.value, u);
				return r.set(t, e), e;
			}) : R(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ L(O, u));
					r.set(t, e), Bt(o);
				}
			} else R(n, O), Bt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === E) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(Ht(s ? e[n] : O), u)), r.set(n, o)), o !== void 0) {
				var c = K(o);
				return c === O ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = K(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== O) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === E) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== O || Reflect.has(e, t);
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? Ht(e[t]) : O, u)), r.set(t, n)), K(n) === O) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(O, u)), r.set(d + "", p)) : R(p, O);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, Ht(n)), r.set(t, c));
			else {
				l = c.v !== O;
				var m = f(() => Ht(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Bt(o);
			}
			return !0;
		},
		ownKeys(e) {
			K(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== O;
			});
			for (var [n, i] of r) i.v !== O && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			he();
		}
	});
}
function Ut(e) {
	try {
		if (typeof e == "object" && e && E in e) return e[E];
	} catch {}
	return e;
}
function Wt(e, t) {
	return Object.is(Ut(e), Ut(t));
}
var Gt, Kt, qt, Jt;
function Yt() {
	if (Gt === void 0) {
		Gt = window, Kt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		qt = a(t, "firstChild").get, Jt = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function Xt(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Zt(e) {
	return qt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Qt(e) {
	return Jt.call(e);
}
function z(e, t) {
	if (!k) return /* @__PURE__ */ Zt(e);
	var n = /* @__PURE__ */ Zt(A);
	if (n === null) n = A.appendChild(Xt());
	else if (t && n.nodeType !== 3) {
		var r = Xt();
		return n?.before(r), j(r), r;
	}
	return t && rn(n), j(n), n;
}
function $t(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ Zt(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Qt(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = Xt();
			return A?.before(r), j(r), r;
		}
		rn(A);
	}
	return A;
}
function B(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Qt(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = Xt();
			return r === null ? i?.after(a) : r.before(a), j(a), a;
		}
		rn(r);
	}
	return j(r), r;
}
function en(e) {
	e.textContent = "";
}
function tn() {
	return !1;
}
function nn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function rn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function an(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function on(e, t) {
	var n = W;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: N,
		deps: null,
		nodes: null,
		f: e | g | 512,
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
	F?.register_created_effect(r);
	var i = r;
	if (e & 4) yt === null ? Ct.ensure().schedule(r) : yt.push(r);
	else if (t !== null) {
		try {
			Jn(r);
		} catch (e) {
			throw H(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && an(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function sn() {
	return U !== null && !An;
}
function cn(e) {
	let t = on(8, null);
	return P(t, h), t.teardown = e, t;
}
function ln(e) {
	return on(4 | ee, e);
}
function un(e) {
	Ct.ensure();
	let t = on(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? xn(t, () => {
			H(t), n(void 0);
		}) : (H(t), n(void 0));
	});
}
function dn(e) {
	return on(4, e);
}
function fn(e) {
	return on(ne | C, e);
}
function pn(e, t = 0) {
	return on(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	et(r, t, n, (t) => {
		on(8, () => {
			e(...t.map(K));
		});
	});
}
function mn(e, t = 0) {
	return on(16 | t, e);
}
function hn(e) {
	return on(32 | C, e);
}
function gn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = On, n = U;
		kn(!0), jn(null);
		try {
			t.call(null);
		} finally {
			kn(e), jn(n);
		}
	}
}
function _n(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Je(() => {
			e.abort(le);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : H(n, t), n = r;
	}
}
function vn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || H(t), t = n;
	}
}
function H(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (yn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, _n(e, t && !n), qn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	gn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && bn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function yn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Qt(e);
		e.remove(), e = n;
	}
}
function bn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function xn(e, t, n = !0) {
	var r = [];
	Sn(e, r, !0);
	var i = () => {
		n && H(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Sn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Sn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Cn(e) {
	wn(e, !0);
}
function wn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (P(e, g), Ct.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			wn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Tn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Qt(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var En = null, Dn = !1, On = !1;
function kn(e) {
	On = e;
}
var U = null, An = !1;
function jn(e) {
	U = e;
}
var W = null;
function Mn(e) {
	W = e;
}
var Nn = null;
function Pn(e) {
	U !== null && (Nn ??= /* @__PURE__ */ new Set()).add(e);
}
var G = null, Fn = 0, In = null;
function Ln(e) {
	In = e;
}
var Rn = 1, zn = 0, Bn = zn;
function Vn(e) {
	Bn = e;
}
function Hn() {
	return ++Rn;
}
function Un(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~T), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Un(a) && dt(a), a.wv > e.wv) return !0;
		}
		t & 512 && I === null && P(e, h);
	}
	return !1;
}
function Wn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Nn !== null && Nn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Wn(a, t, !1) : t === a && (n ? P(a, g) : a.f & 1024 && P(a, _), At(a));
	}
}
function Gn(e) {
	var t = G, n = Fn, r = In, i = U, a = Nn, o = N, s = An, c = Bn, l = e.f;
	G = null, Fn = 0, In = null, U = l & 96 ? null : e, Nn = null, Me(e.ctx), An = !1, Bn = ++zn, e.ac !== null && (Je(() => {
		e.ac.abort(le);
	}), e.ac = null);
	try {
		e.f |= te;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = F?.is_fork;
		if (G !== null) {
			var m;
			if (p || qn(e, Fn), f !== null && Fn > 0) for (f.length = Fn + G.length, m = 0; m < G.length; m++) f[Fn + m] = G[m];
			else e.deps = f = G;
			if (sn() && e.f & 512) for (m = Fn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Fn < f.length && (qn(e, Fn), f.length = Fn);
		if (Fe() && In !== null && !An && f !== null && !(e.f & 6146)) for (m = 0; m < In.length; m++) Wn(In[m], e);
		if (i !== null && i !== e) {
			if (zn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = zn;
			if (t !== null) for (let e of t) e.rv = zn;
			In !== null && (r === null ? r = In : r.push(...In));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (e) {
		return Be(e);
	} finally {
		e.f ^= te, G = t, Fn = n, In = r, U = i, Nn = a, Me(o), An = s, Bn = c;
	}
}
function Kn(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (G === null || !n.call(G, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~T), s.v !== O && Ue(s), s.ac !== null && Je(() => {
			s.ac.abort(le), s.ac = null;
		}), ft(s), qn(s, 0);
	}
}
function qn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Kn(e, n[r]);
}
function Jn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		P(e, h);
		var n = W, r = Dn;
		W = e, Dn = (t & 96) == 0;
		try {
			t & 16777232 ? vn(e) : _n(e), gn(e);
			var i = Gn(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Rn;
		} finally {
			Dn = r, W = n;
		}
	}
}
async function Yn() {
	await Promise.resolve(), wt();
}
function K(e) {
	var t = (e.f & 2) != 0;
	if (En?.add(e), U !== null && !An && !(W !== null && W.f & 16384) && (Nn === null || !Nn.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < zn && (e.rv = zn, G === null && r !== null && r[Fn] === e ? Fn++ : G === null ? G = [e] : G.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (On && Pt.has(e)) return Pt.get(e);
	if (t) {
		var a = e;
		if (On) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Zn(a)) && (o = ut(a)), Pt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !An && U !== null && (Dn || (U.f & 512) != 0), c = (a.f & b) === 0;
		Un(a) && (s && (a.f |= 512), dt(a)), s && !c && (pt(a), Xn(a));
	}
	if (I?.has(e)) return I.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Xn(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (pt(t), Xn(t));
}
function Zn(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Pt.has(t) || t.f & 2 && Zn(t)) return !0;
	return !1;
}
function Qn(e) {
	var t = An;
	try {
		return An = !0, e();
	} finally {
		An = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var $n = ["touchstart", "touchmove"];
function er(e) {
	return $n.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var tr = Symbol("events"), nr = /* @__PURE__ */ new Set(), rr = /* @__PURE__ */ new Set();
function ir(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function ar(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || lr.call(t, e), !e.cancelBubble) return Je(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Re(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function or(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = ar(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && cn(() => {
		t.removeEventListener(e, o, a);
	});
}
function q(e, t, n) {
	(t[tr] ??= {})[e] = n;
}
function sr(e) {
	for (var t = 0; t < e.length; t++) nr.add(e[t]);
	for (var n of rr) n(e);
}
var cr = null;
function lr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	cr = e;
	var s = 0, c = cr === e && e[tr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[tr] = t;
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
		var d = U, f = W;
		jn(null), Mn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[tr]?.[r];
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
			e[tr] = t, delete e.currentTarget, jn(d), Mn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var ur = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function dr(e) {
	return ur?.createHTML(e) ?? e;
}
function fr(e) {
	var t = nn("template");
	return t.innerHTML = dr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function pr(e, t) {
	var n = W;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function J(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (k) return pr(A, null), A;
		i === void 0 && (i = fr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Zt(i)));
		var t = r || Kt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Zt(t), s = t.lastChild;
			pr(o, s);
		} else pr(t, t);
		return t;
	};
}
function Y(e, t) {
	if (k) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Te();
		return;
	}
	e !== null && e.before(t);
}
function X(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function mr(e, t) {
	return gr(e, t);
}
var hr = /* @__PURE__ */ new Map();
function gr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Yt();
	var l = void 0, u = un(() => {
		var s = n ?? t.appendChild(Xt());
		Qe(s, { pending: () => {} }, (t) => {
			Ne({});
			var n = N;
			if (o && (n.c = o), a && (i.$$events = a), k && pr(t, null), l = e(t, i) || {}, k && (W.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw xe(), ve;
			Pe();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = er(r);
					for (let e of [t, document]) {
						var a = hr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), hr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, lr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(nr)), rr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = hr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, lr), r.delete(e), r.size === 0 && hr.delete(n)) : r.set(e, i);
			}
			rr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return _r.set(l, u), l;
}
var _r = /* @__PURE__ */ new WeakMap(), vr = class {
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
			if (n) Cn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Cn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (H(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Tn(r, t), t.append(Xt()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else H(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), xn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (H(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = F, r = tn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = Xt();
			i.append(a), this.#n.set(e, {
				effect: hn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, hn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = A), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Z(e, t, n = !1) {
	var r;
	k && (r = A, Te());
	var i = new vr(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = Oe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = De();
				j(a), i.anchor = a, we(!1), i.ensure(e, t), we(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	mn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function yr(e, t) {
	return t;
}
function br(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		xn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					xr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			en(d), d.append(u), e.items.clear();
		}
		xr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function xr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= w, Tn(a, document.createDocumentFragment())) : H(t[i], n);
	}
}
var Sr;
function Cr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? j(/* @__PURE__ */ Zt(u)) : u.appendChild(Xt());
	}
	k && Te();
	var d = null, f = /* @__PURE__ */ ct(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Tr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= w, Dr(d, null, c)) : Cn(d) : xn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: mn(() => {
			p = K(f);
			var e = p.length;
			let t = !1;
			k && Oe(c) === "[!" != (e === 0) && (c = De(), j(c), we(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = F, v = tn(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, we(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Rt(S.v, b), S.i && Rt(S.i, y), v && u.unskip_effect(S.e)) : (S = Er(l, h ? c : Sr ??= Xt(), b, x, y, o, n, i), h || (S.e.f |= w), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = hn(() => s(c)) : (d = hn(() => s(Sr ??= Xt())), d.f |= w)), e > r.size && fe("", "", ""), k && e > 0 && j(De()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && we(!0), K(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function wr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Tr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = wr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Cn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= w, _ === l) Dr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Or(e, d, _), Or(e, _, y), Dr(_, y, n), d = _, p = [], m = [], l = wr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Dr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Or(e, S.prev, C.next), Or(e, d, S), Or(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Dr(_, l, n), Or(e, _.prev, _.next), Or(e, _, d === null ? e.effect.first : d.next), Or(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = wr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = wr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (xr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = wr(l.next);
		var T = ee.length;
		if (T > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) ee[v].nodes?.a?.fix();
			}
			br(e, ee, te);
		}
	}
	o && Re(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Er(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? It(n) : /* @__PURE__ */ Lt(n, !1, !1) : null, l = o & 2 ? It(i) : null;
	return {
		v: c,
		i: l,
		e: hn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Dr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Qt(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Or(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var kr = [..." 	\n\r\f\xA0\v﻿"];
function Ar(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || kr.includes(r[o - 1])) && (s === r.length || kr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function jr(e, t, n, r, i, a) {
	var o = e[oe];
	if (k || o !== n || o === void 0) {
		var s = Ar(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Mr(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return Se();
		for (var i of t.options) i.selected = n.includes(Pr(i));
		return;
	}
	for (i of t.options) if (Wt(Pr(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Nr(e) {
	var t = new MutationObserver(() => {
		Mr(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), cn(() => {
		t.disconnect();
	});
}
function Pr(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Fr = Symbol("is custom element"), Ir = Symbol("is html"), Lr = ue ? "link" : "LINK", Rr = ue ? "progress" : "PROGRESS";
function Q(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Br(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Br(e, "checked", null), e.checked = r;
				}
			}
		};
		e[D] = n, Re(n), qe();
	}
}
function $(e, t) {
	var n = Vr(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Rr) || (e.value = t ?? "");
}
function zr(e, t) {
	var n = Vr(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Br(e, t, n, r) {
	var i = Vr(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Lr) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Ur(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Vr(e) {
	return e[ae] ??= {
		[Fr]: e.nodeName.includes("-"),
		[Ir]: e.namespaceURI === ye
	};
}
var Hr = /* @__PURE__ */ new Map();
function Ur(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Hr.get(t);
	if (n) return n;
	Hr.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Wr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Ye(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Gr(e) ? Kr(a) : a, n(a), F !== null && r.add(F), await Yn(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || Qn(t) == null && e.value) && (n(Gr(e) ? Kr(e.value) : e.value), F !== null && r.add(F)), pn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = F;
			if (r.has(i)) return;
		}
		Gr(e) && n === Kr(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Gr(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Kr(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function qr(e, t) {
	return e === t || e?.[E] === t;
}
function Jr(e = {}, t, n, r) {
	var i = N.r, a = W;
	return dn(() => {
		var o, s;
		return pn(() => {
			o = s, s = r?.() || [], Qn(() => {
				qr(n(...s), e) || (t(e, ...s), o && qr(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && qr(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function Yr(e, t) {
	let n = t(), r = JSON.stringify(n), i = JSON.parse(r), a = localStorage.getItem(e);
	if (a) try {
		i = JSON.parse(a);
	} catch {
		localStorage.removeItem(e);
	}
	return {
		get data() {
			return i;
		},
		save() {
			let t = JSON.stringify(i);
			t === r ? localStorage.removeItem(e) : localStorage.setItem(e, t);
		},
		reset() {
			return localStorage.removeItem(e), i = JSON.parse(r), i;
		},
		replace(e) {
			return i = e, i;
		},
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region src/lib/previewBridge.js
function Xr(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n);
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
		sendShowGrid(e) {
			r({
				type: "urd-show-grid",
				visible: e
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
		destroy() {
			window.removeEventListener("message", n);
		}
	};
}
var Zr = (e) => Math.round(e * 100) / 100;
function Qr(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var $r = {
	1: (e, t) => {
		for (let n of e.sections ?? []) {
			let e = n.grid ?? t?.grid ?? {
				columns: 24,
				rowHeight: 8
			};
			for (let t of n.blocks ?? []) for (let n of ["desktop", "mobile"]) {
				let r = t.frames?.[n];
				r && (t.frames[n] = {
					...r,
					x: Zr(r.x * 100 / e.columns),
					w: Zr(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= Qr(t.grid);
		return e;
	}
}, ei = { 1: (e) => (e.grid = Qr(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function ti(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ei[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function ni(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = $r[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region src/lib/imageTools.js
var ri = 1600, ii = .82, ai = .6;
async function oi(e) {
	let t = await createImageBitmap(e), n = Math.min(1, ri / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(ii);
	return s.size > 4e5 && (s = await o(ai)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function si(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function ci(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var li = /* @__PURE__ */ J("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), ui = /* @__PURE__ */ J("<option class=\"svelte-1n46o8q\"> </option>"), di = /* @__PURE__ */ J("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\">💻</button> <button title=\"Mobilvisning (390px)\">📱</button></span>", 1), fi = /* @__PURE__ */ J("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"> </button>"), pi = /* @__PURE__ */ J("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), mi = /* @__PURE__ */ J("<span class=\"who svelte-1n46o8q\"> </span>"), hi = /* @__PURE__ */ J("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), gi = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), _i = /* @__PURE__ */ J("<button> </button>"), vi = /* @__PURE__ */ J("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), yi = /* @__PURE__ */ J("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>", 1), bi = /* @__PURE__ */ J("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button></div>"), xi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Si = /* @__PURE__ */ J("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Ci = /* @__PURE__ */ J("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <select title=\"Hvor lenken går\" class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span></div>"), wi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <label class=\"svelte-1n46o8q\">Logo <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde (URL)</option></select></label> <input class=\"svelte-1n46o8q\"/> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div>"), Ti = /* @__PURE__ */ J("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Ei = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Flater <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tekst <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksent <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), Di = /* @__PURE__ */ J("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Oi = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ki = /* @__PURE__ */ J("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i valgt seksjon</label> <!>", 1), Ai = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Klikk i en seksjon for å kunne gi den sitt eget grid.</p>"), ji = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <!></div>"), Mi = /* @__PURE__ */ J("<p> </p> <p class=\"panel-hint svelte-1n46o8q\">Den detaljerte blokkeditoren kommer i neste steg av v0.5.</p>", 1), Ni = /* @__PURE__ */ J("<p>Valgt: seksjon</p> <p class=\"panel-hint svelte-1n46o8q\">Seksjonseditoren (høyde, bakgrunn, animasjoner) kommer i v0.5.</p>", 1), Pi = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Fi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Ii = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p></div>"), Li = /* @__PURE__ */ J("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Ri = /* @__PURE__ */ J("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), zi = /* @__PURE__ */ J("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Bi = /* @__PURE__ */ J("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Vi = /* @__PURE__ */ J("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Hi = /* @__PURE__ */ J("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!></div>");
function Ui(e, t) {
	Ne(t, !0);
	let n = /* @__PURE__ */ L(null), r = /* @__PURE__ */ L(null), i = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ L(""), o = /* @__PURE__ */ L("info"), s = 0;
	function c(e, t = "info") {
		R(a, e, !0), R(o, t, !0);
		let n = ++s;
		t === "ok" && setTimeout(() => {
			s === n && (R(a, ""), R(o, "info"));
		}, 8e3);
	}
	let l = /* @__PURE__ */ L(null), u = /* @__PURE__ */ L(null), d = /* @__PURE__ */ L(Ht({
		size: 16,
		snap: !0
	})), f = /* @__PURE__ */ L(!0), p = /* @__PURE__ */ L("desktop"), h = /* @__PURE__ */ L(0);
	function g() {
		R(h, v?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function _(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, g(), b?.sendAttention(e.id, !0));
	}
	let v = null, y = null, b = null, x = /* @__PURE__ */ L(null);
	function S() {
		R(x, y.data, !0), y.replace(K(x));
	}
	let C = /* @__PURE__ */ new Set(), ee = () => K(x).pages.find((e) => e.id === K(r));
	function w() {
		let e = K(x)?.pages?.some((e) => !C.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		R(i, e || v?.hasDraft() && !C.has(K(r)) || y?.hasDraft() || !1, !0);
	}
	let T = [], te = [], ne = null;
	function re() {
		return JSON.stringify({
			page: v.data,
			site: y.data
		});
	}
	function E(e) {
		e === ne && (e.startsWith("edit:") || e === "grid") || (T.push(re()), T.length > 50 && T.shift(), te.length = 0, ne = e);
	}
	function ie(e) {
		let { page: t, site: n } = JSON.parse(e);
		v.replace(t), y.replace(n), S(), v.save(), y.save(), R(d, {
			snap: !0,
			...K(x).grid
		}, !0), w(), g(), b?.sendSite(K(x)), K(x).pages.some((e) => e.id === K(r)) ? b?.sendPage(K(r), v.data) : Se(K(x).pages[0].id);
	}
	function ae() {
		T.length && (te.push(re()), ie(T.pop()), ne = null, c("Angret"));
	}
	function oe() {
		te.length && (T.push(re()), ie(te.pop()), ne = null, c("Gjentatt"));
	}
	function se(e) {
		if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
		let t = e.target;
		t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range"
		].includes(t.type)) || (e.preventDefault(), e.shiftKey ? oe() : ae());
	}
	async function ce() {
		R(n, ti(await (await fetch("/content/site.json")).json()), !0), y = Yr("urd-draft-site", () => K(n)), y.replace(ti(y.data)), y.save(), S(), R(d, {
			snap: !0,
			...K(x).grid
		}, !0), await Se(new URLSearchParams(location.search).get("page") ?? K(x).pages[0].id), await ye();
	}
	let D = /* @__PURE__ */ L(null), le = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Grid",
		"Historikk"
	];
	function ue(e) {
		R(D, K(D) === e ? null : e, !0), b?.sendShowGrid(K(D) === "Grid");
	}
	let de = /* @__PURE__ */ L(null);
	function fe(e) {
		if (!e.blockId) {
			R(de, null);
			return;
		}
		let t = (v?.data.sections.find((t) => t.id === e.sectionId))?.blocks.find((t) => t.id === e.blockId);
		R(de, t ? {
			sectionId: e.sectionId,
			blockId: e.blockId,
			type: t.type
		} : null, !0);
	}
	let pe = /* @__PURE__ */ L(null), me = /* @__PURE__ */ L(null);
	function he(e) {
		R(pe, e.sectionId, !0);
		let t = v?.data.sections.find((t) => t.id === e.sectionId);
		R(me, t?.grid ? { ...t.grid } : null, !0);
	}
	function ge() {
		return v.data.sections.find((e) => e.id === K(pe)) ?? v.data.sections[0];
	}
	function _e(e) {
		let t = v.data.sections.find((e) => e.id === K(pe));
		t && (E("grid"), t.grid = e ? { ...y.data.grid } : null, R(me, t.grid ? { ...t.grid } : null, !0), v.save(), w(), b?.sendSection(K(r), t), K(D) === "Grid" && b?.sendShowGrid(!0));
	}
	function ve(e, t) {
		let n = v.data.sections.find((e) => e.id === K(pe));
		n?.grid && (E("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, R(me, { ...n.grid }, !0), v.save(), w(), b?.sendSection(K(r), n), K(D) === "Grid" && b?.sendShowGrid(!0));
	}
	function O(e, t) {
		E("grid"), R(d, {
			...K(d),
			[e]: t
		}, !0), y.data.grid = {
			...y.data.grid,
			[e]: t
		}, y.save(), w(), b?.sendSite(y.data), K(D) === "Grid" && b?.sendShowGrid(!0);
	}
	async function ye() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? R(u, await e.json(), !0) : e.status !== 503 && R(u, null);
		} catch {
			R(u, null);
		}
	}
	let be = null;
	function xe(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: `sec-${crypto.randomUUID().slice(0, 8)}`,
				version: 1,
				preset: "tom",
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
	async function Se(e) {
		R(r, e, !0), be = (async () => {
			let t = ee(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = ni(await e.json(), y.data));
			} catch {}
			n ? C.delete(e) : n = xe(t), v = Yr(`urd-draft-${e}`, () => n), v.replace(ni(v.data, y.data)), v.save(), T.length = 0, te.length = 0, ne = null, R(pe, null), R(me, null), w(), g(), R(a, "");
		})(), await be;
	}
	function Ce() {
		b?.destroy(), b = Xr(K(l), {
			onEdit: Ge,
			onMove: Ke,
			onDelete: tt,
			onAddSection: Ze,
			onMoveSection: Qe,
			onDeleteSection: $e,
			onSectionSize: et,
			onUndo: (e) => e.redo ? oe() : ae(),
			onSelectSection: he,
			onSelectBlock: fe,
			onReady: k,
			onNavigate: we,
			onAddBlock: (e) => at(e.sectionId, e.block),
			onMobileManual: qe,
			onMobileAuto: Je,
			onReviewDone: Ye,
			onBlockFlag: Xe
		});
	}
	async function k() {
		await be, y.hasDraft() && b?.sendSite(y.data), v.hasDraft() && b?.sendPage(K(r), v.data), K(f) || b?.sendChrome(!1), K(D) === "Grid" && b?.sendShowGrid(!0);
	}
	function we(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = K(x).pages.find((e) => e.path === t);
		n && n.id !== K(r) && Se(n.id);
	}
	function A(e, t) {
		E(e), t(), y.save(), w(), b?.sendSite(K(x));
	}
	let j = /* @__PURE__ */ L(""), Te = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function De(e, t = null) {
		return e ? Te.includes(e) ? `«${e}» er et reservert navn` : K(x).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Oe() {
		let e = K(j).trim(), t = si(e), n = De(t);
		if (n) {
			c(n, "error");
			return;
		}
		A("pages", () => {
			K(x).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), K(x).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(xe({
			id: t,
			title: e
		}))), w(), R(j, ""), Se(t);
	}
	function ke(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let i = e.title;
		A("pages", () => {
			e.title = n;
			for (let t of K(x).nav.items) t.page === e.id && t.label === i && (t.label = n);
		}), e.id === K(r) ? (v.data.meta.title = n, v.save(), w()) : Ae(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Ae(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = ni(await t.json(), y.data));
		} catch {}
		r ||= xe(e), t(r), localStorage.setItem(n, JSON.stringify(r)), w();
	}
	function je(e, t) {
		let n = si(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = De(n, e.id);
		if (r) {
			c(r, "error");
			return;
		}
		A("pages", () => {
			e.path = `/${n}`;
		});
	}
	function N(e) {
		e.path !== "/" && (A("pages", () => {
			K(x).pages = K(x).pages.filter((t) => t.id !== e.id), K(x).nav.items = K(x).nav.items.filter((t) => t.page !== e.id);
		}), e.id === K(r) && Se(K(x).pages[0].id), c("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Me(e) {
		A("edit:nav-logo", () => {
			K(x).nav.logo = {
				type: "text",
				value: "",
				...K(x).nav.logo,
				...e
			};
		});
	}
	function Fe(e, t) {
		A(`edit:nav-label-${e}`, () => {
			K(x).nav.items[e].label = t;
		});
	}
	function Ie(e, t) {
		A("nav", () => {
			let n = K(x).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function Le(e, t) {
		A(`edit:nav-href-${e}`, () => {
			K(x).nav.items[e].href = t;
		});
	}
	function Re(e, t) {
		let n = e + t, r = K(x).nav.items;
		n < 0 || n >= r.length || A("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function ze(e) {
		A("nav", () => {
			K(x).nav.items.splice(e, 1);
		});
	}
	function Be() {
		A("nav", () => {
			K(x).nav.items.push({
				label: "Lenke",
				page: K(x).pages[0].id
			});
		});
	}
	let Ve = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function He(e, t) {
		A(`edit:theme-color-${e}`, () => {
			K(x).theme.tokens.color[e] = t;
		});
	}
	function P(e, t) {
		A("theme", () => {
			K(x).theme.tokens.font[e] = t;
		});
	}
	function Ue(e, t) {
		A("theme", () => {
			K(x).theme.tokens.radius[e] = t;
		});
	}
	function We() {
		R(f, !K(f)), b?.sendChrome(K(f));
	}
	function Ge(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E(`edit:${e.blockId}`), t.props = e.props, v.save(), w(), R(a, ""));
	}
	function Ke(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		E(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && _(t, "desktop-endret-etter-mobil"), v.save(), w();
	}
	function qe(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			E("mobile-manual");
			for (let { blockId: n, frame: r } of e.frames) {
				let e = t.blocks.find((e) => e.id === n);
				e && (e.frames.mobile = r);
			}
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "manual",
					attention: t.responsive?.mobile?.attention ?? null
				}
			}, v.save(), w();
		}
	}
	function Je(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			E("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, v.save(), w(), g(), b?.sendSection(K(r), t);
		}
	}
	function Ye(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (E("review-done"), t.responsive.mobile.attention = null, v.save(), w(), g());
	}
	function Xe(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E("decor"), t.decor = e.decor, v.save(), w());
	}
	function Ze(e) {
		E("add-section"), v.data.sections.splice(e.index, 0, e.section), v.save(), w(), b?.sendPage(K(r), v.data);
	}
	function Qe(e) {
		let t = v.data.sections, n = t.findIndex((t) => t.id === e.sectionId), i = n + e.dir;
		n < 0 || i < 0 || i >= t.length || (E("move-section"), [t[n], t[i]] = [t[i], t[n]], v.save(), w(), b?.sendPage(K(r), v.data));
	}
	function $e(e) {
		E("delete-section"), e.sectionId === K(pe) && (R(pe, null), R(me, null)), v.data.sections = v.data.sections.filter((t) => t.id !== e.sectionId), v.save(), w(), b?.sendPage(K(r), v.data);
	}
	function et(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t && (E("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, v.save(), w());
	}
	function tt(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t && (E("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), _(t, "blokk-slettet"), v.save(), w(), b?.sendSection(K(r), t));
	}
	let nt = {
		text: {
			type: "text",
			props: {
				html: "<p>Ny tekst</p>",
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: "<h3>Overskrift</h3><p>Skriv innholdet her.</p>",
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: "Ny knapp",
				page: null,
				href: "#",
				style: "primary"
			},
			w: 20,
			h: 36
		},
		"shape-line": {
			type: "shape",
			decor: !0,
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
			props: {
				kind: "triangle",
				color: "accent",
				thickness: 2,
				fill: null
			},
			w: 10,
			h: 110
		}
	};
	function rt(e) {
		let t = nt[e];
		return {
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: t.type,
			version: 1,
			decor: !!t.decor,
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
		};
	}
	function it(e) {
		b ? b.sendPlaceBlock(e) : at(ge()?.id, e);
	}
	function at(e, t) {
		let n = v.data.sections.find((t) => t.id === e) ?? v.data.sections[0];
		n && (E("add-block"), n.blocks.push(t), _(n, "blokk-lagt-til"), v.save(), w(), b?.sendSection(K(r), n));
	}
	function ot(e) {
		it(rt(e));
	}
	async function ct(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		c("Komprimerer bildet…");
		let n;
		try {
			n = await oi(t);
		} catch {
			c("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (K(l)?.clientWidth ?? 1280));
		it({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: si(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? c(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : c("");
	}
	function lt(e) {
		let t = [];
		for (let n of e.sections) for (let e of n.blocks) {
			if (e.type !== "image" || !e.props.src?.startsWith("data:image/")) continue;
			let n = e.props.src.split(",", 2)[1], r = `media/${si(e.props.alt || "bilde")}-${ci(n)}.webp`;
			t.push({
				path: r,
				content: n,
				encoding: "base64"
			}), e.props.src = `/${r}`;
		}
		return t;
	}
	function ut() {
		E("discard");
		let e = v.reset();
		y.reset(), S(), R(d, {
			snap: !0,
			...K(x).grid
		}, !0), w(), R(a, ""), b?.sendSite(K(x)), K(x).pages.some((e) => e.id === K(r)) ? b?.sendPage(K(r), e) : Se(K(x).pages[0].id);
	}
	async function dt() {
		c("Publiserer…");
		let e = [], t = [], i = [], a = [];
		for (let o of K(x).pages) {
			let s = `urd-draft-${o.id}`, c = null;
			if (o.id === K(r) && v.hasDraft()) c = v.data;
			else if (o.id !== K(r)) {
				let e = localStorage.getItem(s);
				if (e) try {
					c = ni(JSON.parse(e), y.data);
				} catch {}
			}
			c && (e.push(...lt(c)), e.push({
				path: o.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(o.title), C.has(o.id) || !K(n).pages.some((e) => e.id === o.id) ? a.push(o.id) : i.push(s));
		}
		v.hasDraft() && v.save(), y.hasDraft() && (e.push({
			path: "content/site.json",
			content: JSON.stringify(K(x), null, 2) + "\n",
			encoding: "utf-8"
		}), i.push("urd-draft-site"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of K(x).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		for (let t of K(n).pages) {
			let n = K(x).pages.find((e) => e.id === t.id);
			n ? n.path !== t.path && t.path !== "/" && e.push({
				path: `${t.path.slice(1)}/index.html`,
				delete: !0
			}) : (e.push({
				path: t.file,
				delete: !0
			}), t.path !== "/" && e.push({
				path: `${t.path.slice(1)}/index.html`,
				delete: !0
			}));
		}
		let o = {
			message: `Oppdater ${t.join(", ") || "innstillinger"} via Urd-admin`,
			files: e
		}, s = null;
		try {
			s = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(o)
			});
		} catch {}
		if (s?.ok) {
			for (let e of i) localStorage.removeItem(e);
			for (let e of a) C.add(e);
			R(n, JSON.parse(JSON.stringify(K(x))), !0), y = Yr("urd-draft-site", () => K(n)), S(), R(d, {
				snap: !0,
				...K(x).grid
			}, !0);
			let e = JSON.parse(JSON.stringify(v.data));
			v = Yr(`urd-draft-${K(r)}`, () => e), C.has(K(r)) && localStorage.setItem(`urd-draft-${K(r)}`, JSON.stringify(e)), w(), c("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (s?.status === 401) {
			let e = (await s.json().catch(() => null))?.error;
			c(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await ye();
		} else s?.status === 403 ? c((await s.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c(s ? (await s.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	ce();
	var ft = Hi();
	or("keydown", Gt, se);
	var pt = z(ft), mt = (e) => {
		var t = li();
		q("click", t, We), Y(e, t);
	};
	Z(pt, (e) => {
		K(f) || e(mt);
	});
	var F = B(pt, 2);
	let ht;
	var I = z(F), gt = B(z(I), 2), _t = (e) => {
		var t = di(), n = $t(t);
		Cr(n, 21, () => K(x).pages, (e) => e.id, (e, t) => {
			var n = ui(), r = z(n, !0);
			M(n);
			var i = {};
			V(() => {
				X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
			}), Y(e, n);
		}), M(n);
		var i;
		Nr(n);
		var a = B(n, 2), o = z(a);
		let s;
		var c = B(o, 2);
		let l;
		M(a), V(() => {
			i !== (i = K(r)) && (n.value = (n.__value = K(r)) ?? "", Mr(n, K(r))), s = jr(o, 1, "ghost svelte-1n46o8q", null, s, { active: K(p) === "desktop" }), l = jr(c, 1, "ghost svelte-1n46o8q", null, l, { active: K(p) === "mobile" });
		}), q("change", n, (e) => Se(e.target.value)), q("click", o, () => R(p, "desktop")), q("click", c, () => R(p, "mobile")), Y(e, t);
	};
	Z(gt, (e) => {
		K(n) && e(_t);
	});
	var vt = B(gt, 2), yt = (e) => {
		var t = fi(), n = z(t);
		M(t), V(() => X(n, `📱 ${K(h) ?? ""} ${K(h) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), q("click", t, () => R(p, "mobile")), Y(e, t);
	};
	Z(vt, (e) => {
		K(h) > 0 && e(yt);
	});
	var bt = B(vt, 2), xt = (e) => {
		Y(e, pi());
	};
	Z(bt, (e) => {
		K(i) && e(xt);
	}), M(I);
	var St = B(I, 2), Ct = z(St), wt = (e) => {
		var t = gi(), n = $t(t), r = z(n, !0);
		M(n);
		var a = B(n, 2), o = (e) => {
			var t = mi(), n = z(t);
			M(t), V(() => {
				Br(t, "title", K(u).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), X(n, `${K(u).allowed ? "" : "⚠ "}${K(u).login ?? ""}`);
			}), Y(e, t);
		}, s = (e) => {
			Y(e, hi());
		};
		Z(a, (e) => {
			K(u)?.loggedIn ? e(o) : K(u) && e(s, 1);
		});
		var c = B(a, 2), l = B(c, 2), d = B(l, 2);
		V((e) => {
			Br(n, "title", K(f) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), X(r, K(f) ? "👁 Ren visning" : "✏ Rediger"), Br(c, "href", e), l.disabled = !K(i), d.disabled = !K(i);
		}, [() => ee().path]), q("click", n, We), q("click", l, ut), q("click", d, dt), Y(e, t);
	};
	Z(Ct, (e) => {
		K(n) && e(wt);
	}), M(St), M(F);
	var Tt = B(F, 2), Et = (e) => {
		var t = zi(), n = z(t), i = (e) => {
			var t = Ri(), n = $t(t);
			Cr(n, 21, () => le, yr, (e, t) => {
				var n = _i();
				let r;
				var i = z(n, !0);
				M(n), V(() => {
					r = jr(n, 1, "svelte-1n46o8q", null, r, { active: K(D) === K(t) }), X(i, K(t));
				}), q("click", n, () => ue(K(t))), Y(e, n);
			}), M(n);
			var i = B(n, 2), a = (e) => {
				var t = Li(), n = z(t), i = z(n, !0);
				M(n);
				var a = B(n, 2), o = (e) => {
					var t = xi(), n = B(z(t), 2);
					Cr(n, 17, () => K(x).pages, (e) => e.id, (e, t) => {
						var n = bi();
						let i;
						var a = z(n);
						Q(a);
						var o = B(a, 2), s = (e) => {
							Y(e, vi());
						}, c = (e) => {
							var n = yi(), r = $t(n);
							Q(r);
							var i = B(r, 2);
							V((e) => $(r, e), [() => K(t).path.slice(1)]), q("change", r, (e) => je(K(t), e.target.value)), q("click", i, () => N(K(t))), Y(e, n);
						};
						Z(o, (e) => {
							K(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = B(o, 2);
						M(n), V(() => {
							i = jr(n, 1, "page-row svelte-1n46o8q", null, i, { current: K(t).id === K(r) }), $(a, K(t).title), l.disabled = K(t).id === K(r);
						}), q("change", a, (e) => ke(K(t), e.target.value)), q("click", l, () => Se(K(t).id)), Y(e, n);
					});
					var i = B(n, 4);
					Q(i);
					var a = B(i, 2);
					Ee(2), M(t), V((e) => a.disabled = e, [() => !K(j).trim()]), q("keydown", i, (e) => e.key === "Enter" && Oe()), Wr(i, () => K(j), (e) => R(j, e)), q("click", a, Oe), Y(e, t);
				}, s = (e) => {
					var t = wi(), n = B(z(t), 2), r = B(z(n)), i = z(r);
					i.value = i.__value = "text";
					var a = B(i);
					a.value = a.__value = "image", M(r);
					var o;
					Nr(r), M(n);
					var s = B(n, 2);
					Q(s);
					var c = B(s, 4);
					Cr(c, 17, () => K(x).nav.items, yr, (e, t, n) => {
						var r = Ci(), i = z(r);
						Q(i);
						var a = B(i, 2), o = z(a);
						Cr(o, 17, () => K(x).pages, (e) => e.id, (e, t) => {
							var n = ui(), r = z(n, !0);
							M(n);
							var i = {};
							V(() => {
								X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
							}), Y(e, n);
						});
						var s = B(o);
						s.value = s.__value = "__href", M(a);
						var c;
						Nr(a);
						var l = B(a, 2), u = (e) => {
							var r = Si();
							Q(r), V(() => $(r, K(t).href ?? "")), q("change", r, (e) => Le(n, e.target.value)), Y(e, r);
						};
						Z(l, (e) => {
							K(t).page || e(u);
						});
						var d = B(l, 2), f = z(d);
						f.disabled = n === 0;
						var p = B(f, 2), m = B(p, 2);
						M(d), M(r), V(() => {
							$(i, K(t).label), c !== (c = K(t).page ?? "__href") && (a.value = (a.__value = K(t).page ?? "__href") ?? "", Mr(a, K(t).page ?? "__href")), p.disabled = n === K(x).nav.items.length - 1;
						}), q("input", i, (e) => Fe(n, e.target.value)), q("change", a, (e) => Ie(n, e.target.value)), q("click", f, () => Re(n, -1)), q("click", p, () => Re(n, 1)), q("click", m, () => ze(n)), Y(e, r);
					});
					var l = B(c, 2);
					M(t), V(() => {
						o !== (o = K(x).nav.logo?.type ?? "text") && (r.value = (r.__value = K(x).nav.logo?.type ?? "text") ?? "", Mr(r, K(x).nav.logo?.type ?? "text")), $(s, K(x).nav.logo?.value ?? ""), Br(s, "placeholder", K(x).nav.logo?.type === "image" ? "/media/logo.webp" : "Navnet i menyen");
					}), q("change", r, (e) => Me({ type: e.target.value })), q("input", s, (e) => Me({ value: e.target.value })), q("click", l, Be), Y(e, t);
				}, c = (e) => {
					var t = Ei(), n = B(z(t), 2), r = B(z(n));
					Q(r), M(n);
					var i = B(n, 2), a = B(z(i));
					Q(a), M(i);
					var o = B(i, 2), s = B(z(o));
					Q(s), M(o);
					var c = B(o, 2), l = B(z(c));
					Q(l), M(c);
					var u = B(c, 4), d = B(z(u)), f = z(d), p = (e) => {
						var t = Ti(), n = {};
						V(() => {
							n !== (n = K(x).theme.tokens.font.heading) && (t.value = (t.__value = K(x).theme.tokens.font.heading) ?? "");
						}), Y(e, t);
					}, h = /* @__PURE__ */ st(() => !Ve.some(([, e]) => e === K(x).theme.tokens.font.heading));
					Z(f, (e) => {
						K(h) && e(p);
					}), Cr(B(f), 17, () => Ve, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ st(() => m(K(t), 2));
						let r = () => K(n)[0], i = () => K(n)[1];
						var a = ui(), o = z(a, !0);
						M(a);
						var s = {};
						V(() => {
							X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), Y(e, a);
					}), M(d);
					var g;
					Nr(d), M(u);
					var _ = B(u, 2), v = B(z(_)), y = z(v), b = (e) => {
						var t = Ti(), n = {};
						V(() => {
							n !== (n = K(x).theme.tokens.font.body) && (t.value = (t.__value = K(x).theme.tokens.font.body) ?? "");
						}), Y(e, t);
					}, S = /* @__PURE__ */ st(() => !Ve.some(([, e]) => e === K(x).theme.tokens.font.body));
					Z(y, (e) => {
						K(S) && e(b);
					}), Cr(B(y), 17, () => Ve, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ st(() => m(K(t), 2));
						let r = () => K(n)[0], i = () => K(n)[1];
						var a = ui(), o = z(a, !0);
						M(a);
						var s = {};
						V(() => {
							X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), Y(e, a);
					}), M(v);
					var C;
					Nr(v), M(_);
					var ee = B(_, 4), w = B(z(ee));
					Q(w), M(ee);
					var T = B(ee, 2), te = B(z(T));
					Q(te), M(T), M(t), V(() => {
						$(r, K(x).theme.tokens.color.bg), $(a, K(x).theme.tokens.color.surface), $(s, K(x).theme.tokens.color.text), $(l, K(x).theme.tokens.color.accent), g !== (g = K(x).theme.tokens.font.heading) && (d.value = (d.__value = K(x).theme.tokens.font.heading) ?? "", Mr(d, K(x).theme.tokens.font.heading)), C !== (C = K(x).theme.tokens.font.body) && (v.value = (v.__value = K(x).theme.tokens.font.body) ?? "", Mr(v, K(x).theme.tokens.font.body)), $(w, K(x).theme.tokens.radius.sm), $(te, K(x).theme.tokens.radius.md);
					}), q("input", r, (e) => He("bg", e.target.value)), q("input", a, (e) => He("surface", e.target.value)), q("input", s, (e) => He("text", e.target.value)), q("input", l, (e) => He("accent", e.target.value)), q("change", d, (e) => P("heading", e.target.value)), q("change", v, (e) => P("body", e.target.value)), q("change", w, (e) => Ue("sm", e.target.value)), q("change", te, (e) => Ue("md", e.target.value)), Y(e, t);
				}, l = (e) => {
					var t = Di();
					let n;
					var r = B(z(t), 2), i = B(z(r), 2), a = z(i), o = B(a, 2);
					M(i), M(r);
					var s = B(r, 2), c = B(s, 2), l = B(z(c));
					M(c);
					var u = B(c, 2), d = B(z(u), 2), f = z(d), m = B(f, 2), h = B(m, 2), g = B(h, 2), _ = B(g, 2);
					M(d), M(u), M(t), V(() => {
						n = jr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: K(p) === "mobile" }), Br(t, "title", K(p) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), q("click", a, () => ot("text")), q("click", o, () => ot("text-box")), q("click", s, () => ot("button")), q("change", l, ct), q("click", f, () => ot("shape-line")), q("click", m, () => ot("shape-arrow")), q("click", h, () => ot("shape-circle")), q("click", g, () => ot("shape-rect")), q("click", _, () => ot("shape-triangle")), Y(e, t);
				}, u = (e) => {
					var t = ji(), n = B(z(t), 2), r = B(z(n)), i = z(r);
					M(r), M(n);
					var a = B(n, 2);
					Q(a);
					var o = B(a, 2), s = z(o);
					Q(s), Ee(), M(o);
					var c = B(o, 2), l = (e) => {
						var t = ki(), n = B($t(t), 2), r = z(n);
						Q(r), Ee(), M(n);
						var i = B(n, 2), a = (e) => {
							var t = Oi(), n = $t(t), r = B(z(n)), i = z(r);
							M(r), M(n);
							var a = B(n, 2);
							Q(a), V(() => {
								X(i, `${K(me).size ?? ""} px`), $(a, K(me).size);
							}), q("input", a, (e) => ve("size", Number(e.target.value))), Y(e, t);
						};
						Z(i, (e) => {
							K(me) && e(a);
						}), V(() => zr(r, K(me) !== null)), q("change", r, (e) => _e(e.target.checked)), Y(e, t);
					}, u = (e) => {
						Y(e, Ai());
					};
					Z(c, (e) => {
						K(pe) ? e(l) : e(u, -1);
					}), M(t), V(() => {
						X(i, `${K(d).size ?? ""} px`), $(a, K(d).size), zr(s, K(d).snap !== !1);
					}), q("input", a, (e) => O("size", Number(e.target.value))), q("change", s, (e) => O("snap", e.target.checked)), Y(e, t);
				}, f = (e) => {
					var t = Fi(), n = z(t), r = (e) => {
						var t = Mi(), n = $t(t), r = z(n);
						M(n), Ee(2), V(() => X(r, `Valgt: ${K(de).type ?? ""}-blokk`)), Y(e, t);
					}, i = (e) => {
						var t = Ni();
						Ee(2), Y(e, t);
					}, a = (e) => {
						Y(e, Pi());
					};
					Z(n, (e) => {
						K(de) ? e(r) : K(pe) ? e(i, 1) : e(a, -1);
					}), M(t), Y(e, t);
				}, h = (e) => {
					var t = Ii(), n = z(t), r = z(n);
					M(n), M(t), V(() => X(r, `${K(D) ?? ""}-panelet kommer i en senere del av v0.5.`)), Y(e, t);
				};
				Z(a, (e) => {
					K(D) === "Sider" ? e(o) : K(D) === "Nav" ? e(s, 1) : K(D) === "Tema" ? e(c, 2) : K(D) === "Blokker" ? e(l, 3) : K(D) === "Grid" ? e(u, 4) : K(D) === "Egenskaper" ? e(f, 5) : e(h, -1);
				}), M(t), V(() => X(i, K(D))), Y(e, t);
			};
			Z(i, (e) => {
				K(D) && e(a);
			}), Y(e, t);
		};
		Z(n, (e) => {
			K(f) && e(i);
		});
		var a = B(n, 2);
		let o;
		var s = z(a);
		Jr(s, (e) => R(l, e), () => K(l)), M(a), M(t), V(() => {
			o = jr(a, 1, "frame-wrap svelte-1n46o8q", null, o, { mobile: K(p) === "mobile" }), Br(s, "src", `/?page=${K(r)}&preview=1`);
		}), or("load", s, Ce), ir(s), Y(e, t);
	}, Dt = (e) => {
		Y(e, Bi());
	};
	Z(Tt, (e) => {
		K(n) ? e(Et) : e(Dt, -1);
	});
	var Ot = B(Tt, 2), kt = (e) => {
		var t = Vi();
		let n;
		var r = z(t), i = z(r, !0);
		M(r);
		var s = B(r, 2);
		M(t), V(() => {
			n = jr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: K(o) === "ok",
				error: K(o) === "error"
			}), X(i, K(a));
		}), q("click", s, () => c("")), Y(e, t);
	};
	Z(Ot, (e) => {
		K(a) && e(kt);
	}), M(ft), V(() => ht = jr(F, 1, "topbar svelte-1n46o8q", null, ht, { hidden: !K(f) })), Y(e, ft), Pe();
}
sr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var Wi = mr(Ui, { target: document.getElementById("urd-admin") });
//#endregion
export { Wi as default };
