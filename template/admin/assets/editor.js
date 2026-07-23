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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, T = 1 << 25, E = 65536, ee = 1 << 21, te = 1 << 22, ne = 1 << 23, re = Symbol("$state"), D = Symbol("legacy props"), ie = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), ue = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), de = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function fe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function me(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function he() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ge(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function _e() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ve(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ye() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function be() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function xe() {
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
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function Ae(e) {
	k = e;
}
var A;
function je(e) {
	if (e === null) throw Oe(), Ce;
	return A = e;
}
function Me() {
	return je(/* @__PURE__ */ un(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ un(A) !== null) throw Oe(), Ce;
		A = e;
	}
}
function M(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ un(n);
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
		var i = /* @__PURE__ */ un(n);
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
		r: U,
		l: null
	};
}
function We(e) {
	var t = Ve, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
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
	if (Ke.length === 0 && !jt) {
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
	var t = U;
	if (t === null) return H.f |= ne, e;
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= E, tt(t.deps));
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
	k && /* @__PURE__ */ ln(e) !== null && dn(e);
}
var ot = !1;
function st() {
	ot || (ot = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ct(e) {
	var t = H, n = U;
	Wn(null), Gn(null);
	try {
		return e();
	} finally {
		Wn(t), Gn(n);
	}
}
function lt(e, t, n, r = n) {
	e.addEventListener(t, () => ct(n));
	let i = e[le];
	i ? e[le] = () => {
		i(), r(!0);
	} : e[le] = () => r(!0), st();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ut(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		vn() && (W(n), Tn(() => (t === 0 && (r = fr(() => e(() => $t(n)))), t += 1, () => {
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
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
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
			this.#a = Dn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = Dn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), Je(() => {
			var e = this.#c = document.createDocumentFragment(), t = cn();
			e.append(t), this.#a = this.#x(() => Dn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#b(P));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = Dn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Rn(this.#a, e);
				let t = this.#n.pending;
				this.#o = Dn(() => t(this.#e));
			} else this.#b(P);
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
		var t = U, n = H, r = Ve;
		Gn(this.#i), Wn(this.#i), He(this.#i.ctx);
		try {
			return It.ensure(), e();
		} catch (e) {
			return Xe(e), null;
		} finally {
			Gn(t), Wn(n), He(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && Pn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Je(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), W(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		P?.is_fork ? (this.#a && P.skip_effect(this.#a), this.#o && P.skip_effect(this.#o), this.#s && P.skip_effect(this.#s), P.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), k && (je(this.#t), M(), je(Ne()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				ke();
				return;
			}
			r = !0, i && Se(), this.#s !== null && Pn(this.#s, () => {
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
					return Dn(() => {
						var t = U;
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
	var s = U, c = ht(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
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
	var e = U, t = H, n = Ve, r = P;
	return function(i = !0) {
		Gn(e), Wn(t), He(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function gt(e = !0) {
	Gn(null), Wn(null), He(null), e && P?.deactivate();
}
function _t() {
	var e = U, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	var t = 2 | g;
	return U !== null && (U.f |= C), {
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
		parent: U,
		ac: null
	};
}
var yt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function bt(e, t, n) {
	let r = U;
	r === null && fe();
	var i = void 0, a = Yt(we), o = !H, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(gt);
		} catch (e) {
			n.reject(e), gt();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = _t();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(yt);
			else for (let e of s.values()) e.reject(yt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== yt && (c.activate(), t ? (a.f |= ne, Zt(a, t)) : (a.f & 8388608 && (a.f ^= ne), Zt(a, e)), c.deactivate());
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
function N(e) {
	let t = /* @__PURE__ */ vt(e);
	return qn(t), t;
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
		for (var n = 0; n < t.length; n += 1) jn(t[n]);
	}
}
function Ct(e) {
	var t, n = U, r = e.parent;
	if (!Vn && r !== null && e.v !== we && r.f & 24576) return De(), e.v;
	Gn(r);
	try {
		e.f &= ~E, St(e), t = ar(e);
	} finally {
		Gn(n);
	}
	return t;
}
function wt(e) {
	var t = Ct(e);
	if (!e.equals(t) && (e.wv = nr(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), Ot?.capture(e, t, !0)), e.deps === null))) {
		$e(e, h);
		return;
	}
	Vn || (kt === null ? et(e) : (vn() || P?.is_fork) && kt.set(e, t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ct(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), sr(t, 0), kn(t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && cr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Dt = null, P = null, Ot = null, kt = null, At = null, jt = !1, Mt = !1, Nt = null, F = null, Pt = 0, Ft = 1, It = class e {
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
		var n = Nt = [], r = [], i = F = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Gt(e), this.#h() || this.discard(), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Nt = null, F = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Wt(e, t);
			i.length > 0 && P.#g();
			return;
		}
		let o = this.#v();
		if (o) {
			this.#b(r), this.#b(n), o.#y(this);
			return;
		}
		this.#u.clear(), this.#d.clear();
		for (let e of this.#r) e(this);
		this.#r.clear(), Ot = this, Bt(r), Bt(n), Ot = null, this.#s?.resolve();
		var s = P;
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
				a ? r.f ^= h : i & 4 ? t.push(r) : rr(r) && (i & 16 && this.#d.add(r), cr(r));
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
		this.oncommit(() => e.discard()), e.#x(), P = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) nt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== we && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), kt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, kt = null;
	}
	flush() {
		try {
			Mt = !0, P = this, this.#g();
		} finally {
			Pt = 0, At = null, Nt = null, F = null, Mt = !1, P = null, kt = null, qt.clear();
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
		if (P === null) {
			let t = P = new e();
			!Mt && !jt && Je(() => {
				t.#e || t.flush();
			});
		}
		return P;
	}
	apply() {
		kt = null;
	}
	schedule(e) {
		if (At = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Nt !== null && t === U && (H === null || !(H.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? Dt = e : t.#t = e, this.linked = !1;
		}
	}
};
function Lt(e) {
	var t = jt;
	jt = !0;
	try {
		var n;
		for (e && (P !== null && !P.is_fork && P.flush(), n = e());;) {
			if (Ye(), P === null) return n;
			P.flush();
		}
	} finally {
		jt = t;
	}
}
function Rt() {
	try {
		_e();
	} catch (e) {
		Ze(e, At);
	}
}
var zt = null;
function Bt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && rr(r) && (zt = /* @__PURE__ */ new Set(), cr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), zt?.size > 0)) {
				qt.clear();
				for (let e of zt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) zt.has(n) && (zt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || cr(n);
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
	P.schedule(e);
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
function I(e, t) {
	let n = Yt(e, t);
	return qn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Le), r;
}
function L(e, t, n = !1) {
	return H !== null && (!Un || H.f & 131072) && Ge() && H.f & 4325394 && (Kn === null || !Kn.has(e)) && xe(), Zt(e, n ? tn(t) : t, F);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Vn ? t : e.v);
		var r = It.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ct(t), kt === null && et(t);
		}
		e.wv = nr(), en(e, g, n), Ge() && U !== null && U.f & 1024 && !(U.f & 96) && (Xn === null ? Zn([e]) : Xn.push(e)), !r.is_fork && Kt.size > 0 && !Jt && Qt();
	}
	return t;
}
function Qt() {
	Jt = !1;
	for (let e of Kt) {
		e.f & 1024 && $e(e, _);
		let t;
		try {
			t = rr(e);
		} catch {
			t = !0;
		}
		t && cr(e);
	}
	Kt.clear();
}
function $t(e) {
	L(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ge(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && $e(s, t), c & 131072) Kt.add(s);
			else if (c & 2) {
				var u = s;
				kt?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= E), en(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && zt !== null && zt.add(d), n === null ? Ut(d) : n.push(d);
			}
		}
	}
}
function tn(t) {
	if (typeof t != "object" || !t || re in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = er, f = (e) => {
		if (er === d) return e();
		var t = H, n = er;
		Wn(null), tr(d);
		var r = e();
		return Wn(t), tr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ I(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ye();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ I(n.value, u);
				return r.set(t, e), e;
			}) : L(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ I(we, u));
					r.set(t, e), $t(o);
				}
			} else L(n, we), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(tn(s ? e[n] : we), u)), r.set(n, o)), o !== void 0) {
				var c = W(o);
				return c === we ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = W(i));
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
			if (t === re) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== we || Reflect.has(e, t);
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? tn(e[t]) : we, u)), r.set(t, n)), W(n) === we) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(we, u)), r.set(d + "", p)) : L(p, we);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== we;
				var m = f(() => tn(n));
				L(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				$t(o);
			}
			return !0;
		},
		ownKeys(e) {
			W(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== we;
			});
			for (var [n, i] of r) i.v !== we && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			be();
		}
	});
}
var nn, rn, an, on;
function sn() {
	if (nn === void 0) {
		nn = window, rn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = a(t, "firstChild").get, on = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
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
function R(e, t) {
	if (!k) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(A);
	if (n === null) n = A.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), je(r), r;
	}
	return t && mn(n), je(n), n;
}
function z(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = cn();
			return A?.before(r), je(r), r;
		}
		mn(A);
	}
	return A;
}
function B(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = cn();
			return r === null ? i?.after(a) : r.before(a), je(a), a;
		}
		mn(r);
	}
	return je(r), r;
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
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function hn(e) {
	U === null && (H === null && ge(e), he()), Vn && me(e);
}
function gn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _n(e, t) {
	var n = U;
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
	P?.register_created_effect(r);
	var i = r;
	if (e & 4) Nt === null ? It.ensure().schedule(r) : Nt.push(r);
	else if (t !== null) {
		try {
			cr(r);
		} catch (e) {
			throw jn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && gn(i, n), H !== null && H.f & 2 && !(e & 64))) {
		var a = H;
		(a.effects ??= []).push(i);
	}
	return r;
}
function vn() {
	return H !== null && !Un;
}
function yn(e) {
	let t = _n(8, null);
	return $e(t, h), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = U.f;
	if (!H && t & 32 && Ve !== null && !Ve.i) {
		var n = Ve;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | w, e);
}
function Sn(e) {
	It.ensure();
	let t = _n(64 | C, e);
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
	return _n(te | C, e);
}
function Tn(e, t = 0) {
	return _n(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	mt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(W));
		});
	});
}
function En(e, t = 0) {
	return _n(16 | t, e);
}
function Dn(e) {
	return _n(32 | C, e);
}
function On(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Vn, n = H;
		Hn(!0), Wn(null);
		try {
			t.call(null);
		} finally {
			Hn(e), Wn(n);
		}
	}
}
function kn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ct(() => {
			e.abort(ue);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Mn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, kn(e, t && !n), sr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	On(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Nn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Mn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ un(e);
		e.remove(), e = n;
	}
}
function Nn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Pn(e, t, n = !0) {
	var r = [];
	Fn(e, r, !0);
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
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				Fn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function In(e) {
	Ln(e, !0);
}
function Ln(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || ($e(e, g), It.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			Ln(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Rn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ un(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var zn = null, Bn = !1, Vn = !1;
function Hn(e) {
	Vn = e;
}
var H = null, Un = !1;
function Wn(e) {
	H = e;
}
var U = null;
function Gn(e) {
	U = e;
}
var Kn = null;
function qn(e) {
	H !== null && (Kn ??= /* @__PURE__ */ new Set()).add(e);
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
	if (t & 2 && (e.f &= ~E), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (rr(a) && wt(a), a.wv > e.wv) return !0;
		}
		t & 512 && kt === null && $e(e, h);
	}
	return !1;
}
function ir(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Kn !== null && Kn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ir(a, t, !1) : t === a && (n ? $e(a, g) : a.f & 1024 && $e(a, _), Ut(a));
	}
}
function ar(e) {
	var t = Jn, n = Yn, r = Xn, i = H, a = Kn, o = Ve, s = Un, c = er, l = e.f;
	Jn = null, Yn = 0, Xn = null, H = l & 96 ? null : e, Kn = null, He(e.ctx), Un = !1, er = ++$n, e.ac !== null && (ct(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= ee;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = P?.is_fork;
		if (Jn !== null) {
			var m;
			if (p || sr(e, Yn), f !== null && Yn > 0) for (f.length = Yn + Jn.length, m = 0; m < Jn.length; m++) f[Yn + m] = Jn[m];
			else e.deps = f = Jn;
			if (vn() && e.f & 512) for (m = Yn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Yn < f.length && (sr(e, Yn), f.length = Yn);
		if (Ge() && Xn !== null && !Un && f !== null && !(e.f & 6146)) for (m = 0; m < Xn.length; m++) ir(Xn[m], e);
		if (i !== null && i !== e) {
			if ($n++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = $n;
			if (t !== null) for (let e of t) e.rv = $n;
			Xn !== null && (r === null ? r = Xn : r.push(...Xn));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return Xe(e);
	} finally {
		e.f ^= ee, Jn = t, Yn = n, Xn = r, H = i, Kn = a, He(o), Un = s, er = c;
	}
}
function or(e, r) {
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
		s.f & 512 && (s.f ^= 512, s.f &= ~E), s.v !== we && et(s), s.ac !== null && ct(() => {
			s.ac.abort(ue), s.ac = null, $e(s, g);
		}), Tt(s), sr(s, 0);
	}
}
function sr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) or(e, n[r]);
}
function cr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		$e(e, h);
		var n = U, r = Bn;
		U = e, Bn = (t & 96) == 0;
		try {
			t & 16777232 ? An(e) : kn(e), On(e);
			var i = ar(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Qn;
		} finally {
			Bn = r, U = n;
		}
	}
}
async function lr() {
	await Promise.resolve(), Lt();
}
function W(e) {
	var t = (e.f & 2) != 0;
	if (zn?.add(e), H !== null && !Un && !(U !== null && U.f & 16384) && (Kn === null || !Kn.has(e))) {
		var r = H.deps;
		if (H.f & 2097152) e.rv < $n && (e.rv = $n, Jn === null && r !== null && r[Yn] === e ? Yn++ : Jn === null ? Jn = [e] : Jn.push(e));
		else {
			H.deps ??= [], n.call(H.deps, e) || H.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [H] : n.call(i, H) || i.push(H);
		}
	}
	if (Vn && qt.has(e)) return qt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || dr(a)) && (o = Ct(a)), qt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Un && H !== null && (Bn || (H.f & 512) != 0), c = (a.f & b) === 0;
		rr(a) && (s && (a.f |= 512), wt(a)), s && !c && (Et(a), ur(a));
	}
	if (kt?.has(e)) return kt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function ur(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Et(t), ur(t));
}
function dr(e) {
	if (e.v === we) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (qt.has(t) || t.f & 2 && dr(t)) return !0;
	return !1;
}
function fr(e) {
	var t = Un;
	try {
		return Un = !0, e();
	} finally {
		Un = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var pr = ["touchstart", "touchmove"];
function mr(e) {
	return pr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var hr = Symbol("events"), gr = /* @__PURE__ */ new Set(), _r = /* @__PURE__ */ new Set();
function vr(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function yr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Cr.call(t, e), !e.cancelBubble) return ct(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Je(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function br(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = yr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		t.removeEventListener(e, o, a);
	});
}
function G(e, t, n) {
	(t[hr] ??= {})[e] = n;
}
function xr(e) {
	for (var t = 0; t < e.length; t++) gr.add(e[t]);
	for (var n of _r) n(e);
}
var Sr = null;
function Cr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Sr = e;
	var s = 0, c = Sr === e && e[hr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[hr] = t;
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
		var d = H, f = U;
		Wn(null), Gn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[hr]?.[r];
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
			e[hr] = t, delete e.currentTarget, Wn(d), Gn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var wr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Tr(e) {
	return wr?.createHTML(e) ?? e;
}
function Er(e) {
	var t = pn("template");
	return t.innerHTML = Tr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Dr(e, t) {
	var n = U;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function K(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (k) return Dr(A, null), A;
		i === void 0 && (i = Er(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ ln(i)));
		var t = r || rn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ ln(t), s = t.lastChild;
			Dr(o, s);
		} else Dr(t, t);
		return t;
	};
}
function Or(e = "") {
	if (!k) {
		var t = cn(e + "");
		return Dr(t, t), t;
	}
	var n = A;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), je(n)), Dr(n, n), n;
}
function kr() {
	if (k) return Dr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), Dr(t, n), e;
}
function q(e, t) {
	if (k) {
		var n = U;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Me();
		return;
	}
	e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function Ar(e, t) {
	return Mr(e, t);
}
var jr = /* @__PURE__ */ new Map();
function Mr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	sn();
	var l = void 0, u = Sn(() => {
		var s = n ?? t.appendChild(cn());
		ft(s, { pending: () => {} }, (t) => {
			Ue({});
			var n = Ve;
			if (o && (n.c = o), a && (i.$$events = a), k && Dr(t, null), l = e(t, i) || {}, k && (U.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw Oe(), Ce;
			We();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = mr(r);
					for (let e of [t, document]) {
						var a = jr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), jr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Cr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(gr)), _r.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = jr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Cr), r.delete(e), r.size === 0 && jr.delete(n)) : r.set(e, i);
			}
			_r.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Nr.set(l, u), l;
}
var Nr = /* @__PURE__ */ new WeakMap(), Pr = class {
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
						Rn(r, t), t.append(cn()), this.#n.set(e, {
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
		var n = P, r = fn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = cn();
			i.append(a), this.#n.set(e, {
				effect: Dn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, Dn(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = A), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	k && (r = A, Me());
	var i = new Pr(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = Pe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ne();
				je(a), i.anchor = a, Ae(!1), i.ensure(e, t), Ae(!0);
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
function Fr(e, t) {
	return t;
}
function Ir(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Pn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Lr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			dn(d), d.append(u), e.items.clear();
		}
		Lr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Lr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= T, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var Rr;
function zr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? je(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	k && Me();
	var d = null, f = /* @__PURE__ */ xt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Vr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Ur(d, null, c)) : In(d) : Pn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: En(() => {
			p = W(f);
			var e = p.length;
			let t = !1;
			k && Pe(c) === "[!" != (e === 0) && (c = Ne(), je(c), Ae(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = P, v = fn(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, Ae(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Hr(l, h ? c : Rr ??= cn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(Rr ??= cn())), d.f |= T)), e > r.size && pe("", "", ""), k && e > 0 && je(Ne()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Ae(!0), W(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function Br(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Vr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Br(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (In(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Ur(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Wr(e, d, _), Wr(e, _, y), Ur(_, y, n), d = _, p = [], m = [], l = Br(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ur(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Wr(e, S.prev, C.next), Wr(e, d, S), Wr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Ur(_, l, n), Wr(e, _.prev, _.next), Wr(e, _, d === null ? e.effect.first : d.next), Wr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Br(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Br(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Lr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Br(l.next);
		var E = w.length;
		if (E > 0) {
			var ee = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < E; v += 1) w[v].nodes?.a?.fix();
			}
			Ir(e, w, ee);
		}
	}
	o && Je(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Hr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
	return {
		v: c,
		i: l,
		e: Dn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ur(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Wr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function X(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		k && (o = je(/* @__PURE__ */ ln(c)));
	}
	V(() => {
		var e = U;
		if (s === (s = t() ?? "")) {
			k && Me();
			return;
		}
		if (n && !k) {
			e.nodes = null, c.innerHTML = s, s !== "" && Dr(/* @__PURE__ */ ln(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (k) {
				for (var a = A.data, l = Me(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw Oe(), Ce;
				Dr(A, u), o = je(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? O : i ? Ee : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Dr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
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
	if (k || o !== n || o === void 0) {
		var s = Kr(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
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
	if (k || i !== t) {
		var a = Yr(t, r);
		(!k || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[se] = t;
	} else r && (Array.isArray(r) ? (Zr(e, n?.[0], r[0]), Zr(e, n?.[1], r[1], "important")) : Zr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var $r = Symbol("is custom element"), ei = Symbol("is html"), ti = de ? "link" : "LINK", ni = de ? "progress" : "PROGRESS";
function Z(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					ii(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					ii(e, "checked", null), e.checked = r;
				}
			}
		};
		e[le] = n, Je(n), st();
	}
}
function Q(e, t) {
	var n = ai(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ni) || (e.value = t ?? "");
}
function ri(e, t) {
	var n = ai(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function ii(e, t, n, r) {
	var i = ai(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ti) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ai(e) {
	return e[ae] ??= {
		[$r]: e.nodeName.includes("-"),
		[ei]: e.namespaceURI === Te
	};
}
var oi = /* @__PURE__ */ new Map();
function si(e) {
	var t = e.getAttribute("is") || e.nodeName, n = oi.get(t);
	if (n) return n;
	oi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function ci(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	lt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = li(e) ? ui(a) : a, n(a), P !== null && r.add(P), await lr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || fr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), P !== null && r.add(P)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = P;
			if (r.has(i)) return;
		}
		li(e) && n === ui(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function li(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ui(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function di(e, t) {
	return e === t || e?.[re] === t;
}
function fi(e = {}, t, n, r) {
	var i = Ve.r, a = U;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], fr(() => {
				di(n(...s), e) || (t(e, ...s), o && di(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && di(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function pi(e, t, n, r) {
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ vt(r), W(u)) : (l && (l = !1, c = s ? fr(r) : r), c);
	let f;
	if (o) {
		var p = re in e || D in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = it(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ve(t), f(m)));
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
	o && W(y);
	var b = U;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? W(y) : i && o ? tn(e) : e;
			return L(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : W(y);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function mi(e, t) {
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
var hi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), gi = /* @__PURE__ */ K("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), _i = /* @__PURE__ */ K("<button type=\"button\"></button>"), vi = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), yi = /* @__PURE__ */ K("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), bi = /* @__PURE__ */ K("<span class=\"cp-tokens svelte-zxiloo\"></span>"), xi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Si = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ci = /* @__PURE__ */ K("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), wi = /* @__PURE__ */ K("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!></span>");
function Ti(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 3, "Velg farge"), a = "urd-recent-colors", o = "urd-saved-colors", s = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, c = () => r().find(([e]) => e === n())?.[0] ?? null, l = /* @__PURE__ */ I(tn([])), u = /* @__PURE__ */ I(tn([])), d = "", f = "", p = /* @__PURE__ */ I(null), h = /* @__PURE__ */ I(!1), g = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0
	})), _ = /* @__PURE__ */ I(0), v = /* @__PURE__ */ I(0), y = /* @__PURE__ */ I(1), b = /* @__PURE__ */ I(1), x = /* @__PURE__ */ I("#000000");
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
		return C(...T(W(_), W(v), W(y)));
	}
	function ee() {
		let e = E();
		return W(b) >= .995 ? e : e + Math.round(W(b) * 255).toString(16).padStart(2, "0");
	}
	function te() {
		L(x, ee(), !0), f = W(x), t.onchange?.(W(x));
	}
	function ne(e) {
		let t = S(e);
		return t ? (((e) => {
			var t = m(e, 3);
			L(_, t[0], !0), L(v, t[1], !0), L(y, t[2], !0);
		})(w(t[0], t[1], t[2])), L(b, t[3], !0), L(x, ee(), !0), !0) : !1;
	}
	function re() {
		ne(s()) || ne("#000000"), d = n(), f = "";
		try {
			let e = JSON.parse(localStorage.getItem(a) ?? "[]");
			L(l, Array.isArray(e) ? e : [], !0);
		} catch {
			L(l, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			L(u, Array.isArray(e) ? e : [], !0);
		} catch {
			L(u, [], !0);
		}
		let e = W(p).getBoundingClientRect(), t = W(p).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), c = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(g, {
			top: c,
			left: i
		}, !0), L(h, !0);
	}
	function D() {
		if (L(h, !1), f && f !== d) {
			let e = [f, ...W(l).filter((e) => e !== f)].slice(0, 8);
			localStorage.setItem(a, JSON.stringify(e));
		}
	}
	function ie(e, n) {
		ne(n), L(x, n, !0), t.onchange?.(e);
	}
	function ae(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			L(v, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), L(y, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), te();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function oe(e) {
		ne(e.target.value) ? te() : L(x, E(), !0);
	}
	function se(e) {
		return (S(E()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ce(e, t) {
		let n = S(E()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			L(_, t[0], !0), L(v, t[1], !0), L(y, t[2], !0);
		})(w(...n)), te();
	}
	let le = typeof window < "u" && "EyeDropper" in window;
	async function ue() {
		try {
			ne((await new window.EyeDropper().open()).sRGBHex) && te();
		} catch {}
	}
	function de(e) {
		ne(e) && te();
	}
	function fe() {
		let e = ee();
		W(u).includes(e) || (L(u, [e, ...W(u)].slice(0, 12), !0), localStorage.setItem(o, JSON.stringify(ze(W(u)))));
	}
	function pe(e) {
		L(u, W(u).filter((t) => t !== e), !0), localStorage.setItem(o, JSON.stringify(ze(W(u))));
	}
	bn(() => {
		if (!W(h)) return;
		let e = (e) => {
			W(p) && !W(p).contains(e.target) && D();
		}, t = (e) => {
			e.key === "Escape" && D();
		}, n = () => D();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var me = wi(), he = R(me);
	let ge;
	var _e = B(he, 2), ve = (e) => {
		var t = Ci(), i = R(t), a = R(i);
		j(i);
		var o = B(i, 2);
		Z(o);
		var s = B(o, 2);
		Z(s);
		var d = B(s, 2), f = R(d), p = B(f, 2);
		Z(p);
		var h = B(p, 2), S = (e) => {
			var t = hi();
			G("click", t, ue), q(e, t);
		};
		Y(h, (e) => {
			le && e(S);
		}), j(d);
		var C = B(d, 2);
		zr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = gi();
			Z(r), V((e) => {
				ii(r, "title", t), Q(r, e);
			}, [() => se(W(n))]), G("change", r, (e) => ce(W(n), e.target.value)), q(e, r);
		}), j(C);
		var w = B(C, 2), T = (e) => {
			var t = vi(), i = z(t), a = B(R(i)), o = (e) => {
				var t = Or();
				V((e) => J(t, `- koblet til «${e ?? ""}»`), [() => c()]), q(e, t);
			}, s = /* @__PURE__ */ N(() => c());
			Y(a, (e) => {
				W(s) && e(o);
			}), j(i);
			var l = B(i, 2);
			zr(l, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ N(() => m(W(t), 2));
				let i = () => W(r)[0], a = () => W(r)[1];
				var o = _i();
				let s;
				V(() => {
					s = Xr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Qr(o, `background: ${a() ?? ""}`), ii(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), G("click", o, () => ie(i(), a())), q(e, o);
			}), j(l), q(e, t);
		};
		Y(w, (e) => {
			r().length && e(T);
		});
		var ee = B(w, 2), ne = B(R(ee));
		j(ee);
		var re = B(ee, 2), D = (e) => {
			var t = bi();
			zr(t, 20, () => W(u), (e) => e, (e, t) => {
				var n = yi(), r = R(n), i = B(r, 2);
				j(n), V(() => {
					Qr(r, `background: ${t ?? ""}`), ii(r, "title", t);
				}), G("click", r, () => de(t)), G("click", i, () => pe(t)), q(e, n);
			}), j(t), q(e, t);
		};
		Y(re, (e) => {
			W(u).length && e(D);
		});
		var me = B(re, 2), he = (e) => {
			var t = Si(), n = B(z(t), 2);
			zr(n, 20, () => W(l), (e) => e, (e, t) => {
				var n = xi();
				V(() => {
					Qr(n, `background: ${t ?? ""}`), ii(n, "title", t);
				}), G("click", n, () => de(t)), q(e, n);
			}), j(n), q(e, t);
		};
		Y(me, (e) => {
			W(l).length && e(he);
		}), j(t), V((e, n) => {
			Qr(t, `top: ${W(g).top ?? ""}px; left: ${W(g).left ?? ""}px`), Qr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${W(_) ?? ""}, 100%, 50%)`), Qr(a, `left: ${W(v) * 100}%; top: ${(1 - W(y)) * 100}%`), Q(o, W(_)), Q(s, e), Qr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Qr(f, `background: ${W(x) ?? ""}`), Q(p, W(x));
		}, [() => Math.round(W(b) * 100), () => E()]), G("click", t, (e) => e.preventDefault()), G("pointerdown", i, ae), G("input", o, (e) => {
			L(_, Number(e.target.value), !0), te();
		}), G("input", s, (e) => {
			L(b, Number(e.target.value) / 100), te();
		}), G("change", p, oe), G("click", ne, fe), q(e, t);
	};
	Y(_e, (e) => {
		W(h) && e(ve);
	}), j(me), fi(me, (e) => L(p, e), () => W(p)), V((e, t, n) => {
		ge = Xr(he, 1, "cp-swatch svelte-zxiloo", null, ge, e), Qr(he, `background: ${t ?? ""}`), ii(he, "title", n), ii(he, "aria-label", i());
	}, [
		() => ({ linked: c() }),
		() => s(),
		() => c() ? `${i()} (koblet til temafargen «${c()}»)` : i()
	]), G("click", he, () => W(h) ? D() : re()), q(e, me), We();
}
xr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/imageTools.js
var Ei = 1600, Di = .82, Oi = .6;
async function ki(e, t = Ei) {
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Di);
	return c.size > 4e5 && (c = await s(Oi)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
function Ai(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function ji(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/glyphs.js
var Mi = "urd-recent-glyphs", Ni = [
	["Symboler", "★ ☆ ✦ ✧ ✩ ✪ ✫ ✭ ✮ ✯ ✵ ✳ ✴ ❖ ❋ ✿ ❀ ❁ ✾ ❃ ☘ ◆ ◇ ● ○ ◎ ■ □ ▣ ▲ △ ▼ ▽ ⬡ ⬢ ♦ ♠ ♣ ♥ ♡ ✓ ✔ ✕ ✖ ✗ ✘ ✚ ✜ ☀ ☾ ♪ ♫ ♬ ☮ ☯ ⚜ ⚓ ⚡ ☂ ✂ ✏ ✒ ✉ ☎ ⌛ ⏳ ♻ ⚠ ☑ ⚙ § © ® ™ ° ± × ÷ ∞ ≈ ≠ ≤ ≥ € £ ¥ • ‣ ⁂"],
	["Piler", "→ ← ↑ ↓ ↔ ↕ ↗ ↘ ↙ ↖ ⇒ ⇐ ⇑ ⇓ ⇔ ➜ ➤ ➔ ↩ ↪ ⤴ ⤵ ↺ ↻ ⟲ ⟳ « » ‹ ›"],
	["Smilefjes", "😀 😃 😄 😁 😆 😅 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 😎 🥳 😏 😌 😴 🤔 🤗 🤭 🙃 😢 😭 😤 😡 🤯 😱 🥺 😬 🤓 🫠 🫡 🫶"],
	["Gester og folk", "👍 👎 👏 🙌 🤝 👋 ✌ 🤘 🤞 💪 🙏 👀 🧠 👶 🧒 🧑 🧓 👥 👤 🗣 🏃 🚶 🧍 💃 🕺 🧑‍🤝‍🧑"],
	["Natur", "🌞 🌝 🌙 ⭐ 🌟 ✨ ☁ 🌈 🔥 💧 🌊 ❄ ⛄ 🌸 🌼 🌻 🌹 🌷 🌱 🌲 🌳 🍀 🍁 🍂 🐝 🦋 🐶 🐱 🐦 🦉 🐟 🐢 🌍 🏔 🏕"],
	["Mat og drikke", "☕ 🍵 🥤 🍺 🍷 🥂 🍰 🎂 🧁 🍪 🍩 🍕 🌮 🍔 🍟 🥗 🍎 🍊 🍋 🍇 🍓 🫐 🥕 🌽 🍞 🥐 🧀 🍿 🍦 🍫"],
	["Aktivitet", "⚽ 🏀 🏐 🎾 🏓 🏸 ⛷ 🏂 🚴 🏊 🎮 🎲 ♟ 🎯 🎳 🎣 🥾 ⛺ 🎪 🎭 🎨 🎬 🎤 🎧 🎸 🎹 🥁 🎻 📚 ✈ 🚗 🚲 ⛵ 🚀 🏋 🧘"],
	["Objekter", "💡 🔔 📣 📢 📌 📍 📅 ⏰ 🔑 🔒 🔓 🛠 🔧 🔨 🧰 📦 📫 📧 📱 💻 🖥 🖨 📷 📸 🎥 📺 🔍 🔎 📎 📏 📐 📝 📄 📋 📁 💾 🧾 💰 💳 🪙 🎁 🎈 🎉 🎊 🏆 🥇 🥈 🥉 🏅 🚩 🏁 🔗 🧭 🗺 🧲 🧪 🔬 🔭 💊 🩺 🛡 🕯 🪧 🖼"],
	["Hjerter", "❤ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💗 💓 💕 💖 💘 💝 💞 💟"]
];
function Pi(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function Fi() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Ii(e) {
	let t = Pi(Fi(), e);
	try {
		localStorage.setItem(Mi, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/icons.js
var Li = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", Ri = "fill=\"currentColor\" stroke=\"none\"", zi = {
	facebook: {
		label: "Facebook",
		body: "<path d=\"M15.5 4H13a3.5 3.5 0 0 0-3.5 3.5V10H7v3.2h2.5V20h3.2v-6.8h2.5l.55-3.2h-3.05V7.8c0-.5.4-.8.9-.8h1.9z\"/>"
	},
	instagram: {
		label: "Instagram",
		body: "<rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"4.5\"/><circle cx=\"12\" cy=\"12\" r=\"3.8\"/><circle cx=\"16.9\" cy=\"7.1\" r=\"1.1\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	x: {
		label: "X (Twitter)",
		body: "<path d=\"M5 4h3.8l4 5.4L17.4 4h2.4l-5.9 6.9L20.5 20h-3.8l-4.3-5.8L7.4 20H5l6.3-7.4z\"/>",
		fill: !0
	},
	linkedin: {
		label: "LinkedIn",
		body: "<circle cx=\"4.8\" cy=\"4.8\" r=\"1.7\"/><path d=\"M3.3 9.2h3v11h-3z\"/><path d=\"M9.7 20.2v-11h3v1.6a3.9 3.9 0 0 1 3.3-1.8c2.6 0 4.4 1.8 4.4 4.9v6.3h-3.1v-5.7c0-1.6-.7-2.6-2-2.6-1.4 0-2.5 1-2.5 2.7v5.6z\"/>"
	},
	youtube: {
		label: "YouTube",
		body: "<rect x=\"2.8\" y=\"5.7\" width=\"18.4\" height=\"12.6\" rx=\"3.6\"/><path d=\"M10.2 9.3l5 2.7-5 2.7z\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	tiktok: {
		label: "TikTok",
		body: "<path d=\"M13.8 5v9.3a3.9 3.9 0 1 1-3.9-3.9\"/><path d=\"M13.8 5c.5 2.9 2.6 4.8 5.6 5v3.1c-2.1-.1-4-.8-5.6-2\"/>"
	},
	whatsapp: {
		label: "WhatsApp",
		body: "<path d=\"M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z\"/><path d=\"M9.2 8.4l1 2-.8 1a7.3 7.3 0 0 0 3.2 3.2l1-.8 2 1c-.3 1.3-1.2 1.9-2.4 1.7-2.9-.5-5.2-2.8-5.7-5.7-.2-1.2.4-2.1 1.7-2.4z\"/>"
	},
	snapchat: {
		label: "Snapchat",
		body: "<path d=\"M12 3.2c-2.9 0-4.9 2.1-4.9 5v2.1c-.8.3-1.7.3-2.5.1.3 1 1.1 1.8 2.2 2-.4 1.4-1.5 2.5-3 2.8 1 1.2 2.6 1.9 4.3 1.8.9 1.2 2.3 1.9 3.9 1.9s3-.7 3.9-1.9c1.7.1 3.3-.6 4.3-1.8-1.5-.3-2.6-1.4-3-2.8 1.1-.2 1.9-1 2.2-2-.8.2-1.7.2-2.5-.1V8.2c0-2.9-2-5-4.9-5z\"/>"
	},
	pinterest: {
		label: "Pinterest",
		body: "<path d=\"M9.2 20.5c.4-1.6 1.4-5.6 1.9-7.6\"/><path d=\"M10.4 14.2c.4.9 1.4 1.5 2.6 1.5 2.6 0 4.4-2.2 4.4-5a5.4 5.4 0 1 0-10.4 2.1\"/>"
	},
	spotify: {
		label: "Spotify",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M7.6 9.6c3-.9 6.6-.6 9.1.9\"/><path d=\"M8 12.5c2.5-.7 5.4-.4 7.5.8\"/><path d=\"M8.5 15.2c2-.5 4.2-.3 5.9.7\"/>"
	},
	discord: {
		label: "Discord",
		body: "<path d=\"M8 3.9c-1.6.3-3.1.9-4.5 1.7-1.5 3.2-2.1 6.6-1.7 10a12.7 12.7 0 0 0 5 2.6l1-1.9a11 11 0 0 0 8.4 0l1 1.9a12.7 12.7 0 0 0 5-2.6c.4-3.4-.2-6.8-1.7-10A14 14 0 0 0 16 3.9l-.6 1.4a15 15 0 0 0-6.8 0z\"/><circle cx=\"9.3\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"14.7\" cy=\"11.5\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	github: {
		label: "GitHub",
		body: "<path d=\"M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.6-.2.6-.4v-1.7c-2.6.6-3.1-1.1-3.1-1.1-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2-.2-4.2-1-4.2-4.5 0-1 .4-1.8 1-2.5-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.8 8.8 0 0 1 4.6 0c1.7-1.2 2.5-.9 2.5-.9.5 1.2.2 2.2.1 2.4.6.7 1 1.5 1 2.5 0 3.5-2.2 4.3-4.2 4.5.3.3.6.9.6 1.8v2.6c0 .2.1.5.6.4A9.2 9.2 0 0 0 12 2.8z\"/>",
		fill: !0
	},
	mail: {
		label: "E-post",
		body: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2.5\"/><path d=\"M3.5 7l8.5 6 8.5-6\"/>"
	},
	phone: {
		label: "Telefon",
		body: "<path d=\"M21.2 16.9v2.6a1.8 1.8 0 0 1-2 1.8 18 18 0 0 1-7.8-2.8 17.7 17.7 0 0 1-5.4-5.4A18 18 0 0 1 3.2 5.2a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.5 1.8z\"/>"
	},
	smartphone: {
		label: "Mobil",
		body: "<rect x=\"7\" y=\"2.8\" width=\"10\" height=\"18.4\" rx=\"2.5\"/><line x1=\"10.8\" y1=\"18.2\" x2=\"13.2\" y2=\"18.2\"/>"
	},
	chat: {
		label: "Snakkeboble",
		body: "<path d=\"M20.8 12a8.5 8.5 0 0 1-12.4 7.5L4 20.6l1.1-4.2A8.5 8.5 0 1 1 20.8 12z\"/>"
	},
	send: {
		label: "Send",
		body: "<path d=\"M21 3.5L10.4 14.1\"/><path d=\"M21 3.5l-6.8 17-3.8-6.4L4 10.3z\"/>"
	},
	globe: {
		label: "Nettside",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M3.2 12h17.6\"/><path d=\"M12 3.2c2.4 2.4 3.6 5.4 3.6 8.8s-1.2 6.4-3.6 8.8c-2.4-2.4-3.6-5.4-3.6-8.8S9.6 5.6 12 3.2z\"/>"
	},
	rss: {
		label: "RSS-feed",
		body: "<path d=\"M4.5 11a8.5 8.5 0 0 1 8.5 8.5\"/><path d=\"M4.5 5.5a14 14 0 0 1 14 14\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/>"
	},
	"map-pin": {
		label: "Kartnål",
		body: "<path d=\"M12 21.5s7-6.2 7-11.3A7 7 0 1 0 5 10.2c0 5.1 7 11.3 7 11.3z\"/><circle cx=\"12\" cy=\"10\" r=\"2.6\"/>"
	},
	map: {
		label: "Kart",
		body: "<path d=\"M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z\"/><path d=\"M9 4v14\"/><path d=\"M15 6v14\"/>"
	},
	home: {
		label: "Hjem",
		body: "<path d=\"M4 10.5l8-7 8 7V20a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20z\"/><path d=\"M9.5 21.5V14h5v7.5\"/>"
	},
	clock: {
		label: "Klokke",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 7v5l3.2 2\"/>"
	},
	calendar: {
		label: "Kalender",
		body: "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"16\" rx=\"2.5\"/><path d=\"M3.5 10h17\"/><path d=\"M8 2.8V7\"/><path d=\"M16 2.8V7\"/>"
	},
	heart: {
		label: "Hjerte",
		body: "<path d=\"M12 20.5S3.5 15.4 3.5 9.5A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.5c0 5.9-8.5 11-8.5 11z\"/>"
	},
	star: {
		label: "Stjerne",
		body: "<path d=\"M12 3.5l2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9z\"/>"
	},
	check: {
		label: "Hake",
		body: "<path d=\"M4.5 12.8L9.5 18 19.5 6.5\"/>"
	},
	cross: {
		label: "Kryss",
		body: "<path d=\"M6 6l12 12\"/><path d=\"M18 6L6 18\"/>"
	},
	plus: {
		label: "Pluss",
		body: "<path d=\"M12 5v14\"/><path d=\"M5 12h14\"/>"
	},
	info: {
		label: "Info",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M12 11v5.5\"/><line x1=\"12\" y1=\"7.8\" x2=\"12\" y2=\"7.8\"/>"
	},
	question: {
		label: "Spørsmål",
		body: "<circle cx=\"12\" cy=\"12\" r=\"8.8\"/><path d=\"M9.4 9.2A2.7 2.7 0 0 1 12 7.4c1.5 0 2.7 1 2.7 2.4 0 1.8-2.7 2-2.7 4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	warning: {
		label: "Advarsel",
		body: "<path d=\"M12 4L2.8 19.5h18.4z\"/><path d=\"M12 10v4\"/><line x1=\"12\" y1=\"16.8\" x2=\"12\" y2=\"16.8\"/>"
	},
	zap: {
		label: "Lyn",
		body: "<path d=\"M13 2.8L4.5 13.5H11l-1 7.7 8.5-10.7H12z\"/>"
	},
	sun: {
		label: "Sol",
		body: "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7\"/>"
	},
	moon: {
		label: "Måne",
		body: "<path d=\"M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z\"/>"
	},
	leaf: {
		label: "Blad",
		body: "<path d=\"M5 19C5 9 11 4.5 20 4.5c0 9-4.5 15-13 14.5z\"/><path d=\"M5 19c2-5.5 5.5-9 10-11\"/>"
	},
	music: {
		label: "Musikk",
		body: "<circle cx=\"7\" cy=\"17.5\" r=\"2.8\"/><circle cx=\"17\" cy=\"15.5\" r=\"2.8\"/><path d=\"M9.8 17.5V6.5l10-2v11\"/>"
	},
	camera: {
		label: "Kamera",
		body: "<path d=\"M3.5 8.5A1.5 1.5 0 0 1 5 7h2.5l1.7-2.3h5.6L16.5 7H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z\"/><circle cx=\"12\" cy=\"13\" r=\"3.4\"/>"
	},
	image: {
		label: "Bilde",
		body: "<rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"2.5\"/><circle cx=\"8.8\" cy=\"9.3\" r=\"1.6\"/><path d=\"M20.5 15.5l-4.7-4.7-9.3 8.7\"/>"
	},
	document: {
		label: "Dokument",
		body: "<path d=\"M13.5 3H6.8A1.8 1.8 0 0 0 5 4.8v14.4A1.8 1.8 0 0 0 6.8 21h10.4a1.8 1.8 0 0 0 1.8-1.8V8.5z\"/><path d=\"M13.5 3v5.5H19\"/><path d=\"M8.5 13h7M8.5 16.5h7\"/>"
	},
	"shopping-bag": {
		label: "Handlepose",
		body: "<path d=\"M5.5 8h13l-1 12a1.8 1.8 0 0 1-1.8 1.5H8.3A1.8 1.8 0 0 1 6.5 20z\"/><path d=\"M8.8 10.5V7a3.2 3.2 0 0 1 6.4 0v3.5\"/>"
	},
	gift: {
		label: "Gave",
		body: "<rect x=\"3.5\" y=\"8\" width=\"17\" height=\"4\"/><path d=\"M5 12v8.5h14V12\"/><path d=\"M12 8v12.5\"/><path d=\"M12 8s-4.5.3-5.5-1.8C5.8 4.7 7.8 3.3 9.3 4.4 10.8 5.5 12 8 12 8z\"/><path d=\"M12 8s4.5.3 5.5-1.8c.7-1.5-1.3-2.9-2.8-1.8C13.2 5.5 12 8 12 8z\"/>"
	},
	wrench: {
		label: "Verktøy",
		body: "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z\"/>"
	},
	lock: {
		label: "Lås",
		body: "<rect x=\"5\" y=\"10.5\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3\"/>"
	},
	search: {
		label: "Søk",
		body: "<circle cx=\"10.8\" cy=\"10.8\" r=\"6.8\"/><path d=\"M15.8 15.8L21 21\"/>"
	},
	user: {
		label: "Person",
		body: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4.5 20.5a7.5 7.5 0 0 1 15 0\"/>"
	},
	users: {
		label: "Personer",
		body: "<circle cx=\"9\" cy=\"8.5\" r=\"3.5\"/><path d=\"M2.8 20a6.2 6.2 0 0 1 12.4 0\"/><path d=\"M16 5.4a3.5 3.5 0 0 1 0 6.2\"/><path d=\"M17.8 14.6a6.2 6.2 0 0 1 3.4 5.4\"/>"
	},
	"thumbs-up": {
		label: "Tommel opp",
		body: "<path d=\"M3.5 10.5H7v10H3.5z\"/><path d=\"M7 19.5V11l4.2-5.6a1.7 1.7 0 0 1 3 1.4l-.9 3.7h4.8a2 2 0 0 1 2 2.4l-1.2 5.5a2 2 0 0 1-2 1.6H8.6\"/>"
	},
	"arrow-right": {
		label: "Pil høyre",
		body: "<path d=\"M4 12h16\"/><path d=\"M13.5 5.5L20 12l-6.5 6.5\"/>"
	},
	"arrow-left": {
		label: "Pil venstre",
		body: "<path d=\"M20 12H4\"/><path d=\"M10.5 5.5L4 12l6.5 6.5\"/>"
	},
	"arrow-up": {
		label: "Pil opp",
		body: "<path d=\"M12 20V4\"/><path d=\"M5.5 10.5L12 4l6.5 6.5\"/>"
	},
	"arrow-down": {
		label: "Pil ned",
		body: "<path d=\"M12 4v16\"/><path d=\"M5.5 13.5L12 20l6.5-6.5\"/>"
	},
	"external-link": {
		label: "Ekstern lenke",
		body: "<path d=\"M9.5 5H5.8A1.8 1.8 0 0 0 4 6.8v11.4A1.8 1.8 0 0 0 5.8 20h11.4a1.8 1.8 0 0 0 1.8-1.8v-3.7\"/><path d=\"M13.5 4H20v6.5\"/><path d=\"M20 4l-9 9\"/>"
	},
	download: {
		label: "Nedlasting",
		body: "<path d=\"M12 3.5v11\"/><path d=\"M6.5 9l5.5 5.5L17.5 9\"/><path d=\"M4 20.5h16\"/>"
	},
	share: {
		label: "Deling",
		body: "<circle cx=\"6\" cy=\"12\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"5.5\" r=\"2.6\"/><circle cx=\"17.5\" cy=\"18.5\" r=\"2.6\"/><path d=\"M8.4 10.8l6.8-4M8.4 13.2l6.8 4\"/>"
	}
}, Bi = [
	["Sosiale medier", [
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
	["Kommunikasjon", [
		"mail",
		"phone",
		"smartphone",
		"chat",
		"send",
		"globe",
		"rss"
	]],
	["Sted og tid", [
		"map-pin",
		"map",
		"home",
		"clock",
		"calendar"
	]],
	["Symboler", [
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
		"gift",
		"wrench",
		"lock",
		"search",
		"user",
		"users",
		"thumbs-up"
	]],
	["Piler", [
		"arrow-right",
		"arrow-left",
		"arrow-up",
		"arrow-down",
		"external-link",
		"download",
		"share"
	]]
];
function Vi(e) {
	let t = typeof e == "string" ? zi[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? Ri : Li} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Hi = /* @__PURE__ */ K("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Ui = /* @__PURE__ */ K("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Wi = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Gi = /* @__PURE__ */ K("<!> <div class=\"gp-group svelte-15ln1c3\">Tegn og emoji</div>", 1), Ki = /* @__PURE__ */ K("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), qi = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ji = /* @__PURE__ */ K("<button type=\"button\"> </button>"), Yi = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), Xi = /* @__PURE__ */ K("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Zi = /* @__PURE__ */ K("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function Qi(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "icon", 3, null), i = pi(t, "label", 3, "Velg tegn"), a = /* @__PURE__ */ I(tn([])), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(!1), l = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0
	}));
	function u() {
		L(a, Fi(), !0);
		let e = W(o).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		L(l, {
			top: n,
			left: t
		}, !0), L(c, !0);
	}
	function d(e) {
		Ii(e), t.onpick?.(e), L(c, !1);
	}
	function f(e) {
		t.onicon?.(e), L(c, !1);
	}
	async function p(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await ki(n, 256);
		t.onimage?.(r.dataUrl), L(c, !1);
	}
	bn(() => {
		if (!W(c)) return;
		let e = (e) => {
			W(o) && !W(o).contains(e.target) && L(c, !1);
		}, t = (e) => {
			e.key === "Escape" && L(c, !1);
		}, n = (e) => {
			W(o) && e.target instanceof Node && !W(o).contains(e.target) && L(c, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var h = Zi(), g = R(h), _ = R(g), v = (e) => {
		var t = Hi();
		X(t, () => Vi(r()), !0), j(t), q(e, t);
	}, y = (e) => {
		var t = Or();
		V(() => J(t, n() || "★")), q(e, t);
	};
	Y(_, (e) => {
		r() && zi[r()] ? e(v) : e(y, -1);
	}), j(g);
	var b = B(g, 2), x = (e) => {
		var i = Xi(), o = R(i), c = (e) => {
			var t = Gi();
			zr(z(t), 17, () => Bi, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => m(W(t), 2));
				let i = () => W(n)[0], a = () => W(n)[1];
				var o = Wi(), s = z(o), c = R(s, !0);
				j(s);
				var l = B(s, 2);
				zr(l, 20, a, (e) => e, (e, t) => {
					var n = Ui();
					let i;
					var a = R(n);
					X(a, () => Vi(t), !0), j(a), j(n), V(() => {
						i = Xr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), ii(n, "title", zi[t].label);
					}), G("click", n, () => f(t)), q(e, n);
				}), j(l), V(() => J(c, i())), q(e, o);
			}), M(2), q(e, t);
		};
		Y(o, (e) => {
			t.onicon && e(c);
		});
		var u = B(o, 2), h = (e) => {
			var t = qi(), n = B(z(t), 2);
			zr(n, 20, () => W(a), (e) => e, (e, t) => {
				var n = Ki(), r = R(n, !0);
				j(n), V(() => J(r, t)), G("click", n, () => d(t)), q(e, n);
			}), j(n), q(e, t);
		};
		Y(u, (e) => {
			W(a).length && e(h);
		});
		var g = B(u, 2);
		zr(g, 17, () => Ni, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = Wi(), s = z(o), c = R(s, !0);
			j(s);
			var l = B(s, 2);
			zr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Ji();
				let i;
				var a = R(r, !0);
				j(r), V(() => {
					i = Xr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), J(a, t);
				}), G("click", r, () => d(t)), q(e, r);
			}), j(l), V(() => J(c, i())), q(e, o);
		});
		var _ = B(g, 2), v = (e) => {
			var t = Yi(), n = B(z(t), 2), r = B(n, 2);
			fi(r, (e) => L(s, e), () => W(s)), M(2), G("click", n, () => W(s).click()), G("change", r, p), q(e, t);
		};
		Y(_, (e) => {
			t.onimage && e(v);
		}), j(i), V(() => Qr(i, `top: ${W(l).top ?? ""}px; left: ${W(l).left ?? ""}px`)), q(e, i);
	};
	Y(b, (e) => {
		W(c) && e(x);
	}), j(h), fi(h, (e) => L(o, e), () => W(o)), V(() => {
		ii(g, "title", i()), ii(g, "aria-label", i());
	}), G("click", g, () => W(c) ? L(c, !1) : u()), q(e, h), We();
}
xr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function $i(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n);
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
var ea = /* @__PURE__ */ K("<button type=\"button\"> </button>"), ta = /* @__PURE__ */ K("<div class=\"dd-pop svelte-vtocc6\"></div>"), na = /* @__PURE__ */ K("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	Ue(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ I(!1), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(tn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		if (a()) return;
		if (W(o)) {
			L(o, !1);
			return;
		}
		let e = W(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		L(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0), L(o, !0);
	}
	function d(e) {
		L(o, !1), t.onchange?.(e);
	}
	bn(() => {
		if (!W(o)) return;
		let e = (e) => {
			W(s) && !W(s).contains(e.target) && L(o, !1);
		}, t = (e) => {
			e.key === "Escape" && L(o, !1);
		}, n = (e) => {
			W(s) && e.target instanceof Node && !W(s).contains(e.target) && L(o, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var f = na(), p = R(f), h = R(p), g = R(h, !0);
	j(h);
	var _ = B(h, 2), v = R(_, !0);
	j(_), j(p);
	var y = B(p, 2), b = (e) => {
		var t = ta();
		zr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = ea();
			let s;
			var c = R(o, !0);
			j(o), V(() => {
				s = Xr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), J(c, a());
			}), G("click", o, () => d(i())), q(e, o);
		}), j(t), V(() => Qr(t, `top: ${W(c).top ?? ""}px; left: ${W(c).left ?? ""}px; min-width: ${W(c).width ?? ""}px`)), q(e, t);
	};
	Y(y, (e) => {
		W(o) && e(b);
	}), j(f), fi(f, (e) => L(s, e), () => W(s)), V((e) => {
		ii(p, "title", i()), p.disabled = a(), J(g, e), J(v, W(o) ? "▴" : "▾");
	}, [() => l()]), G("click", p, u), q(e, f), We();
}
xr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ra = /* @__PURE__ */ K("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function ia(e, t) {
	Ue(t, !0);
	let n = pi(t, "image", 3, ""), r = /* @__PURE__ */ I(null), i = /* @__PURE__ */ I(null), a = /* @__PURE__ */ I(1), o = /* @__PURE__ */ I(.5), s = /* @__PURE__ */ I(.5), c = /* @__PURE__ */ I(1), l = /* @__PURE__ */ I(1), u = /* @__PURE__ */ I(1);
	bn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			L(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !W(i)) return;
		e.filter = `brightness(${W(c)}) contrast(${W(l)}) saturate(${W(u)})`;
		let n = Math.max(t / W(i).width, t / W(i).height) * W(a), r = W(i).width * n, d = W(i).height * n, f = t / 2 - W(o) * r, p = t / 2 - W(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(W(i), f, p, r, d), e.filter = "none";
	}
	bn(() => {
		W(i), W(a), W(o), W(s), W(c), W(l), W(u), W(r) && d(W(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!W(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / W(i).width, 220 / W(i).height) * W(a), c = W(i).width * r, l = W(i).height * r, u = (e) => {
			L(o, Math.min(1, Math.max(0, W(o) - (e.clientX - t) / c)), !0), L(s, Math.min(1, Math.max(0, W(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		L(a, 1), L(o, .5), L(s, .5), L(c, 1), L(l, 1), L(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ra(), g = R(h), _ = B(R(g), 2), v = R(_);
	ii(v, "width", 220), ii(v, "height", 220), fi(v, (e) => L(r, e), () => W(r)), M(2), j(_);
	var y = B(_, 2), b = B(R(y)), x = R(b);
	j(b), j(y);
	var S = B(y, 2);
	Z(S);
	var C = B(S, 2), w = B(R(C)), T = R(w);
	j(w), j(C);
	var E = B(C, 2);
	Z(E);
	var ee = B(E, 2), te = B(R(ee)), ne = R(te);
	j(te), j(ee);
	var re = B(ee, 2);
	Z(re);
	var D = B(re, 2), ie = B(R(D)), ae = R(ie);
	j(ie), j(D);
	var oe = B(D, 2);
	Z(oe);
	var se = B(oe, 2), ce = R(se), le = B(ce, 2);
	j(se);
	var ue = B(se, 2), de = R(ue), fe = B(de, 2);
	j(ue), j(g), j(h), V((e, t, n, r) => {
		J(x, `${e ?? ""}x`), J(T, `${t ?? ""}%`), J(ne, `${n ?? ""}%`), J(ae, `${r ?? ""}%`);
	}, [
		() => W(a).toFixed(2),
		() => Math.round(W(c) * 100),
		() => Math.round(W(l) * 100),
		() => Math.round(W(u) * 100)
	]), G("pointerdown", v, f), ci(S, () => W(a), (e) => L(a, e)), ci(E, () => W(c), (e) => L(c, e)), ci(re, () => W(l), (e) => L(l, e)), ci(oe, () => W(u), (e) => L(u, e)), G("click", ce, () => L(u, 0)), G("click", le, p), G("click", de, () => t.oncancel?.()), G("click", fe, m), q(e, h), We();
}
xr(["pointerdown", "click"]);
var aa = (e) => Math.round(e * 100) / 100;
function oa(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var sa = {
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
					x: aa(n.x * 100 / r.columns),
					w: aa(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= oa(t.grid);
		return e;
	}
}, ca = { 1: (e) => (e.grid = oa(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function la(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ca[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function ua(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = sa[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function da(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var fa = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function pa(e, t) {
	let n = da(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = da(t[2]), a = fa(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var ma = /^[a-z0-9][a-z0-9-]*$/;
function ha(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (ma.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), da(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function ga(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function _a(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var va = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = _a(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, ya = {
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
		let n = t.stops.map(_a).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, ba = {
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
		let n = _a(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, xa = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Sa = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = xa, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Ca = {
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
};
//#endregion
//#region ../template/assets/engine/galleri-model.js
function wa(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Ta({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function Ea(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/backgrounds/bildegalleri.js
var Da = {
	version: 1,
	label: "Bildegalleri",
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
		let n = (t.images ?? []).filter((e) => e?.src);
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = t.fit === "contain" ? "contain" : "cover", e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = `${(n.x ?? .5) * 100}% ${(n.y ?? .5) * 100}%`;
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
		if (!Ta({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(Ea(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = wa(l, 1, n.length), r = new Image();
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
}, Oa = () => ({
	duration: 600,
	delay: 0
}), ka = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: Oa,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: Oa,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: Oa,
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
var Aa = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), ja = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), Ma = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), Na = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), Pa = /* @__PURE__ */ K("<!> Ren visning", 1), Fa = /* @__PURE__ */ K("<!> Rediger", 1), Ia = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"><!> </span>"), La = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), Ra = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button> </button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), za = /* @__PURE__ */ K("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Ba = /* @__PURE__ */ K("<button> </button>"), Va = /* @__PURE__ */ K("<!> <!>", 1), Ha = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Ua = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Wa = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), Ga = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), Ka = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), qa = /* @__PURE__ */ K("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), Ja = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Ya = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), Xa = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt den flytende menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt menyen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over menyen</label>", 1), Za = /* @__PURE__ */ K("<label title=\"Justeringen av menypunktene inne i kolonnen\" class=\"svelte-1n46o8q\">Tekstjustering <!></label>"), Qa = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label>"), $a = /* @__PURE__ */ K("<label title=\"Hvor sterk gløden bak teksten er\" class=\"svelte-1n46o8q\">Glødstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), eo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\"> <!></label>"), to = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bakgrunnsbildet\"></button>"), no = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Bildestyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (høyde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i høyden: 0 = toppen, 100 = bunnen. Monner mest i topplinjen\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Bildeutsnitt (bredde) <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvilken del av bildet som vises i bredden: 0 = venstre, 100 = høyre. Monner mest i sidestilt kolonne\" class=\"svelte-1n46o8q\"/>", 1), ro = /* @__PURE__ */ K("<label title=\"Fargen på pille-punktene (standard er undermenyens flate)\" class=\"svelte-1n46o8q\">Punktfarge <!></label>"), io = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: undermenyen og mobilpanelet får kun bakgrunnsfargen, ikke bildet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Bakgrunnsbilde også i undermenyen</label>"), ao = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), oo = /* @__PURE__ */ K("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), so = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), co = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Sidestilt meny: dra i kolonnekanten i forhåndsvisningen for å endre bredden; på mobil og trange vinduer vises den som topplinje\" class=\"svelte-1n46o8q\">Navigasjonsmeny <!></label> <!> <!> <label title=\"0 % = helt tett flate, 100 % = helt gjennomsiktig meny\" class=\"svelte-1n46o8q\">Gjennomsiktighet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når gjennomsiktigheten er høy)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Størrelse <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <!> <!> <label title=\"Tekstfargen når pekeren er over et menypunkt\" class=\"svelte-1n46o8q\">Tekstfarge ved hover <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Bakgrunnsfargen med gjennomsiktigheten legger seg som et slør over bildet; komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Undermeny</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Design <!></label> <!> <label title=\"Punktene i undermenyen legges i rutenett: 2 kolonner gir 2x2, 2x3 osv.\" class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label> <!></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), lo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Hovedtemaet er <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargene under gjelder motsatt modus. Første besøk følger besøkendes OS-innstilling; bryteren i menyen husker valget.</p> <!> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action tb-grow svelte-1n46o8q\" title=\"Erstatter fargene over med inverterte utgaver av hovedtemaet\">Foreslå på nytt (inverter)</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern det alternative temaet (bryteren i menyen forsvinner)\"></button></span>", 1), uo = /* @__PURE__ */ K("<button class=\"ghost action svelte-1n46o8q\">+ Lag alternativt tema</button> <p class=\"panel-hint svelte-1n46o8q\">Gir siden en lys/mørk-bryter i menyen. Starter med inverterte utgaver av dagens farger, som du justerer selv.</p>", 1), fo = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), po = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), mo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <!></label> <label class=\"svelte-1n46o8q\">Flater <!></label> <label class=\"svelte-1n46o8q\">Tekst <!></label> <label class=\"svelte-1n46o8q\">Aksent <!></label> <label title=\"Tekstfargen oppå aksentflater (primærknapper m.m.)\" class=\"svelte-1n46o8q\">Tekst på aksent <!></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lys/mørk-bryter</summary> <div class=\"group-items svelte-1n46o8q\"><!></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <p class=\"panel-hint svelte-1n46o8q\">Vises i nettleserfanen og bokmerker. Last opp et bilde, så beskjærer du det til et kvadratisk ikon i editoren.</p></div>"), ho = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button>"), go = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), _o = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), vo = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Galleri</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Bildegalleri med rutenett-, karusell- eller lysbildevisning\">Tomt galleri</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg flere bilder samtidig og få dem rett inn i et galleri\">Galleri med bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), yo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), bo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <!></label> <label class=\"svelte-1n46o8q\">Størrelse</label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"px\" title=\"Egen størrelse i px\"/></span> <label title=\"Avstanden mellom tekstlinjene, i forhold til skriftstørrelsen\" class=\"svelte-1n46o8q\">Linjeavstand <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"1\" max=\"2.5\" step=\"0.05\"/></span> <label title=\"Avstanden mellom bokstavene; negativ er tettere enn normalt\" class=\"svelte-1n46o8q\">Bokstavavstand <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <span class=\"toolbar-row svelte-1n46o8q\"><button title=\"Arv fra tema\">A</button> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"-1\" max=\"8\" step=\"0.1\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Font, størrelse og avstandene gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), xo = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), So = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), Co = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label>"), wo = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), To = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), Eo = /* @__PURE__ */ K("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/>"), Do = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Tilbake til tegnet/emojien\">Fjern tegnet ikon</button>"), Oo = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), ko = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Ikon <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tegnede ikoner og tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), Ao = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), jo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Luft mellom bildene <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Mo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), No = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri - vinner over fullskjerm\" class=\"svelte-1n46o8q\"/></label></div>"), Po = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Visning <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\">Klikk et bilde i forhåndsvisningen for utsnitt, zoom og filtre (bildeeditoren).</p>", 1), Fo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Io = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), Lo = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Ro = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), zo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Bo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Vo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fra <!></label> <label class=\"svelte-1n46o8q\">Til <!></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), Ho = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Uo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Wo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Go = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), Ko = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), qo = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig; komprimeres til webp\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Overgang <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnen blar gjennom bildene med myk overgang. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første.</p>", 1), Jo = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), Yo = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <!></label> <!>", 1), Xo = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Zo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Qo = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <!></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), $o = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label>"), es = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), ts = /* @__PURE__ */ K("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), ns = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), rs = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), is = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), as = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), os = /* @__PURE__ */ K("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), ss = /* @__PURE__ */ K("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), cs = /* @__PURE__ */ K("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), ls = /* @__PURE__ */ K("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), us = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), ds = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), fs = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), ps = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), ms = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), hs = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), gs = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), _s = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), vs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), ys = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), bs = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), xs = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Ss = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Cs = /* @__PURE__ */ K("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), ws = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Ts = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), Es = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Ds = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>");
function Os(e, t) {
	Ue(t, !0);
	let n = [
		["color", va],
		["gradient", ya],
		["glow", ba],
		["image", Ca],
		["bildegalleri", Da],
		["grain", Sa]
	], r = Object.fromEntries(n), i = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>",
		up: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20V4\"/><path d=\"M5 11l7-7 7 7\"/></svg>",
		down: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4v16\"/><path d=\"M5 13l7 7 7-7\"/></svg>",
		right: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16\"/><path d=\"M13 5l7 7-7 7\"/></svg>",
		cross: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 5l14 14\"/><path d=\"M19 5L5 19\"/></svg>",
		plus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M12 5v14\"/><path d=\"M5 12h14\"/></svg>"
	}, a = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], o = /* @__PURE__ */ I(tn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	bn(() => {
		document.documentElement.dataset.adminTheme = W(o), localStorage.setItem("urd-admin-theme", W(o));
	});
	let s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(null), l = /* @__PURE__ */ I(!1), u = /* @__PURE__ */ I(""), d = /* @__PURE__ */ I("info"), f = 0;
	function p(e, t = "info") {
		L(u, e, !0), L(d, t, !0);
		let n = ++f;
		t === "ok" && setTimeout(() => {
			f === n && (L(u, ""), L(d, "info"));
		}, 8e3);
	}
	let h = /* @__PURE__ */ I(null), g = /* @__PURE__ */ I(null), _ = /* @__PURE__ */ I(tn({
		size: 16,
		snap: !0
	})), v = /* @__PURE__ */ I(!0), y = /* @__PURE__ */ I("desktop");
	bn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = W(y);
		T?.sendViewport(e);
	});
	let b = /* @__PURE__ */ I(0);
	function x() {
		L(b, C?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function S(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, x(), T?.sendAttention(e.id, !0));
	}
	let C = null, w = null, T = null, E = /* @__PURE__ */ I(null);
	function ee() {
		L(E, w.data, !0), w.replace(W(E));
	}
	function te() {
		T?.sendSite(ze(W(E)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => W(E).pages.find((e) => e.id === W(c));
	function D() {
		let e = W(E)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = dn?.hasDraft() || Object.values(fn).some((e) => e.hasDraft());
		L(l, e || C?.hasDraft() && !ne.has(W(c)) || w?.hasDraft() || Mn?.hasDraft() || t || !1, !0);
	}
	let ie = [], ae = [], oe = null;
	function se() {
		return JSON.stringify({
			pageId: W(c),
			page: C.data,
			site: w.data
		});
	}
	function ce(e) {
		e === oe && (e.startsWith("edit:") || e.startsWith("grid:")) || (ie.push(se()), ie.length > 50 && ie.shift(), ae.length = 0, oe = e);
	}
	function le(e) {
		let { pageId: t, page: n, site: r } = JSON.parse(e);
		if (w.replace(r), ee(), w.save(), L(_, {
			snap: !0,
			...W(E).grid
		}, !0), te(), t && t !== W(c) && W(E).pages.some((e) => e.id === t)) {
			localStorage.setItem(`urd-draft-${t}`, JSON.stringify(n)), At(t, { keepHistory: !0 }), D();
			return;
		}
		C.replace(n), C.save(), D(), x(), De(), He(C.data.sections.find((e) => e.id === W(Ie))), W(E).pages.some((e) => e.id === W(c)) ? T?.sendPage(W(c), C.data) : At(W(E).pages[0].id, { keepHistory: !0 });
	}
	function ue() {
		ie.length && (ae.push(se()), le(ie.pop()), oe = null, p("Angret"));
	}
	function de() {
		ae.length && (ie.push(se()), le(ae.pop()), oe = null, p("Gjentatt"));
	}
	function fe(e) {
		if (!(e.ctrlKey || e.metaKey)) return;
		let t = e.key.toLowerCase();
		if (t === "d") {
			if (e.target instanceof HTMLElement && (e.target.isContentEditable || [
				"INPUT",
				"TEXTAREA",
				"SELECT"
			].includes(e.target.tagName)) || !W(O) || W(y) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? de() : ue());
	}
	async function pe() {
		L(s, la(await (await fetch("/content/site.json")).json()), !0), w = mi("urd-draft-site", () => W(s)), w.replace(la(w.data)), w.save(), ee(), L(_, {
			snap: !0,
			...W(E).grid
		}, !0), await At(new URLSearchParams(location.search).get("page") ?? W(E).pages[0].id), await Un(), await yn(), await _t(), yt(), (W(E).site.setup === !0 || W(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (L(ve, W(E).site.title, !0), L(ye, W(E).theme.tokens.color.accent, !0), L(be, W(E).theme.tokens.color.bg, !0), L(_e, !0));
	}
	let me = /* @__PURE__ */ I(null);
	function he({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			L(me, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function ge(e) {
		W(me)?.resolve(e), L(me, null);
	}
	let _e = /* @__PURE__ */ I(!1), ve = /* @__PURE__ */ I(""), ye = /* @__PURE__ */ I("#7c5cff"), be = /* @__PURE__ */ I("#0b0e14");
	function xe() {
		localStorage.setItem("urd-setup-done", "1"), L(_e, !1);
	}
	function Se() {
		let e = W(ve).trim();
		e && (F("setup", () => {
			W(E).site.title = e, W(E).nav.logo = {
				type: "text",
				value: e
			}, W(E).theme.tokens.color.accent = W(ye), W(E).theme.tokens.color.bg = W(be), delete W(E).site.setup;
		}), xe(), p("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let Ce = /* @__PURE__ */ I(null), we = [
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
	function Te(e) {
		L(Ce, W(Ce) === e ? null : e, !0), T?.sendShowGrid(W(Ce) === "Grid"), W(Ce) === "Historikk" && wt();
	}
	let O = /* @__PURE__ */ I(null);
	function Ee(e, t) {
		let n = C?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function De() {
		if (!W(O)) return;
		let { block: e } = Ee(W(O).sectionId, W(O).blockId);
		if (!e) {
			L(O, null);
			return;
		}
		L(O, {
			sectionId: W(O).sectionId,
			blockId: W(O).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null
		}, !0);
	}
	function Oe(e) {
		if (!e.blockId) {
			L(O, null);
			return;
		}
		L(O, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), De();
	}
	function ke(e, t) {
		let { section: n, block: r } = Ee(W(O)?.sectionId, W(O)?.blockId);
		r && (ce(e), t(r, n), S(n, "blokk-endret"), C.save(), D(), T?.sendSection(W(c), n), De());
	}
	function k(e, t) {
		ke(`edit:${W(O).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function Ae(e, t) {
		Number.isFinite(t) && ke(`edit:frame-${W(O).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function A(e) {
		ke("decor", (t) => {
			t.decor = e;
		});
	}
	async function je(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			ke(`edit:${W(O).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ai(t.name).replaceAll("-", " ");
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Me = [
		["S", 14],
		["M", 18],
		["L", 24],
		["XL", 36]
	], Ne = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon",
		galleri: "Galleri"
	}, Pe = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], Fe = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Ie = /* @__PURE__ */ I(null), Le = /* @__PURE__ */ I(null), Re = /* @__PURE__ */ I(""), Be = /* @__PURE__ */ I(tn([])), Ve = /* @__PURE__ */ I(null);
	function He(e) {
		L(Le, e?.grid ? { ...e.grid } : null, !0), L(Re, e?.size?.minHeight ?? "", !0), L(Be, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), L(Ve, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Ge(e) {
		L(Ie, e.sectionId, !0), He(C?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Ke(e, t) {
		let n = C.data.sections.find((e) => e.id === W(Ie));
		n && (ce(e), t(n), C.save(), D(), T?.sendSection(W(c), n), He(n));
	}
	let qe = /* @__PURE__ */ I("color");
	function Je(e) {
		Ke("bg", (t) => {
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
	function Ye(e) {
		Ke("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Xe(e, t) {
		let n = e + t;
		Ke("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function Ze(e, t, n) {
		Ke(`edit:bg-${W(Ie)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Qe(e, t, n) {
		Ke(`edit:bg-${W(Ie)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function $e(e, t) {
		Ke("bg", (n) => {
			n.background.layers[e].type !== t && (n.background.layers[e] = {
				type: t,
				version: 1,
				props: r[t].defaults()
			});
		});
	}
	async function et(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			Ze(e, "src", (await ki(n)).dataUrl);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function tt(e, t) {
		let n = [...t.target.files ?? []];
		if (t.target.value = "", !n.length) return;
		p("Komprimerer bildene…");
		let { images: r, failed: i, big: a } = await Yr(n);
		r.length && Ke("bg", (t) => {
			let n = t.background.layers[e].props;
			n.images ??= [], n.images.push(...r.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Zr(r.length, i, a);
	}
	function nt(e, t, n) {
		Ke("bg", (r) => {
			let i = r.background.layers[e].props.images, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function rt(e, t) {
		Ke("bg", (n) => {
			n.background.layers[e].props.images.splice(t, 1);
		});
	}
	function it(e, t, n, r) {
		Ke(`edit:bgg-${W(Ie)}-${e}-${t}-${n}`, (i) => {
			i.background.layers[e].props.images[t][n] = r;
		});
	}
	let ot = () => Object.entries(W(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]);
	function st(e) {
		return {
			type: e,
			version: ka[e].version,
			props: ka[e].defaults()
		};
	}
	function ct(e) {
		ke(`edit:anim-${W(O).blockId}`, (t) => {
			t.animation = e ? st(e) : null;
		}), W(O) && T?.sendDemoAnim(W(O).sectionId, W(O).blockId);
	}
	function lt(e, t) {
		Number.isFinite(t) && (ke(`edit:anim-${W(O).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(O) && T?.sendDemoAnim(W(O).sectionId, W(O).blockId));
	}
	function ut(e) {
		Ke("section-anim", (t) => {
			t.animation = e ? st(e) : null;
		}), T?.sendDemoAnim(W(Ie));
	}
	function dt(e, t) {
		Number.isFinite(t) && (Ke("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(W(Ie)));
	}
	function ft(e) {
		let t = C.data.sections.find((e) => e.id === W(Ie));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		ce("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, L(Re, r, !0), C.save(), D(), T?.sendSection(W(c), t);
	}
	function pt() {
		return C.data.sections.find((e) => e.id === W(Ie)) ?? C.data.sections[0];
	}
	function mt(e) {
		let t = C.data.sections.find((e) => e.id === W(Ie));
		t && (ce("grid:section"), t.grid = e ? { ...w.data.grid } : null, L(Le, t.grid ? { ...t.grid } : null, !0), C.save(), D(), T?.sendSection(W(c), t), W(Ce) === "Grid" && T?.sendShowGrid(!0));
	}
	function ht(e, t) {
		let n = C.data.sections.find((e) => e.id === W(Ie));
		n?.grid && (ce("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, L(Le, { ...n.grid }, !0), C.save(), D(), T?.sendSection(W(c), n), W(Ce) === "Grid" && T?.sendShowGrid(!0));
	}
	function gt(e, t) {
		ce("grid:site"), L(_, {
			...W(_),
			[e]: t
		}, !0), w.data.grid = {
			...w.data.grid,
			[e]: t
		}, w.save(), D(), te(), W(Ce) === "Grid" && T?.sendShowGrid(!0);
	}
	async function _t() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(g, await e.json(), !0) : e.status !== 503 && L(g, null);
		} catch {
			L(g, null);
		}
	}
	let vt = null;
	async function yt() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (vt = (await e.json()).head ?? null);
		} catch {}
	}
	async function bt(e) {
		if (!vt) return await yt(), {
			ok: await he({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: vt
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${vt}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === vt) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await he({
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
	let xt = /* @__PURE__ */ I(null), St = /* @__PURE__ */ I(""), Ct = /* @__PURE__ */ I(!1);
	async function wt() {
		L(St, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? L(xt, (await e.json()).commits, !0) : e.status === 401 ? (L(xt, [], !0), L(St, "Logg inn med GitHub for å se historikken.")) : (L(xt, [], !0), L(St, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			L(xt, [], !0), L(St, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let Tt = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), Et = !1;
	async function Dt() {
		let e = W(xt)?.[0];
		if (!(!e || W(Ct)) && await he({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			L(Ct, !0), p("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? vt = e : yt(), Et = !0, p("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), P();
				} else t.status === 409 ? p("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : p((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				p("Kunne ikke nå publiseringslaget", "error");
			}
			L(Ct, !1), wt();
		}
	}
	async function P() {
		let e = ["/content/site.json", ...W(E).pages.map((e) => `/${e.file}`)], t = async () => {
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
	let Ot = null;
	function kt(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: ga("sec"),
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
	async function At(e, { keepHistory: t = !1 } = {}) {
		L(c, e, !0), Ot = (async () => {
			let n = re(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = ua(await e.json(), w.data));
			} catch {}
			r ? ne.delete(e) : r = kt(n), C = mi(`urd-draft-${e}`, () => r), C.replace(ua(C.data, w.data)), C.save(), t || (oe = null), L(Ie, null), L(Le, null), D(), x(), L(u, "");
		})(), await Ot;
	}
	function jt() {
		T?.destroy(), T = $i(W(h), {
			onEdit: wr,
			onMove: Tr,
			onGrow: Er,
			onDelete: Lr,
			onAddSection: jr,
			onMoveSection: Mr,
			onDeleteSection: Nr,
			onSectionSize: Pr,
			onUndo: (e) => e.redo ? de() : ue(),
			onSelectSection: Ge,
			onSelectBlock: Oe,
			onReady: Mt,
			onNavigate: Nt,
			onAddBlock: (e) => Hr(e.sectionId, e.block),
			onAddBlocks: (e) => Ur(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: qr,
			onMoveBlockSection: Ir,
			onMobileManual: Dr,
			onMobileAuto: K,
			onReviewDone: Or,
			onBlockFlag: Ar,
			onCollectionEdit: wn,
			onPluginBlocks: (e) => {
				L(Gr, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => F("edit:nav-width", () => {
				W(E).nav.style ??= {}, W(E).nav.style.width = e.width;
			})
		});
	}
	async function Mt() {
		await Ot, await Pn, T?.sendPlugins(ze(W(Fn))?.enabled ?? []), T?.sendViewport(W(y)), Sn(), w.hasDraft() && te();
		let e = !W(s).pages.some((e) => e.id === W(c));
		(C.hasDraft() || e) && T?.sendPage(W(c), C.data), W(v) || T?.sendChrome(!1), W(Ce) === "Grid" && T?.sendShowGrid(!0);
	}
	function Nt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(E).pages.find((e) => e.path === t);
		n && n.id !== W(c) && At(n.id);
	}
	function F(e, t) {
		ce(e), t(), w.save(), D(), te();
	}
	let Pt = /* @__PURE__ */ I(""), Ft = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function It(e, t = null) {
		return e ? Ft.includes(e) ? `«${e}» er et reservert navn` : W(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Lt() {
		let e = W(Pt).trim(), t = Ai(e), n = It(t);
		if (n) {
			p(n, "error");
			return;
		}
		F("pages", () => {
			W(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(E).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(kt({
			id: t,
			title: e
		}))), D(), L(Pt, ""), At(t);
	}
	function Rt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		F("pages", () => {
			e.title = n;
			for (let t of W(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(c) ? (C.data.meta.title = n, C.save(), D(), T?.sendPage(W(c), C.data)) : zt(e, (e) => {
			e.meta.title = n;
		});
	}
	async function zt(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = ua(await t.json(), w.data));
		} catch {}
		r ||= kt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), D();
	}
	function Bt(e, t) {
		let n = Ai(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = It(n, e.id);
		if (r) {
			p(r, "error");
			return;
		}
		F("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Vt(e) {
		e.path !== "/" && (F("pages", () => {
			W(E).pages = W(E).pages.filter((t) => t.id !== e.id), W(E).nav.items = W(E).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of W(E).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			W(E).nav.items = W(E).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === W(c) && At(W(E).pages[0].id), p("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function Ht(e) {
		F("edit:nav-logo", () => {
			W(E).nav.logo = {
				type: "text",
				value: "",
				...W(E).nav.logo,
				...e
			};
		});
	}
	function Ut(e) {
		F("nav", () => {
			W(E).nav.logo ??= {
				type: "text",
				value: W(E).site.title
			};
			let t = W(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = W(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = W(E).site.title), delete t.image), t.type = e;
		});
	}
	async function Wt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			F("nav", () => {
				let t = W(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Gt = /* @__PURE__ */ I(null);
	function Kt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			L(Gt, String(n.result), !0);
		}, n.onerror = () => p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function qt(e) {
		F("edit:site-icon", () => {
			W(E).site.icon = e;
		}), L(Gt, null);
	}
	function Jt() {
		F("edit:site-icon", () => {
			delete W(E).site.icon;
		});
	}
	let Yt = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!W(E)?.site) return;
		let e = W(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19 14v22a13 13 0 0 0 26 0V14' fill='none' stroke='%237c5cff' stroke-width='9' stroke-linecap='round'/%3E%3C/svg%3E";
				return;
			}
			Yt.test(e) && (t.href = e);
		}
	});
	function Xt(e) {
		F("nav", () => {
			W(E).nav.layout = e;
		});
	}
	function Zt(e, t) {
		F(`edit:nav-style-${e}`, () => {
			W(E).nav.style ??= {}, t === void 0 ? delete W(E).nav.style[e] : W(E).nav.style[e] = t;
		});
	}
	let Qt = /* @__PURE__ */ N(() => W(E)?.nav?.variant === "side-left" || W(E)?.nav?.variant === "side-right"), $t = /* @__PURE__ */ N(() => W(E)?.nav?.variant === "floating" || W(E)?.nav?.variant === "floating-square"), en = {
		underline: ["Strekfarge", "Fargen på streken under lenken"],
		pill: ["Pillefarge", "Fargen på pille-flaten bak lenken"],
		lift: ["Glødfarge", "Fargen på gløden bak teksten"]
	}, rn = /* @__PURE__ */ N(() => en[W(E)?.nav?.style?.hover] ?? null);
	function an(e) {
		F("nav", () => {
			e === "bar" ? delete W(E).nav.variant : W(E).nav.variant = e;
		});
	}
	function on(e) {
		F("nav", () => {
			W(E).nav.style ??= {}, e ? W(E).nav.style.glow = !0 : delete W(E).nav.style.glow;
		});
	}
	function sn(e) {
		F("nav", () => {
			W(E).nav.style ??= {}, e ? delete W(E).nav.style.topGap : W(E).nav.style.topGap = !1;
		});
	}
	function cn(e) {
		F("nav", () => {
			W(E).nav.style ??= {}, e === "standard" ? delete W(E).nav.style.hover : W(E).nav.style.hover = e;
		});
	}
	async function ln(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await ki(t);
			F("nav", () => {
				W(E).nav.style ??= {}, W(E).nav.style.image = e.dataUrl;
			});
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function un() {
		F("nav", () => {
			W(E).nav.style && delete W(E).nav.style.image;
		});
	}
	let dn = null, fn = {}, pn = /* @__PURE__ */ I(tn([])), mn = /* @__PURE__ */ I(tn({})), hn = /* @__PURE__ */ I(null), gn = /* @__PURE__ */ I(""), _n = /* @__PURE__ */ I("news"), vn = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function yn() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		dn = mi("urd-draft-samlinger", () => e), L(pn, [...dn.data.samlinger ?? []], !0);
		for (let e of W(pn)) {
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
			}, fn[e] = mi(`urd-draft-samling-${e}`, () => t);
		}
		xn();
	}
	function xn(e = !0) {
		let t = {};
		for (let e of W(pn)) fn[e] && (t[e] = JSON.parse(JSON.stringify(fn[e].data)));
		L(mn, t, !0), e && Sn();
	}
	function Sn() {
		T?.sendCollections(ze(W(mn)) ?? {});
	}
	function Cn(e, t, n = !0) {
		let r = fn[e];
		r && (t(r.data), r.save(), D(), xn(n));
	}
	function wn(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || Cn(t, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function Tn() {
		let e = W(gn).trim();
		if (!e) return;
		let t = Ai(e);
		if (!t || W(pn).includes(t)) {
			p(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: W(_n),
			entries: []
		};
		fn[t] = mi(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		})), fn[t].replace(n), fn[t].save(), dn.data.samlinger = [...W(pn), t], dn.save(), L(pn, [...W(pn), t], !0), L(hn, t, !0), L(gn, ""), D(), xn();
	}
	function En(e) {
		localStorage.removeItem(`urd-draft-samling-${e}`), delete fn[e], dn.data.samlinger = W(pn).filter((t) => t !== e), dn.save(), L(pn, W(pn).filter((t) => t !== e), !0), W(hn) === e && L(hn, null), D(), xn();
	}
	function Dn(e) {
		Cn(e, (e) => {
			e.entries.unshift({
				id: ga("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function On(e, t, n, r) {
		Cn(e, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function kn(e, t, n) {
		Cn(e, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function An(e, t) {
		Cn(e, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function jn(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && On(e, t, "image", (await ki(r)).dataUrl);
	}
	let Mn = null, Nn, Pn = new Promise((e) => {
		Nn = e;
	}), Fn = /* @__PURE__ */ I(null), In = tn({}), Ln = /* @__PURE__ */ I("0.0.0"), Rn = /* @__PURE__ */ I(""), zn = /* @__PURE__ */ I(""), Bn = /* @__PURE__ */ I(tn([])), Vn = /* @__PURE__ */ I("pending"), Hn = () => [.../* @__PURE__ */ new Set([...W(Fn)?.enabled ?? [], ...W(Fn)?.disabled ?? []])];
	function H() {
		L(Fn, JSON.parse(JSON.stringify(Mn.data)), !0);
	}
	async function Un() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		Mn = mi("urd-draft-plugins", () => e), H();
		try {
			L(Ln, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Hn()) Gn(e);
		Wn(), Nn(), T?.sendPlugins(ze(W(Fn))?.enabled ?? []);
	}
	async function Wn() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				U();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), L(Bn, (t ?? []).filter((e) => !Hn().includes(e)), !0);
			for (let e of W(Bn)) Gn(e);
			L(Vn, "ok");
		} catch {
			U();
		}
	}
	function U() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				L(Bn, e.filter((e) => !Hn().includes(e)), !0);
				for (let e of W(Bn)) Gn(e);
				L(Vn, "ok");
				return;
			}
		} catch {}
		L(Vn, "unavailable");
	}
	async function Gn(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = ha(t);
			In[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && pa(W(Ln), t.requiresEngine)
			};
		} catch {
			In[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Kn(e, t) {
		let n = Mn.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Mn.save(), D(), H(), qn();
	}
	function qn() {
		W(h) && (W(h).src = W(h).src);
	}
	function Jn(e) {
		let t = Mn.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Mn.save(), D(), H(), qn();
	}
	async function Yn() {
		L(zn, "");
		let e = W(Rn).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			L(zn, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (Hn().includes(e)) {
			L(zn, "Pluginen står allerede i listen");
			return;
		}
		if (await Gn(e), In[e].errors.length) {
			L(zn, `Fant ingen gyldig plugin: ${In[e].errors.join("; ")}`);
			return;
		}
		Kn(e, !0), L(Rn, "");
	}
	function Xn(e) {
		L(Bn, W(Bn).filter((t) => t !== e), !0), Kn(e, !0);
	}
	function Zn(e, t) {
		F(e, () => {
			W(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(W(E).footer);
		});
	}
	function Qn(e, t) {
		F(`edit:nav-label-${e}`, () => {
			W(E).nav.items[e].label = t;
		});
	}
	function $n(e, t) {
		F("nav", () => {
			let n = W(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function er(e, t) {
		F(`edit:nav-href-${e}`, () => {
			W(E).nav.items[e].href = t;
		});
	}
	function tr(e, t) {
		let n = e + t, r = W(E).nav.items;
		n < 0 || n >= r.length || F("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function nr(e) {
		F("nav", () => {
			W(E).nav.items.splice(e, 1);
		});
	}
	function rr() {
		F("nav", () => {
			W(E).nav.items.push({
				label: "Lenke",
				page: W(E).pages[0].id
			});
		});
	}
	function ir(e) {
		F("nav", () => {
			let t = W(E).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: W(E).pages[0].id
			});
		});
	}
	function ar(e, t, n) {
		F(`edit:nav-child-label-${e}-${t}`, () => {
			W(E).nav.items[e].children[t].label = n;
		});
	}
	function or(e, t, n) {
		F("nav", () => {
			let r = W(E).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function sr(e, t, n) {
		F(`edit:nav-child-href-${e}-${t}`, () => {
			W(E).nav.items[e].children[t].href = n;
		});
	}
	function cr(e, t, n) {
		let r = t + n, i = W(E).nav.items[e].children;
		r < 0 || r >= i.length || F("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function lr(e, t) {
		F("nav", () => {
			let n = W(E).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = W(E).pages[0].id));
		});
	}
	let ur = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function dr(e, t) {
		F(`edit:theme-color-${e}`, () => {
			W(E).theme.tokens.color[e] = t;
		});
	}
	function fr(e, t) {
		F("theme", () => {
			W(E).theme.tokens.font[e] = t;
		});
	}
	function pr(e, t) {
		F("theme", () => {
			W(E).theme.tokens.radius[e] = t;
		});
	}
	function mr(e) {
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
	function hr() {
		return Object.fromEntries(Object.entries(W(E).theme.tokens.color).map(([e, t]) => [e, mr(t)]));
	}
	function gr() {
		F("theme", () => {
			W(E).theme.alt = { tokens: { color: hr() } };
		});
	}
	function _r() {
		F("theme", () => {
			W(E).theme.alt.tokens.color = hr();
		});
	}
	function yr() {
		F("theme", () => {
			delete W(E).theme.alt;
		});
	}
	function xr(e, t) {
		F(`edit:theme-alt-${e}`, () => {
			W(E).theme.alt.tokens.color[e] = t;
		});
	}
	function Sr(e) {
		F("theme", () => {
			e === "light" ? delete W(E).theme.scheme : W(E).theme.scheme = e;
		});
	}
	function Cr() {
		L(v, !W(v)), T?.sendChrome(W(v));
	}
	function wr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (ce(`edit:${e.blockId}`), n.props = e.props, C.save(), D(), W(O)?.blockId === e.blockId && De(), e.rerender && T?.sendSection(W(c), t), L(u, ""));
	}
	function Tr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		ce(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && S(t, "desktop-endret-etter-mobil"), C.save(), D(), W(O)?.blockId === e.blockId && De();
	}
	function Er(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (ce(`edit:${e.blockId}`), t.frames.desktop.h = e.h, C.save(), D(), W(O)?.blockId === e.blockId && De());
	}
	function Dr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ce("mobile-manual");
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
	function K(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			ce("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, C.save(), D(), x(), T?.sendSection(W(c), t);
		}
	}
	function Or(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (ce("review-done"), t.responsive.mobile.attention = null, C.save(), D(), x());
	}
	function Ar(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (ce("decor"), t.decor = e.decor, C.save(), D(), W(O)?.blockId === e.blockId && De());
	}
	function jr(e) {
		ce("add-section"), e.section.id || (e.section.id = ga("sec")), C.data.sections.splice(e.index, 0, e.section), C.save(), D(), T?.sendPage(W(c), C.data), L(Ie, e.section.id, !0), He(e.section), W(Ce) !== "Egenskaper" && (L(Ce, "Egenskaper"), T?.sendShowGrid(!1));
	}
	function Mr(e) {
		let t = C.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (ce("move-section"), [t[n], t[r]] = [t[r], t[n]], C.save(), D(), T?.sendPage(W(c), C.data));
	}
	function Nr(e) {
		ce("delete-section"), e.sectionId === W(Ie) && (L(Ie, null), L(Le, null)), W(O)?.sectionId === e.sectionId && L(O, null), C.data.sections = C.data.sections.filter((t) => t.id !== e.sectionId), C.save(), D(), T?.sendPage(W(c), C.data);
	}
	function Pr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (ce("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === W(Ie) && L(Re, e.minHeight, !0), C.save(), D());
	}
	function Ir(e) {
		let t = C.data.sections.find((t) => t.id === e.fromSectionId), n = C.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (ce("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), S(t, "blokk-flyttet"), S(n, "blokk-flyttet"), C.save(), D(), x(), T?.sendPage(W(c), C.data), W(O)?.blockId === e.blockId && (L(O, {
			...W(O),
			sectionId: e.toSectionId
		}, !0), De()));
	}
	function Lr(e) {
		let t = C.data.sections.find((t) => t.id === e.sectionId);
		t && (ce("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), W(O)?.blockId === e.blockId && L(O, null), S(t, "blokk-slettet"), C.save(), D(), T?.sendSection(W(c), t));
	}
	let Rr = {
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
		},
		galleri: {
			type: "galleri",
			props: {
				images: [],
				view: "grid",
				columns: 3,
				gap: 12,
				radius: "md",
				lightbox: !0,
				interval: 5
			},
			w: 90,
			h: 320
		}
	};
	function Br(e) {
		let t = Rr[e];
		return t ? {
			id: ga("blk"),
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
	function Vr(e) {
		T ? T.sendPlaceBlock(e) : Hr(pt()?.id, e);
	}
	function Hr(e, t) {
		let n = C.data.sections.find((t) => t.id === e) ?? C.data.sections[0];
		if (!n) return;
		ce("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), S(n, "blokk-lagt-til"), C.save(), D(), T?.sendSection(W(c), n);
	}
	function Ur(e, t, n, r) {
		let i = C.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		ce("add-blocks");
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
		}), S(i, "blokk-lagt-til"), C.save(), D(), T?.sendSection(W(c), i);
	}
	function Wr(e) {
		Vr(Br(e));
	}
	let Gr = /* @__PURE__ */ I(tn([]));
	function Kr(e, t = {}) {
		Vr({
			id: ga("blk"),
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
	function qr(e) {
		let t = Br(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, Hr(e.sectionId, t), e.kind === "image" && p("Bildeblokk lagt til - velg bildet i Egenskaper"), e.kind === "galleri" && p("Galleri lagt til - legg til bilder i Egenskaper"));
	}
	async function Jr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		p("Komprimerer bildet…");
		let n;
		try {
			n = await ki(t);
		} catch {
			p("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(h)?.clientWidth ?? 1280));
		Vr({
			id: ga("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Ai(t.name).replaceAll("-", " "),
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
	async function Yr(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await ki(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Ai(i.name).replaceAll("-", " "),
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
	function Zr(e, t, n) {
		t ? p(`${t} av bildene kunne ikke leses (prøv jpg/png/webp)`, "error") : n ? p(`${n} av bildene er store - vurder mindre utsnitt`, "error") : p(e ? "" : "Ingen bilder lagt til");
	}
	async function Qr(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		p("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Yr(t);
		n.length && ke("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Zr(n.length, r, i);
	}
	async function $r(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		p("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Yr(t);
		if (!n.length) {
			Zr(0, r, i);
			return;
		}
		let a = Br("galleri");
		a.props.images = n, Vr(a), Zr(n.length, r, i);
	}
	function ei(e, t) {
		ke("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function ti(e) {
		ke("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function ni(e, t, n) {
		ke(`edit:${W(O).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function ai(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ai(n || "bilde")}-${ji(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function oi(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) if (e.type === "image" && ai(e.props, "src", "bakgrunn", t), e.type === "bildegalleri") for (let n of e.props.images ?? []) ai(n, "src", "bakgrunn", t);
			for (let e of n.blocks) if (e.type === "image" && ai(e.props, "src", e.props.alt, t), e.type === "icon" && ai(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) ai(n, "src", n.alt || "galleri", t);
		}
		return t;
	}
	function si(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && ai(n, "value", "logo", t), n?.type === "both" && ai(n, "image", "logo", t), e.nav?.style && ai(e.nav.style, "image", "meny", t), ai(e.site, "icon", "ikon", t), t;
	}
	let li = /* @__PURE__ */ I(!1);
	function ui() {
		if (!W(li)) {
			L(li, !0);
			return;
		}
		L(li, !1), di();
	}
	bn(() => {
		if (!W(li)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || L(li, !1);
		}, t = (e) => {
			e.key === "Escape" && L(li, !1);
		}, n = () => L(li, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function di() {
		ce("discard");
		for (let e of W(E).pages) e.id !== W(c) && !ne.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = C.reset();
		if (w.reset(), Mn && (Mn.reset(), H()), dn) {
			dn.reset(), L(pn, [...dn.data.samlinger ?? []], !0);
			for (let e of Object.keys(fn)) W(pn).includes(e) ? fn[e].reset() : delete fn[e];
			xn();
		}
		ee(), L(_, {
			snap: !0,
			...W(E).grid
		}, !0), D(), L(u, ""), te(), W(E).pages.some((e) => e.id === W(c)) ? T?.sendPage(W(c), e) : At(W(E).pages[0].id);
	}
	async function pi() {
		if (Et) {
			p("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		p("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of W(E).pages) {
			let a = `urd-draft-${i.id}`, o = ne.has(i.id) || !W(s).pages.some((e) => e.id === i.id), l = null;
			if (i.id === W(c) && (C.hasDraft() || o)) l = C.data;
			else if (i.id !== W(c)) {
				let e = localStorage.getItem(a);
				if (e) try {
					l = ua(JSON.parse(e), w.data);
				} catch {}
			}
			if (!l && o && (l = kt(i)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...oi(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (w.hasDraft()) {
			let r = JSON.parse(JSON.stringify(W(E)));
			e.push(...si(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(W(s).theme, W(E).theme) || t.push("tema"), i(W(s).nav, W(E).nav) || t.push("menyen"), i(W(s).footer, W(E).footer) || t.push("footeren"), i(W(s).pages, W(E).pages) || t.push("sideregisteret"), i(W(s).grid, W(E).grid) || t.push("gridet"), (W(s).site.icon ?? null) !== (W(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = W(s).site, { icon: c, ...l } = W(E).site;
			i(o, l) || t.push("nettstedsinfo");
		}
		let i = Object.entries(fn).filter(([, e]) => e.hasDraft());
		if (i.length || dn?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) ai(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (dn?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(dn.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!W(pn).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		Mn?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Mn.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of W(E).pages) n.path !== "/" && e.push({
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
		for (let e of W(s).pages) {
			let t = W(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let l = await bt(e);
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
			e ? vt = e : yt(), oi(C.data), si(W(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			if (L(s, JSON.parse(JSON.stringify(W(E))), !0), w = mi("urd-draft-site", () => W(s)), ee(), Mn) {
				let e = JSON.parse(JSON.stringify(Mn.data));
				Mn = mi("urd-draft-plugins", () => e), H();
			}
			if (dn) {
				for (let e of Object.values(fn)) for (let t of e.data.entries) ai(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(dn.data));
				dn = mi("urd-draft-samlinger", () => e);
				for (let e of W(pn)) {
					if (!fn[e]) continue;
					let t = JSON.parse(JSON.stringify(fn[e].data));
					fn[e] = mi(`urd-draft-samling-${e}`, () => t);
				}
				xn();
			}
			L(_, {
				snap: !0,
				...W(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(C.data));
			C = mi(`urd-draft-${W(c)}`, () => t), ne.has(W(c)) && localStorage.setItem(`urd-draft-${W(c)}`, JSON.stringify(t)), D(), p("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (d?.status === 401) {
			let e = (await d.json().catch(() => null))?.error;
			p(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await _t();
		} else d?.status === 403 ? p((await d.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : d?.status === 409 ? p("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : p(d ? (await d.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	pe();
	var hi = Ds();
	br("keydown", nn, fe);
	var gi = R(hi), _i = (e) => {
		var t = Aa();
		X(R(t), () => i.pencil), M(), j(t), G("click", t, Cr), q(e, t);
	};
	Y(gi, (e) => {
		W(v) || e(_i);
	});
	var vi = B(gi, 2);
	let yi;
	var bi = R(vi), xi = B(R(bi), 2);
	$(xi, {
		get value() {
			return W(o);
		},
		title: "Adminens fargetema (kun editoren, ikke nettsiden din)",
		get options() {
			return a;
		},
		onchange: (e) => L(o, e, !0)
	});
	var Si = B(xi, 2), Ci = (e) => {
		var t = ja(), n = z(t), r = R(n, !0);
		j(n);
		var a = B(n, 2), o = R(a);
		let s;
		X(o, () => i.desktop, !0), j(o);
		var c = B(o, 2);
		let l;
		X(c, () => i.phone, !0), j(c), j(a), V((e) => {
			J(r, e), s = Xr(o, 1, "ghost svelte-1n46o8q", null, s, { active: W(y) === "desktop" }), l = Xr(c, 1, "ghost svelte-1n46o8q", null, l, { active: W(y) === "mobile" });
		}, [() => re()?.title ?? ""]), G("click", n, () => Te("Sider")), G("click", o, () => L(y, "desktop")), G("click", c, () => L(y, "mobile")), q(e, t);
	};
	Y(Si, (e) => {
		W(s) && e(Ci);
	});
	var wi = B(Si, 2), Ei = (e) => {
		var t = Ma(), n = R(t);
		X(n, () => i.phone);
		var r = B(n);
		j(t), V(() => J(r, ` ${W(b) ?? ""} ${W(b) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => L(y, "mobile")), q(e, t);
	};
	Y(wi, (e) => {
		W(b) > 0 && e(Ei);
	});
	var Di = B(wi, 2), Oi = (e) => {
		q(e, Na());
	};
	Y(Di, (e) => {
		W(l) && e(Oi);
	}), j(bi);
	var Mi = B(bi, 2), Ni = R(Mi), Pi = (e) => {
		var t = Ra(), n = z(t), r = R(n), a = (e) => {
			var t = Pa();
			X(z(t), () => i.eye), M(), q(e, t);
		}, o = (e) => {
			var t = Fa();
			X(z(t), () => i.pencil), M(), q(e, t);
		};
		Y(r, (e) => {
			W(v) ? e(a) : e(o, -1);
		}), j(n);
		var s = B(n, 2), c = (e) => {
			var t = Ia(), n = R(t), r = (e) => {
				var t = kr();
				X(z(t), () => i.warn), q(e, t);
			};
			Y(n, (e) => {
				W(g).allowed || e(r);
			});
			var a = B(n, 1, !0);
			j(t), V(() => {
				ii(t, "title", W(g).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(a, W(g).login);
			}), q(e, t);
		}, u = (e) => {
			q(e, La());
		};
		Y(s, (e) => {
			W(g)?.loggedIn ? e(c) : W(g) && e(u, 1);
		});
		var d = B(s, 2), f = B(d, 2);
		let p;
		var m = R(f, !0);
		j(f);
		var h = B(f, 2);
		V((e) => {
			ii(n, "title", W(v) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ii(d, "href", e), p = Xr(f, 1, "ghost discard-btn svelte-1n46o8q", null, p, { armed: W(li) }), f.disabled = !W(l), ii(f, "title", W(li) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), J(m, W(li) ? "Sikker?" : "Forkast utkast"), h.disabled = !W(l);
		}, [() => re()?.path ?? "/"]), G("click", n, Cr), G("click", f, ui), G("click", h, pi), q(e, t);
	};
	Y(Ni, (e) => {
		W(s) && e(Pi);
	}), j(Mi), j(vi);
	var Fi = B(vi, 2), Ii = (e) => {
		var t = xs(), r = R(t), a = (e) => {
			var t = bs(), r = z(t);
			zr(r, 21, () => we, Fr, (e, t, n) => {
				var r = Va(), i = z(r), a = (e) => {
					q(e, za());
				};
				Y(i, (e) => {
					n > 0 && e(a);
				}), zr(B(i, 2), 16, () => W(t), (e) => e, (e, t) => {
					var n = Ba();
					let r;
					var i = R(n, !0);
					j(n), V(() => {
						r = Xr(n, 1, "svelte-1n46o8q", null, r, { active: W(Ce) === t }), J(i, t);
					}), G("click", n, () => Te(t)), q(e, n);
				}), q(e, r);
			}), j(r);
			var a = B(r, 2), o = (e) => {
				var t = ys(), r = R(t), a = R(r, !0);
				j(r);
				var o = B(r, 2), s = (e) => {
					var t = Ka(), n = B(R(t), 2);
					zr(n, 17, () => W(E).pages, (e) => e.id, (e, t) => {
						var n = Ga();
						let r;
						var a = R(n);
						Z(a);
						var o = B(a, 2), s = (e) => {
							q(e, Ha());
						}, l = (e) => {
							var n = Ua();
							Z(n), V((e) => Q(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => Bt(W(t), e.target.value)), q(e, n);
						};
						Y(o, (e) => {
							W(t).path === "/" ? e(s) : e(l, -1);
						});
						var u = B(o, 2), d = R(u);
						X(d, () => i.right, !0), j(d);
						var f = B(d, 2), p = (e) => {
							var n = Wa();
							X(n, () => i.cross, !0), j(n), G("click", n, () => Vt(W(t))), q(e, n);
						};
						Y(f, (e) => {
							W(t).path !== "/" && e(p);
						}), j(u), j(n), V(() => {
							r = Xr(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(c) }), Q(a, W(t).title), d.disabled = W(t).id === W(c);
						}), G("change", a, (e) => Rt(W(t), e.target.value)), G("click", d, () => At(W(t).id)), q(e, n);
					});
					var r = B(n, 4);
					Z(r);
					var a = B(r, 2);
					M(2), j(t), V((e) => a.disabled = e, [() => !W(Pt).trim()]), G("keydown", r, (e) => e.key === "Enter" && Lt()), ci(r, () => W(Pt), (e) => L(Pt, e)), G("click", a, Lt), q(e, t);
				}, l = (e) => {
					var t = co(), n = B(R(t), 2), r = B(R(n), 2), a = R(r), o = B(R(a));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.logo?.type ?? "text");
						$(o, {
							get value() {
								return W(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Bilde"],
								["both", "Bilde + tekst"]
							],
							onchange: (e) => Ut(e)
						});
					}
					j(a);
					var s = B(a, 2), c = (e) => {
						var t = qa(), n = z(t);
						Z(n);
						var r = B(n, 2), i = R(r);
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ N(() => [["", "Arv"], ...ur.map(([e, t]) => [t, e])]);
							$(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => Ht({ font: e || void 0 })
							});
						}
						var a = B(i, 2);
						Z(a);
						var o = B(a, 2);
						let s;
						var c = B(o, 2);
						let l;
						j(r), V((e) => {
							Q(n, W(E).nav.logo?.value ?? ""), Q(a, W(E).nav.logo?.textSize ?? ""), s = Xr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: W(E).nav.logo?.bold !== !1 }), l = Xr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!W(E).nav.logo?.italic })]), G("input", n, (e) => Ht({ value: e.target.value })), G("change", a, (e) => Ht({ textSize: e.target.value ? Number(e.target.value) : void 0 })), G("click", o, () => Ht({ bold: W(E).nav.logo?.bold === !1 })), G("click", c, () => Ht({ italic: !W(E).nav.logo?.italic })), q(e, t);
					};
					Y(s, (e) => {
						(W(E).nav.logo?.type ?? "text") !== "image" && e(c);
					});
					var l = B(s, 2), u = (e) => {
						var t = Ja(), n = z(t), r = R(n), i = R(r), a = B(i);
						j(r);
						var o = B(r, 2);
						Z(o);
						var s = B(o, 2);
						Z(s), j(n), M(2), V(() => {
							J(i, `${(W(E).nav.logo?.type === "image" ? W(E).nav.logo?.value : W(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Q(o, W(E).nav.logo?.size ?? 32), Q(s, W(E).nav.logo?.radius ?? 0);
						}), G("change", a, Wt), G("change", o, (e) => Ht({ size: Number(e.target.value) })), G("change", s, (e) => Ht({ radius: Number(e.target.value) })), q(e, t);
					};
					Y(l, (e) => {
						(W(E).nav.logo?.type ?? "text") !== "text" && e(u);
					});
					var d = B(l, 2), f = (e) => {
						var t = Ya(), n = B(R(t));
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.logo?.order ?? "image-first");
							$(n, {
								get value() {
									return W(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => Ht({ order: e })
							});
						}
						j(t), q(e, t);
					};
					Y(d, (e) => {
						W(E).nav.logo?.type === "both" && e(f);
					}), M(2), j(r), j(n);
					var p = B(n, 2), m = B(R(p), 2), h = R(m), g = B(R(h));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.variant ?? "bar");
						$(g, {
							get value() {
								return W(e);
							},
							options: [
								["bar", "Stripe (standard)"],
								["floating", "Flytende (pille)"],
								["floating-square", "Flytende (firkant)"],
								["side-left", "Sidestilt venstre"],
								["side-right", "Sidestilt høyre"]
							],
							onchange: (e) => an(e)
						});
					}
					j(h);
					var _ = B(h, 2), v = (e) => {
						var t = Xa(), n = z(t), r = R(n);
						Z(r), M(), j(n);
						var i = B(n, 2), a = R(i);
						Z(a), M(), j(i), V(() => {
							ri(r, W(E).nav.style?.glow === !0), ri(a, W(E).nav.style?.topGap !== !1);
						}), G("change", r, (e) => on(e.target.checked)), G("change", a, (e) => sn(e.target.checked)), q(e, t);
					};
					Y(_, (e) => {
						W($t) && e(v);
					});
					var y = B(_, 2), b = (e) => {
						var t = Za(), n = B(R(t));
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.style?.sideAlign ?? "left");
							$(n, {
								get value() {
									return W(e);
								},
								options: [
									["left", "Venstre"],
									["center", "Midtstilt"],
									["right", "Høyre"]
								],
								onchange: (e) => Zt("sideAlign", e === "left" ? void 0 : e)
							});
						}
						j(t), q(e, t);
					};
					Y(y, (e) => {
						W(Qt) && e(b);
					});
					var x = B(y, 2), S = B(R(x)), C = R(S);
					j(S), j(x);
					var w = B(x, 2);
					Z(w);
					var T = B(w, 2), ee = R(T);
					Z(ee), M(), j(T);
					var te = B(T, 2), ne = B(R(te));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.size ?? "md");
						$(ne, {
							get value() {
								return W(e);
							},
							options: [
								["sm", "Liten"],
								["md", "Standard"],
								["lg", "Stor"],
								["xl", "Ekstra stor"]
							],
							onchange: (e) => Zt("size", e === "md" ? void 0 : e)
						});
					}
					j(te);
					var re = B(te, 2), D = B(R(re)), ie = (e) => {
						{
							let t = /* @__PURE__ */ N(() => W(E).nav.style?.sidePlacement ?? "top");
							$(e, {
								get value() {
									return W(t);
								},
								options: [
									["top", "Øverst (standard)"],
									["middle", "Midt på"],
									["bottom", "Nederst"]
								],
								onchange: (e) => Zt("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, ae = (e) => {
						{
							let t = /* @__PURE__ */ N(() => W(E).nav.layout ?? "right");
							$(e, {
								get value() {
									return W(t);
								},
								options: [
									["right", "Høyre"],
									["center", "Midtstilt"],
									["left", "Venstre (etter logoen)"]
								],
								onchange: (e) => Xt(e)
							});
						}
					};
					Y(D, (e) => {
						W(Qt) ? e(ie) : e(ae, -1);
					}), j(re);
					var oe = B(re, 2), se = (e) => {
						var t = Qa(), n = R(t);
						Z(n), M(), j(t), V(() => ri(n, W(E).nav.sticky !== !1)), G("change", n, (e) => F("nav", () => {
							W(E).nav.sticky = e.target.checked;
						})), q(e, t);
					};
					Y(oe, (e) => {
						W(Qt) || e(se);
					});
					var ce = B(oe, 2), le = B(R(ce));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.hover ?? "standard");
						$(le, {
							get value() {
								return W(e);
							},
							options: [
								["standard", "Standard (aksentfarge)"],
								["underline", "Understrek"],
								["pill", "Pille"],
								["lift-plain", "Løft"],
								["lift", "Løft med glød"]
							],
							onchange: (e) => cn(e)
						});
					}
					j(ce);
					var ue = B(ce, 2), de = (e) => {
						var t = $a(), n = z(t), r = B(R(n)), i = R(r);
						j(r), j(n);
						var a = B(n, 2);
						Z(a), V((e) => {
							J(i, `${e ?? ""}%`), Q(a, W(E).nav.style?.hoverGlow ?? .6);
						}, [() => Math.round((W(E).nav.style?.hoverGlow ?? .6) * 100)]), G("input", a, (e) => Zt("hoverGlow", Number(e.target.value))), q(e, t);
					};
					Y(ue, (e) => {
						W(E).nav.style?.hover === "lift" && e(de);
					});
					var fe = B(ue, 2), pe = (e) => {
						var t = eo(), n = R(t), r = B(n);
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ N(ot);
							Ti(r, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								get label() {
									return W(rn)[1];
								},
								onchange: (e) => Zt("hoverColor", e)
							});
						}
						j(t), V(() => {
							ii(t, "title", W(rn)[1]), J(n, `${W(rn)[0] ?? ""} `);
						}), q(e, t);
					};
					Y(fe, (e) => {
						W(rn) && e(pe);
					});
					var me = B(fe, 2), he = B(R(me));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ N(ot);
						Ti(he, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Tekstfargen ved hover",
							onchange: (e) => Zt("hoverTextColor", e)
						});
					}
					j(me);
					var ge = B(me, 2), _e = B(R(ge));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.bg ?? "surface"), t = /* @__PURE__ */ N(ot);
						Ti(_e, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens bakgrunnsfarge",
							onchange: (e) => Zt("bg", e)
						});
					}
					j(ge);
					var ve = B(ge, 2), ye = B(R(ve));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ N(ot);
						Ti(ye, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => Zt("textColor", e)
						});
					}
					j(ve);
					var be = B(ve, 2), xe = R(be), Se = R(xe), Ce = B(Se);
					j(xe);
					var we = B(xe, 2), Te = (e) => {
						var t = to();
						X(t, () => i.cross, !0), j(t), G("click", t, un), q(e, t);
					};
					Y(we, (e) => {
						W(E).nav.style?.image && e(Te);
					}), j(be);
					var O = B(be, 2), Ee = (e) => {
						var t = no(), n = z(t), r = B(R(n)), i = R(r);
						j(r), j(n);
						var a = B(n, 2);
						Z(a);
						var o = B(a, 2), s = B(R(o)), c = R(s);
						j(s), j(o);
						var l = B(o, 2);
						Z(l);
						var u = B(l, 2), d = B(R(u)), f = R(d);
						j(d), j(u);
						var p = B(u, 2);
						Z(p), V((e, t, n) => {
							J(i, `${e ?? ""}%`), Q(a, W(E).nav.style?.imageOpacity ?? 1), J(c, `${t ?? ""}%`), Q(l, W(E).nav.style?.imageY ?? 50), J(f, `${n ?? ""}%`), Q(p, W(E).nav.style?.imageX ?? 50);
						}, [
							() => Math.round((W(E).nav.style?.imageOpacity ?? 1) * 100),
							() => Math.round(W(E).nav.style?.imageY ?? 50),
							() => Math.round(W(E).nav.style?.imageX ?? 50)
						]), G("input", a, (e) => Zt("imageOpacity", Number(e.target.value))), G("input", l, (e) => Zt("imageY", Number(e.target.value))), G("input", p, (e) => Zt("imageX", Number(e.target.value))), q(e, t);
					};
					Y(O, (e) => {
						W(E).nav.style?.image && e(Ee);
					}), j(m), j(p);
					var De = B(p, 2), Oe = B(R(De), 2), ke = R(Oe), k = B(R(ke));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ N(() => W(Qt) ? [
							["card", "Standard"],
							["pills", "Pille-punkter"],
							["lines", "Understrek-liste"]
						] : [
							["card", "Kort (standard)"],
							["flat", "Ren flate"],
							["pills", "Pille-punkter"],
							["lines", "Understrek-liste"],
							["flyout", "Utfall (full bredde)"]
						]);
						$(k, {
							get value() {
								return W(e);
							},
							get options() {
								return W(t);
							},
							onchange: (e) => Zt("subStyle", e === "card" ? void 0 : e)
						});
					}
					j(ke);
					var Ae = B(ke, 2), A = (e) => {
						var t = ro(), n = B(R(t));
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ N(ot);
							Ti(n, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								label: "Pille-punktenes farge",
								onchange: (e) => Zt("subPillColor", e)
							});
						}
						j(t), q(e, t);
					};
					Y(Ae, (e) => {
						W(E).nav.style?.subStyle === "pills" && e(A);
					});
					var je = B(Ae, 2), Me = B(R(je));
					Z(Me), j(je);
					var Ne = B(je, 2), Pe = (e) => {
						var t = io(), n = R(t);
						Z(n), M(), j(t), V(() => ri(n, W(E).nav.style?.subImage === !0)), G("change", n, (e) => Zt("subImage", e.target.checked ? !0 : void 0)), q(e, t);
					};
					Y(Ne, (e) => {
						W(E).nav.style?.image && e(Pe);
					}), j(Oe), j(De);
					var Fe = B(De, 2), Ie = B(R(Fe), 2), Le = R(Ie);
					zr(Le, 17, () => W(E).nav.items, Fr, (e, t, n) => {
						var r = so(), a = z(r), o = R(a);
						Z(o);
						var s = B(o, 2), c = R(s);
						X(c, () => i.plus, !0), j(c);
						var l = B(c, 2);
						l.disabled = n === 0, X(l, () => i.up, !0), j(l);
						var u = B(l, 2);
						X(u, () => i.down, !0), j(u);
						var d = B(u, 2);
						X(d, () => i.cross, !0), j(d), j(s);
						var f = B(s, 2), p = R(f);
						{
							let e = /* @__PURE__ */ N(() => W(t).page ?? (W(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ N(() => [
								...W(E).pages.map((e) => [e.id, e.title]),
								["__href", "Ekstern lenke"],
								...W(t).children ? [["__none", "Ingen lenke (kun åpner undermenyen)"]] : []
							]);
							$(p, {
								get value() {
									return W(e);
								},
								title: "Hvor lenken går",
								get options() {
									return W(r);
								},
								onchange: (e) => $n(n, e)
							});
						}
						j(f);
						var m = B(f, 2), h = (e) => {
							var r = ao();
							Z(r), V(() => Q(r, W(t).href)), G("change", r, (e) => er(n, e.target.value)), q(e, r);
						};
						Y(m, (e) => {
							!W(t).page && W(t).href != null && e(h);
						}), j(a), zr(B(a, 2), 17, () => W(t).children ?? [], Fr, (e, r, a) => {
							var o = oo(), s = R(o);
							Z(s);
							var c = B(s, 2), l = R(c);
							l.disabled = a === 0, X(l, () => i.up, !0), j(l);
							var u = B(l, 2);
							X(u, () => i.down, !0), j(u);
							var d = B(u, 2);
							X(d, () => i.cross, !0), j(d), j(c);
							var f = B(c, 2), p = R(f);
							{
								let e = /* @__PURE__ */ N(() => W(r).page ?? "__href"), t = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								$(p, {
									get value() {
										return W(e);
									},
									title: "Hvor lenken går",
									get options() {
										return W(t);
									},
									onchange: (e) => or(n, a, e)
								});
							}
							j(f);
							var m = B(f, 2), h = (e) => {
								var t = ao();
								Z(t), V(() => Q(t, W(r).href ?? "")), G("change", t, (e) => sr(n, a, e.target.value)), q(e, t);
							};
							Y(m, (e) => {
								W(r).page || e(h);
							}), j(o), V(() => {
								Q(s, W(r).label), u.disabled = a === W(t).children.length - 1;
							}), G("input", s, (e) => ar(n, a, e.target.value)), G("click", l, () => cr(n, a, -1)), G("click", u, () => cr(n, a, 1)), G("click", d, () => lr(n, a)), q(e, o);
						}), V(() => {
							Q(o, W(t).label), u.disabled = n === W(E).nav.items.length - 1;
						}), G("input", o, (e) => Qn(n, e.target.value)), G("click", c, () => ir(n)), G("click", l, () => tr(n, -1)), G("click", u, () => tr(n, 1)), G("click", d, () => nr(n)), q(e, r);
					});
					var Re = B(Le, 2);
					M(2), j(Ie), j(Fe), j(t), V((e) => {
						J(C, `${e ?? ""}%`), Q(w, 1 - (W(E).nav.style?.bgOpacity ?? .85)), ri(ee, W(E).nav.style?.blur !== !1), J(Se, `${W(E).nav.style?.image ? "Bytt bakgrunnsbilde" : "Bakgrunnsbilde i menyen"} `), Q(Me, W(E).nav.style?.subColumns ?? 1);
					}, [() => Math.round((1 - (W(E).nav.style?.bgOpacity ?? .85)) * 100)]), G("input", w, (e) => Zt("bgOpacity", Math.round((1 - Number(e.target.value)) * 100) / 100)), G("change", ee, (e) => Zt("blur", e.target.checked)), G("change", Ce, ln), G("change", Me, (e) => Zt("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), G("click", Re, rr), q(e, t);
				}, u = (e) => {
					var t = mo(), n = B(R(t), 2);
					Ti(B(R(n)), {
						get value() {
							return W(E).theme.tokens.color.bg;
						},
						label: "Bakgrunnsfarge",
						onchange: (e) => dr("bg", e)
					}), j(n);
					var r = B(n, 2);
					Ti(B(R(r)), {
						get value() {
							return W(E).theme.tokens.color.surface;
						},
						label: "Flatefarge",
						onchange: (e) => dr("surface", e)
					}), j(r);
					var a = B(r, 2);
					Ti(B(R(a)), {
						get value() {
							return W(E).theme.tokens.color.text;
						},
						label: "Tekstfarge",
						onchange: (e) => dr("text", e)
					}), j(a);
					var o = B(a, 2);
					Ti(B(R(o)), {
						get value() {
							return W(E).theme.tokens.color.accent;
						},
						label: "Aksentfarge",
						onchange: (e) => dr("accent", e)
					}), j(o);
					var s = B(o, 2), c = B(R(s));
					{
						let e = /* @__PURE__ */ N(() => W(E).theme.tokens.color["accent-text"] ?? W(E).theme.tokens.color.bg);
						Ti(c, {
							get value() {
								return W(e);
							},
							label: "Tekst på aksentflater",
							onchange: (e) => dr("accent-text", e)
						});
					}
					j(s);
					var l = B(s, 2), u = B(R(l), 2), d = R(u), f = (e) => {
						var t = lo(), n = z(t), r = B(R(n));
						{
							let e = /* @__PURE__ */ N(() => W(E).theme.scheme ?? "light");
							$(r, {
								get value() {
									return W(e);
								},
								options: [["light", "Lyst"], ["dark", "Mørkt"]],
								onchange: (e) => Sr(e)
							});
						}
						j(n);
						var a = B(n, 4);
						zr(a, 17, () => Object.entries(W(E).theme.alt.tokens.color), Fr, (e, t) => {
							var n = /* @__PURE__ */ N(() => m(W(t), 1));
							let r = () => W(n)[0];
							var i = eo(), a = R(i), o = B(a);
							{
								let e = /* @__PURE__ */ N(() => `Alternativ ${r()}`);
								Ti(o, {
									get value() {
										return W(E).theme.alt.tokens.color[r()];
									},
									get label() {
										return W(e);
									},
									onchange: (e) => xr(r(), e)
								});
							}
							j(i), V(() => J(a, `${{
								bg: "Bakgrunn",
								surface: "Flater",
								text: "Tekst",
								accent: "Aksent",
								"accent-text": "Tekst på aksent"
							}[r()] ?? r() ?? ""} `)), q(e, i);
						});
						var o = B(a, 2), s = R(o), c = B(s, 2);
						X(c, () => i.cross, !0), j(c), j(o), G("click", s, _r), G("click", c, yr), q(e, t);
					}, p = (e) => {
						var t = uo(), n = z(t);
						M(2), G("click", n, gr), q(e, t);
					};
					Y(d, (e) => {
						W(E).theme.alt ? e(f) : e(p, -1);
					}), j(u), j(l);
					var h = B(l, 4), g = B(R(h));
					{
						let e = /* @__PURE__ */ N(() => [...ur.some(([, e]) => e === W(E).theme.tokens.font.heading) ? [] : [[W(E).theme.tokens.font.heading, "Egendefinert"]], ...ur.map(([e, t]) => [t, e])]);
						$(g, {
							get value() {
								return W(E).theme.tokens.font.heading;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => fr("heading", e)
						});
					}
					j(h);
					var _ = B(h, 2), v = B(R(_));
					{
						let e = /* @__PURE__ */ N(() => [...ur.some(([, e]) => e === W(E).theme.tokens.font.body) ? [] : [[W(E).theme.tokens.font.body, "Egendefinert"]], ...ur.map(([e, t]) => [t, e])]);
						$(v, {
							get value() {
								return W(E).theme.tokens.font.body;
							},
							get options() {
								return W(e);
							},
							onchange: (e) => fr("body", e)
						});
					}
					j(_);
					var y = B(_, 4), b = B(R(y));
					Z(b), j(y);
					var x = B(y, 2), S = B(R(x));
					Z(S), j(x);
					var C = B(x, 4), w = B(R(C)), T = (e) => {
						var t = fo();
						V(() => ii(t, "src", W(E).site.icon)), q(e, t);
					};
					Y(w, (e) => {
						W(E).site.icon && e(T);
					}), j(C);
					var ee = B(C, 2), te = R(ee), ne = R(te), re = B(ne);
					j(te);
					var D = B(te, 2), ie = (e) => {
						var t = po(), n = z(t);
						X(n, () => i.pencil ?? "✎", !0), j(n);
						var r = B(n, 2);
						X(r, () => i.cross, !0), j(r), G("click", n, () => L(Gt, W(E).site.icon, !0)), G("click", r, Jt), q(e, t);
					};
					Y(D, (e) => {
						W(E).site.icon && e(ie);
					}), j(ee), M(2), j(t), V(() => {
						Q(b, W(E).theme.tokens.radius.sm), Q(S, W(E).theme.tokens.radius.md), J(ne, `${W(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}), G("change", b, (e) => pr("sm", e.target.value)), G("change", S, (e) => pr("md", e.target.value)), G("change", re, Kt), q(e, t);
				}, d = (e) => {
					var t = vo();
					let n;
					var r = B(R(t), 2), i = B(R(r), 2), a = R(i), o = B(a, 2);
					j(i), j(r);
					var s = B(r, 2), c = B(s, 2), l = B(R(c));
					j(c);
					var u = B(c, 2), d = B(u, 2), f = B(d, 2), p = B(f, 2), m = B(R(p), 2), h = R(m), g = B(h, 2), _ = B(R(g));
					j(g), j(m), j(p);
					var v = B(p, 2), b = B(R(v), 2), x = R(b), S = B(x, 2), C = B(S, 2), w = B(C, 2), T = B(w, 2);
					j(b), j(v);
					var E = B(v, 2), ee = (e) => {
						var t = _o(), n = B(R(t), 2);
						zr(n, 21, () => W(Gr), (e) => e.type, (e, t) => {
							var n = kr(), r = z(n), i = (e) => {
								var n = go(), r = R(n), i = R(r, !0);
								j(r);
								var a = B(r, 2);
								zr(a, 21, () => W(t).variants, (e) => e.label, (e, n) => {
									var r = ho(), i = R(r, !0);
									j(r), V(() => {
										ii(r, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(i, W(n).label);
									}), G("click", r, () => Kr(W(t), W(n).props)), q(e, r);
								}), j(a), j(n), V(() => J(i, W(t).label)), q(e, n);
							}, a = (e) => {
								var n = ho(), r = R(n, !0);
								j(n), V(() => {
									ii(n, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(r, W(t).label);
								}), G("click", n, () => Kr(W(t))), q(e, n);
							};
							Y(r, (e) => {
								W(t).variants?.length ? e(i) : e(a, -1);
							}), q(e, n);
						}), j(n), j(t), q(e, t);
					};
					Y(E, (e) => {
						W(Gr).length && e(ee);
					}), j(t), V(() => {
						n = Xr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(y) === "mobile" }), ii(t, "title", W(y) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => Wr("text")), G("click", o, () => Wr("text-box")), G("click", s, () => Wr("button")), G("change", l, Jr), G("click", u, () => Wr("video")), G("click", d, () => Wr("icon")), G("click", f, () => Wr("samling")), G("click", h, () => Wr("galleri")), G("change", _, $r), G("click", x, () => Wr("shape-line")), G("click", S, () => Wr("shape-arrow")), G("click", C, () => Wr("shape-circle")), G("click", w, () => Wr("shape-rect")), G("click", T, () => Wr("shape-triangle")), q(e, t);
				}, f = (e) => {
					var t = yo(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					j(r), j(n);
					var a = B(n, 2);
					Z(a);
					var o = B(a, 2), s = R(o);
					Z(s), M(), j(o), M(2), j(t), V(() => {
						J(i, `${W(_).size ?? ""} px`), Q(a, W(_).size), ri(s, W(_).snap !== !1);
					}), G("input", a, (e) => gt("size", Number(e.target.value))), G("change", s, (e) => gt("snap", e.target.checked)), q(e, t);
				}, p = (e) => {
					var t = Zo(), r = R(t), a = (e) => {
						var t = Ro(), n = z(t), r = R(n);
						j(n);
						var a = B(n, 2), o = (e) => {
							var t = bo(), n = z(t), r = B(R(n));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.align ?? "left");
								$(r, {
									get value() {
										return W(e);
									},
									options: [
										["left", "Venstre"],
										["center", "Midtstilt"],
										["right", "Høyre"]
									],
									onchange: (e) => k("align", e)
								});
							}
							j(n);
							var i = B(n, 2), a = R(i);
							Z(a), M(), j(i);
							var o = B(i, 2), s = B(R(o));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.font ?? ""), t = /* @__PURE__ */ N(() => [["", "Arv fra tema"], ...ur.map(([e, t]) => [t, e])]);
								$(s, {
									get value() {
										return W(e);
									},
									get options() {
										return W(t);
									},
									onchange: (e) => k("font", e || null)
								});
							}
							j(o);
							var c = B(o, 4), l = R(c);
							let u;
							var d = B(l, 2);
							zr(d, 17, () => Me, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ N(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Ba();
								let o;
								var s = R(a, !0);
								j(a), V(() => {
									o = Xr(a, 1, "tbtn svelte-1n46o8q", null, o, { active: W(O).props.size === i() }), ii(a, "title", `${i() ?? ""} px`), J(s, r());
								}), G("click", a, () => k("size", i())), q(e, a);
							});
							var f = B(d, 2);
							Z(f), j(c);
							var p = B(c, 2), h = B(R(p)), g = R(h, !0);
							j(h), j(p);
							var _ = B(p, 2), v = R(_);
							let y;
							var b = B(v, 2);
							Z(b), j(_);
							var x = B(_, 2), S = B(R(x)), C = R(S, !0);
							j(S), j(x);
							var w = B(x, 2), T = R(w);
							let E;
							var ee = B(T, 2);
							Z(ee), j(w), M(2), V((e) => {
								ri(a, e), u = Xr(l, 1, "tbtn svelte-1n46o8q", null, u, { active: !W(O).props.size }), Q(f, W(O).props.size ?? ""), J(g, W(O).props.lineHeight ? `${W(O).props.lineHeight}` : "Arv"), y = Xr(v, 1, "tbtn svelte-1n46o8q", null, y, { active: !W(O).props.lineHeight }), Q(b, W(O).props.lineHeight ?? 1.6), J(C, typeof W(O).props.letterSpacing == "number" && W(O).props.letterSpacing !== 0 ? `${W(O).props.letterSpacing} px` : "Arv"), E = Xr(T, 1, "tbtn svelte-1n46o8q", null, E, { active: !W(O).props.letterSpacing }), Q(ee, W(O).props.letterSpacing ?? 0);
							}, [() => !!W(O).props.box]), G("change", a, (e) => k("box", e.target.checked)), G("click", l, () => k("size", null)), G("change", f, (e) => k("size", e.target.value ? Number(e.target.value) : null)), G("click", v, () => k("lineHeight", null)), G("input", b, (e) => k("lineHeight", Number(e.target.value))), G("click", T, () => k("letterSpacing", null)), G("input", ee, (e) => k("letterSpacing", Number(e.target.value) || null)), q(e, t);
						}, s = (e) => {
							var t = So(), n = z(t), r = B(R(n));
							Z(r), j(n);
							var i = B(n, 2), a = B(R(i));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.page ?? "__href"), t = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
								$(a, {
									get value() {
										return W(e);
									},
									get options() {
										return W(t);
									},
									onchange: (e) => {
										let t = e === "__href" ? null : e;
										ke(`edit:${W(O).blockId}`, (e) => {
											e.props.page = t, t && (e.props.href = null);
										});
									}
								});
							}
							j(i);
							var o = B(i, 2), s = (e) => {
								var t = xo();
								Z(t), V(() => Q(t, W(O).props.href === "#" ? "" : W(O).props.href ?? "")), G("change", t, (e) => k("href", e.target.value || null)), q(e, t);
							};
							Y(o, (e) => {
								W(O).props.page || e(s);
							});
							var c = B(o, 2);
							$(B(R(c)), {
								get value() {
									return W(O).props.style;
								},
								options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
								onchange: (e) => k("style", e)
							}), j(c), V(() => Q(r, W(O).props.label)), G("change", r, (e) => k("label", e.target.value)), q(e, t);
						}, c = (e) => {
							var t = wo(), n = z(t), r = B(R(n));
							j(n);
							var i = B(n, 2), a = B(R(i));
							Z(a), j(i);
							var o = B(i, 2), s = B(R(o));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.fit ?? "cover");
								$(s, {
									get value() {
										return W(e);
									},
									options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
									onchange: (e) => k("fit", e)
								});
							}
							j(o);
							var c = B(o, 2), l = B(R(c));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.radius ?? "");
								$(l, {
									get value() {
										return W(e);
									},
									options: [
										["", "Ingen"],
										["sm", "Liten"],
										["md", "Stor"]
									],
									onchange: (e) => k("radius", e || null)
								});
							}
							j(c);
							var u = B(c, 2), d = B(R(u));
							Z(d), j(u);
							var f = B(u, 2), p = (e) => {
								var t = Co(), n = R(t);
								Z(n), M(), j(t), V((e) => ri(n, e), [() => !!W(O).props.lightbox]), G("change", n, (e) => k("lightbox", e.target.checked)), q(e, t);
							};
							Y(f, (e) => {
								W(O).props.href || e(p);
							});
							var m = B(f, 2), h = B(R(m)), g = R(h);
							j(h), j(m);
							var _ = B(m, 2);
							Z(_);
							var v = B(_, 2), y = B(R(v)), b = R(y);
							j(y), j(v);
							var x = B(v, 2);
							Z(x);
							var S = B(x, 2), C = B(R(S)), w = R(C);
							j(C), j(S);
							var T = B(S, 2);
							Z(T);
							var E = B(T, 2), ee = B(R(E)), te = R(ee);
							j(ee), j(E);
							var ne = B(E, 2);
							Z(ne);
							var re = B(ne, 2), D = B(R(re)), ie = R(D);
							j(D), j(re);
							var ae = B(re, 2);
							Z(ae);
							var oe = B(ae, 2), se = B(R(oe)), ce = R(se);
							j(se), j(oe);
							var le = B(oe, 2);
							Z(le);
							var ue = B(le, 2);
							V((e, t, n, r, i, o) => {
								Q(a, W(O).props.alt ?? ""), Q(d, W(O).props.href ?? ""), J(g, `${e ?? ""}%`), Q(_, W(O).props.x ?? .5), J(b, `${t ?? ""}%`), Q(x, W(O).props.y ?? .5), J(w, `${n ?? ""}x`), Q(T, W(O).props.zoom ?? 1), J(te, `${r ?? ""}%`), Q(ne, W(O).props.brightness ?? 1), J(ie, `${i ?? ""}%`), Q(ae, W(O).props.contrast ?? 1), J(ce, `${o ?? ""}%`), Q(le, W(O).props.saturate ?? 1);
							}, [
								() => Math.round((W(O).props.x ?? .5) * 100),
								() => Math.round((W(O).props.y ?? .5) * 100),
								() => (W(O).props.zoom ?? 1).toFixed(2),
								() => Math.round((W(O).props.brightness ?? 1) * 100),
								() => Math.round((W(O).props.contrast ?? 1) * 100),
								() => Math.round((W(O).props.saturate ?? 1) * 100)
							]), G("change", r, je), G("change", a, (e) => k("alt", e.target.value)), G("change", d, (e) => k("href", e.target.value || null)), G("input", _, (e) => k("x", Number(e.target.value))), G("input", x, (e) => k("y", Number(e.target.value))), G("input", T, (e) => k("zoom", Number(e.target.value))), G("input", ne, (e) => k("brightness", Number(e.target.value))), G("input", ae, (e) => k("contrast", Number(e.target.value))), G("input", le, (e) => k("saturate", Number(e.target.value))), G("click", ue, () => ke(`edit:${W(O).blockId}`, (e) => {
								e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
							})), q(e, t);
						}, l = (e) => {
							var t = To(), n = B(z(t), 2);
							Z(n);
							var r = B(n, 2), i = B(R(r));
							Z(i), j(r), M(2), V(() => {
								Q(n, W(O).props.url ?? ""), Q(i, W(O).props.title ?? "");
							}), G("change", n, (e) => k("url", e.target.value)), G("change", i, (e) => k("title", e.target.value)), q(e, t);
						}, u = (e) => {
							var t = ko(), n = z(t), r = B(R(n)), i = R(r);
							{
								let e = /* @__PURE__ */ N(() => W(O).props.glyph ?? "★"), t = /* @__PURE__ */ N(() => W(O).props.icon ?? null);
								Qi(i, {
									get value() {
										return W(e);
									},
									get icon() {
										return W(t);
									},
									onpick: (e) => ke(`edit:${W(O).blockId}`, (t) => {
										t.props.glyph = e, t.props.icon = null;
									}),
									onicon: (e) => k("icon", e),
									onimage: (e) => k("image", e)
								});
							}
							var a = B(i, 2), o = (e) => {
								var t = Eo();
								Z(t), V(() => Q(t, W(O).props.glyph ?? "")), G("change", t, (e) => k("glyph", e.target.value || "★")), q(e, t);
							}, s = (e) => {
								var t = Do();
								G("click", t, () => k("icon", null)), q(e, t);
							};
							Y(a, (e) => {
								W(O).props.icon ? e(s, -1) : e(o);
							}), j(r), j(n);
							var c = B(n, 2), l = (e) => {
								var t = Oo(), n = z(t), r = R(n), i = B(r, 2);
								j(n), M(2), V(() => ii(r, "src", W(O).props.image)), G("click", i, () => k("image", null)), q(e, t);
							};
							Y(c, (e) => {
								W(O).props.image && e(l);
							});
							var u = B(c, 2), d = B(R(u));
							Z(d), j(u);
							var f = B(u, 2);
							$(B(R(f)), {
								get value() {
									return W(O).props.color;
								},
								get options() {
									return Fe;
								},
								onchange: (e) => k("color", e)
							}), j(f), M(2), V(() => Q(d, W(O).props.size ?? 48)), G("change", d, (e) => k("size", Number(e.target.value))), q(e, t);
						}, d = (e) => {
							var t = Ao(), n = z(t), r = B(R(n));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.collection ?? ""), t = /* @__PURE__ */ N(() => [["", "Velg …"], ...W(pn).map((e) => [e, W(mn)[e]?.name ?? e])]);
								$(r, {
									get value() {
										return W(e);
									},
									get options() {
										return W(t);
									},
									onchange: (e) => k("collection", e || null)
								});
							}
							j(n);
							var i = B(n, 2), a = B(R(i));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.view ?? "cards");
								$(a, {
									get value() {
										return W(e);
									},
									options: [
										["cards", "Kort"],
										["list", "Liste"],
										["archive", "Arkiv (per år)"]
									],
									onchange: (e) => k("view", e)
								});
							}
							j(i);
							var o = B(i, 2), s = B(R(o));
							Z(s), j(o);
							var c = B(o, 2), l = R(c);
							Z(l), M(), j(c), M(2), V(() => {
								Q(s, W(O).props.limit ?? 6), ri(l, W(O).props.newestFirst !== !1);
							}), G("change", s, (e) => k("limit", Number(e.target.value))), G("change", l, (e) => k("newestFirst", e.target.checked)), q(e, t);
						}, f = (e) => {
							var t = Po(), n = z(t), r = B(R(n));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.view ?? "grid");
								$(r, {
									get value() {
										return W(e);
									},
									options: [
										["grid", "Rutenett"],
										["carousel", "Karusell"],
										["slides", "Lysbilde (bytter automatisk)"]
									],
									onchange: (e) => k("view", e)
								});
							}
							j(n);
							var a = B(n, 2), o = (e) => {
								var t = jo(), n = z(t), r = B(R(n));
								Z(r), j(n);
								var i = B(n, 2), a = B(R(i)), o = R(a);
								j(a), j(i);
								var s = B(i, 2);
								Z(s), V(() => {
									Q(r, W(O).props.columns ?? 3), J(o, `${W(O).props.gap ?? 12 ?? ""} px`), Q(s, W(O).props.gap ?? 12);
								}), G("change", r, (e) => k("columns", Number(e.target.value))), G("input", s, (e) => k("gap", Number(e.target.value))), q(e, t);
							};
							Y(a, (e) => {
								(W(O).props.view ?? "grid") === "grid" && e(o);
							});
							var s = B(a, 2), c = (e) => {
								var t = Mo(), n = B(R(t));
								Z(n), j(t), V(() => Q(n, W(O).props.interval ?? 5)), G("change", n, (e) => k("interval", Number(e.target.value))), q(e, t);
							};
							Y(s, (e) => {
								W(O).props.view === "slides" && e(c);
							});
							var l = B(s, 2), u = B(R(l));
							{
								let e = /* @__PURE__ */ N(() => W(O).props.radius ?? "");
								$(u, {
									get value() {
										return W(e);
									},
									options: [
										["", "Ingen"],
										["sm", "Liten"],
										["md", "Stor"]
									],
									onchange: (e) => k("radius", e || null)
								});
							}
							j(l);
							var d = B(l, 2), f = R(d);
							Z(f), M(), j(d);
							var p = B(d, 4), m = B(R(p));
							j(p), zr(B(p, 2), 17, () => W(O).props.images ?? [], Fr, (e, t, n) => {
								var r = No(), a = R(r), o = R(a), s = B(o, 2), c = R(s);
								c.disabled = n === 0, X(c, () => i.up, !0), j(c);
								var l = B(c, 2);
								X(l, () => i.down, !0), j(l);
								var u = B(l, 2);
								X(u, () => i.cross, !0), j(u), j(s), j(a);
								var d = B(a, 2), f = B(R(d));
								Z(f), j(d);
								var p = B(d, 2), m = B(R(p));
								Z(m), j(p), j(r), V(() => {
									ii(o, "src", W(t).src), l.disabled = n === W(O).props.images.length - 1, Q(f, W(t).alt ?? ""), Q(m, W(t).href ?? "");
								}), G("click", c, () => ei(n, -1)), G("click", l, () => ei(n, 1)), G("click", u, () => ti(n)), G("change", f, (e) => ni(n, "alt", e.target.value)), G("change", m, (e) => ni(n, "href", e.target.value || null)), q(e, r);
							}), M(2), V(() => ri(f, W(O).props.lightbox !== !1)), G("change", f, (e) => k("lightbox", e.target.checked)), G("change", m, Qr), q(e, t);
						}, p = (e) => {
							var t = Fo(), n = z(t);
							$(B(R(n)), {
								get value() {
									return W(O).props.kind;
								},
								get options() {
									return Pe;
								},
								onchange: (e) => k("kind", e)
							}), j(n);
							var r = B(n, 2);
							$(B(R(r)), {
								get value() {
									return W(O).props.color;
								},
								get options() {
									return Fe;
								},
								onchange: (e) => k("color", e)
							}), j(r);
							var i = B(r, 2), a = B(R(i));
							Z(a), j(i);
							var o = B(i, 2), s = R(o);
							Z(s), M(), j(o), V((e) => {
								Q(a, W(O).props.thickness), ri(s, e);
							}, [() => !!W(O).props.fill]), G("change", a, (e) => k("thickness", Number(e.target.value))), G("change", s, (e) => k("fill", e.target.checked ? W(O).props.color : null)), q(e, t);
						};
						Y(a, (e) => {
							W(O).type === "text" ? e(o) : W(O).type === "button" ? e(s, 1) : W(O).type === "image" ? e(c, 2) : W(O).type === "video" ? e(l, 3) : W(O).type === "icon" ? e(u, 4) : W(O).type === "samling" ? e(d, 5) : W(O).type === "galleri" ? e(f, 6) : W(O).type === "shape" && e(p, 7);
						});
						var h = B(a, 4), g = B(R(h));
						{
							let e = /* @__PURE__ */ N(() => W(O).animation?.type ?? ""), t = /* @__PURE__ */ N(() => [["", "Ingen"], ...Object.entries(ka).map(([e, t]) => [e, t.label])]);
							$(g, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => ct(e || null)
							});
						}
						j(h);
						var _ = B(h, 2), v = (e) => {
							var t = Io(), n = z(t), r = B(R(n));
							Z(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Z(a), j(i), M(2), V(() => {
								Q(r, W(O).animation.props.duration), Q(a, W(O).animation.props.delay);
							}), G("change", r, (e) => lt("duration", Number(e.target.value))), G("change", a, (e) => lt("delay", Number(e.target.value))), q(e, t);
						};
						Y(_, (e) => {
							W(O).animation && ka[W(O).animation.type]?.entrance && e(v);
						});
						var b = B(_, 4), x = B(R(b), 2), S = B(R(x), 2), C = (e) => {
							var t = Lo(), n = R(t), r = B(R(n));
							Z(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Z(a), j(i);
							var o = B(i, 2), s = B(R(o));
							Z(s), j(o);
							var c = B(o, 2), l = B(R(c));
							Z(l), j(c);
							var u = B(c, 2), d = B(R(u));
							Z(d), j(u);
							var f = B(u, 2), p = B(R(f));
							Z(p), j(f), j(t), V(() => {
								Q(r, W(O).frame.x), Q(a, W(O).frame.y), Q(s, W(O).frame.w), Q(l, W(O).frame.h), Q(d, W(O).frame.z ?? 1), Q(p, W(O).frame.rot ?? 0);
							}), G("change", r, (e) => Ae("x", Number(e.target.value))), G("change", a, (e) => Ae("y", Number(e.target.value))), G("change", s, (e) => Ae("w", Number(e.target.value))), G("change", l, (e) => Ae("h", Number(e.target.value))), G("change", d, (e) => Ae("z", Number(e.target.value))), G("change", p, (e) => Ae("rot", Number(e.target.value))), q(e, t);
						};
						Y(S, (e) => {
							W(y) === "desktop" && e(C);
						});
						var w = B(S, 2), T = R(w);
						Z(T), M(), j(w), j(x), j(b), V(() => {
							J(r, `${Ne[W(O).type] ?? W(O).type ?? ""}-blokk`), ri(T, W(O).decor);
						}), G("change", T, (e) => A(e.target.checked)), q(e, t);
					}, o = (e) => {
						var t = Yo(), r = B(z(t), 2), a = B(R(r));
						Z(a), j(r);
						var o = B(r, 6), s = R(o);
						Z(s), M(), j(o);
						var c = B(o, 2), l = (e) => {
							var t = zo(), n = z(t), r = B(R(n)), i = R(r);
							j(r), j(n);
							var a = B(n, 2);
							Z(a), V(() => {
								J(i, `${W(Le).size ?? ""} px`), Q(a, W(Le).size);
							}), G("input", a, (e) => ht("size", Number(e.target.value))), q(e, t);
						};
						Y(c, (e) => {
							W(Le) && e(l);
						});
						var u = B(c, 8);
						zr(u, 17, () => W(Be), Fr, (e, t, r) => {
							var a = Jo(), o = R(a), s = R(o);
							{
								let e = /* @__PURE__ */ N(() => n.map(([e, t]) => [e, t.label]));
								$(s, {
									get value() {
										return W(t).type;
									},
									title: "Bytt lagtype (innstillingene nullstilles)",
									get options() {
										return W(e);
									},
									onchange: (e) => $e(r, e)
								});
							}
							var c = B(s, 2), l = R(c);
							l.disabled = r === 0, X(l, () => i.up, !0), j(l);
							var u = B(l, 2);
							X(u, () => i.down, !0), j(u);
							var d = B(u, 2);
							X(d, () => i.cross, !0), j(d), j(c), j(o);
							var f = B(o, 2), p = (e) => {
								var n = Bo(), i = z(n), a = B(R(i));
								{
									let e = /* @__PURE__ */ N(ot);
									Ti(a, {
										get value() {
											return W(t).props.value;
										},
										get tokens() {
											return W(e);
										},
										label: "Lagets farge",
										onchange: (e) => Ze(r, "value", e)
									});
								}
								j(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								j(s), j(o);
								var l = B(o, 2);
								Z(l), V((e) => {
									J(c, `${e ?? ""}%`), Q(l, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("input", l, (e) => Ze(r, "opacity", Number(e.target.value))), q(e, n);
							}, m = (e) => {
								var n = Vo(), i = z(n), a = B(R(i));
								{
									let e = /* @__PURE__ */ N(ot);
									Ti(a, {
										get value() {
											return W(t).props.stops[0];
										},
										get tokens() {
											return W(e);
										},
										label: "Gradient fra",
										onchange: (e) => Qe(r, 0, e)
									});
								}
								j(i);
								var o = B(i, 2), s = B(R(o));
								{
									let e = /* @__PURE__ */ N(ot);
									Ti(s, {
										get value() {
											return W(t).props.stops[W(t).props.stops.length - 1];
										},
										get tokens() {
											return W(e);
										},
										label: "Gradient til",
										onchange: (e) => Qe(r, W(t).props.stops.length - 1, e)
									});
								}
								j(o);
								var c = B(o, 2), l = B(R(c)), u = R(l);
								j(l), j(c);
								var d = B(c, 2);
								Z(d);
								var f = B(d, 2), p = B(R(f)), m = R(p);
								j(p), j(f);
								var h = B(f, 2);
								Z(h);
								var g = B(h, 2), _ = R(g);
								Z(_), M(), j(g), V((e, n) => {
									J(u, `${W(t).props.angle ?? ""}°`), Q(d, W(t).props.angle), J(m, `${e ?? ""}%`), Q(h, W(t).props.opacity ?? 1), ri(_, n);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100), () => !!W(t).props.animate]), G("input", d, (e) => Ze(r, "angle", Number(e.target.value))), G("input", h, (e) => Ze(r, "opacity", Number(e.target.value))), G("change", _, (e) => Ze(r, "animate", e.target.checked)), q(e, n);
							}, h = (e) => {
								var n = Ho(), i = z(n), a = B(R(i));
								{
									let e = /* @__PURE__ */ N(ot);
									Ti(a, {
										get value() {
											return W(t).props.color;
										},
										get tokens() {
											return W(e);
										},
										label: "Glødens farge",
										onchange: (e) => Ze(r, "color", e)
									});
								}
								j(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								j(s), j(o);
								var l = B(o, 2);
								Z(l);
								var u = B(l, 2), d = B(R(u)), f = R(d);
								j(d), j(u);
								var p = B(u, 2);
								Z(p);
								var m = B(p, 2), h = B(R(m)), g = R(h);
								j(h), j(m);
								var _ = B(m, 2);
								Z(_);
								var v = B(_, 2), y = B(R(v)), b = R(y);
								j(y), j(v);
								var x = B(v, 2);
								Z(x), V((e, n, r, i) => {
									J(c, `${e ?? ""}%`), Q(l, W(t).props.x), J(f, `${n ?? ""}%`), Q(p, W(t).props.y), J(g, `${r ?? ""}%`), Q(_, W(t).props.radius), J(b, `${i ?? ""}%`), Q(x, W(t).props.opacity);
								}, [
									() => Math.round(W(t).props.x * 100),
									() => Math.round(W(t).props.y * 100),
									() => Math.round(W(t).props.radius * 100),
									() => Math.round(W(t).props.opacity * 100)
								]), G("input", l, (e) => Ze(r, "x", Number(e.target.value))), G("input", p, (e) => Ze(r, "y", Number(e.target.value))), G("input", _, (e) => Ze(r, "radius", Number(e.target.value))), G("input", x, (e) => Ze(r, "opacity", Number(e.target.value))), q(e, n);
							}, g = (e) => {
								var n = Uo(), i = z(n), a = B(R(i)), o = R(a);
								j(a), j(i);
								var s = B(i, 2);
								Z(s), V((e) => {
									J(o, `${e ?? ""}%`), Q(s, W(t).props.opacity);
								}, [() => Math.round(W(t).props.opacity * 100)]), G("input", s, (e) => Ze(r, "opacity", Number(e.target.value))), q(e, n);
							}, _ = (e) => {
								var n = Go(), i = z(n), a = R(i), o = B(a);
								j(i);
								var s = B(i, 2), c = B(R(s));
								{
									let e = /* @__PURE__ */ N(() => W(t).props.fit ?? "cover");
									$(c, {
										get value() {
											return W(e);
										},
										options: [
											["cover", "Fyll (beskjæres)"],
											["contain", "Vis hele"],
											["repeat", "Gjenta (mønster)"]
										],
										onchange: (e) => Ze(r, "fit", e)
									});
								}
								j(s);
								var l = B(s, 2), u = (e) => {
									var n = Wo(), i = z(n), a = B(R(i)), o = R(a);
									j(a), j(i);
									var s = B(i, 2);
									Z(s);
									var c = B(s, 2), l = B(R(c)), u = R(l);
									j(l), j(c);
									var d = B(c, 2);
									Z(d), V((e, n) => {
										J(o, `${e ?? ""}%`), Q(s, W(t).props.x ?? .5), J(u, `${n ?? ""}%`), Q(d, W(t).props.y ?? .5);
									}, [() => Math.round((W(t).props.x ?? .5) * 100), () => Math.round((W(t).props.y ?? .5) * 100)]), G("input", s, (e) => Ze(r, "x", Number(e.target.value))), G("input", d, (e) => Ze(r, "y", Number(e.target.value))), q(e, n);
								};
								Y(l, (e) => {
									(W(t).props.fit ?? "cover") !== "repeat" && e(u);
								});
								var d = B(l, 2), f = B(R(d)), p = R(f);
								j(f), j(d);
								var m = B(d, 2);
								Z(m);
								var h = B(m, 2), g = B(R(h)), _ = R(g);
								j(g), j(h);
								var v = B(h, 2);
								Z(v), V((e) => {
									J(a, `${W(t).props.src ? "Bytt bilde" : "Velg bilde"} `), J(p, `${W(t).props.blur ?? 0 ?? ""} px`), Q(m, W(t).props.blur ?? 0), J(_, `${e ?? ""}%`), Q(v, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", o, (e) => et(r, e)), G("input", m, (e) => Ze(r, "blur", Number(e.target.value))), G("input", v, (e) => Ze(r, "opacity", Number(e.target.value))), q(e, n);
							}, v = (e) => {
								var n = qo(), a = z(n), o = B(R(a));
								j(a);
								var s = B(a, 2);
								zr(s, 17, () => W(t).props.images ?? [], Fr, (e, n, a) => {
									var o = Ko(), s = z(o), c = R(s), l = B(c, 2), u = R(l);
									u.disabled = a === 0, X(u, () => i.up, !0), j(u);
									var d = B(u, 2);
									X(d, () => i.down, !0), j(d);
									var f = B(d, 2);
									X(f, () => i.cross, !0), j(f), j(l), j(s);
									var p = B(s, 2), m = B(R(p)), h = R(m);
									j(m), j(p);
									var g = B(p, 2);
									Z(g);
									var _ = B(g, 2), v = B(R(_)), y = R(v);
									j(v), j(_);
									var b = B(_, 2);
									Z(b), V((e, r) => {
										ii(c, "src", W(n).src), d.disabled = a === W(t).props.images.length - 1, J(h, `${e ?? ""}%`), Q(g, W(n).x ?? .5), J(y, `${r ?? ""}%`), Q(b, W(n).y ?? .5);
									}, [() => Math.round((W(n).x ?? .5) * 100), () => Math.round((W(n).y ?? .5) * 100)]), G("click", u, () => nt(r, a, -1)), G("click", d, () => nt(r, a, 1)), G("click", f, () => rt(r, a)), G("input", g, (e) => it(r, a, "x", Number(e.target.value))), G("input", b, (e) => it(r, a, "y", Number(e.target.value))), q(e, o);
								});
								var c = B(s, 2), l = B(R(c));
								{
									let e = /* @__PURE__ */ N(() => W(t).props.fit ?? "cover");
									$(l, {
										get value() {
											return W(e);
										},
										options: [["cover", "Fyll (beskjæres)"], ["contain", "Vis hele"]],
										onchange: (e) => Ze(r, "fit", e)
									});
								}
								j(c);
								var u = B(c, 2), d = B(R(u));
								Z(d), j(u);
								var f = B(u, 2), p = B(R(f)), m = R(p);
								j(p), j(f);
								var h = B(f, 2);
								Z(h);
								var g = B(h, 2), _ = B(R(g)), v = R(_);
								j(_), j(g);
								var y = B(g, 2);
								Z(y);
								var b = B(y, 2), x = B(R(b)), S = R(x);
								j(x), j(b);
								var C = B(b, 2);
								Z(C), M(2), V((e, n) => {
									Q(d, W(t).props.interval ?? 6), J(m, `${e ?? ""} s`), Q(h, W(t).props.fade ?? 1.5), J(v, `${W(t).props.blur ?? 0 ?? ""} px`), Q(y, W(t).props.blur ?? 0), J(S, `${n ?? ""}%`), Q(C, W(t).props.opacity ?? 1);
								}, [() => (W(t).props.fade ?? 1.5).toFixed(1), () => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", o, (e) => tt(r, e)), G("change", d, (e) => Ze(r, "interval", Number(e.target.value))), G("input", h, (e) => Ze(r, "fade", Number(e.target.value))), G("input", y, (e) => Ze(r, "blur", Number(e.target.value))), G("input", C, (e) => Ze(r, "opacity", Number(e.target.value))), q(e, n);
							};
							Y(f, (e) => {
								W(t).type === "color" ? e(p) : W(t).type === "gradient" ? e(m, 1) : W(t).type === "glow" ? e(h, 2) : W(t).type === "grain" ? e(g, 3) : W(t).type === "image" ? e(_, 4) : W(t).type === "bildegalleri" && e(v, 5);
							}), j(a), V(() => u.disabled = r === W(Be).length - 1), G("click", l, () => Xe(r, -1)), G("click", u, () => Xe(r, 1)), G("click", d, () => Ye(r)), q(e, a);
						});
						var d = B(u, 2), f = B(R(d));
						{
							let e = /* @__PURE__ */ N(() => n.map(([e, t]) => [e, t.label]));
							$(f, {
								get value() {
									return W(qe);
								},
								get options() {
									return W(e);
								},
								onchange: (e) => L(qe, e, !0)
							});
						}
						j(d);
						var p = B(d, 2), m = B(p, 4), h = B(R(m));
						{
							let e = /* @__PURE__ */ N(() => W(Ve)?.type ?? ""), t = /* @__PURE__ */ N(() => [["", "Ingen"], ...Object.entries(ka).map(([e, t]) => [e, t.label])]);
							$(h, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => ut(e || null)
							});
						}
						j(m);
						var g = B(m, 2), _ = (e) => {
							var t = Io(), n = z(t), r = B(R(n));
							Z(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Z(a), j(i), M(2), V(() => {
								Q(r, W(Ve).props.duration), Q(a, W(Ve).props.delay);
							}), G("change", r, (e) => dt("duration", Number(e.target.value))), G("change", a, (e) => dt("delay", Number(e.target.value))), q(e, t);
						};
						Y(g, (e) => {
							W(Ve) && ka[W(Ve).type]?.entrance && e(_);
						}), V(() => {
							Q(a, W(Re)), ri(s, W(Le) !== null);
						}), G("change", a, (e) => ft(e.target.value)), G("change", s, (e) => mt(e.target.checked)), G("click", p, () => Je(W(qe))), q(e, t);
					}, s = (e) => {
						q(e, Xo());
					};
					Y(r, (e) => {
						W(O) ? e(a) : W(Ie) ? e(o, 1) : e(s, -1);
					}), j(t), q(e, t);
				}, h = (e) => {
					var t = Qo(), n = B(R(t), 2), r = R(n);
					Z(r), M(), j(n);
					var i = B(n, 4);
					at(i), ii(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = B(i, 4), o = B(R(a));
					{
						let e = /* @__PURE__ */ N(() => W(E).footer?.align ?? "center");
						$(o, {
							get value() {
								return W(e);
							},
							options: [
								["left", "Venstre"],
								["center", "Midtstilt"],
								["right", "Høyre"]
							],
							onchange: (e) => Zn("footer", (t) => {
								t.align = e;
							})
						});
					}
					j(a), M(2), j(t), V((e) => {
						ri(r, e), Q(i, W(E).footer?.text ?? "");
					}, [() => !!W(E).footer?.show]), G("change", r, (e) => Zn("footer", (t) => {
						t.show = e.target.checked;
					})), G("input", i, (e) => Zn("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), q(e, t);
				}, v = (e) => {
					var t = is(), n = B(R(t), 2), r = (e) => {
						var t = $o(), n = B(R(t));
						{
							let e = /* @__PURE__ */ N(() => W(hn) ?? ""), t = /* @__PURE__ */ N(() => [["", "Velg …"], ...W(pn).map((e) => [e, W(mn)[e]?.name ?? e])]);
							$(n, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => L(hn, e || null, !0)
							});
						}
						j(t), q(e, t);
					};
					Y(n, (e) => {
						W(pn).length && e(r);
					});
					var a = B(n, 2), o = (e) => {
						let t = /* @__PURE__ */ N(() => W(mn)[W(hn)]);
						var n = rs(), r = z(n), a = R(r), o = B(a, 2);
						X(o, () => i.cross, !0), j(o), j(r);
						var s = B(r, 2);
						zr(s, 19, () => W(t).entries, (e) => e.id, (e, n, r) => {
							var a = ts(), o = R(a), s = R(o);
							j(o);
							var c = B(o, 2), l = R(c), u = R(l);
							Z(u);
							var d = B(u, 2), f = R(d);
							X(f, () => i.up, !0), j(f);
							var p = B(f, 2);
							X(p, () => i.down, !0), j(p);
							var m = B(p, 2);
							X(m, () => i.cross, !0), j(m), j(d), j(l);
							var h = B(l, 2), g = B(R(h));
							Z(g), j(h);
							var _ = B(h, 2);
							at(_);
							var v = B(_, 2), y = B(R(v));
							Z(y), j(v);
							var b = B(v, 2), x = R(b), S = R(x), C = B(S);
							j(x);
							var w = B(x, 2), T = (e) => {
								var t = es(), r = z(t), a = B(r, 2);
								X(a, () => i.cross, !0), j(a), V(() => ii(r, "src", W(n).image)), G("click", a, () => On(W(hn), W(n).id, "image", "")), q(e, t);
							};
							Y(w, (e) => {
								W(n).image && e(T);
							}), j(b), j(c), j(a), V((e) => {
								J(s, `${e ?? ""}${W(n).date ? ` · ${W(n).date}` : ""}`), Q(u, W(n).title), f.disabled = W(r) === 0, p.disabled = W(r) === W(t).entries.length - 1, Q(g, W(n).date ?? ""), Q(_, W(n).text ?? ""), Q(y, W(n).href ?? ""), J(S, `${W(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => W(n).title.replace(/<[^>]*>/g, "")]), G("change", u, (e) => On(W(hn), W(n).id, "title", e.target.value || "Uten tittel")), G("click", f, () => kn(W(hn), W(r), -1)), G("click", p, () => kn(W(hn), W(r), 1)), G("click", m, () => An(W(hn), W(n).id)), G("change", g, (e) => On(W(hn), W(n).id, "date", e.target.value)), G("change", _, (e) => On(W(hn), W(n).id, "text", e.target.value)), G("change", y, (e) => On(W(hn), W(n).id, "href", e.target.value)), G("change", C, (e) => jn(W(hn), W(n).id, e)), q(e, a);
						});
						var c = B(s, 2), l = (e) => {
							q(e, ns());
						};
						Y(c, (e) => {
							W(t).entries.length || e(l);
						}), M(2), G("click", a, () => Dn(W(hn))), G("click", o, () => En(W(hn))), q(e, n);
					};
					Y(a, (e) => {
						W(hn) && W(mn)[W(hn)] && e(o);
					});
					var s = B(a, 2), c = B(R(s));
					Z(c), j(s);
					var l = B(s, 2);
					$(B(R(l)), {
						get value() {
							return W(_n);
						},
						get options() {
							return vn;
						},
						onchange: (e) => L(_n, e, !0)
					}), j(l);
					var u = B(l, 2);
					j(t), V((e) => u.disabled = e, [() => !W(gn).trim()]), G("keydown", c, (e) => e.key === "Enter" && Tn()), ci(c, () => W(gn), (e) => L(gn, e)), G("click", u, Tn), q(e, t);
				}, b = (e) => {
					var t = ps(), n = B(R(t), 2), r = (e) => {
						q(e, as());
					}, a = /* @__PURE__ */ N(() => !Hn().length);
					Y(n, (e) => {
						W(a) && e(r);
					});
					var o = B(n, 2);
					zr(o, 16, Hn, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ N(() => In[t]), r = /* @__PURE__ */ N(() => (W(Fn)?.enabled ?? []).includes(t));
						var a = cs();
						let o;
						var s = R(a), c = R(s), l = R(c, !0);
						j(c);
						var u = B(c, 2), d = (e) => {
							var t = os(), r = R(t);
							j(t), V(() => J(r, `v${W(n).version ?? ""}`)), q(e, t);
						};
						Y(u, (e) => {
							W(n)?.version && e(d);
						});
						var f = B(u, 2), p = R(f), m = R(p);
						Z(m);
						var h = B(m);
						j(p);
						var g = B(p, 2);
						X(g, () => i.cross, !0), j(g), j(f), j(s);
						var _ = B(s, 2), v = (e) => {
							var t = ss(), r = R(t, !0);
							j(t), V((e) => J(r, e), [() => W(n).errors.join("; ")]), q(e, t);
						}, y = (e) => {
							var t = ss(), r = R(t);
							j(t), V(() => J(r, `Krever motorversjon ${W(n).requiresEngine ?? ""} (denne siden kjører ${W(Ln) ?? ""}); pluginen hoppes over ved lasting.`)), q(e, t);
						}, b = (e) => {
							var t = ss(), r = R(t);
							j(t), V((e) => J(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(W(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(W(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), q(e, t);
						};
						Y(_, (e) => {
							W(n)?.errors?.length ? e(v) : W(n) && !W(n).satisfied ? e(y, 1) : W(n)?.csp && e(b, 2);
						}), j(a), V((e) => {
							o = Xr(a, 1, "plugin-row svelte-1n46o8q", null, o, { "plugin-broken": W(n)?.errors?.length }), J(l, W(n)?.name ?? t), ii(p, "title", W(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ri(m, W(r)), m.disabled = e, J(h, ` ${W(r) ? "På" : "Av"}`);
						}, [() => !!W(n)?.errors?.length]), G("change", m, (e) => Kn(t, e.target.checked)), G("click", g, () => Jn(t)), q(e, a);
					});
					var s = B(o, 2), c = (e) => {
						var t = us();
						zr(B(z(t), 4), 16, () => W(Bn), (e) => e, (e, t) => {
							var n = ls(), r = R(n), a = R(r), o = R(a, !0);
							j(a);
							var s = B(a, 2), c = (e) => {
								var n = os(), r = R(n);
								j(n), V(() => J(r, `v${In[t].version ?? ""}`)), q(e, n);
							};
							Y(s, (e) => {
								In[t]?.version && e(c);
							});
							var l = B(s, 2), u = R(l);
							X(u, () => i.right, !0), j(u), j(l), j(r), j(n), V(() => J(o, In[t]?.name ?? t)), G("click", u, () => Xn(t)), q(e, n);
						}), q(e, t);
					};
					Y(s, (e) => {
						W(Bn).length && e(c);
					});
					var l = B(s, 2), u = (e) => {
						var t = kr(), n = z(t), r = (e) => {
							q(e, ds());
						};
						Y(n, (e) => {
							W(Bn).length || e(r);
						}), q(e, t);
					}, d = (e) => {
						var t = fs(), n = B(z(t), 2);
						Z(n);
						var r = B(n, 2), i = B(r, 2), a = (e) => {
							var t = ss(), n = R(t, !0);
							j(t), V(() => J(n, W(zn))), q(e, t);
						};
						Y(i, (e) => {
							W(zn) && e(a);
						}), V((e) => r.disabled = e, [() => !W(Rn).trim()]), G("keydown", n, (e) => e.key === "Enter" && Yn()), ci(n, () => W(Rn), (e) => L(Rn, e)), G("click", r, Yn), q(e, t);
					};
					Y(l, (e) => {
						W(Vn) === "ok" ? e(u) : e(d, -1);
					}), j(t), q(e, t);
				}, x = (e) => {
					var t = vs(), n = B(R(t), 2), r = (e) => {
						q(e, ms());
					}, i = (e) => {
						var t = Va(), n = z(t), r = (e) => {
							var t = hs(), n = R(t, !0);
							j(t), V(() => J(n, W(St))), q(e, t);
						};
						Y(n, (e) => {
							W(St) && e(r);
						});
						var i = B(n, 2), a = (e) => {
							var t = _s(), n = z(t);
							zr(B(n, 2), 19, () => W(xt), (e) => e.sha, (e, t, n) => {
								var r = gs();
								let i;
								var a = R(r), o = R(a, !0);
								j(a);
								var s = B(a, 2), c = R(s);
								j(s), j(r), V((e) => {
									i = Xr(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), ii(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${Tt.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), V(() => {
								n.disabled = W(Ct) || !W(g)?.allowed, ii(n, "title", W(g)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, Dt), q(e, t);
						};
						Y(i, (e) => {
							W(xt).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(xt) === null ? e(r) : e(i, -1);
					}), j(t), q(e, t);
				};
				Y(o, (e) => {
					W(Ce) === "Sider" ? e(s) : W(Ce) === "Nav" ? e(l, 1) : W(Ce) === "Tema" ? e(u, 2) : W(Ce) === "Blokker" ? e(d, 3) : W(Ce) === "Grid" ? e(f, 4) : W(Ce) === "Egenskaper" ? e(p, 5) : W(Ce) === "Footer" ? e(h, 6) : W(Ce) === "Samlinger" ? e(v, 7) : W(Ce) === "Plugins" ? e(b, 8) : W(Ce) === "Historikk" && e(x, 9);
				}), j(t), V(() => J(a, W(Ce))), q(e, t);
			};
			Y(a, (e) => {
				W(Ce) && e(o);
			}), q(e, t);
		};
		Y(r, (e) => {
			W(v) && e(a);
		});
		var o = B(r, 2);
		let s;
		var l = R(o);
		fi(l, (e) => L(h, e), () => W(h)), j(o), j(t), V(() => {
			s = Xr(o, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: W(y) === "mobile" }), ii(l, "src", `/?page=${W(c)}&preview=1`);
		}), br("load", l, jt), vr(l), q(e, t);
	}, Li = (e) => {
		q(e, Ss());
	};
	Y(Fi, (e) => {
		W(s) ? e(Ii) : e(Li, -1);
	});
	var Ri = B(Fi, 2), zi = (e) => {
		ia(e, {
			get image() {
				return W(Gt);
			},
			onapply: qt,
			oncancel: () => L(Gt, null)
		});
	};
	Y(Ri, (e) => {
		W(Gt) && e(zi);
	});
	var Bi = B(Ri, 2), Vi = (e) => {
		var t = ws(), n = R(t), r = R(n), i = R(r, !0);
		j(r);
		var a = B(r, 2);
		zr(a, 16, () => W(me).lines, (e) => e, (e, t) => {
			var n = Cs(), r = R(n, !0);
			j(n), V(() => J(r, t)), q(e, n);
		});
		var o = B(a, 2), s = R(o), c = R(s, !0);
		j(s);
		var l = B(s, 2), u = R(l, !0);
		j(l), j(o), j(n), j(t), V(() => {
			J(i, W(me).title), J(c, W(me).cancelLabel), J(u, W(me).okLabel);
		}), G("click", s, () => ge(!1)), G("click", l, () => ge(!0)), q(e, t);
	};
	Y(Bi, (e) => {
		W(me) && e(Vi);
	});
	var Hi = B(Bi, 2), Ui = (e) => {
		var t = Ts(), n = R(t), r = B(R(n), 4), i = B(R(r));
		Z(i), j(r);
		var a = B(r, 2);
		Ti(B(R(a)), {
			get value() {
				return W(ye);
			},
			label: "Aksentfarge",
			onchange: (e) => L(ye, e, !0)
		}), j(a);
		var o = B(a, 2);
		Ti(B(R(o)), {
			get value() {
				return W(be);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => L(be, e, !0)
		}), j(o);
		var s = B(o, 4), c = R(s), l = B(c, 2);
		j(s), j(n), j(t), V((e) => l.disabled = e, [() => !W(ve).trim()]), G("keydown", i, (e) => e.key === "Enter" && Se()), ci(i, () => W(ve), (e) => L(ve, e)), G("click", c, xe), G("click", l, Se), q(e, t);
	};
	Y(Hi, (e) => {
		W(_e) && e(Ui);
	});
	var Wi = B(Hi, 2), Gi = (e) => {
		var t = Es();
		let n;
		var r = R(t), i = R(r, !0);
		j(r);
		var a = B(r, 2);
		j(t), V(() => {
			n = Xr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(d) === "ok",
				error: W(d) === "error"
			}), J(i, W(u));
		}), G("click", a, () => p("")), q(e, t);
	};
	Y(Wi, (e) => {
		W(u) && e(Gi);
	}), j(hi), V(() => yi = Xr(vi, 1, "topbar svelte-1n46o8q", null, yi, { hidden: !W(v) })), q(e, hi), We();
}
xr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var ks = Ar(Os, { target: document.getElementById("urd-admin") });
//#endregion
export { ks as default };
