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
var h = 1024, g = 2048, _ = 4096, v = 8192, y = 16384, b = 32768, x = 1 << 25, S = 65536, C = 1 << 19, ee = 1 << 20, te = 1 << 25, ne = 65536, re = 1 << 21, w = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol(""), se = Symbol("attributes"), T = Symbol("class"), ce = Symbol("style"), le = Symbol("text"), ue = Symbol("form reset"), de = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), fe = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function E() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function pe(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function me() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function D() {
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
function A(e) {
	k = e;
}
var j;
function M(e) {
	if (e === null) throw xe(), ve;
	return j = e;
}
function we() {
	return M(/* @__PURE__ */ tn(j));
}
function N(e) {
	if (k) {
		if (/* @__PURE__ */ tn(j) !== null) throw xe(), ve;
		j = e;
	}
}
function Te(e = 1) {
	if (k) {
		for (var t = e, n = j; t--;) n = /* @__PURE__ */ tn(n);
		j = n;
	}
}
function Ee(e = !0) {
	for (var t = 0, n = j;;) {
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
	if (!e || e.nodeType !== 8) throw xe(), ve;
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
function P(e) {
	Pe = e;
}
function Fe(e, t = !1, n) {
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
function Ie(e) {
	var t = Pe, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) dn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, Pe = t.p, e ?? {};
}
function Le() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Re = [];
function ze() {
	var e = Re;
	Re = [], f(e);
}
function Be(e) {
	if (Re.length === 0 && !bt) {
		var t = Re;
		queueMicrotask(() => {
			t === Re && ze();
		});
	}
	Re.push(e);
}
function Ve() {
	for (; Re.length > 0;) ze();
}
function He(e) {
	var t = W;
	if (t === null) return U.f |= ie, e;
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= ne, Ke(t.deps));
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
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ue]?.();
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
	let i = e[ue];
	i ? e[ue] = () => {
		i(), r(!0);
	} : e[ue] = () => r(!0), Ye();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Qe(e) {
	let t = 0, n = zt(0), r;
	return () => {
		ln() && (G(n), hn(() => (t === 0 && (r = nr(() => e(() => Ut(n)))), t += 1, () => {
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
	#t = k ? j : null;
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
		}, this.parent = W.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = gn(() => {
			if (k) {
				let e = this.#t;
				we();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, $e), k && (this.#e = j);
	}
	#g() {
		try {
			this.#a = _n(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = _n(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = _n(() => e(this.#e)), Be(() => {
			var e = this.#c = document.createDocumentFragment(), t = $t();
			e.append(t), this.#a = this.#x(() => _n(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, wn(this.#o, () => {
				this.#o = null;
			}), this.#b(I));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = _n(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				On(this.#a, e);
				let t = this.#n.pending;
				this.#o = _n(() => t(this.#e));
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
		Fn(this.#i), Pn(this.#i), P(this.#i.ctx);
		try {
			return Et.ensure(), e();
		} catch (e) {
			return He(e), null;
		} finally {
			Fn(t), Pn(n), P(r);
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
		return this.#h(), G(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		I?.is_fork ? (this.#a && I.skip_effect(this.#a), this.#o && I.skip_effect(this.#o), this.#s && I.skip_effect(this.#s), I.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (xn(this.#a), null), this.#o &&= (xn(this.#o), null), this.#s &&= (xn(this.#s), null), k && (M(this.#t), Te(), M(Ee()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Ce();
				return;
			}
			r = !0, i && _e(), this.#s !== null && wn(this.#s, () => {
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
					return _n(() => {
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
	let i = Le() ? ot : ut;
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
		Fn(e), Pn(t), P(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function it(e = !0) {
	Fn(null), Pn(null), P(null), e && I?.deactivate();
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
		v: O,
		wv: 0,
		parent: W,
		ac: null
	};
}
var st = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function ct(e, t, n) {
	let r = W;
	r === null && E();
	var i = void 0, a = zt(O), o = !U, s = /* @__PURE__ */ new Set();
	return mn(() => {
		var t = W, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
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
			l?.(), s.delete(n), t !== st && (c.activate(), t ? (a.f |= ie, Vt(a, t)) : (a.f & 8388608 && (a.f ^= ie), Vt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), un(() => {
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
		for (var n = 0; n < t.length; n += 1) xn(t[n]);
	}
}
function ft(e) {
	var t, n = W, r = e.parent;
	if (!jn && r !== null && e.v !== O && r.f & 24576) return be(), e.v;
	Fn(r);
	try {
		e.f &= ~ne, dt(e), t = Yn(e);
	} finally {
		Fn(n);
	}
	return t;
}
function pt(e) {
	var t = ft(e);
	if (!e.equals(t) && (e.wv = Kn(), (!I?.is_fork || e.deps === null) && (I === null ? e.v = t : (I.capture(e, t, !0), _t?.capture(e, t, !0)), e.deps === null))) {
		F(e, h);
		return;
	}
	jn || (vt === null ? Ge(e) : (ln() || I?.is_fork) && vt.set(e, t));
}
function mt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Xe(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), Zn(t, 0), yn(t));
}
function ht(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Qn(t);
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
				a ? r.f ^= h : i & 4 ? t.push(r) : qn(r) && (i & 16 && this.#d.add(r), Qn(r));
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
		e.v !== O && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), vt?.set(e, t)), this.is_fork || (e.v = t);
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
		me();
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
			if (!(r.f & 24576) && qn(r) && (kt = /* @__PURE__ */ new Set(), Qn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Cn(r), kt?.size > 0)) {
				Lt.clear();
				for (let e of kt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) kt.has(n) && (kt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Qn(n);
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
	return U !== null && (!Nn || U.f & 131072) && Le() && U.f & 4325394 && (In === null || !In.has(e)) && ge(), Vt(e, n ? Gt(t) : t, Ct);
}
function Vt(e, t, n = null) {
	if (!e.equals(t)) {
		Lt.set(e, jn ? t : e.v);
		var r = Et.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && ft(t), vt === null && Ge(t);
		}
		e.wv = Kn(), Wt(e, g, n), Le() && W !== null && W.f & 1024 && !(W.f & 96) && (Bn === null ? Vn([e]) : Bn.push(e)), !r.is_fork && It.size > 0 && !Rt && Ht();
	}
	return t;
}
function Ht() {
	Rt = !1;
	for (let e of It) {
		e.f & 1024 && F(e, _);
		let t;
		try {
			t = qn(e);
		} catch {
			t = !0;
		}
		t && Qn(e);
	}
	It.clear();
}
function Ut(e) {
	R(e, e.v + 1);
}
function Wt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Le(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === W)) {
			var l = (c & g) === 0;
			if (l && F(s, t), c & 131072) It.add(s);
			else if (c & 2) {
				var u = s;
				vt?.delete(u), c & 65536 || (c & 512 && (W === null || !(W.f & 2097152)) && (s.f |= ne), Wt(u, _, n));
			} else if (l) {
				var d = s;
				c & 16 && kt !== null && kt.add(d), n === null ? Nt(d) : n.push(d);
			}
		}
	}
}
function Gt(t) {
	if (typeof t != "object" || !t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ L(0), u = null, d = Wn, f = (e) => {
		if (Wn === d) return e();
		var t = U, n = Wn;
		Pn(null), Gn(d);
		var r = e();
		return Pn(t), Gn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ L(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && D();
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
					r.set(t, e), Ut(o);
				}
			} else R(n, O), Ut(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ L(Gt(s ? e[n] : O), u)), r.set(n, o)), o !== void 0) {
				var c = G(o);
				return c === O ? void 0 : c;
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
			if (t === ae) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== O || Reflect.has(e, t);
			return (n !== void 0 || W !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ L(i ? Gt(e[t]) : O, u)), r.set(t, n)), G(n) === O) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ L(O, u)), r.set(d + "", p)) : R(p, O);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ L(void 0, u)), R(c, Gt(n)), r.set(t, c));
			else {
				l = c.v !== O;
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
			G(o);
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
function Kt(e) {
	try {
		if (typeof e == "object" && e && ae in e) return e[ae];
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
		Xt = a(t, "firstChild").get, Zt = a(t, "nextSibling").get, u(e) && (e[T] = void 0, e[se] = null, e[ce] = void 0, e.__e = void 0), u(n) && (n[le] = void 0);
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
	if (!k) return /* @__PURE__ */ en(e);
	var n = /* @__PURE__ */ en(j);
	if (n === null) n = j.appendChild($t());
	else if (t && n.nodeType !== 3) {
		var r = $t();
		return n?.before(r), M(r), r;
	}
	return t && on(n), M(n), n;
}
function B(e, t = !1) {
	if (!k) {
		var n = /* @__PURE__ */ en(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ tn(n) : n;
	}
	if (t) {
		if (j?.nodeType !== 3) {
			var r = $t();
			return j?.before(r), M(r), r;
		}
		on(j);
	}
	return j;
}
function V(e, t = 1, n = !1) {
	let r = k ? j : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ tn(r);
	if (!k) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = $t();
			return r === null ? i?.after(a) : r.before(a), M(a), a;
		}
		on(r);
	}
	return M(r), r;
}
function nn(e) {
	e.textContent = "";
}
function rn() {
	return !1;
}
function an(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function on(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function sn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function cn(e, t) {
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
			Qn(r);
		} catch (e) {
			throw xn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= S));
	}
	if (i !== null && (i.parent = n, n !== null && sn(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function ln() {
	return U !== null && !Nn;
}
function un(e) {
	let t = cn(8, null);
	return F(t, h), t.teardown = e, t;
}
function dn(e) {
	return cn(4 | ee, e);
}
function fn(e) {
	Et.ensure();
	let t = cn(64 | C, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? wn(t, () => {
			xn(t), n(void 0);
		}) : (xn(t), n(void 0));
	});
}
function pn(e) {
	return cn(4, e);
}
function mn(e) {
	return cn(w | C, e);
}
function hn(e, t = 0) {
	return cn(8 | t, e);
}
function H(e, t = [], n = [], r = []) {
	nt(r, t, n, (t) => {
		cn(8, () => {
			e(...t.map(G));
		});
	});
}
function gn(e, t = 0) {
	return cn(16 | t, e);
}
function _n(e) {
	return cn(32 | C, e);
}
function vn(e) {
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
function yn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Xe(() => {
			e.abort(de);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : xn(n, t), n = r;
	}
}
function bn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || xn(t), t = n;
	}
}
function xn(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Sn(e.nodes.start, e.nodes.end), n = !0), e.f |= x, yn(e, t && !n), Zn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	vn(e), e.f ^= x, e.f |= y;
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
		n && xn(e), t && t();
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
var Rn = null, zn = 0, Bn = null;
function Vn(e) {
	Bn = e;
}
var Hn = 1, Un = 0, Wn = Un;
function Gn(e) {
	Wn = e;
}
function Kn() {
	return ++Hn;
}
function qn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~ne), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (qn(a) && pt(a), a.wv > e.wv) return !0;
		}
		t & 512 && vt === null && F(e, h);
	}
	return !1;
}
function Jn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(In !== null && In.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Jn(a, t, !1) : t === a && (n ? F(a, g) : a.f & 1024 && F(a, _), Nt(a));
	}
}
function Yn(e) {
	var t = Rn, n = zn, r = Bn, i = U, a = In, o = Pe, s = Nn, c = Wn, l = e.f;
	Rn = null, zn = 0, Bn = null, U = l & 96 ? null : e, In = null, P(e.ctx), Nn = !1, Wn = ++Un, e.ac !== null && (Xe(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= re;
		var u = e.fn, d = u();
		e.f |= b;
		var f = e.deps, p = I?.is_fork;
		if (Rn !== null) {
			var m;
			if (p || Zn(e, zn), f !== null && zn > 0) for (f.length = zn + Rn.length, m = 0; m < Rn.length; m++) f[zn + m] = Rn[m];
			else e.deps = f = Rn;
			if (ln() && e.f & 512) for (m = zn; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && zn < f.length && (Zn(e, zn), f.length = zn);
		if (Le() && Bn !== null && !Nn && f !== null && !(e.f & 6146)) for (m = 0; m < Bn.length; m++) Jn(Bn[m], e);
		if (i !== null && i !== e) {
			if (Un++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = Un;
			if (t !== null) for (let e of t) e.rv = Un;
			Bn !== null && (r === null ? r = Bn : r.push(...Bn));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (e) {
		return He(e);
	} finally {
		e.f ^= re, Rn = t, zn = n, Bn = r, U = i, In = a, P(o), Nn = s, Wn = c;
	}
}
function Xn(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Rn === null || !n.call(Rn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~ne), s.v !== O && Ge(s), s.ac !== null && Xe(() => {
			s.ac.abort(de), s.ac = null;
		}), mt(s), Zn(s, 0);
	}
}
function Zn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Xn(e, n[r]);
}
function Qn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		F(e, h);
		var n = W, r = An;
		W = e, An = (t & 96) == 0;
		try {
			t & 16777232 ? bn(e) : yn(e), vn(e);
			var i = Yn(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = Hn;
		} finally {
			An = r, W = n;
		}
	}
}
async function $n() {
	await Promise.resolve(), Dt();
}
function G(e) {
	var t = (e.f & 2) != 0;
	if (kn?.add(e), U !== null && !Nn && !(W !== null && W.f & 16384) && (In === null || !In.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < Un && (e.rv = Un, Rn === null && r !== null && r[zn] === e ? zn++ : Rn === null ? Rn = [e] : Rn.push(e));
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
			return (!(a.f & 1024) && a.reactions !== null || tr(a)) && (o = ft(a)), Lt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Nn && U !== null && (An || (U.f & 512) != 0), c = (a.f & b) === 0;
		qn(a) && (s && (a.f |= 512), pt(a)), s && !c && (ht(a), er(a));
	}
	if (vt?.has(e)) return vt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function er(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (ht(t), er(t));
}
function tr(e) {
	if (e.v === O) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Lt.has(t) || t.f & 2 && tr(t)) return !0;
	return !1;
}
function nr(e) {
	var t = Nn;
	try {
		return Nn = !0, e();
	} finally {
		Nn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var rr = ["touchstart", "touchmove"];
function ir(e) {
	return rr.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var ar = Symbol("events"), or = /* @__PURE__ */ new Set(), sr = /* @__PURE__ */ new Set();
function cr(e) {
	if (!k) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function lr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || pr.call(t, e), !e.cancelBubble) return Xe(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Be(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function ur(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = lr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && un(() => {
		t.removeEventListener(e, o, a);
	});
}
function K(e, t, n) {
	(t[ar] ??= {})[e] = n;
}
function dr(e) {
	for (var t = 0; t < e.length; t++) or.add(e[t]);
	for (var n of sr) n(e);
}
var fr = null;
function pr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	fr = e;
	var s = 0, c = fr === e && e[ar];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[ar] = t;
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
					var h = o[ar]?.[r];
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
			e[ar] = t, delete e.currentTarget, Pn(d), Fn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var mr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function hr(e) {
	return mr?.createHTML(e) ?? e;
}
function gr(e) {
	var t = an("template");
	return t.innerHTML = hr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function _r(e, t) {
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
		if (k) return _r(j, null), j;
		i === void 0 && (i = gr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ en(i)));
		var t = r || Yt ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ en(t), s = t.lastChild;
			_r(o, s);
		} else _r(t, t);
		return t;
	};
}
function J(e, t) {
	if (k) {
		var n = W;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = j), we();
		return;
	}
	e !== null && e.before(t);
}
function Y(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[le] ??= e.nodeValue) && (e[le] = n, e.nodeValue = `${n}`);
}
function vr(e, t) {
	return br(e, t);
}
var yr = /* @__PURE__ */ new Map();
function br(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Qt();
	var l = void 0, u = fn(() => {
		var s = n ?? t.appendChild($t());
		et(s, { pending: () => {} }, (t) => {
			Fe({});
			var n = Pe;
			if (o && (n.c = o), a && (i.$$events = a), k && _r(t, null), l = e(t, i) || {}, k && (W.nodes.end = j, j === null || j.nodeType !== 8 || j.data !== "]")) throw xe(), ve;
			Ie();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = ir(r);
					for (let e of [t, document]) {
						var a = yr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), yr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, pr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(or)), sr.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = yr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, pr), r.delete(e), r.size === 0 && yr.delete(n)) : r.set(e, i);
			}
			sr.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return xr.set(l, u), l;
}
var xr = /* @__PURE__ */ new WeakMap(), Sr = class {
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
				r && (xn(r.effect), this.#n.delete(n));
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
					} else xn(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), wn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (xn(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = I, r = rn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = $t();
			i.append(a), this.#n.set(e, {
				effect: _n(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, _n(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else k && (this.anchor = j), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function X(e, t, n = !1) {
	var r;
	k && (r = j, we());
	var i = new Sr(e), a = n ? S : 0;
	function o(e, t) {
		if (k) {
			var n = De(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ee();
				M(a), i.anchor = a, A(!1), i.ensure(e, t), A(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	gn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function Cr(e, t) {
	return t;
}
function wr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		wn(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Tr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			nn(d), d.append(u), e.items.clear();
		}
		Tr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Tr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, On(a, document.createDocumentFragment())) : xn(t[i], n);
	}
}
var Er;
function Dr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = k ? M(/* @__PURE__ */ en(u)) : u.appendChild($t());
	}
	k && we();
	var d = null, f = /* @__PURE__ */ ut(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, kr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, jr(d, null, c)) : En(d) : wn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: gn(() => {
			p = G(f);
			var e = p.length;
			let t = !1;
			k && De(c) === "[!" != (e === 0) && (c = Ee(), M(c), A(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = I, v = rn(), y = 0; y < e; y += 1) {
				k && j.nodeType === 8 && j.data === "]" && (c = j, t = !0, A(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Vt(S.v, b), S.i && Vt(S.i, y), v && u.unskip_effect(S.e)) : (S = Ar(l, h ? c : Er ??= $t(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = _n(() => s(c)) : (d = _n(() => s(Er ??= $t())), d.f |= te)), e > r.size && pe("", "", ""), k && e > 0 && M(Ee()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && A(!0), G(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, k && (c = j);
}
function Or(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function kr(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = Or(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (En(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= te, _ === l) jr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Mr(e, d, _), Mr(e, _, y), jr(_, y, n), d = _, p = [], m = [], l = Or(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) jr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Mr(e, S.prev, C.next), Mr(e, d, S), Mr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), jr(_, l, n), Mr(e, _.prev, _.next), Mr(e, _, d === null ? e.effect.first : d.next), Mr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Or(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Or(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Tr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var ee = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || ee.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && ee.push(l), l = Or(l.next);
		var ne = ee.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) ee[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) ee[v].nodes?.a?.fix();
			}
			wr(e, ee, re);
		}
	}
	o && Be(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function Ar(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? zt(n) : /* @__PURE__ */ Bt(n, !1, !1) : null, l = o & 2 ? zt(i) : null;
	return {
		v: c,
		i: l,
		e: _n(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function jr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ tn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Mr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var Nr = [..." 	\n\r\f\xA0\v﻿"];
function Pr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || Nr.includes(r[o - 1])) && (s === r.length || Nr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Fr(e, t, n, r, i, a) {
	var o = e[T];
	if (k || o !== n || o === void 0) {
		var s = Pr(n, r, a);
		(!k || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[T] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function Z(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return Se();
		for (var i of t.options) i.selected = n.includes(Rr(i));
		return;
	}
	for (i of t.options) if (qt(Rr(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Ir(e) {
	var t = new MutationObserver(() => {
		Z(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), un(() => {
		t.disconnect();
	});
}
function Lr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet(), i = !0;
	Ze(e, "change", (t) => {
		var i = t ? "[selected]" : ":checked", a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(i), Rr);
		else {
			var o = e.querySelector(i) ?? e.querySelector("option:not([disabled])");
			a = o && Rr(o);
		}
		n(a), e.__value = a, I !== null && r.add(I);
	}), pn(() => {
		var a = t();
		if (e === document.activeElement) {
			var o = I;
			if (r.has(o)) return;
		}
		if (Z(e, a, i), i && a === void 0) {
			var s = e.querySelector(":checked");
			s !== null && (a = Rr(s), n(a));
		}
		e.__value = a, i = !1;
	}), Ir(e);
}
function Rr(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var zr = Symbol("is custom element"), Br = Symbol("is html"), Vr = fe ? "link" : "LINK", Hr = fe ? "progress" : "PROGRESS";
function Q(e) {
	if (k) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Wr(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Wr(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ue] = n, Be(n), Ye();
	}
}
function $(e, t) {
	var n = Gr(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Hr) || (e.value = t ?? "");
}
function Ur(e, t) {
	var n = Gr(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Wr(e, t, n, r) {
	var i = Gr(e);
	k && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === Vr) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && qr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Gr(e) {
	return e[se] ??= {
		[zr]: e.nodeName.includes("-"),
		[Br]: e.namespaceURI === ye
	};
}
var Kr = /* @__PURE__ */ new Map();
function qr(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Kr.get(t);
	if (n) return n;
	Kr.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Jr(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	Ze(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Yr(e) ? Xr(a) : a, n(a), I !== null && r.add(I), await $n(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (k && e.defaultValue !== e.value || nr(t) == null && e.value) && (n(Yr(e) ? Xr(e.value) : e.value), I !== null && r.add(I)), hn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = I;
			if (r.has(i)) return;
		}
		Yr(e) && n === Xr(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Yr(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function Xr(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Zr(e, t) {
	return e === t || e?.[ae] === t;
}
function Qr(e = {}, t, n, r) {
	var i = Pe.r, a = W;
	return pn(() => {
		var o, s;
		return hn(() => {
			o = s, s = r?.() || [], nr(() => {
				Zr(n(...s), e) || (t(e, ...s), o && Zr(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Zr(n(...s), e) && t(null, ...s);
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
function $r(e, t) {
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
function ei(e, t = {}) {
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
var ti = (e) => Math.round(e * 100) / 100;
function ni(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var ri = {
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
					x: ti(r.x * 100 / e.columns),
					w: ti(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= ni(t.grid);
		return e;
	}
}, ii = { 1: (e) => (e.grid = ni(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function ai(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = ii[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function oi(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = ri[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/theme.js
function si(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
//#endregion
//#region ../template/assets/engine/backgrounds/color.js
var ci = {
	version: 1,
	label: "Farge",
	defaults: () => ({ value: "bg" }),
	migrations: {},
	render(e, t) {
		e.style.background = si(t.value);
	}
}, li = {
	version: 1,
	label: "Gradient",
	defaults: () => ({
		stops: ["#0b0e14", "#1a1030"],
		angle: 160,
		animate: !1
	}),
	migrations: {},
	render(e, t) {
		let n = t.stops.map(si).join(", ");
		e.style.background = `linear-gradient(${t.angle}deg, ${n})`, t.animate && (e.style.backgroundSize = "200% 200%", e.classList.add("urd-bg-animate"));
	}
}, ui = {
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
		let n = si(t.color);
		e.style.background = `radial-gradient(circle at ${t.x * 100}% ${t.y * 100}%, ${n} 0%, transparent ${t.radius * 100}%)`, e.style.opacity = String(t.opacity);
	}
}, di = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", fi = {
	version: 1,
	label: "Korn",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = di, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity);
	}
}, pi = {
	version: 1,
	label: "Bilde",
	defaults: () => ({
		src: "",
		fit: "cover",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		t.src && (e.style.backgroundImage = `url("${t.src}")`, e.style.backgroundSize = t.fit === "contain" ? "contain" : "cover", e.style.backgroundPosition = "center", e.style.backgroundRepeat = "no-repeat", e.style.opacity = String(t.opacity ?? 1));
	}
}, mi = () => ({
	duration: 600,
	delay: 0
}), hi = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		entrance: !0,
		defaults: mi,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		entrance: !0,
		defaults: mi,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		entrance: !0,
		defaults: mi,
		migrations: {}
	},
	"hover-lift": {
		version: 1,
		label: "Løft ved peker",
		entrance: !1,
		defaults: () => ({}),
		migrations: {}
	}
}, gi = 1600, _i = .82, vi = .6;
async function yi(e) {
	let t = await createImageBitmap(e), n = Math.min(1, gi / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(_i);
	return s.size > 4e5 && (s = await o(vi)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function bi(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function xi(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var Si = /* @__PURE__ */ q("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), Ci = /* @__PURE__ */ q("<option class=\"svelte-1n46o8q\"> </option>"), wi = /* @__PURE__ */ q("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\">💻</button> <button title=\"Mobilvisning (390px)\">📱</button></span>", 1), Ti = /* @__PURE__ */ q("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"> </button>"), Ei = /* @__PURE__ */ q("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), Di = /* @__PURE__ */ q("<span class=\"who svelte-1n46o8q\"> </span>"), Oi = /* @__PURE__ */ q("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), ki = /* @__PURE__ */ q("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), Ai = /* @__PURE__ */ q("<button> </button>"), ji = /* @__PURE__ */ q("<span class=\"page-path svelte-1n46o8q\" title=\"Forsiden kan ikke flyttes eller slettes\">/</span>"), Mi = /* @__PURE__ */ q("<input class=\"page-slug svelte-1n46o8q\" title=\"Adressen (dinside.no/…)\"/>"), Ni = /* @__PURE__ */ q("<button class=\"ghost row-tool svelte-1n46o8q\" title=\"Slett siden (Ctrl+Z angrer)\">×</button>"), Pi = /* @__PURE__ */ q("<div><input class=\"page-title svelte-1n46o8q\" title=\"Sidens navn\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\" title=\"Åpne siden i editoren\">→</button> <!></span></div>"), Fi = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Endringer her er utkast til du publiserer. Ctrl+Z angrer.</p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input placeholder=\"Navn på ny side\" class=\"svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\">+ Opprett side</button> <p class=\"panel-hint svelte-1n46o8q\">Nye sider legges automatisk i menyen og starter tomme.</p></div>"), Ii = /* @__PURE__ */ q("<input placeholder=\"https://…\" class=\"svelte-1n46o8q\"/>"), Li = /* @__PURE__ */ q("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><input title=\"Teksten i menyen\" class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern fra menyen (siden består)\">×</button></span></span> <select title=\"Hvor lenken går\" class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select> <!></div>"), Ri = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Menyen øverst på siden. Endringer vises live i forhåndsvisningen.</p> <label class=\"svelte-1n46o8q\">Logo <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Tekst</option><option class=\"svelte-1n46o8q\">Bilde (URL)</option></select></label> <input class=\"svelte-1n46o8q\"/> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <button class=\"ghost svelte-1n46o8q\">+ Nytt menypunkt</button></div>"), zi = /* @__PURE__ */ q("<option class=\"svelte-1n46o8q\">Egendefinert</option>"), Bi = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Fargene og fontene hele siden bygger på. Endringer vises live.</p> <label class=\"svelte-1n46o8q\">Bakgrunn <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Flater <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tekst <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Aksent <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Overskrifter <select class=\"svelte-1n46o8q\"><!><!></select></label> <label class=\"svelte-1n46o8q\">Brødtekst <select class=\"svelte-1n46o8q\"><!><!></select></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Avrunding, liten <input class=\"token-input svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Avrunding, stor <input class=\"token-input svelte-1n46o8q\"/></label></div>"), Vi = /* @__PURE__ */ q("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Tekst</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Tekst i et kort med bakgrunn og avrundede hjørner\">Tekstboks</button></div></details> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\">Former</summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div></details></div>"), Hi = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Snap til grid</label> <p class=\"panel-hint svelte-1n46o8q\">En seksjon kan få sitt eget grid: klikk i seksjonen og åpne Egenskaper.</p></div>"), Ui = /* @__PURE__ */ q("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">X %<input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Y px<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Bredde %<input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Høyde px<input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Lag (z)<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Rotasjon °<input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), Wi = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Justering <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Venstre</option><option class=\"svelte-1n46o8q\">Midtstilt</option><option class=\"svelte-1n46o8q\">Høyre</option></select></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Tekstboks (kort med bakgrunn)</label> <p class=\"panel-hint svelte-1n46o8q\">Marker tekst i blokken for fet, kursiv, overskrifter og farge.</p>", 1), Gi = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Tekst <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Går til <select class=\"svelte-1n46o8q\"><!><option class=\"svelte-1n46o8q\">Ekstern lenke</option></select></label> <!> <label class=\"svelte-1n46o8q\">Stil <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fylt (aksentfarge)</option><option class=\"svelte-1n46o8q\">Kantlinje</option></select></label>", 1), Ki = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\">Bytt bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Alt-tekst <input placeholder=\"Beskriv bildet\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll rammen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Avrunding <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><option class=\"svelte-1n46o8q\">Liten</option><option class=\"svelte-1n46o8q\">Stor</option></select></label> <label class=\"svelte-1n46o8q\">Lenke <input placeholder=\"Valgfri (gjør bildet klikkbart)\" class=\"svelte-1n46o8q\"/></label>", 1), qi = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Form <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Farge <select class=\"svelte-1n46o8q\"></select></label> <label class=\"svelte-1n46o8q\">Tykkelse <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Fylte former bruker fargen som flate i stedet for kantlinje\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Fylt</label>", 1), Ji = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles når besøkende scroller til innholdet. Forhåndsvisningen viser slutt-tilstanden.</p>", 1), Yi = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <label class=\"gridmenu-snap svelte-1n46o8q\" title=\"Gjelder kun automatisk mobil-layout\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> 📵 Skjul i automatisk mobil-layout (pynt)</label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), Xi = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Zi = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label>"), Qi = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Fra <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Til <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Vinkel ° <input type=\"number\" step=\"5\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Animert (langsom panorering)</label>", 1), $i = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Farge <input type=\"color\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Posisjon X <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Posisjon Y <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Størrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), ea = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), ta = /* @__PURE__ */ q("<label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Tilpasning <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Fyll seksjonen (beskjæres)</option><option class=\"svelte-1n46o8q\">Vis hele bildet</option></select></label> <label class=\"svelte-1n46o8q\">Styrke <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.05\" class=\"svelte-1n46o8q\"/>", 1), na = /* @__PURE__ */ q("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"bg-name svelte-1n46o8q\"> </span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\">↑</button> <button class=\"ghost row-tool svelte-1n46o8q\">↓</button> <button class=\"ghost row-tool svelte-1n46o8q\" title=\"Fjern laget\">×</button></span></span> <!></div>"), ra = /* @__PURE__ */ q("<label class=\"svelte-1n46o8q\">Varighet ms <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\">Forsinkelse ms <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <p class=\"panel-hint svelte-1n46o8q\">Spilles når besøkende scroller til seksjonen. Forhåndsvisningen viser slutt-tilstanden.</p>", 1), ia = /* @__PURE__ */ q("<p class=\"panel-strong svelte-1n46o8q\">Seksjon</p> <label class=\"svelte-1n46o8q\">Minstehøyde <input class=\"token-input svelte-1n46o8q\" placeholder=\"f.eks. 400px\"/></label> <p class=\"panel-hint svelte-1n46o8q\">px-verdi eller CSS (40vh). Blokker kan uansett henge utover kanten.</p> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> Eget grid i seksjonen</label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\">Bakgrunn</p> <p class=\"panel-hint svelte-1n46o8q\">Lagene tegnes nedenfra og opp; øverste lag i listen ligger bakerst.</p> <!> <label class=\"svelte-1n46o8q\">Nytt lag <select class=\"svelte-1n46o8q\"></select></label> <button class=\"ghost svelte-1n46o8q\">+ Legg til lag</button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\">Animasjon <select class=\"svelte-1n46o8q\"><option class=\"svelte-1n46o8q\">Ingen</option><!></select></label> <!>", 1), aa = /* @__PURE__ */ q("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), oa = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), sa = /* @__PURE__ */ q("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p></div>"), ca = /* @__PURE__ */ q("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), la = /* @__PURE__ */ q("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), ua = /* @__PURE__ */ q("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), da = /* @__PURE__ */ q("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), fa = /* @__PURE__ */ q("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), pa = /* @__PURE__ */ q("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!></div>");
function ma(e, t) {
	Fe(t, !0);
	let n = [
		["color", ci],
		["gradient", li],
		["glow", ui],
		["image", pi],
		["grain", fi]
	], r = Object.fromEntries(n), i = /* @__PURE__ */ L(null), a = /* @__PURE__ */ L(null), o = /* @__PURE__ */ L(!1), s = /* @__PURE__ */ L(""), c = /* @__PURE__ */ L("info"), l = 0;
	function u(e, t = "info") {
		R(s, e, !0), R(c, t, !0);
		let n = ++l;
		t === "ok" && setTimeout(() => {
			l === n && (R(s, ""), R(c, "info"));
		}, 8e3);
	}
	let d = /* @__PURE__ */ L(null), f = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(Gt({
		size: 16,
		snap: !0
	})), h = /* @__PURE__ */ L(!0), g = /* @__PURE__ */ L("desktop"), _ = /* @__PURE__ */ L(0);
	function v() {
		R(_, b?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function y(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, v(), S?.sendAttention(e.id, !0));
	}
	let b = null, x = null, S = null, C = /* @__PURE__ */ L(null);
	function ee() {
		R(C, x.data, !0), x.replace(G(C));
	}
	function te() {
		S?.sendSite(Me(G(C)));
	}
	let ne = /* @__PURE__ */ new Set(), re = () => G(C).pages.find((e) => e.id === G(a));
	function w() {
		let e = G(C)?.pages?.some((e) => !ne.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		R(o, e || b?.hasDraft() && !ne.has(G(a)) || x?.hasDraft() || !1, !0);
	}
	let ie = [], ae = [], oe = null;
	function se() {
		return JSON.stringify({
			page: b.data,
			site: x.data
		});
	}
	function T(e) {
		e === oe && (e.startsWith("edit:") || e === "grid") || (ie.push(se()), ie.length > 50 && ie.shift(), ae.length = 0, oe = e);
	}
	function ce(e) {
		let { page: t, site: n } = JSON.parse(e);
		b.replace(t), x.replace(n), ee(), b.save(), x.save(), R(p, {
			snap: !0,
			...G(C).grid
		}, !0), w(), v(), te(), G(C).pages.some((e) => e.id === G(a)) ? S?.sendPage(G(a), b.data) : Qe(G(C).pages[0].id);
	}
	function le() {
		ie.length && (ae.push(se()), ce(ie.pop()), oe = null, u("Angret"));
	}
	function ue() {
		ae.length && (ie.push(se()), ce(ae.pop()), oe = null, u("Gjentatt"));
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
		R(i, ai(await (await fetch("/content/site.json")).json()), !0), x = $r("urd-draft-site", () => G(i)), x.replace(ai(x.data)), x.save(), ee(), R(p, {
			snap: !0,
			...G(C).grid
		}, !0), await Qe(new URLSearchParams(location.search).get("page") ?? G(C).pages[0].id), await Ye();
	}
	let E = /* @__PURE__ */ L(null), pe = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Grid",
		"Historikk"
	];
	function me(e) {
		R(E, G(E) === e ? null : e, !0), S?.sendShowGrid(G(E) === "Grid");
	}
	let D = /* @__PURE__ */ L(null);
	function he(e, t) {
		let n = b?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function ge() {
		if (!G(D)) return;
		let { block: e } = he(G(D).sectionId, G(D).blockId);
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
	function _e(e) {
		if (!e.blockId) {
			R(D, null);
			return;
		}
		R(D, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), ge();
	}
	function ve(e, t) {
		let { section: n, block: r } = he(G(D)?.sectionId, G(D)?.blockId);
		r && (T(e), t(r, n), y(n, "blokk-endret"), b.save(), w(), S?.sendSection(G(a), n), ge());
	}
	function O(e, t) {
		ve(`edit:${G(D).blockId}`, (n) => {
			n.props[e] = t;
		});
	}
	function ye(e, t) {
		Number.isFinite(t) && ve(`edit:frame-${G(D).blockId}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function be(e) {
		ve("decor", (t) => {
			t.decor = e;
		});
	}
	async function xe(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await yi(t);
			ve(`edit:${G(D).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || bi(t.name).replaceAll("-", " ");
			});
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	let Se = {
		text: "Tekst",
		button: "Knapp",
		image: "Bilde",
		shape: "Form"
	}, Ce = [
		["line", "Strek"],
		["arrow", "Pil"],
		["circle", "Sirkel"],
		["rect", "Rektangel"],
		["triangle", "Trekant"]
	], k = [
		["accent", "Aksent"],
		["text", "Tekst"],
		["surface", "Flate"],
		["bg", "Bakgrunn"]
	], A = /* @__PURE__ */ L(null), j = /* @__PURE__ */ L(null), M = /* @__PURE__ */ L(""), we = /* @__PURE__ */ L(Gt([])), Ee = /* @__PURE__ */ L(null);
	function De(e) {
		R(j, e?.grid ? { ...e.grid } : null, !0), R(M, e?.size?.minHeight ?? "", !0), R(we, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), R(Ee, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0);
	}
	function Oe(e) {
		R(A, e.sectionId, !0), De(b?.data.sections.find((t) => t.id === e.sectionId));
	}
	function ke(e, t) {
		let n = b.data.sections.find((e) => e.id === G(A));
		n && (T(e), t(n), b.save(), w(), S?.sendSection(G(a), n), De(n));
	}
	let Ae = /* @__PURE__ */ L("color");
	function je(e) {
		ke("bg", (t) => {
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
	function Ne(e) {
		ke("bg", (t) => {
			t.background.layers.splice(e, 1);
		});
	}
	function Pe(e, t) {
		let n = e + t;
		ke("bg", (t) => {
			let r = t.background.layers;
			n < 0 || n >= r.length || ([r[e], r[n]] = [r[n], r[e]]);
		});
	}
	function P(e, t, n) {
		ke(`edit:bg-${G(A)}-${e}-${t}`, (r) => {
			r.background.layers[e].props[t] = n;
		});
	}
	function Le(e, t, n) {
		ke(`edit:bg-${G(A)}-${e}-stop${t}`, (r) => {
			r.background.layers[e].props.stops[t] = n;
		});
	}
	async function Re(e, t) {
		let n = t.target.files?.[0];
		if (t.target.value = "", n) try {
			P(e, "src", (await yi(n)).dataUrl);
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
		}
	}
	function ze(e) {
		return typeof e == "string" ? e.startsWith("#") ? e : G(C)?.theme.tokens.color[e] ?? "#000000" : "#000000";
	}
	function Be(e) {
		return {
			type: e,
			version: hi[e].version,
			props: hi[e].defaults()
		};
	}
	function Ve(e) {
		ve(`edit:anim-${G(D).blockId}`, (t) => {
			t.animation = e ? Be(e) : null;
		});
	}
	function He(e, t) {
		Number.isFinite(t) && ve(`edit:anim-${G(D).blockId}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		});
	}
	function Ue(e) {
		ke("section-anim", (t) => {
			t.animation = e ? Be(e) : null;
		});
	}
	function We(e, t) {
		Number.isFinite(t) && ke("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		});
	}
	function F(e) {
		let t = b.data.sections.find((e) => e.id === G(A));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		T("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, R(M, r, !0), b.save(), w(), S?.sendSection(G(a), t);
	}
	function Ge() {
		return b.data.sections.find((e) => e.id === G(A)) ?? b.data.sections[0];
	}
	function Ke(e) {
		let t = b.data.sections.find((e) => e.id === G(A));
		t && (T("grid"), t.grid = e ? { ...x.data.grid } : null, R(j, t.grid ? { ...t.grid } : null, !0), b.save(), w(), S?.sendSection(G(a), t), G(E) === "Grid" && S?.sendShowGrid(!0));
	}
	function qe(e, t) {
		let n = b.data.sections.find((e) => e.id === G(A));
		n?.grid && (T("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, R(j, { ...n.grid }, !0), b.save(), w(), S?.sendSection(G(a), n), G(E) === "Grid" && S?.sendShowGrid(!0));
	}
	function Je(e, t) {
		T("grid"), R(p, {
			...G(p),
			[e]: t
		}, !0), x.data.grid = {
			...x.data.grid,
			[e]: t
		}, x.save(), w(), te(), G(E) === "Grid" && S?.sendShowGrid(!0);
	}
	async function Ye() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? R(f, await e.json(), !0) : e.status !== 503 && R(f, null);
		} catch {
			R(f, null);
		}
	}
	let Xe = null;
	function Ze(e) {
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
	async function Qe(e) {
		R(a, e, !0), Xe = (async () => {
			let t = re(), n = null;
			try {
				let e = await fetch(`/${t.file}`);
				e.ok && (n = oi(await e.json(), x.data));
			} catch {}
			n ? ne.delete(e) : n = Ze(t), b = $r(`urd-draft-${e}`, () => n), b.replace(oi(b.data, x.data)), b.save(), ie.length = 0, ae.length = 0, oe = null, R(A, null), R(j, null), w(), v(), R(s, "");
		})(), await Xe;
	}
	function $e() {
		S?.destroy(), S = ei(G(d), {
			onEdit: Ct,
			onMove: wt,
			onDelete: Nt,
			onAddSection: kt,
			onMoveSection: At,
			onDeleteSection: jt,
			onSectionSize: Mt,
			onUndo: (e) => e.redo ? ue() : le(),
			onSelectSection: Oe,
			onSelectBlock: _e,
			onReady: et,
			onNavigate: tt,
			onAddBlock: (e) => Lt(e.sectionId, e.block),
			onMobileManual: Tt,
			onMobileAuto: Et,
			onReviewDone: Dt,
			onBlockFlag: Ot
		});
	}
	async function et() {
		await Xe, x.hasDraft() && te();
		let e = !G(i).pages.some((e) => e.id === G(a));
		(b.hasDraft() || e) && S?.sendPage(G(a), b.data), G(h) || S?.sendChrome(!1), G(E) === "Grid" && S?.sendShowGrid(!0);
	}
	function tt(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = G(C).pages.find((e) => e.path === t);
		n && n.id !== G(a) && Qe(n.id);
	}
	function nt(e, t) {
		T(e), t(), x.save(), w(), te();
	}
	let rt = /* @__PURE__ */ L(""), it = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions"
	];
	function at(e, t = null) {
		return e ? it.includes(e) ? `«${e}» er et reservert navn` : G(C).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? "Det finnes allerede en side med dette navnet" : null : "Siden trenger et navn";
	}
	function ot() {
		let e = G(rt).trim(), t = bi(e), n = at(t);
		if (n) {
			u(n, "error");
			return;
		}
		nt("pages", () => {
			G(C).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), G(C).nav.items.push({
				label: e,
				page: t
			});
		}), localStorage.setItem(`urd-draft-${t}`, JSON.stringify(Ze({
			id: t,
			title: e
		}))), w(), R(rt, ""), Qe(t);
	}
	function st(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		nt("pages", () => {
			e.title = n;
			for (let t of G(C).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === G(a) ? (b.data.meta.title = n, b.save(), w()) : ct(e, (e) => {
			e.meta.title = n;
		});
	}
	async function ct(e, t) {
		let n = `urd-draft-${e.id}`, r = null, i = localStorage.getItem(n);
		if (i) try {
			r = JSON.parse(i);
		} catch {}
		if (!r) try {
			let t = await fetch(`/${e.file}`);
			t.ok && (r = oi(await t.json(), x.data));
		} catch {}
		r ||= Ze(e), t(r), localStorage.setItem(n, JSON.stringify(r)), w();
	}
	function ut(e, t) {
		let n = bi(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = at(n, e.id);
		if (r) {
			u(r, "error");
			return;
		}
		nt("pages", () => {
			e.path = `/${n}`;
		});
	}
	function dt(e) {
		e.path !== "/" && (nt("pages", () => {
			G(C).pages = G(C).pages.filter((t) => t.id !== e.id), G(C).nav.items = G(C).nav.items.filter((t) => t.page !== e.id);
		}), e.id === G(a) && Qe(G(C).pages[0].id), u("Siden fjernes ved neste publisering (Ctrl+Z angrer)"));
	}
	function ft(e) {
		nt("edit:nav-logo", () => {
			G(C).nav.logo = {
				type: "text",
				value: "",
				...G(C).nav.logo,
				...e
			};
		});
	}
	function pt(e, t) {
		nt(`edit:nav-label-${e}`, () => {
			G(C).nav.items[e].label = t;
		});
	}
	function mt(e, t) {
		nt("nav", () => {
			let n = G(C).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : (n.page = t, delete n.href);
		});
	}
	function ht(e, t) {
		nt(`edit:nav-href-${e}`, () => {
			G(C).nav.items[e].href = t;
		});
	}
	function gt(e, t) {
		let n = e + t, r = G(C).nav.items;
		n < 0 || n >= r.length || nt("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function I(e) {
		nt("nav", () => {
			G(C).nav.items.splice(e, 1);
		});
	}
	function _t() {
		nt("nav", () => {
			G(C).nav.items.push({
				label: "Lenke",
				page: G(C).pages[0].id
			});
		});
	}
	let vt = [
		["System", "system-ui, sans-serif"],
		["Arial", "Arial, Helvetica, sans-serif"],
		["Verdana", "Verdana, Geneva, sans-serif"],
		["Trebuchet", "'Trebuchet MS', sans-serif"],
		["Georgia (serif)", "Georgia, 'Times New Roman', serif"],
		["Palatino (serif)", "'Palatino Linotype', Palatino, serif"],
		["Courier (skrivemaskin)", "'Courier New', monospace"]
	];
	function yt(e, t) {
		nt(`edit:theme-color-${e}`, () => {
			G(C).theme.tokens.color[e] = t;
		});
	}
	function bt(e, t) {
		nt("theme", () => {
			G(C).theme.tokens.font[e] = t;
		});
	}
	function xt(e, t) {
		nt("theme", () => {
			G(C).theme.tokens.radius[e] = t;
		});
	}
	function St() {
		R(h, !G(h)), S?.sendChrome(G(h));
	}
	function Ct(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (T(`edit:${e.blockId}`), t.props = e.props, b.save(), w(), G(D)?.blockId === e.blockId && ge(), R(s, ""));
	}
	function wt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		T(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && y(t, "desktop-endret-etter-mobil"), b.save(), w(), G(D)?.blockId === e.blockId && ge();
	}
	function Tt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			T("mobile-manual");
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
			}, b.save(), w();
		}
	}
	function Et(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			T("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, b.save(), w(), v(), S?.sendSection(G(a), t);
		}
	}
	function Dt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (T("review-done"), t.responsive.mobile.attention = null, b.save(), w(), v());
	}
	function Ot(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (T("decor"), t.decor = e.decor, b.save(), w(), G(D)?.blockId === e.blockId && ge());
	}
	function kt(e) {
		T("add-section"), b.data.sections.splice(e.index, 0, e.section), b.save(), w(), S?.sendPage(G(a), b.data);
	}
	function At(e) {
		let t = b.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (T("move-section"), [t[n], t[r]] = [t[r], t[n]], b.save(), w(), S?.sendPage(G(a), b.data));
	}
	function jt(e) {
		T("delete-section"), e.sectionId === G(A) && (R(A, null), R(j, null)), b.data.sections = b.data.sections.filter((t) => t.id !== e.sectionId), b.save(), w(), S?.sendPage(G(a), b.data);
	}
	function Mt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t && (T("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, e.sectionId === G(A) && R(M, e.minHeight, !0), b.save(), w());
	}
	function Nt(e) {
		let t = b.data.sections.find((t) => t.id === e.sectionId);
		t && (T("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), G(D)?.blockId === e.blockId && R(D, null), y(t, "blokk-slettet"), b.save(), w(), S?.sendSection(G(a), t));
	}
	let Pt = {
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
		}
	};
	function Ft(e) {
		let t = Pt[e];
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
	function It(e) {
		S ? S.sendPlaceBlock(e) : Lt(Ge()?.id, e);
	}
	function Lt(e, t) {
		let n = b.data.sections.find((t) => t.id === e) ?? b.data.sections[0];
		n && (T("add-block"), n.blocks.push(t), y(n, "blokk-lagt-til"), b.save(), w(), S?.sendSection(G(a), n));
	}
	function Rt(e) {
		It(Ft(e));
	}
	async function zt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		u("Komprimerer bildet…");
		let n;
		try {
			n = await yi(t);
		} catch {
			u("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (G(d)?.clientWidth ?? 1280));
		It({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: bi(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? u(`Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt`, "error") : u("");
	}
	function Bt(e) {
		let t = [], n = (e, n) => {
			if (!e.src?.startsWith("data:image/")) return;
			let r = e.src.split(",", 2)[1], i = `media/${bi(n || "bilde")}-${xi(r)}.webp`;
			t.push({
				path: i,
				content: r,
				encoding: "base64"
			}), e.src = `/${i}`;
		};
		for (let t of e.sections) {
			for (let e of t.background?.layers ?? []) e.type === "image" && n(e.props, "bakgrunn");
			for (let e of t.blocks) e.type === "image" && n(e.props, e.props.alt);
		}
		return t;
	}
	function Vt() {
		T("discard");
		let e = b.reset();
		x.reset(), ee(), R(p, {
			snap: !0,
			...G(C).grid
		}, !0), w(), R(s, ""), te(), G(C).pages.some((e) => e.id === G(a)) ? S?.sendPage(G(a), e) : Qe(G(C).pages[0].id);
	}
	async function Ht() {
		u("Publiserer…");
		let e = [], t = [], n = [], r = [];
		for (let o of G(C).pages) {
			let s = `urd-draft-${o.id}`, c = ne.has(o.id) || !G(i).pages.some((e) => e.id === o.id), l = null;
			if (o.id === G(a) && (b.hasDraft() || c)) l = b.data;
			else if (o.id !== G(a)) {
				let e = localStorage.getItem(s);
				if (e) try {
					l = oi(JSON.parse(e), x.data);
				} catch {}
			}
			!l && c && (l = Ze(o)), l && (e.push(...Bt(l)), e.push({
				path: o.file,
				content: JSON.stringify(l, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(o.title), c ? r.push(o.id) : n.push(s));
		}
		b.hasDraft() && b.save(), x.hasDraft() && (e.push({
			path: "content/site.json",
			content: JSON.stringify(G(C), null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-site"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of G(C).pages) n.path !== "/" && e.push({
				path: `${n.path.slice(1)}/index.html`,
				content: t,
				encoding: "utf-8"
			});
		} catch {}
		for (let t of G(i).pages) {
			let n = G(C).pages.find((e) => e.id === t.id);
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
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) ne.add(e);
			R(i, JSON.parse(JSON.stringify(G(C))), !0), x = $r("urd-draft-site", () => G(i)), ee(), R(p, {
				snap: !0,
				...G(C).grid
			}, !0);
			let e = JSON.parse(JSON.stringify(b.data));
			b = $r(`urd-draft-${G(a)}`, () => e), ne.has(G(a)) && localStorage.setItem(`urd-draft-${G(a)}`, JSON.stringify(e)), w(), u("✓ Publisert! Siden bygges på nytt (~1 min)", "ok");
		} else if (s?.status === 401) {
			let e = (await s.json().catch(() => null))?.error;
			u(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await Ye();
		} else s?.status === 403 ? u((await s.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : u(s ? (await s.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	fe();
	var Ut = pa();
	ur("keydown", Jt, de);
	var Wt = z(Ut), Kt = (e) => {
		var t = Si();
		K("click", t, St), J(e, t);
	};
	X(Wt, (e) => {
		G(h) || e(Kt);
	});
	var qt = V(Wt, 2);
	let Yt;
	var Xt = z(qt), Zt = V(z(Xt), 2), Qt = (e) => {
		var t = wi(), n = B(t);
		Dr(n, 21, () => G(C).pages, (e) => e.id, (e, t) => {
			var n = Ci(), r = z(n, !0);
			N(n);
			var i = {};
			H(() => {
				Y(r, G(t).title), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
			}), J(e, n);
		}), N(n);
		var r;
		Ir(n);
		var i = V(n, 2), o = z(i);
		let s;
		var c = V(o, 2);
		let l;
		N(i), H(() => {
			r !== (r = G(a)) && (n.value = (n.__value = G(a)) ?? "", Z(n, G(a))), s = Fr(o, 1, "ghost svelte-1n46o8q", null, s, { active: G(g) === "desktop" }), l = Fr(c, 1, "ghost svelte-1n46o8q", null, l, { active: G(g) === "mobile" });
		}), K("change", n, (e) => Qe(e.target.value)), K("click", o, () => R(g, "desktop")), K("click", c, () => R(g, "mobile")), J(e, t);
	};
	X(Zt, (e) => {
		G(i) && e(Qt);
	});
	var $t = V(Zt, 2), en = (e) => {
		var t = Ti(), n = z(t);
		N(t), H(() => Y(n, `📱 ${G(_) ?? ""} ${G(_) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), K("click", t, () => R(g, "mobile")), J(e, t);
	};
	X($t, (e) => {
		G(_) > 0 && e(en);
	});
	var tn = V($t, 2), nn = (e) => {
		J(e, Ei());
	};
	X(tn, (e) => {
		G(o) && e(nn);
	}), N(Xt);
	var rn = V(Xt, 2), an = z(rn), on = (e) => {
		var t = ki(), n = B(t), r = z(n, !0);
		N(n);
		var i = V(n, 2), a = (e) => {
			var t = Di(), n = z(t);
			N(t), H(() => {
				Wr(t, "title", G(f).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), Y(n, `${G(f).allowed ? "" : "⚠ "}${G(f).login ?? ""}`);
			}), J(e, t);
		}, s = (e) => {
			J(e, Oi());
		};
		X(i, (e) => {
			G(f)?.loggedIn ? e(a) : G(f) && e(s, 1);
		});
		var c = V(i, 2), l = V(c, 2), u = V(l, 2);
		H((e) => {
			Wr(n, "title", G(h) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), Y(r, G(h) ? "👁 Ren visning" : "✏ Rediger"), Wr(c, "href", e), l.disabled = !G(o), u.disabled = !G(o);
		}, [() => re().path]), K("click", n, St), K("click", l, Vt), K("click", u, Ht), J(e, t);
	};
	X(an, (e) => {
		G(i) && e(on);
	}), N(rn), N(qt);
	var sn = V(qt, 2), cn = (e) => {
		var t = ua(), i = z(t), o = (e) => {
			var t = la(), i = B(t);
			Dr(i, 21, () => pe, Cr, (e, t) => {
				var n = Ai();
				let r;
				var i = z(n, !0);
				N(n), H(() => {
					r = Fr(n, 1, "svelte-1n46o8q", null, r, { active: G(E) === G(t) }), Y(i, G(t));
				}), K("click", n, () => me(G(t))), J(e, n);
			}), N(i);
			var o = V(i, 2), s = (e) => {
				var t = ca(), i = z(t), o = z(i, !0);
				N(i);
				var s = V(i, 2), c = (e) => {
					var t = Fi(), n = V(z(t), 2);
					Dr(n, 17, () => G(C).pages, (e) => e.id, (e, t) => {
						var n = Pi();
						let r;
						var i = z(n);
						Q(i);
						var o = V(i, 2), s = (e) => {
							J(e, ji());
						}, c = (e) => {
							var n = Mi();
							Q(n), H((e) => $(n, e), [() => G(t).path.slice(1)]), K("change", n, (e) => ut(G(t), e.target.value)), J(e, n);
						};
						X(o, (e) => {
							G(t).path === "/" ? e(s) : e(c, -1);
						});
						var l = V(o, 2), u = z(l), d = V(u, 2), f = (e) => {
							var n = Ni();
							K("click", n, () => dt(G(t))), J(e, n);
						};
						X(d, (e) => {
							G(t).path !== "/" && e(f);
						}), N(l), N(n), H(() => {
							r = Fr(n, 1, "page-row svelte-1n46o8q", null, r, { current: G(t).id === G(a) }), $(i, G(t).title), u.disabled = G(t).id === G(a);
						}), K("change", i, (e) => st(G(t), e.target.value)), K("click", u, () => Qe(G(t).id)), J(e, n);
					});
					var r = V(n, 4);
					Q(r);
					var i = V(r, 2);
					Te(2), N(t), H((e) => i.disabled = e, [() => !G(rt).trim()]), K("keydown", r, (e) => e.key === "Enter" && ot()), Jr(r, () => G(rt), (e) => R(rt, e)), K("click", i, ot), J(e, t);
				}, l = (e) => {
					var t = Ri(), n = V(z(t), 2), r = V(z(n)), i = z(r);
					i.value = i.__value = "text";
					var a = V(i);
					a.value = a.__value = "image", N(r);
					var o;
					Ir(r), N(n);
					var s = V(n, 2);
					Q(s);
					var c = V(s, 4);
					Dr(c, 17, () => G(C).nav.items, Cr, (e, t, n) => {
						var r = Li(), i = z(r), a = z(i);
						Q(a);
						var o = V(a, 2), s = z(o);
						s.disabled = n === 0;
						var c = V(s, 2), l = V(c, 2);
						N(o), N(i);
						var u = V(i, 2), d = z(u);
						Dr(d, 17, () => G(C).pages, (e) => e.id, (e, t) => {
							var n = Ci(), r = z(n, !0);
							N(n);
							var i = {};
							H(() => {
								Y(r, G(t).title), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
							}), J(e, n);
						});
						var f = V(d);
						f.value = f.__value = "__href", N(u);
						var p;
						Ir(u);
						var m = V(u, 2), h = (e) => {
							var r = Ii();
							Q(r), H(() => $(r, G(t).href ?? "")), K("change", r, (e) => ht(n, e.target.value)), J(e, r);
						};
						X(m, (e) => {
							G(t).page || e(h);
						}), N(r), H(() => {
							$(a, G(t).label), c.disabled = n === G(C).nav.items.length - 1, p !== (p = G(t).page ?? "__href") && (u.value = (u.__value = G(t).page ?? "__href") ?? "", Z(u, G(t).page ?? "__href"));
						}), K("input", a, (e) => pt(n, e.target.value)), K("click", s, () => gt(n, -1)), K("click", c, () => gt(n, 1)), K("click", l, () => I(n)), K("change", u, (e) => mt(n, e.target.value)), J(e, r);
					});
					var l = V(c, 2);
					N(t), H(() => {
						o !== (o = G(C).nav.logo?.type ?? "text") && (r.value = (r.__value = G(C).nav.logo?.type ?? "text") ?? "", Z(r, G(C).nav.logo?.type ?? "text")), $(s, G(C).nav.logo?.value ?? ""), Wr(s, "placeholder", G(C).nav.logo?.type === "image" ? "/media/logo.webp" : "Navnet i menyen");
					}), K("change", r, (e) => ft({ type: e.target.value })), K("input", s, (e) => ft({ value: e.target.value })), K("click", l, _t), J(e, t);
				}, u = (e) => {
					var t = Bi(), n = V(z(t), 2), r = V(z(n));
					Q(r), N(n);
					var i = V(n, 2), a = V(z(i));
					Q(a), N(i);
					var o = V(i, 2), s = V(z(o));
					Q(s), N(o);
					var c = V(o, 2), l = V(z(c));
					Q(l), N(c);
					var u = V(c, 4), d = V(z(u)), f = z(d), p = (e) => {
						var t = zi(), n = {};
						H(() => {
							n !== (n = G(C).theme.tokens.font.heading) && (t.value = (t.__value = G(C).theme.tokens.font.heading) ?? "");
						}), J(e, t);
					}, h = /* @__PURE__ */ lt(() => !vt.some(([, e]) => e === G(C).theme.tokens.font.heading));
					X(f, (e) => {
						G(h) && e(p);
					}), Dr(V(f), 17, () => vt, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ lt(() => m(G(t), 2));
						let r = () => G(n)[0], i = () => G(n)[1];
						var a = Ci(), o = z(a, !0);
						N(a);
						var s = {};
						H(() => {
							Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), J(e, a);
					}), N(d);
					var g;
					Ir(d), N(u);
					var _ = V(u, 2), v = V(z(_)), y = z(v), b = (e) => {
						var t = zi(), n = {};
						H(() => {
							n !== (n = G(C).theme.tokens.font.body) && (t.value = (t.__value = G(C).theme.tokens.font.body) ?? "");
						}), J(e, t);
					}, x = /* @__PURE__ */ lt(() => !vt.some(([, e]) => e === G(C).theme.tokens.font.body));
					X(y, (e) => {
						G(x) && e(b);
					}), Dr(V(y), 17, () => vt, ([e, t]) => t, (e, t) => {
						var n = /* @__PURE__ */ lt(() => m(G(t), 2));
						let r = () => G(n)[0], i = () => G(n)[1];
						var a = Ci(), o = z(a, !0);
						N(a);
						var s = {};
						H(() => {
							Y(o, r()), s !== (s = i()) && (a.value = (a.__value = i()) ?? "");
						}), J(e, a);
					}), N(v);
					var S;
					Ir(v), N(_);
					var ee = V(_, 4), te = V(z(ee));
					Q(te), N(ee);
					var ne = V(ee, 2), re = V(z(ne));
					Q(re), N(ne), N(t), H(() => {
						$(r, G(C).theme.tokens.color.bg), $(a, G(C).theme.tokens.color.surface), $(s, G(C).theme.tokens.color.text), $(l, G(C).theme.tokens.color.accent), g !== (g = G(C).theme.tokens.font.heading) && (d.value = (d.__value = G(C).theme.tokens.font.heading) ?? "", Z(d, G(C).theme.tokens.font.heading)), S !== (S = G(C).theme.tokens.font.body) && (v.value = (v.__value = G(C).theme.tokens.font.body) ?? "", Z(v, G(C).theme.tokens.font.body)), $(te, G(C).theme.tokens.radius.sm), $(re, G(C).theme.tokens.radius.md);
					}), K("input", r, (e) => yt("bg", e.target.value)), K("input", a, (e) => yt("surface", e.target.value)), K("input", s, (e) => yt("text", e.target.value)), K("input", l, (e) => yt("accent", e.target.value)), K("change", d, (e) => bt("heading", e.target.value)), K("change", v, (e) => bt("body", e.target.value)), K("change", te, (e) => xt("sm", e.target.value)), K("change", re, (e) => xt("md", e.target.value)), J(e, t);
				}, d = (e) => {
					var t = Vi();
					let n;
					var r = V(z(t), 2), i = V(z(r), 2), a = z(i), o = V(a, 2);
					N(i), N(r);
					var s = V(r, 2), c = V(s, 2), l = V(z(c));
					N(c);
					var u = V(c, 2), d = V(z(u), 2), f = z(d), p = V(f, 2), m = V(p, 2), h = V(m, 2), _ = V(h, 2);
					N(d), N(u), N(t), H(() => {
						n = Fr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: G(g) === "mobile" }), Wr(t, "title", G(g) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), K("click", a, () => Rt("text")), K("click", o, () => Rt("text-box")), K("click", s, () => Rt("button")), K("change", l, zt), K("click", f, () => Rt("shape-line")), K("click", p, () => Rt("shape-arrow")), K("click", m, () => Rt("shape-circle")), K("click", h, () => Rt("shape-rect")), K("click", _, () => Rt("shape-triangle")), J(e, t);
				}, f = (e) => {
					var t = Hi(), n = V(z(t), 2), r = V(z(n)), i = z(r);
					N(r), N(n);
					var a = V(n, 2);
					Q(a);
					var o = V(a, 2), s = z(o);
					Q(s), Te(), N(o), Te(2), N(t), H(() => {
						Y(i, `${G(p).size ?? ""} px`), $(a, G(p).size), Ur(s, G(p).snap !== !1);
					}), K("input", a, (e) => Je("size", Number(e.target.value))), K("change", s, (e) => Je("snap", e.target.checked)), J(e, t);
				}, h = (e) => {
					var t = oa(), i = z(t), a = (e) => {
						var t = Yi(), n = B(t), r = z(n);
						N(n);
						var i = V(n, 2), a = (e) => {
							var t = Ui(), n = z(t), r = V(z(n));
							Q(r), N(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), N(i);
							var o = V(i, 2), s = V(z(o));
							Q(s), N(o);
							var c = V(o, 2), l = V(z(c));
							Q(l), N(c);
							var u = V(c, 2), d = V(z(u));
							Q(d), N(u);
							var f = V(u, 2), p = V(z(f));
							Q(p), N(f), N(t), H(() => {
								$(r, G(D).frame.x), $(a, G(D).frame.y), $(s, G(D).frame.w), $(l, G(D).frame.h), $(d, G(D).frame.z ?? 1), $(p, G(D).frame.rot ?? 0);
							}), K("change", r, (e) => ye("x", Number(e.target.value))), K("change", a, (e) => ye("y", Number(e.target.value))), K("change", s, (e) => ye("w", Number(e.target.value))), K("change", l, (e) => ye("h", Number(e.target.value))), K("change", d, (e) => ye("z", Number(e.target.value))), K("change", p, (e) => ye("rot", Number(e.target.value))), J(e, t);
						};
						X(i, (e) => {
							G(g) === "desktop" && e(a);
						});
						var o = V(i, 2), s = z(o);
						Q(s), Te(), N(o);
						var c = V(o, 4), l = (e) => {
							var t = Wi(), n = B(t), r = V(z(n)), i = z(r);
							i.value = i.__value = "left";
							var a = V(i);
							a.value = a.__value = "center";
							var o = V(a);
							o.value = o.__value = "right", N(r);
							var s;
							Ir(r), N(n);
							var c = V(n, 2), l = z(c);
							Q(l), Te(), N(c), Te(2), H((e) => {
								s !== (s = G(D).props.align ?? "left") && (r.value = (r.__value = G(D).props.align ?? "left") ?? "", Z(r, G(D).props.align ?? "left")), Ur(l, e);
							}, [() => !!G(D).props.box]), K("change", r, (e) => O("align", e.target.value)), K("change", l, (e) => O("box", e.target.checked)), J(e, t);
						}, u = (e) => {
							var t = Gi(), n = B(t), r = V(z(n));
							Q(r), N(n);
							var i = V(n, 2), a = V(z(i)), o = z(a);
							Dr(o, 17, () => G(C).pages, (e) => e.id, (e, t) => {
								var n = Ci(), r = z(n, !0);
								N(n);
								var i = {};
								H(() => {
									Y(r, G(t).title), i !== (i = G(t).id) && (n.value = (n.__value = G(t).id) ?? "");
								}), J(e, n);
							});
							var s = V(o);
							s.value = s.__value = "__href", N(a);
							var c;
							Ir(a), N(i);
							var l = V(i, 2), u = (e) => {
								var t = Ii();
								Q(t), H(() => $(t, G(D).props.href === "#" ? "" : G(D).props.href ?? "")), K("change", t, (e) => O("href", e.target.value || null)), J(e, t);
							};
							X(l, (e) => {
								G(D).props.page || e(u);
							});
							var d = V(l, 2), f = V(z(d)), p = z(f);
							p.value = p.__value = "primary";
							var m = V(p);
							m.value = m.__value = "secondary", N(f);
							var h;
							Ir(f), N(d), H(() => {
								$(r, G(D).props.label), c !== (c = G(D).props.page ?? "__href") && (a.value = (a.__value = G(D).props.page ?? "__href") ?? "", Z(a, G(D).props.page ?? "__href")), h !== (h = G(D).props.style) && (f.value = (f.__value = G(D).props.style) ?? "", Z(f, G(D).props.style));
							}), K("change", r, (e) => O("label", e.target.value)), K("change", a, (e) => {
								let t = e.target.value === "__href" ? null : e.target.value;
								ve(`edit:${G(D).blockId}`, (e) => {
									e.props.page = t, t && (e.props.href = null);
								});
							}), K("change", f, (e) => O("style", e.target.value)), J(e, t);
						}, d = (e) => {
							var t = Ki(), n = B(t), r = V(z(n));
							N(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), N(i);
							var o = V(i, 2), s = V(z(o)), c = z(s);
							c.value = c.__value = "cover";
							var l = V(c);
							l.value = l.__value = "contain", N(s);
							var u;
							Ir(s), N(o);
							var d = V(o, 2), f = V(z(d)), p = z(f);
							p.value = p.__value = "";
							var m = V(p);
							m.value = m.__value = "sm";
							var h = V(m);
							h.value = h.__value = "md", N(f);
							var g;
							Ir(f), N(d);
							var _ = V(d, 2), v = V(z(_));
							Q(v), N(_), H(() => {
								$(a, G(D).props.alt ?? ""), u !== (u = G(D).props.fit ?? "cover") && (s.value = (s.__value = G(D).props.fit ?? "cover") ?? "", Z(s, G(D).props.fit ?? "cover")), g !== (g = G(D).props.radius ?? "") && (f.value = (f.__value = G(D).props.radius ?? "") ?? "", Z(f, G(D).props.radius ?? "")), $(v, G(D).props.href ?? "");
							}), K("change", r, xe), K("change", a, (e) => O("alt", e.target.value)), K("change", s, (e) => O("fit", e.target.value)), K("change", f, (e) => O("radius", e.target.value || null)), K("change", v, (e) => O("href", e.target.value || null)), J(e, t);
						}, f = (e) => {
							var t = qi(), n = B(t), r = V(z(n));
							Dr(r, 21, () => Ce, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ lt(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Ci(), o = z(a, !0);
								N(a);
								var s = {};
								H(() => {
									Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), N(r);
							var i;
							Ir(r), N(n);
							var a = V(n, 2), o = V(z(a));
							Dr(o, 21, () => k, ([e, t]) => e, (e, t) => {
								var n = /* @__PURE__ */ lt(() => m(G(t), 2));
								let r = () => G(n)[0], i = () => G(n)[1];
								var a = Ci(), o = z(a, !0);
								N(a);
								var s = {};
								H(() => {
									Y(o, i()), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
								}), J(e, a);
							}), N(o);
							var s;
							Ir(o), N(a);
							var c = V(a, 2), l = V(z(c));
							Q(l), N(c);
							var u = V(c, 2), d = z(u);
							Q(d), Te(), N(u), H((e) => {
								i !== (i = G(D).props.kind) && (r.value = (r.__value = G(D).props.kind) ?? "", Z(r, G(D).props.kind)), s !== (s = G(D).props.color) && (o.value = (o.__value = G(D).props.color) ?? "", Z(o, G(D).props.color)), $(l, G(D).props.thickness), Ur(d, e);
							}, [() => !!G(D).props.fill]), K("change", r, (e) => O("kind", e.target.value)), K("change", o, (e) => O("color", e.target.value)), K("change", l, (e) => O("thickness", Number(e.target.value))), K("change", d, (e) => O("fill", e.target.checked ? G(D).props.color : null)), J(e, t);
						};
						X(c, (e) => {
							G(D).type === "text" ? e(l) : G(D).type === "button" ? e(u, 1) : G(D).type === "image" ? e(d, 2) : G(D).type === "shape" && e(f, 3);
						});
						var p = V(c, 4), h = V(z(p)), _ = z(h);
						_.value = _.__value = "", Dr(V(_), 17, () => Object.entries(hi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ lt(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = Ci(), o = z(a, !0);
							N(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), N(h);
						var v;
						Ir(h), N(p);
						var y = V(p, 2), b = (e) => {
							var t = Ji(), n = B(t), r = V(z(n));
							Q(r), N(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), N(i), Te(2), H(() => {
								$(r, G(D).animation.props.duration), $(a, G(D).animation.props.delay);
							}), K("change", r, (e) => He("duration", Number(e.target.value))), K("change", a, (e) => He("delay", Number(e.target.value))), J(e, t);
						};
						X(y, (e) => {
							G(D).animation && hi[G(D).animation.type]?.entrance && e(b);
						}), H(() => {
							Y(r, `${Se[G(D).type] ?? G(D).type ?? ""}-blokk`), Ur(s, G(D).decor), v !== (v = G(D).animation?.type ?? "") && (h.value = (h.__value = G(D).animation?.type ?? "") ?? "", Z(h, G(D).animation?.type ?? ""));
						}), K("change", s, (e) => be(e.target.checked)), K("change", h, (e) => Ve(e.target.value || null)), J(e, t);
					}, o = (e) => {
						var t = ia(), i = V(B(t), 2), a = V(z(i));
						Q(a), N(i);
						var o = V(i, 6), s = z(o);
						Q(s), Te(), N(o);
						var c = V(o, 2), l = (e) => {
							var t = Xi(), n = B(t), r = V(z(n)), i = z(r);
							N(r), N(n);
							var a = V(n, 2);
							Q(a), H(() => {
								Y(i, `${G(j).size ?? ""} px`), $(a, G(j).size);
							}), K("input", a, (e) => qe("size", Number(e.target.value))), J(e, t);
						};
						X(c, (e) => {
							G(j) && e(l);
						});
						var u = V(c, 8);
						Dr(u, 17, () => G(we), Cr, (e, t, n) => {
							var i = na(), a = z(i), o = z(a), s = z(o, !0);
							N(o);
							var c = V(o, 2), l = z(c);
							l.disabled = n === 0;
							var u = V(l, 2), d = V(u, 2);
							N(c), N(a);
							var f = V(a, 2), p = (e) => {
								var r = Zi(), i = V(z(r));
								Q(i), N(r), H((e) => $(i, e), [() => ze(G(t).props.value)]), K("input", i, (e) => P(n, "value", e.target.value)), J(e, r);
							}, m = (e) => {
								var r = Qi(), i = B(r), a = V(z(i));
								Q(a), N(i);
								var o = V(i, 2), s = V(z(o));
								Q(s), N(o);
								var c = V(o, 2), l = V(z(c));
								Q(l), N(c);
								var u = V(c, 2), d = z(u);
								Q(d), Te(), N(u), H((e, n, r) => {
									$(a, e), $(s, n), $(l, G(t).props.angle), Ur(d, r);
								}, [
									() => ze(G(t).props.stops[0]),
									() => ze(G(t).props.stops[G(t).props.stops.length - 1]),
									() => !!G(t).props.animate
								]), K("input", a, (e) => Le(n, 0, e.target.value)), K("input", s, (e) => Le(n, G(t).props.stops.length - 1, e.target.value)), K("change", l, (e) => P(n, "angle", Number(e.target.value))), K("change", d, (e) => P(n, "animate", e.target.checked)), J(e, r);
							}, h = (e) => {
								var r = $i(), i = B(r), a = V(z(i));
								Q(a), N(i);
								var o = V(i, 2), s = V(z(o)), c = z(s);
								N(s), N(o);
								var l = V(o, 2);
								Q(l);
								var u = V(l, 2), d = V(z(u)), f = z(d);
								N(d), N(u);
								var p = V(u, 2);
								Q(p);
								var m = V(p, 2), h = V(z(m)), g = z(h);
								N(h), N(m);
								var _ = V(m, 2);
								Q(_);
								var v = V(_, 2), y = V(z(v)), b = z(y);
								N(y), N(v);
								var x = V(v, 2);
								Q(x), H((e, n, r, i, o) => {
									$(a, e), Y(c, `${n ?? ""}%`), $(l, G(t).props.x), Y(f, `${r ?? ""}%`), $(p, G(t).props.y), Y(g, `${i ?? ""}%`), $(_, G(t).props.radius), Y(b, `${o ?? ""}%`), $(x, G(t).props.opacity);
								}, [
									() => ze(G(t).props.color),
									() => Math.round(G(t).props.x * 100),
									() => Math.round(G(t).props.y * 100),
									() => Math.round(G(t).props.radius * 100),
									() => Math.round(G(t).props.opacity * 100)
								]), K("input", a, (e) => P(n, "color", e.target.value)), K("input", l, (e) => P(n, "x", Number(e.target.value))), K("input", p, (e) => P(n, "y", Number(e.target.value))), K("input", _, (e) => P(n, "radius", Number(e.target.value))), K("input", x, (e) => P(n, "opacity", Number(e.target.value))), J(e, r);
							}, g = (e) => {
								var r = ea(), i = B(r), a = V(z(i)), o = z(a);
								N(a), N(i);
								var s = V(i, 2);
								Q(s), H((e) => {
									Y(o, `${e ?? ""}%`), $(s, G(t).props.opacity);
								}, [() => Math.round(G(t).props.opacity * 100)]), K("input", s, (e) => P(n, "opacity", Number(e.target.value))), J(e, r);
							}, _ = (e) => {
								var r = ta(), i = B(r), a = z(i), o = V(a);
								N(i);
								var s = V(i, 2), c = V(z(s)), l = z(c);
								l.value = l.__value = "cover";
								var u = V(l);
								u.value = u.__value = "contain", N(c);
								var d;
								Ir(c), N(s);
								var f = V(s, 2), p = V(z(f)), m = z(p);
								N(p), N(f);
								var h = V(f, 2);
								Q(h), H((e) => {
									Y(a, `${G(t).props.src ? "Bytt bilde" : "Velg bilde"} `), d !== (d = G(t).props.fit ?? "cover") && (c.value = (c.__value = G(t).props.fit ?? "cover") ?? "", Z(c, G(t).props.fit ?? "cover")), Y(m, `${e ?? ""}%`), $(h, G(t).props.opacity ?? 1);
								}, [() => Math.round((G(t).props.opacity ?? 1) * 100)]), K("change", o, (e) => Re(n, e)), K("change", c, (e) => P(n, "fit", e.target.value)), K("input", h, (e) => P(n, "opacity", Number(e.target.value))), J(e, r);
							};
							X(f, (e) => {
								G(t).type === "color" ? e(p) : G(t).type === "gradient" ? e(m, 1) : G(t).type === "glow" ? e(h, 2) : G(t).type === "grain" ? e(g, 3) : G(t).type === "image" && e(_, 4);
							}), N(i), H(() => {
								Y(s, r[G(t).type]?.label ?? G(t).type), u.disabled = n === G(we).length - 1;
							}), K("click", l, () => Pe(n, -1)), K("click", u, () => Pe(n, 1)), K("click", d, () => Ne(n)), J(e, i);
						});
						var d = V(u, 2), f = V(z(d));
						Dr(f, 21, () => n, ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ lt(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = Ci(), o = z(a, !0);
							N(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), N(f), N(d);
						var p = V(d, 2), h = V(p, 4), g = V(z(h)), _ = z(g);
						_.value = _.__value = "", Dr(V(_), 17, () => Object.entries(hi), ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ lt(() => m(G(t), 2));
							let r = () => G(n)[0], i = () => G(n)[1];
							var a = Ci(), o = z(a, !0);
							N(a);
							var s = {};
							H(() => {
								Y(o, i().label), s !== (s = r()) && (a.value = (a.__value = r()) ?? "");
							}), J(e, a);
						}), N(g);
						var v;
						Ir(g), N(h);
						var y = V(h, 2), b = (e) => {
							var t = ra(), n = B(t), r = V(z(n));
							Q(r), N(n);
							var i = V(n, 2), a = V(z(i));
							Q(a), N(i), Te(2), H(() => {
								$(r, G(Ee).props.duration), $(a, G(Ee).props.delay);
							}), K("change", r, (e) => We("duration", Number(e.target.value))), K("change", a, (e) => We("delay", Number(e.target.value))), J(e, t);
						};
						X(y, (e) => {
							G(Ee) && hi[G(Ee).type]?.entrance && e(b);
						}), H(() => {
							$(a, G(M)), Ur(s, G(j) !== null), v !== (v = G(Ee)?.type ?? "") && (g.value = (g.__value = G(Ee)?.type ?? "") ?? "", Z(g, G(Ee)?.type ?? ""));
						}), K("change", a, (e) => F(e.target.value)), K("change", s, (e) => Ke(e.target.checked)), Lr(f, () => G(Ae), (e) => R(Ae, e)), K("click", p, () => je(G(Ae))), K("change", g, (e) => Ue(e.target.value || null)), J(e, t);
					}, s = (e) => {
						J(e, aa());
					};
					X(i, (e) => {
						G(D) ? e(a) : G(A) ? e(o, 1) : e(s, -1);
					}), N(t), J(e, t);
				}, _ = (e) => {
					var t = sa(), n = z(t), r = z(n);
					N(n), N(t), H(() => Y(r, `${G(E) ?? ""}-panelet kommer i en senere del av v0.5.`)), J(e, t);
				};
				X(s, (e) => {
					G(E) === "Sider" ? e(c) : G(E) === "Nav" ? e(l, 1) : G(E) === "Tema" ? e(u, 2) : G(E) === "Blokker" ? e(d, 3) : G(E) === "Grid" ? e(f, 4) : G(E) === "Egenskaper" ? e(h, 5) : e(_, -1);
				}), N(t), H(() => Y(o, G(E))), J(e, t);
			};
			X(o, (e) => {
				G(E) && e(s);
			}), J(e, t);
		};
		X(i, (e) => {
			G(h) && e(o);
		});
		var s = V(i, 2);
		let c;
		var l = z(s);
		Qr(l, (e) => R(d, e), () => G(d)), N(s), N(t), H(() => {
			c = Fr(s, 1, "frame-wrap svelte-1n46o8q", null, c, { mobile: G(g) === "mobile" }), Wr(l, "src", `/?page=${G(a)}&preview=1`);
		}), ur("load", l, $e), cr(l), J(e, t);
	}, ln = (e) => {
		J(e, da());
	};
	X(sn, (e) => {
		G(i) ? e(cn) : e(ln, -1);
	});
	var un = V(sn, 2), dn = (e) => {
		var t = fa();
		let n;
		var r = z(t), i = z(r, !0);
		N(r);
		var a = V(r, 2);
		N(t), H(() => {
			n = Fr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: G(c) === "ok",
				error: G(c) === "error"
			}), Y(i, G(s));
		}), K("click", a, () => u("")), J(e, t);
	};
	X(un, (e) => {
		G(s) && e(dn);
	}), N(Ut), H(() => Yt = Fr(qt, 1, "topbar svelte-1n46o8q", null, Yt, { hidden: !G(h) })), J(e, Ut), Ie();
}
dr([
	"click",
	"change",
	"keydown",
	"input"
]);
//#endregion
//#region src/main.js
var ha = vr(ma, { target: document.getElementById("urd-admin") });
//#endregion
export { ha as default };
