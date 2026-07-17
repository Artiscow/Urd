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
var m = 1024, h = 2048, g = 4096, _ = 8192, v = 16384, y = 32768, ee = 1 << 25, b = 65536, x = 1 << 19, te = 1 << 20, ne = 1 << 25, S = 65536, C = 1 << 21, re = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol(""), se = Symbol("attributes"), w = Symbol("class"), ce = Symbol("style"), le = Symbol("text"), ue = Symbol("form reset"), de = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), T = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
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
	return k(/* @__PURE__ */ Jt(O));
}
function A(e) {
	if (D) {
		if (/* @__PURE__ */ Jt(O) !== null) throw Se(), ye;
		O = e;
	}
}
function De(e = 1) {
	if (D) {
		for (var t = e, n = O; t--;) n = /* @__PURE__ */ Jt(n);
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
		var i = /* @__PURE__ */ Jt(n);
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
		r: G,
		l: null
	};
}
function Fe(e) {
	var t = j, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) an(r);
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
function ze(e) {
	if (Le.length === 0 && !ht) {
		var t = Le;
		queueMicrotask(() => {
			t === Le && Re();
		});
	}
	Le.push(e);
}
function Be(e) {
	var t = G;
	if (t === null) return U.f |= ie, e;
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
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= S, We(t.deps));
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
	var t = U, n = G;
	W(null), En(null);
	try {
		return e();
	} finally {
		W(t), En(n);
	}
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function Ye(e) {
	let t = 0, n = Nt(0), r;
	return () => {
		nn() && (Y(n), ln(() => (t === 0 && (r = Un(() => e(() => Lt(n)))), t += 1, () => {
			ze(() => {
				--t, t === 0 && (r?.(), r = void 0, Lt(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Xe = b | x;
function Ze(e, t, n, r) {
	new Qe(e, t, n, r);
}
var Qe = class {
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
	#h = Ye(() => (this.#m = Nt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = G;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = G.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = un(() => {
			if (D) {
				let e = this.#t;
				Ee();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#v() : this.#g();
			} else this.#y();
		}, Xe), D && (this.#e = O);
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
		e && (this.is_pending = !0, this.#o = V(() => e(this.#e)), ze(() => {
			var e = this.#c = document.createDocumentFragment(), t = L();
			e.append(t), this.#a = this.#x(() => V(() => this.#r(t))), this.#u === 0 && (this.#e.before(e), this.#c = null, gn(this.#o, () => {
				this.#o = null;
			}), this.#b(N));
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
		var t = G, n = U, r = j;
		En(this.#i), W(this.#i), Ne(this.#i.ctx);
		try {
			return xt.ensure(), e();
		} catch (e) {
			return Be(e), null;
		} finally {
			En(t), W(n), Ne(r);
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
		this.#S(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, ze(() => {
			this.#d = !1, this.#m && Ft(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), Y(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		N?.is_fork ? (this.#a && N.skip_effect(this.#a), this.#o && N.skip_effect(this.#o), this.#s && N.skip_effect(this.#s), N.oncommit(() => {
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
				Ve(e, this.#i && this.#i.parent);
			}
			n && (this.#s = this.#x(() => {
				try {
					return V(() => {
						var t = G;
						t.b = this, t.f |= 128, n(this.#e, () => e, () => a);
					});
				} catch (e) {
					return Ve(e, this.#i.parent), null;
				}
			}));
		};
		ze(() => {
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
	let i = Ie() ? rt : ot;
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
	var e = G, t = U, n = j, r = N;
	return function(i = !0) {
		En(e), W(t), Ne(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function tt(e = !0) {
	En(null), W(null), Ne(null), e && N?.deactivate();
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
	return G !== null && (G.f |= x), {
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
		parent: G,
		ac: null
	};
}
var it = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function at(e, t, n) {
	let r = G;
	r === null && fe();
	var i = void 0, a = Nt(E), o = !U, s = /* @__PURE__ */ new Set();
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
	return t.equals = Me, t;
}
function st(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) H(t[n]);
	}
}
function ct(e) {
	var t, n = G, r = e.parent;
	if (!Cn && r !== null && e.v !== E && r.f & 24576) return xe(), e.v;
	En(r);
	try {
		e.f &= ~S, st(e), t = Ln(e);
	} finally {
		En(n);
	}
	return t;
}
function lt(e) {
	var t = ct(e);
	if (!e.equals(t) && (e.wv = Pn(), (!N?.is_fork || e.deps === null) && (N === null ? e.v = t : (N.capture(e, t, !0), pt?.capture(e, t, !0)), e.deps === null))) {
		M(e, m);
		return;
	}
	Cn || (P === null ? Ue(e) : (nn() || N?.is_fork) && P.set(e, t));
}
function ut(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && Je(() => {
		t.ac.abort(de), t.ac = null;
	}), t.fn !== null && (t.teardown = d), zn(t, 0), fn(t));
}
function dt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && Bn(t);
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
				a ? r.f ^= m : i & 4 ? t.push(r) : Fn(r) && (i & 16 && this.#d.add(r), Bn(r));
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
		e.v !== E && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), P?.set(e, t)), this.is_fork || (e.v = t);
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
		this.#m || (this.#m = !0, ze(() => {
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
			!gt && ze(() => {
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
			if (_t !== null && t === G && (U === null || !(U.f & 2))) return;
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
		me();
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
			if (!(r.f & 24576) && Fn(r) && (Ct = /* @__PURE__ */ new Set(), Bn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && hn(r), Ct?.size > 0)) {
				jt.clear();
				for (let e of Ct) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ct.has(n) && (Ct.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || Bn(n);
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
		equals: Ae,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function F(e, t) {
	let n = Nt(e, t);
	return On(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Pt(e, t = !1, n = !0) {
	let r = Nt(e);
	return t || (r.equals = Me), r;
}
function I(e, t, n = !1) {
	return U !== null && (!Tn || U.f & 131072) && Ie() && U.f & 4325394 && (Dn === null || !Dn.has(e)) && _e(), Ft(e, n ? zt(t) : t, vt);
}
function Ft(e, t, n = null) {
	if (!e.equals(t)) {
		jt.set(e, Cn ? t : e.v);
		var r = xt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && ct(t), P === null && Ue(t);
		}
		e.wv = Pn(), Rt(e, h, n), Ie() && G !== null && G.f & 1024 && !(G.f & 96) && (J === null ? kn([e]) : J.push(e)), !r.is_fork && At.size > 0 && !Mt && It();
	}
	return t;
}
function It() {
	Mt = !1;
	for (let e of At) {
		e.f & 1024 && M(e, g);
		let t;
		try {
			t = Fn(e);
		} catch {
			t = !0;
		}
		t && Bn(e);
	}
	At.clear();
}
function Lt(e) {
	I(e, e.v + 1);
}
function Rt(e, t, n) {
	var r = e.reactions;
	if (r !== null) for (var i = Ie(), a = r.length, o = 0; o < a; o++) {
		var s = r[o], c = s.f;
		if (!(!i && s === G)) {
			var l = (c & h) === 0;
			if (l && M(s, t), c & 131072) At.add(s);
			else if (c & 2) {
				var u = s;
				P?.delete(u), c & 65536 || (c & 512 && (G === null || !(G.f & 2097152)) && (s.f |= S), Rt(u, g, n));
			} else if (l) {
				var d = s;
				c & 16 && Ct !== null && Ct.add(d), n === null ? Dt(d) : n.push(d);
			}
		}
	}
}
function zt(t) {
	if (typeof t != "object" || !t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ F(0), u = null, d = Mn, f = (e) => {
		if (Mn === d) return e();
		var t = U, n = Mn;
		W(null), Nn(d);
		var r = e();
		return W(t), Nn(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ F(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && he();
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
					let e = f(() => /* @__PURE__ */ F(E, u));
					r.set(t, e), Lt(o);
				}
			} else I(n, E), Lt(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ F(zt(s ? e[n] : E), u)), r.set(n, o)), o !== void 0) {
				var c = Y(o);
				return c === E ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = Y(i));
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
			if (t === ae) return !0;
			var n = r.get(t), i = n !== void 0 && n.v !== E || Reflect.has(e, t);
			return (n !== void 0 || G !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ F(i ? zt(e[t]) : E, u)), r.set(t, n)), Y(n) === E) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ F(E, u)), r.set(d + "", p)) : I(p, E);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ F(void 0, u)), I(c, zt(n)), r.set(t, c));
			else {
				l = c.v !== E;
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
			Y(o);
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
function Bt(e) {
	try {
		if (typeof e == "object" && e && ae in e) return e[ae];
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
		Wt = a(t, "firstChild").get, Gt = a(t, "nextSibling").get, u(e) && (e[w] = void 0, e[se] = null, e[ce] = void 0, e.__e = void 0), u(n) && (n[le] = void 0);
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
	if (!D) return /* @__PURE__ */ qt(e);
	var n = /* @__PURE__ */ qt(O);
	if (n === null) n = O.appendChild(L());
	else if (t && n.nodeType !== 3) {
		var r = L();
		return n?.before(r), k(r), r;
	}
	return t && $t(n), k(n), n;
}
function Yt(e, t = !1) {
	if (!D) {
		var n = /* @__PURE__ */ qt(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Jt(n) : n;
	}
	if (t) {
		if (O?.nodeType !== 3) {
			var r = L();
			return O?.before(r), k(r), r;
		}
		$t(O);
	}
	return O;
}
function z(e, t = 1, n = !1) {
	let r = D ? O : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ Jt(r);
	if (!D) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = L();
			return r === null ? i?.after(a) : r.before(a), k(a), a;
		}
		$t(r);
	}
	return k(r), r;
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
	N?.register_created_effect(r);
	var i = r;
	if (e & 4) _t === null ? xt.ensure().schedule(r) : _t.push(r);
	else if (t !== null) {
		try {
			Bn(r);
		} catch (e) {
			throw H(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= b));
	}
	if (i !== null && (i.parent = n, n !== null && en(i, n), U !== null && U.f & 2 && !(e & 64))) {
		var a = U;
		(a.effects ??= []).push(i);
	}
	return r;
}
function nn() {
	return U !== null && !Tn;
}
function rn(e) {
	let t = tn(8, null);
	return M(t, m), t.teardown = e, t;
}
function an(e) {
	return tn(4 | te, e);
}
function on(e) {
	xt.ensure();
	let t = tn(64 | x, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? gn(t, () => {
			H(t), n(void 0);
		}) : (H(t), n(void 0));
	});
}
function sn(e) {
	return tn(4, e);
}
function cn(e) {
	return tn(re | x, e);
}
function ln(e, t = 0) {
	return tn(8 | t, e);
}
function B(e, t = [], n = [], r = []) {
	$e(r, t, n, (t) => {
		tn(8, () => {
			e(...t.map(Y));
		});
	});
}
function un(e, t = 0) {
	return tn(16 | t, e);
}
function V(e) {
	return tn(32 | x, e);
}
function dn(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Cn, n = U;
		wn(!0), W(null);
		try {
			t.call(null);
		} finally {
			wn(e), W(n);
		}
	}
}
function fn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && Je(() => {
			e.abort(de);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (mn(e.nodes.start, e.nodes.end), n = !0), e.f |= ee, fn(e, t && !n), zn(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	dn(e), e.f ^= ee, e.f |= v;
	var i = e.parent;
	i !== null && i.first !== null && hn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function mn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ Jt(e);
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
		e.f ^= _, e.f & 1024 || (M(e, h), xt.ensure().schedule(e));
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
		var i = n === r ? null : /* @__PURE__ */ Jt(n);
		t.append(n), n = i;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
var xn = null, Sn = !1, Cn = !1;
function wn(e) {
	Cn = e;
}
var U = null, Tn = !1;
function W(e) {
	U = e;
}
var G = null;
function En(e) {
	G = e;
}
var Dn = null;
function On(e) {
	U !== null && (Dn ??= /* @__PURE__ */ new Set()).add(e);
}
var K = null, q = 0, J = null;
function kn(e) {
	J = e;
}
var An = 1, jn = 0, Mn = jn;
function Nn(e) {
	Mn = e;
}
function Pn() {
	return ++An;
}
function Fn(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~S), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (Fn(a) && lt(a), a.wv > e.wv) return !0;
		}
		t & 512 && P === null && M(e, m);
	}
	return !1;
}
function In(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Dn !== null && Dn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? In(a, t, !1) : t === a && (n ? M(a, h) : a.f & 1024 && M(a, g), Dt(a));
	}
}
function Ln(e) {
	var t = K, n = q, r = J, i = U, a = Dn, o = j, s = Tn, c = Mn, l = e.f;
	K = null, q = 0, J = null, U = l & 96 ? null : e, Dn = null, Ne(e.ctx), Tn = !1, Mn = ++jn, e.ac !== null && (Je(() => {
		e.ac.abort(de);
	}), e.ac = null);
	try {
		e.f |= C;
		var u = e.fn, d = u();
		e.f |= y;
		var f = e.deps, p = N?.is_fork;
		if (K !== null) {
			var m;
			if (p || zn(e, q), f !== null && q > 0) for (f.length = q + K.length, m = 0; m < K.length; m++) f[q + m] = K[m];
			else e.deps = f = K;
			if (nn() && e.f & 512) for (m = q; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && q < f.length && (zn(e, q), f.length = q);
		if (Ie() && J !== null && !Tn && f !== null && !(e.f & 6146)) for (m = 0; m < J.length; m++) In(J[m], e);
		if (i !== null && i !== e) {
			if (jn++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = jn;
			if (t !== null) for (let e of t) e.rv = jn;
			J !== null && (r === null ? r = J : r.push(...J));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (e) {
		return Be(e);
	} finally {
		e.f ^= C, K = t, q = n, J = r, U = i, Dn = a, Ne(o), Tn = s, Mn = c;
	}
}
function Rn(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (K === null || !n.call(K, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~S), s.v !== E && Ue(s), s.ac !== null && Je(() => {
			s.ac.abort(de), s.ac = null;
		}), ut(s), zn(s, 0);
	}
}
function zn(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) Rn(e, n[r]);
}
function Bn(e) {
	var t = e.f;
	if (!(t & 16384)) {
		M(e, m);
		var n = G, r = Sn;
		G = e, Sn = (t & 96) == 0;
		try {
			t & 16777232 ? pn(e) : fn(e), dn(e);
			var i = Ln(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = An;
		} finally {
			Sn = r, G = n;
		}
	}
}
function Y(e) {
	var t = (e.f & 2) != 0;
	if (xn?.add(e), U !== null && !Tn && !(G !== null && G.f & 16384) && (Dn === null || !Dn.has(e))) {
		var r = U.deps;
		if (U.f & 2097152) e.rv < jn && (e.rv = jn, K === null && r !== null && r[q] === e ? q++ : K === null ? K = [e] : K.push(e));
		else {
			U.deps ??= [], n.call(U.deps, e) || U.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [U] : n.call(i, U) || i.push(U);
		}
	}
	if (Cn && jt.has(e)) return jt.get(e);
	if (t) {
		var a = e;
		if (Cn) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || Hn(a)) && (o = ct(a)), jt.set(a, o), o;
		}
		var s = (a.f & 512) == 0 && !Tn && U !== null && (Sn || (U.f & 512) != 0), c = (a.f & y) === 0;
		Fn(a) && (s && (a.f |= 512), lt(a)), s && !c && (dt(a), Vn(a));
	}
	if (P?.has(e)) return P.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function Vn(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (dt(t), Vn(t));
}
function Hn(e) {
	if (e.v === E) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (jt.has(t) || t.f & 2 && Hn(t)) return !0;
	return !1;
}
function Un(e) {
	var t = Tn;
	try {
		return Tn = !0, e();
	} finally {
		Tn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Wn = ["touchstart", "touchmove"];
function Gn(e) {
	return Wn.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var Kn = Symbol("events"), qn = /* @__PURE__ */ new Set(), Jn = /* @__PURE__ */ new Set();
function Yn(e) {
	if (!D) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Xn(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || er.call(t, e), !e.cancelBubble) return Je(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? ze(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function Zn(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Xn(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && rn(() => {
		t.removeEventListener(e, o, a);
	});
}
function X(e, t, n) {
	(t[Kn] ??= {})[e] = n;
}
function Qn(e) {
	for (var t = 0; t < e.length; t++) qn.add(e[t]);
	for (var n of Jn) n(e);
}
var $n = null;
function er(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	$n = e;
	var s = 0, c = $n === e && e[Kn];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[Kn] = t;
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
		var d = U, f = G;
		W(null), En(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[Kn]?.[r];
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
			e[Kn] = t, delete e.currentTarget, W(d), En(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var tr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function nr(e) {
	return tr?.createHTML(e) ?? e;
}
function rr(e) {
	var t = Qt("template");
	return t.innerHTML = nr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function ir(e, t) {
	var n = G;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function Z(e, t) {
	var n = (t & 1) != 0, r = (t & 2) != 0, i, a = !e.startsWith("<!>");
	return () => {
		if (D) return ir(O, null), O;
		i === void 0 && (i = rr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ qt(i)));
		var t = r || Ut ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ qt(t), s = t.lastChild;
			ir(o, s);
		} else ir(t, t);
		return t;
	};
}
function Q(e, t) {
	if (D) {
		var n = G;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = O), Ee();
		return;
	}
	e !== null && e.before(t);
}
function ar(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[le] ??= e.nodeValue) && (e[le] = n, e.nodeValue = `${n}`);
}
function or(e, t) {
	return cr(e, t);
}
var sr = /* @__PURE__ */ new Map();
function cr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	Kt();
	var l = void 0, u = on(() => {
		var s = n ?? t.appendChild(L());
		Ze(s, { pending: () => {} }, (t) => {
			Pe({});
			var n = j;
			if (o && (n.c = o), a && (i.$$events = a), D && ir(t, null), l = e(t, i) || {}, D && (G.nodes.end = O, O === null || O.nodeType !== 8 || O.data !== "]")) throw Se(), ye;
			Fe();
		}, c);
		var u = /* @__PURE__ */ new Set(), d = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!u.has(r)) {
					u.add(r);
					var i = Gn(r);
					for (let e of [t, document]) {
						var a = sr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), sr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, er, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return d(r(qn)), Jn.add(d), () => {
			for (var e of u) for (let n of [t, document]) {
				var r = sr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, er), r.delete(e), r.size === 0 && sr.delete(n)) : r.set(e, i);
			}
			Jn.delete(d), s !== n && s.parentNode?.removeChild(s);
		};
	});
	return lr.set(l, u), l;
}
var lr = /* @__PURE__ */ new WeakMap(), ur = class {
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
						bn(r, t), t.append(L()), this.#n.set(e, {
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
		var n = N, r = Zt();
		if (t && !this.#t.has(e) && !this.#n.has(e)) if (r) {
			var i = document.createDocumentFragment(), a = L();
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
function $(e, t, n = !1) {
	var r;
	D && (r = O, Ee());
	var i = new ur(e), a = n ? b : 0;
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
		r?.has(a) ? (a.f |= ne, bn(a, document.createDocumentFragment())) : H(t[i], n);
	}
}
var mr;
function hr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = D ? k(/* @__PURE__ */ qt(u)) : u.appendChild(L());
	}
	D && Ee();
	var d = null, f = /* @__PURE__ */ ot(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, _r(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ne, yr(d, null, c)) : vn(d) : gn(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: un(() => {
			p = Y(f);
			var e = p.length;
			let t = !1;
			D && ke(c) === "[!" != (e === 0) && (c = Oe(), k(c), Te(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = N, v = Zt(), y = 0; y < e; y += 1) {
				D && O.nodeType === 8 && O.data === "]" && (c = O, t = !0, Te(!1));
				var ee = p[y], b = a(ee, y), x = h ? null : l.get(b);
				x ? (x.v && Ft(x.v, ee), x.i && Ft(x.i, y), v && u.unskip_effect(x.e)) : (x = vr(l, h ? c : mr ??= L(), ee, b, y, o, n, i), h || (x.e.f |= ne), l.set(b, x)), r.add(b);
			}
			if (e === 0 && s && !d && (h ? d = V(() => s(c)) : (d = V(() => s(mr ??= L())), d.f |= ne)), e > r.size && pe("", "", ""), D && e > 0 && k(Oe()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && Te(!0), Y(f);
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
		if (_.f & 8192 && (vn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= ne, _ === l) yr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), br(e, d, _), br(e, _, y), yr(_, y, n), d = _, p = [], m = [], l = gr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var ee = m[0], b;
					d = ee.prev;
					var x = p[0], te = p[p.length - 1];
					for (b = 0; b < p.length; b += 1) yr(p[b], ee, n);
					for (b = 0; b < m.length; b += 1) u.delete(m[b]);
					br(e, x.prev, te.next), br(e, d, x), br(e, te, ee), l = ee, d = te, --v, p = [], m = [];
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
		var S = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || S.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && S.push(l), l = gr(l.next);
		var C = S.length;
		if (C > 0) {
			var re = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < C; v += 1) S[v].nodes?.a?.measure();
				for (v = 0; v < C; v += 1) S[v].nodes?.a?.fix();
			}
			fr(e, S, re);
		}
	}
	o && ze(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function vr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Nt(n) : /* @__PURE__ */ Pt(n, !1, !1) : null, l = o & 2 ? Nt(i) : null;
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
	var o = e[w];
	if (D || o !== n || o === void 0) {
		var s = Sr(n, r, a);
		(!D || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[w] = n;
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
var Dr = Symbol("is custom element"), Or = Symbol("is html"), kr = T ? "link" : "LINK", Ar = T ? "progress" : "PROGRESS";
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
		e[ue] = n, ze(n), qe();
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
	D && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === kr) || i[t] !== (i[t] = n) && (t === "loading" && (e[oe] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Lr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Fr(e) {
	return e[se] ??= {
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
	return e === t || e?.[ae] === t;
}
function zr(e = {}, t, n, r) {
	var i = j.r, a = G;
	return sn(() => {
		var o, s;
		return ln(() => {
			o = s, s = r?.() || [], Un(() => {
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
var ei = /* @__PURE__ */ Z("<button class=\"chrome-restore svelte-1n46o8q\" title=\"Tilbake til redigering\">✏ Rediger</button>"), ti = /* @__PURE__ */ Z("<option class=\"svelte-1n46o8q\"> </option>"), ni = /* @__PURE__ */ Z("<select class=\"svelte-1n46o8q\"></select> <span class=\"viewswitch svelte-1n46o8q\"><button title=\"Desktop-visning\">💻</button> <button title=\"Mobilvisning (390px)\">📱</button></span>", 1), ri = /* @__PURE__ */ Z("<button class=\"badge attention svelte-1n46o8q\" title=\"Desktop-endringer kan ha påvirket håndjustert mobil-layout - klikk for å se over\"> </button>"), ii = /* @__PURE__ */ Z("<span class=\"badge svelte-1n46o8q\">Upubliserte endringer</span>"), ai = /* @__PURE__ */ Z("<span class=\"who svelte-1n46o8q\"> </span>"), oi = /* @__PURE__ */ Z("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\">Logg inn med GitHub</a>"), si = /* @__PURE__ */ Z("<button class=\"ghost svelte-1n46o8q\"> </button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\">Se siden ↗</a> <button class=\"ghost svelte-1n46o8q\">Forkast utkast</button> <button class=\"primary svelte-1n46o8q\">Publiser</button>", 1), ci = /* @__PURE__ */ Z("<button> </button>"), li = /* @__PURE__ */ Z("<div><p class=\"panel-hint svelte-1n46o8q\">Nye blokker legges midt i synsfeltet, i sist klikkede seksjon.</p> <button class=\"ghost svelte-1n46o8q\">Tekst</button> <button class=\"ghost svelte-1n46o8q\">Knapp</button> <label class=\"ghost filepick svelte-1n46o8q\" title=\"Komprimeres automatisk til webp\">Bilde <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\">Strek</button> <button class=\"ghost svelte-1n46o8q\">Pil</button> <button class=\"ghost svelte-1n46o8q\">Sirkel</button> <button class=\"ghost svelte-1n46o8q\">Rektangel</button> <button class=\"ghost svelte-1n46o8q\">Trekant</button></div>"), ui = /* @__PURE__ */ Z("<label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), di = /* @__PURE__ */ Z("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\"/> Eget grid i valgt seksjon</label> <!>", 1), fi = /* @__PURE__ */ Z("<p class=\"panel-hint svelte-1n46o8q\">Klikk i en seksjon for å kunne gi den sitt eget grid.</p>"), pi = /* @__PURE__ */ Z("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\">Hjelpelinjene blokker snapper til. Vises så lenge panelet er åpent; å endre dem flytter aldri innhold.</p> <label class=\"svelte-1n46o8q\">Rutestørrelse <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\"/> Snap til grid</label> <!></div>"), mi = /* @__PURE__ */ Z("<p> </p> <p class=\"panel-hint svelte-1n46o8q\">Den detaljerte blokkeditoren kommer i neste steg av v0.5.</p>", 1), hi = /* @__PURE__ */ Z("<p>Valgt: seksjon</p> <p class=\"panel-hint svelte-1n46o8q\">Seksjonseditoren (høyde, bakgrunn, animasjoner) kommer i v0.5.</p>", 1), gi = /* @__PURE__ */ Z("<p class=\"panel-hint svelte-1n46o8q\">Klikk på en blokk eller seksjon i forhåndsvisningen.</p>"), _i = /* @__PURE__ */ Z("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), vi = /* @__PURE__ */ Z("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-hint svelte-1n46o8q\"> </p></div>"), yi = /* @__PURE__ */ Z("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), bi = /* @__PURE__ */ Z("<nav class=\"rail svelte-1n46o8q\"></nav> <!>", 1), xi = /* @__PURE__ */ Z("<div class=\"workspace svelte-1n46o8q\"><!> <div><iframe title=\"Forhåndsvisning\" class=\"svelte-1n46o8q\"></iframe></div></div>"), Si = /* @__PURE__ */ Z("<p class=\"loading svelte-1n46o8q\">Laster…</p>"), Ci = /* @__PURE__ */ Z("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\" title=\"Lukk\">×</button></div>"), wi = /* @__PURE__ */ Z("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><strong class=\"brand svelte-1n46o8q\">Urd</strong> <!> <!> <!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!></div>");
function Ti(e, t) {
	Pe(t, !0);
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
	})), f = /* @__PURE__ */ F(!0), p = /* @__PURE__ */ F("desktop"), m = /* @__PURE__ */ F(0);
	function h() {
		I(m, _?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function g(e, t) {
		!e || e.responsive?.mobile?.mode !== "manual" || e.responsive.mobile.attention?.needed || (e.responsive.mobile.attention = {
			needed: !0,
			reason: t,
			since: (/* @__PURE__ */ new Date()).toISOString()
		}, h(), y?.sendAttention(e.id, !0));
	}
	let _ = null, v = null, y = null, ee = () => Y(n).pages.find((e) => e.id === Y(r));
	function b() {
		let e = Y(n)?.pages?.some((e) => localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1;
		I(i, e || _?.hasDraft() || v?.hasDraft() || !1, !0);
	}
	let x = [], te = [], ne = null;
	function S() {
		return JSON.stringify({
			page: _.data,
			site: v.data
		});
	}
	function C(e) {
		e === ne && (e.startsWith("edit:") || e === "grid") || (x.push(S()), x.length > 50 && x.shift(), te.length = 0, ne = e);
	}
	function re(e) {
		let { page: t, site: n } = JSON.parse(e);
		_.replace(t), v.replace(n), _.save(), v.save(), I(d, {
			snap: !0,
			...v.data.grid
		}, !0), b(), h(), y?.sendSite(v.data), y?.sendPage(Y(r), _.data);
	}
	function ie() {
		x.length && (te.push(S()), re(x.pop()), ne = null, c("Angret"));
	}
	function ae() {
		te.length && (x.push(S()), re(te.pop()), ne = null, c("Gjentatt"));
	}
	function oe(e) {
		if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
		let t = e.target;
		t instanceof HTMLElement && (t.isContentEditable || t.tagName === "TEXTAREA" || t.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range"
		].includes(t.type)) || (e.preventDefault(), e.shiftKey ? ae() : ie());
	}
	async function se() {
		I(n, Kr(await (await fetch("/content/site.json")).json()), !0), v = Br("urd-draft-site", () => Y(n)), v.replace(Kr(v.data)), v.save(), I(d, {
			snap: !0,
			...v.data.grid
		}, !0), await E(new URLSearchParams(location.search).get("page") ?? Y(n).pages[0].id), await ve();
	}
	let w = /* @__PURE__ */ F(null), ce = [
		"Sider",
		"Blokker",
		"Egenskaper",
		"Tema",
		"Nav",
		"Grid",
		"Historikk"
	];
	function le(e) {
		I(w, Y(w) === e ? null : e, !0), y?.sendShowGrid(Y(w) === "Grid");
	}
	let ue = /* @__PURE__ */ F(null);
	function de(e) {
		if (!e.blockId) {
			I(ue, null);
			return;
		}
		let t = (_?.data.sections.find((t) => t.id === e.sectionId))?.blocks.find((t) => t.id === e.blockId);
		I(ue, t ? {
			sectionId: e.sectionId,
			blockId: e.blockId,
			type: t.type
		} : null, !0);
	}
	let T = /* @__PURE__ */ F(null), fe = /* @__PURE__ */ F(null);
	function pe(e) {
		I(T, e.sectionId, !0);
		let t = _?.data.sections.find((t) => t.id === e.sectionId);
		I(fe, t?.grid ? { ...t.grid } : null, !0);
	}
	function me() {
		return _.data.sections.find((e) => e.id === Y(T)) ?? _.data.sections[0];
	}
	function he(e) {
		let t = _.data.sections.find((e) => e.id === Y(T));
		t && (C("grid"), t.grid = e ? { ...v.data.grid } : null, I(fe, t.grid ? { ...t.grid } : null, !0), _.save(), b(), y?.sendSection(Y(r), t), Y(w) === "Grid" && y?.sendShowGrid(!0));
	}
	function ge(e, t) {
		let n = _.data.sections.find((e) => e.id === Y(T));
		n?.grid && (C("grid"), n.grid = {
			...n.grid,
			[e]: t
		}, I(fe, { ...n.grid }, !0), _.save(), b(), y?.sendSection(Y(r), n), Y(w) === "Grid" && y?.sendShowGrid(!0));
	}
	function _e(e, t) {
		C("grid"), I(d, {
			...Y(d),
			[e]: t
		}, !0), v.data.grid = {
			...v.data.grid,
			[e]: t
		}, v.save(), b(), y?.sendSite(v.data), Y(w) === "Grid" && y?.sendShowGrid(!0);
	}
	async function ve() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? I(u, await e.json(), !0) : e.status !== 503 && I(u, null);
		} catch {
			I(u, null);
		}
	}
	let ye = null;
	async function E(e) {
		I(r, e, !0), ye = (async () => {
			let t = ee(), n = qr(await (await fetch(`/${t.file}`)).json(), v.data);
			_ = Br(`urd-draft-${e}`, () => n), _.replace(qr(_.data, v.data)), _.save(), x.length = 0, te.length = 0, ne = null, I(T, null), I(fe, null), b(), h(), I(a, "");
		})(), await ye;
	}
	function be() {
		y?.destroy(), y = Vr(Y(l), {
			onEdit: we,
			onMove: D,
			onDelete: Me,
			onAddSection: Oe,
			onMoveSection: ke,
			onDeleteSection: Ae,
			onSectionSize: je,
			onUndo: (e) => e.redo ? ae() : ie(),
			onSelectSection: pe,
			onSelectBlock: de,
			onReady: xe,
			onNavigate: Se,
			onAddBlock: (e) => Le(e.sectionId, e.block),
			onMobileManual: Te,
			onMobileAuto: O,
			onReviewDone: k,
			onBlockFlag: Ee
		});
	}
	async function xe() {
		await ye, v.hasDraft() && y?.sendSite(v.data), _.hasDraft() && y?.sendPage(Y(r), _.data), Y(f) || y?.sendChrome(!1), Y(w) === "Grid" && y?.sendShowGrid(!0);
	}
	function Se(e) {
		let t = e.path.replace(/\/$/, "") || "/", i = Y(n).pages.find((e) => e.path === t);
		i && i.id !== Y(r) && E(i.id);
	}
	function Ce() {
		I(f, !Y(f)), y?.sendChrome(Y(f));
	}
	function we(e) {
		let t = _.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (C(`edit:${e.blockId}`), t.props = e.props, _.save(), b(), I(a, ""));
	}
	function D(e) {
		let t = _.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		C(e.coalesce ? `edit:${e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && g(t, "desktop-endret-etter-mobil"), _.save(), b();
	}
	function Te(e) {
		let t = _.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			C("mobile-manual");
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
			}, _.save(), b();
		}
	}
	function O(e) {
		let t = _.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			C("mobile-auto");
			for (let e of t.blocks) e.frames.mobile = null;
			t.responsive = {
				...t.responsive ?? {},
				mobile: {
					mode: "auto",
					attention: null
				}
			}, _.save(), b(), h(), y?.sendSection(Y(r), t);
		}
	}
	function k(e) {
		let t = _.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (C("review-done"), t.responsive.mobile.attention = null, _.save(), b(), h());
	}
	function Ee(e) {
		let t = _.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		t && (C("decor"), t.decor = e.decor, _.save(), b());
	}
	function Oe(e) {
		C("add-section"), _.data.sections.splice(e.index, 0, e.section), _.save(), b(), y?.sendPage(Y(r), _.data);
	}
	function ke(e) {
		let t = _.data.sections, n = t.findIndex((t) => t.id === e.sectionId), i = n + e.dir;
		n < 0 || i < 0 || i >= t.length || (C("move-section"), [t[n], t[i]] = [t[i], t[n]], _.save(), b(), y?.sendPage(Y(r), _.data));
	}
	function Ae(e) {
		C("delete-section"), e.sectionId === Y(T) && (I(T, null), I(fe, null)), _.data.sections = _.data.sections.filter((t) => t.id !== e.sectionId), _.save(), b(), y?.sendPage(Y(r), _.data);
	}
	function je(e) {
		let t = _.data.sections.find((t) => t.id === e.sectionId);
		t && (C("section-size"), t.size = {
			...t.size,
			minHeight: e.minHeight
		}, _.save(), b());
	}
	function Me(e) {
		let t = _.data.sections.find((t) => t.id === e.sectionId);
		t && (C("delete-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), g(t, "blokk-slettet"), _.save(), b(), y?.sendSection(Y(r), t));
	}
	let j = {
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
	function Ne(e) {
		let t = j[e];
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
	function Ie(e) {
		y ? y.sendPlaceBlock(e) : Le(me()?.id, e);
	}
	function Le(e, t) {
		let n = _.data.sections.find((t) => t.id === e) ?? _.data.sections[0];
		n && (C("add-block"), n.blocks.push(t), g(n, "blokk-lagt-til"), _.save(), b(), y?.sendSection(Y(r), n));
	}
	function Re(e) {
		Ie(Ne(e));
	}
	async function ze(e) {
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
		let r = Math.round(n.height / n.width * .3 * (Y(l)?.clientWidth ?? 1280));
		Ie({
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
	function Be(e) {
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
	function Ve() {
		C("discard");
		let e = _.reset(), t = v.reset();
		I(d, {
			snap: !0,
			...t.grid
		}, !0), b(), I(a, ""), y?.sendSite(t), y?.sendPage(Y(r), e);
	}
	async function He() {
		c("Publiserer…");
		let e = [], t = [], a = [];
		for (let i of Y(n).pages) {
			let n = `urd-draft-${i.id}`, o = null;
			if (i.id === Y(r) && _.hasDraft()) o = _.data;
			else if (i.id !== Y(r)) {
				let e = localStorage.getItem(n);
				if (e) try {
					o = qr(JSON.parse(e), v.data);
				} catch {}
			}
			o && (e.push(...Be(o)), e.push({
				path: i.file,
				content: JSON.stringify(o, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), a.push(n));
		}
		_.hasDraft() && _.save(), v.hasDraft() && (e.push({
			path: "content/site.json",
			content: JSON.stringify(v.data, null, 2) + "\n",
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
			c(e === "Ugyldig eller utløpt innlogging" ? "GitHub avviste innloggingen (utløpt token?) - logg inn på nytt" : `Du må logge inn med GitHub for å publisere (${e ?? "ukjent årsak"})`, "error"), await ve();
		} else s?.status === 403 ? c((await s.json().catch(() => null))?.error ?? "Du har ikke publiseringstilgang", "error") : c(s ? (await s.json().catch(() => null))?.error ?? "Publisering feilet (er publiseringslaget satt opp?)" : "Publisering er ikke tilgjengelig her (krever host med functions)", "error");
	}
	se();
	var M = wi();
	Zn("keydown", Ht, oe);
	var Ue = R(M), We = (e) => {
		var t = ei();
		X("click", t, Ce), Q(e, t);
	};
	$(Ue, (e) => {
		Y(f) || e(We);
	});
	var Ge = z(Ue, 2);
	let Ke;
	var qe = R(Ge), Je = z(R(qe), 2), Ye = (e) => {
		var t = ni(), i = Yt(t);
		hr(i, 21, () => Y(n).pages, dr, (e, t) => {
			var n = ti(), r = R(n, !0);
			A(n);
			var i = {};
			B(() => {
				ar(r, Y(t).title), i !== (i = Y(t).id) && (n.value = (n.__value = Y(t).id) ?? "");
			}), Q(e, n);
		}), A(i);
		var a;
		Tr(i);
		var o = z(i, 2), s = R(o);
		let c;
		var l = z(s, 2);
		let u;
		A(o), B(() => {
			a !== (a = Y(r)) && (i.value = (i.__value = Y(r)) ?? "", wr(i, Y(r))), c = Cr(s, 1, "ghost svelte-1n46o8q", null, c, { active: Y(p) === "desktop" }), u = Cr(l, 1, "ghost svelte-1n46o8q", null, u, { active: Y(p) === "mobile" });
		}), X("change", i, (e) => E(e.target.value)), X("click", s, () => I(p, "desktop")), X("click", l, () => I(p, "mobile")), Q(e, t);
	};
	$(Je, (e) => {
		Y(n) && e(Ye);
	});
	var Xe = z(Je, 2), Ze = (e) => {
		var t = ri(), n = R(t);
		A(t), B(() => ar(n, `📱 ${Y(m) ?? ""} ${Y(m) === 1 ? "seksjon" : "seksjoner"} trenger mobil-tilsyn`)), X("click", t, () => I(p, "mobile")), Q(e, t);
	};
	$(Xe, (e) => {
		Y(m) > 0 && e(Ze);
	});
	var Qe = z(Xe, 2), $e = (e) => {
		Q(e, ii());
	};
	$(Qe, (e) => {
		Y(i) && e($e);
	}), A(qe);
	var et = z(qe, 2), tt = R(et), nt = (e) => {
		var t = si(), n = Yt(t), r = R(n, !0);
		A(n);
		var a = z(n, 2), o = (e) => {
			var t = ai(), n = R(t);
			A(t), B(() => {
				Pr(t, "title", Y(u).allowed ? "Har publiseringstilgang" : "Mangler publiseringstilgang (ALLOWED_LOGINS)"), ar(n, `${Y(u).allowed ? "" : "⚠ "}${Y(u).login ?? ""}`);
			}), Q(e, t);
		}, s = (e) => {
			Q(e, oi());
		};
		$(a, (e) => {
			Y(u)?.loggedIn ? e(o) : Y(u) && e(s, 1);
		});
		var c = z(a, 2), l = z(c, 2), d = z(l, 2);
		B((e) => {
			Pr(n, "title", Y(f) ? "Skjul editeringshåndtakene og se siden som besøkende gjør" : "Vis editeringshåndtakene igjen"), ar(r, Y(f) ? "👁 Ren visning" : "✏ Rediger"), Pr(c, "href", e), l.disabled = !Y(i), d.disabled = !Y(i);
		}, [() => ee().path]), X("click", n, Ce), X("click", l, Ve), X("click", d, He), Q(e, t);
	};
	$(tt, (e) => {
		Y(n) && e(nt);
	}), A(et), A(Ge);
	var rt = z(Ge, 2), it = (e) => {
		var t = xi(), n = R(t), i = (e) => {
			var t = bi(), n = Yt(t);
			hr(n, 21, () => ce, dr, (e, t) => {
				var n = ci();
				let r;
				var i = R(n, !0);
				A(n), B(() => {
					r = Cr(n, 1, "svelte-1n46o8q", null, r, { active: Y(w) === Y(t) }), ar(i, Y(t));
				}), X("click", n, () => le(Y(t))), Q(e, n);
			}), A(n);
			var r = z(n, 2), i = (e) => {
				var t = yi(), n = R(t), r = R(n, !0);
				A(n);
				var i = z(n, 2), a = (e) => {
					var t = li();
					let n;
					var r = z(R(t), 2), i = z(r, 2), a = z(i, 2), o = z(R(a));
					A(a);
					var s = z(a, 2), c = z(s, 2), l = z(c, 2), u = z(l, 2), d = z(u, 2);
					A(t), B(() => {
						n = Cr(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: Y(p) === "mobile" }), Pr(t, "title", Y(p) === "mobile" ? "Bytt til desktop-visning for å legge til innhold" : void 0);
					}), X("click", r, () => Re("text")), X("click", i, () => Re("button")), X("change", o, ze), X("click", s, () => Re("shape-line")), X("click", c, () => Re("shape-arrow")), X("click", l, () => Re("shape-circle")), X("click", u, () => Re("shape-rect")), X("click", d, () => Re("shape-triangle")), Q(e, t);
				}, o = (e) => {
					var t = pi(), n = z(R(t), 2), r = z(R(n)), i = R(r);
					A(r), A(n);
					var a = z(n, 2);
					jr(a);
					var o = z(a, 2), s = R(o);
					jr(s), De(), A(o);
					var c = z(o, 2), l = (e) => {
						var t = di(), n = z(Yt(t), 2), r = R(n);
						jr(r), De(), A(n);
						var i = z(n, 2), a = (e) => {
							var t = ui(), n = Yt(t), r = z(R(n)), i = R(r);
							A(r), A(n);
							var a = z(n, 2);
							jr(a), B(() => {
								ar(i, `${Y(fe).size ?? ""} px`), Mr(a, Y(fe).size);
							}), X("input", a, (e) => ge("size", Number(e.target.value))), Q(e, t);
						};
						$(i, (e) => {
							Y(fe) && e(a);
						}), B(() => Nr(r, Y(fe) !== null)), X("change", r, (e) => he(e.target.checked)), Q(e, t);
					}, u = (e) => {
						Q(e, fi());
					};
					$(c, (e) => {
						Y(T) ? e(l) : e(u, -1);
					}), A(t), B(() => {
						ar(i, `${Y(d).size ?? ""} px`), Mr(a, Y(d).size), Nr(s, Y(d).snap !== !1);
					}), X("input", a, (e) => _e("size", Number(e.target.value))), X("change", s, (e) => _e("snap", e.target.checked)), Q(e, t);
				}, s = (e) => {
					var t = _i(), n = R(t), r = (e) => {
						var t = mi(), n = Yt(t), r = R(n);
						A(n), De(2), B(() => ar(r, `Valgt: ${Y(ue).type ?? ""}-blokk`)), Q(e, t);
					}, i = (e) => {
						var t = hi();
						De(2), Q(e, t);
					}, a = (e) => {
						Q(e, gi());
					};
					$(n, (e) => {
						Y(ue) ? e(r) : Y(T) ? e(i, 1) : e(a, -1);
					}), A(t), Q(e, t);
				}, c = (e) => {
					var t = vi(), n = R(t), r = R(n);
					A(n), A(t), B(() => ar(r, `${Y(w) ?? ""}-panelet kommer i en senere del av v0.5.`)), Q(e, t);
				};
				$(i, (e) => {
					Y(w) === "Blokker" ? e(a) : Y(w) === "Grid" ? e(o, 1) : Y(w) === "Egenskaper" ? e(s, 2) : e(c, -1);
				}), A(t), B(() => ar(r, Y(w))), Q(e, t);
			};
			$(r, (e) => {
				Y(w) && e(i);
			}), Q(e, t);
		};
		$(n, (e) => {
			Y(f) && e(i);
		});
		var a = z(n, 2);
		let o;
		var s = R(a);
		zr(s, (e) => I(l, e), () => Y(l)), A(a), A(t), B(() => {
			o = Cr(a, 1, "frame-wrap svelte-1n46o8q", null, o, { mobile: Y(p) === "mobile" }), Pr(s, "src", `/?page=${Y(r)}&preview=1`);
		}), Zn("load", s, be), Yn(s), Q(e, t);
	}, at = (e) => {
		Q(e, Si());
	};
	$(rt, (e) => {
		Y(n) ? e(it) : e(at, -1);
	});
	var ot = z(rt, 2), st = (e) => {
		var t = Ci();
		let n;
		var r = R(t), i = R(r, !0);
		A(r);
		var s = z(r, 2);
		A(t), B(() => {
			n = Cr(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: Y(o) === "ok",
				error: Y(o) === "error"
			}), ar(i, Y(a));
		}), X("click", s, () => c("")), Q(e, t);
	};
	$(ot, (e) => {
		Y(a) && e(st);
	}), A(M), B(() => Ke = Cr(Ge, 1, "topbar svelte-1n46o8q", null, Ke, { hidden: !Y(f) })), Q(e, M), Fe();
}
Qn([
	"click",
	"change",
	"input"
]);
//#endregion
//#region src/main.js
var Ei = or(Ti, { target: document.getElementById("urd-admin") });
//#endregion
export { Ei as default };
