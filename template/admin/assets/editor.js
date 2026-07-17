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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, ee = 1 << 25, T = 65536, te = 1 << 21, ne = 1 << 22, re = 1 << 23, ie = Symbol("$state"), E = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), D = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), ue = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function de() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function O(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function fe() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function pe() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function me() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function he() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function k() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var ge = {}, A = Symbol("uninitialized"), _e = "http://www.w3.org/1999/xhtml";
function ve() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function ye(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function be() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function xe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var j = !1;
function Se(e) {
	j = e;
}
var M;
function Ce(e) {
	if (e === null) throw ye(), ge;
	return M = e;
}
function we() {
	return Ce(/* @__PURE__ */ tn(M));
}
function N(e) {
	if (j) {
		if (/* @__PURE__ */ tn(M) !== null) throw ye(), ge;
		M = e;
	}
}
function Te(e = 1) {
	if (j) {
		for (var t = e, n = M; t--;) n = /* @__PURE__ */ tn(n);
		M = n;
	}
}
function Ee(e = !0) {
	for (var t = 0, n = M;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ tn(n);
		e && n.remove(), n = i;
	}
}
function De(e) {
	if (!e || e.nodeType !== 8) throw ye(), ge;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Oe(e) {
	return e === this.v;
}
function ke(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ae(e) {
	return !ke(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var je = [];
function Me(e, t = !1, n = !1) {
	return Ne(e, /* @__PURE__ */ new Map(), "", je, null, n);
}
function Ne(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ne(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ne(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ne(t.toJSON(), n, r, i, t);
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
var Pe = null;
function Fe(e) {
	Pe = e;
}
function Ie(e, t = !1, n) {
	Pe = {
		p: Pe,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: W,
		l: null
	};
}
function Le(e) {
	var t = Pe, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) fn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Pe = t.p, e ?? {};
}
function Re() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var P = [];
function ze() {
	var e = P;
	P = [], f(e);
}
function Be(e) {
	if (P.length === 0 && !bt) {
		var t = P;
		queueMicrotask(() => {
			t === P && ze();
		});
	}
	P.push(e);
}
function Ve() {
	for (; P.length > 0;) ze();
}
function He(e) {
	var t = W;
	if (t === null) return U.f |= re, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ue(e, t);
}
function Ue(e, t) {
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
var We = ~(g | _ | h);
function F(e, t) {
	e.f = e.f & We | t;
}
function Ge(e) {
	e.f & 512 || e.deps === null ? F(e, h) : F(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Ke(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= T, Ke(t.deps));
}
function qe(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Ke(e.deps), F(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Je = !1;
function Ye() {
	Je || (Je = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Xe(e) {
	var t = U, n = W;
	Pn(null), Fn(null);
	try {
		return e();
	} finally {
		Pn(t), Fn(n);
	}
}
function Ze(e, t, n, r = n) {
	e.addEventListener(t, () => Xe(n));
	let i = e[le];
	i ? e[le] = () => {
		i(), r(!0);
	} : e[le] = () => r(!0), Ye();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Qe(e) {
	let t = 0, n = zt(0), r;
	return () => {
		un() && (K(n), gn(() => (t === 0 && (r = tr(() => e(() => Ut(n)))), t += 1, () => {
			Be(() => {
				--t, t === 0 && (r?.(), r = void 0, Ut(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var $e = S | C;
function et(e, t, n, r) {
	new tt(e, t, n, r);
}
var tt = class {
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
	#h = Qe(() => (this.#m = zt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = _n(() => {
			if (j) {
				let e = this.#t;
				we();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, $e), j && (this.#e = M);
	}
	#g() {
		try {
			this.#a = vn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = vn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = vn(() => e(this.#e)), Be(() => {
			var e = this.#c = document.createDocumentFragment(), t = $t();
			e.append(t), this.#a = this.#x(() => vn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, wn(this.#o, () => {
				this.#o = null;
			}), this.#b(I));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = vn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				On(this.#a, e);
				let t = this.#n.pending;
				this.#o = vn(() => t(this.#e));
			} else this.#b(I);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		qe(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = W, n = U, r = Pe;
		Fn(this.#i), Pn(this.#i), Fe(this.#i.ctx);
		try {
			return Et.ensure(), e();
		} catch (e) {
			return He(e), null;
		} finally {
			Fn(t), Pn(n), Fe(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && wn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Be(() => {
			this.#d = !1, this.#m && Vt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), K(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (H(this.#a), null), this.#o &&= (H(this.#o), null), this.#s &&= (H(this.#s), null), j && (Ce(this.#t), Te(), Ce(Ee()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				xe();
				return;
			}
			r = !0, i && k(), this.#s !== null && wn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Ue(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return vn(() => {
						var t = W;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ue(e, this.#i.parent), null;
				}
			}));
		};
		Be(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ue(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Ue(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function nt(e, t, n, r) {
	let i = Re() ? ot : ut;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = W, c = rt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ue(e, s);
			}
			it();
		}
	}
	var d = at();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ ct(e))).then(u).catch((e) => Ue(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), it();
	}) : f();
}
function rt() {
	var e = W, t = U, n = Pe, r = I;
	return function(i = !0) {
		Fn(e), Pn(t), Fe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function it(e = !0) {
	Fn(null), Pn(null), Fe(null), e && I?.deactivate();
}
function at() {
	var e = W, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function ot(e) {
	var t = 2 | g;
	return W !== null && (W.f |= C), {
		ctx: Pe,
		deps: null,
		effects: null,
		equals: Oe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: A,
		wv: 0,
		parent: W,
		ac: null
	};
}
var st = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ct(e, t, n) {
	let r = W;
	r === null && de();
	var i = void 0, a = zt(A), o = !U, s = /* @__PURE__ */ new Set();
	return hn(() => {
		var t = W, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== D && n.reject(e);
			}).finally(it);
		} catch (e) {
			n.reject(e), it();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = at();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(st);
			else for (let e of s.values()) e.reject(st);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== st && (c.activate(), t ? (a.f |= re, Vt(a, t)) : (a.f & 8388608 && (a.f ^= re), Vt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), dn(() => {
		for (let e of s) e.reject(st);
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
function lt(e) {
	let t = /* @__PURE__ */ ot(e);
	return Ln(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function ut(e) {
	let t = /* @__PURE__ */ ot(e);
	return t.equals = Ae, t;
}
function dt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function ft(e) {
	var t, n = W, r = e.parent;
	if (!jn && r !== null && e.v !== A && r.f & 24576) return ve(), e.v;
	Fn(r);
	try {
		e.f &= ~T, dt(e), t = Jn(e);
	} finally {
		Fn(n);
	}
	return t;
}
function pt(e) {
	var t = ft(e);
	if (!e.equals(t) && (e.wv = Gn(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), _t?.capture(e, t, !0)), e.deps === null))) {
		F(e, h);
		return;
	}
	jn || (vt === null ? Ge(e) : (un() || I?.is_fork) && vt.set(e, t));
}
function mt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Xe(() => {
		t.ac.abort(D), t.ac = null;
	}), t.fn !== null && (t.teardown = d), Xn(t, 0), bn(t));
}
function ht(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Zn(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var gt = null, I = null, _t = null, vt = null, yt = null, bt = !1, xt = !1, St = null, Ct = null, wt = 0, Tt = 1, Et = class e {
	id = Tt++;
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
		gt === null ? gt = this : (gt.#n = this, this.#t = gt), gt = this;
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
			for (var r of n.d) F(r, g), t(r);
			for (r of n.m) F(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, wt++ > 1e3 && (this.#x(), Ot());
		for (let e of this.#u) this.#d.delete(e), F(e, g), this.schedule(e);
		for (let e of this.#d) F(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = St = [], r = [], i = Ct = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Ft(e), this.#h() || this.discard(), t;
		}
		if (I = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (St = null, Ct = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Pt(e, t);
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
		this.#r.clear(), _t = this, At(r), At(n), _t = null, this.#s?.resolve();
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
				a ? r.f ^= h : i & 4 ? t.push(r) : Kn(r) && (i & 16 && this.#d.add(r), Zn(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), F(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), I = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) qe(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== A && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), vt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, vt = null;
	}
	flush() {
		try {
			xt = !0, I = this, this.#g();
		} finally {
			wt = 0, yt = null, St = null, Ct = null, xt = !1, I = null, vt = null, Lt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(st);
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
		this.#m || (this.#m = !0, Be(() => {
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
			!xt && !bt && Be(() => {
				t.#e || t.flush();
			});
		}
		return I;
	}
	apply() {
		vt = null;
	}
	schedule(e) {
		if (yt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (St !== null && t === W && (U === null || !(U.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? gt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Dt(e) {
	var t = bt;
	bt = !0;
	try {
		var n;
		for (e && (I !== null && !I.is_fork && I.flush(), n = e());;) {
			if (Ve(), I === null) return n;
			I.flush();
		}
	} finally {
		bt = t;
	}
}
function Ot() {
	try {
		fe();
	} catch (e) {
		Ue(e, yt);
	}
}
var kt = null;
function At(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Kn(r) && (kt = /* @__PURE__ */ new Set(), Zn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Cn(r), kt?.size > 0)) {
				Lt.clear();
				for (let e of kt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) kt.has(n) && (kt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Zn(n);
					}
				}
				kt.clear();
			}
		}
		kt = null;
	}
}
function jt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? jt(i, t, n, r) : e & 4194320 && !(e & 2048) && Mt(i, t, r) && (F(i, g), Nt(i));
	}
}
function Mt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Mt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Nt(e) {
	I.schedule(e);
}
function Pt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), F(e, h);
		for (var n = e.first; n !== null;) Pt(n, t), n = n.next;
	}
}
function Ft(e) {
	F(e, h);
	for (var t = e.first; t !== null;) Ft(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var It = /* @__PURE__ */ new Set(), Lt = /* @__PURE__ */ new Map(), Rt = !1;
function zt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Oe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function L(e, t) {
	let n = zt(e, t);
	return Ln(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Bt(e, t = !1, n = !0) {
	let r = zt(e);
	return t || (r.equals = Ae), r;
}
function R(e, t, n = !1) {
	return U !== null && (!Nn || U.f & 131072) && Re() && U.f & 4325394 && (In === null || !In.has(e)) && he(), Vt(e, n ? Gt(t) : t, Ct);
}
function Vt(e, t, n = null) {
	if (!e.equals(t)) {
		Lt.set(e, jn ? t : e.v);
		var r = Et.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && ft(t), vt === null && Ge(t);
		}
		e.wv = Gn(), Wt(e, g, n), Re() && W !== null && W.f & 1024 && !(W.f & 96) && (zn === null ? Bn([e]) : zn.push(e)), !r.is_fork && It.size > 0 && !Rt && Ht();
	}
	return t;
}
function Ht() {
	Rt = !1;
	for (let e of It) {
		e.f & 1024 && F(e, _);
		let t;
		try {
			t = Kn(e);
		} catch {
			t = !0;
		}
		t && Zn(e);
	}
	It.clear();
}
function Ut(e) {
	R(e, e.v + 1);
}
function Wt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Re(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & g) === 0;
			if (l && F(s, t), c & 131072) It.add(s);
			else if (c & 2) {
				var u = s;
				vt?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= T), Wt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && kt !== null && kt.add(d), n === null ? Nt(d) : n.push(d);
			}
		}
	}
}
function Gt(t) {
	if (typeof t != "object" || !t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = Un, f = (e) => {
		if (Un === d) return e();
		var t = U, n = Un;
		Pn(null), Wn(d);
		var r = e();
		return Pn(t), Wn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && pe();
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
					let e = f(() => /* @__PURE__ */ L(A, u));
					r.set(t, e), Ut(o);
				}
			} else R(n, A), Ut(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(Gt(s ? e[n] : A), u)), r.set(n, o)), o !== void 0) {
				var c = K(o);
				return c === A ? void 0 : c;
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
				if (a !== void 0 && o !== A) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === ie) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== A || Reflect.has(e, t);
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? Gt(e[t]) : A, u)), r.set(t, n)), K(n) === A) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(A, u)), r.set(d + "", p)) : R(p, A);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, Gt(n)), r.set(t, c));
			else {
				l = c.v !== A;
				var m = f(() => Gt(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				Ut(o);
			}
			return !0;
		},
		ownKeys(e) {
			K(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== A;
			});
			for (var [n, i] of r) i.v !== A && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			me();
		}
	});
}
function Kt(e) {
	try {
		if (typeof e == "object" && e && ie in e) return e[ie];
	} catch {}
	return e;
}
function qt(e, t) {
	return Object.is(Kt(e), Kt(t));
}
var Jt, Yt, Xt, Zt;
function Qt() {
	if (Jt === void 0) {
		Jt = window, Yt = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Xt = a(t, "firstChild").get, Zt = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function $t(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function en(e) {
	return Xt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function tn(e) {
	return Zt.call(e);
}
function z(e, t) {
	if (!j) return /* @__PURE__ */ en(e);
	var n = /* @__PURE__ */ en(M);
	if (n === null) n = M.appendChild($t());
	else if (t && n.nodeType !== 3) {
		var r = $t();
		return n?.before(r), Ce(r), r;
	}
	return t && sn(n), Ce(n), n;
}
function nn(e, t = !1) {
	if (!j) {
		var n = /* @__PURE__ */ en(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ tn(n) : n;
	}
	if (t) {
		if (M?.nodeType !== 3) {
			var r = $t();
			return M?.before(r), Ce(r), r;
		}
		sn(M);
	}
	return M;
}
function B(e, t = 1, n = !1) {
	let r = j ? M : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ tn(r);
	if (!j) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = $t();
			return r === null ? i?.after(a) : r.before(a), Ce(a), a;
		}
		sn(r);
	}
	return Ce(r), r;
}
function rn(e) {
	e.textContent = "";
}
function an() {
	return !1;
}
function on(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function sn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function cn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ln(e, t) {
	var n = W;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: Pe,
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
	if (e & 4) St === null ? Et.ensure().schedule(r) : St.push(r);
	else if (t !== null) {
		try {
			Zn(r);
		} catch (e) {
			throw H(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && cn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function un() {
	return U !== null && !Nn;
}
function dn(e) {
	let t = ln(8, null);
	return F(t, h), t.teardown = e, t;
}
function fn(e) {
	return ln(4 | w, e);
}
function pn(e) {
	Et.ensure();
	let t = ln(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? wn(t, () => {
			H(t), n(void 0);
		}) : (H(t), n(void 0));
	});
}
function mn(e) {
	return ln(4, e);
}
function hn(e) {
	return ln(ne | C, e);
}
function gn(e, t = 0) {
	return ln(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	nt(r, t, n, (t) => {
		ln(8, () => {
			e(...t.map(K));
		});
	});
}
function _n(e, t = 0) {
	return ln(16 | t, e);
}
function vn(e) {
	return ln(32 | C, e);
}
function yn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = jn, n = U;
		Mn(!0), Pn(null);
		try {
			t.call(null);
		} finally {
			Mn(e), Pn(n);
		}
	}
}
function bn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Xe(() => {
			e.abort(D);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : H(n, t), n = r;
	}
}
function xn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || H(t), t = n;
	}
}
function H(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Sn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, bn(e, t && !n), Xn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	yn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Cn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Sn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ tn(e);
		e.remove(), e = n;
	}
}
function Cn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function wn(e, t, n = !0) {
	var r = [];
	Tn(e, r, !0);
	var i = () => {
		n && H(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Tn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Tn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function En(e) {
	Dn(e, !0);
}
function Dn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (F(e, g), Et.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			Dn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function On(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ tn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var kn = null, An = !1, jn = !1;
function Mn(e) {
	jn = e;
}
var U = null, Nn = !1;
function Pn(e) {
	U = e;
}
var W = null;
function Fn(e) {
	W = e;
}
var In = null;
function Ln(e) {
	U !== null && (In ??= /* @__PURE__ */ new Set()).add(e);
}
var G = null, Rn = 0, zn = null;
function Bn(e) {
	zn = e;
}
var Vn = 1, Hn = 0, Un = Hn;
function Wn(e) {
	Un = e;
}
function Gn() {
	return ++Vn;
}
function Kn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~T), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Kn(a) && pt(a), a.wv > e.wv) return !0;
		}
		t & 512 && vt === null && F(e, h);
	}
	return !1;
}
function qn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(In !== null && In.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? qn(a, t, !1) : t === a && (n ? F(a, g) : a.f & 1024 && F(a, _), Nt(a));
	}
}
function Jn(e) {
	var t = G, n = Rn, r = zn, i = U, a = In, o = Pe, s = Nn, c = Un, l = e.f;
	G = null, Rn = 0, zn = null, U = l & 96 ? null : e, In = null, Fe(e.ctx), Nn = !1, Un = ++Hn, e.ac !== null && (Xe(() => {
		e.ac.abort(D);
	}), e.ac = null);
	try {
		e.f |= te;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = I?.is_fork;
		if (G !== null) {
			var m;
			if (p || Xn(e, Rn), f !== null && Rn > 0) for (f.length = Rn + G.length, m = 0; m < G.length; m++) f[Rn + m] = G[m];
			else e.deps = f = G;
			if (un() && e.f & 512) for (m = Rn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Rn < f.length && (Xn(e, Rn), f.length = Rn);
		if (Re() && zn !== null && !Nn && f !== null && !(e.f & 6146)) for (m = 0; m < zn.length; m++) qn(zn[m], e);
		if (i !== null && i !== e) {
			if (Hn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Hn;
			if (t !== null) for (let e of t) e.rv = Hn;
			zn !== null && (r === null ? r = zn : r.push(...zn));
		}
		return e.f & 8388608 && (e.f ^= re), d;
	} catch (e) {
		return He(e);
	} finally {
		e.f ^= te, G = t, Rn = n, zn = r, U = i, In = a, Fe(o), Nn = s, Un = c;
	}
}
function Yn(e, r) {
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
		s.f & 512 && (s.f ^= 512, s.f &= ~T), s.v !== A && Ge(s), s.ac !== null && Xe(() => {
			s.ac.abort(D), s.ac = null;
		}), mt(s), Xn(s, 0);
	}
}
function Xn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Yn(e, n[r]);
}
function Zn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		F(e, h);
		var n = W, r = An;
		W = e, An = (t & 96) == 0;
		try {
			t & 16777232 ? xn(e) : bn(e), yn(e);
			var i = Jn(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Vn;
		} finally {
			An = r, W = n;
		}
	}
}
async function Qn() {
	await Promise.resolve(), Dt();
}
function K(e) {
	var t = (e.f & 2) != 0;
	if (kn?.add(e), U !== null && !Nn && !(W !== null && W.f & 16384) && (In === null || !In.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < Hn && (e.rv = Hn, G === null && r !== null && r[Rn] === e ? Rn++ : G === null ? G = [e] : G.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (jn && Lt.has(e)) return Lt.get(e);
	if (t) {
		var a = e;
		if (jn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || er(a)) && (o = ft(a)), Lt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Nn && U !== null && (An || (U.f & 512) != 0), c = (a.f & b) === 0;
		Kn(a) && (s && (a.f |= 512), pt(a)), s && !c && (ht(a), $n(a));
	}
	if (vt?.has(e)) return vt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function $n(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (ht(t), $n(t));
}
function er(e) {
	if (e.v === A) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Lt.has(t) || t.f & 2 && er(t)) return !0;
	return !1;
}
function tr(e) {
	var t = Nn;
	try {
		return Nn = !0, e();
	} finally {
		Nn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var nr = ["touchstart", "touchmove"];
function rr(e) {
	return nr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var ir = Symbol("events"), ar = /* @__PURE__ */ new Set(), or = /* @__PURE__ */ new Set();
function sr(e) {
	if (!j) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function cr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || fr.call(t, e), !e.cancelBubble) return Xe(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Be(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function lr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && dn(() => {
		t.removeEventListener(e, o, a);
	});
}
function q(e, t, n) {
	(t[ir] ??= {})[e] = n;
}
function ur(e) {
	for (var t = 0; t < e.length; t++) ar.add(e[t]);
	for (var n of or) n(e);
}
var dr = null;
function fr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	dr = e;
	var s = 0, c = dr === e && e[ir];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[ir] = t;
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
		Pn(null), Fn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[ir]?.[r];
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
			e[ir] = t, delete e.currentTarget, Pn(d), Fn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var pr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function mr(e) {
	return pr?.createHTML(e) ?? e;
}
function hr(e) {
	var t = on("template");
	return t.innerHTML = mr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function gr(e, t) {
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
		if (j) return gr(M, null), M;
		i === void 0 && (i = hr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ en(i)));
		var t = r || Yt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ en(t), s = t.lastChild;
			gr(o, s);
		} else gr(t, t);
		return t;
	};
}
function Y(e, t) {
	if (j) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = M), we();
		return;
	}
	e !== null && e.before(t);
}
function X(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function _r(e, t) {
	return yr(e, t);
}
var vr = /* @__PURE__ */ new Map();
function yr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Qt();
	var l = void 0, u = pn(() => {
		var s = n ?? t.appendChild($t());
		et(s, { pending: () => {} }, (t) => {
			Ie({});
			var n = Pe;
			if (o && (n.c = o), a && (i.$$events = a), j && gr(t, null), l = e(t, i) || {}, j && (W.nodes.end = M, M === null || M.nodeType !== 8 || M.data !== "]")) throw ye(), ge;
			Le();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = rr(r);
					for (let e of [t, document]) {
						var a = vr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), vr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, fr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(ar)), or.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = vr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, fr), r.delete(e), r.size === 0 && vr.delete(n)) : r.set(e, i);
			}
			or.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return br.set(l, u), l;
}
var br = /* @__PURE__ */ new WeakMap(), xr = class {
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
			if (n) En(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (En(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
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
						On(r, t), t.append($t()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else H(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), wn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (H(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = an();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = $t();
			i.append(a), this.#n.set(e, {
				effect: vn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, vn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else j && (this.anchor = M), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Z(e, t, n = !1) {
	var r;
	j && (r = M, we());
	var i = new xr(e), a = n ? S : 0;
	function o(e, t) {
		if (j) {
			var n = De(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ee();
				Ce(a), i.anchor = a, Se(!1), i.ensure(e, t), Se(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	_n(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Sr(e, t) {
	return t;
}
function Cr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		wn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					wr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			rn(d), d.append(u), e.items.clear();
		}
		wr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function wr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ee, On(a, document.createDocumentFragment())) : H(t[i], n);
	}
}
var Tr;
function Er(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = j ? Ce(/* @__PURE__ */ en(u)) : u.appendChild($t());
	}
	j && we();
	var d = null, f = /* @__PURE__ */ ut(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Or(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, Ar(d, null, c)) : En(d) : wn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: _n(() => {
			p = K(f);
			var e = p.length;
			let t = !1;
			j && De(c) === "[!" != (e === 0) && (c = Ee(), Ce(c), Se(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = I, v = an(), y = 0; y < e; y += 1) {
				j && M.nodeType === 8 && M.data === "]" && (c = M, t = !0, Se(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Vt(S.v, b), S.i && Vt(S.i, y), v && u.unskip_effect(S.e)) : (S = kr(l, h ? c : Tr ??= $t(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = vn(() => s(c)) : (d = vn(() => s(Tr ??= $t())), d.f |= ee)), e > r.size && O("", "", ""), j && e > 0 && Ce(Ee()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Se(!0), K(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, j && (c = M);
}
function Dr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Or(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Dr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (En(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= ee, _ === l) Ar(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), jr(e, d, _), jr(e, _, y), Ar(_, y, n), d = _, p = [], m = [], l = Dr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ar(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					jr(e, S.prev, C.next), jr(e, d, S), jr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Ar(_, l, n), jr(e, _.prev, _.next), jr(e, _, d === null ? e.effect.first : d.next), jr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Dr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Dr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (wr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Dr(l.next);
		var T = w.length;
		if (T > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Cr(e, w, te);
		}
	}
	o && Be(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function kr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? zt(n) : /* @__PURE__ */ Bt(n, !1, !1) : null, l = o & 2 ? zt(i) : null;
	return {
		v: c,
		i: l,
		e: vn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ar(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ tn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function jr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Mr = [..." 	\n\r\f\xA0\v﻿"];
function Nr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Mr.includes(r[o - 1])) && (s === r.length || Mr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Pr(e, t, n, r, i, a) {
	var o = e[oe];
	if (j || o !== n || o === void 0) {
		var s = Nr(n, r, a);
		(!j || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Fr(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return be();
		for (var i of t.options) i.selected = n.includes(Lr(i));
		return;
	}
	for (i of t.options) if (qt(Lr(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Ir(e) {
	var t = new MutationObserver(() => {
		Fr(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), dn(() => {
		t.disconnect();
	});
}
function Lr(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Rr = Symbol("is custom element"), zr = Symbol("is html"), Br = ue ? "link" : "LINK", Vr = ue ? "progress" : "PROGRESS";
function Q(e) {
	if (j) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Ur(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Ur(e, "checked", null), e.checked = r;
				}
			}
		};
		e[le] = n, Be(n), Ye();
	}
}
function $(e, t) {
	var n = Wr(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Vr) || (e.value = t ?? "");
}
function Hr(e, t) {
	var n = Wr(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Ur(e, t, n, r) {
	var i = Wr(e);
	j && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Br) || i[t] !== (i[t] = n) && (t === "loading" && (e[E] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Kr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Wr(e) {
	return e[ae] ??= {
		[Rr]: e.nodeName.includes("-"),
		[zr]: e.namespaceURI === _e
	};
}
var Gr = /* @__PURE__ */ new Map();
function Kr(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Gr.get(t);
	if (n) return n;
	Gr.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function qr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Ze(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Jr(e) ? Yr(a) : a, n(a), I !== null && r.add(I), await Qn(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (j && e.defaultValue !== e.value || tr(t) == null && e.value) && (n(Jr(e) ? Yr(e.value) : e.value), I !== null && r.add(I)), gn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
			if (r.has(i)) return;
		}
		Jr(e) && n === Yr(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Jr(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Yr(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Xr(e, t) {
	return e === t || e?.[ie] === t;
}
function Zr(e = {}, t, n, r) {
	var i = Pe.r, a = W;
	return mn(() => {
		var o, s;
		return gn(() => {
			o = s, s = r?.() || [], tr(() => {
				Xr(n(...s), e) || (t(e, ...s), o && Xr(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Xr(n(...s), e) && t(null, ...s);
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
function Qr(e, t) {
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
function $r(e, t = {}) {
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
var ei = (e) => Math.round(e * 100) / 100;
function ti(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ni = {
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
					x: ei(r.x * 100 / e.columns),
					w: ei(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= ti(t.grid);
		return e;
	}
}, ri = { 1: (e) => (e.grid = ti(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function ii(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ri[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function ai(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ni[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region src/lib/imageTools.js
var oi = 1600, si = .82, ci = .6;
async function li(e) {
	let t = await createImageBitmap(e), n = Math.min(1, oi / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(si);
	return s.size > 4e5 && (s = await o(ci)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function ui(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function di(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var fi = /* @__PURE__ */ J("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), pi = /* @__PURE__ */ J("<option class=\"svelte-1n46o8q\"> </option>"), mi = /* @__PURE__ */ J("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\">💻</button> <button title=\"Mobilvisning (390px)\">📱</button></span>", 1), hi = /* @__PURE__ */ J("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"> </button>"), gi = /* @__PURE__ */ J("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), _i = /* @__PURE__ */ J("<span class=\"who svelte-1n46o8q\"> </span>"), vi = /* @__PURE__ */ J("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), yi = /* @__PURE__ */ J("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), bi = /* @__PURE__ */ J("<button> </button>"), xi = /* @__PURE__ */ J("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Si = /* @__PURE__ */ J("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Ci = /* @__PURE__ */ J("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>"), wi = /* @__PURE__ */ J("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button> <!></span></div>"), Ti = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Ei = /* @__PURE__ */ J("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Di = /* @__PURE__ */ J("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span></span> <select title=\"Hvor lenken går\" class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), Oi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <label class=\"svelte-1n46o8q\">Logo <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde (URL)</option></select></label> <input class=\"svelte-1n46o8q\"/> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div>"), ki = /* @__PURE__ */ J("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Ai = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Flater <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tekst <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksent <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), ji = /* @__PURE__ */ J("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Mi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Ni = /* @__PURE__ */ J("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Pi = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <p class=\"panel-hint svelte-1n46o8q\">Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Fi = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), Ii = /* @__PURE__ */ J("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label>", 1), Li = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Ri = /* @__PURE__ */ J("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> 📵 Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!>", 1), zi = /* @__PURE__ */ J("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Bi = /* @__PURE__ */ J("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunn og animasjoner kommer i neste steg av v0.5.</p>", 1), Vi = /* @__PURE__ */ J("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Hi = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Ui = /* @__PURE__ */ J("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p></div>"), Wi = /* @__PURE__ */ J("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Gi = /* @__PURE__ */ J("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Ki = /* @__PURE__ */ J("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), qi = /* @__PURE__ */ J("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Ji = /* @__PURE__ */ J("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Yi = /* @__PURE__ */ J("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!></div>");
function Xi(e, t) {
	Ie(t, !0);
	let n = /* @__PURE__ */ L(null), r = /* @__PURE__ */ L(null), i = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ L(""), o = /* @__PURE__ */ L("info"), s = 0;
	function c(e, t = "info") {
		R(a, e, !0), R(o, t, !0);
		let n = ++s;
		t === "ok" && setTimeout(() => {
			s === n && (R(a, ""), R(o, "info"));
		}, 8e3);
	}
	let l = /* @__PURE__ */ L(null), u = /* @__PURE__ */ L(null), d = /* @__PURE__ */ L(Gt({
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
	function C() {
		b?.sendSite(Me(K(x)));
	}
	let w = /* @__PURE__ */ new Set(), ee = () => K(x).pages.find((e) => e.id === K(r));
	function T() {
		let e = K(x)?.pages?.some((e) => !w.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		R(i, e || v?.hasDraft() && !w.has(K(r)) || y?.hasDraft() || !1, !0);
	}
	let te = [], ne = [], re = null;
	function ie() {
		return JSON.stringify({
			page: v.data,
			site: y.data
		});
	}
	function E(e) {
		e === re && (e.startsWith("edit:") || e === "grid") || (te.push(ie()), te.length > 50 && te.shift(), ne.length = 0, re = e);
	}
	function ae(e) {
		let { page: t, site: n } = JSON.parse(e);
		v.replace(t), y.replace(n), S(), v.save(), y.save(), R(d, {
			snap: !0,
			...K(x).grid
		}, !0), T(), g(), C(), K(x).pages.some((e) => e.id === K(r)) ? b?.sendPage(K(r), v.data) : Ne(K(x).pages[0].id);
	}
	function oe() {
		te.length && (ne.push(ie()), ae(te.pop()), re = null, c("Angret"));
	}
	function se() {
		ne.length && (te.push(ie()), ae(ne.pop()), re = null, c("Gjentatt"));
	}
	function ce(e) {
		if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
		let t = e.target;
		t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range"
		].includes(t.type)) || (e.preventDefault(), e.shiftKey ? se() : oe());
	}
	async function le() {
		R(n, ii(await (await fetch("/content/site.json")).json()), !0), y = Qr("urd-draft-site", () => K(n)), y.replace(ii(y.data)), y.save(), S(), R(d, {
			snap: !0,
			...K(x).grid
		}, !0), await Ne(new URLSearchParams(location.search).get("page") ?? K(x).pages[0].id), await ke();
	}
	let D = /* @__PURE__ */ L(null), ue = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Grid",
		"Historikk"
	];
	function de(e) {
		R(D, K(D) === e ? null : e, !0), b?.sendShowGrid(K(D) === "Grid");
	}
	let O = /* @__PURE__ */ L(null);
	function fe(e, t) {
		let n = v?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function pe() {
		if (!K(O)) return;
		let { block: e } = fe(K(O).sectionId, K(O).blockId);
		if (!e) {
			R(O, null);
			return;
		}
		R(O, {
			sectionId: K(O).sectionId,
			blockId: K(O).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop }
		}, !0);
	}
	function me(e) {
		if (!e.blockId) {
			R(O, null);
			return;
		}
		R(O, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), pe();
	}
	function he(e, t) {
		let { section: n, block: i } = fe(K(O)?.sectionId, K(O)?.blockId);
		i && (E(e), t(i, n), _(n, "blokk-endret"), v.save(), T(), b?.sendSection(K(r), n), pe());
	}
	function k(e, t) {
		he(`edit:${K(O).blockId}`, (n) => {
			n.props[e] = t;
		});
	}
	function ge(e, t) {
		Number.isFinite(t) && he(`edit:frame-${K(O).blockId}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function A(e) {
		he("decor", (t) => {
			t.decor = e;
		});
	}
	async function _e(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await li(t);
			he(`edit:${K(O).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ui(t.name).replaceAll("-", " ");
			});
		} catch {
			c("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let ve = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form"
	}, ye = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], be = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], xe = /* @__PURE__ */ L(null), j = /* @__PURE__ */ L(null), Se = /* @__PURE__ */ L("");
	function M(e) {
		R(xe, e.sectionId, !0);
		let t = v?.data.sections.find((t) => t.id === e.sectionId);
		R(j, t?.grid ? { ...t.grid } : null, !0), R(Se, t?.size?.minHeight ?? "", !0);
	}
	function Ce(e) {
		let t = v.data.sections.find((e) => e.id === K(xe));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let i = /^\d+$/.test(n) ? `${n}px` : n;
		E("section-size"), t.size = {
			...t.size,
			minHeight: i
		}, R(Se, i, !0), v.save(), T(), b?.sendSection(K(r), t);
	}
	function we() {
		return v.data.sections.find((e) => e.id === K(xe)) ?? v.data.sections[0];
	}
	function Ee(e) {
		let t = v.data.sections.find((e) => e.id === K(xe));
		t && (E("grid"), t.grid = e ? { ...y.data.grid } : null, R(j, t.grid ? { ...t.grid } : null, !0), v.save(), T(), b?.sendSection(K(r), t), K(D) === "Grid" && b?.sendShowGrid(!0));
	}
	function De(e, t) {
		let n = v.data.sections.find((e) => e.id === K(xe));
		n?.grid && (E("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, R(j, { ...n.grid }, !0), v.save(), T(), b?.sendSection(K(r), n), K(D) === "Grid" && b?.sendShowGrid(!0));
	}
	function Oe(e, t) {
		E("grid"), R(d, {
			...K(d),
			[e]: t
		}, !0), y.data.grid = {
			...y.data.grid,
			[e]: t
		}, y.save(), T(), C(), K(D) === "Grid" && b?.sendShowGrid(!0);
	}
	async function ke() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? R(u, await e.json(), !0) : e.status !== 503 && R(u, null);
		} catch {
			R(u, null);
		}
	}
	let Ae = null;
	function je(e) {
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
	async function Ne(e) {
		R(r, e, !0), Ae = (async () => {
			let t = ee(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = ai(await e.json(), y.data));
			} catch {}
			n ? w.delete(e) : n = je(t), v = Qr(`urd-draft-${e}`, () => n), v.replace(ai(v.data, y.data)), v.save(), te.length = 0, ne.length = 0, re = null, R(xe, null), R(j, null), T(), g(), R(a, "");
		})(), await Ae;
	}
	function Pe() {
		b?.destroy(), b = $r(K(l), {
			onEdit: it,
			onMove: at,
			onDelete: ht,
			onAddSection: dt,
			onMoveSection: ft,
			onDeleteSection: pt,
			onSectionSize: mt,
			onUndo: (e) => e.redo ? se() : oe(),
			onSelectSection: M,
			onSelectBlock: me,
			onReady: Fe,
			onNavigate: Re,
			onAddBlock: (e) => vt(e.sectionId, e.block),
			onMobileManual: ot,
			onMobileAuto: st,
			onReviewDone: ct,
			onBlockFlag: ut
		});
	}
	async function Fe() {
		await Ae, y.hasDraft() && C();
		let e = !K(n).pages.some((e) => e.id === K(r));
		(v.hasDraft() || e) && b?.sendPage(K(r), v.data), K(f) || b?.sendChrome(!1), K(D) === "Grid" && b?.sendShowGrid(!0);
	}
	function Re(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = K(x).pages.find((e) => e.path === t);
		n && n.id !== K(r) && Ne(n.id);
	}
	function P(e, t) {
		E(e), t(), y.save(), T(), C();
	}
	let ze = /* @__PURE__ */ L(""), Be = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Ve(e, t = null) {
		return e ? Be.includes(e) ? `«${e}» er et reservert navn` : K(x).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function He() {
		let e = K(ze).trim(), t = ui(e), n = Ve(t);
		if (n) {
			c(n, "error");
			return;
		}
		P("pages", () => {
			K(x).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), K(x).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(je({
			id: t,
			title: e
		}))), T(), R(ze, ""), Ne(t);
	}
	function Ue(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let i = e.title;
		P("pages", () => {
			e.title = n;
			for (let t of K(x).nav.items) t.page === e.id && t.label === i && (t.label = n);
		}), e.id === K(r) ? (v.data.meta.title = n, v.save(), T()) : We(e, (e) => {
			e.meta.title = n;
		});
	}
	async function We(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = ai(await t.json(), y.data));
		} catch {}
		r ||= je(e), t(r), localStorage.setItem(n, JSON.stringify(r)), T();
	}
	function F(e, t) {
		let n = ui(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Ve(n, e.id);
		if (r) {
			c(r, "error");
			return;
		}
		P("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Ge(e) {
		e.path !== "/" && (P("pages", () => {
			K(x).pages = K(x).pages.filter((t) => t.id !== e.id), K(x).nav.items = K(x).nav.items.filter((t) => t.page !== e.id);
		}), e.id === K(r) && Ne(K(x).pages[0].id), c("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Ke(e) {
		P("edit:nav-logo", () => {
			K(x).nav.logo = {
				type: "text",
				value: "",
				...K(x).nav.logo,
				...e
			};
		});
	}
	function qe(e, t) {
		P(`edit:nav-label-${e}`, () => {
			K(x).nav.items[e].label = t;
		});
	}
	function Je(e, t) {
		P("nav", () => {
			let n = K(x).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function Ye(e, t) {
		P(`edit:nav-href-${e}`, () => {
			K(x).nav.items[e].href = t;
		});
	}
	function Xe(e, t) {
		let n = e + t, r = K(x).nav.items;
		n < 0 || n >= r.length || P("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Ze(e) {
		P("nav", () => {
			K(x).nav.items.splice(e, 1);
		});
	}
	function Qe() {
		P("nav", () => {
			K(x).nav.items.push({
				label: "Lenke",
				page: K(x).pages[0].id
			});
		});
	}
	let $e = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function et(e, t) {
		P(`edit:theme-color-${e}`, () => {
			K(x).theme.tokens.color[e] = t;
		});
	}
	function tt(e, t) {
		P("theme", () => {
			K(x).theme.tokens.font[e] = t;
		});
	}
	function nt(e, t) {
		P("theme", () => {
			K(x).theme.tokens.radius[e] = t;
		});
	}
	function rt() {
		R(f, !K(f)), b?.sendChrome(K(f));
	}
	function it(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E(`edit:${e.blockId}`), t.props = e.props, v.save(), T(), K(O)?.blockId === e.blockId && pe(), R(a, ""));
	}
	function at(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		E(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && _(t, "desktop-endret-etter-mobil"), v.save(), T(), K(O)?.blockId === e.blockId && pe();
	}
	function ot(e) {
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
			}, v.save(), T();
		}
	}
	function st(e) {
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
			}, v.save(), T(), g(), b?.sendSection(K(r), t);
		}
	}
	function ct(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (E("review-done"), t.responsive.mobile.attention = null, v.save(), T(), g());
	}
	function ut(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E("decor"), t.decor = e.decor, v.save(), T(), K(O)?.blockId === e.blockId && pe());
	}
	function dt(e) {
		E("add-section"), v.data.sections.splice(e.index, 0, e.section), v.save(), T(), b?.sendPage(K(r), v.data);
	}
	function ft(e) {
		let t = v.data.sections, n = t.findIndex((t) => t.id === e.sectionId), i = n + e.dir;
		n < 0 || i < 0 || i >= t.length || (E("move-section"), [t[n], t[i]] = [t[i], t[n]], v.save(), T(), b?.sendPage(K(r), v.data));
	}
	function pt(e) {
		E("delete-section"), e.sectionId === K(xe) && (R(xe, null), R(j, null)), v.data.sections = v.data.sections.filter((t) => t.id !== e.sectionId), v.save(), T(), b?.sendPage(K(r), v.data);
	}
	function mt(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t && (E("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === K(xe) && R(Se, e.minHeight, !0), v.save(), T());
	}
	function ht(e) {
		let t = v.data.sections.find((t) => t.id === e.sectionId);
		t && (E("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), K(O)?.blockId === e.blockId && R(O, null), _(t, "blokk-slettet"), v.save(), T(), b?.sendSection(K(r), t));
	}
	let gt = {
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
	function I(e) {
		let t = gt[e];
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
	function _t(e) {
		b ? b.sendPlaceBlock(e) : vt(we()?.id, e);
	}
	function vt(e, t) {
		let n = v.data.sections.find((t) => t.id === e) ?? v.data.sections[0];
		n && (E("add-block"), n.blocks.push(t), _(n, "blokk-lagt-til"), v.save(), T(), b?.sendSection(K(r), n));
	}
	function yt(e) {
		_t(I(e));
	}
	async function bt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		c("Komprimerer bildet…");
		let n;
		try {
			n = await li(t);
		} catch {
			c("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (K(l)?.clientWidth ?? 1280));
		_t({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ui(t.name).replaceAll("-", " "),
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
	function xt(e) {
		let t = [];
		for (let n of e.sections) for (let e of n.blocks) {
			if (e.type !== "image" || !e.props.src?.startsWith("data:image/")) continue;
			let n = e.props.src.split(",", 2)[1], r = `media/${ui(e.props.alt || "bilde")}-${di(n)}.webp`;
			t.push({
				path: r,
				content: n,
				encoding: "base64"
			}), e.props.src = `/${r}`;
		}
		return t;
	}
	function St() {
		E("discard");
		let e = v.reset();
		y.reset(), S(), R(d, {
			snap: !0,
			...K(x).grid
		}, !0), T(), R(a, ""), C(), K(x).pages.some((e) => e.id === K(r)) ? b?.sendPage(K(r), e) : Ne(K(x).pages[0].id);
	}
	async function Ct() {
		c("Publiserer…");
		let e = [], t = [], i = [], a = [];
		for (let o of K(x).pages) {
			let s = `urd-draft-${o.id}`, c = w.has(o.id) || !K(n).pages.some((e) => e.id === o.id), l = null;
			if (o.id === K(r) && (v.hasDraft() || c)) l = v.data;
			else if (o.id !== K(r)) {
				let e = localStorage.getItem(s);
				if (e) try {
					l = ai(JSON.parse(e), y.data);
				} catch {}
			}
			!l && c && (l = je(o)), l && (e.push(...xt(l)), e.push({
				path: o.file,
				content: JSON.stringify(l, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(o.title), c ? a.push(o.id) : i.push(s));
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
			for (let e of a) w.add(e);
			R(n, JSON.parse(JSON.stringify(K(x))), !0), y = Qr("urd-draft-site", () => K(n)), S(), R(d, {
				snap: !0,
				...K(x).grid
			}, !0);
			let e = JSON.parse(JSON.stringify(v.data));
			v = Qr(`urd-draft-${K(r)}`, () => e), w.has(K(r)) && localStorage.setItem(`urd-draft-${K(r)}`, JSON.stringify(e)), T(), c("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (s?.status === 401) {
			let e = (await s.json().catch(() => null))?.error;
			c(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await ke();
		} else s?.status === 403 ? c((await s.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c(s ? (await s.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	le();
	var wt = Yi();
	lr("keydown", Jt, ce);
	var Tt = z(wt), Et = (e) => {
		var t = fi();
		q("click", t, rt), Y(e, t);
	};
	Z(Tt, (e) => {
		K(f) || e(Et);
	});
	var Dt = B(Tt, 2);
	let Ot;
	var kt = z(Dt), At = B(z(kt), 2), jt = (e) => {
		var t = mi(), n = nn(t);
		Er(n, 21, () => K(x).pages, (e) => e.id, (e, t) => {
			var n = pi(), r = z(n, !0);
			N(n);
			var i = {};
			V(() => {
				X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
			}), Y(e, n);
		}), N(n);
		var i;
		Ir(n);
		var a = B(n, 2), o = z(a);
		let s;
		var c = B(o, 2);
		let l;
		N(a), V(() => {
			i !== (i = K(r)) && (n.value = (n.__value = K(r)) ?? "", Fr(n, K(r))), s = Pr(o, 1, "ghost svelte-1n46o8q", null, s, { active: K(p) === "desktop" }), l = Pr(c, 1, "ghost svelte-1n46o8q", null, l, { active: K(p) === "mobile" });
		}), q("change", n, (e) => Ne(e.target.value)), q("click", o, () => R(p, "desktop")), q("click", c, () => R(p, "mobile")), Y(e, t);
	};
	Z(At, (e) => {
		K(n) && e(jt);
	});
	var Mt = B(At, 2), Nt = (e) => {
		var t = hi(), n = z(t);
		N(t), V(() => X(n, `📱 ${K(h) ?? ""} ${K(h) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), q("click", t, () => R(p, "mobile")), Y(e, t);
	};
	Z(Mt, (e) => {
		K(h) > 0 && e(Nt);
	});
	var Pt = B(Mt, 2), Ft = (e) => {
		Y(e, gi());
	};
	Z(Pt, (e) => {
		K(i) && e(Ft);
	}), N(kt);
	var It = B(kt, 2), Lt = z(It), Rt = (e) => {
		var t = yi(), n = nn(t), r = z(n, !0);
		N(n);
		var a = B(n, 2), o = (e) => {
			var t = _i(), n = z(t);
			N(t), V(() => {
				Ur(t, "title", K(u).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), X(n, `${K(u).allowed ? "" : "⚠ "}${K(u).login ?? ""}`);
			}), Y(e, t);
		}, s = (e) => {
			Y(e, vi());
		};
		Z(a, (e) => {
			K(u)?.loggedIn ? e(o) : K(u) && e(s, 1);
		});
		var c = B(a, 2), l = B(c, 2), d = B(l, 2);
		V((e) => {
			Ur(n, "title", K(f) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), X(r, K(f) ? "👁 Ren visning" : "✏ Rediger"), Ur(c, "href", e), l.disabled = !K(i), d.disabled = !K(i);
		}, [() => ee().path]), q("click", n, rt), q("click", l, St), q("click", d, Ct), Y(e, t);
	};
	Z(Lt, (e) => {
		K(n) && e(Rt);
	}), N(It), N(Dt);
	var zt = B(Dt, 2), Bt = (e) => {
		var t = Ki(), n = z(t), i = (e) => {
			var t = Gi(), n = nn(t);
			Er(n, 21, () => ue, Sr, (e, t) => {
				var n = bi();
				let r;
				var i = z(n, !0);
				N(n), V(() => {
					r = Pr(n, 1, "svelte-1n46o8q", null, r, { active: K(D) === K(t) }), X(i, K(t));
				}), q("click", n, () => de(K(t))), Y(e, n);
			}), N(n);
			var i = B(n, 2), a = (e) => {
				var t = Wi(), n = z(t), i = z(n, !0);
				N(n);
				var a = B(n, 2), o = (e) => {
					var t = Ti(), n = B(z(t), 2);
					Er(n, 17, () => K(x).pages, (e) => e.id, (e, t) => {
						var n = wi();
						let i;
						var a = z(n);
						Q(a);
						var o = B(a, 2), s = (e) => {
							Y(e, xi());
						}, c = (e) => {
							var n = Si();
							Q(n), V((e) => $(n, e), [() => K(t).path.slice(1)]), q("change", n, (e) => F(K(t), e.target.value)), Y(e, n);
						};
						Z(o, (e) => {
							K(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = B(o, 2), u = z(l), d = B(u, 2), f = (e) => {
							var n = Ci();
							q("click", n, () => Ge(K(t))), Y(e, n);
						};
						Z(d, (e) => {
							K(t).path !== "/" && e(f);
						}), N(l), N(n), V(() => {
							i = Pr(n, 1, "page-row svelte-1n46o8q", null, i, { current: K(t).id === K(r) }), $(a, K(t).title), u.disabled = K(t).id === K(r);
						}), q("change", a, (e) => Ue(K(t), e.target.value)), q("click", u, () => Ne(K(t).id)), Y(e, n);
					});
					var i = B(n, 4);
					Q(i);
					var a = B(i, 2);
					Te(2), N(t), V((e) => a.disabled = e, [() => !K(ze).trim()]), q("keydown", i, (e) => e.key === "Enter" && He()), qr(i, () => K(ze), (e) => R(ze, e)), q("click", a, He), Y(e, t);
				}, s = (e) => {
					var t = Oi(), n = B(z(t), 2), r = B(z(n)), i = z(r);
					i.value = i.__value = "text";
					var a = B(i);
					a.value = a.__value = "image", N(r);
					var o;
					Ir(r), N(n);
					var s = B(n, 2);
					Q(s);
					var c = B(s, 4);
					Er(c, 17, () => K(x).nav.items, Sr, (e, t, n) => {
						var r = Di(), i = z(r), a = z(i);
						Q(a);
						var o = B(a, 2), s = z(o);
						s.disabled = n === 0;
						var c = B(s, 2), l = B(c, 2);
						N(o), N(i);
						var u = B(i, 2), d = z(u);
						Er(d, 17, () => K(x).pages, (e) => e.id, (e, t) => {
							var n = pi(), r = z(n, !0);
							N(n);
							var i = {};
							V(() => {
								X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
							}), Y(e, n);
						});
						var f = B(d);
						f.value = f.__value = "__href", N(u);
						var p;
						Ir(u);
						var m = B(u, 2), h = (e) => {
							var r = Ei();
							Q(r), V(() => $(r, K(t).href ?? "")), q("change", r, (e) => Ye(n, e.target.value)), Y(e, r);
						};
						Z(m, (e) => {
							K(t).page || e(h);
						}), N(r), V(() => {
							$(a, K(t).label), c.disabled = n === K(x).nav.items.length - 1, p !== (p = K(t).page ?? "__href") && (u.value = (u.__value = K(t).page ?? "__href") ?? "", Fr(u, K(t).page ?? "__href"));
						}), q("input", a, (e) => qe(n, e.target.value)), q("click", s, () => Xe(n, -1)), q("click", c, () => Xe(n, 1)), q("click", l, () => Ze(n)), q("change", u, (e) => Je(n, e.target.value)), Y(e, r);
					});
					var l = B(c, 2);
					N(t), V(() => {
						o !== (o = K(x).nav.logo?.type ?? "text") && (r.value = (r.__value = K(x).nav.logo?.type ?? "text") ?? "", Fr(r, K(x).nav.logo?.type ?? "text")), $(s, K(x).nav.logo?.value ?? ""), Ur(s, "placeholder", K(x).nav.logo?.type === "image" ? "/media/logo.webp" : "Navnet i menyen");
					}), q("change", r, (e) => Ke({ type: e.target.value })), q("input", s, (e) => Ke({ value: e.target.value })), q("click", l, Qe), Y(e, t);
				}, c = (e) => {
					var t = Ai(), n = B(z(t), 2), r = B(z(n));
					Q(r), N(n);
					var i = B(n, 2), a = B(z(i));
					Q(a), N(i);
					var o = B(i, 2), s = B(z(o));
					Q(s), N(o);
					var c = B(o, 2), l = B(z(c));
					Q(l), N(c);
					var u = B(c, 4), d = B(z(u)), f = z(d), p = (e) => {
						var t = ki(), n = {};
						V(() => {
							n !== (n = K(x).theme.tokens.font.heading) && (t.value = (t.__value = K(x).theme.tokens.font.heading) ?? "");
						}), Y(e, t);
					}, h = /* @__PURE__ */ lt(() => !$e.some(([, e]) => e === K(x).theme.tokens.font.heading));
					Z(f, (e) => {
						K(h) && e(p);
					}), Er(B(f), 17, () => $e, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ lt(() => m(K(t), 2));
						let r = () => K(n)[0], i = () => K(n)[1];
						var a = pi(), o = z(a, !0);
						N(a);
						var s = {};
						V(() => {
							X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), Y(e, a);
					}), N(d);
					var g;
					Ir(d), N(u);
					var _ = B(u, 2), v = B(z(_)), y = z(v), b = (e) => {
						var t = ki(), n = {};
						V(() => {
							n !== (n = K(x).theme.tokens.font.body) && (t.value = (t.__value = K(x).theme.tokens.font.body) ?? "");
						}), Y(e, t);
					}, S = /* @__PURE__ */ lt(() => !$e.some(([, e]) => e === K(x).theme.tokens.font.body));
					Z(y, (e) => {
						K(S) && e(b);
					}), Er(B(y), 17, () => $e, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ lt(() => m(K(t), 2));
						let r = () => K(n)[0], i = () => K(n)[1];
						var a = pi(), o = z(a, !0);
						N(a);
						var s = {};
						V(() => {
							X(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), Y(e, a);
					}), N(v);
					var C;
					Ir(v), N(_);
					var w = B(_, 4), ee = B(z(w));
					Q(ee), N(w);
					var T = B(w, 2), te = B(z(T));
					Q(te), N(T), N(t), V(() => {
						$(r, K(x).theme.tokens.color.bg), $(a, K(x).theme.tokens.color.surface), $(s, K(x).theme.tokens.color.text), $(l, K(x).theme.tokens.color.accent), g !== (g = K(x).theme.tokens.font.heading) && (d.value = (d.__value = K(x).theme.tokens.font.heading) ?? "", Fr(d, K(x).theme.tokens.font.heading)), C !== (C = K(x).theme.tokens.font.body) && (v.value = (v.__value = K(x).theme.tokens.font.body) ?? "", Fr(v, K(x).theme.tokens.font.body)), $(ee, K(x).theme.tokens.radius.sm), $(te, K(x).theme.tokens.radius.md);
					}), q("input", r, (e) => et("bg", e.target.value)), q("input", a, (e) => et("surface", e.target.value)), q("input", s, (e) => et("text", e.target.value)), q("input", l, (e) => et("accent", e.target.value)), q("change", d, (e) => tt("heading", e.target.value)), q("change", v, (e) => tt("body", e.target.value)), q("change", ee, (e) => nt("sm", e.target.value)), q("change", te, (e) => nt("md", e.target.value)), Y(e, t);
				}, l = (e) => {
					var t = ji();
					let n;
					var r = B(z(t), 2), i = B(z(r), 2), a = z(i), o = B(a, 2);
					N(i), N(r);
					var s = B(r, 2), c = B(s, 2), l = B(z(c));
					N(c);
					var u = B(c, 2), d = B(z(u), 2), f = z(d), m = B(f, 2), h = B(m, 2), g = B(h, 2), _ = B(g, 2);
					N(d), N(u), N(t), V(() => {
						n = Pr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: K(p) === "mobile" }), Ur(t, "title", K(p) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), q("click", a, () => yt("text")), q("click", o, () => yt("text-box")), q("click", s, () => yt("button")), q("change", l, bt), q("click", f, () => yt("shape-line")), q("click", m, () => yt("shape-arrow")), q("click", h, () => yt("shape-circle")), q("click", g, () => yt("shape-rect")), q("click", _, () => yt("shape-triangle")), Y(e, t);
				}, u = (e) => {
					var t = Mi(), n = B(z(t), 2), r = B(z(n)), i = z(r);
					N(r), N(n);
					var a = B(n, 2);
					Q(a);
					var o = B(a, 2), s = z(o);
					Q(s), Te(), N(o), Te(2), N(t), V(() => {
						X(i, `${K(d).size ?? ""} px`), $(a, K(d).size), Hr(s, K(d).snap !== !1);
					}), q("input", a, (e) => Oe("size", Number(e.target.value))), q("change", s, (e) => Oe("snap", e.target.checked)), Y(e, t);
				}, f = (e) => {
					var t = Hi(), n = z(t), r = (e) => {
						var t = Ri(), n = nn(t), r = z(n);
						N(n);
						var i = B(n, 2), a = (e) => {
							var t = Ni(), n = z(t), r = B(z(n));
							Q(r), N(n);
							var i = B(n, 2), a = B(z(i));
							Q(a), N(i);
							var o = B(i, 2), s = B(z(o));
							Q(s), N(o);
							var c = B(o, 2), l = B(z(c));
							Q(l), N(c);
							var u = B(c, 2), d = B(z(u));
							Q(d), N(u);
							var f = B(u, 2), p = B(z(f));
							Q(p), N(f), N(t), V(() => {
								$(r, K(O).frame.x), $(a, K(O).frame.y), $(s, K(O).frame.w), $(l, K(O).frame.h), $(d, K(O).frame.z ?? 1), $(p, K(O).frame.rot ?? 0);
							}), q("change", r, (e) => ge("x", Number(e.target.value))), q("change", a, (e) => ge("y", Number(e.target.value))), q("change", s, (e) => ge("w", Number(e.target.value))), q("change", l, (e) => ge("h", Number(e.target.value))), q("change", d, (e) => ge("z", Number(e.target.value))), q("change", p, (e) => ge("rot", Number(e.target.value))), Y(e, t);
						};
						Z(i, (e) => {
							K(p) === "desktop" && e(a);
						});
						var o = B(i, 2), s = z(o);
						Q(s), Te(), N(o);
						var c = B(o, 4), l = (e) => {
							var t = Pi(), n = nn(t), r = B(z(n)), i = z(r);
							i.value = i.__value = "left";
							var a = B(i);
							a.value = a.__value = "center";
							var o = B(a);
							o.value = o.__value = "right", N(r);
							var s;
							Ir(r), N(n);
							var c = B(n, 2), l = z(c);
							Q(l), Te(), N(c), Te(2), V((e) => {
								s !== (s = K(O).props.align ?? "left") && (r.value = (r.__value = K(O).props.align ?? "left") ?? "", Fr(r, K(O).props.align ?? "left")), Hr(l, e);
							}, [() => !!K(O).props.box]), q("change", r, (e) => k("align", e.target.value)), q("change", l, (e) => k("box", e.target.checked)), Y(e, t);
						}, u = (e) => {
							var t = Fi(), n = nn(t), r = B(z(n));
							Q(r), N(n);
							var i = B(n, 2), a = B(z(i)), o = z(a);
							Er(o, 17, () => K(x).pages, (e) => e.id, (e, t) => {
								var n = pi(), r = z(n, !0);
								N(n);
								var i = {};
								V(() => {
									X(r, K(t).title), i !== (i = K(t).id) && (n.value = (n.__value = K(t).id) ?? "");
								}), Y(e, n);
							});
							var s = B(o);
							s.value = s.__value = "__href", N(a);
							var c;
							Ir(a), N(i);
							var l = B(i, 2), u = (e) => {
								var t = Ei();
								Q(t), V(() => $(t, K(O).props.href ?? "")), q("change", t, (e) => k("href", e.target.value)), Y(e, t);
							};
							Z(l, (e) => {
								K(O).props.page || e(u);
							});
							var d = B(l, 2), f = B(z(d)), p = z(f);
							p.value = p.__value = "primary";
							var m = B(p);
							m.value = m.__value = "secondary", N(f);
							var h;
							Ir(f), N(d), V(() => {
								$(r, K(O).props.label), c !== (c = K(O).props.page ?? "__href") && (a.value = (a.__value = K(O).props.page ?? "__href") ?? "", Fr(a, K(O).props.page ?? "__href")), h !== (h = K(O).props.style) && (f.value = (f.__value = K(O).props.style) ?? "", Fr(f, K(O).props.style));
							}), q("change", r, (e) => k("label", e.target.value)), q("change", a, (e) => {
								e.target.value === "__href" ? he(`edit:${K(O).blockId}`, (e) => {
									e.props.page = null, e.props.href = e.props.href ?? "https://";
								}) : he(`edit:${K(O).blockId}`, (t) => {
									t.props.page = e.target.value, t.props.href = null;
								});
							}), q("change", f, (e) => k("style", e.target.value)), Y(e, t);
						}, d = (e) => {
							var t = Ii(), n = nn(t), r = B(z(n));
							N(n);
							var i = B(n, 2), a = B(z(i));
							Q(a), N(i);
							var o = B(i, 2), s = B(z(o)), c = z(s);
							c.value = c.__value = "cover";
							var l = B(c);
							l.value = l.__value = "contain", N(s);
							var u;
							Ir(s), N(o);
							var d = B(o, 2), f = B(z(d)), p = z(f);
							p.value = p.__value = "";
							var m = B(p);
							m.value = m.__value = "sm";
							var h = B(m);
							h.value = h.__value = "md", N(f);
							var g;
							Ir(f), N(d);
							var _ = B(d, 2), v = B(z(_));
							Q(v), N(_), V(() => {
								$(a, K(O).props.alt ?? ""), u !== (u = K(O).props.fit ?? "cover") && (s.value = (s.__value = K(O).props.fit ?? "cover") ?? "", Fr(s, K(O).props.fit ?? "cover")), g !== (g = K(O).props.radius ?? "") && (f.value = (f.__value = K(O).props.radius ?? "") ?? "", Fr(f, K(O).props.radius ?? "")), $(v, K(O).props.href ?? "");
							}), q("change", r, _e), q("change", a, (e) => k("alt", e.target.value)), q("change", s, (e) => k("fit", e.target.value)), q("change", f, (e) => k("radius", e.target.value || null)), q("change", v, (e) => k("href", e.target.value || null)), Y(e, t);
						}, f = (e) => {
							var t = Li(), n = nn(t), r = B(z(n));
							Er(r, 21, () => ye, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ lt(() => m(K(t), 2));
								let r = () => K(n)[0], i = () => K(n)[1];
								var a = pi(), o = z(a, !0);
								N(a);
								var s = {};
								V(() => {
									X(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), Y(e, a);
							}), N(r);
							var i;
							Ir(r), N(n);
							var a = B(n, 2), o = B(z(a));
							Er(o, 21, () => be, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ lt(() => m(K(t), 2));
								let r = () => K(n)[0], i = () => K(n)[1];
								var a = pi(), o = z(a, !0);
								N(a);
								var s = {};
								V(() => {
									X(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), Y(e, a);
							}), N(o);
							var s;
							Ir(o), N(a);
							var c = B(a, 2), l = B(z(c));
							Q(l), N(c);
							var u = B(c, 2), d = z(u);
							Q(d), Te(), N(u), V((e) => {
								i !== (i = K(O).props.kind) && (r.value = (r.__value = K(O).props.kind) ?? "", Fr(r, K(O).props.kind)), s !== (s = K(O).props.color) && (o.value = (o.__value = K(O).props.color) ?? "", Fr(o, K(O).props.color)), $(l, K(O).props.thickness), Hr(d, e);
							}, [() => !!K(O).props.fill]), q("change", r, (e) => k("kind", e.target.value)), q("change", o, (e) => k("color", e.target.value)), q("change", l, (e) => k("thickness", Number(e.target.value))), q("change", d, (e) => k("fill", e.target.checked ? K(O).props.color : null)), Y(e, t);
						};
						Z(c, (e) => {
							K(O).type === "text" ? e(l) : K(O).type === "button" ? e(u, 1) : K(O).type === "image" ? e(d, 2) : K(O).type === "shape" && e(f, 3);
						}), V(() => {
							X(r, `${ve[K(O).type] ?? K(O).type ?? ""}-blokk`), Hr(s, K(O).decor);
						}), q("change", s, (e) => A(e.target.checked)), Y(e, t);
					}, i = (e) => {
						var t = Bi(), n = B(nn(t), 2), r = B(z(n));
						Q(r), N(n);
						var i = B(n, 6), a = z(i);
						Q(a), Te(), N(i);
						var o = B(i, 2), s = (e) => {
							var t = zi(), n = nn(t), r = B(z(n)), i = z(r);
							N(r), N(n);
							var a = B(n, 2);
							Q(a), V(() => {
								X(i, `${K(j).size ?? ""} px`), $(a, K(j).size);
							}), q("input", a, (e) => De("size", Number(e.target.value))), Y(e, t);
						};
						Z(o, (e) => {
							K(j) && e(s);
						}), Te(2), V(() => {
							$(r, K(Se)), Hr(a, K(j) !== null);
						}), q("change", r, (e) => Ce(e.target.value)), q("change", a, (e) => Ee(e.target.checked)), Y(e, t);
					}, a = (e) => {
						Y(e, Vi());
					};
					Z(n, (e) => {
						K(O) ? e(r) : K(xe) ? e(i, 1) : e(a, -1);
					}), N(t), Y(e, t);
				}, h = (e) => {
					var t = Ui(), n = z(t), r = z(n);
					N(n), N(t), V(() => X(r, `${K(D) ?? ""}-panelet kommer i en senere del av v0.5.`)), Y(e, t);
				};
				Z(a, (e) => {
					K(D) === "Sider" ? e(o) : K(D) === "Nav" ? e(s, 1) : K(D) === "Tema" ? e(c, 2) : K(D) === "Blokker" ? e(l, 3) : K(D) === "Grid" ? e(u, 4) : K(D) === "Egenskaper" ? e(f, 5) : e(h, -1);
				}), N(t), V(() => X(i, K(D))), Y(e, t);
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
		Zr(s, (e) => R(l, e), () => K(l)), N(a), N(t), V(() => {
			o = Pr(a, 1, "frame-wrap svelte-1n46o8q", null, o, { mobile: K(p) === "mobile" }), Ur(s, "src", `/?page=${K(r)}&preview=1`);
		}), lr("load", s, Pe), sr(s), Y(e, t);
	}, Vt = (e) => {
		Y(e, qi());
	};
	Z(zt, (e) => {
		K(n) ? e(Bt) : e(Vt, -1);
	});
	var Ht = B(zt, 2), Ut = (e) => {
		var t = Ji();
		let n;
		var r = z(t), i = z(r, !0);
		N(r);
		var s = B(r, 2);
		N(t), V(() => {
			n = Pr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: K(o) === "ok",
				error: K(o) === "error"
			}), X(i, K(a));
		}), q("click", s, () => c("")), Y(e, t);
	};
	Z(Ht, (e) => {
		K(a) && e(Ut);
	}), N(wt), V(() => Ot = Pr(Dt, 1, "topbar svelte-1n46o8q", null, Ot, { hidden: !K(f) })), Y(e, wt), Le();
}
ur([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var Zi = _r(Xi, { target: document.getElementById("urd-admin") });
//#endregion
export { Zi as default };
