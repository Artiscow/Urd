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
function D() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ve(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function O() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function k() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function ye() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function be() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var xe = {}, Se = Symbol("uninitialized"), A = "http://www.w3.org/1999/xhtml", Ce = "http://www.w3.org/2000/svg", we = "http://www.w3.org/1998/Math/MathML";
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
var Oe = !1;
function ke(e) {
	Oe = e;
}
var Ae;
function je(e) {
	if (e === null) throw Ee(), xe;
	return Ae = e;
}
function Me() {
	return je(/* @__PURE__ */ un(Ae));
}
function j(e) {
	if (Oe) {
		if (/* @__PURE__ */ un(Ae) !== null) throw Ee(), xe;
		Ae = e;
	}
}
function Ne(e = 1) {
	if (Oe) {
		for (var t = e, n = Ae; t--;) n = /* @__PURE__ */ un(n);
		Ae = n;
	}
}
function Pe(e = !0) {
	for (var t = 0, n = Ae;;) {
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
	if (!e || e.nodeType !== 8) throw Ee(), xe;
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
	Oe && /* @__PURE__ */ ln(e) !== null && dn(e);
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
function M(e, t, n, r = n) {
	e.addEventListener(t, () => ut(n));
	let i = e[ue];
	e[ue] = i ? () => {
		i(), r(!0);
	} : () => r(!0), lt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function dt(e) {
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
var ft = S | C;
function pt(e, t, n, r) {
	new mt(e, t, n, r);
}
var mt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = Oe ? Ae : null;
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
	#h = dt(() => (this.#m = Yt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Kn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Kn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = En(() => {
			if (Oe) {
				let e = this.#t;
				Me();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, ft), Oe && (this.#e = Ae);
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
				De();
				return;
			}
			t = !0, n && be(), this.#s !== null && Pn(this.#s, () => {
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
		Ot?.is_fork ? (this.#a && Ot.skip_effect(this.#a), this.#o && Ot.skip_effect(this.#o), this.#s && Ot.skip_effect(this.#s), Ot.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (jn(this.#a), null), this.#o &&= (jn(this.#o), null), this.#s &&= (jn(this.#s), null), Oe && (je(this.#t), Ne(), je(Pe()));
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
function ht(e, t, n, r) {
	let i = Ke() ? vt : xt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Kn, c = gt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Qe(e, s);
			}
			_t();
		}
	}
	var d = N();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ bt(e))).then(u).catch((e) => Qe(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), _t();
	}) : f();
}
function gt() {
	var e = Kn, t = Un, n = He, r = Ot;
	return function(i = !0) {
		qn(e), Gn(t), Ue(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function _t(e = !0) {
	qn(null), Gn(null), Ue(null), e && Ot?.deactivate();
}
function N() {
	var e = Kn, t = e.b, n = Ot, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function vt(e) {
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
		v: Se,
		wv: 0,
		parent: Kn,
		ac: null
	};
}
var yt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function bt(e, t, n) {
	let r = Kn;
	r === null && pe();
	var i = void 0, a = Yt(Se), o = !Un, s = /* @__PURE__ */ new Set();
	return wn(() => {
		var t = Kn, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
			}).finally(_t);
		} catch (e) {
			n.reject(e), _t();
		}
		var c = Ot;
		if (o) {
			if (t.f & 32768) var l = N();
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
function P(e) {
	let t = /* @__PURE__ */ vt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function xt(e) {
	let t = /* @__PURE__ */ vt(e);
	return t.equals = Re, t;
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
	if (!Vn && r !== null && e.v !== Se && r.f & 24576) return Te(), e.v;
	qn(r);
	try {
		e.f &= ~ee, St(e), t = sr(e);
	} finally {
		qn(n);
	}
	return t;
}
function wt(e) {
	var t = Ct(e);
	if (!e.equals(t) && (e.wv = ir(), (!Ot?.is_fork || e.deps === null) && (Ot === null ? e.v = t : (Ot.capture(e, t, !0), kt?.capture(e, t, !0)), e.deps === null))) {
		et(e, h);
		return;
	}
	Vn || (At === null ? tt(e) : (vn() || Ot?.is_fork) && At.set(e, t));
}
function Tt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ut(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), lr(t, 0), kn(t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && ur(t);
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
		if (Ot = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Wt(e, t);
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
		this.#r.clear(), kt = this, Ht(r), Ht(n), kt = null, this.#s?.resolve();
		var s = Ot;
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
		this.oncommit(() => e.discard()), e.#x(), Ot = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) rt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== Se && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), At?.set(e, t)), this.is_fork || (e.v = t);
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
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, Ot = null, At = null, qt.clear();
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
		if (Ot === null) {
			let t = Ot = new e();
			!Nt && !Mt && Ye(() => {
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
function zt(e) {
	var t = Mt;
	Mt = !0;
	try {
		var n;
		for (e && (Ot !== null && !Ot.is_fork && Ot.flush(), n = e());;) {
			if (Xe(), Ot === null) return n;
			Ot.flush();
		}
	} finally {
		Mt = t;
	}
}
function Bt() {
	try {
		D();
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
	Ot.schedule(e);
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
	return Un !== null && (!Wn || Un.f & 131072) && Ke() && Un.f & 4325394 && (Jn === null || !Jn.has(e)) && ye(), Zt(e, n ? tn(t) : t, Ft);
}
function Zt(e, t, n = null) {
	if (!e.equals(t)) {
		qt.set(e, Vn ? t : e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Ct(t), At === null && tt(t);
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
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && O();
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
					let e = f(() => /* @__PURE__ */ F(Se, u));
					r.set(t, e), $t(o);
				}
			} else I(n, Se), $t(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(tn(s ? e[n] : Se), u)), r.set(n, o)), o !== void 0) {
				var c = V(o);
				return c === Se ? void 0 : c;
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
			return (n !== void 0 || Kn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? tn(e[t]) : Se, u)), r.set(t, n)), V(n) === Se) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(Se, u)), r.set(d + "", p)) : I(p, Se);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, tn(n)), r.set(t, c));
			else {
				l = c.v !== Se;
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
				return t === void 0 || t.v !== Se;
			});
			for (var [n, i] of r) i.v !== Se && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			k();
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
	if (!Oe) return /* @__PURE__ */ ln(e);
	var n = /* @__PURE__ */ ln(Ae);
	if (n === null) n = Ae.appendChild(cn());
	else if (t && n.nodeType !== 3) {
		var r = cn();
		return n?.before(r), je(r), r;
	}
	return t && mn(n), je(n), n;
}
function R(e, t = !1) {
	if (!Oe) {
		var n = /* @__PURE__ */ ln(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ un(n) : n;
	}
	if (t) {
		if (Ae?.nodeType !== 3) {
			var r = cn();
			return Ae?.before(r), je(r), r;
		}
		mn(Ae);
	}
	return Ae;
}
function z(e, t = 1, n = !1) {
	let r = Oe ? Ae : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ un(r);
	if (!Oe) return r;
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
	Ot?.register_created_effect(r);
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
	ht(r, t, n, (t) => {
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
			if (ar(a) && wt(a), a.wv > e.wv) return !0;
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
		var f = e.deps, p = Ot?.is_fork;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~ee), s.v !== Se && tt(s), s.ac !== null && ut(() => {
			s.ac.abort(de), s.ac = null, et(s, g);
		}), Tt(s), lr(s, 0);
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
			return (!(a.f & 1024) && a.reactions !== null || pr(a)) && (o = Ct(a)), qt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Wn && Un !== null && (Bn || !!(Un.f & 512)), c = (a.f & b) === 0;
		ar(a) && (s && (a.f |= 512), wt(a)), s && !c && (Et(a), fr(a));
	}
	if (At?.has(e)) return At.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function fr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Et(t), fr(t));
}
function pr(e) {
	if (e.v === Se) return !0;
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
	if (!Oe) return;
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
		if (Oe) return kr(Ae, null), Ae;
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
	if (!Oe) {
		var t = cn(e + "");
		return kr(t, t), t;
	}
	var n = Ae;
	return n.nodeType === 3 ? mn(n) : (n.before(n = cn()), je(n)), kr(n, n), n;
}
function jr() {
	if (Oe) return kr(Ae, null), Ae;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = cn();
	return e.append(t, n), kr(t, n), e;
}
function W(e, t) {
	if (Oe) {
		var n = Kn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ae), Me();
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
		pt(s, { pending: () => {} }, (t) => {
			We({});
			var n = He;
			if (o && (n.c = o), a && (i.$$events = a), Oe && kr(t, null), l = e(t, i) || {}, Oe && (Kn.nodes.end = Ae, Ae === null || Ae.nodeType !== 8 || Ae.data !== "]")) throw Ee(), xe;
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
		var n = Ot, r = fn();
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
		} else Oe && (this.anchor = Ae), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function K(e, t, n = !1) {
	var r;
	Oe && (r = Ae, Me());
	var i = new Ir(e), a = n ? S : 0;
	function o(e, t) {
		if (Oe) {
			var n = Fe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Pe();
				je(a), i.anchor = a, ke(!1), i.ensure(e, t), ke(!0);
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
		c = Oe ? je(/* @__PURE__ */ ln(u)) : u.appendChild(cn());
	}
	Oe && Me();
	var d = null, f = /* @__PURE__ */ xt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Ur(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= T, q(d, null, c)) : In(d) : Pn(d, () => {
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
			Oe && Fe(c) === "[!" != (e === 0) && (c = Pe(), je(c), ke(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = Ot, v = fn(), y = 0; y < e; y += 1) {
				Oe && Ae.nodeType === 8 && Ae.data === "]" && (c = Ae, t = !0, ke(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Zt(S.v, b), S.i && Zt(S.i, y), v && u.unskip_effect(S.e)) : (S = Wr(l, h ? c : Br ??= cn(), b, x, y, o, n, i), h || (S.e.f |= T), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = Dn(() => s(c)) : (d = Dn(() => s(Br ??= cn())), d.f |= T)), e > r.size && me("", "", ""), Oe && e > 0 && je(Pe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && ke(!0), V(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, Oe && (c = Ae);
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
		if (_.f & 8192 && (In(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= T, _ === l) q(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Gr(e, d, _), Gr(e, _, y), q(_, y, n), d = _, p = [], m = [], l = Hr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) q(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Gr(e, S.prev, C.next), Gr(e, d, S), Gr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), q(_, l, n), Gr(e, _.prev, _.next), Gr(e, _, d === null ? e.effect.first : d.next), Gr(e, d, _), d = _;
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
function q(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ un(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Gr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function J(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		Oe && (o = je(/* @__PURE__ */ ln(c)));
	}
	B(() => {
		var e = Kn;
		if (s === (s = t() ?? "")) {
			Oe && Me();
			return;
		}
		if (n && !Oe) {
			e.nodes = null, c.innerHTML = s, s !== "" && kr(/* @__PURE__ */ ln(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Mn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (Oe) {
				for (var a = Ae.data, l = Me(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ un(l);
				if (l === null) throw Ee(), xe;
				kr(Ae, u), o = je(l);
				return;
			}
			var d = pn(r ? "svg" : i ? "math" : "template", r ? Ce : i ? we : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (kr(/* @__PURE__ */ ln(f), f.lastChild), r || i) for (; /* @__PURE__ */ ln(f);) o.before(/* @__PURE__ */ ln(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Kr = [..." 	\n\r\f\xA0\v﻿"];
function qr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Kr.includes(r[o - 1])) && (s === r.length || Kr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function Jr(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function Yr(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Xr(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(Yr)), i && c.push(...Object.keys(i).map(Yr));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = Yr(e.substring(l, u).trim());
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
		return r && (n += Jr(r)), i && (n += Jr(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Zr(e, t, n, r, i, a) {
	var o = e[se];
	if (Oe || o !== n || o === void 0) {
		var s = qr(n, r, a);
		(!Oe || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[se] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function Qr(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function $r(e, t, n, r) {
	var i = e[ce];
	if (Oe || i !== t) {
		var a = Xr(t, r);
		(!Oe || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ce] = t;
	} else r && (Array.isArray(r) ? (Qr(e, n?.[0], r[0]), Qr(e, n?.[1], r[1], "important")) : Qr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ei = Symbol("is custom element"), ti = Symbol("is html"), ni = fe ? "link" : "LINK", ri = fe ? "progress" : "PROGRESS";
function Y(e) {
	if (Oe) {
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
		e[ue] = n, Ye(n), lt();
	}
}
function X(e, t) {
	var n = ai(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === ri) && (e.value = t ?? "");
}
function ii(e, t) {
	var n = ai(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Z(e, t, n, r) {
	var i = ai(e);
	Oe && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ni) || i[t] !== (i[t] = n) && (t === "loading" && (e[ae] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && si(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ai(e) {
	return e[oe] ??= {
		[ei]: e.nodeName.includes("-"),
		[ti]: e.namespaceURI === A
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
	M(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = li(e) ? ui(a) : a, n(a), Ot !== null && r.add(Ot), await dr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (Oe && e.defaultValue !== e.value || mr(t) == null && e.value) && (n(li(e) ? ui(e.value) : e.value), Ot !== null && r.add(Ot)), Tn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = Ot;
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
	var i = He.r, a = Kn;
	return Cn(() => {
		var o, s;
		return Tn(() => {
			o = s, s = r?.() || [], mr(() => {
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
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ vt(r), V(u)) : (l && (l = !1, c = s ? mr(r) : r), c);
	let f;
	if (o) {
		var p = re in e || ie in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = at(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ve(t), f(m)));
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
			let n = t ? V(y) : i && o ? tn(e) : e;
			return I(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Vn && v || b.f & 16384 ? y.v : V(y);
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
}, hi = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], gi = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, _i = {
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
function vi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(_i)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function yi(e) {
	return hi.includes(String(e ?? ""));
}
function bi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages må være en liste"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: hvert innslag må være et objekt");
			continue;
		}
		let e = String(n.code ?? "");
		gi.test(e) ? yi(e) && t.push(`languages: '${e}' er innebygd i Urd og kan ikke overstyres`) : t.push(`languages: '${e}' er ikke en gyldig språkkode`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name mangler (språkets eget navn)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} må være boolsk`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: må dekke site, admin eller begge`);
	}
	return t;
}
function xi(e) {
	let t = vi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return gi.test(n) ? n : "nb";
}
async function Si(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...mi.strings });
var Ci = {
	lang: "nb",
	dict: {}
};
function wi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Q(e, t) {
	return wi(Ci.dict[e] ?? e, t);
}
function Ti(e) {
	let t = `api.${e?.code}`;
	return e?.code && Ci.dict[t] !== void 0 ? wi(Ci.dict[t], e) : e?.error ?? null;
}
function Ei() {
	return Ci.lang;
}
function Di() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return xi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = vi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Oi;
new Promise((e) => {
	Oi = e;
});
async function ki(e = Di()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Ci.lang = xi(e);
	let n = yi(Ci.lang);
	try {
		Object.assign(Ci.dict, await t("nb")), n && Ci.lang !== "nb" && Object.assign(Ci.dict, await t(Ci.lang));
	} catch {}
	if (!n) {
		let e = await Si(Ci.lang, "admin");
		e ? Object.assign(Ci.dict, e) : Ci.lang = "nb";
	}
	return Oi(Ci.lang), Ci.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region src/lib/draftStore.js
function Ai(e, t, n) {
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
var ji = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Mi = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Ni = /* @__PURE__ */ U("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Pi = /* @__PURE__ */ U("<button type=\"button\"></button>"), Fi = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Ii = /* @__PURE__ */ U("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), Li = /* @__PURE__ */ U("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Ri = /* @__PURE__ */ U("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), zi = /* @__PURE__ */ U("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Bi = /* @__PURE__ */ U("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), Vi = /* @__PURE__ */ U("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Hi(e, t) {
	We(t, !0);
	let n = pi(t, "value", 3, "#000000"), r = pi(t, "tokens", 19, () => []), i = pi(t, "label", 19, () => Q("cp.pickColor")), a = pi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
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
	var ge = Vi(), _e = L(ge);
	let D;
	var ve = z(_e, 2), O = (e) => {
		var n = ji();
		B((e, t) => {
			Z(n, "title", e), Z(n, "aria-label", t);
		}, [() => Q("cp.clearTitle"), () => Q("cp.clear")]), H("click", n, () => t.onchange?.("")), W(e, n);
	};
	K(ve, (e) => {
		a() && n() && e(O);
	});
	var k = z(ve, 2), ye = (e) => {
		var t = Bi(), i = L(t), a = L(i);
		j(i);
		var o = z(i, 2);
		Y(o);
		var s = z(o, 2);
		Y(s);
		var c = z(s, 2), f = L(c), p = z(f, 2);
		Y(p);
		var h = z(p, 2), g = (e) => {
			var t = Mi();
			B((e) => Z(t, "title", e), [() => Q("cp.eyedropper")]), H("click", t, fe), W(e, t);
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
			var r = Ni();
			Y(r), B((e) => {
				Z(r, "title", t), X(r, e);
			}, [() => le(V(n))]), H("change", r, (e) => ue(V(n), e.target.value)), W(e, r);
		}), j(C);
		var w = z(C, 2), T = (e) => {
			var t = Fi(), i = R(t), a = L(i, !0), o = z(a), s = (e) => {
				var t = Ar();
				B((e) => G(t, e), [() => Q("cp.linkedSuffix", { token: l() })]), W(e, t);
			}, c = /* @__PURE__ */ P(() => l());
			K(o, (e) => {
				V(c) && e(s);
			}), j(i);
			var u = z(i, 2);
			Vr(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ P(() => m(V(t), 2));
				let i = () => V(r)[0], a = () => V(r)[1];
				var o = Pi();
				let s;
				B((e) => {
					s = Zr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), $r(o, `background: ${a() ?? ""}`), Z(o, "title", e);
				}, [() => Q("cp.tokenTitle", { name: i() })]), H("click", o, () => oe(i(), a())), W(e, o);
			}), j(u), B((e) => G(a, e), [() => Q("cp.themeColors")]), W(e, t);
		};
		K(w, (e) => {
			r().length && e(T);
		});
		var ee = z(w, 2), te = L(ee), re = z(te);
		j(ee);
		var ie = z(ee, 2), ae = (e) => {
			var t = Li();
			Vr(t, 20, () => V(d), (e) => e, (e, t) => {
				var n = Ii(), r = L(n), i = z(r, 2);
				j(n), B((e) => {
					$r(r, `background: ${t ?? ""}`), Z(r, "title", t), Z(i, "title", e);
				}, [() => Q("cp.removeSaved")]), H("click", r, () => pe(t)), H("click", i, () => he(t)), W(e, n);
			}), j(t), W(e, t);
		};
		K(ie, (e) => {
			V(d).length && e(ae);
		});
		var ge = z(ie, 2), _e = (e) => {
			var t = zi(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2);
			Vr(i, 20, () => V(u), (e) => e, (e, t) => {
				var n = Ri();
				B(() => {
					$r(n, `background: ${t ?? ""}`), Z(n, "title", t);
				}), H("click", n, () => pe(t)), W(e, n);
			}), j(i), B((e) => G(r, e), [() => Q("common.recent")]), W(e, t);
		};
		K(ge, (e) => {
			V(u).length && e(_e);
		}), j(t), B((e, n, r, c, l) => {
			$r(t, `top: ${V(_).top ?? ""}px; left: ${V(_).left ?? ""}px`), $r(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${V(v) ?? ""}, 100%, 50%)`), $r(a, `left: ${V(y) * 100}%; top: ${(1 - V(b)) * 100}%`), X(o, V(v)), X(s, e), Z(s, "title", n), $r(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), $r(f, `background: ${V(S) ?? ""}`), X(p, V(S)), G(te, `${c ?? ""} `), Z(re, "title", l);
		}, [
			() => Math.round(V(x) * 100),
			() => Q("cp.alpha"),
			() => E(),
			() => Q("cp.saved"),
			() => Q("cp.saveTitle")
		]), H("click", t, (e) => e.preventDefault()), H("pointerdown", i, se), H("input", o, (e) => {
			I(v, Number(e.target.value), !0), ne();
		}), H("input", s, (e) => {
			I(x, Number(e.target.value) / 100), ne();
		}), H("change", p, ce), H("click", re, me), W(e, t);
	};
	K(k, (e) => {
		V(g) && e(ye);
	}), j(ge), fi(ge, (e) => I(h, e), () => V(h)), B((e, t, n) => {
		D = Zr(_e, 1, "cp-swatch svelte-zxiloo", null, D, e), $r(_e, `background: ${t ?? ""}`), Z(_e, "title", n), Z(_e, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? Q("cp.linkedTitle", {
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
//#region ../template/assets/engine/0.6.10/imageTools.js
var Ui = 1600, Wi = .82, Gi = .6;
async function Ki(e, t = Ui) {
	if (Ji(e)) return Yi(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(Wi);
	return c.size > 4e5 && (c = await s(Gi)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var qi = "image/svg+xml";
function Ji(e) {
	return e.type === qi || /\.svg$/i.test(e.name || "");
}
function Yi(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${qi};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function Xi(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function Zi(e) {
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
function Qi(e) {
	return /^data:image\/svg\+xml[;,]/.test(e || "") ? "svg" : "webp";
}
function $i(e, t = "bilde") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function ea(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.10/glyphs.js
var ta = "urd-recent-glyphs", na = [
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
function ra(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function ia() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function aa(e) {
	let t = ra(ia(), e);
	try {
		localStorage.setItem(ta, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.10/icons.js
var oa = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", sa = "fill=\"currentColor\" stroke=\"none\"", ca = {
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
}, la = [
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
function ua(e) {
	let t = typeof e == "string" ? ca[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? sa : oa} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var da = /* @__PURE__ */ U("<img class=\"gp-own svelte-15ln1c3\"/>"), fa = /* @__PURE__ */ U("<span class=\"gp-svg svelte-15ln1c3\"></span>"), pa = /* @__PURE__ */ U("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ma = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), ha = /* @__PURE__ */ U("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), ga = /* @__PURE__ */ U("<button type=\"button\"> </button>"), _a = /* @__PURE__ */ U("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), va = /* @__PURE__ */ U("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), ya = /* @__PURE__ */ U("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function ba(e, t) {
	We(t, !0);
	let n = pi(t, "value", 3, "★"), r = pi(t, "icon", 3, null), i = pi(t, "image", 3, null), a = pi(t, "label", 19, () => Q("gp.pickGlyph")), o = /* @__PURE__ */ F(tn([])), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null), l = /* @__PURE__ */ F(!1), u = /* @__PURE__ */ F(tn({
		top: 0,
		left: 0
	}));
	function d() {
		I(o, ia(), !0);
		let e = V(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		I(u, {
			top: n,
			left: t
		}, !0), I(l, !0);
	}
	function f(e) {
		aa(e), t.onpick?.(e), I(l, !1);
	}
	function p(e) {
		t.onicon?.(e), I(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Ki(n, 256);
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
	var g = ya(), _ = L(g), v = L(_), y = (e) => {
		var t = da();
		B((e) => {
			Z(t, "src", i()), Z(t, "alt", e);
		}, [() => Q("gp.ownIcon")]), W(e, t);
	}, b = (e) => {
		var t = fa();
		J(t, () => ua(r()), !0), j(t), W(e, t);
	}, x = (e) => {
		var t = Ar();
		B(() => G(t, n() || "★")), W(e, t);
	};
	K(v, (e) => {
		i() ? e(y) : r() && ca[r()] ? e(b, 1) : e(x, -1);
	}), j(_);
	var S = z(_, 2), C = (e) => {
		var i = va(), a = L(i), s = (e) => {
			var t = ma(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2);
			Vr(i, 20, () => V(o), (e) => e, (e, t) => {
				var n = pa(), r = L(n, !0);
				j(n), B(() => G(r, t)), H("click", n, () => f(t)), W(e, n);
			}), j(i), B((e) => G(r, e), [() => Q("common.recent")]), W(e, t);
		};
		K(a, (e) => {
			V(o).length && e(s);
		});
		var l = z(a, 2), d = (e) => {
			var t = jr();
			Vr(R(t), 17, () => la, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ P(() => m(V(t), 2));
				let i = () => V(n)[0], a = () => V(n)[1];
				var o = ma(), s = R(o), c = L(s, !0);
				j(s);
				var l = z(s, 2);
				Vr(l, 20, a, (e) => e, (e, t) => {
					var n = ha();
					let i;
					var a = L(n);
					J(a, () => ua(t), !0), j(a), j(n), B(() => {
						i = Zr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), Z(n, "title", ca[t].label);
					}), H("click", n, () => p(t)), W(e, n);
				}), j(l), B((e) => G(c, e), [() => Q(i())]), W(e, o);
			}), W(e, t);
		};
		K(l, (e) => {
			t.onicon && e(d);
		});
		var g = z(l, 2);
		Vr(g, 17, () => na, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(V(t), 2));
			let i = () => V(r)[0], a = () => V(r)[1];
			var o = ma(), s = R(o), c = L(s, !0);
			j(s);
			var l = z(s, 2);
			Vr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = ga();
				let i;
				var a = L(r, !0);
				j(r), B(() => {
					i = Zr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), G(a, t);
				}), H("click", r, () => f(t)), W(e, r);
			}), j(l), B((e) => G(c, e), [() => Q(i())]), W(e, o);
		});
		var _ = z(g, 2), v = (e) => {
			var t = _a(), n = R(t), r = L(n, !0);
			j(n);
			var i = z(n, 2), a = L(i, !0);
			j(i);
			var o = z(i, 2);
			fi(o, (e) => I(c, e), () => V(c));
			var s = z(o, 2), l = L(s, !0);
			j(s), B((e, t, n) => {
				G(r, e), G(a, t), G(l, n);
			}, [
				() => Q("gp.ownIcon"),
				() => Q("gp.upload"),
				() => Q("gp.uploadHint")
			]), H("click", i, () => V(c).click()), H("change", o, h), W(e, t);
		};
		K(_, (e) => {
			t.onimage && e(v);
		}), j(i), B(() => $r(i, `top: ${V(u).top ?? ""}px; left: ${V(u).left ?? ""}px`)), W(e, i);
	};
	K(S, (e) => {
		V(l) && e(C);
	}), j(g), fi(g, (e) => I(s, e), () => V(s)), B(() => {
		Z(_, "title", a()), Z(_, "aria-label", a());
	}), H("click", _, () => V(l) ? I(l, !1) : d()), W(e, g), Ge();
}
Cr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function xa(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-manual" && t.onMobileManual?.(n), n?.type === "urd-mobile-auto" && t.onMobileAuto?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n), n?.type === "urd-save-template" && t.onSaveTemplate?.(n), n?.type === "urd-delete-template" && t.onDeleteTemplate?.(n), n?.type === "urd-apply-layout" && t.onApplyLayout?.(n);
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
function Sa(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Ca(e, t, n) {
	let r = n === "full" ? 1 : Math.min(1, Sa(e, t));
	return Math.max(.1, r);
}
//#endregion
//#region src/lib/Dropdown.svelte
var wa = /* @__PURE__ */ U("<button type=\"button\"> </button>"), Ta = /* @__PURE__ */ U("<div class=\"dd-pop svelte-vtocc6\"></div>"), Ea = /* @__PURE__ */ U("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	We(t, !0);
	let n = pi(t, "value", 3, null), r = pi(t, "options", 19, () => []), i = pi(t, "title", 3, null), a = pi(t, "disabled", 3, !1), o = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(tn({
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
	var p = Ea(), h = L(p), g = L(h), _ = L(g, !0);
	j(g);
	var v = z(g, 2), y = L(v, !0);
	j(v), j(h);
	var b = z(h, 2), x = (e) => {
		var t = Ta();
		Vr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ P(() => m(V(t), 2));
			let i = () => V(r)[0], a = () => V(r)[1];
			var o = wa();
			let s;
			var c = L(o, !0);
			j(o), B(() => {
				s = Zr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), G(c, a());
			}), H("click", o, () => f(i())), W(e, o);
		}), j(t), B(() => $r(t, `top: ${V(c).top ?? ""}px; left: ${V(c).left ?? ""}px; min-width: ${V(c).width ?? ""}px`)), W(e, t);
	};
	K(b, (e) => {
		V(o) && e(x);
	}), j(p), fi(p, (e) => I(s, e), () => V(s)), B((e) => {
		Z(h, "title", i()), h.disabled = a(), G(_, e), G(y, V(o) ? "▴" : "▾");
	}, [() => l()]), H("click", h, d), W(e, p), Ge();
}
Cr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var Da = /* @__PURE__ */ U("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function Oa(e, t) {
	We(t, !0);
	let n = pi(t, "image", 3, ""), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(1), o = /* @__PURE__ */ F(.5), s = /* @__PURE__ */ F(.5), c = /* @__PURE__ */ F(1), l = /* @__PURE__ */ F(1), u = /* @__PURE__ */ F(1);
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
	var h = Da(), g = L(h), _ = L(g), v = L(_, !0);
	j(_);
	var y = z(_, 2), b = L(y);
	Z(b, "width", 220), Z(b, "height", 220), fi(b, (e) => I(r, e), () => V(r));
	var x = z(b, 2), S = L(x, !0);
	j(x), j(y);
	var C = z(y, 2), w = L(C), T = z(w), ee = L(T);
	j(T), j(C);
	var E = z(C, 2);
	Y(E);
	var te = z(E, 2), ne = L(te), re = z(ne), ie = L(re);
	j(re), j(te);
	var ae = z(te, 2);
	Y(ae);
	var oe = z(ae, 2), se = L(oe), ce = z(se), le = L(ce);
	j(ce), j(oe);
	var ue = z(oe, 2);
	Y(ue);
	var de = z(ue, 2), fe = L(de), pe = z(fe), me = L(pe);
	j(pe), j(de);
	var he = z(de, 2);
	Y(he);
	var ge = z(he, 2), _e = L(ge), D = L(_e, !0);
	j(_e);
	var ve = z(_e, 2), O = L(ve, !0);
	j(ve), j(ge);
	var k = z(ge, 2), ye = L(k), be = L(ye, !0);
	j(ye);
	var xe = z(ye, 2), Se = L(xe, !0);
	j(xe), j(k), j(g), j(h), B((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		G(v, e), Z(b, "title", t), G(S, n), G(w, `${r ?? ""} `), G(ee, `${i ?? ""}x`), G(ne, `${a ?? ""} `), G(ie, `${o ?? ""}%`), G(se, `${s ?? ""} `), G(le, `${c ?? ""}%`), G(fe, `${l ?? ""} `), G(me, `${u ?? ""}%`), G(D, d), G(O, f), G(be, p), G(Se, m);
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
	]), H("pointerdown", b, f), ci(E, () => V(a), (e) => I(a, e)), ci(ae, () => V(c), (e) => I(c, e)), ci(ue, () => V(l), (e) => I(l, e)), ci(he, () => V(u), (e) => I(u, e)), H("click", _e, () => I(u, 0)), H("click", ve, p), H("click", ye, () => t.oncancel?.()), H("click", xe, m), W(e, h), Ge();
}
Cr(["pointerdown", "click"]);
var ka = {}, Aa = {};
function ja(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 1;) {
		let r = Aa[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function Ma(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 1;) {
		let i = ka[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.10/plugins.js
function Na(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var Pa = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function Fa(e, t) {
	let n = Na(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = Na(t[2]), a = Pa(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var Ia = /^[a-z0-9][a-z0-9-]*$/;
function La(e) {
	let t = [];
	if (!e || typeof e != "object") return ["manifestet er ikke et objekt"];
	Ia.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), Na(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), e.languages !== void 0 && t.push(...bi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales må være boolsk"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names må være et objekt med språkkode til navn"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.10/sections/presets.js
function Ra(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
//#endregion
//#region ../template/assets/engine/0.6.10/maler-model.js
var za = [
	"section",
	"blocks",
	"page"
];
function Ba(e) {
	return $i(String(e ?? ""), "");
}
function Va(e, t, { id: n, title: r }) {
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
//#region ../template/assets/engine/0.6.10/preset-thumb.js
var Ha = /^#[0-9a-fA-F]{3,8}$/, Ua = /^[a-z][a-z0-9-]*$/, Wa = "#171c26", Ga = "#232a38", Ka = "#98a1b3", qa = "#7c5cff", Ja = (e, t) => `var(--urd-color-${e}, ${t})`;
function Ya(e, t) {
	return typeof e == "string" ? Ha.test(e) ? e : Ua.test(e) ? Ja(e, t) : t : t;
}
function Xa(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var Za = (e) => Math.round(e * 10) / 10, Qa = (e, t, n) => Math.min(n, Math.max(t, e)), $a = (e, t, n, r, i, a = "") => `<rect x="${Za(e)}" y="${Za(t)}" width="${Za(Math.max(n, 1))}" height="${Za(Math.max(r, 1))}" fill="${i}"${a}/>`;
function eo(e) {
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Ya(t.props?.value, Wa);
		if (t.type === "gradient") return Ya(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Wa);
	}
	return Ja("bg", Wa);
}
function to(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Ja("text", Ka), c = [], l = [
		.72,
		.9,
		.5
	], u = t + 1;
	for (let i = 0; i < 3; i++) {
		let d = i === 0 && a ? 4 : 2.2;
		if (u + d > t + r) break;
		let f = n * l[i], p = o ? e + (n - f) / 2 : e;
		c.push($a(p, u, f, d, s, ` opacity="${i === 0 ? .8 : .4}" rx="1"`)), u += d + 2.4;
	}
	return c.join("");
}
function no(e, t, n, r) {
	let i = Ja("text", Ka), a = [$a(e, t, n, r, Ja("surface", Ga), " rx=\"1.5\"")], o = (t) => Za(e + n * t), s = (e) => Za(t + r * e);
	return a.push(`<polygon points="${o(.08)},${s(.9)} ${o(.42)},${s(.38)} ${o(.62)},${s(.68)} ${o(.75)},${s(.5)} ${o(.92)},${s(.9)}" fill="${i}" opacity="0.4"/>`), a.push(`<circle cx="${o(.28)}" cy="${s(.26)}" r="${Za(Math.max(1, Math.min(n, r) * .1))}" fill="${i}" opacity="0.5"/>`), a.join("");
}
function ro(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) o.push(no(e + n * (a + i), t, a, r));
	return o.join("");
}
function io(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push($a(s, t, a, r * .55, Ja("surface", Ga), " rx=\"1.5\"")), o.push($a(s, t + r * .62, a * .8, 2, Ja("text", Ka), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function ao(e, t, n, r, i) {
	let a = Ya(i?.color, qa), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${Za(e + n / 2)}" cy="${Za(t + r / 2)}" rx="${Za(Math.max(n / 2, 1))}" ry="${Za(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${Za(e)},${Za(t + r)} ${Za(e + n / 2)},${Za(t)} ${Za(e + n)},${Za(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? $a(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : $a(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function oo(e, t, n, r, i, a) {
	if (e === "text") return to(t, n, r, i, a);
	if (e === "image") return no(t, n, r, i);
	if (e === "galleri") return ro(t, n, r, i);
	if (e === "samling") return io(t, n, r, i);
	if (e === "shape") return ao(t, n, r, i, a);
	if (e === "button") return $a(t, n, r, i, Ja("accent", qa), ` rx="${Za(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${Za(t + r / 2)}" cy="${Za(n + i / 2)}" r="${Za(e)}" fill="${Ja("accent", qa)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [$a(t, n, r, i, Ja("surface", Ga), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${Za(a - s / 2)},${Za(o - s)} ${Za(a - s / 2)},${Za(o + s)} ${Za(a + s)},${Za(o)}" fill="${Ja("text", Ka)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "tidslinje") {
		let e = [$a(t + 1, n, 1.4, i, Ja("accent", qa), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${Za(t + 1.7)}" cy="${Za(o)}" r="1.6" fill="${Ja("accent", qa)}"/>`), e.push($a(t + 5, o - 1, r * .5, 2, Ja("text", Ka), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	return e === "sitat" ? [
		`<text x="${Za(t + r / 2)}" y="${Za(n + i * .34)}" text-anchor="middle" font-size="${Za(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Ja("accent", qa)}">“</text>`,
		$a(t + r * .15, n + i * .48, r * .7, 2, Ja("text", Ka), " opacity=\"0.6\" rx=\"1\""),
		$a(t + r * .25, n + i * .62, r * .5, 2, Ja("text", Ka), " opacity=\"0.6\" rx=\"1\""),
		$a(t + r * .35, n + i * .82, r * .3, 1.6, Ja("text", Ka), " opacity=\"0.35\" rx=\"0.8\"")
	].join("") : e === "statistikk" ? [$a(t + r * .28, n + i * .15, r * .44, i * .42, Ja("accent", qa), " opacity=\"0.85\" rx=\"1\""), $a(t + r * .32, n + i * .72, r * .36, 1.6, Ja("text", Ka), " opacity=\"0.4\" rx=\"0.8\"")].join("") : $a(t, n, r, i, Ja("surface", Ga), " rx=\"1.5\"");
}
function so(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(Xa(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [$a(0, 0, t, n, eo(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${Za(Qa(e.x ?? .5, 0, 1) * t)}" cy="${Za(Qa(e.y ?? .3, 0, 1) * n)}" r="${Za(t * Qa(e.radius ?? .5, .1, 1) * .5)}" fill="${Ya(e.color, qa)}" opacity="${Za(Qa(e.opacity ?? .3, 0, .5))}"/>`);
	}
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Qa((r.x ?? 0) * (t / 100), 0, t - 2), s = Qa((r.y ?? 0) * a, 0, n - 2), c = Qa((r.w ?? 10) * (t / 100), 2, t - i), l = Qa((r.h ?? 20) * a, 2, n - s);
		o.push(oo(e.type, i, s, c, l, e.props));
	}
	return o.join("");
}
function co(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${$a(0, 0, t, n, Ja("bg", Wa))}</svg>`;
	let a = i.map((e) => Qa(Xa(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${Za(l)})">${so(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.10/palette-search.js
function lo(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function uo(e, t) {
	let n = lo(t).trim(), r = lo(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function fo(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: uo(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.10/theme.js
function po(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var mo = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function ho(e) {
	return typeof e == "string" && mo.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function go(e) {
	let t = e.tokens || {}, n = po(e, "light"), r = po(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			ho(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && ho(u) && ho(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && ho(u) && ho(d) && s.push({
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
function _o(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var vo = {
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
}, yo = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers"
};
[...new Set(Object.values(vo).flatMap(Object.keys))];
function bo(e) {
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
function xo(e, t) {
	let n = bo(e), r = bo(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.10/backgrounds/color.js
var So = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = _o(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Co = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function wo(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function To(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Eo(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Do(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${_o(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Oo(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Co[t] ?? []).includes(e.animation) ? e.animation : null, r = wo(e.stops), i = r.map((e) => `${_o(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: To(r),
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
var ko = /* @__PURE__ */ new Set(), Ao = !1;
function jo(e) {
	ko.add(e), !(Ao || typeof window > "u") && (Ao = !0, window.addEventListener("resize", () => {
		for (let e of [...ko]) e() || ko.delete(e);
	}));
}
var Mo = !1;
function No() {
	if (!Mo) {
		Mo = !0;
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
var Po = {
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
		let n = Oo(t);
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
					let e = Eo(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Do(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), jo(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && No());
	}
}, Fo = {
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
		let n = _o(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Io = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Lo = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Io, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Ro = .4;
function zo(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function Bo(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function Vo(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function Ho(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * Ro * t;
	return Math.round(Math.min(i, r * e));
}
function Uo(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * Ro, s = i ?? Ho(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var Wo = /* @__PURE__ */ new Set(), Go = !1, Ko = 0;
function qo() {
	Ko = 0;
	for (let e of [...Wo]) e() || Wo.delete(e);
}
function Jo() {
	Ko ||= requestAnimationFrame(qo);
}
function Yo(e) {
	Wo.add(e), e(), !(Go || typeof window > "u") && (Go = !0, window.addEventListener("scroll", Jo, { passive: !0 }), window.addEventListener("resize", Jo, { passive: !0 }));
}
function Xo(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = Ho(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = Uo(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Yo(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Zo() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var Qo = /* @__PURE__ */ new Set(), $o = !1, es = 0;
function ts() {
	es = 0;
	for (let e of [...Qo]) e() || Qo.delete(e);
}
function ns() {
	!es && typeof requestAnimationFrame == "function" && (es = requestAnimationFrame(ts));
}
function rs(e) {
	Qo.add(e), e(), !($o || typeof window > "u") && ($o = !0, window.addEventListener("resize", ns, { passive: !0 }));
}
function is(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = Ho(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	rs(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var as = {
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
		if (!t.src) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = Vo(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = Bo(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = zo(t.x, t.y);
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
			Zo() ? is(n, t.parallax, i, e) : Xo(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/0.6.10/galleri-model.js
function os(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function ss({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function cs(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.10/backgrounds/bildegalleri.js
var ls = {
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
		let n = (t.images ?? []).filter((e) => e?.src);
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = Bo(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = zo(n.x, n.y);
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
		if (!ss({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(cs(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = os(l, 1, n.length), r = new Image();
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
//#region ../template/assets/engine/0.6.10/footer-thumb.js
function us(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += ds(n, e.baselineLinks), o + "</svg>";
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
	return o += ds(n, e.baselineLinks), o + "</svg>";
}
function ds(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.10/animations/core.js
var fs = () => ({
	duration: 600,
	delay: 0
}), ps = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: fs,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: fs,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: fs,
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
			step: 90,
			effect: "slide-up",
			pattern: "sequence"
		}),
		migrations: {}
	}
}, ms = [
	["font.system", "system-ui, sans-serif"],
	["font.arial", "Arial, Helvetica, sans-serif"],
	["font.verdana", "Verdana, Geneva, sans-serif"],
	["font.trebuchet", "'Trebuchet MS', sans-serif"],
	["font.georgia", "Georgia, 'Times New Roman', serif"],
	["font.palatino", "'Palatino Linotype', Palatino, serif"],
	["font.courier", "'Courier New', monospace"]
];
//#endregion
//#region ../template/assets/engine/0.6.10/place.js
function hs(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var gs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), _s = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), vs = /* @__PURE__ */ U("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), ys = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), bs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), xs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Ss = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Cs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ws = /* @__PURE__ */ U("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ts = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Es = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ds = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Os = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), ks = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), As = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), js = /* @__PURE__ */ U("<input class=\"nav-target svelte-1n46o8q\"/>"), Ms = /* @__PURE__ */ U("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Ns = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label>"), Ps = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), Fs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Is = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Ls = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), Rs = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), zs = /* @__PURE__ */ U("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Bs = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Vs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Hs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Us = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/>"), Ws = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Gs = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Ks = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), qs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Js = /* @__PURE__ */ U("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), Ys = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button>"), Xs = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), Zs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), Qs = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), $s = /* @__PURE__ */ U("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), ec = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), tc = /* @__PURE__ */ U("<p> </p>"), nc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), rc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), ic = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), ac = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), oc = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), sc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), cc = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), lc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), uc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), dc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), fc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), pc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), mc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), hc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), gc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), _c = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), vc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), yc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), bc = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), xc = /* @__PURE__ */ U("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Sc = /* @__PURE__ */ U("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), Cc = /* @__PURE__ */ U("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), wc = /* @__PURE__ */ U("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), Tc = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button></button> <button></button></span> <span class=\"zoomswitch svelte-1n46o8q\"><button></button> <button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></span> <button></button>", 1), Ec = /* @__PURE__ */ U("<button class=\"badge attention svelte-1n46o8q\"><!> </button>"), Dc = /* @__PURE__ */ U("<span class=\"badge svelte-1n46o8q\"> </span> <button> </button>", 1), Oc = /* @__PURE__ */ U("<!> ", 1), kc = /* @__PURE__ */ U("<span class=\"who svelte-1n46o8q\"><!> </span>"), Ac = /* @__PURE__ */ U("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), jc = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"> </a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Mc = /* @__PURE__ */ U("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Nc = /* @__PURE__ */ U("<button> </button>"), Pc = /* @__PURE__ */ U("<!> <!>", 1), Fc = /* @__PURE__ */ U("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), Ic = /* @__PURE__ */ U("<span class=\"page-path svelte-1n46o8q\">/</span>"), Lc = /* @__PURE__ */ U("<input class=\"page-slug svelte-1n46o8q\"/>"), Rc = /* @__PURE__ */ U("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), zc = /* @__PURE__ */ U("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), Bc = /* @__PURE__ */ U("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), Vc = /* @__PURE__ */ U("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button> <button class=\"page-mal-del svelte-1n46o8q\"></button></div>"), Hc = /* @__PURE__ */ U("<div class=\"page-mal-grid svelte-1n46o8q\"><div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div> <!></div>"), Uc = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!></div>"), Wc = /* @__PURE__ */ U("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), Gc = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), Kc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), qc = /* @__PURE__ */ U("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Jc = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Yc = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), Xc = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Zc = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), Qc = /* @__PURE__ */ U("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), $c = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), el = /* @__PURE__ */ U("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), tl = /* @__PURE__ */ U("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), nl = /* @__PURE__ */ U("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), rl = /* @__PURE__ */ U("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), il = /* @__PURE__ */ U("<span class=\"mini-label svelte-1n46o8q\"> </span>"), al = /* @__PURE__ */ U("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), ol = /* @__PURE__ */ U("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), sl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), cl = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), ll = /* @__PURE__ */ U("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), ul = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), dl = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), fl = /* @__PURE__ */ U("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), pl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), ml = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), hl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), gl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), _l = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>"), vl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), yl = /* @__PURE__ */ U("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), bl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), xl = /* @__PURE__ */ U("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Sl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Cl = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), wl = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Tl = /* @__PURE__ */ U("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), El = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Dl = /* @__PURE__ */ U("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Ol = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), kl = /* @__PURE__ */ U("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Al = /* @__PURE__ */ U("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), jl = /* @__PURE__ */ U("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Ml = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), Nl = /* @__PURE__ */ U("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), Pl = /* @__PURE__ */ U("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), Fl = /* @__PURE__ */ U("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), Il = /* @__PURE__ */ U("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), Ll = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Rl = /* @__PURE__ */ U("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), zl = /* @__PURE__ */ U("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), Bl = /* @__PURE__ */ U("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), Vl = /* @__PURE__ */ U("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), Hl = /* @__PURE__ */ U("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), Ul = /* @__PURE__ */ U("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), Wl = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), Gl = /* @__PURE__ */ U("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), Kl = /* @__PURE__ */ U("<span class=\"chip svelte-1n46o8q\"> </span>"), ql = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), Jl = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), Yl = /* @__PURE__ */ U("<span class=\"update-warn svelte-1n46o8q\"></span>"), Xl = /* @__PURE__ */ U("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), Zl = /* @__PURE__ */ U("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), Ql = /* @__PURE__ */ U("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), $l = /* @__PURE__ */ U("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), eu = /* @__PURE__ */ U("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), tu = /* @__PURE__ */ U("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><button></button> <!></span></nav> <!>", 1), nu = /* @__PURE__ */ U("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), ru = /* @__PURE__ */ U("<p class=\"loading svelte-1n46o8q\"> </p>"), iu = /* @__PURE__ */ U("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), au = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), ou = /* @__PURE__ */ U("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), su = /* @__PURE__ */ U("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), cu = /* @__PURE__ */ U("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), lu = /* @__PURE__ */ U("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><span class=\"brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function uu(e, t) {
	We(t, !0);
	let n = (e, t = d, n = d) => {
		var r = As(), i = R(r);
		Vr(i, 17, n, Lr, (e, r, i) => {
			var a = ks(), s = L(a), l = L(s);
			{
				let e = /* @__PURE__ */ P(() => Q("tip.bg.changeType")), n = /* @__PURE__ */ P(() => o.map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label]));
				$(l, {
					get value() {
						return V(r).type;
					},
					get title() {
						return V(e);
					},
					get options() {
						return V(n);
					},
					onchange: (e) => En(t(), i, e)
				});
			}
			var u = z(l, 2), d = L(u);
			d.disabled = i === 0, J(d, () => c.up, !0), j(d);
			var f = z(d, 2);
			J(f, () => c.down, !0), j(f);
			var p = z(f, 2);
			J(p, () => c.cross, !0), j(p), j(u), j(s);
			var m = z(s, 2), h = (e) => {
				var n = gs(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(zn), n = /* @__PURE__ */ P(() => Q("tip.bg.layerColor"));
					Hi(s, {
						get value() {
							return V(r).props.value;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => cn(t(), i, "value", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				Y(f), B((e, t, n) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(d, `${n ?? ""}%`), X(f, V(r).props.opacity ?? 1);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.strength"),
					() => Math.round((V(r).props.opacity ?? 1) * 100)
				]), H("input", f, (e) => cn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ P(() => mn(V(r))), a = /* @__PURE__ */ P(() => V(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = xs(), s = R(o), l = L(s), u = z(l);
				{
					let e = /* @__PURE__ */ P(() => V(n).kind ?? "linear"), r = /* @__PURE__ */ P(() => [["linear", Q("opt.grad.linear")], ["radial", Q("opt.grad.radial")]]);
					$(u, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => vn(t(), i, e)
					});
				}
				j(s);
				var d = z(s, 2);
				Vr(d, 17, () => V(n).stops, Lr, (e, r, o) => {
					var s = vs();
					let l;
					var u = L(s), d = z(u, 2);
					{
						let e = /* @__PURE__ */ P(zn), n = /* @__PURE__ */ P(() => Q("tip.bg.stopColor"));
						Hi(d, {
							get value() {
								return V(r).color;
							},
							get tokens() {
								return V(e);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => yn(t(), i, o, { color: e })
						});
					}
					var f = z(d, 2);
					Y(f);
					var p = z(f, 2), m = L(p);
					j(p);
					var h = z(p, 2), g = (e) => {
						var n = _s();
						J(n, () => c.cross, !0), j(n), B((e) => Z(n, "title", e), [() => Q("tip.bg.removeStop")]), H("click", n, () => Sn(t(), i, o)), W(e, n);
					};
					K(h, (e) => {
						V(n).stops.length > 2 && e(g);
					}), j(s), B((e, t, a) => {
						l = Zr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: V(wn)?.layer === i && V(wn).from === o,
							"drop-above": V(wn)?.layer === i && V(wn).insert === o,
							"drop-below": V(wn)?.layer === i && V(wn).insert === V(n).stops.length && o === V(n).stops.length - 1
						}), Z(u, "title", e), X(f, V(r).share ?? 50), Z(f, "title", t), G(m, `${a ?? ""}%`);
					}, [
						() => Q("tip.bg.dragStop"),
						() => Q("tip.bg.stopShare"),
						() => V(a) > 0 ? Math.round(Math.max(0, Number(V(r).share) || 0) / V(a) * 100) : Math.round(100 / V(n).stops.length)
					]), H("pointerdown", u, (e) => Tn(t(), e, i, o)), H("input", f, (e) => yn(t(), i, o, { share: Number(e.target.value) })), W(e, s);
				});
				var f = z(d, 2), p = L(f, !0);
				j(f);
				var m = z(f, 2), h = (e) => {
					var r = ys(), a = R(r), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					Y(l);
					var u = z(l, 2), d = L(u), f = z(d), p = L(f);
					j(f), j(u);
					var m = z(u, 2);
					Y(m), B((e, t, r, i) => {
						G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), X(l, V(n).x ?? .5), G(d, `${r ?? ""} `), G(p, `${i ?? ""}%`), X(m, V(n).y ?? .5);
					}, [
						() => Q("lbl.centerX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Q("lbl.centerY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("input", l, (e) => gn(t(), i, "x", Number(e.target.value))), H("input", m, (e) => gn(t(), i, "y", Number(e.target.value))), W(e, r);
				}, g = (e) => {
					var r = bs(), a = R(r), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					Y(l), B((e) => {
						G(o, `${e ?? ""} `), G(c, `${V(n).angle ?? ""}°`), X(l, V(n).angle);
					}, [() => Q("lbl.angle")]), H("input", l, (e) => gn(t(), i, "angle", Number(e.target.value))), W(e, r);
				};
				K(m, (e) => {
					(V(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = z(m, 2), v = L(_), y = z(v), b = L(y);
				j(y), j(_);
				var x = z(_, 2);
				Y(x);
				var S = z(x, 2), C = L(S), w = z(C);
				{
					let e = /* @__PURE__ */ P(() => V(n).animation ?? "none");
					$(w, {
						get value() {
							return V(e);
						},
						get options() {
							return _n[(V(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => gn(t(), i, "animation", e)
					});
				}
				j(S), B((e, t, r, i, a, o, s) => {
					G(l, `${e ?? ""} `), Z(f, "title", t), G(p, r), G(v, `${i ?? ""} `), G(b, `${a ?? ""}%`), X(x, V(n).opacity ?? 1), Z(S, "title", o), G(C, `${s ?? ""} `);
				}, [
					() => Q("blocks.shape"),
					() => Q("tip.bg.addStop"),
					() => Q("ui.addStop"),
					() => Q("lbl.strength"),
					() => Math.round((V(n).opacity ?? 1) * 100),
					() => Q("tip.bg.motion"),
					() => Q("lbl.motion")
				]), H("click", f, () => xn(t(), i)), H("input", x, (e) => gn(t(), i, "opacity", Number(e.target.value))), W(e, o);
			}, _ = (e) => {
				var n = Ss(), a = R(n), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(zn), n = /* @__PURE__ */ P(() => Q("tip.bg.glowColor"));
					Hi(s, {
						get value() {
							return V(r).props.color;
						},
						get tokens() {
							return V(e);
						},
						get label() {
							return V(n);
						},
						onchange: (e) => cn(t(), i, "color", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				Y(f);
				var p = z(f, 2), m = L(p), h = z(m), g = L(h);
				j(h), j(p);
				var _ = z(p, 2);
				Y(_);
				var v = z(_, 2), y = L(v), b = z(y), x = L(b);
				j(b), j(v);
				var S = z(v, 2);
				Y(S);
				var C = z(S, 2), w = L(C), T = z(w), ee = L(T);
				j(T), j(C);
				var E = z(C, 2);
				Y(E), B((e, t, n, i, a, s, c, u, p) => {
					G(o, `${e ?? ""} `), G(l, `${t ?? ""} `), G(d, `${n ?? ""}%`), X(f, V(r).props.x), G(m, `${i ?? ""} `), G(g, `${a ?? ""}%`), X(_, V(r).props.y), G(y, `${s ?? ""} `), G(x, `${c ?? ""}%`), X(S, V(r).props.radius), G(w, `${u ?? ""} `), G(ee, `${p ?? ""}%`), X(E, V(r).props.opacity);
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
				]), H("input", f, (e) => cn(t(), i, "x", Number(e.target.value))), H("input", _, (e) => cn(t(), i, "y", Number(e.target.value))), H("input", S, (e) => cn(t(), i, "radius", Number(e.target.value))), H("input", E, (e) => cn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, v = (e) => {
				var n = Cs(), a = R(n), o = L(a), s = z(o), c = L(s);
				j(s), j(a);
				var l = z(a, 2);
				Y(l), B((e, t) => {
					G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), X(l, V(r).props.opacity);
				}, [() => Q("lbl.strength"), () => Math.round(V(r).props.opacity * 100)]), H("input", l, (e) => cn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ P(() => V(r).props.fit === "flislegg" || V(r).props.fit === "repeat");
				var a = Es(), o = R(a), s = L(o), c = z(s);
				j(o);
				var l = z(o, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ P(() => V(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ P(() => [["vanlig", Q("opt.img.plain")], ["flislegg", Q("opt.img.tile")]]);
					$(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(r);
						},
						onchange: (e) => cn(t(), i, "fit", e)
					});
				}
				j(l);
				var f = z(l, 2), p = L(f, !0);
				j(f);
				var m = z(f, 2), h = L(m), g = z(h, 2);
				Y(g);
				var _ = z(g, 4);
				j(m);
				var v = z(m, 2), y = (e) => {
					var n = ws(), a = R(n), o = L(a), s = L(o, !0);
					j(o);
					var c = z(o, 2), l = L(c, !0);
					j(c), j(a);
					var u = z(a, 2), d = L(u, !0);
					j(u);
					var f = z(u, 2), p = z(f, 2), m = L(p), h = z(m), g = L(h);
					j(h), j(p);
					var _ = z(p, 2);
					Y(_);
					var v = z(_, 2), y = L(v), b = z(y), x = L(b);
					j(b), j(v);
					var S = z(v, 2);
					Y(S), B((e, t, n, i, a, p, h, v, b, C, w, T) => {
						Z(o, "title", e), G(s, t), Z(c, "title", n), G(l, i), Z(u, "title", a), G(d, p), $r(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), G(m, `${b ?? ""} `), G(g, `${C ?? ""}%`), X(_, V(r).props.x ?? .5), G(y, `${w ?? ""} `), G(x, `${T ?? ""}%`), X(S, V(r).props.y ?? .5);
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
					]), H("click", o, () => pn(t(), i, V(r), "cover")), H("click", c, () => pn(t(), i, V(r), "contain")), H("pointerdown", f, (e) => ln(e, t(), i, "xy")), H("input", _, (e) => cn(t(), i, "x", Number(e.target.value))), H("input", S, (e) => cn(t(), i, "y", Number(e.target.value))), W(e, n);
				};
				K(v, (e) => {
					V(n) || e(y);
				});
				var b = z(v, 2), x = L(b), S = z(x), C = L(S);
				j(S), j(b);
				var w = z(b, 2);
				Y(w);
				var T = z(w, 2), ee = L(T), E = z(ee), te = L(E);
				j(E), j(T);
				var ne = z(T, 2);
				Y(ne);
				var re = z(ne, 2), ie = L(re);
				Y(ie);
				var ae = z(ie);
				j(re);
				var oe = z(re, 2), se = (e) => {
					var n = Ts(), a = R(n), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					Y(l);
					var u = z(l, 2), d = L(u), f = z(d);
					{
						let e = /* @__PURE__ */ P(() => V(r).props.bleed ?? "none"), n = /* @__PURE__ */ P(() => [
							["none", Q("common.none")],
							["up", Q("opt.bleed.up")],
							["down", Q("opt.bleed.down")],
							["both", Q("opt.brand.both")]
						]);
						$(f, {
							get value() {
								return V(e);
							},
							get options() {
								return V(n);
							},
							onchange: (e) => cn(t(), i, "bleed", e)
						});
					}
					j(u), B((e, t, n, i) => {
						G(o, `${e ?? ""} `), G(c, `${t ?? ""}%`), X(l, V(r).props.parallax ?? .3), Z(u, "title", n), G(d, `${i ?? ""} `);
					}, [
						() => Q("lbl.parallaxStrength"),
						() => Math.round((V(r).props.parallax ?? 0) * 100),
						() => Q("tip.bg.bleed"),
						() => Q("lbl.bleed")
					]), H("input", l, (e) => cn(t(), i, "parallax", Number(e.target.value))), W(e, n);
				};
				K(oe, (e) => {
					(V(r).props.parallax ?? 0) > 0 && e(se);
				}), B((e, t, n, i, a, c, d, m, v, y, b, S, T, E) => {
					Z(o, "title", e), G(s, `${t ?? ""} `), Z(l, "title", n), G(u, `${i ?? ""} `), Z(f, "title", a), G(p, c), Z(h, "title", d), X(g, m), Z(_, "title", v), G(x, `${y ?? ""} `), G(C, `${V(r).props.blur ?? 0 ?? ""} px`), X(w, V(r).props.blur ?? 0), G(ee, `${b ?? ""} `), G(te, `${S ?? ""}%`), X(ne, V(r).props.opacity ?? 1), Z(re, "title", T), ii(ie, (V(r).props.parallax ?? 0) > 0), G(ae, ` ${E ?? ""}`);
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
				]), H("change", c, (e) => An(t(), i, e)), H("click", h, () => dn(t(), i, V(r).props.size ?? 1, -.05)), H("change", g, (e) => fn(t(), i, e.target.value)), H("click", _, () => dn(t(), i, V(r).props.size ?? 1, .05)), H("input", w, (e) => cn(t(), i, "blur", Number(e.target.value))), H("input", ne, (e) => cn(t(), i, "opacity", Number(e.target.value))), H("change", ie, (e) => cn(t(), i, "parallax", e.target.checked ? .3 : 0)), W(e, a);
			}, b = (e) => {
				var n = Os(), a = R(n), o = L(a), s = z(o);
				j(a);
				var l = z(a, 2);
				Vr(l, 17, () => V(r).props.images ?? [], Lr, (e, n, a) => {
					var o = Ds(), s = R(o), l = L(s), u = z(l, 2), d = L(u);
					d.disabled = a === 0, J(d, () => c.up, !0), j(d);
					var f = z(d, 2);
					J(f, () => c.down, !0), j(f);
					var p = z(f, 2);
					J(p, () => c.cross, !0), j(p), j(u), j(s);
					var m = z(s, 2), h = L(m), g = z(h), _ = L(g);
					j(g), j(m);
					var v = z(m, 2);
					Y(v);
					var y = z(v, 2), b = L(y), x = z(b), S = L(x);
					j(x), j(y);
					var C = z(y, 2);
					Y(C), B((e, t, i, o, s) => {
						Z(l, "src", V(n).src), f.disabled = a === V(r).props.images.length - 1, Z(p, "title", e), G(h, `${t ?? ""} `), G(_, `${i ?? ""}%`), X(v, V(n).x ?? .5), G(b, `${o ?? ""} `), G(S, `${s ?? ""}%`), X(C, V(n).y ?? .5);
					}, [
						() => Q("tip.removeImage"),
						() => Q("lbl.focusX"),
						() => Math.round((V(n).x ?? .5) * 100),
						() => Q("lbl.focusY"),
						() => Math.round((V(n).y ?? .5) * 100)
					]), H("click", d, () => Mn(t(), i, a, -1)), H("click", f, () => Mn(t(), i, a, 1)), H("click", p, () => Nn(t(), i, a)), H("input", v, (e) => Pn(t(), i, a, "x", Number(e.target.value))), H("input", C, (e) => Pn(t(), i, a, "y", Number(e.target.value))), W(e, o);
				});
				var u = z(l, 2), d = L(u), f = z(d);
				{
					let e = /* @__PURE__ */ P(() => V(r).props.fit ?? "cover"), n = /* @__PURE__ */ P(() => [["cover", Q("opt.fit.cover")], ["contain", Q("opt.fit.contain")]]);
					$(f, {
						get value() {
							return V(e);
						},
						get options() {
							return V(n);
						},
						onchange: (e) => cn(t(), i, "fit", e)
					});
				}
				j(u);
				var p = z(u, 2), m = L(p), h = z(m);
				Y(h), j(p);
				var g = z(p, 2), _ = L(g), v = z(_), y = L(v);
				j(v), j(g);
				var b = z(g, 2);
				Y(b);
				var x = z(b, 2), S = L(x), C = z(S), w = L(C);
				j(C), j(x);
				var T = z(x, 2);
				Y(T);
				var ee = z(T, 2), E = L(ee), te = z(E), ne = L(te);
				j(te), j(ee);
				var re = z(ee, 2);
				Y(re);
				var ie = z(re, 2), ae = L(ie, !0);
				j(ie), B((e, t, n, i, s, c, l, u, f, g, v) => {
					Z(a, "title", e), G(o, `${t ?? ""} `), G(d, `${n ?? ""} `), Z(p, "title", i), G(m, `${s ?? ""} `), X(h, V(r).props.interval ?? 6), G(_, `${c ?? ""} `), G(y, `${l ?? ""} s`), X(b, V(r).props.fade ?? 1.5), G(S, `${u ?? ""} `), G(w, `${V(r).props.blur ?? 0 ?? ""} px`), X(T, V(r).props.blur ?? 0), G(E, `${f ?? ""} `), G(ne, `${g ?? ""}%`), X(re, V(r).props.opacity ?? 1), G(ae, v);
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
				]), H("change", s, (e) => jn(t(), i, e)), H("change", h, (e) => cn(t(), i, "interval", Number(e.target.value))), H("input", b, (e) => cn(t(), i, "fade", Number(e.target.value))), H("input", T, (e) => cn(t(), i, "blur", Number(e.target.value))), H("input", re, (e) => cn(t(), i, "opacity", Number(e.target.value))), W(e, n);
			};
			K(m, (e) => {
				V(r).type === "color" ? e(h) : V(r).type === "gradient" ? e(g, 1) : V(r).type === "glow" ? e(_, 2) : V(r).type === "grain" ? e(v, 3) : V(r).type === "image" ? e(y, 4) : V(r).type === "bildegalleri" && e(b, 5);
			}), j(a), B((e, t, r) => {
				Z(d, "title", e), Z(f, "title", t), f.disabled = i === n().length - 1, Z(p, "title", r);
			}, [
				() => Q("hint.bg.order"),
				() => Q("hint.bg.order"),
				() => Q("tip.bg.removeLayer")
			]), H("click", d, () => sn(t(), i, -1)), H("click", f, () => sn(t(), i, 1)), H("click", p, () => on(t(), i)), W(e, a);
		});
		var a = z(i, 2), s = L(a), l = z(s);
		{
			let e = /* @__PURE__ */ P(() => o.map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label]));
			$(l, {
				get value() {
					return V(rn);
				},
				get options() {
					return V(e);
				},
				onchange: (e) => I(rn, e, !0)
			});
		}
		j(a);
		var u = z(a, 2), f = L(u, !0);
		j(u), B((e, t) => {
			G(s, `${e ?? ""} `), G(f, t);
		}, [() => Q("lbl.newLayer"), () => Q("ui.addLayer")]), H("click", u, () => an(t(), V(rn))), W(e, r);
	}, r = (e, t = d, n = d) => {
		var r = jr();
		Vr(R(r), 17, n, Lr, (e, r, i) => {
			var a = Ms(), o = L(a);
			Y(o);
			var s = z(o, 2), l = L(s);
			l.disabled = i === 0, J(l, () => c.up, !0), j(l);
			var u = z(l, 2);
			J(u, () => c.down, !0), j(u);
			var d = z(u, 2);
			J(d, () => c.cross, !0), j(d), j(s);
			var f = z(s, 2), p = L(f);
			{
				let e = /* @__PURE__ */ P(() => V(r).page ?? "__href"), n = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
				$(p, {
					get value() {
						return V(e);
					},
					get title() {
						return V(n);
					},
					get options() {
						return V(a);
					},
					onchange: (e) => Oo(t(), i, e)
				});
			}
			j(f);
			var m = z(f, 2), h = (e) => {
				var n = js();
				Y(n), B((e, t) => {
					X(n, V(r).href ?? ""), Z(n, "placeholder", e), Z(n, "title", t);
				}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", n, (e) => ko(t(), i, e.target.value)), W(e, n);
			};
			K(m, (e) => {
				V(r).page || e(h);
			}), j(a), B((e, t) => {
				X(o, V(r).label), Z(o, "title", e), u.disabled = i === n().length - 1, Z(d, "title", t);
			}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), H("input", o, (e) => Do(t(), i, e.target.value)), H("click", l, () => Eo(t(), i, -1)), H("click", u, () => Eo(t(), i, 1)), H("click", d, () => To(t(), i)), W(e, a);
		}), W(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ P(() => V(M).props.boxStyle ?? {});
		var n = Fs(), r = R(n), i = L(r), a = z(i);
		{
			let e = /* @__PURE__ */ P(() => V(t).bg ?? ""), n = /* @__PURE__ */ P(zn), r = /* @__PURE__ */ P(() => Q("tip.box.bg"));
			Hi(a, {
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
				onchange: (e) => Et({ bg: e || null })
			});
		}
		j(r);
		var o = z(r, 2), s = L(o), c = z(s);
		{
			let e = /* @__PURE__ */ P(() => V(t).shadow ?? ""), n = /* @__PURE__ */ P(() => [
				["", Q("common.none")],
				["soft", Q("opt.shadow.soft")],
				["strong", Q("opt.shadow.strong")]
			]);
			$(c, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => Et({ shadow: e || null })
			});
		}
		j(o);
		var l = z(o, 2), u = (e) => {
			var n = Ns(), r = L(n), i = z(r);
			{
				let e = /* @__PURE__ */ P(() => V(t).shadowColor ?? ""), n = /* @__PURE__ */ P(zn), r = /* @__PURE__ */ P(() => Q("tip.box.shadowColor"));
				Hi(i, {
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
					onchange: (e) => Et({ shadowColor: e || null })
				});
			}
			j(n), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.shadowColor")]), W(e, n);
		};
		K(l, (e) => {
			V(t).shadow && e(u);
		});
		var d = z(l, 2), f = L(d), p = z(f);
		{
			let e = /* @__PURE__ */ P(() => V(t).border === "none" ? "none" : V(t).border ? "custom" : ""), n = /* @__PURE__ */ P(() => [
				["", Q("opt.border.theme")],
				["none", Q("common.none")],
				["custom", Q("opt.border.custom")]
			]);
			$(p, {
				get value() {
					return V(e);
				},
				get options() {
					return V(n);
				},
				onchange: (e) => Et({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		j(d);
		var m = z(d, 2), h = (e) => {
			let n = /* @__PURE__ */ P(() => typeof V(t).border == "object" ? V(t).border : {
				color: "text",
				width: 1
			});
			var r = Ps(), i = R(r), a = L(i), o = z(a);
			{
				let e = /* @__PURE__ */ P(zn), t = /* @__PURE__ */ P(() => Q("tip.box.borderColor"));
				Hi(o, {
					get value() {
						return V(n).color;
					},
					get tokens() {
						return V(e);
					},
					get label() {
						return V(t);
					},
					onchange: (e) => Et({ border: {
						...V(n),
						color: e
					} })
				});
			}
			j(i);
			var s = z(i, 2), c = L(s), l = z(c), u = L(l), d = z(u, 2);
			Y(d);
			var f = z(d, 2);
			j(l), j(s), B((e, t, r, i, o, s) => {
				G(a, `${e ?? ""} `), G(c, `${t ?? ""} `), Z(u, "title", r), Z(u, "aria-label", i), X(d, V(n).width), Z(f, "title", o), Z(f, "aria-label", s);
			}, [
				() => Q("lbl.borderColor"),
				() => Q("lbl.thicknessPx"),
				() => Q("tip.thinner"),
				() => Q("tip.thinner"),
				() => Q("tip.thicker"),
				() => Q("tip.thicker")
			]), H("click", u, () => Et({ border: {
				...V(n),
				width: Math.max(1, V(n).width - 1)
			} })), H("change", d, (e) => Et({ border: {
				...V(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), H("click", f, () => Et({ border: {
				...V(n),
				width: Math.min(12, V(n).width + 1)
			} })), W(e, r);
		};
		K(m, (e) => {
			V(t).border !== "none" && e(h);
		});
		var g = z(m, 2), _ = L(g);
		Y(_);
		var v = z(_);
		j(g), B((e, t, n, r, a, o) => {
			G(i, `${e ?? ""} `), G(s, `${t ?? ""} `), G(f, `${n ?? ""} `), Z(g, "title", r), ii(_, a), G(v, ` ${o ?? ""}`);
		}, [
			() => Q("lbl.blockColor"),
			() => Q("lbl.shadow"),
			() => Q("lbl.border"),
			() => Q("tip.box.glass"),
			() => !!V(t).glass,
			() => Q("lbl.glass")
		]), H("change", _, (e) => Et({ glass: e.target.checked || null })), W(e, n);
	}, a = (e) => {
		var t = Cc(), n = R(t), r = L(n), a = L(r);
		let o;
		var s = L(a, !0);
		j(a);
		var l = z(a, 2);
		let u;
		var d = L(l, !0);
		j(l), j(r), j(n);
		var f = z(n, 2), p = (e) => {
			var t = jr(), n = R(t), r = (e) => {
				var t = Is(), n = L(t, !0);
				j(t), B((e) => G(n, e), [() => Q("hint.textInline")]), W(e, t);
			}, i = (e) => {
				var t = Rs(), n = R(t), r = L(n);
				Y(r);
				var i = z(r);
				j(n);
				var a = z(n, 2), o = L(a, !0);
				j(a);
				var s = z(a, 2);
				Vr(s, 17, () => V(M).props.items ?? [], Lr, (e, t, n) => {
					var r = Ls(), i = L(r);
					Y(i);
					var a = z(i, 2), o = L(a);
					o.disabled = n === 0, J(o, () => c.up, !0), j(o);
					var s = z(o, 2);
					J(s, () => c.down, !0), j(s);
					var l = z(s, 2);
					J(l, () => c.cross, !0), j(l), j(a), j(r), B((e, r) => {
						X(i, V(t).q), Z(i, "title", e), s.disabled = n === (V(M).props.items?.length ?? 0) - 1, Z(l, "title", r);
					}, [() => Q("tip.faq.question"), () => Q("tip.faq.remove")]), H("change", i, (e) => Dt(n, { q: e.target.value })), H("click", o, () => At(n, -1)), H("click", s, () => At(n, 1)), H("click", l, () => kt(n)), W(e, r);
				});
				var l = z(s, 2), u = L(l, !0);
				j(l), B((e, t, a, s, c) => {
					Z(n, "title", e), ii(r, t), G(i, ` ${a ?? ""}`), G(o, s), G(u, c);
				}, [
					() => Q("tip.faq.multi"),
					() => !!V(M).props.multi,
					() => Q("lbl.faqMulti"),
					() => Q("lbl.questions"),
					() => Q("ui.addQuestion")
				]), H("change", r, (e) => N("multi", e.target.checked)), H("click", l, Ot), W(e, t);
			}, a = (e) => {
				var t = Bs(), n = R(t), r = L(n, !0);
				j(n);
				var i = z(n, 2);
				Vr(i, 17, () => V(M).props.items ?? [], Lr, (e, t, n) => {
					var r = zs(), i = R(r), a = L(i);
					Y(a);
					var o = z(a, 2);
					Y(o);
					var s = z(o, 2), l = L(s);
					l.disabled = n === 0, J(l, () => c.up, !0), j(l);
					var u = z(l, 2);
					J(u, () => c.down, !0), j(u);
					var d = z(u, 2);
					J(d, () => c.cross, !0), j(d), j(s), j(i);
					var f = z(i, 2);
					Y(f), B((e, r, i, s, c, l) => {
						X(a, V(t).year), Z(a, "placeholder", e), Z(a, "title", r), X(o, V(t).title), Z(o, "title", i), u.disabled = n === (V(M).props.items?.length ?? 0) - 1, Z(d, "title", s), X(f, V(t).text), Z(f, "placeholder", c), Z(f, "title", l);
					}, [
						() => Q("ph.tlYear"),
						() => Q("tip.tl.year"),
						() => Q("tip.tl.title"),
						() => Q("tip.tl.remove"),
						() => Q("ph.tlText"),
						() => Q("tip.tl.text")
					]), H("change", a, (e) => jt(n, { year: e.target.value })), H("change", o, (e) => jt(n, { title: e.target.value })), H("click", l, () => Pt(n, -1)), H("click", u, () => Pt(n, 1)), H("click", d, () => Nt(n)), H("change", f, (e) => jt(n, { text: e.target.value })), W(e, r);
				});
				var a = z(i, 2), o = L(a, !0);
				j(a), B((e, t) => {
					G(r, e), G(o, t);
				}, [() => Q("lbl.tlItems"), () => Q("ui.addTlItem")]), H("click", a, Mt), W(e, t);
			}, o = (e) => {
				var t = Vs(), n = R(t), r = L(n), i = z(r);
				Y(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				Y(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				Y(u), j(c), B((e, t, n) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.text ?? ""), G(o, `${t ?? ""} `), X(s, V(M).props.attribution ?? ""), G(l, `${n ?? ""} `), X(u, V(M).props.role ?? "");
				}, [
					() => Q("lbl.sitatText"),
					() => Q("lbl.sitatName"),
					() => Q("lbl.sitatRole")
				]), H("change", i, (e) => N("text", e.target.value)), H("change", s, (e) => N("attribution", e.target.value)), H("change", u, (e) => N("role", e.target.value)), W(e, t);
			}, s = (e) => {
				var t = Hs(), n = R(t), r = L(n), i = z(r);
				Y(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				Y(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				Y(u), j(c);
				var d = z(c, 2), f = L(d), p = z(f);
				Y(p), j(d), B((e, t, n, a, c) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.value ?? ""), Z(i, "title", t), G(o, `${n ?? ""} `), X(s, V(M).props.prefix ?? ""), G(l, `${a ?? ""} `), X(u, V(M).props.suffix ?? ""), G(f, `${c ?? ""} `), X(p, V(M).props.label ?? "");
				}, [
					() => Q("lbl.statValue"),
					() => Q("tip.stat.value"),
					() => Q("lbl.statPrefix"),
					() => Q("lbl.statSuffix"),
					() => Q("lbl.statLabel")
				]), H("change", i, (e) => N("value", e.target.value)), H("change", s, (e) => N("prefix", e.target.value)), H("change", u, (e) => N("suffix", e.target.value)), H("change", p, (e) => N("label", e.target.value)), W(e, t);
			}, l = (e) => {
				var t = Ws(), n = R(t), r = L(n), i = z(r);
				Y(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.page ?? "__href"), t = /* @__PURE__ */ P(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.externalLink")]]);
					$(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							_t(`edit:${V(M).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				j(a);
				var c = z(a, 2), l = (e) => {
					var t = Us();
					Y(t), B((e) => {
						Z(t, "placeholder", e), X(t, V(M).props.href === "#" ? "" : V(M).props.href ?? "");
					}, [() => Q("ph.url")]), H("change", t, (e) => N("href", e.target.value || null)), W(e, t);
				};
				K(c, (e) => {
					V(M).props.page || e(l);
				}), B((e, t) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.label), G(o, `${t ?? ""} `);
				}, [() => Q("blocks.text"), () => Q("lbl.goesTo")]), H("change", i, (e) => N("label", e.target.value)), W(e, t);
			}, u = (e) => {
				var t = Ks(), n = R(t), r = L(n), i = z(r);
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				Y(s), j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				Y(u), j(c);
				var d = z(c, 2), f = (e) => {
					var t = Gs(), n = L(t);
					Y(n);
					var r = z(n);
					j(t), B((e, i, a) => {
						Z(t, "title", e), ii(n, i), G(r, ` ${a ?? ""}`);
					}, [
						() => Q("tip.lightbox"),
						() => !!V(M).props.lightbox,
						() => Q("lbl.lightbox")
					]), H("change", n, (e) => N("lightbox", e.target.checked)), W(e, t);
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
				]), H("change", i, It), H("change", s, (e) => N("alt", e.target.value)), H("change", u, (e) => N("href", e.target.value || null)), W(e, t);
			}, d = (e) => {
				var t = qs(), n = R(t), r = L(n, !0);
				j(n);
				var i = z(n, 2);
				Y(i);
				var a = z(i, 2), o = L(a), s = z(o);
				Y(s), j(a), B((e, t, a, c) => {
					Z(n, "title", e), G(r, t), X(i, V(M).props.url ?? ""), Z(i, "placeholder", a), G(o, `${c ?? ""} `), X(s, V(M).props.title ?? "");
				}, [
					() => Q("hint.video"),
					() => Q("lbl.videoUrl"),
					() => Q("ph.videoUrl"),
					() => Q("lbl.videoTitle")
				]), H("change", i, (e) => N("url", e.target.value)), H("change", s, (e) => N("title", e.target.value)), W(e, t);
			}, f = (e) => {
				var t = Zs(), n = R(t), r = L(n), i = z(r), a = L(i);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.glyph ?? "★"), t = /* @__PURE__ */ P(() => V(M).props.icon ?? null), n = /* @__PURE__ */ P(() => V(M).props.image ?? null);
					ba(a, {
						get value() {
							return V(e);
						},
						get icon() {
							return V(t);
						},
						get image() {
							return V(n);
						},
						onpick: (e) => _t(`edit:${V(M).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => _t(`edit:${V(M).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => N("image", e)
					});
				}
				var o = z(a, 2), s = (e) => {
					var t = Js();
					Y(t), B((e) => {
						X(t, V(M).props.glyph ?? ""), Z(t, "title", e);
					}, [() => Q("tip.icon.typeGlyph")]), H("change", t, (e) => N("glyph", e.target.value || "★")), W(e, t);
				}, c = (e) => {
					var t = Ys(), n = L(t, !0);
					j(t), B((e, r) => {
						Z(t, "title", e), G(n, r);
					}, [() => Q("tip.icon.backToGlyph"), () => Q("ui.removeDrawnIcon")]), H("click", t, () => N("icon", null)), W(e, t);
				};
				K(o, (e) => {
					V(M).props.icon ? e(c, -1) : e(s);
				}), j(i), j(n);
				var l = z(n, 2), u = (e) => {
					var t = Xs(), n = L(t), r = z(n, 2), i = L(r, !0);
					j(r), j(t), B((e, r, a) => {
						Z(t, "title", e), Z(n, "src", V(M).props.image), Z(n, "alt", r), G(i, a);
					}, [
						() => Q("hint.icon.ownImage"),
						() => Q("gp.ownIcon"),
						() => Q("ui.removeOwnIcon")
					]), H("click", r, () => N("image", null)), W(e, t);
				};
				K(l, (e) => {
					V(M).props.image && e(u);
				}), B((e) => G(r, `${e ?? ""} `), [() => Q("blocks.icon")]), W(e, t);
			}, p = (e) => {
				var t = Qs(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.collection ?? ""), t = /* @__PURE__ */ P(() => [["", Q("common.choose")], ...V(Ri).map((e) => [e, V(zi)[e]?.name ?? e])]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("collection", e || null)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				Y(s), j(a);
				var c = z(a, 2), l = L(c);
				Y(l);
				var u = z(l);
				j(c), B((e, t, i, c, d) => {
					Z(n, "title", e), G(r, `${t ?? ""} `), Z(a, "title", i), G(o, `${c ?? ""} `), X(s, V(M).props.limit ?? 6), ii(l, V(M).props.newestFirst !== !1), G(u, ` ${d ?? ""}`);
				}, [
					() => Q("tip.samling.source"),
					() => Q("blocks.samling"),
					() => Q("tip.samling.limit"),
					() => Q("lbl.maxCount"),
					() => Q("lbl.newestFirst")
				]), H("change", s, (e) => N("limit", Number(e.target.value))), H("change", l, (e) => N("newestFirst", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = ec(), n = R(t), r = L(n), i = z(r);
				j(n), Vr(z(n, 2), 17, () => V(M).props.images ?? [], Lr, (e, t, n) => {
					var r = $s(), i = L(r), a = L(i), o = z(a, 2), s = L(o);
					s.disabled = n === 0, J(s, () => c.up, !0), j(s);
					var l = z(s, 2);
					J(l, () => c.down, !0), j(l);
					var u = z(l, 2);
					J(u, () => c.cross, !0), j(u), j(o), j(i);
					var d = z(i, 2), f = L(d), p = z(f);
					Y(p), j(d);
					var m = z(d, 2), h = L(m), g = z(h);
					Y(g), j(m), j(r), B((e, r, o, s, c, d) => {
						Z(i, "title", e), Z(a, "src", V(t).src), l.disabled = n === V(M).props.images.length - 1, Z(u, "title", r), G(f, `${o ?? ""} `), X(p, V(t).alt ?? ""), Z(p, "placeholder", s), G(h, `${c ?? ""} `), X(g, V(t).href ?? ""), Z(g, "placeholder", d);
					}, [
						() => Q("hint.gallery"),
						() => Q("tip.removeImage"),
						() => Q("lbl.description"),
						() => Q("ph.altShort"),
						() => Q("lbl.link"),
						() => Q("ph.galleryHref")
					]), H("click", s, () => od(n, -1)), H("click", l, () => od(n, 1)), H("click", u, () => sd(n)), H("change", p, (e) => cd(n, "alt", e.target.value)), H("change", g, (e) => cd(n, "href", e.target.value || null)), W(e, r);
				}), B((e, t) => {
					Z(n, "title", e), G(r, `${t ?? ""} `);
				}, [() => Q("tip.gallery.addImages"), () => Q("ui.addImages")]), H("change", i, id), W(e, t);
			}, h = (e) => {
				var t = Ns(), n = L(t);
				$(z(n), {
					get value() {
						return V(M).props.kind;
					},
					get options() {
						return zt;
					},
					onchange: (e) => N("kind", e)
				}), j(t), B((e) => G(n, `${e ?? ""} `), [() => Q("blocks.shape")]), W(e, t);
			}, g = (e) => {
				let t = /* @__PURE__ */ P(() => V(Yu).find((e) => e.type === V(M).type)?.fields ?? []);
				var n = jr(), r = R(n), i = (e) => {
					var n = jr();
					Vr(R(n), 17, () => V(t), (e) => e.key, (e, t) => {
						var n = jr(), r = R(n), i = (e) => {
							let n = /* @__PURE__ */ P(() => `${V(M).blockId}:${V(t).key}`);
							var r = nc(), i = R(r), a = L(i), o = z(a);
							Y(o), j(i);
							var s = z(i, 2), c = L(s, !0);
							j(s);
							var l = z(s, 2), u = (e) => {
								var t = tc();
								let r;
								var i = L(t, !0);
								j(t), B(() => {
									r = Zr(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": bt[V(n)].err }), G(i, bt[V(n)].text);
								}), W(e, t);
							};
							K(l, (e) => {
								bt[V(n)] && e(u);
							}), B((e) => {
								G(a, `${V(t).label ?? ""} `), Z(o, "placeholder", V(t).placeholder), X(o, yt[V(n)] ?? V(M).props[V(t).key] ?? ""), s.disabled = V(xt), G(c, e);
							}, [() => Q("props.place.search")]), H("input", o, (e) => {
								yt[V(n)] = e.target.value;
							}), H("keydown", o, (e) => {
								e.key === "Enter" && wt(V(t));
							}), H("click", s, () => wt(V(t))), W(e, r);
						}, a = (e) => {
							var n = rc(), r = L(n), i = z(r);
							Y(i), j(n), B(() => {
								G(r, `${V(t).label ?? ""} `), Z(i, "min", V(t).min), Z(i, "max", V(t).max), Z(i, "step", V(t).step ?? 1), X(i, V(M).props[V(t).key]);
							}), H("change", i, (e) => N(V(t).key, Ct(V(t), Number(e.target.value)))), W(e, n);
						}, o = (e) => {
							var n = Gs(), r = L(n);
							Y(r);
							var i = z(r);
							j(n), B((e) => {
								ii(r, e), G(i, ` ${V(t).label ?? ""}`);
							}, [() => !!V(M).props[V(t).key]]), H("change", r, (e) => N(V(t).key, e.target.checked)), W(e, n);
						}, s = (e) => {
							var n = Ns(), r = L(n), i = z(r);
							{
								let e = /* @__PURE__ */ P(() => (V(t).options ?? []).map((e) => [e.value, e.label]));
								$(i, {
									get value() {
										return V(M).props[V(t).key];
									},
									get options() {
										return V(e);
									},
									onchange: (e) => N(V(t).key, e)
								});
							}
							j(n), B(() => G(r, `${V(t).label ?? ""} `)), W(e, n);
						}, c = (e) => {
							var n = ic(), r = L(n), i = z(r);
							Y(i), j(n), B(() => {
								G(r, `${V(t).label ?? ""} `), Z(i, "placeholder", V(t).placeholder), X(i, V(M).props[V(t).key] ?? "");
							}), H("change", i, (e) => N(V(t).key, e.target.value)), W(e, n);
						};
						K(r, (e) => {
							V(t).type === "place" ? e(i) : V(t).type === "number" ? e(a, 1) : V(t).type === "toggle" ? e(o, 2) : V(t).type === "select" ? e(s, 3) : e(c, -1);
						}), W(e, n);
					}), W(e, n);
				}, a = (e) => {
					var t = Ys(), n = L(t, !0);
					j(t), B((e, r) => {
						Z(t, "title", e), G(n, r);
					}, [() => Q("hint.pluginBlock"), () => Q("ui.settings")]), H("click", t, () => O?.sendOpenConfig(V(M).blockId)), W(e, t);
				};
				K(r, (e) => {
					V(t).length ? e(i) : e(a, -1);
				}), W(e, n);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "faq" ? e(i, 1) : V(M).type === "tidslinje" ? e(a, 2) : V(M).type === "sitat" ? e(o, 3) : V(M).type === "statistikk" ? e(s, 4) : V(M).type === "button" ? e(l, 5) : V(M).type === "image" ? e(u, 6) : V(M).type === "video" ? e(d, 7) : V(M).type === "icon" ? e(f, 8) : V(M).type === "samling" ? e(p, 9) : V(M).type === "galleri" ? e(m, 10) : V(M).type === "shape" ? e(h, 11) : e(g, -1);
			}), W(e, t);
		}, m = (e) => {
			var t = Sc(), n = R(t), r = (e) => {
				var t = ac(), n = R(t), r = L(n), a = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.align ?? "left"), t = /* @__PURE__ */ P(() => [
						["left", Q("common.left")],
						["center", Q("common.center")],
						["right", Q("common.right")]
					]);
					$(a, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("align", e)
					});
				}
				j(n);
				var o = z(n, 2), s = L(o);
				Y(s);
				var c = z(s);
				j(o);
				var l = z(o, 2), u = (e) => {
					i(e);
				};
				K(l, (e) => {
					V(M).props.box && e(u);
				}), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), ii(s, t), G(c, ` ${n ?? ""}`);
				}, [
					() => Q("lbl.align"),
					() => !!V(M).props.box,
					() => Q("lbl.textBoxToggle")
				]), H("change", s, (e) => N("box", e.target.checked)), W(e, t);
			}, a = (e) => {
				var t = oc(), n = R(t), r = L(n, !0);
				j(n);
				var a = z(n, 2);
				i(a), Ne(2), B((e) => G(r, e), [() => Q("lbl.cardStyle")]), W(e, t);
			}, o = (e) => {
				var t = sc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.variant ?? "venstre"), t = /* @__PURE__ */ P(() => [["venstre", Q("opt.tl.venstre")], ["veksler", Q("opt.tl.veksler")]]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("variant", e)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.marker ?? "fylt"), t = /* @__PURE__ */ P(() => [["fylt", Q("opt.tl.fylt")], ["ring", Q("opt.tl.ring")]]);
					$(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("marker", e)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ P(zn);
					Hi(u, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => N("accent", e === "accent" ? null : e)
					});
				}
				j(c), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `);
				}, [
					() => Q("lbl.variant"),
					() => Q("lbl.tlMarker"),
					() => Q("lbl.color")
				]), W(e, t);
			}, s = (e) => {
				var t = lc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.variant ?? "stor"), t = /* @__PURE__ */ P(() => [["stor", Q("opt.sitat.stor")], ["kort", Q("opt.sitat.kort")]]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("variant", e)
					});
				}
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = cc(), n = R(t), r = L(n), i = z(r);
					j(n);
					var a = z(n, 2), o = (e) => {
						var t = Ys(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Q("ui.sitatPortrettFjern")]), H("click", t, () => N("image", "")), W(e, t);
					};
					K(a, (e) => {
						V(M).props.image && e(o);
					}), B((e) => G(r, `${e ?? ""} `), [() => Q("ui.sitatPortrett")]), H("change", i, Lt), W(e, t);
				};
				K(a, (e) => {
					V(M).props.variant === "kort" && e(o);
				});
				var s = z(a, 2), c = L(s), l = z(c);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.accent ?? "accent"), t = /* @__PURE__ */ P(zn);
					Hi(l, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => N("accent", e === "accent" ? null : e)
					});
				}
				j(s), Ne(2), B((e, t) => {
					G(r, `${e ?? ""} `), G(c, `${t ?? ""} `);
				}, [() => Q("lbl.variant"), () => Q("lbl.color")]), W(e, t);
			}, c = (e) => {
				var t = uc(), n = R(t), r = L(n);
				Y(r);
				var i = z(r);
				j(n), Ne(2), B((e, t) => {
					Z(n, "title", e), ii(r, V(M).props.countUp !== !1), G(i, ` ${t ?? ""}`);
				}, [() => Q("tip.stat.countUp"), () => Q("lbl.statCountUp")]), H("change", r, (e) => N("countUp", e.target.checked)), W(e, t);
			}, l = (e) => {
				var t = dc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => [["primary", Q("opt.btn.primary")], ["secondary", Q("opt.btn.secondary")]]);
					$(i, {
						get value() {
							return V(M).props.style;
						},
						get options() {
							return V(e);
						},
						onchange: (e) => N("style", e)
					});
				}
				j(n), Ne(2), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.style")]), W(e, t);
			}, u = (e) => {
				var t = fc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.fit ?? "cover"), t = /* @__PURE__ */ P(() => [["cover", Q("opt.fitFrame.cover")], ["contain", Q("opt.fitFrame.contain")]]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("fit", e)
					});
				}
				j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ P(() => [
						["", Q("common.none")],
						["sm", Q("opt.size.sm")],
						["md", Q("opt.radius.md")]
					]);
					$(s, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("radius", e || null)
					});
				}
				j(a);
				var c = z(a, 2), l = L(c), u = z(l), d = L(u);
				j(u), j(c);
				var f = z(c, 2);
				Y(f);
				var p = z(f, 2), m = L(p), h = z(m), g = L(h);
				j(h), j(p);
				var _ = z(p, 2);
				Y(_);
				var v = z(_, 2), y = L(v), b = z(y), x = L(b);
				j(b), j(v);
				var S = z(v, 2);
				Y(S);
				var C = z(S, 2), w = L(C), T = z(w), ee = L(T);
				j(T), j(C);
				var E = z(C, 2);
				Y(E);
				var te = z(E, 2), ne = L(te), re = z(ne), ie = L(re);
				j(re), j(te);
				var ae = z(te, 2);
				Y(ae);
				var oe = z(ae, 2), se = L(oe), ce = z(se), le = L(ce);
				j(ce), j(oe);
				var ue = z(oe, 2);
				Y(ue);
				var de = z(ue, 2), fe = L(de, !0);
				j(de), Ne(2), B((e, t, n, i, a, s, c, u, p, h, b, C, T, te, re, oe, ce) => {
					G(r, `${e ?? ""} `), G(o, `${t ?? ""} `), G(l, `${n ?? ""} `), G(d, `${i ?? ""}%`), X(f, V(M).props.x ?? .5), G(m, `${a ?? ""} `), G(g, `${s ?? ""}%`), X(_, V(M).props.y ?? .5), Z(v, "title", c), G(y, `${u ?? ""} `), G(x, `${p ?? ""}x`), X(S, V(M).props.zoom ?? 1), G(w, `${h ?? ""} `), G(ee, `${b ?? ""}%`), X(E, V(M).props.brightness ?? 1), G(ne, `${C ?? ""} `), G(ie, `${T ?? ""}%`), X(ae, V(M).props.contrast ?? 1), G(se, `${te ?? ""} `), G(le, `${re ?? ""}%`), X(ue, V(M).props.saturate ?? 1), Z(de, "title", oe), G(fe, ce);
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
				]), H("input", f, (e) => N("x", Number(e.target.value))), H("input", _, (e) => N("y", Number(e.target.value))), H("input", S, (e) => N("zoom", Number(e.target.value))), H("input", E, (e) => N("brightness", Number(e.target.value))), H("input", ae, (e) => N("contrast", Number(e.target.value))), H("input", ue, (e) => N("saturate", Number(e.target.value))), H("click", de, () => _t(`edit:${V(M).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), W(e, t);
			}, d = (e) => {
				var t = pc(), n = R(t), r = L(n), i = z(r);
				Y(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.color ?? "accent"), t = /* @__PURE__ */ P(zn);
					Hi(s, {
						get value() {
							return V(e);
						},
						get tokens() {
							return V(t);
						},
						onchange: (e) => N("color", e)
					});
				}
				j(a), Ne(2), B((e, t, n) => {
					G(r, `${e ?? ""} `), X(i, V(M).props.size ?? 48), Z(a, "title", t), G(o, `${n ?? ""} `);
				}, [
					() => Q("lbl.sizePx"),
					() => Q("hint.icon.color"),
					() => Q("lbl.color")
				]), H("change", i, (e) => N("size", Number(e.target.value))), W(e, t);
			}, f = (e) => {
				var t = dc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.view ?? "cards"), t = /* @__PURE__ */ P(() => [
						["cards", Q("opt.collectionView.cards")],
						["list", Q("opt.collectionView.list")],
						["archive", Q("opt.collectionView.archive")]
					]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("view", e)
					});
				}
				j(n), Ne(2), B((e) => G(r, `${e ?? ""} `), [() => Q("lbl.view")]), W(e, t);
			}, p = (e) => {
				var t = gc(), n = R(t), r = L(n), i = z(r);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.view ?? "grid"), t = /* @__PURE__ */ P(() => [
						["grid", Q("opt.galleryView.grid")],
						["carousel", Q("opt.galleryView.carousel")],
						["slides", Q("opt.galleryView.slides")]
					]);
					$(i, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("view", e)
					});
				}
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = mc(), n = R(t), r = L(n), i = z(r);
					Y(i), j(n);
					var a = z(n, 2), o = L(a), s = z(o), c = L(s);
					j(s), j(a);
					var l = z(a, 2);
					Y(l), B((e, t) => {
						G(r, `${e ?? ""} `), X(i, V(M).props.columns ?? 3), G(o, `${t ?? ""} `), G(c, `${V(M).props.gap ?? 12 ?? ""} px`), X(l, V(M).props.gap ?? 12);
					}, [() => Q("lbl.columns"), () => Q("lbl.imageGap")]), H("change", i, (e) => N("columns", Number(e.target.value))), H("input", l, (e) => N("gap", Number(e.target.value))), W(e, t);
				};
				K(a, (e) => {
					(V(M).props.view ?? "grid") === "grid" && e(o);
				});
				var s = z(a, 2), c = (e) => {
					var t = hc(), n = L(t), r = z(n);
					Y(r), j(t), B((e) => {
						G(n, `${e ?? ""} `), X(r, V(M).props.interval ?? 5);
					}, [() => Q("lbl.secondsPerImage")]), H("change", r, (e) => N("interval", Number(e.target.value))), W(e, t);
				};
				K(s, (e) => {
					V(M).props.view === "slides" && e(c);
				});
				var l = z(s, 2), u = L(l), d = z(u);
				{
					let e = /* @__PURE__ */ P(() => V(M).props.radius ?? ""), t = /* @__PURE__ */ P(() => [
						["", Q("common.none")],
						["sm", Q("opt.size.sm")],
						["md", Q("opt.radius.md")]
					]);
					$(d, {
						get value() {
							return V(e);
						},
						get options() {
							return V(t);
						},
						onchange: (e) => N("radius", e || null)
					});
				}
				j(l);
				var f = z(l, 2), p = L(f);
				Y(p);
				var m = z(p);
				j(f), Ne(2), B((e, t, n, i) => {
					G(r, `${e ?? ""} `), G(u, `${t ?? ""} `), Z(f, "title", n), ii(p, V(M).props.lightbox !== !1), G(m, ` ${i ?? ""}`);
				}, [
					() => Q("lbl.view"),
					() => Q("lbl.radius"),
					() => Q("tip.lightbox"),
					() => Q("lbl.lightbox")
				]), H("change", p, (e) => N("lightbox", e.target.checked)), W(e, t);
			}, m = (e) => {
				var t = _c(), n = R(t), r = L(n);
				$(z(r), {
					get value() {
						return V(M).props.color;
					},
					get options() {
						return Bt;
					},
					onchange: (e) => N("color", e)
				}), j(n);
				var i = z(n, 2), a = L(i), o = z(a);
				Y(o), j(i);
				var s = z(i, 2), c = L(s);
				Y(c);
				var l = z(c);
				j(s), Ne(2), B((e, t, n, i, u) => {
					G(r, `${e ?? ""} `), G(a, `${t ?? ""} `), X(o, V(M).props.thickness), Z(s, "title", n), ii(c, i), G(l, ` ${u ?? ""}`);
				}, [
					() => Q("lbl.color"),
					() => Q("lbl.thickness"),
					() => Q("tip.shape.fill"),
					() => !!V(M).props.fill,
					() => Q("lbl.filled")
				]), H("change", o, (e) => N("thickness", Number(e.target.value))), H("change", c, (e) => N("fill", e.target.checked ? V(M).props.color : null)), W(e, t);
			};
			K(n, (e) => {
				V(M).type === "text" ? e(r) : V(M).type === "faq" ? e(a, 1) : V(M).type === "tidslinje" ? e(o, 2) : V(M).type === "sitat" ? e(s, 3) : V(M).type === "statistikk" ? e(c, 4) : V(M).type === "button" ? e(l, 5) : V(M).type === "image" ? e(u, 6) : V(M).type === "icon" ? e(d, 7) : V(M).type === "samling" ? e(f, 8) : V(M).type === "galleri" ? e(p, 9) : V(M).type === "shape" && e(m, 10);
			});
			var h = z(n, 2), g = L(h), _ = z(g);
			{
				let e = /* @__PURE__ */ P(() => qn(V(M).animation) ? V(M).animation.type : "");
				$(_, {
					get value() {
						return V(e);
					},
					get options() {
						return Jn;
					},
					onchange: (e) => Zn(e || null)
				});
			}
			j(h);
			var v = z(h, 2), y = (e) => {
				var t = vc(), n = R(t), r = L(n), i = z(r);
				Y(i), j(n);
				var a = z(n, 2), o = L(a), s = z(o);
				Y(s), j(a), B((e, t) => {
					G(r, `${e ?? ""} `), X(i, V(M).animation.props.duration), G(o, `${t ?? ""} `), X(s, V(M).animation.props.delay);
				}, [() => Q("lbl.durationMs"), () => Q("lbl.delayMs")]), H("change", i, (e) => $n("duration", Number(e.target.value))), H("change", s, (e) => $n("delay", Number(e.target.value))), W(e, t);
			}, b = /* @__PURE__ */ P(() => qn(V(M).animation));
			K(v, (e) => {
				V(b) && e(y);
			});
			var x = z(v, 2), S = L(x), C = z(S);
			{
				let e = /* @__PURE__ */ P(() => V(M).hover?.type ?? (V(M).animation && !qn(V(M).animation) ? V(M).animation.type : ""));
				$(C, {
					get value() {
						return V(e);
					},
					get options() {
						return Yn;
					},
					onchange: (e) => Qn(e || null)
				});
			}
			j(x);
			var w = z(x, 2), T = (e) => {
				var t = bc(), n = z(R(t), 2), r = L(n);
				Y(r);
				var i = z(r);
				j(n);
				var a = z(n, 2), o = (e) => {
					var t = yc(), n = R(t), r = L(n), i = z(r);
					Y(i), j(n);
					var a = z(n, 2), o = L(a), s = z(o);
					{
						let e = /* @__PURE__ */ P(() => V(M).sticky.until ?? ""), t = /* @__PURE__ */ P(ht);
						$(s, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => _t(`edit:${V(M).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									until: e || null
								};
							})
						});
					}
					j(a), B((e, t, s, c) => {
						Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(M).sticky.offset ?? 16), Z(a, "title", s), G(o, `${c ?? ""} `);
					}, [
						() => Q("tip.stickyOffset"),
						() => Q("lbl.stickyOffset"),
						() => Q("tip.stickyUntil"),
						() => Q("lbl.stickyUntil")
					]), H("change", i, (e) => _t(`edit:${V(M).blockId}`, (t) => {
						t.sticky = {
							...t.sticky,
							offset: Math.max(0, Number(e.target.value) || 0)
						};
					})), W(e, t);
				};
				K(a, (e) => {
					V(M).sticky && e(o);
				}), B((e, t, a) => {
					Z(n, "title", e), ii(r, t), G(i, ` ${a ?? ""}`);
				}, [
					() => Q("tip.sticky"),
					() => !!V(M).sticky,
					() => Q("lbl.sticky")
				]), H("change", r, (e) => _t(`edit:${V(M).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), W(e, t);
			};
			K(w, (e) => {
				V(te) === "desktop" && e(T);
			});
			var ee = z(w, 4), E = L(ee), ne = L(E, !0);
			j(E);
			var re = z(E, 2), ie = L(re), ae = (e) => {
				var t = xc(), n = L(t), r = L(n, !0), i = z(r);
				Y(i), j(n);
				var a = z(n, 2), o = L(a, !0), s = z(o);
				Y(s), j(a);
				var c = z(a, 2), l = L(c, !0), u = z(l);
				Y(u), j(c);
				var d = z(c, 2), f = L(d, !0), p = z(f);
				Y(p), j(d);
				var m = z(d, 2), h = L(m, !0), g = z(h);
				Y(g), j(m);
				var _ = z(m, 2), v = L(_, !0), y = z(v);
				Y(y), j(_), j(t), B((e, t, n, a, c, d, _) => {
					G(r, e), X(i, V(M).frame.x), G(o, t), X(s, V(M).frame.y), G(l, n), X(u, V(M).frame.w), G(f, a), X(p, V(M).frame.h), Z(m, "title", c), G(h, d), X(g, V(M).frame.z ?? 1), G(v, _), X(y, V(M).frame.rot ?? 0);
				}, [
					() => Q("frame.x"),
					() => Q("frame.y"),
					() => Q("frame.w"),
					() => Q("frame.h"),
					() => Q("tip.frameZ"),
					() => Q("frame.z"),
					() => Q("frame.rot")
				]), H("change", i, (e) => Tt("x", Number(e.target.value))), H("change", s, (e) => Tt("y", Number(e.target.value))), H("change", u, (e) => Tt("w", Number(e.target.value))), H("change", p, (e) => Tt("h", Number(e.target.value))), H("change", g, (e) => Tt("z", Number(e.target.value))), H("change", y, (e) => Tt("rot", Number(e.target.value))), W(e, t);
			};
			K(ie, (e) => {
				V(te) === "desktop" && e(ae);
			});
			var oe = z(ie, 2), se = L(oe);
			Y(se);
			var ce = z(se);
			j(oe), j(re), j(ee), B((e, t, n, r, i, a, o, s) => {
				Z(h, "title", e), G(g, `${t ?? ""} `), Z(x, "title", n), G(S, `${r ?? ""} `), Z(E, "title", i), G(ne, a), Z(oe, "title", o), ii(se, V(M).decor), G(ce, ` ${s ?? ""}`);
			}, [
				() => Q("tip.props.blockAnim"),
				() => Q("lbl.animIn"),
				() => Q("tip.props.blockHover"),
				() => Q("lbl.onHover"),
				() => Q("hint.placement"),
				() => Q("group.placement"),
				() => Q("tip.decor"),
				() => Q("lbl.decor")
			]), H("change", se, (e) => Ft(e.target.checked)), W(e, t);
		};
		K(f, (e) => {
			V(St) === "content" ? e(p) : e(m, -1);
		}), B((e, t) => {
			o = Zr(a, 1, "svelte-1n46o8q", null, o, { on: V(St) === "content" }), G(s, e), u = Zr(l, 1, "svelte-1n46o8q", null, u, { on: V(St) === "style" }), G(d, t);
		}, [() => Q("props.tabContent"), () => Q("props.tabStyle")]), H("click", a, () => I(St, "content")), H("click", l, () => I(St, "style")), W(e, t);
	}, o = [
		["color", So],
		["gradient", Po],
		["glow", Fo],
		["image", as],
		["bildegalleri", ls],
		["grain", Lo]
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
		minus: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M5 12h14\"/></svg>",
		gear: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z\"/></svg>",
		guides: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"2\"/><path d=\"M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17\"/></svg>",
		kebab: "<svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\"/></svg>",
		bookmark: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"/><path d=\"M12 7v6M9 10h6\"/></svg>",
		fit: "<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4\"/></svg>"
	}, l = [
		["lilla", Q("adminTheme.lilla")],
		["bronn", Q("adminTheme.bronn")],
		["gull", Q("adminTheme.gull")],
		["graa", Q("adminTheme.graa")],
		["nordlys", Q("adminTheme.nordlys")],
		["skumring", Q("adminTheme.skumring")],
		["glo", Q("adminTheme.glo")]
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
		return bo(e) == null || (xo(e, "#ffffff") ?? 0) >= (xo(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
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
		x(Q("status.storageFull"), "error");
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
	})), E = /* @__PURE__ */ F(!0), te = /* @__PURE__ */ F("desktop"), ne = /* @__PURE__ */ F(null), re = /* @__PURE__ */ F(0), ie = /* @__PURE__ */ F(0), ae = /* @__PURE__ */ F(tn(typeof window < "u" ? window.innerWidth : 1280)), oe = /* @__PURE__ */ F("fit"), se = /* @__PURE__ */ F(1), ce = /* @__PURE__ */ P(() => V(te) === "mobile" ? 390 : V(ae)), le = /* @__PURE__ */ P(() => V(oe) === "manual" ? V(se) : Ca(V(re), V(ce), "fit"));
	function ue(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(V(le) * 100) / 10) + e) * 10));
		I(se, t / 100), I(oe, "manual");
	}
	let de = /* @__PURE__ */ P(() => V(le) > 0 ? V(ie) / V(le) : V(ie)), fe = /* @__PURE__ */ P(() => V(ce) * V(le)), pe = /* @__PURE__ */ P(() => V(ie));
	bn(() => {
		let e = () => O?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), bn(() => {
		let e = V(te);
		O?.sendViewport(e);
	}), bn(() => {
		let e = () => {
			I(ae, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), bn(() => {
		let e = V(ne);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			let t = e.getBoundingClientRect();
			I(re, t.width, !0), I(ie, t.height, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let me = /* @__PURE__ */ F(0);
	function he() {
		I(me, D?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function ge(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			De("layout");
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
			}, _e(t, "oppsett-byttet"), e.sectionId === V(Vt) && I(Ut, e.minHeight, !0), V(M)?.sectionId === e.sectionId && ft(), D.save(), A(), O?.sendSection(V(g), t);
		}
	}
	function _e(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, he(), O?.sendAttention(e.id, !0));
	}
	let D = null, ve = null, O = null, k = /* @__PURE__ */ F(null);
	function ye() {
		I(k, ve.data, !0), ve.replace(V(k));
	}
	function be() {
		O?.sendSite(Be(V(k)));
	}
	let xe = /* @__PURE__ */ new Set(), Se = () => V(k).pages.find((e) => e.id === V(g));
	function A() {
		let e = V(k)?.pages?.some((e) => !xe.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = Pi?.hasDraft() || Object.values(Fi).some((e) => e.hasDraft()), n = Gi?.hasDraft() || Object.values(qi).some((e) => e.hasDraft());
		I(_, e || D?.hasDraft() && !xe.has(V(g)) || ve?.hasDraft() || Ea?.hasDraft() || t || n || !1, !0);
	}
	let Ce = [], we = [], Te = null;
	function Ee() {
		return JSON.stringify({
			pageId: V(g),
			page: D.data,
			site: ve.data,
			samlingerIndex: Li ? Pi.data : null,
			samlinger: Li ? Object.fromEntries(Object.entries(Fi).map(([e, t]) => [e, t.data])) : {},
			malerIndex: ta ? Gi.data : null,
			maler: ta ? Object.fromEntries(Object.entries(qi).map(([e, t]) => [e, t.data])) : {},
			plugins: Ea?.data ?? null
		});
	}
	function De(e) {
		e === Te && (e.startsWith("edit:") || e.startsWith("grid:")) || (Ce.push(Ee()), Ce.length > 50 && Ce.shift(), we.length = 0, Te = e);
	}
	function Oe(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (ve.replace(r), ye(), ve.save(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), be(), ke(i, a ?? {}), Ae(o, s ?? {}), je(c), t && t !== V(g) && V(k).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), Nr(t, { keepHistory: !0 }), A();
			return;
		}
		D.replace(n), D.save(), A(), he(), ft(), Jt(D.data.sections.find((e) => e.id === V(Vt))), V(k).pages.some((e) => e.id === V(g)) ? O?.sendPage(V(g), D.data) : Nr(V(k).pages[0].id, { keepHistory: !0 });
	}
	function ke(e, t) {
		if (!(!Pi || !e) && JSON.stringify({
			index: Pi.data,
			samlinger: Object.fromEntries(Object.entries(Fi).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			Pi.replace(e), Pi.save();
			for (let e of Object.keys(Fi)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete Fi[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Fi[e]) {
					let t = Ii[e] ?? null;
					Fi[e] = Ai(`urd-draft-samling-${e}`, () => t, S);
				}
				Fi[e].replace(n), Fi[e].save();
			}
			I(Ri, [...e.samlinger ?? []], !0), V(Bi) && !V(Ri).includes(V(Bi)) && I(Bi, null), fa();
		}
	}
	function Ae(e, t) {
		if (!(!Gi || !e) && JSON.stringify({
			index: Gi.data,
			maler: Object.fromEntries(Object.entries(qi).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			Gi.replace(e), Gi.save();
			for (let e of Object.keys(qi)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete qi[e]);
			for (let [e, n] of Object.entries(t)) qi[e] || (qi[e] = Ai(`urd-draft-mal-${e}`, () => Ji[e] ?? null, S)), qi[e].replace(n), qi[e].save();
			I(na, [...e.maler ?? []], !0), A(), ia();
		}
	}
	function je(e) {
		!Ea || !e || JSON.stringify(Ea.data) !== JSON.stringify(e) && (Ea.replace(e), Ea.save(), qa(), no());
	}
	function Me() {
		Ce.length && (we.push(Ee()), Oe(Ce.pop()), Te = null, x(Q("status.undone")));
	}
	function Pe() {
		we.length && (Ce.push(Ee()), Oe(we.pop()), Te = null, x(Q("status.redone")));
	}
	function Fe(e) {
		V(mt) && (e.target instanceof Element && e.target.closest(".block-menu") || I(mt, null));
	}
	function Ie(e) {
		if (e.key === "Escape" && V(mt)) {
			I(mt, null);
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
			].includes(t.type)) || !V(M) || V(te) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Pe() : Me());
	}
	async function Le() {
		I(h, ja(await (await fetch("/content/site.json")).json()), !0), ve = Ai("urd-draft-site", () => V(h), S), (ve.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: site-utkastet har schemaVersion ${ve.data.schemaVersion} (motoren har 1) og forkastes`), ve.replace(Be(V(h)))), ve.replace(ja(ve.data)), ve.save(), ye(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), await Nr(new URLSearchParams(location.search).get("page") ?? V(k).pages[0].id), await Za(), await da(), await ra(), await lr(), V(T) && dr(), V(k).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (I(Ke, V(k).site.title, !0), I(qe, V(k).theme.tokens.color.accent, !0), I(Je, V(k).theme.tokens.color.bg, !0), I(Ue, !0));
	}
	let Re = /* @__PURE__ */ F(null);
	function ze({ title: e, lines: t = [], okLabel: n = Q("confirm.ok"), cancelLabel: r = Q("confirm.cancel") }) {
		return new Promise((i) => {
			I(Re, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Ve({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = Q("confirm.ok"), cancelLabel: a = Q("confirm.cancel") }) {
		return new Promise((o) => {
			I(Re, {
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
	function He(e) {
		V(Re)?.resolve(V(Re).prompt ? e ? V(Re).value : null : e), I(Re, null);
	}
	let Ue = /* @__PURE__ */ F(!1), Ke = /* @__PURE__ */ F(""), qe = /* @__PURE__ */ F("#7c5cff"), Je = /* @__PURE__ */ F("#0b0e14");
	function Ye() {
		localStorage.setItem("urd-setup-done", "1"), I(Ue, !1);
	}
	function Xe() {
		let e = V(Ke).trim();
		e && (q("setup", () => {
			V(k).site.title = e, V(k).nav.logo = {
				type: "text",
				value: e
			}, V(k).theme.tokens.color.accent = V(qe), V(k).theme.tokens.color.bg = V(Je), delete V(k).site.setup;
		}), Ye(), x(Q("status.setupDone"), "ok"));
	}
	let Ze = /* @__PURE__ */ F(null), Qe = [
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
	], $e = Object.fromEntries(Qe.flat().map((e) => [e, Q(`panel.${e}`)])), et = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, tt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], nt = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function rt(e, t) {
		let n = [];
		for (let r of e) for (let e of Na[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || tt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function it() {
		let e = nt([...tt, ...rt(V(Wa), "admin")]);
		return ct === "auto" || e.some(([e]) => e === ct) ? e : [[ct, ct], ...e];
	}
	let at = () => rt(V(Aa)?.enabled ?? [], "site"), ct = localStorage.getItem("urd-admin-lang") ?? "auto";
	function lt(e) {
		e !== ct && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function ut(e) {
		I(Ze, V(Ze) === e ? null : e, !0), O?.sendShowGrid(V(Ze) === "grid"), V(Ze) === "history" && gr(), V(Ze) === "update" && !V(Tr) && Dr();
	}
	let M = /* @__PURE__ */ F(null);
	function dt(e, t) {
		let n = D?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function ft() {
		if (!V(M)) return;
		let { block: e } = dt(V(M).sectionId, V(M).blockId);
		if (!e) {
			I(M, null);
			return;
		}
		I(M, {
			sectionId: V(M).sectionId,
			blockId: V(M).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function pt(e) {
		if (I(mt, null), !e.blockId) {
			I(M, null);
			return;
		}
		I(M, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && I(Vt, e.sectionId, !0), ft();
	}
	let mt = /* @__PURE__ */ F(null);
	function ht() {
		let e = D?.data.sections ?? [], t = e.findIndex((e) => e.id === V(M)?.sectionId);
		return [["", Q("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, Q("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function gt(e) {
		if (pt(e), !V(M)) return;
		let t = V(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + V(le) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + V(le) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + V(le) * e.rect.top), Math.max(8, r));
		I(mt, {
			left: n,
			top: i
		}, !0);
	}
	function _t(e, t) {
		let { section: n, block: r } = dt(V(M)?.sectionId, V(M)?.blockId);
		r && (De(e), t(r, n), _e(n, "blokk-endret"), D.save(), A(), O?.sendSection(V(g), n), ft());
	}
	function N(e, t) {
		_t(`edit:${V(M).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function vt(e, t) {
		_t(`edit:${V(M).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let yt = tn({}), bt = tn({}), xt = /* @__PURE__ */ F(!1), St = /* @__PURE__ */ F("content"), Ct = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function wt(e) {
		let t = V(M).blockId, n = `${t}:${e.key}`, r = (yt[n] ?? V(M).props[e.key] ?? "").trim();
		bt[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			vt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		I(xt, !0), bt[n] = {
			text: Q("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (V(M)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (vt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), bt[n] = null) : bt[n] = {
				text: Ti(a) ?? Q("props.place.notFound"),
				err: !0
			};
		} catch {
			bt[n] = {
				text: Q("props.place.failed"),
				err: !0
			};
		} finally {
			I(xt, !1);
		}
	}
	function Tt(e, t) {
		Number.isFinite(t) && _t(`edit:frame-${V(M).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function Et(e) {
		_t(`edit:${V(M).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Dt(e, t) {
		_t(`edit:${V(M).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Ot() {
		_t("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: Q("seed.faq.newQ"),
				a: Q("seed.faq.answer")
			});
		});
	}
	function kt(e) {
		_t("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function At(e, t) {
		let n = e + t;
		_t("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function jt(e, t) {
		_t(`edit:${V(M).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Mt() {
		_t("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: Q("seed.tidslinje.newTitle"),
				text: ""
			});
		});
	}
	function Nt(e) {
		_t("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Pt(e, t) {
		let n = e + t;
		_t("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Ft(e) {
		_t("decor", (t) => {
			t.decor = e;
		});
	}
	async function It(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await kn(t);
			_t(`edit:${V(M).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || $i(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	async function Lt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await kn(t);
			_t(`edit:${V(M).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	let Rt = {
		text: Q("blocks.text"),
		button: Q("blocks.button"),
		image: Q("blocks.image"),
		shape: Q("blocks.shape"),
		video: Q("blocks.video"),
		icon: Q("blocks.icon"),
		galleri: Q("blocks.galleri"),
		faq: Q("blocks.faq")
	}, zt = [
		["line", Q("shape.line")],
		["arrow", Q("shape.arrow")],
		["circle", Q("shape.circle")],
		["rect", Q("shape.rect")],
		["triangle", Q("shape.triangle")]
	], Bt = [
		["accent", Q("color.accent")],
		["text", Q("color.text")],
		["surface", Q("color.surface")],
		["bg", Q("color.bg")]
	], Vt = /* @__PURE__ */ F(null), Ht = /* @__PURE__ */ F(null), Ut = /* @__PURE__ */ F(""), Wt = /* @__PURE__ */ F(tn([])), Gt = /* @__PURE__ */ F(null), Kt = /* @__PURE__ */ F(null), qt = /* @__PURE__ */ F("");
	function Jt(e) {
		I(Ht, e?.grid ? { ...e.grid } : null, !0), I(Ut, e?.size?.minHeight ?? "", !0), I(Wt, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), I(Gt, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), I(Kt, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), I(qt, e?.theme ?? "", !0);
	}
	let Yt = /* @__PURE__ */ F(null), Xt = tn({});
	function Zt() {
		try {
			let e = ((V(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${V(Vt)}"]`))?.getBoundingClientRect();
			I(Yt, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			I(Yt, null);
		}
	}
	bn(() => {
		V(Vt), V(Wt), requestAnimationFrame(() => requestAnimationFrame(Zt));
	}), bn(() => {
		let e = V(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => Zt());
		return t.observe(e), () => t.disconnect();
	}), bn(() => {
		for (let e of V(Wt)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !Xt[t]) {
				let e = new Image();
				e.onload = () => {
					Xt[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function Qt(e) {
		en("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function $t(e) {
		I(Vt, e.sectionId, !0), Jt(D?.data.sections.find((t) => t.id === e.sectionId));
	}
	function en(e, t) {
		let n = D.data.sections.find((e) => e.id === V(Vt));
		n && (De(e), t(n), D.save(), A(), O?.sendSection(V(g), n), Jt(n));
	}
	let rn = /* @__PURE__ */ F("color");
	function an(e, t) {
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
	function on(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function sn(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function cn(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function ln(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				cn(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				cn(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let un = (e) => Math.min(4, Math.max(.1, e));
	function dn(e, t, n, r) {
		cn(e, t, "size", un(Math.round((n + r) * 100) / 100));
	}
	function fn(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && cn(e, t, "size", un(r / 100));
	}
	function pn(e, t, n, r) {
		let i = Xt[n.props.src];
		if (!i?.w || !i?.h || !V(Yt)?.w || !V(Yt)?.h) return;
		let a = V(Yt).h * i.w / (V(Yt).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && cn(e, t, "fit", "vanlig"), cn(e, t, "size", un(Math.round(o * 100) / 100));
	}
	function mn(e) {
		return e.props;
	}
	function hn(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function gn(e, t, n, r) {
		hn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let _n = {
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
	function vn(e, t, n) {
		hn(e, t, e.keyPrefix, (e) => {
			e.kind = n, _n[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function yn(e, t, n, r) {
		hn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function xn(e, t) {
		hn(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Sn(e, t, n) {
		hn(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Cn(e, t, n, r) {
		hn(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let wn = /* @__PURE__ */ F(null);
	function Tn(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		I(wn, {
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
			I(wn, {
				...V(wn),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = V(wn);
			if (I(wn, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Cn(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function En(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function Dn(e, t) {
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
	async function On(e) {
		let t = await e.text(), n = Yi(t), r = Zi(t);
		if (!r) return n;
		let i = await Dn(n.dataUrl, r);
		if (!i) return n;
		let a = Xi(t, i);
		if (a === t) return n;
		try {
			return Yi(a);
		} catch {
			return n;
		}
	}
	async function kn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? On(e) : Ki(e);
	}
	async function An(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			cn(e, t, "src", (await kn(r)).dataUrl);
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	async function jn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Q("status.compressingImages"));
		let { images: i, failed: a, big: o } = await nd(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), rd(i.length, a, o);
	}
	function Mn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Nn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Pn(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function Fn(e, t) {
		q(e, () => {
			V(k).nav.style ??= {}, t(V(k).nav.style);
		});
	}
	let In = /* @__PURE__ */ P(() => ({
		mutate: en,
		keyPrefix: "bg",
		keyId: V(Vt)
	})), Ln = {
		mutate: Fn,
		keyPrefix: "navbg",
		keyId: "nav"
	}, Rn = {
		mutate: oo,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, zn = () => Object.entries(V(k)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), Bn = [
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
	], Vn = /* @__PURE__ */ P(() => !!V(k)?.theme.alt), Hn = /* @__PURE__ */ P(() => V(k)?.theme.alt?.auto === !0), Un = /* @__PURE__ */ P(() => V(k)?.theme.scheme === "dark" ? "dark" : "light"), Wn = /* @__PURE__ */ P(() => V(k)?.theme.tokens.color ?? {}), Gn = /* @__PURE__ */ P(() => ({
		...V(k)?.theme.tokens.color ?? {},
		...V(k)?.theme.alt?.tokens?.color ?? {}
	}));
	function Kn(e) {
		return {
			type: e,
			version: ps[e].version,
			props: ps[e].defaults()
		};
	}
	let qn = (e) => !!(e && ps[e.type]?.entrance), Jn = [["", Q("common.none")], ...Object.entries(ps).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label])], Yn = [["", Q("common.none")], ...Object.entries(ps).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? Q(t.labelKey) : t.label])];
	function Xn(e) {
		e.animation && !qn(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function Zn(e) {
		_t(`edit:anim-${V(M).blockId}`, (t) => {
			Xn(t), t.animation = e ? Kn(e) : null;
		}), V(M) && O?.sendDemoAnim(V(M).sectionId, V(M).blockId);
	}
	function Qn(e) {
		_t(`edit:hover-${V(M).blockId}`, (t) => {
			Xn(t), t.hover = e ? Kn(e) : null;
		});
	}
	function $n(e, t) {
		Number.isFinite(t) && (_t(`edit:anim-${V(M).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), V(M) && O?.sendDemoAnim(V(M).sectionId, V(M).blockId));
	}
	function er(e) {
		en("section-anim", (t) => {
			Xn(t), t.animation = e ? Kn(e) : null;
		}), O?.sendDemoAnim(V(Vt));
	}
	function tr(e) {
		en("section-hover", (t) => {
			Xn(t), t.hover = e ? Kn(e) : null;
		});
	}
	function nr(e, t) {
		Number.isFinite(t) && (en("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), O?.sendDemoAnim(V(Vt)));
	}
	function rr(e) {
		en("edit:section-anim", (t) => {
			t.animation && (t.animation.props.pattern = e);
		}), O?.sendDemoAnim(V(Vt));
	}
	function ir(e) {
		let t = D.data.sections.find((e) => e.id === V(Vt));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		De("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, I(Ut, r, !0), D.save(), A(), O?.sendSection(V(g), t);
	}
	function ar() {
		return D.data.sections.find((e) => e.id === V(Vt)) ?? D.data.sections[0];
	}
	function or(e) {
		let t = D.data.sections.find((e) => e.id === V(Vt));
		t && (De("grid:section"), t.grid = e ? { ...ve.data.grid } : null, I(Ht, t.grid ? { ...t.grid } : null, !0), D.save(), A(), O?.sendSection(V(g), t), V(Ze) === "grid" && O?.sendShowGrid(!0));
	}
	function sr(e, t) {
		let n = D.data.sections.find((e) => e.id === V(Vt));
		n?.grid && (De("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, I(Ht, { ...n.grid }, !0), D.save(), A(), O?.sendSection(V(g), n), V(Ze) === "grid" && O?.sendShowGrid(!0));
	}
	function cr(e, t) {
		De("grid:site"), I(ee, {
			...V(ee),
			[e]: t
		}, !0), ve.data.grid = {
			...ve.data.grid,
			[e]: t
		}, ve.save(), A(), be(), V(Ze) === "grid" && O?.sendShowGrid(!0);
	}
	async function lr() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(T, await e.json(), !0) : e.status !== 503 && I(T, null);
		} catch {
			I(T, null);
		}
	}
	let ur = null;
	async function dr() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (ur = (await e.json()).head ?? null);
		} catch {}
	}
	async function fr(e) {
		if (!ur) return await dr(), {
			ok: await ze({
				title: Q("confirm.conflictUnknown.title"),
				lines: [Q("confirm.conflictUnknown.body"), Q("confirm.conflictUnknown.warning")],
				okLabel: Q("confirm.publishAnyway"),
				cancelLabel: Q("confirm.cancel")
			}),
			head: ur
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${ur}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === ur) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Q("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await ze({
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
	let pr = /* @__PURE__ */ F(null), mr = /* @__PURE__ */ F(""), hr = /* @__PURE__ */ F(!1);
	async function gr() {
		I(mr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? I(pr, (await e.json()).commits, !0) : e.status === 401 ? (I(pr, [], !0), I(mr, Q("status.historyLoginRequired"), !0)) : (I(pr, [], !0), I(mr, Ti(await e.json().catch(() => null)) ?? Q("status.historyFetchFailed"), !0));
		} catch {
			I(pr, [], !0), I(mr, Q("status.historyUnavailable"), !0);
		}
	}
	let _r = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Ei(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), vr = !1;
	async function yr() {
		let e = V(pr)?.[0];
		if (!(!e || V(hr)) && await ze({
			title: Q("confirm.revert.title"),
			lines: [`«${e.message}»`, Q("confirm.revert.body")],
			okLabel: Q("confirm.revert.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			I(hr, !0), x(Q("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? ur = e : dr(), vr = !0, x(Q("status.revertDone"), "ok"), xr();
				} else t.status === 409 ? x(Q("status.revertConflict"), "error") : x(Ti(await t.json().catch(() => null)) ?? Q("status.revertFailed"), "error");
			} catch {
				x(Q("status.publishLayerUnreachable"), "error");
			}
			I(hr, !1), gr();
		}
	}
	async function xr() {
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
				x(Q("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(Q("status.revertDeployTimeout"), "error");
	}
	let Cr = /* @__PURE__ */ F(null), wr = /* @__PURE__ */ F(null), Tr = /* @__PURE__ */ F(!1), Er = /* @__PURE__ */ F(tn(/* @__PURE__ */ new Set()));
	async function Dr() {
		I(Tr, !0), I(wr, null), I(Cr, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (I(Cr, t, !0), I(Er, /* @__PURE__ */ new Set(), !0)) : I(wr, Ti(t) ?? Q("update.checkFailed"), !0);
		} catch {
			I(wr, Q("status.publishLayerUnreachable"), !0);
		}
		I(Tr, !1);
	}
	function Or(e) {
		let t = new Set(V(Er));
		t.has(e) ? t.delete(e) : t.add(e), I(Er, t, !0);
	}
	async function kr() {
		if (!V(Cr) || V(Cr).upToDate || V(Tr)) return;
		let e = [...V(Er)], t = V(Cr).changes.filter((e) => !V(Er).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await ze({
			title: Q("confirm.update.title"),
			lines: [Q("confirm.update.body", {
				target: V(Cr).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [Q("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: Q("confirm.update.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			I(Tr, !0), x(Q("update.running", { target: V(Cr).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: V(Cr).target,
						expect: V(Cr).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(Q("update.committed", { target: V(Cr).target }), "ok"), await U(V(Cr).target.replace(/^v/, ""))) : t.status === 409 ? (x(Ti(n) ?? Q("update.checkFailed"), "error"), await Dr()) : x(Ti(n) ?? Q("update.failed"), "error");
			} catch {
				x(Q("status.publishLayerUnreachable"), "error");
			}
			I(Tr, !1);
		}
	}
	async function U(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(Q("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(Q("update.deployTimeout"), "error");
	}
	let Ar = null;
	function Mr(e) {
		return {
			schemaVersion: 1,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: Ra("sec"),
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
	async function Nr(e, { keepHistory: t = !1 } = {}) {
		I(g, e, !0), Ar = (async () => {
			let n = Se(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Ma(await e.json(), ve.data));
			} catch {}
			r ? xe.delete(e) : r = Mr(n), D = Ai(`urd-draft-${e}`, () => r, S), (D.data.schemaVersion ?? 1) > 1 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${D.data.schemaVersion} (motoren har 1) og forkastes`), D.replace(structuredClone(r))), D.replace(Ma(D.data, ve.data)), D.save(), t || (Te = null), I(Vt, null), I(Ht, null), A(), he(), I(v, "");
		})(), await Ar;
	}
	function Pr() {
		O?.destroy(), V(w)?.contentDocument?.addEventListener("pointerdown", () => {
			V(mt) && I(mt, null);
		}, !0), O = xa(V(w), {
			onEdit: Au,
			onMove: ju,
			onGrow: Mu,
			onDelete: Hu,
			onAddSection: Lu,
			onMoveSection: Ru,
			onDeleteSection: zu,
			onSectionSize: Bu,
			onUndo: (e) => e.redo ? Pe() : Me(),
			onSelectSection: $t,
			onSelectBlock: pt,
			onBlockMenu: gt,
			onReady: Fr,
			onNavigate: Wr,
			onAddBlock: (e) => Ku(e.sectionId, e.block),
			onAddBlocks: (e) => qu(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: ed,
			onMoveBlockSection: Vu,
			onMobileManual: Nu,
			onMobileAuto: Pu,
			onReviewDone: Fu,
			onBlockFlag: Iu,
			onCollectionEdit: ha,
			onSaveTemplate: aa,
			onDeleteTemplate: sa,
			onApplyLayout: ge,
			onPluginBlocks: (e) => {
				I(Yu, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => q("edit:nav-width", () => {
				V(k).nav.style ??= {}, V(k).nav.style.width = e.width;
			})
		});
	}
	async function Fr() {
		await Ar, await ka, O?.sendPlugins(Be(V(Aa))?.enabled ?? []), O?.sendViewport(V(te)), pa(), ia(), ve.hasDraft() && be();
		let e = !V(h).pages.some((e) => e.id === V(g));
		(D.hasDraft() || e) && O?.sendPage(V(g), D.data), V(E) || O?.sendChrome(!1), V(Ze) === "grid" && O?.sendShowGrid(!0), V(Ir) && O?.sendShowGuides(!0), f();
	}
	let Ir = /* @__PURE__ */ F(localStorage.getItem("urd-guides") === "1"), Rr = /* @__PURE__ */ F(!1), zr = /* @__PURE__ */ F(tn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function Br(e) {
		I(zr, e === "menu" ? "menu" : "strip", !0), V(zr) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let Hr = /* @__PURE__ */ F(null);
	bn(() => {
		if (!V(Rr)) return;
		let e = (e) => {
			V(Hr)?.contains(e.target) || I(Rr, !1);
		}, t = (e) => {
			e.key === "Escape" && I(Rr, !1);
		}, n = () => {
			I(Rr, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function Ur() {
		I(Ir, !V(Ir)), localStorage.setItem("urd-guides", V(Ir) ? "1" : "0"), O?.sendShowGuides(V(Ir));
	}
	function Wr(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = V(k).pages.find((e) => e.path === t);
		n && n.id !== V(g) && Nr(n.id);
	}
	function q(e, t) {
		De(e), t(), ve.save(), A(), be();
	}
	let Gr = /* @__PURE__ */ F(""), Kr = /* @__PURE__ */ F(null), qr = /* @__PURE__ */ F(null);
	bn(() => {
		if (!V(qr)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || I(qr, null);
		}, t = (e) => {
			e.key === "Escape" && I(qr, null);
		}, n = () => {
			I(qr, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Jr = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function Yr(e, t = null) {
		return e ? Jr.includes(e) ? Q("error.reservedName", { slug: e }) : V(k).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Q("error.pageExists") : null : Q("error.pageNeedsName");
	}
	function Xr() {
		let e = V(Gr).trim(), t = $i(e), n = Yr(t);
		if (n) {
			x(n, "error");
			return;
		}
		let r = V(Kr) ? qi[V(Kr)]?.data?.page : null, i = r ? Va(Ma(JSON.parse(JSON.stringify(r)), ve.data), Ra, {
			id: t,
			title: e
		}) : Mr({
			id: t,
			title: e
		});
		q("pages", () => {
			V(k).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), V(k).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), A(), I(Gr, ""), I(Kr, null), Nr(t);
	}
	async function Qr(e) {
		I(qr, null), await oa("page", e.id === V(g) ? JSON.parse(JSON.stringify(D.data)) : await ti(e));
	}
	function ei(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		q("pages", () => {
			e.title = n;
			for (let t of V(k).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === V(g) ? (D.data.meta.title = n, D.save(), A(), O?.sendPage(V(g), D.data)) : ni(e, (e) => {
			e.meta.title = n;
		});
	}
	async function ti(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return Ma(await t.json(), ve.data);
		} catch {}
		return Mr(e);
	}
	async function ni(e, t) {
		let n = await ti(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), A();
	}
	function ri(e, t) {
		let n = $i(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = Yr(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		q("pages", () => {
			e.path = `/${n}`;
		});
	}
	function ai(e) {
		e.path !== "/" && (q("pages", () => {
			V(k).pages = V(k).pages.filter((t) => t.id !== e.id), V(k).nav.items = V(k).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of V(k).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			V(k).nav.items = V(k).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === V(g) && Nr(V(k).pages[0].id), x(Q("status.pageRemoved")));
	}
	function oi(e) {
		q("edit:nav-logo", () => {
			V(k).nav.logo = {
				type: "text",
				value: "",
				...V(k).nav.logo,
				...e
			};
		});
	}
	function si(e) {
		q("nav", () => {
			V(k).nav.logo ??= {
				type: "text",
				value: V(k).site.title
			};
			let t = V(k).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = V(k).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = V(k).site.title), delete t.image), t.type = e;
		});
	}
	async function li(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await kn(t);
			q("nav", () => {
				let t = V(k).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	let ui = /* @__PURE__ */ F(null);
	async function di(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await On(t);
				I(ui, e.dataUrl, !0);
			} catch {
				x(Q("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			I(ui, String(n.result), !0);
		}, n.onerror = () => x(Q("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function pi(e) {
		q("edit:site-icon", () => {
			V(k).site.icon = e;
		}), I(ui, null);
	}
	function mi() {
		q("edit:site-icon", () => {
			delete V(k).site.icon;
		});
	}
	function hi(e) {
		q("edit:site-title", () => {
			V(k).site.title = e;
		});
	}
	function gi(e) {
		q("edit:site-desc", () => {
			V(k).site.description = e;
		});
	}
	function _i() {
		let e = V(k).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function vi() {
		let e = _i(), t = nt([...tt, ...at()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function yi(e) {
		q("site", () => {
			V(k).site.lang = e;
		});
	}
	let bi = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	bn(() => {
		if (!V(k)?.site) return;
		let e = V(k).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			bi.test(e) && (t.href = e);
		}
	});
	function xi(e) {
		q("nav", () => {
			V(k).nav.layout = e;
		});
	}
	function Si(e, t) {
		q(`edit:nav-style-${e}`, () => {
			V(k).nav.style ??= {}, t === void 0 ? delete V(k).nav.style[e] : V(k).nav.style[e] = t;
		});
	}
	let Ci = /* @__PURE__ */ P(() => V(k)?.nav?.variant === "side-left" || V(k)?.nav?.variant === "side-right"), wi = /* @__PURE__ */ P(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(V(k)?.nav?.variant)), Di = {
		underline: [Q("hoverColor.underline.label"), Q("hoverColor.underline.title")],
		pill: [Q("hoverColor.pill.label"), Q("hoverColor.pill.title")],
		lift: [Q("hoverColor.lift.label"), Q("hoverColor.lift.title")]
	}, Oi = /* @__PURE__ */ P(() => Di[V(k)?.nav?.style?.hover] ?? null);
	function ki(e) {
		q("nav", () => {
			e === "bar" ? delete V(k).nav.variant : V(k).nav.variant = e;
		});
	}
	function ji(e) {
		q("nav", () => {
			V(k).nav.style ??= {}, e ? V(k).nav.style.glow = !0 : delete V(k).nav.style.glow;
		});
	}
	function Mi(e) {
		q("nav", () => {
			V(k).nav.style ??= {}, e ? delete V(k).nav.style.topGap : V(k).nav.style.topGap = !1;
		});
	}
	function Ni(e) {
		q("nav", () => {
			V(k).nav.style ??= {}, e === "standard" ? delete V(k).nav.style.hover : V(k).nav.style.hover = e;
		});
	}
	let Pi = null, Fi = {}, Ii = {}, Li = !1, Ri = /* @__PURE__ */ F(tn([])), zi = /* @__PURE__ */ F(tn({})), Bi = /* @__PURE__ */ F(null), Vi = /* @__PURE__ */ F(""), Ui = /* @__PURE__ */ F("news"), Wi = [
		["news", Q("collectionKind.news")],
		["notices", Q("collectionKind.notices")],
		["publications", Q("collectionKind.publications")],
		["custom", Q("collectionKind.custom")]
	], Gi = null, qi = {}, Ji = {}, ta = !1, na = /* @__PURE__ */ F(tn([]));
	async function ra() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		Gi = Ai("urd-draft-maler", () => e, S), I(na, [...Gi.data.maler ?? []], !0);
		for (let e of V(na)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			Ji[e] = t, qi[e] = Ai(`urd-draft-mal-${e}`, () => t, S), (qi[e].data?.schemaVersion ?? 1) > 1 && qi[e].reset();
		}
		ta = !0, ia();
	}
	function ia() {
		let e = V(na).map((e) => qi[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(qi[e].data))
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
	function aa(e) {
		let t = za.includes(e.kind) ? e.kind : "section";
		return oa(t, e[t]);
	}
	async function oa(e, t) {
		if (!t || !Gi) return;
		let n = (await Ve({
			title: Q("canvas.templateNamePrompt"),
			placeholder: Q("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Ba(n);
		if (!r) {
			x(Q("status.invalidName"), "error");
			return;
		}
		if (V(na).includes(r)) {
			x(Q("status.templateExists"), "error");
			return;
		}
		De("maler");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		qi[r] = Ai(`urd-draft-mal-${r}`, () => null, S), qi[r].replace(i), qi[r].save(), Gi.data.maler = [...V(na), r], Gi.save(), I(na, [...V(na), r], !0), x(Q("status.templateSaved", { name: n }), "ok"), A(), ia();
	}
	async function sa(e) {
		let t = qi[e.id]?.data?.mal;
		t && await ze({ title: Q("confirm.deleteTemplate", { name: t.name }) }) && (De("maler"), V(Kr) === e.id && I(Kr, null), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete qi[e.id], Gi.data.maler = V(na).filter((t) => t !== e.id), Gi.save(), I(na, V(na).filter((t) => t !== e.id), !0), A(), ia());
	}
	async function da() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		Pi = Ai("urd-draft-samlinger", () => e, S), I(Ri, [...Pi.data.samlinger ?? []], !0);
		for (let e of V(Ri)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Ii[e] = t, Fi[e] = Ai(`urd-draft-samling-${e}`, () => t, S), !t && !Fi[e].data && (Fi[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Fi[e].save());
		}
		Li = !0, fa();
	}
	function fa(e = !0) {
		let t = {};
		for (let e of V(Ri)) Fi[e] && (t[e] = JSON.parse(JSON.stringify(Fi[e].data)));
		I(zi, t, !0), e && pa();
	}
	function pa() {
		O?.sendCollections(Be(V(zi)) ?? {});
	}
	function ma(e, t, n, r = !0) {
		let i = Fi[e];
		i && (De(t), n(i.data), i.save(), A(), fa(r));
	}
	function ha(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || ma(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function ga() {
		let e = V(Vi).trim();
		if (!e) return;
		let t = $i(e);
		if (!t || V(Ri).includes(t)) {
			x(Q(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		De("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: V(Ui),
			entries: []
		};
		Fi[t] = Ai(`urd-draft-samling-${t}`, () => null, S), Fi[t].replace(n), Fi[t].save(), Pi.data.samlinger = [...V(Ri), t], Pi.save(), I(Ri, [...V(Ri), t], !0), I(Bi, t, !0), I(Vi, ""), A(), fa();
	}
	function _a(e) {
		De("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete Fi[e], Pi.data.samlinger = V(Ri).filter((t) => t !== e), Pi.save(), I(Ri, V(Ri).filter((t) => t !== e), !0), V(Bi) === e && I(Bi, null), A(), fa();
	}
	function va(e) {
		ma(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Ra("innslag"),
				title: Q("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function ya(e, t, n, r) {
		ma(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Sa(e, t, n) {
		ma(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function wa(e, t) {
		ma(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Ta(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && ya(e, t, "image", (await kn(r)).dataUrl);
	}
	let Ea = null, Da, ka = new Promise((e) => {
		Da = e;
	}), Aa = /* @__PURE__ */ F(null), Na = tn({}), Pa = /* @__PURE__ */ F("0.0.0"), Ia = /* @__PURE__ */ F(""), Ha = /* @__PURE__ */ F(""), Ua = /* @__PURE__ */ F(tn([])), Wa = /* @__PURE__ */ F(tn([])), Ga = /* @__PURE__ */ F("pending"), Ka = () => [.../* @__PURE__ */ new Set([...V(Aa)?.enabled ?? [], ...V(Aa)?.disabled ?? []])];
	function qa() {
		I(Aa, JSON.parse(JSON.stringify(Ea.data)), !0);
	}
	let Ja = /* @__PURE__ */ F(null);
	async function Ya() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				I(Ja, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			I(Ja, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src")
			}, !0);
		} catch {
			I(Ja, { unknown: !0 }, !0);
		}
	}
	function Xa(e) {
		let t = [...(e.connectSrc ?? []).map((e) => ["connect-src", e]), ...(e.frameSrc ?? []).map((e) => ["frame-src", e])];
		if (!V(Ja) || V(Ja).unknown) return [];
		let n = {
			"connect-src": V(Ja).connectSrc,
			"frame-src": V(Ja).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function Za() {
		Ya();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		I(Wa, e.enabled ?? [], !0), Ea = Ai("urd-draft-plugins", () => e, S), qa();
		try {
			I(Pa, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Ka()) eo(e);
		Qa(), Da(), O?.sendPlugins(Be(V(Aa))?.enabled ?? []);
	}
	async function Qa() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				$a();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), I(Ua, (t ?? []).filter((e) => !Ka().includes(e)), !0);
			for (let e of V(Ua)) eo(e);
			I(Ga, "ok");
		} catch {
			$a();
		}
	}
	function $a() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				I(Ua, e.filter((e) => !Ka().includes(e)), !0);
				for (let e of V(Ua)) eo(e);
				I(Ga, "ok");
				return;
			}
		} catch {}
		I(Ga, "unavailable");
	}
	async function eo(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = La(t);
			Na[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && Fa(V(Pa), t.requiresEngine)
			};
		} catch {
			Na[e] = {
				name: e,
				errors: [Q("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function to(e, t) {
		De("plugins");
		let n = Ea.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), Ea.save(), A(), qa(), no();
	}
	function no() {
		V(w) && (V(w).src = V(w).src);
	}
	function ro(e) {
		De("plugins");
		let t = Ea.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), Ea.save(), A(), qa(), no();
	}
	async function io() {
		I(Ha, "");
		let e = V(Ia).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			I(Ha, Q("plugin.invalidId"), !0);
			return;
		}
		if (Ka().includes(e)) {
			I(Ha, Q("plugin.alreadyListed"), !0);
			return;
		}
		if (await eo(e), Na[e].errors.length) {
			I(Ha, Q("plugin.invalidManifest", { errors: Na[e].errors.join("; ") }), !0);
			return;
		}
		to(e, !0), I(Ia, "");
	}
	function ao(e) {
		I(Ua, V(Ua).filter((t) => t !== e), !0), to(e, !0);
	}
	function oo(e, t) {
		q(e, () => {
			V(k).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(V(k).footer);
		});
	}
	function so(e, t) {
		oo(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function lo(e) {
		oo("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function uo(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await kn(t);
			oo("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	function po() {
		oo("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function mo(e) {
		oo("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function ho(e) {
		oo("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let _o = [
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
			id: "sentrert",
			label: Q("footerTemplate.sentrert"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: Q("footerTemplate.kolonner"),
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
			id: "nyhetsbrev",
			label: Q("footerTemplate.nyhetsbrev"),
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
			label: Q("footerTemplate.storcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: Q("footerTemplate.kontakt"),
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
	function vo(e) {
		let t = Q("seed.orgName"), n = V(k).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${Q("seed.footer.madeWith")}`
		} : e === "kolonner" ? {
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
		} : e === "nyhetsbrev" ? {
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
		} : e === "storcta" ? {
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
		} : e === "kontakt" ? {
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
						a(Q("seed.email"), "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
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
				links: [a(Q("seed.footer.newsletter"), "#"), a(Q("seed.email"), "mailto:post@dinforening.no")]
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
					version: Fo.version ?? 1,
					props: {
						...Fo.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Lo.version ?? 1,
					props: {
						...Lo.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function Co(e) {
		oo("footer-template", (t) => {
			let n = vo(e);
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
	function wo(e) {
		oo("footer", (t) => {
			t[e] ??= [], t[e].push(V(k).pages[0] ? {
				label: Q("seed.link"),
				page: V(k).pages[0].id
			} : {
				label: Q("seed.link"),
				href: "https://"
			});
		});
	}
	function To(e, t) {
		oo("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function Eo(e, t, n) {
		oo("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Do(e, t, n) {
		oo(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Oo(e, t, n) {
		oo("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function ko(e, t, n) {
		oo(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function Ao(e) {
		oo("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function jo(e) {
		oo("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: Q("seed.join")
			} : delete t.cta;
		});
	}
	function Mo(e, t) {
		oo(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function No(e) {
		oo("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function Io(e, t) {
		oo("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Ro() {
		oo("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: Q("seed.column"),
				links: [{
					label: Q("seed.link"),
					page: V(k).pages[0].id
				}]
			});
		});
	}
	function zo(e) {
		oo("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function Bo(e, t) {
		oo("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Vo(e, t) {
		oo(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Ho(e) {
		oo("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: Q("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function Uo(e, t) {
		oo("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Wo(e, t, n) {
		oo("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Go(e, t, n) {
		oo(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Ko(e, t, n) {
		oo("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function qo(e, t, n) {
		oo(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function Jo() {
		oo("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Yo(e) {
		oo("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Xo(e, t) {
		oo("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Zo(e, t) {
		oo("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Qo(e, t) {
		oo(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let $o = la.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, ca[e].label]));
	function es(e, t) {
		q(`edit:nav-label-${e}`, () => {
			V(k).nav.items[e].label = t;
		});
	}
	function ts(e, t) {
		q("nav", () => {
			let n = V(k).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function ns(e, t) {
		q(`edit:nav-href-${e}`, () => {
			V(k).nav.items[e].href = t;
		});
	}
	function rs(e, t) {
		let n = e + t, r = V(k).nav.items;
		n < 0 || n >= r.length || q("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function is(e) {
		q("nav", () => {
			V(k).nav.items.splice(e, 1);
		});
	}
	function os() {
		q("nav", () => {
			V(k).nav.items.push({
				label: Q("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function ss(e) {
		q("nav", () => {
			let t = V(k).nav.items[e];
			t.children ??= [], t.children.push({
				label: Q("seed.link"),
				page: V(k).pages[0].id
			});
		});
	}
	function cs(e, t, n) {
		q(`edit:nav-child-label-${e}-${t}`, () => {
			V(k).nav.items[e].children[t].label = n;
		});
	}
	function ds(e, t, n) {
		q("nav", () => {
			let r = V(k).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function fs(e, t, n) {
		q(`edit:nav-child-href-${e}-${t}`, () => {
			V(k).nav.items[e].children[t].href = n;
		});
	}
	function uu(e, t, n) {
		let r = t + n, i = V(k).nav.items[e].children;
		r < 0 || r >= i.length || q("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function du(e, t) {
		q("nav", () => {
			let n = V(k).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = V(k).pages[0].id));
		});
	}
	function fu(e, t) {
		q(`edit:theme-color-${e}`, () => {
			V(k).theme.tokens.color[e] = t, V(k).theme.alt?.auto && (V(k).theme.alt.tokens.color = gu());
		});
	}
	function pu(e, t) {
		q("theme", () => {
			V(k).theme.tokens.font[e] = t;
		});
	}
	function mu(e, t) {
		q("theme", () => {
			V(k).theme.tokens.radius[e] = t;
		});
	}
	function hu(e) {
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
	function gu() {
		return Object.fromEntries(Object.entries(V(k).theme.tokens.color).map(([e, t]) => [e, hu(t)]));
	}
	function _u(e, t) {
		q(`edit:theme-alt-${e}`, () => {
			V(k).theme.alt.tokens.color[e] = t, V(k).theme.alt.auto = !1;
		});
	}
	function vu(e) {
		q("theme", () => {
			e === "light" ? delete V(k).theme.scheme : V(k).theme.scheme = e;
		});
	}
	function yu(e) {
		q("theme", () => {
			e ? V(k).theme.alt = {
				auto: !0,
				tokens: { color: gu() }
			} : delete V(k).theme.alt;
		});
	}
	function bu(e) {
		q("theme", () => {
			V(k).theme.alt ??= { tokens: { color: gu() } }, V(k).theme.alt.auto = e, e && (V(k).theme.alt.tokens.color = gu());
		});
	}
	function xu(e) {
		let t = V(k).theme.tokens.font[e];
		return [...ms.some(([, e]) => e === t) ? [] : [[t, Q("opt.customFont")]], ...ms.map(([e, t]) => [t, Q(e)])];
	}
	let Su = (e) => parseInt(e, 10) || 0;
	function Cu(e, t) {
		mu(e, `${t}px`);
	}
	let wu = (e, t) => e && t && t[e] ? t[e] : e, Tu = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Eu = [
		{
			id: "bronn",
			name: Q("themePreset.bronn.name"),
			note: Q("themePreset.bronn.note"),
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
			name: Q("themePreset.stein.name"),
			note: Q("themePreset.stein.note"),
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
			name: Q("themePreset.plomme.name"),
			note: Q("themePreset.plomme.note"),
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
			id: "hav",
			name: Q("themePreset.hav.name"),
			note: Q("themePreset.hav.note"),
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
			name: Q("themePreset.natt.name"),
			note: Q("themePreset.natt.note"),
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
	function Du(e) {
		q("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Tu) V(k).theme.tokens.color[e] = n[e];
			t ? V(k).theme.scheme = "dark" : delete V(k).theme.scheme, V(k).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Ou = /* @__PURE__ */ P(() => {
		if (!V(k)) return null;
		let e = V(k).theme.tokens.color, t = V(k).theme.alt?.tokens?.color ?? {}, n = V(k).theme.scheme === "dark";
		return Eu.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Tu.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function ku() {
		I(E, !V(E)), O?.sendChrome(V(E));
	}
	function Au(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (De(`edit:${e.blockId}`), n.props = e.props, D.save(), A(), V(M)?.blockId === e.blockId && ft(), e.rerender && O?.sendSection(V(g), t), I(v, ""));
	}
	function ju(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		De(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && _e(t, "desktop-endret-etter-mobil"), D.save(), A(), V(M)?.blockId === e.blockId && ft();
	}
	function Mu(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (D.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), D.hasDraft() && De(`edit:${e.blockId}`), t.frames.desktop.h = e.h, D.save(), A(), V(M)?.blockId === e.blockId && ft());
	}
	function Nu(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
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
			}, D.save(), A();
		}
	}
	function Pu(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			De("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, D.save(), A(), he(), O?.sendSection(V(g), t);
		}
	}
	function Fu(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (De("review-done"), t.responsive.mobile.attention = null, D.save(), A(), he());
	}
	function Iu(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (De("decor"), t.decor = e.decor, D.save(), A(), V(M)?.blockId === e.blockId && ft());
	}
	function Lu(e) {
		De("add-section"), e.section.id || (e.section.id = Ra("sec")), D.data.sections.splice(e.index, 0, e.section), D.save(), A(), O?.sendPage(V(g), D.data), I(Vt, e.section.id, !0), Jt(e.section), V(Ze) !== "properties" && (I(Ze, "properties"), O?.sendShowGrid(!1));
	}
	function Ru(e) {
		let t = D.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (De("move-section"), [t[n], t[r]] = [t[r], t[n]], D.save(), A(), O?.sendPage(V(g), D.data));
	}
	function zu(e) {
		De("delete-section"), e.sectionId === V(Vt) && (I(Vt, null), I(Ht, null)), V(M)?.sectionId === e.sectionId && I(M, null), D.data.sections = D.data.sections.filter((t) => t.id !== e.sectionId), D.save(), A(), O?.sendPage(V(g), D.data);
	}
	function Bu(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
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
			e.moves?.length && (_e(t, "seksjonshøyde"), V(M)?.sectionId === e.sectionId && ft()), e.sectionId === V(Vt) && I(Ut, e.minHeight, !0), D.save(), A();
		}
	}
	function Vu(e) {
		let t = D.data.sections.find((t) => t.id === e.fromSectionId), n = D.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (De("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), _e(t, "blokk-flyttet"), _e(n, "blokk-flyttet"), D.save(), A(), he(), O?.sendPage(V(g), D.data), V(M)?.blockId === e.blockId && (I(M, {
			...V(M),
			sectionId: e.toSectionId
		}, !0), ft()));
	}
	function Hu(e) {
		let t = D.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		De("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(V(M)?.blockId) && I(M, null), _e(t, "blokk-slettet"), D.save(), A(), O?.sendSection(V(g), t);
	}
	let Uu = {
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
		tidslinje: {
			type: "tidslinje",
			props: {
				items: [
					{
						year: "2019",
						title: Q("seed.tidslinje.t1"),
						text: Q("seed.tidslinje.text")
					},
					{
						year: "2022",
						title: Q("seed.tidslinje.t2"),
						text: Q("seed.tidslinje.text")
					},
					{
						year: "2026",
						title: Q("seed.tidslinje.t3"),
						text: Q("seed.tidslinje.text")
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
				text: Q("seed.sitat.text"),
				attribution: Q("seed.sitat.name"),
				role: Q("seed.sitat.role"),
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
				label: Q("seed.statistikk.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		}
	};
	function Wu(e) {
		let t = Uu[e];
		return t ? {
			id: Ra("blk"),
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
	function Gu(e) {
		O ? O.sendPlaceBlock(e) : Ku(ar()?.id, e);
	}
	function Ku(e, t) {
		let n = D.data.sections.find((t) => t.id === e) ?? D.data.sections[0];
		if (!n) return;
		De("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), _e(n, "blokk-lagt-til"), D.save(), A(), O?.sendSection(V(g), n);
	}
	function qu(e, t, n, r) {
		let i = D.data.sections.find((t) => t.id === e);
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
		}), _e(i, "blokk-lagt-til"), D.save(), A(), O?.sendSection(V(g), i);
	}
	function Ju(e) {
		Gu(Wu(e));
	}
	let Yu = /* @__PURE__ */ F(tn([]));
	function Xu(e, t = {}) {
		let n = Be(e);
		Gu({
			id: Ra("blk"),
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
	let Zu = /* @__PURE__ */ F("");
	function Qu() {
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
				label: Q("blocks.samling"),
				act: "block",
				kind: "samling"
			},
			{
				label: Q("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: Q("blocks.tidslinje"),
				act: "block",
				kind: "tidslinje"
			},
			{
				label: Q("blocks.sitat"),
				act: "block",
				kind: "sitat"
			},
			{
				label: Q("blocks.statistikk"),
				act: "block",
				kind: "statistikk"
			},
			{
				label: Q("ui.emptyGallery"),
				act: "block",
				kind: "galleri"
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
		for (let t of V(na)) {
			let n = qi[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "mal",
				id: t
			});
		}
		for (let t of V(Yu)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function $u(e) {
		e.act === "block" ? Ju(e.kind) : e.act === "plugin" ? Xu(e.entry, e.props ?? {}) : e.act === "mal" && O?.sendInsertTemplate(e.id);
	}
	function ed(e) {
		let t = Wu(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = D.data.sections.find((t) => t.id === e.sectionId)?.grid ?? V(k).grid, r = hs({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Ku(e.sectionId, t), O?.sendSelect(t.id), e.kind === "image" && x(Q("status.imageBlockAdded")), e.kind === "galleri" && x(Q("status.galleryBlockAdded"));
		}
	}
	async function td(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Q("status.compressingImage"));
		let n;
		try {
			n = await kn(t);
		} catch {
			x(Q("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (V(w)?.clientWidth ?? 1280));
		Gu({
			id: Ra("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: $i(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(Q("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function nd(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await kn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: $i(i.name).replaceAll("-", " "),
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
	function rd(e, t, n) {
		t ? x(Q("status.imagesReadFailed", { n: t }), "error") : n ? x(Q("status.imagesLarge", { n }), "error") : x(e ? "" : Q("status.noImagesAdded"));
	}
	async function id(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await nd(t);
		n.length && _t("galleri-add", (e) => {
			e.props.images.push(...n);
		}), rd(n.length, r, i);
	}
	async function ad(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await nd(t);
		if (!n.length) {
			rd(0, r, i);
			return;
		}
		let a = Wu("galleri");
		a.props.images = n, Gu(a), rd(n.length, r, i);
	}
	function od(e, t) {
		_t("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function sd(e) {
		_t("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function cd(e, t, n) {
		_t(`edit:${V(M).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function ld(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/")) return;
		let a = i.split(",", 2)[1], o = `media/${$i(n || "bilde")}-${ea(a)}.${Qi(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function ud(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && ld(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) ld(e, "src", "bakgrunn", t);
	}
	function dd(e, t) {
		if (e.type === "image" && ld(e.props, "src", e.props.alt, t), e.type === "icon" && ld(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) ld(n, "src", n.alt || "galleri", t);
	}
	function fd(e, t) {
		ud(e.background, t);
		for (let n of e.blocks) dd(n, t);
	}
	function pd(e) {
		let t = [];
		for (let n of e.sections) fd(n, t);
		return t;
	}
	function md(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && ld(n, "value", "logo", t), n?.type === "both" && ld(n, "image", "logo", t), e.nav?.style && ld(e.nav.style, "image", "meny", t), ud(e.nav?.style?.background, t), ud(e.footer?.background, t), e.footer?.brand && ld(e.footer.brand, "logo", "footer-logo", t), ld(e.site, "icon", "ikon", t), t;
	}
	let hd = /* @__PURE__ */ F(!1);
	function gd() {
		if (!V(hd)) {
			I(hd, !0);
			return;
		}
		I(hd, !1), _d();
	}
	bn(() => {
		if (!V(hd)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || I(hd, !1);
		}, t = (e) => {
			e.key === "Escape" && I(hd, !1);
		}, n = () => I(hd, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function _d() {
		De("discard");
		for (let e of V(k).pages) e.id !== V(g) && !xe.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = D.reset();
		if (ve.reset(), Ea && (Ea.reset(), qa()), Pi) {
			Pi.reset(), I(Ri, [...Pi.data.samlinger ?? []], !0);
			for (let e of Object.keys(Fi)) V(Ri).includes(e) ? Fi[e].reset() : delete Fi[e];
			fa();
		}
		if (Gi) {
			Gi.reset(), I(na, [...Gi.data.maler ?? []], !0);
			for (let e of Object.keys(qi)) V(na).includes(e) ? qi[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete qi[e]);
			ia();
		}
		ye(), I(ee, {
			snap: !0,
			...V(k).grid
		}, !0), A(), I(v, ""), be(), V(k).pages.some((e) => e.id === V(g)) ? O?.sendPage(V(g), e) : Nr(V(k).pages[0].id);
	}
	async function vd() {
		if (vr) {
			x(Q("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (V(Tr)) {
			x(Q("update.publishBlocked"), "error");
			return;
		}
		x(Q("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of V(k).pages) {
			let a = `urd-draft-${i.id}`, o = xe.has(i.id) || !V(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === V(g) && (D.hasDraft() || o)) s = D.data;
			else if (i.id !== V(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Ma(JSON.parse(e), ve.data);
				} catch {}
			}
			if (!s && o && (s = Mr(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...pd(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (ve.hasDraft()) {
			let r = JSON.parse(JSON.stringify(V(k)));
			e.push(...md(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: go(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(V(h).theme, V(k).theme) || t.push("tema"), i(V(h).nav, V(k).nav) || t.push("menyen"), i(V(h).footer, V(k).footer) || t.push("footeren"), i(V(h).pages, V(k).pages) || t.push("sideregisteret"), i(V(h).grid, V(k).grid) || t.push("gridet"), (V(h).site.icon ?? null) !== (V(k).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = V(h).site, { icon: s, ...c } = V(k).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Fi).filter(([, e]) => e.hasDraft());
		if (i.length || Pi?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) ld(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (Pi?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(Pi.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!V(Ri).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries(qi).filter(([, e]) => e.hasDraft());
		if (a.length || Gi?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && fd(i.section, e);
				for (let t of i.blocks ?? []) dd(t, e);
				for (let t of i.page?.sections ?? []) fd(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if (Gi?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify(Gi.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!V(na).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		Ea?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(Ea.data, null, 2) + "\n",
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
		let c = await fr(e);
		if (!c.ok) {
			x(Q("status.publishAborted"), "error");
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
			e ? ur = e : dr(), pd(D.data), md(V(k));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) xe.add(e);
			if (I(h, JSON.parse(JSON.stringify(V(k))), !0), ve = Ai("urd-draft-site", () => V(h), S), ye(), Ea) {
				let e = JSON.parse(JSON.stringify(Ea.data));
				Ea = Ai("urd-draft-plugins", () => e, S), qa();
			}
			if (Pi) {
				for (let e of Object.values(Fi)) for (let t of e.data.entries) ld(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(Pi.data));
				Pi = Ai("urd-draft-samlinger", () => e, S), Ii = {};
				for (let e of V(Ri)) {
					if (!Fi[e]) continue;
					let t = JSON.parse(JSON.stringify(Fi[e].data));
					Ii[e] = t, Fi[e] = Ai(`urd-draft-samling-${e}`, () => t, S);
				}
				fa();
			}
			if (Gi) {
				for (let e of Object.values(qi)) {
					e.data?.section && fd(e.data.section, []);
					for (let t of e.data?.blocks ?? []) dd(t, []);
					for (let t of e.data?.page?.sections ?? []) fd(t, []);
				}
				let e = JSON.parse(JSON.stringify(Gi.data));
				Gi = Ai("urd-draft-maler", () => e, S), Ji = {};
				for (let e of V(na)) {
					if (!qi[e]) continue;
					let t = JSON.parse(JSON.stringify(qi[e].data));
					Ji[e] = t, qi[e] = Ai(`urd-draft-mal-${e}`, () => t, S);
				}
				ia();
			}
			I(ee, {
				snap: !0,
				...V(k).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(D.data));
			D = Ai(`urd-draft-${V(g)}`, () => t, S), xe.has(V(g)) && C(`urd-draft-${V(g)}`, JSON.stringify(t)), A(), x(Q("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? Q("status.loginExpired") : Q("status.loginRequired", { reason: Ti(e) ?? Q("status.unknownReason") }), "error"), await lr();
		} else u?.status === 403 ? x(Ti(await u.json().catch(() => null)) ?? Q("status.noPublishAccess"), "error") : u?.status === 409 ? x(Q("status.publishRace"), "error") : x(u ? Ti(await u.json().catch(() => null)) ?? Q("status.publishFailed") : Q("status.publishUnavailable"), "error");
	}
	Le();
	var yd = lu();
	Sr("keydown", nn, Ie), Sr("pointerdown", nn, Fe);
	var bd = R(yd), xd = L(bd), Sd = (e) => {
		var t = wc(), n = L(t);
		J(n, () => c.pencil);
		var r = z(n);
		j(t), B((e, n) => {
			Z(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Q("tip.backToEdit"), () => Q("ui.edit")]), H("click", t, ku), W(e, t);
	};
	K(xd, (e) => {
		V(E) || e(Sd);
	});
	var Cd = z(xd, 2);
	let wd;
	var Td = L(Cd), Ed = z(L(Td), 2), Dd = (e) => {
		var t = Tc(), n = R(t), r = L(n, !0);
		j(n);
		var i = z(n, 2), a = L(i);
		let o;
		J(a, () => c.desktop, !0), j(a);
		var s = z(a, 2);
		let l;
		J(s, () => c.phone, !0), j(s), j(i);
		var u = z(i, 2), d = L(u);
		let f;
		J(d, () => c.fit, !0), j(d);
		var p = z(d, 2);
		J(p, () => c.minus, !0), j(p);
		var m = z(p, 2), h = L(m);
		j(m);
		var g = z(m, 2);
		J(g, () => c.plus, !0), j(g), j(u);
		var _ = z(u, 2);
		let v;
		J(_, () => c.guides, !0), j(_), B((e, t, i, c, u, y, b, x, S, C) => {
			Z(n, "title", e), G(r, t), o = Zr(a, 1, "ghost svelte-1n46o8q", null, o, { active: V(te) === "desktop" }), Z(a, "title", i), l = Zr(s, 1, "ghost svelte-1n46o8q", null, l, { active: V(te) === "mobile" }), Z(s, "title", c), f = Zr(d, 1, "ghost svelte-1n46o8q", null, f, { active: V(oe) === "fit" }), Z(d, "title", u), Z(p, "title", y), Z(m, "title", b), G(h, `${x ?? ""}%`), Z(g, "title", S), v = Zr(_, 1, "ghost guides-btn svelte-1n46o8q", null, v, { active: V(Ir) }), Z(_, "title", C);
		}, [
			() => Q("tip.switchPage"),
			() => Se()?.title ?? "",
			() => Q("tip.desktopView"),
			() => Q("tip.mobileView"),
			() => Q("tip.zoomFit"),
			() => Q("tip.zoomOut"),
			() => Q("tip.zoomCurrent"),
			() => Math.round(V(le) * 100),
			() => Q("tip.zoomIn"),
			() => Q("tip.guides")
		]), H("click", n, () => ut("pages")), H("click", a, () => I(te, "desktop")), H("click", s, () => I(te, "mobile")), H("click", d, () => I(oe, "fit")), H("click", p, () => ue(-1)), H("click", g, () => ue(1)), H("click", _, Ur), W(e, t);
	};
	K(Ed, (e) => {
		V(h) && e(Dd);
	});
	var Od = z(Ed, 2), kd = (e) => {
		var t = Ec(), n = L(t);
		J(n, () => c.phone);
		var r = z(n);
		j(t), B((e, n) => {
			Z(t, "title", e), G(r, ` ${n ?? ""}`);
		}, [() => Q("tip.attention"), () => Q(V(me) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: V(me) })]), H("click", t, () => I(te, "mobile")), W(e, t);
	};
	K(Od, (e) => {
		V(me) > 0 && e(kd);
	});
	var Ad = z(Od, 2), jd = (e) => {
		var t = Dc(), n = R(t), r = L(n, !0);
		j(n);
		var i = z(n, 2);
		let a;
		var o = L(i, !0);
		j(i), B((e, t, n) => {
			G(r, e), a = Zr(i, 1, "ghost discard-btn svelte-1n46o8q", null, a, { armed: V(hd) }), Z(i, "title", t), G(o, n);
		}, [
			() => Q("ui.unpublished"),
			() => V(hd) ? Q("tip.discardArmed") : Q("tip.discard"),
			() => V(hd) ? Q("ui.discardConfirm") : Q("ui.discard")
		]), H("click", i, gd), W(e, t);
	};
	K(Ad, (e) => {
		V(_) && e(jd);
	}), j(Td);
	var Md = z(Td, 2), Nd = L(Md), Pd = (e) => {
		var t = jc(), n = R(t), r = L(n), i = (e) => {
			var t = Oc(), n = R(t);
			J(n, () => c.eye);
			var r = z(n);
			B((e) => G(r, ` ${e ?? ""}`), [() => Q("ui.cleanView")]), W(e, t);
		}, a = (e) => {
			var t = Oc(), n = R(t);
			J(n, () => c.pencil);
			var r = z(n);
			B((e) => G(r, ` ${e ?? ""}`), [() => Q("ui.edit")]), W(e, t);
		};
		K(r, (e) => {
			V(E) ? e(i) : e(a, -1);
		}), j(n);
		var o = z(n, 2), s = (e) => {
			var t = kc(), n = L(t), r = (e) => {
				var t = jr();
				J(R(t), () => c.warn), W(e, t);
			};
			K(n, (e) => {
				V(T).allowed || e(r);
			});
			var i = z(n, 1, !0);
			j(t), B((e) => {
				Z(t, "title", e), G(i, V(T).login);
			}, [() => V(T).allowed ? Q("tip.hasPublishAccess") : Q("tip.noPublishAccess")]), W(e, t);
		}, l = (e) => {
			var t = Ac(), n = L(t, !0);
			j(t), B((e) => G(n, e), [() => Q("ui.loginGitHub")]), W(e, t);
		};
		K(o, (e) => {
			V(T)?.loggedIn ? e(s) : V(T) && e(l, 1);
		});
		var u = z(o, 2), d = L(u, !0);
		j(u);
		var f = z(u, 2), p = L(f, !0);
		j(f), B((e, t, r, i) => {
			Z(n, "title", e), Z(u, "href", t), G(d, r), f.disabled = !V(_), G(p, i);
		}, [
			() => V(E) ? Q("tip.chromeHide") : Q("tip.chromeShow"),
			() => Se()?.path ?? "/",
			() => Q("ui.viewSite"),
			() => Q("ui.publish")
		]), H("click", n, ku), H("click", f, vd), W(e, t);
	};
	K(Nd, (e) => {
		V(h) && e(Pd);
	}), j(Md), j(Cd);
	var Fd = z(Cd, 2), Id = (e) => {
		var t = nu(), i = L(t), o = (e) => {
			var t = tu(), i = R(t), o = L(i);
			Vr(o, 17, () => Qe, Lr, (e, t, n) => {
				var r = Pc(), i = R(r), a = (e) => {
					W(e, Mc());
				};
				K(i, (e) => {
					n > 0 && e(a);
				}), Vr(z(i, 2), 16, () => V(t), (e) => e, (e, t) => {
					var n = Nc();
					let r;
					var i = L(n, !0);
					j(n), B(() => {
						r = Zr(n, 1, "svelte-1n46o8q", null, r, { active: V(Ze) === t }), G(i, $e[t]);
					}), H("click", n, () => ut(t)), W(e, n);
				}), W(e, r);
			});
			var s = z(o, 2), f = L(s);
			let p;
			J(f, () => c.gear, !0), j(f);
			var h = z(f, 2), _ = (e) => {
				var t = Fc(), n = L(t), r = L(n, !0);
				j(n);
				var i = z(n, 2), a = L(i);
				$(z(a), {
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
					let e = /* @__PURE__ */ P(() => [["auto", Q("lang.auto")], ...it()]);
					$(c, {
						get value() {
							return ct;
						},
						get options() {
							return V(e);
						},
						onchange: lt
					});
				}
				j(o);
				var d = z(o, 2), f = L(d), p = z(f);
				{
					let e = /* @__PURE__ */ P(() => [["strip", Q("settings.layoutPickerStrip")], ["menu", Q("settings.layoutPickerMenu")]]);
					$(p, {
						get value() {
							return V(zr);
						},
						get options() {
							return V(e);
						},
						onchange: Br
					});
				}
				j(d), j(t), B((e, t, n, c, l, u, p) => {
					G(r, e), Z(i, "title", t), G(a, `${n ?? ""} `), Z(o, "title", c), G(s, `${l ?? ""} `), Z(d, "title", u), G(f, `${p ?? ""} `);
				}, [
					() => Q("settings.title"),
					() => Q("topbar.adminTheme.title"),
					() => Q("settings.theme"),
					() => Q("topbar.language.title"),
					() => Q("settings.language"),
					() => Q("tip.settings.layoutPicker"),
					() => Q("settings.layoutPicker")
				]), W(e, t);
			};
			K(h, (e) => {
				V(Rr) && e(_);
			}), j(s), fi(s, (e) => I(Hr, e), () => V(Hr)), j(i);
			var v = z(i, 2), y = (e) => {
				var t = eu(), i = L(t), o = L(i, !0);
				j(i);
				var s = z(i, 2), l = (e) => {
					var t = Uc(), n = L(t);
					Vr(n, 17, () => V(k).pages, (e) => e.id, (e, t) => {
						var n = Bc();
						let r;
						var i = L(n);
						Y(i);
						var a = z(i, 2), o = (e) => {
							var t = Ic();
							B((e) => Z(t, "title", e), [() => Q("tip.pages.homeLocked")]), W(e, t);
						}, s = (e) => {
							var n = Lc();
							Y(n), B((e, t) => {
								X(n, e), Z(n, "title", t);
							}, [() => V(t).path.slice(1), () => Q("tip.pages.slug")]), H("change", n, (e) => ri(V(t), e.target.value)), W(e, n);
						};
						K(a, (e) => {
							V(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = z(a, 2), u = L(l);
						J(u, () => c.right, !0), j(u);
						var d = z(u, 2), f = L(d);
						J(f, () => c.kebab, !0), j(f);
						var p = z(f, 2), m = (e) => {
							var n = zc(), r = L(n), i = L(r);
							J(i, () => c.bookmark);
							var a = z(i);
							j(r);
							var o = z(r, 2), s = (e) => {
								var n = Rc(), r = L(n);
								J(r, () => c.cross);
								var i = z(r);
								j(n), B((e, t) => {
									Z(n, "title", e), G(i, ` ${t ?? ""}`);
								}, [() => Q("tip.pages.delete"), () => Q("ui.deletePage")]), H("click", n, () => {
									I(qr, null), ai(V(t));
								}), W(e, n);
							};
							K(o, (e) => {
								V(t).path !== "/" && e(s);
							}), j(n), B((e) => G(a, ` ${e ?? ""}`), [() => Q("ui.savePageTemplate")]), H("click", r, () => Qr(V(t))), W(e, n);
						};
						K(p, (e) => {
							V(qr) === V(t).id && e(m);
						}), j(d), j(l), j(n), B((e, a, o) => {
							r = Zr(n, 1, "page-row svelte-1n46o8q", null, r, { current: V(t).id === V(g) }), X(i, V(t).title), Z(i, "title", e), Z(u, "title", a), u.disabled = V(t).id === V(g), Z(f, "title", o);
						}, [
							() => Q("tip.pages.title"),
							() => Q("tip.pages.open"),
							() => Q("tip.pages.menu")
						]), H("change", i, (e) => ei(V(t), e.target.value)), H("click", u, () => Nr(V(t).id)), H("click", f, () => I(qr, V(qr) === V(t).id ? null : V(t).id, !0)), W(e, n);
					});
					var r = z(n, 4);
					Y(r);
					var i = z(r, 2), a = L(i, !0);
					j(i);
					var o = z(i, 2), s = (e) => {
						var t = Hc(), n = L(t);
						let r;
						var i = L(n), a = L(i);
						J(a, () => co({ sections: [] }), !0), j(a);
						var o = z(a, 2), s = L(o, !0);
						j(o), j(i), j(n), Vr(z(n, 2), 16, () => V(na).filter((e) => qi[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = Vc();
							let r;
							var i = L(n), a = L(i);
							J(a, () => co(qi[t].data.page), !0), j(a);
							var o = z(a, 2), s = L(o, !0);
							j(o), j(i);
							var l = z(i, 2);
							J(l, () => c.cross, !0), j(l), j(n), B((e, a) => {
								r = Zr(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: V(Kr) === t }), Z(i, "title", e), G(s, qi[t].data.mal.name), Z(l, "title", a);
							}, [() => Q("tip.pages.templatePick", { name: qi[t].data.mal.name }), () => Q("canvas.deleteTemplate")]), H("click", i, () => I(Kr, V(Kr) === t ? null : t, !0)), H("click", l, () => sa({ id: t })), W(e, n);
						}), j(t), B((e, t) => {
							r = Zr(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: V(Kr) === null }), Z(i, "title", e), G(s, t);
						}, [() => Q("tip.pages.blankPick"), () => Q("ui.blankPage")]), H("click", i, () => I(Kr, null)), W(e, t);
					}, l = /* @__PURE__ */ P(() => V(na).some((e) => qi[e]?.data?.mal?.kind === "page"));
					K(o, (e) => {
						V(l) && e(s);
					}), j(t), B((e, t, n, o) => {
						Z(r, "placeholder", e), Z(i, "title", t), i.disabled = n, G(a, o);
					}, [
						() => Q("ph.newPageName"),
						() => Q("hint.pages.autoMenu"),
						() => !V(Gr).trim(),
						() => Q("ui.createPage")
					]), H("keydown", r, (e) => e.key === "Enter" && Xr()), ci(r, () => V(Gr), (e) => I(Gr, e)), H("click", i, Xr), W(e, t);
				}, u = (e) => {
					var t = Xc(), r = L(t), i = L(r), a = L(i, !0);
					j(i);
					var o = z(i, 2), s = L(o), l = L(s), u = z(l);
					{
						let e = /* @__PURE__ */ P(() => V(k).nav.logo?.type ?? "text"), t = /* @__PURE__ */ P(() => [
							["text", Q("blocks.text")],
							["image", Q("blocks.image")],
							["both", Q("opt.logo.both")]
						]);
						$(u, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => si(e)
						});
					}
					j(s);
					var d = z(s, 2), f = (e) => {
						var t = Wc(), n = R(t);
						Y(n);
						var r = z(n, 2), i = L(r);
						{
							let e = /* @__PURE__ */ P(() => Q("tip.nav.logoFont")), t = /* @__PURE__ */ P(() => V(k).nav.logo?.font ?? ""), n = /* @__PURE__ */ P(() => [["", Q("common.inherit")], ...ms.map(([e, t]) => [t, Q(e)])]);
							$(i, {
								get title() {
									return V(e);
								},
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => oi({ font: e || void 0 })
							});
						}
						var a = z(i, 2);
						Y(a);
						var o = z(a, 2);
						let s;
						var c = L(o), l = L(c, !0);
						j(c), j(o);
						var u = z(o, 2);
						let d;
						var f = L(u), p = L(f, !0);
						j(f), j(u), j(r), B((e, t, r, i, c, f, m) => {
							X(n, V(k).nav.logo?.value ?? ""), Z(n, "placeholder", e), Z(a, "title", t), X(a, V(k).nav.logo?.textSize ?? ""), s = Zr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: V(k).nav.logo?.bold !== !1 }), Z(o, "title", r), G(l, i), d = Zr(u, 1, "tbtn svelte-1n46o8q", null, d, c), Z(u, "title", f), G(p, m);
						}, [
							() => Q("ph.nav.logoName"),
							() => Q("tip.nav.textSize"),
							() => Q("format.bold"),
							() => Q("format.boldLetter"),
							() => ({ active: !!V(k).nav.logo?.italic }),
							() => Q("format.italic"),
							() => Q("format.italicLetter")
						]), H("input", n, (e) => oi({ value: e.target.value })), H("change", a, (e) => oi({ textSize: e.target.value ? Number(e.target.value) : void 0 })), H("click", o, () => oi({ bold: V(k).nav.logo?.bold === !1 })), H("click", u, () => oi({ italic: !V(k).nav.logo?.italic })), W(e, t);
					};
					K(d, (e) => {
						(V(k).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = z(d, 2), m = (e) => {
						var t = Gc(), n = L(t), r = L(n), i = z(r);
						j(n);
						var a = z(n, 2);
						Y(a);
						var o = z(a, 2);
						Y(o), j(t), B((e, t, i, s) => {
							Z(n, "title", e), G(r, `${t ?? ""} `), Z(a, "title", i), X(a, V(k).nav.logo?.size ?? 32), Z(o, "title", s), X(o, V(k).nav.logo?.radius ?? 0);
						}, [
							() => Q("tip.webpAuto"),
							() => (V(k).nav.logo?.type === "image" ? V(k).nav.logo?.value : V(k).nav.logo?.image) ? Q("ui.changeImage") : Q("ui.chooseImage"),
							() => Q("tip.nav.logoHeight"),
							() => Q("tip.nav.logoRadius")
						]), H("change", i, li), H("change", a, (e) => oi({ size: Number(e.target.value) })), H("change", o, (e) => oi({ radius: Number(e.target.value) })), W(e, t);
					};
					K(p, (e) => {
						(V(k).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = z(p, 2), g = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(k).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ P(() => [["image-first", Q("opt.logo.imageFirst")], ["text-first", Q("opt.logo.textFirst")]]);
							$(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => oi({ order: e })
							});
						}
						j(t), B((e) => G(n, `${e ?? ""} `), [() => Q("lbl.order")]), W(e, t);
					};
					K(h, (e) => {
						V(k).nav.logo?.type === "both" && e(g);
					}), j(o), j(r);
					var _ = z(r, 2), v = L(_), y = L(v, !0);
					j(v);
					var b = z(v, 2), x = L(b), S = L(x), C = z(S);
					{
						let e = /* @__PURE__ */ P(() => V(k).nav.variant ?? "bar"), t = /* @__PURE__ */ P(() => [
							["bar", Q("opt.navVariant.bar")],
							["floating", Q("opt.navVariant.floating")],
							["floating-square", Q("opt.navVariant.floatingSquare")],
							["floating-tab", Q("opt.navVariant.floatingTab")],
							["side-left", Q("opt.navVariant.sideLeft")],
							["side-right", Q("opt.navVariant.sideRight")]
						]);
						$(C, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => ki(e)
						});
					}
					j(x);
					var w = z(x, 2), T = (e) => {
						var t = Kc(), n = R(t), r = L(n);
						Y(r);
						var i = z(r);
						j(n);
						var a = z(n, 2), o = L(a);
						Y(o);
						var s = z(o);
						j(a), B((e, t, c, l) => {
							Z(n, "title", e), ii(r, V(k).nav.style?.glow === !0), G(i, ` ${t ?? ""}`), Z(a, "title", c), ii(o, V(k).nav.style?.topGap !== !1), G(s, ` ${l ?? ""}`);
						}, [
							() => Q("tip.nav.glow"),
							() => Q("lbl.navGlow"),
							() => Q("tip.nav.topGap"),
							() => Q("lbl.navTopGap")
						]), H("change", r, (e) => ji(e.target.checked)), H("change", o, (e) => Mi(e.target.checked)), W(e, t);
					};
					K(w, (e) => {
						V(wi) && e(T);
					});
					var ee = z(w, 2), E = (e) => {
						var t = Gs(), n = L(t);
						Y(n);
						var r = z(n);
						j(t), B((e, i) => {
							Z(t, "title", e), ii(n, V(k).nav.overlay === !0), G(r, ` ${i ?? ""}`);
						}, [() => Q("tip.nav.overlay"), () => Q("lbl.navOverlay")]), H("change", n, (e) => q("nav", () => {
							e.target.checked ? V(k).nav.overlay = !0 : delete V(k).nav.overlay;
						})), W(e, t);
					};
					K(ee, (e) => {
						!V(wi) && !V(Ci) && e(E);
					});
					var te = z(ee, 2), ne = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(k).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ P(() => [
								["left", Q("common.left")],
								["center", Q("common.center")],
								["right", Q("common.right")]
							]);
							$(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => Si("sideAlign", e === "left" ? void 0 : e)
							});
						}
						j(t), B((e, r) => {
							Z(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Q("tip.nav.sideAlign"), () => Q("lbl.textAlign")]), W(e, t);
					};
					K(te, (e) => {
						V(Ci) && e(ne);
					});
					var re = z(te, 2), ie = L(re);
					Y(ie);
					var ae = z(ie);
					j(re);
					var oe = z(re, 2), se = L(oe), ce = z(se);
					{
						let e = /* @__PURE__ */ P(() => V(k).nav.style?.size ?? "md"), t = /* @__PURE__ */ P(() => [
							["sm", Q("opt.size.sm")],
							["md", Q("opt.size.md")],
							["lg", Q("opt.size.lg")],
							["xl", Q("opt.size.xl")]
						]);
						$(ce, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Si("size", e === "md" ? void 0 : e)
						});
					}
					j(oe);
					var le = z(oe, 2), ue = L(le), de = z(ue), fe = (e) => {
						{
							let t = /* @__PURE__ */ P(() => V(k).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ P(() => [
								["top", Q("opt.place.top")],
								["middle", Q("opt.place.middle")],
								["bottom", Q("opt.place.bottom")]
							]);
							$(e, {
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Si("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, pe = (e) => {
						{
							let t = /* @__PURE__ */ P(() => V(k).nav.layout ?? "right"), n = /* @__PURE__ */ P(() => [
								["right", Q("common.right")],
								["center", Q("common.center")],
								["left", Q("opt.layout.leftAfterLogo")]
							]);
							$(e, {
								get value() {
									return V(t);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => xi(e)
							});
						}
					};
					K(de, (e) => {
						V(Ci) ? e(fe) : e(pe, -1);
					}), j(le);
					var me = z(le, 2), he = (e) => {
						var t = qc(), n = R(t), r = L(n);
						Y(r);
						var i = z(r);
						j(n);
						var a = z(n, 2), o = (e) => {
							var t = Ns(), n = L(t), r = z(n);
							{
								let e = /* @__PURE__ */ P(() => V(k).nav.scroll ?? "none"), t = /* @__PURE__ */ P(() => [
									["none", Q("opt.scroll.none")],
									["shrink", Q("opt.scroll.shrink")],
									["hide", Q("opt.scroll.hide")]
								]);
								$(r, {
									get value() {
										return V(e);
									},
									get options() {
										return V(t);
									},
									onchange: (e) => q("nav", () => {
										e === "none" ? delete V(k).nav.scroll : V(k).nav.scroll = e;
									})
								});
							}
							j(t), B((e, r) => {
								Z(t, "title", e), G(n, `${r ?? ""} `);
							}, [() => Q("tip.nav.scroll"), () => Q("lbl.navScroll")]), W(e, t);
						};
						K(a, (e) => {
							V(k).nav.sticky !== !1 && e(o);
						}), B((e, t) => {
							Z(n, "title", e), ii(r, V(k).nav.sticky !== !1), G(i, ` ${t ?? ""}`);
						}, [() => Q("tip.nav.sticky"), () => Q("lbl.navSticky")]), H("change", r, (e) => q("nav", () => {
							V(k).nav.sticky = e.target.checked;
						})), W(e, t);
					};
					K(me, (e) => {
						V(Ci) || e(he);
					});
					var ge = z(me, 2), _e = L(ge), D = z(_e);
					{
						let e = /* @__PURE__ */ P(() => V(k).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ P(() => [
							["standard", Q("opt.hover.standard")],
							["underline", Q("opt.hover.underline")],
							["pill", Q("opt.hover.pill")],
							["lift-plain", Q("opt.hover.liftPlain")],
							["lift", Q("opt.hover.lift")]
						]);
						$(D, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Ni(e)
						});
					}
					j(ge);
					var ve = z(ge, 2), O = (e) => {
						var t = Jc(), n = R(t), r = L(n), i = z(r), a = L(i);
						j(i), j(n);
						var o = z(n, 2);
						Y(o), B((e, t, i) => {
							Z(n, "title", e), G(r, `${t ?? ""} `), G(a, `${i ?? ""}%`), X(o, V(k).nav.style?.hoverGlow ?? .6);
						}, [
							() => Q("tip.nav.hoverGlow"),
							() => Q("lbl.glowStrength"),
							() => Math.round((V(k).nav.style?.hoverGlow ?? .6) * 100)
						]), H("input", o, (e) => Si("hoverGlow", Number(e.target.value))), W(e, t);
					};
					K(ve, (e) => {
						V(k).nav.style?.hover === "lift" && e(O);
					});
					var ye = z(ve, 2), be = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(k).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ P(zn);
							Hi(r, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(Oi)[1];
								},
								onchange: (e) => Si("hoverColor", e)
							});
						}
						j(t), B(() => {
							Z(t, "title", V(Oi)[1]), G(n, `${V(Oi)[0] ?? ""} `);
						}), W(e, t);
					};
					K(ye, (e) => {
						V(Oi) && e(be);
					});
					var xe = z(ye, 2), Se = L(xe), A = z(Se);
					{
						let e = /* @__PURE__ */ P(() => V(k).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ P(zn), n = /* @__PURE__ */ P(() => Q("tip.nav.hoverTextColorPick"));
						Hi(A, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => Si("hoverTextColor", e)
						});
					}
					j(xe);
					var Ce = z(xe, 2), we = L(Ce), Te = z(we);
					{
						let e = /* @__PURE__ */ P(() => V(k).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ P(zn), n = /* @__PURE__ */ P(() => Q("tip.nav.textColorPick"));
						Hi(Te, {
							get value() {
								return V(e);
							},
							get tokens() {
								return V(t);
							},
							get label() {
								return V(n);
							},
							onchange: (e) => Si("textColor", e)
						});
					}
					j(Ce);
					var Ee = z(Ce, 4), De = L(Ee, !0);
					j(Ee);
					var Oe = z(Ee, 2);
					n(Oe, () => Ln, () => V(k).nav?.style?.background?.layers ?? []), j(b), j(_);
					var ke = z(_, 2), Ae = L(ke), je = L(Ae, !0);
					j(Ae);
					var Me = z(Ae, 2), Ne = L(Me), Pe = L(Ne), Fe = z(Pe);
					{
						let e = /* @__PURE__ */ P(() => V(k).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ P(() => V(Ci) ? [
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
						$(Fe, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Si("subStyle", e === "card" ? void 0 : e)
						});
					}
					j(Ne);
					var Ie = z(Ne, 2), Le = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(k).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ P(zn), n = /* @__PURE__ */ P(() => Q("tip.nav.subPillColorPick"));
							Hi(r, {
								get value() {
									return V(e);
								},
								get tokens() {
									return V(t);
								},
								get label() {
									return V(n);
								},
								onchange: (e) => Si("subPillColor", e)
							});
						}
						j(t), B((e, r) => {
							Z(t, "title", e), G(n, `${r ?? ""} `);
						}, [() => Q("tip.nav.subPillColor"), () => Q("lbl.subPillColor")]), W(e, t);
					};
					K(Ie, (e) => {
						V(k).nav.style?.subStyle === "pills" && e(Le);
					});
					var Re = z(Ie, 2), ze = L(Re), Be = z(ze);
					Y(Be), j(Re), j(Me), j(ke);
					var Ve = z(ke, 2), He = L(Ve), Ue = L(He, !0);
					j(He);
					var We = z(He, 2), Ge = L(We);
					Vr(Ge, 17, () => V(k).nav.items, Lr, (e, t, n) => {
						var r = Yc(), i = R(r), a = L(i);
						Y(a);
						var o = z(a, 2), s = L(o);
						J(s, () => c.plus, !0), j(s);
						var l = z(s, 2);
						l.disabled = n === 0, J(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						J(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						J(d, () => c.cross, !0), j(d), j(o);
						var f = z(o, 2), p = L(f);
						{
							let e = /* @__PURE__ */ P(() => V(t).page ?? (V(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ P(() => Q("tip.linkTarget")), i = /* @__PURE__ */ P(() => [
								...V(k).pages.map((e) => [e.id, e.title]),
								["__href", Q("opt.linkHref")],
								...V(t).children ? [["__none", Q("opt.noLink")]] : []
							]);
							$(p, {
								get value() {
									return V(e);
								},
								get title() {
									return V(r);
								},
								get options() {
									return V(i);
								},
								onchange: (e) => ts(n, e)
							});
						}
						j(f);
						var m = z(f, 2), h = (e) => {
							var r = js();
							Y(r), B((e, n) => {
								X(r, V(t).href), Z(r, "placeholder", e), Z(r, "title", n);
							}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", r, (e) => ns(n, e.target.value)), W(e, r);
						};
						K(m, (e) => {
							!V(t).page && V(t).href != null && e(h);
						}), j(i), Vr(z(i, 2), 17, () => V(t).children ?? [], Lr, (e, r, i) => {
							var a = Ms(), o = L(a);
							Y(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, J(l, () => c.up, !0), j(l);
							var u = z(l, 2);
							J(u, () => c.down, !0), j(u);
							var d = z(u, 2);
							J(d, () => c.cross, !0), j(d), j(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ P(() => V(r).page ?? "__href"), t = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								$(p, {
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(a);
									},
									onchange: (e) => ds(n, i, e)
								});
							}
							j(f);
							var m = z(f, 2), h = (e) => {
								var t = js();
								Y(t), B((e, n) => {
									X(t, V(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", t, (e) => fs(n, i, e.target.value)), W(e, t);
							};
							K(m, (e) => {
								V(r).page || e(h);
							}), j(a), B((e, n) => {
								X(o, V(r).label), Z(o, "title", e), u.disabled = i === V(t).children.length - 1, Z(d, "title", n);
							}, [() => Q("tip.nav.childLabel"), () => Q("tip.nav.removeChild")]), H("input", o, (e) => cs(n, i, e.target.value)), H("click", l, () => uu(n, i, -1)), H("click", u, () => uu(n, i, 1)), H("click", d, () => du(n, i)), W(e, a);
						}), B((e, r, i) => {
							X(a, V(t).label), Z(a, "title", e), Z(s, "title", r), u.disabled = n === V(k).nav.items.length - 1, Z(d, "title", i);
						}, [
							() => Q("tip.nav.itemLabel"),
							() => Q("tip.nav.addChild"),
							() => Q("tip.nav.removeItem")
						]), H("input", a, (e) => es(n, e.target.value)), H("click", s, () => ss(n)), H("click", l, () => rs(n, -1)), H("click", u, () => rs(n, 1)), H("click", d, () => is(n)), W(e, r);
					});
					var Ke = z(Ge, 2), qe = L(Ke, !0);
					j(Ke), j(We), j(Ve), j(t), B((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, w, T, ee, E) => {
						Z(i, "title", e), G(a, t), G(l, `${n ?? ""} `), G(y, r), Z(x, "title", o), G(S, `${s ?? ""} `), Z(re, "title", c), ii(ie, V(k).nav.style?.blur !== !1), G(ae, ` ${u ?? ""}`), G(se, `${d ?? ""} `), G(ue, `${f ?? ""} `), G(_e, `${p ?? ""} `), Z(xe, "title", m), G(Se, `${h ?? ""} `), G(we, `${g ?? ""} `), G(De, _), G(je, v), G(Pe, `${b ?? ""} `), Z(Re, "title", C), G(ze, `${w ?? ""} `), X(Be, V(k).nav.style?.subColumns ?? 1), Z(He, "title", T), G(Ue, ee), G(qe, E);
					}, [
						() => Q("hint.nav.logoHome"),
						() => Q("group.logo"),
						() => Q("common.type"),
						() => Q("group.appearance"),
						() => Q("tip.nav.variant"),
						() => Q("lbl.navVariant"),
						() => Q("tip.nav.blur"),
						() => Q("lbl.navBlur"),
						() => Q("lbl.size"),
						() => Q("lbl.navPlacement"),
						() => Q("lbl.navHover"),
						() => Q("tip.nav.hoverTextColor"),
						() => Q("lbl.hoverTextColor"),
						() => Q("lbl.textColor"),
						() => Q("lbl.background"),
						() => Q("group.submenu"),
						() => Q("lbl.design"),
						() => Q("tip.nav.subColumns"),
						() => Q("lbl.columns"),
						() => Q("hint.nav.submenu"),
						() => Q("group.menuItems"),
						() => Q("ui.addMenuItem")
					]), H("change", ie, (e) => Si("blur", e.target.checked)), H("change", Be, (e) => Si("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), H("click", Ke, os), W(e, t);
				}, f = (e) => {
					var t = $c(), n = L(t), r = L(n), i = z(r);
					Y(i), j(n);
					var a = z(n, 2), o = L(a), s = z(o);
					Y(s), j(a);
					var l = z(a, 2), u = L(l), d = z(u);
					{
						let e = /* @__PURE__ */ P(_i), t = /* @__PURE__ */ P(vi);
						$(d, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => yi(e)
						});
					}
					j(l);
					var f = z(l, 4), p = L(f), m = z(p), h = (e) => {
						var t = Zc();
						B((e) => {
							Z(t, "src", V(k).site.icon), Z(t, "alt", e);
						}, [() => Q("lbl.siteIcon")]), W(e, t);
					};
					K(m, (e) => {
						V(k).site.icon && e(h);
					}), j(f);
					var g = z(f, 2), _ = L(g), v = L(_), y = z(v);
					j(_);
					var b = z(_, 2), x = (e) => {
						var t = Qc(), n = R(t);
						J(n, () => c.pencil ?? "✎", !0), j(n);
						var r = z(n, 2);
						J(r, () => c.cross, !0), j(r), B((e, t) => {
							Z(n, "title", e), Z(r, "title", t);
						}, [() => Q("tip.site.editIcon"), () => Q("tip.site.removeIcon")]), H("click", n, () => I(ui, V(k).site.icon, !0)), H("click", r, mi), W(e, t);
					};
					K(b, (e) => {
						V(k).site.icon && e(x);
					}), j(g), j(t), B((e, t, c, d, f, m, h, g, y, b, x) => {
						Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(k).site.title ?? ""), Z(i, "placeholder", c), Z(a, "title", d), G(o, `${f ?? ""} `), X(s, V(k).site.description ?? ""), Z(s, "placeholder", m), Z(l, "title", h), G(u, `${g ?? ""} `), G(p, `${y ?? ""} `), Z(_, "title", b), G(v, `${x ?? ""} `);
					}, [
						() => Q("tip.site.name"),
						() => Q("lbl.name"),
						() => Q("ph.site.name"),
						() => Q("tip.site.description"),
						() => Q("lbl.description"),
						() => Q("ph.site.description"),
						() => Q("site.langTitle"),
						() => Q("site.langLabel"),
						() => Q("lbl.siteIcon"),
						() => Q("tip.site.icon"),
						() => V(k).site.icon ? Q("ui.changeIcon") : Q("ui.chooseIcon")
					]), H("input", i, (e) => hi(e.target.value)), H("input", s, (e) => gi(e.target.value)), H("change", y, di), W(e, t);
				}, p = (e) => {
					var t = sl();
					{
						let e = (e, t = d, n = d) => {
							var r = tl(), i = L(r), a = (e) => {
								var t = el(), r = L(t, !0);
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
								$r(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), G(c, a), G(u, s), G(m, l), G(g, d);
							}, [
								() => wu(t().bg, t()),
								() => wu(t().surface, t()),
								() => wu(t().text, t()),
								() => wu(t().accent, t()),
								() => wu(t()["accent-text"] ?? t().bg, t()),
								() => Q("preview.heading"),
								() => Q("preview.cardBody"),
								() => Q("preview.button"),
								() => Q("preview.link")
							]), W(e, r);
						};
						var n = L(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						Vr(i, 21, () => Eu, (e) => e.id, (e, t) => {
							var n = nl();
							let r;
							var i = L(n), a = L(i), o = z(a), s = z(o), c = z(s);
							j(i);
							var l = z(i, 2), u = L(l, !0);
							j(l), j(n), B(() => {
								r = Zr(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: V(Ou) === V(t).id }), Z(n, "title", `${V(t).name} - ${V(t).note}`), $r(a, `background:${V(t).light.bg ?? ""}`), $r(o, `background:${V(t).light.surface ?? ""}`), $r(s, `background:${V(t).light.accent ?? ""}`), $r(c, `background:${V(t).light.text ?? ""}`), G(u, V(t).name);
							}), H("click", n, () => Du(V(t))), W(e, n);
						}), j(i);
						var a = z(i, 2), o = L(a, !0);
						j(a);
						var s = z(a, 2), c = L(s);
						Y(c);
						var l = z(c);
						j(s);
						var u = z(s, 2), f = (e) => {
							var t = rl(), n = L(t), r = L(n, !0);
							j(n);
							var i = z(n, 2), a = L(i);
							let o;
							var s = L(a, !0);
							j(a);
							var c = z(a, 2);
							let l;
							var u = L(c, !0);
							j(c), j(i), j(t), B((e, t, n, i) => {
								G(r, e), Z(a, "title", t), o = Zr(a, 1, "svelte-1n46o8q", null, o, { on: V(Hn) }), G(s, n), l = Zr(c, 1, "svelte-1n46o8q", null, l, { on: !V(Hn) }), G(u, i);
							}, [
								() => Q("lbl.darkColors"),
								() => Q("hint.theme.autoDark"),
								() => Q("opt.auto"),
								() => Q("opt.custom")
							]), H("click", a, () => bu(!0)), H("click", c, () => bu(!1)), W(e, t);
						};
						K(u, (e) => {
							V(Vn) && e(f);
						});
						var p = z(u, 2), h = L(p), g = (e) => {
							var t = il(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Q("lbl.light")]), W(e, t);
						};
						K(h, (e) => {
							V(Vn) && e(g);
						});
						var _ = z(h, 2);
						let Ae;
						var v = L(_, !0);
						j(_), j(p);
						var y = z(p, 2);
						Vr(y, 21, () => Bn, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ P(() => m(V(t), 3));
							let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
							var o = al(), s = L(o);
							{
								let e = /* @__PURE__ */ P(() => V(k).theme.tokens.color[r()] ?? V(k).theme.tokens.color.bg), t = /* @__PURE__ */ P(zn);
								Hi(s, {
									get value() {
										return V(e);
									},
									get tokens() {
										return V(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => fu(r(), e)
								});
							}
							var c = z(s, 2), l = L(c, !0);
							j(c);
							var u = z(c, 2), d = L(u, !0);
							j(u), j(o), B((e) => {
								G(l, a()), G(d, e);
							}, [() => wu(V(k).theme.tokens.color[r()] ?? V(k).theme.tokens.color.bg, V(Wn))]), W(e, o);
						}), j(y);
						var b = z(y, 2), x = (e) => {
							var t = ol(), n = R(t), r = L(n), i = L(r, !0);
							j(r);
							var a = z(r, 2);
							let o;
							var s = L(a, !0);
							j(a), j(n);
							var c = z(n, 2);
							let l;
							Vr(c, 21, () => Bn, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ P(() => m(V(t), 3));
								let r = () => V(n)[0], i = () => V(n)[1], a = () => V(n)[2];
								var o = al(), s = L(o);
								{
									let e = /* @__PURE__ */ P(() => V(k).theme.alt.tokens.color[r()] ?? V(Gn)[r()] ?? V(k).theme.tokens.color.bg), t = /* @__PURE__ */ P(zn), n = /* @__PURE__ */ P(() => Q("theme.darkColorLabel", { name: i() }));
									Hi(s, {
										get value() {
											return V(e);
										},
										get tokens() {
											return V(t);
										},
										get label() {
											return V(n);
										},
										onchange: (e) => _u(r(), e)
									});
								}
								var c = z(s, 2), l = L(c, !0);
								j(c);
								var u = z(c, 2), d = L(u, !0);
								j(u), j(o), B((e) => {
									G(l, a()), G(d, e);
								}, [() => wu(V(k).theme.alt.tokens.color[r()] ?? V(Gn)[r()], V(Gn))]), W(e, o);
							}), j(c), B((e, t, n) => {
								G(i, e), o = Zr(a, 1, "chip svelte-1n46o8q", null, o, { accent: V(Un) === "dark" }), Z(a, "title", t), G(s, n), l = Zr(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: V(Hn) });
							}, [
								() => Q("lbl.dark"),
								() => Q("tip.theme.darkDefault"),
								() => Q("common.standard")
							]), H("click", a, () => vu("dark")), W(e, t);
						};
						K(b, (e) => {
							V(Vn) && e(x);
						});
						var S = z(b, 2), C = L(S);
						{
							let t = /* @__PURE__ */ P(() => V(Vn) ? Q("lbl.light") : "");
							e(C, () => V(Wn), () => V(t));
						}
						var w = z(C, 2), T = (t) => {
							{
								let n = /* @__PURE__ */ P(() => Q("lbl.dark"));
								e(t, () => V(Gn), () => V(n));
							}
						};
						K(w, (e) => {
							V(Vn) && e(T);
						}), j(S);
						var ee = z(S, 2), E = L(ee), te = L(E, !0);
						j(E);
						var ne = z(E, 2), re = L(ne), ie = L(re), ae = z(ie);
						{
							let e = /* @__PURE__ */ P(() => xu("heading"));
							$(ae, {
								get value() {
									return V(k).theme.tokens.font.heading;
								},
								get options() {
									return V(e);
								},
								onchange: (e) => pu("heading", e)
							});
						}
						j(re);
						var oe = z(re, 2), se = L(oe), ce = z(se);
						{
							let e = /* @__PURE__ */ P(() => xu("body"));
							$(ce, {
								get value() {
									return V(k).theme.tokens.font.body;
								},
								get options() {
									return V(e);
								},
								onchange: (e) => pu("body", e)
							});
						}
						j(oe);
						var le = z(oe, 2), ue = L(le), de = L(ue, !0);
						j(ue);
						var fe = z(ue, 2), pe = L(fe, !0);
						j(fe), j(le), j(ne), j(ee);
						var me = z(ee, 2), he = L(me), ge = L(he, !0);
						j(he);
						var _e = z(he, 2), D = L(_e), ve = L(D), O = L(ve, !0);
						j(ve);
						var ye = z(ve, 2), be = L(ye, !0);
						j(ye), j(D);
						var xe = z(D, 2), Se = L(xe, !0), A = z(Se), Ce = L(A, !0);
						j(A), j(xe);
						var we = z(xe, 2);
						Y(we);
						var Te = z(we, 2), Ee = L(Te, !0), De = z(Ee), Oe = L(De, !0);
						j(De), j(Te);
						var ke = z(Te, 2);
						Y(ke), j(_e), j(me), j(t), B((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							G(r, e), G(o, t), Z(s, "title", n), ii(c, V(Vn)), G(l, ` ${i ?? ""}`), Ae = Zr(_, 1, "chip svelte-1n46o8q", null, Ae, { accent: V(Un) === "light" }), Z(_, "title", a), G(v, u), G(te, d), G(ie, `${f ?? ""} `), G(se, `${p ?? ""} `), $r(ue, `font-family:${V(k).theme.tokens.font.heading ?? ""}`), G(de, m), $r(fe, `font-family:${V(k).theme.tokens.font.body ?? ""}`), G(pe, h), G(ge, g), $r(D, `--r-sm:${V(k).theme.tokens.radius.sm ?? ""};--r-md:${V(k).theme.tokens.radius.md ?? ""}`), G(O, y), G(be, b), G(Se, x), G(Ce, V(k).theme.tokens.radius.sm), X(we, S), G(Ee, C), G(Oe, V(k).theme.tokens.radius.md), X(ke, w);
						}, [
							() => Q("lbl.themePresets"),
							() => Q("lbl.colors"),
							() => Q("tip.theme.dualMode"),
							() => Q("lbl.dualMode"),
							() => Q("tip.theme.defaultScheme"),
							() => Q("common.standard"),
							() => Q("group.typography"),
							() => Q("lbl.headings"),
							() => Q("lbl.bodyText"),
							() => Q("preview.heading"),
							() => Q("preview.bodySample"),
							() => Q("group.shape"),
							() => Q("preview.button"),
							() => Q("preview.card"),
							() => Q("lbl.smallCorners"),
							() => Su(V(k).theme.tokens.radius.sm),
							() => Q("lbl.largeCorners"),
							() => Su(V(k).theme.tokens.radius.md)
						]), H("change", c, (e) => yu(e.target.checked)), H("click", _, () => vu("light")), H("input", we, (e) => Cu("sm", Number(e.target.value))), H("input", ke, (e) => Cu("md", Number(e.target.value)));
					}
					W(e, t);
				}, h = (e) => {
					var t = fl();
					let n;
					var r = L(t);
					Y(r);
					var i = z(r, 2), a = (e) => {
						var t = jr();
						Vr(R(t), 17, () => fo(Qu(), V(Zu), (e) => e.label), (e) => e.label, (e, t) => {
							var n = jr(), r = R(n), i = (e) => {
								var n = cl(), r = L(n), i = z(r);
								j(n), B((e) => {
									Z(n, "title", e), G(r, `${V(t).label ?? ""} `);
								}, [() => Q("tip.webpAuto")]), H("change", i, td), W(e, n);
							}, a = (e) => {
								var n = ll(), r = L(n), i = z(r);
								j(n), B((e) => {
									Z(n, "title", e), G(r, `${V(t).label ?? ""} `);
								}, [() => Q("tip.blocks.galleryImages")]), H("change", i, ad), W(e, n);
							}, o = (e) => {
								var n = Ys(), r = L(n, !0);
								j(n), B(() => G(r, V(t).label)), H("click", n, () => $u(V(t))), W(e, n);
							};
							K(r, (e) => {
								V(t).act === "image" ? e(i) : V(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), W(e, n);
						}, (e) => {
							var t = Is(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Q("canvas.searchEmpty")]), W(e, t);
						}), W(e, t);
					}, o = /* @__PURE__ */ P(() => V(Zu).trim()), s = (e) => {
						var t = dl(), n = R(t), r = L(n), i = L(r, !0);
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
						var _e = z(he, 2), D = L(_e, !0);
						j(_e);
						var ve = z(_e, 2), k = L(ve, !0);
						j(ve);
						var ye = z(ve, 2), be = L(ye, !0);
						j(ye);
						var xe = z(ye, 2), Se = L(xe, !0);
						j(xe), j(me), j(de);
						var A = z(de, 2), Ce = (e) => {
							let t = /* @__PURE__ */ P(() => V(na).filter((e) => qi[e]?.data?.mal?.kind === "blocks"));
							var n = ul(), r = L(n), i = L(r, !0);
							j(r);
							var a = z(r, 2);
							Vr(a, 20, () => V(t), (e) => e, (e, t) => {
								var n = Ys(), r = L(n, !0);
								j(n), B((e) => {
									Z(n, "title", e), G(r, qi[t].data.mal.name);
								}, [() => Q("canvas.insertGroup")]), H("click", n, () => O?.sendInsertTemplate(t)), W(e, n);
							}), j(a), j(n), B((e) => G(i, e), [() => Q("canvas.tabMyTemplates")]), W(e, n);
						}, we = /* @__PURE__ */ P(() => V(na).some((e) => qi[e]?.data?.mal?.kind === "blocks"));
						K(A, (e) => {
							V(we) && e(Ce);
						});
						var Te = z(A, 2), Ee = (e) => {
							var t = ul(), n = L(t), r = L(n, !0);
							j(n);
							var i = z(n, 2);
							Vr(i, 21, () => V(Yu), (e) => e.type, (e, t) => {
								var n = jr(), r = R(n), i = (e) => {
									var n = ul(), r = L(n), i = L(r, !0);
									j(r);
									var a = z(r, 2);
									Vr(a, 21, () => V(t).variants, (e) => e.label, (e, n) => {
										var r = Ys(), i = L(r, !0);
										j(r), B((e) => {
											Z(r, "title", e), G(i, V(n).label);
										}, [() => Q("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", r, () => Xu(V(t), V(n).props)), W(e, r);
									}), j(a), j(n), B(() => G(i, V(t).label)), W(e, n);
								}, a = (e) => {
									var n = Ys(), r = L(n, !0);
									j(n), B((e) => {
										Z(n, "title", e), G(r, V(t).label);
									}, [() => Q("tip.blocks.fromPlugin", { plugin: V(t).plugin })]), H("click", n, () => Xu(V(t))), W(e, n);
								};
								K(r, (e) => {
									V(t).variants?.length ? e(i) : e(a, -1);
								}), W(e, n);
							}), j(i), j(t), B((e) => G(r, e), [() => Q("panel.plugins")]), W(e, t);
						};
						K(Te, (e) => {
							V(Yu).length && e(Ee);
						}), B((e, t, n, r, a, o, u, m, ne, re, ae, ue, de, fe, me, he, _e, ve, O, ye, xe, A, Ce, we, Te, Ee, De, Oe, ke, Ae, je, Me) => {
							G(i, e), G(s, t), Z(c, "title", n), G(l, r), G(d, a), Z(f, "title", o), G(p, `${u ?? ""} `), Z(h, "title", m), G(g, ne), Z(_, "title", re), G(v, ae), Z(y, "title", ue), G(b, de), Z(x, "title", fe), G(S, me), Z(C, "title", he), G(w, _e), Z(T, "title", ve), G(ee, O), Z(E, "title", ye), G(te, xe), G(ie, A), Z(oe, "title", Ce), G(se, we), Z(ce, "title", Te), G(le, `${Ee ?? ""} `), G(pe, De), G(ge, Oe), G(D, ke), G(k, Ae), G(be, je), G(Se, Me);
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
							() => Q("tip.blocks.samling"),
							() => Q("blocks.samling"),
							() => Q("tip.blocks.faq"),
							() => Q("blocks.faq"),
							() => Q("tip.blocks.tidslinje"),
							() => Q("blocks.tidslinje"),
							() => Q("tip.blocks.sitat"),
							() => Q("blocks.sitat"),
							() => Q("tip.blocks.statistikk"),
							() => Q("blocks.statistikk"),
							() => Q("blocks.galleri"),
							() => Q("tip.blocks.gallery"),
							() => Q("ui.emptyGallery"),
							() => Q("tip.blocks.galleryImages"),
							() => Q("ui.galleryWithImages"),
							() => Q("group.shapes"),
							() => Q("shape.line"),
							() => Q("shape.arrow"),
							() => Q("shape.circle"),
							() => Q("shape.rect"),
							() => Q("shape.triangle")
						]), H("click", o, () => Ju("text")), H("click", c, () => Ju("text-box")), H("click", u, () => Ju("button")), H("change", m, td), H("click", h, () => Ju("video")), H("click", _, () => Ju("icon")), H("click", y, () => Ju("samling")), H("click", x, () => Ju("faq")), H("click", C, () => Ju("tidslinje")), H("click", T, () => Ju("sitat")), H("click", E, () => Ju("statistikk")), H("click", oe, () => Ju("galleri")), H("change", ue, ad), H("click", he, () => Ju("shape-line")), H("click", _e, () => Ju("shape-arrow")), H("click", ve, () => Ju("shape-circle")), H("click", ye, () => Ju("shape-rect")), H("click", xe, () => Ju("shape-triangle")), W(e, t);
					};
					K(i, (e) => {
						V(o) ? e(a) : e(s, -1);
					}), j(t), B((e, i, a) => {
						n = Zr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: V(te) === "mobile" }), Z(t, "title", e), Z(r, "placeholder", i), Z(r, "title", a);
					}, [
						() => V(te) === "mobile" ? Q("tip.blocks.mobileLocked") : void 0,
						() => Q("canvas.searchBlocks"),
						() => Q("canvas.searchBlocks")
					]), ci(r, () => V(Zu), (e) => I(Zu, e)), W(e, t);
				}, _ = (e) => {
					var t = pl(), n = L(t), r = L(n), i = z(r), a = L(i);
					j(i), j(n);
					var o = z(n, 2);
					Y(o);
					var s = z(o, 2), c = L(s);
					Y(c);
					var l = z(c);
					j(s), j(t), B((e, t) => {
						G(r, `${e ?? ""} `), G(a, `${V(ee).size ?? ""} px`), X(o, V(ee).size), ii(c, V(ee).snap !== !1), G(l, ` ${t ?? ""}`);
					}, [() => Q("lbl.gridSize"), () => Q("lbl.gridSnap")]), H("input", o, (e) => cr("size", Number(e.target.value))), H("change", c, (e) => cr("snap", e.target.checked)), W(e, t);
				}, v = (e) => {
					var t = bl(), r = L(t), i = (e) => {
						var t = ml(), n = R(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						a(i), B((e) => G(r, e), [() => Q("blocks.suffix", { label: Rt[V(M).type] ?? V(M).type })]), W(e, t);
					}, o = (e) => {
						var t = yl(), r = R(t), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = L(a), s = z(o);
						Y(s), j(a);
						var l = z(a, 4), u = L(l);
						Y(u);
						var d = z(u);
						j(l);
						var f = z(l, 2), p = (e) => {
							var t = hl(), n = R(t), r = L(n), i = z(r), a = L(i);
							j(i), j(n);
							var o = z(n, 2);
							Y(o), B((e) => {
								G(r, `${e ?? ""} `), G(a, `${V(Ht).size ?? ""} px`), X(o, V(Ht).size);
							}, [() => Q("lbl.gridSize")]), H("input", o, (e) => sr("size", Number(e.target.value))), W(e, t);
						};
						K(f, (e) => {
							V(Ht) && e(p);
						});
						var m = z(f, 4), h = L(m), g = z(h);
						{
							let e = /* @__PURE__ */ P(() => [["", Q("common.standard")], ...Object.entries(yo).map(([e, t]) => [e, Q(t)])]);
							$(g, {
								get value() {
									return V(qt);
								},
								get options() {
									return V(e);
								},
								onchange: (e) => Qt(e)
							});
						}
						j(m);
						var _ = z(m, 2), v = L(_), y = z(v), b = L(y), x = L(b);
						j(b);
						var S = z(b, 2);
						J(S, () => c.copy, !0), j(S), j(y), j(_);
						var C = z(_, 4), w = L(C, !0);
						j(C);
						var T = z(C, 2);
						n(T, () => V(In), () => V(Wt));
						var ee = z(T, 4), E = L(ee), te = z(E);
						{
							let e = /* @__PURE__ */ P(() => qn(V(Gt)) ? V(Gt).type : "");
							$(te, {
								get value() {
									return V(e);
								},
								get options() {
									return Jn;
								},
								onchange: (e) => er(e || null)
							});
						}
						j(ee);
						var ne = z(ee, 2), re = (e) => {
							var t = vl(), n = R(t), r = L(n), i = z(r);
							Y(i), j(n);
							var a = z(n, 2), o = (e) => {
								var t = gl(), n = R(t), r = L(n), i = z(r);
								Y(i), j(n);
								var a = z(n, 2), o = L(a), s = z(o);
								{
									let e = /* @__PURE__ */ P(() => V(Gt).props.pattern ?? "sequence"), t = /* @__PURE__ */ P(() => [["sequence", Q("opt.stagger.sequence")], ["columns", Q("opt.stagger.columns")]]);
									$(s, {
										get value() {
											return V(e);
										},
										get options() {
											return V(t);
										},
										onchange: (e) => rr(e)
									});
								}
								j(a), B((e, t, s, c) => {
									Z(n, "title", e), G(r, `${t ?? ""} `), X(i, V(Gt).props.step ?? 90), Z(a, "title", s), G(o, `${c ?? ""} `);
								}, [
									() => Q("tip.props.staggerStep"),
									() => Q("lbl.stepMs"),
									() => Q("tip.props.staggerPattern"),
									() => Q("lbl.pattern")
								]), H("change", i, (e) => nr("step", Number(e.target.value))), W(e, t);
							}, s = (e) => {
								var t = _l(), n = L(t), r = z(n);
								Y(r), j(t), B((e) => {
									G(n, `${e ?? ""} `), X(r, V(Gt).props.delay);
								}, [() => Q("lbl.delayMs")]), H("change", r, (e) => nr("delay", Number(e.target.value))), W(e, t);
							};
							K(a, (e) => {
								V(Gt).type === "stagger" ? e(o) : e(s, -1);
							}), B((e) => {
								G(r, `${e ?? ""} `), X(i, V(Gt).props.duration);
							}, [() => Q("lbl.durationMs")]), H("change", i, (e) => nr("duration", Number(e.target.value))), W(e, t);
						}, ie = /* @__PURE__ */ P(() => qn(V(Gt)));
						K(ne, (e) => {
							V(ie) && e(re);
						});
						var ae = z(ne, 2), oe = L(ae), se = z(oe);
						{
							let e = /* @__PURE__ */ P(() => V(Kt)?.type ?? (V(Gt) && !qn(V(Gt)) ? V(Gt).type : ""));
							$(se, {
								get value() {
									return V(e);
								},
								get options() {
									return Yn;
								},
								onchange: (e) => tr(e || null)
							});
						}
						j(ae), B((e, t, n, r, c, l, f, p, g, y, b, C, T, te, ne) => {
							G(i, e), Z(a, "title", t), G(o, `${n ?? ""} `), X(s, V(Ut)), Z(s, "placeholder", r), ii(u, V(Ht) !== null), G(d, ` ${c ?? ""}`), Z(m, "title", l), G(h, `${f ?? ""} `), Z(_, "title", p), G(v, `${g ?? ""} `), G(x, `#${V(Vt) ?? ""}`), Z(S, "title", y), G(w, b), Z(ee, "title", C), G(E, `${T ?? ""} `), Z(ae, "title", te), G(oe, `${ne ?? ""} `);
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
						]), H("change", s, (e) => ir(e.target.value)), H("change", u, (e) => or(e.target.checked)), H("click", S, () => navigator.clipboard?.writeText(`#${V(Vt)}`)), W(e, t);
					}, s = (e) => {
						var t = Is(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Q("hint.props.empty")]), W(e, t);
					};
					K(r, (e) => {
						V(M) ? e(i) : V(Vt) ? e(o, 1) : e(s, -1);
					}), j(t), W(e, t);
				}, y = (e) => {
					var t = Ol(), i = L(t), a = L(i);
					Y(a);
					var o = z(a);
					j(i);
					var s = z(i, 2), l = (e) => {
						var t = ul(), n = L(t), r = L(n, !0);
						j(n);
						var i = z(n, 2);
						Vr(i, 21, () => V(k).pages ?? [], (e) => e.id, (e, t) => {
							var n = Gs(), r = L(n);
							Y(r);
							var i = z(r);
							j(n), B((e, a) => {
								Z(n, "title", e), ii(r, a), G(i, ` ${(V(t).title || V(t).id) ?? ""}`);
							}, [() => Q("tip.footer.hideOnPage"), () => !(V(k).footer?.hideOn ?? []).includes(V(t).id)]), H("change", r, (e) => Io(V(t).id, e.target.checked)), W(e, n);
						}), j(i), j(t), B((e) => G(r, e), [() => Q("group.showOnPages")]), W(e, t);
					};
					K(s, (e) => {
						V(k).footer?.show && e(l);
					});
					var u = z(s, 2), d = L(u), f = L(d, !0);
					j(d);
					var p = z(d, 2), m = L(p);
					Vr(m, 21, () => _o, (e) => e.id, (e, t) => {
						var n = xl(), r = L(n);
						J(r, () => us(V(t).thumb), !0), j(r);
						var i = z(r, 2), a = L(i, !0);
						j(i), j(n), B((e) => {
							Z(n, "title", e), G(a, V(t).label);
						}, [() => Q("tip.footer.template", { label: V(t).label })]), H("click", n, () => Co(V(t).id)), W(e, n);
					}), j(m), j(p), j(u);
					var h = z(u, 2), g = L(h), _ = L(g, !0);
					j(g);
					var v = z(g, 2), y = L(v), b = L(y), x = z(b);
					Y(x), j(y);
					var S = z(y, 2), C = L(S), w = z(C);
					Y(w), j(S);
					var T = z(S, 2), ee = L(T), E = z(ee);
					{
						let e = /* @__PURE__ */ P(() => V(k).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ P(() => [
							["text", Q("blocks.text")],
							["image", Q("opt.brand.image")],
							["both", Q("opt.brand.both")]
						]);
						$(E, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => lo(e)
						});
					}
					j(T);
					var te = z(T, 2), ne = (e) => {
						var t = Cl(), n = R(t), r = L(n), i = L(r), a = z(i);
						j(r);
						var o = z(r, 2), s = (e) => {
							var t = _s();
							J(t, () => c.cross, !0), j(t), B((e) => Z(t, "title", e), [() => Q("tip.footer.removeLogo")]), H("click", t, po), W(e, t);
						};
						K(o, (e) => {
							V(k).footer?.brand?.logo && e(s);
						}), j(n);
						var l = z(n, 2), u = (e) => {
							var t = Sl(), n = R(t), r = L(n), i = z(r), a = L(i);
							j(i), j(n);
							var o = z(n, 2);
							Y(o), B((e) => {
								G(r, `${e ?? ""} `), G(a, `${V(k).footer?.brand?.logoHeight ?? 40 ?? ""} px`), X(o, V(k).footer?.brand?.logoHeight ?? 40);
							}, [() => Q("lbl.logoHeight")]), H("input", o, (e) => mo(e.target.value)), W(e, t);
						};
						K(l, (e) => {
							V(k).footer?.brand?.logo && e(u);
						}), B((e, t) => {
							Z(r, "title", e), G(i, `${t ?? ""} `);
						}, [() => Q("tip.webpAutoPublish"), () => V(k).footer?.brand?.logo ? Q("ui.changeLogo") : Q("ui.uploadLogo")]), H("change", a, uo), W(e, t);
					};
					K(te, (e) => {
						(V(k).footer?.brand?.mode ?? "text") !== "text" && e(ne);
					}), j(v), j(h);
					var re = z(h, 2), ie = L(re), ae = L(ie, !0);
					j(ie);
					var oe = z(ie, 2), se = L(oe);
					Vr(se, 17, () => V(k).footer?.columns ?? [], Lr, (e, t, n) => {
						var r = wl(), i = R(r), a = L(i);
						Y(a);
						var o = z(a, 2), s = L(o);
						J(s, () => c.plus, !0), j(s);
						var l = z(s, 2);
						l.disabled = n === 0, J(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						J(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						J(d, () => c.cross, !0), j(d), j(o), j(i), Vr(z(i, 2), 17, () => V(t).links ?? [], Lr, (e, r, i) => {
							var a = Ms(), o = L(a);
							Y(o);
							var s = z(o, 2), l = L(s);
							l.disabled = i === 0, J(l, () => c.up, !0), j(l);
							var u = z(l, 2);
							J(u, () => c.down, !0), j(u);
							var d = z(u, 2);
							J(d, () => c.cross, !0), j(d), j(s);
							var f = z(s, 2), p = L(f);
							{
								let e = /* @__PURE__ */ P(() => V(r).page ?? "__href"), t = /* @__PURE__ */ P(() => Q("tip.linkTarget")), a = /* @__PURE__ */ P(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								$(p, {
									get value() {
										return V(e);
									},
									get title() {
										return V(t);
									},
									get options() {
										return V(a);
									},
									onchange: (e) => Ko(n, i, e)
								});
							}
							j(f);
							var m = z(f, 2), h = (e) => {
								var t = js();
								Y(t), B((e, n) => {
									X(t, V(r).href ?? ""), Z(t, "placeholder", e), Z(t, "title", n);
								}, [() => Q("ph.hrefAnchor"), () => Q("tip.hrefAnchor")]), H("change", t, (e) => qo(n, i, e.target.value)), W(e, t);
							};
							K(m, (e) => {
								V(r).page || e(h);
							}), j(a), B((e, n) => {
								X(o, V(r).label), Z(o, "title", e), u.disabled = i === V(t).links.length - 1, Z(d, "title", n);
							}, [() => Q("tip.linkLabel"), () => Q("tip.removeLink")]), H("input", o, (e) => Go(n, i, e.target.value)), H("click", l, () => Wo(n, i, -1)), H("click", u, () => Wo(n, i, 1)), H("click", d, () => Uo(n, i)), W(e, a);
						}), B((e, r, i) => {
							X(a, V(t).title), Z(a, "title", e), Z(s, "title", r), u.disabled = n === V(k).footer.columns.length - 1, Z(d, "title", i);
						}, [
							() => Q("tip.footer.columnTitle"),
							() => Q("tip.footer.addLink"),
							() => Q("tip.footer.removeColumn")
						]), H("input", a, (e) => Vo(n, e.target.value)), H("click", s, () => Ho(n)), H("click", l, () => Bo(n, -1)), H("click", u, () => Bo(n, 1)), H("click", d, () => zo(n)), W(e, r);
					});
					var ce = z(se, 2), le = L(ce, !0);
					j(ce);
					var ue = z(ce, 2), de = L(ue), fe = z(de);
					{
						let e = /* @__PURE__ */ P(() => V(k).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ P(() => [["left", Q("common.left")], ["center", Q("common.center")]]);
						$(fe, {
							get value() {
								return V(e);
							},
							get options() {
								return V(t);
							},
							onchange: (e) => Ao(e)
						});
					}
					j(ue), j(oe), j(re);
					var pe = z(re, 2), me = L(pe), he = L(me, !0);
					j(me);
					var ge = z(me, 2), _e = L(ge);
					Vr(_e, 17, () => V(k).footer?.social ?? [], Lr, (e, t, n) => {
						var r = Tl(), i = L(r), a = L(i);
						J(a, () => ua(V(t).icon) || "", !0), j(a);
						var o = z(a, 2);
						{
							let e = /* @__PURE__ */ P(() => Q("blocks.icon"));
							$(o, {
								get value() {
									return V(t).icon;
								},
								get title() {
									return V(e);
								},
								get options() {
									return $o;
								},
								onchange: (e) => Zo(n, e)
							});
						}
						j(i);
						var s = z(i, 2), l = L(s);
						l.disabled = n === 0, J(l, () => c.up, !0), j(l);
						var u = z(l, 2);
						J(u, () => c.down, !0), j(u);
						var d = z(u, 2);
						J(d, () => c.cross, !0), j(d), j(s);
						var f = z(s, 2);
						Y(f), j(r), B((e, r) => {
							u.disabled = n === V(k).footer.social.length - 1, Z(d, "title", e), X(f, V(t).url), Z(f, "placeholder", r);
						}, [() => Q("tip.removeLink"), () => Q("ph.hrefMailto")]), H("click", l, () => Xo(n, -1)), H("click", u, () => Xo(n, 1)), H("click", d, () => Yo(n)), H("change", f, (e) => Qo(n, e.target.value)), W(e, r);
					});
					var D = z(_e, 2), ve = L(D, !0);
					j(D), j(ge), j(pe);
					var O = z(pe, 2), ye = L(O), be = L(ye, !0);
					j(ye);
					var xe = z(ye, 2), Se = L(xe), A = L(Se);
					Y(A);
					var Ce = z(A);
					j(Se);
					var we = z(Se, 2), Te = (e) => {
						let t = /* @__PURE__ */ P(() => V(k).footer.cta);
						var n = Dl(), r = R(n), i = L(r), a = z(i);
						{
							let e = /* @__PURE__ */ P(() => V(t).kind ?? "button"), n = /* @__PURE__ */ P(() => [["button", Q("opt.cta.button")], ["newsletter", Q("opt.cta.newsletter")]]);
							$(a, {
								get value() {
									return V(e);
								},
								get options() {
									return V(n);
								},
								onchange: (e) => Mo("kind", e)
							});
						}
						j(r);
						var o = z(r, 2), s = L(o);
						Y(s);
						var c = z(s);
						j(o);
						var l = z(o, 2), u = L(l), d = z(u);
						Y(d), j(l);
						var f = z(l, 2), p = L(f), m = z(p);
						Y(m), j(f);
						var h = z(f, 2), g = L(h), _ = z(g);
						Y(_), j(h);
						var v = z(h, 2), y = (e) => {
							var n = El(), r = R(n), i = L(r), a = z(i);
							{
								let e = /* @__PURE__ */ P(() => V(t).page ?? "__href"), n = /* @__PURE__ */ P(() => [...V(k).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHrefMailto")]]);
								$(a, {
									get value() {
										return V(e);
									},
									get options() {
										return V(n);
									},
									onchange: (e) => No(e)
								});
							}
							j(r);
							var o = z(r, 2), s = (e) => {
								var n = Us();
								Y(n), B((e, r) => {
									X(n, V(t).href ?? ""), Z(n, "placeholder", e), Z(n, "title", r);
								}, [() => Q("ph.hrefMailtoAnchor"), () => Q("tip.hrefAnchor")]), H("change", n, (e) => Mo("href", e.target.value)), W(e, n);
							};
							K(o, (e) => {
								V(t).page || e(s);
							}), B((e, t) => {
								Z(r, "title", e), G(i, `${t ?? ""} `);
							}, [() => Q("tip.footer.ctaTarget"), () => Q("lbl.buttonTarget")]), W(e, n);
						}, b = (e) => {
							var n = Vs(), r = R(n), i = L(r), a = z(i);
							Y(a), j(r);
							var o = z(r, 2), s = L(o), c = z(s);
							Y(c), j(o);
							var l = z(o, 2), u = L(l), d = z(u);
							Y(d), j(l), B((e, n, f, p, m, h, g, _, v) => {
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
							]), H("change", a, (e) => Mo("endpoint", e.target.value)), H("change", c, (e) => Mo("recipient", e.target.value)), H("input", d, (e) => Mo("success", e.target.value)), W(e, n);
						};
						K(v, (e) => {
							(V(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), B((e, n, a, v, y, b, x, S, C, w, T, ee) => {
							Z(r, "title", e), G(i, `${n ?? ""} `), Z(o, "title", a), ii(s, V(t).big === !0), G(c, ` ${v ?? ""}`), Z(l, "title", y), G(u, `${b ?? ""} `), X(d, V(t).heading ?? ""), Z(d, "placeholder", x), Z(f, "title", S), G(p, `${C ?? ""} `), X(m, V(t).sub ?? ""), Z(h, "title", w), G(g, `${T ?? ""} `), X(_, V(t).label ?? ""), Z(_, "placeholder", ee);
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
						]), H("change", s, (e) => Mo("big", e.target.checked)), H("input", d, (e) => Mo("heading", e.target.value)), H("input", m, (e) => Mo("sub", e.target.value)), H("input", _, (e) => Mo("label", e.target.value)), W(e, n);
					};
					K(we, (e) => {
						V(k).footer?.cta && e(Te);
					}), j(xe), j(O);
					var Ee = z(O, 2), De = L(Ee), Oe = L(De, !0);
					j(De);
					var ke = z(De, 2), Ae = L(ke);
					r(Ae, () => "linkRow", () => V(k).footer?.linkRow ?? []);
					var je = z(Ae, 2), Me = L(je, !0);
					j(je), j(ke), j(Ee);
					var Pe = z(Ee, 2), Fe = L(Pe), Ie = L(Fe, !0);
					j(Fe);
					var Le = z(Fe, 2), Re = L(Le), ze = (e) => {
						var t = dc(), n = R(t), r = L(n), i = z(r);
						{
							let e = /* @__PURE__ */ P(() => V(k).footer?.align ?? "left"), t = /* @__PURE__ */ P(() => [
								["left", Q("common.left")],
								["center", Q("common.center")],
								["right", Q("common.right")]
							]);
							$(i, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => oo("footer", (t) => {
									t.align = e;
								})
							});
						}
						j(n), Ne(2), B((e, t) => {
							Z(n, "title", e), G(r, `${t ?? ""} `);
						}, [() => Q("tip.footer.align"), () => Q("lbl.align")]), W(e, t);
					};
					K(Re, (e) => {
						V(k).footer?.cta?.big !== !0 && e(ze);
					});
					var Be = z(Re, 2), Ve = L(Be, !0);
					j(Be);
					var He = z(Be, 2);
					n(He, () => Rn, () => V(k).footer?.background?.layers ?? []), j(Le), j(Pe);
					var Ue = z(Pe, 2), We = L(Ue), Ge = L(We, !0);
					j(We);
					var Ke = z(We, 2), qe = L(Ke), Je = L(qe), Ye = z(Je);
					Y(Ye), j(qe);
					var Xe = z(qe, 2), Ze = L(Xe, !0);
					j(Xe);
					var Qe = z(Xe, 2);
					r(Qe, () => "baseline", () => V(k).footer?.baseline ?? []);
					var $e = z(Qe, 2), et = L($e, !0);
					j($e), j(Ke), j(Ue), j(t), B((e, t, n, r, s, c, l, u, d, p, m, h, g, v, E, te, ne, re, ie, oe, se, ce, fe, pe, me, ge, _e, D, O, ye, xe, we) => {
						Z(i, "title", e), ii(a, t), G(o, ` ${n ?? ""}`), G(f, r), G(_, s), Z(y, "title", c), G(b, `${l ?? ""} `), X(x, V(k).footer?.brand?.title ?? ""), Z(x, "placeholder", u), Z(S, "title", d), G(C, `${p ?? ""} `), X(w, V(k).footer?.brand?.tagline ?? ""), Z(T, "title", m), G(ee, `${h ?? ""} `), G(ae, g), G(le, v), Z(ue, "title", E), G(de, `${te ?? ""} `), G(he, ne), G(ve, re), G(be, ie), Z(Se, "title", oe), ii(A, se), G(Ce, ` ${ce ?? ""}`), G(Oe, fe), G(Me, pe), G(Ie, me), G(Ve, ge), G(Ge, _e), Z(qe, "title", D), G(Je, `${O ?? ""} `), X(Ye, V(k).footer?.copyright ?? ""), Z(Ye, "placeholder", ye), G(Ze, xe), G(et, we);
					}, [
						() => Q("tip.footer.show"),
						() => !!V(k).footer?.show,
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
						() => !!V(k).footer?.cta,
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
					]), H("change", a, (e) => oo("footer", (t) => {
						t.show = e.target.checked;
					})), H("input", x, (e) => so("title", e.target.value)), H("input", w, (e) => so("tagline", e.target.value)), H("click", ce, Ro), H("click", D, Jo), H("change", A, (e) => jo(e.target.checked)), H("click", je, () => wo("linkRow")), H("input", Ye, (e) => ho(e.target.value)), H("click", $e, () => wo("baseline")), W(e, t);
				}, b = (e) => {
					var t = Ml(), n = L(t), r = (e) => {
						var t = Ns(), n = L(t), r = z(n);
						{
							let e = /* @__PURE__ */ P(() => V(Bi) ?? ""), t = /* @__PURE__ */ P(() => [["", Q("common.choose")], ...V(Ri).map((e) => [e, V(zi)[e]?.name ?? e])]);
							$(r, {
								get value() {
									return V(e);
								},
								get options() {
									return V(t);
								},
								onchange: (e) => I(Bi, e || null, !0)
							});
						}
						j(t), B((e) => G(n, `${e ?? ""} `), [() => Q("blocks.samling")]), W(e, t);
					};
					K(n, (e) => {
						V(Ri).length && e(r);
					});
					var i = z(n, 2), a = (e) => {
						let t = /* @__PURE__ */ P(() => V(zi)[V(Bi)]);
						var n = jl(), r = R(n), i = L(r), a = L(i, !0);
						j(i);
						var o = z(i, 2);
						J(o, () => c.cross, !0), j(o), j(r);
						var s = z(r, 2);
						Vr(s, 19, () => V(t).entries, (e) => e.id, (e, n, r) => {
							var i = Al(), a = L(i), o = L(a);
							j(a);
							var s = z(a, 2), l = L(s), u = L(l);
							Y(u);
							var d = z(u, 2), f = L(d);
							J(f, () => c.up, !0), j(f);
							var p = z(f, 2);
							J(p, () => c.down, !0), j(p);
							var m = z(p, 2);
							J(m, () => c.cross, !0), j(m), j(d), j(l);
							var h = z(l, 2), g = L(h), _ = z(g);
							Y(_), j(h);
							var v = z(h, 2);
							st(v);
							var y = z(v, 2), b = L(y), x = z(b);
							Y(x), j(y);
							var S = z(y, 2), C = L(S), w = L(C), T = z(w);
							j(C);
							var ee = z(C, 2), E = (e) => {
								var t = kl(), r = R(t), i = z(r, 2);
								J(i, () => c.cross, !0), j(i), B((e) => {
									Z(r, "src", V(n).image), Z(i, "title", e);
								}, [() => Q("tip.removeImage")]), H("click", i, () => ya(V(Bi), V(n).id, "image", "")), W(e, t);
							};
							K(ee, (e) => {
								V(n).image && e(E);
							}), j(S), j(s), j(i), B((e, i, a, s, c, l, d, h) => {
								G(o, `${e ?? ""}${V(n).date ? ` · ${V(n).date}` : ""}`), X(u, V(n).title), Z(u, "title", i), f.disabled = V(r) === 0, p.disabled = V(r) === V(t).entries.length - 1, Z(m, "title", a), G(g, `${s ?? ""} `), X(_, V(n).date ?? ""), Z(v, "placeholder", c), X(v, V(n).text ?? ""), G(b, `${l ?? ""} `), X(x, V(n).href ?? ""), Z(x, "placeholder", d), G(w, `${h ?? ""} `);
							}, [
								() => V(n).title.replace(/<[^>]*>/g, ""),
								() => Q("lbl.title"),
								() => Q("tip.collections.deleteEntry"),
								() => Q("lbl.date"),
								() => Q("ph.collections.text"),
								() => Q("lbl.link"),
								() => Q("ph.collections.href"),
								() => V(n).image ? Q("ui.changeImage") : Q("ui.addImage")
							]), H("change", u, (e) => ya(V(Bi), V(n).id, "title", e.target.value || "Uten tittel")), H("click", f, () => Sa(V(Bi), V(r), -1)), H("click", p, () => Sa(V(Bi), V(r), 1)), H("click", m, () => wa(V(Bi), V(n).id)), H("change", _, (e) => ya(V(Bi), V(n).id, "date", e.target.value)), H("change", v, (e) => ya(V(Bi), V(n).id, "text", e.target.value)), H("change", x, (e) => ya(V(Bi), V(n).id, "href", e.target.value)), H("change", T, (e) => Ta(V(Bi), V(n).id, e)), W(e, i);
						});
						var l = z(s, 2), u = (e) => {
							var t = Is(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Q("hint.collections.empty")]), W(e, t);
						};
						K(l, (e) => {
							V(t).entries.length || e(u);
						}), Ne(2), B((e, t) => {
							G(a, e), Z(o, "title", t);
						}, [() => Q("ui.addEntry"), () => Q("tip.collections.deleteCollection")]), H("click", i, () => va(V(Bi))), H("click", o, () => _a(V(Bi))), W(e, n);
					};
					K(i, (e) => {
						V(Bi) && V(zi)[V(Bi)] && e(a);
					});
					var o = z(i, 2), s = L(o), l = z(s);
					Y(l), j(o);
					var u = z(o, 2), d = L(u);
					$(z(d), {
						get value() {
							return V(Ui);
						},
						get options() {
							return Wi;
						},
						onchange: (e) => I(Ui, e, !0)
					}), j(u);
					var f = z(u, 2), p = L(f, !0);
					j(f), j(t), B((e, t, n, r, i) => {
						G(s, `${e ?? ""} `), Z(l, "placeholder", t), G(d, `${n ?? ""} `), f.disabled = r, G(p, i);
					}, [
						() => Q("lbl.newCollectionName"),
						() => Q("ph.collections.name"),
						() => Q("common.type"),
						() => !V(Vi).trim(),
						() => Q("ui.createCollection")
					]), H("keydown", l, (e) => e.key === "Enter" && ga()), ci(l, () => V(Vi), (e) => I(Vi, e)), H("click", f, ga), W(e, t);
				}, x = (e) => {
					var t = zl(), n = L(t), r = (e) => {
						var t = Is(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Q("hint.plugins.empty")]), W(e, t);
					}, i = /* @__PURE__ */ P(() => !Ka().length);
					K(n, (e) => {
						V(i) && e(r);
					});
					var a = z(n, 2);
					Vr(a, 16, Ka, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ P(() => Na[t]), r = /* @__PURE__ */ P(() => (V(Aa)?.enabled ?? []).includes(t));
						var i = Fl();
						let a;
						var o = L(i), s = L(o), l = L(s, !0);
						j(s);
						var u = z(s, 2), d = (e) => {
							var t = Nl(), r = L(t);
							j(t), B(() => G(r, `v${V(n).version ?? ""}`)), W(e, t);
						};
						K(u, (e) => {
							V(n)?.version && e(d);
						});
						var f = z(u, 2), p = L(f), m = L(p);
						Y(m);
						var h = z(m);
						j(p);
						var g = z(p, 2);
						J(g, () => c.cross, !0), j(g), j(f), j(o);
						var _ = z(o, 2), v = (e) => {
							var t = Pl(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => V(n).errors.join("; ")]), W(e, t);
						}, y = (e) => {
							var t = Pl(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Q("plugin.engineMismatch", {
								required: V(n).requiresEngine,
								current: V(Pa)
							})]), W(e, t);
						}, b = (e) => {
							var t = Pl(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Q("plugin.cspNeeded", { list: Xa(V(n).csp).join(", ") })]), W(e, t);
						}, x = /* @__PURE__ */ P(() => V(n)?.csp && Xa(V(n).csp).length);
						K(_, (e) => {
							V(n)?.errors?.length ? e(v) : V(n) && !V(n).satisfied ? e(y, 1) : V(x) && e(b, 2);
						});
						var S = z(_, 2), C = (e) => {
							var t = Is(), r = L(t, !0);
							j(t), B((e) => G(r, e), [() => Q("plugin.languages", { list: V(n).languages.map((e) => e.name).join(", ") })]), W(e, t);
						};
						K(S, (e) => {
							V(n)?.languages?.length && e(C);
						}), j(i), B((e, t, o, s, c) => {
							a = Zr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": V(n)?.errors?.length }), G(l, e), Z(p, "title", t), ii(m, V(r)), m.disabled = o, G(h, ` ${s ?? ""}`), Z(g, "title", c);
						}, [
							() => V(n)?.names?.[Ei()] ?? V(n)?.name ?? t,
							() => V(r) ? Q("tip.plugins.on") : Q("tip.plugins.off"),
							() => !!V(n)?.errors?.length,
							() => V(r) ? Q("ui.on") : Q("ui.off"),
							() => Q("tip.plugins.remove")
						]), H("change", m, (e) => to(t, e.target.checked)), H("click", g, () => ro(t)), W(e, i);
					});
					var o = z(a, 2), s = (e) => {
						var t = Ll(), n = z(R(t), 2), r = L(n, !0);
						j(n), Vr(z(n, 2), 16, () => V(Ua), (e) => e, (e, t) => {
							var n = Il(), r = L(n), i = L(r), a = L(i, !0);
							j(i);
							var o = z(i, 2), s = (e) => {
								var n = Nl(), r = L(n);
								j(n), B(() => G(r, `v${Na[t].version ?? ""}`)), W(e, n);
							};
							K(o, (e) => {
								Na[t]?.version && e(s);
							});
							var l = z(o, 2), u = L(l);
							J(u, () => c.right, !0), j(u), j(l), j(r), j(n), B((e, t) => {
								G(a, e), Z(u, "title", t);
							}, [() => Na[t]?.names?.[Ei()] ?? Na[t]?.name ?? t, () => Q("tip.plugins.addFound")]), H("click", u, () => ao(t)), W(e, n);
						}), B((e) => G(r, e), [() => Q("hint.plugins.found")]), W(e, t);
					};
					K(o, (e) => {
						V(Ua).length && e(s);
					});
					var l = z(o, 2), u = (e) => {
						var t = jr(), n = R(t), r = (e) => {
							var t = Is(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Q("hint.plugins.autoDiscover")]), W(e, t);
						};
						K(n, (e) => {
							V(Ua).length || e(r);
						}), W(e, t);
					}, d = (e) => {
						var t = Rl(), n = z(R(t), 2);
						Y(n);
						var r = z(n, 2), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = (e) => {
							var t = Pl(), n = L(t, !0);
							j(t), B(() => G(n, V(Ha))), W(e, t);
						};
						K(a, (e) => {
							V(Ha) && e(o);
						}), B((e, t, a) => {
							Z(n, "placeholder", e), r.disabled = t, G(i, a);
						}, [
							() => Q("ph.plugins.folder"),
							() => !V(Ia).trim(),
							() => Q("ui.addPlugin")
						]), H("keydown", n, (e) => e.key === "Enter" && io()), ci(n, () => V(Ia), (e) => I(Ia, e)), H("click", r, io), W(e, t);
					};
					K(l, (e) => {
						V(Ga) === "ok" ? e(u) : e(d, -1);
					}), j(t), W(e, t);
				}, S = (e) => {
					var t = bl(), n = L(t), r = (e) => {
						var t = Is(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Q("hint.history.loading")]), W(e, t);
					}, i = (e) => {
						var t = Pc(), n = R(t), r = (e) => {
							var t = Is(), n = L(t, !0);
							j(t), B(() => G(n, V(mr))), W(e, t);
						};
						K(n, (e) => {
							V(mr) && e(r);
						});
						var i = z(n, 2), a = (e) => {
							var t = Vl(), n = R(t), r = L(n, !0);
							j(n), Vr(z(n, 2), 19, () => V(pr), (e) => e.sha, (e, t, n) => {
								var r = Bl();
								let i;
								var a = L(r), o = L(a, !0);
								j(a);
								var s = z(a, 2), c = L(s);
								j(s), j(r), B((e) => {
									i = Zr(r, 1, "history-row svelte-1n46o8q", null, i, { head: V(n) === 0 }), Z(a, "title", V(t).sha), G(o, V(t).message), G(c, `${V(t).author ?? ""}${e ?? ""}`);
								}, [() => V(t).date ? ` · ${_r.format(new Date(V(t).date))}` : ""]), W(e, r);
							}), B((e, t) => {
								n.disabled = V(hr) || !V(T)?.allowed, Z(n, "title", e), G(r, t);
							}, [() => V(T)?.allowed ? Q("tip.history.revert") : Q("tip.history.needsAccess"), () => Q("ui.revertLast")]), H("click", n, yr), W(e, t);
						};
						K(i, (e) => {
							V(pr).length > 0 && e(a);
						}), W(e, t);
					};
					K(n, (e) => {
						V(pr) === null ? e(r) : e(i, -1);
					}), j(t), W(e, t);
				}, C = (e) => {
					var t = bl(), n = L(t), r = (e) => {
						var t = Is(), n = L(t, !0);
						j(t), B((e) => G(n, e), [() => Q("update.checking")]), W(e, t);
					}, i = (e) => {
						var t = Hl(), n = R(t), r = L(n, !0);
						j(n);
						var i = z(n, 2), a = L(i, !0);
						j(i), B((e) => {
							G(r, V(wr)), G(a, e);
						}, [() => Q("update.retry")]), H("click", i, Dr), W(e, t);
					}, a = (e) => {
						var t = $l(), n = R(t), r = L(n), i = L(r, !0);
						j(r);
						var a = z(r, 2), o = (e) => {
							var t = Ul(), n = R(t);
							J(n, () => c.right, !0), j(n);
							var r = z(n, 2), i = L(r, !0);
							j(r), B(() => G(i, V(Cr).target)), W(e, t);
						};
						K(a, (e) => {
							V(Cr).upToDate || e(o);
						}), j(n);
						var s = z(n, 2), l = (e) => {
							var t = Is(), n = L(t, !0);
							j(t), B((e) => G(n, e), [() => Q("update.upToDate")]), W(e, t);
						}, u = (e) => {
							var t = Ql(), n = R(t), r = L(n, !0);
							j(n);
							var i = z(n, 2), a = (e) => {
								var t = Wl(), n = L(t), r = L(n, !0);
								j(n);
								var i = z(n, 2), a = L(i), o = L(a, !0);
								j(a), j(i), j(t), B((e) => {
									G(r, e), G(o, V(Cr).notes);
								}, [() => Q("update.aboutVersion", { target: V(Cr).target })]), W(e, t);
							};
							K(i, (e) => {
								V(Cr).notes && e(a);
							});
							var o = z(i, 2), s = (e) => {
								var t = Gl(), n = L(t), r = L(n);
								J(r, () => c.warn, !0), j(r);
								var i = z(r);
								j(n);
								var a = z(n, 2), o = L(a), s = L(o, !0);
								j(o), j(a), j(t), B((e, t) => {
									Z(n, "title", e), G(i, ` ${t ?? ""}`), G(s, V(Cr).headers.upstream);
								}, [() => Q("update.headersManual"), () => Q("update.headersTitle")]), W(e, t);
							};
							K(o, (e) => {
								V(Cr).headers?.upstream && e(s);
							});
							var l = z(o, 2);
							Vr(l, 17, () => V(Cr).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = ql(), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = L(a), s = (e) => {
									var t = Kl(), n = L(t, !0);
									j(t), B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
								};
								K(o, (e) => {
									V(t).action === "delete" && e(s);
								});
								var l = z(o, 2);
								J(l, () => c.warn, !0), j(l), j(a), j(n), B((e) => {
									Z(r, "title", V(t).path), G(i, V(t).path), Z(l, "title", e);
								}, [() => Q(`update.conflict.${V(t).conflict}`)]), W(e, n);
							});
							var u = z(l, 2), d = L(u), f = L(d);
							j(d);
							var p = z(d, 2);
							Vr(p, 21, () => V(Cr).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = Jl(), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = (e) => {
									var t = Kl(), n = L(t, !0);
									j(t), B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
								};
								K(a, (e) => {
									V(t).action === "delete" && e(o);
								}), j(n), B(() => {
									Z(r, "title", V(t).path), G(i, V(t).path);
								}), W(e, n);
							}), j(p), j(u);
							var m = z(u, 2), h = (e) => {
								var t = Zl(), n = R(t), r = L(n), i = L(r, !0);
								j(r);
								var a = z(r, 2), o = L(a, !0);
								j(a), j(n), Vr(z(n, 2), 17, () => V(Cr).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = Xl(), r = L(n);
									let i;
									var a = L(r, !0);
									j(r);
									var o = z(r, 2), s = L(o), l = (e) => {
										var t = Kl(), n = L(t, !0);
										j(t), B((e) => G(n, e), [() => Q("update.actionDelete")]), W(e, t);
									};
									K(s, (e) => {
										V(t).action === "delete" && e(l);
									});
									var u = z(s, 2), d = (e) => {
										var n = Yl();
										J(n, () => c.warn, !0), j(n), B((e) => Z(n, "title", e), [() => Q(`update.conflict.${V(t).conflict}`)]), W(e, n);
									};
									K(u, (e) => {
										V(t).conflict && e(d);
									});
									var f = z(u, 2);
									Y(f), j(o), j(n), B((e, n, o, s) => {
										i = Zr(r, 1, "update-path svelte-1n46o8q", null, i, e), Z(r, "title", V(t).path), G(a, V(t).path), ii(f, n), Z(f, "title", o), Z(f, "aria-label", s);
									}, [
										() => ({ skipped: V(Er).has(V(t).path) }),
										() => V(Er).has(V(t).path),
										() => Q("update.keepMine.title"),
										() => Q("update.keepMine")
									]), H("change", f, () => Or(V(t).path)), W(e, n);
								}), B((e, t) => {
									G(i, e), G(o, t);
								}, [() => Q("update.optionalTitle"), () => Q("update.keepMine")]), W(e, t);
							}, g = /* @__PURE__ */ P(() => V(Cr).changes.some((e) => !e.atom));
							K(m, (e) => {
								V(g) && e(h);
							});
							var _ = z(m, 2), v = L(_, !0);
							j(_), B((e, t, n, i, a, o) => {
								G(r, e), Z(d, "title", t), G(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = V(Tr) || !V(T)?.allowed, Z(_, "title", a), G(v, o);
							}, [
								() => Q("update.summary", {
									writes: V(Cr).changes.filter((e) => e.action === "write").length,
									deletes: V(Cr).changes.filter((e) => e.action === "delete").length
								}),
								() => Q("update.atomGroup.title"),
								() => Q("update.atomTitle"),
								() => V(Cr).changes.filter((e) => e.atom).length,
								() => V(T)?.allowed ? Q("update.run.title") : Q("tip.history.needsAccess"),
								() => Q("update.run", { target: V(Cr).target })
							]), H("click", _, kr), W(e, t);
						};
						K(s, (e) => {
							V(Cr).upToDate ? e(l) : e(u, -1);
						}), B((e) => G(i, e), [() => Q("update.current", { version: V(Cr).current })]), W(e, t);
					};
					K(n, (e) => {
						V(Tr) && !V(Cr) ? e(r) : V(wr) ? e(i, 1) : V(Cr) && e(a, 2);
					}), j(t), W(e, t);
				};
				K(s, (e) => {
					V(Ze) === "pages" ? e(l) : V(Ze) === "nav" ? e(u, 1) : V(Ze) === "site" ? e(f, 2) : V(Ze) === "theme" ? e(p, 3) : V(Ze) === "blocks" ? e(h, 4) : V(Ze) === "grid" ? e(_, 5) : V(Ze) === "properties" ? e(v, 6) : V(Ze) === "footer" ? e(y, 7) : V(Ze) === "collections" ? e(b, 8) : V(Ze) === "plugins" ? e(x, 9) : V(Ze) === "history" ? e(S, 10) : V(Ze) === "update" && e(C, 11);
				}), j(t), B((e) => {
					Z(i, "title", e), G(o, $e[V(Ze)]);
				}, [() => et[V(Ze)]?.map((e) => Q(e)).join("\n")]), W(e, t);
			};
			K(v, (e) => {
				V(Ze) && e(y);
			}), B((e) => {
				p = Zr(f, 1, "rail-gear svelte-1n46o8q", null, p, { active: V(Rr) }), Z(f, "title", e);
			}, [() => Q("settings.title")]), H("click", f, () => I(Rr, !V(Rr))), W(e, t);
		};
		K(i, (e) => {
			V(E) && e(o);
		});
		var s = z(i, 2);
		let f;
		var p = L(s), h = L(p);
		fi(h, (e) => I(w, e), () => V(w)), j(p), j(s), fi(s, (e) => I(ne, e), () => V(ne)), j(t), B((e) => {
			f = Zr(s, 1, "frame-wrap svelte-1n46o8q", null, f, { mobile: V(te) === "mobile" }), $r(p, `width:${V(fe) ?? ""}px; height:${V(pe) ?? ""}px`), Z(h, "title", e), Z(h, "src", `/?page=${V(g)}&preview=1`), $r(h, `width:${V(ce) ?? ""}px; height:${V(de) ?? ""}px; transform:scale(${V(le) ?? ""}); transform-origin:top left`);
		}, [() => Q("ui.previewTitle")]), Sr("load", h, Pr), br(h), W(e, t);
	}, Ld = (e) => {
		var t = ru(), n = L(t, !0);
		j(t), B((e) => G(n, e), [() => Q("ui.loading")]), W(e, t);
	};
	K(Fd, (e) => {
		V(h) ? e(Id) : e(Ld, -1);
	});
	var Rd = z(Fd, 2), zd = (e) => {
		Oa(e, {
			get image() {
				return V(ui);
			},
			onapply: pi,
			oncancel: () => I(ui, null)
		});
	};
	K(Rd, (e) => {
		V(ui) && e(zd);
	});
	var Bd = z(Rd, 2), Vd = (e) => {
		var t = au(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var a = z(r, 2);
		Vr(a, 16, () => V(Re).lines, (e) => e, (e, t) => {
			var n = iu(), r = L(n, !0);
			j(n), B(() => G(r, t)), W(e, n);
		});
		var o = z(a, 2), s = (e) => {
			var t = Us();
			Y(t), ot(t, !0), B(() => Z(t, "placeholder", V(Re).placeholder)), H("keydown", t, (e) => e.key === "Enter" && V(Re).value.trim() && He(!0)), ci(t, () => V(Re).value, (e) => V(Re).value = e), W(e, t);
		};
		K(o, (e) => {
			V(Re).prompt && e(s);
		});
		var c = z(o, 2), l = L(c), u = L(l, !0);
		j(l);
		var d = z(l, 2), f = L(d, !0);
		j(d), j(c), j(n), j(t), B(() => {
			G(i, V(Re).title), G(u, V(Re).cancelLabel), G(f, V(Re).okLabel);
		}), H("click", l, () => He(!1)), H("click", d, () => He(!0)), W(e, t);
	};
	K(Bd, (e) => {
		V(Re) && e(Vd);
	});
	var Hd = z(Bd, 2), Ud = (e) => {
		var t = ou(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var a = z(r, 2), o = L(a, !0);
		j(a);
		var s = z(a, 2), c = L(s), l = z(c);
		Y(l), j(s);
		var u = z(s, 2), d = L(u), f = z(d);
		{
			let e = /* @__PURE__ */ P(() => Q("setup.accentPick"));
			Hi(f, {
				get value() {
					return V(qe);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => I(qe, e, !0)
			});
		}
		j(u);
		var p = z(u, 2), m = L(p), h = z(m);
		{
			let e = /* @__PURE__ */ P(() => Q("setup.bgLabel"));
			Hi(h, {
				get value() {
					return V(Je);
				},
				get label() {
					return V(e);
				},
				onchange: (e) => I(Je, e, !0)
			});
		}
		j(p);
		var g = z(p, 2), _ = L(g, !0);
		j(g);
		var v = z(g, 2), y = L(v), b = L(y, !0);
		j(y);
		var x = z(y, 2), S = L(x, !0);
		j(x), j(v), j(n), j(t), B((e, t, n, r, a, s, u, f, p, h) => {
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
			() => !V(Ke).trim(),
			() => Q("setup.start")
		]), H("keydown", l, (e) => e.key === "Enter" && Xe()), ci(l, () => V(Ke), (e) => I(Ke, e)), H("click", y, Ye), H("click", x, Xe), W(e, t);
	};
	K(Hd, (e) => {
		V(Ue) && e(Ud);
	});
	var Wd = z(Hd, 2), Gd = (e) => {
		var t = su();
		let n;
		var r = L(t), i = L(r, !0);
		j(r);
		var a = z(r, 2);
		j(t), B((e) => {
			n = Zr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: V(y) === "ok",
				error: V(y) === "error"
			}), G(i, V(v)), Z(a, "title", e);
		}, [() => Q("ui.close")]), H("click", a, () => x("")), W(e, t);
	};
	K(Wd, (e) => {
		V(v) && e(Gd);
	}), j(bd);
	var Kd = z(bd, 2), qd = (e) => {
		var t = cu(), n = L(t), r = L(n), i = L(r, !0);
		j(r);
		var o = z(r, 2);
		J(o, () => c.cross, !0), j(o), j(n);
		var s = z(n, 2), l = L(s);
		a(l), j(s), j(t), B((e, n) => {
			$r(t, `left: ${V(mt).left ?? ""}px; top: ${V(mt).top ?? ""}px`), G(i, e), Z(o, "title", n);
		}, [() => Q("blocks.suffix", { label: Rt[V(M).type] ?? V(M).type }), () => Q("tip.closeEsc")]), H("click", o, () => I(mt, null)), W(e, t);
	};
	K(Kd, (e) => {
		V(mt) && V(M) && e(qd);
	}), B(() => wd = Zr(Cd, 1, "topbar svelte-1n46o8q", null, wd, { hidden: !V(E) })), W(e, yd), Ge();
}
//#endregion
//#region src/main.js
Cr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await ki();
var du = Mr(uu, { target: document.getElementById("urd-admin") });
//#endregion
export { du as default };
