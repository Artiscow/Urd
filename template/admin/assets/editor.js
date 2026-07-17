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
var m = 1024, h = 2048, g = 4096, _ = 8192, v = 16384, y = 32768, b = 1 << 25, x = 65536, S = 1 << 19, ee = 1 << 20, te = 1 << 25, C = 65536, ne = 1 << 21, re = 1 << 22, ie = 1 << 23, w = Symbol("$state"), ae = Symbol(""), oe = Symbol("attributes"), se = Symbol("class"), ce = Symbol("style"), le = Symbol("text"), ue = Symbol("form reset"), de = new class extends Error {
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
function he() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ge() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function _e() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function ve() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ye() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var be = {}, T = Symbol("uninitialized"), xe = "http://www.w3.org/1999/xhtml";
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
var E = !1;
function Ee(e) {
	E = e;
}
var D;
function O(e) {
	if (e === null) throw Ce(), be;
	return D = e;
}
function De() {
	return O(/* @__PURE__ */ Jt(D));
}
function k(e) {
	if (E) {
		if (/* @__PURE__ */ Jt(D) !== null) throw Ce(), be;
		D = e;
	}
}
function Oe(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ Jt(n);
		D = n;
	}
}
function ke(e = !0) {
	for (var t = 0, n = D;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ Jt(n);
		e && n.remove(), n = i;
	}
}
function Ae(e) {
	if (!e || e.nodeType !== 8) throw Ce(), be;
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
//#region node_modules/svelte/src/internal/client/context.js
var A = null;
function Pe(e) {
	A = e;
}
function Fe(e, t = !1, n) {
	A = {
		p: A,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: G,
		l: null
	};
}
function Ie(e) {
	var t = A, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) an(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, A = t.p, e ?? {};
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
function j(e) {
	if (Re.length === 0 && !ht) {
		var t = Re;
		queueMicrotask(() => {
			t === Re && ze();
		});
	}
	Re.push(e);
}
function Be(e) {
	var t = G;
	if (t === null) return H.f |= ie, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Ve(e, t);
}
function Ve(e, t) {
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
var He = ~(h | g | m);
function M(e, t) {
	e.f = e.f & He | t;
}
function Ue(e) {
	e.f & 512 || e.deps === null ? M(e, m) : M(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function We(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= C, We(t.deps));
}
function Ge(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), We(e.deps), M(e, m);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Ke = !1;
function qe() {
	Ke || (Ke = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[ue]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function Je(e) {
	var t = H, n = G;
	W(null), K(null);
	try {
		return e();
	} finally {
		W(t), K(n);
	}
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Ye(e) {
	let t = 0, n = Nt(0), r;
	return () => {
		nn() && (X(n), ln(() => (t === 0 && (r = Hn(() => e(() => Lt(n)))), t += 1, () => {
			j(() => {
				--t, t === 0 && (r?.(), r = void 0, Lt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Xe = x | S;
function Ze(e, t, n, r) {
	new Qe(e, t, n, r);
}
var Qe = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = E ? D : null;
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
	#h = Ye(() => (this.#m = Nt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = dn(() => {
			if (E) {
				let e = this.#t;
				De();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, Xe), E && (this.#e = D);
	}
	#g() {
		try {
			this.#a = B(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = B(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = B(() => e(this.#e)), j(() => {
			var e = this.#c = document.createDocumentFragment(), t = L();
			e.append(t), this.#a = this.#x(() => B(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, _n(this.#o, () => {
				this.#o = null;
			}), this.#b(N));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = B(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				xn(this.#a, e);
				let t = this.#n.pending;
				this.#o = B(() => t(this.#e));
			} else this.#b(N);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		Ge(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = G, n = H, r = A;
		K(this.#i), W(this.#i), Pe(this.#i.ctx);
		try {
			return xt.ensure(), e();
		} catch (e) {
			return Be(e), null;
		} finally {
			K(t), W(n), Pe(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && _n(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, j(() => {
			this.#d = !1, this.#m && Ft(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), X(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		N?.is_fork ? (this.#a && N.skip_effect(this.#a), this.#o && N.skip_effect(this.#o), this.#s && N.skip_effect(this.#s), N.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (V(this.#a), null), this.#o &&= (V(this.#o), null), this.#s &&= (V(this.#s), null), E && (O(this.#t), Oe(), O(ke()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				Te();
				return;
			}
			r = !0, i && ye(), this.#s !== null && _n(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Ve(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return B(() => {
						var t = G;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ve(e, this.#i.parent), null;
				}
			}));
		};
		j(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Ve(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Ve(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function $e(e, t, n, r) {
	let i = Le() ? rt : ot;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = G, c = et(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Ve(e, s);
			}
			tt();
		}
	}
	var d = nt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ at(e))).then(u).catch((e) => Ve(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), tt();
	}) : f();
}
function et() {
	var e = G, t = H, n = A, r = N;
	return function(i = !0) {
		K(e), W(t), Pe(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function tt(e = !0) {
	K(null), W(null), Pe(null), e && N?.deactivate();
}
function nt() {
	var e = G, t = e.b, n = N, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function rt(e) {
	var t = 2 | h;
	return G !== null && (G.f |= S), {
		ctx: A,
		deps: null,
		effects: null,
		equals: je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: T,
		wv: 0,
		parent: G,
		ac: null
	};
}
var it = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function at(e, t, n) {
	let r = G;
	r === null && pe();
	var i = void 0, a = Nt(T), o = !H, s = /* @__PURE__ */ new Set();
	return cn(() => {
		var t = G, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== de && n.reject(e);
			}).finally(tt);
		} catch (e) {
			n.reject(e), tt();
		}
		var c = N;
		if (o) {
			if (t.f & 32768) var l = nt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(it);
			else for (let e of s.values()) e.reject(it);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== it && (c.activate(), t ? (a.f |= ie, Ft(a, t)) : (a.f & 8388608 && (a.f ^= ie), Ft(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), rn(() => {
		for (let e of s) e.reject(it);
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
function ot(e) {
	let t = /* @__PURE__ */ rt(e);
	return t.equals = Ne, t;
}
function st(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) V(t[n]);
	}
}
function ct(e) {
	var t, n = G, r = e.parent;
	if (!wn && r !== null && e.v !== T && r.f & 24576) return Se(), e.v;
	K(r);
	try {
		e.f &= ~C, st(e), t = In(e);
	} finally {
		K(n);
	}
	return t;
}
function lt(e) {
	var t = ct(e);
	if (!e.equals(t) && (e.wv = Nn(), (!N?.is_fork || e.deps === null) && (N === null ? e.v = t : (N.capture(e, t, !0), pt?.capture(e, t, !0)), e.deps === null))) {
		M(e, m);
		return;
	}
	wn || (P === null ? Ue(e) : (nn() || N?.is_fork) && P.set(e, t));
}
function ut(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Je(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), Rn(t, 0), pn(t));
}
function dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && zn(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var ft = null, N = null, pt = null, P = null, mt = null, ht = !1, gt = !1, _t = null, vt = null, yt = 0, bt = 1, xt = class e {
	id = bt++;
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
		ft === null ? ft = this : (ft.#n = this, this.#t = ft), ft = this;
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
			for (var r of n.d) M(r, h), t(r);
			for (r of n.m) M(r, g), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, yt++ > 1e3 && (this.#x(), St());
		for (let e of this.#u) this.#d.delete(e), M(e, h), this.schedule(e);
		for (let e of this.#d) M(e, g), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = _t = [], r = [], i = vt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw kt(e), this.#h() || this.discard(), t;
		}
		if (N = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (_t = null, vt = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Ot(e, t);
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
		this.#r.clear(), pt = this, wt(r), wt(n), pt = null, this.#s?.resolve();
		var s = N;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= m;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = (i & 96) != 0;
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= m : i & 4 ? t.push(r) : Pn(r) && (i & 16 && this.#d.add(r), zn(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), M(i, h), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), N = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) Ge(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== T && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), P?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		N = this;
	}
	deactivate() {
		N = null, P = null;
	}
	flush() {
		try {
			gt = !0, N = this, this.#g();
		} finally {
			yt = 0, mt = null, _t = null, vt = null, gt = !1, N = null, P = null, jt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(it);
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
		this.#m || (this.#m = !0, j(() => {
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
			!gt && j(() => {
				t.#e || t.flush();
			});
		}
		return N;
	}
	apply() {
		P = null;
	}
	schedule(e) {
		if (mt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (_t !== null && t === G && (H === null || !(H.f & 2))) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= m;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? ft = e : t.#t = e, this.linked = !1;
		}
	}
};
function St() {
	try {
		he();
	} catch (e) {
		Ve(e, mt);
	}
}
var Ct = null;
function wt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Pn(r) && (Ct = /* @__PURE__ */ new Set(), zn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && gn(r), Ct?.size > 0)) {
				jt.clear();
				for (let e of Ct) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ct.has(n) && (Ct.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || zn(n);
					}
				}
				Ct.clear();
			}
		}
		Ct = null;
	}
}
function Tt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? Tt(i, t, n, r) : e & 4194320 && !(e & 2048) && Et(i, t, r) && (M(i, h), Dt(i));
	}
}
function Et(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Et(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Dt(e) {
	N.schedule(e);
}
function Ot(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), M(e, m);
		for (var n = e.first; n !== null;) Ot(n, t), n = n.next;
	}
}
function kt(e) {
	M(e, m);
	for (var t = e.first; t !== null;) kt(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var At = /* @__PURE__ */ new Set(), jt = /* @__PURE__ */ new Map(), Mt = !1;
function Nt(e, t) {
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
function F(e, t) {
	let n = Nt(e, t);
	return Dn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Pt(e, t = !1, n = !0) {
	let r = Nt(e);
	return t || (r.equals = Ne), r;
}
function I(e, t, n = !1) {
	return H !== null && (!U || H.f & 131072) && Le() && H.f & 4325394 && (En === null || !En.has(e)) && ve(), Ft(e, n ? zt(t) : t, vt);
}
function Ft(e, t, n = null) {
	if (!e.equals(t)) {
		jt.set(e, wn ? t : e.v);
		var r = xt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && ct(t), P === null && Ue(t);
		}
		e.wv = Nn(), Rt(e, h, n), Le() && G !== null && G.f & 1024 && !(G.f & 96) && (Y === null ? On([e]) : Y.push(e)), !r.is_fork && At.size > 0 && !Mt && It();
	}
	return t;
}
function It() {
	Mt = !1;
	for (let e of At) {
		e.f & 1024 && M(e, g);
		let t;
		try {
			t = Pn(e);
		} catch {
			t = !0;
		}
		t && zn(e);
	}
	At.clear();
}
function Lt(e) {
	I(e, e.v + 1);
}
function Rt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Le(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === G)) {
			var l = (c & h) === 0;
			if (l && M(s, t), c & 131072) At.add(s);
			else if (c & 2) {
				var u = s;
				P?.delete(u), c & 65536 || (c & 512 && (G === null || !(G.f & 2097152)) && (s.f |= C), Rt(u, g, n));
			} else if (l) {
				var d = s;
				c & 16 && Ct !== null && Ct.add(d), n === null ? Dt(d) : n.push(d);
			}
		}
	}
}
function zt(t) {
	if (typeof t != "object" || !t || w in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ F(0), u = null, d = jn, f = (e) => {
		if (jn === d) return e();
		var t = H, n = jn;
		W(null), Mn(d);
		var r = e();
		return W(t), Mn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ F(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && ge();
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
					let e = f(() => /* @__PURE__ */ F(T, u));
					r.set(t, e), Lt(o);
				}
			} else I(n, T), Lt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === w) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(zt(s ? e[n] : T), u)), r.set(n, o)), o !== void 0) {
				var c = X(o);
				return c === T ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = X(i));
			} else if (n === void 0) {
				var a = r.get(t), o = a?.v;
				if (a !== void 0 && o !== T) return {
					enumerable: !0,
					configurable: !0,
					value: o,
					writable: !0
				};
			}
			return n;
		},
		has(e, t) {
			if (t === w) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== T || Reflect.has(e, t);
			return (n !== void 0 || G !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? zt(e[t]) : T, u)), r.set(t, n)), X(n) === T) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(T, u)), r.set(d + "", p)) : I(p, T);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, zt(n)), r.set(t, c));
			else {
				l = c.v !== T;
				var m = f(() => zt(n));
				I(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && I(g, _ + 1);
				}
				Lt(o);
			}
			return !0;
		},
		ownKeys(e) {
			X(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== T;
			});
			for (var [n, i] of r) i.v !== T && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			_e();
		}
	});
}
function Bt(e) {
	try {
		if (typeof e == "object" && e && w in e) return e[w];
	} catch {}
	return e;
}
function Vt(e, t) {
	return Object.is(Bt(e), Bt(t));
}
var Ht, Ut, Wt, Gt;
function Kt() {
	if (Ht === void 0) {
		Ht = window, Ut = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Wt = a(t, "firstChild").get, Gt = a(t, "nextSibling").get, u(e) && (e[se] = void 0, e[oe] = null, e[ce] = void 0, e.__e = void 0), u(n) && (n[le] = void 0);
	}
}
function L(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function qt(e) {
	return Wt.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Jt(e) {
	return Gt.call(e);
}
function R(e, t) {
	if (!E) return /* @__PURE__ */ qt(e);
	var n = /* @__PURE__ */ qt(D);
	if (n === null) n = D.appendChild(L());
	else if (t && n.nodeType !== 3) {
		var r = L();
		return n?.before(r), O(r), r;
	}
	return t && $t(n), O(n), n;
}
function Yt(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ qt(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Jt(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = L();
			return D?.before(r), O(r), r;
		}
		$t(D);
	}
	return D;
}
function z(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Jt(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = L();
			return r === null ? i?.after(a) : r.before(a), O(a), a;
		}
		$t(r);
	}
	return O(r), r;
}
function Xt(e) {
	e.textContent = "";
}
function Zt() {
	return !1;
}
function Qt(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function $t(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function en(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function tn(e, t) {
	var n = G;
	n !== null && n.f & 8192 && (e |= _);
	var r = {
		ctx: A,
		deps: null,
		nodes: null,
		f: e | h | 512,
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
	if (e & 4) _t === null ? xt.ensure().schedule(r) : _t.push(r);
	else if (t !== null) {
		try {
			zn(r);
		} catch (e) {
			throw V(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= x));
	}
	if (i !== null && (i.parent = n, n !== null && en(i, n), H !== null && H.f & 2 && !(e & 64))) {
		var a = H;
		(a.effects ??= []).push(i);
	}
	return r;
}
function nn() {
	return H !== null && !U;
}
function rn(e) {
	let t = tn(8, null);
	return M(t, m), t.teardown = e, t;
}
function an(e) {
	return tn(4 | ee, e);
}
function on(e) {
	xt.ensure();
	let t = tn(64 | S, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? _n(t, () => {
			V(t), n(void 0);
		}) : (V(t), n(void 0));
	});
}
function sn(e) {
	return tn(4, e);
}
function cn(e) {
	return tn(re | S, e);
}
function ln(e, t = 0) {
	return tn(8 | t, e);
}
function un(e, t = [], n = [], r = []) {
	$e(r, t, n, (t) => {
		tn(8, () => {
			e(...t.map(X));
		});
	});
}
function dn(e, t = 0) {
	return tn(16 | t, e);
}
function B(e) {
	return tn(32 | S, e);
}
function fn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = wn, n = H;
		Tn(!0), W(null);
		try {
			t.call(null);
		} finally {
			Tn(e), W(n);
		}
	}
}
function pn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Je(() => {
			e.abort(de);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : V(n, t), n = r;
	}
}
function mn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || V(t), t = n;
	}
}
function V(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (hn(e.nodes.start, e.nodes.end), n = !0), e.f |= b, pn(e, t && !n), Rn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	fn(e), e.f ^= b, e.f |= v;
	var i = e.parent;
	i !== null && i.first !== null && gn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function hn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Jt(e);
		e.remove(), e = n;
	}
}
function gn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function _n(e, t, n = !0) {
	var r = [];
	vn(e, r, !0);
	var i = () => {
		n && V(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function vn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= _;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				vn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function yn(e) {
	bn(e, !0);
}
function bn(e, t) {
	if (e.f & 8192) {
		e.f ^= _, e.f & 1024 || (M(e, h), xt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			bn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function xn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ Jt(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var Sn = null, Cn = !1, wn = !1;
function Tn(e) {
	wn = e;
}
var H = null, U = !1;
function W(e) {
	H = e;
}
var G = null;
function K(e) {
	G = e;
}
var En = null;
function Dn(e) {
	H !== null && (En ??= /* @__PURE__ */ new Set()).add(e);
}
var q = null, J = 0, Y = null;
function On(e) {
	Y = e;
}
var kn = 1, An = 0, jn = An;
function Mn(e) {
	jn = e;
}
function Nn() {
	return ++kn;
}
function Pn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~C), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Pn(a) && lt(a), a.wv > e.wv) return !0;
		}
		t & 512 && P === null && M(e, m);
	}
	return !1;
}
function Fn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(En !== null && En.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Fn(a, t, !1) : t === a && (n ? M(a, h) : a.f & 1024 && M(a, g), Dt(a));
	}
}
function In(e) {
	var t = q, n = J, r = Y, i = H, a = En, o = A, s = U, c = jn, l = e.f;
	q = null, J = 0, Y = null, H = l & 96 ? null : e, En = null, Pe(e.ctx), U = !1, jn = ++An, e.ac !== null && (Je(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= y;
		var f = e.deps, p = N?.is_fork;
		if (q !== null) {
			var m;
			if (p || Rn(e, J), f !== null && J > 0) for (f.length = J + q.length, m = 0; m < q.length; m++) f[J + m] = q[m];
			else e.deps = f = q;
			if (nn() && e.f & 512) for (m = J; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && J < f.length && (Rn(e, J), f.length = J);
		if (Le() && Y !== null && !U && f !== null && !(e.f & 6146)) for (m = 0; m < Y.length; m++) Fn(Y[m], e);
		if (i !== null && i !== e) {
			if (An++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = An;
			if (t !== null) for (let e of t) e.rv = An;
			Y !== null && (r === null ? r = Y : r.push(...Y));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (e) {
		return Be(e);
	} finally {
		e.f ^= ne, q = t, J = n, Y = r, H = i, En = a, Pe(o), U = s, jn = c;
	}
}
function Ln(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (q === null || !n.call(q, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~C), s.v !== T && Ue(s), s.ac !== null && Je(() => {
			s.ac.abort(de), s.ac = null;
		}), ut(s), Rn(s, 0);
	}
}
function Rn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Ln(e, n[r]);
}
function zn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		M(e, m);
		var n = G, r = Cn;
		G = e, Cn = (t & 96) == 0;
		try {
			t & 16777232 ? mn(e) : pn(e), fn(e);
			var i = In(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = kn;
		} finally {
			Cn = r, G = n;
		}
	}
}
function X(e) {
	var t = (e.f & 2) != 0;
	if (Sn?.add(e), H !== null && !U && !(G !== null && G.f & 16384) && (En === null || !En.has(e))) {
		var r = H.deps;
		if (H.f & 2097152) e.rv < An && (e.rv = An, q === null && r !== null && r[J] === e ? J++ : q === null ? q = [e] : q.push(e));
		else {
			H.deps ??= [], n.call(H.deps, e) || H.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [H] : n.call(i, H) || i.push(H);
		}
	}
	if (wn && jt.has(e)) return jt.get(e);
	if (t) {
		var a = e;
		if (wn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Vn(a)) && (o = ct(a)), jt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !U && H !== null && (Cn || (H.f & 512) != 0), c = (a.f & y) === 0;
		Pn(a) && (s && (a.f |= 512), lt(a)), s && !c && (dt(a), Bn(a));
	}
	if (P?.has(e)) return P.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Bn(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (dt(t), Bn(t));
}
function Vn(e) {
	if (e.v === T) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (jt.has(t) || t.f & 2 && Vn(t)) return !0;
	return !1;
}
function Hn(e) {
	var t = U;
	try {
		return U = !0, e();
	} finally {
		U = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Un = ["touchstart", "touchmove"];
function Wn(e) {
	return Un.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Gn = Symbol("events"), Kn = /* @__PURE__ */ new Set(), qn = /* @__PURE__ */ new Set();
function Jn(e) {
	if (!E) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Yn(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || $n.call(t, e), !e.cancelBubble) return Je(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? j(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Xn(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Yn(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && rn(() => {
		t.removeEventListener(e, o, a);
	});
}
function Z(e, t, n) {
	(t[Gn] ??= {})[e] = n;
}
function Zn(e) {
	for (var t = 0; t < e.length; t++) Kn.add(e[t]);
	for (var n of qn) n(e);
}
var Qn = null;
function $n(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Qn = e;
	var s = 0, c = Qn === e && e[Gn];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Gn] = t;
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
		var d = H, f = G;
		W(null), K(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Gn]?.[r];
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
			e[Gn] = t, delete e.currentTarget, W(d), K(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var er = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function tr(e) {
	return er?.createHTML(e) ?? e;
}
function nr(e) {
	var t = Qt("template");
	return t.innerHTML = tr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function rr(e, t) {
	var n = G;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Q(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (E) return rr(D, null), D;
		i === void 0 && (i = nr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ qt(i)));
		var t = r || Ut ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ qt(t), s = t.lastChild;
			rr(o, s);
		} else rr(t, t);
		return t;
	};
}
function $(e, t) {
	if (E) {
		var n = G;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = D), De();
		return;
	}
	e !== null && e.before(t);
}
function ir(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[le] ??= e.nodeValue) && (e[le] = n, e.nodeValue = `${n}`);
}
function ar(e, t) {
	return sr(e, t);
}
var or = /* @__PURE__ */ new Map();
function sr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Kt();
	var l = void 0, u = on(() => {
		var s = n ?? t.appendChild(L());
		Ze(s, { pending: () => {} }, (t) => {
			Fe({});
			var n = A;
			if (o && (n.c = o), a && (i.$$events = a), E && rr(t, null), l = e(t, i) || {}, E && (G.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw Ce(), be;
			Ie();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = Wn(r);
					for (let e of [t, document]) {
						var a = or.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), or.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, $n, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(Kn)), qn.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = or.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, $n), r.delete(e), r.size === 0 && or.delete(n)) : r.set(e, i);
			}
			qn.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return cr.set(l, u), l;
}
var cr = /* @__PURE__ */ new WeakMap(), lr = class {
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
			if (n) yn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (yn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (V(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						xn(r, t), t.append(L()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else V(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), _n(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (V(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = N, r = Zt();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = L();
			i.append(a), this.#n.set(e, {
				effect: B(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, B(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else E && (this.anchor = D), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function ur(e, t, n = !1) {
	var r;
	E && (r = D, De());
	var i = new lr(e), a = n ? x : 0;
	function o(e, t) {
		if (E) {
			var n = Ae(r);
			if (e !== parseInt(n.substring(1))) {
				var a = ke();
				O(a), i.anchor = a, Ee(!1), i.ensure(e, t), Ee(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	dn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
function dr(e, t) {
	return t;
}
function fr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		_n(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					pr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
				}
			} else --s;
		}, !1);
	}
	if (s === 0) {
		var l = i.length === 0 && n !== null;
		if (l) {
			var u = n, d = u.parentNode;
			Xt(d), d.append(u), e.items.clear();
		}
		pr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function pr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= te, xn(a, document.createDocumentFragment())) : V(t[i], n);
	}
}
var mr;
function hr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = E ? O(/* @__PURE__ */ qt(u)) : u.appendChild(L());
	}
	E && De();
	var d = null, f = /* @__PURE__ */ ot(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, _r(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, yr(d, null, c)) : yn(d) : _n(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: dn(() => {
			p = X(f);
			var e = p.length;
			let t = !1;
			E && Ae(c) === "[!" != (e === 0) && (c = ke(), O(c), Ee(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = N, v = Zt(), y = 0; y < e; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (c = D, t = !0, Ee(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Ft(S.v, b), S.i && Ft(S.i, y), v && u.unskip_effect(S.e)) : (S = vr(l, h ? c : mr ??= L(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = B(() => s(c)) : (d = B(() => s(mr ??= L())), d.f |= te)), e > r.size && me("", "", ""), E && e > 0 && O(ke()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Ee(!0), X(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, E && (c = D);
}
function gr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function _r(e, t, n, i, a) {
	var o = (i & 8) != 0, s = t.length, c = e.items, l = gr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (yn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= te, _ === l) yr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), br(e, d, _), br(e, _, y), yr(_, y, n), d = _, p = [], m = [], l = gr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], ee = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) yr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					br(e, S.prev, ee.next), br(e, d, S), br(e, ee, b), l = b, d = ee, --v, p = [], m = [];
				} else u.delete(_), yr(_, l, n), br(e, _.prev, _.next), br(e, _, d === null ? e.effect.first : d.next), br(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = gr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = gr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (pr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var C = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || C.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && C.push(l), l = gr(l.next);
		var ne = C.length;
		if (ne > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < ne; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < ne; v += 1) C[v].nodes?.a?.fix();
			}
			fr(e, C, re);
		}
	}
	o && j(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function vr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Nt(n) : /* @__PURE__ */ Pt(n, !1, !1) : null, l = o & 2 ? Nt(i) : null;
	return {
		v: c,
		i: l,
		e: B(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function yr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ Jt(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function br(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var xr = [..." 	\n\r\f\xA0\v﻿"];
function Sr(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || xr.includes(r[o - 1])) && (s === r.length || xr.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function Cr(e, t, n, r, i, a) {
	var o = e[se];
	if (E || o !== n || o === void 0) {
		var s = Sr(n, r, a);
		(!E || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[se] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function wr(t, n, r = !1) {
	if (t.multiple) {
		if (n == null) return;
		if (!e(n)) return we();
		for (var i of t.options) i.selected = n.includes(Er(i));
		return;
	}
	for (i of t.options) if (Vt(Er(i), n)) {
		i.selected = !0;
		return;
	}
	(!r || n !== void 0) && (t.selectedIndex = -1);
}
function Tr(e) {
	var t = new MutationObserver(() => {
		wr(e, e.__value);
	});
	t.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), rn(() => {
		t.disconnect();
	});
}
function Er(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Dr = Symbol("is custom element"), Or = Symbol("is html"), kr = fe ? "link" : "LINK", Ar = fe ? "progress" : "PROGRESS";
function jr(e) {
	if (E) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Pr(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Pr(e, "checked", null), e.checked = r;
				}
			}
		};
		e[ue] = n, j(n), qe();
	}
}
function Mr(e, t) {
	var n = Fr(e);
	n.value === (n.value = t ?? void 0) || e.value === t && (t !== 0 || e.nodeName !== Ar) || (e.value = t ?? "");
}
function Nr(e, t) {
	var n = Fr(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Pr(e, t, n, r) {
	var i = Fr(e);
	E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === kr) || i[t] !== (i[t] = n) && (t === "loading" && (e[ae] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Lr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Fr(e) {
	return e[oe] ??= {
		[Dr]: e.nodeName.includes("-"),
		[Or]: e.namespaceURI === xe
	};
}
var Ir = /* @__PURE__ */ new Map();
function Lr(e) {
	var t = e.getAttribute("is") || e.nodeName, n = Ir.get(t);
	if (n) return n;
	Ir.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Rr(e, t) {
	return e === t || e?.[w] === t;
}
function zr(e = {}, t, n, r) {
	var i = A.r, a = G;
	return sn(() => {
		var o, s;
		return ln(() => {
			o = s, s = r?.() || [], Hn(() => {
				Rr(n(...s), e) || (t(e, ...s), o && Rr(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Rr(n(...s), e) && t(null, ...s);
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
function Br(e, t) {
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
function Vr(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n);
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
		destroy() {
			window.removeEventListener("message", n);
		}
	};
}
var Hr = (e) => Math.round(e * 100) / 100;
function Ur(e) {
	return e ? typeof e.size == "number" ? e : {
		size: Math.max(2, e.rowHeight ?? 16),
		snap: e.snap !== !1
	} : null;
}
var Wr = {
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
					x: Hr(r.x * 100 / e.columns),
					w: Hr(r.w * 100 / e.columns),
					y: r.y * e.rowHeight,
					h: r.h * e.rowHeight
				});
			}
		}
		return e;
	},
	2: (e) => {
		for (let t of e.sections ?? []) t.grid &&= Ur(t.grid);
		return e;
	}
}, Gr = { 1: (e) => (e.grid = Ur(e.grid) ?? {
	size: 16,
	snap: !0
}, e) };
function Kr(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 2;) {
		let r = Gr[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function qr(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 3;) {
		let i = Wr[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region src/lib/imageTools.js
var Jr = 1600, Yr = .82, Xr = .6;
async function Zr(e) {
	let t = await createImageBitmap(e), n = Math.min(1, Jr / Math.max(t.width, t.height)), r = Math.round(t.width * n), i = Math.round(t.height * n), a = document.createElement("canvas");
	a.width = r, a.height = i, a.getContext("2d").drawImage(t, 0, 0, r, i), t.close();
	let o = (e) => new Promise((t) => a.toBlob(t, "image/webp", e)), s = await o(Yr);
	return s.size > 4e5 && (s = await o(Xr)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(s);
		}),
		bytes: s.size,
		width: r,
		height: i
	};
}
function Qr(e) {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "bilde";
}
function $r(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region src/App.svelte
var ei = /* @__PURE__ */ Q("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), ti = /* @__PURE__ */ Q("<option class=\"svelte-1n46o8q\"> </option>"), ni = /* @__PURE__ */ Q("<select class=\"svelte-1n46o8q\"></select>"), ri = /* @__PURE__ */ Q("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ii = /* @__PURE__ */ Q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\"/> Eget grid i valgt seksjon</label> <!>", 1), ai = /* @__PURE__ */ Q("<span class=\"palette svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Ny tekstblokk\">+ Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Ny knapp\">+ Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Nytt bilde (komprimeres automatisk til webp)\">+ Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <details class=\"gridmenu svelte-1n46o8q\"><summary title=\"Ny form\" class=\"svelte-1n46o8q\">+ Form</summary> <div class=\"gridmenu-body formmenu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">─ Strek</button> <button class=\"ghost svelte-1n46o8q\">→ Pil</button> <button class=\"ghost svelte-1n46o8q\">○ Sirkel</button> <button class=\"ghost svelte-1n46o8q\">▭ Rektangel</button> <button class=\"ghost svelte-1n46o8q\">△ Trekant</button></div></details></span> <details class=\"gridmenu svelte-1n46o8q\"><summary title=\"Grid: rutene blokker snapper til når du drar\" class=\"svelte-1n46o8q\">⌗ Grid</summary> <div class=\"gridmenu-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\"/> Snap til grid</label> <!></div></details>", 1), oi = /* @__PURE__ */ Q("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), si = /* @__PURE__ */ Q("<span> </span>"), ci = /* @__PURE__ */ Q("<span class=\"who svelte-1n46o8q\"> </span>"), li = /* @__PURE__ */ Q("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), ui = /* @__PURE__ */ Q("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), di = /* @__PURE__ */ Q("<iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe>"), fi = /* @__PURE__ */ Q("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), pi = /* @__PURE__ */ Q("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!></div>");
function mi(e, t) {
	Fe(t, !0);
	let n = /* @__PURE__ */ F(null), r = /* @__PURE__ */ F(null), i = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(""), o = /* @__PURE__ */ F("info"), s = 0;
	function c(e, t = "info") {
		I(a, e, !0), I(o, t, !0);
		let n = ++s;
		t === "ok" && setTimeout(() => {
			s === n && (I(a, ""), I(o, "info"));
		}, 8e3);
	}
	let l = /* @__PURE__ */ F(null), u = /* @__PURE__ */ F(null), d = /* @__PURE__ */ F(zt({
		size: 16,
		snap: !0
	})), f = /* @__PURE__ */ F(!0), p = null, m = null, h = null, g = () => X(n).pages.find((e) => e.id === X(r));
	function _() {
		let e = X(n)?.pages?.some((e) => localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		I(i, e || p?.hasDraft() || m?.hasDraft() || !1, !0);
	}
	let v = [], y = [], b = null;
	function x() {
		return JSON.stringify({
			page: p.data,
			site: m.data
		});
	}
	function S(e) {
		e === b && (e.startsWith("edit:") || e === "grid") || (v.push(x()), v.length > 50 && v.shift(), y.length = 0, b = e);
	}
	function ee(e) {
		let { page: t, site: n } = JSON.parse(e);
		p.replace(t), m.replace(n), p.save(), m.save(), I(d, {
			snap: !0,
			...m.data.grid
		}, !0), _(), h?.sendSite(m.data), h?.sendPage(X(r), p.data);
	}
	function te() {
		v.length && (y.push(x()), ee(v.pop()), b = null, c("Angret"));
	}
	function C() {
		y.length && (v.push(x()), ee(y.pop()), b = null, c("Gjentatt"));
	}
	function ne(e) {
		if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
		let t = e.target;
		t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range"
		].includes(t.type)) || (e.preventDefault(), e.shiftKey ? C() : te());
	}
	async function re() {
		I(n, Kr(await (await fetch("/content/site.json")).json()), !0), m = Br("urd-draft-site", () => X(n)), m.replace(Kr(m.data)), m.save(), I(d, {
			snap: !0,
			...m.data.grid
		}, !0), await me(new URLSearchParams(location.search).get("page") ?? X(n).pages[0].id), await fe();
	}
	let ie = /* @__PURE__ */ F(!1), w = /* @__PURE__ */ F(null), ae = /* @__PURE__ */ F(null);
	function oe(e) {
		I(w, e.sectionId, !0);
		let t = p?.data.sections.find((t) => t.id === e.sectionId);
		I(ae, t?.grid ? { ...t.grid } : null, !0);
	}
	function se() {
		return p.data.sections.find((e) => e.id === X(w)) ?? p.data.sections[0];
	}
	function ce(e) {
		let t = p.data.sections.find((e) => e.id === X(w));
		t && (S("grid"), t.grid = e ? { ...m.data.grid } : null, I(ae, t.grid ? { ...t.grid } : null, !0), p.save(), _(), h?.sendSection(X(r), t), X(ie) && h?.sendShowGrid(!0));
	}
	function le(e, t) {
		let n = p.data.sections.find((e) => e.id === X(w));
		n?.grid && (S("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, I(ae, { ...n.grid }, !0), p.save(), _(), h?.sendSection(X(r), n), X(ie) && h?.sendShowGrid(!0));
	}
	function ue(e, t) {
		S("grid"), I(d, {
			...X(d),
			[e]: t
		}, !0), m.data.grid = {
			...m.data.grid,
			[e]: t
		}, m.save(), _(), h?.sendSite(m.data), X(ie) && h?.sendShowGrid(!0);
	}
	function de(e) {
		I(ie, e.target.open, !0), h?.sendShowGrid(X(ie));
	}
	async function fe() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(u, await e.json(), !0) : e.status !== 503 && I(u, null);
		} catch {
			I(u, null);
		}
	}
	let pe = null;
	async function me(e) {
		I(r, e, !0), pe = (async () => {
			let t = g(), n = qr(await (await fetch(`/${t.file}`)).json(), m.data);
			p = Br(`urd-draft-${e}`, () => n), p.replace(qr(p.data, m.data)), p.save(), v.length = 0, y.length = 0, b = null, I(w, null), I(ae, null), _(), I(a, "");
		})(), await pe;
	}
	function he() {
		h?.destroy(), h = Vr(X(l), {
			onEdit: ye,
			onMove: be,
			onDelete: we,
			onAddSection: T,
			onMoveSection: xe,
			onDeleteSection: Se,
			onSectionSize: Ce,
			onUndo: (e) => e.redo ? C() : te(),
			onSelectSection: oe,
			onReady: ge,
			onNavigate: _e,
			onAddBlock: (e) => D(e.sectionId, e.block)
		});
	}
	async function ge() {
		await pe, m.hasDraft() && h?.sendSite(m.data), p.hasDraft() && h?.sendPage(X(r), p.data), X(f) || h?.sendChrome(!1), X(ie) && h?.sendShowGrid(!0);
	}
	function _e(e) {
		let t = e.path.replace(/\/$/, "") || "/", i = X(n).pages.find((e) => e.path === t);
		i && i.id !== X(r) && me(i.id);
	}
	function ve() {
		I(f, !X(f)), h?.sendChrome(X(f));
	}
	function ye(e) {
		let t = p.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (S(`edit:${e.blockId}`), t.props = e.props, p.save(), _(), I(a, ""));
	}
	function be(e) {
		let t = p.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (S(e.coalesce ? `edit:${e.blockId}` : "move-block"), t.frames.desktop = e.frame, p.save(), _());
	}
	function T(e) {
		S("add-section"), p.data.sections.splice(e.index, 0, e.section), p.save(), _(), h?.sendPage(X(r), p.data);
	}
	function xe(e) {
		let t = p.data.sections, n = t.findIndex((t) => t.id === e.sectionId), i = n + e.dir;
		n < 0 || i < 0 || i >= t.length || (S("move-section"), [t[n], t[i]] = [t[i], t[n]], p.save(), _(), h?.sendPage(X(r), p.data));
	}
	function Se(e) {
		S("delete-section"), e.sectionId === X(w) && (I(w, null), I(ae, null)), p.data.sections = p.data.sections.filter((t) => t.id !== e.sectionId), p.save(), _(), h?.sendPage(X(r), p.data);
	}
	function Ce(e) {
		let t = p.data.sections.find((t) => t.id === e.sectionId);
		t && (S("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, p.save(), _());
	}
	function we(e) {
		let t = p.data.sections.find((t) => t.id === e.sectionId);
		t && (S("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), p.save(), _(), h?.sendSection(X(r), t));
	}
	let Te = {
		text: {
			type: "text",
			props: {
				html: "<p>Ny tekst</p>",
				align: "left"
			},
			w: 33,
			h: 28
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
	function E(e) {
		let t = Te[e];
		return {
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: t.type,
			version: 1,
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
	function Ee(e) {
		h ? h.sendPlaceBlock(e) : D(se()?.id, e);
	}
	function D(e, t) {
		let n = p.data.sections.find((t) => t.id === e) ?? p.data.sections[0];
		n && (S("add-block"), n.blocks.push(t), p.save(), _(), h?.sendSection(X(r), n));
	}
	function O(e, t) {
		Ee(E(e)), t?.target.closest("details")?.removeAttribute("open");
	}
	async function De(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		c("Komprimerer bildet…");
		let n;
		try {
			n = await Zr(t);
		} catch {
			c("Kunne ikke lese bildet (prøv jpg/png/webp)", "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (X(l)?.clientWidth ?? 1280));
		Ee({
			id: `blk-${crypto.randomUUID().slice(0, 8)}`,
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: Qr(t.name).replaceAll("-", " "),
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
	function ke(e) {
		let t = [];
		for (let n of e.sections) for (let e of n.blocks) {
			if (e.type !== "image" || !e.props.src?.startsWith("data:image/")) continue;
			let n = e.props.src.split(",", 2)[1], r = `media/${Qr(e.props.alt || "bilde")}-${$r(n)}.webp`;
			t.push({
				path: r,
				content: n,
				encoding: "base64"
			}), e.props.src = `/${r}`;
		}
		return t;
	}
	function Ae() {
		S("discard");
		let e = p.reset(), t = m.reset();
		I(d, {
			snap: !0,
			...t.grid
		}, !0), _(), I(a, ""), h?.sendSite(t), h?.sendPage(X(r), e);
	}
	async function je() {
		c("Publiserer…");
		let e = [], t = [], a = [];
		for (let i of X(n).pages) {
			let n = `urd-draft-${i.id}`, o = null;
			if (i.id === X(r) && p.hasDraft()) o = p.data;
			else if (i.id !== X(r)) {
				let e = localStorage.getItem(n);
				if (e) try {
					o = qr(JSON.parse(e), m.data);
				} catch {}
			}
			o && (e.push(...ke(o)), e.push({
				path: i.file,
				content: JSON.stringify(o, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), a.push(n));
		}
		p.hasDraft() && p.save(), m.hasDraft() && (e.push({
			path: "content/site.json",
			content: JSON.stringify(m.data, null, 2) + "\n",
			encoding: "utf-8"
		}), a.push("urd-draft-site"));
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
			for (let e of a) localStorage.removeItem(e);
			c("✓ Publisert! Siden bygges på nytt (~1 min)", "ok"), I(i, !1);
		} else if (s?.status === 401) {
			let e = (await s.json().catch(() => null))?.error;
			c(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await fe();
		} else s?.status === 403 ? c((await s.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c(s ? (await s.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	function Me(e) {
		document.querySelectorAll(".topbar details[open]").forEach((t) => {
			(!e || !t.contains(e.target)) && (t.open = !1);
		});
	}
	re();
	var Ne = pi();
	Xn("keydown", Ht, ne), Xn("pointerdown", Ht, Me), Xn("blur", Ht, () => Me());
	var A = R(Ne), Pe = (e) => {
		var t = ei();
		Z("click", t, ve), $(e, t);
	};
	ur(A, (e) => {
		X(f) || e(Pe);
	});
	var Le = z(A, 2);
	let Re;
	var ze = R(Le), j = z(R(ze), 2), Be = (e) => {
		var t = ni();
		hr(t, 21, () => X(n).pages, dr, (e, t) => {
			var n = ti(), r = R(n, !0);
			k(n);
			var i = {};
			un(() => {
				ir(r, X(t).title), i !== (i = X(t).id) && (n.value = (n.__value = X(t).id) ?? "");
			}), $(e, n);
		}), k(t);
		var i;
		Tr(t), un(() => {
			i !== (i = X(r)) && (t.value = (t.__value = X(r)) ?? "", wr(t, X(r)));
		}), Z("change", t, (e) => me(e.target.value)), $(e, t);
	};
	ur(j, (e) => {
		X(n) && e(Be);
	});
	var Ve = z(j, 2), He = (e) => {
		var t = ai(), n = Yt(t), r = R(n), i = z(r, 2), a = z(i, 2), o = z(R(a));
		k(a);
		var s = z(a, 2), c = z(R(s), 2), l = R(c), u = z(l, 2), f = z(u, 2), p = z(f, 2), m = z(p, 2);
		k(c), k(s), k(n);
		var h = z(n, 2), g = z(R(h), 2), _ = R(g), v = z(R(_)), y = R(v);
		k(v), k(_);
		var b = z(_, 2);
		jr(b);
		var x = z(b, 2), S = R(x);
		jr(S), Oe(), k(x);
		var ee = z(x, 2), te = (e) => {
			var t = ii(), n = z(Yt(t), 2), r = R(n);
			jr(r), Oe(), k(n);
			var i = z(n, 2), a = (e) => {
				var t = ri(), n = Yt(t), r = z(R(n)), i = R(r);
				k(r), k(n);
				var a = z(n, 2);
				jr(a), un(() => {
					ir(i, `${X(ae).size ?? ""} px`), Mr(a, X(ae).size);
				}), Z("input", a, (e) => le("size", Number(e.target.value))), $(e, t);
			};
			ur(i, (e) => {
				X(ae) && e(a);
			}), un(() => Nr(r, X(ae) !== null)), Z("change", r, (e) => ce(e.target.checked)), $(e, t);
		};
		ur(ee, (e) => {
			X(w) && e(te);
		}), k(g), k(h), un(() => {
			ir(y, `${X(d).size ?? ""} px`), Mr(b, X(d).size), Nr(S, X(d).snap !== !1);
		}), Z("click", r, () => O("text")), Z("click", i, () => O("button")), Z("change", o, De), Z("click", l, (e) => O("shape-line", e)), Z("click", u, (e) => O("shape-arrow", e)), Z("click", f, (e) => O("shape-circle", e)), Z("click", p, (e) => O("shape-rect", e)), Z("click", m, (e) => O("shape-triangle", e)), Xn("toggle", h, de), Z("input", b, (e) => ue("size", Number(e.target.value))), Z("change", S, (e) => ue("snap", e.target.checked)), $(e, t);
	};
	ur(Ve, (e) => {
		X(n) && e(He);
	});
	var M = z(Ve, 2), Ue = (e) => {
		$(e, oi());
	};
	ur(M, (e) => {
		X(i) && e(Ue);
	});
	var We = z(M, 2), Ge = (e) => {
		var t = si();
		let n;
		var r = R(t, !0);
		k(t), un(() => {
			n = Cr(t, 1, "status svelte-1n46o8q", null, n, {
				ok: X(o) === "ok",
				error: X(o) === "error"
			}), ir(r, X(a));
		}), $(e, t);
	};
	ur(We, (e) => {
		X(a) && e(Ge);
	}), k(ze);
	var Ke = z(ze, 2), qe = R(Ke), Je = (e) => {
		var t = ui(), n = Yt(t), r = R(n, !0);
		k(n);
		var a = z(n, 2), o = (e) => {
			var t = ci(), n = R(t);
			k(t), un(() => {
				Pr(t, "title", X(u).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), ir(n, `${X(u).allowed ? "" : "⚠ "}${X(u).login ?? ""}`);
			}), $(e, t);
		}, s = (e) => {
			$(e, li());
		};
		ur(a, (e) => {
			X(u)?.loggedIn ? e(o) : X(u) && e(s, 1);
		});
		var c = z(a, 2), l = z(c, 2), d = z(l, 2);
		un((e) => {
			Pr(n, "title", X(f) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ir(r, X(f) ? "👁 Ren visning" : "✏ Rediger"), Pr(c, "href", e), l.disabled = !X(i), d.disabled = !X(i);
		}, [() => g().path]), Z("click", n, ve), Z("click", l, Ae), Z("click", d, je), $(e, t);
	};
	ur(qe, (e) => {
		X(n) && e(Je);
	}), k(Ke), k(Le);
	var Ye = z(Le, 2), Xe = (e) => {
		var t = di();
		zr(t, (e) => I(l, e), () => X(l)), un(() => Pr(t, "src", `/?page=${X(r)}&preview=1`)), Xn("load", t, he), Jn(t), $(e, t);
	}, Ze = (e) => {
		$(e, fi());
	};
	ur(Ye, (e) => {
		X(n) ? e(Xe) : e(Ze, -1);
	}), k(Ne), un(() => Re = Cr(Le, 1, "topbar svelte-1n46o8q", null, Re, { hidden: !X(f) })), $(e, Ne), Ie();
}
Zn([
	"click",
	"change",
	"input"
]);
//#endregion
//#region src/main.js
var hi = ar(mi, { target: document.getElementById("urd-admin") });
//#endregion
export { hi as default };
