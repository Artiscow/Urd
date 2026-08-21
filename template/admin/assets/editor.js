//#region node_modules/svelte/src/internal/shared/utils.js
var e = Array.isArray, t = Array.prototype.indexOf, n = Array.prototype.includes, r = Array.from, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyDescriptors, s = Object.prototype, c = Array.prototype, l = Object.getPrototypeOf, u = Object.isExtensible;
function d(e) {
	return typeof e == "function";
}
var f = () => {};
function p(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function m() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
function h(e, t) {
	if (Array.isArray(e)) return e;
	if (t === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let n = [];
	for (let r of e) if (n.push(r), n.length === t) break;
	return n;
}
var g = 1024, _ = 2048, v = 4096, y = 8192, b = 16384, x = 32768, S = 1 << 25, C = 65536, w = 1 << 19, T = 1 << 20, ee = 1 << 25, te = 65536, ne = 1 << 21, re = 1 << 22, ie = 1 << 23, ae = Symbol("$state"), oe = Symbol("legacy props"), se = Symbol(""), ce = Symbol("attributes"), le = Symbol("class"), ue = Symbol("style"), de = Symbol("text"), fe = Symbol("form reset"), pe = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), me = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
function he() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function ge(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function _e(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function ve() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ye(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function be() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function xe(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function Se() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ce() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function we() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Te() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
//#endregion
//#region node_modules/svelte/src/constants.js
var Ee = {}, E = Symbol("uninitialized"), De = "http://www.w3.org/1999/xhtml", D = "http://www.w3.org/2000/svg", O = "http://www.w3.org/1998/Math/MathML";
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
function k(e) {
	je = e;
}
var Me;
function Ne(e) {
	if (e === null) throw ke(), Ee;
	return Me = e;
}
function Pe() {
	return Ne(/* @__PURE__ */ fn(Me));
}
function A(e) {
	if (je) {
		if (/* @__PURE__ */ fn(Me) !== null) throw ke(), Ee;
		Me = e;
	}
}
function Fe(e = 1) {
	if (je) {
		for (var t = e, n = Me; t--;) n = /* @__PURE__ */ fn(n);
		Me = n;
	}
}
function Ie(e = !0) {
	for (var t = 0, n = Me;;) {
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
	if (!e || e.nodeType !== 8) throw ke(), Ee;
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
		r: Jn,
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
	Ye = [], p(e);
}
function Ze(e) {
	if (Ye.length === 0 && !Pt) {
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
	var t = Jn;
	if (t === null) return Gn.f |= ie, e;
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
var tt = ~(_ | v | g);
function nt(e, t) {
	e.f = e.f & tt | t;
}
function rt(e) {
	e.f & 512 || e.deps === null ? nt(e, g) : nt(e, v);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
function it(e) {
	if (e !== null) for (let t of e) !(t.f & 2) || !(t.f & 65536) || (t.f ^= te, it(t.deps));
}
function at(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), it(e.deps), nt(e, g);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
var ot = !1;
function st(e) {
	var t = ot;
	try {
		return ot = !1, [e(), ot];
	} finally {
		ot = t;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
function ct(e, t) {
	if (t) {
		let t = document.body;
		e.autofocus = !0, Ze(() => {
			document.activeElement === t && e.focus();
		});
	}
}
function lt(e) {
	je && /* @__PURE__ */ dn(e) !== null && pn(e);
}
var ut = !1;
function dt() {
	ut || (ut = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let t of e.target.elements) t[fe]?.();
		});
	}, { capture: !0 }));
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function ft(e) {
	var t = Gn, n = Jn;
	qn(null), Yn(null);
	try {
		return e();
	} finally {
		qn(t), Yn(n);
	}
}
function pt(e, t, n, r = n) {
	e.addEventListener(t, () => ft(n));
	let i = e[fe];
	e[fe] = i ? () => {
		i(), r(!0);
	} : () => r(!0), dt();
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
function mt(e) {
	let t = 0, n = Zt(0), r;
	return () => {
		bn() && (B(n), Dn(() => (t === 0 && (r = gr(() => e(() => tn(n)))), t += 1, () => {
			Ze(() => {
				--t, t === 0 && (r?.(), r = void 0, tn(n));
			});
		})));
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var ht = C | w;
function gt(e, t, n, r) {
	new _t(e, t, n, r);
}
var _t = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = je ? Me : null;
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
	#h = mt(() => (this.#m = Zt(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = Jn;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = Jn.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = On(() => {
			if (je) {
				let e = this.#t;
				Pe();
				let t = e.data === "[!";
				if (e.data.startsWith("[?")) {
					let t = JSON.parse(e.data.slice(2));
					this.#_(t);
				} else t ? this.#y() : this.#g();
			} else this.#b();
		}, ht), je && (this.#e = Me);
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
			t = !0, n && Te(), this.#s !== null && In(this.#s, () => {
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
		at(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#S(e) {
		var t = Jn, n = Gn, r = We;
		Yn(this.#i), qn(this.#i), Ge(this.#i.ctx);
		try {
			return Bt.ensure(), e();
		} catch (e) {
			return $e(e), null;
		} finally {
			Yn(t), qn(n), Ge(r);
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
		return this.#h(), B(this.#m);
	}
	error(e) {
		if (!this.#n.onerror && !this.#n.failed) throw e;
		N?.is_fork ? (this.#a && N.skip_effect(this.#a), this.#o && N.skip_effect(this.#o), this.#s && N.skip_effect(this.#s), N.oncommit(() => {
			this.#w(e);
		})) : this.#w(e);
	}
	#w(e) {
		this.#a &&= (Nn(this.#a), null), this.#o &&= (Nn(this.#o), null), this.#s &&= (Nn(this.#s), null), je && (Ne(this.#t), Fe(), Ne(Ie()));
		let t = this.#n.failed, n = (e) => {
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && (this.#s = this.#S(() => {
				try {
					return kn(() => {
						var r = Jn;
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
function vt(e, t, n, r) {
	let i = Je() ? j : wt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = Jn, c = yt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				et(e, s);
			}
			bt();
		}
	}
	var d = xt();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ Ct(e))).then(u).catch((e) => et(e, s)).finally(d);
	}
	l ? l.then(() => {
		c(), f(), bt();
	}) : f();
}
function yt() {
	var e = Jn, t = Gn, n = We, r = N;
	return function(i = !0) {
		Yn(e), qn(t), Ge(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function bt(e = !0) {
	Yn(null), qn(null), Ge(null), e && N?.deactivate();
}
function xt() {
	var e = Jn, t = e.b, n = N, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function j(e) {
	var t = 2 | _;
	return Jn !== null && (Jn.f |= w), {
		ctx: We,
		deps: null,
		effects: null,
		equals: Re,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: E,
		wv: 0,
		parent: Jn,
		ac: null
	};
}
var St = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function Ct(e, t, n) {
	let r = Jn;
	r === null && he();
	var i = void 0, a = Zt(E), o = !Gn, s = /* @__PURE__ */ new Set();
	return En(() => {
		var t = Jn, n = m();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== pe && n.reject(e);
			}).finally(bt);
		} catch (e) {
			n.reject(e), bt();
		}
		var c = N;
		if (o) {
			if (t.f & 32768) var l = xt();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(St);
			else for (let e of s.values()) e.reject(St);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== St && (c.activate(), t ? (a.f |= ie, $t(a, t)) : (a.f & 8388608 && (a.f ^= ie), $t(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), xn(() => {
		for (let e of s) e.reject(St);
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
	let t = /* @__PURE__ */ j(e);
	return Zn(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function wt(e) {
	let t = /* @__PURE__ */ j(e);
	return t.equals = Be, t;
}
function Tt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) Nn(t[n]);
	}
}
function Et(e) {
	var t, n = Jn, r = e.parent;
	if (!Un && r !== null && e.v !== E && r.f & 24576) return Oe(), e.v;
	Yn(r);
	try {
		e.f &= ~te, Tt(e), t = lr(e);
	} finally {
		Yn(n);
	}
	return t;
}
function Dt(e) {
	var t = Et(e);
	if (!e.equals(t) && (e.wv = or(), (!N?.is_fork || e.deps === null) && (N === null ? e.v = t : (N.capture(e, t, !0), jt?.capture(e, t, !0)), e.deps === null))) {
		nt(e, g);
		return;
	}
	Un || (Mt === null ? rt(e) : (bn() || N?.is_fork) && Mt.set(e, t));
}
function Ot(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && ft(() => {
		t.ac.abort(pe), t.ac = null;
	}), t.fn !== null && (t.teardown = f), dr(t, 0), jn(t));
}
function kt(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && fr(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
var At = null, N = null, jt = null, Mt = null, Nt = null, Pt = !1, Ft = !1, It = null, Lt = null, Rt = 0, zt = 1, Bt = class e {
	id = zt++;
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
		At === null ? At = this : (At.#n = this, this.#t = At), At = this;
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
			for (var r of n.d) nt(r, _), t(r);
			for (r of n.m) nt(r, v), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		this.#e = !0, Rt++ > 1e3 && (this.#x(), Ht());
		for (let e of this.#u) this.#d.delete(e), nt(e, _), this.schedule(e);
		for (let e of this.#d) nt(e, v), this.schedule(e);
		let t = this.#c;
		this.#c = [], this.apply();
		var n = It = [], r = [], i = Lt = [];
		for (let e of t) try {
			this.#_(e, n, r);
		} catch (t) {
			throw qt(e), this.#h() || this.discard(), t;
		}
		if (N = null, i.length > 0) {
			var a = e.ensure();
			for (let e of i) a.schedule(e);
		}
		if (It = null, Lt = null, this.#h()) {
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
		this.#r.clear(), jt = this, Wt(r), Wt(n), jt = null, this.#s?.resolve();
		var s = N;
		if (this.#a === 0 && (this.#c.length === 0 || s !== null) && this.#x(), this.#c.length > 0) if (s !== null) {
			let e = s;
			e.#c.push(...this.#c.filter((t) => !e.#c.includes(t)));
		} else s = this;
		s !== null && s.#g();
	}
	#_(e, t, n) {
		e.f ^= g;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= g : i & 4 ? t.push(r) : sr(r) && (i & 16 && this.#d.add(r), fr(r));
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
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), nt(i, _), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#x(), N = this, this.#g();
	}
	#b(e) {
		for (var t = 0; t < e.length; t += 1) at(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== E && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), Mt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		N = this;
	}
	deactivate() {
		N = null, Mt = null;
	}
	flush() {
		try {
			Ft = !0, N = this, this.#g();
		} finally {
			Rt = 0, Nt = null, It = null, Lt = null, Ft = !1, N = null, Mt = null, Yt.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(St);
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
		return (this.#s ??= m()).promise;
	}
	static ensure() {
		if (N === null) {
			let t = N = new e();
			!Ft && !Pt && Ze(() => {
				t.#e || t.flush();
			});
		}
		return N;
	}
	apply() {
		Mt = null;
	}
	schedule(e) {
		if (Nt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768)) {
			e.b.defer_effect(e);
			return;
		}
		for (var t = e; t.parent !== null;) {
			t = t.parent;
			var n = t.f;
			if (It !== null && t === Jn && (Gn === null || !(Gn.f & 2))) return;
			if (n & 96) {
				if (!(n & 1024)) return;
				t.f ^= g;
			}
		}
		this.#c.push(t);
	}
	#x() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? At = e : t.#t = e, this.linked = !1;
		}
	}
};
function Vt(e) {
	var t = Pt;
	Pt = !0;
	try {
		var n;
		for (e && (N !== null && !N.is_fork && N.flush(), n = e());;) {
			if (Qe(), N === null) return n;
			N.flush();
		}
	} finally {
		Pt = t;
	}
}
function Ht() {
	try {
		be();
	} catch (e) {
		et(e, Nt);
	}
}
var Ut = null;
function Wt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && sr(r) && (Ut = /* @__PURE__ */ new Set(), fr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Fn(r), Ut?.size > 0)) {
				Yt.clear();
				for (let e of Ut) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Ut.has(n) && (Ut.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || fr(n);
					}
				}
				Ut.clear();
			}
		}
		Ut = null;
	}
}
function Gt(e) {
	N.schedule(e);
}
function Kt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), nt(e, g);
		for (var n = e.first; n !== null;) Kt(n, t), n = n.next;
	}
}
function qt(e) {
	nt(e, g);
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
	return Zn(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function Qt(e, t = !1, n = !0) {
	let r = Zt(e);
	return t || (r.equals = Be), r;
}
function F(e, t, n = !1) {
	return Gn !== null && (!Kn || Gn.f & 131072) && Je() && Gn.f & 4325394 && (Xn === null || !Xn.has(e)) && we(), $t(e, n ? rn(t) : t, Lt);
}
function $t(e, t, n = null) {
	if (!e.equals(t)) {
		Yt.set(e, Un ? t : e.v);
		var r = Bt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Et(t), Mt === null && rt(t);
		}
		e.wv = or(), nn(e, _, n), Je() && Jn !== null && Jn.f & 1024 && !(Jn.f & 96) && (er === null ? tr([e]) : er.push(e)), !r.is_fork && Jt.size > 0 && !Xt && en();
	}
	return t;
}
function en() {
	Xt = !1;
	for (let e of Jt) {
		e.f & 1024 && nt(e, v);
		let t;
		try {
			t = sr(e);
		} catch {
			t = !0;
		}
		t && fr(e);
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
		if (!(!i && s === Jn)) {
			var l = (c & _) === 0;
			if (l && nt(s, t), c & 131072) Jt.add(s);
			else if (c & 2) {
				var u = s;
				Mt?.delete(u), c & 65536 || (c & 512 && (Jn === null || !(Jn.f & 2097152)) && (s.f |= te), nn(u, v, n));
			} else if (l) {
				var d = s;
				c & 16 && Ut !== null && Ut.add(d), n === null ? Gt(d) : n.push(d);
			}
		}
	}
}
function rn(t) {
	if (typeof t != "object" || !t || ae in t) return t;
	let n = l(t);
	if (n !== s && n !== c) return t;
	var r = /* @__PURE__ */ new Map(), i = e(t), o = /* @__PURE__ */ P(0), u = null, d = ir, f = (e) => {
		if (ir === d) return e();
		var t = Gn, n = ir;
		qn(null), ar(d);
		var r = e();
		return qn(t), ar(n), r;
	};
	return i && r.set("length", /* @__PURE__ */ P(t.length, u)), new Proxy(t, {
		defineProperty(e, t, n) {
			(!("value" in n) || n.configurable === !1 || n.enumerable === !1 || n.writable === !1) && Se();
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
					let e = f(() => /* @__PURE__ */ P(E, u));
					r.set(t, e), tn(o);
				}
			} else F(n, E), tn(o);
			return !0;
		},
		get(e, n, i) {
			if (n === ae) return t;
			var o = r.get(n), s = n in e;
			if (o === void 0 && (!s || a(e, n)?.writable) && (o = f(() => /* @__PURE__ */ P(rn(s ? e[n] : E), u)), r.set(n, o)), o !== void 0) {
				var c = B(o);
				return c === E ? void 0 : c;
			}
			return Reflect.get(e, n, i);
		},
		getOwnPropertyDescriptor(e, t) {
			var n = Reflect.getOwnPropertyDescriptor(e, t);
			if (n && "value" in n) {
				var i = r.get(t);
				i && (n.value = B(i));
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
			return (n !== void 0 || Jn !== null && (!i || a(e, t)?.writable)) && (n === void 0 && (n = f(() => /* @__PURE__ */ P(i ? rn(e[t]) : E, u)), r.set(t, n)), B(n) === E) ? !1 : i;
		},
		set(e, t, n, s) {
			var c = r.get(t), l = t in e;
			if (i && t === "length") for (var d = n; d < c.v; d += 1) {
				var p = r.get(d + "");
				p === void 0 ? d in e && (p = f(() => /* @__PURE__ */ P(E, u)), r.set(d + "", p)) : F(p, E);
			}
			if (c === void 0) (!l || a(e, t)?.writable) && (c = f(() => /* @__PURE__ */ P(void 0, u)), F(c, rn(n)), r.set(t, c));
			else {
				l = c.v !== E;
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
			B(o);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = r.get(e);
				return t === void 0 || t.v !== E;
			});
			for (var [n, i] of r) i.v !== E && !(n in e) && t.push(n);
			return t;
		},
		setPrototypeOf() {
			Ce();
		}
	});
}
var an, on, sn, cn;
function ln() {
	if (an === void 0) {
		an = window, on = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		sn = a(t, "firstChild").get, cn = a(t, "nextSibling").get, u(e) && (e[le] = void 0, e[ce] = null, e[ue] = void 0, e.__e = void 0), u(n) && (n[de] = void 0);
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
	var n = /* @__PURE__ */ dn(Me);
	if (n === null) n = Me.appendChild(un());
	else if (t && n.nodeType !== 3) {
		var r = un();
		return n?.before(r), Ne(r), r;
	}
	return t && gn(n), Ne(n), n;
}
function L(e, t = !1) {
	if (!je) {
		var n = /* @__PURE__ */ dn(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ fn(n) : n;
	}
	if (t) {
		if (Me?.nodeType !== 3) {
			var r = un();
			return Me?.before(r), Ne(r), r;
		}
		gn(Me);
	}
	return Me;
}
function R(e, t = 1, n = !1) {
	let r = je ? Me : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ fn(r);
	if (!je) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = un();
			return r === null ? i?.after(a) : r.before(a), Ne(a), a;
		}
		gn(r);
	}
	return Ne(r), r;
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
	Jn === null && (Gn === null && ye(e), ve()), Un && _e(e);
}
function vn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function yn(e, t) {
	var n = Jn;
	n !== null && n.f & 8192 && (e |= y);
	var r = {
		ctx: We,
		deps: null,
		nodes: null,
		f: e | _ | 512,
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
	if (e & 4) It === null ? Bt.ensure().schedule(r) : It.push(r);
	else if (t !== null) {
		try {
			fr(r);
		} catch (e) {
			throw Nn(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= C));
	}
	if (i !== null && (i.parent = n, n !== null && vn(i, n), Gn !== null && Gn.f & 2 && !(e & 64))) {
		var a = Gn;
		(a.effects ??= []).push(i);
	}
	return r;
}
function bn() {
	return Gn !== null && !Kn;
}
function xn(e) {
	let t = yn(8, null);
	return nt(t, g), t.teardown = e, t;
}
function Sn(e) {
	_n("$effect");
	var t = Jn.f;
	if (!Gn && t & 32 && We !== null && !We.i) {
		var n = We;
		(n.e ??= []).push(e);
	} else return Cn(e);
}
function Cn(e) {
	return yn(4 | T, e);
}
function wn(e) {
	Bt.ensure();
	let t = yn(64 | w, e);
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
	return yn(re | w, e);
}
function Dn(e, t = 0) {
	return yn(8 | t, e);
}
function z(e, t = [], n = [], r = []) {
	vt(r, t, n, (t) => {
		yn(8, () => {
			e(...t.map(B));
		});
	});
}
function On(e, t = 0) {
	return yn(16 | t, e);
}
function kn(e) {
	return yn(32 | w, e);
}
function An(e) {
	var t = e.teardown;
	if (t !== null) {
		let e = Un, n = Gn;
		Wn(!0), qn(null);
		try {
			t.call(null);
		} finally {
			Wn(e), qn(n);
		}
	}
}
function jn(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && ft(() => {
			e.abort(pe);
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
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Pn(e.nodes.start, e.nodes.end), n = !0), e.f |= S, jn(e, t && !n), dr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	An(e), e.f ^= S, e.f |= b;
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
		e.f ^= y;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
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
		e.f ^= y, e.f & 1024 || (nt(e, _), Bt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
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
var Gn = null, Kn = !1;
function qn(e) {
	Gn = e;
}
var Jn = null;
function Yn(e) {
	Jn = e;
}
var Xn = null;
function Zn(e) {
	Gn !== null && (Xn ??= /* @__PURE__ */ new Set()).add(e);
}
var Qn = null, $n = 0, er = null;
function tr(e) {
	er = e;
}
var nr = 1, rr = 0, ir = rr;
function ar(e) {
	ir = e;
}
function or() {
	return ++nr;
}
function sr(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 2 && (e.f &= ~te), t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (sr(a) && Dt(a), a.wv > e.wv) return !0;
		}
		t & 512 && Mt === null && nt(e, g);
	}
	return !1;
}
function cr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(Xn !== null && Xn.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? cr(a, t, !1) : t === a && (n ? nt(a, _) : a.f & 1024 && nt(a, v), Gt(a));
	}
}
function lr(e) {
	var t = Qn, n = $n, r = er, i = Gn, a = Xn, o = We, s = Kn, c = ir, l = e.f;
	Qn = null, $n = 0, er = null, Gn = l & 96 ? null : e, Xn = null, Ge(e.ctx), Kn = !1, ir = ++rr, e.ac !== null && (ft(() => {
		e.ac.abort(pe);
	}), e.ac = null);
	try {
		e.f |= ne;
		var u = e.fn, d = u();
		e.f |= x;
		var f = e.deps, p = N?.is_fork;
		if (Qn !== null) {
			var m;
			if (p || dr(e, $n), f !== null && $n > 0) for (f.length = $n + Qn.length, m = 0; m < Qn.length; m++) f[$n + m] = Qn[m];
			else e.deps = f = Qn;
			if (bn() && e.f & 512) for (m = $n; m < f.length; m++) (f[m].reactions ??= []).push(e);
		} else !p && f !== null && $n < f.length && (dr(e, $n), f.length = $n);
		if (Je() && er !== null && !Kn && f !== null && !(e.f & 6146)) for (m = 0; m < er.length; m++) cr(er[m], e);
		if (i !== null && i !== e) {
			if (rr++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = rr;
			if (t !== null) for (let e of t) e.rv = rr;
			er !== null && (r === null ? r = er : r.push(...er));
		}
		return e.f & 8388608 && (e.f ^= ie), d;
	} catch (e) {
		return $e(e);
	} finally {
		e.f ^= ne, Qn = t, $n = n, er = r, Gn = i, Xn = a, Ge(o), Kn = s, ir = c;
	}
}
function ur(e, r) {
	let i = r.reactions;
	if (i !== null) {
		var a = t.call(i, e);
		if (a !== -1) {
			var o = i.length - 1;
			o === 0 ? i = r.reactions = null : (i[a] = i[o], i.pop());
		}
	}
	if (i === null && r.f & 2 && (Qn === null || !n.call(Qn, r))) {
		var s = r;
		s.f & 512 && (s.f ^= 512, s.f &= ~te), s.v !== E && rt(s), s.ac !== null && ft(() => {
			s.ac.abort(pe), s.ac = null, nt(s, _);
		}), Ot(s), dr(s, 0);
	}
}
function dr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) ur(e, n[r]);
}
function fr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		nt(e, g);
		var n = Jn, r = Hn;
		Jn = e, Hn = !(t & 96);
		try {
			t & 16777232 ? Mn(e) : jn(e), An(e);
			var i = lr(e);
			e.teardown = typeof i == "function" ? i : null, e.wv = nr;
		} finally {
			Hn = r, Jn = n;
		}
	}
}
async function pr() {
	await Promise.resolve(), Vt();
}
function B(e) {
	var t = !!(e.f & 2);
	if (Vn?.add(e), Gn !== null && !Kn && !(Jn !== null && Jn.f & 16384) && (Xn === null || !Xn.has(e))) {
		var r = Gn.deps;
		if (Gn.f & 2097152) e.rv < rr && (e.rv = rr, Qn === null && r !== null && r[$n] === e ? $n++ : Qn === null ? Qn = [e] : Qn.push(e));
		else {
			Gn.deps ??= [], n.call(Gn.deps, e) || Gn.deps.push(e);
			var i = e.reactions;
			i === null ? e.reactions = [Gn] : n.call(i, Gn) || i.push(Gn);
		}
	}
	if (Un && Yt.has(e)) return Yt.get(e);
	if (t) {
		var a = e;
		if (Un) {
			var o = a.v;
			return (!(a.f & 1024) && a.reactions !== null || hr(a)) && (o = Et(a)), Yt.set(a, o), o;
		}
		var s = !(a.f & 512) && !Kn && Gn !== null && (Hn || !!(Gn.f & 512)), c = (a.f & x) === 0;
		sr(a) && (s && (a.f |= 512), Dt(a)), s && !c && (kt(a), mr(a));
	}
	if (Mt?.has(e)) return Mt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function mr(e) {
	if (e.f |= 512, e.deps !== null) for (let t of e.deps) (t.reactions ??= []).push(e), t.f & 2 && !(t.f & 512) && (kt(t), mr(t));
}
function hr(e) {
	if (e.v === E) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (Yt.has(t) || t.f & 2 && hr(t)) return !0;
	return !1;
}
function gr(e) {
	var t = Kn;
	try {
		return Kn = !0, e();
	} finally {
		Kn = t;
	}
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var _r = ["touchstart", "touchmove"];
function vr(e) {
	return _r.includes(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
var yr = Symbol("events"), br = /* @__PURE__ */ new Set(), xr = /* @__PURE__ */ new Set();
function Sr(e) {
	if (!je) return;
	e.removeAttribute("onload"), e.removeAttribute("onerror");
	let t = e.__e;
	t !== void 0 && (e.__e = void 0, queueMicrotask(() => {
		e.isConnected && e.dispatchEvent(t);
	}));
}
function Cr(e, t, n, r = {}) {
	function i(e) {
		if (r.capture || Dr.call(t, e), !e.cancelBubble) return ft(() => n?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Ze(() => {
		t.addEventListener(e, i, r);
	}) : t.addEventListener(e, i, r), i;
}
function wr(e, t, n, r, i) {
	var a = {
		capture: r,
		passive: i
	}, o = Cr(e, t, n, a);
	(t === document.body || t === window || t === document || t instanceof HTMLMediaElement) && xn(() => {
		t.removeEventListener(e, o, a);
	});
}
function V(e, t, n) {
	(t[yr] ??= {})[e] = n;
}
function Tr(e) {
	for (var t = 0; t < e.length; t++) br.add(e[t]);
	for (var n of xr) n(e);
}
var Er = null;
function Dr(e) {
	var t = this, n = t.ownerDocument, r = e.type, a = e.composedPath?.() || [], o = a[0] || e.target;
	Er = e;
	var s = 0, c = Er === e && e[yr];
	if (c) {
		var l = a.indexOf(c);
		if (l !== -1 && (t === document || t === window)) {
			e[yr] = t;
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
		var d = Gn, f = Jn;
		qn(null), Yn(null);
		try {
			for (var p, m = []; o !== null && o !== t;) {
				try {
					var h = o[yr]?.[r];
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
			e[yr] = t, delete e.currentTarget, qn(d), Yn(f);
		}
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var Or = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function kr(e) {
	return Or?.createHTML(e) ?? e;
}
function Ar(e) {
	var t = hn("template");
	return t.innerHTML = kr(e.replaceAll("<!>", "<!---->")), t.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
function jr(e, t) {
	var n = Jn;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function H(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (je) return jr(Me, null), Me;
		i === void 0 && (i = Ar(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ dn(i)));
		var t = r || on ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ dn(t), s = t.lastChild;
			jr(o, s);
		} else jr(t, t);
		return t;
	};
}
function Mr(e = "") {
	if (!je) {
		var t = un(e + "");
		return jr(t, t), t;
	}
	var n = Me;
	return n.nodeType === 3 ? gn(n) : (n.before(n = un()), Ne(n)), jr(n, n), n;
}
function Nr() {
	if (je) return jr(Me, null), Me;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = un();
	return e.append(t, n), jr(t, n), e;
}
function U(e, t) {
	if (je) {
		var n = Jn;
		(!(n.f & 32768) || n.nodes.end === null) && (n.nodes.end = Me), Pe();
		return;
	}
	e !== null && e.before(t);
}
//#endregion
//#region node_modules/svelte/src/internal/client/render.js
var Pr = !0;
function W(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[de] ??= e.nodeValue) && (e[de] = n, e.nodeValue = `${n}`);
}
function Fr(e, t) {
	return Lr(e, t);
}
var Ir = /* @__PURE__ */ new Map();
function Lr(e, { target: t, anchor: n, props: i = {}, events: a, context: o, intro: s = !0, transformError: c }) {
	ln();
	var l = void 0, u = wn(() => {
		var u = n ?? t.appendChild(un());
		gt(u, { pending: () => {} }, (t) => {
			Ke({});
			var n = We;
			if (o && (n.c = o), a && (i.$$events = a), je && jr(t, null), Pr = s, l = e(t, i) || {}, Pr = !0, je && (Jn.nodes.end = Me, Me === null || Me.nodeType !== 8 || Me.data !== "]")) throw ke(), Ee;
			qe();
		}, c);
		var d = /* @__PURE__ */ new Set(), f = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!d.has(r)) {
					d.add(r);
					var i = vr(r);
					for (let e of [t, document]) {
						var a = Ir.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Ir.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Dr, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return f(r(br)), xr.add(f), () => {
			for (var e of d) for (let n of [t, document]) {
				var r = Ir.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Dr), r.delete(e), r.size === 0 && Ir.delete(n)) : r.set(e, i);
			}
			xr.delete(f), u !== n && u.parentNode?.removeChild(u);
		};
	});
	return Rr.set(l, u), l;
}
var Rr = /* @__PURE__ */ new WeakMap(), zr = class {
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
		} else je && (this.anchor = Me), this.#a(n);
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
function G(e, t, n = !1) {
	var r;
	je && (r = Me, Pe());
	var i = new zr(e), a = n ? C : 0;
	function o(e, t) {
		if (je) {
			var n = Le(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ie();
				Ne(a), i.anchor = a, k(!1), i.ensure(e, t), k(!0);
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
function Br(e, t) {
	return t;
}
function Vr(e, t, n) {
	for (var i = [], a = t.length, o, s = t.length, c = 0; c < a; c++) {
		let n = t[c];
		In(n, () => {
			if (o) {
				if (o.pending.delete(n), o.done.add(n), o.pending.size === 0) {
					var t = e.outrogroups;
					Hr(e, r(o.done)), t.delete(o), t.size === 0 && (e.outrogroups = null);
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
		Hr(e, t, !l);
	} else o = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(o);
}
function Hr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= ee, Bn(a, document.createDocumentFragment())) : Nn(t[i], n);
	}
}
var Ur;
function Wr(t, n, i, a, o, s = null) {
	var c = t, l = /* @__PURE__ */ new Map();
	if (n & 4) {
		var u = t;
		c = je ? Ne(/* @__PURE__ */ dn(u)) : u.appendChild(un());
	}
	je && Pe();
	var d = null, f = /* @__PURE__ */ wt(() => {
		var t = i();
		return e(t) ? t : t == null ? [] : r(t);
	}), p, m = /* @__PURE__ */ new Map(), h = !0;
	function g(e) {
		v.effect.f & 16384 || (v.pending.delete(e), v.fallback = d, Kr(v, p, c, n, a), d !== null && (p.length === 0 ? d.f & 33554432 ? (d.f ^= ee, Jr(d, null, c)) : Rn(d) : In(d, () => {
			d = null;
		})));
	}
	function _(e) {
		v.pending.delete(e);
	}
	var v = {
		effect: On(() => {
			p = B(f);
			var e = p.length;
			let t = !1;
			je && Le(c) === "[!" != (e === 0) && (c = Ie(), Ne(c), k(!1), t = !0);
			for (var r = /* @__PURE__ */ new Set(), u = N, v = mn(), y = 0; y < e; y += 1) {
				je && Me.nodeType === 8 && Me.data === "]" && (c = Me, t = !0, k(!1));
				var b = p[y], x = a(b, y), S = h ? null : l.get(x);
				S ? (S.v && $t(S.v, b), S.i && $t(S.i, y), v && u.unskip_effect(S.e)) : (S = qr(l, h ? c : Ur ??= un(), b, x, y, o, n, i), h || (S.e.f |= ee), l.set(x, S)), r.add(x);
			}
			if (e === 0 && s && !d && (h ? d = kn(() => s(c)) : (d = kn(() => s(Ur ??= un())), d.f |= ee)), e > r.size && ge("", "", ""), je && e > 0 && Ne(Ie()), !h) if (m.set(u, r), v) {
				for (let [e, t] of l) r.has(e) || u.skip_effect(t.e);
				u.oncommit(g), u.ondiscard(_);
			} else g(u);
			t && k(!0), B(f);
		}),
		flags: n,
		items: l,
		pending: m,
		outrogroups: null,
		fallback: d
	};
	h = !1, je && (c = Me);
}
function Gr(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function Kr(e, t, n, i, a) {
	var o = !!(i & 8), s = t.length, c = e.items, l = Gr(e.effect.first), u, d = null, f, p = [], m = [], h, g, _, v;
	if (o) for (v = 0; v < s; v += 1) h = t[v], g = a(h, v), _ = c.get(g).e, _.f & 33554432 || (_.nodes?.a?.measure(), (f ??= /* @__PURE__ */ new Set()).add(_));
	for (v = 0; v < s; v += 1) {
		if (h = t[v], g = a(h, v), _ = c.get(g).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(_), t.done.delete(_);
		if (_.f & 8192 && (Rn(_), o && (_.nodes?.a?.unfix(), (f ??= /* @__PURE__ */ new Set()).delete(_))), _.f & 33554432) if (_.f ^= ee, _ === l) Jr(_, null, n);
		else {
			var y = d ? d.next : l;
			_ === e.effect.last && (e.effect.last = _.prev), _.prev && (_.prev.next = _.next), _.next && (_.next.prev = _.prev), Yr(e, d, _), Yr(e, _, y), Jr(_, y, n), d = _, p = [], m = [], l = Gr(d.next);
			continue;
		}
		if (_ !== l) {
			if (u !== void 0 && u.has(_)) {
				if (p.length < m.length) {
					var b = m[0], x;
					d = b.prev;
					var S = p[0], C = p[p.length - 1];
					for (x = 0; x < p.length; x += 1) Jr(p[x], b, n);
					for (x = 0; x < m.length; x += 1) u.delete(m[x]);
					Yr(e, S.prev, C.next), Yr(e, d, S), Yr(e, C, b), l = b, d = C, --v, p = [], m = [];
				} else u.delete(_), Jr(_, l, n), Yr(e, _.prev, _.next), Yr(e, _, d === null ? e.effect.first : d.next), Yr(e, d, _), d = _;
				continue;
			}
			for (p = [], m = []; l !== null && l !== _;) (u ??= /* @__PURE__ */ new Set()).add(l), m.push(l), l = Gr(l.next);
			if (l === null) continue;
		}
		_.f & 33554432 || p.push(_), d = _, l = Gr(_.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Hr(e, r(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (l !== null || u !== void 0) {
		var w = [];
		if (u !== void 0) for (_ of u) _.f & 8192 || w.push(_);
		for (; l !== null;) !(l.f & 8192) && l !== e.fallback && w.push(l), l = Gr(l.next);
		var T = w.length;
		if (T > 0) {
			var te = i & 4 && s === 0 ? n : null;
			if (o) {
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.measure();
				for (v = 0; v < T; v += 1) w[v].nodes?.a?.fix();
			}
			Vr(e, w, te);
		}
	}
	o && Ze(() => {
		if (f !== void 0) for (_ of f) _.nodes?.a?.apply();
	});
}
function qr(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? Zt(n) : /* @__PURE__ */ Qt(n, !1, !1) : null, l = o & 2 ? Zt(i) : null;
	return {
		v: c,
		i: l,
		e: kn(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function Jr(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ fn(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function Yr(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function K(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		je && (o = Ne(/* @__PURE__ */ dn(c)));
	}
	z(() => {
		var e = Jn;
		if (s === (s = t() ?? "")) {
			je && Pe();
			return;
		}
		if (n && !je) {
			e.nodes = null, c.innerHTML = s, s !== "" && jr(/* @__PURE__ */ dn(c), c.lastChild);
			return;
		}
		if (e.nodes !== null && (Pn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (je) {
				for (var a = Me.data, l = Pe(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ fn(l);
				if (l === null) throw ke(), Ee;
				jr(Me, u), o = Ne(l);
				return;
			}
			var d = hn(r ? "svg" : i ? "math" : "template", r ? D : i ? O : void 0);
			d.innerHTML = s;
			var f = r || i ? d : d.content;
			if (jr(/* @__PURE__ */ dn(f), f.lastChild), r || i) for (; /* @__PURE__ */ dn(f);) o.before(/* @__PURE__ */ dn(f));
			else o.before(f);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
var Xr = () => performance.now(), Zr = {
	tick: (e) => requestAnimationFrame(e),
	now: () => Xr(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
function Qr() {
	let e = Zr.now();
	Zr.tasks.forEach((t) => {
		t.c(e) || (Zr.tasks.delete(t), t.f());
	}), Zr.tasks.size !== 0 && Zr.tick(Qr);
}
function $r(e) {
	let t;
	return Zr.tasks.size === 0 && Zr.tick(Qr), {
		promise: new Promise((n) => {
			Zr.tasks.add(t = {
				c: e,
				f: n
			});
		}),
		abort() {
			Zr.tasks.delete(t);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
function ei(e, t) {
	ft(() => {
		e.dispatchEvent(new CustomEvent(t));
	});
}
function ti(e) {
	if (e === "float") return "cssFloat";
	if (e === "offset") return "cssOffset";
	if (e.startsWith("--")) return e;
	let t = e.split("-");
	return t.length === 1 ? t[0] : t[0] + t.slice(1).map((e) => e[0].toUpperCase() + e.slice(1)).join("");
}
function ni(e) {
	let t = {}, n = e.split(";");
	for (let e of n) {
		let [n, r] = e.split(":");
		if (!n || r === void 0) break;
		let i = ti(n.trim());
		t[i] = r.trim();
	}
	return t;
}
var ri = (e) => e;
function ii(e, t, n, r) {
	var i = !!(e & 1), a = !!(e & 2), o = i && a, s = !!(e & 4), c = o ? "both" : i ? "in" : "out", l, u = t.inert, d = t.style.overflow, f, p;
	function m() {
		return ft(() => l ??= n()(t, r?.() ?? {}, { direction: c }));
	}
	var h = {
		is_global: s,
		in() {
			if (t.inert = u, !i) {
				p?.abort(), p?.reset?.();
				return;
			}
			a || f?.abort(), f = ai(t, m(), p, 1, () => {
				ei(t, "introstart");
			}, () => {
				ei(t, "introend"), f?.abort(), f = l = void 0, t.style.overflow = d;
			});
		},
		out(e) {
			if (!a) {
				e?.(), l = void 0;
				return;
			}
			t.inert = !0, p = ai(t, m(), f, 0, () => {
				ei(t, "outrostart");
			}, () => {
				ei(t, "outroend"), e?.();
			});
		},
		stop: () => {
			f?.abort(), p?.abort();
		}
	}, g = Jn;
	if ((g.nodes.t ??= []).push(h), i && Pr) {
		var _ = s;
		if (!_) {
			for (var v = g.parent; v && v.f & 65536;) for (; (v = v.parent) && !(v.f & 16););
			_ = !v || !!(v.f & 32768);
		}
		_ && Tn(() => {
			gr(() => h.in());
		});
	}
}
function ai(e, t, n, r, i, a) {
	var o = r === 1;
	if (d(t)) {
		var s, c = !1;
		return Ze(() => {
			c || (s = ai(e, t({ direction: o ? "in" : "out" }), n, r, i, a));
		}), {
			abort: () => {
				c = !0, s?.abort();
			},
			deactivate: () => s.deactivate(),
			reset: () => s.reset(),
			t: () => s.t()
		};
	}
	if (n?.deactivate(), !t?.duration && !t?.delay) return i(), a(), {
		abort: f,
		deactivate: f,
		reset: f,
		t: () => r
	};
	let { delay: l = 0, css: u, tick: p, easing: m = ri } = t;
	var h = [];
	if (o && n === void 0 && (p && p(0, 1), u)) {
		var g = ni(u(0, 1));
		h.push(g, g);
	}
	var _ = () => 1 - r, v = e.animate(h, {
		duration: l,
		fill: "forwards"
	});
	return v.onfinish = () => {
		v.cancel(), i();
		var o = n?.t() ?? 1 - r;
		n?.abort();
		var s = r - o, c = t.duration * Math.abs(s), l = [];
		if (c > 0) {
			var d = !1;
			if (u) for (var f = Math.ceil(c / (1e3 / 60)), h = 0; h <= f; h += 1) {
				var g = o + s * m(h / f), y = ni(u(g, 1 - g));
				l.push(y), d ||= y.overflow === "hidden";
			}
			d && (e.style.overflow = "hidden"), _ = () => {
				var e = v.currentTime;
				return o + s * m(e / c);
			}, p && $r(() => {
				if (v.playState !== "running") return !1;
				var e = _();
				return p(e, 1 - e), !0;
			});
		}
		v = e.animate(l, {
			duration: c,
			fill: "forwards"
		}), v.onfinish = () => {
			_ = () => r, p?.(r, 1 - r), a();
		};
	}, {
		abort: () => {
			v && (v.cancel(), v.effect = null, v.onfinish = f);
		},
		deactivate: () => {
			a = f;
		},
		reset: () => {
			r === 0 && p?.(1, 0);
		},
		t: () => _()
	};
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var oi = [..." 	\n\r\f\xA0\v﻿"];
function si(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || oi.includes(r[o - 1])) && (s === r.length || oi.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function ci(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function li(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ui(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(li)), i && c.push(...Object.keys(i).map(li));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = li(e.substring(l, u).trim());
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
		return r && (n += ci(r)), i && (n += ci(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
function di(e, t, n, r, i, a) {
	var o = e[le];
	if (je || o !== n || o === void 0) {
		var s = si(n, r, a);
		(!je || s !== e.getAttribute("class")) && (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[le] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
function fi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function pi(e, t, n, r) {
	var i = e[ue];
	if (je || i !== t) {
		var a = ui(t, r);
		(!je || a !== e.getAttribute("style")) && (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[ue] = t;
	} else r && (Array.isArray(r) ? (fi(e, n?.[0], r[0]), fi(e, n?.[1], r[1], "important")) : fi(e, n, r));
	return r;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
var mi = Symbol("is custom element"), hi = Symbol("is html"), gi = me ? "link" : "LINK", _i = me ? "progress" : "PROGRESS";
function q(e) {
	if (je) {
		var t = !1, n = () => {
			if (!t) {
				if (t = !0, e.hasAttribute("value")) {
					var n = e.value;
					Y(e, "value", null), e.value = n;
				}
				if (e.hasAttribute("checked")) {
					var r = e.checked;
					Y(e, "checked", null), e.checked = r;
				}
			}
		};
		e[fe] = n, Ze(n), dt();
	}
}
function J(e, t) {
	var n = yi(e);
	n.value !== (n.value = t ?? void 0) && (e.value !== t || t === 0 && e.nodeName === _i) && (e.value = t ?? "");
}
function vi(e, t) {
	var n = yi(e);
	n.checked !== (n.checked = t ?? void 0) && (e.checked = t);
}
function Y(e, t, n, r) {
	var i = yi(e);
	je && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === gi) || i[t] !== (i[t] = n) && (t === "loading" && (e[se] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && xi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function yi(e) {
	return e[ce] ??= {
		[mi]: e.nodeName.includes("-"),
		[hi]: e.namespaceURI === De
	};
}
var bi = /* @__PURE__ */ new Map();
function xi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = bi.get(t);
	if (n) return n;
	bi.set(t, n = []);
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var s in r = o(i), r) r[s].set && s !== "innerHTML" && s !== "textContent" && s !== "innerText" && n.push(s);
		i = l(i);
	}
	return n;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function Si(e, t, n = t) {
	var r = /* @__PURE__ */ new WeakSet();
	pt(e, "input", async (i) => {
		var a = i ? e.defaultValue : e.value;
		if (a = Ci(e) ? wi(a) : a, n(a), N !== null && r.add(N), await pr(), a !== (a = t())) {
			var o = e.selectionStart, s = e.selectionEnd, c = e.value.length;
			if (e.value = a ?? "", s !== null) {
				var l = e.value.length;
				o === s && s === c && l > c ? (e.selectionStart = l, e.selectionEnd = l) : (e.selectionStart = o, e.selectionEnd = Math.min(s, l));
			}
		}
	}), (je && e.defaultValue !== e.value || gr(t) == null && e.value) && (n(Ci(e) ? wi(e.value) : e.value), N !== null && r.add(N)), Dn(() => {
		var n = t();
		if (e === document.activeElement) {
			var i = N;
			if (r.has(i)) return;
		}
		Ci(e) && n === wi(e.value) || e.type === "date" && !n && !e.value || n !== e.value && (e.value = n ?? "");
	});
}
function Ci(e) {
	var t = e.type;
	return t === "number" || t === "range";
}
function wi(e) {
	return e === "" ? null : +e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Ti(e, t) {
	return e === t || e?.[ae] === t;
}
function Ei(e = {}, t, n, r) {
	var i = We.r, a = Jn;
	return Tn(() => {
		var o, s;
		return Dn(() => {
			o = s, s = r?.() || [], gr(() => {
				Ti(n(...s), e) || (t(e, ...s), o && Ti(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Ti(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
function Di(e, t, n, r) {
	var i = !0, o = !!(n & 8), s = !!(n & 16), c = r, l = !0, u = void 0, d = () => s && i ? (u ??= /* @__PURE__ */ j(r), B(u)) : (l && (l = !1, c = s ? gr(r) : r), c);
	let f;
	if (o) {
		var p = ae in e || oe in e;
		f = a(e, t)?.set ?? (p && t in e ? (n) => e[t] = n : void 0);
	}
	var m, h = !1;
	o ? [m, h] = st(() => e[t]) : m = e[t], m === void 0 && r !== void 0 && (m = d(), f && (i && xe(t), f(m)));
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
	var v = !1, y = (n & 1 ? j : wt)(() => (v = !1, g()));
	o && B(y);
	var b = Jn;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? B(y) : i && o ? rn(e) : e;
			return F(y, n), v = !0, c !== void 0 && (c = n), e;
		}
		return Un && v || b.f & 16384 ? y.v : B(y);
	});
}
var Oi = {
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
		"deling.share": "Del på {service}",
		"deling.email": "Del på e-post",
		"deling.copy": "Kopier lenke",
		"deling.copied": "Kopiert!",
		"nedteller.days": "dager",
		"nedteller.hours": "timer",
		"nedteller.minutes": "minutter",
		"nedteller.seconds": "sekunder",
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
}, ki = [
	"nb",
	"nn",
	"en-GB",
	"se",
	"tr"
], Ai = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, ji = {
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
function Mi(e) {
	let t = String(e ?? "").trim().toLowerCase();
	for (let [e, n] of Object.entries(ji)) if (n.some((e) => t === e || t.startsWith(`${e}-`))) return e;
	return null;
}
function Ni(e) {
	return ki.includes(String(e ?? ""));
}
function Pi(e) {
	let t = [];
	if (!Array.isArray(e)) return ["languages må være en liste"];
	for (let n of e) {
		if (!n || typeof n != "object" || Array.isArray(n)) {
			t.push("languages: hvert innslag må være et objekt");
			continue;
		}
		let e = String(n.code ?? "");
		Ai.test(e) ? Ni(e) && t.push(`languages: '${e}' er innebygd i Urd og kan ikke overstyres`) : t.push(`languages: '${e}' er ikke en gyldig språkkode`), (typeof n.name != "string" || !n.name.trim()) && t.push(`languages/${e}: name mangler (språkets eget navn)`);
		for (let r of ["site", "admin"]) n[r] !== void 0 && typeof n[r] != "boolean" && t.push(`languages/${e}: ${r} må være boolsk`);
		n.site !== !0 && n.admin !== !0 && t.push(`languages/${e}: må dekke site, admin eller begge`);
	}
	return t;
}
function Fi(e) {
	let t = Mi(e);
	if (t) return t;
	let n = String(e ?? "").trim();
	return Ai.test(n) ? n : "nb";
}
async function Ii(e, t) {
	try {
		return await (await import(
			/* @vite-ignore */
			"/assets/urd/language-packs.js"
)).loadPackStrings(e, t);
	} catch {
		return null;
	}
}
({ ...Oi.strings });
var Li = {
	lang: "nb",
	dict: {}
};
function Ri(e, t) {
	if (!t) return e;
	let n = e;
	for (let [e, r] of Object.entries(t)) n = n.replaceAll(`{${e}}`, String(r));
	return n;
}
function X(e, t) {
	return Ri(Li.dict[e] ?? e, t);
}
function zi(e) {
	let t = `api.${e?.code}`;
	return e?.code && Li.dict[t] !== void 0 ? Ri(Li.dict[t], e) : e?.error ?? null;
}
function Bi() {
	return Li.lang;
}
function Vi() {
	let e = null;
	try {
		e = localStorage.getItem("urd-admin-lang");
	} catch {}
	if (e) return Fi(e);
	for (let e of navigator.languages ?? [navigator.language]) {
		let t = Mi(e);
		if (t) return t;
	}
	return "en-GB";
}
var Hi;
new Promise((e) => {
	Hi = e;
});
async function Ui(e = Vi()) {
	let t = async (e) => (await import(
		/* @vite-ignore */
		`/assets/urd/locales/admin/${e}.js`
)).default.strings;
	Li.lang = Fi(e);
	let n = Ni(Li.lang);
	try {
		Object.assign(Li.dict, await t("nb")), n && Li.lang !== "nb" && Object.assign(Li.dict, await t(Li.lang));
	} catch {}
	if (!n) {
		let e = await Ii(Li.lang, "admin");
		e ? Object.assign(Li.dict, e) : Li.lang = "nb";
	}
	return Hi(Li.lang), Li.lang;
}
//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/transition/index.js
function Wi(e) {
	let t = e - 1;
	return t * t * t + 1;
}
function Gi(e) {
	let t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"];
}
function Ki(e, { delay: t = 0, duration: n = 400, easing: r = Wi, x: i = 0, y: a = 0, opacity: o = 0 } = {}) {
	let s = getComputedStyle(e), c = +s.opacity, l = s.transform === "none" ? "" : s.transform, u = c * (1 - o), [d, f] = Gi(i), [p, m] = Gi(a);
	return {
		delay: t,
		duration: n,
		easing: r,
		css: (e, t) => `
			transform: ${l} translate(${(1 - e) * d}${f}, ${(1 - e) * p}${m});
			opacity: ${c - u * t}`
	};
}
//#endregion
//#region src/lib/draftStore.js
function qi(e, t, n) {
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
var Ji = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-clear svelte-zxiloo\">×</button>"), Yi = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-eye svelte-zxiloo\"><svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2l4 4-3 3-4-4 3-3z\"></path><path d=\"M15 5L4 16l-1 5 5-1L19 9\"></path></svg></button>"), Xi = /* @__PURE__ */ H("<input type=\"number\" min=\"0\" max=\"255\" class=\"svelte-zxiloo\"/>"), Zi = /* @__PURE__ */ H("<button type=\"button\"></button>"), Qi = /* @__PURE__ */ H("<span class=\"cp-label svelte-zxiloo\"> <!></span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), $i = /* @__PURE__ */ H("<span class=\"cp-saved svelte-zxiloo\"><button type=\"button\" class=\"cp-token svelte-zxiloo\"></button> <button type=\"button\" class=\"cp-del svelte-zxiloo\">×</button></span>"), ea = /* @__PURE__ */ H("<span class=\"cp-tokens svelte-zxiloo\"></span>"), ta = /* @__PURE__ */ H("<button type=\"button\" class=\"cp-token svelte-zxiloo\"></button>"), na = /* @__PURE__ */ H("<span class=\"cp-label svelte-zxiloo\"> </span> <span class=\"cp-tokens svelte-zxiloo\"></span>", 1), ra = /* @__PURE__ */ H("<div class=\"cp-pop svelte-zxiloo\"><div class=\"cp-sv svelte-zxiloo\"><span class=\"cp-cursor svelte-zxiloo\"></span></div> <input class=\"cp-hue svelte-zxiloo\" type=\"range\" min=\"0\" max=\"360\" step=\"1\"/> <input class=\"cp-alpha svelte-zxiloo\" type=\"range\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"cp-row svelte-zxiloo\"><span class=\"cp-preview svelte-zxiloo\"></span> <input class=\"cp-hex svelte-zxiloo\" spellcheck=\"false\"/> <!></span> <span class=\"cp-row cp-rgb svelte-zxiloo\"></span> <!> <span class=\"cp-label cp-label-row svelte-zxiloo\"> <button type=\"button\" class=\"cp-add svelte-zxiloo\">+</button></span> <!> <!></div>"), ia = /* @__PURE__ */ H("<span class=\"cp svelte-zxiloo\"><button type=\"button\"></button> <!> <!></span>");
function aa(e, t) {
	Ke(t, !0);
	let n = Di(t, "value", 3, "#000000"), r = Di(t, "tokens", 19, () => []), i = Di(t, "label", 19, () => X("cp.pickColor")), a = Di(t, "allowClear", 3, !1), o = "urd-recent-colors", s = "urd-saved-colors", c = () => {
		let e = r().find(([e]) => e === n());
		return e ? e[1] : n();
	}, l = () => r().find(([e]) => e === n())?.[0] ?? null, u = /* @__PURE__ */ P(rn([])), d = /* @__PURE__ */ P(rn([])), f = "", p = "", m = /* @__PURE__ */ P(null), g = /* @__PURE__ */ P(!1), _ = /* @__PURE__ */ P(rn({
		top: 0,
		left: 0
	})), v = /* @__PURE__ */ P(0), y = /* @__PURE__ */ P(0), b = /* @__PURE__ */ P(1), x = /* @__PURE__ */ P(1), S = /* @__PURE__ */ P("#000000");
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
	function te() {
		return w(...ee(B(v), B(y), B(b)));
	}
	function ne() {
		let e = te();
		return B(x) >= .995 ? e : e + Math.round(B(x) * 255).toString(16).padStart(2, "0");
	}
	function re() {
		F(S, ne(), !0), p = B(S), t.onchange?.(B(S));
	}
	function ie(e) {
		let t = C(e);
		return t ? (((e) => {
			var t = h(e, 3);
			F(v, t[0], !0), F(y, t[1], !0), F(b, t[2], !0);
		})(T(t[0], t[1], t[2])), F(x, t[3], !0), F(S, ne(), !0), !0) : !1;
	}
	function ae() {
		ie(c()) || ie("#000000"), f = n(), p = "";
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
		let e = B(m).getBoundingClientRect(), t = B(m).closest(".panel-body")?.getBoundingClientRect(), r = t ? t.right : window.innerWidth, i = Math.max(8, Math.min(e.right - 236, r - 236 - 8)), a = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		F(_, {
			top: a,
			left: i
		}, !0), F(g, !0);
	}
	function oe() {
		if (F(g, !1), p && p !== f) {
			let e = [p, ...B(u).filter((e) => e !== p)].slice(0, 8);
			localStorage.setItem(o, JSON.stringify(e));
		}
	}
	function se(e, n) {
		ie(n), F(S, n, !0), t.onchange?.(e);
	}
	function ce(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect();
			F(y, Math.min(1, Math.max(0, (e.clientX - n.left) / n.width)), !0), F(b, 1 - Math.min(1, Math.max(0, (e.clientY - n.top) / n.height))), re();
		};
		n(e);
		let r = (e) => n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i);
	}
	function le(e) {
		ie(e.target.value) ? re() : F(S, te(), !0);
	}
	function ue(e) {
		return (C(te()) ?? [
			0,
			0,
			0
		])[e];
	}
	function de(e, t) {
		let n = C(te()) ?? [
			0,
			0,
			0
		];
		n[e] = Math.min(255, Math.max(0, Number(t) || 0)), ((e) => {
			var t = h(e, 3);
			F(v, t[0], !0), F(y, t[1], !0), F(b, t[2], !0);
		})(T(...n)), re();
	}
	let fe = typeof window < "u" && "EyeDropper" in window;
	async function pe() {
		try {
			ie((await new window.EyeDropper().open()).sRGBHex) && re();
		} catch {}
	}
	function me(e) {
		ie(e) && re();
	}
	function he() {
		let e = ne();
		B(d).includes(e) || (F(d, [e, ...B(d)].slice(0, 12), !0), localStorage.setItem(s, JSON.stringify(He(B(d)))));
	}
	function ge(e) {
		F(d, B(d).filter((t) => t !== e), !0), localStorage.setItem(s, JSON.stringify(He(B(d))));
	}
	Sn(() => {
		if (!B(g)) return;
		let e = (e) => {
			B(m) && !B(m).contains(e.target) && oe();
		}, t = (e) => {
			e.key === "Escape" && oe();
		}, n = () => oe();
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	var _e = ia(), ve = I(_e);
	let ye;
	var be = R(ve, 2), xe = (e) => {
		var n = Ji();
		z((e, t) => {
			Y(n, "title", e), Y(n, "aria-label", t);
		}, [() => X("cp.clearTitle"), () => X("cp.clear")]), V("click", n, () => t.onchange?.("")), U(e, n);
	};
	G(be, (e) => {
		a() && n() && e(xe);
	});
	var Se = R(be, 2), Ce = (e) => {
		var t = ra(), i = I(t), a = I(i);
		A(i);
		var o = R(i, 2);
		q(o);
		var s = R(o, 2);
		q(s);
		var c = R(s, 2), f = I(c), p = R(f, 2);
		q(p);
		var m = R(p, 2), g = (e) => {
			var t = Yi();
			z((e) => Y(t, "title", e), [() => X("cp.eyedropper")]), V("click", t, pe), U(e, t);
		};
		G(m, (e) => {
			fe && e(g);
		}), A(c);
		var C = R(c, 2);
		Wr(C, 22, () => [
			"R",
			"G",
			"B"
		], (e) => e, (e, t, n) => {
			var r = Xi();
			q(r), z((e) => {
				Y(r, "title", t), J(r, e);
			}, [() => ue(B(n))]), V("change", r, (e) => de(B(n), e.target.value)), U(e, r);
		}), A(C);
		var w = R(C, 2), T = (e) => {
			var t = Qi(), i = L(t), a = I(i, !0), o = R(a), s = (e) => {
				var t = Mr();
				z((e) => W(t, e), [() => X("cp.linkedSuffix", { token: l() })]), U(e, t);
			}, c = /* @__PURE__ */ M(() => l());
			G(o, (e) => {
				B(c) && e(s);
			}), A(i);
			var u = R(i, 2);
			Wr(u, 21, r, ([e, t]) => e, (e, t) => {
				var r = /* @__PURE__ */ M(() => h(B(t), 2));
				let i = () => B(r)[0], a = () => B(r)[1];
				var o = Zi();
				let s;
				z((e) => {
					s = di(o, 1, "cp-token svelte-zxiloo", null, s, { active: n() === i() }), pi(o, `background: ${a() ?? ""}`), Y(o, "title", e);
				}, [() => X("cp.tokenTitle", { name: i() })]), V("click", o, () => se(i(), a())), U(e, o);
			}), A(u), z((e) => W(a, e), [() => X("cp.themeColors")]), U(e, t);
		};
		G(w, (e) => {
			r().length && e(T);
		});
		var ee = R(w, 2), ne = I(ee), ie = R(ne);
		A(ee);
		var ae = R(ee, 2), oe = (e) => {
			var t = ea();
			Wr(t, 20, () => B(d), (e) => e, (e, t) => {
				var n = $i(), r = I(n), i = R(r, 2);
				A(n), z((e) => {
					pi(r, `background: ${t ?? ""}`), Y(r, "title", t), Y(i, "title", e);
				}, [() => X("cp.removeSaved")]), V("click", r, () => me(t)), V("click", i, () => ge(t)), U(e, n);
			}), A(t), U(e, t);
		};
		G(ae, (e) => {
			B(d).length && e(oe);
		});
		var _e = R(ae, 2), ve = (e) => {
			var t = na(), n = L(t), r = I(n, !0);
			A(n);
			var i = R(n, 2);
			Wr(i, 20, () => B(u), (e) => e, (e, t) => {
				var n = ta();
				z(() => {
					pi(n, `background: ${t ?? ""}`), Y(n, "title", t);
				}), V("click", n, () => me(t)), U(e, n);
			}), A(i), z((e) => W(r, e), [() => X("common.recent")]), U(e, t);
		};
		G(_e, (e) => {
			B(u).length && e(ve);
		}), A(t), z((e, n, r, c, l) => {
			pi(t, `top: ${B(_).top ?? ""}px; left: ${B(_).left ?? ""}px`), pi(i, `background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${B(v) ?? ""}, 100%, 50%)`), pi(a, `left: ${B(y) * 100}%; top: ${(1 - B(b)) * 100}%`), J(o, B(v)), J(s, e), Y(s, "title", n), pi(s, `background: linear-gradient(to right, transparent, ${r ?? ""}), repeating-conic-gradient(rgb(255 255 255 / 35%) 0 25%, rgb(0 0 0 / 35%) 0 50%) 0 0 / 10px 10px`), pi(f, `background: ${B(S) ?? ""}`), J(p, B(S)), W(ne, `${c ?? ""} `), Y(ie, "title", l);
		}, [
			() => Math.round(B(x) * 100),
			() => X("cp.alpha"),
			() => te(),
			() => X("cp.saved"),
			() => X("cp.saveTitle")
		]), V("click", t, (e) => e.preventDefault()), V("pointerdown", i, ce), V("input", o, (e) => {
			F(v, Number(e.target.value), !0), re();
		}), V("input", s, (e) => {
			F(x, Number(e.target.value) / 100), re();
		}), V("change", p, le), V("click", ie, he), U(e, t);
	};
	G(Se, (e) => {
		B(g) && e(Ce);
	}), A(_e), Ei(_e, (e) => F(m, e), () => B(m)), z((e, t, n) => {
		ye = di(ve, 1, "cp-swatch svelte-zxiloo", null, ye, e), pi(ve, `background: ${t ?? ""}`), Y(ve, "title", n), Y(ve, "aria-label", i());
	}, [
		() => ({
			linked: l(),
			"cp-empty": a() && !n()
		}),
		() => n() ? c() : "transparent",
		() => l() ? X("cp.linkedTitle", {
			label: i(),
			token: l()
		}) : i()
	]), V("click", ve, () => B(g) ? oe() : ae()), U(e, _e), qe();
}
Tr([
	"click",
	"pointerdown",
	"input",
	"change"
]);
//#endregion
//#region ../template/assets/engine/0.6.11/imageTools.js
var oa = 1600, sa = .82, ca = .6;
async function la(e, t = oa) {
	if (da(e)) return fa(await e.text());
	let n = await createImageBitmap(e), r = Math.min(1, t / Math.max(n.width, n.height)), i = Math.round(n.width * r), a = Math.round(n.height * r), o = document.createElement("canvas");
	o.width = i, o.height = a, o.getContext("2d").drawImage(n, 0, 0, i, a), n.close();
	let s = (e) => new Promise((t) => o.toBlob(t, "image/webp", e)), c = await s(sa);
	return c.size > 4e5 && (c = await s(ca)), {
		dataUrl: await new Promise((e) => {
			let t = new FileReader();
			t.onload = () => e(t.result), t.readAsDataURL(c);
		}),
		bytes: c.size,
		width: i,
		height: a
	};
}
var ua = "image/svg+xml";
function da(e) {
	return e.type === ua || /\.svg$/i.test(e.name || "");
}
function fa(e) {
	let t = String(e ?? "");
	if (!/<svg[\s>]/i.test(t)) throw Error("Ugyldig SVG");
	if (/<\s*script[\s>]/i.test(t) || /<\s*foreignObject[\s>]/i.test(t) || /\son[a-z]+\s*=/i.test(t) || /javascript:/i.test(t)) throw Error("SVG-en inneholder skript eller hendelser og kan ikke brukes");
	let n = new Blob([t]).size, r = `data:${ua};base64,${btoa(unescape(encodeURIComponent(t)))}`, i = t.match(/<svg\b[^>]*>/i)?.[0] ?? "", a = i.match(/viewBox\s*=\s*["']\s*([-\d.]+(?:[\s,]+[-\d.]+){3})\s*["']/i)?.[1]?.split(/[\s,]+/).map(Number);
	return {
		dataUrl: r,
		bytes: n,
		width: a?.length === 4 ? a[2] : Number.parseFloat(i.match(/\bwidth\s*=\s*["']?([\d.]+)/i)?.[1]) || 0,
		height: a?.length === 4 ? a[3] : Number.parseFloat(i.match(/\bheight\s*=\s*["']?([\d.]+)/i)?.[1]) || 0
	};
}
function pa(e, t, n = .04) {
	let r = String(e ?? "");
	if (!t || !(t.width > 0) || !(t.height > 0)) return r;
	let i = r.match(/<svg\b[^>]*>/i)?.[0];
	if (!i) return r;
	let a = (e) => Math.round(e * 1e3) / 1e3, o = Math.max(t.width, t.height) * Math.max(0, n), s = a(t.x - o), c = a(t.y - o), l = a(t.width + 2 * o), u = a(t.height + 2 * o), d = i.replace(/\sviewBox\s*=\s*["'][^"']*["']/i, "").replace(/\swidth\s*=\s*["'][^"']*["']/i, "").replace(/\sheight\s*=\s*["'][^"']*["']/i, "").replace(/<svg\b/i, `<svg viewBox="${s} ${c} ${l} ${u}" width="${l}" height="${u}"`);
	return r.replace(i, d);
}
function ma(e) {
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
function ha(e) {
	let t = e || "";
	if (/^data:image\/svg\+xml[;,]/.test(t)) return "svg";
	let n = t.match(/^data:audio\/([a-z0-9.+-]+)[;,]/i)?.[1]?.toLowerCase();
	return n ? {
		mpeg: "mp3",
		mp3: "mp3",
		mp4: "m4a",
		"x-m4a": "m4a",
		aac: "aac",
		wav: "wav",
		"x-wav": "wav",
		ogg: "ogg",
		webm: "webm",
		flac: "flac"
	}[n] ?? "mp3" : "webp";
}
function ga(e, t = "bilde") {
	return e.replace(/\.[^.]+$/, "").toLowerCase().replaceAll("æ", "ae").replaceAll("ø", "o").replaceAll("å", "a").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || t;
}
function _a(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) >>> 0;
	return t.toString(16).padStart(8, "0");
}
//#endregion
//#region ../template/assets/engine/0.6.11/glyphs.js
var va = "urd-recent-glyphs", ya = [
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
function ba(e, t) {
	return [t, ...(Array.isArray(e) ? e : []).filter((e) => e !== t)].slice(0, 16);
}
function xa() {
	try {
		let e = JSON.parse(localStorage.getItem("urd-recent-glyphs") ?? "[]");
		return Array.isArray(e) ? e : [];
	} catch {
		return [];
	}
}
function Sa(e) {
	let t = ba(xa(), e);
	try {
		localStorage.setItem(va, JSON.stringify(t));
	} catch {}
	return t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/icons.js
var Ca = "fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"", wa = "fill=\"currentColor\" stroke=\"none\"", Ta = {
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
}, Ea = [
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
function Da(e) {
	let t = typeof e == "string" ? Ta[e] : null;
	return t ? `<svg viewBox="0 0 24 24" width="100%" height="100%" ${t.fill ? wa : Ca} aria-hidden="true" focusable="false">${t.body}</svg>` : null;
}
//#endregion
//#region src/lib/GlyphPicker.svelte
var Oa = /* @__PURE__ */ H("<img class=\"gp-own svelte-15ln1c3\"/>"), ka = /* @__PURE__ */ H("<span class=\"gp-svg svelte-15ln1c3\"></span>"), Aa = /* @__PURE__ */ H("<button type=\"button\" class=\"gp-cell svelte-15ln1c3\"> </button>"), ja = /* @__PURE__ */ H("<div class=\"gp-group svelte-15ln1c3\"> </div> <div class=\"gp-grid svelte-15ln1c3\"></div>", 1), Ma = /* @__PURE__ */ H("<button type=\"button\"><span class=\"gp-svg svelte-15ln1c3\"></span></button>"), Na = /* @__PURE__ */ H("<button type=\"button\"> </button>"), Pa = /* @__PURE__ */ H("<div class=\"gp-group svelte-15ln1c3\"> </div> <button type=\"button\" class=\"ghost gp-upload svelte-15ln1c3\"> </button> <input type=\"file\" accept=\"image/*\" hidden=\"\"/> <p class=\"gp-hint svelte-15ln1c3\"> </p>", 1), Fa = /* @__PURE__ */ H("<div class=\"gp-pop svelte-15ln1c3\"><!> <!> <!> <!></div>"), Ia = /* @__PURE__ */ H("<span class=\"gp svelte-15ln1c3\"><button type=\"button\" class=\"gp-swatch svelte-15ln1c3\"><!></button> <!></span>");
function La(e, t) {
	Ke(t, !0);
	let n = Di(t, "value", 3, "★"), r = Di(t, "icon", 3, null), i = Di(t, "image", 3, null), a = Di(t, "label", 19, () => X("gp.pickGlyph")), o = /* @__PURE__ */ P(rn([])), s = /* @__PURE__ */ P(null), c = /* @__PURE__ */ P(null), l = /* @__PURE__ */ P(!1), u = /* @__PURE__ */ P(rn({
		top: 0,
		left: 0
	}));
	function d() {
		F(o, xa(), !0);
		let e = B(s).getBoundingClientRect(), t = Math.max(8, Math.min(e.right - 292, window.innerWidth - 292 - 8)), n = e.bottom + 380 + 8 > window.innerHeight ? Math.max(8, e.top - 380 - 8) : e.bottom + 6;
		F(u, {
			top: n,
			left: t
		}, !0), F(l, !0);
	}
	function f(e) {
		Sa(e), t.onpick?.(e), F(l, !1);
	}
	function p(e) {
		t.onicon?.(e), F(l, !1);
	}
	async function m(e) {
		let n = e.target.files?.[0];
		if (e.target.value = "", !n) return;
		let r = await la(n, 256);
		t.onimage?.(r.dataUrl), F(l, !1);
	}
	Sn(() => {
		if (!B(l)) return;
		let e = (e) => {
			B(s) && !B(s).contains(e.target) && F(l, !1);
		}, t = (e) => {
			e.key === "Escape" && F(l, !1);
		}, n = (e) => {
			B(s) && e.target instanceof Node && !B(s).contains(e.target) && F(l, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var g = Ia(), _ = I(g), v = I(_), y = (e) => {
		var t = Oa();
		z((e) => {
			Y(t, "src", i()), Y(t, "alt", e);
		}, [() => X("gp.ownIcon")]), U(e, t);
	}, b = (e) => {
		var t = ka();
		K(t, () => Da(r()), !0), A(t), U(e, t);
	}, x = (e) => {
		var t = Mr();
		z(() => W(t, n() || "★")), U(e, t);
	};
	G(v, (e) => {
		i() ? e(y) : r() && Ta[r()] ? e(b, 1) : e(x, -1);
	}), A(_);
	var S = R(_, 2), C = (e) => {
		var i = Fa(), a = I(i), s = (e) => {
			var t = ja(), n = L(t), r = I(n, !0);
			A(n);
			var i = R(n, 2);
			Wr(i, 20, () => B(o), (e) => e, (e, t) => {
				var n = Aa(), r = I(n, !0);
				A(n), z(() => W(r, t)), V("click", n, () => f(t)), U(e, n);
			}), A(i), z((e) => W(r, e), [() => X("common.recent")]), U(e, t);
		};
		G(a, (e) => {
			B(o).length && e(s);
		});
		var l = R(a, 2), d = (e) => {
			var t = Nr();
			Wr(L(t), 17, () => Ea, ([e, t]) => e, (e, t) => {
				var n = /* @__PURE__ */ M(() => h(B(t), 2));
				let i = () => B(n)[0], a = () => B(n)[1];
				var o = ja(), s = L(o), c = I(s, !0);
				A(s);
				var l = R(s, 2);
				Wr(l, 20, a, (e) => e, (e, t) => {
					var n = Ma();
					let i;
					var a = I(n);
					K(a, () => Da(t), !0), A(a), A(n), z(() => {
						i = di(n, 1, "gp-cell gp-cell-icon svelte-15ln1c3", null, i, { active: t === r() }), Y(n, "title", Ta[t].label);
					}), V("click", n, () => p(t)), U(e, n);
				}), A(l), z((e) => W(c, e), [() => X(i())]), U(e, o);
			}), U(e, t);
		};
		G(l, (e) => {
			t.onicon && e(d);
		});
		var g = R(l, 2);
		Wr(g, 17, () => ya, ([e, t]) => e, (e, t) => {
			var r = /* @__PURE__ */ M(() => h(B(t), 2));
			let i = () => B(r)[0], a = () => B(r)[1];
			var o = ja(), s = L(o), c = I(s, !0);
			A(s);
			var l = R(s, 2);
			Wr(l, 20, () => a().split(" "), (e) => e, (e, t) => {
				var r = Na();
				let i;
				var a = I(r, !0);
				A(r), z(() => {
					i = di(r, 1, "gp-cell svelte-15ln1c3", null, i, { active: t === n() }), W(a, t);
				}), V("click", r, () => f(t)), U(e, r);
			}), A(l), z((e) => W(c, e), [() => X(i())]), U(e, o);
		});
		var _ = R(g, 2), v = (e) => {
			var t = Pa(), n = L(t), r = I(n, !0);
			A(n);
			var i = R(n, 2), a = I(i, !0);
			A(i);
			var o = R(i, 2);
			Ei(o, (e) => F(c, e), () => B(c));
			var s = R(o, 2), l = I(s, !0);
			A(s), z((e, t, n) => {
				W(r, e), W(a, t), W(l, n);
			}, [
				() => X("gp.ownIcon"),
				() => X("gp.upload"),
				() => X("gp.uploadHint")
			]), V("click", i, () => B(c).click()), V("change", o, m), U(e, t);
		};
		G(_, (e) => {
			t.onimage && e(v);
		}), A(i), z(() => pi(i, `top: ${B(u).top ?? ""}px; left: ${B(u).left ?? ""}px`)), U(e, i);
	};
	G(S, (e) => {
		B(l) && e(C);
	}), A(g), Ei(g, (e) => F(s, e), () => B(s)), z(() => {
		Y(_, "title", a()), Y(_, "aria-label", a());
	}), V("click", _, () => B(l) ? F(l, !1) : d()), U(e, g), qe();
}
Tr(["click", "change"]);
//#endregion
//#region src/lib/previewBridge.js
function Ra(e, t = {}) {
	let n = (e) => {
		if (e.origin !== location.origin) return;
		let n = e.data;
		n?.type === "urd-edit" && t.onEdit?.(n), n?.type === "urd-move" && t.onMove?.(n), n?.type === "urd-grow" && t.onGrow?.(n), n?.type === "urd-delete" && t.onDelete?.(n), n?.type === "urd-add-section" && t.onAddSection?.(n), n?.type === "urd-move-section" && t.onMoveSection?.(n), n?.type === "urd-delete-section" && t.onDeleteSection?.(n), n?.type === "urd-section-size" && t.onSectionSize?.(n), n?.type === "urd-undo" && t.onUndo?.(n), n?.type === "urd-select-section" && t.onSelectSection?.(n), n?.type === "urd-select-block" && t.onSelectBlock?.(n), n?.type === "urd-block-menu" && t.onBlockMenu?.(n), n?.type === "urd-plugin-blocks" && t.onPluginBlocks?.(n), n?.type === "urd-ready" && t.onReady?.(n), n?.type === "urd-navigate" && t.onNavigate?.(n), n?.type === "urd-add-block" && t.onAddBlock?.(n), n?.type === "urd-add-blocks" && t.onAddBlocks?.(n), n?.type === "urd-request-block" && t.onRequestBlock?.(n), n?.type === "urd-move-block-section" && t.onMoveBlockSection?.(n), n?.type === "urd-mobile-reset" && t.onMobileReset?.(n), n?.type === "urd-mobile-order" && t.onMobileOrder?.(n), n?.type === "urd-review-done" && t.onReviewDone?.(n), n?.type === "urd-block-flag" && t.onBlockFlag?.(n), n?.type === "urd-collection-edit" && t.onCollectionEdit?.(n), n?.type === "urd-nav-width" && t.onNavWidth?.(n), n?.type === "urd-save-template" && t.onSaveTemplate?.(n), n?.type === "urd-sticky-group" && t.onStickyGroup?.(n), n?.type === "urd-sticky-dock" && t.onStickyDock?.(n), n?.type === "urd-delete-template" && t.onDeleteTemplate?.(n), n?.type === "urd-apply-layout" && t.onApplyLayout?.(n);
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
function za(e, t) {
	return !(e > 0) || !(t > 0) ? 1 : e / t;
}
function Ba(e, t, n, r = 0, i = 0) {
	if (n === "full") return 1;
	let a = i > 0 ? za(r, i) : Infinity;
	return Math.max(.1, Math.min(1, za(e, t), a));
}
var Va = 1920, Ha = [
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
], Ua = [
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
], Wa = [
	1920,
	1536,
	1366
];
function Ga(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 1440;
	let n = Math.round(t / 20) * 20;
	return Math.min(Va, Math.max(960, n));
}
function Ka(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return 6;
	let n = Math.round(t / 1) * 1;
	return Math.min(12, Math.max(0, n));
}
function qa(e, t) {
	if (e === "full") return 0;
	let n = Math.min(49, Math.max(0, Number(t) || 0));
	return Math.ceil(Number(e) / (1 - 2 * n / 100));
}
function Ja(e, t, n) {
	let r = Math.max(0, Number(t) || 0) / 100 * n, i = Math.max(0, n - 2 * r), a = e !== "full" && Number(e) < i, o = a ? Number(e) : i;
	return {
		width: o,
		margin: Math.round((n - o) / 2),
		pct: n > 0 ? o / n * 100 : 0,
		bound: a
	};
}
function Ya(e) {
	return Ua.find((t) => t.width === e)?.id ?? null;
}
//#endregion
//#region src/lib/Dropdown.svelte
var Xa = /* @__PURE__ */ H("<button type=\"button\"> </button>"), Za = /* @__PURE__ */ H("<div class=\"dd-pop svelte-vtocc6\"></div>"), Qa = /* @__PURE__ */ H("<span class=\"dd svelte-vtocc6\"><button type=\"button\" class=\"dd-btn svelte-vtocc6\"><span class=\"dd-value svelte-vtocc6\"> </span> <span class=\"dd-caret svelte-vtocc6\"> </span></button> <!></span>");
function Z(e, t) {
	Ke(t, !0);
	let n = Di(t, "value", 3, null), r = Di(t, "options", 19, () => []), i = Di(t, "title", 3, null), a = Di(t, "disabled", 3, !1), o = /* @__PURE__ */ P(!1), s = /* @__PURE__ */ P(null), c = /* @__PURE__ */ P(rn({
		top: 0,
		left: 0,
		width: 160
	})), l = () => r().find(([e]) => `${e ?? ""}` == `${n() ?? ""}`)?.[1] ?? "";
	function u() {
		let e = B(s).getBoundingClientRect(), t = Math.min(320, r().length * 32 + 12), n = Math.max(e.width, 160), i = e.bottom + t + 8 <= window.innerHeight;
		F(c, {
			top: i ? e.bottom + 4 : Math.max(8, e.top - t - 4),
			left: Math.max(8, Math.min(e.left, window.innerWidth - n - 8)),
			width: n
		}, !0);
	}
	function d() {
		if (!a()) {
			if (B(o)) {
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
		if (!B(o)) return;
		let e = (e) => {
			B(s) && !B(s).contains(e.target) && F(o, !1);
		}, t = (e) => {
			e.key === "Escape" && F(o, !1);
		}, n = (e) => {
			B(s) && e.target instanceof Node && !B(s).contains(e.target) && u();
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t, !0), document.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t, !0), document.removeEventListener("scroll", n, !0);
		};
	});
	var p = Qa(), m = I(p), g = I(m), _ = I(g, !0);
	A(g);
	var v = R(g, 2), y = I(v, !0);
	A(v), A(m);
	var b = R(m, 2), x = (e) => {
		var t = Za();
		Wr(t, 21, r, ([e, t]) => `${e ?? ""}`, (e, t) => {
			var r = /* @__PURE__ */ M(() => h(B(t), 2));
			let i = () => B(r)[0], a = () => B(r)[1];
			var o = Xa();
			let s;
			var c = I(o, !0);
			A(o), z(() => {
				s = di(o, 1, "dd-opt svelte-vtocc6", null, s, { valgt: `${i() ?? ""}` == `${n() ?? ""}` }), W(c, a());
			}), V("click", o, () => f(i())), U(e, o);
		}), A(t), z(() => pi(t, `top: ${B(c).top ?? ""}px; left: ${B(c).left ?? ""}px; min-width: ${B(c).width ?? ""}px`)), U(e, t);
	};
	G(b, (e) => {
		B(o) && e(x);
	}), A(p), Ei(p, (e) => F(s, e), () => B(s)), z((e) => {
		Y(m, "title", i()), m.disabled = a(), W(_, e), W(y, B(o) ? "▴" : "▾");
	}, [() => l()]), V("click", m, d), U(e, p), qe();
}
Tr(["click"]);
//#endregion
//#region src/lib/IconEditor.svelte
var $a = /* @__PURE__ */ H("<div class=\"ie-overlay svelte-e7sog7\" role=\"dialog\" aria-modal=\"true\"><div class=\"ie-card svelte-e7sog7\"><h2 class=\"svelte-e7sog7\"> </h2> <div class=\"ie-stage svelte-e7sog7\"><canvas class=\"ie-canvas svelte-e7sog7\"></canvas> <p class=\"ie-hint svelte-e7sog7\"> </p></div> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0.3\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <label class=\"ie-row svelte-e7sog7\"> <span class=\"ie-val svelte-e7sog7\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.02\" class=\"svelte-e7sog7\"/> <span class=\"ie-tools svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"ghost svelte-e7sog7\"> </button></span> <span class=\"ie-actions svelte-e7sog7\"><button type=\"button\" class=\"ghost svelte-e7sog7\"> </button> <button type=\"button\" class=\"primary svelte-e7sog7\"> </button></span></div></div>");
function eo(e, t) {
	Ke(t, !0);
	let n = Di(t, "image", 3, ""), r = /* @__PURE__ */ P(null), i = /* @__PURE__ */ P(null), a = /* @__PURE__ */ P(1), o = /* @__PURE__ */ P(.5), s = /* @__PURE__ */ P(.5), c = /* @__PURE__ */ P(1), l = /* @__PURE__ */ P(1), u = /* @__PURE__ */ P(1);
	Sn(() => {
		if (!n()) return;
		let e = new Image();
		e.onload = () => {
			F(i, e, !0);
		}, e.src = n();
	});
	function d(e, t) {
		if (e.clearRect(0, 0, t, t), !B(i)) return;
		e.filter = `brightness(${B(c)}) contrast(${B(l)}) saturate(${B(u)})`;
		let n = Math.max(t / B(i).width, t / B(i).height) * B(a), r = B(i).width * n, d = B(i).height * n, f = t / 2 - B(o) * r, p = t / 2 - B(s) * d;
		f = Math.min(0, Math.max(t - r, f)), p = Math.min(0, Math.max(t - d, p)), e.drawImage(B(i), f, p, r, d), e.filter = "none";
	}
	Sn(() => {
		B(i), B(a), B(o), B(s), B(c), B(l), B(u), B(r) && d(B(r).getContext("2d"), 220);
	});
	function f(e) {
		if (!B(i)) return;
		e.preventDefault();
		let t = e.clientX, n = e.clientY, r = Math.max(220 / B(i).width, 220 / B(i).height) * B(a), c = B(i).width * r, l = B(i).height * r, u = (e) => {
			F(o, Math.min(1, Math.max(0, B(o) - (e.clientX - t) / c)), !0), F(s, Math.min(1, Math.max(0, B(s) - (e.clientY - n) / l)), !0), t = e.clientX, n = e.clientY;
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
	var h = $a(), g = I(h), _ = I(g), v = I(_, !0);
	A(_);
	var y = R(_, 2), b = I(y);
	Y(b, "width", 220), Y(b, "height", 220), Ei(b, (e) => F(r, e), () => B(r));
	var x = R(b, 2), S = I(x, !0);
	A(x), A(y);
	var C = R(y, 2), w = I(C), T = R(w), ee = I(T);
	A(T), A(C);
	var te = R(C, 2);
	q(te);
	var ne = R(te, 2), re = I(ne), ie = R(re), ae = I(ie);
	A(ie), A(ne);
	var oe = R(ne, 2);
	q(oe);
	var se = R(oe, 2), ce = I(se), le = R(ce), ue = I(le);
	A(le), A(se);
	var de = R(se, 2);
	q(de);
	var fe = R(de, 2), pe = I(fe), me = R(pe), he = I(me);
	A(me), A(fe);
	var ge = R(fe, 2);
	q(ge);
	var _e = R(ge, 2), ve = I(_e), ye = I(ve, !0);
	A(ve);
	var be = R(ve, 2), xe = I(be, !0);
	A(be), A(_e);
	var Se = R(_e, 2), Ce = I(Se), we = I(Ce, !0);
	A(Ce);
	var Te = R(Ce, 2), Ee = I(Te, !0);
	A(Te), A(Se), A(g), A(h), z((e, t, n, r, i, a, o, s, c, l, u, d, f, p, m) => {
		W(v, e), Y(b, "title", t), W(S, n), W(w, `${r ?? ""} `), W(ee, `${i ?? ""}x`), W(re, `${a ?? ""} `), W(ae, `${o ?? ""}%`), W(ce, `${s ?? ""} `), W(ue, `${c ?? ""}%`), W(pe, `${l ?? ""} `), W(he, `${u ?? ""}%`), W(ye, d), W(xe, f), W(we, p), W(Ee, m);
	}, [
		() => X("ie.title"),
		() => X("ie.dragTip"),
		() => X("ie.hint"),
		() => X("lbl.zoom"),
		() => B(a).toFixed(2),
		() => X("lbl.brightness"),
		() => Math.round(B(c) * 100),
		() => X("lbl.contrast"),
		() => Math.round(B(l) * 100),
		() => X("lbl.saturate"),
		() => Math.round(B(u) * 100),
		() => X("ie.grayscale"),
		() => X("common.reset"),
		() => X("confirm.cancel"),
		() => X("common.apply")
	]), V("pointerdown", b, f), Si(te, () => B(a), (e) => F(a, e)), Si(oe, () => B(c), (e) => F(c, e)), Si(de, () => B(l), (e) => F(l, e)), Si(ge, () => B(u), (e) => F(u, e)), V("click", ve, () => F(u, 0)), V("click", be, p), V("click", Ce, () => t.oncancel?.()), V("click", Te, m), U(e, h), qe();
}
Tr(["pointerdown", "click"]);
var to = 24, no = {
	"oppsett-byttet": "layout-changed",
	"blokk-endret": "block-edited",
	"desktop-endret-etter-mobil": "desktop-changed-after-mobile",
	seksjonshøyde: "section-height",
	"blokk-flyttet": "block-moved",
	"blokk-slettet": "block-deleted",
	"blokk-lagt-til": "block-added"
};
function ro(e, t) {
	if (!e || !("y" in e || "h" in e)) return e ?? null;
	if (t && e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h) return null;
	let n = {
		x: e.x,
		w: e.w
	};
	return Number.isFinite(e.y) && (n.row = Math.max(1, Math.round((e.y - to) / 8) + 1), n.rows = Number.isFinite(e.h) ? Math.max(1, Math.ceil(e.h / 8)) : 1), Number.isFinite(e.z) && e.z !== 1 && (n.z = e.z), e.rot && (n.rot = e.rot), n;
}
var io = { 1: (e) => {
	for (let t of e.sections ?? []) {
		let e = t.responsive?.mobile;
		for (let e of t.blocks ?? []) e.decor && (e.hideMobile = !0), e.frames?.mobile && (e.frames.mobile = ro(e.frames.mobile, e.frames.desktop));
		e?.mode === "manual" && (e.mode = "auto");
		let n = e?.attention?.reason;
		n && no[n] && (e.attention.reason = no[n]);
	}
	return e;
} }, ao = {
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
function oo(e) {
	let t = structuredClone(e), n = t.schemaVersion ?? 1;
	for (; n < 3;) {
		let r = ao[n];
		if (typeof r != "function") return e;
		t = r(t) ?? t, n++, t.schemaVersion = n;
	}
	return t;
}
function so(e, t) {
	let n = structuredClone(e), r = n.schemaVersion ?? 1;
	for (; r < 2;) {
		let i = io[r];
		if (typeof i != "function") return e;
		n = i(n, t) ?? n, r++, n.schemaVersion = r;
	}
	return n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/plugins.js
function co(e) {
	let t = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(e).trim());
	return t ? [
		Number(t[1]),
		Number(t[2]),
		Number(t[3])
	] : null;
}
var lo = (e, t) => e[0] - t[0] || e[1] - t[1] || e[2] - t[2];
function uo(e, t) {
	let n = co(e);
	if (!n || typeof t != "string" || !t.trim()) return !1;
	for (let e of t.trim().split(/\s+/)) {
		let t = /^(>=|<=|>|<|=|\^|~)?(\d+\.\d+\.\d+)$/.exec(e);
		if (!t) return !1;
		let r = t[1] ?? "=", i = co(t[2]), a = lo(n, i);
		if (!(r === ">=" ? a >= 0 : r === ">" ? a > 0 : r === "<=" ? a <= 0 : r === "<" ? a < 0 : r === "^" ? i[0] === 0 ? n[0] === 0 && n[1] === i[1] && a >= 0 : n[0] === i[0] && a >= 0 : r === "~" ? n[0] === i[0] && n[1] === i[1] && a >= 0 : a === 0)) return !1;
	}
	return !0;
}
var fo = /^[a-z0-9][a-z0-9-]*$/;
function po(e) {
	let t = [];
	if (!e || typeof e != "object") return ["manifestet er ikke et objekt"];
	fo.test(e.id ?? "") || t.push("id mangler eller er ugyldig"), (typeof e.name != "string" || !e.name) && t.push("name mangler"), co(e.version ?? "") || t.push("version er ikke semver"), (typeof e.requiresEngine != "string" || !e.requiresEngine) && t.push("requiresEngine mangler");
	let n = Array.isArray(e.languages) && e.languages.length > 0;
	return (e.entry !== void 0 || !n) && (typeof e.entry != "string" || !e.entry.endsWith(".js")) && t.push("entry mangler eller er ikke en .js-fil"), (e.provides !== void 0 || !n) && (!e.provides || typeof e.provides != "object") && t.push("provides mangler"), e.languages !== void 0 && t.push(...Pi(e.languages)), e.locales !== void 0 && typeof e.locales != "boolean" && t.push("locales må være boolsk"), e.names !== void 0 && (typeof e.names != "object" || e.names === null || Array.isArray(e.names) || Object.values(e.names).some((e) => typeof e != "string" || !e)) && t.push("names må være et objekt med språkkode til navn"), t;
}
//#endregion
//#region ../template/assets/engine/0.6.11/sections/presets.js
function mo(e) {
	return typeof crypto < "u" && crypto.randomUUID ? `${e}-${crypto.randomUUID().slice(0, 8)}` : `${e}-${[...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var ho = () => ({ mobile: {
	mode: "auto",
	attention: null
} }), Q = (e, t, n, r, i = 1) => ({
	desktop: {
		x: e,
		y: t,
		w: n,
		h: r,
		z: i,
		rot: 0
	},
	mobile: null
}), go = (e, t, n = {}) => ({
	id: mo("blk"),
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
}), _o = (e, t = {}) => ({
	id: mo("blk"),
	type: "image",
	version: 1,
	props: {
		src: "",
		alt: X("seed.imageAlt"),
		fit: "cover",
		radius: "md",
		href: null,
		...t
	},
	animation: null,
	frames: e
}), vo = (e, t, n = {}) => ({
	id: mo("blk"),
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
}), yo = (e, t, n = 40) => ({
	id: mo("blk"),
	type: "icon",
	version: 1,
	props: {
		glyph: t,
		color: "accent",
		size: n
	},
	animation: null,
	frames: e
}), bo = () => ({
	type: "hover-lift",
	version: 1,
	props: {}
}), xo = (e, t, n = {}) => ({
	id: mo("blk"),
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
}), So = (e, t = {}) => ({
	id: mo("blk"),
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
}), Co = (e, t) => ({
	id: mo("blk"),
	type: "faq",
	version: 1,
	props: {
		items: t,
		multi: !1
	},
	animation: null,
	frames: e
}), wo = (e, t = {}) => ({
	id: mo("blk"),
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
}), To = (e, t) => ({
	id: mo("blk"),
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
}), Eo = (e, t = {}) => ({
	id: mo("blk"),
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
}), Do = (...e) => ({
	version: 1,
	layers: e
}), Oo = (e) => ({
	type: "color",
	version: 1,
	props: { value: e }
}), ko = (e, t, n, r = .5) => ({
	type: "glow",
	version: 1,
	props: {
		x: e,
		y: t,
		color: "accent",
		radius: r,
		opacity: n
	}
}), Ao = (e) => Math.max(0, ...e.blocks.map((e) => e.frames.desktop.y + e.frames.desktop.h)), jo = (e, t, n, r, i, a) => ({
	x: n + e % t * r,
	y: i + Math.floor(e / t) * a
}), Mo = (e, t, n, r, i, a, o, s, c = 0) => {
	let l = (t) => e.blocks.some((e) => {
		let n = e.frames.desktop;
		return n.x < t.x + t.w - .01 && t.x < n.x + n.w - .01 && n.y < t.y + t.h - .01 && t.y < n.y + n.h - .01;
	});
	for (let e = 0; e < 60; e++) {
		let u = jo(e, t, n, r, i, a);
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
		y: Ao(e) + 16,
		n: 0
	};
}, No = (e, t, n) => e + t * .1 + n * .01, Po = (e, t, n, r, i = null) => ({
	id: mo("sec"),
	version: 1,
	preset: e,
	size: { minHeight: t },
	grid: i,
	background: n,
	blocks: r,
	responsive: ho()
});
function Fo(e) {
	e.sections.define("tom", {
		label: "Tom seksjon",
		labelKey: "preset.tom.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Blankt lerret å bygge fritt på",
		hintKey: "preset.tom.hint",
		create: () => Po("tom", "40vh", Do(Oo("bg")), [])
	}), e.sections.define("hero", {
		label: "Hero",
		labelKey: "preset.hero.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Stor åpning med gradient og glød, venstrestilt",
		hintKey: "preset.hero.hint",
		create: () => Po("hero", "70vh", {
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
				ko(.7, .2, .35),
				{
					type: "grain",
					version: 1,
					props: { opacity: .06 }
				}
			]
		}, [
			go(Q(8.33, 40, 50, 38), X("seed.hero.title")),
			go(Q(8.33, 84, 41.67, 26), X("seed.hero.intro")),
			vo(Q(8.33, 118, 20, 32), X("seed.readMore"))
		])
	}), e.sections.define("hero-sentrert", {
		label: "Hero, sentrert",
		labelKey: "preset.hero-sentrert.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Sentrert åpning med to knapper",
		hintKey: "preset.hero-sentrert.hint",
		create: () => Po("hero-sentrert", "60vh", Do(Oo("bg")), [
			go(Q(15, 64, 70, 44), X("seed.heroCenter.title"), { align: "center" }),
			go(Q(25, 116, 50, 26), X("seed.heroCenter.intro"), { align: "center" }),
			vo(Q(31.5, 160, 17, 40), X("seed.join")),
			vo(Q(51.5, 160, 17, 40), X("seed.readMore"), { style: "secondary" })
		])
	}), e.sections.define("bilder", {
		label: "Bilder",
		labelKey: "preset.bilder.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Tittel og tre bilderammer",
		hintKey: "preset.bilder.hint",
		create: () => Po("bilder", "360px", Do(Oo("bg")), [
			go(Q(4, 24, 50, 32), X("seed.images.title")),
			_o(Q(4, 72, 28, 220)),
			_o(Q(36, 72, 28, 220)),
			_o(Q(68, 72, 28, 220))
		]),
		itemLabel: "bilde",
		itemLabelKey: "item.image",
		item: (e) => {
			let { x: t, y: n } = Mo(e, 3, 4, 32, 72, 244, 28, 220);
			return {
				blocks: [_o(Q(t, n, 28, 220))],
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
		create: () => Po("galleri", "440px", Do(Oo("bg")), [go(Q(4, 24, 50, 32), X("seed.gallery.title")), So(Q(4, 72, 92, 320))])
	}), e.sections.define("kontakt", {
		label: "Kontakt",
		labelKey: "preset.kontakt.label",
		group: "Grunnleggende",
		groupKey: "presetGroup.basic",
		hint: "Kontaktinfo i kort med e-postknapp",
		hintKey: "preset.kontakt.hint",
		create: () => Po("kontakt", "320px", Do(Oo("surface"), ko(.2, .8, .2)), [
			go(Q(10, 32, 40, 36), X("seed.contact.title")),
			go(Q(10, 84, 36, 130), X("seed.contact.info"), { box: !0 }),
			vo(Q(60, 100, 22, 40), X("seed.contact.button"), { href: "mailto:post@dinforening.no" })
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
				let i = yo(Q(e + 10.5, 88, 4, 52), n), a = go(Q(e, 152, 25, 200), X("seed.features.card", { title: r }), {
					align: "center",
					box: !0
				});
				return a.animation = bo(), i.mobileOrder = No(88, t, 0), a.mobileOrder = No(88, t, 1), [i, a];
			};
			return Po("funksjonskort", "420px", Do(Oo("bg")), [
				go(Q(6, 28, 60, 38), X("seed.features.title")),
				...e(6, 0, "✦", X("seed.features.card1")),
				...e(37.5, 1, "★", X("seed.features.card2")),
				...e(69, 2, "✓", X("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Mo(e, 3, 6, 31.5, 152, 296, 25, 264, -64), i = yo(Q(t + 10.5, n - 64, 4, 52), "✦"), a = go(Q(t, n, 25, 200), X("seed.features.card", { title: X("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return a.animation = bo(), i.mobileOrder = No(88, r, 0), a.mobileOrder = No(88, r, 1), {
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
				let r = go(Q(e, 88, 25, 200), X("seed.features.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.animation = bo(), r.mobileOrder = No(88, t, 0), r;
			};
			return Po("funksjonskort-enkel", "360px", Do(Oo("bg")), [
				go(Q(6, 28, 60, 38), X("seed.features.title")),
				e(6, 0, X("seed.features.card1")),
				e(37.5, 1, X("seed.features.card2")),
				e(69, 2, X("seed.features.card3"))
			]);
		},
		itemLabel: "kort",
		itemLabelKey: "item.card",
		item: (e) => {
			let { x: t, y: n, n: r } = Mo(e, 3, 6, 31.5, 88, 232, 25, 200), i = go(Q(t, n, 25, 200), X("seed.features.card", { title: X("seed.features.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.animation = bo(), i.mobileOrder = No(88, r, 0), {
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
				let n = _o(Q(e, 88, 25, 160)), r = go(Q(e, 256, 25, 160), X("seed.news.card"));
				return n.mobileOrder = No(88, t, 0), r.mobileOrder = No(88, t, 1), [n, r];
			};
			return Po("nyheter", "460px", Do(Oo("bg")), [
				go(Q(6, 28, 50, 38), X("seed.news.title")),
				vo(Q(78, 30, 16, 36), X("seed.news.seeAll"), { style: "secondary" }),
				...e(6, 0),
				...e(37.5, 1),
				...e(69, 2)
			]);
		},
		itemLabel: "sak",
		itemLabelKey: "item.story",
		item: (e) => {
			let { x: t, y: n, n: r } = Mo(e, 3, 6, 31.5, 88, 344, 25, 328), i = _o(Q(t, n, 25, 160)), a = go(Q(t, n + 168, 25, 160), X("seed.news.card"));
			return i.mobileOrder = No(88, r, 0), a.mobileOrder = No(88, r, 1), {
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
		create: () => Po("nyheter-samling", "300px", Do(Oo("bg")), [go(Q(6, 28, 50, 38), X("seed.news.title")), xo(Q(6, 88, 88, 180), "cards")])
	}), e.sections.define("oppslagstavle", {
		label: "Oppslagstavle",
		labelKey: "preset.oppslagstavle.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Datert liste fra en samling (oppslag/kunngjøringer)",
		hintKey: "preset.oppslagstavle.hint",
		create: () => Po("oppslagstavle", "300px", Do(Oo("surface")), [go(Q(6, 28, 50, 38), X("seed.noticeboard.title")), xo(Q(6, 88, 88, 180), "list", { limit: 8 })])
	}), e.sections.define("publikasjonsarkiv", {
		label: "Publikasjonsarkiv",
		labelKey: "preset.publikasjonsarkiv.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "År-gruppert arkiv fra en samling (utgaver, referater, rapporter)",
		hintKey: "preset.publikasjonsarkiv.hint",
		create: () => Po("publikasjonsarkiv", "300px", Do(Oo("bg")), [go(Q(6, 28, 60, 38), X("seed.archive.title")), xo(Q(6, 88, 88, 180), "archive", { limit: 0 })])
	}), e.sections.define("arrangementer", {
		label: "Arrangementer",
		labelKey: "preset.arrangementer.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Tre rader med dato-badge og påmeldingsknapp",
		hintKey: "preset.arrangementer.hint",
		create: () => {
			let e = (e, t, n, r) => [
				go(Q(6, e, 8, 88), X("seed.events.dateBadge", {
					day: t,
					month: n
				}), {
					align: "center",
					box: !0
				}),
				go(Q(16, e, 58, 88), X("seed.events.row", { title: r })),
				vo(Q(78, e + 24, 16, 40), X("seed.events.signup"), { style: "secondary" })
			];
			return Po("arrangementer", "440px", Do(Oo("surface")), [
				go(Q(6, 28, 50, 38), X("seed.events.title")),
				...e(88, "11", X("seed.events.monthAug"), X("seed.events.row1")),
				...e(196, "25", X("seed.events.monthAug"), X("seed.events.row2")),
				...e(304, "8", X("seed.events.monthSep"), X("seed.events.row3"))
			]);
		},
		itemLabel: "rad",
		itemLabelKey: "item.row",
		item: (e) => {
			let t = Ao(e) + 16;
			return {
				blocks: [
					go(Q(6, t, 8, 88), X("seed.events.newBadge"), {
						align: "center",
						box: !0
					}),
					go(Q(16, t, 58, 88), X("seed.events.row", { title: X("seed.events.newTitle") })),
					vo(Q(78, t + 24, 16, 40), X("seed.events.signup"), { style: "secondary" })
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
				let r = _o(Q(e, 80, 22, 180), { alt: X("seed.team.alt") }), i = go(Q(e, 268, 22, 84), X("seed.team.member", { role: n }), { align: "center" });
				return r.mobileOrder = No(80, t, 0), i.mobileOrder = No(80, t, 1), [r, i];
			};
			return Po("team", "420px", Do(Oo("surface")), [
				go(Q(6, 24, 50, 32), X("seed.team.title")),
				...e(7.5, 0, X("seed.team.role1")),
				...e(39, 1, X("seed.team.role2")),
				...e(70.5, 2, X("seed.team.role3"))
			]);
		},
		itemLabel: "person",
		itemLabelKey: "item.person",
		item: (e) => {
			let { x: t, y: n, n: r } = Mo(e, 3, 7.5, 31.5, 80, 288, 22, 272), i = _o(Q(t, n, 22, 180), { alt: X("seed.team.alt") }), a = go(Q(t, n + 188, 22, 84), X("seed.team.member", { role: X("seed.team.roleNew") }), { align: "center" });
			return i.mobileOrder = No(80, r, 0), a.mobileOrder = No(80, r, 1), {
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
		create: () => Po("faq", "520px", Do(Oo("bg")), [
			go(Q(25, 24, 50, 36), X("seed.faq.title"), { align: "center" }),
			Co(Q(20, 80, 60, 320), [
				{
					q: X("seed.faq.q1"),
					a: X("seed.faq.answer")
				},
				{
					q: X("seed.faq.q2"),
					a: X("seed.faq.answer")
				},
				{
					q: X("seed.faq.q3"),
					a: X("seed.faq.answer")
				}
			]),
			go(Q(20, 416, 60, 32), X("seed.faq.more"), { align: "center" })
		])
	}), e.sections.define("tidslinje", {
		label: "Tidslinje",
		labelKey: "preset.tidslinje.label",
		group: "Kort og lister",
		groupKey: "presetGroup.cards",
		hint: "Historien som hendelser langs en linje",
		hintKey: "preset.tidslinje.hint",
		create: () => Po("tidslinje", "480px", Do(Oo("bg")), [go(Q(25, 24, 50, 36), X("seed.tidslinje.title"), { align: "center" }), To(Q(25, 88, 50, 330), [
			{
				year: "2019",
				title: X("seed.tidslinje.t1"),
				text: X("seed.tidslinje.text")
			},
			{
				year: "2022",
				title: X("seed.tidslinje.t2"),
				text: X("seed.tidslinje.text")
			},
			{
				year: "2026",
				title: X("seed.tidslinje.t3"),
				text: X("seed.tidslinje.text")
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
				let r = go(Q(e, 88, 25, 72), `<h3>${t + 1}</h3>`, {
					align: "center",
					size: 44
				}), i = go(Q(e, 168, 25, 160), X("seed.steps.card", { title: n }), {
					align: "center",
					box: !0
				});
				return r.mobileOrder = No(88, t, 0), i.mobileOrder = No(88, t, 1), [r, i];
			};
			return Po("steg", "400px", Do(Oo("bg")), [
				go(Q(6, 28, 60, 38), X("seed.steps.title")),
				...e(6, 0, X("seed.steps.s1")),
				...e(37.5, 1, X("seed.steps.s2")),
				...e(69, 2, X("seed.steps.s3"))
			]);
		},
		itemLabel: "steg",
		itemLabelKey: "item.step",
		item: (e) => {
			let { x: t, y: n, n: r } = Mo(e, 3, 6, 31.5, 88, 272, 25, 240), i = go(Q(t, n, 25, 72), `<h3>${r + 1}</h3>`, {
				align: "center",
				size: 44
			}), a = go(Q(t, n + 80, 25, 160), X("seed.steps.card", { title: X("seed.steps.newTitle") }), {
				align: "center",
				box: !0
			});
			return i.mobileOrder = No(88, r, 0), a.mobileOrder = No(88, r, 1), {
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
				_o(Q(6, 40, 55, 300)),
				go(Q(6, 348, 55, 108), X("seed.feature.main")),
				vo(Q(6, 464, 14, 38), X("seed.readMore"), { style: "secondary" }),
				_o(Q(66, 40, 28, 120)),
				go(Q(66, 164, 28, 60), X("seed.feature.small1")),
				_o(Q(66, 244, 28, 120)),
				go(Q(66, 368, 28, 60), X("seed.feature.small2"))
			];
			return e.forEach((e, t) => {
				e.mobileOrder = No(40, t < 3 ? 0 : 1, t);
			}), Po("hovedoppslag", "540px", Do(Oo("bg")), e);
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
					_o(Q(e, 88, 25, 200)),
					go(Q(e, 296, 25, 76), X("seed.products.card", {
						name: n,
						price: r
					}), { align: "center" }),
					vo(Q(e + 5, 380, 15, 40), X("seed.products.buy"))
				];
				return i.forEach((e, n) => {
					e.mobileOrder = No(88, t, n);
				}), i;
			};
			return Po("produkter", "470px", Do(Oo("bg")), [
				go(Q(6, 28, 50, 38), X("seed.products.title")),
				...e(6, 0, X("seed.products.name"), X("seed.products.price1")),
				...e(37.5, 1, X("seed.products.name"), X("seed.products.price2")),
				...e(69, 2, X("seed.products.name"), X("seed.products.price3"))
			]);
		},
		itemLabel: "produkt",
		itemLabelKey: "item.product",
		item: (e) => {
			let { x: t, y: n, n: r } = Mo(e, 3, 6, 31.5, 88, 348, 25, 332), i = [
				_o(Q(t, n, 25, 200)),
				go(Q(t, n + 208, 25, 76), X("seed.products.card", {
					name: X("seed.products.name"),
					price: X("seed.products.price1")
				}), { align: "center" }),
				vo(Q(t + 5, n + 292, 15, 40), X("seed.products.buy"))
			];
			return i.forEach((e, t) => {
				e.mobileOrder = No(88, r, t);
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
		create: () => Po("cta", "280px", Do(Oo("surface"), ko(.5, .5, .3, .7)), [
			go(Q(20, 56, 60, 40), X("seed.cta.title"), { align: "center" }),
			go(Q(25, 104, 50, 26), X("seed.cta.sub"), { align: "center" }),
			vo(Q(42, 148, 16, 42), X("seed.join"))
		])
	}), e.sections.define("sitat", {
		label: "Sitat",
		labelKey: "preset.sitat.label",
		group: "Fremheving",
		groupKey: "presetGroup.highlight",
		hint: "Stort sitat med attribusjon",
		hintKey: "preset.sitat.hint",
		create: () => Po("sitat", "300px", Do(Oo("bg")), [wo(Q(20, 56, 60, 190), {
			text: X("seed.sitat.text"),
			attribution: X("seed.sitat.name"),
			role: X("seed.sitat.role")
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
				let a = Eo(Q(e, 76, 25, 120), {
					value: n,
					suffix: r,
					label: i
				});
				return a.mobileOrder = No(76, t, 0), a;
			};
			return Po("statistikk", "260px", Do(Oo("surface")), [
				e(6, 0, "120", "+", X("seed.stats.l1")),
				e(37.5, 1, "25", "", X("seed.stats.l2")),
				e(69, 2, "1981", "", X("seed.stats.l3"))
			]);
		},
		itemLabel: "tall",
		itemLabelKey: "item.number",
		item: (e) => {
			let { x: t, y: n, n: r } = Mo(e, 3, 6, 31.5, 76, 140, 25, 120), i = Eo(Q(t, n, 25, 120), {
				value: "42",
				label: X("seed.stats.newLabel")
			});
			return i.mobileOrder = No(76, r, 0), {
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
			let e = (e) => _o(Q(e, 108, 18.5, 100), {
				alt: X("seed.sponsors.alt"),
				fit: "contain",
				radius: null,
				saturate: 0
			});
			return Po("sponsorer", "280px", Do(Oo("bg")), [
				go(Q(6, 28, 60, 36), X("seed.sponsors.title")),
				e(5.5),
				e(29),
				e(52.5),
				e(76)
			]);
		},
		itemLabel: "logo",
		itemLabelKey: "item.logo",
		item: (e) => {
			let { x: t, y: n } = Mo(e, 4, 5.5, 23.5, 108, 124, 18.5, 100);
			return {
				blocks: [_o(Q(t, n, 18.5, 100), {
					alt: X("seed.sponsors.alt"),
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
		create: () => Po("medlemskap", "500px", Do(Oo("surface")), [
			go(Q(6, 28, 50, 38), X("seed.membership.title")),
			go(Q(14, 88, 32, 250), X("seed.membership.tier1"), {
				align: "center",
				box: !0
			}),
			go(Q(54, 88, 32, 250), X("seed.membership.tier2"), {
				align: "center",
				box: !0
			}),
			vo(Q(42, 358, 16, 42), X("seed.join")),
			go(Q(25, 414, 50, 30), X("seed.membership.vipps"), { align: "center" })
		])
	});
}
//#endregion
//#region ../template/assets/engine/0.6.11/maler-model.js
var Io = [
	"section",
	"blocks",
	"page"
];
function Lo(e) {
	return ga(String(e ?? ""), "");
}
function Ro(e, t, { id: n, title: r }) {
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
var zo = /^#[0-9a-fA-F]{3,8}$/, Bo = /^[a-z][a-z0-9-]*$/, Vo = "#171c26", Ho = "#232a38", Uo = "#98a1b3", Wo = "#7c5cff", Go = (e, t) => `var(--urd-color-${e}, ${t})`;
function Ko(e, t) {
	return typeof e == "string" ? zo.test(e) ? e : Bo.test(e) ? Go(e, t) : t : t;
}
function qo(e, t = 800) {
	let n = Number.parseFloat(e);
	return !Number.isFinite(n) || n <= 0 ? 400 : typeof e == "string" && e.trim().endsWith("vh") ? n / 100 * t : n;
}
var $ = (e) => Math.round(e * 10) / 10, Jo = (e, t, n) => Math.min(n, Math.max(t, e)), Yo = (e, t, n, r, i, a = "") => `<rect x="${$(e)}" y="${$(t)}" width="${$(Math.max(n, 1))}" height="${$(Math.max(r, 1))}" fill="${i}"${a}/>`;
function Xo(e) {
	for (let t of e?.background?.layers ?? []) {
		if (t.type === "color") return Ko(t.props?.value, Vo);
		if (t.type === "gradient") return Ko(Array.isArray(t.props?.stops) ? t.props.stops[0] : null, Vo);
	}
	return Go("bg", Vo);
}
function Zo(e, t, n, r, i) {
	let a = /<h[1-3]/.test(String(i?.html ?? "")), o = i?.align === "center", s = Go("text", Uo), c = [];
	i?.box && c.push(Yo(e, t, n, r, Go("surface", Ho), " rx=\"1.5\""));
	let l = i?.box ? Math.min(2, n * .06) : 0, u = e + l, d = n - l * 2, f = [
		.72,
		.9,
		.5
	], p = [
		a ? 4 : 2.2,
		2.2,
		2.2
	], m = Jo(r / (p[0] + p[1] + p[2] + 4.8 + 2), 0, 1), h = t + l + Math.min(1, r * .08);
	for (let e = 0; e < 3; e++) {
		let n = Math.min(Math.max(e === 0 ? a ? 1.4 : 1 : .8, p[e] * m), Math.max(r, 1));
		if (e > 0 && h + n > t + r - l) break;
		let i = d * f[e], g = o ? u + (d - i) / 2 : u;
		c.push(Yo(g, h, i, n, s, ` opacity="${e === 0 ? .8 : .4}" rx="${$(Math.min(1, n / 2))}"`)), h += n + Math.max(.8, 2.4 * m);
	}
	return c.join("");
}
function Qo(e, t, n, r, i = !1) {
	let a = Go("text", Uo), o = [];
	i ? (o.push(Yo(e, t, n, r, Go("surface", Ho), " rx=\"1.5\" opacity=\"0.35\"")), o.push(`<rect x="${$(e + .4)}" y="${$(t + .4)}" width="${$(Math.max(n - .8, 1))}" height="${$(Math.max(r - .8, 1))}" fill="none" stroke="${a}" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.35" rx="1.5"/>`)) : o.push(Yo(e, t, n, r, Go("surface", Ho), " rx=\"1.5\""));
	let s = i ? .15 : .4, c = (t) => $(e + n * t), l = (e) => $(t + r * e);
	return o.push(`<polygon points="${c(.08)},${l(.9)} ${c(.42)},${l(.38)} ${c(.62)},${l(.68)} ${c(.75)},${l(.5)} ${c(.92)},${l(.9)}" fill="${a}" opacity="${s}"/>`), o.push(`<circle cx="${c(.28)}" cy="${l(.26)}" r="${$(Math.max(1, Math.min(n, r) * .1))}" fill="${a}" opacity="${$(s + .1)}"/>`), o.join("");
}
function $o(e, t, n, r, i) {
	let a = !(Array.isArray(i?.images) && i.images.length), o = Math.max(1, n * .03), s = (n - o * 2) / 3, c = [];
	for (let n = 0; n < 3; n++) c.push(Qo(e + n * (s + o), t, s, r, a));
	return c.join("");
}
function es(e, t, n, r) {
	let i = Math.max(1, n * .03), a = (n - i * 2) / 3, o = [];
	for (let n = 0; n < 3; n++) {
		let s = e + n * (a + i);
		o.push(Yo(s, t, a, r * .55, Go("surface", Ho), " rx=\"1.5\"")), o.push(Yo(s, t + r * .62, a * .8, 2, Go("text", Uo), " opacity=\"0.5\" rx=\"1\""));
	}
	return o.join("");
}
function ts(e, t, n, r, i) {
	let a = Ko(i?.color, Wo), o = i?.kind;
	return o === "circle" ? `<ellipse cx="${$(e + n / 2)}" cy="${$(t + r / 2)}" rx="${$(Math.max(n / 2, 1))}" ry="${$(Math.max(r / 2, 1))}" fill="${a}" opacity="0.8"/>` : o === "triangle" ? `<polygon points="${$(e)},${$(t + r)} ${$(e + n / 2)},${$(t)} ${$(e + n)},${$(t + r)}" fill="${a}" opacity="0.8"/>` : o === "line" || o === "arrow" ? Yo(e, t + r / 2 - .75, n, 1.5, a, " opacity=\"0.85\" rx=\"0.75\"") : Yo(e, t, n, r, a, " opacity=\"0.8\" rx=\"1\"");
}
function ns(e, t, n, r, i, a) {
	if (e === "text") return Zo(t, n, r, i, a);
	if (e === "image") return Qo(t, n, r, i, !a?.src);
	if (e === "galleri") return $o(t, n, r, i, a);
	if (e === "samling") return es(t, n, r, i);
	if (e === "faq") {
		let e = Jo(Math.floor(i / 5), 2, 3), a = Math.max(.6, i * .04), o = (i - a * (e - 1)) / e, s = [];
		for (let i = 0; i < e; i += 1) {
			let e = n + i * (o + a);
			s.push(Yo(t, e, r, o, Go("surface", Ho), " rx=\"1\"")), s.push(Yo(t + r * .06, e + o / 2 - .7, r * .55, 1.4, Go("text", Uo), " opacity=\"0.5\" rx=\"0.7\"")), s.push(`<circle cx="${$(t + r * .92)}" cy="${$(e + o / 2)}" r="0.9" fill="${Go("text", Uo)}" opacity="0.4"/>`);
		}
		return s.join("");
	}
	if (e === "shape") return ts(t, n, r, i, a);
	if (e === "button") return Yo(t, n, r, i, Go("accent", Wo), ` rx="${$(Math.min(i / 2, 4))}"`);
	if (e === "icon") {
		let e = Math.max(1.2, Math.min(r, i) / 2);
		return `<circle cx="${$(t + r / 2)}" cy="${$(n + i / 2)}" r="${$(e)}" fill="${Go("accent", Wo)}" opacity="0.85"/>`;
	}
	if (e === "video") {
		let e = [Yo(t, n, r, i, Go("surface", Ho), " rx=\"1.5\"")], a = t + r / 2, o = n + i / 2, s = Math.max(1.5, Math.min(r, i) * .22);
		return e.push(`<polygon points="${$(a - s / 2)},${$(o - s)} ${$(a - s / 2)},${$(o + s)} ${$(a + s)},${$(o)}" fill="${Go("text", Uo)}" opacity="0.6"/>`), e.join("");
	}
	if (e === "tidslinje") {
		let e = [Yo(t + 1, n, 1.4, i, Go("accent", Wo), " opacity=\"0.7\" rx=\"0.7\"")];
		for (let a = 0; a < 3; a += 1) {
			let o = n + i * (.18 + a * .32);
			e.push(`<circle cx="${$(t + 1.7)}" cy="${$(o)}" r="1.6" fill="${Go("accent", Wo)}"/>`), e.push(Yo(t + 5, o - 1, r * .5, 2, Go("text", Uo), " opacity=\"0.5\" rx=\"1\""));
		}
		return e.join("");
	}
	if (e === "sitat") return [
		`<text x="${$(t + r / 2)}" y="${$(n + i * .34)}" text-anchor="middle" font-size="${$(Math.min(r, i) * .5)}" font-family="Georgia, serif" fill="${Go("accent", Wo)}">“</text>`,
		Yo(t + r * .15, n + i * .48, r * .7, 2, Go("text", Uo), " opacity=\"0.6\" rx=\"1\""),
		Yo(t + r * .25, n + i * .62, r * .5, 2, Go("text", Uo), " opacity=\"0.6\" rx=\"1\""),
		Yo(t + r * .35, n + i * .82, r * .3, 1.6, Go("text", Uo), " opacity=\"0.35\" rx=\"0.8\"")
	].join("");
	if (e === "statistikk") return [Yo(t + r * .28, n + i * .15, r * .44, i * .42, Go("accent", Wo), " opacity=\"0.85\" rx=\"1\""), Yo(t + r * .32, n + i * .72, r * .36, 1.6, Go("text", Uo), " opacity=\"0.4\" rx=\"0.8\"")].join("");
	if (e === "tabell") {
		let e = Math.max(1.6, i * .22), a = [Yo(t, n, r, e, Go("accent", Wo), " opacity=\"0.5\" rx=\"0.8\"")], o = Jo(Math.floor((i - e) / 3.2), 1, 3);
		for (let s = 0; s < o; s += 1) a.push(Yo(t, n + e + 1 + s * ((i - e - 1) / o), r, 1, Go("text", Uo), " opacity=\"0.3\""));
		return a.push(Yo(t + r * .33, n, .6, i, Go("text", Uo), " opacity=\"0.2\"")), a.push(Yo(t + r * .66, n, .6, i, Go("text", Uo), " opacity=\"0.2\"")), a.join("");
	}
	if (e === "deling") {
		let e = Math.max(1.2, Math.min(i / 2, r / 9)), a = [];
		for (let r = 0; r < 4; r += 1) a.push(`<circle cx="${$(t + e + r * (e * 2 + 1.5))}" cy="${$(n + i / 2)}" r="${$(e)}" fill="${Go("accent", Wo)}" opacity="0.8"/>`);
		return a.join("");
	}
	if (e === "nedteller") {
		let e = Math.max(.8, r * .03), a = (r - e * 3) / 4, o = [];
		for (let r = 0; r < 4; r += 1) {
			let s = t + r * (a + e);
			o.push(Yo(s, n, a, i, Go("surface", Ho), " rx=\"1\"")), o.push(Yo(s + a * .25, n + i * .2, a * .5, i * .35, Go("accent", Wo), " opacity=\"0.85\" rx=\"0.8\""));
		}
		return o.join("");
	}
	if (e === "audio") {
		let e = [Yo(t, n, r, i, Go("surface", Ho), " rx=\"1.5\"")], a = n + i / 2, o = Math.max(1.2, i * .28);
		return e.push(`<polygon points="${$(t + r * .06)},${$(a - o)} ${$(t + r * .06)},${$(a + o)} ${$(t + r * .06 + o * 1.4)},${$(a)}" fill="${Go("accent", Wo)}" opacity="0.85"/>`), e.push(Yo(t + r * .2, a - .6, r * .7, 1.2, Go("text", Uo), " opacity=\"0.35\" rx=\"0.6\"")), e.join("");
	}
	return Yo(t, n, r, i, Go("surface", Ho), " rx=\"1.5\"");
}
function rs(e, t, n) {
	let r = Array.isArray(e?.blocks) ? e.blocks : [], i = r.map((e) => (e.frames?.desktop?.y ?? 0) + (e.frames?.desktop?.h ?? 0)), a = n / Math.max(qo(e?.size?.minHeight), i.length ? Math.max(...i) + 16 : 0), o = [Yo(0, 0, t, n, Xo(e))];
	for (let r of e?.background?.layers ?? []) {
		if (r.type !== "glow") continue;
		let e = r.props ?? {};
		o.push(`<circle cx="${$(Jo(e.x ?? .5, 0, 1) * t)}" cy="${$(Jo(e.y ?? .3, 0, 1) * n)}" r="${$(t * Jo(e.radius ?? .5, .1, 1) * .5)}" fill="${Ko(e.color, Wo)}" opacity="${$(Jo(e.opacity ?? .3, 0, .5))}"/>`);
	}
	let s = t * .06, c = t - s * 2;
	for (let e of r) {
		let r = e.frames?.desktop;
		if (!r) continue;
		let i = Jo(s + (r.x ?? 0) * (c / 100), 0, t - 2), l = Jo((r.y ?? 0) * a, 0, n - 2), u = Jo((r.w ?? 10) * (c / 100), 2, t - i), d = Jo((r.h ?? 20) * a, 2, n - l);
		o.push(ns(e.type, i, l, u, d, e.props));
	}
	return o.join("");
}
function is(e, { w: t = 96, h: n = 116, max: r = 6 } = {}) {
	let i = (Array.isArray(e?.sections) ? e.sections : []).slice(0, r);
	if (!i.length) return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${Yo(0, 0, t, n, Go("bg", Vo))}</svg>`;
	let a = i.map((e) => Jo(qo(e?.size?.minHeight), 160, 900)), o = a.reduce((e, t) => e + t, 0), s = n - 1 * (i.length - 1), c = [], l = 0;
	for (let e = 0; e < i.length; e += 1) {
		let n = Math.max(6, a[e] / o * s);
		c.push(`<g transform="translate(0 ${$(l)})">${rs(i[e], t, n)}</g>`), l += n + 1;
	}
	return `<svg viewBox="0 0 ${t} ${n}" width="${t}" height="${n}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${c.join("")}</svg>`;
}
//#endregion
//#region ../template/assets/engine/0.6.11/page-presets.js
var as = /* @__PURE__ */ new Map();
Fo({ sections: { define: (e, t) => as.set(e, t) } });
var os = [
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
function ss(e, { pageId: t, title: n }) {
	let r = os.find((t) => t.id === e);
	return r ? {
		schemaVersion: 2,
		meta: {
			id: t,
			title: n
		},
		sections: r.sections.map((e) => as.get(e).create())
	} : null;
}
//#endregion
//#region ../template/assets/engine/0.6.11/palette-search.js
function cs(e) {
	return String(e ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function ls(e, t) {
	let n = cs(t).trim(), r = cs(e);
	return n ? r.startsWith(n) ? 0 : r.split(/[^a-z0-9]+/).some((e) => e.startsWith(n)) ? 1 : r.includes(n) ? 2 : -1 : 2;
}
function us(e, t, n) {
	return e.map((e, r) => ({
		item: e,
		i: r,
		rank: ls(n(e), t)
	})).filter((e) => e.rank >= 0).sort((e, t) => e.rank - t.rank || e.i - t.i).map((e) => e.item);
}
//#endregion
//#region ../template/assets/engine/0.6.11/theme.js
function ds(e, t) {
	let n = e.tokens || {}, r = e.scheme === "dark" ? "dark" : "light";
	if (!e.alt?.tokens || t === r) return n;
	let i = {};
	for (let t of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(e.alt.tokens)])) i[t] = {
		...n[t],
		...e.alt.tokens[t]
	};
	return i;
}
var fs = /^[a-zA-Z0-9#%.,()'"\s+\-*/]+$/;
function ps(e) {
	return typeof e == "string" && fs.test(e) && !/url\(|\/\*|\*\/|expression/i.test(e);
}
function ms(e) {
	let t = e.tokens || {}, n = ds(e, "light"), r = ds(e, "dark"), i = e.scheme === "dark" ? "dark" : "light", a = [], o = [], s = [], c = /* @__PURE__ */ new Set([
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
			ps(c) && (a.push(`  --urd-${e}-${l}: ${c};`), i && a.push(`  --urd-base-${l}: ${c};`)), u !== d && (i && ps(u) && ps(d) ? o.push({
				name: l,
				lv: u,
				dv: d
			}) : !i && ps(u) && ps(d) && s.push({
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
function hs(e) {
	return /^[a-z][a-z0-9-]*$/.test(e) ? `var(--urd-color-${e})` : e;
}
var gs = {
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
}, _s = {
	flate: "sectionTheme.flate",
	aksent: "sectionTheme.aksent",
	invers: "sectionTheme.invers",
	dus: "sectionTheme.dus",
	dempet: "sectionTheme.dempet",
	dyp: "sectionTheme.dyp",
	uthevet: "sectionTheme.uthevet"
};
[...new Set(Object.values(gs).flatMap(Object.keys))];
function vs(e) {
	return gs[e] ?? {};
}
function ys(e) {
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
function bs(e, t) {
	let n = ys(e), r = ys(t);
	return n == null || r == null ? null : (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/color.js
var xs = {
	version: 1,
	label: "Farge",
	labelKey: "bgLayer.color",
	defaults: () => ({
		value: "bg",
		opacity: 1
	}),
	migrations: {},
	render(e, t) {
		e.style.background = hs(t.value), e.style.opacity = String(t.opacity ?? 1);
	}
}, Ss = {
	linear: [
		"pan",
		"pan-loop",
		"rotate"
	],
	radial: ["pulse", "orbit"]
};
function Cs(e) {
	let t = Array.isArray(e) && e.length ? e : [{ color: "#0b0e14" }, { color: "#1a1030" }], n = t.map((e) => Math.max(0, Number(e?.share) || 0)), r = n.reduce((e, t) => e + t, 0), i = r <= 0, a = i ? t.length : r, o = 0;
	return t.map((e, t) => {
		let r = i ? 1 : n[t], s = (o + r / 2) / a * 100;
		return o += r, {
			color: e?.color ?? "#0b0e14",
			at: Math.round(s * 100) / 100
		};
	});
}
function ws(e) {
	let t = (e) => Math.round(e * 100) / 100, n = e[0]?.at ?? 0;
	return [...e.map((e) => ({
		color: e.color,
		at: t(e.at - n)
	})), {
		color: e[0]?.color ?? "#0b0e14",
		at: 100
	}];
}
function Ts(e, t, n, r = .5) {
	let i = n % 360 * Math.PI / 180, a = (e) => Math.round(e * 100) / 100 || 0, o = (Math.abs(e * Math.sin(i)) + Math.abs(t * Math.cos(i))) / (1 - Math.min(Math.max(r, 0), .9));
	return {
		period: a(o),
		dx: a(Math.sin(i) * o),
		dy: a(-Math.cos(i) * o)
	};
}
function Es(e, t, n) {
	return `repeating-linear-gradient(${t}deg, ${e.map((e) => `${hs(e.color)} ${Math.round(e.at / 100 * n * 100) / 100}px`).join(", ")})`;
}
function Ds(e) {
	let t = e.kind === "radial" ? "radial" : "linear", n = (Ss[t] ?? []).includes(e.animation) ? e.animation : null, r = Cs(e.stops), i = r.map((e) => `${hs(e.color)} ${e.at}%`).join(", "), a = {}, o;
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
					stops: ws(r),
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
var Os = /* @__PURE__ */ new Set(), ks = !1;
function As(e) {
	Os.add(e), !(ks || typeof window > "u") && (ks = !0, window.addEventListener("resize", () => {
		for (let e of [...Os]) e() || Os.delete(e);
	}));
}
var js = !1;
function Ms() {
	if (!js) {
		js = !0;
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
var Ns = {
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
		let n = Ds(t);
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
					let e = Ts(r, i, n.loop.angle, n.loop.maxShare);
					t.style.inset = `${-Math.ceil(e.period)}px`, t.style.background = Es(n.loop.stops, n.loop.angle, e.period), t.style.setProperty("--urd-loop-dx", `${e.dx}px`), t.style.setProperty("--urd-loop-dy", `${e.dy}px`);
				}
				return !0;
			};
			requestAnimationFrame(r), As(r);
			return;
		}
		if (n.runner) {
			e.classList.add("urd-bg-loop-host");
			let t = document.createElement("div");
			t.className = n.runner.className, t.style.background = n.runner.background, n.runner.left != null && (t.style.left = n.runner.left), n.runner.top != null && (t.style.top = n.runner.top), e.appendChild(t);
			return;
		}
		e.style.background = n.background, n.className && (e.classList.add(n.className), n.className === "urd-bg-rotate" && Ms());
	}
}, Ps = {
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
		let n = hs(t.color), r = t.x ?? .5, i = t.y ?? .3, a = t.radius ?? .5;
		e.style.background = `radial-gradient(circle at ${r * 100}% ${i * 100}%, ${n} 0%, transparent ${a * 100}%)`, e.style.opacity = String(t.opacity ?? .35);
	}
}, Fs = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E\")", Is = {
	version: 1,
	label: "Korn",
	labelKey: "bgLayer.grain",
	defaults: () => ({ opacity: .06 }),
	migrations: {},
	render(e, t) {
		e.style.backgroundImage = Fs, e.style.backgroundRepeat = "repeat", e.style.opacity = String(t.opacity ?? .06);
	}
}, Ls = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
function Rs(e) {
	return typeof e == "string" && Ls.test(e);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/image.js
var zs = .4;
function Bs(e, t) {
	return `${(e ?? .5) * 100}% ${(t ?? .5) * 100}%`;
}
function Vs(e, t) {
	return e === "contain" ? "contain" : e === "cover" ? "cover" : `${Math.max(0, t ?? 1) * 100}%`;
}
function Hs(e) {
	let t = "-9999px";
	return e === "up" ? `inset(${t} 0 0 0)` : e === "down" ? `inset(0 0 ${t} 0)` : e === "both" ? `inset(${t} 0 ${t} 0)` : "inset(0)";
}
function Us(e, t, n, r = .18) {
	let i = Math.max(0, Math.min(1, n)) * zs * t;
	return Math.round(Math.min(i, r * e));
}
function Ws(e, t, n, r, i) {
	let a = e + t / 2, o = (n / 2 - a) * Math.max(0, Math.min(1, r)) * zs, s = i ?? Us(t, n, r);
	return Math.max(-s, Math.min(s, o)) || 0;
}
var Gs = /* @__PURE__ */ new Set(), Ks = !1, qs = 0;
function Js() {
	qs = 0;
	for (let e of [...Gs]) e() || Gs.delete(e);
}
function Ys() {
	qs ||= requestAnimationFrame(Js);
}
function Xs(e) {
	Gs.add(e), e(), !(Ks || typeof window > "u") && (Ks = !0, window.addEventListener("scroll", Ys, { passive: !0 }), window.addEventListener("resize", Ys, { passive: !0 }));
}
function Zs(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement, o = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	e.style.willChange = "transform";
	let s = (t) => {
		e.style.top = `-${t}px`, e.style.bottom = `-${t}px`;
	}, c = () => {
		if (!e.isConnected) return !1;
		if (o || document.body.classList.contains("urd-mobile")) return s(n), e.style.transform = "", !0;
		let r = (a ?? e).getBoundingClientRect(), c = window.innerHeight || document.documentElement.clientHeight, l = Us(r.height, c, t, i ? .18 : .6);
		s(i ? Math.max(n, l) : n);
		let u = Ws(r.top, r.height, c, t, l);
		return e.style.transform = `translateY(${u.toFixed(1)}px)`, !0;
	};
	Xs(c), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(c));
}
function Qs() {
	return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("animation-timeline", "view()");
}
var $s = /* @__PURE__ */ new Set(), ec = !1, tc = 0;
function nc() {
	tc = 0;
	for (let e of [...$s]) e() || $s.delete(e);
}
function rc() {
	!tc && typeof requestAnimationFrame == "function" && (tc = requestAnimationFrame(nc));
}
function ic(e) {
	$s.add(e), e(), !(ec || typeof window > "u") && (ec = !0, window.addEventListener("resize", rc, { passive: !0 }));
}
function ac(e, t, n, r) {
	let i = r === "cover" || r === "flislegg" || r === "repeat", a = e.closest(".urd-section") ?? e.parentElement?.closest(".urd-section") ?? e.parentElement;
	e.style.willChange = "transform", e.classList.add("urd-parallax-css");
	let o = () => {
		if (!e.isConnected) return !1;
		let r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || document.body.classList.contains("urd-mobile"), o = (a ?? e).getBoundingClientRect(), s = window.innerHeight || document.documentElement.clientHeight, c = Us(o.height, s, t, i ? .18 : .6), l = i && !r ? Math.max(n, c) : n;
		return e.style.setProperty("--urd-px-shift", `${c}px`), e.style.top = `-${l}px`, e.style.bottom = `-${l}px`, !0;
	};
	ic(o), typeof requestAnimationFrame == "function" && requestAnimationFrame(() => requestAnimationFrame(o));
}
var oc = {
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
		if (!Rs(t.src)) return;
		e.style.opacity = String(t.opacity ?? 1), e.style.clipPath = Hs(t.bleed), e.style.zIndex = t.bleed === "down" || t.bleed === "both" ? "1" : "";
		let n = document.createElement("div");
		n.className = "urd-bg-image", n.style.position = "absolute", n.style.left = "0", n.style.right = "0", n.style.top = "0", n.style.bottom = "0";
		let r = t.fit === "flislegg" || t.fit === "repeat";
		n.style.backgroundImage = `url("${t.src}")`, n.style.backgroundSize = Vs(t.fit, t.size), n.style.backgroundRepeat = r ? "repeat" : "no-repeat", n.style.backgroundPosition = Bs(t.x, t.y);
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
			Qs() ? ac(n, t.parallax, i, e) : Zs(n, t.parallax, i, e);
		}
	}
};
//#endregion
//#region ../template/assets/engine/0.6.11/galleri-model.js
function sc(e, t, n) {
	return !Number.isFinite(n) || n < 1 ? 0 : (((Number.isFinite(e) ? e : 0) + t) % n + n) % n;
}
function cc({ count: e = 0, reducedMotion: t = !1 } = {}) {
	return e >= 2 && !t;
}
function lc(e, { min: t = 2, fallback: n = 5 } = {}) {
	let r = Number(e);
	return !Number.isFinite(r) || r <= 0 ? n : Math.max(t, r);
}
//#endregion
//#region ../template/assets/engine/0.6.11/backgrounds/bildegalleri.js
var uc = {
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
		let n = (t.images ?? []).filter((e) => Rs(e?.src));
		if (!n.length) return;
		e.classList.add("urd-bg-galleri"), e.style.opacity = String(t.opacity ?? 1), t.blur > 0 && (e.style.filter = `blur(${t.blur}px)`, e.style.inset = `-${t.blur * 2}px`);
		let r = Math.max(0, Number(t.fade) || 0);
		e.style.setProperty("--urd-bgg-fade", `${r}s`);
		let i = (e, n) => {
			e.style.backgroundImage = `url("${n.src}")`, e.style.backgroundSize = Vs(t.fit), e.style.backgroundRepeat = "no-repeat", e.style.backgroundPosition = Bs(n.x, n.y);
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
		if (!cc({
			count: n.length,
			reducedMotion: s
		})) return;
		let c = document.createElement("div");
		c.className = "urd-bg-slide", e.appendChild(c);
		let l = 0, u = o, d = Math.max(lc(t.interval, { fallback: 6 }), r + .5) * 1e3, f = setInterval(() => {
			if (!e.isConnected) {
				clearInterval(f);
				return;
			}
			if (document.hidden) return;
			let t = sc(l, 1, n.length), r = new Image();
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
function dc(e = {}) {
	let t = "#2fd6b6", n = "#5c6b64", r = e.mega ? "#16221d" : "#0e1512", i = e.cols ?? 0, a = e.social ?? 0, o = `<svg viewBox="0 0 160 80" preserveAspectRatio="none" aria-hidden="true"><rect width="160" height="80" fill="${r}"/>`;
	if (e.mega && (o += `<circle cx="20" cy="6" r="34" fill="${t}" opacity="0.18"/>`), e.bigcta) return o += `<rect x="45" y="18" width="70" height="8" rx="3" fill="${n}" opacity="0.85"/>`, o += `<rect x="56" y="32" width="48" height="4" rx="2" fill="${n}" opacity="0.5"/>`, o += `<rect x="62" y="43" width="36" height="10" rx="3" fill="${t}"/>`, o += fc(n, e.baselineLinks), o + "</svg>";
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
	return o += fc(n, e.baselineLinks), o + "</svg>";
}
function fc(e, t = 0) {
	let n = `<line x1="8" y1="66" x2="152" y2="66" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
	return n += `<rect x="8" y="70" width="40" height="3" rx="1.5" fill="${e}" opacity="0.6"/>`, t && (n += `<g fill="${e}" opacity="0.6">` + Array.from({ length: t }, (e, t) => `<rect x="${120 - t * 16}" y="70" width="12" height="3" rx="1.5"/>`).join("") + "</g>"), n;
}
//#endregion
//#region ../template/assets/engine/0.6.11/animations/core.js
var pc = () => ({
	duration: 600,
	delay: 0
}), mc = {
	"fade-in": {
		version: 1,
		label: "Ton inn",
		labelKey: "anim.fadeIn",
		entrance: !0,
		defaults: pc,
		migrations: {}
	},
	"slide-up": {
		version: 1,
		label: "Gli opp",
		labelKey: "anim.slideUp",
		entrance: !0,
		defaults: pc,
		migrations: {}
	},
	"zoom-in": {
		version: 1,
		label: "Zoom inn",
		labelKey: "anim.zoomIn",
		entrance: !0,
		defaults: pc,
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
}, hc = [
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
function gc(e) {
	let t = (e) => Math.round(e * 100) / 100, n = Math.max(0, t(100 - e.w)), r = Math.min(n, Math.max(0, t(e.x - e.w / 2))), i = Math.max(0, e.y - e.h / 2), a = e.snap === !1 || e.grid?.snap === !1, o = e.grid?.size || 8;
	return i = a ? Math.round(i) : Math.round(i / o) * o, {
		x: r,
		y: Math.max(0, i)
	};
}
//#endregion
//#region src/App.svelte
var _c = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), vc = /* @__PURE__ */ H("<button class=\"ghost row-tool svelte-1n46o8q\"></button>"), yc = /* @__PURE__ */ H("<span><span class=\"grad-grip svelte-1n46o8q\"><svg viewBox=\"0 0 16 16\" width=\"14\" height=\"14\" fill=\"currentColor\" aria-hidden=\"true\"><circle cx=\"5\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"3\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"8\" r=\"1.4\"></circle><circle cx=\"5\" cy=\"13\" r=\"1.4\"></circle><circle cx=\"11\" cy=\"13\" r=\"1.4\"></circle></svg></span> <!> <input type=\"range\" class=\"tb-grow svelte-1n46o8q\" min=\"0\" max=\"100\" step=\"1\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span> <!></span>"), bc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), xc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"360\" step=\"5\" class=\"svelte-1n46o8q\"/>", 1), Sc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <button class=\"ghost action svelte-1n46o8q\"> </button> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Cc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), wc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.01\" max=\"0.3\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Tc = /* @__PURE__ */ H("<div class=\"sizefill svelte-1n46o8q\"><button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button> <button type=\"button\" class=\"ghost svelte-1n46o8q\"> </button></div> <label class=\"svelte-1n46o8q\"> </label> <div class=\"focalpad svelte-1n46o8q\"><span class=\"focaldot svelte-1n46o8q\"></span></div> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"sub svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"-0.5\" max=\"1.5\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), Ec = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Dc = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> </label> <div class=\"sizestep svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"10\" max=\"400\" class=\"svelte-1n46o8q\"/> <span class=\"sizeunit svelte-1n46o8q\">%</span> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></div> <!> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Oc = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), kc = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"120\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"5\" step=\"0.1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"20\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.05\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <p class=\"panel-hint svelte-1n46o8q\"> </p>", 1), Ac = /* @__PURE__ */ H("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!></div>"), jc = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Mc = /* @__PURE__ */ H("<input class=\"nav-target svelte-1n46o8q\"/>"), Nc = /* @__PURE__ */ H("<div class=\"nav-row nav-sub-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div>"), Pc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label>"), Fc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"num-stepper svelte-1n46o8q\"><button type=\"button\" class=\"svelte-1n46o8q\">−</button> <input type=\"number\" min=\"1\" max=\"12\" step=\"1\" class=\"svelte-1n46o8q\"/> <button type=\"button\" class=\"svelte-1n46o8q\">+</button></span></label>", 1), Ic = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Lc = /* @__PURE__ */ H("<p class=\"panel-hint svelte-1n46o8q\"> </p>"), Rc = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span>"), zc = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Bc = /* @__PURE__ */ H("<span class=\"nav-line svelte-1n46o8q\"><input class=\"tl-year svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <input class=\"svelte-1n46o8q\"/>", 1), Vc = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button>", 1), Hc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Uc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), Wc = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></span> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Gc = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>"), Kc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"datetime-local\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), qc = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"> </button>"), Jc = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"audio/*\" class=\"svelte-1n46o8q\"/></label> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), Yc = /* @__PURE__ */ H("<input class=\"svelte-1n46o8q\"/>"), Xc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Zc = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Qc = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> </label> <input class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label>", 1), $c = /* @__PURE__ */ H("<input class=\"token-input svelte-1n46o8q\" maxlength=\"4\"/>"), el = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\"/> <button class=\"ghost svelte-1n46o8q\"> </button></span>"), tl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"toolbar-row svelte-1n46o8q\"><!> <!></span></label> <!>", 1), nl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), rl = /* @__PURE__ */ H("<div class=\"bg-layer svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label></div>"), il = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label> <!>", 1), al = /* @__PURE__ */ H("<p> </p>"), ol = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), sl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" class=\"svelte-1n46o8q\"/></label>"), cl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"text\" class=\"svelte-1n46o8q\"/></label>"), ll = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ul = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), dl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), fl = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!>", 1), pl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), ml = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), hl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), gl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"24\" max=\"64\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), _l = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), vl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"1\" max=\"3\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.2\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"2\" step=\"0.01\" class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), yl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"8\" max=\"400\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), bl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"6\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"32\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), xl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"2\" max=\"60\" class=\"svelte-1n46o8q\"/></label>"), Sl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), Cl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"40\" class=\"svelte-1n46o8q\"/></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), wl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label>", 1), Tl = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"400\" class=\"svelte-1n46o8q\"/></label>"), El = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!> <!>", 1), Dl = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), Ol = /* @__PURE__ */ H("<div class=\"frame-grid svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"0.5\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" min=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" step=\"1\" class=\"svelte-1n46o8q\"/></label></div>"), kl = /* @__PURE__ */ H("<!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <details class=\"group frame-group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div></details>", 1), Al = /* @__PURE__ */ H("<div class=\"props-tabs svelte-1n46o8q\"><span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div> <!>", 1), jl = /* @__PURE__ */ H("<button class=\"chrome-restore svelte-1n46o8q\"><!> </button>"), Ml = /* @__PURE__ */ H("<button><!> </button>"), Nl = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"></div>"), Pl = /* @__PURE__ */ H("<span class=\"toolmenu svelte-1n46o8q\"><button><!><!></button> <!></span>"), Fl = /* @__PURE__ */ H("<button></button>"), Il = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"viewswitch toolgrp svelte-1n46o8q\"></span>", 1), Ll = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"><div class=\"tool-pop-row svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button></div> <button><!> </button></div>"), Rl = /* @__PURE__ */ H("<span class=\"toolmenu svelte-1n46o8q\"><button><span class=\"zoom-cap svelte-1n46o8q\"> </span><!></button> <!></span>"), zl = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"zoomswitch toolgrp svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"></button> <span class=\"zoom-readout svelte-1n46o8q\"> </span> <button class=\"ghost svelte-1n46o8q\"></button> <button></button></span>", 1), Bl = /* @__PURE__ */ H("<div class=\"tool-pop svelte-1n46o8q\"><button><!> </button> <button><!> </button></div>"), Vl = /* @__PURE__ */ H("<span class=\"tool-cap svelte-1n46o8q\"> </span> <span class=\"toolgrp svelte-1n46o8q\"><button></button> <button></button></span>", 1), Hl = /* @__PURE__ */ H("<button class=\"ghost page-btn svelte-1n46o8q\"> </button> <span class=\"toolset svelte-1n46o8q\"><!> <!> <!></span>", 1), Ul = /* @__PURE__ */ H("<button class=\"badge attention svelte-1n46o8q\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span> <span class=\"badge-mini svelte-1n46o8q\"> </span></button>"), Wl = /* @__PURE__ */ H("<button class=\"discard-confirm svelte-1n46o8q\"><!> </button>"), Gl = /* @__PURE__ */ H("<span class=\"draft-cluster svelte-1n46o8q\"><span class=\"chip draft-chip svelte-1n46o8q\"><span class=\"chip-full svelte-1n46o8q\" aria-hidden=\"true\"> </span> <span class=\"chip-mini svelte-1n46o8q\" aria-hidden=\"true\">!</span></span>  <span class=\"discard-wrap svelte-1n46o8q\"><button><!><span class=\"discard-label svelte-1n46o8q\"> </span></button> <!></span></span>"), Kl = /* @__PURE__ */ H("<!> <span class=\"btn-label svelte-1n46o8q\"> </span>", 1), ql = /* @__PURE__ */ H("<span class=\"who svelte-1n46o8q\"><!> </span>"), Jl = /* @__PURE__ */ H("<a class=\"ghost svelte-1n46o8q\" href=\"/api/github/login\"> </a>"), Yl = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"><!></button> <!> <a class=\"ghost svelte-1n46o8q\" target=\"_blank\" rel=\"noopener\"><!> <span class=\"btn-label svelte-1n46o8q\"> </span></a> <button class=\"primary svelte-1n46o8q\"> </button>", 1), Xl = /* @__PURE__ */ H("<button> </button>"), Zl = /* @__PURE__ */ H("<span class=\"rail-group svelte-1n46o8q\"> </span> <!>", 1), Ql = /* @__PURE__ */ H("<div class=\"settings-pop svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label></div>"), $l = /* @__PURE__ */ H("<span class=\"page-path svelte-1n46o8q\">/</span>"), eu = /* @__PURE__ */ H("<input class=\"page-slug svelte-1n46o8q\"/>"), tu = /* @__PURE__ */ H("<button class=\"ghost danger svelte-1n46o8q\"><!> </button>"), nu = /* @__PURE__ */ H("<div class=\"page-menu svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"><!> </button> <!></div>"), ru = /* @__PURE__ */ H("<div><input class=\"page-title svelte-1n46o8q\"/> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <span class=\"page-menu-wrap svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <!></span></span></div>"), iu = /* @__PURE__ */ H("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div>"), au = /* @__PURE__ */ H("<div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button> <button class=\"page-mal-del svelte-1n46o8q\"></button></div>"), ou = /* @__PURE__ */ H("<span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"></div>", 1), su = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <span class=\"mini-label svelte-1n46o8q\"> </span> <div class=\"page-mal-grid svelte-1n46o8q\"><div><button class=\"page-mal-pick svelte-1n46o8q\"><span class=\"page-mal-thumb svelte-1n46o8q\"></span> <span class=\"page-mal-name svelte-1n46o8q\"> </span></button></div> <!></div> <!></div>"), cu = /* @__PURE__ */ H("<input class=\"svelte-1n46o8q\"/> <span class=\"toolbar-row svelte-1n46o8q\"><!> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"8\" max=\"96\" placeholder=\"px\"/> <button><b> </b></button> <button><i> </i></button></span>", 1), lu = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"12\" max=\"128\"/> <input type=\"number\" class=\"tb-num svelte-1n46o8q\" min=\"0\" max=\"64\"/></span>"), uu = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label>", 1), du = /* @__PURE__ */ H("<label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!>", 1), fu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0.1\" max=\"1\" step=\"0.01\" class=\"svelte-1n46o8q\"/>", 1), pu = /* @__PURE__ */ H("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <span class=\"nav-target svelte-1n46o8q\"><!></span> <!></div> <!>", 1), mu = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <!> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label> <!> <!> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"1\" max=\"4\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), hu = /* @__PURE__ */ H("<div class=\"cw-row svelte-1n46o8q\"><span class=\"mini-label cw-screen svelte-1n46o8q\"> </span> <span><span class=\"cw-fill svelte-1n46o8q\"></span></span> <span class=\"gridmenu-value cw-margin svelte-1n46o8q\"> </span></div>"), gu = /* @__PURE__ */ H("<div class=\"mini-label cw-binds svelte-1n46o8q\"> </div>"), _u = /* @__PURE__ */ H("<div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div>"), vu = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\"/>"), yu = /* @__PURE__ */ H("<button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), bu = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"sample cw-sample svelte-1n46o8q\"><!> <div class=\"cw-legend svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!></div> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <!> <p class=\"mini-label svelte-1n46o8q\"> </p> <div class=\"seg cw-seg svelte-1n46o8q\"></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"ctl-row svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <input type=\"range\" class=\"svelte-1n46o8q\"/> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></div></div></details> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div>"), xu = /* @__PURE__ */ H("<div class=\"mini-label tpv-cap svelte-1n46o8q\"> </div>"), Su = /* @__PURE__ */ H("<div class=\"theme-pvw svelte-1n46o8q\"><!> <div class=\"tpv-demo svelte-1n46o8q\"><div class=\"tpv-h svelte-1n46o8q\"> </div> <div class=\"tpv-card svelte-1n46o8q\"> </div> <div class=\"tpv-row svelte-1n46o8q\"><span class=\"tpv-btn svelte-1n46o8q\"> </span><span class=\"tpv-lnk svelte-1n46o8q\"> </span></div></div></div>"), Cu = /* @__PURE__ */ H("<button type=\"button\"><span class=\"tp-band svelte-1n46o8q\"><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i><i class=\"svelte-1n46o8q\"></i></span> <small class=\"svelte-1n46o8q\"> </small></button>"), wu = /* @__PURE__ */ H("<div class=\"ctl-row autorow svelte-1n46o8q\"><span class=\"autolbl svelte-1n46o8q\"> </span> <span class=\"seg svelte-1n46o8q\"><button type=\"button\"> </button> <button type=\"button\"> </button></span></div>"), Tu = /* @__PURE__ */ H("<span class=\"mini-label svelte-1n46o8q\"> </span>"), Eu = /* @__PURE__ */ H("<div class=\"palcol svelte-1n46o8q\"><!> <span class=\"palcap svelte-1n46o8q\"> </span> <b class=\"palhex svelte-1n46o8q\"> </b></div>"), Du = /* @__PURE__ */ H("<div class=\"ctl-row palhead svelte-1n46o8q\"><span class=\"mini-label svelte-1n46o8q\"> </span> <button type=\"button\"> </button></div> <div></div>", 1), Ou = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"theme-presets svelte-1n46o8q\"></div> <p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <div class=\"ctl-row palhead svelte-1n46o8q\"><!> <button type=\"button\"> </button></div> <div class=\"palcells svelte-1n46o8q\"></div> <!> <div class=\"theme-previews svelte-1n46o8q\"><!> <!></div> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <div class=\"sample typo-sample svelte-1n46o8q\"><div class=\"ts-h svelte-1n46o8q\"> </div> <div class=\"ts-b svelte-1n46o8q\"> </div></div></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"sample form-prev svelte-1n46o8q\"><span class=\"fp-btn svelte-1n46o8q\"> </span> <span class=\"fp-card svelte-1n46o8q\"> </span></div> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"24\" step=\"1\" class=\"svelte-1n46o8q\"/> <label class=\"ctl-row svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"0\" max=\"40\" step=\"1\" class=\"svelte-1n46o8q\"/></div></details></div>"), ku = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label>"), Au = /* @__PURE__ */ H("<label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label>"), ju = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details>"), Mu = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" multiple=\"\" class=\"svelte-1n46o8q\"/></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"ghost svelte-1n46o8q\"> </button></div></details> <!> <!>", 1), Nu = /* @__PURE__ */ H("<div><input type=\"text\" class=\"svelte-1n46o8q\"/> <!></div>"), Pu = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label></div>"), Fu = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), Iu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"4\" max=\"96\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Lu = /* @__PURE__ */ H("<button><span class=\"rs-sample svelte-1n46o8q\"><i class=\"rs-line svelte-1n46o8q\"></i> <i class=\"rs-chip svelte-1n46o8q\"></i> <i class=\"rs-dot svelte-1n46o8q\"></i></span> <span class=\"rs-name svelte-1n46o8q\"> </span></button>"), Ru = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"1000\" step=\"10\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label>", 1), zu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"100\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input type=\"number\" min=\"0\" max=\"4000\" step=\"100\" class=\"svelte-1n46o8q\"/></label> <!>", 1), Bu = /* @__PURE__ */ H("<p class=\"panel-strong svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"token-input svelte-1n46o8q\"/></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <div class=\"rs-grid svelte-1n46o8q\"></div> <label class=\"svelte-1n46o8q\"> <span class=\"row-tools svelte-1n46o8q\"><span class=\"gridmenu-value svelte-1n46o8q\"> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></label> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/> <label class=\"svelte-1n46o8q\"> <!></label> <!> <label class=\"svelte-1n46o8q\"> <!></label>", 1), Vu = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!></div>"), Hu = /* @__PURE__ */ H("<button class=\"footer-tp svelte-1n46o8q\"><span class=\"footer-tp-thumb svelte-1n46o8q\"></span> <span class=\"footer-tp-name svelte-1n46o8q\"> </span></button>"), Uu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <span class=\"gridmenu-value svelte-1n46o8q\"> </span></label> <input type=\"range\" min=\"16\" max=\"160\" step=\"2\" class=\"svelte-1n46o8q\"/>", 1), Wu = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick tb-grow svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span> <!>", 1), Gu = /* @__PURE__ */ H("<div class=\"nav-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></div> <!>", 1), Ku = /* @__PURE__ */ H("<div class=\"nav-row svelte-1n46o8q\"><span class=\"nav-line svelte-1n46o8q\"><span class=\"footer-soc-preview svelte-1n46o8q\" aria-hidden=\"true\"></span> <!></span> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <input class=\"nav-target svelte-1n46o8q\"/></div>"), qu = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <!>", 1), Ju = /* @__PURE__ */ H("<label class=\"svelte-1n46o8q\"> <!></label> <label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <!>", 1), Yu = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><div class=\"footer-tpick svelte-1n46o8q\"></div></div></details> <details class=\"group svelte-1n46o8q\" open=\"\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button> <label class=\"svelte-1n46o8q\"> <!></label></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"gridmenu-snap svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><!> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!></div></details> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!> <button class=\"ghost action svelte-1n46o8q\"> </button></div></details></div>"), Xu = /* @__PURE__ */ H("<img class=\"site-icon-preview svelte-1n46o8q\" alt=\"\"/> <button class=\"ghost row-tool svelte-1n46o8q\"></button>", 1), Zu = /* @__PURE__ */ H("<details class=\"group samling-entry svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><span class=\"toolbar-row svelte-1n46o8q\"><input class=\"svelte-1n46o8q\"/> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <label class=\"svelte-1n46o8q\"> <input type=\"date\" class=\"svelte-1n46o8q\"/></label> <textarea rows=\"3\" class=\"svelte-1n46o8q\"></textarea> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <span class=\"toolbar-row svelte-1n46o8q\"><label class=\"ghost filepick svelte-1n46o8q\"> <input type=\"file\" accept=\"image/*\" class=\"svelte-1n46o8q\"/></label> <!></span></div></details>"), Qu = /* @__PURE__ */ H("<span class=\"toolbar-row svelte-1n46o8q\"><button class=\"ghost action svelte-1n46o8q\"> </button> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span> <!> <!> <hr class=\"gridmenu-divider svelte-1n46o8q\"/>", 1), $u = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <button class=\"ghost action svelte-1n46o8q\"> </button></div>"), ed = /* @__PURE__ */ H("<span class=\"plugin-meta svelte-1n46o8q\"> </span>"), td = /* @__PURE__ */ H("<p class=\"panel-hint plugin-warn svelte-1n46o8q\"> </p>"), nd = /* @__PURE__ */ H("<div><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><label class=\"gridmenu-snap plugin-toggle svelte-1n46o8q\"><input type=\"checkbox\" class=\"svelte-1n46o8q\"/> </label> <button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span> <!> <!></div>"), rd = /* @__PURE__ */ H("<div class=\"plugin-row svelte-1n46o8q\"><span class=\"plugin-head svelte-1n46o8q\"><span class=\"plugin-name svelte-1n46o8q\"> </span> <!> <span class=\"row-tools svelte-1n46o8q\"><button class=\"ghost row-tool svelte-1n46o8q\"></button></span></span></div>"), id = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <p class=\"panel-strong svelte-1n46o8q\"> </p> <!>", 1), ad = /* @__PURE__ */ H("<hr class=\"gridmenu-divider svelte-1n46o8q\"/> <input class=\"svelte-1n46o8q\"/> <button class=\"ghost action svelte-1n46o8q\"> </button> <!>", 1), od = /* @__PURE__ */ H("<div class=\"panel-body svelte-1n46o8q\"><!> <!> <!> <!></div>"), sd = /* @__PURE__ */ H("<div><span class=\"history-msg svelte-1n46o8q\"> </span> <span class=\"history-meta svelte-1n46o8q\"> </span></div>"), cd = /* @__PURE__ */ H("<button class=\"ghost svelte-1n46o8q\"> </button> <!>", 1), ld = /* @__PURE__ */ H("<!> <!>", 1), ud = /* @__PURE__ */ H("<p class=\"panel-hint svelte-1n46o8q\"> </p> <button class=\"ghost svelte-1n46o8q\"> </button>", 1), dd = /* @__PURE__ */ H("<span class=\"update-arrow svelte-1n46o8q\"></span> <span class=\"badge svelte-1n46o8q\"> </span>", 1), fd = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"><p class=\"update-notes svelte-1n46o8q\"> </p></div></details>"), pd = /* @__PURE__ */ H("<details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"><span class=\"update-warn svelte-1n46o8q\"></span> </summary> <div class=\"group-items svelte-1n46o8q\"><pre class=\"update-headers svelte-1n46o8q\"> </pre></div></details>"), md = /* @__PURE__ */ H("<span class=\"chip svelte-1n46o8q\"> </span>"), hd = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <span class=\"update-warn svelte-1n46o8q\"></span></span></div>"), gd = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span class=\"update-path svelte-1n46o8q\"> </span> <!></div>"), _d = /* @__PURE__ */ H("<span class=\"update-warn svelte-1n46o8q\"></span>"), vd = /* @__PURE__ */ H("<div class=\"update-row svelte-1n46o8q\"><span> </span> <span class=\"update-flags svelte-1n46o8q\"><!> <!> <input type=\"checkbox\" class=\"svelte-1n46o8q\"/></span></div>"), yd = /* @__PURE__ */ H("<div class=\"ctl-row update-opt-head svelte-1n46o8q\"><p class=\"panel-strong svelte-1n46o8q\"> </p> <span class=\"mini-label svelte-1n46o8q\"> </span></div> <!>", 1), bd = /* @__PURE__ */ H("<p class=\"update-summary svelte-1n46o8q\"> </p> <!> <!> <!> <details class=\"group svelte-1n46o8q\"><summary class=\"svelte-1n46o8q\"> </summary> <div class=\"group-items svelte-1n46o8q\"></div></details> <!> <button class=\"primary update-run svelte-1n46o8q\"> </button>", 1), xd = /* @__PURE__ */ H("<div class=\"update-versions svelte-1n46o8q\"><span class=\"update-from svelte-1n46o8q\"> </span> <!></div> <!>", 1), Sd = /* @__PURE__ */ H("<aside class=\"panel svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!></aside>"), Cd = /* @__PURE__ */ H("<nav class=\"rail svelte-1n46o8q\"><!> <span class=\"rail-settings svelte-1n46o8q\"><span class=\"rail-brand svelte-1n46o8q\" title=\"Urd\"><svg class=\"brand-mark svelte-1n46o8q\" viewBox=\"10.3 8.3 19.4 25.4\" aria-hidden=\"true\"><path d=\"M12 32V10l16 6.5V32\" fill=\"none\" stroke=\"var(--urd-brand)\" stroke-width=\"3.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg> <span class=\"brand-word svelte-1n46o8q\">Urd</span></span> <button></button> <!></span></nav> <!>", 1), wd = /* @__PURE__ */ H("<div class=\"workspace svelte-1n46o8q\"><!> <div><div class=\"stage svelte-1n46o8q\"><iframe class=\"svelte-1n46o8q\"></iframe></div></div></div>"), Td = /* @__PURE__ */ H("<p class=\"loading svelte-1n46o8q\"> </p>"), Ed = /* @__PURE__ */ H("<p class=\"panel-hint confirm-line svelte-1n46o8q\"> </p>"), Dd = /* @__PURE__ */ H("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <!> <!> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), Od = /* @__PURE__ */ H("<div class=\"setup-overlay svelte-1n46o8q\"><div class=\"setup-card svelte-1n46o8q\"><h2 class=\"svelte-1n46o8q\"> </h2> <p class=\"panel-hint svelte-1n46o8q\"> </p> <label class=\"svelte-1n46o8q\"> <input class=\"svelte-1n46o8q\"/></label> <label class=\"svelte-1n46o8q\"> <!></label> <label class=\"svelte-1n46o8q\"> <!></label> <p class=\"panel-hint svelte-1n46o8q\"> </p> <span class=\"setup-actions svelte-1n46o8q\"><button class=\"ghost svelte-1n46o8q\"> </button> <button class=\"primary svelte-1n46o8q\"> </button></span></div></div>"), kd = /* @__PURE__ */ H("<div><span> </span> <button class=\"toast-x svelte-1n46o8q\">×</button></div>"), Ad = /* @__PURE__ */ H("<div class=\"block-menu svelte-1n46o8q\"><header class=\"block-menu-head svelte-1n46o8q\"><span> </span> <button class=\"ghost row-tool svelte-1n46o8q\"></button></header> <div class=\"panel-body block-menu-body svelte-1n46o8q\"><!></div></div>"), jd = /* @__PURE__ */ H("<div class=\"editor svelte-1n46o8q\"><!> <header><span class=\"topbar-group svelte-1n46o8q\"><!> <!></span> <span class=\"topbar-group topbar-draft svelte-1n46o8q\"><!></span> <span class=\"topbar-group topbar-right svelte-1n46o8q\"><!></span></header> <!> <!> <!> <!> <!></div>   <!>", 1);
function Md(e, t) {
	Ke(t, !0);
	let n = (e, t = f, n = f) => {
		var r = jc(), i = L(r);
		Wr(i, 17, n, Br, (e, r, i) => {
			var a = Ac(), s = I(a), l = I(s);
			{
				let e = /* @__PURE__ */ M(() => X("tip.bg.changeType")), n = /* @__PURE__ */ M(() => o.map(([e, t]) => [e, t.labelKey ? X(t.labelKey) : t.label]));
				Z(l, {
					get value() {
						return B(r).type;
					},
					get title() {
						return B(e);
					},
					get options() {
						return B(n);
					},
					onchange: (e) => Wn(t(), i, e)
				});
			}
			var u = R(l, 2), d = I(u);
			d.disabled = i === 0, K(d, () => c.up, !0), A(d);
			var f = R(d, 2);
			K(f, () => c.down, !0), A(f);
			var p = R(f, 2);
			K(p, () => c.cross, !0), A(p), A(u), A(s);
			var m = R(s, 2), h = (e) => {
				var n = _c(), a = L(n), o = I(a), s = R(o);
				{
					let e = /* @__PURE__ */ M(rr), n = /* @__PURE__ */ M(() => X("tip.bg.layerColor"));
					aa(s, {
						get value() {
							return B(r).props.value;
						},
						get tokens() {
							return B(e);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => Dn(t(), i, "value", e)
					});
				}
				A(a);
				var c = R(a, 2), l = I(c), u = R(l), d = I(u);
				A(u), A(c);
				var f = R(c, 2);
				q(f), z((e, t, n) => {
					W(o, `${e ?? ""} `), W(l, `${t ?? ""} `), W(d, `${n ?? ""}%`), J(f, B(r).props.opacity ?? 1);
				}, [
					() => X("lbl.color"),
					() => X("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100)
				]), V("input", f, (e) => Dn(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, g = (e) => {
				let n = /* @__PURE__ */ M(() => Nn(B(r))), a = /* @__PURE__ */ M(() => B(n).stops.reduce((e, t) => e + Math.max(0, Number(t.share) || 0), 0));
				var o = Sc(), s = L(o), l = I(s), u = R(l);
				{
					let e = /* @__PURE__ */ M(() => B(n).kind ?? "linear"), r = /* @__PURE__ */ M(() => [["linear", X("opt.grad.linear")], ["radial", X("opt.grad.radial")]]);
					Z(u, {
						get value() {
							return B(e);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => Ln(t(), i, e)
					});
				}
				A(s);
				var d = R(s, 2);
				Wr(d, 17, () => B(n).stops, Br, (e, r, o) => {
					var s = yc();
					let l;
					var u = I(s), d = R(u, 2);
					{
						let e = /* @__PURE__ */ M(rr), n = /* @__PURE__ */ M(() => X("tip.bg.stopColor"));
						aa(d, {
							get value() {
								return B(r).color;
							},
							get tokens() {
								return B(e);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => Rn(t(), i, o, { color: e })
						});
					}
					var f = R(d, 2);
					q(f);
					var p = R(f, 2), m = I(p);
					A(p);
					var h = R(p, 2), g = (e) => {
						var n = vc();
						K(n, () => c.cross, !0), A(n), z((e) => Y(n, "title", e), [() => X("tip.bg.removeStop")]), V("click", n, () => Bn(t(), i, o)), U(e, n);
					};
					G(h, (e) => {
						B(n).stops.length > 2 && e(g);
					}), A(s), z((e, t, a) => {
						l = di(s, 1, "nav-line grad-stop svelte-1n46o8q", null, l, {
							dragging: B(Hn)?.layer === i && B(Hn).from === o,
							"drop-above": B(Hn)?.layer === i && B(Hn).insert === o,
							"drop-below": B(Hn)?.layer === i && B(Hn).insert === B(n).stops.length && o === B(n).stops.length - 1
						}), Y(u, "title", e), J(f, B(r).share ?? 50), Y(f, "title", t), W(m, `${a ?? ""}%`);
					}, [
						() => X("tip.bg.dragStop"),
						() => X("tip.bg.stopShare"),
						() => B(a) > 0 ? Math.round(Math.max(0, Number(B(r).share) || 0) / B(a) * 100) : Math.round(100 / B(n).stops.length)
					]), V("pointerdown", u, (e) => Un(t(), e, i, o)), V("input", f, (e) => Rn(t(), i, o, { share: Number(e.target.value) })), U(e, s);
				});
				var f = R(d, 2), p = I(f, !0);
				A(f);
				var m = R(f, 2), h = (e) => {
					var r = bc(), a = L(r), o = I(a), s = R(o), c = I(s);
					A(s), A(a);
					var l = R(a, 2);
					q(l);
					var u = R(l, 2), d = I(u), f = R(d), p = I(f);
					A(f), A(u);
					var m = R(u, 2);
					q(m), z((e, t, r, i) => {
						W(o, `${e ?? ""} `), W(c, `${t ?? ""}%`), J(l, B(n).x ?? .5), W(d, `${r ?? ""} `), W(p, `${i ?? ""}%`), J(m, B(n).y ?? .5);
					}, [
						() => X("lbl.centerX"),
						() => Math.round((B(n).x ?? .5) * 100),
						() => X("lbl.centerY"),
						() => Math.round((B(n).y ?? .5) * 100)
					]), V("input", l, (e) => Fn(t(), i, "x", Number(e.target.value))), V("input", m, (e) => Fn(t(), i, "y", Number(e.target.value))), U(e, r);
				}, g = (e) => {
					var r = xc(), a = L(r), o = I(a), s = R(o), c = I(s);
					A(s), A(a);
					var l = R(a, 2);
					q(l), z((e) => {
						W(o, `${e ?? ""} `), W(c, `${B(n).angle ?? ""}°`), J(l, B(n).angle);
					}, [() => X("lbl.angle")]), V("input", l, (e) => Fn(t(), i, "angle", Number(e.target.value))), U(e, r);
				};
				G(m, (e) => {
					(B(n).kind ?? "linear") === "radial" ? e(h) : e(g, -1);
				});
				var _ = R(m, 2), v = I(_), y = R(v), b = I(y);
				A(y), A(_);
				var x = R(_, 2);
				q(x);
				var S = R(x, 2), C = I(S), w = R(C);
				{
					let e = /* @__PURE__ */ M(() => B(n).animation ?? "none");
					Z(w, {
						get value() {
							return B(e);
						},
						get options() {
							return In[(B(n).kind ?? "linear") === "radial" ? "radial" : "linear"];
						},
						onchange: (e) => Fn(t(), i, "animation", e)
					});
				}
				A(S), z((e, t, r, i, a, o, s) => {
					W(l, `${e ?? ""} `), Y(f, "title", t), W(p, r), W(v, `${i ?? ""} `), W(b, `${a ?? ""}%`), J(x, B(n).opacity ?? 1), Y(S, "title", o), W(C, `${s ?? ""} `);
				}, [
					() => X("blocks.shape"),
					() => X("tip.bg.addStop"),
					() => X("ui.addStop"),
					() => X("lbl.strength"),
					() => Math.round((B(n).opacity ?? 1) * 100),
					() => X("tip.bg.motion"),
					() => X("lbl.motion")
				]), V("click", f, () => zn(t(), i)), V("input", x, (e) => Fn(t(), i, "opacity", Number(e.target.value))), U(e, o);
			}, _ = (e) => {
				var n = Cc(), a = L(n), o = I(a), s = R(o);
				{
					let e = /* @__PURE__ */ M(rr), n = /* @__PURE__ */ M(() => X("tip.bg.glowColor"));
					aa(s, {
						get value() {
							return B(r).props.color;
						},
						get tokens() {
							return B(e);
						},
						get label() {
							return B(n);
						},
						onchange: (e) => Dn(t(), i, "color", e)
					});
				}
				A(a);
				var c = R(a, 2), l = I(c), u = R(l), d = I(u);
				A(u), A(c);
				var f = R(c, 2);
				q(f);
				var p = R(f, 2), m = I(p), h = R(m), g = I(h);
				A(h), A(p);
				var _ = R(p, 2);
				q(_);
				var v = R(_, 2), y = I(v), b = R(y), x = I(b);
				A(b), A(v);
				var S = R(v, 2);
				q(S);
				var C = R(S, 2), w = I(C), T = R(w), ee = I(T);
				A(T), A(C);
				var te = R(C, 2);
				q(te), z((e, t, n, i, a, s, c, u, p) => {
					W(o, `${e ?? ""} `), W(l, `${t ?? ""} `), W(d, `${n ?? ""}%`), J(f, B(r).props.x), W(m, `${i ?? ""} `), W(g, `${a ?? ""}%`), J(_, B(r).props.y), W(y, `${s ?? ""} `), W(x, `${c ?? ""}%`), J(S, B(r).props.radius), W(w, `${u ?? ""} `), W(ee, `${p ?? ""}%`), J(te, B(r).props.opacity);
				}, [
					() => X("lbl.color"),
					() => X("lbl.posX"),
					() => Math.round(B(r).props.x * 100),
					() => X("lbl.posY"),
					() => Math.round(B(r).props.y * 100),
					() => X("lbl.size"),
					() => Math.round(B(r).props.radius * 100),
					() => X("lbl.strength"),
					() => Math.round(B(r).props.opacity * 100)
				]), V("input", f, (e) => Dn(t(), i, "x", Number(e.target.value))), V("input", _, (e) => Dn(t(), i, "y", Number(e.target.value))), V("input", S, (e) => Dn(t(), i, "radius", Number(e.target.value))), V("input", te, (e) => Dn(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, v = (e) => {
				var n = wc(), a = L(n), o = I(a), s = R(o), c = I(s);
				A(s), A(a);
				var l = R(a, 2);
				q(l), z((e, t) => {
					W(o, `${e ?? ""} `), W(c, `${t ?? ""}%`), J(l, B(r).props.opacity);
				}, [() => X("lbl.strength"), () => Math.round(B(r).props.opacity * 100)]), V("input", l, (e) => Dn(t(), i, "opacity", Number(e.target.value))), U(e, n);
			}, y = (e) => {
				let n = /* @__PURE__ */ M(() => B(r).props.fit === "flislegg" || B(r).props.fit === "repeat");
				var a = Dc(), o = L(a), s = I(o), c = R(s);
				A(o);
				var l = R(o, 2), u = I(l), d = R(u);
				{
					let e = /* @__PURE__ */ M(() => B(n) ? "flislegg" : "vanlig"), r = /* @__PURE__ */ M(() => [["vanlig", X("opt.img.plain")], ["flislegg", X("opt.img.tile")]]);
					Z(d, {
						get value() {
							return B(e);
						},
						get options() {
							return B(r);
						},
						onchange: (e) => Dn(t(), i, "fit", e)
					});
				}
				A(l);
				var f = R(l, 2), p = I(f, !0);
				A(f);
				var m = R(f, 2), h = I(m), g = R(h, 2);
				q(g);
				var _ = R(g, 4);
				A(m);
				var v = R(m, 2), y = (e) => {
					var n = Tc(), a = L(n), o = I(a), s = I(o, !0);
					A(o);
					var c = R(o, 2), l = I(c, !0);
					A(c), A(a);
					var u = R(a, 2), d = I(u, !0);
					A(u);
					var f = R(u, 2), p = R(f, 2), m = I(p), h = R(m), g = I(h);
					A(h), A(p);
					var _ = R(p, 2);
					q(_);
					var v = R(_, 2), y = I(v), b = R(y), x = I(b);
					A(b), A(v);
					var S = R(v, 2);
					q(S), z((e, t, n, i, a, p, h, v, b, C, w, T) => {
						Y(o, "title", e), W(s, t), Y(c, "title", n), W(l, i), Y(u, "title", a), W(d, p), pi(f, `--fx:${h ?? ""}%; --fy:${v ?? ""}%`), W(m, `${b ?? ""} `), W(g, `${C ?? ""}%`), J(_, B(r).props.x ?? .5), W(y, `${w ?? ""} `), W(x, `${T ?? ""}%`), J(S, B(r).props.y ?? .5);
					}, [
						() => X("tip.bg.cover"),
						() => X("ui.cover"),
						() => X("opt.fitFrame.contain"),
						() => X("opt.fit.contain"),
						() => X("tip.bg.position"),
						() => X("lbl.position"),
						() => Math.max(0, Math.min(1, B(r).props.x ?? .5)) * 100,
						() => Math.max(0, Math.min(1, B(r).props.y ?? .5)) * 100,
						() => X("lbl.horizontal"),
						() => Math.round((B(r).props.x ?? .5) * 100),
						() => X("lbl.vertical"),
						() => Math.round((B(r).props.y ?? .5) * 100)
					]), V("click", o, () => Mn(t(), i, B(r), "cover")), V("click", c, () => Mn(t(), i, B(r), "contain")), V("pointerdown", f, (e) => On(e, t(), i, "xy")), V("input", _, (e) => Dn(t(), i, "x", Number(e.target.value))), V("input", S, (e) => Dn(t(), i, "y", Number(e.target.value))), U(e, n);
				};
				G(v, (e) => {
					B(n) || e(y);
				});
				var b = R(v, 2), x = I(b), S = R(x), C = I(S);
				A(S), A(b);
				var w = R(b, 2);
				q(w);
				var T = R(w, 2), ee = I(T), te = R(ee), ne = I(te);
				A(te), A(T);
				var re = R(T, 2);
				q(re);
				var ie = R(re, 2), ae = I(ie);
				q(ae);
				var oe = R(ae);
				A(ie);
				var se = R(ie, 2), ce = (e) => {
					var n = Ec(), a = L(n), o = I(a), s = R(o), c = I(s);
					A(s), A(a);
					var l = R(a, 2);
					q(l);
					var u = R(l, 2), d = I(u), f = R(d);
					{
						let e = /* @__PURE__ */ M(() => B(r).props.bleed ?? "none"), n = /* @__PURE__ */ M(() => [
							["none", X("common.none")],
							["up", X("opt.bleed.up")],
							["down", X("opt.bleed.down")],
							["both", X("opt.brand.both")]
						]);
						Z(f, {
							get value() {
								return B(e);
							},
							get options() {
								return B(n);
							},
							onchange: (e) => Dn(t(), i, "bleed", e)
						});
					}
					A(u), z((e, t, n, i) => {
						W(o, `${e ?? ""} `), W(c, `${t ?? ""}%`), J(l, B(r).props.parallax ?? .3), Y(u, "title", n), W(d, `${i ?? ""} `);
					}, [
						() => X("lbl.parallaxStrength"),
						() => Math.round((B(r).props.parallax ?? 0) * 100),
						() => X("tip.bg.bleed"),
						() => X("lbl.bleed")
					]), V("input", l, (e) => Dn(t(), i, "parallax", Number(e.target.value))), U(e, n);
				};
				G(se, (e) => {
					(B(r).props.parallax ?? 0) > 0 && e(ce);
				}), z((e, t, n, i, a, c, d, m, v, y, b, S, T, te) => {
					Y(o, "title", e), W(s, `${t ?? ""} `), Y(l, "title", n), W(u, `${i ?? ""} `), Y(f, "title", a), W(p, c), Y(h, "title", d), J(g, m), Y(_, "title", v), W(x, `${y ?? ""} `), W(C, `${B(r).props.blur ?? 0 ?? ""} px`), J(w, B(r).props.blur ?? 0), W(ee, `${b ?? ""} `), W(ne, `${S ?? ""}%`), J(re, B(r).props.opacity ?? 1), Y(ie, "title", T), vi(ae, (B(r).props.parallax ?? 0) > 0), W(oe, ` ${te ?? ""}`);
				}, [
					() => X("tip.webpAuto"),
					() => B(r).props.src ? X("ui.changeImage") : X("ui.chooseImage"),
					() => X("tip.bg.fit"),
					() => X("lbl.fit"),
					() => X("tip.bg.size"),
					() => X("lbl.size"),
					() => X("tip.smaller"),
					() => Math.round((B(r).props.size ?? 1) * 100),
					() => X("tip.larger"),
					() => X("lbl.blur"),
					() => X("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100),
					() => X("tip.bg.parallax"),
					() => X("lbl.parallax")
				]), V("change", c, (e) => Jn(t(), i, e)), V("click", h, () => An(t(), i, B(r).props.size ?? 1, -.05)), V("change", g, (e) => jn(t(), i, e.target.value)), V("click", _, () => An(t(), i, B(r).props.size ?? 1, .05)), V("input", w, (e) => Dn(t(), i, "blur", Number(e.target.value))), V("input", re, (e) => Dn(t(), i, "opacity", Number(e.target.value))), V("change", ae, (e) => Dn(t(), i, "parallax", e.target.checked ? .3 : 0)), U(e, a);
			}, b = (e) => {
				var n = kc(), a = L(n), o = I(a), s = R(o);
				A(a);
				var l = R(a, 2);
				Wr(l, 17, () => B(r).props.images ?? [], Br, (e, n, a) => {
					var o = Oc(), s = L(o), l = I(s), u = R(l, 2), d = I(u);
					d.disabled = a === 0, K(d, () => c.up, !0), A(d);
					var f = R(d, 2);
					K(f, () => c.down, !0), A(f);
					var p = R(f, 2);
					K(p, () => c.cross, !0), A(p), A(u), A(s);
					var m = R(s, 2), h = I(m), g = R(h), _ = I(g);
					A(g), A(m);
					var v = R(m, 2);
					q(v);
					var y = R(v, 2), b = I(y), x = R(b), S = I(x);
					A(x), A(y);
					var C = R(y, 2);
					q(C), z((e, t, i, o, s) => {
						Y(l, "src", B(n).src), f.disabled = a === B(r).props.images.length - 1, Y(p, "title", e), W(h, `${t ?? ""} `), W(_, `${i ?? ""}%`), J(v, B(n).x ?? .5), W(b, `${o ?? ""} `), W(S, `${s ?? ""}%`), J(C, B(n).y ?? .5);
					}, [
						() => X("tip.removeImage"),
						() => X("lbl.focusX"),
						() => Math.round((B(n).x ?? .5) * 100),
						() => X("lbl.focusY"),
						() => Math.round((B(n).y ?? .5) * 100)
					]), V("click", d, () => Xn(t(), i, a, -1)), V("click", f, () => Xn(t(), i, a, 1)), V("click", p, () => Zn(t(), i, a)), V("input", v, (e) => Qn(t(), i, a, "x", Number(e.target.value))), V("input", C, (e) => Qn(t(), i, a, "y", Number(e.target.value))), U(e, o);
				});
				var u = R(l, 2), d = I(u), f = R(d);
				{
					let e = /* @__PURE__ */ M(() => B(r).props.fit ?? "cover"), n = /* @__PURE__ */ M(() => [["cover", X("opt.fit.cover")], ["contain", X("opt.fit.contain")]]);
					Z(f, {
						get value() {
							return B(e);
						},
						get options() {
							return B(n);
						},
						onchange: (e) => Dn(t(), i, "fit", e)
					});
				}
				A(u);
				var p = R(u, 2), m = I(p), h = R(m);
				q(h), A(p);
				var g = R(p, 2), _ = I(g), v = R(_), y = I(v);
				A(v), A(g);
				var b = R(g, 2);
				q(b);
				var x = R(b, 2), S = I(x), C = R(S), w = I(C);
				A(C), A(x);
				var T = R(x, 2);
				q(T);
				var ee = R(T, 2), te = I(ee), ne = R(te), re = I(ne);
				A(ne), A(ee);
				var ie = R(ee, 2);
				q(ie);
				var ae = R(ie, 2), oe = I(ae, !0);
				A(ae), z((e, t, n, i, s, c, l, u, f, g, v) => {
					Y(a, "title", e), W(o, `${t ?? ""} `), W(d, `${n ?? ""} `), Y(p, "title", i), W(m, `${s ?? ""} `), J(h, B(r).props.interval ?? 6), W(_, `${c ?? ""} `), W(y, `${l ?? ""} s`), J(b, B(r).props.fade ?? 1.5), W(S, `${u ?? ""} `), W(w, `${B(r).props.blur ?? 0 ?? ""} px`), J(T, B(r).props.blur ?? 0), W(te, `${f ?? ""} `), W(re, `${g ?? ""}%`), J(ie, B(r).props.opacity ?? 1), W(oe, v);
				}, [
					() => X("tip.bg.addImages"),
					() => X("ui.addImages"),
					() => X("lbl.fit"),
					() => X("hint.bg.gallery"),
					() => X("lbl.secondsPerImage"),
					() => X("lbl.transition"),
					() => (B(r).props.fade ?? 1.5).toFixed(1),
					() => X("lbl.blur"),
					() => X("lbl.strength"),
					() => Math.round((B(r).props.opacity ?? 1) * 100),
					() => X("hint.bg.gallery")
				]), V("change", s, (e) => Yn(t(), i, e)), V("change", h, (e) => Dn(t(), i, "interval", Number(e.target.value))), V("input", b, (e) => Dn(t(), i, "fade", Number(e.target.value))), V("input", T, (e) => Dn(t(), i, "blur", Number(e.target.value))), V("input", ie, (e) => Dn(t(), i, "opacity", Number(e.target.value))), U(e, n);
			};
			G(m, (e) => {
				B(r).type === "color" ? e(h) : B(r).type === "gradient" ? e(g, 1) : B(r).type === "glow" ? e(_, 2) : B(r).type === "grain" ? e(v, 3) : B(r).type === "image" ? e(y, 4) : B(r).type === "bildegalleri" && e(b, 5);
			}), A(a), z((e, t, r) => {
				Y(d, "title", e), Y(f, "title", t), f.disabled = i === n().length - 1, Y(p, "title", r);
			}, [
				() => X("hint.bg.order"),
				() => X("hint.bg.order"),
				() => X("tip.bg.removeLayer")
			]), V("click", d, () => En(t(), i, -1)), V("click", f, () => En(t(), i, 1)), V("click", p, () => Tn(t(), i)), U(e, a);
		});
		var a = R(i, 2), s = I(a), l = R(s);
		{
			let e = /* @__PURE__ */ M(() => o.map(([e, t]) => [e, t.labelKey ? X(t.labelKey) : t.label]));
			Z(l, {
				get value() {
					return B(Cn);
				},
				get options() {
					return B(e);
				},
				onchange: (e) => F(Cn, e, !0)
			});
		}
		A(a);
		var u = R(a, 2), d = I(u, !0);
		A(u), z((e, t) => {
			W(s, `${e ?? ""} `), W(d, t);
		}, [() => X("lbl.newLayer"), () => X("ui.addLayer")]), V("click", u, () => wn(t(), B(Cn))), U(e, r);
	}, r = (e, t = f, n = f) => {
		var r = Nr();
		Wr(L(r), 17, n, Br, (e, r, i) => {
			var a = Nc(), o = I(a);
			q(o);
			var s = R(o, 2), l = I(s);
			l.disabled = i === 0, K(l, () => c.up, !0), A(l);
			var u = R(l, 2);
			K(u, () => c.down, !0), A(u);
			var d = R(u, 2);
			K(d, () => c.cross, !0), A(d), A(s);
			var f = R(s, 2), p = I(f);
			{
				let e = /* @__PURE__ */ M(() => B(r).page ?? "__href"), n = /* @__PURE__ */ M(() => X("tip.linkTarget")), a = /* @__PURE__ */ M(() => [...B(O).pages.map((e) => [e.id, e.title]), ["__href", X("opt.linkHref")]]);
				Z(p, {
					get value() {
						return B(e);
					},
					get title() {
						return B(n);
					},
					get options() {
						return B(a);
					},
					onchange: (e) => Ds(t(), i, e)
				});
			}
			A(f);
			var m = R(f, 2), h = (e) => {
				var n = Mc();
				q(n), z((e, t) => {
					J(n, B(r).href ?? ""), Y(n, "placeholder", e), Y(n, "title", t);
				}, [() => X("ph.hrefAnchor"), () => X("tip.hrefAnchor")]), V("change", n, (e) => Os(t(), i, e.target.value)), U(e, n);
			};
			G(m, (e) => {
				B(r).page || e(h);
			}), A(a), z((e, t) => {
				J(o, B(r).label), Y(o, "title", e), u.disabled = i === n().length - 1, Y(d, "title", t);
			}, [() => X("tip.linkLabel"), () => X("tip.removeLink")]), V("input", o, (e) => Es(t(), i, e.target.value)), V("click", l, () => Ts(t(), i, -1)), V("click", u, () => Ts(t(), i, 1)), V("click", d, () => ws(t(), i)), U(e, a);
		}), U(e, r);
	}, i = (e) => {
		let t = /* @__PURE__ */ M(() => B(j).props.boxStyle ?? {});
		var n = Ic(), r = L(n), i = I(r), a = R(i);
		{
			let e = /* @__PURE__ */ M(() => B(t).bg ?? ""), n = /* @__PURE__ */ M(rr), r = /* @__PURE__ */ M(() => X("tip.box.bg"));
			aa(a, {
				get value() {
					return B(e);
				},
				get tokens() {
					return B(n);
				},
				allowClear: !0,
				get label() {
					return B(r);
				},
				onchange: (e) => zt({ bg: e || null })
			});
		}
		A(r);
		var o = R(r, 2), s = I(o), c = R(s);
		{
			let e = /* @__PURE__ */ M(() => B(t).shadow ?? ""), n = /* @__PURE__ */ M(() => [
				["", X("common.none")],
				["soft", X("opt.shadow.soft")],
				["strong", X("opt.shadow.strong")]
			]);
			Z(c, {
				get value() {
					return B(e);
				},
				get options() {
					return B(n);
				},
				onchange: (e) => zt({ shadow: e || null })
			});
		}
		A(o);
		var l = R(o, 2), u = (e) => {
			var n = Pc(), r = I(n), i = R(r);
			{
				let e = /* @__PURE__ */ M(() => B(t).shadowColor ?? ""), n = /* @__PURE__ */ M(rr), r = /* @__PURE__ */ M(() => X("tip.box.shadowColor"));
				aa(i, {
					get value() {
						return B(e);
					},
					get tokens() {
						return B(n);
					},
					allowClear: !0,
					get label() {
						return B(r);
					},
					onchange: (e) => zt({ shadowColor: e || null })
				});
			}
			A(n), z((e) => W(r, `${e ?? ""} `), [() => X("lbl.shadowColor")]), U(e, n);
		};
		G(l, (e) => {
			B(t).shadow && e(u);
		});
		var d = R(l, 2), f = I(d), p = R(f);
		{
			let e = /* @__PURE__ */ M(() => B(t).border === "none" ? "none" : B(t).border ? "custom" : ""), n = /* @__PURE__ */ M(() => [
				["", X("opt.border.theme")],
				["none", X("common.none")],
				["custom", X("opt.border.custom")]
			]);
			Z(p, {
				get value() {
					return B(e);
				},
				get options() {
					return B(n);
				},
				onchange: (e) => zt({ border: e === "custom" ? {
					color: "accent",
					width: 1
				} : e || null })
			});
		}
		A(d);
		var m = R(d, 2), h = (e) => {
			let n = /* @__PURE__ */ M(() => typeof B(t).border == "object" ? B(t).border : {
				color: "text",
				width: 1
			});
			var r = Fc(), i = L(r), a = I(i), o = R(a);
			{
				let e = /* @__PURE__ */ M(rr), t = /* @__PURE__ */ M(() => X("tip.box.borderColor"));
				aa(o, {
					get value() {
						return B(n).color;
					},
					get tokens() {
						return B(e);
					},
					get label() {
						return B(t);
					},
					onchange: (e) => zt({ border: {
						...B(n),
						color: e
					} })
				});
			}
			A(i);
			var s = R(i, 2), c = I(s), l = R(c), u = I(l), d = R(u, 2);
			q(d);
			var f = R(d, 2);
			A(l), A(s), z((e, t, r, i, o, s) => {
				W(a, `${e ?? ""} `), W(c, `${t ?? ""} `), Y(u, "title", r), Y(u, "aria-label", i), J(d, B(n).width), Y(f, "title", o), Y(f, "aria-label", s);
			}, [
				() => X("lbl.borderColor"),
				() => X("lbl.thicknessPx"),
				() => X("tip.thinner"),
				() => X("tip.thinner"),
				() => X("tip.thicker"),
				() => X("tip.thicker")
			]), V("click", u, () => zt({ border: {
				...B(n),
				width: Math.max(1, B(n).width - 1)
			} })), V("change", d, (e) => zt({ border: {
				...B(n),
				width: Math.min(12, Math.max(1, Number(e.target.value) || 1))
			} })), V("click", f, () => zt({ border: {
				...B(n),
				width: Math.min(12, B(n).width + 1)
			} })), U(e, r);
		};
		G(m, (e) => {
			B(t).border !== "none" && e(h);
		});
		var g = R(m, 2), _ = I(g);
		q(_);
		var v = R(_);
		A(g), z((e, t, n, r, a, o) => {
			W(i, `${e ?? ""} `), W(s, `${t ?? ""} `), W(f, `${n ?? ""} `), Y(g, "title", r), vi(_, a), W(v, ` ${o ?? ""}`);
		}, [
			() => X("lbl.blockColor"),
			() => X("lbl.shadow"),
			() => X("lbl.border"),
			() => X("tip.box.glass"),
			() => !!B(t).glass,
			() => X("lbl.glass")
		]), V("change", _, (e) => zt({ glass: e.target.checked || null })), U(e, n);
	}, a = (e) => {
		var t = Al(), n = L(t), r = I(n), a = I(r);
		let o;
		var s = I(a, !0);
		A(a);
		var l = R(a, 2);
		let u;
		var d = I(l, !0);
		A(l), A(r), A(n);
		var f = R(n, 2), p = (e) => {
			var t = Nr(), n = L(t), r = (e) => {
				var t = Lc(), n = I(t, !0);
				A(t), z((e) => W(n, e), [() => X("hint.textInline")]), U(e, t);
			}, i = (e) => {
				var t = zc(), n = L(t), r = I(n);
				q(r);
				var i = R(r);
				A(n);
				var a = R(n, 2), o = I(a, !0);
				A(a);
				var s = R(a, 2);
				Wr(s, 17, () => B(j).props.items ?? [], Br, (e, t, n) => {
					var r = Rc(), i = I(r);
					q(i);
					var a = R(i, 2), o = I(a);
					o.disabled = n === 0, K(o, () => c.up, !0), A(o);
					var s = R(o, 2);
					K(s, () => c.down, !0), A(s);
					var l = R(s, 2);
					K(l, () => c.cross, !0), A(l), A(a), A(r), z((e, r) => {
						J(i, B(t).q), Y(i, "title", e), s.disabled = n === (B(j).props.items?.length ?? 0) - 1, Y(l, "title", r);
					}, [() => X("tip.faq.question"), () => X("tip.faq.remove")]), V("change", i, (e) => Bt(n, { q: e.target.value })), V("click", o, () => Ut(n, -1)), V("click", s, () => Ut(n, 1)), V("click", l, () => Ht(n)), U(e, r);
				});
				var l = R(s, 2), u = I(l, !0);
				A(l), z((e, t, a, s, c) => {
					Y(n, "title", e), vi(r, t), W(i, ` ${a ?? ""}`), W(o, s), W(u, c);
				}, [
					() => X("tip.faq.multi"),
					() => !!B(j).props.multi,
					() => X("lbl.faqMulti"),
					() => X("lbl.questions"),
					() => X("ui.addQuestion")
				]), V("change", r, (e) => N("multi", e.target.checked)), V("click", l, Vt), U(e, t);
			}, a = (e) => {
				var t = Vc(), n = L(t), r = I(n, !0);
				A(n);
				var i = R(n, 2);
				Wr(i, 17, () => B(j).props.items ?? [], Br, (e, t, n) => {
					var r = Bc(), i = L(r), a = I(i);
					q(a);
					var o = R(a, 2);
					q(o);
					var s = R(o, 2), l = I(s);
					l.disabled = n === 0, K(l, () => c.up, !0), A(l);
					var u = R(l, 2);
					K(u, () => c.down, !0), A(u);
					var d = R(u, 2);
					K(d, () => c.cross, !0), A(d), A(s), A(i);
					var f = R(i, 2);
					q(f), z((e, r, i, s, c, l) => {
						J(a, B(t).year), Y(a, "placeholder", e), Y(a, "title", r), J(o, B(t).title), Y(o, "title", i), u.disabled = n === (B(j).props.items?.length ?? 0) - 1, Y(d, "title", s), J(f, B(t).text), Y(f, "placeholder", c), Y(f, "title", l);
					}, [
						() => X("ph.tlYear"),
						() => X("tip.tl.year"),
						() => X("tip.tl.title"),
						() => X("tip.tl.remove"),
						() => X("ph.tlText"),
						() => X("tip.tl.text")
					]), V("change", a, (e) => Wt(n, { year: e.target.value })), V("change", o, (e) => Wt(n, { title: e.target.value })), V("click", l, () => qt(n, -1)), V("click", u, () => qt(n, 1)), V("click", d, () => Kt(n)), V("change", f, (e) => Wt(n, { text: e.target.value })), U(e, r);
				});
				var a = R(i, 2), o = I(a, !0);
				A(a), z((e, t) => {
					W(r, e), W(o, t);
				}, [() => X("lbl.tlItems"), () => X("ui.addTlItem")]), V("click", a, Gt), U(e, t);
			}, o = (e) => {
				var t = Hc(), n = L(t), r = I(n), i = R(r);
				q(i), A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				q(s), A(a);
				var c = R(a, 2), l = I(c), u = R(l);
				q(u), A(c), z((e, t, n) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.text ?? ""), W(o, `${t ?? ""} `), J(s, B(j).props.attribution ?? ""), W(l, `${n ?? ""} `), J(u, B(j).props.role ?? "");
				}, [
					() => X("lbl.sitatText"),
					() => X("lbl.sitatName"),
					() => X("lbl.sitatRole")
				]), V("change", i, (e) => N("text", e.target.value)), V("change", s, (e) => N("attribution", e.target.value)), V("change", u, (e) => N("role", e.target.value)), U(e, t);
			}, s = (e) => {
				var t = Uc(), n = L(t), r = I(n), i = R(r);
				q(i), A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				q(s), A(a);
				var c = R(a, 2), l = I(c), u = R(l);
				q(u), A(c);
				var d = R(c, 2), f = I(d), p = R(f);
				q(p), A(d), z((e, t, n, a, c) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.value ?? ""), Y(i, "title", t), W(o, `${n ?? ""} `), J(s, B(j).props.prefix ?? ""), W(l, `${a ?? ""} `), J(u, B(j).props.suffix ?? ""), W(f, `${c ?? ""} `), J(p, B(j).props.label ?? "");
				}, [
					() => X("lbl.statValue"),
					() => X("tip.stat.value"),
					() => X("lbl.statPrefix"),
					() => X("lbl.statSuffix"),
					() => X("lbl.statLabel")
				]), V("change", i, (e) => N("value", e.target.value)), V("change", s, (e) => N("prefix", e.target.value)), V("change", u, (e) => N("suffix", e.target.value)), V("change", p, (e) => N("label", e.target.value)), U(e, t);
			}, l = (e) => {
				var t = Wc(), n = L(t), r = I(n), i = I(r, !0);
				A(r);
				var a = R(r, 2), o = I(a, !0);
				A(a), A(n);
				var s = R(n, 2), c = I(s), l = I(c, !0);
				A(c);
				var u = R(c, 2), d = I(u, !0);
				A(u), A(s);
				var f = R(s, 2), p = I(f);
				q(p);
				var m = R(p);
				A(f), z((e, t, n, r, a, s) => {
					W(i, e), W(o, t), W(l, n), W(d, r), Y(f, "title", a), vi(p, B(j).props.header !== !1), W(m, ` ${s ?? ""}`);
				}, [
					() => X("ui.addRow"),
					() => X("ui.removeRow"),
					() => X("ui.addColumn"),
					() => X("ui.removeColumn"),
					() => X("tip.tabell.header"),
					() => X("lbl.tabellHeader")
				]), V("click", r, () => Yt(1, 0)), V("click", a, () => Yt(-1, 0)), V("click", c, () => Yt(0, 1)), V("click", u, () => Yt(0, -1)), V("change", p, (e) => N("header", e.target.checked)), U(e, t);
			}, u = (e) => {
				var t = Nr();
				Wr(L(t), 17, () => [
					["facebook", "Facebook"],
					["x", "X"],
					["linkedin", "LinkedIn"],
					["whatsapp", "WhatsApp"],
					["email", X("opt.deling.email")],
					["copy", X("opt.deling.copy")]
				], ([e, t]) => e, (e, t) => {
					var n = /* @__PURE__ */ M(() => h(B(t), 2));
					let r = () => B(n)[0], i = () => B(n)[1];
					var a = Gc(), o = I(a);
					q(o);
					var s = R(o);
					A(a), z((e) => {
						vi(o, e), W(s, ` ${i() ?? ""}`);
					}, [() => (B(j).props.services ?? []).includes(r())]), V("change", o, (e) => Xt(r(), e.target.checked)), U(e, a);
				}), U(e, t);
			}, d = (e) => {
				var t = Kc(), n = L(t), r = I(n), i = R(r);
				q(i), A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				q(s), A(a), z((e, t, n) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.target ?? ""), Y(a, "title", t), W(o, `${n ?? ""} `), J(s, B(j).props.doneText ?? "");
				}, [
					() => X("lbl.nedtellerTarget"),
					() => X("tip.nedteller.done"),
					() => X("lbl.nedtellerDone")
				]), V("change", i, (e) => N("target", e.target.value)), V("change", s, (e) => N("doneText", e.target.value)), U(e, t);
			}, f = (e) => {
				var t = Jc(), n = L(t), r = I(n), i = R(r);
				A(n);
				var a = R(n, 2), o = (e) => {
					var t = qc(), n = I(t, !0);
					A(t), z((e) => W(n, e), [() => X("ui.removeAudio")]), V("click", t, () => N("src", "")), U(e, t);
				};
				G(a, (e) => {
					B(j).props.src && e(o);
				});
				var s = R(a, 2), c = I(s), l = R(c);
				q(l), A(s);
				var u = R(s, 2), d = I(u);
				q(d);
				var f = R(d);
				A(u), z((e, t, i, a, o) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), W(c, `${i ?? ""} `), J(l, B(j).props.title ?? ""), vi(d, a), W(f, ` ${o ?? ""}`);
				}, [
					() => X("tip.blocks.audioFile"),
					() => X("ui.chooseAudio"),
					() => X("lbl.audioTitle"),
					() => !!B(j).props.loop,
					() => X("lbl.audioLoop")
				]), V("change", i, Zt), V("change", l, (e) => N("title", e.target.value)), V("change", d, (e) => N("loop", e.target.checked)), U(e, t);
			}, p = (e) => {
				var t = Xc(), n = L(t), r = I(n), i = R(r);
				q(i), A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.page ?? "__href"), t = /* @__PURE__ */ M(() => [...B(O).pages.map((e) => [e.id, e.title]), ["__href", X("opt.externalLink")]]);
					Z(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => {
							let t = e === "__href" ? null : e;
							At(`edit:${B(j).blockId}`, (e) => {
								e.props.page = t, t && (e.props.href = null);
							});
						}
					});
				}
				A(a);
				var c = R(a, 2), l = (e) => {
					var t = Yc();
					q(t), z((e) => {
						Y(t, "placeholder", e), J(t, B(j).props.href === "#" ? "" : B(j).props.href ?? "");
					}, [() => X("ph.url")]), V("change", t, (e) => N("href", e.target.value || null)), U(e, t);
				};
				G(c, (e) => {
					B(j).props.page || e(l);
				}), z((e, t) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.label), W(o, `${t ?? ""} `);
				}, [() => X("blocks.text"), () => X("lbl.goesTo")]), V("change", i, (e) => N("label", e.target.value)), U(e, t);
			}, m = (e) => {
				var t = Zc(), n = L(t), r = I(n), i = R(r);
				A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				q(s), A(a);
				var c = R(a, 2), l = I(c), u = R(l);
				q(u), A(c);
				var d = R(c, 2), f = (e) => {
					var t = Gc(), n = I(t);
					q(n);
					var r = R(n);
					A(t), z((e, i, a) => {
						Y(t, "title", e), vi(n, i), W(r, ` ${a ?? ""}`);
					}, [
						() => X("tip.lightbox"),
						() => !!B(j).props.lightbox,
						() => X("lbl.lightbox")
					]), V("change", n, (e) => N("lightbox", e.target.checked)), U(e, t);
				};
				G(d, (e) => {
					B(j).props.href || e(f);
				}), z((e, t, n, i, a) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), J(s, B(j).props.alt ?? ""), Y(s, "placeholder", n), W(l, `${i ?? ""} `), J(u, B(j).props.href ?? ""), Y(u, "placeholder", a);
				}, [
					() => X("ui.changeImage"),
					() => X("lbl.description"),
					() => X("ph.altText"),
					() => X("lbl.link"),
					() => X("ph.optionalImageLink")
				]), V("change", i, $t), V("change", s, (e) => N("alt", e.target.value)), V("change", u, (e) => N("href", e.target.value || null)), U(e, t);
			}, g = (e) => {
				var t = Qc(), n = L(t), r = I(n, !0);
				A(n);
				var i = R(n, 2);
				q(i);
				var a = R(i, 2), o = I(a), s = R(o);
				q(s), A(a), z((e, t, a, c) => {
					Y(n, "title", e), W(r, t), J(i, B(j).props.url ?? ""), Y(i, "placeholder", a), W(o, `${c ?? ""} `), J(s, B(j).props.title ?? "");
				}, [
					() => X("hint.video"),
					() => X("lbl.videoUrl"),
					() => X("ph.videoUrl"),
					() => X("lbl.videoTitle")
				]), V("change", i, (e) => N("url", e.target.value)), V("change", s, (e) => N("title", e.target.value)), U(e, t);
			}, _ = (e) => {
				var t = tl(), n = L(t), r = I(n), i = R(r), a = I(i);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.glyph ?? "★"), t = /* @__PURE__ */ M(() => B(j).props.icon ?? null), n = /* @__PURE__ */ M(() => B(j).props.image ?? null);
					La(a, {
						get value() {
							return B(e);
						},
						get icon() {
							return B(t);
						},
						get image() {
							return B(n);
						},
						onpick: (e) => At(`edit:${B(j).blockId}`, (t) => {
							t.props.glyph = e, t.props.icon = null, t.props.image = null;
						}),
						onicon: (e) => At(`edit:${B(j).blockId}`, (t) => {
							t.props.icon = e, t.props.image = null;
						}),
						onimage: (e) => N("image", e)
					});
				}
				var o = R(a, 2), s = (e) => {
					var t = $c();
					q(t), z((e) => {
						J(t, B(j).props.glyph ?? ""), Y(t, "title", e);
					}, [() => X("tip.icon.typeGlyph")]), V("change", t, (e) => N("glyph", e.target.value || "★")), U(e, t);
				}, c = (e) => {
					var t = qc(), n = I(t, !0);
					A(t), z((e, r) => {
						Y(t, "title", e), W(n, r);
					}, [() => X("tip.icon.backToGlyph"), () => X("ui.removeDrawnIcon")]), V("click", t, () => N("icon", null)), U(e, t);
				};
				G(o, (e) => {
					B(j).props.icon ? e(c, -1) : e(s);
				}), A(i), A(n);
				var l = R(n, 2), u = (e) => {
					var t = el(), n = I(t), r = R(n, 2), i = I(r, !0);
					A(r), A(t), z((e, r, a) => {
						Y(t, "title", e), Y(n, "src", B(j).props.image), Y(n, "alt", r), W(i, a);
					}, [
						() => X("hint.icon.ownImage"),
						() => X("gp.ownIcon"),
						() => X("ui.removeOwnIcon")
					]), V("click", r, () => N("image", null)), U(e, t);
				};
				G(l, (e) => {
					B(j).props.image && e(u);
				}), z((e) => W(r, `${e ?? ""} `), [() => X("blocks.icon")]), U(e, t);
			}, v = (e) => {
				var t = nl(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.collection ?? ""), t = /* @__PURE__ */ M(() => [["", X("common.choose")], ...B(Fa).map((e) => [e, B(Ia)[e]?.name ?? e])]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("collection", e || null)
					});
				}
				A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				q(s), A(a);
				var c = R(a, 2), l = I(c);
				q(l);
				var u = R(l);
				A(c), z((e, t, i, c, d) => {
					Y(n, "title", e), W(r, `${t ?? ""} `), Y(a, "title", i), W(o, `${c ?? ""} `), J(s, B(j).props.limit ?? 6), vi(l, B(j).props.newestFirst !== !1), W(u, ` ${d ?? ""}`);
				}, [
					() => X("tip.samling.source"),
					() => X("blocks.samling"),
					() => X("tip.samling.limit"),
					() => X("lbl.maxCount"),
					() => X("lbl.newestFirst")
				]), V("change", s, (e) => N("limit", Number(e.target.value))), V("change", l, (e) => N("newestFirst", e.target.checked)), U(e, t);
			}, y = (e) => {
				var t = il(), n = L(t), r = I(n), i = R(r);
				A(n), Wr(R(n, 2), 17, () => B(j).props.images ?? [], Br, (e, t, n) => {
					var r = rl(), i = I(r), a = I(i), o = R(a, 2), s = I(o);
					s.disabled = n === 0, K(s, () => c.up, !0), A(s);
					var l = R(s, 2);
					K(l, () => c.down, !0), A(l);
					var u = R(l, 2);
					K(u, () => c.cross, !0), A(u), A(o), A(i);
					var d = R(i, 2), f = I(d), p = R(f);
					q(p), A(d);
					var m = R(d, 2), h = I(m), g = R(h);
					q(g), A(m), A(r), z((e, r, o, s, c, d) => {
						Y(i, "title", e), Y(a, "src", B(t).src), l.disabled = n === B(j).props.images.length - 1, Y(u, "title", r), W(f, `${o ?? ""} `), J(p, B(t).alt ?? ""), Y(p, "placeholder", s), W(h, `${c ?? ""} `), J(g, B(t).href ?? ""), Y(g, "placeholder", d);
					}, [
						() => X("hint.gallery"),
						() => X("tip.removeImage"),
						() => X("lbl.description"),
						() => X("ph.altShort"),
						() => X("lbl.link"),
						() => X("ph.galleryHref")
					]), V("click", s, () => Df(n, -1)), V("click", l, () => Df(n, 1)), V("click", u, () => Of(n)), V("change", p, (e) => kf(n, "alt", e.target.value)), V("change", g, (e) => kf(n, "href", e.target.value || null)), U(e, r);
				}), z((e, t) => {
					Y(n, "title", e), W(r, `${t ?? ""} `);
				}, [() => X("tip.gallery.addImages"), () => X("ui.addImages")]), V("change", i, Tf), U(e, t);
			}, b = (e) => {
				var t = Pc(), n = I(t);
				Z(R(n), {
					get value() {
						return B(j).props.kind;
					},
					get options() {
						return nn;
					},
					onchange: (e) => N("kind", e)
				}), A(t), z((e) => W(n, `${e ?? ""} `), [() => X("blocks.shape")]), U(e, t);
			}, x = (e) => {
				let t = /* @__PURE__ */ M(() => B(gf).find((e) => e.type === B(j).type)?.fields ?? []);
				var n = Nr(), r = L(n), i = (e) => {
					var n = Nr();
					Wr(L(n), 17, () => B(t), (e) => e.key, (e, t) => {
						var n = Nr(), r = L(n), i = (e) => {
							let n = /* @__PURE__ */ M(() => `${B(j).blockId}:${B(t).key}`);
							var r = ol(), i = L(r), a = I(i), o = R(a);
							q(o), A(i);
							var s = R(i, 2), c = I(s, !0);
							A(s);
							var l = R(s, 2), u = (e) => {
								var t = al();
								let r;
								var i = I(t, !0);
								A(t), z(() => {
									r = di(t, 1, "panel-hint svelte-1n46o8q", null, r, { "place-error": Nt[B(n)].err }), W(i, Nt[B(n)].text);
								}), U(e, t);
							};
							G(l, (e) => {
								Nt[B(n)] && e(u);
							}), z((e) => {
								W(a, `${B(t).label ?? ""} `), Y(o, "placeholder", B(t).placeholder), J(o, Mt[B(n)] ?? B(j).props[B(t).key] ?? ""), s.disabled = B(Pt), W(c, e);
							}, [() => X("props.place.search")]), V("input", o, (e) => {
								Mt[B(n)] = e.target.value;
							}), V("keydown", o, (e) => {
								e.key === "Enter" && Lt(B(t));
							}), V("click", s, () => Lt(B(t))), U(e, r);
						}, a = (e) => {
							var n = sl(), r = I(n), i = R(r);
							q(i), A(n), z(() => {
								W(r, `${B(t).label ?? ""} `), Y(i, "min", B(t).min), Y(i, "max", B(t).max), Y(i, "step", B(t).step ?? 1), J(i, B(j).props[B(t).key]);
							}), V("change", i, (e) => N(B(t).key, It(B(t), Number(e.target.value)))), U(e, n);
						}, o = (e) => {
							var n = Gc(), r = I(n);
							q(r);
							var i = R(r);
							A(n), z((e) => {
								vi(r, e), W(i, ` ${B(t).label ?? ""}`);
							}, [() => !!B(j).props[B(t).key]]), V("change", r, (e) => N(B(t).key, e.target.checked)), U(e, n);
						}, s = (e) => {
							var n = Pc(), r = I(n), i = R(r);
							{
								let e = /* @__PURE__ */ M(() => (B(t).options ?? []).map((e) => [e.value, e.label]));
								Z(i, {
									get value() {
										return B(j).props[B(t).key];
									},
									get options() {
										return B(e);
									},
									onchange: (e) => N(B(t).key, e)
								});
							}
							A(n), z(() => W(r, `${B(t).label ?? ""} `)), U(e, n);
						}, c = (e) => {
							var n = cl(), r = I(n), i = R(r);
							q(i), A(n), z(() => {
								W(r, `${B(t).label ?? ""} `), Y(i, "placeholder", B(t).placeholder), J(i, B(j).props[B(t).key] ?? "");
							}), V("change", i, (e) => N(B(t).key, e.target.value)), U(e, n);
						};
						G(r, (e) => {
							B(t).type === "place" ? e(i) : B(t).type === "number" ? e(a, 1) : B(t).type === "toggle" ? e(o, 2) : B(t).type === "select" ? e(s, 3) : e(c, -1);
						}), U(e, n);
					}), U(e, n);
				}, a = (e) => {
					var t = qc(), n = I(t, !0);
					A(t), z((e, r) => {
						Y(t, "title", e), W(n, r);
					}, [() => X("hint.pluginBlock"), () => X("ui.settings")]), V("click", t, () => D?.sendOpenConfig(B(j).blockId)), U(e, t);
				};
				G(r, (e) => {
					B(t).length ? e(i) : e(a, -1);
				}), U(e, n);
			};
			G(n, (e) => {
				B(j).type === "text" ? e(r) : B(j).type === "faq" ? e(i, 1) : B(j).type === "tidslinje" ? e(a, 2) : B(j).type === "sitat" ? e(o, 3) : B(j).type === "statistikk" ? e(s, 4) : B(j).type === "tabell" ? e(l, 5) : B(j).type === "deling" ? e(u, 6) : B(j).type === "nedteller" ? e(d, 7) : B(j).type === "audio" ? e(f, 8) : B(j).type === "button" ? e(p, 9) : B(j).type === "image" ? e(m, 10) : B(j).type === "video" ? e(g, 11) : B(j).type === "icon" ? e(_, 12) : B(j).type === "samling" ? e(v, 13) : B(j).type === "galleri" ? e(y, 14) : B(j).type === "shape" ? e(b, 15) : e(x, -1);
			}), U(e, t);
		}, m = (e) => {
			var t = kl(), n = L(t), r = (e) => {
				var t = ll(), n = L(t), r = I(n), a = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.align ?? "left"), t = /* @__PURE__ */ M(() => [
						["left", X("common.left")],
						["center", X("common.center")],
						["right", X("common.right")]
					]);
					Z(a, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("align", e)
					});
				}
				A(n);
				var o = R(n, 2), s = I(o);
				q(s);
				var c = R(s);
				A(o);
				var l = R(o, 2), u = (e) => {
					i(e);
				};
				G(l, (e) => {
					B(j).props.box && e(u);
				}), Fe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), vi(s, t), W(c, ` ${n ?? ""}`);
				}, [
					() => X("lbl.align"),
					() => !!B(j).props.box,
					() => X("lbl.textBoxToggle")
				]), V("change", s, (e) => N("box", e.target.checked)), U(e, t);
			}, a = (e) => {
				var t = ul(), n = L(t), r = I(n, !0);
				A(n);
				var a = R(n, 2);
				i(a), Fe(2), z((e) => W(r, e), [() => X("lbl.cardStyle")]), U(e, t);
			}, o = (e) => {
				var t = dl(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.variant ?? "venstre"), t = /* @__PURE__ */ M(() => [["venstre", X("opt.tl.venstre")], ["veksler", X("opt.tl.veksler")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("variant", e)
					});
				}
				A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.marker ?? "fylt"), t = /* @__PURE__ */ M(() => [["fylt", X("opt.tl.fylt")], ["ring", X("opt.tl.ring")]]);
					Z(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("marker", e)
					});
				}
				A(a);
				var c = R(a, 2), l = I(c), u = R(l);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.accent ?? "accent"), t = /* @__PURE__ */ M(rr);
					aa(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => N("accent", e === "accent" ? null : e)
					});
				}
				A(c), Fe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), W(l, `${n ?? ""} `);
				}, [
					() => X("lbl.variant"),
					() => X("lbl.tlMarker"),
					() => X("lbl.color")
				]), U(e, t);
			}, s = (e) => {
				var t = pl(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.variant ?? "stor"), t = /* @__PURE__ */ M(() => [["stor", X("opt.sitat.stor")], ["kort", X("opt.sitat.kort")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("variant", e)
					});
				}
				A(n);
				var a = R(n, 2), o = (e) => {
					var t = fl(), n = L(t), r = I(n), i = R(r);
					A(n);
					var a = R(n, 2), o = (e) => {
						var t = qc(), n = I(t, !0);
						A(t), z((e) => W(n, e), [() => X("ui.sitatPortrettFjern")]), V("click", t, () => N("image", "")), U(e, t);
					};
					G(a, (e) => {
						B(j).props.image && e(o);
					}), z((e) => W(r, `${e ?? ""} `), [() => X("ui.sitatPortrett")]), V("change", i, en), U(e, t);
				};
				G(a, (e) => {
					B(j).props.variant === "kort" && e(o);
				});
				var s = R(a, 2), c = I(s), l = R(c);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.accent ?? "accent"), t = /* @__PURE__ */ M(rr);
					aa(l, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => N("accent", e === "accent" ? null : e)
					});
				}
				A(s), Fe(2), z((e, t) => {
					W(r, `${e ?? ""} `), W(c, `${t ?? ""} `);
				}, [() => X("lbl.variant"), () => X("lbl.color")]), U(e, t);
			}, c = (e) => {
				var t = ml(), n = L(t), r = I(n);
				q(r);
				var i = R(r);
				A(n), Fe(2), z((e, t) => {
					Y(n, "title", e), vi(r, B(j).props.countUp !== !1), W(i, ` ${t ?? ""}`);
				}, [() => X("tip.stat.countUp"), () => X("lbl.statCountUp")]), V("change", r, (e) => N("countUp", e.target.checked)), U(e, t);
			}, l = (e) => {
				var t = hl(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.lines ?? "rows"), t = /* @__PURE__ */ M(() => [
						["rows", X("opt.tabell.rows")],
						["grid", X("opt.tabell.grid")],
						["none", X("common.none")]
					]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("lines", e)
					});
				}
				A(n);
				var a = R(n, 2), o = I(a);
				q(o);
				var s = R(o);
				A(a), Fe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), vi(o, t), W(s, ` ${n ?? ""}`);
				}, [
					() => X("lbl.tabellLines"),
					() => !!B(j).props.striped,
					() => X("lbl.tabellStriped")
				]), V("change", o, (e) => N("striped", e.target.checked)), U(e, t);
			}, u = (e) => {
				var t = gl(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.variant ?? "icons"), t = /* @__PURE__ */ M(() => [["icons", X("opt.deling.icons")], ["labels", X("opt.deling.labels")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("variant", e)
					});
				}
				A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				q(s), A(a);
				var c = R(a, 2), l = I(c), u = R(l);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.color || "accent"), t = /* @__PURE__ */ M(rr);
					aa(u, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => N("color", e === "accent" ? "" : e)
					});
				}
				A(c), Fe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), J(s, B(j).props.size ?? 38), W(l, `${n ?? ""} `);
				}, [
					() => X("lbl.variant"),
					() => X("lbl.size"),
					() => X("lbl.color")
				]), V("change", s, (e) => N("size", Number(e.target.value) || 38)), U(e, t);
			}, d = (e) => {
				var t = hl(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.variant ?? "boxes"), t = /* @__PURE__ */ M(() => [["boxes", X("opt.nedteller.boxes")], ["plain", X("opt.nedteller.plain")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("variant", e)
					});
				}
				A(n);
				var a = R(n, 2), o = I(a);
				q(o);
				var s = R(o);
				A(a), Fe(2), z((e, t) => {
					W(r, `${e ?? ""} `), vi(o, B(j).props.showSeconds !== !1), W(s, ` ${t ?? ""}`);
				}, [() => X("lbl.variant"), () => X("lbl.nedtellerSeconds")]), V("change", o, (e) => N("showSeconds", e.target.checked)), U(e, t);
			}, f = (e) => {
				var t = _l(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => [["primary", X("opt.btn.primary")], ["secondary", X("opt.btn.secondary")]]);
					Z(i, {
						get value() {
							return B(j).props.style;
						},
						get options() {
							return B(e);
						},
						onchange: (e) => N("style", e)
					});
				}
				A(n), Fe(2), z((e) => W(r, `${e ?? ""} `), [() => X("lbl.style")]), U(e, t);
			}, p = (e) => {
				var t = vl(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.fit ?? "cover"), t = /* @__PURE__ */ M(() => [["cover", X("opt.fitFrame.cover")], ["contain", X("opt.fitFrame.contain")]]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("fit", e)
					});
				}
				A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.radius ?? ""), t = /* @__PURE__ */ M(() => [
						["", X("common.none")],
						["sm", X("opt.size.sm")],
						["md", X("opt.radius.md")]
					]);
					Z(s, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("radius", e || null)
					});
				}
				A(a);
				var c = R(a, 2), l = I(c), u = R(l), d = I(u);
				A(u), A(c);
				var f = R(c, 2);
				q(f);
				var p = R(f, 2), m = I(p), h = R(m), g = I(h);
				A(h), A(p);
				var _ = R(p, 2);
				q(_);
				var v = R(_, 2), y = I(v), b = R(y), x = I(b);
				A(b), A(v);
				var S = R(v, 2);
				q(S);
				var C = R(S, 2), w = I(C), T = R(w), ee = I(T);
				A(T), A(C);
				var te = R(C, 2);
				q(te);
				var ne = R(te, 2), re = I(ne), ie = R(re), ae = I(ie);
				A(ie), A(ne);
				var oe = R(ne, 2);
				q(oe);
				var se = R(oe, 2), ce = I(se), le = R(ce), ue = I(le);
				A(le), A(se);
				var de = R(se, 2);
				q(de);
				var fe = R(de, 2), pe = I(fe, !0);
				A(fe), Fe(2), z((e, t, n, i, a, s, c, u, p, h, b, C, T, ne, ie, se, le) => {
					W(r, `${e ?? ""} `), W(o, `${t ?? ""} `), W(l, `${n ?? ""} `), W(d, `${i ?? ""}%`), J(f, B(j).props.x ?? .5), W(m, `${a ?? ""} `), W(g, `${s ?? ""}%`), J(_, B(j).props.y ?? .5), Y(v, "title", c), W(y, `${u ?? ""} `), W(x, `${p ?? ""}x`), J(S, B(j).props.zoom ?? 1), W(w, `${h ?? ""} `), W(ee, `${b ?? ""}%`), J(te, B(j).props.brightness ?? 1), W(re, `${C ?? ""} `), W(ae, `${T ?? ""}%`), J(oe, B(j).props.contrast ?? 1), W(ce, `${ne ?? ""} `), W(ue, `${ie ?? ""}%`), J(de, B(j).props.saturate ?? 1), Y(fe, "title", se), W(pe, le);
				}, [
					() => X("lbl.fit"),
					() => X("lbl.radius"),
					() => X("lbl.focusX"),
					() => Math.round((B(j).props.x ?? .5) * 100),
					() => X("lbl.focusY"),
					() => Math.round((B(j).props.y ?? .5) * 100),
					() => X("tip.zoomCrop"),
					() => X("lbl.zoom"),
					() => (B(j).props.zoom ?? 1).toFixed(2),
					() => X("lbl.brightness"),
					() => Math.round((B(j).props.brightness ?? 1) * 100),
					() => X("lbl.contrast"),
					() => Math.round((B(j).props.contrast ?? 1) * 100),
					() => X("lbl.saturate"),
					() => Math.round((B(j).props.saturate ?? 1) * 100),
					() => X("tip.resetAdjust"),
					() => X("ui.resetAdjust")
				]), V("input", f, (e) => N("x", Number(e.target.value))), V("input", _, (e) => N("y", Number(e.target.value))), V("input", S, (e) => N("zoom", Number(e.target.value))), V("input", te, (e) => N("brightness", Number(e.target.value))), V("input", oe, (e) => N("contrast", Number(e.target.value))), V("input", de, (e) => N("saturate", Number(e.target.value))), V("click", fe, () => At(`edit:${B(j).blockId}`, (e) => {
					e.props.brightness = 1, e.props.contrast = 1, e.props.saturate = 1;
				})), U(e, t);
			}, m = (e) => {
				var t = yl(), n = L(t), r = I(n), i = R(r);
				q(i), A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.color ?? "accent"), t = /* @__PURE__ */ M(rr);
					aa(s, {
						get value() {
							return B(e);
						},
						get tokens() {
							return B(t);
						},
						onchange: (e) => N("color", e)
					});
				}
				A(a), Fe(2), z((e, t, n) => {
					W(r, `${e ?? ""} `), J(i, B(j).props.size ?? 48), Y(a, "title", t), W(o, `${n ?? ""} `);
				}, [
					() => X("lbl.sizePx"),
					() => X("hint.icon.color"),
					() => X("lbl.color")
				]), V("change", i, (e) => N("size", Number(e.target.value))), U(e, t);
			}, h = (e) => {
				var t = _l(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.view ?? "cards"), t = /* @__PURE__ */ M(() => [
						["cards", X("opt.collectionView.cards")],
						["list", X("opt.collectionView.list")],
						["archive", X("opt.collectionView.archive")]
					]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("view", e)
					});
				}
				A(n), Fe(2), z((e) => W(r, `${e ?? ""} `), [() => X("lbl.view")]), U(e, t);
			}, g = (e) => {
				var t = Sl(), n = L(t), r = I(n), i = R(r);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.view ?? "grid"), t = /* @__PURE__ */ M(() => [
						["grid", X("opt.galleryView.grid")],
						["carousel", X("opt.galleryView.carousel")],
						["slides", X("opt.galleryView.slides")]
					]);
					Z(i, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("view", e)
					});
				}
				A(n);
				var a = R(n, 2), o = (e) => {
					var t = bl(), n = L(t), r = I(n), i = R(r);
					q(i), A(n);
					var a = R(n, 2), o = I(a), s = R(o), c = I(s);
					A(s), A(a);
					var l = R(a, 2);
					q(l), z((e, t) => {
						W(r, `${e ?? ""} `), J(i, B(j).props.columns ?? 3), W(o, `${t ?? ""} `), W(c, `${B(j).props.gap ?? 12 ?? ""} px`), J(l, B(j).props.gap ?? 12);
					}, [() => X("lbl.columns"), () => X("lbl.imageGap")]), V("change", i, (e) => N("columns", Number(e.target.value))), V("input", l, (e) => N("gap", Number(e.target.value))), U(e, t);
				};
				G(a, (e) => {
					(B(j).props.view ?? "grid") === "grid" && e(o);
				});
				var s = R(a, 2), c = (e) => {
					var t = xl(), n = I(t), r = R(n);
					q(r), A(t), z((e) => {
						W(n, `${e ?? ""} `), J(r, B(j).props.interval ?? 5);
					}, [() => X("lbl.secondsPerImage")]), V("change", r, (e) => N("interval", Number(e.target.value))), U(e, t);
				};
				G(s, (e) => {
					B(j).props.view === "slides" && e(c);
				});
				var l = R(s, 2), u = I(l), d = R(u);
				{
					let e = /* @__PURE__ */ M(() => B(j).props.radius ?? ""), t = /* @__PURE__ */ M(() => [
						["", X("common.none")],
						["sm", X("opt.size.sm")],
						["md", X("opt.radius.md")]
					]);
					Z(d, {
						get value() {
							return B(e);
						},
						get options() {
							return B(t);
						},
						onchange: (e) => N("radius", e || null)
					});
				}
				A(l);
				var f = R(l, 2), p = I(f);
				q(p);
				var m = R(p);
				A(f), Fe(2), z((e, t, n, i) => {
					W(r, `${e ?? ""} `), W(u, `${t ?? ""} `), Y(f, "title", n), vi(p, B(j).props.lightbox !== !1), W(m, ` ${i ?? ""}`);
				}, [
					() => X("lbl.view"),
					() => X("lbl.radius"),
					() => X("tip.lightbox"),
					() => X("lbl.lightbox")
				]), V("change", p, (e) => N("lightbox", e.target.checked)), U(e, t);
			}, _ = (e) => {
				var t = Cl(), n = L(t), r = I(n);
				Z(R(r), {
					get value() {
						return B(j).props.color;
					},
					get options() {
						return on;
					},
					onchange: (e) => N("color", e)
				}), A(n);
				var i = R(n, 2), a = I(i), o = R(a);
				q(o), A(i);
				var s = R(i, 2), c = I(s);
				q(c);
				var l = R(c);
				A(s), Fe(2), z((e, t, n, i, u) => {
					W(r, `${e ?? ""} `), W(a, `${t ?? ""} `), J(o, B(j).props.thickness), Y(s, "title", n), vi(c, i), W(l, ` ${u ?? ""}`);
				}, [
					() => X("lbl.color"),
					() => X("lbl.thickness"),
					() => X("tip.shape.fill"),
					() => !!B(j).props.fill,
					() => X("lbl.filled")
				]), V("change", o, (e) => N("thickness", Number(e.target.value))), V("change", c, (e) => N("fill", e.target.checked ? B(j).props.color : null)), U(e, t);
			};
			G(n, (e) => {
				B(j).type === "text" ? e(r) : B(j).type === "faq" ? e(a, 1) : B(j).type === "tidslinje" ? e(o, 2) : B(j).type === "sitat" ? e(s, 3) : B(j).type === "statistikk" ? e(c, 4) : B(j).type === "tabell" ? e(l, 5) : B(j).type === "deling" ? e(u, 6) : B(j).type === "nedteller" ? e(d, 7) : B(j).type === "button" ? e(f, 8) : B(j).type === "image" ? e(p, 9) : B(j).type === "icon" ? e(m, 10) : B(j).type === "samling" ? e(h, 11) : B(j).type === "galleri" ? e(g, 12) : B(j).type === "shape" && e(_, 13);
			});
			var v = R(n, 2), y = I(v), b = R(y);
			{
				let e = /* @__PURE__ */ M(() => dr(B(j).animation) ? B(j).animation.type : "");
				Z(b, {
					get value() {
						return B(e);
					},
					get options() {
						return pr;
					},
					onchange: (e) => gr(e || null)
				});
			}
			A(v);
			var x = R(v, 2), S = (e) => {
				var t = wl(), n = L(t), r = I(n), i = R(r);
				q(i), A(n);
				var a = R(n, 2), o = I(a), s = R(o);
				q(s), A(a), z((e, t) => {
					W(r, `${e ?? ""} `), J(i, B(j).animation.props.duration), W(o, `${t ?? ""} `), J(s, B(j).animation.props.delay);
				}, [() => X("lbl.durationMs"), () => X("lbl.delayMs")]), V("change", i, (e) => vr("duration", Number(e.target.value))), V("change", s, (e) => vr("delay", Number(e.target.value))), U(e, t);
			}, C = /* @__PURE__ */ M(() => dr(B(j).animation));
			G(x, (e) => {
				B(C) && e(S);
			});
			var w = R(x, 2), T = I(w), ee = R(T);
			{
				let e = /* @__PURE__ */ M(() => B(j).hover?.type ?? (B(j).animation && !dr(B(j).animation) ? B(j).animation.type : ""));
				Z(ee, {
					get value() {
						return B(e);
					},
					get options() {
						return mr;
					},
					onchange: (e) => _r(e || null)
				});
			}
			A(w);
			var te = R(w, 2), ne = (e) => {
				var t = Dl(), n = R(L(t), 2), r = I(n);
				q(r);
				var i = R(r);
				A(n);
				var a = R(n, 2), o = (e) => {
					var t = El(), n = L(t), r = I(n), i = R(r);
					{
						let e = /* @__PURE__ */ M(() => B(j).sticky.mode ?? "scroll"), t = /* @__PURE__ */ M(() => [["scroll", X("opt.sticky.modeScroll")], ["screen", X("opt.sticky.modeScreen")]]);
						Z(i, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => At(`edit:${B(j).blockId}`, (t) => {
								t.sticky = {
									...t.sticky,
									mode: e
								};
							})
						});
					}
					A(n);
					var a = R(n, 2), o = (e) => {
						var t = Tl(), n = I(t), r = R(n);
						q(r), A(t), z((e, i) => {
							Y(t, "title", e), W(n, `${i ?? ""} `), J(r, B(j).sticky.offset ?? 16);
						}, [() => B(j).sticky.mode === "screen" ? X("tip.stickyEdge") : X("tip.stickyOffset"), () => B(j).sticky.mode === "screen" ? X("lbl.stickyEdge") : X("lbl.stickyOffset")]), V("change", r, (e) => At(`edit:${B(j).blockId}`, (t) => {
							t.sticky = {
								...t.sticky,
								offset: Math.max(0, Number(e.target.value) || 0)
							};
						})), U(e, t);
					};
					G(a, (e) => {
						(B(j).sticky.mode !== "screen" || (B(j).sticky.dock ?? "bottom-right") !== "middle-center") && e(o);
					});
					var s = R(a, 2), c = (e) => {
						var t = Pc(), n = I(t), r = R(n);
						{
							let e = /* @__PURE__ */ M(() => B(j).sticky.dock ?? "bottom-right"), t = /* @__PURE__ */ M(() => Dt.map(([e, t]) => [e, X(t)]));
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => At(`edit:${B(j).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										dock: e
									};
								})
							});
						}
						A(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.stickyDock"), () => X("lbl.stickyDock")]), U(e, t);
					}, l = (e) => {
						var t = Pc(), n = I(t), r = R(n);
						{
							let e = /* @__PURE__ */ M(() => B(j).sticky.until ?? ""), t = /* @__PURE__ */ M(Ot);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => At(`edit:${B(j).blockId}`, (t) => {
									t.sticky = {
										...t.sticky,
										until: e || null
									};
								})
							});
						}
						A(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.stickyUntil"), () => X("lbl.stickyUntil")]), U(e, t);
					};
					G(s, (e) => {
						B(j).sticky.mode === "screen" ? e(c) : e(l, -1);
					}), z((e, t) => {
						Y(n, "title", e), W(r, `${t ?? ""} `);
					}, [() => X("tip.stickyMode"), () => X("lbl.stickyMode")]), U(e, t);
				};
				G(a, (e) => {
					B(j).sticky && e(o);
				}), z((e, t, a) => {
					Y(n, "title", e), vi(r, t), W(i, ` ${a ?? ""}`);
				}, [
					() => X("tip.sticky"),
					() => !!B(j).sticky,
					() => X("lbl.sticky")
				]), V("change", r, (e) => At(`edit:${B(j).blockId}`, (t) => {
					t.sticky = e.target.checked ? {
						offset: 16,
						until: null
					} : null;
				})), U(e, t);
			};
			G(te, (e) => {
				B(ae) === "desktop" && e(ne);
			});
			var re = R(te, 4), ie = I(re), oe = I(ie, !0);
			A(ie);
			var se = R(ie, 2), ce = I(se), le = (e) => {
				var t = Ol(), n = I(t), r = I(n, !0), i = R(r);
				q(i), A(n);
				var a = R(n, 2), o = I(a, !0), s = R(o);
				q(s), A(a);
				var c = R(a, 2), l = I(c, !0), u = R(l);
				q(u), A(c);
				var d = R(c, 2), f = I(d, !0), p = R(f);
				q(p), A(d);
				var m = R(d, 2), h = I(m, !0), g = R(h);
				q(g), A(m);
				var _ = R(m, 2), v = I(_, !0), y = R(v);
				q(y), A(_), A(t), z((e, t, n, a, c, d, _) => {
					W(r, e), J(i, B(j).frame.x), W(o, t), J(s, B(j).frame.y), W(l, n), J(u, B(j).frame.w), W(f, a), J(p, B(j).frame.h), Y(m, "title", c), W(h, d), J(g, B(j).frame.z ?? 1), W(v, _), J(y, B(j).frame.rot ?? 0);
				}, [
					() => X("frame.x"),
					() => X("frame.y"),
					() => X("frame.w"),
					() => X("frame.h"),
					() => X("tip.frameZ"),
					() => X("frame.z"),
					() => X("frame.rot")
				]), V("change", i, (e) => Rt("x", Number(e.target.value))), V("change", s, (e) => Rt("y", Number(e.target.value))), V("change", u, (e) => Rt("w", Number(e.target.value))), V("change", p, (e) => Rt("h", Number(e.target.value))), V("change", g, (e) => Rt("z", Number(e.target.value))), V("change", y, (e) => Rt("rot", Number(e.target.value))), U(e, t);
			};
			G(ce, (e) => {
				B(ae) === "desktop" && e(le);
			});
			var ue = R(ce, 2), de = I(ue);
			q(de);
			var fe = R(de);
			A(ue);
			var pe = R(ue, 2), me = I(pe);
			q(me);
			var he = R(me);
			A(pe), A(se), A(re), z((e, t, n, r, i, a, o, s, c, l) => {
				Y(v, "title", e), W(y, `${t ?? ""} `), Y(w, "title", n), W(T, `${r ?? ""} `), Y(ie, "title", i), W(oe, a), Y(ue, "title", o), vi(de, B(j).hideMobile), W(fe, ` ${s ?? ""}`), Y(pe, "title", c), vi(me, B(j).decor), W(he, ` ${l ?? ""}`);
			}, [
				() => X("tip.props.blockAnim"),
				() => X("lbl.animIn"),
				() => X("tip.props.blockHover"),
				() => X("lbl.onHover"),
				() => X("hint.placement"),
				() => X("group.placement"),
				() => X("tip.hideMobile"),
				() => X("lbl.hideMobile"),
				() => X("tip.decor"),
				() => X("lbl.decor")
			]), V("change", de, (e) => Qt(e.target.checked)), V("change", me, (e) => Jt(e.target.checked)), U(e, t);
		};
		G(f, (e) => {
			B(Ft) === "content" ? e(p) : e(m, -1);
		}), z((e, t) => {
			o = di(a, 1, "svelte-1n46o8q", null, o, { on: B(Ft) === "content" }), W(s, e), u = di(l, 1, "svelte-1n46o8q", null, u, { on: B(Ft) === "style" }), W(d, t);
		}, [() => X("props.tabContent"), () => X("props.tabStyle")]), V("click", a, () => F(Ft, "content")), V("click", l, () => F(Ft, "style")), U(e, t);
	}, o = [
		["color", xs],
		["gradient", Ns],
		["glow", Ps],
		["image", oc],
		["bildegalleri", uc],
		["grain", Is]
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
		["lilla", X("adminTheme.lilla")],
		["bronn", X("adminTheme.bronn")],
		["gull", X("adminTheme.gull")],
		["graa", X("adminTheme.graa")],
		["nordlys", X("adminTheme.nordlys")],
		["skumring", X("adminTheme.skumring")],
		["glo", X("adminTheme.glo")]
	], u = /* @__PURE__ */ P(rn(localStorage.getItem("urd-admin-theme") ?? "graa"));
	Sn(() => {
		document.documentElement.dataset.adminTheme = B(u), localStorage.setItem("urd-admin-theme", B(u)), d();
	});
	function d() {
		let e = getComputedStyle(document.documentElement), t = e.getPropertyValue("--urd-color-accent").trim();
		D?.sendAdminTheme({
			bg: e.getPropertyValue("--urd-color-bg").trim(),
			surface: e.getPropertyValue("--urd-color-surface").trim(),
			accent: t,
			text: e.getPropertyValue("--urd-color-text").trim(),
			"accent-text": p(t)
		});
	}
	function p(e) {
		return ys(e) == null || (bs(e, "#ffffff") ?? 0) >= (bs(e, "#0b0e14") ?? 0) ? "#ffffff" : "#0b0e14";
	}
	let m = /* @__PURE__ */ P(null), g = /* @__PURE__ */ P(null), _ = /* @__PURE__ */ P(!1), v = /* @__PURE__ */ P(""), y = /* @__PURE__ */ P("info"), b = 0;
	function x(e, t = "info") {
		F(v, e, !0), F(y, t, !0);
		let n = ++b;
		t === "ok" && setTimeout(() => {
			b === n && (F(v, ""), F(y, "info"));
		}, 8e3);
	}
	function S() {
		x(X("status.storageFull"), "error");
	}
	function C(e, t) {
		try {
			localStorage.setItem(e, t);
		} catch {
			S();
		}
	}
	let w = /* @__PURE__ */ P(null), T = /* @__PURE__ */ P(null), ee = /* @__PURE__ */ P(rn({
		size: 16,
		snap: !0
	})), te = /* @__PURE__ */ P(!0), ne = [
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
	], re = /* @__PURE__ */ P("desktop"), ie = /* @__PURE__ */ M(() => ne.find((e) => e.id === B(re)) ?? ne[0]), ae = /* @__PURE__ */ M(() => B(ie).viewport), oe = /* @__PURE__ */ P(null), se = /* @__PURE__ */ P(0), ce = /* @__PURE__ */ P(0), le = /* @__PURE__ */ P(rn(typeof window < "u" ? window.innerWidth : 1280)), ue = /* @__PURE__ */ P("fit"), de = /* @__PURE__ */ P(1), fe = /* @__PURE__ */ M(() => B(Xi) === "full" ? B(le) : 1920), pe = /* @__PURE__ */ M(() => qa(B(Xi), B(Zi))), me = /* @__PURE__ */ M(() => B(ie).width ?? B(fe)), he = /* @__PURE__ */ M(() => B(ue) === "manual" ? B(de) : Ba(B(se), B(me), "fit"));
	function ge(e) {
		let t = Math.min(400, Math.max(10, (Math.round(Math.round(B(he) * 100) / 10) + e) * 10));
		F(de, t / 100), F(ue, "manual");
	}
	let _e = /* @__PURE__ */ M(() => B(he) > 0 ? B(ce) / B(he) : B(ce)), ve = /* @__PURE__ */ M(() => B(me) * B(he)), ye = /* @__PURE__ */ M(() => B(ce)), be = /* @__PURE__ */ M(() => B(ve) > B(se) + 1 || B(ye) > B(ce) + 1);
	Sn(() => {
		let e = () => D?.sendCloseMenus();
		return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0);
	}), Sn(() => {
		let e = B(ae);
		D?.sendViewport(e);
	}), Sn(() => {
		let e = B(he);
		D?.sendZoom(e);
	}), Sn(() => {
		let e = () => {
			F(le, window.innerWidth, !0);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}), Sn(() => {
		let e = B(oe);
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => {
			F(se, e.clientWidth, !0), F(ce, e.clientHeight, !0);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	});
	let xe = /* @__PURE__ */ P(0);
	function Se() {
		F(xe, E?.data.sections.filter((e) => e.responsive?.mobile?.attention?.needed).length ?? 0, !0);
	}
	function Ce() {
		let e = E?.data.sections.find((e) => e.responsive?.mobile?.attention?.needed);
		F(re, "mobile"), e && setTimeout(() => D?.sendScrollSection(e.id), 0);
	}
	function we(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Le("layout");
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
			}, Ee(t, "layout-changed"), e.sectionId === B(sn) && F(ln, e.minHeight, !0), B(j)?.sectionId === e.sectionId && Ct(), E.save(), k(), D?.sendSection(B(g), t);
		}
	}
	function Te(e) {
		return e?.blocks?.some((e) => e.frames?.mobile) ?? !1;
	}
	function Ee(e, t) {
		!e || !Te(e) || e.responsive?.mobile?.attention?.needed || (e.responsive = {
			...e.responsive ?? {},
			mobile: {
				...e.responsive?.mobile ?? { mode: "auto" },
				attention: {
					needed: !0,
					reason: t,
					since: (/* @__PURE__ */ new Date()).toISOString()
				}
			}
		}, Se(), D?.sendAttention(e.id, !0));
	}
	let E = null, De = null, D = null, O = /* @__PURE__ */ P(null);
	function Oe() {
		F(O, De.data, !0), De.replace(B(O));
	}
	function ke() {
		D?.sendSite(He(B(O)));
	}
	let Ae = /* @__PURE__ */ new Set(), je = () => B(O).pages.find((e) => e.id === B(g));
	function k() {
		let e = B(O)?.pages?.some((e) => !Ae.has(e.id) && localStorage.getItem(`urd-draft-${e.id}`) !== null) ?? !1, t = ja?.hasDraft() || Object.values(Ma).some((e) => e.hasDraft()), n = $a?.hasDraft() || Object.values(to).some((e) => e.hasDraft());
		F(_, e || E?.hasDraft() && !Ae.has(B(g)) || De?.hasDraft() || ko?.hasDraft() || t || n || !1, !0);
	}
	let Me = [], Ne = [], Pe = null;
	function Ie() {
		return JSON.stringify({
			pageId: B(g),
			page: E.data,
			site: De.data,
			samlingerIndex: Pa ? ja.data : null,
			samlinger: Pa ? Object.fromEntries(Object.entries(Ma).map(([e, t]) => [e, t.data])) : {},
			malerIndex: ro ? $a.data : null,
			maler: ro ? Object.fromEntries(Object.entries(to).map(([e, t]) => [e, t.data])) : {},
			plugins: ko?.data ?? null
		});
	}
	function Le(e) {
		e === Pe && (e.startsWith("edit:") || e.startsWith("grid:")) || (Me.push(Ie()), Me.length > 50 && Me.shift(), Ne.length = 0, Pe = e);
	}
	function Re(e) {
		let { pageId: t, page: n, site: r, samlingerIndex: i, samlinger: a, malerIndex: o, maler: s, plugins: c } = JSON.parse(e);
		if (De.replace(r), Oe(), De.save(), F(ee, {
			snap: !0,
			...B(O).grid
		}, !0), ke(), ze(i, a ?? {}), Be(o, s ?? {}), Ve(c), t && t !== B(g) && B(O).pages.some((e) => e.id === t)) {
			C(`urd-draft-${t}`, JSON.stringify(n)), ei(t, { keepHistory: !0 }), k();
			return;
		}
		E.replace(n), E.save(), k(), Se(), Ct(), mn(E.data.sections.find((e) => e.id === B(sn))), B(O).pages.some((e) => e.id === B(g)) ? D?.sendPage(B(g), E.data) : ei(B(O).pages[0].id, { keepHistory: !0 });
	}
	function ze(e, t) {
		if (!(!ja || !e) && JSON.stringify({
			index: ja.data,
			samlinger: Object.fromEntries(Object.entries(Ma).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			samlinger: t
		})) {
			ja.replace(e), ja.save();
			for (let e of Object.keys(Ma)) e in t || (localStorage.removeItem(`urd-draft-samling-${e}`), delete Ma[e]);
			for (let [e, n] of Object.entries(t)) {
				if (!Ma[e]) {
					let t = Na[e] ?? null;
					Ma[e] = qi(`urd-draft-samling-${e}`, () => t, S);
				}
				Ma[e].replace(n), Ma[e].save();
			}
			F(Fa, [...e.samlinger ?? []], !0), B(za) && !B(Fa).includes(B(za)) && F(za, null), vo();
		}
	}
	function Be(e, t) {
		if (!(!$a || !e) && JSON.stringify({
			index: $a.data,
			maler: Object.fromEntries(Object.entries(to).map(([e, t]) => [e, t.data]))
		}) !== JSON.stringify({
			index: e,
			maler: t
		})) {
			$a.replace(e), $a.save();
			for (let e of Object.keys(to)) e in t || (localStorage.removeItem(`urd-draft-mal-${e}`), delete to[e]);
			for (let [e, n] of Object.entries(t)) to[e] || (to[e] = qi(`urd-draft-mal-${e}`, () => no[e] ?? null, S)), to[e].replace(n), to[e].save();
			F(io, [...e.maler ?? []], !0), k(), co();
		}
	}
	function Ve(e) {
		!ko || !e || JSON.stringify(ko.data) !== JSON.stringify(e) && (ko.replace(e), ko.save(), Wo(), Qo());
	}
	function Ue() {
		Me.length && (Ne.push(Ie()), Re(Me.pop()), Pe = null, x(X("status.undone")));
	}
	function We() {
		Ne.length && (Me.push(Ie()), Re(Ne.pop()), Pe = null, x(X("status.redone")));
	}
	function Ge(e) {
		B(Tt) && (e.target instanceof Element && e.target.closest(".block-menu") || F(Tt, null));
	}
	function Je(e) {
		if (e.key === "Escape" && B(Tt)) {
			F(Tt, null);
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
			].includes(t.type)) || !B(j) || B(ae) === "mobile") return;
			e.preventDefault(), D?.sendDuplicate();
			return;
		}
		if (t !== "z" && t !== "y") return;
		let n = e.target;
		n instanceof HTMLElement && (n.isContentEditable || n.tagName === "TEXTAREA" || n.tagName === "INPUT" && ![
			"number",
			"checkbox",
			"range",
			"color"
		].includes(n.type)) || (e.preventDefault(), t === "y" || e.shiftKey ? We() : Ue());
	}
	async function Ye() {
		F(m, oo(await (await fetch("/content/site.json")).json()), !0), De = qi("urd-draft-site", () => B(m), S), (De.data.schemaVersion ?? 1) > 3 && (console.warn(`Urd: site-utkastet har schemaVersion ${De.data.schemaVersion} (motoren har 3) og forkastes`), De.replace(He(B(m)))), De.replace(oo(De.data)), De.save(), Oe(), F(ee, {
			snap: !0,
			...B(O).grid
		}, !0), await ei(new URLSearchParams(location.search).get("page") ?? B(O).pages[0].id), await $(), await _o(), await ao(), await Ar(), B(T) && H(), B(O).site.setup === !0 && !localStorage.getItem("urd-setup-done") && (F(nt, B(O).site.title, !0), F(rt, B(O).theme.tokens.color.accent, !0), F(it, B(O).theme.tokens.color.bg, !0), F(tt, !0));
	}
	let Xe = /* @__PURE__ */ P(null);
	function Ze({ title: e, lines: t = [], okLabel: n = X("confirm.ok"), cancelLabel: r = X("confirm.cancel") }) {
		return new Promise((i) => {
			F(Xe, {
				title: e,
				lines: t,
				okLabel: n,
				cancelLabel: r,
				resolve: i
			}, !0);
		});
	}
	function Qe({ title: e, lines: t = [], value: n = "", placeholder: r = "", okLabel: i = X("confirm.ok"), cancelLabel: a = X("confirm.cancel") }) {
		return new Promise((o) => {
			F(Xe, {
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
	function $e(e) {
		B(Xe)?.resolve(B(Xe).prompt ? e ? B(Xe).value : null : e), F(Xe, null);
	}
	let et = !1;
	Sn(() => {
		if (!B(Xe)) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), $e(!1));
		};
		return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
	});
	let tt = /* @__PURE__ */ P(!1), nt = /* @__PURE__ */ P(""), rt = /* @__PURE__ */ P("#7c5cff"), it = /* @__PURE__ */ P("#0b0e14");
	function at() {
		localStorage.setItem("urd-setup-done", "1"), F(tt, !1);
	}
	function ot() {
		let e = B(nt).trim();
		e && (bi("setup", () => {
			B(O).site.title = e, B(O).nav.logo = {
				type: "text",
				value: e
			}, B(O).theme.tokens.color.accent = B(rt), B(O).theme.tokens.color.bg = B(it), delete B(O).site.setup;
		}), at(), x(X("status.setupDone"), "ok"));
	}
	let st = /* @__PURE__ */ P(null), ut = [
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
	], dt = [
		"rail.thisPage",
		"rail.site",
		"rail.system"
	], ft = Object.fromEntries(ut.flat().map((e) => [e, X(`panel.${e}`)])), pt = {
		pages: ["hint.pages.drafts"],
		blocks: ["hint.blocks.intro"],
		grid: ["hint.grid.intro", "hint.grid.section"],
		collections: ["hint.collections.intro"],
		plugins: ["hint.plugins.intro"],
		history: ["hint.history.intro"]
	}, mt = [
		["se", "Davvisámegiella"],
		["en-GB", "English (UK)"],
		["nb", "Norsk bokmål"],
		["nn", "Norsk nynorsk"],
		["tr", "Türkçe"]
	], ht = (e) => [...e].sort((e, t) => e[1].localeCompare(t[1]));
	function gt(e, t) {
		let n = [];
		for (let r of e) for (let e of No[r]?.languages ?? []) e?.[t] === !0 && (typeof e.code != "string" || typeof e.name != "string" || !e.name || mt.some(([t]) => t === e.code) || n.some(([t]) => t === e.code) || n.push([e.code, e.name]));
		return n;
	}
	function _t() {
		let e = ht([...mt, ...gt(B(Vo), "admin")]);
		return yt === "auto" || e.some(([e]) => e === yt) ? e : [[yt, yt], ...e];
	}
	let vt = () => gt(B(Mo)?.enabled ?? [], "site"), yt = localStorage.getItem("urd-admin-lang") ?? "auto";
	function bt(e) {
		e !== yt && (e === "auto" ? localStorage.removeItem("urd-admin-lang") : localStorage.setItem("urd-admin-lang", e), location.reload());
	}
	function xt(e) {
		F(st, B(st) === e ? null : e, !0), B(st) === "history" && Lr(), B(st) === "update" && !B(Kr) && Jr();
	}
	let j = /* @__PURE__ */ P(null);
	function St(e, t) {
		let n = E?.data.sections.find((t) => t.id === e);
		return {
			section: n,
			block: n?.blocks.find((e) => e.id === t)
		};
	}
	function Ct() {
		if (!B(j)) return;
		let { block: e } = St(B(j).sectionId, B(j).blockId);
		if (!e) {
			F(j, null);
			return;
		}
		F(j, {
			sectionId: B(j).sectionId,
			blockId: B(j).blockId,
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
	function wt(e) {
		if (F(Tt, null), !e.blockId) {
			F(j, null);
			return;
		}
		F(j, {
			sectionId: e.sectionId,
			blockId: e.blockId
		}, !0), e.sectionId && F(sn, e.sectionId, !0), Ct();
	}
	let Tt = /* @__PURE__ */ P(null), Et = window.matchMedia("(prefers-reduced-motion: reduce)").matches, Dt = [
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
	function Ot() {
		let e = E?.data.sections ?? [], t = e.findIndex((e) => e.id === B(j)?.sectionId);
		return [["", X("opt.sticky.ownSection")], ...e.slice(t + 1).map((e, n) => [e.id, X("opt.sticky.atSection", { n: t + 2 + n })])];
	}
	function kt(e) {
		if (wt(e), !B(j)) return;
		let t = B(w)?.getBoundingClientRect();
		if (!t) return;
		let n = t.left + B(he) * e.rect.right + 12;
		n + 300 > window.innerWidth - 8 && (n = Math.max(8, t.left + B(he) * e.rect.left - 300 - 12));
		let r = window.innerHeight - Math.min(window.innerHeight * .7, 560) - 8, i = Math.min(Math.max(8, t.top + B(he) * e.rect.top), Math.max(8, r));
		F(Tt, {
			left: n,
			top: i
		}, !0);
	}
	function At(e, t) {
		let { section: n, block: r } = St(B(j)?.sectionId, B(j)?.blockId);
		r && (Le(e), t(r, n), Ee(n, "block-edited"), E.save(), k(), D?.sendSection(B(g), n), Ct());
	}
	function N(e, t) {
		At(`edit:${B(j).blockId}:${e}`, (n) => {
			n.props[e] = t;
		});
	}
	function jt(e, t) {
		At(`edit:${B(j).blockId}:${e}`, (e) => {
			Object.assign(e.props, t);
		});
	}
	let Mt = rn({}), Nt = rn({}), Pt = /* @__PURE__ */ P(!1), Ft = /* @__PURE__ */ P("content"), It = (e, t) => (Number.isFinite(t) || (t = e.min ?? 0), e.min != null && (t = Math.max(e.min, t)), e.max != null && (t = Math.min(e.max, t)), t);
	async function Lt(e) {
		let t = B(j).blockId, n = `${t}:${e.key}`, r = (Mt[n] ?? B(j).props[e.key] ?? "").trim();
		Nt[n] = null;
		let i = r.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
		if (!r || i || /^https?:\/\//i.test(r)) {
			jt(e.key, {
				[e.key]: r,
				lat: i ? Number(i[1]) : null,
				lon: i ? Number(i[2]) : null
			});
			return;
		}
		F(Pt, !0), Nt[n] = {
			text: X("props.place.searching"),
			err: !1
		};
		try {
			let i = await fetch(`/api/geocode?q=${encodeURIComponent(r)}`), a = await i.json().catch(() => null);
			if (B(j)?.blockId !== t) return;
			i.ok && Number.isFinite(a?.lat) ? (jt(e.key, {
				[e.key]: r,
				lat: a.lat,
				lon: a.lon
			}), Nt[n] = null) : Nt[n] = {
				text: zi(a) ?? X("props.place.notFound"),
				err: !0
			};
		} catch {
			Nt[n] = {
				text: X("props.place.failed"),
				err: !0
			};
		} finally {
			F(Pt, !1);
		}
	}
	function Rt(e, t) {
		Number.isFinite(t) && At(`edit:frame-${B(j).blockId}:${e}`, (n) => {
			n.frames.desktop = {
				...n.frames.desktop,
				[e]: t
			};
		});
	}
	function zt(e) {
		At(`edit:${B(j).blockId}:boxStyle`, (t) => {
			let n = {
				...t.props.boxStyle ?? {},
				...e
			};
			for (let e of Object.keys(n)) n[e] ?? delete n[e];
			Object.keys(n).length ? t.props.boxStyle = n : delete t.props.boxStyle;
		});
	}
	function Bt(e, t) {
		At(`edit:${B(j).blockId}:faq${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Vt() {
		At("faq-item", (e) => {
			(e.props.items ??= []).push({
				q: X("seed.faq.newQ"),
				a: X("seed.faq.answer")
			});
		});
	}
	function Ht(e) {
		At("faq-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function Ut(e, t) {
		let n = e + t;
		At("faq-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Wt(e, t) {
		At(`edit:${B(j).blockId}:tl${e}`, (n) => {
			n.props.items[e] = {
				...n.props.items[e],
				...t
			};
		});
	}
	function Gt() {
		At("tl-item", (e) => {
			(e.props.items ??= []).push({
				year: "",
				title: X("seed.tidslinje.newTitle"),
				text: ""
			});
		});
	}
	function Kt(e) {
		At("tl-item", (t) => {
			t.props.items.splice(e, 1);
		});
	}
	function qt(e, t) {
		let n = e + t;
		At("tl-item", (t) => {
			n < 0 || n >= t.props.items.length || ([t.props.items[e], t.props.items[n]] = [t.props.items[n], t.props.items[e]]);
		});
	}
	function Jt(e) {
		At("decor", (t) => {
			t.decor = e;
		});
	}
	function Yt(e, t) {
		At(`edit:${B(j).blockId}:tabell-form`, (n) => {
			let r = (Array.isArray(n.props.rows) && n.props.rows.length ? n.props.rows : [[""]]).map((e) => Array.isArray(e) ? e.map((e) => String(e ?? "")) : [""]), i = Math.max(1, ...r.map((e) => e.length));
			r = r.map((e) => [...e, ...Array(i - e.length).fill("")]), e > 0 ? r.push(Array(i).fill("")) : e < 0 && r.length > 1 && r.pop(), t > 0 ? r = r.map((e) => [...e, ""]) : t < 0 && i > 1 && (r = r.map((e) => e.slice(0, i - 1))), n.props.rows = r;
		});
	}
	function Xt(e, t) {
		At(`edit:${B(j).blockId}:deling`, (n) => {
			let r = [
				"facebook",
				"x",
				"linkedin",
				"whatsapp",
				"email",
				"copy"
			], i = new Set(n.props.services ?? []);
			t ? i.add(e) : i.delete(e), n.props.services = r.filter((e) => i.has(e));
		});
	}
	function Zt(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		let n = new FileReader();
		n.onload = () => {
			N("src", String(n.result ?? "")), t.size > 4e5 && x(X("status.audioLarge", { kb: Math.round(t.size / 1024) }), "error");
		}, n.onerror = () => x(X("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Qt(e) {
		let { section: t, block: n } = St(B(j)?.sectionId, B(j)?.blockId);
		n && (Le("hide-mobile"), n.hideMobile = e, E.save(), k(), D?.sendSection(B(g), t), Ct());
	}
	async function $t(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qn(t);
			At(`edit:${B(j).blockId}`, (n) => {
				n.props.src = e.dataUrl, n.props.alt = n.props.alt || ga(t.name).replaceAll("-", " ");
			});
		} catch {
			x(X("status.imageReadError"), "error");
		}
	}
	async function en(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qn(t);
			At(`edit:${B(j).blockId}`, (t) => {
				t.props.image = e.dataUrl;
			});
		} catch {
			x(X("status.imageReadError"), "error");
		}
	}
	let tn = {
		text: X("blocks.text"),
		button: X("blocks.button"),
		image: X("blocks.image"),
		shape: X("blocks.shape"),
		video: X("blocks.video"),
		icon: X("blocks.icon"),
		galleri: X("blocks.galleri"),
		faq: X("blocks.faq"),
		samling: X("blocks.samling"),
		tidslinje: X("blocks.tidslinje"),
		sitat: X("blocks.sitat"),
		statistikk: X("blocks.statistikk"),
		tabell: X("blocks.tabell"),
		deling: X("blocks.deling"),
		nedteller: X("blocks.nedteller"),
		audio: X("blocks.audio")
	}, nn = [
		["line", X("shape.line")],
		["arrow", X("shape.arrow")],
		["circle", X("shape.circle")],
		["rect", X("shape.rect")],
		["triangle", X("shape.triangle")]
	], on = [
		["accent", X("color.accent")],
		["text", X("color.text")],
		["surface", X("color.surface")],
		["bg", X("color.bg")]
	], sn = /* @__PURE__ */ P(null), cn = /* @__PURE__ */ P(null), ln = /* @__PURE__ */ P(""), un = /* @__PURE__ */ P(rn([])), dn = /* @__PURE__ */ P(null), fn = /* @__PURE__ */ P(null), pn = /* @__PURE__ */ P("");
	function mn(e) {
		F(cn, e?.grid ? { ...e.grid } : null, !0), F(ln, e?.size?.minHeight ?? "", !0), F(un, JSON.parse(JSON.stringify(e?.background?.layers ?? [])), !0), F(dn, e?.animation ? JSON.parse(JSON.stringify(e.animation)) : null, !0), F(fn, e?.hover ? JSON.parse(JSON.stringify(e.hover)) : null, !0), F(pn, e?.theme ?? "", !0);
	}
	let hn = /* @__PURE__ */ P(null), gn = rn({});
	function _n() {
		try {
			let e = ((B(w)?.contentDocument)?.querySelector(`.urd-section[data-section-id="${B(sn)}"]`))?.getBoundingClientRect();
			F(hn, e && e.width ? {
				w: e.width,
				h: e.height
			} : null, !0);
		} catch {
			F(hn, null);
		}
	}
	Sn(() => {
		B(sn), B(un), requestAnimationFrame(() => requestAnimationFrame(_n));
	}), Sn(() => {
		let e = B(w);
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(() => _n());
		return t.observe(e), () => t.disconnect();
	}), Sn(() => {
		for (let e of B(un)) {
			let t = e?.props?.src;
			if (e?.type === "image" && t && !gn[t]) {
				let e = new Image();
				e.onload = () => {
					gn[t] = {
						w: e.naturalWidth,
						h: e.naturalHeight
					};
				}, e.src = t;
			}
		}
	});
	function vn(e) {
		xn("section-theme", (t) => {
			e ? t.theme = e : delete t.theme;
		});
	}
	function yn(e) {
		let t = B(O).theme.scheme === "dark" ? {
			...B(O).theme.tokens.color,
			...B(O).theme.alt?.tokens?.color ?? {}
		} : B(O).theme.tokens.color, n = (e) => e.replaceAll("var(--urd-base-bg)", t.bg).replaceAll("var(--urd-base-surface)", t.surface).replaceAll("var(--urd-base-text)", t.text).replaceAll("var(--urd-base-accent)", t.accent).replaceAll("var(--urd-base-accent-text)", t["accent-text"]), r = vs(e);
		return {
			bg: r["--urd-color-bg"] ? n(r["--urd-color-bg"]) : t.bg,
			surface: r["--urd-color-surface"] ? n(r["--urd-color-surface"]) : t.surface,
			text: r["--urd-color-text"] ? n(r["--urd-color-text"]) : t.text,
			accent: r["--urd-color-accent"] ? n(r["--urd-color-accent"]) : t.accent
		};
	}
	function bn(e) {
		F(sn, e.sectionId, !0), mn(E?.data.sections.find((t) => t.id === e.sectionId));
	}
	function xn(e, t) {
		let n = E.data.sections.find((e) => e.id === B(sn));
		n && (Le(e), t(n), E.save(), k(), D?.sendSection(B(g), n), mn(n));
	}
	let Cn = /* @__PURE__ */ P("color");
	function wn(e, t) {
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
	function Tn(e, t) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers.splice(t, 1), e.background.layers.length || delete e.background;
		});
	}
	function En(e, t, n) {
		let r = t + n;
		e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers;
			r < 0 || r >= n.length || ([n[t], n[r]] = [n[r], n[t]]);
		});
	}
	function Dn(e, t, n, r) {
		e.mutate(`edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e.background.layers[t].props[n] = r;
		});
	}
	function On(e, t, n, r = "xy") {
		e.preventDefault();
		let i = e.currentTarget;
		i.setPointerCapture?.(e.pointerId);
		let a = (e) => {
			let a = i.getBoundingClientRect();
			if (r.includes("x")) {
				let r = Math.min(1, Math.max(0, (e.clientX - a.left) / a.width));
				Dn(t, n, "x", Math.round(r * 100) / 100);
			}
			if (r.includes("y")) {
				let r = Math.min(1, Math.max(0, (e.clientY - a.top) / a.height));
				Dn(t, n, "y", Math.round(r * 100) / 100);
			}
		};
		a(e);
		let o = () => {
			i.removeEventListener("pointermove", a), i.removeEventListener("pointerup", o), i.removeEventListener("pointercancel", o);
		};
		i.addEventListener("pointermove", a), i.addEventListener("pointerup", o), i.addEventListener("pointercancel", o);
	}
	let kn = (e) => Math.min(4, Math.max(.1, e));
	function An(e, t, n, r) {
		Dn(e, t, "size", kn(Math.round((n + r) * 100) / 100));
	}
	function jn(e, t, n) {
		let r = Number(n);
		Number.isFinite(r) && Dn(e, t, "size", kn(r / 100));
	}
	function Mn(e, t, n, r) {
		let i = gn[n.props.src];
		if (!i?.w || !i?.h || !B(hn)?.w || !B(hn)?.h) return;
		let a = B(hn).h * i.w / (B(hn).w * i.h), o = r === "cover" ? Math.max(1, a) : Math.min(1, a);
		(n.props.fit === "flislegg" || n.props.fit === "repeat") && Dn(e, t, "fit", "vanlig"), Dn(e, t, "size", kn(Math.round(o * 100) / 100));
	}
	function Nn(e) {
		return e.props;
	}
	function Pn(e, t, n, r) {
		e.mutate(n, (e) => {
			r(e.background.layers[t].props);
		});
	}
	function Fn(e, t, n, r) {
		Pn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-${n}`, (e) => {
			e[n] = r;
		});
	}
	let In = {
		linear: [
			["none", X("common.none")],
			["pan", X("opt.gradAnim.pan")],
			["pan-loop", X("opt.gradAnim.panLoop")],
			["rotate", X("opt.gradAnim.rotate")]
		],
		radial: [
			["none", X("common.none")],
			["pulse", X("opt.gradAnim.pulse")],
			["orbit", X("opt.gradAnim.orbit")]
		]
	};
	function Ln(e, t, n) {
		Pn(e, t, e.keyPrefix, (e) => {
			e.kind = n, In[n].some(([t]) => t === (e.animation ?? "none")) || (e.animation = "none");
		});
	}
	function Rn(e, t, n, r) {
		Pn(e, t, `edit:${e.keyPrefix}-${e.keyId}-${t}-stop${n}`, (e) => {
			e.stops[n] = {
				...e.stops[n],
				...r
			};
		});
	}
	function zn(e, t) {
		Pn(e, t, e.keyPrefix, (e) => {
			let t = Math.round(e.stops.reduce((e, t) => e + (Number(t.share) || 0), 0) / e.stops.length) || 50;
			e.stops.push({
				color: e.stops[e.stops.length - 1]?.color ?? "#ffffff",
				share: t
			});
		});
	}
	function Bn(e, t, n) {
		Pn(e, t, e.keyPrefix, (e) => {
			e.stops.length > 2 && e.stops.splice(n, 1);
		});
	}
	function Vn(e, t, n, r) {
		Pn(e, t, e.keyPrefix, (e) => {
			let [t] = e.stops.splice(n, 1);
			e.stops.splice(r, 0, t);
		});
	}
	let Hn = /* @__PURE__ */ P(null);
	function Un(e, t, n, r) {
		if (t.button !== 0) return;
		t.preventDefault();
		let i = t.currentTarget.closest(".bg-layer"), a = t.currentTarget.closest(".grad-stop");
		F(Hn, {
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
			F(Hn, {
				...B(Hn),
				insert: n
			}, !0);
		}, u = () => {
			window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", u), c.remove();
			let t = B(Hn);
			if (F(Hn, null), !t) return;
			let n = t.insert > t.from ? t.insert - 1 : t.insert;
			n !== t.from && Vn(e, t.layer, t.from, n);
		};
		window.addEventListener("pointermove", l), window.addEventListener("pointerup", u);
	}
	function Wn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].type !== n && (e.background.layers[t] = {
				type: n,
				version: s[n].version ?? 1,
				props: s[n].defaults()
			});
		});
	}
	async function Gn(e, t) {
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
	async function Kn(e) {
		let t = await e.text(), n = fa(t), r = ma(t);
		if (!r) return n;
		let i = await Gn(n.dataUrl, r);
		if (!i) return n;
		let a = pa(t, i);
		if (a === t) return n;
		try {
			return fa(a);
		} catch {
			return n;
		}
	}
	async function qn(e) {
		return e.type === "image/svg+xml" || /\.svg$/i.test(e.name || "") ? Kn(e) : la(e);
	}
	async function Jn(e, t, n) {
		let r = n.target.files?.[0];
		if (n.target.value = "", r) try {
			Dn(e, t, "src", (await qn(r)).dataUrl);
		} catch {
			x(X("status.imageReadError"), "error");
		}
	}
	async function Yn(e, t, n) {
		let r = [...n.target.files ?? []];
		if (n.target.value = "", !r.length) return;
		x(X("status.compressingImages"));
		let { images: i, failed: a, big: o } = await Cf(r);
		i.length && e.mutate(e.keyPrefix, (e) => {
			let n = e.background.layers[t].props;
			n.images ??= [], n.images.push(...i.map(({ src: e }) => ({
				src: e,
				x: .5,
				y: .5
			})));
		}), wf(i.length, a, o);
	}
	function Xn(e, t, n, r) {
		e.mutate(e.keyPrefix, (e) => {
			let i = e.background.layers[t].props.images, a = n + r;
			a < 0 || a >= i.length || ([i[n], i[a]] = [i[a], i[n]]);
		});
	}
	function Zn(e, t, n) {
		e.mutate(e.keyPrefix, (e) => {
			e.background.layers[t].props.images.splice(n, 1);
		});
	}
	function Qn(e, t, n, r, i) {
		e.mutate(`edit:${e.keyPrefix}g-${e.keyId}-${t}-${n}-${r}`, (e) => {
			e.background.layers[t].props.images[n][r] = i;
		});
	}
	function $n(e, t) {
		bi(e, () => {
			B(O).nav.style ??= {}, t(B(O).nav.style);
		});
	}
	let er = /* @__PURE__ */ M(() => ({
		mutate: xn,
		keyPrefix: "bg",
		keyId: B(sn)
	})), tr = {
		mutate: $n,
		keyPrefix: "navbg",
		keyId: "nav"
	}, nr = {
		mutate: ns,
		keyPrefix: "footerbg",
		keyId: "footer"
	}, rr = () => Object.entries(B(O)?.theme.tokens.color ?? {}).map(([e, t]) => [e, t]), ir = [
		[
			"bg",
			X("palette.bg"),
			X("palette.bgShort")
		],
		[
			"surface",
			X("palette.surface"),
			X("palette.surfaceShort")
		],
		[
			"text",
			X("palette.text"),
			X("palette.textShort")
		],
		[
			"accent",
			X("palette.accent"),
			X("palette.accentShort")
		],
		[
			"accent-text",
			X("palette.accentText"),
			X("palette.accentTextShort")
		]
	], ar = /* @__PURE__ */ M(() => !!B(O)?.theme.alt), or = /* @__PURE__ */ M(() => B(O)?.theme.alt?.auto === !0), sr = /* @__PURE__ */ M(() => B(O)?.theme.scheme === "dark" ? "dark" : "light"), cr = /* @__PURE__ */ M(() => B(O)?.theme.tokens.color ?? {}), lr = /* @__PURE__ */ M(() => ({
		...B(O)?.theme.tokens.color ?? {},
		...B(O)?.theme.alt?.tokens?.color ?? {}
	}));
	function ur(e) {
		return {
			type: e,
			version: mc[e].version,
			props: mc[e].defaults()
		};
	}
	let dr = (e) => !!(e && mc[e.type]?.entrance), fr = [["", X("common.none")], ...Object.entries(mc).filter(([, e]) => e.entrance).map(([e, t]) => [e, t.labelKey ? X(t.labelKey) : t.label])], pr = fr.filter(([e]) => !mc[e]?.group), mr = [["", X("common.none")], ...Object.entries(mc).filter(([, e]) => !e.entrance).map(([e, t]) => [e, t.labelKey ? X(t.labelKey) : t.label])];
	function hr(e) {
		e.animation && !dr(e.animation) && (e.hover ??= e.animation, e.animation = null);
	}
	function gr(e) {
		At(`edit:anim-${B(j).blockId}`, (t) => {
			hr(t), t.animation = e ? ur(e) : null;
		}), B(j) && D?.sendDemoAnim(B(j).sectionId, B(j).blockId);
	}
	function _r(e) {
		At(`edit:hover-${B(j).blockId}`, (t) => {
			hr(t), t.hover = e ? ur(e) : null;
		});
	}
	function vr(e, t) {
		Number.isFinite(t) && (At(`edit:anim-${B(j).blockId}:${e}`, (n) => {
			n.animation && (n.animation.props[e] = t);
		}), B(j) && D?.sendDemoAnim(B(j).sectionId, B(j).blockId));
	}
	function yr(e) {
		xn("section-anim", (t) => {
			hr(t), t.animation = e ? ur(e) : null;
		}), D?.sendDemoAnim(B(sn));
	}
	function br(e) {
		xn("section-hover", (t) => {
			hr(t), t.hover = e ? ur(e) : null;
		});
	}
	function xr(e, t) {
		Number.isFinite(t) && (xn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), D?.sendDemoAnim(B(sn)));
	}
	function Cr(e, t) {
		xn("edit:section-anim", (n) => {
			n.animation && (n.animation.props[e] = t);
		}), D?.sendDemoAnim(B(sn));
	}
	function Tr(e) {
		let t = E.data.sections.find((e) => e.id === B(sn));
		if (!t) return;
		let n = e.trim();
		if (!n) return;
		let r = /^\d+$/.test(n) ? `${n}px` : n;
		Le("section-size"), t.size = {
			...t.size,
			minHeight: r
		}, F(ln, r, !0), E.save(), k(), D?.sendSection(B(g), t);
	}
	function Er() {
		return E.data.sections.find((e) => e.id === B(sn)) ?? E.data.sections[0];
	}
	function Dr(e) {
		let t = E.data.sections.find((e) => e.id === B(sn));
		t && (Le("grid:section"), t.grid = e ? { ...De.data.grid } : null, F(cn, t.grid ? { ...t.grid } : null, !0), E.save(), k(), D?.sendSection(B(g), t), B(gi) && D?.sendShowGrid(!0));
	}
	function Or(e, t) {
		let n = E.data.sections.find((e) => e.id === B(sn));
		n?.grid && (Le("grid:section"), n.grid = {
			...n.grid,
			[e]: t
		}, F(cn, { ...n.grid }, !0), E.save(), k(), D?.sendSection(B(g), n), B(gi) && D?.sendShowGrid(!0));
	}
	function kr(e, t) {
		Le("grid:site"), F(ee, {
			...B(ee),
			[e]: t
		}, !0), De.data.grid = {
			...De.data.grid,
			[e]: t
		}, De.save(), k(), ke(), B(gi) && D?.sendShowGrid(!0);
	}
	async function Ar() {
		try {
			let e = await fetch("/api/github/me");
			e.ok ? F(T, await e.json(), !0) : e.status !== 503 && F(T, null);
		} catch {
			F(T, null);
		}
	}
	let jr = null;
	async function H() {
		try {
			let e = await fetch("/api/github/latest");
			e.ok && (jr = (await e.json()).head ?? null);
		} catch {}
	}
	async function Mr(e) {
		if (!jr) return await H(), {
			ok: await Ze({
				title: X("confirm.conflictUnknown.title"),
				lines: [X("confirm.conflictUnknown.body"), X("confirm.conflictUnknown.warning")],
				okLabel: X("confirm.publishAnyway"),
				cancelLabel: X("confirm.cancel")
			}),
			head: jr
		};
		let t = null;
		try {
			let e = await fetch(`/api/github/latest?base=${jr}`);
			e.ok && (t = await e.json().catch(() => null));
		} catch {}
		if (!t?.head) return {
			ok: !0,
			head: null
		};
		let n = t.head;
		if (n === jr) return {
			ok: !0,
			head: n
		};
		let r = new Set(e.map((e) => e.path)), i = t.truncated ? [X("confirm.conflict.truncated")] : (t.changedFiles ?? []).filter((e) => r.has(e));
		return i.length === 0 ? {
			ok: !0,
			head: n
		} : {
			ok: await Ze({
				title: X("confirm.conflict.title"),
				lines: [
					X("confirm.conflict.intro"),
					...i.map((e) => `• ${e}`),
					X("confirm.conflict.warning")
				],
				okLabel: X("confirm.publishAnyway"),
				cancelLabel: X("confirm.cancel")
			}),
			head: n
		};
	}
	let Pr = /* @__PURE__ */ P(null), Fr = /* @__PURE__ */ P(""), Ir = /* @__PURE__ */ P(!1);
	async function Lr() {
		F(Fr, "");
		try {
			let e = await fetch("/api/github/history");
			e.ok ? F(Pr, (await e.json()).commits, !0) : e.status === 401 ? (F(Pr, [], !0), F(Fr, X("status.historyLoginRequired"), !0)) : (F(Pr, [], !0), F(Fr, zi(await e.json().catch(() => null)) ?? X("status.historyFetchFailed"), !0));
		} catch {
			F(Pr, [], !0), F(Fr, X("status.historyUnavailable"), !0);
		}
	}
	let Rr = (() => {
		let e = {
			dateStyle: "short",
			timeStyle: "short"
		};
		try {
			return new Intl.DateTimeFormat(Bi(), e);
		} catch {
			return new Intl.DateTimeFormat(void 0, e);
		}
	})(), zr = !1;
	async function Vr() {
		let e = B(Pr)?.[0];
		if (!(!e || B(Ir)) && await Ze({
			title: X("confirm.revert.title"),
			lines: [`«${e.message}»`, X("confirm.revert.body")],
			okLabel: X("confirm.revert.ok"),
			cancelLabel: X("confirm.cancel")
		})) {
			F(Ir, !0), x(X("status.reverting"));
			try {
				let t = await fetch("/api/github/revert", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ expect: e.sha })
				});
				if (t.ok) {
					let { sha: e } = await t.json().catch(() => ({}));
					e ? jr = e : H(), zr = !0, x(X("status.revertDone"), "ok"), Hr();
				} else t.status === 409 ? x(X("status.revertConflict"), "error") : x(zi(await t.json().catch(() => null)) ?? X("status.revertFailed"), "error");
			} catch {
				x(X("status.publishLayerUnreachable"), "error");
			}
			F(Ir, !1), Lr();
		}
	}
	async function Hr() {
		let e = ["/content/site.json", ...B(O).pages.map((e) => `/${e.file}`)], t = async () => {
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
				x(X("status.revertDeployed"), "ok");
				for (let e of Object.keys(localStorage).filter((e) => e.startsWith("urd-draft-"))) localStorage.removeItem(e);
				await new Promise((e) => setTimeout(e, 800)), location.reload();
				return;
			}
		}
		x(X("status.revertDeployTimeout"), "error");
	}
	let Ur = /* @__PURE__ */ P(null), Gr = /* @__PURE__ */ P(null), Kr = /* @__PURE__ */ P(!1), qr = /* @__PURE__ */ P(rn(/* @__PURE__ */ new Set()));
	async function Jr() {
		F(Kr, !0), F(Gr, null), F(Ur, null);
		try {
			let e = await fetch("/api/github/update"), t = await e.json().catch(() => null);
			e.ok ? (F(Ur, t, !0), F(qr, /* @__PURE__ */ new Set(), !0)) : F(Gr, zi(t) ?? X("update.checkFailed"), !0);
		} catch {
			F(Gr, X("status.publishLayerUnreachable"), !0);
		}
		F(Kr, !1);
	}
	function Yr(e) {
		let t = new Set(B(qr));
		t.has(e) ? t.delete(e) : t.add(e), F(qr, t, !0);
	}
	async function Xr() {
		if (!B(Ur) || B(Ur).upToDate || B(Kr)) return;
		let e = [...B(qr)], t = B(Ur).changes.filter((e) => !B(qr).has(e.path)), n = t.filter((e) => e.atom && e.conflict);
		if (await Ze({
			title: X("confirm.update.title"),
			lines: [X("confirm.update.body", {
				target: B(Ur).target,
				writes: t.filter((e) => e.action === "write").length,
				deletes: t.filter((e) => e.action === "delete").length
			}), ...n.length > 0 ? [X("confirm.update.warnEdited", { paths: n.map((e) => e.path).join(", ") })] : []],
			okLabel: X("confirm.update.ok"),
			cancelLabel: X("confirm.cancel")
		})) {
			F(Kr, !0), x(X("update.running", { target: B(Ur).target }));
			try {
				let t = await fetch("/api/github/update", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						to: B(Ur).target,
						expect: B(Ur).head,
						skip: e
					})
				}), n = await t.json().catch(() => null);
				t.ok ? (x(X("update.committed", { target: B(Ur).target }), "ok"), await Zr(B(Ur).target.replace(/^v/, ""))) : t.status === 409 ? (x(zi(n) ?? X("update.checkFailed"), "error"), await Jr()) : x(zi(n) ?? X("update.failed"), "error");
			} catch {
				x(X("status.publishLayerUnreachable"), "error");
			}
			F(Kr, !1);
		}
	}
	async function Zr(e) {
		for (let t = 0; t < 18; t++) {
			await new Promise((e) => setTimeout(e, 1e4));
			try {
				if ((await (await fetch("/urd.json", { cache: "no-store" })).json())?.engine === e) {
					x(X("update.deployed"), "ok"), await new Promise((e) => setTimeout(e, 800)), location.reload();
					return;
				}
			} catch {}
		}
		x(X("update.deployTimeout"), "error");
	}
	let Qr = null;
	function $r(e) {
		return {
			schemaVersion: 2,
			meta: {
				id: e.id,
				title: e.title
			},
			sections: [{
				id: mo("sec"),
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
	async function ei(e, { keepHistory: t = !1 } = {}) {
		F(g, e, !0), Qr = (async () => {
			let n = je(), r = null;
			try {
				let e = await fetch(`/${n.file}`);
				e.ok && (r = so(await e.json(), De.data));
			} catch {}
			r ? Ae.delete(e) : r = $r(n), E = qi(`urd-draft-${e}`, () => r, S), (E.data.schemaVersion ?? 1) > 2 && (console.warn(`Urd: utkastet for '${e}' har schemaVersion ${E.data.schemaVersion} (motoren har 2) og forkastes`), E.replace(structuredClone(r))), E.replace(so(E.data, De.data)), E.save(), t || (Pe = null), F(sn, null), F(cn, null), k(), Se(), F(v, "");
		})(), await Qr;
	}
	function ti() {
		D?.destroy(), B(w)?.contentDocument?.addEventListener("pointerdown", () => {
			B(Tt) && F(Tt, null);
		}, !0), D = Ra(B(w), {
			onEdit: Xd,
			onMove: Zd,
			onGrow: Qd,
			onDelete: lf,
			onAddSection: rf,
			onMoveSection: af,
			onDeleteSection: of,
			onSectionSize: sf,
			onUndo: (e) => e.redo ? We() : Ue(),
			onSelectSection: bn,
			onSelectBlock: wt,
			onBlockMenu: kt,
			onReady: ni,
			onNavigate: yi,
			onAddBlock: (e) => pf(e.sectionId, e.block),
			onAddBlocks: (e) => mf(e.sectionId, e.blocks, e.minBottom, e.moves),
			onRequestBlock: xf,
			onMoveBlockSection: cf,
			onMobileReset: $d,
			onMobileOrder: ef,
			onReviewDone: tf,
			onBlockFlag: nf,
			onCollectionEdit: xo,
			onSaveTemplate: lo,
			onStickyGroup: ho,
			onStickyDock: fo,
			onDeleteTemplate: go,
			onApplyLayout: we,
			onPluginBlocks: (e) => {
				F(gf, e.blocks ?? [], !0);
			},
			onNavWidth: (e) => bi("edit:nav-width", () => {
				B(O).nav.style ??= {}, B(O).nav.style.width = e.width;
			})
		});
	}
	async function ni() {
		await Qr, await jo, D?.sendPlugins(He(B(Mo))?.enabled ?? []), D?.sendViewport(B(ae)), D?.sendZoom(B(he)), yo(), co(), De.hasDraft() && ke();
		let e = !B(m).pages.some((e) => e.id === B(g));
		(E.hasDraft() || e) && D?.sendPage(B(g), E.data), B(te) || D?.sendChrome(!1), B(gi) && D?.sendShowGrid(!0), B(ri) && D?.sendShowGuides(!0), d();
	}
	let ri = /* @__PURE__ */ P(localStorage.getItem("urd-guides") === "1"), ai = /* @__PURE__ */ P(!1), oi = /* @__PURE__ */ P(rn(localStorage.getItem("urd-layout-picker") === "menu" ? "menu" : "strip"));
	function si(e) {
		F(oi, e === "menu" ? "menu" : "strip", !0), B(oi) === "menu" ? localStorage.setItem("urd-layout-picker", "menu") : localStorage.removeItem("urd-layout-picker");
	}
	let ci = /* @__PURE__ */ P(null);
	Sn(() => {
		if (!B(ai)) return;
		let e = (e) => {
			B(ci)?.contains(e.target) || F(ai, !1);
		}, t = (e) => {
			e.key === "Escape" && F(ai, !1);
		}, n = () => {
			F(ai, !1);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let li = {
		view: 1079,
		device: 999,
		zoom: 919
	}, ui = /* @__PURE__ */ P(null), fi = /* @__PURE__ */ P(null), mi = rn({
		view: !1,
		device: !1,
		zoom: !1
	});
	Sn(() => {
		let e = Object.entries(li).map(([e, t]) => {
			let n = window.matchMedia(`(max-width: ${t}px)`), r = () => {
				mi[e] = n.matches;
			};
			return r(), n.addEventListener("change", r), () => n.removeEventListener("change", r);
		});
		return () => e.forEach((e) => e());
	}), Sn(() => {
		B(ui) && !mi[B(ui)] && F(ui, null);
	}), Sn(() => {
		if (!B(ui)) return;
		let e = (e) => {
			B(fi)?.contains(e.target) || F(ui, null);
		}, t = (e) => {
			e.key === "Escape" && F(ui, null);
		}, n = () => {
			F(ui, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	function hi() {
		F(ri, !B(ri)), localStorage.setItem("urd-guides", B(ri) ? "1" : "0"), D?.sendShowGuides(B(ri));
	}
	let gi = /* @__PURE__ */ P(localStorage.getItem("urd-grid-overlay") === "1");
	function _i() {
		F(gi, !B(gi)), localStorage.setItem("urd-grid-overlay", B(gi) ? "1" : "0"), D?.sendShowGrid(B(gi));
	}
	function yi(e) {
		let t = e.path.replace(/\/$/, "") || "/", n = B(O).pages.find((e) => e.path === t);
		n && n.id !== B(g) && ei(n.id);
	}
	function bi(e, t) {
		Le(e), t(), De.save(), k(), ke();
	}
	let xi = /* @__PURE__ */ P(""), Ci = /* @__PURE__ */ P(null), wi = Object.fromEntries(os.map((e) => [e.id, is(ss(e.id, {
		pageId: "forhandsvisning",
		title: ""
	}))])), Ti = /* @__PURE__ */ M(() => {
		let e = B(O)?.theme?.tokens?.color ?? {};
		return [
			"bg",
			"surface",
			"text",
			"accent"
		].filter((t) => typeof e[t] == "string" && ps(e[t])).map((t) => `--urd-color-${t}: ${e[t]};`).join(" ");
	}), Di = /* @__PURE__ */ P(null);
	Sn(() => {
		if (!B(Di)) return;
		let e = (e) => {
			e.target.closest?.(".page-menu-wrap") || F(Di, null);
		}, t = (e) => {
			e.key === "Escape" && F(Di, null);
		}, n = () => {
			F(Di, null);
		};
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), window.addEventListener("blur", n), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t), window.removeEventListener("blur", n);
		};
	});
	let Oi = [
		"admin",
		"api",
		"assets",
		"content",
		"media",
		"plugins",
		"functions",
		"readme"
	];
	function ki(e, t = null) {
		return e ? Oi.includes(e) ? X("error.reservedName", { slug: e }) : B(O).pages.some((n) => n.id !== t && (n.path === `/${e}` || n.id === e)) ? X("error.pageExists") : null : X("error.pageNeedsName");
	}
	function Ai() {
		let e = B(xi).trim(), t = ga(e), n = ki(t);
		if (n) {
			x(n, "error");
			return;
		}
		let r = B(Ci) && !B(Ci).startsWith("preset:") ? to[B(Ci)]?.data?.page : null, i = B(Ci)?.startsWith("preset:") ? ss(B(Ci).slice(7), {
			pageId: t,
			title: e
		}) ?? $r({
			id: t,
			title: e
		}) : r ? Ro(so(JSON.parse(JSON.stringify(r)), De.data), mo, {
			id: t,
			title: e
		}) : $r({
			id: t,
			title: e
		});
		bi("pages", () => {
			B(O).pages.push({
				id: t,
				title: e,
				path: `/${t}`,
				file: `content/pages/${t}.json`
			}), B(O).nav.items.push({
				label: e,
				page: t
			});
		}), C(`urd-draft-${t}`, JSON.stringify(i)), k(), F(xi, ""), F(Ci, null), ei(t);
	}
	async function ji(e) {
		F(Di, null), await Q("page", e.id === B(g) ? JSON.parse(JSON.stringify(E.data)) : await Ni(e));
	}
	function Mi(e, t) {
		let n = t.trim();
		if (!n || n === e.title) return;
		let r = e.title;
		bi("pages", () => {
			e.title = n;
			for (let t of B(O).nav.items) t.page === e.id && t.label === r && (t.label = n);
		}), e.id === B(g) ? (E.data.meta.title = n, E.save(), k(), D?.sendPage(B(g), E.data)) : Pi(e, (e) => {
			e.meta.title = n;
		});
	}
	async function Ni(e) {
		let t = localStorage.getItem(`urd-draft-${e.id}`);
		if (t) try {
			return JSON.parse(t);
		} catch {}
		try {
			let t = await fetch(`/${e.file}`);
			if (t.ok) return so(await t.json(), De.data);
		} catch {}
		return $r(e);
	}
	async function Pi(e, t) {
		let n = await Ni(e);
		t(n), C(`urd-draft-${e.id}`, JSON.stringify(n)), k();
	}
	function Fi(e, t) {
		let n = ga(t);
		if (e.path === "/" || `/${n}` === e.path) return;
		let r = ki(n, e.id);
		if (r) {
			x(r, "error");
			return;
		}
		bi("pages", () => {
			e.path = `/${n}`;
		});
	}
	function Ii(e) {
		e.path !== "/" && (bi("pages", () => {
			B(O).pages = B(O).pages.filter((t) => t.id !== e.id), B(O).nav.items = B(O).nav.items.filter((t) => t.page !== e.id || t.children);
			for (let t of B(O).nav.items) t.page === e.id && delete t.page, t.children && (t.children = t.children.filter((t) => t.page !== e.id), t.children.length === 0 && delete t.children);
			B(O).nav.items = B(O).nav.items.filter((e) => e.page || e.href || e.children);
		}), e.id === B(g) && ei(B(O).pages[0].id), x(X("status.pageRemoved")));
	}
	function Li(e) {
		bi("edit:nav-logo", () => {
			B(O).nav.logo = {
				type: "text",
				value: "",
				...B(O).nav.logo,
				...e
			};
		});
	}
	function Ri(e) {
		bi("nav", () => {
			B(O).nav.logo ??= {
				type: "text",
				value: B(O).site.title
			};
			let t = B(O).nav.logo, n = t.type === "image";
			e === "both" ? (n && (t.image = t.value, t.value = B(O).site.title), t.image ??= "", t.size ??= 32) : e === "image" ? (n || (t.value = t.image ?? ""), delete t.image, t.size ??= 32) : (n && (t.value = B(O).site.title), delete t.image), t.type = e;
		});
	}
	async function Vi(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qn(t);
			bi("nav", () => {
				let t = B(O).nav.logo;
				t.type === "both" ? t.image = e.dataUrl : t.value = e.dataUrl;
			});
		} catch {
			x(X("status.imageReadErrorSvg"), "error");
		}
	}
	let Hi = /* @__PURE__ */ P(null);
	async function Ui(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		if (t.type === "image/svg+xml" || /\.svg$/i.test(t.name || "")) {
			try {
				let e = await Kn(t);
				F(Hi, e.dataUrl, !0);
			} catch {
				x(X("status.imageReadErrorSvg"), "error");
			}
			return;
		}
		let n = new FileReader();
		n.onload = () => {
			F(Hi, String(n.result), !0);
		}, n.onerror = () => x(X("status.imageReadError"), "error"), n.readAsDataURL(t);
	}
	function Wi(e) {
		bi("edit:site-icon", () => {
			B(O).site.icon = e;
		}), F(Hi, null);
	}
	function Gi() {
		bi("edit:site-icon", () => {
			delete B(O).site.icon;
		});
	}
	function Ji(e) {
		bi("edit:site-title", () => {
			B(O).site.title = e;
		});
	}
	function Yi(e) {
		bi("edit:site-desc", () => {
			B(O).site.description = e;
		});
	}
	let Xi = /* @__PURE__ */ M(() => B(O)?.layout?.contentWidth ?? 1440), Zi = /* @__PURE__ */ M(() => B(O)?.layout?.gutter ?? 6), Qi = /* @__PURE__ */ M(() => Ya(B(Xi))), $i = /* @__PURE__ */ M(() => Ha.find((e) => e.gutter === B(Zi))?.id ?? null), ea = /* @__PURE__ */ P(!1), ta = /* @__PURE__ */ M(() => B(Xi) === "full" ? Va : Ga(B(Xi))), na = /* @__PURE__ */ M(() => Wa.map((e) => ({
		screen: e,
		...Ja(B(Xi), B(Zi), e)
	})));
	function ra(e, t) {
		bi(t, () => {
			B(O).layout = {
				contentWidth: B(Xi),
				gutter: B(Zi),
				...e
			};
		});
	}
	let ia = (e) => ra({ contentWidth: e === "full" ? "full" : Ga(e) }, "edit:site-width"), oa = (e) => ra({ gutter: Ka(e) }, "edit:site-gutter");
	function sa() {
		let e = B(O).site.lang ?? "no";
		return e === "no" ? "nb" : e;
	}
	function ca() {
		let e = sa(), t = ht([...mt, ...vt()]);
		return [...t.some(([t]) => t === e) ? [] : [[e, e]], ...t];
	}
	function ua(e) {
		bi("site", () => {
			B(O).site.lang = e;
		});
	}
	let da = /^(?:data:image\/[\w.+-]+;base64,[A-Za-z0-9+/=]+|\/(?!\/)[\w%./-]*)$/;
	Sn(() => {
		if (!B(O)?.site) return;
		let e = B(O).site.icon, t = document.querySelector("link[rel=\"icon\"]");
		if (t) {
			if (typeof e != "string" || !e) {
				t.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0e14'/%3E%3Cpath d='M19.2 49.6V14.4l25.6 10.4V49.6' fill='none' stroke='%2315b39a' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
				return;
			}
			da.test(e) && (t.href = e);
		}
	});
	function va(e) {
		bi("nav", () => {
			B(O).nav.layout = e;
		});
	}
	function ya(e, t) {
		bi(`edit:nav-style-${e}`, () => {
			B(O).nav.style ??= {}, t === void 0 ? delete B(O).nav.style[e] : B(O).nav.style[e] = t;
		});
	}
	let ba = /* @__PURE__ */ M(() => B(O)?.nav?.variant === "side-left" || B(O)?.nav?.variant === "side-right"), xa = /* @__PURE__ */ M(() => [
		"floating",
		"floating-square",
		"floating-tab"
	].includes(B(O)?.nav?.variant)), Sa = {
		underline: [X("hoverColor.underline.label"), X("hoverColor.underline.title")],
		pill: [X("hoverColor.pill.label"), X("hoverColor.pill.title")],
		lift: [X("hoverColor.lift.label"), X("hoverColor.lift.title")]
	}, Ca = /* @__PURE__ */ M(() => Sa[B(O)?.nav?.style?.hover] ?? null);
	function wa(e) {
		bi("nav", () => {
			e === "bar" ? delete B(O).nav.variant : B(O).nav.variant = e;
		});
	}
	function Oa(e) {
		bi("nav", () => {
			B(O).nav.style ??= {}, e ? B(O).nav.style.glow = !0 : delete B(O).nav.style.glow;
		});
	}
	function ka(e) {
		bi("nav", () => {
			B(O).nav.style ??= {}, e ? delete B(O).nav.style.topGap : B(O).nav.style.topGap = !1;
		});
	}
	function Aa(e) {
		bi("nav", () => {
			B(O).nav.style ??= {}, e === "standard" ? delete B(O).nav.style.hover : B(O).nav.style.hover = e;
		});
	}
	let ja = null, Ma = {}, Na = {}, Pa = !1, Fa = /* @__PURE__ */ P(rn([])), Ia = /* @__PURE__ */ P(rn({})), za = /* @__PURE__ */ P(null), Xa = /* @__PURE__ */ P(""), Za = /* @__PURE__ */ P("news"), Qa = [
		["news", X("collectionKind.news")],
		["notices", X("collectionKind.notices")],
		["publications", X("collectionKind.publications")],
		["custom", X("collectionKind.custom")]
	], $a = null, to = {}, no = {}, ro = !1, io = /* @__PURE__ */ P(rn([]));
	async function ao() {
		let e = {
			version: 1,
			maler: []
		};
		try {
			e = await (await fetch("/content/maler.json")).json();
		} catch {}
		$a = qi("urd-draft-maler", () => e, S), F(io, [...$a.data.maler ?? []], !0);
		for (let e of B(io)) {
			let t = null;
			try {
				t = await (await fetch(`/content/maler/${e}.json`)).json();
			} catch {}
			no[e] = t, to[e] = qi(`urd-draft-mal-${e}`, () => t, S), (to[e].data?.schemaVersion ?? 1) > 1 && to[e].reset();
		}
		ro = !0, co();
	}
	function co() {
		let e = B(io).map((e) => to[e]?.data ? {
			id: e,
			...JSON.parse(JSON.stringify(to[e].data))
		} : null).filter(Boolean).map(({ id: e, mal: t, section: n, blocks: r, page: i }) => ({
			id: e,
			name: t.name,
			kind: t.kind,
			section: n,
			blocks: r,
			page: i
		}));
		D?.sendMaler(e);
	}
	function lo(e) {
		let t = Io.includes(e.kind) ? e.kind : "section";
		return Q(t, e[t]);
	}
	function fo(e) {
		let { section: t, block: n } = St(e.sectionId, e.blockId);
		!t || !n?.sticky || Dt.some(([t]) => t === e.dock) && (Le(`sticky-dock:${e.blockId}`), n.sticky = {
			...n.sticky,
			dock: e.dock
		}, E.save(), k(), D?.sendSection(B(g), t), Ct());
	}
	function ho(e) {
		let t = e.blockIds ?? [], { section: n } = St(e.sectionId, t[0]);
		if (!n || !t.length) return;
		Le(`sticky-group:${e.sectionId}`);
		let r = e.on ? mo("stk") : null;
		for (let e of n.blocks) t.includes(e.id) && (e.sticky = r ? {
			offset: 16,
			until: null,
			...e.sticky,
			group: r
		} : null);
		Ee(n, "block-edited"), E.save(), k(), D?.sendSection(B(g), n), Ct(), x(X(e.on ? "status.stickyGrouped" : "status.stickyUngrouped"));
	}
	async function Q(e, t) {
		if (!t || !$a) return;
		let n = (await Qe({
			title: X("canvas.templateNamePrompt"),
			placeholder: X("ph.templateName")
		}))?.trim();
		if (!n) return;
		let r = Lo(n);
		if (!r) {
			x(X("status.invalidName"), "error");
			return;
		}
		if (B(io).includes(r)) {
			x(X("status.templateExists"), "error");
			return;
		}
		Le("maler");
		let i = {
			schemaVersion: 1,
			mal: {
				name: n,
				kind: e
			},
			[e]: t
		};
		to[r] = qi(`urd-draft-mal-${r}`, () => null, S), to[r].replace(i), to[r].save(), $a.data.maler = [...B(io), r], $a.save(), F(io, [...B(io), r], !0), x(X("status.templateSaved", { name: n }), "ok"), k(), co();
	}
	async function go(e) {
		let t = to[e.id]?.data?.mal;
		t && await Ze({ title: X("confirm.deleteTemplate", { name: t.name }) }) && (Le("maler"), B(Ci) === e.id && F(Ci, null), localStorage.removeItem(`urd-draft-mal-${e.id}`), delete to[e.id], $a.data.maler = B(io).filter((t) => t !== e.id), $a.save(), F(io, B(io).filter((t) => t !== e.id), !0), k(), co());
	}
	async function _o() {
		let e = {
			version: 1,
			samlinger: []
		};
		try {
			e = await (await fetch("/content/samlinger.json")).json();
		} catch {}
		ja = qi("urd-draft-samlinger", () => e, S), F(Fa, [...ja.data.samlinger ?? []], !0);
		for (let e of B(Fa)) {
			let t = null;
			try {
				t = await (await fetch(`/content/samlinger/${e}.json`)).json();
			} catch {}
			Na[e] = t, Ma[e] = qi(`urd-draft-samling-${e}`, () => t, S), !t && !Ma[e].data && (Ma[e].replace({
				schemaVersion: 1,
				id: e,
				name: e,
				kind: "custom",
				entries: []
			}), Ma[e].save());
		}
		Pa = !0, vo();
	}
	function vo(e = !0) {
		let t = {};
		for (let e of B(Fa)) Ma[e] && (t[e] = JSON.parse(JSON.stringify(Ma[e].data)));
		F(Ia, t, !0), e && yo();
	}
	function yo() {
		D?.sendCollections(He(B(Ia)) ?? {});
	}
	function bo(e, t, n, r = !0) {
		let i = Ma[e];
		i && (Le(t), n(i.data), i.save(), k(), vo(r));
	}
	function xo(e) {
		let { collection: t, entryId: n, field: r, value: i } = e;
		[
			"title",
			"text",
			"image",
			"imageAlt",
			"imageStyle"
		].includes(r) && (r === "title" && !String(i ?? "").replace(/<[^>]*>/g, "").trim() || bo(t, `edit:samling:${t}:${n}:${r}`, (e) => {
			let t = e.entries.find((e) => e.id === n);
			t && (i === "" && r !== "title" ? delete t[r] : t[r] = i);
		}, r === "image"));
	}
	function So() {
		let e = B(Xa).trim();
		if (!e) return;
		let t = ga(e);
		if (!t || B(Fa).includes(t)) {
			x(X(t ? "status.collectionExists" : "status.invalidName"), "error");
			return;
		}
		Le("samlinger");
		let n = {
			schemaVersion: 1,
			id: t,
			name: e,
			kind: B(Za),
			entries: []
		};
		Ma[t] = qi(`urd-draft-samling-${t}`, () => null, S), Ma[t].replace(n), Ma[t].save(), ja.data.samlinger = [...B(Fa), t], ja.save(), F(Fa, [...B(Fa), t], !0), F(za, t, !0), F(Xa, ""), k(), vo();
	}
	function Co(e) {
		Le("samlinger"), localStorage.removeItem(`urd-draft-samling-${e}`), delete Ma[e], ja.data.samlinger = B(Fa).filter((t) => t !== e), ja.save(), F(Fa, B(Fa).filter((t) => t !== e), !0), B(za) === e && F(za, null), k(), vo();
	}
	function wo(e) {
		bo(e, `samling:${e}:add-entry`, (e) => {
			e.entries.unshift({
				id: mo("innslag"),
				title: X("seed.newEntry"),
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				text: ""
			});
		});
	}
	function To(e, t, n, r) {
		bo(e, `edit:samling:${e}:${t}:${n}`, (e) => {
			let i = e.entries.find((e) => e.id === t);
			i && (r === "" && n !== "title" ? delete i[n] : i[n] = r);
		});
	}
	function Eo(e, t, n) {
		bo(e, `samling:${e}:move-entry`, (e) => {
			let r = t + n;
			r < 0 || r >= e.entries.length || ([e.entries[t], e.entries[r]] = [e.entries[r], e.entries[t]]);
		});
	}
	function Do(e, t) {
		bo(e, `samling:${e}:remove-entry`, (e) => {
			e.entries = e.entries.filter((e) => e.id !== t);
		});
	}
	async function Oo(e, t, n) {
		let r = n.target.files?.[0];
		n.target.value = "", r && To(e, t, "image", (await qn(r)).dataUrl);
	}
	let ko = null, Ao, jo = new Promise((e) => {
		Ao = e;
	}), Mo = /* @__PURE__ */ P(null), No = rn({}), Po = /* @__PURE__ */ P("0.0.0"), Fo = /* @__PURE__ */ P(""), zo = /* @__PURE__ */ P(""), Bo = /* @__PURE__ */ P(rn([])), Vo = /* @__PURE__ */ P(rn([])), Ho = /* @__PURE__ */ P("pending"), Uo = () => [.../* @__PURE__ */ new Set([...B(Mo)?.enabled ?? [], ...B(Mo)?.disabled ?? []])];
	function Wo() {
		F(Mo, JSON.parse(JSON.stringify(ko.data)), !0);
	}
	let Go = /* @__PURE__ */ P(null);
	async function Ko() {
		try {
			let e = (await fetch("/urd.json", { cache: "no-store" })).headers.get("content-security-policy");
			if (!e) {
				F(Go, { unknown: !0 }, !0);
				return;
			}
			let t = (t) => new Set((e.split(";").map((e) => e.trim()).find((e) => e.startsWith(`${t} `)) ?? "").split(/\s+/).slice(1));
			F(Go, {
				frameSrc: t("frame-src"),
				connectSrc: t("connect-src")
			}, !0);
		} catch {
			F(Go, { unknown: !0 }, !0);
		}
	}
	function qo(e) {
		let t = [...(e.connectSrc ?? []).map((e) => ["connect-src", e]), ...(e.frameSrc ?? []).map((e) => ["frame-src", e])];
		if (!B(Go) || B(Go).unknown) return [];
		let n = {
			"connect-src": B(Go).connectSrc,
			"frame-src": B(Go).frameSrc
		};
		return t.filter(([e, t]) => !n[e]?.has(t)).map(([e, t]) => `${e} ${t}`);
	}
	async function $() {
		Ko();
		let e = {
			version: 1,
			enabled: []
		};
		try {
			e = await (await fetch("/plugins/plugins.json")).json();
		} catch {}
		F(Vo, e.enabled ?? [], !0), ko = qi("urd-draft-plugins", () => e, S), Wo();
		try {
			F(Po, (await (await fetch("/urd.json")).json()).engine ?? "0.0.0", !0);
		} catch {}
		for (let e of Uo()) Xo(e);
		Jo(), Ao(), D?.sendPlugins(He(B(Mo))?.enabled ?? []);
	}
	async function Jo() {
		try {
			let e = await fetch("/api/github/plugins");
			if (!e.ok) {
				Yo();
				return;
			}
			let { plugins: t } = await e.json();
			localStorage.setItem("urd-plugins-found", JSON.stringify(t ?? [])), F(Bo, (t ?? []).filter((e) => !Uo().includes(e)), !0);
			for (let e of B(Bo)) Xo(e);
			F(Ho, "ok");
		} catch {
			Yo();
		}
	}
	function Yo() {
		try {
			let e = JSON.parse(localStorage.getItem("urd-plugins-found") ?? "[]");
			if (Array.isArray(e) && e.length) {
				F(Bo, e.filter((e) => !Uo().includes(e)), !0);
				for (let e of B(Bo)) Xo(e);
				F(Ho, "ok");
				return;
			}
		} catch {}
		F(Ho, "unavailable");
	}
	async function Xo(e) {
		try {
			let t = await (await fetch(`/plugins/${e}/plugin.json`)).json(), n = po(t);
			No[e] = {
				...t,
				errors: n,
				satisfied: n.length === 0 && uo(B(Po), t.requiresEngine)
			};
		} catch {
			No[e] = {
				name: e,
				errors: [X("plugin.manifestNotFound", { id: e })],
				satisfied: !1
			};
		}
	}
	function Zo(e, t) {
		Le("plugins");
		let n = ko.data;
		n.enabled = (n.enabled ?? []).filter((t) => t !== e), n.disabled = (n.disabled ?? []).filter((t) => t !== e), t ? n.enabled.push(e) : n.disabled.push(e), ko.save(), k(), Wo(), Qo();
	}
	function Qo() {
		B(w) && (B(w).src = B(w).src);
	}
	function $o(e) {
		Le("plugins");
		let t = ko.data;
		t.enabled = (t.enabled ?? []).filter((t) => t !== e), t.disabled = (t.disabled ?? []).filter((t) => t !== e), ko.save(), k(), Wo(), Qo();
	}
	async function es() {
		F(zo, "");
		let e = B(Fo).trim().toLowerCase();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(e)) {
			F(zo, X("plugin.invalidId"), !0);
			return;
		}
		if (Uo().includes(e)) {
			F(zo, X("plugin.alreadyListed"), !0);
			return;
		}
		if (await Xo(e), No[e].errors.length) {
			F(zo, X("plugin.invalidManifest", { errors: No[e].errors.join("; ") }), !0);
			return;
		}
		Zo(e, !0), F(Fo, "");
	}
	function ts(e) {
		F(Bo, B(Bo).filter((t) => t !== e), !0), Zo(e, !0);
	}
	function ns(e, t) {
		bi(e, () => {
			B(O).footer ??= {
				version: 1,
				show: !1,
				text: "",
				align: "center"
			}, t(B(O).footer);
		});
	}
	function rs(e, t) {
		ns(`edit:footer-brand-${e}`, (n) => {
			n.brand ??= {}, t.trim() ? n.brand[e] = t : delete n.brand[e], !n.brand.title && !n.brand.tagline && !n.brand.logo && delete n.brand;
		});
	}
	function as(e) {
		ns("footer", (t) => {
			t.brand ??= {}, e === "image" || e === "both" ? t.brand.mode = e : delete t.brand.mode;
		});
	}
	async function cs(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", t) try {
			let e = await qn(t);
			ns("footer", (t) => {
				t.brand ??= {}, t.brand.logo = e.dataUrl, t.brand.mode || (t.brand.mode = "both");
			});
		} catch {
			x(X("status.imageReadErrorSvg"), "error");
		}
	}
	function ls() {
		ns("footer", (e) => {
			e.brand && (delete e.brand.logo, delete e.brand.mode, delete e.brand.logoHeight, !e.brand.title && !e.brand.tagline && delete e.brand);
		});
	}
	function ds(e) {
		ns("edit:footer-logo-height", (t) => {
			t.brand ??= {};
			let n = Number(e);
			Number.isFinite(n) && (t.brand.logoHeight = Math.min(160, Math.max(16, Math.round(n))));
		});
	}
	function fs(e) {
		ns("edit:footer-copyright", (t) => {
			e.trim() ? t.copyright = e : delete t.copyright;
		});
	}
	let hs = [
		{
			id: "minimal",
			label: X("footerTemplate.minimal"),
			thumb: {
				center: !0,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "sentrert",
			label: X("footerTemplate.sentrert"),
			thumb: {
				center: !0,
				row: !0,
				social: 3
			}
		},
		{
			id: "kolonner",
			label: X("footerTemplate.kolonner"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 3,
				baselineLinks: 2
			}
		},
		{
			id: "sitemap",
			label: X("footerTemplate.sitemap"),
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
			label: X("footerTemplate.nyhetsbrev"),
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
			label: X("footerTemplate.storcta"),
			thumb: {
				center: !0,
				bigcta: !0,
				baselineLinks: 2
			}
		},
		{
			id: "kontakt",
			label: X("footerTemplate.kontakt"),
			thumb: {
				tag: !0,
				cols: 3,
				social: 2,
				baselineLinks: 1
			}
		},
		{
			id: "mega",
			label: X("footerTemplate.mega"),
			thumb: {
				tag: !0,
				mega: !0,
				cols: 2,
				social: 4,
				baselineLinks: 2
			}
		}
	];
	function gs(e) {
		let t = X("seed.orgName"), n = B(O).pages ?? [], r = (e) => n.slice(0, e).map((e) => ({
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
			baseline: [a(X("seed.footer.privacy"), "#")]
		} : e === "sentrert" ? {
			align: "center",
			brand: { title: t },
			linkRow: r(5),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: `${o} · ${X("seed.footer.madeWith")}`
		} : e === "kolonner" ? {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline1")
			},
			columns: [
				{
					title: X("seed.footer.colPages"),
					links: r(4)
				},
				{
					title: X("seed.footer.colCompany"),
					links: [
						a(X("seed.footer.about"), "#"),
						a(X("seed.join"), "#"),
						a(X("seed.footer.press"), "#")
					]
				},
				{
					title: X("seed.footer.colResources"),
					links: [
						a(X("seed.footer.bylaws"), "#"),
						a(X("seed.footer.privacy"), "#"),
						a(X("seed.footer.contact"), "#")
					]
				}
			],
			social: i([
				"facebook",
				"instagram",
				"linkedin"
			]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#"), a(X("seed.footer.terms"), "#")]
		} : e === "sitemap" ? {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline2")
			},
			columns: [
				{
					title: X("seed.footer.colExplore"),
					links: [
						a(X("seed.footer.home"), "#"),
						a(X("seed.footer.events"), "#"),
						a(X("seed.footer.gallery"), "#"),
						a(X("seed.footer.blog"), "#")
					]
				},
				{
					title: X("seed.footer.colCompany"),
					links: [
						a(X("seed.footer.about"), "#"),
						a(X("seed.footer.history"), "#"),
						a(X("seed.footer.press"), "#"),
						a(X("seed.footer.contact"), "#")
					]
				},
				{
					title: X("seed.footer.colSupport"),
					links: [
						a(X("seed.join"), "#"),
						a(X("seed.footer.faq"), "#"),
						a(X("seed.footer.help"), "#")
					]
				},
				{
					title: X("seed.footer.colLegal"),
					links: [
						a(X("seed.footer.privacy"), "#"),
						a(X("seed.footer.terms"), "#"),
						a(X("seed.footer.bylaws"), "#")
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
				a(X("seed.footer.privacy"), "#"),
				a(X("seed.footer.terms"), "#"),
				a(X("seed.footer.cookies"), "#")
			]
		} : e === "nyhetsbrev" ? {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline3")
			},
			cta: {
				kind: "newsletter",
				heading: X("seed.footer.newsletterHeading"),
				label: X("seed.footer.newsletterButton"),
				recipient: X("seed.email"),
				success: X("seed.footer.newsletterSuccess")
			},
			columns: [{
				title: X("seed.footer.colPages"),
				links: r(4)
			}, {
				title: X("seed.footer.colMore"),
				links: [
					a(X("seed.footer.about"), "#"),
					a(X("seed.footer.contact"), "#"),
					a(X("seed.footer.privacy"), "#")
				]
			}],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#")]
		} : e === "storcta" ? {
			align: "center",
			cta: {
				kind: "button",
				big: !0,
				heading: X("seed.footer.ctaHeading"),
				sub: X("seed.footer.ctaSub"),
				label: X("seed.join"),
				href: "#"
			},
			linkRow: r(4),
			social: i([
				"facebook",
				"instagram",
				"x"
			]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#"), a(X("seed.footer.terms"), "#")]
		} : e === "kontakt" ? {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline4")
			},
			columns: [
				{
					title: X("seed.footer.colVisit"),
					links: [
						a(X("seed.footer.address"), "#"),
						a(X("seed.email"), "mailto:post@dinforening.no"),
						a("+47 22 00 00 00", "tel:+4722000000")
					]
				},
				{
					title: X("seed.footer.colHours"),
					links: [a(X("seed.footer.hours1"), "#"), a(X("seed.footer.hours2"), "#")]
				},
				{
					title: X("seed.footer.colPages"),
					links: r(4)
				}
			],
			social: i(["facebook", "instagram"]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#")]
		} : {
			align: "left",
			brand: {
				title: t,
				tagline: X("seed.footer.tagline5")
			},
			columns: [{
				title: X("seed.footer.colExplore"),
				links: r(4)
			}, {
				title: X("seed.footer.colFollow"),
				links: [a(X("seed.footer.newsletter"), "#"), a(X("seed.email"), "mailto:post@dinforening.no")]
			}],
			social: i([
				"facebook",
				"instagram",
				"linkedin",
				"youtube"
			]),
			copyright: o,
			baseline: [a(X("seed.footer.privacy"), "#"), a(X("seed.footer.madeWith"), "#")],
			background: {
				version: 1,
				layers: [{
					type: "glow",
					version: Ps.version ?? 1,
					props: {
						...Ps.defaults(),
						color: "accent",
						x: .12,
						y: 0,
						radius: .6,
						opacity: .45
					}
				}, {
					type: "grain",
					version: Is.version ?? 1,
					props: {
						...Is.defaults(),
						opacity: .08
					}
				}]
			}
		};
	}
	function Ss(e) {
		ns("footer-template", (t) => {
			let n = gs(e);
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
	function Cs(e) {
		ns("footer", (t) => {
			t[e] ??= [], t[e].push(B(O).pages[0] ? {
				label: X("seed.link"),
				page: B(O).pages[0].id
			} : {
				label: X("seed.link"),
				href: "https://"
			});
		});
	}
	function ws(e, t) {
		ns("footer", (n) => {
			n[e].splice(t, 1), n[e].length || delete n[e];
		});
	}
	function Ts(e, t, n) {
		ns("footer", (r) => {
			let i = r[e], a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Es(e, t, n) {
		ns(`edit:footer-${e}-label-${t}`, (r) => {
			r[e][t].label = n;
		});
	}
	function Ds(e, t, n) {
		ns("footer", (r) => {
			let i = r[e][t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Os(e, t, n) {
		ns(`edit:footer-${e}-href-${t}`, (r) => {
			r[e][t].href = n;
		});
	}
	function ks(e) {
		ns("footer", (t) => {
			e === "center" ? t.columnsAlign = "center" : delete t.columnsAlign;
		});
	}
	function As(e) {
		ns("footer", (t) => {
			e ? t.cta ??= {
				kind: "button",
				label: X("seed.join")
			} : delete t.cta;
		});
	}
	function js(e, t) {
		ns(`edit:footer-cta-${e}`, (n) => {
			n.cta ??= {}, t === "" || t == null || t === !1 ? delete n.cta[e] : n.cta[e] = t;
		});
	}
	function Ms(e) {
		ns("footer", (t) => {
			t.cta ??= {}, e === "__href" ? (delete t.cta.page, t.cta.href = t.cta.href ?? "https://") : (t.cta.page = e, delete t.cta.href);
		});
	}
	function Fs(e, t) {
		ns("footer", (n) => {
			let r = new Set(n.hideOn ?? []);
			t ? r.delete(e) : r.add(e), r.size ? n.hideOn = [...r] : delete n.hideOn;
		});
	}
	function Ls() {
		ns("footer", (e) => {
			e.columns ??= [], e.columns.push({
				title: X("seed.column"),
				links: [{
					label: X("seed.link"),
					page: B(O).pages[0].id
				}]
			});
		});
	}
	function Rs(e) {
		ns("footer", (t) => {
			t.columns.splice(e, 1), t.columns.length || delete t.columns;
		});
	}
	function zs(e, t) {
		ns("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.columns.length || ([n.columns[e], n.columns[r]] = [n.columns[r], n.columns[e]]);
		});
	}
	function Bs(e, t) {
		ns(`edit:footer-col-title-${e}`, (n) => {
			n.columns[e].title = t;
		});
	}
	function Vs(e) {
		ns("footer", (t) => {
			t.columns[e].links ??= [], t.columns[e].links.push({
				label: X("seed.link"),
				page: B(O).pages[0].id
			});
		});
	}
	function Hs(e, t) {
		ns("footer", (n) => {
			n.columns[e].links.splice(t, 1);
		});
	}
	function Us(e, t, n) {
		ns("footer", (r) => {
			let i = r.columns[e].links, a = t + n;
			a < 0 || a >= i.length || ([i[t], i[a]] = [i[a], i[t]]);
		});
	}
	function Ws(e, t, n) {
		ns(`edit:footer-link-label-${e}-${t}`, (r) => {
			r.columns[e].links[t].label = n;
		});
	}
	function Gs(e, t, n) {
		ns("footer", (r) => {
			let i = r.columns[e].links[t];
			n === "__href" ? (delete i.page, i.href = i.href ?? "https://") : (i.page = n, delete i.href);
		});
	}
	function Ks(e, t, n) {
		ns(`edit:footer-link-href-${e}-${t}`, (r) => {
			r.columns[e].links[t].href = n;
		});
	}
	function qs() {
		ns("footer", (e) => {
			e.social ??= [], e.social.push({
				icon: "facebook",
				url: "https://"
			});
		});
	}
	function Js(e) {
		ns("footer", (t) => {
			t.social.splice(e, 1), t.social.length || delete t.social;
		});
	}
	function Ys(e, t) {
		ns("footer", (n) => {
			let r = e + t;
			r < 0 || r >= n.social.length || ([n.social[e], n.social[r]] = [n.social[r], n.social[e]]);
		});
	}
	function Xs(e, t) {
		ns("footer", (n) => {
			n.social[e].icon = t;
		});
	}
	function Zs(e, t) {
		ns(`edit:footer-social-url-${e}`, (n) => {
			n.social[e].url = t;
		});
	}
	let Qs = Ea.filter(([e]) => e === "iconCat.social" || e === "iconCat.communication").flatMap(([, e]) => e.map((e) => [e, Ta[e].label]));
	function $s(e, t) {
		bi(`edit:nav-label-${e}`, () => {
			B(O).nav.items[e].label = t;
		});
	}
	function ec(e, t) {
		bi("nav", () => {
			let n = B(O).nav.items[e];
			t === "__href" ? (delete n.page, n.href = n.href ?? "https://") : t === "__none" ? (delete n.page, delete n.href) : (n.page = t, delete n.href);
		});
	}
	function tc(e, t) {
		bi(`edit:nav-href-${e}`, () => {
			B(O).nav.items[e].href = t;
		});
	}
	function nc(e, t) {
		let n = e + t, r = B(O).nav.items;
		n < 0 || n >= r.length || bi("nav", () => {
			[r[e], r[n]] = [r[n], r[e]];
		});
	}
	function rc(e) {
		bi("nav", () => {
			B(O).nav.items.splice(e, 1);
		});
	}
	function ic() {
		bi("nav", () => {
			B(O).nav.items.push({
				label: X("seed.link"),
				page: B(O).pages[0].id
			});
		});
	}
	function ac(e) {
		bi("nav", () => {
			let t = B(O).nav.items[e];
			t.children ??= [], t.children.push({
				label: X("seed.link"),
				page: B(O).pages[0].id
			});
		});
	}
	function sc(e, t, n) {
		bi(`edit:nav-child-label-${e}-${t}`, () => {
			B(O).nav.items[e].children[t].label = n;
		});
	}
	function cc(e, t, n) {
		bi("nav", () => {
			let r = B(O).nav.items[e].children[t];
			n === "__href" ? (delete r.page, r.href = r.href ?? "https://") : (r.page = n, delete r.href);
		});
	}
	function lc(e, t, n) {
		bi(`edit:nav-child-href-${e}-${t}`, () => {
			B(O).nav.items[e].children[t].href = n;
		});
	}
	function fc(e, t, n) {
		let r = t + n, i = B(O).nav.items[e].children;
		r < 0 || r >= i.length || bi("nav", () => {
			[i[t], i[r]] = [i[r], i[t]];
		});
	}
	function pc(e, t) {
		bi("nav", () => {
			let n = B(O).nav.items[e];
			n.children.splice(t, 1), n.children.length === 0 && (delete n.children, !n.page && !n.href && (n.page = B(O).pages[0].id));
		});
	}
	function Md(e, t) {
		bi(`edit:theme-color-${e}`, () => {
			B(O).theme.tokens.color[e] = t, B(O).theme.alt?.auto && (B(O).theme.alt.tokens.color = Id());
		});
	}
	function Nd(e, t) {
		bi("theme", () => {
			B(O).theme.tokens.font[e] = t;
		});
	}
	function Pd(e, t) {
		bi("theme", () => {
			B(O).theme.tokens.radius[e] = t;
		});
	}
	function Fd(e) {
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
	function Id() {
		return Object.fromEntries(Object.entries(B(O).theme.tokens.color).map(([e, t]) => [e, Fd(t)]));
	}
	function Ld(e, t) {
		bi(`edit:theme-alt-${e}`, () => {
			B(O).theme.alt.tokens.color[e] = t, B(O).theme.alt.auto = !1;
		});
	}
	function Rd(e) {
		bi("theme", () => {
			e === "light" ? delete B(O).theme.scheme : B(O).theme.scheme = e;
		});
	}
	function zd(e) {
		bi("theme", () => {
			e ? B(O).theme.alt = {
				auto: !0,
				tokens: { color: Id() }
			} : delete B(O).theme.alt;
		});
	}
	function Bd(e) {
		bi("theme", () => {
			B(O).theme.alt ??= { tokens: { color: Id() } }, B(O).theme.alt.auto = e, e && (B(O).theme.alt.tokens.color = Id());
		});
	}
	function Vd(e) {
		let t = B(O).theme.tokens.font[e];
		return [...hc.some(([, e]) => e === t) ? [] : [[t, X("opt.customFont")]], ...hc.map(([e, t]) => [t, X(e)])];
	}
	let Hd = (e) => parseInt(e, 10) || 0;
	function Ud(e, t) {
		Pd(e, `${t}px`);
	}
	let Wd = (e, t) => e && t && t[e] ? t[e] : e, Gd = [
		"bg",
		"surface",
		"text",
		"accent",
		"accent-text"
	], Kd = [
		{
			id: "bronn",
			name: X("themePreset.bronn.name"),
			note: X("themePreset.bronn.note"),
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
			name: X("themePreset.stein.name"),
			note: X("themePreset.stein.note"),
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
			name: X("themePreset.plomme.name"),
			note: X("themePreset.plomme.note"),
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
			name: X("themePreset.rose.name"),
			note: X("themePreset.rose.note"),
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
			name: X("themePreset.hav.name"),
			note: X("themePreset.hav.note"),
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
			name: X("themePreset.natt.name"),
			note: X("themePreset.natt.note"),
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
	function qd(e) {
		bi("theme", () => {
			let t = e.scheme === "dark", n = t ? e.dark : e.light, r = t ? e.light : e.dark;
			for (let e of Gd) B(O).theme.tokens.color[e] = n[e];
			t ? B(O).theme.scheme = "dark" : delete B(O).theme.scheme, B(O).theme.alt = { tokens: { color: { ...r } } };
		});
	}
	let Jd = /* @__PURE__ */ M(() => {
		if (!B(O)) return null;
		let e = B(O).theme.tokens.color, t = B(O).theme.alt?.tokens?.color ?? {}, n = B(O).theme.scheme === "dark";
		return Kd.find((r) => {
			let i = n ? r.dark : r.light, a = n ? r.light : r.dark;
			return Gd.every((n) => e[n] === i[n] && t[n] === a[n]);
		})?.id ?? null;
	});
	function Yd() {
		F(te, !B(te)), D?.sendChrome(B(te));
	}
	function Xd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Le(`edit:${e.blockId}`), n.props = e.props, E.save(), k(), B(j)?.blockId === e.blockId && Ct(), e.rerender && D?.sendSection(B(g), t), F(v, ""));
	}
	function Zd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		if (!n) return;
		Le(e.coalesce ? `edit:${e.groupKey ?? e.blockId}` : "move-block");
		let r = e.frameKey === "mobile" ? "mobile" : "desktop";
		n.frames[r] = e.frame, r === "desktop" && Ee(t, "desktop-changed-after-mobile"), E.save(), k(), B(j)?.blockId === e.blockId && Ct();
	}
	function Qd(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
		!t?.frames?.desktop || t.frames.desktop.h === e.h || (E.amendBaseline((t) => {
			let n = t.sections.find((t) => t.id === e.sectionId)?.blocks.find((t) => t.id === e.blockId);
			n?.frames?.desktop && (n.frames.desktop.h = e.h);
		}), E.hasDraft() && Le(`edit:${e.blockId}`), t.frames.desktop.h = e.h, E.save(), k(), B(j)?.blockId === e.blockId && Ct());
	}
	function $d(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			if (Le("mobile-reset"), e.blockId) {
				let n = t.blocks.find((t) => t.id === e.blockId);
				n && (n.frames.mobile = null);
			} else for (let e of t.blocks) e.frames.mobile = null;
			!Te(t) && t.responsive?.mobile && (t.responsive.mobile.attention = null), E.save(), k(), Se(), D?.sendSection(B(g), t);
		}
	}
	function ef(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		!n || typeof e.mobileOrder != "number" || (Le("mobile-order"), n.mobileOrder = e.mobileOrder, E.save(), k(), D?.sendSection(B(g), t));
	}
	function tf(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		t?.responsive?.mobile && (Le("review-done"), t.responsive.mobile.attention = null, E.save(), k(), Se());
	}
	function nf(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId), n = t?.blocks.find((t) => t.id === e.blockId);
		n && (Le("block-flag"), typeof e.decor == "boolean" && (n.decor = e.decor), typeof e.hideMobile == "boolean" && (n.hideMobile = e.hideMobile), E.save(), k(), typeof e.hideMobile == "boolean" && B(ae) === "mobile" && D?.sendSection(B(g), t), B(j)?.blockId === e.blockId && Ct());
	}
	function rf(e) {
		Le("add-section"), e.section.id || (e.section.id = mo("sec")), E.data.sections.splice(e.index, 0, e.section), E.save(), k(), D?.sendPage(B(g), E.data), F(sn, e.section.id, !0), mn(e.section), F(st, "properties");
	}
	function af(e) {
		let t = E.data.sections, n = t.findIndex((t) => t.id === e.sectionId), r = n + e.dir;
		n < 0 || r < 0 || r >= t.length || (Le("move-section"), [t[n], t[r]] = [t[r], t[n]], E.save(), k(), D?.sendPage(B(g), E.data));
	}
	function of(e) {
		Le("delete-section"), e.sectionId === B(sn) && (F(sn, null), F(cn, null)), B(j)?.sectionId === e.sectionId && F(j, null), E.data.sections = E.data.sections.filter((t) => t.id !== e.sectionId), E.save(), k(), D?.sendPage(B(g), E.data);
	}
	function sf(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (t) {
			Le("section-size"), t.size = {
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
			e.moves?.length && (Ee(t, "section-height"), B(j)?.sectionId === e.sectionId && Ct()), e.sectionId === B(sn) && F(ln, e.minHeight, !0), E.save(), k();
		}
	}
	function cf(e) {
		let t = E.data.sections.find((t) => t.id === e.fromSectionId), n = E.data.sections.find((t) => t.id === e.toSectionId), r = t?.blocks.find((t) => t.id === e.blockId);
		!t || !n || !r || (Le("move-block"), t.blocks = t.blocks.filter((t) => t.id !== e.blockId), r.frames.desktop = e.frame, r.frames.mobile = null, n.blocks.push(r), Ee(t, "block-moved"), Ee(n, "block-moved"), E.save(), k(), Se(), D?.sendPage(B(g), E.data), B(j)?.blockId === e.blockId && (F(j, {
			...B(j),
			sectionId: e.toSectionId
		}, !0), Ct()));
	}
	function lf(e) {
		let t = E.data.sections.find((t) => t.id === e.sectionId);
		if (!t) return;
		let n = e.blockIds ?? [e.blockId];
		Le("delete-block"), t.blocks = t.blocks.filter((e) => !n.includes(e.id)), n.includes(B(j)?.blockId) && F(j, null), Ee(t, "block-deleted"), E.save(), k(), D?.sendSection(B(g), t);
	}
	let uf = {
		text: {
			type: "text",
			props: {
				html: X("seed.text"),
				align: "left"
			},
			w: 33,
			h: 28
		},
		"text-box": {
			type: "text",
			props: {
				html: X("seed.textBox"),
				align: "left",
				box: !0
			},
			w: 30,
			h: 150
		},
		button: {
			type: "button",
			props: {
				label: X("seed.newButton"),
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
						q: X("seed.faq.q1"),
						a: X("seed.faq.answer")
					},
					{
						q: X("seed.faq.q2"),
						a: X("seed.faq.answer")
					},
					{
						q: X("seed.faq.q3"),
						a: X("seed.faq.answer")
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
						title: X("seed.tidslinje.t1"),
						text: X("seed.tidslinje.text")
					},
					{
						year: "2022",
						title: X("seed.tidslinje.t2"),
						text: X("seed.tidslinje.text")
					},
					{
						year: "2026",
						title: X("seed.tidslinje.t3"),
						text: X("seed.tidslinje.text")
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
				text: X("seed.sitat.text"),
				attribution: X("seed.sitat.name"),
				role: X("seed.sitat.role"),
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
				label: X("seed.statistikk.label"),
				countUp: !0
			},
			w: 20,
			h: 90
		},
		tabell: {
			type: "tabell",
			props: {
				header: !0,
				striped: !1,
				lines: "rows",
				rows: [
					[
						X("seed.tabell.h1"),
						X("seed.tabell.h2"),
						X("seed.tabell.h3")
					],
					[
						X("seed.tabell.r1c1"),
						X("seed.tabell.r1c2"),
						""
					],
					[
						X("seed.tabell.r2c1"),
						X("seed.tabell.r2c2"),
						""
					]
				]
			},
			w: 50,
			h: 160
		},
		deling: {
			type: "deling",
			props: {
				services: [
					"facebook",
					"x",
					"linkedin",
					"whatsapp",
					"email",
					"copy"
				],
				variant: "icons",
				size: 38,
				color: ""
			},
			w: 34,
			h: 48
		},
		nedteller: {
			type: "nedteller",
			props: {
				target: (() => {
					let e = new Date(Date.now() + 2592e6), t = (e) => String(e).padStart(2, "0");
					return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T18:00`;
				})(),
				doneText: X("seed.nedteller.done"),
				variant: "boxes",
				showSeconds: !0
			},
			w: 40,
			h: 110
		},
		audio: {
			type: "audio",
			props: {
				src: "",
				title: "",
				loop: !1
			},
			w: 34,
			h: 80
		}
	};
	function df(e) {
		let t = uf[e];
		return t ? {
			id: mo("blk"),
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
	function ff(e) {
		D ? D.sendPlaceBlock(e) : pf(Er()?.id, e);
	}
	function pf(e, t) {
		let n = E.data.sections.find((t) => t.id === e) ?? E.data.sections[0];
		if (!n) return;
		Le("add-block");
		let r = Math.max(0, ...n.blocks.map((e) => e.frames?.desktop?.z ?? 1)) + 1;
		t.frames?.desktop && (t.frames.desktop = {
			...t.frames.desktop,
			z: r
		}), n.blocks.push(t), Ee(n, "block-added"), E.save(), k(), D?.sendSection(B(g), n);
	}
	function mf(e, t, n, r) {
		let i = E.data.sections.find((t) => t.id === e);
		if (!i || !t?.length) return;
		Le("add-blocks");
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
		}), Ee(i, "block-added"), E.save(), k(), D?.sendSection(B(g), i);
	}
	function hf(e) {
		ff(df(e));
	}
	let gf = /* @__PURE__ */ P(rn([]));
	function _f(e, t = {}) {
		let n = He(e);
		ff({
			id: mo("blk"),
			type: n.type,
			version: n.version ?? 1,
			decor: !1,
			props: {
				...n.defaults ?? {},
				...He(t)
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
	let vf = /* @__PURE__ */ P("");
	function yf() {
		let e = [
			{
				label: X("blocks.text"),
				act: "block",
				kind: "text"
			},
			{
				label: X("ui.textBox"),
				act: "block",
				kind: "text-box"
			},
			{
				label: X("blocks.button"),
				act: "block",
				kind: "button"
			},
			{
				label: X("blocks.image"),
				act: "image"
			},
			{
				label: X("blocks.video"),
				act: "block",
				kind: "video"
			},
			{
				label: X("blocks.icon"),
				act: "block",
				kind: "icon"
			},
			{
				label: X("blocks.samling"),
				act: "block",
				kind: "samling"
			},
			{
				label: X("blocks.faq"),
				act: "block",
				kind: "faq"
			},
			{
				label: X("blocks.tidslinje"),
				act: "block",
				kind: "tidslinje"
			},
			{
				label: X("blocks.sitat"),
				act: "block",
				kind: "sitat"
			},
			{
				label: X("blocks.statistikk"),
				act: "block",
				kind: "statistikk"
			},
			{
				label: X("blocks.tabell"),
				act: "block",
				kind: "tabell"
			},
			{
				label: X("blocks.deling"),
				act: "block",
				kind: "deling"
			},
			{
				label: X("blocks.nedteller"),
				act: "block",
				kind: "nedteller"
			},
			{
				label: X("blocks.audio"),
				act: "block",
				kind: "audio"
			},
			{
				label: X("ui.emptyGallery"),
				act: "block",
				kind: "galleri"
			},
			{
				label: X("ui.galleryWithImages"),
				act: "galleryImages"
			},
			{
				label: X("shape.line"),
				act: "block",
				kind: "shape-line"
			},
			{
				label: X("shape.arrow"),
				act: "block",
				kind: "shape-arrow"
			},
			{
				label: X("shape.circle"),
				act: "block",
				kind: "shape-circle"
			},
			{
				label: X("shape.rect"),
				act: "block",
				kind: "shape-rect"
			},
			{
				label: X("shape.triangle"),
				act: "block",
				kind: "shape-triangle"
			}
		];
		for (let t of B(io)) {
			let n = to[t]?.data?.mal;
			n?.kind === "blocks" && e.push({
				label: n.name,
				act: "mal",
				id: t
			});
		}
		for (let t of B(gf)) if (t.variants?.length) for (let n of t.variants) e.push({
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
	function bf(e) {
		e.act === "block" ? hf(e.kind) : e.act === "plugin" ? _f(e.entry, e.props ?? {}) : e.act === "mal" && D?.sendInsertTemplate(e.id);
	}
	function xf(e) {
		let t = df(e.kind);
		if (t) {
			if (e.at && typeof e.at.x == "number" && typeof e.at.y == "number") {
				let n = E.data.sections.find((t) => t.id === e.sectionId)?.grid ?? B(O).grid, r = gc({
					x: e.at.x,
					y: e.at.y,
					w: t.frames.desktop.w,
					h: t.frames.desktop.h,
					grid: n
				});
				t.frames.desktop.x = r.x, t.frames.desktop.y = r.y;
			} else t.frames.desktop.x = Math.round((100 - t.frames.desktop.w) / 2 * 100) / 100, t.frames.desktop.y = 40;
			pf(e.sectionId, t), D?.sendSelect(t.id), e.kind === "image" && x(X("status.imageBlockAdded")), e.kind === "galleri" && x(X("status.galleryBlockAdded"));
		}
	}
	async function Sf(e) {
		let t = e.target.files?.[0];
		if (e.target.value = "", !t) return;
		x(X("status.compressingImage"));
		let n;
		try {
			n = await qn(t);
		} catch {
			x(X("status.imageReadError"), "error");
			return;
		}
		let r = Math.round(n.height / n.width * .3 * (B(w)?.clientWidth ?? 1280));
		ff({
			id: mo("blk"),
			type: "image",
			version: 1,
			props: {
				src: n.dataUrl,
				alt: ga(t.name).replaceAll("-", " "),
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
		}), n.bytes > 4e5 ? x(X("status.imageLarge", { kb: Math.round(n.bytes / 1024) }), "error") : x("");
	}
	async function Cf(e) {
		let t = [], n = 0, r = 0;
		for (let i of e) try {
			let e = await qn(i);
			e.bytes > 4e5 && (r += 1), t.push({
				src: e.dataUrl,
				alt: ga(i.name).replaceAll("-", " "),
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
	function wf(e, t, n) {
		t ? x(X("status.imagesReadFailed", { n: t }), "error") : n ? x(X("status.imagesLarge", { n }), "error") : x(e ? "" : X("status.noImagesAdded"));
	}
	async function Tf(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(X("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Cf(t);
		n.length && At("galleri-add", (e) => {
			e.props.images.push(...n);
		}), wf(n.length, r, i);
	}
	async function Ef(e) {
		let t = [...e.target.files ?? []];
		if (e.target.value = "", !t.length) return;
		x(X("status.compressingImages"));
		let { images: n, failed: r, big: i } = await Cf(t);
		if (!n.length) {
			wf(0, r, i);
			return;
		}
		let a = df("galleri");
		a.props.images = n, ff(a), wf(n.length, r, i);
	}
	function Df(e, t) {
		At("galleri-move", (n) => {
			let r = e + t;
			r < 0 || r >= n.props.images.length || ([n.props.images[e], n.props.images[r]] = [n.props.images[r], n.props.images[e]]);
		});
	}
	function Of(e) {
		At("galleri-remove", (t) => {
			t.props.images.splice(e, 1);
		});
	}
	function kf(e, t, n) {
		At(`edit:${B(j).blockId}:img${e}-${t}`, (r) => {
			r.props.images[e][t] = n;
		});
	}
	function Af(e, t, n, r) {
		let i = e?.[t];
		if (!i?.startsWith("data:image/") && !i?.startsWith("data:audio/")) return;
		let a = i.split(",", 2)[1], o = `media/${ga(n || "bilde")}-${_a(a)}.${ha(i)}`;
		r.push({
			path: o,
			content: a,
			encoding: "base64"
		}), e[t] = `/${o}`;
	}
	function jf(e, t) {
		for (let n of e?.layers ?? []) if (n.type === "image" && Af(n.props, "src", "bakgrunn", t), n.type === "bildegalleri") for (let e of n.props.images ?? []) Af(e, "src", "bakgrunn", t);
	}
	function Mf(e, t) {
		if (e.type === "image" && Af(e.props, "src", e.props.alt, t), e.type === "icon" && Af(e.props, "image", "ikon", t), e.type === "galleri") for (let n of e.props.images ?? []) Af(n, "src", n.alt || "galleri", t);
		e.type === "audio" && Af(e.props, "src", e.props.title || "lyd", t);
	}
	function Nf(e, t) {
		jf(e.background, t);
		for (let n of e.blocks) Mf(n, t);
	}
	function Pf(e) {
		let t = [];
		for (let n of e.sections) Nf(n, t);
		return t;
	}
	function Ff(e) {
		let t = [], n = e.nav?.logo;
		return n?.type === "image" && Af(n, "value", "logo", t), n?.type === "both" && Af(n, "image", "logo", t), e.nav?.style && Af(e.nav.style, "image", "meny", t), jf(e.nav?.style?.background, t), jf(e.footer?.background, t), e.footer?.brand && Af(e.footer.brand, "logo", "footer-logo", t), Af(e.site, "icon", "ikon", t), t;
	}
	let If = /* @__PURE__ */ P(!1), Lf = /* @__PURE__ */ P(null);
	function Rf() {
		F(If, !B(If));
	}
	function zf() {
		F(If, !1), Bf();
	}
	Sn(() => {
		if (!B(If)) return;
		let e = (e) => {
			B(Lf)?.contains(e.target) || F(If, !1);
		}, t = (e) => {
			e.key === "Escape" && F(If, !1);
		}, n = () => F(If, !1);
		return window.addEventListener("click", e, !0), window.addEventListener("keydown", t, !0), window.addEventListener("blur", n), () => {
			window.removeEventListener("click", e, !0), window.removeEventListener("keydown", t, !0), window.removeEventListener("blur", n);
		};
	});
	function Bf() {
		Le("discard");
		for (let e of B(O).pages) e.id !== B(g) && !Ae.has(e.id) && localStorage.removeItem(`urd-draft-${e.id}`);
		let e = E.reset();
		if (De.reset(), ko && (ko.reset(), Wo()), ja) {
			ja.reset(), F(Fa, [...ja.data.samlinger ?? []], !0);
			for (let e of Object.keys(Ma)) B(Fa).includes(e) ? Ma[e].reset() : delete Ma[e];
			vo();
		}
		if ($a) {
			$a.reset(), F(io, [...$a.data.maler ?? []], !0);
			for (let e of Object.keys(to)) B(io).includes(e) ? to[e].reset() : (localStorage.removeItem(`urd-draft-mal-${e}`), delete to[e]);
			co();
		}
		Oe(), F(ee, {
			snap: !0,
			...B(O).grid
		}, !0), k(), F(v, ""), ke(), B(O).pages.some((e) => e.id === B(g)) ? D?.sendPage(B(g), e) : ei(B(O).pages[0].id);
	}
	async function Vf() {
		if (zr) {
			x(X("status.revertReloadBeforePublish"), "error");
			return;
		}
		if (B(Kr)) {
			x(X("update.publishBlocked"), "error");
			return;
		}
		x(X("status.publishing"));
		let e = [], t = [], n = [], r = [];
		for (let i of B(O).pages) {
			let a = `urd-draft-${i.id}`, o = Ae.has(i.id) || !B(m).pages.some((e) => e.id === i.id), s = null;
			if (i.id === B(g) && (E.hasDraft() || o)) s = E.data;
			else if (i.id !== B(g)) {
				let e = localStorage.getItem(a);
				if (e) try {
					s = so(JSON.parse(e), De.data);
				} catch {}
			}
			if (!s && o && (s = $r(i)), !s) continue;
			let c = JSON.parse(JSON.stringify(s));
			e.push(...Pf(c)), e.push({
				path: i.file,
				content: JSON.stringify(c, null, 2) + "\n",
				encoding: "utf-8"
			}), t.push(i.title), o ? r.push(i.id) : n.push(a);
		}
		if (De.hasDraft()) {
			let r = JSON.parse(JSON.stringify(B(O)));
			e.push(...Ff(r)), e.push({
				path: "content/site.json",
				content: JSON.stringify(r, null, 2) + "\n",
				encoding: "utf-8"
			}), e.push({
				path: "content/theme.css",
				content: ms(r.theme),
				encoding: "utf-8"
			}), n.push("urd-draft-site");
			let i = (e, t) => JSON.stringify(e ?? null) === JSON.stringify(t ?? null);
			i(B(m).theme, B(O).theme) || t.push("tema"), i(B(m).nav, B(O).nav) || t.push("menyen"), i(B(m).footer, B(O).footer) || t.push("footeren"), i(B(m).pages, B(O).pages) || t.push("sideregisteret"), i(B(m).grid, B(O).grid) || t.push("gridet"), (B(m).site.icon ?? null) !== (B(O).site.icon ?? null) && t.push("nettstedsikonet");
			let { icon: a, ...o } = B(m).site, { icon: s, ...c } = B(O).site;
			i(o, c) || t.push("nettstedsinfo");
		}
		let i = Object.entries(Ma).filter(([, e]) => e.hasDraft());
		if (i.length || ja?.hasDraft()) {
			for (let [t, r] of i) {
				let i = JSON.parse(JSON.stringify(r.data));
				for (let t of i.entries) Af(t, "image", t.title, e);
				e.push({
					path: `content/samlinger/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-samling-${t}`);
			}
			if (ja?.hasDraft()) {
				e.push({
					path: "content/samlinger.json",
					content: JSON.stringify(ja.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-samlinger");
				let t = { samlinger: [] };
				try {
					t = await (await fetch("/content/samlinger.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.samlinger ?? []) {
					let t = `content/samlinger/${n}.json`;
					!B(Fa).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("samlinger");
		}
		let a = Object.entries(to).filter(([, e]) => e.hasDraft());
		if (a.length || $a?.hasDraft()) {
			for (let [t, r] of a) {
				let i = JSON.parse(JSON.stringify(r.data));
				i.section && Nf(i.section, e);
				for (let t of i.blocks ?? []) Mf(t, e);
				for (let t of i.page?.sections ?? []) Nf(t, e);
				e.push({
					path: `content/maler/${t}.json`,
					content: JSON.stringify(i, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push(`urd-draft-mal-${t}`);
			}
			if ($a?.hasDraft()) {
				e.push({
					path: "content/maler.json",
					content: JSON.stringify($a.data, null, 2) + "\n",
					encoding: "utf-8"
				}), n.push("urd-draft-maler");
				let t = { maler: [] };
				try {
					t = await (await fetch("/content/maler.json")).json();
				} catch {}
				let r = new Set(e.map((e) => e.path));
				for (let n of t.maler ?? []) {
					let t = `content/maler/${n}.json`;
					!B(io).includes(n) && !r.has(t) && e.push({
						path: t,
						delete: !0
					});
				}
			}
			t.push("maler");
		}
		ko?.hasDraft() && (e.push({
			path: "plugins/plugins.json",
			content: JSON.stringify(ko.data, null, 2) + "\n",
			encoding: "utf-8"
		}), n.push("urd-draft-plugins"), t.push("plugins"));
		try {
			let t = await (await fetch("/index.html")).text();
			for (let n of B(O).pages) n.path !== "/" && e.push({
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
		for (let e of B(m).pages) {
			let t = B(O).pages.find((t) => t.id === e.id);
			t ? t.path !== e.path && e.path !== "/" && s(`${e.path.slice(1)}/index.html`) : (s(e.file), e.path !== "/" && s(`${e.path.slice(1)}/index.html`));
		}
		let c = await Mr(e);
		if (!c.ok) {
			x(X("status.publishAborted"), "error");
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
			e ? jr = e : H(), Pf(E.data), Ff(B(O));
			for (let e of n) localStorage.removeItem(e);
			for (let e of r) Ae.add(e);
			if (F(m, JSON.parse(JSON.stringify(B(O))), !0), De = qi("urd-draft-site", () => B(m), S), Oe(), ko) {
				let e = JSON.parse(JSON.stringify(ko.data));
				ko = qi("urd-draft-plugins", () => e, S), Wo();
			}
			if (ja) {
				for (let e of Object.values(Ma)) for (let t of e.data.entries) Af(t, "image", t.title, []);
				let e = JSON.parse(JSON.stringify(ja.data));
				ja = qi("urd-draft-samlinger", () => e, S), Na = {};
				for (let e of B(Fa)) {
					if (!Ma[e]) continue;
					let t = JSON.parse(JSON.stringify(Ma[e].data));
					Na[e] = t, Ma[e] = qi(`urd-draft-samling-${e}`, () => t, S);
				}
				vo();
			}
			if ($a) {
				for (let e of Object.values(to)) {
					e.data?.section && Nf(e.data.section, []);
					for (let t of e.data?.blocks ?? []) Mf(t, []);
					for (let t of e.data?.page?.sections ?? []) Nf(t, []);
				}
				let e = JSON.parse(JSON.stringify($a.data));
				$a = qi("urd-draft-maler", () => e, S), no = {};
				for (let e of B(io)) {
					if (!to[e]) continue;
					let t = JSON.parse(JSON.stringify(to[e].data));
					no[e] = t, to[e] = qi(`urd-draft-mal-${e}`, () => t, S);
				}
				co();
			}
			F(ee, {
				snap: !0,
				...B(O).grid
			}, !0);
			let t = JSON.parse(JSON.stringify(E.data));
			E = qi(`urd-draft-${B(g)}`, () => t, S), Ae.has(B(g)) && C(`urd-draft-${B(g)}`, JSON.stringify(t)), k(), x(X("status.published"), "ok");
		} else if (u?.status === 401) {
			let e = await u.json().catch(() => null);
			x(e?.code === "loginExpired" ? X("status.loginExpired") : X("status.loginRequired", { reason: zi(e) ?? X("status.unknownReason") }), "error"), await Ar();
		} else u?.status === 403 ? x(zi(await u.json().catch(() => null)) ?? X("status.noPublishAccess"), "error") : u?.status === 409 ? x(X("status.publishRace"), "error") : x(u ? zi(await u.json().catch(() => null)) ?? X("status.publishFailed") : X("status.publishUnavailable"), "error");
	}
	Ye();
	var Hf = jd();
	wr("keydown", an, Je), wr("pointerdown", an, Ge);
	var Uf = L(Hf), Wf = I(Uf), Gf = (e) => {
		var t = jl(), n = I(t);
		K(n, () => c.pencil);
		var r = R(n);
		A(t), z((e, n) => {
			Y(t, "title", e), W(r, ` ${n ?? ""}`);
		}, [() => X("tip.backToEdit"), () => X("ui.edit")]), V("click", t, Yd), U(e, t);
	};
	G(Wf, (e) => {
		B(te) || e(Gf);
	});
	var Kf = R(Wf, 2);
	let qf;
	var Jf = I(Kf), Yf = I(Jf), Xf = (e) => {
		var t = Hl(), n = L(t), r = I(n, !0);
		A(n);
		var i = R(n, 2), a = I(i), o = (e) => {
			var t = Pl(), n = I(t);
			let r;
			var i = I(n);
			K(i, () => c[`device_${B(re)}`]), K(R(i), () => c.caret), A(n);
			var a = R(n, 2), o = (e) => {
				var t = Nl();
				Wr(t, 21, () => ne, (e) => e.id, (e, t) => {
					var n = Ml();
					let r;
					var i = I(n);
					K(i, () => c[`device_${B(t).id}`]);
					var a = R(i);
					A(n), z((e, i) => {
						r = di(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(re) === B(t).id }), Y(n, "title", e), W(a, ` ${i ?? ""}`);
					}, [() => X(`tip.view.${B(t).id}`, {
						w: B(t).width ?? B(fe),
						c: Ja(B(Xi), B(Zi), B(t).width ?? B(fe)).width
					}), () => X(`lbl.device.${B(t).id}`)]), V("click", n, () => {
						F(re, B(t).id, !0), F(ui, null);
					}), U(e, n);
				}), A(t), U(e, t);
			};
			G(a, (e) => {
				B(ui) === "device" && e(o);
			}), A(t), z((e) => {
				r = di(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(ui) === "device" }), Y(n, "title", e);
			}, [() => X("lbl.group.device")]), V("click", n, () => F(ui, B(ui) === "device" ? null : "device", !0)), U(e, t);
		}, s = (e) => {
			var t = Il(), n = L(t), r = I(n, !0);
			A(n);
			var i = R(n, 2);
			Wr(i, 21, () => ne, (e) => e.id, (e, t) => {
				var n = Fl();
				let r;
				K(n, () => c[`device_${B(t).id}`], !0), A(n), z((e) => {
					r = di(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(re) === B(t).id }), Y(n, "title", e);
				}, [() => X(`tip.view.${B(t).id}`, {
					w: B(t).width ?? B(fe),
					c: Ja(B(Xi), B(Zi), B(t).width ?? B(fe)).width
				})]), V("click", n, () => F(re, B(t).id, !0)), U(e, n);
			}), A(i), z((e) => W(r, e), [() => X("lbl.group.device")]), U(e, t);
		};
		G(a, (e) => {
			mi.device ? e(o) : e(s, -1);
		});
		var l = R(a, 2), u = (e) => {
			var t = Rl(), n = I(t);
			let r;
			var i = I(n), a = I(i);
			A(i), K(R(i), () => c.caret), A(n);
			var o = R(n, 2), s = (e) => {
				var t = Ll(), n = I(t), r = I(n);
				K(r, () => c.minus, !0), A(r);
				var i = R(r, 2), a = I(i);
				A(i);
				var o = R(i, 2);
				K(o, () => c.plus, !0), A(o), A(n);
				var s = R(n, 2);
				let l;
				var u = I(s);
				K(u, () => c.fit);
				var d = R(u);
				A(s), A(t), z((e, t, n, c, u, f) => {
					Y(r, "title", e), Y(i, "title", t), W(a, `${n ?? ""}%`), Y(o, "title", c), l = di(s, 1, "ghost svelte-1n46o8q", null, l, { active: B(ue) === "fit" }), Y(s, "title", u), W(d, ` ${f ?? ""}`);
				}, [
					() => X("tip.zoomOut"),
					() => X("tip.zoomCurrent"),
					() => Math.round(B(he) * 100),
					() => X("tip.zoomIn"),
					() => X("tip.zoomFit"),
					() => X("lbl.zoom.fit")
				]), V("click", r, () => ge(-1)), V("click", o, () => ge(1)), V("click", s, () => F(ue, "fit")), U(e, t);
			};
			G(o, (e) => {
				B(ui) === "zoom" && e(s);
			}), A(t), z((e, t) => {
				r = di(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(ui) === "zoom" }), Y(n, "title", e), W(a, `${t ?? ""}%`);
			}, [() => X("lbl.group.zoom"), () => Math.round(B(he) * 100)]), V("click", n, () => F(ui, B(ui) === "zoom" ? null : "zoom", !0)), U(e, t);
		}, d = (e) => {
			var t = zl(), n = L(t), r = I(n, !0);
			A(n);
			var i = R(n, 2), a = I(i);
			K(a, () => c.minus, !0), A(a);
			var o = R(a, 2), s = I(o);
			A(o);
			var l = R(o, 2);
			K(l, () => c.plus, !0), A(l);
			var u = R(l, 2);
			let d;
			K(u, () => c.fit, !0), A(u), A(i), z((e, t, n, i, c, f) => {
				W(r, e), Y(a, "title", t), Y(o, "title", n), W(s, `${i ?? ""}%`), Y(l, "title", c), d = di(u, 1, "ghost svelte-1n46o8q", null, d, { active: B(ue) === "fit" }), Y(u, "title", f);
			}, [
				() => X("lbl.group.zoom"),
				() => X("tip.zoomOut"),
				() => X("tip.zoomCurrent"),
				() => Math.round(B(he) * 100),
				() => X("tip.zoomIn"),
				() => X("tip.zoomFit")
			]), V("click", a, () => ge(-1)), V("click", l, () => ge(1)), V("click", u, () => F(ue, "fit")), U(e, t);
		};
		G(l, (e) => {
			mi.zoom ? e(u) : e(d, -1);
		});
		var f = R(l, 2), p = (e) => {
			var t = Pl(), n = I(t);
			let r;
			var i = I(n);
			K(i, () => c.gridToggle), K(R(i), () => c.caret), A(n);
			var a = R(n, 2), o = (e) => {
				var t = Bl(), n = I(t);
				let r;
				var i = I(n);
				K(i, () => c.gridToggle);
				var a = R(i);
				A(n);
				var o = R(n, 2);
				let s;
				var l = I(o);
				K(l, () => c.guides);
				var u = R(l);
				A(o), A(t), z((e, t, i, c) => {
					r = di(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(gi) }), Y(n, "title", e), W(a, ` ${t ?? ""}`), s = di(o, 1, "ghost svelte-1n46o8q", null, s, { active: B(ri) }), Y(o, "title", i), W(u, ` ${c ?? ""}`);
				}, [
					() => X("tip.gridToggle"),
					() => X("lbl.view.grid"),
					() => X("tip.guides"),
					() => X("lbl.view.guides")
				]), V("click", n, _i), V("click", o, hi), U(e, t);
			};
			G(a, (e) => {
				B(ui) === "view" && e(o);
			}), A(t), z((e) => {
				r = di(n, 1, "ghost svelte-1n46o8q", null, r, { active: B(ui) === "view" || B(gi) || B(ri) }), Y(n, "title", e);
			}, [() => X("lbl.group.view")]), V("click", n, () => F(ui, B(ui) === "view" ? null : "view", !0)), U(e, t);
		}, m = (e) => {
			var t = Vl(), n = L(t), r = I(n, !0);
			A(n);
			var i = R(n, 2), a = I(i);
			let o;
			K(a, () => c.gridToggle, !0), A(a);
			var s = R(a, 2);
			let l;
			K(s, () => c.guides, !0), A(s), A(i), z((e, t, n) => {
				W(r, e), o = di(a, 1, "ghost svelte-1n46o8q", null, o, { active: B(gi) }), Y(a, "title", t), l = di(s, 1, "ghost svelte-1n46o8q", null, l, { active: B(ri) }), Y(s, "title", n);
			}, [
				() => X("lbl.group.view"),
				() => X("tip.gridToggle"),
				() => X("tip.guides")
			]), V("click", a, _i), V("click", s, hi), U(e, t);
		};
		G(f, (e) => {
			mi.view ? e(p) : e(m, -1);
		}), A(i), Ei(i, (e) => F(fi, e), () => B(fi)), z((e, t) => {
			Y(n, "title", e), W(r, t);
		}, [() => X("tip.switchPage"), () => je()?.title ?? ""]), V("click", n, () => xt("pages")), U(e, t);
	};
	G(Yf, (e) => {
		B(m) && e(Xf);
	});
	var Zf = R(Yf, 2), Qf = (e) => {
		var t = Ul(), n = I(t);
		K(n, () => c.phone);
		var r = R(n, 2), i = I(r, !0);
		A(r);
		var a = R(r, 2), o = I(a, !0);
		A(a), A(t), z((e, n) => {
			Y(t, "title", e), W(i, n), W(o, B(xe));
		}, [() => X("tip.attention"), () => X(B(xe) === 1 ? "ui.attentionOne" : "ui.attentionMany", { n: B(xe) })]), V("click", t, Ce), U(e, t);
	};
	G(Zf, (e) => {
		B(xe) > 0 && e(Qf);
	}), A(Jf);
	var $f = R(Jf, 2), ep = I($f), tp = (e) => {
		var t = Gl(), n = I(t), r = I(n), i = I(r, !0);
		A(r), Fe(2), A(n);
		var a = R(n, 2), o = I(a);
		let s;
		var l = I(o);
		K(l, () => c.restore);
		var u = R(l), d = I(u, !0);
		A(u), A(o);
		var f = R(o, 2), p = (e) => {
			var t = Wl(), n = I(t);
			K(n, () => c.restore);
			var r = R(n);
			A(t), z((e, n) => {
				Y(t, "title", e), W(r, ` ${n ?? ""}`);
			}, [() => X("tip.discardArmed"), () => X("ui.discardConfirm")]), V("click", t, zf), U(e, t);
		};
		G(f, (e) => {
			B(If) && e(p);
		}), A(a), Ei(a, (e) => F(Lf, e), () => B(Lf)), A(t), z((e, t, r, a, c) => {
			Y(n, "title", e), Y(n, "aria-label", t), W(i, r), s = di(o, 1, "discard-dot svelte-1n46o8q", null, s, { armed: B(If) }), Y(o, "title", a), W(d, c);
		}, [
			() => X("ui.unpublished"),
			() => X("ui.unpublished"),
			() => X("ui.unpublished"),
			() => B(If) ? X("tip.discardArmed") : X("tip.discard"),
			() => X("ui.discard")
		]), V("click", o, Rf), ii(2, t, () => Ki, () => ({
			x: 24,
			duration: Et ? 0 : 150
		})), U(e, t);
	};
	G(ep, (e) => {
		B(_) && e(tp);
	}), A($f);
	var np = R($f, 2), rp = I(np), ip = (e) => {
		var t = Yl(), n = L(t), r = I(n), i = (e) => {
			var t = Kl(), n = L(t);
			K(n, () => c.eye);
			var r = R(n, 2), i = I(r, !0);
			A(r), z((e) => W(i, e), [() => X("ui.cleanView")]), U(e, t);
		}, a = (e) => {
			var t = Kl(), n = L(t);
			K(n, () => c.pencil);
			var r = R(n, 2), i = I(r, !0);
			A(r), z((e) => W(i, e), [() => X("ui.edit")]), U(e, t);
		};
		G(r, (e) => {
			B(te) ? e(i) : e(a, -1);
		}), A(n);
		var o = R(n, 2), s = (e) => {
			var t = ql(), n = I(t), r = (e) => {
				var t = Nr();
				K(L(t), () => c.warn), U(e, t);
			};
			G(n, (e) => {
				B(T).allowed || e(r);
			});
			var i = R(n, 1, !0);
			A(t), z((e) => {
				Y(t, "title", e), W(i, B(T).login);
			}, [() => B(T).allowed ? X("tip.hasPublishAccess") : X("tip.noPublishAccess")]), U(e, t);
		}, l = (e) => {
			var t = Jl(), n = I(t, !0);
			A(t), z((e) => W(n, e), [() => X("ui.loginGitHub")]), U(e, t);
		};
		G(o, (e) => {
			B(T)?.loggedIn ? e(s) : B(T) && e(l, 1);
		});
		var u = R(o, 2), d = I(u);
		K(d, () => c.external);
		var f = R(d, 2), p = I(f, !0);
		A(f), A(u);
		var m = R(u, 2), h = I(m, !0);
		A(m), z((e, t, r, i, a) => {
			Y(n, "title", e), Y(u, "href", t), Y(u, "title", r), W(p, i), m.disabled = !B(_), W(h, a);
		}, [
			() => B(te) ? X("tip.chromeHide") : X("tip.chromeShow"),
			() => je()?.path ?? "/",
			() => X("ui.viewSite"),
			() => X("ui.viewSite"),
			() => X("ui.publish")
		]), V("click", n, Yd), V("click", m, Vf), U(e, t);
	};
	G(rp, (e) => {
		B(m) && e(ip);
	}), A(np), A(Kf);
	var ap = R(Kf, 2), op = (e) => {
		var t = wd(), i = I(t), o = (e) => {
			var t = Cd(), i = L(t), o = I(i);
			Wr(o, 17, () => ut, Br, (e, t, n) => {
				var r = Zl(), i = L(r), a = I(i, !0);
				A(i), Wr(R(i, 2), 16, () => B(t), (e) => e, (e, t) => {
					var n = Xl();
					let r;
					var i = I(n, !0);
					A(n), z(() => {
						r = di(n, 1, "svelte-1n46o8q", null, r, { active: B(st) === t }), W(i, ft[t]);
					}), V("click", n, () => xt(t)), U(e, n);
				}), z((e) => W(a, e), [() => X(dt[n])]), U(e, r);
			});
			var s = R(o, 2), d = R(I(s), 2);
			let p;
			K(d, () => c.gear, !0), A(d);
			var m = R(d, 2), _ = (e) => {
				var t = Ql(), n = I(t), r = I(n, !0);
				A(n);
				var i = R(n, 2), a = I(i);
				Z(R(a), {
					get value() {
						return B(u);
					},
					get options() {
						return l;
					},
					onchange: (e) => F(u, e, !0)
				}), A(i);
				var o = R(i, 2), s = I(o), c = R(s);
				{
					let e = /* @__PURE__ */ M(() => [["auto", X("lang.auto")], ..._t()]);
					Z(c, {
						get value() {
							return yt;
						},
						get options() {
							return B(e);
						},
						onchange: bt
					});
				}
				A(o);
				var d = R(o, 2), f = I(d), p = R(f);
				{
					let e = /* @__PURE__ */ M(() => [["strip", X("settings.layoutPickerStrip")], ["menu", X("settings.layoutPickerMenu")]]);
					Z(p, {
						get value() {
							return B(oi);
						},
						get options() {
							return B(e);
						},
						onchange: si
					});
				}
				A(d), A(t), z((e, t, n, c, l, u, p) => {
					W(r, e), Y(i, "title", t), W(a, `${n ?? ""} `), Y(o, "title", c), W(s, `${l ?? ""} `), Y(d, "title", u), W(f, `${p ?? ""} `);
				}, [
					() => X("settings.title"),
					() => X("topbar.adminTheme.title"),
					() => X("settings.theme"),
					() => X("topbar.language.title"),
					() => X("settings.language"),
					() => X("tip.settings.layoutPicker"),
					() => X("settings.layoutPicker")
				]), U(e, t);
			};
			G(m, (e) => {
				B(ai) && e(_);
			}), A(s), Ei(s, (e) => F(ci, e), () => B(ci)), A(i);
			var v = R(i, 2), y = (e) => {
				var t = Sd(), i = I(t), o = I(i, !0);
				A(i);
				var s = R(i, 2), l = (e) => {
					var t = su(), n = I(t);
					Wr(n, 17, () => B(O).pages, (e) => e.id, (e, t) => {
						var n = ru();
						let r;
						var i = I(n);
						q(i);
						var a = R(i, 2), o = (e) => {
							var t = $l();
							z((e) => Y(t, "title", e), [() => X("tip.pages.homeLocked")]), U(e, t);
						}, s = (e) => {
							var n = eu();
							q(n), z((e, t) => {
								J(n, e), Y(n, "title", t);
							}, [() => B(t).path.slice(1), () => X("tip.pages.slug")]), V("change", n, (e) => Fi(B(t), e.target.value)), U(e, n);
						};
						G(a, (e) => {
							B(t).path === "/" ? e(o) : e(s, -1);
						});
						var l = R(a, 2), u = I(l);
						K(u, () => c.right, !0), A(u);
						var d = R(u, 2), f = I(d);
						K(f, () => c.kebab, !0), A(f);
						var p = R(f, 2), m = (e) => {
							var n = nu(), r = I(n), i = I(r);
							K(i, () => c.bookmark);
							var a = R(i);
							A(r);
							var o = R(r, 2), s = (e) => {
								var n = tu(), r = I(n);
								K(r, () => c.cross);
								var i = R(r);
								A(n), z((e, t) => {
									Y(n, "title", e), W(i, ` ${t ?? ""}`);
								}, [() => X("tip.pages.delete"), () => X("ui.deletePage")]), V("click", n, () => {
									F(Di, null), Ii(B(t));
								}), U(e, n);
							};
							G(o, (e) => {
								B(t).path !== "/" && e(s);
							}), A(n), z((e) => W(a, ` ${e ?? ""}`), [() => X("ui.savePageTemplate")]), V("click", r, () => ji(B(t))), U(e, n);
						};
						G(p, (e) => {
							B(Di) === B(t).id && e(m);
						}), A(d), A(l), A(n), z((e, a, o) => {
							r = di(n, 1, "page-row svelte-1n46o8q", null, r, { current: B(t).id === B(g) }), J(i, B(t).title), Y(i, "title", e), Y(u, "title", a), u.disabled = B(t).id === B(g), Y(f, "title", o);
						}, [
							() => X("tip.pages.title"),
							() => X("tip.pages.open"),
							() => X("tip.pages.menu")
						]), V("change", i, (e) => Mi(B(t), e.target.value)), V("click", u, () => ei(B(t).id)), V("click", f, () => F(Di, B(Di) === B(t).id ? null : B(t).id, !0)), U(e, n);
					});
					var r = R(n, 4);
					q(r);
					var i = R(r, 2), a = I(i, !0);
					A(i);
					var o = R(i, 2), s = I(o, !0);
					A(o);
					var l = R(o, 2), u = I(l);
					let d;
					var f = I(u), p = I(f);
					K(p, () => is({ sections: [] }), !0), A(p);
					var m = R(p, 2), h = I(m, !0);
					A(m), A(f), A(u), Wr(R(u, 2), 17, () => os, (e) => e.id, (e, t) => {
						var n = iu();
						let r;
						var i = I(n), a = I(i);
						K(a, () => wi[B(t).id], !0), A(a);
						var o = R(a, 2), s = I(o, !0);
						A(o), A(i), A(n), z((e, a) => {
							r = di(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: B(Ci) === `preset:${B(t).id}` }), Y(i, "title", e), W(s, a);
						}, [() => X("tip.pages.templatePick", { name: X(B(t).labelKey) }), () => X(B(t).labelKey)]), V("click", i, () => F(Ci, B(Ci) === `preset:${B(t).id}` ? null : `preset:${B(t).id}`, !0)), U(e, n);
					}), A(l);
					var _ = R(l, 2), v = (e) => {
						var t = ou(), n = L(t), r = I(n, !0);
						A(n);
						var i = R(n, 2);
						Wr(i, 20, () => B(io).filter((e) => to[e]?.data?.mal?.kind === "page"), (e) => e, (e, t) => {
							var n = au();
							let r;
							var i = I(n), a = I(i);
							K(a, () => is(to[t].data.page), !0), A(a);
							var o = R(a, 2), s = I(o, !0);
							A(o), A(i);
							var l = R(i, 2);
							K(l, () => c.cross, !0), A(l), A(n), z((e, a) => {
								r = di(n, 1, "page-mal-card svelte-1n46o8q", null, r, { picked: B(Ci) === t }), Y(i, "title", e), W(s, to[t].data.mal.name), Y(l, "title", a);
							}, [() => X("tip.pages.templatePick", { name: to[t].data.mal.name }), () => X("canvas.deleteTemplate")]), V("click", i, () => F(Ci, B(Ci) === t ? null : t, !0)), V("click", l, () => go({ id: t })), U(e, n);
						}), A(i), z((e) => {
							W(r, e), pi(i, B(Ti));
						}, [() => X("canvas.tabMyTemplates")]), U(e, t);
					}, y = /* @__PURE__ */ M(() => B(io).some((e) => to[e]?.data?.mal?.kind === "page"));
					G(_, (e) => {
						B(y) && e(v);
					}), A(t), z((e, t, n, o, c, p, m) => {
						Y(r, "placeholder", e), Y(i, "title", t), i.disabled = n, W(a, o), W(s, c), pi(l, B(Ti)), d = di(u, 1, "page-mal-card svelte-1n46o8q", null, d, { picked: B(Ci) === null }), Y(f, "title", p), W(h, m);
					}, [
						() => X("ph.newPageName"),
						() => X("hint.pages.autoMenu"),
						() => !B(xi).trim(),
						() => X("ui.createPage"),
						() => X("canvas.tabPresets"),
						() => X("tip.pages.blankPick"),
						() => X("ui.blankPage")
					]), V("keydown", r, (e) => e.key === "Enter" && Ai()), Si(r, () => B(xi), (e) => F(xi, e)), V("click", i, Ai), V("click", f, () => F(Ci, null)), U(e, t);
				}, u = (e) => {
					var t = mu(), r = I(t), i = I(r), a = I(i, !0);
					A(i);
					var o = R(i, 2), s = I(o), l = I(s), u = R(l);
					{
						let e = /* @__PURE__ */ M(() => B(O).nav.logo?.type ?? "text"), t = /* @__PURE__ */ M(() => [
							["text", X("blocks.text")],
							["image", X("blocks.image")],
							["both", X("opt.logo.both")]
						]);
						Z(u, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Ri(e)
						});
					}
					A(s);
					var d = R(s, 2), f = (e) => {
						var t = cu(), n = L(t);
						q(n);
						var r = R(n, 2), i = I(r);
						{
							let e = /* @__PURE__ */ M(() => X("tip.nav.logoFont")), t = /* @__PURE__ */ M(() => B(O).nav.logo?.font ?? ""), n = /* @__PURE__ */ M(() => [["", X("common.inherit")], ...hc.map(([e, t]) => [t, X(e)])]);
							Z(i, {
								get title() {
									return B(e);
								},
								get value() {
									return B(t);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => Li({ font: e || void 0 })
							});
						}
						var a = R(i, 2);
						q(a);
						var o = R(a, 2);
						let s;
						var c = I(o), l = I(c, !0);
						A(c), A(o);
						var u = R(o, 2);
						let d;
						var f = I(u), p = I(f, !0);
						A(f), A(u), A(r), z((e, t, r, i, c, f, m) => {
							J(n, B(O).nav.logo?.value ?? ""), Y(n, "placeholder", e), Y(a, "title", t), J(a, B(O).nav.logo?.textSize ?? ""), s = di(o, 1, "tbtn svelte-1n46o8q", null, s, { active: B(O).nav.logo?.bold !== !1 }), Y(o, "title", r), W(l, i), d = di(u, 1, "tbtn svelte-1n46o8q", null, d, c), Y(u, "title", f), W(p, m);
						}, [
							() => X("ph.nav.logoName"),
							() => X("tip.nav.textSize"),
							() => X("format.bold"),
							() => X("format.boldLetter"),
							() => ({ active: !!B(O).nav.logo?.italic }),
							() => X("format.italic"),
							() => X("format.italicLetter")
						]), V("input", n, (e) => Li({ value: e.target.value })), V("change", a, (e) => Li({ textSize: e.target.value ? Number(e.target.value) : void 0 })), V("click", o, () => Li({ bold: B(O).nav.logo?.bold === !1 })), V("click", u, () => Li({ italic: !B(O).nav.logo?.italic })), U(e, t);
					};
					G(d, (e) => {
						(B(O).nav.logo?.type ?? "text") !== "image" && e(f);
					});
					var p = R(d, 2), m = (e) => {
						var t = lu(), n = I(t), r = I(n), i = R(r);
						A(n);
						var a = R(n, 2);
						q(a);
						var o = R(a, 2);
						q(o), A(t), z((e, t, i, s) => {
							Y(n, "title", e), W(r, `${t ?? ""} `), Y(a, "title", i), J(a, B(O).nav.logo?.size ?? 32), Y(o, "title", s), J(o, B(O).nav.logo?.radius ?? 0);
						}, [
							() => X("tip.webpAuto"),
							() => (B(O).nav.logo?.type === "image" ? B(O).nav.logo?.value : B(O).nav.logo?.image) ? X("ui.changeImage") : X("ui.chooseImage"),
							() => X("tip.nav.logoHeight"),
							() => X("tip.nav.logoRadius")
						]), V("change", i, Vi), V("change", a, (e) => Li({ size: Number(e.target.value) })), V("change", o, (e) => Li({ radius: Number(e.target.value) })), U(e, t);
					};
					G(p, (e) => {
						(B(O).nav.logo?.type ?? "text") !== "text" && e(m);
					});
					var h = R(p, 2), g = (e) => {
						var t = Pc(), n = I(t), r = R(n);
						{
							let e = /* @__PURE__ */ M(() => B(O).nav.logo?.order ?? "image-first"), t = /* @__PURE__ */ M(() => [["image-first", X("opt.logo.imageFirst")], ["text-first", X("opt.logo.textFirst")]]);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => Li({ order: e })
							});
						}
						A(t), z((e) => W(n, `${e ?? ""} `), [() => X("lbl.order")]), U(e, t);
					};
					G(h, (e) => {
						B(O).nav.logo?.type === "both" && e(g);
					}), A(o), A(r);
					var _ = R(r, 2), v = I(_), y = I(v, !0);
					A(v);
					var b = R(v, 2), x = I(b), S = I(x), C = R(S);
					{
						let e = /* @__PURE__ */ M(() => B(O).nav.variant ?? "bar"), t = /* @__PURE__ */ M(() => [
							["bar", X("opt.navVariant.bar")],
							["floating", X("opt.navVariant.floating")],
							["floating-square", X("opt.navVariant.floatingSquare")],
							["floating-tab", X("opt.navVariant.floatingTab")],
							["side-left", X("opt.navVariant.sideLeft")],
							["side-right", X("opt.navVariant.sideRight")]
						]);
						Z(C, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => wa(e)
						});
					}
					A(x);
					var w = R(x, 2), T = (e) => {
						var t = uu(), n = L(t), r = I(n);
						q(r);
						var i = R(r);
						A(n);
						var a = R(n, 2), o = I(a);
						q(o);
						var s = R(o);
						A(a), z((e, t, c, l) => {
							Y(n, "title", e), vi(r, B(O).nav.style?.glow === !0), W(i, ` ${t ?? ""}`), Y(a, "title", c), vi(o, B(O).nav.style?.topGap !== !1), W(s, ` ${l ?? ""}`);
						}, [
							() => X("tip.nav.glow"),
							() => X("lbl.navGlow"),
							() => X("tip.nav.topGap"),
							() => X("lbl.navTopGap")
						]), V("change", r, (e) => Oa(e.target.checked)), V("change", o, (e) => ka(e.target.checked)), U(e, t);
					};
					G(w, (e) => {
						B(xa) && e(T);
					});
					var ee = R(w, 2), te = (e) => {
						var t = Gc(), n = I(t);
						q(n);
						var r = R(n);
						A(t), z((e, i) => {
							Y(t, "title", e), vi(n, B(O).nav.overlay === !0), W(r, ` ${i ?? ""}`);
						}, [() => X("tip.nav.overlay"), () => X("lbl.navOverlay")]), V("change", n, (e) => bi("nav", () => {
							e.target.checked ? B(O).nav.overlay = !0 : delete B(O).nav.overlay;
						})), U(e, t);
					};
					G(ee, (e) => {
						!B(xa) && !B(ba) && e(te);
					});
					var ne = R(ee, 2), re = (e) => {
						var t = Pc(), n = I(t), r = R(n);
						{
							let e = /* @__PURE__ */ M(() => B(O).nav.style?.sideAlign ?? "left"), t = /* @__PURE__ */ M(() => [
								["left", X("common.left")],
								["center", X("common.center")],
								["right", X("common.right")]
							]);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => ya("sideAlign", e === "left" ? void 0 : e)
							});
						}
						A(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.nav.sideAlign"), () => X("lbl.textAlign")]), U(e, t);
					};
					G(ne, (e) => {
						B(ba) && e(re);
					});
					var ie = R(ne, 2), ae = I(ie);
					q(ae);
					var oe = R(ae);
					A(ie);
					var se = R(ie, 2), ce = I(se), le = R(ce);
					{
						let e = /* @__PURE__ */ M(() => B(O).nav.style?.size ?? "md"), t = /* @__PURE__ */ M(() => [
							["sm", X("opt.size.sm")],
							["md", X("opt.size.md")],
							["lg", X("opt.size.lg")],
							["xl", X("opt.size.xl")]
						]);
						Z(le, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => ya("size", e === "md" ? void 0 : e)
						});
					}
					A(se);
					var ue = R(se, 2), de = I(ue), fe = R(de), pe = (e) => {
						{
							let t = /* @__PURE__ */ M(() => B(O).nav.style?.sidePlacement ?? "top"), n = /* @__PURE__ */ M(() => [
								["top", X("opt.place.top")],
								["middle", X("opt.place.middle")],
								["bottom", X("opt.place.bottom")]
							]);
							Z(e, {
								get value() {
									return B(t);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => ya("sidePlacement", e === "top" ? void 0 : e)
							});
						}
					}, me = (e) => {
						{
							let t = /* @__PURE__ */ M(() => B(O).nav.layout ?? "right"), n = /* @__PURE__ */ M(() => [
								["right", X("common.right")],
								["center", X("common.center")],
								["left", X("opt.layout.leftAfterLogo")]
							]);
							Z(e, {
								get value() {
									return B(t);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => va(e)
							});
						}
					};
					G(fe, (e) => {
						B(ba) ? e(pe) : e(me, -1);
					}), A(ue);
					var he = R(ue, 2), ge = (e) => {
						var t = du(), n = L(t), r = I(n);
						q(r);
						var i = R(r);
						A(n);
						var a = R(n, 2), o = (e) => {
							var t = Pc(), n = I(t), r = R(n);
							{
								let e = /* @__PURE__ */ M(() => B(O).nav.scroll ?? "none"), t = /* @__PURE__ */ M(() => [
									["none", X("opt.scroll.none")],
									["shrink", X("opt.scroll.shrink")],
									["hide", X("opt.scroll.hide")]
								]);
								Z(r, {
									get value() {
										return B(e);
									},
									get options() {
										return B(t);
									},
									onchange: (e) => bi("nav", () => {
										e === "none" ? delete B(O).nav.scroll : B(O).nav.scroll = e;
									})
								});
							}
							A(t), z((e, r) => {
								Y(t, "title", e), W(n, `${r ?? ""} `);
							}, [() => X("tip.nav.scroll"), () => X("lbl.navScroll")]), U(e, t);
						};
						G(a, (e) => {
							B(O).nav.sticky !== !1 && e(o);
						}), z((e, t) => {
							Y(n, "title", e), vi(r, B(O).nav.sticky !== !1), W(i, ` ${t ?? ""}`);
						}, [() => X("tip.nav.sticky"), () => X("lbl.navSticky")]), V("change", r, (e) => bi("nav", () => {
							B(O).nav.sticky = e.target.checked;
						})), U(e, t);
					};
					G(he, (e) => {
						B(ba) || e(ge);
					});
					var _e = R(he, 2), ve = I(_e), ye = R(ve);
					{
						let e = /* @__PURE__ */ M(() => B(O).nav.style?.hover ?? "standard"), t = /* @__PURE__ */ M(() => [
							["standard", X("opt.hover.standard")],
							["underline", X("opt.hover.underline")],
							["pill", X("opt.hover.pill")],
							["lift-plain", X("opt.hover.liftPlain")],
							["lift", X("opt.hover.lift")]
						]);
						Z(ye, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => Aa(e)
						});
					}
					A(_e);
					var be = R(_e, 2), xe = (e) => {
						var t = fu(), n = L(t), r = I(n), i = R(r), a = I(i);
						A(i), A(n);
						var o = R(n, 2);
						q(o), z((e, t, i) => {
							Y(n, "title", e), W(r, `${t ?? ""} `), W(a, `${i ?? ""}%`), J(o, B(O).nav.style?.hoverGlow ?? .6);
						}, [
							() => X("tip.nav.hoverGlow"),
							() => X("lbl.glowStrength"),
							() => Math.round((B(O).nav.style?.hoverGlow ?? .6) * 100)
						]), V("input", o, (e) => ya("hoverGlow", Number(e.target.value))), U(e, t);
					};
					G(be, (e) => {
						B(O).nav.style?.hover === "lift" && e(xe);
					});
					var Se = R(be, 2), Ce = (e) => {
						var t = Pc(), n = I(t), r = R(n);
						{
							let e = /* @__PURE__ */ M(() => B(O).nav.style?.hoverColor ?? "accent"), t = /* @__PURE__ */ M(rr);
							aa(r, {
								get value() {
									return B(e);
								},
								get tokens() {
									return B(t);
								},
								get label() {
									return B(Ca)[1];
								},
								onchange: (e) => ya("hoverColor", e)
							});
						}
						A(t), z(() => {
							Y(t, "title", B(Ca)[1]), W(n, `${B(Ca)[0] ?? ""} `);
						}), U(e, t);
					};
					G(Se, (e) => {
						B(Ca) && e(Ce);
					});
					var we = R(Se, 2), Te = I(we), Ee = R(Te);
					{
						let e = /* @__PURE__ */ M(() => B(O).nav.style?.hoverTextColor ?? "accent"), t = /* @__PURE__ */ M(rr), n = /* @__PURE__ */ M(() => X("tip.nav.hoverTextColorPick"));
						aa(Ee, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => ya("hoverTextColor", e)
						});
					}
					A(we);
					var E = R(we, 2), De = I(E), D = R(De);
					{
						let e = /* @__PURE__ */ M(() => B(O).nav.style?.textColor ?? "text"), t = /* @__PURE__ */ M(rr), n = /* @__PURE__ */ M(() => X("tip.nav.textColorPick"));
						aa(D, {
							get value() {
								return B(e);
							},
							get tokens() {
								return B(t);
							},
							get label() {
								return B(n);
							},
							onchange: (e) => ya("textColor", e)
						});
					}
					A(E);
					var Oe = R(E, 4), ke = I(Oe, !0);
					A(Oe);
					var Ae = R(Oe, 2);
					n(Ae, () => tr, () => B(O).nav?.style?.background?.layers ?? []), A(b), A(_);
					var je = R(_, 2), k = I(je), Me = I(k, !0);
					A(k);
					var Ne = R(k, 2), Pe = I(Ne), Fe = I(Pe), Ie = R(Fe);
					{
						let e = /* @__PURE__ */ M(() => B(O).nav.style?.subStyle ?? "card"), t = /* @__PURE__ */ M(() => B(ba) ? [
							["card", X("common.standard")],
							["pills", X("opt.sub.pills")],
							["lines", X("opt.sub.lines")]
						] : [
							["card", X("opt.sub.card")],
							["flat", X("opt.sub.flat")],
							["pills", X("opt.sub.pills")],
							["lines", X("opt.sub.lines")],
							["flyout", X("opt.sub.flyout")]
						]);
						Z(Ie, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => ya("subStyle", e === "card" ? void 0 : e)
						});
					}
					A(Pe);
					var Le = R(Pe, 2), Re = (e) => {
						var t = Pc(), n = I(t), r = R(n);
						{
							let e = /* @__PURE__ */ M(() => B(O).nav.style?.subPillColor ?? "surface"), t = /* @__PURE__ */ M(rr), n = /* @__PURE__ */ M(() => X("tip.nav.subPillColorPick"));
							aa(r, {
								get value() {
									return B(e);
								},
								get tokens() {
									return B(t);
								},
								get label() {
									return B(n);
								},
								onchange: (e) => ya("subPillColor", e)
							});
						}
						A(t), z((e, r) => {
							Y(t, "title", e), W(n, `${r ?? ""} `);
						}, [() => X("tip.nav.subPillColor"), () => X("lbl.subPillColor")]), U(e, t);
					};
					G(Le, (e) => {
						B(O).nav.style?.subStyle === "pills" && e(Re);
					});
					var ze = R(Le, 2), Be = I(ze), Ve = R(Be);
					q(Ve), A(ze), A(Ne), A(je);
					var He = R(je, 2), Ue = I(He), We = I(Ue, !0);
					A(Ue);
					var Ge = R(Ue, 2), Ke = I(Ge);
					Wr(Ke, 17, () => B(O).nav.items, Br, (e, t, n) => {
						var r = pu(), i = L(r), a = I(i);
						q(a);
						var o = R(a, 2), s = I(o);
						K(s, () => c.plus, !0), A(s);
						var l = R(s, 2);
						l.disabled = n === 0, K(l, () => c.up, !0), A(l);
						var u = R(l, 2);
						K(u, () => c.down, !0), A(u);
						var d = R(u, 2);
						K(d, () => c.cross, !0), A(d), A(o);
						var f = R(o, 2), p = I(f);
						{
							let e = /* @__PURE__ */ M(() => B(t).page ?? (B(t).href == null ? "__none" : "__href")), r = /* @__PURE__ */ M(() => X("tip.linkTarget")), i = /* @__PURE__ */ M(() => [
								...B(O).pages.map((e) => [e.id, e.title]),
								["__href", X("opt.linkHref")],
								...B(t).children ? [["__none", X("opt.noLink")]] : []
							]);
							Z(p, {
								get value() {
									return B(e);
								},
								get title() {
									return B(r);
								},
								get options() {
									return B(i);
								},
								onchange: (e) => ec(n, e)
							});
						}
						A(f);
						var m = R(f, 2), h = (e) => {
							var r = Mc();
							q(r), z((e, n) => {
								J(r, B(t).href), Y(r, "placeholder", e), Y(r, "title", n);
							}, [() => X("ph.hrefAnchor"), () => X("tip.hrefAnchor")]), V("change", r, (e) => tc(n, e.target.value)), U(e, r);
						};
						G(m, (e) => {
							!B(t).page && B(t).href != null && e(h);
						}), A(i), Wr(R(i, 2), 17, () => B(t).children ?? [], Br, (e, r, i) => {
							var a = Nc(), o = I(a);
							q(o);
							var s = R(o, 2), l = I(s);
							l.disabled = i === 0, K(l, () => c.up, !0), A(l);
							var u = R(l, 2);
							K(u, () => c.down, !0), A(u);
							var d = R(u, 2);
							K(d, () => c.cross, !0), A(d), A(s);
							var f = R(s, 2), p = I(f);
							{
								let e = /* @__PURE__ */ M(() => B(r).page ?? "__href"), t = /* @__PURE__ */ M(() => X("tip.linkTarget")), a = /* @__PURE__ */ M(() => [...B(O).pages.map((e) => [e.id, e.title]), ["__href", X("opt.linkHref")]]);
								Z(p, {
									get value() {
										return B(e);
									},
									get title() {
										return B(t);
									},
									get options() {
										return B(a);
									},
									onchange: (e) => cc(n, i, e)
								});
							}
							A(f);
							var m = R(f, 2), h = (e) => {
								var t = Mc();
								q(t), z((e, n) => {
									J(t, B(r).href ?? ""), Y(t, "placeholder", e), Y(t, "title", n);
								}, [() => X("ph.hrefAnchor"), () => X("tip.hrefAnchor")]), V("change", t, (e) => lc(n, i, e.target.value)), U(e, t);
							};
							G(m, (e) => {
								B(r).page || e(h);
							}), A(a), z((e, n) => {
								J(o, B(r).label), Y(o, "title", e), u.disabled = i === B(t).children.length - 1, Y(d, "title", n);
							}, [() => X("tip.nav.childLabel"), () => X("tip.nav.removeChild")]), V("input", o, (e) => sc(n, i, e.target.value)), V("click", l, () => fc(n, i, -1)), V("click", u, () => fc(n, i, 1)), V("click", d, () => pc(n, i)), U(e, a);
						}), z((e, r, i) => {
							J(a, B(t).label), Y(a, "title", e), Y(s, "title", r), u.disabled = n === B(O).nav.items.length - 1, Y(d, "title", i);
						}, [
							() => X("tip.nav.itemLabel"),
							() => X("tip.nav.addChild"),
							() => X("tip.nav.removeItem")
						]), V("input", a, (e) => $s(n, e.target.value)), V("click", s, () => ac(n)), V("click", l, () => nc(n, -1)), V("click", u, () => nc(n, 1)), V("click", d, () => rc(n)), U(e, r);
					});
					var qe = R(Ke, 2), Je = I(qe, !0);
					A(qe), A(Ge), A(He), A(t), z((e, t, n, r, o, s, c, u, d, f, p, m, h, g, _, v, b, C, w, T, ee, te) => {
						Y(i, "title", e), W(a, t), W(l, `${n ?? ""} `), W(y, r), Y(x, "title", o), W(S, `${s ?? ""} `), Y(ie, "title", c), vi(ae, B(O).nav.style?.blur !== !1), W(oe, ` ${u ?? ""}`), W(ce, `${d ?? ""} `), W(de, `${f ?? ""} `), W(ve, `${p ?? ""} `), Y(we, "title", m), W(Te, `${h ?? ""} `), W(De, `${g ?? ""} `), W(ke, _), W(Me, v), W(Fe, `${b ?? ""} `), Y(ze, "title", C), W(Be, `${w ?? ""} `), J(Ve, B(O).nav.style?.subColumns ?? 1), Y(Ue, "title", T), W(We, ee), W(Je, te);
					}, [
						() => X("hint.nav.logoHome"),
						() => X("group.logo"),
						() => X("common.type"),
						() => X("group.appearance"),
						() => X("tip.nav.variant"),
						() => X("lbl.navVariant"),
						() => X("tip.nav.blur"),
						() => X("lbl.navBlur"),
						() => X("lbl.size"),
						() => X("lbl.navPlacement"),
						() => X("lbl.navHover"),
						() => X("tip.nav.hoverTextColor"),
						() => X("lbl.hoverTextColor"),
						() => X("lbl.textColor"),
						() => X("lbl.background"),
						() => X("group.submenu"),
						() => X("lbl.design"),
						() => X("tip.nav.subColumns"),
						() => X("lbl.columns"),
						() => X("hint.nav.submenu"),
						() => X("group.menuItems"),
						() => X("ui.addMenuItem")
					]), V("change", ae, (e) => ya("blur", e.target.checked)), V("change", Ve, (e) => ya("subColumns", Number(e.target.value) > 1 ? Number(e.target.value) : void 0)), V("click", qe, ic), U(e, t);
				}, d = (e) => {
					var t = bu(), n = I(t), r = I(n), i = R(r);
					q(i), A(n);
					var a = R(n, 2), o = I(a), s = R(o);
					q(s), A(a);
					var l = R(a, 2), u = I(l), d = R(u);
					{
						let e = /* @__PURE__ */ M(sa), t = /* @__PURE__ */ M(ca);
						Z(d, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => ua(e)
						});
					}
					A(l);
					var f = R(l, 4), p = I(f, !0);
					A(f);
					var m = R(f, 2), h = I(m);
					Wr(h, 17, () => B(na), (e) => e.screen, (e, t) => {
						var n = hu(), r = I(n), i = I(r, !0);
						A(r);
						var a = R(r, 2);
						let o;
						var s = I(a);
						A(a);
						var c = R(a, 2), l = I(c, !0);
						A(c), A(n), z(() => {
							W(i, B(t).screen), o = di(a, 1, "cw-bar svelte-1n46o8q", null, o, { fluid: !B(t).bound }), pi(s, `width:${B(t).pct ?? ""}%`), W(l, B(t).bound ? `${B(t).margin}` : "-");
						}), U(e, n);
					});
					var g = R(h, 2), _ = I(g), v = I(_, !0);
					A(_);
					var y = R(_, 2), b = I(y, !0);
					A(y), A(g);
					var x = R(g, 2), S = (e) => {
						var t = gu(), n = I(t, !0);
						A(t), z((e) => W(n, e), [() => X("lbl.bindsFrom", { n: B(pe) })]), U(e, t);
					};
					G(x, (e) => {
						B(Xi) !== "full" && e(S);
					}), A(m);
					var C = R(m, 2);
					Wr(C, 21, () => Ua, (e) => e.id, (e, t) => {
						var n = Xl();
						let r;
						var i = I(n, !0);
						A(n), z((e) => {
							r = di(n, 1, "svelte-1n46o8q", null, r, { on: B(Qi) === B(t).id }), W(i, e);
						}, [() => X(`lbl.width.${B(t).id}`)]), V("click", n, () => ia(B(t).width)), U(e, n);
					}), A(C);
					var w = R(C, 2), T = (e) => {
						var t = _u(), n = I(t), r = I(n, !0);
						A(n);
						var i = R(n, 2);
						q(i);
						var a = R(i, 2), o = I(a);
						A(a), A(t), z((e, n) => {
							Y(t, "title", e), W(r, n), Y(i, "min", 960), Y(i, "max", Va), Y(i, "step", 20), J(i, B(ta)), W(o, `${B(ta) ?? ""} px`);
						}, [() => X("tip.site.contentWidthFree"), () => X("lbl.widthFree")]), V("input", i, (e) => ia(e.target.valueAsNumber)), U(e, t);
					};
					G(w, (e) => {
						B(Xi) !== "full" && e(T);
					});
					var ee = R(w, 2), te = I(ee, !0);
					A(ee);
					var ne = R(ee, 2);
					Wr(ne, 21, () => Ha, (e) => e.id, (e, t) => {
						var n = Xl();
						let r;
						var i = I(n, !0);
						A(n), z((e) => {
							r = di(n, 1, "svelte-1n46o8q", null, r, { on: B($i) === B(t).id }), W(i, e);
						}, [() => X(`lbl.gutter.${B(t).id}`)]), V("click", n, () => oa(B(t).gutter)), U(e, n);
					}), A(ne);
					var re = R(ne, 2), ie = I(re), ae = I(ie, !0);
					A(ie);
					var oe = R(ie, 2), se = I(oe), ce = I(se), le = I(ce, !0);
					A(ce);
					var ue = R(ce, 2);
					q(ue);
					var de = R(ue, 2), fe = I(de);
					A(de), A(se), A(oe), A(re);
					var me = R(re, 4), he = I(me), ge = R(he), _e = (e) => {
						var t = vu();
						z((e) => {
							Y(t, "src", B(O).site.icon), Y(t, "alt", e);
						}, [() => X("lbl.siteIcon")]), U(e, t);
					};
					G(ge, (e) => {
						B(O).site.icon && e(_e);
					}), A(me);
					var ve = R(me, 2), ye = I(ve), be = I(ye), xe = R(be);
					A(ye);
					var Se = R(ye, 2), Ce = (e) => {
						var t = yu(), n = L(t);
						K(n, () => c.pencil ?? "✎", !0), A(n);
						var r = R(n, 2);
						K(r, () => c.cross, !0), A(r), z((e, t) => {
							Y(n, "title", e), Y(r, "title", t);
						}, [() => X("tip.site.editIcon"), () => X("tip.site.removeIcon")]), V("click", n, () => F(Hi, B(O).site.icon, !0)), V("click", r, Gi), U(e, t);
					};
					G(Se, (e) => {
						B(O).site.icon && e(Ce);
					}), A(ve), A(t), z((e, t, c, d, m, h, g, _, y, x, S, C, w, T, ne, ie, oe, ce, de, pe) => {
						Y(n, "title", e), W(r, `${t ?? ""} `), J(i, B(O).site.title ?? ""), Y(i, "placeholder", c), Y(a, "title", d), W(o, `${m ?? ""} `), J(s, B(O).site.description ?? ""), Y(s, "placeholder", h), Y(l, "title", g), W(u, `${_ ?? ""} `), Y(f, "title", y), W(p, x), W(v, S), W(b, C), Y(ee, "title", w), W(te, T), re.open = B($i) === null || B(ea), W(ae, ne), Y(se, "title", ie), W(le, oe), Y(ue, "min", 0), Y(ue, "max", 12), Y(ue, "step", 1), J(ue, B(Zi)), W(fe, `${B(Zi) ?? ""} vw`), W(he, `${ce ?? ""} `), Y(ye, "title", de), W(be, `${pe ?? ""} `);
					}, [
						() => X("tip.site.name"),
						() => X("lbl.name"),
						() => X("ph.site.name"),
						() => X("tip.site.description"),
						() => X("lbl.description"),
						() => X("ph.site.description"),
						() => X("site.langTitle"),
						() => X("site.langLabel"),
						() => X("tip.site.contentWidth"),
						() => X("lbl.contentWidth"),
						() => X("lbl.screenPx"),
						() => X("lbl.marginPx"),
						() => X("tip.site.gutter"),
						() => X("lbl.gutter"),
						() => X("group.advanced"),
						() => X("tip.site.gutterVw"),
						() => X("lbl.gutterVw"),
						() => X("lbl.siteIcon"),
						() => X("tip.site.icon"),
						() => B(O).site.icon ? X("ui.changeIcon") : X("ui.chooseIcon")
					]), V("input", i, (e) => Ji(e.target.value)), V("input", s, (e) => Yi(e.target.value)), wr("toggle", re, (e) => F(ea, e.currentTarget.open, !0)), V("input", ue, (e) => oa(e.target.valueAsNumber)), V("change", xe, Ui), U(e, t);
				}, p = (e) => {
					var t = Ou();
					{
						let e = (e, t = f, n = f) => {
							var r = Su(), i = I(r), a = (e) => {
								var t = xu(), r = I(t, !0);
								A(t), z(() => W(r, n())), U(e, t);
							};
							G(i, (e) => {
								n() && e(a);
							});
							var o = R(i, 2), s = I(o), c = I(s, !0);
							A(s);
							var l = R(s, 2), u = I(l, !0);
							A(l);
							var d = R(l, 2), p = I(d), m = I(p, !0);
							A(p);
							var h = R(p), g = I(h, !0);
							A(h), A(d), A(o), A(r), z((e, t, n, r, i, a, s, l, d) => {
								pi(o, `--tv-bg:${e ?? ""};--tv-surface:${t ?? ""};--tv-text:${n ?? ""};--tv-accent:${r ?? ""};--tv-accent-ink:${i ?? ""}`), W(c, a), W(u, s), W(m, l), W(g, d);
							}, [
								() => Wd(t().bg, t()),
								() => Wd(t().surface, t()),
								() => Wd(t().text, t()),
								() => Wd(t().accent, t()),
								() => Wd(t()["accent-text"] ?? t().bg, t()),
								() => X("preview.heading"),
								() => X("preview.cardBody"),
								() => X("preview.button"),
								() => X("preview.link")
							]), U(e, r);
						};
						var n = I(t), r = I(n, !0);
						A(n);
						var i = R(n, 2);
						Wr(i, 21, () => Kd, (e) => e.id, (e, t) => {
							var n = Cu();
							let r;
							var i = I(n), a = I(i), o = R(a), s = R(o), c = R(s);
							A(i);
							var l = R(i, 2), u = I(l, !0);
							A(l), A(n), z(() => {
								r = di(n, 1, "theme-preset svelte-1n46o8q", null, r, { sel: B(Jd) === B(t).id }), Y(n, "title", `${B(t).name} - ${B(t).note}`), pi(a, `background:${B(t).light.bg ?? ""}`), pi(o, `background:${B(t).light.surface ?? ""}`), pi(s, `background:${B(t).light.accent ?? ""}`), pi(c, `background:${B(t).light.text ?? ""}`), W(u, B(t).name);
							}), V("click", n, () => qd(B(t))), U(e, n);
						}), A(i);
						var a = R(i, 2), o = I(a, !0);
						A(a);
						var s = R(a, 2), c = I(s);
						q(c);
						var l = R(c);
						A(s);
						var u = R(s, 2), d = (e) => {
							var t = wu(), n = I(t), r = I(n, !0);
							A(n);
							var i = R(n, 2), a = I(i);
							let o;
							var s = I(a, !0);
							A(a);
							var c = R(a, 2);
							let l;
							var u = I(c, !0);
							A(c), A(i), A(t), z((e, t, n, i) => {
								W(r, e), Y(a, "title", t), o = di(a, 1, "svelte-1n46o8q", null, o, { on: B(or) }), W(s, n), l = di(c, 1, "svelte-1n46o8q", null, l, { on: !B(or) }), W(u, i);
							}, [
								() => X("lbl.darkColors"),
								() => X("hint.theme.autoDark"),
								() => X("opt.auto"),
								() => X("opt.custom")
							]), V("click", a, () => Bd(!0)), V("click", c, () => Bd(!1)), U(e, t);
						};
						G(u, (e) => {
							B(ar) && e(d);
						});
						var p = R(u, 2), m = I(p), g = (e) => {
							var t = Tu(), n = I(t, !0);
							A(t), z((e) => W(n, e), [() => X("lbl.light")]), U(e, t);
						};
						G(m, (e) => {
							B(ar) && e(g);
						});
						var _ = R(m, 2);
						let k;
						var v = I(_, !0);
						A(_), A(p);
						var y = R(p, 2);
						Wr(y, 21, () => ir, ([e, t, n]) => e, (e, t) => {
							var n = /* @__PURE__ */ M(() => h(B(t), 3));
							let r = () => B(n)[0], i = () => B(n)[1], a = () => B(n)[2];
							var o = Eu(), s = I(o);
							{
								let e = /* @__PURE__ */ M(() => B(O).theme.tokens.color[r()] ?? B(O).theme.tokens.color.bg), t = /* @__PURE__ */ M(rr);
								aa(s, {
									get value() {
										return B(e);
									},
									get tokens() {
										return B(t);
									},
									get label() {
										return i();
									},
									onchange: (e) => Md(r(), e)
								});
							}
							var c = R(s, 2), l = I(c, !0);
							A(c);
							var u = R(c, 2), d = I(u, !0);
							A(u), A(o), z((e) => {
								W(l, a()), W(d, e);
							}, [() => Wd(B(O).theme.tokens.color[r()] ?? B(O).theme.tokens.color.bg, B(cr))]), U(e, o);
						}), A(y);
						var b = R(y, 2), x = (e) => {
							var t = Du(), n = L(t), r = I(n), i = I(r, !0);
							A(r);
							var a = R(r, 2);
							let o;
							var s = I(a, !0);
							A(a), A(n);
							var c = R(n, 2);
							let l;
							Wr(c, 21, () => ir, ([e, t, n]) => e, (e, t) => {
								var n = /* @__PURE__ */ M(() => h(B(t), 3));
								let r = () => B(n)[0], i = () => B(n)[1], a = () => B(n)[2];
								var o = Eu(), s = I(o);
								{
									let e = /* @__PURE__ */ M(() => B(O).theme.alt.tokens.color[r()] ?? B(lr)[r()] ?? B(O).theme.tokens.color.bg), t = /* @__PURE__ */ M(rr), n = /* @__PURE__ */ M(() => X("theme.darkColorLabel", { name: i() }));
									aa(s, {
										get value() {
											return B(e);
										},
										get tokens() {
											return B(t);
										},
										get label() {
											return B(n);
										},
										onchange: (e) => Ld(r(), e)
									});
								}
								var c = R(s, 2), l = I(c, !0);
								A(c);
								var u = R(c, 2), d = I(u, !0);
								A(u), A(o), z((e) => {
									W(l, a()), W(d, e);
								}, [() => Wd(B(O).theme.alt.tokens.color[r()] ?? B(lr)[r()], B(lr))]), U(e, o);
							}), A(c), z((e, t, n) => {
								W(i, e), o = di(a, 1, "chip svelte-1n46o8q", null, o, { accent: B(sr) === "dark" }), Y(a, "title", t), W(s, n), l = di(c, 1, "palcells svelte-1n46o8q", null, l, { autopal: B(or) });
							}, [
								() => X("lbl.dark"),
								() => X("tip.theme.darkDefault"),
								() => X("common.standard")
							]), V("click", a, () => Rd("dark")), U(e, t);
						};
						G(b, (e) => {
							B(ar) && e(x);
						});
						var S = R(b, 2), C = I(S);
						{
							let t = /* @__PURE__ */ M(() => B(ar) ? X("lbl.light") : "");
							e(C, () => B(cr), () => B(t));
						}
						var w = R(C, 2), T = (t) => {
							{
								let n = /* @__PURE__ */ M(() => X("lbl.dark"));
								e(t, () => B(lr), () => B(n));
							}
						};
						G(w, (e) => {
							B(ar) && e(T);
						}), A(S);
						var ee = R(S, 2), te = I(ee), ne = I(te, !0);
						A(te);
						var re = R(te, 2), ie = I(re), ae = I(ie), oe = R(ae);
						{
							let e = /* @__PURE__ */ M(() => Vd("heading"));
							Z(oe, {
								get value() {
									return B(O).theme.tokens.font.heading;
								},
								get options() {
									return B(e);
								},
								onchange: (e) => Nd("heading", e)
							});
						}
						A(ie);
						var se = R(ie, 2), ce = I(se), le = R(ce);
						{
							let e = /* @__PURE__ */ M(() => Vd("body"));
							Z(le, {
								get value() {
									return B(O).theme.tokens.font.body;
								},
								get options() {
									return B(e);
								},
								onchange: (e) => Nd("body", e)
							});
						}
						A(se);
						var ue = R(se, 2), de = I(ue), fe = I(de, !0);
						A(de);
						var pe = R(de, 2), me = I(pe, !0);
						A(pe), A(ue), A(re), A(ee);
						var he = R(ee, 2), ge = I(he), _e = I(ge, !0);
						A(ge);
						var ve = R(ge, 2), ye = I(ve), be = I(ye), xe = I(be, !0);
						A(be);
						var Se = R(be, 2), Ce = I(Se, !0);
						A(Se), A(ye);
						var we = R(ye, 2), Te = I(we, !0), Ee = R(Te), E = I(Ee, !0);
						A(Ee), A(we);
						var De = R(we, 2);
						q(De);
						var D = R(De, 2), Oe = I(D, !0), ke = R(Oe), Ae = I(ke, !0);
						A(ke), A(D);
						var je = R(D, 2);
						q(je), A(ve), A(he), A(t), z((e, t, n, i, a, u, d, f, p, m, h, g, y, b, x, S, C, w) => {
							W(r, e), W(o, t), Y(s, "title", n), vi(c, B(ar)), W(l, ` ${i ?? ""}`), k = di(_, 1, "chip svelte-1n46o8q", null, k, { accent: B(sr) === "light" }), Y(_, "title", a), W(v, u), W(ne, d), W(ae, `${f ?? ""} `), W(ce, `${p ?? ""} `), pi(de, `font-family:${B(O).theme.tokens.font.heading ?? ""}`), W(fe, m), pi(pe, `font-family:${B(O).theme.tokens.font.body ?? ""}`), W(me, h), W(_e, g), pi(ye, `--r-sm:${B(O).theme.tokens.radius.sm ?? ""};--r-md:${B(O).theme.tokens.radius.md ?? ""}`), W(xe, y), W(Ce, b), W(Te, x), W(E, B(O).theme.tokens.radius.sm), J(De, S), W(Oe, C), W(Ae, B(O).theme.tokens.radius.md), J(je, w);
						}, [
							() => X("lbl.themePresets"),
							() => X("lbl.colors"),
							() => X("tip.theme.dualMode"),
							() => X("lbl.dualMode"),
							() => X("tip.theme.defaultScheme"),
							() => X("common.standard"),
							() => X("group.typography"),
							() => X("lbl.headings"),
							() => X("lbl.bodyText"),
							() => X("preview.heading"),
							() => X("preview.bodySample"),
							() => X("group.shape"),
							() => X("preview.button"),
							() => X("preview.card"),
							() => X("lbl.smallCorners"),
							() => Hd(B(O).theme.tokens.radius.sm),
							() => X("lbl.largeCorners"),
							() => Hd(B(O).theme.tokens.radius.md)
						]), V("change", c, (e) => zd(e.target.checked)), V("click", _, () => Rd("light")), V("input", De, (e) => Ud("sm", Number(e.target.value))), V("input", je, (e) => Ud("md", Number(e.target.value)));
					}
					U(e, t);
				}, m = (e) => {
					var t = Nu();
					let n;
					var r = I(t);
					q(r);
					var i = R(r, 2), a = (e) => {
						var t = Nr();
						Wr(L(t), 17, () => us(yf(), B(vf), (e) => e.label), (e) => e.label, (e, t) => {
							var n = Nr(), r = L(n), i = (e) => {
								var n = ku(), r = I(n), i = R(r);
								A(n), z((e) => {
									Y(n, "title", e), W(r, `${B(t).label ?? ""} `);
								}, [() => X("tip.webpAuto")]), V("change", i, Sf), U(e, n);
							}, a = (e) => {
								var n = Au(), r = I(n), i = R(r);
								A(n), z((e) => {
									Y(n, "title", e), W(r, `${B(t).label ?? ""} `);
								}, [() => X("tip.blocks.galleryImages")]), V("change", i, Ef), U(e, n);
							}, o = (e) => {
								var n = qc(), r = I(n, !0);
								A(n), z(() => W(r, B(t).label)), V("click", n, () => bf(B(t))), U(e, n);
							};
							G(r, (e) => {
								B(t).act === "image" ? e(i) : B(t).act === "galleryImages" ? e(a, 1) : e(o, -1);
							}), U(e, n);
						}, (e) => {
							var t = Lc(), n = I(t, !0);
							A(t), z((e) => W(n, e), [() => X("canvas.searchEmpty")]), U(e, t);
						}), U(e, t);
					}, o = /* @__PURE__ */ M(() => B(vf).trim()), s = (e) => {
						var t = Mu(), n = L(t), r = I(n), i = I(r, !0);
						A(r);
						var a = R(r, 2), o = I(a), s = I(o, !0);
						A(o);
						var c = R(o, 2), l = I(c, !0);
						A(c), A(a), A(n);
						var u = R(n, 2), d = I(u, !0);
						A(u);
						var f = R(u, 2), p = I(f), m = R(p);
						A(f);
						var h = R(f, 2), g = I(h, !0);
						A(h);
						var _ = R(h, 2), v = I(_, !0);
						A(_);
						var y = R(_, 2), b = I(y, !0);
						A(y);
						var x = R(y, 2), S = I(x, !0);
						A(x);
						var C = R(x, 2), w = I(C, !0);
						A(C);
						var T = R(C, 2), ee = I(T, !0);
						A(T);
						var te = R(T, 2), ne = I(te, !0);
						A(te);
						var re = R(te, 2), ie = I(re, !0);
						A(re);
						var ae = R(re, 2), oe = I(ae, !0);
						A(ae);
						var se = R(ae, 2), ce = I(se, !0);
						A(se);
						var le = R(se, 2), ue = I(le, !0);
						A(le);
						var de = R(le, 2), fe = I(de), pe = I(fe, !0);
						A(fe);
						var me = R(fe, 2), he = I(me), ge = I(he, !0);
						A(he);
						var _e = R(he, 2), ve = I(_e), ye = R(ve);
						A(_e), A(me), A(de);
						var be = R(de, 2), xe = I(be), Se = I(xe, !0);
						A(xe);
						var Ce = R(xe, 2), we = I(Ce), Te = I(we, !0);
						A(we);
						var Ee = R(we, 2), E = I(Ee, !0);
						A(Ee);
						var De = R(Ee, 2), O = I(De, !0);
						A(De);
						var Oe = R(De, 2), ke = I(Oe, !0);
						A(Oe);
						var Ae = R(Oe, 2), je = I(Ae, !0);
						A(Ae), A(Ce), A(be);
						var k = R(be, 2), Me = (e) => {
							let t = /* @__PURE__ */ M(() => B(io).filter((e) => to[e]?.data?.mal?.kind === "blocks"));
							var n = ju(), r = I(n), i = I(r, !0);
							A(r);
							var a = R(r, 2);
							Wr(a, 20, () => B(t), (e) => e, (e, t) => {
								var n = qc(), r = I(n, !0);
								A(n), z((e) => {
									Y(n, "title", e), W(r, to[t].data.mal.name);
								}, [() => X("canvas.insertGroup")]), V("click", n, () => D?.sendInsertTemplate(t)), U(e, n);
							}), A(a), A(n), z((e) => W(i, e), [() => X("canvas.tabMyTemplates")]), U(e, n);
						}, Ne = /* @__PURE__ */ M(() => B(io).some((e) => to[e]?.data?.mal?.kind === "blocks"));
						G(k, (e) => {
							B(Ne) && e(Me);
						});
						var Pe = R(k, 2), Fe = (e) => {
							var t = ju(), n = I(t), r = I(n, !0);
							A(n);
							var i = R(n, 2);
							Wr(i, 21, () => B(gf), (e) => e.type, (e, t) => {
								var n = Nr(), r = L(n), i = (e) => {
									var n = ju(), r = I(n), i = I(r, !0);
									A(r);
									var a = R(r, 2);
									Wr(a, 21, () => B(t).variants, (e) => e.label, (e, n) => {
										var r = qc(), i = I(r, !0);
										A(r), z((e) => {
											Y(r, "title", e), W(i, B(n).label);
										}, [() => X("tip.blocks.fromPlugin", { plugin: B(t).plugin })]), V("click", r, () => _f(B(t), B(n).props)), U(e, r);
									}), A(a), A(n), z(() => W(i, B(t).label)), U(e, n);
								}, a = (e) => {
									var n = qc(), r = I(n, !0);
									A(n), z((e) => {
										Y(n, "title", e), W(r, B(t).label);
									}, [() => X("tip.blocks.fromPlugin", { plugin: B(t).plugin })]), V("click", n, () => _f(B(t))), U(e, n);
								};
								G(r, (e) => {
									B(t).variants?.length ? e(i) : e(a, -1);
								}), U(e, n);
							}), A(i), A(t), z((e) => W(r, e), [() => X("panel.plugins")]), U(e, t);
						};
						G(Pe, (e) => {
							B(gf).length && e(Fe);
						}), z((e, t, n, r, a, o, u, m, de, fe, me, ye, be, xe, Ce, we, Ee, De, D, Oe, Ae, k, Me, Ne, Pe, A, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je) => {
							W(i, e), W(s, t), Y(c, "title", n), W(l, r), W(d, a), Y(f, "title", o), W(p, `${u ?? ""} `), Y(h, "title", m), W(g, de), Y(_, "title", fe), W(v, me), Y(y, "title", ye), W(b, be), Y(x, "title", xe), W(S, Ce), Y(C, "title", we), W(w, Ee), Y(T, "title", De), W(ee, D), Y(te, "title", Oe), W(ne, Ae), Y(re, "title", k), W(ie, Me), Y(ae, "title", Ne), W(oe, Pe), Y(se, "title", A), W(ce, Fe), Y(le, "title", Ie), W(ue, Le), W(pe, Re), Y(he, "title", ze), W(ge, Be), Y(_e, "title", Ve), W(ve, `${He ?? ""} `), W(Se, Ue), W(Te, We), W(E, Ge), W(O, Ke), W(ke, qe), W(je, Je);
						}, [
							() => X("blocks.text"),
							() => X("blocks.text"),
							() => X("tip.blocks.textBox"),
							() => X("ui.textBox"),
							() => X("blocks.button"),
							() => X("tip.webpAuto"),
							() => X("blocks.image"),
							() => X("tip.blocks.video"),
							() => X("blocks.video"),
							() => X("tip.blocks.icon"),
							() => X("blocks.icon"),
							() => X("tip.blocks.samling"),
							() => X("blocks.samling"),
							() => X("tip.blocks.faq"),
							() => X("blocks.faq"),
							() => X("tip.blocks.tidslinje"),
							() => X("blocks.tidslinje"),
							() => X("tip.blocks.sitat"),
							() => X("blocks.sitat"),
							() => X("tip.blocks.statistikk"),
							() => X("blocks.statistikk"),
							() => X("tip.blocks.tabell"),
							() => X("blocks.tabell"),
							() => X("tip.blocks.deling"),
							() => X("blocks.deling"),
							() => X("tip.blocks.nedteller"),
							() => X("blocks.nedteller"),
							() => X("tip.blocks.audio"),
							() => X("blocks.audio"),
							() => X("blocks.galleri"),
							() => X("tip.blocks.gallery"),
							() => X("ui.emptyGallery"),
							() => X("tip.blocks.galleryImages"),
							() => X("ui.galleryWithImages"),
							() => X("group.shapes"),
							() => X("shape.line"),
							() => X("shape.arrow"),
							() => X("shape.circle"),
							() => X("shape.rect"),
							() => X("shape.triangle")
						]), V("click", o, () => hf("text")), V("click", c, () => hf("text-box")), V("click", u, () => hf("button")), V("change", m, Sf), V("click", h, () => hf("video")), V("click", _, () => hf("icon")), V("click", y, () => hf("samling")), V("click", x, () => hf("faq")), V("click", C, () => hf("tidslinje")), V("click", T, () => hf("sitat")), V("click", te, () => hf("statistikk")), V("click", re, () => hf("tabell")), V("click", ae, () => hf("deling")), V("click", se, () => hf("nedteller")), V("click", le, () => hf("audio")), V("click", he, () => hf("galleri")), V("change", ye, Ef), V("click", we, () => hf("shape-line")), V("click", Ee, () => hf("shape-arrow")), V("click", De, () => hf("shape-circle")), V("click", Oe, () => hf("shape-rect")), V("click", Ae, () => hf("shape-triangle")), U(e, t);
					};
					G(i, (e) => {
						B(o) ? e(a) : e(s, -1);
					}), A(t), z((e, i, a) => {
						n = di(t, 1, "panel-body svelte-1n46o8q", null, n, { locked: B(ae) === "mobile" }), Y(t, "title", e), Y(r, "placeholder", i), Y(r, "title", a);
					}, [
						() => B(ae) === "mobile" ? X("tip.blocks.mobileLocked") : void 0,
						() => X("canvas.searchBlocks"),
						() => X("canvas.searchBlocks")
					]), Si(r, () => B(vf), (e) => F(vf, e)), U(e, t);
				}, _ = (e) => {
					var t = Pu(), n = I(t), r = I(n), i = R(r), a = I(i);
					A(i), A(n);
					var o = R(n, 2);
					q(o);
					var s = R(o, 2), c = I(s);
					q(c);
					var l = R(c);
					A(s), A(t), z((e, t) => {
						W(r, `${e ?? ""} `), W(a, `${B(ee).size ?? ""} px`), J(o, B(ee).size), vi(c, B(ee).snap !== !1), W(l, ` ${t ?? ""}`);
					}, [() => X("lbl.gridSize"), () => X("lbl.gridSnap")]), V("input", o, (e) => kr("size", Number(e.target.value))), V("change", c, (e) => kr("snap", e.target.checked)), U(e, t);
				}, v = (e) => {
					var t = Vu(), r = I(t), i = (e) => {
						var t = Fu(), n = L(t), r = I(n, !0);
						A(n);
						var i = R(n, 2);
						a(i), z((e) => W(r, e), [() => X("blocks.suffix", { label: tn[B(j).type] ?? B(j).type })]), U(e, t);
					}, o = (e) => {
						var t = Bu(), r = L(t), i = I(r, !0);
						A(r);
						var a = R(r, 2), o = I(a), s = R(o);
						q(s), A(a);
						var l = R(a, 4), u = I(l);
						q(u);
						var d = R(u);
						A(l);
						var f = R(l, 2), p = (e) => {
							var t = Iu(), n = L(t), r = I(n), i = R(r), a = I(i);
							A(i), A(n);
							var o = R(n, 2);
							q(o), z((e) => {
								W(r, `${e ?? ""} `), W(a, `${B(cn).size ?? ""} px`), J(o, B(cn).size);
							}, [() => X("lbl.gridSize")]), V("input", o, (e) => Or("size", Number(e.target.value))), U(e, t);
						};
						G(f, (e) => {
							B(cn) && e(p);
						});
						var m = R(f, 4), g = I(m, !0);
						A(m);
						var _ = R(m, 2);
						Wr(_, 21, () => [["", "common.standard"], ...Object.entries(_s)], ([e, t]) => e, (e, t) => {
							var n = /* @__PURE__ */ M(() => h(B(t), 2));
							let r = () => B(n)[0], i = () => B(n)[1], a = /* @__PURE__ */ M(() => yn(r()));
							var o = Lu();
							let s;
							var c = I(o), l = I(c), u = R(l, 2), d = R(u, 2);
							A(c);
							var f = R(c, 2), p = I(f, !0);
							A(f), A(o), z((e, t) => {
								s = di(o, 1, "rs-card svelte-1n46o8q", null, s, { on: B(pn) === r() }), Y(o, "title", e), pi(c, `background: ${B(a).bg ?? ""}`), pi(l, `background: ${B(a).text ?? ""}`), pi(u, `background: ${B(a).surface ?? ""}`), pi(d, `background: ${B(a).accent ?? ""}`), W(p, t);
							}, [() => X("tip.props.sectionTheme"), () => X(i())]), V("click", o, () => vn(r())), U(e, o);
						}), A(_);
						var v = R(_, 2), y = I(v), b = R(y), x = I(b), S = I(x);
						A(x);
						var C = R(x, 2);
						K(C, () => c.copy, !0), A(C), A(b), A(v);
						var w = R(v, 4), T = I(w, !0);
						A(w);
						var ee = R(w, 2);
						n(ee, () => B(er), () => B(un));
						var te = R(ee, 4), ne = I(te), re = R(ne);
						{
							let e = /* @__PURE__ */ M(() => dr(B(dn)) ? B(dn).type : "");
							Z(re, {
								get value() {
									return B(e);
								},
								get options() {
									return fr;
								},
								onchange: (e) => yr(e || null)
							});
						}
						A(te);
						var ie = R(te, 2), ae = (e) => {
							var t = zu(), n = L(t), r = I(n), i = R(r);
							q(i), A(n);
							var a = R(n, 2), o = I(a), s = R(o);
							q(s), A(a);
							var c = R(a, 2), l = (e) => {
								var t = Ru(), n = L(t), r = I(n), i = R(r);
								{
									let e = /* @__PURE__ */ M(() => B(dn).props.effect ?? "slide-up"), t = /* @__PURE__ */ M(() => [
										["fade-in", X("anim.fadeIn")],
										["slide-up", X("anim.slideUp")],
										["zoom-in", X("anim.zoomIn")]
									]);
									Z(i, {
										get value() {
											return B(e);
										},
										get options() {
											return B(t);
										},
										onchange: (e) => Cr("effect", e)
									});
								}
								A(n);
								var a = R(n, 2), o = I(a), s = R(o);
								q(s), A(a);
								var c = R(a, 2), l = I(c), u = R(l);
								{
									let e = /* @__PURE__ */ M(() => B(dn).props.pattern ?? "sequence"), t = /* @__PURE__ */ M(() => [
										["sequence", X("opt.stagger.sequence")],
										["columns", X("opt.stagger.columns")],
										["rows", X("opt.stagger.rows")],
										["center", X("opt.stagger.center")]
									]);
									Z(u, {
										get value() {
											return B(e);
										},
										get options() {
											return B(t);
										},
										onchange: (e) => Cr("pattern", e)
									});
								}
								A(c), z((e, t, i, u, d, f) => {
									Y(n, "title", e), W(r, `${t ?? ""} `), Y(a, "title", i), W(o, `${u ?? ""} `), J(s, B(dn).props.step ?? 90), Y(c, "title", d), W(l, `${f ?? ""} `);
								}, [
									() => X("tip.props.staggerEffect"),
									() => X("lbl.staggerEffect"),
									() => X("tip.props.staggerStep"),
									() => X("lbl.stepMs"),
									() => X("tip.props.staggerPattern"),
									() => X("lbl.pattern")
								]), V("change", s, (e) => xr("step", Number(e.target.value))), U(e, t);
							};
							G(c, (e) => {
								B(dn).type === "stagger" && e(l);
							}), z((e, t) => {
								W(r, `${e ?? ""} `), J(i, B(dn).props.duration), W(o, `${t ?? ""} `), J(s, B(dn).props.delay ?? 0);
							}, [() => X("lbl.durationMs"), () => X("lbl.delayMs")]), V("change", i, (e) => xr("duration", Number(e.target.value))), V("change", s, (e) => xr("delay", Number(e.target.value))), U(e, t);
						}, oe = /* @__PURE__ */ M(() => dr(B(dn)));
						G(ie, (e) => {
							B(oe) && e(ae);
						});
						var se = R(ie, 2), ce = I(se), le = R(ce);
						{
							let e = /* @__PURE__ */ M(() => B(fn)?.type ?? (B(dn) && !dr(B(dn)) ? B(dn).type : ""));
							Z(le, {
								get value() {
									return B(e);
								},
								get options() {
									return mr;
								},
								onchange: (e) => br(e || null)
							});
						}
						A(se), z((e, t, n, r, c, l, f, p, h, _, b, x, w, ee, re) => {
							W(i, e), Y(a, "title", t), W(o, `${n ?? ""} `), J(s, B(ln)), Y(s, "placeholder", r), vi(u, B(cn) !== null), W(d, ` ${c ?? ""}`), Y(m, "title", l), W(g, f), Y(v, "title", p), W(y, `${h ?? ""} `), W(S, `#${B(sn) ?? ""}`), Y(C, "title", _), W(T, b), Y(te, "title", x), W(ne, `${w ?? ""} `), Y(se, "title", ee), W(ce, `${re ?? ""} `);
						}, [
							() => X("lbl.section"),
							() => X("hint.props.minHeight"),
							() => X("lbl.minHeight"),
							() => X("ph.minHeight"),
							() => X("lbl.sectionGrid"),
							() => X("tip.props.sectionTheme"),
							() => X("lbl.sectionTheme"),
							() => X("tip.props.anchor"),
							() => X("lbl.anchor"),
							() => X("tip.props.copyAnchor"),
							() => X("lbl.background"),
							() => X("tip.props.sectionAnim"),
							() => X("lbl.animIn"),
							() => X("tip.props.sectionHover"),
							() => X("lbl.onHover")
						]), V("change", s, (e) => Tr(e.target.value)), V("change", u, (e) => Dr(e.target.checked)), V("click", C, () => navigator.clipboard?.writeText(`#${B(sn)}`)), U(e, t);
					}, s = (e) => {
						var t = Lc(), n = I(t, !0);
						A(t), z((e) => W(n, e), [() => X("hint.props.empty")]), U(e, t);
					};
					G(r, (e) => {
						B(j) ? e(i) : B(sn) ? e(o, 1) : e(s, -1);
					}), A(t), U(e, t);
				}, y = (e) => {
					var t = Yu(), i = I(t), a = I(i);
					q(a);
					var o = R(a);
					A(i);
					var s = R(i, 2), l = (e) => {
						var t = ju(), n = I(t), r = I(n, !0);
						A(n);
						var i = R(n, 2);
						Wr(i, 21, () => B(O).pages ?? [], (e) => e.id, (e, t) => {
							var n = Gc(), r = I(n);
							q(r);
							var i = R(r);
							A(n), z((e, a) => {
								Y(n, "title", e), vi(r, a), W(i, ` ${(B(t).title || B(t).id) ?? ""}`);
							}, [() => X("tip.footer.hideOnPage"), () => !(B(O).footer?.hideOn ?? []).includes(B(t).id)]), V("change", r, (e) => Fs(B(t).id, e.target.checked)), U(e, n);
						}), A(i), A(t), z((e) => W(r, e), [() => X("group.showOnPages")]), U(e, t);
					};
					G(s, (e) => {
						B(O).footer?.show && e(l);
					});
					var u = R(s, 2), d = I(u), f = I(d, !0);
					A(d);
					var p = R(d, 2), m = I(p);
					Wr(m, 21, () => hs, (e) => e.id, (e, t) => {
						var n = Hu(), r = I(n);
						K(r, () => dc(B(t).thumb), !0), A(r);
						var i = R(r, 2), a = I(i, !0);
						A(i), A(n), z((e) => {
							Y(n, "title", e), W(a, B(t).label);
						}, [() => X("tip.footer.template", { label: B(t).label })]), V("click", n, () => Ss(B(t).id)), U(e, n);
					}), A(m), A(p), A(u);
					var h = R(u, 2), g = I(h), _ = I(g, !0);
					A(g);
					var v = R(g, 2), y = I(v), b = I(y), x = R(b);
					q(x), A(y);
					var S = R(y, 2), C = I(S), w = R(C);
					q(w), A(S);
					var T = R(S, 2), ee = I(T), te = R(ee);
					{
						let e = /* @__PURE__ */ M(() => B(O).footer?.brand?.mode ?? "text"), t = /* @__PURE__ */ M(() => [
							["text", X("blocks.text")],
							["image", X("opt.brand.image")],
							["both", X("opt.brand.both")]
						]);
						Z(te, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => as(e)
						});
					}
					A(T);
					var ne = R(T, 2), re = (e) => {
						var t = Wu(), n = L(t), r = I(n), i = I(r), a = R(i);
						A(r);
						var o = R(r, 2), s = (e) => {
							var t = vc();
							K(t, () => c.cross, !0), A(t), z((e) => Y(t, "title", e), [() => X("tip.footer.removeLogo")]), V("click", t, ls), U(e, t);
						};
						G(o, (e) => {
							B(O).footer?.brand?.logo && e(s);
						}), A(n);
						var l = R(n, 2), u = (e) => {
							var t = Uu(), n = L(t), r = I(n), i = R(r), a = I(i);
							A(i), A(n);
							var o = R(n, 2);
							q(o), z((e) => {
								W(r, `${e ?? ""} `), W(a, `${B(O).footer?.brand?.logoHeight ?? 40 ?? ""} px`), J(o, B(O).footer?.brand?.logoHeight ?? 40);
							}, [() => X("lbl.logoHeight")]), V("input", o, (e) => ds(e.target.value)), U(e, t);
						};
						G(l, (e) => {
							B(O).footer?.brand?.logo && e(u);
						}), z((e, t) => {
							Y(r, "title", e), W(i, `${t ?? ""} `);
						}, [() => X("tip.webpAutoPublish"), () => B(O).footer?.brand?.logo ? X("ui.changeLogo") : X("ui.uploadLogo")]), V("change", a, cs), U(e, t);
					};
					G(ne, (e) => {
						(B(O).footer?.brand?.mode ?? "text") !== "text" && e(re);
					}), A(v), A(h);
					var ie = R(h, 2), ae = I(ie), oe = I(ae, !0);
					A(ae);
					var se = R(ae, 2), ce = I(se);
					Wr(ce, 17, () => B(O).footer?.columns ?? [], Br, (e, t, n) => {
						var r = Gu(), i = L(r), a = I(i);
						q(a);
						var o = R(a, 2), s = I(o);
						K(s, () => c.plus, !0), A(s);
						var l = R(s, 2);
						l.disabled = n === 0, K(l, () => c.up, !0), A(l);
						var u = R(l, 2);
						K(u, () => c.down, !0), A(u);
						var d = R(u, 2);
						K(d, () => c.cross, !0), A(d), A(o), A(i), Wr(R(i, 2), 17, () => B(t).links ?? [], Br, (e, r, i) => {
							var a = Nc(), o = I(a);
							q(o);
							var s = R(o, 2), l = I(s);
							l.disabled = i === 0, K(l, () => c.up, !0), A(l);
							var u = R(l, 2);
							K(u, () => c.down, !0), A(u);
							var d = R(u, 2);
							K(d, () => c.cross, !0), A(d), A(s);
							var f = R(s, 2), p = I(f);
							{
								let e = /* @__PURE__ */ M(() => B(r).page ?? "__href"), t = /* @__PURE__ */ M(() => X("tip.linkTarget")), a = /* @__PURE__ */ M(() => [...B(O).pages.map((e) => [e.id, e.title]), ["__href", X("opt.linkHref")]]);
								Z(p, {
									get value() {
										return B(e);
									},
									get title() {
										return B(t);
									},
									get options() {
										return B(a);
									},
									onchange: (e) => Gs(n, i, e)
								});
							}
							A(f);
							var m = R(f, 2), h = (e) => {
								var t = Mc();
								q(t), z((e, n) => {
									J(t, B(r).href ?? ""), Y(t, "placeholder", e), Y(t, "title", n);
								}, [() => X("ph.hrefAnchor"), () => X("tip.hrefAnchor")]), V("change", t, (e) => Ks(n, i, e.target.value)), U(e, t);
							};
							G(m, (e) => {
								B(r).page || e(h);
							}), A(a), z((e, n) => {
								J(o, B(r).label), Y(o, "title", e), u.disabled = i === B(t).links.length - 1, Y(d, "title", n);
							}, [() => X("tip.linkLabel"), () => X("tip.removeLink")]), V("input", o, (e) => Ws(n, i, e.target.value)), V("click", l, () => Us(n, i, -1)), V("click", u, () => Us(n, i, 1)), V("click", d, () => Hs(n, i)), U(e, a);
						}), z((e, r, i) => {
							J(a, B(t).title), Y(a, "title", e), Y(s, "title", r), u.disabled = n === B(O).footer.columns.length - 1, Y(d, "title", i);
						}, [
							() => X("tip.footer.columnTitle"),
							() => X("tip.footer.addLink"),
							() => X("tip.footer.removeColumn")
						]), V("input", a, (e) => Bs(n, e.target.value)), V("click", s, () => Vs(n)), V("click", l, () => zs(n, -1)), V("click", u, () => zs(n, 1)), V("click", d, () => Rs(n)), U(e, r);
					});
					var le = R(ce, 2), ue = I(le, !0);
					A(le);
					var de = R(le, 2), fe = I(de), pe = R(fe);
					{
						let e = /* @__PURE__ */ M(() => B(O).footer?.columnsAlign ?? "left"), t = /* @__PURE__ */ M(() => [["left", X("common.left")], ["center", X("common.center")]]);
						Z(pe, {
							get value() {
								return B(e);
							},
							get options() {
								return B(t);
							},
							onchange: (e) => ks(e)
						});
					}
					A(de), A(se), A(ie);
					var me = R(ie, 2), he = I(me), ge = I(he, !0);
					A(he);
					var _e = R(he, 2), ve = I(_e);
					Wr(ve, 17, () => B(O).footer?.social ?? [], Br, (e, t, n) => {
						var r = Ku(), i = I(r), a = I(i);
						K(a, () => Da(B(t).icon) || "", !0), A(a);
						var o = R(a, 2);
						{
							let e = /* @__PURE__ */ M(() => X("blocks.icon"));
							Z(o, {
								get value() {
									return B(t).icon;
								},
								get title() {
									return B(e);
								},
								get options() {
									return Qs;
								},
								onchange: (e) => Xs(n, e)
							});
						}
						A(i);
						var s = R(i, 2), l = I(s);
						l.disabled = n === 0, K(l, () => c.up, !0), A(l);
						var u = R(l, 2);
						K(u, () => c.down, !0), A(u);
						var d = R(u, 2);
						K(d, () => c.cross, !0), A(d), A(s);
						var f = R(s, 2);
						q(f), A(r), z((e, r) => {
							u.disabled = n === B(O).footer.social.length - 1, Y(d, "title", e), J(f, B(t).url), Y(f, "placeholder", r);
						}, [() => X("tip.removeLink"), () => X("ph.hrefMailto")]), V("click", l, () => Ys(n, -1)), V("click", u, () => Ys(n, 1)), V("click", d, () => Js(n)), V("change", f, (e) => Zs(n, e.target.value)), U(e, r);
					});
					var ye = R(ve, 2), be = I(ye, !0);
					A(ye), A(_e), A(me);
					var xe = R(me, 2), Se = I(xe), Ce = I(Se, !0);
					A(Se);
					var we = R(Se, 2), Te = I(we), Ee = I(Te);
					q(Ee);
					var E = R(Ee);
					A(Te);
					var De = R(Te, 2), D = (e) => {
						let t = /* @__PURE__ */ M(() => B(O).footer.cta);
						var n = Ju(), r = L(n), i = I(r), a = R(i);
						{
							let e = /* @__PURE__ */ M(() => B(t).kind ?? "button"), n = /* @__PURE__ */ M(() => [["button", X("opt.cta.button")], ["newsletter", X("opt.cta.newsletter")]]);
							Z(a, {
								get value() {
									return B(e);
								},
								get options() {
									return B(n);
								},
								onchange: (e) => js("kind", e)
							});
						}
						A(r);
						var o = R(r, 2), s = I(o);
						q(s);
						var c = R(s);
						A(o);
						var l = R(o, 2), u = I(l), d = R(u);
						q(d), A(l);
						var f = R(l, 2), p = I(f), m = R(p);
						q(m), A(f);
						var h = R(f, 2), g = I(h), _ = R(g);
						q(_), A(h);
						var v = R(h, 2), y = (e) => {
							var n = qu(), r = L(n), i = I(r), a = R(i);
							{
								let e = /* @__PURE__ */ M(() => B(t).page ?? "__href"), n = /* @__PURE__ */ M(() => [...B(O).pages.map((e) => [e.id, e.title]), ["__href", X("opt.linkHrefMailto")]]);
								Z(a, {
									get value() {
										return B(e);
									},
									get options() {
										return B(n);
									},
									onchange: (e) => Ms(e)
								});
							}
							A(r);
							var o = R(r, 2), s = (e) => {
								var n = Yc();
								q(n), z((e, r) => {
									J(n, B(t).href ?? ""), Y(n, "placeholder", e), Y(n, "title", r);
								}, [() => X("ph.hrefMailtoAnchor"), () => X("tip.hrefAnchor")]), V("change", n, (e) => js("href", e.target.value)), U(e, n);
							};
							G(o, (e) => {
								B(t).page || e(s);
							}), z((e, t) => {
								Y(r, "title", e), W(i, `${t ?? ""} `);
							}, [() => X("tip.footer.ctaTarget"), () => X("lbl.buttonTarget")]), U(e, n);
						}, b = (e) => {
							var n = Hc(), r = L(n), i = I(r), a = R(i);
							q(a), A(r);
							var o = R(r, 2), s = I(o), c = R(s);
							q(c), A(o);
							var l = R(o, 2), u = I(l), d = R(u);
							q(d), A(l), z((e, n, f, p, m, h, g, _, v) => {
								Y(r, "title", e), W(i, `${n ?? ""} `), J(a, B(t).endpoint ?? ""), Y(a, "placeholder", f), Y(o, "title", p), W(s, `${m ?? ""} `), J(c, B(t).recipient ?? ""), Y(c, "placeholder", h), Y(l, "title", g), W(u, `${_ ?? ""} `), J(d, B(t).success ?? ""), Y(d, "placeholder", v);
							}, [
								() => X("tip.footer.ctaEndpoint"),
								() => X("lbl.newsletterEndpoint"),
								() => X("ph.endpoint"),
								() => X("tip.footer.ctaRecipient"),
								() => X("lbl.recipientFallback"),
								() => X("ph.email"),
								() => X("tip.footer.ctaSuccess"),
								() => X("lbl.confirmation"),
								() => X("ph.footer.ctaSuccess")
							]), V("change", a, (e) => js("endpoint", e.target.value)), V("change", c, (e) => js("recipient", e.target.value)), V("input", d, (e) => js("success", e.target.value)), U(e, n);
						};
						G(v, (e) => {
							(B(t).kind ?? "button") === "button" ? e(y) : e(b, -1);
						}), z((e, n, a, v, y, b, x, S, C, w, T, ee) => {
							Y(r, "title", e), W(i, `${n ?? ""} `), Y(o, "title", a), vi(s, B(t).big === !0), W(c, ` ${v ?? ""}`), Y(l, "title", y), W(u, `${b ?? ""} `), J(d, B(t).heading ?? ""), Y(d, "placeholder", x), Y(f, "title", S), W(p, `${C ?? ""} `), J(m, B(t).sub ?? ""), Y(h, "title", w), W(g, `${T ?? ""} `), J(_, B(t).label ?? ""), Y(_, "placeholder", ee);
						}, [
							() => X("tip.footer.ctaKind"),
							() => X("common.type"),
							() => X("tip.footer.ctaBig"),
							() => X("lbl.bigCentered"),
							() => X("tip.footer.ctaHeading"),
							() => X("lbl.heading"),
							() => X("ph.footer.ctaHeading"),
							() => X("tip.footer.ctaSub"),
							() => X("lbl.subText"),
							() => X("tip.footer.ctaLabel"),
							() => X("lbl.buttonText"),
							() => X("ph.footer.ctaLabel")
						]), V("change", s, (e) => js("big", e.target.checked)), V("input", d, (e) => js("heading", e.target.value)), V("input", m, (e) => js("sub", e.target.value)), V("input", _, (e) => js("label", e.target.value)), U(e, n);
					};
					G(De, (e) => {
						B(O).footer?.cta && e(D);
					}), A(we), A(xe);
					var Oe = R(xe, 2), ke = I(Oe), Ae = I(ke, !0);
					A(ke);
					var je = R(ke, 2), k = I(je);
					r(k, () => "linkRow", () => B(O).footer?.linkRow ?? []);
					var Me = R(k, 2), Ne = I(Me, !0);
					A(Me), A(je), A(Oe);
					var Pe = R(Oe, 2), Ie = I(Pe), Le = I(Ie, !0);
					A(Ie);
					var Re = R(Ie, 2), ze = I(Re), Be = (e) => {
						var t = _l(), n = L(t), r = I(n), i = R(r);
						{
							let e = /* @__PURE__ */ M(() => B(O).footer?.align ?? "left"), t = /* @__PURE__ */ M(() => [
								["left", X("common.left")],
								["center", X("common.center")],
								["right", X("common.right")]
							]);
							Z(i, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => ns("footer", (t) => {
									t.align = e;
								})
							});
						}
						A(n), Fe(2), z((e, t) => {
							Y(n, "title", e), W(r, `${t ?? ""} `);
						}, [() => X("tip.footer.align"), () => X("lbl.align")]), U(e, t);
					};
					G(ze, (e) => {
						B(O).footer?.cta?.big !== !0 && e(Be);
					});
					var Ve = R(ze, 2), He = I(Ve, !0);
					A(Ve);
					var Ue = R(Ve, 2);
					n(Ue, () => nr, () => B(O).footer?.background?.layers ?? []), A(Re), A(Pe);
					var We = R(Pe, 2), Ge = I(We), Ke = I(Ge, !0);
					A(Ge);
					var qe = R(Ge, 2), Je = I(qe), Ye = I(Je), Xe = R(Ye);
					q(Xe), A(Je);
					var Ze = R(Je, 2), Qe = I(Ze, !0);
					A(Ze);
					var $e = R(Ze, 2);
					r($e, () => "baseline", () => B(O).footer?.baseline ?? []);
					var et = R($e, 2), tt = I(et, !0);
					A(et), A(qe), A(We), A(t), z((e, t, n, r, s, c, l, u, d, p, m, h, g, v, te, ne, re, ie, ae, se, ce, le, pe, me, he, _e, ve, ye, xe, Se, we, De) => {
						Y(i, "title", e), vi(a, t), W(o, ` ${n ?? ""}`), W(f, r), W(_, s), Y(y, "title", c), W(b, `${l ?? ""} `), J(x, B(O).footer?.brand?.title ?? ""), Y(x, "placeholder", u), Y(S, "title", d), W(C, `${p ?? ""} `), J(w, B(O).footer?.brand?.tagline ?? ""), Y(T, "title", m), W(ee, `${h ?? ""} `), W(oe, g), W(ue, v), Y(de, "title", te), W(fe, `${ne ?? ""} `), W(ge, re), W(be, ie), W(Ce, ae), Y(Te, "title", se), vi(Ee, ce), W(E, ` ${le ?? ""}`), W(Ae, pe), W(Ne, me), W(Le, he), W(He, _e), W(Ke, ve), Y(Je, "title", ye), W(Ye, `${xe ?? ""} `), J(Xe, B(O).footer?.copyright ?? ""), Y(Xe, "placeholder", Se), W(Qe, we), W(tt, De);
					}, [
						() => X("tip.footer.show"),
						() => !!B(O).footer?.show,
						() => X("lbl.showFooter"),
						() => X("group.startpoint"),
						() => X("group.brand"),
						() => X("tip.footer.brandTitle"),
						() => X("lbl.title"),
						() => X("ph.footer.brandTitle"),
						() => X("tip.footer.tagline"),
						() => X("lbl.tagline"),
						() => X("tip.footer.brandMode"),
						() => X("lbl.brandMode"),
						() => X("group.columns"),
						() => X("ui.addColumn"),
						() => X("tip.footer.columnsAlign"),
						() => X("lbl.splitColumnAlign"),
						() => X("group.social"),
						() => X("ui.addSocial"),
						() => X("group.cta"),
						() => X("tip.footer.cta"),
						() => !!B(O).footer?.cta,
						() => X("lbl.showCta"),
						() => X("group.linkRow"),
						() => X("ui.addRowLink"),
						() => X("group.appearance"),
						() => X("lbl.background"),
						() => X("group.baseline"),
						() => X("tip.footer.copyright"),
						() => X("lbl.copyright"),
						() => X("ph.footer.copyright"),
						() => X("lbl.baselineLinks"),
						() => X("ui.addBaselineLink")
					]), V("change", a, (e) => ns("footer", (t) => {
						t.show = e.target.checked;
					})), V("input", x, (e) => rs("title", e.target.value)), V("input", w, (e) => rs("tagline", e.target.value)), V("click", le, Ls), V("click", ye, qs), V("change", Ee, (e) => As(e.target.checked)), V("click", Me, () => Cs("linkRow")), V("input", Xe, (e) => fs(e.target.value)), V("click", et, () => Cs("baseline")), U(e, t);
				}, b = (e) => {
					var t = $u(), n = I(t), r = (e) => {
						var t = Pc(), n = I(t), r = R(n);
						{
							let e = /* @__PURE__ */ M(() => B(za) ?? ""), t = /* @__PURE__ */ M(() => [["", X("common.choose")], ...B(Fa).map((e) => [e, B(Ia)[e]?.name ?? e])]);
							Z(r, {
								get value() {
									return B(e);
								},
								get options() {
									return B(t);
								},
								onchange: (e) => F(za, e || null, !0)
							});
						}
						A(t), z((e) => W(n, `${e ?? ""} `), [() => X("blocks.samling")]), U(e, t);
					};
					G(n, (e) => {
						B(Fa).length && e(r);
					});
					var i = R(n, 2), a = (e) => {
						let t = /* @__PURE__ */ M(() => B(Ia)[B(za)]);
						var n = Qu(), r = L(n), i = I(r), a = I(i, !0);
						A(i);
						var o = R(i, 2);
						K(o, () => c.cross, !0), A(o), A(r);
						var s = R(r, 2);
						Wr(s, 19, () => B(t).entries, (e) => e.id, (e, n, r) => {
							var i = Zu(), a = I(i), o = I(a);
							A(a);
							var s = R(a, 2), l = I(s), u = I(l);
							q(u);
							var d = R(u, 2), f = I(d);
							K(f, () => c.up, !0), A(f);
							var p = R(f, 2);
							K(p, () => c.down, !0), A(p);
							var m = R(p, 2);
							K(m, () => c.cross, !0), A(m), A(d), A(l);
							var h = R(l, 2), g = I(h), _ = R(g);
							q(_), A(h);
							var v = R(h, 2);
							lt(v);
							var y = R(v, 2), b = I(y), x = R(b);
							q(x), A(y);
							var S = R(y, 2), C = I(S), w = I(C), T = R(w);
							A(C);
							var ee = R(C, 2), te = (e) => {
								var t = Xu(), r = L(t), i = R(r, 2);
								K(i, () => c.cross, !0), A(i), z((e) => {
									Y(r, "src", B(n).image), Y(i, "title", e);
								}, [() => X("tip.removeImage")]), V("click", i, () => To(B(za), B(n).id, "image", "")), U(e, t);
							};
							G(ee, (e) => {
								B(n).image && e(te);
							}), A(S), A(s), A(i), z((e, i, a, s, c, l, d, h) => {
								W(o, `${e ?? ""}${B(n).date ? ` · ${B(n).date}` : ""}`), J(u, B(n).title), Y(u, "title", i), f.disabled = B(r) === 0, p.disabled = B(r) === B(t).entries.length - 1, Y(m, "title", a), W(g, `${s ?? ""} `), J(_, B(n).date ?? ""), Y(v, "placeholder", c), J(v, B(n).text ?? ""), W(b, `${l ?? ""} `), J(x, B(n).href ?? ""), Y(x, "placeholder", d), W(w, `${h ?? ""} `);
							}, [
								() => B(n).title.replace(/<[^>]*>/g, ""),
								() => X("lbl.title"),
								() => X("tip.collections.deleteEntry"),
								() => X("lbl.date"),
								() => X("ph.collections.text"),
								() => X("lbl.link"),
								() => X("ph.collections.href"),
								() => B(n).image ? X("ui.changeImage") : X("ui.addImage")
							]), V("change", u, (e) => To(B(za), B(n).id, "title", e.target.value || "Uten tittel")), V("click", f, () => Eo(B(za), B(r), -1)), V("click", p, () => Eo(B(za), B(r), 1)), V("click", m, () => Do(B(za), B(n).id)), V("change", _, (e) => To(B(za), B(n).id, "date", e.target.value)), V("change", v, (e) => To(B(za), B(n).id, "text", e.target.value)), V("change", x, (e) => To(B(za), B(n).id, "href", e.target.value)), V("change", T, (e) => Oo(B(za), B(n).id, e)), U(e, i);
						});
						var l = R(s, 2), u = (e) => {
							var t = Lc(), n = I(t, !0);
							A(t), z((e) => W(n, e), [() => X("hint.collections.empty")]), U(e, t);
						};
						G(l, (e) => {
							B(t).entries.length || e(u);
						}), Fe(2), z((e, t) => {
							W(a, e), Y(o, "title", t);
						}, [() => X("ui.addEntry"), () => X("tip.collections.deleteCollection")]), V("click", i, () => wo(B(za))), V("click", o, () => Co(B(za))), U(e, n);
					};
					G(i, (e) => {
						B(za) && B(Ia)[B(za)] && e(a);
					});
					var o = R(i, 2), s = I(o), l = R(s);
					q(l), A(o);
					var u = R(o, 2), d = I(u);
					Z(R(d), {
						get value() {
							return B(Za);
						},
						get options() {
							return Qa;
						},
						onchange: (e) => F(Za, e, !0)
					}), A(u);
					var f = R(u, 2), p = I(f, !0);
					A(f), A(t), z((e, t, n, r, i) => {
						W(s, `${e ?? ""} `), Y(l, "placeholder", t), W(d, `${n ?? ""} `), f.disabled = r, W(p, i);
					}, [
						() => X("lbl.newCollectionName"),
						() => X("ph.collections.name"),
						() => X("common.type"),
						() => !B(Xa).trim(),
						() => X("ui.createCollection")
					]), V("keydown", l, (e) => e.key === "Enter" && So()), Si(l, () => B(Xa), (e) => F(Xa, e)), V("click", f, So), U(e, t);
				}, x = (e) => {
					var t = od(), n = I(t), r = (e) => {
						var t = Lc(), n = I(t, !0);
						A(t), z((e) => W(n, e), [() => X("hint.plugins.empty")]), U(e, t);
					}, i = /* @__PURE__ */ M(() => !Uo().length);
					G(n, (e) => {
						B(i) && e(r);
					});
					var a = R(n, 2);
					Wr(a, 16, Uo, (e) => e, (e, t) => {
						let n = /* @__PURE__ */ M(() => No[t]), r = /* @__PURE__ */ M(() => (B(Mo)?.enabled ?? []).includes(t));
						var i = nd();
						let a;
						var o = I(i), s = I(o), l = I(s, !0);
						A(s);
						var u = R(s, 2), d = (e) => {
							var t = ed(), r = I(t);
							A(t), z(() => W(r, `v${B(n).version ?? ""}`)), U(e, t);
						};
						G(u, (e) => {
							B(n)?.version && e(d);
						});
						var f = R(u, 2), p = I(f), m = I(p);
						q(m);
						var h = R(m);
						A(p);
						var g = R(p, 2);
						K(g, () => c.cross, !0), A(g), A(f), A(o);
						var _ = R(o, 2), v = (e) => {
							var t = td(), r = I(t, !0);
							A(t), z((e) => W(r, e), [() => B(n).errors.join("; ")]), U(e, t);
						}, y = (e) => {
							var t = td(), r = I(t, !0);
							A(t), z((e) => W(r, e), [() => X("plugin.engineMismatch", {
								required: B(n).requiresEngine,
								current: B(Po)
							})]), U(e, t);
						}, b = (e) => {
							var t = td(), r = I(t, !0);
							A(t), z((e) => W(r, e), [() => X("plugin.cspNeeded", { list: qo(B(n).csp).join(", ") })]), U(e, t);
						}, x = /* @__PURE__ */ M(() => B(n)?.csp && qo(B(n).csp).length);
						G(_, (e) => {
							B(n)?.errors?.length ? e(v) : B(n) && !B(n).satisfied ? e(y, 1) : B(x) && e(b, 2);
						});
						var S = R(_, 2), C = (e) => {
							var t = Lc(), r = I(t, !0);
							A(t), z((e) => W(r, e), [() => X("plugin.languages", { list: B(n).languages.map((e) => e.name).join(", ") })]), U(e, t);
						};
						G(S, (e) => {
							B(n)?.languages?.length && e(C);
						}), A(i), z((e, t, o, s, c) => {
							a = di(i, 1, "plugin-row svelte-1n46o8q", null, a, { "plugin-broken": B(n)?.errors?.length }), W(l, e), Y(p, "title", t), vi(m, B(r)), m.disabled = o, W(h, ` ${s ?? ""}`), Y(g, "title", c);
						}, [
							() => B(n)?.names?.[Bi()] ?? B(n)?.name ?? t,
							() => B(r) ? X("tip.plugins.on") : X("tip.plugins.off"),
							() => !!B(n)?.errors?.length,
							() => B(r) ? X("ui.on") : X("ui.off"),
							() => X("tip.plugins.remove")
						]), V("change", m, (e) => Zo(t, e.target.checked)), V("click", g, () => $o(t)), U(e, i);
					});
					var o = R(a, 2), s = (e) => {
						var t = id(), n = R(L(t), 2), r = I(n, !0);
						A(n), Wr(R(n, 2), 16, () => B(Bo), (e) => e, (e, t) => {
							var n = rd(), r = I(n), i = I(r), a = I(i, !0);
							A(i);
							var o = R(i, 2), s = (e) => {
								var n = ed(), r = I(n);
								A(n), z(() => W(r, `v${No[t].version ?? ""}`)), U(e, n);
							};
							G(o, (e) => {
								No[t]?.version && e(s);
							});
							var l = R(o, 2), u = I(l);
							K(u, () => c.right, !0), A(u), A(l), A(r), A(n), z((e, t) => {
								W(a, e), Y(u, "title", t);
							}, [() => No[t]?.names?.[Bi()] ?? No[t]?.name ?? t, () => X("tip.plugins.addFound")]), V("click", u, () => ts(t)), U(e, n);
						}), z((e) => W(r, e), [() => X("hint.plugins.found")]), U(e, t);
					};
					G(o, (e) => {
						B(Bo).length && e(s);
					});
					var l = R(o, 2), u = (e) => {
						var t = Nr(), n = L(t), r = (e) => {
							var t = Lc(), n = I(t, !0);
							A(t), z((e) => W(n, e), [() => X("hint.plugins.autoDiscover")]), U(e, t);
						};
						G(n, (e) => {
							B(Bo).length || e(r);
						}), U(e, t);
					}, d = (e) => {
						var t = ad(), n = R(L(t), 2);
						q(n);
						var r = R(n, 2), i = I(r, !0);
						A(r);
						var a = R(r, 2), o = (e) => {
							var t = td(), n = I(t, !0);
							A(t), z(() => W(n, B(zo))), U(e, t);
						};
						G(a, (e) => {
							B(zo) && e(o);
						}), z((e, t, a) => {
							Y(n, "placeholder", e), r.disabled = t, W(i, a);
						}, [
							() => X("ph.plugins.folder"),
							() => !B(Fo).trim(),
							() => X("ui.addPlugin")
						]), V("keydown", n, (e) => e.key === "Enter" && es()), Si(n, () => B(Fo), (e) => F(Fo, e)), V("click", r, es), U(e, t);
					};
					G(l, (e) => {
						B(Ho) === "ok" ? e(u) : e(d, -1);
					}), A(t), U(e, t);
				}, S = (e) => {
					var t = Vu(), n = I(t), r = (e) => {
						var t = Lc(), n = I(t, !0);
						A(t), z((e) => W(n, e), [() => X("hint.history.loading")]), U(e, t);
					}, i = (e) => {
						var t = ld(), n = L(t), r = (e) => {
							var t = Lc(), n = I(t, !0);
							A(t), z(() => W(n, B(Fr))), U(e, t);
						};
						G(n, (e) => {
							B(Fr) && e(r);
						});
						var i = R(n, 2), a = (e) => {
							var t = cd(), n = L(t), r = I(n, !0);
							A(n), Wr(R(n, 2), 19, () => B(Pr), (e) => e.sha, (e, t, n) => {
								var r = sd();
								let i;
								var a = I(r), o = I(a, !0);
								A(a);
								var s = R(a, 2), c = I(s);
								A(s), A(r), z((e) => {
									i = di(r, 1, "history-row svelte-1n46o8q", null, i, { head: B(n) === 0 }), Y(a, "title", B(t).sha), W(o, B(t).message), W(c, `${B(t).author ?? ""}${e ?? ""}`);
								}, [() => B(t).date ? ` · ${Rr.format(new Date(B(t).date))}` : ""]), U(e, r);
							}), z((e, t) => {
								n.disabled = B(Ir) || !B(T)?.allowed, Y(n, "title", e), W(r, t);
							}, [() => B(T)?.allowed ? X("tip.history.revert") : X("tip.history.needsAccess"), () => X("ui.revertLast")]), V("click", n, Vr), U(e, t);
						};
						G(i, (e) => {
							B(Pr).length > 0 && e(a);
						}), U(e, t);
					};
					G(n, (e) => {
						B(Pr) === null ? e(r) : e(i, -1);
					}), A(t), U(e, t);
				}, C = (e) => {
					var t = Vu(), n = I(t), r = (e) => {
						var t = Lc(), n = I(t, !0);
						A(t), z((e) => W(n, e), [() => X("update.checking")]), U(e, t);
					}, i = (e) => {
						var t = ud(), n = L(t), r = I(n, !0);
						A(n);
						var i = R(n, 2), a = I(i, !0);
						A(i), z((e) => {
							W(r, B(Gr)), W(a, e);
						}, [() => X("update.retry")]), V("click", i, Jr), U(e, t);
					}, a = (e) => {
						var t = xd(), n = L(t), r = I(n), i = I(r, !0);
						A(r);
						var a = R(r, 2), o = (e) => {
							var t = dd(), n = L(t);
							K(n, () => c.right, !0), A(n);
							var r = R(n, 2), i = I(r, !0);
							A(r), z(() => W(i, B(Ur).target)), U(e, t);
						};
						G(a, (e) => {
							B(Ur).upToDate || e(o);
						}), A(n);
						var s = R(n, 2), l = (e) => {
							var t = Lc(), n = I(t, !0);
							A(t), z((e) => W(n, e), [() => X("update.upToDate")]), U(e, t);
						}, u = (e) => {
							var t = bd(), n = L(t), r = I(n, !0);
							A(n);
							var i = R(n, 2), a = (e) => {
								var t = fd(), n = I(t), r = I(n, !0);
								A(n);
								var i = R(n, 2), a = I(i), o = I(a, !0);
								A(a), A(i), A(t), z((e) => {
									W(r, e), W(o, B(Ur).notes);
								}, [() => X("update.aboutVersion", { target: B(Ur).target })]), U(e, t);
							};
							G(i, (e) => {
								B(Ur).notes && e(a);
							});
							var o = R(i, 2), s = (e) => {
								var t = pd(), n = I(t), r = I(n);
								K(r, () => c.warn, !0), A(r);
								var i = R(r);
								A(n);
								var a = R(n, 2), o = I(a), s = I(o, !0);
								A(o), A(a), A(t), z((e, t) => {
									Y(n, "title", e), W(i, ` ${t ?? ""}`), W(s, B(Ur).headers.upstream);
								}, [() => X("update.headersManual"), () => X("update.headersTitle")]), U(e, t);
							};
							G(o, (e) => {
								B(Ur).headers?.upstream && e(s);
							});
							var l = R(o, 2);
							Wr(l, 17, () => B(Ur).changes.filter((e) => e.atom && e.conflict), (e) => e.path, (e, t) => {
								var n = hd(), r = I(n), i = I(r, !0);
								A(r);
								var a = R(r, 2), o = I(a), s = (e) => {
									var t = md(), n = I(t, !0);
									A(t), z((e) => W(n, e), [() => X("update.actionDelete")]), U(e, t);
								};
								G(o, (e) => {
									B(t).action === "delete" && e(s);
								});
								var l = R(o, 2);
								K(l, () => c.warn, !0), A(l), A(a), A(n), z((e) => {
									Y(r, "title", B(t).path), W(i, B(t).path), Y(l, "title", e);
								}, [() => X(`update.conflict.${B(t).conflict}`)]), U(e, n);
							});
							var u = R(l, 2), d = I(u), f = I(d);
							A(d);
							var p = R(d, 2);
							Wr(p, 21, () => B(Ur).changes.filter((e) => e.atom && !e.conflict), (e) => e.path, (e, t) => {
								var n = gd(), r = I(n), i = I(r, !0);
								A(r);
								var a = R(r, 2), o = (e) => {
									var t = md(), n = I(t, !0);
									A(t), z((e) => W(n, e), [() => X("update.actionDelete")]), U(e, t);
								};
								G(a, (e) => {
									B(t).action === "delete" && e(o);
								}), A(n), z(() => {
									Y(r, "title", B(t).path), W(i, B(t).path);
								}), U(e, n);
							}), A(p), A(u);
							var m = R(u, 2), h = (e) => {
								var t = yd(), n = L(t), r = I(n), i = I(r, !0);
								A(r);
								var a = R(r, 2), o = I(a, !0);
								A(a), A(n), Wr(R(n, 2), 17, () => B(Ur).changes.filter((e) => !e.atom), (e) => e.path, (e, t) => {
									var n = vd(), r = I(n);
									let i;
									var a = I(r, !0);
									A(r);
									var o = R(r, 2), s = I(o), l = (e) => {
										var t = md(), n = I(t, !0);
										A(t), z((e) => W(n, e), [() => X("update.actionDelete")]), U(e, t);
									};
									G(s, (e) => {
										B(t).action === "delete" && e(l);
									});
									var u = R(s, 2), d = (e) => {
										var n = _d();
										K(n, () => c.warn, !0), A(n), z((e) => Y(n, "title", e), [() => X(`update.conflict.${B(t).conflict}`)]), U(e, n);
									};
									G(u, (e) => {
										B(t).conflict && e(d);
									});
									var f = R(u, 2);
									q(f), A(o), A(n), z((e, n, o, s) => {
										i = di(r, 1, "update-path svelte-1n46o8q", null, i, e), Y(r, "title", B(t).path), W(a, B(t).path), vi(f, n), Y(f, "title", o), Y(f, "aria-label", s);
									}, [
										() => ({ skipped: B(qr).has(B(t).path) }),
										() => B(qr).has(B(t).path),
										() => X("update.keepMine.title"),
										() => X("update.keepMine")
									]), V("change", f, () => Yr(B(t).path)), U(e, n);
								}), z((e, t) => {
									W(i, e), W(o, t);
								}, [() => X("update.optionalTitle"), () => X("update.keepMine")]), U(e, t);
							}, g = /* @__PURE__ */ M(() => B(Ur).changes.some((e) => !e.atom));
							G(m, (e) => {
								B(g) && e(h);
							});
							var _ = R(m, 2), v = I(_, !0);
							A(_), z((e, t, n, i, a, o) => {
								W(r, e), Y(d, "title", t), W(f, `${n ?? ""} · ${i ?? ""}`), _.disabled = B(Kr) || !B(T)?.allowed, Y(_, "title", a), W(v, o);
							}, [
								() => X("update.summary", {
									writes: B(Ur).changes.filter((e) => e.action === "write").length,
									deletes: B(Ur).changes.filter((e) => e.action === "delete").length
								}),
								() => X("update.atomGroup.title"),
								() => X("update.atomTitle"),
								() => B(Ur).changes.filter((e) => e.atom).length,
								() => B(T)?.allowed ? X("update.run.title") : X("tip.history.needsAccess"),
								() => X("update.run", { target: B(Ur).target })
							]), V("click", _, Xr), U(e, t);
						};
						G(s, (e) => {
							B(Ur).upToDate ? e(l) : e(u, -1);
						}), z((e) => W(i, e), [() => X("update.current", { version: B(Ur).current })]), U(e, t);
					};
					G(n, (e) => {
						B(Kr) && !B(Ur) ? e(r) : B(Gr) ? e(i, 1) : B(Ur) && e(a, 2);
					}), A(t), U(e, t);
				};
				G(s, (e) => {
					B(st) === "pages" ? e(l) : B(st) === "nav" ? e(u, 1) : B(st) === "site" ? e(d, 2) : B(st) === "theme" ? e(p, 3) : B(st) === "blocks" ? e(m, 4) : B(st) === "grid" ? e(_, 5) : B(st) === "properties" ? e(v, 6) : B(st) === "footer" ? e(y, 7) : B(st) === "collections" ? e(b, 8) : B(st) === "plugins" ? e(x, 9) : B(st) === "history" ? e(S, 10) : B(st) === "update" && e(C, 11);
				}), A(t), z((e) => {
					Y(i, "title", e), W(o, ft[B(st)]);
				}, [() => pt[B(st)]?.map((e) => X(e)).join("\n")]), U(e, t);
			};
			G(v, (e) => {
				B(st) && e(y);
			}), z((e) => {
				p = di(d, 1, "rail-gear svelte-1n46o8q", null, p, { active: B(ai) }), Y(d, "title", e);
			}, [() => X("settings.title")]), V("click", d, () => F(ai, !B(ai))), U(e, t);
		};
		G(i, (e) => {
			B(te) && e(o);
		});
		var s = R(i, 2);
		let d;
		var p = I(s), m = I(p);
		Ei(m, (e) => F(w, e), () => B(w)), A(p), A(s), Ei(s, (e) => F(oe, e), () => B(oe)), A(t), z((e) => {
			d = di(s, 1, "frame-wrap svelte-1n46o8q", null, d, {
				mobile: B(ae) === "mobile",
				pan: B(be)
			}), pi(p, `width:${B(ve) ?? ""}px; height:${B(ye) ?? ""}px`), Y(m, "title", e), Y(m, "src", `/?page=${B(g)}&preview=1`), pi(m, `width:${B(me) ?? ""}px; height:${B(_e) ?? ""}px; transform:scale(${B(he) ?? ""}); transform-origin:top left`);
		}, [() => X("ui.previewTitle")]), wr("load", m, ti), Sr(m), U(e, t);
	}, sp = (e) => {
		var t = Td(), n = I(t, !0);
		A(t), z((e) => W(n, e), [() => X("ui.loading")]), U(e, t);
	};
	G(ap, (e) => {
		B(m) ? e(op) : e(sp, -1);
	});
	var cp = R(ap, 2), lp = (e) => {
		eo(e, {
			get image() {
				return B(Hi);
			},
			onapply: Wi,
			oncancel: () => F(Hi, null)
		});
	};
	G(cp, (e) => {
		B(Hi) && e(lp);
	});
	var up = R(cp, 2), dp = (e) => {
		var t = Dd(), n = I(t), r = I(n), i = I(r, !0);
		A(r);
		var a = R(r, 2);
		Wr(a, 16, () => B(Xe).lines, (e) => e, (e, t) => {
			var n = Ed(), r = I(n, !0);
			A(n), z(() => W(r, t)), U(e, n);
		});
		var o = R(a, 2), s = (e) => {
			var t = Yc();
			q(t), ct(t, !0), z(() => Y(t, "placeholder", B(Xe).placeholder)), V("keydown", t, (e) => e.key === "Enter" && B(Xe).value.trim() && $e(!0)), Si(t, () => B(Xe).value, (e) => B(Xe).value = e), U(e, t);
		};
		G(o, (e) => {
			B(Xe).prompt && e(s);
		});
		var c = R(o, 2), l = I(c), u = I(l, !0);
		A(l);
		var d = R(l, 2), f = I(d, !0);
		A(d), A(c), A(n), A(t), z(() => {
			W(i, B(Xe).title), W(u, B(Xe).cancelLabel), W(f, B(Xe).okLabel);
		}), V("pointerdown", t, (e) => et = e.target === e.currentTarget), V("click", t, (e) => et && e.target === e.currentTarget && $e(!1)), V("click", l, () => $e(!1)), V("click", d, () => $e(!0)), U(e, t);
	};
	G(up, (e) => {
		B(Xe) && e(dp);
	});
	var fp = R(up, 2), pp = (e) => {
		var t = Od(), n = I(t), r = I(n), i = I(r, !0);
		A(r);
		var a = R(r, 2), o = I(a, !0);
		A(a);
		var s = R(a, 2), c = I(s), l = R(c);
		q(l), A(s);
		var u = R(s, 2), d = I(u), f = R(d);
		{
			let e = /* @__PURE__ */ M(() => X("setup.accentPick"));
			aa(f, {
				get value() {
					return B(rt);
				},
				get label() {
					return B(e);
				},
				onchange: (e) => F(rt, e, !0)
			});
		}
		A(u);
		var p = R(u, 2), m = I(p), h = R(m);
		{
			let e = /* @__PURE__ */ M(() => X("setup.bgLabel"));
			aa(h, {
				get value() {
					return B(it);
				},
				get label() {
					return B(e);
				},
				onchange: (e) => F(it, e, !0)
			});
		}
		A(p);
		var g = R(p, 2), _ = I(g, !0);
		A(g);
		var v = R(g, 2), y = I(v), b = I(y, !0);
		A(y);
		var x = R(y, 2), S = I(x, !0);
		A(x), A(v), A(n), A(t), z((e, t, n, r, a, s, u, f, p, h) => {
			W(i, e), W(o, t), W(c, `${n ?? ""} `), Y(l, "placeholder", r), W(d, `${a ?? ""} `), W(m, `${s ?? ""} `), W(_, u), W(b, f), x.disabled = p, W(S, h);
		}, [
			() => X("setup.title"),
			() => X("setup.intro"),
			() => X("setup.nameLabel"),
			() => X("ph.setup.name"),
			() => X("setup.accentLabel"),
			() => X("setup.bgLabel"),
			() => X("setup.outro"),
			() => X("setup.skip"),
			() => !B(nt).trim(),
			() => X("setup.start")
		]), V("keydown", l, (e) => e.key === "Enter" && ot()), Si(l, () => B(nt), (e) => F(nt, e)), V("click", y, at), V("click", x, ot), U(e, t);
	};
	G(fp, (e) => {
		B(tt) && e(pp);
	});
	var mp = R(fp, 2), hp = (e) => {
		var t = kd();
		let n;
		var r = I(t), i = I(r, !0);
		A(r);
		var a = R(r, 2);
		A(t), z((e) => {
			n = di(t, 1, "toast svelte-1n46o8q", null, n, {
				ok: B(y) === "ok",
				error: B(y) === "error"
			}), W(i, B(v)), Y(a, "title", e);
		}, [() => X("ui.close")]), V("click", a, () => x("")), U(e, t);
	};
	G(mp, (e) => {
		B(v) && e(hp);
	}), A(Uf);
	var gp = R(Uf, 2), _p = (e) => {
		var t = Ad(), n = I(t), r = I(n), i = I(r, !0);
		A(r);
		var o = R(r, 2);
		K(o, () => c.cross, !0), A(o), A(n);
		var s = R(n, 2), l = I(s);
		a(l), A(s), A(t), z((e, n) => {
			pi(t, `left: ${B(Tt).left ?? ""}px; top: ${B(Tt).top ?? ""}px`), W(i, e), Y(o, "title", n);
		}, [() => X("blocks.suffix", { label: tn[B(j).type] ?? B(j).type }), () => X("tip.closeEsc")]), V("click", o, () => F(Tt, null)), U(e, t);
	};
	G(gp, (e) => {
		B(Tt) && B(j) && e(_p);
	}), z(() => qf = di(Kf, 1, "topbar svelte-1n46o8q", null, qf, { hidden: !B(te) })), U(e, Hf), qe();
}
//#endregion
//#region src/main.js
Tr([
	"click",
	"input",
	"pointerdown",
	"change",
	"keydown"
]), document.documentElement.lang = await Ui();
var Nd = Fr(Md, { target: document.getElementById("urd-admin") });
//#endregion
export { Nd as default };
