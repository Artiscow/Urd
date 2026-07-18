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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, ee = 1 << 25, te = 65536, ne = 1 << 21, re = 1 << 22, T = 1 << 23, ie = Symbol("$state"), ae = Symbol("legacy props"), oe = Symbol(""), se = Symbol("attributes"), E = Symbol("class"), ce = Symbol("style"), le = Symbol("text"), ue = Symbol("form reset"), de = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), fe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function pe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function me(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function he(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function ge() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function _e(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function ve() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ye(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function be() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function xe() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function D() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Se() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var Ce = {}, we = Symbol("uninitialized"), Te = "http://www.w3.org/1999/xhtml", O = "http://www.w3.org/2000/svg", Ee = "http://www.w3.org/1998/Math/MathML";
function De() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Oe(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function ke() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ae() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function je(e) {
	k = e;
}
var A;
function j(e) {
	if (e === null) throw Oe(), Ce;
	return A = e;
}
function Me() {
	return j(/* @__PURE__ */ fn(A));
}
function M(e) {
	if (k) {
		if (/* @__PURE__ */ fn(A) !== null) throw Oe(), Ce;
		A = e;
	}
}
function N(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ fn(n);
		A = n;
	}
}
function Ne(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ fn(n);
		e && n.remove(), n = i;
	}
}
function Pe(e) {
	if (!e || e.nodeType !== 8) throw Oe(), Ce;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Fe(e) {
	return e === this.v;
}
function Ie(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Le(e) {
	return !Ie(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Re = [];
function ze(e, t = !1, n = !1) {
	return Be(e, /* @__PURE__ */ new Map(), "", Re, null, n);
}
function Be(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Be(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Be(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Be(t.toJSON(), n, r, i, t);
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
var Ve = null;
function He(e) {
	Ve = e;
}
function Ue(e, t = !1, n) {
	Ve = {
		p: Ve,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: W,
		l: null
	};
}
function We(e) {
	var t = Ve, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Cn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ve = t.p, e ?? {};
}
function Ge() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ke = [];
function qe() {
	var e = Ke;
	Ke = [], f(e);
}
function Je(e) {
	if (Ke.length === 0 && !At) {
		var t = Ke;
		queueMicrotask(() => {
			t === Ke && qe();
		});
	}
	Ke.push(e);
}
function Ye() {
	for (; Ke.length > 0;) qe();
}
function Xe(e) {
	var t = W;
	if (t === null) return U.f |= T, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ze(e, t);
}
function Ze(e, t) {
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
var Qe = ~(g | _ | h);
function $e(e, t) {
	e.f = e.f & Qe | t;
}
function et(e) {
	e.f & 512 || e.deps === null ? $e(e, h) : $e(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function tt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= te, tt(t.deps));
}
function nt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), tt(e.deps), $e(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var rt = !1;
function it(e) {
	var t = rt;
	try {
		return rt = !1, [e(), rt];
	} finally {
		rt = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function at(e) {
	k && /* @__PURE__ */ dn(e) !== null && pn(e);
}
var ot = !1;
function st() {
	ot || (ot = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ue]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ct(e) {
	var t = U, n = W;
	Kn(null), qn(null);
	try {
		return e();
	} finally {
		Kn(t), qn(n);
	}
}
function lt(e, t, n, r = n) {
	e.addEventListener(t, () => ct(n));
	let i = e[ue];
	i ? e[ue] = () => {
		i(), r(!0);
	} : e[ue] = () => r(!0), st();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ut(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		bn() && (G(n), Dn(() => (t === 0 && (r = mr(() => e(() => $t(n)))), t += 1, () => {
			Je(() => {
				--t, t === 0 && (r?.(), r = void 0, $t(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var dt = S | C;
function ft(e, t, n, r) {
	new pt(e, t, n, r);
}
var pt = class {
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
	#h = ut(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = W;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
			if (k) {
				let e = this.#t;
				Me();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, dt), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = kn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = kn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = kn(() => e(this.#e)), Je(() => {
			var e = this.#c = document.createDocumentFragment(), t = un();
			e.append(t), this.#a = this.#x(() => kn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, In(this.#o, () => {
				this.#o = null;
			}), this.#b(I));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = kn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Bn(this.#a, e);
				let t = this.#n.pending;
				this.#o = kn(() => t(this.#e));
			} else this.#b(I);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		nt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = W, n = U, r = Ve;
		qn(this.#i), Kn(this.#i), He(this.#i.ctx);
		try {
			return It.ensure(), e();
		} catch (e) {
			return Xe(e), null;
		} finally {
			qn(t), Kn(n), He(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && In(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Je(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
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
		this.#a &&= (Nn(this.#a), null), this.#o &&= (Nn(this.#o), null), this.#s &&= (Nn(this.#s), null), k && (j(this.#t), N(), j(Ne()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Ae();
				return;
			}
			r = !0, i && Se(), this.#s !== null && In(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Ze(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return kn(() => {
						var t = W;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ze(e, this.#i.parent), null;
				}
			}));
		};
		Je(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ze(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Ze(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function mt(e, t, n, r) {
	let i = Ge() ? vt : xt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = W, c = ht(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ze(e, s);
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
		Promise.all(n.map((e) => /* @__PURE__ */ bt(e))).then(u).catch((e) => Ze(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), gt();
	}) : f();
}
function ht() {
	var e = W, t = U, n = Ve, r = I;
	return function(i = !0) {
		qn(e), Kn(t), He(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function gt(e = !0) {
	qn(null), Kn(null), He(null), e && I?.deactivate();
}
function _t() {
	var e = W, t = e.b, n = I, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	var t = 2 | g;
	return W !== null && (W.f |= C), {
		ctx: Ve,
		deps: null,
		effects: null,
		equals: Fe,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: we,
		wv: 0,
		parent: W,
		ac: null
	};
}
var yt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function bt(e, t, n) {
	let r = W;
	r === null && pe();
	var i = void 0, a = Yt(we), o = !U, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = W, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
			}).finally(gt);
		} catch (e) {
			n.reject(e), gt();
		}
		var c = I;
		if (o) {
			if (t.f & 32768) var l = _t();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(yt);
			else for (let e of s.values()) e.reject(yt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== yt && (c.activate(), t ? (a.f |= T, Zt(a, t)) : (a.f & 8388608 && (a.f ^= T), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), xn(() => {
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
function P(e) {
	let t = /* @__PURE__ */ vt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function xt(e) {
	let t = /* @__PURE__ */ vt(e);
	return t.equals = Le, t;
}
function St(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Nn(t[n]);
	}
}
function Ct(e) {
	var t, n = W, r = e.parent;
	if (!Un && r !== null && e.v !== we && r.f & 24576) return De(), e.v;
	qn(r);
	try {
		e.f &= ~te, St(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function F(e) {
	var t = Ct(e);
	if (!e.equals(t) && (e.wv = ir(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), Dt?.capture(e, t, !0)), e.deps === null))) {
		$e(e, h);
		return;
	}
	Un || (Ot === null ? et(e) : (bn() || I?.is_fork) && Ot.set(e, t));
}
function wt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ct(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), lr(t, 0), jn(t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Et = null, I = null, Dt = null, Ot = null, kt = null, At = !1, jt = !1, Mt = null, Nt = null, Pt = 0, Ft = 1, It = class e {
	id = Ft++;
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
			for (var r of n.d) $e(r, g), t(r);
			for (r of n.m) $e(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Pt++ > 1e3 && (this.#x(), Rt());
		for (let e of this.#u) this.#d.delete(e), $e(e, g), this.schedule(e);
		for (let e of this.#d) $e(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Mt = [], r = [], i = Nt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Gt(e), this.#h() || this.discard(), t;
		}
		if (I = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Mt = null, Nt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Wt(e, t);
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
		this.#r.clear(), Dt = this, Bt(r), Bt(n), Dt = null, this.#s?.resolve();
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
				a ? r.f ^= h : i & 4 ? t.push(r) : ar(r) && (i & 16 && this.#d.add(r), ur(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), $e(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), I = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) nt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== we && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Ot?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		I = this;
	}
	deactivate() {
		I = null, Ot = null;
	}
	flush() {
		try {
			jt = !0, I = this, this.#g();
		} finally {
			Pt = 0, kt = null, Mt = null, Nt = null, jt = !1, I = null, Ot = null, qt.clear();
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
		this.#m || (this.#m = !0, Je(() => {
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
			!jt && !At && Je(() => {
				t.#e || t.flush();
			});
		}
		return I;
	}
	apply() {
		Ot = null;
	}
	schedule(e) {
		if (kt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Mt !== null && t === W && (U === null || !(U.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? Et = e : t.#t = e, this.linked = !1;
		}
	}
};
function Lt(e) {
	var t = At;
	At = !0;
	try {
		var n;
		for (e && (I !== null && !I.is_fork && I.flush(), n = e());;) {
			if (Ye(), I === null) return n;
			I.flush();
		}
	} finally {
		At = t;
	}
}
function Rt() {
	try {
		ve();
	} catch (e) {
		Ze(e, kt);
	}
}
var zt = null;
function Bt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (zt = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Fn(r), zt?.size > 0)) {
				qt.clear();
				for (let e of zt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) zt.has(n) && (zt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
					}
				}
				zt.clear();
			}
		}
		zt = null;
	}
}
function Vt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Vt(i, t, n, r) : e & 4194320 && !(e & 2048) && Ht(i, t, r) && ($e(i, g), Ut(i));
	}
}
function Ht(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Ht(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Ut(e) {
	I.schedule(e);
}
function Wt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), $e(e, h);
		for (var n = e.first; n !== null;) Wt(n, t), n = n.next;
	}
}
function Gt(e) {
	$e(e, h);
	for (var t = e.first; t !== null;) Gt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Kt = /* @__PURE__ */ new Set(), qt = /* @__PURE__ */ new Map(), Jt = !1;
function Yt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Fe,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function L(e, t) {
	let n = Yt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Le), r;
}
function R(e, t, n = !1) {
	return U !== null && (!Gn || U.f & 131072) && Ge() && U.f & 4325394 && (Jn === null || !Jn.has(e)) && D(), Zt(e, n ? tn(t) : t, Nt);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Un ? t : e.v);
		var r = It.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ct(t), Ot === null && et(t);
		}
		e.wv = ir(), en(e, g, n), Ge() && W !== null && W.f & 1024 && !(W.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Kt.size > 0 && !Jt && Qt();
	}
	return t;
}
function Qt() {
	Jt = !1;
	for (let e of Kt) {
		e.f & 1024 && $e(e, _);
		let t;
		try {
			t = ar(e);
		} catch {
			t = !0;
		}
		t && ur(e);
	}
	Kt.clear();
}
function $t(e) {
	R(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ge(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & g) === 0;
			if (l && $e(s, t), c & 131072) Kt.add(s);
			else if (c & 2) {
				var u = s;
				Ot?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= te), en(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && zt !== null && zt.add(d), n === null ? Ut(d) : n.push(d);
			}
		}
	}
}
function tn(t) {
	if (typeof t != "object" || !t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = U, n = nr;
		Kn(null), rr(d);
		var r = e();
		return Kn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && be();
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
					let e = f(() => /* @__PURE__ */ L(we, u));
					r.set(t, e), $t(o);
				}
			} else R(n, we), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(tn(s ? e[n] : we), u)), r.set(n, o)), o !== void 0) {
				var c = G(o);
				return c === we ? void 0 : c;
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
				if (a !== void 0 && o !== we) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== we || Reflect.has(e, t);
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? tn(e[t]) : we, u)), r.set(t, n)), G(n) === we) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(we, u)), r.set(d + "", p)) : R(p, we);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== we;
				var m = f(() => tn(n));
				R(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && R(g, _ + 1);
				}
				$t(o);
			}
			return !0;
		},
		ownKeys(e) {
			G(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== we;
			});
			for (var [n, i] of r) i.v !== we && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			xe();
		}
	});
}
function nn(e) {
	try {
		if (typeof e == "object" && e && ie in e) return e[ie];
	} catch {}
	return e;
}
function rn(e, t) {
	return Object.is(nn(e), nn(t));
}
var an, on, sn, cn;
function ln() {
	if (an === void 0) {
		an = window, on = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		sn = a(t, "firstChild").get, cn = a(t, "nextSibling").get, u(e) && (e[E] = void 0, e[se] = null, e[ce] = void 0, e.__e = void 0), u(n) && (n[le] = void 0);
	}
}
function un(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function dn(e) {
	return sn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function fn(e) {
	return cn.call(e);
}
function z(e, t) {
	if (!k) return /* @__PURE__ */ dn(e);
	var n = /* @__PURE__ */ dn(A);
	if (n === null) n = A.appendChild(un());
	else if (t && n.nodeType !== 3) {
		var r = un();
		return n?.before(r), j(r), r;
	}
	return t && gn(n), j(n), n;
}
function B(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ dn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ fn(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = un();
			return A?.before(r), j(r), r;
		}
		gn(A);
	}
	return A;
}
function V(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ fn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = un();
			return r === null ? i?.after(a) : r.before(a), j(a), a;
		}
		gn(r);
	}
	return j(r), r;
}
function pn(e) {
	e.textContent = "";
}
function mn() {
	return !1;
}
function hn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function gn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function _n(e) {
	W === null && (U === null && _e(e), ge()), Un && he(e);
}
function vn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function yn(e, t) {
	var n = W;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: Ve,
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
	if (e & 4) Mt === null ? It.ensure().schedule(r) : Mt.push(r);
	else if (t !== null) {
		try {
			ur(r);
		} catch (e) {
			throw Nn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && vn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function bn() {
	return U !== null && !Gn;
}
function xn(e) {
	let t = yn(8, null);
	return $e(t, h), t.teardown = e, t;
}
function Sn(e) {
	_n("$effect");
	var t = W.f;
	if (!U && t & 32 && Ve !== null && !Ve.i) {
		var n = Ve;
		(n.e ??= []).push(e);
	} else return Cn(e);
}
function Cn(e) {
	return yn(4 | w, e);
}
function wn(e) {
	It.ensure();
	let t = yn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? In(t, () => {
			Nn(t), n(void 0);
		}) : (Nn(t), n(void 0));
	});
}
function Tn(e) {
	return yn(4, e);
}
function En(e) {
	return yn(re | C, e);
}
function Dn(e, t = 0) {
	return yn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	mt(r, t, n, (t) => {
		yn(8, () => {
			e(...t.map(G));
		});
	});
}
function On(e, t = 0) {
	return yn(16 | t, e);
}
function kn(e) {
	return yn(32 | C, e);
}
function An(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Un, n = U;
		Wn(!0), Kn(null);
		try {
			t.call(null);
		} finally {
			Wn(e), Kn(n);
		}
	}
}
function jn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ct(() => {
			e.abort(de);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Nn(n, t), n = r;
	}
}
function Mn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Nn(t), t = n;
	}
}
function Nn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Pn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, jn(e, t && !n), lr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	An(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Fn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Pn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ fn(e);
		e.remove(), e = n;
	}
}
function Fn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function In(e, t, n = !0) {
	var r = [];
	Ln(e, r, !0);
	var i = () => {
		n && Nn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Ln(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Ln(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Rn(e) {
	zn(e, !0);
}
function zn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || ($e(e, g), It.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			zn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Bn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ fn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Vn = null, Hn = !1, Un = !1;
function Wn(e) {
	Un = e;
}
var U = null, Gn = !1;
function Kn(e) {
	U = e;
}
var W = null;
function qn(e) {
	W = e;
}
var Jn = null;
function Yn(e) {
	U !== null && (Jn ??= /* @__PURE__ */ new Set()).add(e);
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
			if (ar(a) && F(a), a.wv > e.wv) return !0;
		}
		t & 512 && Ot === null && $e(e, h);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? $e(a, g) : a.f & 1024 && $e(a, _), Ut(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = U, a = Jn, o = Ve, s = Gn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, U = l & 96 ? null : e, Jn = null, He(e.ctx), Gn = !1, nr = ++tr, e.ac !== null && (ct(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = I?.is_fork;
		if (Xn !== null) {
			var m;
			if (p || lr(e, Zn), f !== null && Zn > 0) for (f.length = Zn + Xn.length, m = 0; m < Xn.length; m++) f[Zn + m] = Xn[m];
			else e.deps = f = Xn;
			if (bn() && e.f & 512) for (m = Zn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Zn < f.length && (lr(e, Zn), f.length = Zn);
		if (Ge() && Qn !== null && !Gn && f !== null && !(e.f & 6146)) for (m = 0; m < Qn.length; m++) or(Qn[m], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= T), d;
	} catch (e) {
		return Xe(e);
	} finally {
		e.f ^= ne, Xn = t, Zn = n, Qn = r, U = i, Jn = a, He(o), Gn = s, nr = c;
	}
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
	if (i === null && r.f & 2 && (Xn === null || !n.call(Xn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~te), s.v !== we && et(s), s.ac !== null && ct(() => {
			s.ac.abort(de), s.ac = null;
		}), wt(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		$e(e, h);
		var n = W, r = Hn;
		W = e, Hn = (t & 96) == 0;
		try {
			t & 16777232 ? Mn(e) : jn(e), An(e);
			var i = sr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = er;
		} finally {
			Hn = r, W = n;
		}
	}
}
async function dr() {
	await Promise.resolve(), Lt();
}
function G(e) {
	var t = (e.f & 2) != 0;
	if (Vn?.add(e), U !== null && !Gn && !(W !== null && W.f & 16384) && (Jn === null || !Jn.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < tr && (e.rv = tr, Xn === null && r !== null && r[Zn] === e ? Zn++ : Xn === null ? Xn = [e] : Xn.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (Un && qt.has(e)) return qt.get(e);
	if (t) {
		var a = e;
		if (Un) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = Ct(a)), qt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Gn && U !== null && (Hn || (U.f & 512) != 0), c = (a.f & b) === 0;
		ar(a) && (s && (a.f |= 512), F(a)), s && !c && (Tt(a), fr(a));
	}
	if (Ot?.has(e)) return Ot.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Tt(t), fr(t));
}
function pr(e) {
	if (e.v === we) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (qt.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Gn;
	try {
		return Gn = !0, e();
	} finally {
		Gn = t;
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
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Tr.call(t, e), !e.cancelBubble) return ct(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Je(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Sr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && xn(() => {
		t.removeEventListener(e, o, a);
	});
}
function K(e, t, n) {
	(t[_r] ??= {})[e] = n;
}
function Cr(e) {
	for (var t = 0; t < e.length; t++) vr.add(e[t]);
	for (var n of yr) n(e);
}
var wr = null;
function Tr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	wr = e;
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
		var d = U, f = W;
		Kn(null), qn(null);
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
			e[_r] = t, delete e.currentTarget, Kn(d), qn(f);
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
	var t = hn("template");
	return t.innerHTML = Dr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function kr(e, t) {
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
		if (k) return kr(A, null), A;
		i === void 0 && (i = Or(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ dn(i)));
		var t = r || on ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ dn(t), s = t.lastChild;
			kr(o, s);
		} else kr(t, t);
		return t;
	};
}
function Ar(e = "") {
	if (!k) {
		var t = un(e + "");
		return kr(t, t), t;
	}
	var n = A;
	return n.nodeType === 3 ? gn(n) : (n.before(n = un()), j(n)), kr(n, n), n;
}
function jr() {
	if (k) return kr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = un();
	return e.append(t, n), kr(t, n), e;
}
function J(e, t) {
	if (k) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Me();
		return;
	}
	e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[le] ??= e.nodeValue) && (e[le] = n, e.nodeValue = `${n}`);
}
function Mr(e, t) {
	return Pr(e, t);
}
var Nr = /* @__PURE__ */ new Map();
function Pr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	ln();
	var l = void 0, u = wn(() => {
		var s = n ?? t.appendChild(un());
		ft(s, { pending: () => {} }, (t) => {
			Ue({});
			var n = Ve;
			if (o && (n.c = o), a && (i.$$events = a), k && kr(t, null), l = e(t, i) || {}, k && (W.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw Oe(), Ce;
			We();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = gr(r);
					for (let e of [t, document]) {
						var a = Nr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Nr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Tr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(vr)), yr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Nr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Tr), r.delete(e), r.size === 0 && Nr.delete(n)) : r.set(e, i);
			}
			yr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Fr.set(l, u), l;
}
var Fr = /* @__PURE__ */ new WeakMap(), Ir = class {
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
			if (n) Rn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Rn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Nn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Bn(r, t), t.append(un()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Nn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), In(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Nn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = mn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = un();
			i.append(a), this.#n.set(e, {
				effect: kn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, kn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = A), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	k && (r = A, Me());
	var i = new Ir(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = Pe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ne();
				j(a), i.anchor = a, je(!1), i.ensure(e, t), je(!0);
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
function Lr(e, t) {
	return t;
}
function Rr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		In(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					zr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			pn(d), d.append(u), e.items.clear();
		}
		zr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function zr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ee, Bn(a, document.createDocumentFragment())) : Nn(t[i], n);
	}
}
var Br;
function Vr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? j(/* @__PURE__ */ dn(u)) : u.appendChild(un());
	}
	k && Me();
	var d = null, f = /* @__PURE__ */ xt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Ur(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, Gr(d, null, c)) : Rn(d) : In(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: On(() => {
			p = G(f);
			var e = p.length;
			let t = !1;
			k && Pe(c) === "[!" != (e === 0) && (c = Ne(), j(c), je(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = I, v = mn(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, je(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Wr(l, h ? c : Br ??= un(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = kn(() => s(c)) : (d = kn(() => s(Br ??= un())), d.f |= ee)), e > r.size && me("", "", ""), k && e > 0 && j(Ne()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && je(!0), G(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function Hr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Ur(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Hr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Rn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= ee, _ === l) Gr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Kr(e, d, _), Kr(e, _, y), Gr(_, y, n), d = _, p = [], m = [], l = Hr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Gr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Kr(e, S.prev, C.next), Kr(e, d, S), Kr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Gr(_, l, n), Kr(e, _.prev, _.next), Kr(e, _, d === null ? e.effect.first : d.next), Kr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Hr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Hr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (zr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Hr(l.next);
		var te = w.length;
		if (te > 0) {
			var ne = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < te; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) w[v].nodes?.a?.fix();
			}
			Rr(e, w, ne);
		}
	}
	o && Je(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Wr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Gr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ fn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Kr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function qr(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		k && (o = j(/* @__PURE__ */ dn(c)));
	}
	H(() => {
		var e = W;
		if (s === (s = t() ?? "")) {
			k && Me();
			return;
		}
		if (n && !k) {
			e.nodes = null, c.innerHTML = s, s !== "" && kr(/* @__PURE__ */ dn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Pn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (k) {
				for (var a = A.data, l = Me(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ fn(l);
				if (l === null) throw Oe(), Ce;
				kr(A, u), o = j(l);
				return;
			}
			var d = hn(r ? "svg" : i ? "math" : "template", r ? O : i ? Ee : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (kr(/* @__PURE__ */ dn(f), f.lastChild), r || i) for (; /* @__PURE__ */ dn(f);) o.before(/* @__PURE__ */ dn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Jr = [..." 	\n\r\f\xA0\v﻿"];
function Yr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Jr.includes(r[o - 1])) && (s === r.length || Jr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Xr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Zr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Qr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Zr)), i && c.push(...Object.keys(i).map(Zr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Zr(e.substring(l, u).trim());
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
		return r && (n += Xr(r)), i && (n += Xr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function $r(e, t, n, r, i, a) {
	var o = e[E];
	if (k || o !== n || o === void 0) {
		var s = Yr(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[E] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function ei(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ti(e, t, n, r) {
	var i = e[ce];
	if (k || i !== t) {
		var a = Qr(t, r);
		(!k || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ce] = t;
	} else r && (Array.isArray(r) ? (ei(e, n?.[0], r[0]), ei(e, n?.[1], r[1], "important")) : ei(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Z(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return ke();
		for (var i of t.options) i.selected = n.includes(ii(i));
		return;
	}
	for (i of t.options) if (rn(ii(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function ni(e) {
	var t = new MutationObserver(() => {
		Z(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), xn(() => {
		t.disconnect();
	});
}
function ri(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	lt(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), ii);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && ii(o);
		}
		n(a), e.__value = a, I !== null && r.add(I);
	}), Tn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = I;
			if (r.has(o)) return;
		}
		if (Z(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = ii(s), n(a));
		}
		e.__value = a, i = !1;
	}), ni(e);
}
function ii(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ai = Symbol("is custom element"), oi = Symbol("is html"), si = fe ? "link" : "LINK", ci = fe ? "progress" : "PROGRESS";
function Q(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					ui(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					ui(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ue] = n, Je(n), st();
	}
}
function $(e, t) {
	var n = di(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ci) || (e.value = t ?? "");
}
function li(e, t) {
	var n = di(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function ui(e, t, n, r) {
	var i = di(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === si) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && pi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function di(e) {
	return e[se] ??= {
		[ai]: e.nodeName.includes("-"),
		[oi]: e.namespaceURI === Te
	};
}
var fi = /* @__PURE__ */ new Map();
function pi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = fi.get(t);
	if (n) return n;
	fi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function mi(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	lt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = hi(e) ? gi(a) : a, n(a), I !== null && r.add(I), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(hi(e) ? gi(e.value) : e.value), I !== null && r.add(I)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
			if (r.has(i)) return;
		}
		hi(e) && n === gi(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function hi(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function gi(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function _i(e, t) {
	return e === t || e?.[ie] === t;
}
function vi(e = {}, t, n, r) {
	var i = Ve.r, a = W;
	return Tn(() => {
		var o, s;
		return Dn(() => {
			o = s, s = r?.() || [], mr(() => {
				_i(n(...s), e) || (t(e, ...s), o && _i(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && _i(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function yi(e, t, n, r) {
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ vt(r), G(u)) : (l && (l = !1, c = s ? mr(r) : r), c);
	let f;
	if (o) {
		var p = ie in e || ae in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = it(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ye(t), f(m)));
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
	o && G(y);
	var b = W;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? G(y) : i && o ? tn(e) : e;
			return R(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Un && v || b.f & 16384 ? y.v : G(y);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function bi(e, t) {
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
var xi = /* @__PURE__ */ q("<button type=\"button\"></button>"), Si = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ci = /* @__PURE__ */ q("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), wi = /* @__PURE__ */ q("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ti = /* @__PURE__ */ q("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/></span> <!> <!></div>"), Ei = /* @__PURE__ */ q("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function Di(e, t) {
	Ue(t, !0);
	let n = yi(t, "value", 3, "#000000"), r = yi(t, "tokens", 19, () => []), i = yi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, s = () => r().find(([e]) => e === n())?.[0] ?? null, c = /* @__PURE__ */ L(tn([])), l = "", u = "", d = /* @__PURE__ */ L(null), f = /* @__PURE__ */ L(!1), p = /* @__PURE__ */ L(tn({
		top: 0,
		left: 0
	})), h = /* @__PURE__ */ L(0), g = /* @__PURE__ */ L(0), _ = /* @__PURE__ */ L(1), v = /* @__PURE__ */ L("#000000");
	function y(e) {
		let t = /^#?([0-9a-f]{6})$/i.exec(String(e).trim());
		if (!t) return null;
		let n = parseInt(t[1], 16);
		return [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255
		];
	}
	let b = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function x(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function S(e, t, n) {
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
	function C() {
		return b(...S(G(h), G(g), G(_)));
	}
	function w() {
		R(v, C(), !0), u = G(v), t.onchange?.(G(v));
	}
	function ee(e) {
		let t = y(e);
		return t ? (((e) => {
			var t = m(e, 3);
			R(h, t[0], !0), R(g, t[1], !0), R(_, t[2], !0);
		})(x(...t)), R(v, b(...t), !0), !0) : !1;
	}
	function te() {
		ee(o()) || ee("#000000"), l = n(), u = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			R(c, Array.isArray(e) ? e : [], !0);
		} catch {
			R(c, [], !0);
		}
		let e = G(d).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 236, window.innerWidth - 236 - 8)), r = e.bottom + 300 + 8 > window.innerHeight ? Math.max(8, e.top - 300 - 8) : e.bottom + 6;
		R(p, {
			top: r,
			left: t
		}, !0), R(f, !0);
	}
	function ne() {
		if (R(f, !1), u && u !== l) {
			let e = [u, ...G(c).filter((e) => e !== u)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function re(e, n) {
		ee(n), R(v, n, !0), t.onchange?.(e);
	}
	function T(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			R(g, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), R(_, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), w();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ie(e) {
		ee(e.target.value) ? w() : R(v, C(), !0);
	}
	function ae(e) {
		ee(e) && w();
	}
	Sn(() => {
		if (!G(f)) return;
		let e = (e) => {
			G(d) && !G(d).contains(e.target) && ne();
		}, t = (e) => {
			e.key === "Escape" && ne();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0);
		};
	});
	var oe = Ei(), se = z(oe);
	let E;
	var ce = V(se, 2), le = (e) => {
		var t = Ti(), i = z(t), a = z(i);
		M(i);
		var o = V(i, 2);
		Q(o);
		var l = V(o, 2), u = z(l), d = V(u, 2);
		Q(d), M(l);
		var f = V(l, 2), y = (e) => {
			var t = Si(), i = B(t), a = V(z(i)), o = (e) => {
				var t = Ar();
				H((e) => Y(t, `- koblet til «${e ?? ""}»`), [() => s()]), J(e, t);
			}, c = /* @__PURE__ */ P(() => s());
			X(a, (e) => {
				G(c) && e(o);
			}), M(i);
			var l = V(i, 2);
			Vr(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ P(() => m(G(t), 2));
				let i = () => G(r)[0], a = () => G(r)[1];
				var o = xi();
				let s;
				H(() => {
					s = $r(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), ti(o, `background: ${a() ?? ""}`), ui(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), K("click", o, () => re(i(), a())), J(e, o);
			}), M(l), J(e, t);
		};
		X(f, (e) => {
			r().length && e(y);
		});
		var b = V(f, 2), x = (e) => {
			var t = wi(), n = V(B(t), 2);
			Vr(n, 20, () => G(c), (e) => e, (e, t) => {
				var n = Ci();
				H(() => {
					ti(n, `background: ${t ?? ""}`), ui(n, "title", t);
				}), K("click", n, () => ae(t)), J(e, n);
			}), M(n), J(e, t);
		};
		X(b, (e) => {
			G(c).length && e(x);
		}), M(t), H(() => {
			ti(t, `top: ${G(p).top ?? ""}px; left: ${G(p).left ?? ""}px`), ti(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${G(h) ?? ""}, 100%, 50%)`), ti(a, `left: ${G(g) * 100}%; top: ${(1 - G(_)) * 100}%`), $(o, G(h)), ti(u, `background: ${G(v) ?? ""}`), $(d, G(v));
		}), K("pointerdown", i, T), K("input", o, (e) => {
			R(h, Number(e.target.value), !0), w();
		}), K("change", d, ie), J(e, t);
	};
	X(ce, (e) => {
		G(f) && e(le);
	}), M(oe), vi(oe, (e) => R(d, e), () => G(d)), H((e, t, n) => {
		E = $r(se, 1, "cp-swatch svelte-zxiloo", null, E, e), ti(se, `background: ${t ?? ""}`), ui(se, "title", n), ui(se, "aria-label", i());
	}, [
		() => ({ linked: s() }),
		() => o(),
		() => s() ? `${i()} (koblet til temafargen «${s()}»)` : i()
	]), K("click", se, () => G(f) ? ne() : te()), J(e, oe), We();
}
Cr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region src/lib/previewBridge.js
function Oi(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n);
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
var ki = (e) => Math.round(e * 100) / 100;
function Ai(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ji = {
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
					x: ki(r.x * 100 / e.columns),
					w: ki(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= Ai(t.grid);
		return e;
	}
}, Mi = { 1: (e) => (e.grid = Ai(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function Ni(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = Mi[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Pi(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ji[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/theme.js
function Fi(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var Ii = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = Fi(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Li = {
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
		let n = t.stops.map(Fi).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, Ri = {
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
		let n = Fi(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity);
	}
}, zi = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Bi = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = zi, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity);
	}
}, Vi = {
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
}, Hi = () => ({
	duration: 600,
	delay: 0
}), Ui = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: Hi,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: Hi,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: Hi,
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
//#region src/lib/imageTools.js
var Wi = 1600, Gi = .82, Ki = .6;
async function qi(e) {
	let t = await createImageBitmap(e), n = Math.min(1, Wi / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(Gi);
	return s.size > 4e5 && (s = await o(Ki)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function Ji(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Yi(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var Xi = /* @__PURE__ */ q("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), Zi = /* @__PURE__ */ q("<option class=\"svelte-1n46o8q\"> </option>"), Qi = /* @__PURE__ */ q("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), $i = /* @__PURE__ */ q("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), ea = /* @__PURE__ */ q("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), ta = /* @__PURE__ */ q("<!> Ren visning", 1), na = /* @__PURE__ */ q("<!> Rediger", 1), ra = /* @__PURE__ */ q("<span class=\"who svelte-1n46o8q\"><!> </span>"), ia = /* @__PURE__ */ q("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), aa = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), oa = /* @__PURE__ */ q("<button> </button>"), sa = /* @__PURE__ */ q("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), ca = /* @__PURE__ */ q("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), la = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>"), ua = /* @__PURE__ */ q("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button> <!></span></div>"), da = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), fa = /* @__PURE__ */ q("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><select title=\"Font (Arv = temaets overskriftsfont)\" class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Arv</option><!></select> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), pa = /* @__PURE__ */ q("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), ma = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rekkefølge <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Bilde først</option><option class=\"svelte-1n46o8q\">Tekst først</option></select></label>"), ha = /* @__PURE__ */ q("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), ga = /* @__PURE__ */ q("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span> <select class=\"nav-target svelte-1n46o8q\" title=\"Hvor lenken går\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), _a = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde</option><option class=\"svelte-1n46o8q\">Bilde + tekst</option></select></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Dekkevne <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når dekkevnen er lav)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Høyre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Venstre (etter logoen)</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnsbilde i menyen og menypunkt-design kommer i en senere runde.</p></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div></details></div>"), va = /* @__PURE__ */ q("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), ya = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), ba = /* @__PURE__ */ q("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), xa = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Sa = /* @__PURE__ */ q("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Ca = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Arv fra tema</option><!></select></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font og størrelse gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), wa = /* @__PURE__ */ q("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Ta = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), Ea = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), Da = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), Oa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tegn/emoji <input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/></label> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), ka = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Aa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), ja = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), Ma = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Na = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Pa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), Fa = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ia = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), La = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ra = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele</option><option class=\"svelte-1n46o8q\">Gjenta (mønster)</option></select></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), za = /* @__PURE__ */ q("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><select class=\"bg-type svelte-1n46o8q\" title=\"Bytt lagtype (innstillingene nullstilles)\"></select> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\">×</button></span></span> <!></div>"), Ba = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <select class=\"svelte-1n46o8q\"></select></label> <button class=\"ghost svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), Va = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Ha = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Ua = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), Wa = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), Ga = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Ka = /* @__PURE__ */ q("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), qa = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Ja = /* @__PURE__ */ q("<!> <!>", 1), Ya = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), Xa = /* @__PURE__ */ q("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Za = /* @__PURE__ */ q("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), Qa = /* @__PURE__ */ q("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), $a = /* @__PURE__ */ q("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), eo = /* @__PURE__ */ q("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), to = /* @__PURE__ */ q("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), no = /* @__PURE__ */ q("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!></div>");
function ro(e, t) {
	Ue(t, !0);
	let n = [
		["color", Ii],
		["gradient", Li],
		["glow", Ri],
		["image", Vi],
		["grain", Bi]
	], r = Object.fromEntries(n), i = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>"
	}, a = /* @__PURE__ */ L(null), o = /* @__PURE__ */ L(null), s = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(""), l = /* @__PURE__ */ L("info"), u = 0;
	function d(e, t = "info") {
		R(c, e, !0), R(l, t, !0);
		let n = ++u;
		t === "ok" && setTimeout(() => {
			u === n && (R(c, ""), R(l, "info"));
		}, 8e3);
	}
	let f = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(null), h = /* @__PURE__ */ L(tn({
		size: 16,
		snap: !0
	})), g = /* @__PURE__ */ L(!0), _ = /* @__PURE__ */ L("desktop"), v = /* @__PURE__ */ L(0);
	function y() {
		R(v, x?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function b(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, y(), C?.sendAttention(e.id, !0));
	}
	let x = null, S = null, C = null, w = /* @__PURE__ */ L(null);
	function ee() {
		R(w, S.data, !0), S.replace(G(w));
	}
	function te() {
		C?.sendSite(ze(G(w)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => G(w).pages.find((e) => e.id === G(o));
	function T() {
		let e = G(w)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		R(s, e || x?.hasDraft() && !ne.has(G(o)) || S?.hasDraft() || !1, !0);
	}
	let ie = [], ae = [], oe = null;
	function se() {
		return JSON.stringify({
			page: x.data,
			site: S.data
		});
	}
	function E(e) {
		e === oe && (e.startsWith("edit:") || e === "grid") || (ie.push(se()), ie.length > 50 && ie.shift(), ae.length = 0, oe = e);
	}
	function ce(e) {
		let { page: t, site: n } = JSON.parse(e);
		x.replace(t), S.replace(n), ee(), x.save(), S.save(), R(h, {
			snap: !0,
			...G(w).grid
		}, !0), T(), y(), Ce(), Fe(x.data.sections.find((e) => e.id === G(A))), te(), G(w).pages.some((e) => e.id === G(o)) ? C?.sendPage(G(o), x.data) : bt(G(w).pages[0].id);
	}
	function le() {
		ie.length && (ae.push(se()), ce(ie.pop()), oe = null, d("Angret"));
	}
	function ue() {
		ae.length && (ie.push(se()), ce(ae.pop()), oe = null, d("Gjentatt"));
	}
	function de(e) {
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.key.toLowerCase();
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
		R(a, Ni(await (await fetch("/content/site.json")).json()), !0), S = bi("urd-draft-site", () => G(a)), S.replace(Ni(S.data)), S.save(), ee(), R(h, {
			snap: !0,
			...G(w).grid
		}, !0), await bt(new URLSearchParams(location.search).get("page") ?? G(w).pages[0].id), await st(), lt(), G(w).site.title === "Min forening" && !localStorage.getItem("urd-setup-done") && (R(me, G(w).site.title, !0), R(he, G(w).theme.tokens.color.accent, !0), R(ge, G(w).theme.tokens.color.bg, !0), R(pe, !0));
	}
	let pe = /* @__PURE__ */ L(!1), me = /* @__PURE__ */ L(""), he = /* @__PURE__ */ L("#7c5cff"), ge = /* @__PURE__ */ L("#0b0e14");
	function _e() {
		localStorage.setItem("urd-setup-done", "1"), R(pe, !1);
	}
	function ve() {
		let e = G(me).trim();
		e && (F("setup", () => {
			G(w).site.title = e, G(w).nav.logo = {
				type: "text",
				value: e
			}, G(w).theme.tokens.color.accent = G(he), G(w).theme.tokens.color.bg = G(ge);
		}), _e(), d("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let ye = /* @__PURE__ */ L(null), be = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Footer",
		"Grid",
		"Historikk"
	];
	function xe(e) {
		R(ye, G(ye) === e ? null : e, !0), C?.sendShowGrid(G(ye) === "Grid"), G(ye) === "Historikk" && mt();
	}
	let D = /* @__PURE__ */ L(null);
	function Se(e, t) {
		let n = x?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Ce() {
		if (!G(D)) return;
		let { block: e } = Se(G(D).sectionId, G(D).blockId);
		if (!e) {
			R(D, null);
			return;
		}
		R(D, {
			sectionId: G(D).sectionId,
			blockId: G(D).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function we(e) {
		if (!e.blockId) {
			R(D, null);
			return;
		}
		R(D, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), Ce();
	}
	function Te(e, t) {
		let { section: n, block: r } = Se(G(D)?.sectionId, G(D)?.blockId);
		r && (E(e), t(r, n), b(n, "blokk-endret"), x.save(), T(), C?.sendSection(G(o), n), Ce());
	}
	function O(e, t) {
		Te(`edit:${G(D).blockId}`, (n) => {
			n.props[e] = t;
		});
	}
	function Ee(e, t) {
		Number.isFinite(t) && Te(`edit:frame-${G(D).blockId}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function De(e) {
		Te("decor", (t) => {
			t.decor = e;
		});
	}
	async function Oe(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qi(t);
			Te(`edit:${G(D).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ji(t.name).replaceAll("-", " ");
			});
		} catch {
			d("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let ke = [
		["S", 14],
		["M", 18],
		["L", 24],
		["XL", 36]
	], Ae = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon"
	}, k = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], je = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], A = /* @__PURE__ */ L(null), j = /* @__PURE__ */ L(null), Me = /* @__PURE__ */ L(""), Ne = /* @__PURE__ */ L(tn([])), Pe = /* @__PURE__ */ L(null);
	function Fe(e) {
		R(j, e?.grid ? { ...e.grid } : null, !0), R(Me, e?.size?.minHeight ?? "", !0), R(Ne, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), R(Pe, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Ie(e) {
		R(A, e.sectionId, !0), Fe(x?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Le(e, t) {
		let n = x.data.sections.find((e) => e.id === G(A));
		n && (E(e), t(n), x.save(), T(), C?.sendSection(G(o), n), Fe(n));
	}
	let Re = /* @__PURE__ */ L("color");
	function Be(e) {
		Le("bg", (t) => {
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
	function Ve(e) {
		Le("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function He(e, t) {
		let n = e + t;
		Le("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function Ge(e, t, n) {
		Le(`edit:bg-${G(A)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Ke(e, t, n) {
		Le(`edit:bg-${G(A)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function qe(e, t) {
		Le("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: r[t].defaults()
			});
		});
	}
	async function Je(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			Ge(e, "src", (await qi(n)).dataUrl);
		} catch {
			d("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Ye = () => Object.entries(G(w)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function Xe(e) {
		return {
			type: e,
			version: Ui[e].version,
			props: Ui[e].defaults()
		};
	}
	function Ze(e) {
		Te(`edit:anim-${G(D).blockId}`, (t) => {
			t.animation = e ? Xe(e) : null;
		}), G(D) && C?.sendDemoAnim(G(D).sectionId, G(D).blockId);
	}
	function Qe(e, t) {
		Number.isFinite(t) && (Te(`edit:anim-${G(D).blockId}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), G(D) && C?.sendDemoAnim(G(D).sectionId, G(D).blockId));
	}
	function $e(e) {
		Le("section-anim", (t) => {
			t.animation = e ? Xe(e) : null;
		}), C?.sendDemoAnim(G(A));
	}
	function et(e, t) {
		Number.isFinite(t) && (Le("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), C?.sendDemoAnim(G(A)));
	}
	function tt(e) {
		let t = x.data.sections.find((e) => e.id === G(A));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		E("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, R(Me, r, !0), x.save(), T(), C?.sendSection(G(o), t);
	}
	function nt() {
		return x.data.sections.find((e) => e.id === G(A)) ?? x.data.sections[0];
	}
	function rt(e) {
		let t = x.data.sections.find((e) => e.id === G(A));
		t && (E("grid"), t.grid = e ? { ...S.data.grid } : null, R(j, t.grid ? { ...t.grid } : null, !0), x.save(), T(), C?.sendSection(G(o), t), G(ye) === "Grid" && C?.sendShowGrid(!0));
	}
	function it(e, t) {
		let n = x.data.sections.find((e) => e.id === G(A));
		n?.grid && (E("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, R(j, { ...n.grid }, !0), x.save(), T(), C?.sendSection(G(o), n), G(ye) === "Grid" && C?.sendShowGrid(!0));
	}
	function ot(e, t) {
		E("grid"), R(h, {
			...G(h),
			[e]: t
		}, !0), S.data.grid = {
			...S.data.grid,
			[e]: t
		}, S.save(), T(), te(), G(ye) === "Grid" && C?.sendShowGrid(!0);
	}
	async function st() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? R(p, await e.json(), !0) : e.status !== 503 && R(p, null);
		} catch {
			R(p, null);
		}
	}
	let ct = null;
	async function lt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (ct = (await e.json()).head ?? null);
		} catch {}
	}
	async function ut(e) {
		if (!ct) return lt(), {
			ok: !0,
			head: null
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${ct}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === ct) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: confirm("Noen andre har publisert siden du lastet siden, og endret filer du nå skriver over:\n\n" + i.map((e) => `  • ${e}`).join("\n") + "\n\nOK = publiser likevel (dine versjoner vinner for disse filene).\nAvbryt = ikke publiser (last siden på nytt for å se de nye endringene først)."),
			head: n
		};
	}
	let dt = /* @__PURE__ */ L(null), ft = /* @__PURE__ */ L(""), pt = /* @__PURE__ */ L(!1);
	async function mt() {
		R(ft, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? R(dt, (await e.json()).commits, !0) : e.status === 401 ? (R(dt, [], !0), R(ft, "Logg inn med GitHub for å se historikken.")) : (R(dt, [], !0), R(ft, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			R(dt, [], !0), R(ft, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let ht = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), gt = !1;
	async function _t() {
		let e = G(dt)?.[0];
		if (!(!e || G(pt)) && confirm(`Angre siste publisering («${e.message}»)?\n\nEn ny commit gjenoppretter innholdet slik det var før den - ingenting slettes fra historikken.`)) {
			R(pt, !0), d("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? ct = e : lt(), gt = !0, d("✓ Angret! Last admin på nytt om ~1 min for å redigere videre på den gjenopprettede versjonen", "ok");
				} else t.status === 409 ? d("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : d((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				d("Kunne ikke nå publiseringslaget", "error");
			}
			R(pt, !1), mt();
		}
	}
	let vt = null;
	function yt(e) {
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
	async function bt(e) {
		R(o, e, !0), vt = (async () => {
			let t = re(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = Pi(await e.json(), S.data));
			} catch {}
			n ? ne.delete(e) : n = yt(t), x = bi(`urd-draft-${e}`, () => n), x.replace(Pi(x.data, S.data)), x.save(), ie.length = 0, ae.length = 0, oe = null, R(A, null), R(j, null), T(), y(), R(c, "");
		})(), await vt;
	}
	function xt() {
		C?.destroy(), C = Oi(G(f), {
			onEdit: Jt,
			onMove: Yt,
			onDelete: cn,
			onAddSection: en,
			onMoveSection: nn,
			onDeleteSection: rn,
			onSectionSize: on,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: Ie,
			onSelectBlock: we,
			onReady: St,
			onNavigate: Ct,
			onAddBlock: (e) => fn(e.sectionId, e.block),
			onRequestBlock: mn,
			onMoveBlockSection: sn,
			onMobileManual: Xt,
			onMobileAuto: Zt,
			onReviewDone: Qt,
			onBlockFlag: $t
		});
	}
	async function St() {
		await vt, S.hasDraft() && te();
		let e = !G(a).pages.some((e) => e.id === G(o));
		(x.hasDraft() || e) && C?.sendPage(G(o), x.data), G(g) || C?.sendChrome(!1), G(ye) === "Grid" && C?.sendShowGrid(!0);
	}
	function Ct(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = G(w).pages.find((e) => e.path === t);
		n && n.id !== G(o) && bt(n.id);
	}
	function F(e, t) {
		E(e), t(), S.save(), T(), te();
	}
	let wt = /* @__PURE__ */ L(""), Tt = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Et(e, t = null) {
		return e ? Tt.includes(e) ? `«${e}» er et reservert navn` : G(w).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function I() {
		let e = G(wt).trim(), t = Ji(e), n = Et(t);
		if (n) {
			d(n, "error");
			return;
		}
		F("pages", () => {
			G(w).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), G(w).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(yt({
			id: t,
			title: e
		}))), T(), R(wt, ""), bt(t);
	}
	function Dt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		F("pages", () => {
			e.title = n;
			for (let t of G(w).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === G(o) ? (x.data.meta.title = n, x.save(), T()) : Ot(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Ot(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Pi(await t.json(), S.data));
		} catch {}
		r ||= yt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), T();
	}
	function kt(e, t) {
		let n = Ji(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Et(n, e.id);
		if (r) {
			d(r, "error");
			return;
		}
		F("pages", () => {
			e.path = `/${n}`;
		});
	}
	function At(e) {
		e.path !== "/" && (F("pages", () => {
			G(w).pages = G(w).pages.filter((t) => t.id !== e.id), G(w).nav.items = G(w).nav.items.filter((t) => t.page !== e.id);
		}), e.id === G(o) && bt(G(w).pages[0].id), d("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function jt(e) {
		F("edit:nav-logo", () => {
			G(w).nav.logo = {
				type: "text",
				value: "",
				...G(w).nav.logo,
				...e
			};
		});
	}
	function Mt(e) {
		F("nav", () => {
			G(w).nav.logo ??= {
				type: "text",
				value: G(w).site.title
			};
			let t = G(w).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = G(w).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = G(w).site.title), delete t.image), t.type = e;
		});
	}
	async function Nt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qi(t);
			F("nav", () => {
				let t = G(w).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			d("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Pt(e) {
		F("nav", () => {
			G(w).nav.layout = e;
		});
	}
	function Ft(e, t) {
		F(`edit:nav-style-${e}`, () => {
			G(w).nav.style ??= {}, G(w).nav.style[e] = t;
		});
	}
	function It(e, t) {
		F(e, () => {
			G(w).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(G(w).footer);
		});
	}
	function Lt(e, t) {
		F(`edit:nav-label-${e}`, () => {
			G(w).nav.items[e].label = t;
		});
	}
	function Rt(e, t) {
		F("nav", () => {
			let n = G(w).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function zt(e, t) {
		F(`edit:nav-href-${e}`, () => {
			G(w).nav.items[e].href = t;
		});
	}
	function Bt(e, t) {
		let n = e + t, r = G(w).nav.items;
		n < 0 || n >= r.length || F("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Vt(e) {
		F("nav", () => {
			G(w).nav.items.splice(e, 1);
		});
	}
	function Ht() {
		F("nav", () => {
			G(w).nav.items.push({
				label: "Lenke",
				page: G(w).pages[0].id
			});
		});
	}
	let Ut = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function Wt(e, t) {
		F(`edit:theme-color-${e}`, () => {
			G(w).theme.tokens.color[e] = t;
		});
	}
	function Gt(e, t) {
		F("theme", () => {
			G(w).theme.tokens.font[e] = t;
		});
	}
	function Kt(e, t) {
		F("theme", () => {
			G(w).theme.tokens.radius[e] = t;
		});
	}
	function qt() {
		R(g, !G(g)), C?.sendChrome(G(g));
	}
	function Jt(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E(`edit:${e.blockId}`), t.props = e.props, x.save(), T(), G(D)?.blockId === e.blockId && Ce(), R(c, ""));
	}
	function Yt(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		E(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && b(t, "desktop-endret-etter-mobil"), x.save(), T(), G(D)?.blockId === e.blockId && Ce();
	}
	function Xt(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId);
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
			}, x.save(), T();
		}
	}
	function Zt(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			E("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, x.save(), T(), y(), C?.sendSection(G(o), t);
		}
	}
	function Qt(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (E("review-done"), t.responsive.mobile.attention = null, x.save(), T(), y());
	}
	function $t(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E("decor"), t.decor = e.decor, x.save(), T(), G(D)?.blockId === e.blockId && Ce());
	}
	function en(e) {
		E("add-section"), x.data.sections.splice(e.index, 0, e.section), x.save(), T(), C?.sendPage(G(o), x.data), R(A, e.section.id, !0), Fe(e.section), G(ye) !== "Egenskaper" && (R(ye, "Egenskaper"), C?.sendShowGrid(!1));
	}
	function nn(e) {
		let t = x.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (E("move-section"), [t[n], t[r]] = [t[r], t[n]], x.save(), T(), C?.sendPage(G(o), x.data));
	}
	function rn(e) {
		E("delete-section"), e.sectionId === G(A) && (R(A, null), R(j, null)), x.data.sections = x.data.sections.filter((t) => t.id !== e.sectionId), x.save(), T(), C?.sendPage(G(o), x.data);
	}
	function on(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId);
		t && (E("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === G(A) && R(Me, e.minHeight, !0), x.save(), T());
	}
	function sn(e) {
		let t = x.data.sections.find((t) => t.id === e.fromSectionId), n = x.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (E("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), b(t, "blokk-flyttet"), b(n, "blokk-flyttet"), x.save(), T(), y(), C?.sendPage(G(o), x.data), G(D)?.blockId === e.blockId && (R(D, {
			...G(D),
			sectionId: e.toSectionId
		}, !0), Ce()));
	}
	function cn(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId);
		t && (E("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), G(D)?.blockId === e.blockId && R(D, null), b(t, "blokk-slettet"), x.save(), T(), C?.sendSection(G(o), t));
	}
	let ln = {
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
		}
	};
	function un(e) {
		let t = ln[e];
		return t ? {
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
		} : null;
	}
	function dn(e) {
		C ? C.sendPlaceBlock(e) : fn(nt()?.id, e);
	}
	function fn(e, t) {
		let n = x.data.sections.find((t) => t.id === e) ?? x.data.sections[0];
		n && (E("add-block"), n.blocks.push(t), b(n, "blokk-lagt-til"), x.save(), T(), C?.sendSection(G(o), n));
	}
	function pn(e) {
		dn(un(e));
	}
	function mn(e) {
		let t = un(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, fn(e.sectionId, t), e.kind === "image" && d("Bildeblokk lagt til - velg bildet i Egenskaper"));
	}
	async function hn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		d("Komprimerer bildet…");
		let n;
		try {
			n = await qi(t);
		} catch {
			d("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (G(f)?.clientWidth ?? 1280));
		dn({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Ji(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? d(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : d("");
	}
	function gn(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ji(n || "bilde")}-${Yi(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function _n(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) e.type === "image" && gn(e.props, "src", "bakgrunn", t);
			for (let e of n.blocks) e.type === "image" && gn(e.props, "src", e.props.alt, t);
		}
		return t;
	}
	function vn(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && gn(n, "value", "logo", t), n?.type === "both" && gn(n, "image", "logo", t), t;
	}
	function yn() {
		E("discard");
		let e = x.reset();
		S.reset(), ee(), R(h, {
			snap: !0,
			...G(w).grid
		}, !0), T(), R(c, ""), te(), G(w).pages.some((e) => e.id === G(o)) ? C?.sendPage(G(o), e) : bt(G(w).pages[0].id);
	}
	async function bn() {
		if (gt) {
			d("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		d("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of G(w).pages) {
			let s = `urd-draft-${i.id}`, c = ne.has(i.id) || !G(a).pages.some((e) => e.id === i.id), l = null;
			if (i.id === G(o) && (x.hasDraft() || c)) l = x.data;
			else if (i.id !== G(o)) {
				let e = localStorage.getItem(s);
				if (e) try {
					l = Pi(JSON.parse(e), S.data);
				} catch {}
			}
			if (!l && c && (l = yt(i)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(..._n(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), c ? r.push(i.id) : n.push(s);
		}
		if (S.hasDraft()) {
			let t = JSON.parse(JSON.stringify(G(w)));
			e.push(...vn(t)), e.push({
				path: "content/site.json",
				content: JSON.stringify(t, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
		}
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of G(w).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		for (let t of G(a).pages) {
			let n = G(w).pages.find((e) => e.id === t.id);
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
		let i = await ut(e);
		if (!i.ok) {
			d("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let s = {
			message: `Oppdater ${t.join(", ") || "innstillinger"} via Urd-admin`,
			files: e,
			...i.head ? { expect: i.head } : {}
		}, c = null;
		try {
			c = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(s)
			});
		} catch {}
		if (c?.ok) {
			let { sha: e } = await c.json().catch(() => ({}));
			e ? ct = e : lt(), _n(x.data), vn(G(w));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			R(a, JSON.parse(JSON.stringify(G(w))), !0), S = bi("urd-draft-site", () => G(a)), ee(), R(h, {
				snap: !0,
				...G(w).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(x.data));
			x = bi(`urd-draft-${G(o)}`, () => t), ne.has(G(o)) && localStorage.setItem(`urd-draft-${G(o)}`, JSON.stringify(t)), T(), d("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (c?.status === 401) {
			let e = (await c.json().catch(() => null))?.error;
			d(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await st();
		} else c?.status === 403 ? d((await c.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c?.status === 409 ? d("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : d(c ? (await c.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var xn = no();
	Sr("keydown", an, de);
	var Sn = z(xn), Cn = (e) => {
		var t = Xi();
		qr(z(t), () => i.pencil), N(), M(t), K("click", t, qt), J(e, t);
	};
	X(Sn, (e) => {
		G(g) || e(Cn);
	});
	var wn = V(Sn, 2);
	let Tn;
	var En = z(wn), Dn = V(z(En), 2), On = (e) => {
		var t = Qi(), n = B(t);
		Vr(n, 21, () => G(w).pages, (e) => e.id, (e, t) => {
			var n = Zi(), r = z(n, !0);
			M(n);
			var i = {};
			H(() => {
				Y(r, G(t).title), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
			}), J(e, n);
		}), M(n);
		var r;
		ni(n);
		var a = V(n, 2), s = z(a);
		let c;
		qr(s, () => i.desktop, !0), M(s);
		var l = V(s, 2);
		let u;
		qr(l, () => i.phone, !0), M(l), M(a), H(() => {
			r !== (r = G(o)) && (n.value = (n.__value = G(o)) ?? "", Z(n, G(o))), c = $r(s, 1, "ghost svelte-1n46o8q", null, c, { active: G(_) === "desktop" }), u = $r(l, 1, "ghost svelte-1n46o8q", null, u, { active: G(_) === "mobile" });
		}), K("change", n, (e) => bt(e.target.value)), K("click", s, () => R(_, "desktop")), K("click", l, () => R(_, "mobile")), J(e, t);
	};
	X(Dn, (e) => {
		G(a) && e(On);
	});
	var kn = V(Dn, 2), An = (e) => {
		var t = $i(), n = z(t);
		qr(n, () => i.phone);
		var r = V(n);
		M(t), H(() => Y(r, ` ${G(v) ?? ""} ${G(v) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), K("click", t, () => R(_, "mobile")), J(e, t);
	};
	X(kn, (e) => {
		G(v) > 0 && e(An);
	});
	var jn = V(kn, 2), Mn = (e) => {
		J(e, ea());
	};
	X(jn, (e) => {
		G(s) && e(Mn);
	}), M(En);
	var Nn = V(En, 2), Pn = z(Nn), Fn = (e) => {
		var t = aa(), n = B(t), r = z(n), a = (e) => {
			var t = ta();
			qr(B(t), () => i.eye), N(), J(e, t);
		}, o = (e) => {
			var t = na();
			qr(B(t), () => i.pencil), N(), J(e, t);
		};
		X(r, (e) => {
			G(g) ? e(a) : e(o, -1);
		}), M(n);
		var c = V(n, 2), l = (e) => {
			var t = ra(), n = z(t), r = (e) => {
				var t = jr();
				qr(B(t), () => i.warn), J(e, t);
			};
			X(n, (e) => {
				G(p).allowed || e(r);
			});
			var a = V(n, 1, !0);
			M(t), H(() => {
				ui(t, "title", G(p).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), Y(a, G(p).login);
			}), J(e, t);
		}, u = (e) => {
			J(e, ia());
		};
		X(c, (e) => {
			G(p)?.loggedIn ? e(l) : G(p) && e(u, 1);
		});
		var d = V(c, 2), f = V(d, 2), m = V(f, 2);
		H((e) => {
			ui(n, "title", G(g) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ui(d, "href", e), f.disabled = !G(s), m.disabled = !G(s);
		}, [() => re().path]), K("click", n, qt), K("click", f, yn), K("click", m, bn), J(e, t);
	};
	X(Pn, (e) => {
		G(a) && e(Fn);
	}), M(Nn), M(wn);
	var In = V(wn, 2), Ln = (e) => {
		var t = Qa(), r = z(t), i = (e) => {
			var t = Za(), r = B(t);
			Vr(r, 21, () => be, Lr, (e, t) => {
				var n = oa();
				let r;
				var i = z(n, !0);
				M(n), H(() => {
					r = $r(n, 1, "svelte-1n46o8q", null, r, { active: G(ye) === G(t) }), Y(i, G(t));
				}), K("click", n, () => xe(G(t))), J(e, n);
			}), M(r);
			var i = V(r, 2), a = (e) => {
				var t = Xa(), r = z(t), i = z(r, !0);
				M(r);
				var a = V(r, 2), s = (e) => {
					var t = da(), n = V(z(t), 2);
					Vr(n, 17, () => G(w).pages, (e) => e.id, (e, t) => {
						var n = ua();
						let r;
						var i = z(n);
						Q(i);
						var a = V(i, 2), s = (e) => {
							J(e, sa());
						}, c = (e) => {
							var n = ca();
							Q(n), H((e) => $(n, e), [() => G(t).path.slice(1)]), K("change", n, (e) => kt(G(t), e.target.value)), J(e, n);
						};
						X(a, (e) => {
							G(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = V(a, 2), u = z(l), d = V(u, 2), f = (e) => {
							var n = la();
							K("click", n, () => At(G(t))), J(e, n);
						};
						X(d, (e) => {
							G(t).path !== "/" && e(f);
						}), M(l), M(n), H(() => {
							r = $r(n, 1, "page-row svelte-1n46o8q", null, r, { current: G(t).id === G(o) }), $(i, G(t).title), u.disabled = G(t).id === G(o);
						}), K("change", i, (e) => Dt(G(t), e.target.value)), K("click", u, () => bt(G(t).id)), J(e, n);
					});
					var r = V(n, 4);
					Q(r);
					var i = V(r, 2);
					N(2), M(t), H((e) => i.disabled = e, [() => !G(wt).trim()]), K("keydown", r, (e) => e.key === "Enter" && I()), mi(r, () => G(wt), (e) => R(wt, e)), K("click", i, I), J(e, t);
				}, c = (e) => {
					var t = _a(), n = V(z(t), 2), r = V(z(n), 2), i = z(r), a = V(z(i)), o = z(a);
					o.value = o.__value = "text";
					var s = V(o);
					s.value = s.__value = "image";
					var c = V(s);
					c.value = c.__value = "both", M(a);
					var l;
					ni(a), M(i);
					var u = V(i, 2), d = (e) => {
						var t = fa(), n = B(t);
						Q(n);
						var r = V(n, 2), i = z(r), a = z(i);
						a.value = a.__value = "", Vr(V(a), 17, () => Ut, ([e, t]) => t, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = Zi(), o = z(a, !0);
							M(a);
							var s = {};
							H(() => {
								Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
							}), J(e, a);
						}), M(i);
						var o;
						ni(i);
						var s = V(i, 2);
						Q(s);
						var c = V(s, 2);
						let l;
						var u = V(c, 2);
						let d;
						M(r), H((e) => {
							$(n, G(w).nav.logo?.value ?? ""), o !== (o = G(w).nav.logo?.font ?? "") && (i.value = (i.__value = G(w).nav.logo?.font ?? "") ?? "", Z(i, G(w).nav.logo?.font ?? "")), $(s, G(w).nav.logo?.textSize ?? ""), l = $r(c, 1, "tbtn svelte-1n46o8q", null, l, { active: G(w).nav.logo?.bold !== !1 }), d = $r(u, 1, "tbtn svelte-1n46o8q", null, d, e);
						}, [() => ({ active: !!G(w).nav.logo?.italic })]), K("input", n, (e) => jt({ value: e.target.value })), K("change", i, (e) => jt({ font: e.target.value || void 0 })), K("change", s, (e) => jt({ textSize: e.target.value ? Number(e.target.value) : void 0 })), K("click", c, () => jt({ bold: G(w).nav.logo?.bold === !1 })), K("click", u, () => jt({ italic: !G(w).nav.logo?.italic })), J(e, t);
					};
					X(u, (e) => {
						(G(w).nav.logo?.type ?? "text") !== "image" && e(d);
					});
					var f = V(u, 2), p = (e) => {
						var t = pa(), n = B(t), r = z(n), i = z(r), a = V(i);
						M(r);
						var o = V(r, 2);
						Q(o);
						var s = V(o, 2);
						Q(s), M(n), N(2), H(() => {
							Y(i, `${(G(w).nav.logo?.type === "image" ? G(w).nav.logo?.value : G(w).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), $(o, G(w).nav.logo?.size ?? 32), $(s, G(w).nav.logo?.radius ?? 0);
						}), K("change", a, Nt), K("change", o, (e) => jt({ size: Number(e.target.value) })), K("change", s, (e) => jt({ radius: Number(e.target.value) })), J(e, t);
					};
					X(f, (e) => {
						(G(w).nav.logo?.type ?? "text") !== "text" && e(p);
					});
					var h = V(f, 2), g = (e) => {
						var t = ma(), n = V(z(t)), r = z(n);
						r.value = r.__value = "image-first";
						var i = V(r);
						i.value = i.__value = "text-first", M(n);
						var a;
						ni(n), M(t), H(() => {
							a !== (a = G(w).nav.logo?.order ?? "image-first") && (n.value = (n.__value = G(w).nav.logo?.order ?? "image-first") ?? "", Z(n, G(w).nav.logo?.order ?? "image-first"));
						}), K("change", n, (e) => jt({ order: e.target.value })), J(e, t);
					};
					X(h, (e) => {
						G(w).nav.logo?.type === "both" && e(g);
					}), N(2), M(r), M(n);
					var _ = V(n, 2), v = V(z(_), 2), y = z(v), b = V(z(y));
					{
						let e = /* @__PURE__ */ P(() => G(w).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ P(Ye);
						Di(b, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => Ft("bg", e)
						});
					}
					M(y);
					var x = V(y, 2), S = V(z(x)), C = z(S);
					M(S), M(x);
					var ee = V(x, 2);
					Q(ee);
					var te = V(ee, 2), ne = z(te);
					Q(ne), N(), M(te);
					var re = V(te, 2), T = V(z(re));
					{
						let e = /* @__PURE__ */ P(() => G(w).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(Ye);
						Di(T, {
							get value() {
								return G(e);
							},
							get tokens() {
								return G(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Ft("textColor", e)
						});
					}
					M(re);
					var ie = V(re, 2), ae = V(z(ie)), oe = z(ae);
					oe.value = oe.__value = "right";
					var se = V(oe);
					se.value = se.__value = "center";
					var E = V(se);
					E.value = E.__value = "left", M(ae);
					var ce;
					ni(ae), M(ie);
					var le = V(ie, 2), ue = z(le);
					Q(ue), N(), M(le), N(2), M(v), M(_);
					var de = V(_, 2), fe = V(z(de), 2), pe = z(fe);
					Vr(pe, 17, () => G(w).nav.items, Lr, (e, t, n) => {
						var r = ga(), i = z(r);
						Q(i);
						var a = V(i, 2), o = z(a);
						o.disabled = n === 0;
						var s = V(o, 2), c = V(s, 2);
						M(a);
						var l = V(a, 2), u = z(l);
						Vr(u, 17, () => G(w).pages, (e) => e.id, (e, t) => {
							var n = Zi(), r = z(n, !0);
							M(n);
							var i = {};
							H(() => {
								Y(r, G(t).title), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
							}), J(e, n);
						});
						var d = V(u);
						d.value = d.__value = "__href", M(l);
						var f;
						ni(l);
						var p = V(l, 2), m = (e) => {
							var r = ha();
							Q(r), H(() => $(r, G(t).href ?? "")), K("change", r, (e) => zt(n, e.target.value)), J(e, r);
						};
						X(p, (e) => {
							G(t).page || e(m);
						}), M(r), H(() => {
							$(i, G(t).label), s.disabled = n === G(w).nav.items.length - 1, f !== (f = G(t).page ?? "__href") && (l.value = (l.__value = G(t).page ?? "__href") ?? "", Z(l, G(t).page ?? "__href"));
						}), K("input", i, (e) => Lt(n, e.target.value)), K("click", o, () => Bt(n, -1)), K("click", s, () => Bt(n, 1)), K("click", c, () => Vt(n)), K("change", l, (e) => Rt(n, e.target.value)), J(e, r);
					});
					var me = V(pe, 2);
					M(fe), M(de), M(t), H((e) => {
						l !== (l = G(w).nav.logo?.type ?? "text") && (a.value = (a.__value = G(w).nav.logo?.type ?? "text") ?? "", Z(a, G(w).nav.logo?.type ?? "text")), Y(C, `${e ?? ""}%`), $(ee, G(w).nav.style?.bgOpacity ?? .85), li(ne, G(w).nav.style?.blur !== !1), ce !== (ce = G(w).nav.layout ?? "right") && (ae.value = (ae.__value = G(w).nav.layout ?? "right") ?? "", Z(ae, G(w).nav.layout ?? "right")), li(ue, G(w).nav.sticky !== !1);
					}, [() => Math.round((G(w).nav.style?.bgOpacity ?? .85) * 100)]), K("change", a, (e) => Mt(e.target.value)), K("input", ee, (e) => Ft("bgOpacity", Number(e.target.value))), K("change", ne, (e) => Ft("blur", e.target.checked)), K("change", ae, (e) => Pt(e.target.value)), K("change", ue, (e) => F("nav", () => {
						G(w).nav.sticky = e.target.checked;
					})), K("click", me, Ht), J(e, t);
				}, l = (e) => {
					var t = ya(), n = V(z(t), 2);
					Di(V(z(n)), {
						get value() {
							return G(w).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => Wt("bg", e)
					}), M(n);
					var r = V(n, 2);
					Di(V(z(r)), {
						get value() {
							return G(w).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => Wt("surface", e)
					}), M(r);
					var i = V(r, 2);
					Di(V(z(i)), {
						get value() {
							return G(w).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => Wt("text", e)
					}), M(i);
					var a = V(i, 2);
					Di(V(z(a)), {
						get value() {
							return G(w).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => Wt("accent", e)
					}), M(a);
					var o = V(a, 4), s = V(z(o)), c = z(s), l = (e) => {
						var t = va(), n = {};
						H(() => {
							n !== (n = G(w).theme.tokens.font.heading) && (t.value = (t.__value = G(w).theme.tokens.font.heading) ?? "");
						}), J(e, t);
					}, u = /* @__PURE__ */ P(() => !Ut.some(([, e]) => e === G(w).theme.tokens.font.heading));
					X(c, (e) => {
						G(u) && e(l);
					}), Vr(V(c), 17, () => Ut, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ P(() => m(G(t), 2));
						let r = () => G(n)[0], i = () => G(n)[1];
						var a = Zi(), o = z(a, !0);
						M(a);
						var s = {};
						H(() => {
							Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), J(e, a);
					}), M(s);
					var d;
					ni(s), M(o);
					var f = V(o, 2), p = V(z(f)), h = z(p), g = (e) => {
						var t = va(), n = {};
						H(() => {
							n !== (n = G(w).theme.tokens.font.body) && (t.value = (t.__value = G(w).theme.tokens.font.body) ?? "");
						}), J(e, t);
					}, _ = /* @__PURE__ */ P(() => !Ut.some(([, e]) => e === G(w).theme.tokens.font.body));
					X(h, (e) => {
						G(_) && e(g);
					}), Vr(V(h), 17, () => Ut, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ P(() => m(G(t), 2));
						let r = () => G(n)[0], i = () => G(n)[1];
						var a = Zi(), o = z(a, !0);
						M(a);
						var s = {};
						H(() => {
							Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), J(e, a);
					}), M(p);
					var v;
					ni(p), M(f);
					var y = V(f, 4), b = V(z(y));
					Q(b), M(y);
					var x = V(y, 2), S = V(z(x));
					Q(S), M(x), M(t), H(() => {
						d !== (d = G(w).theme.tokens.font.heading) && (s.value = (s.__value = G(w).theme.tokens.font.heading) ?? "", Z(s, G(w).theme.tokens.font.heading)), v !== (v = G(w).theme.tokens.font.body) && (p.value = (p.__value = G(w).theme.tokens.font.body) ?? "", Z(p, G(w).theme.tokens.font.body)), $(b, G(w).theme.tokens.radius.sm), $(S, G(w).theme.tokens.radius.md);
					}), K("change", s, (e) => Gt("heading", e.target.value)), K("change", p, (e) => Gt("body", e.target.value)), K("change", b, (e) => Kt("sm", e.target.value)), K("change", S, (e) => Kt("md", e.target.value)), J(e, t);
				}, u = (e) => {
					var t = ba();
					let n;
					var r = V(z(t), 2), i = V(z(r), 2), a = z(i), o = V(a, 2);
					M(i), M(r);
					var s = V(r, 2), c = V(s, 2), l = V(z(c));
					M(c);
					var u = V(c, 2), d = V(u, 2), f = V(d, 2), p = V(z(f), 2), m = z(p), h = V(m, 2), g = V(h, 2), v = V(g, 2), y = V(v, 2);
					M(p), M(f), M(t), H(() => {
						n = $r(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: G(_) === "mobile" }), ui(t, "title", G(_) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), K("click", a, () => pn("text")), K("click", o, () => pn("text-box")), K("click", s, () => pn("button")), K("change", l, hn), K("click", u, () => pn("video")), K("click", d, () => pn("icon")), K("click", m, () => pn("shape-line")), K("click", h, () => pn("shape-arrow")), K("click", g, () => pn("shape-circle")), K("click", v, () => pn("shape-rect")), K("click", y, () => pn("shape-triangle")), J(e, t);
				}, d = (e) => {
					var t = xa(), n = V(z(t), 2), r = V(z(n)), i = z(r);
					M(r), M(n);
					var a = V(n, 2);
					Q(a);
					var o = V(a, 2), s = z(o);
					Q(s), N(), M(o), N(2), M(t), H(() => {
						Y(i, `${G(h).size ?? ""} px`), $(a, G(h).size), li(s, G(h).snap !== !1);
					}), K("input", a, (e) => ot("size", Number(e.target.value))), K("change", s, (e) => ot("snap", e.target.checked)), J(e, t);
				}, f = (e) => {
					var t = Ha(), r = z(t), i = (e) => {
						var t = ja(), n = B(t), r = z(n);
						M(n);
						var i = V(n, 2), a = (e) => {
							var t = Sa(), n = z(t), r = V(z(n));
							Q(r), M(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), M(i);
							var o = V(i, 2), s = V(z(o));
							Q(s), M(o);
							var c = V(o, 2), l = V(z(c));
							Q(l), M(c);
							var u = V(c, 2), d = V(z(u));
							Q(d), M(u);
							var f = V(u, 2), p = V(z(f));
							Q(p), M(f), M(t), H(() => {
								$(r, G(D).frame.x), $(a, G(D).frame.y), $(s, G(D).frame.w), $(l, G(D).frame.h), $(d, G(D).frame.z ?? 1), $(p, G(D).frame.rot ?? 0);
							}), K("change", r, (e) => Ee("x", Number(e.target.value))), K("change", a, (e) => Ee("y", Number(e.target.value))), K("change", s, (e) => Ee("w", Number(e.target.value))), K("change", l, (e) => Ee("h", Number(e.target.value))), K("change", d, (e) => Ee("z", Number(e.target.value))), K("change", p, (e) => Ee("rot", Number(e.target.value))), J(e, t);
						};
						X(i, (e) => {
							G(_) === "desktop" && e(a);
						});
						var o = V(i, 2), s = z(o);
						Q(s), N(), M(o);
						var c = V(o, 4), l = (e) => {
							var t = Ca(), n = B(t), r = V(z(n)), i = z(r);
							i.value = i.__value = "left";
							var a = V(i);
							a.value = a.__value = "center";
							var o = V(a);
							o.value = o.__value = "right", M(r);
							var s;
							ni(r), M(n);
							var c = V(n, 2), l = z(c);
							Q(l), N(), M(c);
							var u = V(c, 2), d = V(z(u)), f = z(d);
							f.value = f.__value = "", Vr(V(f), 17, () => Ut, ([e, t]) => t, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Zi(), o = z(a, !0);
								M(a);
								var s = {};
								H(() => {
									Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
								}), J(e, a);
							}), M(d);
							var p;
							ni(d), M(u);
							var h = V(u, 4), g = z(h);
							let _;
							var v = V(g, 2);
							Vr(v, 17, () => ke, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = oa();
								let o;
								var s = z(a, !0);
								M(a), H(() => {
									o = $r(a, 1, "tbtn svelte-1n46o8q", null, o, { active: G(D).props.size === i() }), ui(a, "title", `${i() ?? ""} px`), Y(s, r());
								}), K("click", a, () => O("size", i())), J(e, a);
							});
							var y = V(v, 2);
							Q(y), M(h), N(2), H((e) => {
								s !== (s = G(D).props.align ?? "left") && (r.value = (r.__value = G(D).props.align ?? "left") ?? "", Z(r, G(D).props.align ?? "left")), li(l, e), p !== (p = G(D).props.font ?? "") && (d.value = (d.__value = G(D).props.font ?? "") ?? "", Z(d, G(D).props.font ?? "")), _ = $r(g, 1, "tbtn svelte-1n46o8q", null, _, { active: !G(D).props.size }), $(y, G(D).props.size ?? "");
							}, [() => !!G(D).props.box]), K("change", r, (e) => O("align", e.target.value)), K("change", l, (e) => O("box", e.target.checked)), K("change", d, (e) => O("font", e.target.value || null)), K("click", g, () => O("size", null)), K("change", y, (e) => O("size", e.target.value ? Number(e.target.value) : null)), J(e, t);
						}, u = (e) => {
							var t = Ta(), n = B(t), r = V(z(n));
							Q(r), M(n);
							var i = V(n, 2), a = V(z(i)), o = z(a);
							Vr(o, 17, () => G(w).pages, (e) => e.id, (e, t) => {
								var n = Zi(), r = z(n, !0);
								M(n);
								var i = {};
								H(() => {
									Y(r, G(t).title), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
								}), J(e, n);
							});
							var s = V(o);
							s.value = s.__value = "__href", M(a);
							var c;
							ni(a), M(i);
							var l = V(i, 2), u = (e) => {
								var t = wa();
								Q(t), H(() => $(t, G(D).props.href === "#" ? "" : G(D).props.href ?? "")), K("change", t, (e) => O("href", e.target.value || null)), J(e, t);
							};
							X(l, (e) => {
								G(D).props.page || e(u);
							});
							var d = V(l, 2), f = V(z(d)), p = z(f);
							p.value = p.__value = "primary";
							var m = V(p);
							m.value = m.__value = "secondary", M(f);
							var h;
							ni(f), M(d), H(() => {
								$(r, G(D).props.label), c !== (c = G(D).props.page ?? "__href") && (a.value = (a.__value = G(D).props.page ?? "__href") ?? "", Z(a, G(D).props.page ?? "__href")), h !== (h = G(D).props.style) && (f.value = (f.__value = G(D).props.style) ?? "", Z(f, G(D).props.style));
							}), K("change", r, (e) => O("label", e.target.value)), K("change", a, (e) => {
								let t = e.target.value === "__href" ? null : e.target.value;
								Te(`edit:${G(D).blockId}`, (e) => {
									e.props.page = t, t && (e.props.href = null);
								});
							}), K("change", f, (e) => O("style", e.target.value)), J(e, t);
						}, d = (e) => {
							var t = Ea(), n = B(t), r = V(z(n));
							M(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), M(i);
							var o = V(i, 2), s = V(z(o)), c = z(s);
							c.value = c.__value = "cover";
							var l = V(c);
							l.value = l.__value = "contain", M(s);
							var u;
							ni(s), M(o);
							var d = V(o, 2), f = V(z(d)), p = z(f);
							p.value = p.__value = "";
							var m = V(p);
							m.value = m.__value = "sm";
							var h = V(m);
							h.value = h.__value = "md", M(f);
							var g;
							ni(f), M(d);
							var _ = V(d, 2), v = V(z(_));
							Q(v), M(_);
							var y = V(_, 2), b = V(z(y)), x = z(b);
							M(b), M(y);
							var S = V(y, 2);
							Q(S);
							var C = V(S, 2), w = V(z(C)), ee = z(w);
							M(w), M(C);
							var te = V(C, 2);
							Q(te);
							var ne = V(te, 2), re = V(z(ne)), T = z(re);
							M(re), M(ne);
							var ie = V(ne, 2);
							Q(ie);
							var ae = V(ie, 2), oe = V(z(ae)), se = z(oe);
							M(oe), M(ae);
							var E = V(ae, 2);
							Q(E);
							var ce = V(E, 2), le = V(z(ce)), ue = z(le);
							M(le), M(ce);
							var de = V(ce, 2);
							Q(de);
							var fe = V(de, 2);
							H((e, t, n, r, i) => {
								$(a, G(D).props.alt ?? ""), u !== (u = G(D).props.fit ?? "cover") && (s.value = (s.__value = G(D).props.fit ?? "cover") ?? "", Z(s, G(D).props.fit ?? "cover")), g !== (g = G(D).props.radius ?? "") && (f.value = (f.__value = G(D).props.radius ?? "") ?? "", Z(f, G(D).props.radius ?? "")), $(v, G(D).props.href ?? ""), Y(x, `${e ?? ""}%`), $(S, G(D).props.x ?? .5), Y(ee, `${t ?? ""}%`), $(te, G(D).props.y ?? .5), Y(T, `${n ?? ""}%`), $(ie, G(D).props.brightness ?? 1), Y(se, `${r ?? ""}%`), $(E, G(D).props.contrast ?? 1), Y(ue, `${i ?? ""}%`), $(de, G(D).props.saturate ?? 1);
							}, [
								() => Math.round((G(D).props.x ?? .5) * 100),
								() => Math.round((G(D).props.y ?? .5) * 100),
								() => Math.round((G(D).props.brightness ?? 1) * 100),
								() => Math.round((G(D).props.contrast ?? 1) * 100),
								() => Math.round((G(D).props.saturate ?? 1) * 100)
							]), K("change", r, Oe), K("change", a, (e) => O("alt", e.target.value)), K("change", s, (e) => O("fit", e.target.value)), K("change", f, (e) => O("radius", e.target.value || null)), K("change", v, (e) => O("href", e.target.value || null)), K("input", S, (e) => O("x", Number(e.target.value))), K("input", te, (e) => O("y", Number(e.target.value))), K("input", ie, (e) => O("brightness", Number(e.target.value))), K("input", E, (e) => O("contrast", Number(e.target.value))), K("input", de, (e) => O("saturate", Number(e.target.value))), K("click", fe, () => Te(`edit:${G(D).blockId}`, (e) => {
								e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
							})), J(e, t);
						}, f = (e) => {
							var t = Da(), n = V(B(t), 2);
							Q(n);
							var r = V(n, 2), i = V(z(r));
							Q(i), M(r), N(2), H(() => {
								$(n, G(D).props.url ?? ""), $(i, G(D).props.title ?? "");
							}), K("change", n, (e) => O("url", e.target.value)), K("change", i, (e) => O("title", e.target.value)), J(e, t);
						}, p = (e) => {
							var t = Oa(), n = B(t), r = V(z(n));
							Q(r), M(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), M(i);
							var o = V(i, 2), s = V(z(o));
							Vr(s, 21, () => je, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Zi(), o = z(a, !0);
								M(a);
								var s = {};
								H(() => {
									Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), M(s);
							var c;
							ni(s), M(o), N(2), H(() => {
								$(r, G(D).props.glyph ?? ""), $(a, G(D).props.size ?? 48), c !== (c = G(D).props.color) && (s.value = (s.__value = G(D).props.color) ?? "", Z(s, G(D).props.color));
							}), K("change", r, (e) => O("glyph", e.target.value || "★")), K("change", a, (e) => O("size", Number(e.target.value))), K("change", s, (e) => O("color", e.target.value)), J(e, t);
						}, h = (e) => {
							var t = ka(), n = B(t), r = V(z(n));
							Vr(r, 21, () => k, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Zi(), o = z(a, !0);
								M(a);
								var s = {};
								H(() => {
									Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), M(r);
							var i;
							ni(r), M(n);
							var a = V(n, 2), o = V(z(a));
							Vr(o, 21, () => je, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Zi(), o = z(a, !0);
								M(a);
								var s = {};
								H(() => {
									Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), M(o);
							var s;
							ni(o), M(a);
							var c = V(a, 2), l = V(z(c));
							Q(l), M(c);
							var u = V(c, 2), d = z(u);
							Q(d), N(), M(u), H((e) => {
								i !== (i = G(D).props.kind) && (r.value = (r.__value = G(D).props.kind) ?? "", Z(r, G(D).props.kind)), s !== (s = G(D).props.color) && (o.value = (o.__value = G(D).props.color) ?? "", Z(o, G(D).props.color)), $(l, G(D).props.thickness), li(d, e);
							}, [() => !!G(D).props.fill]), K("change", r, (e) => O("kind", e.target.value)), K("change", o, (e) => O("color", e.target.value)), K("change", l, (e) => O("thickness", Number(e.target.value))), K("change", d, (e) => O("fill", e.target.checked ? G(D).props.color : null)), J(e, t);
						};
						X(c, (e) => {
							G(D).type === "text" ? e(l) : G(D).type === "button" ? e(u, 1) : G(D).type === "image" ? e(d, 2) : G(D).type === "video" ? e(f, 3) : G(D).type === "icon" ? e(p, 4) : G(D).type === "shape" && e(h, 5);
						});
						var g = V(c, 4), v = V(z(g)), y = z(v);
						y.value = y.__value = "", Vr(V(y), 17, () => Object.entries(Ui), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = Zi(), o = z(a, !0);
							M(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), M(v);
						var b;
						ni(v), M(g);
						var x = V(g, 2), S = (e) => {
							var t = Aa(), n = B(t), r = V(z(n));
							Q(r), M(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), M(i), N(2), H(() => {
								$(r, G(D).animation.props.duration), $(a, G(D).animation.props.delay);
							}), K("change", r, (e) => Qe("duration", Number(e.target.value))), K("change", a, (e) => Qe("delay", Number(e.target.value))), J(e, t);
						};
						X(x, (e) => {
							G(D).animation && Ui[G(D).animation.type]?.entrance && e(S);
						}), H(() => {
							Y(r, `${Ae[G(D).type] ?? G(D).type ?? ""}-blokk`), li(s, G(D).decor), b !== (b = G(D).animation?.type ?? "") && (v.value = (v.__value = G(D).animation?.type ?? "") ?? "", Z(v, G(D).animation?.type ?? ""));
						}), K("change", s, (e) => De(e.target.checked)), K("change", v, (e) => Ze(e.target.value || null)), J(e, t);
					}, a = (e) => {
						var t = Ba(), r = V(B(t), 2), i = V(z(r));
						Q(i), M(r);
						var a = V(r, 6), o = z(a);
						Q(o), N(), M(a);
						var s = V(a, 2), c = (e) => {
							var t = Ma(), n = B(t), r = V(z(n)), i = z(r);
							M(r), M(n);
							var a = V(n, 2);
							Q(a), H(() => {
								Y(i, `${G(j).size ?? ""} px`), $(a, G(j).size);
							}), K("input", a, (e) => it("size", Number(e.target.value))), J(e, t);
						};
						X(s, (e) => {
							G(j) && e(c);
						});
						var l = V(s, 8);
						Vr(l, 17, () => G(Ne), Lr, (e, t, r) => {
							var i = za(), a = z(i), o = z(a);
							Vr(o, 21, () => n, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Zi(), o = z(a, !0);
								M(a);
								var s = {};
								H(() => {
									Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), M(o);
							var s;
							ni(o);
							var c = V(o, 2), l = z(c);
							l.disabled = r === 0;
							var u = V(l, 2), d = V(u, 2);
							M(c), M(a);
							var f = V(a, 2), p = (e) => {
								var n = Na(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(Ye);
									Di(a, {
										get value() {
											return G(t).props.value;
										},
										get tokens() {
											return G(e);
										},
										label: "Lagets farge",
										onchange: (e) => Ge(r, "value", e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								M(s), M(o);
								var l = V(o, 2);
								Q(l), H((e) => {
									Y(c, `${e ?? ""}%`), $(l, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("input", l, (e) => Ge(r, "opacity", Number(e.target.value))), J(e, n);
							}, h = (e) => {
								var n = Pa(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(Ye);
									Di(a, {
										get value() {
											return G(t).props.stops[0];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient fra",
										onchange: (e) => Ke(r, 0, e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o));
								{
									let e = /* @__PURE__ */ P(Ye);
									Di(s, {
										get value() {
											return G(t).props.stops[G(t).props.stops.length - 1];
										},
										get tokens() {
											return G(e);
										},
										label: "Gradient til",
										onchange: (e) => Ke(r, G(t).props.stops.length - 1, e)
									});
								}
								M(o);
								var c = V(o, 2), l = V(z(c)), u = z(l);
								M(l), M(c);
								var d = V(c, 2);
								Q(d);
								var f = V(d, 2), p = V(z(f)), m = z(p);
								M(p), M(f);
								var h = V(f, 2);
								Q(h);
								var g = V(h, 2), _ = z(g);
								Q(_), N(), M(g), H((e, n) => {
									Y(u, `${G(t).props.angle ?? ""}°`), $(d, G(t).props.angle), Y(m, `${e ?? ""}%`), $(h, G(t).props.opacity ?? 1), li(_, n);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100), () => !!G(t).props.animate]), K("input", d, (e) => Ge(r, "angle", Number(e.target.value))), K("input", h, (e) => Ge(r, "opacity", Number(e.target.value))), K("change", _, (e) => Ge(r, "animate", e.target.checked)), J(e, n);
							}, g = (e) => {
								var n = Fa(), i = B(n), a = V(z(i));
								{
									let e = /* @__PURE__ */ P(Ye);
									Di(a, {
										get value() {
											return G(t).props.color;
										},
										get tokens() {
											return G(e);
										},
										label: "Glødens farge",
										onchange: (e) => Ge(r, "color", e)
									});
								}
								M(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								M(s), M(o);
								var l = V(o, 2);
								Q(l);
								var u = V(l, 2), d = V(z(u)), f = z(d);
								M(d), M(u);
								var p = V(u, 2);
								Q(p);
								var m = V(p, 2), h = V(z(m)), g = z(h);
								M(h), M(m);
								var _ = V(m, 2);
								Q(_);
								var v = V(_, 2), y = V(z(v)), b = z(y);
								M(y), M(v);
								var x = V(v, 2);
								Q(x), H((e, n, r, i) => {
									Y(c, `${e ?? ""}%`), $(l, G(t).props.x), Y(f, `${n ?? ""}%`), $(p, G(t).props.y), Y(g, `${r ?? ""}%`), $(_, G(t).props.radius), Y(b, `${i ?? ""}%`), $(x, G(t).props.opacity);
								}, [
									() => Math.round(G(t).props.x * 100),
									() => Math.round(G(t).props.y * 100),
									() => Math.round(G(t).props.radius * 100),
									() => Math.round(G(t).props.opacity * 100)
								]), K("input", l, (e) => Ge(r, "x", Number(e.target.value))), K("input", p, (e) => Ge(r, "y", Number(e.target.value))), K("input", _, (e) => Ge(r, "radius", Number(e.target.value))), K("input", x, (e) => Ge(r, "opacity", Number(e.target.value))), J(e, n);
							}, _ = (e) => {
								var n = Ia(), i = B(n), a = V(z(i)), o = z(a);
								M(a), M(i);
								var s = V(i, 2);
								Q(s), H((e) => {
									Y(o, `${e ?? ""}%`), $(s, G(t).props.opacity);
								}, [() => Math.round(G(t).props.opacity * 100)]), K("input", s, (e) => Ge(r, "opacity", Number(e.target.value))), J(e, n);
							}, v = (e) => {
								var n = Ra(), i = B(n), a = z(i), o = V(a);
								M(i);
								var s = V(i, 2), c = V(z(s)), l = z(c);
								l.value = l.__value = "cover";
								var u = V(l);
								u.value = u.__value = "contain";
								var d = V(u);
								d.value = d.__value = "repeat", M(c);
								var f;
								ni(c), M(s);
								var p = V(s, 2), m = (e) => {
									var n = La(), i = B(n), a = V(z(i)), o = z(a);
									M(a), M(i);
									var s = V(i, 2);
									Q(s);
									var c = V(s, 2), l = V(z(c)), u = z(l);
									M(l), M(c);
									var d = V(c, 2);
									Q(d), H((e, n) => {
										Y(o, `${e ?? ""}%`), $(s, G(t).props.x ?? .5), Y(u, `${n ?? ""}%`), $(d, G(t).props.y ?? .5);
									}, [() => Math.round((G(t).props.x ?? .5) * 100), () => Math.round((G(t).props.y ?? .5) * 100)]), K("input", s, (e) => Ge(r, "x", Number(e.target.value))), K("input", d, (e) => Ge(r, "y", Number(e.target.value))), J(e, n);
								};
								X(p, (e) => {
									(G(t).props.fit ?? "cover") !== "repeat" && e(m);
								});
								var h = V(p, 2), g = V(z(h)), _ = z(g);
								M(g), M(h);
								var v = V(h, 2);
								Q(v);
								var y = V(v, 2), b = V(z(y)), x = z(b);
								M(b), M(y);
								var S = V(y, 2);
								Q(S), H((e) => {
									Y(a, `${G(t).props.src ? "Bytt bilde" : "Velg bilde"} `), f !== (f = G(t).props.fit ?? "cover") && (c.value = (c.__value = G(t).props.fit ?? "cover") ?? "", Z(c, G(t).props.fit ?? "cover")), Y(_, `${G(t).props.blur ?? 0 ?? ""} px`), $(v, G(t).props.blur ?? 0), Y(x, `${e ?? ""}%`), $(S, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("change", o, (e) => Je(r, e)), K("change", c, (e) => Ge(r, "fit", e.target.value)), K("input", v, (e) => Ge(r, "blur", Number(e.target.value))), K("input", S, (e) => Ge(r, "opacity", Number(e.target.value))), J(e, n);
							};
							X(f, (e) => {
								G(t).type === "color" ? e(p) : G(t).type === "gradient" ? e(h, 1) : G(t).type === "glow" ? e(g, 2) : G(t).type === "grain" ? e(_, 3) : G(t).type === "image" && e(v, 4);
							}), M(i), H(() => {
								s !== (s = G(t).type) && (o.value = (o.__value = G(t).type) ?? "", Z(o, G(t).type)), u.disabled = r === G(Ne).length - 1;
							}), K("change", o, (e) => qe(r, e.target.value)), K("click", l, () => He(r, -1)), K("click", u, () => He(r, 1)), K("click", d, () => Ve(r)), J(e, i);
						});
						var u = V(l, 2), d = V(z(u));
						Vr(d, 21, () => n, ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = Zi(), o = z(a, !0);
							M(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), M(d), M(u);
						var f = V(u, 2), p = V(f, 4), h = V(z(p)), g = z(h);
						g.value = g.__value = "", Vr(V(g), 17, () => Object.entries(Ui), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = Zi(), o = z(a, !0);
							M(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), M(h);
						var _;
						ni(h), M(p);
						var v = V(p, 2), y = (e) => {
							var t = Aa(), n = B(t), r = V(z(n));
							Q(r), M(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), M(i), N(2), H(() => {
								$(r, G(Pe).props.duration), $(a, G(Pe).props.delay);
							}), K("change", r, (e) => et("duration", Number(e.target.value))), K("change", a, (e) => et("delay", Number(e.target.value))), J(e, t);
						};
						X(v, (e) => {
							G(Pe) && Ui[G(Pe).type]?.entrance && e(y);
						}), H(() => {
							$(i, G(Me)), li(o, G(j) !== null), _ !== (_ = G(Pe)?.type ?? "") && (h.value = (h.__value = G(Pe)?.type ?? "") ?? "", Z(h, G(Pe)?.type ?? ""));
						}), K("change", i, (e) => tt(e.target.value)), K("change", o, (e) => rt(e.target.checked)), ri(d, () => G(Re), (e) => R(Re, e)), K("click", f, () => Be(G(Re))), K("change", h, (e) => $e(e.target.value || null)), J(e, t);
					}, o = (e) => {
						J(e, Va());
					};
					X(r, (e) => {
						G(D) ? e(i) : G(A) ? e(a, 1) : e(o, -1);
					}), M(t), J(e, t);
				}, g = (e) => {
					var t = Ua(), n = V(z(t), 2), r = z(n);
					Q(r), N(), M(n);
					var i = V(n, 4);
					at(i), ui(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = V(i, 4), o = V(z(a)), s = z(o);
					s.value = s.__value = "left";
					var c = V(s);
					c.value = c.__value = "center";
					var l = V(c);
					l.value = l.__value = "right", M(o);
					var u;
					ni(o), M(a), N(2), M(t), H((e) => {
						li(r, e), $(i, G(w).footer?.text ?? ""), u !== (u = G(w).footer?.align ?? "center") && (o.value = (o.__value = G(w).footer?.align ?? "center") ?? "", Z(o, G(w).footer?.align ?? "center"));
					}, [() => !!G(w).footer?.show]), K("change", r, (e) => It("footer", (t) => {
						t.show = e.target.checked;
					})), K("input", i, (e) => It("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), K("change", o, (e) => It("footer", (t) => {
						t.align = e.target.value;
					})), J(e, t);
				}, v = (e) => {
					var t = Ya(), n = V(z(t), 2), r = (e) => {
						J(e, Wa());
					}, i = (e) => {
						var t = Ja(), n = B(t), r = (e) => {
							var t = Ga(), n = z(t, !0);
							M(t), H(() => Y(n, G(ft))), J(e, t);
						};
						X(n, (e) => {
							G(ft) && e(r);
						});
						var i = V(n, 2), a = (e) => {
							var t = qa(), n = B(t);
							Vr(V(n, 2), 19, () => G(dt), (e) => e.sha, (e, t, n) => {
								var r = Ka();
								let i;
								var a = z(r), o = z(a, !0);
								M(a);
								var s = V(a, 2), c = z(s);
								M(s), M(r), H((e) => {
									i = $r(r, 1, "history-row svelte-1n46o8q", null, i, { head: G(n) === 0 }), ui(a, "title", G(t).sha), Y(o, G(t).message), Y(c, `${G(t).author ?? ""}${e ?? ""}`);
								}, [() => G(t).date ? ` · ${ht.format(new Date(G(t).date))}` : ""]), J(e, r);
							}), H(() => {
								n.disabled = G(pt) || !G(p)?.allowed, ui(n, "title", G(p)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), K("click", n, _t), J(e, t);
						};
						X(i, (e) => {
							G(dt).length > 0 && e(a);
						}), J(e, t);
					};
					X(n, (e) => {
						G(dt) === null ? e(r) : e(i, -1);
					}), M(t), J(e, t);
				};
				X(a, (e) => {
					G(ye) === "Sider" ? e(s) : G(ye) === "Nav" ? e(c, 1) : G(ye) === "Tema" ? e(l, 2) : G(ye) === "Blokker" ? e(u, 3) : G(ye) === "Grid" ? e(d, 4) : G(ye) === "Egenskaper" ? e(f, 5) : G(ye) === "Footer" ? e(g, 6) : G(ye) === "Historikk" && e(v, 7);
				}), M(t), H(() => Y(i, G(ye))), J(e, t);
			};
			X(i, (e) => {
				G(ye) && e(a);
			}), J(e, t);
		};
		X(r, (e) => {
			G(g) && e(i);
		});
		var a = V(r, 2);
		let s;
		var c = z(a);
		vi(c, (e) => R(f, e), () => G(f)), M(a), M(t), H(() => {
			s = $r(a, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: G(_) === "mobile" }), ui(c, "src", `/?page=${G(o)}&preview=1`);
		}), Sr("load", c, xt), br(c), J(e, t);
	}, Rn = (e) => {
		J(e, $a());
	};
	X(In, (e) => {
		G(a) ? e(Ln) : e(Rn, -1);
	});
	var zn = V(In, 2), Bn = (e) => {
		var t = eo(), n = z(t), r = V(z(n), 4), i = V(z(r));
		Q(i), M(r);
		var a = V(r, 2);
		Di(V(z(a)), {
			get value() {
				return G(he);
			},
			label: "Aksentfarge",
			onchange: (e) => R(he, e, !0)
		}), M(a);
		var o = V(a, 2);
		Di(V(z(o)), {
			get value() {
				return G(ge);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => R(ge, e, !0)
		}), M(o);
		var s = V(o, 4), c = z(s), l = V(c, 2);
		M(s), M(n), M(t), H((e) => l.disabled = e, [() => !G(me).trim()]), K("keydown", i, (e) => e.key === "Enter" && ve()), mi(i, () => G(me), (e) => R(me, e)), K("click", c, _e), K("click", l, ve), J(e, t);
	};
	X(zn, (e) => {
		G(pe) && e(Bn);
	});
	var Vn = V(zn, 2), Hn = (e) => {
		var t = to();
		let n;
		var r = z(t), i = z(r, !0);
		M(r);
		var a = V(r, 2);
		M(t), H(() => {
			n = $r(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: G(l) === "ok",
				error: G(l) === "error"
			}), Y(i, G(c));
		}), K("click", a, () => d("")), J(e, t);
	};
	X(Vn, (e) => {
		G(c) && e(Hn);
	}), M(xn), H(() => Tn = $r(wn, 1, "topbar svelte-1n46o8q", null, Tn, { hidden: !G(g) })), J(e, xn), We();
}
Cr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var io = Mr(ro, { target: document.getElementById("urd-admin") });
//#endregion
export { io as default };
