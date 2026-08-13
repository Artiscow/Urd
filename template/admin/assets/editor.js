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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, w = 1 << 20, T = 1 << 25, ee = 65536, E = 1 << 21, te = 1 << 22, ne = 1 << 23, re = Symbol("$state"), ie = Symbol("legacy props"), ae = Symbol(""), oe = Symbol("attributes"), se = Symbol("class"), ce = Symbol("style"), le = Symbol("text"), ue = Symbol("form reset"), de = new class extends Error {
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
function Se() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ce() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var we = {}, Te = Symbol("uninitialized"), D = "http://www.w3.org/1999/xhtml", Ee = "http://www.w3.org/2000/svg", O = "http://www.w3.org/1998/Math/MathML";
function k() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function De(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Oe() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var ke = !1;
function Ae(e) {
	ke = e;
}
var A;
function je(e) {
	if (e === null) throw De(), we;
	return A = e;
}
function Me() {
	return je(/* @__PURE__ */ un(A));
}
function j(e) {
	if (ke) {
		if (/* @__PURE__ */ un(A) !== null) throw De(), we;
		A = e;
	}
}
function Ne(e = 1) {
	if (ke) {
		for (var t = e, n = A; t--;) n = /* @__PURE__ */ un(n);
		A = n;
	}
}
function Pe(e = !0) {
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
function Fe(e) {
	if (!e || e.nodeType !== 8) throw De(), we;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ie(e) {
	return e === this.v;
}
function Le(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Re(e) {
	return !Le(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var ze = [];
function Be(e, t = !1, n = !1) {
	return Ve(e, /* @__PURE__ */ new Map(), "", ze, null, n);
}
function Ve(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ve(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ve(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ve(t.toJSON(), n, r, i, t);
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
var He = null;
function Ue(e) {
	He = e;
}
function We(e, t = !1, n) {
	He = {
		p: He,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: Kn,
		l: null
	};
}
function Ge(e) {
	var t = He, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) xn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, He = t.p, e ?? {};
}
function Ke() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var qe = [];
function Je() {
	var e = qe;
	qe = [], f(e);
}
function Ye(e) {
	if (qe.length === 0 && !Mt) {
		var t = qe;
		queueMicrotask(() => {
			t === qe && Je();
		});
	}
	qe.push(e);
}
function Xe() {
	for (; qe.length > 0;) Je();
}
function Ze(e) {
	var t = Kn;
	if (t === null) return Un.f |= ne, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Qe(e, t);
}
function Qe(e, t) {
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
var $e = ~(g | _ | h);
function et(e, t) {
	e.f = e.f & $e | t;
}
function tt(e) {
	e.f & 512 || e.deps === null ? et(e, h) : et(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function nt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ee, nt(t.deps));
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
function ot(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Ye(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function st(e) {
	ke && /* @__PURE__ */ ln(e) !== null && dn(e);
}
var ct = !1;
function lt() {
	ct || (ct = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ue]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ut(e) {
	var t = Un, n = Kn;
	Gn(null), qn(null);
	try {
		return e();
	} finally {
		Gn(t), qn(n);
	}
}
function dt(e, t, n, r = n) {
	e.addEventListener(t, () => ut(n));
	let i = e[ue];
	e[ue] = i ? () => {
		i(), r(!0);
	} : () => r(!0), lt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function ft(e) {
	let t = 0, n = Yt(0), r;
	return () => {
		vn() && (V(n), Tn(() => (t === 0 && (r = mr(() => e(() => $t(n)))), t += 1, () => {
			Ye(() => {
				--t, t === 0 && (r?.(), r = void 0, $t(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var pt = S | C;
function mt(e, t, n, r) {
	new ht(e, t, n, r);
}
var ht = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = ke ? A : null;
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
	#h = ft(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Kn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Kn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
			if (ke) {
				let e = this.#t;
				Me();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, pt), ke && (this.#e = A);
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
		Ye(r), t && (this.#s = Dn(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			if (t) {
				Oe();
				return;
			}
			t = !0, n && Ce(), this.#s !== null && Pn(this.#s, () => {
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
					Qe(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = Dn(() => e(this.#e)), Ye(() => {
			var e = this.#c = document.createDocumentFragment(), t = cn();
			e.append(t), this.#a = this.#S(() => Dn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, Pn(this.#o, () => {
				this.#o = null;
			}), this.#x(P));
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
		var t = Kn, n = Un, r = He;
		qn(this.#i), Gn(this.#i), Ue(this.#i.ctx);
		try {
			return Rt.ensure(), e();
		} catch (e) {
			return Ze(e), null;
		} finally {
			qn(t), Gn(n), Ue(r);
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
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ye(() => {
			this.#d = !1, this.#m && Zt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), V(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		P?.is_fork ? (this.#a && P.skip_effect(this.#a), this.#o && P.skip_effect(this.#o), this.#s && P.skip_effect(this.#s), P.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), ke && (je(this.#t), Ne(), je(Pe()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return Dn(() => {
						var r = Kn;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return Qe(e, this.#i.parent), null;
				}
			}));
		};
		Ye(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Qe(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => Qe(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function gt(e, t, n, r) {
	let i = Ke() ? bt : St;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Kn, c = _t(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Qe(e, s);
			}
			vt();
		}
	}
	var d = yt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ xt(e))).then(u).catch((e) => Qe(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), vt();
	}) : f();
}
function _t() {
	var e = Kn, t = Un, n = He, r = P;
	return function(i = !0) {
		qn(e), Gn(t), Ue(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function vt(e = !0) {
	qn(null), Gn(null), Ue(null), e && P?.deactivate();
}
function yt() {
	var e = Kn, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function bt(e) {
	var t = 2 | g;
	return Kn !== null && (Kn.f |= C), {
		ctx: He,
		deps: null,
		effects: null,
		equals: Ie,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: Te,
		wv: 0,
		parent: Kn,
		ac: null
	};
}
var M = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function xt(e, t, n) {
	let r = Kn;
	r === null && pe();
	var i = void 0, a = Yt(Te), o = !Un, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = Kn, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
			}).finally(vt);
		} catch (e) {
			n.reject(e), vt();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = yt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(M);
			else for (let e of s.values()) e.reject(M);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== M && (c.activate(), t ? (a.f |= ne, Zt(a, t)) : (a.f & 8388608 && (a.f ^= ne), Zt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), yn(() => {
		for (let e of s) e.reject(M);
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
	let t = /* @__PURE__ */ bt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function St(e) {
	let t = /* @__PURE__ */ bt(e);
	return t.equals = Re, t;
}
function Ct(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) jn(t[n]);
	}
}
function wt(e) {
	var t, n = Kn, r = e.parent;
	if (!Vn && r !== null && e.v !== Te && r.f & 24576) return k(), e.v;
	qn(r);
	try {
		e.f &= ~ee, Ct(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function Tt(e) {
	var t = wt(e);
	if (!e.equals(t) && (e.wv = ir(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), kt?.capture(e, t, !0)), e.deps === null))) {
		et(e, h);
		return;
	}
	Vn || (At === null ? tt(e) : (vn() || P?.is_fork) && At.set(e, t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ut(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), lr(t, 0), kn(t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Ot = null, P = null, kt = null, At = null, jt = null, Mt = !1, Nt = !1, Pt = null, Ft = null, It = 0, Lt = 1, Rt = class e {
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
		Ot === null ? Ot = this : (Ot.#n = this, this.#t = Ot), Ot = this;
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
		this.#e = !0, It++ > 1e3 && (this.#x(), Bt());
		for (let e of this.#u) this.#d.delete(e), et(e, g), this.schedule(e);
		for (let e of this.#d) et(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Pt = [], r = [], i = Ft = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Gt(e), this.#h() || this.discard(), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
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
		this.#r.clear(), kt = this, Ht(r), Ht(n), kt = null, this.#s?.resolve();
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
			var i = r.f, a = !!(i & 96);
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
		e.v !== Te && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), At?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, At = null;
	}
	flush() {
		try {
			Nt = !0, P = this, this.#g();
		} finally {
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, P = null, At = null, qt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(M);
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
		this.#m || (this.#m = !0, Ye(() => {
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
			!Nt && !Mt && Ye(() => {
				t.#e || t.flush();
			});
		}
		return P;
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
				t.f ^= h;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Ot = e : t.#t = e, this.linked = !1;
		}
	}
};
function zt(e) {
	var t = Mt;
	Mt = !0;
	try {
		var n;
		for (e && (P !== null && !P.is_fork && P.flush(), n = e());;) {
			if (Xe(), P === null) return n;
			P.flush();
		}
	} finally {
		Mt = t;
	}
}
function Bt() {
	try {
		ve();
	} catch (e) {
		Qe(e, jt);
	}
}
var Vt = null;
function Ht(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ar(r) && (Vt = /* @__PURE__ */ new Set(), ur(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Nn(r), Vt?.size > 0)) {
				qt.clear();
				for (let e of Vt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Vt.has(n) && (Vt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || ur(n);
					}
				}
				Vt.clear();
			}
		}
		Vt = null;
	}
}
function Ut(e) {
	P.schedule(e);
}
function Wt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), et(e, h);
		for (var n = e.first; n !== null;) Wt(n, t), n = n.next;
	}
}
function Gt(e) {
	et(e, h);
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
		equals: Ie,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = Yt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Xt(e, t = !1, n = !0) {
	let r = Yt(e);
	return t || (r.equals = Re), r;
}
function I(e, t, n = !1) {
	return Un !== null && (!Wn || Un.f & 131072) && Ke() && Un.f & 4325394 && (Jn === null || !Jn.has(e)) && Se(), Zt(e, n ? tn(t) : t, Ft);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Vn ? t : e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wt(t), At === null && tt(t);
		}
		e.wv = ir(), en(e, g, n), Ke() && Kn !== null && Kn.f & 1024 && !(Kn.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Kt.size > 0 && !Jt && Qt();
	}
	return t;
}
function Qt() {
	Jt = !1;
	for (let e of Kt) {
		e.f & 1024 && et(e, _);
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
	I(e, e.v + 1);
}
function en(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ke(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === Kn)) {
			var l = (c & g) === 0;
			if (l && et(s, t), c & 131072) Kt.add(s);
			else if (c & 2) {
				var u = s;
				At?.delete(u), c & 65536 || (c & 512 && (Kn === null || !(Kn.f & 2097152)) && (s.f |= ee), en(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Vt !== null && Vt.add(d), n === null ? Ut(d) : n.push(d);
			}
		}
	}
}
function tn(t) {
	if (typeof t != "object" || !t || re in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ F(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = Un, n = nr;
		Gn(null), rr(d);
		var r = e();
		return Gn(t), rr(n), r;
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
					let e = f(() => /* @__PURE__ */ F(Te, u));
					r.set(t, e), $t(o);
				}
			} else I(n, Te), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(tn(s ? e[n] : Te), u)), r.set(n, o)), o !== void 0) {
				var c = V(o);
				return c === Te ? void 0 : c;
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
				if (a !== void 0 && o !== Te) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== Te || Reflect.has(e, t);
			return (n !== void 0 || Kn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? tn(e[t]) : Te, u)), r.set(t, n)), V(n) === Te) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(Te, u)), r.set(d + "", p)) : I(p, Te);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== Te;
				var m = f(() => tn(n));
				I(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				$t(o);
			}
			return !0;
		},
		ownKeys(e) {
			V(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== Te;
			});
			for (var [n, i] of r) i.v !== Te && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			xe();
		}
	});
}
var nn, rn, an, on;
function sn() {
	if (nn === void 0) {
		nn = window, rn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		an = a(t, "firstChild").get, on = a(t, "nextSibling").get, u(e) && (e[se] = void 0, e[oe] = null, e[ce] = void 0, e.__e = void 0), u(n) && (n[le] = void 0);
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
function L(e, t) {
	if (!ke) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(A);
	if (n === null) n = A.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), je(r), r;
	}
	return t && mn(n), je(n), n;
}
function R(e, t = !1) {
	if (!ke) {
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
function z(e, t = 1, n = !1) {
	let r = ke ? A : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!ke) return r;
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
	Kn === null && (Un === null && _e(e), ge()), Vn && he(e);
}
function gn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function _n(e, t) {
	var n = Kn;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: He,
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
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
	else if (t !== null) {
		try {
			ur(r);
		} catch (e) {
			throw jn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
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
	return et(t, h), t.teardown = e, t;
}
function bn(e) {
	hn("$effect");
	var t = Kn.f;
	if (!Un && t & 32 && He !== null && !He.i) {
		var n = He;
		(n.e ??= []).push(e);
	} else return xn(e);
}
function xn(e) {
	return _n(4 | w, e);
}
function Sn(e) {
	Rt.ensure();
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
function B(e, t = [], n = [], r = []) {
	gt(r, t, n, (t) => {
		_n(8, () => {
			e(...t.map(V));
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
		let e = Vn, n = Un;
		Hn(!0), Gn(null);
		try {
			t.call(null);
		} finally {
			Hn(e), Gn(n);
		}
	}
}
function kn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ut(() => {
			e.abort(de);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Mn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, kn(e, t && !n), lr(e, 0);
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
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
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
		e.f ^= v, e.f & 1024 || (et(e, g), Rt.ensure().schedule(e));
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
	if (t & 2 && (e.f &= ~ee), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ar(a) && Tt(a), a.wv > e.wv) return !0;
		}
		t & 512 && At === null && et(e, h);
	}
	return !1;
}
function or(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? or(a, t, !1) : t === a && (n ? et(a, g) : a.f & 1024 && et(a, _), Ut(a));
	}
}
function sr(e) {
	var t = Xn, n = Zn, r = Qn, i = Un, a = Jn, o = He, s = Wn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, Un = l & 96 ? null : e, Jn = null, Ue(e.ctx), Wn = !1, nr = ++tr, e.ac !== null && (ut(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= E;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = P?.is_fork;
		if (Xn !== null) {
			var m;
			if (p || lr(e, Zn), f !== null && Zn > 0) for (f.length = Zn + Xn.length, m = 0; m < Xn.length; m++) f[Zn + m] = Xn[m];
			else e.deps = f = Xn;
			if (vn() && e.f & 512) for (m = Zn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Zn < f.length && (lr(e, Zn), f.length = Zn);
		if (Ke() && Qn !== null && !Wn && f !== null && !(e.f & 6146)) for (m = 0; m < Qn.length; m++) or(Qn[m], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return Ze(e);
	} finally {
		e.f ^= E, Xn = t, Zn = n, Qn = r, Un = i, Jn = a, Ue(o), Wn = s, nr = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~ee), s.v !== Te && tt(s), s.ac !== null && ut(() => {
			s.ac.abort(de), s.ac = null, et(s, g);
		}), Et(s), lr(s, 0);
	}
}
function lr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) cr(e, n[r]);
}
function ur(e) {
	var t = e.f;
	if (!(t & 16384)) {
		et(e, h);
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
async function dr() {
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
	if (Vn && qt.has(e)) return qt.get(e);
	if (t) {
		var a = e;
		if (Vn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = wt(a)), qt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Wn && Un !== null && (Bn || !!(Un.f & 512)), c = (a.f & b) === 0;
		ar(a) && (s && (a.f |= 512), Tt(a)), s && !c && (Dt(a), fr(a));
	}
	if (At?.has(e)) return At.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Dt(t), fr(t));
}
function pr(e) {
	if (e.v === Te) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (qt.has(t) || t.f & 2 && pr(t)) return !0;
	return !1;
}
function mr(e) {
	var t = Wn;
	try {
		return Wn = !0, e();
	} finally {
		Wn = t;
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
	if (!ke) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function xr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Tr.call(t, e), !e.cancelBubble) return ut(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ye(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Sr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = xr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && yn(() => {
		t.removeEventListener(e, o, a);
	});
}
function H(e, t, n) {
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
		var d = Un, f = Kn;
		Gn(null), qn(null);
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
			e[_r] = t, delete e.currentTarget, Gn(d), qn(f);
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
	var t = pn("template");
	return t.innerHTML = Dr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function kr(e, t) {
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
		if (ke) return kr(A, null), A;
		i === void 0 && (i = Or(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ ln(i)));
		var t = r || rn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ ln(t), s = t.lastChild;
			kr(o, s);
		} else kr(t, t);
		return t;
	};
}
function Ar(e = "") {
	if (!ke) {
		var t = cn(e + "");
		return kr(t, t), t;
	}
	var n = A;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), je(n)), kr(n, n), n;
}
function jr() {
	if (ke) return kr(A, null), A;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), kr(t, n), e;
}
function W(e, t) {
	if (ke) {
		var n = Kn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = A), Me();
		return;
	}
	e !== null && e.before(t);
}
function G(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[le] ??= e.nodeValue) && (e[le] = n, e.nodeValue = `${n}`);
}
function Mr(e, t) {
	return Pr(e, t);
}
var Nr = /* @__PURE__ */ new Map();
function Pr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	sn();
	var l = void 0, u = Sn(() => {
		var s = n ?? t.appendChild(cn());
		mt(s, { pending: () => {} }, (t) => {
			We({});
			var n = He;
			if (o && (n.c = o), a && (i.$$events = a), ke && kr(t, null), l = e(t, i) || {}, ke && (Kn.nodes.end = A, A === null || A.nodeType !== 8 || A.data !== "]")) throw De(), we;
			Ge();
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
		} else ke && (this.anchor = A), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function K(e, t, n = !1) {
	var r;
	ke && (r = A, Me());
	var i = new Ir(e), a = n ? S : 0;
	function o(e, t) {
		if (ke) {
			var n = Fe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Pe();
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
function Lr(e, t) {
	return t;
}
function Rr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		Pn(n, () => {
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
			dn(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= T, Rn(a, document.createDocumentFragment())) : jn(t[i], n);
	}
}
var Br;
function Vr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = ke ? je(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	ke && Me();
	var d = null, f = /* @__PURE__ */ St(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Ur(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, Gr(d, null, c)) : In(d) : Pn(d, () => {
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
			ke && Fe(c) === "[!" != (e === 0) && (c = Pe(), je(c), Ae(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = P, v = fn(), y = 0; y < e; y += 1) {
				ke && A.nodeType === 8 && A.data === "]" && (c = A, t = !0, Ae(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Wr(l, h ? c : Br ??= cn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(Br ??= cn())), d.f |= T)), e > r.size && me("", "", ""), ke && e > 0 && je(Pe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Ae(!0), V(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, ke && (c = A);
}
function Hr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Ur(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Hr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (In(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) Gr(_, null, n);
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
		var ee = w.length;
		if (ee > 0) {
			var E = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < ee; v += 1) w[v].nodes?.a?.fix();
			}
			Rr(e, w, E);
		}
	}
	o && Ye(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Wr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Yt(n) : /* @__PURE__ */ Xt(n, !1, !1) : null, l = o & 2 ? Yt(i) : null;
	return {
		v: c,
		i: l,
		e: Dn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Gr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Kr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function q(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		ke && (o = je(/* @__PURE__ */ ln(c)));
	}
	B(() => {
		var e = Kn;
		if (s === (s = t() ?? "")) {
			ke && Me();
			return;
		}
		if (n && !ke) {
			e.nodes = null, c.innerHTML = s, s !== "" && kr(/* @__PURE__ */ ln(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (ke) {
				for (var a = A.data, l = Me(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw De(), we;
				kr(A, u), o = je(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? Ee : i ? O : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (kr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var qr = [..." 	\n\r\f\xA0\v﻿"];
function Jr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || qr.includes(r[o - 1])) && (s === r.length || qr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Yr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Xr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Zr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Xr)), i && c.push(...Object.keys(i).map(Xr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Xr(e.substring(l, u).trim());
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
		return r && (n += Yr(r)), i && (n += Yr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Qr(e, t, n, r, i, a) {
	var o = e[se];
	if (ke || o !== n || o === void 0) {
		var s = Jr(n, r, a);
		(!ke || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[se] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function $r(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function ei(e, t, n, r) {
	var i = e[ce];
	if (ke || i !== t) {
		var a = Zr(t, r);
		(!ke || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ce] = t;
	} else r && (Array.isArray(r) ? ($r(e, n?.[0], r[0]), $r(e, n?.[1], r[1], "important")) : $r(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ti = Symbol("is custom element"), ni = Symbol("is html"), ri = fe ? "link" : "LINK", ii = fe ? "progress" : "PROGRESS";
function J(e) {
	if (ke) {
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
		e[ue] = n, Ye(n), lt();
	}
}
function Y(e, t) {
	var n = oi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === ii) && (e.value = t ?? "");
}
function ai(e, t) {
	var n = oi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function X(e, t, n, r) {
	var i = oi(e);
	ke && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ri) || i[t] !== (i[t] = n) && (t === "loading" && (e[ae] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ci(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function oi(e) {
	return e[oe] ??= {
		[ti]: e.nodeName.includes("-"),
		[ni]: e.namespaceURI === D
	};
}
var si = /* @__PURE__ */ new Map();
function ci(e) {
	var t = e.getAttribute("is") || e.nodeName, n = si.get(t);
	if (n) return n;
	si.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function li(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	dt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ui(e) ? di(a) : a, n(a), P !== null && r.add(P), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (ke && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(ui(e) ? di(e.value) : e.value), P !== null && r.add(P)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = P;
			if (r.has(i)) return;
		}
		ui(e) && n === di(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function ui(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function di(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function fi(e, t) {
	return e === t || e?.[re] === t;
}
function pi(e = {}, t, n, r) {
	var i = He.r, a = Kn;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], mr(() => {
				fi(n(...s), e) || (t(e, ...s), o && fi(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && fi(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function mi(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ bt(r), V(u)) : (l && (l = !1, c = s ? mr(r) : r), c);
	let f;
	if (o) {
		var p = re in e || ie in e;
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
	var v = !1, y = (n & 1 ? bt : St)(() => (v = !1, g()));
	o && V(y);
	var b = Kn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? V(y) : i && o ? tn(e) : e;
			return I(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : V(y);
	});
}
var hi = {
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
}, gi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], _i = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, vi = {
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
function yi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(vi)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function bi(e) {
	return gi.includes(String(e ?? ""));
}
function xi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages må være en liste"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: hvert innslag må være et objekt");
			continue;
		}
		let e = String(n.code ?? "");
		_i.test(e) ? bi(e) && t.push(`languages: '${e}' er innebygd i Urd og kan ikke overstyres`) : t.push(`languages: '${e}' er ikke en gyldig språkkode`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name mangler (språkets eget navn)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} må være boolsk`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: må dekke site, admin eller begge`);
	}
	return t;
}
function Si(e) {
	let t = yi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return _i.test(n) ? n : "nb";
}
async function Ci(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...hi.strings });
var wi = {
	lang: "nb",
	dict: {}
};
function Ti(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Z(e, t) {
	return Ti(wi.dict[e] ?? e, t);
}
function Ei(e) {
	let t = `api.${e?.code}`;
	return e?.code && wi.dict[t] !== void 0 ? Ti(wi.dict[t], e) : e?.error ?? null;
}
function Di() {
	return wi.lang;
}
function Oi() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Si(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = yi(e);
		if (t) return t;
	}
	return "en-GB";
}
var ki;
new Promise((e) => {
	ki = e;
});
async function Ai(e = Oi()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	wi.lang = Si(e);
	let n = bi(wi.lang);
	try {
		Object.assign(wi.dict, await t("nb")), n && wi.lang !== "nb" && Object.assign(wi.dict, await t(wi.lang));
	} catch {}
	if (!n) {
		let e = await Ci(wi.lang, "admin");
		e ? Object.assign(wi.dict, e) : wi.lang = "nb";
	}
	return ki(wi.lang), wi.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function ji(e, t, n) {
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
var Mi = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Ni = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Pi = /* @__PURE__ */ U("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Fi = /* @__PURE__ */ U("<button type=\"button\"></button>"), Ii = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Li = /* @__PURE__ */ U("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Ri = /* @__PURE__ */ U("<span class=\"cp-tokens svelte-zxiloo\"></span>"), zi = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), Bi = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Vi = /* @__PURE__ */ U("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), Hi = /* @__PURE__ */ U("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Ui(e, t) {
	We(t, !0);
	let n = mi(t, "value", 3, "#000000"), r = mi(t, "tokens", 19, () => []), i = mi(t, "label", 19, () => Z("cp.pickColor")), a = mi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ F(tn([])), d = /* @__PURE__ */ F(tn([])), f = "", p = "", h = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(!1), _ = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ F(0), y = /* @__PURE__ */ F(0), b = /* @__PURE__ */ F(1), x = /* @__PURE__ */ F(1), S = /* @__PURE__ */ F("#000000");
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
	let w = (e, t, n) => "#" + [
		e,
		t,
		n
	].map((e) => e.toString(16).padStart(2, "0")).join("");
	function T(e, t, n) {
		e /= 255, t /= 255, n /= 255;
		let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0;
		return i && (a = r === e ? (t - n) / i % 6 : r === t ? (n - e) / i + 2 : (e - t) / i + 4, a *= 60, a < 0 && (a += 360)), [
			a,
			r ? i / r : 0,
			r
		];
	}
	function ee(e, t, n) {
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
		return w(...ee(V(v), V(y), V(b)));
	}
	function te() {
		let e = E();
		return V(x) >= .995 ? e : e + Math.round(V(x) * 255).toString(16).padStart(2, "0");
	}
	function ne() {
		I(S, te(), !0), p = V(S), t.onchange?.(V(S));
	}
	function re(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = m(e, 3);
			I(v, t[0], !0), I(y, t[1], !0), I(b, t[2], !0);
		})(T(t[0], t[1], t[2])), I(x, t[3], !0), I(S, te(), !0), !0) : !1;
	}
	function ie() {
		re(c()) || re("#000000"), f = n(), p = "";
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
		let e = V(h).getBoundingClientRect(), t = V(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(_, {
			top: a,
			left: i
		}, !0), I(g, !0);
	}
	function ae() {
		if (I(g, !1), p && p !== f) {
			let e = [p, ...V(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function oe(e, n) {
		re(n), I(S, n, !0), t.onchange?.(e);
	}
	function se(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			I(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), I(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ne();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function ce(e) {
		re(e.target.value) ? ne() : I(S, E(), !0);
	}
	function le(e) {
		return (C(E()) ?? [
			0,
			0,
			0
		])[e];
	}
	function ue(e, t) {
		let n = C(E()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = m(e, 3);
			I(v, t[0], !0), I(y, t[1], !0), I(b, t[2], !0);
		})(T(...n)), ne();
	}
	let de = typeof window < "u" && "EyeDropper" in window;
	async function fe() {
		try {
			re((await new window.EyeDropper().open()).sRGBHex) && ne();
		} catch {}
	}
	function pe(e) {
		re(e) && ne();
	}
	function me() {
		let e = te();
		V(d).includes(e) || (I(d, [e, ...V(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(Be(V(d)))));
	}
	function he(e) {
		I(d, V(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(Be(V(d))));
	}
	bn(() => {
		if (!V(g)) return;
		let e = (e) => {
			V(h) && !V(h).contains(e.target) && ae();
		}, t = (e) => {
			e.key === "Escape" && ae();
		}, n = () => ae();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var ge = Hi(), _e = L(ge);
	let ve;
	var ye = z(_e, 2), be = (e) => {
		var n = Mi();
		B((e, t) => {
			X(n, "title", e), X(n, "aria-label", t);
		}, [() => Z("cp.clearTitle"), () => Z("cp.clear")]), H("click", n, () => t.onchange?.("")), W(e, n);
	};
	K(ye, (e) => {
		a() && n() && e(be);
	});
	var xe = z(ye, 2), Se = (e) => {
		var t = Vi(), i = L(t), a = L(i);
		j(i);
		var o = z(i, 2);
		J(o);
		var s = z(o, 2);
		J(s);
		var c = z(s, 2), f = L(c), p = z(f, 2);
		J(p);
		var h = z(p, 2), g = (e) => {
			var t = Ni();
			B((e) => X(t, "title", e), [() => Z("cp.eyedropper")]), H("click", t, fe), W(e, t);
		};
		K(h, (e) => {
			de && e(g);
		}), j(c);
		var C = z(c, 2);
		Vr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Pi();
			J(r), B((e) => {
				X(r, "title", t), Y(r, e);
			}, [() => le(V(n))]), H("change", r, (e) => ue(V(n), e.target.value)), W(e, r);
		}), j(C);
		var w = z(C, 2), T = (e) => {
			var t = Ii(), i = R(t), a = L(i, !0), o = z(a), s = (e) => {
				var t = Ar();
				B((e) => G(t, e), [() => Z("cp.linkedSuffix", { token: l() })]), W(e, t);
			}, c = /* @__PURE__ */ N(() => l());
			K(o, (e) => {
				V(c) && e(s);
			}), j(i);
			var u = z(i, 2);
			Vr(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ N(() => m(V(t), 2));
				let i = () => V(r)[0], a = () => V(r)[1];
				var o = Fi();
				let s;
				B((e) => {
					s = Qr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), ei(o, `background: ${a() ?? ""}`), X(o, "title", e);
				}, [() => Z("cp.tokenTitle", { name: i() })]), H("click", o, () => oe(i(), a())), W(e, o);
			}), j(u), B((e) => G(a, e), [() => Z("cp.themeColors")]), W(e, t);
		};
		K(w, (e) => {
			r().length && e(T);
		});
		var ee = z(w, 2), te = L(ee), re = z(te);
		j(ee);
		var ie = z(ee, 2), ae = (e) => {
			var t = Ri();
			Vr(t, 20, () => V(d), (e) => e, (e, t) => {
				var n = Li(), r = L(n), i = z(r, 2);
				j(n), B((e) => {
					ei(r, `background: ${t ?? ""}`), X(r, "title", t), X(i, "title", e);
				}, [() => Z("cp.removeSaved")]), H("click", r, () => pe(t)), H("click", i, () => he(t)), W(e, n);
			}), j(t), W(e, t);
		};
		K(ie, (e) => {
			V(d).length && e(ae);
		});
		var ge = z(ie, 2), _e = (e) => {
			var t = Bi(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2);
			Vr(i, 20, () => V(u), (e) => e, (e, t) => {
				var n = zi();
				B(() => {
					ei(n, `background: ${t ?? ""}`), X(n, "title", t);
				}), H("click", n, () => pe(t)), W(e, n);
			}), j(i), B((e) => G(r, e), [() => Z("common.recent")]), W(e, t);
		};
		K(ge, (e) => {
			V(u).length && e(_e);
		}), j(t), B((e, n, r, c, l) => {
			ei(t, `top: ${V(_).top ?? ""}px; left: ${V(_).left ?? ""}px`), ei(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${V(v) ?? ""}, 100%, 50%)`), ei(a, `left: ${V(y) * 100}%; top: ${(1 - V(b)) * 100}%`), Y(o, V(v)), Y(s, e), X(s, "title", n), ei(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), ei(f, `background: ${V(S) ?? ""}`), Y(p, V(S)), G(te, `${c ?? ""} `), X(re, "title", l);
		}, [
			() => Math.round(V(x) * 100),
			() => Z("cp.alpha"),
			() => E(),
			() => Z("cp.saved"),
			() => Z("cp.saveTitle")
		]), H("click", t, (e) => e.preventDefault()), H("pointerdown", i, se), H("input", o, (e) => {
			I(v, Number(e.target.value), !0), ne();
		}), H("input", s, (e) => {
			I(x, Number(e.target.value) / 100), ne();
		}), H("change", p, ce), H("click", re, me), W(e, t);
	};
	K(xe, (e) => {
		V(g) && e(Se);
	}), j(ge), pi(ge, (e) => I(h, e), () => V(h)), B((e, t, n) => {
		ve = Qr(_e, 1, "cp-swatch svelte-zxiloo", null, ve, e), ei(_e, `background: ${t ?? ""}`), X(_e, "title", n), X(_e, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? Z("cp.linkedTitle", {
			label: i(),
			token: l()
		}) : i()
	]), H("click", _e, () => V(g) ? ae() : ie()), W(e, ge), Ge();
}
Cr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.6.11/imageTools.js
var Wi = 1600, Gi = .82, Ki = .6;
async function qi(e, t = Wi) {
	if (Yi(e)) return Xi(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Gi);
	return c.size > 4e5 && (c = await s(Ki)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var Ji = "image/svg+xml";
function Yi(e) {
	return e.type === Ji || /\.svg$/i.test(e.name || "");
}
function Xi(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${Ji};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Zi(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Qi(e) {
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
function $i(e) {
	return /^data:image\/svg\+xml[;,]/.test(e || "") ? "svg" : "webp";
}
function ea(e, t = "bilde") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ta(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.11/glyphs.js
var na = "urd-recent-glyphs", ra = [
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
function ia(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function aa() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function oa(e) {
	let t = ia(aa(), e);
	try {
		localStorage.setItem(na, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/icons.js
var sa = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", ca = "fill=\"currentColor\" stroke=\"none\"", la = {
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
}, ua = [
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
function da(e) {
	let t = typeof e == "string" ? la[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? ca : sa} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var fa = /* @__PURE__ */ U("<img class=\"gp-own svelte-15ln1c3\"/>"), pa = /* @__PURE__ */ U("<span class=\"gp-svg svelte-15ln1c3\"></span>"), ma = /* @__PURE__ */ U("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ha = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), ga = /* @__PURE__ */ U("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), _a = /* @__PURE__ */ U("<button type=\"button\"> </button>"), va = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), ya = /* @__PURE__ */ U("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), ba = /* @__PURE__ */ U("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function xa(e, t) {
	We(t, !0);
	let n = mi(t, "value", 3, "★"), r = mi(t, "icon", 3, null), i = mi(t, "image", 3, null), a = mi(t, "label", 19, () => Z("gp.pickGlyph")), o = /* @__PURE__ */ F(tn([])), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0
	}));
	function d() {
		I(o, aa(), !0);
		let e = V(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(u, {
			top: n,
			left: t
		}, !0), I(l, !0);
	}
	function f(e) {
		oa(e), t.onpick?.(e), I(l, !1);
	}
	function p(e) {
		t.onicon?.(e), I(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await qi(n, 256);
		t.onimage?.(r.dataUrl), I(l, !1);
	}
	bn(() => {
		if (!V(l)) return;
		let e = (e) => {
			V(s) && !V(s).contains(e.target) && I(l, !1);
		}, t = (e) => {
			e.key === "Escape" && I(l, !1);
		}, n = (e) => {
			V(s) && e.target instanceof Node && !V(s).contains(e.target) && I(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = ba(), _ = L(g), v = L(_), y = (e) => {
		var t = fa();
		B((e) => {
			X(t, "src", i()), X(t, "alt", e);
		}, [() => Z("gp.ownIcon")]), W(e, t);
	}, b = (e) => {
		var t = pa();
		q(t, () => da(r()), !0), j(t), W(e, t);
	}, x = (e) => {
		var t = Ar();
		B(() => G(t, n() || "★")), W(e, t);
	};
	K(v, (e) => {
		i() ? e(y) : r() && la[r()] ? e(b, 1) : e(x, -1);
	}), j(_);
	var S = z(_, 2), C = (e) => {
		var i = ya(), a = L(i), s = (e) => {
			var t = ha(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2);
			Vr(i, 20, () => V(o), (e) => e, (e, t) => {
				var n = ma(), r = L(n, !0);
				j(n), B(() => G(r, t)), H("click", n, () => f(t)), W(e, n);
			}), j(i), B((e) => G(r, e), [() => Z("common.recent")]), W(e, t);
		};
		K(a, (e) => {
			V(o).length && e(s);
		});
		var l = z(a, 2), d = (e) => {
			var t = jr();
			Vr(R(t), 17, () => ua, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ N(() => m(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = ha(), s = R(o), c = L(s, !0);
				j(s);
				var l = z(s, 2);
				Vr(l, 20, a, (e) => e, (e, t) => {
					var n = ga();
					let i;
					var a = L(n);
					q(a, () => da(t), !0), j(a), j(n), B(() => {
						i = Qr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), X(n, "title", la[t].label);
					}), H("click", n, () => p(t)), W(e, n);
				}), j(l), B((e) => G(c, e), [() => Z(i())]), W(e, o);
			}), W(e, t);
		};
		K(l, (e) => {
			t.onicon && e(d);
		});
		var g = z(l, 2);
		Vr(g, 17, () => ra, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(V(t), 2));
			let i = () => V(r)[0], a = () => V(r)[1];
			var o = ha(), s = R(o), c = L(s, !0);
			j(s);
			var l = z(s, 2);
			Vr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = _a();
				let i;
				var a = L(r, !0);
				j(r), B(() => {
					i = Qr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), G(a, t);
				}), H("click", r, () => f(t)), W(e, r);
			}), j(l), B((e) => G(c, e), [() => Z(i())]), W(e, o);
		});
		var _ = z(g, 2), v = (e) => {
			var t = va(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2), a = L(i, !0);
			j(i);
			var o = z(i, 2);
			pi(o, (e) => I(c, e), () => V(c));
			var s = z(o, 2), l = L(s, !0);
			j(s), B((e, t, n) => {
				G(r, e), G(a, t), G(l, n);
			}, [
				() => Z("gp.ownIcon"),
				() => Z("gp.upload"),
				() => Z("gp.uploadHint")
			]), H("click", i, () => V(c).click()), H("change", o, h), W(e, t);
		};
		K(_, (e) => {
			t.onimage && e(v);
		}), j(i), B(() => ei(i, `top: ${V(u).top ?? ""}px; left: ${V(u).left ?? ""}px`)), W(e, i);
	};
	K(S, (e) => {
		V(l) && e(C);
	}), j(g), pi(g, (e) => I(s, e), () => V(s)), B(() => {
		X(_, "title", a()), X(_, "aria-label", a());
	}), H("click", _, () => V(l) ? I(l, !1) : d()), W(e, g), Ge();
}
Cr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Sa(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-reset" && t.onMobileReset?.(n), n?.type === "urd-mobile-order" && t.onMobileOrder?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n), n?.type === "urd-save-template" && t.onSaveTemplate?.(n), n?.type === "urd-sticky-group" && t.onStickyGroup?.(n), n?.type === "urd-delete-template" && t.onDeleteTemplate?.(n), n?.type === "urd-apply-layout" && t.onApplyLayout?.(n);
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
		sendMaler(e) {
			r({
				type: "urd-maler",
				maler: e
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
function Ca(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function wa(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? Ca(r, i) : Infinity;
	return Math.max(.1, Math.min(1, Ca(e, t), a));
}
var Ta = 1920, Ea = [
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
], Da = [
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
], Oa = [
	1920,
	1536,
	1366
];
function ka(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Ta, Math.max(960, n));
}
function Aa(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function ja(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Ma(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Na(e) {
	return Da.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/Dropdown.svelte
var Pa = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Fa = /* @__PURE__ */ U("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ia = /* @__PURE__ */ U("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function Q(e, t) {
	We(t, !0);
	let n = mi(t, "value", 3, null), r = mi(t, "options", 19, () => []), i = mi(t, "title", 3, null), a = mi(t, "disabled", 3, !1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = V(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		I(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (V(o)) {
				I(o, !1);
				return;
			}
			u(), I(o, !0);
		}
	}
	function f(e) {
		I(o, !1), t.onchange?.(e);
	}
	bn(() => {
		if (!V(o)) return;
		let e = (e) => {
			V(s) && !V(s).contains(e.target) && I(o, !1);
		}, t = (e) => {
			e.key === "Escape" && I(o, !1);
		}, n = (e) => {
			V(s) && e.target instanceof Node && !V(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = Ia(), h = L(p), g = L(h), _ = L(g, !0);
	j(g);
	var v = z(g, 2), y = L(v, !0);
	j(v), j(h);
	var b = z(h, 2), x = (e) => {
		var t = Fa();
		Vr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ N(() => m(V(t), 2));
			let i = () => V(r)[0], a = () => V(r)[1];
			var o = Pa();
			let s;
			var c = L(o, !0);
			j(o), B(() => {
				s = Qr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), G(c, a());
			}), H("click", o, () => f(i())), W(e, o);
		}), j(t), B(() => ei(t, `top: ${V(c).top ?? ""}px; left: ${V(c).left ?? ""}px; min-width: ${V(c).width ?? ""}px`)), W(e, t);
	};
	K(b, (e) => {
		V(o) && e(x);
	}), j(p), pi(p, (e) => I(s, e), () => V(s)), B((e) => {
		X(h, "title", i()), h.disabled = a(), G(_, e), G(y, V(o) ? "▴" : "▾");
	}, [() => l()]), H("click", h, d), W(e, p), Ge();
}
Cr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var La = /* @__PURE__ */ U("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Ra(e, t) {
	We(t, !0);
	let n = mi(t, "image", 3, ""), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(1), o = /* @__PURE__ */ F(.5), s = /* @__PURE__ */ F(.5), c = /* @__PURE__ */ F(1), l = /* @__PURE__ */ F(1), u = /* @__PURE__ */ F(1);
	bn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			I(i, e, !0);
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
			I(o, Math.min(1, Math.max(0, V(o) - (e.clientX - t) / c)), !0), I(s, Math.min(1, Math.max(0, V(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = La(), g = L(h), _ = L(g), v = L(_, !0);
	j(_);
	var y = z(_, 2), b = L(y);
	X(b, "width", 220), X(b, "height", 220), pi(b, (e) => I(r, e), () => V(r));
	var x = z(b, 2), S = L(x, !0);
	j(x), j(y);
	var C = z(y, 2), w = L(C), T = z(w), ee = L(T);
	j(T), j(C);
	var E = z(C, 2);
	J(E);
	var te = z(E, 2), ne = L(te), re = z(ne), ie = L(re);
	j(re), j(te);
	var ae = z(te, 2);
	J(ae);
	var oe = z(ae, 2), se = L(oe), ce = z(se), le = L(ce);
	j(ce), j(oe);
	var ue = z(oe, 2);
	J(ue);
	var de = z(ue, 2), fe = L(de), pe = z(fe), me = L(pe);
	j(pe), j(de);
	var he = z(de, 2);
	J(he);
	var ge = z(he, 2), _e = L(ge), ve = L(_e, !0);
	j(_e);
	var ye = z(_e, 2), be = L(ye, !0);
	j(ye), j(ge);
	var xe = z(ge, 2), Se = L(xe), Ce = L(Se, !0);
	j(Se);
	var we = z(Se, 2), Te = L(we, !0);
	j(we), j(xe), j(g), j(h), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		G(v, e), X(b, "title", t), G(S, n), G(w, `${r ?? ""} `), G(ee, `${i ?? ""}x`), G(ne, `${a ?? ""} `), G(ie, `${o ?? ""}%`), G(se, `${s ?? ""} `), G(le, `${c ?? ""}%`), G(fe, `${l ?? ""} `), G(me, `${u ?? ""}%`), G(ve, d), G(be, f), G(Ce, p), G(Te, m);
	}, [
		() => Z("ie.title"),
		() => Z("ie.dragTip"),
		() => Z("ie.hint"),
		() => Z("lbl.zoom"),
		() => V(a).toFixed(2),
		() => Z("lbl.brightness"),
		() => Math.round(V(c) * 100),
		() => Z("lbl.contrast"),
		() => Math.round(V(l) * 100),
		() => Z("lbl.saturate"),
		() => Math.round(V(u) * 100),
		() => Z("ie.grayscale"),
		() => Z("common.reset"),
		() => Z("confirm.cancel"),
		() => Z("common.apply")
	]), H("pointerdown", b, f), li(E, () => V(a), (e) => I(a, e)), li(ae, () => V(c), (e) => I(c, e)), li(ue, () => V(l), (e) => I(l, e)), li(he, () => V(u), (e) => I(u, e)), H("click", _e, () => I(u, 0)), H("click", ye, p), H("click", Se, () => t.oncancel?.()), H("click", we, m), W(e, h), Ge();
}
Cr(["pointerdown", "click"]);
var za = 24, Ba = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
}, Va = { 1: (e) => {
	for (let t of e.sections ?? []) {
		let e = t.responsive?.mobile;
		for (let e of t.blocks ?? []) {
			e.decor && (e.hideMobile = !0);
			let t = e.frames?.mobile;
			if (!t) continue;
			let n = e.frames.desktop;
			if (n && t.x === n.x && t.y === n.y && t.w === n.w && t.h === n.h) {
				e.frames.mobile = null;
				continue;
			}
			let r = {
				x: t.x,
				w: t.w
			};
			Number.isFinite(t.y) && (r.row = Math.max(1, Math.round((t.y - za) / 8) + 1), r.rows = Number.isFinite(t.h) ? Math.max(1, Math.ceil(t.h / 8)) : 1), Number.isFinite(t.z) && t.z !== 1 && (r.z = t.z), t.rot && (r.rot = t.rot), e.frames.mobile = r;
		}
		e?.mode === "manual" && (e.mode = "auto");
		let n = e?.attention?.reason;
		n && Ba[n] && (e.attention.reason = Ba[n]);
	}
	return e;
} }, Ha = {
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
	})
};
function Ua(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 3;) {
		let r = Ha[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Wa(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 2;) {
		let i = Va[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/plugins.js
function Ga(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Ka = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function qa(e, t) {
	let n = Ga(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Ga(t[2]), a = Ka(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Ja = /^[a-z0-9][a-z0-9-]*$/;
function Ya(e) {
	let t = [];
	if (!e || typeof e != "object") return ["manifestet er ikke et objekt"];
	Ja.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Ga(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), e.languages !== void 0 && t.push(...xi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales må være boolsk"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names må være et objekt med språkkode til navn"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/sections/presets.js
function Xa(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var Za = () => ({ mobile: {
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
}), Qa = (e, t, n = {}) => ({
	id: Xa("blk"),
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
}), $a = (e, t = {}) => ({
	id: Xa("blk"),
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
}), eo = (e, t, n = {}) => ({
	id: Xa("blk"),
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
}), to = (e, t, n = 40) => ({
	id: Xa("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), no = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), ro = (e, t, n = {}) => ({
	id: Xa("blk"),
	type: "samling",
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
}), io = (e, t = {}) => ({
	id: Xa("blk"),
	type: "galleri",
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
}), ao = (e, t) => ({
	id: Xa("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), oo = (e, t = {}) => ({
	id: Xa("blk"),
	type: "sitat",
	version: 1,
	props: {
		text: "",
		attribution: "",
		role: "",
		variant: "stor",
		image: "",
		accent: null,
		...t
	},
	animation: null,
	frames: e
}), so = (e, t) => ({
	id: Xa("blk"),
	type: "tidslinje",
	version: 1,
	props: {
		items: t,
		variant: "venstre",
		marker: "fylt",
		accent: null
	},
	animation: null,
	frames: e
}), co = (e, t = {}) => ({
	id: Xa("blk"),
	type: "statistikk",
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
}), lo = (...e) => ({
	version: 1,
	layers: e
}), uo = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), fo = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), po = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), mo = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), ho = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = mo(e, t, n, r, i, a);
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
		y: po(e) + 16,
		n: 0
	};
}, go = (e, t, n) => e + t * .1 + n * .01, _o = (e, t, n, r, i = null) => ({
	id: Xa("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: Za()
});
function vo(e) {
	e.sections.define("tom", {
		label: "Tom seksjon",
		labelKey: "preset.tom.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Blankt lerret å bygge fritt på",
		hintKey: "preset.tom.hint",
		create: () => _o("tom", "40vh", lo(uo("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Stor åpning med gradient og glød, venstrestilt",
		hintKey: "preset.hero.hint",
		create: () => _o("hero", "70vh", {
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
				fo(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			Qa($(8.33, 40, 50, 38), Z("seed.hero.title")),
			Qa($(8.33, 84, 41.67, 26), Z("seed.hero.intro")),
			eo($(8.33, 118, 20, 32), Z("seed.readMore"))
		])
	}), e.sections.define("hero-sentrert", {
		label: "Hero, sentrert",
		labelKey: "preset.hero-sentrert.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Sentrert åpning med to knapper",
		hintKey: "preset.hero-sentrert.hint",
		create: () => _o("hero-sentrert", "60vh", lo(uo("bg")), [
			Qa($(15, 64, 70, 44), Z("seed.heroCenter.title"), { align: "center" }),
			Qa($(25, 116, 50, 26), Z("seed.heroCenter.intro"), { align: "center" }),
			eo($(31.5, 160, 17, 40), Z("seed.join")),
			eo($(51.5, 160, 17, 40), Z("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("bilder", {
		label: "Bilder",
		labelKey: "preset.bilder.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Tittel og tre bilderammer",
		hintKey: "preset.bilder.hint",
		create: () => _o("bilder", "360px", lo(uo("bg")), [
			Qa($(4, 24, 50, 32), Z("seed.images.title")),
			$a($(4, 72, 28, 220)),
			$a($(36, 72, 28, 220)),
			$a($(68, 72, 28, 220))
		]),
		itemLabel: "bilde",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = ho(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [$a($(t, n, 28, 220))],
				bottom: n + 244
			};
		}
	}), e.sections.define("galleri", {
		label: "Galleri",
		labelKey: "preset.galleri.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Bildegalleri i rutenett med fullskjermvisning (lightbox)",
		hintKey: "preset.galleri.hint",
		create: () => _o("galleri", "440px", lo(uo("bg")), [Qa($(4, 24, 50, 32), Z("seed.gallery.title")), io($(4, 72, 92, 320))])
	}), e.sections.define("kontakt", {
		label: "Kontakt",
		labelKey: "preset.kontakt.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Kontaktinfo i kort med e-postknapp",
		hintKey: "preset.kontakt.hint",
		create: () => _o("kontakt", "320px", lo(uo("surface"), fo(.2, .8, .2)), [
			Qa($(10, 32, 40, 36), Z("seed.contact.title")),
			Qa($(10, 84, 36, 130), Z("seed.contact.info"), { box: !0 }),
			eo($(60, 100, 22, 40), Z("seed.contact.button"), { href: "mailto:post@dinforening.no" })
		])
	}), e.sections.define("funksjonskort", {
		label: "Funksjonskort",
		labelKey: "preset.funksjonskort.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre kort med ikon, tittel og tekst",
		hintKey: "preset.funksjonskort.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = to($(e + 10.5, 88, 4, 52), n), a = Qa($(e, 152, 25, 200), Z("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = no(), i.mobileOrder = go(88, t, 0), a.mobileOrder = go(88, t, 1), [i, a];
			};
			return _o("funksjonskort", "420px", lo(uo("bg")), [
				Qa($(6, 28, 60, 38), Z("seed.features.title")),
				...e(6, 0, "✦", Z("seed.features.card1")),
				...e(37.5, 1, "★", Z("seed.features.card2")),
				...e(69, 2, "✓", Z("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ho(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = to($(t + 10.5, n - 64, 4, 52), "✦"), a = Qa($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = no(), i.mobileOrder = go(88, r, 0), a.mobileOrder = go(88, r, 1), {
				blocks: [i, a],
				bottom: n + 228
			};
		}
	}), e.sections.define("funksjonskort-enkel", {
		label: "Funksjonskort uten ikoner",
		labelKey: "preset.funksjonskort-enkel.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre kort med tittel og tekst (uten ikonene over)",
		hintKey: "preset.funksjonskort-enkel.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Qa($(e, 88, 25, 200), Z("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = no(), r.mobileOrder = go(88, t, 0), r;
			};
			return _o("funksjonskort-enkel", "360px", lo(uo("bg")), [
				Qa($(6, 28, 60, 38), Z("seed.features.title")),
				e(6, 0, Z("seed.features.card1")),
				e(37.5, 1, Z("seed.features.card2")),
				e(69, 2, Z("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = ho(e, 3, 6, 31.5, 88, 232, 25, 200), i = Qa($(t, n, 25, 200), Z("seed.features.card", { title: Z("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = no(), i.mobileOrder = go(88, r, 0), {
				blocks: [i],
				bottom: n + 228
			};
		}
	}), e.sections.define("nyheter", {
		label: "Nyheter",
		labelKey: "preset.nyheter.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre nyhetskort med bilde, tag og dato",
		hintKey: "preset.nyheter.hint",
		create: () => {
			let e = (e, t) => {
				let n = $a($(e, 88, 25, 160)), r = Qa($(e, 256, 25, 160), Z("seed.news.card"));
				return n.mobileOrder = go(88, t, 0), r.mobileOrder = go(88, t, 1), [n, r];
			};
			return _o("nyheter", "460px", lo(uo("bg")), [
				Qa($(6, 28, 50, 38), Z("seed.news.title")),
				eo($(78, 30, 16, 36), Z("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "sak",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = ho(e, 3, 6, 31.5, 88, 344, 25, 328), i = $a($(t, n, 25, 160)), a = Qa($(t, n + 168, 25, 160), Z("seed.news.card"));
			return i.mobileOrder = go(88, r, 0), a.mobileOrder = go(88, r, 1), {
				blocks: [i, a],
				bottom: n + 352
			};
		}
	}), e.sections.define("nyheter-samling", {
		label: "Nyheter (samling)",
		labelKey: "preset.nyheter-samling.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Nyhetskort fra en samling: skriv innslag, kortene følger med",
		hintKey: "preset.nyheter-samling.hint",
		create: () => _o("nyheter-samling", "300px", lo(uo("bg")), [Qa($(6, 28, 50, 38), Z("seed.news.title")), ro($(6, 88, 88, 180), "cards")])
	}), e.sections.define("oppslagstavle", {
		label: "Oppslagstavle",
		labelKey: "preset.oppslagstavle.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Datert liste fra en samling (oppslag/kunngjøringer)",
		hintKey: "preset.oppslagstavle.hint",
		create: () => _o("oppslagstavle", "300px", lo(uo("surface")), [Qa($(6, 28, 50, 38), Z("seed.noticeboard.title")), ro($(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publikasjonsarkiv", {
		label: "Publikasjonsarkiv",
		labelKey: "preset.publikasjonsarkiv.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "År-gruppert arkiv fra en samling (utgaver, referater, rapporter)",
		hintKey: "preset.publikasjonsarkiv.hint",
		create: () => _o("publikasjonsarkiv", "300px", lo(uo("bg")), [Qa($(6, 28, 60, 38), Z("seed.archive.title")), ro($(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("arrangementer", {
		label: "Arrangementer",
		labelKey: "preset.arrangementer.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre rader med dato-badge og påmeldingsknapp",
		hintKey: "preset.arrangementer.hint",
		create: () => {
			let e = (e, t, n, r) => [
				Qa($(6, e, 8, 88), Z("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				Qa($(16, e, 58, 88), Z("seed.events.row", { title: r })),
				eo($(78, e + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
			];
			return _o("arrangementer", "440px", lo(uo("surface")), [
				Qa($(6, 28, 50, 38), Z("seed.events.title")),
				...e(88, "11", Z("seed.events.monthAug"), Z("seed.events.row1")),
				...e(196, "25", Z("seed.events.monthAug"), Z("seed.events.row2")),
				...e(304, "8", Z("seed.events.monthSep"), Z("seed.events.row3"))
			]);
		},
		itemLabel: "rad",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = po(e) + 16;
			return {
				blocks: [
					Qa($(6, t, 8, 88), Z("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					Qa($(16, t, 58, 88), Z("seed.events.row", { title: Z("seed.events.newTitle") })),
					eo($(78, t + 24, 16, 40), Z("seed.events.signup"), { style: "secondary" })
				],
				bottom: t + 116
			};
		}
	}), e.sections.define("team", {
		label: "Team/styret",
		labelKey: "preset.team.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Portretter med navn, verv og e-post",
		hintKey: "preset.team.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = $a($(e, 80, 22, 180), { alt: Z("seed.team.alt") }), i = Qa($(e, 268, 22, 84), Z("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = go(80, t, 0), i.mobileOrder = go(80, t, 1), [r, i];
			};
			return _o("team", "420px", lo(uo("surface")), [
				Qa($(6, 24, 50, 32), Z("seed.team.title")),
				...e(7.5, 0, Z("seed.team.role1")),
				...e(39, 1, Z("seed.team.role2")),
				...e(70.5, 2, Z("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = ho(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = $a($(t, n, 22, 180), { alt: Z("seed.team.alt") }), a = Qa($(t, n + 188, 22, 84), Z("seed.team.member", { role: Z("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = go(80, r, 0), a.mobileOrder = go(80, r, 1), {
				blocks: [i, a],
				bottom: n + 296
			};
		}
	}), e.sections.define("faq", {
		label: "FAQ",
		labelKey: "preset.faq.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Spørsmål og svar i kort",
		hintKey: "preset.faq.hint",
		create: () => _o("faq", "520px", lo(uo("bg")), [
			Qa($(25, 24, 50, 36), Z("seed.faq.title"), { align: "center" }),
			ao($(20, 80, 60, 320), [
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
			Qa($(20, 416, 60, 32), Z("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("tidslinje", {
		label: "Tidslinje",
		labelKey: "preset.tidslinje.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Historien som hendelser langs en linje",
		hintKey: "preset.tidslinje.hint",
		create: () => _o("tidslinje", "480px", lo(uo("bg")), [Qa($(25, 24, 50, 36), Z("seed.tidslinje.title"), { align: "center" }), so($(25, 88, 50, 330), [
			{
				year: "2019",
				title: Z("seed.tidslinje.t1"),
				text: Z("seed.tidslinje.text")
			},
			{
				year: "2022",
				title: Z("seed.tidslinje.t2"),
				text: Z("seed.tidslinje.text")
			},
			{
				year: "2026",
				title: Z("seed.tidslinje.t3"),
				text: Z("seed.tidslinje.text")
			}
		])])
	}), e.sections.define("steg", {
		label: "Steg for steg",
		labelKey: "preset.steg.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre nummererte kort",
		hintKey: "preset.steg.hint",
		create: () => {
			let e = (e, t, n) => {
				let r = Qa($(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = Qa($(e, 168, 25, 160), Z("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = go(88, t, 0), i.mobileOrder = go(88, t, 1), [r, i];
			};
			return _o("steg", "400px", lo(uo("bg")), [
				Qa($(6, 28, 60, 38), Z("seed.steps.title")),
				...e(6, 0, Z("seed.steps.s1")),
				...e(37.5, 1, Z("seed.steps.s2")),
				...e(69, 2, Z("seed.steps.s3"))
			]);
		},
		itemLabel: "steg",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = ho(e, 3, 6, 31.5, 88, 272, 25, 240), i = Qa($(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = Qa($(t, n + 80, 25, 160), Z("seed.steps.card", { title: Z("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = go(88, r, 0), a.mobileOrder = go(88, r, 1), {
				blocks: [i, a],
				bottom: n + 268
			};
		}
	}), e.sections.define("hovedoppslag", {
		label: "Hovedoppslag",
		labelKey: "preset.hovedoppslag.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Én stor sak og to små ved siden",
		hintKey: "preset.hovedoppslag.hint",
		create: () => {
			let e = [
				$a($(6, 40, 55, 300)),
				Qa($(6, 348, 55, 108), Z("seed.feature.main")),
				eo($(6, 464, 14, 38), Z("seed.readMore"), { style: "secondary" }),
				$a($(66, 40, 28, 120)),
				Qa($(66, 164, 28, 60), Z("seed.feature.small1")),
				$a($(66, 244, 28, 120)),
				Qa($(66, 368, 28, 60), Z("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = go(40, t < 3 ? 0 : 1, t);
			}), _o("hovedoppslag", "540px", lo(uo("bg")), e);
		}
	}), e.sections.define("produkter", {
		label: "Produkter",
		labelKey: "preset.produkter.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre produktkort; pek Kjøp-knappen på en betalingslenke (f.eks. Vipps)",
		hintKey: "preset.produkter.hint",
		create: () => {
			let e = (e, t, n, r) => {
				let i = [
					$a($(e, 88, 25, 200)),
					Qa($(e, 296, 25, 76), Z("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					eo($(e + 5, 380, 15, 40), Z("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = go(88, t, n);
				}), i;
			};
			return _o("produkter", "470px", lo(uo("bg")), [
				Qa($(6, 28, 50, 38), Z("seed.products.title")),
				...e(6, 0, Z("seed.products.name"), Z("seed.products.price1")),
				...e(37.5, 1, Z("seed.products.name"), Z("seed.products.price2")),
				...e(69, 2, Z("seed.products.name"), Z("seed.products.price3"))
			]);
		},
		itemLabel: "produkt",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = ho(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				$a($(t, n, 25, 200)),
				Qa($(t, n + 208, 25, 76), Z("seed.products.card", {
					name: Z("seed.products.name"),
					price: Z("seed.products.price1")
				}), { align: "center" }),
				eo($(t + 5, n + 292, 15, 40), Z("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = go(88, r, t);
			}), {
				blocks: i,
				bottom: n + 356
			};
		}
	}), e.sections.define("cta", {
		label: "CTA-banner",
		labelKey: "preset.cta.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Full bredde med én tydelig handling",
		hintKey: "preset.cta.hint",
		create: () => _o("cta", "280px", lo(uo("surface"), fo(.5, .5, .3, .7)), [
			Qa($(20, 56, 60, 40), Z("seed.cta.title"), { align: "center" }),
			Qa($(25, 104, 50, 26), Z("seed.cta.sub"), { align: "center" }),
			eo($(42, 148, 16, 42), Z("seed.join"))
		])
	}), e.sections.define("sitat", {
		label: "Sitat",
		labelKey: "preset.sitat.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Stort sitat med attribusjon",
		hintKey: "preset.sitat.hint",
		create: () => _o("sitat", "300px", lo(uo("bg")), [oo($(20, 56, 60, 190), {
			text: Z("seed.sitat.text"),
			attribution: Z("seed.sitat.name"),
			role: Z("seed.sitat.role")
		})])
	}), e.sections.define("statistikk", {
		label: "Statistikk",
		labelKey: "preset.statistikk.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Tre store tall med etikett",
		hintKey: "preset.statistikk.hint",
		create: () => {
			let e = (e, t, n, r, i) => {
				let a = co($(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = go(76, t, 0), a;
			};
			return _o("statistikk", "260px", lo(uo("surface")), [
				e(6, 0, "120", "+", Z("seed.stats.l1")),
				e(37.5, 1, "25", "", Z("seed.stats.l2")),
				e(69, 2, "1981", "", Z("seed.stats.l3"))
			]);
		},
		itemLabel: "tall",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = ho(e, 3, 6, 31.5, 76, 140, 25, 120), i = co($(t, n, 25, 120), {
				value: "42",
				label: Z("seed.stats.newLabel")
			});
			return i.mobileOrder = go(76, r, 0), {
				blocks: [i],
				bottom: n + 148
			};
		}
	}), e.sections.define("sponsorer", {
		label: "Sponsorer",
		labelKey: "preset.sponsorer.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Logorad i gråtone med lenker",
		hintKey: "preset.sponsorer.hint",
		create: () => {
			let e = (e) => $a($(e, 108, 18.5, 100), {
				alt: Z("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return _o("sponsorer", "280px", lo(uo("bg")), [
				Qa($(6, 28, 60, 36), Z("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = ho(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [$a($(t, n, 18.5, 100), {
					alt: Z("seed.sponsors.alt"),
					fit: "contain",
					radius: null,
					saturate: 0
				})],
				bottom: n + 124
			};
		}
	}), e.sections.define("medlemskap", {
		label: "Medlemskap",
		labelKey: "preset.medlemskap.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Prisnivåer med fordeler og Vipps-linje",
		hintKey: "preset.medlemskap.hint",
		create: () => _o("medlemskap", "500px", lo(uo("surface")), [
			Qa($(6, 28, 50, 38), Z("seed.membership.title")),
			Qa($(14, 88, 32, 250), Z("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			Qa($(54, 88, 32, 250), Z("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			eo($(42, 358, 16, 42), Z("seed.join")),
			Qa($(25, 414, 50, 30), Z("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.6.11/maler-model.js
var yo = [
	"section",
	"blocks",
	"page"
];
function bo(e) {
	return ea(String(e ?? ""), "");
}
function xo(e, t, { id: n, title: r }) {
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
//#region ../template/assets/engine/0.6.11/preset-thumb.js
var So = /^#[0-9a-fA-F]{3,8}$/, Co = /^[a-z][a-z0-9-]*$/, wo = "#171c26", To = "#232a38", Eo = "#98a1b3", Do = "#7c5cff", Oo = (e, t) => `var(--urd-color-${e}, ${t})`;
function ko(e, t) {
	return typeof e == "string" ? So.test(e) ? e : Co.test(e) ? Oo(e, t) : t : t;
}
function Ao(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var jo = (e) => Math.round(e * 10) / 10, Mo = (e, t, n) => Math.min(n, Math.max(t, e)), No = (e, t, n, r, i, a = "") => `<rect x="${jo(e)}" y="${jo(t)}" width="${jo(Math.max(n, 1))}" height="${jo(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Po(e) {
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return ko(t.props?.value, wo);
		if (t.type === "gradient") return ko(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, wo);
	}
	return Oo("bg", wo);
}
function Fo(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Oo("text", Eo), c = [], l = [
		.72,
		.9,
		.5
	], u = t + 1;
	for (let i = 0; i < 3; i++) {
		let d = i === 0 && a ? 4 : 2.2;
		if (u + d > t + r) break;
		let f = n * l[i], p = o ? e + (n - f) / 2 : e;
		c.push(No(p, u, f, d, s, ` opacity="${i === 0 ? .8 : .4}" rx="1"`)), u += d + 2.4;
	}
	return c.join("");
}
function Io(e, t, n, r) {
	let i = Oo("text", Eo), a = [No(e, t, n, r, Oo("surface", To), " rx=\"1.5\"")], o = (t) => jo(e + n * t), s = (e) => jo(t + r * e);
	return a.push(`<polygon points="${o(.08)},${s(.9)} ${o(.42)},${s(.38)} ${o(.62)},${s(.68)} ${o(.75)},${s(.5)} ${o(.92)},${s(.9)}" fill="${i}" opacity="0.4"/>`), a.push(`<circle cx="${o(.28)}" cy="${s(.26)}" r="${jo(Math.max(1, Math.min(n, r) * .1))}" fill="${i}" opacity="0.5"/>`), a.join("");
}
function Lo(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) o.push(Io(e + n * (a + i), t, a, r));
	return o.join("");
}
function Ro(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(No(s, t, a, r * .55, Oo("surface", To), " rx=\"1.5\"")), o.push(No(s, t + r * .62, a * .8, 2, Oo("text", Eo), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function zo(e, t, n, r, i) {
	let a = ko(i?.color, Do), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${jo(e + n / 2)}" cy="${jo(t + r / 2)}" rx="${jo(Math.max(n / 2, 1))}" ry="${jo(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${jo(e)},${jo(t + r)} ${jo(e + n / 2)},${jo(t)} ${jo(e + n)},${jo(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? No(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : No(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function Bo(e, t, n, r, i, a) {
	if (e === "text") return Fo(t, n, r, i, a);
	if (e === "image") return Io(t, n, r, i);
	if (e === "galleri") return Lo(t, n, r, i);
	if (e === "samling") return Ro(t, n, r, i);
	if (e === "shape") return zo(t, n, r, i, a);
	if (e === "button") return No(t, n, r, i, Oo("accent", Do), ` rx="${jo(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${jo(t + r / 2)}" cy="${jo(n + i / 2)}" r="${jo(e)}" fill="${Oo("accent", Do)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [No(t, n, r, i, Oo("surface", To), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${jo(a - s / 2)},${jo(o - s)} ${jo(a - s / 2)},${jo(o + s)} ${jo(a + s)},${jo(o)}" fill="${Oo("text", Eo)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "tidslinje") {
		let e = [No(t + 1, n, 1.4, i, Oo("accent", Do), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${jo(t + 1.7)}" cy="${jo(o)}" r="1.6" fill="${Oo("accent", Do)}"/>`), e.push(No(t + 5, o - 1, r * .5, 2, Oo("text", Eo), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	return e === "sitat" ? [
		`<text x="${jo(t + r / 2)}" y="${jo(n + i * .34)}" text-anchor="middle" font-size="${jo(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Oo("accent", Do)}">“</text>`,
		No(t + r * .15, n + i * .48, r * .7, 2, Oo("text", Eo), " opacity=\"0.6\" rx=\"1\""),
		No(t + r * .25, n + i * .62, r * .5, 2, Oo("text", Eo), " opacity=\"0.6\" rx=\"1\""),
		No(t + r * .35, n + i * .82, r * .3, 1.6, Oo("text", Eo), " opacity=\"0.35\" rx=\"0.8\"")
	].join("") : e === "statistikk" ? [No(t + r * .28, n + i * .15, r * .44, i * .42, Oo("accent", Do), " opacity=\"0.85\" rx=\"1\""), No(t + r * .32, n + i * .72, r * .36, 1.6, Oo("text", Eo), " opacity=\"0.4\" rx=\"0.8\"")].join("") : No(t, n, r, i, Oo("surface", To), " rx=\"1.5\"");
}
function Vo(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Ao(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [No(0, 0, t, n, Po(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${jo(Mo(e.x ?? .5, 0, 1) * t)}" cy="${jo(Mo(e.y ?? .3, 0, 1) * n)}" r="${jo(t * Mo(e.radius ?? .5, .1, 1) * .5)}" fill="${ko(e.color, Do)}" opacity="${jo(Mo(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Mo((r.x ?? 0) * (t / 100), 0, t - 2), s = Mo((r.y ?? 0) * a, 0, n - 2), c = Mo((r.w ?? 10) * (t / 100), 2, t - i), l = Mo((r.h ?? 20) * a, 2, n - s);
		o.push(Bo(e.type, i, s, c, l, e.props));
	}
	return o.join("");
}
function Ho(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${No(0, 0, t, n, Oo("bg", wo))}</svg>`;
	let a = i.map((e) => Mo(Ao(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${jo(l)})">${Vo(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/page-presets.js
var Uo = /* @__PURE__ */ new Map();
vo({ sections: { define: (e, t) => Uo.set(e, t) } });
var Wo = [
	{
		id: "landing",
		labelKey: "pageTemplate.landing",
		sections: [
			"hero",
			"funksjonskort",
			"statistikk",
			"sitat",
			"cta"
		]
	},
	{
		id: "om-oss",
		labelKey: "pageTemplate.about",
		sections: [
			"hero-sentrert",
			"team",
			"tidslinje",
			"sponsorer",
			"cta"
		]
	},
	{
		id: "kontakt",
		labelKey: "pageTemplate.contact",
		sections: [
			"hero-sentrert",
			"kontakt",
			"faq"
		]
	},
	{
		id: "portefolje",
		labelKey: "pageTemplate.portfolio",
		sections: [
			"hero-sentrert",
			"galleri",
			"sitat",
			"cta"
		]
	},
	{
		id: "arrangement",
		labelKey: "pageTemplate.event",
		sections: [
			"hovedoppslag",
			"arrangementer",
			"steg",
			"faq",
			"cta"
		]
	}
];
function Go(e, { pageId: t, title: n }) {
	let r = Wo.find((t) => t.id === e);
	return r ? {
		schemaVersion: 2,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => Uo.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.6.11/palette-search.js
function Ko(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function qo(e, t) {
	let n = Ko(t).trim(), r = Ko(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function Jo(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: qo(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.11/theme.js
function Yo(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var Xo = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function Zo(e) {
	return typeof e == "string" && Xo.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function Qo(e) {
	let t = e.tokens || {}, n = Yo(e, "light"), r = Yo(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			Zo(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && Zo(u) && Zo(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && Zo(u) && Zo(d) && s.push({
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
function $o(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var es = {
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
	},
	dus: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 12%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 8%, var(--urd-base-surface))"
	},
	dempet: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-text) 5%, var(--urd-base-bg))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-text) 10%, var(--urd-base-bg))",
		"--urd-color-text": "color-mix(in srgb, var(--urd-base-text) 82%, var(--urd-base-bg))"
	},
	dyp: {
		"--urd-color-bg": "color-mix(in srgb, var(--urd-base-accent) 30%, var(--urd-base-text))",
		"--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 40%, var(--urd-base-text))",
		"--urd-color-text": "var(--urd-base-bg)"
	},
	uthevet: { "--urd-color-surface": "color-mix(in srgb, var(--urd-base-accent) 14%, var(--urd-base-surface))" }
}, ts = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers",
	dus: "sectionTheme.dus",
	dempet: "sectionTheme.dempet",
	dyp: "sectionTheme.dyp",
	uthevet: "sectionTheme.uthevet"
};
[...new Set(Object.values(es).flatMap(Object.keys))];
function ns(e) {
	return es[e] ?? {};
}
function rs(e) {
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
function is(e, t) {
	let n = rs(e), r = rs(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/color.js
var as = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = $o(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, os = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function ss(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function cs(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function ls(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function us(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${$o(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function ds(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (os[t] ?? []).includes(e.animation) ? e.animation : null, r = ss(e.stops), i = r.map((e) => `${$o(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: cs(r),
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
var fs = /* @__PURE__ */ new Set(), ps = !1;
function ms(e) {
	fs.add(e), !(ps || typeof window > "u") && (ps = !0, window.addEventListener("resize", () => {
		for (let e of [...fs]) e() || fs.delete(e);
	}));
}
var hs = !1;
function gs() {
	if (!hs) {
		hs = !0;
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
var _s = {
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
		let n = ds(t);
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
					let e = ls(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = us(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), ms(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && gs());
	}
}, vs = {
	version: 1,
	label: "Glød",
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
		let n = $o(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, ys = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", bs = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = ys, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, xs = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function Ss(e) {
	return typeof e == "string" && xs.test(e);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/image.js
var Cs = .4;
function ws(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function Ts(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function Es(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function Ds(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * Cs * t;
	return Math.round(Math.min(i, r * e));
}
function Os(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * Cs, s = i ?? Ds(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var ks = /* @__PURE__ */ new Set(), As = !1, js = 0;
function Ms() {
	js = 0;
	for (let e of [...ks]) e() || ks.delete(e);
}
function Ns() {
	js ||= requestAnimationFrame(Ms);
}
function Ps(e) {
	ks.add(e), e(), !(As || typeof window > "u") && (As = !0, window.addEventListener("scroll", Ns, { passive: !0 }), window.addEventListener("resize", Ns, { passive: !0 }));
}
function Fs(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = Ds(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = Os(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Ps(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Is() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Ls = /* @__PURE__ */ new Set(), Rs = !1, zs = 0;
function Bs() {
	zs = 0;
	for (let e of [...Ls]) e() || Ls.delete(e);
}
function Vs() {
	!zs && typeof requestAnimationFrame == "function" && (zs = requestAnimationFrame(Bs));
}
function Hs(e) {
	Ls.add(e), e(), !(Rs || typeof window > "u") && (Rs = !0, window.addEventListener("resize", Vs, { passive: !0 }));
}
function Us(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = Ds(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	Hs(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var Ws = {
	version: 1,
	label: "Bilde",
	labelKey: "bgLayer.image",
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
	migrations: {},
	render(e, t) {
		if (!Ss(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = Es(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = Ts(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = ws(t.x, t.y);
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
			Is() ? Us(n, t.parallax, i, e) : Fs(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/0.6.11/galleri-model.js
function Gs(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function Ks({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function qs(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/bildegalleri.js
var Js = {
	version: 1,
	label: "Bildegalleri",
	labelKey: "bgLayer.bildegalleri",
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
		let n = (t.images ?? []).filter((e) => Ss(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = Ts(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = ws(n.x, n.y);
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
		if (!Ks({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(qs(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = Gs(l, 1, n.length), r = new Image();
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
//#region ../template/assets/engine/0.6.11/footer-thumb.js
function Ys(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += Xs(n, e.baselineLinks), o + "</svg>";
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
	return o += Xs(n, e.baselineLinks), o + "</svg>";
}
function Xs(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/animations/core.js
var Zs = () => ({
	duration: 600,
	delay: 0
}), Qs = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: Zs,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: Zs,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: Zs,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		labelKey: "anim.hoverLift",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	},
	stagger: {
		version: 1,
		label: "Stagger (kortgruppe)",
		labelKey: "anim.stagger",
		entrance: !0,
		group: !0,
		defaults: () => ({
			duration: 600,
			delay: 0,
			step: 90,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, $s = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/0.6.11/place.js
function ec(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var tc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), nc = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), rc = /* @__PURE__ */ U("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), ic = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ac = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), oc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), sc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), cc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), lc = /* @__PURE__ */ U("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), uc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), dc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), fc = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), pc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), mc = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), hc = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), gc = /* @__PURE__ */ U("<input class=\"nav-target svelte-1n46o8q\"/>"), _c = /* @__PURE__ */ U("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), vc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label>"), yc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), bc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), xc = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Sc = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Cc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), wc = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Tc = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Ec = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Dc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Oc = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/>"), kc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Ac = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), jc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Mc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Nc = /* @__PURE__ */ U("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Pc = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button>"), Fc = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Ic = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Lc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Rc = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), zc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Bc = /* @__PURE__ */ U("<p> </p>"), Vc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Hc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), Uc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), Wc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Gc = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Kc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), qc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Jc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Yc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Xc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Zc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Qc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), $c = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), el = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), tl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), nl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), rl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), il = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), al = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), ol = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), sl = /* @__PURE__ */ U("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), cl = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), ll = /* @__PURE__ */ U("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), ul = /* @__PURE__ */ U("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), dl = /* @__PURE__ */ U("<button><!> </button>"), fl = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"></div>"), pl = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), ml = /* @__PURE__ */ U("<button></button>"), hl = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), gl = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), _l = /* @__PURE__ */ U("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), vl = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), yl = /* @__PURE__ */ U("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), bl = /* @__PURE__ */ U("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), xl = /* @__PURE__ */ U("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), Sl = /* @__PURE__ */ U("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), Cl = /* @__PURE__ */ U("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), wl = /* @__PURE__ */ U("<span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span>", 1), Tl = /* @__PURE__ */ U("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), El = /* @__PURE__ */ U("<span class=\"who svelte-1n46o8q\"><!> </span>"), Dl = /* @__PURE__ */ U("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Ol = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), kl = /* @__PURE__ */ U("<button> </button>"), Al = /* @__PURE__ */ U("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), jl = /* @__PURE__ */ U("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), Ml = /* @__PURE__ */ U("<span class=\"page-path svelte-1n46o8q\">/</span>"), Nl = /* @__PURE__ */ U("<input class=\"page-slug svelte-1n46o8q\"/>"), Pl = /* @__PURE__ */ U("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), Fl = /* @__PURE__ */ U("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Il = /* @__PURE__ */ U("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Ll = /* @__PURE__ */ U("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div>"), Rl = /* @__PURE__ */ U("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button> <button class=\"page-mal-del svelte-1n46o8q\"></button></div>"), zl = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"></div>", 1), Bl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"><div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), Vl = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Hl = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), Ul = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Wl = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Gl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Kl = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), ql = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Jl = /* @__PURE__ */ U("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), Yl = /* @__PURE__ */ U("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), Xl = /* @__PURE__ */ U("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), Zl = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Ql = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), $l = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), eu = /* @__PURE__ */ U("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), tu = /* @__PURE__ */ U("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), nu = /* @__PURE__ */ U("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), ru = /* @__PURE__ */ U("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), iu = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span>"), au = /* @__PURE__ */ U("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), ou = /* @__PURE__ */ U("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), su = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), cu = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), lu = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), uu = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), du = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), fu = /* @__PURE__ */ U("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), pu = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), mu = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), hu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), gu = /* @__PURE__ */ U("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), _u = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), vu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), yu = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), bu = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), xu = /* @__PURE__ */ U("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Su = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Cu = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), wu = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Tu = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), Eu = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Du = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Ou = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), ku = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Au = /* @__PURE__ */ U("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), ju = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Mu = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), Nu = /* @__PURE__ */ U("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Pu = /* @__PURE__ */ U("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Fu = /* @__PURE__ */ U("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), Iu = /* @__PURE__ */ U("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Lu = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Ru = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), zu = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Bu = /* @__PURE__ */ U("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Vu = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Hu = /* @__PURE__ */ U("<!> <!>", 1), Uu = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Wu = /* @__PURE__ */ U("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), Gu = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Ku = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), qu = /* @__PURE__ */ U("<span class=\"chip svelte-1n46o8q\"> </span>"), Ju = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), Yu = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), Xu = /* @__PURE__ */ U("<span class=\"update-warn svelte-1n46o8q\"></span>"), Zu = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Qu = /* @__PURE__ */ U("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), $u = /* @__PURE__ */ U("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), ed = /* @__PURE__ */ U("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), td = /* @__PURE__ */ U("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), nd = /* @__PURE__ */ U("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!>", 1), rd = /* @__PURE__ */ U("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), id = /* @__PURE__ */ U("<p class=\"loading svelte-1n46o8q\"> </p>"), ad = /* @__PURE__ */ U("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), od = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), sd = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), cd = /* @__PURE__ */ U("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), ld = /* @__PURE__ */ U("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), ud = /* @__PURE__ */ U("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function dd(e, t) {
	We(t, !0);
	let n = (e, t = d, n = d) => {
		var r = hc(), i = R(r);
		Vr(i, 17, n, Lr, (e, r, i) => {
			var a = mc(), s = L(a), l = L(s);
			{
				let e = /* @__PURE__ */ N(() => Z("tip.bg.changeType")), n = /* @__PURE__ */ N(() => o.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
				Q(l, {
					get value() {
						return V(r).type;
					},
					get title() {
						return V(e);
					},
					get options() {
						return V(n);
					},
					onchange: (e) => zn(t(), i, e)
				});
			}
			var u = z(l, 2), d = L(u);
			d.disabled = i === 0, q(d, () => c.up, !0), j(d);
			var f = z(d, 2);
			q(f, () => c.down, !0), j(f);
			var p = z(f, 2);
			q(p, () => c.cross, !0), j(p), j(u), j(s);
			var m = z(s, 2), h = (e) => {
				var n = tc(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(Qn), n = /* @__PURE__ */ N(() => Z("tip.bg.layerColor"));
					Ui(s, {
						get value() {
							return V(r).props.value;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => Sn(t(), i, "value", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				J(f), B((e, t, n) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(d, `${n ?? ""}%`), Y(f, V(r).props.opacity ?? 1);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100)
				]), H("input", f, (e) => Sn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ N(() => On(V(r))), a = /* @__PURE__ */ N(() => V(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = oc(), s = R(o), l = L(s), u = z(l);
				{
					let e = /* @__PURE__ */ N(() => V(n).kind ?? "linear"), r = /* @__PURE__ */ N(() => [["linear", Z("opt.grad.linear")], ["radial", Z("opt.grad.radial")]]);
					Q(u, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => Mn(t(), i, e)
					});
				}
				j(s);
				var d = z(s, 2);
				Vr(d, 17, () => V(n).stops, Lr, (e, r, o) => {
					var s = rc();
					let l;
					var u = L(s), d = z(u, 2);
					{
						let e = /* @__PURE__ */ N(Qn), n = /* @__PURE__ */ N(() => Z("tip.bg.stopColor"));
						Ui(d, {
							get value() {
								return V(r).color;
							},
							get tokens() {
								return V(e);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => Nn(t(), i, o, { color: e })
						});
					}
					var f = z(d, 2);
					J(f);
					var p = z(f, 2), m = L(p);
					j(p);
					var h = z(p, 2), g = (e) => {
						var n = nc();
						q(n, () => c.cross, !0), j(n), B((e) => X(n, "title", e), [() => Z("tip.bg.removeStop")]), H("click", n, () => Fn(t(), i, o)), W(e, n);
					};
					K(h, (e) => {
						V(n).stops.length > 2 && e(g);
					}), j(s), B((e, t, a) => {
						l = Qr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: V(Ln)?.layer === i && V(Ln).from === o,
							"drop-above": V(Ln)?.layer === i && V(Ln).insert === o,
							"drop-below": V(Ln)?.layer === i && V(Ln).insert === V(n).stops.length && o === V(n).stops.length - 1
						}), X(u, "title", e), Y(f, V(r).share ?? 50), X(f, "title", t), G(m, `${a ?? ""}%`);
					}, [
						() => Z("tip.bg.dragStop"),
						() => Z("tip.bg.stopShare"),
						() => V(a) > 0 ? Math.round(Math.max(0, Number(V(r).share) || 0) / V(a) * 100) : Math.round(100 / V(n).stops.length)
					]), H("pointerdown", u, (e) => Rn(t(), e, i, o)), H("input", f, (e) => Nn(t(), i, o, { share: Number(e.target.value) })), W(e, s);
				});
				var f = z(d, 2), p = L(f, !0);
				j(f);
				var m = z(f, 2), h = (e) => {
					var r = ic(), a = R(r), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					J(l);
					var u = z(l, 2), d = L(u), f = z(d), p = L(f);
					j(f), j(u);
					var m = z(u, 2);
					J(m), B((e, t, r, i) => {
						G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), Y(l, V(n).x ?? .5), G(d, `${r ?? ""} `), G(p, `${i ?? ""}%`), Y(m, V(n).y ?? .5);
					}, [
						() => Z("lbl.centerX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Z("lbl.centerY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("input", l, (e) => An(t(), i, "x", Number(e.target.value))), H("input", m, (e) => An(t(), i, "y", Number(e.target.value))), W(e, r);
				}, g = (e) => {
					var r = ac(), a = R(r), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					J(l), B((e) => {
						G(o, `${e ?? ""} `), G(c, `${V(n).angle ?? ""}°`), Y(l, V(n).angle);
					}, [() => Z("lbl.angle")]), H("input", l, (e) => An(t(), i, "angle", Number(e.target.value))), W(e, r);
				};
				K(m, (e) => {
					(V(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = z(m, 2), v = L(_), y = z(v), b = L(y);
				j(y), j(_);
				var x = z(_, 2);
				J(x);
				var S = z(x, 2), C = L(S), w = z(C);
				{
					let e = /* @__PURE__ */ N(() => V(n).animation ?? "none");
					Q(w, {
						get value() {
							return V(e);
						},
						get options() {
							return jn[(V(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => An(t(), i, "animation", e)
					});
				}
				j(S), B((e, t, r, i, a, o, s) => {
					G(l, `${e ?? ""} `), X(f, "title", t), G(p, r), G(v, `${i ?? ""} `), G(b, `${a ?? ""}%`), Y(x, V(n).opacity ?? 1), X(S, "title", o), G(C, `${s ?? ""} `);
				}, [
					() => Z("blocks.shape"),
					() => Z("tip.bg.addStop"),
					() => Z("ui.addStop"),
					() => Z("lbl.strength"),
					() => Math.round((V(n).opacity ?? 1) * 100),
					() => Z("tip.bg.motion"),
					() => Z("lbl.motion")
				]), H("click", f, () => Pn(t(), i)), H("input", x, (e) => An(t(), i, "opacity", Number(e.target.value))), W(e, o);
			}, _ = (e) => {
				var n = sc(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(Qn), n = /* @__PURE__ */ N(() => Z("tip.bg.glowColor"));
					Ui(s, {
						get value() {
							return V(r).props.color;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => Sn(t(), i, "color", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				J(f);
				var p = z(f, 2), m = L(p), h = z(m), g = L(h);
				j(h), j(p);
				var _ = z(p, 2);
				J(_);
				var v = z(_, 2), y = L(v), b = z(y), x = L(b);
				j(b), j(v);
				var S = z(v, 2);
				J(S);
				var C = z(S, 2), w = L(C), T = z(w), ee = L(T);
				j(T), j(C);
				var E = z(C, 2);
				J(E), B((e, t, n, i, a, s, c, u, p) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(d, `${n ?? ""}%`), Y(f, V(r).props.x), G(m, `${i ?? ""} `), G(g, `${a ?? ""}%`), Y(_, V(r).props.y), G(y, `${s ?? ""} `), G(x, `${c ?? ""}%`), Y(S, V(r).props.radius), G(w, `${u ?? ""} `), G(ee, `${p ?? ""}%`), Y(E, V(r).props.opacity);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.posX"),
					() => Math.round(V(r).props.x * 100),
					() => Z("lbl.posY"),
					() => Math.round(V(r).props.y * 100),
					() => Z("lbl.size"),
					() => Math.round(V(r).props.radius * 100),
					() => Z("lbl.strength"),
					() => Math.round(V(r).props.opacity * 100)
				]), H("input", f, (e) => Sn(t(), i, "x", Number(e.target.value))), H("input", _, (e) => Sn(t(), i, "y", Number(e.target.value))), H("input", S, (e) => Sn(t(), i, "radius", Number(e.target.value))), H("input", E, (e) => Sn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, v = (e) => {
				var n = cc(), a = R(n), o = L(a), s = z(o), c = L(s);
				j(s), j(a);
				var l = z(a, 2);
				J(l), B((e, t) => {
					G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), Y(l, V(r).props.opacity);
				}, [() => Z("lbl.strength"), () => Math.round(V(r).props.opacity * 100)]), H("input", l, (e) => Sn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ N(() => V(r).props.fit === "flislegg" || V(r).props.fit === "repeat");
				var a = dc(), o = R(a), s = L(o), c = z(s);
				j(o);
				var l = z(o, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ N(() => V(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ N(() => [["vanlig", Z("opt.img.plain")], ["flislegg", Z("opt.img.tile")]]);
					Q(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => Sn(t(), i, "fit", e)
					});
				}
				j(l);
				var f = z(l, 2), p = L(f, !0);
				j(f);
				var m = z(f, 2), h = L(m), g = z(h, 2);
				J(g);
				var _ = z(g, 4);
				j(m);
				var v = z(m, 2), y = (e) => {
					var n = lc(), a = R(n), o = L(a), s = L(o, !0);
					j(o);
					var c = z(o, 2), l = L(c, !0);
					j(c), j(a);
					var u = z(a, 2), d = L(u, !0);
					j(u);
					var f = z(u, 2), p = z(f, 2), m = L(p), h = z(m), g = L(h);
					j(h), j(p);
					var _ = z(p, 2);
					J(_);
					var v = z(_, 2), y = L(v), b = z(y), x = L(b);
					j(b), j(v);
					var S = z(v, 2);
					J(S), B((e, t, n, i, a, p, h, v, b, C, w, T) => {
						X(o, "title", e), G(s, t), X(c, "title", n), G(l, i), X(u, "title", a), G(d, p), ei(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), G(m, `${b ?? ""} `), G(g, `${C ?? ""}%`), Y(_, V(r).props.x ?? .5), G(y, `${w ?? ""} `), G(x, `${T ?? ""}%`), Y(S, V(r).props.y ?? .5);
					}, [
						() => Z("tip.bg.cover"),
						() => Z("ui.cover"),
						() => Z("opt.fitFrame.contain"),
						() => Z("opt.fit.contain"),
						() => Z("tip.bg.position"),
						() => Z("lbl.position"),
						() => Math.max(0, Math.min(1, V(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, V(r).props.y ?? .5)) * 100,
						() => Z("lbl.horizontal"),
						() => Math.round((V(r).props.x ?? .5) * 100),
						() => Z("lbl.vertical"),
						() => Math.round((V(r).props.y ?? .5) * 100)
					]), H("click", o, () => Dn(t(), i, V(r), "cover")), H("click", c, () => Dn(t(), i, V(r), "contain")), H("pointerdown", f, (e) => Cn(e, t(), i, "xy")), H("input", _, (e) => Sn(t(), i, "x", Number(e.target.value))), H("input", S, (e) => Sn(t(), i, "y", Number(e.target.value))), W(e, n);
				};
				K(v, (e) => {
					V(n) || e(y);
				});
				var b = z(v, 2), x = L(b), S = z(x), C = L(S);
				j(S), j(b);
				var w = z(b, 2);
				J(w);
				var T = z(w, 2), ee = L(T), E = z(ee), te = L(E);
				j(E), j(T);
				var ne = z(T, 2);
				J(ne);
				var re = z(ne, 2), ie = L(re);
				J(ie);
				var ae = z(ie);
				j(re);
				var oe = z(re, 2), se = (e) => {
					var n = uc(), a = R(n), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					J(l);
					var u = z(l, 2), d = L(u), f = z(d);
					{
						let e = /* @__PURE__ */ N(() => V(r).props.bleed ?? "none"), n = /* @__PURE__ */ N(() => [
							["none", Z("common.none")],
							["up", Z("opt.bleed.up")],
							["down", Z("opt.bleed.down")],
							["both", Z("opt.brand.both")]
						]);
						Q(f, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => Sn(t(), i, "bleed", e)
						});
					}
					j(u), B((e, t, n, i) => {
						G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), Y(l, V(r).props.parallax ?? .3), X(u, "title", n), G(d, `${i ?? ""} `);
					}, [
						() => Z("lbl.parallaxStrength"),
						() => Math.round((V(r).props.parallax ?? 0) * 100),
						() => Z("tip.bg.bleed"),
						() => Z("lbl.bleed")
					]), H("input", l, (e) => Sn(t(), i, "parallax", Number(e.target.value))), W(e, n);
				};
				K(oe, (e) => {
					(V(r).props.parallax ?? 0) > 0 && e(se);
				}), B((e, t, n, i, a, c, d, m, v, y, b, S, T, E) => {
					X(o, "title", e), G(s, `${t ?? ""} `), X(l, "title", n), G(u, `${i ?? ""} `), X(f, "title", a), G(p, c), X(h, "title", d), Y(g, m), X(_, "title", v), G(x, `${y ?? ""} `), G(C, `${V(r).props.blur ?? 0 ?? ""} px`), Y(w, V(r).props.blur ?? 0), G(ee, `${b ?? ""} `), G(te, `${S ?? ""}%`), Y(ne, V(r).props.opacity ?? 1), X(re, "title", T), ai(ie, (V(r).props.parallax ?? 0) > 0), G(ae, ` ${E ?? ""}`);
				}, [
					() => Z("tip.webpAuto"),
					() => V(r).props.src ? Z("ui.changeImage") : Z("ui.chooseImage"),
					() => Z("tip.bg.fit"),
					() => Z("lbl.fit"),
					() => Z("tip.bg.size"),
					() => Z("lbl.size"),
					() => Z("tip.smaller"),
					() => Math.round((V(r).props.size ?? 1) * 100),
					() => Z("tip.larger"),
					() => Z("lbl.blur"),
					() => Z("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Z("tip.bg.parallax"),
					() => Z("lbl.parallax")
				]), H("change", c, (e) => Un(t(), i, e)), H("click", h, () => Tn(t(), i, V(r).props.size ?? 1, -.05)), H("change", g, (e) => En(t(), i, e.target.value)), H("click", _, () => Tn(t(), i, V(r).props.size ?? 1, .05)), H("input", w, (e) => Sn(t(), i, "blur", Number(e.target.value))), H("input", ne, (e) => Sn(t(), i, "opacity", Number(e.target.value))), H("change", ie, (e) => Sn(t(), i, "parallax", e.target.checked ? .3 : 0)), W(e, a);
			}, b = (e) => {
				var n = pc(), a = R(n), o = L(a), s = z(o);
				j(a);
				var l = z(a, 2);
				Vr(l, 17, () => V(r).props.images ?? [], Lr, (e, n, a) => {
					var o = fc(), s = R(o), l = L(s), u = z(l, 2), d = L(u);
					d.disabled = a === 0, q(d, () => c.up, !0), j(d);
					var f = z(d, 2);
					q(f, () => c.down, !0), j(f);
					var p = z(f, 2);
					q(p, () => c.cross, !0), j(p), j(u), j(s);
					var m = z(s, 2), h = L(m), g = z(h), _ = L(g);
					j(g), j(m);
					var v = z(m, 2);
					J(v);
					var y = z(v, 2), b = L(y), x = z(b), S = L(x);
					j(x), j(y);
					var C = z(y, 2);
					J(C), B((e, t, i, o, s) => {
						X(l, "src", V(n).src), f.disabled = a === V(r).props.images.length - 1, X(p, "title", e), G(h, `${t ?? ""} `), G(_, `${i ?? ""}%`), Y(v, V(n).x ?? .5), G(b, `${o ?? ""} `), G(S, `${s ?? ""}%`), Y(C, V(n).y ?? .5);
					}, [
						() => Z("tip.removeImage"),
						() => Z("lbl.focusX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Z("lbl.focusY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("click", d, () => Gn(t(), i, a, -1)), H("click", f, () => Gn(t(), i, a, 1)), H("click", p, () => Kn(t(), i, a)), H("input", v, (e) => qn(t(), i, a, "x", Number(e.target.value))), H("input", C, (e) => qn(t(), i, a, "y", Number(e.target.value))), W(e, o);
				});
				var u = z(l, 2), d = L(u), f = z(d);
				{
					let e = /* @__PURE__ */ N(() => V(r).props.fit ?? "cover"), n = /* @__PURE__ */ N(() => [["cover", Z("opt.fit.cover")], ["contain", Z("opt.fit.contain")]]);
					Q(f, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => Sn(t(), i, "fit", e)
					});
				}
				j(u);
				var p = z(u, 2), m = L(p), h = z(m);
				J(h), j(p);
				var g = z(p, 2), _ = L(g), v = z(_), y = L(v);
				j(v), j(g);
				var b = z(g, 2);
				J(b);
				var x = z(b, 2), S = L(x), C = z(S), w = L(C);
				j(C), j(x);
				var T = z(x, 2);
				J(T);
				var ee = z(T, 2), E = L(ee), te = z(E), ne = L(te);
				j(te), j(ee);
				var re = z(ee, 2);
				J(re);
				var ie = z(re, 2), ae = L(ie, !0);
				j(ie), B((e, t, n, i, s, c, l, u, f, g, v) => {
					X(a, "title", e), G(o, `${t ?? ""} `), G(d, `${n ?? ""} `), X(p, "title", i), G(m, `${s ?? ""} `), Y(h, V(r).props.interval ?? 6), G(_, `${c ?? ""} `), G(y, `${l ?? ""} s`), Y(b, V(r).props.fade ?? 1.5), G(S, `${u ?? ""} `), G(w, `${V(r).props.blur ?? 0 ?? ""} px`), Y(T, V(r).props.blur ?? 0), G(E, `${f ?? ""} `), G(ne, `${g ?? ""}%`), Y(re, V(r).props.opacity ?? 1), G(ae, v);
				}, [
					() => Z("tip.bg.addImages"),
					() => Z("ui.addImages"),
					() => Z("lbl.fit"),
					() => Z("hint.bg.gallery"),
					() => Z("lbl.secondsPerImage"),
					() => Z("lbl.transition"),
					() => (V(r).props.fade ?? 1.5).toFixed(1),
					() => Z("lbl.blur"),
					() => Z("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100),
					() => Z("hint.bg.gallery")
				]), H("change", s, (e) => Wn(t(), i, e)), H("change", h, (e) => Sn(t(), i, "interval", Number(e.target.value))), H("input", b, (e) => Sn(t(), i, "fade", Number(e.target.value))), H("input", T, (e) => Sn(t(), i, "blur", Number(e.target.value))), H("input", re, (e) => Sn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			};
			K(m, (e) => {
				V(r).type === "color" ? e(h) : V(r).type === "gradient" ? e(g, 1) : V(r).type === "glow" ? e(_, 2) : V(r).type === "grain" ? e(v, 3) : V(r).type === "image" ? e(y, 4) : V(r).type === "bildegalleri" && e(b, 5);
			}), j(a), B((e, t, r) => {
				X(d, "title", e), X(f, "title", t), f.disabled = i === n().length - 1, X(p, "title", r);
			}, [
				() => Z("hint.bg.order"),
				() => Z("hint.bg.order"),
				() => Z("tip.bg.removeLayer")
			]), H("click", d, () => xn(t(), i, -1)), H("click", f, () => xn(t(), i, 1)), H("click", p, () => yn(t(), i)), W(e, a);
		});
		var a = z(i, 2), s = L(a), l = z(s);
		{
			let e = /* @__PURE__ */ N(() => o.map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label]));
			Q(l, {
				get value() {
					return V(_n);
				},
				get options() {
					return V(e);
				},
				onchange: (e) => I(_n, e, !0)
			});
		}
		j(a);
		var u = z(a, 2), f = L(u, !0);
		j(u), B((e, t) => {
			G(s, `${e ?? ""} `), G(f, t);
		}, [() => Z("lbl.newLayer"), () => Z("ui.addLayer")]), H("click", u, () => vn(t(), V(_n))), W(e, r);
	}, r = (e, t = d, n = d) => {
		var r = jr();
		Vr(R(r), 17, n, Lr, (e, r, i) => {
			var a = _c(), o = L(a);
			J(o);
			var s = z(o, 2), l = L(s);
			l.disabled = i === 0, q(l, () => c.up, !0), j(l);
			var u = z(l, 2);
			q(u, () => c.down, !0), j(u);
			var d = z(u, 2);
			q(d, () => c.cross, !0), j(d), j(s);
			var f = z(s, 2), p = L(f);
			{
				let e = /* @__PURE__ */ N(() => V(r).page ?? "__href"), n = /* @__PURE__ */ N(() => Z("tip.linkTarget")), a = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
				Q(p, {
					get value() {
						return V(e);
					},
					get title() {
						return V(n);
					},
					get options() {
						return V(a);
					},
					onchange: (e) => xs(t(), i, e)
				});
			}
			j(f);
			var m = z(f, 2), h = (e) => {
				var n = gc();
				J(n), B((e, t) => {
					Y(n, V(r).href ?? ""), X(n, "placeholder", e), X(n, "title", t);
				}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", n, (e) => Ss(t(), i, e.target.value)), W(e, n);
			};
			K(m, (e) => {
				V(r).page || e(h);
			}), j(a), B((e, t) => {
				Y(o, V(r).label), X(o, "title", e), u.disabled = i === n().length - 1, X(d, "title", t);
			}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), H("input", o, (e) => ys(t(), i, e.target.value)), H("click", l, () => gs(t(), i, -1)), H("click", u, () => gs(t(), i, 1)), H("click", d, () => hs(t(), i)), W(e, a);
		}), W(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ N(() => V(M).props.boxStyle ?? {});
		var n = bc(), r = R(n), i = L(r), a = z(i);
		{
			let e = /* @__PURE__ */ N(() => V(t).bg ?? ""), n = /* @__PURE__ */ N(Qn), r = /* @__PURE__ */ N(() => Z("tip.box.bg"));
			Ui(a, {
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
				onchange: (e) => Lt({ bg: e || null })
			});
		}
		j(r);
		var o = z(r, 2), s = L(o), c = z(s);
		{
			let e = /* @__PURE__ */ N(() => V(t).shadow ?? ""), n = /* @__PURE__ */ N(() => [
				["", Z("common.none")],
				["soft", Z("opt.shadow.soft")],
				["strong", Z("opt.shadow.strong")]
			]);
			Q(c, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => Lt({ shadow: e || null })
			});
		}
		j(o);
		var l = z(o, 2), u = (e) => {
			var n = vc(), r = L(n), i = z(r);
			{
				let e = /* @__PURE__ */ N(() => V(t).shadowColor ?? ""), n = /* @__PURE__ */ N(Qn), r = /* @__PURE__ */ N(() => Z("tip.box.shadowColor"));
				Ui(i, {
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
					onchange: (e) => Lt({ shadowColor: e || null })
				});
			}
			j(n), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.shadowColor")]), W(e, n);
		};
		K(l, (e) => {
			V(t).shadow && e(u);
		});
		var d = z(l, 2), f = L(d), p = z(f);
		{
			let e = /* @__PURE__ */ N(() => V(t).border === "none" ? "none" : V(t).border ? "custom" : ""), n = /* @__PURE__ */ N(() => [
				["", Z("opt.border.theme")],
				["none", Z("common.none")],
				["custom", Z("opt.border.custom")]
			]);
			Q(p, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => Lt({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		j(d);
		var m = z(d, 2), h = (e) => {
			let n = /* @__PURE__ */ N(() => typeof V(t).border == "object" ? V(t).border : {
				color: "text",
				width: 1
			});
			var r = yc(), i = R(r), a = L(i), o = z(a);
			{
				let e = /* @__PURE__ */ N(Qn), t = /* @__PURE__ */ N(() => Z("tip.box.borderColor"));
				Ui(o, {
					get value() {
						return V(n).color;
					},
					get tokens() {
						return V(e);
					},
					get label() {
						return V(t);
					},
					onchange: (e) => Lt({ border: {
						...V(n),
						color: e
					} })
				});
			}
			j(i);
			var s = z(i, 2), c = L(s), l = z(c), u = L(l), d = z(u, 2);
			J(d);
			var f = z(d, 2);
			j(l), j(s), B((e, t, r, i, o, s) => {
				G(a, `${e ?? ""} `), G(c, `${t ?? ""} `), X(u, "title", r), X(u, "aria-label", i), Y(d, V(n).width), X(f, "title", o), X(f, "aria-label", s);
			}, [
				() => Z("lbl.borderColor"),
				() => Z("lbl.thicknessPx"),
				() => Z("tip.thinner"),
				() => Z("tip.thinner"),
				() => Z("tip.thicker"),
				() => Z("tip.thicker")
			]), H("click", u, () => Lt({ border: {
				...V(n),
				width: Math.max(1, V(n).width - 1)
			} })), H("change", d, (e) => Lt({ border: {
				...V(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), H("click", f, () => Lt({ border: {
				...V(n),
				width: Math.min(12, V(n).width + 1)
			} })), W(e, r);
		};
		K(m, (e) => {
			V(t).border !== "none" && e(h);
		});
		var g = z(m, 2), _ = L(g);
		J(_);
		var v = z(_);
		j(g), B((e, t, n, r, a, o) => {
			G(i, `${e ?? ""} `), G(s, `${t ?? ""} `), G(f, `${n ?? ""} `), X(g, "title", r), ai(_, a), G(v, ` ${o ?? ""}`);
		}, [
			() => Z("lbl.blockColor"),
			() => Z("lbl.shadow"),
			() => Z("lbl.border"),
			() => Z("tip.box.glass"),
			() => !!V(t).glass,
			() => Z("lbl.glass")
		]), H("change", _, (e) => Lt({ glass: e.target.checked || null })), W(e, n);
	}, a = (e) => {
		var t = ll(), n = R(t), r = L(n), a = L(r);
		let o;
		var s = L(a, !0);
		j(a);
		var l = z(a, 2);
		let u;
		var d = L(l, !0);
		j(l), j(r), j(n);
		var f = z(n, 2), p = (e) => {
			var t = jr(), n = R(t), r = (e) => {
				var t = xc(), n = L(t, !0);
				j(t), B((e) => G(n, e), [() => Z("hint.textInline")]), W(e, t);
			}, i = (e) => {
				var t = Cc(), n = R(t), r = L(n);
				J(r);
				var i = z(r);
				j(n);
				var a = z(n, 2), o = L(a, !0);
				j(a);
				var s = z(a, 2);
				Vr(s, 17, () => V(M).props.items ?? [], Lr, (e, t, n) => {
					var r = Sc(), i = L(r);
					J(i);
					var a = z(i, 2), o = L(a);
					o.disabled = n === 0, q(o, () => c.up, !0), j(o);
					var s = z(o, 2);
					q(s, () => c.down, !0), j(s);
					var l = z(s, 2);
					q(l, () => c.cross, !0), j(l), j(a), j(r), B((e, r) => {
						Y(i, V(t).q), X(i, "title", e), s.disabled = n === (V(M).props.items?.length ?? 0) - 1, X(l, "title", r);
					}, [() => Z("tip.faq.question"), () => Z("tip.faq.remove")]), H("change", i, (e) => Rt(n, { q: e.target.value })), H("click", o, () => Vt(n, -1)), H("click", s, () => Vt(n, 1)), H("click", l, () => Bt(n)), W(e, r);
				});
				var l = z(s, 2), u = L(l, !0);
				j(l), B((e, t, a, s, c) => {
					X(n, "title", e), ai(r, t), G(i, ` ${a ?? ""}`), G(o, s), G(u, c);
				}, [
					() => Z("tip.faq.multi"),
					() => !!V(M).props.multi,
					() => Z("lbl.faqMulti"),
					() => Z("lbl.questions"),
					() => Z("ui.addQuestion")
				]), H("change", r, (e) => P("multi", e.target.checked)), H("click", l, zt), W(e, t);
			}, a = (e) => {
				var t = Tc(), n = R(t), r = L(n, !0);
				j(n);
				var i = z(n, 2);
				Vr(i, 17, () => V(M).props.items ?? [], Lr, (e, t, n) => {
					var r = wc(), i = R(r), a = L(i);
					J(a);
					var o = z(a, 2);
					J(o);
					var s = z(o, 2), l = L(s);
					l.disabled = n === 0, q(l, () => c.up, !0), j(l);
					var u = z(l, 2);
					q(u, () => c.down, !0), j(u);
					var d = z(u, 2);
					q(d, () => c.cross, !0), j(d), j(s), j(i);
					var f = z(i, 2);
					J(f), B((e, r, i, s, c, l) => {
						Y(a, V(t).year), X(a, "placeholder", e), X(a, "title", r), Y(o, V(t).title), X(o, "title", i), u.disabled = n === (V(M).props.items?.length ?? 0) - 1, X(d, "title", s), Y(f, V(t).text), X(f, "placeholder", c), X(f, "title", l);
					}, [
						() => Z("ph.tlYear"),
						() => Z("tip.tl.year"),
						() => Z("tip.tl.title"),
						() => Z("tip.tl.remove"),
						() => Z("ph.tlText"),
						() => Z("tip.tl.text")
					]), H("change", a, (e) => Ht(n, { year: e.target.value })), H("change", o, (e) => Ht(n, { title: e.target.value })), H("click", l, () => Gt(n, -1)), H("click", u, () => Gt(n, 1)), H("click", d, () => Wt(n)), H("change", f, (e) => Ht(n, { text: e.target.value })), W(e, r);
				});
				var a = z(i, 2), o = L(a, !0);
				j(a), B((e, t) => {
					G(r, e), G(o, t);
				}, [() => Z("lbl.tlItems"), () => Z("ui.addTlItem")]), H("click", a, Ut), W(e, t);
			}, o = (e) => {
				var t = Ec(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				J(u), j(c), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.text ?? ""), G(o, `${t ?? ""} `), Y(s, V(M).props.attribution ?? ""), G(l, `${n ?? ""} `), Y(u, V(M).props.role ?? "");
				}, [
					() => Z("lbl.sitatText"),
					() => Z("lbl.sitatName"),
					() => Z("lbl.sitatRole")
				]), H("change", i, (e) => P("text", e.target.value)), H("change", s, (e) => P("attribution", e.target.value)), H("change", u, (e) => P("role", e.target.value)), W(e, t);
			}, s = (e) => {
				var t = Dc(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				J(u), j(c);
				var d = z(c, 2), f = L(d), p = z(f);
				J(p), j(d), B((e, t, n, a, c) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.value ?? ""), X(i, "title", t), G(o, `${n ?? ""} `), Y(s, V(M).props.prefix ?? ""), G(l, `${a ?? ""} `), Y(u, V(M).props.suffix ?? ""), G(f, `${c ?? ""} `), Y(p, V(M).props.label ?? "");
				}, [
					() => Z("lbl.statValue"),
					() => Z("tip.stat.value"),
					() => Z("lbl.statPrefix"),
					() => Z("lbl.statSuffix"),
					() => Z("lbl.statLabel")
				]), H("change", i, (e) => P("value", e.target.value)), H("change", s, (e) => P("prefix", e.target.value)), H("change", u, (e) => P("suffix", e.target.value)), H("change", p, (e) => P("label", e.target.value)), W(e, t);
			}, l = (e) => {
				var t = kc(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.page ?? "__href"), t = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.externalLink")]]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							Ot(`edit:${V(M).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				j(a);
				var c = z(a, 2), l = (e) => {
					var t = Oc();
					J(t), B((e) => {
						X(t, "placeholder", e), Y(t, V(M).props.href === "#" ? "" : V(M).props.href ?? "");
					}, [() => Z("ph.url")]), H("change", t, (e) => P("href", e.target.value || null)), W(e, t);
				};
				K(c, (e) => {
					V(M).props.page || e(l);
				}), B((e, t) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.label), G(o, `${t ?? ""} `);
				}, [() => Z("blocks.text"), () => Z("lbl.goesTo")]), H("change", i, (e) => P("label", e.target.value)), W(e, t);
			}, u = (e) => {
				var t = jc(), n = R(t), r = L(n), i = z(r);
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				J(u), j(c);
				var d = z(c, 2), f = (e) => {
					var t = Ac(), n = L(t);
					J(n);
					var r = z(n);
					j(t), B((e, i, a) => {
						X(t, "title", e), ai(n, i), G(r, ` ${a ?? ""}`);
					}, [
						() => Z("tip.lightbox"),
						() => !!V(M).props.lightbox,
						() => Z("lbl.lightbox")
					]), H("change", n, (e) => P("lightbox", e.target.checked)), W(e, t);
				};
				K(d, (e) => {
					V(M).props.href || e(f);
				}), B((e, t, n, i, a) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), Y(s, V(M).props.alt ?? ""), X(s, "placeholder", n), G(l, `${i ?? ""} `), Y(u, V(M).props.href ?? ""), X(u, "placeholder", a);
				}, [
					() => Z("ui.changeImage"),
					() => Z("lbl.description"),
					() => Z("ph.altText"),
					() => Z("lbl.link"),
					() => Z("ph.optionalImageLink")
				]), H("change", i, Jt), H("change", s, (e) => P("alt", e.target.value)), H("change", u, (e) => P("href", e.target.value || null)), W(e, t);
			}, d = (e) => {
				var t = Mc(), n = R(t), r = L(n, !0);
				j(n);
				var i = z(n, 2);
				J(i);
				var a = z(i, 2), o = L(a), s = z(o);
				J(s), j(a), B((e, t, a, c) => {
					X(n, "title", e), G(r, t), Y(i, V(M).props.url ?? ""), X(i, "placeholder", a), G(o, `${c ?? ""} `), Y(s, V(M).props.title ?? "");
				}, [
					() => Z("hint.video"),
					() => Z("lbl.videoUrl"),
					() => Z("ph.videoUrl"),
					() => Z("lbl.videoTitle")
				]), H("change", i, (e) => P("url", e.target.value)), H("change", s, (e) => P("title", e.target.value)), W(e, t);
			}, f = (e) => {
				var t = Ic(), n = R(t), r = L(n), i = z(r), a = L(i);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.glyph ?? "★"), t = /* @__PURE__ */ N(() => V(M).props.icon ?? null), n = /* @__PURE__ */ N(() => V(M).props.image ?? null);
					xa(a, {
						get value() {
							return V(e);
						},
						get icon() {
							return V(t);
						},
						get image() {
							return V(n);
						},
						onpick: (e) => Ot(`edit:${V(M).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => Ot(`edit:${V(M).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => P("image", e)
					});
				}
				var o = z(a, 2), s = (e) => {
					var t = Nc();
					J(t), B((e) => {
						Y(t, V(M).props.glyph ?? ""), X(t, "title", e);
					}, [() => Z("tip.icon.typeGlyph")]), H("change", t, (e) => P("glyph", e.target.value || "★")), W(e, t);
				}, c = (e) => {
					var t = Pc(), n = L(t, !0);
					j(t), B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("tip.icon.backToGlyph"), () => Z("ui.removeDrawnIcon")]), H("click", t, () => P("icon", null)), W(e, t);
				};
				K(o, (e) => {
					V(M).props.icon ? e(c, -1) : e(s);
				}), j(i), j(n);
				var l = z(n, 2), u = (e) => {
					var t = Fc(), n = L(t), r = z(n, 2), i = L(r, !0);
					j(r), j(t), B((e, r, a) => {
						X(t, "title", e), X(n, "src", V(M).props.image), X(n, "alt", r), G(i, a);
					}, [
						() => Z("hint.icon.ownImage"),
						() => Z("gp.ownIcon"),
						() => Z("ui.removeOwnIcon")
					]), H("click", r, () => P("image", null)), W(e, t);
				};
				K(l, (e) => {
					V(M).props.image && e(u);
				}), B((e) => G(r, `${e ?? ""} `), [() => Z("blocks.icon")]), W(e, t);
			}, p = (e) => {
				var t = Lc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.collection ?? ""), t = /* @__PURE__ */ N(() => [["", Z("common.choose")], ...V(Ba).map((e) => [e, V(Va)[e]?.name ?? e])]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("collection", e || null)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c);
				J(l);
				var u = z(l);
				j(c), B((e, t, i, c, d) => {
					X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${c ?? ""} `), Y(s, V(M).props.limit ?? 6), ai(l, V(M).props.newestFirst !== !1), G(u, ` ${d ?? ""}`);
				}, [
					() => Z("tip.samling.source"),
					() => Z("blocks.samling"),
					() => Z("tip.samling.limit"),
					() => Z("lbl.maxCount"),
					() => Z("lbl.newestFirst")
				]), H("change", s, (e) => P("limit", Number(e.target.value))), H("change", l, (e) => P("newestFirst", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = zc(), n = R(t), r = L(n), i = z(r);
				j(n), Vr(z(n, 2), 17, () => V(M).props.images ?? [], Lr, (e, t, n) => {
					var r = Rc(), i = L(r), a = L(i), o = z(a, 2), s = L(o);
					s.disabled = n === 0, q(s, () => c.up, !0), j(s);
					var l = z(s, 2);
					q(l, () => c.down, !0), j(l);
					var u = z(l, 2);
					q(u, () => c.cross, !0), j(u), j(o), j(i);
					var d = z(i, 2), f = L(d), p = z(f);
					J(p), j(d);
					var m = z(d, 2), h = L(m), g = z(h);
					J(g), j(m), j(r), B((e, r, o, s, c, d) => {
						X(i, "title", e), X(a, "src", V(t).src), l.disabled = n === V(M).props.images.length - 1, X(u, "title", r), G(f, `${o ?? ""} `), Y(p, V(t).alt ?? ""), X(p, "placeholder", s), G(h, `${c ?? ""} `), Y(g, V(t).href ?? ""), X(g, "placeholder", d);
					}, [
						() => Z("hint.gallery"),
						() => Z("tip.removeImage"),
						() => Z("lbl.description"),
						() => Z("ph.altShort"),
						() => Z("lbl.link"),
						() => Z("ph.galleryHref")
					]), H("click", s, () => pf(n, -1)), H("click", l, () => pf(n, 1)), H("click", u, () => mf(n)), H("change", p, (e) => hf(n, "alt", e.target.value)), H("change", g, (e) => hf(n, "href", e.target.value || null)), W(e, r);
				}), B((e, t) => {
					X(n, "title", e), G(r, `${t ?? ""} `);
				}, [() => Z("tip.gallery.addImages"), () => Z("ui.addImages")]), H("change", i, df), W(e, t);
			}, h = (e) => {
				var t = vc(), n = L(t);
				Q(z(n), {
					get value() {
						return V(M).props.kind;
					},
					get options() {
						return Zt;
					},
					onchange: (e) => P("kind", e)
				}), j(t), B((e) => G(n, `${e ?? ""} `), [() => Z("blocks.shape")]), W(e, t);
			}, g = (e) => {
				let t = /* @__PURE__ */ N(() => V(tf).find((e) => e.type === V(M).type)?.fields ?? []);
				var n = jr(), r = R(n), i = (e) => {
					var n = jr();
					Vr(R(n), 17, () => V(t), (e) => e.key, (e, t) => {
						var n = jr(), r = R(n), i = (e) => {
							let n = /* @__PURE__ */ N(() => `${V(M).blockId}:${V(t).key}`);
							var r = Vc(), i = R(r), a = L(i), o = z(a);
							J(o), j(i);
							var s = z(i, 2), c = L(s, !0);
							j(s);
							var l = z(s, 2), u = (e) => {
								var t = Bc();
								let r;
								var i = L(t, !0);
								j(t), B(() => {
									r = Qr(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": jt[V(n)].err }), G(i, jt[V(n)].text);
								}), W(e, t);
							};
							K(l, (e) => {
								jt[V(n)] && e(u);
							}), B((e) => {
								G(a, `${V(t).label ?? ""} `), X(o, "placeholder", V(t).placeholder), Y(o, At[V(n)] ?? V(M).props[V(t).key] ?? ""), s.disabled = V(Mt), G(c, e);
							}, [() => Z("props.place.search")]), H("input", o, (e) => {
								At[V(n)] = e.target.value;
							}), H("keydown", o, (e) => {
								e.key === "Enter" && Ft(V(t));
							}), H("click", s, () => Ft(V(t))), W(e, r);
						}, a = (e) => {
							var n = Hc(), r = L(n), i = z(r);
							J(i), j(n), B(() => {
								G(r, `${V(t).label ?? ""} `), X(i, "min", V(t).min), X(i, "max", V(t).max), X(i, "step", V(t).step ?? 1), Y(i, V(M).props[V(t).key]);
							}), H("change", i, (e) => P(V(t).key, Pt(V(t), Number(e.target.value)))), W(e, n);
						}, o = (e) => {
							var n = Ac(), r = L(n);
							J(r);
							var i = z(r);
							j(n), B((e) => {
								ai(r, e), G(i, ` ${V(t).label ?? ""}`);
							}, [() => !!V(M).props[V(t).key]]), H("change", r, (e) => P(V(t).key, e.target.checked)), W(e, n);
						}, s = (e) => {
							var n = vc(), r = L(n), i = z(r);
							{
								let e = /* @__PURE__ */ N(() => (V(t).options ?? []).map((e) => [e.value, e.label]));
								Q(i, {
									get value() {
										return V(M).props[V(t).key];
									},
									get options() {
										return V(e);
									},
									onchange: (e) => P(V(t).key, e)
								});
							}
							j(n), B(() => G(r, `${V(t).label ?? ""} `)), W(e, n);
						}, c = (e) => {
							var n = Uc(), r = L(n), i = z(r);
							J(i), j(n), B(() => {
								G(r, `${V(t).label ?? ""} `), X(i, "placeholder", V(t).placeholder), Y(i, V(M).props[V(t).key] ?? "");
							}), H("change", i, (e) => P(V(t).key, e.target.value)), W(e, n);
						};
						K(r, (e) => {
							V(t).type === "place" ? e(i) : V(t).type === "number" ? e(a, 1) : V(t).type === "toggle" ? e(o, 2) : V(t).type === "select" ? e(s, 3) : e(c, -1);
						}), W(e, n);
					}), W(e, n);
				}, a = (e) => {
					var t = Pc(), n = L(t, !0);
					j(t), B((e, r) => {
						X(t, "title", e), G(n, r);
					}, [() => Z("hint.pluginBlock"), () => Z("ui.settings")]), H("click", t, () => O?.sendOpenConfig(V(M).blockId)), W(e, t);
				};
				K(r, (e) => {
					V(t).length ? e(i) : e(a, -1);
				}), W(e, n);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "faq" ? e(i, 1) : V(M).type === "tidslinje" ? e(a, 2) : V(M).type === "sitat" ? e(o, 3) : V(M).type === "statistikk" ? e(s, 4) : V(M).type === "button" ? e(l, 5) : V(M).type === "image" ? e(u, 6) : V(M).type === "video" ? e(d, 7) : V(M).type === "icon" ? e(f, 8) : V(M).type === "samling" ? e(p, 9) : V(M).type === "galleri" ? e(m, 10) : V(M).type === "shape" ? e(h, 11) : e(g, -1);
			}), W(e, t);
		}, m = (e) => {
			var t = cl(), n = R(t), r = (e) => {
				var t = Wc(), n = R(t), r = L(n), a = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.align ?? "left"), t = /* @__PURE__ */ N(() => [
						["left", Z("common.left")],
						["center", Z("common.center")],
						["right", Z("common.right")]
					]);
					Q(a, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("align", e)
					});
				}
				j(n);
				var o = z(n, 2), s = L(o);
				J(s);
				var c = z(s);
				j(o);
				var l = z(o, 2), u = (e) => {
					i(e);
				};
				K(l, (e) => {
					V(M).props.box && e(u);
				}), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), ai(s, t), G(c, ` ${n ?? ""}`);
				}, [
					() => Z("lbl.align"),
					() => !!V(M).props.box,
					() => Z("lbl.textBoxToggle")
				]), H("change", s, (e) => P("box", e.target.checked)), W(e, t);
			}, a = (e) => {
				var t = Gc(), n = R(t), r = L(n, !0);
				j(n);
				var a = z(n, 2);
				i(a), Ne(2), B((e) => G(r, e), [() => Z("lbl.cardStyle")]), W(e, t);
			}, o = (e) => {
				var t = Kc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.variant ?? "venstre"), t = /* @__PURE__ */ N(() => [["venstre", Z("opt.tl.venstre")], ["veksler", Z("opt.tl.veksler")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.marker ?? "fylt"), t = /* @__PURE__ */ N(() => [["fylt", Z("opt.tl.fylt")], ["ring", Z("opt.tl.ring")]]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("marker", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ N(Qn);
					Ui(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => P("accent", e === "accent" ? null : e)
					});
				}
				j(c), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `);
				}, [
					() => Z("lbl.variant"),
					() => Z("lbl.tlMarker"),
					() => Z("lbl.color")
				]), W(e, t);
			}, s = (e) => {
				var t = Jc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.variant ?? "stor"), t = /* @__PURE__ */ N(() => [["stor", Z("opt.sitat.stor")], ["kort", Z("opt.sitat.kort")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("variant", e)
					});
				}
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = qc(), n = R(t), r = L(n), i = z(r);
					j(n);
					var a = z(n, 2), o = (e) => {
						var t = Pc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("ui.sitatPortrettFjern")]), H("click", t, () => P("image", "")), W(e, t);
					};
					K(a, (e) => {
						V(M).props.image && e(o);
					}), B((e) => G(r, `${e ?? ""} `), [() => Z("ui.sitatPortrett")]), H("change", i, Yt), W(e, t);
				};
				K(a, (e) => {
					V(M).props.variant === "kort" && e(o);
				});
				var s = z(a, 2), c = L(s), l = z(c);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ N(Qn);
					Ui(l, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => P("accent", e === "accent" ? null : e)
					});
				}
				j(s), Ne(2), B((e, t) => {
					G(r, `${e ?? ""} `), G(c, `${t ?? ""} `);
				}, [() => Z("lbl.variant"), () => Z("lbl.color")]), W(e, t);
			}, c = (e) => {
				var t = Yc(), n = R(t), r = L(n);
				J(r);
				var i = z(r);
				j(n), Ne(2), B((e, t) => {
					X(n, "title", e), ai(r, V(M).props.countUp !== !1), G(i, ` ${t ?? ""}`);
				}, [() => Z("tip.stat.countUp"), () => Z("lbl.statCountUp")]), H("change", r, (e) => P("countUp", e.target.checked)), W(e, t);
			}, l = (e) => {
				var t = Xc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => [["primary", Z("opt.btn.primary")], ["secondary", Z("opt.btn.secondary")]]);
					Q(i, {
						get value() {
							return V(M).props.style;
						},
						get options() {
							return V(e);
						},
						onchange: (e) => P("style", e)
					});
				}
				j(n), Ne(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.style")]), W(e, t);
			}, u = (e) => {
				var t = Zc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.fit ?? "cover"), t = /* @__PURE__ */ N(() => [["cover", Z("opt.fitFrame.cover")], ["contain", Z("opt.fitFrame.contain")]]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("fit", e)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ N(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("radius", e || null)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				J(f);
				var p = z(f, 2), m = L(p), h = z(m), g = L(h);
				j(h), j(p);
				var _ = z(p, 2);
				J(_);
				var v = z(_, 2), y = L(v), b = z(y), x = L(b);
				j(b), j(v);
				var S = z(v, 2);
				J(S);
				var C = z(S, 2), w = L(C), T = z(w), ee = L(T);
				j(T), j(C);
				var E = z(C, 2);
				J(E);
				var te = z(E, 2), ne = L(te), re = z(ne), ie = L(re);
				j(re), j(te);
				var ae = z(te, 2);
				J(ae);
				var oe = z(ae, 2), se = L(oe), ce = z(se), le = L(ce);
				j(ce), j(oe);
				var ue = z(oe, 2);
				J(ue);
				var de = z(ue, 2), fe = L(de, !0);
				j(de), Ne(2), B((e, t, n, i, a, s, c, u, p, h, b, C, T, te, re, oe, ce) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `), G(d, `${i ?? ""}%`), Y(f, V(M).props.x ?? .5), G(m, `${a ?? ""} `), G(g, `${s ?? ""}%`), Y(_, V(M).props.y ?? .5), X(v, "title", c), G(y, `${u ?? ""} `), G(x, `${p ?? ""}x`), Y(S, V(M).props.zoom ?? 1), G(w, `${h ?? ""} `), G(ee, `${b ?? ""}%`), Y(E, V(M).props.brightness ?? 1), G(ne, `${C ?? ""} `), G(ie, `${T ?? ""}%`), Y(ae, V(M).props.contrast ?? 1), G(se, `${te ?? ""} `), G(le, `${re ?? ""}%`), Y(ue, V(M).props.saturate ?? 1), X(de, "title", oe), G(fe, ce);
				}, [
					() => Z("lbl.fit"),
					() => Z("lbl.radius"),
					() => Z("lbl.focusX"),
					() => Math.round((V(M).props.x ?? .5) * 100),
					() => Z("lbl.focusY"),
					() => Math.round((V(M).props.y ?? .5) * 100),
					() => Z("tip.zoomCrop"),
					() => Z("lbl.zoom"),
					() => (V(M).props.zoom ?? 1).toFixed(2),
					() => Z("lbl.brightness"),
					() => Math.round((V(M).props.brightness ?? 1) * 100),
					() => Z("lbl.contrast"),
					() => Math.round((V(M).props.contrast ?? 1) * 100),
					() => Z("lbl.saturate"),
					() => Math.round((V(M).props.saturate ?? 1) * 100),
					() => Z("tip.resetAdjust"),
					() => Z("ui.resetAdjust")
				]), H("input", f, (e) => P("x", Number(e.target.value))), H("input", _, (e) => P("y", Number(e.target.value))), H("input", S, (e) => P("zoom", Number(e.target.value))), H("input", E, (e) => P("brightness", Number(e.target.value))), H("input", ae, (e) => P("contrast", Number(e.target.value))), H("input", ue, (e) => P("saturate", Number(e.target.value))), H("click", de, () => Ot(`edit:${V(M).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), W(e, t);
			}, d = (e) => {
				var t = Qc(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.color ?? "accent"), t = /* @__PURE__ */ N(Qn);
					Ui(s, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => P("color", e)
					});
				}
				j(a), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), Y(i, V(M).props.size ?? 48), X(a, "title", t), G(o, `${n ?? ""} `);
				}, [
					() => Z("lbl.sizePx"),
					() => Z("hint.icon.color"),
					() => Z("lbl.color")
				]), H("change", i, (e) => P("size", Number(e.target.value))), W(e, t);
			}, f = (e) => {
				var t = Xc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.view ?? "cards"), t = /* @__PURE__ */ N(() => [
						["cards", Z("opt.collectionView.cards")],
						["list", Z("opt.collectionView.list")],
						["archive", Z("opt.collectionView.archive")]
					]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				j(n), Ne(2), B((e) => G(r, `${e ?? ""} `), [() => Z("lbl.view")]), W(e, t);
			}, p = (e) => {
				var t = tl(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.view ?? "grid"), t = /* @__PURE__ */ N(() => [
						["grid", Z("opt.galleryView.grid")],
						["carousel", Z("opt.galleryView.carousel")],
						["slides", Z("opt.galleryView.slides")]
					]);
					Q(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("view", e)
					});
				}
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = $c(), n = R(t), r = L(n), i = z(r);
					J(i), j(n);
					var a = z(n, 2), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					J(l), B((e, t) => {
						G(r, `${e ?? ""} `), Y(i, V(M).props.columns ?? 3), G(o, `${t ?? ""} `), G(c, `${V(M).props.gap ?? 12 ?? ""} px`), Y(l, V(M).props.gap ?? 12);
					}, [() => Z("lbl.columns"), () => Z("lbl.imageGap")]), H("change", i, (e) => P("columns", Number(e.target.value))), H("input", l, (e) => P("gap", Number(e.target.value))), W(e, t);
				};
				K(a, (e) => {
					(V(M).props.view ?? "grid") === "grid" && e(o);
				});
				var s = z(a, 2), c = (e) => {
					var t = el(), n = L(t), r = z(n);
					J(r), j(t), B((e) => {
						G(n, `${e ?? ""} `), Y(r, V(M).props.interval ?? 5);
					}, [() => Z("lbl.secondsPerImage")]), H("change", r, (e) => P("interval", Number(e.target.value))), W(e, t);
				};
				K(s, (e) => {
					V(M).props.view === "slides" && e(c);
				});
				var l = z(s, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ N(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ N(() => [
						["", Z("common.none")],
						["sm", Z("opt.size.sm")],
						["md", Z("opt.radius.md")]
					]);
					Q(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => P("radius", e || null)
					});
				}
				j(l);
				var f = z(l, 2), p = L(f);
				J(p);
				var m = z(p);
				j(f), Ne(2), B((e, t, n, i) => {
					G(r, `${e ?? ""} `), G(u, `${t ?? ""} `), X(f, "title", n), ai(p, V(M).props.lightbox !== !1), G(m, ` ${i ?? ""}`);
				}, [
					() => Z("lbl.view"),
					() => Z("lbl.radius"),
					() => Z("tip.lightbox"),
					() => Z("lbl.lightbox")
				]), H("change", p, (e) => P("lightbox", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = nl(), n = R(t), r = L(n);
				Q(z(r), {
					get value() {
						return V(M).props.color;
					},
					get options() {
						return Qt;
					},
					onchange: (e) => P("color", e)
				}), j(n);
				var i = z(n, 2), a = L(i), o = z(a);
				J(o), j(i);
				var s = z(i, 2), c = L(s);
				J(c);
				var l = z(c);
				j(s), Ne(2), B((e, t, n, i, u) => {
					G(r, `${e ?? ""} `), G(a, `${t ?? ""} `), Y(o, V(M).props.thickness), X(s, "title", n), ai(c, i), G(l, ` ${u ?? ""}`);
				}, [
					() => Z("lbl.color"),
					() => Z("lbl.thickness"),
					() => Z("tip.shape.fill"),
					() => !!V(M).props.fill,
					() => Z("lbl.filled")
				]), H("change", o, (e) => P("thickness", Number(e.target.value))), H("change", c, (e) => P("fill", e.target.checked ? V(M).props.color : null)), W(e, t);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "faq" ? e(a, 1) : V(M).type === "tidslinje" ? e(o, 2) : V(M).type === "sitat" ? e(s, 3) : V(M).type === "statistikk" ? e(c, 4) : V(M).type === "button" ? e(l, 5) : V(M).type === "image" ? e(u, 6) : V(M).type === "icon" ? e(d, 7) : V(M).type === "samling" ? e(f, 8) : V(M).type === "galleri" ? e(p, 9) : V(M).type === "shape" && e(m, 10);
			});
			var h = z(n, 2), g = L(h), _ = z(g);
			{
				let e = /* @__PURE__ */ N(() => or(V(M).animation) ? V(M).animation.type : "");
				Q(_, {
					get value() {
						return V(e);
					},
					get options() {
						return cr;
					},
					onchange: (e) => dr(e || null)
				});
			}
			j(h);
			var v = z(h, 2), y = (e) => {
				var t = rl(), n = R(t), r = L(n), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				J(s), j(a), B((e, t) => {
					G(r, `${e ?? ""} `), Y(i, V(M).animation.props.duration), G(o, `${t ?? ""} `), Y(s, V(M).animation.props.delay);
				}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), H("change", i, (e) => pr("duration", Number(e.target.value))), H("change", s, (e) => pr("delay", Number(e.target.value))), W(e, t);
			}, b = /* @__PURE__ */ N(() => or(V(M).animation));
			K(v, (e) => {
				V(b) && e(y);
			});
			var x = z(v, 2), S = L(x), C = z(S);
			{
				let e = /* @__PURE__ */ N(() => V(M).hover?.type ?? (V(M).animation && !or(V(M).animation) ? V(M).animation.type : ""));
				Q(C, {
					get value() {
						return V(e);
					},
					get options() {
						return lr;
					},
					onchange: (e) => fr(e || null)
				});
			}
			j(x);
			var w = z(x, 2), T = (e) => {
				var t = ol(), n = z(R(t), 2), r = L(n);
				J(r);
				var i = z(r);
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = al(), n = R(t), r = L(n), i = z(r);
					{
						let e = /* @__PURE__ */ N(() => V(M).sticky.mode ?? "scroll"), t = /* @__PURE__ */ N(() => [["scroll", Z("opt.sticky.modeScroll")], ["screen", Z("opt.sticky.modeScreen")]]);
						Q(i, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Ot(`edit:${V(M).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					j(n);
					var a = z(n, 2), o = (e) => {
						var t = il(), n = L(t), r = z(n);
						J(r), j(t), B((e, i) => {
							X(t, "title", e), G(n, `${i ?? ""} `), Y(r, V(M).sticky.offset ?? 16);
						}, [() => V(M).sticky.mode === "screen" ? Z("tip.stickyEdge") : Z("tip.stickyOffset"), () => V(M).sticky.mode === "screen" ? Z("lbl.stickyEdge") : Z("lbl.stickyOffset")]), H("change", r, (e) => Ot(`edit:${V(M).blockId}`, (t) => {
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
						var t = vc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(M).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ N(() => Tt.map(([e, t]) => [e, Z(t)]));
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Ot(`edit:${V(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						j(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyDock"), () => Z("lbl.stickyDock")]), W(e, t);
					}, l = (e) => {
						var t = vc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(M).sticky.until ?? ""), t = /* @__PURE__ */ N(Et);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Ot(`edit:${V(M).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						j(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.stickyUntil"), () => Z("lbl.stickyUntil")]), W(e, t);
					};
					K(s, (e) => {
						V(M).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), B((e, t) => {
						X(n, "title", e), G(r, `${t ?? ""} `);
					}, [() => Z("tip.stickyMode"), () => Z("lbl.stickyMode")]), W(e, t);
				};
				K(a, (e) => {
					V(M).sticky && e(o);
				}), B((e, t, a) => {
					X(n, "title", e), ai(r, t), G(i, ` ${a ?? ""}`);
				}, [
					() => Z("tip.sticky"),
					() => !!V(M).sticky,
					() => Z("lbl.sticky")
				]), H("change", r, (e) => Ot(`edit:${V(M).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), W(e, t);
			};
			K(w, (e) => {
				V(ie) === "desktop" && e(T);
			});
			var ee = z(w, 4), E = L(ee), te = L(E, !0);
			j(E);
			var ne = z(E, 2), re = L(ne), ae = (e) => {
				var t = sl(), n = L(t), r = L(n, !0), i = z(r);
				J(i), j(n);
				var a = z(n, 2), o = L(a, !0), s = z(o);
				J(s), j(a);
				var c = z(a, 2), l = L(c, !0), u = z(l);
				J(u), j(c);
				var d = z(c, 2), f = L(d, !0), p = z(f);
				J(p), j(d);
				var m = z(d, 2), h = L(m, !0), g = z(h);
				J(g), j(m);
				var _ = z(m, 2), v = L(_, !0), y = z(v);
				J(y), j(_), j(t), B((e, t, n, a, c, d, _) => {
					G(r, e), Y(i, V(M).frame.x), G(o, t), Y(s, V(M).frame.y), G(l, n), Y(u, V(M).frame.w), G(f, a), Y(p, V(M).frame.h), X(m, "title", c), G(h, d), Y(g, V(M).frame.z ?? 1), G(v, _), Y(y, V(M).frame.rot ?? 0);
				}, [
					() => Z("frame.x"),
					() => Z("frame.y"),
					() => Z("frame.w"),
					() => Z("frame.h"),
					() => Z("tip.frameZ"),
					() => Z("frame.z"),
					() => Z("frame.rot")
				]), H("change", i, (e) => It("x", Number(e.target.value))), H("change", s, (e) => It("y", Number(e.target.value))), H("change", u, (e) => It("w", Number(e.target.value))), H("change", p, (e) => It("h", Number(e.target.value))), H("change", g, (e) => It("z", Number(e.target.value))), H("change", y, (e) => It("rot", Number(e.target.value))), W(e, t);
			};
			K(re, (e) => {
				V(ie) === "desktop" && e(ae);
			});
			var oe = z(re, 2), se = L(oe);
			J(se);
			var ce = z(se);
			j(oe);
			var le = z(oe, 2), ue = L(le);
			J(ue);
			var de = z(ue);
			j(le), j(ne), j(ee), B((e, t, n, r, i, a, o, s, c, l) => {
				X(h, "title", e), G(g, `${t ?? ""} `), X(x, "title", n), G(S, `${r ?? ""} `), X(E, "title", i), G(te, a), X(oe, "title", o), ai(se, V(M).hideMobile), G(ce, ` ${s ?? ""}`), X(le, "title", c), ai(ue, V(M).decor), G(de, ` ${l ?? ""}`);
			}, [
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
			]), H("change", se, (e) => qt(e.target.checked)), H("change", ue, (e) => Kt(e.target.checked)), W(e, t);
		};
		K(f, (e) => {
			V(Nt) === "content" ? e(p) : e(m, -1);
		}), B((e, t) => {
			o = Qr(a, 1, "svelte-1n46o8q", null, o, { on: V(Nt) === "content" }), G(s, e), u = Qr(l, 1, "svelte-1n46o8q", null, u, { on: V(Nt) === "style" }), G(d, t);
		}, [() => Z("props.tabContent"), () => Z("props.tabStyle")]), H("click", a, () => I(Nt, "content")), H("click", l, () => I(Nt, "style")), W(e, t);
	}, o = [
		["color", as],
		["gradient", _s],
		["glow", vs],
		["image", Ws],
		["bildegalleri", Js],
		["grain", bs]
	], s = Object.fromEntries(o), c = {
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
		kebab: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\"/></svg>",
		bookmark: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/><path d=\"M12 7v6M9 10h6\"/></svg>",
		fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>",
		gridToggle: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18M15 3v18M3 9h18M3 15h18\"/></svg>",
		restore: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 4v5h5\"/><path d=\"M3.05 13A9 9 0 1 0 6 5.3L3 9\"/><path d=\"M12 8v4.5l3 1.8\"/></svg>",
		caret: "<svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 9l6 6 6-6\"/></svg>",
		external: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 4h6v6\"/><path d=\"M20 4l-8 8\"/><path d=\"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/></svg>",
		device_desktop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"13\" rx=\"2\"/><path d=\"M8 21h8M12 16v5\"/></svg>",
		device_laptop: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"11\" rx=\"1.5\"/><path d=\"M2 19h20\"/></svg>",
		device_tablet: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>",
		device_mobile: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"2\"/><path d=\"M11 18.5h2\"/></svg>"
	}, l = [
		["lilla", Z("adminTheme.lilla")],
		["bronn", Z("adminTheme.bronn")],
		["gull", Z("adminTheme.gull")],
		["graa", Z("adminTheme.graa")],
		["nordlys", Z("adminTheme.nordlys")],
		["skumring", Z("adminTheme.skumring")],
		["glo", Z("adminTheme.glo")]
	], u = /* @__PURE__ */ F(tn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	bn(() => {
		document.documentElement.dataset.adminTheme = V(u), localStorage.setItem("urd-admin-theme", V(u)), f();
	});
	function f() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		O?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return rs(e) == null || (is(e, "#ffffff") ?? 0) >= (is(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
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
		x(Z("status.storageFull"), "error");
	}
	function C(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let w = /* @__PURE__ */ F(null), T = /* @__PURE__ */ F(null), ee = /* @__PURE__ */ F(tn({
		size: 16,
		snap: !0
	})), E = /* @__PURE__ */ F(!0), te = [
		{
			id: "desktop",
			width: null,
			viewport: "desktop"
		},
		{
			id: "laptop",
			width: 1280,
			viewport: "desktop"
		},
		{
			id: "tablet",
			width: 810,
			viewport: "desktop"
		},
		{
			id: "mobile",
			width: 390,
			viewport: "mobile"
		}
	], ne = /* @__PURE__ */ F("desktop"), re = /* @__PURE__ */ N(() => te.find((e) => e.id === V(ne)) ?? te[0]), ie = /* @__PURE__ */ N(() => V(re).viewport), ae = /* @__PURE__ */ F(null), oe = /* @__PURE__ */ F(0), se = /* @__PURE__ */ F(0), ce = /* @__PURE__ */ F(tn(typeof window < "u" ? window.innerWidth : 1280)), le = /* @__PURE__ */ F("fit"), ue = /* @__PURE__ */ F(1), de = /* @__PURE__ */ N(() => V(Hi) === "full" ? V(ce) : 1920), fe = /* @__PURE__ */ N(() => ja(V(Hi), V(Wi))), pe = /* @__PURE__ */ N(() => V(re).width ?? V(de)), me = /* @__PURE__ */ N(() => V(le) === "manual" ? V(ue) : wa(V(oe), V(pe), "fit"));
	function he(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(V(me) * 100) / 10) + e) * 10));
		I(ue, t / 100), I(le, "manual");
	}
	let ge = /* @__PURE__ */ N(() => V(me) > 0 ? V(se) / V(me) : V(se)), _e = /* @__PURE__ */ N(() => V(pe) * V(me)), ve = /* @__PURE__ */ N(() => V(se)), ye = /* @__PURE__ */ N(() => V(_e) > V(oe) + 1 || V(ve) > V(se) + 1);
	bn(() => {
		let e = () => O?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = V(ie);
		O?.sendViewport(e);
	}), bn(() => {
		let e = V(me);
		O?.sendZoom(e);
	}), bn(() => {
		let e = () => {
			I(ce, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), bn(() => {
		let e = V(ae);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			I(oe, e.clientWidth, !0), I(se, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let be = /* @__PURE__ */ F(0);
	function xe() {
		I(be, D?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Se() {
		let e = D?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		I(ne, "mobile"), e && setTimeout(() => O?.sendScrollSection(e.id), 0);
	}
	function Ce(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Ie("layout");
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
			}, Te(t, "layout-changed"), e.sectionId === V($t) && I(rn, e.minHeight, !0), V(M)?.sectionId === e.sectionId && St(), D.save(), A(), O?.sendSection(V(g), t);
		}
	}
	function we(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Te(e, t) {
		!e || !we(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, xe(), O?.sendAttention(e.id, !0));
	}
	let D = null, Ee = null, O = null, k = /* @__PURE__ */ F(null);
	function De() {
		I(k, Ee.data, !0), Ee.replace(V(k));
	}
	function Oe() {
		O?.sendSite(Be(V(k)));
	}
	let ke = /* @__PURE__ */ new Set(), Ae = () => V(k).pages.find((e) => e.id === V(g));
	function A() {
		let e = V(k)?.pages?.some((e) => !ke.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Fa?.hasDraft() || Object.values(Ia).some((e) => e.hasDraft()), n = Za?.hasDraft() || Object.values($).some((e) => e.hasDraft());
		I(_, e || D?.hasDraft() && !ke.has(V(g)) || Ee?.hasDraft() || Co?.hasDraft() || t || n || !1, !0);
	}
	let je = [], Me = [], Pe = null;
	function Fe() {
		return JSON.stringify({
			pageId: V(g),
			page: D.data,
			site: Ee.data,
			samlingerIndex: za ? Fa.data : null,
			samlinger: za ? Object.fromEntries(Object.entries(Ia).map(([e, t]) => [e, t.data])) : {},
			malerIndex: $a ? Za.data : null,
			maler: $a ? Object.fromEntries(Object.entries($).map(([e, t]) => [e, t.data])) : {},
			plugins: Co?.data ?? null
		});
	}
	function Ie(e) {
		e === Pe && (e.startsWith("edit:") || e.startsWith("grid:")) || (je.push(Fe()), je.length > 50 && je.shift(), Me.length = 0, Pe = e);
	}
	function Le(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (Ee.replace(r), De(), Ee.save(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), Oe(), Re(i, a ?? {}), ze(o, s ?? {}), Ve(c), t && t !== V(g) && V(k).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), Yr(t, { keepHistory: !0 }), A();
			return;
		}
		D.replace(n), D.save(), A(), xe(), St(), ln(D.data.sections.find((e) => e.id === V($t))), V(k).pages.some((e) => e.id === V(g)) ? O?.sendPage(V(g), D.data) : Yr(V(k).pages[0].id, { keepHistory: !0 });
	}
	function Re(e, t) {
		if (!(!Fa || !e) && JSON.stringify({
			index: Fa.data,
			samlinger: Object.fromEntries(Object.entries(Ia).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			Fa.replace(e), Fa.save();
			for (let e of Object.keys(Ia)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete Ia[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Ia[e]) {
					let t = La[e] ?? null;
					Ia[e] = ji(`urd-draft-samling-${e}`, () => t, S);
				}
				Ia[e].replace(n), Ia[e].save();
			}
			I(Ba, [...e.samlinger ?? []], !0), V(Ha) && !V(Ba).includes(V(Ha)) && I(Ha, null), co();
		}
	}
	function ze(e, t) {
		if (!(!Za || !e) && JSON.stringify({
			index: Za.data,
			maler: Object.fromEntries(Object.entries($).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			Za.replace(e), Za.save();
			for (let e of Object.keys($)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete $[e]);
			for (let [e, n] of Object.entries(t)) $[e] || ($[e] = ji(`urd-draft-mal-${e}`, () => Qa[e] ?? null, S)), $[e].replace(n), $[e].save();
			I(eo, [...e.maler ?? []], !0), A(), no();
		}
	}
	function Ve(e) {
		!Co || !e || JSON.stringify(Co.data) !== JSON.stringify(e) && (Co.replace(e), Co.save(), Fo(), qo());
	}
	function He() {
		je.length && (Me.push(Fe()), Le(je.pop()), Pe = null, x(Z("status.undone")));
	}
	function Ue() {
		Me.length && (je.push(Fe()), Le(Me.pop()), Pe = null, x(Z("status.redone")));
	}
	function Ke(e) {
		V(wt) && (e.target instanceof Element && e.target.closest(".block-menu") || I(wt, null));
	}
	function qe(e) {
		if (e.key === "Escape" && V(wt)) {
			I(wt, null);
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
			].includes(t.type)) || !V(M) || V(ie) === "mobile") return;
			e.preventDefault(), O?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Ue() : He());
	}
	async function Je() {
		I(h, Ua(await (await fetch("/content/site.json")).json()), !0), Ee = ji("urd-draft-site", () => V(h), S), (Ee.data.schemaVersion ?? 1) > 3 && (console.warn(`Urd: site-utkastet har schemaVersion ${Ee.data.schemaVersion} (motoren har 3) og forkastes`), Ee.replace(Be(V(h)))), Ee.replace(Ua(Ee.data)), Ee.save(), De(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), await Yr(new URLSearchParams(location.search).get("page") ?? V(k).pages[0].id), await zo(), await so(), await to(), await Tr(), V(T) && Dr(), V(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (I(tt, V(k).site.title, !0), I(nt, V(k).theme.tokens.color.accent, !0), I(rt, V(k).theme.tokens.color.bg, !0), I(et, !0));
	}
	let Ye = /* @__PURE__ */ F(null);
	function Xe({ title: e, lines: t = [], okLabel: n = Z("confirm.ok"), cancelLabel: r = Z("confirm.cancel") }) {
		return new Promise((i) => {
			I(Ye, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Ze({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Z("confirm.ok"), cancelLabel: a = Z("confirm.cancel") }) {
		return new Promise((o) => {
			I(Ye, {
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
	function Qe(e) {
		V(Ye)?.resolve(V(Ye).prompt ? e ? V(Ye).value : null : e), I(Ye, null);
	}
	let $e = !1;
	bn(() => {
		if (!V(Ye)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), Qe(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let et = /* @__PURE__ */ F(!1), tt = /* @__PURE__ */ F(""), nt = /* @__PURE__ */ F("#7c5cff"), rt = /* @__PURE__ */ F("#0b0e14");
	function it() {
		localStorage.setItem("urd-setup-done", "1"), I(et, !1);
	}
	function at() {
		let e = V(tt).trim();
		e && (gi("setup", () => {
			V(k).site.title = e, V(k).nav.logo = {
				type: "text",
				value: e
			}, V(k).theme.tokens.color.accent = V(nt), V(k).theme.tokens.color.bg = V(rt), delete V(k).site.setup;
		}), it(), x(Z("status.setupDone"), "ok"));
	}
	let ct = /* @__PURE__ */ F(null), lt = [
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
	], ut = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], dt = Object.fromEntries(lt.flat().map((e) => [e, Z(`panel.${e}`)])), ft = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, pt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], mt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function ht(e, t) {
		let n = [];
		for (let r of e) for (let e of Do[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || pt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function gt() {
		let e = mt([...pt, ...ht(V(Mo), "admin")]);
		return vt === "auto" || e.some(([e]) => e === vt) ? e : [[vt, vt], ...e];
	}
	let _t = () => ht(V(Eo)?.enabled ?? [], "site"), vt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function yt(e) {
		e !== vt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function bt(e) {
		I(ct, V(ct) === e ? null : e, !0), V(ct) === "history" && Mr(), V(ct) === "update" && !V(Br) && Ur();
	}
	let M = /* @__PURE__ */ F(null);
	function xt(e, t) {
		let n = D?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function St() {
		if (!V(M)) return;
		let { block: e } = xt(V(M).sectionId, V(M).blockId);
		if (!e) {
			I(M, null);
			return;
		}
		I(M, {
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
	function Ct(e) {
		if (I(wt, null), !e.blockId) {
			I(M, null);
			return;
		}
		I(M, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && I($t, e.sectionId, !0), St();
	}
	let wt = /* @__PURE__ */ F(null), Tt = [
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
	function Et() {
		let e = D?.data.sections ?? [], t = e.findIndex((e) => e.id === V(M)?.sectionId);
		return [["", Z("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Z("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function Dt(e) {
		if (Ct(e), !V(M)) return;
		let t = V(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + V(me) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + V(me) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + V(me) * e.rect.top), Math.max(8, r));
		I(wt, {
			left: n,
			top: i
		}, !0);
	}
	function Ot(e, t) {
		let { section: n, block: r } = xt(V(M)?.sectionId, V(M)?.blockId);
		r && (Ie(e), t(r, n), Te(n, "block-edited"), D.save(), A(), O?.sendSection(V(g), n), St());
	}
	function P(e, t) {
		Ot(`edit:${V(M).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function kt(e, t) {
		Ot(`edit:${V(M).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let At = tn({}), jt = tn({}), Mt = /* @__PURE__ */ F(!1), Nt = /* @__PURE__ */ F("content"), Pt = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function Ft(e) {
		let t = V(M).blockId, n = `${t}:${e.key}`, r = (At[n] ?? V(M).props[e.key] ?? "").trim();
		jt[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			kt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		I(Mt, !0), jt[n] = {
			text: Z("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (V(M)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (kt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), jt[n] = null) : jt[n] = {
				text: Ei(a) ?? Z("props.place.notFound"),
				err: !0
			};
		} catch {
			jt[n] = {
				text: Z("props.place.failed"),
				err: !0
			};
		} finally {
			I(Mt, !1);
		}
	}
	function It(e, t) {
		Number.isFinite(t) && Ot(`edit:frame-${V(M).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Lt(e) {
		Ot(`edit:${V(M).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Rt(e, t) {
		Ot(`edit:${V(M).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function zt() {
		Ot("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Z("seed.faq.newQ"),
				a: Z("seed.faq.answer")
			});
		});
	}
	function Bt(e) {
		Ot("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Vt(e, t) {
		let n = e + t;
		Ot("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Ht(e, t) {
		Ot(`edit:${V(M).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Ut() {
		Ot("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Z("seed.tidslinje.newTitle"),
				text: ""
			});
		});
	}
	function Wt(e) {
		Ot("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Gt(e, t) {
		let n = e + t;
		Ot("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Kt(e) {
		Ot("decor", (t) => {
			t.decor = e;
		});
	}
	function qt(e) {
		Ot("hide-mobile", (t) => {
			t.hideMobile = e;
		});
	}
	async function Jt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Hn(t);
			Ot(`edit:${V(M).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ea(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Z("status.imageReadError"), "error");
		}
	}
	async function Yt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Hn(t);
			Ot(`edit:${V(M).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			x(Z("status.imageReadError"), "error");
		}
	}
	let Xt = {
		text: Z("blocks.text"),
		button: Z("blocks.button"),
		image: Z("blocks.image"),
		shape: Z("blocks.shape"),
		video: Z("blocks.video"),
		icon: Z("blocks.icon"),
		galleri: Z("blocks.galleri"),
		faq: Z("blocks.faq")
	}, Zt = [
		["line", Z("shape.line")],
		["arrow", Z("shape.arrow")],
		["circle", Z("shape.circle")],
		["rect", Z("shape.rect")],
		["triangle", Z("shape.triangle")]
	], Qt = [
		["accent", Z("color.accent")],
		["text", Z("color.text")],
		["surface", Z("color.surface")],
		["bg", Z("color.bg")]
	], $t = /* @__PURE__ */ F(null), en = /* @__PURE__ */ F(null), rn = /* @__PURE__ */ F(""), an = /* @__PURE__ */ F(tn([])), on = /* @__PURE__ */ F(null), sn = /* @__PURE__ */ F(null), cn = /* @__PURE__ */ F("");
	function ln(e) {
		I(en, e?.grid ? { ...e.grid } : null, !0), I(rn, e?.size?.minHeight ?? "", !0), I(an, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), I(on, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), I(sn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), I(cn, e?.theme ?? "", !0);
	}
	let un = /* @__PURE__ */ F(null), dn = tn({});
	function fn() {
		try {
			let e = ((V(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${V($t)}"]`))?.getBoundingClientRect();
			I(un, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			I(un, null);
		}
	}
	bn(() => {
		V($t), V(an), requestAnimationFrame(() => requestAnimationFrame(fn));
	}), bn(() => {
		let e = V(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => fn());
		return t.observe(e), () => t.disconnect();
	}), bn(() => {
		for (let e of V(an)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !dn[t]) {
				let e = new Image();
				e.onload = () => {
					dn[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function pn(e) {
		gn("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function mn(e) {
		let t = V(k).theme.scheme === "dark" ? {
			...V(k).theme.tokens.color,
			...V(k).theme.alt?.tokens?.color ?? {}
		} : V(k).theme.tokens.color, n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"]), r = ns(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function hn(e) {
		I($t, e.sectionId, !0), ln(D?.data.sections.find((t) => t.id === e.sectionId));
	}
	function gn(e, t) {
		let n = D.data.sections.find((e) => e.id === V($t));
		n && (Ie(e), t(n), D.save(), A(), O?.sendSection(V(g), n), ln(n));
	}
	let _n = /* @__PURE__ */ F("color");
	function vn(e, t) {
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
	function yn(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function xn(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Sn(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function Cn(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				Sn(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				Sn(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let wn = (e) => Math.min(4, Math.max(.1, e));
	function Tn(e, t, n, r) {
		Sn(e, t, "size", wn(Math.round((n + r) * 100) / 100));
	}
	function En(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && Sn(e, t, "size", wn(r / 100));
	}
	function Dn(e, t, n, r) {
		let i = dn[n.props.src];
		if (!i?.w || !i?.h || !V(un)?.w || !V(un)?.h) return;
		let a = V(un).h * i.w / (V(un).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && Sn(e, t, "fit", "vanlig"), Sn(e, t, "size", wn(Math.round(o * 100) / 100));
	}
	function On(e) {
		return e.props;
	}
	function kn(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function An(e, t, n, r) {
		kn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let jn = {
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
	function Mn(e, t, n) {
		kn(e, t, e.keyPrefix, (e) => {
			e.kind = n, jn[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function Nn(e, t, n, r) {
		kn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Pn(e, t) {
		kn(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Fn(e, t, n) {
		kn(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function In(e, t, n, r) {
		kn(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Ln = /* @__PURE__ */ F(null);
	function Rn(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		I(Ln, {
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
			I(Ln, {
				...V(Ln),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = V(Ln);
			if (I(Ln, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && In(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function zn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function Bn(e, t) {
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
	async function Vn(e) {
		let t = await e.text(), n = Xi(t), r = Qi(t);
		if (!r) return n;
		let i = await Bn(n.dataUrl, r);
		if (!i) return n;
		let a = Zi(t, i);
		if (a === t) return n;
		try {
			return Xi(a);
		} catch {
			return n;
		}
	}
	async function Hn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Vn(e) : qi(e);
	}
	async function Un(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Sn(e, t, "src", (await Hn(r)).dataUrl);
		} catch {
			x(Z("status.imageReadError"), "error");
		}
	}
	async function Wn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Z("status.compressingImages"));
		let { images: i, failed: a, big: o } = await lf(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), uf(i.length, a, o);
	}
	function Gn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Kn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function qn(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Jn(e, t) {
		gi(e, () => {
			V(k).nav.style ??= {}, t(V(k).nav.style);
		});
	}
	let Yn = /* @__PURE__ */ N(() => ({
		mutate: gn,
		keyPrefix: "bg",
		keyId: V($t)
	})), Xn = {
		mutate: Jn,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Zn = {
		mutate: $o,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, Qn = () => Object.entries(V(k)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), $n = [
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
	], er = /* @__PURE__ */ N(() => !!V(k)?.theme.alt), tr = /* @__PURE__ */ N(() => V(k)?.theme.alt?.auto === !0), nr = /* @__PURE__ */ N(() => V(k)?.theme.scheme === "dark" ? "dark" : "light"), rr = /* @__PURE__ */ N(() => V(k)?.theme.tokens.color ?? {}), ir = /* @__PURE__ */ N(() => ({
		...V(k)?.theme.tokens.color ?? {},
		...V(k)?.theme.alt?.tokens?.color ?? {}
	}));
	function ar(e) {
		return {
			type: e,
			version: Qs[e].version,
			props: Qs[e].defaults()
		};
	}
	let or = (e) => !!(e && Qs[e.type]?.entrance), sr = [["", Z("common.none")], ...Object.entries(Qs).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])], cr = sr.filter(([e]) => !Qs[e]?.group), lr = [["", Z("common.none")], ...Object.entries(Qs).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Z(t.labelKey) : t.label])];
	function ur(e) {
		e.animation && !or(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function dr(e) {
		Ot(`edit:anim-${V(M).blockId}`, (t) => {
			ur(t), t.animation = e ? ar(e) : null;
		}), V(M) && O?.sendDemoAnim(V(M).sectionId, V(M).blockId);
	}
	function fr(e) {
		Ot(`edit:hover-${V(M).blockId}`, (t) => {
			ur(t), t.hover = e ? ar(e) : null;
		});
	}
	function pr(e, t) {
		Number.isFinite(t) && (Ot(`edit:anim-${V(M).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), V(M) && O?.sendDemoAnim(V(M).sectionId, V(M).blockId));
	}
	function mr(e) {
		gn("section-anim", (t) => {
			ur(t), t.animation = e ? ar(e) : null;
		}), O?.sendDemoAnim(V($t));
	}
	function hr(e) {
		gn("section-hover", (t) => {
			ur(t), t.hover = e ? ar(e) : null;
		});
	}
	function gr(e, t) {
		Number.isFinite(t) && (gn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), O?.sendDemoAnim(V($t)));
	}
	function _r(e, t) {
		gn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), O?.sendDemoAnim(V($t));
	}
	function vr(e) {
		let t = D.data.sections.find((e) => e.id === V($t));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		Ie("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, I(rn, r, !0), D.save(), A(), O?.sendSection(V(g), t);
	}
	function yr() {
		return D.data.sections.find((e) => e.id === V($t)) ?? D.data.sections[0];
	}
	function xr(e) {
		let t = D.data.sections.find((e) => e.id === V($t));
		t && (Ie("grid:section"), t.grid = e ? { ...Ee.data.grid } : null, I(en, t.grid ? { ...t.grid } : null, !0), D.save(), A(), O?.sendSection(V(g), t), V(fi) && O?.sendShowGrid(!0));
	}
	function Cr(e, t) {
		let n = D.data.sections.find((e) => e.id === V($t));
		n?.grid && (Ie("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, I(en, { ...n.grid }, !0), D.save(), A(), O?.sendSection(V(g), n), V(fi) && O?.sendShowGrid(!0));
	}
	function wr(e, t) {
		Ie("grid:site"), I(ee, {
			...V(ee),
			[e]: t
		}, !0), Ee.data.grid = {
			...Ee.data.grid,
			[e]: t
		}, Ee.save(), A(), Oe(), V(fi) && O?.sendShowGrid(!0);
	}
	async function Tr() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(T, await e.json(), !0) : e.status !== 503 && I(T, null);
		} catch {
			I(T, null);
		}
	}
	let Er = null;
	async function Dr() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Er = (await e.json()).head ?? null);
		} catch {}
	}
	async function Or(e) {
		if (!Er) return await Dr(), {
			ok: await Xe({
				title: Z("confirm.conflictUnknown.title"),
				lines: [Z("confirm.conflictUnknown.body"), Z("confirm.conflictUnknown.warning")],
				okLabel: Z("confirm.publishAnyway"),
				cancelLabel: Z("confirm.cancel")
			}),
			head: Er
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Er}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Er) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Z("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Xe({
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
	let kr = /* @__PURE__ */ F(null), U = /* @__PURE__ */ F(""), Ar = /* @__PURE__ */ F(!1);
	async function Mr() {
		I(U, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? I(kr, (await e.json()).commits, !0) : e.status === 401 ? (I(kr, [], !0), I(U, Z("status.historyLoginRequired"), !0)) : (I(kr, [], !0), I(U, Ei(await e.json().catch(() => null)) ?? Z("status.historyFetchFailed"), !0));
		} catch {
			I(kr, [], !0), I(U, Z("status.historyUnavailable"), !0);
		}
	}
	let Nr = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Di(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), Pr = !1;
	async function Fr() {
		let e = V(kr)?.[0];
		if (!(!e || V(Ar)) && await Xe({
			title: Z("confirm.revert.title"),
			lines: [`«${e.message}»`, Z("confirm.revert.body")],
			okLabel: Z("confirm.revert.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			I(Ar, !0), x(Z("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Er = e : Dr(), Pr = !0, x(Z("status.revertDone"), "ok"), Ir();
				} else t.status === 409 ? x(Z("status.revertConflict"), "error") : x(Ei(await t.json().catch(() => null)) ?? Z("status.revertFailed"), "error");
			} catch {
				x(Z("status.publishLayerUnreachable"), "error");
			}
			I(Ar, !1), Mr();
		}
	}
	async function Ir() {
		let e = ["/content/site.json", ...V(k).pages.map((e) => `/${e.file}`)], t = async () => {
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
				x(Z("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(Z("status.revertDeployTimeout"), "error");
	}
	let Rr = /* @__PURE__ */ F(null), zr = /* @__PURE__ */ F(null), Br = /* @__PURE__ */ F(!1), Hr = /* @__PURE__ */ F(tn(/* @__PURE__ */ new Set()));
	async function Ur() {
		I(Br, !0), I(zr, null), I(Rr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (I(Rr, t, !0), I(Hr, /* @__PURE__ */ new Set(), !0)) : I(zr, Ei(t) ?? Z("update.checkFailed"), !0);
		} catch {
			I(zr, Z("status.publishLayerUnreachable"), !0);
		}
		I(Br, !1);
	}
	function Wr(e) {
		let t = new Set(V(Hr));
		t.has(e) ? t.delete(e) : t.add(e), I(Hr, t, !0);
	}
	async function Gr() {
		if (!V(Rr) || V(Rr).upToDate || V(Br)) return;
		let e = [...V(Hr)], t = V(Rr).changes.filter((e) => !V(Hr).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Xe({
			title: Z("confirm.update.title"),
			lines: [Z("confirm.update.body", {
				target: V(Rr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Z("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Z("confirm.update.ok"),
			cancelLabel: Z("confirm.cancel")
		})) {
			I(Br, !0), x(Z("update.running", { target: V(Rr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: V(Rr).target,
						expect: V(Rr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(Z("update.committed", { target: V(Rr).target }), "ok"), await Kr(V(Rr).target.replace(/^v/, ""))) : t.status === 409 ? (x(Ei(n) ?? Z("update.checkFailed"), "error"), await Ur()) : x(Ei(n) ?? Z("update.failed"), "error");
			} catch {
				x(Z("status.publishLayerUnreachable"), "error");
			}
			I(Br, !1);
		}
	}
	async function Kr(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(Z("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(Z("update.deployTimeout"), "error");
	}
	let qr = null;
	function Jr(e) {
		return {
			schemaVersion: 2,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Xa("sec"),
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
	async function Yr(e, { keepHistory: t = !1 } = {}) {
		I(g, e, !0), qr = (async () => {
			let n = Ae(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Wa(await e.json(), Ee.data));
			} catch {}
			r ? ke.delete(e) : r = Jr(n), D = ji(`urd-draft-${e}`, () => r, S), (D.data.schemaVersion ?? 1) > 2 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${D.data.schemaVersion} (motoren har 2) og forkastes`), D.replace(structuredClone(r))), D.replace(Wa(D.data, Ee.data)), D.save(), t || (Pe = null), I($t, null), I(en, null), A(), xe(), I(v, "");
		})(), await qr;
	}
	function Xr() {
		O?.destroy(), V(w)?.contentDocument?.addEventListener("pointerdown", () => {
			V(wt) && I(wt, null);
		}, !0), O = Sa(V(w), {
			onEdit: Id,
			onMove: Ld,
			onGrow: Rd,
			onDelete: Jd,
			onAddSection: Ud,
			onMoveSection: Wd,
			onDeleteSection: Gd,
			onSectionSize: Kd,
			onUndo: (e) => e.redo ? Ue() : He(),
			onSelectSection: hn,
			onSelectBlock: Ct,
			onBlockMenu: Dt,
			onReady: Zr,
			onNavigate: hi,
			onAddBlock: (e) => Qd(e.sectionId, e.block),
			onAddBlocks: (e) => $d(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: sf,
			onMoveBlockSection: qd,
			onMobileReset: zd,
			onMobileOrder: Bd,
			onReviewDone: Vd,
			onBlockFlag: Hd,
			onCollectionEdit: fo,
			onSaveTemplate: ro,
			onStickyGroup: io,
			onDeleteTemplate: oo,
			onApplyLayout: Ce,
			onPluginBlocks: (e) => {
				I(tf, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => gi("edit:nav-width", () => {
				V(k).nav.style ??= {}, V(k).nav.style.width = e.width;
			})
		});
	}
	async function Zr() {
		await qr, await To, O?.sendPlugins(Be(V(Eo))?.enabled ?? []), O?.sendViewport(V(ie)), O?.sendZoom(V(me)), lo(), no(), Ee.hasDraft() && Oe();
		let e = !V(h).pages.some((e) => e.id === V(g));
		(D.hasDraft() || e) && O?.sendPage(V(g), D.data), V(E) || O?.sendChrome(!1), V(fi) && O?.sendShowGrid(!0), V($r) && O?.sendShowGuides(!0), f();
	}
	let $r = /* @__PURE__ */ F(localStorage.getItem("urd-guides") === "1"), ti = /* @__PURE__ */ F(!1), ni = /* @__PURE__ */ F(tn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function ri(e) {
		I(ni, e === "menu" ? "menu" : "strip", !0), V(ni) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let ii = /* @__PURE__ */ F(null);
	bn(() => {
		if (!V(ti)) return;
		let e = (e) => {
			V(ii)?.contains(e.target) || I(ti, !1);
		}, t = (e) => {
			e.key === "Escape" && I(ti, !1);
		}, n = () => {
			I(ti, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let oi = {
		view: 1079,
		device: 999,
		zoom: 919
	}, si = /* @__PURE__ */ F(null), ci = /* @__PURE__ */ F(null), ui = tn({
		view: !1,
		device: !1,
		zoom: !1
	});
	bn(() => {
		let e = Object.entries(oi).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				ui[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), bn(() => {
		V(si) && !ui[V(si)] && I(si, null);
	}), bn(() => {
		if (!V(si)) return;
		let e = (e) => {
			V(ci)?.contains(e.target) || I(si, null);
		}, t = (e) => {
			e.key === "Escape" && I(si, null);
		}, n = () => {
			I(si, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function di() {
		I($r, !V($r)), localStorage.setItem("urd-guides", V($r) ? "1" : "0"), O?.sendShowGuides(V($r));
	}
	let fi = /* @__PURE__ */ F(localStorage.getItem("urd-grid-overlay") === "1");
	function mi() {
		I(fi, !V(fi)), localStorage.setItem("urd-grid-overlay", V(fi) ? "1" : "0"), O?.sendShowGrid(V(fi));
	}
	function hi(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = V(k).pages.find((e) => e.path === t);
		n && n.id !== V(g) && Yr(n.id);
	}
	function gi(e, t) {
		Ie(e), t(), Ee.save(), A(), Oe();
	}
	let _i = /* @__PURE__ */ F(""), vi = /* @__PURE__ */ F(null), yi = Object.fromEntries(Wo.map((e) => [e.id, Ho(Go(e.id, {
		pageId: "forhandsvisning",
		title: ""
	}))])), bi = /* @__PURE__ */ F(null);
	bn(() => {
		if (!V(bi)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || I(bi, null);
		}, t = (e) => {
			e.key === "Escape" && I(bi, null);
		}, n = () => {
			I(bi, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let xi = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Si(e, t = null) {
		return e ? xi.includes(e) ? Z("error.reservedName", { slug: e }) : V(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Z("error.pageExists") : null : Z("error.pageNeedsName");
	}
	function Ci() {
		let e = V(_i).trim(), t = ea(e), n = Si(t);
		if (n) {
			x(n, "error");
			return;
		}
		let r = V(vi) && !V(vi).startsWith("preset:") ? $[V(vi)]?.data?.page : null, i = V(vi)?.startsWith("preset:") ? Go(V(vi).slice(7), {
			pageId: t,
			title: e
		}) ?? Jr({
			id: t,
			title: e
		}) : r ? xo(Wa(JSON.parse(JSON.stringify(r)), Ee.data), Xa, {
			id: t,
			title: e
		}) : Jr({
			id: t,
			title: e
		});
		gi("pages", () => {
			V(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), V(k).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), A(), I(_i, ""), I(vi, null), Yr(t);
	}
	async function wi(e) {
		I(bi, null), await ao("page", e.id === V(g) ? JSON.parse(JSON.stringify(D.data)) : await Oi(e));
	}
	function Ti(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		gi("pages", () => {
			e.title = n;
			for (let t of V(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === V(g) ? (D.data.meta.title = n, D.save(), A(), O?.sendPage(V(g), D.data)) : ki(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Oi(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Wa(await t.json(), Ee.data);
		} catch {}
		return Jr(e);
	}
	async function ki(e, t) {
		let n = await Oi(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), A();
	}
	function Ai(e, t) {
		let n = ea(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Si(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		gi("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Mi(e) {
		e.path !== "/" && (gi("pages", () => {
			V(k).pages = V(k).pages.filter((t) => t.id !== e.id), V(k).nav.items = V(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of V(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			V(k).nav.items = V(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === V(g) && Yr(V(k).pages[0].id), x(Z("status.pageRemoved")));
	}
	function Ni(e) {
		gi("edit:nav-logo", () => {
			V(k).nav.logo = {
				type: "text",
				value: "",
				...V(k).nav.logo,
				...e
			};
		});
	}
	function Pi(e) {
		gi("nav", () => {
			V(k).nav.logo ??= {
				type: "text",
				value: V(k).site.title
			};
			let t = V(k).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = V(k).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = V(k).site.title), delete t.image), t.type = e;
		});
	}
	async function Fi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Hn(t);
			gi("nav", () => {
				let t = V(k).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Z("status.imageReadErrorSvg"), "error");
		}
	}
	let Ii = /* @__PURE__ */ F(null);
	async function Li(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Vn(t);
				I(Ii, e.dataUrl, !0);
			} catch {
				x(Z("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			I(Ii, String(n.result), !0);
		}, n.onerror = () => x(Z("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Ri(e) {
		gi("edit:site-icon", () => {
			V(k).site.icon = e;
		}), I(Ii, null);
	}
	function zi() {
		gi("edit:site-icon", () => {
			delete V(k).site.icon;
		});
	}
	function Bi(e) {
		gi("edit:site-title", () => {
			V(k).site.title = e;
		});
	}
	function Vi(e) {
		gi("edit:site-desc", () => {
			V(k).site.description = e;
		});
	}
	let Hi = /* @__PURE__ */ N(() => V(k)?.layout?.contentWidth ?? 1440), Wi = /* @__PURE__ */ N(() => V(k)?.layout?.gutter ?? 6), Gi = /* @__PURE__ */ N(() => Na(V(Hi))), Ki = /* @__PURE__ */ N(() => Ea.find((e) => e.gutter === V(Wi))?.id ?? null), Ji = /* @__PURE__ */ F(!1), Yi = /* @__PURE__ */ N(() => V(Hi) === "full" ? Ta : ka(V(Hi))), na = /* @__PURE__ */ N(() => Oa.map((e) => ({
		screen: e,
		...Ma(V(Hi), V(Wi), e)
	})));
	function ra(e, t) {
		gi(t, () => {
			V(k).layout = {
				contentWidth: V(Hi),
				gutter: V(Wi),
				...e
			};
		});
	}
	let ia = (e) => ra({ contentWidth: e === "full" ? "full" : ka(e) }, "edit:site-width"), aa = (e) => ra({ gutter: Aa(e) }, "edit:site-gutter");
	function oa() {
		let e = V(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function sa() {
		let e = oa(), t = mt([...pt, ..._t()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function ca(e) {
		gi("site", () => {
			V(k).site.lang = e;
		});
	}
	let fa = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!V(k)?.site) return;
		let e = V(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			fa.test(e) && (t.href = e);
		}
	});
	function pa(e) {
		gi("nav", () => {
			V(k).nav.layout = e;
		});
	}
	function ma(e, t) {
		gi(`edit:nav-style-${e}`, () => {
			V(k).nav.style ??= {}, t === void 0 ? delete V(k).nav.style[e] : V(k).nav.style[e] = t;
		});
	}
	let ha = /* @__PURE__ */ N(() => V(k)?.nav?.variant === "side-left" || V(k)?.nav?.variant === "side-right"), ga = /* @__PURE__ */ N(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(V(k)?.nav?.variant)), _a = {
		underline: [Z("hoverColor.underline.label"), Z("hoverColor.underline.title")],
		pill: [Z("hoverColor.pill.label"), Z("hoverColor.pill.title")],
		lift: [Z("hoverColor.lift.label"), Z("hoverColor.lift.title")]
	}, va = /* @__PURE__ */ N(() => _a[V(k)?.nav?.style?.hover] ?? null);
	function ya(e) {
		gi("nav", () => {
			e === "bar" ? delete V(k).nav.variant : V(k).nav.variant = e;
		});
	}
	function ba(e) {
		gi("nav", () => {
			V(k).nav.style ??= {}, e ? V(k).nav.style.glow = !0 : delete V(k).nav.style.glow;
		});
	}
	function Ca(e) {
		gi("nav", () => {
			V(k).nav.style ??= {}, e ? delete V(k).nav.style.topGap : V(k).nav.style.topGap = !1;
		});
	}
	function Pa(e) {
		gi("nav", () => {
			V(k).nav.style ??= {}, e === "standard" ? delete V(k).nav.style.hover : V(k).nav.style.hover = e;
		});
	}
	let Fa = null, Ia = {}, La = {}, za = !1, Ba = /* @__PURE__ */ F(tn([])), Va = /* @__PURE__ */ F(tn({})), Ha = /* @__PURE__ */ F(null), Ga = /* @__PURE__ */ F(""), Ka = /* @__PURE__ */ F("news"), Ja = [
		["news", Z("collectionKind.news")],
		["notices", Z("collectionKind.notices")],
		["publications", Z("collectionKind.publications")],
		["custom", Z("collectionKind.custom")]
	], Za = null, $ = {}, Qa = {}, $a = !1, eo = /* @__PURE__ */ F(tn([]));
	async function to() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Za = ji("urd-draft-maler", () => e, S), I(eo, [...Za.data.maler ?? []], !0);
		for (let e of V(eo)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Qa[e] = t, $[e] = ji(`urd-draft-mal-${e}`, () => t, S), ($[e].data?.schemaVersion ?? 1) > 1 && $[e].reset();
		}
		$a = !0, no();
	}
	function no() {
		let e = V(eo).map((e) => $[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify($[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		O?.sendMaler(e);
	}
	function ro(e) {
		let t = yo.includes(e.kind) ? e.kind : "section";
		return ao(t, e[t]);
	}
	function io(e) {
		let t = e.blockIds ?? [], { section: n } = xt(e.sectionId, t[0]);
		if (!n || !t.length) return;
		Ie(`sticky-group:${e.sectionId}`);
		let r = e.on ? Xa("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Te(n, "block-edited"), D.save(), A(), O?.sendSection(V(g), n), St(), x(Z(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function ao(e, t) {
		if (!t || !Za) return;
		let n = (await Ze({
			title: Z("canvas.templateNamePrompt"),
			placeholder: Z("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = bo(n);
		if (!r) {
			x(Z("status.invalidName"), "error");
			return;
		}
		if (V(eo).includes(r)) {
			x(Z("status.templateExists"), "error");
			return;
		}
		Ie("maler");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		$[r] = ji(`urd-draft-mal-${r}`, () => null, S), $[r].replace(i), $[r].save(), Za.data.maler = [...V(eo), r], Za.save(), I(eo, [...V(eo), r], !0), x(Z("status.templateSaved", { name: n }), "ok"), A(), no();
	}
	async function oo(e) {
		let t = $[e.id]?.data?.mal;
		t && await Xe({ title: Z("confirm.deleteTemplate", { name: t.name }) }) && (Ie("maler"), V(vi) === e.id && I(vi, null), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete $[e.id], Za.data.maler = V(eo).filter((t) => t !== e.id), Za.save(), I(eo, V(eo).filter((t) => t !== e.id), !0), A(), no());
	}
	async function so() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Fa = ji("urd-draft-samlinger", () => e, S), I(Ba, [...Fa.data.samlinger ?? []], !0);
		for (let e of V(Ba)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			La[e] = t, Ia[e] = ji(`urd-draft-samling-${e}`, () => t, S), !t && !Ia[e].data && (Ia[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Ia[e].save());
		}
		za = !0, co();
	}
	function co(e = !0) {
		let t = {};
		for (let e of V(Ba)) Ia[e] && (t[e] = JSON.parse(JSON.stringify(Ia[e].data)));
		I(Va, t, !0), e && lo();
	}
	function lo() {
		O?.sendCollections(Be(V(Va)) ?? {});
	}
	function uo(e, t, n, r = !0) {
		let i = Ia[e];
		i && (Ie(t), n(i.data), i.save(), A(), co(r));
	}
	function fo(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || uo(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function po() {
		let e = V(Ga).trim();
		if (!e) return;
		let t = ea(e);
		if (!t || V(Ba).includes(t)) {
			x(Z(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		Ie("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: V(Ka),
			entries: []
		};
		Ia[t] = ji(`urd-draft-samling-${t}`, () => null, S), Ia[t].replace(n), Ia[t].save(), Fa.data.samlinger = [...V(Ba), t], Fa.save(), I(Ba, [...V(Ba), t], !0), I(Ha, t, !0), I(Ga, ""), A(), co();
	}
	function mo(e) {
		Ie("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete Ia[e], Fa.data.samlinger = V(Ba).filter((t) => t !== e), Fa.save(), I(Ba, V(Ba).filter((t) => t !== e), !0), V(Ha) === e && I(Ha, null), A(), co();
	}
	function ho(e) {
		uo(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Xa("innslag"),
				title: Z("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function go(e, t, n, r) {
		uo(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function _o(e, t, n) {
		uo(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function vo(e, t) {
		uo(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function So(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && go(e, t, "image", (await Hn(r)).dataUrl);
	}
	let Co = null, wo, To = new Promise((e) => {
		wo = e;
	}), Eo = /* @__PURE__ */ F(null), Do = tn({}), Oo = /* @__PURE__ */ F("0.0.0"), ko = /* @__PURE__ */ F(""), Ao = /* @__PURE__ */ F(""), jo = /* @__PURE__ */ F(tn([])), Mo = /* @__PURE__ */ F(tn([])), No = /* @__PURE__ */ F("pending"), Po = () => [.../* @__PURE__ */ new Set([...V(Eo)?.enabled ?? [], ...V(Eo)?.disabled ?? []])];
	function Fo() {
		I(Eo, JSON.parse(JSON.stringify(Co.data)), !0);
	}
	let Io = /* @__PURE__ */ F(null);
	async function Lo() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				I(Io, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			I(Io, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src")
			}, !0);
		} catch {
			I(Io, { unknown: !0 }, !0);
		}
	}
	function Ro(e) {
		let t = [...(e.connectSrc ?? []).map((e) => ["connect-src", e]), ...(e.frameSrc ?? []).map((e) => ["frame-src", e])];
		if (!V(Io) || V(Io).unknown) return [];
		let n = {
			"connect-src": V(Io).connectSrc,
			"frame-src": V(Io).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function zo() {
		Lo();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		I(Mo, e.enabled ?? [], !0), Co = ji("urd-draft-plugins", () => e, S), Fo();
		try {
			I(Oo, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Po()) Uo(e);
		Bo(), wo(), O?.sendPlugins(Be(V(Eo))?.enabled ?? []);
	}
	async function Bo() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Vo();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), I(jo, (t ?? []).filter((e) => !Po().includes(e)), !0);
			for (let e of V(jo)) Uo(e);
			I(No, "ok");
		} catch {
			Vo();
		}
	}
	function Vo() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				I(jo, e.filter((e) => !Po().includes(e)), !0);
				for (let e of V(jo)) Uo(e);
				I(No, "ok");
				return;
			}
		} catch {}
		I(No, "unavailable");
	}
	async function Uo(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Ya(t);
			Do[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && qa(V(Oo), t.requiresEngine)
			};
		} catch {
			Do[e] = {
				name: e,
				errors: [Z("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Ko(e, t) {
		Ie("plugins");
		let n = Co.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Co.save(), A(), Fo(), qo();
	}
	function qo() {
		V(w) && (V(w).src = V(w).src);
	}
	function Yo(e) {
		Ie("plugins");
		let t = Co.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Co.save(), A(), Fo(), qo();
	}
	async function Xo() {
		I(Ao, "");
		let e = V(ko).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			I(Ao, Z("plugin.invalidId"), !0);
			return;
		}
		if (Po().includes(e)) {
			I(Ao, Z("plugin.alreadyListed"), !0);
			return;
		}
		if (await Uo(e), Do[e].errors.length) {
			I(Ao, Z("plugin.invalidManifest", { errors: Do[e].errors.join("; ") }), !0);
			return;
		}
		Ko(e, !0), I(ko, "");
	}
	function Zo(e) {
		I(jo, V(jo).filter((t) => t !== e), !0), Ko(e, !0);
	}
	function $o(e, t) {
		gi(e, () => {
			V(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(V(k).footer);
		});
	}
	function es(e, t) {
		$o(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function os(e) {
		$o("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function ss(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await Hn(t);
			$o("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Z("status.imageReadErrorSvg"), "error");
		}
	}
	function cs() {
		$o("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function ls(e) {
		$o("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function us(e) {
		$o("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let ds = [
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
			id: "sentrert",
			label: Z("footerTemplate.sentrert"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: Z("footerTemplate.kolonner"),
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
			id: "nyhetsbrev",
			label: Z("footerTemplate.nyhetsbrev"),
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
			label: Z("footerTemplate.storcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: Z("footerTemplate.kontakt"),
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
		}
	];
	function fs(e) {
		let t = Z("seed.orgName"), n = V(k).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Z("seed.footer.madeWith")}`
		} : e === "kolonner" ? {
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
		} : e === "nyhetsbrev" ? {
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
		} : e === "storcta" ? {
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
		} : e === "kontakt" ? {
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
						a(Z("seed.email"), "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
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
				links: [a(Z("seed.footer.newsletter"), "#"), a(Z("seed.email"), "mailto:post@dinforening.no")]
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
					version: vs.version ?? 1,
					props: {
						...vs.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: bs.version ?? 1,
					props: {
						...bs.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function ps(e) {
		$o("footer-template", (t) => {
			let n = fs(e);
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
	function ms(e) {
		$o("footer", (t) => {
			t[e] ??= [], t[e].push(V(k).pages[0] ? {
				label: Z("seed.link"),
				page: V(k).pages[0].id
			} : {
				label: Z("seed.link"),
				href: "https://"
			});
		});
	}
	function hs(e, t) {
		$o("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function gs(e, t, n) {
		$o("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function ys(e, t, n) {
		$o(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function xs(e, t, n) {
		$o("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ss(e, t, n) {
		$o(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function Cs(e) {
		$o("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function ws(e) {
		$o("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Z("seed.join")
			} : delete t.cta;
		});
	}
	function Ts(e, t) {
		$o(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Es(e) {
		$o("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function Ds(e, t) {
		$o("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Os() {
		$o("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Z("seed.column"),
				links: [{
					label: Z("seed.link"),
					page: V(k).pages[0].id
				}]
			});
		});
	}
	function ks(e) {
		$o("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function As(e, t) {
		$o("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function js(e, t) {
		$o(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Ms(e) {
		$o("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function Ns(e, t) {
		$o("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Ps(e, t, n) {
		$o("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Fs(e, t, n) {
		$o(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Is(e, t, n) {
		$o("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ls(e, t, n) {
		$o(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Rs() {
		$o("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function zs(e) {
		$o("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Bs(e, t) {
		$o("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Vs(e, t) {
		$o("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Hs(e, t) {
		$o(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Us = ua.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, la[e].label]));
	function Gs(e, t) {
		gi(`edit:nav-label-${e}`, () => {
			V(k).nav.items[e].label = t;
		});
	}
	function Ks(e, t) {
		gi("nav", () => {
			let n = V(k).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function qs(e, t) {
		gi(`edit:nav-href-${e}`, () => {
			V(k).nav.items[e].href = t;
		});
	}
	function Xs(e, t) {
		let n = e + t, r = V(k).nav.items;
		n < 0 || n >= r.length || gi("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Zs(e) {
		gi("nav", () => {
			V(k).nav.items.splice(e, 1);
		});
	}
	function dd() {
		gi("nav", () => {
			V(k).nav.items.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function fd(e) {
		gi("nav", () => {
			let t = V(k).nav.items[e];
			t.children ??= [], t.children.push({
				label: Z("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function pd(e, t, n) {
		gi(`edit:nav-child-label-${e}-${t}`, () => {
			V(k).nav.items[e].children[t].label = n;
		});
	}
	function md(e, t, n) {
		gi("nav", () => {
			let r = V(k).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function hd(e, t, n) {
		gi(`edit:nav-child-href-${e}-${t}`, () => {
			V(k).nav.items[e].children[t].href = n;
		});
	}
	function gd(e, t, n) {
		let r = t + n, i = V(k).nav.items[e].children;
		r < 0 || r >= i.length || gi("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function _d(e, t) {
		gi("nav", () => {
			let n = V(k).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = V(k).pages[0].id));
		});
	}
	function vd(e, t) {
		gi(`edit:theme-color-${e}`, () => {
			V(k).theme.tokens.color[e] = t, V(k).theme.alt?.auto && (V(k).theme.alt.tokens.color = Sd());
		});
	}
	function yd(e, t) {
		gi("theme", () => {
			V(k).theme.tokens.font[e] = t;
		});
	}
	function bd(e, t) {
		gi("theme", () => {
			V(k).theme.tokens.radius[e] = t;
		});
	}
	function xd(e) {
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
	function Sd() {
		return Object.fromEntries(Object.entries(V(k).theme.tokens.color).map(([e, t]) => [e, xd(t)]));
	}
	function Cd(e, t) {
		gi(`edit:theme-alt-${e}`, () => {
			V(k).theme.alt.tokens.color[e] = t, V(k).theme.alt.auto = !1;
		});
	}
	function wd(e) {
		gi("theme", () => {
			e === "light" ? delete V(k).theme.scheme : V(k).theme.scheme = e;
		});
	}
	function Td(e) {
		gi("theme", () => {
			e ? V(k).theme.alt = {
				auto: !0,
				tokens: { color: Sd() }
			} : delete V(k).theme.alt;
		});
	}
	function Ed(e) {
		gi("theme", () => {
			V(k).theme.alt ??= { tokens: { color: Sd() } }, V(k).theme.alt.auto = e, e && (V(k).theme.alt.tokens.color = Sd());
		});
	}
	function Dd(e) {
		let t = V(k).theme.tokens.font[e];
		return [...$s.some(([, e]) => e === t) ? [] : [[t, Z("opt.customFont")]], ...$s.map(([e, t]) => [t, Z(e)])];
	}
	let Od = (e) => parseInt(e, 10) || 0;
	function kd(e, t) {
		bd(e, `${t}px`);
	}
	let Ad = (e, t) => e && t && t[e] ? t[e] : e, jd = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Md = [
		{
			id: "bronn",
			name: Z("themePreset.bronn.name"),
			note: Z("themePreset.bronn.note"),
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
			name: Z("themePreset.stein.name"),
			note: Z("themePreset.stein.note"),
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
			name: Z("themePreset.plomme.name"),
			note: Z("themePreset.plomme.note"),
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
			id: "hav",
			name: Z("themePreset.hav.name"),
			note: Z("themePreset.hav.note"),
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
			name: Z("themePreset.natt.name"),
			note: Z("themePreset.natt.note"),
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
	function Nd(e) {
		gi("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of jd) V(k).theme.tokens.color[e] = n[e];
			t ? V(k).theme.scheme = "dark" : delete V(k).theme.scheme, V(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Pd = /* @__PURE__ */ N(() => {
		if (!V(k)) return null;
		let e = V(k).theme.tokens.color, t = V(k).theme.alt?.tokens?.color ?? {}, n = V(k).theme.scheme === "dark";
		return Md.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return jd.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function Fd() {
		I(E, !V(E)), O?.sendChrome(V(E));
	}
	function Id(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Ie(`edit:${e.blockId}`), n.props = e.props, D.save(), A(), V(M)?.blockId === e.blockId && St(), e.rerender && O?.sendSection(V(g), t), I(v, ""));
	}
	function Ld(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		Ie(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && Te(t, "desktop-changed-after-mobile"), D.save(), A(), V(M)?.blockId === e.blockId && St();
	}
	function Rd(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (D.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), D.hasDraft() && Ie(`edit:${e.blockId}`), t.frames.desktop.h = e.h, D.save(), A(), V(M)?.blockId === e.blockId && St());
	}
	function zd(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (Ie("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!we(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), D.save(), A(), xe(), O?.sendSection(V(g), t);
		}
	}
	function Bd(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (Ie("mobile-order"), n.mobileOrder = e.mobileOrder, D.save(), A(), O?.sendSection(V(g), t));
	}
	function Vd(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (Ie("review-done"), t.responsive.mobile.attention = null, D.save(), A(), xe());
	}
	function Hd(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Ie("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), D.save(), A(), typeof e.hideMobile == "boolean" && V(ie) === "mobile" && O?.sendSection(V(g), t), V(M)?.blockId === e.blockId && St());
	}
	function Ud(e) {
		Ie("add-section"), e.section.id || (e.section.id = Xa("sec")), D.data.sections.splice(e.index, 0, e.section), D.save(), A(), O?.sendPage(V(g), D.data), I($t, e.section.id, !0), ln(e.section), I(ct, "properties");
	}
	function Wd(e) {
		let t = D.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (Ie("move-section"), [t[n], t[r]] = [t[r], t[n]], D.save(), A(), O?.sendPage(V(g), D.data));
	}
	function Gd(e) {
		Ie("delete-section"), e.sectionId === V($t) && (I($t, null), I(en, null)), V(M)?.sectionId === e.sectionId && I(M, null), D.data.sections = D.data.sections.filter((t) => t.id !== e.sectionId), D.save(), A(), O?.sendPage(V(g), D.data);
	}
	function Kd(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Ie("section-size"), t.size = {
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
			e.moves?.length && (Te(t, "section-height"), V(M)?.sectionId === e.sectionId && St()), e.sectionId === V($t) && I(rn, e.minHeight, !0), D.save(), A();
		}
	}
	function qd(e) {
		let t = D.data.sections.find((t) => t.id === e.fromSectionId), n = D.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (Ie("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Te(t, "block-moved"), Te(n, "block-moved"), D.save(), A(), xe(), O?.sendPage(V(g), D.data), V(M)?.blockId === e.blockId && (I(M, {
			...V(M),
			sectionId: e.toSectionId
		}, !0), St()));
	}
	function Jd(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		Ie("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(V(M)?.blockId) && I(M, null), Te(t, "block-deleted"), D.save(), A(), O?.sendSection(V(g), t);
	}
	let Yd = {
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
		tidslinje: {
			type: "tidslinje",
			props: {
				items: [
					{
						year: "2019",
						title: Z("seed.tidslinje.t1"),
						text: Z("seed.tidslinje.text")
					},
					{
						year: "2022",
						title: Z("seed.tidslinje.t2"),
						text: Z("seed.tidslinje.text")
					},
					{
						year: "2026",
						title: Z("seed.tidslinje.t3"),
						text: Z("seed.tidslinje.text")
					}
				],
				variant: "venstre",
				marker: "fylt",
				accent: null
			},
			w: 42,
			h: 260
		},
		sitat: {
			type: "sitat",
			props: {
				text: Z("seed.sitat.text"),
				attribution: Z("seed.sitat.name"),
				role: Z("seed.sitat.role"),
				variant: "stor",
				image: "",
				accent: null
			},
			w: 44,
			h: 180
		},
		statistikk: {
			type: "statistikk",
			props: {
				value: "4800",
				prefix: "",
				suffix: "+",
				label: Z("seed.statistikk.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		}
	};
	function Xd(e) {
		let t = Yd[e];
		return t ? {
			id: Xa("blk"),
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
	function Zd(e) {
		O ? O.sendPlaceBlock(e) : Qd(yr()?.id, e);
	}
	function Qd(e, t) {
		let n = D.data.sections.find((t) => t.id === e) ?? D.data.sections[0];
		if (!n) return;
		Ie("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Te(n, "block-added"), D.save(), A(), O?.sendSection(V(g), n);
	}
	function $d(e, t, n, r) {
		let i = D.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		Ie("add-blocks");
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
		}), Te(i, "block-added"), D.save(), A(), O?.sendSection(V(g), i);
	}
	function ef(e) {
		Zd(Xd(e));
	}
	let tf = /* @__PURE__ */ F(tn([]));
	function nf(e, t = {}) {
		let n = Be(e);
		Zd({
			id: Xa("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...Be(t)
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
	let rf = /* @__PURE__ */ F("");
	function af() {
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
				label: Z("blocks.samling"),
				act: "block",
				kind: "samling"
			},
			{
				label: Z("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Z("blocks.tidslinje"),
				act: "block",
				kind: "tidslinje"
			},
			{
				label: Z("blocks.sitat"),
				act: "block",
				kind: "sitat"
			},
			{
				label: Z("blocks.statistikk"),
				act: "block",
				kind: "statistikk"
			},
			{
				label: Z("ui.emptyGallery"),
				act: "block",
				kind: "galleri"
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
		for (let t of V(eo)) {
			let n = $[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "mal",
				id: t
			});
		}
		for (let t of V(tf)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function of(e) {
		e.act === "block" ? ef(e.kind) : e.act === "plugin" ? nf(e.entry, e.props ?? {}) : e.act === "mal" && O?.sendInsertTemplate(e.id);
	}
	function sf(e) {
		let t = Xd(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = D.data.sections.find((t) => t.id === e.sectionId)?.grid ?? V(k).grid, r = ec({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Qd(e.sectionId, t), O?.sendSelect(t.id), e.kind === "image" && x(Z("status.imageBlockAdded")), e.kind === "galleri" && x(Z("status.galleryBlockAdded"));
		}
	}
	async function cf(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Z("status.compressingImage"));
		let n;
		try {
			n = await Hn(t);
		} catch {
			x(Z("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (V(w)?.clientWidth ?? 1280));
		Zd({
			id: Xa("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ea(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(Z("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function lf(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await Hn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: ea(i.name).replaceAll("-", " "),
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
	function uf(e, t, n) {
		t ? x(Z("status.imagesReadFailed", { n: t }), "error") : n ? x(Z("status.imagesLarge", { n }), "error") : x(e ? "" : Z("status.noImagesAdded"));
	}
	async function df(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await lf(t);
		n.length && Ot("galleri-add", (e) => {
			e.props.images.push(...n);
		}), uf(n.length, r, i);
	}
	async function ff(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Z("status.compressingImages"));
		let { images: n, failed: r, big: i } = await lf(t);
		if (!n.length) {
			uf(0, r, i);
			return;
		}
		let a = Xd("galleri");
		a.props.images = n, Zd(a), uf(n.length, r, i);
	}
	function pf(e, t) {
		Ot("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function mf(e) {
		Ot("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function hf(e, t, n) {
		Ot(`edit:${V(M).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function gf(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${ea(n || "bilde")}-${ta(a)}.${$i(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function _f(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && gf(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) gf(e, "src", "bakgrunn", t);
	}
	function vf(e, t) {
		if (e.type === "image" && gf(e.props, "src", e.props.alt, t), e.type === "icon" && gf(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) gf(n, "src", n.alt || "galleri", t);
	}
	function yf(e, t) {
		_f(e.background, t);
		for (let n of e.blocks) vf(n, t);
	}
	function bf(e) {
		let t = [];
		for (let n of e.sections) yf(n, t);
		return t;
	}
	function xf(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && gf(n, "value", "logo", t), n?.type === "both" && gf(n, "image", "logo", t), e.nav?.style && gf(e.nav.style, "image", "meny", t), _f(e.nav?.style?.background, t), _f(e.footer?.background, t), e.footer?.brand && gf(e.footer.brand, "logo", "footer-logo", t), gf(e.site, "icon", "ikon", t), t;
	}
	let Sf = /* @__PURE__ */ F(!1), Cf = /* @__PURE__ */ F(null);
	function wf() {
		I(Sf, !V(Sf));
	}
	function Tf() {
		I(Sf, !1), Ef();
	}
	bn(() => {
		if (!V(Sf)) return;
		let e = (e) => {
			V(Cf)?.contains(e.target) || I(Sf, !1);
		}, t = (e) => {
			e.key === "Escape" && I(Sf, !1);
		}, n = () => I(Sf, !1);
		return window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Ef() {
		Ie("discard");
		for (let e of V(k).pages) e.id !== V(g) && !ke.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = D.reset();
		if (Ee.reset(), Co && (Co.reset(), Fo()), Fa) {
			Fa.reset(), I(Ba, [...Fa.data.samlinger ?? []], !0);
			for (let e of Object.keys(Ia)) V(Ba).includes(e) ? Ia[e].reset() : delete Ia[e];
			co();
		}
		if (Za) {
			Za.reset(), I(eo, [...Za.data.maler ?? []], !0);
			for (let e of Object.keys($)) V(eo).includes(e) ? $[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete $[e]);
			no();
		}
		De(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), A(), I(v, ""), Oe(), V(k).pages.some((e) => e.id === V(g)) ? O?.sendPage(V(g), e) : Yr(V(k).pages[0].id);
	}
	async function Df() {
		if (Pr) {
			x(Z("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (V(Br)) {
			x(Z("update.publishBlocked"), "error");
			return;
		}
		x(Z("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of V(k).pages) {
			let a = `urd-draft-${i.id}`, o = ke.has(i.id) || !V(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === V(g) && (D.hasDraft() || o)) s = D.data;
			else if (i.id !== V(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Wa(JSON.parse(e), Ee.data);
				} catch {}
			}
			if (!s && o && (s = Jr(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...bf(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (Ee.hasDraft()) {
			let r = JSON.parse(JSON.stringify(V(k)));
			e.push(...xf(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: Qo(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(V(h).theme, V(k).theme) || t.push("tema"), i(V(h).nav, V(k).nav) || t.push("menyen"), i(V(h).footer, V(k).footer) || t.push("footeren"), i(V(h).pages, V(k).pages) || t.push("sideregisteret"), i(V(h).grid, V(k).grid) || t.push("gridet"), (V(h).site.icon ?? null) !== (V(k).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = V(h).site, { icon: s, ...c } = V(k).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Ia).filter(([, e]) => e.hasDraft());
		if (i.length || Fa?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) gf(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Fa?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Fa.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!V(Ba).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries($).filter(([, e]) => e.hasDraft());
		if (a.length || Za?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && yf(i.section, e);
				for (let t of i.blocks ?? []) vf(t, e);
				for (let t of i.page?.sections ?? []) yf(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Za?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Za.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!V(eo).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		Co?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Co.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of V(k).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		let o = new Set(e.map((e) => e.path)), s = (t) => {
			o.has(t) || e.push({
				path: t,
				delete: !0
			});
		};
		for (let e of V(h).pages) {
			let t = V(k).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Or(e);
		if (!c.ok) {
			x(Z("status.publishAborted"), "error");
			return;
		}
		let l = {
			message: `Oppdater ${t.join(", ") || "nettstedet"} via Urd-admin`,
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
			let { sha: e } = await u.json().catch(() => ({}));
			e ? Er = e : Dr(), bf(D.data), xf(V(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ke.add(e);
			if (I(h, JSON.parse(JSON.stringify(V(k))), !0), Ee = ji("urd-draft-site", () => V(h), S), De(), Co) {
				let e = JSON.parse(JSON.stringify(Co.data));
				Co = ji("urd-draft-plugins", () => e, S), Fo();
			}
			if (Fa) {
				for (let e of Object.values(Ia)) for (let t of e.data.entries) gf(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Fa.data));
				Fa = ji("urd-draft-samlinger", () => e, S), La = {};
				for (let e of V(Ba)) {
					if (!Ia[e]) continue;
					let t = JSON.parse(JSON.stringify(Ia[e].data));
					La[e] = t, Ia[e] = ji(`urd-draft-samling-${e}`, () => t, S);
				}
				co();
			}
			if (Za) {
				for (let e of Object.values($)) {
					e.data?.section && yf(e.data.section, []);
					for (let t of e.data?.blocks ?? []) vf(t, []);
					for (let t of e.data?.page?.sections ?? []) yf(t, []);
				}
				let e = JSON.parse(JSON.stringify(Za.data));
				Za = ji("urd-draft-maler", () => e, S), Qa = {};
				for (let e of V(eo)) {
					if (!$[e]) continue;
					let t = JSON.parse(JSON.stringify($[e].data));
					Qa[e] = t, $[e] = ji(`urd-draft-mal-${e}`, () => t, S);
				}
				no();
			}
			I(ee, {
				snap: !0,
				...V(k).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(D.data));
			D = ji(`urd-draft-${V(g)}`, () => t, S), ke.has(V(g)) && C(`urd-draft-${V(g)}`, JSON.stringify(t)), A(), x(Z("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? Z("status.loginExpired") : Z("status.loginRequired", { reason: Ei(e) ?? Z("status.unknownReason") }), "error"), await Tr();
		} else u?.status === 403 ? x(Ei(await u.json().catch(() => null)) ?? Z("status.noPublishAccess"), "error") : u?.status === 409 ? x(Z("status.publishRace"), "error") : x(u ? Ei(await u.json().catch(() => null)) ?? Z("status.publishFailed") : Z("status.publishUnavailable"), "error");
	}
	Je();
	var Of = ud();
	Sr("keydown", nn, qe), Sr("pointerdown", nn, Ke);
	var kf = R(Of), Af = L(kf), jf = (e) => {
		var t = ul(), n = L(t);
		q(n, () => c.pencil);
		var r = z(n);
		j(t), B((e, n) => {
			X(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Z("tip.backToEdit"), () => Z("ui.edit")]), H("click", t, Fd), W(e, t);
	};
	K(Af, (e) => {
		V(E) || e(jf);
	});
	var Mf = z(Af, 2);
	let Nf;
	var Pf = L(Mf), Ff = L(Pf), If = (e) => {
		var t = xl(), n = R(t), r = L(n, !0);
		j(n);
		var i = z(n, 2), a = L(i), o = (e) => {
			var t = pl(), n = L(t);
			let r;
			var i = L(n);
			q(i, () => c[`device_${V(ne)}`]), q(z(i), () => c.caret), j(n);
			var a = z(n, 2), o = (e) => {
				var t = fl();
				Vr(t, 21, () => te, (e) => e.id, (e, t) => {
					var n = dl();
					let r;
					var i = L(n);
					q(i, () => c[`device_${V(t).id}`]);
					var a = z(i);
					j(n), B((e, i) => {
						r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ne) === V(t).id }), X(n, "title", e), G(a, ` ${i ?? ""}`);
					}, [() => Z(`tip.view.${V(t).id}`, {
						w: V(t).width ?? V(de),
						c: Ma(V(Hi), V(Wi), V(t).width ?? V(de)).width
					}), () => Z(`lbl.device.${V(t).id}`)]), H("click", n, () => {
						I(ne, V(t).id, !0), I(si, null);
					}), W(e, n);
				}), j(t), W(e, t);
			};
			K(a, (e) => {
				V(si) === "device" && e(o);
			}), j(t), B((e) => {
				r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(si) === "device" }), X(n, "title", e);
			}, [() => Z("lbl.group.device")]), H("click", n, () => I(si, V(si) === "device" ? null : "device", !0)), W(e, t);
		}, s = (e) => {
			var t = hl(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2);
			Vr(i, 21, () => te, (e) => e.id, (e, t) => {
				var n = ml();
				let r;
				q(n, () => c[`device_${V(t).id}`], !0), j(n), B((e) => {
					r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(ne) === V(t).id }), X(n, "title", e);
				}, [() => Z(`tip.view.${V(t).id}`, {
					w: V(t).width ?? V(de),
					c: Ma(V(Hi), V(Wi), V(t).width ?? V(de)).width
				})]), H("click", n, () => I(ne, V(t).id, !0)), W(e, n);
			}), j(i), B((e) => G(r, e), [() => Z("lbl.group.device")]), W(e, t);
		};
		K(a, (e) => {
			ui.device ? e(o) : e(s, -1);
		});
		var l = z(a, 2), u = (e) => {
			var t = _l(), n = L(t);
			let r;
			var i = L(n), a = L(i);
			j(i), q(z(i), () => c.caret), j(n);
			var o = z(n, 2), s = (e) => {
				var t = gl(), n = L(t), r = L(n);
				q(r, () => c.minus, !0), j(r);
				var i = z(r, 2), a = L(i);
				j(i);
				var o = z(i, 2);
				q(o, () => c.plus, !0), j(o), j(n);
				var s = z(n, 2);
				let l;
				var u = L(s);
				q(u, () => c.fit);
				var d = z(u);
				j(s), j(t), B((e, t, n, c, u, f) => {
					X(r, "title", e), X(i, "title", t), G(a, `${n ?? ""}%`), X(o, "title", c), l = Qr(s, 1, "ghost svelte-1n46o8q", null, l, { active: V(le) === "fit" }), X(s, "title", u), G(d, ` ${f ?? ""}`);
				}, [
					() => Z("tip.zoomOut"),
					() => Z("tip.zoomCurrent"),
					() => Math.round(V(me) * 100),
					() => Z("tip.zoomIn"),
					() => Z("tip.zoomFit"),
					() => Z("lbl.zoom.fit")
				]), H("click", r, () => he(-1)), H("click", o, () => he(1)), H("click", s, () => I(le, "fit")), W(e, t);
			};
			K(o, (e) => {
				V(si) === "zoom" && e(s);
			}), j(t), B((e, t) => {
				r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(si) === "zoom" }), X(n, "title", e), G(a, `${t ?? ""}%`);
			}, [() => Z("lbl.group.zoom"), () => Math.round(V(me) * 100)]), H("click", n, () => I(si, V(si) === "zoom" ? null : "zoom", !0)), W(e, t);
		}, d = (e) => {
			var t = vl(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2), a = L(i);
			q(a, () => c.minus, !0), j(a);
			var o = z(a, 2), s = L(o);
			j(o);
			var l = z(o, 2);
			q(l, () => c.plus, !0), j(l);
			var u = z(l, 2);
			let d;
			q(u, () => c.fit, !0), j(u), j(i), B((e, t, n, i, c, f) => {
				G(r, e), X(a, "title", t), X(o, "title", n), G(s, `${i ?? ""}%`), X(l, "title", c), d = Qr(u, 1, "ghost svelte-1n46o8q", null, d, { active: V(le) === "fit" }), X(u, "title", f);
			}, [
				() => Z("lbl.group.zoom"),
				() => Z("tip.zoomOut"),
				() => Z("tip.zoomCurrent"),
				() => Math.round(V(me) * 100),
				() => Z("tip.zoomIn"),
				() => Z("tip.zoomFit")
			]), H("click", a, () => he(-1)), H("click", l, () => he(1)), H("click", u, () => I(le, "fit")), W(e, t);
		};
		K(l, (e) => {
			ui.zoom ? e(u) : e(d, -1);
		});
		var f = z(l, 2), p = (e) => {
			var t = pl(), n = L(t);
			let r;
			var i = L(n);
			q(i, () => c.gridToggle), q(z(i), () => c.caret), j(n);
			var a = z(n, 2), o = (e) => {
				var t = yl(), n = L(t);
				let r;
				var i = L(n);
				q(i, () => c.gridToggle);
				var a = z(i);
				j(n);
				var o = z(n, 2);
				let s;
				var l = L(o);
				q(l, () => c.guides);
				var u = z(l);
				j(o), j(t), B((e, t, i, c) => {
					r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(fi) }), X(n, "title", e), G(a, ` ${t ?? ""}`), s = Qr(o, 1, "ghost svelte-1n46o8q", null, s, { active: V($r) }), X(o, "title", i), G(u, ` ${c ?? ""}`);
				}, [
					() => Z("tip.gridToggle"),
					() => Z("lbl.view.grid"),
					() => Z("tip.guides"),
					() => Z("lbl.view.guides")
				]), H("click", n, mi), H("click", o, di), W(e, t);
			};
			K(a, (e) => {
				V(si) === "view" && e(o);
			}), j(t), B((e) => {
				r = Qr(n, 1, "ghost svelte-1n46o8q", null, r, { active: V(si) === "view" || V(fi) || V($r) }), X(n, "title", e);
			}, [() => Z("lbl.group.view")]), H("click", n, () => I(si, V(si) === "view" ? null : "view", !0)), W(e, t);
		}, m = (e) => {
			var t = bl(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2), a = L(i);
			let o;
			q(a, () => c.gridToggle, !0), j(a);
			var s = z(a, 2);
			let l;
			q(s, () => c.guides, !0), j(s), j(i), B((e, t, n) => {
				G(r, e), o = Qr(a, 1, "ghost svelte-1n46o8q", null, o, { active: V(fi) }), X(a, "title", t), l = Qr(s, 1, "ghost svelte-1n46o8q", null, l, { active: V($r) }), X(s, "title", n);
			}, [
				() => Z("lbl.group.view"),
				() => Z("tip.gridToggle"),
				() => Z("tip.guides")
			]), H("click", a, mi), H("click", s, di), W(e, t);
		};
		K(f, (e) => {
			ui.view ? e(p) : e(m, -1);
		}), j(i), pi(i, (e) => I(ci, e), () => V(ci)), B((e, t) => {
			X(n, "title", e), G(r, t);
		}, [() => Z("tip.switchPage"), () => Ae()?.title ?? ""]), H("click", n, () => bt("pages")), W(e, t);
	};
	K(Ff, (e) => {
		V(h) && e(If);
	});
	var Lf = z(Ff, 2), Rf = (e) => {
		var t = Sl(), n = L(t);
		q(n, () => c.phone);
		var r = z(n, 2), i = L(r, !0);
		j(r);
		var a = z(r, 2), o = L(a, !0);
		j(a), j(t), B((e, n) => {
			X(t, "title", e), G(i, n), G(o, V(be));
		}, [() => Z("tip.attention"), () => Z(V(be) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: V(be) })]), H("click", t, Se), W(e, t);
	};
	K(Lf, (e) => {
		V(be) > 0 && e(Rf);
	}), j(Pf);
	var zf = z(Pf, 2), Bf = L(zf), Vf = (e) => {
		var t = wl(), n = R(t), r = L(n), i = L(r, !0);
		j(r), Ne(2), j(n);
		var a = z(n, 2), o = L(a);
		let s;
		var l = L(o);
		q(l, () => c.restore);
		var u = z(l), d = L(u, !0);
		j(u), j(o);
		var f = z(o, 2), p = (e) => {
			var t = Cl(), n = L(t);
			q(n, () => c.restore);
			var r = z(n);
			j(t), B((e, n) => {
				X(t, "title", e), G(r, ` ${n ?? ""}`);
			}, [() => Z("tip.discardArmed"), () => Z("ui.discardConfirm")]), H("click", t, Tf), W(e, t);
		};
		K(f, (e) => {
			V(Sf) && e(p);
		}), j(a), pi(a, (e) => I(Cf, e), () => V(Cf)), B((e, t, r, a, c) => {
			X(n, "title", e), X(n, "aria-label", t), G(i, r), s = Qr(o, 1, "discard-dot svelte-1n46o8q", null, s, { armed: V(Sf) }), X(o, "title", a), G(d, c);
		}, [
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => Z("ui.unpublished"),
			() => V(Sf) ? Z("tip.discardArmed") : Z("tip.discard"),
			() => Z("ui.discard")
		]), H("click", o, wf), W(e, t);
	};
	K(Bf, (e) => {
		V(_) && e(Vf);
	}), j(zf);
	var Hf = z(zf, 2), Uf = L(Hf), Wf = (e) => {
		var t = Ol(), n = R(t), r = L(n), i = (e) => {
			var t = Tl(), n = R(t);
			q(n, () => c.eye);
			var r = z(n, 2), i = L(r, !0);
			j(r), B((e) => G(i, e), [() => Z("ui.cleanView")]), W(e, t);
		}, a = (e) => {
			var t = Tl(), n = R(t);
			q(n, () => c.pencil);
			var r = z(n, 2), i = L(r, !0);
			j(r), B((e) => G(i, e), [() => Z("ui.edit")]), W(e, t);
		};
		K(r, (e) => {
			V(E) ? e(i) : e(a, -1);
		}), j(n);
		var o = z(n, 2), s = (e) => {
			var t = El(), n = L(t), r = (e) => {
				var t = jr();
				q(R(t), () => c.warn), W(e, t);
			};
			K(n, (e) => {
				V(T).allowed || e(r);
			});
			var i = z(n, 1, !0);
			j(t), B((e) => {
				X(t, "title", e), G(i, V(T).login);
			}, [() => V(T).allowed ? Z("tip.hasPublishAccess") : Z("tip.noPublishAccess")]), W(e, t);
		}, l = (e) => {
			var t = Dl(), n = L(t, !0);
			j(t), B((e) => G(n, e), [() => Z("ui.loginGitHub")]), W(e, t);
		};
		K(o, (e) => {
			V(T)?.loggedIn ? e(s) : V(T) && e(l, 1);
		});
		var u = z(o, 2), d = L(u);
		q(d, () => c.external);
		var f = z(d, 2), p = L(f, !0);
		j(f), j(u);
		var m = z(u, 2), h = L(m, !0);
		j(m), B((e, t, r, i, a) => {
			X(n, "title", e), X(u, "href", t), X(u, "title", r), G(p, i), m.disabled = !V(_), G(h, a);
		}, [
			() => V(E) ? Z("tip.chromeHide") : Z("tip.chromeShow"),
			() => Ae()?.path ?? "/",
			() => Z("ui.viewSite"),
			() => Z("ui.viewSite"),
			() => Z("ui.publish")
		]), H("click", n, Fd), H("click", m, Df), W(e, t);
	};
	K(Uf, (e) => {
		V(h) && e(Wf);
	}), j(Hf), j(Mf);
	var Gf = z(Mf, 2), Kf = (e) => {
		var t = rd(), i = L(t), o = (e) => {
			var t = nd(), i = R(t), o = L(i);
			Vr(o, 17, () => lt, Lr, (e, t, n) => {
				var r = Al(), i = R(r), a = L(i, !0);
				j(i), Vr(z(i, 2), 16, () => V(t), (e) => e, (e, t) => {
					var n = kl();
					let r;
					var i = L(n, !0);
					j(n), B(() => {
						r = Qr(n, 1, "svelte-1n46o8q", null, r, { active: V(ct) === t }), G(i, dt[t]);
					}), H("click", n, () => bt(t)), W(e, n);
				}), B((e) => G(a, e), [() => Z(ut[n])]), W(e, r);
			});
			var s = z(o, 2), f = z(L(s), 2);
			let p;
			q(f, () => c.gear, !0), j(f);
			var h = z(f, 2), _ = (e) => {
				var t = jl(), n = L(t), r = L(n, !0);
				j(n);
				var i = z(n, 2), a = L(i);
				Q(z(a), {
					get value() {
						return V(u);
					},
					get options() {
						return l;
					},
					onchange: (e) => I(u, e, !0)
				}), j(i);
				var o = z(i, 2), s = L(o), c = z(s);
				{
					let e = /* @__PURE__ */ N(() => [["auto", Z("lang.auto")], ...gt()]);
					Q(c, {
						get value() {
							return vt;
						},
						get options() {
							return V(e);
						},
						onchange: yt
					});
				}
				j(o);
				var d = z(o, 2), f = L(d), p = z(f);
				{
					let e = /* @__PURE__ */ N(() => [["strip", Z("settings.layoutPickerStrip")], ["menu", Z("settings.layoutPickerMenu")]]);
					Q(p, {
						get value() {
							return V(ni);
						},
						get options() {
							return V(e);
						},
						onchange: ri
					});
				}
				j(d), j(t), B((e, t, n, c, l, u, p) => {
					G(r, e), X(i, "title", t), G(a, `${n ?? ""} `), X(o, "title", c), G(s, `${l ?? ""} `), X(d, "title", u), G(f, `${p ?? ""} `);
				}, [
					() => Z("settings.title"),
					() => Z("topbar.adminTheme.title"),
					() => Z("settings.theme"),
					() => Z("topbar.language.title"),
					() => Z("settings.language"),
					() => Z("tip.settings.layoutPicker"),
					() => Z("settings.layoutPicker")
				]), W(e, t);
			};
			K(h, (e) => {
				V(ti) && e(_);
			}), j(s), pi(s, (e) => I(ii, e), () => V(ii)), j(i);
			var v = z(i, 2), y = (e) => {
				var t = td(), i = L(t), o = L(i, !0);
				j(i);
				var s = z(i, 2), l = (e) => {
					var t = Bl(), n = L(t);
					Vr(n, 17, () => V(k).pages, (e) => e.id, (e, t) => {
						var n = Il();
						let r;
						var i = L(n);
						J(i);
						var a = z(i, 2), o = (e) => {
							var t = Ml();
							B((e) => X(t, "title", e), [() => Z("tip.pages.homeLocked")]), W(e, t);
						}, s = (e) => {
							var n = Nl();
							J(n), B((e, t) => {
								Y(n, e), X(n, "title", t);
							}, [() => V(t).path.slice(1), () => Z("tip.pages.slug")]), H("change", n, (e) => Ai(V(t), e.target.value)), W(e, n);
						};
						K(a, (e) => {
							V(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = z(a, 2), u = L(l);
						q(u, () => c.right, !0), j(u);
						var d = z(u, 2), f = L(d);
						q(f, () => c.kebab, !0), j(f);
						var p = z(f, 2), m = (e) => {
							var n = Fl(), r = L(n), i = L(r);
							q(i, () => c.bookmark);
							var a = z(i);
							j(r);
							var o = z(r, 2), s = (e) => {
								var n = Pl(), r = L(n);
								q(r, () => c.cross);
								var i = z(r);
								j(n), B((e, t) => {
									X(n, "title", e), G(i, ` ${t ?? ""}`);
								}, [() => Z("tip.pages.delete"), () => Z("ui.deletePage")]), H("click", n, () => {
									I(bi, null), Mi(V(t));
								}), W(e, n);
							};
							K(o, (e) => {
								V(t).path !== "/" && e(s);
							}), j(n), B((e) => G(a, ` ${e ?? ""}`), [() => Z("ui.savePageTemplate")]), H("click", r, () => wi(V(t))), W(e, n);
						};
						K(p, (e) => {
							V(bi) === V(t).id && e(m);
						}), j(d), j(l), j(n), B((e, a, o) => {
							r = Qr(n, 1, "page-row svelte-1n46o8q", null, r, { current: V(t).id === V(g) }), Y(i, V(t).title), X(i, "title", e), X(u, "title", a), u.disabled = V(t).id === V(g), X(f, "title", o);
						}, [
							() => Z("tip.pages.title"),
							() => Z("tip.pages.open"),
							() => Z("tip.pages.menu")
						]), H("change", i, (e) => Ti(V(t), e.target.value)), H("click", u, () => Yr(V(t).id)), H("click", f, () => I(bi, V(bi) === V(t).id ? null : V(t).id, !0)), W(e, n);
					});
					var r = z(n, 4);
					J(r);
					var i = z(r, 2), a = L(i, !0);
					j(i);
					var o = z(i, 2), s = L(o, !0);
					j(o);
					var l = z(o, 2), u = L(l);
					let d;
					var f = L(u), p = L(f);
					q(p, () => Ho({ sections: [] }), !0), j(p);
					var m = z(p, 2), h = L(m, !0);
					j(m), j(f), j(u), Vr(z(u, 2), 17, () => Wo, (e) => e.id, (e, t) => {
						var n = Ll();
						let r;
						var i = L(n), a = L(i);
						q(a, () => yi[V(t).id], !0), j(a);
						var o = z(a, 2), s = L(o, !0);
						j(o), j(i), j(n), B((e, a) => {
							r = Qr(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: V(vi) === `preset:${V(t).id}` }), X(i, "title", e), G(s, a);
						}, [() => Z("tip.pages.templatePick", { name: Z(V(t).labelKey) }), () => Z(V(t).labelKey)]), H("click", i, () => I(vi, V(vi) === `preset:${V(t).id}` ? null : `preset:${V(t).id}`, !0)), W(e, n);
					}), j(l);
					var _ = z(l, 2), v = (e) => {
						var t = zl(), n = R(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						Vr(i, 20, () => V(eo).filter((e) => $[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = Rl();
							let r;
							var i = L(n), a = L(i);
							q(a, () => Ho($[t].data.page), !0), j(a);
							var o = z(a, 2), s = L(o, !0);
							j(o), j(i);
							var l = z(i, 2);
							q(l, () => c.cross, !0), j(l), j(n), B((e, a) => {
								r = Qr(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: V(vi) === t }), X(i, "title", e), G(s, $[t].data.mal.name), X(l, "title", a);
							}, [() => Z("tip.pages.templatePick", { name: $[t].data.mal.name }), () => Z("canvas.deleteTemplate")]), H("click", i, () => I(vi, V(vi) === t ? null : t, !0)), H("click", l, () => oo({ id: t })), W(e, n);
						}), j(i), B((e) => G(r, e), [() => Z("canvas.tabMyTemplates")]), W(e, t);
					}, y = /* @__PURE__ */ N(() => V(eo).some((e) => $[e]?.data?.mal?.kind === "page"));
					K(_, (e) => {
						V(y) && e(v);
					}), j(t), B((e, t, n, o, c, l, p) => {
						X(r, "placeholder", e), X(i, "title", t), i.disabled = n, G(a, o), G(s, c), d = Qr(u, 1, "page-mal-card svelte-1n46o8q", null, d, { picked: V(vi) === null }), X(f, "title", l), G(h, p);
					}, [
						() => Z("ph.newPageName"),
						() => Z("hint.pages.autoMenu"),
						() => !V(_i).trim(),
						() => Z("ui.createPage"),
						() => Z("canvas.tabPresets"),
						() => Z("tip.pages.blankPick"),
						() => Z("ui.blankPage")
					]), H("keydown", r, (e) => e.key === "Enter" && Ci()), li(r, () => V(_i), (e) => I(_i, e)), H("click", i, Ci), H("click", f, () => I(vi, null)), W(e, t);
				}, u = (e) => {
					var t = ql(), r = L(t), i = L(r), a = L(i, !0);
					j(i);
					var o = z(i, 2), s = L(o), l = L(s), u = z(l);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.logo?.type ?? "text"), t = /* @__PURE__ */ N(() => [
							["text", Z("blocks.text")],
							["image", Z("blocks.image")],
							["both", Z("opt.logo.both")]
						]);
						Q(u, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Pi(e)
						});
					}
					j(s);
					var d = z(s, 2), f = (e) => {
						var t = Vl(), n = R(t);
						J(n);
						var r = z(n, 2), i = L(r);
						{
							let e = /* @__PURE__ */ N(() => Z("tip.nav.logoFont")), t = /* @__PURE__ */ N(() => V(k).nav.logo?.font ?? ""), n = /* @__PURE__ */ N(() => [["", Z("common.inherit")], ...$s.map(([e, t]) => [t, Z(e)])]);
							Q(i, {
								get title() {
									return V(e);
								},
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Ni({ font: e || void 0 })
							});
						}
						var a = z(i, 2);
						J(a);
						var o = z(a, 2);
						let s;
						var c = L(o), l = L(c, !0);
						j(c), j(o);
						var u = z(o, 2);
						let d;
						var f = L(u), p = L(f, !0);
						j(f), j(u), j(r), B((e, t, r, i, c, f, m) => {
							Y(n, V(k).nav.logo?.value ?? ""), X(n, "placeholder", e), X(a, "title", t), Y(a, V(k).nav.logo?.textSize ?? ""), s = Qr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: V(k).nav.logo?.bold !== !1 }), X(o, "title", r), G(l, i), d = Qr(u, 1, "tbtn svelte-1n46o8q", null, d, c), X(u, "title", f), G(p, m);
						}, [
							() => Z("ph.nav.logoName"),
							() => Z("tip.nav.textSize"),
							() => Z("format.bold"),
							() => Z("format.boldLetter"),
							() => ({ active: !!V(k).nav.logo?.italic }),
							() => Z("format.italic"),
							() => Z("format.italicLetter")
						]), H("input", n, (e) => Ni({ value: e.target.value })), H("change", a, (e) => Ni({ textSize: e.target.value ? Number(e.target.value) : void 0 })), H("click", o, () => Ni({ bold: V(k).nav.logo?.bold === !1 })), H("click", u, () => Ni({ italic: !V(k).nav.logo?.italic })), W(e, t);
					};
					K(d, (e) => {
						(V(k).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = z(d, 2), m = (e) => {
						var t = Hl(), n = L(t), r = L(n), i = z(r);
						j(n);
						var a = z(n, 2);
						J(a);
						var o = z(a, 2);
						J(o), j(t), B((e, t, i, s) => {
							X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), Y(a, V(k).nav.logo?.size ?? 32), X(o, "title", s), Y(o, V(k).nav.logo?.radius ?? 0);
						}, [
							() => Z("tip.webpAuto"),
							() => (V(k).nav.logo?.type === "image" ? V(k).nav.logo?.value : V(k).nav.logo?.image) ? Z("ui.changeImage") : Z("ui.chooseImage"),
							() => Z("tip.nav.logoHeight"),
							() => Z("tip.nav.logoRadius")
						]), H("change", i, Fi), H("change", a, (e) => Ni({ size: Number(e.target.value) })), H("change", o, (e) => Ni({ radius: Number(e.target.value) })), W(e, t);
					};
					K(p, (e) => {
						(V(k).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = z(p, 2), g = (e) => {
						var t = vc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(k).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ N(() => [["image-first", Z("opt.logo.imageFirst")], ["text-first", Z("opt.logo.textFirst")]]);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Ni({ order: e })
							});
						}
						j(t), B((e) => G(n, `${e ?? ""} `), [() => Z("lbl.order")]), W(e, t);
					};
					K(h, (e) => {
						V(k).nav.logo?.type === "both" && e(g);
					}), j(o), j(r);
					var _ = z(r, 2), v = L(_), y = L(v, !0);
					j(v);
					var b = z(v, 2), x = L(b), S = L(x), C = z(S);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.variant ?? "bar"), t = /* @__PURE__ */ N(() => [
							["bar", Z("opt.navVariant.bar")],
							["floating", Z("opt.navVariant.floating")],
							["floating-square", Z("opt.navVariant.floatingSquare")],
							["floating-tab", Z("opt.navVariant.floatingTab")],
							["side-left", Z("opt.navVariant.sideLeft")],
							["side-right", Z("opt.navVariant.sideRight")]
						]);
						Q(C, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ya(e)
						});
					}
					j(x);
					var w = z(x, 2), T = (e) => {
						var t = Ul(), n = R(t), r = L(n);
						J(r);
						var i = z(r);
						j(n);
						var a = z(n, 2), o = L(a);
						J(o);
						var s = z(o);
						j(a), B((e, t, c, l) => {
							X(n, "title", e), ai(r, V(k).nav.style?.glow === !0), G(i, ` ${t ?? ""}`), X(a, "title", c), ai(o, V(k).nav.style?.topGap !== !1), G(s, ` ${l ?? ""}`);
						}, [
							() => Z("tip.nav.glow"),
							() => Z("lbl.navGlow"),
							() => Z("tip.nav.topGap"),
							() => Z("lbl.navTopGap")
						]), H("change", r, (e) => ba(e.target.checked)), H("change", o, (e) => Ca(e.target.checked)), W(e, t);
					};
					K(w, (e) => {
						V(ga) && e(T);
					});
					var ee = z(w, 2), E = (e) => {
						var t = Ac(), n = L(t);
						J(n);
						var r = z(n);
						j(t), B((e, i) => {
							X(t, "title", e), ai(n, V(k).nav.overlay === !0), G(r, ` ${i ?? ""}`);
						}, [() => Z("tip.nav.overlay"), () => Z("lbl.navOverlay")]), H("change", n, (e) => gi("nav", () => {
							e.target.checked ? V(k).nav.overlay = !0 : delete V(k).nav.overlay;
						})), W(e, t);
					};
					K(ee, (e) => {
						!V(ga) && !V(ha) && e(E);
					});
					var te = z(ee, 2), ne = (e) => {
						var t = vc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(k).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ N(() => [
								["left", Z("common.left")],
								["center", Z("common.center")],
								["right", Z("common.right")]
							]);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => ma("sideAlign", e === "left" ? void 0 : e)
							});
						}
						j(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.nav.sideAlign"), () => Z("lbl.textAlign")]), W(e, t);
					};
					K(te, (e) => {
						V(ha) && e(ne);
					});
					var re = z(te, 2), ie = L(re);
					J(ie);
					var ae = z(ie);
					j(re);
					var oe = z(re, 2), se = L(oe), ce = z(se);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.size ?? "md"), t = /* @__PURE__ */ N(() => [
							["sm", Z("opt.size.sm")],
							["md", Z("opt.size.md")],
							["lg", Z("opt.size.lg")],
							["xl", Z("opt.size.xl")]
						]);
						Q(ce, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ma("size", e === "md" ? void 0 : e)
						});
					}
					j(oe);
					var le = z(oe, 2), ue = L(le), de = z(ue), fe = (e) => {
						{
							let t = /* @__PURE__ */ N(() => V(k).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ N(() => [
								["top", Z("opt.place.top")],
								["middle", Z("opt.place.middle")],
								["bottom", Z("opt.place.bottom")]
							]);
							Q(e, {
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => ma("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, pe = (e) => {
						{
							let t = /* @__PURE__ */ N(() => V(k).nav.layout ?? "right"), n = /* @__PURE__ */ N(() => [
								["right", Z("common.right")],
								["center", Z("common.center")],
								["left", Z("opt.layout.leftAfterLogo")]
							]);
							Q(e, {
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => pa(e)
							});
						}
					};
					K(de, (e) => {
						V(ha) ? e(fe) : e(pe, -1);
					}), j(le);
					var me = z(le, 2), he = (e) => {
						var t = Wl(), n = R(t), r = L(n);
						J(r);
						var i = z(r);
						j(n);
						var a = z(n, 2), o = (e) => {
							var t = vc(), n = L(t), r = z(n);
							{
								let e = /* @__PURE__ */ N(() => V(k).nav.scroll ?? "none"), t = /* @__PURE__ */ N(() => [
									["none", Z("opt.scroll.none")],
									["shrink", Z("opt.scroll.shrink")],
									["hide", Z("opt.scroll.hide")]
								]);
								Q(r, {
									get value() {
										return V(e);
									},
									get options() {
										return V(t);
									},
									onchange: (e) => gi("nav", () => {
										e === "none" ? delete V(k).nav.scroll : V(k).nav.scroll = e;
									})
								});
							}
							j(t), B((e, r) => {
								X(t, "title", e), G(n, `${r ?? ""} `);
							}, [() => Z("tip.nav.scroll"), () => Z("lbl.navScroll")]), W(e, t);
						};
						K(a, (e) => {
							V(k).nav.sticky !== !1 && e(o);
						}), B((e, t) => {
							X(n, "title", e), ai(r, V(k).nav.sticky !== !1), G(i, ` ${t ?? ""}`);
						}, [() => Z("tip.nav.sticky"), () => Z("lbl.navSticky")]), H("change", r, (e) => gi("nav", () => {
							V(k).nav.sticky = e.target.checked;
						})), W(e, t);
					};
					K(me, (e) => {
						V(ha) || e(he);
					});
					var ge = z(me, 2), _e = L(ge), ve = z(_e);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ N(() => [
							["standard", Z("opt.hover.standard")],
							["underline", Z("opt.hover.underline")],
							["pill", Z("opt.hover.pill")],
							["lift-plain", Z("opt.hover.liftPlain")],
							["lift", Z("opt.hover.lift")]
						]);
						Q(ve, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Pa(e)
						});
					}
					j(ge);
					var ye = z(ge, 2), be = (e) => {
						var t = Gl(), n = R(t), r = L(n), i = z(r), a = L(i);
						j(i), j(n);
						var o = z(n, 2);
						J(o), B((e, t, i) => {
							X(n, "title", e), G(r, `${t ?? ""} `), G(a, `${i ?? ""}%`), Y(o, V(k).nav.style?.hoverGlow ?? .6);
						}, [
							() => Z("tip.nav.hoverGlow"),
							() => Z("lbl.glowStrength"),
							() => Math.round((V(k).nav.style?.hoverGlow ?? .6) * 100)
						]), H("input", o, (e) => ma("hoverGlow", Number(e.target.value))), W(e, t);
					};
					K(ye, (e) => {
						V(k).nav.style?.hover === "lift" && e(be);
					});
					var xe = z(ye, 2), Se = (e) => {
						var t = vc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(k).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ N(Qn);
							Ui(r, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(va)[1];
								},
								onchange: (e) => ma("hoverColor", e)
							});
						}
						j(t), B(() => {
							X(t, "title", V(va)[1]), G(n, `${V(va)[0] ?? ""} `);
						}), W(e, t);
					};
					K(xe, (e) => {
						V(va) && e(Se);
					});
					var Ce = z(xe, 2), we = L(Ce), Te = z(we);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ N(Qn), n = /* @__PURE__ */ N(() => Z("tip.nav.hoverTextColorPick"));
						Ui(Te, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ma("hoverTextColor", e)
						});
					}
					j(Ce);
					var D = z(Ce, 2), Ee = L(D), O = z(Ee);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ N(Qn), n = /* @__PURE__ */ N(() => Z("tip.nav.textColorPick"));
						Ui(O, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => ma("textColor", e)
						});
					}
					j(D);
					var De = z(D, 4), Oe = L(De, !0);
					j(De);
					var ke = z(De, 2);
					n(ke, () => Xn, () => V(k).nav?.style?.background?.layers ?? []), j(b), j(_);
					var Ae = z(_, 2), A = L(Ae), je = L(A, !0);
					j(A);
					var Me = z(A, 2), Ne = L(Me), Pe = L(Ne), Fe = z(Pe);
					{
						let e = /* @__PURE__ */ N(() => V(k).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ N(() => V(ha) ? [
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
						Q(Fe, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ma("subStyle", e === "card" ? void 0 : e)
						});
					}
					j(Ne);
					var Ie = z(Ne, 2), Le = (e) => {
						var t = vc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(k).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ N(Qn), n = /* @__PURE__ */ N(() => Z("tip.nav.subPillColorPick"));
							Ui(r, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(n);
								},
								onchange: (e) => ma("subPillColor", e)
							});
						}
						j(t), B((e, r) => {
							X(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Z("tip.nav.subPillColor"), () => Z("lbl.subPillColor")]), W(e, t);
					};
					K(Ie, (e) => {
						V(k).nav.style?.subStyle === "pills" && e(Le);
					});
					var Re = z(Ie, 2), ze = L(Re), Be = z(ze);
					J(Be), j(Re), j(Me), j(Ae);
					var Ve = z(Ae, 2), He = L(Ve), Ue = L(He, !0);
					j(He);
					var We = z(He, 2), Ge = L(We);
					Vr(Ge, 17, () => V(k).nav.items, Lr, (e, t, n) => {
						var r = Kl(), i = R(r), a = L(i);
						J(a);
						var o = z(a, 2), s = L(o);
						q(s, () => c.plus, !0), j(s);
						var l = z(s, 2);
						l.disabled = n === 0, q(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						q(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						q(d, () => c.cross, !0), j(d), j(o);
						var f = z(o, 2), p = L(f);
						{
							let e = /* @__PURE__ */ N(() => V(t).page ?? (V(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ N(() => Z("tip.linkTarget")), i = /* @__PURE__ */ N(() => [
								...V(k).pages.map((e) => [e.id, e.title]),
								["__href", Z("opt.linkHref")],
								...V(t).children ? [["__none", Z("opt.noLink")]] : []
							]);
							Q(p, {
								get value() {
									return V(e);
								},
								get title() {
									return V(r);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => Ks(n, e)
							});
						}
						j(f);
						var m = z(f, 2), h = (e) => {
							var r = gc();
							J(r), B((e, n) => {
								Y(r, V(t).href), X(r, "placeholder", e), X(r, "title", n);
							}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", r, (e) => qs(n, e.target.value)), W(e, r);
						};
						K(m, (e) => {
							!V(t).page && V(t).href != null && e(h);
						}), j(i), Vr(z(i, 2), 17, () => V(t).children ?? [], Lr, (e, r, i) => {
							var a = _c(), o = L(a);
							J(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, q(l, () => c.up, !0), j(l);
							var u = z(l, 2);
							q(u, () => c.down, !0), j(u);
							var d = z(u, 2);
							q(d, () => c.cross, !0), j(d), j(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ N(() => V(r).page ?? "__href"), t = /* @__PURE__ */ N(() => Z("tip.linkTarget")), a = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
								Q(p, {
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(a);
									},
									onchange: (e) => md(n, i, e)
								});
							}
							j(f);
							var m = z(f, 2), h = (e) => {
								var t = gc();
								J(t), B((e, n) => {
									Y(t, V(r).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
								}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => hd(n, i, e.target.value)), W(e, t);
							};
							K(m, (e) => {
								V(r).page || e(h);
							}), j(a), B((e, n) => {
								Y(o, V(r).label), X(o, "title", e), u.disabled = i === V(t).children.length - 1, X(d, "title", n);
							}, [() => Z("tip.nav.childLabel"), () => Z("tip.nav.removeChild")]), H("input", o, (e) => pd(n, i, e.target.value)), H("click", l, () => gd(n, i, -1)), H("click", u, () => gd(n, i, 1)), H("click", d, () => _d(n, i)), W(e, a);
						}), B((e, r, i) => {
							Y(a, V(t).label), X(a, "title", e), X(s, "title", r), u.disabled = n === V(k).nav.items.length - 1, X(d, "title", i);
						}, [
							() => Z("tip.nav.itemLabel"),
							() => Z("tip.nav.addChild"),
							() => Z("tip.nav.removeItem")
						]), H("input", a, (e) => Gs(n, e.target.value)), H("click", s, () => fd(n)), H("click", l, () => Xs(n, -1)), H("click", u, () => Xs(n, 1)), H("click", d, () => Zs(n)), W(e, r);
					});
					var Ke = z(Ge, 2), qe = L(Ke, !0);
					j(Ke), j(We), j(Ve), j(t), B((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, w, T, ee, E) => {
						X(i, "title", e), G(a, t), G(l, `${n ?? ""} `), G(y, r), X(x, "title", o), G(S, `${s ?? ""} `), X(re, "title", c), ai(ie, V(k).nav.style?.blur !== !1), G(ae, ` ${u ?? ""}`), G(se, `${d ?? ""} `), G(ue, `${f ?? ""} `), G(_e, `${p ?? ""} `), X(Ce, "title", m), G(we, `${h ?? ""} `), G(Ee, `${g ?? ""} `), G(Oe, _), G(je, v), G(Pe, `${b ?? ""} `), X(Re, "title", C), G(ze, `${w ?? ""} `), Y(Be, V(k).nav.style?.subColumns ?? 1), X(He, "title", T), G(Ue, ee), G(qe, E);
					}, [
						() => Z("hint.nav.logoHome"),
						() => Z("group.logo"),
						() => Z("common.type"),
						() => Z("group.appearance"),
						() => Z("tip.nav.variant"),
						() => Z("lbl.navVariant"),
						() => Z("tip.nav.blur"),
						() => Z("lbl.navBlur"),
						() => Z("lbl.size"),
						() => Z("lbl.navPlacement"),
						() => Z("lbl.navHover"),
						() => Z("tip.nav.hoverTextColor"),
						() => Z("lbl.hoverTextColor"),
						() => Z("lbl.textColor"),
						() => Z("lbl.background"),
						() => Z("group.submenu"),
						() => Z("lbl.design"),
						() => Z("tip.nav.subColumns"),
						() => Z("lbl.columns"),
						() => Z("hint.nav.submenu"),
						() => Z("group.menuItems"),
						() => Z("ui.addMenuItem")
					]), H("change", ie, (e) => ma("blur", e.target.checked)), H("change", Be, (e) => ma("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), H("click", Ke, dd), W(e, t);
				}, f = (e) => {
					var t = $l(), n = L(t), r = L(n), i = z(r);
					J(i), j(n);
					var a = z(n, 2), o = L(a), s = z(o);
					J(s), j(a);
					var l = z(a, 2), u = L(l), d = z(u);
					{
						let e = /* @__PURE__ */ N(oa), t = /* @__PURE__ */ N(sa);
						Q(d, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ca(e)
						});
					}
					j(l);
					var f = z(l, 4), p = L(f, !0);
					j(f);
					var m = z(f, 2), h = L(m);
					Vr(h, 17, () => V(na), (e) => e.screen, (e, t) => {
						var n = Jl(), r = L(n), i = L(r, !0);
						j(r);
						var a = z(r, 2);
						let o;
						var s = L(a);
						j(a);
						var c = z(a, 2), l = L(c, !0);
						j(c), j(n), B(() => {
							G(i, V(t).screen), o = Qr(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !V(t).bound }), ei(s, `width:${V(t).pct ?? ""}%`), G(l, V(t).bound ? `${V(t).margin}` : "-");
						}), W(e, n);
					});
					var g = z(h, 2), _ = L(g), v = L(_, !0);
					j(_);
					var y = z(_, 2), b = L(y, !0);
					j(y), j(g);
					var x = z(g, 2), S = (e) => {
						var t = Yl(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("lbl.bindsFrom", { n: V(fe) })]), W(e, t);
					};
					K(x, (e) => {
						V(Hi) !== "full" && e(S);
					}), j(m);
					var C = z(m, 2);
					Vr(C, 21, () => Da, (e) => e.id, (e, t) => {
						var n = kl();
						let r;
						var i = L(n, !0);
						j(n), B((e) => {
							r = Qr(n, 1, "svelte-1n46o8q", null, r, { on: V(Gi) === V(t).id }), G(i, e);
						}, [() => Z(`lbl.width.${V(t).id}`)]), H("click", n, () => ia(V(t).width)), W(e, n);
					}), j(C);
					var w = z(C, 2), T = (e) => {
						var t = Xl(), n = L(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						J(i);
						var a = z(i, 2), o = L(a);
						j(a), j(t), B((e, n) => {
							X(t, "title", e), G(r, n), X(i, "min", 960), X(i, "max", Ta), X(i, "step", 20), Y(i, V(Yi)), G(o, `${V(Yi) ?? ""} px`);
						}, [() => Z("tip.site.contentWidthFree"), () => Z("lbl.widthFree")]), H("input", i, (e) => ia(e.target.valueAsNumber)), W(e, t);
					};
					K(w, (e) => {
						V(Hi) !== "full" && e(T);
					});
					var ee = z(w, 2), E = L(ee, !0);
					j(ee);
					var te = z(ee, 2);
					Vr(te, 21, () => Ea, (e) => e.id, (e, t) => {
						var n = kl();
						let r;
						var i = L(n, !0);
						j(n), B((e) => {
							r = Qr(n, 1, "svelte-1n46o8q", null, r, { on: V(Ki) === V(t).id }), G(i, e);
						}, [() => Z(`lbl.gutter.${V(t).id}`)]), H("click", n, () => aa(V(t).gutter)), W(e, n);
					}), j(te);
					var ne = z(te, 2), re = L(ne), ie = L(re, !0);
					j(re);
					var ae = z(re, 2), oe = L(ae), se = L(oe), ce = L(se, !0);
					j(se);
					var le = z(se, 2);
					J(le);
					var ue = z(le, 2), de = L(ue);
					j(ue), j(oe), j(ae), j(ne);
					var pe = z(ne, 4), me = L(pe), he = z(me), ge = (e) => {
						var t = Zl();
						B((e) => {
							X(t, "src", V(k).site.icon), X(t, "alt", e);
						}, [() => Z("lbl.siteIcon")]), W(e, t);
					};
					K(he, (e) => {
						V(k).site.icon && e(ge);
					}), j(pe);
					var _e = z(pe, 2), ve = L(_e), ye = L(ve), be = z(ye);
					j(ve);
					var xe = z(ve, 2), Se = (e) => {
						var t = Ql(), n = R(t);
						q(n, () => c.pencil ?? "✎", !0), j(n);
						var r = z(n, 2);
						q(r, () => c.cross, !0), j(r), B((e, t) => {
							X(n, "title", e), X(r, "title", t);
						}, [() => Z("tip.site.editIcon"), () => Z("tip.site.removeIcon")]), H("click", n, () => I(Ii, V(k).site.icon, !0)), H("click", r, zi), W(e, t);
					};
					K(xe, (e) => {
						V(k).site.icon && e(Se);
					}), j(_e), j(t), B((e, t, c, d, m, h, g, _, y, x, S, C, w, T, te, re, ae, se, ue, fe) => {
						X(n, "title", e), G(r, `${t ?? ""} `), Y(i, V(k).site.title ?? ""), X(i, "placeholder", c), X(a, "title", d), G(o, `${m ?? ""} `), Y(s, V(k).site.description ?? ""), X(s, "placeholder", h), X(l, "title", g), G(u, `${_ ?? ""} `), X(f, "title", y), G(p, x), G(v, S), G(b, C), X(ee, "title", w), G(E, T), ne.open = V(Ki) === null || V(Ji), G(ie, te), X(oe, "title", re), G(ce, ae), X(le, "min", 0), X(le, "max", 12), X(le, "step", 1), Y(le, V(Wi)), G(de, `${V(Wi) ?? ""} vw`), G(me, `${se ?? ""} `), X(ve, "title", ue), G(ye, `${fe ?? ""} `);
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
						() => V(k).site.icon ? Z("ui.changeIcon") : Z("ui.chooseIcon")
					]), H("input", i, (e) => Bi(e.target.value)), H("input", s, (e) => Vi(e.target.value)), Sr("toggle", ne, (e) => I(Ji, e.currentTarget.open, !0)), H("input", le, (e) => aa(e.target.valueAsNumber)), H("change", be, Li), W(e, t);
				}, p = (e) => {
					var t = su();
					{
						let e = (e, t = d, n = d) => {
							var r = tu(), i = L(r), a = (e) => {
								var t = eu(), r = L(t, !0);
								j(t), B(() => G(r, n())), W(e, t);
							};
							K(i, (e) => {
								n() && e(a);
							});
							var o = z(i, 2), s = L(o), c = L(s, !0);
							j(s);
							var l = z(s, 2), u = L(l, !0);
							j(l);
							var f = z(l, 2), p = L(f), m = L(p, !0);
							j(p);
							var h = z(p), g = L(h, !0);
							j(h), j(f), j(o), j(r), B((e, t, n, r, i, a, s, l, d) => {
								ei(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), G(c, a), G(u, s), G(m, l), G(g, d);
							}, [
								() => Ad(t().bg, t()),
								() => Ad(t().surface, t()),
								() => Ad(t().text, t()),
								() => Ad(t().accent, t()),
								() => Ad(t()["accent-text"] ?? t().bg, t()),
								() => Z("preview.heading"),
								() => Z("preview.cardBody"),
								() => Z("preview.button"),
								() => Z("preview.link")
							]), W(e, r);
						};
						var n = L(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						Vr(i, 21, () => Md, (e) => e.id, (e, t) => {
							var n = nu();
							let r;
							var i = L(n), a = L(i), o = z(a), s = z(o), c = z(s);
							j(i);
							var l = z(i, 2), u = L(l, !0);
							j(l), j(n), B(() => {
								r = Qr(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: V(Pd) === V(t).id }), X(n, "title", `${V(t).name} - ${V(t).note}`), ei(a, `background:${V(t).light.bg ?? ""}`), ei(o, `background:${V(t).light.surface ?? ""}`), ei(s, `background:${V(t).light.accent ?? ""}`), ei(c, `background:${V(t).light.text ?? ""}`), G(u, V(t).name);
							}), H("click", n, () => Nd(V(t))), W(e, n);
						}), j(i);
						var a = z(i, 2), o = L(a, !0);
						j(a);
						var s = z(a, 2), c = L(s);
						J(c);
						var l = z(c);
						j(s);
						var u = z(s, 2), f = (e) => {
							var t = ru(), n = L(t), r = L(n, !0);
							j(n);
							var i = z(n, 2), a = L(i);
							let o;
							var s = L(a, !0);
							j(a);
							var c = z(a, 2);
							let l;
							var u = L(c, !0);
							j(c), j(i), j(t), B((e, t, n, i) => {
								G(r, e), X(a, "title", t), o = Qr(a, 1, "svelte-1n46o8q", null, o, { on: V(tr) }), G(s, n), l = Qr(c, 1, "svelte-1n46o8q", null, l, { on: !V(tr) }), G(u, i);
							}, [
								() => Z("lbl.darkColors"),
								() => Z("hint.theme.autoDark"),
								() => Z("opt.auto"),
								() => Z("opt.custom")
							]), H("click", a, () => Ed(!0)), H("click", c, () => Ed(!1)), W(e, t);
						};
						K(u, (e) => {
							V(er) && e(f);
						});
						var p = z(u, 2), h = L(p), g = (e) => {
							var t = iu(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("lbl.light")]), W(e, t);
						};
						K(h, (e) => {
							V(er) && e(g);
						});
						var _ = z(h, 2);
						let A;
						var v = L(_, !0);
						j(_), j(p);
						var y = z(p, 2);
						Vr(y, 21, () => $n, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ N(() => m(V(t), 3));
							let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
							var o = au(), s = L(o);
							{
								let e = /* @__PURE__ */ N(() => V(k).theme.tokens.color[r()] ?? V(k).theme.tokens.color.bg), t = /* @__PURE__ */ N(Qn);
								Ui(s, {
									get value() {
										return V(e);
									},
									get tokens() {
										return V(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => vd(r(), e)
								});
							}
							var c = z(s, 2), l = L(c, !0);
							j(c);
							var u = z(c, 2), d = L(u, !0);
							j(u), j(o), B((e) => {
								G(l, a()), G(d, e);
							}, [() => Ad(V(k).theme.tokens.color[r()] ?? V(k).theme.tokens.color.bg, V(rr))]), W(e, o);
						}), j(y);
						var b = z(y, 2), x = (e) => {
							var t = ou(), n = R(t), r = L(n), i = L(r, !0);
							j(r);
							var a = z(r, 2);
							let o;
							var s = L(a, !0);
							j(a), j(n);
							var c = z(n, 2);
							let l;
							Vr(c, 21, () => $n, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ N(() => m(V(t), 3));
								let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
								var o = au(), s = L(o);
								{
									let e = /* @__PURE__ */ N(() => V(k).theme.alt.tokens.color[r()] ?? V(ir)[r()] ?? V(k).theme.tokens.color.bg), t = /* @__PURE__ */ N(Qn), n = /* @__PURE__ */ N(() => Z("theme.darkColorLabel", { name: i() }));
									Ui(s, {
										get value() {
											return V(e);
										},
										get tokens() {
											return V(t);
										},
										get label() {
											return V(n);
										},
										onchange: (e) => Cd(r(), e)
									});
								}
								var c = z(s, 2), l = L(c, !0);
								j(c);
								var u = z(c, 2), d = L(u, !0);
								j(u), j(o), B((e) => {
									G(l, a()), G(d, e);
								}, [() => Ad(V(k).theme.alt.tokens.color[r()] ?? V(ir)[r()], V(ir))]), W(e, o);
							}), j(c), B((e, t, n) => {
								G(i, e), o = Qr(a, 1, "chip svelte-1n46o8q", null, o, { accent: V(nr) === "dark" }), X(a, "title", t), G(s, n), l = Qr(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: V(tr) });
							}, [
								() => Z("lbl.dark"),
								() => Z("tip.theme.darkDefault"),
								() => Z("common.standard")
							]), H("click", a, () => wd("dark")), W(e, t);
						};
						K(b, (e) => {
							V(er) && e(x);
						});
						var S = z(b, 2), C = L(S);
						{
							let t = /* @__PURE__ */ N(() => V(er) ? Z("lbl.light") : "");
							e(C, () => V(rr), () => V(t));
						}
						var w = z(C, 2), T = (t) => {
							{
								let n = /* @__PURE__ */ N(() => Z("lbl.dark"));
								e(t, () => V(ir), () => V(n));
							}
						};
						K(w, (e) => {
							V(er) && e(T);
						}), j(S);
						var ee = z(S, 2), E = L(ee), te = L(E, !0);
						j(E);
						var ne = z(E, 2), re = L(ne), ie = L(re), ae = z(ie);
						{
							let e = /* @__PURE__ */ N(() => Dd("heading"));
							Q(ae, {
								get value() {
									return V(k).theme.tokens.font.heading;
								},
								get options() {
									return V(e);
								},
								onchange: (e) => yd("heading", e)
							});
						}
						j(re);
						var oe = z(re, 2), se = L(oe), ce = z(se);
						{
							let e = /* @__PURE__ */ N(() => Dd("body"));
							Q(ce, {
								get value() {
									return V(k).theme.tokens.font.body;
								},
								get options() {
									return V(e);
								},
								onchange: (e) => yd("body", e)
							});
						}
						j(oe);
						var le = z(oe, 2), ue = L(le), de = L(ue, !0);
						j(ue);
						var fe = z(ue, 2), pe = L(fe, !0);
						j(fe), j(le), j(ne), j(ee);
						var me = z(ee, 2), he = L(me), ge = L(he, !0);
						j(he);
						var _e = z(he, 2), ve = L(_e), ye = L(ve), be = L(ye, !0);
						j(ye);
						var xe = z(ye, 2), Se = L(xe, !0);
						j(xe), j(ve);
						var Ce = z(ve, 2), we = L(Ce, !0), Te = z(we), D = L(Te, !0);
						j(Te), j(Ce);
						var Ee = z(Ce, 2);
						J(Ee);
						var O = z(Ee, 2), De = L(O, !0), Oe = z(De), ke = L(Oe, !0);
						j(Oe), j(O);
						var Ae = z(O, 2);
						J(Ae), j(_e), j(me), j(t), B((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							G(r, e), G(o, t), X(s, "title", n), ai(c, V(er)), G(l, ` ${i ?? ""}`), A = Qr(_, 1, "chip svelte-1n46o8q", null, A, { accent: V(nr) === "light" }), X(_, "title", a), G(v, u), G(te, d), G(ie, `${f ?? ""} `), G(se, `${p ?? ""} `), ei(ue, `font-family:${V(k).theme.tokens.font.heading ?? ""}`), G(de, m), ei(fe, `font-family:${V(k).theme.tokens.font.body ?? ""}`), G(pe, h), G(ge, g), ei(ve, `--r-sm:${V(k).theme.tokens.radius.sm ?? ""};--r-md:${V(k).theme.tokens.radius.md ?? ""}`), G(be, y), G(Se, b), G(we, x), G(D, V(k).theme.tokens.radius.sm), Y(Ee, S), G(De, C), G(ke, V(k).theme.tokens.radius.md), Y(Ae, w);
						}, [
							() => Z("lbl.themePresets"),
							() => Z("lbl.colors"),
							() => Z("tip.theme.dualMode"),
							() => Z("lbl.dualMode"),
							() => Z("tip.theme.defaultScheme"),
							() => Z("common.standard"),
							() => Z("group.typography"),
							() => Z("lbl.headings"),
							() => Z("lbl.bodyText"),
							() => Z("preview.heading"),
							() => Z("preview.bodySample"),
							() => Z("group.shape"),
							() => Z("preview.button"),
							() => Z("preview.card"),
							() => Z("lbl.smallCorners"),
							() => Od(V(k).theme.tokens.radius.sm),
							() => Z("lbl.largeCorners"),
							() => Od(V(k).theme.tokens.radius.md)
						]), H("change", c, (e) => Td(e.target.checked)), H("click", _, () => wd("light")), H("input", Ee, (e) => kd("sm", Number(e.target.value))), H("input", Ae, (e) => kd("md", Number(e.target.value)));
					}
					W(e, t);
				}, h = (e) => {
					var t = fu();
					let n;
					var r = L(t);
					J(r);
					var i = z(r, 2), a = (e) => {
						var t = jr();
						Vr(R(t), 17, () => Jo(af(), V(rf), (e) => e.label), (e) => e.label, (e, t) => {
							var n = jr(), r = R(n), i = (e) => {
								var n = cu(), r = L(n), i = z(r);
								j(n), B((e) => {
									X(n, "title", e), G(r, `${V(t).label ?? ""} `);
								}, [() => Z("tip.webpAuto")]), H("change", i, cf), W(e, n);
							}, a = (e) => {
								var n = lu(), r = L(n), i = z(r);
								j(n), B((e) => {
									X(n, "title", e), G(r, `${V(t).label ?? ""} `);
								}, [() => Z("tip.blocks.galleryImages")]), H("change", i, ff), W(e, n);
							}, o = (e) => {
								var n = Pc(), r = L(n, !0);
								j(n), B(() => G(r, V(t).label)), H("click", n, () => of(V(t))), W(e, n);
							};
							K(r, (e) => {
								V(t).act === "image" ? e(i) : V(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), W(e, n);
						}, (e) => {
							var t = xc(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("canvas.searchEmpty")]), W(e, t);
						}), W(e, t);
					}, o = /* @__PURE__ */ N(() => V(rf).trim()), s = (e) => {
						var t = du(), n = R(t), r = L(n), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = L(a), s = L(o, !0);
						j(o);
						var c = z(o, 2), l = L(c, !0);
						j(c), j(a), j(n);
						var u = z(n, 2), d = L(u, !0);
						j(u);
						var f = z(u, 2), p = L(f), m = z(p);
						j(f);
						var h = z(f, 2), g = L(h, !0);
						j(h);
						var _ = z(h, 2), v = L(_, !0);
						j(_);
						var y = z(_, 2), b = L(y, !0);
						j(y);
						var x = z(y, 2), S = L(x, !0);
						j(x);
						var C = z(x, 2), w = L(C, !0);
						j(C);
						var T = z(C, 2), ee = L(T, !0);
						j(T);
						var E = z(T, 2), te = L(E, !0);
						j(E);
						var ne = z(E, 2), re = L(ne), ie = L(re, !0);
						j(re);
						var ae = z(re, 2), oe = L(ae), se = L(oe, !0);
						j(oe);
						var ce = z(oe, 2), le = L(ce), ue = z(le);
						j(ce), j(ae), j(ne);
						var de = z(ne, 2), fe = L(de), pe = L(fe, !0);
						j(fe);
						var me = z(fe, 2), he = L(me), ge = L(he, !0);
						j(he);
						var _e = z(he, 2), ve = L(_e, !0);
						j(_e);
						var ye = z(_e, 2), be = L(ye, !0);
						j(ye);
						var xe = z(ye, 2), Se = L(xe, !0);
						j(xe);
						var Ce = z(xe, 2), we = L(Ce, !0);
						j(Ce), j(me), j(de);
						var Te = z(de, 2), D = (e) => {
							let t = /* @__PURE__ */ N(() => V(eo).filter((e) => $[e]?.data?.mal?.kind === "blocks"));
							var n = uu(), r = L(n), i = L(r, !0);
							j(r);
							var a = z(r, 2);
							Vr(a, 20, () => V(t), (e) => e, (e, t) => {
								var n = Pc(), r = L(n, !0);
								j(n), B((e) => {
									X(n, "title", e), G(r, $[t].data.mal.name);
								}, [() => Z("canvas.insertGroup")]), H("click", n, () => O?.sendInsertTemplate(t)), W(e, n);
							}), j(a), j(n), B((e) => G(i, e), [() => Z("canvas.tabMyTemplates")]), W(e, n);
						}, Ee = /* @__PURE__ */ N(() => V(eo).some((e) => $[e]?.data?.mal?.kind === "blocks"));
						K(Te, (e) => {
							V(Ee) && e(D);
						});
						var k = z(Te, 2), De = (e) => {
							var t = uu(), n = L(t), r = L(n, !0);
							j(n);
							var i = z(n, 2);
							Vr(i, 21, () => V(tf), (e) => e.type, (e, t) => {
								var n = jr(), r = R(n), i = (e) => {
									var n = uu(), r = L(n), i = L(r, !0);
									j(r);
									var a = z(r, 2);
									Vr(a, 21, () => V(t).variants, (e) => e.label, (e, n) => {
										var r = Pc(), i = L(r, !0);
										j(r), B((e) => {
											X(r, "title", e), G(i, V(n).label);
										}, [() => Z("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", r, () => nf(V(t), V(n).props)), W(e, r);
									}), j(a), j(n), B(() => G(i, V(t).label)), W(e, n);
								}, a = (e) => {
									var n = Pc(), r = L(n, !0);
									j(n), B((e) => {
										X(n, "title", e), G(r, V(t).label);
									}, [() => Z("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", n, () => nf(V(t))), W(e, n);
								};
								K(r, (e) => {
									V(t).variants?.length ? e(i) : e(a, -1);
								}), W(e, n);
							}), j(i), j(t), B((e) => G(r, e), [() => Z("panel.plugins")]), W(e, t);
						};
						K(k, (e) => {
							V(tf).length && e(De);
						}), B((e, t, n, r, a, o, u, m, ne, re, ae, ue, de, fe, me, he, _e, ye, xe, Ce, Te, D, Ee, O, k, De, Oe, ke, Ae, A, je, Me) => {
							G(i, e), G(s, t), X(c, "title", n), G(l, r), G(d, a), X(f, "title", o), G(p, `${u ?? ""} `), X(h, "title", m), G(g, ne), X(_, "title", re), G(v, ae), X(y, "title", ue), G(b, de), X(x, "title", fe), G(S, me), X(C, "title", he), G(w, _e), X(T, "title", ye), G(ee, xe), X(E, "title", Ce), G(te, Te), G(ie, D), X(oe, "title", Ee), G(se, O), X(ce, "title", k), G(le, `${De ?? ""} `), G(pe, Oe), G(ge, ke), G(ve, Ae), G(be, A), G(Se, je), G(we, Me);
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
							() => Z("tip.blocks.samling"),
							() => Z("blocks.samling"),
							() => Z("tip.blocks.faq"),
							() => Z("blocks.faq"),
							() => Z("tip.blocks.tidslinje"),
							() => Z("blocks.tidslinje"),
							() => Z("tip.blocks.sitat"),
							() => Z("blocks.sitat"),
							() => Z("tip.blocks.statistikk"),
							() => Z("blocks.statistikk"),
							() => Z("blocks.galleri"),
							() => Z("tip.blocks.gallery"),
							() => Z("ui.emptyGallery"),
							() => Z("tip.blocks.galleryImages"),
							() => Z("ui.galleryWithImages"),
							() => Z("group.shapes"),
							() => Z("shape.line"),
							() => Z("shape.arrow"),
							() => Z("shape.circle"),
							() => Z("shape.rect"),
							() => Z("shape.triangle")
						]), H("click", o, () => ef("text")), H("click", c, () => ef("text-box")), H("click", u, () => ef("button")), H("change", m, cf), H("click", h, () => ef("video")), H("click", _, () => ef("icon")), H("click", y, () => ef("samling")), H("click", x, () => ef("faq")), H("click", C, () => ef("tidslinje")), H("click", T, () => ef("sitat")), H("click", E, () => ef("statistikk")), H("click", oe, () => ef("galleri")), H("change", ue, ff), H("click", he, () => ef("shape-line")), H("click", _e, () => ef("shape-arrow")), H("click", ye, () => ef("shape-circle")), H("click", xe, () => ef("shape-rect")), H("click", Ce, () => ef("shape-triangle")), W(e, t);
					};
					K(i, (e) => {
						V(o) ? e(a) : e(s, -1);
					}), j(t), B((e, i, a) => {
						n = Qr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: V(ie) === "mobile" }), X(t, "title", e), X(r, "placeholder", i), X(r, "title", a);
					}, [
						() => V(ie) === "mobile" ? Z("tip.blocks.mobileLocked") : void 0,
						() => Z("canvas.searchBlocks"),
						() => Z("canvas.searchBlocks")
					]), li(r, () => V(rf), (e) => I(rf, e)), W(e, t);
				}, _ = (e) => {
					var t = pu(), n = L(t), r = L(n), i = z(r), a = L(i);
					j(i), j(n);
					var o = z(n, 2);
					J(o);
					var s = z(o, 2), c = L(s);
					J(c);
					var l = z(c);
					j(s), j(t), B((e, t) => {
						G(r, `${e ?? ""} `), G(a, `${V(ee).size ?? ""} px`), Y(o, V(ee).size), ai(c, V(ee).snap !== !1), G(l, ` ${t ?? ""}`);
					}, [() => Z("lbl.gridSize"), () => Z("lbl.gridSnap")]), H("input", o, (e) => wr("size", Number(e.target.value))), H("change", c, (e) => wr("snap", e.target.checked)), W(e, t);
				}, v = (e) => {
					var t = bu(), r = L(t), i = (e) => {
						var t = mu(), n = R(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						a(i), B((e) => G(r, e), [() => Z("blocks.suffix", { label: Xt[V(M).type] ?? V(M).type })]), W(e, t);
					}, o = (e) => {
						var t = yu(), r = R(t), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = L(a), s = z(o);
						J(s), j(a);
						var l = z(a, 4), u = L(l);
						J(u);
						var d = z(u);
						j(l);
						var f = z(l, 2), p = (e) => {
							var t = hu(), n = R(t), r = L(n), i = z(r), a = L(i);
							j(i), j(n);
							var o = z(n, 2);
							J(o), B((e) => {
								G(r, `${e ?? ""} `), G(a, `${V(en).size ?? ""} px`), Y(o, V(en).size);
							}, [() => Z("lbl.gridSize")]), H("input", o, (e) => Cr("size", Number(e.target.value))), W(e, t);
						};
						K(f, (e) => {
							V(en) && e(p);
						});
						var h = z(f, 4), g = L(h, !0);
						j(h);
						var _ = z(h, 2);
						Vr(_, 21, () => [["", "common.standard"], ...Object.entries(ts)], ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ N(() => m(V(t), 2));
							let r = () => V(n)[0], i = () => V(n)[1], a = /* @__PURE__ */ N(() => mn(r()));
							var o = gu();
							let s;
							var c = L(o), l = L(c), u = z(l, 2), d = z(u, 2);
							j(c);
							var f = z(c, 2), p = L(f, !0);
							j(f), j(o), B((e, t) => {
								s = Qr(o, 1, "rs-card svelte-1n46o8q", null, s, { on: V(cn) === r() }), X(o, "title", e), ei(c, `background: ${V(a).bg ?? ""}`), ei(l, `background: ${V(a).text ?? ""}`), ei(u, `background: ${V(a).surface ?? ""}`), ei(d, `background: ${V(a).accent ?? ""}`), G(p, t);
							}, [() => Z("tip.props.sectionTheme"), () => Z(i())]), H("click", o, () => pn(r())), W(e, o);
						}), j(_);
						var v = z(_, 2), y = L(v), b = z(y), x = L(b), S = L(x);
						j(x);
						var C = z(x, 2);
						q(C, () => c.copy, !0), j(C), j(b), j(v);
						var w = z(v, 4), T = L(w, !0);
						j(w);
						var ee = z(w, 2);
						n(ee, () => V(Yn), () => V(an));
						var E = z(ee, 4), te = L(E), ne = z(te);
						{
							let e = /* @__PURE__ */ N(() => or(V(on)) ? V(on).type : "");
							Q(ne, {
								get value() {
									return V(e);
								},
								get options() {
									return sr;
								},
								onchange: (e) => mr(e || null)
							});
						}
						j(E);
						var re = z(E, 2), ie = (e) => {
							var t = vu(), n = R(t), r = L(n), i = z(r);
							J(i), j(n);
							var a = z(n, 2), o = L(a), s = z(o);
							J(s), j(a);
							var c = z(a, 2), l = (e) => {
								var t = _u(), n = R(t), r = L(n), i = z(r);
								{
									let e = /* @__PURE__ */ N(() => V(on).props.effect ?? "slide-up"), t = /* @__PURE__ */ N(() => [
										["fade-in", Z("anim.fadeIn")],
										["slide-up", Z("anim.slideUp")],
										["zoom-in", Z("anim.zoomIn")]
									]);
									Q(i, {
										get value() {
											return V(e);
										},
										get options() {
											return V(t);
										},
										onchange: (e) => _r("effect", e)
									});
								}
								j(n);
								var a = z(n, 2), o = L(a), s = z(o);
								J(s), j(a);
								var c = z(a, 2), l = L(c), u = z(l);
								{
									let e = /* @__PURE__ */ N(() => V(on).props.pattern ?? "sequence"), t = /* @__PURE__ */ N(() => [
										["sequence", Z("opt.stagger.sequence")],
										["columns", Z("opt.stagger.columns")],
										["rows", Z("opt.stagger.rows")],
										["center", Z("opt.stagger.center")]
									]);
									Q(u, {
										get value() {
											return V(e);
										},
										get options() {
											return V(t);
										},
										onchange: (e) => _r("pattern", e)
									});
								}
								j(c), B((e, t, i, u, d, f) => {
									X(n, "title", e), G(r, `${t ?? ""} `), X(a, "title", i), G(o, `${u ?? ""} `), Y(s, V(on).props.step ?? 90), X(c, "title", d), G(l, `${f ?? ""} `);
								}, [
									() => Z("tip.props.staggerEffect"),
									() => Z("lbl.staggerEffect"),
									() => Z("tip.props.staggerStep"),
									() => Z("lbl.stepMs"),
									() => Z("tip.props.staggerPattern"),
									() => Z("lbl.pattern")
								]), H("change", s, (e) => gr("step", Number(e.target.value))), W(e, t);
							};
							K(c, (e) => {
								V(on).type === "stagger" && e(l);
							}), B((e, t) => {
								G(r, `${e ?? ""} `), Y(i, V(on).props.duration), G(o, `${t ?? ""} `), Y(s, V(on).props.delay ?? 0);
							}, [() => Z("lbl.durationMs"), () => Z("lbl.delayMs")]), H("change", i, (e) => gr("duration", Number(e.target.value))), H("change", s, (e) => gr("delay", Number(e.target.value))), W(e, t);
						}, ae = /* @__PURE__ */ N(() => or(V(on)));
						K(re, (e) => {
							V(ae) && e(ie);
						});
						var oe = z(re, 2), se = L(oe), ce = z(se);
						{
							let e = /* @__PURE__ */ N(() => V(sn)?.type ?? (V(on) && !or(V(on)) ? V(on).type : ""));
							Q(ce, {
								get value() {
									return V(e);
								},
								get options() {
									return lr;
								},
								onchange: (e) => hr(e || null)
							});
						}
						j(oe), B((e, t, n, r, c, l, f, p, m, _, b, x, w, ee, ne) => {
							G(i, e), X(a, "title", t), G(o, `${n ?? ""} `), Y(s, V(rn)), X(s, "placeholder", r), ai(u, V(en) !== null), G(d, ` ${c ?? ""}`), X(h, "title", l), G(g, f), X(v, "title", p), G(y, `${m ?? ""} `), G(S, `#${V($t) ?? ""}`), X(C, "title", _), G(T, b), X(E, "title", x), G(te, `${w ?? ""} `), X(oe, "title", ee), G(se, `${ne ?? ""} `);
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
							() => Z("tip.props.sectionAnim"),
							() => Z("lbl.animIn"),
							() => Z("tip.props.sectionHover"),
							() => Z("lbl.onHover")
						]), H("change", s, (e) => vr(e.target.value)), H("change", u, (e) => xr(e.target.checked)), H("click", C, () => navigator.clipboard?.writeText(`#${V($t)}`)), W(e, t);
					}, s = (e) => {
						var t = xc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("hint.props.empty")]), W(e, t);
					};
					K(r, (e) => {
						V(M) ? e(i) : V($t) ? e(o, 1) : e(s, -1);
					}), j(t), W(e, t);
				}, y = (e) => {
					var t = Ou(), i = L(t), a = L(i);
					J(a);
					var o = z(a);
					j(i);
					var s = z(i, 2), l = (e) => {
						var t = uu(), n = L(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						Vr(i, 21, () => V(k).pages ?? [], (e) => e.id, (e, t) => {
							var n = Ac(), r = L(n);
							J(r);
							var i = z(r);
							j(n), B((e, a) => {
								X(n, "title", e), ai(r, a), G(i, ` ${(V(t).title || V(t).id) ?? ""}`);
							}, [() => Z("tip.footer.hideOnPage"), () => !(V(k).footer?.hideOn ?? []).includes(V(t).id)]), H("change", r, (e) => Ds(V(t).id, e.target.checked)), W(e, n);
						}), j(i), j(t), B((e) => G(r, e), [() => Z("group.showOnPages")]), W(e, t);
					};
					K(s, (e) => {
						V(k).footer?.show && e(l);
					});
					var u = z(s, 2), d = L(u), f = L(d, !0);
					j(d);
					var p = z(d, 2), m = L(p);
					Vr(m, 21, () => ds, (e) => e.id, (e, t) => {
						var n = xu(), r = L(n);
						q(r, () => Ys(V(t).thumb), !0), j(r);
						var i = z(r, 2), a = L(i, !0);
						j(i), j(n), B((e) => {
							X(n, "title", e), G(a, V(t).label);
						}, [() => Z("tip.footer.template", { label: V(t).label })]), H("click", n, () => ps(V(t).id)), W(e, n);
					}), j(m), j(p), j(u);
					var h = z(u, 2), g = L(h), _ = L(g, !0);
					j(g);
					var v = z(g, 2), y = L(v), b = L(y), x = z(b);
					J(x), j(y);
					var S = z(y, 2), C = L(S), w = z(C);
					J(w), j(S);
					var T = z(S, 2), ee = L(T), E = z(ee);
					{
						let e = /* @__PURE__ */ N(() => V(k).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ N(() => [
							["text", Z("blocks.text")],
							["image", Z("opt.brand.image")],
							["both", Z("opt.brand.both")]
						]);
						Q(E, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => os(e)
						});
					}
					j(T);
					var te = z(T, 2), ne = (e) => {
						var t = Cu(), n = R(t), r = L(n), i = L(r), a = z(i);
						j(r);
						var o = z(r, 2), s = (e) => {
							var t = nc();
							q(t, () => c.cross, !0), j(t), B((e) => X(t, "title", e), [() => Z("tip.footer.removeLogo")]), H("click", t, cs), W(e, t);
						};
						K(o, (e) => {
							V(k).footer?.brand?.logo && e(s);
						}), j(n);
						var l = z(n, 2), u = (e) => {
							var t = Su(), n = R(t), r = L(n), i = z(r), a = L(i);
							j(i), j(n);
							var o = z(n, 2);
							J(o), B((e) => {
								G(r, `${e ?? ""} `), G(a, `${V(k).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Y(o, V(k).footer?.brand?.logoHeight ?? 40);
							}, [() => Z("lbl.logoHeight")]), H("input", o, (e) => ls(e.target.value)), W(e, t);
						};
						K(l, (e) => {
							V(k).footer?.brand?.logo && e(u);
						}), B((e, t) => {
							X(r, "title", e), G(i, `${t ?? ""} `);
						}, [() => Z("tip.webpAutoPublish"), () => V(k).footer?.brand?.logo ? Z("ui.changeLogo") : Z("ui.uploadLogo")]), H("change", a, ss), W(e, t);
					};
					K(te, (e) => {
						(V(k).footer?.brand?.mode ?? "text") !== "text" && e(ne);
					}), j(v), j(h);
					var re = z(h, 2), ie = L(re), ae = L(ie, !0);
					j(ie);
					var oe = z(ie, 2), se = L(oe);
					Vr(se, 17, () => V(k).footer?.columns ?? [], Lr, (e, t, n) => {
						var r = wu(), i = R(r), a = L(i);
						J(a);
						var o = z(a, 2), s = L(o);
						q(s, () => c.plus, !0), j(s);
						var l = z(s, 2);
						l.disabled = n === 0, q(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						q(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						q(d, () => c.cross, !0), j(d), j(o), j(i), Vr(z(i, 2), 17, () => V(t).links ?? [], Lr, (e, r, i) => {
							var a = _c(), o = L(a);
							J(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, q(l, () => c.up, !0), j(l);
							var u = z(l, 2);
							q(u, () => c.down, !0), j(u);
							var d = z(u, 2);
							q(d, () => c.cross, !0), j(d), j(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ N(() => V(r).page ?? "__href"), t = /* @__PURE__ */ N(() => Z("tip.linkTarget")), a = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHref")]]);
								Q(p, {
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(a);
									},
									onchange: (e) => Is(n, i, e)
								});
							}
							j(f);
							var m = z(f, 2), h = (e) => {
								var t = gc();
								J(t), B((e, n) => {
									Y(t, V(r).href ?? ""), X(t, "placeholder", e), X(t, "title", n);
								}, [() => Z("ph.hrefAnchor"), () => Z("tip.hrefAnchor")]), H("change", t, (e) => Ls(n, i, e.target.value)), W(e, t);
							};
							K(m, (e) => {
								V(r).page || e(h);
							}), j(a), B((e, n) => {
								Y(o, V(r).label), X(o, "title", e), u.disabled = i === V(t).links.length - 1, X(d, "title", n);
							}, [() => Z("tip.linkLabel"), () => Z("tip.removeLink")]), H("input", o, (e) => Fs(n, i, e.target.value)), H("click", l, () => Ps(n, i, -1)), H("click", u, () => Ps(n, i, 1)), H("click", d, () => Ns(n, i)), W(e, a);
						}), B((e, r, i) => {
							Y(a, V(t).title), X(a, "title", e), X(s, "title", r), u.disabled = n === V(k).footer.columns.length - 1, X(d, "title", i);
						}, [
							() => Z("tip.footer.columnTitle"),
							() => Z("tip.footer.addLink"),
							() => Z("tip.footer.removeColumn")
						]), H("input", a, (e) => js(n, e.target.value)), H("click", s, () => Ms(n)), H("click", l, () => As(n, -1)), H("click", u, () => As(n, 1)), H("click", d, () => ks(n)), W(e, r);
					});
					var ce = z(se, 2), le = L(ce, !0);
					j(ce);
					var ue = z(ce, 2), de = L(ue), fe = z(de);
					{
						let e = /* @__PURE__ */ N(() => V(k).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ N(() => [["left", Z("common.left")], ["center", Z("common.center")]]);
						Q(fe, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Cs(e)
						});
					}
					j(ue), j(oe), j(re);
					var pe = z(re, 2), me = L(pe), he = L(me, !0);
					j(me);
					var ge = z(me, 2), _e = L(ge);
					Vr(_e, 17, () => V(k).footer?.social ?? [], Lr, (e, t, n) => {
						var r = Tu(), i = L(r), a = L(i);
						q(a, () => da(V(t).icon) || "", !0), j(a);
						var o = z(a, 2);
						{
							let e = /* @__PURE__ */ N(() => Z("blocks.icon"));
							Q(o, {
								get value() {
									return V(t).icon;
								},
								get title() {
									return V(e);
								},
								get options() {
									return Us;
								},
								onchange: (e) => Vs(n, e)
							});
						}
						j(i);
						var s = z(i, 2), l = L(s);
						l.disabled = n === 0, q(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						q(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						q(d, () => c.cross, !0), j(d), j(s);
						var f = z(s, 2);
						J(f), j(r), B((e, r) => {
							u.disabled = n === V(k).footer.social.length - 1, X(d, "title", e), Y(f, V(t).url), X(f, "placeholder", r);
						}, [() => Z("tip.removeLink"), () => Z("ph.hrefMailto")]), H("click", l, () => Bs(n, -1)), H("click", u, () => Bs(n, 1)), H("click", d, () => zs(n)), H("change", f, (e) => Hs(n, e.target.value)), W(e, r);
					});
					var ve = z(_e, 2), ye = L(ve, !0);
					j(ve), j(ge), j(pe);
					var be = z(pe, 2), xe = L(be), Se = L(xe, !0);
					j(xe);
					var Ce = z(xe, 2), we = L(Ce), Te = L(we);
					J(Te);
					var D = z(Te);
					j(we);
					var Ee = z(we, 2), O = (e) => {
						let t = /* @__PURE__ */ N(() => V(k).footer.cta);
						var n = Du(), r = R(n), i = L(r), a = z(i);
						{
							let e = /* @__PURE__ */ N(() => V(t).kind ?? "button"), n = /* @__PURE__ */ N(() => [["button", Z("opt.cta.button")], ["newsletter", Z("opt.cta.newsletter")]]);
							Q(a, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Ts("kind", e)
							});
						}
						j(r);
						var o = z(r, 2), s = L(o);
						J(s);
						var c = z(s);
						j(o);
						var l = z(o, 2), u = L(l), d = z(u);
						J(d), j(l);
						var f = z(l, 2), p = L(f), m = z(p);
						J(m), j(f);
						var h = z(f, 2), g = L(h), _ = z(g);
						J(_), j(h);
						var v = z(h, 2), y = (e) => {
							var n = Eu(), r = R(n), i = L(r), a = z(i);
							{
								let e = /* @__PURE__ */ N(() => V(t).page ?? "__href"), n = /* @__PURE__ */ N(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Z("opt.linkHrefMailto")]]);
								Q(a, {
									get value() {
										return V(e);
									},
									get options() {
										return V(n);
									},
									onchange: (e) => Es(e)
								});
							}
							j(r);
							var o = z(r, 2), s = (e) => {
								var n = Oc();
								J(n), B((e, r) => {
									Y(n, V(t).href ?? ""), X(n, "placeholder", e), X(n, "title", r);
								}, [() => Z("ph.hrefMailtoAnchor"), () => Z("tip.hrefAnchor")]), H("change", n, (e) => Ts("href", e.target.value)), W(e, n);
							};
							K(o, (e) => {
								V(t).page || e(s);
							}), B((e, t) => {
								X(r, "title", e), G(i, `${t ?? ""} `);
							}, [() => Z("tip.footer.ctaTarget"), () => Z("lbl.buttonTarget")]), W(e, n);
						}, b = (e) => {
							var n = Ec(), r = R(n), i = L(r), a = z(i);
							J(a), j(r);
							var o = z(r, 2), s = L(o), c = z(s);
							J(c), j(o);
							var l = z(o, 2), u = L(l), d = z(u);
							J(d), j(l), B((e, n, f, p, m, h, g, _, v) => {
								X(r, "title", e), G(i, `${n ?? ""} `), Y(a, V(t).endpoint ?? ""), X(a, "placeholder", f), X(o, "title", p), G(s, `${m ?? ""} `), Y(c, V(t).recipient ?? ""), X(c, "placeholder", h), X(l, "title", g), G(u, `${_ ?? ""} `), Y(d, V(t).success ?? ""), X(d, "placeholder", v);
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
							]), H("change", a, (e) => Ts("endpoint", e.target.value)), H("change", c, (e) => Ts("recipient", e.target.value)), H("input", d, (e) => Ts("success", e.target.value)), W(e, n);
						};
						K(v, (e) => {
							(V(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), B((e, n, a, v, y, b, x, S, C, w, T, ee) => {
							X(r, "title", e), G(i, `${n ?? ""} `), X(o, "title", a), ai(s, V(t).big === !0), G(c, ` ${v ?? ""}`), X(l, "title", y), G(u, `${b ?? ""} `), Y(d, V(t).heading ?? ""), X(d, "placeholder", x), X(f, "title", S), G(p, `${C ?? ""} `), Y(m, V(t).sub ?? ""), X(h, "title", w), G(g, `${T ?? ""} `), Y(_, V(t).label ?? ""), X(_, "placeholder", ee);
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
						]), H("change", s, (e) => Ts("big", e.target.checked)), H("input", d, (e) => Ts("heading", e.target.value)), H("input", m, (e) => Ts("sub", e.target.value)), H("input", _, (e) => Ts("label", e.target.value)), W(e, n);
					};
					K(Ee, (e) => {
						V(k).footer?.cta && e(O);
					}), j(Ce), j(be);
					var De = z(be, 2), Oe = L(De), ke = L(Oe, !0);
					j(Oe);
					var Ae = z(Oe, 2), A = L(Ae);
					r(A, () => "linkRow", () => V(k).footer?.linkRow ?? []);
					var je = z(A, 2), Me = L(je, !0);
					j(je), j(Ae), j(De);
					var Pe = z(De, 2), Fe = L(Pe), Ie = L(Fe, !0);
					j(Fe);
					var Le = z(Fe, 2), Re = L(Le), ze = (e) => {
						var t = Xc(), n = R(t), r = L(n), i = z(r);
						{
							let e = /* @__PURE__ */ N(() => V(k).footer?.align ?? "left"), t = /* @__PURE__ */ N(() => [
								["left", Z("common.left")],
								["center", Z("common.center")],
								["right", Z("common.right")]
							]);
							Q(i, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => $o("footer", (t) => {
									t.align = e;
								})
							});
						}
						j(n), Ne(2), B((e, t) => {
							X(n, "title", e), G(r, `${t ?? ""} `);
						}, [() => Z("tip.footer.align"), () => Z("lbl.align")]), W(e, t);
					};
					K(Re, (e) => {
						V(k).footer?.cta?.big !== !0 && e(ze);
					});
					var Be = z(Re, 2), Ve = L(Be, !0);
					j(Be);
					var He = z(Be, 2);
					n(He, () => Zn, () => V(k).footer?.background?.layers ?? []), j(Le), j(Pe);
					var Ue = z(Pe, 2), We = L(Ue), Ge = L(We, !0);
					j(We);
					var Ke = z(We, 2), qe = L(Ke), Je = L(qe), Ye = z(Je);
					J(Ye), j(qe);
					var Xe = z(qe, 2), Ze = L(Xe, !0);
					j(Xe);
					var Qe = z(Xe, 2);
					r(Qe, () => "baseline", () => V(k).footer?.baseline ?? []);
					var $e = z(Qe, 2), et = L($e, !0);
					j($e), j(Ke), j(Ue), j(t), B((e, t, n, r, s, c, l, u, d, p, m, h, g, v, E, te, ne, re, ie, oe, se, ce, fe, pe, me, ge, _e, ve, be, xe, Ce, Ee) => {
						X(i, "title", e), ai(a, t), G(o, ` ${n ?? ""}`), G(f, r), G(_, s), X(y, "title", c), G(b, `${l ?? ""} `), Y(x, V(k).footer?.brand?.title ?? ""), X(x, "placeholder", u), X(S, "title", d), G(C, `${p ?? ""} `), Y(w, V(k).footer?.brand?.tagline ?? ""), X(T, "title", m), G(ee, `${h ?? ""} `), G(ae, g), G(le, v), X(ue, "title", E), G(de, `${te ?? ""} `), G(he, ne), G(ye, re), G(Se, ie), X(we, "title", oe), ai(Te, se), G(D, ` ${ce ?? ""}`), G(ke, fe), G(Me, pe), G(Ie, me), G(Ve, ge), G(Ge, _e), X(qe, "title", ve), G(Je, `${be ?? ""} `), Y(Ye, V(k).footer?.copyright ?? ""), X(Ye, "placeholder", xe), G(Ze, Ce), G(et, Ee);
					}, [
						() => Z("tip.footer.show"),
						() => !!V(k).footer?.show,
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
						() => !!V(k).footer?.cta,
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
					]), H("change", a, (e) => $o("footer", (t) => {
						t.show = e.target.checked;
					})), H("input", x, (e) => es("title", e.target.value)), H("input", w, (e) => es("tagline", e.target.value)), H("click", ce, Os), H("click", ve, Rs), H("change", Te, (e) => ws(e.target.checked)), H("click", je, () => ms("linkRow")), H("input", Ye, (e) => us(e.target.value)), H("click", $e, () => ms("baseline")), W(e, t);
				}, b = (e) => {
					var t = Mu(), n = L(t), r = (e) => {
						var t = vc(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ N(() => V(Ha) ?? ""), t = /* @__PURE__ */ N(() => [["", Z("common.choose")], ...V(Ba).map((e) => [e, V(Va)[e]?.name ?? e])]);
							Q(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => I(Ha, e || null, !0)
							});
						}
						j(t), B((e) => G(n, `${e ?? ""} `), [() => Z("blocks.samling")]), W(e, t);
					};
					K(n, (e) => {
						V(Ba).length && e(r);
					});
					var i = z(n, 2), a = (e) => {
						let t = /* @__PURE__ */ N(() => V(Va)[V(Ha)]);
						var n = ju(), r = R(n), i = L(r), a = L(i, !0);
						j(i);
						var o = z(i, 2);
						q(o, () => c.cross, !0), j(o), j(r);
						var s = z(r, 2);
						Vr(s, 19, () => V(t).entries, (e) => e.id, (e, n, r) => {
							var i = Au(), a = L(i), o = L(a);
							j(a);
							var s = z(a, 2), l = L(s), u = L(l);
							J(u);
							var d = z(u, 2), f = L(d);
							q(f, () => c.up, !0), j(f);
							var p = z(f, 2);
							q(p, () => c.down, !0), j(p);
							var m = z(p, 2);
							q(m, () => c.cross, !0), j(m), j(d), j(l);
							var h = z(l, 2), g = L(h), _ = z(g);
							J(_), j(h);
							var v = z(h, 2);
							st(v);
							var y = z(v, 2), b = L(y), x = z(b);
							J(x), j(y);
							var S = z(y, 2), C = L(S), w = L(C), T = z(w);
							j(C);
							var ee = z(C, 2), E = (e) => {
								var t = ku(), r = R(t), i = z(r, 2);
								q(i, () => c.cross, !0), j(i), B((e) => {
									X(r, "src", V(n).image), X(i, "title", e);
								}, [() => Z("tip.removeImage")]), H("click", i, () => go(V(Ha), V(n).id, "image", "")), W(e, t);
							};
							K(ee, (e) => {
								V(n).image && e(E);
							}), j(S), j(s), j(i), B((e, i, a, s, c, l, d, h) => {
								G(o, `${e ?? ""}${V(n).date ? ` · ${V(n).date}` : ""}`), Y(u, V(n).title), X(u, "title", i), f.disabled = V(r) === 0, p.disabled = V(r) === V(t).entries.length - 1, X(m, "title", a), G(g, `${s ?? ""} `), Y(_, V(n).date ?? ""), X(v, "placeholder", c), Y(v, V(n).text ?? ""), G(b, `${l ?? ""} `), Y(x, V(n).href ?? ""), X(x, "placeholder", d), G(w, `${h ?? ""} `);
							}, [
								() => V(n).title.replace(/<[^>]*>/g, ""),
								() => Z("lbl.title"),
								() => Z("tip.collections.deleteEntry"),
								() => Z("lbl.date"),
								() => Z("ph.collections.text"),
								() => Z("lbl.link"),
								() => Z("ph.collections.href"),
								() => V(n).image ? Z("ui.changeImage") : Z("ui.addImage")
							]), H("change", u, (e) => go(V(Ha), V(n).id, "title", e.target.value || "Uten tittel")), H("click", f, () => _o(V(Ha), V(r), -1)), H("click", p, () => _o(V(Ha), V(r), 1)), H("click", m, () => vo(V(Ha), V(n).id)), H("change", _, (e) => go(V(Ha), V(n).id, "date", e.target.value)), H("change", v, (e) => go(V(Ha), V(n).id, "text", e.target.value)), H("change", x, (e) => go(V(Ha), V(n).id, "href", e.target.value)), H("change", T, (e) => So(V(Ha), V(n).id, e)), W(e, i);
						});
						var l = z(s, 2), u = (e) => {
							var t = xc(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("hint.collections.empty")]), W(e, t);
						};
						K(l, (e) => {
							V(t).entries.length || e(u);
						}), Ne(2), B((e, t) => {
							G(a, e), X(o, "title", t);
						}, [() => Z("ui.addEntry"), () => Z("tip.collections.deleteCollection")]), H("click", i, () => ho(V(Ha))), H("click", o, () => mo(V(Ha))), W(e, n);
					};
					K(i, (e) => {
						V(Ha) && V(Va)[V(Ha)] && e(a);
					});
					var o = z(i, 2), s = L(o), l = z(s);
					J(l), j(o);
					var u = z(o, 2), d = L(u);
					Q(z(d), {
						get value() {
							return V(Ka);
						},
						get options() {
							return Ja;
						},
						onchange: (e) => I(Ka, e, !0)
					}), j(u);
					var f = z(u, 2), p = L(f, !0);
					j(f), j(t), B((e, t, n, r, i) => {
						G(s, `${e ?? ""} `), X(l, "placeholder", t), G(d, `${n ?? ""} `), f.disabled = r, G(p, i);
					}, [
						() => Z("lbl.newCollectionName"),
						() => Z("ph.collections.name"),
						() => Z("common.type"),
						() => !V(Ga).trim(),
						() => Z("ui.createCollection")
					]), H("keydown", l, (e) => e.key === "Enter" && po()), li(l, () => V(Ga), (e) => I(Ga, e)), H("click", f, po), W(e, t);
				}, x = (e) => {
					var t = zu(), n = L(t), r = (e) => {
						var t = xc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("hint.plugins.empty")]), W(e, t);
					}, i = /* @__PURE__ */ N(() => !Po().length);
					K(n, (e) => {
						V(i) && e(r);
					});
					var a = z(n, 2);
					Vr(a, 16, Po, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ N(() => Do[t]), r = /* @__PURE__ */ N(() => (V(Eo)?.enabled ?? []).includes(t));
						var i = Fu();
						let a;
						var o = L(i), s = L(o), l = L(s, !0);
						j(s);
						var u = z(s, 2), d = (e) => {
							var t = Nu(), r = L(t);
							j(t), B(() => G(r, `v${V(n).version ?? ""}`)), W(e, t);
						};
						K(u, (e) => {
							V(n)?.version && e(d);
						});
						var f = z(u, 2), p = L(f), m = L(p);
						J(m);
						var h = z(m);
						j(p);
						var g = z(p, 2);
						q(g, () => c.cross, !0), j(g), j(f), j(o);
						var _ = z(o, 2), v = (e) => {
							var t = Pu(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => V(n).errors.join("; ")]), W(e, t);
						}, y = (e) => {
							var t = Pu(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Z("plugin.engineMismatch", {
								required: V(n).requiresEngine,
								current: V(Oo)
							})]), W(e, t);
						}, b = (e) => {
							var t = Pu(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Z("plugin.cspNeeded", { list: Ro(V(n).csp).join(", ") })]), W(e, t);
						}, x = /* @__PURE__ */ N(() => V(n)?.csp && Ro(V(n).csp).length);
						K(_, (e) => {
							V(n)?.errors?.length ? e(v) : V(n) && !V(n).satisfied ? e(y, 1) : V(x) && e(b, 2);
						});
						var S = z(_, 2), C = (e) => {
							var t = xc(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Z("plugin.languages", { list: V(n).languages.map((e) => e.name).join(", ") })]), W(e, t);
						};
						K(S, (e) => {
							V(n)?.languages?.length && e(C);
						}), j(i), B((e, t, o, s, c) => {
							a = Qr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": V(n)?.errors?.length }), G(l, e), X(p, "title", t), ai(m, V(r)), m.disabled = o, G(h, ` ${s ?? ""}`), X(g, "title", c);
						}, [
							() => V(n)?.names?.[Di()] ?? V(n)?.name ?? t,
							() => V(r) ? Z("tip.plugins.on") : Z("tip.plugins.off"),
							() => !!V(n)?.errors?.length,
							() => V(r) ? Z("ui.on") : Z("ui.off"),
							() => Z("tip.plugins.remove")
						]), H("change", m, (e) => Ko(t, e.target.checked)), H("click", g, () => Yo(t)), W(e, i);
					});
					var o = z(a, 2), s = (e) => {
						var t = Lu(), n = z(R(t), 2), r = L(n, !0);
						j(n), Vr(z(n, 2), 16, () => V(jo), (e) => e, (e, t) => {
							var n = Iu(), r = L(n), i = L(r), a = L(i, !0);
							j(i);
							var o = z(i, 2), s = (e) => {
								var n = Nu(), r = L(n);
								j(n), B(() => G(r, `v${Do[t].version ?? ""}`)), W(e, n);
							};
							K(o, (e) => {
								Do[t]?.version && e(s);
							});
							var l = z(o, 2), u = L(l);
							q(u, () => c.right, !0), j(u), j(l), j(r), j(n), B((e, t) => {
								G(a, e), X(u, "title", t);
							}, [() => Do[t]?.names?.[Di()] ?? Do[t]?.name ?? t, () => Z("tip.plugins.addFound")]), H("click", u, () => Zo(t)), W(e, n);
						}), B((e) => G(r, e), [() => Z("hint.plugins.found")]), W(e, t);
					};
					K(o, (e) => {
						V(jo).length && e(s);
					});
					var l = z(o, 2), u = (e) => {
						var t = jr(), n = R(t), r = (e) => {
							var t = xc(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("hint.plugins.autoDiscover")]), W(e, t);
						};
						K(n, (e) => {
							V(jo).length || e(r);
						}), W(e, t);
					}, d = (e) => {
						var t = Ru(), n = z(R(t), 2);
						J(n);
						var r = z(n, 2), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = (e) => {
							var t = Pu(), n = L(t, !0);
							j(t), B(() => G(n, V(Ao))), W(e, t);
						};
						K(a, (e) => {
							V(Ao) && e(o);
						}), B((e, t, a) => {
							X(n, "placeholder", e), r.disabled = t, G(i, a);
						}, [
							() => Z("ph.plugins.folder"),
							() => !V(ko).trim(),
							() => Z("ui.addPlugin")
						]), H("keydown", n, (e) => e.key === "Enter" && Xo()), li(n, () => V(ko), (e) => I(ko, e)), H("click", r, Xo), W(e, t);
					};
					K(l, (e) => {
						V(No) === "ok" ? e(u) : e(d, -1);
					}), j(t), W(e, t);
				}, S = (e) => {
					var t = bu(), n = L(t), r = (e) => {
						var t = xc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("hint.history.loading")]), W(e, t);
					}, i = (e) => {
						var t = Hu(), n = R(t), r = (e) => {
							var t = xc(), n = L(t, !0);
							j(t), B(() => G(n, V(U))), W(e, t);
						};
						K(n, (e) => {
							V(U) && e(r);
						});
						var i = z(n, 2), a = (e) => {
							var t = Vu(), n = R(t), r = L(n, !0);
							j(n), Vr(z(n, 2), 19, () => V(kr), (e) => e.sha, (e, t, n) => {
								var r = Bu();
								let i;
								var a = L(r), o = L(a, !0);
								j(a);
								var s = z(a, 2), c = L(s);
								j(s), j(r), B((e) => {
									i = Qr(r, 1, "history-row svelte-1n46o8q", null, i, { head: V(n) === 0 }), X(a, "title", V(t).sha), G(o, V(t).message), G(c, `${V(t).author ?? ""}${e ?? ""}`);
								}, [() => V(t).date ? ` · ${Nr.format(new Date(V(t).date))}` : ""]), W(e, r);
							}), B((e, t) => {
								n.disabled = V(Ar) || !V(T)?.allowed, X(n, "title", e), G(r, t);
							}, [() => V(T)?.allowed ? Z("tip.history.revert") : Z("tip.history.needsAccess"), () => Z("ui.revertLast")]), H("click", n, Fr), W(e, t);
						};
						K(i, (e) => {
							V(kr).length > 0 && e(a);
						}), W(e, t);
					};
					K(n, (e) => {
						V(kr) === null ? e(r) : e(i, -1);
					}), j(t), W(e, t);
				}, C = (e) => {
					var t = bu(), n = L(t), r = (e) => {
						var t = xc(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Z("update.checking")]), W(e, t);
					}, i = (e) => {
						var t = Uu(), n = R(t), r = L(n, !0);
						j(n);
						var i = z(n, 2), a = L(i, !0);
						j(i), B((e) => {
							G(r, V(zr)), G(a, e);
						}, [() => Z("update.retry")]), H("click", i, Ur), W(e, t);
					}, a = (e) => {
						var t = ed(), n = R(t), r = L(n), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = (e) => {
							var t = Wu(), n = R(t);
							q(n, () => c.right, !0), j(n);
							var r = z(n, 2), i = L(r, !0);
							j(r), B(() => G(i, V(Rr).target)), W(e, t);
						};
						K(a, (e) => {
							V(Rr).upToDate || e(o);
						}), j(n);
						var s = z(n, 2), l = (e) => {
							var t = xc(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Z("update.upToDate")]), W(e, t);
						}, u = (e) => {
							var t = $u(), n = R(t), r = L(n, !0);
							j(n);
							var i = z(n, 2), a = (e) => {
								var t = Gu(), n = L(t), r = L(n, !0);
								j(n);
								var i = z(n, 2), a = L(i), o = L(a, !0);
								j(a), j(i), j(t), B((e) => {
									G(r, e), G(o, V(Rr).notes);
								}, [() => Z("update.aboutVersion", { target: V(Rr).target })]), W(e, t);
							};
							K(i, (e) => {
								V(Rr).notes && e(a);
							});
							var o = z(i, 2), s = (e) => {
								var t = Ku(), n = L(t), r = L(n);
								q(r, () => c.warn, !0), j(r);
								var i = z(r);
								j(n);
								var a = z(n, 2), o = L(a), s = L(o, !0);
								j(o), j(a), j(t), B((e, t) => {
									X(n, "title", e), G(i, ` ${t ?? ""}`), G(s, V(Rr).headers.upstream);
								}, [() => Z("update.headersManual"), () => Z("update.headersTitle")]), W(e, t);
							};
							K(o, (e) => {
								V(Rr).headers?.upstream && e(s);
							});
							var l = z(o, 2);
							Vr(l, 17, () => V(Rr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = Ju(), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = L(a), s = (e) => {
									var t = qu(), n = L(t, !0);
									j(t), B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
								};
								K(o, (e) => {
									V(t).action === "delete" && e(s);
								});
								var l = z(o, 2);
								q(l, () => c.warn, !0), j(l), j(a), j(n), B((e) => {
									X(r, "title", V(t).path), G(i, V(t).path), X(l, "title", e);
								}, [() => Z(`update.conflict.${V(t).conflict}`)]), W(e, n);
							});
							var u = z(l, 2), d = L(u), f = L(d);
							j(d);
							var p = z(d, 2);
							Vr(p, 21, () => V(Rr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = Yu(), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = (e) => {
									var t = qu(), n = L(t, !0);
									j(t), B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
								};
								K(a, (e) => {
									V(t).action === "delete" && e(o);
								}), j(n), B(() => {
									X(r, "title", V(t).path), G(i, V(t).path);
								}), W(e, n);
							}), j(p), j(u);
							var m = z(u, 2), h = (e) => {
								var t = Qu(), n = R(t), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = L(a, !0);
								j(a), j(n), Vr(z(n, 2), 17, () => V(Rr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = Zu(), r = L(n);
									let i;
									var a = L(r, !0);
									j(r);
									var o = z(r, 2), s = L(o), l = (e) => {
										var t = qu(), n = L(t, !0);
										j(t), B((e) => G(n, e), [() => Z("update.actionDelete")]), W(e, t);
									};
									K(s, (e) => {
										V(t).action === "delete" && e(l);
									});
									var u = z(s, 2), d = (e) => {
										var n = Xu();
										q(n, () => c.warn, !0), j(n), B((e) => X(n, "title", e), [() => Z(`update.conflict.${V(t).conflict}`)]), W(e, n);
									};
									K(u, (e) => {
										V(t).conflict && e(d);
									});
									var f = z(u, 2);
									J(f), j(o), j(n), B((e, n, o, s) => {
										i = Qr(r, 1, "update-path svelte-1n46o8q", null, i, e), X(r, "title", V(t).path), G(a, V(t).path), ai(f, n), X(f, "title", o), X(f, "aria-label", s);
									}, [
										() => ({ skipped: V(Hr).has(V(t).path) }),
										() => V(Hr).has(V(t).path),
										() => Z("update.keepMine.title"),
										() => Z("update.keepMine")
									]), H("change", f, () => Wr(V(t).path)), W(e, n);
								}), B((e, t) => {
									G(i, e), G(o, t);
								}, [() => Z("update.optionalTitle"), () => Z("update.keepMine")]), W(e, t);
							}, g = /* @__PURE__ */ N(() => V(Rr).changes.some((e) => !e.atom));
							K(m, (e) => {
								V(g) && e(h);
							});
							var _ = z(m, 2), v = L(_, !0);
							j(_), B((e, t, n, i, a, o) => {
								G(r, e), X(d, "title", t), G(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = V(Br) || !V(T)?.allowed, X(_, "title", a), G(v, o);
							}, [
								() => Z("update.summary", {
									writes: V(Rr).changes.filter((e) => e.action === "write").length,
									deletes: V(Rr).changes.filter((e) => e.action === "delete").length
								}),
								() => Z("update.atomGroup.title"),
								() => Z("update.atomTitle"),
								() => V(Rr).changes.filter((e) => e.atom).length,
								() => V(T)?.allowed ? Z("update.run.title") : Z("tip.history.needsAccess"),
								() => Z("update.run", { target: V(Rr).target })
							]), H("click", _, Gr), W(e, t);
						};
						K(s, (e) => {
							V(Rr).upToDate ? e(l) : e(u, -1);
						}), B((e) => G(i, e), [() => Z("update.current", { version: V(Rr).current })]), W(e, t);
					};
					K(n, (e) => {
						V(Br) && !V(Rr) ? e(r) : V(zr) ? e(i, 1) : V(Rr) && e(a, 2);
					}), j(t), W(e, t);
				};
				K(s, (e) => {
					V(ct) === "pages" ? e(l) : V(ct) === "nav" ? e(u, 1) : V(ct) === "site" ? e(f, 2) : V(ct) === "theme" ? e(p, 3) : V(ct) === "blocks" ? e(h, 4) : V(ct) === "grid" ? e(_, 5) : V(ct) === "properties" ? e(v, 6) : V(ct) === "footer" ? e(y, 7) : V(ct) === "collections" ? e(b, 8) : V(ct) === "plugins" ? e(x, 9) : V(ct) === "history" ? e(S, 10) : V(ct) === "update" && e(C, 11);
				}), j(t), B((e) => {
					X(i, "title", e), G(o, dt[V(ct)]);
				}, [() => ft[V(ct)]?.map((e) => Z(e)).join("\n")]), W(e, t);
			};
			K(v, (e) => {
				V(ct) && e(y);
			}), B((e) => {
				p = Qr(f, 1, "rail-gear svelte-1n46o8q", null, p, { active: V(ti) }), X(f, "title", e);
			}, [() => Z("settings.title")]), H("click", f, () => I(ti, !V(ti))), W(e, t);
		};
		K(i, (e) => {
			V(E) && e(o);
		});
		var s = z(i, 2);
		let f;
		var p = L(s), h = L(p);
		pi(h, (e) => I(w, e), () => V(w)), j(p), j(s), pi(s, (e) => I(ae, e), () => V(ae)), j(t), B((e) => {
			f = Qr(s, 1, "frame-wrap svelte-1n46o8q", null, f, {
				mobile: V(ie) === "mobile",
				pan: V(ye)
			}), ei(p, `width:${V(_e) ?? ""}px; height:${V(ve) ?? ""}px`), X(h, "title", e), X(h, "src", `/?page=${V(g)}&preview=1`), ei(h, `width:${V(pe) ?? ""}px; height:${V(ge) ?? ""}px; transform:scale(${V(me) ?? ""}); transform-origin:top left`);
		}, [() => Z("ui.previewTitle")]), Sr("load", h, Xr), br(h), W(e, t);
	}, qf = (e) => {
		var t = id(), n = L(t, !0);
		j(t), B((e) => G(n, e), [() => Z("ui.loading")]), W(e, t);
	};
	K(Gf, (e) => {
		V(h) ? e(Kf) : e(qf, -1);
	});
	var Jf = z(Gf, 2), Yf = (e) => {
		Ra(e, {
			get image() {
				return V(Ii);
			},
			onapply: Ri,
			oncancel: () => I(Ii, null)
		});
	};
	K(Jf, (e) => {
		V(Ii) && e(Yf);
	});
	var Xf = z(Jf, 2), Zf = (e) => {
		var t = od(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var a = z(r, 2);
		Vr(a, 16, () => V(Ye).lines, (e) => e, (e, t) => {
			var n = ad(), r = L(n, !0);
			j(n), B(() => G(r, t)), W(e, n);
		});
		var o = z(a, 2), s = (e) => {
			var t = Oc();
			J(t), ot(t, !0), B(() => X(t, "placeholder", V(Ye).placeholder)), H("keydown", t, (e) => e.key === "Enter" && V(Ye).value.trim() && Qe(!0)), li(t, () => V(Ye).value, (e) => V(Ye).value = e), W(e, t);
		};
		K(o, (e) => {
			V(Ye).prompt && e(s);
		});
		var c = z(o, 2), l = L(c), u = L(l, !0);
		j(l);
		var d = z(l, 2), f = L(d, !0);
		j(d), j(c), j(n), j(t), B(() => {
			G(i, V(Ye).title), G(u, V(Ye).cancelLabel), G(f, V(Ye).okLabel);
		}), H("pointerdown", t, (e) => $e = e.target === e.currentTarget), H("click", t, (e) => $e && e.target === e.currentTarget && Qe(!1)), H("click", l, () => Qe(!1)), H("click", d, () => Qe(!0)), W(e, t);
	};
	K(Xf, (e) => {
		V(Ye) && e(Zf);
	});
	var Qf = z(Xf, 2), $f = (e) => {
		var t = sd(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var a = z(r, 2), o = L(a, !0);
		j(a);
		var s = z(a, 2), c = L(s), l = z(c);
		J(l), j(s);
		var u = z(s, 2), d = L(u), f = z(d);
		{
			let e = /* @__PURE__ */ N(() => Z("setup.accentPick"));
			Ui(f, {
				get value() {
					return V(nt);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => I(nt, e, !0)
			});
		}
		j(u);
		var p = z(u, 2), m = L(p), h = z(m);
		{
			let e = /* @__PURE__ */ N(() => Z("setup.bgLabel"));
			Ui(h, {
				get value() {
					return V(rt);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => I(rt, e, !0)
			});
		}
		j(p);
		var g = z(p, 2), _ = L(g, !0);
		j(g);
		var v = z(g, 2), y = L(v), b = L(y, !0);
		j(y);
		var x = z(y, 2), S = L(x, !0);
		j(x), j(v), j(n), j(t), B((e, t, n, r, a, s, u, f, p, h) => {
			G(i, e), G(o, t), G(c, `${n ?? ""} `), X(l, "placeholder", r), G(d, `${a ?? ""} `), G(m, `${s ?? ""} `), G(_, u), G(b, f), x.disabled = p, G(S, h);
		}, [
			() => Z("setup.title"),
			() => Z("setup.intro"),
			() => Z("setup.nameLabel"),
			() => Z("ph.setup.name"),
			() => Z("setup.accentLabel"),
			() => Z("setup.bgLabel"),
			() => Z("setup.outro"),
			() => Z("setup.skip"),
			() => !V(tt).trim(),
			() => Z("setup.start")
		]), H("keydown", l, (e) => e.key === "Enter" && at()), li(l, () => V(tt), (e) => I(tt, e)), H("click", y, it), H("click", x, at), W(e, t);
	};
	K(Qf, (e) => {
		V(et) && e($f);
	});
	var ep = z(Qf, 2), tp = (e) => {
		var t = cd();
		let n;
		var r = L(t), i = L(r, !0);
		j(r);
		var a = z(r, 2);
		j(t), B((e) => {
			n = Qr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: V(y) === "ok",
				error: V(y) === "error"
			}), G(i, V(v)), X(a, "title", e);
		}, [() => Z("ui.close")]), H("click", a, () => x("")), W(e, t);
	};
	K(ep, (e) => {
		V(v) && e(tp);
	}), j(kf);
	var np = z(kf, 2), rp = (e) => {
		var t = ld(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var o = z(r, 2);
		q(o, () => c.cross, !0), j(o), j(n);
		var s = z(n, 2), l = L(s);
		a(l), j(s), j(t), B((e, n) => {
			ei(t, `left: ${V(wt).left ?? ""}px; top: ${V(wt).top ?? ""}px`), G(i, e), X(o, "title", n);
		}, [() => Z("blocks.suffix", { label: Xt[V(M).type] ?? V(M).type }), () => Z("tip.closeEsc")]), H("click", o, () => I(wt, null)), W(e, t);
	};
	K(np, (e) => {
		V(wt) && V(M) && e(rp);
	}), B(() => Nf = Qr(Mf, 1, "topbar svelte-1n46o8q", null, Nf, { hidden: !V(E) })), W(e, Of), Ge();
}
//#endregion
//#region src/main.js
Cr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await Ai();
var fd = Mr(dd, { target: document.getElementById("urd-admin") });
//#endregion
export { fd as default };
