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
var je = !1;
function Me(e) {
	je = e;
}
var Ne;
function Pe(e) {
	if (e === null) throw ke(), Ce;
	return Ne = e;
}
function Fe() {
	return Pe(/* @__PURE__ */ fn(Ne));
}
function O(e) {
	if (je) {
		if (/* @__PURE__ */ fn(Ne) !== null) throw ke(), Ce;
		Ne = e;
	}
}
function k(e = 1) {
	if (je) {
		for (var t = e, n = Ne; t--;) n = /* @__PURE__ */ fn(n);
		Ne = n;
	}
}
function Ie(e = !0) {
	for (var t = 0, n = Ne;;) {
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
function Le(e) {
	if (!e || e.nodeType !== 8) throw ke(), Ce;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Re(e) {
	return e === this.v;
}
function ze(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Be(e) {
	return !ze(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
var Ve = [];
function He(e, t = !1, n = !1) {
	return Ue(e, /* @__PURE__ */ new Map(), "", Ve, null, n);
}
function Ue(t, n, r, i, a = null, o = !1) {
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
				d in t && (u[d] = Ue(f, n, r, i, null, o));
			}
			return u;
		}
		if (l(t) === s) {
			u = {}, n.set(t, u), a !== null && n.set(a, u);
			for (var p of Object.keys(t)) u[p] = Ue(t[p], n, r, i, null, o);
			return u;
		}
		if (t instanceof Date) return structuredClone(t);
		if (typeof t.toJSON == "function" && !o) return Ue(t.toJSON(), n, r, i, t);
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
var We = null;
function Ge(e) {
	We = e;
}
function Ke(e, t = !1, n) {
	We = {
		p: We,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: V,
		l: null
	};
}
function qe(e) {
	var t = We, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Cn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, We = t.p, e ?? {};
}
function Je() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Ye = [];
function Xe() {
	var e = Ye;
	Ye = [], f(e);
}
function Ze(e) {
	if (Ye.length === 0 && !Mt) {
		var t = Ye;
		queueMicrotask(() => {
			t === Ye && Xe();
		});
	}
	Ye.push(e);
}
function Qe() {
	for (; Ye.length > 0;) Xe();
}
function $e(e) {
	var t = V;
	if (t === null) return B.f |= ae, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	et(e, t);
}
function et(e, t) {
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
var A = ~(g | _ | h);
function tt(e, t) {
	e.f = e.f & A | t;
}
function nt(e) {
	e.f & 512 || e.deps === null ? tt(e, h) : tt(e, _);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function rt(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ne, rt(t.deps));
}
function it(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), rt(e.deps), tt(e, h);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var at = !1;
function ot(e) {
	var t = at;
	try {
		return at = !1, [e(), at];
	} finally {
		at = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function st(e) {
	je && /* @__PURE__ */ dn(e) !== null && pn(e);
}
var ct = !1;
function j() {
	ct || (ct = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[pe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function lt(e) {
	var t = B, n = V;
	Kn(null), qn(null);
	try {
		return e();
	} finally {
		Kn(t), qn(n);
	}
}
function ut(e, t, n, r = n) {
	e.addEventListener(t, () => lt(n));
	let i = e[pe];
	i ? e[pe] = () => {
		i(), r(!0);
	} : e[pe] = () => r(!0), j();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function dt(e) {
	let t = 0, n = Zt(0), r;
	return () => {
		bn() && (U(n), Dn(() => (t === 0 && (r = pr(() => e(() => tn(n)))), t += 1, () => {
			Ze(() => {
				--t, t === 0 && (r?.(), r = void 0, tn(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var ft = S | ee;
function pt(e, t, n, r) {
	new mt(e, t, n, r);
}
var mt = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = je ? Ne : null;
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
	#h = dt(() => (this.#m = Zt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = V;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = V.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
			if (je) {
				let e = this.#t;
				Fe();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, ft), je && (this.#e = Ne);
	}
	#g() {
		try {
			this.#a = kn(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		Ze(r), t && (this.#s = kn(() => {
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
			t = !0, n && D(), this.#s !== null && In(this.#s, () => {
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
					et(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = kn(() => e(this.#e)), Ze(() => {
			var e = this.#c = document.createDocumentFragment(), t = un();
			e.append(t), this.#a = this.#S(() => kn(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, In(this.#o, () => {
				this.#o = null;
			}), this.#x(N));
		}));
	}
	#b() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = kn(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Bn(this.#a, e);
				let t = this.#n.pending;
				this.#o = kn(() => t(this.#e));
			} else this.#x(N);
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
		var t = V, n = B, r = We;
		qn(this.#i), Kn(this.#i), Ge(this.#i.ctx);
		try {
			return Rt.ensure(), e();
		} catch (e) {
			return $e(e), null;
		} finally {
			qn(t), Kn(n), Ge(r);
		}
	}
	#C(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#C(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#x(t), this.#o && In(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#C(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, Ze(() => {
			this.#d = !1, this.#m && $t(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), U(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		N?.is_fork ? (this.#a && N.skip_effect(this.#a), this.#o && N.skip_effect(this.#o), this.#s && N.skip_effect(this.#s), N.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Nn(this.#a), null), this.#o &&= (Nn(this.#o), null), this.#s &&= (Nn(this.#s), null), je && (Pe(this.#t), k(), Pe(Ie()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return kn(() => {
						var r = V;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return et(e, this.#i.parent), null;
				}
			}));
		};
		Ze(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				et(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => et(e, this.#i && this.#i.parent)) : n(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function ht(e, t, n, r) {
	let i = Je() ? yt : St;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = V, c = gt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				et(e, s);
			}
			_t();
		}
	}
	var d = vt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ xt(e))).then(u).catch((e) => et(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), _t();
	}) : f();
}
function gt() {
	var e = V, t = B, n = We, r = N;
	return function(i = !0) {
		qn(e), Kn(t), Ge(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function _t(e = !0) {
	qn(null), Kn(null), Ge(null), e && N?.deactivate();
}
function vt() {
	var e = V, t = e.b, n = N, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function yt(e) {
	var t = 2 | g;
	return V !== null && (V.f |= ee), {
		ctx: We,
		deps: null,
		effects: null,
		equals: Re,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: we,
		wv: 0,
		parent: V,
		ac: null
	};
}
var bt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function xt(e, t, n) {
	let r = V;
	r === null && ge();
	var i = void 0, a = Zt(we), o = !B, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = V, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== me && n.reject(e);
			}).finally(_t);
		} catch (e) {
			n.reject(e), _t();
		}
		var c = N;
		if (o) {
			if (t.f & 32768) var l = vt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(bt);
			else for (let e of s.values()) e.reject(bt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== bt && (c.activate(), t ? (a.f |= ae, $t(a, t)) : (a.f & 8388608 && (a.f ^= ae), $t(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), xn(() => {
		for (let e of s) e.reject(bt);
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
function M(e) {
	let t = /* @__PURE__ */ yt(e);
	return Yn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function St(e) {
	let t = /* @__PURE__ */ yt(e);
	return t.equals = Be, t;
}
function Ct(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Nn(t[n]);
	}
}
function wt(e) {
	var t, n = V, r = e.parent;
	if (!Un && r !== null && e.v !== we && r.f & 24576) return Oe(), e.v;
	qn(r);
	try {
		e.f &= ~ne, Ct(e), t = or(e);
	} finally {
		qn(n);
	}
	return t;
}
function Tt(e) {
	var t = wt(e);
	if (!e.equals(t) && (e.wv = ir(), (!N?.is_fork || e.deps === null) && (N === null ? e.v = t : (N.capture(e, t, !0), kt?.capture(e, t, !0)), e.deps === null))) {
		tt(e, h);
		return;
	}
	Un || (At === null ? nt(e) : (bn() || N?.is_fork) && At.set(e, t));
}
function Et(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && lt(() => {
		t.ac.abort(me), t.ac = null;
	}), t.fn !== null && (t.teardown = d), cr(t, 0), jn(t));
}
function Dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && lr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var Ot = null, N = null, kt = null, At = null, jt = null, Mt = !1, Nt = !1, Pt = null, Ft = null, It = 0, Lt = 1, Rt = class e {
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
			for (var r of n.d) tt(r, g), t(r);
			for (r of n.m) tt(r, _), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, It++ > 1e3 && (this.#x(), Bt());
		for (let e of this.#u) this.#d.delete(e), tt(e, g), this.schedule(e);
		for (let e of this.#d) tt(e, _), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = Pt = [], r = [], i = Ft = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw qt(e), this.#h() || this.discard(), t;
		}
		if (N = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (Pt = null, Ft = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Kt(e, t);
			i.length > 0 && N.#g();
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
		var s = N;
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
				a ? r.f ^= h : i & 4 ? t.push(r) : H(r) && (i & 16 && this.#d.add(r), lr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), tt(i, g), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), N = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) it(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== we && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), At?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		N = this;
	}
	deactivate() {
		N = null, At = null;
	}
	flush() {
		try {
			Nt = !0, N = this, this.#g();
		} finally {
			It = 0, jt = null, Pt = null, Ft = null, Nt = !1, N = null, At = null, Yt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(bt);
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
		this.#m || (this.#m = !0, Ze(() => {
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
		if (N === null) {
			let t = N = new e();
			!Nt && !Mt && Ze(() => {
				t.#e || t.flush();
			});
		}
		return N;
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
			if (Pt !== null && t === V && (B === null || !(B.f & 2))) return;
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
		for (e && (N !== null && !N.is_fork && N.flush(), n = e());;) {
			if (Qe(), N === null) return n;
			N.flush();
		}
	} finally {
		Mt = t;
	}
}
function Bt() {
	try {
		E();
	} catch (e) {
		et(e, jt);
	}
}
var Vt = null;
function Ht(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && H(r) && (Vt = /* @__PURE__ */ new Set(), lr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Fn(r), Vt?.size > 0)) {
				Yt.clear();
				for (let e of Vt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Vt.has(n) && (Vt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || lr(n);
					}
				}
				Vt.clear();
			}
		}
		Vt = null;
	}
}
function Ut(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Ut(i, t, n, r) : e & 4194320 && !(e & 2048) && Wt(i, t, r) && (tt(i, g), Gt(i));
	}
}
function Wt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Wt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Gt(e) {
	N.schedule(e);
}
function Kt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), tt(e, h);
		for (var n = e.first; n !== null;) Kt(n, t), n = n.next;
	}
}
function qt(e) {
	tt(e, h);
	for (var t = e.first; t !== null;) qt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var Jt = /* @__PURE__ */ new Set(), Yt = /* @__PURE__ */ new Map(), Xt = !1;
function Zt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Re,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function P(e, t) {
	let n = Zt(e, t);
	return Yn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Qt(e, t = !1, n = !0) {
	let r = Zt(e);
	return t || (r.equals = Be), r;
}
function F(e, t, n = !1) {
	return B !== null && (!Gn || B.f & 131072) && Je() && B.f & 4325394 && (Jn === null || !Jn.has(e)) && Se(), $t(e, n ? rn(t) : t, Ft);
}
function $t(e, t, n = null) {
	if (!e.equals(t)) {
		Yt.set(e, Un ? t : e.v);
		var r = Rt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && wt(t), At === null && nt(t);
		}
		e.wv = ir(), nn(e, g, n), Je() && V !== null && V.f & 1024 && !(V.f & 96) && (Qn === null ? $n([e]) : Qn.push(e)), !r.is_fork && Jt.size > 0 && !Xt && en();
	}
	return t;
}
function en() {
	Xt = !1;
	for (let e of Jt) {
		e.f & 1024 && tt(e, _);
		let t;
		try {
			t = H(e);
		} catch {
			t = !0;
		}
		t && lr(e);
	}
	Jt.clear();
}
function tn(e) {
	F(e, e.v + 1);
}
function nn(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Je(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === V)) {
			var l = (c & g) === 0;
			if (l && tt(s, t), c & 131072) Jt.add(s);
			else if (c & 2) {
				var u = s;
				At?.delete(u), c & 65536 || (c & 512 && (V === null || !(V.f & 2097152)) && (s.f |= ne), nn(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && Vt !== null && Vt.add(d), n === null ? Gt(d) : n.push(d);
			}
		}
	}
}
function rn(t) {
	if (typeof t != "object" || !t || oe in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ P(0), u = null, d = nr, f = (e) => {
		if (nr === d) return e();
		var t = B, n = nr;
		Kn(null), rr(d);
		var r = e();
		return Kn(t), rr(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ P(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && be();
			var i = r.get(t);
			return i === void 0 ? f(() => {
				var e = /* @__PURE__ */ P(n.value, u);
				return r.set(t, e), e;
			}) : F(i, n.value, !0), !0;
		},
		deleteProperty(e, t) {
			var n = r.get(t);
			if (n === void 0) {
				if (t in e) {
					let e = f(() => /* @__PURE__ */ P(we, u));
					r.set(t, e), tn(o);
				}
			} else F(n, we), tn(o);
			return !0;
		},
		get(e, n, i) {
			if (n === oe) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ P(rn(s ? e[n] : we), u)), r.set(n, o)), o !== void 0) {
				var c = U(o);
				return c === we ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = U(i));
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
			return (n !== void 0 || V !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ P(i ? rn(e[t]) : we, u)), r.set(t, n)), U(n) === we) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ P(we, u)), r.set(d + "", p)) : F(p, we);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ P(void 0, u)), F(c, rn(n)), r.set(t, c));
			else {
				l = c.v !== we;
				var m = f(() => rn(n));
				F(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && F(g, _ + 1);
				}
				tn(o);
			}
			return !0;
		},
		ownKeys(e) {
			U(o);
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
var an, on, sn, cn;
function ln() {
	if (an === void 0) {
		an = window, on = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		sn = a(t, "firstChild").get, cn = a(t, "nextSibling").get, u(e) && (e[ue] = void 0, e[le] = null, e[de] = void 0, e.__e = void 0), u(n) && (n[fe] = void 0);
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
function I(e, t) {
	if (!je) return /* @__PURE__ */ dn(e);
	var n = /* @__PURE__ */ dn(Ne);
	if (n === null) n = Ne.appendChild(un());
	else if (t && n.nodeType !== 3) {
		var r = un();
		return n?.before(r), Pe(r), r;
	}
	return t && gn(n), Pe(n), n;
}
function L(e, t = !1) {
	if (!je) {
		var n = /* @__PURE__ */ dn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ fn(n) : n;
	}
	if (t) {
		if (Ne?.nodeType !== 3) {
			var r = un();
			return Ne?.before(r), Pe(r), r;
		}
		gn(Ne);
	}
	return Ne;
}
function R(e, t = 1, n = !1) {
	let r = je ? Ne : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ fn(r);
	if (!je) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = un();
			return r === null ? i?.after(a) : r.before(a), Pe(a), a;
		}
		gn(r);
	}
	return Pe(r), r;
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
	V === null && (B === null && T(e), ve()), Un && w(e);
}
function vn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function yn(e, t) {
	var n = V;
	n !== null && n.f & 8192 && (e |= v);
	var r = {
		ctx: We,
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
	N?.register_created_effect(r);
	var i = r;
	if (e & 4) Pt === null ? Rt.ensure().schedule(r) : Pt.push(r);
	else if (t !== null) {
		try {
			lr(r);
		} catch (e) {
			throw Nn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && vn(i, n), B !== null && B.f & 2 && !(e & 64))) {
		var a = B;
		(a.effects ??= []).push(i);
	}
	return r;
}
function bn() {
	return B !== null && !Gn;
}
function xn(e) {
	let t = yn(8, null);
	return tt(t, h), t.teardown = e, t;
}
function Sn(e) {
	_n("$effect");
	var t = V.f;
	if (!B && t & 32 && We !== null && !We.i) {
		var n = We;
		(n.e ??= []).push(e);
	} else return Cn(e);
}
function Cn(e) {
	return yn(4 | C, e);
}
function wn(e) {
	Rt.ensure();
	let t = yn(64 | ee, e);
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
	return yn(ie | ee, e);
}
function Dn(e, t = 0) {
	return yn(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	ht(r, t, n, (t) => {
		yn(8, () => {
			e(...t.map(U));
		});
	});
}
function On(e, t = 0) {
	return yn(16 | t, e);
}
function kn(e) {
	return yn(32 | ee, e);
}
function An(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Un, n = B;
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
		e !== null && lt(() => {
			e.abort(me);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Pn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, jn(e, t && !n), cr(e, 0);
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
		e.f ^= v, e.f & 1024 || (tt(e, g), Rt.ensure().schedule(e));
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
var B = null, Gn = !1;
function Kn(e) {
	B = e;
}
var V = null;
function qn(e) {
	V = e;
}
var Jn = null;
function Yn(e) {
	B !== null && (Jn ??= /* @__PURE__ */ new Set()).add(e);
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
function H(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ne), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (H(a) && Tt(a), a.wv > e.wv) return !0;
		}
		t & 512 && At === null && tt(e, h);
	}
	return !1;
}
function ar(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Jn !== null && Jn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? ar(a, t, !1) : t === a && (n ? tt(a, g) : a.f & 1024 && tt(a, _), Gt(a));
	}
}
function or(e) {
	var t = Xn, n = Zn, r = Qn, i = B, a = Jn, o = We, s = Gn, c = nr, l = e.f;
	Xn = null, Zn = 0, Qn = null, B = l & 96 ? null : e, Jn = null, Ge(e.ctx), Gn = !1, nr = ++tr, e.ac !== null && (lt(() => {
		e.ac.abort(me);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = N?.is_fork;
		if (Xn !== null) {
			var m;
			if (p || cr(e, Zn), f !== null && Zn > 0) for (f.length = Zn + Xn.length, m = 0; m < Xn.length; m++) f[Zn + m] = Xn[m];
			else e.deps = f = Xn;
			if (bn() && e.f & 512) for (m = Zn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && Zn < f.length && (cr(e, Zn), f.length = Zn);
		if (Je() && Qn !== null && !Gn && f !== null && !(e.f & 6146)) for (m = 0; m < Qn.length; m++) ar(Qn[m], e);
		if (i !== null && i !== e) {
			if (tr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = tr;
			if (t !== null) for (let e of t) e.rv = tr;
			Qn !== null && (r === null ? r = Qn : r.push(...Qn));
		}
		return e.f & 8388608 && (e.f ^= ae), d;
	} catch (e) {
		return $e(e);
	} finally {
		e.f ^= re, Xn = t, Zn = n, Qn = r, B = i, Jn = a, Ge(o), Gn = s, nr = c;
	}
}
function sr(e, r) {
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
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== we && nt(s), s.ac !== null && lt(() => {
			s.ac.abort(me), s.ac = null, tt(s, g);
		}), Et(s), cr(s, 0);
	}
}
function cr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) sr(e, n[r]);
}
function lr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		tt(e, h);
		var n = V, r = Hn;
		V = e, Hn = (t & 96) == 0;
		try {
			t & 16777232 ? Mn(e) : jn(e), An(e);
			var i = or(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = er;
		} finally {
			Hn = r, V = n;
		}
	}
}
async function ur() {
	await Promise.resolve(), zt();
}
function U(e) {
	var t = (e.f & 2) != 0;
	if (Vn?.add(e), B !== null && !Gn && !(V !== null && V.f & 16384) && (Jn === null || !Jn.has(e))) {
		var r = B.deps;
		if (B.f & 2097152) e.rv < tr && (e.rv = tr, Xn === null && r !== null && r[Zn] === e ? Zn++ : Xn === null ? Xn = [e] : Xn.push(e));
		else {
			B.deps ??= [], n.call(B.deps, e) || B.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [B] : n.call(i, B) || i.push(B);
		}
	}
	if (Un && Yt.has(e)) return Yt.get(e);
	if (t) {
		var a = e;
		if (Un) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || fr(a)) && (o = wt(a)), Yt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Gn && B !== null && (Hn || (B.f & 512) != 0), c = (a.f & b) === 0;
		H(a) && (s && (a.f |= 512), Tt(a)), s && !c && (Dt(a), dr(a));
	}
	if (At?.has(e)) return At.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function dr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (Dt(t), dr(t));
}
function fr(e) {
	if (e.v === we) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Yt.has(t) || t.f & 2 && fr(t)) return !0;
	return !1;
}
function pr(e) {
	var t = Gn;
	try {
		return Gn = !0, e();
	} finally {
		Gn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var mr = ["touchstart", "touchmove"];
function hr(e) {
	return mr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var gr = Symbol("events"), _r = /* @__PURE__ */ new Set(), vr = /* @__PURE__ */ new Set();
function yr(e) {
	if (!je) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function br(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || wr.call(t, e), !e.cancelBubble) return lt(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ze(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function xr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = br(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && xn(() => {
		t.removeEventListener(e, o, a);
	});
}
function W(e, t, n) {
	(t[gr] ??= {})[e] = n;
}
function Sr(e) {
	for (var t = 0; t < e.length; t++) _r.add(e[t]);
	for (var n of vr) n(e);
}
var Cr = null;
function wr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Cr = e;
	var s = 0, c = Cr === e && e[gr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[gr] = t;
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
		var d = B, f = V;
		Kn(null), qn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[gr]?.[r];
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
			e[gr] = t, delete e.currentTarget, Kn(d), qn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Tr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Er(e) {
	return Tr?.createHTML(e) ?? e;
}
function Dr(e) {
	var t = hn("template");
	return t.innerHTML = Er(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function Or(e, t) {
	var n = V;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function G(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (je) return Or(Ne, null), Ne;
		i === void 0 && (i = Dr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ dn(i)));
		var t = r || on ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ dn(t), s = t.lastChild;
			Or(o, s);
		} else Or(t, t);
		return t;
	};
}
function kr(e = "") {
	if (!je) {
		var t = un(e + "");
		return Or(t, t), t;
	}
	var n = Ne;
	return n.nodeType === 3 ? gn(n) : (n.before(n = un()), Pe(n)), Or(n, n), n;
}
function Ar() {
	if (je) return Or(Ne, null), Ne;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = un();
	return e.append(t, n), Or(t, n), e;
}
function K(e, t) {
	if (je) {
		var n = V;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Ne), Fe();
		return;
	}
	e !== null && e.before(t);
}
function q(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[fe] ??= e.nodeValue) && (e[fe] = n, e.nodeValue = `${n}`);
}
function jr(e, t) {
	return Nr(e, t);
}
var Mr = /* @__PURE__ */ new Map();
function Nr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	ln();
	var l = void 0, u = wn(() => {
		var s = n ?? t.appendChild(un());
		pt(s, { pending: () => {} }, (t) => {
			Ke({});
			var n = We;
			if (o && (n.c = o), a && (i.$$events = a), je && Or(t, null), l = e(t, i) || {}, je && (V.nodes.end = Ne, Ne === null || Ne.nodeType !== 8 || Ne.data !== "]")) throw ke(), Ce;
			qe();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = hr(r);
					for (let e of [t, document]) {
						var a = Mr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Mr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, wr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(_r)), vr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = Mr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, wr), r.delete(e), r.size === 0 && Mr.delete(n)) : r.set(e, i);
			}
			vr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return Pr.set(l, u), l;
}
var Pr = /* @__PURE__ */ new WeakMap(), Fr = class {
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
		var n = N, r = mn();
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
		} else je && (this.anchor = Ne), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function J(e, t, n = !1) {
	var r;
	je && (r = Ne, Fe());
	var i = new Fr(e), a = n ? S : 0;
	function o(e, t) {
		if (je) {
			var n = Le(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ie();
				Pe(a), i.anchor = a, Me(!1), i.ensure(e, t), Me(!0);
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
function Ir(e, t) {
	return t;
}
function Lr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		In(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Rr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
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
		Rr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Rr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, Bn(a, document.createDocumentFragment())) : Nn(t[i], n);
	}
}
var zr;
function Br(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = je ? Pe(/* @__PURE__ */ dn(u)) : u.appendChild(un());
	}
	je && Fe();
	var d = null, f = /* @__PURE__ */ St(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Hr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, Wr(d, null, c)) : Rn(d) : In(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: On(() => {
			p = U(f);
			var e = p.length;
			let t = !1;
			je && Le(c) === "[!" != (e === 0) && (c = Ie(), Pe(c), Me(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = N, v = mn(), y = 0; y < e; y += 1) {
				je && Ne.nodeType === 8 && Ne.data === "]" && (c = Ne, t = !0, Me(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && $t(S.v, b), S.i && $t(S.i, y), v && u.unskip_effect(S.e)) : (S = Ur(l, h ? c : zr ??= un(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = kn(() => s(c)) : (d = kn(() => s(zr ??= un())), d.f |= te)), e > r.size && _e("", "", ""), je && e > 0 && Pe(Ie()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Me(!0), U(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, je && (c = Ne);
}
function Vr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Hr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Vr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Rn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= te, _ === l) Wr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Gr(e, d, _), Gr(e, _, y), Wr(_, y, n), d = _, p = [], m = [], l = Vr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Wr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Gr(e, S.prev, ee.next), Gr(e, d, S), Gr(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), Wr(_, l, n), Gr(e, _.prev, _.next), Gr(e, _, d === null ? e.effect.first : d.next), Gr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Vr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Vr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Rr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var C = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || C.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && C.push(l), l = Vr(l.next);
		var ne = C.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) C[v].nodes?.a?.fix();
			}
			Lr(e, C, re);
		}
	}
	o && Ze(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Ur(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Zt(n) : /* @__PURE__ */ Qt(n, !1, !1) : null, l = o & 2 ? Zt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Wr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ fn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Gr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Y(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		je && (o = Pe(/* @__PURE__ */ dn(c)));
	}
	z(() => {
		var e = V;
		if (s === (s = t() ?? "")) {
			je && Fe();
			return;
		}
		if (n && !je) {
			e.nodes = null, c.innerHTML = s, s !== "" && Or(/* @__PURE__ */ dn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Pn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (je) {
				for (var a = Ne.data, l = Fe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ fn(l);
				if (l === null) throw ke(), Ce;
				Or(Ne, u), o = Pe(l);
				return;
			}
			var d = hn(r ? "svg" : i ? "math" : "template", r ? Ee : i ? De : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (Or(/* @__PURE__ */ dn(f), f.lastChild), r || i) for (; /* @__PURE__ */ dn(f);) o.before(/* @__PURE__ */ dn(f));
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
	var o = e[ue];
	if (je || o !== n || o === void 0) {
		var s = qr(n, r, a);
		(!je || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[ue] = n;
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
	var i = e[de];
	if (je || i !== t) {
		var a = Xr(t, r);
		(!je || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[de] = t;
	} else r && (Array.isArray(r) ? (Qr(e, n?.[0], r[0]), Qr(e, n?.[1], r[1], "important")) : Qr(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var ei = Symbol("is custom element"), ti = Symbol("is html"), ni = he ? "link" : "LINK", ri = he ? "progress" : "PROGRESS";
function X(e) {
	if (je) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					ai(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					ai(e, "checked", null), e.checked = r;
				}
			}
		};
		e[pe] = n, Ze(n), j();
	}
}
function Z(e, t) {
	var n = oi(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== ri) || (e.value = t ?? "");
}
function ii(e, t) {
	var n = oi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function ai(e, t, n, r) {
	var i = oi(e);
	je && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === ni) || i[t] !== (i[t] = n) && (t === "loading" && (e[ce] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && ci(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function oi(e) {
	return e[le] ??= {
		[ei]: e.nodeName.includes("-"),
		[ti]: e.namespaceURI === Te
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
	ut(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = ui(e) ? di(a) : a, n(a), N !== null && r.add(N), await ur(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (je && e.defaultValue !== e.value || pr(t) == null && e.value) && (n(ui(e) ? di(e.value) : e.value), N !== null && r.add(N)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = N;
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
	return e === t || e?.[oe] === t;
}
function pi(e = {}, t, n, r) {
	var i = We.r, a = V;
	return Tn(() => {
		var o, s;
		return Dn(() => {
			o = s, s = r?.() || [], pr(() => {
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
	var i = !0, o = (n & 8) != 0, s = (n & 16) != 0, c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ yt(r), U(u)) : (l && (l = !1, c = s ? pr(r) : r), c);
	let f;
	if (o) {
		var p = oe in e || se in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = ot(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && ye(t), f(m)));
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
	var v = !1, y = (n & 1 ? yt : St)(() => (v = !1, g()));
	o && U(y);
	var b = V;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? U(y) : i && o ? rn(e) : e;
			return F(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Un && v || b.f & 16384 ? y.v : U(y);
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
};
//#endregion
//#region ../template/assets/engine/i18n.js
function gi(e) {
	return _i(e) ?? "nb";
}
function _i(e) {
	let t = String(e ?? "").trim().toLowerCase();
	return t === "no" || t.startsWith("nb") || t.startsWith("no-") ? "nb" : t.startsWith("nn") ? "nn" : t.startsWith("se") || t.startsWith("smj") || t.startsWith("sma") ? "se" : t.startsWith("tr") ? "tr" : t.startsWith("en") ? "en-GB" : null;
}
({ ...hi.strings });
var vi = {
	lang: "nb",
	dict: {}
};
function yi(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function Q(e, t) {
	return yi(vi.dict[e] ?? e, t);
}
function bi() {
	return vi.lang;
}
function xi(e, t) {
	vi.lang = gi(e), Object.assign(vi.dict, t ?? {});
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
var Ci = /* @__PURE__ */ G("<button type=\"button\" class=\"cp-clear svelte-zxiloo\" title=\"Fjern fargen (bruk temaets standard)\" aria-label=\"Fjern fargen\">×</button>"), wi = /* @__PURE__ */ G("<button type=\"button\" class=\"cp-eye svelte-zxiloo\" title=\"Pipette: plukk farge fra skjermen\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Ti = /* @__PURE__ */ G("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Ei = /* @__PURE__ */ G("<button type=\"button\"></button>"), Di = /* @__PURE__ */ G("<span class=\"cp-label svelte-zxiloo\">Temafarger<!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Oi = /* @__PURE__ */ G("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\" title=\"Fjern lagret farge\">×</button></span>"), ki = /* @__PURE__ */ G("<span class=\"cp-tokens svelte-zxiloo\"></span>"), Ai = /* @__PURE__ */ G("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), ji = /* @__PURE__ */ G("<span class=\"cp-label svelte-zxiloo\">Nylige</span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), Mi = /* @__PURE__ */ G("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" title=\"Gjennomsiktighet\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\">Lagrede <button type=\"button\" class=\"cp-add svelte-zxiloo\" title=\"Lagre gjeldende farge\">+</button></span> <!> <!></div>"), Ni = /* @__PURE__ */ G("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function Pi(e, t) {
	Ke(t, !0);
	let n = mi(t, "value", 3, "#000000"), r = mi(t, "tokens", 19, () => []), i = mi(t, "label", 3, "Velg farge"), a = mi(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ P(rn([])), d = /* @__PURE__ */ P(rn([])), f = "", p = "", h = /* @__PURE__ */ P(null), g = /* @__PURE__ */ P(!1), _ = /* @__PURE__ */ P(rn({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ P(0), y = /* @__PURE__ */ P(0), b = /* @__PURE__ */ P(1), x = /* @__PURE__ */ P(1), S = /* @__PURE__ */ P("#000000");
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
		return C(...ne(U(v), U(y), U(b)));
	}
	function ie() {
		let e = re();
		return U(x) >= .995 ? e : e + Math.round(U(x) * 255).toString(16).padStart(2, "0");
	}
	function ae() {
		F(S, ie(), !0), p = U(S), t.onchange?.(U(S));
	}
	function oe(e) {
		let t = ee(e);
		return t ? (((e) => {
			var t = m(e, 3);
			F(v, t[0], !0), F(y, t[1], !0), F(b, t[2], !0);
		})(te(t[0], t[1], t[2])), F(x, t[3], !0), F(S, ie(), !0), !0) : !1;
	}
	function se() {
		oe(c()) || oe("#000000"), f = n(), p = "";
		try {
			let e = JSON.parse(localStorage.getItem(o) ?? "[]");
			F(u, Array.isArray(e) ? e : [], !0);
		} catch {
			F(u, [], !0);
		}
		try {
			let e = JSON.parse(localStorage.getItem(s) ?? "[]");
			F(d, Array.isArray(e) ? e : [], !0);
		} catch {
			F(d, [], !0);
		}
		let e = U(h).getBoundingClientRect(), t = U(h).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		F(_, {
			top: a,
			left: i
		}, !0), F(g, !0);
	}
	function ce() {
		if (F(g, !1), p && p !== f) {
			let e = [p, ...U(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function le(e, n) {
		oe(n), F(S, n, !0), t.onchange?.(e);
	}
	function ue(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			F(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), F(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), ae();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function de(e) {
		oe(e.target.value) ? ae() : F(S, re(), !0);
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
			F(v, t[0], !0), F(y, t[1], !0), F(b, t[2], !0);
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
		U(d).includes(e) || (F(d, [e, ...U(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(He(U(d)))));
	}
	function w(e) {
		F(d, U(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(He(U(d))));
	}
	Sn(() => {
		if (!U(g)) return;
		let e = (e) => {
			U(h) && !U(h).contains(e.target) && ce();
		}, t = (e) => {
			e.key === "Escape" && ce();
		}, n = () => ce();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var ve = Ni(), T = I(ve);
	let E;
	var ye = R(T, 2), be = (e) => {
		var n = Ci();
		W("click", n, () => t.onchange?.("")), K(e, n);
	};
	J(ye, (e) => {
		a() && n() && e(be);
	});
	var xe = R(ye, 2), Se = (e) => {
		var t = Mi(), i = I(t), a = I(i);
		O(i);
		var o = R(i, 2);
		X(o);
		var s = R(o, 2);
		X(s);
		var c = R(s, 2), f = I(c), p = R(f, 2);
		X(p);
		var h = R(p, 2), g = (e) => {
			var t = wi();
			W("click", t, he), K(e, t);
		};
		J(h, (e) => {
			me && e(g);
		}), O(c);
		var ee = R(c, 2);
		Br(ee, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Ti();
			X(r), z((e) => {
				ai(r, "title", t), Z(r, e);
			}, [() => fe(U(n))]), W("change", r, (e) => pe(U(n), e.target.value)), K(e, r);
		}), O(ee);
		var C = R(ee, 2), te = (e) => {
			var t = Di(), i = L(t), a = R(I(i)), o = (e) => {
				var t = kr();
				z((e) => q(t, `- koblet til «${e ?? ""}»`), [() => l()]), K(e, t);
			}, s = /* @__PURE__ */ M(() => l());
			J(a, (e) => {
				U(s) && e(o);
			}), O(i);
			var c = R(i, 2);
			Br(c, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ M(() => m(U(t), 2));
				let i = () => U(r)[0], a = () => U(r)[1];
				var o = Ei();
				let s;
				z(() => {
					s = Zr(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), $r(o, `background: ${a() ?? ""}`), ai(o, "title", `Temafarge: ${i() ?? ""} (følger temaet)`);
				}), W("click", o, () => le(i(), a())), K(e, o);
			}), O(c), K(e, t);
		};
		J(C, (e) => {
			r().length && e(te);
		});
		var ne = R(C, 2), ie = R(I(ne));
		O(ne);
		var oe = R(ne, 2), se = (e) => {
			var t = ki();
			Br(t, 20, () => U(d), (e) => e, (e, t) => {
				var n = Oi(), r = I(n), i = R(r, 2);
				O(n), z(() => {
					$r(r, `background: ${t ?? ""}`), ai(r, "title", t);
				}), W("click", r, () => ge(t)), W("click", i, () => w(t)), K(e, n);
			}), O(t), K(e, t);
		};
		J(oe, (e) => {
			U(d).length && e(se);
		});
		var ce = R(oe, 2), ve = (e) => {
			var t = ji(), n = R(L(t), 2);
			Br(n, 20, () => U(u), (e) => e, (e, t) => {
				var n = Ai();
				z(() => {
					$r(n, `background: ${t ?? ""}`), ai(n, "title", t);
				}), W("click", n, () => ge(t)), K(e, n);
			}), O(n), K(e, t);
		};
		J(ce, (e) => {
			U(u).length && e(ve);
		}), O(t), z((e, n) => {
			$r(t, `top: ${U(_).top ?? ""}px; left: ${U(_).left ?? ""}px`), $r(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${U(v) ?? ""}, 100%, 50%)`), $r(a, `left: ${U(y) * 100}%; top: ${(1 - U(b)) * 100}%`), Z(o, U(v)), Z(s, e), $r(s, `background: linear-gradient(to right, transparent, ${n ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), $r(f, `background: ${U(S) ?? ""}`), Z(p, U(S));
		}, [() => Math.round(U(x) * 100), () => re()]), W("click", t, (e) => e.preventDefault()), W("pointerdown", i, ue), W("input", o, (e) => {
			F(v, Number(e.target.value), !0), ae();
		}), W("input", s, (e) => {
			F(x, Number(e.target.value) / 100), ae();
		}), W("change", p, de), W("click", ie, _e), K(e, t);
	};
	J(xe, (e) => {
		U(g) && e(Se);
	}), O(ve), pi(ve, (e) => F(h, e), () => U(h)), z((e, t, n) => {
		E = Zr(T, 1, "cp-swatch svelte-zxiloo", null, E, e), $r(T, `background: ${t ?? ""}`), ai(T, "title", n), ai(T, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? `${i()} (koblet til temafargen «${l()}»)` : i()
	]), W("click", T, () => U(g) ? ce() : se()), K(e, ve), qe();
}
Sr([
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
var ra = /* @__PURE__ */ G("<img class=\"gp-own svelte-15ln1c3\" alt=\"Eget ikon\"/>"), ia = /* @__PURE__ */ G("<span class=\"gp-svg svelte-15ln1c3\"></span>"), aa = /* @__PURE__ */ G("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), oa = /* @__PURE__ */ G("<div class=\"gp-group svelte-15ln1c3\">Nylige</div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), sa = /* @__PURE__ */ G("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), ca = /* @__PURE__ */ G("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), la = /* @__PURE__ */ G("<button type=\"button\"> </button>"), ua = /* @__PURE__ */ G("<div class=\"gp-group svelte-15ln1c3\">Eget ikon</div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\">Last opp bilde …</button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\">Bildet skalerer til blokkens størrelse og erstatter tegnet til du fjerner det.</p>", 1), da = /* @__PURE__ */ G("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), fa = /* @__PURE__ */ G("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function pa(e, t) {
	Ke(t, !0);
	let n = mi(t, "value", 3, "★"), r = mi(t, "icon", 3, null), i = mi(t, "image", 3, null), a = mi(t, "label", 3, "Velg tegn"), o = /* @__PURE__ */ P(rn([])), s = /* @__PURE__ */ P(null), c = /* @__PURE__ */ P(null), l = /* @__PURE__ */ P(!1), u = /* @__PURE__ */ P(rn({
		top: 0,
		left: 0
	}));
	function d() {
		F(o, Xi(), !0);
		let e = U(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		F(u, {
			top: n,
			left: t
		}, !0), F(l, !0);
	}
	function f(e) {
		Zi(e), t.onpick?.(e), F(l, !1);
	}
	function p(e) {
		t.onicon?.(e), F(l, !1);
	}
	async function h(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await Ri(n, 256);
		t.onimage?.(r.dataUrl), F(l, !1);
	}
	Sn(() => {
		if (!U(l)) return;
		let e = (e) => {
			U(s) && !U(s).contains(e.target) && F(l, !1);
		}, t = (e) => {
			e.key === "Escape" && F(l, !1);
		}, n = (e) => {
			U(s) && e.target instanceof Node && !U(s).contains(e.target) && F(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = fa(), _ = I(g), v = I(_), y = (e) => {
		var t = ra();
		z(() => ai(t, "src", i())), K(e, t);
	}, b = (e) => {
		var t = ia();
		Y(t, () => na(r()), !0), O(t), K(e, t);
	}, x = (e) => {
		var t = kr();
		z(() => q(t, n() || "★")), K(e, t);
	};
	J(v, (e) => {
		i() ? e(y) : r() && ea[r()] ? e(b, 1) : e(x, -1);
	}), O(_);
	var S = R(_, 2), ee = (e) => {
		var i = da(), a = I(i), s = (e) => {
			var t = oa(), n = R(L(t), 2);
			Br(n, 20, () => U(o), (e) => e, (e, t) => {
				var n = aa(), r = I(n, !0);
				O(n), z(() => q(r, t)), W("click", n, () => f(t)), K(e, n);
			}), O(n), K(e, t);
		};
		J(a, (e) => {
			U(o).length && e(s);
		});
		var l = R(a, 2), d = (e) => {
			var t = Ar();
			Br(L(t), 17, () => ta, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ M(() => m(U(t), 2));
				let i = () => U(n)[0], a = () => U(n)[1];
				var o = ca(), s = L(o), c = I(s, !0);
				O(s);
				var l = R(s, 2);
				Br(l, 20, a, (e) => e, (e, t) => {
					var n = sa();
					let i;
					var a = I(n);
					Y(a, () => na(t), !0), O(a), O(n), z(() => {
						i = Zr(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), ai(n, "title", ea[t].label);
					}), W("click", n, () => p(t)), K(e, n);
				}), O(l), z(() => q(c, i())), K(e, o);
			}), K(e, t);
		};
		J(l, (e) => {
			t.onicon && e(d);
		});
		var g = R(l, 2);
		Br(g, 17, () => Ji, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ M(() => m(U(t), 2));
			let i = () => U(r)[0], a = () => U(r)[1];
			var o = ca(), s = L(o), c = I(s, !0);
			O(s);
			var l = R(s, 2);
			Br(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = la();
				let i;
				var a = I(r, !0);
				O(r), z(() => {
					i = Zr(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), q(a, t);
				}), W("click", r, () => f(t)), K(e, r);
			}), O(l), z(() => q(c, i())), K(e, o);
		});
		var _ = R(g, 2), v = (e) => {
			var t = ua(), n = R(L(t), 2), r = R(n, 2);
			pi(r, (e) => F(c, e), () => U(c)), k(2), W("click", n, () => U(c).click()), W("change", r, h), K(e, t);
		};
		J(_, (e) => {
			t.onimage && e(v);
		}), O(i), z(() => $r(i, `top: ${U(u).top ?? ""}px; left: ${U(u).left ?? ""}px`)), K(e, i);
	};
	J(S, (e) => {
		U(l) && e(ee);
	}), O(g), pi(g, (e) => F(s, e), () => U(s)), z(() => {
		ai(_, "title", a()), ai(_, "aria-label", a());
	}), W("click", _, () => U(l) ? F(l, !1) : d()), K(e, g), qe();
}
Sr(["click", "change"]);
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
var _a = /* @__PURE__ */ G("<button type=\"button\"> </button>"), va = /* @__PURE__ */ G("<div class=\"dd-pop svelte-vtocc6\"></div>"), ya = /* @__PURE__ */ G("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function $(e, t) {
	Ke(t, !0);
	let n = mi(t, "value", 3, null), r = mi(t, "options", 19, () => []), i = mi(t, "title", 3, null), a = mi(t, "disabled", 3, !1), o = /* @__PURE__ */ P(!1), s = /* @__PURE__ */ P(null), c = /* @__PURE__ */ P(rn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = U(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		F(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (U(o)) {
				F(o, !1);
				return;
			}
			u(), F(o, !0);
		}
	}
	function f(e) {
		F(o, !1), t.onchange?.(e);
	}
	Sn(() => {
		if (!U(o)) return;
		let e = (e) => {
			U(s) && !U(s).contains(e.target) && F(o, !1);
		}, t = (e) => {
			e.key === "Escape" && F(o, !1);
		}, n = (e) => {
			U(s) && e.target instanceof Node && !U(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = ya(), h = I(p), g = I(h), _ = I(g, !0);
	O(g);
	var v = R(g, 2), y = I(v, !0);
	O(v), O(h);
	var b = R(h, 2), x = (e) => {
		var t = va();
		Br(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ M(() => m(U(t), 2));
			let i = () => U(r)[0], a = () => U(r)[1];
			var o = _a();
			let s;
			var c = I(o, !0);
			O(o), z(() => {
				s = Zr(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), q(c, a());
			}), W("click", o, () => f(i())), K(e, o);
		}), O(t), z(() => $r(t, `top: ${U(c).top ?? ""}px; left: ${U(c).left ?? ""}px; min-width: ${U(c).width ?? ""}px`)), K(e, t);
	};
	J(b, (e) => {
		U(o) && e(x);
	}), O(p), pi(p, (e) => F(s, e), () => U(s)), z((e) => {
		ai(h, "title", i()), h.disabled = a(), q(_, e), q(y, U(o) ? "▴" : "▾");
	}, [() => l()]), W("click", h, d), K(e, p), qe();
}
Sr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var ba = /* @__PURE__ */ G("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\">Rediger nettstedsikon</h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\" title=\"Dra for å flytte utsnittet\"></canvas> <p class=\"ie-hint svelte-e7sog7\">Dra bildet for å velge utsnitt. Ikonet blir kvadratisk (128px).</p></div> <label class=\"ie-row svelte-e7sog7\">Zoom <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Lysstyrke <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Kontrast <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\">Metning <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Gråtone</button> <button type=\"button\" class=\"ghost svelte-e7sog7\">Nullstill</button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\">Avbryt</button> <button type=\"button\" class=\"primary svelte-e7sog7\">Bruk</button></span></div></div>");
function xa(e, t) {
	Ke(t, !0);
	let n = mi(t, "image", 3, ""), r = /* @__PURE__ */ P(null), i = /* @__PURE__ */ P(null), a = /* @__PURE__ */ P(1), o = /* @__PURE__ */ P(.5), s = /* @__PURE__ */ P(.5), c = /* @__PURE__ */ P(1), l = /* @__PURE__ */ P(1), u = /* @__PURE__ */ P(1);
	Sn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			F(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !U(i)) return;
		e.filter = `brightness(${U(c)}) contrast(${U(l)}) saturate(${U(u)})`;
		let n = Math.max(t / U(i).width, t / U(i).height) * U(a), r = U(i).width * n, d = U(i).height * n, f = t / 2 - U(o) * r, p = t / 2 - U(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(U(i), f, p, r, d), e.filter = "none";
	}
	Sn(() => {
		U(i), U(a), U(o), U(s), U(c), U(l), U(u), U(r) && d(U(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!U(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / U(i).width, 220 / U(i).height) * U(a), c = U(i).width * r, l = U(i).height * r, u = (e) => {
			F(o, Math.min(1, Math.max(0, U(o) - (e.clientX - t) / c)), !0), F(s, Math.min(1, Math.max(0, U(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
		}, d = () => {
			window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", d);
		};
		window.addEventListener("pointermove", u), window.addEventListener("pointerup", d);
	}
	function p() {
		F(a, 1), F(o, .5), F(s, .5), F(c, 1), F(l, 1), F(u, 1);
	}
	function m() {
		let e = document.createElement("canvas");
		e.width = 128, e.height = 128, d(e.getContext("2d"), 128), t.onapply?.(e.toDataURL("image/webp", .92));
	}
	var h = ba(), g = I(h), _ = R(I(g), 2), v = I(_);
	ai(v, "width", 220), ai(v, "height", 220), pi(v, (e) => F(r, e), () => U(r)), k(2), O(_);
	var y = R(_, 2), b = R(I(y)), x = I(b);
	O(b), O(y);
	var S = R(y, 2);
	X(S);
	var ee = R(S, 2), C = R(I(ee)), te = I(C);
	O(C), O(ee);
	var ne = R(ee, 2);
	X(ne);
	var re = R(ne, 2), ie = R(I(re)), ae = I(ie);
	O(ie), O(re);
	var oe = R(re, 2);
	X(oe);
	var se = R(oe, 2), ce = R(I(se)), le = I(ce);
	O(ce), O(se);
	var ue = R(se, 2);
	X(ue);
	var de = R(ue, 2), fe = I(de), pe = R(fe, 2);
	O(de);
	var me = R(de, 2), he = I(me), ge = R(he, 2);
	O(me), O(g), O(h), z((e, t, n, r) => {
		q(x, `${e ?? ""}x`), q(te, `${t ?? ""}%`), q(ae, `${n ?? ""}%`), q(le, `${r ?? ""}%`);
	}, [
		() => U(a).toFixed(2),
		() => Math.round(U(c) * 100),
		() => Math.round(U(l) * 100),
		() => Math.round(U(u) * 100)
	]), W("pointerdown", v, f), li(S, () => U(a), (e) => F(a, e)), li(ne, () => U(c), (e) => F(c, e)), li(oe, () => U(l), (e) => F(l, e)), li(ue, () => U(u), (e) => F(u, e)), W("click", fe, () => F(u, 0)), W("click", pe, p), W("click", he, () => t.oncancel?.()), W("click", ge, m), K(e, h), qe();
}
Sr(["pointerdown", "click"]);
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
var Vo = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ho = /* @__PURE__ */ G("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fargen\"></button>"), Uo = /* @__PURE__ */ G("<span><span class=\"grad-grip svelte-1n46o8q\" title=\"Dra for å endre fargenes rekkefølge\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\" title=\"Hvor mye plass fargen tar; 0 gir en hard kant mot nabofargen\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), Wo = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Sentrum X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Sentrum Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Go = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Vinkel <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Ko = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Form <!></label> <!> <button class=\"ghost action svelte-1n46o8q\" title=\"Ny farge nederst i listen; dra i håndtaket for rekkefølgen\">+ Legg til farge</button> <!> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label title=\"Gjelder selve gradienten - uavhengig av Animasjon-valget nederst, som gjelder innholdet\" class=\"svelte-1n46o8q\">Bevegelse <!></label>", 1), qo = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Jo = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Yo = /* @__PURE__ */ G("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\" title=\"Fyll seksjonen (beskjærer)\">Dekk</button> <button type=\"button\" class=\"ghost svelte-1n46o8q\" title=\"Vis hele bildet\">Vis hele</button></div> <label title=\"Dra punktet eller bruk sliderne. 50 % = sentrert. Gå under 0 % / over 100 % for å legge motivet delvis eller helt utenfor kanten.\" class=\"svelte-1n46o8q\">Posisjon</label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\">Vannrett <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\">Loddrett <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Xo = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Parallaksestyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label title=\"Lar parallaksen flyte forbi seksjonskanten inn i naboseksjonen. Vises der naboen er gjennomsiktig.\" class=\"svelte-1n46o8q\">Flyt inn i nabo <!></label>", 1), Zo = /* @__PURE__ */ G("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label title=\"Vanlig plasserer bildet fritt med valgt størrelse og posisjon. Flislegg gjentar bildet som et mønster.\" class=\"svelte-1n46o8q\">Tilpasning <!></label> <label title=\"Skala relativt til seksjonsbredden: 100 % = like bred som seksjonen. Dekk fyller seksjonen (beskjærer); Vis hele viser hele bildet.\" class=\"svelte-1n46o8q\">Størrelse</label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" title=\"Mindre\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" title=\"Større\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Bildet henger etter når man ruller. Av på mobil og ved redusert bevegelse.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Parallakse</label> <!>", 1), Qo = /* @__PURE__ */ G("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), $o = /* @__PURE__ */ G("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig; komprimeres til webp\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Overgang <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Uskarphet <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Bakgrunnen blar gjennom bildene med myk overgang. Med ett bilde, eller redusert bevegelse hos den besøkende, vises kun det første.</p>", 1), es = /* @__PURE__ */ G("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\"></button></span></span> <!></div>"), ts = /* @__PURE__ */ G("<p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Legg til lag</button>", 1), ns = /* @__PURE__ */ G("<input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://… eller #anker\" title=\"Ekstern lenke (https://…, mailto:, tel:) eller anker til en seksjon: #ankeret på samme side, /siden#ankeret fra en annen side. Ankeret kopieres fra seksjonens Egenskaper.\"/>"), rs = /* @__PURE__ */ G("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Lenketeksten\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern lenken\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), is = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Skyggefarge <!></label>"), as = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Kantfarge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse (px) <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" title=\"Tynnere\" aria-label=\"Tynnere\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" title=\"Tykkere\" aria-label=\"Tykkere\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), os = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Blokkfarge <!></label> <label class=\"svelte-1n46o8q\">Skygge <!></label> <!> <label class=\"svelte-1n46o8q\">Kantlinje <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Frostet glass: gjennomskinnelig kort med uskarp bakgrunn - best over bilder og gradienter\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glass-effekt (frostet)</label>", 1), ss = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Justering <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <!>", 1), cs = /* @__PURE__ */ G("<span class=\"nav-line svelte-1n46o8q\"><input title=\"Spørsmålsteksten (svaret skrives rett i blokken)\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern spørsmålet\"></button></span></span>"), ls = /* @__PURE__ */ G("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Ellers lukkes forrige svar når et nytt åpnes\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Flere svar åpne samtidig</label> <p class=\"panel-strong svelte-1n46o8q\">Spørsmål</p> <!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt spørsmål</button> <p class=\"panel-strong svelte-1n46o8q\">Kortstil</p> <!>", 1), us = /* @__PURE__ */ G("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), ds = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <!></label> <!> <label class=\"svelte-1n46o8q\">Stil <!></label>", 1), fs = /* @__PURE__ */ G("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label>"), ps = /* @__PURE__ */ G("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere, og når bildet ikke kan vises\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <!></label> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\">Fokus X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Fokus Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label title=\"Beskjærer inn mot fokuspunktet\" class=\"svelte-1n46o8q\">Zoom <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Lysstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Kontrast <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Metning <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\" title=\"Sett lysstyrke, kontrast og metning tilbake til nøytralt\">Nullstill justeringer</button>", 1), ms = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Videolenke</label> <input placeholder=\"https://youtube.com/watch?v=… eller vimeo.com/…\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Tittel (for skjermlesere) <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">YouTube og Vimeo støttes, med personvernvennlig innbygging. Videoen spilles på den publiserte siden (og i Ren visning).</p>", 1), hs = /* @__PURE__ */ G("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\" title=\"Eller skriv/lim inn et tegn selv\"/>"), gs = /* @__PURE__ */ G("<button class=\"ghost svelte-1n46o8q\" title=\"Tilbake til tegnet/emojien\">Fjern tegnet ikon</button>"), _s = /* @__PURE__ */ G("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Eget ikon\"/> <button class=\"ghost svelte-1n46o8q\">Fjern eget ikon</button></span> <p class=\"panel-hint svelte-1n46o8q\">Blokken viser det opplastede ikonet; tegnet brukes igjen når du fjerner det.</p>", 1), vs = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Ikon <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!> <label class=\"svelte-1n46o8q\">Størrelse px <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Temafarge eller egen farge. Gjelder tegnede ikoner og tekst-glyfer (★ ✓ →); emoji har sine egne farger.</p>", 1), ys = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Samling <!></label> <label class=\"svelte-1n46o8q\">Visning <!></label> <label class=\"svelte-1n46o8q\">Maks antall <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Nyeste først</label> <p class=\"panel-hint svelte-1n46o8q\">Innslagene redigeres i Samlinger-panelet; 0 i maks antall viser alle.</p>", 1), bs = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Luft mellom bildene <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), xs = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Sekunder per bilde <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Ss = /* @__PURE__ */ G("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button></span></span> <label class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"For skjermlesere\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri - vinner over fullskjerm\" class=\"svelte-1n46o8q\"/></label></div>"), Cs = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Visning <!></label> <!> <!> <label class=\"svelte-1n46o8q\">Avrunding <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder hos besøkende (prøv i Ren visning); her åpner klikk bildeeditoren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fullskjerm ved klikk (lightbox)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg gjerne flere bilder samtidig\">+ Legg til bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <p class=\"panel-hint svelte-1n46o8q\">Klikk et bilde i forhåndsvisningen for utsnitt, zoom og filtre (bildeeditoren).</p>", 1), ws = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Form <!></label> <label class=\"svelte-1n46o8q\">Farge <!></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Ts = /* @__PURE__ */ G("<button class=\"ghost svelte-1n46o8q\">Innstillinger …</button> <p class=\"panel-hint svelte-1n46o8q\">Åpner blokkens innstillinger i forhåndsvisningen.</p>", 1), Es = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Ds = /* @__PURE__ */ G("<label title=\"Avstanden fra vinduets topp mens blokken er festet; en klistret meny kan kreve større avstand\" class=\"svelte-1n46o8q\">Avstand fra toppen <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label title=\"Hvor festingen slutter: ved egen seksjon, eller først når en senere seksjon er passert\" class=\"svelte-1n46o8q\">Slipp taket <!></label>", 1), Os = /* @__PURE__ */ G("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Blokken blir stående ved vindustoppen mens besøkende scroller. Prøv i Ren visning; gjelder ikke mobil.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fest ved scrolling</label> <!>", 1), ks = /* @__PURE__ */ G("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label title=\"Høyere tall ligger foran. Mens du redigerer vises pekt/markert blokk alltid øverst - se ekte rekkefølge i Ren visning\" class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), As = /* @__PURE__ */ G("<!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Spilles når blokken scrolles inn hos besøkende; her spilles den én gang hver gang du endrer den\" class=\"svelte-1n46o8q\">Animasjon inn <!></label> <!> <label title=\"Effekt mens pekeren er over blokken; kan kombineres med animasjonen inn\" class=\"svelte-1n46o8q\">Ved peker <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plassering, lag og rotasjon</summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Kan også endres direkte på blokken: dra for å flytte, håndtakene for størrelse og rotasjon.</p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Skjul i automatisk mobil-layout (pynt)</label></div></details>", 1), js = /* @__PURE__ */ G("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\"><!> Rediger</button>"), Ms = /* @__PURE__ */ G("<button class=\"ghost svelte-1n46o8q\" title=\"Bytt side (åpner Sider-panelet)\"> </button> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\"></button> <button title=\"Mobilvisning (390px)\"></button></span> <span class=\"zoomswitch svelte-1n46o8q\"><button title=\"Tilpass lerretet til vinduet\"></button> <button title=\"Faktisk størrelse (100%)\">100%</button> <span class=\"zoom-readout svelte-1n46o8q\" title=\"Gjeldende zoom\"> </span></span> <button title=\"Hjelpelinjer: senter og innholdsbredde i alle seksjoner\"></button>", 1), Ns = /* @__PURE__ */ G("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"><!> </button>"), Ps = /* @__PURE__ */ G("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span> <button> </button>", 1), Fs = /* @__PURE__ */ G("<!> Ren visning", 1), Is = /* @__PURE__ */ G("<!> Rediger", 1), Ls = /* @__PURE__ */ G("<span class=\"who svelte-1n46o8q\"><!> </span>"), Rs = /* @__PURE__ */ G("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), zs = /* @__PURE__ */ G("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Bs = /* @__PURE__ */ G("<hr class=\"rail-sep svelte-1n46o8q\"/>"), Vs = /* @__PURE__ */ G("<button> </button>"), Hs = /* @__PURE__ */ G("<!> <!>", 1), Us = /* @__PURE__ */ G("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Ws = /* @__PURE__ */ G("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Gs = /* @__PURE__ */ G("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\"></button>"), Ks = /* @__PURE__ */ G("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\"></button> <!></span></div>"), qs = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Js = /* @__PURE__ */ G("<input placeholder=\"Navnet i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\" title=\"Tekststørrelse i px (tom = arv)\"/> <button title=\"Fet\"><b>F</b></button> <button title=\"Kursiv\"><i>K</i></button></span>", 1), Ys = /* @__PURE__ */ G("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\" title=\"Bildehøyde i px\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\" title=\"Avrunding i px\"/></span> <p class=\"panel-hint svelte-1n46o8q\">Tallfeltene: bildehøyde og avrunding (px).</p>", 1), Xs = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Rekkefølge <!></label>"), Zs = /* @__PURE__ */ G("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Myk glød i aksentfargen rundt den flytende menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Glød rundt menyen</label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger helt i toppen av siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Luft over menyen</label>", 1), Qs = /* @__PURE__ */ G("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Menyen legges oppå toppseksjonen i stedet for i eget bånd over den, så en gjennomsiktig meny viser hero bak seg. Toppseksjonen bør ha nok klaring øverst.\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Legg menyen oppå toppseksjonen</label>"), $s = /* @__PURE__ */ G("<label title=\"Justeringen av menypunktene inne i kolonnen\" class=\"svelte-1n46o8q\">Tekstjustering <!></label>"), ec = /* @__PURE__ */ G("<label title=\"Krymp: menyen blir kompakt etter et stykke scrolling. Skjul: menyen glir ut ved scrolling nedover og kommer tilbake ved scrolling oppover. Øverst på siden er den alltid normal. Prøves i Ren visning.\" class=\"svelte-1n46o8q\">Ved scrolling <!></label>"), tc = /* @__PURE__ */ G("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Av: menyen ligger kun øverst og forsvinner når man blar nedover\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Klistrete meny (følger med når man blar)</label> <!>", 1), nc = /* @__PURE__ */ G("<label title=\"Hvor sterk gløden bak teksten er\" class=\"svelte-1n46o8q\">Glødstyrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), rc = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\"> <!></label>"), ic = /* @__PURE__ */ G("<label title=\"Fargen på pille-punktene (standard er undermenyens flate)\" class=\"svelte-1n46o8q\">Punktfarge <!></label>"), ac = /* @__PURE__ */ G("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input title=\"Teksten i undermenyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra undermenyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), oc = /* @__PURE__ */ G("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til undermenypunkt\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), sc = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Logo</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Type <!></label> <!> <!> <!> <p class=\"panel-hint svelte-1n46o8q\">Logoen er også «Hjem»-knappen (klikk går til forsiden).</p></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Sidestilt meny: dra i kolonnekanten i forhåndsvisningen for å endre bredden; på mobil og trange vinduer vises den som topplinje\" class=\"svelte-1n46o8q\">Navigasjonsmeny <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Innholdet bak menyen sløres (synlig når bakgrunnen er gjennomsiktig)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Uskarphet bak menyen</label> <label class=\"svelte-1n46o8q\">Størrelse <!></label> <label class=\"svelte-1n46o8q\">Menyplassering <!></label> <!> <label class=\"svelte-1n46o8q\">Lenke-hover <!></label> <!> <!> <label title=\"Tekstfargen når pekeren er over et menypunkt\" class=\"svelte-1n46o8q\">Tekstfarge ved hover <!></label> <label class=\"svelte-1n46o8q\">Tekstfarge <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Undermeny</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Design <!></label> <!> <label title=\"Punktene i undermenyen legges i rutenett: 2 kolonner gir 2x2, 2x3 osv.\" class=\"svelte-1n46o8q\">Kolonner <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Menypunkter</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Nytt menypunkt</button> <p class=\"panel-hint svelte-1n46o8q\">Punkt med undermeny får en pilknapp i menyen; uten egen lenke blir hele punktet åpneren.</p></div></details></div>"), cc = /* @__PURE__ */ G("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"Nettstedsikon\"/>"), lc = /* @__PURE__ */ G("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Rediger ikonet (beskjær, zoom, filtre)\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern ikonet (Urd-merket brukes)\"></button>", 1), uc = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><label title=\"Vises i nettleserfanen etter sidenavnet, og som standardtekst i menylogoen\" class=\"svelte-1n46o8q\">Navn <input placeholder=\"Navn på nettstedet\" class=\"svelte-1n46o8q\"/></label> <label title=\"Kort beskrivelse av nettstedet - brukt av søkemotorer og ved deling\" class=\"svelte-1n46o8q\">Beskrivelse <input placeholder=\"Kort om nettstedet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Nettstedsikon <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Vises i nettleserfanen og bokmerker; redigeres til 128px\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), dc = /* @__PURE__ */ G("<div class=\"tpv-cap svelte-1n46o8q\"> </div>"), fc = /* @__PURE__ */ G("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\">Overskrift</div> <div class=\"tpv-card svelte-1n46o8q\">Litt brødtekst på et kort.</div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\">Knapp</span><span class=\"tpv-lnk svelte-1n46o8q\">Lenke</span></div></div></div>"), pc = /* @__PURE__ */ G("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), mc = /* @__PURE__ */ G("<div class=\"autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\">Mørke farger</span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\">Auto</button> <button type=\"button\">Egne</button></span></div>"), hc = /* @__PURE__ */ G("<span class=\"palname svelte-1n46o8q\">Lys</span>"), gc = /* @__PURE__ */ G("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), _c = /* @__PURE__ */ G("<p class=\"panel-hint svelte-1n46o8q\">Avledet fra de lyse fargene - klikk en rute for å styre dem selv.</p>"), vc = /* @__PURE__ */ G("<div class=\"palhead svelte-1n46o8q\"><span class=\"palname svelte-1n46o8q\">Mørk</span> <button type=\"button\" title=\"Sett mørk som standard\">Standard</button></div> <div></div> <!>", 1), yc = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\">Tema-forslag</p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\">Farger</p> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gir siden en sol/måne-bryter i menyen\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Lys og mørk modus</label> <!> <div class=\"palhead svelte-1n46o8q\"><!> <button type=\"button\" title=\"Modusen nye besøkende ser først\">Standard</button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Typografi</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Overskrifter <!></label> <label class=\"svelte-1n46o8q\">Brødtekst <!></label> <div class=\"typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\">Overskrift</div> <div class=\"ts-b svelte-1n46o8q\">Litt brødtekst i valgt skrift - slik leser folk innholdet ditt.</div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Form (hjørner)</summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\">Knapp</span> <span class=\"fp-card svelte-1n46o8q\">Kort</span></div> <label class=\"rng-lab svelte-1n46o8q\">Små hjørner<span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"rng-lab svelte-1n46o8q\">Store hjørner<span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), bc = /* @__PURE__ */ G("<button class=\"ghost svelte-1n46o8q\"> </button>"), xc = /* @__PURE__ */ G("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Sc = /* @__PURE__ */ G("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Plugins</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Cc = /* @__PURE__ */ G("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\" title=\"YouTube eller Vimeo (lenken limes inn i Egenskaper)\">Video</button> <button class=\"ghost svelte-1n46o8q\" title=\"Glyf/emoji i valgfri størrelse og farge\">Ikon</button> <button class=\"ghost svelte-1n46o8q\" title=\"Nyheter/oppslag/arkiv fra en samling (Samlinger-panelet)\">Samling</button> <button class=\"ghost svelte-1n46o8q\" title=\"Spørsmål og svar der svaret foldes ut ved klikk\">FAQ</button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Galleri</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Bildegalleri med rutenett-, karusell- eller lysbildevisning\">Tomt galleri</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Velg flere bilder samtidig og få dem rett inn i et galleri\">Galleri med bilder <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details> <!></div>"), wc = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Tc = /* @__PURE__ */ G("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Ec = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Dc = /* @__PURE__ */ G("<label title=\"Tid mellom hvert kort (En etter en) eller hver kolonne (Kolonnevis)\" class=\"svelte-1n46o8q\">Trinn ms <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label title=\"En etter en: hvert kort ett trinn etter forrige. Kolonnevis: kort i samme kolonne kommer samtidig, bølgen skyves bortover.\" class=\"svelte-1n46o8q\">Mønster <!></label>", 1), Oc = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>"), kc = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Ac = /* @__PURE__ */ G("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Ferdig fargerolle for seksjonen: overstyrer temaets farger på denne seksjonen (Aksent-flate, mørkt kontrastbånd o.l.). Følger lys/mørk automatisk.\" class=\"svelte-1n46o8q\">Seksjonstema <!></label> <label title=\"Seksjonens ankermål for lenker: lim inn i lenkefeltet på footer-kolonner, menypunkter eller knapper. Samme side: #ankeret - fra en annen side: /siden#ankeret.\" class=\"svelte-1n46o8q\">Anker <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Kopier ankeret\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label title=\"Spilles når seksjonen scrolles inn hos besøkende; her spilles den én gang hver gang du endrer den\" class=\"svelte-1n46o8q\">Animasjon inn <!></label> <!> <label title=\"Effekt mens pekeren er over seksjonen; kan kombineres med animasjonen inn\" class=\"svelte-1n46o8q\">Ved peker <!></label>", 1), jc = /* @__PURE__ */ G("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), Mc = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Nc = /* @__PURE__ */ G("<label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fjern haken for å skjule footeren på denne siden\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Pc = /* @__PURE__ */ G("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Vis på sider</summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Fc = /* @__PURE__ */ G("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Ic = /* @__PURE__ */ G("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern logoen\"></button>"), Lc = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Logohøyde <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Rc = /* @__PURE__ */ G("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\" title=\"Komprimeres automatisk til webp; materialiseres til media/ ved publisering\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), zc = /* @__PURE__ */ G("<div class=\"nav-row svelte-1n46o8q\"><input title=\"Kolonnens overskrift\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til lenke i kolonnen\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern kolonnen\"></button></span></div> <!>", 1), Bc = /* @__PURE__ */ G("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern lenken\"></button></span> <input class=\"nav-target svelte-1n46o8q\" placeholder=\"https://… / mailto:…\"/></div>"), Vc = /* @__PURE__ */ G("<input placeholder=\"https://… / mailto:… / #anker\" title=\"Ekstern lenke (https://…, mailto:, tel:) eller anker til en seksjon: #ankeret på samme side, /siden#ankeret fra en annen side. Ankeret kopieres fra seksjonens Egenskaper.\" class=\"svelte-1n46o8q\"/>"), Hc = /* @__PURE__ */ G("<label title=\"Hvor knappen går\" class=\"svelte-1n46o8q\">Knappen går til <!></label> <!>", 1), Uc = /* @__PURE__ */ G("<label title=\"Skjema-adresse fra en tjeneste (Formspree/Mailchimp/Buttondown) eller egen Cloudflare-function; sendes med fetch. Ekstern vert krever at du legger connect-src for verten i _headers.\" class=\"svelte-1n46o8q\">Nyhetsbrev-endepunkt <input placeholder=\"https://formspree.io/f/…\" class=\"svelte-1n46o8q\"/></label> <label title=\"Fallback når endepunkt mangler: åpner e-post til denne adressen\" class=\"svelte-1n46o8q\">Mottaker (fallback) <input placeholder=\"post@dinforening.no\" class=\"svelte-1n46o8q\"/></label> <label title=\"Bekreftelsen som vises etter påmelding\" class=\"svelte-1n46o8q\">Bekreftelse <input placeholder=\"Takk, du er påmeldt!\" class=\"svelte-1n46o8q\"/></label>", 1), Wc = /* @__PURE__ */ G("<label title=\"Knapp går til en side/lenke; nyhetsbrev tar imot e-post\" class=\"svelte-1n46o8q\">Type <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Stor, sentrert variant (Stor CTA-stilen)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Stor sentrert</label> <label title=\"Overskrift over knappen/feltet\" class=\"svelte-1n46o8q\">Overskrift <input placeholder=\"Klar til å bli med?\" class=\"svelte-1n46o8q\"/></label> <label title=\"Kort undertekst\" class=\"svelte-1n46o8q\">Undertekst <input class=\"svelte-1n46o8q\"/></label> <label title=\"Teksten på knappen\" class=\"svelte-1n46o8q\">Knappetekst <input placeholder=\"Bli medlem\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Gc = /* @__PURE__ */ G("<label title=\"Justering av innholdet (mest merkbart uten kolonner)\" class=\"svelte-1n46o8q\">Justering <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Kc = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Footeren redigeres ett sted og vises nederst på alle sider (unntatt sider du skrur av under «Vis på sider»)\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis footer</label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Startpunkt</summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\">Merkevare</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Navnet øverst i footeren. Tomt = ingen merkevare\" class=\"svelte-1n46o8q\">Tittel <input placeholder=\"Min forening\" class=\"svelte-1n46o8q\"/></label> <label title=\"Kort undertekst under navnet\" class=\"svelte-1n46o8q\">Tagline <input class=\"svelte-1n46o8q\"/></label> <label title=\"Vis merket som tekst, opplastet logo (bilde) eller begge\" class=\"svelte-1n46o8q\">Vis merke som <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Kolonner</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny kolonne</button> <label title=\"Når en kolonne har mange lenker deles den i to underkolonner - her velger du om overskriften står til venstre eller midtstilt over paret\" class=\"svelte-1n46o8q\">Justering av delt kolonne <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Sosiale lenker</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny sosial lenke</button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Handlingsoppfordring</summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\" title=\"En knapp eller nyhetsbrev-påmelding i footeren\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Vis handlingsoppfordring</label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Lenkerad (sentrert)</summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\">+ Ny lenke i raden</button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Utseende</summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Bunnlinje</summary> <div class=\"group-items svelte-1n46o8q\"><label title=\"Copyright/tekst til venstre i bunnlinja\" class=\"svelte-1n46o8q\">Copyright <input placeholder=\"© 2026 Min forening\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\">Lenker til høyre</p> <!> <button class=\"ghost action svelte-1n46o8q\">+ Ny bunnlinje-lenke</button></div></details></div>"), qc = /* @__PURE__ */ G("<label class=\"svelte-1n46o8q\">Samling <!></label>"), Jc = /* @__PURE__ */ G("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern bildet\"></button>", 1), Yc = /* @__PURE__ */ G("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input title=\"Tittel\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett innslaget\"></button></span></span> <label class=\"svelte-1n46o8q\">Dato <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" placeholder=\"Tekst/ingress (formater med teksteditoren i blokken på siden)\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør tittelen klikkbar)\" class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), Xc = /* @__PURE__ */ G("<p class=\"panel-hint svelte-1n46o8q\">Ingen innslag ennå.</p>"), Zc = /* @__PURE__ */ G("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\">+ Nytt innslag</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett hele samlingen (filen fjernes ved neste publisering)\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Qc = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Samlinger er lister av innslag (nyheter, oppslag, publikasjoner) som\n                  vises av Samling-blokker. Endringer her er utkast til du publiserer (utenfor Ctrl+Z).</p> <!> <!> <label class=\"svelte-1n46o8q\">Navn på ny samling <input placeholder=\"F.eks. Nyheter\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Type <!></label> <button class=\"ghost action svelte-1n46o8q\">+ Opprett samling</button></div>"), $c = /* @__PURE__ */ G("<p class=\"panel-hint svelte-1n46o8q\">Ingen plugins i listen ennå. Legg en plugin-mappe i plugins/ i repoet og skriv mappenavnet under.</p>"), el = /* @__PURE__ */ G("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), tl = /* @__PURE__ */ G("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), nl = /* @__PURE__ */ G("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra listen (mappen i plugins/ består)\"></button></span></span> <!></div>"), rl = /* @__PURE__ */ G("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Legg til og aktiver\"></button></span></span></div>"), il = /* @__PURE__ */ G("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\">Funnet i repoets plugins/-mappe:</p> <!>", 1), al = /* @__PURE__ */ G("<p class=\"panel-hint svelte-1n46o8q\">Nye plugins dukker opp her automatisk når mappen deres er lagt i plugins/ i repoet.</p>"), ol = /* @__PURE__ */ G("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Mappenavn i plugins/ (f.eks. kalender)\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\">+ Legg til plugin</button> <!>", 1), sl = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Plugins utvider Urd med nye blokker, seksjonsmaler, bakgrunner og animasjoner.\n                  En plugin er en mappe i plugins/ i repoet ditt; her styrer du hvilke som er aktive.\n                  Endringer gjelder fra neste publisering.</p> <!> <!> <!> <!></div>"), cl = /* @__PURE__ */ G("<p class=\"panel-hint svelte-1n46o8q\">Henter historikken…</p>"), ll = /* @__PURE__ */ G("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), ul = /* @__PURE__ */ G("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), dl = /* @__PURE__ */ G("<button class=\"ghost svelte-1n46o8q\">↩ Angre siste publisering</button> <!>", 1), fl = /* @__PURE__ */ G("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Siste publiseringer. Angring lager en ny commit som gjenoppretter forrige tilstand - ingenting slettes.</p> <!></div>"), pl = /* @__PURE__ */ G("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), ml = /* @__PURE__ */ G("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), hl = /* @__PURE__ */ G("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div></div>"), gl = /* @__PURE__ */ G("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), _l = /* @__PURE__ */ G("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), vl = /* @__PURE__ */ G("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), yl = /* @__PURE__ */ G("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\">Velkommen til Urd!</h2> <p class=\"panel-hint svelte-1n46o8q\">Dette ser ut som en fersk side. Gi den navn og farger her, så er\n          grunnlaget på plass - alt kan endres senere i panelene.</p> <label class=\"svelte-1n46o8q\">Sidens navn <input placeholder=\"F.eks. foreningens navn\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksentfarge (knapper og lenker) <!></label> <label class=\"svelte-1n46o8q\">Bakgrunnsfarge <!></label> <p class=\"panel-hint svelte-1n46o8q\">Navnet brukes også som logo i menyen. Husk å trykke Publiser\n          etterpå, så endringene blir synlige for besøkende.</p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Hopp over</button> <button class=\"primary svelte-1n46o8q\">Sett i gang</button></span></div></div>"), bl = /* @__PURE__ */ G("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), xl = /* @__PURE__ */ G("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Lukk (Esc)\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), Sl = /* @__PURE__ */ G("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><span class=\"brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"0 0 40 40\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <!> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function Cl(e, t) {
	Ke(t, !0);
	let n = (e, t = d, n = d) => {
		var r = ts(), i = R(L(r), 2);
		Br(i, 17, n, Ir, (e, r, i) => {
			var a = es(), s = I(a), l = I(s);
			{
				let e = /* @__PURE__ */ M(() => o.map(([e, t]) => [e, t.label]));
				$(l, {
					get value() {
						return U(r).type;
					},
					title: "Bytt lagtype (innstillingene nullstilles)",
					get options() {
						return U(e);
					},
					onchange: (e) => en(t(), i, e)
				});
			}
			var u = R(l, 2), d = I(u);
			d.disabled = i === 0, Y(d, () => c.up, !0), O(d);
			var f = R(d, 2);
			Y(f, () => c.down, !0), O(f);
			var p = R(f, 2);
			Y(p, () => c.cross, !0), O(p), O(u), O(s);
			var m = R(s, 2), h = (e) => {
				var n = Vo(), a = L(n), o = R(I(a));
				{
					let e = /* @__PURE__ */ M(gn);
					Pi(o, {
						get value() {
							return U(r).props.value;
						},
						get tokens() {
							return U(e);
						},
						label: "Lagets farge",
						onchange: (e) => Lt(t(), i, "value", e)
					});
				}
				O(a);
				var s = R(a, 2), c = R(I(s)), l = I(c);
				O(c), O(s);
				var u = R(s, 2);
				X(u), z((e) => {
					q(l, `${e ?? ""}%`), Z(u, U(r).props.opacity ?? 1);
				}, [() => Math.round((U(r).props.opacity ?? 1) * 100)]), W("input", u, (e) => Lt(t(), i, "opacity", Number(e.target.value))), K(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ M(() => Ut(U(r))), a = /* @__PURE__ */ M(() => U(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Ko(), s = L(o), l = R(I(s));
				{
					let e = /* @__PURE__ */ M(() => U(n).kind ?? "linear"), r = /* @__PURE__ */ M(() => [["linear", Q("opt.grad.linear")], ["radial", Q("opt.grad.radial")]]);
					$(l, {
						get value() {
							return U(e);
						},
						get options() {
							return U(r);
						},
						onchange: (e) => qt(t(), i, e)
					});
				}
				O(s);
				var u = R(s, 2);
				Br(u, 17, () => U(n).stops, Ir, (e, r, o) => {
					var s = Uo();
					let l;
					var u = I(s), d = R(u, 2);
					{
						let e = /* @__PURE__ */ M(gn);
						Pi(d, {
							get value() {
								return U(r).color;
							},
							get tokens() {
								return U(e);
							},
							label: "Fargen",
							onchange: (e) => Jt(t(), i, o, { color: e })
						});
					}
					var f = R(d, 2);
					X(f);
					var p = R(f, 2), m = I(p);
					O(p);
					var h = R(p, 2), g = (e) => {
						var n = Ho();
						Y(n, () => c.cross, !0), O(n), W("click", n, () => Xt(t(), i, o)), K(e, n);
					};
					J(h, (e) => {
						U(n).stops.length > 2 && e(g);
					}), O(s), z((e) => {
						l = Zr(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: U(Qt)?.layer === i && U(Qt).from === o,
							"drop-above": U(Qt)?.layer === i && U(Qt).insert === o,
							"drop-below": U(Qt)?.layer === i && U(Qt).insert === U(n).stops.length && o === U(n).stops.length - 1
						}), Z(f, U(r).share ?? 50), q(m, `${e ?? ""}%`);
					}, [() => U(a) > 0 ? Math.round(Math.max(0, Number(U(r).share) || 0) / U(a) * 100) : Math.round(100 / U(n).stops.length)]), W("pointerdown", u, (e) => $t(t(), e, i, o)), W("input", f, (e) => Jt(t(), i, o, { share: Number(e.target.value) })), K(e, s);
				});
				var d = R(u, 2), f = R(d, 2), p = (e) => {
					var r = Wo(), a = L(r), o = R(I(a)), s = I(o);
					O(o), O(a);
					var c = R(a, 2);
					X(c);
					var l = R(c, 2), u = R(I(l)), d = I(u);
					O(u), O(l);
					var f = R(l, 2);
					X(f), z((e, t) => {
						q(s, `${e ?? ""}%`), Z(c, U(n).x ?? .5), q(d, `${t ?? ""}%`), Z(f, U(n).y ?? .5);
					}, [() => Math.round((U(n).x ?? .5) * 100), () => Math.round((U(n).y ?? .5) * 100)]), W("input", c, (e) => Gt(t(), i, "x", Number(e.target.value))), W("input", f, (e) => Gt(t(), i, "y", Number(e.target.value))), K(e, r);
				}, m = (e) => {
					var r = Go(), a = L(r), o = R(I(a)), s = I(o);
					O(o), O(a);
					var c = R(a, 2);
					X(c), z(() => {
						q(s, `${U(n).angle ?? ""}°`), Z(c, U(n).angle);
					}), W("input", c, (e) => Gt(t(), i, "angle", Number(e.target.value))), K(e, r);
				};
				J(f, (e) => {
					(U(n).kind ?? "linear") === "radial" ? e(p) : e(m, -1);
				});
				var h = R(f, 2), g = R(I(h)), _ = I(g);
				O(g), O(h);
				var v = R(h, 2);
				X(v);
				var y = R(v, 2), b = R(I(y));
				{
					let e = /* @__PURE__ */ M(() => U(n).animation ?? "none");
					$(b, {
						get value() {
							return U(e);
						},
						get options() {
							return Kt[(U(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Gt(t(), i, "animation", e)
					});
				}
				O(y), z((e) => {
					q(_, `${e ?? ""}%`), Z(v, U(n).opacity ?? 1);
				}, [() => Math.round((U(n).opacity ?? 1) * 100)]), W("click", d, () => Yt(t(), i)), W("input", v, (e) => Gt(t(), i, "opacity", Number(e.target.value))), K(e, o);
			}, _ = (e) => {
				var n = qo(), a = L(n), o = R(I(a));
				{
					let e = /* @__PURE__ */ M(gn);
					Pi(o, {
						get value() {
							return U(r).props.color;
						},
						get tokens() {
							return U(e);
						},
						label: "Glødens farge",
						onchange: (e) => Lt(t(), i, "color", e)
					});
				}
				O(a);
				var s = R(a, 2), c = R(I(s)), l = I(c);
				O(c), O(s);
				var u = R(s, 2);
				X(u);
				var d = R(u, 2), f = R(I(d)), p = I(f);
				O(f), O(d);
				var m = R(d, 2);
				X(m);
				var h = R(m, 2), g = R(I(h)), _ = I(g);
				O(g), O(h);
				var v = R(h, 2);
				X(v);
				var y = R(v, 2), b = R(I(y)), x = I(b);
				O(b), O(y);
				var S = R(y, 2);
				X(S), z((e, t, n, i) => {
					q(l, `${e ?? ""}%`), Z(u, U(r).props.x), q(p, `${t ?? ""}%`), Z(m, U(r).props.y), q(_, `${n ?? ""}%`), Z(v, U(r).props.radius), q(x, `${i ?? ""}%`), Z(S, U(r).props.opacity);
				}, [
					() => Math.round(U(r).props.x * 100),
					() => Math.round(U(r).props.y * 100),
					() => Math.round(U(r).props.radius * 100),
					() => Math.round(U(r).props.opacity * 100)
				]), W("input", u, (e) => Lt(t(), i, "x", Number(e.target.value))), W("input", m, (e) => Lt(t(), i, "y", Number(e.target.value))), W("input", v, (e) => Lt(t(), i, "radius", Number(e.target.value))), W("input", S, (e) => Lt(t(), i, "opacity", Number(e.target.value))), K(e, n);
			}, v = (e) => {
				var n = Jo(), a = L(n), o = R(I(a)), s = I(o);
				O(o), O(a);
				var c = R(a, 2);
				X(c), z((e) => {
					q(s, `${e ?? ""}%`), Z(c, U(r).props.opacity);
				}, [() => Math.round(U(r).props.opacity * 100)]), W("input", c, (e) => Lt(t(), i, "opacity", Number(e.target.value))), K(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ M(() => U(r).props.fit === "flislegg" || U(r).props.fit === "repeat");
				var a = Zo(), o = L(a), s = I(o), c = R(s);
				O(o);
				var l = R(o, 2), u = R(I(l));
				{
					let e = /* @__PURE__ */ M(() => U(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ M(() => [["vanlig", Q("opt.img.plain")], ["flislegg", Q("opt.img.tile")]]);
					$(u, {
						get value() {
							return U(e);
						},
						get options() {
							return U(r);
						},
						onchange: (e) => Lt(t(), i, "fit", e)
					});
				}
				O(l);
				var d = R(l, 4), f = I(d), p = R(f, 2);
				X(p);
				var m = R(p, 4);
				O(d);
				var h = R(d, 2), g = (e) => {
					var n = Yo(), a = L(n), o = I(a), s = R(o, 2);
					O(a);
					var c = R(a, 4), l = R(c, 2), u = R(I(l)), d = I(u);
					O(u), O(l);
					var f = R(l, 2);
					X(f);
					var p = R(f, 2), m = R(I(p)), h = I(m);
					O(m), O(p);
					var g = R(p, 2);
					X(g), z((e, t, n, i) => {
						$r(c, `--fx:${e ?? ""}%; --fy:${t ?? ""}%`), q(d, `${n ?? ""}%`), Z(f, U(r).props.x ?? .5), q(h, `${i ?? ""}%`), Z(g, U(r).props.y ?? .5);
					}, [
						() => Math.max(0, Math.min(1, U(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, U(r).props.y ?? .5)) * 100,
						() => Math.round((U(r).props.x ?? .5) * 100),
						() => Math.round((U(r).props.y ?? .5) * 100)
					]), W("click", o, () => Ht(t(), i, U(r), "cover")), W("click", s, () => Ht(t(), i, U(r), "contain")), W("pointerdown", c, (e) => Rt(e, t(), i, "xy")), W("input", f, (e) => Lt(t(), i, "x", Number(e.target.value))), W("input", g, (e) => Lt(t(), i, "y", Number(e.target.value))), K(e, n);
				};
				J(h, (e) => {
					U(n) || e(g);
				});
				var _ = R(h, 2), v = R(I(_)), y = I(v);
				O(v), O(_);
				var b = R(_, 2);
				X(b);
				var x = R(b, 2), S = R(I(x)), ee = I(S);
				O(S), O(x);
				var C = R(x, 2);
				X(C);
				var te = R(C, 2), ne = I(te);
				X(ne), k(), O(te);
				var re = R(te, 2), ie = (e) => {
					var n = Xo(), a = L(n), o = R(I(a)), s = I(o);
					O(o), O(a);
					var c = R(a, 2);
					X(c);
					var l = R(c, 2), u = R(I(l));
					{
						let e = /* @__PURE__ */ M(() => U(r).props.bleed ?? "none"), n = /* @__PURE__ */ M(() => [
							["none", Q("common.none")],
							["up", Q("opt.bleed.up")],
							["down", Q("opt.bleed.down")],
							["both", Q("opt.brand.both")]
						]);
						$(u, {
							get value() {
								return U(e);
							},
							get options() {
								return U(n);
							},
							onchange: (e) => Lt(t(), i, "bleed", e)
						});
					}
					O(l), z((e) => {
						q(s, `${e ?? ""}%`), Z(c, U(r).props.parallax ?? .3);
					}, [() => Math.round((U(r).props.parallax ?? 0) * 100)]), W("input", c, (e) => Lt(t(), i, "parallax", Number(e.target.value))), K(e, n);
				};
				J(re, (e) => {
					(U(r).props.parallax ?? 0) > 0 && e(ie);
				}), z((e, t) => {
					q(s, `${U(r).props.src ? "Bytt bilde" : "Velg bilde"} `), Z(p, e), q(y, `${U(r).props.blur ?? 0 ?? ""} px`), Z(b, U(r).props.blur ?? 0), q(ee, `${t ?? ""}%`), Z(C, U(r).props.opacity ?? 1), ii(ne, (U(r).props.parallax ?? 0) > 0);
				}, [() => Math.round((U(r).props.size ?? 1) * 100), () => Math.round((U(r).props.opacity ?? 1) * 100)]), W("change", c, (e) => sn(t(), i, e)), W("click", f, () => Bt(t(), i, U(r).props.size ?? 1, -.05)), W("change", p, (e) => Vt(t(), i, e.target.value)), W("click", m, () => Bt(t(), i, U(r).props.size ?? 1, .05)), W("input", b, (e) => Lt(t(), i, "blur", Number(e.target.value))), W("input", C, (e) => Lt(t(), i, "opacity", Number(e.target.value))), W("change", ne, (e) => Lt(t(), i, "parallax", e.target.checked ? .3 : 0)), K(e, a);
			}, b = (e) => {
				var n = $o(), a = L(n), o = R(I(a));
				O(a);
				var s = R(a, 2);
				Br(s, 17, () => U(r).props.images ?? [], Ir, (e, n, a) => {
					var o = Qo(), s = L(o), l = I(s), u = R(l, 2), d = I(u);
					d.disabled = a === 0, Y(d, () => c.up, !0), O(d);
					var f = R(d, 2);
					Y(f, () => c.down, !0), O(f);
					var p = R(f, 2);
					Y(p, () => c.cross, !0), O(p), O(u), O(s);
					var m = R(s, 2), h = R(I(m)), g = I(h);
					O(h), O(m);
					var _ = R(m, 2);
					X(_);
					var v = R(_, 2), y = R(I(v)), b = I(y);
					O(y), O(v);
					var x = R(v, 2);
					X(x), z((e, t) => {
						ai(l, "src", U(n).src), f.disabled = a === U(r).props.images.length - 1, q(g, `${e ?? ""}%`), Z(_, U(n).x ?? .5), q(b, `${t ?? ""}%`), Z(x, U(n).y ?? .5);
					}, [() => Math.round((U(n).x ?? .5) * 100), () => Math.round((U(n).y ?? .5) * 100)]), W("click", d, () => ln(t(), i, a, -1)), W("click", f, () => ln(t(), i, a, 1)), W("click", p, () => un(t(), i, a)), W("input", _, (e) => dn(t(), i, a, "x", Number(e.target.value))), W("input", x, (e) => dn(t(), i, a, "y", Number(e.target.value))), K(e, o);
				});
				var l = R(s, 2), u = R(I(l));
				{
					let e = /* @__PURE__ */ M(() => U(r).props.fit ?? "cover"), n = /* @__PURE__ */ M(() => [["cover", Q("opt.fit.cover")], ["contain", Q("opt.fit.contain")]]);
					$(u, {
						get value() {
							return U(e);
						},
						get options() {
							return U(n);
						},
						onchange: (e) => Lt(t(), i, "fit", e)
					});
				}
				O(l);
				var d = R(l, 2), f = R(I(d));
				X(f), O(d);
				var p = R(d, 2), m = R(I(p)), h = I(m);
				O(m), O(p);
				var g = R(p, 2);
				X(g);
				var _ = R(g, 2), v = R(I(_)), y = I(v);
				O(v), O(_);
				var b = R(_, 2);
				X(b);
				var x = R(b, 2), S = R(I(x)), ee = I(S);
				O(S), O(x);
				var C = R(x, 2);
				X(C), k(2), z((e, t) => {
					Z(f, U(r).props.interval ?? 6), q(h, `${e ?? ""} s`), Z(g, U(r).props.fade ?? 1.5), q(y, `${U(r).props.blur ?? 0 ?? ""} px`), Z(b, U(r).props.blur ?? 0), q(ee, `${t ?? ""}%`), Z(C, U(r).props.opacity ?? 1);
				}, [() => (U(r).props.fade ?? 1.5).toFixed(1), () => Math.round((U(r).props.opacity ?? 1) * 100)]), W("change", o, (e) => cn(t(), i, e)), W("change", f, (e) => Lt(t(), i, "interval", Number(e.target.value))), W("input", g, (e) => Lt(t(), i, "fade", Number(e.target.value))), W("input", b, (e) => Lt(t(), i, "blur", Number(e.target.value))), W("input", C, (e) => Lt(t(), i, "opacity", Number(e.target.value))), K(e, n);
			};
			J(m, (e) => {
				U(r).type === "color" ? e(h) : U(r).type === "gradient" ? e(g, 1) : U(r).type === "glow" ? e(_, 2) : U(r).type === "grain" ? e(v, 3) : U(r).type === "image" ? e(y, 4) : U(r).type === "bildegalleri" && e(b, 5);
			}), O(a), z(() => f.disabled = i === n().length - 1), W("click", d, () => It(t(), i, -1)), W("click", f, () => It(t(), i, 1)), W("click", p, () => Ft(t(), i)), K(e, a);
		});
		var a = R(i, 2), s = R(I(a));
		{
			let e = /* @__PURE__ */ M(() => o.map(([e, t]) => [e, t.label]));
			$(s, {
				get value() {
					return U(Nt);
				},
				get options() {
					return U(e);
				},
				onchange: (e) => F(Nt, e, !0)
			});
		}
		O(a), W("click", R(a, 2), () => Pt(t(), U(Nt))), K(e, r);
	}, r = (e, t = d, n = d) => {
		var r = Ar();
		Br(L(r), 17, n, Ir, (e, r, i) => {
			var a = rs(), o = I(a);
			X(o);
			var s = R(o, 2), l = I(s);
			l.disabled = i === 0, Y(l, () => c.up, !0), O(l);
			var u = R(l, 2);
			Y(u, () => c.down, !0), O(u);
			var d = R(u, 2);
			Y(d, () => c.cross, !0), O(d), O(s);
			var f = R(s, 2), p = I(f);
			{
				let e = /* @__PURE__ */ M(() => U(r).page ?? "__href"), n = /* @__PURE__ */ M(() => [...U(E).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
				$(p, {
					get value() {
						return U(e);
					},
					title: "Hvor lenken går",
					get options() {
						return U(n);
					},
					onchange: (e) => ca(t(), i, e)
				});
			}
			O(f);
			var m = R(f, 2), h = (e) => {
				var n = ns();
				X(n), z(() => Z(n, U(r).href ?? "")), W("change", n, (e) => la(t(), i, e.target.value)), K(e, n);
			};
			J(m, (e) => {
				U(r).page || e(h);
			}), O(a), z(() => {
				Z(o, U(r).label), u.disabled = i === n().length - 1;
			}), W("input", o, (e) => sa(t(), i, e.target.value)), W("click", l, () => oa(t(), i, -1)), W("click", u, () => oa(t(), i, 1)), W("click", d, () => aa(t(), i)), K(e, a);
		}), K(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ M(() => U(A).props.boxStyle ?? {});
		var n = os(), r = L(n), i = R(I(r));
		{
			let e = /* @__PURE__ */ M(() => U(t).bg ?? ""), n = /* @__PURE__ */ M(gn);
			Pi(i, {
				get value() {
					return U(e);
				},
				get tokens() {
					return U(n);
				},
				allowClear: !0,
				label: "Bakgrunnsfarge for boksen (tom = temaets flate)",
				onchange: (e) => ut({ bg: e || null })
			});
		}
		O(r);
		var a = R(r, 2), o = R(I(a));
		{
			let e = /* @__PURE__ */ M(() => U(t).shadow ?? ""), n = /* @__PURE__ */ M(() => [
				["", Q("common.none")],
				["soft", Q("opt.shadow.soft")],
				["strong", Q("opt.shadow.strong")]
			]);
			$(o, {
				get value() {
					return U(e);
				},
				get options() {
					return U(n);
				},
				onchange: (e) => ut({ shadow: e || null })
			});
		}
		O(a);
		var s = R(a, 2), c = (e) => {
			var n = is(), r = R(I(n));
			{
				let e = /* @__PURE__ */ M(() => U(t).shadowColor ?? ""), n = /* @__PURE__ */ M(gn);
				Pi(r, {
					get value() {
						return U(e);
					},
					get tokens() {
						return U(n);
					},
					allowClear: !0,
					label: "Skyggens farge (tom = svart)",
					onchange: (e) => ut({ shadowColor: e || null })
				});
			}
			O(n), K(e, n);
		};
		J(s, (e) => {
			U(t).shadow && e(c);
		});
		var l = R(s, 2), u = R(I(l));
		{
			let e = /* @__PURE__ */ M(() => U(t).border === "none" ? "none" : U(t).border ? "custom" : ""), n = /* @__PURE__ */ M(() => [
				["", Q("opt.border.theme")],
				["none", Q("common.none")],
				["custom", Q("opt.border.custom")]
			]);
			$(u, {
				get value() {
					return U(e);
				},
				get options() {
					return U(n);
				},
				onchange: (e) => ut({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		O(l);
		var d = R(l, 2), f = (e) => {
			let n = /* @__PURE__ */ M(() => typeof U(t).border == "object" ? U(t).border : {
				color: "text",
				width: 1
			});
			var r = as(), i = L(r), a = R(I(i));
			{
				let e = /* @__PURE__ */ M(gn);
				Pi(a, {
					get value() {
						return U(n).color;
					},
					get tokens() {
						return U(e);
					},
					label: "Kantlinjens farge",
					onchange: (e) => ut({ border: {
						...U(n),
						color: e
					} })
				});
			}
			O(i);
			var o = R(i, 2), s = R(I(o)), c = I(s), l = R(c, 2);
			X(l);
			var u = R(l, 2);
			O(s), O(o), z(() => Z(l, U(n).width)), W("click", c, () => ut({ border: {
				...U(n),
				width: Math.max(1, U(n).width - 1)
			} })), W("change", l, (e) => ut({ border: {
				...U(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), W("click", u, () => ut({ border: {
				...U(n),
				width: Math.min(12, U(n).width + 1)
			} })), K(e, r);
		};
		J(d, (e) => {
			U(t).border !== "none" && e(f);
		});
		var p = R(d, 2), m = I(p);
		X(m), k(), O(p), z((e) => ii(m, e), [() => !!U(t).glass]), W("change", m, (e) => ut({ glass: e.target.checked || null })), K(e, n);
	}, a = (e) => {
		var t = As(), n = L(t), r = (e) => {
			var t = ss(), n = L(t), r = R(I(n));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.align ?? "left"), t = /* @__PURE__ */ M(() => [
					["left", Q("common.left")],
					["center", Q("common.center")],
					["right", Q("common.right")]
				]);
				$(r, {
					get value() {
						return U(e);
					},
					get options() {
						return U(t);
					},
					onchange: (e) => j("align", e)
				});
			}
			O(n);
			var a = R(n, 2), o = I(a);
			X(o), k(), O(a);
			var s = R(a, 2), c = (e) => {
				i(e);
			};
			J(s, (e) => {
				U(A).props.box && e(c);
			}), z((e) => ii(o, e), [() => !!U(A).props.box]), W("change", o, (e) => j("box", e.target.checked)), K(e, t);
		}, a = (e) => {
			var t = ls(), n = L(t), r = I(n);
			X(r), k(), O(n);
			var a = R(n, 4);
			Br(a, 17, () => U(A).props.items ?? [], Ir, (e, t, n) => {
				var r = cs(), i = I(r);
				X(i);
				var a = R(i, 2), o = I(a);
				o.disabled = n === 0, Y(o, () => c.up, !0), O(o);
				var s = R(o, 2);
				Y(s, () => c.down, !0), O(s);
				var l = R(s, 2);
				Y(l, () => c.cross, !0), O(l), O(a), O(r), z(() => {
					Z(i, U(t).q), s.disabled = n === (U(A).props.items?.length ?? 0) - 1;
				}), W("change", i, (e) => dt(n, { q: e.target.value })), W("click", o, () => mt(n, -1)), W("click", s, () => mt(n, 1)), W("click", l, () => pt(n)), K(e, r);
			});
			var o = R(a, 2), s = R(o, 4);
			i(s), z((e) => ii(r, e), [() => !!U(A).props.multi]), W("change", r, (e) => j("multi", e.target.checked)), W("click", o, ft), K(e, t);
		}, o = (e) => {
			var t = ds(), n = L(t), r = R(I(n));
			X(r), O(n);
			var i = R(n, 2), a = R(I(i));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.page ?? "__href"), t = /* @__PURE__ */ M(() => [...U(E).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.externalLink")]]);
				$(a, {
					get value() {
						return U(e);
					},
					get options() {
						return U(t);
					},
					onchange: (e) => {
						let t = e === "__href" ? null : e;
						ct(`edit:${U(A).blockId}`, (e) => {
							e.props.page = t, t && (e.props.href = null);
						});
					}
				});
			}
			O(i);
			var o = R(i, 2), s = (e) => {
				var t = us();
				X(t), z(() => Z(t, U(A).props.href === "#" ? "" : U(A).props.href ?? "")), W("change", t, (e) => j("href", e.target.value || null)), K(e, t);
			};
			J(o, (e) => {
				U(A).props.page || e(s);
			});
			var c = R(o, 2), l = R(I(c));
			{
				let e = /* @__PURE__ */ M(() => [["primary", Q("opt.btn.primary")], ["secondary", Q("opt.btn.secondary")]]);
				$(l, {
					get value() {
						return U(A).props.style;
					},
					get options() {
						return U(e);
					},
					onchange: (e) => j("style", e)
				});
			}
			O(c), z(() => Z(r, U(A).props.label)), W("change", r, (e) => j("label", e.target.value)), K(e, t);
		}, s = (e) => {
			var t = ps(), n = L(t), r = R(I(n));
			O(n);
			var i = R(n, 2), a = R(I(i));
			X(a), O(i);
			var o = R(i, 2), s = R(I(o));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.fit ?? "cover"), t = /* @__PURE__ */ M(() => [["cover", Q("opt.fitFrame.cover")], ["contain", Q("opt.fitFrame.contain")]]);
				$(s, {
					get value() {
						return U(e);
					},
					get options() {
						return U(t);
					},
					onchange: (e) => j("fit", e)
				});
			}
			O(o);
			var c = R(o, 2), l = R(I(c));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.radius ?? ""), t = /* @__PURE__ */ M(() => [
					["", Q("common.none")],
					["sm", Q("opt.size.sm")],
					["md", Q("opt.radius.md")]
				]);
				$(l, {
					get value() {
						return U(e);
					},
					get options() {
						return U(t);
					},
					onchange: (e) => j("radius", e || null)
				});
			}
			O(c);
			var u = R(c, 2), d = R(I(u));
			X(d), O(u);
			var f = R(u, 2), p = (e) => {
				var t = fs(), n = I(t);
				X(n), k(), O(t), z((e) => ii(n, e), [() => !!U(A).props.lightbox]), W("change", n, (e) => j("lightbox", e.target.checked)), K(e, t);
			};
			J(f, (e) => {
				U(A).props.href || e(p);
			});
			var m = R(f, 2), h = R(I(m)), g = I(h);
			O(h), O(m);
			var _ = R(m, 2);
			X(_);
			var v = R(_, 2), y = R(I(v)), b = I(y);
			O(y), O(v);
			var x = R(v, 2);
			X(x);
			var S = R(x, 2), ee = R(I(S)), C = I(ee);
			O(ee), O(S);
			var te = R(S, 2);
			X(te);
			var ne = R(te, 2), re = R(I(ne)), ie = I(re);
			O(re), O(ne);
			var ae = R(ne, 2);
			X(ae);
			var oe = R(ae, 2), se = R(I(oe)), ce = I(se);
			O(se), O(oe);
			var le = R(oe, 2);
			X(le);
			var ue = R(le, 2), de = R(I(ue)), fe = I(de);
			O(de), O(ue);
			var pe = R(ue, 2);
			X(pe);
			var me = R(pe, 2);
			z((e, t, n, r, i, o) => {
				Z(a, U(A).props.alt ?? ""), Z(d, U(A).props.href ?? ""), q(g, `${e ?? ""}%`), Z(_, U(A).props.x ?? .5), q(b, `${t ?? ""}%`), Z(x, U(A).props.y ?? .5), q(C, `${n ?? ""}x`), Z(te, U(A).props.zoom ?? 1), q(ie, `${r ?? ""}%`), Z(ae, U(A).props.brightness ?? 1), q(ce, `${i ?? ""}%`), Z(le, U(A).props.contrast ?? 1), q(fe, `${o ?? ""}%`), Z(pe, U(A).props.saturate ?? 1);
			}, [
				() => Math.round((U(A).props.x ?? .5) * 100),
				() => Math.round((U(A).props.y ?? .5) * 100),
				() => (U(A).props.zoom ?? 1).toFixed(2),
				() => Math.round((U(A).props.brightness ?? 1) * 100),
				() => Math.round((U(A).props.contrast ?? 1) * 100),
				() => Math.round((U(A).props.saturate ?? 1) * 100)
			]), W("change", r, gt), W("change", a, (e) => j("alt", e.target.value)), W("change", d, (e) => j("href", e.target.value || null)), W("input", _, (e) => j("x", Number(e.target.value))), W("input", x, (e) => j("y", Number(e.target.value))), W("input", te, (e) => j("zoom", Number(e.target.value))), W("input", ae, (e) => j("brightness", Number(e.target.value))), W("input", le, (e) => j("contrast", Number(e.target.value))), W("input", pe, (e) => j("saturate", Number(e.target.value))), W("click", me, () => ct(`edit:${U(A).blockId}`, (e) => {
				e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
			})), K(e, t);
		}, l = (e) => {
			var t = ms(), n = R(L(t), 2);
			X(n);
			var r = R(n, 2), i = R(I(r));
			X(i), O(r), k(2), z(() => {
				Z(n, U(A).props.url ?? ""), Z(i, U(A).props.title ?? "");
			}), W("change", n, (e) => j("url", e.target.value)), W("change", i, (e) => j("title", e.target.value)), K(e, t);
		}, u = (e) => {
			var t = vs(), n = L(t), r = R(I(n)), i = I(r);
			{
				let e = /* @__PURE__ */ M(() => U(A).props.glyph ?? "★"), t = /* @__PURE__ */ M(() => U(A).props.icon ?? null), n = /* @__PURE__ */ M(() => U(A).props.image ?? null);
				pa(i, {
					get value() {
						return U(e);
					},
					get icon() {
						return U(t);
					},
					get image() {
						return U(n);
					},
					onpick: (e) => ct(`edit:${U(A).blockId}`, (t) => {
						t.props.glyph = e, t.props.icon = null, t.props.image = null;
					}),
					onicon: (e) => ct(`edit:${U(A).blockId}`, (t) => {
						t.props.icon = e, t.props.image = null;
					}),
					onimage: (e) => j("image", e)
				});
			}
			var a = R(i, 2), o = (e) => {
				var t = hs();
				X(t), z(() => Z(t, U(A).props.glyph ?? "")), W("change", t, (e) => j("glyph", e.target.value || "★")), K(e, t);
			}, s = (e) => {
				var t = gs();
				W("click", t, () => j("icon", null)), K(e, t);
			};
			J(a, (e) => {
				U(A).props.icon ? e(s, -1) : e(o);
			}), O(r), O(n);
			var c = R(n, 2), l = (e) => {
				var t = _s(), n = L(t), r = I(n), i = R(r, 2);
				O(n), k(2), z(() => ai(r, "src", U(A).props.image)), W("click", i, () => j("image", null)), K(e, t);
			};
			J(c, (e) => {
				U(A).props.image && e(l);
			});
			var u = R(c, 2), d = R(I(u));
			X(d), O(u);
			var f = R(u, 2), p = R(I(f));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.color ?? "accent"), t = /* @__PURE__ */ M(gn);
				Pi(p, {
					get value() {
						return U(e);
					},
					get tokens() {
						return U(t);
					},
					onchange: (e) => j("color", e)
				});
			}
			O(f), k(2), z(() => Z(d, U(A).props.size ?? 48)), W("change", d, (e) => j("size", Number(e.target.value))), K(e, t);
		}, d = (e) => {
			var t = ys(), n = L(t), r = R(I(n));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.collection ?? ""), t = /* @__PURE__ */ M(() => [["", Q("common.choose")], ...U(Wr).map((e) => [e, U(Gr)[e]?.name ?? e])]);
				$(r, {
					get value() {
						return U(e);
					},
					get options() {
						return U(t);
					},
					onchange: (e) => j("collection", e || null)
				});
			}
			O(n);
			var i = R(n, 2), a = R(I(i));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.view ?? "cards"), t = /* @__PURE__ */ M(() => [
					["cards", Q("opt.collectionView.cards")],
					["list", Q("opt.collectionView.list")],
					["archive", Q("opt.collectionView.archive")]
				]);
				$(a, {
					get value() {
						return U(e);
					},
					get options() {
						return U(t);
					},
					onchange: (e) => j("view", e)
				});
			}
			O(i);
			var o = R(i, 2), s = R(I(o));
			X(s), O(o);
			var c = R(o, 2), l = I(c);
			X(l), k(), O(c), k(2), z(() => {
				Z(s, U(A).props.limit ?? 6), ii(l, U(A).props.newestFirst !== !1);
			}), W("change", s, (e) => j("limit", Number(e.target.value))), W("change", l, (e) => j("newestFirst", e.target.checked)), K(e, t);
		}, f = (e) => {
			var t = Cs(), n = L(t), r = R(I(n));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.view ?? "grid"), t = /* @__PURE__ */ M(() => [
					["grid", Q("opt.galleryView.grid")],
					["carousel", Q("opt.galleryView.carousel")],
					["slides", Q("opt.galleryView.slides")]
				]);
				$(r, {
					get value() {
						return U(e);
					},
					get options() {
						return U(t);
					},
					onchange: (e) => j("view", e)
				});
			}
			O(n);
			var i = R(n, 2), a = (e) => {
				var t = bs(), n = L(t), r = R(I(n));
				X(r), O(n);
				var i = R(n, 2), a = R(I(i)), o = I(a);
				O(a), O(i);
				var s = R(i, 2);
				X(s), z(() => {
					Z(r, U(A).props.columns ?? 3), q(o, `${U(A).props.gap ?? 12 ?? ""} px`), Z(s, U(A).props.gap ?? 12);
				}), W("change", r, (e) => j("columns", Number(e.target.value))), W("input", s, (e) => j("gap", Number(e.target.value))), K(e, t);
			};
			J(i, (e) => {
				(U(A).props.view ?? "grid") === "grid" && e(a);
			});
			var o = R(i, 2), s = (e) => {
				var t = xs(), n = R(I(t));
				X(n), O(t), z(() => Z(n, U(A).props.interval ?? 5)), W("change", n, (e) => j("interval", Number(e.target.value))), K(e, t);
			};
			J(o, (e) => {
				U(A).props.view === "slides" && e(s);
			});
			var l = R(o, 2), u = R(I(l));
			{
				let e = /* @__PURE__ */ M(() => U(A).props.radius ?? ""), t = /* @__PURE__ */ M(() => [
					["", Q("common.none")],
					["sm", Q("opt.size.sm")],
					["md", Q("opt.radius.md")]
				]);
				$(u, {
					get value() {
						return U(e);
					},
					get options() {
						return U(t);
					},
					onchange: (e) => j("radius", e || null)
				});
			}
			O(l);
			var d = R(l, 2), f = I(d);
			X(f), k(), O(d);
			var p = R(d, 4), m = R(I(p));
			O(p), Br(R(p, 2), 17, () => U(A).props.images ?? [], Ir, (e, t, n) => {
				var r = Ss(), i = I(r), a = I(i), o = R(a, 2), s = I(o);
				s.disabled = n === 0, Y(s, () => c.up, !0), O(s);
				var l = R(s, 2);
				Y(l, () => c.down, !0), O(l);
				var u = R(l, 2);
				Y(u, () => c.cross, !0), O(u), O(o), O(i);
				var d = R(i, 2), f = R(I(d));
				X(f), O(d);
				var p = R(d, 2), m = R(I(p));
				X(m), O(p), O(r), z(() => {
					ai(a, "src", U(t).src), l.disabled = n === U(A).props.images.length - 1, Z(f, U(t).alt ?? ""), Z(m, U(t).href ?? "");
				}), W("click", s, () => Vl(n, -1)), W("click", l, () => Vl(n, 1)), W("click", u, () => Hl(n)), W("change", f, (e) => Ul(n, "alt", e.target.value)), W("change", m, (e) => Ul(n, "href", e.target.value || null)), K(e, r);
			}), k(2), z(() => ii(f, U(A).props.lightbox !== !1)), W("change", f, (e) => j("lightbox", e.target.checked)), W("change", m, zl), K(e, t);
		}, p = (e) => {
			var t = ws(), n = L(t);
			$(R(I(n)), {
				get value() {
					return U(A).props.kind;
				},
				get options() {
					return vt;
				},
				onchange: (e) => j("kind", e)
			}), O(n);
			var r = R(n, 2);
			$(R(I(r)), {
				get value() {
					return U(A).props.color;
				},
				get options() {
					return yt;
				},
				onchange: (e) => j("color", e)
			}), O(r);
			var i = R(r, 2), a = R(I(i));
			X(a), O(i);
			var o = R(i, 2), s = I(o);
			X(s), k(), O(o), z((e) => {
				Z(a, U(A).props.thickness), ii(s, e);
			}, [() => !!U(A).props.fill]), W("change", a, (e) => j("thickness", Number(e.target.value))), W("change", s, (e) => j("fill", e.target.checked ? U(A).props.color : null)), K(e, t);
		}, m = (e) => {
			var t = Ts(), n = L(t);
			k(2), W("click", n, () => T?.sendOpenConfig(U(A).blockId)), K(e, t);
		};
		J(n, (e) => {
			U(A).type === "text" ? e(r) : U(A).type === "faq" ? e(a, 1) : U(A).type === "button" ? e(o, 2) : U(A).type === "image" ? e(s, 3) : U(A).type === "video" ? e(l, 4) : U(A).type === "icon" ? e(u, 5) : U(A).type === "samling" ? e(d, 6) : U(A).type === "galleri" ? e(f, 7) : U(A).type === "shape" ? e(p, 8) : e(m, -1);
		});
		var h = R(n, 4), g = R(I(h));
		{
			let e = /* @__PURE__ */ M(() => Tn(U(A).animation) ? U(A).animation.type : "");
			$(g, {
				get value() {
					return U(e);
				},
				get options() {
					return En;
				},
				onchange: (e) => kn(e || null)
			});
		}
		O(h);
		var _ = R(h, 2), v = (e) => {
			var t = Es(), n = L(t), r = R(I(n));
			X(r), O(n);
			var i = R(n, 2), a = R(I(i));
			X(a), O(i), z(() => {
				Z(r, U(A).animation.props.duration), Z(a, U(A).animation.props.delay);
			}), W("change", r, (e) => jn("duration", Number(e.target.value))), W("change", a, (e) => jn("delay", Number(e.target.value))), K(e, t);
		}, y = /* @__PURE__ */ M(() => Tn(U(A).animation));
		J(_, (e) => {
			U(y) && e(v);
		});
		var b = R(_, 2), x = R(I(b));
		{
			let e = /* @__PURE__ */ M(() => U(A).hover?.type ?? (U(A).animation && !Tn(U(A).animation) ? U(A).animation.type : ""));
			$(x, {
				get value() {
					return U(e);
				},
				get options() {
					return Dn;
				},
				onchange: (e) => An(e || null)
			});
		}
		O(b);
		var S = R(b, 2), ee = (e) => {
			var t = Os(), n = R(L(t), 2), r = I(n);
			X(r), k(), O(n);
			var i = R(n, 2), a = (e) => {
				var t = Ds(), n = L(t), r = R(I(n));
				X(r), O(n);
				var i = R(n, 2), a = R(I(i));
				{
					let e = /* @__PURE__ */ M(() => U(A).sticky.until ?? ""), t = /* @__PURE__ */ M(at);
					$(a, {
						get value() {
							return U(e);
						},
						get options() {
							return U(t);
						},
						onchange: (e) => ct(`edit:${U(A).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								until: e || null
							};
						})
					});
				}
				O(i), z(() => Z(r, U(A).sticky.offset ?? 16)), W("change", r, (e) => ct(`edit:${U(A).blockId}`, (t) => {
					t.sticky = {
						...t.sticky,
						offset: Math.max(0, Number(e.target.value) || 0)
					};
				})), K(e, t);
			};
			J(i, (e) => {
				U(A).sticky && e(a);
			}), z((e) => ii(r, e), [() => !!U(A).sticky]), W("change", r, (e) => ct(`edit:${U(A).blockId}`, (t) => {
				t.sticky = e.target.checked ? {
					offset: 16,
					until: null
				} : null;
			})), K(e, t);
		};
		J(S, (e) => {
			U(ie) === "desktop" && e(ee);
		});
		var C = R(S, 4), te = R(I(C), 2), ne = R(I(te), 2), re = (e) => {
			var t = ks(), n = I(t), r = R(I(n));
			X(r), O(n);
			var i = R(n, 2), a = R(I(i));
			X(a), O(i);
			var o = R(i, 2), s = R(I(o));
			X(s), O(o);
			var c = R(o, 2), l = R(I(c));
			X(l), O(c);
			var u = R(c, 2), d = R(I(u));
			X(d), O(u);
			var f = R(u, 2), p = R(I(f));
			X(p), O(f), O(t), z(() => {
				Z(r, U(A).frame.x), Z(a, U(A).frame.y), Z(s, U(A).frame.w), Z(l, U(A).frame.h), Z(d, U(A).frame.z ?? 1), Z(p, U(A).frame.rot ?? 0);
			}), W("change", r, (e) => lt("x", Number(e.target.value))), W("change", a, (e) => lt("y", Number(e.target.value))), W("change", s, (e) => lt("w", Number(e.target.value))), W("change", l, (e) => lt("h", Number(e.target.value))), W("change", d, (e) => lt("z", Number(e.target.value))), W("change", p, (e) => lt("rot", Number(e.target.value))), K(e, t);
		};
		J(ne, (e) => {
			U(ie) === "desktop" && e(re);
		});
		var ae = R(ne, 2), oe = I(ae);
		X(oe), k(), O(ae), O(te), O(C), z(() => ii(oe, U(A).decor)), W("change", oe, (e) => ht(e.target.checked)), K(e, t);
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
		["lilla", Q("adminTheme.lilla")],
		["bronn", Q("adminTheme.bronn")],
		["gull", Q("adminTheme.gull")],
		["graa", Q("adminTheme.graa")],
		["nordlys", Q("adminTheme.nordlys")],
		["skumring", Q("adminTheme.skumring")],
		["glo", Q("adminTheme.glo")]
	], u = /* @__PURE__ */ P(rn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	Sn(() => {
		document.documentElement.dataset.adminTheme = U(u), localStorage.setItem("urd-admin-theme", U(u)), f();
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
	let h = /* @__PURE__ */ P(null), g = /* @__PURE__ */ P(null), _ = /* @__PURE__ */ P(!1), v = /* @__PURE__ */ P(""), y = /* @__PURE__ */ P("info"), b = 0;
	function x(e, t = "info") {
		F(v, e, !0), F(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (F(v, ""), F(y, "info"));
		}, 8e3);
	}
	function S() {
		x(Q("status.storageFull"), "error");
	}
	function ee(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let C = /* @__PURE__ */ P(null), te = /* @__PURE__ */ P(null), ne = /* @__PURE__ */ P(rn({
		size: 16,
		snap: !0
	})), re = /* @__PURE__ */ P(!0), ie = /* @__PURE__ */ P("desktop"), ae = /* @__PURE__ */ P(null), oe = /* @__PURE__ */ P(0), se = /* @__PURE__ */ P(0), ce = /* @__PURE__ */ P(rn(typeof window < "u" ? window.innerWidth : 1280)), le = /* @__PURE__ */ P("fit"), ue = /* @__PURE__ */ M(() => U(ie) === "mobile" ? 390 : U(ce)), de = /* @__PURE__ */ M(() => ga(U(oe), U(ue), U(le))), fe = /* @__PURE__ */ M(() => U(de) > 0 ? U(se) / U(de) : U(se)), pe = /* @__PURE__ */ M(() => U(ue) * U(de)), me = /* @__PURE__ */ M(() => U(se));
	Sn(() => {
		let e = () => T?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Sn(() => {
		let e = U(ie);
		T?.sendViewport(e);
	}), Sn(() => {
		let e = () => {
			F(ce, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Sn(() => {
		let e = U(ae);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			let t = e.getBoundingClientRect();
			F(oe, t.width, !0), F(se, t.height, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let he = /* @__PURE__ */ P(0);
	function ge() {
		F(he, w?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function _e(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, ge(), T?.sendAttention(e.id, !0));
	}
	let w = null, ve = null, T = null, E = /* @__PURE__ */ P(null);
	function ye() {
		F(E, ve.data, !0), ve.replace(U(E));
	}
	function be() {
		T?.sendSite(He(U(E)));
	}
	let xe = /* @__PURE__ */ new Set(), Se = () => U(E).pages.find((e) => e.id === U(g));
	function D() {
		let e = U(E)?.pages?.some((e) => !xe.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = zr?.hasDraft() || Object.values(Vr).some((e) => e.hasDraft());
		F(_, e || w?.hasDraft() && !xe.has(U(g)) || ve?.hasDraft() || mi?.hasDraft() || t || !1, !0);
	}
	let Ce = [], we = [], Te = null;
	function Ee() {
		return JSON.stringify({
			pageId: U(g),
			page: w.data,
			site: ve.data,
			samlingerIndex: Ur ? zr.data : null,
			samlinger: Ur ? Object.fromEntries(Object.entries(Vr).map(([e, t]) => [e, t.data])) : {},
			plugins: mi?.data ?? null
		});
	}
	function De(e) {
		e === Te && (e.startsWith("edit:") || e.startsWith("grid:")) || (Ce.push(Ee()), Ce.length > 50 && Ce.shift(), we.length = 0, Te = e);
	}
	function Oe(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, plugins: o } = JSON.parse(e);
		if (ve.replace(r), ye(), ve.save(), F(ne, {
			snap: !0,
			...U(E).grid
		}, !0), be(), ke(i, a ?? {}), Ae(o), t && t !== U(g) && U(E).pages.some((e) => e.id === t)) {
			ee(`urd-draft-${t}`, JSON.stringify(n)), $n(t, { keepHistory: !0 }), D();
			return;
		}
		w.replace(n), w.save(), D(), ge(), nt(), Dt(w.data.sections.find((e) => e.id === U(bt))), U(E).pages.some((e) => e.id === U(g)) ? T?.sendPage(U(g), w.data) : $n(U(E).pages[0].id, { keepHistory: !0 });
	}
	function ke(e, t) {
		if (!(!zr || !e) && JSON.stringify({
			index: zr.data,
			samlinger: Object.fromEntries(Object.entries(Vr).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			zr.replace(e), zr.save();
			for (let e of Object.keys(Vr)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete Vr[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Vr[e]) {
					let t = Hr[e] ?? {
						schemaVersion: 1,
						id: e,
						name: n.name ?? e,
						kind: n.kind ?? "custom",
						entries: []
					};
					Vr[e] = Si(`urd-draft-samling-${e}`, () => t, S);
				}
				Vr[e].replace(n), Vr[e].save();
			}
			F(Wr, [...e.samlinger ?? []], !0), U(Kr) && !U(Wr).includes(U(Kr)) && F(Kr, null), Qr();
		}
	}
	function Ae(e) {
		!mi || !e || JSON.stringify(mi.data) !== JSON.stringify(e) && (mi.replace(e), mi.save(), Di(), Ni());
	}
	function je() {
		Ce.length && (we.push(Ee()), Oe(Ce.pop()), Te = null, x(Q("status.undone")));
	}
	function Me() {
		we.length && (Ce.push(Ee()), Oe(we.pop()), Te = null, x(Q("status.redone")));
	}
	function Ne(e) {
		U(it) && (e.target instanceof Element && e.target.closest(".block-menu") || F(it, null));
	}
	function Pe(e) {
		if (e.key === "Escape" && U(it)) {
			F(it, null);
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
			].includes(t.type)) || !U(A) || U(ie) === "mobile") return;
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
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? Me() : je());
	}
	async function Fe() {
		F(h, Da(await (await fetch("/content/site.json")).json()), !0), ve = Si("urd-draft-site", () => U(h), S), ve.replace(Da(ve.data)), ve.save(), ye(), F(ne, {
			snap: !0,
			...U(E).grid
		}, !0), await $n(new URLSearchParams(location.search).get("page") ?? U(E).pages[0].id), await Oi(), await Xr(), await Vn(), U(te) && Un(), (U(E).site.setup === !0 || U(E).site.title === "Min forening") && !localStorage.getItem("urd-setup-done") && (F(Be, U(E).site.title, !0), F(Ve, U(E).theme.tokens.color.accent, !0), F(Ue, U(E).theme.tokens.color.bg, !0), F(ze, !0));
	}
	let Ie = /* @__PURE__ */ P(null);
	function Le({ title: e, lines: t = [], okLabel: n = Q("confirm.ok"), cancelLabel: r = Q("confirm.cancel") }) {
		return new Promise((i) => {
			F(Ie, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Re(e) {
		U(Ie)?.resolve(e), F(Ie, null);
	}
	let ze = /* @__PURE__ */ P(!1), Be = /* @__PURE__ */ P(""), Ve = /* @__PURE__ */ P("#7c5cff"), Ue = /* @__PURE__ */ P("#0b0e14");
	function We() {
		localStorage.setItem("urd-setup-done", "1"), F(ze, !1);
	}
	function Ge() {
		let e = U(Be).trim();
		e && (H("setup", () => {
			U(E).site.title = e, U(E).nav.logo = {
				type: "text",
				value: e
			}, U(E).theme.tokens.color.accent = U(Ve), U(E).theme.tokens.color.bg = U(Ue), delete U(E).site.setup;
		}), We(), x(Q("status.setupDone"), "ok"));
	}
	let Je = /* @__PURE__ */ P(null), Ye = [
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
	], Xe = Object.fromEntries(Ye.flat().map((e) => [e, Q(`panel.${e}`)])), Ze = [
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["en-GB", "English (UK)"],
		["se", "Davvisámegiella"],
		["tr", "Türkçe"]
	], Qe = localStorage.getItem("urd-admin-lang") ?? "auto";
	function $e(e) {
		e !== Qe && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function et(e) {
		F(Je, U(Je) === e ? null : e, !0), T?.sendShowGrid(U(Je) === "grid"), U(Je) === "history" && V();
	}
	let A = /* @__PURE__ */ P(null);
	function tt(e, t) {
		let n = w?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function nt() {
		if (!U(A)) return;
		let { block: e } = tt(U(A).sectionId, U(A).blockId);
		if (!e) {
			F(A, null);
			return;
		}
		F(A, {
			sectionId: U(A).sectionId,
			blockId: U(A).blockId,
			type: e.type,
			decor: !!e.decor,
			props: JSON.parse(JSON.stringify(e.props)),
			frame: { ...e.frames.desktop },
			animation: e.animation ? JSON.parse(JSON.stringify(e.animation)) : null,
			hover: e.hover ? JSON.parse(JSON.stringify(e.hover)) : null,
			sticky: e.sticky ? JSON.parse(JSON.stringify(e.sticky)) : null
		}, !0);
	}
	function rt(e) {
		if (F(it, null), !e.blockId) {
			F(A, null);
			return;
		}
		F(A, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && F(bt, e.sectionId, !0), nt();
	}
	let it = /* @__PURE__ */ P(null);
	function at() {
		let e = w?.data.sections ?? [], t = e.findIndex((e) => e.id === U(A)?.sectionId);
		return [["", "Når egen seksjon er forbi"], ...e.slice(t + 1).map((e, n) => [e.id, `Ved seksjon ${t + 2 + n}`])];
	}
	function ot(e) {
		if (rt(e), !U(A)) return;
		let t = U(C)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + U(de) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + U(de) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + U(de) * e.rect.top), Math.max(8, r));
		F(it, {
			left: n,
			top: i
		}, !0);
	}
	function ct(e, t) {
		let { section: n, block: r } = tt(U(A)?.sectionId, U(A)?.blockId);
		r && (De(e), t(r, n), _e(n, "blokk-endret"), w.save(), D(), T?.sendSection(U(g), n), nt());
	}
	function j(e, t) {
		ct(`edit:${U(A).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function lt(e, t) {
		Number.isFinite(t) && ct(`edit:frame-${U(A).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function ut(e) {
		ct(`edit:${U(A).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function dt(e, t) {
		ct(`edit:${U(A).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function ft() {
		ct("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: "Nytt spørsmål?",
				a: "<p>Skriv svaret her.</p>"
			});
		});
	}
	function pt(e) {
		ct("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function mt(e, t) {
		let n = e + t;
		ct("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function ht(e) {
		ct("decor", (t) => {
			t.decor = e;
		});
	}
	async function gt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await on(t);
			ct(`edit:${U(A).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || Gi(t.name).replaceAll("-", " ");
			});
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	let _t = {
		text: Q("blocks.text"),
		button: Q("blocks.button"),
		image: Q("blocks.image"),
		shape: Q("blocks.shape"),
		video: Q("blocks.video"),
		icon: Q("blocks.icon"),
		galleri: Q("blocks.galleri"),
		faq: Q("blocks.faq")
	}, vt = [
		["line", Q("shape.line")],
		["arrow", Q("shape.arrow")],
		["circle", Q("shape.circle")],
		["rect", Q("shape.rect")],
		["triangle", Q("shape.triangle")]
	], yt = [
		["accent", Q("color.accent")],
		["text", Q("color.text")],
		["surface", Q("color.surface")],
		["bg", Q("color.bg")]
	], bt = /* @__PURE__ */ P(null), xt = /* @__PURE__ */ P(null), St = /* @__PURE__ */ P(""), Ct = /* @__PURE__ */ P(rn([])), wt = /* @__PURE__ */ P(null), Tt = /* @__PURE__ */ P(null), Et = /* @__PURE__ */ P("");
	function Dt(e) {
		F(xt, e?.grid ? { ...e.grid } : null, !0), F(St, e?.size?.minHeight ?? "", !0), F(Ct, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), F(wt, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), F(Tt, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), F(Et, e?.theme ?? "", !0);
	}
	let Ot = /* @__PURE__ */ P(null), N = rn({});
	function kt() {
		try {
			let e = ((U(C)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${U(bt)}"]`))?.getBoundingClientRect();
			F(Ot, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			F(Ot, null);
		}
	}
	Sn(() => {
		U(bt), U(Ct), requestAnimationFrame(() => requestAnimationFrame(kt));
	}), Sn(() => {
		let e = U(C);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => kt());
		return t.observe(e), () => t.disconnect();
	}), Sn(() => {
		for (let e of U(Ct)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !N[t]) {
				let e = new Image();
				e.onload = () => {
					N[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function At(e) {
		Mt("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function jt(e) {
		F(bt, e.sectionId, !0), Dt(w?.data.sections.find((t) => t.id === e.sectionId));
	}
	function Mt(e, t) {
		let n = w.data.sections.find((e) => e.id === U(bt));
		n && (De(e), t(n), w.save(), D(), T?.sendSection(U(g), n), Dt(n));
	}
	let Nt = /* @__PURE__ */ P("color");
	function Pt(e, t) {
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
	function Ft(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function It(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Lt(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function Rt(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				Lt(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				Lt(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let zt = (e) => Math.min(4, Math.max(.1, e));
	function Bt(e, t, n, r) {
		Lt(e, t, "size", zt(Math.round((n + r) * 100) / 100));
	}
	function Vt(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && Lt(e, t, "size", zt(r / 100));
	}
	function Ht(e, t, n, r) {
		let i = N[n.props.src];
		if (!i?.w || !i?.h || !U(Ot)?.w || !U(Ot)?.h) return;
		let a = U(Ot).h * i.w / (U(Ot).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && Lt(e, t, "fit", "vanlig"), Lt(e, t, "size", zt(Math.round(o * 100) / 100));
	}
	function Ut(e) {
		if ((e.version ?? 1) >= io.version) return e.props;
		let t = He(e);
		return Sa({
			type: "gradient",
			version: t.version ?? 1,
			props: t.props
		}, io).props;
	}
	function Wt(e, t, n, r) {
		e.mutate(n, (e) => {
			let n = e.background.layers[t];
			if ((n.version ?? 1) < io.version) {
				let e = Sa({
					type: "gradient",
					version: n.version ?? 1,
					props: He(n.props)
				}, io);
				if (!e.ok) return;
				n.props = e.props, n.version = e.version;
			}
			r(n.props);
		});
	}
	function Gt(e, t, n, r) {
		Wt(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let Kt = {
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
	function qt(e, t, n) {
		Wt(e, t, e.keyPrefix, (e) => {
			e.kind = n, Kt[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function Jt(e, t, n, r) {
		Wt(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function Yt(e, t) {
		Wt(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Xt(e, t, n) {
		Wt(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Zt(e, t, n, r) {
		Wt(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Qt = /* @__PURE__ */ P(null);
	function $t(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		F(Qt, {
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
			F(Qt, {
				...U(Qt),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = U(Qt);
			if (F(Qt, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Zt(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function en(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function tn(e, t) {
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
	async function nn(e) {
		let t = await e.text(), n = Vi(t), r = Ui(t);
		if (!r) return n;
		let i = await tn(n.dataUrl, r);
		if (!i) return n;
		let a = Hi(t, i);
		if (a === t) return n;
		try {
			return Vi(a);
		} catch {
			return n;
		}
	}
	async function on(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? nn(e) : Ri(e);
	}
	async function sn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Lt(e, t, "src", (await on(r)).dataUrl);
		} catch {
			x(Q("status.imageReadError"), "error");
		}
	}
	async function cn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(Q("status.compressingImages"));
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
	function ln(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function un(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function dn(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function fn(e, t) {
		H(e, () => {
			U(E).nav.style ??= {}, t(U(E).nav.style);
		});
	}
	let pn = /* @__PURE__ */ M(() => ({
		mutate: Mt,
		keyPrefix: "bg",
		keyId: U(bt)
	})), mn = {
		mutate: fn,
		keyPrefix: "navbg",
		keyId: "nav"
	}, hn = {
		mutate: zi,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, gn = () => Object.entries(U(E)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), _n = [
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
	], vn = /* @__PURE__ */ M(() => !!U(E)?.theme.alt), yn = /* @__PURE__ */ M(() => U(E)?.theme.alt?.auto === !0), bn = /* @__PURE__ */ M(() => U(E)?.theme.scheme === "dark" ? "dark" : "light"), xn = /* @__PURE__ */ M(() => U(E)?.theme.tokens.color ?? {}), Cn = /* @__PURE__ */ M(() => ({
		...U(E)?.theme.tokens.color ?? {},
		...U(E)?.theme.alt?.tokens?.color ?? {}
	}));
	function wn(e) {
		return {
			type: e,
			version: Ro[e].version,
			props: Ro[e].defaults()
		};
	}
	let Tn = (e) => !!(e && Ro[e.type]?.entrance), En = [["", Q("common.none")], ...Object.entries(Ro).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.label])], Dn = [["", Q("common.none")], ...Object.entries(Ro).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.label])];
	function On(e) {
		e.animation && !Tn(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function kn(e) {
		ct(`edit:anim-${U(A).blockId}`, (t) => {
			On(t), t.animation = e ? wn(e) : null;
		}), U(A) && T?.sendDemoAnim(U(A).sectionId, U(A).blockId);
	}
	function An(e) {
		ct(`edit:hover-${U(A).blockId}`, (t) => {
			On(t), t.hover = e ? wn(e) : null;
		});
	}
	function jn(e, t) {
		Number.isFinite(t) && (ct(`edit:anim-${U(A).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), U(A) && T?.sendDemoAnim(U(A).sectionId, U(A).blockId));
	}
	function Mn(e) {
		Mt("section-anim", (t) => {
			On(t), t.animation = e ? wn(e) : null;
		}), T?.sendDemoAnim(U(bt));
	}
	function Nn(e) {
		Mt("section-hover", (t) => {
			On(t), t.hover = e ? wn(e) : null;
		});
	}
	function Pn(e, t) {
		Number.isFinite(t) && (Mt("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), T?.sendDemoAnim(U(bt)));
	}
	function Fn(e) {
		Mt("edit:section-anim", (t) => {
			t.animation && (t.animation.props.pattern = e);
		}), T?.sendDemoAnim(U(bt));
	}
	function In(e) {
		let t = w.data.sections.find((e) => e.id === U(bt));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		De("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, F(St, r, !0), w.save(), D(), T?.sendSection(U(g), t);
	}
	function Ln() {
		return w.data.sections.find((e) => e.id === U(bt)) ?? w.data.sections[0];
	}
	function Rn(e) {
		let t = w.data.sections.find((e) => e.id === U(bt));
		t && (De("grid:section"), t.grid = e ? { ...ve.data.grid } : null, F(xt, t.grid ? { ...t.grid } : null, !0), w.save(), D(), T?.sendSection(U(g), t), U(Je) === "grid" && T?.sendShowGrid(!0));
	}
	function zn(e, t) {
		let n = w.data.sections.find((e) => e.id === U(bt));
		n?.grid && (De("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, F(xt, { ...n.grid }, !0), w.save(), D(), T?.sendSection(U(g), n), U(Je) === "grid" && T?.sendShowGrid(!0));
	}
	function Bn(e, t) {
		De("grid:site"), F(ne, {
			...U(ne),
			[e]: t
		}, !0), ve.data.grid = {
			...ve.data.grid,
			[e]: t
		}, ve.save(), D(), be(), U(Je) === "grid" && T?.sendShowGrid(!0);
	}
	async function Vn() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? F(te, await e.json(), !0) : e.status !== 503 && F(te, null);
		} catch {
			F(te, null);
		}
	}
	let Hn = null;
	async function Un() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (Hn = (await e.json()).head ?? null);
		} catch {}
	}
	async function Wn(e) {
		if (!Hn) return await Un(), {
			ok: await Le({
				title: Q("confirm.conflictUnknown.title"),
				lines: [Q("confirm.conflictUnknown.body"), Q("confirm.conflictUnknown.warning")],
				okLabel: Q("confirm.publishAnyway"),
				cancelLabel: Q("confirm.cancel")
			}),
			head: Hn
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${Hn}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === Hn) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [Q("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Le({
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
	let B = /* @__PURE__ */ P(null), Gn = /* @__PURE__ */ P(""), Kn = /* @__PURE__ */ P(!1);
	async function V() {
		F(Gn, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? F(B, (await e.json()).commits, !0) : e.status === 401 ? (F(B, [], !0), F(Gn, "Logg inn med GitHub for å se historikken.")) : (F(B, [], !0), F(Gn, (await e.json().catch(() => null))?.error ?? Q("status.historyFetchFailed"), !0));
		} catch {
			F(B, [], !0), F(Gn, Q("status.historyUnavailable"), !0);
		}
	}
	let qn = new Intl.DateTimeFormat(bi(), {
		dateStyle: "short",
		timeStyle: "short"
	}), Jn = !1;
	async function Yn() {
		let e = U(B)?.[0];
		if (!(!e || U(Kn)) && await Le({
			title: Q("confirm.revert.title"),
			lines: [`«${e.message}»`, Q("confirm.revert.body")],
			okLabel: Q("confirm.revert.ok"),
			cancelLabel: Q("confirm.cancel")
		})) {
			F(Kn, !0), x(Q("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? Hn = e : Un(), Jn = !0, x(Q("status.revertDone"), "ok"), Xn();
				} else t.status === 409 ? x(Q("status.revertConflict"), "error") : x((await t.json().catch(() => null))?.error ?? Q("status.revertFailed"), "error");
			} catch {
				x(Q("status.publishLayerUnreachable"), "error");
			}
			F(Kn, !1), V();
		}
	}
	async function Xn() {
		let e = ["/content/site.json", ...U(E).pages.map((e) => `/${e.file}`)], t = async () => {
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
	let Zn = null;
	function Qn(e) {
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
	async function $n(e, { keepHistory: t = !1 } = {}) {
		F(g, e, !0), Zn = (async () => {
			let n = Se(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = Oa(await e.json(), ve.data));
			} catch {}
			r ? xe.delete(e) : r = Qn(n), w = Si(`urd-draft-${e}`, () => r, S), w.replace(Oa(w.data, ve.data)), w.save(), t || (Te = null), F(bt, null), F(xt, null), D(), ge(), F(v, "");
		})(), await Zn;
	}
	function er() {
		T?.destroy(), U(C)?.contentDocument?.addEventListener("pointerdown", () => {
			U(it) && F(it, null);
		}, !0), T = ma(U(C), {
			onEdit: Eo,
			onMove: Do,
			onGrow: Oo,
			onDelete: El,
			onAddSection: Io,
			onMoveSection: Lo,
			onDeleteSection: Cl,
			onSectionSize: wl,
			onUndo: (e) => e.redo ? Me() : je(),
			onSelectSection: jt,
			onSelectBlock: rt,
			onBlockMenu: ot,
			onReady: tr,
			onNavigate: ir,
			onAddBlock: (e) => Al(e.sectionId, e.block),
			onAddBlocks: (e) => jl(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: Fl,
			onMoveBlockSection: Tl,
			onMobileManual: ko,
			onMobileAuto: jo,
			onReviewDone: Mo,
			onBlockFlag: No,
			onCollectionEdit: ni,
			onPluginBlocks: (e) => {
				F(Nl, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => H("edit:nav-width", () => {
				U(E).nav.style ??= {}, U(E).nav.style.width = e.width;
			})
		});
	}
	async function tr() {
		await Zn, await gi, T?.sendPlugins(He(U(_i))?.enabled ?? []), T?.sendViewport(U(ie)), ei(), ve.hasDraft() && be();
		let e = !U(h).pages.some((e) => e.id === U(g));
		(w.hasDraft() || e) && T?.sendPage(U(g), w.data), U(re) || T?.sendChrome(!1), U(Je) === "grid" && T?.sendShowGrid(!0), U(nr) && T?.sendShowGuides(!0), f();
	}
	let nr = /* @__PURE__ */ P(localStorage.getItem("urd-guides") === "1");
	function rr() {
		F(nr, !U(nr)), localStorage.setItem("urd-guides", U(nr) ? "1" : "0"), T?.sendShowGuides(U(nr));
	}
	function ir(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = U(E).pages.find((e) => e.path === t);
		n && n.id !== U(g) && $n(n.id);
	}
	function H(e, t) {
		De(e), t(), ve.save(), D(), be();
	}
	let ar = /* @__PURE__ */ P(""), or = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function sr(e, t = null) {
		return e ? or.includes(e) ? Q("error.reservedName", { slug: e }) : U(E).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? Q("error.pageExists") : null : Q("error.pageNeedsName");
	}
	function cr() {
		let e = U(ar).trim(), t = Gi(e), n = sr(t);
		if (n) {
			x(n, "error");
			return;
		}
		H("pages", () => {
			U(E).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), U(E).nav.items.push({
				label: e,
				page: t
			});
		}), ee(`urd-draft-${t}`, JSON.stringify(Qn({
			id: t,
			title: e
		}))), D(), F(ar, ""), $n(t);
	}
	function lr(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		H("pages", () => {
			e.title = n;
			for (let t of U(E).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === U(g) ? (w.data.meta.title = n, w.save(), D(), T?.sendPage(U(g), w.data)) : ur(e, (e) => {
			e.meta.title = n;
		});
	}
	async function ur(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = Oa(await t.json(), ve.data));
		} catch {}
		r ||= Qn(e), t(r), ee(n, JSON.stringify(r)), D();
	}
	function dr(e, t) {
		let n = Gi(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = sr(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		H("pages", () => {
			e.path = `/${n}`;
		});
	}
	function fr(e) {
		e.path !== "/" && (H("pages", () => {
			U(E).pages = U(E).pages.filter((t) => t.id !== e.id), U(E).nav.items = U(E).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of U(E).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			U(E).nav.items = U(E).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === U(g) && $n(U(E).pages[0].id), x(Q("status.pageRemoved")));
	}
	function pr(e) {
		H("edit:nav-logo", () => {
			U(E).nav.logo = {
				type: "text",
				value: "",
				...U(E).nav.logo,
				...e
			};
		});
	}
	function mr(e) {
		H("nav", () => {
			U(E).nav.logo ??= {
				type: "text",
				value: U(E).site.title
			};
			let t = U(E).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = U(E).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = U(E).site.title), delete t.image), t.type = e;
		});
	}
	async function hr(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await on(t);
			H("nav", () => {
				let t = U(E).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
		}
	}
	let gr = /* @__PURE__ */ P(null);
	async function _r(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await nn(t);
				F(gr, e.dataUrl, !0);
			} catch {
				x(Q("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			F(gr, String(n.result), !0);
		}, n.onerror = () => x(Q("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function vr(e) {
		H("edit:site-icon", () => {
			U(E).site.icon = e;
		}), F(gr, null);
	}
	function br() {
		H("edit:site-icon", () => {
			delete U(E).site.icon;
		});
	}
	function Sr(e) {
		H("edit:site-title", () => {
			U(E).site.title = e;
		});
	}
	function Cr(e) {
		H("edit:site-desc", () => {
			U(E).site.description = e;
		});
	}
	function wr() {
		let e = U(E).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function Tr() {
		let e = wr();
		return [...Ze.some(([t]) => t === e) ? [] : [[e, e]], ...Ze];
	}
	function Er(e) {
		H("site", () => {
			U(E).site.lang = e;
		});
	}
	let Dr = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Sn(() => {
		if (!U(E)?.site) return;
		let e = U(E).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 51.2V16l25.6 10.4V51.2' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			Dr.test(e) && (t.href = e);
		}
	});
	function Or(e) {
		H("nav", () => {
			U(E).nav.layout = e;
		});
	}
	function G(e, t) {
		H(`edit:nav-style-${e}`, () => {
			U(E).nav.style ??= {}, t === void 0 ? delete U(E).nav.style[e] : U(E).nav.style[e] = t;
		});
	}
	let kr = /* @__PURE__ */ M(() => U(E)?.nav?.variant === "side-left" || U(E)?.nav?.variant === "side-right"), jr = /* @__PURE__ */ M(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(U(E)?.nav?.variant)), Mr = {
		underline: [Q("hoverColor.underline.label"), Q("hoverColor.underline.title")],
		pill: [Q("hoverColor.pill.label"), Q("hoverColor.pill.title")],
		lift: [Q("hoverColor.lift.label"), Q("hoverColor.lift.title")]
	}, Nr = /* @__PURE__ */ M(() => Mr[U(E)?.nav?.style?.hover] ?? null);
	function Pr(e) {
		H("nav", () => {
			e === "bar" ? delete U(E).nav.variant : U(E).nav.variant = e;
		});
	}
	function Fr(e) {
		H("nav", () => {
			U(E).nav.style ??= {}, e ? U(E).nav.style.glow = !0 : delete U(E).nav.style.glow;
		});
	}
	function Lr(e) {
		H("nav", () => {
			U(E).nav.style ??= {}, e ? delete U(E).nav.style.topGap : U(E).nav.style.topGap = !1;
		});
	}
	function Rr(e) {
		H("nav", () => {
			U(E).nav.style ??= {}, e === "standard" ? delete U(E).nav.style.hover : U(E).nav.style.hover = e;
		});
	}
	let zr = null, Vr = {}, Hr = {}, Ur = !1, Wr = /* @__PURE__ */ P(rn([])), Gr = /* @__PURE__ */ P(rn({})), Kr = /* @__PURE__ */ P(null), qr = /* @__PURE__ */ P(""), Jr = /* @__PURE__ */ P("news"), Yr = [
		["news", Q("collectionKind.news")],
		["notices", Q("collectionKind.notices")],
		["publications", Q("collectionKind.publications")],
		["custom", Q("collectionKind.custom")]
	];
	async function Xr() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		zr = Si("urd-draft-samlinger", () => e, S), F(Wr, [...zr.data.samlinger ?? []], !0);
		for (let e of U(Wr)) {
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
			}, Hr[e] = t, Vr[e] = Si(`urd-draft-samling-${e}`, () => t, S);
		}
		Ur = !0, Qr();
	}
	function Qr(e = !0) {
		let t = {};
		for (let e of U(Wr)) Vr[e] && (t[e] = JSON.parse(JSON.stringify(Vr[e].data)));
		F(Gr, t, !0), e && ei();
	}
	function ei() {
		T?.sendCollections(He(U(Gr)) ?? {});
	}
	function ti(e, t, n, r = !0) {
		let i = Vr[e];
		i && (De(t), n(i.data), i.save(), D(), Qr(r));
	}
	function ni(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || ti(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function ri() {
		let e = U(qr).trim();
		if (!e) return;
		let t = Gi(e);
		if (!t || U(Wr).includes(t)) {
			x(Q(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		De("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: U(Jr),
			entries: []
		};
		Hr[t] = {
			...n,
			entries: []
		}, Vr[t] = Si(`urd-draft-samling-${t}`, () => ({
			...n,
			entries: []
		}), S), Vr[t].replace(n), Vr[t].save(), zr.data.samlinger = [...U(Wr), t], zr.save(), F(Wr, [...U(Wr), t], !0), F(Kr, t, !0), F(qr, ""), D(), Qr();
	}
	function oi(e) {
		De("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete Vr[e], zr.data.samlinger = U(Wr).filter((t) => t !== e), zr.save(), F(Wr, U(Wr).filter((t) => t !== e), !0), U(Kr) === e && F(Kr, null), D(), Qr();
	}
	function si(e) {
		ti(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: Pa("innslag"),
				title: "Nytt innslag",
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function ci(e, t, n, r) {
		ti(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function ui(e, t, n) {
		ti(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function di(e, t) {
		ti(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function fi(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && ci(e, t, "image", (await on(r)).dataUrl);
	}
	let mi = null, hi, gi = new Promise((e) => {
		hi = e;
	}), _i = /* @__PURE__ */ P(null), vi = rn({}), yi = /* @__PURE__ */ P("0.0.0"), xi = /* @__PURE__ */ P(""), Ci = /* @__PURE__ */ P(""), wi = /* @__PURE__ */ P(rn([])), Ti = /* @__PURE__ */ P("pending"), Ei = () => [.../* @__PURE__ */ new Set([...U(_i)?.enabled ?? [], ...U(_i)?.disabled ?? []])];
	function Di() {
		F(_i, JSON.parse(JSON.stringify(mi.data)), !0);
	}
	async function Oi() {
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		mi = Si("urd-draft-plugins", () => e, S), Di();
		try {
			F(yi, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Ei()) ji(e);
		ki(), hi(), T?.sendPlugins(He(U(_i))?.enabled ?? []);
	}
	async function ki() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Ai();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), F(wi, (t ?? []).filter((e) => !Ei().includes(e)), !0);
			for (let e of U(wi)) ji(e);
			F(Ti, "ok");
		} catch {
			Ai();
		}
	}
	function Ai() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				F(wi, e.filter((e) => !Ei().includes(e)), !0);
				for (let e of U(wi)) ji(e);
				F(Ti, "ok");
				return;
			}
		} catch {}
		F(Ti, "unavailable");
	}
	async function ji(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = Na(t);
			vi[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && ja(U(yi), t.requiresEngine)
			};
		} catch {
			vi[e] = {
				name: e,
				errors: ["fant ikke plugins/" + e + "/plugin.json i repoet"],
				satisfied: !1
			};
		}
	}
	function Mi(e, t) {
		De("plugins");
		let n = mi.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), mi.save(), D(), Di(), Ni();
	}
	function Ni() {
		U(C) && (U(C).src = U(C).src);
	}
	function Fi(e) {
		De("plugins");
		let t = mi.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), mi.save(), D(), Di(), Ni();
	}
	async function Ii() {
		F(Ci, "");
		let e = U(xi).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			F(Ci, "Ugyldig id: bruk små bokstaver, tall og bindestrek (mappenavnet i plugins/)");
			return;
		}
		if (Ei().includes(e)) {
			F(Ci, "Pluginen står allerede i listen");
			return;
		}
		if (await ji(e), vi[e].errors.length) {
			F(Ci, `Fant ingen gyldig plugin: ${vi[e].errors.join("; ")}`);
			return;
		}
		Mi(e, !0), F(xi, "");
	}
	function Li(e) {
		F(wi, U(wi).filter((t) => t !== e), !0), Mi(e, !0);
	}
	function zi(e, t) {
		H(e, () => {
			U(E).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(U(E).footer);
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
			let e = await on(t);
			zi("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(Q("status.imageReadErrorSvg"), "error");
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
	function $i(e) {
		let t = "Min forening", n = U(E).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			t[e] ??= [], t[e].push(U(E).pages[0] ? {
				label: "Lenke",
				page: U(E).pages[0].id
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
					page: U(E).pages[0].id
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
				page: U(E).pages[0].id
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
		H(`edit:nav-label-${e}`, () => {
			U(E).nav.items[e].label = t;
		});
	}
	function qa(e, t) {
		H("nav", () => {
			let n = U(E).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function Ja(e, t) {
		H(`edit:nav-href-${e}`, () => {
			U(E).nav.items[e].href = t;
		});
	}
	function Ya(e, t) {
		let n = e + t, r = U(E).nav.items;
		n < 0 || n >= r.length || H("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function Xa(e) {
		H("nav", () => {
			U(E).nav.items.splice(e, 1);
		});
	}
	function Za() {
		H("nav", () => {
			U(E).nav.items.push({
				label: "Lenke",
				page: U(E).pages[0].id
			});
		});
	}
	function Qa(e) {
		H("nav", () => {
			let t = U(E).nav.items[e];
			t.children ??= [], t.children.push({
				label: "Lenke",
				page: U(E).pages[0].id
			});
		});
	}
	function $a(e, t, n) {
		H(`edit:nav-child-label-${e}-${t}`, () => {
			U(E).nav.items[e].children[t].label = n;
		});
	}
	function eo(e, t, n) {
		H("nav", () => {
			let r = U(E).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function to(e, t, n) {
		H(`edit:nav-child-href-${e}-${t}`, () => {
			U(E).nav.items[e].children[t].href = n;
		});
	}
	function no(e, t, n) {
		let r = t + n, i = U(E).nav.items[e].children;
		r < 0 || r >= i.length || H("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function ro(e, t) {
		H("nav", () => {
			let n = U(E).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = U(E).pages[0].id));
		});
	}
	function oo(e, t) {
		H(`edit:theme-color-${e}`, () => {
			U(E).theme.tokens.color[e] = t, U(E).theme.alt?.auto && (U(E).theme.alt.tokens.color = fo());
		});
	}
	function co(e, t) {
		H("theme", () => {
			U(E).theme.tokens.font[e] = t;
		});
	}
	function lo(e, t) {
		H("theme", () => {
			U(E).theme.tokens.radius[e] = t;
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
		return Object.fromEntries(Object.entries(U(E).theme.tokens.color).map(([e, t]) => [e, uo(t)]));
	}
	function po(e, t) {
		H(`edit:theme-alt-${e}`, () => {
			U(E).theme.alt.tokens.color[e] = t, U(E).theme.alt.auto = !1;
		});
	}
	function mo(e) {
		H("theme", () => {
			e === "light" ? delete U(E).theme.scheme : U(E).theme.scheme = e;
		});
	}
	function ho(e) {
		H("theme", () => {
			e ? U(E).theme.alt = {
				auto: !0,
				tokens: { color: fo() }
			} : delete U(E).theme.alt;
		});
	}
	function go(e) {
		H("theme", () => {
			U(E).theme.alt ??= { tokens: { color: fo() } }, U(E).theme.alt.auto = e, e && (U(E).theme.alt.tokens.color = fo());
		});
	}
	function _o(e) {
		let t = U(E).theme.tokens.font[e];
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
	function Co(e) {
		H("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of xo) U(E).theme.tokens.color[e] = n[e];
			t ? U(E).theme.scheme = "dark" : delete U(E).theme.scheme, U(E).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let wo = /* @__PURE__ */ M(() => {
		if (!U(E)) return null;
		let e = U(E).theme.tokens.color, t = U(E).theme.alt?.tokens?.color ?? {}, n = U(E).theme.scheme === "dark";
		return So.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return xo.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function To() {
		F(re, !U(re)), T?.sendChrome(U(re));
	}
	function Eo(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (De(`edit:${e.blockId}`), n.props = e.props, w.save(), D(), U(A)?.blockId === e.blockId && nt(), e.rerender && T?.sendSection(U(g), t), F(v, ""));
	}
	function Do(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		De(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && _e(t, "desktop-endret-etter-mobil"), w.save(), D(), U(A)?.blockId === e.blockId && nt();
	}
	function Oo(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (w.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), w.hasDraft() && De(`edit:${e.blockId}`), t.frames.desktop.h = e.h, w.save(), D(), U(A)?.blockId === e.blockId && nt());
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
			}, w.save(), D(), ge(), T?.sendSection(U(g), t);
		}
	}
	function Mo(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (De("review-done"), t.responsive.mobile.attention = null, w.save(), D(), ge());
	}
	function No(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (De("decor"), t.decor = e.decor, w.save(), D(), U(A)?.blockId === e.blockId && nt());
	}
	function Io(e) {
		De("add-section"), e.section.id || (e.section.id = Pa("sec")), w.data.sections.splice(e.index, 0, e.section), w.save(), D(), T?.sendPage(U(g), w.data), F(bt, e.section.id, !0), Dt(e.section), U(Je) !== "properties" && (F(Je, "properties"), T?.sendShowGrid(!1));
	}
	function Lo(e) {
		let t = w.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (De("move-section"), [t[n], t[r]] = [t[r], t[n]], w.save(), D(), T?.sendPage(U(g), w.data));
	}
	function Cl(e) {
		De("delete-section"), e.sectionId === U(bt) && (F(bt, null), F(xt, null)), U(A)?.sectionId === e.sectionId && F(A, null), w.data.sections = w.data.sections.filter((t) => t.id !== e.sectionId), w.save(), D(), T?.sendPage(U(g), w.data);
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
			e.moves?.length && (_e(t, "seksjonshøyde"), U(A)?.sectionId === e.sectionId && nt()), e.sectionId === U(bt) && F(St, e.minHeight, !0), w.save(), D();
		}
	}
	function Tl(e) {
		let t = w.data.sections.find((t) => t.id === e.fromSectionId), n = w.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (De("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), _e(t, "blokk-flyttet"), _e(n, "blokk-flyttet"), w.save(), D(), ge(), T?.sendPage(U(g), w.data), U(A)?.blockId === e.blockId && (F(A, {
			...U(A),
			sectionId: e.toSectionId
		}, !0), nt()));
	}
	function El(e) {
		let t = w.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		De("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(U(A)?.blockId) && F(A, null), _e(t, "blokk-slettet"), w.save(), D(), T?.sendSection(U(g), t);
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
		T ? T.sendPlaceBlock(e) : Al(Ln()?.id, e);
	}
	function Al(e, t) {
		let n = w.data.sections.find((t) => t.id === e) ?? w.data.sections[0];
		if (!n) return;
		De("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), _e(n, "blokk-lagt-til"), w.save(), D(), T?.sendSection(U(g), n);
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
		}), _e(i, "blokk-lagt-til"), w.save(), D(), T?.sendSection(U(g), i);
	}
	function Ml(e) {
		kl(Ol(e));
	}
	let Nl = /* @__PURE__ */ P(rn([]));
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
				let n = w.data.sections.find((t) => t.id === e.sectionId)?.grid ?? U(E).grid, r = Bo({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			Al(e.sectionId, t), T?.sendSelect(t.id), e.kind === "image" && x(Q("status.imageBlockAdded")), e.kind === "galleri" && x(Q("status.galleryBlockAdded"));
		}
	}
	async function Il(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(Q("status.compressingImage"));
		let n;
		try {
			n = await on(t);
		} catch {
			x(Q("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (U(C)?.clientWidth ?? 1280));
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
		}), n.bytes > 4e5 ? x(Q("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function Ll(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await on(i);
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
		t ? x(Q("status.imagesReadFailed", { n: t }), "error") : n ? x(Q("status.imagesLarge", { n }), "error") : x(e ? "" : Q("status.noImagesAdded"));
	}
	async function zl(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Ll(t);
		n.length && ct("galleri-add", (e) => {
			e.props.images.push(...n);
		}), Rl(n.length, r, i);
	}
	async function Bl(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(Q("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Ll(t);
		if (!n.length) {
			Rl(0, r, i);
			return;
		}
		let a = Ol("galleri");
		a.props.images = n, kl(a), Rl(n.length, r, i);
	}
	function Vl(e, t) {
		ct("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Hl(e) {
		ct("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function Ul(e, t, n) {
		ct(`edit:${U(A).blockId}:img${e}-${t}`, (r) => {
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
	let Jl = /* @__PURE__ */ P(!1);
	function Yl() {
		if (!U(Jl)) {
			F(Jl, !0);
			return;
		}
		F(Jl, !1), Xl();
	}
	Sn(() => {
		if (!U(Jl)) return;
		let e = (e) => {
			e.target?.closest?.(".discard-btn") || F(Jl, !1);
		}, t = (e) => {
			e.key === "Escape" && F(Jl, !1);
		}, n = () => F(Jl, !1);
		return window.addEventListener("pointerdown", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("pointerdown", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Xl() {
		De("discard");
		for (let e of U(E).pages) e.id !== U(g) && !xe.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = w.reset();
		if (ve.reset(), mi && (mi.reset(), Di()), zr) {
			zr.reset(), F(Wr, [...zr.data.samlinger ?? []], !0);
			for (let e of Object.keys(Vr)) U(Wr).includes(e) ? Vr[e].reset() : delete Vr[e];
			Qr();
		}
		ye(), F(ne, {
			snap: !0,
			...U(E).grid
		}, !0), D(), F(v, ""), be(), U(E).pages.some((e) => e.id === U(g)) ? T?.sendPage(U(g), e) : $n(U(E).pages[0].id);
	}
	async function Zl() {
		if (Jn) {
			x(Q("status.revertReloadBeforePublish"), "error");
			return;
		}
		x(Q("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of U(E).pages) {
			let a = `urd-draft-${i.id}`, o = xe.has(i.id) || !U(h).pages.some((e) => e.id === i.id), s = null;
			if (i.id === U(g) && (w.hasDraft() || o)) s = w.data;
			else if (i.id !== U(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = Oa(JSON.parse(e), ve.data);
				} catch {}
			}
			if (!s && o && (s = Qn(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Kl(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (ve.hasDraft()) {
			let r = JSON.parse(JSON.stringify(U(E)));
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
			i(U(h).theme, U(E).theme) || t.push("tema"), i(U(h).nav, U(E).nav) || t.push("menyen"), i(U(h).footer, U(E).footer) || t.push("footeren"), i(U(h).pages, U(E).pages) || t.push("sideregisteret"), i(U(h).grid, U(E).grid) || t.push("gridet"), (U(h).site.icon ?? null) !== (U(E).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = U(h).site, { icon: s, ...c } = U(E).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Vr).filter(([, e]) => e.hasDraft());
		if (i.length || zr?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Wl(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (zr?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(zr.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!U(Wr).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		mi?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(mi.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of U(E).pages) n.path !== "/" && e.push({
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
		for (let e of U(h).pages) {
			let t = U(E).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && o(`${e.path.slice(1)}/index.html`) : (o(e.file), e.path !== "/" && o(`${e.path.slice(1)}/index.html`));
		}
		let s = await Wn(e);
		if (!s.ok) {
			x(Q("status.publishAborted"), "error");
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
			e ? Hn = e : Un(), Kl(w.data), ql(U(E));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) xe.add(e);
			if (F(h, JSON.parse(JSON.stringify(U(E))), !0), ve = Si("urd-draft-site", () => U(h), S), ye(), mi) {
				let e = JSON.parse(JSON.stringify(mi.data));
				mi = Si("urd-draft-plugins", () => e, S), Di();
			}
			if (zr) {
				for (let e of Object.values(Vr)) for (let t of e.data.entries) Wl(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(zr.data));
				zr = Si("urd-draft-samlinger", () => e, S), Hr = {};
				for (let e of U(Wr)) {
					if (!Vr[e]) continue;
					let t = JSON.parse(JSON.stringify(Vr[e].data));
					Hr[e] = t, Vr[e] = Si(`urd-draft-samling-${e}`, () => t, S);
				}
				Qr();
			}
			F(ne, {
				snap: !0,
				...U(E).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(w.data));
			w = Si(`urd-draft-${U(g)}`, () => t, S), xe.has(U(g)) && ee(`urd-draft-${U(g)}`, JSON.stringify(t)), D(), x(Q("status.published"), "ok");
		} else if (l?.status === 401) {
			let e = (await l.json().catch(() => null))?.error;
			x(e === "Ugyldig eller utløpt innlogging" ? Q("status.loginExpired") : Q("status.loginRequired", { reason: e ?? Q("status.unknownReason") }), "error"), await Vn();
		} else l?.status === 403 ? x((await l.json().catch(() => null))?.error ?? Q("status.noPublishAccess"), "error") : l?.status === 409 ? x(Q("status.publishRace"), "error") : x(l ? (await l.json().catch(() => null))?.error ?? Q("status.publishFailed") : Q("status.publishUnavailable"), "error");
	}
	Fe();
	var Ql = Sl();
	xr("keydown", an, Pe), xr("pointerdown", an, Ne);
	var $l = L(Ql), eu = I($l), tu = (e) => {
		var t = js();
		Y(I(t), () => c.pencil), k(), O(t), W("click", t, To), K(e, t);
	};
	J(eu, (e) => {
		U(re) || e(tu);
	});
	var nu = R(eu, 2);
	let ru;
	var iu = I(nu), au = R(I(iu), 2);
	{
		let e = /* @__PURE__ */ M(() => Q("topbar.adminTheme.title"));
		$(au, {
			get value() {
				return U(u);
			},
			get title() {
				return U(e);
			},
			get options() {
				return l;
			},
			onchange: (e) => F(u, e, !0)
		});
	}
	var ou = R(au, 2);
	{
		let e = /* @__PURE__ */ M(() => Q("topbar.language.title")), t = /* @__PURE__ */ M(() => [["auto", Q("lang.auto")], ...Ze]);
		$(ou, {
			get value() {
				return Qe;
			},
			get title() {
				return U(e);
			},
			get options() {
				return U(t);
			},
			onchange: $e
		});
	}
	var su = R(ou, 2), cu = (e) => {
		var t = Ms(), n = L(t), r = I(n, !0);
		O(n);
		var i = R(n, 2), a = I(i);
		let o;
		Y(a, () => c.desktop, !0), O(a);
		var s = R(a, 2);
		let l;
		Y(s, () => c.phone, !0), O(s), O(i);
		var u = R(i, 2), d = I(u);
		let f;
		Y(d, () => c.fit, !0), O(d);
		var p = R(d, 2);
		let m;
		var h = R(p, 2), g = I(h);
		O(h), O(u);
		var _ = R(u, 2);
		let v;
		Y(_, () => c.guides, !0), O(_), z((e, t) => {
			q(r, e), o = Zr(a, 1, "ghost svelte-1n46o8q", null, o, { active: U(ie) === "desktop" }), l = Zr(s, 1, "ghost svelte-1n46o8q", null, l, { active: U(ie) === "mobile" }), f = Zr(d, 1, "ghost svelte-1n46o8q", null, f, { active: U(le) === "fit" }), m = Zr(p, 1, "ghost svelte-1n46o8q", null, m, { active: U(le) === "full" }), q(g, `${t ?? ""}%`), v = Zr(_, 1, "ghost svelte-1n46o8q", null, v, { active: U(nr) });
		}, [() => Se()?.title ?? "", () => Math.round(U(de) * 100)]), W("click", n, () => et("pages")), W("click", a, () => F(ie, "desktop")), W("click", s, () => F(ie, "mobile")), W("click", d, () => F(le, "fit")), W("click", p, () => F(le, "full")), W("click", _, rr), K(e, t);
	};
	J(su, (e) => {
		U(h) && e(cu);
	});
	var lu = R(su, 2), uu = (e) => {
		var t = Ns(), n = I(t);
		Y(n, () => c.phone);
		var r = R(n);
		O(t), z(() => q(r, ` ${U(he) ?? ""} ${U(he) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), W("click", t, () => F(ie, "mobile")), K(e, t);
	};
	J(lu, (e) => {
		U(he) > 0 && e(uu);
	});
	var du = R(lu, 2), fu = (e) => {
		var t = Ps(), n = R(L(t), 2);
		let r;
		var i = I(n, !0);
		O(n), z(() => {
			r = Zr(n, 1, "ghost discard-btn svelte-1n46o8q", null, r, { armed: U(Jl) }), ai(n, "title", U(Jl) ? "Klikk igjen for å slette alle utkastene" : "Slett utkastene og gå tilbake til publisert versjon"), q(i, U(Jl) ? "Sikker?" : "Forkast utkast");
		}), W("click", n, Yl), K(e, t);
	};
	J(du, (e) => {
		U(_) && e(fu);
	}), O(iu);
	var pu = R(iu, 2), mu = I(pu), hu = (e) => {
		var t = zs(), n = L(t), r = I(n), i = (e) => {
			var t = Fs();
			Y(L(t), () => c.eye), k(), K(e, t);
		}, a = (e) => {
			var t = Is();
			Y(L(t), () => c.pencil), k(), K(e, t);
		};
		J(r, (e) => {
			U(re) ? e(i) : e(a, -1);
		}), O(n);
		var o = R(n, 2), s = (e) => {
			var t = Ls(), n = I(t), r = (e) => {
				var t = Ar();
				Y(L(t), () => c.warn), K(e, t);
			};
			J(n, (e) => {
				U(te).allowed || e(r);
			});
			var i = R(n, 1, !0);
			O(t), z(() => {
				ai(t, "title", U(te).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), q(i, U(te).login);
			}), K(e, t);
		}, l = (e) => {
			K(e, Rs());
		};
		J(o, (e) => {
			U(te)?.loggedIn ? e(s) : U(te) && e(l, 1);
		});
		var u = R(o, 2), d = R(u, 2);
		z((e) => {
			ai(n, "title", U(re) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ai(u, "href", e), d.disabled = !U(_);
		}, [() => Se()?.path ?? "/"]), W("click", n, To), W("click", d, Zl), K(e, t);
	};
	J(mu, (e) => {
		U(h) && e(hu);
	}), O(pu), O(nu);
	var gu = R(nu, 2), _u = (e) => {
		var t = hl(), i = I(t), o = (e) => {
			var t = ml(), i = L(t);
			Br(i, 21, () => Ye, Ir, (e, t, n) => {
				var r = Hs(), i = L(r), a = (e) => {
					K(e, Bs());
				};
				J(i, (e) => {
					n > 0 && e(a);
				}), Br(R(i, 2), 16, () => U(t), (e) => e, (e, t) => {
					var n = Vs();
					let r;
					var i = I(n, !0);
					O(n), z(() => {
						r = Zr(n, 1, "svelte-1n46o8q", null, r, { active: U(Je) === t }), q(i, Xe[t]);
					}), W("click", n, () => et(t)), K(e, n);
				}), K(e, r);
			}), O(i);
			var o = R(i, 2), s = (e) => {
				var t = pl(), i = I(t), o = I(i, !0);
				O(i);
				var s = R(i, 2), l = (e) => {
					var t = qs(), n = R(I(t), 2);
					Br(n, 17, () => U(E).pages, (e) => e.id, (e, t) => {
						var n = Ks();
						let r;
						var i = I(n);
						X(i);
						var a = R(i, 2), o = (e) => {
							K(e, Us());
						}, s = (e) => {
							var n = Ws();
							X(n), z((e) => Z(n, e), [() => U(t).path.slice(1)]), W("change", n, (e) => dr(U(t), e.target.value)), K(e, n);
						};
						J(a, (e) => {
							U(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = R(a, 2), u = I(l);
						Y(u, () => c.right, !0), O(u);
						var d = R(u, 2), f = (e) => {
							var n = Gs();
							Y(n, () => c.cross, !0), O(n), W("click", n, () => fr(U(t))), K(e, n);
						};
						J(d, (e) => {
							U(t).path !== "/" && e(f);
						}), O(l), O(n), z(() => {
							r = Zr(n, 1, "page-row svelte-1n46o8q", null, r, { current: U(t).id === U(g) }), Z(i, U(t).title), u.disabled = U(t).id === U(g);
						}), W("change", i, (e) => lr(U(t), e.target.value)), W("click", u, () => $n(U(t).id)), K(e, n);
					});
					var r = R(n, 4);
					X(r);
					var i = R(r, 2);
					k(2), O(t), z((e) => i.disabled = e, [() => !U(ar).trim()]), W("keydown", r, (e) => e.key === "Enter" && cr()), li(r, () => U(ar), (e) => F(ar, e)), W("click", i, cr), K(e, t);
				}, u = (e) => {
					var t = sc(), r = R(I(t), 2), i = R(I(r), 2), a = I(i), o = R(I(a));
					{
						let e = /* @__PURE__ */ M(() => U(E).nav.logo?.type ?? "text"), t = /* @__PURE__ */ M(() => [
							["text", Q("blocks.text")],
							["image", Q("blocks.image")],
							["both", Q("opt.logo.both")]
						]);
						$(o, {
							get value() {
								return U(e);
							},
							get options() {
								return U(t);
							},
							onchange: (e) => mr(e)
						});
					}
					O(a);
					var s = R(a, 2), l = (e) => {
						var t = Js(), n = L(t);
						X(n);
						var r = R(n, 2), i = I(r);
						{
							let e = /* @__PURE__ */ M(() => U(E).nav.logo?.font ?? ""), t = /* @__PURE__ */ M(() => [["", Q("common.inherit")], ...zo.map(([e, t]) => [t, e])]);
							$(i, {
								title: "Font (Arv = temaets overskriftsfont)",
								get value() {
									return U(e);
								},
								get options() {
									return U(t);
								},
								onchange: (e) => pr({ font: e || void 0 })
							});
						}
						var a = R(i, 2);
						X(a);
						var o = R(a, 2);
						let s;
						var c = R(o, 2);
						let l;
						O(r), z((e) => {
							Z(n, U(E).nav.logo?.value ?? ""), Z(a, U(E).nav.logo?.textSize ?? ""), s = Zr(o, 1, "tbtn svelte-1n46o8q", null, s, { active: U(E).nav.logo?.bold !== !1 }), l = Zr(c, 1, "tbtn svelte-1n46o8q", null, l, e);
						}, [() => ({ active: !!U(E).nav.logo?.italic })]), W("input", n, (e) => pr({ value: e.target.value })), W("change", a, (e) => pr({ textSize: e.target.value ? Number(e.target.value) : void 0 })), W("click", o, () => pr({ bold: U(E).nav.logo?.bold === !1 })), W("click", c, () => pr({ italic: !U(E).nav.logo?.italic })), K(e, t);
					};
					J(s, (e) => {
						(U(E).nav.logo?.type ?? "text") !== "image" && e(l);
					});
					var u = R(s, 2), d = (e) => {
						var t = Ys(), n = L(t), r = I(n), i = I(r), a = R(i);
						O(r);
						var o = R(r, 2);
						X(o);
						var s = R(o, 2);
						X(s), O(n), k(2), z(() => {
							q(i, `${(U(E).nav.logo?.type === "image" ? U(E).nav.logo?.value : U(E).nav.logo?.image) ? "Bytt bilde" : "Velg bilde"} `), Z(o, U(E).nav.logo?.size ?? 32), Z(s, U(E).nav.logo?.radius ?? 0);
						}), W("change", a, hr), W("change", o, (e) => pr({ size: Number(e.target.value) })), W("change", s, (e) => pr({ radius: Number(e.target.value) })), K(e, t);
					};
					J(u, (e) => {
						(U(E).nav.logo?.type ?? "text") !== "text" && e(d);
					});
					var f = R(u, 2), p = (e) => {
						var t = Xs(), n = R(I(t));
						{
							let e = /* @__PURE__ */ M(() => U(E).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ M(() => [["image-first", Q("opt.logo.imageFirst")], ["text-first", Q("opt.logo.textFirst")]]);
							$(n, {
								get value() {
									return U(e);
								},
								get options() {
									return U(t);
								},
								onchange: (e) => pr({ order: e })
							});
						}
						O(t), K(e, t);
					};
					J(f, (e) => {
						U(E).nav.logo?.type === "both" && e(p);
					}), k(2), O(i), O(r);
					var m = R(r, 2), h = R(I(m), 2), g = I(h), _ = R(I(g));
					{
						let e = /* @__PURE__ */ M(() => U(E).nav.variant ?? "bar"), t = /* @__PURE__ */ M(() => [
							["bar", Q("opt.navVariant.bar")],
							["floating", Q("opt.navVariant.floating")],
							["floating-square", Q("opt.navVariant.floatingSquare")],
							["floating-tab", Q("opt.navVariant.floatingTab")],
							["side-left", Q("opt.navVariant.sideLeft")],
							["side-right", Q("opt.navVariant.sideRight")]
						]);
						$(_, {
							get value() {
								return U(e);
							},
							get options() {
								return U(t);
							},
							onchange: (e) => Pr(e)
						});
					}
					O(g);
					var v = R(g, 2), y = (e) => {
						var t = Zs(), n = L(t), r = I(n);
						X(r), k(), O(n);
						var i = R(n, 2), a = I(i);
						X(a), k(), O(i), z(() => {
							ii(r, U(E).nav.style?.glow === !0), ii(a, U(E).nav.style?.topGap !== !1);
						}), W("change", r, (e) => Fr(e.target.checked)), W("change", a, (e) => Lr(e.target.checked)), K(e, t);
					};
					J(v, (e) => {
						U(jr) && e(y);
					});
					var b = R(v, 2), x = (e) => {
						var t = Qs(), n = I(t);
						X(n), k(), O(t), z(() => ii(n, U(E).nav.overlay === !0)), W("change", n, (e) => H("nav", () => {
							e.target.checked ? U(E).nav.overlay = !0 : delete U(E).nav.overlay;
						})), K(e, t);
					};
					J(b, (e) => {
						!U(jr) && !U(kr) && e(x);
					});
					var S = R(b, 2), ee = (e) => {
						var t = $s(), n = R(I(t));
						{
							let e = /* @__PURE__ */ M(() => U(E).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ M(() => [
								["left", Q("common.left")],
								["center", Q("common.center")],
								["right", Q("common.right")]
							]);
							$(n, {
								get value() {
									return U(e);
								},
								get options() {
									return U(t);
								},
								onchange: (e) => G("sideAlign", e === "left" ? void 0 : e)
							});
						}
						O(t), K(e, t);
					};
					J(S, (e) => {
						U(kr) && e(ee);
					});
					var C = R(S, 2), te = I(C);
					X(te), k(), O(C);
					var ne = R(C, 2), re = R(I(ne));
					{
						let e = /* @__PURE__ */ M(() => U(E).nav.style?.size ?? "md"), t = /* @__PURE__ */ M(() => [
							["sm", Q("opt.size.sm")],
							["md", Q("opt.size.md")],
							["lg", Q("opt.size.lg")],
							["xl", Q("opt.size.xl")]
						]);
						$(re, {
							get value() {
								return U(e);
							},
							get options() {
								return U(t);
							},
							onchange: (e) => G("size", e === "md" ? void 0 : e)
						});
					}
					O(ne);
					var ie = R(ne, 2), ae = R(I(ie)), oe = (e) => {
						{
							let t = /* @__PURE__ */ M(() => U(E).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ M(() => [
								["top", Q("opt.place.top")],
								["middle", Q("opt.place.middle")],
								["bottom", Q("opt.place.bottom")]
							]);
							$(e, {
								get value() {
									return U(t);
								},
								get options() {
									return U(n);
								},
								onchange: (e) => G("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, se = (e) => {
						{
							let t = /* @__PURE__ */ M(() => U(E).nav.layout ?? "right"), n = /* @__PURE__ */ M(() => [
								["right", Q("common.right")],
								["center", Q("common.center")],
								["left", Q("opt.layout.leftAfterLogo")]
							]);
							$(e, {
								get value() {
									return U(t);
								},
								get options() {
									return U(n);
								},
								onchange: (e) => Or(e)
							});
						}
					};
					J(ae, (e) => {
						U(kr) ? e(oe) : e(se, -1);
					}), O(ie);
					var ce = R(ie, 2), le = (e) => {
						var t = tc(), n = L(t), r = I(n);
						X(r), k(), O(n);
						var i = R(n, 2), a = (e) => {
							var t = ec(), n = R(I(t));
							{
								let e = /* @__PURE__ */ M(() => U(E).nav.scroll ?? "none"), t = /* @__PURE__ */ M(() => [
									["none", Q("opt.scroll.none")],
									["shrink", Q("opt.scroll.shrink")],
									["hide", Q("opt.scroll.hide")]
								]);
								$(n, {
									get value() {
										return U(e);
									},
									get options() {
										return U(t);
									},
									onchange: (e) => H("nav", () => {
										e === "none" ? delete U(E).nav.scroll : U(E).nav.scroll = e;
									})
								});
							}
							O(t), K(e, t);
						};
						J(i, (e) => {
							U(E).nav.sticky !== !1 && e(a);
						}), z(() => ii(r, U(E).nav.sticky !== !1)), W("change", r, (e) => H("nav", () => {
							U(E).nav.sticky = e.target.checked;
						})), K(e, t);
					};
					J(ce, (e) => {
						U(kr) || e(le);
					});
					var ue = R(ce, 2), de = R(I(ue));
					{
						let e = /* @__PURE__ */ M(() => U(E).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ M(() => [
							["standard", Q("opt.hover.standard")],
							["underline", Q("opt.hover.underline")],
							["pill", Q("opt.hover.pill")],
							["lift-plain", Q("opt.hover.liftPlain")],
							["lift", Q("opt.hover.lift")]
						]);
						$(de, {
							get value() {
								return U(e);
							},
							get options() {
								return U(t);
							},
							onchange: (e) => Rr(e)
						});
					}
					O(ue);
					var fe = R(ue, 2), pe = (e) => {
						var t = nc(), n = L(t), r = R(I(n)), i = I(r);
						O(r), O(n);
						var a = R(n, 2);
						X(a), z((e) => {
							q(i, `${e ?? ""}%`), Z(a, U(E).nav.style?.hoverGlow ?? .6);
						}, [() => Math.round((U(E).nav.style?.hoverGlow ?? .6) * 100)]), W("input", a, (e) => G("hoverGlow", Number(e.target.value))), K(e, t);
					};
					J(fe, (e) => {
						U(E).nav.style?.hover === "lift" && e(pe);
					});
					var me = R(fe, 2), he = (e) => {
						var t = rc(), n = I(t), r = R(n);
						{
							let e = /* @__PURE__ */ M(() => U(E).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ M(gn);
							Pi(r, {
								get value() {
									return U(e);
								},
								get tokens() {
									return U(t);
								},
								get label() {
									return U(Nr)[1];
								},
								onchange: (e) => G("hoverColor", e)
							});
						}
						O(t), z(() => {
							ai(t, "title", U(Nr)[1]), q(n, `${U(Nr)[0] ?? ""} `);
						}), K(e, t);
					};
					J(me, (e) => {
						U(Nr) && e(he);
					});
					var ge = R(me, 2), _e = R(I(ge));
					{
						let e = /* @__PURE__ */ M(() => U(E).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ M(gn);
						Pi(_e, {
							get value() {
								return U(e);
							},
							get tokens() {
								return U(t);
							},
							label: "Tekstfargen ved hover",
							onchange: (e) => G("hoverTextColor", e)
						});
					}
					O(ge);
					var w = R(ge, 2), ve = R(I(w));
					{
						let e = /* @__PURE__ */ M(() => U(E).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ M(gn);
						Pi(ve, {
							get value() {
								return U(e);
							},
							get tokens() {
								return U(t);
							},
							label: "Menyens tekstfarge",
							onchange: (e) => G("textColor", e)
						});
					}
					O(w);
					var T = R(w, 6);
					n(T, () => mn, () => U(E).nav?.style?.background?.layers ?? []), O(h), O(m);
					var ye = R(m, 2), be = R(I(ye), 2), xe = I(be), Se = R(I(xe));
					{
						let e = /* @__PURE__ */ M(() => U(E).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ M(() => U(kr) ? [
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
						$(Se, {
							get value() {
								return U(e);
							},
							get options() {
								return U(t);
							},
							onchange: (e) => G("subStyle", e === "card" ? void 0 : e)
						});
					}
					O(xe);
					var D = R(xe, 2), Ce = (e) => {
						var t = ic(), n = R(I(t));
						{
							let e = /* @__PURE__ */ M(() => U(E).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ M(gn);
							Pi(n, {
								get value() {
									return U(e);
								},
								get tokens() {
									return U(t);
								},
								label: "Pille-punktenes farge",
								onchange: (e) => G("subPillColor", e)
							});
						}
						O(t), K(e, t);
					};
					J(D, (e) => {
						U(E).nav.style?.subStyle === "pills" && e(Ce);
					});
					var we = R(D, 2), Te = R(I(we));
					X(Te), O(we), O(be), O(ye);
					var Ee = R(ye, 2), De = R(I(Ee), 2), Oe = I(De);
					Br(Oe, 17, () => U(E).nav.items, Ir, (e, t, n) => {
						var r = oc(), i = L(r), a = I(i);
						X(a);
						var o = R(a, 2), s = I(o);
						Y(s, () => c.plus, !0), O(s);
						var l = R(s, 2);
						l.disabled = n === 0, Y(l, () => c.up, !0), O(l);
						var u = R(l, 2);
						Y(u, () => c.down, !0), O(u);
						var d = R(u, 2);
						Y(d, () => c.cross, !0), O(d), O(o);
						var f = R(o, 2), p = I(f);
						{
							let e = /* @__PURE__ */ M(() => U(t).page ?? (U(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ M(() => [
								...U(E).pages.map((e) => [e.id, e.title]),
								["__href", Q("opt.linkHref")],
								...U(t).children ? [["__none", "Ingen lenke (kun åpner undermenyen)"]] : []
							]);
							$(p, {
								get value() {
									return U(e);
								},
								title: "Hvor lenken går",
								get options() {
									return U(r);
								},
								onchange: (e) => qa(n, e)
							});
						}
						O(f);
						var m = R(f, 2), h = (e) => {
							var r = ns();
							X(r), z(() => Z(r, U(t).href)), W("change", r, (e) => Ja(n, e.target.value)), K(e, r);
						};
						J(m, (e) => {
							!U(t).page && U(t).href != null && e(h);
						}), O(i), Br(R(i, 2), 17, () => U(t).children ?? [], Ir, (e, r, i) => {
							var a = ac(), o = I(a);
							X(o);
							var s = R(o, 2), l = I(s);
							l.disabled = i === 0, Y(l, () => c.up, !0), O(l);
							var u = R(l, 2);
							Y(u, () => c.down, !0), O(u);
							var d = R(u, 2);
							Y(d, () => c.cross, !0), O(d), O(s);
							var f = R(s, 2), p = I(f);
							{
								let e = /* @__PURE__ */ M(() => U(r).page ?? "__href"), t = /* @__PURE__ */ M(() => [...U(E).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								$(p, {
									get value() {
										return U(e);
									},
									title: "Hvor lenken går",
									get options() {
										return U(t);
									},
									onchange: (e) => eo(n, i, e)
								});
							}
							O(f);
							var m = R(f, 2), h = (e) => {
								var t = ns();
								X(t), z(() => Z(t, U(r).href ?? "")), W("change", t, (e) => to(n, i, e.target.value)), K(e, t);
							};
							J(m, (e) => {
								U(r).page || e(h);
							}), O(a), z(() => {
								Z(o, U(r).label), u.disabled = i === U(t).children.length - 1;
							}), W("input", o, (e) => $a(n, i, e.target.value)), W("click", l, () => no(n, i, -1)), W("click", u, () => no(n, i, 1)), W("click", d, () => ro(n, i)), K(e, a);
						}), z(() => {
							Z(a, U(t).label), u.disabled = n === U(E).nav.items.length - 1;
						}), W("input", a, (e) => Ka(n, e.target.value)), W("click", s, () => Qa(n)), W("click", l, () => Ya(n, -1)), W("click", u, () => Ya(n, 1)), W("click", d, () => Xa(n)), K(e, r);
					});
					var ke = R(Oe, 2);
					k(2), O(De), O(Ee), O(t), z(() => {
						ii(te, U(E).nav.style?.blur !== !1), Z(Te, U(E).nav.style?.subColumns ?? 1);
					}), W("change", te, (e) => G("blur", e.target.checked)), W("change", Te, (e) => G("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), W("click", ke, Za), K(e, t);
				}, f = (e) => {
					var t = uc(), n = I(t), r = R(I(n));
					X(r), O(n);
					var i = R(n, 2), a = R(I(i));
					X(a), O(i);
					var o = R(i, 2), s = I(o), l = R(s);
					{
						let e = /* @__PURE__ */ M(wr), t = /* @__PURE__ */ M(Tr);
						$(l, {
							get value() {
								return U(e);
							},
							get options() {
								return U(t);
							},
							onchange: (e) => Er(e)
						});
					}
					O(o);
					var u = R(o, 4), d = R(I(u)), f = (e) => {
						var t = cc();
						z(() => ai(t, "src", U(E).site.icon)), K(e, t);
					};
					J(d, (e) => {
						U(E).site.icon && e(f);
					}), O(u);
					var p = R(u, 2), m = I(p), h = I(m), g = R(h);
					O(m);
					var _ = R(m, 2), v = (e) => {
						var t = lc(), n = L(t);
						Y(n, () => c.pencil ?? "✎", !0), O(n);
						var r = R(n, 2);
						Y(r, () => c.cross, !0), O(r), W("click", n, () => F(gr, U(E).site.icon, !0)), W("click", r, br), K(e, t);
					};
					J(_, (e) => {
						U(E).site.icon && e(v);
					}), O(p), O(t), z((e, t) => {
						Z(r, U(E).site.title ?? ""), Z(a, U(E).site.description ?? ""), ai(o, "title", e), q(s, `${t ?? ""} `), q(h, `${U(E).site.icon ? "Bytt ikon" : "Velg ikon"} `);
					}, [() => Q("site.langTitle"), () => Q("site.langLabel")]), W("input", r, (e) => Sr(e.target.value)), W("input", a, (e) => Cr(e.target.value)), W("change", g, _r), K(e, t);
				}, p = (e) => {
					var t = yc();
					{
						let e = (e, t = d, n = d) => {
							var r = fc(), i = I(r), a = (e) => {
								var t = dc(), r = I(t, !0);
								O(t), z(() => q(r, n())), K(e, t);
							};
							J(i, (e) => {
								n() && e(a);
							});
							var o = R(i, 2);
							O(r), z((e, t, n, r, i) => $r(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), [
								() => bo(t().bg, t()),
								() => bo(t().surface, t()),
								() => bo(t().text, t()),
								() => bo(t().accent, t()),
								() => bo(t()["accent-text"] ?? t().bg, t())
							]), K(e, r);
						};
						var n = R(I(t), 2);
						Br(n, 21, () => So, (e) => e.id, (e, t) => {
							var n = pc();
							let r;
							var i = I(n), a = I(i), o = R(a), s = R(o), c = R(s);
							O(i);
							var l = R(i, 2), u = I(l, !0);
							O(l), O(n), z(() => {
								r = Zr(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: U(wo) === U(t).id }), ai(n, "title", `${U(t).name} - ${U(t).note}`), $r(a, `background:${U(t).light.bg ?? ""}`), $r(o, `background:${U(t).light.surface ?? ""}`), $r(s, `background:${U(t).light.accent ?? ""}`), $r(c, `background:${U(t).light.text ?? ""}`), q(u, U(t).name);
							}), W("click", n, () => Co(U(t))), K(e, n);
						}), O(n);
						var r = R(n, 4), i = I(r);
						X(i), k(), O(r);
						var a = R(r, 2), o = (e) => {
							var t = mc(), n = R(I(t), 2), r = I(n);
							let i;
							var a = R(r, 2);
							let o;
							O(n), O(t), z(() => {
								i = Zr(r, 1, "svelte-1n46o8q", null, i, { on: U(yn) }), o = Zr(a, 1, "svelte-1n46o8q", null, o, { on: !U(yn) });
							}), W("click", r, () => go(!0)), W("click", a, () => go(!1)), K(e, t);
						};
						J(a, (e) => {
							U(vn) && e(o);
						});
						var s = R(a, 2), c = I(s), l = (e) => {
							K(e, hc());
						};
						J(c, (e) => {
							U(vn) && e(l);
						});
						var u = R(c, 2);
						let ge;
						O(s);
						var f = R(s, 2);
						Br(f, 21, () => _n, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ M(() => m(U(t), 3));
							let r = () => U(n)[0], i = () => U(n)[1], a = () => U(n)[2];
							var o = gc(), s = I(o);
							{
								let e = /* @__PURE__ */ M(() => U(E).theme.tokens.color[r()] ?? U(E).theme.tokens.color.bg), t = /* @__PURE__ */ M(gn);
								Pi(s, {
									get value() {
										return U(e);
									},
									get tokens() {
										return U(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => oo(r(), e)
								});
							}
							var c = R(s, 2), l = I(c, !0);
							O(c);
							var u = R(c, 2), d = I(u, !0);
							O(u), O(o), z((e) => {
								q(l, a()), q(d, e);
							}, [() => bo(U(E).theme.tokens.color[r()] ?? U(E).theme.tokens.color.bg, U(xn))]), K(e, o);
						}), O(f);
						var p = R(f, 2), h = (e) => {
							var t = vc(), n = L(t), r = R(I(n), 2);
							let i;
							O(n);
							var a = R(n, 2);
							let o;
							Br(a, 21, () => _n, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ M(() => m(U(t), 3));
								let r = () => U(n)[0], i = () => U(n)[1], a = () => U(n)[2];
								var o = gc(), s = I(o);
								{
									let e = /* @__PURE__ */ M(() => U(E).theme.alt.tokens.color[r()] ?? U(Cn)[r()] ?? U(E).theme.tokens.color.bg), t = /* @__PURE__ */ M(gn), n = /* @__PURE__ */ M(() => `Mørk ${i()}`);
									Pi(s, {
										get value() {
											return U(e);
										},
										get tokens() {
											return U(t);
										},
										get label() {
											return U(n);
										},
										onchange: (e) => po(r(), e)
									});
								}
								var c = R(s, 2), l = I(c, !0);
								O(c);
								var u = R(c, 2), d = I(u, !0);
								O(u), O(o), z((e) => {
									q(l, a()), q(d, e);
								}, [() => bo(U(E).theme.alt.tokens.color[r()] ?? U(Cn)[r()], U(Cn))]), K(e, o);
							}), O(a);
							var s = R(a, 2), c = (e) => {
								K(e, _c());
							};
							J(s, (e) => {
								U(yn) && e(c);
							}), z(() => {
								i = Zr(r, 1, "stdtag svelte-1n46o8q", null, i, { ghost: U(bn) !== "dark" }), o = Zr(a, 1, "palcells svelte-1n46o8q", null, o, { autopal: U(yn) });
							}), W("click", r, () => mo("dark")), K(e, t);
						};
						J(p, (e) => {
							U(vn) && e(h);
						});
						var g = R(p, 2), _ = I(g);
						e(_, () => U(xn), () => U(vn) ? "Lys" : "");
						var v = R(_, 2), y = (t) => {
							e(t, () => U(Cn), () => "Mørk");
						};
						J(v, (e) => {
							U(vn) && e(y);
						}), O(g);
						var b = R(g, 2), x = R(I(b), 2), S = I(x), ee = R(I(S));
						{
							let e = /* @__PURE__ */ M(() => _o("heading"));
							$(ee, {
								get value() {
									return U(E).theme.tokens.font.heading;
								},
								get options() {
									return U(e);
								},
								onchange: (e) => co("heading", e)
							});
						}
						O(S);
						var C = R(S, 2), te = R(I(C));
						{
							let e = /* @__PURE__ */ M(() => _o("body"));
							$(te, {
								get value() {
									return U(E).theme.tokens.font.body;
								},
								get options() {
									return U(e);
								},
								onchange: (e) => co("body", e)
							});
						}
						O(C);
						var ne = R(C, 2), re = I(ne), ie = R(re, 2);
						O(ne), O(x), O(b);
						var ae = R(b, 2), oe = R(I(ae), 2), se = I(oe), ce = R(se, 2), le = R(I(ce)), ue = I(le, !0);
						O(le), O(ce);
						var de = R(ce, 2);
						X(de);
						var fe = R(de, 2), pe = R(I(fe)), me = I(pe, !0);
						O(pe), O(fe);
						var he = R(fe, 2);
						X(he), O(oe), O(ae), O(t), z((e, t) => {
							ii(i, U(vn)), ge = Zr(u, 1, "stdtag svelte-1n46o8q", null, ge, { ghost: U(bn) !== "light" }), $r(re, `font-family:${U(E).theme.tokens.font.heading ?? ""}`), $r(ie, `font-family:${U(E).theme.tokens.font.body ?? ""}`), $r(se, `--r-sm:${U(E).theme.tokens.radius.sm ?? ""};--r-md:${U(E).theme.tokens.radius.md ?? ""}`), q(ue, U(E).theme.tokens.radius.sm), Z(de, e), q(me, U(E).theme.tokens.radius.md), Z(he, t);
						}, [() => vo(U(E).theme.tokens.radius.sm), () => vo(U(E).theme.tokens.radius.md)]), W("change", i, (e) => ho(e.target.checked)), W("click", u, () => mo("light")), W("input", de, (e) => yo("sm", Number(e.target.value))), W("input", he, (e) => yo("md", Number(e.target.value)));
					}
					K(e, t);
				}, h = (e) => {
					var t = Cc();
					let n;
					var r = R(I(t), 2), i = R(I(r), 2), a = I(i), o = R(a, 2);
					O(i), O(r);
					var s = R(r, 2), c = R(s, 2), l = R(I(c));
					O(c);
					var u = R(c, 2), d = R(u, 2), f = R(d, 2), p = R(f, 2), m = R(p, 2), h = R(I(m), 2), g = I(h), _ = R(g, 2), v = R(I(_));
					O(_), O(h), O(m);
					var y = R(m, 2), b = R(I(y), 2), x = I(b), S = R(x, 2), ee = R(S, 2), C = R(ee, 2), te = R(C, 2);
					O(b), O(y);
					var ne = R(y, 2), re = (e) => {
						var t = Sc(), n = R(I(t), 2);
						Br(n, 21, () => U(Nl), (e) => e.type, (e, t) => {
							var n = Ar(), r = L(n), i = (e) => {
								var n = xc(), r = I(n), i = I(r, !0);
								O(r);
								var a = R(r, 2);
								Br(a, 21, () => U(t).variants, (e) => e.label, (e, n) => {
									var r = bc(), i = I(r, !0);
									O(r), z(() => {
										ai(r, "title", `Fra pluginen ${U(t).plugin ?? ""}`), q(i, U(n).label);
									}), W("click", r, () => Pl(U(t), U(n).props)), K(e, r);
								}), O(a), O(n), z(() => q(i, U(t).label)), K(e, n);
							}, a = (e) => {
								var n = bc(), r = I(n, !0);
								O(n), z(() => {
									ai(n, "title", `Fra pluginen ${U(t).plugin ?? ""}`), q(r, U(t).label);
								}), W("click", n, () => Pl(U(t))), K(e, n);
							};
							J(r, (e) => {
								U(t).variants?.length ? e(i) : e(a, -1);
							}), K(e, n);
						}), O(n), O(t), K(e, t);
					};
					J(ne, (e) => {
						U(Nl).length && e(re);
					}), O(t), z(() => {
						n = Zr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: U(ie) === "mobile" }), ai(t, "title", U(ie) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), W("click", a, () => Ml("text")), W("click", o, () => Ml("text-box")), W("click", s, () => Ml("button")), W("change", l, Il), W("click", u, () => Ml("video")), W("click", d, () => Ml("icon")), W("click", f, () => Ml("samling")), W("click", p, () => Ml("faq")), W("click", g, () => Ml("galleri")), W("change", v, Bl), W("click", x, () => Ml("shape-line")), W("click", S, () => Ml("shape-arrow")), W("click", ee, () => Ml("shape-circle")), W("click", C, () => Ml("shape-rect")), W("click", te, () => Ml("shape-triangle")), K(e, t);
				}, _ = (e) => {
					var t = wc(), n = R(I(t), 2), r = R(I(n)), i = I(r);
					O(r), O(n);
					var a = R(n, 2);
					X(a);
					var o = R(a, 2), s = I(o);
					X(s), k(), O(o), k(2), O(t), z(() => {
						q(i, `${U(ne).size ?? ""} px`), Z(a, U(ne).size), ii(s, U(ne).snap !== !1);
					}), W("input", a, (e) => Bn("size", Number(e.target.value))), W("change", s, (e) => Bn("snap", e.target.checked)), K(e, t);
				}, v = (e) => {
					var t = Mc(), r = I(t), i = (e) => {
						var t = Tc(), n = L(t), r = I(n, !0);
						O(n);
						var i = R(n, 2);
						a(i), z((e) => q(r, e), [() => Q("blocks.suffix", { label: _t[U(A).type] ?? U(A).type })]), K(e, t);
					}, o = (e) => {
						var t = Ac(), r = R(L(t), 2), i = R(I(r));
						X(i), O(r);
						var a = R(r, 6), o = I(a);
						X(o), k(), O(a);
						var s = R(a, 2), l = (e) => {
							var t = Ec(), n = L(t), r = R(I(n)), i = I(r);
							O(r), O(n);
							var a = R(n, 2);
							X(a), z(() => {
								q(i, `${U(xt).size ?? ""} px`), Z(a, U(xt).size);
							}), W("input", a, (e) => zn("size", Number(e.target.value))), K(e, t);
						};
						J(s, (e) => {
							U(xt) && e(l);
						});
						var u = R(s, 4), d = R(I(u));
						{
							let e = /* @__PURE__ */ M(() => [["", Q("common.standard")], ...Object.entries(Va)]);
							$(d, {
								get value() {
									return U(Et);
								},
								get options() {
									return U(e);
								},
								onchange: (e) => At(e)
							});
						}
						O(u);
						var f = R(u, 2), p = R(I(f)), m = I(p), h = I(m);
						O(m);
						var g = R(m, 2);
						Y(g, () => c.copy, !0), O(g), O(p), O(f);
						var _ = R(f, 6);
						n(_, () => U(pn), () => U(Ct));
						var v = R(_, 4), y = R(I(v));
						{
							let e = /* @__PURE__ */ M(() => Tn(U(wt)) ? U(wt).type : "");
							$(y, {
								get value() {
									return U(e);
								},
								get options() {
									return En;
								},
								onchange: (e) => Mn(e || null)
							});
						}
						O(v);
						var b = R(v, 2), x = (e) => {
							var t = kc(), n = L(t), r = R(I(n));
							X(r), O(n);
							var i = R(n, 2), a = (e) => {
								var t = Dc(), n = L(t), r = R(I(n));
								X(r), O(n);
								var i = R(n, 2), a = R(I(i));
								{
									let e = /* @__PURE__ */ M(() => U(wt).props.pattern ?? "sequence"), t = /* @__PURE__ */ M(() => [["sequence", Q("opt.stagger.sequence")], ["columns", Q("opt.stagger.columns")]]);
									$(a, {
										get value() {
											return U(e);
										},
										get options() {
											return U(t);
										},
										onchange: (e) => Fn(e)
									});
								}
								O(i), z(() => Z(r, U(wt).props.step ?? 90)), W("change", r, (e) => Pn("step", Number(e.target.value))), K(e, t);
							}, o = (e) => {
								var t = Oc(), n = R(I(t));
								X(n), O(t), z(() => Z(n, U(wt).props.delay)), W("change", n, (e) => Pn("delay", Number(e.target.value))), K(e, t);
							};
							J(i, (e) => {
								U(wt).type === "stagger" ? e(a) : e(o, -1);
							}), z(() => Z(r, U(wt).props.duration)), W("change", r, (e) => Pn("duration", Number(e.target.value))), K(e, t);
						}, S = /* @__PURE__ */ M(() => Tn(U(wt)));
						J(b, (e) => {
							U(S) && e(x);
						});
						var ee = R(b, 2), C = R(I(ee));
						{
							let e = /* @__PURE__ */ M(() => U(Tt)?.type ?? (U(wt) && !Tn(U(wt)) ? U(wt).type : ""));
							$(C, {
								get value() {
									return U(e);
								},
								get options() {
									return Dn;
								},
								onchange: (e) => Nn(e || null)
							});
						}
						O(ee), z(() => {
							Z(i, U(St)), ii(o, U(xt) !== null), q(h, `#${U(bt) ?? ""}`);
						}), W("change", i, (e) => In(e.target.value)), W("change", o, (e) => Rn(e.target.checked)), W("click", g, () => navigator.clipboard?.writeText(`#${U(bt)}`)), K(e, t);
					}, s = (e) => {
						K(e, jc());
					};
					J(r, (e) => {
						U(A) ? e(i) : U(bt) ? e(o, 1) : e(s, -1);
					}), O(t), K(e, t);
				}, y = (e) => {
					var t = Kc(), i = I(t), a = I(i);
					X(a), k(), O(i);
					var o = R(i, 2), s = (e) => {
						var t = Pc(), n = R(I(t), 2);
						Br(n, 21, () => U(E).pages ?? [], (e) => e.id, (e, t) => {
							var n = Nc(), r = I(n);
							X(r);
							var i = R(r);
							O(n), z((e) => {
								ii(r, e), q(i, ` ${(U(t).title || U(t).id) ?? ""}`);
							}, [() => !(U(E).footer?.hideOn ?? []).includes(U(t).id)]), W("change", r, (e) => _a(U(t).id, e.target.checked)), K(e, n);
						}), O(n), O(t), K(e, t);
					};
					J(o, (e) => {
						U(E).footer?.show && e(s);
					});
					var l = R(o, 2), u = R(I(l), 2), d = I(u);
					Br(d, 21, () => Qi, (e) => e.id, (e, t) => {
						var n = Fc(), r = I(n);
						Y(r, () => Fo(U(t).thumb), !0), O(r);
						var i = R(r, 2), a = I(i, !0);
						O(i), O(n), z(() => {
							ai(n, "title", `Fyller footeren med ${U(t).label ?? ""}-oppsettet - rediger fritt videre`), q(a, U(t).label);
						}), W("click", n, () => ra(U(t).id)), K(e, n);
					}), O(d), O(u), O(l);
					var f = R(l, 2), p = R(I(f), 2), m = I(p), h = R(I(m));
					X(h), O(m);
					var g = R(m, 2), _ = R(I(g));
					X(_), O(g);
					var v = R(g, 2), y = R(I(v));
					{
						let e = /* @__PURE__ */ M(() => U(E).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ M(() => [
							["text", Q("blocks.text")],
							["image", Q("opt.brand.image")],
							["both", Q("opt.brand.both")]
						]);
						$(y, {
							get value() {
								return U(e);
							},
							get options() {
								return U(t);
							},
							onchange: (e) => qi(e)
						});
					}
					O(v);
					var b = R(v, 2), x = (e) => {
						var t = Rc(), n = L(t), r = I(n), i = I(r), a = R(i);
						O(r);
						var o = R(r, 2), s = (e) => {
							var t = Ic();
							Y(t, () => c.cross, !0), O(t), W("click", t, Yi), K(e, t);
						};
						J(o, (e) => {
							U(E).footer?.brand?.logo && e(s);
						}), O(n);
						var l = R(n, 2), u = (e) => {
							var t = Lc(), n = L(t), r = R(I(n)), i = I(r);
							O(r), O(n);
							var a = R(n, 2);
							X(a), z(() => {
								q(i, `${U(E).footer?.brand?.logoHeight ?? 40 ?? ""} px`), Z(a, U(E).footer?.brand?.logoHeight ?? 40);
							}), W("input", a, (e) => Xi(e.target.value)), K(e, t);
						};
						J(l, (e) => {
							U(E).footer?.brand?.logo && e(u);
						}), z(() => q(i, `${U(E).footer?.brand?.logo ? "Bytt logo" : "Last opp logo"} `)), W("change", a, Ji), K(e, t);
					};
					J(b, (e) => {
						(U(E).footer?.brand?.mode ?? "text") !== "text" && e(x);
					}), O(p), O(f);
					var S = R(f, 2), ee = R(I(S), 2), C = I(ee);
					Br(C, 17, () => U(E).footer?.columns ?? [], Ir, (e, t, n) => {
						var r = zc(), i = L(r), a = I(i);
						X(a);
						var o = R(a, 2), s = I(o);
						Y(s, () => c.plus, !0), O(s);
						var l = R(s, 2);
						l.disabled = n === 0, Y(l, () => c.up, !0), O(l);
						var u = R(l, 2);
						Y(u, () => c.down, !0), O(u);
						var d = R(u, 2);
						Y(d, () => c.cross, !0), O(d), O(o), O(i), Br(R(i, 2), 17, () => U(t).links ?? [], Ir, (e, r, i) => {
							var a = rs(), o = I(a);
							X(o);
							var s = R(o, 2), l = I(s);
							l.disabled = i === 0, Y(l, () => c.up, !0), O(l);
							var u = R(l, 2);
							Y(u, () => c.down, !0), O(u);
							var d = R(u, 2);
							Y(d, () => c.cross, !0), O(d), O(s);
							var f = R(s, 2), p = I(f);
							{
								let e = /* @__PURE__ */ M(() => U(r).page ?? "__href"), t = /* @__PURE__ */ M(() => [...U(E).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHref")]]);
								$(p, {
									get value() {
										return U(e);
									},
									title: "Hvor lenken går",
									get options() {
										return U(t);
									},
									onchange: (e) => Aa(n, i, e)
								});
							}
							O(f);
							var m = R(f, 2), h = (e) => {
								var t = ns();
								X(t), z(() => Z(t, U(r).href ?? "")), W("change", t, (e) => Ma(n, i, e.target.value)), K(e, t);
							};
							J(m, (e) => {
								U(r).page || e(h);
							}), O(a), z(() => {
								Z(o, U(r).label), u.disabled = i === U(t).links.length - 1;
							}), W("input", o, (e) => ka(n, i, e.target.value)), W("click", l, () => Ea(n, i, -1)), W("click", u, () => Ea(n, i, 1)), W("click", d, () => Ta(n, i)), K(e, a);
						}), z(() => {
							Z(a, U(t).title), u.disabled = n === U(E).footer.columns.length - 1;
						}), W("input", a, (e) => Ca(n, e.target.value)), W("click", s, () => wa(n)), W("click", l, () => ba(n, -1)), W("click", u, () => ba(n, 1)), W("click", d, () => ya(n)), K(e, r);
					});
					var te = R(C, 2), ne = R(te, 2), re = R(I(ne));
					{
						let e = /* @__PURE__ */ M(() => U(E).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ M(() => [["left", Q("common.left")], ["center", Q("common.center")]]);
						$(re, {
							get value() {
								return U(e);
							},
							get options() {
								return U(t);
							},
							onchange: (e) => ua(e)
						});
					}
					O(ne), O(ee), O(S);
					var ie = R(S, 2), ae = R(I(ie), 2), oe = I(ae);
					Br(oe, 17, () => U(E).footer?.social ?? [], Ir, (e, t, n) => {
						var r = Bc(), i = I(r), a = I(i);
						Y(a, () => na(U(t).icon) || "", !0), O(a), $(R(a, 2), {
							get value() {
								return U(t).icon;
							},
							title: "Ikon",
							get options() {
								return Ga;
							},
							onchange: (e) => za(n, e)
						}), O(i);
						var o = R(i, 2), s = I(o);
						s.disabled = n === 0, Y(s, () => c.up, !0), O(s);
						var l = R(s, 2);
						Y(l, () => c.down, !0), O(l);
						var u = R(l, 2);
						Y(u, () => c.cross, !0), O(u), O(o);
						var d = R(o, 2);
						X(d), O(r), z(() => {
							l.disabled = n === U(E).footer.social.length - 1, Z(d, U(t).url);
						}), W("click", s, () => La(n, -1)), W("click", l, () => La(n, 1)), W("click", u, () => Ia(n)), W("change", d, (e) => Ba(n, e.target.value)), K(e, r);
					});
					var se = R(oe, 2);
					O(ae), O(ie);
					var ce = R(ie, 2), le = R(I(ce), 2), ue = I(le), de = I(ue);
					X(de), k(), O(ue);
					var fe = R(ue, 2), pe = (e) => {
						let t = /* @__PURE__ */ M(() => U(E).footer.cta);
						var n = Wc(), r = L(n), i = R(I(r));
						{
							let e = /* @__PURE__ */ M(() => U(t).kind ?? "button"), n = /* @__PURE__ */ M(() => [["button", Q("opt.cta.button")], ["newsletter", Q("opt.cta.newsletter")]]);
							$(i, {
								get value() {
									return U(e);
								},
								get options() {
									return U(n);
								},
								onchange: (e) => fa("kind", e)
							});
						}
						O(r);
						var a = R(r, 2), o = I(a);
						X(o), k(), O(a);
						var s = R(a, 2), c = R(I(s));
						X(c), O(s);
						var l = R(s, 2), u = R(I(l));
						X(u), O(l);
						var d = R(l, 2), f = R(I(d));
						X(f), O(d);
						var p = R(d, 2), m = (e) => {
							var n = Hc(), r = L(n), i = R(I(r));
							{
								let e = /* @__PURE__ */ M(() => U(t).page ?? "__href"), n = /* @__PURE__ */ M(() => [...U(E).pages.map((e) => [e.id, e.title]), ["__href", Q("opt.linkHrefMailto")]]);
								$(i, {
									get value() {
										return U(e);
									},
									get options() {
										return U(n);
									},
									onchange: (e) => ha(e)
								});
							}
							O(r);
							var a = R(r, 2), o = (e) => {
								var n = Vc();
								X(n), z(() => Z(n, U(t).href ?? "")), W("change", n, (e) => fa("href", e.target.value)), K(e, n);
							};
							J(a, (e) => {
								U(t).page || e(o);
							}), K(e, n);
						}, h = (e) => {
							var n = Uc(), r = L(n), i = R(I(r));
							X(i), O(r);
							var a = R(r, 2), o = R(I(a));
							X(o), O(a);
							var s = R(a, 2), c = R(I(s));
							X(c), O(s), z(() => {
								Z(i, U(t).endpoint ?? ""), Z(o, U(t).recipient ?? ""), Z(c, U(t).success ?? "");
							}), W("change", i, (e) => fa("endpoint", e.target.value)), W("change", o, (e) => fa("recipient", e.target.value)), W("input", c, (e) => fa("success", e.target.value)), K(e, n);
						};
						J(p, (e) => {
							(U(t).kind ?? "button") === "button" ? e(m) : e(h, -1);
						}), z(() => {
							ii(o, U(t).big === !0), Z(c, U(t).heading ?? ""), Z(u, U(t).sub ?? ""), Z(f, U(t).label ?? "");
						}), W("change", o, (e) => fa("big", e.target.checked)), W("input", c, (e) => fa("heading", e.target.value)), W("input", u, (e) => fa("sub", e.target.value)), W("input", f, (e) => fa("label", e.target.value)), K(e, n);
					};
					J(fe, (e) => {
						U(E).footer?.cta && e(pe);
					}), O(le), O(ce);
					var me = R(ce, 2), he = R(I(me), 2), ge = I(he);
					r(ge, () => "linkRow", () => U(E).footer?.linkRow ?? []);
					var _e = R(ge, 2);
					O(he), O(me);
					var w = R(me, 2), ve = R(I(w), 2), T = I(ve), ye = (e) => {
						var t = Gc(), n = L(t), r = R(I(n));
						{
							let e = /* @__PURE__ */ M(() => U(E).footer?.align ?? "left"), t = /* @__PURE__ */ M(() => [
								["left", Q("common.left")],
								["center", Q("common.center")],
								["right", Q("common.right")]
							]);
							$(r, {
								get value() {
									return U(e);
								},
								get options() {
									return U(t);
								},
								onchange: (e) => zi("footer", (t) => {
									t.align = e;
								})
							});
						}
						O(n), k(2), K(e, t);
					};
					J(T, (e) => {
						U(E).footer?.cta?.big !== !0 && e(ye);
					});
					var be = R(T, 4);
					n(be, () => hn, () => U(E).footer?.background?.layers ?? []), O(ve), O(w);
					var xe = R(w, 2), Se = R(I(xe), 2), D = I(Se), Ce = R(I(D));
					X(Ce), O(D);
					var we = R(D, 4);
					r(we, () => "baseline", () => U(E).footer?.baseline ?? []);
					var Te = R(we, 2);
					O(Se), O(xe), O(t), z((e, t) => {
						ii(a, e), Z(h, U(E).footer?.brand?.title ?? ""), Z(_, U(E).footer?.brand?.tagline ?? ""), ii(de, t), Z(Ce, U(E).footer?.copyright ?? "");
					}, [() => !!U(E).footer?.show, () => !!U(E).footer?.cta]), W("change", a, (e) => zi("footer", (t) => {
						t.show = e.target.checked;
					})), W("input", h, (e) => Bi("title", e.target.value)), W("input", _, (e) => Bi("tagline", e.target.value)), W("click", te, va), W("click", se, Fa), W("change", de, (e) => da(e.target.checked)), W("click", _e, () => ia("linkRow")), W("input", Ce, (e) => Zi(e.target.value)), W("click", Te, () => ia("baseline")), K(e, t);
				}, b = (e) => {
					var t = Qc(), n = R(I(t), 2), r = (e) => {
						var t = qc(), n = R(I(t));
						{
							let e = /* @__PURE__ */ M(() => U(Kr) ?? ""), t = /* @__PURE__ */ M(() => [["", Q("common.choose")], ...U(Wr).map((e) => [e, U(Gr)[e]?.name ?? e])]);
							$(n, {
								get value() {
									return U(e);
								},
								get options() {
									return U(t);
								},
								onchange: (e) => F(Kr, e || null, !0)
							});
						}
						O(t), K(e, t);
					};
					J(n, (e) => {
						U(Wr).length && e(r);
					});
					var i = R(n, 2), a = (e) => {
						let t = /* @__PURE__ */ M(() => U(Gr)[U(Kr)]);
						var n = Zc(), r = L(n), i = I(r), a = R(i, 2);
						Y(a, () => c.cross, !0), O(a), O(r);
						var o = R(r, 2);
						Br(o, 19, () => U(t).entries, (e) => e.id, (e, n, r) => {
							var i = Yc(), a = I(i), o = I(a);
							O(a);
							var s = R(a, 2), l = I(s), u = I(l);
							X(u);
							var d = R(u, 2), f = I(d);
							Y(f, () => c.up, !0), O(f);
							var p = R(f, 2);
							Y(p, () => c.down, !0), O(p);
							var m = R(p, 2);
							Y(m, () => c.cross, !0), O(m), O(d), O(l);
							var h = R(l, 2), g = R(I(h));
							X(g), O(h);
							var _ = R(h, 2);
							st(_);
							var v = R(_, 2), y = R(I(v));
							X(y), O(v);
							var b = R(v, 2), x = I(b), S = I(x), ee = R(S);
							O(x);
							var C = R(x, 2), te = (e) => {
								var t = Jc(), r = L(t), i = R(r, 2);
								Y(i, () => c.cross, !0), O(i), z(() => ai(r, "src", U(n).image)), W("click", i, () => ci(U(Kr), U(n).id, "image", "")), K(e, t);
							};
							J(C, (e) => {
								U(n).image && e(te);
							}), O(b), O(s), O(i), z((e) => {
								q(o, `${e ?? ""}${U(n).date ? ` · ${U(n).date}` : ""}`), Z(u, U(n).title), f.disabled = U(r) === 0, p.disabled = U(r) === U(t).entries.length - 1, Z(g, U(n).date ?? ""), Z(_, U(n).text ?? ""), Z(y, U(n).href ?? ""), q(S, `${U(n).image ? "Bytt bilde" : "Legg til bilde"} `);
							}, [() => U(n).title.replace(/<[^>]*>/g, "")]), W("change", u, (e) => ci(U(Kr), U(n).id, "title", e.target.value || "Uten tittel")), W("click", f, () => ui(U(Kr), U(r), -1)), W("click", p, () => ui(U(Kr), U(r), 1)), W("click", m, () => di(U(Kr), U(n).id)), W("change", g, (e) => ci(U(Kr), U(n).id, "date", e.target.value)), W("change", _, (e) => ci(U(Kr), U(n).id, "text", e.target.value)), W("change", y, (e) => ci(U(Kr), U(n).id, "href", e.target.value)), W("change", ee, (e) => fi(U(Kr), U(n).id, e)), K(e, i);
						});
						var s = R(o, 2), l = (e) => {
							K(e, Xc());
						};
						J(s, (e) => {
							U(t).entries.length || e(l);
						}), k(2), W("click", i, () => si(U(Kr))), W("click", a, () => oi(U(Kr))), K(e, n);
					};
					J(i, (e) => {
						U(Kr) && U(Gr)[U(Kr)] && e(a);
					});
					var o = R(i, 2), s = R(I(o));
					X(s), O(o);
					var l = R(o, 2);
					$(R(I(l)), {
						get value() {
							return U(Jr);
						},
						get options() {
							return Yr;
						},
						onchange: (e) => F(Jr, e, !0)
					}), O(l);
					var u = R(l, 2);
					O(t), z((e) => u.disabled = e, [() => !U(qr).trim()]), W("keydown", s, (e) => e.key === "Enter" && ri()), li(s, () => U(qr), (e) => F(qr, e)), W("click", u, ri), K(e, t);
				}, x = (e) => {
					var t = sl(), n = R(I(t), 2), r = (e) => {
						K(e, $c());
					}, i = /* @__PURE__ */ M(() => !Ei().length);
					J(n, (e) => {
						U(i) && e(r);
					});
					var a = R(n, 2);
					Br(a, 16, Ei, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ M(() => vi[t]), r = /* @__PURE__ */ M(() => (U(_i)?.enabled ?? []).includes(t));
						var i = nl();
						let a;
						var o = I(i), s = I(o), l = I(s, !0);
						O(s);
						var u = R(s, 2), d = (e) => {
							var t = el(), r = I(t);
							O(t), z(() => q(r, `v${U(n).version ?? ""}`)), K(e, t);
						};
						J(u, (e) => {
							U(n)?.version && e(d);
						});
						var f = R(u, 2), p = I(f), m = I(p);
						X(m);
						var h = R(m);
						O(p);
						var g = R(p, 2);
						Y(g, () => c.cross, !0), O(g), O(f), O(o);
						var _ = R(o, 2), v = (e) => {
							var t = tl(), r = I(t, !0);
							O(t), z((e) => q(r, e), [() => U(n).errors.join("; ")]), K(e, t);
						}, y = (e) => {
							var t = tl(), r = I(t);
							O(t), z(() => q(r, `Krever motorversjon ${U(n).requiresEngine ?? ""} (denne siden kjører ${U(yi) ?? ""}); pluginen hoppes over ved lasting.`)), K(e, t);
						}, b = (e) => {
							var t = tl(), r = I(t);
							O(t), z((e) => q(r, `Trenger CSP-unntak i _headers: ${e ?? ""}`), [() => [...(U(n).csp.connectSrc ?? []).map((e) => `connect-src ${e}`), ...(U(n).csp.frameSrc ?? []).map((e) => `frame-src ${e}`)].join(", ")]), K(e, t);
						};
						J(_, (e) => {
							U(n)?.errors?.length ? e(v) : U(n) && !U(n).satisfied ? e(y, 1) : U(n)?.csp && e(b, 2);
						}), O(i), z((e) => {
							a = Zr(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": U(n)?.errors?.length }), q(l, U(n)?.name ?? t), ai(p, "title", U(r) ? "Aktiv: lastes på siden" : "Av: lastes ikke"), ii(m, U(r)), m.disabled = e, q(h, ` ${U(r) ? "På" : "Av"}`);
						}, [() => !!U(n)?.errors?.length]), W("change", m, (e) => Mi(t, e.target.checked)), W("click", g, () => Fi(t)), K(e, i);
					});
					var o = R(a, 2), s = (e) => {
						var t = il();
						Br(R(L(t), 4), 16, () => U(wi), (e) => e, (e, t) => {
							var n = rl(), r = I(n), i = I(r), a = I(i, !0);
							O(i);
							var o = R(i, 2), s = (e) => {
								var n = el(), r = I(n);
								O(n), z(() => q(r, `v${vi[t].version ?? ""}`)), K(e, n);
							};
							J(o, (e) => {
								vi[t]?.version && e(s);
							});
							var l = R(o, 2), u = I(l);
							Y(u, () => c.right, !0), O(u), O(l), O(r), O(n), z(() => q(a, vi[t]?.name ?? t)), W("click", u, () => Li(t)), K(e, n);
						}), K(e, t);
					};
					J(o, (e) => {
						U(wi).length && e(s);
					});
					var l = R(o, 2), u = (e) => {
						var t = Ar(), n = L(t), r = (e) => {
							K(e, al());
						};
						J(n, (e) => {
							U(wi).length || e(r);
						}), K(e, t);
					}, d = (e) => {
						var t = ol(), n = R(L(t), 2);
						X(n);
						var r = R(n, 2), i = R(r, 2), a = (e) => {
							var t = tl(), n = I(t, !0);
							O(t), z(() => q(n, U(Ci))), K(e, t);
						};
						J(i, (e) => {
							U(Ci) && e(a);
						}), z((e) => r.disabled = e, [() => !U(xi).trim()]), W("keydown", n, (e) => e.key === "Enter" && Ii()), li(n, () => U(xi), (e) => F(xi, e)), W("click", r, Ii), K(e, t);
					};
					J(l, (e) => {
						U(Ti) === "ok" ? e(u) : e(d, -1);
					}), O(t), K(e, t);
				}, S = (e) => {
					var t = fl(), n = R(I(t), 2), r = (e) => {
						K(e, cl());
					}, i = (e) => {
						var t = Hs(), n = L(t), r = (e) => {
							var t = ll(), n = I(t, !0);
							O(t), z(() => q(n, U(Gn))), K(e, t);
						};
						J(n, (e) => {
							U(Gn) && e(r);
						});
						var i = R(n, 2), a = (e) => {
							var t = dl(), n = L(t);
							Br(R(n, 2), 19, () => U(B), (e) => e.sha, (e, t, n) => {
								var r = ul();
								let i;
								var a = I(r), o = I(a, !0);
								O(a);
								var s = R(a, 2), c = I(s);
								O(s), O(r), z((e) => {
									i = Zr(r, 1, "history-row svelte-1n46o8q", null, i, { head: U(n) === 0 }), ai(a, "title", U(t).sha), q(o, U(t).message), q(c, `${U(t).author ?? ""}${e ?? ""}`);
								}, [() => U(t).date ? ` · ${qn.format(new Date(U(t).date))}` : ""]), K(e, r);
							}), z(() => {
								n.disabled = U(Kn) || !U(te)?.allowed, ai(n, "title", U(te)?.allowed ? "Gjenopprett tilstanden før siste publisering" : "Krever publiseringstilgang");
							}), W("click", n, Yn), K(e, t);
						};
						J(i, (e) => {
							U(B).length > 0 && e(a);
						}), K(e, t);
					};
					J(n, (e) => {
						U(B) === null ? e(r) : e(i, -1);
					}), O(t), K(e, t);
				};
				J(s, (e) => {
					U(Je) === "pages" ? e(l) : U(Je) === "nav" ? e(u, 1) : U(Je) === "site" ? e(f, 2) : U(Je) === "theme" ? e(p, 3) : U(Je) === "blocks" ? e(h, 4) : U(Je) === "grid" ? e(_, 5) : U(Je) === "properties" ? e(v, 6) : U(Je) === "footer" ? e(y, 7) : U(Je) === "collections" ? e(b, 8) : U(Je) === "plugins" ? e(x, 9) : U(Je) === "history" && e(S, 10);
				}), O(t), z(() => q(o, Xe[U(Je)])), K(e, t);
			};
			J(o, (e) => {
				U(Je) && e(s);
			}), K(e, t);
		};
		J(i, (e) => {
			U(re) && e(o);
		});
		var s = R(i, 2);
		let l;
		var u = I(s), f = I(u);
		pi(f, (e) => F(C, e), () => U(C)), O(u), O(s), pi(s, (e) => F(ae, e), () => U(ae)), O(t), z(() => {
			l = Zr(s, 1, "frame-wrap svelte-1n46o8q", null, l, { mobile: U(ie) === "mobile" }), $r(u, `width:${U(pe) ?? ""}px; height:${U(me) ?? ""}px`), ai(f, "src", `/?page=${U(g)}&preview=1`), $r(f, `width:${U(ue) ?? ""}px; height:${U(fe) ?? ""}px; transform:scale(${U(de) ?? ""}); transform-origin:top left`);
		}), xr("load", f, er), yr(f), K(e, t);
	}, vu = (e) => {
		K(e, gl());
	};
	J(gu, (e) => {
		U(h) ? e(_u) : e(vu, -1);
	});
	var yu = R(gu, 2), bu = (e) => {
		xa(e, {
			get image() {
				return U(gr);
			},
			onapply: vr,
			oncancel: () => F(gr, null)
		});
	};
	J(yu, (e) => {
		U(gr) && e(bu);
	});
	var xu = R(yu, 2), Su = (e) => {
		var t = vl(), n = I(t), r = I(n), i = I(r, !0);
		O(r);
		var a = R(r, 2);
		Br(a, 16, () => U(Ie).lines, (e) => e, (e, t) => {
			var n = _l(), r = I(n, !0);
			O(n), z(() => q(r, t)), K(e, n);
		});
		var o = R(a, 2), s = I(o), c = I(s, !0);
		O(s);
		var l = R(s, 2), u = I(l, !0);
		O(l), O(o), O(n), O(t), z(() => {
			q(i, U(Ie).title), q(c, U(Ie).cancelLabel), q(u, U(Ie).okLabel);
		}), W("click", s, () => Re(!1)), W("click", l, () => Re(!0)), K(e, t);
	};
	J(xu, (e) => {
		U(Ie) && e(Su);
	});
	var Cu = R(xu, 2), wu = (e) => {
		var t = yl(), n = I(t), r = R(I(n), 4), i = R(I(r));
		X(i), O(r);
		var a = R(r, 2);
		Pi(R(I(a)), {
			get value() {
				return U(Ve);
			},
			label: "Aksentfarge",
			onchange: (e) => F(Ve, e, !0)
		}), O(a);
		var o = R(a, 2);
		Pi(R(I(o)), {
			get value() {
				return U(Ue);
			},
			label: "Bakgrunnsfarge",
			onchange: (e) => F(Ue, e, !0)
		}), O(o);
		var s = R(o, 4), c = I(s), l = R(c, 2);
		O(s), O(n), O(t), z((e) => l.disabled = e, [() => !U(Be).trim()]), W("keydown", i, (e) => e.key === "Enter" && Ge()), li(i, () => U(Be), (e) => F(Be, e)), W("click", c, We), W("click", l, Ge), K(e, t);
	};
	J(Cu, (e) => {
		U(ze) && e(wu);
	});
	var Tu = R(Cu, 2), Eu = (e) => {
		var t = bl();
		let n;
		var r = I(t), i = I(r, !0);
		O(r);
		var a = R(r, 2);
		O(t), z(() => {
			n = Zr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: U(y) === "ok",
				error: U(y) === "error"
			}), q(i, U(v));
		}), W("click", a, () => x("")), K(e, t);
	};
	J(Tu, (e) => {
		U(v) && e(Eu);
	}), O($l);
	var Du = R($l, 2), Ou = (e) => {
		var t = xl(), n = I(t), r = I(n), i = I(r, !0);
		O(r);
		var o = R(r, 2);
		Y(o, () => c.cross, !0), O(o), O(n);
		var s = R(n, 2), l = I(s);
		a(l), O(s), O(t), z((e) => {
			$r(t, `left: ${U(it).left ?? ""}px; top: ${U(it).top ?? ""}px`), q(i, e);
		}, [() => Q("blocks.suffix", { label: _t[U(A).type] ?? U(A).type })]), W("click", o, () => F(it, null)), K(e, t);
	};
	J(Du, (e) => {
		U(it) && U(A) && e(Ou);
	}), z(() => ru = Zr(nu, 1, "topbar svelte-1n46o8q", null, ru, { hidden: !U(re) })), K(e, Ql), qe();
}
Sr([
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
	if (e) return gi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = _i(e);
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
var Ol = jr(Cl, { target: document.getElementById("urd-admin") });
//#endregion
export { Ol as default };
