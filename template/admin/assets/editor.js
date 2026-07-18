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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, ee = 1 << 25, te = 65536, ne = 1 << 21, re = 1 << 22, T = 1 << 23, ie = Symbol("$state"), ae = Symbol(""), oe = Symbol("attributes"), se = Symbol("class"), E = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), ue = new class extends Error {
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
function me() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function he() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ge() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function _e() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ve() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var D = {}, ye = Symbol("uninitialized"), be = "http://www.w3.org/1999/xhtml", O = "http://www.w3.org/2000/svg", xe = "http://www.w3.org/1998/Math/MathML";
function Se() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Ce(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function we() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Te() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var k = !1;
function Ee(e) {
	k = e;
}
var A;
function De(e) {
	if (e === null) throw Ce(), D;
	return A = e;
}
function Oe() {
	return De(/* @__PURE__ */ on(A));
}
function j(e) {
	if (k) {
		if (/* @__PURE__ */ on(A) !== null) throw Ce(), D;
		A = e;
	}
}
function M(e = 1) {
	if (k) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ on(n);
		A = n;
	}
}
function ke(e = !0) {
	for (var t = 0, n = A;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ on(n);
		e && n.remove(), n = i;
	}
}
function Ae(e) {
	if (!e || e.nodeType !== 8) throw Ce(), D;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function je(e) {
	return e === this.v;
}
function Me(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Ne(e) {
	return !Me(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Pe = [];
function Fe(e, t = !1, n = !1) {
	return Ie(e, /* @__PURE__ */ new Map(), "", Pe, null, n);
}
function Ie(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ie(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ie(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ie(t.toJSON(), n, r, i, t);
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
var Le = null;
function Re(e) {
	Le = e;
}
function ze(e, t = !1, n) {
	Le = {
		p: Le,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: U,
		l: null
	};
}
function Be(e) {
	var t = Le, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) hn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Le = t.p, e ?? {};
}
function Ve() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var He = [];
function Ue() {
	var e = He;
	He = [], f(e);
}
function We(e) {
	if (He.length === 0 && !wt) {
		var t = He;
		queueMicrotask(() => {
			t === He && Ue();
		});
	}
	He.push(e);
}
function Ge() {
	for (; He.length > 0;) Ue();
}
function Ke(e) {
	var t = U;
	if (t === null) return H.f |= T, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	qe(e, t);
}
function qe(e, t) {
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
var Je = ~(g | _ | h);
function N(e, t) {
	e.f = e.f & Je | t;
}
function Ye(e) {
	e.f & 512 || e.deps === null ? N(e, h) : N(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Xe(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= te, Xe(t.deps));
}
function Ze(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Xe(e.deps), N(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function Qe(e) {
	k && /* @__PURE__ */ an(e) !== null && sn(e);
}
var $e = !1;
function et() {
	$e || ($e = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function tt(e) {
	var t = H, n = U;
	Rn(null), zn(null);
	try {
		return e();
	} finally {
		Rn(t), zn(n);
	}
}
function nt(e, t, n, r = n) {
	e.addEventListener(t, () => tt(n));
	let i = e[le];
	i ? e[le] = () => {
		i(), r(!0);
	} : e[le] = () => r(!0), et();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function rt(e) {
	let t = 0, n = Ut(0), r;
	return () => {
		pn() && (W(n), yn(() => (t === 0 && (r = or(() => e(() => qt(n)))), t += 1, () => {
			We(() => {
				--t, t === 0 && (r?.(), r = void 0, qt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var it = S | C;
function at(e, t, n, r) {
	new ot(e, t, n, r);
}
var ot = class {
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
	#h = rt(() => (this.#m = Ut(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = U;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = U.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = bn(() => {
			if (k) {
				let e = this.#t;
				Oe();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, it), k && (this.#e = A);
	}
	#g() {
		try {
			this.#a = xn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = xn(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = xn(() => e(this.#e)), We(() => {
			var e = this.#c = document.createDocumentFragment(), t = rn();
			e.append(t), this.#a = this.#x(() => xn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, On(this.#o, () => {
				this.#o = null;
			}), this.#b(P));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = xn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Mn(this.#a, e);
				let t = this.#n.pending;
				this.#o = xn(() => t(this.#e));
			} else this.#b(P);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Ze(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = U, n = H, r = Le;
		zn(this.#i), Rn(this.#i), Re(this.#i.ctx);
		try {
			return At.ensure(), e();
		} catch (e) {
			return Ke(e), null;
		} finally {
			zn(t), Rn(n), Re(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && On(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, We(() => {
			this.#d = !1, this.#m && Gt(this.#m, this.#l);
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
		this.#a &&= (Tn(this.#a), null), this.#o &&= (Tn(this.#o), null), this.#s &&= (Tn(this.#s), null), k && (De(this.#t), M(), De(ke()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Te();
				return;
			}
			r = !0, i && ve(), this.#s !== null && On(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				qe(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return xn(() => {
						var t = U;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return qe(e, this.#i.parent), null;
				}
			}));
		};
		We(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				qe(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => qe(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function st(e, t, n, r) {
	let i = Ve() ? dt : ht;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = U, c = ct(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				qe(e, s);
			}
			lt();
		}
	}
	var d = ut();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ pt(e))).then(u).catch((e) => qe(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), lt();
	}) : f();
}
function ct() {
	var e = U, t = H, n = Le, r = P;
	return function(i = !0) {
		zn(e), Rn(t), Re(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function lt(e = !0) {
	zn(null), Rn(null), Re(null), e && P?.deactivate();
}
function ut() {
	var e = U, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function dt(e) {
	var t = 2 | g;
	return U !== null && (U.f |= C), {
		ctx: Le,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: ye,
		wv: 0,
		parent: U,
		ac: null
	};
}
var ft = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function pt(e, t, n) {
	let r = U;
	r === null && fe();
	var i = void 0, a = Ut(ye), o = !H, s = /* @__PURE__ */ new Set();
	return vn(() => {
		var t = U, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(lt);
		} catch (e) {
			n.reject(e), lt();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = ut();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(ft);
			else for (let e of s.values()) e.reject(ft);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== ft && (c.activate(), t ? (a.f |= T, Gt(a, t)) : (a.f & 8388608 && (a.f ^= T), Gt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), mn(() => {
		for (let e of s) e.reject(ft);
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
function mt(e) {
	let t = /* @__PURE__ */ dt(e);
	return Vn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function ht(e) {
	let t = /* @__PURE__ */ dt(e);
	return t.equals = Ne, t;
}
function gt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Tn(t[n]);
	}
}
function _t(e) {
	var t, n = U, r = e.parent;
	if (!Fn && r !== null && e.v !== ye && r.f & 24576) return Se(), e.v;
	zn(r);
	try {
		e.f &= ~te, gt(e), t = $n(e);
	} finally {
		zn(n);
	}
	return t;
}
function vt(e) {
	var t = _t(e);
	if (!e.equals(t) && (e.wv = Xn(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), St?.capture(e, t, !0)), e.deps === null))) {
		N(e, h);
		return;
	}
	Fn || (F === null ? Ye(e) : (pn() || P?.is_fork) && F.set(e, t));
}
function yt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && tt(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), tr(t, 0), Cn(t));
}
function bt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && nr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var xt = null, P = null, St = null, F = null, Ct = null, wt = !1, Tt = !1, Et = null, Dt = null, Ot = 0, kt = 1, At = class e {
	id = kt++;
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
		xt === null ? xt = this : (xt.#n = this, this.#t = xt), xt = this;
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
			for (var r of n.d) N(r, g), t(r);
			for (r of n.m) N(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Ot++ > 1e3 && (this.#x(), Mt());
		for (let e of this.#u) this.#d.delete(e), N(e, g), this.schedule(e);
		for (let e of this.#d) N(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Et = [], r = [], i = Dt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw zt(e), this.#h() || this.discard(), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Et = null, Dt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Rt(e, t);
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
		this.#r.clear(), St = this, Pt(r), Pt(n), St = null, this.#s?.resolve();
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
				a ? r.f ^= h : i & 4 ? t.push(r) : Zn(r) && (i & 16 && this.#d.add(r), nr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), N(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), P = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) Ze(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== ye && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), F?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, F = null;
	}
	flush() {
		try {
			Tt = !0, P = this, this.#g();
		} finally {
			Ot = 0, Ct = null, Et = null, Dt = null, Tt = !1, P = null, F = null, Vt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(ft);
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
		this.#m || (this.#m = !0, We(() => {
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
			!Tt && !wt && We(() => {
				t.#e || t.flush();
			});
		}
		return P;
	}
	apply() {
		F = null;
	}
	schedule(e) {
		if (Ct = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (Et !== null && t === U && (H === null || !(H.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? xt = e : t.#t = e, this.linked = !1;
		}
	}
};
function jt(e) {
	var t = wt;
	wt = !0;
	try {
		var n;
		for (e && (P !== null && !P.is_fork && P.flush(), n = e());;) {
			if (Ge(), P === null) return n;
			P.flush();
		}
	} finally {
		wt = t;
	}
}
function Mt() {
	try {
		me();
	} catch (e) {
		qe(e, Ct);
	}
}
var Nt = null;
function Pt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Zn(r) && (Nt = /* @__PURE__ */ new Set(), nr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Dn(r), Nt?.size > 0)) {
				Vt.clear();
				for (let e of Nt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Nt.has(n) && (Nt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || nr(n);
					}
				}
				Nt.clear();
			}
		}
		Nt = null;
	}
}
function Ft(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Ft(i, t, n, r) : e & 4194320 && !(e & 2048) && It(i, t, r) && (N(i, g), Lt(i));
	}
}
function It(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && It(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Lt(e) {
	P.schedule(e);
}
function Rt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), N(e, h);
		for (var n = e.first; n !== null;) Rt(n, t), n = n.next;
	}
}
function zt(e) {
	N(e, h);
	for (var t = e.first; t !== null;) zt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Bt = /* @__PURE__ */ new Set(), Vt = /* @__PURE__ */ new Map(), Ht = !1;
function Ut(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: je,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function I(e, t) {
	let n = Ut(e, t);
	return Vn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Wt(e, t = !1, n = !0) {
	let r = Ut(e);
	return t || (r.equals = Ne), r;
}
function L(e, t, n = !1) {
	return H !== null && (!Ln || H.f & 131072) && Ve() && H.f & 4325394 && (Bn === null || !Bn.has(e)) && _e(), Gt(e, n ? Yt(t) : t, Dt);
}
function Gt(e, t, n = null) {
	if (!e.equals(t)) {
		Vt.set(e, Fn ? t : e.v);
		var r = At.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && _t(t), F === null && Ye(t);
		}
		e.wv = Xn(), Jt(e, g, n), Ve() && U !== null && U.f & 1024 && !(U.f & 96) && (Wn === null ? Gn([e]) : Wn.push(e)), !r.is_fork && Bt.size > 0 && !Ht && Kt();
	}
	return t;
}
function Kt() {
	Ht = !1;
	for (let e of Bt) {
		e.f & 1024 && N(e, _);
		let t;
		try {
			t = Zn(e);
		} catch {
			t = !0;
		}
		t && nr(e);
	}
	Bt.clear();
}
function qt(e) {
	L(e, e.v + 1);
}
function Jt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ve(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === U)) {
			var l = (c & g) === 0;
			if (l && N(s, t), c & 131072) Bt.add(s);
			else if (c & 2) {
				var u = s;
				F?.delete(u), c & 65536 || (c & 512 && (U === null || !(U.f & 2097152)) && (s.f |= te), Jt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Nt !== null && Nt.add(d), n === null ? Lt(d) : n.push(d);
			}
		}
	}
}
function Yt(t) {
	if (typeof t != "object" || !t || ie in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = Jn, f = (e) => {
		if (Jn === d) return e();
		var t = H, n = Jn;
		Rn(null), Yn(d);
		var r = e();
		return Rn(t), Yn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ I(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && he();
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
					let e = f(() => /* @__PURE__ */ I(ye, u));
					r.set(t, e), qt(o);
				}
			} else L(n, ye), qt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ie) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(Yt(s ? e[n] : ye), u)), r.set(n, o)), o !== void 0) {
				var c = W(o);
				return c === ye ? void 0 : c;
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
				if (a !== void 0 && o !== ye) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== ye || Reflect.has(e, t);
			return (n !== void 0 || U !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? Yt(e[t]) : ye, u)), r.set(t, n)), W(n) === ye) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(ye, u)), r.set(d + "", p)) : L(p, ye);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, Yt(n)), r.set(t, c));
			else {
				l = c.v !== ye;
				var m = f(() => Yt(n));
				L(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				qt(o);
			}
			return !0;
		},
		ownKeys(e) {
			W(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== ye;
			});
			for (var [n, i] of r) i.v !== ye && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			ge();
		}
	});
}
function Xt(e) {
	try {
		if (typeof e == "object" && e && ie in e) return e[ie];
	} catch {}
	return e;
}
function Zt(e, t) {
	return Object.is(Xt(e), Xt(t));
}
var Qt, $t, en, tn;
function nn() {
	if (Qt === void 0) {
		Qt = window, $t = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		en = a(t, "firstChild").get, tn = a(t, "nextSibling").get, u(e) && (e[se] = void 0, e[oe] = null, e[E] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function rn(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function an(e) {
	return en.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function on(e) {
	return tn.call(e);
}
function R(e, t) {
	if (!k) return /* @__PURE__ */ an(e);
	var n = /* @__PURE__ */ an(A);
	if (n === null) n = A.appendChild(rn());
	else if (t && n.nodeType !== 3) {
		var r = rn();
		return n?.before(r), De(r), r;
	}
	return t && un(n), De(n), n;
}
function z(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ an(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ on(n) : n;
	}
	if (t) {
		if (A?.nodeType !== 3) {
			var r = rn();
			return A?.before(r), De(r), r;
		}
		un(A);
	}
	return A;
}
function B(e, t = 1, n = !1) {
	let r = k ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ on(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = rn();
			return r === null ? i?.after(a) : r.before(a), De(a), a;
		}
		un(r);
	}
	return De(r), r;
}
function sn(e) {
	e.textContent = "";
}
function cn() {
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
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function dn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function fn(e, t) {
	var n = U;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: Le,
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
	if (e & 4) Et === null ? At.ensure().schedule(r) : Et.push(r);
	else if (t !== null) {
		try {
			nr(r);
		} catch (e) {
			throw Tn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && dn(i, n), H !== null && H.f & 2 && !(e & 64))) {
		var a = H;
		(a.effects ??= []).push(i);
	}
	return r;
}
function pn() {
	return H !== null && !Ln;
}
function mn(e) {
	let t = fn(8, null);
	return N(t, h), t.teardown = e, t;
}
function hn(e) {
	return fn(4 | w, e);
}
function gn(e) {
	At.ensure();
	let t = fn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? On(t, () => {
			Tn(t), n(void 0);
		}) : (Tn(t), n(void 0));
	});
}
function _n(e) {
	return fn(4, e);
}
function vn(e) {
	return fn(re | C, e);
}
function yn(e, t = 0) {
	return fn(8 | t, e);
}
function V(e, t = [], n = [], r = []) {
	st(r, t, n, (t) => {
		fn(8, () => {
			e(...t.map(W));
		});
	});
}
function bn(e, t = 0) {
	return fn(16 | t, e);
}
function xn(e) {
	return fn(32 | C, e);
}
function Sn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Fn, n = H;
		In(!0), Rn(null);
		try {
			t.call(null);
		} finally {
			In(e), Rn(n);
		}
	}
}
function Cn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && tt(() => {
			e.abort(ue);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : Tn(n, t), n = r;
	}
}
function wn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || Tn(t), t = n;
	}
}
function Tn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (En(e.nodes.start, e.nodes.end), n = !0), e.f |= x, Cn(e, t && !n), tr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Sn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Dn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function En(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ on(e);
		e.remove(), e = n;
	}
}
function Dn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function On(e, t, n = !0) {
	var r = [];
	kn(e, r, !0);
	var i = () => {
		n && Tn(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function kn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				kn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function An(e) {
	jn(e, !0);
}
function jn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (N(e, g), At.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			jn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Mn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ on(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Nn = null, Pn = !1, Fn = !1;
function In(e) {
	Fn = e;
}
var H = null, Ln = !1;
function Rn(e) {
	H = e;
}
var U = null;
function zn(e) {
	U = e;
}
var Bn = null;
function Vn(e) {
	H !== null && (Bn ??= /* @__PURE__ */ new Set()).add(e);
}
var Hn = null, Un = 0, Wn = null;
function Gn(e) {
	Wn = e;
}
var Kn = 1, qn = 0, Jn = qn;
function Yn(e) {
	Jn = e;
}
function Xn() {
	return ++Kn;
}
function Zn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~te), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Zn(a) && vt(a), a.wv > e.wv) return !0;
		}
		t & 512 && F === null && N(e, h);
	}
	return !1;
}
function Qn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Bn !== null && Bn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Qn(a, t, !1) : t === a && (n ? N(a, g) : a.f & 1024 && N(a, _), Lt(a));
	}
}
function $n(e) {
	var t = Hn, n = Un, r = Wn, i = H, a = Bn, o = Le, s = Ln, c = Jn, l = e.f;
	Hn = null, Un = 0, Wn = null, H = l & 96 ? null : e, Bn = null, Re(e.ctx), Ln = !1, Jn = ++qn, e.ac !== null && (tt(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = P?.is_fork;
		if (Hn !== null) {
			var m;
			if (p || tr(e, Un), f !== null && Un > 0) for (f.length = Un + Hn.length, m = 0; m < Hn.length; m++) f[Un + m] = Hn[m];
			else e.deps = f = Hn;
			if (pn() && e.f & 512) for (m = Un; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Un < f.length && (tr(e, Un), f.length = Un);
		if (Ve() && Wn !== null && !Ln && f !== null && !(e.f & 6146)) for (m = 0; m < Wn.length; m++) Qn(Wn[m], e);
		if (i !== null && i !== e) {
			if (qn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = qn;
			if (t !== null) for (let e of t) e.rv = qn;
			Wn !== null && (r === null ? r = Wn : r.push(...Wn));
		}
		return e.f & 8388608 && (e.f ^= T), d;
	} catch (e) {
		return Ke(e);
	} finally {
		e.f ^= ne, Hn = t, Un = n, Wn = r, H = i, Bn = a, Re(o), Ln = s, Jn = c;
	}
}
function er(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Hn === null || !n.call(Hn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~te), s.v !== ye && Ye(s), s.ac !== null && tt(() => {
			s.ac.abort(ue), s.ac = null;
		}), yt(s), tr(s, 0);
	}
}
function tr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) er(e, n[r]);
}
function nr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		N(e, h);
		var n = U, r = Pn;
		U = e, Pn = (t & 96) == 0;
		try {
			t & 16777232 ? wn(e) : Cn(e), Sn(e);
			var i = $n(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Kn;
		} finally {
			Pn = r, U = n;
		}
	}
}
async function rr() {
	await Promise.resolve(), jt();
}
function W(e) {
	var t = (e.f & 2) != 0;
	if (Nn?.add(e), H !== null && !Ln && !(U !== null && U.f & 16384) && (Bn === null || !Bn.has(e))) {
		var r = H.deps;
		if (H.f & 2097152) e.rv < qn && (e.rv = qn, Hn === null && r !== null && r[Un] === e ? Un++ : Hn === null ? Hn = [e] : Hn.push(e));
		else {
			H.deps ??= [], n.call(H.deps, e) || H.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [H] : n.call(i, H) || i.push(H);
		}
	}
	if (Fn && Vt.has(e)) return Vt.get(e);
	if (t) {
		var a = e;
		if (Fn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || ar(a)) && (o = _t(a)), Vt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Ln && H !== null && (Pn || (H.f & 512) != 0), c = (a.f & b) === 0;
		Zn(a) && (s && (a.f |= 512), vt(a)), s && !c && (bt(a), ir(a));
	}
	if (F?.has(e)) return F.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function ir(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (bt(t), ir(t));
}
function ar(e) {
	if (e.v === ye) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Vt.has(t) || t.f & 2 && ar(t)) return !0;
	return !1;
}
function or(e) {
	var t = Ln;
	try {
		return Ln = !0, e();
	} finally {
		Ln = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var sr = ["touchstart", "touchmove"];
function cr(e) {
	return sr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var lr = Symbol("events"), ur = /* @__PURE__ */ new Set(), dr = /* @__PURE__ */ new Set();
function fr(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function pr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || _r.call(t, e), !e.cancelBubble) return tt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? We(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function mr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = pr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && mn(() => {
		t.removeEventListener(e, o, a);
	});
}
function G(e, t, n) {
	(t[lr] ??= {})[e] = n;
}
function hr(e) {
	for (var t = 0; t < e.length; t++) ur.add(e[t]);
	for (var n of dr) n(e);
}
var gr = null;
function _r(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	gr = e;
	var s = 0, c = gr === e && e[lr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[lr] = t;
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
		Rn(null), zn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[lr]?.[r];
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
			e[lr] = t, delete e.currentTarget, Rn(d), zn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var vr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function yr(e) {
	return vr?.createHTML(e) ?? e;
}
function br(e) {
	var t = ln("template");
	return t.innerHTML = yr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function xr(e, t) {
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
		if (k) return xr(A, null), A;
		i === void 0 && (i = br(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ an(i)));
		var t = r || $t ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ an(t), s = t.lastChild;
			xr(o, s);
		} else xr(t, t);
		return t;
	};
}
function Sr() {
	if (k) return xr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = rn();
	return e.append(t, n), xr(t, n), e;
}
function q(e, t) {
	if (k) {
		var n = U;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Oe();
		return;
	}
	e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function Cr(e, t) {
	return Tr(e, t);
}
var wr = /* @__PURE__ */ new Map();
function Tr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	nn();
	var l = void 0, u = gn(() => {
		var s = n ?? t.appendChild(rn());
		at(s, { pending: () => {} }, (t) => {
			ze({});
			var n = Le;
			if (o && (n.c = o), a && (i.$$events = a), k && xr(t, null), l = e(t, i) || {}, k && (U.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw Ce(), D;
			Be();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = cr(r);
					for (let e of [t, document]) {
						var a = wr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), wr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, _r, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(ur)), dr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = wr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, _r), r.delete(e), r.size === 0 && wr.delete(n)) : r.set(e, i);
			}
			dr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Er.set(l, u), l;
}
var Er = /* @__PURE__ */ new WeakMap(), Dr = class {
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
			if (n) An(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (An(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (Tn(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Mn(r, t), t.append(rn()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else Tn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), On(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (Tn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = P, r = cn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = rn();
			i.append(a), this.#n.set(e, {
				effect: xn(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, xn(() => t(this.anchor)));
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
	k && (r = A, Oe());
	var i = new Dr(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = Ae(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ke();
				De(a), i.anchor = a, Ee(!1), i.ensure(e, t), Ee(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	bn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Or(e, t) {
	return t;
}
function kr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		On(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Ar(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			sn(d), d.append(u), e.items.clear();
		}
		Ar(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Ar(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ee, Mn(a, document.createDocumentFragment())) : Tn(t[i], n);
	}
}
var jr;
function Mr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? De(/* @__PURE__ */ an(u)) : u.appendChild(rn());
	}
	k && Oe();
	var d = null, f = /* @__PURE__ */ ht(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Pr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, Ir(d, null, c)) : An(d) : On(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: bn(() => {
			p = W(f);
			var e = p.length;
			let t = !1;
			k && Ae(c) === "[!" != (e === 0) && (c = ke(), De(c), Ee(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = P, v = cn(), y = 0; y < e; y += 1) {
				k && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, Ee(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Gt(S.v, b), S.i && Gt(S.i, y), v && u.unskip_effect(S.e)) : (S = Fr(l, h ? c : jr ??= rn(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = xn(() => s(c)) : (d = xn(() => s(jr ??= rn())), d.f |= ee)), e > r.size && pe("", "", ""), k && e > 0 && De(ke()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Ee(!0), W(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = A);
}
function Nr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Pr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Nr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (An(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= ee, _ === l) Ir(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Lr(e, d, _), Lr(e, _, y), Ir(_, y, n), d = _, p = [], m = [], l = Nr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ir(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Lr(e, S.prev, C.next), Lr(e, d, S), Lr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Ir(_, l, n), Lr(e, _.prev, _.next), Lr(e, _, d === null ? e.effect.first : d.next), Lr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Nr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Nr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Ar(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Nr(l.next);
		var te = w.length;
		if (te > 0) {
			var ne = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < te; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < te; v += 1) w[v].nodes?.a?.fix();
			}
			kr(e, w, ne);
		}
	}
	o && We(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Fr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Ut(n) : /* @__PURE__ */ Wt(n, !1, !1) : null, l = o & 2 ? Ut(i) : null;
	return {
		v: c,
		i: l,
		e: xn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ir(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ on(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Lr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Rr(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		k && (o = De(/* @__PURE__ */ an(c)));
	}
	V(() => {
		var e = U;
		if (s === (s = t() ?? "")) {
			k && Oe();
			return;
		}
		if (n && !k) {
			e.nodes = null, c.innerHTML = s, s !== "" && xr(/* @__PURE__ */ an(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (En(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (k) {
				for (var a = A.data, l = Oe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ on(l);
				if (l === null) throw Ce(), D;
				xr(A, u), o = De(l);
				return;
			}
			var d = ln(r ? "svg" : i ? "math" : "template", r ? O : i ? xe : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (xr(/* @__PURE__ */ an(f), f.lastChild), r || i) for (; /* @__PURE__ */ an(f);) o.before(/* @__PURE__ */ an(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var zr = [..." 	\n\r\f\xA0\v﻿"];
function Br(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || zr.includes(r[o - 1])) && (s === r.length || zr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Vr(e, t, n, r, i, a) {
	var o = e[se];
	if (k || o !== n || o === void 0) {
		var s = Br(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[se] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function X(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return we();
		for (var i of t.options) i.selected = n.includes(Ur(i));
		return;
	}
	for (i of t.options) if (Zt(Ur(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Z(e) {
	var t = new MutationObserver(() => {
		X(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), mn(() => {
		t.disconnect();
	});
}
function Hr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	nt(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Ur);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Ur(o);
		}
		n(a), e.__value = a, P !== null && r.add(P);
	}), _n(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = P;
			if (r.has(o)) return;
		}
		if (X(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Ur(s), n(a));
		}
		e.__value = a, i = !1;
	}), Z(e);
}
function Ur(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Wr = Symbol("is custom element"), Gr = Symbol("is html"), Kr = de ? "link" : "LINK", qr = de ? "progress" : "PROGRESS";
function Q(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Yr(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Yr(e, "checked", null), e.checked = r;
				}
			}
		};
		e[le] = n, We(n), et();
	}
}
function $(e, t) {
	var n = Xr(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== qr) || (e.value = t ?? "");
}
function Jr(e, t) {
	var n = Xr(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Yr(e, t, n, r) {
	var i = Xr(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Kr) || i[t] !== (i[t] = n) && (t === "loading" && (e[ae] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Qr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Xr(e) {
	return e[oe] ??= {
		[Wr]: e.nodeName.includes("-"),
		[Gr]: e.namespaceURI === be
	};
}
var Zr = /* @__PURE__ */ new Map();
function Qr(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Zr.get(t);
	if (n) return n;
	Zr.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function $r(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	nt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ei(e) ? ti(a) : a, n(a), P !== null && r.add(P), await rr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || or(t) == null && e.value) && (n(ei(e) ? ti(e.value) : e.value), P !== null && r.add(P)), yn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = P;
			if (r.has(i)) return;
		}
		ei(e) && n === ti(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function ei(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function ti(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function ni(e, t) {
	return e === t || e?.[ie] === t;
}
function ri(e = {}, t, n, r) {
	var i = Le.r, a = U;
	return _n(() => {
		var o, s;
		return yn(() => {
			o = s, s = r?.() || [], or(() => {
				ni(n(...s), e) || (t(e, ...s), o && ni(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && ni(n(...s), e) && t(null, ...s);
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
function ii(e, t) {
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
function ai(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n);
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
var oi = (e) => Math.round(e * 100) / 100;
function si(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ci = {
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
					x: oi(r.x * 100 / e.columns),
					w: oi(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= si(t.grid);
		return e;
	}
}, li = { 1: (e) => (e.grid = si(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function ui(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = li[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function di(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ci[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/theme.js
function fi(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var pi = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = fi(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, mi = {
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
		let n = t.stops.map(fi).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, e.style.opacity = String(t.opacity ?? 1), t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, hi = {
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
		let n = fi(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity);
	}
}, gi = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", _i = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = gi, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity);
	}
}, vi = {
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
		t.src && (e.style.backgroundImage = `url("${t.src}")`, t.fit === "repeat" ? (e.style.backgroundSize = "auto", e.style.backgroundRepeat = "repeat") : (e.style.backgroundSize = t.fit === "contain" ? "contain" : "cover", e.style.backgroundRepeat = "no-repeat"), e.style.backgroundPosition = `${(t.x ?? .5) * 100}% ${(t.y ?? .5) * 100}%`, e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`));
	}
}, yi = () => ({
	duration: 600,
	delay: 0
}), bi = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: yi,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: yi,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: yi,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	}
}, xi = 1600, Si = .82, Ci = .6;
async function wi(e) {
	let t = await createImageBitmap(e), n = Math.min(1, xi / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(Si);
	return s.size > 4e5 && (s = await o(Ci)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function Ti(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Ei(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var Di = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), Oi = /* @__PURE__ */ K("<option class=\"svelte-1n46o8q\"> </option>"), ki = /* @__PURE__ */ K("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span>", 1), Ai = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), ji = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), Mi = /* @__PURE__ */ K("<!> Ren visning", 1), Ni = /* @__PURE__ */ K("<!> Rediger", 1), Pi = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"><!> </span>"), Fi = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), Ii = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Li = /* @__PURE__ */ K("<button> </button>"), Ri = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), zi = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Bi = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>"), Vi = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button> <!></span></div>"), Hi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Ui = /* @__PURE__ */ K("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><select title=\"Font (Arv = temaets overskriftsfont)\" class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Arv</option><!></select> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), Wi = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Gi = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rekkefølge <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Bilde først</option><option class=\"svelte-1n46o8q\">Tekst først</option></select></label>"), Ki = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://…\"/>"), qi = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span> <select class=\"nav-target svelte-1n46o8q\" title=\"Hvor lenken går\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), Ji = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde</option><option class=\"svelte-1n46o8q\">Bilde + tekst</option></select></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Dekkevne <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når dekkevnen er lav)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Tekstfarge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Menyplassering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Høyre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Venstre (etter logoen)</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnsbilde i menyen og menypunkt-design kommer i en senere runde.</p></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div></details></div>"), Yi = /* @__PURE__ */ K("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Xi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Flater <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tekst <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksent <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), Zi = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Qi = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), $i = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), ea = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <label class=\"svelte-1n46o8q\">Font <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Arv fra tema</option><!></select></label> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" class=\"token-input svelte-1n46o8q\" min=\"8\" max=\"120\" placeholder=\"arv\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Font og størrelse gjelder hele feltet. Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), ta = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), na = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), ra = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label>", 1), ia = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), aa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tegn/emoji <input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/></label> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <p class=\"panel-hint svelte-1n46o8q\">Fargen gjelder tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), oa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), sa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles hos besøkende ved scrolling. Her spilles den én gang hver gang du endrer den.</p>", 1), ca = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), la = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ua = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), da = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fra <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Til <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bakgrunnen panorerer sakte i loop - uavhengig av Animasjon-valget under, som gjelder innholdet\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Panorer sakte (loop)</label>", 1), fa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), pa = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ma = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ha = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele</option><option class=\"svelte-1n46o8q\">Gjenta (mønster)</option></select></label> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ga = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><select class=\"bg-type svelte-1n46o8q\" title=\"Bytt lagtype (innstillingene nullstilles)\"></select> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\">×</button></span></span> <!></div>"), _a = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <select class=\"svelte-1n46o8q\"></select></label> <button class=\"ghost svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), va = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), ya = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), ba = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Footeren redigeres ett sted og vises nederst på alle sider.</p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer på siden</label> <label class=\"svelte-1n46o8q\">Innhold</label> <textarea rows=\"4\" class=\"svelte-1n46o8q\"></textarea> <p class=\"panel-hint svelte-1n46o8q\">Hver linje blir sin egen tekstlinje.</p> <label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <p class=\"panel-hint svelte-1n46o8q\">Design-maler for footer kommer i v0.6.</p></div>"), xa = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), Sa = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Ca = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), wa = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), Ta = /* @__PURE__ */ K("<!> <!>", 1), Ea = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), Da = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Oa = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), ka = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Aa = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), ja = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), Ma = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), Na = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!></div>");
function Pa(e, t) {
	ze(t, !0);
	let n = [
		["color", pi],
		["gradient", mi],
		["glow", hi],
		["image", vi],
		["grain", _i]
	], r = Object.fromEntries(n), i = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		phone: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"8\" y=\"3\" width=\"8\" height=\"18\" rx=\"2\"/><path d=\"M11 17.5h2\"/></svg>",
		pencil: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 3l4 4L8 20l-5 1 1-5L17 3z\"/></svg>",
		eye: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\"/></svg>",
		warn: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3L2 20h20L12 3z\"/><path d=\"M12 10v4\"/><path d=\"M12 17.2h.01\"/></svg>"
	}, a = /* @__PURE__ */ I(null), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(!1), c = /* @__PURE__ */ I(""), l = /* @__PURE__ */ I("info"), u = 0;
	function d(e, t = "info") {
		L(c, e, !0), L(l, t, !0);
		let n = ++u;
		t === "ok" && setTimeout(() => {
			u === n && (L(c, ""), L(l, "info"));
		}, 8e3);
	}
	let f = /* @__PURE__ */ I(null), p = /* @__PURE__ */ I(null), h = /* @__PURE__ */ I(Yt({
		size: 16,
		snap: !0
	})), g = /* @__PURE__ */ I(!0), _ = /* @__PURE__ */ I("desktop"), v = /* @__PURE__ */ I(0);
	function y() {
		L(v, x?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function b(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, y(), C?.sendAttention(e.id, !0));
	}
	let x = null, S = null, C = null, w = /* @__PURE__ */ I(null);
	function ee() {
		L(w, S.data, !0), S.replace(W(w));
	}
	function te() {
		C?.sendSite(Fe(W(w)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => W(w).pages.find((e) => e.id === W(o));
	function T() {
		let e = W(w)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		L(s, e || x?.hasDraft() && !ne.has(W(o)) || S?.hasDraft() || !1, !0);
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
		x.replace(t), S.replace(n), ee(), x.save(), S.save(), L(h, {
			snap: !0,
			...W(w).grid
		}, !0), T(), y(), te(), W(w).pages.some((e) => e.id === W(o)) ? C?.sendPage(W(o), x.data) : bt(W(w).pages[0].id);
	}
	function le() {
		ie.length && (ae.push(se()), ce(ie.pop()), oe = null, d("Angret"));
	}
	function ue() {
		ae.length && (ie.push(se()), ce(ae.pop()), oe = null, d("Gjentatt"));
	}
	function de(e) {
		if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
		let t = e.target;
		t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range"
		].includes(t.type)) || (e.preventDefault(), e.shiftKey ? ue() : le());
	}
	async function fe() {
		L(a, ui(await (await fetch("/content/site.json")).json()), !0), S = ii("urd-draft-site", () => W(a)), S.replace(ui(S.data)), S.save(), ee(), L(h, {
			snap: !0,
			...W(w).grid
		}, !0), await bt(new URLSearchParams(location.search).get("page") ?? W(w).pages[0].id), await ot(), ct(), W(w).site.title === "Min forening" && !localStorage.getItem("urd-setup-done") && (L(me, W(w).site.title, !0), L(he, W(w).theme.tokens.color.accent, !0), L(ge, W(w).theme.tokens.color.bg, !0), L(pe, !0));
	}
	let pe = /* @__PURE__ */ I(!1), me = /* @__PURE__ */ I(""), he = /* @__PURE__ */ I("#7c5cff"), ge = /* @__PURE__ */ I("#0b0e14");
	function _e() {
		localStorage.setItem("urd-setup-done", "1"), L(pe, !1);
	}
	function ve() {
		let e = W(me).trim();
		e && (F("setup", () => {
			W(w).site.title = e, W(w).nav.logo = {
				type: "text",
				value: e
			}, W(w).theme.tokens.color.accent = W(he), W(w).theme.tokens.color.bg = W(ge);
		}), _e(), d("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let D = /* @__PURE__ */ I(null), ye = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Footer",
		"Grid",
		"Historikk"
	];
	function be(e) {
		L(D, W(D) === e ? null : e, !0), C?.sendShowGrid(W(D) === "Grid"), W(D) === "Historikk" && pt();
	}
	let O = /* @__PURE__ */ I(null);
	function xe(e, t) {
		let n = x?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Se() {
		if (!W(O)) return;
		let { block: e } = xe(W(O).sectionId, W(O).blockId);
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
	function Ce(e) {
		if (!e.blockId) {
			L(O, null);
			return;
		}
		L(O, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), Se();
	}
	function we(e, t) {
		let { section: n, block: r } = xe(W(O)?.sectionId, W(O)?.blockId);
		r && (E(e), t(r, n), b(n, "blokk-endret"), x.save(), T(), C?.sendSection(W(o), n), Se());
	}
	function Te(e, t) {
		we(`edit:${W(O).blockId}`, (n) => {
			n.props[e] = t;
		});
	}
	function k(e, t) {
		Number.isFinite(t) && we(`edit:frame-${W(O).blockId}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Ee(e) {
		we("decor", (t) => {
			t.decor = e;
		});
	}
	async function A(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await wi(t);
			we(`edit:${W(O).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Ti(t.name).replaceAll("-", " ");
			});
		} catch {
			d("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let De = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon"
	}, Oe = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], ke = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], Ae = /* @__PURE__ */ I(null), je = /* @__PURE__ */ I(null), Me = /* @__PURE__ */ I(""), Ne = /* @__PURE__ */ I(Yt([])), Pe = /* @__PURE__ */ I(null);
	function Ie(e) {
		L(je, e?.grid ? { ...e.grid } : null, !0), L(Me, e?.size?.minHeight ?? "", !0), L(Ne, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), L(Pe, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Le(e) {
		L(Ae, e.sectionId, !0), Ie(x?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Re(e, t) {
		let n = x.data.sections.find((e) => e.id === W(Ae));
		n && (E(e), t(n), x.save(), T(), C?.sendSection(W(o), n), Ie(n));
	}
	let Ve = /* @__PURE__ */ I("color");
	function He(e) {
		Re("bg", (t) => {
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
	function Ue(e) {
		Re("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function We(e, t) {
		let n = e + t;
		Re("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function Ge(e, t, n) {
		Re(`edit:bg-${W(Ae)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Ke(e, t, n) {
		Re(`edit:bg-${W(Ae)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	function qe(e, t) {
		Re("bg", (n) => {
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
			Ge(e, "src", (await wi(n)).dataUrl);
		} catch {
			d("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function N(e) {
		return typeof e == "string" ? e.startsWith("#") ? e : W(w)?.theme.tokens.color[e] ?? "#000000" : "#000000";
	}
	function Ye(e) {
		return {
			type: e,
			version: bi[e].version,
			props: bi[e].defaults()
		};
	}
	function Xe(e) {
		we(`edit:anim-${W(O).blockId}`, (t) => {
			t.animation = e ? Ye(e) : null;
		}), W(O) && C?.sendDemoAnim(W(O).sectionId, W(O).blockId);
	}
	function Ze(e, t) {
		Number.isFinite(t) && (we(`edit:anim-${W(O).blockId}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(O) && C?.sendDemoAnim(W(O).sectionId, W(O).blockId));
	}
	function $e(e) {
		Re("section-anim", (t) => {
			t.animation = e ? Ye(e) : null;
		}), C?.sendDemoAnim(W(Ae));
	}
	function et(e, t) {
		Number.isFinite(t) && (Re("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), C?.sendDemoAnim(W(Ae)));
	}
	function tt(e) {
		let t = x.data.sections.find((e) => e.id === W(Ae));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		E("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, L(Me, r, !0), x.save(), T(), C?.sendSection(W(o), t);
	}
	function nt() {
		return x.data.sections.find((e) => e.id === W(Ae)) ?? x.data.sections[0];
	}
	function rt(e) {
		let t = x.data.sections.find((e) => e.id === W(Ae));
		t && (E("grid"), t.grid = e ? { ...S.data.grid } : null, L(je, t.grid ? { ...t.grid } : null, !0), x.save(), T(), C?.sendSection(W(o), t), W(D) === "Grid" && C?.sendShowGrid(!0));
	}
	function it(e, t) {
		let n = x.data.sections.find((e) => e.id === W(Ae));
		n?.grid && (E("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, L(je, { ...n.grid }, !0), x.save(), T(), C?.sendSection(W(o), n), W(D) === "Grid" && C?.sendShowGrid(!0));
	}
	function at(e, t) {
		E("grid"), L(h, {
			...W(h),
			[e]: t
		}, !0), S.data.grid = {
			...S.data.grid,
			[e]: t
		}, S.save(), T(), te(), W(D) === "Grid" && C?.sendShowGrid(!0);
	}
	async function ot() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? L(p, await e.json(), !0) : e.status !== 503 && L(p, null);
		} catch {
			L(p, null);
		}
	}
	let st = null;
	async function ct() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (st = (await e.json()).head ?? null);
		} catch {}
	}
	async function lt(e) {
		if (!st) return ct(), {
			ok: !0,
			head: null
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${st}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === st) return {
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
	let ut = /* @__PURE__ */ I(null), dt = /* @__PURE__ */ I(""), ft = /* @__PURE__ */ I(!1);
	async function pt() {
		L(dt, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? L(ut, (await e.json()).commits, !0) : e.status === 401 ? (L(ut, [], !0), L(dt, "Logg inn med GitHub for å se historikken.")) : (L(ut, [], !0), L(dt, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			L(ut, [], !0), L(dt, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let ht = new Intl.DateTimeFormat("nb-NO", {
		dateStyle: "short",
		timeStyle: "short"
	}), gt = !1;
	async function _t() {
		let e = W(ut)?.[0];
		if (!(!e || W(ft)) && confirm(`Angre siste publisering («${e.message}»)?\n\nEn ny commit gjenoppretter innholdet slik det var før den - ingenting slettes fra historikken.`)) {
			L(ft, !0), d("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? st = e : ct(), gt = !0, d("✓ Angret! Last admin på nytt om ~1 min for å redigere videre på den gjenopprettede versjonen", "ok");
				} else t.status === 409 ? d("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : d((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				d("Kunne ikke nå publiseringslaget", "error");
			}
			L(ft, !1), pt();
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
		L(o, e, !0), vt = (async () => {
			let t = re(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = di(await e.json(), S.data));
			} catch {}
			n ? ne.delete(e) : n = yt(t), x = ii(`urd-draft-${e}`, () => n), x.replace(di(x.data, S.data)), x.save(), ie.length = 0, ae.length = 0, oe = null, L(Ae, null), L(je, null), T(), y(), L(c, "");
		})(), await vt;
	}
	function xt() {
		C?.destroy(), C = ai(W(f), {
			onEdit: Jt,
			onMove: Xt,
			onDelete: sn,
			onAddSection: nn,
			onMoveSection: rn,
			onDeleteSection: an,
			onSectionSize: on,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: Le,
			onSelectBlock: Ce,
			onReady: P,
			onNavigate: St,
			onAddBlock: (e) => dn(e.sectionId, e.block),
			onRequestBlock: pn,
			onMobileManual: Zt,
			onMobileAuto: $t,
			onReviewDone: en,
			onBlockFlag: tn
		});
	}
	async function P() {
		await vt, S.hasDraft() && te();
		let e = !W(a).pages.some((e) => e.id === W(o));
		(x.hasDraft() || e) && C?.sendPage(W(o), x.data), W(g) || C?.sendChrome(!1), W(D) === "Grid" && C?.sendShowGrid(!0);
	}
	function St(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(w).pages.find((e) => e.path === t);
		n && n.id !== W(o) && bt(n.id);
	}
	function F(e, t) {
		E(e), t(), S.save(), T(), te();
	}
	let Ct = /* @__PURE__ */ I(""), wt = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function Tt(e, t = null) {
		return e ? wt.includes(e) ? `«${e}» er et reservert navn` : W(w).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function Et() {
		let e = W(Ct).trim(), t = Ti(e), n = Tt(t);
		if (n) {
			d(n, "error");
			return;
		}
		F("pages", () => {
			W(w).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(w).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(yt({
			id: t,
			title: e
		}))), T(), L(Ct, ""), bt(t);
	}
	function Dt(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		F("pages", () => {
			e.title = n;
			for (let t of W(w).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(o) ? (x.data.meta.title = n, x.save(), T()) : Ot(e, (e) => {
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
			t.ok && (r = di(await t.json(), S.data));
		} catch {}
		r ||= yt(e), t(r), localStorage.setItem(n, JSON.stringify(r)), T();
	}
	function kt(e, t) {
		let n = Ti(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Tt(n, e.id);
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
			W(w).pages = W(w).pages.filter((t) => t.id !== e.id), W(w).nav.items = W(w).nav.items.filter((t) => t.page !== e.id);
		}), e.id === W(o) && bt(W(w).pages[0].id), d("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function jt(e) {
		F("edit:nav-logo", () => {
			W(w).nav.logo = {
				type: "text",
				value: "",
				...W(w).nav.logo,
				...e
			};
		});
	}
	function Mt(e) {
		F("nav", () => {
			W(w).nav.logo ??= {
				type: "text",
				value: W(w).site.title
			};
			let t = W(w).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = W(w).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = W(w).site.title), delete t.image), t.type = e;
		});
	}
	async function Nt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await wi(t);
			F("nav", () => {
				let t = W(w).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			d("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function Pt(e) {
		F("nav", () => {
			W(w).nav.layout = e;
		});
	}
	function Ft(e, t) {
		F(`edit:nav-style-${e}`, () => {
			W(w).nav.style ??= {}, W(w).nav.style[e] = t;
		});
	}
	function It(e, t) {
		F(e, () => {
			W(w).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(W(w).footer);
		});
	}
	function Lt(e, t) {
		F(`edit:nav-label-${e}`, () => {
			W(w).nav.items[e].label = t;
		});
	}
	function Rt(e, t) {
		F("nav", () => {
			let n = W(w).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function zt(e, t) {
		F(`edit:nav-href-${e}`, () => {
			W(w).nav.items[e].href = t;
		});
	}
	function Bt(e, t) {
		let n = e + t, r = W(w).nav.items;
		n < 0 || n >= r.length || F("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Vt(e) {
		F("nav", () => {
			W(w).nav.items.splice(e, 1);
		});
	}
	function Ht() {
		F("nav", () => {
			W(w).nav.items.push({
				label: "Lenke",
				page: W(w).pages[0].id
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
			W(w).theme.tokens.color[e] = t;
		});
	}
	function Gt(e, t) {
		F("theme", () => {
			W(w).theme.tokens.font[e] = t;
		});
	}
	function Kt(e, t) {
		F("theme", () => {
			W(w).theme.tokens.radius[e] = t;
		});
	}
	function qt() {
		L(g, !W(g)), C?.sendChrome(W(g));
	}
	function Jt(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E(`edit:${e.blockId}`), t.props = e.props, x.save(), T(), W(O)?.blockId === e.blockId && Se(), L(c, ""));
	}
	function Xt(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		E(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && b(t, "desktop-endret-etter-mobil"), x.save(), T(), W(O)?.blockId === e.blockId && Se();
	}
	function Zt(e) {
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
	function $t(e) {
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
			}, x.save(), T(), y(), C?.sendSection(W(o), t);
		}
	}
	function en(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (E("review-done"), t.responsive.mobile.attention = null, x.save(), T(), y());
	}
	function tn(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (E("decor"), t.decor = e.decor, x.save(), T(), W(O)?.blockId === e.blockId && Se());
	}
	function nn(e) {
		E("add-section"), x.data.sections.splice(e.index, 0, e.section), x.save(), T(), C?.sendPage(W(o), x.data), L(Ae, e.section.id, !0), Ie(e.section), W(D) !== "Egenskaper" && (L(D, "Egenskaper"), C?.sendShowGrid(!1));
	}
	function rn(e) {
		let t = x.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (E("move-section"), [t[n], t[r]] = [t[r], t[n]], x.save(), T(), C?.sendPage(W(o), x.data));
	}
	function an(e) {
		E("delete-section"), e.sectionId === W(Ae) && (L(Ae, null), L(je, null)), x.data.sections = x.data.sections.filter((t) => t.id !== e.sectionId), x.save(), T(), C?.sendPage(W(o), x.data);
	}
	function on(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId);
		t && (E("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === W(Ae) && L(Me, e.minHeight, !0), x.save(), T());
	}
	function sn(e) {
		let t = x.data.sections.find((t) => t.id === e.sectionId);
		t && (E("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), W(O)?.blockId === e.blockId && L(O, null), b(t, "blokk-slettet"), x.save(), T(), C?.sendSection(W(o), t));
	}
	let cn = {
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
	function ln(e) {
		let t = cn[e];
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
	function un(e) {
		C ? C.sendPlaceBlock(e) : dn(nt()?.id, e);
	}
	function dn(e, t) {
		let n = x.data.sections.find((t) => t.id === e) ?? x.data.sections[0];
		n && (E("add-block"), n.blocks.push(t), b(n, "blokk-lagt-til"), x.save(), T(), C?.sendSection(W(o), n));
	}
	function fn(e) {
		un(ln(e));
	}
	function pn(e) {
		let t = ln(e.kind);
		t && (t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40, dn(e.sectionId, t), e.kind === "image" && d("Bildeblokk lagt til - velg bildet i Egenskaper"));
	}
	async function mn(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		d("Komprimerer bildet…");
		let n;
		try {
			n = await wi(t);
		} catch {
			d("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(f)?.clientWidth ?? 1280));
		un({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Ti(t.name).replaceAll("-", " "),
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
	function hn(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Ti(n || "bilde")}-${Ei(a)}.webp`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function gn(e) {
		let t = [];
		for (let n of e.sections) {
			for (let e of n.background?.layers ?? []) e.type === "image" && hn(e.props, "src", "bakgrunn", t);
			for (let e of n.blocks) e.type === "image" && hn(e.props, "src", e.props.alt, t);
		}
		return t;
	}
	function _n(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && hn(n, "value", "logo", t), n?.type === "both" && hn(n, "image", "logo", t), t;
	}
	function vn() {
		E("discard");
		let e = x.reset();
		S.reset(), ee(), L(h, {
			snap: !0,
			...W(w).grid
		}, !0), T(), L(c, ""), te(), W(w).pages.some((e) => e.id === W(o)) ? C?.sendPage(W(o), e) : bt(W(w).pages[0].id);
	}
	async function yn() {
		if (gt) {
			d("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		d("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of W(w).pages) {
			let s = `urd-draft-${i.id}`, c = ne.has(i.id) || !W(a).pages.some((e) => e.id === i.id), l = null;
			if (i.id === W(o) && (x.hasDraft() || c)) l = x.data;
			else if (i.id !== W(o)) {
				let e = localStorage.getItem(s);
				if (e) try {
					l = di(JSON.parse(e), S.data);
				} catch {}
			}
			if (!l && c && (l = yt(i)), !l) continue;
			let u = JSON.parse(JSON.stringify(l));
			e.push(...gn(u)), e.push({
				path: i.file,
				content: JSON.stringify(u, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), c ? r.push(i.id) : n.push(s);
		}
		if (S.hasDraft()) {
			let t = JSON.parse(JSON.stringify(W(w)));
			e.push(..._n(t)), e.push({
				path: "content/site.json",
				content: JSON.stringify(t, null, 2) + "\n",
				encoding: "utf-8"
			}), n.push("urd-draft-site");
		}
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of W(w).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		for (let t of W(a).pages) {
			let n = W(w).pages.find((e) => e.id === t.id);
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
		let i = await lt(e);
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
			e ? st = e : ct(), gn(x.data), _n(W(w));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			L(a, JSON.parse(JSON.stringify(W(w))), !0), S = ii("urd-draft-site", () => W(a)), ee(), L(h, {
				snap: !0,
				...W(w).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(x.data));
			x = ii(`urd-draft-${W(o)}`, () => t), ne.has(W(o)) && localStorage.setItem(`urd-draft-${W(o)}`, JSON.stringify(t)), T(), d("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (c?.status === 401) {
			let e = (await c.json().catch(() => null))?.error;
			d(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await ot();
		} else c?.status === 403 ? d((await c.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c?.status === 409 ? d("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : d(c ? (await c.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var bn = Na();
	mr("keydown", Qt, de);
	var xn = R(bn), Sn = (e) => {
		var t = Di();
		Rr(R(t), () => i.pencil), M(), j(t), G("click", t, qt), q(e, t);
	};
	Y(xn, (e) => {
		W(g) || e(Sn);
	});
	var Cn = B(xn, 2);
	let wn;
	var Tn = R(Cn), En = B(R(Tn), 2), Dn = (e) => {
		var t = ki(), n = z(t);
		Mr(n, 21, () => W(w).pages, (e) => e.id, (e, t) => {
			var n = Oi(), r = R(n, !0);
			j(n);
			var i = {};
			V(() => {
				J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
			}), q(e, n);
		}), j(n);
		var r;
		Z(n);
		var a = B(n, 2), s = R(a);
		let c;
		Rr(s, () => i.desktop, !0), j(s);
		var l = B(s, 2);
		let u;
		Rr(l, () => i.phone, !0), j(l), j(a), V(() => {
			r !== (r = W(o)) && (n.value = (n.__value = W(o)) ?? "", X(n, W(o))), c = Vr(s, 1, "ghost svelte-1n46o8q", null, c, { active: W(_) === "desktop" }), u = Vr(l, 1, "ghost svelte-1n46o8q", null, u, { active: W(_) === "mobile" });
		}), G("change", n, (e) => bt(e.target.value)), G("click", s, () => L(_, "desktop")), G("click", l, () => L(_, "mobile")), q(e, t);
	};
	Y(En, (e) => {
		W(a) && e(Dn);
	});
	var On = B(En, 2), kn = (e) => {
		var t = Ai(), n = R(t);
		Rr(n, () => i.phone);
		var r = B(n);
		j(t), V(() => J(r, ` ${W(v) ?? ""} ${W(v) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => L(_, "mobile")), q(e, t);
	};
	Y(On, (e) => {
		W(v) > 0 && e(kn);
	});
	var An = B(On, 2), jn = (e) => {
		q(e, ji());
	};
	Y(An, (e) => {
		W(s) && e(jn);
	}), j(Tn);
	var Mn = B(Tn, 2), Nn = R(Mn), Pn = (e) => {
		var t = Ii(), n = z(t), r = R(n), a = (e) => {
			var t = Mi();
			Rr(z(t), () => i.eye), M(), q(e, t);
		}, o = (e) => {
			var t = Ni();
			Rr(z(t), () => i.pencil), M(), q(e, t);
		};
		Y(r, (e) => {
			W(g) ? e(a) : e(o, -1);
		}), j(n);
		var c = B(n, 2), l = (e) => {
			var t = Pi(), n = R(t), r = (e) => {
				var t = Sr();
				Rr(z(t), () => i.warn), q(e, t);
			};
			Y(n, (e) => {
				W(p).allowed || e(r);
			});
			var a = B(n, 1, !0);
			j(t), V(() => {
				Yr(t, "title", W(p).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(a, W(p).login);
			}), q(e, t);
		}, u = (e) => {
			q(e, Fi());
		};
		Y(c, (e) => {
			W(p)?.loggedIn ? e(l) : W(p) && e(u, 1);
		});
		var d = B(c, 2), f = B(d, 2), m = B(f, 2);
		V((e) => {
			Yr(n, "title", W(g) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), Yr(d, "href", e), f.disabled = !W(s), m.disabled = !W(s);
		}, [() => re().path]), G("click", n, qt), G("click", f, vn), G("click", m, yn), q(e, t);
	};
	Y(Nn, (e) => {
		W(a) && e(Pn);
	}), j(Mn), j(Cn);
	var Fn = B(Cn, 2), In = (e) => {
		var t = ka(), r = R(t), i = (e) => {
			var t = Oa(), r = z(t);
			Mr(r, 21, () => ye, Or, (e, t) => {
				var n = Li();
				let r;
				var i = R(n, !0);
				j(n), V(() => {
					r = Vr(n, 1, "svelte-1n46o8q", null, r, { active: W(D) === W(t) }), J(i, W(t));
				}), G("click", n, () => be(W(t))), q(e, n);
			}), j(r);
			var i = B(r, 2), a = (e) => {
				var t = Da(), r = R(t), i = R(r, !0);
				j(r);
				var a = B(r, 2), s = (e) => {
					var t = Hi(), n = B(R(t), 2);
					Mr(n, 17, () => W(w).pages, (e) => e.id, (e, t) => {
						var n = Vi();
						let r;
						var i = R(n);
						Q(i);
						var a = B(i, 2), s = (e) => {
							q(e, Ri());
						}, c = (e) => {
							var n = zi();
							Q(n), V((e) => $(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => kt(W(t), e.target.value)), q(e, n);
						};
						Y(a, (e) => {
							W(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = B(a, 2), u = R(l), d = B(u, 2), f = (e) => {
							var n = Bi();
							G("click", n, () => At(W(t))), q(e, n);
						};
						Y(d, (e) => {
							W(t).path !== "/" && e(f);
						}), j(l), j(n), V(() => {
							r = Vr(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(o) }), $(i, W(t).title), u.disabled = W(t).id === W(o);
						}), G("change", i, (e) => Dt(W(t), e.target.value)), G("click", u, () => bt(W(t).id)), q(e, n);
					});
					var r = B(n, 4);
					Q(r);
					var i = B(r, 2);
					M(2), j(t), V((e) => i.disabled = e, [() => !W(Ct).trim()]), G("keydown", r, (e) => e.key === "Enter" && Et()), $r(r, () => W(Ct), (e) => L(Ct, e)), G("click", i, Et), q(e, t);
				}, c = (e) => {
					var t = Ji(), n = B(R(t), 2), r = B(R(n), 2), i = R(r), a = B(R(i)), o = R(a);
					o.value = o.__value = "text";
					var s = B(o);
					s.value = s.__value = "image";
					var c = B(s);
					c.value = c.__value = "both", j(a);
					var l;
					Z(a), j(i);
					var u = B(i, 2), d = (e) => {
						var t = Ui(), n = z(t);
						Q(n);
						var r = B(n, 2), i = R(r), a = R(i);
						a.value = a.__value = "", Mr(B(a), 17, () => Ut, ([e, t]) => t, (e, t) => {
							var n = /* @__PURE__ */ mt(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Oi(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
							}), q(e, a);
						}), j(i);
						var o;
						Z(i);
						var s = B(i, 2);
						Q(s);
						var c = B(s, 2);
						let l;
						var u = B(c, 2);
						let d;
						j(r), V((e) => {
							$(n, W(w).nav.logo?.value ?? ""), o !== (o = W(w).nav.logo?.font ?? "") && (i.value = (i.__value = W(w).nav.logo?.font ?? "") ?? "", X(i, W(w).nav.logo?.font ?? "")), $(s, W(w).nav.logo?.textSize ?? ""), l = Vr(c, 1, "tbtn svelte-1n46o8q", null, l, { active: W(w).nav.logo?.bold !== !1 }), d = Vr(u, 1, "tbtn svelte-1n46o8q", null, d, e);
						}, [() => ({ active: !!W(w).nav.logo?.italic })]), G("input", n, (e) => jt({ value: e.target.value })), G("change", i, (e) => jt({ font: e.target.value || void 0 })), G("change", s, (e) => jt({ textSize: e.target.value ? Number(e.target.value) : void 0 })), G("click", c, () => jt({ bold: W(w).nav.logo?.bold === !1 })), G("click", u, () => jt({ italic: !W(w).nav.logo?.italic })), q(e, t);
					};
					Y(u, (e) => {
						(W(w).nav.logo?.type ?? "text") !== "image" && e(d);
					});
					var f = B(u, 2), p = (e) => {
						var t = Wi(), n = z(t), r = R(n), i = R(r), a = B(i);
						j(r);
						var o = B(r, 2);
						Q(o);
						var s = B(o, 2);
						Q(s), j(n), M(2), V(() => {
							J(i, `${(W(w).nav.logo?.type === "image" ? W(w).nav.logo?.value : W(w).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), $(o, W(w).nav.logo?.size ?? 32), $(s, W(w).nav.logo?.radius ?? 0);
						}), G("change", a, Nt), G("change", o, (e) => jt({ size: Number(e.target.value) })), G("change", s, (e) => jt({ radius: Number(e.target.value) })), q(e, t);
					};
					Y(f, (e) => {
						(W(w).nav.logo?.type ?? "text") !== "text" && e(p);
					});
					var h = B(f, 2), g = (e) => {
						var t = Gi(), n = B(R(t)), r = R(n);
						r.value = r.__value = "image-first";
						var i = B(r);
						i.value = i.__value = "text-first", j(n);
						var a;
						Z(n), j(t), V(() => {
							a !== (a = W(w).nav.logo?.order ?? "image-first") && (n.value = (n.__value = W(w).nav.logo?.order ?? "image-first") ?? "", X(n, W(w).nav.logo?.order ?? "image-first"));
						}), G("change", n, (e) => jt({ order: e.target.value })), q(e, t);
					};
					Y(h, (e) => {
						W(w).nav.logo?.type === "both" && e(g);
					}), M(2), j(r), j(n);
					var _ = B(n, 2), v = B(R(_), 2), y = R(v), b = B(R(y));
					Q(b), j(y);
					var x = B(y, 2), S = B(R(x)), C = R(S);
					j(S), j(x);
					var ee = B(x, 2);
					Q(ee);
					var te = B(ee, 2), ne = R(te);
					Q(ne), M(), j(te);
					var re = B(te, 2), T = B(R(re));
					Q(T), j(re);
					var ie = B(re, 2), ae = B(R(ie)), oe = R(ae);
					oe.value = oe.__value = "right";
					var se = B(oe);
					se.value = se.__value = "center";
					var E = B(se);
					E.value = E.__value = "left", j(ae);
					var ce;
					Z(ae), j(ie);
					var le = B(ie, 2), ue = R(le);
					Q(ue), M(), j(le), M(2), j(v), j(_);
					var de = B(_, 2), fe = B(R(de), 2), pe = R(fe);
					Mr(pe, 17, () => W(w).nav.items, Or, (e, t, n) => {
						var r = qi(), i = R(r);
						Q(i);
						var a = B(i, 2), o = R(a);
						o.disabled = n === 0;
						var s = B(o, 2), c = B(s, 2);
						j(a);
						var l = B(a, 2), u = R(l);
						Mr(u, 17, () => W(w).pages, (e) => e.id, (e, t) => {
							var n = Oi(), r = R(n, !0);
							j(n);
							var i = {};
							V(() => {
								J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
							}), q(e, n);
						});
						var d = B(u);
						d.value = d.__value = "__href", j(l);
						var f;
						Z(l);
						var p = B(l, 2), m = (e) => {
							var r = Ki();
							Q(r), V(() => $(r, W(t).href ?? "")), G("change", r, (e) => zt(n, e.target.value)), q(e, r);
						};
						Y(p, (e) => {
							W(t).page || e(m);
						}), j(r), V(() => {
							$(i, W(t).label), s.disabled = n === W(w).nav.items.length - 1, f !== (f = W(t).page ?? "__href") && (l.value = (l.__value = W(t).page ?? "__href") ?? "", X(l, W(t).page ?? "__href"));
						}), G("input", i, (e) => Lt(n, e.target.value)), G("click", o, () => Bt(n, -1)), G("click", s, () => Bt(n, 1)), G("click", c, () => Vt(n)), G("change", l, (e) => Rt(n, e.target.value)), q(e, r);
					});
					var me = B(pe, 2);
					j(fe), j(de), j(t), V((e, t, n) => {
						l !== (l = W(w).nav.logo?.type ?? "text") && (a.value = (a.__value = W(w).nav.logo?.type ?? "text") ?? "", X(a, W(w).nav.logo?.type ?? "text")), $(b, e), J(C, `${t ?? ""}%`), $(ee, W(w).nav.style?.bgOpacity ?? .85), Jr(ne, W(w).nav.style?.blur !== !1), $(T, n), ce !== (ce = W(w).nav.layout ?? "right") && (ae.value = (ae.__value = W(w).nav.layout ?? "right") ?? "", X(ae, W(w).nav.layout ?? "right")), Jr(ue, W(w).nav.sticky !== !1);
					}, [
						() => N(W(w).nav.style?.bg ?? "surface"),
						() => Math.round((W(w).nav.style?.bgOpacity ?? .85) * 100),
						() => N(W(w).nav.style?.textColor ?? "text")
					]), G("change", a, (e) => Mt(e.target.value)), G("input", b, (e) => Ft("bg", e.target.value)), G("input", ee, (e) => Ft("bgOpacity", Number(e.target.value))), G("change", ne, (e) => Ft("blur", e.target.checked)), G("input", T, (e) => Ft("textColor", e.target.value)), G("change", ae, (e) => Pt(e.target.value)), G("change", ue, (e) => F("nav", () => {
						W(w).nav.sticky = e.target.checked;
					})), G("click", me, Ht), q(e, t);
				}, l = (e) => {
					var t = Xi(), n = B(R(t), 2), r = B(R(n));
					Q(r), j(n);
					var i = B(n, 2), a = B(R(i));
					Q(a), j(i);
					var o = B(i, 2), s = B(R(o));
					Q(s), j(o);
					var c = B(o, 2), l = B(R(c));
					Q(l), j(c);
					var u = B(c, 4), d = B(R(u)), f = R(d), p = (e) => {
						var t = Yi(), n = {};
						V(() => {
							n !== (n = W(w).theme.tokens.font.heading) && (t.value = (t.__value = W(w).theme.tokens.font.heading) ?? "");
						}), q(e, t);
					}, h = /* @__PURE__ */ mt(() => !Ut.some(([, e]) => e === W(w).theme.tokens.font.heading));
					Y(f, (e) => {
						W(h) && e(p);
					}), Mr(B(f), 17, () => Ut, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ mt(() => m(W(t), 2));
						let r = () => W(n)[0], i = () => W(n)[1];
						var a = Oi(), o = R(a, !0);
						j(a);
						var s = {};
						V(() => {
							J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), q(e, a);
					}), j(d);
					var g;
					Z(d), j(u);
					var _ = B(u, 2), v = B(R(_)), y = R(v), b = (e) => {
						var t = Yi(), n = {};
						V(() => {
							n !== (n = W(w).theme.tokens.font.body) && (t.value = (t.__value = W(w).theme.tokens.font.body) ?? "");
						}), q(e, t);
					}, x = /* @__PURE__ */ mt(() => !Ut.some(([, e]) => e === W(w).theme.tokens.font.body));
					Y(y, (e) => {
						W(x) && e(b);
					}), Mr(B(y), 17, () => Ut, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ mt(() => m(W(t), 2));
						let r = () => W(n)[0], i = () => W(n)[1];
						var a = Oi(), o = R(a, !0);
						j(a);
						var s = {};
						V(() => {
							J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), q(e, a);
					}), j(v);
					var S;
					Z(v), j(_);
					var C = B(_, 4), ee = B(R(C));
					Q(ee), j(C);
					var te = B(C, 2), ne = B(R(te));
					Q(ne), j(te), j(t), V(() => {
						$(r, W(w).theme.tokens.color.bg), $(a, W(w).theme.tokens.color.surface), $(s, W(w).theme.tokens.color.text), $(l, W(w).theme.tokens.color.accent), g !== (g = W(w).theme.tokens.font.heading) && (d.value = (d.__value = W(w).theme.tokens.font.heading) ?? "", X(d, W(w).theme.tokens.font.heading)), S !== (S = W(w).theme.tokens.font.body) && (v.value = (v.__value = W(w).theme.tokens.font.body) ?? "", X(v, W(w).theme.tokens.font.body)), $(ee, W(w).theme.tokens.radius.sm), $(ne, W(w).theme.tokens.radius.md);
					}), G("input", r, (e) => Wt("bg", e.target.value)), G("input", a, (e) => Wt("surface", e.target.value)), G("input", s, (e) => Wt("text", e.target.value)), G("input", l, (e) => Wt("accent", e.target.value)), G("change", d, (e) => Gt("heading", e.target.value)), G("change", v, (e) => Gt("body", e.target.value)), G("change", ee, (e) => Kt("sm", e.target.value)), G("change", ne, (e) => Kt("md", e.target.value)), q(e, t);
				}, u = (e) => {
					var t = Zi();
					let n;
					var r = B(R(t), 2), i = B(R(r), 2), a = R(i), o = B(a, 2);
					j(i), j(r);
					var s = B(r, 2), c = B(s, 2), l = B(R(c));
					j(c);
					var u = B(c, 2), d = B(u, 2), f = B(d, 2), p = B(R(f), 2), m = R(p), h = B(m, 2), g = B(h, 2), v = B(g, 2), y = B(v, 2);
					j(p), j(f), j(t), V(() => {
						n = Vr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(_) === "mobile" }), Yr(t, "title", W(_) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => fn("text")), G("click", o, () => fn("text-box")), G("click", s, () => fn("button")), G("change", l, mn), G("click", u, () => fn("video")), G("click", d, () => fn("icon")), G("click", m, () => fn("shape-line")), G("click", h, () => fn("shape-arrow")), G("click", g, () => fn("shape-circle")), G("click", v, () => fn("shape-rect")), G("click", y, () => fn("shape-triangle")), q(e, t);
				}, d = (e) => {
					var t = Qi(), n = B(R(t), 2), r = B(R(n)), i = R(r);
					j(r), j(n);
					var a = B(n, 2);
					Q(a);
					var o = B(a, 2), s = R(o);
					Q(s), M(), j(o), M(2), j(t), V(() => {
						J(i, `${W(h).size ?? ""} px`), $(a, W(h).size), Jr(s, W(h).snap !== !1);
					}), G("input", a, (e) => at("size", Number(e.target.value))), G("change", s, (e) => at("snap", e.target.checked)), q(e, t);
				}, f = (e) => {
					var t = ya(), r = R(t), i = (e) => {
						var t = ca(), n = z(t), r = R(n);
						j(n);
						var i = B(n, 2), a = (e) => {
							var t = $i(), n = R(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i);
							var o = B(i, 2), s = B(R(o));
							Q(s), j(o);
							var c = B(o, 2), l = B(R(c));
							Q(l), j(c);
							var u = B(c, 2), d = B(R(u));
							Q(d), j(u);
							var f = B(u, 2), p = B(R(f));
							Q(p), j(f), j(t), V(() => {
								$(r, W(O).frame.x), $(a, W(O).frame.y), $(s, W(O).frame.w), $(l, W(O).frame.h), $(d, W(O).frame.z ?? 1), $(p, W(O).frame.rot ?? 0);
							}), G("change", r, (e) => k("x", Number(e.target.value))), G("change", a, (e) => k("y", Number(e.target.value))), G("change", s, (e) => k("w", Number(e.target.value))), G("change", l, (e) => k("h", Number(e.target.value))), G("change", d, (e) => k("z", Number(e.target.value))), G("change", p, (e) => k("rot", Number(e.target.value))), q(e, t);
						};
						Y(i, (e) => {
							W(_) === "desktop" && e(a);
						});
						var o = B(i, 2), s = R(o);
						Q(s), M(), j(o);
						var c = B(o, 4), l = (e) => {
							var t = ea(), n = z(t), r = B(R(n)), i = R(r);
							i.value = i.__value = "left";
							var a = B(i);
							a.value = a.__value = "center";
							var o = B(a);
							o.value = o.__value = "right", j(r);
							var s;
							Z(r), j(n);
							var c = B(n, 2), l = R(c);
							Q(l), M(), j(c);
							var u = B(c, 2), d = B(R(u)), f = R(d);
							f.value = f.__value = "", Mr(B(f), 17, () => Ut, ([e, t]) => t, (e, t) => {
								var n = /* @__PURE__ */ mt(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Oi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
								}), q(e, a);
							}), j(d);
							var p;
							Z(d), j(u);
							var h = B(u, 2), g = B(R(h));
							Q(g), j(h), M(2), V((e) => {
								s !== (s = W(O).props.align ?? "left") && (r.value = (r.__value = W(O).props.align ?? "left") ?? "", X(r, W(O).props.align ?? "left")), Jr(l, e), p !== (p = W(O).props.font ?? "") && (d.value = (d.__value = W(O).props.font ?? "") ?? "", X(d, W(O).props.font ?? "")), $(g, W(O).props.size ?? "");
							}, [() => !!W(O).props.box]), G("change", r, (e) => Te("align", e.target.value)), G("change", l, (e) => Te("box", e.target.checked)), G("change", d, (e) => Te("font", e.target.value || null)), G("change", g, (e) => Te("size", e.target.value ? Number(e.target.value) : null)), q(e, t);
						}, u = (e) => {
							var t = na(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i)), o = R(a);
							Mr(o, 17, () => W(w).pages, (e) => e.id, (e, t) => {
								var n = Oi(), r = R(n, !0);
								j(n);
								var i = {};
								V(() => {
									J(r, W(t).title), i !== (i = W(t).id) && (n.value = (n.__value = W(t).id) ?? "");
								}), q(e, n);
							});
							var s = B(o);
							s.value = s.__value = "__href", j(a);
							var c;
							Z(a), j(i);
							var l = B(i, 2), u = (e) => {
								var t = ta();
								Q(t), V(() => $(t, W(O).props.href === "#" ? "" : W(O).props.href ?? "")), G("change", t, (e) => Te("href", e.target.value || null)), q(e, t);
							};
							Y(l, (e) => {
								W(O).props.page || e(u);
							});
							var d = B(l, 2), f = B(R(d)), p = R(f);
							p.value = p.__value = "primary";
							var m = B(p);
							m.value = m.__value = "secondary", j(f);
							var h;
							Z(f), j(d), V(() => {
								$(r, W(O).props.label), c !== (c = W(O).props.page ?? "__href") && (a.value = (a.__value = W(O).props.page ?? "__href") ?? "", X(a, W(O).props.page ?? "__href")), h !== (h = W(O).props.style) && (f.value = (f.__value = W(O).props.style) ?? "", X(f, W(O).props.style));
							}), G("change", r, (e) => Te("label", e.target.value)), G("change", a, (e) => {
								let t = e.target.value === "__href" ? null : e.target.value;
								we(`edit:${W(O).blockId}`, (e) => {
									e.props.page = t, t && (e.props.href = null);
								});
							}), G("change", f, (e) => Te("style", e.target.value)), q(e, t);
						}, d = (e) => {
							var t = ra(), n = z(t), r = B(R(n));
							j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i);
							var o = B(i, 2), s = B(R(o)), c = R(s);
							c.value = c.__value = "cover";
							var l = B(c);
							l.value = l.__value = "contain", j(s);
							var u;
							Z(s), j(o);
							var d = B(o, 2), f = B(R(d)), p = R(f);
							p.value = p.__value = "";
							var m = B(p);
							m.value = m.__value = "sm";
							var h = B(m);
							h.value = h.__value = "md", j(f);
							var g;
							Z(f), j(d);
							var _ = B(d, 2), v = B(R(_));
							Q(v), j(_), V(() => {
								$(a, W(O).props.alt ?? ""), u !== (u = W(O).props.fit ?? "cover") && (s.value = (s.__value = W(O).props.fit ?? "cover") ?? "", X(s, W(O).props.fit ?? "cover")), g !== (g = W(O).props.radius ?? "") && (f.value = (f.__value = W(O).props.radius ?? "") ?? "", X(f, W(O).props.radius ?? "")), $(v, W(O).props.href ?? "");
							}), G("change", r, A), G("change", a, (e) => Te("alt", e.target.value)), G("change", s, (e) => Te("fit", e.target.value)), G("change", f, (e) => Te("radius", e.target.value || null)), G("change", v, (e) => Te("href", e.target.value || null)), q(e, t);
						}, f = (e) => {
							var t = ia(), n = B(z(t), 2);
							Q(n);
							var r = B(n, 2), i = B(R(r));
							Q(i), j(r), M(2), V(() => {
								$(n, W(O).props.url ?? ""), $(i, W(O).props.title ?? "");
							}), G("change", n, (e) => Te("url", e.target.value)), G("change", i, (e) => Te("title", e.target.value)), q(e, t);
						}, p = (e) => {
							var t = aa(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i);
							var o = B(i, 2), s = B(R(o));
							Mr(s, 21, () => ke, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ mt(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Oi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(s);
							var c;
							Z(s), j(o), M(2), V(() => {
								$(r, W(O).props.glyph ?? ""), $(a, W(O).props.size ?? 48), c !== (c = W(O).props.color) && (s.value = (s.__value = W(O).props.color) ?? "", X(s, W(O).props.color));
							}), G("change", r, (e) => Te("glyph", e.target.value || "★")), G("change", a, (e) => Te("size", Number(e.target.value))), G("change", s, (e) => Te("color", e.target.value)), q(e, t);
						}, h = (e) => {
							var t = oa(), n = z(t), r = B(R(n));
							Mr(r, 21, () => Oe, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ mt(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Oi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(r);
							var i;
							Z(r), j(n);
							var a = B(n, 2), o = B(R(a));
							Mr(o, 21, () => ke, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ mt(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Oi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(o);
							var s;
							Z(o), j(a);
							var c = B(a, 2), l = B(R(c));
							Q(l), j(c);
							var u = B(c, 2), d = R(u);
							Q(d), M(), j(u), V((e) => {
								i !== (i = W(O).props.kind) && (r.value = (r.__value = W(O).props.kind) ?? "", X(r, W(O).props.kind)), s !== (s = W(O).props.color) && (o.value = (o.__value = W(O).props.color) ?? "", X(o, W(O).props.color)), $(l, W(O).props.thickness), Jr(d, e);
							}, [() => !!W(O).props.fill]), G("change", r, (e) => Te("kind", e.target.value)), G("change", o, (e) => Te("color", e.target.value)), G("change", l, (e) => Te("thickness", Number(e.target.value))), G("change", d, (e) => Te("fill", e.target.checked ? W(O).props.color : null)), q(e, t);
						};
						Y(c, (e) => {
							W(O).type === "text" ? e(l) : W(O).type === "button" ? e(u, 1) : W(O).type === "image" ? e(d, 2) : W(O).type === "video" ? e(f, 3) : W(O).type === "icon" ? e(p, 4) : W(O).type === "shape" && e(h, 5);
						});
						var g = B(c, 4), v = B(R(g)), y = R(v);
						y.value = y.__value = "", Mr(B(y), 17, () => Object.entries(bi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ mt(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Oi(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(v);
						var b;
						Z(v), j(g);
						var x = B(g, 2), S = (e) => {
							var t = sa(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i), M(2), V(() => {
								$(r, W(O).animation.props.duration), $(a, W(O).animation.props.delay);
							}), G("change", r, (e) => Ze("duration", Number(e.target.value))), G("change", a, (e) => Ze("delay", Number(e.target.value))), q(e, t);
						};
						Y(x, (e) => {
							W(O).animation && bi[W(O).animation.type]?.entrance && e(S);
						}), V(() => {
							J(r, `${De[W(O).type] ?? W(O).type ?? ""}-blokk`), Jr(s, W(O).decor), b !== (b = W(O).animation?.type ?? "") && (v.value = (v.__value = W(O).animation?.type ?? "") ?? "", X(v, W(O).animation?.type ?? ""));
						}), G("change", s, (e) => Ee(e.target.checked)), G("change", v, (e) => Xe(e.target.value || null)), q(e, t);
					}, a = (e) => {
						var t = _a(), r = B(z(t), 2), i = B(R(r));
						Q(i), j(r);
						var a = B(r, 6), o = R(a);
						Q(o), M(), j(a);
						var s = B(a, 2), c = (e) => {
							var t = la(), n = z(t), r = B(R(n)), i = R(r);
							j(r), j(n);
							var a = B(n, 2);
							Q(a), V(() => {
								J(i, `${W(je).size ?? ""} px`), $(a, W(je).size);
							}), G("input", a, (e) => it("size", Number(e.target.value))), q(e, t);
						};
						Y(s, (e) => {
							W(je) && e(c);
						});
						var l = B(s, 8);
						Mr(l, 17, () => W(Ne), Or, (e, t, r) => {
							var i = ga(), a = R(i), o = R(a);
							Mr(o, 21, () => n, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ mt(() => m(W(t), 2));
								let r = () => W(n)[0], i = () => W(n)[1];
								var a = Oi(), o = R(a, !0);
								j(a);
								var s = {};
								V(() => {
									J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), q(e, a);
							}), j(o);
							var s;
							Z(o);
							var c = B(o, 2), l = R(c);
							l.disabled = r === 0;
							var u = B(l, 2), d = B(u, 2);
							j(c), j(a);
							var f = B(a, 2), p = (e) => {
								var n = ua(), i = z(n), a = B(R(i));
								Q(a), j(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								j(s), j(o);
								var l = B(o, 2);
								Q(l), V((e, n) => {
									$(a, e), J(c, `${n ?? ""}%`), $(l, W(t).props.opacity ?? 1);
								}, [() => N(W(t).props.value), () => Math.round((W(t).props.opacity ?? 1) * 100)]), G("input", a, (e) => Ge(r, "value", e.target.value)), G("input", l, (e) => Ge(r, "opacity", Number(e.target.value))), q(e, n);
							}, h = (e) => {
								var n = da(), i = z(n), a = B(R(i));
								Q(a), j(i);
								var o = B(i, 2), s = B(R(o));
								Q(s), j(o);
								var c = B(o, 2), l = B(R(c)), u = R(l);
								j(l), j(c);
								var d = B(c, 2);
								Q(d);
								var f = B(d, 2), p = B(R(f)), m = R(p);
								j(p), j(f);
								var h = B(f, 2);
								Q(h);
								var g = B(h, 2), _ = R(g);
								Q(_), M(), j(g), V((e, n, r, i) => {
									$(a, e), $(s, n), J(u, `${W(t).props.angle ?? ""}°`), $(d, W(t).props.angle), J(m, `${r ?? ""}%`), $(h, W(t).props.opacity ?? 1), Jr(_, i);
								}, [
									() => N(W(t).props.stops[0]),
									() => N(W(t).props.stops[W(t).props.stops.length - 1]),
									() => Math.round((W(t).props.opacity ?? 1) * 100),
									() => !!W(t).props.animate
								]), G("input", a, (e) => Ke(r, 0, e.target.value)), G("input", s, (e) => Ke(r, W(t).props.stops.length - 1, e.target.value)), G("input", d, (e) => Ge(r, "angle", Number(e.target.value))), G("input", h, (e) => Ge(r, "opacity", Number(e.target.value))), G("change", _, (e) => Ge(r, "animate", e.target.checked)), q(e, n);
							}, g = (e) => {
								var n = fa(), i = z(n), a = B(R(i));
								Q(a), j(i);
								var o = B(i, 2), s = B(R(o)), c = R(s);
								j(s), j(o);
								var l = B(o, 2);
								Q(l);
								var u = B(l, 2), d = B(R(u)), f = R(d);
								j(d), j(u);
								var p = B(u, 2);
								Q(p);
								var m = B(p, 2), h = B(R(m)), g = R(h);
								j(h), j(m);
								var _ = B(m, 2);
								Q(_);
								var v = B(_, 2), y = B(R(v)), b = R(y);
								j(y), j(v);
								var x = B(v, 2);
								Q(x), V((e, n, r, i, o) => {
									$(a, e), J(c, `${n ?? ""}%`), $(l, W(t).props.x), J(f, `${r ?? ""}%`), $(p, W(t).props.y), J(g, `${i ?? ""}%`), $(_, W(t).props.radius), J(b, `${o ?? ""}%`), $(x, W(t).props.opacity);
								}, [
									() => N(W(t).props.color),
									() => Math.round(W(t).props.x * 100),
									() => Math.round(W(t).props.y * 100),
									() => Math.round(W(t).props.radius * 100),
									() => Math.round(W(t).props.opacity * 100)
								]), G("input", a, (e) => Ge(r, "color", e.target.value)), G("input", l, (e) => Ge(r, "x", Number(e.target.value))), G("input", p, (e) => Ge(r, "y", Number(e.target.value))), G("input", _, (e) => Ge(r, "radius", Number(e.target.value))), G("input", x, (e) => Ge(r, "opacity", Number(e.target.value))), q(e, n);
							}, _ = (e) => {
								var n = pa(), i = z(n), a = B(R(i)), o = R(a);
								j(a), j(i);
								var s = B(i, 2);
								Q(s), V((e) => {
									J(o, `${e ?? ""}%`), $(s, W(t).props.opacity);
								}, [() => Math.round(W(t).props.opacity * 100)]), G("input", s, (e) => Ge(r, "opacity", Number(e.target.value))), q(e, n);
							}, v = (e) => {
								var n = ha(), i = z(n), a = R(i), o = B(a);
								j(i);
								var s = B(i, 2), c = B(R(s)), l = R(c);
								l.value = l.__value = "cover";
								var u = B(l);
								u.value = u.__value = "contain";
								var d = B(u);
								d.value = d.__value = "repeat", j(c);
								var f;
								Z(c), j(s);
								var p = B(s, 2), m = (e) => {
									var n = ma(), i = z(n), a = B(R(i)), o = R(a);
									j(a), j(i);
									var s = B(i, 2);
									Q(s);
									var c = B(s, 2), l = B(R(c)), u = R(l);
									j(l), j(c);
									var d = B(c, 2);
									Q(d), V((e, n) => {
										J(o, `${e ?? ""}%`), $(s, W(t).props.x ?? .5), J(u, `${n ?? ""}%`), $(d, W(t).props.y ?? .5);
									}, [() => Math.round((W(t).props.x ?? .5) * 100), () => Math.round((W(t).props.y ?? .5) * 100)]), G("input", s, (e) => Ge(r, "x", Number(e.target.value))), G("input", d, (e) => Ge(r, "y", Number(e.target.value))), q(e, n);
								};
								Y(p, (e) => {
									(W(t).props.fit ?? "cover") !== "repeat" && e(m);
								});
								var h = B(p, 2), g = B(R(h)), _ = R(g);
								j(g), j(h);
								var v = B(h, 2);
								Q(v);
								var y = B(v, 2), b = B(R(y)), x = R(b);
								j(b), j(y);
								var S = B(y, 2);
								Q(S), V((e) => {
									J(a, `${W(t).props.src ? "Bytt bilde" : "Velg bilde"} `), f !== (f = W(t).props.fit ?? "cover") && (c.value = (c.__value = W(t).props.fit ?? "cover") ?? "", X(c, W(t).props.fit ?? "cover")), J(_, `${W(t).props.blur ?? 0 ?? ""} px`), $(v, W(t).props.blur ?? 0), J(x, `${e ?? ""}%`), $(S, W(t).props.opacity ?? 1);
								}, [() => Math.round((W(t).props.opacity ?? 1) * 100)]), G("change", o, (e) => Je(r, e)), G("change", c, (e) => Ge(r, "fit", e.target.value)), G("input", v, (e) => Ge(r, "blur", Number(e.target.value))), G("input", S, (e) => Ge(r, "opacity", Number(e.target.value))), q(e, n);
							};
							Y(f, (e) => {
								W(t).type === "color" ? e(p) : W(t).type === "gradient" ? e(h, 1) : W(t).type === "glow" ? e(g, 2) : W(t).type === "grain" ? e(_, 3) : W(t).type === "image" && e(v, 4);
							}), j(i), V(() => {
								s !== (s = W(t).type) && (o.value = (o.__value = W(t).type) ?? "", X(o, W(t).type)), u.disabled = r === W(Ne).length - 1;
							}), G("change", o, (e) => qe(r, e.target.value)), G("click", l, () => We(r, -1)), G("click", u, () => We(r, 1)), G("click", d, () => Ue(r)), q(e, i);
						});
						var u = B(l, 2), d = B(R(u));
						Mr(d, 21, () => n, ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ mt(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Oi(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(d), j(u);
						var f = B(u, 2), p = B(f, 4), h = B(R(p)), g = R(h);
						g.value = g.__value = "", Mr(B(g), 17, () => Object.entries(bi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ mt(() => m(W(t), 2));
							let r = () => W(n)[0], i = () => W(n)[1];
							var a = Oi(), o = R(a, !0);
							j(a);
							var s = {};
							V(() => {
								J(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), q(e, a);
						}), j(h);
						var _;
						Z(h), j(p);
						var v = B(p, 2), y = (e) => {
							var t = sa(), n = z(t), r = B(R(n));
							Q(r), j(n);
							var i = B(n, 2), a = B(R(i));
							Q(a), j(i), M(2), V(() => {
								$(r, W(Pe).props.duration), $(a, W(Pe).props.delay);
							}), G("change", r, (e) => et("duration", Number(e.target.value))), G("change", a, (e) => et("delay", Number(e.target.value))), q(e, t);
						};
						Y(v, (e) => {
							W(Pe) && bi[W(Pe).type]?.entrance && e(y);
						}), V(() => {
							$(i, W(Me)), Jr(o, W(je) !== null), _ !== (_ = W(Pe)?.type ?? "") && (h.value = (h.__value = W(Pe)?.type ?? "") ?? "", X(h, W(Pe)?.type ?? ""));
						}), G("change", i, (e) => tt(e.target.value)), G("change", o, (e) => rt(e.target.checked)), Hr(d, () => W(Ve), (e) => L(Ve, e)), G("click", f, () => He(W(Ve))), G("change", h, (e) => $e(e.target.value || null)), q(e, t);
					}, o = (e) => {
						q(e, va());
					};
					Y(r, (e) => {
						W(O) ? e(i) : W(Ae) ? e(a, 1) : e(o, -1);
					}), j(t), q(e, t);
				}, g = (e) => {
					var t = ba(), n = B(R(t), 2), r = R(n);
					Q(r), M(), j(n);
					var i = B(n, 4);
					Qe(i), Yr(i, "placeholder", "© Min forening\nGateadresse 1, 0000 Sted");
					var a = B(i, 4), o = B(R(a)), s = R(o);
					s.value = s.__value = "left";
					var c = B(s);
					c.value = c.__value = "center";
					var l = B(c);
					l.value = l.__value = "right", j(o);
					var u;
					Z(o), j(a), M(2), j(t), V((e) => {
						Jr(r, e), $(i, W(w).footer?.text ?? ""), u !== (u = W(w).footer?.align ?? "center") && (o.value = (o.__value = W(w).footer?.align ?? "center") ?? "", X(o, W(w).footer?.align ?? "center"));
					}, [() => !!W(w).footer?.show]), G("change", r, (e) => It("footer", (t) => {
						t.show = e.target.checked;
					})), G("input", i, (e) => It("edit:footer-text", (t) => {
						t.text = e.target.value;
					})), G("change", o, (e) => It("footer", (t) => {
						t.align = e.target.value;
					})), q(e, t);
				}, v = (e) => {
					var t = Ea(), n = B(R(t), 2), r = (e) => {
						q(e, xa());
					}, i = (e) => {
						var t = Ta(), n = z(t), r = (e) => {
							var t = Sa(), n = R(t, !0);
							j(t), V(() => J(n, W(dt))), q(e, t);
						};
						Y(n, (e) => {
							W(dt) && e(r);
						});
						var i = B(n, 2), a = (e) => {
							var t = wa(), n = z(t);
							Mr(B(n, 2), 19, () => W(ut), (e) => e.sha, (e, t, n) => {
								var r = Ca();
								let i;
								var a = R(r), o = R(a, !0);
								j(a);
								var s = B(a, 2), c = R(s);
								j(s), j(r), V((e) => {
									i = Vr(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), Yr(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${ht.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), V(() => {
								n.disabled = W(ft) || !W(p)?.allowed, Yr(n, "title", W(p)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, _t), q(e, t);
						};
						Y(i, (e) => {
							W(ut).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(ut) === null ? e(r) : e(i, -1);
					}), j(t), q(e, t);
				};
				Y(a, (e) => {
					W(D) === "Sider" ? e(s) : W(D) === "Nav" ? e(c, 1) : W(D) === "Tema" ? e(l, 2) : W(D) === "Blokker" ? e(u, 3) : W(D) === "Grid" ? e(d, 4) : W(D) === "Egenskaper" ? e(f, 5) : W(D) === "Footer" ? e(g, 6) : W(D) === "Historikk" && e(v, 7);
				}), j(t), V(() => J(i, W(D))), q(e, t);
			};
			Y(i, (e) => {
				W(D) && e(a);
			}), q(e, t);
		};
		Y(r, (e) => {
			W(g) && e(i);
		});
		var a = B(r, 2);
		let s;
		var c = R(a);
		ri(c, (e) => L(f, e), () => W(f)), j(a), j(t), V(() => {
			s = Vr(a, 1, "frame-wrap svelte-1n46o8q", null, s, { mobile: W(_) === "mobile" }), Yr(c, "src", `/?page=${W(o)}&preview=1`);
		}), mr("load", c, xt), fr(c), q(e, t);
	}, H = (e) => {
		q(e, Aa());
	};
	Y(Fn, (e) => {
		W(a) ? e(In) : e(H, -1);
	});
	var Ln = B(Fn, 2), Rn = (e) => {
		var t = ja(), n = R(t), r = B(R(n), 4), i = B(R(r));
		Q(i), j(r);
		var a = B(r, 2), o = B(R(a));
		Q(o), j(a);
		var s = B(a, 2), c = B(R(s));
		Q(c), j(s);
		var l = B(s, 4), u = R(l), d = B(u, 2);
		j(l), j(n), j(t), V((e) => d.disabled = e, [() => !W(me).trim()]), G("keydown", i, (e) => e.key === "Enter" && ve()), $r(i, () => W(me), (e) => L(me, e)), $r(o, () => W(he), (e) => L(he, e)), $r(c, () => W(ge), (e) => L(ge, e)), G("click", u, _e), G("click", d, ve), q(e, t);
	};
	Y(Ln, (e) => {
		W(pe) && e(Rn);
	});
	var U = B(Ln, 2), zn = (e) => {
		var t = Ma();
		let n;
		var r = R(t), i = R(r, !0);
		j(r);
		var a = B(r, 2);
		j(t), V(() => {
			n = Vr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(l) === "ok",
				error: W(l) === "error"
			}), J(i, W(c));
		}), G("click", a, () => d("")), q(e, t);
	};
	Y(U, (e) => {
		W(c) && e(zn);
	}), j(bn), V(() => wn = Vr(Cn, 1, "topbar svelte-1n46o8q", null, wn, { hidden: !W(g) })), q(e, bn), Be();
}
hr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var Fa = Cr(Pa, { target: document.getElementById("urd-admin") });
//#endregion
export { Fa as default };
