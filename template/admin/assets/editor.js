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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, T = 1 << 25, E = 65536, ee = 1 << 21, te = 1 << 22, ne = 1 << 23, re = Symbol("$state"), D = Symbol("legacy props"), ie = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), O = Symbol("text"), ce = Symbol("form reset"), le = new class extends Error {
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
function pe(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function me() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function he(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ge() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function _e(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ve() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ye() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function be() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function xe() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var k = {}, Se = Symbol("uninitialized"), Ce = "http://www.w3.org/1999/xhtml", A = "http://www.w3.org/2000/svg", we = "http://www.w3.org/1998/Math/MathML";
function Te() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ee(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function De() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var j = !1;
function Oe(e) {
	j = e;
}
var M;
function ke(e) {
	if (e === null) throw Ee(), k;
	return M = e;
}
function Ae() {
	return ke(/* @__PURE__ */ ln(M));
}
function N(e) {
	if (j) {
		if (/* @__PURE__ */ ln(M) !== null) throw Ee(), k;
		M = e;
	}
}
function P(e = 1) {
	if (j) {
		for (var t = e, n = M; t--;) n = /* @__PURE__ */ ln(n);
		M = n;
	}
}
function je(e = !0) {
	for (var t = 0, n = M;;) {
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
function Me(e) {
	if (!e || e.nodeType !== 8) throw Ee(), k;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ne(e) {
	return e === this.v;
}
function Pe(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Fe(e) {
	return !Pe(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ie = [];
function Le(e, t = !1, n = !1) {
	return Re(e, /* @__PURE__ */ new Map(), "", Ie, null, n);
}
function Re(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Re(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Re(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Re(t.toJSON(), n, r, i, t);
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
var ze = null;
function Be(e) {
	ze = e;
}
function Ve(e, t = !1, n) {
	ze = {
		p: ze,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: W,
		l: null
	};
}
function He(e) {
	var t = ze, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) bn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, ze = t.p, e ?? {};
}
function Ue() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var We = [];
function Ge() {
	var e = We;
	We = [], f(e);
}
function Ke(e) {
	if (We.length === 0 && !kt) {
		var t = We;
		queueMicrotask(() => {
			t === We && Ge();
		});
	}
	We.push(e);
}
function qe() {
	for (; We.length > 0;) Ge();
}
function Je(e) {
	var t = W;
	if (t === null) return U.f |= ne, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ye(e, t);
}
function Ye(e, t) {
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
var Xe = ~(g | _ | h);
function Ze(e, t) {
	e.f = e.f & Xe | t;
}
function Qe(e) {
	e.f & 512 || e.deps === null ? Ze(e, h) : Ze(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function $e(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= E, $e(t.deps));
}
function et(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), $e(e.deps), Ze(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var tt = !1;
function nt(e) {
	var t = tt;
	try {
		return tt = !1, [e(), tt];
	} finally {
		tt = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function rt(e) {
	j && /* @__PURE__ */ cn(e) !== null && un(e);
}
var it = !1;
function at() {
	it || (it = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ce]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ot(e) {
	var t = U, n = W;
	Un(null), Wn(null);
	try {
		return e();
	} finally {
		Un(t), Wn(n);
	}
}
function st(e, t, n, r = n) {
	e.addEventListener(t, () => ot(n));
	let i = e[ce];
	i ? e[ce] = () => {
		i(), r(!0);
	} : e[ce] = () => r(!0), at();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ct(e) {
	let t = 0, n = Jt(0), r;
	return () => {
		_n() && (G(n), wn(() => (t === 0 && (r = dr(() => e(() => Qt(n)))), t += 1, () => {
			Ke(() => {
				--t, t === 0 && (r?.(), r = void 0, Qt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var lt = S | C;
function ut(e, t, n, r) {
	new dt(e, t, n, r);
}
var dt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = j ? M : null;
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
	#h = ct(() => (this.#m = Jt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Tn(() => {
			if (j) {
				let e = this.#t;
				Ae();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, lt), j && (this.#e = M);
	}
	#g() {
		try {
			this.#a = En(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = En(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = En(() => e(this.#e)), Ke(() => {
			var e = this.#c = document.createDocumentFragment(), t = sn();
			e.append(t), this.#a = this.#x(() => En(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Nn(this.#o, () => {
				this.#o = null;
			}), this.#b(I));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = En(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Ln(this.#a, e);
				let t = this.#n.pending;
				this.#o = En(() => t(this.#e));
			} else this.#b(I);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		et(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = W, n = U, r = ze;
		Wn(this.#i), Un(this.#i), Be(this.#i.ctx);
		try {
			return Ft.ensure(), e();
		} catch (e) {
			return Je(e), null;
		} finally {
			Wn(t), Un(n), Be(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Nn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ke(() => {
			this.#d = !1, this.#m && Xt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), G(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (An(this.#a), null), this.#o &&= (An(this.#o), null), this.#s &&= (An(this.#s), null), j && (ke(this.#t), P(), ke(je()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				De();
				return;
			}
			r = !0, i && xe(), this.#s !== null && Nn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Ye(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return En(() => {
						var t = W;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ye(e, this.#i.parent), null;
				}
			}));
		};
		Ke(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ye(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Ye(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function ft(e, t, n, r) {
	let i = Ue() ? gt : yt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = W, c = pt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ye(e, s);
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
		Promise.all(n.map((e) => /* @__PURE__ */ vt(e))).then(u).catch((e) => Ye(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), mt();
	}) : f();
}
function pt() {
	var e = W, t = U, n = ze, r = I;
	return function(i = !0) {
		Wn(e), Un(t), Be(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function mt(e = !0) {
	Wn(null), Un(null), Be(null), e && I?.deactivate();
}
function ht() {
	var e = W, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function gt(e) {
	var t = 2 | g;
	return W !== null && (W.f |= C), {
		ctx: ze,
		deps: null,
		effects: null,
		equals: Ne,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Se,
		wv: 0,
		parent: W,
		ac: null
	};
}
var _t = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function vt(e, t, n) {
	let r = W;
	r === null && de();
	var i = void 0, a = Jt(Se), o = !U, s = /* @__PURE__ */ new Set();
	return Cn(() => {
		var t = W, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== le && n.reject(e);
			}).finally(mt);
		} catch (e) {
			n.reject(e), mt();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = ht();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(_t);
			else for (let e of s.values()) e.reject(_t);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== _t && (c.activate(), t ? (a.f |= ne, Xt(a, t)) : (a.f & 8388608 && (a.f ^= ne), Xt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), vn(() => {
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
function F(e) {
	let t = /* @__PURE__ */ gt(e);
	return Kn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e) {
	let t = /* @__PURE__ */ gt(e);
	return t.equals = Fe, t;
}
function bt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) An(t[n]);
	}
}
function xt(e) {
	var t, n = W, r = e.parent;
	if (!Bn && r !== null && e.v !== Se && r.f & 24576) return Te(), e.v;
	Wn(r);
	try {
		e.f &= ~E, bt(e), t = ir(e);
	} finally {
		Wn(n);
	}
	return t;
}
function St(e) {
	var t = xt(e);
	if (!e.equals(t) && (e.wv = tr(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), Et?.capture(e, t, !0)), e.deps === null))) {
		Ze(e, h);
		return;
	}
	Bn || (Dt === null ? Qe(e) : (_n() || I?.is_fork) && Dt.set(e, t));
}
function Ct(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ot(() => {
		t.ac.abort(le), t.ac = null;
	}), t.fn !== null && (t.teardown = d), or(t, 0), On(t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && sr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Tt = null, I = null, Et = null, Dt = null, Ot = null, kt = !1, At = !1, jt = null, Mt = null, Nt = 0, Pt = 1, Ft = class e {
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
			for (var r of n.d) Ze(r, g), t(r);
			for (r of n.m) Ze(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Nt++ > 1e3 && (this.#x(), Lt());
		for (let e of this.#u) this.#d.delete(e), Ze(e, g), this.schedule(e);
		for (let e of this.#d) Ze(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = jt = [], r = [], i = Mt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Wt(e), this.#h() || this.discard(), t;
		}
		if (I = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (jt = null, Mt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ut(e, t);
			i.length > 0 && I.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Et = this, zt(r), zt(n), Et = null, this.#s?.resolve();
		var s = I;
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
				a ? r.f ^= h : i & 4 ? t.push(r) : nr(r) && (i & 16 && this.#d.add(r), sr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), Ze(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), I = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) et(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== Se && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Dt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, Dt = null;
	}
	flush() {
		try {
			At = !0, I = this, this.#g();
		} finally {
			Nt = 0, Ot = null, jt = null, Mt = null, At = !1, I = null, Dt = null, Kt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(_t);
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
		this.#m || (this.#m = !0, Ke(() => {
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
		if (I === null) {
			let t = I = new e();
			!At && !kt && Ke(() => {
				t.#e || t.flush();
			});
		}
		return I;
	}
	apply() {
		Dt = null;
	}
	schedule(e) {
		if (Ot = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (jt !== null && t === W && (U === null || !(U.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? Tt = e : t.#t = e, this.linked = !1;
		}
	}
};
function It(e) {
	var t = kt;
	kt = !0;
	try {
		var n;
		for (e && (I !== null && !I.is_fork && I.flush(), n = e());;) {
			if (qe(), I === null) return n;
			I.flush();
		}
	} finally {
		kt = t;
	}
}
function Lt() {
	try {
		ge();
	} catch (e) {
		Ye(e, Ot);
	}
}
var Rt = null;
function zt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && nr(r) && (Rt = /* @__PURE__ */ new Set(), sr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Mn(r), Rt?.size > 0)) {
				Kt.clear();
				for (let e of Rt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Rt.has(n) && (Rt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || sr(n);
					}
				}
				Rt.clear();
			}
		}
		Rt = null;
	}
}
function Bt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Bt(i, t, n, r) : e & 4194320 && !(e & 2048) && Vt(i, t, r) && (Ze(i, g), Ht(i));
	}
}
function Vt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Vt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Ht(e) {
	I.schedule(e);
}
function Ut(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), Ze(e, h);
		for (var n = e.first; n !== null;) Ut(n, t), n = n.next;
	}
}
function Wt(e) {
	Ze(e, h);
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
		equals: Ne,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function L(e, t) {
	let n = Jt(e, t);
	return Kn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Yt(e, t = !1, n = !0) {
	let r = Jt(e);
	return t || (r.equals = Fe), r;
}
function R(e, t, n = !1) {
	return U !== null && (!Hn || U.f & 131072) && Ue() && U.f & 4325394 && (Gn === null || !Gn.has(e)) && be(), Xt(e, n ? en(t) : t, Mt);
}
function Xt(e, t, n = null) {
	if (!e.equals(t)) {
		Kt.set(e, Bn ? t : e.v);
		var r = Ft.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && xt(t), Dt === null && Qe(t);
		}
		e.wv = tr(), $t(e, g, n), Ue() && W !== null && W.f & 1024 && !(W.f & 96) && (Yn === null ? Xn([e]) : Yn.push(e)), !r.is_fork && Gt.size > 0 && !qt && Zt();
	}
	return t;
}
function Zt() {
	qt = !1;
	for (let e of Gt) {
		e.f & 1024 && Ze(e, _);
		let t;
		try {
			t = nr(e);
		} catch {
			t = !0;
		}
		t && sr(e);
	}
	Gt.clear();
}
function Qt(e) {
	R(e, e.v + 1);
}
function $t(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ue(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & g) === 0;
			if (l && Ze(s, t), c & 131072) Gt.add(s);
			else if (c & 2) {
				var u = s;
				Dt?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= E), $t(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Rt !== null && Rt.add(d), n === null ? Ht(d) : n.push(d);
			}
		}
	}
}
function en(t) {
	if (typeof t != "object" || !t || re in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = $n, f = (e) => {
		if ($n === d) return e();
		var t = U, n = $n;
		Un(null), er(d);
		var r = e();
		return Un(t), er(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ve();
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
					let e = f(() => /* @__PURE__ */ L(Se, u));
					r.set(t, e), Qt(o);
				}
			} else R(n, Se), Qt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(en(s ? e[n] : Se), u)), r.set(n, o)), o !== void 0) {
				var c = G(o);
				return c === Se ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = G(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== Se) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === re) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== Se || Reflect.has(e, t);
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? en(e[t]) : Se, u)), r.set(t, n)), G(n) === Se) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(Se, u)), r.set(d + "", p)) : R(p, Se);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, en(n)), r.set(t, c));
			else {
				l = c.v !== Se;
				var m = f(() => en(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Qt(o);
			}
			return !0;
		},
		ownKeys(e) {
			G(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== Se;
			});
			for (var [n, i] of r) i.v !== Se && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			ye();
		}
	});
}
var tn, nn, rn, an;
function on() {
	if (tn === void 0) {
		tn = window, nn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		rn = a(t, "firstChild").get, an = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[O] = void 0);
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
function z(e, t) {
	if (!j) return /* @__PURE__ */ cn(e);
	var n = /* @__PURE__ */ cn(M);
	if (n === null) n = M.appendChild(sn());
	else if (t && n.nodeType !== 3) {
		var r = sn();
		return n?.before(r), ke(r), r;
	}
	return t && pn(n), ke(n), n;
}
function B(e, t = !1) {
	if (!j) {
		var n = /* @__PURE__ */ cn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ln(n) : n;
	}
	if (t) {
		if (M?.nodeType !== 3) {
			var r = sn();
			return M?.before(r), ke(r), r;
		}
		pn(M);
	}
	return M;
}
function V(e, t = 1, n = !1) {
	let r = j ? M : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ ln(r);
	if (!j) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = sn();
			return r === null ? i?.after(a) : r.before(a), ke(a), a;
		}
		pn(r);
	}
	return ke(r), r;
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
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function mn(e) {
	W === null && (U === null && he(e), me()), Bn && pe(e);
}
function hn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function gn(e, t) {
	var n = W;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: ze,
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
	I?.register_created_effect(r);
	var i = r;
	if (e & 4) jt === null ? Ft.ensure().schedule(r) : jt.push(r);
	else if (t !== null) {
		try {
			sr(r);
		} catch (e) {
			throw An(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && hn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function _n() {
	return U !== null && !Hn;
}
function vn(e) {
	let t = gn(8, null);
	return Ze(t, h), t.teardown = e, t;
}
function yn(e) {
	mn("$effect");
	var t = W.f;
	if (!U && t & 32 && ze !== null && !ze.i) {
		var n = ze;
		(n.e ??= []).push(e);
	} else return bn(e);
}
function bn(e) {
	return gn(4 | w, e);
}
function xn(e) {
	Ft.ensure();
	let t = gn(64 | C, e);
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
	return gn(te | C, e);
}
function wn(e, t = 0) {
	return gn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	ft(r, t, n, (t) => {
		gn(8, () => {
			e(...t.map(G));
		});
	});
}
function Tn(e, t = 0) {
	return gn(16 | t, e);
}
function En(e) {
	return gn(32 | C, e);
}
function Dn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Bn, n = U;
		Vn(!0), Un(null);
		try {
			t.call(null);
		} finally {
			Vn(e), Un(n);
		}
	}
}
function On(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ot(() => {
			e.abort(le);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (jn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, On(e, t && !n), or(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Dn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Mn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function jn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ ln(e);
		e.remove(), e = n;
	}
}
function Mn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Nn(e, t, n = !0) {
	var r = [];
	Pn(e, r, !0);
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
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Pn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Fn(e) {
	In(e, !0);
}
function In(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (Ze(e, g), Ft.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			In(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Ln(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ ln(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Rn = null, zn = !1, Bn = !1;
function Vn(e) {
	Bn = e;
}
var U = null, Hn = !1;
function Un(e) {
	U = e;
}
var W = null;
function Wn(e) {
	W = e;
}
var Gn = null;
function Kn(e) {
	U !== null && (Gn ??= /* @__PURE__ */ new Set()).add(e);
}
var qn = null, Jn = 0, Yn = null;
function Xn(e) {
	Yn = e;
}
var Zn = 1, Qn = 0, $n = Qn;
function er(e) {
	$n = e;
}
function tr() {
	return ++Zn;
}
function nr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~E), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (nr(a) && St(a), a.wv > e.wv) return !0;
		}
		t & 512 && Dt === null && Ze(e, h);
	}
	return !1;
}
function rr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Gn !== null && Gn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? rr(a, t, !1) : t === a && (n ? Ze(a, g) : a.f & 1024 && Ze(a, _), Ht(a));
	}
}
function ir(e) {
	var t = qn, n = Jn, r = Yn, i = U, a = Gn, o = ze, s = Hn, c = $n, l = e.f;
	qn = null, Jn = 0, Yn = null, U = l & 96 ? null : e, Gn = null, Be(e.ctx), Hn = !1, $n = ++Qn, e.ac !== null && (ot(() => {
		e.ac.abort(le);
	}), e.ac = null);
	try {
		e.f |= ee;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = I?.is_fork;
		if (qn !== null) {
			var m;
			if (p || or(e, Jn), f !== null && Jn > 0) for (f.length = Jn + qn.length, m = 0; m < qn.length; m++) f[Jn + m] = qn[m];
			else e.deps = f = qn;
			if (_n() && e.f & 512) for (m = Jn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Jn < f.length && (or(e, Jn), f.length = Jn);
		if (Ue() && Yn !== null && !Hn && f !== null && !(e.f & 6146)) for (m = 0; m < Yn.length; m++) rr(Yn[m], e);
		if (i !== null && i !== e) {
			if (Qn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Qn;
			if (t !== null) for (let e of t) e.rv = Qn;
			Yn !== null && (r === null ? r = Yn : r.push(...Yn));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return Je(e);
	} finally {
		e.f ^= ee, qn = t, Jn = n, Yn = r, U = i, Gn = a, Be(o), Hn = s, $n = c;
	}
}
function ar(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (qn === null || !n.call(qn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== Se && Qe(s), s.ac !== null && ot(() => {
			s.ac.abort(le), s.ac = null;
		}), Ct(s), or(s, 0);
	}
}
function or(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ar(e, n[r]);
}
function sr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		Ze(e, h);
		var n = W, r = zn;
		W = e, zn = (t & 96) == 0;
		try {
			t & 16777232 ? kn(e) : On(e), Dn(e);
			var i = ir(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Zn;
		} finally {
			zn = r, W = n;
		}
	}
}
async function cr() {
	await Promise.resolve(), It();
}
function G(e) {
	var t = (e.f & 2) != 0;
	if (Rn?.add(e), U !== null && !Hn && !(W !== null && W.f & 16384) && (Gn === null || !Gn.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < Qn && (e.rv = Qn, qn === null && r !== null && r[Jn] === e ? Jn++ : qn === null ? qn = [e] : qn.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (Bn && Kt.has(e)) return Kt.get(e);
	if (t) {
		var a = e;
		if (Bn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || ur(a)) && (o = xt(a)), Kt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Hn && U !== null && (zn || (U.f & 512) != 0), c = (a.f & b) === 0;
		nr(a) && (s && (a.f |= 512), St(a)), s && !c && (wt(a), lr(a));
	}
	if (Dt?.has(e)) return Dt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function lr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (wt(t), lr(t));
}
function ur(e) {
	if (e.v === Se) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Kt.has(t) || t.f & 2 && ur(t)) return !0;
	return !1;
}
function dr(e) {
	var t = Hn;
	try {
		return Hn = !0, e();
	} finally {
		Hn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var fr = ["touchstart", "touchmove"];
function pr(e) {
	return fr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var mr = Symbol("events"), hr = /* @__PURE__ */ new Set(), gr = /* @__PURE__ */ new Set();
function _r(e) {
	if (!j) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function vr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Sr.call(t, e), !e.cancelBubble) return ot(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ke(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function yr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = vr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && vn(() => {
		t.removeEventListener(e, o, a);
	});
}
function K(e, t, n) {
	(t[mr] ??= {})[e] = n;
}
function br(e) {
	for (var t = 0; t < e.length; t++) hr.add(e[t]);
	for (var n of gr) n(e);
}
var xr = null;
function Sr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	xr = e;
	var s = 0, c = xr === e && e[mr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[mr] = t;
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
		Un(null), Wn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[mr]?.[r];
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
			e[mr] = t, delete e.currentTarget, Un(d), Wn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Cr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function wr(e) {
	return Cr?.createHTML(e) ?? e;
}
function Tr(e) {
	var t = fn("template");
	return t.innerHTML = wr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Er(e, t) {
	var n = W;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function q(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (j) return Er(M, null), M;
		i === void 0 && (i = Tr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ cn(i)));
		var t = r || nn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ cn(t), s = t.lastChild;
			Er(o, s);
		} else Er(t, t);
		return t;
	};
}
function Dr(e = "") {
	if (!j) {
		var t = sn(e + "");
		return Er(t, t), t;
	}
	var n = M;
	return n.nodeType === 3 ? pn(n) : (n.before(n = sn()), ke(n)), Er(n, n), n;
}
function Or() {
	if (j) return Er(M, null), M;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = sn();
	return e.append(t, n), Er(t, n), e;
}
function J(e, t) {
	if (j) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = M), Ae();
		return;
	}
	e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[O] ??= e.nodeValue) && (e[O] = n, e.nodeValue = `${n}`);
}
function kr(e, t) {
	return jr(e, t);
}
var Ar = /* @__PURE__ */ new Map();
function jr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	on();
	var l = void 0, u = xn(() => {
		var s = n ?? t.appendChild(sn());
		ut(s, { pending: () => {} }, (t) => {
			Ve({});
			var n = ze;
			if (o && (n.c = o), a && (i.$$events = a), j && Er(t, null), l = e(t, i) || {}, j && (W.nodes.end = M, M === null || M.nodeType !== 8 || M.data !== "]")) throw Ee(), k;
			He();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = pr(r);
					for (let e of [t, document]) {
						var a = Ar.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Ar.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Sr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(hr)), gr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Ar.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Sr), r.delete(e), r.size === 0 && Ar.delete(n)) : r.set(e, i);
			}
			gr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Mr.set(l, u), l;
}
var Mr = /* @__PURE__ */ new WeakMap(), Nr = class {
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
						Ln(r, t), t.append(sn()), this.#n.set(e, {
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
		var n = I, r = dn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = sn();
			i.append(a), this.#n.set(e, {
				effect: En(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, En(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else j && (this.anchor = M), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	j && (r = M, Ae());
	var i = new Nr(e), a = n ? S : 0;
	function o(e, t) {
		if (j) {
			var n = Me(r);
			if (e !== parseInt(n.substring(1))) {
				var a = je();
				ke(a), i.anchor = a, Oe(!1), i.ensure(e, t), Oe(!0);
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
function Pr(e, t) {
	return t;
}
function Fr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Nn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Ir(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			un(d), d.append(u), e.items.clear();
		}
		Ir(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Ir(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, Ln(a, document.createDocumentFragment())) : An(t[i], n);
	}
}
var Lr;
function Rr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = j ? ke(/* @__PURE__ */ cn(u)) : u.appendChild(sn());
	}
	j && Ae();
	var d = null, f = /* @__PURE__ */ yt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Br(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Hr(d, null, c)) : Fn(d) : Nn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Tn(() => {
			p = G(f);
			var e = p.length;
			let t = !1;
			j && Me(c) === "[!" != (e === 0) && (c = je(), ke(c), Oe(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = I, v = dn(), y = 0; y < e; y += 1) {
				j && M.nodeType === 8 && M.data === "]" && (c = M, t = !0, Oe(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Xt(S.v, b), S.i && Xt(S.i, y), v && u.unskip_effect(S.e)) : (S = Vr(l, h ? c : Lr ??= sn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = En(() => s(c)) : (d = En(() => s(Lr ??= sn())), d.f |= T)), e > r.size && fe("", "", ""), j && e > 0 && ke(je()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Oe(!0), G(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, j && (c = M);
}
function zr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Br(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = zr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Fn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Hr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Ur(e, d, _), Ur(e, _, y), Hr(_, y, n), d = _, p = [], m = [], l = zr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Hr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Ur(e, S.prev, C.next), Ur(e, d, S), Ur(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Hr(_, l, n), Ur(e, _.prev, _.next), Ur(e, _, d === null ? e.effect.first : d.next), Ur(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = zr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = zr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Ir(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = zr(l.next);
		var E = w.length;
		if (E > 0) {
			var ee = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.fix();
			}
			Fr(e, w, ee);
		}
	}
	o && Ke(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Vr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Jt(n) : /* @__PURE__ */ Yt(n, !1, !1) : null, l = o & 2 ? Jt(i) : null;
	return {
		v: c,
		i: l,
		e: En(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Hr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ ln(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Ur(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Wr(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		j && (o = ke(/* @__PURE__ */ cn(c)));
	}
	H(() => {
		var e = W;
		if (s === (s = t() ?? "")) {
			j && Ae();
			return;
		}
		if (n && !j) {
			e.nodes = null, c.innerHTML = s, s !== "" && Er(/* @__PURE__ */ cn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (jn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (j) {
				for (var a = M.data, l = Ae(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ ln(l);
				if (l === null) throw Ee(), k;
				Er(M, u), o = ke(l);
				return;
			}
			var d = fn(r ? "svg" : i ? "math" : "template", r ? A : i ? we : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Er(/* @__PURE__ */ cn(f), f.lastChild), r || i) for (; /* @__PURE__ */ cn(f);) o.before(/* @__PURE__ */ cn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Gr = [..." 	\n\r\f\xA0\v﻿"];
function Kr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Gr.includes(r[o - 1])) && (s === r.length || Gr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function qr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Jr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Yr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Jr)), i && c.push(...Object.keys(i).map(Jr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Jr(e.substring(l, u).trim());
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
		return r && (n += qr(r)), i && (n += qr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Xr(e, t, n, r, i, a) {
	var o = e[oe];
	if (j || o !== n || o === void 0) {
		var s = Kr(n, r, a);
		(!j || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Zr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function Qr(e, t, n, r) {
	var i = e[se];
	if (j || i !== t) {
		var a = Yr(t, r);
		(!j || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
	} else r && (Array.isArray(r) ? (Zr(e, n?.[0], r[0]), Zr(e, n?.[1], r[1], "important")) : Zr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var $r = Symbol("is custom element"), ei = Symbol("is html"), ti = ue ? "link" : "LINK", ni = ue ? "progress" : "PROGRESS";
function Z(e) {
	if (j) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					$(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					$(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ce] = n, Ke(n), at();
	}
}
function Q(e, t) {
	var n = ii(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ni) || (e.value = t ?? "");
}
function ri(e, t) {
	var n = ii(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function $(e, t, n, r) {
	var i = ii(e);
	j && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ti) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && oi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ii(e) {
	return e[ae] ??= {
		[$r]: e.nodeName.includes("-"),
		[ei]: e.namespaceURI === Ce
	};
}
var ai = /* @__PURE__ */ new Map();
function oi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = ai.get(t);
	if (n) return n;
	ai.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function si(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	st(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ci(e) ? li(a) : a, n(a), I !== null && r.add(I), await cr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (j && e.defaultValue !== e.value || dr(t) == null && e.value) && (n(ci(e) ? li(e.value) : e.value), I !== null && r.add(I)), wn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
			if (r.has(i)) return;
		}
		ci(e) && n === li(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function ci(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function li(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ui(e, t) {
	return e === t || e?.[re] === t;
}
function di(e = {}, t, n, r) {
	var i = ze.r, a = W;
	return Sn(() => {
		var o, s;
		return wn(() => {
			o = s, s = r?.() || [], dr(() => {
				ui(n(...s), e) || (t(e, ...s), o && ui(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ui(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function fi(e, t, n, r) {
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ gt(r), G(u)) : (l && (l = !1, c = s ? dr(r) : r), c);
	let f;
	if (o) {
		var p = re in e || D in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = nt(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && _e(t), f(m)));
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
	o && G(y);
	var b = W;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(y) : i && o ? en(e) : e;
			return R(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Bn && v || b.f & 16384 ? y.v : G(y);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function pi(e, t) {
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
//#region src/lib/ColorPicker.svelte
var mi = /* @__PURE__ */ q("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), hi = /* @__PURE__ */ q("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), gi = /* @__PURE__ */ q("<button type=\"button\"></button>"), _i = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), vi = /* @__PURE__ */ q("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), yi = /* @__PURE__ */ q("<span class=\"cp-tokens svelte-zxiloo\"></span>"), bi = /* @__PURE__ */ q("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), xi = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Si = /* @__PURE__ */ q("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), Ci = /* @__PURE__ */ q("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function wi(e, t) {
	Ve(t, !0);
	let n = fi(t, "value", 3, "#000000"), r = fi(t, "tokens", 19, () => []), i = fi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = "urd-saved-colors", s = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, c = () => r().find(([e]) => e === n())?.[0] ?? null, l = /* @__PURE__ */ L(en([])), u = /* @__PURE__ */ L(en([])), d = "", f = "", p = /* @__PURE__ */ L(null), h = /* @__PURE__ */ L(!1), g = /* @__PURE__ */ L(en({
		top: 0,
		left: 0
	})), _ = /* @__PURE__ */ L(0), v = /* @__PURE__ */ L(0), y = /* @__PURE__ */ L(1), b = /* @__PURE__ */ L(1), x = /* @__PURE__ */ L("#000000");
	function S(e) {
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
	let C = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function w(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function T(e, t, n) {
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
	function E() {
		return C(...T(G(_), G(v), G(y)));
	}
	function ee() {
		let e = E();
		return G(b) >= .995 ? e : e + Math.round(G(b) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		R(x, ee(), !0), f = G(x), t.onchange?.(G(x));
	}
	function ne(e) {
		let t = S(e);
		return t ? (((e) => {
			var t = m(e, 3);
			R(_, t[0], !0), R(v, t[1], !0), R(y, t[2], !0);
		})(w(t[0], t[1], t[2])), R(b, t[3], !0), R(x, ee(), !0), !0) : !1;
	}
	function re() {
		ne(s()) || ne("#000000"), d = n(), f = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			R(l, Array.isArray(e) ? e : [], !0);
		} catch {
			R(l, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			R(u, Array.isArray(e) ? e : [], !0);
		} catch {
			R(u, [], !0);
		}
		let e = G(p).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 236, window.innerWidth - 236 - 8)), r = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		R(g, {
			top: r,
			left: t
		}, !0), R(h, !0);
	}
	function D() {
		if (R(h, !1), f && f !== d) {
			let e = [f, ...G(l).filter((e) => e !== f)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function ie(e, n) {
		ne(n), R(x, n, !0), t.onchange?.(e);
	}
	function ae(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			R(v, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), R(y, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), te();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function oe(e) {
		ne(e.target.value) ? te() : R(x, E(), !0);
	}
	function se(e) {
		return (S(E()) ?? [
			0,
			0,
			0
		])[e];
	}
	function O(e, t) {
		let n = S(E()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			R(_, t[0], !0), R(v, t[1], !0), R(y, t[2], !0);
		})(w(...n)), te();
	}
	let ce = typeof window < "u" && "EyeDropper" in window;
	async function le() {
		try {
			ne((await new window.EyeDropper().open()).sRGBHex) && te();
		} catch {}
	}
	function ue(e) {
		ne(e) && te();
	}
	function de() {
		let e = ee();
		G(u).includes(e) || (R(u, [e, ...G(u)].slice(0, 12), !0), localStorage.setItem(o, JSON.stringify(Le(G(u)))));
	}
	function fe(e) {
		R(u, G(u).filter((t) => t !== e), !0), localStorage.setItem(o, JSON.stringify(Le(G(u))));
	}
	yn(() => {
		if (!G(h)) return;
		let e = (e) => {
			G(p) && !G(p).contains(e.target) && D();
		}, t = (e) => {
			e.key === "Escape" && D();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0);
		};
	});
	var pe = Ci(), me = z(pe);
	let he;
	var ge = V(me, 2), _e = (e) => {
		var t = Si(), i = z(t), a = z(i);
		N(i);
		var o = V(i, 2);
		Z(o);
		var s = V(o, 2);
		Z(s);
		var d = V(s, 2), f = z(d), p = V(f, 2);
		Z(p);
		var h = V(p, 2), S = (e) => {
			var t = mi();
			K("click", t, le), J(e, t);
		};
		X(h, (e) => {
			ce && e(S);
		}), N(d);
		var C = V(d, 2);
		Rr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = hi();
			Z(r), H((e) => {
				$(r, "title", t), Q(r, e);
			}, [() => se(G(n))]), K("change", r, (e) => O(G(n), e.target.value)), J(e, r);
		}), N(C);
		var w = V(C, 2), T = (e) => {
			var t = _i(), i = B(t), a = V(z(i)), o = (e) => {
				var t = Dr();
				H((e) => Y(t, `- koblet til «${e ?? ""}»`), [() => c()]), J(e, t);
			}, s = /* @__PURE__ */ F(() => c());
			X(a, (e) => {
				G(s) && e(o);
			}), N(i);
			var l = V(i, 2);
			Rr(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ F(() => m(G(t), 2));
				let i = () => G(r)[0], a = () => G(r)[1];
				var o = gi();
				let s;
				H(() => {
					s = Xr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Qr(o, `background: ${a() ?? ""}`), $(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), K("click", o, () => ie(i(), a())), J(e, o);
			}), N(l), J(e, t);
		};
		X(w, (e) => {
			r().length && e(T);
		});
		var ee = V(w, 2), ne = V(z(ee));
		N(ee);
		var re = V(ee, 2), D = (e) => {
			var t = yi();
			Rr(t, 20, () => G(u), (e) => e, (e, t) => {
				var n = vi(), r = z(n), i = V(r, 2);
				N(n), H(() => {
					Qr(r, `background: ${t ?? ""}`), $(r, "title", t);
				}), K("click", r, () => ue(t)), K("click", i, () => fe(t)), J(e, n);
			}), N(t), J(e, t);
		};
		X(re, (e) => {
			G(u).length && e(D);
		});
		var pe = V(re, 2), me = (e) => {
			var t = xi(), n = V(B(t), 2);
			Rr(n, 20, () => G(l), (e) => e, (e, t) => {
				var n = bi();
				H(() => {
					Qr(n, `background: ${t ?? ""}`), $(n, "title", t);
				}), K("click", n, () => ue(t)), J(e, n);
			}), N(n), J(e, t);
		};
		X(pe, (e) => {
			G(l).length && e(me);
		}), N(t), H((e, n) => {
			Qr(t, `top: ${G(g).top ?? ""}px; left: ${G(g).left ?? ""}px`), Qr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${G(_) ?? ""}, 100%, 50%)`), Qr(a, `left: ${G(v) * 100}%; top: ${(1 - G(y)) * 100}%`), Q(o, G(_)), Q(s, e), Qr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Qr(f, `background: ${G(x) ?? ""}`), Q(p, G(x));
		}, [() => Math.round(G(b) * 100), () => E()]), K("pointerdown", i, ae), K("input", o, (e) => {
			R(_, Number(e.target.value), !0), te();
		}), K("input", s, (e) => {
			R(b, Number(e.target.value) / 100), te();
		}), K("change", p, oe), K("click", ne, de), J(e, t);
	};
	X(ge, (e) => {
		G(h) && e(_e);
	}), N(pe), di(pe, (e) => R(p, e), () => G(p)), H((e, t, n) => {
		he = Xr(me, 1, "cp-swatch svelte-zxiloo", null, he, e), Qr(me, `background: ${t ?? ""}`), $(me, "title", n), $(me, "aria-label", i());
	}, [
		() => ({ linked: c() }),
		() => s(),
		() => c() ? `${i()} (koblet til temafargen «${c()}»)` : i()
	]), K("click", me, () => G(h) ? D() : re()), J(e, pe), He();
}
br([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/imageTools.js
var Ti = 1600, Ei = .82, Di = .6;
async function Oi(e, t = Ti) {
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Ei);
	return c.size > 4e5 && (c = await s(Di)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
function ki(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Ai(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var ji = /* @__PURE__ */ q("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), Mi = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ni = /* @__PURE__ */ q("<button type=\"button\"> </button>"), Pi = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Fi = /* @__PURE__ */ q("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), Ii = /* @__PURE__ */ q("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!></div>"), Li = /* @__PURE__ */ q("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"> </button> <!></span>");
function Ri(e, t) {
	Ve(t, !0);
	let n = fi(t, "value", 3, "★"), r = fi(t, "label", 3, "Velg tegn"), i = "urd-recent-glyphs", a = [
		["Symboler", "★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂"],
		["Piler", "→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›"],
		["Smilefjes", "😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶"],
		["Gester og folk", "👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑"],
		["Natur", "🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕"],
		["Mat og drikke", "☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫"],
		["Aktivitet", "⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘"],
		["Objekter", "💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼"],
		["Hjerter", "❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟"]
	], o = /* @__PURE__ */ L(en([])), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(!1), u = /* @__PURE__ */ L(en({
		top: 0,
		left: 0
	}));
	function d() {
		try {
			let e = JSON.parse(localStorage.getItem(i) ?? "[]");
			R(o, Array.isArray(e) ? e : [], !0);
		} catch {
			R(o, [], !0);
		}
		let e = G(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		R(u, {
			top: n,
			left: t
		}, !0), R(l, !0);
	}
	function f(e) {
		let n = [e, ...G(o).filter((t) => t !== e)].slice(0, 16);
		localStorage.setItem(i, JSON.stringify(n)), t.onpick?.(e), R(l, !1);
	}
	async function p(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Oi(n, 256);
		t.onimage?.(r.dataUrl), R(l, !1);
	}
	yn(() => {
		if (!G(l)) return;
		let e = (e) => {
			G(s) && !G(s).contains(e.target) && R(l, !1);
		}, t = (e) => {
			e.key === "Escape" && R(l, !1);
		}, n = (e) => {
			G(s) && e.target instanceof Node && !G(s).contains(e.target) && R(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var h = Li(), g = z(h), _ = z(g, !0);
	N(g);
	var v = V(g, 2), y = (e) => {
		var r = Ii(), i = z(r), s = (e) => {
			var t = Mi(), n = V(B(t), 2);
			Rr(n, 20, () => G(o), (e) => e, (e, t) => {
				var n = ji(), r = z(n, !0);
				N(n), H(() => Y(r, t)), K("click", n, () => f(t)), J(e, n);
			}), N(n), J(e, t);
		};
		X(i, (e) => {
			G(o).length && e(s);
		});
		var l = V(i, 2);
		Rr(l, 17, () => a, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ F(() => m(G(t), 2));
			let i = () => G(r)[0], a = () => G(r)[1];
			var o = Pi(), s = B(o), c = z(s, !0);
			N(s);
			var l = V(s, 2);
			Rr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Ni();
				let i;
				var a = z(r, !0);
				N(r), H(() => {
					i = Xr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), Y(a, t);
				}), K("click", r, () => f(t)), J(e, r);
			}), N(l), H(() => Y(c, i())), J(e, o);
		});
		var d = V(l, 2), h = (e) => {
			var t = Fi(), n = V(B(t), 2), r = V(n, 2);
			di(r, (e) => R(c, e), () => G(c)), P(2), K("click", n, () => G(c).click()), K("change", r, p), J(e, t);
		};
		X(d, (e) => {
			t.onimage && e(h);
		}), N(r), H(() => Qr(r, `top: ${G(u).top ?? ""}px; left: ${G(u).left ?? ""}px`)), J(e, r);
	};
	X(v, (e) => {
		G(l) && e(y);
	}), N(h), di(h, (e) => R(s, e), () => G(s)), H(() => {
		$(g, "title", r()), $(g, "aria-label", r()), Y(_, n() || "★");
	}), K("click", g, () => G(l) ? R(l, !1) : d()), J(e, h), He();
}
br(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function zi(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n);
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
		sendViewport(e) {
			r({
				type: "urd-viewport",
				mode: e
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
		sendDemoAnim(e, t = null) {
			r({
				type: "urd-demo-anim",
				sectionId: e,
				blockId: t
			});
		},
		destroy() {
			window.removeEventListener("message", n);
		}
	};
}
//#endregion
//#region src/lib/Dropdown.svelte
var Bi = /* @__PURE__ */ q("<button type=\"button\"> </button>"), Vi = /* @__PURE__ */ q("<div class=\"dd-pop svelte-vtocc6\"></div>"), Hi = /* @__PURE__ */ q("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function Ui(e, t) {
	Ve(t, !0);
	let n = fi(t, "value", 3, null), r = fi(t, "options", 19, () => []), i = fi(t, "title", 3, null), a = fi(t, "disabled", 3, !1), o = /* @__PURE__ */ L(!1), s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(en({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		if (a()) return;
		if (G(o)) {
			R(o, !1);
			return;
		}
		let e = G(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		R(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0), R(o, !0);
	}
	function d(e) {
		R(o, !1), t.onchange?.(e);
	}
	yn(() => {
		if (!G(o)) return;
		let e = (e) => {
			G(s) && !G(s).contains(e.target) && R(o, !1);
		}, t = (e) => {
			e.key === "Escape" && R(o, !1);
		}, n = (e) => {
			G(s) && e.target instanceof Node && !G(s).contains(e.target) && R(o, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var f = Hi(), p = z(f), h = z(p), g = z(h, !0);
	N(h);
	var _ = V(h, 2), v = z(_, !0);
	N(_), N(p);
	var y = V(p, 2), b = (e) => {
		var t = Vi();
		Rr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ F(() => m(G(t), 2));
			let i = () => G(r)[0], a = () => G(r)[1];
			var o = Bi();
			let s;
			var c = z(o, !0);
			N(o), H(() => {
				s = Xr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), Y(c, a());
			}), K("click", o, () => d(i())), J(e, o);
		}), N(t), H(() => Qr(t, `top: ${G(c).top ?? ""}px; left: ${G(c).left ?? ""}px; min-width: ${G(c).width ?? ""}px`)), J(e, t);
	};
	X(y, (e) => {
		G(o) && e(b);
	}), N(f), di(f, (e) => R(s, e), () => G(s)), H((e) => {
		$(p, "title", i()), p.disabled = a(), Y(g, e), Y(v, G(o) ? "▴" : "▾");
	}, [() => l()]), K("click", p, u), J(e, f), He();
}
br(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Wi = /* @__PURE__ */ q("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function Gi(e, t) {
	Ve(t, !0);
	let n = fi(t, "image", 3, ""), r = /* @__PURE__ */ L(null), i = /* @__PURE__ */ L(null), a = /* @__PURE__ */ L(1), o = /* @__PURE__ */ L(.5), s = /* @__PURE__ */ L(.5), c = /* @__PURE__ */ L(1), l = /* @__PURE__ */ L(1), u = /* @__PURE__ */ L(1);
	yn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			R(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !G(i)) return;
		e.filter = `brightness(${G(c)}) contrast(${G(l)}) saturate(${G(u)})`;
		let n = Math.max(t / G(i).width, t / G(i).height) * G(a), r = G(i).width * n, d = G(i).height * n, f = t / 2 - G(o) * r, p = t / 2 - G(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(G(i), f, p, r, d), e.filter = "none";
	}
	yn(() => {
		G(i), G(a), G(o), G(s), G(c), G(l), G(u), G(r) && d(G(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!G(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / G(i).width, 220 / G(i).height) * G(a), c = G(i).width * r, l = G(i).height * r, u = (e) => {
			R(o, Math.min(1, Math.max(0, G(o) - (e.clientX - t) / c)), !0), R(s, Math.min(1, Math.max(0, G(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		R(a, 1), R(o, .5), R(s, .5), R(c, 1), R(l, 1), R(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = Wi(), g = z(h), _ = V(z(g), 2), v = z(_);
	$(v, "width", 220), $(v, "height", 220), di(v, (e) => R(r, e), () => G(r)), P(2), N(_);
	var y = V(_, 2), b = V(z(y)), x = z(b);
	N(b), N(y);
	var S = V(y, 2);
	Z(S);
	var C = V(S, 2), w = V(z(C)), T = z(w);
	N(w), N(C);
	var E = V(C, 2);
	Z(E);
	var ee = V(E, 2), te = V(z(ee)), ne = z(te);
	N(te), N(ee);
	var re = V(ee, 2);
	Z(re);
	var D = V(re, 2), ie = V(z(D)), ae = z(ie);
	N(ie), N(D);
	var oe = V(D, 2);
	Z(oe);
	var se = V(oe, 2), O = z(se), ce = V(O, 2);
	N(se);
	var le = V(se, 2), ue = z(le), de = V(ue, 2);
	N(le), N(g), N(h), H((e, t, n, r) => {
		Y(x, `${e ?? ""}x`), Y(T, `${t ?? ""}%`), Y(ne, `${n ?? ""}%`), Y(ae, `${r ?? ""}%`);
	}, [
		() => G(a).toFixed(2),
		() => Math.round(G(c) * 100),
		() => Math.round(G(l) * 100),
		() => Math.round(G(u) * 100)
	]), K("pointerdown", v, f), si(S, () => G(a), (e) => R(a, e)), si(E, () => G(c), (e) => R(c, e)), si(re, () => G(l), (e) => R(l, e)), si(oe, () => G(u), (e) => R(u, e)), K("click", O, () => R(u, 0)), K("click", ce, p), K("click", ue, () => t.oncancel?.()), K("click", de, m), J(e, h), He();
}
br(["pointerdown", "click"]);
var Ki = (e) => Math.round(e * 100) / 100;
function qi(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var Ji = {
	1: (e, t) => {
		for (let n of e.sections ?? []) {
			let e = n.grid ?? t?.grid, r = typeof e?.columns == "number" ? e : {
				columns: 24,
				rowHeight: e?.size ?? e?.rowHeight ?? 8
			};
			for (let e of n.blocks ?? []) for (let t of ["desktop", "mobile"]) {
				let n = e.frames?.[t];
				n && (e.frames[t] = {
					...n,
					x: Ki(n.x * 100 / r.columns),
					w: Ki(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= qi(t.grid);
		return e;
	}
}, Yi = { 1: (e) => (e.grid = qi(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function Xi(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = Yi[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Zi(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = Ji[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function Qi(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var $i = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function ea(e, t) {
	let n = Qi(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Qi(t[2]), a = $i(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var ta = /^[a-z0-9][a-z0-9-]*$/;
function na(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (ta.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Qi(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function ra(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function ia(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var aa = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = ia(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, oa = {
	version: 1,
	label: "Gradient",
	defaults: () => ({
		stops: ["#0b0e14", "#1a1030"],
		angle: 160,
		animate: !1,
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		let n = t.stops.map(ia).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, sa = {
	version: 1,
	label: "Glød",
	defaults: () => ({
		x: .5,
		y: .3,
		color: "accent",
		radius: .5,
		opacity: .35
	}),
	migrations: {},
	render(e, t) {
		let n = ia(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, ca = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", la = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = ca, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, ua = {
	version: 1,
	label: "Bilde",
	defaults: () => ({
		src: "",
		fit: "cover",
		x: .5,
		y: .5,
		opacity: 1,
		blur: 0
	}),
	migrations: {},
	render(e, t) {
		if (!t.src) return;
		let n = new Image();
		if (n.src = t.src, !n.complete) {
			e.style.visibility = "hidden";
			let t = () => {
				e.style.visibility = "";
			};
			n.addEventListener("load", t, { once: !0 }), n.addEventListener("error", t, { once: !0 });
		}
		e.style.backgroundImage = `url("${t.src}")`, t.fit === "repeat" ? (e.style.backgroundSize = "auto", e.style.backgroundRepeat = "repeat") : (e.style.backgroundSize = t.fit === "contain" ? "contain" : "cover", e.style.backgroundRepeat = "no-repeat"), e.style.backgroundPosition = `${(t.x ?? .5) * 100}% ${(t.y ?? .5) * 100}%`, e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
	}
}, da = () => ({
	duration: 600,
	delay: 0
}), fa = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: da,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: da,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: da,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	}
};
typeof window < "u" && window.addEventListener("scroll", () => {}, {
	once: !0,
	passive: !0
});
//#endregion
//#region src/App.svelte
var pa = /* @__PURE__ */ q("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), ma = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), ha = /* @__PURE__ */ q("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), ga = /* @__PURE__ */ q("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), _a = /* @__PURE__ */ q("<!> Ren visning", 1), va = /* @__PURE__ */ q("<!> Rediger", 1), ya = /* @__PURE__ */ q("<span class=\"who svelte-1n46o8q\"><!> </span>"), ba = /* @__PURE__ */ q("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), xa = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button> </button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Sa = /* @__PURE__ */ q("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Ca = /* @__PURE__ */ q("<button> </button>"), wa = /* @__PURE__ */ q("<!> <!>", 1), Ta = /* @__PURE__ */ q("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Ea = /* @__PURE__ */ q("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Da = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), Oa = /* @__PURE__ */ q("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), ka = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Aa = /* @__PURE__ */ q("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), ja = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Ma = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), Na = /* @__PURE__ */ q("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), Pa = /* @__PURE__ */ q("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Fa = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Dekkevne <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når dekkevnen er lav)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnsbilde i menyen og menypunkt-design kommer i en senere runde.</p></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button></div></details></div>"), Ia = /* @__PURE__ */ q("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), La = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), Ra = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Last opp et bilde, så beskjærer du det til et kvadratisk ikon i editoren.</p></div>"), za = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"> </button>"), Ba = /* @__PURE__ */ q("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Va = /* @__PURE__ */ q("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Ha = /* @__PURE__ */ q("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), Ua = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Wa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <!></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font og størrelse gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Ga = /* @__PURE__ */ q("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Ka = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), qa = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), Ja = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), Ya = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), Xa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tegn/emoji <span class=\"toolbar-row svelte-1n46o8q\"><!> <input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), Za = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), Qa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), $a = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), eo = /* @__PURE__ */ q("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), to = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), no = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ro = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), io = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), ao = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), oo = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), so = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), co = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), lo = /* @__PURE__ */ q("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), uo = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!>", 1), fo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), po = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), mo = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <!></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), ho = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Samling <!></label>"), go = /* @__PURE__ */ q("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), _o = /* @__PURE__ */ q("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), vo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), yo = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), bo = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), xo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), So = /* @__PURE__ */ q("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Co = /* @__PURE__ */ q("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), wo = /* @__PURE__ */ q("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), To = /* @__PURE__ */ q("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), Eo = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), Do = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), Oo = /* @__PURE__ */ q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), ko = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), Ao = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), jo = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Mo = /* @__PURE__ */ q("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), No = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Po = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), Fo = /* @__PURE__ */ q("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Io = /* @__PURE__ */ q("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Lo = /* @__PURE__ */ q("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Ro = /* @__PURE__ */ q("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), zo = /* @__PURE__ */ q("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Bo = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Vo = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), Ho = /* @__PURE__ */ q("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Uo = /* @__PURE__ */ q("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>");
function Wo(e, t) {
	Ve(t, !0);
	let n = [
		["color", aa],
		["gradient", oa],
		["glow", sa],
		["image", ua],
		["grain", la]
	], r = Object.fromEntries(n), i = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>",
		up: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20V4\"/><path d=\"M5 11l7-7 7 7\"/></svg>",
		down: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4v16\"/><path d=\"M5 13l7 7 7-7\"/></svg>",
		right: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16\"/><path d=\"M13 5l7 7-7 7\"/></svg>",
		cross: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 5l14 14\"/><path d=\"M19 5L5 19\"/></svg>"
	}, a = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], o = /* @__PURE__ */ L(en(localStorage.getItem("urd-admin-theme") ?? "graa"));
	yn(() => {
		document.documentElement.dataset.adminTheme = G(o), localStorage.setItem("urd-admin-theme", G(o));
	});
	let s = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null), l = /* @__PURE__ */ L(!1), u = /* @__PURE__ */ L(""), d = /* @__PURE__ */ L("info"), f = 0;
	function p(e, t = "info") {
		R(u, e, !0), R(d, t, !0);
		let n = ++f;
		t === "ok" && setTimeout(() => {
			f === n && (R(u, ""), R(d, "info"));
		}, 8e3);
	}
	let h = /* @__PURE__ */ L(null), g = /* @__PURE__ */ L(null), _ = /* @__PURE__ */ L(en({
		size: 16,
		snap: !0
	})), v = /* @__PURE__ */ L(!0), y = /* @__PURE__ */ L("desktop");
	yn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), yn(() => {
		let e = G(y);
		T?.sendViewport(e);
	});
	let b = /* @__PURE__ */ L(0);
	function x() {
		R(b, C?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function S(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, x(), T?.sendAttention(e.id, !0));
	}
	let C = null, w = null, T = null, E = /* @__PURE__ */ L(null);
	function ee() {
		R(E, w.data, !0), w.replace(G(E));
	}
	function te() {
		T?.sendSite(Le(G(E)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => G(E).pages.find((e) => e.id === G(c));
	function D() {
		let e = G(E)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = qt?.hasDraft() || Object.values(Jt).some((e) => e.hasDraft());
		R(l, e || C?.hasDraft() && !ne.has(G(c)) || w?.hasDraft() || gn?.hasDraft() || t || !1, !0);
	}
	let ie = [], ae = [], oe = null;
	function se() {
		return JSON.stringify({
			pageId: G(c),
			page: C.data,
			site: w.data
		});
	}
	function O(e) {
		e === oe && (e.startsWith("edit:") || e.startsWith("grid:")) || (ie.push(se()), ie.length > 50 && ie.shift(), ae.length = 0, oe = e);
	}
	function ce(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (w.replace(r), ee(), w.save(), R(_, {
			snap: !0,
			...G(E).grid
		}, !0), te(), t && t !== G(c) && G(E).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), Tt(t, { keepHistory: !0 }), D();
			return;
		}
		C.replace(n), C.save(), D(), x(), Te(), Be(C.data.sections.find((e) => e.id === G(Pe))), G(E).pages.some((e) => e.id === G(c)) ? T?.sendPage(G(c), C.data) : Tt(G(E).pages[0].id, { keepHistory: !0 });
	}
	function le() {
		ie.length && (ae.push(se()), ce(ie.pop()), oe = null, p("Angret"));
	}
	function ue() {
		ae.length && (ie.push(se()), ce(ae.pop()), oe = null, p("Gjentatt"));
	}
	function de(e) {
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.key.toLowerCase();
		if (t === "d") {
			if (e.target instanceof HTMLElement && (e.target.isContentEditable || [
				"INPUT",
				"TEXTAREA",
				"SELECT"
			].includes(e.target.tagName)) || !G(A) || G(y) === "mobile") return;
			e.preventDefault(), T?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? ue() : le());
	}
	async function fe() {
		R(s, Xi(await (await fetch("/content/site.json")).json()), !0), w = pi("urd-draft-site", () => G(s)), w.replace(Xi(w.data)), w.save(), ee(), R(_, {
			snap: !0,
			...G(E).grid
		}, !0), await Tt(new URLSearchParams(location.search).get("page") ?? G(E).pages[0].id), await kn(), await rn(), await dt(), pt(), (G(E).site.setup === !0 || G(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (R(_e, G(E).site.title, !0), R(ve, G(E).theme.tokens.color.accent, !0), R(ye, G(E).theme.tokens.color.bg, !0), R(ge, !0));
	}
	let pe = /* @__PURE__ */ L(null);
	function me({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			R(pe, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function he(e) {
		G(pe)?.resolve(e), R(pe, null);
	}
	let ge = /* @__PURE__ */ L(!1), _e = /* @__PURE__ */ L(""), ve = /* @__PURE__ */ L("#7c5cff"), ye = /* @__PURE__ */ L("#0b0e14");
	function be() {
		localStorage.setItem("urd-setup-done", "1"), R(ge, !1);
	}
	function xe() {
		let e = G(_e).trim();
		e && (Ot("setup", () => {
			G(E).site.title = e, G(E).nav.logo = {
				type: "text",
				value: e
			}, G(E).theme.tokens.color.accent = G(ve), G(E).theme.tokens.color.bg = G(ye), delete G(E).site.setup;
		}), be(), p("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let k = /* @__PURE__ */ L(null), Se = [
		[
			"Sider",
			"Blokker",
			"Egenskaper",
			"Grid"
		],
		[
			"Tema",
			"Nav",
			"Footer",
			"Samlinger",
			"Plugins"
		],
		["Historikk"]
	];
	function Ce(e) {
		R(k, G(k) === e ? null : e, !0), T?.sendShowGrid(G(k) === "Grid"), G(k) === "Historikk" && vt();
	}
	let A = /* @__PURE__ */ L(null);
	function we(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Te() {
		if (!G(A)) return;
		let { block: e } = we(G(A).sectionId, G(A).blockId);
		if (!e) {
			R(A, null);
			return;
		}
		R(A, {
			sectionId: G(A).sectionId,
			blockId: G(A).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function Ee(e) {
		if (!e.blockId) {
			R(A, null);
			return;
		}
		R(A, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), Te();
	}
	function De(e, t) {
		let { section: n, block: r } = we(G(A)?.sectionId, G(A)?.blockId);
		r && (O(e), t(r, n), S(n, "blokk-endret"), C.save(), D(), T?.sendSection(G(c), n), Te());
	}
	function j(e, t) {
		De(`edit:${G(A).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Oe(e, t) {
		Number.isFinite(t) && De(`edit:frame-${G(A).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function M(e) {
		De("decor", (t) => {
			t.decor = e;
		});
	}
	async function ke(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Oi(t);
			De(`edit:${G(A).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ki(t.name).replaceAll("-", " ");
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Ae = [
		["S", 14],
		["M", 18],
		["L", 24],
		["XL", 36]
	], je = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon"
	}, Me = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Ne = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Pe = /* @__PURE__ */ L(null), Fe = /* @__PURE__ */ L(null), Ie = /* @__PURE__ */ L(""), Re = /* @__PURE__ */ L(en([])), ze = /* @__PURE__ */ L(null);
	function Be(e) {
		R(Fe, e?.grid ? { ...e.grid } : null, !0), R(Ie, e?.size?.minHeight ?? "", !0), R(Re, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), R(ze, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Ue(e) {
		R(Pe, e.sectionId, !0), Be(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function We(e, t) {
		let n = C.data.sections.find((e) => e.id === G(Pe));
		n && (O(e), t(n), C.save(), D(), T?.sendSection(G(c), n), Be(n));
	}
	let Ge = /* @__PURE__ */ L("color");
	function Ke(e) {
		We("bg", (t) => {
			t.background ??= {
				version: 1,
				layers: []
			}, t.background.layers.push({
				type: e,
				version: 1,
				props: r[e].defaults()
			});
		});
	}
	function qe(e) {
		We("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Je(e, t) {
		let n = e + t;
		We("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function Ye(e, t, n) {
		We(`edit:bg-${G(Pe)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Xe(e, t, n) {
		We(`edit:bg-${G(Pe)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function Ze(e, t) {
		We("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: r[t].defaults()
			});
		});
	}
	async function Qe(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			Ye(e, "src", (await Oi(n)).dataUrl);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let $e = () => Object.entries(G(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function et(e) {
		return {
			type: e,
			version: fa[e].version,
			props: fa[e].defaults()
		};
	}
	function tt(e) {
		De(`edit:anim-${G(A).blockId}`, (t) => {
			t.animation = e ? et(e) : null;
		}), G(A) && T?.sendDemoAnim(G(A).sectionId, G(A).blockId);
	}
	function nt(e, t) {
		Number.isFinite(t) && (De(`edit:anim-${G(A).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), G(A) && T?.sendDemoAnim(G(A).sectionId, G(A).blockId));
	}
	function it(e) {
		We("section-anim", (t) => {
			t.animation = e ? et(e) : null;
		}), T?.sendDemoAnim(G(Pe));
	}
	function at(e, t) {
		Number.isFinite(t) && (We("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(G(Pe)));
	}
	function ot(e) {
		let t = C.data.sections.find((e) => e.id === G(Pe));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		O("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, R(Ie, r, !0), C.save(), D(), T?.sendSection(G(c), t);
	}
	function st() {
		return C.data.sections.find((e) => e.id === G(Pe)) ?? C.data.sections[0];
	}
	function ct(e) {
		let t = C.data.sections.find((e) => e.id === G(Pe));
		t && (O("grid:section"), t.grid = e ? { ...w.data.grid } : null, R(Fe, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(G(c), t), G(k) === "Grid" && T?.sendShowGrid(!0));
	}
	function lt(e, t) {
		let n = C.data.sections.find((e) => e.id === G(Pe));
		n?.grid && (O("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, R(Fe, { ...n.grid }, !0), C.save(), D(), T?.sendSection(G(c), n), G(k) === "Grid" && T?.sendShowGrid(!0));
	}
	function ut(e, t) {
		O("grid:site"), R(_, {
			...G(_),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), te(), G(k) === "Grid" && T?.sendShowGrid(!0);
	}
	async function dt() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? R(g, await e.json(), !0) : e.status !== 503 && R(g, null);
		} catch {
			R(g, null);
		}
	}
	let ft = null;
	async function pt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (ft = (await e.json()).head ?? null);
		} catch {}
	}
	async function mt(e) {
		if (!ft) return await pt(), {
			ok: await me({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: ft
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${ft}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === ft) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await me({
				title: "Noen andre har publisert",
				lines: [
					"Siden du lastet siden har noen andre publisert endringer i filer du nå skriver over:",
					...i.map((e) => `• ${e}`),
					"Publiserer du likevel, vinner dine versjoner for disse filene. Avbryt for å laste siden på nytt og se de nye endringene først."
				],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: n
		};
	}
	let ht = /* @__PURE__ */ L(null), gt = /* @__PURE__ */ L(""), _t = /* @__PURE__ */ L(!1);
	async function vt() {
		R(gt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? R(ht, (await e.json()).commits, !0) : e.status === 401 ? (R(ht, [], !0), R(gt, "Logg inn med GitHub for å se historikken.")) : (R(ht, [], !0), R(gt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			R(ht, [], !0), R(gt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let yt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), bt = !1;
	async function xt() {
		let e = G(ht)?.[0];
		if (!(!e || G(_t)) && await me({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			R(_t, !0), p("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? ft = e : pt(), bt = !0, p("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), St();
				} else t.status === 409 ? p("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : p((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				p("Kunne ikke nå publiseringslaget", "error");
			}
			R(_t, !1), vt();
		}
	}
	async function St() {
		let e = ["/content/site.json", ...G(E).pages.map((e) => `/${e.file}`)], t = async () => {
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
				p("✓ Gjenopprettet versjon er ute - laster admin på nytt …", "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		p("Angringen er lagret, men utrullingen lot vente på seg - last admin på nytt manuelt for å redigere videre", "error");
	}
	let Ct = null;
	function wt(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: ra("sec"),
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
	async function Tt(e, { keepHistory: t = !1 } = {}) {
		R(c, e, !0), Ct = (async () => {
			let n = re(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Zi(await e.json(), w.data));
			} catch {}
			r ? ne.delete(e) : r = wt(n), C = pi(`urd-draft-${e}`, () => r), C.replace(Zi(C.data, w.data)), C.save(), t || (oe = null), R(Pe, null), R(Fe, null), D(), x(), R(u, "");
		})(), await Ct;
	}
	function I() {
		T?.destroy(), T = zi(G(h), {
			onEdit: Jn,
			onMove: Yn,
			onGrow: Xn,
			onDelete: or,
			onAddSection: tr,
			onMoveSection: nr,
			onDeleteSection: rr,
			onSectionSize: ir,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: Ue,
			onSelectBlock: Ee,
			onReady: Et,
			onNavigate: Dt,
			onAddBlock: (e) => ur(e.sectionId, e.block),
			onAddBlocks: (e) => dr(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: hr,
			onMoveBlockSection: ar,
			onMobileManual: Zn,
			onMobileAuto: Qn,
			onReviewDone: $n,
			onBlockFlag: er,
			onCollectionEdit: cn,
			onPluginBlocks: (e) => {
				R(pr, e.blocks ?? [], !0);
			}
		});
	}
	async function Et() {
		await Ct, await vn, T?.sendPlugins(Le(G(bn))?.enabled ?? []), T?.sendViewport(G(y)), on(), w.hasDraft() && te();
		let e = !G(s).pages.some((e) => e.id === G(c));
		(C.hasDraft() || e) && T?.sendPage(G(c), C.data), G(v) || T?.sendChrome(!1), G(k) === "Grid" && T?.sendShowGrid(!0);
	}
	function Dt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = G(E).pages.find((e) => e.path === t);
		n && n.id !== G(c) && Tt(n.id);
	}
	function Ot(e, t) {
		O(e), t(), w.save(), D(), te();
	}
	let kt = /* @__PURE__ */ L(""), At = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function jt(e, t = null) {
		return e ? At.includes(e) ? `«${e}» er et reservert navn` : G(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Mt() {
		let e = G(kt).trim(), t = ki(e), n = jt(t);
		if (n) {
			p(n, "error");
			return;
		}
		Ot("pages", () => {
			G(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), G(E).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(wt({
			id: t,
			title: e
		}))), D(), R(kt, ""), Tt(t);
	}
	function Nt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		Ot("pages", () => {
			e.title = n;
			for (let t of G(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === G(c) ? (C.data.meta.title = n, C.save(), D(), T?.sendPage(G(c), C.data)) : Pt(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Pt(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Zi(await t.json(), w.data));
		} catch {}
		r ||= wt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function Ft(e, t) {
		let n = ki(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = jt(n, e.id);
		if (r) {
			p(r, "error");
			return;
		}
		Ot("pages", () => {
			e.path = `/${n}`;
		});
	}
	function It(e) {
		e.path !== "/" && (Ot("pages", () => {
			G(E).pages = G(E).pages.filter((t) => t.id !== e.id), G(E).nav.items = G(E).nav.items.filter((t) => t.page !== e.id);
		}), e.id === G(c) && Tt(G(E).pages[0].id), p("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Lt(e) {
		Ot("edit:nav-logo", () => {
			G(E).nav.logo = {
				type: "text",
				value: "",
				...G(E).nav.logo,
				...e
			};
		});
	}
	function Rt(e) {
		Ot("nav", () => {
			G(E).nav.logo ??= {
				type: "text",
				value: G(E).site.title
			};
			let t = G(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = G(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = G(E).site.title), delete t.image), t.type = e;
		});
	}
	async function zt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Oi(t);
			Ot("nav", () => {
				let t = G(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Bt = /* @__PURE__ */ L(null);
	function Vt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			R(Bt, String(n.result), !0);
		}, n.onerror = () => p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function Ht(e) {
		Ot("edit:site-icon", () => {
			G(E).site.icon = e;
		}), R(Bt, null);
	}
	function Ut() {
		Ot("edit:site-icon", () => {
			delete G(E).site.icon;
		});
	}
	let Wt = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	yn(() => {
		if (!G(E)?.site) return;
		let e = G(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			Wt.test(e) && (t.href = e);
		}
	});
	function Gt(e) {
		Ot("nav", () => {
			G(E).nav.layout = e;
		});
	}
	function Kt(e, t) {
		Ot(`edit:nav-style-${e}`, () => {
			G(E).nav.style ??= {}, G(E).nav.style[e] = t;
		});
	}
	let qt = null, Jt = {}, Yt = /* @__PURE__ */ L(en([])), Xt = /* @__PURE__ */ L(en({})), Zt = /* @__PURE__ */ L(null), Qt = /* @__PURE__ */ L(""), $t = /* @__PURE__ */ L("news"), nn = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function rn() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		qt = pi("urd-draft-samlinger", () => e), R(Yt, [...qt.data.samlinger ?? []], !0);
		for (let e of G(Yt)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			t ??= {
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}, Jt[e] = pi(`urd-draft-samling-${e}`, () => t);
		}
		an();
	}
	function an(e = !0) {
		let t = {};
		for (let e of G(Yt)) Jt[e] && (t[e] = JSON.parse(JSON.stringify(Jt[e].data)));
		R(Xt, t, !0), e && on();
	}
	function on() {
		T?.sendCollections(Le(G(Xt)) ?? {});
	}
	function sn(e, t, n = !0) {
		let r = Jt[e];
		r && (t(r.data), r.save(), D(), an(n));
	}
	function cn(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || sn(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function ln() {
		let e = G(Qt).trim();
		if (!e) return;
		let t = ki(e);
		if (!t || G(Yt).includes(t)) {
			p(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: G($t),
			entries: []
		};
		Jt[t] = pi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), Jt[t].replace(n), Jt[t].save(), qt.data.samlinger = [...G(Yt), t], qt.save(), R(Yt, [...G(Yt), t], !0), R(Zt, t, !0), R(Qt, ""), D(), an();
	}
	function un(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete Jt[e], qt.data.samlinger = G(Yt).filter((t) => t !== e), qt.save(), R(Yt, G(Yt).filter((t) => t !== e), !0), G(Zt) === e && R(Zt, null), D(), an();
	}
	function dn(e) {
		sn(e, (e) => {
			e.entries.unshift({
				id: ra("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function fn(e, t, n, r) {
		sn(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function pn(e, t, n) {
		sn(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function mn(e, t) {
		sn(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function hn(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && fn(e, t, "image", (await Oi(r)).dataUrl);
	}
	let gn = null, _n, vn = new Promise((e) => {
		_n = e;
	}), bn = /* @__PURE__ */ L(null), xn = en({}), Sn = /* @__PURE__ */ L("0.0.0"), Cn = /* @__PURE__ */ L(""), wn = /* @__PURE__ */ L(""), Tn = /* @__PURE__ */ L(en([])), En = /* @__PURE__ */ L("pending"), Dn = () => [.../* @__PURE__ */ new Set([...G(bn)?.enabled ?? [], ...G(bn)?.disabled ?? []])];
	function On() {
		R(bn, JSON.parse(JSON.stringify(gn.data)), !0);
	}
	async function kn() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		gn = pi("urd-draft-plugins", () => e), On();
		try {
			R(Sn, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Dn()) Mn(e);
		An(), _n(), T?.sendPlugins(Le(G(bn))?.enabled ?? []);
	}
	async function An() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				jn();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), R(Tn, (t ?? []).filter((e) => !Dn().includes(e)), !0);
			for (let e of G(Tn)) Mn(e);
			R(En, "ok");
		} catch {
			jn();
		}
	}
	function jn() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				R(Tn, e.filter((e) => !Dn().includes(e)), !0);
				for (let e of G(Tn)) Mn(e);
				R(En, "ok");
				return;
			}
		} catch {}
		R(En, "unavailable");
	}
	async function Mn(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = na(t);
			xn[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ea(G(Sn), t.requiresEngine)
			};
		} catch {
			xn[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Nn(e, t) {
		let n = gn.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), gn.save(), D(), On(), Pn();
	}
	function Pn() {
		G(h) && (G(h).src = G(h).src);
	}
	function Fn(e) {
		let t = gn.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), gn.save(), D(), On(), Pn();
	}
	async function In() {
		R(wn, "");
		let e = G(Cn).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			R(wn, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (Dn().includes(e)) {
			R(wn, "Pluginen står allerede i listen");
			return;
		}
		if (await Mn(e), xn[e].errors.length) {
			R(wn, `Fant ingen gyldig plugin: ${xn[e].errors.join("; ")}`);
			return;
		}
		Nn(e, !0), R(Cn, "");
	}
	function Ln(e) {
		R(Tn, G(Tn).filter((t) => t !== e), !0), Nn(e, !0);
	}
	function Rn(e, t) {
		Ot(e, () => {
			G(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(G(E).footer);
		});
	}
	function zn(e, t) {
		Ot(`edit:nav-label-${e}`, () => {
			G(E).nav.items[e].label = t;
		});
	}
	function Bn(e, t) {
		Ot("nav", () => {
			let n = G(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function Vn(e, t) {
		Ot(`edit:nav-href-${e}`, () => {
			G(E).nav.items[e].href = t;
		});
	}
	function U(e, t) {
		let n = e + t, r = G(E).nav.items;
		n < 0 || n >= r.length || Ot("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Hn(e) {
		Ot("nav", () => {
			G(E).nav.items.splice(e, 1);
		});
	}
	function Un() {
		Ot("nav", () => {
			G(E).nav.items.push({
				label: "Lenke",
				page: G(E).pages[0].id
			});
		});
	}
	let W = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function Wn(e, t) {
		Ot(`edit:theme-color-${e}`, () => {
			G(E).theme.tokens.color[e] = t;
		});
	}
	function Gn(e, t) {
		Ot("theme", () => {
			G(E).theme.tokens.font[e] = t;
		});
	}
	function Kn(e, t) {
		Ot("theme", () => {
			G(E).theme.tokens.radius[e] = t;
		});
	}
	function qn() {
		R(v, !G(v)), T?.sendChrome(G(v));
	}
	function Jn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (O(`edit:${e.blockId}`), n.props = e.props, C.save(), D(), G(A)?.blockId === e.blockId && Te(), e.rerender && T?.sendSection(G(c), t), R(u, ""));
	}
	function Yn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		O(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && S(t, "desktop-endret-etter-mobil"), C.save(), D(), G(A)?.blockId === e.blockId && Te();
	}
	function Xn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (O(`edit:${e.blockId}`), t.frames.desktop.h = e.h, C.save(), D(), G(A)?.blockId === e.blockId && Te());
	}
	function Zn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			O("mobile-manual");
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
			}, C.save(), D();
		}
	}
	function Qn(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			O("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, C.save(), D(), x(), T?.sendSection(G(c), t);
		}
	}
	function $n(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (O("review-done"), t.responsive.mobile.attention = null, C.save(), D(), x());
	}
	function er(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (O("decor"), t.decor = e.decor, C.save(), D(), G(A)?.blockId === e.blockId && Te());
	}
	function tr(e) {
		O("add-section"), e.section.id || (e.section.id = ra("sec")), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(G(c), C.data), R(Pe, e.section.id, !0), Be(e.section), G(k) !== "Egenskaper" && (R(k, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function nr(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (O("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(G(c), C.data));
	}
	function rr(e) {
		O("delete-section"), e.sectionId === G(Pe) && (R(Pe, null), R(Fe, null)), G(A)?.sectionId === e.sectionId && R(A, null), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(G(c), C.data);
	}
	function ir(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (O("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === G(Pe) && R(Ie, e.minHeight, !0), C.save(), D());
	}
	function ar(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (O("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), S(t, "blokk-flyttet"), S(n, "blokk-flyttet"), C.save(), D(), x(), T?.sendPage(G(c), C.data), G(A)?.blockId === e.blockId && (R(A, {
			...G(A),
			sectionId: e.toSectionId
		}, !0), Te()));
	}
	function or(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (O("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), G(A)?.blockId === e.blockId && R(A, null), S(t, "blokk-slettet"), C.save(), D(), T?.sendSection(G(c), t));
	}
	let sr = {
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
				href: null,
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
		icon: {
			type: "icon",
			decor: !0,
			props: {
				glyph: "★",
				color: "accent",
				size: 48
			},
			w: 8,
			h: 64
		},
		samling: {
			type: "samling",
			props: {
				collection: null,
				view: "cards",
				limit: 6,
				newestFirst: !0
			},
			w: 90,
			h: 200
		}
	};
	function cr(e) {
		let t = sr[e];
		return t ? {
			id: ra("blk"),
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
		} : null;
	}
	function lr(e) {
		T ? T.sendPlaceBlock(e) : ur(st()?.id, e);
	}
	function ur(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		if (!n) return;
		O("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), S(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(G(c), n);
	}
	function dr(e, t, n, r) {
		let i = C.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		O("add-blocks");
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
		}), S(i, "blokk-lagt-til"), C.save(), D(), T?.sendSection(G(c), i);
	}
	function fr(e) {
		lr(cr(e));
	}
	let pr = /* @__PURE__ */ L(en([]));
	function mr(e, t = {}) {
		lr({
			id: ra("blk"),
			type: e.type,
			version: e.version ?? 1,
			decor: !1,
			props: {
				...structuredClone(e.defaults ?? {}),
				...structuredClone(t)
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
	function hr(e) {
		let t = cr(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, ur(e.sectionId, t), e.kind === "image" && p("Bildeblokk lagt til - velg bildet i Egenskaper"));
	}
	async function gr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		p("Komprimerer bildet…");
		let n;
		try {
			n = await Oi(t);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (G(h)?.clientWidth ?? 1280));
		lr({
			id: ra("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ki(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? p(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : p("");
	}
	function vr(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${ki(n || "bilde")}-${Ai(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function br(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) e.type === "image" && vr(e.props, "src", "bakgrunn", t);
			for (let e of n.blocks) e.type === "image" && vr(e.props, "src", e.props.alt, t), e.type === "icon" && vr(e.props, "image", "ikon", t);
		}
		return t;
	}
	function xr(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && vr(n, "value", "logo", t), n?.type === "both" && vr(n, "image", "logo", t), vr(e.site, "icon", "ikon", t), t;
	}
	let Sr = /* @__PURE__ */ L(!1);
	function Cr() {
		if (!G(Sr)) {
			R(Sr, !0);
			return;
		}
		R(Sr, !1), wr();
	}
	yn(() => {
		if (!G(Sr)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || R(Sr, !1);
		}, t = (e) => {
			e.key === "Escape" && R(Sr, !1);
		}, n = () => R(Sr, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function wr() {
		O("discard");
		for (let e of G(E).pages) e.id !== G(c) && !ne.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = C.reset();
		if (w.reset(), gn && (gn.reset(), On()), qt) {
			qt.reset(), R(Yt, [...qt.data.samlinger ?? []], !0);
			for (let e of Object.keys(Jt)) G(Yt).includes(e) ? Jt[e].reset() : delete Jt[e];
			an();
		}
		ee(), R(_, {
			snap: !0,
			...G(E).grid
		}, !0), D(), R(u, ""), te(), G(E).pages.some((e) => e.id === G(c)) ? T?.sendPage(G(c), e) : Tt(G(E).pages[0].id);
	}
	async function Tr() {
		if (bt) {
			p("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		p("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of G(E).pages) {
			let a = `urd-draft-${i.id}`, o = ne.has(i.id) || !G(s).pages.some((e) => e.id === i.id), l = null;
			if (i.id === G(c) && (C.hasDraft() || o)) l = C.data;
			else if (i.id !== G(c)) {
				let e = localStorage.getItem(a);
				if (e) try {
					l = Zi(JSON.parse(e), w.data);
				} catch {}
			}
			if (!l && o && (l = wt(i)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...br(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(G(E)));
			e.push(...xr(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(G(s).theme, G(E).theme) || t.push("tema"), i(G(s).nav, G(E).nav) || t.push("menyen"), i(G(s).footer, G(E).footer) || t.push("footeren"), i(G(s).pages, G(E).pages) || t.push("sideregisteret"), i(G(s).grid, G(E).grid) || t.push("gridet"), (G(s).site.icon ?? null) !== (G(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = G(s).site, { icon: c, ...l } = G(E).site;
			i(o, l) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Jt).filter(([, e]) => e.hasDraft());
		if (i.length || qt?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) vr(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (qt?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(qt.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!G(Yt).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		gn?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(gn.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of G(E).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		let a = new Set(e.map((e) => e.path)), o = (t) => {
			a.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of G(s).pages) {
			let t = G(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let l = await mt(e);
		if (!l.ok) {
			p("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let u = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...l.head ? { expect: l.head } : {}
		}, d = null;
		try {
			d = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(u)
			});
		} catch {}
		if (d?.ok) {
			let { sha: e } = await d.json().catch(() => ({}));
			e ? ft = e : pt(), br(C.data), xr(G(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			if (R(s, JSON.parse(JSON.stringify(G(E))), !0), w = pi("urd-draft-site", () => G(s)), ee(), gn) {
				let e = JSON.parse(JSON.stringify(gn.data));
				gn = pi("urd-draft-plugins", () => e), On();
			}
			if (qt) {
				for (let e of Object.values(Jt)) for (let t of e.data.entries) vr(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(qt.data));
				qt = pi("urd-draft-samlinger", () => e);
				for (let e of G(Yt)) {
					if (!Jt[e]) continue;
					let t = JSON.parse(JSON.stringify(Jt[e].data));
					Jt[e] = pi(`urd-draft-samling-${e}`, () => t);
				}
				an();
			}
			R(_, {
				snap: !0,
				...G(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = pi(`urd-draft-${G(c)}`, () => t), ne.has(G(c)) && localStorage.setItem(`urd-draft-${G(c)}`, JSON.stringify(t)), D(), p("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (d?.status === 401) {
			let e = (await d.json().catch(() => null))?.error;
			p(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await dt();
		} else d?.status === 403 ? p((await d.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : d?.status === 409 ? p("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : p(d ? (await d.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var Er = Uo();
	yr("keydown", tn, de);
	var q = z(Er), Dr = (e) => {
		var t = pa();
		Wr(z(t), () => i.pencil), P(), N(t), K("click", t, qn), J(e, t);
	};
	X(q, (e) => {
		G(v) || e(Dr);
	});
	var kr = V(q, 2);
	let Ar;
	var jr = z(kr), Mr = V(z(jr), 2);
	Ui(Mr, {
		get value() {
			return G(o);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return a;
		},
		onchange: (e) => R(o, e, !0)
	});
	var Nr = V(Mr, 2), Fr = (e) => {
		var t = ma(), n = B(t), r = z(n, !0);
		N(n);
		var a = V(n, 2), o = z(a);
		let s;
		Wr(o, () => i.desktop, !0), N(o);
		var c = V(o, 2);
		let l;
		Wr(c, () => i.phone, !0), N(c), N(a), H((e) => {
			Y(r, e), s = Xr(o, 1, "ghost svelte-1n46o8q", null, s, { active: G(y) === "desktop" }), l = Xr(c, 1, "ghost svelte-1n46o8q", null, l, { active: G(y) === "mobile" });
		}, [() => re()?.title ?? ""]), K("click", n, () => Ce("Sider")), K("click", o, () => R(y, "desktop")), K("click", c, () => R(y, "mobile")), J(e, t);
	};
	X(Nr, (e) => {
		G(s) && e(Fr);
	});
	var Ir = V(Nr, 2), Lr = (e) => {
		var t = ha(), n = z(t);
		Wr(n, () => i.phone);
		var r = V(n);
		N(t), H(() => Y(r, ` ${G(b) ?? ""} ${G(b) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), K("click", t, () => R(y, "mobile")), J(e, t);
	};
	X(Ir, (e) => {
		G(b) > 0 && e(Lr);
	});
	var zr = V(Ir, 2), Br = (e) => {
		J(e, ga());
	};
	X(zr, (e) => {
		G(l) && e(Br);
	}), N(jr);
	var Vr = V(jr, 2), Hr = z(Vr), Ur = (e) => {
		var t = xa(), n = B(t), r = z(n), a = (e) => {
			var t = _a();
			Wr(B(t), () => i.eye), P(), J(e, t);
		}, o = (e) => {
			var t = va();
			Wr(B(t), () => i.pencil), P(), J(e, t);
		};
		X(r, (e) => {
			G(v) ? e(a) : e(o, -1);
		}), N(n);
		var s = V(n, 2), c = (e) => {
			var t = ya(), n = z(t), r = (e) => {
				var t = Or();
				Wr(B(t), () => i.warn), J(e, t);
			};
			X(n, (e) => {
				G(g).allowed || e(r);
			});
			var a = V(n, 1, !0);
			N(t), H(() => {
				$(t, "title", G(g).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), Y(a, G(g).login);
			}), J(e, t);
		}, u = (e) => {
			J(e, ba());
		};
		X(s, (e) => {
			G(g)?.loggedIn ? e(c) : G(g) && e(u, 1);
		});
		var d = V(s, 2), f = V(d, 2);
		let p;
		var m = z(f, !0);
		N(f);
		var h = V(f, 2);
		H((e) => {
			$(n, "title", G(v) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), $(d, "href", e), p = Xr(f, 1, "ghost discard-btn svelte-1n46o8q", null, p, { armed: G(Sr) }), f.disabled = !G(l), $(f, "title", G(Sr) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), Y(m, G(Sr) ? "Sikker?" : "Forkast utkast"), h.disabled = !G(l);
		}, [() => re()?.path ?? "/"]), K("click", n, qn), K("click", f, Cr), K("click", h, Tr), J(e, t);
	};
	X(Hr, (e) => {
		G(s) && e(Ur);
	}), N(Vr), N(kr);
	var Gr = V(kr, 2), Kr = (e) => {
		var t = Lo(), r = z(t), a = (e) => {
			var t = Io(), r = B(t);
			Rr(r, 21, () => Se, Pr, (e, t, n) => {
				var r = wa(), i = B(r), a = (e) => {
					J(e, Sa());
				};
				X(i, (e) => {
					n > 0 && e(a);
				}), Rr(V(i, 2), 16, () => G(t), (e) => e, (e, t) => {
					var n = Ca();
					let r;
					var i = z(n, !0);
					N(n), H(() => {
						r = Xr(n, 1, "svelte-1n46o8q", null, r, { active: G(k) === t }), Y(i, t);
					}), K("click", n, () => Ce(t)), J(e, n);
				}), J(e, r);
			}), N(r);
			var a = V(r, 2), o = (e) => {
				var t = Fo(), r = z(t), a = z(r, !0);
				N(r);
				var o = V(r, 2), s = (e) => {
					var t = ka(), n = V(z(t), 2);
					Rr(n, 17, () => G(E).pages, (e) => e.id, (e, t) => {
						var n = Oa();
						let r;
						var a = z(n);
						Z(a);
						var o = V(a, 2), s = (e) => {
							J(e, Ta());
						}, l = (e) => {
							var n = Ea();
							Z(n), H((e) => Q(n, e), [() => G(t).path.slice(1)]), K("change", n, (e) => Ft(G(t), e.target.value)), J(e, n);
						};
						X(o, (e) => {
							G(t).path === "/" ? e(s) : e(l, -1);
						});
						var u = V(o, 2), d = z(u);
						Wr(d, () => i.right, !0), N(d);
						var f = V(d, 2), p = (e) => {
							var n = Da();
							Wr(n, () => i.cross, !0), N(n), K("click", n, () => It(G(t))), J(e, n);
						};
						X(f, (e) => {
							G(t).path !== "/" && e(p);
						}), N(u), N(n), H(() => {
							r = Xr(n, 1, "page-row svelte-1n46o8q", null, r, { current: G(t).id === G(c) }), Q(a, G(t).title), d.disabled = G(t).id === G(c);
						}), K("change", a, (e) => Nt(G(t), e.target.value)), K("click", d, () => Tt(G(t).id)), J(e, n);
					});
					var r = V(n, 4);
					Z(r);
					var a = V(r, 2);
					P(2), N(t), H((e) => a.disabled = e, [() => !G(kt).trim()]), K("keydown", r, (e) => e.key === "Enter" && Mt()), si(r, () => G(kt), (e) => R(kt, e)), K("click", a, Mt), J(e, t);
				}, l = (e) => {
					var t = Fa(), n = V(z(t), 2), r = V(z(n), 2), a = z(r), o = V(z(a));
					{
						let e = /* @__PURE__ */ F(() => G(E).nav.logo?.type ?? "text");
						Ui(o, {
							get value() {
								return G(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => Rt(e)
						});
					}
					N(a);
					var s = V(a, 2), c = (e) => {
						var t = Aa(), n = B(t);
						Z(n);
						var r = V(n, 2), i = z(r);
						{
							let e = /* @__PURE__ */ F(() => G(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ F(() => [["", "Arv"], ...W.map(([e, t]) => [t, e])]);
							Ui(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => Lt({ font: e || void 0 })
							});
						}
						var a = V(i, 2);
						Z(a);
						var o = V(a, 2);
						let s;
						var c = V(o, 2);
						let l;
						N(r), H((e) => {
							Q(n, G(E).nav.logo?.value ?? ""), Q(a, G(E).nav.logo?.textSize ?? ""), s = Xr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: G(E).nav.logo?.bold !== !1 }), l = Xr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!G(E).nav.logo?.italic })]), K("input", n, (e) => Lt({ value: e.target.value })), K("change", a, (e) => Lt({ textSize: e.target.value ? Number(e.target.value) : void 0 })), K("click", o, () => Lt({ bold: G(E).nav.logo?.bold === !1 })), K("click", c, () => Lt({ italic: !G(E).nav.logo?.italic })), J(e, t);
					};
					X(s, (e) => {
						(G(E).nav.logo?.type ?? "text") !== "image" && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = ja(), n = B(t), r = z(n), i = z(r), a = V(i);
						N(r);
						var o = V(r, 2);
						Z(o);
						var s = V(o, 2);
						Z(s), N(n), P(2), H(() => {
							Y(i, `${(G(E).nav.logo?.type === "image" ? G(E).nav.logo?.value : G(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Q(o, G(E).nav.logo?.size ?? 32), Q(s, G(E).nav.logo?.radius ?? 0);
						}), K("change", a, zt), K("change", o, (e) => Lt({ size: Number(e.target.value) })), K("change", s, (e) => Lt({ radius: Number(e.target.value) })), J(e, t);
					};
					X(l, (e) => {
						(G(E).nav.logo?.type ?? "text") !== "text" && e(u);
					});
					var d = V(l, 2), f = (e) => {
						var t = Ma(), n = V(z(t));
						{
							let e = /* @__PURE__ */ F(() => G(E).nav.logo?.order ?? "image-first");
							Ui(n, {
								get value() {
									return G(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => Lt({ order: e })
							});
						}
						N(t), J(e, t);
					};
					X(d, (e) => {
						G(E).nav.logo?.type === "both" && e(f);
					}), P(2), N(r), N(n);
					var p = V(n, 2), m = V(z(p), 2), h = z(m), g = V(z(h));
					{
						let e = /* @__PURE__ */ F(() => G(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ F($e);
						wi(g, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => Kt("bg", e)
						});
					}
					N(h);
					var _ = V(h, 2), v = V(z(_)), y = z(v);
					N(v), N(_);
					var b = V(_, 2);
					Z(b);
					var x = V(b, 2), S = z(x);
					Z(S), P(), N(x);
					var C = V(x, 2), w = V(z(C));
					{
						let e = /* @__PURE__ */ F(() => G(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ F($e);
						wi(w, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Kt("textColor", e)
						});
					}
					N(C);
					var T = V(C, 2), ee = V(z(T));
					{
						let e = /* @__PURE__ */ F(() => G(E).nav.layout ?? "right");
						Ui(ee, {
							get value() {
								return G(e);
							},
							options: [
								["right", "Høyre"],
								["center", "Midtstilt"],
								["left", "Venstre (etter logoen)"]
							],
							onchange: (e) => Gt(e)
						});
					}
					N(T);
					var te = V(T, 2), ne = z(te);
					Z(ne), P(), N(te), P(2), N(m), N(p);
					var re = V(p, 2), D = V(z(re), 2), ie = z(D);
					Rr(ie, 17, () => G(E).nav.items, Pr, (e, t, n) => {
						var r = Pa(), a = z(r);
						Z(a);
						var o = V(a, 2), s = z(o);
						s.disabled = n === 0, Wr(s, () => i.up, !0), N(s);
						var c = V(s, 2);
						Wr(c, () => i.down, !0), N(c);
						var l = V(c, 2);
						Wr(l, () => i.cross, !0), N(l), N(o);
						var u = V(o, 2), d = z(u);
						{
							let e = /* @__PURE__ */ F(() => G(t).page ?? "__href"), r = /* @__PURE__ */ F(() => [...G(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
							Ui(d, {
								get value() {
									return G(e);
								},
								title: "Hvor lenken går",
								get options() {
									return G(r);
								},
								onchange: (e) => Bn(n, e)
							});
						}
						N(u);
						var f = V(u, 2), p = (e) => {
							var r = Na();
							Z(r), H(() => Q(r, G(t).href ?? "")), K("change", r, (e) => Vn(n, e.target.value)), J(e, r);
						};
						X(f, (e) => {
							G(t).page || e(p);
						}), N(r), H(() => {
							Q(a, G(t).label), c.disabled = n === G(E).nav.items.length - 1;
						}), K("input", a, (e) => zn(n, e.target.value)), K("click", s, () => U(n, -1)), K("click", c, () => U(n, 1)), K("click", l, () => Hn(n)), J(e, r);
					});
					var ae = V(ie, 2);
					N(D), N(re), N(t), H((e) => {
						Y(y, `${e ?? ""}%`), Q(b, G(E).nav.style?.bgOpacity ?? .85), ri(S, G(E).nav.style?.blur !== !1), ri(ne, G(E).nav.sticky !== !1);
					}, [() => Math.round((G(E).nav.style?.bgOpacity ?? .85) * 100)]), K("input", b, (e) => Kt("bgOpacity", Number(e.target.value))), K("change", S, (e) => Kt("blur", e.target.checked)), K("change", ne, (e) => Ot("nav", () => {
						G(E).nav.sticky = e.target.checked;
					})), K("click", ae, Un), J(e, t);
				}, u = (e) => {
					var t = Ra(), n = V(z(t), 2);
					wi(V(z(n)), {
						get value() {
							return G(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => Wn("bg", e)
					}), N(n);
					var r = V(n, 2);
					wi(V(z(r)), {
						get value() {
							return G(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => Wn("surface", e)
					}), N(r);
					var a = V(r, 2);
					wi(V(z(a)), {
						get value() {
							return G(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => Wn("text", e)
					}), N(a);
					var o = V(a, 2);
					wi(V(z(o)), {
						get value() {
							return G(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => Wn("accent", e)
					}), N(o);
					var s = V(o, 4), c = V(z(s));
					{
						let e = /* @__PURE__ */ F(() => [...W.some(([, e]) => e === G(E).theme.tokens.font.heading) ? [] : [[G(E).theme.tokens.font.heading, "Egendefinert"]], ...W.map(([e, t]) => [t, e])]);
						Ui(c, {
							get value() {
								return G(E).theme.tokens.font.heading;
							},
							get options() {
								return G(e);
							},
							onchange: (e) => Gn("heading", e)
						});
					}
					N(s);
					var l = V(s, 2), u = V(z(l));
					{
						let e = /* @__PURE__ */ F(() => [...W.some(([, e]) => e === G(E).theme.tokens.font.body) ? [] : [[G(E).theme.tokens.font.body, "Egendefinert"]], ...W.map(([e, t]) => [t, e])]);
						Ui(u, {
							get value() {
								return G(E).theme.tokens.font.body;
							},
							get options() {
								return G(e);
							},
							onchange: (e) => Gn("body", e)
						});
					}
					N(l);
					var d = V(l, 4), f = V(z(d));
					Z(f), N(d);
					var p = V(d, 2), m = V(z(p));
					Z(m), N(p);
					var h = V(p, 4), g = V(z(h)), _ = (e) => {
						var t = Ia();
						H(() => $(t, "src", G(E).site.icon)), J(e, t);
					};
					X(g, (e) => {
						G(E).site.icon && e(_);
					}), N(h);
					var v = V(h, 2), y = z(v), b = z(y), x = V(b);
					N(y);
					var S = V(y, 2), C = (e) => {
						var t = La(), n = B(t);
						Wr(n, () => i.pencil ?? "✎", !0), N(n);
						var r = V(n, 2);
						Wr(r, () => i.cross, !0), N(r), K("click", n, () => R(Bt, G(E).site.icon, !0)), K("click", r, Ut), J(e, t);
					};
					X(S, (e) => {
						G(E).site.icon && e(C);
					}), N(v), P(2), N(t), H(() => {
						Q(f, G(E).theme.tokens.radius.sm), Q(m, G(E).theme.tokens.radius.md), Y(b, `${G(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), K("change", f, (e) => Kn("sm", e.target.value)), K("change", m, (e) => Kn("md", e.target.value)), K("change", x, Vt), J(e, t);
				}, d = (e) => {
					var t = Ha();
					let n;
					var r = V(z(t), 2), i = V(z(r), 2), a = z(i), o = V(a, 2);
					N(i), N(r);
					var s = V(r, 2), c = V(s, 2), l = V(z(c));
					N(c);
					var u = V(c, 2), d = V(u, 2), f = V(d, 2), p = V(f, 2), m = V(z(p), 2), h = z(m), g = V(h, 2), _ = V(g, 2), v = V(_, 2), b = V(v, 2);
					N(m), N(p);
					var x = V(p, 2), S = (e) => {
						var t = Va(), n = V(z(t), 2);
						Rr(n, 21, () => G(pr), (e) => e.type, (e, t) => {
							var n = Or(), r = B(n), i = (e) => {
								var n = Ba(), r = z(n), i = z(r, !0);
								N(r);
								var a = V(r, 2);
								Rr(a, 21, () => G(t).variants, (e) => e.label, (e, n) => {
									var r = za(), i = z(r, !0);
									N(r), H(() => {
										$(r, "title", `Fra pluginen ${G(t).plugin ?? ""}`), Y(i, G(n).label);
									}), K("click", r, () => mr(G(t), G(n).props)), J(e, r);
								}), N(a), N(n), H(() => Y(i, G(t).label)), J(e, n);
							}, a = (e) => {
								var n = za(), r = z(n, !0);
								N(n), H(() => {
									$(n, "title", `Fra pluginen ${G(t).plugin ?? ""}`), Y(r, G(t).label);
								}), K("click", n, () => mr(G(t))), J(e, n);
							};
							X(r, (e) => {
								G(t).variants?.length ? e(i) : e(a, -1);
							}), J(e, n);
						}), N(n), N(t), J(e, t);
					};
					X(x, (e) => {
						G(pr).length && e(S);
					}), N(t), H(() => {
						n = Xr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: G(y) === "mobile" }), $(t, "title", G(y) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), K("click", a, () => fr("text")), K("click", o, () => fr("text-box")), K("click", s, () => fr("button")), K("change", l, gr), K("click", u, () => fr("video")), K("click", d, () => fr("icon")), K("click", f, () => fr("samling")), K("click", h, () => fr("shape-line")), K("click", g, () => fr("shape-arrow")), K("click", _, () => fr("shape-circle")), K("click", v, () => fr("shape-rect")), K("click", b, () => fr("shape-triangle")), J(e, t);
				}, f = (e) => {
					var t = Ua(), n = V(z(t), 2), r = V(z(n)), i = z(r);
					N(r), N(n);
					var a = V(n, 2);
					Z(a);
					var o = V(a, 2), s = z(o);
					Z(s), P(), N(o), P(2), N(t), H(() => {
						Y(i, `${G(_).size ?? ""} px`), Q(a, G(_).size), ri(s, G(_).snap !== !1);
					}), K("input", a, (e) => ut("size", Number(e.target.value))), K("change", s, (e) => ut("snap", e.target.checked)), J(e, t);
				}, p = (e) => {
					var t = po(), r = z(t), a = (e) => {
						var t = to(), n = B(t), r = z(n);
						N(n);
						var i = V(n, 2), a = (e) => {
							var t = Wa(), n = B(t), r = V(z(n));
							{
								let e = /* @__PURE__ */ F(() => G(A).props.align ?? "left");
								Ui(r, {
									get value() {
										return G(e);
									},
									options: [
										["left", "Venstre"],
										["center", "Midtstilt"],
										["right", "Høyre"]
									],
									onchange: (e) => j("align", e)
								});
							}
							N(n);
							var i = V(n, 2), a = z(i);
							Z(a), P(), N(i);
							var o = V(i, 2), s = V(z(o));
							{
								let e = /* @__PURE__ */ F(() => G(A).props.font ?? ""), t = /* @__PURE__ */ F(() => [["", "Arv fra tema"], ...W.map(([e, t]) => [t, e])]);
								Ui(s, {
									get value() {
										return G(e);
									},
									get options() {
										return G(t);
									},
									onchange: (e) => j("font", e || null)
								});
							}
							N(o);
							var c = V(o, 4), l = z(c);
							let u;
							var d = V(l, 2);
							Rr(d, 17, () => Ae, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ F(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Ca();
								let o;
								var s = z(a, !0);
								N(a), H(() => {
									o = Xr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: G(A).props.size === i() }), $(a, "title", `${i() ?? ""} px`), Y(s, r());
								}), K("click", a, () => j("size", i())), J(e, a);
							});
							var f = V(d, 2);
							Z(f), N(c), P(2), H((e) => {
								ri(a, e), u = Xr(l, 1, "tbtn svelte-1n46o8q", null, u, { active: !G(A).props.size }), Q(f, G(A).props.size ?? "");
							}, [() => !!G(A).props.box]), K("change", a, (e) => j("box", e.target.checked)), K("click", l, () => j("size", null)), K("change", f, (e) => j("size", e.target.value ? Number(e.target.value) : null)), J(e, t);
						}, o = (e) => {
							var t = Ka(), n = B(t), r = V(z(n));
							Z(r), N(n);
							var i = V(n, 2), a = V(z(i));
							{
								let e = /* @__PURE__ */ F(() => G(A).props.page ?? "__href"), t = /* @__PURE__ */ F(() => [...G(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								Ui(a, {
									get value() {
										return G(e);
									},
									get options() {
										return G(t);
									},
									onchange: (e) => {
										let t = e === "__href" ? null : e;
										De(`edit:${G(A).blockId}`, (e) => {
											e.props.page = t, t && (e.props.href = null);
										});
									}
								});
							}
							N(i);
							var o = V(i, 2), s = (e) => {
								var t = Ga();
								Z(t), H(() => Q(t, G(A).props.href === "#" ? "" : G(A).props.href ?? "")), K("change", t, (e) => j("href", e.target.value || null)), J(e, t);
							};
							X(o, (e) => {
								G(A).props.page || e(s);
							});
							var c = V(o, 2);
							Ui(V(z(c)), {
								get value() {
									return G(A).props.style;
								},
								options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
								onchange: (e) => j("style", e)
							}), N(c), H(() => Q(r, G(A).props.label)), K("change", r, (e) => j("label", e.target.value)), J(e, t);
						}, s = (e) => {
							var t = qa(), n = B(t), r = V(z(n));
							N(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), N(i);
							var o = V(i, 2), s = V(z(o));
							{
								let e = /* @__PURE__ */ F(() => G(A).props.fit ?? "cover");
								Ui(s, {
									get value() {
										return G(e);
									},
									options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
									onchange: (e) => j("fit", e)
								});
							}
							N(o);
							var c = V(o, 2), l = V(z(c));
							{
								let e = /* @__PURE__ */ F(() => G(A).props.radius ?? "");
								Ui(l, {
									get value() {
										return G(e);
									},
									options: [
										["", "Ingen"],
										["sm", "Liten"],
										["md", "Stor"]
									],
									onchange: (e) => j("radius", e || null)
								});
							}
							N(c);
							var u = V(c, 2), d = V(z(u));
							Z(d), N(u);
							var f = V(u, 2), p = V(z(f)), m = z(p);
							N(p), N(f);
							var h = V(f, 2);
							Z(h);
							var g = V(h, 2), _ = V(z(g)), v = z(_);
							N(_), N(g);
							var y = V(g, 2);
							Z(y);
							var b = V(y, 2), x = V(z(b)), S = z(x);
							N(x), N(b);
							var C = V(b, 2);
							Z(C);
							var w = V(C, 2), T = V(z(w)), E = z(T);
							N(T), N(w);
							var ee = V(w, 2);
							Z(ee);
							var te = V(ee, 2), ne = V(z(te)), re = z(ne);
							N(ne), N(te);
							var D = V(te, 2);
							Z(D);
							var ie = V(D, 2), ae = V(z(ie)), oe = z(ae);
							N(ae), N(ie);
							var se = V(ie, 2);
							Z(se);
							var O = V(se, 2);
							H((e, t, n, r, i, o) => {
								Q(a, G(A).props.alt ?? ""), Q(d, G(A).props.href ?? ""), Y(m, `${e ?? ""}%`), Q(h, G(A).props.x ?? .5), Y(v, `${t ?? ""}%`), Q(y, G(A).props.y ?? .5), Y(S, `${n ?? ""}x`), Q(C, G(A).props.zoom ?? 1), Y(E, `${r ?? ""}%`), Q(ee, G(A).props.brightness ?? 1), Y(re, `${i ?? ""}%`), Q(D, G(A).props.contrast ?? 1), Y(oe, `${o ?? ""}%`), Q(se, G(A).props.saturate ?? 1);
							}, [
								() => Math.round((G(A).props.x ?? .5) * 100),
								() => Math.round((G(A).props.y ?? .5) * 100),
								() => (G(A).props.zoom ?? 1).toFixed(2),
								() => Math.round((G(A).props.brightness ?? 1) * 100),
								() => Math.round((G(A).props.contrast ?? 1) * 100),
								() => Math.round((G(A).props.saturate ?? 1) * 100)
							]), K("change", r, ke), K("change", a, (e) => j("alt", e.target.value)), K("change", d, (e) => j("href", e.target.value || null)), K("input", h, (e) => j("x", Number(e.target.value))), K("input", y, (e) => j("y", Number(e.target.value))), K("input", C, (e) => j("zoom", Number(e.target.value))), K("input", ee, (e) => j("brightness", Number(e.target.value))), K("input", D, (e) => j("contrast", Number(e.target.value))), K("input", se, (e) => j("saturate", Number(e.target.value))), K("click", O, () => De(`edit:${G(A).blockId}`, (e) => {
								e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
							})), J(e, t);
						}, c = (e) => {
							var t = Ja(), n = V(B(t), 2);
							Z(n);
							var r = V(n, 2), i = V(z(r));
							Z(i), N(r), P(2), H(() => {
								Q(n, G(A).props.url ?? ""), Q(i, G(A).props.title ?? "");
							}), K("change", n, (e) => j("url", e.target.value)), K("change", i, (e) => j("title", e.target.value)), J(e, t);
						}, l = (e) => {
							var t = Xa(), n = B(t), r = V(z(n)), i = z(r);
							{
								let e = /* @__PURE__ */ F(() => G(A).props.glyph ?? "★");
								Ri(i, {
									get value() {
										return G(e);
									},
									onpick: (e) => j("glyph", e),
									onimage: (e) => j("image", e)
								});
							}
							var a = V(i, 2);
							Z(a), N(r), N(n);
							var o = V(n, 2), s = (e) => {
								var t = Ya(), n = B(t), r = z(n), i = V(r, 2);
								N(n), P(2), H(() => $(r, "src", G(A).props.image)), K("click", i, () => j("image", null)), J(e, t);
							};
							X(o, (e) => {
								G(A).props.image && e(s);
							});
							var c = V(o, 2), l = V(z(c));
							Z(l), N(c);
							var u = V(c, 2);
							Ui(V(z(u)), {
								get value() {
									return G(A).props.color;
								},
								get options() {
									return Ne;
								},
								onchange: (e) => j("color", e)
							}), N(u), P(2), H(() => {
								Q(a, G(A).props.glyph ?? ""), Q(l, G(A).props.size ?? 48);
							}), K("change", a, (e) => j("glyph", e.target.value || "★")), K("change", l, (e) => j("size", Number(e.target.value))), J(e, t);
						}, u = (e) => {
							var t = Za(), n = B(t), r = V(z(n));
							{
								let e = /* @__PURE__ */ F(() => G(A).props.collection ?? ""), t = /* @__PURE__ */ F(() => [["", "Velg …"], ...G(Yt).map((e) => [e, G(Xt)[e]?.name ?? e])]);
								Ui(r, {
									get value() {
										return G(e);
									},
									get options() {
										return G(t);
									},
									onchange: (e) => j("collection", e || null)
								});
							}
							N(n);
							var i = V(n, 2), a = V(z(i));
							{
								let e = /* @__PURE__ */ F(() => G(A).props.view ?? "cards");
								Ui(a, {
									get value() {
										return G(e);
									},
									options: [
										["cards", "Kort"],
										["list", "Liste"],
										["archive", "Arkiv (per år)"]
									],
									onchange: (e) => j("view", e)
								});
							}
							N(i);
							var o = V(i, 2), s = V(z(o));
							Z(s), N(o);
							var c = V(o, 2), l = z(c);
							Z(l), P(), N(c), P(2), H(() => {
								Q(s, G(A).props.limit ?? 6), ri(l, G(A).props.newestFirst !== !1);
							}), K("change", s, (e) => j("limit", Number(e.target.value))), K("change", l, (e) => j("newestFirst", e.target.checked)), J(e, t);
						}, d = (e) => {
							var t = Qa(), n = B(t);
							Ui(V(z(n)), {
								get value() {
									return G(A).props.kind;
								},
								get options() {
									return Me;
								},
								onchange: (e) => j("kind", e)
							}), N(n);
							var r = V(n, 2);
							Ui(V(z(r)), {
								get value() {
									return G(A).props.color;
								},
								get options() {
									return Ne;
								},
								onchange: (e) => j("color", e)
							}), N(r);
							var i = V(r, 2), a = V(z(i));
							Z(a), N(i);
							var o = V(i, 2), s = z(o);
							Z(s), P(), N(o), H((e) => {
								Q(a, G(A).props.thickness), ri(s, e);
							}, [() => !!G(A).props.fill]), K("change", a, (e) => j("thickness", Number(e.target.value))), K("change", s, (e) => j("fill", e.target.checked ? G(A).props.color : null)), J(e, t);
						};
						X(i, (e) => {
							G(A).type === "text" ? e(a) : G(A).type === "button" ? e(o, 1) : G(A).type === "image" ? e(s, 2) : G(A).type === "video" ? e(c, 3) : G(A).type === "icon" ? e(l, 4) : G(A).type === "samling" ? e(u, 5) : G(A).type === "shape" && e(d, 6);
						});
						var f = V(i, 4), p = V(z(f));
						{
							let e = /* @__PURE__ */ F(() => G(A).animation?.type ?? ""), t = /* @__PURE__ */ F(() => [["", "Ingen"], ...Object.entries(fa).map(([e, t]) => [e, t.label])]);
							Ui(p, {
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => tt(e || null)
							});
						}
						N(f);
						var h = V(f, 2), g = (e) => {
							var t = $a(), n = B(t), r = V(z(n));
							Z(r), N(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), N(i), P(2), H(() => {
								Q(r, G(A).animation.props.duration), Q(a, G(A).animation.props.delay);
							}), K("change", r, (e) => nt("duration", Number(e.target.value))), K("change", a, (e) => nt("delay", Number(e.target.value))), J(e, t);
						};
						X(h, (e) => {
							G(A).animation && fa[G(A).animation.type]?.entrance && e(g);
						});
						var _ = V(h, 4), v = V(z(_), 2), b = V(z(v), 2), x = (e) => {
							var t = eo(), n = z(t), r = V(z(n));
							Z(r), N(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), N(i);
							var o = V(i, 2), s = V(z(o));
							Z(s), N(o);
							var c = V(o, 2), l = V(z(c));
							Z(l), N(c);
							var u = V(c, 2), d = V(z(u));
							Z(d), N(u);
							var f = V(u, 2), p = V(z(f));
							Z(p), N(f), N(t), H(() => {
								Q(r, G(A).frame.x), Q(a, G(A).frame.y), Q(s, G(A).frame.w), Q(l, G(A).frame.h), Q(d, G(A).frame.z ?? 1), Q(p, G(A).frame.rot ?? 0);
							}), K("change", r, (e) => Oe("x", Number(e.target.value))), K("change", a, (e) => Oe("y", Number(e.target.value))), K("change", s, (e) => Oe("w", Number(e.target.value))), K("change", l, (e) => Oe("h", Number(e.target.value))), K("change", d, (e) => Oe("z", Number(e.target.value))), K("change", p, (e) => Oe("rot", Number(e.target.value))), J(e, t);
						};
						X(b, (e) => {
							G(y) === "desktop" && e(x);
						});
						var S = V(b, 2), C = z(S);
						Z(C), P(), N(S), N(v), N(_), H(() => {
							Y(r, `${je[G(A).type] ?? G(A).type ?? ""}-blokk`), ri(C, G(A).decor);
						}), K("change", C, (e) => M(e.target.checked)), J(e, t);
					}, o = (e) => {
						var t = uo(), r = V(B(t), 2), a = V(z(r));
						Z(a), N(r);
						var o = V(r, 6), s = z(o);
						Z(s), P(), N(o);
						var c = V(o, 2), l = (e) => {
							var t = no(), n = B(t), r = V(z(n)), i = z(r);
							N(r), N(n);
							var a = V(n, 2);
							Z(a), H(() => {
								Y(i, `${G(Fe).size ?? ""} px`), Q(a, G(Fe).size);
							}), K("input", a, (e) => lt("size", Number(e.target.value))), J(e, t);
						};
						X(c, (e) => {
							G(Fe) && e(l);
						});
						var u = V(c, 8);
						Rr(u, 17, () => G(Re), Pr, (e, t, r) => {
							var a = lo(), o = z(a), s = z(o);
							{
								let e = /* @__PURE__ */ F(() => n.map(([e, t]) => [e, t.label]));
								Ui(s, {
									get value() {
										return G(t).type;
									},
									title: "Bytt lagtype (innstillingene nullstilles)",
									get options() {
										return G(e);
									},
									onchange: (e) => Ze(r, e)
								});
							}
							var c = V(s, 2), l = z(c);
							l.disabled = r === 0, Wr(l, () => i.up, !0), N(l);
							var u = V(l, 2);
							Wr(u, () => i.down, !0), N(u);
							var d = V(u, 2);
							Wr(d, () => i.cross, !0), N(d), N(c), N(o);
							var f = V(o, 2), p = (e) => {
								var n = ro(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ F($e);
									wi(a, {
										get value() {
											return G(t).props.value;
										},
										get tokens() {
											return G(e);
										},
										label: "Lagets farge",
										onchange: (e) => Ye(r, "value", e)
									});
								}
								N(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								N(s), N(o);
								var l = V(o, 2);
								Z(l), H((e) => {
									Y(c, `${e ?? ""}%`), Q(l, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("input", l, (e) => Ye(r, "opacity", Number(e.target.value))), J(e, n);
							}, m = (e) => {
								var n = io(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ F($e);
									wi(a, {
										get value() {
											return G(t).props.stops[0];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient fra",
										onchange: (e) => Xe(r, 0, e)
									});
								}
								N(i);
								var o = V(i, 2), s = V(z(o));
								{
									let e = /* @__PURE__ */ F($e);
									wi(s, {
										get value() {
											return G(t).props.stops[G(t).props.stops.length - 1];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient til",
										onchange: (e) => Xe(r, G(t).props.stops.length - 1, e)
									});
								}
								N(o);
								var c = V(o, 2), l = V(z(c)), u = z(l);
								N(l), N(c);
								var d = V(c, 2);
								Z(d);
								var f = V(d, 2), p = V(z(f)), m = z(p);
								N(p), N(f);
								var h = V(f, 2);
								Z(h);
								var g = V(h, 2), _ = z(g);
								Z(_), P(), N(g), H((e, n) => {
									Y(u, `${G(t).props.angle ?? ""}°`), Q(d, G(t).props.angle), Y(m, `${e ?? ""}%`), Q(h, G(t).props.opacity ?? 1), ri(_, n);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100), () => !!G(t).props.animate]), K("input", d, (e) => Ye(r, "angle", Number(e.target.value))), K("input", h, (e) => Ye(r, "opacity", Number(e.target.value))), K("change", _, (e) => Ye(r, "animate", e.target.checked)), J(e, n);
							}, h = (e) => {
								var n = ao(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ F($e);
									wi(a, {
										get value() {
											return G(t).props.color;
										},
										get tokens() {
											return G(e);
										},
										label: "Glødens farge",
										onchange: (e) => Ye(r, "color", e)
									});
								}
								N(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								N(s), N(o);
								var l = V(o, 2);
								Z(l);
								var u = V(l, 2), d = V(z(u)), f = z(d);
								N(d), N(u);
								var p = V(u, 2);
								Z(p);
								var m = V(p, 2), h = V(z(m)), g = z(h);
								N(h), N(m);
								var _ = V(m, 2);
								Z(_);
								var v = V(_, 2), y = V(z(v)), b = z(y);
								N(y), N(v);
								var x = V(v, 2);
								Z(x), H((e, n, r, i) => {
									Y(c, `${e ?? ""}%`), Q(l, G(t).props.x), Y(f, `${n ?? ""}%`), Q(p, G(t).props.y), Y(g, `${r ?? ""}%`), Q(_, G(t).props.radius), Y(b, `${i ?? ""}%`), Q(x, G(t).props.opacity);
								}, [
									() => Math.round(G(t).props.x * 100),
									() => Math.round(G(t).props.y * 100),
									() => Math.round(G(t).props.radius * 100),
									() => Math.round(G(t).props.opacity * 100)
								]), K("input", l, (e) => Ye(r, "x", Number(e.target.value))), K("input", p, (e) => Ye(r, "y", Number(e.target.value))), K("input", _, (e) => Ye(r, "radius", Number(e.target.value))), K("input", x, (e) => Ye(r, "opacity", Number(e.target.value))), J(e, n);
							}, g = (e) => {
								var n = oo(), i = B(n), a = V(z(i)), o = z(a);
								N(a), N(i);
								var s = V(i, 2);
								Z(s), H((e) => {
									Y(o, `${e ?? ""}%`), Q(s, G(t).props.opacity);
								}, [() => Math.round(G(t).props.opacity * 100)]), K("input", s, (e) => Ye(r, "opacity", Number(e.target.value))), J(e, n);
							}, _ = (e) => {
								var n = co(), i = B(n), a = z(i), o = V(a);
								N(i);
								var s = V(i, 2), c = V(z(s));
								{
									let e = /* @__PURE__ */ F(() => G(t).props.fit ?? "cover");
									Ui(c, {
										get value() {
											return G(e);
										},
										options: [
											["cover", "Fyll (beskjæres)"],
											["contain", "Vis hele"],
											["repeat", "Gjenta (mønster)"]
										],
										onchange: (e) => Ye(r, "fit", e)
									});
								}
								N(s);
								var l = V(s, 2), u = (e) => {
									var n = so(), i = B(n), a = V(z(i)), o = z(a);
									N(a), N(i);
									var s = V(i, 2);
									Z(s);
									var c = V(s, 2), l = V(z(c)), u = z(l);
									N(l), N(c);
									var d = V(c, 2);
									Z(d), H((e, n) => {
										Y(o, `${e ?? ""}%`), Q(s, G(t).props.x ?? .5), Y(u, `${n ?? ""}%`), Q(d, G(t).props.y ?? .5);
									}, [() => Math.round((G(t).props.x ?? .5) * 100), () => Math.round((G(t).props.y ?? .5) * 100)]), K("input", s, (e) => Ye(r, "x", Number(e.target.value))), K("input", d, (e) => Ye(r, "y", Number(e.target.value))), J(e, n);
								};
								X(l, (e) => {
									(G(t).props.fit ?? "cover") !== "repeat" && e(u);
								});
								var d = V(l, 2), f = V(z(d)), p = z(f);
								N(f), N(d);
								var m = V(d, 2);
								Z(m);
								var h = V(m, 2), g = V(z(h)), _ = z(g);
								N(g), N(h);
								var v = V(h, 2);
								Z(v), H((e) => {
									Y(a, `${G(t).props.src ? "Bytt bilde" : "Velg bilde"} `), Y(p, `${G(t).props.blur ?? 0 ?? ""} px`), Q(m, G(t).props.blur ?? 0), Y(_, `${e ?? ""}%`), Q(v, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("change", o, (e) => Qe(r, e)), K("input", m, (e) => Ye(r, "blur", Number(e.target.value))), K("input", v, (e) => Ye(r, "opacity", Number(e.target.value))), J(e, n);
							};
							X(f, (e) => {
								G(t).type === "color" ? e(p) : G(t).type === "gradient" ? e(m, 1) : G(t).type === "glow" ? e(h, 2) : G(t).type === "grain" ? e(g, 3) : G(t).type === "image" && e(_, 4);
							}), N(a), H(() => u.disabled = r === G(Re).length - 1), K("click", l, () => Je(r, -1)), K("click", u, () => Je(r, 1)), K("click", d, () => qe(r)), J(e, a);
						});
						var d = V(u, 2), f = V(z(d));
						{
							let e = /* @__PURE__ */ F(() => n.map(([e, t]) => [e, t.label]));
							Ui(f, {
								get value() {
									return G(Ge);
								},
								get options() {
									return G(e);
								},
								onchange: (e) => R(Ge, e, !0)
							});
						}
						N(d);
						var p = V(d, 2), m = V(p, 4), h = V(z(m));
						{
							let e = /* @__PURE__ */ F(() => G(ze)?.type ?? ""), t = /* @__PURE__ */ F(() => [["", "Ingen"], ...Object.entries(fa).map(([e, t]) => [e, t.label])]);
							Ui(h, {
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => it(e || null)
							});
						}
						N(m);
						var g = V(m, 2), _ = (e) => {
							var t = $a(), n = B(t), r = V(z(n));
							Z(r), N(n);
							var i = V(n, 2), a = V(z(i));
							Z(a), N(i), P(2), H(() => {
								Q(r, G(ze).props.duration), Q(a, G(ze).props.delay);
							}), K("change", r, (e) => at("duration", Number(e.target.value))), K("change", a, (e) => at("delay", Number(e.target.value))), J(e, t);
						};
						X(g, (e) => {
							G(ze) && fa[G(ze).type]?.entrance && e(_);
						}), H(() => {
							Q(a, G(Ie)), ri(s, G(Fe) !== null);
						}), K("change", a, (e) => ot(e.target.value)), K("change", s, (e) => ct(e.target.checked)), K("click", p, () => Ke(G(Ge))), J(e, t);
					}, s = (e) => {
						J(e, fo());
					};
					X(r, (e) => {
						G(A) ? e(a) : G(Pe) ? e(o, 1) : e(s, -1);
					}), N(t), J(e, t);
				}, h = (e) => {
					var t = mo(), n = V(z(t), 2), r = z(n);
					Z(r), P(), N(n);
					var i = V(n, 4);
					rt(i), $(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = V(i, 4), o = V(z(a));
					{
						let e = /* @__PURE__ */ F(() => G(E).footer?.align ?? "center");
						Ui(o, {
							get value() {
								return G(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => Rn("footer", (t) => {
								t.align = e;
							})
						});
					}
					N(a), P(2), N(t), H((e) => {
						ri(r, e), Q(i, G(E).footer?.text ?? "");
					}, [() => !!G(E).footer?.show]), K("change", r, (e) => Rn("footer", (t) => {
						t.show = e.target.checked;
					})), K("input", i, (e) => Rn("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), J(e, t);
				}, v = (e) => {
					var t = bo(), n = V(z(t), 2), r = (e) => {
						var t = ho(), n = V(z(t));
						{
							let e = /* @__PURE__ */ F(() => G(Zt) ?? ""), t = /* @__PURE__ */ F(() => [["", "Velg …"], ...G(Yt).map((e) => [e, G(Xt)[e]?.name ?? e])]);
							Ui(n, {
								get value() {
									return G(e);
								},
								get options() {
									return G(t);
								},
								onchange: (e) => R(Zt, e || null, !0)
							});
						}
						N(t), J(e, t);
					};
					X(n, (e) => {
						G(Yt).length && e(r);
					});
					var a = V(n, 2), o = (e) => {
						let t = /* @__PURE__ */ F(() => G(Xt)[G(Zt)]);
						var n = yo(), r = B(n), a = z(r), o = V(a, 2);
						Wr(o, () => i.cross, !0), N(o), N(r);
						var s = V(r, 2);
						Rr(s, 19, () => G(t).entries, (e) => e.id, (e, n, r) => {
							var a = _o(), o = z(a), s = z(o);
							N(o);
							var c = V(o, 2), l = z(c), u = z(l);
							Z(u);
							var d = V(u, 2), f = z(d);
							Wr(f, () => i.up, !0), N(f);
							var p = V(f, 2);
							Wr(p, () => i.down, !0), N(p);
							var m = V(p, 2);
							Wr(m, () => i.cross, !0), N(m), N(d), N(l);
							var h = V(l, 2), g = V(z(h));
							Z(g), N(h);
							var _ = V(h, 2);
							rt(_);
							var v = V(_, 2), y = V(z(v));
							Z(y), N(v);
							var b = V(v, 2), x = z(b), S = z(x), C = V(S);
							N(x);
							var w = V(x, 2), T = (e) => {
								var t = go(), r = B(t), a = V(r, 2);
								Wr(a, () => i.cross, !0), N(a), H(() => $(r, "src", G(n).image)), K("click", a, () => fn(G(Zt), G(n).id, "image", "")), J(e, t);
							};
							X(w, (e) => {
								G(n).image && e(T);
							}), N(b), N(c), N(a), H((e) => {
								Y(s, `${e ?? ""}${G(n).date ? ` · ${G(n).date}` : ""}`), Q(u, G(n).title), f.disabled = G(r) === 0, p.disabled = G(r) === G(t).entries.length - 1, Q(g, G(n).date ?? ""), Q(_, G(n).text ?? ""), Q(y, G(n).href ?? ""), Y(S, `${G(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => G(n).title.replace(/<[^>]*>/g, "")]), K("change", u, (e) => fn(G(Zt), G(n).id, "title", e.target.value || "Uten tittel")), K("click", f, () => pn(G(Zt), G(r), -1)), K("click", p, () => pn(G(Zt), G(r), 1)), K("click", m, () => mn(G(Zt), G(n).id)), K("change", g, (e) => fn(G(Zt), G(n).id, "date", e.target.value)), K("change", _, (e) => fn(G(Zt), G(n).id, "text", e.target.value)), K("change", y, (e) => fn(G(Zt), G(n).id, "href", e.target.value)), K("change", C, (e) => hn(G(Zt), G(n).id, e)), J(e, a);
						});
						var c = V(s, 2), l = (e) => {
							J(e, vo());
						};
						X(c, (e) => {
							G(t).entries.length || e(l);
						}), P(2), K("click", a, () => dn(G(Zt))), K("click", o, () => un(G(Zt))), J(e, n);
					};
					X(a, (e) => {
						G(Zt) && G(Xt)[G(Zt)] && e(o);
					});
					var s = V(a, 2), c = V(z(s));
					Z(c), N(s);
					var l = V(s, 2);
					Ui(V(z(l)), {
						get value() {
							return G($t);
						},
						get options() {
							return nn;
						},
						onchange: (e) => R($t, e, !0)
					}), N(l);
					var u = V(l, 2);
					N(t), H((e) => u.disabled = e, [() => !G(Qt).trim()]), K("keydown", c, (e) => e.key === "Enter" && ln()), si(c, () => G(Qt), (e) => R(Qt, e)), K("click", u, ln), J(e, t);
				}, b = (e) => {
					var t = ko(), n = V(z(t), 2), r = (e) => {
						J(e, xo());
					}, a = /* @__PURE__ */ F(() => !Dn().length);
					X(n, (e) => {
						G(a) && e(r);
					});
					var o = V(n, 2);
					Rr(o, 16, Dn, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ F(() => xn[t]), r = /* @__PURE__ */ F(() => (G(bn)?.enabled ?? []).includes(t));
						var a = wo();
						let o;
						var s = z(a), c = z(s), l = z(c, !0);
						N(c);
						var u = V(c, 2), d = (e) => {
							var t = So(), r = z(t);
							N(t), H(() => Y(r, `v${G(n).version ?? ""}`)), J(e, t);
						};
						X(u, (e) => {
							G(n)?.version && e(d);
						});
						var f = V(u, 2), p = z(f), m = z(p);
						Z(m);
						var h = V(m);
						N(p);
						var g = V(p, 2);
						Wr(g, () => i.cross, !0), N(g), N(f), N(s);
						var _ = V(s, 2), v = (e) => {
							var t = Co(), r = z(t, !0);
							N(t), H((e) => Y(r, e), [() => G(n).errors.join("; ")]), J(e, t);
						}, y = (e) => {
							var t = Co(), r = z(t);
							N(t), H(() => Y(r, `Krever motorversjon ${G(n).requiresEngine ?? ""} (denne siden kjører ${G(Sn) ?? ""}); pluginen hoppes over ved lasting.`)), J(e, t);
						}, b = (e) => {
							var t = Co(), r = z(t);
							N(t), H((e) => Y(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(G(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(G(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), J(e, t);
						};
						X(_, (e) => {
							G(n)?.errors?.length ? e(v) : G(n) && !G(n).satisfied ? e(y, 1) : G(n)?.csp && e(b, 2);
						}), N(a), H((e) => {
							o = Xr(a, 1, "plugin-row svelte-1n46o8q", null, o, { "plugin-broken": G(n)?.errors?.length }), Y(l, G(n)?.name ?? t), $(p, "title", G(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ri(m, G(r)), m.disabled = e, Y(h, ` ${G(r) ? "På" : "Av"}`);
						}, [() => !!G(n)?.errors?.length]), K("change", m, (e) => Nn(t, e.target.checked)), K("click", g, () => Fn(t)), J(e, a);
					});
					var s = V(o, 2), c = (e) => {
						var t = Eo();
						Rr(V(B(t), 4), 16, () => G(Tn), (e) => e, (e, t) => {
							var n = To(), r = z(n), a = z(r), o = z(a, !0);
							N(a);
							var s = V(a, 2), c = (e) => {
								var n = So(), r = z(n);
								N(n), H(() => Y(r, `v${xn[t].version ?? ""}`)), J(e, n);
							};
							X(s, (e) => {
								xn[t]?.version && e(c);
							});
							var l = V(s, 2), u = z(l);
							Wr(u, () => i.right, !0), N(u), N(l), N(r), N(n), H(() => Y(o, xn[t]?.name ?? t)), K("click", u, () => Ln(t)), J(e, n);
						}), J(e, t);
					};
					X(s, (e) => {
						G(Tn).length && e(c);
					});
					var l = V(s, 2), u = (e) => {
						var t = Or(), n = B(t), r = (e) => {
							J(e, Do());
						};
						X(n, (e) => {
							G(Tn).length || e(r);
						}), J(e, t);
					}, d = (e) => {
						var t = Oo(), n = V(B(t), 2);
						Z(n);
						var r = V(n, 2), i = V(r, 2), a = (e) => {
							var t = Co(), n = z(t, !0);
							N(t), H(() => Y(n, G(wn))), J(e, t);
						};
						X(i, (e) => {
							G(wn) && e(a);
						}), H((e) => r.disabled = e, [() => !G(Cn).trim()]), K("keydown", n, (e) => e.key === "Enter" && In()), si(n, () => G(Cn), (e) => R(Cn, e)), K("click", r, In), J(e, t);
					};
					X(l, (e) => {
						G(En) === "ok" ? e(u) : e(d, -1);
					}), N(t), J(e, t);
				}, x = (e) => {
					var t = Po(), n = V(z(t), 2), r = (e) => {
						J(e, Ao());
					}, i = (e) => {
						var t = wa(), n = B(t), r = (e) => {
							var t = jo(), n = z(t, !0);
							N(t), H(() => Y(n, G(gt))), J(e, t);
						};
						X(n, (e) => {
							G(gt) && e(r);
						});
						var i = V(n, 2), a = (e) => {
							var t = No(), n = B(t);
							Rr(V(n, 2), 19, () => G(ht), (e) => e.sha, (e, t, n) => {
								var r = Mo();
								let i;
								var a = z(r), o = z(a, !0);
								N(a);
								var s = V(a, 2), c = z(s);
								N(s), N(r), H((e) => {
									i = Xr(r, 1, "history-row svelte-1n46o8q", null, i, { head: G(n) === 0 }), $(a, "title", G(t).sha), Y(o, G(t).message), Y(c, `${G(t).author ?? ""}${e ?? ""}`);
								}, [() => G(t).date ? ` · ${yt.format(new Date(G(t).date))}` : ""]), J(e, r);
							}), H(() => {
								n.disabled = G(_t) || !G(g)?.allowed, $(n, "title", G(g)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), K("click", n, xt), J(e, t);
						};
						X(i, (e) => {
							G(ht).length > 0 && e(a);
						}), J(e, t);
					};
					X(n, (e) => {
						G(ht) === null ? e(r) : e(i, -1);
					}), N(t), J(e, t);
				};
				X(o, (e) => {
					G(k) === "Sider" ? e(s) : G(k) === "Nav" ? e(l, 1) : G(k) === "Tema" ? e(u, 2) : G(k) === "Blokker" ? e(d, 3) : G(k) === "Grid" ? e(f, 4) : G(k) === "Egenskaper" ? e(p, 5) : G(k) === "Footer" ? e(h, 6) : G(k) === "Samlinger" ? e(v, 7) : G(k) === "Plugins" ? e(b, 8) : G(k) === "Historikk" && e(x, 9);
				}), N(t), H(() => Y(a, G(k))), J(e, t);
			};
			X(a, (e) => {
				G(k) && e(o);
			}), J(e, t);
		};
		X(r, (e) => {
			G(v) && e(a);
		});
		var o = V(r, 2);
		let s;
		var l = z(o);
		di(l, (e) => R(h, e), () => G(h)), N(o), N(t), H(() => {
			s = Xr(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: G(y) === "mobile" }), $(l, "src", `/?page=${G(c)}&preview=1`);
		}), yr("load", l, I), _r(l), J(e, t);
	}, qr = (e) => {
		J(e, Ro());
	};
	X(Gr, (e) => {
		G(s) ? e(Kr) : e(qr, -1);
	});
	var Jr = V(Gr, 2), Yr = (e) => {
		Gi(e, {
			get image() {
				return G(Bt);
			},
			onapply: Ht,
			oncancel: () => R(Bt, null)
		});
	};
	X(Jr, (e) => {
		G(Bt) && e(Yr);
	});
	var Zr = V(Jr, 2), Qr = (e) => {
		var t = Bo(), n = z(t), r = z(n), i = z(r, !0);
		N(r);
		var a = V(r, 2);
		Rr(a, 16, () => G(pe).lines, (e) => e, (e, t) => {
			var n = zo(), r = z(n, !0);
			N(n), H(() => Y(r, t)), J(e, n);
		});
		var o = V(a, 2), s = z(o), c = z(s, !0);
		N(s);
		var l = V(s, 2), u = z(l, !0);
		N(l), N(o), N(n), N(t), H(() => {
			Y(i, G(pe).title), Y(c, G(pe).cancelLabel), Y(u, G(pe).okLabel);
		}), K("click", s, () => he(!1)), K("click", l, () => he(!0)), J(e, t);
	};
	X(Zr, (e) => {
		G(pe) && e(Qr);
	});
	var $r = V(Zr, 2), ei = (e) => {
		var t = Vo(), n = z(t), r = V(z(n), 4), i = V(z(r));
		Z(i), N(r);
		var a = V(r, 2);
		wi(V(z(a)), {
			get value() {
				return G(ve);
			},
			label: "Aksentfarge",
			onchange: (e) => R(ve, e, !0)
		}), N(a);
		var o = V(a, 2);
		wi(V(z(o)), {
			get value() {
				return G(ye);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => R(ye, e, !0)
		}), N(o);
		var s = V(o, 4), c = z(s), l = V(c, 2);
		N(s), N(n), N(t), H((e) => l.disabled = e, [() => !G(_e).trim()]), K("keydown", i, (e) => e.key === "Enter" && xe()), si(i, () => G(_e), (e) => R(_e, e)), K("click", c, be), K("click", l, xe), J(e, t);
	};
	X($r, (e) => {
		G(ge) && e(ei);
	});
	var ti = V($r, 2), ni = (e) => {
		var t = Ho();
		let n;
		var r = z(t), i = z(r, !0);
		N(r);
		var a = V(r, 2);
		N(t), H(() => {
			n = Xr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: G(d) === "ok",
				error: G(d) === "error"
			}), Y(i, G(u));
		}), K("click", a, () => p("")), J(e, t);
	};
	X(ti, (e) => {
		G(u) && e(ni);
	}), N(Er), H(() => Ar = Xr(kr, 1, "topbar svelte-1n46o8q", null, Ar, { hidden: !G(v) })), J(e, Er), He();
}
br([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var Go = kr(Wo, { target: document.getElementById("urd-admin") });
//#endregion
export { Go as default };
