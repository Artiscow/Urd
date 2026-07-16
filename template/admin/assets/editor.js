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
var m = 1024, h = 2048, g = 4096, _ = 8192, v = 16384, y = 32768, b = 1 << 25, x = 65536, S = 1 << 19, ee = 1 << 20, te = 1 << 25, C = 65536, w = 1 << 21, T = 1 << 22, ne = 1 << 23, re = Symbol("$state"), ie = Symbol(""), ae = Symbol("attributes"), oe = Symbol("class"), se = Symbol("style"), ce = Symbol("text"), le = Symbol("form reset"), ue = new class extends Error {
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
var ye = {}, E = Symbol("uninitialized"), be = "http://www.w3.org/1999/xhtml";
function xe() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Se(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ce() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function we() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
var D = !1;
function Te(e) {
	D = e;
}
var O;
function k(e) {
	if (e === null) throw Se(), ye;
	return O = e;
}
function Ee() {
	return k(/* @__PURE__ */ qt(O));
}
function A(e) {
	if (D) {
		if (/* @__PURE__ */ qt(O) !== null) throw Se(), ye;
		O = e;
	}
}
function De(e = 1) {
	if (D) {
		for (var t = e, n = O; t--;) n = /* @__PURE__ */ qt(n);
		O = n;
	}
}
function Oe(e = !0) {
	for (var t = 0, n = O;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ qt(n);
		e && n.remove(), n = i;
	}
}
function ke(e) {
	if (!e || e.nodeType !== 8) throw Se(), ye;
	return e.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
function Ae(e) {
	return e === this.v;
}
function je(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Me(e) {
	return !je(e, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
var j = null;
function Ne(e) {
	j = e;
}
function Pe(e, t = !1, n) {
	j = {
		p: j,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: K,
		l: null
	};
}
function Fe(e) {
	var t = j, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) rn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, j = t.p, e ?? {};
}
function Ie() {
	return !0;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
var Le = [];
function Re() {
	var e = Le;
	Le = [], f(e);
}
function M(e) {
	if (Le.length === 0 && !mt) {
		var t = Le;
		queueMicrotask(() => {
			t === Le && Re();
		});
	}
	Le.push(e);
}
function ze(e) {
	var t = K;
	if (t === null) return U.f |= ne, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Be(e, t);
}
function Be(e, t) {
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
var Ve = ~(h | g | m);
function N(e, t) {
	e.f = e.f & Ve | t;
}
function He(e) {
	e.f & 512 || e.deps === null ? N(e, m) : N(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function Ue(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= C, Ue(t.deps));
}
function We(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), Ue(e.deps), N(e, m);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var Ge = !1;
function Ke() {
	Ge || (Ge = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[le]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function qe(e) {
	var t = U, n = K;
	G(null), Tn(null);
	try {
		return e();
	} finally {
		G(t), Tn(n);
	}
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Je(e) {
	let t = 0, n = Mt(0), r;
	return () => {
		tn() && (X(n), cn(() => (t === 0 && (r = Hn(() => e(() => It(n)))), t += 1, () => {
			M(() => {
				--t, t === 0 && (r?.(), r = void 0, It(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ye = x | S;
function Xe(e, t, n, r) {
	new Ze(e, t, n, r);
}
var Ze = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = D ? O : null;
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
	#h = Je(() => (this.#m = Mt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = K;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = K.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = un(() => {
			if (D) {
				let e = this.#t;
				Ee();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, Ye), D && (this.#e = O);
	}
	#g() {
		try {
			this.#a = V(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed;
		t && (this.#s = V(() => {
			t(this.#e, () => e, () => () => {});
		}));
	}
	#v() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = V(() => e(this.#e)), M(() => {
			var e = this.#c = document.createDocumentFragment(), t = R();
			e.append(t), this.#a = this.#x(() => V(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, gn(this.#o, () => {
				this.#o = null;
			}), this.#b(P));
		}));
	}
	#y() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = V(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				bn(this.#a, e);
				let t = this.#n.pending;
				this.#o = V(() => t(this.#e));
			} else this.#b(P);
		} catch (e) {
			this.error(e);
		}
	}
	#b(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		We(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#x(e) {
		var t = K, n = U, r = j;
		Tn(this.#i), G(this.#i), Ne(this.#i.ctx);
		try {
			return bt.ensure(), e();
		} catch (e) {
			return ze(e), null;
		} finally {
			Tn(t), G(n), Ne(r);
		}
	}
	#S(e, t) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#S(e, t);
			return;
		}
		this.#u += e, this.#u === 0 && (this.#b(t), this.#o && gn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null));
	}
	update_pending_count(e, t) {
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, M(() => {
			this.#d = !1, this.#m && Pt(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), X(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		P?.is_fork ? (this.#a && P.skip_effect(this.#a), this.#o && P.skip_effect(this.#o), this.#s && P.skip_effect(this.#s), P.oncommit(() => {
			this.#C(e);
		})) : this.#C(e);
	}
	#C(e) {
		this.#a &&= (H(this.#a), null), this.#o &&= (H(this.#o), null), this.#s &&= (H(this.#s), null), D && (k(this.#t), De(), k(Oe()));
		var t = this.#n.onerror;
		let n = this.#n.failed;
		var r = !1, i = !1;
		let a = () => {
			if (r) {
				we();
				return;
			}
			r = !0, i && ve(), this.#s !== null && gn(this.#s, () => {
				this.#s = null;
			}), this.#x(() => {
				this.#y();
			});
		}, o = (e) => {
			try {
				i = !0, t?.(e, a), i = !1;
			} catch (e) {
				Be(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return V(() => {
						var t = K;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Be(e, this.#i.parent), null;
				}
			}));
		};
		M(() => {
			var t;
			try {
				t = this.transform_error(e);
			} catch (e) {
				Be(e, this.#i && this.#i.parent);
				return;
			}
			typeof t == "object" && t && typeof t.then == "function" ? t.then(o, (e) => Be(e, this.#i && this.#i.parent)) : o(t);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
function Qe(e, t, n, r) {
	let i = Ie() ? nt : at;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = K, c = $e(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Be(e, s);
			}
			et();
		}
	}
	var d = tt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ it(e))).then(u).catch((e) => Be(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), et();
	}) : f();
}
function $e() {
	var e = K, t = U, n = j, r = P;
	return function(i = !0) {
		Tn(e), G(t), Ne(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function et(e = !0) {
	Tn(null), G(null), Ne(null), e && P?.deactivate();
}
function tt() {
	var e = K, t = e.b, n = P, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function nt(e) {
	var t = 2 | h;
	return K !== null && (K.f |= S), {
		ctx: j,
		deps: null,
		effects: null,
		equals: Ae,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: E,
		wv: 0,
		parent: K,
		ac: null
	};
}
var rt = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function it(e, t, n) {
	let r = K;
	r === null && fe();
	var i = void 0, a = Mt(E), o = !U, s = /* @__PURE__ */ new Set();
	return sn(() => {
		var t = K, n = p();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== ue && n.reject(e);
			}).finally(et);
		} catch (e) {
			n.reject(e), et();
		}
		var c = P;
		if (o) {
			if (t.f & 32768) var l = tt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(rt);
			else for (let e of s.values()) e.reject(rt);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== rt && (c.activate(), t ? (a.f |= ne, Pt(a, t)) : (a.f & 8388608 && (a.f ^= ne), Pt(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), nn(() => {
		for (let e of s) e.reject(rt);
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
function at(e) {
	let t = /* @__PURE__ */ nt(e);
	return t.equals = Me, t;
}
function ot(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function st(e) {
	var t, n = K, r = e.parent;
	if (!Cn && r !== null && e.v !== E && r.f & 24576) return xe(), e.v;
	Tn(r);
	try {
		e.f &= ~C, ot(e), t = In(e);
	} finally {
		Tn(n);
	}
	return t;
}
function ct(e) {
	var t = st(e);
	if (!e.equals(t) && (e.wv = Nn(), (!P?.is_fork || e.deps === null) && (P === null ? e.v = t : (P.capture(e, t, !0), ft?.capture(e, t, !0)), e.deps === null))) {
		N(e, m);
		return;
	}
	Cn || (F === null ? He(e) : (tn() || P?.is_fork) && F.set(e, t));
}
function lt(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && qe(() => {
		t.ac.abort(ue), t.ac = null;
	}), t.fn !== null && (t.teardown = d), Rn(t, 0), fn(t));
}
function ut(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && zn(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var dt = null, P = null, ft = null, F = null, pt = null, mt = !1, ht = !1, gt = null, _t = null, vt = 0, yt = 1, bt = class e {
	id = yt++;
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
		dt === null ? dt = this : (dt.#n = this, this.#t = dt), dt = this;
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
			for (var r of n.d) N(r, h), t(r);
			for (r of n.m) N(r, g), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, vt++ > 1e3 && (this.#x(), xt());
		for (let e of this.#u) this.#d.delete(e), N(e, h), this.schedule(e);
		for (let e of this.#d) N(e, g), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = gt = [], r = [], i = _t = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw Ot(e), this.#h() || this.discard(), t;
		}
		if (P = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (gt = null, _t = null, this.#h()) {
			this.#b(r), this.#b(n);
			for (let [e, t] of this.#f) Dt(e, t);
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
		this.#r.clear(), ft = this, Ct(r), Ct(n), ft = null, this.#s?.resolve();
		var s = P;
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), N(i, h), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), P = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) We(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== E && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), F?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		P = this;
	}
	deactivate() {
		P = null, F = null;
	}
	flush() {
		try {
			ht = !0, P = this, this.#g();
		} finally {
			vt = 0, pt = null, gt = null, _t = null, ht = !1, P = null, F = null, At.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(rt);
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
		this.#m || (this.#m = !0, M(() => {
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
			!ht && M(() => {
				t.#e || t.flush();
			});
		}
		return P;
	}
	apply() {
		F = null;
	}
	schedule(e) {
		if (pt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (gt !== null && t === K && (U === null || !(U.f & 2))) return;
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
			e === null || (e.#n = t), t === null ? dt = e : t.#t = e, this.linked = !1;
		}
	}
};
function xt() {
	try {
		me();
	} catch (e) {
		Be(e, pt);
	}
}
var St = null;
function Ct(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && Pn(r) && (St = /* @__PURE__ */ new Set(), zn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && hn(r), St?.size > 0)) {
				At.clear();
				for (let e of St) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) St.has(n) && (St.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || zn(n);
					}
				}
				St.clear();
			}
		}
		St = null;
	}
}
function wt(e, t, n, r) {
	if (!n.has(e) && (n.add(e), e.reactions !== null)) for (let i of e.reactions) {
		let e = i.f;
		e & 2 ? wt(i, t, n, r) : e & 4194320 && !(e & 2048) && Tt(i, t, r) && (N(i, h), Et(i));
	}
}
function Tt(e, t, r) {
	let i = r.get(e);
	if (i !== void 0) return i;
	if (e.deps !== null) for (let i of e.deps) {
		if (n.call(t, i)) return !0;
		if (i.f & 2 && Tt(i, t, r)) return r.set(i, !0), !0;
	}
	return r.set(e, !1), !1;
}
function Et(e) {
	P.schedule(e);
}
function Dt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), N(e, m);
		for (var n = e.first; n !== null;) Dt(n, t), n = n.next;
	}
}
function Ot(e) {
	N(e, m);
	for (var t = e.first; t !== null;) Ot(t), t = t.next;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
var kt = /* @__PURE__ */ new Set(), At = /* @__PURE__ */ new Map(), jt = !1;
function Mt(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Ae,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function I(e, t) {
	let n = Mt(e, t);
	return Dn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Nt(e, t = !1, n = !0) {
	let r = Mt(e);
	return t || (r.equals = Me), r;
}
function L(e, t, n = !1) {
	return U !== null && (!W || U.f & 131072) && Ie() && U.f & 4325394 && (En === null || !En.has(e)) && _e(), Pt(e, n ? Rt(t) : t, _t);
}
function Pt(e, t, n = null) {
	if (!e.equals(t)) {
		At.set(e, Cn ? t : e.v);
		var r = bt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && st(t), F === null && He(t);
		}
		e.wv = Nn(), Lt(e, h, n), Ie() && K !== null && K.f & 1024 && !(K.f & 96) && (Y === null ? On([e]) : Y.push(e)), !r.is_fork && kt.size > 0 && !jt && Ft();
	}
	return t;
}
function Ft() {
	jt = !1;
	for (let e of kt) {
		e.f & 1024 && N(e, g);
		let t;
		try {
			t = Pn(e);
		} catch {
			t = !0;
		}
		t && zn(e);
	}
	kt.clear();
}
function It(e) {
	L(e, e.v + 1);
}
function Lt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ie(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === K)) {
			var l = (c & h) === 0;
			if (l && N(s, t), c & 131072) kt.add(s);
			else if (c & 2) {
				var u = s;
				F?.delete(u), c & 65536 || (c & 512 && (K === null || !(K.f & 2097152)) && (s.f |= C), Lt(u, g, n));
			} else if (l) {
				var d = s;
				c & 16 && St !== null && St.add(d), n === null ? Et(d) : n.push(d);
			}
		}
	}
}
function Rt(t) {
	if (typeof t != "object" || !t || re in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ I(0), u = null, d = jn, f = (e) => {
		if (jn === d) return e();
		var t = U, n = jn;
		G(null), Mn(d);
		var r = e();
		return G(t), Mn(n), r;
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
					let e = f(() => /* @__PURE__ */ I(E, u));
					r.set(t, e), It(o);
				}
			} else L(n, E), It(o);
			return !0;
		},
		get(e, n, i) {
			if (n === re) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ I(Rt(s ? e[n] : E), u)), r.set(n, o)), o !== void 0) {
				var c = X(o);
				return c === E ? void 0 : c;
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
				if (a !== void 0 && o !== E) return {
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
			var n = r.get(t), i = n !== void 0 && n.v !== E || Reflect.has(e, t);
			return (n !== void 0 || K !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ I(i ? Rt(e[t]) : E, u)), r.set(t, n)), X(n) === E) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ I(E, u)), r.set(d + "", p)) : L(p, E);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ I(void 0, u)), L(c, Rt(n)), r.set(t, c));
			else {
				l = c.v !== E;
				var m = f(() => Rt(n));
				L(c, m);
			}
			var h = Reflect.getOwnPropertyDescriptor(e, t);
			if (h?.set && h.set.call(s, n), !l) {
				if (i && typeof t == "string") {
					var g = r.get("length"), _ = Number(t);
					Number.isInteger(_) && _ >= g.v && L(g, _ + 1);
				}
				It(o);
			}
			return !0;
		},
		ownKeys(e) {
			X(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== E;
			});
			for (var [n, i] of r) i.v !== E && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			ge();
		}
	});
}
function zt(e) {
	try {
		if (typeof e == "object" && e && re in e) return e[re];
	} catch {}
	return e;
}
function Bt(e, t) {
	return Object.is(zt(e), zt(t));
}
var Vt, Ht, Ut, Wt;
function Gt() {
	if (Vt === void 0) {
		Vt = window, Ht = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		Ut = a(t, "firstChild").get, Wt = a(t, "nextSibling").get, u(e) && (e[oe] = void 0, e[ae] = null, e[se] = void 0, e.__e = void 0), u(n) && (n[ce] = void 0);
	}
}
function R(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function Kt(e) {
	return Ut.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function qt(e) {
	return Wt.call(e);
}
function z(e, t) {
	if (!D) return /* @__PURE__ */ Kt(e);
	var n = /* @__PURE__ */ Kt(O);
	if (n === null) n = O.appendChild(R());
	else if (t && n.nodeType !== 3) {
		var r = R();
		return n?.before(r), k(r), r;
	}
	return t && Qt(n), k(n), n;
}
function Jt(e, t = !1) {
	if (!D) {
		var n = /* @__PURE__ */ Kt(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ qt(n) : n;
	}
	if (t) {
		if (O?.nodeType !== 3) {
			var r = R();
			return O?.before(r), k(r), r;
		}
		Qt(O);
	}
	return O;
}
function B(e, t = 1, n = !1) {
	let r = D ? O : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ qt(r);
	if (!D) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = R();
			return r === null ? i?.after(a) : r.before(a), k(a), a;
		}
		Qt(r);
	}
	return k(r), r;
}
function Yt(e) {
	e.textContent = "";
}
function Xt() {
	return !1;
}
function Zt(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Qt(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
function $t(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function en(e, t) {
	var n = K;
	n !== null && n.f & 8192 && (e |= _);
	var r = {
		ctx: j,
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
	P?.register_created_effect(r);
	var i = r;
	if (e & 4) gt === null ? bt.ensure().schedule(r) : gt.push(r);
	else if (t !== null) {
		try {
			zn(r);
		} catch (e) {
			throw H(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= x));
	}
	if (i !== null && (i.parent = n, n !== null && $t(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function tn() {
	return U !== null && !W;
}
function nn(e) {
	let t = en(8, null);
	return N(t, m), t.teardown = e, t;
}
function rn(e) {
	return en(4 | ee, e);
}
function an(e) {
	bt.ensure();
	let t = en(64 | S, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? gn(t, () => {
			H(t), n(void 0);
		}) : (H(t), n(void 0));
	});
}
function on(e) {
	return en(4, e);
}
function sn(e) {
	return en(T | S, e);
}
function cn(e, t = 0) {
	return en(8 | t, e);
}
function ln(e, t = [], n = [], r = []) {
	Qe(r, t, n, (t) => {
		en(8, () => {
			e(...t.map(X));
		});
	});
}
function un(e, t = 0) {
	return en(16 | t, e);
}
function V(e) {
	return en(32 | S, e);
}
function dn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Cn, n = U;
		wn(!0), G(null);
		try {
			t.call(null);
		} finally {
			wn(e), G(n);
		}
	}
}
function fn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && qe(() => {
			e.abort(ue);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : H(n, t), n = r;
	}
}
function pn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || H(t), t = n;
	}
}
function H(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (mn(e.nodes.start, e.nodes.end), n = !0), e.f |= b, fn(e, t && !n), Rn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	dn(e), e.f ^= b, e.f |= v;
	var i = e.parent;
	i !== null && i.first !== null && hn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function mn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ qt(e);
		e.remove(), e = n;
	}
}
function hn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function gn(e, t, n = !0) {
	var r = [];
	_n(e, r, !0);
	var i = () => {
		n && H(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function _n(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= _;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = (i.f & 65536) != 0 || (i.f & 32) != 0 && (e.f & 16) != 0;
				_n(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function vn(e) {
	yn(e, !0);
}
function yn(e, t) {
	if (e.f & 8192) {
		e.f ^= _, e.f & 1024 || (N(e, h), bt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = (n.f & 65536) != 0 || (n.f & 32) != 0;
			yn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function bn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ qt(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var xn = null, Sn = !1, Cn = !1;
function wn(e) {
	Cn = e;
}
var U = null, W = !1;
function G(e) {
	U = e;
}
var K = null;
function Tn(e) {
	K = e;
}
var En = null;
function Dn(e) {
	U !== null && (En ??= /* @__PURE__ */ new Set()).add(e);
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
			if (Pn(a) && ct(a), a.wv > e.wv) return !0;
		}
		t & 512 && F === null && N(e, m);
	}
	return !1;
}
function Fn(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(En !== null && En.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? Fn(a, t, !1) : t === a && (n ? N(a, h) : a.f & 1024 && N(a, g), Et(a));
	}
}
function In(e) {
	var t = q, n = J, r = Y, i = U, a = En, o = j, s = W, c = jn, l = e.f;
	q = null, J = 0, Y = null, U = l & 96 ? null : e, En = null, Ne(e.ctx), W = !1, jn = ++An, e.ac !== null && (qe(() => {
		e.ac.abort(ue);
	}), e.ac = null);
	try {
		e.f |= w;
		var u = e.fn, d = u();
		e.f |= y;
		var f = e.deps, p = P?.is_fork;
		if (q !== null) {
			var m;
			if (p || Rn(e, J), f !== null && J > 0) for (f.length = J + q.length, m = 0; m < q.length; m++) f[J + m] = q[m];
			else e.deps = f = q;
			if (tn() && e.f & 512) for (m = J; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && J < f.length && (Rn(e, J), f.length = J);
		if (Ie() && Y !== null && !W && f !== null && !(e.f & 6146)) for (m = 0; m < Y.length; m++) Fn(Y[m], e);
		if (i !== null && i !== e) {
			if (An++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = An;
			if (t !== null) for (let e of t) e.rv = An;
			Y !== null && (r === null ? r = Y : r.push(...Y));
		}
		return e.f & 8388608 && (e.f ^= ne), d;
	} catch (e) {
		return ze(e);
	} finally {
		e.f ^= w, q = t, J = n, Y = r, U = i, En = a, Ne(o), W = s, jn = c;
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
		s.f & 512 && (s.f ^= 512, s.f &= ~C), s.v !== E && He(s), s.ac !== null && qe(() => {
			s.ac.abort(ue), s.ac = null;
		}), lt(s), Rn(s, 0);
	}
}
function Rn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Ln(e, n[r]);
}
function zn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		N(e, m);
		var n = K, r = Sn;
		K = e, Sn = (t & 96) == 0;
		try {
			t & 16777232 ? pn(e) : fn(e), dn(e);
			var i = In(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = kn;
		} finally {
			Sn = r, K = n;
		}
	}
}
function X(e) {
	var t = (e.f & 2) != 0;
	if (xn?.add(e), U !== null && !W && !(K !== null && K.f & 16384) && (En === null || !En.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < An && (e.rv = An, q === null && r !== null && r[J] === e ? J++ : q === null ? q = [e] : q.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (Cn && At.has(e)) return At.get(e);
	if (t) {
		var a = e;
		if (Cn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Vn(a)) && (o = st(a)), At.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !W && U !== null && (Sn || (U.f & 512) != 0), c = (a.f & y) === 0;
		Pn(a) && (s && (a.f |= 512), ct(a)), s && !c && (ut(a), Bn(a));
	}
	if (F?.has(e)) return F.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Bn(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (ut(t), Bn(t));
}
function Vn(e) {
	if (e.v === E) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (At.has(t) || t.f & 2 && Vn(t)) return !0;
	return !1;
}
function Hn(e) {
	var t = W;
	try {
		return W = !0, e();
	} finally {
		W = t;
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
	if (!D) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Yn(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || $n.call(t, e), !e.cancelBubble) return qe(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? M(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Xn(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Yn(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && nn(() => {
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
		var d = U, f = K;
		G(null), Tn(null);
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
			e[Gn] = t, delete e.currentTarget, G(d), Tn(f);
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
	var t = Zt("template");
	return t.innerHTML = tr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function rr(e, t) {
	var n = K;
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
		if (D) return rr(O, null), O;
		i === void 0 && (i = nr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ Kt(i)));
		var t = r || Ht ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ Kt(t), s = t.lastChild;
			rr(o, s);
		} else rr(t, t);
		return t;
	};
}
function $(e, t) {
	if (D) {
		var n = K;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = O), Ee();
		return;
	}
	e !== null && e.before(t);
}
function ir(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[ce] ??= e.nodeValue) && (e[ce] = n, e.nodeValue = `${n}`);
}
function ar(e, t) {
	return sr(e, t);
}
var or = /* @__PURE__ */ new Map();
function sr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Gt();
	var l = void 0, u = an(() => {
		var s = n ?? t.appendChild(R());
		Xe(s, { pending: () => {} }, (t) => {
			Pe({});
			var n = j;
			if (o && (n.c = o), a && (i.$$events = a), D && rr(t, null), l = e(t, i) || {}, D && (K.nodes.end = O, O === null || O.nodeType !== 8 || O.data !== "]")) throw Se(), ye;
			Fe();
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
			if (n) vn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (vn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
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
						bn(r, t), t.append(R()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else H(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), gn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (H(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = P, r = Xt();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = R();
			i.append(a), this.#n.set(e, {
				effect: V(() => t(a)),
				fragment: i
			});
		} else this.#t.set(e, V(() => t(this.anchor)));
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else D && (this.anchor = O), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function ur(e, t, n = !1) {
	var r;
	D && (r = O, Ee());
	var i = new lr(e), a = n ? x : 0;
	function o(e, t) {
		if (D) {
			var n = ke(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Oe();
				k(a), i.anchor = a, Te(!1), i.ensure(e, t), Te(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	un(() => {
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
		gn(n, () => {
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
			Yt(d), d.append(u), e.items.clear();
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
		r?.has(a) ? (a.f |= te, bn(a, document.createDocumentFragment())) : H(t[i], n);
	}
}
var mr;
function hr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = D ? k(/* @__PURE__ */ Kt(u)) : u.appendChild(R());
	}
	D && Ee();
	var d = null, f = /* @__PURE__ */ at(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, _r(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= te, yr(d, null, c)) : vn(d) : gn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: un(() => {
			p = X(f);
			var e = p.length;
			let t = !1;
			D && ke(c) === "[!" != (e === 0) && (c = Oe(), k(c), Te(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = P, v = Xt(), y = 0; y < e; y += 1) {
				D && O.nodeType === 8 && O.data === "]" && (c = O, t = !0, Te(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && Pt(S.v, b), S.i && Pt(S.i, y), v && u.unskip_effect(S.e)) : (S = vr(l, h ? c : mr ??= R(), b, x, y, o, n, i), h || (S.e.f |= te), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = V(() => s(c)) : (d = V(() => s(mr ??= R())), d.f |= te)), e > r.size && pe("", "", ""), D && e > 0 && k(Oe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Te(!0), X(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, D && (c = O);
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
		if (_.f & 8192 && (vn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= te, _ === l) yr(_, null, n);
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
		var w = C.length;
		if (w > 0) {
			var T = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < w; v += 1) C[v].nodes?.a?.measure();
				for (v = 0; v < w; v += 1) C[v].nodes?.a?.fix();
			}
			fr(e, C, T);
		}
	}
	o && M(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function vr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Mt(n) : /* @__PURE__ */ Nt(n, !1, !1) : null, l = o & 2 ? Mt(i) : null;
	return {
		v: c,
		i: l,
		e: V(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function yr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ qt(r);
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
	var o = e[oe];
	if (D || o !== n || o === void 0) {
		var s = Sr(n, r, a);
		(!D || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[oe] = n;
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
		if (!e(n)) return Ce();
		for (var i of t.options) i.selected = n.includes(Er(i));
		return;
	}
	for (i of t.options) if (Bt(Er(i), n)) {
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
	}), nn(() => {
		t.disconnect();
	});
}
function Er(e) {
	return "__value" in e ? e.__value : e.value;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var Dr = Symbol("is custom element"), Or = Symbol("is html"), kr = de ? "link" : "LINK", Ar = de ? "progress" : "PROGRESS";
function jr(e) {
	if (D) {
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
		e[le] = n, M(n), Ke();
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
	D && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === kr) || i[t] !== (i[t] = n) && (t === "loading" && (e[ie] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Lr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Fr(e) {
	return e[ae] ??= {
		[Dr]: e.nodeName.includes("-"),
		[Or]: e.namespaceURI === be
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
	return e === t || e?.[re] === t;
}
function zr(e = {}, t, n, r) {
	var i = j.r, a = K;
	return on(() => {
		var o, s;
		return cn(() => {
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
var ei = /* @__PURE__ */ Q("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), ti = /* @__PURE__ */ Q("<option> </option>"), ni = /* @__PURE__ */ Q("<select class=\"svelte-1n46o8q\"></select>"), ri = /* @__PURE__ */ Q("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), ii = /* @__PURE__ */ Q("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\"/> Eget grid i valgt seksjon</label> <!>", 1), ai = /* @__PURE__ */ Q("<span class=\"palette svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\" title=\"Ny tekstblokk\">+ Tekst</button> <button class=\"ghost svelte-1n46o8q\" title=\"Ny knapp\">+ Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Nytt bilde (komprimeres automatisk til webp)\">+ Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <details class=\"gridmenu svelte-1n46o8q\"><summary title=\"Ny form\" class=\"svelte-1n46o8q\">+ Form</summary> <div class=\"gridmenu-body formmenu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\">─ Strek</button> <button class=\"ghost svelte-1n46o8q\">→ Pil</button> <button class=\"ghost svelte-1n46o8q\">○ Sirkel</button> <button class=\"ghost svelte-1n46o8q\">▭ Rektangel</button> <button class=\"ghost svelte-1n46o8q\">△ Trekant</button></div></details></span> <details class=\"gridmenu svelte-1n46o8q\"><summary title=\"Grid: rutene blokker snapper til når du drar\" class=\"svelte-1n46o8q\">⌗ Grid</summary> <div class=\"gridmenu-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\"/> Snap til grid</label> <!></div></details>", 1), oi = /* @__PURE__ */ Q("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), si = /* @__PURE__ */ Q("<span class=\"who svelte-1n46o8q\"> </span>"), ci = /* @__PURE__ */ Q("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), li = /* @__PURE__ */ Q("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), ui = /* @__PURE__ */ Q("<iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe>"), di = /* @__PURE__ */ Q("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), fi = /* @__PURE__ */ Q("<div class=\"editor svelte-1n46o8q\"><!> <header><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!> <span class=\"status svelte-1n46o8q\"> </span> <span class=\"spacer svelte-1n46o8q\"></span> <!></header> <!></div>");
function pi(e, t) {
	Pe(t, !0);
	let n = /* @__PURE__ */ I(null), r = /* @__PURE__ */ I(null), i = /* @__PURE__ */ I(!1), a = /* @__PURE__ */ I(""), o = /* @__PURE__ */ I(null), s = /* @__PURE__ */ I(null), c = /* @__PURE__ */ I(Rt({
		size: 16,
		snap: !0
	})), l = /* @__PURE__ */ I(!0), u = null, d = null, f = null, p = () => X(n).pages.find((e) => e.id === X(r));
	function m() {
		L(i, u?.hasDraft() || d?.hasDraft() || !1, !0);
	}
	let h = [], g = [], _ = null;
	function v() {
		return JSON.stringify({
			page: u.data,
			site: d.data
		});
	}
	function y(e) {
		e === _ && (e.startsWith("edit:") || e === "grid") || (h.push(v()), h.length > 50 && h.shift(), g.length = 0, _ = e);
	}
	function b(e) {
		let { page: t, site: n } = JSON.parse(e);
		u.replace(t), d.replace(n), u.save(), d.save(), L(c, {
			snap: !0,
			...d.data.grid
		}, !0), m(), f?.sendSite(d.data), f?.sendPage(X(r), u.data);
	}
	function x() {
		h.length && (g.push(v()), b(h.pop()), _ = null, L(a, "Angret"));
	}
	function S() {
		g.length && (h.push(v()), b(g.pop()), _ = null, L(a, "Gjentatt"));
	}
	function ee(e) {
		if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
		let t = e.target;
		t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range"
		].includes(t.type)) || (e.preventDefault(), e.shiftKey ? S() : x());
	}
	async function te() {
		L(n, Kr(await (await fetch("/content/site.json")).json()), !0), d = Br("urd-draft-site", () => X(n)), d.replace(Kr(d.data)), d.save(), L(c, {
			snap: !0,
			...d.data.grid
		}, !0), await ue(new URLSearchParams(location.search).get("page") ?? X(n).pages[0].id), await ce();
	}
	let C = /* @__PURE__ */ I(!1), w = /* @__PURE__ */ I(null), T = /* @__PURE__ */ I(null);
	function ne(e) {
		L(w, e.sectionId, !0);
		let t = u?.data.sections.find((t) => t.id === e.sectionId);
		L(T, t?.grid ? { ...t.grid } : null, !0);
	}
	function re() {
		return u.data.sections.find((e) => e.id === X(w)) ?? u.data.sections[0];
	}
	function ie(e) {
		let t = u.data.sections.find((e) => e.id === X(w));
		t && (y("grid"), t.grid = e ? { ...d.data.grid } : null, L(T, t.grid ? { ...t.grid } : null, !0), u.save(), m(), f?.sendSection(X(r), t), X(C) && f?.sendShowGrid(!0));
	}
	function ae(e, t) {
		let n = u.data.sections.find((e) => e.id === X(w));
		n?.grid && (y("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, L(T, { ...n.grid }, !0), u.save(), m(), f?.sendSection(X(r), n), X(C) && f?.sendShowGrid(!0));
	}
	function oe(e, t) {
		y("grid"), L(c, {
			...X(c),
			[e]: t
		}, !0), d.data.grid = {
			...d.data.grid,
			[e]: t
		}, d.save(), m(), f?.sendSite(d.data), X(C) && f?.sendShowGrid(!0);
	}
	function se(e) {
		L(C, e.target.open, !0), f?.sendShowGrid(X(C));
	}
	async function ce() {
		try {
			let e = await fetch("/api/github/me");
			L(s, e.ok ? await e.json() : null, !0);
		} catch {
			L(s, null);
		}
	}
	let le = null;
	async function ue(e) {
		L(r, e, !0), le = (async () => {
			let t = p(), n = qr(await (await fetch(`/${t.file}`)).json(), d.data);
			u = Br(`urd-draft-${e}`, () => n), u.replace(qr(u.data, d.data)), u.save(), h.length = 0, g.length = 0, _ = null, L(w, null), L(T, null), m(), L(a, "");
		})(), await le;
	}
	function de() {
		f?.destroy(), f = Vr(X(o), {
			onEdit: he,
			onMove: ge,
			onDelete: be,
			onAddSection: _e,
			onMoveSection: ve,
			onDeleteSection: ye,
			onSectionSize: E,
			onUndo: (e) => e.redo ? S() : x(),
			onSelectSection: ne,
			onReady: fe,
			onNavigate: pe,
			onAddBlock: (e) => we(e.sectionId, e.block)
		});
	}
	async function fe() {
		await le, d.hasDraft() && f?.sendSite(d.data), u.hasDraft() && f?.sendPage(X(r), u.data), X(l) || f?.sendChrome(!1), X(C) && f?.sendShowGrid(!0);
	}
	function pe(e) {
		let t = e.path.replace(/\/$/, "") || "/", i = X(n).pages.find((e) => e.path === t);
		i && i.id !== X(r) && ue(i.id);
	}
	function me() {
		L(l, !X(l)), f?.sendChrome(X(l));
	}
	function he(e) {
		let t = u.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (y(`edit:${e.blockId}`), t.props = e.props, u.save(), m(), L(a, ""));
	}
	function ge(e) {
		let t = u.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (y(e.coalesce ? `edit:${e.blockId}` : "move-block"), t.frames.desktop = e.frame, u.save(), m());
	}
	function _e(e) {
		y("add-section"), u.data.sections.splice(e.index, 0, e.section), u.save(), m(), f?.sendPage(X(r), u.data);
	}
	function ve(e) {
		let t = u.data.sections, n = t.findIndex((t) => t.id === e.sectionId), i = n + e.dir;
		n < 0 || i < 0 || i >= t.length || (y("move-section"), [t[n], t[i]] = [t[i], t[n]], u.save(), m(), f?.sendPage(X(r), u.data));
	}
	function ye(e) {
		y("delete-section"), e.sectionId === X(w) && (L(w, null), L(T, null)), u.data.sections = u.data.sections.filter((t) => t.id !== e.sectionId), u.save(), m(), f?.sendPage(X(r), u.data);
	}
	function E(e) {
		let t = u.data.sections.find((t) => t.id === e.sectionId);
		t && (y("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, u.save(), m());
	}
	function be(e) {
		let t = u.data.sections.find((t) => t.id === e.sectionId);
		t && (y("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), u.save(), m(), f?.sendSection(X(r), t));
	}
	let xe = {
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
	function Se(e) {
		let t = xe[e];
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
	function Ce(e) {
		f ? f.sendPlaceBlock(e) : we(re()?.id, e);
	}
	function we(e, t) {
		let n = u.data.sections.find((t) => t.id === e) ?? u.data.sections[0];
		n && (y("add-block"), n.blocks.push(t), u.save(), m(), f?.sendSection(X(r), n));
	}
	function D(e, t) {
		Ce(Se(e)), t?.target.closest("details")?.removeAttribute("open");
	}
	async function Te(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		L(a, "Komprimerer bildet…");
		let n;
		try {
			n = await Zr(t);
		} catch {
			L(a, "Kunne ikke lese bildet (prøv jpg/png/webp).");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (X(o)?.clientWidth ?? 1280));
		Ce({
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
		}), L(a, n.bytes > 4e5 ? `Bildet er stort (${Math.round(n.bytes / 1024)} kB) - vurder et mindre utsnitt.` : "", !0);
	}
	function O(e) {
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
	function k() {
		y("discard");
		let e = u.reset(), t = d.reset();
		L(c, {
			snap: !0,
			...t.grid
		}, !0), m(), L(a, ""), f?.sendSite(t), f?.sendPage(X(r), e);
	}
	async function Ee() {
		L(a, "Publiserer…");
		let e = p(), t = [];
		u.hasDraft() && (t.push(...O(u.data)), u.save(), t.push({
			path: e.file,
			content: JSON.stringify(u.data, null, 2) + "\n",
			encoding: "utf-8"
		})), d.hasDraft() && t.push({
			path: "content/site.json",
			content: JSON.stringify(d.data, null, 2) + "\n",
			encoding: "utf-8"
		});
		let n = {
			message: `Oppdater ${e.title} via Urd-admin`,
			files: t
		}, o = null;
		try {
			o = await fetch("/api/github/commit", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(n)
			});
		} catch {}
		o?.ok ? (localStorage.removeItem(`urd-draft-${X(r)}`), localStorage.removeItem("urd-draft-site"), L(a, "Publisert! Hosten bygger siden på nytt (typisk under ett minutt)."), L(i, !1)) : o?.status === 401 ? (L(a, "Du må logge inn med GitHub for å publisere."), await ce()) : o?.status === 403 ? L(a, (await o.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang.", !0) : o ? L(a, (await o.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp? Se docs/OPPSETT-PUBLISERING.md).", !0) : L(a, "Publisering er ikke tilgjengelig her (krever host med functions, se docs/OPPSETT-PUBLISERING.md).");
	}
	function Oe(e) {
		document.querySelectorAll(".topbar details[open]").forEach((t) => {
			(!e || !t.contains(e.target)) && (t.open = !1);
		});
	}
	te();
	var ke = fi();
	Xn("keydown", Vt, ee), Xn("pointerdown", Vt, Oe), Xn("blur", Vt, () => Oe());
	var Ae = z(ke), je = (e) => {
		var t = ei();
		Z("click", t, me), $(e, t);
	};
	ur(Ae, (e) => {
		X(l) || e(je);
	});
	var Me = B(Ae, 2);
	let j;
	var Ne = B(z(Me), 2), Ie = (e) => {
		var t = ni();
		hr(t, 21, () => X(n).pages, dr, (e, t) => {
			var n = ti(), r = z(n, !0);
			A(n);
			var i = {};
			ln(() => {
				ir(r, X(t).title), i !== (i = X(t).id) && (n.value = (n.__value = X(t).id) ?? "");
			}), $(e, n);
		}), A(t);
		var i;
		Tr(t), ln(() => {
			i !== (i = X(r)) && (t.value = (t.__value = X(r)) ?? "", wr(t, X(r)));
		}), Z("change", t, (e) => ue(e.target.value)), $(e, t);
	};
	ur(Ne, (e) => {
		X(n) && e(Ie);
	});
	var Le = B(Ne, 2), Re = (e) => {
		var t = ai(), n = Jt(t), r = z(n), i = B(r, 2), a = B(i, 2), o = B(z(a));
		A(a);
		var s = B(a, 2), l = B(z(s), 2), u = z(l), d = B(u, 2), f = B(d, 2), p = B(f, 2), m = B(p, 2);
		A(l), A(s), A(n);
		var h = B(n, 2), g = B(z(h), 2), _ = z(g), v = B(z(_)), y = z(v);
		A(v), A(_);
		var b = B(_, 2);
		jr(b);
		var x = B(b, 2), S = z(x);
		jr(S), De(), A(x);
		var ee = B(x, 2), te = (e) => {
			var t = ii(), n = B(Jt(t), 2), r = z(n);
			jr(r), De(), A(n);
			var i = B(n, 2), a = (e) => {
				var t = ri(), n = Jt(t), r = B(z(n)), i = z(r);
				A(r), A(n);
				var a = B(n, 2);
				jr(a), ln(() => {
					ir(i, `${X(T).size ?? ""} px`), Mr(a, X(T).size);
				}), Z("input", a, (e) => ae("size", Number(e.target.value))), $(e, t);
			};
			ur(i, (e) => {
				X(T) && e(a);
			}), ln(() => Nr(r, X(T) !== null)), Z("change", r, (e) => ie(e.target.checked)), $(e, t);
		};
		ur(ee, (e) => {
			X(w) && e(te);
		}), A(g), A(h), ln(() => {
			ir(y, `${X(c).size ?? ""} px`), Mr(b, X(c).size), Nr(S, X(c).snap !== !1);
		}), Z("click", r, () => D("text")), Z("click", i, () => D("button")), Z("change", o, Te), Z("click", u, (e) => D("shape-line", e)), Z("click", d, (e) => D("shape-arrow", e)), Z("click", f, (e) => D("shape-circle", e)), Z("click", p, (e) => D("shape-rect", e)), Z("click", m, (e) => D("shape-triangle", e)), Xn("toggle", h, se), Z("input", b, (e) => oe("size", Number(e.target.value))), Z("change", S, (e) => oe("snap", e.target.checked)), $(e, t);
	};
	ur(Le, (e) => {
		X(n) && e(Re);
	});
	var M = B(Le, 2), ze = (e) => {
		$(e, oi());
	};
	ur(M, (e) => {
		X(i) && e(ze);
	});
	var Be = B(M, 2), Ve = z(Be, !0);
	A(Be);
	var N = B(Be, 4), He = (e) => {
		var t = li(), n = Jt(t), r = z(n, !0);
		A(n);
		var a = B(n, 2), o = (e) => {
			var t = si(), n = z(t);
			A(t), ln(() => {
				Pr(t, "title", X(s).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), ir(n, `${X(s).allowed ? "" : "⚠ "}${X(s).login ?? ""}`);
			}), $(e, t);
		}, c = (e) => {
			$(e, ci());
		};
		ur(a, (e) => {
			X(s)?.loggedIn ? e(o) : X(s) && e(c, 1);
		});
		var u = B(a, 2), d = B(u, 2), f = B(d, 2);
		ln((e) => {
			Pr(n, "title", X(l) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ir(r, X(l) ? "👁 Ren visning" : "✏ Rediger"), Pr(u, "href", e), d.disabled = !X(i), f.disabled = !X(i);
		}, [() => p().path]), Z("click", n, me), Z("click", d, k), Z("click", f, Ee), $(e, t);
	};
	ur(N, (e) => {
		X(n) && e(He);
	}), A(Me);
	var Ue = B(Me, 2), We = (e) => {
		var t = ui();
		zr(t, (e) => L(o, e), () => X(o)), ln(() => Pr(t, "src", `/?page=${X(r)}&preview=1`)), Xn("load", t, de), Jn(t), $(e, t);
	}, Ge = (e) => {
		$(e, di());
	};
	ur(Ue, (e) => {
		X(n) ? e(We) : e(Ge, -1);
	}), A(ke), ln(() => {
		j = Cr(Me, 1, "topbar svelte-1n46o8q", null, j, { hidden: !X(l) }), ir(Ve, X(a));
	}), $(e, ke), Fe();
}
Zn([
	"click",
	"change",
	"input"
]);
//#endregion
//#region src/main.js
var mi = ar(pi, { target: document.getElementById("urd-admin") });
//#endregion
export { mi as default };
