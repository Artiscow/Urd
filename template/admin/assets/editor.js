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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, ee = 1 << 19, C = 1 << 20, te = 1 << 25, ne = 65536, re = 1 << 21, ie = 1 << 22, ae = 1 << 23, oe = Symbol("$state"), se = Symbol("legacy props"), ce = Symbol(""), le = Symbol("attributes"), ue = Symbol("class"), de = Symbol("style"), fe = Symbol("text"), pe = Symbol("form reset"), me = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), he = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function ge() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function _e(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function w(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function ve() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function T(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function E() {
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
function Se() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function D() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var Ce = {}, we = Symbol("uninitialized"), Te = "http://www.w3.org/1999/xhtml", Ee = "http://www.w3.org/2000/svg", De = "http://www.w3.org/1998/Math/MathML";
function Oe() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function ke(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ae() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var O = !1;
function je(e) {
	O = e;
}
var Me;
function Ne(e) {
	if (e === null) throw ke(), Ce;
	return Me = e;
}
function Pe() {
	return Ne(/* @__PURE__ */ dn(Me));
}
function k(e) {
	if (O) {
		if (/* @__PURE__ */ dn(Me) !== null) throw ke(), Ce;
		Me = e;
	}
}
function A(e = 1) {
	if (O) {
		for (var t = e, n = Me; t--;) n = /* @__PURE__ */ dn(n);
		Me = n;
	}
}
function Fe(e = !0) {
	for (var t = 0, n = Me;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ dn(n);
		e && n.remove(), n = i;
	}
}
function Ie(e) {
	if (!e || e.nodeType !== 8) throw ke(), Ce;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Le(e) {
	return e === this.v;
}
function Re(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function ze(e) {
	return !Re(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Be = [];
function Ve(e, t = !1, n = !1) {
	return He(e, /* @__PURE__ */ new Map(), "", Be, null, n);
}
function He(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = He(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = He(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return He(t.toJSON(), n, r, i, t);
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
var Ue = null;
function We(e) {
	Ue = e;
}
function Ge(e, t = !1, n) {
	Ue = {
		p: Ue,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: H,
		l: null
	};
}
function Ke(e) {
	var t = Ue, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Sn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Ue = t.p, e ?? {};
}
function qe() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Je = [];
function Ye() {
	var e = Je;
	Je = [], f(e);
}
function Xe(e) {
	if (Je.length === 0 && !jt) {
		var t = Je;
		queueMicrotask(() => {
			t === Je && Ye();
		});
	}
	Je.push(e);
}
function Ze() {
	for (; Je.length > 0;) Ye();
}
function Qe(e) {
	var t = H;
	if (t === null) return V.f |= ae, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	$e(e, t);
}
function $e(e, t) {
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
var j = ~(g | _ | h);
function et(e, t) {
	e.f = e.f & j | t;
}
function tt(e) {
	e.f & 512 || e.deps === null ? et(e, h) : et(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function nt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ne, nt(t.deps));
}
function rt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), nt(e.deps), et(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var it = !1;
function at(e) {
	var t = it;
	try {
		return it = !1, [e(), it];
	} finally {
		it = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ot(e) {
	O && /* @__PURE__ */ un(e) !== null && fn(e);
}
var st = !1;
function M() {
	st || (st = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ct(e) {
	var t = V, n = H;
	Gn(null), Kn(null);
	try {
		return e();
	} finally {
		Gn(t), Kn(n);
	}
}
function lt(e, t, n, r = n) {
	e.addEventListener(t, () => ct(n));
	let i = e[pe];
	i ? e[pe] = () => {
		i(), r(!0);
	} : e[pe] = () => r(!0), M();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ut(e) {
	let t = 0, n = Xt(0), r;
	return () => {
		yn() && (W(n), En(() => (t === 0 && (r = fr(() => e(() => en(n)))), t += 1, () => {
			Xe(() => {
				--t, t === 0 && (r?.(), r = void 0, en(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var dt = S | ee;
function ft(e, t, n, r) {
	new pt(e, t, n, r);
}
var pt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = O ? Me : null;
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
	#h = ut(() => (this.#m = Xt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = H;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = H.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Dn(() => {
			if (O) {
				let e = this.#t;
				Pe();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, dt), O && (this.#e = Me);
	}
	#g() {
		try {
			this.#a = On(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Xe(r), t && (this.#s = On(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				Ae();
				return;
			}
			t = !0, n && D(), this.#s !== null && Fn(this.#s, () => {
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
					$e(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = On(() => e(this.#e)), Xe(() => {
			var e = this.#c = document.createDocumentFragment(), t = ln();
			e.append(t), this.#a = this.#S(() => On(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Fn(this.#o, () => {
				this.#o = null;
			}), this.#x(P));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = On(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				zn(this.#a, e);
				let t = this.#n.pending;
				this.#o = On(() => t(this.#e));
			} else this.#x(P);
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
		var t = H, n = V, r = Ue;
		Kn(this.#i), Gn(this.#i), We(this.#i.ctx);
		try {
			return Lt.ensure(), e();
		} catch (e) {
			return Qe(e), null;
		} finally {
			Kn(t), Gn(n), We(r);
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
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Xe(() => {
			this.#d = !1, this.#m && Qt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), W(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		P?.is_fork ? (this.#a && P.skip_effect(this.#a), this.#o && P.skip_effect(this.#o), this.#s && P.skip_effect(this.#s), P.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Mn(this.#a), null), this.#o &&= (Mn(this.#o), null), this.#s &&= (Mn(this.#s), null), O && (Ne(this.#t), A(), Ne(Fe()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return On(() => {
						var r = H;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return $e(e, this.#i.parent), null;
				}
			}));
		};
		Xe(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				$e(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => $e(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function mt(e, t, n, r) {
	let i = qe() ? vt : xt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = H, c = ht(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				$e(e, s);
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
		Promise.all(n.map((e) => /* @__PURE__ */ bt(e))).then(u).catch((e) => $e(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), gt();
	}) : f();
}
function ht() {
	var e = H, t = V, n = Ue, r = P;
	return function(i = !0) {
		Kn(e), Gn(t), We(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function gt(e = !0) {
	Kn(null), Gn(null), We(null), e && P?.deactivate();
}
function _t() {
	var e = H, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
	var t = 2 | g;
	return H !== null && (H.f |= ee), {
		ctx: Ue,
		deps: null,
		effects: null,
		equals: Le,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: we,
		wv: 0,
		parent: H,
		ac: null
	};
}
var yt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function bt(e, t, n) {
	let r = H;
	r === null && ge();
	var i = void 0, a = Xt(we), o = !V, s = /* @__PURE__ */ new Set();
	return Tn(() => {
		var t = H, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
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
			l?.(), s.delete(n), t !== yt && (c.activate(), t ? (a.f |= ae, Qt(a, t)) : (a.f & 8388608 && (a.f ^= ae), Qt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), bn(() => {
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
	return Jn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function xt(e) {
	let t = /* @__PURE__ */ vt(e);
	return t.equals = ze, t;
}
function St(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Mn(t[n]);
	}
}
function Ct(e) {
	var t, n = H, r = e.parent;
	if (!Hn && r !== null && e.v !== we && r.f & 24576) return Oe(), e.v;
	Kn(r);
	try {
		e.f &= ~ne, St(e), t = ar(e);
	} finally {
		Kn(n);
	}
	return t;
}
function wt(e) {
	var t = Ct(e);
	if (!e.equals(t) && (e.wv = rr(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), Ot?.capture(e, t, !0)), e.deps === null))) {
		et(e, h);
		return;
	}
	Hn || (kt === null ? tt(e) : (yn() || P?.is_fork) && kt.set(e, t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ct(() => {
		t.ac.abort(me), t.ac = null;
	}), t.fn !== null && (t.teardown = d), sr(t, 0), An(t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && cr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Dt = null, P = null, Ot = null, kt = null, At = null, jt = !1, Mt = !1, Nt = null, Pt = null, Ft = 0, It = 1, Lt = class e {
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
			for (var r of n.d) et(r, g), t(r);
			for (r of n.m) et(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Ft++ > 1e3 && (this.#x(), zt());
		for (let e of this.#u) this.#d.delete(e), et(e, g), this.schedule(e);
		for (let e of this.#d) et(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Nt = [], r = [], i = Pt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Kt(e), this.#h() || this.discard(), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Nt = null, Pt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Gt(e, t);
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
		this.#r.clear(), Ot = this, Vt(r), Vt(n), Ot = null, this.#s?.resolve();
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
				a ? r.f ^= h : i & 4 ? t.push(r) : U(r) && (i & 16 && this.#d.add(r), cr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), et(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), P = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) rt(e[t], this.#u, this.#d);
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
			Ft = 0, At = null, Nt = null, Pt = null, Mt = !1, P = null, kt = null, Jt.clear();
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
		this.#m || (this.#m = !0, Xe(() => {
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
			!Mt && !jt && Xe(() => {
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
			if (Nt !== null && t === H && (V === null || !(V.f & 2))) return;
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
function Rt(e) {
	var t = jt;
	jt = !0;
	try {
		var n;
		for (e && (P !== null && !P.is_fork && P.flush(), n = e());;) {
			if (Ze(), P === null) return n;
			P.flush();
		}
	} finally {
		jt = t;
	}
}
function zt() {
	try {
		E();
	} catch (e) {
		$e(e, At);
	}
}
var Bt = null;
function Vt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && U(r) && (Bt = /* @__PURE__ */ new Set(), cr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Pn(r), Bt?.size > 0)) {
				Jt.clear();
				for (let e of Bt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Bt.has(n) && (Bt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || cr(n);
					}
				}
				Bt.clear();
			}
		}
		Bt = null;
	}
}
function Ht(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Ht(i, t, n, r) : e & 4194320 && !(e & 2048) && Ut(i, t, r) && (et(i, g), Wt(i));
	}
}
function Ut(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Ut(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Wt(e) {
	P.schedule(e);
}
function Gt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), et(e, h);
		for (var n = e.first; n !== null;) Gt(n, t), n = n.next;
	}
}
function Kt(e) {
	et(e, h);
	for (var t = e.first; t !== null;) Kt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var qt = /* @__PURE__ */ new Set(), Jt = /* @__PURE__ */ new Map(), Yt = !1;
function Xt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Le,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = Xt(e, t);
	return Jn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Zt(e, t = !1, n = !0) {
	let r = Xt(e);
	return t || (r.equals = ze), r;
}
function I(e, t, n = !1) {
	return V !== null && (!Wn || V.f & 131072) && qe() && V.f & 4325394 && (qn === null || !qn.has(e)) && Se(), Qt(e, n ? nn(t) : t, Pt);
}
function Qt(e, t, n = null) {
	if (!e.equals(t)) {
		Jt.set(e, Hn ? t : e.v);
		var r = Lt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ct(t), kt === null && tt(t);
		}
		e.wv = rr(), tn(e, g, n), qe() && H !== null && H.f & 1024 && !(H.f & 96) && (Zn === null ? Qn([e]) : Zn.push(e)), !r.is_fork && qt.size > 0 && !Yt && $t();
	}
	return t;
}
function $t() {
	Yt = !1;
	for (let e of qt) {
		e.f & 1024 && et(e, _);
		let t;
		try {
			t = U(e);
		} catch {
			t = !0;
		}
		t && cr(e);
	}
	qt.clear();
}
function en(e) {
	I(e, e.v + 1);
}
function tn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = qe(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === H)) {
			var l = (c & g) === 0;
			if (l && et(s, t), c & 131072) qt.add(s);
			else if (c & 2) {
				var u = s;
				kt?.delete(u), c & 65536 || (c & 512 && (H === null || !(H.f & 2097152)) && (s.f |= ne), tn(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Bt !== null && Bt.add(d), n === null ? Wt(d) : n.push(d);
			}
		}
	}
}
function nn(t) {
	if (typeof t != "object" || !t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ F(0), u = null, d = tr, f = (e) => {
		if (tr === d) return e();
		var t = V, n = tr;
		Gn(null), nr(d);
		var r = e();
		return Gn(t), nr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ F(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && be();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ F(n.value, u);
				return r.set(t, e), e;
			}) : I(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ F(we, u));
					r.set(t, e), en(o);
				}
			} else I(n, we), en(o);
			return !0;
		},
		get(e, n, i) {
			if (n === oe) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(nn(s ? e[n] : we), u)), r.set(n, o)), o !== void 0) {
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
			if (t === oe) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== we || Reflect.has(e, t);
			return (n !== void 0 || H !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? nn(e[t]) : we, u)), r.set(t, n)), W(n) === we) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(we, u)), r.set(d + "", p)) : I(p, we);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, nn(n)), r.set(t, c));
			else {
				l = c.v !== we;
				var m = f(() => nn(n));
				I(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				en(o);
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
			xe();
		}
	});
}
var rn, an, on, sn;
function cn() {
	if (rn === void 0) {
		rn = window, an = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		on = a(t, "firstChild").get, sn = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
	}
}
function ln(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function un(e) {
	return on.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function dn(e) {
	return sn.call(e);
}
function L(e, t) {
	if (!O) return /* @__PURE__ */ un(e);
	var n = /* @__PURE__ */ un(Me);
	if (n === null) n = Me.appendChild(ln());
	else if (t && n.nodeType !== 3) {
		var r = ln();
		return n?.before(r), Ne(r), r;
	}
	return t && hn(n), Ne(n), n;
}
function R(e, t = !1) {
	if (!O) {
		var n = /* @__PURE__ */ un(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ dn(n) : n;
	}
	if (t) {
		if (Me?.nodeType !== 3) {
			var r = ln();
			return Me?.before(r), Ne(r), r;
		}
		hn(Me);
	}
	return Me;
}
function z(e, t = 1, n = !1) {
	let r = O ? Me : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ dn(r);
	if (!O) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = ln();
			return r === null ? i?.after(a) : r.before(a), Ne(a), a;
		}
		hn(r);
	}
	return Ne(r), r;
}
function fn(e) {
	e.textContent = "";
}
function pn() {
	return !1;
}
function mn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function hn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function gn(e) {
	H === null && (V === null && T(e), ve()), Hn && w(e);
}
function _n(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function vn(e, t) {
	var n = H;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: Ue,
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
	if (e & 4) Nt === null ? Lt.ensure().schedule(r) : Nt.push(r);
	else if (t !== null) {
		try {
			cr(r);
		} catch (e) {
			throw Mn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && _n(i, n), V !== null && V.f & 2 && !(e & 64))) {
		var a = V;
		(a.effects ??= []).push(i);
	}
	return r;
}
function yn() {
	return V !== null && !Wn;
}
function bn(e) {
	let t = vn(8, null);
	return et(t, h), t.teardown = e, t;
}
function xn(e) {
	gn("$effect");
	var t = H.f;
	if (!V && t & 32 && Ue !== null && !Ue.i) {
		var n = Ue;
		(n.e ??= []).push(e);
	} else return Sn(e);
}
function Sn(e) {
	return vn(4 | C, e);
}
function Cn(e) {
	Lt.ensure();
	let t = vn(64 | ee, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? Fn(t, () => {
			Mn(t), n(void 0);
		}) : (Mn(t), n(void 0));
	});
}
function wn(e) {
	return vn(4, e);
}
function Tn(e) {
	return vn(ie | ee, e);
}
function En(e, t = 0) {
	return vn(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	mt(r, t, n, (t) => {
		vn(8, () => {
			e(...t.map(W));
		});
	});
}
function Dn(e, t = 0) {
	return vn(16 | t, e);
}
function On(e) {
	return vn(32 | ee, e);
}
function kn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Hn, n = V;
		Un(!0), Gn(null);
		try {
			t.call(null);
		} finally {
			Un(e), Gn(n);
		}
	}
}
function An(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ct(() => {
			e.abort(me);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Nn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, An(e, t && !n), sr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	kn(e), e.f ^= x, e.f |= y;
	var i = e.parent;
	i !== null && i.first !== null && Pn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Nn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ dn(e);
		e.remove(), e = n;
	}
}
function Pn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Fn(e, t, n = !0) {
	var r = [];
	In(e, r, !0);
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
		e.f ^= v;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				In(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Ln(e) {
	Rn(e, !0);
}
function Rn(e, t) {
	if (e.f & 8192) {
		e.f ^= v, e.f & 1024 || (et(e, g), Lt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			Rn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function zn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ dn(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Bn = null, Vn = !1, Hn = !1;
function Un(e) {
	Hn = e;
}
var V = null, Wn = !1;
function Gn(e) {
	V = e;
}
var H = null;
function Kn(e) {
	H = e;
}
var qn = null;
function Jn(e) {
	V !== null && (qn ??= /* @__PURE__ */ new Set()).add(e);
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
function U(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ne), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (U(a) && wt(a), a.wv > e.wv) return !0;
		}
		t & 512 && kt === null && et(e, h);
	}
	return !1;
}
function ir(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(qn !== null && qn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ir(a, t, !1) : t === a && (n ? et(a, g) : a.f & 1024 && et(a, _), Wt(a));
	}
}
function ar(e) {
	var t = Yn, n = Xn, r = Zn, i = V, a = qn, o = Ue, s = Wn, c = tr, l = e.f;
	Yn = null, Xn = 0, Zn = null, V = l & 96 ? null : e, qn = null, We(e.ctx), Wn = !1, tr = ++er, e.ac !== null && (ct(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = P?.is_fork;
		if (Yn !== null) {
			var m;
			if (p || sr(e, Xn), f !== null && Xn > 0) for (f.length = Xn + Yn.length, m = 0; m < Yn.length; m++) f[Xn + m] = Yn[m];
			else e.deps = f = Yn;
			if (yn() && e.f & 512) for (m = Xn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Xn < f.length && (sr(e, Xn), f.length = Xn);
		if (qe() && Zn !== null && !Wn && f !== null && !(e.f & 6146)) for (m = 0; m < Zn.length; m++) ir(Zn[m], e);
		if (i !== null && i !== e) {
			if (er++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = er;
			if (t !== null) for (let e of t) e.rv = er;
			Zn !== null && (r === null ? r = Zn : r.push(...Zn));
		}
		return e.f & 8388608 && (e.f ^= ae), d;
	} catch (e) {
		return Qe(e);
	} finally {
		e.f ^= re, Yn = t, Xn = n, Zn = r, V = i, qn = a, We(o), Wn = s, tr = c;
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
	if (i === null && r.f & 2 && (Yn === null || !n.call(Yn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== we && tt(s), s.ac !== null && ct(() => {
			s.ac.abort(me), s.ac = null, et(s, g);
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
		et(e, h);
		var n = H, r = Vn;
		H = e, Vn = (t & 96) == 0;
		try {
			t & 16777232 ? jn(e) : An(e), kn(e);
			var i = ar(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = $n;
		} finally {
			Vn = r, H = n;
		}
	}
}
async function lr() {
	await Promise.resolve(), Rt();
}
function W(e) {
	var t = (e.f & 2) != 0;
	if (Bn?.add(e), V !== null && !Wn && !(H !== null && H.f & 16384) && (qn === null || !qn.has(e))) {
		var r = V.deps;
		if (V.f & 2097152) e.rv < er && (e.rv = er, Yn === null && r !== null && r[Xn] === e ? Xn++ : Yn === null ? Yn = [e] : Yn.push(e));
		else {
			V.deps ??= [], n.call(V.deps, e) || V.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [V] : n.call(i, V) || i.push(V);
		}
	}
	if (Hn && Jt.has(e)) return Jt.get(e);
	if (t) {
		var a = e;
		if (Hn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || dr(a)) && (o = Ct(a)), Jt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Wn && V !== null && (Vn || (V.f & 512) != 0), c = (a.f & b) === 0;
		U(a) && (s && (a.f |= 512), wt(a)), s && !c && (Et(a), ur(a));
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
	for (let t of e.deps) if (Jt.has(t) || t.f & 2 && dr(t)) return !0;
	return !1;
}
function fr(e) {
	var t = Wn;
	try {
		return Wn = !0, e();
	} finally {
		Wn = t;
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
	if (!O) return;
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
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Xe(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function br(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = yr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && bn(() => {
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
		var d = V, f = H;
		Gn(null), Kn(null);
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
			e[hr] = t, delete e.currentTarget, Gn(d), Kn(f);
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
	var t = mn("template");
	return t.innerHTML = Tr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Dr(e, t) {
	var n = H;
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
		if (O) return Dr(Me, null), Me;
		i === void 0 && (i = Er(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ un(i)));
		var t = r || an ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ un(t), s = t.lastChild;
			Dr(o, s);
		} else Dr(t, t);
		return t;
	};
}
function Or(e = "") {
	if (!O) {
		var t = ln(e + "");
		return Dr(t, t), t;
	}
	var n = Me;
	return n.nodeType === 3 ? hn(n) : (n.before(n = ln()), Ne(n)), Dr(n, n), n;
}
function kr() {
	if (O) return Dr(Me, null), Me;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = ln();
	return e.append(t, n), Dr(t, n), e;
}
function q(e, t) {
	if (O) {
		var n = H;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Me), Pe();
		return;
	}
	e !== null && e.before(t);
}
function J(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function Ar(e, t) {
	return Mr(e, t);
}
var jr = /* @__PURE__ */ new Map();
function Mr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	cn();
	var l = void 0, u = Cn(() => {
		var s = n ?? t.appendChild(ln());
		ft(s, { pending: () => {} }, (t) => {
			Ge({});
			var n = Ue;
			if (o && (n.c = o), a && (i.$$events = a), O && Dr(t, null), l = e(t, i) || {}, O && (H.nodes.end = Me, Me === null || Me.nodeType !== 8 || Me.data !== "]")) throw ke(), Ce;
			Ke();
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
						zn(r, t), t.append(ln()), this.#n.set(e, {
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
		var n = P, r = pn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = ln();
			i.append(a), this.#n.set(e, {
				effect: On(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, On(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else O && (this.anchor = Me), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function Y(e, t, n = !1) {
	var r;
	O && (r = Me, Pe());
	var i = new Pr(e), a = n ? S : 0;
	function o(e, t) {
		if (O) {
			var n = Ie(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Fe();
				Ne(a), i.anchor = a, je(!1), i.ensure(e, t), je(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Dn(() => {
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
		Fn(n, () => {
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
			fn(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= te, zn(a, document.createDocumentFragment())) : Mn(t[i], n);
	}
}
var Rr;
function zr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = O ? Ne(/* @__PURE__ */ un(u)) : u.appendChild(ln());
	}
	O && Pe();
	var d = null, f = /* @__PURE__ */ xt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Vr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, Ur(d, null, c)) : Ln(d) : Fn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: Dn(() => {
			p = W(f);
			var e = p.length;
			let t = !1;
			O && Ie(c) === "[!" != (e === 0) && (c = Fe(), Ne(c), je(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = P, v = pn(), y = 0; y < e; y += 1) {
				O && Me.nodeType === 8 && Me.data === "]" && (c = Me, t = !0, je(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Qt(S.v, b), S.i && Qt(S.i, y), v && u.unskip_effect(S.e)) : (S = Hr(l, h ? c : Rr ??= ln(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = On(() => s(c)) : (d = On(() => s(Rr ??= ln())), d.f |= te)), e > r.size && _e("", "", ""), O && e > 0 && Ne(Fe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && je(!0), W(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, O && (c = Me);
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
		if (_.f & 8192 && (Ln(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= te, _ === l) Ur(_, null, n);
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
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Ur(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Wr(e, S.prev, ee.next), Wr(e, d, S), Wr(e, ee, b), l = b, d = ee, --v, p = [], m = [];
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
		var C = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || C.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && C.push(l), l = Br(l.next);
		var ne = C.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) C[v].nodes?.a?.fix();
			}
			Ir(e, C, re);
		}
	}
	o && Xe(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Hr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Xt(n) : /* @__PURE__ */ Zt(n, !1, !1) : null, l = o & 2 ? Xt(i) : null;
	return {
		v: c,
		i: l,
		e: On(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Ur(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ dn(r);
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
		O && (o = Ne(/* @__PURE__ */ un(c)));
	}
	B(() => {
		var e = H;
		if (s === (s = t() ?? "")) {
			O && Pe();
			return;
		}
		if (n && !O) {
			e.nodes = null, c.innerHTML = s, s !== "" && Dr(/* @__PURE__ */ un(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Nn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (O) {
				for (var a = Me.data, l = Pe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ dn(l);
				if (l === null) throw ke(), Ce;
				Dr(Me, u), o = Ne(l);
				return;
			}
			var d = mn(r ? "svg" : i ? "math" : "template", r ? Ee : i ? De : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Dr(/* @__PURE__ */ un(f), f.lastChild), r || i) for (; /* @__PURE__ */ un(f);) o.before(/* @__PURE__ */ un(f));
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
	var o = e[ue];
	if (O || o !== n || o === void 0) {
		var s = Kr(n, r, a);
		(!O || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
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
	var i = e[de];
	if (O || i !== t) {
		var a = Yr(t, r);
		(!O || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (Zr(e, n?.[0], r[0]), Zr(e, n?.[1], r[1], "important")) : Zr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var $r = Symbol("is custom element"), ei = Symbol("is html"), ti = he ? "link" : "LINK", ni = he ? "progress" : "PROGRESS";
function Z(e) {
	if (O) {
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
		e[pe] = n, Xe(n), M();
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
	O && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ti) || i[t] !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ai(e) {
	return e[le] ??= {
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
	}), (O && e.defaultValue !== e.value || fr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), P !== null && r.add(P)), En(() => {
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
	return e === t || e?.[oe] === t;
}
function fi(e = {}, t, n, r) {
	var i = Ue.r, a = H;
	return wn(() => {
		var o, s;
		return En(() => {
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
		var p = oe in e || se in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = at(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ye(t), f(m)));
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
	var b = H;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? W(y) : i && o ? nn(e) : e;
			return I(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Hn && v || b.f & 16384 ? y.v : W(y);
	});
}
var mi = {
	lang: "nb",
	strings: {
		"nav.toFront": "Til forsiden",
		"nav.toLightTheme": "Bytt til lyst tema",
		"nav.toDarkTheme": "Bytt til mørkt tema",
		"nav.menu": "Meny",
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
		"render.missingPlugin": "Blokktypen '{type}' er ikke tilgjengelig (mangler plugin eller nyere Urd?)"
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
};
//#endregion
//#region ../template/assets/engine/i18n.js
function hi(e) {
	return gi(e) ?? "nb";
}
function gi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	return t === "no" || t.startsWith("nb") || t.startsWith("no-") ? "nb" : t.startsWith("nn") ? "nn" : t.startsWith("se") || t.startsWith("smj") || t.startsWith("sma") ? "se" : t.startsWith("tr") ? "tr" : t.startsWith("en") ? "en-GB" : null;
}
({ ...mi.strings });
var _i = {
	lang: "nb",
	dict: {}
};
function vi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function yi(e, t) {
	return vi(_i.dict[e] ?? e, t);
}
function bi() {
	return _i.lang;
}
function xi(e, t) {
	_i.lang = hi(e), Object.assign(_i.dict, t ?? {});
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function Si(e, t, n) {
	let r = t(), i = JSON.stringify(r), a = JSON.parse(i), o = localStorage.getItem(e);
	if (o) try {
		a = JSON.parse(o);
	} catch {
		localStorage.removeItem(e);
	}
	return {
		get data() {
			return a;
		},
		save() {
			let t = JSON.stringify(a);
			if (t === i) return localStorage.removeItem(e), !0;
			try {
				return localStorage.setItem(e, t), !0;
			} catch (e) {
				return n?.(e), !1;
			}
		},
		reset() {
			return localStorage.removeItem(e), a = JSON.parse(i), a;
		},
		replace(e) {
			return a = e, a;
		},
		amendBaseline(e) {
			let t = JSON.parse(i);
			e(t), i = JSON.stringify(t);
		},
		hasDraft() {
			return localStorage.getItem(e) !== null;
		}
	};
}
//#endregion
//#region src/lib/ColorPicker.svelte
var Ci = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-clear svelte-zxiloo\" title=\"Fjern fargen (bruk temaets standard)\" aria-label=\"Fjern fargen\">×</button>"), wi = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Ti = /* @__PURE__ */ K("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Ei = /* @__PURE__ */ K("<button type=\"button\"></button>"), Di = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Oi = /* @__PURE__ */ K("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), ki = /* @__PURE__ */ K("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Ai = /* @__PURE__ */ K("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), ji = /* @__PURE__ */ K("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Mi = /* @__PURE__ */ K("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), Ni = /* @__PURE__ */ K("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Pi(e, t) {
	Ge(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 3, "Velg farge"), a = pi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ F(nn([])), d = /* @__PURE__ */ F(nn([])), f = "", p = "", h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(!1), _ = /* @__PURE__ */ F(nn({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ F(0), y = /* @__PURE__ */ F(0), b = /* @__PURE__ */ F(1), x = /* @__PURE__ */ F(1), S = /* @__PURE__ */ F("#000000");
	function ee(e) {
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
	function te(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function ne(e, t, n) {
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
	function re() {
		return C(...ne(W(v), W(y), W(b)));
	}
	function ie() {
		let e = re();
		return W(x) >= .995 ? e : e + Math.round(W(x) * 255).toString(16).padStart(2, "0");
	}
	function ae() {
		I(S, ie(), !0), p = W(S), t.onchange?.(W(S));
	}
	function oe(e) {
		let t = ee(e);
		return t ? (((e) => {
			var t = m(e, 3);
			I(v, t[0], !0), I(y, t[1], !0), I(b, t[2], !0);
		})(te(t[0], t[1], t[2])), I(x, t[3], !0), I(S, ie(), !0), !0) : !1;
	}
	function se() {
		oe(c()) || oe("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			I(u, Array.isArray(e) ? e : [], !0);
		} catch {
			I(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			I(d, Array.isArray(e) ? e : [], !0);
		} catch {
			I(d, [], !0);
		}
		let e = W(h).getBoundingClientRect(), t = W(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(_, {
			top: a,
			left: i
		}, !0), I(g, !0);
	}
	function ce() {
		if (I(g, !1), p && p !== f) {
			let e = [p, ...W(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function le(e, n) {
		oe(n), I(S, n, !0), t.onchange?.(e);
	}
	function ue(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			I(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), I(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ae();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function de(e) {
		oe(e.target.value) ? ae() : I(S, re(), !0);
	}
	function fe(e) {
		return (ee(re()) ?? [
			0,
			0,
			0
		])[e];
	}
	function pe(e, t) {
		let n = ee(re()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			I(v, t[0], !0), I(y, t[1], !0), I(b, t[2], !0);
		})(te(...n)), ae();
	}
	let me = typeof window < "u" && "EyeDropper" in window;
	async function he() {
		try {
			oe((await new window.EyeDropper().open()).sRGBHex) && ae();
		} catch {}
	}
	function ge(e) {
		oe(e) && ae();
	}
	function _e() {
		let e = ie();
		W(d).includes(e) || (I(d, [e, ...W(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(Ve(W(d)))));
	}
	function w(e) {
		I(d, W(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(Ve(W(d))));
	}
	xn(() => {
		if (!W(g)) return;
		let e = (e) => {
			W(h) && !W(h).contains(e.target) && ce();
		}, t = (e) => {
			e.key === "Escape" && ce();
		}, n = () => ce();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var ve = Ni(), T = L(ve);
	let E;
	var ye = z(T, 2), be = (e) => {
		var n = Ci();
		G("click", n, () => t.onchange?.("")), q(e, n);
	};
	Y(ye, (e) => {
		a() && n() && e(be);
	});
	var xe = z(ye, 2), Se = (e) => {
		var t = Mi(), i = L(t), a = L(i);
		k(i);
		var o = z(i, 2);
		Z(o);
		var s = z(o, 2);
		Z(s);
		var c = z(s, 2), f = L(c), p = z(f, 2);
		Z(p);
		var h = z(p, 2), g = (e) => {
			var t = wi();
			G("click", t, he), q(e, t);
		};
		Y(h, (e) => {
			me && e(g);
		}), k(c);
		var ee = z(c, 2);
		zr(ee, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Ti();
			Z(r), B((e) => {
				ii(r, "title", t), Q(r, e);
			}, [() => fe(W(n))]), G("change", r, (e) => pe(W(n), e.target.value)), q(e, r);
		}), k(ee);
		var C = z(ee, 2), te = (e) => {
			var t = Di(), i = R(t), a = z(L(i)), o = (e) => {
				var t = Or();
				B((e) => J(t, `- koblet til «${e ?? ""}»`), [() => l()]), q(e, t);
			}, s = /* @__PURE__ */ N(() => l());
			Y(a, (e) => {
				W(s) && e(o);
			}), k(i);
			var c = z(i, 2);
			zr(c, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ N(() => m(W(t), 2));
				let i = () => W(r)[0], a = () => W(r)[1];
				var o = Ei();
				let s;
				B(() => {
					s = Xr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), Qr(o, `background: ${a() ?? ""}`), ii(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), G("click", o, () => le(i(), a())), q(e, o);
			}), k(c), q(e, t);
		};
		Y(C, (e) => {
			r().length && e(te);
		});
		var ne = z(C, 2), ie = z(L(ne));
		k(ne);
		var oe = z(ne, 2), se = (e) => {
			var t = ki();
			zr(t, 20, () => W(d), (e) => e, (e, t) => {
				var n = Oi(), r = L(n), i = z(r, 2);
				k(n), B(() => {
					Qr(r, `background: ${t ?? ""}`), ii(r, "title", t);
				}), G("click", r, () => ge(t)), G("click", i, () => w(t)), q(e, n);
			}), k(t), q(e, t);
		};
		Y(oe, (e) => {
			W(d).length && e(se);
		});
		var ce = z(oe, 2), ve = (e) => {
			var t = ji(), n = z(R(t), 2);
			zr(n, 20, () => W(u), (e) => e, (e, t) => {
				var n = Ai();
				B(() => {
					Qr(n, `background: ${t ?? ""}`), ii(n, "title", t);
				}), G("click", n, () => ge(t)), q(e, n);
			}), k(n), q(e, t);
		};
		Y(ce, (e) => {
			W(u).length && e(ve);
		}), k(t), B((e, n) => {
			Qr(t, `top: ${W(_).top ?? ""}px; left: ${W(_).left ?? ""}px`), Qr(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${W(v) ?? ""}, 100%, 50%)`), Qr(a, `left: ${W(y) * 100}%; top: ${(1 - W(b)) * 100}%`), Q(o, W(v)), Q(s, e), Qr(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), Qr(f, `background: ${W(S) ?? ""}`), Q(p, W(S));
		}, [() => Math.round(W(x) * 100), () => re()]), G("click", t, (e) => e.preventDefault()), G("pointerdown", i, ue), G("input", o, (e) => {
			I(v, Number(e.target.value), !0), ae();
		}), G("input", s, (e) => {
			I(x, Number(e.target.value) / 100), ae();
		}), G("change", p, de), G("click", ie, _e), q(e, t);
	};
	Y(xe, (e) => {
		W(g) && e(Se);
	}), k(ve), fi(ve, (e) => I(h, e), () => W(h)), B((e, t, n) => {
		E = Xr(T, 1, "cp-swatch svelte-zxiloo", null, E, e), Qr(T, `background: ${t ?? ""}`), ii(T, "title", n), ii(T, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? `${i()} (koblet til temafargen «${l()}»)` : i()
	]), G("click", T, () => W(g) ? ce() : se()), q(e, ve), Ke();
}
xr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/imageTools.js
var Fi = 1600, Ii = .82, Li = .6;
async function Ri(e, t = Fi) {
	if (Bi(e)) return Vi(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Ii);
	return c.size > 4e5 && (c = await s(Li)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var zi = "image/svg+xml";
function Bi(e) {
	return e.type === zi || /\.svg$/i.test(e.name || "");
}
function Vi(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${zi};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Hi(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Ui(e) {
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
function Wi(e) {
	return /^data:image\/svg\+xml[;,]/.test(e || "") ? "svg" : "webp";
}
function Gi(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function Ki(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/glyphs.js
var qi = "urd-recent-glyphs", Ji = [
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
function Yi(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function Xi() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Zi(e) {
	let t = Yi(Xi(), e);
	try {
		localStorage.setItem(qi, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/icons.js
var Qi = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", $i = "fill=\"currentColor\" stroke=\"none\"", ea = {
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
}, ta = [
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
function na(e) {
	let t = typeof e == "string" ? ea[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? $i : Qi} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var ra = /* @__PURE__ */ K("<img class=\"gp-own svelte-15ln1c3\" alt=\"Eget ikon\"/>"), ia = /* @__PURE__ */ K("<span class=\"gp-svg svelte-15ln1c3\"></span>"), aa = /* @__PURE__ */ K("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), oa = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), sa = /* @__PURE__ */ K("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), ca = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), la = /* @__PURE__ */ K("<button type=\"button\"> </button>"), ua = /* @__PURE__ */ K("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), da = /* @__PURE__ */ K("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), fa = /* @__PURE__ */ K("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function pa(e, t) {
	Ge(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "icon", 3, null), i = pi(t, "image", 3, null), a = pi(t, "label", 3, "Velg tegn"), o = /* @__PURE__ */ F(nn([])), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(nn({
		top: 0,
		left: 0
	}));
	function d() {
		I(o, Xi(), !0);
		let e = W(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(u, {
			top: n,
			left: t
		}, !0), I(l, !0);
	}
	function f(e) {
		Zi(e), t.onpick?.(e), I(l, !1);
	}
	function p(e) {
		t.onicon?.(e), I(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Ri(n, 256);
		t.onimage?.(r.dataUrl), I(l, !1);
	}
	xn(() => {
		if (!W(l)) return;
		let e = (e) => {
			W(s) && !W(s).contains(e.target) && I(l, !1);
		}, t = (e) => {
			e.key === "Escape" && I(l, !1);
		}, n = (e) => {
			W(s) && e.target instanceof Node && !W(s).contains(e.target) && I(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = fa(), _ = L(g), v = L(_), y = (e) => {
		var t = ra();
		B(() => ii(t, "src", i())), q(e, t);
	}, b = (e) => {
		var t = ia();
		X(t, () => na(r()), !0), k(t), q(e, t);
	}, x = (e) => {
		var t = Or();
		B(() => J(t, n() || "★")), q(e, t);
	};
	Y(v, (e) => {
		i() ? e(y) : r() && ea[r()] ? e(b, 1) : e(x, -1);
	}), k(_);
	var S = z(_, 2), ee = (e) => {
		var i = da(), a = L(i), s = (e) => {
			var t = oa(), n = z(R(t), 2);
			zr(n, 20, () => W(o), (e) => e, (e, t) => {
				var n = aa(), r = L(n, !0);
				k(n), B(() => J(r, t)), G("click", n, () => f(t)), q(e, n);
			}), k(n), q(e, t);
		};
		Y(a, (e) => {
			W(o).length && e(s);
		});
		var l = z(a, 2), d = (e) => {
			var t = kr();
			zr(R(t), 17, () => ta, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => m(W(t), 2));
				let i = () => W(n)[0], a = () => W(n)[1];
				var o = ca(), s = R(o), c = L(s, !0);
				k(s);
				var l = z(s, 2);
				zr(l, 20, a, (e) => e, (e, t) => {
					var n = sa();
					let i;
					var a = L(n);
					X(a, () => na(t), !0), k(a), k(n), B(() => {
						i = Xr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), ii(n, "title", ea[t].label);
					}), G("click", n, () => p(t)), q(e, n);
				}), k(l), B(() => J(c, i())), q(e, o);
			}), q(e, t);
		};
		Y(l, (e) => {
			t.onicon && e(d);
		});
		var g = z(l, 2);
		zr(g, 17, () => Ji, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = ca(), s = R(o), c = L(s, !0);
			k(s);
			var l = z(s, 2);
			zr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = la();
				let i;
				var a = L(r, !0);
				k(r), B(() => {
					i = Xr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), J(a, t);
				}), G("click", r, () => f(t)), q(e, r);
			}), k(l), B(() => J(c, i())), q(e, o);
		});
		var _ = z(g, 2), v = (e) => {
			var t = ua(), n = z(R(t), 2), r = z(n, 2);
			fi(r, (e) => I(c, e), () => W(c)), A(2), G("click", n, () => W(c).click()), G("change", r, h), q(e, t);
		};
		Y(_, (e) => {
			t.onimage && e(v);
		}), k(i), B(() => Qr(i, `top: ${W(u).top ?? ""}px; left: ${W(u).left ?? ""}px`)), q(e, i);
	};
	Y(S, (e) => {
		W(l) && e(ee);
	}), k(g), fi(g, (e) => I(s, e), () => W(s)), B(() => {
		ii(_, "title", a()), ii(_, "aria-label", a());
	}), G("click", _, () => W(l) ? I(l, !1) : d()), q(e, g), Ke();
}
xr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function ma(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n);
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
function ha(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function ga(e, t, n) {
	let r = n === "full" ? 1 : Math.min(1, ha(e, t));
	return Math.max(.1, r);
}
//#endregion
//#region src/lib/Dropdown.svelte
var _a = /* @__PURE__ */ K("<button type=\"button\"> </button>"), va = /* @__PURE__ */ K("<div class=\"dd-pop svelte-vtocc6\"></div>"), ya = /* @__PURE__ */ K("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	Ge(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(nn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = W(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		I(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (W(o)) {
				I(o, !1);
				return;
			}
			u(), I(o, !0);
		}
	}
	function f(e) {
		I(o, !1), t.onchange?.(e);
	}
	xn(() => {
		if (!W(o)) return;
		let e = (e) => {
			W(s) && !W(s).contains(e.target) && I(o, !1);
		}, t = (e) => {
			e.key === "Escape" && I(o, !1);
		}, n = (e) => {
			W(s) && e.target instanceof Node && !W(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = ya(), h = L(p), g = L(h), _ = L(g, !0);
	k(g);
	var v = z(g, 2), y = L(v, !0);
	k(v), k(h);
	var b = z(h, 2), x = (e) => {
		var t = va();
		zr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(W(t), 2));
			let i = () => W(r)[0], a = () => W(r)[1];
			var o = _a();
			let s;
			var c = L(o, !0);
			k(o), B(() => {
				s = Xr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), J(c, a());
			}), G("click", o, () => f(i())), q(e, o);
		}), k(t), B(() => Qr(t, `top: ${W(c).top ?? ""}px; left: ${W(c).left ?? ""}px; min-width: ${W(c).width ?? ""}px`)), q(e, t);
	};
	Y(b, (e) => {
		W(o) && e(x);
	}), k(p), fi(p, (e) => I(s, e), () => W(s)), B((e) => {
		ii(h, "title", i()), h.disabled = a(), J(_, e), J(y, W(o) ? "▴" : "▾");
	}, [() => l()]), G("click", h, d), q(e, p), Ke();
}
xr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ba = /* @__PURE__ */ K("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function xa(e, t) {
	Ge(t, !0);
	let n = pi(t, "image", 3, ""), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(1), o = /* @__PURE__ */ F(.5), s = /* @__PURE__ */ F(.5), c = /* @__PURE__ */ F(1), l = /* @__PURE__ */ F(1), u = /* @__PURE__ */ F(1);
	xn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			I(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !W(i)) return;
		e.filter = `brightness(${W(c)}) contrast(${W(l)}) saturate(${W(u)})`;
		let n = Math.max(t / W(i).width, t / W(i).height) * W(a), r = W(i).width * n, d = W(i).height * n, f = t / 2 - W(o) * r, p = t / 2 - W(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(W(i), f, p, r, d), e.filter = "none";
	}
	xn(() => {
		W(i), W(a), W(o), W(s), W(c), W(l), W(u), W(r) && d(W(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!W(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / W(i).width, 220 / W(i).height) * W(a), c = W(i).width * r, l = W(i).height * r, u = (e) => {
			I(o, Math.min(1, Math.max(0, W(o) - (e.clientX - t) / c)), !0), I(s, Math.min(1, Math.max(0, W(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		I(a, 1), I(o, .5), I(s, .5), I(c, 1), I(l, 1), I(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ba(), g = L(h), _ = z(L(g), 2), v = L(_);
	ii(v, "width", 220), ii(v, "height", 220), fi(v, (e) => I(r, e), () => W(r)), A(2), k(_);
	var y = z(_, 2), b = z(L(y)), x = L(b);
	k(b), k(y);
	var S = z(y, 2);
	Z(S);
	var ee = z(S, 2), C = z(L(ee)), te = L(C);
	k(C), k(ee);
	var ne = z(ee, 2);
	Z(ne);
	var re = z(ne, 2), ie = z(L(re)), ae = L(ie);
	k(ie), k(re);
	var oe = z(re, 2);
	Z(oe);
	var se = z(oe, 2), ce = z(L(se)), le = L(ce);
	k(ce), k(se);
	var ue = z(se, 2);
	Z(ue);
	var de = z(ue, 2), fe = L(de), pe = z(fe, 2);
	k(de);
	var me = z(de, 2), he = L(me), ge = z(he, 2);
	k(me), k(g), k(h), B((e, t, n, r) => {
		J(x, `${e ?? ""}x`), J(te, `${t ?? ""}%`), J(ae, `${n ?? ""}%`), J(le, `${r ?? ""}%`);
	}, [
		() => W(a).toFixed(2),
		() => Math.round(W(c) * 100),
		() => Math.round(W(l) * 100),
		() => Math.round(W(u) * 100)
	]), G("pointerdown", v, f), ci(S, () => W(a), (e) => I(a, e)), ci(ne, () => W(c), (e) => I(c, e)), ci(oe, () => W(l), (e) => I(l, e)), ci(ue, () => W(u), (e) => I(u, e)), G("click", fe, () => I(u, 0)), G("click", pe, p), G("click", he, () => t.oncancel?.()), G("click", ge, m), q(e, h), Ke();
}
xr(["pointerdown", "click"]);
//#endregion
//#region ../template/assets/engine/migrate.js
function Sa(e, t) {
	if (!t) return {
		ok: !1,
		version: e.version,
		props: e.props,
		placeholder: "unknown-type"
	};
	if (e.version > t.version) return {
		ok: !1,
		version: e.version,
		props: e.props,
		placeholder: "newer-than-engine"
	};
	let n = e.version, r = e.props;
	for (; n < t.version;) {
		let i = t.migrations && t.migrations[n];
		if (typeof i != "function") return {
			ok: !1,
			version: e.version,
			props: e.props,
			placeholder: "missing-migration"
		};
		r = i(structuredClone(r)), n++;
	}
	return {
		ok: !0,
		version: n,
		props: r
	};
}
var Ca = (e) => Math.round(e * 100) / 100;
function wa(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var Ta = {
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
					x: Ca(n.x * 100 / r.columns),
					w: Ca(n.w * 100 / r.columns),
					y: n.y * r.rowHeight,
					h: n.h * r.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= wa(t.grid);
		return e;
	}
}, Ea = { 1: (e) => (e.grid = wa(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function Da(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = Ea[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Oa(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = Ta[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/plugins.js
function ka(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Aa = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function ja(e, t) {
	let n = ka(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = ka(t[2]), a = Aa(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Ma = /^[a-z0-9][a-z0-9-]*$/;
function Na(e) {
	let t = [];
	return !e || typeof e != "object" ? ["manifestet er ikke et objekt"] : (Ma.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), ka(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler"), (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), t);
}
//#endregion
//#region ../template/assets/engine/sections/presets.js
function Pa(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/theme.js
function Fa(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Ia = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function La(e) {
	return typeof e == "string" && Ia.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Ra(e) {
	let t = e.tokens || {}, n = Fa(e, "light"), r = Fa(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			La(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && La(u) && La(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && La(u) && La(d) && s.push({
				group: e,
				name: l,
				lv: u,
				dv: d
			}));
		}
	}
	let l = o.length > 0 || s.length > 0, u = `:root {\n  color-scheme: ${l ? "light dark" : i};\n${a.join("\n")}\n}\n`;
	if (!l) return u;
	let d = [];
	for (let e of o) {
		let t = `light-dark(${e.lv}, ${e.dv})`;
		d.push(`    --urd-color-${e.name}: ${t};`), d.push(`    --urd-base-${e.name}: ${t};`);
	}
	if (u += "@supports (color: light-dark(#000, #fff)) {\n", d.length && (u += `  :root {\n${d.join("\n")}\n  }\n`), u += "  :root[data-urd-theme=\"light\"] { color-scheme: light; }\n", u += "  :root[data-urd-theme=\"dark\"] { color-scheme: dark; }\n", s.length) {
		let e = (e) => s.map((t) => `    --urd-${t.group}-${t.name}: ${e(t)};`).join("\n");
		u += `  @media (prefers-color-scheme: dark) {\n    :root {\n${s.map((e) => `      --urd-${e.group}-${e.name}: ${e.dv};`).join("\n")}\n    }\n  }\n`, u += `  :root[data-urd-theme="light"] {\n${e((e) => e.lv)}\n  }\n`, u += `  :root[data-urd-theme="dark"] {\n${e((e) => e.dv)}\n  }\n`;
	}
	return u += "}\n", u;
}
function za(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var Ba = {
	flate: {
		"--urd-color-bg": "var(--urd-base-surface)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 7%, var(--urd-base-surface))"
	},
	aksent: {
		"--urd-color-bg": "var(--urd-base-accent)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 82%, #000)",
		"--urd-color-text": "var(--urd-base-accent-text)",
		"--urd-color-accent": "var(--urd-base-accent-text)",
		"--urd-color-accent-text": "var(--urd-base-accent)"
	},
	invers: {
		"--urd-color-bg": "var(--urd-base-text)",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 78%, var(--urd-base-bg))",
		"--urd-color-text": "var(--urd-base-bg)"
	}
}, Va = {
	flate: "Flate",
	aksent: "Aksent",
	invers: "Invers"
};
[...new Set(Object.values(Ba).flatMap(Object.keys))];
function Ha(e) {
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
function Ua(e, t) {
	let n = Ha(e), r = Ha(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var Wa = {
	version: 1,
	label: "Farge",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = za(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Ga = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Ka(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function qa(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Ja(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Ya(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${za(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Xa(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Ga[t] ?? []).includes(e.animation) ? e.animation : null, r = Ka(e.stops), i = r.map((e) => `${za(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: qa(r),
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
function Za(e) {
	let t = Array.isArray(e) && e.length ? e : ["#0b0e14", "#1a1030"], n = (e) => t.length === 1 ? 0 : Math.round(e * 100 / (t.length - 1));
	return t.map((e, t) => e && typeof e == "object" ? {
		color: e.color ?? "#0b0e14",
		at: typeof e.at == "number" ? e.at : n(t)
	} : {
		color: e,
		at: n(t)
	});
}
function Qa(e) {
	let t = [...Za(e)].sort((e, t) => e.at - t.at), n = [
		0,
		...t.slice(0, -1).map((e, n) => (e.at + t[n + 1].at) / 2),
		100
	];
	return t.map((e, t) => ({
		color: e.color,
		share: Math.round((n[t + 1] - n[t]) * 10) / 10
	}));
}
var $a = /* @__PURE__ */ new Set(), eo = !1;
function to(e) {
	$a.add(e), !(eo || typeof window > "u") && (eo = !0, window.addEventListener("resize", () => {
		for (let e of [...$a]) e() || $a.delete(e);
	}));
}
var no = !1;
function ro() {
	if (!no) {
		no = !0;
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
var io = {
	version: 3,
	label: "Gradient",
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
	migrations: {
		1: (e) => ({
			...e,
			kind: "linear",
			x: .5,
			y: .5,
			stops: Za(e.stops)
		}),
		2: (e) => ({
			kind: e.kind === "radial" ? "radial" : "linear",
			stops: Qa(e.stops),
			angle: e.angle ?? 160,
			x: e.x ?? .5,
			y: e.y ?? .5,
			animation: e.animate ? e.kind === "radial" ? "orbit" : "pan" : "none",
			opacity: e.opacity ?? 1
		})
	},
	render(e, t) {
		let n = Xa(t);
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
					let e = Ja(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Ya(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), to(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && ro());
	}
}, ao = {
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
		let n = za(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, oo = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", so = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = oo, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, co = .4;
function lo(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function uo(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function fo(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function po(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * co * t;
	return Math.round(Math.min(i, r * e));
}
function mo(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * co, s = i ?? po(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var ho = /* @__PURE__ */ new Set(), go = !1, _o = 0;
function vo() {
	_o = 0;
	for (let e of [...ho]) e() || ho.delete(e);
}
function yo() {
	_o ||= requestAnimationFrame(vo);
}
function bo(e) {
	ho.add(e), e(), !(go || typeof window > "u") && (go = !0, window.addEventListener("scroll", yo, { passive: !0 }), window.addEventListener("resize", yo, { passive: !0 }));
}
function xo(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = po(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = mo(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	bo(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function So() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Co = /* @__PURE__ */ new Set(), wo = !1, To = 0;
function Eo() {
	To = 0;
	for (let e of [...Co]) e() || Co.delete(e);
}
function Do() {
	!To && typeof requestAnimationFrame == "function" && (To = requestAnimationFrame(Eo));
}
function Oo(e) {
	Co.add(e), e(), !(wo || typeof window > "u") && (wo = !0, window.addEventListener("resize", Do, { passive: !0 }));
}
function ko(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = po(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Oo(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Ao = {
	version: 2,
	label: "Bilde",
	defaults: () => ({
		src: "",
		fit: "vanlig",
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
		parallax: e.parallax ?? 0
	}) },
	render(e, t) {
		if (!t.src) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = fo(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = uo(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = lo(t.x, t.y);
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
		if (e.appendChild(n), t.parallax > 0) {
			let e = t.fit ?? "cover";
			So() ? ko(n, t.parallax, i, e) : xo(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/galleri-model.js
function jo(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Mo({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function No(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/backgrounds/bildegalleri.js
var Po = {
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
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = uo(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = lo(n.x, n.y);
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
		if (!Mo({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(No(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = jo(l, 1, n.length), r = new Image();
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
};
//#endregion
//#region ../template/assets/engine/footer-thumb.js
function Fo(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Io(n, e.baselineLinks), o + "</svg>";
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
	return o += Io(n, e.baselineLinks), o + "</svg>";
}
function Io(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/animations/core.js
var Lo = () => ({
	duration: 600,
	delay: 0
}), Ro = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: Lo,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: Lo,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: Lo,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	},
	stagger: {
		version: 1,
		label: "Stagger (kortgruppe)",
		entrance: !0,
		group: !0,
		defaults: () => ({
			duration: 600,
			step: 90,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, zo = [
	["System", "system-ui, sans-serif"],
	["Arial", "Arial, Helvetica, sans-serif"],
	["Verdana", "Verdana, Geneva, sans-serif"],
	["Trebuchet", "'Trebuchet MS', sans-serif"],
	["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
	["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
	["Courier (skrivemaskin)", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/place.js
function Bo(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var Vo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ho = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fargen\"></button>"), Uo = /* @__PURE__ */ K("<span><span class=\"grad-grip svelte-1n46o8q\" title=\"Dra for å endre fargenes rekkefølge\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvor mye plass fargen tar; 0 gir en hard kant mot nabofargen\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Wo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sentrum X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Sentrum Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Go = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Ko = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <!> <button class=\"ghost action svelte-1n46o8q\" title=\"Ny farge nederst i listen; dra i håndtaket for rekkefølgen\">+ Legg til farge</button> <!> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label title=\"Gjelder selve gradienten - uavhengig av Animasjon-valget nederst, som gjelder innholdet\" class=\"svelte-1n46o8q\">Bevegelse <!></label>", 1), qo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Jo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Yo = /* @__PURE__ */ K("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\" title=\"Fyll seksjonen (beskjærer)\">Dekk</button> <button type=\"button\" class=\"ghost svelte-1n46o8q\" title=\"Vis hele bildet\">Vis hele</button></div> <label title=\"Dra punktet eller bruk sliderne. 50 % = sentrert. Gå under 0 % / over 100 % for å legge motivet delvis eller helt utenfor kanten.\" class=\"svelte-1n46o8q\">Posisjon</label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\">Vannrett <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\">Loddrett <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xo = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Parallaksestyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label title=\"Lar parallaksen flyte forbi seksjonskanten inn i naboseksjonen. Vises der naboen er gjennomsiktig.\" class=\"svelte-1n46o8q\">Flyt inn i nabo <!></label>", 1), Zo = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label title=\"Vanlig plasserer bildet fritt med valgt størrelse og posisjon. Flislegg gjentar bildet som et mønster.\" class=\"svelte-1n46o8q\">Tilpasning <!></label> <label title=\"Skala relativt til seksjonsbredden: 100 % = like bred som seksjonen. Dekk fyller seksjonen (beskjærer); Vis hele viser hele bildet.\" class=\"svelte-1n46o8q\">Størrelse</label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" title=\"Mindre\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" title=\"Større\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bildet henger etter når man ruller. Av på mobil og ved redusert bevegelse.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Parallakse</label> <!>", 1), Qo = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), $o = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig; komprimeres til webp\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Overgang <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnen blar gjennom bildene med myk overgang. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første.</p>", 1), es = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), ts = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button>", 1), ns = /* @__PURE__ */ K("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://… eller #anker\" title=\"Ekstern lenke (https://…, mailto:, tel:) eller anker til en seksjon: #ankeret på samme side, /siden#ankeret fra en annen side. Ankeret kopieres fra seksjonens Egenskaper.\"/>"), rs = /* @__PURE__ */ K("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Lenketeksten\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern lenken\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), is = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Skyggefarge <!></label>"), as = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kantfarge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse (px) <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" title=\"Tynnere\" aria-label=\"Tynnere\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" title=\"Tykkere\" aria-label=\"Tykkere\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), os = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Blokkfarge <!></label> <label class=\"svelte-1n46o8q\">Skygge <!></label> <!> <label class=\"svelte-1n46o8q\">Kantlinje <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Frostet glass: gjennomskinnelig kort med uskarp bakgrunn - best over bilder og gradienter\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glass-effekt (frostet)</label>", 1), ss = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <!>", 1), cs = /* @__PURE__ */ K("<span class=\"nav-line svelte-1n46o8q\"><input title=\"Spørsmålsteksten (svaret skrives rett i blokken)\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern spørsmålet\"></button></span></span>"), ls = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Ellers lukkes forrige svar når et nytt åpnes\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Flere svar åpne samtidig</label> <p class=\"panel-strong svelte-1n46o8q\">Spørsmål</p> <!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt spørsmål</button> <p class=\"panel-strong svelte-1n46o8q\">Kortstil</p> <!>", 1), us = /* @__PURE__ */ K("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), ds = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), fs = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label>"), ps = /* @__PURE__ */ K("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), ms = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), hs = /* @__PURE__ */ K("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/>"), gs = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Tilbake til tegnet/emojien\">Fjern tegnet ikon</button>"), _s = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), vs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Ikon <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Temafarge eller egen farge. Gjelder tegnede ikoner og tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), ys = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), bs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Luft mellom bildene <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), xs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Ss = /* @__PURE__ */ K("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri - vinner over fullskjerm\" class=\"svelte-1n46o8q\"/></label></div>"), Cs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Visning <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\">Klikk et bilde i forhåndsvisningen for utsnitt, zoom og filtre (bildeeditoren).</p>", 1), ws = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Ts = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">Innstillinger …</button> <p class=\"panel-hint svelte-1n46o8q\">Åpner blokkens innstillinger i forhåndsvisningen.</p>", 1), Es = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Ds = /* @__PURE__ */ K("<label title=\"Avstanden fra vinduets topp mens blokken er festet; en klistret meny kan kreve større avstand\" class=\"svelte-1n46o8q\">Avstand fra toppen <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label title=\"Hvor festingen slutter: ved egen seksjon, eller først når en senere seksjon er passert\" class=\"svelte-1n46o8q\">Slipp taket <!></label>", 1), Os = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Blokken blir stående ved vindustoppen mens besøkende scroller. Prøv i Ren visning; gjelder ikke mobil.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fest ved scrolling</label> <!>", 1), ks = /* @__PURE__ */ K("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), As = /* @__PURE__ */ K("<!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Spilles når blokken scrolles inn hos besøkende; her spilles den én gang hver gang du endrer den\" class=\"svelte-1n46o8q\">Animasjon inn <!></label> <!> <label title=\"Effekt mens pekeren er over blokken; kan kombineres med animasjonen inn\" class=\"svelte-1n46o8q\">Ved peker <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), js = /* @__PURE__ */ K("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), Ms = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span> <span class=\"zoomswitch svelte-1n46o8q\"><button title=\"Tilpass lerretet til vinduet\"></button> <button title=\"Faktisk størrelse (100%)\">100%</button> <span class=\"zoom-readout svelte-1n46o8q\" title=\"Gjeldende zoom\"> </span></span> <button title=\"Hjelpelinjer: senter og innholdsbredde i alle seksjoner\"></button>", 1), Ns = /* @__PURE__ */ K("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), Ps = /* @__PURE__ */ K("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span> <button> </button>", 1), Fs = /* @__PURE__ */ K("<!> Ren visning", 1), Is = /* @__PURE__ */ K("<!> Rediger", 1), Ls = /* @__PURE__ */ K("<span class=\"who svelte-1n46o8q\"><!> </span>"), Rs = /* @__PURE__ */ K("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), zs = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Bs = /* @__PURE__ */ K("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Vs = /* @__PURE__ */ K("<button> </button>"), Hs = /* @__PURE__ */ K("<!> <!>", 1), Us = /* @__PURE__ */ K("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Ws = /* @__PURE__ */ K("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Gs = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), Ks = /* @__PURE__ */ K("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), qs = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Js = /* @__PURE__ */ K("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), Ys = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Xs = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), Zs = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt den flytende menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt menyen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over menyen</label>", 1), Qs = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Menyen legges oppå toppseksjonen i stedet for i eget bånd over den, så en gjennomsiktig meny viser hero bak seg. Toppseksjonen bør ha nok klaring øverst.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Legg menyen oppå toppseksjonen</label>"), $s = /* @__PURE__ */ K("<label title=\"Justeringen av menypunktene inne i kolonnen\" class=\"svelte-1n46o8q\">Tekstjustering <!></label>"), ec = /* @__PURE__ */ K("<label title=\"Krymp: menyen blir kompakt etter et stykke scrolling. Skjul: menyen glir ut ved scrolling nedover og kommer tilbake ved scrolling oppover. Øverst på siden er den alltid normal. Prøves i Ren visning.\" class=\"svelte-1n46o8q\">Ved scrolling <!></label>"), tc = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <!>", 1), nc = /* @__PURE__ */ K("<label title=\"Hvor sterk gløden bak teksten er\" class=\"svelte-1n46o8q\">Glødstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), rc = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\"> <!></label>"), ic = /* @__PURE__ */ K("<label title=\"Fargen på pille-punktene (standard er undermenyens flate)\" class=\"svelte-1n46o8q\">Punktfarge <!></label>"), ac = /* @__PURE__ */ K("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), oc = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), sc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Sidestilt meny: dra i kolonnekanten i forhåndsvisningen for å endre bredden; på mobil og trange vinduer vises den som topplinje\" class=\"svelte-1n46o8q\">Navigasjonsmeny <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når bakgrunnen er gjennomsiktig)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Størrelse <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <!> <!> <label title=\"Tekstfargen når pekeren er over et menypunkt\" class=\"svelte-1n46o8q\">Tekstfarge ved hover <!></label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Undermeny</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Design <!></label> <!> <label title=\"Punktene i undermenyen legges i rutenett: 2 kolonner gir 2x2, 2x3 osv.\" class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), cc = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), lc = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), uc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><label title=\"Vises i nettleserfanen etter sidenavnet, og som standardtekst i menylogoen\" class=\"svelte-1n46o8q\">Navn <input placeholder=\"Navn på nettstedet\" class=\"svelte-1n46o8q\"/></label> <label title=\"Kort beskrivelse av nettstedet - brukt av søkemotorer og ved deling\" class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"Kort om nettstedet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), dc = /* @__PURE__ */ K("<div class=\"tpv-cap svelte-1n46o8q\"> </div>"), fc = /* @__PURE__ */ K("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\">Overskrift</div> <div class=\"tpv-card svelte-1n46o8q\">Litt brødtekst på et kort.</div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\">Knapp</span><span class=\"tpv-lnk svelte-1n46o8q\">Lenke</span></div></div></div>"), pc = /* @__PURE__ */ K("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), mc = /* @__PURE__ */ K("<div class=\"autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\">Mørke farger</span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\">Auto</button> <button type=\"button\">Egne</button></span></div>"), hc = /* @__PURE__ */ K("<span class=\"palname svelte-1n46o8q\">Lys</span>"), gc = /* @__PURE__ */ K("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), _c = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Avledet fra de lyse fargene - klikk en rute for å styre dem selv.</p>"), vc = /* @__PURE__ */ K("<div class=\"palhead svelte-1n46o8q\"><span class=\"palname svelte-1n46o8q\">Mørk</span> <button type=\"button\" title=\"Sett mørk som standard\">Standard</button></div> <div></div> <!>", 1), yc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\">Tema-forslag</p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\">Farger</p> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gir siden en sol/måne-bryter i menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Lys og mørk modus</label> <!> <div class=\"palhead svelte-1n46o8q\"><!> <button type=\"button\" title=\"Modusen nye besøkende ser først\">Standard</button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Typografi</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <div class=\"typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\">Overskrift</div> <div class=\"ts-b svelte-1n46o8q\">Litt brødtekst i valgt skrift - slik leser folk innholdet ditt.</div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Form (hjørner)</summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\">Knapp</span> <span class=\"fp-card svelte-1n46o8q\">Kort</span></div> <label class=\"rng-lab svelte-1n46o8q\">Små hjørner<span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"rng-lab svelte-1n46o8q\">Store hjørner<span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), bc = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\"> </button>"), xc = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Sc = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Cc = /* @__PURE__ */ K("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <button class=\"ghost svelte-1n46o8q\" title=\"Spørsmål og svar der svaret foldes ut ved klikk\">FAQ</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Galleri</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Bildegalleri med rutenett-, karusell- eller lysbildevisning\">Tomt galleri</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg flere bilder samtidig og få dem rett inn i et galleri\">Galleri med bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), wc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Tc = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Ec = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Dc = /* @__PURE__ */ K("<label title=\"Tid mellom hvert kort (En etter en) eller hver kolonne (Kolonnevis)\" class=\"svelte-1n46o8q\">Trinn ms <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label title=\"En etter en: hvert kort ett trinn etter forrige. Kolonnevis: kort i samme kolonne kommer samtidig, bølgen skyves bortover.\" class=\"svelte-1n46o8q\">Mønster <!></label>", 1), Oc = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>"), kc = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Ac = /* @__PURE__ */ K("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Ferdig fargerolle for seksjonen: overstyrer temaets farger på denne seksjonen (Aksent-flate, mørkt kontrastbånd o.l.). Følger lys/mørk automatisk.\" class=\"svelte-1n46o8q\">Seksjonstema <!></label> <label title=\"Seksjonens ankermål for lenker: lim inn i lenkefeltet på footer-kolonner, menypunkter eller knapper. Samme side: #ankeret - fra en annen side: /siden#ankeret.\" class=\"svelte-1n46o8q\">Anker <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Kopier ankeret\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Spilles når seksjonen scrolles inn hos besøkende; her spilles den én gang hver gang du endrer den\" class=\"svelte-1n46o8q\">Animasjon inn <!></label> <!> <label title=\"Effekt mens pekeren er over seksjonen; kan kombineres med animasjonen inn\" class=\"svelte-1n46o8q\">Ved peker <!></label>", 1), jc = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Mc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Nc = /* @__PURE__ */ K("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fjern haken for å skjule footeren på denne siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Pc = /* @__PURE__ */ K("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Vis på sider</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Fc = /* @__PURE__ */ K("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Ic = /* @__PURE__ */ K("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern logoen\"></button>"), Lc = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Logohøyde <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Rc = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp; materialiseres til media/ ved publisering\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), zc = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Kolonnens overskrift\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til lenke i kolonnen\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern kolonnen\"></button></span></div> <!>", 1), Bc = /* @__PURE__ */ K("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern lenken\"></button></span> <input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://… / mailto:…\"/></div>"), Vc = /* @__PURE__ */ K("<input placeholder=\"https://… / mailto:… / #anker\" title=\"Ekstern lenke (https://…, mailto:, tel:) eller anker til en seksjon: #ankeret på samme side, /siden#ankeret fra en annen side. Ankeret kopieres fra seksjonens Egenskaper.\" class=\"svelte-1n46o8q\"/>"), Hc = /* @__PURE__ */ K("<label title=\"Hvor knappen går\" class=\"svelte-1n46o8q\">Knappen går til <!></label> <!>", 1), Uc = /* @__PURE__ */ K("<label title=\"Skjema-adresse fra en tjeneste (Formspree/Mailchimp/Buttondown) eller egen Cloudflare-function; sendes med fetch. Ekstern vert krever at du legger connect-src for verten i _headers.\" class=\"svelte-1n46o8q\">Nyhetsbrev-endepunkt <input placeholder=\"https://formspree.io/f/…\" class=\"svelte-1n46o8q\"/></label> <label title=\"Fallback når endepunkt mangler: åpner e-post til denne adressen\" class=\"svelte-1n46o8q\">Mottaker (fallback) <input placeholder=\"post@dinforening.no\" class=\"svelte-1n46o8q\"/></label> <label title=\"Bekreftelsen som vises etter påmelding\" class=\"svelte-1n46o8q\">Bekreftelse <input placeholder=\"Takk, du er påmeldt!\" class=\"svelte-1n46o8q\"/></label>", 1), Wc = /* @__PURE__ */ K("<label title=\"Knapp går til en side/lenke; nyhetsbrev tar imot e-post\" class=\"svelte-1n46o8q\">Type <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Stor, sentrert variant (Stor CTA-stilen)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Stor sentrert</label> <label title=\"Overskrift over knappen/feltet\" class=\"svelte-1n46o8q\">Overskrift <input placeholder=\"Klar til å bli med?\" class=\"svelte-1n46o8q\"/></label> <label title=\"Kort undertekst\" class=\"svelte-1n46o8q\">Undertekst <input class=\"svelte-1n46o8q\"/></label> <label title=\"Teksten på knappen\" class=\"svelte-1n46o8q\">Knappetekst <input placeholder=\"Bli medlem\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Gc = /* @__PURE__ */ K("<label title=\"Justering av innholdet (mest merkbart uten kolonner)\" class=\"svelte-1n46o8q\">Justering <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Kc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Footeren redigeres ett sted og vises nederst på alle sider (unntatt sider du skrur av under «Vis på sider»)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer</label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Startpunkt</summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Merkevare</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Navnet øverst i footeren. Tomt = ingen merkevare\" class=\"svelte-1n46o8q\">Tittel <input placeholder=\"Min forening\" class=\"svelte-1n46o8q\"/></label> <label title=\"Kort undertekst under navnet\" class=\"svelte-1n46o8q\">Tagline <input class=\"svelte-1n46o8q\"/></label> <label title=\"Vis merket som tekst, opplastet logo (bilde) eller begge\" class=\"svelte-1n46o8q\">Vis merke som <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Kolonner</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny kolonne</button> <label title=\"Når en kolonne har mange lenker deles den i to underkolonner - her velger du om overskriften står til venstre eller midtstilt over paret\" class=\"svelte-1n46o8q\">Justering av delt kolonne <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Sosiale lenker</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny sosial lenke</button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Handlingsoppfordring</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\" title=\"En knapp eller nyhetsbrev-påmelding i footeren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis handlingsoppfordring</label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lenkerad (sentrert)</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny lenke i raden</button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Bunnlinje</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Copyright/tekst til venstre i bunnlinja\" class=\"svelte-1n46o8q\">Copyright <input placeholder=\"© 2026 Min forening\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\">Lenker til høyre</p> <!> <button class=\"ghost action svelte-1n46o8q\">+ Ny bunnlinje-lenke</button></div></details></div>"), qc = /* @__PURE__ */ K("<label class=\"svelte-1n46o8q\">Samling <!></label>"), Jc = /* @__PURE__ */ K("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), Yc = /* @__PURE__ */ K("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), Xc = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), Zc = /* @__PURE__ */ K("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Qc = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), $c = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), el = /* @__PURE__ */ K("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), tl = /* @__PURE__ */ K("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), nl = /* @__PURE__ */ K("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), rl = /* @__PURE__ */ K("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), il = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), al = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), ol = /* @__PURE__ */ K("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), sl = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), cl = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), ll = /* @__PURE__ */ K("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), ul = /* @__PURE__ */ K("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), dl = /* @__PURE__ */ K("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), fl = /* @__PURE__ */ K("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), pl = /* @__PURE__ */ K("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), ml = /* @__PURE__ */ K("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), hl = /* @__PURE__ */ K("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div></div>"), gl = /* @__PURE__ */ K("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), _l = /* @__PURE__ */ K("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), vl = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), yl = /* @__PURE__ */ K("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), bl = /* @__PURE__ */ K("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), xl = /* @__PURE__ */ K("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Lukk (Esc)\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Sl = /* @__PURE__ */ K("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><span class=\"brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <!> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function Cl(e, t) {
	Ge(t, !0);
	let n = (e, t = d, n = d) => {
		var r = ts(), i = z(R(r), 2);
		zr(i, 17, n, Fr, (e, r, i) => {
			var a = es(), s = L(a), l = L(s);
			{
				let e = /* @__PURE__ */ N(() => o.map(([e, t]) => [e, t.label]));
				$(l, {
					get value() {
						return W(r).type;
					},
					title: "Bytt lagtype (innstillingene nullstilles)",
					get options() {
						return W(e);
					},
					onchange: (e) => $t(t(), i, e)
				});
			}
			var u = z(l, 2), d = L(u);
			d.disabled = i === 0, X(d, () => c.up, !0), k(d);
			var f = z(d, 2);
			X(f, () => c.down, !0), k(f);
			var p = z(f, 2);
			X(p, () => c.cross, !0), k(p), k(u), k(s);
			var m = z(s, 2), h = (e) => {
				var n = Vo(), a = R(n), o = z(L(a));
				{
					let e = /* @__PURE__ */ N(hn);
					Pi(o, {
						get value() {
							return W(r).props.value;
						},
						get tokens() {
							return W(e);
						},
						label: "Lagets farge",
						onchange: (e) => It(t(), i, "value", e)
					});
				}
				k(a);
				var s = z(a, 2), c = z(L(s)), l = L(c);
				k(c), k(s);
				var u = z(s, 2);
				Z(u), B((e) => {
					J(l, `${e ?? ""}%`), Q(u, W(r).props.opacity ?? 1);
				}, [() => Math.round((W(r).props.opacity ?? 1) * 100)]), G("input", u, (e) => It(t(), i, "opacity", Number(e.target.value))), q(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ N(() => Ht(W(r))), a = /* @__PURE__ */ N(() => W(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Ko(), s = R(o), l = z(L(s));
				{
					let e = /* @__PURE__ */ N(() => W(n).kind ?? "linear");
					$(l, {
						get value() {
							return W(e);
						},
						options: [["linear", "Lineær"], ["radial", "Radiell (fra et punkt)"]],
						onchange: (e) => Kt(t(), i, e)
					});
				}
				k(s);
				var u = z(s, 2);
				zr(u, 17, () => W(n).stops, Fr, (e, r, o) => {
					var s = Uo();
					let l;
					var u = L(s), d = z(u, 2);
					{
						let e = /* @__PURE__ */ N(hn);
						Pi(d, {
							get value() {
								return W(r).color;
							},
							get tokens() {
								return W(e);
							},
							label: "Fargen",
							onchange: (e) => qt(t(), i, o, { color: e })
						});
					}
					var f = z(d, 2);
					Z(f);
					var p = z(f, 2), m = L(p);
					k(p);
					var h = z(p, 2), g = (e) => {
						var n = Ho();
						X(n, () => c.cross, !0), k(n), G("click", n, () => Yt(t(), i, o)), q(e, n);
					};
					Y(h, (e) => {
						W(n).stops.length > 2 && e(g);
					}), k(s), B((e) => {
						l = Xr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: W(Zt)?.layer === i && W(Zt).from === o,
							"drop-above": W(Zt)?.layer === i && W(Zt).insert === o,
							"drop-below": W(Zt)?.layer === i && W(Zt).insert === W(n).stops.length && o === W(n).stops.length - 1
						}), Q(f, W(r).share ?? 50), J(m, `${e ?? ""}%`);
					}, [() => W(a) > 0 ? Math.round(Math.max(0, Number(W(r).share) || 0) / W(a) * 100) : Math.round(100 / W(n).stops.length)]), G("pointerdown", u, (e) => Qt(t(), e, i, o)), G("input", f, (e) => qt(t(), i, o, { share: Number(e.target.value) })), q(e, s);
				});
				var d = z(u, 2), f = z(d, 2), p = (e) => {
					var r = Wo(), a = R(r), o = z(L(a)), s = L(o);
					k(o), k(a);
					var c = z(a, 2);
					Z(c);
					var l = z(c, 2), u = z(L(l)), d = L(u);
					k(u), k(l);
					var f = z(l, 2);
					Z(f), B((e, t) => {
						J(s, `${e ?? ""}%`), Q(c, W(n).x ?? .5), J(d, `${t ?? ""}%`), Q(f, W(n).y ?? .5);
					}, [() => Math.round((W(n).x ?? .5) * 100), () => Math.round((W(n).y ?? .5) * 100)]), G("input", c, (e) => Wt(t(), i, "x", Number(e.target.value))), G("input", f, (e) => Wt(t(), i, "y", Number(e.target.value))), q(e, r);
				}, m = (e) => {
					var r = Go(), a = R(r), o = z(L(a)), s = L(o);
					k(o), k(a);
					var c = z(a, 2);
					Z(c), B(() => {
						J(s, `${W(n).angle ?? ""}°`), Q(c, W(n).angle);
					}), G("input", c, (e) => Wt(t(), i, "angle", Number(e.target.value))), q(e, r);
				};
				Y(f, (e) => {
					(W(n).kind ?? "linear") === "radial" ? e(p) : e(m, -1);
				});
				var h = z(f, 2), g = z(L(h)), _ = L(g);
				k(g), k(h);
				var v = z(h, 2);
				Z(v);
				var y = z(v, 2), b = z(L(y));
				{
					let e = /* @__PURE__ */ N(() => W(n).animation ?? "none");
					$(b, {
						get value() {
							return W(e);
						},
						get options() {
							return Gt[(W(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Wt(t(), i, "animation", e)
					});
				}
				k(y), B((e) => {
					J(_, `${e ?? ""}%`), Q(v, W(n).opacity ?? 1);
				}, [() => Math.round((W(n).opacity ?? 1) * 100)]), G("click", d, () => Jt(t(), i)), G("input", v, (e) => Wt(t(), i, "opacity", Number(e.target.value))), q(e, o);
			}, _ = (e) => {
				var n = qo(), a = R(n), o = z(L(a));
				{
					let e = /* @__PURE__ */ N(hn);
					Pi(o, {
						get value() {
							return W(r).props.color;
						},
						get tokens() {
							return W(e);
						},
						label: "Glødens farge",
						onchange: (e) => It(t(), i, "color", e)
					});
				}
				k(a);
				var s = z(a, 2), c = z(L(s)), l = L(c);
				k(c), k(s);
				var u = z(s, 2);
				Z(u);
				var d = z(u, 2), f = z(L(d)), p = L(f);
				k(f), k(d);
				var m = z(d, 2);
				Z(m);
				var h = z(m, 2), g = z(L(h)), _ = L(g);
				k(g), k(h);
				var v = z(h, 2);
				Z(v);
				var y = z(v, 2), b = z(L(y)), x = L(b);
				k(b), k(y);
				var S = z(y, 2);
				Z(S), B((e, t, n, i) => {
					J(l, `${e ?? ""}%`), Q(u, W(r).props.x), J(p, `${t ?? ""}%`), Q(m, W(r).props.y), J(_, `${n ?? ""}%`), Q(v, W(r).props.radius), J(x, `${i ?? ""}%`), Q(S, W(r).props.opacity);
				}, [
					() => Math.round(W(r).props.x * 100),
					() => Math.round(W(r).props.y * 100),
					() => Math.round(W(r).props.radius * 100),
					() => Math.round(W(r).props.opacity * 100)
				]), G("input", u, (e) => It(t(), i, "x", Number(e.target.value))), G("input", m, (e) => It(t(), i, "y", Number(e.target.value))), G("input", v, (e) => It(t(), i, "radius", Number(e.target.value))), G("input", S, (e) => It(t(), i, "opacity", Number(e.target.value))), q(e, n);
			}, v = (e) => {
				var n = Jo(), a = R(n), o = z(L(a)), s = L(o);
				k(o), k(a);
				var c = z(a, 2);
				Z(c), B((e) => {
					J(s, `${e ?? ""}%`), Q(c, W(r).props.opacity);
				}, [() => Math.round(W(r).props.opacity * 100)]), G("input", c, (e) => It(t(), i, "opacity", Number(e.target.value))), q(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ N(() => W(r).props.fit === "flislegg" || W(r).props.fit === "repeat");
				var a = Zo(), o = R(a), s = L(o), c = z(s);
				k(o);
				var l = z(o, 2), u = z(L(l));
				{
					let e = /* @__PURE__ */ N(() => W(n) ? "flislegg" : "vanlig");
					$(u, {
						get value() {
							return W(e);
						},
						options: [["vanlig", "Vanlig"], ["flislegg", "Flislegg"]],
						onchange: (e) => It(t(), i, "fit", e)
					});
				}
				k(l);
				var d = z(l, 4), f = L(d), p = z(f, 2);
				Z(p);
				var m = z(p, 4);
				k(d);
				var h = z(d, 2), g = (e) => {
					var n = Yo(), a = R(n), o = L(a), s = z(o, 2);
					k(a);
					var c = z(a, 4), l = z(c, 2), u = z(L(l)), d = L(u);
					k(u), k(l);
					var f = z(l, 2);
					Z(f);
					var p = z(f, 2), m = z(L(p)), h = L(m);
					k(m), k(p);
					var g = z(p, 2);
					Z(g), B((e, t, n, i) => {
						Qr(c, `--fx:${e ?? ""}%; --fy:${t ?? ""}%`), J(d, `${n ?? ""}%`), Q(f, W(r).props.x ?? .5), J(h, `${i ?? ""}%`), Q(g, W(r).props.y ?? .5);
					}, [
						() => Math.max(0, Math.min(1, W(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, W(r).props.y ?? .5)) * 100,
						() => Math.round((W(r).props.x ?? .5) * 100),
						() => Math.round((W(r).props.y ?? .5) * 100)
					]), G("click", o, () => Vt(t(), i, W(r), "cover")), G("click", s, () => Vt(t(), i, W(r), "contain")), G("pointerdown", c, (e) => Lt(e, t(), i, "xy")), G("input", f, (e) => It(t(), i, "x", Number(e.target.value))), G("input", g, (e) => It(t(), i, "y", Number(e.target.value))), q(e, n);
				};
				Y(h, (e) => {
					W(n) || e(g);
				});
				var _ = z(h, 2), v = z(L(_)), y = L(v);
				k(v), k(_);
				var b = z(_, 2);
				Z(b);
				var x = z(b, 2), S = z(L(x)), ee = L(S);
				k(S), k(x);
				var C = z(x, 2);
				Z(C);
				var te = z(C, 2), ne = L(te);
				Z(ne), A(), k(te);
				var re = z(te, 2), ie = (e) => {
					var n = Xo(), a = R(n), o = z(L(a)), s = L(o);
					k(o), k(a);
					var c = z(a, 2);
					Z(c);
					var l = z(c, 2), u = z(L(l));
					{
						let e = /* @__PURE__ */ N(() => W(r).props.bleed ?? "none");
						$(u, {
							get value() {
								return W(e);
							},
							options: [
								["none", "Ingen"],
								["up", "Opp"],
								["down", "Ned"],
								["both", "Begge"]
							],
							onchange: (e) => It(t(), i, "bleed", e)
						});
					}
					k(l), B((e) => {
						J(s, `${e ?? ""}%`), Q(c, W(r).props.parallax ?? .3);
					}, [() => Math.round((W(r).props.parallax ?? 0) * 100)]), G("input", c, (e) => It(t(), i, "parallax", Number(e.target.value))), q(e, n);
				};
				Y(re, (e) => {
					(W(r).props.parallax ?? 0) > 0 && e(ie);
				}), B((e, t) => {
					J(s, `${W(r).props.src ? "Bytt bilde" : "Velg bilde"} `), Q(p, e), J(y, `${W(r).props.blur ?? 0 ?? ""} px`), Q(b, W(r).props.blur ?? 0), J(ee, `${t ?? ""}%`), Q(C, W(r).props.opacity ?? 1), ri(ne, (W(r).props.parallax ?? 0) > 0);
				}, [() => Math.round((W(r).props.size ?? 1) * 100), () => Math.round((W(r).props.opacity ?? 1) * 100)]), G("change", c, (e) => on(t(), i, e)), G("click", f, () => zt(t(), i, W(r).props.size ?? 1, -.05)), G("change", p, (e) => Bt(t(), i, e.target.value)), G("click", m, () => zt(t(), i, W(r).props.size ?? 1, .05)), G("input", b, (e) => It(t(), i, "blur", Number(e.target.value))), G("input", C, (e) => It(t(), i, "opacity", Number(e.target.value))), G("change", ne, (e) => It(t(), i, "parallax", e.target.checked ? .3 : 0)), q(e, a);
			}, b = (e) => {
				var n = $o(), a = R(n), o = z(L(a));
				k(a);
				var s = z(a, 2);
				zr(s, 17, () => W(r).props.images ?? [], Fr, (e, n, a) => {
					var o = Qo(), s = R(o), l = L(s), u = z(l, 2), d = L(u);
					d.disabled = a === 0, X(d, () => c.up, !0), k(d);
					var f = z(d, 2);
					X(f, () => c.down, !0), k(f);
					var p = z(f, 2);
					X(p, () => c.cross, !0), k(p), k(u), k(s);
					var m = z(s, 2), h = z(L(m)), g = L(h);
					k(h), k(m);
					var _ = z(m, 2);
					Z(_);
					var v = z(_, 2), y = z(L(v)), b = L(y);
					k(y), k(v);
					var x = z(v, 2);
					Z(x), B((e, t) => {
						ii(l, "src", W(n).src), f.disabled = a === W(r).props.images.length - 1, J(g, `${e ?? ""}%`), Q(_, W(n).x ?? .5), J(b, `${t ?? ""}%`), Q(x, W(n).y ?? .5);
					}, [() => Math.round((W(n).x ?? .5) * 100), () => Math.round((W(n).y ?? .5) * 100)]), G("click", d, () => cn(t(), i, a, -1)), G("click", f, () => cn(t(), i, a, 1)), G("click", p, () => ln(t(), i, a)), G("input", _, (e) => un(t(), i, a, "x", Number(e.target.value))), G("input", x, (e) => un(t(), i, a, "y", Number(e.target.value))), q(e, o);
				});
				var l = z(s, 2), u = z(L(l));
				{
					let e = /* @__PURE__ */ N(() => W(r).props.fit ?? "cover");
					$(u, {
						get value() {
							return W(e);
						},
						options: [["cover", "Fyll (beskjæres)"], ["contain", "Vis hele"]],
						onchange: (e) => It(t(), i, "fit", e)
					});
				}
				k(l);
				var d = z(l, 2), f = z(L(d));
				Z(f), k(d);
				var p = z(d, 2), m = z(L(p)), h = L(m);
				k(m), k(p);
				var g = z(p, 2);
				Z(g);
				var _ = z(g, 2), v = z(L(_)), y = L(v);
				k(v), k(_);
				var b = z(_, 2);
				Z(b);
				var x = z(b, 2), S = z(L(x)), ee = L(S);
				k(S), k(x);
				var C = z(x, 2);
				Z(C), A(2), B((e, t) => {
					Q(f, W(r).props.interval ?? 6), J(h, `${e ?? ""} s`), Q(g, W(r).props.fade ?? 1.5), J(y, `${W(r).props.blur ?? 0 ?? ""} px`), Q(b, W(r).props.blur ?? 0), J(ee, `${t ?? ""}%`), Q(C, W(r).props.opacity ?? 1);
				}, [() => (W(r).props.fade ?? 1.5).toFixed(1), () => Math.round((W(r).props.opacity ?? 1) * 100)]), G("change", o, (e) => sn(t(), i, e)), G("change", f, (e) => It(t(), i, "interval", Number(e.target.value))), G("input", g, (e) => It(t(), i, "fade", Number(e.target.value))), G("input", b, (e) => It(t(), i, "blur", Number(e.target.value))), G("input", C, (e) => It(t(), i, "opacity", Number(e.target.value))), q(e, n);
			};
			Y(m, (e) => {
				W(r).type === "color" ? e(h) : W(r).type === "gradient" ? e(g, 1) : W(r).type === "glow" ? e(_, 2) : W(r).type === "grain" ? e(v, 3) : W(r).type === "image" ? e(y, 4) : W(r).type === "bildegalleri" && e(b, 5);
			}), k(a), B(() => f.disabled = i === n().length - 1), G("click", d, () => Ft(t(), i, -1)), G("click", f, () => Ft(t(), i, 1)), G("click", p, () => Pt(t(), i)), q(e, a);
		});
		var a = z(i, 2), s = z(L(a));
		{
			let e = /* @__PURE__ */ N(() => o.map(([e, t]) => [e, t.label]));
			$(s, {
				get value() {
					return W(Mt);
				},
				get options() {
					return W(e);
				},
				onchange: (e) => I(Mt, e, !0)
			});
		}
		k(a), G("click", z(a, 2), () => Nt(t(), W(Mt))), q(e, r);
	}, r = (e, t = d, n = d) => {
		var r = kr();
		zr(R(r), 17, n, Fr, (e, r, i) => {
			var a = rs(), o = L(a);
			Z(o);
			var s = z(o, 2), l = L(s);
			l.disabled = i === 0, X(l, () => c.up, !0), k(l);
			var u = z(l, 2);
			X(u, () => c.down, !0), k(u);
			var d = z(u, 2);
			X(d, () => c.cross, !0), k(d), k(s);
			var f = z(s, 2), p = L(f);
			{
				let e = /* @__PURE__ */ N(() => W(r).page ?? "__href"), n = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Lenke (URL/anker)"]]);
				$(p, {
					get value() {
						return W(e);
					},
					title: "Hvor lenken går",
					get options() {
						return W(n);
					},
					onchange: (e) => ca(t(), i, e)
				});
			}
			k(f);
			var m = z(f, 2), h = (e) => {
				var n = ns();
				Z(n), B(() => Q(n, W(r).href ?? "")), G("change", n, (e) => la(t(), i, e.target.value)), q(e, n);
			};
			Y(m, (e) => {
				W(r).page || e(h);
			}), k(a), B(() => {
				Q(o, W(r).label), u.disabled = i === n().length - 1;
			}), G("input", o, (e) => sa(t(), i, e.target.value)), G("click", l, () => oa(t(), i, -1)), G("click", u, () => oa(t(), i, 1)), G("click", d, () => aa(t(), i)), q(e, a);
		}), q(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ N(() => W(j).props.boxStyle ?? {});
		var n = os(), r = R(n), i = z(L(r));
		{
			let e = /* @__PURE__ */ N(() => W(t).bg ?? ""), n = /* @__PURE__ */ N(hn);
			Pi(i, {
				get value() {
					return W(e);
				},
				get tokens() {
					return W(n);
				},
				allowClear: !0,
				label: "Bakgrunnsfarge for boksen (tom = temaets flate)",
				onchange: (e) => lt({ bg: e || null })
			});
		}
		k(r);
		var a = z(r, 2), o = z(L(a));
		{
			let e = /* @__PURE__ */ N(() => W(t).shadow ?? "");
			$(o, {
				get value() {
					return W(e);
				},
				options: [
					["", "Ingen"],
					["soft", "Myk"],
					["strong", "Tydelig"]
				],
				onchange: (e) => lt({ shadow: e || null })
			});
		}
		k(a);
		var s = z(a, 2), c = (e) => {
			var n = is(), r = z(L(n));
			{
				let e = /* @__PURE__ */ N(() => W(t).shadowColor ?? ""), n = /* @__PURE__ */ N(hn);
				Pi(r, {
					get value() {
						return W(e);
					},
					get tokens() {
						return W(n);
					},
					allowClear: !0,
					label: "Skyggens farge (tom = svart)",
					onchange: (e) => lt({ shadowColor: e || null })
				});
			}
			k(n), q(e, n);
		};
		Y(s, (e) => {
			W(t).shadow && e(c);
		});
		var l = z(s, 2), u = z(L(l));
		{
			let e = /* @__PURE__ */ N(() => W(t).border === "none" ? "none" : W(t).border ? "custom" : "");
			$(u, {
				get value() {
					return W(e);
				},
				options: [
					["", "Temaets (tynn)"],
					["none", "Ingen"],
					["custom", "Egen farge"]
				],
				onchange: (e) => lt({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		k(l);
		var d = z(l, 2), f = (e) => {
			let n = /* @__PURE__ */ N(() => typeof W(t).border == "object" ? W(t).border : {
				color: "text",
				width: 1
			});
			var r = as(), i = R(r), a = z(L(i));
			{
				let e = /* @__PURE__ */ N(hn);
				Pi(a, {
					get value() {
						return W(n).color;
					},
					get tokens() {
						return W(e);
					},
					label: "Kantlinjens farge",
					onchange: (e) => lt({ border: {
						...W(n),
						color: e
					} })
				});
			}
			k(i);
			var o = z(i, 2), s = z(L(o)), c = L(s), l = z(c, 2);
			Z(l);
			var u = z(l, 2);
			k(s), k(o), B(() => Q(l, W(n).width)), G("click", c, () => lt({ border: {
				...W(n),
				width: Math.max(1, W(n).width - 1)
			} })), G("change", l, (e) => lt({ border: {
				...W(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), G("click", u, () => lt({ border: {
				...W(n),
				width: Math.min(12, W(n).width + 1)
			} })), q(e, r);
		};
		Y(d, (e) => {
			W(t).border !== "none" && e(f);
		});
		var p = z(d, 2), m = L(p);
		Z(m), A(), k(p), B((e) => ri(m, e), [() => !!W(t).glass]), G("change", m, (e) => lt({ glass: e.target.checked || null })), q(e, n);
	}, a = (e) => {
		var t = As(), n = R(t), r = (e) => {
			var t = ss(), n = R(t), r = z(L(n));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.align ?? "left");
				$(r, {
					get value() {
						return W(e);
					},
					options: [
						["left", "Venstre"],
						["center", "Midtstilt"],
						["right", "Høyre"]
					],
					onchange: (e) => M("align", e)
				});
			}
			k(n);
			var a = z(n, 2), o = L(a);
			Z(o), A(), k(a);
			var s = z(a, 2), c = (e) => {
				i(e);
			};
			Y(s, (e) => {
				W(j).props.box && e(c);
			}), B((e) => ri(o, e), [() => !!W(j).props.box]), G("change", o, (e) => M("box", e.target.checked)), q(e, t);
		}, a = (e) => {
			var t = ls(), n = R(t), r = L(n);
			Z(r), A(), k(n);
			var a = z(n, 4);
			zr(a, 17, () => W(j).props.items ?? [], Fr, (e, t, n) => {
				var r = cs(), i = L(r);
				Z(i);
				var a = z(i, 2), o = L(a);
				o.disabled = n === 0, X(o, () => c.up, !0), k(o);
				var s = z(o, 2);
				X(s, () => c.down, !0), k(s);
				var l = z(s, 2);
				X(l, () => c.cross, !0), k(l), k(a), k(r), B(() => {
					Q(i, W(t).q), s.disabled = n === (W(j).props.items?.length ?? 0) - 1;
				}), G("change", i, (e) => ut(n, { q: e.target.value })), G("click", o, () => pt(n, -1)), G("click", s, () => pt(n, 1)), G("click", l, () => ft(n)), q(e, r);
			});
			var o = z(a, 2), s = z(o, 4);
			i(s), B((e) => ri(r, e), [() => !!W(j).props.multi]), G("change", r, (e) => M("multi", e.target.checked)), G("click", o, dt), q(e, t);
		}, o = (e) => {
			var t = ds(), n = R(t), r = z(L(n));
			Z(r), k(n);
			var i = z(n, 2), a = z(L(i));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.page ?? "__href"), t = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Ekstern lenke"]]);
				$(a, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => {
						let t = e === "__href" ? null : e;
						st(`edit:${W(j).blockId}`, (e) => {
							e.props.page = t, t && (e.props.href = null);
						});
					}
				});
			}
			k(i);
			var o = z(i, 2), s = (e) => {
				var t = us();
				Z(t), B(() => Q(t, W(j).props.href === "#" ? "" : W(j).props.href ?? "")), G("change", t, (e) => M("href", e.target.value || null)), q(e, t);
			};
			Y(o, (e) => {
				W(j).props.page || e(s);
			});
			var c = z(o, 2);
			$(z(L(c)), {
				get value() {
					return W(j).props.style;
				},
				options: [["primary", "Fylt (aksentfarge)"], ["secondary", "Kantlinje"]],
				onchange: (e) => M("style", e)
			}), k(c), B(() => Q(r, W(j).props.label)), G("change", r, (e) => M("label", e.target.value)), q(e, t);
		}, s = (e) => {
			var t = ps(), n = R(t), r = z(L(n));
			k(n);
			var i = z(n, 2), a = z(L(i));
			Z(a), k(i);
			var o = z(i, 2), s = z(L(o));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.fit ?? "cover");
				$(s, {
					get value() {
						return W(e);
					},
					options: [["cover", "Fyll rammen (beskjæres)"], ["contain", "Vis hele bildet"]],
					onchange: (e) => M("fit", e)
				});
			}
			k(o);
			var c = z(o, 2), l = z(L(c));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.radius ?? "");
				$(l, {
					get value() {
						return W(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => M("radius", e || null)
				});
			}
			k(c);
			var u = z(c, 2), d = z(L(u));
			Z(d), k(u);
			var f = z(u, 2), p = (e) => {
				var t = fs(), n = L(t);
				Z(n), A(), k(t), B((e) => ri(n, e), [() => !!W(j).props.lightbox]), G("change", n, (e) => M("lightbox", e.target.checked)), q(e, t);
			};
			Y(f, (e) => {
				W(j).props.href || e(p);
			});
			var m = z(f, 2), h = z(L(m)), g = L(h);
			k(h), k(m);
			var _ = z(m, 2);
			Z(_);
			var v = z(_, 2), y = z(L(v)), b = L(y);
			k(y), k(v);
			var x = z(v, 2);
			Z(x);
			var S = z(x, 2), ee = z(L(S)), C = L(ee);
			k(ee), k(S);
			var te = z(S, 2);
			Z(te);
			var ne = z(te, 2), re = z(L(ne)), ie = L(re);
			k(re), k(ne);
			var ae = z(ne, 2);
			Z(ae);
			var oe = z(ae, 2), se = z(L(oe)), ce = L(se);
			k(se), k(oe);
			var le = z(oe, 2);
			Z(le);
			var ue = z(le, 2), de = z(L(ue)), fe = L(de);
			k(de), k(ue);
			var pe = z(ue, 2);
			Z(pe);
			var me = z(pe, 2);
			B((e, t, n, r, i, o) => {
				Q(a, W(j).props.alt ?? ""), Q(d, W(j).props.href ?? ""), J(g, `${e ?? ""}%`), Q(_, W(j).props.x ?? .5), J(b, `${t ?? ""}%`), Q(x, W(j).props.y ?? .5), J(C, `${n ?? ""}x`), Q(te, W(j).props.zoom ?? 1), J(ie, `${r ?? ""}%`), Q(ae, W(j).props.brightness ?? 1), J(ce, `${i ?? ""}%`), Q(le, W(j).props.contrast ?? 1), J(fe, `${o ?? ""}%`), Q(pe, W(j).props.saturate ?? 1);
			}, [
				() => Math.round((W(j).props.x ?? .5) * 100),
				() => Math.round((W(j).props.y ?? .5) * 100),
				() => (W(j).props.zoom ?? 1).toFixed(2),
				() => Math.round((W(j).props.brightness ?? 1) * 100),
				() => Math.round((W(j).props.contrast ?? 1) * 100),
				() => Math.round((W(j).props.saturate ?? 1) * 100)
			]), G("change", r, ht), G("change", a, (e) => M("alt", e.target.value)), G("change", d, (e) => M("href", e.target.value || null)), G("input", _, (e) => M("x", Number(e.target.value))), G("input", x, (e) => M("y", Number(e.target.value))), G("input", te, (e) => M("zoom", Number(e.target.value))), G("input", ae, (e) => M("brightness", Number(e.target.value))), G("input", le, (e) => M("contrast", Number(e.target.value))), G("input", pe, (e) => M("saturate", Number(e.target.value))), G("click", me, () => st(`edit:${W(j).blockId}`, (e) => {
				e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
			})), q(e, t);
		}, l = (e) => {
			var t = ms(), n = z(R(t), 2);
			Z(n);
			var r = z(n, 2), i = z(L(r));
			Z(i), k(r), A(2), B(() => {
				Q(n, W(j).props.url ?? ""), Q(i, W(j).props.title ?? "");
			}), G("change", n, (e) => M("url", e.target.value)), G("change", i, (e) => M("title", e.target.value)), q(e, t);
		}, u = (e) => {
			var t = vs(), n = R(t), r = z(L(n)), i = L(r);
			{
				let e = /* @__PURE__ */ N(() => W(j).props.glyph ?? "★"), t = /* @__PURE__ */ N(() => W(j).props.icon ?? null), n = /* @__PURE__ */ N(() => W(j).props.image ?? null);
				pa(i, {
					get value() {
						return W(e);
					},
					get icon() {
						return W(t);
					},
					get image() {
						return W(n);
					},
					onpick: (e) => st(`edit:${W(j).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => st(`edit:${W(j).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => M("image", e)
				});
			}
			var a = z(i, 2), o = (e) => {
				var t = hs();
				Z(t), B(() => Q(t, W(j).props.glyph ?? "")), G("change", t, (e) => M("glyph", e.target.value || "★")), q(e, t);
			}, s = (e) => {
				var t = gs();
				G("click", t, () => M("icon", null)), q(e, t);
			};
			Y(a, (e) => {
				W(j).props.icon ? e(s, -1) : e(o);
			}), k(r), k(n);
			var c = z(n, 2), l = (e) => {
				var t = _s(), n = R(t), r = L(n), i = z(r, 2);
				k(n), A(2), B(() => ii(r, "src", W(j).props.image)), G("click", i, () => M("image", null)), q(e, t);
			};
			Y(c, (e) => {
				W(j).props.image && e(l);
			});
			var u = z(c, 2), d = z(L(u));
			Z(d), k(u);
			var f = z(u, 2), p = z(L(f));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.color ?? "accent"), t = /* @__PURE__ */ N(hn);
				Pi(p, {
					get value() {
						return W(e);
					},
					get tokens() {
						return W(t);
					},
					onchange: (e) => M("color", e)
				});
			}
			k(f), A(2), B(() => Q(d, W(j).props.size ?? 48)), G("change", d, (e) => M("size", Number(e.target.value))), q(e, t);
		}, d = (e) => {
			var t = ys(), n = R(t), r = z(L(n));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.collection ?? ""), t = /* @__PURE__ */ N(() => [["", "Velg …"], ...W(Ur).map((e) => [e, W(Wr)[e]?.name ?? e])]);
				$(r, {
					get value() {
						return W(e);
					},
					get options() {
						return W(t);
					},
					onchange: (e) => M("collection", e || null)
				});
			}
			k(n);
			var i = z(n, 2), a = z(L(i));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.view ?? "cards");
				$(a, {
					get value() {
						return W(e);
					},
					options: [
						["cards", "Kort"],
						["list", "Liste"],
						["archive", "Arkiv (per år)"]
					],
					onchange: (e) => M("view", e)
				});
			}
			k(i);
			var o = z(i, 2), s = z(L(o));
			Z(s), k(o);
			var c = z(o, 2), l = L(c);
			Z(l), A(), k(c), A(2), B(() => {
				Q(s, W(j).props.limit ?? 6), ri(l, W(j).props.newestFirst !== !1);
			}), G("change", s, (e) => M("limit", Number(e.target.value))), G("change", l, (e) => M("newestFirst", e.target.checked)), q(e, t);
		}, f = (e) => {
			var t = Cs(), n = R(t), r = z(L(n));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.view ?? "grid");
				$(r, {
					get value() {
						return W(e);
					},
					options: [
						["grid", "Rutenett"],
						["carousel", "Karusell"],
						["slides", "Lysbilde (bytter automatisk)"]
					],
					onchange: (e) => M("view", e)
				});
			}
			k(n);
			var i = z(n, 2), a = (e) => {
				var t = bs(), n = R(t), r = z(L(n));
				Z(r), k(n);
				var i = z(n, 2), a = z(L(i)), o = L(a);
				k(a), k(i);
				var s = z(i, 2);
				Z(s), B(() => {
					Q(r, W(j).props.columns ?? 3), J(o, `${W(j).props.gap ?? 12 ?? ""} px`), Q(s, W(j).props.gap ?? 12);
				}), G("change", r, (e) => M("columns", Number(e.target.value))), G("input", s, (e) => M("gap", Number(e.target.value))), q(e, t);
			};
			Y(i, (e) => {
				(W(j).props.view ?? "grid") === "grid" && e(a);
			});
			var o = z(i, 2), s = (e) => {
				var t = xs(), n = z(L(t));
				Z(n), k(t), B(() => Q(n, W(j).props.interval ?? 5)), G("change", n, (e) => M("interval", Number(e.target.value))), q(e, t);
			};
			Y(o, (e) => {
				W(j).props.view === "slides" && e(s);
			});
			var l = z(o, 2), u = z(L(l));
			{
				let e = /* @__PURE__ */ N(() => W(j).props.radius ?? "");
				$(u, {
					get value() {
						return W(e);
					},
					options: [
						["", "Ingen"],
						["sm", "Liten"],
						["md", "Stor"]
					],
					onchange: (e) => M("radius", e || null)
				});
			}
			k(l);
			var d = z(l, 2), f = L(d);
			Z(f), A(), k(d);
			var p = z(d, 4), m = z(L(p));
			k(p), zr(z(p, 2), 17, () => W(j).props.images ?? [], Fr, (e, t, n) => {
				var r = Ss(), i = L(r), a = L(i), o = z(a, 2), s = L(o);
				s.disabled = n === 0, X(s, () => c.up, !0), k(s);
				var l = z(s, 2);
				X(l, () => c.down, !0), k(l);
				var u = z(l, 2);
				X(u, () => c.cross, !0), k(u), k(o), k(i);
				var d = z(i, 2), f = z(L(d));
				Z(f), k(d);
				var p = z(d, 2), m = z(L(p));
				Z(m), k(p), k(r), B(() => {
					ii(a, "src", W(t).src), l.disabled = n === W(j).props.images.length - 1, Q(f, W(t).alt ?? ""), Q(m, W(t).href ?? "");
				}), G("click", s, () => Vl(n, -1)), G("click", l, () => Vl(n, 1)), G("click", u, () => Hl(n)), G("change", f, (e) => Ul(n, "alt", e.target.value)), G("change", m, (e) => Ul(n, "href", e.target.value || null)), q(e, r);
			}), A(2), B(() => ri(f, W(j).props.lightbox !== !1)), G("change", f, (e) => M("lightbox", e.target.checked)), G("change", m, zl), q(e, t);
		}, p = (e) => {
			var t = ws(), n = R(t);
			$(z(L(n)), {
				get value() {
					return W(j).props.kind;
				},
				get options() {
					return _t;
				},
				onchange: (e) => M("kind", e)
			}), k(n);
			var r = z(n, 2);
			$(z(L(r)), {
				get value() {
					return W(j).props.color;
				},
				get options() {
					return vt;
				},
				onchange: (e) => M("color", e)
			}), k(r);
			var i = z(r, 2), a = z(L(i));
			Z(a), k(i);
			var o = z(i, 2), s = L(o);
			Z(s), A(), k(o), B((e) => {
				Q(a, W(j).props.thickness), ri(s, e);
			}, [() => !!W(j).props.fill]), G("change", a, (e) => M("thickness", Number(e.target.value))), G("change", s, (e) => M("fill", e.target.checked ? W(j).props.color : null)), q(e, t);
		}, m = (e) => {
			var t = Ts(), n = R(t);
			A(2), G("click", n, () => T?.sendOpenConfig(W(j).blockId)), q(e, t);
		};
		Y(n, (e) => {
			W(j).type === "text" ? e(r) : W(j).type === "faq" ? e(a, 1) : W(j).type === "button" ? e(o, 2) : W(j).type === "image" ? e(s, 3) : W(j).type === "video" ? e(l, 4) : W(j).type === "icon" ? e(u, 5) : W(j).type === "samling" ? e(d, 6) : W(j).type === "galleri" ? e(f, 7) : W(j).type === "shape" ? e(p, 8) : e(m, -1);
		});
		var h = z(n, 4), g = z(L(h));
		{
			let e = /* @__PURE__ */ N(() => wn(W(j).animation) ? W(j).animation.type : "");
			$(g, {
				get value() {
					return W(e);
				},
				get options() {
					return Tn;
				},
				onchange: (e) => On(e || null)
			});
		}
		k(h);
		var _ = z(h, 2), v = (e) => {
			var t = Es(), n = R(t), r = z(L(n));
			Z(r), k(n);
			var i = z(n, 2), a = z(L(i));
			Z(a), k(i), B(() => {
				Q(r, W(j).animation.props.duration), Q(a, W(j).animation.props.delay);
			}), G("change", r, (e) => An("duration", Number(e.target.value))), G("change", a, (e) => An("delay", Number(e.target.value))), q(e, t);
		}, y = /* @__PURE__ */ N(() => wn(W(j).animation));
		Y(_, (e) => {
			W(y) && e(v);
		});
		var b = z(_, 2), x = z(L(b));
		{
			let e = /* @__PURE__ */ N(() => W(j).hover?.type ?? (W(j).animation && !wn(W(j).animation) ? W(j).animation.type : ""));
			$(x, {
				get value() {
					return W(e);
				},
				get options() {
					return En;
				},
				onchange: (e) => kn(e || null)
			});
		}
		k(b);
		var S = z(b, 2), ee = (e) => {
			var t = Os(), n = z(R(t), 2), r = L(n);
			Z(r), A(), k(n);
			var i = z(n, 2), a = (e) => {
				var t = Ds(), n = R(t), r = z(L(n));
				Z(r), k(n);
				var i = z(n, 2), a = z(L(i));
				{
					let e = /* @__PURE__ */ N(() => W(j).sticky.until ?? ""), t = /* @__PURE__ */ N(it);
					$(a, {
						get value() {
							return W(e);
						},
						get options() {
							return W(t);
						},
						onchange: (e) => st(`edit:${W(j).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								until: e || null
							};
						})
					});
				}
				k(i), B(() => Q(r, W(j).sticky.offset ?? 16)), G("change", r, (e) => st(`edit:${W(j).blockId}`, (t) => {
					t.sticky = {
						...t.sticky,
						offset: Math.max(0, Number(e.target.value) || 0)
					};
				})), q(e, t);
			};
			Y(i, (e) => {
				W(j).sticky && e(a);
			}), B((e) => ri(r, e), [() => !!W(j).sticky]), G("change", r, (e) => st(`edit:${W(j).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), q(e, t);
		};
		Y(S, (e) => {
			W(ie) === "desktop" && e(ee);
		});
		var C = z(S, 4), te = z(L(C), 2), ne = z(L(te), 2), re = (e) => {
			var t = ks(), n = L(t), r = z(L(n));
			Z(r), k(n);
			var i = z(n, 2), a = z(L(i));
			Z(a), k(i);
			var o = z(i, 2), s = z(L(o));
			Z(s), k(o);
			var c = z(o, 2), l = z(L(c));
			Z(l), k(c);
			var u = z(c, 2), d = z(L(u));
			Z(d), k(u);
			var f = z(u, 2), p = z(L(f));
			Z(p), k(f), k(t), B(() => {
				Q(r, W(j).frame.x), Q(a, W(j).frame.y), Q(s, W(j).frame.w), Q(l, W(j).frame.h), Q(d, W(j).frame.z ?? 1), Q(p, W(j).frame.rot ?? 0);
			}), G("change", r, (e) => ct("x", Number(e.target.value))), G("change", a, (e) => ct("y", Number(e.target.value))), G("change", s, (e) => ct("w", Number(e.target.value))), G("change", l, (e) => ct("h", Number(e.target.value))), G("change", d, (e) => ct("z", Number(e.target.value))), G("change", p, (e) => ct("rot", Number(e.target.value))), q(e, t);
		};
		Y(ne, (e) => {
			W(ie) === "desktop" && e(re);
		});
		var ae = z(ne, 2), oe = L(ae);
		Z(oe), A(), k(ae), k(te), k(C), B(() => ri(oe, W(j).decor)), G("change", oe, (e) => mt(e.target.checked)), q(e, t);
	}, o = [
		["color", Wa],
		["gradient", io],
		["glow", ao],
		["image", Ao],
		["bildegalleri", Po],
		["grain", so]
	], s = Object.fromEntries(o), c = {
		desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
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
		guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M12 3v4M12 17v4M3 12h4M17 12h4\"/><circle cx=\"12\" cy=\"12\" r=\"3.2\" stroke-dasharray=\"2.5 2.5\"/></svg>",
		fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>"
	}, l = [
		["lilla", "Lilla dybde"],
		["bronn", "Nordisk brønn"],
		["gull", "Norrønt gull"],
		["graa", "Nøytral grå"],
		["nordlys", "Nordlys"],
		["skumring", "Skumring"],
		["glo", "Glo"]
	], u = /* @__PURE__ */ F(nn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	xn(() => {
		document.documentElement.dataset.adminTheme = W(u), localStorage.setItem("urd-admin-theme", W(u)), f();
	});
	function f() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		T?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return Ha(e) == null || (Ua(e, "#ffffff") ?? 0) >= (Ua(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(null), _ = /* @__PURE__ */ F(!1), v = /* @__PURE__ */ F(""), y = /* @__PURE__ */ F("info"), b = 0;
	function x(e, t = "info") {
		I(v, e, !0), I(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (I(v, ""), I(y, "info"));
		}, 8e3);
	}
	function S() {
		x("Nettleserens lagringsplass er full: siste endring ble ikke lagret som utkast. Publiser, eller fjern store bilder, for å frigjøre plass.", "error");
	}
	function ee(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let C = /* @__PURE__ */ F(null), te = /* @__PURE__ */ F(null), ne = /* @__PURE__ */ F(nn({
		size: 16,
		snap: !0
	})), re = /* @__PURE__ */ F(!0), ie = /* @__PURE__ */ F("desktop"), ae = /* @__PURE__ */ F(null), oe = /* @__PURE__ */ F(0), se = /* @__PURE__ */ F(0), ce = /* @__PURE__ */ F(nn(typeof window < "u" ? window.innerWidth : 1280)), le = /* @__PURE__ */ F("fit"), ue = /* @__PURE__ */ N(() => W(ie) === "mobile" ? 390 : W(ce)), de = /* @__PURE__ */ N(() => ga(W(oe), W(ue), W(le))), fe = /* @__PURE__ */ N(() => W(de) > 0 ? W(se) / W(de) : W(se)), pe = /* @__PURE__ */ N(() => W(ue) * W(de)), me = /* @__PURE__ */ N(() => W(se));
	xn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), xn(() => {
		let e = W(ie);
		T?.sendViewport(e);
	}), xn(() => {
		let e = () => {
			I(ce, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), xn(() => {
		let e = W(ae);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			let t = e.getBoundingClientRect();
			I(oe, t.width, !0), I(se, t.height, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let he = /* @__PURE__ */ F(0);
	function ge() {
		I(he, w?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function _e(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, ge(), T?.sendAttention(e.id, !0));
	}
	let w = null, ve = null, T = null, E = /* @__PURE__ */ F(null);
	function ye() {
		I(E, ve.data, !0), ve.replace(W(E));
	}
	function be() {
		T?.sendSite(Ve(W(E)));
	}
	let xe = /* @__PURE__ */ new Set(), Se = () => W(E).pages.find((e) => e.id === W(g));
	function D() {
		let e = W(E)?.pages?.some((e) => !xe.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Rr?.hasDraft() || Object.values(Br).some((e) => e.hasDraft());
		I(_, e || w?.hasDraft() && !xe.has(W(g)) || ve?.hasDraft() || pi?.hasDraft() || t || !1, !0);
	}
	let Ce = [], we = [], Te = null;
	function Ee() {
		return JSON.stringify({
			pageId: W(g),
			page: w.data,
			site: ve.data,
			samlingerIndex: Hr ? Rr.data : null,
			samlinger: Hr ? Object.fromEntries(Object.entries(Br).map(([e, t]) => [e, t.data])) : {},
			plugins: pi?.data ?? null
		});
	}
	function De(e) {
		e === Te && (e.startsWith("edit:") || e.startsWith("grid:")) || (Ce.push(Ee()), Ce.length > 50 && Ce.shift(), we.length = 0, Te = e);
	}
	function Oe(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, plugins: o } = JSON.parse(e);
		if (ve.replace(r), ye(), ve.save(), I(ne, {
			snap: !0,
			...W(E).grid
		}, !0), be(), ke(i, a ?? {}), Ae(o), t && t !== W(g) && W(E).pages.some((e) => e.id === t)) {
			ee(`urd-draft-${t}`, JSON.stringify(n)), Qn(t, { keepHistory: !0 }), D();
			return;
		}
		w.replace(n), w.save(), D(), ge(), tt(), Et(w.data.sections.find((e) => e.id === W(yt))), W(E).pages.some((e) => e.id === W(g)) ? T?.sendPage(W(g), w.data) : Qn(W(E).pages[0].id, { keepHistory: !0 });
	}
	function ke(e, t) {
		if (!(!Rr || !e) && JSON.stringify({
			index: Rr.data,
			samlinger: Object.fromEntries(Object.entries(Br).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			Rr.replace(e), Rr.save();
			for (let e of Object.keys(Br)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete Br[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Br[e]) {
					let t = Vr[e] ?? {
						schemaVersion: 1,
						id: e,
						name: n.name ?? e,
						kind: n.kind ?? "custom",
						entries: []
					};
					Br[e] = Si(`urd-draft-samling-${e}`, () => t, S);
				}
				Br[e].replace(n), Br[e].save();
			}
			I(Ur, [...e.samlinger ?? []], !0), W(Gr) && !W(Ur).includes(W(Gr)) && I(Gr, null), Zr();
		}
	}
	function Ae(e) {
		!pi || !e || JSON.stringify(pi.data) !== JSON.stringify(e) && (pi.replace(e), pi.save(), Di(), Ni());
	}
	function O() {
		Ce.length && (we.push(Ee()), Oe(Ce.pop()), Te = null, x("Angret"));
	}
	function je() {
		we.length && (Ce.push(Ee()), Oe(we.pop()), Te = null, x("Gjentatt"));
	}
	function Me(e) {
		W(rt) && (e.target instanceof Element && e.target.closest(".block-menu") || I(rt, null));
	}
	function Ne(e) {
		if (e.key === "Escape" && W(rt)) {
			I(rt, null);
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
			].includes(t.type)) || !W(j) || W(ie) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? je() : O());
	}
	async function Pe() {
		I(h, Da(await (await fetch("/content/site.json")).json()), !0), ve = Si("urd-draft-site", () => W(h), S), ve.replace(Da(ve.data)), ve.save(), ye(), I(ne, {
			snap: !0,
			...W(E).grid
		}, !0), await Qn(new URLSearchParams(location.search).get("page") ?? W(E).pages[0].id), await Oi(), await Yr(), await Bn(), W(te) && Hn(), (W(E).site.setup === !0 || W(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (I(ze, W(E).site.title, !0), I(Be, W(E).theme.tokens.color.accent, !0), I(He, W(E).theme.tokens.color.bg, !0), I(Re, !0));
	}
	let Fe = /* @__PURE__ */ F(null);
	function Ie({ title: e, lines: t = [], okLabel: n = "OK", cancelLabel: r = "Avbryt" }) {
		return new Promise((i) => {
			I(Fe, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Le(e) {
		W(Fe)?.resolve(e), I(Fe, null);
	}
	let Re = /* @__PURE__ */ F(!1), ze = /* @__PURE__ */ F(""), Be = /* @__PURE__ */ F("#7c5cff"), He = /* @__PURE__ */ F("#0b0e14");
	function Ue() {
		localStorage.setItem("urd-setup-done", "1"), I(Re, !1);
	}
	function We() {
		let e = W(ze).trim();
		e && (U("setup", () => {
			W(E).site.title = e, W(E).nav.logo = {
				type: "text",
				value: e
			}, W(E).theme.tokens.color.accent = W(Be), W(E).theme.tokens.color.bg = W(He), delete W(E).site.setup;
		}), Ue(), x("Sjekk hvordan siden ser ut, og trykk Publiser når du er klar", "ok"));
	}
	let qe = /* @__PURE__ */ F(null), Je = [
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
		["history"]
	], Ye = Object.fromEntries(Je.flat().map((e) => [e, yi(`panel.${e}`)])), Xe = [
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["en-GB", "English (UK)"],
		["se", "Davvisámegiella"],
		["tr", "Türkçe"]
	], Ze = localStorage.getItem("urd-admin-lang") ?? "auto";
	function Qe(e) {
		e !== Ze && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function $e(e) {
		I(qe, W(qe) === e ? null : e, !0), T?.sendShowGrid(W(qe) === "grid"), W(qe) === "history" && H();
	}
	let j = /* @__PURE__ */ F(null);
	function et(e, t) {
		let n = w?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function tt() {
		if (!W(j)) return;
		let { block: e } = et(W(j).sectionId, W(j).blockId);
		if (!e) {
			I(j, null);
			return;
		}
		I(j, {
			sectionId: W(j).sectionId,
			blockId: W(j).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function nt(e) {
		if (I(rt, null), !e.blockId) {
			I(j, null);
			return;
		}
		I(j, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && I(yt, e.sectionId, !0), tt();
	}
	let rt = /* @__PURE__ */ F(null);
	function it() {
		let e = w?.data.sections ?? [], t = e.findIndex((e) => e.id === W(j)?.sectionId);
		return [["", "Når egen seksjon er forbi"], ...e.slice(t + 1).map((e, n) => [e.id, `Ved seksjon ${t + 2 + n}`])];
	}
	function at(e) {
		if (nt(e), !W(j)) return;
		let t = W(C)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + W(de) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + W(de) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + W(de) * e.rect.top), Math.max(8, r));
		I(rt, {
			left: n,
			top: i
		}, !0);
	}
	function st(e, t) {
		let { section: n, block: r } = et(W(j)?.sectionId, W(j)?.blockId);
		r && (De(e), t(r, n), _e(n, "blokk-endret"), w.save(), D(), T?.sendSection(W(g), n), tt());
	}
	function M(e, t) {
		st(`edit:${W(j).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function ct(e, t) {
		Number.isFinite(t) && st(`edit:frame-${W(j).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function lt(e) {
		st(`edit:${W(j).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function ut(e, t) {
		st(`edit:${W(j).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function dt() {
		st("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: "Nytt spørsmål?",
				a: "<p>Skriv svaret her.</p>"
			});
		});
	}
	function ft(e) {
		st("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function pt(e, t) {
		let n = e + t;
		st("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function mt(e) {
		st("decor", (t) => {
			t.decor = e;
		});
	}
	async function ht(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await an(t);
			st(`edit:${W(j).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Gi(t.name).replaceAll("-", " ");
			});
		} catch {
			x("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let gt = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form",
		video: "Video",
		icon: "Ikon",
		galleri: "Galleri",
		faq: "FAQ"
	}, _t = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], vt = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], yt = /* @__PURE__ */ F(null), bt = /* @__PURE__ */ F(null), xt = /* @__PURE__ */ F(""), St = /* @__PURE__ */ F(nn([])), Ct = /* @__PURE__ */ F(null), wt = /* @__PURE__ */ F(null), Tt = /* @__PURE__ */ F("");
	function Et(e) {
		I(bt, e?.grid ? { ...e.grid } : null, !0), I(xt, e?.size?.minHeight ?? "", !0), I(St, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), I(Ct, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), I(wt, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), I(Tt, e?.theme ?? "", !0);
	}
	let Dt = /* @__PURE__ */ F(null), P = nn({});
	function Ot() {
		try {
			let e = ((W(C)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${W(yt)}"]`))?.getBoundingClientRect();
			I(Dt, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			I(Dt, null);
		}
	}
	xn(() => {
		W(yt), W(St), requestAnimationFrame(() => requestAnimationFrame(Ot));
	}), xn(() => {
		let e = W(C);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Ot());
		return t.observe(e), () => t.disconnect();
	}), xn(() => {
		for (let e of W(St)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !P[t]) {
				let e = new Image();
				e.onload = () => {
					P[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function kt(e) {
		jt("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function At(e) {
		I(yt, e.sectionId, !0), Et(w?.data.sections.find((t) => t.id === e.sectionId));
	}
	function jt(e, t) {
		let n = w.data.sections.find((e) => e.id === W(yt));
		n && (De(e), t(n), w.save(), D(), T?.sendSection(W(g), n), Et(n));
	}
	let Mt = /* @__PURE__ */ F("color");
	function Nt(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background ??= {
				version: 1,
				layers: []
			}, e.background.layers.push({
				type: t,
				version: s[t].version ?? 1,
				props: s[t].defaults()
			});
		});
	}
	function Pt(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function Ft(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function It(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function Lt(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				It(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				It(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let Rt = (e) => Math.min(4, Math.max(.1, e));
	function zt(e, t, n, r) {
		It(e, t, "size", Rt(Math.round((n + r) * 100) / 100));
	}
	function Bt(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && It(e, t, "size", Rt(r / 100));
	}
	function Vt(e, t, n, r) {
		let i = P[n.props.src];
		if (!i?.w || !i?.h || !W(Dt)?.w || !W(Dt)?.h) return;
		let a = W(Dt).h * i.w / (W(Dt).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && It(e, t, "fit", "vanlig"), It(e, t, "size", Rt(Math.round(o * 100) / 100));
	}
	function Ht(e) {
		if ((e.version ?? 1) >= io.version) return e.props;
		let t = Ve(e);
		return Sa({
			type: "gradient",
			version: t.version ?? 1,
			props: t.props
		}, io).props;
	}
	function Ut(e, t, n, r) {
		e.mutate(n, (e) => {
			let n = e.background.layers[t];
			if ((n.version ?? 1) < io.version) {
				let e = Sa({
					type: "gradient",
					version: n.version ?? 1,
					props: Ve(n.props)
				}, io);
				if (!e.ok) return;
				n.props = e.props, n.version = e.version;
			}
			r(n.props);
		});
	}
	function Wt(e, t, n, r) {
		Ut(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Gt = {
		linear: [
			["none", "Ingen"],
			["pan", "Panorer frem og tilbake"],
			["pan-loop", "Panorer én vei (loop)"],
			["rotate", "Roter sakte"]
		],
		radial: [
			["none", "Ingen"],
			["pulse", "Pulser"],
			["orbit", "Sving sakte i bane"]
		]
	};
	function Kt(e, t, n) {
		Ut(e, t, e.keyPrefix, (e) => {
			e.kind = n, Gt[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function qt(e, t, n, r) {
		Ut(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Jt(e, t) {
		Ut(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Yt(e, t, n) {
		Ut(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Xt(e, t, n, r) {
		Ut(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Zt = /* @__PURE__ */ F(null);
	function Qt(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		I(Zt, {
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
			I(Zt, {
				...W(Zt),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = W(Zt);
			if (I(Zt, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Xt(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function $t(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function en(e, t) {
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
	async function tn(e) {
		let t = await e.text(), n = Vi(t), r = Ui(t);
		if (!r) return n;
		let i = await en(n.dataUrl, r);
		if (!i) return n;
		let a = Hi(t, i);
		if (a === t) return n;
		try {
			return Vi(a);
		} catch {
			return n;
		}
	}
	async function an(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? tn(e) : Ri(e);
	}
	async function on(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			It(e, t, "src", (await an(r)).dataUrl);
		} catch {
			x("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	async function sn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x("Komprimerer bildene…");
		let { images: i, failed: a, big: o } = await Ll(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), Rl(i.length, a, o);
	}
	function cn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function ln(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function un(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function dn(e, t) {
		U(e, () => {
			W(E).nav.style ??= {}, t(W(E).nav.style);
		});
	}
	let fn = /* @__PURE__ */ N(() => ({
		mutate: jt,
		keyPrefix: "bg",
		keyId: W(yt)
	})), pn = {
		mutate: dn,
		keyPrefix: "navbg",
		keyId: "nav"
	}, mn = {
		mutate: zi,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, hn = () => Object.entries(W(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), gn = [
		[
			"bg",
			"Bakgrunn",
			"bg"
		],
		[
			"surface",
			"Flater",
			"flate"
		],
		[
			"text",
			"Tekst",
			"tekst"
		],
		[
			"accent",
			"Aksent",
			"aksent"
		],
		[
			"accent-text",
			"Tekst på aksent",
			"på aksent"
		]
	], _n = /* @__PURE__ */ N(() => !!W(E)?.theme.alt), vn = /* @__PURE__ */ N(() => W(E)?.theme.alt?.auto === !0), yn = /* @__PURE__ */ N(() => W(E)?.theme.scheme === "dark" ? "dark" : "light"), bn = /* @__PURE__ */ N(() => W(E)?.theme.tokens.color ?? {}), Sn = /* @__PURE__ */ N(() => ({
		...W(E)?.theme.tokens.color ?? {},
		...W(E)?.theme.alt?.tokens?.color ?? {}
	}));
	function Cn(e) {
		return {
			type: e,
			version: Ro[e].version,
			props: Ro[e].defaults()
		};
	}
	let wn = (e) => !!(e && Ro[e.type]?.entrance), Tn = [["", "Ingen"], ...Object.entries(Ro).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.label])], En = [["", "Ingen"], ...Object.entries(Ro).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.label])];
	function Dn(e) {
		e.animation && !wn(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function On(e) {
		st(`edit:anim-${W(j).blockId}`, (t) => {
			Dn(t), t.animation = e ? Cn(e) : null;
		}), W(j) && T?.sendDemoAnim(W(j).sectionId, W(j).blockId);
	}
	function kn(e) {
		st(`edit:hover-${W(j).blockId}`, (t) => {
			Dn(t), t.hover = e ? Cn(e) : null;
		});
	}
	function An(e, t) {
		Number.isFinite(t) && (st(`edit:anim-${W(j).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), W(j) && T?.sendDemoAnim(W(j).sectionId, W(j).blockId));
	}
	function jn(e) {
		jt("section-anim", (t) => {
			Dn(t), t.animation = e ? Cn(e) : null;
		}), T?.sendDemoAnim(W(yt));
	}
	function Mn(e) {
		jt("section-hover", (t) => {
			Dn(t), t.hover = e ? Cn(e) : null;
		});
	}
	function Nn(e, t) {
		Number.isFinite(t) && (jt("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(W(yt)));
	}
	function Pn(e) {
		jt("edit:section-anim", (t) => {
			t.animation && (t.animation.props.pattern = e);
		}), T?.sendDemoAnim(W(yt));
	}
	function Fn(e) {
		let t = w.data.sections.find((e) => e.id === W(yt));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		De("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, I(xt, r, !0), w.save(), D(), T?.sendSection(W(g), t);
	}
	function In() {
		return w.data.sections.find((e) => e.id === W(yt)) ?? w.data.sections[0];
	}
	function Ln(e) {
		let t = w.data.sections.find((e) => e.id === W(yt));
		t && (De("grid:section"), t.grid = e ? { ...ve.data.grid } : null, I(bt, t.grid ? { ...t.grid } : null, !0), w.save(), D(), T?.sendSection(W(g), t), W(qe) === "grid" && T?.sendShowGrid(!0));
	}
	function Rn(e, t) {
		let n = w.data.sections.find((e) => e.id === W(yt));
		n?.grid && (De("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, I(bt, { ...n.grid }, !0), w.save(), D(), T?.sendSection(W(g), n), W(qe) === "grid" && T?.sendShowGrid(!0));
	}
	function zn(e, t) {
		De("grid:site"), I(ne, {
			...W(ne),
			[e]: t
		}, !0), ve.data.grid = {
			...ve.data.grid,
			[e]: t
		}, ve.save(), D(), be(), W(qe) === "grid" && T?.sendShowGrid(!0);
	}
	async function Bn() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(te, await e.json(), !0) : e.status !== 503 && I(te, null);
		} catch {
			I(te, null);
		}
	}
	let Vn = null;
	async function Hn() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Vn = (await e.json()).head ?? null);
		} catch {}
	}
	async function Un(e) {
		if (!Vn) return await Hn(), {
			ok: await Ie({
				title: "Kan ikke sjekke andres endringer",
				lines: ["Urd fikk ikke lastet publiseringsgrunnlaget da siden ble åpnet, og kan derfor ikke sjekke om noen andre har publisert i mellomtiden.", "Publiserer du likevel, vinner dine filer."],
				okLabel: "Publiser likevel",
				cancelLabel: "Avbryt"
			}),
			head: Vn
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Vn}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Vn) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? ["(endringslisten fra GitHub er ufullstendig - stor diff)"] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Ie({
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
	let V = /* @__PURE__ */ F(null), Wn = /* @__PURE__ */ F(""), Gn = /* @__PURE__ */ F(!1);
	async function H() {
		I(Wn, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? I(V, (await e.json()).commits, !0) : e.status === 401 ? (I(V, [], !0), I(Wn, "Logg inn med GitHub for å se historikken.")) : (I(V, [], !0), I(Wn, (await e.json().catch(() => null))?.error ?? "Kunne ikke hente historikken.", !0));
		} catch {
			I(V, [], !0), I(Wn, "Historikk er ikke tilgjengelig her (krever host med functions).");
		}
	}
	let Kn = new Intl.DateTimeFormat(bi(), {
		dateStyle: "short",
		timeStyle: "short"
	}), qn = !1;
	async function Jn() {
		let e = W(V)?.[0];
		if (!(!e || W(Gn)) && await Ie({
			title: "Angre siste publisering?",
			lines: [`«${e.message}»`, "En ny commit gjenoppretter innholdet slik det var før den. Ingenting slettes fra historikken, og angringen kan selv angres."],
			okLabel: "Angre publiseringen",
			cancelLabel: "Avbryt"
		})) {
			I(Gn, !0), x("Angrer siste publisering…");
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Vn = e : Hn(), qn = !0, x("✓ Angret! Venter på utrullingen (~1 min), så lastes den gjenopprettede versjonen automatisk …", "ok"), Yn();
				} else t.status === 409 ? x("Noen har publisert i mellomtiden - historikken er lastet på nytt", "error") : x((await t.json().catch(() => null))?.error ?? "Kunne ikke angre", "error");
			} catch {
				x("Kunne ikke nå publiseringslaget", "error");
			}
			I(Gn, !1), H();
		}
	}
	async function Yn() {
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
				x("✓ Gjenopprettet versjon er ute - laster admin på nytt …", "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x("Angringen er lagret, men utrullingen lot vente på seg - last admin på nytt manuelt for å redigere videre", "error");
	}
	let Xn = null;
	function Zn(e) {
		return {
			schemaVersion: 3,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Pa("sec"),
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
	async function Qn(e, { keepHistory: t = !1 } = {}) {
		I(g, e, !0), Xn = (async () => {
			let n = Se(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Oa(await e.json(), ve.data));
			} catch {}
			r ? xe.delete(e) : r = Zn(n), w = Si(`urd-draft-${e}`, () => r, S), w.replace(Oa(w.data, ve.data)), w.save(), t || (Te = null), I(yt, null), I(bt, null), D(), ge(), I(v, "");
		})(), await Xn;
	}
	function $n() {
		T?.destroy(), W(C)?.contentDocument?.addEventListener("pointerdown", () => {
			W(rt) && I(rt, null);
		}, !0), T = ma(W(C), {
			onEdit: Eo,
			onMove: Do,
			onGrow: Oo,
			onDelete: El,
			onAddSection: Io,
			onMoveSection: Lo,
			onDeleteSection: Cl,
			onSectionSize: wl,
			onUndo: (e) => e.redo ? je() : O(),
			onSelectSection: At,
			onSelectBlock: nt,
			onBlockMenu: at,
			onReady: er,
			onNavigate: rr,
			onAddBlock: (e) => Al(e.sectionId, e.block),
			onAddBlocks: (e) => jl(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Fl,
			onMoveBlockSection: Tl,
			onMobileManual: ko,
			onMobileAuto: jo,
			onReviewDone: Mo,
			onBlockFlag: No,
			onCollectionEdit: ti,
			onPluginBlocks: (e) => {
				I(Nl, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => U("edit:nav-width", () => {
				W(E).nav.style ??= {}, W(E).nav.style.width = e.width;
			})
		});
	}
	async function er() {
		await Xn, await hi, T?.sendPlugins(Ve(W(gi))?.enabled ?? []), T?.sendViewport(W(ie)), $r(), ve.hasDraft() && be();
		let e = !W(h).pages.some((e) => e.id === W(g));
		(w.hasDraft() || e) && T?.sendPage(W(g), w.data), W(re) || T?.sendChrome(!1), W(qe) === "grid" && T?.sendShowGrid(!0), W(tr) && T?.sendShowGuides(!0), f();
	}
	let tr = /* @__PURE__ */ F(localStorage.getItem("urd-guides") === "1");
	function nr() {
		I(tr, !W(tr)), localStorage.setItem("urd-guides", W(tr) ? "1" : "0"), T?.sendShowGuides(W(tr));
	}
	function rr(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = W(E).pages.find((e) => e.path === t);
		n && n.id !== W(g) && Qn(n.id);
	}
	function U(e, t) {
		De(e), t(), ve.save(), D(), be();
	}
	let ir = /* @__PURE__ */ F(""), ar = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function or(e, t = null) {
		return e ? ar.includes(e) ? `«${e}» er et reservert navn` : W(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function sr() {
		let e = W(ir).trim(), t = Gi(e), n = or(t);
		if (n) {
			x(n, "error");
			return;
		}
		U("pages", () => {
			W(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), W(E).nav.items.push({
				label: e,
				page: t
			});
		}), ee(`urd-draft-${t}`, JSON.stringify(Zn({
			id: t,
			title: e
		}))), D(), I(ir, ""), Qn(t);
	}
	function cr(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		U("pages", () => {
			e.title = n;
			for (let t of W(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === W(g) ? (w.data.meta.title = n, w.save(), D(), T?.sendPage(W(g), w.data)) : lr(e, (e) => {
			e.meta.title = n;
		});
	}
	async function lr(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Oa(await t.json(), ve.data));
		} catch {}
		r ||= Zn(e), t(r), ee(n, JSON.stringify(r)), D();
	}
	function ur(e, t) {
		let n = Gi(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = or(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		U("pages", () => {
			e.path = `/${n}`;
		});
	}
	function dr(e) {
		e.path !== "/" && (U("pages", () => {
			W(E).pages = W(E).pages.filter((t) => t.id !== e.id), W(E).nav.items = W(E).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of W(E).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			W(E).nav.items = W(E).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === W(g) && Qn(W(E).pages[0].id), x("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function fr(e) {
		U("edit:nav-logo", () => {
			W(E).nav.logo = {
				type: "text",
				value: "",
				...W(E).nav.logo,
				...e
			};
		});
	}
	function pr(e) {
		U("nav", () => {
			W(E).nav.logo ??= {
				type: "text",
				value: W(E).site.title
			};
			let t = W(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = W(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = W(E).site.title), delete t.image), t.type = e;
		});
	}
	async function mr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await an(t);
			U("nav", () => {
				let t = W(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x("Kunne ikke lese bildet (prøv jpg/png/webp/svg)", "error");
		}
	}
	let hr = /* @__PURE__ */ F(null);
	async function gr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await tn(t);
				I(hr, e.dataUrl, !0);
			} catch {
				x("Kunne ikke lese bildet (prøv jpg/png/webp/svg)", "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			I(hr, String(n.result), !0);
		}, n.onerror = () => x("Kunne ikke lese bildet (prøv jpg/png/webp)", "error"), n.readAsDataURL(t);
	}
	function _r(e) {
		U("edit:site-icon", () => {
			W(E).site.icon = e;
		}), I(hr, null);
	}
	function yr() {
		U("edit:site-icon", () => {
			delete W(E).site.icon;
		});
	}
	function xr(e) {
		U("edit:site-title", () => {
			W(E).site.title = e;
		});
	}
	function Sr(e) {
		U("edit:site-desc", () => {
			W(E).site.description = e;
		});
	}
	function Cr() {
		let e = W(E).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function wr() {
		let e = Cr();
		return [...Xe.some(([t]) => t === e) ? [] : [[e, e]], ...Xe];
	}
	function Tr(e) {
		U("site", () => {
			W(E).site.lang = e;
		});
	}
	let Er = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	xn(() => {
		if (!W(E)?.site) return;
		let e = W(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Er.test(e) && (t.href = e);
		}
	});
	function Dr(e) {
		U("nav", () => {
			W(E).nav.layout = e;
		});
	}
	function K(e, t) {
		U(`edit:nav-style-${e}`, () => {
			W(E).nav.style ??= {}, t === void 0 ? delete W(E).nav.style[e] : W(E).nav.style[e] = t;
		});
	}
	let Or = /* @__PURE__ */ N(() => W(E)?.nav?.variant === "side-left" || W(E)?.nav?.variant === "side-right"), Ar = /* @__PURE__ */ N(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(W(E)?.nav?.variant)), jr = {
		underline: ["Strekfarge", "Fargen på streken under lenken"],
		pill: ["Pillefarge", "Fargen på pille-flaten bak lenken"],
		lift: ["Glødfarge", "Fargen på gløden bak teksten"]
	}, Mr = /* @__PURE__ */ N(() => jr[W(E)?.nav?.style?.hover] ?? null);
	function Nr(e) {
		U("nav", () => {
			e === "bar" ? delete W(E).nav.variant : W(E).nav.variant = e;
		});
	}
	function Pr(e) {
		U("nav", () => {
			W(E).nav.style ??= {}, e ? W(E).nav.style.glow = !0 : delete W(E).nav.style.glow;
		});
	}
	function Ir(e) {
		U("nav", () => {
			W(E).nav.style ??= {}, e ? delete W(E).nav.style.topGap : W(E).nav.style.topGap = !1;
		});
	}
	function Lr(e) {
		U("nav", () => {
			W(E).nav.style ??= {}, e === "standard" ? delete W(E).nav.style.hover : W(E).nav.style.hover = e;
		});
	}
	let Rr = null, Br = {}, Vr = {}, Hr = !1, Ur = /* @__PURE__ */ F(nn([])), Wr = /* @__PURE__ */ F(nn({})), Gr = /* @__PURE__ */ F(null), Kr = /* @__PURE__ */ F(""), qr = /* @__PURE__ */ F("news"), Jr = [
		["news", "Nyheter"],
		["notices", "Oppslag"],
		["publications", "Publikasjoner"],
		["custom", "Egendefinert"]
	];
	async function Yr() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Rr = Si("urd-draft-samlinger", () => e, S), I(Ur, [...Rr.data.samlinger ?? []], !0);
		for (let e of W(Ur)) {
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
			}, Vr[e] = t, Br[e] = Si(`urd-draft-samling-${e}`, () => t, S);
		}
		Hr = !0, Zr();
	}
	function Zr(e = !0) {
		let t = {};
		for (let e of W(Ur)) Br[e] && (t[e] = JSON.parse(JSON.stringify(Br[e].data)));
		I(Wr, t, !0), e && $r();
	}
	function $r() {
		T?.sendCollections(Ve(W(Wr)) ?? {});
	}
	function ei(e, t, n, r = !0) {
		let i = Br[e];
		i && (De(t), n(i.data), i.save(), D(), Zr(r));
	}
	function ti(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || ei(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function ni() {
		let e = W(Kr).trim();
		if (!e) return;
		let t = Gi(e);
		if (!t || W(Ur).includes(t)) {
			x(t ? "Det finnes alt en samling med den adressen" : "Ugyldig navn", "error");
			return;
		}
		De("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: W(qr),
			entries: []
		};
		Vr[t] = {
			...n,
			entries: []
		}, Br[t] = Si(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		}), S), Br[t].replace(n), Br[t].save(), Rr.data.samlinger = [...W(Ur), t], Rr.save(), I(Ur, [...W(Ur), t], !0), I(Gr, t, !0), I(Kr, ""), D(), Zr();
	}
	function ai(e) {
		De("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete Br[e], Rr.data.samlinger = W(Ur).filter((t) => t !== e), Rr.save(), I(Ur, W(Ur).filter((t) => t !== e), !0), W(Gr) === e && I(Gr, null), D(), Zr();
	}
	function oi(e) {
		ei(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Pa("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function si(e, t, n, r) {
		ei(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function li(e, t, n) {
		ei(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function ui(e, t) {
		ei(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function di(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && si(e, t, "image", (await an(r)).dataUrl);
	}
	let pi = null, mi, hi = new Promise((e) => {
		mi = e;
	}), gi = /* @__PURE__ */ F(null), _i = nn({}), vi = /* @__PURE__ */ F("0.0.0"), xi = /* @__PURE__ */ F(""), Ci = /* @__PURE__ */ F(""), wi = /* @__PURE__ */ F(nn([])), Ti = /* @__PURE__ */ F("pending"), Ei = () => [.../* @__PURE__ */ new Set([...W(gi)?.enabled ?? [], ...W(gi)?.disabled ?? []])];
	function Di() {
		I(gi, JSON.parse(JSON.stringify(pi.data)), !0);
	}
	async function Oi() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		pi = Si("urd-draft-plugins", () => e, S), Di();
		try {
			I(vi, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Ei()) ji(e);
		ki(), mi(), T?.sendPlugins(Ve(W(gi))?.enabled ?? []);
	}
	async function ki() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ai();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), I(wi, (t ?? []).filter((e) => !Ei().includes(e)), !0);
			for (let e of W(wi)) ji(e);
			I(Ti, "ok");
		} catch {
			Ai();
		}
	}
	function Ai() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				I(wi, e.filter((e) => !Ei().includes(e)), !0);
				for (let e of W(wi)) ji(e);
				I(Ti, "ok");
				return;
			}
		} catch {}
		I(Ti, "unavailable");
	}
	async function ji(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Na(t);
			_i[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ja(W(vi), t.requiresEngine)
			};
		} catch {
			_i[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Mi(e, t) {
		De("plugins");
		let n = pi.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), pi.save(), D(), Di(), Ni();
	}
	function Ni() {
		W(C) && (W(C).src = W(C).src);
	}
	function Fi(e) {
		De("plugins");
		let t = pi.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), pi.save(), D(), Di(), Ni();
	}
	async function Ii() {
		I(Ci, "");
		let e = W(xi).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			I(Ci, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (Ei().includes(e)) {
			I(Ci, "Pluginen står allerede i listen");
			return;
		}
		if (await ji(e), _i[e].errors.length) {
			I(Ci, `Fant ingen gyldig plugin: ${_i[e].errors.join("; ")}`);
			return;
		}
		Mi(e, !0), I(xi, "");
	}
	function Li(e) {
		I(wi, W(wi).filter((t) => t !== e), !0), Mi(e, !0);
	}
	function zi(e, t) {
		U(e, () => {
			W(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(W(E).footer);
		});
	}
	function Bi(e, t) {
		zi(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function qi(e) {
		zi("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function Ji(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await an(t);
			zi("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x("Kunne ikke lese bildet (prøv jpg/png/webp/svg)", "error");
		}
	}
	function Yi() {
		zi("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function Xi(e) {
		zi("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function Zi(e) {
		zi("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let Qi = [
		{
			id: "minimal",
			label: "Minimal",
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "sentrert",
			label: "Sentrert",
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: "Kolonner",
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: "Sitemap",
			thumb: {
				tag: !0,
				fat: !0,
				cols: 4,
				social: 4,
				baselineLinks: 3
			}
		},
		{
			id: "nyhetsbrev",
			label: "Nyhetsbrev",
			thumb: {
				tag: !0,
				cta: !0,
				cols: 2,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "storcta",
			label: "Stor CTA",
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: "Kontakt",
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: "Mega",
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function $i(e) {
		let t = "Min forening", n = W(E).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a("Personvern", "#")]
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · Laget med Urd`
		} : e === "kolonner" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Et lite fellesskap for store spørsmål. Møtes annenhver torsdag."
			},
			columns: [
				{
					title: "Sider",
					links: r(4)
				},
				{
					title: "Selskap",
					links: [
						a("Om oss", "#"),
						a("Bli medlem", "#"),
						a("Presse", "#")
					]
				},
				{
					title: "Ressurser",
					links: [
						a("Vedtekter", "#"),
						a("Personvern", "#"),
						a("Kontakt", "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Vilkår", "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Alt på ett sted."
			},
			columns: [
				{
					title: "Utforsk",
					links: [
						a("Hjem", "#"),
						a("Arrangementer", "#"),
						a("Galleri", "#"),
						a("Blogg", "#")
					]
				},
				{
					title: "Selskap",
					links: [
						a("Om oss", "#"),
						a("Historie", "#"),
						a("Presse", "#"),
						a("Kontakt", "#")
					]
				},
				{
					title: "Støtte",
					links: [
						a("Bli medlem", "#"),
						a("FAQ", "#"),
						a("Hjelp", "#")
					]
				},
				{
					title: "Juridisk",
					links: [
						a("Personvern", "#"),
						a("Vilkår", "#"),
						a("Vedtekter", "#")
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
				a("Personvern", "#"),
				a("Vilkår", "#"),
				a("Cookies", "#")
			]
		} : e === "nyhetsbrev" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Få siste nytt om arrangementer og medlemsfordeler."
			},
			cta: {
				kind: "newsletter",
				heading: "Meld deg på nyhetsbrevet",
				label: "Meld på",
				recipient: "post@dinforening.no",
				success: "Takk, du er påmeldt!"
			},
			columns: [{
				title: "Sider",
				links: r(4)
			}, {
				title: "Mer",
				links: [
					a("Om oss", "#"),
					a("Kontakt", "#"),
					a("Personvern", "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a("Personvern", "#")]
		} : e === "storcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: "Klar til å bli med i fellesskapet?",
				sub: "Vi tar imot nye medlemmer hele året - kom innom en torsdag.",
				label: "Bli medlem",
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Vilkår", "#")]
		} : e === "kontakt" ? {
			align: "left",
			brand: {
				title: t,
				tagline: "Kom innom eller ta kontakt - vi svarer gjerne."
			},
			columns: [
				{
					title: "Besøk oss",
					links: [
						a("Storgata 1, 0155 Oslo", "#"),
						a("post@dinforening.no", "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: "Åpningstider",
					links: [a("Man-fre 09-16", "#"), a("Lør 10-14", "#")]
				},
				{
					title: "Sider",
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a("Personvern", "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: "Bli med i samtalen. Vi tar imot nye medlemmer hele året."
			},
			columns: [{
				title: "Utforsk",
				links: r(4)
			}, {
				title: "Følg oss",
				links: [a("Nyhetsbrev", "#"), a("post@dinforening.no", "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a("Personvern", "#"), a("Laget med Urd", "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: ao.version ?? 1,
					props: {
						...ao.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: so.version ?? 1,
					props: {
						...so.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function ra(e) {
		zi("footer-template", (t) => {
			let n = $i(e);
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
	function ia(e) {
		zi("footer", (t) => {
			t[e] ??= [], t[e].push(W(E).pages[0] ? {
				label: "Lenke",
				page: W(E).pages[0].id
			} : {
				label: "Lenke",
				href: "https://"
			});
		});
	}
	function aa(e, t) {
		zi("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function oa(e, t, n) {
		zi("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function sa(e, t, n) {
		zi(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function ca(e, t, n) {
		zi("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function la(e, t, n) {
		zi(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function ua(e) {
		zi("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function da(e) {
		zi("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: "Bli medlem"
			} : delete t.cta;
		});
	}
	function fa(e, t) {
		zi(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function ha(e) {
		zi("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function _a(e, t) {
		zi("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function va() {
		zi("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: "Kolonne",
				links: [{
					label: "Lenke",
					page: W(E).pages[0].id
				}]
			});
		});
	}
	function ya(e) {
		zi("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function ba(e, t) {
		zi("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Ca(e, t) {
		zi(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function wa(e) {
		zi("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: "Lenke",
				page: W(E).pages[0].id
			});
		});
	}
	function Ta(e, t) {
		zi("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Ea(e, t, n) {
		zi("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function ka(e, t, n) {
		zi(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Aa(e, t, n) {
		zi("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ma(e, t, n) {
		zi(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Fa() {
		zi("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Ia(e) {
		zi("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function La(e, t) {
		zi("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function za(e, t) {
		zi("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Ba(e, t) {
		zi(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Ga = ta.filter(([e]) => e === "Sosiale medier" || e === "Kommunikasjon").flatMap(([, e]) => e.map((e) => [e, ea[e].label]));
	function Ka(e, t) {
		U(`edit:nav-label-${e}`, () => {
			W(E).nav.items[e].label = t;
		});
	}
	function qa(e, t) {
		U("nav", () => {
			let n = W(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Ja(e, t) {
		U(`edit:nav-href-${e}`, () => {
			W(E).nav.items[e].href = t;
		});
	}
	function Ya(e, t) {
		let n = e + t, r = W(E).nav.items;
		n < 0 || n >= r.length || U("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Xa(e) {
		U("nav", () => {
			W(E).nav.items.splice(e, 1);
		});
	}
	function Za() {
		U("nav", () => {
			W(E).nav.items.push({
				label: "Lenke",
				page: W(E).pages[0].id
			});
		});
	}
	function Qa(e) {
		U("nav", () => {
			let t = W(E).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: W(E).pages[0].id
			});
		});
	}
	function $a(e, t, n) {
		U(`edit:nav-child-label-${e}-${t}`, () => {
			W(E).nav.items[e].children[t].label = n;
		});
	}
	function eo(e, t, n) {
		U("nav", () => {
			let r = W(E).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function to(e, t, n) {
		U(`edit:nav-child-href-${e}-${t}`, () => {
			W(E).nav.items[e].children[t].href = n;
		});
	}
	function no(e, t, n) {
		let r = t + n, i = W(E).nav.items[e].children;
		r < 0 || r >= i.length || U("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function ro(e, t) {
		U("nav", () => {
			let n = W(E).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = W(E).pages[0].id));
		});
	}
	function oo(e, t) {
		U(`edit:theme-color-${e}`, () => {
			W(E).theme.tokens.color[e] = t, W(E).theme.alt?.auto && (W(E).theme.alt.tokens.color = fo());
		});
	}
	function co(e, t) {
		U("theme", () => {
			W(E).theme.tokens.font[e] = t;
		});
	}
	function lo(e, t) {
		U("theme", () => {
			W(E).theme.tokens.radius[e] = t;
		});
	}
	function uo(e) {
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
	function fo() {
		return Object.fromEntries(Object.entries(W(E).theme.tokens.color).map(([e, t]) => [e, uo(t)]));
	}
	function po(e, t) {
		U(`edit:theme-alt-${e}`, () => {
			W(E).theme.alt.tokens.color[e] = t, W(E).theme.alt.auto = !1;
		});
	}
	function mo(e) {
		U("theme", () => {
			e === "light" ? delete W(E).theme.scheme : W(E).theme.scheme = e;
		});
	}
	function ho(e) {
		U("theme", () => {
			e ? W(E).theme.alt = {
				auto: !0,
				tokens: { color: fo() }
			} : delete W(E).theme.alt;
		});
	}
	function go(e) {
		U("theme", () => {
			W(E).theme.alt ??= { tokens: { color: fo() } }, W(E).theme.alt.auto = e, e && (W(E).theme.alt.tokens.color = fo());
		});
	}
	function _o(e) {
		let t = W(E).theme.tokens.font[e];
		return [...zo.some(([, e]) => e === t) ? [] : [[t, "Egendefinert"]], ...zo.map(([e, t]) => [t, e])];
	}
	let vo = (e) => parseInt(e, 10) || 0;
	function yo(e, t) {
		lo(e, `${t}px`);
	}
	let bo = (e, t) => e && t && t[e] ? t[e] : e, xo = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], So = [
		{
			id: "bronn",
			name: "Brønn",
			note: "turkis (Urd)",
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
			id: "stein",
			name: "Stein",
			note: "varm nøytral",
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
			id: "plomme",
			name: "Plomme",
			note: "vibrant violett",
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
			name: "Rose",
			note: "dus rosa",
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
			id: "hav",
			name: "Hav",
			note: "blå",
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
			id: "natt",
			name: "Natt",
			note: "mørk-først, indigo",
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
	function Co(e) {
		U("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of xo) W(E).theme.tokens.color[e] = n[e];
			t ? W(E).theme.scheme = "dark" : delete W(E).theme.scheme, W(E).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let wo = /* @__PURE__ */ N(() => {
		if (!W(E)) return null;
		let e = W(E).theme.tokens.color, t = W(E).theme.alt?.tokens?.color ?? {}, n = W(E).theme.scheme === "dark";
		return So.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return xo.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function To() {
		I(re, !W(re)), T?.sendChrome(W(re));
	}
	function Eo(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (De(`edit:${e.blockId}`), n.props = e.props, w.save(), D(), W(j)?.blockId === e.blockId && tt(), e.rerender && T?.sendSection(W(g), t), I(v, ""));
	}
	function Do(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		De(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && _e(t, "desktop-endret-etter-mobil"), w.save(), D(), W(j)?.blockId === e.blockId && tt();
	}
	function Oo(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (w.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), w.hasDraft() && De(`edit:${e.blockId}`), t.frames.desktop.h = e.h, w.save(), D(), W(j)?.blockId === e.blockId && tt());
	}
	function ko(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			De("mobile-manual");
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
			}, w.save(), D();
		}
	}
	function jo(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			De("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, w.save(), D(), ge(), T?.sendSection(W(g), t);
		}
	}
	function Mo(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (De("review-done"), t.responsive.mobile.attention = null, w.save(), D(), ge());
	}
	function No(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (De("decor"), t.decor = e.decor, w.save(), D(), W(j)?.blockId === e.blockId && tt());
	}
	function Io(e) {
		De("add-section"), e.section.id || (e.section.id = Pa("sec")), w.data.sections.splice(e.index, 0, e.section), w.save(), D(), T?.sendPage(W(g), w.data), I(yt, e.section.id, !0), Et(e.section), W(qe) !== "properties" && (I(qe, "properties"), T?.sendShowGrid(!1));
	}
	function Lo(e) {
		let t = w.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (De("move-section"), [t[n], t[r]] = [t[r], t[n]], w.save(), D(), T?.sendPage(W(g), w.data));
	}
	function Cl(e) {
		De("delete-section"), e.sectionId === W(yt) && (I(yt, null), I(bt, null)), W(j)?.sectionId === e.sectionId && I(j, null), w.data.sections = w.data.sections.filter((t) => t.id !== e.sectionId), w.save(), D(), T?.sendPage(W(g), w.data);
	}
	function wl(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			De("section-size"), t.size = {
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
			e.moves?.length && (_e(t, "seksjonshøyde"), W(j)?.sectionId === e.sectionId && tt()), e.sectionId === W(yt) && I(xt, e.minHeight, !0), w.save(), D();
		}
	}
	function Tl(e) {
		let t = w.data.sections.find((t) => t.id === e.fromSectionId), n = w.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (De("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), _e(t, "blokk-flyttet"), _e(n, "blokk-flyttet"), w.save(), D(), ge(), T?.sendPage(W(g), w.data), W(j)?.blockId === e.blockId && (I(j, {
			...W(j),
			sectionId: e.toSectionId
		}, !0), tt()));
	}
	function El(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		De("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(W(j)?.blockId) && I(j, null), _e(t, "blokk-slettet"), w.save(), D(), T?.sendSection(W(g), t);
	}
	let Dl = {
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
		},
		faq: {
			type: "faq",
			props: {
				items: [
					{
						q: "Hvordan blir jeg medlem?",
						a: "<p>Skriv svaret her.</p>"
					},
					{
						q: "Når er dere åpne?",
						a: "<p>Skriv svaret her.</p>"
					},
					{
						q: "Hvordan kontakter jeg dere?",
						a: "<p>Skriv svaret her.</p>"
					}
				],
				multi: !1
			},
			w: 50,
			h: 220
		}
	};
	function Ol(e) {
		let t = Dl[e];
		return t ? {
			id: Pa("blk"),
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
	function kl(e) {
		T ? T.sendPlaceBlock(e) : Al(In()?.id, e);
	}
	function Al(e, t) {
		let n = w.data.sections.find((t) => t.id === e) ?? w.data.sections[0];
		if (!n) return;
		De("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), _e(n, "blokk-lagt-til"), w.save(), D(), T?.sendSection(W(g), n);
	}
	function jl(e, t, n, r) {
		let i = w.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		De("add-blocks");
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
		}), _e(i, "blokk-lagt-til"), w.save(), D(), T?.sendSection(W(g), i);
	}
	function Ml(e) {
		kl(Ol(e));
	}
	let Nl = /* @__PURE__ */ F(nn([]));
	function Pl(e, t = {}) {
		kl({
			id: Pa("blk"),
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
	function Fl(e) {
		let t = Ol(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = w.data.sections.find((t) => t.id === e.sectionId)?.grid ?? W(E).grid, r = Bo({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Al(e.sectionId, t), T?.sendSelect(t.id), e.kind === "image" && x("Bildeblokk lagt til - velg bildet i Egenskaper"), e.kind === "galleri" && x("Galleri lagt til - legg til bilder i Egenskaper");
		}
	}
	async function Il(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x("Komprimerer bildet…");
		let n;
		try {
			n = await an(t);
		} catch {
			x("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (W(C)?.clientWidth ?? 1280));
		kl({
			id: Pa("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Gi(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : x("");
	}
	async function Ll(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await an(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: Gi(i.name).replaceAll("-", " "),
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
	function Rl(e, t, n) {
		t ? x(`${t} av bildene kunne ikke leses (prøv jpg/png/webp)`, "error") : n ? x(`${n} av bildene er store - vurder mindre utsnitt`, "error") : x(e ? "" : "Ingen bilder lagt til");
	}
	async function zl(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Ll(t);
		n.length && st("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Rl(n.length, r, i);
	}
	async function Bl(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x("Komprimerer bildene…");
		let { images: n, failed: r, big: i } = await Ll(t);
		if (!n.length) {
			Rl(0, r, i);
			return;
		}
		let a = Ol("galleri");
		a.props.images = n, kl(a), Rl(n.length, r, i);
	}
	function Vl(e, t) {
		st("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Hl(e) {
		st("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Ul(e, t, n) {
		st(`edit:${W(j).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Wl(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${Gi(n || "bilde")}-${Ki(a)}.${Wi(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function Gl(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && Wl(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) Wl(e, "src", "bakgrunn", t);
	}
	function Kl(e) {
		let t = [];
		for (let n of e.sections) {
			Gl(n.background, t);
			for (let e of n.blocks) if (e.type === "image" && Wl(e.props, "src", e.props.alt, t), e.type === "icon" && Wl(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) Wl(n, "src", n.alt || "galleri", t);
		}
		return t;
	}
	function ql(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Wl(n, "value", "logo", t), n?.type === "both" && Wl(n, "image", "logo", t), e.nav?.style && Wl(e.nav.style, "image", "meny", t), Gl(e.nav?.style?.background, t), Gl(e.footer?.background, t), e.footer?.brand && Wl(e.footer.brand, "logo", "footer-logo", t), Wl(e.site, "icon", "ikon", t), t;
	}
	let Jl = /* @__PURE__ */ F(!1);
	function Yl() {
		if (!W(Jl)) {
			I(Jl, !0);
			return;
		}
		I(Jl, !1), Xl();
	}
	xn(() => {
		if (!W(Jl)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || I(Jl, !1);
		}, t = (e) => {
			e.key === "Escape" && I(Jl, !1);
		}, n = () => I(Jl, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Xl() {
		De("discard");
		for (let e of W(E).pages) e.id !== W(g) && !xe.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = w.reset();
		if (ve.reset(), pi && (pi.reset(), Di()), Rr) {
			Rr.reset(), I(Ur, [...Rr.data.samlinger ?? []], !0);
			for (let e of Object.keys(Br)) W(Ur).includes(e) ? Br[e].reset() : delete Br[e];
			Zr();
		}
		ye(), I(ne, {
			snap: !0,
			...W(E).grid
		}, !0), D(), I(v, ""), be(), W(E).pages.some((e) => e.id === W(g)) ? T?.sendPage(W(g), e) : Qn(W(E).pages[0].id);
	}
	async function Zl() {
		if (qn) {
			x("Du har angret en publisering: last admin på nytt før du publiserer igjen (editoren viser fortsatt den gamle versjonen)", "error");
			return;
		}
		x("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let i of W(E).pages) {
			let a = `urd-draft-${i.id}`, o = xe.has(i.id) || !W(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === W(g) && (w.hasDraft() || o)) s = w.data;
			else if (i.id !== W(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Oa(JSON.parse(e), ve.data);
				} catch {}
			}
			if (!s && o && (s = Zn(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Kl(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (ve.hasDraft()) {
			let r = JSON.parse(JSON.stringify(W(E)));
			e.push(...ql(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Ra(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(W(h).theme, W(E).theme) || t.push("tema"), i(W(h).nav, W(E).nav) || t.push("menyen"), i(W(h).footer, W(E).footer) || t.push("footeren"), i(W(h).pages, W(E).pages) || t.push("sideregisteret"), i(W(h).grid, W(E).grid) || t.push("gridet"), (W(h).site.icon ?? null) !== (W(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = W(h).site, { icon: s, ...c } = W(E).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Br).filter(([, e]) => e.hasDraft());
		if (i.length || Rr?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Wl(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Rr?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Rr.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!W(Ur).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		pi?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(pi.data, null, 2) + "\n",
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
		for (let e of W(h).pages) {
			let t = W(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let s = await Un(e);
		if (!s.ok) {
			x("Publisering avbrutt. Last siden på nytt for å se de andre endringene først.", "error");
			return;
		}
		let c = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
			files: e,
			...s.head ? { expect: s.head } : {}
		}, l = null;
		try {
			l = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(c)
			});
		} catch {}
		if (l?.ok) {
			let { sha: e } = await l.json().catch(() => ({}));
			e ? Vn = e : Hn(), Kl(w.data), ql(W(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) xe.add(e);
			if (I(h, JSON.parse(JSON.stringify(W(E))), !0), ve = Si("urd-draft-site", () => W(h), S), ye(), pi) {
				let e = JSON.parse(JSON.stringify(pi.data));
				pi = Si("urd-draft-plugins", () => e, S), Di();
			}
			if (Rr) {
				for (let e of Object.values(Br)) for (let t of e.data.entries) Wl(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Rr.data));
				Rr = Si("urd-draft-samlinger", () => e, S), Vr = {};
				for (let e of W(Ur)) {
					if (!Br[e]) continue;
					let t = JSON.parse(JSON.stringify(Br[e].data));
					Vr[e] = t, Br[e] = Si(`urd-draft-samling-${e}`, () => t, S);
				}
				Zr();
			}
			I(ne, {
				snap: !0,
				...W(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(w.data));
			w = Si(`urd-draft-${W(g)}`, () => t, S), xe.has(W(g)) && ee(`urd-draft-${W(g)}`, JSON.stringify(t)), D(), x("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (l?.status === 401) {
			let e = (await l.json().catch(() => null))?.error;
			x(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await Bn();
		} else l?.status === 403 ? x((await l.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : l?.status === 409 ? x("Noen publiserte akkurat nå - prøv å publisere på nytt", "error") : x(l ? (await l.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	Pe();
	var Ql = Sl();
	br("keydown", rn, Ne), br("pointerdown", rn, Me);
	var $l = R(Ql), eu = L($l), tu = (e) => {
		var t = js();
		X(L(t), () => c.pencil), A(), k(t), G("click", t, To), q(e, t);
	};
	Y(eu, (e) => {
		W(re) || e(tu);
	});
	var nu = z(eu, 2);
	let ru;
	var iu = L(nu), au = z(L(iu), 2);
	{
		let e = /* @__PURE__ */ N(() => yi("topbar.adminTheme.title"));
		$(au, {
			get value() {
				return W(u);
			},
			get title() {
				return W(e);
			},
			get options() {
				return l;
			},
			onchange: (e) => I(u, e, !0)
		});
	}
	var ou = z(au, 2);
	{
		let e = /* @__PURE__ */ N(() => yi("topbar.language.title")), t = /* @__PURE__ */ N(() => [["auto", yi("lang.auto")], ...Xe]);
		$(ou, {
			get value() {
				return Ze;
			},
			get title() {
				return W(e);
			},
			get options() {
				return W(t);
			},
			onchange: Qe
		});
	}
	var su = z(ou, 2), cu = (e) => {
		var t = Ms(), n = R(t), r = L(n, !0);
		k(n);
		var i = z(n, 2), a = L(i);
		let o;
		X(a, () => c.desktop, !0), k(a);
		var s = z(a, 2);
		let l;
		X(s, () => c.phone, !0), k(s), k(i);
		var u = z(i, 2), d = L(u);
		let f;
		X(d, () => c.fit, !0), k(d);
		var p = z(d, 2);
		let m;
		var h = z(p, 2), g = L(h);
		k(h), k(u);
		var _ = z(u, 2);
		let v;
		X(_, () => c.guides, !0), k(_), B((e, t) => {
			J(r, e), o = Xr(a, 1, "ghost svelte-1n46o8q", null, o, { active: W(ie) === "desktop" }), l = Xr(s, 1, "ghost svelte-1n46o8q", null, l, { active: W(ie) === "mobile" }), f = Xr(d, 1, "ghost svelte-1n46o8q", null, f, { active: W(le) === "fit" }), m = Xr(p, 1, "ghost svelte-1n46o8q", null, m, { active: W(le) === "full" }), J(g, `${t ?? ""}%`), v = Xr(_, 1, "ghost svelte-1n46o8q", null, v, { active: W(tr) });
		}, [() => Se()?.title ?? "", () => Math.round(W(de) * 100)]), G("click", n, () => $e("pages")), G("click", a, () => I(ie, "desktop")), G("click", s, () => I(ie, "mobile")), G("click", d, () => I(le, "fit")), G("click", p, () => I(le, "full")), G("click", _, nr), q(e, t);
	};
	Y(su, (e) => {
		W(h) && e(cu);
	});
	var lu = z(su, 2), uu = (e) => {
		var t = Ns(), n = L(t);
		X(n, () => c.phone);
		var r = z(n);
		k(t), B(() => J(r, ` ${W(he) ?? ""} ${W(he) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), G("click", t, () => I(ie, "mobile")), q(e, t);
	};
	Y(lu, (e) => {
		W(he) > 0 && e(uu);
	});
	var du = z(lu, 2), fu = (e) => {
		var t = Ps(), n = z(R(t), 2);
		let r;
		var i = L(n, !0);
		k(n), B(() => {
			r = Xr(n, 1, "ghost discard-btn svelte-1n46o8q", null, r, { armed: W(Jl) }), ii(n, "title", W(Jl) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), J(i, W(Jl) ? "Sikker?" : "Forkast utkast");
		}), G("click", n, Yl), q(e, t);
	};
	Y(du, (e) => {
		W(_) && e(fu);
	}), k(iu);
	var pu = z(iu, 2), mu = L(pu), hu = (e) => {
		var t = zs(), n = R(t), r = L(n), i = (e) => {
			var t = Fs();
			X(R(t), () => c.eye), A(), q(e, t);
		}, a = (e) => {
			var t = Is();
			X(R(t), () => c.pencil), A(), q(e, t);
		};
		Y(r, (e) => {
			W(re) ? e(i) : e(a, -1);
		}), k(n);
		var o = z(n, 2), s = (e) => {
			var t = Ls(), n = L(t), r = (e) => {
				var t = kr();
				X(R(t), () => c.warn), q(e, t);
			};
			Y(n, (e) => {
				W(te).allowed || e(r);
			});
			var i = z(n, 1, !0);
			k(t), B(() => {
				ii(t, "title", W(te).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), J(i, W(te).login);
			}), q(e, t);
		}, l = (e) => {
			q(e, Rs());
		};
		Y(o, (e) => {
			W(te)?.loggedIn ? e(s) : W(te) && e(l, 1);
		});
		var u = z(o, 2), d = z(u, 2);
		B((e) => {
			ii(n, "title", W(re) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ii(u, "href", e), d.disabled = !W(_);
		}, [() => Se()?.path ?? "/"]), G("click", n, To), G("click", d, Zl), q(e, t);
	};
	Y(mu, (e) => {
		W(h) && e(hu);
	}), k(pu), k(nu);
	var gu = z(nu, 2), _u = (e) => {
		var t = hl(), i = L(t), o = (e) => {
			var t = ml(), i = R(t);
			zr(i, 21, () => Je, Fr, (e, t, n) => {
				var r = Hs(), i = R(r), a = (e) => {
					q(e, Bs());
				};
				Y(i, (e) => {
					n > 0 && e(a);
				}), zr(z(i, 2), 16, () => W(t), (e) => e, (e, t) => {
					var n = Vs();
					let r;
					var i = L(n, !0);
					k(n), B(() => {
						r = Xr(n, 1, "svelte-1n46o8q", null, r, { active: W(qe) === t }), J(i, Ye[t]);
					}), G("click", n, () => $e(t)), q(e, n);
				}), q(e, r);
			}), k(i);
			var o = z(i, 2), s = (e) => {
				var t = pl(), i = L(t), o = L(i, !0);
				k(i);
				var s = z(i, 2), l = (e) => {
					var t = qs(), n = z(L(t), 2);
					zr(n, 17, () => W(E).pages, (e) => e.id, (e, t) => {
						var n = Ks();
						let r;
						var i = L(n);
						Z(i);
						var a = z(i, 2), o = (e) => {
							q(e, Us());
						}, s = (e) => {
							var n = Ws();
							Z(n), B((e) => Q(n, e), [() => W(t).path.slice(1)]), G("change", n, (e) => ur(W(t), e.target.value)), q(e, n);
						};
						Y(a, (e) => {
							W(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = z(a, 2), u = L(l);
						X(u, () => c.right, !0), k(u);
						var d = z(u, 2), f = (e) => {
							var n = Gs();
							X(n, () => c.cross, !0), k(n), G("click", n, () => dr(W(t))), q(e, n);
						};
						Y(d, (e) => {
							W(t).path !== "/" && e(f);
						}), k(l), k(n), B(() => {
							r = Xr(n, 1, "page-row svelte-1n46o8q", null, r, { current: W(t).id === W(g) }), Q(i, W(t).title), u.disabled = W(t).id === W(g);
						}), G("change", i, (e) => cr(W(t), e.target.value)), G("click", u, () => Qn(W(t).id)), q(e, n);
					});
					var r = z(n, 4);
					Z(r);
					var i = z(r, 2);
					A(2), k(t), B((e) => i.disabled = e, [() => !W(ir).trim()]), G("keydown", r, (e) => e.key === "Enter" && sr()), ci(r, () => W(ir), (e) => I(ir, e)), G("click", i, sr), q(e, t);
				}, u = (e) => {
					var t = sc(), r = z(L(t), 2), i = z(L(r), 2), a = L(i), o = z(L(a));
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
							onchange: (e) => pr(e)
						});
					}
					k(a);
					var s = z(a, 2), l = (e) => {
						var t = Js(), n = R(t);
						Z(n);
						var r = z(n, 2), i = L(r);
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ N(() => [["", "Arv"], ...zo.map(([e, t]) => [t, e])]);
							$(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => fr({ font: e || void 0 })
							});
						}
						var a = z(i, 2);
						Z(a);
						var o = z(a, 2);
						let s;
						var c = z(o, 2);
						let l;
						k(r), B((e) => {
							Q(n, W(E).nav.logo?.value ?? ""), Q(a, W(E).nav.logo?.textSize ?? ""), s = Xr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: W(E).nav.logo?.bold !== !1 }), l = Xr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!W(E).nav.logo?.italic })]), G("input", n, (e) => fr({ value: e.target.value })), G("change", a, (e) => fr({ textSize: e.target.value ? Number(e.target.value) : void 0 })), G("click", o, () => fr({ bold: W(E).nav.logo?.bold === !1 })), G("click", c, () => fr({ italic: !W(E).nav.logo?.italic })), q(e, t);
					};
					Y(s, (e) => {
						(W(E).nav.logo?.type ?? "text") !== "image" && e(l);
					});
					var u = z(s, 2), d = (e) => {
						var t = Ys(), n = R(t), r = L(n), i = L(r), a = z(i);
						k(r);
						var o = z(r, 2);
						Z(o);
						var s = z(o, 2);
						Z(s), k(n), A(2), B(() => {
							J(i, `${(W(E).nav.logo?.type === "image" ? W(E).nav.logo?.value : W(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Q(o, W(E).nav.logo?.size ?? 32), Q(s, W(E).nav.logo?.radius ?? 0);
						}), G("change", a, mr), G("change", o, (e) => fr({ size: Number(e.target.value) })), G("change", s, (e) => fr({ radius: Number(e.target.value) })), q(e, t);
					};
					Y(u, (e) => {
						(W(E).nav.logo?.type ?? "text") !== "text" && e(d);
					});
					var f = z(u, 2), p = (e) => {
						var t = Xs(), n = z(L(t));
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.logo?.order ?? "image-first");
							$(n, {
								get value() {
									return W(e);
								},
								options: [["image-first", "Bilde først"], ["text-first", "Tekst først"]],
								onchange: (e) => fr({ order: e })
							});
						}
						k(t), q(e, t);
					};
					Y(f, (e) => {
						W(E).nav.logo?.type === "both" && e(p);
					}), A(2), k(i), k(r);
					var m = z(r, 2), h = z(L(m), 2), g = L(h), _ = z(L(g));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.variant ?? "bar");
						$(_, {
							get value() {
								return W(e);
							},
							options: [
								["bar", "Stripe (standard)"],
								["floating", "Flytende (pille)"],
								["floating-square", "Flytende (firkant)"],
								["floating-tab", "Flytende (tab)"],
								["side-left", "Sidestilt venstre"],
								["side-right", "Sidestilt høyre"]
							],
							onchange: (e) => Nr(e)
						});
					}
					k(g);
					var v = z(g, 2), y = (e) => {
						var t = Zs(), n = R(t), r = L(n);
						Z(r), A(), k(n);
						var i = z(n, 2), a = L(i);
						Z(a), A(), k(i), B(() => {
							ri(r, W(E).nav.style?.glow === !0), ri(a, W(E).nav.style?.topGap !== !1);
						}), G("change", r, (e) => Pr(e.target.checked)), G("change", a, (e) => Ir(e.target.checked)), q(e, t);
					};
					Y(v, (e) => {
						W(Ar) && e(y);
					});
					var b = z(v, 2), x = (e) => {
						var t = Qs(), n = L(t);
						Z(n), A(), k(t), B(() => ri(n, W(E).nav.overlay === !0)), G("change", n, (e) => U("nav", () => {
							e.target.checked ? W(E).nav.overlay = !0 : delete W(E).nav.overlay;
						})), q(e, t);
					};
					Y(b, (e) => {
						!W(Ar) && !W(Or) && e(x);
					});
					var S = z(b, 2), ee = (e) => {
						var t = $s(), n = z(L(t));
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
								onchange: (e) => K("sideAlign", e === "left" ? void 0 : e)
							});
						}
						k(t), q(e, t);
					};
					Y(S, (e) => {
						W(Or) && e(ee);
					});
					var C = z(S, 2), te = L(C);
					Z(te), A(), k(C);
					var ne = z(C, 2), re = z(L(ne));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.size ?? "md");
						$(re, {
							get value() {
								return W(e);
							},
							options: [
								["sm", "Liten"],
								["md", "Standard"],
								["lg", "Stor"],
								["xl", "Ekstra stor"]
							],
							onchange: (e) => K("size", e === "md" ? void 0 : e)
						});
					}
					k(ne);
					var ie = z(ne, 2), ae = z(L(ie)), oe = (e) => {
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
								onchange: (e) => K("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, se = (e) => {
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
								onchange: (e) => Dr(e)
							});
						}
					};
					Y(ae, (e) => {
						W(Or) ? e(oe) : e(se, -1);
					}), k(ie);
					var ce = z(ie, 2), le = (e) => {
						var t = tc(), n = R(t), r = L(n);
						Z(r), A(), k(n);
						var i = z(n, 2), a = (e) => {
							var t = ec(), n = z(L(t));
							{
								let e = /* @__PURE__ */ N(() => W(E).nav.scroll ?? "none");
								$(n, {
									get value() {
										return W(e);
									},
									options: [
										["none", "Som vanlig"],
										["shrink", "Krymp menyen"],
										["hide", "Skjul, vis ved scroll opp"]
									],
									onchange: (e) => U("nav", () => {
										e === "none" ? delete W(E).nav.scroll : W(E).nav.scroll = e;
									})
								});
							}
							k(t), q(e, t);
						};
						Y(i, (e) => {
							W(E).nav.sticky !== !1 && e(a);
						}), B(() => ri(r, W(E).nav.sticky !== !1)), G("change", r, (e) => U("nav", () => {
							W(E).nav.sticky = e.target.checked;
						})), q(e, t);
					};
					Y(ce, (e) => {
						W(Or) || e(le);
					});
					var ue = z(ce, 2), de = z(L(ue));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.hover ?? "standard");
						$(de, {
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
							onchange: (e) => Lr(e)
						});
					}
					k(ue);
					var fe = z(ue, 2), pe = (e) => {
						var t = nc(), n = R(t), r = z(L(n)), i = L(r);
						k(r), k(n);
						var a = z(n, 2);
						Z(a), B((e) => {
							J(i, `${e ?? ""}%`), Q(a, W(E).nav.style?.hoverGlow ?? .6);
						}, [() => Math.round((W(E).nav.style?.hoverGlow ?? .6) * 100)]), G("input", a, (e) => K("hoverGlow", Number(e.target.value))), q(e, t);
					};
					Y(fe, (e) => {
						W(E).nav.style?.hover === "lift" && e(pe);
					});
					var me = z(fe, 2), he = (e) => {
						var t = rc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ N(hn);
							Pi(r, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								get label() {
									return W(Mr)[1];
								},
								onchange: (e) => K("hoverColor", e)
							});
						}
						k(t), B(() => {
							ii(t, "title", W(Mr)[1]), J(n, `${W(Mr)[0] ?? ""} `);
						}), q(e, t);
					};
					Y(me, (e) => {
						W(Mr) && e(he);
					});
					var ge = z(me, 2), _e = z(L(ge));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ N(hn);
						Pi(_e, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Tekstfargen ved hover",
							onchange: (e) => K("hoverTextColor", e)
						});
					}
					k(ge);
					var w = z(ge, 2), ve = z(L(w));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ N(hn);
						Pi(ve, {
							get value() {
								return W(e);
							},
							get tokens() {
								return W(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => K("textColor", e)
						});
					}
					k(w);
					var T = z(w, 6);
					n(T, () => pn, () => W(E).nav?.style?.background?.layers ?? []), k(h), k(m);
					var ye = z(m, 2), be = z(L(ye), 2), xe = L(be), Se = z(L(xe));
					{
						let e = /* @__PURE__ */ N(() => W(E).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ N(() => W(Or) ? [
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
						$(Se, {
							get value() {
								return W(e);
							},
							get options() {
								return W(t);
							},
							onchange: (e) => K("subStyle", e === "card" ? void 0 : e)
						});
					}
					k(xe);
					var D = z(xe, 2), Ce = (e) => {
						var t = ic(), n = z(L(t));
						{
							let e = /* @__PURE__ */ N(() => W(E).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ N(hn);
							Pi(n, {
								get value() {
									return W(e);
								},
								get tokens() {
									return W(t);
								},
								label: "Pille-punktenes farge",
								onchange: (e) => K("subPillColor", e)
							});
						}
						k(t), q(e, t);
					};
					Y(D, (e) => {
						W(E).nav.style?.subStyle === "pills" && e(Ce);
					});
					var we = z(D, 2), Te = z(L(we));
					Z(Te), k(we), k(be), k(ye);
					var Ee = z(ye, 2), De = z(L(Ee), 2), Oe = L(De);
					zr(Oe, 17, () => W(E).nav.items, Fr, (e, t, n) => {
						var r = oc(), i = R(r), a = L(i);
						Z(a);
						var o = z(a, 2), s = L(o);
						X(s, () => c.plus, !0), k(s);
						var l = z(s, 2);
						l.disabled = n === 0, X(l, () => c.up, !0), k(l);
						var u = z(l, 2);
						X(u, () => c.down, !0), k(u);
						var d = z(u, 2);
						X(d, () => c.cross, !0), k(d), k(o);
						var f = z(o, 2), p = L(f);
						{
							let e = /* @__PURE__ */ N(() => W(t).page ?? (W(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ N(() => [
								...W(E).pages.map((e) => [e.id, e.title]),
								["__href", "Lenke (URL/anker)"],
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
								onchange: (e) => qa(n, e)
							});
						}
						k(f);
						var m = z(f, 2), h = (e) => {
							var r = ns();
							Z(r), B(() => Q(r, W(t).href)), G("change", r, (e) => Ja(n, e.target.value)), q(e, r);
						};
						Y(m, (e) => {
							!W(t).page && W(t).href != null && e(h);
						}), k(i), zr(z(i, 2), 17, () => W(t).children ?? [], Fr, (e, r, i) => {
							var a = ac(), o = L(a);
							Z(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, X(l, () => c.up, !0), k(l);
							var u = z(l, 2);
							X(u, () => c.down, !0), k(u);
							var d = z(u, 2);
							X(d, () => c.cross, !0), k(d), k(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ N(() => W(r).page ?? "__href"), t = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Lenke (URL/anker)"]]);
								$(p, {
									get value() {
										return W(e);
									},
									title: "Hvor lenken går",
									get options() {
										return W(t);
									},
									onchange: (e) => eo(n, i, e)
								});
							}
							k(f);
							var m = z(f, 2), h = (e) => {
								var t = ns();
								Z(t), B(() => Q(t, W(r).href ?? "")), G("change", t, (e) => to(n, i, e.target.value)), q(e, t);
							};
							Y(m, (e) => {
								W(r).page || e(h);
							}), k(a), B(() => {
								Q(o, W(r).label), u.disabled = i === W(t).children.length - 1;
							}), G("input", o, (e) => $a(n, i, e.target.value)), G("click", l, () => no(n, i, -1)), G("click", u, () => no(n, i, 1)), G("click", d, () => ro(n, i)), q(e, a);
						}), B(() => {
							Q(a, W(t).label), u.disabled = n === W(E).nav.items.length - 1;
						}), G("input", a, (e) => Ka(n, e.target.value)), G("click", s, () => Qa(n)), G("click", l, () => Ya(n, -1)), G("click", u, () => Ya(n, 1)), G("click", d, () => Xa(n)), q(e, r);
					});
					var ke = z(Oe, 2);
					A(2), k(De), k(Ee), k(t), B(() => {
						ri(te, W(E).nav.style?.blur !== !1), Q(Te, W(E).nav.style?.subColumns ?? 1);
					}), G("change", te, (e) => K("blur", e.target.checked)), G("change", Te, (e) => K("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), G("click", ke, Za), q(e, t);
				}, f = (e) => {
					var t = uc(), n = L(t), r = z(L(n));
					Z(r), k(n);
					var i = z(n, 2), a = z(L(i));
					Z(a), k(i);
					var o = z(i, 2), s = L(o), l = z(s);
					{
						let e = /* @__PURE__ */ N(Cr), t = /* @__PURE__ */ N(wr);
						$(l, {
							get value() {
								return W(e);
							},
							get options() {
								return W(t);
							},
							onchange: (e) => Tr(e)
						});
					}
					k(o);
					var u = z(o, 4), d = z(L(u)), f = (e) => {
						var t = cc();
						B(() => ii(t, "src", W(E).site.icon)), q(e, t);
					};
					Y(d, (e) => {
						W(E).site.icon && e(f);
					}), k(u);
					var p = z(u, 2), m = L(p), h = L(m), g = z(h);
					k(m);
					var _ = z(m, 2), v = (e) => {
						var t = lc(), n = R(t);
						X(n, () => c.pencil ?? "✎", !0), k(n);
						var r = z(n, 2);
						X(r, () => c.cross, !0), k(r), G("click", n, () => I(hr, W(E).site.icon, !0)), G("click", r, yr), q(e, t);
					};
					Y(_, (e) => {
						W(E).site.icon && e(v);
					}), k(p), k(t), B((e, t) => {
						Q(r, W(E).site.title ?? ""), Q(a, W(E).site.description ?? ""), ii(o, "title", e), J(s, `${t ?? ""} `), J(h, `${W(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}, [() => yi("site.langTitle"), () => yi("site.langLabel")]), G("input", r, (e) => xr(e.target.value)), G("input", a, (e) => Sr(e.target.value)), G("change", g, gr), q(e, t);
				}, p = (e) => {
					var t = yc();
					{
						let e = (e, t = d, n = d) => {
							var r = fc(), i = L(r), a = (e) => {
								var t = dc(), r = L(t, !0);
								k(t), B(() => J(r, n())), q(e, t);
							};
							Y(i, (e) => {
								n() && e(a);
							});
							var o = z(i, 2);
							k(r), B((e, t, n, r, i) => Qr(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), [
								() => bo(t().bg, t()),
								() => bo(t().surface, t()),
								() => bo(t().text, t()),
								() => bo(t().accent, t()),
								() => bo(t()["accent-text"] ?? t().bg, t())
							]), q(e, r);
						};
						var n = z(L(t), 2);
						zr(n, 21, () => So, (e) => e.id, (e, t) => {
							var n = pc();
							let r;
							var i = L(n), a = L(i), o = z(a), s = z(o), c = z(s);
							k(i);
							var l = z(i, 2), u = L(l, !0);
							k(l), k(n), B(() => {
								r = Xr(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: W(wo) === W(t).id }), ii(n, "title", `${W(t).name} - ${W(t).note}`), Qr(a, `background:${W(t).light.bg ?? ""}`), Qr(o, `background:${W(t).light.surface ?? ""}`), Qr(s, `background:${W(t).light.accent ?? ""}`), Qr(c, `background:${W(t).light.text ?? ""}`), J(u, W(t).name);
							}), G("click", n, () => Co(W(t))), q(e, n);
						}), k(n);
						var r = z(n, 4), i = L(r);
						Z(i), A(), k(r);
						var a = z(r, 2), o = (e) => {
							var t = mc(), n = z(L(t), 2), r = L(n);
							let i;
							var a = z(r, 2);
							let o;
							k(n), k(t), B(() => {
								i = Xr(r, 1, "svelte-1n46o8q", null, i, { on: W(vn) }), o = Xr(a, 1, "svelte-1n46o8q", null, o, { on: !W(vn) });
							}), G("click", r, () => go(!0)), G("click", a, () => go(!1)), q(e, t);
						};
						Y(a, (e) => {
							W(_n) && e(o);
						});
						var s = z(a, 2), c = L(s), l = (e) => {
							q(e, hc());
						};
						Y(c, (e) => {
							W(_n) && e(l);
						});
						var u = z(c, 2);
						let ge;
						k(s);
						var f = z(s, 2);
						zr(f, 21, () => gn, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ N(() => m(W(t), 3));
							let r = () => W(n)[0], i = () => W(n)[1], a = () => W(n)[2];
							var o = gc(), s = L(o);
							{
								let e = /* @__PURE__ */ N(() => W(E).theme.tokens.color[r()] ?? W(E).theme.tokens.color.bg), t = /* @__PURE__ */ N(hn);
								Pi(s, {
									get value() {
										return W(e);
									},
									get tokens() {
										return W(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => oo(r(), e)
								});
							}
							var c = z(s, 2), l = L(c, !0);
							k(c);
							var u = z(c, 2), d = L(u, !0);
							k(u), k(o), B((e) => {
								J(l, a()), J(d, e);
							}, [() => bo(W(E).theme.tokens.color[r()] ?? W(E).theme.tokens.color.bg, W(bn))]), q(e, o);
						}), k(f);
						var p = z(f, 2), h = (e) => {
							var t = vc(), n = R(t), r = z(L(n), 2);
							let i;
							k(n);
							var a = z(n, 2);
							let o;
							zr(a, 21, () => gn, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ N(() => m(W(t), 3));
								let r = () => W(n)[0], i = () => W(n)[1], a = () => W(n)[2];
								var o = gc(), s = L(o);
								{
									let e = /* @__PURE__ */ N(() => W(E).theme.alt.tokens.color[r()] ?? W(Sn)[r()] ?? W(E).theme.tokens.color.bg), t = /* @__PURE__ */ N(hn), n = /* @__PURE__ */ N(() => `Mørk ${i()}`);
									Pi(s, {
										get value() {
											return W(e);
										},
										get tokens() {
											return W(t);
										},
										get label() {
											return W(n);
										},
										onchange: (e) => po(r(), e)
									});
								}
								var c = z(s, 2), l = L(c, !0);
								k(c);
								var u = z(c, 2), d = L(u, !0);
								k(u), k(o), B((e) => {
									J(l, a()), J(d, e);
								}, [() => bo(W(E).theme.alt.tokens.color[r()] ?? W(Sn)[r()], W(Sn))]), q(e, o);
							}), k(a);
							var s = z(a, 2), c = (e) => {
								q(e, _c());
							};
							Y(s, (e) => {
								W(vn) && e(c);
							}), B(() => {
								i = Xr(r, 1, "stdtag svelte-1n46o8q", null, i, { ghost: W(yn) !== "dark" }), o = Xr(a, 1, "palcells svelte-1n46o8q", null, o, { autopal: W(vn) });
							}), G("click", r, () => mo("dark")), q(e, t);
						};
						Y(p, (e) => {
							W(_n) && e(h);
						});
						var g = z(p, 2), _ = L(g);
						e(_, () => W(bn), () => W(_n) ? "Lys" : "");
						var v = z(_, 2), y = (t) => {
							e(t, () => W(Sn), () => "Mørk");
						};
						Y(v, (e) => {
							W(_n) && e(y);
						}), k(g);
						var b = z(g, 2), x = z(L(b), 2), S = L(x), ee = z(L(S));
						{
							let e = /* @__PURE__ */ N(() => _o("heading"));
							$(ee, {
								get value() {
									return W(E).theme.tokens.font.heading;
								},
								get options() {
									return W(e);
								},
								onchange: (e) => co("heading", e)
							});
						}
						k(S);
						var C = z(S, 2), te = z(L(C));
						{
							let e = /* @__PURE__ */ N(() => _o("body"));
							$(te, {
								get value() {
									return W(E).theme.tokens.font.body;
								},
								get options() {
									return W(e);
								},
								onchange: (e) => co("body", e)
							});
						}
						k(C);
						var ne = z(C, 2), re = L(ne), ie = z(re, 2);
						k(ne), k(x), k(b);
						var ae = z(b, 2), oe = z(L(ae), 2), se = L(oe), ce = z(se, 2), le = z(L(ce)), ue = L(le, !0);
						k(le), k(ce);
						var de = z(ce, 2);
						Z(de);
						var fe = z(de, 2), pe = z(L(fe)), me = L(pe, !0);
						k(pe), k(fe);
						var he = z(fe, 2);
						Z(he), k(oe), k(ae), k(t), B((e, t) => {
							ri(i, W(_n)), ge = Xr(u, 1, "stdtag svelte-1n46o8q", null, ge, { ghost: W(yn) !== "light" }), Qr(re, `font-family:${W(E).theme.tokens.font.heading ?? ""}`), Qr(ie, `font-family:${W(E).theme.tokens.font.body ?? ""}`), Qr(se, `--r-sm:${W(E).theme.tokens.radius.sm ?? ""};--r-md:${W(E).theme.tokens.radius.md ?? ""}`), J(ue, W(E).theme.tokens.radius.sm), Q(de, e), J(me, W(E).theme.tokens.radius.md), Q(he, t);
						}, [() => vo(W(E).theme.tokens.radius.sm), () => vo(W(E).theme.tokens.radius.md)]), G("change", i, (e) => ho(e.target.checked)), G("click", u, () => mo("light")), G("input", de, (e) => yo("sm", Number(e.target.value))), G("input", he, (e) => yo("md", Number(e.target.value)));
					}
					q(e, t);
				}, h = (e) => {
					var t = Cc();
					let n;
					var r = z(L(t), 2), i = z(L(r), 2), a = L(i), o = z(a, 2);
					k(i), k(r);
					var s = z(r, 2), c = z(s, 2), l = z(L(c));
					k(c);
					var u = z(c, 2), d = z(u, 2), f = z(d, 2), p = z(f, 2), m = z(p, 2), h = z(L(m), 2), g = L(h), _ = z(g, 2), v = z(L(_));
					k(_), k(h), k(m);
					var y = z(m, 2), b = z(L(y), 2), x = L(b), S = z(x, 2), ee = z(S, 2), C = z(ee, 2), te = z(C, 2);
					k(b), k(y);
					var ne = z(y, 2), re = (e) => {
						var t = Sc(), n = z(L(t), 2);
						zr(n, 21, () => W(Nl), (e) => e.type, (e, t) => {
							var n = kr(), r = R(n), i = (e) => {
								var n = xc(), r = L(n), i = L(r, !0);
								k(r);
								var a = z(r, 2);
								zr(a, 21, () => W(t).variants, (e) => e.label, (e, n) => {
									var r = bc(), i = L(r, !0);
									k(r), B(() => {
										ii(r, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(i, W(n).label);
									}), G("click", r, () => Pl(W(t), W(n).props)), q(e, r);
								}), k(a), k(n), B(() => J(i, W(t).label)), q(e, n);
							}, a = (e) => {
								var n = bc(), r = L(n, !0);
								k(n), B(() => {
									ii(n, "title", `Fra pluginen ${W(t).plugin ?? ""}`), J(r, W(t).label);
								}), G("click", n, () => Pl(W(t))), q(e, n);
							};
							Y(r, (e) => {
								W(t).variants?.length ? e(i) : e(a, -1);
							}), q(e, n);
						}), k(n), k(t), q(e, t);
					};
					Y(ne, (e) => {
						W(Nl).length && e(re);
					}), k(t), B(() => {
						n = Xr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: W(ie) === "mobile" }), ii(t, "title", W(ie) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), G("click", a, () => Ml("text")), G("click", o, () => Ml("text-box")), G("click", s, () => Ml("button")), G("change", l, Il), G("click", u, () => Ml("video")), G("click", d, () => Ml("icon")), G("click", f, () => Ml("samling")), G("click", p, () => Ml("faq")), G("click", g, () => Ml("galleri")), G("change", v, Bl), G("click", x, () => Ml("shape-line")), G("click", S, () => Ml("shape-arrow")), G("click", ee, () => Ml("shape-circle")), G("click", C, () => Ml("shape-rect")), G("click", te, () => Ml("shape-triangle")), q(e, t);
				}, _ = (e) => {
					var t = wc(), n = z(L(t), 2), r = z(L(n)), i = L(r);
					k(r), k(n);
					var a = z(n, 2);
					Z(a);
					var o = z(a, 2), s = L(o);
					Z(s), A(), k(o), A(2), k(t), B(() => {
						J(i, `${W(ne).size ?? ""} px`), Q(a, W(ne).size), ri(s, W(ne).snap !== !1);
					}), G("input", a, (e) => zn("size", Number(e.target.value))), G("change", s, (e) => zn("snap", e.target.checked)), q(e, t);
				}, v = (e) => {
					var t = Mc(), r = L(t), i = (e) => {
						var t = Tc(), n = R(t), r = L(n);
						k(n);
						var i = z(n, 2);
						a(i), B(() => J(r, `${gt[W(j).type] ?? W(j).type ?? ""}-blokk`)), q(e, t);
					}, o = (e) => {
						var t = Ac(), r = z(R(t), 2), i = z(L(r));
						Z(i), k(r);
						var a = z(r, 6), o = L(a);
						Z(o), A(), k(a);
						var s = z(a, 2), l = (e) => {
							var t = Ec(), n = R(t), r = z(L(n)), i = L(r);
							k(r), k(n);
							var a = z(n, 2);
							Z(a), B(() => {
								J(i, `${W(bt).size ?? ""} px`), Q(a, W(bt).size);
							}), G("input", a, (e) => Rn("size", Number(e.target.value))), q(e, t);
						};
						Y(s, (e) => {
							W(bt) && e(l);
						});
						var u = z(s, 4), d = z(L(u));
						{
							let e = /* @__PURE__ */ N(() => [["", "Standard"], ...Object.entries(Va)]);
							$(d, {
								get value() {
									return W(Tt);
								},
								get options() {
									return W(e);
								},
								onchange: (e) => kt(e)
							});
						}
						k(u);
						var f = z(u, 2), p = z(L(f)), m = L(p), h = L(m);
						k(m);
						var g = z(m, 2);
						X(g, () => c.copy, !0), k(g), k(p), k(f);
						var _ = z(f, 6);
						n(_, () => W(fn), () => W(St));
						var v = z(_, 4), y = z(L(v));
						{
							let e = /* @__PURE__ */ N(() => wn(W(Ct)) ? W(Ct).type : "");
							$(y, {
								get value() {
									return W(e);
								},
								get options() {
									return Tn;
								},
								onchange: (e) => jn(e || null)
							});
						}
						k(v);
						var b = z(v, 2), x = (e) => {
							var t = kc(), n = R(t), r = z(L(n));
							Z(r), k(n);
							var i = z(n, 2), a = (e) => {
								var t = Dc(), n = R(t), r = z(L(n));
								Z(r), k(n);
								var i = z(n, 2), a = z(L(i));
								{
									let e = /* @__PURE__ */ N(() => W(Ct).props.pattern ?? "sequence");
									$(a, {
										get value() {
											return W(e);
										},
										options: [["sequence", "En etter en"], ["columns", "Kolonnevis"]],
										onchange: (e) => Pn(e)
									});
								}
								k(i), B(() => Q(r, W(Ct).props.step ?? 90)), G("change", r, (e) => Nn("step", Number(e.target.value))), q(e, t);
							}, o = (e) => {
								var t = Oc(), n = z(L(t));
								Z(n), k(t), B(() => Q(n, W(Ct).props.delay)), G("change", n, (e) => Nn("delay", Number(e.target.value))), q(e, t);
							};
							Y(i, (e) => {
								W(Ct).type === "stagger" ? e(a) : e(o, -1);
							}), B(() => Q(r, W(Ct).props.duration)), G("change", r, (e) => Nn("duration", Number(e.target.value))), q(e, t);
						}, S = /* @__PURE__ */ N(() => wn(W(Ct)));
						Y(b, (e) => {
							W(S) && e(x);
						});
						var ee = z(b, 2), C = z(L(ee));
						{
							let e = /* @__PURE__ */ N(() => W(wt)?.type ?? (W(Ct) && !wn(W(Ct)) ? W(Ct).type : ""));
							$(C, {
								get value() {
									return W(e);
								},
								get options() {
									return En;
								},
								onchange: (e) => Mn(e || null)
							});
						}
						k(ee), B(() => {
							Q(i, W(xt)), ri(o, W(bt) !== null), J(h, `#${W(yt) ?? ""}`);
						}), G("change", i, (e) => Fn(e.target.value)), G("change", o, (e) => Ln(e.target.checked)), G("click", g, () => navigator.clipboard?.writeText(`#${W(yt)}`)), q(e, t);
					}, s = (e) => {
						q(e, jc());
					};
					Y(r, (e) => {
						W(j) ? e(i) : W(yt) ? e(o, 1) : e(s, -1);
					}), k(t), q(e, t);
				}, y = (e) => {
					var t = Kc(), i = L(t), a = L(i);
					Z(a), A(), k(i);
					var o = z(i, 2), s = (e) => {
						var t = Pc(), n = z(L(t), 2);
						zr(n, 21, () => W(E).pages ?? [], (e) => e.id, (e, t) => {
							var n = Nc(), r = L(n);
							Z(r);
							var i = z(r);
							k(n), B((e) => {
								ri(r, e), J(i, ` ${(W(t).title || W(t).id) ?? ""}`);
							}, [() => !(W(E).footer?.hideOn ?? []).includes(W(t).id)]), G("change", r, (e) => _a(W(t).id, e.target.checked)), q(e, n);
						}), k(n), k(t), q(e, t);
					};
					Y(o, (e) => {
						W(E).footer?.show && e(s);
					});
					var l = z(o, 2), u = z(L(l), 2), d = L(u);
					zr(d, 21, () => Qi, (e) => e.id, (e, t) => {
						var n = Fc(), r = L(n);
						X(r, () => Fo(W(t).thumb), !0), k(r);
						var i = z(r, 2), a = L(i, !0);
						k(i), k(n), B(() => {
							ii(n, "title", `Fyller footeren med ${W(t).label ?? ""}-oppsettet - rediger fritt videre`), J(a, W(t).label);
						}), G("click", n, () => ra(W(t).id)), q(e, n);
					}), k(d), k(u), k(l);
					var f = z(l, 2), p = z(L(f), 2), m = L(p), h = z(L(m));
					Z(h), k(m);
					var g = z(m, 2), _ = z(L(g));
					Z(_), k(g);
					var v = z(g, 2), y = z(L(v));
					{
						let e = /* @__PURE__ */ N(() => W(E).footer?.brand?.mode ?? "text");
						$(y, {
							get value() {
								return W(e);
							},
							options: [
								["text", "Tekst"],
								["image", "Logo (bilde)"],
								["both", "Begge"]
							],
							onchange: (e) => qi(e)
						});
					}
					k(v);
					var b = z(v, 2), x = (e) => {
						var t = Rc(), n = R(t), r = L(n), i = L(r), a = z(i);
						k(r);
						var o = z(r, 2), s = (e) => {
							var t = Ic();
							X(t, () => c.cross, !0), k(t), G("click", t, Yi), q(e, t);
						};
						Y(o, (e) => {
							W(E).footer?.brand?.logo && e(s);
						}), k(n);
						var l = z(n, 2), u = (e) => {
							var t = Lc(), n = R(t), r = z(L(n)), i = L(r);
							k(r), k(n);
							var a = z(n, 2);
							Z(a), B(() => {
								J(i, `${W(E).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Q(a, W(E).footer?.brand?.logoHeight ?? 40);
							}), G("input", a, (e) => Xi(e.target.value)), q(e, t);
						};
						Y(l, (e) => {
							W(E).footer?.brand?.logo && e(u);
						}), B(() => J(i, `${W(E).footer?.brand?.logo ? "Bytt logo" : "Last opp logo"} `)), G("change", a, Ji), q(e, t);
					};
					Y(b, (e) => {
						(W(E).footer?.brand?.mode ?? "text") !== "text" && e(x);
					}), k(p), k(f);
					var S = z(f, 2), ee = z(L(S), 2), C = L(ee);
					zr(C, 17, () => W(E).footer?.columns ?? [], Fr, (e, t, n) => {
						var r = zc(), i = R(r), a = L(i);
						Z(a);
						var o = z(a, 2), s = L(o);
						X(s, () => c.plus, !0), k(s);
						var l = z(s, 2);
						l.disabled = n === 0, X(l, () => c.up, !0), k(l);
						var u = z(l, 2);
						X(u, () => c.down, !0), k(u);
						var d = z(u, 2);
						X(d, () => c.cross, !0), k(d), k(o), k(i), zr(z(i, 2), 17, () => W(t).links ?? [], Fr, (e, r, i) => {
							var a = rs(), o = L(a);
							Z(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, X(l, () => c.up, !0), k(l);
							var u = z(l, 2);
							X(u, () => c.down, !0), k(u);
							var d = z(u, 2);
							X(d, () => c.cross, !0), k(d), k(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ N(() => W(r).page ?? "__href"), t = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Lenke (URL/anker)"]]);
								$(p, {
									get value() {
										return W(e);
									},
									title: "Hvor lenken går",
									get options() {
										return W(t);
									},
									onchange: (e) => Aa(n, i, e)
								});
							}
							k(f);
							var m = z(f, 2), h = (e) => {
								var t = ns();
								Z(t), B(() => Q(t, W(r).href ?? "")), G("change", t, (e) => Ma(n, i, e.target.value)), q(e, t);
							};
							Y(m, (e) => {
								W(r).page || e(h);
							}), k(a), B(() => {
								Q(o, W(r).label), u.disabled = i === W(t).links.length - 1;
							}), G("input", o, (e) => ka(n, i, e.target.value)), G("click", l, () => Ea(n, i, -1)), G("click", u, () => Ea(n, i, 1)), G("click", d, () => Ta(n, i)), q(e, a);
						}), B(() => {
							Q(a, W(t).title), u.disabled = n === W(E).footer.columns.length - 1;
						}), G("input", a, (e) => Ca(n, e.target.value)), G("click", s, () => wa(n)), G("click", l, () => ba(n, -1)), G("click", u, () => ba(n, 1)), G("click", d, () => ya(n)), q(e, r);
					});
					var te = z(C, 2), ne = z(te, 2), re = z(L(ne));
					{
						let e = /* @__PURE__ */ N(() => W(E).footer?.columnsAlign ?? "left");
						$(re, {
							get value() {
								return W(e);
							},
							options: [["left", "Venstre"], ["center", "Midtstilt"]],
							onchange: (e) => ua(e)
						});
					}
					k(ne), k(ee), k(S);
					var ie = z(S, 2), ae = z(L(ie), 2), oe = L(ae);
					zr(oe, 17, () => W(E).footer?.social ?? [], Fr, (e, t, n) => {
						var r = Bc(), i = L(r), a = L(i);
						X(a, () => na(W(t).icon) || "", !0), k(a), $(z(a, 2), {
							get value() {
								return W(t).icon;
							},
							title: "Ikon",
							get options() {
								return Ga;
							},
							onchange: (e) => za(n, e)
						}), k(i);
						var o = z(i, 2), s = L(o);
						s.disabled = n === 0, X(s, () => c.up, !0), k(s);
						var l = z(s, 2);
						X(l, () => c.down, !0), k(l);
						var u = z(l, 2);
						X(u, () => c.cross, !0), k(u), k(o);
						var d = z(o, 2);
						Z(d), k(r), B(() => {
							l.disabled = n === W(E).footer.social.length - 1, Q(d, W(t).url);
						}), G("click", s, () => La(n, -1)), G("click", l, () => La(n, 1)), G("click", u, () => Ia(n)), G("change", d, (e) => Ba(n, e.target.value)), q(e, r);
					});
					var se = z(oe, 2);
					k(ae), k(ie);
					var ce = z(ie, 2), le = z(L(ce), 2), ue = L(le), de = L(ue);
					Z(de), A(), k(ue);
					var fe = z(ue, 2), pe = (e) => {
						let t = /* @__PURE__ */ N(() => W(E).footer.cta);
						var n = Wc(), r = R(n), i = z(L(r));
						{
							let e = /* @__PURE__ */ N(() => W(t).kind ?? "button");
							$(i, {
								get value() {
									return W(e);
								},
								options: [["button", "Knapp (lenke)"], ["newsletter", "Nyhetsbrev (e-post)"]],
								onchange: (e) => fa("kind", e)
							});
						}
						k(r);
						var a = z(r, 2), o = L(a);
						Z(o), A(), k(a);
						var s = z(a, 2), c = z(L(s));
						Z(c), k(s);
						var l = z(s, 2), u = z(L(l));
						Z(u), k(l);
						var d = z(l, 2), f = z(L(d));
						Z(f), k(d);
						var p = z(d, 2), m = (e) => {
							var n = Hc(), r = R(n), i = z(L(r));
							{
								let e = /* @__PURE__ */ N(() => W(t).page ?? "__href"), n = /* @__PURE__ */ N(() => [...W(E).pages.map((e) => [e.id, e.title]), ["__href", "Lenke (URL/anker/mailto)"]]);
								$(i, {
									get value() {
										return W(e);
									},
									get options() {
										return W(n);
									},
									onchange: (e) => ha(e)
								});
							}
							k(r);
							var a = z(r, 2), o = (e) => {
								var n = Vc();
								Z(n), B(() => Q(n, W(t).href ?? "")), G("change", n, (e) => fa("href", e.target.value)), q(e, n);
							};
							Y(a, (e) => {
								W(t).page || e(o);
							}), q(e, n);
						}, h = (e) => {
							var n = Uc(), r = R(n), i = z(L(r));
							Z(i), k(r);
							var a = z(r, 2), o = z(L(a));
							Z(o), k(a);
							var s = z(a, 2), c = z(L(s));
							Z(c), k(s), B(() => {
								Q(i, W(t).endpoint ?? ""), Q(o, W(t).recipient ?? ""), Q(c, W(t).success ?? "");
							}), G("change", i, (e) => fa("endpoint", e.target.value)), G("change", o, (e) => fa("recipient", e.target.value)), G("input", c, (e) => fa("success", e.target.value)), q(e, n);
						};
						Y(p, (e) => {
							(W(t).kind ?? "button") === "button" ? e(m) : e(h, -1);
						}), B(() => {
							ri(o, W(t).big === !0), Q(c, W(t).heading ?? ""), Q(u, W(t).sub ?? ""), Q(f, W(t).label ?? "");
						}), G("change", o, (e) => fa("big", e.target.checked)), G("input", c, (e) => fa("heading", e.target.value)), G("input", u, (e) => fa("sub", e.target.value)), G("input", f, (e) => fa("label", e.target.value)), q(e, n);
					};
					Y(fe, (e) => {
						W(E).footer?.cta && e(pe);
					}), k(le), k(ce);
					var me = z(ce, 2), he = z(L(me), 2), ge = L(he);
					r(ge, () => "linkRow", () => W(E).footer?.linkRow ?? []);
					var _e = z(ge, 2);
					k(he), k(me);
					var w = z(me, 2), ve = z(L(w), 2), T = L(ve), ye = (e) => {
						var t = Gc(), n = R(t), r = z(L(n));
						{
							let e = /* @__PURE__ */ N(() => W(E).footer?.align ?? "left");
							$(r, {
								get value() {
									return W(e);
								},
								options: [
									["left", "Venstre"],
									["center", "Midtstilt"],
									["right", "Høyre"]
								],
								onchange: (e) => zi("footer", (t) => {
									t.align = e;
								})
							});
						}
						k(n), A(2), q(e, t);
					};
					Y(T, (e) => {
						W(E).footer?.cta?.big !== !0 && e(ye);
					});
					var be = z(T, 4);
					n(be, () => mn, () => W(E).footer?.background?.layers ?? []), k(ve), k(w);
					var xe = z(w, 2), Se = z(L(xe), 2), D = L(Se), Ce = z(L(D));
					Z(Ce), k(D);
					var we = z(D, 4);
					r(we, () => "baseline", () => W(E).footer?.baseline ?? []);
					var Te = z(we, 2);
					k(Se), k(xe), k(t), B((e, t) => {
						ri(a, e), Q(h, W(E).footer?.brand?.title ?? ""), Q(_, W(E).footer?.brand?.tagline ?? ""), ri(de, t), Q(Ce, W(E).footer?.copyright ?? "");
					}, [() => !!W(E).footer?.show, () => !!W(E).footer?.cta]), G("change", a, (e) => zi("footer", (t) => {
						t.show = e.target.checked;
					})), G("input", h, (e) => Bi("title", e.target.value)), G("input", _, (e) => Bi("tagline", e.target.value)), G("click", te, va), G("click", se, Fa), G("change", de, (e) => da(e.target.checked)), G("click", _e, () => ia("linkRow")), G("input", Ce, (e) => Zi(e.target.value)), G("click", Te, () => ia("baseline")), q(e, t);
				}, b = (e) => {
					var t = Qc(), n = z(L(t), 2), r = (e) => {
						var t = qc(), n = z(L(t));
						{
							let e = /* @__PURE__ */ N(() => W(Gr) ?? ""), t = /* @__PURE__ */ N(() => [["", "Velg …"], ...W(Ur).map((e) => [e, W(Wr)[e]?.name ?? e])]);
							$(n, {
								get value() {
									return W(e);
								},
								get options() {
									return W(t);
								},
								onchange: (e) => I(Gr, e || null, !0)
							});
						}
						k(t), q(e, t);
					};
					Y(n, (e) => {
						W(Ur).length && e(r);
					});
					var i = z(n, 2), a = (e) => {
						let t = /* @__PURE__ */ N(() => W(Wr)[W(Gr)]);
						var n = Zc(), r = R(n), i = L(r), a = z(i, 2);
						X(a, () => c.cross, !0), k(a), k(r);
						var o = z(r, 2);
						zr(o, 19, () => W(t).entries, (e) => e.id, (e, n, r) => {
							var i = Yc(), a = L(i), o = L(a);
							k(a);
							var s = z(a, 2), l = L(s), u = L(l);
							Z(u);
							var d = z(u, 2), f = L(d);
							X(f, () => c.up, !0), k(f);
							var p = z(f, 2);
							X(p, () => c.down, !0), k(p);
							var m = z(p, 2);
							X(m, () => c.cross, !0), k(m), k(d), k(l);
							var h = z(l, 2), g = z(L(h));
							Z(g), k(h);
							var _ = z(h, 2);
							ot(_);
							var v = z(_, 2), y = z(L(v));
							Z(y), k(v);
							var b = z(v, 2), x = L(b), S = L(x), ee = z(S);
							k(x);
							var C = z(x, 2), te = (e) => {
								var t = Jc(), r = R(t), i = z(r, 2);
								X(i, () => c.cross, !0), k(i), B(() => ii(r, "src", W(n).image)), G("click", i, () => si(W(Gr), W(n).id, "image", "")), q(e, t);
							};
							Y(C, (e) => {
								W(n).image && e(te);
							}), k(b), k(s), k(i), B((e) => {
								J(o, `${e ?? ""}${W(n).date ? ` · ${W(n).date}` : ""}`), Q(u, W(n).title), f.disabled = W(r) === 0, p.disabled = W(r) === W(t).entries.length - 1, Q(g, W(n).date ?? ""), Q(_, W(n).text ?? ""), Q(y, W(n).href ?? ""), J(S, `${W(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => W(n).title.replace(/<[^>]*>/g, "")]), G("change", u, (e) => si(W(Gr), W(n).id, "title", e.target.value || "Uten tittel")), G("click", f, () => li(W(Gr), W(r), -1)), G("click", p, () => li(W(Gr), W(r), 1)), G("click", m, () => ui(W(Gr), W(n).id)), G("change", g, (e) => si(W(Gr), W(n).id, "date", e.target.value)), G("change", _, (e) => si(W(Gr), W(n).id, "text", e.target.value)), G("change", y, (e) => si(W(Gr), W(n).id, "href", e.target.value)), G("change", ee, (e) => di(W(Gr), W(n).id, e)), q(e, i);
						});
						var s = z(o, 2), l = (e) => {
							q(e, Xc());
						};
						Y(s, (e) => {
							W(t).entries.length || e(l);
						}), A(2), G("click", i, () => oi(W(Gr))), G("click", a, () => ai(W(Gr))), q(e, n);
					};
					Y(i, (e) => {
						W(Gr) && W(Wr)[W(Gr)] && e(a);
					});
					var o = z(i, 2), s = z(L(o));
					Z(s), k(o);
					var l = z(o, 2);
					$(z(L(l)), {
						get value() {
							return W(qr);
						},
						get options() {
							return Jr;
						},
						onchange: (e) => I(qr, e, !0)
					}), k(l);
					var u = z(l, 2);
					k(t), B((e) => u.disabled = e, [() => !W(Kr).trim()]), G("keydown", s, (e) => e.key === "Enter" && ni()), ci(s, () => W(Kr), (e) => I(Kr, e)), G("click", u, ni), q(e, t);
				}, x = (e) => {
					var t = sl(), n = z(L(t), 2), r = (e) => {
						q(e, $c());
					}, i = /* @__PURE__ */ N(() => !Ei().length);
					Y(n, (e) => {
						W(i) && e(r);
					});
					var a = z(n, 2);
					zr(a, 16, Ei, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ N(() => _i[t]), r = /* @__PURE__ */ N(() => (W(gi)?.enabled ?? []).includes(t));
						var i = nl();
						let a;
						var o = L(i), s = L(o), l = L(s, !0);
						k(s);
						var u = z(s, 2), d = (e) => {
							var t = el(), r = L(t);
							k(t), B(() => J(r, `v${W(n).version ?? ""}`)), q(e, t);
						};
						Y(u, (e) => {
							W(n)?.version && e(d);
						});
						var f = z(u, 2), p = L(f), m = L(p);
						Z(m);
						var h = z(m);
						k(p);
						var g = z(p, 2);
						X(g, () => c.cross, !0), k(g), k(f), k(o);
						var _ = z(o, 2), v = (e) => {
							var t = tl(), r = L(t, !0);
							k(t), B((e) => J(r, e), [() => W(n).errors.join("; ")]), q(e, t);
						}, y = (e) => {
							var t = tl(), r = L(t);
							k(t), B(() => J(r, `Krever motorversjon ${W(n).requiresEngine ?? ""} (denne siden kjører ${W(vi) ?? ""}); pluginen hoppes over ved lasting.`)), q(e, t);
						}, b = (e) => {
							var t = tl(), r = L(t);
							k(t), B((e) => J(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(W(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(W(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), q(e, t);
						};
						Y(_, (e) => {
							W(n)?.errors?.length ? e(v) : W(n) && !W(n).satisfied ? e(y, 1) : W(n)?.csp && e(b, 2);
						}), k(i), B((e) => {
							a = Xr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": W(n)?.errors?.length }), J(l, W(n)?.name ?? t), ii(p, "title", W(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ri(m, W(r)), m.disabled = e, J(h, ` ${W(r) ? "På" : "Av"}`);
						}, [() => !!W(n)?.errors?.length]), G("change", m, (e) => Mi(t, e.target.checked)), G("click", g, () => Fi(t)), q(e, i);
					});
					var o = z(a, 2), s = (e) => {
						var t = il();
						zr(z(R(t), 4), 16, () => W(wi), (e) => e, (e, t) => {
							var n = rl(), r = L(n), i = L(r), a = L(i, !0);
							k(i);
							var o = z(i, 2), s = (e) => {
								var n = el(), r = L(n);
								k(n), B(() => J(r, `v${_i[t].version ?? ""}`)), q(e, n);
							};
							Y(o, (e) => {
								_i[t]?.version && e(s);
							});
							var l = z(o, 2), u = L(l);
							X(u, () => c.right, !0), k(u), k(l), k(r), k(n), B(() => J(a, _i[t]?.name ?? t)), G("click", u, () => Li(t)), q(e, n);
						}), q(e, t);
					};
					Y(o, (e) => {
						W(wi).length && e(s);
					});
					var l = z(o, 2), u = (e) => {
						var t = kr(), n = R(t), r = (e) => {
							q(e, al());
						};
						Y(n, (e) => {
							W(wi).length || e(r);
						}), q(e, t);
					}, d = (e) => {
						var t = ol(), n = z(R(t), 2);
						Z(n);
						var r = z(n, 2), i = z(r, 2), a = (e) => {
							var t = tl(), n = L(t, !0);
							k(t), B(() => J(n, W(Ci))), q(e, t);
						};
						Y(i, (e) => {
							W(Ci) && e(a);
						}), B((e) => r.disabled = e, [() => !W(xi).trim()]), G("keydown", n, (e) => e.key === "Enter" && Ii()), ci(n, () => W(xi), (e) => I(xi, e)), G("click", r, Ii), q(e, t);
					};
					Y(l, (e) => {
						W(Ti) === "ok" ? e(u) : e(d, -1);
					}), k(t), q(e, t);
				}, S = (e) => {
					var t = fl(), n = z(L(t), 2), r = (e) => {
						q(e, cl());
					}, i = (e) => {
						var t = Hs(), n = R(t), r = (e) => {
							var t = ll(), n = L(t, !0);
							k(t), B(() => J(n, W(Wn))), q(e, t);
						};
						Y(n, (e) => {
							W(Wn) && e(r);
						});
						var i = z(n, 2), a = (e) => {
							var t = dl(), n = R(t);
							zr(z(n, 2), 19, () => W(V), (e) => e.sha, (e, t, n) => {
								var r = ul();
								let i;
								var a = L(r), o = L(a, !0);
								k(a);
								var s = z(a, 2), c = L(s);
								k(s), k(r), B((e) => {
									i = Xr(r, 1, "history-row svelte-1n46o8q", null, i, { head: W(n) === 0 }), ii(a, "title", W(t).sha), J(o, W(t).message), J(c, `${W(t).author ?? ""}${e ?? ""}`);
								}, [() => W(t).date ? ` · ${Kn.format(new Date(W(t).date))}` : ""]), q(e, r);
							}), B(() => {
								n.disabled = W(Gn) || !W(te)?.allowed, ii(n, "title", W(te)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), G("click", n, Jn), q(e, t);
						};
						Y(i, (e) => {
							W(V).length > 0 && e(a);
						}), q(e, t);
					};
					Y(n, (e) => {
						W(V) === null ? e(r) : e(i, -1);
					}), k(t), q(e, t);
				};
				Y(s, (e) => {
					W(qe) === "pages" ? e(l) : W(qe) === "nav" ? e(u, 1) : W(qe) === "site" ? e(f, 2) : W(qe) === "theme" ? e(p, 3) : W(qe) === "blocks" ? e(h, 4) : W(qe) === "grid" ? e(_, 5) : W(qe) === "properties" ? e(v, 6) : W(qe) === "footer" ? e(y, 7) : W(qe) === "collections" ? e(b, 8) : W(qe) === "plugins" ? e(x, 9) : W(qe) === "history" && e(S, 10);
				}), k(t), B(() => J(o, Ye[W(qe)])), q(e, t);
			};
			Y(o, (e) => {
				W(qe) && e(s);
			}), q(e, t);
		};
		Y(i, (e) => {
			W(re) && e(o);
		});
		var s = z(i, 2);
		let l;
		var u = L(s), f = L(u);
		fi(f, (e) => I(C, e), () => W(C)), k(u), k(s), fi(s, (e) => I(ae, e), () => W(ae)), k(t), B(() => {
			l = Xr(s, 1, "frame-wrap svelte-1n46o8q", null, l, { mobile: W(ie) === "mobile" }), Qr(u, `width:${W(pe) ?? ""}px; height:${W(me) ?? ""}px`), ii(f, "src", `/?page=${W(g)}&preview=1`), Qr(f, `width:${W(ue) ?? ""}px; height:${W(fe) ?? ""}px; transform:scale(${W(de) ?? ""}); transform-origin:top left`);
		}), br("load", f, $n), vr(f), q(e, t);
	}, vu = (e) => {
		q(e, gl());
	};
	Y(gu, (e) => {
		W(h) ? e(_u) : e(vu, -1);
	});
	var yu = z(gu, 2), bu = (e) => {
		xa(e, {
			get image() {
				return W(hr);
			},
			onapply: _r,
			oncancel: () => I(hr, null)
		});
	};
	Y(yu, (e) => {
		W(hr) && e(bu);
	});
	var xu = z(yu, 2), Su = (e) => {
		var t = vl(), n = L(t), r = L(n), i = L(r, !0);
		k(r);
		var a = z(r, 2);
		zr(a, 16, () => W(Fe).lines, (e) => e, (e, t) => {
			var n = _l(), r = L(n, !0);
			k(n), B(() => J(r, t)), q(e, n);
		});
		var o = z(a, 2), s = L(o), c = L(s, !0);
		k(s);
		var l = z(s, 2), u = L(l, !0);
		k(l), k(o), k(n), k(t), B(() => {
			J(i, W(Fe).title), J(c, W(Fe).cancelLabel), J(u, W(Fe).okLabel);
		}), G("click", s, () => Le(!1)), G("click", l, () => Le(!0)), q(e, t);
	};
	Y(xu, (e) => {
		W(Fe) && e(Su);
	});
	var Cu = z(xu, 2), wu = (e) => {
		var t = yl(), n = L(t), r = z(L(n), 4), i = z(L(r));
		Z(i), k(r);
		var a = z(r, 2);
		Pi(z(L(a)), {
			get value() {
				return W(Be);
			},
			label: "Aksentfarge",
			onchange: (e) => I(Be, e, !0)
		}), k(a);
		var o = z(a, 2);
		Pi(z(L(o)), {
			get value() {
				return W(He);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => I(He, e, !0)
		}), k(o);
		var s = z(o, 4), c = L(s), l = z(c, 2);
		k(s), k(n), k(t), B((e) => l.disabled = e, [() => !W(ze).trim()]), G("keydown", i, (e) => e.key === "Enter" && We()), ci(i, () => W(ze), (e) => I(ze, e)), G("click", c, Ue), G("click", l, We), q(e, t);
	};
	Y(Cu, (e) => {
		W(Re) && e(wu);
	});
	var Tu = z(Cu, 2), Eu = (e) => {
		var t = bl();
		let n;
		var r = L(t), i = L(r, !0);
		k(r);
		var a = z(r, 2);
		k(t), B(() => {
			n = Xr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: W(y) === "ok",
				error: W(y) === "error"
			}), J(i, W(v));
		}), G("click", a, () => x("")), q(e, t);
	};
	Y(Tu, (e) => {
		W(v) && e(Eu);
	}), k($l);
	var Du = z($l, 2), Ou = (e) => {
		var t = xl(), n = L(t), r = L(n), i = L(r);
		k(r);
		var o = z(r, 2);
		X(o, () => c.cross, !0), k(o), k(n);
		var s = z(n, 2), l = L(s);
		a(l), k(s), k(t), B(() => {
			Qr(t, `left: ${W(rt).left ?? ""}px; top: ${W(rt).top ?? ""}px`), J(i, `${gt[W(j).type] ?? W(j).type ?? ""}-blokk`);
		}), G("click", o, () => I(rt, null)), q(e, t);
	};
	Y(Du, (e) => {
		W(rt) && W(j) && e(Ou);
	}), B(() => ru = Xr(nu, 1, "topbar svelte-1n46o8q", null, ru, { hidden: !W(re) })), q(e, Ql), Ke();
}
xr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]);
//#endregion
//#region src/main.js
function wl() {
	let e = localStorage.getItem("urd-admin-lang");
	if (e) return hi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = gi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Tl = wl();
document.documentElement.lang = Tl;
var El = async (e) => (await import(
	/* @vite-ignore */
	`/assets/engine/locales/admin/${e}.js`
)).default.strings, Dl = {};
try {
	Dl = await El("nb"), Tl !== "nb" && Object.assign(Dl, await El(Tl));
} catch {}
xi(Tl, Dl);
var Ol = Ar(Cl, { target: document.getElementById("urd-admin") });
//#endregion
export { Ol as default };
